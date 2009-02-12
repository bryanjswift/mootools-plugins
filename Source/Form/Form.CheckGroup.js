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
		var checks = this.checks;
		var checkOptions = this.options.checkOptions;
		var checkboxes = group.getElements('input[type=checkbox]');
		checkboxes.each(function(checkbox) {
			var check = checkbox.retrieve('Form.Check::data') || new Form.Check(check,checkOptions);
			checks.push(check);
		});
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
