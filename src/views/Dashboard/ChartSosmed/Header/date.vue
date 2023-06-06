<template>
  <v-menu
    v-model="menu"
    ref="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    :nudge-width="400"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="display"
        readonly
        dense
        color="secondary"
        placeholder="Tanggal"
        outlined
        v-bind="attrs"
        v-on="on"
        hide-details
        class="font-12"
      ></v-text-field>
    </template>
    <v-card class="pa-4">
      <v-row no-gutters>
        <v-col >
          <v-date-picker
              v-model="choosenDate"
              no-title
              range
              width="250"
            >
            </v-date-picker>
        </v-col>
        <v-col >
          <custom-input
            outlined
            dense
            color="secondary"
            label="Dari Tanggal"
            readonly
            v-model="fromDate"
            hide-details
          />
          <div class="mb-4"></div>
          <custom-input
            outlined
            dense
            color="secondary"
            label="Sampai Tanggal"
            readonly
            v-model="endDate"
            hide-details
          />
          <div class="mb-6"></div>
          <div class="d-flex justify-end">
            <custom-button  class="mr-2" size="small" @click="onReset" >
              <div class="primary--text">Reset</div>
            </custom-button>
            <custom-button 
              size="small" 
              color="secondary"
              @click="saveDate"
            >
              Ok
            </custom-button>
          </div>
          <div v-if="isMaxRange" class="isMaxRange">Hanya dapat memilih tanggal dengan range 30 days</div>
        </v-col>
      </v-row>
      
    </v-card>
  </v-menu>
</template>

<script>
import moment from "moment"
export default {
  data () {
    return {
      menu : false,
      paramsDate : [],
      isMaxRange : false
    }
  },
  props : {
    display : {
      type : String
    }
  },
  computed : {
    choosenDate: {
      get() {
        return this.paramsDate;
      },
      set(value) {
        const after = this.checkRangeDate(value);
        if (after[1] && after[0]) {
          this.paramsDate = after
        } else {
          this.paramsDate = value
        }
      },
    },
    fromDate() {
      if (this.choosenDate.length > 0) {
        return this.formatter(this.choosenDate[0]);
      }
    },
    endDate() {
      if (this.choosenDate.length > 1) {
        return this.formatter(this.choosenDate[1]);
      }
    },
  },
  methods : {
    saveDate () {
      this.menu = false
      if(this.choosenDate.length > 0) {
        const dateRange = this.choosenDate
        const start = this.formatter(dateRange[0]);
        const end = this.formatter(dateRange[1]);
        const fullDate = `${start} - ${end}`;
        
        const startEpoch = moment(dateRange[0]).subtract(7, 'hour').valueOf()
        const endEpoch = moment(dateRange.length > 1 ? dateRange[1] : dateRange[0]).endOf('day').subtract(7, 'hour').valueOf()
        const displayDate = dateRange.length > 1 ? fullDate : `${start}`
        const params = {
          startEpoch,
          endEpoch,
          displayDate,
        }
        this.$emit('setDate', params)
      }else {
        this.onReset()
      }
      
    },
    formatter(value) {
      const v = moment(value).format("DD/MM/YYYY");
      return v;
    },
    onReset () {
      this.choosenDate = []
      this.displayDate = ''
      const params = {
        startEpoch : '',
        endEpoch : '',
        displayDate : '',
      }
      this.$emit('setDate', params)
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
  },
  watch : {
    choosenDate(value) {
      if(value.length > 1) {
        const end = moment(value[1])
        const start = moment(value[0])
        const c = end.diff(start, 'days')
        if(c > 30 ) {
          this.choosenDate = []
          this.isMaxRange = true
        }else{
          this.isMaxRange = false
        }
      }
      
    }
  }
}
</script>

<style lang="scss" >
.isMaxRange {
  font-size: 11px;
  font-weight: 400;
  color: var(--primary-color);
  margin: 12px 0;
}
</style>