<template>
  <div>
    <HeaderContent :list="list" label="Manage Label" marginBottom="16"></HeaderContent>
    <div class="label__container">
      <div class="label__table-cont">
        <table class="label__table">
        <tr>
          <th style="width:70%">Parent</th>
          <th>Label</th>
          <th class="d-flex justify-center">
            <v-icon @click="openDialogParent" class="pointer" color="primary" size="15px"> fas fa-plus-circle</v-icon>
          </th>
        </tr>
        <tr v-for="n in 5">
          <td style="cursor : default">Alfreds Futterkiste</td>
          <td class="d-flex justify-space-between align-center">
            <div style="cursor : default" >12</div>
            <v-icon style="cursor : pointer" color="secondary" size="15px">fas fa-edit</v-icon>
          </td>
          <td style="cursor : pointer" class="text-center">
            <v-icon size="15px">fas fa-chevron-right</v-icon>
          </td>
        </tr>
      </table>
      </div>
      <v-dialog width="343" v-model="dialogParent">
        <v-card class="label__dialog">
          <div class="label__dialog-title">Tambah Parent</div>
          <div class="label__dialog-line"></div>
          <div class="label__dialog-space">
            <div class="label__dialog-sublabel">Nama Parent</div>
            <v-text-field
              placeholder="Placeholder"
              class="label__dialog-input"
              outlined
              dense
              hide-details
            />
          </div>
          <div class="label__dialog-line"></div>
          <div class="label__dialog-sublabel label__dialog-space">
            Gunakan nama parent yang mewakili label secara general
          </div>
          <div class="label__dialog-line"></div>
          <div class="d-flex justify-space-between label__dialog-space">
            <!-- <v-btn class="text-capitalize" depressed>Batalkan</v-btn> -->
            <button class="label__dialog-btn charcoal--text bg-whitesnow">Batalkan</button>
            <button class="label__dialog-btn white--text bg-primary">Tambahkan Parent</button>
          </div>
        </v-card>
      </v-dialog> 

      <div class="label__table-cont">
        <table class="label__table">
        <tr>
          <th style="width:70%">Parent</th>
          <th>Label</th>
          <th class="d-flex justify-center">
            <v-icon color="primary" size="15px"> fas fa-plus-circle</v-icon>
          </th>
        </tr>
        <tr v-for="n in 5">
          <td style="cursor : default">Alfreds Futterkiste</td>
          <td class="d-flex justify-space-between align-center">
            <div style="cursor : default" >12</div>
            <v-icon style="cursor : pointer" color="secondary" size="15px">fas fa-edit</v-icon>
          </td>
          <td style="cursor : pointer" class="text-center">
            <v-icon size="15px">fas fa-chevron-right</v-icon>
          </td>
        </tr>
      </table>
      </div>
      
    </div>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";

export default {
  components: {
    HeaderContent
  },
  data() {
    return {
      list: [
        {
          text: "Konten",
          disabled: true,
        },
        {
          text: 'Manage Label',
          disabled: true
        }
      ],
      dialogParent : false
    }
  },
  methods : {
    openDialogParent () {
      console.log('pointer')
      this.dialogParent = true
    }
  }
}
</script>

<style lang="scss" scoped src="./style.scss">

</style>