<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="400"
      offset-y
      @input="onClick"
    >
      <template v-slot:activator="{ on, attrs }">
        <custom-input
          v-bind="attrs"
          hide-details
          v-on="on"
          dense
          readonly
          placeholder="Tanggal"
          v-model="displayDate"
        ></custom-input>
      </template>

      <v-card class="dt__card" flat>
        <v-row>
          <v-col cols="6">
            <v-date-picker 
              width="250"
              v-model="choosenDate" 
              no-title
              range
              :max="currentDate"
            > 
            </v-date-picker>
          </v-col>
          <v-col> 
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
              
            <div class="mb-2"></div>
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
            <div class="mb-2"></div>
            <custom-button
              color="warning"
              size="small"
              @click="onReset"
            >Reset Tanggal</custom-button>
            <div class="warning-sign">{{showWarning}} </div>
          </v-col>
        </v-row>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import moment from "moment"
import { mapMutations, mapState } from "vuex"
export default {
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true,
    selectedDate : ''
  }),
  computed : {
    ...mapState ({
      paramsDate : (state) => state.post.paramsDate,
      displayDate : (state) => state.post.displayDate
    }),
    fromDate () {
      if(this.choosenDate.length > 0) {
        return this.formatter(this.choosenDate[0])
      }
    },
    endDate () {
      if(this.choosenDate.length > 1) {
        return this.formatter(this.choosenDate[1])
      }
    },
    showWarning () {
      const [from, end] = this.choosenDate
      if(from && end) {
        const mFrom = moment(from)
        const mEnd = moment(end)
        if(mFrom > mEnd) {
          return 'wrong range date'
        }else{
          return
        }
      }
    },
    currentDate () {
      const d = moment().format('YYYY-MM-DD')
      return d
    },
    choosenDate: {
      get() {
        return this.paramsDate
      },
      set(value) {
        this.setParamsDate(value)
      }
    }

  },
  methods : {
    ...mapMutations({
      setParamsDate : 'post/setParamsDate',
      setDisplayDate : 'post/setDisplayDate'
    }),
    onReset() {
      this.choosenDate = []
      this.setDisplayDate('')
    },
    formatter (value) {
      const v = moment(value).format('DD/MM/YYYY')
      return v
    },
    onClick() {
      if(this.choosenDate.length > 0) {
        const d = this.choosenDate
        const from = this.formatter(d[0])
        this.setDisplayDate(from)
        if(this.choosenDate.length > 1) {
          const end = this.formatter(d[1])
          const fullDate = `${from} - ${end}`
          this.setDisplayDate(fullDate)
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.dt {
  &__card {
    padding: 16px;
    background-color: $whitesnow;
  }
}
.warning-sign {
  font-size: 12px;
  font-weight: 500;
  color: #777777;
}
</style>