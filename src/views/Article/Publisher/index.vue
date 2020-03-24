<template>
  <div>
    <div class="d-flex justify-space-between align-center">
      <div class="black--text article__label">List Article</div>
    </div>
    <v-tabs @change="changeTabs" v-model="tab">
      <v-tab>
        <span class="text-capitalize">List Article </span>
      </v-tab>
      <v-tab>
        <span class="text-capitalize">Draft</span>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
				<ListArticle/>
      </v-tab-item>
      <v-tab-item>
				<Draft/>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import ListArticle from './list/article'
import Draft from './list/draft'
export default {
	components : {
		ListArticle,
		Draft
	},
  data() {
    return {
      tab: null
    };
  },
  methods: {
    changeTabs(e) {
      const positionTabs = e;
    }
  }
};
</script>

<style lang="sass" scoped>
.article
	&__label
		font-size: 24px
		font-weight: 500
</style>
