var MooBuilder = function(coreBasePath,moreBasePath) {
	// setup vars
	this.coreBasePath = coreBasePath.match(/\/$/) ? coreBasePath : coreBasePath + '/';
	this.moreBasePath = moreBasePath.match(/\/$/) ? moreBasePath : moreBasePath + '/';
	this.included = [];
	function includeFrom(meta,basePath,script) {
		if (this.isIncluded(script)) { return; }
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
		var deps = found.deps;
		var depsLength = deps.length;
		for (i = 0; i < depsLength; i = i + 1) {
			if (deps[i] !== script && deps[i] !== 'None') {
				this.include(deps[i]);
			}
		}
		var path = basePath + group + '/' + script + '.js';
		var elm = document.createElement('script');
		elm.setAttribute('type','text/javascript');
		elm.setAttribute('src',path);
		document.getElementsByTagName('head')[0].appendChild(elm);
		this.included[this.included.length] = script;
		elm = null;
		return !!found;
	}
	// define functions
	this.include = function(script,onInclude,onError) {
		var found = includeFrom.call(this,this.CoreMeta,this.coreBasePath,script);
		if (!found) { found = includeFrom.call(this,this.MoreMeta,this.moreBasePath,script); }
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
		if (!this.isIncluded(script)) { this.included[this.included.length] = script; }
	};
};

MooBuilder.prototype.CoreMeta = {
	"Core": {
		"Core": {
			"deps": ["Core"]
		},
		"Browser": {
			"deps": ["Core"]
		}
	},
	"Native": {
		"Array": {
			"deps": ["Core"]
		},
		"Function": {
			"deps": ["Core"]
		},
		"Number": {
			"deps": ["Core"]
		},
		"String": {
			"deps": ["Core"]
		},
		"Hash": {
			"deps": ["Core"]
		},
		"Event": {
			"deps": ["Browser", "Array", "Function", "Number", "String", "Hash"]
		}
	},
	"Class": {
		"Class": {
			"deps": ["Core", "Array", "String", "Function", "Number", "Hash"]
		},
		"Class.Extras": {
			"deps": ["Class"]
		}
	},
	"Element": {
		"Element": {
			"deps": ["Browser", "Array", "String", "Function", "Number", "Hash"]
		},
		"Element.Event": {
			"deps": ["Element", "Event"]
		},
		"Element.Style": {
			"deps": ["Element"]
		},
		"Element.Dimensions": {
			"deps": ["Element"]
		}
	},
	"Utilities": {
		"Selectors": {
			"deps": ["Element"]
		},
		"DomReady": {
			"deps": ["Element.Event"]
		},
		"JSON": {
			"deps": ["Array", "String", "Function", "Number", "Hash"]
		},
		"Cookie": {
			"deps": ["Browser", "Class.Extras"]
		},
		"Swiff": {
			"deps": ["Element.Event"]
		}
	},
	"Fx": {
		"Fx": {
			"deps": ["Class.Extras"]
		},
		"Fx.CSS": {
			"deps": ["Fx", "Element.Style"]
		},
		"Fx.Tween": {
			"deps": ["Fx.CSS"]
		},
		"Fx.Morph": {
			"deps": ["Fx.CSS"]
		},
		"Fx.Transitions": {
			"deps": ["Fx"]
		}
	},
	"Request": {
		"Request": {
			"deps": ["Class.Extras"]
		},
		"Request.HTML": {
			"deps": ["Request"]
		},
		"Request.JSON": {
			"deps": ["Request", "JSON"]
		}
	},
	"Plugins": {
		"Fx.Slide": {
			"deps": ["Fx", "Element.Style"]
		},
		"Fx.Scroll": {
			"deps": ["Fx", "Element.Event", "Element.Dimensions"]
		},
		"Drag": {
			"deps": ["Class.Extras", "Element.Event", "Element.Style"]
		},
		"Drag.Move": {
			"deps": ["Drag", "Element.Dimensions"]
		},
		"Color": {
			"deps": ["Core", "Array", "String", "Function", "Number", "Hash"]
		},
		"Group": {
			"deps": ["Class.Extras"]
		},
		"Hash.Cookie": {
			"deps": ["Class.Extras", "Cookie", "JSON"]
		},
		"Sortables": {
			"deps": ["Drag.Move"]
		},
		"Tips": {
			"deps": ["Class.Extras", "Element.Event", "Element.Style", "Element.Dimensions"]
		},
		"SmoothScroll": {
			"deps": ["Fx.Scroll"]
		},
		"Slider": {
			"deps": ["Drag", "Element.Dimensions"]
		},
		"Scroller": {
			"deps": ["Class.Extras", "Element.Event", "Element.Dimensions"]
		},
		"Assets": {
			"deps": ["Element.Event"]
		}
	}
};

MooBuilder.prototype.MoreMeta = {
	"Fx": {
		"Fx.Slide": {
			"deps": ["Fx.CSS"]
		},
		"Fx.Scroll": {
			"deps": ["Fx.CSS"]
		},
		"Fx.Elements": {
			"deps": ["Fx.CSS"]
		}
	},
	"Drag": {
		"Drag": {
			"deps": ["Class.Extras","Element"]
		},
		"Drag.Move": {
			"deps": ["Drag"]
		}
	},
	"Utilities": {
		"Hash.Cookie": {
			"deps": ["Cookie"]
		},
		"Color": {
			"deps": ["Core"]
		},
		"Group": {
			"deps": ["Class"]
		},
		"Assets": {
			"deps": ["Hash"]
		}
	},
	"Interface": {
		"Sortables": {
			"deps": ["Drag.Move"]
		},
		"Tips": {
			"deps": ["Class.Extras"]
		},
		"SmoothScroll": {
			"deps": ["Fx.Scroll"]
		},
		"Slider": {
			"deps": ["Drag"]
		},
		"Scroller": {
			"deps": ["Class.Extras"]
		},
		"Accordion": {
			"deps": ["Fx.Elements"]
		}
	}
};
