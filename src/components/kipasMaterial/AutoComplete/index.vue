<template>
  <ValidationProvider v-slot="{ errors }" :name="name" :rules="rules">
    <div class="autocomplete" :class="`select-${idElement}`">
      <label class="autocomplete__label"> {{ label }} </label>
      <div class="input-wrapper">
        <div v-show="helper">{{ itemValue }}</div>

        <input type="text" class="autocomplete-input" @click="openList" v-model="search" v-bind="$attrs" />
      </div>
      <div class="auto__error-message" v-if="errors.length > 0">
        {{ errorMessage }}
      </div>
      <div class="autocomplete__popover" :class="isTop ? 'isTop' : 'isBottom'" v-show="isOpen">
        <v-list dense>
          <v-list-item-group  v-for="(item, i) in results" :key="i">
            <v-list-item @click="setResult(item)">
              <v-list-item-content>
                <v-list-item-title>
                  {{ item[itemText] }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
    </div>
  </ValidationProvider>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      require: false,
      default: () => [],
    },
    itemText: {
      type: String
    },
    value: {
      type: [Object, String]
    },
    pos: {
      type: String
    },
    label: {
      type: String
    },
    rules: {
      type: String
    },
    name: {
      type: String
    },
    errorMessage: {
      type: String
    }
  },
  computed: {
    itemValue() {
      if (this.value) {
        const getValue = this.value[this.itemText]
        this.search = getValue
        return this.value[this.itemText]
      }
    }
  },
  watch: {
    search: function (val) {
      if (val) {
        const query = val.toLowerCase();
        if (val === "") {
          this.results = this.items
        } else {
          const search = (text) =>
            this.items.filter((item) => item[this.itemText].toLowerCase().includes(text));
          const result = search(query);
          this.results = result
        }
      } else {
        this.results = this.items
      }

    },
    value: function (val) {
      this.search = val.name
    }
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
    this.checkPosition()
  },
  beforeMount() {
    this.idElement = this._uid
  },
  destroyed() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  data() {
    return {
      search: "",
      results: [],
      isOpen: false,
      arrowCounter: -1,
      itemId: '',
      selectedItem: {},
      helper: false,
      idElement: '',
      isTop: false
    };
  },
  methods: {
    checkPosition() {
      const heightView = window.innerHeight
      const centerView = heightView / 2
      const el = document.querySelector(`.select-${this.idElement}`)
      const positionElement = el.offsetTop
      if (positionElement > centerView) {
        this.isTop = true
      } else {
        this.isTop = false
      }
    },
    filterResults() {
      this.results = this.items.filter(
        (item) => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      );
    },
    openList() {
      this.isOpen = !this.isOpen;
      this.results = this.items
    },
    setResult(item) {
      this.search = item[this.itemText];
      this.itemId = item.id
      this.isOpen = false;
      this.selectedItem = item
      this.$emit('input', item)
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
        this.arrowCounter = -1;
      }
    },
  },
};
</script>

<style src="./style.scss" lang="scss" scoped>

</style>

