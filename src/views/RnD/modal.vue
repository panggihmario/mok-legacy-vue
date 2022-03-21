<template>
  <div>
    <v-dialog v-model="dialog" width="850px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn>
      </template>
      <div class="cekaja">
        <v-btn @click="slideLeft" style="background : rgba(0, 0, 0, 0.5);" fab dark small>
          <v-icon small>fas fa-arrow-left</v-icon>
        </v-btn>
      </div>

      <v-card width="850px" >
        <v-carousel
          height="552"
          hide-delimiter-background
          hide-delimiters
          :show-arrows="false"
          v-model="testModel"
        >
          <v-carousel-item v-for="(slide, i) in slides" :key="i">
            <div class="test__box">
              <v-sheet :color="colors[i]" height="552px" width="850px">
                <v-row class="fill-height" align="center" justify="center">
                  <div class="text-h2">{{ slide }} Slide</div>
                </v-row>
              </v-sheet>
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-card>
      <div class="cekright">
        <v-btn @click="slideRight" style="background : rgba(0, 0, 0, 0.5);" fab dark small>
          <v-icon small >fas fa-arrow-right</v-icon>
        </v-btn>
      </div>
    </v-dialog>
  </div>
</template>


<script>
export default {
  data() {
    return {
      dialog: false,
      testModel : 0,
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
    };
  },
  methods : {
    slideRight () {
      if(this.slides.length === this.testModel) {
        this.testModel = 0
      }else{
        this.testModel++
      }
    },
    slideLeft () {
      if(this.testModel === 0) {
        this.testModel = this.slides.length
      }else{
        this.testModel--
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.test {
  &__box {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.cekaja {
  position: absolute;
  z-index: 1;
  top: 50%;
  right: -10em;
}
.cekright {
  position: absolute;
  z-index: 1;
  top: 50%;
  text-align: right;
  width: inherit;
  right: 10em;
}
</style>