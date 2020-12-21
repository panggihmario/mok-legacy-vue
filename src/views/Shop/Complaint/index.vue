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
        >Komplain Baru {{ listNewLength }}</custom-button
      >
      <custom-button
        rounded
        depressed
        class="mr-2"
        :class="{ 'primarylowtint primary--text': tab == 2 }"
        @click="moveTab(2)"
        >Sedang Mediasi {{ listProcessLength }}</custom-button
      >
      <custom-button
        rounded
        depressed
        class="mr-2"
        :class="{ 'primarylowtint primary--text': tab == 3 }"
        @click="moveTab(3)"
        >Selesai Mediasi {{ listFinishLength }}</custom-button
      >
    </div>

    <Table-New
      v-if="tab == 1"
      @getTotalList="getTotalListNew"
      @goToDetail="goToDetail"
    ></Table-New>
    <Table-Process
      v-if="tab == 2"
      @getTotalList="getTotalListProcess"
      @goToDetail="goToDetail"
    ></Table-Process>
    <Table-Finish
      v-if="tab == 3"
      @getTotalList="getTotalListFinish"
      @goToDetail="goToDetail"
    ></Table-Finish>
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
      listNewLength: 0,
      listProcessLength: 0,
      listFinishLength: 0,
    };
  },
  methods: {
    moveTab(i) {
      this.tab = i;
    },
    getTotalListNew(i) {
      this.listNewLength = i;
    },
    getTotalListProcess(i) {
      this.listProcessLength = i;
    },
    getTotalListFinish(i) {
      this.listFinishLength = i;
    },
    goToDetail(params) {
      this.$router.push({
        name: "complaintDetail",
        params: {
          id: params.id,
          inv: params.inv,
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
