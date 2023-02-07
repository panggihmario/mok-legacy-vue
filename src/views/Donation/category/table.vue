<template>
  <v-data-table :headers="headers" :items="data" hide-default-footer>
    <template v-slot:item.icon="{ item }">
      <v-img
        :src="item.icon"
        width="32px"
        height="32px"
        style="border-radius: 4px;"
      ></v-img>
    </template>
    <template v-slot:item.manage="{ item, index }">
      <v-btn icon @click="actionEdit(index)">
        <v-icon x-small>fa-edit</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
    },
  },
  data() {
    return {
      headers: [
        {
          text: "Icon",
          value: "icon",
          class: "whitesnow",
          sortable: false,
          width: "60px",
        },
        {
          text: "Nama Kategori",
          value: "name",
          class: "whitesnow",
          sortable: false,
        },
        {
          text: "Manage",
          value: "manage",
          class: "whitesnow",
          align: "center",
          width: "150",
          sortable: false,
        },
      ],
    };
  },
  methods: {
    actionEdit(idx) {
      this.$emit("actionEdit", idx);
    },
  },
};
</script>
