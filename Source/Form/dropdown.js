/*extern Class, Events, Options, Event, Element, StyledForm */
if (typeof StyledForm === 'undefined') { StyledForm = {}; }

StyledForm.Dropdown = new Class({
	Implements: [Events,Options],
	options: {
		mouseLeaveDelay: 350
	},
	events: {},
	input: null,
	selection: null,
	initialize: function(select,options) {
		this.setOptions(options);
		select = $(select);
		this.events = {
			focus: this.focus.bind(this),
			blur: this.blur.bind(this)
		};
		this.initializeCreateElements();
	},
	initializeCreateElements: function(select) {
		var id = select.get('id');
		var dropdown = new Element('div',{
			'class': (select.get('class') + ' dropdown').trim(),
			'id': (id && id !== '') ? id + 'Dropdown' : ''
		});
		var menu = new Element('div',{'class': 'menu'});
		var list = new Element('div',{'class': 'list'});
		var options = new Element('div',{'class': 'options'});
		dropdown.adopt(menu.adopt(list.adopt(options))); // dropdown adopts menu ; menu adopts list ; list adopts options
		var dropdownSelection = new Element('div',{'class': 'selection'});
		var dropdownBackground = new Element('div',{'class': 'dropdownBackground'});
		var selection = this.selection = new Element('span',{'class': 'selection'});
		var input = this.input = new Element('input',{
			type:'text',
			id: id,
			name: select.get('name'),
			events: {
				focus: this.events.focus,
				blur: this.events.blur
			}
		});
		dropdownSelection.adopt(dropdownBackground,selection,input);
		dropdown.adopt(dropdownSelection);
	},
	blur: function(e) { },
	collapse: function() { },
	expand: function() { },
	focus: function() { },
	mouseenterDropdown: function() { $clear(this.collapseInterval); },
	mouseleaveDropdown: function() { this.collapseInterval = this.collapse.delay(this.options.mouseLeaveDelay,this); }
});
