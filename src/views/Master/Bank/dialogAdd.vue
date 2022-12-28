<template>
  <v-dialog 
    v-model="dialog"
    @click:outside="closeDialog"
  >
    <v-card>
      dialog
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props : {
    dialog : {
      type : Boolean
    }
  },
  methods : {
    closeDialog () {
      this.$emit('closeDialog', false)
    }
  }
}
</script>