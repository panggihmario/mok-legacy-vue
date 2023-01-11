<template>
  <div class="duration__container">
    <div class="duration__box">
      <div class="duration__title  ">Duration Expired</div>
      <div v-if="isReadySubmit" class="duration__actions-box">
        <custom-button @click="onCancel" size="small" plain>
          Batalkan Perubahan
        </custom-button>
        <custom-button size="small" :loading="loading" color="secondary" @click="saveDuration">
          Simpan Seluruh Perubahan
        </custom-button>
      </div>
    </div>

    <v-checkbox v-model="checkboxDefault" hide-details dense color="secondary" @click="onCheck">
      <template v-slot:label>
        <div class="duration__label">Durasi Expired Default
          <span class="duration__sublabel"> Durasi akan ditentukan sesuai bank masing-masing</span>
        </div>
      </template>
    </v-checkbox>
    <div>
      <v-checkbox @click="onCheckCustom" v-model="checkboxCustom" hide-details color="secondary" dense>
        <template v-slot:label>
          <div class="duration__label">
            Durasi Expired Custom
            <span class="duration__sublabel"> Durasi akan diterapkan pada semua bank</span>
          </div>
        </template>
      </v-checkbox>
      <div class="duration__inputs">
        <input class="duration__input" type="number" :disabled="isDisabled" v-model="duration" />
        <div style="width : 98px">
          <k-select v-model="selected" :disabled="isDisabled" :items="items" itemLabel="unit" />
        </div>
      </div>
    </div>

    <DialogSuccess label="Perubahan berhasil simpan" :dialogMessage="dialogMessage" />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import DialogSuccess from './dialogSuccess.vue'
export default {
  components: {
    DialogSuccess
  },
  computed: {
    ...mapState({
      isReadySubmit: (state) => state.master.isReadySubmit,
      data: (state) => state.master.data,
      tempExpireCustomData: (state) => state.master.tempExpireCustomData
    }),
    selected: {
      get() {
        if (this.data.customExpire) {
          return this.data.customExpire
        } else {
          return {
            unit: null
          }
        }
      },
      set(data) {
        const payload = {
          ...this.data,
          customExpire: {
            ...this.data.customExpire,
            unit: data.value
          }
        }
        this.setReadySubmit(true)
        this.setData(payload)
      }
    },
    duration: {
      get() {
        if (this.data.customExpire) {
          return this.data.customExpire.duration
        }
      },
      set(value) {
        let number
        if (Number(value) < 0) {
          number = 0
        } else {
          number = value
        }
        const payload = {
          ...this.data,
          customExpire: {
            ...this.data.customExpire,
            duration: number
          }
        }
        this.setReadySubmit(true)
        this.setData(payload)
      }
    }
  },
  methods: {
    ...mapMutations({
      setData: 'master/setData',
      setReadySubmit: 'master/setReadySubmit'
    }),
    ...mapActions({
      addMasterBank: 'master/addMasterBank',
      getMasterBank: 'master/getMasterBank'
    }),
    saveDuration() {
      const payloadData = this.data
      this.loading = true
      return this.addMasterBank(payloadData)
        .then(() => {
          this.loading = false
          this.dialogMessage = true
          setTimeout(() => {
            this.dialogMessage = false
            this.setReadySubmit(false)
          }, 2500)
        })
    },
    onCheck(e) {
      this.setReadySubmit(true)
      if (this.checkboxDefault) {
        const payload = {
          ...this.data,
          customExpire: null
        }
        this.setData(payload)
      }
    },
    onCancel() {
      this.setReadySubmit(false)
      return this.getMasterBank()
        .then(res => {
          if (res.customExpire) {
            this.checkboxCustom = true
          } else {
            this.checkboxDefault = true
          }
        })
    },
    onCheckCustom() {
      if(this.data.customExpire) {
        const payload = {
          ...this.data,
        }
        this.setData(payload)
      }else{
          const payload = {
          ...this.data,
          customExpire: {
            unit: 'day',
            duration: 1
          }
        }
        this.setData(payload)
      }
      
    }
  },
  data() {
    return {
      checkboxDefault: true,
      dialogMessage: false,
      checkboxCustom: false,
      isDisabled: true,
      loading: false,
      item: {
        value: 'day',
        label: 'days'
      },
      items: [
        {
          value: 'day',
          label: 'days'
        },
        {
          value: 'hour',
          label: 'hours'
        },
        {
          value: 'minute',
          label: 'minutes'
        }
      ]
    }
  },
  watch: {
    '$store.state.master.data': {
      deep: true,
      handler(newVal) {
        if (newVal.customExpire) {
          this.checkboxCustom = true
        }
      }
    },
    checkboxDefault(value) {
      this.checkboxCustom = !value
      this.isDisabled = value
    },
    checkboxCustom(value) {
      this.checkboxDefault = !value
      if (value && this.tempExpireCustomData) {
        const data = this.data
        const tempData = {
          ...data,
          customExpire: {
            ...this.tempExpireCustomData
          }
        }
        this.setData(tempData)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.duration {
  &__actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;

  }

  &__actions-box {
    display: flex;
    gap: 8px;
  }

  &__input {
    background: #FFFFFF;
    border: 1px solid #BBBBBB;
    border-radius: 4px;
    height: 32px;
    width: 68px;
    font-size: 12px;
    font-weight: 500;
    padding: 8px;

    &:focus {
      outline: none;
    }
  }

  &__container {
    margin-top: 12px;
  }

  &__title {
    color: $charcoal;
    font-size: 12px;
    font-weight: 500;
  }

  &__box {
    background-color: $whitesnow;
    height: 40px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__label {
    color: $greys;
    font-size: 12px;
    font-weight: 500;
  }

  &__sublabel {
    color: #BBBBBB;
    font-size: 12px;
    font-weight: 500;
    padding-left: 8px;
  }

  &__inputs {
    display: flex;
    gap: 6px;
    align-items: center;
    padding-left: 32px;
  }
}
</style>