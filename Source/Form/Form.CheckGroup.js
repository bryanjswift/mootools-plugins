/*extern Class, Events, Options, Form, $, Element */
if (typeof Form === 'undefined') { Form = {}; }

Form.CheckGroup = new Class({
	Implements: [Events,Options],
	options: {
		checkOptions: {}
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
		checkboxes.each(function(checkbox) {
			var check = checkbox.retrieve('Form.Check::data') || new Form.Check(checkbox,checkOptions);
			checks.push(check);
			checkbox.store('Form.CheckGroup::data',this);
		},this);
	},
	addCheck: function(checkbox) {
		var check = checkbox.retrieve('Form.Check::data') || new Form.Check(checkbox,this.options.checkOptions);
		checkbox.store('Form.CheckGroup::data',this);
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