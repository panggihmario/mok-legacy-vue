<template>
	<div>
		<Editor v-if="user === 'editor'"  />
		<Publisher v-else />
	</div>
</template>

<script>
import Publisher from './Publisher'
import Editor from './Editor'
import { mapState } from 'vuex'
export default {
	components : {
		Publisher, Editor
	},
	computed : {
		...mapState([
			'user'
		])
	}
}
</script>