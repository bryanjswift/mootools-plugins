/*
Script: XmlParser.js
	Examples for XmlParser.js

License:
	MIT-style license.
*/

var test;

describe('MooTools.Utilities.XmlParser.json', {

	'should return an object': function() {
		var xmlString = '<?xml version="1.0" encoding="UTF-8"?><bookstore><book><title>Shadow of the Wind</title><author>Julian Carax</author><price>$14.99</price></book><book><title>The Spy Who Came in From the Cold</title><author>No Idea</author><price>$10.99</price></book><employee><name>Bryan</name><title>Clerk</title></employee></bookstore>';
		var parser = new MooTools.Utilities.XmlParser(xmlString);
		value_of(typeof parser).should_be('object');
		value_of(typeof parser.xmlDoc).should_be('object');
	},

	'object should have multiple book elements in bookstore': function() {
		var xmlString = '<?xml version="1.0" encoding="UTF-8"?><bookstore><book><title>Shadow of the Wind</title><author>Julian Carax</author><price>$14.99</price></book><book><title>The Spy Who Came in From the Cold</title><author>No Idea</author><price>$10.99</price></book><employee><name>Bryan</name><title>Clerk</title></employee></bookstore>';
		var parser = new MooTools.Utilities.XmlParser(xmlString);
		var jsonObj = test = parser.json();
		value_of(!!jsonObj.bookstore).should_be(true);
		value_of($type(jsonObj.bookstore)).should_be('object');
		value_of(!!jsonObj.bookstore.book).should_be(true);
		value_of($type(jsonObj.bookstore.book)).should_be('array');
	}

});
