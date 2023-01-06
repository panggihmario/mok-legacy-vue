<template>
  <div>
    <v-data-table :headers="headers" hide-default-footer class="grey--text" :items="feedbackData">
      <template v-slot:body="{ items }">
        <tbody>
          <tr 
            v-for="item in items" :key="item.id"
            @click="openDetailDialog(item)"
          >
            <td>
              <div class="filter__table-label">{{ formatingDate(item.createAt) }}</div>
            </td>
            <td>
              <div class="filter__table-label">{{ item.account.name }}</div>
            </td>
            <td>
              <div class="filter__table-label">{{ item.account.mobile }}</div>
            </td>
            <td>
              <div class="filter__table-label">{{ item.devicePlatform }}</div>
            </td>
            <td>
              <div class="filter__table-label filter__message">{{ item.message }}</div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
    <div class="d-flex justify-space-between mt-10">
      <div class="d-flex"> 
        <div class="filter__total-label"> Total Feedback : </div>
        <div class="filter__total">{{totalFeedBack}}</div>
      </div>
      <v-pagination 
        :length="totalPages" 
        prev-icon="mdi-menu-left" 
        next-icon="mdi-menu-right" 
        total-visible="7"
        color="primary" 
        v-model="currentPage"
      />
    </div>
    
    <DetailDialogVue  
      :detailDialog="detailDialog"
      @closeDialog="closeDialog"
      :item="item"
    />
  </div>

</template>

<script>
import moment from 'moment';
import DetailDialogVue from './detailDialog.vue';
export default {
  props: ['feedbackData', 'totalPages', 'totalFeedBack'],
  components : {
    DetailDialogVue
  },
  computed : {
    currentPage : {
      get() {
        const page = this.$route.params.page
        const current = Number(page)
        return current
      },
      set(value) {
        const name = this.$route.name
        this.$emit('updatePagination', value)
        this.$router.replace({
          name,
          params : {
            page : value
          },
        })
      }
    }
  },  
  methods: {
    formatingDate(rawDate) {
      const cek = moment(rawDate).format("DD/MM/YYYY");
      return cek;
    },
    openDetailDialog(item) {
      this.detailDialog = true
      const createAt = this.formatingDate(item.createAt)
      this.item = {
        ...item,
        createAt
      }
    },
    closeDialog (value) {
      this.item = {}
      this.detailDialog = value
    }
  },
  data() {
    return {
      detailDialog : false,
      item : {},
      headers: [
        {
          text: "Submitted",
          class: "whitesnow",
          sortable: false,
          value: "createAt",
          filterable: false,
          width: "100",
        },
        {
          text: "User",
          class: "whitesnow",
          sortable: false,
          value: "name",
          filterable: false,
          width: "200",
        },
        {
          text: "No. Tel",
          class: "whitesnow",
          sortable: false,
          value: "mobile",
          filterable: false,
          width: "100",
        },
        {
          text: "Platform",
          class: "whitesnow",
          sortable: false,
          value: "devicePlatform",
          filterable: false,
          width: "100",
        },
        {
          text: "Feedback",
          class: "whitesnow",
          sortable: false,
          value: "message",
          filterable: false,
        },
      ]
    }
  }
}
</script>

<style lang="scss"  scoped src="./filter.scss">

</style>