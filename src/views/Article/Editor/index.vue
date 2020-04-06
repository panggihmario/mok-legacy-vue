<template>
  <div>
    <HeaderContent label="List Article">
      <custom-button
        color="carmine"
        class="white--text"
        @click="goToCreateArticle"
      >
        Buat Article
      </custom-button>
    </HeaderContent>
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
        <ListArticle />
      </v-tab-item>
      <v-tab-item>
        <Draft />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ListArticle from "./list/article";
import Draft from "./list/draft";
import HeaderContent from "../../../containers/HeaderContent";
export default {
  components: {
    ListArticle,
    Draft,
    HeaderContent
  },
  computed: {
    ...mapState(["user"])
  },
  data() {
    return {
      tab: null
    };
  },
  methods: {
    goToCreateArticle() {
      this.$router.push("/article/create");
    },
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
