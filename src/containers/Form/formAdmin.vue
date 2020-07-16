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
            id="create"
            @response="getResponse"
            typeUpload="account"
          />
        </div>
      </div>
      <v-row>
        <v-col cols="6">
          <div class="d-flex justify-space-between">
            <custom-select
              :label="$t('input.chooseAccount')"
              placeholder="Pilih jenis akun"
              v-model="data.accountType"
              :items="listRole"
              rules="required"
              :value="data.accountType"
              name="Account"
            />
            <custom-select
              label="Gender"
              background-color="whitesnow"
              v-model="data.gender"
              :items="genderType"
              rules="required"
              name="Gender"
              :value="data.gender"
            />
          </div>
          <custom-input
            label="Name"
            v-model="data.name"
            :value="data.name"
            name="Name"
            rules="required"
          />
          <custom-input
            label="Username"
            name="Username"
            :value="data.username"
            rules="required"
            v-model="data.username"
          />
          <custom-input
            label="Password"
            name="Password"
            :value="data.password"
						:rules="type === 'create' ? 'required' : ''"
            v-model="data.password"
          />
          <!-- <custom-input
            label="Confirm Password"
            name="Confirm Password"
            v-model="checkPassword"
						error-messages="cxs"
          /> -->
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
            rules="required|email"
            v-model="data.email"
          />
          <custom-input
            label="Phone"
            name="Phone"
            :value="data.mobile"
            rules="required"
            v-model="data.mobile"
          />
          <custom-textarea
            label="Note"
            v-model="data.note"
            :value="data.note"
            name="Note"
            rules="required"
          />
          <custom-button
            :loading="loading"
            color="carmine"
            class="white--text"
            type="submit"
        	>
						{{ $t('button.save') }}
					</custom-button
          >
        </v-col>
        <v-col cols="6"></v-col>
      </v-row>
    </div>
  </custom-form>
</template>

<script>
import Label from "../../components/material/Input/label";
export default {
  components: {
    Label
  },
  data() {
    return {
      checkPassword: "",
      listRole: [
        "USER",
        "SELEB",
        "MGR_SELEB",
        "ADMIN",
        "ADMIN_SOCIAL",
        "SUPERVISOR",
				"EDITOR",
				"MODERATOR"
      ],
      genderType: ["MALE", "FEMALE"],
      confirmPassword: "",
      errorPassword: ""
    };
  },
  props: {
    data: {
      type: Object
    },
    loading: {
      type: Boolean
		},
		type : {
			type : String
		}
  },
  methods: {
    getResponse(payload) {
      this.status = payload.status;
      this.data.photo = payload.response.url;
    },
    handleSubmit() {
      if (this.confirmPassword === this.data.password) {
        this.$emit("onSubmit", this.data);
        this.errorPassword = "";
      } else {
        this.errorPassword = "Check your password again";
      }
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
</style>
