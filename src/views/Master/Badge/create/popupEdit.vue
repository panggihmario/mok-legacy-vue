<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="417">
      <v-card class="d-flex" style="padding: 12px; gap: 8px">
        <section>
          <v-icon size="18px" color="warning">fas fa-exclamation-circle</v-icon>
        </section>
        <section class="d-flex flex-column" style="gap: 16px">
          <div>
            <div style="font-size: 14px; font-weight: 700; margin-bottom: 8px">
              Apakah kamu yakin ingin menerapakan perubahan ini?
            </div>
            <div style="font-size: 12px; font-weight: 500; color: grey">
              Pastikan rank dan badge yang kamu buat sudah memenuhi aturan yang
              ada, kesalahan dalam pembuatan range donasi akan berkakibat fatal
              pada struktur rank secara keseluruhan. <br /><br />
              Jika sudah dipastikan data yang kamu input sesuai aturan, masukan
              password yang kamu gunakan untuk login dibawah ini.
            </div>
          </div>
          <div>
            <v-text-field
              v-model="password"
              placeholder="Password"
              :type="inputType"
              outlined
              dense
              hide-details
              style="font-size: 12px; font-weight: 500"
            >
              <template v-slot:append>
                <v-icon v-if="inputType == 'password'" @click="inputType = ''"
                  >mdi-eye-off</v-icon
                >
                <v-icon v-else @click="inputType = 'password'">mdi-eye</v-icon>
              </template>
            </v-text-field>
          </div>
          <div class="d-flex" style="gap: 6px">
            <v-btn
              depressed
              @click="dialog = false"
              class="text-capitalize"
              style="font-size: 11px; font-weight: 500"
              >Batalkan</v-btn
            >
            <v-btn
              color="primary"
              @click="actionSubmit"
              :loading="loading"
              :disabled="password == ''"
              class="text-capitalize"
              style="font-size: 11px; font-weight: 500"
              >Terapkan Badge</v-btn
            >
          </div>
        </section>
        <section>
          <v-icon size="18px" @click="dialog = false">mdi-close</v-icon>
        </section>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["isOpen"],
  data() {
    return {
      dialog: false,
      password: "",
      inputType: "password",
      loading: false,
    };
  },
  watch: {
    isOpen() {
      this.dialog = true;
    },
    dialog() {
      this.$emit("closeDialog", false);
    },
  },
  methods: {
    ...mapActions({
      login: "authentication/login",
    }),
    actionSubmit() {
      const localS = localStorage.getItem("adminKoanba");
      const parsedLocalS = JSON.parse(localS);
      this.actionLogin(parsedLocalS.username);
    },
    actionLogin(username) {
      this.loading = true;
      const opts = {
        username: username,
        password: this.password,
      };
      return this.login(opts)
        .then((response) => {
          this.$emit("actionSubmitEdit");
          this.loading = false;
          this.dialog = false;
        })
        .catch((err) => {
          this.$emit("errorPassword", err.response.data.message);
          this.loading = false;
        });
    },
  },
};
</script>
