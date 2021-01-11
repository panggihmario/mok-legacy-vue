<template>
  <div>
    <div class="d-flex">
      <custom-select
        :items="sortList"
        :value="option.sort"
        label="Sort"
        background-color="whitesnow"
        v-model="option.sort"
        name="Gender"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["option"],
  data() {
    return {
      sortList: ["Username", "Date"],
    };
  },
};
</script>
