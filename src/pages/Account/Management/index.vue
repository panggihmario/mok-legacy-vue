<template>
  <div>
    <k-page-title title="List Management Account" :listBreadCrumbs="listBreadCrumbs">
    </k-page-title>
    <div class="mt-40"></div>

    <Filter />
    <k-table :headerList="headers"
      :itemList="items"
    >
    </k-table>

  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useApiStore } from "../../../stores/api"
import { onMounted } from "vue";
import Filter from "./Filter/index.vue"
export default {
  components: {
    Filter
  },
  setup() {
    const apiStore = useApiStore()
    const name = ref('')
    const select = ref({})
    const items = ref([])
    const listBreadCrumbs = ref([
      { name: "Manage Account" },
      { name: "List Management" },
    ]);

    const fetchManagementData = function () {
      const url = 'admin/accounts/management'
      return apiStore.fetchApi(url)
        .then(response => {
          console.log(response)
          items.value = response.content
        })
        .catch(err => {
          // console.log(err)
        })
    }

    const headers = [
      {
        label: 'User',
        name : 'username'
      },
      {
        label: 'Role',
        name : 'role'
      },
      {
        label: 'Status',
        name : 'status'
      },
      {
        label: 'Manage',
        name : 'action'
      }
    ]

    onMounted(fetchManagementData)

    return {
      listBreadCrumbs,
      name,
      select,
      headers,
      items
    };
  },
};
</script>

<style>
.container {
  display: grid;
  grid-template-columns: 200px 200px 200px;
  gap: 20px;
}
</style>
