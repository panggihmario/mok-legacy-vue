<template>
  <custom-form :onSubmit="handleSubmit">
    <div class="mt-8">
      <div class="d-flex align-center">
        <v-avatar size="100" color="grey" class="mr-4">
          <img
            v-if="data.photo"
            :src="data.photo"
            style="object-fit: contain"
          />
        </v-avatar>
        <div class="d-flex flex-column">
          <span
            class="account-edit__subtitle font-weight-medium charcoal--text mb-3"
            >Unggah foto profil</span
          >
          <custom-button
            color="secondary"
            @click="handleUpload('upload-account-user')"
            size="small"
            :loading="isLoading"
          >
            Upload-foto
          </custom-button>
          <upload-oss
            id="upload-account-user"
            style="display: none"
            @response="getResponse"
            :typeAllowed="['jpeg', 'png', 'jpg']"
          />
        </div>
      </div>

      <v-row>
        <v-col cols="6">
          <custom-input
            :label="$t('input.name')"
            v-model="data.name"
            :value="data.name"
            rules="required"
            name="Name"
            dense
          />
          <div>
            <custom-select
              :label="$t('input.gender')"
              name="Gender"
              :items="genderType"
              v-model="data.gender"
              :value="data.gender"
              dense
            />
            <custom-select
              :label="$t('input.chooseAccount')"
              placeholder="Pilih jenis akun"
              v-model="data.role"
              :items="listAccountType"
              :value="data.role"
              name="Account"
              dense
            />
          </div>
          <custom-input
            :label="$t('input.username')"
            name="Username"
            v-model="username"
            :rules="{
              required: true,
              regex:
                '^(?=[a-z0-9._]{4,20}$)(?!^[._]|.*[._]$)[a-z0-9._]*[a-z][a-z0-9._]*$',
            }"
          />
          <!-- rules="required|alpha_dash" -->
          <custom-input
            :label="$t('input.password')"
            name="Password"
            :value="data.password"
            v-model="data.password"
            :rules="type === 'create' ? 'required' : ''"
          />
          <!-- <custom-input
            label="Confirm Password"
            background-color="whitesnow"
            confirmPassword
          ></custom-input> -->
          <Label>Confirm Password</Label>
          <v-text-field
            solo
            flat
            class="field"
            v-model="confirmPassword"
            background-color="whitesnow"
            :error-messages="errorPassword"
          />
          <custom-input
            :label="$t('input.email')"
            name="Email"
            v-model="email"
          />
          <custom-input
            :label="$t('input.phone')"
            name="Phone"
            :value="data.mobile"
            v-model="data.mobile"
            rules="required|numeric|min:10"
          />

          <div v-if="$route.name == 'userEdit'">
            <custom-select
              label="Badge"
              placeholder="Pilih badge"
              v-model="data.donationBadgeId"
              :items="listBadge"
              :value="data.donationBadgeId"
              itemLabel="id"
              item-text="name"
              item-value="id"
              dense
            />
          </div> 

          <div class="verified-box pa-6 mb-6 font-weight-medium whitesnow">
            <p>Verified Account</p>
            <span>
              Akun ini sudah memenuhi
              <span class="dodgerblue--text">Syarat & Ketentuan</span> untuk
              dirubah statusnya menjadi Verified Account
            </span>
            <div
              class="verified-box d-flex align-center justify-space-between mt-6 pa-2 white"
            >
              <span class="dodgerblue--text"
                >Change this account to Verified Account</span
              >
              <v-checkbox
                v-model="data.isVerified"
                hide-details
                class="pa-0 ma-0"
              ></v-checkbox>
            </div>
          </div>

          <div v-if="$route.params.id" class="whitesnow" :class="form.box">
            <div :class="form['title-copy']">
              Merupakan link penghapusan akun yang akan dikirimkan kepada seleb
              bersangkutan
            </div>
            <div @click="copyUrl" :class="form['text-copy']">
              <v-icon x-small color="secondary">far fa-copy</v-icon>
              <div>Salin Link Penghapusan</div>
            </div>
          </div>

          <v-snackbar v-model="show" :timeout="3000" color="success" outlined>
            <div>Link Telah Disalin</div>
          </v-snackbar>

          <!-- <div @click="openDialog" :class="form['remove-label']">Remove Account </div> -->
          <div :class="form.actions">
            <custom-button
              v-if="$route.params.id"
              color="whitesnow"
              class="primary--text"
              @click="openDialog"
            >
              Hapus Account
            </custom-button>
            <custom-button
              :loading="loading"
              color="success"
              class="white--text"
              type="submit"
            >
              Simpan
            </custom-button>
          </div>
        </v-col>
        <v-col cols="6"></v-col>
      </v-row>
    </div>
    <Dialog-Delete
      title="Yakin menghapus user ini?"
      description="User yang kamu hapus tidak akan tampil di halaman user lagi"
      :dialog="dialog"
      @closeDialog="closeDialog"
      @handleDelete="handleDelete"
      :loading="loadingDelete"
    ></Dialog-Delete>
  </custom-form>
