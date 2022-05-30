<template>
  <div class="autocomplete">
    <div class="input-wrapper">
      <input
        v-show="helper"
        :value="itemValue"
      />
      <input
        type="text"
        class="autocomplete-input"
        @click="openList"
        v-model="search"
      />
    </div>
    <div class="autocomplete__popover" v-show="isOpen">
      <div class="options">
      <ul class="autocomplete-results" >
        <li
          class="autocomplete-result"
          v-for="(item, i) in results"
          :key="i"
          @click="setResult(item)"
          :class="{ 'is-active': item.id === itemId }"
        >
          {{ item.name }}
        </li>
      </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      require: false,
      default: () => [],
    },
    itemText : {
      type : String
    },
    value : {
      type : [Object, String]
    }
  },
  computed : {
    itemValue () {
      const getValue = this.value[this.itemText]
      this.search = getValue
      return this.value[this.itemText]
    }
  },
  watch : {
    search : function (val) {
      const query = val.toLowerCase();
      if (val === "") {
        this.results = this.items
      } else {
        const search = (text) =>
        this.items.filter((item) => item[this.itemText].toLowerCase().includes(text));
        const result = search(query);
        this.results = result
      }
    },
    value : function (val) {
      this.search = val.name
    }
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
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
      itemId : '',
      selectedItem : {},
      helper : false
    };
  },
  methods: {
    filterResults() {
      this.results = this.items.filter(
        (item) => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      );
    },
    openList() {
      this.isOpen = !this.isOpen;
      this.results = this.items
    },
    onChange() {
      this.$emit('input', this.selectedItem)
    },
    setResult(item) {
      this.search = item.name;
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

