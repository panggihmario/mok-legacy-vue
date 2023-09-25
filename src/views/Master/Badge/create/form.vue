<template>
  <div>
    <section style="width: calc(100% - 409px)">
      <Alert-Warning></Alert-Warning>
    </section>

    <section
      class="d-flex flex-column"
      style="max-width: 616px; gap: 16px; margin-top: 16px"
    >
      <div class="upload-box">
        <img
          v-if="payload.image != ''"
          :src="payload.image"
          alt=""
          height="110px"
          width="110px"
        />
        <span v-else class="font-12">Gunakan .png</span>
        <v-btn
          small
          outlined
          class="text-capitalize"
          style="
            background-color: #f9f9f9;
            color: #ff4265;
            border-color: #eeeeee;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0;
          "
          @click="handleUpload('upload-account-admin')"
          :loading="isLoadingUpload"
          ><icon-upload></icon-upload> Upload Badge</v-btn
        >
        <upload-oss
          id="upload-account-admin"
          style="display: none"
          @response="getResponse"
          :typeAllowed="['png']"
        />
      </div>

      <div>
        <span class="font-12 font-weight-500">Nama Badge</span>
        <k-input
          placeholder="Masukkan judul donasi"
          v-model="payload.name"
          errorMessage="Tidak lebih dari 40 karakter"
          rules="max:40"
          :counter="40"
        />
      </div>

      <section class="d-flex justify-space-between align-center">
        <div style="width: 302px">
          <CurrencyInput
            label="Terendah"
            v-model="payload.lowest"
            :options="{
              currency: 'IDR',
              locale: 'id',
              currencyDisplay: 'hidden',
              hideGroupingSeparatorOnFocus: false,
              valueRange: {
                min: 1,
              },
            }"
          />
        </div>
        <div style="width: 302px">
          <CurrencyInput
            label="Tertinggi"
            v-model="payload.highest"
            :options="{
              currency: 'IDR',
              locale: 'id',
              currencyDisplay: 'hidden',
              hideGroupingSeparatorOnFocus: false,
            }"
          />
        </div>
      </section>

      <section class="d-flex" style="gap: 12px">
        <v-btn
          depressed
          class="text-capitalize font-12 font-weight-700"
          style="letter-spacing: 0; width: 120px"
          @click="moveTo('/badge')"
        >
          <span>Batalkan</span>
        </v-btn>
        <v-btn
          v-if="$route.params.id"
          depressed
          color="secondary"
          class="text-capitalize font-12 font-weight-700"
          style="letter-spacing: 0; width: 120px"
          @click="actionSubmitEdit"
          :loading="isLoadingSubmit"
          :disabled="isDisableSubmit"
        >
          <span>Terapkan Perubahan</span>
        </v-btn>
        <v-btn
          v-else
          depressed
          color="secondary"
          class="text-capitalize font-12 font-weight-700"
          style="letter-spacing: 0; width: 120px"
          @click="actionSubmit"
          :loading="isLoadingSubmit"
          :disabled="isDisableSubmit"
        >
          <span>Terapkan Badge</span>
        </v-btn>
      </section>
    </section>
  </div>
</template>

