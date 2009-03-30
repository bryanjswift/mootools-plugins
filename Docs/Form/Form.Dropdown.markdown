Class: Form.Dropdown {#Form.Dropdown}
====================

Class to represent a stylized dropdown or select box

### Implements:

Events, Options



Form.Dropdown Method: constructor {#Form.Dropdown:constructor}
---------------------------------

### Syntax:

	var myForm.Dropdown = new Form.Dropdown(select, options);

### Arguments:

1. select							- (*mixed*) The id of a select element, a select element, or an [Element][]
2. options						- (*object*, optional) the configuration options for the styled dropdown element

### Options:

* excludedValues			- (*array* defaults to []) values of options to be ignored when executing keyboard search of options
* initialValue				- (*string* defaults to null) value of the option selected by default
* mouseLeaveDelay			- (*number* defaults to 350) how long to wait before closing the dropdown after the mouse leaves it when open
* selectOptions				- (*object* defaults to {}) options to pass to Form.SelectOption when they are being created
* typeDelay						- (*number* defaults to 500) how long to wait before the next keypress can be treated as 'not in sequence'

### Events:

* collapse						- (*function*) fired when the dropdown list is closing. signature is (instance,triggering event)
* disable							- (*function*) fired when the dropdown becomes disabled. signature is (instance)
* enable							- (*function*) fired when the dropdown becomes enabled. signature is (instance)
* expand							- (*function*) fired when the dropdown list is opening. signature is (instance,triggering event)
* select							- (*function*) fired when an option is selected. signature is (Form.SelectOption selected,instance)
* change							- (*function*) fired when the value selected is different from the currently selected option. signature is (instance,triggering event)

### Returns:

* (*object*) a new Form.Dropdown instance

### Examples:

	var dropdown = new Form.Dropdown(document.getElement('select'));



Form.Dropdown Method: initializeCreateElements {#Form.Dropdown:initializeCreateElements}
----------------------------------------------

Create the elements which wrap or replace the select element. For internal use.



Form.Dropdown Method: collapse {#Form.Dropdown:collapse}
------------------------------

Method to close the list of options

### Syntax:

	dropdown.collapse();

### Arguments:

1. e - (*event*) event triggering the collapse call


Form.Dropdown Method: deselect {#Form.Dropdown:deselect}
---------------------------------------------------------


### Syntax:



### Arguments:

1. option - (**)


Form.Dropdown Method: destroy {#Form.Dropdown:destroy}
-------------------------------------------------------


### Syntax:




Form.Dropdown Method: disable {#Form.Dropdown:disable}
-------------------------------------------------------


### Syntax:




Form.Dropdown Method: enable {#Form.Dropdown:enable}
-----------------------------------------------------


### Syntax:




Form.Dropdown Method: expand {#Form.Dropdown:expand}
-----------------------------------------------------


### Syntax:



### Arguments:

1. e - (**)


Form.Dropdown Method: focus {#Form.Dropdown:focus}
---------------------------------------------------


### Syntax:



### Arguments:

1. e - (**)


Form.Dropdown Method: foundMatch {#Form.Dropdown:foundMatch}
-------------------------------------------------------------


### Syntax:



### Arguments:

1. e - (**)

### Returns:





Form.Dropdown Method: highlightOption {#Form.Dropdown:highlightOption}
-----------------------------------------------------------------------


### Syntax:



### Arguments:

1. option - (**)


Form.Dropdown Method: keydown {#Form.Dropdown:keydown}
-------------------------------------------------------


### Syntax:



### Arguments:

1. e - (**)

### Returns:





Form.Dropdown Method: keypress {#Form.Dropdown:keypress}
---------------------------------------------------------


### Syntax:



### Arguments:

1. e - (**)

### Returns:





Form.Dropdown Method: mouseenterDropdown {#Form.Dropdown:mouseenterDropdown}
-----------------------------------------------------------------------------


### Syntax:




Form.Dropdown Method: mouseleaveDropdown {#Form.Dropdown:mouseleaveDropdown}
-----------------------------------------------------------------------------


### Syntax:




Form.Dropdown Method: mousemove {#Form.Dropdown:mousemove}
-----------------------------------------------------------


### Syntax:




Form.Dropdown Method: removeHighlightOption {#Form.Dropdown:removeHighlightOption}
-----------------------------------------------------------------------------------


### Syntax:



### Arguments:

1. option - (**)


Form.Dropdown Method: resetTyped {#Form.Dropdown:resetTyped}
-------------------------------------------------------------


### Syntax:



### Returns:





Form.Dropdown Method: select {#Form.Dropdown:select}
-----------------------------------------------------


### Syntax:



### Arguments:

1. option - (**)
2. e - (**)


Form.Dropdown Method: toggle {#Form.Dropdown:toggle}
-----------------------------------------------------


### Syntax:



### Arguments:

1. e - (**)



[Element]: http://mootools.net/docs/Element/Element
[Form.Check]: #Form-Check
