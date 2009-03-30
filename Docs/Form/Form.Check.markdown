Class: Form.Check {#Form-Check}
=================

Class to represent a checkbox



Form.Check Method: constructor {#Form-Check:constructor}
------------------------------

### Syntax:

	var check = new Form.Check(element[, options]);

### Arguments:

1. element - (*mixed*) The id of a DOM element, a DOM element, or an [Element][]
1. options - (*object*, optional) the configuration options for the styled check element

### Options:

* checked							- (*boolean* defaults to false) true if the option starts checked
* disabled						- (*boolean* defaults to false) true if the option starts disabled

### Events:

* onCreate						- (*function*) Fired just before initialize finishes
* onDisable						- (*function*) Fired when the check element is disabled
* onEnable						- (*function*) Fired when the check element is enabled
* onHighlight					- (*function*) Fired when the check element is mouse over
* onRemoveHighlight		- (*function*) Fired when the a mouse out event occurs on the check elemet
* onCheck							- (*function*) Fired when the input becomes checked
* onUncheck						- (*function*) Fired when the input becomes unchecked
* onChange						- (*function*) Fired when the input element changes from checked to unchecked

### Returns:

* (*object*) a new Form.Check object

### Examples:

	var check = new Form.Check(document.getElement('input[type=checkbox]'));

### Notes:

- Form.Check is stored on element as 'Form.Check::data' and can be retrieved with that key


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

Toggles the checked state of the checkbox

### Syntax:

	check.toggle();



[Element]: http://mootools.net/docs/Element/Element
[Form.Check]: #Form.Check
