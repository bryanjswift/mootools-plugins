/*extern Class, Events, Options, Form, $, Element */
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
		highlightedClass: 'highlighted'
	},
	disabled: false,
	element: null,
	input: null,
	label: null,
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
		this.label = document.getElement('label[for=' + input.get('id'));
		this.element = new Element('div',{
			'class': input.get('class') + ' check',
			id: input.get('id') + 'Check',
			events: {
				click: bound.toggle,
				mouseenter: bound.highlight,
				mouseleave: bound.removeHighlight
			}
		});
		this.element.wraps(input);
		if (this.options.checked || input.get('checked')) { this.toggle(); }
		if (this.options.disabled || input.get('disabled')) { this.disable(); }
		input.store('Form.Check::data',this).addEvents({
			blur: bound.removeHighlight,
			focus: bound.highlight
		});
		this.fireEvent('onCreate',this);
	},
	disable: function() {
		this.element.addClass(this.config.disabledClass);
		this.input.set('disabled','disabled');
		this.disabled = true;
		this.fireEvent('onDisable',this);
	},
	enable: function() {
		this.element.removeClass(this.config.disabledClass);
		this.input.erase('disabled');
		this.disabled = false;
		this.fireEvent('onEnable',this);
	},
	highlight: function() {
		this.element.addClass(this.config.highlightedClass);
		this.fireEvent('onHighlight',this);
	},
	removeHighlight: function() {
		this.element.removeClass(this.config.highlightedClass);
		this.fireEvent('onRemoveHighlight',this);
	},
	toggle: function(e) {
		var evt;
		if (this.disabled) { return; }
		if (e) { evt = new Event(e).stop(); }
		if (this.checked) {
			this.element.removeClass(this.config.checkedClass);
			this.input.erase('checked');
			this.checked = false;
		} else {
			this.element.addClass(this.config.checkedClass);
			this.input.set('checked','checked').focus();
			this.checked = true;
		}
		this.fireEvent(this.checked ? 'onCheck' : 'onUncheck',this);
		this.fireEvent('onChange',this);
	}
});
