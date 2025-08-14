
import { Select } from '../components/select.js';
import { InputMask } from '../components/inputMask.js';
import { FormValidator } from '../components/validation.js';


document.addEventListener('DOMContentLoaded', () => {
	new InputMask();
	new FormValidator('.appointment.form');

	document.querySelectorAll('.select').forEach($select => {
		new Select($select);
	});
});
