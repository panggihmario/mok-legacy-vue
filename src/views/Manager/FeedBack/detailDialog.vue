<template>
  <v-dialog v-model="statusDialog" max-width="737">
    <v-card>
      <div class="detail__container">
        <div class="d-flex justify-space-between">
          <div class="detail__title">Feedback</div>
          <v-icon size="18" @click="$emit('closeDialog')">mdi-close</v-icon>
        </div>
        <div>
          <div class="detail__sublabel">User</div>
          <div class="detail__subcontent">@{{ item.account && item.account.username}}</div>
        </div>
        <div class="d-flex gap">
          <div>
            <div class="detail__sublabel">Submitted</div>
            <div class="detail__subcontent"> {{item.createAt}} </div>
          </div>
          <div>
            <div class="detail__sublabel">No. Telp</div>
            <div class="detail__subcontent"> {{ item.account &&  item.account.mobile}} </div>
          </div>
          <div>
           
            <div class="detail__sublabel">Platfrom</div>
            <div  class="detail__subcontent"> {{item.devicePlatform}} </div>
          </div>
          <div>
            <div class="detail__sublabel">Device Model</div>
            <div  class="detail__subcontent"> {{item.deviceModel}} </div>
          </div>
          <div>
            <div class="detail__sublabel"> App Version</div>
            <div  class="detail__subcontent"> {{item.appVersion}}  </div>
          </div>
          <div>
            <div class="detail__sublabel">User Agen</div>
            <div  class="detail__subcontent">okhttp/4.1.0</div>
          </div>
        </div>
        <div class="detail__line"></div>
        <div>
          <div class="detail__label">Feedback</div>
          <div class="detail__description">
            {{item.message}}
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props : {
    detailDialog : {
      type : Boolean,
      require : true
    },
    item : {
      type : Object,
      require : true
    }
  },
  computed : {
    statusDialog : {
      get() {
        return this.detailDialog
      },
      set(value){
        this.$emit('closeDialog', false)
      }
    }
  }
}
</script>

<style lang="scss" scoped src="./filter.scss" ></style>