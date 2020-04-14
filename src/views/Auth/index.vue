<template>
  <div class="auth__container d-flex justify-center align-center">
    <div class="auth__form">
      <p class="d-flex justify-center black--text auth__form__title">
        Login Admin
      </p>
      <custom-form :onSubmit="onSubmit">
        <custom-input
          label="Username"
          placeholder="Input Username"
          v-model="username"
          name="Username"
          rules="required"
        />
        <custom-input
          label="Password"
          placeholder="Input Password"
          v-model="password"
          name="Password"
          rules="required"
        />
        <div class="d-flex justify-space-between align-center">
          <div class="grey--text auth__form__footer ">Lupa Password ?</div>
          <custom-button rounded size="large" type="submit" color="primary">
            Login
          </custom-button>
        </div>
      </custom-form>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      username: "administrator",
      password: "admin@123"
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    ...mapMutations({
      setUser: "setUser"
		}),
		...mapActions({
			login : 'login'
		}),
    async onSubmit() {
			const opts = {
				username: this.username,
        password: this.password
			};
			const response = await this.login(opts)
			if(response.status === 200){
      // this.$router.push('/')
				console.log(response)
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
</style>
