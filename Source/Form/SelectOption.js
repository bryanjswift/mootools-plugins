/* extern Class, Events, Options */
if (typeof StyledForm === 'undefined') { StyledForm = {}; }

// Class to represent options of a styled select or multi-select
StyledForm.SelectOption = new Class({
	Implements: [Events,Options],
	options: {
		optionClass: 'option',
		optionTag: 'li',
		selected: false,
		selectedClass: 'selected',
		storageName: 'optionData'
	},
	element: null,
	events: {},
	option: null,
	selected: false,
	text: null,
	value: null,
	initialize: function(option,options) {
		this.setOptions(options);
		this.option = option;
		this.events = {
			deselect: this.deselect.bind(this),
			select: this.select.bind(this)
		};
		this.text = option.get('text');
		this.value = option.get('value');
		this.element = new Element(this.options.optionTag,{
			'class': (option.get('class') + ' ' + this.options.optionClass).trim(),
			'html': option.get('html'),
			'events': {
				click: this.events.select
			}
		});
		this.element.store(this.options.storageName,this);
	},
	deselect: function(e) {
		var evt = e ? new Event(e).stop() : null;
		this.fireEvent('onDeselect',this);
		this.element.removeClass(this.options.selectedClass).addEvent('click',this.events.select);
		this.selected = false;
	},
	destroy: function() {
		this.element = null;
		this.events = null;
		this.option = null;
	},
	select: function(e) {
		var evt = e ? new Event(e).stop() : null;
		this.fireEvent('onSelect',this);
		this.element.addClass(this.options.selectedClass).removeEvent('click',this.events.select);
		this.selected = true;
	}
});
