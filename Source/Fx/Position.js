/*
Script: Fx.Position.js
	Position elements to certain coordinates with a transition.

License:
	MIT-style license. 
 */
(function() {

	Fx.Position = new Class({

		Extends: Fx.CSS,

		options: {
			defaultTop: 0,
			defaultLeft: 0,
			parentEl: window
		},

		morph: Class.empty,

		initialize: function (element, options) {
			this.element = element = $(element);
			this.parent(options);
			this.morph = new Fx.Morph(element,this.options);
			var location = element.getPosition();
			this.morph.set({top:location.y,left:location.x});
		},

		centerVertically: function(height) {
			var windowHeight, newTop, fxtop;
			var defaultTop = this.options.defaultTop;
			if (document.getElementById) {
				windowHeight = window.getSize().y;
				if (this.element.getStyle('position') !== 'absolute') {
					this.element.setStyle('position','absolute');
				}
				newTop = getCenteredVerticalPosition(this.element,this.options.parentEl,defaultTop,height) + 'px';
				this.morph.start({'top':newTop});
			}
			return this;
		},

		centerHorizontally: function(width) {
			var windowWidth, newLeft, fxleft;
			var defaultLeft = this.options.defaultLeft;
			if (document.getElementById) {
				windowWidth = window.getSize().x;
				if (this.element.getStyle('position') !== 'absolute') {
					this.element.setStyle('position','absolute');
				}
				newLeft = getCenteredHorizontalPosition(this.element,this.options.parentEl,defaultLeft,width) + 'px';
				this.morph.start({'left':newLeft});
			}
			return this;
		},

		center: function(width,height) {
			var defaultTop = this.options.defaultTop;
			var defaultLeft = this.options.defaultLeft;
			if (this.element.getStyle('position') !== 'absolute') {
				this.element.setStyle('position','absolute');
			}
			var newTop = getCenteredVerticalPosition(this.element,this.options.parentEl,defaultTop,height) + 'px';
			var newLeft = getCenteredHorizontalPosition(this.element,this.options.parentEl,defaultLeft,width) + 'px';
			this.morph.start({top:newTop,left:newLeft});
			return this;
		},

		move: function (top,left) {
			if (this.element.getStyle('position') !== 'absolute') {
				this.element.setStyle('position','absolute');
			}
			this.morph.start({'top':top,'left':left});
			return this;
		},

		cancel: function() {
			this.morph.cancel();
			return this;
		}

	});
	
	// private functions
	
	function getCenteredVerticalPosition(element,parentEl,defaultTop,height) {
		var calcedTop, newTop;
		var yoffset = parentEl.getScrollTop();
		var windowHeight = parentEl.getSize().y;
		height = !height ? element.getSize().x : height;
		if (windowHeight - height > defaultTop) {
			calcedTop = ((windowHeight / 2) - (height / 2));
			if (calcedTop > defaultTop) {
				newTop = calcedTop + yoffset;
			} else {
				newTop = defaultTop + yoffset;
			}
		} else {
			// if content is taller than the parent
			newTop = defaultTop;
		}
		return newTop;
	}
	
	function getCenteredHorizontalPosition(element,parentEl,defaultLeft,width) {
		var calcedLeft, newLeft;
		var xoffset = parentEl.getScrollLeft();
		var windowWidth = parentEl.getSize().x;
		width = !width ? element.getSize().y : width;
		if (windowWidth - width > defaultLeft) {
			calcedLeft = ((windowWidth / 2) - (width / 2));
			if (calcedLeft > defaultLeft) {
				newLeft = calcedLeft + xoffset;
			} else {
				newLeft = defaultLeft + xoffset;
			}
		}	else {
			// if content is wider than the parent
			newLeft = defaultLeft;
		}
		return newLeft;
	}

})();

Element.Properties.position = {

	set: function(options) {
		var position = this.retrieve('position');
		if (position) { position.cancel(); }
		return this.eliminate('position').store('position:options', $extend({'link':'cancel'}, options));
	},

	get: function(property, options) {
		if (options || !this.retrieve('position')) {
			if (options || !this.retrieve('position:options')) { this.set('position',options); }
			this.store('position', new Fx.Position(this, this.retrieve('position:options')));
		}
		return this.retrieve('position');
	}

};


Element.implement({

	center: function(options) {
		var position = this.get('position');
		options = options || {};
		switch (options.type) {
			case 'x':
				position.centerHorizontally(options.width);
				break;
			case 'y':
				position.centerVertically(options.height);
				break;
			default:
				position.center(options.width, options.height);
				break;
		}
		return this;
	},

	move: function(pTop,pLeft) {
		var position = this.get('position');
		var top = $pick(pTop,this.getPosition().y);
		var left = $pick(pLeft,this.getPosition().x);
		position.move(top,left);
		return this;
	}

});

