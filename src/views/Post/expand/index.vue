<template>
  <div class="ex__card">
    <div class="d-flex justify-space-between">
      <div class="d-flex align-center">
        <div class="ex__label mr-2">Filter </div>
          <SelectUser
          />
          <SelectChannel
            :items="channels"
          />
        <SelectDate/>
      </div>
      <div class="d-flex">
        <custom-button 
          color="kellygreen" 
          class="mr-2"
          @click="onSubmit"
        >
          <div class="white--text">Terapkan Filter</div>
        </custom-button>
        <custom-button @click="onCancel" > Batalkan </custom-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import SelectUser from './selectUsers.vue';
import SelectChannel from './selectChannel.vue';
import SelectDate from "./selectDate.vue";
export default {
  mounted () {
    this.fetchDataChannel()
  },
  components: { 
    SelectUser,
    SelectChannel,
    SelectDate
  },
  data() {
    return {
      selectedUser : [],
      channels : []
    };
  },
  methods: {
    ...mapActions({
      getListChannel: "channel/getAllChannel",
      filterFeed : "post/filterFeed"
    }),
    fetchDataChannel () {
      return this.getListChannel()
        .then(response => {
          const responseData = response.data.data
          this.channels = responseData
        })
        .catch(() => {
          this.channels = []
        })
    },
    onSubmit () {
      this.$emit('onSubmitFilter')
    },
    onCancel() {
      this.$emit('onCancel', false)
    }
  },
};
</script>


<style lang="scss" scoped>
.ex {
  &__card {
    padding: 8px 16px;
    background-color: #eeeeee;
    width: 100%;
    margin-bottom: 12px;
  }
  &__field {
    width: 180px;
  }
  &__label {
    color: #9b9b9b;
    font-size: 12px;
    line-height: 14px;
  }
}
</style>