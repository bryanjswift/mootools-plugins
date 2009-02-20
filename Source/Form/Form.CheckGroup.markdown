Class: Form.CheckGroup {#Form.CheckGroup}
=================

Class to represent a group of checkboxes



Form.CheckGroup Method: constructor {#Form-CheckGroup:construcor}
-----------------------------------

### Syntax:

	var check = new Form.CheckGroup(element[, options]);

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

	var check = new Form.Check(document.getElement('input[type=checkbox]));