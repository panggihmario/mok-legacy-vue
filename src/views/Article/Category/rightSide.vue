<template>
  <div class="right__container">
    <div class="right__title charcoal--text">Kategori - {{category.name}}</div>
    <div class="d-flex justify-space-between align-center">
      <div class="d-flex">
        <div @click="openDialogDelete" class="mr-2 charcoal--text right__action">Delete Kategori</div>
        <div @click="openDialogEdit" class="charcoal--text right__action">Edit Kategori</div>
      </div>
      <div>
        <custom-button color="white"> Batalkan </custom-button>
        <custom-button :loading="loadingSaveMapping" class="ml-4" @click="saveMapping" color="primary">
          Simpan Pengaturan Mapping
        </custom-button>
      </div>
    </div>
    <div class="mt-12">
      <div class="right__label charcoal--text">Kategori Berita (Webhost)</div>
      <div class="right__sub-label charcoal--text">
        Pilih beberapa kategori berita dibawah ini untuk dihubungkan dengan
        kategori news di KipasKipas
      </div>
    </div>
    <div class="mt-8" style="width: 370px">
      <custom-input
        placeholder="Cari kategori berita"
        colorbg="white"
        append-icon="search"
        v-model="dataSearch"
      />
    </div>
    <div>
      <div 
        class="d-flex"
        v-for="(cate, idx) in resultCategory"
        :key="idx"
      >
        <div class="mr-4 text-uppercase right__group-label">{{cate.group}}</div>
        <div>
          <v-row no-gutters>
            <v-col  cols="6" v-for="(child, idx) in cate.children"  :key="idx">
              <!-- <v-checkbox
                :label="`${child.name}`"
                dense
                hide-details
                v-model="test"
                :value="child"
                @change="getSelectedWebhose"
              /> -->
              <div class="d-flex align-center">
                <input  type="checkbox" v-model="selectedWebhose" :value="child" >
                <div class="ml-2" >{{child.name}}</div>
              </div>
              </v-col>
          </v-row>
        </div>
      </div>

    <Edit
      :dialogEdit="dialogEdit"
      @closeDialogEdit="closeDialogEdit"
      :category="category"
    />
    <DialogDelete
      title="Yakin menghapus category ini?"
      description="Category yang kamu hapus tidak akan tampil dihalaman category news"
      :dialog="dialogDelete"
      @closeDialog="closeDialog"
      @handleDelete="handleDelete"
      :loading="loading"
    />
    </div>
  </div>
</template>


<script>
import { mapActions } from 'vuex'
import Edit from './edit'
import DialogDelete from "@/components/material/Dialog/DialogDelete";
import Label from '../../../components/material/Input/label.vue';
export default {
  props : ['categoryWebhose', 'category', 'selectedCategoryWebHose'],
  components : {
    Edit,
    DialogDelete,
    Label
  },
  computed : {
    selectedWebhose : {
      get() {
        return this.selectedCategoryWebHose
      },
      set(value) {
        this.$emit('getSelectedWebhose',value)
      }
    },
    resultCategory () {
      if(this.dataSearch) {
        const search = this.dataSearch.toLowerCase().trim()
        const data = this.categoryWebhose.map((item) => {
          return {
            ...item,
            children : item.children.filter(cat => {
              return cat.name.toLowerCase().includes(search)
            })
          }
        })
        const newDataFilter = data.filter(d => {
          if(d.children.length > 0) {
            return d
          }
        })
        return newDataFilter
      }else{
        return this.categoryWebhose
      }
    }
  },

  data () {
    return {
      test : [],
      selected : [],
      autoFilter : [],
      dialogEdit : false,
      dialogDelete : false,
      loading : false,
      loadingSaveMapping : false,
      dataSearch : ''
    }
  },
  methods : {
    ...mapActions({
      mappingCategory : 'news/mappingCategory',
      deleteCategoryNews : "news/deleteCategoryNews"
    }),
    comparator(a,b) {
      console.log(a, "===")
    },
    toggleSearch() {
      this.$emit("searchCategoryWebhose",this.dataSearch)
    },
    closeDialog() {
      // this.id = "";
      this.dialogDelete = false;
    },
    handleDelete() {
      this.loading = true
      return this.deleteCategoryNews(this.category.id)
        .then((r) => {
          this.dialogDelete = false;
          this.loading = false
          this.$emit('reGetCategory')
        })
        .catch((err) => {
          this.loading = false
          return err;
        });
    },
    openDialogDelete() {
      this.dialogDelete = true
    },
    getSelectedWebhose(value) {
      this.$emit('getSelectedWebhose',value)
    },
    openDialogEdit() {
      this.dialogEdit = true
    },
    closeDialogEdit(status) {
      this.dialogEdit = status
      this.$emit('reGetCategory')
    },
    saveMapping () {
      const idCategory = this.category.id
      const payload = {
        newsCategory : {
          id : idCategory
        },
        aggregatorCategories : this.selectedWebhose,
        agent : 'WEBHOSE'
      }
      this.loadingSaveMapping = true
      return this.mappingCategory(payload)
        .then(() => {
          this.$emit('finishMappingCategory')
          this.loadingSaveMapping = false
        })
        .catch(err => {
          this.loadingSaveMapping = false
          console.log(err)
        })
    }
  }
}
</script>


<style lang="sass" scoped>
.right
  &__container
    background-color: #F1F7FE
    width: 100%
    height: 100%
    padding: 32px
  &__title
    font-size: 14px
    font-weight: bold
    letter-spacing: 0.01em
  &__action
    font-size: 10px
    letter-spacing: 0.01em
    cursor: pointer
  &__label
    font-size: 14px
    font-weight: bold
    letter-spacing: 0.01em
  &__sub-label
    font-size: 12px
    letter-spacing: 0.01em
  &__group-label
    padding-top: 8px
</style>

<style scoped>
ul {
  column-count: 2;
  column-gap: 0;
  width: 600px;
}
li {
  display: inline-block;
}
.v-input--selection-controls{
  margin-top: 2px !important;
}
</style>