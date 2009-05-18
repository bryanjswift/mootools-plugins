Class: Form.Radio {#Form-Radio}
=================

Class to represent a radio button

### Extends:

- [Form.Check][]

### Syntax:

	var check = new Form.Radio(element[, options]);

### Arguments:

1. element - (*mixed*) The id of a DOM element, a DOM element, or an [Element][]
1. options - (*object*, optional) the configuration options for the styled check element

### Configuration:

Can only be changed by altering source or subclassing.

* elementClass - (*string*) added to the div when created. Value is 'radio'
* storage - (*string*) key used for element storage on the input passed to Form.Check constructor. Value is 'Form.Radio::data'

### Returns:

* (*object*) a new Form.Radio object

### Examples:

	var check = new Form.Check(document.getElement('input[type=checkbox]'));

### See Also:

- [Form.Check][]



[Element]: http://mootools.net/docs/Element/Element
[Form.Check]: /Form/Form.Check