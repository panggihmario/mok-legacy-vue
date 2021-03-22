<template>
  <div>
    <CoreDrawer />
    <div class="my-12">
      <v-container class="auto-space">
        <CoreView />
      </v-container>
    </div>
  </div>
</template>

<style scoped>
.auto-space {
  padding-left: 180px;
}

@media only screen and (min-width: 1024px) {
  .auto-space {
    padding-left: 180px;
  }
}
@media only screen and (min-width: 1440px) {
  .auto-space {
    padding-left: 160px;
  }
}
@media only screen and (min-width: 1600px) {
  .auto-space {
    padding-left: 220px;
  }
}
</style>
