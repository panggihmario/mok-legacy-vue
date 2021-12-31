<template>
  <div>
    <transition name="fade" mode="out-in">
      <custom-button
        class="mr-2"
        size="small"
        color="secondary"
        :loading="loadingPublish"
        @click="publishFeed(item)"
        v-if="!isAlert"
      >
        Publish
      </custom-button>
      <v-chip
        class="mr-2"
        v-if="isAlert"
        x-small
        :color="colorAlert"
        text-color="white"
      >
        {{ textAlert }}
      </v-chip>
    </transition>
    <custom-button
      size="small"
      color="primary"
      :loading="loadingReject"
      @click="rejectFeed"
    >
      Reject
    </custom-button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["item", "epochDate"],
  data() {
    return {
      loadingPublish: false,
      loadingReject: false,
      alertFailed: false,
      alertSuccess: false,
      isAlert: false,
    };
  },
  computed: {
    colorAlert() {
      if (this.alertFailed) {
        return "red";
      } else {
        return "success";
      }
    },
    textAlert() {
      if (this.alertFailed) {
        return "Failed";
      } else {
        return "Success";
      }
    },
  },
  methods: {
    ...mapActions({
      updatePostFeed: "post/updatePostFeed",
      fetchFeedById: "post/fetchFeedById",
    }),
    checkIsSchedule() {
      if (this.epochDate) {
        return true;
      } else {
        return false;
      }
    },
    rejectFeed() {
      const item = this.item;
      this.loadingReject = true;

      return this.getFeedById(item.id)
        .then((medias) => {
          const payload = {
            id: item.id,
            type: "reject",
            params: {
              ...item,
              medias: [...medias],
            },
            
          };
          return this.updatePostFeed(payload)
        })
        .then(() => {
          this.$emit("refreshDataFeed");
          this.loadingReject = false;
        })
         .catch((err) => {
          this.loadingReject = false;
        });
    },
    getFeedById(id) {
      return this.fetchFeedById(id).then((response) => {
        const medias = response.medias;
        return medias;
      });
    },
    getPayload(isScheduled, medias) {
      const item = this.item;
      let payload;
      if (isScheduled) {
        payload = {
          id: item.id,
          type: "schedule",
          params: {
            ...item,
            isScheduled: true,
            scheduledTime: this.epochDate,
            medias: [...medias],
          },
        };
      } else {
        payload = {
          id: item.id,
          type: "publish",
          params: {
            ...item,
            medias: [...medias],
          },
        };
      }
      return payload;
    },
    updateApi(payload) {
      return this.updatePostFeed(payload)
        .then(() => {
          this.alertSuccess = true;
          this.isAlert = true;
          setTimeout(() => {
            this.$emit("refreshDataFeed");
            this.alertSuccess = false;
            this.isAlert = true;
            this.loadingPublish = false;
          }, 1000);
        })
        .catch((err) => {
          this.alertFailed = true;
          this.isAlert = true;
          setTimeout(() => {
            this.loadingPublish = false;
            this.alertFailed = false;
            this.isAlert = false;
          }, 1000);
        });
    },
    publishFeed() {
      this.loadingPublish = true;
      const item = this.item;
      const id = item.id;
      return this.getFeedById(id)
        .then((medias) => {
          const isScheduled = this.checkIsSchedule();
          return this.getPayload(isScheduled, medias);
        })
        .then((payload) => {
          return this.updateApi(payload);
        })
        .catch((err) => {
          this.loadingPublish = false;
        });
    },
  },
};
</script>