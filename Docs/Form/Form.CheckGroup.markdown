Class: Form.CheckGroup {#Form-CheckGroup}
=================

Class to represent a group of checkboxes



Form.CheckGroup Method: constructor {#Form-CheckGroup:construcor}
-----------------------------------

Creates or holds a group of Form.Check by looking for all input[type=checkbox] under the element passed to the constructor.

### Syntax:

	var checkGroup = new Form.CheckGroup(element[, options]);

### Arguments:

1. element						- (*mixed*) The id of a DOM element, a DOM element, or an [Element][] in which to look for checkbox inputs
1. options						- (*object*, optional) the configuration options for the styled check element

### Options:

* checkOptions				- (*object* defaults to empty object) passed to the Form.Check objects which get created
* initialValues				- (*object* defaults to empty object) checked whenever a check is added to help determine whether the [Form.Check][] should start checked

### Events:

* disable							- (*function*) fired when Form.CheckGroup.disable is called
* enable							- (*function*) fired when Form.CheckGroup.enable is called

### Returns:

* (*object*) a new Form.CheckGroup object

### Examples:

	var checkOpts = {onChange:function(check) { check.toggle(); }};
	var checkGroup = new Form.CheckGroup(document.getElement('div.checks'),{checkOptions:checkOpts});



Form.CheckGroup Method: addCheck {#Form-CheckGroup:addCheck}
--------------------------------

Adds a checkbox stored on the passed element or by creating one from it

### Syntax:

	var element = new Element('input',{type:'checkbox'});
	checkGroup.addCheck(element);

### Arguments:

1. checkbox						- (*Element*) [Element][] from which to retrieve the Form.Check object or from which to create a Form.CHeck



Form.CheckGroup Method: checkAll {#Form-CheckGroup:checkAll}
--------------------------------

Mark all Form.Check objects in this Form.CheckGroup as checked

### Syntax:

	myCheckGroup.checkAll();



Form.CheckGroup Method: disable {#Form-CheckGroup:disable}
-------------------------------

Mark all Form.Check objects in this Form.CheckGroup as disabled

### Syntax:

	myCheckGroup.disable();



Form.CheckGroup Method: enable {#Form-CheckGroup:enable}
--------------------------------

Mark all Form.Check objects in this Form.CheckGroup as enabled

### Syntax:

	myCheckGroup.enable();



Form.CheckGroup Method: uncheckAll {#Form-CheckGroup:uncheckAll}
-------------------------------

Mark all Form.Check objects in this Form.CheckGroup as not checked

### Syntax:

	myCheckGroup.uncheckAll();



[Element]: http://mootools.net/docs/Element/Element
[Form.CheckGroup]: #Form.CheckGroup
[Form.Check]: /Form/Form.Check