<script>
import * as yup from "yup";
import AlertWarning from "./alert.vue";
import CurrencyInput from "./currencyInput.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    AlertWarning,
    CurrencyInput,
  },
  data() {
    return {
      payload: {
        image: "",
        name: "",
        lowest: 0,
        highest: 0,
      },
      isLoadingUpload: false,
      isErrorUpload: false,
      messageErrorUpload: "",
      isLoadingSubmit: false,
      isDisableSubmit: true,
    };
  },
  computed: {
    ...mapState({
      listBadge: (state) => state.donation.listBadge,
    }),
  },
  mounted() {
    if (this.$route.name == "edit badge") {
      this.isDisableSubmit = false;
      this.listBadge.forEach((item) => {
        if (item.id == this.$route.params.id) {
          this.payload.name = item.name;
          this.payload.lowest = item.min;
          this.payload.highest = item.max;
          this.payload.image = item.url;
        }
      });
    } else {
      let nLowest = 0;
      if (this.listBadge.length > 1) {
        if (
          this.listBadge[0].max > this.listBadge[this.listBadge.length - 1].max
        ) {
          nLowest = this.listBadge[0].max + 1;
        } else {
          nLowest = this.listBadge[this.listBadge.length - 1].max + 1;
        }
      } else {
        nLowest = 10000;
      }
      this.payload.lowest = nLowest;
    }
  },
  watch: {
    listBadge() {
      let nLowest = 0;
      if (this.listBadge.length > 1) {
        if (
          this.listBadge[0].max > this.listBadge[this.listBadge.length - 1].max
        ) {
          nLowest = this.listBadge[0].max + 1;
        } else {
          nLowest = this.listBadge[this.listBadge.length - 1].max + 1;
        }
      } else {
        nLowest = 10000;
      }
      this.payload.lowest = nLowest;
    },
    payload: {
      handler: function (value) {
        if (this.$route.name == "edit badge") {
        } else {
          let nLowest = 0;
          if (this.listBadge.length > 1) {
            if (
              this.listBadge[0].max >
              this.listBadge[this.listBadge.length - 1].max
            ) {
              nLowest = this.listBadge[0].max + 1;
            } else {
              nLowest = this.listBadge[this.listBadge.length - 1].max + 1;
            }
          } else {
            nLowest = 10000;
          }
          let schema = yup.object({
            image: yup.string().required(),
            name: yup.string().required().max(40),
            lowest: yup.number().required().min(nLowest),
            highest: yup
              .number()
              .required()
              .min(this.payload.lowest + 1),
          });
          schema.isValid(value).then((valid) => {
            if (valid) {
              this.isDisableSubmit = false;
            } else {
              this.isDisableSubmit = true;
            }
          });
        }
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions({
      createBadge: "donation/createBadge",
      editBadge: "donation/editBadge",
    }),
    handleUpload(id) {
      document.getElementById(id).click();
    },
    getResponse(payload) {
      if (payload.status === "loading") {
        this.isLoadingUpload = true;
        this.isErrorUpload = false;
      } else if (payload.status === "success") {
        this.payload.image = payload.url;
        this.isLoadingUpload = false;
      } else if (payload.status === "failed") {
        this.messageErrorUpload = payload.message;
        this.isLoadingUpload = false;
        this.isErrorUpload = true;
      }
    },
    actionSubmit() {
      const payload = {
        name: this.payload.name,
        min: this.payload.lowest,
        max: this.payload.highest,
        url: this.payload.image,
      };
      this.isLoadingSubmit = true;
      return this.createBadge(payload)
        .then((res) => {
          this.isLoadingSubmit = false;
          this.moveTo("/badge");
        })
        .catch((err) => {
          this.isLoadingSubmit = false;
          console.log(err);
        });
    },
    actionSubmitEdit() {
      const payload = {
        id: this.$route.params.id,
        name: this.payload.name,
        min: this.payload.lowest,
        max: this.payload.highest,
        url: this.payload.image,
      };
      this.isLoadingSubmit = true;
      return this.editBadge(payload)
        .then((res) => {
          this.isLoadingSubmit = false;
          this.moveTo("/badge");
        })
        .catch((err) => {
          this.isLoadingSubmit = false;
          console.log(err);
        });
    },
    moveTo(v) {
      this.$router.push(v);
    },
  },
};
</script>

<style lang="scss" scoped>
.font-12 {
  font-size: 12px !important;
}
font-weight-500 {
  font-weight: 500;
}
.upload {
  &-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    height: 150px;
    width: 150px;
    border: 1px dashed grey;
    border-radius: 5px;
  }
}
</style>
