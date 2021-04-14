<template>
  <v-dialog
    v-model="dialogSource"
    width="450"
    @click:outside="closeDialogSource"
  >
    <v-card>
      <v-card-title>
        Sumber Berita
      </v-card-title>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props : ['dialogSource'],
  methods : {
    closeDialogSource() {
      this.$emit('closeDialogSource', false)
    }
  }
}
</script>