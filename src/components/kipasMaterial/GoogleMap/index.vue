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
      init()
    }

    const onLocation = function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          getAddressFrom(latitude, longitude);
          showUserLocationOnTheMap(latitude, longitude);
        });

      } else {
        console.log("your browser does not support geolocation Api");
      }
    };

    const getAddressFrom = function (lat, long) {
      coordinate.latitude = lat
      coordinate.longitude = long
      const apiKey = process.env.VUE_APP_GOOGLE_MAP_API
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${apiKey}`
        )
        .then((response) => {
          address.value = response.data.results[0].formatted_address;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const showUserLocationOnTheMap = function (lat, longitude) {
      const ele = document.getElementById("map");
      let position = new google.maps.Map(ele, {
        zoom: 15,
        center: new google.maps.LatLng(lat, longitude),
        mapTypeControl: false
      });
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, longitude),
        map: position,
        draggable: true,
        clickable: true,
        crossOnDrag: false,
        optimized: false,
      });

      google.maps.event.addListener(marker, "dragend", function () {
        let actual = marker
        let lat = actual.getPosition().lat();
        let lng = actual.getPosition().lng();
        getAddressFrom(lat, lng)
      })

    };

    const init = function () {
      let auto = new google.maps.places.Autocomplete(
        document.getElementById("autocomplete")
      );
      auto.addListener("place_changed", () => {
        let place = auto.getPlace()
        console.log({ place })
        const latitude = place.geometry.location.lat()
        const longitude = place.geometry.location.lng()
        showUserLocationOnTheMap(latitude, longitude)
      })
      // onLocation()
    };


    onMounted(init)

    return {
      onLocation,
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