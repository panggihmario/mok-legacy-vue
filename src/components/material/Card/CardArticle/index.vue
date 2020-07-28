<template>
  <div>
    <Card height="90" :color="backgroundColor" class="card" :class="size">
      <div class="card__container d-flex">
        <div class="card__box">
          <v-img :src="image" class="card__box__image" sizes="100%"></v-img>
        </div>
        <div class="d-flex flex-column justify-space-between ml-4 card__subtitle">
          <div class="card__content charcoal--text">{{ title }}</div>
          <div class="d-flex justify-space-between card__action">
            <span v-if="subtitle" class="silver--text">{{ subtitle }}</span>
            <span
              v-if="!noAction"
              class="card__action__pointer"
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
    subtitle: {
      type: String
    },
    link: {
      type: String
    },
    color: {
      type: String,
      default: "safetyorange"
    },
    backgroundColor: {
      type: String,
      default: "white"
    },
    size: {
      type: String
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
.card
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05)
  &__container
    padding: 13px
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
    &__pointer
      cursor: pointer
  &__subtitle
    width: 100% !important

.medium
  width: 500px
.small
  width: 274px
</style>