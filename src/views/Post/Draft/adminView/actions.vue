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
  props : ['item'],
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
    checkIsSchedule(item) {
      if(item.scheduledTime){
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
      const isScheduled = this.checkIsSchedule(item)
      let payload
      if(isScheduled) {
        payload = {
          id : item.id,
          type : 'schedule',
          params : {
            ...item,
            isScheduled : true
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
        .then(response => {
          this.$emit('refreshDataFeed')
          this.loadingPublish = false
        })
        .catch((err) => {
          console.log(err.response)
          this.loadingPublish = false
        })
    }
   }
}
</script>