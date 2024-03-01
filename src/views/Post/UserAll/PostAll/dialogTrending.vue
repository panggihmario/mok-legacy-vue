<template>
  <v-dialog v-model="dialog" width="400" @click:outside="closeDialog">
    <v-card class="notif">
      <div style="padding: 12px">
        <div style="font-size: 14px; font-weight: 500;">Tentukan expired konten trending</div>
        <div style="font-size: 11px; color: #777" class="mt-3">
          Konten yang ditrendingkan tanpa mengatur waktu expired dibawah akan
          secara otomatis expired dalam waktu 3 hari.
        </div>
        <div
          style="font-size: 11px; color: #777; font-weight: 500"
          class="mt-3"
        >
          Trendingkan konten pada
        </div>
        <div class="mt-1">
          <v-menu
            v-model="menuDate"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="600"
          >
            <template v-slot:activator="{ on, attrs }">
              <div v-on="on" class="date__wrapper">
                <div>
                  <span v-if="displayDate">
                    {{ displayDate }}
                  </span>
                  <span v-else style="color: #bbb; font-size: 12px"
                    >dd/mnth/yyyy hr:mnt</span
                  >
                </div>
                <v-icon size="small">fas fa-calendar</v-icon>
              </div>
            </template>
            <div class="white">
              <section class="d-flex">
                <v-date-picker
                  v-model="date"
                  no-title
                  :min="currentDate"
                  :max="maxDate"
                ></v-date-picker>
                <v-time-picker
                  v-model="time"
                  ampm-in-title
                  full-width
                  header-color="secondary"
                ></v-time-picker>
              </section>
              <section class="pa-4">
                <v-btn
                  class="text-capitalize"
                  depressed
                  color="secondary"
                  style="letter-spacing: 1px"
                  @click="handlePickDate"
                  :disabled="date == null || time == null"
                  >Submit</v-btn
                >
              </section>
            </div>
          </v-menu>
        </div>
      </div>
      <div
        class="d-flex justify-end"
        style="
          padding: 12px;
          gap: 8px;
          background-color: #f9f9f9;
          border-top: #eee solid 1px;
        "
      >
        <custom-button @click="closeDialog" size="small"
          >Batalkan</custom-button
        >
        <custom-button
          size="small"
          color="secondary"
          @click="actionSubmit"
          :loading="loading"
        >
          Simpan Pengaturan
        </custom-button>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      menuDate: false,
      displayDate: null,
      date: null,
      time: null,
    };
  },
  watch: {
    dialog() {
      this.displayDate = null;
      this.date = null;
      this.time = null;
    },
  },
  props: {
    dialog: {
      type: Boolean,
    },
    loading: {
      type: Boolean,
    },
  },
  computed: {
    currentDate() {
      const d = moment().add(3, "days").format("YYYY-MM-DD");
      return d;
    },
    maxDate() {
      const d = moment().add(3, "months").format("YYYY-MM-DD");
      return d;
    },
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog", false);
    },
    actionSubmit() {
      this.$emit("actionSubmit");
    },
    handlePickDate() {
      this.menuDate = false;
      const display = moment(`${this.date} ${this.time}`).format(
        "DD/MM/YYYY HH:mm"
      );
      this.displayDate = display;
      const currentEnd = moment(`${this.date} ${this.time}`).format(
        "YYYY-MM-DD HH:mm"
      );
      const epochTotal = moment(currentEnd).valueOf();
      this.$emit("getEpoch", epochTotal);
    },
  },
};
</script>

<style lang="scss" scoped>
.notif {
  // padding: 16px;
  // display: flex;
  // align-items: flex-start;
  // gap: 8px;
  // position: relative;
  &__label {
    font-size: 14px;
    font-weight: 800;
    line-height: normal;
    color: var(--black-color);
  }
  &__label {
    font-size: 14px;
    font-weight: 800;
    line-height: normal;
    color: black;
  }
  &__content {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    color: $charcoal;
    margin: 8px 0 23px 0;
  }
  &__close {
    position: absolute;
    right: 16px;
    top: 16px;
    cursor: pointer;
  }
}
.date {
  &__wrapper {
    display: flex;
    border: 1px solid #a8a8a8;
    height: 40px;
    border-radius: 4px;
    padding: 0 9px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // width: 100px;
    cursor: pointer;
    &:hover {
      border-color: black !important;
    }
    & input {
      font-size: 11px;
      height: 100%;
      width: inherit;
      &:focus {
        border: none;
        outline: none;
      }
    }
  }
}
</style>
