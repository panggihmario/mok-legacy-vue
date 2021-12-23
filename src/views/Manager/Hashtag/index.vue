<template>
  <div>
    <HeaderContent label="Trending Hashtag" />
    <div class="hash__label charcoal--text">
      Gunakan field dibawah ini untuk menentukan hashtag trending di aplikasi
      kipaskipas
    </div>
    <div class="hash__content">
      <custom-form :onSubmit="onSubmit" >
      <custom-input
        label="Hashtag"
        placeholder="contoh : #trending"
        v-model="hashtag"
      />
      <div class="charcoal--text hash__desc ">Hanya postingan yang menggunakan hashtag yang baru saja dibuat yang akan masuk ke list trending di kipaskipas</div>
      <custom-button
        color="secondary"
        size="small"
        type="submit"
      >
        Jadikan Trending
      </custom-button>
      </custom-form>
      <v-alert class="trend__alert" :value="alertError"  type="error">
        {{errorMessage}}
    </v-alert>
		<v-alert class="trend__alert" :value="alertSuccess"  type="success">
        hashtag {{hashtag}} berhasil trending
    </v-alert>
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
      hashtag : '',
      alertError : false,
      alertSuccess : false,
      errorMessage : ''
    }
  },
  created () {
    this.fetchHashtag()
  },
  methods : {
    ...mapActions({
      checkHashtag : 'trending/checkHashtag',
      createHashtag : 'trending/createHashtag',
      getHashtag : 'trending/getHashtag'
    }),
    fetchHashtag () {
      return this.getHashtag()
        .then(response => {
          this.hashtag = response.value
        })
    },
    onSubmit() {
      const payload = {
        value : this.hashtag
      }
      return this.checkHashtag(payload)
        .then(response => {
          const isExists = response.isExists
          const value = response.value
          const d = {
            value
          }
          if(!isExists) {
            return this.createHashtag(d)
          }else {
            const message = 'hashtag sudah ada'
            throw message
          }
        })
        .then(() => {
          this.alertSuccess = true
           setTimeout(() => {
            this.alertSuccess = false
            this.fetchHashtag()
          },2000)
        })
        .catch(err => {
          this.errorMessage = err
          // this.hashtag = ''
          this.alertError = true
          setTimeout(() => {
            this.alertError = false
          },2000)
        })
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
.trend {
  &__alert {
    position: absolute;
    top: 20px;
    right: 20px;
  }
}
</style>