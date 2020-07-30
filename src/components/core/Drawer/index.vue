<template>
  <v-navigation-drawer color="whitesnow" app floating permanent  width="230" >
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
			<br/>
			<div :style="{width : '100%'}" class="d-flex justify-center" >1.0.1-rc1</div>
    </div>
    <v-list  nav dense>
      <v-list-group
        v-for="(item, i) in items"
        :key="i"
				color="carmine"
				:to="item.path"
      >
        <template v-slot:activator>
          <v-list-item-content  >
						<div class="d-flex align-center">
						<v-icon size="20">{{item.action }}</v-icon>
            <div class="drawer__label ml-3"> {{ item.title }} </div>
						</div>
          </v-list-item-content>
        </template>
				<div
					v-for="(sub, i) in item.items" 
					:key="i"
				>
        <v-list-item   
					:to="sub.path" 
					:disabled="checkRole(sub.role)"
				>
          <v-list-item-content disabled >
						<div class="drawer__label drawer__sub ml-3"> {{ sub.title }} </div>
          </v-list-item-content>
        </v-list-item>
				</div>
      </v-list-group>
    </v-list>
    <div class="drawer__button">
      <v-btn elevation="0" @click="handleLogout" color="logout">
        <v-icon size="15" class="orangered--text" left>mdi-logout</v-icon>
        <span class="orangered--text text-capitalize" style="letterSpacing : 0"> {{ $t('auth.logout') }} </span>
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import listNavigation from './items'
export default {
  computed: {
    ...mapState({
			user : state => state.authentication.user
		})
  },
  data() {
    return {
      selected: 0,
			items: listNavigation,
			roleUser : ''
    };
	},
	mounted () {
		const role = localStorage.getItem('persada_role')
		this.roleUser = role
	},
  methods: {
    handleLogout() {
      this.$router.push("/auth");
			this.logout()
    },
		...mapActions({
			logout : 'authentication/logout'
		}),
		getToken(){
			const token = localStorage.getItem('persada_token')
		},
		checkRole(roles) {
			const status = roles.filter(r => {
				if(r === this.roleUser) {
					return r
				}
			})
			if(status[0] === this.roleUser) {
				return false
			}else{
				return true
			}
		}
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
