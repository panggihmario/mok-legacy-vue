<template>
  <div>
    <k-page-title title="List User" :breadCrumbs="breadCrumbs"></k-page-title>
    <div class="mt-40">
      <div>
        <span>Total User: {{ totalElements }}</span>
      </div>
      <k-table :headers="headerList" :items="itemList" :loading="loadingTable">
        <template #isVerified="{ item }">
          <span v-if="item.isVerified">Verified</span>
          <span v-else class="text-silver">Not Verified</span>
        </template>
        <template #manage="{ item }">
          <k-button @click="changePage(`user/${item.id}`)">List Post</k-button>
          <k-button class="ml-8" @click="openModalDetail(item)"
            >Edit User Info</k-button
          >
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
import { useRoute, useRouter } from "vue-router";
import { useApiStore } from "../../../stores/api";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useApiStore();

    const loadingTable = ref(false);
    const loadingDetail = ref(false);
    const isShowModal = ref(false);

    const page = ref(1);
    const totalPages = ref(0);
    const totalElements = ref(0);

    type Item = { [key: string]: any };

    watch(page, () => {
      getListItem("", page.value);
    });

    const breadCrumbs = ref([
      { name: "Management Account" },
      { name: "List User" },
    ]);

    const headerList = ref([
      { label: "user", value: "name", width: "180px" },
      { label: "username", value: "username" },
      { label: "account type", value: "accountType" },
      { label: "verified account", value: "isVerified" },
      { label: "manage", value: "manage", width: "280px", align: "center" },
    ]);

    const itemList = ref([]);

    const itemDetail = ref({});

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

    const getDetailItem = (id: string) => {
      isShowModal.value = true;
      loadingDetail.value = true;
      return store
        .fetchApi(`admin/accounts/users/${id}`, {})
        .then((res) => {
          itemDetail.value = res;
          loadingDetail.value = false;
        })
        .catch((err) => {
          console.log({ err });
          loadingDetail.value = false;
        });
    };

    const openModalDetail = (item: Item) => {
      getDetailItem(item.id);
    };

    const changePage = (path: string) => {
      router.push(path);
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
      itemDetail,
      loadingTable,
      loadingDetail,
      isShowModal,
      page,
      totalPages,
      totalElements,
      openModalDetail,
      changePage,
      show,
      showNotif,
    };
  },
};
</script>
