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


    <v-timeline style="margin-left : -27px" v-if="activites.length > 0" align-top dense>
      <v-timeline-item v-for="(ac, idx) in activites" :key="idx" color="whitesmoke" small>
        <v-row class="pt-1">
          <v-col cols="1">
            <div :class="d['activity__dates']">
              <div>{{ formated(ac.createAt) }}</div>
              <div> {{ formatedHour(ac.createAt) }} </div>
            </div>
            <div v-if="ac.type === 'ARTICLE' " :class="d['activity__icons']">
              <div :class="d['activity__icon']" @click="openDialogConfirm(ac)">
                <v-icon size="12px">fas fa-trash</v-icon>
              </div>
              <div :class="d['activity__icon']" @click="openDetailContent(ac)">
                <v-icon size="12px">fas fa-edit</v-icon>
              </div>

            </div>
          </v-col>
          <v-col v-if="ac.type === 'WITHDRAW' ">
            <div :class="d['activity__withdraw-box']">
              <div :class="d['activity__withdraw-border']">
                <div :class="d['activity__withdraw-label']">Penarikan Dana</div>
                <div  :class="d['activity__withdraw-content']">{{ ac.amount }}</div>
              </div>
              <div :class="d['activity__withdraw-border']">
                <div  :class="d['activity__withdraw-label']">Dana Ditarik Oleh</div>
                <div  :class="d['activity__withdraw-content']">{{ ac.withdrawByName }}</div>
              </div>
              <div>
                <div  :class="d['activity__withdraw-label']">Dana Diterima Oleh</div>
                <div  :class="d['activity__withdraw-content']">{{ ac.recipientName }}</div>
              </div>
            </div>
          </v-col>
          <v-col v-else :class="d['activity__content-box']">
            <div :class="d['activity__description']" v-html="ac.description"></div>
          </v-col>
        </v-row>
      </v-timeline-item>
    </v-timeline>

    <!-- DIALOG -->
    <v-dialog max-width="900"   v-model="isDialog" >
      <v-card  class="pa-4">
        <div :class="d['activity__dialog-title']" class="mb-2">Update Kabar Terkini</div>
        <div :class="d['activity__dialog-subtitle']" class="mb-1">Tulis Kabar Terkini</div>
        <text-editor 
          v-if="isEditor" 
          v-model="content" 
          :value="content" 
          name="Content" 
          rules="max:10000"
        />
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
import moment from 'moment'
export default {
  data() {
    return {
      isDialog: false,
      isDelete : false,
      isEditor : false,
      content: '',
      activites: [],
      detailContent: {},
    }
  },
  mounted() {
    this.handleActivity()
  },
  methods: {
    formated(epoch) {
      const humanDate = moment(epoch).format('DD MMM YYYY')
      return humanDate
    },
    formatedHour(epoch) {
      
      const hourDate = moment(epoch).format('HH:mm')
      return hourDate
    },
    openDialog() {
      this.isDialog = true
      setTimeout(() => {
        this.isEditor = true
      },100)
    },
    openDetailContent(data) {
      this.detailContent = data
      this.content = data.description
      this.openDialog()
    },
    openDialogConfirm (data) {
      this.isDelete = true
      this.detailContent = data
    },
    onCloseDeleteDialog() {
      this.isDelete = false
      this.detailContent = {}
    },
    closeDialog() {
      this.isDialog = false
      this.content = ''
      this.isEditor = false
    },
    onDelete() {
      const id = this.detailContent.id
      return this.deleteActivity(id)
        .then(() => {
          this.isDelete = false
          this.detailContent = {}
          this.handleActivity()
        })
    },
    ...mapActions({
      postActivity: 'donation/postActivity',
      fetchActivity: 'donation/fetchActivity',
      putActivity : 'donation/putActivity',
      deleteActivity : 'donation/deleteActivity'
    }),
   
    handleActivity() {
      const payload = {
        id: this.$route.params.id,
        params: {
          page: 0
        }
      }
      return this.fetchActivity(payload)
        .then(response => {
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