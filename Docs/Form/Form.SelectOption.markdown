Class: Form.SelectOption {#Form.SelectOption}
========================

Class to represent option elements in a styled select or multi-select element

### Syntax:

	var selectOption = new Form.SelectOption(element[, options]);

### Arguments:

1. element - (*mixed*) The id of a DOM element, a DOM element, or an [Element][]
1. options - (*object*, optional) the configuration options for the styled option element

### Options:

* optionTag						- (*string*: defaults to 'li') type of element used to mimic an option element
* selected						- (*boolean*: defaults to false) true if this option starts selected

### Events:

* onDeselect					- (*function*) Fired when the option is explicitly deselected
* onDisable						- (*function*) Fired when the option is disabled
* onEnable						- (*function*) Fired when the option is enabled
* onHighlight					- (*function*) Fired when the option is highlighted
* onRemoveHighlight		- (*function*) Fired when the option's highlight is removed
* onSelect						- (*function*) Fired when the option gets selected

### Returns:

* (*object*) a new Form.SelectOption

### Examples:

Create a new select option

	var selectOption = new Form.SelectOption(document.getElement('option'));



Form.SelectOption Method: deselect {#Form.SelectOption:deselect}
----------------------------------

Sets the SelectOption to an unselected state

### Syntax:

	option.deselect();



Form.SelectOption Method: destroy {#Form.SelectOption:destroy}
---------------------------------

Sets element references to null and prepares for document unload

### Syntax:

	option.destroy();



Form.SelectOption Method: disable {#Form.SelectOption:disable}
---------------------------------

Removes mouse events from the option element

### Syntax:

	option.disable();


Form.SelectOption Method: enable {#Form.SelectOption:enable}
--------------------------------

Adds mouse events to the option element

### Syntax:

	option.enable();



Form.SelectOption Method: highlight {#Form.SelectOption:highlight}
-----------------------------------

Updates object state to signify being highlighted

### Syntax:

	option.highlight();



Form.SelectOption Method: removeHighlight {#Form.SelectOption:removeHighlight}

Updates object state to signify default state

### Syntax:

	option.removeHighlight();



Form.SelectOption Method: select {#Form.SelectOption:select}
--------------------------------

Sets the SelectOption to a selected state

### Syntax:

	option.select();



[Element]: http://mootools.net/docs/Element/Element
[Form.SelectOption]: #Form.SelectOption
