import { createStore } from 'vuex';

import coachesModule from '@/store/modules/coaches/index.js';
import requestsModule from '@/store/modules/requests/index.js';

export default createStore({
	modules: {
		coaches: coachesModule,
		requests: requestsModule,
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
