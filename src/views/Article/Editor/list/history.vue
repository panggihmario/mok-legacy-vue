<template>
  <div>
    <v-data-table hide-default-footer :headers="headers" :items="historyDummy"></v-data-table>
  </div>
</template>

<script>
export default {
  props: ["history"],
  data() {
    return {
      historyDummy: [
        {
          date: "16/6/2020",
          editor: "Editor",
          headline: "testing ajas"
        },
        {
          date: "16/6/2020",
          editor: "Editor",
          headline: "cek dl aja11"
        },
      ],
      headers: [
        {
          text: "Tanggal",
          value: "date",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          width: "120"
        },
        {
          text: "Editor",
          value: "editor",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          width: "200"
        },
        {
          text: "Headline",
          value: "headline",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          width: "600"
        },
        {
          text: "",
          value: "action",
          class: "whitesnow",
          sortable: false,
          filterable: false
        }
      ]
    };
  }
};
</script>
