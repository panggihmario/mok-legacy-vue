<template>
  <div class="duration__container">
    <div class="duration__title  duration__box">Duration Expired</div>
    <v-checkbox v-model="checkboxDefault" hide-details dense>
      <template v-slot:label>
        <div class="duration__label">Durasi Expired Default
          <span class="duration__sublabel"> Durasi akan ditentukan sesuai bank masing-masing</span>
        </div>
      </template>
    </v-checkbox>
    <v-checkbox v-model="checkboxCustom" hide-details dense>
      <template v-slot:label>
        <div class="duration__label">Durasi Expired Custom
          <span class="duration__sublabel"> Durasi akan diterapkan pada semua bank</span>
        </div>
      </template>
    </v-checkbox>
    <div class="duration__inputs">
      <input 
        class="duration__input" 
        type="number" 
        :disabled="isDisabled" 
        v-model="duration"
      />
      <div style="width : 98px">
        <k-select 
          v-model="selected" 
          :disabled="isDisabled" 
          :items="items"
          itemLabel="unit"
        />
      </div>
    </div>
    <div v-if="checkboxCustom" class="duration__box duration__actions" style="margin-top : 28px">
      <div class="duration__actions-box">
        <custom-button size="small" plain>Batal</custom-button>
        <custom-button size="small" color="secondary" >Simpan</custom-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations  } from 'vuex'

export default {
  computed : {
    ...mapState({
      data : (state) => state.master.data
    }),
    selected : {
      get () {
        if(this.data.customExpire) {
          return this.data.customExpire
        }
      },
      set(data) {
        const payload = {
          ...this.data ,
          customExpire : {
            ...this.data.customExpire,
            unit : data.value
          }
        }
        this.setData(payload)
      }
    },
    duration : {
      get () {
        if(this.data.customExpire) {
          return this.data.customExpire.duration
        }
      },
      set(value) {
        const payload = {
          ...this.data ,
          customExpire : {
            ...this.data.customExpire,
            duration : value
          }
        }
        this.setData(payload)
      }
    }
  }, 
  methods : {
    ...mapMutations({
      setData : 'master/setData'
    })
  },
  data() {
    return {
      checkboxDefault: true,
      checkboxCustom: false,
      isDisabled: true,
      item : {
        value : 'day',
        label : 'days'
      },
      items : [
        {
          value : 'day',
          label : 'days'
        },
        {
          value : 'hour',
          label :'hours'
        },
        {
          value : 'minute',
          label : 'minutes'
        }
      ]
    }
  },
  watch: {
    checkboxDefault(value) {
      this.checkboxCustom = !value
      this.isDisabled = value
      if(value) {
        const payload = {
          ...this.data ,
          customExpire : null
        }
        this.setData(payload)
      }else{
        const payload = {
          ...this.data ,
          customExpire : {
            duration : 1,
            unit : 'day'
          }
        }
        this.setData(payload)
      }
    },
    checkboxCustom(value) {
      this.checkboxDefault = !value
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
    margin-top: 81px;
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
    margin-top: 20px;
    padding-left: 30px;
  }
}
</style>