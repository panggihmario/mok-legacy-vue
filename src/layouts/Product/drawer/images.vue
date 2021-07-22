<template>
  <div>
    <v-row dense>
      <v-col cols="auto" v-for="(media, idx) in product.medias" :key="idx">
        <div @click="openDialog" class="image__container">
          <v-img :src="media.thumbnail.small" height="100" width="100" />
        </div>
      </v-col>
    </v-row>
    <v-dialog width="800" v-model="status">
      <v-card>
        <div class="dialog__container">
          <div class="d-flex justify-end">
            <v-icon style="cursor:pointer" @click="closeDialog"  size="15" color="charcoal" class="mr-2">$close</v-icon>
          </div>
          <v-carousel hide-delimiters>
            <v-carousel-item v-for="(item, i) in product.medias" :key="i">
                <v-row class="fill-height" align="center" justify="center">
                  <div>
                    <video height="400"  controls v-if="item.type === 'video' "  :src="item.url" />
                    <img width="485px" height="485px"  v-else :src="item.url"  />
                  </div>
                </v-row>
            </v-carousel-item>
          </v-carousel>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["product"],
  data() {
    return {
      status: false,
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        },
      ],
    };
  },
  methods: {
    openDialog: function () {
      this.status = true;
    },
    closeDialog : function () {
      this.status = false
    }
  },
};
</script>

<style lang="sass" scoped>
.image
  &__container
    border-radius: 8px
    cursor: pointer
.dialog
  &__container
    padding: 20px
</style>

<style>
video {
  /* override other styles to make responsive */
  width: 485px   !important;
  height: 286px   !important;
}
</style>