<template>
  <v-menu
    v-model="menu"
    ref="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        readonly
        dense
        color="secondary"
        outlined
        v-bind="attrs"
        v-on="on"
        hide-details
        placeholder="Jam"
        class="font-12"
      ></v-text-field>
    </template>
    <v-time-picker
      flat
      no-title
    ></v-time-picker>
  </v-menu>
</template>

<script>
export default {
  data () {
    return {
      date : '',
      menu : false
    }
  }
}
</script>