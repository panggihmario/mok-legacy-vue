<template>
  <div>
    <v-dialog width="600" v-model="statusDialog" @click:outside="closeDialog">
      <v-card>
        <div class="dialog__container">
          <div class="black--text dialog__label">Set as Banned</div>
          <div class="charcoal--text dialog__description">
            Masukkan alasan mengapa produk tersebut pantas untuk di ban.
          </div>
          <v-radio-group mandatory dense v-model="radioGroup">
            <v-radio
              color="secondary"
              v-for="(reason, idx) in reasonBanned"
              :key="idx"
              :value="reason"
            >
              <template v-slot:label>
                <div class="dialog__content black--text">
                  {{ reason.value }}
                </div>
              </template>
            </v-radio>
          </v-radio-group>
          <custom-textarea v-model="othersReason" />
          <div class="d-flex justify-end">
            <custom-button @click="closeDialog">Batalkan</custom-button>
            <custom-button class="ml-4" @click="onClick" color="primary"
              >Banned</custom-button
            >
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  props: ["bannedDialog", "product"],
  data() {
    return {
      radioGroup: null,
      reasonBanned: [],
      othersReason : ''
    };
  },
  computed: {
    statusDialog: {
      get() {
        return this.bannedDialog;
      },
      set(value) {
        this.$emit("closeDialog", value);
      },
    },
  
  },
  mounted() {
    this.handleGetReasons();
  },
  methods: {
    ...mapMutations({
      setDetailView : "product/setDetailView"
    }),
    ...mapActions({
      banProduct: "product/banProduct",
      getReasonsReport: "report/getReasonsReport",
      getListReasonByType : 'report/getListReasonByType',
      getListProduct : 'product/getListProduct'
    }),
    handleGetReasons: function () {
      const typeReport = {
        type : 'BANNED_PRODUCT'
      }
      return this.getListReasonByType(typeReport).then((response) => {
        const responseData = response.data.data
        const newResponse = responseData.map((r) => {
          if (!r.value) {
            return {
              ...r,
              value: "Alasan lainnya",
              others : true
            };
          } else {
            return {
              ...r,
              others : false
            }
          }
        });
        console.log(response)
        this.reasonBanned = newResponse;
      });
    },
    closeDialog: function () {
      this.$emit("closeDialog", false);
    },
    handleGetListProduct() {
      const payload = {
        size : 21,
        page : 0
      }
      return this.getListProduct(payload);
    },
    onClick: function () {
      const value = this.radioGroup.others ? this.othersReason : this.radioGroup.value
      const payload = {
        reasonReport: {
          id: this.radioGroup.id,
          value: value,
          type: this.radioGroup.type,
        },
        type: "BANNED_PRODUCT",
        targetReportedId: this.product.id,
      }
      return this.banProduct(payload)
        .then(() => {
          this.closeDialog()
          this.setDetailView(false)
          return this.handleGetListProduct()
          
        })
        .catch(err => {
          // console.log(err.response)
        })
    },
  },
};
</script>

<style lang="sass" scoped>
.dialog
  &__label
    font-size: 16px
    font-weight: bold
    line-height: 19px
    margin-bottom: 10px
  &__description
    font-size: 12px
    font-weight: normal
    line-height: 14px
  &__container
    padding: 24px
  &__content
    font-size: 12px
    font-weight: 500
    line-height: 18px
</style>