<template>
  <div>
    <HeaderContent label="Komplain" :list="crumbs" />
    <div class="mb-6">
      <custom-button
        rounded
        depressed
        class="mr-2"
        :class="{ 'lowtintorange orangeprimary--text': tab == 1 }"
        @click="moveTab(1)"
        >Komplain Baru</custom-button
      >
      <custom-button
        rounded
        depressed
        class="mr-2"
        :class="{ 'lowtintorange orangeprimary--text': tab == 2 }"
        @click="moveTab(2)"
        >Sedang Mediasi</custom-button
      >
      <custom-button
        rounded
        depressed
        class="mr-2"
        :class="{ 'lowtintorange orangeprimary--text': tab == 3 }"
        @click="moveTab(3)"
        >Selesai Mediasi</custom-button
      >
    </div>

    <Table-New v-if="tab == 1" @goToDetail="goToDetail"></Table-New>
    <Table-During v-if="tab == 2" @goToDetail="goToDetail"></Table-During>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import TableNew from "./new.vue";
import TableDuring from "./during.vue";

export default {
  components: {
    HeaderContent,
    TableNew,
    TableDuring,
  },
  data() {
    return {
      crumbs: [
        {
          text: "Komplain",
        },
        {
          text: "List Komplain",
          disabled: true,
        },
      ],
      tab: 1,
    };
  },
  methods: {
    moveTab(i) {
      this.tab = i;
    },
    goToDetail(inv) {
      this.$router.push({
        name: "complaintDetail",
        query: {
          inv: inv,
        },
      });
    },
  },
};
</script>

<style lang="sass" scoped>
.dialog
	&__container
		padding: 32px
	&__label
		font-size: 20px
		font-weight: 500
		margin-bottom: 20px
.item
	&__data
		font-size: 12px
		color: #767676
</style>
