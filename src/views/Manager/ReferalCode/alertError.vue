<template>
  <v-snackbar v-model="isSnackBar" :timeout="timeout" top color="warning">
    <div v-if="errorObject">
      <div v-if="errorObject.response">
        <div v-if="errorObject.response.status === 401">
          <div>{{ errorObject.response.data.error }}</div>
          <div>{{ errorObject.response.data.error_description }}</div>
        </div>
        <div v-else>
          <div>{{ errorObject.response.data.message }}</div>
          <div>{{ errorObject.response.data.data }}</div>
        </div>
      </div>
      <div v-else> {{ errorObject }}</div>
    </div>
  </v-snackbar>
</template>

<script>
export default {
  props : {
    errorObject : {
      type : Object
    },
    snackbar : {
      type : Boolean
    }
  },
  computed : {
    isSnackBar : {
      get () {
        return this.snackbar
      },
      set(value) {
        this.$emit('setSnackBar', value)
      }
    }
  },
  data () {
    return {
      timeout : 3000
    }
  }
}
</script>