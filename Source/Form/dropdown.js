/*extern Class, Events, Options, Event, Element, StyledForm */
if (typeof StyledForm === 'undefined') { StyledForm = {}; }

StyledForm.Dropdown = new Class({
	Implements: [Events,Options],
	initialize: function(select,options) {
		this.setOptions(options);
		select = $(select);
	}
});
