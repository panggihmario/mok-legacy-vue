<template>
  <div>
    <HeaderContent label="Finance" :list="crumbs"></HeaderContent>
    <v-alert width="700px" dense text color="secondary"    type="info">
      <div class="finance__header">
        Laporan transaksi hari ini hanya bisa di download setelah dari pukul 24:00 WIB.
      </div>
    </v-alert>

    <v-card 
      width="450px" 
      elevation="0" 
      color="whitesnow" 
    >
      <v-card-text>
        <div class="black--text finance__title-card">Download Laporan</div>
        <v-row>
          <v-col>
            <date-picker
              label="Mulai dari"
              v-model="started"
              :value="started"
              :max="minDate"
            />
          </v-col>
          <v-col>
            <date-picker
              label="Sampai"
              v-model="end"
              :value="end"
              :max="minDate"
              :disabled="disableDate"
            />
          </v-col>
        </v-row>
          <v-checkbox
            class="finance__checkbox"
            v-model="oneDay"
            color="secondary"
            dense
            @click="onedayClick"
          >
            <template v-slot:label>
              <div class="finance__checkbox-text black--text">Download laporan keuangan di satu tanggal saja</div>
            </template>
          </v-checkbox>
          <v-btn color="secondary" @click="downloadJournal" class="btn-cloud text-capitalize" block>
            <v-icon size="16" left>mdi-cloud-download-outline</v-icon>
            <span>Download</span>
          </v-btn>
      </v-card-text>
    </v-card>
    



  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import { mapActions } from "vuex";
export default {
  components: {
    HeaderContent,
  },
  data() {
    return {
      crumbs: [
        {
          text: "Download Laporan Transaksi",
          disabled: true,
        },
      ],
      headers: [
        {
          text: "Tanggal",
          value: "date",
          class: "whitesnow",
        },
        {
          value: "action",
          class: "whitesnow",
          align: "center",
          width: 200,
        },
      ],
      items: [
        {
          date: "20/20/2022",
        },
      ],
      dialogDateFrom: false,
      dialogDateTo: false,
      selected: [],
      dateFrom: new Date().toISOString().substr(0, 10),
      dateTo: new Date().toISOString().substr(0, 10),
      started : null,
      end : null,
      minDate : new Date().toISOString().substr(0, 10),
      oneDay : false,
      disableDate : false
    };
  },
  methods: {
    ...mapActions({
      getJournalByDate : 'finance/getJournalByDate'
    }),
    onedayClick() {
      const one = this.oneDay
      this.disableDate = one
    },
    getToday() {
      const d = new Date();
      let date = d.getDate();
      let month = d.getMonth() + 1;
      let year = d.getFullYear();
      const today = `${date}/${month}/${year}`;
      return today;
    },
    downloadJournal() {
      let dateStarted
      let dateEnd
      if(this.started){
        const splitDate = this.started.split('-')
        const [year, month , date] = splitDate
        dateStarted = `${date}/${month}/${year}`
      }
      if(this.end) {
        const splitDate = this.started.split('-')
        const [year, month , date] = splitDate
        dateEnd = `${date}/${month}/${year}`
      }
      const params = {
        startAt : dateStarted,
        endAt : dateEnd ? dateEnd : dateStarted
      }
      return this.getJournalByDate(params)
        .then(response => {
          const data = response.data
          const downloadUrl = window.URL.createObjectURL(new Blob([data]))
          const link = document.createElement('a')
          link.href = downloadUrl
          link.setAttribute('download', 'file.xlsx')
          link.click()
          link.remove()
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
};
</script>

<style lang="sass" scoped>
.btn-cloud
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.08)
  border-radius: 8px
.card-option
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08)
  border-radius: 16px
.finance
  &__header
    font-size: 12px
    font-weight: 500
    letter-spacing: 0.0833334px
  &__title-card
    font-size: 16px
    font-weight: 500
  &__checkbox
    margin-top: -15px
  &__checkbox-text
    font-size: 12px
    font-weight: 500
</style>
