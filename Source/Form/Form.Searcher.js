/*extern Browser, Class, Elements, Event, Events, Options, Form, $, Element */
/*jslint bitwise: true, browser: true, eqeqeq: true, forin: true, immed: true, newcap: true, nomen: true, plusplus: true, regexp: true, undef: true*/

/*
Script: Form.Searcher.js
License: MIT-style license.
*/

if (typeof Form === 'undefined') { Form = {}; }

Form.Searcher = new Class({
	Implements:[Events,Options],
	options: {
		matchOptions: {},
		scrollCount: false,
		search: /^\w{2,}/
	},
	bound: {},
	config: {},
	data: [], // Array of <Data>
	field: null, // <Element> input field
	highlighted: null, // <Form.Searcher.Match>
	matches: [], // Array of <Form.Searcher.Match>
	results: null, // <Element> results wrapper
	resultsList: null, // <Element> where matching results get added as li's
	initialize: function(field,results,options) {
		if (!field || !results) { return; }
		this.setOptions(options);
		this.bound = {
			addMouseEvents: this.addRemoveMouseEvents.pass([true],this),
			blur: this.blur.bind(this),
			filter: this.filter.bind(this),
			focus: this.focus.bind(this),
			keypress: this.keypress.bind(this),
			quit: this.quit.bind(this)
		};
		this.field = $(field).addEvents({blur:this.bound.blur, click:this.stopEvent, focus:this.bound.focus});
		this.field.addEvent((Browser.Engine.gecko || Browser.Engine.presto) ? 'keypress' : 'keydown', this.bound.keypress);
		this.results = $(results).addEvents({click:this.stopEvent});
		this.resultsList = this.results.getElement('ul').empty();
		document.addEvent('click',this.bound.quit);
	},
	addRemoveMouseEvents: function(add) {
		document[add ? 'removeEvent' : 'addEvent']('mousemove',this.bound.addMouseEvents);
		var func = add ? 'addEvent' : 'removeEvents';
		if (add) { this.matches.each(function(match) { match.element[func]('mouseenter',this.matchHighlight.bindWithEvent(this,[match.element])); },this); }
		else { this.matches.each(function(match) { match.element[func]('mouseenter'); }); }
	},
	blur: function(e) { this.fireEvent('blur',this); },
	// gets added as keyup event on alphanumeric keypress
	filter: function() {
		this.fireEvent('filterStart',this);
		this.lastSearch = this.field.get('value');
		var value = this.lastSearch.toLowerCase();
		this.reset();
		var matches = this.matches;
		if (!value.match(this.options.search)) { return this.fireEvent('noMatch',this); }
		var options = this.options.matchOptions;
		var results = new Elements();
		var objects = this.data;
		var i = 0;
		var objectsLength = objects.length;
		var data, match;
		do {
			data = objects[i];
			if (data.name.toLowerCase().indexOf(value) > -1) {
				match = this.processMatch(data,options);
				matches.push(match);
				results.push(match.element);
			}
			i = i + 1;
		} while (i - objectsLength);
		this.resultsList.adopt(results);
		this.fireEvent('filterComplete',this);
		// if there is a scroll count provided check and see if the lenght is over it
		if (typeof this.options.scrollCount !== 'boolean') {
			if (matches.length > this.options.scrollCount) { this.fireEvent('scrollable',this); }
			else { this.fireEvent('notScrollable',this); }
		}
	},
	focus: function(e) { this.fireEvent('focus',this); },
	keypress: function(e) {
		var evt = new Event(e);
		var code = evt.code;
		var key = evt.key;
		var highlighted = this.highlighted;
		this.addRemoveMouseEvents(false);
		var match;
		this.field.removeEvent('keyup',this.bound.filter);
		switch(code) {
			case 27: // esc
				this.quit();
				break;
			case 9: // tab
				if (!this.matches.length) { break; }
				evt.stop();
			case 39: // right
			case 40: // down
				if (!highlighted) { match = this.resultsList.getFirst(); }
				else { match = highlighted.element.getNext(); }
				this.matchHighlight(e, match);
				break;
			case 37: // left
			case 38: // up
				if (!highlighted) { match = this.resultsList.getLast(); }
				else { match = highlighted.element.getPrevious(); }
				this.matchHighlight(e, match);
				break;
			case 13: // enter
				evt.stop();
				if (highlighted) { highlighted.select(this); }
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
	matchHighlight: function(e,match) {
		if (this.highlighted) { this.highlighted.removeHighlight(e); }
		if (match) { match = match.retrieve('Form.Searcher::match').highlight(e); }
		this.highlighted = match;
	},
	processMatch: function(data,options) {
		var match = new Form.Searcher.Match(data,options);
		match.element.addEvents({
			mouseenter:this.matchHighlight.bindWithEvent(this,[match.element]),click:match.select.pass([this],match)});
		return match;
	},
	quit: function(e) {
		if (this.lastSearch) { this.field.set('value',this.lastSearch); }
		if (this.highlighted) { this.highlighted.removeHighlight(e); }
		this.highlighted = null;
		this.fireEvent('quit',this);
	},
	reset: function() {
		this.highlighted = null;
		this.resultsList.empty();
		this.matches.each(function(match) { match.destroy(); });
		this.matches.empty();
		this.fireEvent('reset',this);
	},
	stopEvent: function(e) {
		if (!e) { return; }
		var evt = new Event(e);
		evt.stop();
	}
});
Form.Searcher.Match = new Class({
	Implements:[Events,Options],
	element: null,
	data: null,
	initialize: function(data,options) {
		this.setOptions(options);
		this.data = data;
		this.element = new Element('li',{html: data.name});
		this.element.store('Form.Searcher::match',this);
	},
	destroy: function() {
		this.element.removeEvents();
		this.element = null;
	},
	highlight: function(e) {
		this.element.addClass('highlighted');
		this.fireEvent('highlight',[this,e]);
		return this;
	},
	removeHighlight: function(e) {
		this.element.removeClass('highlighted');
		this.fireEvent('removeHighlight',[this,e]);
	},
	select: function(searcher) { this.fireEvent('select',[this,searcher]); }
});
