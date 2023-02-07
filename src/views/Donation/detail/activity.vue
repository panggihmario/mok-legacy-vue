<template>
  <div>
    <div class="d-flex justify-space-between mb-4">
      <div :class="d['activity__title']">
        Kabar Terkini
      </div>
      <custom-button color="primary" size="small" @click="openDialog">
        Update Data Terkini
      </custom-button>
    </div>


    <v-timeline v-if="activites.length > 0" align-top dense>
      <v-timeline-item v-for="(ac, idx) in activites" :key="idx" color="whitesmoke" small>
        <v-row class="pt-1">
          <v-col cols="2">
            <div :class="d['activity__dates']">
              <div>13 Jun 2022 </div>
              <div>13:32 WIB</div>
            </div>
            <div :class="d['activity__icons']">
              <div :class="d['activity__icon']" @click="openDialogConfirm(ac)">
                <v-icon size="12px">fas fa-trash</v-icon>
              </div>
              <div :class="d['activity__icon']" @click="openDetailContent(ac)">
                <v-icon size="12px">fas fa-edit</v-icon>
              </div>

            </div>
          </v-col>
          <v-col :class="d['activity__content-box']">
            <div :class="d['activity__description']" v-html="ac.description"></div>
          </v-col>
        </v-row>
      </v-timeline-item>
    </v-timeline>


    <!-- DIALOG -->
    <v-dialog width="959" v-model="isDialog">
      <v-card class="pa-4">
        <div :class="d['activity__dialog-title']" class="mb-2">Update Kabar Terkini</div>
        <div :class="d['activity__dialog-subtitle']" class="mb-1">Tulis Kabar Terkini</div>
        <text-editor v-model="content" :value="content" name="Content" />
        <div class="d-flex justify-end mt-2" style="gap : 8px">
          <custom-button @click="closeDialog" size="small">Batalkan</custom-button>
          <custom-button @click="handlePostActivity" size="small" color="primary">Publikasikan Kabar
            Terkini</custom-button>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog width="495" v-model="isDelete">
      <v-card :class="d.dialog">
        <div :class="d['dialog-close']" @click="onCloseDeleteDialog">
          <v-icon  size="20px">fas fa-times</v-icon>
        </div>
        <div :class="d['dialog-warning']">
          <v-icon size="20px" color="primary">fas fa-exclamation-circle</v-icon>
        </div>
        <div :class="d['dialog-title']">Apakah kamu yakin ingin menghapus ini?</div>
        <div :class="d['dialog-content']">Kabar terkini yang sudah dibuat akan benar-benar terhapus dan tidak akan muncul di informasi detail penggalangan dana ini.</div>
        <div class="d-flex justify-space-between">
          <custom-button @click="onCloseDeleteDialog"  full-width color="secondary" size="small">Tidak, kembali ke detail penggalngan dana</custom-button>
          <custom-button @click="onDelete"   color="primary" size="small">Ya, hapus sekarang</custom-button>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      isDialog: false,
      isDelete : false,
      content: '',
      activites: [],
      detailContent: {},
    }
  },
  mounted() {
    this.handleActivity()
  },
  methods: {
    openDialog() {
      this.isDialog = true
    },
    openDialogConfirm (data) {
      this.isDelete = true
      this.detailContent = data
    },
    onCloseDeleteDialog() {
      this.isDelete = false
    },
    closeDialog() {
      this.isDialog = false
      this.content = ''
    },
    onDelete() {
      const id = this.detailContent.id
      return this.deleteActivity(id)
        .then(() => {
          this.isDelete = false
          this.handleActivity()
        })
    },
    ...mapActions({
      postActivity: 'donation/postActivity',
      fetchActivity: 'donation/fetchActivity',
      putActivity : 'donation/putActivity',
      deleteActivity : 'donation/deleteActivity'
    }),
    openDetailContent(data) {
      this.detailContent = data
      this.content = data.description
      this.isDialog = true
    },
    handleActivity() {
      const payload = {
        id: this.$route.params.id,
        params: {
          page: 0
        }
      }
      return this.fetchActivity(payload)
        .then(response => {
          console.log(response)
          const content = response.content
          this.activites = content
        })
    },
    handlePostActivity() {
      if (this.detailContent.id) {
        const payload = {
          id : this.detailContent.id,
          params: {
            type: 'ARTICLE',
            description: this.content
          }
        }
        return this.putActivity(payload)
          .then(() => {
            this.isDialog = false
            this.content = ''
            this.detailContent = {}
            this.handleActivity()
          })
      } else {
        const payload = {
          id: this.$route.params.id,
          params: {
            type: 'ARTICLE',
            description: this.content
          }
        }
        return this.postActivity(payload)
          .then(() => {
            this.isDialog = false
            this.content = ''
            this.handleActivity()
          })
      }

    }

  }
}
</script>

<style lang="scss" src="../donation.scss" module="d" >

</style>