<template>
  <div :class="d.right">
    <div>
      <div :class="d.icon">
        <v-icon @click="closeDialog" size="18px">fas fa-times</v-icon>
      </div>
      <div v-if="isAdmin" :class="d['desc-container']">
        <div>
          <div :class="d.label">User</div>
          <div :class="d['label-user']">@{{ item.createBy }}</div>
        </div>
        <custom-textarea v-model="modelDescription" />
      </div>
      <div v-else :class="d.desc">
        <span :class="d.user">{{ item.createBy }}</span>
        {{ item.description }}
      </div>
    </div>
    <div v-if="isTyping" class="d-flex align-center">
      <custom-button
        size="small" 
        color="kellygreen"
        @click="saveCaption"
        :loading="loading"
      >
        <div class="white--text">Simpan Perubahan</div>
      </custom-button>
      <div :class="d['hint-save']">Klik tombol “Simpan Perubahan” agar caption terbaru dapat terpublish!</div>
    </div>
  </div>
</template>


<script>
export default {
  data () {
    return {
      isTyping : false,
      loading : false
    }
  },
  props : {
    item : {
      type : Object
    },
    description : {
      type : String
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  computed : {
    modelDescription : {
      get () {
        return this.description
      },
      set(value) {
        this.isTyping = true
        this.$emit('input', value)
      }
    }
  },
  methods : {
    saveCaption() {
      this.loading = true
      setTimeout(() => {
        this.isTyping = false
        this.$emit('saveCaption')
        this.loading = false
      },1500)
    },
    closeDialog () {
      this.$emit('closeDialog')
    }
  }
}
</script>

<style src="./style.scss"  lang="scss" module="d">

</style>