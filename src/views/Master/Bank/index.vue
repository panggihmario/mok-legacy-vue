<template>
  <div>
    <HeaderContent :list="list" label="Bank">
      <custom-button 
        color="secondary" 
        class="white--text" 
        size="small"
        @click="openDialog"
      >
        Tambah Bank
      </custom-button>
    </HeaderContent>
    <TableData
    />
    <Duration />
    <dialogAddVue  
      :dialog="dialog" 
      @closeDialog="closeDialog"
    />
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import TableData from "./table.vue"
import durationVue from "./duration.vue";
import dialogAddVue from "./dialogAdd.vue";
export default {
  components: {
    HeaderContent,
    TableData,
    Duration: durationVue,
    dialogAddVue
  },
  data() {
    return {
      dialog : false,
      list: [
        {
          text: "Master",
          disabled: false,
        },
        {
          text: "Bank",
          disabled: true,
        },
      ],
    }
  },
  methods : {
    openDialog() {
      this.dialog = true
    },
    closeDialog(value) {
      this.dialog = value
    }
  }
}
</script>