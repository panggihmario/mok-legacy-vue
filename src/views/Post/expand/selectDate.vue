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
          :placeholder="$route.name === 'draft' ?  'Disubmit Pada' : 'Dipublish Pada' "
          v-model="displayDate"
          class="expand__field"
          colorbg="white"
          icon="fas fa-calendar"
        >
       
        </custom-input>
      </template>

      <v-card class="dt__card" flat>
        <v-row>
          <v-col cols="6">
            <v-date-picker
              width="250"
              v-model="choosenDate"
              no-title
              range
              :max="maxDate"
              :min="minDate"
            >
            </v-date-picker>

          </v-col>
          <v-col class="dt__box-right">
            <div>
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
            </div>
            <div>
              <div class="d-flex justify-end">
                <v-btn class="mr-4" small @click="onReset" text color="warning">
                  <div class="dt__text-button">Reset</div>
                </v-btn>
                <v-btn @click="closeMenu" small color="secondary">
                  <div class="dt__text-button">OK</div>
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import moment from "moment";
import { mapMutations, mapState } from "vuex";
export default {
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true,
    selectedDate: "",
    dates: [],
  }),
  computed: {
    ...mapState({
      paramsDate: (state) => state.post.paramsDate,
      displayDate: (state) => state.post.displayDate,
    }),
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
    showWarning() {
      const [from, end] = this.choosenDate;
      if (from && end) {
        const mFrom = moment(from);
        const mEnd = moment(end);
        if (mFrom > mEnd) {
          return "wrong range date";
        } else {
          return;
        }
      }
    },
    currentDate() {
      const d = moment().format("YYYY-MM-DD");
      return d;
    },
    maxDate() {
      if (this.$route.name === "schedule") {
        return null;
      } else {
        return this.currentDate;
      }
    },
    minDate() {
      if (this.$route.name === "schedule") {
        return null;
      } else {
        const d = moment().subtract(6 , 'months').format("YYYY-MM-DD")
        return d
      }
    },
    choosenDate: {
      get() {
        return this.paramsDate;
      },
      set(value) {
        this.setParamsDate(value)
        const after = this.checkRangeDate(value);
        if (after[1] && after[0]) {
          this.setParamsDate(after);
        } else {
          this.setParamsDate(value);
        }
      },
    },
  },
  methods: {
    ...mapMutations({
      setParamsDate: "post/setParamsDate",
      setDisplayDate: "post/setDisplayDate",
      setIsFilterable : 'post/setIsFilterable'
    }),
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
    onReset() {
      this.choosenDate = [];
      this.setDisplayDate("");
    },
    formatter(value) {
      const v = moment(value).format("DD/MM/YYYY");
      return v;
    },
    closeMenu() {
      this.menu = false;
      this.onClick();
    },
    onClick() {
      if (this.choosenDate.length > 0) {
        const d = this.choosenDate;
        const from = this.formatter(d[0]);
        this.setDisplayDate(from);
        this.setIsFilterable(true)
        if (this.choosenDate.length > 1) {
          const afterCheckRangeDate = this.checkRangeDate(this.choosenDate);
          const start = this.formatter(afterCheckRangeDate[0]);
          const end = this.formatter(afterCheckRangeDate[1]);
          const fullDate = `${start} - ${end}`;
          this.setDisplayDate(fullDate);
          this.setParamsDate(afterCheckRangeDate);
          
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped src="./expand.scss"  >

</style>