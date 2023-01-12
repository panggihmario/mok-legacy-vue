<template>
  <div>
    <v-data-table :headers="headers" hide-default-footer class="grey--text" :items="data.enablePayments"
      :items-per-page="-1" fixed-header :height="height">
      <template v-slot:footer>
        <div class="footer__table"></div>
      </template>
      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="(item, idx) in items" :key="idx">
            <td> 
              <EditKey 
                :item="item" 
                :index="idx" 
                keyObj="name"
              />  
            </td>
            <td>
              <EditKey 
                :item="item" 
                :index="idx" 
                keyObj="key"
              />
            </td>
            <td>
              <Options :item="item" :index="idx" />
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </div>

</template>

<script>
import Options from "./options.vue"
import EditKey from "./editKey.vue"
import { mapState, mapActions } from "vuex"
export default {
  props: ['height'],
  components: {
    Options,
    EditKey
  },
  computed: {
    ...mapState({
      data: (state) => state.master.data
    })
  },
  mounted() {
    this.handleFetchMasterBank()
  },
  methods: {
    ...mapActions({
      getMasterBank: 'master/getMasterBank'
    }),
    handleFetchMasterBank() {
      return this.getMasterBank()
    }
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
          width: 180
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
</style>