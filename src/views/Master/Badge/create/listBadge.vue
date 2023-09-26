<template>
  <v-navigation-drawer
    floating
    app
    width="389"
    permanent
    right
    style="border-left: 1px solid var(--White-Smoke, #eee)"
  >
    <Table-Data
      :headers="tableHeaders"
      :items="listBadge"
      :noAction="true"
    ></Table-Data>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import TableData from "../table.vue";
import { ref } from "vue";

export default {
  components: {
    TableData,
  },
  setup() {
    const listBadge = ref([]);
    const tableHeaders = ref([
      {
        text: "Badge",
        value: "badge",
        width: "70",
        class: "whitesnow",
        align: "center",
      },
      {
        text: "Nama Badge",
        value: "name",
        // width: "130",
        class: "whitesnow",
      },
      {
        text: "Range",
        // value: "range",
        width: "130",
        class: "whitesnow",
      },
    ]);

    return {
      listBadge,
      tableHeaders,
    };
  },
  mounted() {
    this.handleGetTableItems();
  },
  methods: {
    ...mapActions({
      getListBadge: "donation/getListBadge",
    }),
    ...mapMutations({
      setListBadge: "donation/setListBadge",
    }),
    handleGetTableItems() {
      const payload = {
        // size: 10,
        // page: 0,
        // sort: `createAt,desc`,
      };
      return this.getListBadge(payload)
        .then((res) => {
          const items = res.data;
          this.listBadge = items;
          this.setListBadge(items);
        })
        .catch((err) => {
          console.log({ err });
        });
    },
  },
};
</script>
