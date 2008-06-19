if (typeof MooTools === 'undefined') { var MooTools = { Plugins: { modulesLoaded: [] } }; }
if (typeof MooTools.Plugins === 'undefined') { MooTools.Plugins = { modulesLoaded: [] }; }

(function() {

	MooTools.Plugins.Position = new Class({

		Extends: Fx.CSS,

		options: {
			defaultTop: 0,
			defaultLeft: 0,
			parentEl: window
		},

		morph: Class.empty,

		initialize: function (element, options) {
			this.element = $(element);
			this.parent(options);
			this.morph = new Fx.Morph(this.element,this.options);
			var location = this.element.getPosition();
			this.morph.set({top:location.y,left:location.x});
		},

		centerY: function(height) {
			var windowHeight, newTop, fxtop;
			var defaultTop = this.options.defaultTop;
			if (document.getElementById) {
				windowHeight = window.getSize().y;
				if (windowHeight > defaultTop &&
						!(this.element.getStyle('position') === 'absolute' || this.element.getStyle('position') === 'relative')) {
					this.element.setStyle('position','absolute');
				}
				newTop = getCenteredVerticalPosition(this.element,this.options.parentEl,defaultTop,height) + 'px';
				this.morph.start({'top':newTop});
			}
			return this;
		},

		centerX: function(width) {
			var windowWidth, newLeft, fxleft;
			var defaultLeft = this.options.defaultLeft;
			if (document.getElementById) {
				windowWidth = window.getSize().x;
				if (windowWidth > defaultLeft &&
						!(this.element.getStyle('position') === 'absolute' || this.element.getStyle('position') === 'relative')) {
					this.element.setStyle('position','absolute');
				}
				newLeft = getCenteredHorizontalPosition(this.element,this.options.parentEl,defaultLeft,width) + 'px';
				this.morph.start({'left':newLeft});
			}
			return this;
		},

		center: function(pWidth,pHeight) {
			var width, height;
			var defaultTop = this.options.defaultTop;
			var defaultLeft = this.options.defaultLeft;
			var eleSize = pWidth && pHeight ? null : this.element.getSize();
			if (!$defined(pWidth)) { width = eleSize.x; } else { width = pWidth; }
			if (!$defined(pHeight)) { height = eleSize.y; } else { height = pHeight; }
			if (!(this.element.getStyle('position') === 'absolute' || this.element.getStyle('position') === 'relative')) {
				this.element.setStyle('position','absolute');
			}
			var newTop = getCenteredVerticalPosition(this.element,this.options.parentEl,defaultTop,height) + 'px';
			var newLeft = getCenteredHorizontalPosition(this.element,this.options.parentEl,defaultLeft,width) + 'px';
			this.morph.start({top:newTop,left:newLeft});
			return this;
		},

		move: function (pTop,pLeft) {
			if (this.element.getStyle('position') !== 'absolute' || this.element.getStyle('position') !== 'relative') {
				this.element.setStyle('position','absolute');
			}
			this.morph.start({top:pTop,left:pLeft});
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

Element.Properties.MooToolsPluginsPosition = {

	set: function(options) {
		var position = this.retrieve('MooToolsPluginsPosition');
		if (position) { position.cancel(); }
		return this.store('MooToolsPluginsPosition', new MooTools.Plugins.Position(this,options));
	},

	get: function(property, options) {
		if (options || !this.retrieve('MooToolsPluginsPosition')) { this.set('MooToolsPluginsPosition',options); }
		var position = this.retrieve('MooToolsPluginsPosition');
		position.property = property;
		return position;
	}

};


Element.implement({

	center: function() {
		var position = this.get('MooToolsPluginsPosition');
		position.center();
		return this;
	},

	move: function(pTop,pLeft) {
		var position = this.get('MooToolsPluginsPosition');
		var top = $pick(pTop,this.getPosition().y);
		var left = $pick(pLeft,this.getPosition().x);
		position.move(top,left);
		return this;
	}

});

MooTools.Plugins.modulesLoaded[MooTools.Plugins.modulesLoaded.length] = 'Position';
