<template>
  <div>
    <HeaderContent label="Default Channel Home" :list="crumbs" :items="items">
      <div class="d-flex" style="gap: 8px">
        <custom-button>Batal</custom-button>
        <custom-button
          color="primary"
          class="white--text"
          @click="actionSubmitPinnedChannel"
          >Simpan</custom-button
        >
      </div>
    </HeaderContent>

    <section>
      <v-row no-gutters>
        <v-col cols="6" class="pr-2">
          <div style="border: 1px solid gainsboro">
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
            <v-simple-table height="600px">
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
                <tbody>
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
              </template>
            </v-simple-table>
          </div>
        </v-col>

        <v-col cols="6" style="border: 1px solid gainsboro">
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
          <section
            class="d-flex align-center whitesnow font-12"
            style="height: 48px; border-bottom: 1px solid gainsboro !important"
          >
            <div class="d-flex align-center" style="width: 52px; padding: 8px">
              Urutan
            </div>
            <div class="d-flex align-center" style="width: 59px; padding: 8px">
              Gambar
            </div>
            <div
              class="d-flex align-center"
              style="width: 113.5px; padding: 8px"
            >
              Nama Channel
            </div>
            <div
              class="d-flex align-center"
              style="width: 113.5px; padding: 8px"
            >
              Dibuat Oleh
            </div>
            <div class="d-flex align-center" style="width: 104px; padding: 8px">
              Sensitif Channel
            </div>
            <div class="d-flex align-center" style="width: 106px; padding: 8px">
              Pertama Dibuka
            </div>
            <div
              class="d-flex align-center"
              style="width: 60px; padding: 8px"
            ></div>
          </section>

          <section
            v-for="(item, idx) in menuStatic"
            :key="item.name"
            class="d-flex align-center font-12"
            style="border-bottom: 1px solid gainsboro"
          >
            <div style="width: 52px; padding: 8px">{{ idx + 1 }}</div>
            <div
              class="d-flex justify-center align-center"
              style="width: 59px; padding: 8px"
            >
              <img :src="item.icon" height="31px" alt="" />
            </div>
            <div style="width: 113.5px; padding: 8px">{{ item.name }}</div>
            <div style="width: 113.5px; padding: 8px">
              {{ item.createBy }}
            </div>
            <div style="width: 104px; padding: 8px"></div>
            <div
              class="font-12 d-flex justify-center align-center"
              style="width: 106px; padding: 8px"
            >
              <v-radio-group
                v-model="defaultFirst"
                dense
                hide-details
                style="margin-top: 0px !important; padding-top: 0px !important"
              >
                <v-radio :key="idx" :value="idx"></v-radio>
              </v-radio-group>
            </div>
            <div
              class="d-flex justify-end align-center"
              style="width: 60px; padding: 8px"
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
              <div style="width: 52px; padding: 8px">
                {{ idx + 1 + menuStatic.length }}
              </div>
              <div
                class="d-flex justify-center align-center"
                style="width: 59px; padding: 8px"
              >
                <img :src="item.icon" height="31px" alt="" />
              </div>
              <div style="width: 113.5px; padding: 8px">{{ item.name }}</div>
              <div style="width: 113.5px; padding: 8px">
                {{ item.createBy }}
              </div>
              <div style="width: 104px; padding: 8px"></div>
              <div
                class="font-12 d-flex justify-center align-center"
                style="width: 106px; padding: 8px"
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
                  <v-radio
                    :key="idx"
                    :value="idx + menuStatic.length"
                  ></v-radio>
                </v-radio-group>
              </div>
              <div
                class="d-flex justify-end align-center"
                style="width: 60px; padding: 8px"
              >
                <div class="d-flex justify-space-between" style="width: 50px">
                  <v-btn x-small icon @click="removeFromItemDefault(idx)">
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
        </v-col>
      </v-row>
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
      isLoadingListChannel: false,
      page: 1,
      totalPages: 1,
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
      this.defaultFirst = 0;
    },
    payloadSearch() {
      this.page = 1;
      if (this.payloadSearch == "") {
        this.itemsShowed = [];
        this.handleGetListChannel();
      } else {
        this.itemsShowed = [];
        this.handleSearchListChannel();
      }
    },
    // menuStatic() {
    //   this.menuStatic.forEach((item, idx) => {
    //     if (item.isFirstOpen) {
    //       this.defaultFirst = 0;
    //     }
    //   });
    // },
    // pinnedChannels() {
    //   this.pinnedChannels.forEach((item, idx) => {
    //     if (item.isFirstOpen) {
    //       this.defaultFirst = 0;
    //     }
    //   });
    // },
    defaultFirst(nVal, oVal) {
      if (nVal >= this.menuStatic.length) {
        let n = nVal - this.menuStatic.length;
        this.pinnedChannels[n].isFirstOpen = true;
      } else {
        this.menuStatic[nVal].isFirstOpen = true;
      }
      if (oVal != null && oVal >= this.menuStatic.length) {
        let n = oVal - this.menuStatic.length;
        this.pinnedChannels[n]
          ? (this.pinnedChannels[n].isFirstOpen = false)
          : null;
      } else {
        this.menuStatic[oVal]
          ? (this.menuStatic[oVal].isFirstOpen = false)
          : null;
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
      } else {
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
      } else {
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
        res.menuStatic.forEach((item, idx) => {
          if (item.isFirstOpen) {
            this.defaultFirst = idx;
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
        res.pinnedChannels.forEach((item, idx) => {
          if (item.isFirstOpen) {
            this.defaultFirst = idx + res.menuStatic.length;
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
    removeFromItemDefault(idx) {
      this.pinnedChannels.splice(idx - this.menuStatic.length, 1);
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
    actionSubmitPinnedChannel() {
      const payload = {
        menuStatic: [],
        pinnedChannels: [],
      };

      this.menuStatic.forEach((item) => {
        payload.menuStatic.push({
          id: item.id,
          isFirstOpen: item.isFirstOpen,
          sequence: item.sequence,
        });
      });
      this.pinnedChannels.forEach((item, idx) => {
        payload.pinnedChannels.push({
          channelId: item.channelId,
          isFirstOpen: item.isFirstOpen,
          sequence: idx + 1,
        });
      });

      return this.createChannelPinned(payload)
        .then((res) => {
          if (res.data.code == "1000") {
          }
          this.handleGetListChannelPinned();
        })
        .catch((err) => {
          console.log({ err });
        });
    },
  },
};
</script>

<style scoped lang="scss">
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
