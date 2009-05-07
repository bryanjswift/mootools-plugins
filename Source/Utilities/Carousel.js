var Carousel = new Class({
	Implements: [Events,Options],
	options: {
		next: false,
		previous: false,
		shown: 3
	},
	initialize: function(element,options) {
		this.setOptions(options);
		this.element = $(element);
		this.items = this.element.getChildren();
		this.position = 0;
		this.size = this.items.length;
		this.itemSize = this.items[0].getSize().x;
		if (this.options.next) this.options.next.addEvent('click',this.next.bind(this));
		if (this.options.previous) this.options.previous.addEvent('click',this.previous.bind(this));
		this.fireEvent('create',this);
	},
	next: function(e) {
		if (this.position === (this.size - this.options.shown)) {
			this.position = this.position - 1;
			this.element.adopt(this.items[0]).setStyle('left',-this.position * this.itemSize);
		}
		this.position = this.position + 1;
		this.element.tween('left',-this.position * this.itemSize);
		this.items = this.element.getChildren();
		this.fireEvent('next',[this,e]);
	},
	previous: function(e) {
		if (this.position === 0) {
			this.position = 1;
			this.element.grab(this.items.getLast(),'top').setStyle('left',-this.itemSize);
		}
		this.position = this.position - 1;
		this.element.tween('left',-this.position * this.itemSize);
		this.items = this.element.getChildren();
		this.fireEvent('previous',[this,e]);
	}
});
