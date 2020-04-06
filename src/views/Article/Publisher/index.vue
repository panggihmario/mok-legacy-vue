<template>
  <div>
		<HeaderContent
			label="List Article"
		/>
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
import HeaderContent from "../../../containers/HeaderContent";
import Draft from './list/draft'
export default {
	components : {
		ListArticle,
		Draft,
		HeaderContent
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
