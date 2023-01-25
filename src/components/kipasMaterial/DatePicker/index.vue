<template>
  <div class="field__container">
    <Label :title="title" />
    <v-menu v-model="menu" max-width="290" :close-on-content-click="false">
      <template v-slot:activator="{ on, attrs }">
        <div class="field__input">
          <input :value="showDate" readonly placeholder="dd/mm/yy" v-bind="attrs" v-on="on" />
          <v-icon size="15px">fa-regular fa-calendar</v-icon>
        </div>
      </template>
      <v-date-picker 
        v-model="date" 
        @change="menu = false"
        color="primary"
      />    
    </v-menu>
  </div>
</template>

<script>
import Label from "../Label"
import moment from "moment"
export default {
  components: {
    Label
  },
  data() {
    return {
      menu: false,
      date: ''
    }
  },
  computed : {
    showDate() {
      return this.date ? moment(this.date).format('DD/MM/YYYY') : ''
    }
  },
  props: {
    title: {
      type: String
    },
  }
}
</script>

<style lang="scss" src="../material.scss" >

</style>