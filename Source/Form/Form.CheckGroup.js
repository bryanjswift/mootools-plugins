/*extern Class, Events, Options, Form, $, Element */
if (typeof Form === 'undefined') { Form = {}; }

Form.CheckGroup = new Class({
	Implements: [Events,Options],
	options: {
		checkOptions: {},
		initialValues: {}
	},
	checks: [],
	initialize: function(group,options) {
		if (!Form.Check) { throw 'required Class Form.Check not found'; }
		this.setOptions(options);
		group = $(group);
		if (!group) { return this; }
		var checks = this.checks;
		var checkOptions = this.options.checkOptions;
		var checkboxes = group.getElements('input[type=checkbox]');
		checkboxes.each(this.addCheck,this);
	},
	addCheck: function(checkbox) {
		var initialValues = this.options.initialValues[checkbox.get('name')];
		var checkOptions = {};
		checkOptions.checked = initialValues ? initialValues.contains(checkbox.get('value')) : checkbox.get('checked');
		checkOptions.disabled = checkbox.get('disabled');
		checkbox.store('Form.CheckGroup::data',this);
		var check = checkbox.retrieve('Form.Check::data') || new Form.Check(checkbox,$extend(checkOptions,this.options.checkOptions));
		this.checks.push(check);
	},
	checkAll: function() {
		var checks = this.checks;
		checks.each(function(check) {
			if (!check.checked) { check.toggle(); }
		});
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
	uncheckAll: function() {
		var checks = this.checks;
		checks.each(function(check) {
			if (check.checked) { check.toggle(); }
		});
	}
});
