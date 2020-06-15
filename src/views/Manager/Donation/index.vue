<template>
  <div>
    <HeaderContent
      label="List Donasi"
      :list="crumbs"
      :items="items"
      labelAction="Tambah Donasi"
      @selection="getSelection"
      @click="handleClick"
    >
      <div class="mr-4 left-action">
        <custom-select :items="items" :height="40" :dense="true" />
      </div>
      <custom-button color="carmine" class="white--text" @click="handleClick">Tambah Donasi</custom-button>
    </HeaderContent>

    <v-data-table :headers="headers" hide-default-footer :items="dataDummy">
      <template v-slot:item.donationImage="{item}">
        <div class="image__container d-flex align-center">
          <div v-if="item.media.length > 0" class="image__box">
            <v-img :src="item.media[0].thumbnail" width="100%" />
          </div>
          <div v-else class="image__box"></div>
        </div>
      </template>

      <template v-slot:item.action="{item}">
        <div class="d-flex justify-center">
          <div class="d-flex justify-space-between manage__box">
            <v-btn @click="moveToEdit(item.id)" icon color="primary">
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn @click="dialog = true" icon color="orangered">
              <v-icon>delete_outline</v-icon>
            </v-btn>

            <v-dialog v-model="dialog" width="500">
              <v-card>
                <div class="pa-8">
                  <div>
                    <span>Apakah anda yakin?</span>
                  </div>
                  <div class="d-flex justify-end">
                    <v-btn color="carmine" class="white--text" @click="dialog = false">No</v-btn>
                    <v-btn color="primary" class="ml-4" @click="handleDelete(item.id)">Yes</v-btn>
                  </div>
                </div>
              </v-card>
            </v-dialog>
          </div>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import moment from "moment";
import HeaderContent from "../../../containers/HeaderContent";
import { mapActions } from "vuex";
export default {
  components: {
    HeaderContent
  },
  data() {
    return {
      dialog: false,
      crumbs: [
        {
          text: "List Channel",
          href: "/channel",
          disabled: false
        },
        {
          text: "List Donasi",
          disabled: true
        }
      ],
      items: ["Finish", "On Progress"],
      data: [],
      dataDummy: [
        {
          donationName: "nama",
          status: "Finish",
          donationTarget: 120000,
          startDate: "12-02-2000",
          endDate: "12-12-12",
          media: "wes",
          id: 1
        }
      ],
      headers: [
        {
          text: "Foto Donasi",
          value: "donationImage",
          width: "120"
        },
        {
          text: "Nama Akun Donasi",
          value: "donationName",
          width: "160"
        },
        {
          text: "Tanggal Mulai",
          value: "startDate",
          width: "150"
        },
        {
          text: "Tanggal Selesai",
          value: "endDate",
          width: "150"
        },
        {
          text: "Target Donasi",
          value: "donationTarget",
          width: "150"
        },
        {
          text: "Status",
          value: "status",
          width: "150"
        },
        {
          text: "Manage",
          value: "action",
          align: "center",
          sortable: false
        }
      ]
    };
  },
  methods: {
    ...mapActions({
      getListDonation: "donation/getListDonation",
      deleteDonation: "donation/deleteDonation"
    }),
    moveToEdit(id) {
      this.$router.push({
        name: "donationEdit",
        params: {
          id
        }
      });
    },
    async handleDelete(id) {
      const response = await this.deleteDonation(id);
      this.dialog = false;
      if (response.status === 200) {
        this.handleResponse();
      }
    },
    getSelection(value) {},
    handleClick() {
      this.$router.push("/donation/create");
    },
    async handleResponse() {
      const response = await this.getListDonation();
      if (response.status === 200) {
        const data = response.data.data.content;
        const formatData = data.map(d => {
          const newD = moment.unix(d.expiredAt).format("D/M/YYYY");
          const newS = moment(d.createAt).format("D/M/YYYY");
          return {
            donationName: d.organizer.name,
            status: d.status,
            donationTarget: d.targetAmount,
            startDate: newS,
            endDate: newD,
            media: d.media,
            id: d.id
          };
        });
        this.data = formatData;
      }
    }
  },
  mounted() {
    this.handleResponse();
  }
};
</script>

<style lang="sass" scoped>
.image
  &__box
    width: 50px
    height: 50px
    background-color: grey
  &__container
    padding: 10px
.left-action
  width: 200px
.manage
  &__box
    width: 90px
</style>
