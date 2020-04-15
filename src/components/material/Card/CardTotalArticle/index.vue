<template>
  <Card width="252" height="113" class="card">
    <div class="d-flex align-center card__box px-4" :class="color">
      <v-icon color="white">mdi-{{ icon }}</v-icon>
      <div class="card__box__total white--text ml-2">{{ total }}</div>
    </div>
    <div class="card__content">
      <div class="card__content__action" @click="handleClick">Show Detail</div>
      <div class="mt-6">
        <div class="charcoal--text">{{ title }}</div>
        <div class="charcoal--text description__content">{{ description }}</div>
      </div>
    </div>
  </Card>
</template>

<script>
import Card from "../index";
export default {
  components: {
    Card
  },
  props: {
    icon: {
      type: String,
      default: "checkbox-marked-circle-outline"
    },
    total: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: "Title"
    },
    description: {
      type: String,
      default: "Description"
    },
    link: {
      type: String
    },
    color: {
      type: String,
      default: "primary"
    },
    noAction: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick() {
      console.log(this.link);
    }
  }
};
</script>


<style lang="sass" scoped>
.description
  &__content
    font-size: 12px
    font-weight: 300
    letter-spacing: 0.01em
.card
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05)
  border-radius: 8px !important
  &__content
    padding: 12px
    width: 100%
    &__action
      text-align: right
      font-size: 12px
      font-weight: 300
      text-decoration: underline
      cursor: pointer
    &__description
      margin-top: 36px
  &__box
    width: 126px
    height: 58px
    position: absolute
    top: -16px
    left: 12px
    border-radius: 4px !important
    &__no-action
      width: 209px !important
    &__total
      font-size: 32px
</style>