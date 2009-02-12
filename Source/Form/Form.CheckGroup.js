/*extern Class, Events, Options, StyledForm, $, Element */
if (typeof StyledForm === 'undefined') { StyledForm = {}; }

StyledForm.CheckGroup = new Class({
	Implements: [Events,Options],
	options: {
		checkOptions: {}
	},
	checks: [],
	initialize: function(group,options) {
		if (!StyledForm.Check) { throw 'required Class StyledForm.Check not found'; }
		this.setOptions(options);
		group = $(group);
		var checks = this.checks;
		var checkOptions = this.options.checkOptions;
		var checkboxes = group.getElements('input[type=checkbox]');
		checkboxes.each(function(checkbox) {
			var check = checkbox.retrieve('StyledForm.Check::data') || new StyledForm.Check(check,checkOptions);
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
