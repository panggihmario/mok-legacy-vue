<!-- Vue Component -->

<template>
  <v-card>
    <v-card-title>
      <span v-text="title" />

      <v-spacer></v-spacer>

    
    </v-card-title>

    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
    },
  }
</script>