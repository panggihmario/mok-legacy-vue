<template>
  <Card width="252" height="113" class="card">
    <div
      class="d-flex align-center card__box px-4 primary"
      :class="{'card__box__small':!noAction, 'card__box__medium':noAction}"
    >
      <v-icon color="white">mdi-{{ icon }}</v-icon>
      <div class="white--text ml-2">
        <span v-if="text" class="card__box__text">{{ text }}</span>
        <span v-else class="card__box__total">{{ total }}</span>
      </div>
    </div>
    <div class="card__content">
      <div class="text-right" :class="{'card__content__action-box':noAction}">
        <span v-if="!noAction" class="card__content__action" @click="handleClick">{{ action }}</span>
      </div>
      <div class="mt-4">
        <div class="charcoal--text description__title">{{ title }}</div>
        <div class="grey--text description__content">{{ description }}</div>
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
    text: {
      type: String
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
    action: {
      type: String,
      default: "Show Detail"
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
  &__title
    font-weight: 500
  &__content
    font-size: 12px
    line-height: 14px
    letter-spacing: 0.01em
.card
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05)
  border-radius: 8px !important
  &__content
    padding: 12px
    width: 100%
    &__action-box
      height: 24px
    &__action
      font-size: 12px
      font-weight: 300
      text-decoration: underline
      cursor: pointer
    &__description
      margin-top: 36px
  &__box
    height: 58px
    position: absolute
    top: -16px
    left: 12px
    border-radius: 4px !important
    &__small
      width: 126px
    &__medium
      width: 209px
    &__no-action
      width: 209px !important
    &__text
      font-weight: 500
    &__total
      font-size: 32px
      font-weight: 500
</style>