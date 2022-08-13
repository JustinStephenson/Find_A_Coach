import { createStore } from 'vuex';

import coachesModule from '@/store/modules/coaches/index.js';

export default createStore({
	modules: {
		coaches: coachesModule,
	},
	state() {
		return {
			userId: 'c3', // change later
		};
	},
	getters: {
		userId(state) {
			return state.userId;
		},
	},
});
