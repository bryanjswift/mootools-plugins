/*extern Class, Events, Options, Form, $, Element */
if (typeof Form === 'undefined') { Form = {}; }

Form.RadioGroup = new Class({
	Implements: [Events,Options],
	options: {
		checkOptions: {},
		initialValues: {}
	},
	bound: {},
	checks: [],
	initialize: function(group,options) {
		if (!Form.Check) { throw 'required Class Form.Check not found'; }
		this.setOptions(options);
		this.bound = { select: this.select.bind(this) };
		group = $(group);
		if (!group) { return this; }
		var checks = this.checks;
		var checkOptions = this.options.checkOptions;
		var radios = group.getElements('input[type=radio]');
		radios.each(this.addCheck,this);
	},
	addCheck: function(radio) {
		var initialValues = this.options.initialValues[radio.get('name')];
		var checkOptions = {};
		checkOptions.checked = initialValues ? initialValues.contains(radio.get('value')) : radio.get('checked');
		checkOptions.disabled = radio.get('disabled');
		var check = radio.retrieve('Form.Check::data') || new Form.Check(radio,$extend(checkOptions,this.options.checkOptions));
		check.addEvent('onCheck',this.bound.select);
		radio.store('Form.RadioGroup::data',this);
		this.checks.push(check);
	},
	disable: function() {
		var checks = this.checks;
		checks.each(function(check) {
			check.disable();
		});
	},
	enable: function() {
		var checks = this.checks;
		checks.each(function(check) {
			check.enable();
		});
	},
	select: function(radio) {
		var checks = this.checks;
		checks.each(function(check) {
			if (check.checked && check.input.get('value') != radio.input.get('value')) { check.toggle(); }
		});
	}
});
