<template>
  <div>
    <v-card outlined width="300px" style="border-radius: 8px; overflow: hidden">
      <div style="height: 480px; overflow: auto">
        <div class="d-flex whitesnow grey--text sticky">
          <div class="col-3 font-12 font-weight-medium">Hashtag</div>
          <div class="col-4 font-12 font-weight-medium">Persentase</div>
          <div class="col-2 font-12 font-weight-medium">Qty</div>
          <div class="col-3 font-12 font-weight-medium"></div>
        </div>

        <div
          v-if="listPreviewCategory.length < 1"
          class="d-flex flex-column justify-center align-center font-12"
          style="height: 438px"
        >
          <span class="grey--text text-weight-medium"
            >Hashtag belum diatur</span
          >

          <v-tooltip v-if="loadingListMasterCategory" bottom>
            <template v-slot:activator="{ on, attrs }">
              <span
                v-bind="attrs"
                v-on="on"
                class="text-decoration-underline text-weight-medium grey--text cursor-pointer"
              >
                Gunakan Formasi Terakhir
              </span>
            </template>
            <span class="font-12">Sedang memeriksa kategori yang tersedia</span>
          </v-tooltip>

          <span
            v-else
            class="text-decoration-underline text-weight-medium secondary--text cursor-pointer"
            :class="{ 'grey--text': loadingListMasterCategory }"
            @click="actionUseLastActiveFormation"
          >
            Gunakan Formasi Terakhir
          </span>
        </div>

        <draggable
          :list="listPreviewCategory"
          :disabled="!enabled"
          class="list-group"
          ghost-class="ghost"
          @start="dragging = true"
          @end="dragging = false"
        >
          <div
            class="d-flex list-group-item cursor-grab"
            :class="{ 'cursor-grabbing': dragging }"
            v-for="(item, idx) in listPreviewCategory"
            :key="item.value"
          >
            <div class="col-3 font-12 font-weight-medium">
              {{ item.value }}
            </div>
            <div class="col-4 font-12 font-weight-medium">
              {{ item.percentage }}%
            </div>
            <div class="col-2 font-12 font-weight-medium">
              {{ item.qty }}
            </div>
            <div class="col-3 font-12 font-weight-medium">
              <div class="d-flex">
                <v-btn icon x-small @click="editPreviewCategory(item, idx)">
                  <v-icon size="12px" color="secondary">fas fa-pen</v-icon>
                </v-btn>
                <v-btn
                  icon
                  x-small
                  @click="removePreviewCategory(item, idx)"
                  class="ml-2"
                >
                  <v-icon color="red">fas fa-times</v-icon>
                </v-btn>
              </div>
            </div>
          </div>
        </draggable>
      </div>

      <div class="whitesnow pt-3 px-5 pb-4" style="height: 193px">
        <div class="d-flex justify-space-between font-12 font-weight-medium">
          <span class="grey--text">Total</span>
          <b>{{ totalPercentage }}%</b>
        </div>
        <div
          class="d-flex justify-space-between font-12 font-weight-medium mt-2"
        >
          <span class="grey--text">Tersedia</span>
          <b>{{ availablePercentage }}%</b>
        </div>

        <div class="d-flex justify-space-between mt-5">
          <v-btn
            height="38px"
            block
            class="text-capitalize success"
            @click="submitData"
            :loading="loadingSubmit"
            :disabled="
              loadingSubmit ||
                totalData < 1 ||
                availablePercentage > 5 ||
                availablePercentage < 0
            "
            >Terapkan Trending</v-btn
          >
        </div>

        <p class="carmine--text font-10 mt-3">
          Saat trending ini digunakan, maka trending sebelumnya tidak berlaku
          lagi dan akan digantikan dengan trending baru yang ada pada form ini.
        </p>
      </div>
    </v-card>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
  },
  props: {
    listLastActiveHashtag: {
      type: Object,
      default: () => {},
    },
    listPreviewCategory: {
      type: Array,
      default: () => [],
    },
    availablePercentage: {
      type: Number,
    },
    totalData: {
      type: [Number, String],
    },
    totalQtyGreater: {
      type: Number,
    },
    loadingSubmit: {
      type: Boolean,
    },
    loadingListMasterCategory: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      itemHeader: [
        {
          text: "Hashtag",
          sortable: false,
          class: "whitesnow",
          width: 80,
        },
        {
          text: "%",
          sortable: false,
          class: "whitesnow",
          width: 10,
        },
        {
          text: "Qty",
          sortable: false,
          class: "whitesnow",
          width: 10,
        },
        {
          sortable: false,
          class: "whitesnow",
        },
      ],
      totalPercentage: 0,
      enabled: true,
      dragging: false,
    };
  },
  watch: {
    listPreviewCategory() {
      if (this.listPreviewCategory.length > 0) {
        this.totalPercentage = 0;
        for (let i = 0; i < this.listPreviewCategory.length; i++) {
          const e = this.listPreviewCategory[i];
          this.totalPercentage += parseFloat(e.percentage);
        }
        this.changeAvailablePercentage();
      } else {
        this.totalPercentage = 0;
        this.changeAvailablePercentage();
      }
    },
  },
  methods: {
    changeAvailablePercentage() {
      this.$emit("changeAvailablePercentage", this.totalPercentage);
    },
    editPreviewCategory(i, idx) {
      this.$emit("editPreviewCategory", i, idx);
    },
    removePreviewCategory(i, idx) {
      this.$emit("removePreviewCategory", i, idx);
    },
    actionUseLastActiveFormation() {
      if (!this.loadingListMasterCategory) {
        this.$emit("actionUseLastActiveFormation");
      }
    },
    // actionDragPreviewStart(e, item, idx) {
    //   console.log(e.layerY, idx, item);
    // },
    // actionDragPreviewEnd(e) {
    //   console.log(e.layerY);
    // },
    submitData() {
      this.$emit("submitData");
    },
  },
};
</script>

<style lang="scss" scoped>
.font-10 {
  font-size: 10px;
}
.sticky {
  top: 0;
  position: -webkit-sticky;
  position: sticky;
  z-index: 10;
}
.list-group-item:hover {
  background-color: $secondarylowtint;
}
.ghost {
  opacity: 1;
  background: $primary;
}
.cursor-pointer {
  cursor: pointer;
}
.cursor-grab {
  cursor: grab;
}
.cursor-grabbing {
  cursor: grabbing;
}
</style>
