<template>
  <v-dialog v-model="dialog" width="790" @click:outside="closeDialog">
    <v-card class="pa-4 pb-12 whitesnow">
      <div class="d-flex justify-end">
        <v-btn icon @click="closeDialog">
          <v-icon size="14">$close</v-icon>
        </v-btn>
      </div>
      <v-card-title class="pt-0">
        <div class="d-flex flex-column dialog__box">
          <span class="dialog__title">Reported Post</span>
          <span class="dialog__subtitle charcoal--text"
            >Report Category - Other</span
          >
        </div>
      </v-card-title>

      <v-card-text>
        <!-- <div class="d-flex">
          <div>
            <div class="d-flex justify-center mr-4">
              <div class="image__box">
                <v-img max-width="100%" height="100%" :src="photo" />
              </div>
            </div>
          </div>
          <div> -->
            <v-data-table
              :headers="headers"
              hide-default-footer
              :items="list"
              disable-filtering
              disable-sort
              height="379"
              fixed-header
              class="grey--text table__data"
            >
              <template v-slot:item="{ item, index }">
                <tr>
                  <td>
                    <span v-text="index + 1"></span>
                  </td>
                  <td>
                    <span v-text="item.value"></span>
                  </td>
                </tr>
              </template>
            </v-data-table>
          <!-- </div>
        </div> -->
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
    },
    photo: {
      type: String,
    },
    list: {
      type: Array,
    },
  },
  data() {
    return {
      headers: [
        {
          text: "No",
          value: "no",
          width: "50",
          class: "whitesmoke",
        },
        {
          text: "Alasan",
          value: "reason",
          width: "574",
          class: "whitesmoke",
        },
      ],
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
  },
};
</script>

<style lang="sass" scoped>
.image
  &__box
    width: 60px
    height: 60px
    background-color: grey
    overflow: hidden
.dialog
  &__box
    line-height: 24px
  &__title
    font-size: 14px
  &__subtitle
    font-size: 10px
td
  border-bottom: none !important
</style>
