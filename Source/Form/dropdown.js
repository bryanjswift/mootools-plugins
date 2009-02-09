/*extern Class, Events, Options, Event, Element, StyledForm */
if (typeof StyledForm === 'undefined') { StyledForm = {}; }

StyledForm.Dropdown = new Class({
	Implements: [Events,Options],
	options: {
		initialValue: null,
		mouseLeaveDelay: 350
	},
	events: {},
	input: null,
	open: false,
	value: null,
	selected: null,
	selection: null,
	initialize: function(select,options) {
		this.setOptions(options);
		select = $(select);
		this.events = {
			focus: this.focus.bind(this),
			blur: this.blur.bind(this)
		};
		var optionsList = this.initializeCreateElements();
		var selectOptions = select.getElements('option');
		selectOptions.each(function(opt) {
			var option = new StyledForm.SelectOption(opt);
			var selected = option.get('selected');
			if (option.value === this.options.initialValue || selected) { this.select(option); }
			optionsList.adopt(option.element);
		},this);
		if (!this.selected) { this.selected = selectOptions.getFirst().retrieve('optionData'); }
		this.fireEvent('onSelect',this.selected);
	},
	initializeCreateElements: function(select) {
		var id = select.get('id');
		var dropdown = new Element('div',{
			'class': (select.get('class') + ' dropdown').trim(),
			'id': (id && id !== '') ? id + 'Dropdown' : ''
		});
		var menu = new Element('div',{'class': 'menu'});
		var list = new Element('div',{'class': 'list'});
		var options = new Element('ul',{'class': 'options'});
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
		return options;
	},
	blur: function(e) { },
	collapse: function() { },
	expand: function() { },
	focus: function() { },
	mouseenterDropdown: function() { $clear(this.collapseInterval); },
	mouseleaveDropdown: function() { this.collapseInterval = this.collapse.delay(this.options.mouseLeaveDelay,this); },
	select: function(option) {
		this.input.set('value',option.value);
		this.selection.set('html',option.element.get('html'));
		this.value = option.value;
		this.selected = option;
	}
});
