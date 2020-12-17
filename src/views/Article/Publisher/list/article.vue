<template>
  <div>
    <v-data-table hide-default-footer :headers="headers" :items="news">
      <template v-slot:[`item.status`]="{item}">
        <span :class="getColor(item.status)">{{item.status}}</span>
      </template>
      <template v-slot:[`item.date`]="{item}">
        {{formatingDate(item.createAt)}}
      </template>
      <template v-slot:[`item.action`]="{item}">
        <custom-button
					color="primary"
					size="small"
          v-if="item.status === 'Need Review'"
          @click="moveToReview(item.id)"
        >
					Review
				</custom-button>
				<div style="display : flex" v-else>
					<v-btn 
						@click="moveToEdit(item.id)"
						icon
					>
						<v-icon x-small>$edit</v-icon>
					</v-btn>
					<v-btn @click="openModalDelete(item.id)" class="ml-2"  icon>
						<v-icon x-small>$delete</v-icon>
					</v-btn>
				</div>
      </template>
    </v-data-table>
    <v-pagination
      :length="listNews.totalPages"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
      v-model="pageNews"
      @input="getNewsBaseOnPage"
      :total-visible="6"
    />
		<DialogDelete
			title="Yakin menghapus news ini"
			:dialog="dialog"
			description="News yang kamu hapus tidak akan tampil di halaman news"
			:closeModalDelete="closeModalDelete"
      :handleDelete="handleDelete"
		/>
		<v-snackbar top right v-model="alertSuccess" color="success">
			Delete Success
    </v-snackbar>
    <v-snackbar top right v-model="alertFailed" color="error">
			Delete Delete
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import DialogDelete from '@/components/material/Dialog/DialogDelete';
export default {
	components : {
		DialogDelete
  },
  props: ["listNews"],
  computed : {
    news () {
      const list = this.listNews.content
      if(list) {
        const filterSchedule = list.filter(f => {
          if(!f.isScheduled) {
            return f
          }
        })
        return filterSchedule
      }
    }
  }, 
  methods: {
    getColor(status) {
      switch (status) {
        case "Approved":
          return "kellygreen--text";
        case "Rejected":
          return "carmine--text";
        default:
          return "grey--text";
      }
    },
    formatingDate(rawDate) {
      const newDt = new Date(rawDate);
      const day = newDt.getDate();
      const month = newDt.getMonth() + 1;
      const year = newDt.getFullYear();
      const newFormat = `${day}/${month}/${year}`;
      return newFormat;
    },
		...mapActions({
      deleteNews : 'news/deleteDraft',
      getNews: "news/getListNews",
    }),
    getNewsBaseOnPage(p) {
      const params = {
        page : p,
        tab : 'list'
      }
      this.$emit('getNewsBaseOnPage',params)
    },
    moveToReview(id) {
      this.$router.push({
        name: "reviewPublisher",
        params: {
          id
        }
      });
		},
		moveToEdit (id) {
			this.$router.push({
				name : 'editPublisher',
				params : {
					id
				}
			})
		},
		openModalDelete(id) {
			this.idNews = id
			this.dialog = true
		},
		closeModalDelete() {
      console.log("dialog")
			this.dialog = false
			this.idNews = ''
		},
		async handleDelete() {
			let response = await this.deleteNews(this.idNews)
			if(response.status === 200){
				this.dialog = false
				this.alertSuccess = true
				setTimeout(() => {
					this.alertSuccess = false
				}, 2000)
				this.$emit('reloadDataNews')
			}else{
				this.dialog = false
				this.alertFailed = true
				setTimeout(() => {
					this.alertFailed = false
				},2000)
			}
		}
  },
  data() {
    return {
      dialog : false,
      pageNews : 1,
			alertSuccess : false,
			alertFailed : false,
			idNews : '',
      headers: [
        {
          text: "Tanggal",
          value: "date",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          width: "100"
        },
        {
          text: "Status",
          value: "status",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          width: "150"
        },
        {
          text: "Headline",
          value: "headline",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          width : "600"
        },
        {
          text: "",
          value: "action",
          class: "whitesnow",
          sortable: false,
          filterable: false
        }
      ]
    };
  }
};
</script>