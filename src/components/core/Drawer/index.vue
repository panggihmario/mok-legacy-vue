<template>
  <v-navigation-drawer
    class="drawer__container"
    color="white"
    app
    floating
    permanent
    width="230"
  >
    <div class="drawer__header">
      <div class="d-flex justify-center">
        <v-avatar size="62" color="grey">
          <span class="white--text"></span>
        </v-avatar>
      </div>
      <div class="d-flex justify-center">
        <v-chip color="white" class="mt-2" to="/profile">
          <span class="primary--text">{{ user }}</span>
        </v-chip>
      </div>
      <br />
      <div :style="{ width: '100%' }" class="d-flex justify-center">
        {{ appVersion }}
      </div>
    </div>

    <v-list nav dense>
      <v-list-group
        v-for="(item, i) in items"
        :key="i"
        color="primary"
        :to="item.path"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <div class="d-flex align-center" >
              <div style="width : 20px">
                <v-icon  small>{{ item.action }}</v-icon>
              </div>
              
              <div class="drawer__label ml-3">{{ item.title }}</div>
            </div>
          </v-list-item-content>
        </template>

        <div v-for="(sub, i) in item.items" :key="i">
          <v-list-item
            v-if="!sub.items"
            :to="sub.path"
            :disabled="checkRole(sub.role)"
          >
            <v-list-item-content disabled>
              <div class="drawer__label drawer__sub ml-3">
                {{ sub.title }}
              </div>
            </v-list-item-content>
          </v-list-item>

          <v-list-group v-else color="primary" class="ml-3" sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <div class="d-flex align-center">
                  <div class="drawer__label">{{ sub.title }}</div>
                </div>
              </v-list-item-content>
            </template>

            <div v-for="(subItem, i) in sub.items" :key="i">
              <v-list-item :to="subItem.path">
                <v-list-item-content disabled>
                  <div class="drawer__label drawer__sub ml-1">
                    {{ subItem.title }}
                  </div>
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-list-group>
        </div>
      </v-list-group>
    </v-list>

    <div class="drawer__button">
      <v-btn elevation="0" @click="handleLogout" color="white">
        <v-icon size="15" class="error--text" left>mdi-logout</v-icon>
        <span class="error--text text-capitalize" style="letterspacing: 0">
          {{ $t("auth.logout") }}
        </span>
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import listNavigation from "./items";

export default {
  computed: {
    ...mapState({
      user: (state) => state.authentication.user,
      accountId: (state) => state.authentication.accountId,
    }),
    appVersion() {
      return this.$store.getters.appVersion;
    },
  },
  data() {
    return {
      selected: 0,
      items: listNavigation,
      roleUser: "",
    };
  },
  mounted() {
    const data = localStorage.getItem("adminKoanba");
    const parseString = JSON.parse(data);
    this.roleUser = parseString.role;
  },
  methods: {
    handleLogout() {
      this.logout();
      this.$router.push("/auth");
    },
    ...mapActions({
      logout: "authentication/logout",
    }),
    checkRole(roles) {
      const status = roles.filter((r) => {
        if (r === this.roleUser) {
          return r;
        }
      });
      if (status[0] === this.roleUser) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.drawer
  &__label
    font-size: $font-size-root
  &__sub
    padding-left: 20px
  &__header
    margin-top: 24px
    margin-bottom: 40px
  &__button
    position: absolute
    bottom: 0
    bottom: 24px
    display: flex
    justify-content: center
    width: 100%
</style>
<style lang="scss" scoped>
.drawer {
  &__container {
    box-shadow: 2px 0px 6px rgba(0, 0, 0, 0.04);
  }
}
</style>
