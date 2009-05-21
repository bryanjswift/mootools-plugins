(function() {
	var oldSetStyle = Element.prototype.setStyle
	Element.implement({
		setStyle: function(property, value) {
			var current = this.getStyle(property);
			if (value !== current) { this.fireEvent(property + 'Changed',this); }
			oldSetStyle.run([property,value],this);
		}
	});
})();