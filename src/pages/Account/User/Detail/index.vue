<template>
  <div>
    <k-page-title :title="username" :breadCrumbs="breadCrumbs"></k-page-title>

    <div class="post-total mt-40 mb-24">Total Post: {{ postTotal }}</div>

    <div v-if="loadingPostList" class="flex justify-center">
      <span>loading</span>
    </div>
    <div v-else class="flex flex-wrap gap-10">
      <div
        v-for="item in postList"
        :key="item.id"
        class="flex justify-center align-center post-card pointer"
        style=""
        @click="openModalDetail(item)"
      >
        <img
          v-if="item.post.medias[0].type == 'image'"
          :src="item.post.medias[0].url"
          style="max-width: 100%"
        />
        <video
          v-else-if="item.post.medias[0].type == 'video'"
          :src="item.post.medias[0].url"
          style="max-width: 100%"
        ></video>
      </div>
    </div>

    <k-modal v-model="isShowModalDetail" width="720px">
      <div class="flex">
        <div style="width: 50%">
          <div
            class="flex justify-center align-center"
            style="background-color: black; height: 456px"
          >
            <img
              v-if="
                postDetail.post ? postDetail.post.medias[0].type == 'image' : ''
              "
              :src="postDetail.post ? postDetail.post.medias[0].url : ''"
              style="max-width: 100%; max-height: 100%"
            />
            <video
              v-else-if="
                postDetail.post ? postDetail.post.medias[0].type == 'video' : ''
              "
              :src="postDetail.post ? postDetail.post.medias[0].url : ''"
              style="max-width: 100%; max-height: 100%"
              controls
            ></video>
          </div>
        </div>
        <div class="px-24" style="width: 50%">
          <span class="post-detail-label">Diposting Pada</span>
          <div class="post-detail-value mt-8 mb-24">
            {{ postDetail.createAt }}
          </div>
          <span class="post-detail-label">Channel</span>
          <div class="post-detail-value mt-8">
            {{ postDetail.post ? postDetail.post.channel.name : "" }}
          </div>
        </div>
      </div>
    </k-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useApiStore } from "../../../../stores/api";

export default defineComponent({
  setup() {
    const route = useRoute();
    const store = useApiStore();

    type Item = { [key: string]: any };

    const userId = route.params.id;
    const username = ref("");

    const breadCrumbs = ref([
      { name: "Management Account" },
      { name: "List User" },
      { name: username },
    ]);

    const postList: Item = ref([]);
    const postTotal = ref(0);
    const loadingPostList = ref(false);
    const postDetail: Item = ref([]);
    const loadingPostDetail = ref(false);
    const isShowModalDetail = ref(false);

    const getUserDetail = () => {
      return store
        .fetchApi(`admin/accounts/users/${userId}`, {})
        .then((res) => {
          username.value = res.name;
        })
        .catch((err) => {
          console.log({ err });
        });
    };

    const getListPost = () => {
      loadingPostList.value = true;
      return store
        .fetchApi(`/profile/post/${userId}`, {
          page: "0",
          size: "30",
        })
        .then((res) => {
          postList.value = res.content;
          loadingPostList.value = false;
          postTotal.value = res.totalElements;
        })
        .catch((err) => {
          console.log({ err });
          loadingPostList.value = false;
        });
    };

    const openModalDetail = (item: Item) => {
      postDetail.value = item;
      isShowModalDetail.value = true;
    };

    onMounted(getUserDetail);
    onMounted(getListPost);

    return {
      username,
      breadCrumbs,
      postList,
      loadingPostList,
      postDetail,
      loadingPostDetail,
      postTotal,
      isShowModalDetail,
      openModalDetail,
    };
  },
});
</script>

<style lang="scss" scoped>
.post {
  &-total {
    font-size: $text-xl;
    font-weight: $font-medium;
  }
  &-card {
    background-color: black;
    width: 160px;
    height: 160px;
    overflow: hidden;
    border-radius: 8px;
  }
  &-detail {
    &-label {
      font-size: $text-sm;
      font-weight: $font-medium;
    }
    &-value {
      background-color: var(--whitesnow-color);
      font-size: $text-lg;
      padding: 13px 12px;
      border-radius: 6px;
    }
  }
}
</style>
