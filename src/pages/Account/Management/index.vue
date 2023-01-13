<template>
  <div>
    <k-page-title 
      title="List Management Account" 
      :breadCrumbs="listBreadCrumbs"
    >
      <k-button
        color="kellygreen"
        @click="moveToCreatePage"
      >
        Create Account
      </k-button>
    </k-page-title>
    <div class="mt-40"></div>

    <Filter />
    <k-table 
      :headers="headers"
      :items="items"
    >
    <template #status="{ item }">
      <span v-if="item.enabled">Active</span>
      <span v-else class="text-silver">Inactive</span>
    </template>
    <template #action="{ item }">
      <div class="flex gap-10">
        <i class="fa-solid fa-pen"></i>
        <i class="fa-solid fa-trash"></i>
      </div>
    </template>
    </k-table>
    <div style="margin-top: 30px;" class="flex justify-end">

      <k-pagination v-model="page" :maxLength="totalPages"></k-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useApiStore } from "../../../stores/api"
import { useRouter } from "vue-router"
import { onMounted } from "vue";
import Filter from "./Filter/index.vue"
export default {
  components: {
    Filter,
  },
  setup() {
    const apiStore = useApiStore()
    const router = useRouter()
    const name = ref('')
    const totalPages = ref(1)
    const page = ref(1);
    const select = ref({})
    const items = ref([])
    const listBreadCrumbs = ref([
      { name: "Manage Account" },
      { name: "List Management" },
    ]);

    const moveToCreatePage = function () {
      router.push({name : 'createManagement'})
    }

    const fetchManagementData = function () {
      const url = 'admin/accounts/management'
      return apiStore.fetchApi(url)
        .then(response => {
          console.log(response)
          items.value = response.content
          totalPages.value = response.totalPages
        })
    }

    const headers = [
      {
        label: 'User',
        value : 'username'
      },
      {
        label: 'Role',
        value : 'role'
      },
      {
        label: 'Status',
        value : 'status'
      },
      {
        label: 'Manage',
        value : 'action'
      }
    ]

    onMounted(fetchManagementData)

    return {
      listBreadCrumbs,
      name,
      select,
      headers,
      items,
      totalPages,
      page,
      moveToCreatePage
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
