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

    <v-data-table :headers="headers" hide-default-footer :items="data" class="grey--text">
      <template v-slot:item.donationImage="{item}">
        <div class="image__container d-flex align-center">
          <div v-if="item.media.length > 0" class="image__box">
            <v-img :src="item.media[0].thumbnail" width="100%" />
          </div>
          <div v-else class="image__box"></div>
        </div>
      </template>

      <template v-slot:item.status="{item}">
        <div>
          <span v-text="item.status" :class="{'silver--text':item.status === 'Finish'}"></span>
        </div>
      </template>

      <template v-slot:item.action="{item}">
        <div class="d-flex justify-center">
          <div class="d-flex justify-space-between manage__box">
            <v-btn @click="moveToEdit(item.id)" icon color="grey" x-small>
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn @click="openModalDelete(item.id)" icon color="carmine" x-small>
              <v-icon>delete_outline</v-icon>
            </v-btn>
          </div>
        </div>
      </template>

      <template v-slot:item.detail="{item}">
        <div>
          <span v-if="item.status == 'Finish'" class="irisblue--text detail">Detail</span>
        </div>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" persistent width="500">
      <v-card>
        <div class="pa-8">
          <v-card-title>Delete Confirmation</v-card-title>
					<v-card-text>
						<div>You are about to delete the donation</div>
						<div>Are you sure ?</div>
					</v-card-text>
          <div class="d-flex justify-end">
            <custom-button   @click="closeModalDelete">Cancel</custom-button>
            <custom-button 
							color="carmine" 
							class="ml-4 white--text" 
							@click="handleDelete"
						>Delete</custom-button>
          </div>
        </div>
      </v-card>
    </v-dialog>
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
      idUser: "",
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
      headers: [
        {
          text: "Foto Donasi",
          value: "donationImage",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          width: "120"
        },
        {
          text: "Nama Akun Donasi",
          value: "donationName",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          width: "160"
        },
        {
          text: "Tanggal Mulai",
          value: "startDate",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          width: "150"
        },
        {
          text: "Tanggal Selesai",
          value: "endDate",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          width: "150"
        },
        {
          text: "Target Donasi",
          value: "donationTarget",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          width: "150"
        },
        {
          text: "Status Donasi",
          value: "status",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          width: "150"
        },
        {
          text: "Manage",
          value: "action",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          align: "center",
          sortable: false
        },
        {
          value: "detail",
          class: "whitesnow",
          sortable: false,
          filterable: false
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
    openModalDelete(id) {
      this.dialog = true;
      this.idUser = id;
    },
    closeModalDelete() {
      this.dialog = false;
      this.idUser = "";
    },
    async handleDelete() {
      const id = this.idUser;
      const response = await this.deleteDonation(id);
      if (response.status === 200) {
        this.handleResponse();
        this.dialog = false;
        this.idUser = "";
      } else {
        return response;
        this.dialog = false;
        this.idUser = "";
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
					const second = d.expiredAt/1000
					const newD = moment.unix(second).format("D/M/YYYY");
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
    border-radius: 5px
    overflow: hidden
  &__container
    padding: 10px
.left-action
  width: 200px
.manage
  &__box
    width: 100px
.detail
  text-decoration: underline
  cursor: pointer
</style>
