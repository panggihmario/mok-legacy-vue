import methods from "./actions"
export default {
	namespaced: true,
	state: {
		pathDonation: 'admin/donations'
	},
	actions: {
		...methods
	}
}