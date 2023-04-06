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
          {{statusLabel}}
        </custom-button>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, idx) in items"
          :key="idx"
          color="secondary"
          link
          @click="chooseHandler(item)"
        >
       
          <v-list-item-content >
            <div   class="charcoal--text tayang__item">
            {{item.text}}
          </div></v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
    
  </div>
</template>

<script>
import selectDateVue from './selectDate.vue';
import ProcessDate from "./selectProceedDate.vue"
import { mapMutations, mapState } from 'vuex';
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
          text : 'Menunggu' , 
          isShowCalendar : false,
          isStatusProcess : 'wait'
        },{ 
          text : 'Tayang',
          isShowCalendar : true,
          isStatusProcess : 'process'
        }
      ],
      value: null,
      menu: false
    }
  },
  computed : {
    ...mapState({
      statusLabel : state => state.post.statusLabel
    })
  },
  methods : {
    ...mapMutations({
      setIsStatusProcess : 'post/setIsStatusProcess',
      setStatusLabel : 'post/setStatusLabel',
      setProcessDate : 'post/setProcessDate',
    }), 
    chooseHandler(item) {
      this.isShowCalendar = item.isShowCalendar
      this.label = item.text
      this.setStatusLabel(item.text)
      this.setIsStatusProcess(item.isStatusProcess)
      if(item.isStatusProcess === 'wait') {
        this.setProcessDate([])
      }
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
    cursor: pointer;
  }
}


</style>