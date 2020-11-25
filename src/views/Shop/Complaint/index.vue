<template>
  <div>
    <HeaderContent label="Komplain" :list="crumbs" />
    <div class="mb-6">
      <custom-button
        rounded
        depressed
        class="mr-2"
        :class="{ 'primarylowtint primary--text': tab == 1 }"
        @click="moveTab(1)"
        >Komplain Baru</custom-button
      >
      <custom-button
        rounded
        depressed
        class="mr-2"
        :class="{ 'primarylowtint primary--text': tab == 2 }"
        @click="moveTab(2)"
        >Sedang Mediasi</custom-button
      >
      <custom-button
        rounded
        depressed
        class="mr-2"
        :class="{ 'primarylowtint primary--text': tab == 3 }"
        @click="moveTab(3)"
        >Selesai Mediasi</custom-button
      >
    </div>

    <Table-New v-if="tab == 1" @goToDetail="goToDetail"></Table-New>
    <Table-Process v-if="tab == 2" @goToDetail="goToDetail"></Table-Process>
    <Table-Finish v-if="tab == 3" @goToDetail="goToDetail"></Table-Finish>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import TableNew from "./new.vue";
import TableProcess from "./process.vue";
import TableFinish from "./finish.vue";

export default {
  components: {
    HeaderContent,
    TableNew,
    TableProcess,
    TableFinish,
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
    goToDetail(item) {
      this.$router.push({
        name: "complaintDetail",
        params: {
          id: item.id,
          inv: item.inv,
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
