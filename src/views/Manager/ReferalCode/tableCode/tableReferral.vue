<template>
  <div>
    <div v-if="items.length > 0">
      <v-data-table :headers="headers" hide-default-footer class="grey--text mt-4" :items="items">
        <template v-slot:body="{ item }">
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td class="code__table-label">{{ item.referralCode }}</td>
              <td class="code__table-label">{{ item.account && item.account.username }}</td>
              <td class="code__table-label"> {{ item.totalRegistered }}</td>
              <td>
                <div class="success--text" v-if="item.status === 'ACTIVE'"> Active </div>
                <div class="charcoal--text" v-else>Disable</div>
              </td>
              <td>
                <ActionsCode
                  :item="item"
                  @refreshData="refreshData"
                  @setError="setError"
                />
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
      <div class="mt-4 text-right">
        <v-pagination v-model="page" :length="totalPages"></v-pagination>
      </div>
    </div>
    <div v-else class="code__no-data">
      Data tidak ditemukan, ganti kata kunci pencarian
    </div>

  </div>
</template>



<script>
import { mapActions } from 'vuex';
import ActionsCode from "./actions.vue"
export default {
  components : {
    ActionsCode
  },
  props: {
    items: {
      type: [Array, Object]
    },
    totalPages: {
      type: Number
    },
    totalElements: {
      type: Number
    },
    currentPage: {
      type: Number
    }
  },
  computed: {
    page: {
      get() {
        return this.currentPage
      },
      set(value) {
        this.$emit('setCurrentPage', value)
      }
    }
  },
  methods: {
    ...mapActions({
      updateStatusReferralCode: 'manageSocmed/updateStatusReferralCode'
    }),
    openDetail(item) {
      this.$router.push({
        name: 'detailReferralCode',
        params: {
          code: item.referralCode
        }
      })
    },
    setError (err) {
      this.$emit("setError", err)
    },
    refreshData() {
      this.$emit("refreshData")
    },
    setStatus({status, item}) {
      this.isLoading = true
      const payload = {
        status,
        referralCode: item.referralCode
      }
      return this.updateStatusReferralCode(payload)
        .then(response => {
          this.isLoading = false
          this.$emit("refreshData")
        })
        .catch(err => {
          this.isLoading = false
          this.$emit("setError", err)
        })
    }
  },
  data() {
    return {
      isLoading: false,
      headers: [
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
          text: "Action",
          sortable: false,
          filterable: false
        }
      ]
    }
  }
}
</script>

<style lang="scss" src="../style.scss"></style>