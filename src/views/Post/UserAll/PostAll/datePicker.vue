<template>
  <v-menu
    v-model="menuDate"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{on, attrs}">
      <div class="date__wrapper">
        <input
          v-bind="attrs"
          v-on="on" 
          readonly
          v-model="displayDate"
          placeholder="DD/MM/YYYY"
        />
        <v-icon color="secondary" size="small">fas fa-calendar</v-icon>
      </div>
    </template>
    <v-date-picker
      v-model="date"
      color="secondary"
      @input="handlePickDate"
      :min="currentDate"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      menuDate : false,
      date : '',
      displayDate: ''
    }
  },
  computed : {
    currentDate() {
      const d = moment().format("YYYY-MM-DD");
      return d;
    },
  },
  methods : {
    handlePickDate () {
      this.menuDate = false
      const display = moment(this.date).format('DD/MM/YYYY')
      this.displayDate = display
      const currentEnd = moment(this.date).endOf('day').format("YYYY-MM-DD hh:mm")
      const current = moment().format("ss.SSS")
      const total = `${currentEnd}:${current}`
      const epochTotal = moment(total).valueOf()
      this.$emit('getEpoch', epochTotal)
    }
  }
}
</script>

<style lang="scss" scoped>
.date {
  &__wrapper {
    display: flex;
    border: 1px solid $secondary;
    height: 29px;
    border-radius: 4px;
    padding: 0 9px;
    // width: 100px;
    & input {
      font-size: 11px;
      height: 100%;
      width: inherit;
      &:focus {
        border: none;
        outline: none;
      }
    }
  }
}
</style>