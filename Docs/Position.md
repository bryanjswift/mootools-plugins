Class: MooTools.Plugins.Position {#MooTools-Plugins-Position}
=============================================================

Class to position elements to certain coordinates with a transition.

### Extends:

- [Fx.Css](http://docs.mootools.net/Fx/Fx.CSS)

### Syntax:

	var position = new MooTools.Plugins.Position(element[, options]);

### Arguments:

1. element - (*mixed*) The id of the DOM element, a DOM element, or an [Element](http://docs.mootools.net/Element/Element#Element)
2. options - (*object*, optional) The [Fx](http://docs.mootools.net/Fx/Fx) options object in addition to those below

### Returns:

* (*object*) 

### Options:

* parentEl					- (*[Element](http://doc.mootools.net/Element/Element#Element)*: defaults to window) The element to position relative to
* defaultTop				- (*number*: defaults to 0) The top value to use if the calculated top forces content outside the parent element
* defaultLeft				- (*number*: defaults to 0) The left value to use if the calculated left forces content outside the parent element

### Returns:

* (*object*) A new MooTools.Plugins.Position instance.

### Examples:

Center an element in the browser window:

	var myPosition = new MooTools.Plugins.Position('myElement', {duration: 'long', transition: Fx.Transitions.Circ.easeIn});
	myPosition.center();

### See Also:

- [Fx](http://docs.mootools.net/Fx/Fx)
- [Fx.Css](http://docs.mootools.net/Fx/Fx.CSS)



Hash: Element.Properties {#Element-Properties}
==============================================

see [Element.Properties](http://doc.mootools.net/Element/Element/#Element-Properties)

Element Property: MooToolsPluginsPosition {#Element-Properties:MooToolsPluginsPosition}
---------------------------------------------------------------------------------------

### Setter