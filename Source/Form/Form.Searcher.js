/*extern Class, Events, Options, Form, $, Element */
if (typeof Form === 'undefined') { Form = {}; }

Form.DataMatch = new Class({
	element: null,
	url: null,
	initialize: function(data) {
		this.element = new Element('li',{
			events: {
				click: this.select.bind(this),
				mouseenter: this.highlight.bind(this),
				mouseleave: this.removeHighlight.bind(this)
			},
			html: data.name
		});
		this.url = data.url;
		this.element.store('Form.Searcher::match',this);
	},
	highlight: function() {
		this.element.addClass('hover');
	},
	removeHighlight: function() {
		this.element.removeClass('hover');
	},
	select: function() {
		location.href = this.url;
	}
});
Form.DataSearcher = new Class({
	Implements:[Events,Options],
	options: {
		search: /^\w{2,}/,
	},
	bound: {},
	config: {},
	highlighted: null, // <DataMatch>
	data: [], // Array of <Data>
	initialize: function(field,results,options) {
		if (!field || !results) { return; }
		this.setOptions(options);
		this.bound = {
			filter: this.filter.bind(this),
			keypress: this.keypress.bind(this)
		};
		this.field = $(field).addEvents({
			keypress:this.bound.keypress
		});
		this.results = $(results);
		this.resultsList = this.results.getElement('ul').empty();
		this.match = new Element('li');
	},
	filter: function() {
		var value = this.field.get('value').toLowerCase();
		this.resultsList.empty();
		if (!value.match(this.options.search)) { return; }
		var results = new Elements();
		var objects = this.data;
		var i = 0;
		var objectsLength = objects.length;
		var data;
		do {
			data = objects[i];
			if (data.name.toLowerCase().indexOf(value) > -1) {
				results.push(this.processMatch(data));
			}
			i = i + 1;
		} while (i - objectsLength);
		this.resultsList.adopt(results);
		// if there are too many objects don't show the result list
		// if not over max but over scroll number setup scroller
	},
	keypress: function(e) {
		var evt = new Event(e);
		var code = evt.code;
		var key = evt.key;
		this.field.removeEvent('keyup',this.bound.filter);
		switch(code) {
			case 27: // esc
			case 37: // left
			case 38: // up
			case 39: // right
			case 40: // down
				break;
			case 9: // tab
			case 13: // enter
				evt.stop();
				break;
			case 8: // backspace
			case 32: // space
			case 46: // delete
			default: // anything else
				if (!(code >= 48 && code <= 122 && (code <= 57 || (code >= 65 && code <= 90) || code >=97) || [8,32,46].contains(code))) { break; }
				if (evt.control || evt.alt || evt.meta) { return; }
				// alphanumeric or space
				key = code === 32 ? ' ' : key;
				this.field.addEvent('keyup',this.bound.filter);
				break;
		}
	},
	processMatch: function(data) {
		var match = new Form.DataMatch(match);
		return match.element;
	}
});
