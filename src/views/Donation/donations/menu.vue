<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      offset-x
      :position-x="200"
      left
      rounded="lg"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon>
          <v-icon size="15px">fas fa-bars</v-icon>
        </v-btn>
      </template>

      <section
        class="d-flex flex-column font-s12"
        style="background-color: white; gap: 8px; padding: 12px 0"
      >
        <div
          @click="onUpdate"
          class="d-flex black--text pointer"
          style="padding: 0 10px"
        >
          <div style="width: 20px; padding-left: 5px">
            <v-icon color="black" size="10px">fas fa-file-signature</v-icon>
          </div>
          <div>Update Kabar Terkini</div>
        </div>
        <div
          @click="openDialogPushNotif"
          class="d-flex black--text"
          :class="item.canPushNotif ? 'pointer' : 'btn-push-disabled'"
          style="padding: 0 10px"
        >
          <div style="width: 20px; padding-left: 5px">
            <v-icon color="black" size="10px">fas fa-bell</v-icon>
          </div>
          <div>Push notif penggalangan dana</div>
        </div>
        <v-divider></v-divider>
        <div
          v-if="item.status === 'Active'"
          class="d-flex primary--text pointer"
          style="padding: 0 10px"
          @click="onActive"
        >
          <div style="width: 20px; padding-left: 5px">
            <v-icon color="primary" size="10px">fas fa-power-off</v-icon>
          </div>
          <div>Nonaktifkan Penggalangan Dana</div>
        </div>
      </section>
    </v-menu>

    <v-dialog width="395" v-model="dialog">
      <v-card :class="m.dialog">
        <div :class="m['dialog-close']" @click="closeDialog">
          <v-icon size="20px">fas fa-times</v-icon>
        </div>
        <div :class="m['dialog-warning']">
          <v-icon size="20px" color="primary">fas fa-exclamation-circle</v-icon>
        </div>
        <div :class="m['dialog-title']">
          Apakah kamu yakin ingin menonaktifkan donasi ini?
        </div>
        <div :class="m['dialog-content']">
          Donasi yang kamu dinonaktifkan tetap ada didalam list, tapi tidak ada
          bisa dilihat oleh pengguna.
        </div>
        <div class="d-flex justify-space-between">
          <custom-button
            @click="closeDialog"
            full-width
            color="secondary"
            size="small"
            >Tidak, kembali ke list</custom-button
          >
          <custom-button
            :loading="loading"
            @click="onInactive"
            color="primary"
            size="small"
            >Nonaktifkan Donasi</custom-button
          >
        </div>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogPushNotif"
      :width="
        isSuccessPushNotif === true || isSuccessPushNotif === false
          ? '173'
          : '450'
      "
    >
      <v-card
        v-if="isSuccessPushNotif === true"
        class="d-flex flex-column text-center"
        style="padding: 12px 16px; gap: 12px"
      >
        <div>
          <v-icon size="30px" color="success">fas fa-check-circle</v-icon>
        </div>
        <span style="font-size: 12px; font-weight: 500"
          >Push notif berhasil dikirim</span
        >
      </v-card>
      <v-card
        v-else-if="isSuccessPushNotif === false"
        class="d-flex flex-column text-center"
        style="padding: 12px 16px; gap: 12px"
      >
        <div>
          <v-icon size="30px" color="primary">fas fa-times-circle</v-icon>
        </div>
        <span style="font-size: 12px; font-weight: 500"
          >Push notif gagal dikirim</span
        >
      </v-card>
      <v-card
        v-else
        class="d-flex flex-column"
        style="padding: 16px; gap: 20px"
      >
        <section>
          <span class="font-s14 font-w800"
            >Apakah kamu yakin ingin push notif penggalangan dana ini?</span
          >
        </section>

        <div class="d-flex flex-column" style="gap: 10px">
          <section class="d-flex flex-column" style="gap: 6px">
            <span class="font-s11 font-w600">Headline Notifikasi</span>
            <v-text-field
              v-model="payloadPushNotif.title"
              placeholder="Masukan headline"
              dense
              outlined
              class="font-s12"
              style="border-radius: 6px"
              counter="50"
            ></v-text-field>
          </section>

          <section class="d-flex flex-column" style="gap: 6px">
            <span class="font-s11 font-w600">Isi Notifikasi</span>
            <v-textarea
              v-model="payloadPushNotif.description"
              placeholder="Masukan isi notifikasi"
              dense
              outlined
              rows="3"
              class="font-s12"
              style="border-radius: 6px"
              counter="100"
            ></v-textarea>
          </section>

          <section class="d-flex align-center" style="gap: 8px">
            <button
              class="btn"
              style="letter-spacing: 0"
              @click="closeDialogPushNotif"
            >
              Batalkan
            </button>

            <v-progress-circular
              v-if="loadingPushNotif"
              indeterminate
              color="primary"
              size="24"
              width="3"
            ></v-progress-circular>
            <button
              v-else
              class="btn"
              :class="
                payloadPushNotif.title.length < 5 ||
                payloadPushNotif.description.length < 5 ||
                payloadPushNotif.title.length > 50 ||
                payloadPushNotif.description.length > 100
                  ? 'btn-disabled'
                  : 'btn-primary'
              "
              style="letter-spacing: 0"
              :disabled="
                payloadPushNotif.title.length < 5 ||
                payloadPushNotif.description.length < 5 ||
                payloadPushNotif.title.length > 50 ||
                payloadPushNotif.description.length > 100
              "
              @click="actionPushNotif"
            >
              Ya, push notif sekarang
            </button>
          </section>
        </div>
      </v-card>
    </v-dialog>

    <!-- <v-snackbar top v-model="alertSuccess" timeout="3000" color="success">
      Success Push Notif
    </v-snackbar>
    <v-snackbar top v-model="alertError" timeout="3000" color="error">
      {{ errorMessage }}
    </v-snackbar> -->
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    item: {
      type: Object,
    },
  },
  data() {
    return {
      menu: false,
      offset: true,
      dialog: false,
      loading: false,
      dialogPushNotif: false,
      loadingPushNotif: false,
      isSuccessPushNotif: null,
      dialogPushNotifId: "",
      payloadPushNotif: {
        title: "",
        description: "",
      },
      alertSuccess: false,
      alertError: false,
      errorMessage: "",
    };
  },
  methods: {
    ...mapActions({
      putStatusDonation: "donation/putStatusDonation",
      postDonationPushNotif: "donation/postDonationPushNotif",
    }),
    onUpdate() {
      this.menu = false;
      this.$router.push({
        name: "detailDonation",
        params: {
          id: this.item.id,
        },
      });
    },
    onActive() {
      this.menu = false;
      this.dialog = true;
    },
    openDialogPushNotif() {
      if (this.item.canPushNotif) {
        this.dialogPushNotifId = this.item.id;
        this.dialogPushNotif = true;
      }
    },
    closeDialogPushNotif() {
      this.dialogPushNotifId = "";
      this.dialogPushNotif = false;
      setTimeout(() => {
        this.isSuccessPushNotif = null;
      }, 500);
    },
    closeDialog() {
      this.dialog = false;
    },
    onInactive() {
      const payload = {
        id: this.item.id,
        params: {
          status: "Inactive",
        },
      };
      this.loading = true;
      return this.putStatusDonation(payload)
        .then((res) => {
          this.loading = false;
          this.dialog = false;
          this.$emit("refreshData");
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    actionPushNotif() {
      const payload = {
        postDonationId: this.dialogPushNotifId,
        ...this.payloadPushNotif,
      };
      this.loadingPushNotif = true;
      return this.postDonationPushNotif(payload)
        .then((res) => {
          this.isSuccessPushNotif = true;
          this.loadingPushNotif = false;
          setTimeout(() => {
            this.closeDialogPushNotif();
            this.$emit("refreshData");
          }, 2000);
        })
        .catch((err) => {
          this.isSuccessPushNotif = false;
          this.loadingPushNotif = false;
          setTimeout(() => {
            this.closeDialogPushNotif();
            this.$emit("refreshData");
          }, 2000);
        });
    },
  },
};
</script>

<style lang="scss" src="../donation.scss" module="m"></style>
<style lang="scss" scoped>
.font {
  &-s11 {
    font-size: 11px;
  }
  &-s12 {
    font-size: 12px;
  }
  &-s14 {
    font-size: 14px;
  }
  &-w600 {
    font-weight: 600;
  }
  &-w800 {
    font-weight: 800;
  }
}
.btn {
  padding: 8px 16px;
  gap: 10px;
  border-radius: 4px;
  background-color: #f9f9f9;
  font-size: 11px;
  font-weight: 500;
  &-primary {
    background-color: #ff4265;
    color: white;
  }
  &-disabled {
    background-color: #eeeeee;
    color: #bbbbbb;
  }
  &-push-disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }
}
</style>
