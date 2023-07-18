<template>
  <ValidationProvider v-slot="{ errors }" :name="name" :rules="rules">
    <div class="field__container pointer">
      <Label :title="title" />
      <div @click="openMap" class="field__input" :class="[
        { 'field__error': errors.length > 0 }
      ]">
        <input readonly class="pointer" v-model="address" />
        <v-icon color="primary" size="15px">fas fa-map-marker-alt</v-icon>
      </div>
      <div class="field__error-message" v-if="!isMap && errors.length > 0">
        {{ errorMessage }}
      </div>
    </div>
    <v-dialog width="564" v-model="isMap">
      <Map @saveLocation="getLocation" />
    </v-dialog>
  </ValidationProvider>

</template>

<script>
import Label from "../Label"
import Map from "./map.vue"
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
export default {
  components: {
    Label, Map
  },
  props: {
    title: String,
    name: {
      type: String
    },
    rules: {
      type: String
    },
    errorMessage: {
      type: String
    }
  },
  setup(props, { emit }) {
    const address = ref("");
    const autocomplete = ref(null)
    const isMap = ref(false)
    const coordinate = reactive({
      latitude: "",
      longitude: ""
    })

    const getLocation = function (params) {
      address.value = params.address
      isMap.value = false
      emit('getLocation', params)
    }

    const openMap = function () {
      isMap.value = true
    }

    return {
      address,
      autocomplete,
      coordinate,
      openMap,
      isMap,
      getLocation
    };
  },
}
</script>

<style lang="scss" src="../material.scss">

</style>

<style lang="scss">
.pac-container {
  z-index: 1000 !important;

}
</style>