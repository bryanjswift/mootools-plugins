/*extern $, Class, Element, Event, Events, Options */
/*jslint bitwise: true, browser: true, eqeqeq: true, forin: true, immed: true, newcap: true, nomen: true, plusplus: true, regexp: true, undef: true*/

/*
Script: Modal.js
License: MIT-style license.
*/

var Modal = new Class({
	Implements: [Events,Options],
	options: {
		elHiddenSelector:'.modalHidden',
		elShownSelector:'.modalShown',
		cHiddenSelector:'.contentsHidden',
		cShownSelector:'.contentsShown'
	},
	config: {
		elementClass:'modal'
	},
	initialize: function(contents,options) {
		this.setOptions(options);
		this.contents = contents; // contents needs to be of type Element
		this.element = new Element('div',{'class':this.config.elementClass}).adopt(contents);
		$(document.body).adopt(this.element);
		this.fireEvent('create',this);
	},
	hide: function(e) {
		var that = this;
		this.fireEvent('hideStart',this);
		this.element.get('morph').start(this.options.elHiddenSelector).chain(
			that.fireEvent.pass(['hideComplete',that],that)
		);
	},
	show: function(e) {
		var that = this;
		this.fireEvent('showStart',this);
		this.element.get('morph').start(this.options.elShownSelector).chain(
			that.fireEvent.pass(['showComplete',that],that)
		);
	},
	update: function(contents,selector) {
		// contents needs to be of type Element
		this.contents.morph(this.options.cHiddenSelector);
		var cmorph = contents.get('morph').set(this.options.cHiddenSelector);
		this.element.empty().adopt(contents);
		this.element.get('morph').start(selector).chain(
			cmorph.start.pass([this.options.cShownSelector],cmorph)
		);
	}
});
