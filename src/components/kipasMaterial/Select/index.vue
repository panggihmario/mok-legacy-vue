<template>
  <v-menu transition="slide-y-transition" bottom :disabled="disabled">
    <template v-slot:activator="{ on, attrs }">
      <ValidationProvider v-slot="{ errors }" :name="name" :rules="rules">
        <div class="select__container">
          <Label v-if="title"  :title="title"></Label>
          <div 
            :class="[
              'select__wrapper',
              {'select__error' : errors.length > 0}
            ]" 
            v-bind="attrs" 
            v-on="on"
          >
            <input :placeholder="placeholder" readonly class="select__input text-primary" v-model="value[itemLabel]" />
            <v-icon size="16px" color="charcoal">
              fa-solod fa-caret-down
            </v-icon>
          </div>
          <div class="select__error-message" v-if="errors.length > 0">
            {{ errorMessage }}
          </div>
        </div>
       
      </ValidationProvider>

    </template>
    <v-card class="mx-auto" max-width="600">
      <v-virtual-scroll :items="items" @scroll.native="scrolling" :item-height="50" min-height="100" :height="height">
        <template v-slot:default="{ item }">
          <v-list dense>
            <v-list-item-group color="primary">
              <v-list-item @click="selectItem(item)">
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item[itemLabel] }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </template>
      </v-virtual-scroll>
    </v-card>
  </v-menu>
</template>

<script>
import Label from "../Label"
export default {
  components: {
    Label
  },

  props: {
    items: {
      type: Array
    },
    height: {
      type: String,
      default: '150',
    },
    title: {
      type: String
    },
    item: {},
    itemLabel: {
      type: String,
      default: 'label'
    },
    value: {
      type: [Object, String]
    },
    disabled: {
      type: Boolean
    },
    placeholder : {
      type : String
    },
    name : {
      type : String
    },
    rules : {
      type : String
    },
    errorMessage : {
      type : String
    }
  },
  computed: {
  },
  data() {
    return {
      show: false,
      loading : false
    }
  },
  methods: {
    scrolling(event) {
      const element = event.currentTarget || event.target
      if (element && element.scrollHeight - element.scrollTop === element.clientHeight) {
        this.loading = true
          this.$emit('scroll-end')
      }else{
        this.loading = false
      }
    },
    openOptions() {
      this.show = !this.show
    },
    selectItem(item) {
      this.$emit('input', item)
    }
  }
}
</script>

<style lang="scss">
.select {
  &__container {
    display: grid;
    gap: 8px;
  }
  &__option {
    font-size: 11px;
    font-weight: 400;
    color: $charcoal;
  }
  &__error {
    border: 1px solid $warning !important;
  }
  &__error-message {
    color: $warning;
    font-size: 12px;
    font-weight: 400;
    transition: 0.5s ease-in-out;
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
    border: 1px solid #BBBBBB;
    border-radius: 4px;
    cursor: pointer;
    display: grid;
    grid-template-columns: 1fr max-content;
    padding: 0 10px;
    position: relative;
  }

  &__input {
    font-size: 12px;
    font-weight: 400;
    color: $black;
    width: 100%;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }
}
</style>