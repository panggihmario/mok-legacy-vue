<template>
  <div>
    <custom-button
      class="mr-2"
      size="small"
      color="secondary"
      :loading="loadingPublish"
      @click="publishFeed(item)"
    >
      Publish
    </custom-button>
    <custom-button 
      size="small" 
      color="primary"
      :loading="loadingReject"
      @click="rejectFeed"
    >
      Reject
    </custom-button>
  </div>
</template>

<script>
import { mapActions } from "vuex"
export default {
  props : ['item', 'epochDate'],
  data() {
    return {
      loadingPublish : false,
      loadingReject : false
    }
  },
  methods : {
    ...mapActions({
      updatePostFeed : 'post/updatePostFeed'
    }),
    checkIsSchedule() {
      if(this.epochDate){
        return true
      }else{
        return false
      }
    },
    rejectFeed(){
      const item = this.item
      this.loadingReject = true
      const payload = {
        id : item.id,
        type : 'reject',
        params : {
          ...item
        }
      }
      return this.updatePostFeed(payload)
        .then(() => {
          this.$emit('refreshDataFeed')
          this.loadingReject = false
        })
        .catch(err => {
          this.loadingReject = false
        })
    },
    publishFeed (){
      this.loadingPublish = true
      const item = this.item
      const isScheduled = this.checkIsSchedule()
      let payload
      if(isScheduled) {
        payload = {
          id : item.id,
          type : 'schedule',
          params : {
            ...item,
            isScheduled : true,
            scheduledTime: this.epochDate
          }
        }
      }else{
        payload = {
          id : item.id,
          type : 'publish',
          params : {
            ...item
          }
        }
      }
      return this.updatePostFeed(payload)
        .then(() => {
          setTimeout(() => {
            this.$emit('refreshDataFeed')
            this.loadingPublish = false
          }, 1000)
        })
        .catch((err) => {
          this.loadingPublish = false
        })
    }
   }
}
</script>