</template>

<script>
import Label from "../../components/material/Input/label";
import DialogDelete from "@/components/material/Dialog/DialogDelete";
export default {
  components: {
    Label,
    DialogDelete,
  },
  props: {
    loading: {
      type: Boolean,
    },
    data: {
      type: Object,
    },
    type: {
      type: String,
    },
    listAccountType: {
      type: Array,
    },
    listBadge: {
      type: Array,
    },
  },
  computed : {
    username : {
      get() {
        return this.data.username
      },
      set(value) {
        const lowercase = value.toLowerCase()
        this.$emit('setUsername', lowercase)
      }
    },
    email : {
      get() {
        return this.data.email
      },
      set(value) {
        const lowercase = value.toLowerCase()
        this.$emit('setEmail', lowercase)
      }
    }
  },
  data() {
    return {
      genderType: ["MALE", "FEMALE"],
      confirmPassword: "",
      errorPassword: "",
      dialog: false,
      loadingDelete: false,
      isLoading: false,
      show: false,
    };
  },
  methods: {
    copyUrl() {
      this.show = true;
      const username = this.data.username;
      const server = process.env.VUE_APP_SERVER_STATUS;
      const currentStatus = this.checkPositionServer(server);
      const url = `${currentStatus}web.kipaskipas.com/delete-account/${username}`;
      navigator.clipboard.writeText(url);
    },
    checkPositionServer(current) {
      switch (current) {
        case "testing":
          return "test-";
        case "staging":
          return "stg-";
        default:
          return "";
          break;
      }
    },
    closeDialog() {
      this.dialog = false;
    },
    handleDelete() {
      this.loadingDelete = true;
      setTimeout(() => {
        this.$emit("deleteUser");
        this.loadingDelete = false;
      }, 1500);
    },
    openDialog() {
      this.dialog = true;
    },
    handleUpload(id) {
      document.getElementById(id).click();
    },
    handleSubmit() {
      let payload;
      if (this.confirmPassword != "") {
        payload = {
          ...this.data,
          accountType: this.data.role.replace("ROLE_", ""),
        };
        this.emitChange(payload);
      } else {
        payload = {
          ...this.data,
          password: null,
          accountType: this.data.role.replace("ROLE_", ""),
        };
        this.emitChange(payload);
      }
    },
    emitChange(payload) {
      if (this.confirmPassword === this.data.password) {
        this.$emit("onSubmit", payload);
        this.errorPassword = "";
      } else {
        this.errorPassword = "Check your password again";
      }
    },
    getResponse(payload) {
      this.status = payload.status;
      // this.data.photo = payload.response.url;
      if (payload.status === "loading") {
        this.isLoading = true;
      } else {
        this.data.photo = payload.url;
        this.isLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" module="form">
.remove-label {
  color: #e70000;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 12px;
  cursor: pointer;
}
.box {
  padding: 24px;
  display: grid;
  gap: 6px;
}
.text-copy {
  color: #1890ff;
  font-family: Roboto;
  font-size: 11px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  display: flex;
  gap: 5px;
  align-items: center;
  cursor: pointer;
}
.title-copy {
  color: var(--Charcoal, #4a4a4a);
  font-family: Roboto;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 163.636% */
  letter-spacing: 0.11px;
}

.actions {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}
</style>

<style lang="sass" scoped>
.account-edit
  &__title
    font-size: $font-size-24
  &__subtitle
    font-size: $font-size-12
.verified-box
  border-radius: 4px
  p
    font-size: $font-size-18
    line-height: 18px
  span
    font-size: $font-size-12
    line-height: 18px
</style>
