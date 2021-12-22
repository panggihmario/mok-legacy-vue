<template>
  <custom-button 
    :loading="loadingDelete" 
    size="small" 
    color="primary" 
    @click="handleDelete"
  >
    Delete
  </custom-button>
</template>

<script>
import { mapActions } from "vuex"
export default {
  props : ['item'],
  data () {
    return {
      loadingDelete : false
    }
  },
  methods : {
    ...mapActions({
      deleteFeed : 'post/deleteFeed'
    }),
    handleDelete() {
      this.loadingDelete = true
      const id = this.item.id
      return this.deleteFeed(id)
        .then(response => {
          setTimeout(() => {
            this.loadingDelete = false
            this.$emit('successDelete')
          }, 2000)
        })
        .catch(err => {
          this.loadingDelete = false
        })
    }
  }
}
</script>