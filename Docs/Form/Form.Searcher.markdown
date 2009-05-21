Class: Form.Searcher {#Form.Searcher}
====================

Class to quickly search through data using a text input field's value as the substring to search for

### Syntax:

	var searcher = new Form.Searcher(field,results[, options]);

### Arguments:

1. field - (*mixed*) A string ID of the Element or an Element to use for the substring value
1. results - (*mixed*) A string ID of the Element or an Element which wraps the results list (has a ul child)
1. options - (*object*, optional) The options object

### Options:

* matchOptions - (*object*) events to pass to [Form.Searcher.Match][]
* scrollCount - (*Number*) 