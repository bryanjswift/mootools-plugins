Modal = new Class({
	Implements: [Events,Options],
	options: {
		left: false,
		top: false
	},
	initialize: function(contents,options) {
		this.element = new Element('div',{'class': 'lightboxElement'}).adopt(contents);
	}
});
