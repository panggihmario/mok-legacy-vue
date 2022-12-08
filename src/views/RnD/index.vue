<template>
  <div class="container">
    <h1>RND</h1>
    <k-input  
      label="username" 
      placeholder="username" 
      name="Username"
      rules="required"
      v-model="username"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      username : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 50%;
}
</style>