<template>
  <v-data-table
    :headers="headers"
    hide-default-footer
    disable-filtering
    disable-sort
    :items="items"
    class="grey--text"
  >
    <template v-slot:item="{ item }">
      <tr>
        <td>
          <div class="d-flex justify-center align-center" style="margin: 4px">
            <img :src="item.url" width="50px" />
          </div>
        </td>
        <td class="font-12">{{ item.name }}</td>
        <td class="font-12">
          <span>{{
            `${item.min.toLocaleString("id")} - ${item.max.toLocaleString(
              "id"
            )}`
          }}</span>
        </td>
        <td v-if="!noAction">
          <div class="d-flex justify-center align-center">
            <v-btn
              depressed
              @click="moveEdit(item.id)"
              class="text-capitalize font-12 font-weight-700"
              style="letter-spacing: 0"
            >
              <span>Edit Badge</span>
            </v-btn>
            <!-- <v-btn @click="openModalDelete(item.id)" icon>
              <v-icon x-small>$delete</v-icon>
            </v-btn> -->
          </div>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: ["headers", "items", "noAction"],
  setup() {
    const openModalDelete = (id) => {
      console.log("openModalDelete", id);
    };

    return {
      openModalDelete,
    };
  },
  methods: {
    moveEdit(id) {
      this.$router.push(`/badge/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.font-weight-700 {
  font-weight: 700;
}
</style>
