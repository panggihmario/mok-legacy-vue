<template>
  <div>
    <HeaderContent :list="itemsHeader" label="Tambah Badge"></HeaderContent>

    <section>
      <Form-Badge></Form-Badge>
    </section>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import { ref } from "vue";
import { mapActions } from "vuex";
import FormBadge from "./form.vue";

export default {
  components: {
    HeaderContent,
    FormBadge,
  },
  setup() {
    const itemsHeader = ref([
      {
        text: "Master",
      },
      {
        text: "Badge",
      },
      {
        text: "Tambah Badge",
        disabled: true,
      },
    ]);

    const tableHeaders = ref([
      {
        text: "Badge",
        value: "badge",
        // width: "130",
        class: "whitesnow",
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
        width: "130",
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
    handleGetTableItems() {
      // return this.getListBadge()
      //   .then((res) => {
      //     console.log({ res });
      //   })
      //   .catch((err) => {
      //     console.log({ err });
      //   });
      this.tableItems = [
        {
          id: "2c9483cc75efeb9c017602b013350617",
          name: "Malaikat Kebaikan",
          level: 1,
          isShowBadge: true,
          isMyBadge: false,
          diffNominalBagde: 0,
          url: "https://koanba-storage-test.oss-ap-southeast-5.aliyuncs.com/img/account/1660108041285.jpeg",
        },
        {
          id: "2c9483cc75efeb9c017602b013350617",
          name: "Malaikat Kebaikan",
          level: 2,
          isShowBadge: true,
          isMyBadge: true,
          diffNominalBagde: 0,
          url: "https://koanba-storage-test.oss-ap-southeast-5.aliyuncs.com/img/account/1660108041285.jpeg",
        },
        {
          id: "2c9483cc75efeb9c017602b013350617",
          name: "Malaikat Kebaikan q",
          level: 3,
          isShowBadge: true,
          isMyBadge: false,
          diffNominalBagde: 1000,
          url: "https://koanba-storage-test.oss-ap-southeast-5.aliyuncs.com/img/account/1660108041285.jpeg",
        },
      ];
    },
    moveTo(v) {
      this.$router.push({
        name: v,
      });
    },
  },
};
</script>
