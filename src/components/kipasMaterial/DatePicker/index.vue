<template>
  <div class="field__container">
    <Label :title="title" />
    <v-menu v-model="menu" max-width="290" :close-on-content-click="false">
      <template v-slot:activator="{ on, attrs }">
        <div class="field__input" :class="{'field__disable' : isDisable}" >
          <input :disabled="isDisable" :value="showDate" readonly :placeholder="placeholder" v-bind="attrs" v-on="on" />
          <v-icon size="15px">fa-regular fa-calendar</v-icon>
        </div>
      </template>
      <v-date-picker 
        v-model="date" 
        @change="onChange"
        color="primary"
        :min="minDate"
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
  watch : {
    value (d) {
      if(!d) {
        this.date = ''
      }

    }
  },
  data() {
    return {
      menu: false,
      date: '',
    }
  },
  computed : {
    showDate() {
      return this.date ? moment(this.date).format('DD/MM/YYYY') : ''
    }
  },
  methods : {
    onChange() {
      this.menu = false
      const localtz = moment(this.date).utcOffset() 
      const localUtc = localtz / 60
      const epochDate = moment(this.date, "YYYY-MM-DD").endOf("day").add(localUtc, 'hours').unix()
      // const epochDate = moment(this.date, "YYYY-MM-DD").endOf("day").add({
      //   hours : localUtc + 1,
      //   minutes : 1
      // }).unix()
      const milisecondEpoch = epochDate * 1000
      console.log(milisecondEpoch)
      this.$emit('epochDate', milisecondEpoch)
    },
  },
  props: {
    title: {
      type: String
    },
    placeholder : {
      type : String
    },
    isDisable : {
      type : Boolean
    },
    minDate : {
      type : String
    },
    value : {
      type : String | Number
    }
  }
}
</script>

<style lang="scss" src="../material.scss" >

</style>