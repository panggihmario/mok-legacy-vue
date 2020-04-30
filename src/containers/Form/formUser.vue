<template>
  <custom-form :onSubmit="handleSubmit">
    <div class="mt-8">
      <div class="d-flex align-center">
        <v-avatar size="100" color="grey" class="mr-4">
          <img v-if="data.photo" :src="data.photo" />
        </v-avatar>
        <div class="d-flex flex-column">
          <span
            class="account-edit__subtitle font-weight-medium charcoal--text mb-3"
            >Unggah foto profil</span
          >
          <custom-upload
            typeUpload="account"
            id="create"
            @response="getResponse"
          />
        </div>
      </div>

      <v-row>
        <v-col cols="6">
          <custom-input
            label="Name"
            background-color="whitesnow"
            v-model="data.name"
            :value="data.name"
            rules="required"
            name="Name"
          />
          <custom-select
            label="Gender"
            name="Gender"
            :items="genderType"
            v-model="data.gender"
            :value="data.gender"
            rules="required"
          />
          <custom-input
            label="Username"
            name="Username"
            :value="data.username"
            v-model="data.username"
            rules="required"
          />
          <custom-input
            label="Password"
            name="Password"
            :value="data.password"
            v-model="data.password"
            :rules="type === 'create' ? 'required' : ''"
          />
          <!-- <custom-input
            label="Confirm Password"
            background-color="whitesnow"
            confirmPassword
          ></custom-input> -->
					<Label>Confirm Password</Label>
          <v-text-field
            solo
            flat
            class="field"
						v-model="confirmPassword"
            background-color="whitesnow"
						:error-messages="errorPassword"
          />
          <custom-input
            label="Email"
            name="Email"
            :value="data.email"
            v-model="data.email"
            rules="required|email"
          />
          <custom-input
            label="Phone"
            name="Phone"
            :value="data.mobile"
            v-model="data.mobile"
            rules="required"
          />

          <div class="verified-box my-10 pa-6 font-weight-medium whitesnow">
            <p>Verified Account</p>
            <span>
              Akun ini sudah memenuhi
              <span class="dodgerblue--text">Syarat & Ketentuan</span> untuk
              dirubah statusnya menjadi Verified Account
            </span>
            <div
              class="verified-box d-flex align-center justify-space-between mt-6 pa-2 white"
            >
              <span class="dodgerblue--text"
                >Change this account to Verified Account</span
              >
              <v-checkbox
                v-model="data.isVerified"
                hide-details
                class="pa-0 ma-0"
              ></v-checkbox>
            </div>
          </div>

          <custom-button
            :loading="loading"
            color="carmine"
            class="white--text"
            type="submit"
            >Save</custom-button
          >
        </v-col>
        <v-col cols="6"></v-col>
      </v-row>
    </div>
  </custom-form>
</template>

<script>
import Label from '../../components/material/Input/label'
export default {
	components : {
		Label
	},
  data() {
    return {
      genderType: ["MALE", "FEMALE"],
			confirmPassword: "",
			errorPassword : '',
    };
  },
  props: {
    loading: {
      type: Boolean
    },
    data: {
      type: Object
    },
    type: {
      type: String
    }
  },
  methods: {
    handleSubmit() {
			if(this.confirmPassword === this.data.password){
				this.$emit("onSubmit", this.data);
				this.errorPassword = ''
			}else{
				this.errorPassword = 'Check your password again'
			}
    },
    getResponse(payload) {
      this.status = payload.status;
      this.data.photo = payload.response.url;
    }
  }
};
</script>

<style lang="sass" scoped>
.account-edit
  &__title
    font-size: $font-size-24
  &__subtitle
    font-size: $font-size-12
.verified-box
  border-radius: 4px
  p
    font-size: $font-size-18
    line-height: 18px
  span
    font-size: $font-size-12
    line-height: 18px
</style>
