var MooBuilder = function(coreBasePath,moreBasePath) {
	// setup vars
	this.coreBasePath = coreBasePath.match(/\/$/) ? coreBasePath : coreBasePath + '/';
	this.moreBasePath = moreBasePath.match(/\/$/) ? moreBasePath : moreBasePath + '/';
	this.included = [];
	this.registered = {};
	// private functions
	function writeScript(path,script) {
		var elm = document.createElement('script');
		elm.setAttribute('type','text/javascript');
		elm.setAttribute('src',path);
		document.getElementsByTagName('head')[0].appendChild(elm);
		this.included[this.included.length] = script;
		elm = null;
	}
	function includeDeps(found,script) {
		var deps = found.deps;
		var depsLength = deps.length;
		var i;
		for (i = 0; i < depsLength; i = i + 1) {
			if (deps[i] !== script && deps[i] !== 'None') {
				this.include(deps[i]);
			}
		}
		return found;
	}
	function includeFrom(meta,basePath,script) {
		var found = false;
		var group, name, i, metaGroup;
		for (group in meta) {
			if (meta.hasOwnProperty(group)) {
				metaGroup = meta[group];
				for (name in metaGroup) {
					if (metaGroup.hasOwnProperty(name)) {
						if (name === script) {
							found = metaGroup[name];
							break;
						}
					}
				}
			}
			if (found) { break; }
		}
		if (!found) {
			return found;
		}
		includeDeps.call(this,found,script);
		var path = basePath + group + '/' + script + '.js';
		writeScript.call(this,path,script);
		return !!found;
	}
	function includeRegistered(script) {
		var found, group, name, elm;
		var meta = this.registered;
		for (name in meta) {
			if (script === name) {
				found = meta[name];
			}
		}
		if (!found) {
			return found;
		}
		includeDeps.call(this,found,script);
		writeScript.call(this,found.path,script);
		return !!found;
	}
	function searchForIncludes(meta) {
		var found, group, name, metaGroup;
		for (group in meta) {
			if (meta.hasOwnProperty(group)) {
				metaGroup = meta[group];
				for (name in metaGroup) {
					if (metaGroup.hasOwnProperty(name)) {
						found = metaGroup[name];
						if (found.test()) {
							this.included[this.included.length] = name;
						}
					}
				}
			}
		}
	}
	function searchRegistered(meta) {
		var found, group, name;
		for (name in meta) {
			if (meta.hasOwnProperty(name)) {
				found = meta[name];
				if (found.test()) {
					this.included[this.included.length] = name;
				}
			}
		}
	}
	searchForIncludes.call(this,this.CoreMeta);
	searchForIncludes.call(this,this.MoreMeta);
	searchRegistered.call(this,this.registered);
	// define functions
	this.include = function(script,onInclude,onError) {
		if (this.isIncluded(script)) { return; }
		var found = includeFrom.call(this,this.CoreMeta,this.coreBasePath,script);
		if (!found) { found = includeFrom.call(this,this.MoreMeta,this.moreBasePath,script); }
		if (!found) { found = includeRegistered.call(this,script); }
		if (found) {
			if (typeof onInclude === 'function') { onInclude(); }
		} else {
			if (typeof onError === 'function') { onError(); }
		}
	};
	this.isIncluded = function(script) {
		var included = this.included;
		var length = included.length;
		var i;
		for (i = 0; i < length; i = i + 1) {
			if (included[i] === script) { return true; }
		}
		return false;
	};
	this.register = function(script) {
		// { name: 'scriptName', deps: ['script','deps'], test: function() { this is my test }, path: '/path/to/script.js' }
		if (!this.isIncluded(script)) {
			this.registered[script.name] = script;
			return true;
		} else {
			return false;
		}
	};
};

