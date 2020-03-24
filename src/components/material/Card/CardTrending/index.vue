<template>
  <Card elevation="0" width="516" height="221" color="whitesnow">
    <div class="card__container d-flex">
      <v-row no-gutters>
        <v-col cols="4">
          <div class="card__box"></div>
        </v-col>
        <v-col cols="8">
          <div class="d-flex flex-column justify-space-between ml-4">
            <div>
              <div class="card__label charcoal--text">
                Aksi Perempuan Penunggang Beat Bikin Jambret RX King Terjengkang
              </div>
              <div class="card__content charocoal--text mt-8">
                Jakarta - Seorang perempuan di Deli Serdang, Sri Endah Pujiani
                (27) terlibat aksi kejar-kejaran dengan orang yang menjambret
                dompetnya. Hebatnya, Sri bisa membuat para penjambret..
              </div>
            </div>
            <custom-button>Lihat Artikel</custom-button>
          </div>
        </v-col>
      </v-row>
    </div>
  </Card>
</template>

<script>
import Card from "../index";
export default {
  components: {
    Card
  }
};
</script>

<style lang="sass" scoped>
.card
	&__container
		padding: 13px
	&__box
		height: 100%
		width: 100%
		background-color: #DDDDDD
	&__label
		font-size: 16px
		line-height: 19px
		font-weight: bold
	&__content
		font-size: 12px
		line-height: 14px
		font-weight: 500
</style>
