<template>
    <div :class="k['dash__container']">
      <div class="d-flex justify-space-between align-center">
        <div :class="k['dash__label']">User Activity</div>
        <div :class="k['dash__actions']" >
          <custom-button v-if="isReset" @click="handleResetFilter">
            <div class="primary--text">Reset Filter</div>
          </custom-button>
          <div v-else ></div>
          <Trending
            :isTrending="payload.isTrending"
            @onTrending="handleTrending"
          />
          <SearchUsername
            :performerId="payload.performerId"
            @setPerfomerId="setPerfomerId"
            :isReset=isReset
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
            ref="filterDate"
          />
          <Month
            v-if="payload.timeline === 'month' "
            @setMonth="setMonth"
          />
          <Year
            v-if="payload.timeline === 'year'"
            @setYear="setYear"
            :display="display.year"
          />
          <HourPicker
            :payload="payload"
            :display="display.hour"
            @setHour="setHour"
            :isDisable="disableHour"
            ref="filterHour"
          />
          <custom-button :loading="isLoading" @click="handleFilter" color="secondary" >Show Chart</custom-button>
        </div>
      </div>
      <div v-if="isBanner && !isNoData" :class="k['dash__header-label']">
        <b>{{ display.totalPost }} Post</b> dilihat oleh <b>{{ display.username }}</b>  dalam <b>{{ display.channel }}</b> pada <b>{{ display.timeLabel }}</b> <span v-if="display.hourLabel">di jam</span> <b>{{ display.hourLabel }}</b>
      </div>
      <div v-if="isNoData" :class="k['dash__header-nodata']">
        <v-icon color="secondary" small>info</v-icon>
        <div> Data Belum Tersedia</div>
      </div>
    <v-snackbar
      v-model="snackbar"
      right
      top
      color="primary"
    >
      Silahkan Plih Tanggal / Bulan / Tahun
    </v-snackbar>
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
      snackbar : false,
      isNoData : false,
      isBanner : false,
      isLoading : false,
      display : {
        date : '',
        year : '',
        hour : '',
        totalPost : '',
        timeLabel : '',
        hourLabel : '',
        channel : 'Semua Channel',
        username : 'Semua User'
      },
      isReset : false,
      disableHour : true,
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
    this.initChart('day')
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
      }
    },
    resetDisplayFilter () {
      return {
        date : '',
        year : '',
        hour : '',
        totalPost : '',
        hourLabel : '',
        timeLabel : '',
        channel : 'Semua Channel',
        username : 'Semua User'
      }
    },
    handleResetFilter () {
      this.isReset = false
      this.isNoData = false
      this.disableHour = true
      this.$refs.filterDate && this.$refs.filterDate.onReset()
      Object.assign(this.$data.display, this.resetDisplayFilter())
      Object.assign(this.$data.payload, this.resetPayloadFilter())
      this.resetMonth()
      return this.initChart('day')
    },
    initChart (timeline) {
      const startDateAt = moment().startOf(timeline).subtract(7, 'hour').valueOf()
      const endDateAt = moment().endOf(timeline).subtract(7, 'hour').valueOf()
      const payload = {
        filterBy : this.payload.timeline,
        params : {
          isTrending : false,
          startDateAt ,
          endDateAt ,
        }
      }
      return this.fetchStatisticsUserSeen(payload)
        .then(response => { 
          this.$emit('setData', response)
          const datasets = response.datasets[0]
          const totalPost = datasets.totalPost
          const currentDate = moment(response.firstDate).format('DD MMM YYYY')
          this.display.totalPost = totalPost
          this.display.timeLabel = currentDate
          this.isBanner = true
          return response })
        .catch(err => {
          console.log(err.response)
        })
    },
    handleFilter () {
      if(this.payload.startDateAt) {
        this.isLoading = true
        const payload = {
          filterBy : this.payload.timeline,
          params : {
            isTrending : this.payload.isTrending,
            ...this.payload.performerId && {performerId : this.payload.performerId},
            ...this.payload.channelCode && {channelCode : this.payload.channelCode},
            startDateAt : this.payload.startDateAt,
            endDateAt : this.payload.endDateAt,
            ...this.payload.endHourAt && {endHourAt : this.payload.endHourAt},
            ...(this.payload.startHourAt || this.payload.startHourAt === 0 ) && {startHourAt : this.payload.startHourAt},
          },
      }
      this.isNoData = false
      return this.fetchStatisticsUserSeen(payload)
        .then(response => {
          this.isBanner = true
          const datasets = response.datasets[0]
          const totalPost = datasets.totalPost
          this.display.totalPost = totalPost
          this.$emit('setData', response)
          this.isLoading = false
          const allEqual = datasets.data.every( v => v === 0 )
          if(allEqual) {
            this.isNoData = true
          }else{
            this.isNoData = false
          }
        })
        .catch((err) => {
          this.isLoading = false
          return this.initChart('day')
        })
      }else{
        this.snackbar = true
        setTimeout(() => {
          this.snackbar = false
        },1000)
      }
     
    },
    handleTrending(value) {
      this.isReset = true
      this.payload.isTrending = value
      this.isBanner = false
    },
    setHour (value) {
      this.isReset = true
      this.payload.startHourAt = value.start
      this.payload.endHourAt = value.end
      this.display.hour = value.displayHour
      const c = `${value.displayHour}`
      this.display.hourLabel = c
      this.isBanner = false
    },
    setYear (value) {
      this.isReset = true
      this.payload.startDateAt = value.startYear
      this.payload.endDateAt = value.endYear
      this.isBanner = false
      let display
      if(value.displayEndYear) {
        display = `${value.displayStartYear} - ${value.displayEndYear}`
      }else{
        display = `${value.displayStartYear}`
      }
      this.display.year = display
      this.display.timeLabel = display
    },
    setMonth (value) {
      this.isBanner = false
      this.isReset = true
      this.payload.startDateAt = value.epochStartAt
      this.payload.endDateAt = value.epochEndAt
      this.resetHour()
      if(value.startAt === value.endAt){
        this.display.timeLabel = `${value.startAt}`
        this.disableHour = false
      }else{
        this.display.timeLabel = `${value.startAt} - ${value.endAt}`
        this.disableHour = true
      }
      
    },
    setDate (value) {
      this.isBanner = false
      this.disableHour = false
      this.isReset = true
      this.payload.startDateAt = value.startEpoch
      this.payload.endDateAt = value.endEpoch
      this.display.date = value.displayDate
      this.display.timeLabel = value.displayDate
    },
    resetDay () {
      this.payload.startDateAt = ''
      this.payload.endDateAt = ''
      this.display.date = ''
    },
    resetHour () {
      this.payload.startHourAt = ''
      this.payload.endHourAt = ''
      this.display.hour = ''
      this.display.hourLabel = ''
      this.$refs.filterHour.cancelDate()
    },
    resetMonth () {
      this.resetDay()
      this.resetHour()
      this.payload.startMonthAt = ''
      this.payload.endMonthAt = ''
    },
    setTimeline (value) {
      this.isReset = true
      this.isBanner = false
      this.payload.timeline = value
      this.display.year = ''
      this.disableHour = true
      this.resetMonth()
    },
    setChannelCode (value) {
      this.isReset = true
      this.isBanner = false
      this.payload.channelCode = value.code
      this.display.channel = value.name
    },
    setPerfomerId(value) {
      this.isReset = true
      this.isBanner = false
      this.payload.performerId = value.id
      if(value.id) {
        this.display.username = value.name
      }else{
        this.display.username = 'Semua User'
      }
      
    },
  }
}
</script>

<style lang="scss" module="k" src="../../style.scss">

</style>