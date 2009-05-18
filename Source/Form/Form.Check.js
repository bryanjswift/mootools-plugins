/*extern Class, Event, Events, Options, Form, $, Element */
/*jslint bitwise: true, browser: true, eqeqeq: true, forin: true, immed: true, newcap: true, nomen: true, plusplus: true, regexp: true, undef: true*/

/*
Script: Form.Check.js
License: MIT-style license.
*/

if (typeof Form === 'undefined') { Form = {}; }

Form.Check = new Class({
	Implements: [Events,Options],
	options: {
		checked: false,
		disabled: false
	},
	bound: {},
	checked: false,
	config: {
		checkedClass: 'checked',
		disabledClass: 'disabled',
		elementClass: 'check',
		highlightedClass: 'highlighted',
		storage: 'Form.Check::data'
	},
	disabled: false,
	element: null,
	input: null,
	label: null,
	value: null,
	initialize: function(input,options) {
		this.setOptions(options);
		this.bound = {
			disable: this.disable.bind(this),
			enable: this.enable.bind(this),
			highlight: this.highlight.bind(this),
			removeHighlight: this.removeHighlight.bind(this),
			toggle: this.toggle.bind(this)
		};
		var bound = this.bound;
		input = this.input = $(input);
		var id = input.get('id');
		this.label = document.getElement('label[for=' + id);
		this.element = new Element('div',{
			'class': input.get('class') + ' ' + this.config.elementClass,
			id: id ? id + 'Check' : '',
			events: {
				click: bound.toggle,
				mouseenter: bound.highlight,
				mouseleave: bound.removeHighlight
			}
		});
		this.element.wraps(input);
		this.value = input.get('value');
		if (this.options.checked) { this.check(); } else { this.uncheck(); }
		if (this.options.disabled) { this.disable(); } else { this.enable(); }
		input.store(this.config.storage,this).addEvents({
			blur: bound.removeHighlight,
			focus: bound.highlight
		});
		this.fireEvent('create',this);
	},
	check: function() {
		this.element.addClass(this.config.checkedClass);
		this.input.set('checked','checked').focus();
		this.checked = true;
		this.fireEvent('check',this);
	},
	disable: function() {
		this.element.addClass(this.config.disabledClass);
		this.input.set('disabled','disabled');
		this.disabled = true;
		this.fireEvent('disable',this);
	},
	enable: function() {
		this.element.removeClass(this.config.disabledClass);
		this.input.erase('disabled');
		this.disabled = false;
		this.fireEvent('enable',this);
	},
	highlight: function() {
		this.element.addClass(this.config.highlightedClass);
		this.fireEvent('highlight',this);
	},
	removeHighlight: function() {
		this.element.removeClass(this.config.highlightedClass);
		this.fireEvent('removeHighlight',this);
	},
	toggle: function(e) {
		var evt;
		if (this.disabled) { return this; }
		if (e) { evt = new Event(e).stop(); }
		if (this.checked) {
			this.uncheck();
		} else {
			this.check();
		}
		this.fireEvent('change',this);
		return this;
	},
	uncheck: function() {
		this.element.removeClass(this.config.checkedClass);
		this.input.erase('checked');
		this.checked = false;
		this.fireEvent('uncheck',this);
	}
});
