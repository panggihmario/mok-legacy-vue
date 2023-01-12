<template>
  <div>
    <k-page-title title="List User" :breadCrumbs="breadCrumbs"></k-page-title>
    <div class="mt-40">
      <div>
        <span>Total User: {{ totalElements }}</span>
      </div>
      <k-table
        :headers="headerList"
        :items="itemList"
        :loading="loadingTable"
      >
        <template #isVerified="{ item }">
          <span v-if="item.isVerified">Verified</span>
          <span v-else class="text-silver">Not Verified</span>
        </template>
        <template #manage>
          <k-button>List Post</k-button>
          <k-button class="ml-8">Edit User Info</k-button>
        </template>
      </k-table>
      <div class="flex justify-end mt-14">
        <k-pagination v-model="page" :maxLength="totalPages"></k-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useApiStore } from "../../../stores/api";

export default {
  setup() {
    const route = useRoute();
    const store = useApiStore();

    const loadingTable = ref(false);

    const page = ref(10);
    const totalPages = ref(0);
    const totalElements = ref(0);

    watch(page, () => {
      getListItem("", page.value);
    });

    const breadCrumbs = ref([
      { name: "Management Account" },
      { name: route.name },
    ]);

    const headerList = ref([
      { label: "user", value: "name", width: "180px" },
      { label: "username", value: "username" },
      { label: "account type", value: "accountType" },
      { label: "verified account", value: "isVerified" },
      { label: "manage", value: "manage", width: "280px", align: "center" },
    ]);

    const itemList = ref([]);

    const getListItem = (value: string = "", page: number = 1) => {
      loadingTable.value = true;
      return store
        .fetchApi("admin/accounts/users/search", {
          value: "",
          page: `${page - 1}`,
        })
        .then((res) => {
          const content = res.content;
          itemList.value = content;
          totalPages.value = res.totalPages;
          totalElements.value = res.totalElements;
          loadingTable.value = false;
        })
        .catch((err) => {
          console.log({ err });
          loadingTable.value = false;
        });
    };

    onMounted(getListItem);
    const show = ref(false);
    const showNotif = () => {
      show.value = !show.value;
    };

    return {
      breadCrumbs,
      headerList,
      itemList,
      loadingTable,
      page,
      totalPages,
      totalElements,
      show,
      showNotif,
    };
  },
};
</script>
