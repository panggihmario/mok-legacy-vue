<template>
<div>
  <custom-button 
    size="x-small" 
    color="primary" 
    @click="openDialogReject"
  >
    Delete
  </custom-button>
      <v-dialog width="475" v-model="dialogReject">
      <v-card>
        <div :class="d.container" >
          <div :class="d.icon">
            <v-btn icon @click="closeDialogReject" small>
              <v-icon small>fas fa-times</v-icon>
            </v-btn>
          </div>
          <div>
            <div class="d-flex">
              <div class="mr-4">
                <v-btn color="error" x-small icon>
                  <v-icon>fas fa-exclamation-circle</v-icon>
                </v-btn>
              </div>
              <div>
                <div :class="d.title">Apakah kamu yakin ingin menghapus postingan ini?</div>
                <div  :class="d.content" >Postingan yang kamu hapus akan dihilangkan dari list feed ini, dan kamu tidak akan bisa mengembalikan potingan yang sudah dihapus.</div>
                <div class="d-flex">
                  <custom-button @click="closeDialogReject" size="small" class="mr-2" color="secondary">Batalkan Hapus Postingan</custom-button>
                  <custom-button
                    :loading="loadingDelete" 
                    @click="handleDelete" 
                    size="x-small" 
                    color="error" 
                  >
                    Hapus Postingan
                  </custom-button>
                </div>
            </div>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
</div>
</template>

<script>
import { mapActions } from "vuex"
export default {
  props : ['item'],
  data () {
    return {
      loadingDelete : false,
      dialogReject : false
    }
  },
  methods : {
    ...mapActions({
      deleteFeed : 'post/deleteFeed'
    }),
    closeDialogReject() {
      this.dialogReject = false
    },
    openDialogReject() {
      this.dialogReject = true
    },
    handleDelete() {
      this.loadingDelete = true
      const id = this.item.id
      return this.deleteFeed(id)
        .then(response => {
          setTimeout(() => {
            this.loadingDelete = false
            this.$emit('successDelete')
          }, 2000)
        })
        .catch(err => {
          this.loadingDelete = false
        })
    }
  }
}
</script>

<style lang="scss" module="d">
.container {
  padding: 24px 16px 24px 24px;;
}
.title {
  color: $black;
  font-size: 14px;
  font-weight: 800;
}
.icon {
  position: absolute;
  top: 6px;
  right: 6px
}
.content {
  color: $charcoal;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 23px;
  max-width: 346px;
  margin-top: 8px;
}
</style>