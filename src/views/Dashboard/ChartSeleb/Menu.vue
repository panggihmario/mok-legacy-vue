<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn depressed color="kellygreen" v-bind="attrs" v-on="on" width="121px">
        <div class="menu__btn-ctr">
          <div class="menu__label-btn text-capitalize text-white">{{ label }}</div>
          <v-icon right dark> arrow_drop_down </v-icon>
        </div>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        link
        v-for="(item, index) in items"
        :key="index"
        @click="onChange(item)"
      >
        <v-list-item-title>{{
          item.title
        }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { 
          title: "Daily"},
        { title: "Monthly" }, 
        { title: "Yearly" }],
      label : 'Daily'
    }
  },
   methods: {
    onChange(params) {
      this.label = params.title;
      this.$emit('changeSort', params.title)
    },
  },
}
</script>

<style lang="scss" scoped>
.menu {
  &__label-btn {
    font-size: 12px;
    font-weight: 500;
    color: white !important;
  }
	&__btn-ctr{
		display: flex;
		justify-content: space-between;
		width: 100%;
		align-items: center;
	}
}
</style>