<template>
  <v-menu v-model="menu" ref="menu" :close-on-content-click="false" transition="scale-transition" offset-y
    :nudge-width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-text-field 
        v-model="displayMonth" 
        readonly dense color="secondary" placeholder="Bulan" outlined v-bind="attrs"
        v-on="on" hide-details class="font-12" />
    </template>
    <v-card class="pa-4">
      <v-row no-gutters>
        <v-col>
          <v-date-picker 
            v-model="picker" 
            range 
            no-title 
            dense 
            type="month" 
            prev-icon="mdi-skip-previous"
            next-icon="mdi-skip-next"
            />
        </v-col>
        <v-col >
          <custom-input
            outlined
            dense
            color="secondary"
            label="Dari Bulan"
            readonly
            v-model="fromDate"
            hide-details
          />
          <div class="mb-4"></div>
          <custom-input
            outlined
            dense
            color="secondary"
            label="Sampai Bulan"
            readonly
            v-model="endDate"
            hide-details
          />
          <div class="mb-6"></div>
          <div class="d-flex justify-end">
            <custom-button  
              class="mr-2" 
              size="small"  
              @click="onReset"
            >
              <div class="primary--text">Reset</div>
            </custom-button>
            <custom-button 
              size="small" 
              color="secondary"
              @click="savePicker"
            >
              Ok
            </custom-button>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-menu>
</template>

<script>
import moment  from 'moment';
export default {
  data() {
    return {
      displayMonth: '',
      menu: false,
      paramsDate : []
    }
  },
  computed : {
    picker : {
      get() {
        return this.paramsDate
      },
      set (value) {
        const after = this.checkRangeDate(value);
        if (after[1] && after[0]) {
          this.paramsDate = after
        } else {
          this.paramsDate = value
        }
      }
    },
    fromDate() {
      if(this.picker.length > 0) {
        return this.monthFormater(this.picker[0])
      }
    },
    endDate() {
      if(this.picker.length > 1) {
        return this.monthFormater(this.picker[1])
      }
    }
  },
  methods : {
    checkRangeDate(value) {
      const [first, second] = value;
      const mFirst = moment(first).format('M');
      const mSecond = moment(second).format('M');
      if (mFirst > mSecond) {
        return [second, first];
      } else {
        return [first, second];
      }
    },
    onReset () {
      this.picker = []
    },
    monthFormater (value) {
      const numberOfMonth = moment(value).format('M')
      const nameOfMonth = moment().month(numberOfMonth - 1).format('MMMM')
      return nameOfMonth
    },
    savePicker (){
      const months = this.picker
      const numberStartMonth = moment(months[0]).format('M')
      const numberEndMonth = moment(months[1]).format('M')
      const startMonth = moment().month(numberStartMonth - 1).format('MMMM')
      const endMonth = moment().month(numberEndMonth - 1).format('MMMM')
      this.displayMonth = months.length > 1 ? `${startMonth} - ${endMonth}` : `${startMonth}`
      this.menu = false
      const formatStartMonth = moment(months[0]).format('YYYY-MM')
      const epochStartMonth = moment(formatStartMonth).subtract(7,'hour').valueOf()
      const formatEndMonth = months.length > 1 && moment(months[1]).format('YYYY-MM')
      const epochEndMonth =  moment(months.length > 1 ? formatEndMonth : formatStartMonth).endOf('month').subtract(7 ,'hour').valueOf()
      const params = {
        startAt : moment(months[0]).format('MMMM'),
        endAt : months.length > 1 ? moment(months[1]).format('MMMM') : moment(months[0]).format('MMMM'),
        epochStartAt : epochStartMonth,
        epochEndAt : epochEndMonth
      }
      this.$emit('setMonth', params)
    }
  }
}
</script>

