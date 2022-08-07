import { createStore } from 'vuex';

import coachesModule from '@/store/modules/coaches/index.js';

export default createStore({
	modules: {
		coaches: coachesModule,
	},
});
