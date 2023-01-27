<template>
  <v-data-table :headers="headers" :items="data">
    <template v-slot:item.icon="{ item }">
      <v-img
        :src="item.icon"
        width="32px"
        height="32px"
        style="border-radius: 4px;"
      ></v-img>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [
        {
          icon: "https://dummyimage.com/200x200/000/000",
          name: "",
        },
      ],
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
          value: "Name",
          class: "whitesnow",
          sortable: false,
        },
        {
          text: "Manage",
          value: "manage",
          class: "whitesnow",
          sortable: false,
        },
      ],
    };
  },
};
</script>
