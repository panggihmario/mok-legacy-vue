<template>
  <div>
    <HeaderContent label="Default Channel Home" :list="crumbs" :items="items">
      <div v-if="isPinEdited" class="d-flex" style="gap: 8px">
        <custom-button @click="cancelEdit">Batal</custom-button>
        <custom-button
          color="primary"
          class="white--text"
          @click="actionSubmitPinnedChannel"
          :disable="defaultFirst == undefined || defaultFirst == null"
          >Simpan</custom-button
        >
      </div>
    </HeaderContent>

    <section>
      <div class="d-flex" style="width: 100%">
        <section
          class="mr-1"
          style="
            width: 50%;
            min-width: 300px;
            overflow: auto;
            border: 1px solid gainsboro;
          "
        >
          <v-text-field
            v-model="payloadSearch"
            placeholder="Search"
            outlined
            dense
            hide-details
            class="pa-2 font-12"
          >
            <template v-slot:append>
              <v-icon size="16px" class="mt-1">fas fa-search</v-icon>
            </template>
          </v-text-field>
          <div>
            <div
              v-if="isLoadingListChannel"
              class="d-flex justify-center align-center"
              style="height: 50px"
            >
              <v-progress-circular
                indeterminate
                color="primary"
                size="20"
                width="2"
              ></v-progress-circular>
            </div>
            <v-simple-table v-else height="600px">
              <template v-slot:default>
                <thead>
                  <tr class="whitesnow">
                    <th class="text-left">No</th>
                    <th class="text-left">Gambar</th>
                    <th class="text-left">Nama Channel</th>
                    <th class="text-left">Dibuat Oleh</th>
                    <th class="text-left">Sensitif Channel</th>
                    <th class="text-left"></th>
                  </tr>
                </thead>
                <tbody v-if="itemsShowed.length > 0">
                  <tr v-for="(item, idx) in itemsShowed" :key="idx">
                    <td class="font-12">{{ idx + 1 }}</td>
                    <td class="text-center">
                      <img :src="item.icon" height="31px" alt="" />
                    </td>
                    <td class="font-12">{{ item.name }}</td>
                    <td class="font-12">{{ item.createBy }}</td>
                    <td class="font-12"></td>
                    <td class="font-12">
                      <v-btn
                        x-small
                        depressed
                        @click="moveToItemDefault(item)"
                        :disabled="
                          pinnedChannels.length >= 3 || checkDisableButton(item)
                        "
                      >
                        <v-icon size="12px">fas fa-arrow-right</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr>
                    <td colspan="6">
                      <span class="warning--text font-12"
                        >Channel tidak ditemukan, gunakan keyword lain untuk
                        memunculkan channel yang ingin kamu gunakan!.</span
                      >
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
        </section>
        <section
          class="ml-1"
          style="
            width: 50%;
            min-width: 300px;
            overflow: auto;
            border: 1px solid gainsboro;
          "
        >
          <div
            class="d-flex align-center bg-primary-low-tint font-12 pa-3"
            style="height: 56px; width: 100%; gap: 8px"
          >
            <v-icon size="16px" color="warning">fas fa-info-circle</v-icon>
            <span style="font-weight: 700"
              >Channel ini akan muncul di home user dan tidak dapat di unpin
              oleh user</span
            >
          </div>
          <div
            v-if="defaultFirst == undefined || defaultFirst == null"
            class="d-flex align-center warning--text font-12 pa-3"
            style="height: 48px; width: 100%; gap: 8px"
          >
            <span style="font-weight: 500">
              Pilih channel sebagai default saat <b><i>pertama dibuka</i></b>
            </span>
          </div>
          <div
            v-if="isRemoveFirstOpen"
            class="d-flex align-center warning--text font-12 pa-3"
            style="height: 48px; width: 100%; gap: 8px"
          >
            <span style="font-weight: 500">
              Pilih channel lain sebagai default sebelum menghapus channel
              default
            </span>
          </div>

          <div style="height: 100%; width: 100%; overflow: auto">
            <div style="width: 100%; min-width: 600px">
              <section
                class="d-flex align-center font-12"
                style="border-bottom: 1px solid gainsboro"
              >
                <div class="text-center" style="width: 60px; padding: 8px">
                  <span>Urutan</span>
                </div>
                <div class="text-center" style="width: 100px; padding: 8px">
                  <span>Gambar</span>
                </div>
                <div style="width: 120px; padding: 8px">
                  <span>Nama Channel</span>
                </div>
                <div style="width: 110px; padding: 8px">
                  <span>Dibuat Oleh</span>
                </div>
                <div style="width: 120px; padding: 8px">
                  <span>Sensitif Channel</span>
                </div>
                <div
                  class="font-12 d-flex justify-center align-center"
                  style="width: 120px; padding: 8px"
                >
                  <span>Pertama Dibuka</span>
                </div>
                <div
                  class="d-flex justify-end align-center"
                  style="width: 58px"
                ></div>
              </section>
              <section
                v-for="(item, idx) in menuStatic"
                :key="item.name"
                class="d-flex align-center font-12"
                style="border-bottom: 1px solid gainsboro"
              >
                <div class="text-center" style="width: 60px; padding: 8px">
                  {{ idx + 1 }}
                </div>
                <div
                  class="d-flex justify-center align-center"
                  style="width: 100px; padding: 8px"
                >
                  <img :src="item.icon" height="31px" alt="" />
                </div>
                <div style="width: 113.5px; padding: 8px; overflow: hidden">
                  {{ item.name }}
                </div>
                <div style="width: 110px; padding: 8px">
                  {{ item.createBy }}
                </div>
                <div style="width: 120px; padding: 8px"></div>
                <div
                  class="font-12 d-flex justify-center align-center"
                  style="width: 120px; padding: 8px"
                >
                  <v-radio-group
                    v-model="defaultFirst"
                    dense
                    hide-details
                    style="
                      margin-top: 0px !important;
                      padding-top: 0px !important;
                    "
                  >
                    <v-radio :key="item.name" :value="item.name"></v-radio>
                  </v-radio-group>
                </div>
                <div
                  class="d-flex justify-end align-center"
                  style="width: 58px"
                ></div>
              </section>
              <draggable
                :list="pinnedChannels"
                :disabled="!enabledDrag"
                class="list-group"
                ghost-class="ghost"
                @start="dragging = true"
                @end="dragging = false"
              >
                <section
                  v-for="(item, idx) in pinnedChannels"
                  :key="item.name"
                  class="d-flex align-center font-12"
                  style="border-bottom: 1px solid gainsboro"
                >
                  <div class="text-center" style="width: 60px; padding: 8px">
                    {{ idx + 1 + menuStatic.length }}
                  </div>
                  <div
                    class="d-flex justify-center align-center"
                    style="width: 100px; padding: 8px"
                  >
                    <img :src="item.icon" height="31px" alt="" />
                  </div>
                  <div style="width: 120px; padding: 8px; overflow: hidden">
                    {{ item.name }}
                  </div>
                  <div style="width: 110px; padding: 8px">
                    {{ item.createBy }}
                  </div>
                  <div style="width: 120px; padding: 8px"></div>
                  <div
                    class="font-12 d-flex justify-center align-center"
                    style="width: 120px; padding: 8px"
                  >
                    <v-radio-group
                      v-model="defaultFirst"
                      dense
                      hide-details
                      style="
                        margin-top: 0px !important;
                        padding-top: 0px !important;
                      "
                    >
                      <v-radio :key="item.name" :value="item.name"></v-radio>
                    </v-radio-group>
                  </div>
                  <div
                    class="d-flex justify-end align-center"
                    style="width: 58px"
                  >
                    <div
                      class="d-flex justify-space-between"
                      style="width: 50px"
                    >
                      <v-btn
                        x-small
                        icon
                        @click="removeFromItemDefault(idx, item.name)"
                      >
                        <v-icon size="16px" color="primary">mdi-close</v-icon>
                      </v-btn>
                      <v-btn
                        x-small
                        icon
                        class="cursor-grab"
                        :class="{ 'cursor-grabbing': dragging }"
                      >
                        <v-icon size="16px" color="gainsboro"
                          >fas fa-grip-vertical</v-icon
                        >
                      </v-btn>
                    </div>
                  </div>
                </section>
              </draggable>
            </div>
          </div>
        </section>
      </div>

      <v-snackbar
        top
        right
        v-model="alertSuccess"
        color="success"
        :timeout="3000"
      >
        Success
      </v-snackbar>
      <v-snackbar
        top
        right
        v-model="alertFailed"
        color="primary"
        :timeout="3000"
      >
        {{ errorMessage }}
      </v-snackbar>
    </section>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import HeaderContent from "@/containers/HeaderContent";