MooBuilder.prototype.CoreMeta = {
	"Core": {
		"Core": {
			"deps": ["Core"],
			"test": function() { return typeof MooTools !== "undefined"; }
		},
		"Browser": {
			"deps": ["Core"],
			"test": function() { return typeof Browser !== "undefined" && typeof Browser.Engine !== "undefined"; }
		}
	},
	"Native": {
		"Array": {
			"deps": ["Core"],
			"test": function() { return typeof Array.associate !== "undefined"; }
		},
		"Function": {
			"deps": ["Core"],
			"test": function() { return typeof Function.run !== "undefined"; }
		},
		"Number": {
			"deps": ["Core"],
			"test": function() { return typeof Number.limit !== "undefined"; }
		},
		"String": {
			"deps": ["Core"],
			"test": function() { return typeof String.camelCase !== "undefined"; }
		},
		"Hash": {
			"deps": ["Core"],
			"test": function() { return typeof Hash !== "undefined"; }
		},
		"Event": {
			"deps": ["Browser", "Array", "Function", "Number", "String", "Hash"],
			"test": function() { return !!Event && typeof Event.Keys !== "undefined"; }
		}
	},
	"Class": {
		"Class": {
			"deps": ["Core", "Array", "String", "Function", "Number", "Hash"],
			"test": function() { return typeof Class !== "undefined"; }
		},
		"Class.Extras": {
			"deps": ["Class"],
			"test": function() { return typeof Chain !== "undefined"; }
		}
	},
	"Element": {
		"Element": {
			"deps": ["Browser", "Array", "String", "Function", "Number", "Hash"],
			"test": function() { return typeof Element !== "undefined" && typeof Elements !== "undefined"; }
		},
		"Element.Event": {
			"deps": ["Element", "Event"],
			"test": function() { return typeof Element.NativeEvents !== "undefined"; }
		},
		"Element.Style": {
			"deps": ["Element"],
			"test": function() { return typeof Element.Styles !== "undefined"; }
		},
		"Element.Dimensions": {
			"deps": ["Element"],
			"test": function() { return typeof getCoordinates !== "undefined"; }
		}
	},
	"Utilities": {
		"Selectors": {
			"deps": ["Element"],
			"test": function() { return typeof Selectors !== "undefined" && typeof Selectors.RegExps !== "undefined"; }
		},
		"DomReady": {
			"deps": ["Element.Event"],
			"test": function() { return typeof Element !== "undefined" && typeof Element.Events !== "undefined" && typeof Element.Events.domready !== "undefined"; }
		},
		"JSON": {
			"deps": ["Array", "String", "Function", "Number", "Hash"],
			"test": function() { return typeof JSON !== "undefined"; }
		},
		"Cookie": {
			"deps": ["Browser", "Class.Extras"],
			"test": function() { return typeof Cookie !== "undefined"; }
		},
		"Swiff": {
			"deps": ["Element.Event"],
			"test": function() { return typeof Swiff !== "undefined"; }
		}
	},
	"Fx": {
		"Fx": {
			"deps": ["Class.Extras"],
			"test": function() { return typeof Fx !== "undefined"; }
		},
		"Fx.CSS": {
			"deps": ["Fx", "Element.Style"],
			"test": function() { return typeof Fx !== "undefined" && typeof Fx.CSS !== "undefined"; }
		},
		"Fx.Tween": {
			"deps": ["Fx.CSS"],
			"test": function() { return typeof Fx !== "undefined" && typeof Fx.Tween !== "undefined"; }
		},
		"Fx.Morph": {
			"deps": ["Fx.CSS"],
			"test": function() { return typeof Fx !== "undefined" && typeof Fx.Morph !== "undefined"; }
		},
		"Fx.Transitions": {
			"deps": ["Fx"],
			"test": function() { return typeof Fx !== "undefined" && typeof Fx.Transitions !== "undefined"; }
		}
	},
	"Request": {
		"Request": {
			"deps": ["Class.Extras"],
			"test": function() { return typeof Request !== "undefined"; }
		},
		"Request.HTML": {
			"deps": ["Request"],
			"test": function() { return typeof Request !== "undefined" && typeof Request.HTML !== "undefined"; }
		},
		"Request.JSON": {
			"deps": ["Request", "JSON"],
			"test": function() { return typeof Request !== "undefined" && typeof Request.JSON !== "undefined"; }
		}
	}
};

MooBuilder.prototype.MoreMeta = {
	"Fx": {
		"Fx.Slide": {
			"deps": ["Fx", "Element.Style"],
			"test": function() { return typeof Fx !== "undefined" && typeof Fx.Slide !== "undefined"; }
		},
		"Fx.Scroll": {
			"deps": ["Fx", "Element.Event", "Element.Dimensions"],
			"test": function() { return typeof Fx !== "undefined" && typeof Fx.Scroll !== "undefined"; }
		},
		"Fx.Elements": {
			"deps": ["Fx.CSS"],
			"test": function() { return typeof Fx !== "undefined" && typeof Fx.Elements !== "undefined"; }
		}
	},
	"Drag": {
		"Drag": {
			"deps": ["Class.Extras", "Element.Event", "Element.Style"],
			"test": function() { return typeof Drag !== "undefined"; }
		},
		"Drag.Move": {
			"deps": ["Drag", "Element.Dimensions"],
			"test": function() { return typeof Drag !== "undefined" && typeof Drag.Move !== "undefined"; }
		}
	},
	"Utilities": {
		"Hash.Cookie": {
			"deps": ["Cookie"],
			"test": function() { return typeof Hash !== "undefined" && typeof Hash.Cookie !== "undefined"; }
		},
		"Color": {
			"deps": ["Core", "Array", "String", "Function", "Number", "Hash"],
			"test": function() { return typeof Color !== "undefined"; }
		},
		"Group": {
			"deps": ["Class"],
			"test": function() { return typeof Group !== "undefined"; }
		},
		"Assets": {
			"deps": ["Hash"],
			"test": function() { return typeof Asset !== "undefined"; }
		}
	},
	"Interface": {
		"Sortables": {
			"deps": ["Drag.Move"],
			"test": function() { return typeof Sortables !== "undefined"; }
		},
		"Tips": {
			"deps": ["Class.Extras"],
			"test": function() { return typeof Tips !== "undefined"; }
		},
		"SmoothScroll": {
			"deps": ["Fx.Scroll"],
			"test": function() { return typeof SmoothScroll !== "undefined"; }
		},
		"Slider": {
			"deps": ["Drag"],
			"test": function() { return typeof Slider !== "undefined"; }
		},
		"Scroller": {
			"deps": ["Class.Extras"],
			"test": function() { return typeof Scroller !== "undefined"; }
		},
		"Accordion": {
			"deps": ["Fx.Elements"],
			"test": function() { return typeof Accordion !== "undefined"; }
		}
	}
};
