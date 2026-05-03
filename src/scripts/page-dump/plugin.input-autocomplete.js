console.log('plugin.input-autocomplite.js');

(() => {
	document.addEventListener('DOMContentLoaded', () => {
		const voltageInput = document.querySelector('[data-autocomplete]');

		document.addEventListener('select:changed', (e) => {
			const selectedValue = e.detail.value;

			if (selectedValue === '7') {
				voltageInput.value = 0.22;
			} else {
				voltageInput.value = 0.4;
			}
		});
	});
})();