<template>
   <v-menu  
      ref="menu" 
      v-model="menu" 
      :close-on-content-click="false"
      transition="scale-transition"  
      min-width="auto"
      :nudge-left="700"
      :nudge-bottom="700"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <div style="position: relative">
            <k-input 
              label="Expired Konten Tayang" 
              :value="humanDate"
              placeholder="DD/MM/YYYY  HH:MM"
              v-bind="attrs" 
              v-on="on"
              readonly
              icon="fas fa-calendar"
          />
          <div :class="d['field-details']">Default 90 hari jika tidak diisi</div>
        </div>
      </template>
      <v-card class="pa-2">
        <div class="d-flex">
          <v-date-picker :max="maxDate" :min="currentDate" v-model="pickedDate" class="mr-2"> </v-date-picker>
          <v-time-picker v-model="pickedTime" />
        </div>
        <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
        <v-btn text color="primary" @click="setDate"> OK </v-btn>
      </v-card>
    </v-menu>
</template>

<script>
import moment from "moment"
export default {
  props : {
    humanDate : {
      type : String
    },
    sampleDate : {
      type : String
    },
    timeSchedule : {
      type : String
    },
    expiredEpochDate : {
      type : [Number, String]
    }
  },
  data () {
    return {
      menu : false,
      testDate : ''
    }
  },
  watch : {
    expiredEpochDate (value) {
      if(value) {
        //sync expired date on tab list post feed with pop up detail post on tab list post feed
        const d = moment(value).subtract(7 , 'hour').format('YYYY-MM-DD HH:mm')
        const [dateFromTable, timeFromTable] = d.split(' ')
        this.$emit('setPickedDate' , dateFromTable)
        this.$emit('setPickedTime', timeFromTable)
        const reFormatDate = dateFromTable.split("-")
        const [year, month, dates] = reFormatDate
        const f = `${dates}/${month}/${year}`;
        const formatHuman = `${f} ${timeFromTable}`
        this.$emit('setHumanDate', formatHuman)
      }
    }
  },
  computed : {
    pickedDate : {
      get () {
        return this.sampleDate
      },
      set (value) {
        this.$emit('setPickedDate' , value)
      }
    },
    pickedTime : {
      get() {
        return this.timeSchedule
      },
      set(value) {
        this.$emit('setPickedTime', value)
      }
    },
    currentDate() {
      const d = moment().format("YYYY-MM-DD");
      return d;
    },
    maxDate () {
      const d = moment().add(1 , 'year').format("YYYY-MM-DD")
      return d
    }

  },
  methods : {
    setDate () {
      this.menu = false
      this.$emit('setDate')
      this.$emit('setIsExpiredChanging', true)
    }
  }
}
</script>

<style src="../style.scss"  lang="scss" module="d">
</style>