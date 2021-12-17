<template>
  <div class="auth__container d-flex justify-center align-center">
    <div class="auth__form">
      <p class="d-flex justify-center black--text auth__form__title">
				{{$t('auth.title')}}
      </p>
      <custom-form :onSubmit="onSubmit">
        <custom-input
          :label="$t('auth.username')"
          placeholder="Input Username"
          v-model="username"
          name="Username"
          rules="required"
        />
        <custom-input
          :label="$t('auth.password')"
          placeholder="Input Password"
          v-model="password"
          name="Password"
          rules="required"
					 @click:append="show1 = !show1"
					:type="show1 ? 'text' : 'password'"
					:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        />
        <div class="d-flex justify-space-between align-center">
          <div class="grey--text auth__form__footer "> {{ $t('auth.forgotPassword') }} </div>
          <custom-button 
						rounded 
						size="large" 
						type="submit" 
						color="primary"
						:loading="loading"
					>
            {{$t('auth.login')}}
          </custom-button>
        </div>
      </custom-form>
    </div>
		<v-alert class="auth__alert" :value="alertError"  type="error">
			{{ $t('auth.failed') }}
    </v-alert>
		<v-alert class="auth__alert" :value="alertSuccess"  type="success">
			{{ $t('auth.success') }}
    </v-alert>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      username: "",
			password: "",
			loading : false,
			alertError: false,
			alertSuccess : false,
			show1 : false
    };
  },
  computed: {
    ...mapState({
			user : state => state.authentication.user
		})
  },
  methods: {
    ...mapMutations({
      setUser: "setUser"
		}),
		...mapActions({
			login : 'authentication/login'
		}),
		checkRole(role) {
			if(role === 'ROLE_SELEB') {
				this.$router.push({
					name : 'draft',
					params : {
						page : 1
					}
				})
			}else{
				this.$router.push("/")
			}
		},
    async onSubmit() {
			this.loading = true
			const opts = {
				username: this.username,
        password: this.password
			};
			const response = await this.login(opts)
			const role = response.data.role
			if(response.status === 200){
				this.alertSuccess = true
				this.loading = false
				setTimeout(() => {
					this.checkRole(role)
					this.alertSuccess = false
				},500)
			}else{
				this.alertError = true
				this.loading = false
				setTimeout(() => {
					this.alertError = false
				}, 3000)
			}
    }
  }
};
</script>

<style lang="sass" scoped>
.auth
	&__container
		height: 100vh
	&__form
		width: 300px
		&__title
			font-size: 16px
			font-weight: 500
		&__footer
			font-size: 12px
	&__alert
		position: absolute
		top: 20px
		right: 20px
</style>
