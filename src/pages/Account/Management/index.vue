<template>
  <div>
    <k-page-title title="List Management Account" :breadCrumbs="listBreadCrumbs">
      <k-button color="kellygreen" @click="moveToCreatePage">
        Create Account
      </k-button>
    </k-page-title>
    <div class="mt-40"></div>

    <Filter @onEnter="handleSearchValue" />
    <k-table :headers="headers" :items="items">
      <template #status="{ item }">
        <span v-if="item.enabled">Active</span>
        <span v-else class="text-silver">Inactive</span>
      </template>
      <template #action="{ item }">
        <div class="flex  justify-around text-grey">
          <i class="fa-solid fa-pen"></i>
          <i class="fa-solid fa-trash"></i>
        </div>
      </template>
    </k-table>
    <div style="margin-top: 30px;" class="flex justify-end">
      {{ page }}
      <k-pagination v-model="page" :maxLength="totalPages"></k-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch, reactive } from "vue";
import { useApiStore } from "../../../stores/api"
import { useRouter } from "vue-router"
import { onMounted } from "vue";
import Filter from "./Filter/index.vue"

interface PayloadModel {
  [key: string]: string | number;
}
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
    const pathUrl = ref('admin/accounts/management')
    const listBreadCrumbs = ref([
      { name: "Manage Account" },
      { name: "List Management" },
    ]);
    const payload: PayloadModel = reactive({})

    const moveToCreatePage = function () {
      router.push({ name: 'createManagement' })
    }

    const handleSearchValue = function (value: string) {
      page.value = 1
      if (value) {
        pathUrl.value = 'admin/accounts/management/search'
        payload.value = value
        payload.page = 0
        return fetchData(payload)
      } else {
        pathUrl.value = 'admin/accounts/management'
        return fetchData(payload)
      }
    }

    const fetchManagementData = function (payload: PayloadModel) {
      return fetchData(payload)
    }

    const fetchData = function (payload: PayloadModel) {
      return apiStore.fetchApi(pathUrl.value, payload)
        .then(response => {
          items.value = response.content
          totalPages.value = response.totalPages
        })
    }

    const headers = [
      {
        label: 'User',
        value: 'username'
      },
      {
        label: 'Role',
        value: 'accountType',
        width: '200px',
        align: 'center'
      },
      {
        label: 'Status',
        value: 'status',
        width: '120px',
        align: 'center'
      },
      {
        label: 'Manage',
        value: 'action',
        width: '250px',
        align: 'center'
      }
    ]

    onMounted(() => {
      payload.page = page.value - 1
      fetchManagementData(payload)
    })

    watch(page, (newValue) => {
      payload.page = newValue - 1
      fetchManagementData(payload)
    })

    return {
      listBreadCrumbs,
      name,
      select,
      headers,
      items,
      totalPages,
      page,
      moveToCreatePage,
      handleSearchValue
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
