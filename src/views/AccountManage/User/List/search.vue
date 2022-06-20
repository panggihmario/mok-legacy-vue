<template>
  <v-row dense class="mt-8">
    <v-col cols="6" class="d-flex">
      <div class="d-flex align-center mr-12">
        <span>Total User&nbsp;:&nbsp;{{ totalUser }}</span>
      </div>
    </v-col>
    <v-col cols="6">
      <div class="d-flex justify-end">
        <custom-input
          placeholder="Search"
          @keyup.enter="onSearch"
          v-model="keyword"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props : {
    totalUser : {
      type : [String, Number]
    }
  },
  data () {
    return {
      keyword : '',
    }
  },
  mounted () {
    this.keyword = this.$route.query.search
  },
  methods : {
    onSearch () {
      this.$emit("onSearch", this.keyword)
        this.$router.push({
          name: this.$route.name,
          params: {
            page: 1,
          },
          query : {
            search : this.keyword
          }
        })
        .catch(() => {})
    }
  }
}
</script>