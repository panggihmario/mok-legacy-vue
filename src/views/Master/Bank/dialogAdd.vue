<template>
  <div>
    <v-dialog v-model="dialog" @click:outside="closeDialog" width="448">
      <v-card class="card__container">
        <div class="card__title">Tambah Bank</div>
        <k-input label="Nama Bank" placeholder="Tulis nama bank" v-model="bankName" />
        <k-input label="Key" placeholder="ex: bca_va" v-model="keyBank" />
        <a href="https://snap-docs.midtrans.com/#supported-payment-channels" target="_blank" class="card__link">
          Lihat dokumentasi kode bank
        </a>
        <div class="d-flex justify-end card__actions">
          <custom-button @click="closeDialog">
            Batalkan
          </custom-button>
          <custom-button @click="handleAddMasterBank" color="secondary" :loading="loading" :disabled="isDisable">
            Simpan
          </custom-button>
        </div>
      </v-card>
    </v-dialog>
    <dialogSuccess label="Bank berhasil ditambahkan" :dialogMessage="dialogMessage" />
  </div>

</template>

<script>
import { mapActions, mapState } from 'vuex';
import dialogSuccess from "./dialogSuccess.vue"
export default {
  components: {
    dialogSuccess
  },
  props: {
    dialog: {
      type: Boolean
    }
  },
  data() {
    return {
      bankName: '',
      keyBank: '',
      loading: false,
      dialogMessage: false,
      isDisable: true
    }
  },
  computed: {
    ...mapState({
      data: (state) => state.master.data
    }),
    isFilled () {
      if(this.bankName && this.keyBank) {
        return true
      }else{
        return false
      }
    }
  },
  watch : {
    isFilled(value){
      if(value) {
        this.isDisable = false
      }else{
        this.isDisable = true
      }
    }
  },
  methods: {
    ...mapActions({
      addMasterBank: 'master/addMasterBank'
    }),
    closeDialog() {
      this.$emit('closeDialog', false)
      this.bankName = ''
      this.keyBank = ''
    },
    handleAddMasterBank() {
      if (this.bankName && this.keyBank) {
        const payload = {
          name: this.bankName,
          key: this.keyBank,
          isActive: false
        }
        this.loading = true
        const tempData = structuredClone(this.data)
        tempData.enablePayments.push(payload)
        this.addMasterBank(tempData)
          .then(() => {
            this.loading = false
            this.dialogMessage = true
            setTimeout(() => {
              this.closeDialog()
            }, 2000)
          })
        this.dialogMessage = true
        this.closeDialog()
        setTimeout(() => {
          this.dialogMessage = false
        }, 2000)
      }

    }
  }
}
</script>


<style  lang="scss" scoped>
.card {
  &__container {
    padding: 24px;
  }

  &__title {
    color: $charcoal;
    font-size: 16px;
    font-weight: 800;
    margin-bottom: 16px;
  }

  &__link {
    color: $secondary;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.01em;
  }

  &__actions {
    margin-top: 24px;
    gap: 8px;
  }
}
</style>