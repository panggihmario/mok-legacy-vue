<template>
  <div>
    <k-page-title
      title="List User"
      :listBreadCrumbs="listBreadCrumbs"
    ></k-page-title>
    <div class="mt-40">
      <k-table :headerList="headerList" :itemList="itemList">
        <template #header-status="{ item }">{{ item.label }}</template>
        <template #foo="{ item }">
          <span style="color: tomato">
            {{ item }}
          </span>
        </template>
        <template #status="{ item }">
          <span style="color: tomato">
            {{ item }}
          </span>
        </template>
        <template #action>
          <k-button>action</k-button>
        </template>
      </k-table>
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

    const listBreadCrumbs = ref([
      { name: "Management Account" },
      { name: route.name },
    ]);

    const headerList = ref([
      { label: "no", width: "70px", align: "center" },
      { label: "bar" },
      { label: "status", width: "100px", align: "center" },
      { label: "action", width: "200px", align: "center" },
    ]);

    const itemList = ref([]);

    const getListItem = () => {
      return store
        .fetchApi("admin/accounts/users/", {})
        .then((res) => {
          console.log({ res });
        })
        .catch((err) => {
          console.log({ err });
        });
    };

    onMounted(getListItem);

    return {
      listBreadCrumbs,
      headerList,
      itemList,
    };
  },
};
</script>
