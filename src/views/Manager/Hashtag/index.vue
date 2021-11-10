<template>
  <div>
    <HeaderContent label="Trending Hashtag" />
    <div class="hash__label charcoal--text">
      Gunakan field dibawah ini untuk menentukan hashtag trending di aplikasi
      kipaskipas
    </div>
    <div class="hash__content">
      <custom-input
        label="Hashtag"
        placeholder="contoh : #trending"
        v-model="hashtag"
      />
      <div class="charcoal--text hash__desc ">Hanya postingan yang menggunakan hashtag yang baru saja dibuat yang akan masuk ke list trending di kipaskipas</div>
      <custom-button
        color="secondary"
        size="small"
        @click="onSubmit"
      >
        Jadikan Trending
      </custom-button>
    </div>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import { mapActions } from "vuex"
export default {
  components: {
    HeaderContent,
  },
  data() {
    return {
      hashtag : ''
    }
  },
  methods : {
    ...mapActions({
      checkHashtag : 'trending/checkHashtag'
    }),
    onSubmit() {
      const payload = this.hashtag
      return this.checkHashtag(payload)
    }
    
  }
};
</script>

<style lang="scss" scoped>
.hash {
  &__label {
    font-size: 11px;
    line-height: 15px;
    letter-spacing: 0.01em;
    font-weight: 600;
    margin-bottom: 40px;
  }
  &__content {
    width: 310px;
  }
  &__desc {
    font-size: 10px;
    font-weight: 600;
    line-height: 14px;
    margin-bottom: 24px;
  }
}
</style>