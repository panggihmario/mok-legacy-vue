<template>
  <v-card class="map__card">
    <div class="map__title">Pin Lokasi</div>
    <div>
      <div class="field__input">

        <input id="autocomplete" ref="autocomplete" v-model="address" />
      </div>
      <div id="map" class="map__box"></div>
    </div>

    <div class="map__action">
      <custom-button @click="saveCoordinate" size="small" color="primary">
        Simpan Lokasi
      </custom-button>
    </div>

  </v-card>
</template>

<script>
import Label from "../Label"
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
export default {
  components: {
    Label
  },
  props: {
    title: String
  },
  setup(props, { emit }) {
    const address = ref("");
    const autocomplete = ref(null)
    const isMap = ref(false)
    const coordinate = reactive({
      latitude: "",
      longitude: ""
    })

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
        const latitude = place.geometry.location.lat()
        const longitude = place.geometry.location.lng()
        showUserLocationOnTheMap(latitude, longitude)
        getAddressFrom(latitude, longitude)
      })
      onLocation()
    };

    const closeDialog = function () {
      emit('closeDialog')
    }

    const saveCoordinate = function () {
      const params = {
        coordinate,
        address : address.value
      }
      emit("saveLocation", params)
      closeDialog()
    }

    onMounted(init)

    return {
      onLocation,
      address,
      autocomplete,
      closeDialog,
      coordinate,
      saveCoordinate,
      openMap,
      isMap
    };
  },
}
</script>

<style lang="scss" src="../material.scss">

</style>

<style lang="scss">
.pac-container {
  z-index: 10000 !important;
}

.pac-item {
  padding: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;

  &:hover {
    background-color: $primarylowtint;
  }
}
</style>