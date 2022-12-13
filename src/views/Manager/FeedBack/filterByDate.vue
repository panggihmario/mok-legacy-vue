<template>
  <v-menu v-model="menu" :close-on-content-click="false" :nudge-bottom="30" bottom transition="scale-transition">
    <template v-slot:activator="{ on, attrs }">
      <div class="filter__date">
        <div v-on="on" class="filter__date-box">
          <input class="filter__input" placeholder="dd-mm-yyy s/d dd-mm-yyyy" v-model="displayDate" />
          <v-icon size="12">fa-solid fa-calendar</v-icon>
        </div>
      </div>
    </template>
    <v-card>
      <div class="filter__date-container">
        <v-date-picker flat no-title v-model="dates" range></v-date-picker>
        <div class="filter__date-right">
          <div class="filter__date-inputs">
            <custom-input
              outlined
              dense
              color="secondary"
              label="Dari Tanggal"
              readonly
              v-model="fromDate"
              hide-details
              append-icon="mdi-calendar"
            />
            <custom-input
              outlined
              dense
              color="secondary"
              label="Sampai Tanggal"
              readonly
              v-model="endDate"
              hide-details
              append-icon="mdi-calendar"
            />
          </div>
          <div class="d-flex justify-end">
            <v-btn  class="mr-4" small @click="onReset" text color="warning">
              <div class="filter__text-button">Reset</div>
            </v-btn>
            <v-btn @click="saveDate" small color="secondary">
              <div class="filter__text-button">OK</div>
            </v-btn>
          </div>
        </div>
      </div>
    </v-card>
  </v-menu>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      menu: false,
      dates: [],
      displayDate : ''
    }
  },
  computed: {
    dateRangeText() {
      return this.dates.join(' ~ ')
    },
    fromDate () {
      return this.formatter(this.dates[0])
    },
    endDate () {
      return this.formatter(this.dates[1])
    },
  },
  methods : {
    formatter(value) {
      if(value){
        const v = moment(value).format("DD/MM/YYYY");
        return v;
      }else{
        return ''
      }
    },
    saveDate () {
      this.menu = false
      const afterCheckRangeDate = this.checkRangeDate(this.dates);
      const start = this.formatter(afterCheckRangeDate[0]);
      const end = this.formatter(afterCheckRangeDate[1]);
        const fullDate = `${start} - ${end}`;
        
        this.dates = afterCheckRangeDate
        const payload = this.formatingParamsDate(afterCheckRangeDate)
        this.$emit('getPayloadDate', payload)
        if(start) {
          this.displayDate = fullDate
        }else{
          this.displayDate = ''
        }
    },
    onReset () {
      this.dates = []
      this.displayDate = ''
    },
    checkRangeDate(value) {
      const [first, second] = value;
      const mFirst = moment(first);
      const mSecond = moment(second);
      if (mFirst > mSecond) {
        return [second, first];
      } else {
        return [first, second];
      }
    },
    formatingParamsDate (date) {
      const [startDate, endDate] = date
      const epochStartDate = this.convertEpoch(startDate)
      let end
      let epochEndDate
      if(endDate) {
        end = moment(endDate, "YYYY-MM-DD HH:mm").endOf("day").add(7, 'hours').unix()
        epochEndDate = end * 1000
      }else{
        end = moment(startDate, "YYYY-MM-DD HH:mm").endOf("day").add(7, 'hours').unix()
        epochEndDate = end * 1000
      }
      const payload = {
        startAt : epochStartDate ?epochStartDate : '',
        endAt : epochEndDate ? epochEndDate : ''
      }
      return payload
    },
    convertEpoch(d) {
      const epochDate = moment(d, "YYYY-MM-DD").add(7, 'hours').unix()
      const miliEpoch = epochDate * 1000
      return miliEpoch
    },
  }
}
</script>

<style lang="scss" scoped src="./filter.scss" >

</style>