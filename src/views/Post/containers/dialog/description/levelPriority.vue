<template>
  <v-menu
    v-model="menuLevel"
    offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <k-input 
        label="Konten Level" 
        labelRequired
        v-model="levelPriority" 
        placeholder="Pilih Level"
        v-bind="attrs" 
        v-on="on"
        readonly
    />
    </template>
    <v-list  dense>
      <v-list-item-group
        color="primary"
      >
        <v-list-item
          v-for="item in itemsLevel"
          @click="selectLevel(item)"
        >
          <v-list-item-title>{{ item  }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props : {
    levelPriority : {
      type : Number
    },
    isPublish : {
      type : Boolean,
      default : false
    }
  },
  data () {
    return {
      itemsLevel : [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      menuLevel: false
    }
  },
  methods : {
    selectLevel (value) {
      this.$emit('setLevelPriority', value  )
    }
  },
}
</script>