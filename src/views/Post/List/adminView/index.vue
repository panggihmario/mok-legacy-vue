<template>
  <div :class="ad['tb__td']">
    <div :class="ad['tb__actions']">
      <custom-button @click="deleteFeed" size="small" color="warning">Hapus Konten Terpilih</custom-button>
      <custom-button @click="clearSelected" size="small">Uncheck Konten Terpilih</custom-button>
    </div>
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
              <Action :item="item" @successDelete="successDelete" />
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
export default {
  components: {
    LinkDialog,
    Action,
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
    deleteFeed () {
      const idSelected = this.selected.map(select => {
        return select.id
      })
      return this.multipleDelete(idSelected)
        .then(response => {
          const payload = {
            size : 10,
            tab : 'list',
            page : 0,
          }
          return this.fetchFeeds(payload)
        })
        .catch(err => {
          console.log(err)
        })
    },
    successDelete() {
      this.$emit("refreshDataFeed");
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
      selected : [],
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
</style>

<style src="../../style.scss" lang="scss" module="ad">
</style>