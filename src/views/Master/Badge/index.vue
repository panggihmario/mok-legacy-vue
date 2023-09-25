<template>
  <div>
    <HeaderContent :list="itemsHeader" label="Master Badge">
      <!-- <custom-input
        placeholder="Search channel"
        class="mr-4"
        width="200"
        v-model="payloadSearch"
        @keyup.enter="handleSearch"
      /> -->
      <custom-button
        class="white--text"
        color="primary"
        @click="moveTo('create badge')"
      >
        Tambah Badge
      </custom-button>
    </HeaderContent>

    <section>
      <Data-Table :headers="tableHeaders" :items="tableItems"></Data-Table>
    </section>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import { ref } from "vue";
import DataTable from "./table.vue";
import { mapActions, mapMutations } from "vuex";

export default {
  components: {
    HeaderContent,
    DataTable,
  },
  setup() {
    const itemsHeader = ref([
      {
        text: "Master",
        disabled: true,
      },
      {
        text: "Badge",
        disabled: true,
      },
    ]);

    const tableHeaders = ref([
      {
        text: "Badge",
        value: "badge",
        width: "100",
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
        // width: "130",
        class: "whitesnow",
      },
      {
        text: "Action",
        // value: "name",
        width: "170",
        class: "whitesnow",
        align: "center",
      },
    ]);

    const tableItems = ref([]);

    return {
      itemsHeader,
      tableHeaders,
      tableItems,
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
          this.tableItems = items;
          this.setListBadge(items);
        })
        .catch((err) => {
          console.log({ err });
        });
    },
    moveTo(v) {
      this.$router.push({
        name: v,
      });
    },
  },
};
</script>
