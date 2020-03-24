<template>
  <div>
    <Editor v-if="user === 'editor'" />
		<Publisher  v-else />
  </div>
</template>

<script>
import Editor from "./Editor";
import Publisher from "./Publisher";
import { mapState } from "vuex";
export default {
  components: {
		Editor,
		Publisher
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>

<style lang="sass" scoped>
.article
	&__label
		font-size: 24px
		font-weight: 500
</style>
