<template>
  <div :class="feed['tb__td']">
    <transition name="fade">
      <div :class="ad['tb__actions']" v-if="selected.length > 0">
        <custom-button :loading="isLoadingMultiple" @click="openDialogDelete" size="small" color="warning">Reject Konten
          Terpilih</custom-button>
        <custom-button @click="clearSelected" size="small">Uncheck Konten Terpilih</custom-button>
      </div>
    </transition>
    <v-snackbar v-model="alertSuccess" top :color="statusMessage">
      {{ message }}
    </v-snackbar>
    <DialogReject
      @closeDialog="closeDialog"
      @handleDelete="rejectFeeds"
      :dialogReject="dialogReject"
    />
    <v-data-table 
      :headers="headers" 
      hide-default-footer 
      class="grey--text" 
      :class="feed['my-table']"
      :items="feeds" 
      show-select
      v-model="selected"
    > 
      <template v-slot:item="{item}">
        <ItemComponent
          :item="item"
          :selected="selected"
          @setSelectedItem="setSelectedItem"
          @refreshDataFeed="refreshDataFeed"
        />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Picker from "./datePicker.vue";
import Actions from "./actions.vue";
import LinkDialog from "../../containers/dialog/index.vue";
import moment from "moment";
import ActionsPicker from "./actionsPicker.vue";
import DialogReject from "./dialogReject.vue";
import actions from "./actions.vue";
import LevelPicker from "./levelPicker.vue";
import Item from "./item.vue"
export default {
  components: {
    Picker,
    Actions,
    LinkDialog,
    ActionsPicker,
    DialogReject,
    Actions : actions,
    LevelPicker,
    ItemComponent : Item
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
    }),
  },
  methods: {
    ...mapActions({
      fetchFeedById: "post/fetchFeedById",
      multipleReject : 'post/multipleReject',
      fetchFeeds: "post/fetchFeeds",
    }),
    setLevelPriority(value) {
      this.levelPriority = value
    },
    setSelectedItem (value) {
      this.selected = value
    },
    setEpochDate(time) {
      this.epochDate = time
    },
    formatingDate(rawDate) {
      const cek = moment(rawDate).format("DD/MM/YYYY HH:mm");
      return cek;
    },
    refreshDataFeed() {
      this.$emit("refreshDataFeed");
    },
    onHover(item) {
      this.selectedItem = item.id
      return this.fetchFeedById(item.id).then((response) => {
        const medias = response.medias
        const [media] = medias
        const thumbnail = media.thumbnail.large
        this.thumbnailImage = thumbnail
      });
    },
    getPosition(e) {
      const x = e.clientX;
      const y = e.clientY;
      document.getElementById("displayAreaDraft").style.left = (x - 246) + 'px';
    },
    stopTracking() {

    },
    onLeave() {
      this.selectedItem = null
      this.thumbnailImage = ""
    },
    clearSelected () {
      this.selected = []
    },  
    closeDialog() {
      this.dialogReject = false
    },
    rejectFeeds () {
      this.isLoadingMultiple = true
      const idSelected = this.selected.map(select => {
        return select.id
      })
      return this.multipleReject(idSelected)
        .then(response => {
          this.selected = []
          this.message = response.data.message
          const payload = {
            size : 10,
            tab : 'draft',
            page : this.$route.params.page - 1,
            sort :'createAt,DESC'
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
    openDialogDelete () {
      this.dialogReject = true
    }
  },
  data() {
    return {
      selectedItem: null,
      epochDate : null,
      thumbnailImage: "",
      dialogReject: false,
      alertSuccess: false,
      isLoadingMultiple : false,
      statusMessage: 'success',
      levelPriority : null,
      message: '',
      selected: [],
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
          width: "100",
        },
        {
          text: "Channel",
          sortable: false,
          filterable: false,
          value: "channel",
          width: "100",
        },
        {
          text: "Submitted",
          sortable: false,
          filterable: false,
          value: "date",
          width: "100",
        },
        {
          text: "User",
          sortable: false,
          filterable: false,
          value: "user",
          width: "100",
        },
        {
          text: "Schedule",
          sortable: false,
          filterable: false,
          value: "schedule",
          align: "left",
          width: "70",
        },
        {
          text: "Konten Level",
          sortable: false,
          filterable: false,
          value: "level",
          align: "left",
          width: "110",
        },
        {
          text: "Expired Tayang",
          sortable: false,
          filterable: false,
          value: "schedule",
          align: "left",
          width: "110",
        },
        {
          text: "Action",
          sortable: false,
          filterable: false,
          value: "actions",
          align: "center",
          // width: "200",
        },
      ],
    };
  },
};
</script>

<style lang="scss" module="feed">
.my-table thead th {
  background-color: #fafafa;
  // &:first-child { border-radius: 10px 0 0 0; }
  // &:last-child { border-radius: 0 10px 0 0; }
}
.fonts {
  font-size: 12px;
  font-weight: 500;
  color: #777777;
}

.tb {
  &__hover-image {
    position: absolute;
    background: #FFFFFF;
    border: 1px solid #EEEEEE;
    box-shadow: 0px 6px 24px rgba(0, 0, 0, 0.1);
    left: 25px;
    z-index: 999;
    width: 141px;
    height: 172px;
    border-radius: 16px;
    padding: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__image {
    max-width: 100%;
    border-radius: 8px;
    max-height: 100%;
  }

  &__td {
    position: relative;
  }

  &__caption {
    @extend .fonts;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    max-width: 150px;
  }

  &__schedule {
    background: #ffffff;
    border: 0.6px solid #bbbbbb;
    border-radius: 4px;
    box-sizing: border-box;
    width: 138px;
    height: 24px;
    padding: 6px;
    font-size: 10px;
    cursor: pointer;
  }

  &__schedule:focus {
    border: 0.6px solid #bbbbbb;
    outline: none;
  }

  &__icon-input {
    position: absolute;
    right: 35px;
    bottom: 3px;
  }
}
</style>

<style src="../../style.scss" lang="scss" module="ad"></style>