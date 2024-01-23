<template>
  <div>
    <!-- @click:row="openDetail" -->
    <div :class="table.info">
      <div class="d-flex align-center">
        <v-icon small color="secondary">info</v-icon>
        <div style="margin-left: 4px;">
          Penggalangan dana pada list ini hanya bisa di trendingkan dalam waktu 48 jam setelah dibuat
        </div>
      </div>
     
     </div>
    <v-data-table
      :headers="headers"
      hide-default-footer
      disable-sort
      disable-filtering
      :items-per-page="12"
      class="grey--text"
      :items="items"
     
      :loading="isLoading"
    >
      <template v-slot:item.title="{item}">
        <div :class="[table.list, table.ellipsis]">{{ item.title }} </div>
      </template>
      <template v-slot:item.username="{item}">
        <div :class="table.list">{{ item.initiator && item.initiator.username }}</div>   
      </template>
      <template v-slot:item.createAt="{item}">
        <div :class="table.list">{{ convertToHumanDate(item.createAt) }}</div>
      </template>
      <template v-slot:item.expiredAt="{item}">
        <div :class="table.list">{{  convertToHumanDate(item.expiredAt) }} </div>
      </template>
      <template v-slot:item.trendingAt="{item}">
        <div :class="table.list">{{  convertToHumanDate(item.trendingAt) }}</div>
      </template>
      <template v-slot:item.targetAmount="{item}">
        <div :class="table.list"> {{ item.targetAmount ? `Rp ${item.targetAmount.toLocaleString('id')}` : '-' }}</div>   
      </template>
      <template v-slot:item.amountCollected="{item}">
        <div :class="table.list"> {{ item.amountCollected ? `Rp ${item.amountCollected.toLocaleString('id')}` : '-' }}</div>   
      </template>
      <template v-slot:item.amountWithdraw="{item}">
        <div :class="table.list">{{ item.amountWithdraw ? `Rp ${item.amountWithdraw.toLocaleString('id')}` : '-' }}</div>
      </template>
      <template v-slot:item.status="{ item }">
        <div :class="table.list" class="d-flex justify-center">
          {{ item.status }} 
        </div>
      </template>
      <template v-slot:item.trending="{item}">
        <!-- :disabled="!item.trendingAllow && item.status === 'Inactive'" -->
        <custom-button 
          size="x-small" 
          color="primary"
          style="margin-top : auto"
          @click="openDialog(item)"
          :disabled="checkValid(item)"
        >
          Trending
        </custom-button>
      </template>
      <template v-slot:item.actions="{item}">
        <Menu @refreshData="refreshData" :item="item" />
      </template>
      <template v-slot:no-data>
        <div>
          <div :class="table['no-data-label']">Donasi tidak ditemukan.</div>
          <div 
            v-if="statusFind === 'search' "
            :class="table['no-data-sublabel']"
          >
            Gunakan kata kunci lain terkait donasi yang ingin kamu temukan
          </div>
          <div 
            v-if="statusFind === 'filter' "
            :class="table['no-data-sublabel']"
          >
            Gunakan filter lain untuk menemukan hasil yang kamu mau
          </div>
        </div>
      </template>
    </v-data-table>
    <DialogTrending
      :dialogTrending="dialogTrending"
      :idData="idData"
      @closeDialog="closeDialog"
      @onUpdateAfterTrending="onUpdateAfterTrending"
    />
    <v-dialog width="200" v-model="dialogSuccess">
      <v-card class="text-center pa-2">
        <v-icon  color="success">check_circle</v-icon>
        <div :class="table['dialog-success']">Donasi berhasil di trendingkan</div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import Menu from "./menu.vue"
import DialogTrending from "./dialogTrending.vue"
export default {
  components : {
    Menu,
    DialogTrending
  },
  props : {
    items : {
      type : Array
    },
    statusFind : {
      type : String
    },
    isLoading : {
      type : Boolean
    }
  },
  methods : {
    checkValid(item) {
      const createAt = moment(item.createAt)
      const currentAt = moment()
      const different = currentAt.diff(createAt, 'hour')
      if(item.status === 'Inactive' || !item.trendingAllow || different < 48 ){
        return true
      }else{
        return false
      }
    },
    openDialog (item) {  
      this.dialogTrending = true
      this.idData = item.id
     
    },
    closeDialog () {
      this.dialogTrending = false
      this.idData = ''
    },
    onUpdateAfterTrending () {
      this.closeDialog()
      this.dialogSuccess = true
      setTimeout(() => {
        this.dialogSuccess = false
        this.refreshData()
      },1000)
      
    },
    refreshData() {
      this.$emit('refreshData')
    },
    openDetail(item) {
      this.$router.push({
        name : 'detailDonation',
        params : {
          id : item.id
        }
      })
    },
    convertToHumanDate(payload) {
      if(payload) {
        const cek = moment(payload).format("DD/MM/YYYY");
        return cek;
      }
      else{
        return '-'
      }
    }
  },
  data () {
    return {
      page : 1,
      dialogSuccess : false,
      dialogTrending : false,
      totalPages : 0,
      idData : '',
      headers :[
        {
          text : 'Judul Penggalangan Dana',
          value : 'title',
          class: "whitesnow",
          width: "50",
        },
        {
          text : 'Initiator',
          value : 'username',
          class: "whitesnow",
          width: "60",
        },
        {
          text : 'Tgl Mulai',
          value : 'createAt',
          class: "whitesnow",
          width: "100",
        },
        {
          text : 'Tgl Selesai',
          value : 'expiredAt',
          class: "whitesnow",
          width: "100",
        },
        {
          text : 'Tgl Trending',
          value : 'trendingAt',
          class : 'whitesnow',
          width : '100'
        },
        {
          text : 'Target Dana Terkumpul',
          value : 'targetAmount',
          class: "whitesnow",
          width: "160",
        },
        {
          text : 'Dana Terkumpul',
          value : 'amountCollected',
          class: "whitesnow",
          width: "120",
        },
        {
          text : 'Dana Ditarik',
          value : 'amountWithdraw',
          class: "whitesnow",
          width: "120",
        },
        {
          text : 'Status',
          value : 'status',
          class: "whitesnow",
          width: "50",
          align : 'center'
        },
        {
          text : 'Trending',
          value : 'trending',
          width : '50', 
          align : 'center',
          class: "whitesnow",
        },
        {
          text : 'Manage',
          value : 'actions',
          class: "whitesnow",
          width: "100",
          align : 'center'
        },
        
      ]
    }
  }
}
</script>

<style src="../donation.scss" lang="scss" module="table" ></style>