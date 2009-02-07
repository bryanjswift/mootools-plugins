Class: SelectOption {#SelectOption}
===================

Class to represent option elements in a styled select or multi-select element

### Syntax:

	var selectOption = new StyledForm.SelectOption(element[, options]);

### Arguments:

1. element - (*mixed*) The id of a DOM element, a DOM element, or an [Element][]
1. options - (*object*, optional) the configuration options for the styled option element

### Options:

* optionClass					- (*string*: defaults to 'option') class to add to the new element to display
* optionTag						- (*string*: defaults to 'li') type of element used to mimic an option element
* selected						- (*boolean*: defaults to false) true if this option starts selected
* selectedClass				- (*string*: defaults to 'selected') string to add to the new element when this SelectOption is selected
* storageName					- (*string*: defaults to 'optionData') string which can be used to retrieve SelectOption from the new element

### Returns:

* (*object*) a new SelectOption

### Examples:

Create a new select option

	var selectOption = new StyledForm.SelectOption(document.getElement('option'));



SelectOption Method: deselect {#SelectOption:deselect}
-----------------------------

Sets the SelectOption to an unselected state

### Syntax:

	option.deselect();



SelectOption Method: destroy {#SelectOption:destroy}
----------------------------

Sets element references to null and prepares for document unload

### Syntax:

	option.destroy();



SelectOption Method: select {#SelectOption:select}
---------------------------

Sets the SelectOption to a selected state

### Syntax:

	option.select();



[Element]: http://mootools.net/docs/Element/Element
[SelectOption]: #SelectOption
