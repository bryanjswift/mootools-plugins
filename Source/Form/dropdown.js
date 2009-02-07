/*extern Class, Events, Options, Event, Element, StyledForm */
if (typeof StyledForm === 'undefined') { StyledForm = {}; }

StyledForm.Dropdown = new Class({
	Implements: [Events,Options],
	options: {
		mouseLeaveDelay: 350
	},
	initialize: function(select,options) {
		this.setOptions(options);
		select = $(select);
	},
	expand: function() { },
	collapse: function() { },
	mouseenterDropdown: function() { $clear(this.collapseInterval); },
	mouseleaveDropdown: function() { this.collapseInterval = this.collapse.delay(this.options.mouseLeaveDelay,this); }
});
