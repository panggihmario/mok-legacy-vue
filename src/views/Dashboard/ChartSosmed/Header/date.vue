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
        v-model="displayDate"
        readonly
        dense
        color="secondary"
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
            <custom-button size="small" color="secondary">Ok</custom-button>
          </div>
          
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
      displayDate : '',
      paramsDate : []
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
    formatter(value) {
      const v = moment(value).format("DD/MM/YYYY");
      return v;
    },
    onReset () {
      this.choosenDate = []
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
        }
      }
      
    }
  }
}
</script>

<style lang="scss" module="k" src="../../style.scss">

</style>