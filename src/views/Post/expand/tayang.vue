<template>
  <div class="tayang__filters">
    <ProcessDate v-if="isShowCalendar"></ProcessDate>
    <v-menu offset-y>
      <template v-slot:activator="{ attrs, on }">
        <custom-button 
          outlined 
          color="secondary"  
          v-bind="attrs"
          v-on="on"
        >
          {{label}}
        </custom-button>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, idx) in items"
          :key="idx"
          color="secondary"
          link
        >
       
          <v-list-item-title >
            <div  @click="chooseHandler(item)" class="charcoal--text tayang__item">
            {{item.text}}
          </div></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    
  </div>
</template>

<script>
import selectDateVue from './selectDate.vue';
import ProcessDate from "./selectProceedDate.vue"
import { mapMutations } from 'vuex';
export default {
  components : {
    selectDateVue,
    ProcessDate
  },
  data() {
    return {
      isShowCalendar : false,
      label : 'Status Proses',
      items: [
        { 
          text : 'Diproses' , 
          isShowCalendar : false,
          isStatusProcess : true
        },{ 
          text : 'Tgl Tayang',
          isShowCalendar : true,
          isStatusProcess : false
        }
      ],
      value: null,
      menu: false
    }
  },
  methods : {
    ...mapMutations({
      setIsStatusProcess : 'post/setIsStatusProcess'
    }), 
    chooseHandler(item) {
      this.isShowCalendar = item.isShowCalendar
      this.label = item.text
      this.setIsStatusProcess(item.isStatusProcess)
    }
  }
}

</script>


<style lang="scss" >
.tayang {
  &__label {
    font-size: 11px;
  }
  &__filters {
    display: grid;
    gap: 8px;
    grid-template-columns: 190px 120px;
  }
  &__item {
    font-size: 11px;
    font-weight: semibold;
    width: 100%;
    color: red;
    cursor: pointer;
    &:hover {
      // background-color: red;
    }
  }
}


</style>