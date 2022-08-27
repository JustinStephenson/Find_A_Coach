<template>
	<form @submit.prevent="submitForm">
		<div class="form-control" :class="{ invalid: !formData.firstName.isValid }">
			<label for="firstName">First Name</label>
			<input
				type="text"
				id="firstName"
				v-model.trim="formData.firstName.val"
				@blur="clearValidity('firstName')"
			/>
		</div>
		<p v-if="!formData.firstName.isValid">First Name must not be empty.</p>
		<div class="form-control" :class="{ invalid: !formData.lastName.isValid }">
			<label for="lastName">Last Name</label>
			<input
				type="text"
				id="lastName"
				v-model.trim="formData.lastName.val"
				@blur="clearValidity('lastName')"
			/>
		</div>
		<p v-if="!formData.lastName.isValid">Last Name must not be empty.</p>
		<div
			class="form-control"
			:class="{ invalid: !formData.description.isValid }"
		>
			<label for="description">Description</label>
			<textarea
				type="text"
				rows="5"
				v-model.trim="formData.description.val"
				@blur="clearValidity('description')"
			/>
		</div>
		<p v-if="!formData.description.isValid">
			Description Name must not be empty.
		</p>
		<div class="form-control" :class="{ invalid: !formData.rate.isValid }">
			<label for="rate">Hourly Rate</label>
			<input
				type="number"
				id="rate"
				v-model.number="formData.rate.val"
				@blur="clearValidity('rate')"
			/>
		</div>
		<p v-if="!formData.rate.isValid">Rate must be greater than 0.</p>
		<div class="form-control" :class="{ invalid: !formData.areas.isValid }">
			<h3>Areas of Expertise</h3>
			<div>
				<input
					type="checkbox"
					id="frontend"
					value="frontend"
					v-model="formData.areas.val"
					@blur="clearValidity('areas')"
				/>
				<label for="frontend">Frontend Development</label>
			</div>
			<div>
				<input
					type="checkbox"
					id="backend"
					value="backend"
					v-model="formData.areas.val"
				/>
				<label for="backend">Backend Development</label>
			</div>
			<div>
				<input
					type="checkbox"
					id="career"
					value="career"
					v-model="formData.areas.val"
				/>
				<label for="career">Career Advisory</label>
			</div>
			<p v-if="!formData.areas.isValid">
				At least one expertise must be selected.
			</p>
		</div>
		<p v-if="!formIsValid">Please fix the above errors and submit again.</p>
		<base-button>Register</base-button>
	</form>
</template>

<script>
export default {
	emits: ['save-data'],
	data() {
		return {
			formData: {
				firstName: {
					val: '',
					type: String,
					isValid: true,
				},
				lastName: {
					val: '',
					type: String,
					isValid: true,
				},
				description: {
					val: '',
					type: String,
					isValid: true,
				},
				rate: {
					val: null,
					type: Number,
					isValid: true,
				},
				areas: {
					val: [],
					type: Array,
					isValid: true,
				},
			},
			formIsValid: true,
		};
	},
	methods: {
		clearValidity(input) {
			this.formData[input].isValid = true;
		},
		validateForm() {
			this.formIsValid = true;
			for (const key in this.formData) {
				const data = this.formData[key];
				if (data.type === String) {
					if (data.val === '') {
						data.isValid = false;
						this.formIsValid = false;
					}
				} else if (data.type === Number) {
					if (data.val && data.val < 0) {
						data.isValid = false;
						this.formIsValid = false;
					}
				} else if (data.type === Array) {
					if (data.val.length === 0) {
						data.isValid = false;
						this.formIsValid = false;
					}
				}
			}
		},
		submitForm() {
			this.validateForm();

			if (!this.formIsValid) {
				return;
			}

			const formData = {
				first: this.formData.firstName.val,
				last: this.formData.lastName.val,
				desc: this.formData.description.val,
				rate: this.formData.rate.val,
				areas: this.formData.areas.val,
			};

			this.$emit('save-data', formData);
		},
	},
};
</script>

<style scoped>
.form-control {
	margin: 0.5rem 0;
}

label {
	font-weight: bold;
	display: block;
	margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
	font-weight: normal;
	display: inline;
	margin: 0 0 0 0.5rem;
}

input,
textarea {
	display: block;
	width: 100%;
	border: 1px solid #ccc;
	font: inherit;
}

input:focus,
textarea:focus {
	background-color: #f0e6fd;
	outline: none;
	border-color: #3d008d;
}

input[type='checkbox'] {
	display: inline;
	width: auto;
	border: none;
}

input[type='checkbox']:focus {
	outline: #3d008d solid 1px;
}

h3 {
	margin: 0.5rem 0;
	font-size: 1rem;
}

.invalid label {
	color: red;
}

.invalid input,
.invalid textarea {
	border: 1px solid red;
}
</style>
