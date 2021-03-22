<template>
  <div>
    <HeaderContent
      :label="$t('title.donation')"
      :list="crumbs"
      :items="items"
      :labelAction="$t('button.donationAdd')"
      @selection="getSelection"
      @click="handleClick"
    >
      <div class="mr-4 left-action">
        <!-- <custom-select :items="items" :height="40" :dense="true" /> -->
      </div>
      <custom-button color="primary" class="white--text" @click="handleClick"
        >Tambah Donasi</custom-button
      >
    </HeaderContent>

    <v-data-table
      :headers="headers"
      hide-default-footer
      disable-sort
      disable-filtering
      :items="data"
      class="grey--text"
    >
      <template v-slot:[`item.donationImage`]="{ item }">
        <div class="image__container d-flex align-center">
          <div v-if="item.media.length > 0" class="image__box">
            <v-img :src="item.media[0].url" height="100%" />
          </div>
          <div v-else class="image__box"></div>
        </div>
      </template>

      <template v-slot:[`item.status`]="{ item }">
        <div>
          <span
            v-text="item.status"
            :class="{ 'silver--text': item.status === 'Finish' }"
          ></span>
        </div>
      </template>

      <template v-slot:[`item.action`]="{ item }">
        <div class="d-flex justify-space-between align-center">
          <v-btn icon @click="moveToEdit(item.id)">
            <v-icon x-small>$edit</v-icon>
          </v-btn>
          <v-btn @click="openModalDelete(item.id)" icon>
            <v-icon x-small>$delete</v-icon>
          </v-btn>
        </div>
      </template>

      <template v-slot:[`item.detail`]="{ item }">
        <div class="d-flex justify-center align-center">
          <span
            v-if="item.status == 'Finish'"
            class="irisblue--text detail"
            @click="openDialogDetail(item.id)"
            >Detail</span
          >
        </div>
      </template>
    </v-data-table>

    <Dialog-Delete
      title="Yakin menghapus donasi ini?"
      description="Donasi yang kamu hapus tidak akan tampil di halaman donasi lagi"
      :dialog="dialog"
      @closeDialog="closeDialog"
      @handleDelete="handleDelete"
      :loading="loading"
    ></Dialog-Delete>

    <v-pagination
      class="d-flex justify-end"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
      v-model="page"
      :length="totalPages"
      @input="getChannelByPage"
    />
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import DialogDelete from "@/components/material/Dialog/DialogDelete";
import DialogDetailDonation from "@/components/material/Dialog/DetailDonation";
import { mapActions } from "vuex";
import moment from "moment";

export default {
  components: {
    HeaderContent,
    DialogDelete,
    DialogDetailDonation,
  },
  data() {
    return {
      idUser: "",
      dialogDetail: false,
      dialog: false,
      totalPages: 0,
      page: 1,
      loading: false,
      page: 1,
      totalPages: 0,
      crumbs: [
        {
          text: "List Channel",
          href: "/channel",
          disabled: false,
        },
        {
          text: "List Donasi",
          disabled: true,
        },
      ],
      items: ["Finish", "On Progress"],
      data: [],
      headers: [
        {
          text: "Foto Donasi",
          value: "donationImage",
          class: "whitesnow",
          width: "100",
        },
        {
          text: "Nama Akun Donasi",
          value: "donationName",
          class: "whitesnow",
          width: "140",
        },
        {
          text: "Tanggal Mulai",
          value: "startDate",
          class: "whitesnow",
          width: "120",
        },
        {
          text: "Tanggal Selesai",
          value: "endDate",
          class: "whitesnow",
          width: "120",
        },
        {
          text: "Target Donasi",
          value: "donationTarget",
          class: "whitesnow",
          width: "120",
        },
        {
          text: "Status Donasi",
          value: "status",
          class: "whitesnow",
          width: "120",
        },
        {
          text: "Manage",
          value: "action",
          class: "whitesnow",
          width: "160",
        },
        {
          value: "detail",
          class: "whitesnow",
        },
      ],
    };
  },
  methods: {
    ...mapActions({
      getListDonation: "donation/getListDonation",
      deleteDonation: "donation/deleteDonation",
    }),
    moveToEdit(id) {
      this.$router.push({
        name: "donationEdit",
        params: {
          id,
        },
      });
    },
    openDialog(id) {
      this.dialog = true;
      this.idUser = id;
    },
    openDialogDetail(id) {
      this.dialogDetail = true;
      this.idUser = id;
    },
    closeDialog() {
      this.dialog = false;
      this.dialogDetail = false;
      this.idUser = "";
    },
    async handleDelete() {
      const id = this.idUser;
      const response = await this.deleteDonation(id);
      this.loading = true;
      if (response.status === 200) {
        this.handleResponse();
        this.dialog = false;
        this.idUser = "";
        this.loading = false;
      } else {
        return response;
        this.dialog = false;
        this.idUser = "";
        this.loading = false;
      }
    },
    getSelection(value) {},
    handleClick() {
      this.$router.push("/donation/create");
    },
    async handleResponse() {
      const payload = {
        page: 0,
      };
      const response = await this.getListDonation(payload);
      if (response.status === 200) {
        const responseData = response.data.data;
        this.formatingResponseData(responseData);
      }
    },
    formatingResponseData(response) {
      const data = response.content;
      this.totalPages = response.totalPages;
      const formatData = data.map((d) => {
        const second = d.expiredAt / 1000;
        const newD = moment.unix(second).format("D/M/YYYY");
        const newS = moment(d.createAt).format("D/M/YYYY");
        return {
          donationName: d.organizer.name,
          status: d.status,
          donationTarget: d.targetAmount,
          startDate: newS,
          endDate: newD,
          media: d.medias,
          id: d.id,
        };
      });
      this.data = formatData;
    },
    async getChannelByPage() {
      const payload = {
        page: this.page - 1,
      };
      const response = await this.getListDonation(payload);
      if (response.status === 200) {
        const responseData = response.data.data;
        this.formatingResponseData(responseData);
      }
    },
  },
  mounted() {
    this.handleResponse();
  },
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
    width: 80px
.detail
  text-decoration: underline
  cursor: pointer
</style>
