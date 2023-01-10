<template>
  <div>
    <k-page-title
      title="List User"
      :listBreadCrumbs="listBreadCrumbs"
    ></k-page-title>
    <div class="mt-40">
      <div>
        <span>Total User: {{ totalElements }}</span>
      </div>
      <k-table :headers="headerList" :items="itemList">
        <template #isVerified="{ item }">
          <span v-if="item">Verified</span>
          <span v-else class="text-silver">Not Verified</span>
        </template>
        <template #manage>
          <k-button>List Post</k-button>
          <k-button class="ml-8">Edit User Info</k-button>
        </template>
      </k-table>

      <k-pagination></k-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useApiStore } from "../../../stores/api";

export default {
  setup() {
    const route = useRoute();
    const store = useApiStore();

    const page = ref(1);
    const totalPages = ref(0);
    const totalElements = ref(0);

    const listBreadCrumbs = ref([
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

    const getListItem = () => {
      return store
        .fetchApi("admin/accounts/users/search?value=&page=0", {})
        .then((res) => {
          const content = res.content;
          itemList.value = content;
          page.value = res.page;
          totalPages.value = res.totalPages;
          totalElements.value = res.totalElements;
        })
        .catch((err) => {
          console.log({ err });
        });
    };

    onMounted(getListItem);
    const show = ref(false);
    const showNotif = () => {
      show.value = !show.value;
    };

    return {
      listBreadCrumbs,
      headerList,
      itemList,
      page,
      totalPages,
      totalElements,
      show,
      showNotif,
    };
  },
};
</script>
