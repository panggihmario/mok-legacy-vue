<template>
  <v-data-table
    :headers="headers" 
    hide-default-footer 
    class="grey--text mt-4" 
    :items="items"
  >
    <template v-slot:body="{ item }">
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td class="code__table-label">{{ item.referralCode }}</td>
          <td class="code__table-label">{{ item.username && item.username }}</td>
          <td class="code__table-label"> {{ item.totalRegistered }}</td>
          <td>
            <div class="success--text" v-if="item.status === 'ACTIVE'"> Active </div>
            <div class="charcoal--text" v-else>Disable</div>
          </td>
          <td>
            <custom-button class="mr-2" size="small">Detail</custom-button>
            <custom-button v-if="item.status === 'ACTIVE' " size="small">
              <div class="success--text"> Enable </div>
            </custom-button>
            <custom-button v-else size="small">
              <div class="warning--text">Disable</div>
            </custom-button>
          </td>
        </tr>
      </tbody>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props : {
    items : {
      type : [ Array, Object]
    }
  },
  data () {
    return {
      headers : [
        {
          text: "ReferralCode",
          sortable: false,
          value: "referralCode",
          filterable: false,
        },
        {
          text: "Username",
          sortable: false,
          value: "username",
          filterable: false,
        },
        {
          text: "Digunakan",
          sortable: false,
          value: "totalRegistered",
          filterable: false,
        },
        {
          text: "Status",
          sortable: false,
          value: "status",
          filterable: false,
        },
        {
          text : "Action", 
          sortable : false,
          filterable : false
        }
      ]
    }
  }
}
</script>

<style lang="scss" src="./style.scss"></style>