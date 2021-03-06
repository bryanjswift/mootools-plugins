/*extern $defined, $type, Class, Events, Options */
/*jslint bitwise: true, browser: true, eqeqeq: true, forin: true, immed: true, newcap: true, nomen: true, plusplus: true, regexp: true, undef: true*/

/*
Script: Pagination.js
License: MIT-style license.
*/

var Pagination = new Class({
	Implements:[Events,Options],
	options: {
		pagesShown: 5,
		pageSize: 10,
		wrap: true
	},
	keys: [],
	numberPages: 0,
	page: 0,
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
		var page = this.page;
		this.page = 0;
		return this.getPage(page);
	},
	getFirstPage: function() {
		return this.getPage(1);
	},
	getLastPage: function() {
		return this.getPage(this.numberPages);
	},
	getNextPage: function() {
		return this.getPage(this.page + 1);
	},
	getPage: function(pageNumber) {
		if (pageNumber > this.numberPages) {
			if (this.options.wrap) { pageNumber = 1; }
			else { return; }
		} else if (pageNumber < 1) {
			if (this.options.wrap) { pageNumber = this.numberPages; }
			else { return; }
		} else if (pageNumber === this.page) { return; }
		this.page = pageNumber;
		var pageSize = this.options.pageSize;
		var slice = this.keys.slice(pageSize * (pageNumber - 1),pageNumber * pageSize);
		this.fireEvent('page',[slice,this]);
		return slice;
	},
	getPreviousPage: function() {
		return this.getPage(this.page - 1);
	},
	getShownPages: function() {
		var pages = [];
		var numberPages = this.numberPages;
		var pagesShown = this.options.pagesShown;
		var halfShown = Math.floor(pagesShown / 2);
		var current = this.page;
		var start = 1 + halfShown;
		var end = numberPages - halfShown;
		var i;
		if (numberPages > pagesShown) {
			if (current < start) {
				start = 1;
			} else if (current > end) {
				start = end - halfShown;
			} else {
				start = current - halfShown;
			}
			for (i = 0; i < pagesShown; i = i + 1) {
				pages.push(start + i);
			}
		} else {
			for (i = 1; i <= numberPages; i = i + 1) {
				pages.push(i);
			}
		}
		return pages;
	},
	reset: function(data) {
		if ($type(data) === 'array') { this.initializeArray(data); }
		else { this.initializeObject(data); }
		this.numberPages = Math.ceil(this.keys.length / this.options.pageSize);
		this.page = 0;
		if (this.numberPages === 0) { return this.fireEvent('empty',this); }
		this.getFirstPage();
	},
	updateOptions: function(options) {
		var changed = false;
		var thisoptions = this.options;
		var option;
		for (option in options) {
			if (!$defined(thisoptions[option])) { continue; }
			changed = changed || thisoptions[option] !== options[option];
			thisoptions[option] = options[option];
		}
		if (changed) { this.page = 0; this.reset(this.keys); }
	}
});
