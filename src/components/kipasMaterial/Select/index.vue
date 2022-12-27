<template>
  <v-menu
    transition="slide-y-transition"
    bottom
  >
    <template v-slot:activator="{on, attrs}">
      <div @click="openOptions" class="select__wrapper">
        <input
          readonly  
          class="select__input"
          v-bind="attrs"
          v-on="on"
          v-model="selectedItem"
        />
        <v-icon 
          size="16px"
          color="charcoal"
        >
          fa-solod fa-caret-down
        </v-icon>
      </div>
    </template>
    <v-list dense>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click="selectItem(item)"
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.label"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>


<script>
export default {
  props : {
    items : {
      type : Array
    },
    item : {},
    value : {
      type : Object
    }
  },
  data () {
    return {
      show : false,
      selectedItem : null,
    }
  },
  methods : {
    openOptions () {
      this.show = !this.show
    },
    selectItem(item) {
      console.log(item)
      this.$emit('select', item)

    }
  }
}
</script>

<style lang="scss">
.select {
  &__option {
    font-size: 11px;
    font-weight: 400;
    color: $charcoal;
  }
  &__options {
    position: absolute;
    display: inline-block;
    min-height: 40px;
    z-index: 8;
    transition: all 0.4s;
    left: 0;
    right: 0;
    max-width: 100%;
    background-color: white;
    border: 1px solid #DDDDDD;
    border-radius: 8px;

    padding: 10px;
    top: 35px;
    overflow-y: auto;
    overflow-x: hidden;
    box-shadow: 0 5px 5px -3px rgb(0 0 0 / 20%), 0 8px 10px 1px rgb(0 0 0 / 14%), 0 3px 14px 2px rgb(0 0 0 / 12%);
    border-radius: 4px;
  }
  &__wrapper {
    height: 32px;
    background: #FFFFFF;
    border: 0.6px solid #BBBBBB;
    border-radius: 4px;
    cursor: pointer;
    display: grid;
    grid-template-columns: 1fr max-content;
    padding: 0 10px;
    position: relative;
  }
  &__input {
    font-size: 11px;
    font-weight: 400;
    color: $charcoal;
    cursor: pointer;
    &:focus {
      outline: none;
    }
  }
}
</style>