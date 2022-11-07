<template>
  <div class="tayang__filters">
    <ProcessDate v-if="value ===  'Tgl Tayang' "></ProcessDate>
    <v-select 
      :items="items"
      v-model="value"
      item-color="secondary"
      outlined
      dense
      color="secondary" 
      hide-details 
      dark
    >
      <template v-slot:selection="{item}" >
        <div class="secondary--text tayang__label">{{item}}</div>
      </template>
    
    </v-select>
    
  </div>
</template>

<script>
import selectDateVue from './selectDate.vue';
import ProcessDate from "./selectProceedDate.vue"
export default {
  components : {
    selectDateVue,
    ProcessDate
  },
  data() {
    return {
      items: ['Diproses', 'Tgl Tayang'],
      value: 'Diproses',
      menu: false
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
}

.v-text-field--outlined fieldset {
  color: #1890FF !important;
}
.hidden-sm-and-down .v-icon {
  color: red !important;
}
.theme--dark.v-icon {
  color: #1890FF;
}
</style>