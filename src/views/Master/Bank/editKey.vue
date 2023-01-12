<template>
  <v-edit-dialog 
    :return-value.sync="item[keyObj]"
    @close="closeDialog"
  >
    {{ item[keyObj] }} 
    <template v-slot:input>
      <v-text-field 
        v-model="valueRow" 
        single-line 
        counter 
        color="secondary"
      />
    </template>
  </v-edit-dialog>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props : {
    keyObj : {
      type : String
    },
    item : {
      type : Object
    },
    index : {
      type : Number
    },
   
  },
  methods : {
    ...mapActions({
      updateStatusData : 'master/updateStatusData'
    }),
    closeDialog () {
      const params = {
          index : this.index,
          key : this.keyObj,
          value : this.item[this.keyObj]
        }
      this.updateStatusData(params)
    }
  },
  computed : {
    valueRow : {
      get() {
        return this.item[this.keyObj]
      },
      set(value) {
        const params = {
          index : this.index,
          key : this.keyObj,
          value
        }
        this.updateStatusData(params)
      }
    }
  }
}
</script>