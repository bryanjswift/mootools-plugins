var Range = new Class({
	Implements: [Options],
	options: {
		increment: 1
	},
	elements: [],
	end: 0,
	start: 0,
	initialize: function(start,end,options) {
		this.setOptions(options);
		this.start = start;
		this.end = end;
		var elements = this.elements;
		var i = start;
		var inc = this.options.increment;
		do {
			elements.push(i);
			i = i + inc;
		} while (i <= end);
		this.elements = elements.sort();
	},
	extend: function(point) {
		var elements = this.elemets;
		var inc = point < start ? this.options.increment : -this.options.increment;
		var start = this.start;
		var end = this.end;
		do {
			elements.push(i);
			i = i + inc;
		} while (i < start || i > end);
		this.elements = elements.sort();
	},
	contains: function(value) {
		return this.elements.contains(value);
	}
});
