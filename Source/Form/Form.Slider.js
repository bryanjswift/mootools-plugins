/*extern Class, Events, Options, Form, $, Element */
if (typeof Form === 'undefined') { Form = {}; }

Form.Slider = new Class({
	Implements:[Events,Options],
	options: {
		animate: true,
		showButtons: true,
		snapSize: null,
		vertical: true
	},
	bound: {},
	buttonHoldInterval: null,
	dimension: null,
	dragProperties: {on:false,downPosition:null},
	element: null,
	position: 0,
	scrollbar: null,
	scrubber: null,
	xy: null,
	initialize: function(element,options) {
		element = $(element);
		this.bound = {
			backClick: this.pageBackward.bind(this),
			buttonUp: this.clearButtonHoldInterval.bind(this),
			forwardClick: this.pageForward.bind(this),
			mouseWheel: this.scroll.bind(this),
			scrubberDown: this.startDrag.bind(this),
			scrubberDrag: this.drag.bind(this),
			scrubberUp: this.stopDrag.bind(this),
			trackClick: this.centerScrubberForClick.bind(this)
		};
		var showButtons = this.options.showButtons;
		var vertical = this.options.vertical;
		var positionDimension = vertical ? 'top' : 'left';
		var dimension = vertical ? 'height' : 'width';
		var sides = vertical ? ['Top','Bottom'] : ['Left','Right'];
		var xy = vertical ? 'y' : 'x';
		var size = element.getStyle(dimension).toInt();
		var wrapper = this.initializeWrapper(element,dimension,size);
		var scrollbar = this.initializeScrollbar();
		wrapper.getParent().adopt(scrollbar); // attached outside wrapper because of hidden overflow
		var backSize = showButtons ? scrollbar.getElement('.scrollbarBack').getSize()[xy] : 0;
		var forwardSize = showButtons ? scrollbar.getElement('.scrollbarForward').getSize()[xy] : 0;
		var trackSize = scrollbar.getSize()[xy] - backSize - forwardSize;
		var trackStyles = vertical ? {height:trackSize,position:'absolute','top':backSize} : {width:trackSize,position:'absolute','left':backSize};
		this.track = scrollbar.getElement('div.scrollbarTrack').setStyles(trackStyles);
		this.ratio = trackSize / element.getScrollSize()[xy];
		var scrubber = scrollbar.getElement('div.scrollbarScrubber');
		var scrubberSize = Math.floor(this.ratio * trackSize);
		sides.each(function(side) {
			scrubberSize = scrubberSize - scrubber.getStyle('margin' + side).toInt() - scrubber.getStyle('padding' + side).toInt() - scrubber.getStyle('border' + side + 'Width').toInt();
		});
		scrubber.setStyle(dimension,scrubberSize);
		// setup values on instance
		this.dimension = positionDimension;
		this.element = element;
		this.limit = trackSize - scrubberSize;
		this.pageSize = size;
		this.scrubber = scrubber;
		this.wrapper = wrapper;
		this.xy = xy;
		// store data
		element.store('Form.Slider::data',this);
	},
	initializeScrollbar: function() {
		var scrollbar = new Element('div',{
			'class': 'scrollbar',
		});
		var back, forward;
		if (this.options.showButtons) {
			back = new Element('div',{'class':'scrollbarBack',events:{mousedown:this.bound.backClick,mouseup:this.bound.buttonUp}});
			back.addEvents({
				mouseenter: back.addClass.pass(['scrollbarBackOver'],back),
				mouseleave: back.removeClass.pass(['scrollbarBackOver'],back),
				mousedown: back.addClass.pass(['scrollbarBackDown'],back),
				mouseup: back.removeClass.pass(['scrollbarBackDown'],back)
			});
		} else {
			back = null;
		}
		var track = new Element('div',{
			'class':'scrollbarTrack',
			events: {
				click: this.bound.trackClick
			}
		});
		var scrubber = new Element('div',{
			'class':'scrollbarScrubber',
			events: {
				click: function(e) { var evt = new Event(e); evt.stop(); },
				mousedown: this.bound.scrubberDown
			}
		});
		scrubber.addEvents({
			mouseenter: scrubber.addClass.pass(['scrollbarScrubberOver'],scrubber),
			mouseleave: scrubber.removeClass.pass(['scrollbarScrubberOver'],scrubber),
			mousedown: scrubber.addClass.pass(['scrollbarScrubberDown'],scrubber),
			mouseup: scrubber.removeClass.pass(['scrollbarScrubberDown'],scrubber)
		});
		if (this.options.showButtons) {
			forward = new Element('div',{'class':'scrollbarForward',events:{mousedown:this.bound.forwardClick,mouseup:this.bound.buttonUp}});
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
		this.scrollbar = scrollbar;
		return scrollbar;
	},
	initializeWrapper: function(element,dimension,size) {
		var sides = this.options.vertical ? ['Top','Bottom'] : ['Left','Right'];
		var wrapperStyles = {};
		var properties = [];
		var props = ['padding','margin','border'];
		props.each(function(prop) {
			sides.each(function(side) {
				var property = prop + side;
				wrapperStyles[property] = element.getStyle(property);
				properties.push(property);
			});
		});
		var elementStyles = [0,0,0,0,0,0].associate(properties);
		elementStyles[dimension] = 'auto';
		wrapperStyles.overflow = 'hidden';
		wrapperStyles[dimension] = size;
		var wrapper = new Element('div',{
			'class':'scrollbarWrapper',
			styles: wrapperStyles
		});
		this.wrapper = wrapper;
		element.setStyles(elementStyles);
		wrapper.wraps(element);
		return wrapper;
	},
	centerScrubberForClick: function(e) {
		var evt = new Event(e);
		evt.stop();
		var xy = this.xy;
		var scrubber = this.scrubber;
		var clickPos = evt.page[xy] - this.track.getPosition()[xy] - (scrubber.getSize()[xy] / 2);
		this.setScrubberPosition(clickPos);
	},
	clearButtonHoldInterval: function() {
		$clear(this.buttonHoldInterval);
	},
	scroll: function(e) {
		var evt = new Event(e);
		if (evt.wheel > 0 && this.scrubberPosition != this.scrubberLimits[this.options.horizontal ? 'left' : 'top']) {
			// wheel up
			this.pageBackward(e);
		} else if (evt.wheel < 0 && this.scrubberPosition != this.scrubberLimits[this.options.horizontal ? 'right' : 'bottom']) {
			// wheel down
			this.pageForward(e);
		}
	},
	drag: function(e) {
		var evt = new Event(e);
		var position = evt.page[this.xy] - this.track.getPosition()[this.xy] - this.dragProperties.downPosition;
		this.setScrubberPosition(position,false);
	},
	pageBackward: function(e) {
		var evt = e ? new Event(e).stop() : null;
		this.setScrubberPosition(this.position - (this.track.getSize()[this.xy] * 0.25));
		this.buttonHoldInterval = this.pageBackward.delay(150,this);
	},
	pageForward: function(e) {
		var evt = e ? new Event(e).stop() : null;
		this.setScrubberPosition(this.position + (this.track.getSize()[this.xy] * 0.25));
		this.buttonHoldInterval = this.pageForward.delay(150,this);
	},
	startDrag: function(e) {
		var evt = new Event(e);
		evt.stop();
		var drag = this.dragProperties;
		drag.on = true;
		drag.downPosition = evt.page[this.xy] - this.scrubber.getPosition()[this.xy];
		document.addEvents({mousemove:this.bound.scrubberDrag, mouseup:this.bound.scrubberUp});
	},
	stopDrag: function(e) {
		var evt = new Event(e);
		evt.stop();
		var drag = this.dragProperties;
		drag.on = false;
		drag.downPosition = null;
		document.removeEvents({mousemove:this.bound.scrubberDrag, mouseup:this.bound.scrubberUp});
	},
	setScrubberPosition: function(position, animate) {
		animate = $defined(animate) ? animate : this.options.animate;
		if (position < 0) {
			position = 0;
		} else if (position > this.limit) {
			position = this.limit;
		}
		this.position = position;
		var positionRatio = position / this.trackSize;
		var tween = this.scrubber.get('tween');
		tween[animate ? 'start' : 'set'](this.dimension,position);
		this.fireEvent(animate ? 'onSlideTo' : 'onMoveTo',[positionRatio,this]);
	}
});
