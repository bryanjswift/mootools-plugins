Class: Form.RadioGroup {#Form-RadioGroup}
=================

Class to represent a group of checkboxes

Creates or holds a group of Form.Radio by looking for all input[type=radio] under the element passed to the constructor.

### Syntax:

	var RadioGroup = new Form.RadioGroup(element[, options]);

### Arguments:

1. element - (*mixed*) The id of a DOM element, a DOM element, or an [Element][] in which to look for checkbox inputs
1. options - (*object*, optional) the configuration options for the styled check element

### Options:

* checkOptions - (*object* defaults to empty object) passed to the Form.Radio objects which get created
* initialValues - (*object* defaults to empty object) checked whenever a check is added to help determine whether the [Form.Radio][] should start checked

### Events:

* disable - (*function*) fired when Form.RadioGroup.disable is called
* enable - (*function*) fired when Form.RadioGroup.enable is called

### Returns:

* (*object*) a new Form.RadioGroup object

### Examples:

	var checkOpts = {onChange:function(check) { check.toggle(); }};
	var RadioGroup = new Form.RadioGroup(document.getElement('div.checks'),{checkOptions:checkOpts});



Form.RadioGroup Method: addCheck {#Form-RadioGroup:addCheck}
--------------------------------

Adds a checkbox stored on the passed element or by creating one from it

### Syntax:

	var element = new Element('input',{type:'checkbox'});
	RadioGroup.addCheck(element);

### Arguments:

1. checkbox - (*Element*) [Element][] from which to retrieve the Form.Radio object or from which to create a Form.CHeck



Form.RadioGroup Method: checkAll {#Form-RadioGroup:checkAll}
--------------------------------

Mark all Form.Radio objects in this Form.RadioGroup as checked

### Syntax:

	myRadioGroup.checkAll();



Form.RadioGroup Method: disable {#Form-RadioGroup:disable}
-------------------------------

Mark all Form.Radio objects in this Form.RadioGroup as disabled

### Syntax:

	myRadioGroup.disable();



Form.RadioGroup Method: enable {#Form-RadioGroup:enable}
--------------------------------

Mark all Form.Radio objects in this Form.RadioGroup as enabled

### Syntax:

	myRadioGroup.enable();



Form.RadioGroup Method: uncheckAll {#Form-RadioGroup:uncheckAll}
-------------------------------

Mark all Form.Radio objects in this Form.RadioGroup as not checked

### Syntax:

	myRadioGroup.uncheckAll();



[Element]: http://mootools.net/docs/Element/Element
[Form.RadioGroup]: #Form.RadioGroup
[Form.Radio]: /Form/Form.Radio