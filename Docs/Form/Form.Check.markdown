Class: Form.Check {#Form-Check}
=================

Class to represent a checkbox

### Implements:

Events, Options

### Syntax:

	var check = new Form.Check(element[, options]);

### Arguments:

1. element - (*mixed*) The id of a DOM element, a DOM element, or an [Element][]
1. options - (*object*, optional) the configuration options for the styled check element

### Options:

* checked - (*boolean* defaults to false) true if the option starts checked
* disabled - (*boolean* defaults to false) true if the option starts disabled

### Events:

* change - (*function*) Fired when the input element changes from checked to unchecked via toggle
* check - (*function*) Fired when the input becomes checked
* create - (*function*) Fired just before initialize finishes
* disable - (*function*) Fired when the check element is disabled
* enable - (*function*) Fired when the check element is enabled
* highlight - (*function*) Fired when the check element is mouse over
* removeHighlight - (*function*) Fired when the a mouse out event occurs on the check element
* uncheck - (*function*) Fired when the input becomes unchecked

### Configuration:

Can only be changed by altering source or subclassing.

* checkedClass - (*string*) added to the div when checked. Value is 'checked'
* disabledClass - (*string*) added to the div when disabed. Value is 'disabled'
* elementClass - (*string*) added to the div when created. Value is 'check'
* highlightedClass - (*string*) added to the div when highlighted. Value is 'highlighted'
* storage - (*string*) key used for element storage on the input passed to Form.Check constructor. Value is 'Form.Check::data'

### Returns:

* (*object*) a new Form.Check object

### Examples:

	var check = new Form.Check(document.getElement('input[type=checkbox]'));



Form.Check Method: check {#Form-Check:check}
------------------------

Sets the checkbox to it's checked state

### Syntax

	check.check();



Form.Check Method: disable {#Form-Check:disable}
--------------------------

Sets the checkbox to it's disabled state

### Syntax:

	check.disable();



Form.Check Method: enable {#Form-Check:enable}
-------------------------

Sets the checkbox to it's enabled state

### Syntax:

	check.enable();



Form.Check Method: highlight {#Form-Check:highlight}
----------------------------

Puts the checkbox into it's highlighted state

### Syntax:

	check.highlight();



Form.Check Method: removeHighlight {#Form-Check:removeHighlight}
----------------------------------

Takes the checkbox out of it's highlighted state

### Syntax:

	check.removeHighlight();



Form.Check Method: toggle {#Form-Check:toggle}
-------------------------

Toggles the checked state of the checkbox by calling [check](#Form-Check:check) or [uncheck](#Form-Check:uncheck) as appropriate. Does nothing if disabled

### Syntax:

	check.toggle();

### Returns:

The Form.Check instance



Form.Check Method: uncheck {#Form-Check:uncheck}
--------------------------

Sets the checkbox to it's unchecked state

### Syntax

	check.uncheck();



[Element]: http://mootools.net/docs/Element/Element
