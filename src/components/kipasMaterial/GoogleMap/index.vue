<template>
  <div>
    <div class="field__container pointer">
    <Label :title="title" />
    <div @click="openMap" class="field__input">
      <input id="autocomplete" readonly class="pointer"/>
      <v-icon color="primary" size="15px" >fas fa-map-marker-alt</v-icon>
    </div>
  </div>
  <v-dialog width="564" v-model="isMap">
    <v-card class="map__card">
      <div class="map__title">Pin Lokasi</div>
      <div id="map" class="map__box"></div>
    </v-card>
  </v-dialog>
  </div>
  
</template>

<script>
import Label from "../Label"
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
export default {
  components : {
    Label
  },
  props : {
    title : String
  },
  // data () {
  //   return {
  //     isMap : false
  //   }
  // },
  // methods : {
  //   openMap() {
  //     this.isMap = true
  //   }
  // },
  setup(props, { emit }) {
    const address = ref("");
    const autocomplete = ref(null)
    const isMap = ref(false)
    const coordinate = reactive({
      latitude : "", 
      longitude : ""
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
      console.log({ele})
      let position = new google.maps.Map(ele, {
        zoom: 15,
        center: new google.maps.LatLng(lat, longitude),
        mapTypeControl: false
      });
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, longitude),
        map: position,
        draggable : true,
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
      })
      onLocation()
    };

    const closeDialog = function () {
      emit('closeDialog')
    } 

    const saveCoordinate = function () {
      emit("saveCoordinate", coordinate)
    }

    // onMounted(init)
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

<style lang="scss" src="../material.scss"></style>