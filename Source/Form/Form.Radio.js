/*extern Class, Event, Form */
/*jslint bitwise: true, browser: true, eqeqeq: true, forin: true, immed: true, newcap: true, nomen: true, plusplus: true, regexp: true, undef: true*/

/*
Script: Form.Radio.js
License: MIT-style license.
*/

if (typeof Form === 'undefined') { Form = {}; }

Form.Radio = new Class({
	Extends: Form.Check,
	config: {
		elementClass: 'radio',
		storage: 'Form.Radio::data'
	},
	initialize: function(input,options) {
		this.parent(input,options);
	},
	toggle: function(e) {
		if (this.element.hasClass('checked') || this.disabled) { return; }
		var evt;
		if (e) { evt = new Event(e).stop(); }
		if (this.checked) {
			this.uncheck();
		} else {
			this.check();
		}
		this.fireEvent(this.checked ? 'onCheck' : 'onUncheck',this);
		this.fireEvent('onChange',this);
	}
});