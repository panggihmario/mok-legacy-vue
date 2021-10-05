<template>
  <div class="date__ctr">
    <div class="date__sublabel-passive">From</div>
    <input readonly type="text" class="date__input-passive" :value="beforeDate" />
    <div class="date__sublabel">Until</div>
    <v-menu
      v-model="menu2"
      :nudge-right="30"
      transition="slide-x-transition"
      min-width="auto"
      bottom
    >
      <template v-slot:activator="{ on, attrs }">
        <input
          v-bind="attrs"
          v-on="on"
          :value="valueDate"
          type="text"
          class="date__input"
        />
      </template>
      <v-date-picker
        v-model="date"
        color="secondary"
        @input="pickDate"
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
import moment from "moment"
export default {
  mounted () {
    this.pickDate()
  },
  data () {
    return {
      menu2 : false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    }
  },
  computed: {
    valueDate() {
      const newDate = moment(this.date).format("DD/MM/YYYY");
      return newDate;
    },
    beforeDate() {
      const minusDate = moment(this.date).subtract(7, "d").format("DD/MM/YYYY");
      return minusDate;
    },
  },
  methods : {
    pickDate() { 
      const valueDate = this.valueDate
      const beforeDate = this.beforeDate
      const epochValue = moment(valueDate, "DD/MM/YYYY" ).add(7, 'hours').unix()
      const epochBefore = moment(beforeDate, "DD/MM/YYYY").add(7, 'hours').unix()
      const miliEpochValue = epochValue * 1000
      const miliEpochBefore = epochBefore * 1000
      const payload = {
        startAt : miliEpochBefore,
        endAt : miliEpochValue
      }
      this.$emit("getPayloadDate", payload)
    }
  }
}
</script>

<style lang="scss" scoped>
.date {
  &__input {
    background: #fafafa;
    border: 1px solid #1890ff;
    box-sizing: border-box;
    padding: 9px 9px 9px 10px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
  }
  &__input:focus {
    border: 1px solid #1890ff;
    outline: none !important;
  }
  &__input-passive {
    background: #FAFAFA;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 9px 9px 9px 10px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
  }
  &__input-passive:focus {
    outline: none !important;
  }
  &__ctr {
    display: flex;
    align-items: center;
  }
  &__sublabel-passive {
    color: #777777 ;
    font-size: 12px;
    font-weight: 500;
    margin-right: 8px;
  }
  &__sublabel {
    color: #000000;
    font-size: 12px;
    font-weight: bold;
    margin-right: 8px;
    margin-left: 32px;
  }
}
</style>