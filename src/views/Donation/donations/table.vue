<template>
  <div>
    <v-data-table
      :headers="headers"
      hide-default-footer
      disable-sort
      disable-filtering
      :items-per-page="12"
      class="grey--text"
      :items="items"
      @click:row="openDetail"
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
      <template v-slot:item.targetAmount="{item}">
        <div :class="table.list"> {{ item.targetAmount ? `Rp ${item.targetAmount.toLocaleString('id')}` : '-' }}</div>   
      </template>
      <template v-slot:item.status="{ item }">
        <div :class="table.list" class="d-flex justify-center">
          {{ item.status }} 
        </div>
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
  </div>
</template>

<script>
import moment from 'moment'
import Menu from "./menu.vue"
export default {
  components : {
    Menu
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
      totalPages : 0,
      headers :[
        {
          text : 'Judul Penggalangan Dana',
          value : 'title',
          class: "whitesnow",
          width: "150",
        },
        {
          text : 'Initiator',
          value : 'username',
          class: "whitesnow",
          width: "100",
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
          text : 'Target Dana Terkumpul',
          value : 'targetAmount',
          class: "whitesnow",
          width: "150",
        },
        {
          text : 'Status',
          value : 'status',
          class: "whitesnow",
          width: "100",
          align : 'center'
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