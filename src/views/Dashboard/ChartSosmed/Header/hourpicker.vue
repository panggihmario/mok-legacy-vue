<template>
  <v-menu :disabled="isDisable"  v-model="menu" ref="menu" :close-on-content-click="false" :return-value.sync="date"
    transition="scale-transition" offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-text-field v-model="display" readonly dense color="secondary" outlined v-bind="attrs" v-on="on" hide-details
        placeholder="Jam" class="font-12"></v-text-field>
    </template>
    <v-card class="pa-4">
      <v-menu
        v-model="menuStart"

      >
        <template v-slot:activator="{ on, attrs }">
          <v-menu
            v-model="menuStart"
            transition="scale-transition" 
            offset-y
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ on, attrs }">
              <custom-input
                outlined
                dense
                color="secondary"
                label="Dari Jam"
                readonly
                v-model="startHour"
                hide-details
                v-bind="attrs" 
                v-on="on"
              />
            </template>
            <v-time-picker
              v-if="menuStart"

              v-model="firstPicker"
              flat
              format="24hr"
              range
              no-title
              @click:hour="handleFirstPicker"
            />
          </v-menu>
          
        </template>
      </v-menu>
      <v-menu
        v-model="menuEnd"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-menu
            v-model="menuEnd"
            transition="scale-transition" 
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <custom-input
                outlined
                dense
                color="secondary"
                label="Sampai Jam"
                readonly
                v-model="endHour"
                hide-details
                v-bind="attrs" 
                v-on="on"
              />
            </template>
            <v-time-picker
              :value="secondPicker"
              flat
              v-if="menuEnd"
              format="24hr"
              no-title
              @click:hour="handleSecondPicker"
            />
          </v-menu>
        </template>
      </v-menu>
      <div class="mb-6"></div>
        <div class="d-flex justify-end">
          <custom-button  
            class="mr-2" 
            size="small"  
            @click="cancelDate"
          >
            <div class="primary--text">Reset</div>
          </custom-button>
          <custom-button 
            size="small" 
            color="secondary"
            @click="savePicker"
          >
            Ok
          </custom-button>
        </div>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  props : {
    isDisable : {
      type : Boolean
    },
    display : {
      type : String
    }
  },
  data() {
    return {
      date: '',
      hourDisplay : '',
      menu: false,
      menuStart: false,
      menuEnd: false,
      startHour : '',
      endHour  : '',
      firstPicker  : '',
      secondPicker : null,
      payload: {
        year: "",
        month: "",
        dateFirst: "",
        dateLast: "",
        hourStart: null,
        hourEnd: null,
      },
    }
  },
  methods: {
    handleFirstPicker (v) {
      console.log(this.firstPicker)
      console.log(v)
      this.menuStart = false
      this.startHour = v
    },
    handleSecondPicker(v) {
      this.menuEnd = false
      this.endHour = v
    },
    cancelDate() {
      this.startHour = ''
      this.endHour = ''
    },
    checkTime(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    },
    setDisplay(start, end) {
      let finalResult, startResult, endResult
      startResult = this.checkTime(start)
      if(end) {
        endResult = this.checkTime(end)
        finalResult = `${startResult} - ${endResult}`
      }else {
        finalResult = `${startResult}`
      }
      return finalResult
    },
    savePicker () {
      const display = this.setDisplay(this.startHour, this.endHour)
      const params = {
        start : this.startHour,
        end : this.endHour ? this.endHour : this.startHour,
        displayHour : display
      }
      console.log(params)
      this.hourDisplay = `${this.startHour} : ${this.endHour} `
      this.$emit('setHour', params)
      this.menu = false
    }
  } 
}
</script>