/*extern Class, Events, Options, Event, Element, Form */
if (typeof Form === 'undefined') { Form = {}; }

Form.Dropdown = new Class({
	Implements: [Events,Options],
	options: {
		excludedValues: [],
		initialValue: null,
		mouseLeaveDelay: 350,
		selectOptions: {},
		typeDelay: 500
	},
	bound: {},
	dropdownOptions: [],
	element: null,
	highlighted: null,
	input: null,
	open: true,
	selected: null,
	selection: null,
	typed: {lastKey: null, value: null, timer: null, pressed: null, shortlist: [], startkey: null},
	value: null,
	initialize: function(select,options) {
		this.setOptions(options);
		select = $(select);
		this.bound = {
			blur: this.blur.bind(this),
			collapse: this.collapse.bind(this),
			expand: this.expand.bind(this),
			focus: this.focus.bind(this),
			highlightOption: this.highlightOption.bind(this),
			keydown: this.keydown.bind(this),
			keypress: this.keypress.bind(this),
			mouseenterDropdown: this.mouseenterDropdown.bind(this),
			mouseleaveDropdown: this.mouseleaveDropdown.bind(this),
			mousemove: this.mousemove.bind(this),
			removeHighlightOption: this.removeHighlightOption.bind(this),
			select: this.select.bind(this),
			toggle: this.toggle.bind(this)
		};
		this.value = this.options.initialValue;
		var dropdownOptions = this.dropdownOptions;
		var selectOptions = this.options.selectOptions;
		var optionsList = this.initializeCreateElements(select);
		var optionElements = select.getElements('option');
		optionElements.each(function(opt) {
			var option = new Form.SelectOption(opt,selectOptions);
			option.addEvents({
				'onHighlight':this.bound.highlightOption,
				'onRemoveHighlight':this.bound.removeHighlightOption,
				'onSelect':this.bound.select
			});
			if (option.value === this.options.initialValue) { this.select(option); }
			dropdownOptions.push(option);
			optionsList.adopt(option.element);
		},this);
		if (!this.selected) { optionElements[0].retrieve('Form.SelectOption::data').select(); }
		this.element.replaces(select);
		document.addEvent('click', this.bound.collapse);
		var eventName = Browser.Engine.trident || Browser.Engine.webkit ? 'keydown' : 'keypress';
		var target = Browser.Engine.trident ? $(document.body) : window;
		target.addEvent('keydown',this.bound.keydown).addEvent(eventName,this.bound.keypress);
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
		dropdown.adopt(menu.adopt(list.adopt(options)));
		var dropdownSelection = new Element('div',{
			'class': 'selection',
			events: {click: this.bound.toggle}
		});
		var dropdownBackground = new Element('div',{'class': 'dropdownBackground'});
		var selection = new Element('span',{'class': 'selectionDisplay'});
		var input = new Element('input',{
			type:'text',
			id: id,
			name: select.get('name'),
			events: {
				focus: this.bound.focus,
				blur: this.bound.blur
			}
		});
		dropdownSelection.adopt(dropdownBackground,selection,input);
		dropdown.adopt(dropdownSelection);
		this.element = dropdown;
		this.selection = selection;
		this.input = input;
		return options;
	},
	blur: function(e) { },
	collapse: function() {
		if (!this.open) { return; }
		this.toggle();
	},
	deselect: function(option) {
		option.deselect();
	},
	destroy: function() {
		this.element = null;
		this.selection = null;
		this.input = null;
	},
	disable: function() {
		this.collapse();
		this.input.set('disabled','disabled').removeEvents({blur:this.bound.blur,focus:this.bound.focus});
		this.selection.getParent().removeEvent('click',this.bound.toggle);
		this.fireEvent('onDisable',this);
	},
	enable: function() {
		this.input.erase('disabled').addEvents({blur:this.bound.blur,focus:this.bound.focus});
		this.selection.getParent().addEvent('click',this.bound.toggle);
		this.fireEvent('onEnable',this);
	},
	expand: function() {
		if (this.open) { return; }
		this.toggle();
	},
	focus: function(e) { this.expand(); },
	foundMatch: function() {
		var typed = this.typed;
		var shortlist = typed.shortlist;
		var value = typed.value;
		var i = 0;
		var optionsLength = shortlist.length;
		var excludedValues = this.options.excludedValues;
		var found = false;
		var option;
		do {
			option = shortlist[i];
			if (option.text.toLowerCase().indexOf(value) === 0 && !excludedValues.contains(option.value)) {
				found = true;
				this.keyboardHighlight(option);
				typed.pressed = i + 1;
				i = optionsLength;
			}
			i = i + 1;
		} while(i < optionsLength);
		return found;
	},
	highlightOption: function(option) {
		if (this.highlighted) { this.highlighted.removeHighlight(); }
		this.highlighted = option;
	},
	keyboardHighlight: function(option) {
		option.highlight();
		this.fireEvent('onKeyboardHighlight',option);
	},
	keydown: function(e) {
		if (!this.open) { return; }
		this.dropdownOptions.each(function(option) { option.disable(); });
		document.addEvent('mousemove',this.bound.mousemove);
	},
	keypress: function(e) {
		if (!this.open) { return; }
		var evt = new Event(e);
		var current = this.highlighted.element;
		var previous, next;
		var code = evt.code;
		var key = evt.key;
		var typed = this.typed;
		var i, options, option, optionsLength, found, first, excludedValues, shortlist;
		switch(code) {
			case 38: // up
			case 37: // left
				evt.stop();
				previous = current.getPrevious();
				if (!previous) {
					previous = current.getParent().getLast();
				}
				if (typed.pressed > 0) { typed.pressed = typed.pressed - 1; }
				this.keyboardHighlight(previous.retrieve('Form.SelectOption::data'));
				break;
			case 40: // down
			case 39: // right
				evt.stop();
				next = current.getNext();
				if (!next) {
					next = current.getParent().getFirst();
				}
				if (typed.shortlist.length > 0) { typed.pressed = typed.pressed + 1; }
				this.keyboardHighlight(next.retrieve('Form.SelectOption::data'));
				break;
			case 13: // enter
				evt.stop();
			case 9: // tab - skips the stop event but clicks the item
				current.retrieve('Form.SelectOption::data').select();
				break;
			case 27: // esc
				evt.stop();
				this.toggle();
				break;
			case 32: // space
			default: // anything else
				if (!(code >= 48 && code <= 122 && (code <= 57 || (code >= 65 && code <= 90) || code >=97) || code === 32)) { break; }
				if (evt.control || evt.alt || evt.meta) { return; }
				// alphanumeric or space
				key = code === 32 ? ' ' : key;
				$clear(typed.timer);
				options = this.dropdownOptions;
				optionsLength = options.length;
				excludedValues = this.options.excludedValues;
				if (typed.timer === null) { // timer is expired
					typed.shortlist = [];
					if (key === typed.lastKey || key === typed.startkey) { // get next
						typed.pressed = typed.pressed + 1;
						typed.value = key;
					} else { // get first
						typed = this.resetTyped();
						typed.value = key;
						typed.startkey = key;
						typed.pressed = 1;
					}
					typed.timer = this.resetTyped.delay(500,this);
				} else {
					if (key === typed.lastKey) { // check for match, if no match get next
						typed.value = typed.value + key;
						if (this.foundMatch()) { // got a match so break
							typed.timer = this.resetTyped.delay(500,this);
							break;
						} else { // no match fall through
							typed.shortlist = [];
							typed.value = key;
							typed.pressed = typed.pressed + 1;
							typed.timer = null;
						}
					} else { // reset timer, get first match, set pressed to found position
						typed.timer = this.resetTyped.delay(500,this);
						typed.value = typed.value + key;
						typed.startkey = typed.value.substring(0,1);
						typed.lastKey = key;
						this.foundMatch();
						break;
					}
				}
				typed.lastKey = key;
				shortlist = typed.shortlist;
				i = 0;
				found = 0;
				do {
					option = options[i];
					if (option.text.toLowerCase().indexOf(key) === 0 && !excludedValues.contains(option.value)) {
						if (found === 0) { first = option; }
						found = found + 1;
						if (found === typed.pressed) { this.keyboardHighlight(option); }
						shortlist.push(option);
					}
					i = i + 1;
				} while(i < optionsLength);
				if (typed.pressed > found) {
					this.keyboardHighlight(first);
					typed.pressed = 1;
				}
				break;
		}
	},
	mouseenterDropdown: function() { $clear(this.collapseInterval); },
	mouseleaveDropdown: function() { this.collapseInterval = this.options.mouseLeaveDelay ? this.collapse.delay(this.options.mouseLeaveDelay,this) : null; },
	mousemove: function() {
		this.dropdownOptions.each(function(option) { option.enable(); });
		document.removeEvent('mousemove',this.bound.mousemove);
	},
	removeHighlightOption: function(option) {
		this.highlighted = null;
	},
	resetTyped: function() {
		var typed = this.typed;
		typed.value = null;
		typed.timer = null;
		return typed;
	},
	select: function(option,e) {
		this.dropdownOptions.each(this.deselect);
		this.selection.set('html',option.element.get('html'));
		var oldValue = this.value;
		this.value = option.value;
		this.input.set('value',option.value);
		this.selected = option;
		this.fireEvent('onSelect',[option]);
		if (oldValue !== this.value) { this.fireEvent('onChange',[this]); }
		this.collapse();
	},
	toggle: function(e) {
		var evt = e ? new Event(e).stop() : null;
		$clear(this.collapseInterval);
		this.fireEvent(this.open ? 'onClose' : 'onOpen',this);
		this.open = !this.open;
		var events = {mouseenter:this.bound.mouseenterDropdown, mouseleave:this.bound.mouseleaveDropdown};
		if (this.open) { // opening
			this.element.addClass('active').addClass('dropdown-active');
			this.selected.highlight();
			this.element.addEvents(events);
			this.input.focus();
			this.fireEvent('onExpand',this);
		} else { // closing
			this.element.removeClass('active').removeClass('dropdown-active');
			this.selected.removeHighlight();
			this.element.removeEvents(events);
			this.fireEvent('onCollapse',this);
		}
	}
});
