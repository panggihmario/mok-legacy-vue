<template>
  <v-navigation-drawer color="whitesnow" app floating permanent width="180">
    <div  class="drawer__header">
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
      <v-list-item-group v-model="selected">
        <v-list-item 
					v-for="(nav, i) in navigations" 
					:key="i" 
					color="carmine"
					:to="nav.path"
				>
          <v-list-item-content>
            <div class="d-flex justify-start align-center">
              <v-icon size="16">{{ nav.icon }}</v-icon>
              <div class="ml-4 drawer__label">
                {{ nav.name }}
              </div>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <div class="drawer__button">
      <v-btn elevation="0" @click="handleLogout" color="logout">
        <v-icon size="15" class="orangered--text" left>mdi-logout</v-icon>
        <span class="orangered--text text-capitalize" style="letterSpacing : 0">
          Log Out
        </span>
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
	computed : {
		...mapState([
			'user'
		])
	},
  data() {
    return {
      selected: 0,
      navigations: [
        {
          name: "Dashboard",
					icon: "mdi-folder",
					path : '/'
        },
        {
          name: "Article",
					icon: "mdi-folder",
					path : '/article'
        }
      ]
    };
	},
	methods : {
		handleLogout () {
			this.$router.push('/auth')
			this.clear()
		},
		...mapMutations({
			clear : 'clearUser'
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
