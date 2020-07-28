<template>
  <Card width="516" color="white" class="card">
    <v-row no-gutters class="card__box pa-3">
      <v-col cols="5">
        <v-img :src="image" class="card__box__image" height="100%"></v-img>
      </v-col>
      <v-col cols="7" class="pl-3">
        <div class="d-flex flex-column justify-space-between card__box">
          <div>
            <div class="card__label charcoal--text">{{ title }}</div>
            <div class="card__content charocoal--text mt-2">{{ description }}</div>
          </div>
          <custom-button @click="handleClick" class="dodgerblue--text">Lihat Artikel</custom-button>
        </div>
      </v-col>
    </v-row>
  </Card>
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
    description: {
      type: String,
      default: "description"
    },
    link: {
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
  &__container
    padding: 13px
  &__box
    height: 100%
    width: 100%
    &__image
      border-radius: 4px
  &__label
    font-size: 16px
    line-height: 19px
    font-weight: bold
  &__content
    font-size: 12px
    line-height: 14px
    font-weight: 500
</style>
