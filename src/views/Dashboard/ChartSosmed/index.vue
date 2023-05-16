<template>
  <div>
    <Header-Content label="Dashboard" :list="items" />
    <div :class="k['dash__container']">
      <div class="d-flex justify-space-between align-center">
        <div :class="k['dash__label']">User Activity</div>
        <div :class="k['dash__actions']" >
          <div :class="k['dash__action']">
            <v-checkbox
              input-value="true"
              value
              label="Trending"
            ></v-checkbox>
          </div>
          <v-autocomplete
            v-model="keyword"
            color="secondary"
            :items="itemsList"
            :search-input.sync="payloadFilter.username"
            placeholder="Username"
            clearable
            outlined
            dense
            hide-details
            @keyup="handleSearchUser"
            class="mr-2 font-12"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
export default {
  components : {
    HeaderContent
  },
  data () {
    return {
      keyword : '',
      payloadFilter: {
        username: "",
        timeline: "HOUR",
      },
      itemsList : [],
      items: [
        {
          text: "Dashboard Sosmed",
          disabled: true,
        },
      ],
    }
  },
  methods : {
    handleSearchUser () {

    }
  }
}
</script>

<style lang="scss" module="k" src="../style.scss">

</style>