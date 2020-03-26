<template>
  <v-navigation-drawer color="whitesnow" app floating permanent width="180">
    <div class="drawer__header">
      <div class="d-flex justify-center">
        <v-avatar size="62" color="grey">
          <span class="white--text"></span>
        </v-avatar>
      </div>
      <div class="d-flex justify-center">
        <v-chip color="white" class="mt-2">
          <span class="primary--text">{{user}}</span>
        </v-chip>
      </div>
    </div>

    <v-list nav dense>
      <div v-for="(nav, i) in navigations" :key="i">
        <v-list-item v-if="!nav.items" color="carmine" :to="nav.path">
          <v-row class="d-flex justify-start align-center">
            <v-col cols="2">
              <v-icon size="16">{{ nav.icon }}</v-icon>
            </v-col>
            <v-col cols="10">
              <div class="drawer__label">{{ nav.name }}</div>
            </v-col>
          </v-row>
        </v-list-item>

        <v-list-group v-else :value="groupValue" color="carmine" append-icon>
          <template v-slot:activator>
            <v-row class="d-flex justify-start align-center">
              <v-col cols="2">
                <v-icon size="16">{{ nav.icon }}</v-icon>
              </v-col>
              <v-col cols="10">
                <div class="drawer__label">{{ nav.name }}</div>
              </v-col>
            </v-row>
          </template>

          <v-list-item v-for="subNav in nav.items" :key="subNav.name" :to="subNav.path">
            <v-row class="d-flex justify-start align-center">
              <v-col cols="2"></v-col>
              <v-col cols="10" class="py-0">
                <div class="drawer__label">{{ subNav.name }}</div>
              </v-col>
            </v-row>
          </v-list-item>
        </v-list-group>
      </div>
    </v-list>

    <div class="drawer__button">
      <v-btn elevation="0" @click="handleLogout" color="logout">
        <v-icon size="15" class="orangered--text" left>mdi-logout</v-icon>
        <span class="orangered--text text-capitalize" style="letterSpacing : 0">Log Out</span>
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["user"])
  },
  data() {
    return {
      selected: 0,
      groupValue: false,
      navigations: [
        {
          name: "Dashboard",
          icon: "mdi-folder",
          path: "/"
        },
        {
          name: "Article",
          icon: "mdi-folder",
          path: "/article"
        },
        {
          name: "Account Manage",
          icon: "mdi-cog",
          path: "/admin",
          items: [
            {
              name: "List Account",
              path: "/admin"
            },
            {
              name: "Create Account",
              path: "/admin/create"
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleLogout() {
      this.$router.push("/auth");
      this.clear();
    },
    ...mapMutations({
      clear: "clearUser"
    })
  }
};
</script>

<style lang="sass" scoped>
.drawer
  &__label
    font-size: $font-size-root
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
