<template>
  <div>
    <custom-button
      color="primary"
      v-if="!viewNews"
      size="medium"
      class="my-3"
      width="101"
      @click="handlePublish(item)"
      :loading="loading"
    >
      Publish
    </custom-button>
  </div>
</template>

<script>
import {mapActions, mapMutations} from 'vuex';
export default {
  props : ['item', 'viewNews'],
  data () {
    return {
      loading : false
    }
  },
  methods : {
    ...mapActions({
      publishNewsAgregator: "news/publishNewsAgregator",
    }),
    ...mapMutations({
      setSelectedToPublish: "news/setSelectedToPublish",
    }),
    handlePublish(payload) {
      this.loading = true
      const params = { ...payload };
      setTimeout(() => {
        this.postApi(params)
      },2500)
    },
    postApi(params) {
      return this.publishNewsAgregator(params)
        .then(() => {
          this.loading = false
          this.$emit('successPublish')
        })
        .then(() => {
          return this.setSelectedToPublish([]);
        })
        .catch((err) => {
          this.loading = false
          this.$emit('errorPublish', err)
        });
    }
  }
}
</script>