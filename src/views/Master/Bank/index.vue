<template>
  <div id="pageBank">
    <HeaderContent :list="list" label="Bank" id="headerBank" >
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
      id="contentBank" 
      :height="heightContent"
    />
    <Duration id="footerBank" />
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
import { mapMutations, mapState, mapActions } from "vuex";
export default {
  components: {
    HeaderContent,
    TableData,
    Duration: durationVue,
    dialogAddVue
  },
  computed : {
    ...mapState({
      heightContent : (state) => state.master.heightContent
    })
  },
  data() {
    return {
      height : 500,
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
  mounted () {
    this.getHeightElements()
  },
  methods : {
    ...mapMutations({
      setHeightContent : 'master/setHeightContent'
    }),
    ...mapActions({
      handleResizeContentHeight : 'master/handleResizeContentHeight'
    }),
    openDialog() {
      this.dialog = true
    },
    closeDialog(value) {
      this.dialog = value
    },
    getHeightElements () {
      const payload = {
        isOpen : false,
        differentHeight : 150
      }
      this.handleResizeContentHeight(payload)
    }
  }
}
</script>