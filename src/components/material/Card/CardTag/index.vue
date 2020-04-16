<template>
  <div>
    <Card :class="size" height="54" :color="backgroundColor" class="card">
      <div class="d-flex pa-3">
        <div class="d-flex flex-column justify-space-between card__subtitle">
          <div class="card__content charcoal--text">{{ title }}</div>
          <div class="d-flex justify-space-between">
            <span v-if="total" class="card__action silver--text">{{ total }}&nbsp;Readers</span>
            <span
              v-if="!noAction"
              class="card__action"
              :class="`${color}--text`"
              @click="handleClick"
            >{{ action }}</span>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from "../index";
export default {
  components: {
    Card
  },
  props: {
    image: {
      type: String,
      default: "https://dummyimage.com/100x100/ddd/ddd"
    },
    title: {
      type: String,
      default: "Title"
    },
    total: {
      type: String
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
.card
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05)
  &__box
    height: 64px
    width: 64px
    &__image
      border-radius: 4px
  &__content
    font-size: 12px
    line-height: 14px
    font-weight: 500
  &__action
    font-size: 12px
    font-weight: 500
    cursor: pointer
  &__subtitle
    width: 100% !important

.medium
  width: 500px
.small
  width: 274px
</style>