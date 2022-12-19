<template>
  <aside>
    <div class="navigation__profile">
      <div class="navigation__photo"></div>
      <div class="navigation__username text-center">Administrator</div>
      <div class="navigation__role text-center"> Admin </div>
    </div>
    <nav>
      <ul>
        <li v-for="(menu, idx) in menus" :key="idx">
          <div @click="openItems(menu.label)"  class="navigation__list pointer">
            <i :class="menu.icon"></i>
            <div> {{menu.label}} </div>
            <i className="fa-solid fa-chevron-down"></i>
          </div>

          <ul :class="menu.isOpen ? 'navigation__items-open' : 'navigation__items' ">
            <li v-for="(item, i) in menu.items" :key="i">
              <router-link :to="{name : item.name}" activeClass="navigation__item-active"  class="navigation__item" >
                <i :class="menu.icon" class="hidden"></i>
                <div>{{ item.label }}</div>
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>

  </aside>
</template>

<script lang="ts">
import { reactive } from "vue";
import menuModel from "./menuModel";
import { item } from "./menuModel"
export default {
  setup() {
    const menus: item[] = reactive(menuModel)
    const openItems = function (label : string) {
      menus.forEach(menu => {
        if(menu.label === label) {
          menu.isOpen = !menu.isOpen
        }else{
          menu.isOpen = false
        }
      })
    }

    return {
      menus,
      openItems
    }
  }
}
</script>

<style src="./style.scss" lang="scss" scoped>


</style>