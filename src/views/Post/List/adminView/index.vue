<template>
  <div :class="ad['tb__td']">
    <transition name="fade">
      <div :class="ad['tb__actions']" v-if="selected.length > 0">
        <custom-button :loading="isLoadingMultiple" @click="openDialogDelete" size="small" color="warning">Hapus Konten Terpilih</custom-button>
        <custom-button @click="clearSelected" size="small">Uncheck Konten Terpilih</custom-button>
      </div>
    </transition>
    
    <v-snackbar
      v-model="alertSuccess"
      top
      :color="statusMessage"
    > 
      {{ message }}
    </v-snackbar>
    <DialogReject
      @closeDialog="closeDialog"
      @handleDelete="deleteFeed"
      :dialogReject="dialogReject"
    />
    <v-data-table
      :headers="headers"
      hide-default-footer
      class="grey--text my-table"
      :items="feeds"
      v-model="selected"
      show-select
    >
      <template v-slot:body="{ items }">
        <tbody>
          <tr
            v-for="item in items"
            :key="item.id"
          >
            <td>
              <input
                style="width: 20px"
                type="checkbox"
                :value="item"
                v-model="selected"
              />
            </td>
            <td
              @mouseover="onHover(item)"
              @mouseleave="onLeave"
              @mousemove="getPosition"
              @mouseout="stopTracking"
            >
              <LinkDialog :item="item" :feeds="feeds" />
               <div
                v-if="item.id === selectedItem"
                id="displayArea"
                :class="ad['tb__hover-image']"
                :style="{
                  top: `${
                    (item.index + 1) * 100 - (item.index * 50 + item.index * 20)
                  }px`,
                }"
              >
                <img
                  :src="thumbnailImage"
                  :class="ad['tb__image']"
                />
              </div>
            </td>
            <td>
              <div :class="ad['tb__caption']">{{ item.description }}</div>
            </td>
            <td>
              <div :class="ad['tb__caption']">{{ item.channel.name }}</div>
            </td>
            <td>
              <div :class="ad['tb__caption']">{{ item.createBy }}</div>
            </td>
            <td>
              <div :class="ad['tb__caption']"  >{{ item.publishBy }}</div>
            </td>
            <td >
              <div :class="ad['tb__caption']" class="d-flex justify-center align-center" >
                {{ formatingDate(item.publishedAt) }}
              </div>
            </td>
            <td>
              <div :class="ad['tb__caption']" class="d-flex justify-center align-center" >
                <div v-if="item.proceedAt"> {{ formatingDate(item.proceedAt) }} </div>
                <div v-else > 
                  <v-icon size="small" >far fa-clock</v-icon>
                </div>
              </div>
            </td>
            <td class="d-flex justify-center align-center">
              <Action 
                :item="item" 
                @successDelete="successDelete" 
                @handleFailed="onHandleFailed"
              />
            </td>
            <!-- <td></td> -->
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";
import LinkDialog from "../../containers/dialog/index.vue";
import Action from "./action.vue";
import DialogReject from "./dialogReject.vue"
export default {
  components: {
    LinkDialog,
    Action,
    DialogReject
  },
  watch : {
    '$route.params.page': {
      handler: function(search) {
        this.selected = []
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    ...mapState({
      feeds: (state) => state.post.feeds,
      totalPages: (state) => state.post.totalPages,
    }),
  },
  methods: {
     ...mapActions({
      fetchFeedById: "post/fetchFeedById",
      multipleDelete : 'post/multipleDelete',
      fetchFeeds: "post/fetchFeeds",
    }),
    clearSelected () {
      this.selected = []
    },  
    closeDialog() {
      this.dialogReject = false
    },
    openDialogDelete() {
      if(this.selected.length > 0) {
        this.dialogReject = true
      }else{
        return
      }
    },
    deleteFeed () {
      this.isLoadingMultiple = true
      const idSelected = this.selected.map(select => {
        return select.id
      })
      return this.multipleDelete(idSelected)
        .then(response => {
          this.message = response.data.message
          const payload = {
            size : 10,
            tab : 'list',
            page : 0,
          }
          this.dialogReject = false
          this.isLoadingMultiple = false
          this.alertSuccess = true
          setTimeout(() => {
            this.alertSuccess = false
            this.message = ''
          },1500)
          return this.fetchFeeds(payload)
        })
        .catch(err => {
          this.isLoadingMultiple = false
          this.dialogReject = false
          this.onHandleFailed(err)
        })
    },
    onHandleFailed(value) {
      const response = value.response
      this.message = response.data.message
      this.statusMessage = 'warning'
      this.alertSuccess = true
      setTimeout(() => {
        this.alertSuccess = false
        this.message = ''
        this.statusMessage = 'success'
      },1500)
    },
    successDelete(response) {
      this.$emit("refreshDataFeed");
      this.message = response.data.message
      this.alertSuccess = true
      setTimeout(() => {
        this.alertSuccess = false
        this.message = ''
      },1500)
    },
    formatingDate(rawDate) {
      const cek = moment(rawDate).format("DD/MM/YYYY HH:mm");
      return cek;
    },
    onHover(item) {
      this.selectedItem = item.id
      return this.fetchFeedById(item.id).then((response) => {
        const medias = response.medias
        const [media] = medias
        const thumbnail = media.thumbnail.medium
        this.thumbnailImage = thumbnail
      });
    },
    getPosition(e) {
      const x = e.clientX;
      const y = e.clientY;
      document.getElementById("displayArea").style.left =  (x - 246) + 'px';
    },
    stopTracking() {

    },
    onLeave() {
      this.selectedItem = null
      this.thumbnailImage = ""
    },
  },
  data() {
    return {
      page: 1,
      dialogReject : false,
      alertSuccess : false,
      message : '',
      statusMessage : 'success',
      selected : [],
      isLoadingMultiple : false,
      selectedItem : null,
      thumbnailImage : "",
      headers: [
        {
          text: "Media",
          sortable: false,
          value: "media",
          filterable: false,
          width: "90",
        },
        {
          text: "Caption",
          value: "description",
          sortable: false,
          filterable: false,
          width: "260",
        },
        {
          text: "Channel",
          sortable: false,
          filterable: false,
          value: "channel",
        },
        {
          text: "User",
          sortable: false,
          filterable: false,
          value: "user",
        },
        {
          text: "Publisher",
          sortable: false,
          filterable: false,
          value: "publishBy",
        },
        {
          text: "Dipublish Pada",
          sortable: false,
          filterable: false,
          value: "schedule",
          align: "center",
          width: "150",
        },
        {
          text : 'Tayang',
          sortable : false,
          filterable : false , 
          value : 'proceedAt',
          align : 'center'
        },
        {
          text: "Action",
          sortable: false,
          filterable: false,
          value: "action",
          align: "center",
        },
      ],
    };
  },
};
</script>

<style lang="scss" >
.my-table thead th {
  background-color: #fafafa;
  // &:first-child { border-radius: 10px 0 0 0; }
  // &:last-child { border-radius: 0 10px 0 0; }
}
.header-table {
  color: black;
  font-size: 14px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

<style src="../../style.scss" lang="scss" module="ad">
</style>