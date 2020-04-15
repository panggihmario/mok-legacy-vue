<template>
  <div>
    <Card width="500" height="90" :color="backgroundColor" elevation="0">
      <div class="card__container d-flex">
        <div class="card__box">
          <v-img :src="image" class="card__box__image" sizes="100%"></v-img>
        </div>
        <div class="d-flex flex-column justify-space-between ml-4 card__subtitle">
          <div class="card__content charcoal--text">{{ title }}</div>
          <div class="d-flex justify-space-between">
            <span v-if="subtitle" class="card__action silver--text">{{ subtitle }}</span>
            <span class="card__action" :class="`${color}--text`" @click="handleClick">Need Review</span>
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
      default: "whitesnow"
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
		cursor: pointer
	&__subtitle
		width: 100% !important
</style>