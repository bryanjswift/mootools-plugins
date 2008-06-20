Class: Fx.Position {#Fx-Position}
==================

Class to position elements to certain coordinates with a transition.

### Extends:

- [Fx.CSS][]

### Syntax:

	var position = new Fx.Position(element[, options]);

### Arguments:

1. element - (*mixed*) The id of the DOM element, a DOM element, or an [Element][]
2. options - (*object*, optional) The [Fx](http://docs.mootools.net/Fx/Fx) options object in addition to those below

### Returns:

* (*object*) 

### Options:

* parentEl					- (*[Element][]*: defaults to window) The element to position relative to
* defaultTop				- (*number*: defaults to 0) The top value to use if the calculated top forces content outside the parent element
* defaultLeft				- (*number*: defaults to 0) The left value to use if the calculated left forces content outside the parent element

### Returns:

* (*object*) A new Fx.Position instance.

### Examples:

Center an element in the browser window:

	var myPosition = new Fx.Position('myElement', {duration: 'long', transition: Fx.Transitions.Circ.easeIn});
	myPosition.center();

### See Also:

- [Fx][]
- [Fx.CSS][]



Fx.Position Method: centerVertically {#Fx-Position:centerVertically}
------------------------------------

Centers the Element vertically relative to parentEl

### Syntax:

	myPosition.centerVertically([height]);

### Arguments:

1. height - (*number*, optional) height the element should be considered for the purposes of positioning, uses actual element height if not specified

### Returns:

* (*object*) This Fx.Position instance.

### Examples:

	var myPosition = new Fx.Position('myElement');
	myPosition.centerVertically('150px');



Fx.Position Method: centerHorizontally {#Fx-Position:centerHorizontally}
--------------------------------------

Centers the Element horizontally relative to parentEl

### Syntax:

	myPosition.centerHorizontally([width]);

### Arguments:

1. width - (*number*, optional) width the element should be considered for the purposes of positioning, uses actual element width if not specified

### Returns:

* (*object*) This Fx.Position instance.

### Examples:

	var myPosition = new Fx.Position('myElement');
	myPosition.centerHorizontally('100px');



Fx.Position Method: center {#Fx-Position:center}
--------------------------

Centers the Element horizontally and vertically relative to parentEl

### Syntax:

	myPosition.center([width [,height]]);

### Arguments:

1. width - (*number*, optional) width the element should be considered for the purposes of positioning, uses actual element width if not specified
1. height - (*number*, optional) height the element should be considered for the purposes of positioning, uses actual element height if not specified

### Returns:

* (*object*) This Fx.Position instance.

### Examples:

	var myPosition = new Fx.Position('myElement');
	myPosition.center('100px','150px');



Fx.Position Method: move {#Fx-Position:move}
------------------------

Moves the element to the top and left specified

### Syntax:

	myPosition.move(100,150);

### Arguments:

1. top - (*number*, optional) The top in pixels the element should be moved to, current y position used if not provided
2. left - (*number*, optional) The left in pixels the element should be moved to, current x position used if not provided

### Returns:

* (*object*) This Fx.Position instance.

### Examples:

	var myPosition = new Fx.Position('myElement');
	myPosition.move('100px','150px');



Hash: Element.Properties {#Element-Properties}
========================

see [Element.Properties](http://docs.mootools.net/Element/Element/#Element-Properties)

Element Property: position {#Element-Properties:position}
--------------------------

### Setter

Sets a default Fx.Position instance for an Element.

#### Syntax:

	el.set('position'[, options]);

#### Arguments:

1. options (*object*, optional) The Fx.Position options.

#### Returns:

* (*element*) This Element.

#### Examples:

	el.set('position', {duration: 'long', transition: 'bounce:out'});
	el.center();

### Getter

Gets the default Fx.Position instance for the Element.

#### Syntax:

	el.get('position');

#### Arguments:

1. options - (*object*, optional) The Fx.Position options. If these are passed in, a new instance will be generated.

#### Returns:

* (*object*) The Fx.Position instance

#### Examples:

	el.set('position', {duration: 'long', transition: 'bounce:out'});
	el.center();
	el.get('position'); // The Fx.Position instance.



Native: Element {#Element}
===============

Element Method: center {#Element:center}
----------------------

Centers an element relative to it's window or parent given the properties passed in.

### Syntax:

	myElement.center(properties);

### Arguments:

1. options - (*object*, optional) The properties to determine how to center the Element.

### Options:

* type							- (*string*, optional) x for a horizontal only centering, y for a vertical only centering, anything else for both
* width							- (*number*, optional) width to be passed to the horizontal or both centering
* height						- (*number*, optional) height to be passed to the vertical or both centering

### Returns:

* (*element*) This Element.

### Example:

Center horizontally:

	$('myElement').center({type: 'x'});
	$('myElement').center({type: 'x', width: 150});

Center vertically:

	$('myElement').center({type: 'y'});
	$('myElement').center({type: 'y', height: 100});

Center both vertically and horizontally:

	$('myElement').center({type: 'both'});
	$('myElement').center({height: 100, width: 150});
	$('myElement').center();
	$('myElement').center({height: 100});

### See Also:

- [Fx.Position][]



Element Method: move {#Element:center}
----------------------

Moves an element relative to it's window or parent given the properties passed in.

### Syntax:

	myElement.move(top,left);

### Arguments:

1. top - (*number*, optional) The top in pixels the element should be moved to, current y position used if not provided
2. left - (*number*, optional) The left in pixels the element should be moved to, current x position used if not provided

### Returns:

* (*element*) This Element.

### Example:

	$('myElement').move(100);
	$('myElement').move(100, 150);
	$('myElement').move('100px', '150px');

### See Also:

- [Fx.Position][]



[Element]: http://docs.mootools.net/Element/Element
[Fx]: http://docs.mootools.net/Fx/Fx
[Fx.CSS]: http://docs.mootools.net/Fx/Fx.CSS
[Fx.Position]: #Fx-Position