/*extern Class, Events, Options, Form, $, Element */
if (typeof Form === 'undefined') { Form = {}; }

Form.RadioGroup = new Class({
	Implements: [Events,Options],
	options: {
		radioOptions: {},
		initialValues: {}
	},
	bound: {},
	checks: [],
	initialize: function(group,options) {
		if (!Form.Radio) { throw 'required Class Form.Radio not found'; }
		this.setOptions(options);
		this.bound = { select: this.select.bind(this) };
		group = $(group);
		if (!group) { return this; }
		var checks = this.checks;
		var radioOptions = this.options.radioOptions;
		var radios = group.getElements('input[type=radio]');
		radios.each(this.addCheck,this);
	},
	addCheck: function(radio) {
		var initialValues = this.options.initialValues[radio.get('name')];
		var radioOptions = {};
		radioOptions.checked = initialValues ? initialValues.contains(radio.get('value')) : radio.get('checked');
		radioOptions.disabled = radio.get('disabled');
		var check = radio.retrieve('Form.Radio::data') || new Form.Radio(radio,$extend(radioOptions,this.options.radioOptions));
		check.addEvent('onCheck',this.bound.select);
		radio.store('Form.RadioGroup::data',this);
		this.checks.push(check);
	},
	disable: function() {
		var radios = this.checks;
		radios.each(function(radio) {
			radio.disable();
		});
	},
	enable: function() {
		var radios = this.checks;
		radios.each(function(radio) {
			radio.enable();
		});
	},
	select: function(checkedRadio) {
		var radios = this.checks;
		radios.each(function(radio) {
			if (radio.checked && radio.input.get('value') != checkedRadio.input.get('value')) { radio.uncheck(); }
		});
	}
});
