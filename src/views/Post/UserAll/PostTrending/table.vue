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
          <td class="font-12">
            <div class="text-truncate" style="width: 200px">
              {{ item.description }}
            </div>
          </td>
          <td class="font-12">{{ item.channel.name }}</td>
          <td class="font-12">{{ item.createBy }}</td>
          <td class="font-12">{{ item.trendingBy }}</td>
          <td class="font-12">{{ formatingDate(item.trendingExpired) }}</td>
          <td class="font-12 grey--text font-weight-medium">
            <div class="d-flex align-center" style="gap: 2px;">
              <v-icon
                size="8px"
                :color="item.isVodAvailable ? 'green' : 'red'"
                style="margin-top: -3px"
                >mdi-circle</v-icon
              >
              <span :class="item.isVodAvailable ? 'green--text' : 'red--text'"
                >HLS</span
              >
            </div>
          </td>
          <td class="font-12 text-center flex-actions" style="gap: 10px">
            <custom-button
              color="secondary"
              size="x-small"
              @click="openDialogPushNotif(item.id)"
            >
              Push Notif
            </custom-button>
            <div v-if="item.isPriority">
              <div class="flex-actions isPriority">
                <v-icon color="grey" size="small">fas fa-check-square</v-icon>
                <div class="grey--text">Priority</div>
              </div>
            </div>
            <div
              v-else
              class="flex-actions"
              @click="openDialogPriority(item.id)"
            >
              <v-icon size="small">far fa-square</v-icon>
              <div>Priority</div>
            </div>
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
    openDialogPriority(v) {
      this.$emit("openDialogPriority", v);
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
.flex-actions {
  display: flex;
  gap: 5px;
  align-items: center;
  cursor: pointer;
  & .isPriority {
    cursor: default;
  }
}
</style>
