<template>
	<li>
		<h3>{{ fullName }}</h3>
		<h4>${{ rate }}/hour</h4>
		<div>
			<base-badge
				v-for="area in areas"
				:key="area"
				:type="area"
				:title="area"
				>{{ area }}</base-badge
			>
		</div>
		<div class="actions">
			<base-button mode="outline" link :to="coachContactLink"
				>Contact</base-button
			>
			<base-button link :to="coachDetailsLink">View Details</base-button>
		</div>
	</li>
</template>

<script>
export default {
	props: {
		id: {
			type: Number,
		},
		firstName: {
			type: String,
		},
		lastName: {
			type: String,
		},
		rate: {
			type: Number,
		},
		areas: {
			type: Object,
		},
	},
	computed: {
		fullName() {
			return this.firstName + ' ' + this.lastName;
		},
		coachContactLink() {
			return this.$route.path + '/' + this.id + '/contact';
		},
		coachDetailsLink() {
			return this.$route.path + '/' + this.id;
		},
	},
};
</script>

<style scoped>
li {
	margin: 1rem 0;
	border: 1px solid #424242;
	border-radius: 12px;
	padding: 1rem;
}

li:last-child {
	margin-bottom: 0;
}

h3 {
	font-size: 1.5rem;
}

h3,
h4 {
	margin: 0.5rem 0;
}

div {
	margin: 0.5rem 0;
}

.actions {
	display: flex;
	justify-content: flex-end;
}
</style>
