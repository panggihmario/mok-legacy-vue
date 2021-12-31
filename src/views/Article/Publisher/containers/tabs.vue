<template>
  <div class="d-flex justify-space-between">
    <div class="d-flex">
      <div v-for="(tab, idx) in afterTab" :key="idx" class="mr-4">
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
      <custom-input
        placeholder="Search"
        colorbg="white"
        outlined
        dense
        append-icon="search"
        v-if="isList"
        v-model="keyword"
        @keyup.enter="handleSearch"
      />
  </div>
</template>

<script>
export default {
  props : {
    isList : Boolean,
    position : String
  },
  mounted() {
    this.setTrueByPage()
  },
  methods : {
    handleSearch() {
      const keyword = this.keyword
      this.$emit('handleSearch', keyword)
    },
    changeActive(tab) {
      if(tab.payload === 'agregrator') {
        this.$router.push({
          name : tab.pathName,
          params : {
            page : 1,
            sites : 'CUMICUMI'
          }
        })
      }else {
        this.$router.push({
          name : tab.pathName,
          params : {
            page : 1
          }
        })
      }
     
    },
    setTrueByPage() {
      const tabs = this.tabList
      const positionPage = this.position
      const mapTabs = tabs.map((t) => {
        if(positionPage === t.payload) {
          return {
            ...t,
            active : true
          }
        }else {
          return {
            ...t
          }
        }
      })
      this.afterTab = mapTabs
    }
  },
  data () {
    return {
      keyword : '',
      afterTab : [],
      tabList: [
        {
          label: "List News",
          active: false,
          position: 1,
          payload: "list",
          pathName : 'listNewsPublisher'
        },
        {
          label: "Draft",
          active: false,
          position: 2,
          payload: "draft",
          pathName : 'draftNewsPublisher'
        },
        {
          label: "Terjadwal",
          active: false,
          position: 3,
          payload: "scheduled",
          pathName : 'scheduledNewsPublisher'
        },
        {
          label: "News Agregrator",
          active: false,
          position: 4,
          payload: "agregrator",
          pathName : 'agregratorPage'
        },
      ],
    }
  }
}
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