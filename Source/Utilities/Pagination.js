/*extern Class, Events, Options */
Pagination = new Class({
	Implements:[Events,Options],
	options: {
		pageSize: 10,
		wrap: true
	},
	keys: [],
	numberPages: 0,
	page: 1,
	initialize: function(data,options) {
		this.setOptions(options);
		this.reset(data);
	},
	initializeArray: function(data) {
		this.keys = data;
	},
	initializeObject: function(data) {
		var keys = this.keys;
		var key;
		for (key in data) {
			keys.push(key);
		}
	},
	getCurrentPage: function() {
		this.getPage(this.page);
	},
	getFirstPage: function() {
		this.getPage(1);
	},
	getLastPage: function() {
		this.getPage(this.numberPages);
	},
	getNextPage: function() {
		this.getPage(this.page + 1);
	},
	getPage: function(pageNumber) {
		if (pageNumber > this.numberPages) {
			if (this.options.wrap) { pageNumber = 1; }
			else { return; }
		} else if (pageNumber < 1) {
			if (this.options.wrap) { pageNumber = this.numberPages; }
			else { return; }
		}
		this.page = pageNumber;
		var pageSize = this.options.pageSize;
		this.fireEvent('onPage',[this.keys.slice(pageSize * (pageNumber - 1),pageNumber * pageSize),this]);
	},
	getPreviousPage: function() {
		this.getPage(this.page - 1);
	},
	reset: function(data) {
		if ($type(data) === 'array') { this.initializeArray(data); }
		else { this.initializeObject(data); }
		this.numberPages = Math.ceil(this.keys.length / this.options.pageSize);
		this.getFirstPage();
	}
});
