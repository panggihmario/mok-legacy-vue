<template>
  <div class="d-flex justify-space-between header__container">
    <div>
      <div class="black--text header__label">{{ label }}</div>
      <v-breadcrumbs class="header__breadcrumbs" :items="list">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item :href="item.href" :disabled="item.disabled">
            <div :class="!item.disabled && 'carmine--text'">
              {{ item.text }}
            </div>
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </div>
    <div class="d-flex">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array
    },
    label: {
      type: String
    },
  },
};
</script>

<style lang="sass" scoped>
.header
	&__breadcrumbs
		padding: 0 !important
	&__label
		font-size: 24px
		font-weight: 500
	&__container
		margin-bottom: 40px
</style>
