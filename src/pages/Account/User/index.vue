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
import { ref } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();

    const listBreadCrumbs = ref([
      { name: "Management Account" },
      { name: route.name },
    ]);

    const headerList = ref([
      { label: "no", width: "70px", align: "center" },
      { label: "bar"},
      { label: "status", width: "100px", align: "center" },
      { label: "action", width: "200px", align: "center" },
    ]);

    const itemList = ref([
      {
        id: 1,
        name: "Obviously, nothing changes since we haven’t compiled/transpiled anything, and the value of the custom property can be updated dynamically. So, for example, if we change the value of --value using something like JavaScript, the value will update in every instance where it is called using the var() function.",
        status: "active",
        action: "",
      },
      {
        id: 2,
        name: "Lorem ipsum dolor sit amet",
        status: "active",
        action: "",
      },
      {
        id: 3,
        name: "Lorem ipsum dolor sit amet",
        status: "active",
        action: "",
      },
      {
        id: 4,
        name: "Lorem ipsum dolor sit amet",
        status: "active",
        action: "",
      },
    ]);

    return {
      listBreadCrumbs,
      headerList,
      itemList,
    };
  },
};
</script>
