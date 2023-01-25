<template>
  <div>
    <v-data-table
      :headers="headers"
      hide-default-footer
      disable-sort
      disable-filtering
      class="grey--text"
    >

    </v-data-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      headers :[
        {
          text : 'Judul Penggalangan Dana',
          value : 'judul',
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
          text : 'Tgl',
          value : 'judul',
          class: "whitesnow",
          width: "100",
        },
        {
          text : 'Target Dana Terkumpul',
          value : 'judul',
          class: "whitesnow",
          width: "150",
        },
        {
          text : 'Status',
          value : 'judul',
          class: "whitesnow",
          width: "100",
        },
        {
          text : 'Manage',
          value : 'judul',
          class: "whitesnow",
          width: "100",
        },
        
      ]
    }
  }
}
</script>