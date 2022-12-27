<template>
  <v-data-table :headers="headers"  hide-default-footer class="grey--text" :items="items">
    <template v-slot:footer>
      <div class="footer__table"></div>
    </template>
    <template v-slot:body="{ items }">
      <tbody>
        <tr v-for="(item, idx) in items" :key="idx">
          <td> {{ item.name }} </td>
          <td> {{ item.key }} </td>
          <td>
            <Options :item="item" />
          </td>
        </tr>
      </tbody>
    </template>
  </v-data-table>
</template>

<script>
import Options from "./options.vue"
export default {
  components : {
    Options
  },
  data() {
    return {
      itemSelect: [
        {
          value: 'active',
          label: 'Aktif'
        },
        {
          value: 'non-active',
          label: 'Non Aktif'
        }
      ],
      items: [
        {
          name: 'Bank BCA',
          key: 'bca_va',
          status: true
        },
        {
          name: 'Bank Mandiri',
          key: 'bca_va',
          status: false
        },
        {
          name: 'Permata Bank',
          key: 'bca_va',
          status: true
        }
      ],
      headers: [
        {
          text: 'Nama Bank',
          class: "whitesnow",
          sortable: false,
          value: 'name',
          filterable: false
        },
        {
          text: 'Key',
          class: "whitesnow",
          sortable: false,
          value: 'key',
          filterable: false
        },
        {
          text: 'Status',
          class: "whitesnow",
          sortable: false,
          value: 'status',
          filterable: false,
          width: 100
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.footer {
  &__table {
    border-top: 1px solid #DDDDDD;
  }
}

.v-text-field--box .v-input__slot,
.v-text-field--outline .v-input__slot {
  min-height: auto !important;
  display: flex !important;
  align-items: center !important;
}
</style>