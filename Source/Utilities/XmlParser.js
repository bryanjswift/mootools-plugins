/*
Script: XmlParser.js
	Parse an xml document into a JavaScript object

License:
	MIT-style license. 
 */

/*extern $defined, $type, ActiveXObject, Class, DOMParser, MooTools */
if (typeof(MooTools.Utilities) === 'undefined') { MooTools.Utilities = {}; }
/**
 * @file XmlParser.js - dependent on mootools v1.2b2 or greater
 */
(function() {
	/**
	 * Class to wrap a data node from a parsed xml file
	 * @class DataNode
	 * @version 0.2
	 * @author bryanjswift
	 */
	var DataNode = function(val,attributes) {
	
		/**
		 * Value of the node represented by this object
		 * @variable {public Object} value
		 */
		this.value = null;
		/**
		 * Object containing the attributes of the node represented by this object
		 * @variable {public Object} attributes
		 */
		this.attributes = null;
		/**
		 * Creates an instance of DataNode
		 * @function {DataNode} initialize
		 * @param {Object} val to set as the value for this DataNode
		 * @... {String} val
		 * @... {Number} val
		 * @param {Object} attribs to set as the attributes for this DataNode
		 */
		this.initialize = function(val,attribs) {
			this.value = val;
			this.attributes = attribs;
		};
		/**
		 * Retrieves the attributes set on this DataNode
		 * @function {public Object} getAttributes
		 * @returns the attributes set onto this DataNode
		 */
		this.getAttributes = function() {
			return this.attributes;
		};
		/**
		 * Retrieves the value of this DataNode
		 * @function {public Object} getValue
		 * @returns the value of this DataNode
		 */
		this.getValue = function() {
			return this.value;
		};
		/**
		 * Updates the attributes of this DataNode
		 * @function {public void} setAttributes
		 * @param {Object} attribs to be set
		 */
		this.setAttributes = function(attribs) {
			if (attribs) {
				this.attributes = attribs;
			} else {
				throw new Error('attributes being set must be defined');
			}
		};
		/**
		 * Updates the value of this DataNode
		 * @function {public void} setValue
		 * @param {Object} val to be set
		 * @... {String} val
		 * @... {Number} val
		 */
		this.setValue = function(val) {
			if (val) {
				this.value = val;
			} else {
				throw new Error('value being set must be defined');
			}
		};
		/**
		 * Get a string representation of this DataNode
		 * @function {public String} toString
		 */
		this.toString = function() {
			return '' + this.getValue();
		};
	
		this.initialize(val,attributes);
	};

	/**
	 * Creates an XML document from a string
	 * @function {private Document} txtToXML
	 * @param {String} strXML - string of xml to be parsed into an xml document.
	 * @returns an xml document created from strXML
	 * @throws Error when the document can not be parsed due to
	 * an inability to create a parser or a failure to parse the string
	 */
	function textToXML(strXML) {
		var xmlDom, out;
		try {
			xmlDom = (document.all) ? new ActiveXObject("Microsoft.XMLDOM") : new DOMParser();
			xmlDom.async = false;
		} catch(e) {
			throw new Error("XML Parser could not be instantiated");
		}
		try {
			if(document.all) {
				out = (xmlDom.loadXML(strXML)) ? xmlDom : false;
			} else {
				out = xmlDom.parseFromString(strXML, "text/xml");
			}
		} catch(ex) {
			throw new Error("Error parsing XML string");
		}
		return out;
	}
	/**
	 * Get the first node in the list of nodes that is not a blank text node
	 * @function {private Element} getFirstChild
	 * @param {NodeList} children to search for a non-blank node
	 * @return the first node in children which is not a blank text node
	 */
	function getFirstChild(children) {
		var parserUndefined;	// putting parserUndefined in local scope to prevent bubbling up to global scope
		var child, childValue, tmpChild;
		var i = 0;
		var childrenLength = children.length;
		while (child === parserUndefined && i < childrenLength) {
			tmpChild = children[i];
			childValue = tmpChild.nodeValue;
			// replace(/^\s+|\s+$/g, '') is what the mootools String.trim function does
			// not using String.trim for performance reasons
			if (tmpChild.nodeType !== 3 || typeof childValue !== 'string' || childValue.replace(/^\s+|\s+$/g, '') !== '') {
				child = tmpChild;
			}
			i = i + 1;
		}
		return child;
	}
	/**
	 * Get a node's attributes as an object (attributeName -> attributeValue)
	 * @function {private Object} getAttributes
	 * @param {Element} node whose attributes should be parsed
	 * @returns object containing attribute names and values
	 */
	function getAttributes(node) {
		var i, nodeAttribute, attributeName, attributesLength;
		var attributes = {};
		var nodeAttributes = node.attributes;
		attributesLength = nodeAttributes.length;
		for (i = attributesLength - 1; i > -1; i = i - 1) {
			nodeAttribute = nodeAttributes[i];
			attributeName = nodeAttribute.nodeName.camelCase();
			attributes[attributeName] = nodeAttribute.nodeValue;
		}
		return attributes;
	}
	/**
	 * Convert passed node into an object and set it on the passed obj
	 * @function {private Object} populateObject
	 * @param {Object} obj to be popuplated
	 * @param {Element} node to be used to populate obj
	 * @returns obj after updating it with information from node
	 */
	function populateObject(obj, node) {
		var parserUndefined;	// putting parserUndefined in local scope to prevent bubbling up to global scope
		if (node === parserUndefined || node.nodeType === 8) { return; }
		var i, childObj, nodeObj, existingValue, attributes, tmpArray, childValue;
		var nodeName = node.nodeName.camelCase();
		var children = node.childNodes;
		var childrenLength = children.length;
		var child = getFirstChild(children);
		var childType = child ? child.nodeType : null;
		switch (childrenLength) {
			case 0:
				if (node.hasAttributes()) {
					attributes = getAttributes(node);
					nodeObj = {'attributes': attributes};
				} else {
					nodeObj = {};
				}
				break;
			case 1:
				switch (childType) {
					case 3:
					case 4:
						attributes = node.hasAttributes() ? getAttributes(node) : null;
						nodeObj = new DataNode(child.nodeValue,attributes);
						break;
					default:
						if (node.hasAttributes()) {
							attributes = getAttributes(node);
							nodeObj = {'attributes': attributes};
						} else {
							nodeObj = {};
						}
						populateObject(nodeObj,child);
						break;
				}
				break;
			default:
				if (node.hasAttributes()) {
					attributes = getAttributes(node);
					nodeObj = {'attributes': attributes};
				} else {
					nodeObj = {};
				}
				i = childrenLength;
				do {
					i = i - 1;
					child = children[i];
					childType = child.nodeType;
					childValue = child.nodeValue;
					// replace(/^\s+|\s+$/g, '') is what the mootools trim function does
					// not using String.trim for performance reasons
					if (childType !== 3 || typeof childValue !== 'string' || childValue.replace(/^\s+|\s+$/g, '') !== '') {
						populateObject(nodeObj,child);
					}
				} while (i);	// stops when i = 0 because 0 evaluates to false; this is a speed optimization and causes
															// this file to not pass jslint validation
				break;
		}
		if (obj[nodeName] === parserUndefined) {
			obj[nodeName] = nodeObj;
		} else if (obj[nodeName] !== parserUndefined && $type(obj[nodeName]) === 'array') {
			obj[nodeName].push(nodeObj);
		} else {
			// node is defined and node type is not an array
			existingValue = obj[nodeName];
			tmpArray = [];
			tmpArray.push(existingValue);
			tmpArray.push(nodeObj);
			obj[nodeName] = tmpArray;
		}
		return obj;
	}

	/**
	 * Class used to interact with xml data
	 * @class MooTools.Utilties.XmlParser
	 * @version 0.2
	 * @author bryanjswift
	 */
	MooTools.Utilities.XmlParser = new Class({
		/**
		 * The json object parsed from xmlDoc if the parsing has already been done
		 * @variable {public Object} jsonObj
		 */
		jsonObj: null,
		/**
		 * The xml document
		 * @variable {public Document} xmlDoc
		 */
		xmlDoc: null,
		/**
		 * Creates an instance of an XmlParser
		 * @function {MooTools.Utilities.XmlParser} initialize
		 */
		initialize: function (xml) {
			if (typeof xml === 'string') {
				this.xmlDoc = textToXML(xml);
			} else if (typeof xml === 'object' && xml.nodeType && xml.nodeType === 9) {
				this.xmlDoc = xml;
			} else {
				throw new Error("value passed to MooTools.Utilties.XmlParser is not xml");
			}
		},
		/**
		 * Get the json object representative of the given xml document
		 * @function {public Object} json
		 * @returns a json representation of xmlDoc
		 */
		json: function () {
			var tmpObj;
			if (!this.jsonObj) {
				tmpObj = {};
				if (!this.xmlDoc) { return null; }
				if (!this.xmlDoc.hasChildNodes()) { return tmpObj; }
				if (this.xmlDoc.nodeType === 9) {
					this.jsonObj = populateObject(tmpObj,getFirstChild(this.xmlDoc.childNodes));
				} else {
					throw new Error("xmlDoc is not a valid document");
				}
			}
			return this.jsonObj;
		},
		/**
		 * Get the XML document used by this XmlParser
		 * @function {public Document} xml
		 * @returns the XML document
		 */
		xml: function() {
			return this.xmlDoc;
		}
	});

}());

