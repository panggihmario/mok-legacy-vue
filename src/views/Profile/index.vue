<template>
  <div>
    <div class="d-flex justify-space-between">
      <div>Profile</div>
      <custom-button color="primary">Save</custom-button>
    </div>
    <v-row no-gutters>
      <v-col cols="8">
        <custom-input label="Name" />
        <custom-input label="Username" />
        <div class="d-flex justify-space-between">
          <div :style="{ width: '300px' }">
						<date-picker label="Birthday" />
            <custom-input label="Email" />
            <custom-input label="Password" />
            <custom-input label="Confirm Pasword" />
            <custom-input label="Phone" />
						<custom-upload
							id="profile"
							label="Profile Picture"
						/>
          </div>
          <div :style="{ width: '300px' }">
						<custom-select :items="gender" label="Gender"/>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
	data () {
		return {
			gender : ['male', 'female']
		}
	}
}
</script>
