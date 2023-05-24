<template>
    <div :class="k['dash__container']">
      <div class="d-flex justify-space-between align-center">
        <div :class="k['dash__label']">User Activity</div>
        <div :class="k['dash__actions']" >
          <custom-button @click="handleResetFilter">
            <div class="primary--text">Reset Filter</div>
          </custom-button>
          <Trending
            :isTrending="payload.isTrending"
            @onTrending="handleTrending"
          />
          <SearchUsername
            :performerId="payload.performerId"
            @setPerfomerId="setPerfomerId"
          />
          <Channels
            :channelCode="payload.channelCode"
            @setChannelCode="setChannelCode"
          />
          <Times
            :timeline="payload.timeline"
            @setTimeline="setTimeline"
          />
          <Date
            v-if="payload.timeline === 'day' || payload.timeline === 'hour'"
            @setDate="setDate"
            :display="display.date"
          />
          <Month
            v-if="payload.timeline === 'month' "
            @setMonth="setMonth"
          />
          <Year
            v-if="payload.timeline === 'year'"
            @setYear="setYear"
          />
          <HourPicker
            :payload="payload"
            @setHour="setHour"
          />
          <custom-button @click="handleFilter" color="secondary" >Show Chart</custom-button>
        </div>
      </div>
      <div :class="k['dash__header-label']">
        <b>213 Post</b> dilihat oleh <b>{{ display.username }}</b>  dalam <b>{{ display.channel }}</b> pada <b>23 Jan 2022</b>
      </div>
      {{ payload }}
      <slot></slot>
    </div>
</template>
<script>
import moment  from 'moment';
import { mapActions } from 'vuex';
import isTrending from './isTrending.vue';
import SearchUsername from './searchUsername.vue';
import channels from './channels.vue';
import times from './times.vue';
import Date from "./date.vue"
import Month from "./month.vue"
import hourPicker from './hourpicker.vue';
import Year from "./year.vue"
export default {
  components : {
    Trending : isTrending,
    SearchUsername,
    Channels : channels,
    Times : times,
    Date,
    HourPicker : hourPicker,
    Month,
    Year
  },
  data () {
    return {
      keyword : '',
      display : {
        date : '',
        totalPost : '',
        channel : 'Semua Channel',
        username : 'Semua User'
      },
      payload: {
        timeline: "day",
        isTrending : false,
        performerId : '',
        channelCode : '',
        startDateAt : '',
        endDateAt : '',
        startHourAt : '',
        endHourAt : '',
      },
      itemsList : [],
      items: [
        {
          text: "Dashboard Sosmed",
          disabled: true,
        },
      ],
    }
  },
  mounted() {
    this.initChart()
  },
  methods : {
    ...mapActions({
      fetchStatisticsUserSeen : 'dashboard/fetchStatisticsUserSeen' 
    }),
    resetPayloadFilter () {
      return {
        timeline: "day",
        isTrending : false,
        performerId : '',
        channelCode : '',
        startDateAt : '',
        endDateAt : '',
        startHourAt : '',
        endHourAt : '',
        // startMonthAt : '',
        // endMonthAt : '',
      }
    },
    handleResetFilter () {
      console.log("reset here")
      this.display.date = ''
      Object.assign(this.$data.payload, this.resetPayloadFilter())
      return this.initChart()
    },
    initChart () {
      const startDateAt = moment().startOf('day').subtract(7, 'hour').valueOf()
      const endDateAt = moment().endOf('day').subtract(7, 'hour').valueOf()
      const payload = {
        filterBy : this.payload.timeline,
        params : {
          isTrending : false,
          startDateAt ,
          endDateAt ,
        }
      }
      console.log(payload)
      return this.fetchStatisticsUserSeen(payload)
        .then(response => {
          this.$emit('setData', response)
          return response
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    handleFilter () {
      const payload = {
        filterBy : this.payload.timeline,
        params : {
          isTrending : this.payload.isTrending,
          ...this.payload.performerId && {performerId : this.payload.performerId},
          ...this.payload.channelCode && {channelCode : this.payload.channelCode},
          startDateAt : this.payload.startDateAt,
          endDateAt : this.payload.endDateAt,
          ...this.payload.endHourAt && {endHourAt : this.payload.endHourAt},
          ...this.payload.startHourAt && {startHourAt : this.payload.startHourAt},
          ...this.payload.timeline === 'month' && {startMonthAt : this.payload.startMonthAt},
          ...this.payload.timeline === 'month' && {endMonthAt : this.payload.endMonthAt}
        },
      }
      return this.fetchStatisticsUserSeen(payload)
        .then(response => {
          this.$emit('setData', response)
        })
        .catch(() => {
          return this.initChart()
        })
    },
    handleTrending(value) {
      this.payload.isTrending = value
    },
    setHour (value) {
      this.payload.startHourAt = value.start
      this.payload.endHourAt = value.end
    },
    setYear (value) {
      this.payload.startDateAt = value.startYear
      this.payload.endDateAt = value.endYear
    },
    setMonth (value) {
      this.payload.startDateAt = value.epochStartAt
      this.payload.endDateAt = value.epochEndAt
    },
    setDate (value) {
      this.payload.startDateAt = value.startEpoch
      this.payload.endDateAt = value.endEpoch
      this.display.date = value.displayDate
    },
    resetDay () {
      this.payload.startDateAt = ''
      this.payload.endDateAt = ''
    },
    resetHour () {
      this.payload.startHourAt = ''
      this.payload.endHourAt = ''
    },
    resetMonth () {
      this.resetDay()
      this.resetHour()
      this.payload.startMonthAt = ''
      this.payload.endMonthAt = ''
    },
    setTimeline (value) {
      this.payload.timeline = value
      this.resetMonth()
    },
    setChannelCode (value) {
      this.payload.channelCode = value
    },
    setPerfomerId(value) {
      this.payload.performerId = value
    },
    handleSearchUser () {

    }
  }
}
</script>

<style lang="scss" module="k" src="../../style.scss">

</style>