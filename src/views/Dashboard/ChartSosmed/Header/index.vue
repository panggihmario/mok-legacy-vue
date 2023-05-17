<template>
    <div :class="k['dash__container']">
      <div class="d-flex justify-space-between align-center">
        <div :class="k['dash__label']">User Activity</div>
        <div :class="k['dash__actions']" >
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
          <Date/>
          <HourPicker/>
          <Channels/>
        </div>
      </div>
      {{ payload }}
    </div>
</template>
<script>
import isTrending from './isTrending.vue';
import SearchUsername from './searchUsername.vue';
import channels from './channels.vue';
import times from './times.vue';
import Date from "./date.vue"
import hourPicker from './hourpicker.vue';
export default {
  components : {
    Trending : isTrending,
    SearchUsername,
    Channels : channels,
    Times : times,
    Date,
    HourPicker : hourPicker
  },
  data () {
    return {
      keyword : '',
      payload: {
        timeline: "day",
        isTrending : false,
        performerId : '',
        channelCode : ''
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
  methods : {
    handleTrending(value) {
      this.payload.isTrending = value
    },
    setTimeline (value) {
      this.payload.timeline = value
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