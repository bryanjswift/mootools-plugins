/*extern $clear, $defined, Browser, Class, Event, Events, Options, Form, $, Element */
/*jslint bitwise: true, browser: true, eqeqeq: true, forin: true, immed: true, newcap: true, nomen: true, plusplus: true, regexp: true, undef: true*/

/*
Script: Form.Slider.js
License: MIT-style license.
*/

if (typeof Form === 'undefined') { Form = {}; }

Form.Slider = new Class({
	Implements:[Events,Options],
	options: {
		animate: true,
		duration: 500,
		scrollbar: false,
		showButtons: true,
		size: null,
		snapSize: false,
		vertical: true
	},
	base: null,
	bound: {},
	buttonHoldInterval: null,
	dimension: null,
	dragProperties: {on:false,downPosition:null},
	element: null,
	pageSize: null,
	position: 0,
	scrollbar: null,
	scrubber: null,
	side: null,
	trackSize: null,
	wrapper: null,
	xy: null,
	initialize: function(element,options) {
		if (!options || !options.onSlideTo) { this.addEvent('onSlideTo',this.moveContent.bindWithEvent(this,[true])); }
		if (!options || !options.onMoveTo) { this.addEvent('onMoveTo',this.moveContent.bindWithEvent(this,[false])); }
		this.setOptions(options);
		element = $(element);
		var vertical = this.options.vertical;
		var side = vertical ? 'top' : 'left';
		var dimension = vertical ? 'height' : 'width';
		var xy = vertical ? 'y' : 'x';
		var size = this.options.size || element.getStyle(dimension).toInt();
		this.bound = {
			backClick: this.pageBackward.bind(this),
			buttonUp: this.clearButtonHoldInterval.bind(this),
			forwardClick: this.pageForward.bind(this),
			mousewheel: this.scroll.bind(this),
			scrubberDown: this.startDrag.bind(this),
			scrubberDrag: this.drag.bind(this),
			scrubberUp: this.stopDrag.bind(this),
			trackClick: this.centerScrubberForClick.bind(this)
		};
		this.base = element.getParent();
		this.wrapper = this.initializeWrapper(element,dimension,size);
		this.scrollbar = this.initializeScrollbar();
		// setup values on instance
		this.dimension = dimension;
		this.element = element;
		this.side = side;
		this.xy = xy;
		// store data
		element.store('Form.Slider::data',this);
		// fire an event for post processing
		this.fireEvent('onCreate',this);
		this.recalibrate();
	},
	initializeScrollbar: function() {
		var scrollbar = this.options.scrollbar || new Element('div',{'class':'scrollbar'});
		var back, forward;
		if (this.options.showButtons) {
			back = this.getCreateElement(scrollbar,'scrollbarBack').addEvents({mousedown:this.bound.backClick,mouseup:this.bound.buttonUp});
			back.addEvents({
				mouseenter: back.addClass.pass(['scrollbarBackOver'],back),
				mouseleave: back.removeClass.pass(['scrollbarBackOver'],back),
				mousedown: back.addClass.pass(['scrollbarBackDown'],back),
				mouseup: back.removeClass.pass(['scrollbarBackDown'],back)
			});
		} else {
			back = null;
		}
		// get or create new track then add events
		var track = this.getCreateElement(scrollbar,'scrollbarTrack').addEvents({click:this.bound.trackClick});
		var scrubber = this.getCreateElement(scrollbar,'scrollbarScrubber').addEvents({click:this.stopEvent,mousedown:this.bound.scrubberDown});
		scrubber.addEvents({
			mouseenter: scrubber.addClass.pass(['scrollbarScrubberOver'],scrubber),
			mouseleave: scrubber.removeClass.pass(['scrollbarScrubberOver'],scrubber),
			mousedown: scrubber.addClass.pass(['scrollbarScrubberDown'],scrubber),
			mouseup: scrubber.removeClass.pass(['scrollbarScrubberDown'],scrubber)
		}).set('tween',{
			duration: this.options.duration,
			link:'cancel',
			transition: 'linear'
		});
		if (this.options.showButtons) {
			forward = this.getCreateElement(scrollbar,'scrollbarForward').addEvents({mousedown:this.bound.forwardClick,mouseup:this.bound.buttonUp});
			forward.addEvents({
				mouseenter: forward.addClass.pass(['scrollbarForwardOver'],forward),
				mouseleave: forward.removeClass.pass(['scrollbarForwardOver'],forward),
				mousedown: forward.addClass.pass(['scrollbarForwardDown'],forward),
				mouseup: forward.removeClass.pass(['scrollbarForwardDown'],forward)
			});
		} else {
			forward = null;
		}
		scrollbar.adopt(back,track.adopt(scrubber),forward);
		this.scrubber = scrubber;
		this.track = track;
		return scrollbar;
	},
	initializeWrapper: function(element,dimension,size) {
		var wrapper = new Element('div',{'class':'scrollbarWrapper'});
		wrapper.addEvents({
			mouseenter:wrapper.addClass.pass(['hovered'],wrapper),
			mouseleave:wrapper.removeClass.pass(['hovered'],wrapper)
		}).setStyle(dimension,size);
		this.wrapper = wrapper;
		wrapper.wraps(element);
		return wrapper;
	},
	centerScrubberForClick: function(e) {
		var evt = new Event(e).stop();
		var xy = this.xy;
		var scrubber = this.scrubber;
		var clickPos = evt.page[xy] - this.track.getPosition()[xy] - (scrubber.getSize()[xy] / 2);
		this.setScrubberPosition(clickPos);
	},
	clearButtonHoldInterval: function() {
		$clear(this.buttonHoldInterval);
	},
	destroy: function() {
		document.removeEvent('mousewheel',this.bound.mousewheel);
		if (!this.options.wrapper) {
			this.wrapper.getParent().adopt(this.wrapper.getChildren());
			this.wrapper.destroy();
		}
		if (!this.options.scrollbar) { this.scrollbar.destroy(); }
		this.base = null;
		this.element = null;
		this.scrollbar = null;
		this.scrubber = null;
		this.wrapper = null;
	},
	drag: function(e) {
		var evt = new Event(e).stop();
		var position = evt.page[this.xy] - this.track.getPosition()[this.xy] - this.dragProperties.downPosition;
		this.setScrubberPosition(position,false);
	},
	getCreateElement: function(scrollbar,clazz) {
		return this.options.scrollbar ? scrollbar.getElement('.' + clazz).removeEvents() : new Element('div',{'class':clazz});
	},
	getElementSize: function(element,xy) {
		if (Browser.Engine.trident) { return element.getScrollSize()[xy]; }
		var elementSize = 0;
		element.getChildren().each(function(child) { elementSize = elementSize + child.getSize()[xy]; });
		return elementSize;
	},
	moveContent: function(ratio,animate) {
		animate = $defined(animate) ? animate : this.options.animate;
		// fireEvent appears to not pass args which evaluate to false
		if (typeof ratio !== 'number' || !ratio) { ratio = 0; }
		var list = this.element;
		var position = -ratio * list.getSize()[this.xy];
		list.get('tween')[animate ? 'start' : 'set'](this.side,position);
	},
	pageBackward: function(e,fromDelay) {
		var evt = e ? new Event(e).stop() : null;
		this.setScrubberPosition(this.position - (this.pageSize * 0.25));
		if (evt && evt.type === 'mousedown' || fromDelay) { this.buttonHoldInterval = this.pageBackward.delay(150,this,[null,true]); }
	},
	pageForward: function(e,fromDelay) {
		var evt = e ? new Event(e).stop() : null;
		this.setScrubberPosition(this.position + (this.pageSize * 0.25));
		if (evt && evt.type === 'mousedown' || fromDelay) { this.buttonHoldInterval = this.pageForward.delay(150,this,[null,true]); }
	},
	recalibrate: function() {
		this.fireEvent('recalibrateStart',this);
		var xy = this.xy;
		this.element.setStyle(this.dimension,'auto');
		var size = this.options.size || this.wrapper.getStyle(this.dimension).toInt();
		if (this.getElementSize(this.element,xy) <= size) { this.unwrap(); }
		else { this.wrap(size); }
		this.fireEvent('recalibrateFinish',this);
	},
	scroll: function(e) {
		if (!this.wrapper.hasClass('hovered')) { return; }
		var evt = new Event(e);
		if (evt.wheel > 0 && this.position !== 0) {
			// wheel up
			this.pageBackward(e);
		} else if (evt.wheel < 0 && this.position !== this.limit) {
			// wheel down
			this.pageForward(e);
		}
	},
	startDrag: function(e) {
		var evt = new Event(e).stop();
		var drag = this.dragProperties;
		drag.on = true;
		drag.downPosition = evt.page[this.xy] - this.scrubber.getPosition()[this.xy];
		document.addEvents({mousemove:this.bound.scrubberDrag, mouseup:this.bound.scrubberUp});
	},
	stopDrag: function(e) {
		var evt = new Event(e).stop();
		var drag = this.dragProperties;
		drag.on = false;
		drag.downPosition = null;
		document.removeEvents({mousemove:this.bound.scrubberDrag, mouseup:this.bound.scrubberUp});
	},
	stopEvent: function(e) { var evt = new Event(e).stop(); },
	setScrubberPosition: function(position, animate) {
		animate = $defined(animate) ? animate : this.options.animate;
		if (position < 0) {
			position = 0;
		} else if (position > this.limit) {
			position = this.limit;
		}
		this.position = position;
		var ratio = position / this.trackSize;
		var tween = this.scrubber.get('tween');
		tween.cancel();
		tween[animate ? 'start' : 'set'](this.side,position);
		this.fireEvent(animate ? 'onSlideTo' : 'onMoveTo',[ratio,this]);
	},
	unwrap: function() {
		document.removeEvent('mousewheel',this.bound.mousewheel);
		this.base.removeClass('sliding');
		this.scrollbar.dispose();
		this.fireEvent('unwrapped',this);
	},
	wrap: function(size) {
		var scrollbar = this.scrollbar;
		var showButtons = this.options.showButtons;
		var xy = this.xy;
		var sides = this.options.vertical ? ['Top','Bottom'] : ['Left','Right'];
		document.addEvent('mousewheel',this.bound.mousewheel);
		this.wrapper.setStyle(this.dimension,size);
		this.element.setStyle(this.dimension,'auto');
		this.base.addClass('sliding').adopt(scrollbar);
		var elementSize = this.getElementSize(this.element,xy);
		var backSize = showButtons ? scrollbar.getElement('.scrollbarBack').getSize()[xy] : 0;
		var forwardSize = showButtons ? scrollbar.getElement('.scrollbarForward').getSize()[xy] : 0;
		var trackSize = scrollbar.getSize()[xy] - backSize - forwardSize;
		var trackStyles = this.options.vertical ? {height:trackSize,position:'absolute','top':backSize} : {width:trackSize,position:'absolute','left':backSize};
		this.track.setStyles(trackStyles);
		this.ratio = this.wrapper.getSize()[xy] / elementSize;
		var scrubber = scrollbar.getElement('div.scrollbarScrubber');
		var scrubberSize = Math.floor(this.ratio * trackSize);
		sides.each(function(side) {
			scrubberSize = scrubberSize - scrubber.getStyle('margin' + side).toInt() - scrubber.getStyle('padding' + side).toInt() - scrubber.getStyle('border' + side + 'Width').toInt();
		});
		scrubber.setStyle(this.dimension,scrubberSize);
		this.limit = trackSize - scrubber.getSize()[xy];
		this.trackSize = trackSize;
		this.pageSize = size * this.ratio;
		if (this.position > this.limit) { this.setScrubberPosition(this.limit,false); }
		this.fireEvent('wrapped',this);
	}
});
