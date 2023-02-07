<template>
  <div>
    <v-data-table
      :headers="headers"
      hide-default-footer
      disable-sort
      disable-filtering
      class="grey--text"
      :items="items"
    >
      <template v-slot:body="{ items }">
        <tbody>
          <tr
            v-for="item in items"
            :key="item.id"
          >
            <td> 
              <div :class="[table.list, table.ellipsis]">{{ item.title }} </div>
            </td>
            <td> 
              <div :class="table.list">{{ item.initiator.username }}</div>   
            </td>
            <td>
              <div :class="table.list">{{ convertToHumanDate(item.createAt) }}</div>
            </td>
            <td>
              <div :class="table.list">{{  convertToHumanDate(item.expiredAt) }} </div>
            </td>
            <td> 
              <div :class="table.list">Rp {{ item.targetAmount.toLocaleString('id') }}</div>   
            </td>
            <td> 
              <div :class="table.list" class="d-flex justify-center">
                {{ item.status }} 
              </div>
            </td>
            <td> 
              <Menu :item="item" />
            </td>
          </tr>
        </tbody>
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
    }
  },
  methods : {
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
          value : 'judul',
          class: "whitesnow",
          width: "100",
        },
        {
          text : 'Tgl Mulai',
          value : 'judul',
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