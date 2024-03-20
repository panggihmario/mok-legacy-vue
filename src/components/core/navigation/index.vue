<template>
  
  <aside @mouseover="onHover" @mouseleave="onLeave"  id="aside" >
    <div class="navigation__relative">
    <div class="navigation__profile">
      <div class="navigation__photo"></div>
      <div class="navigation__box-name">
        <div class="navigation__username text-center"> {{ profile.username }} </div>
        <div class="navigation__role text-center"> {{ profile.role }} </div>
      </div>
    </div>
    <nav>
      <ul>
        <li v-for="(menu, idx) in menus" :key="idx">
          <div @click="openItems(menu.label)"  class="navigation__list pointer">
            <i :class="menu.icon"></i>
            <div class="flex justify-between">
              <div> {{menu.label}} </div>
              <i className="fa-solid fa-chevron-down"></i>
            </div>
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
    <div class="navigation__logout">
      <k-button size="sm" color="whitesnow" @click="logout">
        <i class="fa-solid fa-right-from-bracket"></i>
      </k-button>
    </div>
  </div>
  </aside>
</template>

<script lang="ts">
import { reactive } from "vue";
import menuModel from "./menuModel";
import { item } from "./menuModel"
import { useRouter } from "vue-router";
import { useAuthStore } from "../../../stores/authentication";
export default {
  setup() {
    const router = useRouter()
    const store = useAuthStore()
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

    const onHover = function () {
      const el = document.getElementById('aside')
      el?.classList.add('aside-active')
    }

    const onLeave = function () {
      const el = document.getElementById('aside')
      el?.classList.remove('aside-active')
      menus.forEach(menu => {
          menu.isOpen = false
      })
    }

    const logout = function () {
      store.removeAuthData()
    }

    return {
      menus,
      openItems,
      logout,
      store,
      profile : JSON.parse(localStorage.getItem('profile')!),
      onHover,
      onLeave
    }
  }
}
</script>

<style src="./style.scss" lang="scss" scoped>


</style>