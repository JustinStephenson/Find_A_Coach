import { dbUrl } from '@/util/constants';

export default {
	async registerCoach(context, payload) {
		const userId = context.rootGetters.userId;
		const coachData = {
			firstName: payload.first,
			lastName: payload.last,
			description: payload.desc,
			hourlyRate: payload.rate,
			areas: payload.areas,
		};

		const response = await fetch(`${dbUrl}/coaches/${userId}.json`, {
			method: 'PUT',
			body: JSON.stringify(coachData),
		});

		const responseData = await response.json();
		if (!response.ok) {
			const error = new Error(responseData.message || 'Failed to fetch!');
			throw error;
		}

		context.commit('registerCoach', {
			...coachData,
			id: userId,
		});
	},

	async loadCoaches(context, payload) {
		if (!payload.forceRefresh && !context.getters.shouldUpdate) {
			return;
		}

		const response = await fetch(`${dbUrl}/coaches.json`);

		const responseData = await response.json();
		if (!response.ok) {
			const error = new Error(responseData.message || 'Failed to fetch!');
			throw error;
		}

		const coaches = [];
		for (const key in responseData) {
			coaches.push({
				id: key,
				firstName: responseData[key].firstName,
				lastName: responseData[key].lastName,
				description: responseData[key].description,
				hourlyRate: responseData[key].hourlyRate,
				areas: responseData[key].areas,
			});
		}

		context.commit('setCoaches', coaches);
		context.commit('setFetchTimestamp');
	},
};
