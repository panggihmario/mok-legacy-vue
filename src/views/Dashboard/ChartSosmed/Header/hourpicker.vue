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
import moment from "moment"
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
  watch : {
    endHour (value) {
      if(value < this.startHour) {
        this.endHour = this.startHour
        this.startHour = value
      }
    }
  },
  methods: {
    handleFirstPicker (v) {
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
      const params = {
          start : '',
          end : '',
          displayHour : ''
        }
      this.$emit('setHour', params)
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
        finalResult = `${startResult}:00 - ${endResult}:00`
      }else {
        finalResult = `${startResult}`
      }
      return finalResult
    },
    convertHourToUtc0 (value) {
      const hourUTC = moment().hour(value).subtract(7, 'hour').format('H')
      return hourUTC
    },
    savePicker () {
      if(this.startHour || this.startHour === 0) {
        const display = this.setDisplay(this.startHour, this.endHour)
        const params = {
          start : this.convertHourToUtc0(this.startHour),
          end : this.convertHourToUtc0(this.endHour ? this.endHour : this.startHour),
          displayHour : display
        }
        this.hourDisplay = `${this.startHour} : ${this.endHour} `
        this.$emit('setHour', params)
        this.menu = false
      }else{
        this.menu = false
      }
    }
  } 
}
</script>