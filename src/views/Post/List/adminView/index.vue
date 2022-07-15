<template>
  <div>
    <v-data-table
      :headers="headers"
      hide-default-footer
      class="grey--text"
      :items="feeds"
      
    >
      <template v-slot:[`item.media`]="{ item }">
        <LinkDialog :item="item" :feeds="feeds" />
      </template>
      <template v-slot:[`item.description`]="{ item }">
        <div  :class="ad['tb__caption']">{{ item.description }}</div>
      </template>
      <template v-slot:[`item.channel`]="{ item }">
        <div :class="ad['dg__desc']">{{ item.channel.name }}</div>
      </template>
      <template v-slot:[`item.user`]="{ item }">
        <div :class="ad['dg__desc']">{{ item.createBy }}</div>
      </template>
      <template v-slot:[`item.publishBy`]="{ item }">
        <div :class="ad['dg__desc']">{{ item.publishBy }}</div>
      </template>
      <template v-slot:[`item.schedule`]="{ item }">
        <div :class="ad['dg__desc']">{{ formatingDate(item.publishedAt) }}</div>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <Action :item="item" @successDelete="successDelete" />
      </template>
      <template v-slot:[`body.append`]>
        <tr></tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
    successDelete() {
      this.$emit("refreshDataFeed");
    },
    formatingDate(rawDate) {
      const cek = moment(rawDate).format("DD/MM/YYYY HH:mm");
      return cek;
    },
    onHover() {
      console.log("on hover")
    }
  },
  data() {
    return {
      page: 1,
      headers: [
        {
          text: "Media",
          class: "whitesnow",
          sortable: false,
          value: "media",
          filterable: false,
          width: "100",
        },
        {
          text: "Caption",
          class: "whitesnow",
          value: "description",
          sortable: false,
          filterable: false,
          width: "260",
        },
        {
          text: "Channel",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          value: "channel",
        },
        {
          text: "User",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          value: "user",
        },
        {
          text: "Publisher",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          value: "publishBy",
        },
        {
          text: "Dipublish Pada",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          value: "schedule",
          align: "center",
          width: "150",
        },
        {
          text: "Action",
          class: "whitesnow",
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

<style src="../../style.scss" lang="scss" module="ad">
</style>