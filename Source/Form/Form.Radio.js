/*extern Class, Form */
if (typeof Form === 'undefined') { Form = {}; }

Form.Radio = new Class({
	Extends: Form.Check,
	config: {
		elementClass: 'radio',
		storage: 'Form.Radio::data'
	},
	initialize: function(input,options) {
		this.parent(input,options);
	}
});