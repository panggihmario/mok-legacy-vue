<template>
  <div>
    <HeaderContent :list="list" label="List News" />
    <div class="d-flex justify-space-between">
    <div class="d-flex">
      <div v-for="(tab, idx) in tabList" :key="idx" class="mr-4">
        <div
          :class="
            tab.active ? `ctab__box  ctab__active` : `ctab__box ctab__nonactive`
          "
          @click="changeActive(tab)"
        >
          <div>{{ tab.label }}</div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
export default {
  components: {
    HeaderContent,
  },
  data() {
    return {
      tab: null,
      tabPosition: 4,
      tabList: [
        {
          label: "List News",
          active: false,
          position: 1,
          payload: "list",
        },
        {
          label: "Draft",
          active: false,
          position: 2,
          payload: "draft",
        },
        {
          label: "Terjadwal",
          active: false,
          position: 3,
          payload: "scheduled",
        },
        {
          label: "News Agregrator",
          active: true,
          position: 4,
          payload: "scheduled",
        },
      ],
      list: [
        {
          text: "News",
          disabled: false,
          href: "publisher",
        },
      ],
      articles: [],
      drafts: [],
      totalPages: 0,
      pageNews: 1,
      keyword: "",
      isSearch: false,
      listNews: [],
    };
  },
  methods: {
    changeActive(tab) {
      // this.tabPosition = tab.position;
      // const newTabList = this.tabList.map((t) => {
      //   if (t.position === tab.position) {
      //     return {
      //       ...t,
      //       active: true,
      //     };
      //   } else {
      //     return {
      //       ...t,
      //       active: false,
      //     };
      //   }
      // });
      // this.tabList = newTabList;
      // return this.changeTabs(tab.payload);
    },
  },
};
</script>

<style lang="sass" scoped>
.article
  &__label
    font-size: 24px
    font-weight: 500
.tab
  &__box
    width: 500px
  &__active
    border-radius: 32px
    background-color: #FFF3E7
.ctab
  &__box
    border-radius: 32px
    font-size: 12px
    padding: 9px 24px 9px 24px
    display: inline-block
    cursor: pointer
  &__nonactive
    background-color: #FAFAFA
    color: #777777
  &__active
    background-color: #FFF3E7
    color: #FF8717
</style>

<style scoped>
.v-tab:hover {
  background-color: transparent;
}
.v-tab:focus {
  background-color: transparent;
}
</style>
