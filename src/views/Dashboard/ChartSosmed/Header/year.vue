<template>
  <div>
    <template>
      <div class="text-center">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="400"
          offset-y
          max-width="430px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="display"
              readonly
              dense
              color="secondary"
              placeholder="Tahun"
              outlined
              v-bind="attrs"
              v-on="on"
              hide-details
              class="font-12"
            ></v-text-field>
          </template>

          <v-card>
            <div class="pa-4">
              <v-row no-gutters>
                <v-col cols="7">
                  <div
                    class="d-flex flex-wrap flex-wrap-reverse flex-row-reverse mt-2"
                  >
                    <div v-for="(y, i) in 5" :key="i" class="col-2 pa-1">
                      <div
                        class="d-flex justify-center align-center box-year__list cursor-pointer"
                        :class="{
                          'box-selected__true':
                            dToday - i == dStart || dToday - i == dEnd,
                          'box-selected__secondary':
                            dToday - i > dStart && dToday - i < dEnd,
                          'box-selected__disable': dToday - i < dStart,
                          'box-year__today': dToday - i == dToday,
                        }"
                        @click="setDatePayload(i)"
                      >
                        <span class="font-10">{{ dToday - i }}</span>
                      </div>
                    </div>
                  </div>
                </v-col>

                <v-col cols="5" class="pl-4">
                  <div>
                    <span class="font-weight-medium font-12">Dari Tahun</span>
                    <div class="d-flex align-center box-year px-2">
                      <span
                        v-if="startDate"
                        class="font-weight-medium font-12"
                        >{{ startDate }}</span
                      >
                      <span v-else class="font-weight-medium font-12 grey--text"
                        >YY</span
                      >
                    </div>
                  </div>
                  <div class="mt-2">
                    <span class="font-weight-medium font-12">Sampai Tahun</span>
                    <div class="d-flex align-center box-year px-2">
                      <span v-if="endDate" class="font-weight-medium font-12">{{
                        endDate
                      }}</span>
                      <span v-else class="font-weight-medium font-12 grey--text"
                        >YY</span
                      >
                    </div>
                  </div></v-col
                >
              </v-row>
            </div>

            <v-card-actions>
              <v-spacer></v-spacer>
              <custom-button  
              class="mr-2" 
              size="small"  
              @click="cancelDate"
            >
              <div class="primary--text">Reset</div>
            </custom-button>
              <custom-button 
              size="small" 
              color="secondary"
              @click="submitDate"
            >
              Ok
            </custom-button>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
    </template>
  </div>
</template>

<script>
import moment  from 'moment';
export default {
  props: {
    payloadData: {
      type: Object,
    },
    tab: {
      type: String,
      default: "",
    },
    display : {
      type : String
    }

  },
  data: () => ({
    displayYear : '',
    fav: true,
    menu: false,
    message: false,
    hints: true,
    dToday: null,
    dStart: null,
    dEnd: null,
    keyFocusStart: null,
    keyFocusEnd: null,
    firstDay: null,
    lastDay: null,
    startDate: null,
    endDate: null,
    payload: {
      year: "",
      month: "",
      dateFirst: "",
      dateLast: "",
    },
  }),
  watch: {
    tab() {
      this.startDate = null;
      this.endDate = null;
      this.dStart = null;
      this.dEnd = null;
      this.keyFocusStart = null;
      this.keyFocusEnd = null;
    },
  },
  mounted() {
    this.getToday();
  },
  methods: {
    getToday() {
      const d = new Date();
      const dateNow = d.getDate();
      const monthNow = d.getMonth();
      const yearNow = d.getFullYear();
      this.payload.dateFirst = dateNow;
      this.payload.month = monthNow;
      this.payload.year = yearNow;
      this.dToday = yearNow;
    },
    getFirstDayLastDay() {
      const m = this.payload.month;
      const y = this.payload.year;
      this.firstDay = new Date(y, m, 1).getDay();
      this.lastDay = new Date(y, m + 1, 0).getDate();
    },
    sumYear() {
      this.payload.year++;
      this.getFirstDayLastDay();
    },
    subtrYear() {
      this.payload.year--;
      this.getFirstDayLastDay();
    },
    sumMonth(m) {
      if (m != 1) {
        this.payload.month = m;
      } else {
        this.payload.month++;
        if (this.payload.month > 11) {
          this.payload.month = 0;
        }
      }
      this.getFirstDayLastDay();
    },
    subtrMonth(m) {
      if (m != 1) {
        this.payload.month = m;
      } else {
        this.payload.month--;
        if (this.payload.month < 0) {
          this.payload.month = 11;
        }
      }
      this.getFirstDayLastDay();
    },
    setDatePayload(y) {
      if (this.startDate == null) {
        this.setStartDate(y);
      } else if (this.startDate != null && this.endDate == null) {
        if (this.dToday - y >= this.dStart) {
          this.setEndDate(y);
        }
      } else if (this.endDate != null) {
        this.startDate = null;
        this.endDate = null;
        this.dStart = null;
        this.dEnd = null;
        this.keyFocusStart = null;
        this.keyFocusEnd = null;
      }
    },
    setStartDate(y) {
      this.startDate = this.dToday - y;
      this.dStart = `${this.startDate}`;
      this.keyFocusStart = `${this.startDate}`;
    },
    setEndDate(y) {
      this.endDate = this.dToday - y;
      this.dEnd = `${this.endDate}`;
      this.keyFocusEnd = `${this.endDate}`;
    },
    cancelDate() {
      this.startDate = null;
      this.endDate = null;
      this.dStart = null;
      this.dEnd = null;
      this.keyFocusStart = null;
      this.keyFocusEnd = null;
      // this.menu = false;
      const params = {
        startYear : '',
        endYear : '',
        displayStartYear : '',
        displayEndYear : ''
      }
      this.$emit('setYear', params)
    },
    submitDate() {
      this.menu = false
      if(this.startDate) {
        const startYear = moment({year : this.startDate}).format('YYYY-MM-DD')
        const endYear = moment({year : this.endDate ? this.endDate : this.startDate}).endOf('year').format('YYYY-MM-DD')
        const epochStartYear = moment(startYear).subtract(7, 'hour').valueOf()
        const epochEndYear = moment(endYear).subtract(7, 'hour').valueOf()
        const params = {
          startYear : epochStartYear,
          endYear : epochEndYear,
          displayStartYear : this.startDate,
          displayEndYear : this.endDate
        }
        this.$emit('setYear', params)
      }else{
        const params = {
          startYear : '',
          endYear : '',
          displayStartYear : '',
          displayEndYear : ''
        }
        this.$emit('setYear', params)
      }
      
    },
  },
};
</script>

<style lang="sass" scoped>
.font-10
  font-size: 10px
.font-12
  font-size: 12px
.cursor-pointer
  cursor: pointer
.box-selected
  &__not
    border: 1px solid white
    height: 28px
  &__true
    background: $secondary !important
    border: 1px solid rgba($secondary, .3) !important
    border-radius: 500px
    color: white !important
  &__secondary
    border-radius: 500px
    background: rgba($secondary, .2) !important
  &__disable
    color: grey
    background: white !important
    cursor: default !important
.box-year
  height: 32px
  border: 1px solid #bbbbbb
  border-radius: 4px
  &__list
    border: 1px solid $whitesnow
    border-radius: 4px
    background: $whitesnow
  &__today
    border: 1px solid rgba($secondary, .3)
</style>
