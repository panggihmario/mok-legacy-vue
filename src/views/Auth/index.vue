<template>
  <div class="auth__container d-flex justify-center align-center">
    <div class="auth__form">
      <p class="d-flex justify-center black--text auth__form__title">
				{{$t('auth.title')}}
      </p>
			{{user}}
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
					type="password"
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
			alertSuccess : false
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
    async onSubmit() {
			this.loading = true
			const opts = {
				username: this.username,
        password: this.password
			};
			const response = await this.login(opts)
			if(response.status === 200){
				this.alertSuccess = true
				this.loading = false
				setTimeout(() => {
					this.$router.push('/')
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
