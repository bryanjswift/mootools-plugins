MooTools.Utilities.Page = new Class({
	initialize: function() {
		addEvent('domready', this.domready.bind(this));
		addEvent('load', this.load.bind(this));
		addEvent('beforeunload', this.destroy.bind(this));
	},
	domready: function() { },
	load: function() { },
	destroy: function() { }
});