import { mapActions } from "vuex";

export default {
  components: {
    HeaderContent,
    draggable,
  },
  data() {
    return {
      crumbs: [
        {
          text: "Konten",
          disabled: true,
        },
      ],
      enabledDrag: true,
      dragging: false,
      itemsShowed: [],
      items: [],
      itemsSearch: [],
      menuStatic: [],
      pinnedChannels: [],
      itemsDefault: [],
      payloadSearch: "",
      defaultFirst: null,
      isPinEdited: false,
      isLoadingListChannel: false,
      isRemoveFirstOpen: false,
      page: 1,
      totalPages: 1,
      alertSuccess: false,
      alertFailed: false,
      errorMessage: "",
    };
  },
  watch: {
    items() {
      if (this.page <= this.totalPages) {
        this.handleGetListChannelByPage();
      }
    },
    itemsSearch() {
      if (this.page <= this.totalPages) {
        this.handleSearchListChannel();
      }
    },
    dragging() {
      this.isRemoveFirstOpen = false;
      this.isPinEdited = true;
    },
    defaultFirst() {
      this.isRemoveFirstOpen = false;
      this.isPinEdited = true;
    },
    payloadSearch() {
      this.page = 1;
      this.isLoadingListChannel = true;
      if (this.payloadSearch == "") {
        this.itemsShowed = [];
        this.handleGetListChannel();
      } else {
        this.itemsShowed = [];
        this.handleSearchListChannel();
      }
    },
  },
  mounted() {
    this.handleGetListChannel();
    this.handleGetListChannelPinned();
  },
  methods: {
    ...mapActions({
      listChannel: "channel/getListChannel",
      deleteChannel: "channel/deleteChannel",
      searchChannel: "channel/searchChannel",
      getListChannelPinned: "channel/getListChannelPinned",
      createChannelPinned: "channel/createChannelPinned",
    }),
    formatingResponse(response) {
      this.totalPages = response.totalPages;
      const content = response.content;
      const newFormatResponse = content.map((res) => {
        return {
          id: res.id,
          icon: res.photo,
          name: res.name,
          description: res.description,
          createBy: res.createBy,
        };
      });
      return newFormatResponse;
    },
    async handleGetListChannel() {
      const payload = {
        page: 0,
      };
      const response = await this.listChannel(payload);
      if (response.status === 200) {
        const res = response.data.data;
        this.page++;
        this.items = this.formatingResponse(res);
        this.itemsShowed = this.formatingResponse(res);
        this.isLoadingListChannel = false;
      } else {
        this.isLoadingListChannel = false;
        return response;
      }
    },
    async handleGetListChannelByPage() {
      const payload = {
        page: this.page - 1,
      };
      const response = await this.listChannel(payload);
      if (response.status === 200) {
        const res = response.data.data;
        const formatted = this.formatingResponse(res);
        this.page++;
        formatted.forEach((item) => {
          this.items.push(item);
          this.itemsShowed.push(item);
        });
      } else {
        return response;
      }
    },
    async handleSearchListChannel() {
      const payload = {
        page: this.page - 1,
        search: this.payloadSearch,
      };
      const response = await this.searchChannel(payload);
      if (response.status === 200) {
        const res = response.data.data;
        const formatted = this.formatingResponse(res);
        this.page++;
        formatted.forEach((item) => {
          this.itemsSearch.push(item);
          this.itemsShowed.push(item);
        });
        this.isLoadingListChannel = false;
      } else {
        this.isLoadingListChannel = false;
        return response;
      }
    },
    async handleGetListChannelPinned() {
      const payload = {
        size: 10,
        page: 0,
      };
      const response = await this.getListChannelPinned(payload);
      if (response.status === 200) {
        const res = response.data.data;
        this.menuStatic = res.menuStatic;
        res.menuStatic.forEach((item) => {
          if (item.isFirstOpen) {
            this.defaultFirst = item.name;
          }
          this.itemsDefault.push({
            channelId: item.id,
            icon: item.icon,
            name: item.name,
            createBy: item.createBy,
            isFirstOpen: item.isFirstOpen,
            sequence: item.sequence,
          });
        });
        this.pinnedChannels = res.pinnedChannels;
        res.pinnedChannels.forEach((item) => {
          if (item.isFirstOpen) {
            this.defaultFirst = item.name;
          }
          this.itemsDefault.push({
            id: item.id,
            channelId: item.channelId,
            icon: item.icon,
            name: item.name,
            createBy: item.createBy,
            isFirstOpen: item.isFirstOpen,
            sequence: item.sequence,
          });
        });
      } else {
        return response;
      }
    },
    moveToItemDefault(item) {
      this.isPinEdited = true;
      this.isRemoveFirstOpen = false;
      this.pinnedChannels.push({
        id: null,
        channelId: item.id,
        icon: item.icon,
        name: item.name,
        createBy: item.createBy,
        isFirstOpen: false,
        sequence: this.pinnedChannels.length + 1,
      });
    },
    removeFromItemDefault(idx, name) {
      if (this.defaultFirst == name) {
        this.isRemoveFirstOpen = true;
      } else {
        this.confirmRemoveItemDefault(idx);
      }
    },
    confirmRemoveItemDefault(idx) {
      this.isPinEdited = true;
      this.pinnedChannels.splice(idx, 1);
    },
    checkDisableButton(item) {
      let value = false;
      this.pinnedChannels.forEach((v) => {
        if (v.channelId == item.id) {
          value = true;
        }
      });
      return value;
    },
    cancelEdit() {
      this.isPinEdited = false;
      this.handleGetListChannelPinned();
    },
    actionSubmitPinnedChannel() {
      const payload = {
        menuStatic: [],
        pinnedChannels: [],
      };

      this.menuStatic.forEach((item) => {
        payload.menuStatic.push({
          id: item.id,
          isFirstOpen: this.defaultFirst == item.name ? true : false,
          sequence: item.sequence,
        });
      });
      this.pinnedChannels.forEach((item, idx) => {
        payload.pinnedChannels.push({
          channelId: item.channelId,
          isFirstOpen: this.defaultFirst == item.name ? true : false,
          sequence: idx + 1,
        });
      });

      return this.createChannelPinned(payload)
        .then((res) => {
          if (
            res.data
              ? res.data.code == "1000"
              : res.response.data.code == "1000"
          ) {
            this.alertSuccess = true;
            this.handleGetListChannelPinned();
          } else {
            this.alertFailed = true;
            this.errorMessage = res.response.data.data;
          }
          this.isPinEdited = false;
        })
        .catch((err) => {
          this.alertFailed = true;
          this.errorMessage = err;
        });
    },
  },
};
</script>

<style scoped lang="scss">
.grid-container {
  display: grid;
}
.grid-item {
  border: 1px solid gainsboro;
}
.item-1 {
  grid-column: 1;
  grid-row: 1 / span 2;
}
.item-2 {
  grid-column: 2;
  grid-row: 1;
}
.item-3 {
  grid-column: 2;
  grid-row: 2;
}
.font-12 {
  font-size: 12px !important;
}
.bg-primary-low-tint {
  background-color: $primarylowtint;
}
.cursor-grab {
  cursor: grab;
}
.cursor-grabbing {
  cursor: grabbing;
}
</style>
