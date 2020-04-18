<template>
  <div>
    <HeaderContent label="List Feed">
      <custom-button color="carmine" class="white--text" @click="moveToCreate">
        Create
      </custom-button>
    </HeaderContent>
    <v-data-table :headers="headers" hide-default-footer :items="items">
      <template v-slot:item.image="{ item }">
        <custom-button
          color="carmine"
          class="white--text"
          @click="showMedia(item)"
        >
          Show
        </custom-button>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="350">
      <v-card>
        <div v-if="dialogMedia">
          <v-img :src="dialogMedia.url" v-if="dialogMedia.type === 'image'" />
          <video width="100%" height="100%" v-else :src="dialogMedia.url" controls autoplay />
        </div>
        <div v-else>no media</div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import HeaderContent from "../../containers/HeaderContent";
export default {
  components: {
    HeaderContent
  },
  data() {
    return {
      accountId: "",
      dialog: false,
      dialogMedia: {},
      items: [],
      headers: [
        {
          text: "Tanggal",
          value: "date",
          width: "100"
        },
        {
          text: "Photo Feed/Product",
          value: "image",
          width: "190"
        },
        {
          text: "Deskripsi Feed/Product",
          value: "description"
        }
      ]
    };
  },
  mounted() {
    this.handleListFeed();
  },
  methods: {
    ...mapActions({
      getListFeed: "post/getListFeed"
    }),
    showMedia(payload) {
      this.dialog = true;
      this.dialogMedia = payload.media[0];
    },
    formatingDate(rawDate) {
      const newDt = new Date(rawDate);
      const day = newDt.getDate();
      const month = newDt.getMonth() + 1;
      const year = newDt.getFullYear();
      const newFormat = `${day}/${month}/${year}`;
      return newFormat;
    },
    moveToCreate() {
      this.$router.push("/post/create");
    },
    async handleListFeed() {
      const id = localStorage.getItem("persada_id");
      const response = await this.getListFeed(id);
      if (response.status === 200) {
        const content = response.data.data.content;
        const formatingContent = content.map(c => {
          const newDte = this.formatingDate(c.createAt);
          if (c.post) {
            return {
              date: newDte,
              description: c.post.description,
              media: c.post.media
            };
          } else {
            return {
              date: newDte,
              description: c.postProduct.description,
              media: c.postProduct.media
            };
          }
        });
        this.items = formatingContent;
      } else {
        console.log(response);
      }
    }
  }
};
</script>
