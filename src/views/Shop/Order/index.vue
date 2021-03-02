<template>
  <div>
    <HeaderContent label="Order List" :list="crumbs" />
    <div class="d-flex justify-space-between mb-6">
      <div>
        <custom-button
          v-for="(item, idx) in tabLabel"
          :key="idx"
          rounded
          depressed
          class="mr-2 mb-2"
          :class="{ 'primarylowtint primary--text': tab == idx + 1 }"
          @click="moveTab(idx + 1)"
          >{{ item }}</custom-button
        >
      </div>
      <div class="ml-4" style="width: 200px;">
        <v-text-field outlined dense placeholder="Search"></v-text-field>
      </div>
    </div>

    <Table-All v-if="tab == 1"></Table-All>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import TableAll from "./all.vue";

export default {
  components: {
    HeaderContent,
    TableAll,
  },
  data() {
    return {
      crumbs: [
        {
          text: "Order",
        },
        {
          text: "List Order",
          disabled: true,
        },
      ],
      tabLabel: [
        "Semua",
        "Belum Bayar",
        "Menunggu",
        "Diproses",
        "Dikirim",
        "Selesai",
        "Batal",
      ],
      tab: 1,
      listAllLength: 0,
    };
  },
  methods: {
    moveTab(i) {
      this.tab = i;
    },
    getTotalListNew(i) {
      this.listAllLength = i;
    },
    goToDetail(params) {
      this.$router.push({
        name: "complaintDetail",
        params: {
          id: params.id,
        },
      });
    },
  },
};
</script>

<style lang="sass" scoped>
.font-12
	font-size: 12px
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
