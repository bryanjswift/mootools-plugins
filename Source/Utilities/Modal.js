Modal = new Class({
	Implements: [Events,Options],
	options: {},
	config: {
		elementClass:'modal',
		elHiddenSelector:'.modalHidden',
		elShownSelector:'.modalShown',
		cHiddenSelector:'.contentsHidden',
		cShownSelector:'.contentsShown'
	},
	initialize: function(contents,options) {
		this.setOptions(options);
		this.contents = contents; // contents needs to be of type Elements or type Element
		this.element = new Element('div',{'class':this.config.elementClass}).adopt(contents);
		$(document.body).adopt(this.element);
		this.fireEvent('create',this);
	},
	hide: function(e) {
		var that = this;
		var evt = e ? new Event(e) : e;
		this.fireEvent('hideStart',this);
		this.element.get('morph').start(this.config.elHiddenSelector).chain(
			function() { that.fireEvent('hideComplete',that); }
		);
	},
	show: function(e) {
		var that = this;
		var evt = e ? new Event(e) : e;
		this.fireEvent('showStart',this);
		this.element.get('morph').start(this.config.elShownSelector).chain(
			function() { that.fireEvent('showComplete',that); }
		);
	},
	update: function(contents,selector) {
		// contents needs to be of type Elements or type Element
		this.contents.morph(this.config.cHiddenSelector);
		var cmorph = contents.get('morph').set(this.config.cHiddenSelector);
		var showContents = cmorph.start.pass([this.config.cShownSelector],cmorph);
		this.element.empty().adopt(contents);
		this.element.get('morph').start(selector).chain(
			showContents
		);
	}
});
