<template>
  <v-data-table
    :headers="tableHeaders"
    :items="tableItems"
    :loading="loadingList"
    disable-filtering
    disable-sort
    disable-pagination
    hide-default-footer
  >
    <template v-slot:body="{ items }">
      <tbody>
        <tr v-for="(item, idx) in items" :key="idx">
          <td class="font-12">
            <span class="show-post" @click="openDialogPost(item.id, idx)"
              >Lihat Post</span
            >
          </td>
          <td class="font-12 grey--text font-weight-medium">
            <div class="text-truncate" style="width: 200px">
              {{ item.description }}
            </div>
          </td>
          <td class="font-12 grey--text font-weight-medium">
            {{ item.channel.name }}
          </td>
          <td class="font-12 grey--text font-weight-medium">
            {{ item.createBy }}
          </td>
          <td class="font-12 grey--text font-weight-medium">
            <div class="d-flex align-center">
              <v-icon
                size="46px"
                :color="item.isVodAvailable ? 'green' : 'red'"
                style="margin-right: -16px"
                >mdi-circle-small</v-icon
              >
              <span :class="item.isVodAvailable ? 'green--text' : 'red--text'"
                >HLS</span
              >
            </div>
          </td>
          <td class="font-12 grey--text font-weight-medium">
            {{ formatingDate(item.createAt) }}
          </td>
          <td
            class="font-12 d-flex justify-space-around align-center grey--text font-weight-medium"
          >
            <custom-button
              class="mr-2"
              size="x-small"
              color="secondary"
              @click="openDialogPushNotif(item.id)"
            >
              Push Notif
            </custom-button>
            <v-icon
              size="15px"
              color="warning"
              @click="openDialogDelete(item.id)"
            >
              fa-solid fa-trash
            </v-icon>
          </td>
        </tr>
      </tbody>
    </template>
  </v-data-table>
</template>

<script>
import moment from "moment";

export default {
  props: ["tableHeaders", "tableItems", "loadingList"],
  data() {
    return {};
  },
  methods: {
    openDialogPost(id, idx) {
      this.$emit("openDialogPost", { id, idx });
    },
    formatingDate(rawDate) {
      const cek = moment(rawDate).format("DD/MM/YYYY HH:mm");
      return cek;
    },
    openDialogPushNotif(v) {
      this.$emit("openDialogPushNotif", v);
    },
    openDialogDelete(v) {
      this.$emit("openDialogDelete", v);
    },
  },
};
</script>

<style lang="scss" scoped>
.show-post {
  color: $secondary;
  text-decoration: underline;
  cursor: pointer;
}
</style>
