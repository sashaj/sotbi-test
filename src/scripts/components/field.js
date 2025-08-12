export class Field {
	constructor(options = {}) {
		this.options = {
			classNames: {
				root: 'field',
				focus: 'field_focus',
				touched: 'field_touched',
				error: 'field_error',
				success: 'field_success',
				disabled: 'field_disabled',
				readonly: 'field_readonly',
				required: 'field_required',
			},
		}

		if (typeof options === 'object') {
			this.options = { ...this.options, ...options }
		}

		this.$fields = null

		this.#setListeners()
		this.update()
	}

	#setListeners() {
		document.addEventListener(
			'focus',
			e => {
				const $el = e.target

				if (!$el.matches(`.${this.options.classNames.root} input`)) return

				$el.closest(`.${this.options.classNames.root}`).classList.add(this.options.classNames.focus)
			},
			true,
		)

		document.addEventListener(
			'blur',
			e => {
				const $el = e.target

				if (!$el.matches(`.${this.options.classNames.root} input`)) return

				if ($el.value === '') {
					$el
						.closest(`.${this.options.classNames.root}`)
						.classList.remove(
							this.options.classNames.touched,
							this.options.classNames.error,
							this.options.classNames.success,
						)
				}

				$el.closest(`.${this.options.classNames.root}`).classList.remove(this.options.classNames.focus)
			},
			true,
		)

		document.addEventListener(
			'input',
			e => {
				const $el = e.target

				if (!$el.matches(`.${this.options.classNames.root} input`)) return

				$el.closest(`.${this.options.classNames.root}`).classList.add(this.options.classNames.touched)
				$el
					.closest(`.${this.options.classNames.root}`)
					.classList.remove(this.options.classNames.error, this.options.classNames.success)
			},
			true,
		)
	}

	update() {
		this.$fields = document.querySelectorAll(`.${this.options.classNames.root} input`)

		if (this.$fields.length) {
			for (const $el of this.$fields) {
				const $field = $el.closest(`.${this.options.classNames.root}`)
				const classNames = []

				classNames.push(`${this.options.classNames.root}--${$el.type}`)

				if ($el.value !== '') classNames.push(this.options.classNames.touched)
				if ($el.disabled) classNames.push(this.options.classNames.disabled)
				if ($el.readonly) classNames.push(this.options.classNames.readonly)
				if ($el.required) classNames.push(this.options.classNames.required)

				$field.classList.add(...classNames)
			}
		}
	}
}
