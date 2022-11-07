<template>
  <div>
    <v-select 
      :items="items"
      v-model="value"
      item-color="secondary"
      outlined
      dense
      color="secondary" 
      hide-details 
    >
      <template v-slot:selection="{item}" >
        <div class="secondary--text tayang__label">{{item}}</div>
      </template>
    
    </v-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: ['Diproses', 'Tgl Tayang'],
      value: 'Diproses',
      menu: false
    }
  }
}

</script>


<style lang="scss" scoped>
.tayang {
  &__label {
    font-size: 11px;
  }
}

.v-text-field--outlined>>>fieldset {
  border-color: rgba(192, 0, 250, 0.986);
}
</style>