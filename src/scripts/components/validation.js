import validate from 'validate.js';

export class FormValidator {
	constructor(formSelector) {
		this.form = document.querySelector(formSelector);
		if (!this.form) return;

		this.nameInput = this.form.querySelector('input[name="name"]');
		this.phoneInput = this.form.querySelector('input[name="phone"]');
		this.checkbox = this.form.querySelector('input[name="policy"]');
		this.submitBtn = this.form.querySelector('button[type="submit"]');

		this.constraints = {
			name: {
				presence: { allowEmpty: false }
			},
			phone: {
				presence: true,
				length: {
					is: 11,

				}
			},
			policy: {
				inclusion: {
					within: [true],
				}
			}
		};

		this.#init();
	}

	#init() {
		this.submitBtn.disabled = true;

		[this.nameInput, this.phoneInput, this.checkbox].forEach(el => {
			el.addEventListener('input', () => this.#validateForm());
			el.addEventListener('change', () => this.#validateForm());
		});
	}

	#validateForm() {

		const formValues = {
			name: this.nameInput.value.trim(),
			phone: this.phoneInput.value.replace(/\D/g, ''),
			policy: this.checkbox.checked
		};

		const errors = validate(formValues, this.constraints) || {};

		this.nameInput.classList.toggle('error', !!errors.name);
		this.phoneInput.classList.toggle('error', !!errors.phone);


		this.submitBtn.disabled = Object.keys(errors).length > 0;
	}
}
