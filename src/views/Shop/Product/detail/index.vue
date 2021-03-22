<template>
  <div>
    <span>detail</span>
    {{ item }}
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      item: {},
    };
  },
  mounted() {
    this.handleGetProductById();
  },
  methods: {
    ...mapActions({
      getProductById: "product/getProductById",
    }),
    async handleGetProductById() {
      const id = this.$route.params.id;
      const response = await this.getProductById(id);
      if (response.status == 200) {
        this.item = response.data.data;
      }
    },
  },
};
</script>
