/* Requires at least Class and Class.Extras to already be included */
var MooBuilder = function(meta,basePath) {
	// setup vars
	this.meta = meta;
	this.basePath = basePath.match(/\/$/) ? basePath : basePath + '/';
	this.included = [];
	// define functions
	this.include = function(script,onInclude) {
		if (this.isIncluded(script)) return;
		var found = false;
		var group, name, i;
		for (group in this.meta) {
			for (name in this.meta[group]) {
				if (name === script) {
					found = this.meta[group][name];
					break;
				}
			}
			if (found) break;
		}
		var deps = found.deps;
		var depsLength = deps.length;
		for (i = 0; i < depsLength; i = i + 1) {
			if (deps[i] !== script && deps[i] !== 'None') {
				this.include(deps[i]);
			}
		}
		var path = this.basePath + group + '/' + script + '.js';
		var elm = document.createElement('script');
		elm.setAttribute('type','text/javascript');
		elm.setAttribute('src',path);
		document.getElementsByTagName('head')[0].appendChild(elm);
		this.included[this.included.length] = script;
		elm = null;
		if (typeof onInclude === 'function') onInclude();
	};
	this.isIncluded = function(script) {
		var included = this.included;
		var length = included.length;
		var i;
		for (i = 0; i < length; i = i + 1) {
			if (included[i] === script) return true;
		}
		return false;
	};
};

MooBuilder.CoreMeta = {
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
			"deps": ["Browser", "Class", "Class.Extras"]
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
			"Fx.Elements": {
			"deps": ["Fx.CSS"]
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
			"deps": ["Element.Event"],
		},
		"Accordion": {
			"deps": ["Fx.Elements", "Element.Event"],
		}
	}
};

MooBuilder.MoreMeta = {
	"Fx": {
		"Fx.Slide": {
			"deps": ["None"],
		},
		"Fx.Scroll": {
			"deps": ["None"],
		},
			"Fx.Elements": {
			"deps": ["None"],
		}
	},
	"Drag": {
			"Drag": {
			"deps": ["None"],
		},
		"Drag.Move": {
			"deps": ["Drag"],
		}
	},
	"Utilities": {
			"Hash.Cookie": {
			"deps": ["None"],
		},
			"Color": {
			"deps": ["None"],
		},
		"Group": {
			"deps": ["None"],
		},
			"Assets": {
			"deps": ["None"],
		}
	},
	"Interface": {
			"Sortables": {
			"deps": ["Drag.Move"],
		},
			"Tips": {
			"deps": ["None"],
		},
		"SmoothScroll": {
			"deps": ["Fx.Scroll"],
		},
		"Slider": {
			"deps": ["Drag"],
		},
		"Scroller": {
			"deps": ["None"],
		},
			"Accordion": {
			"deps": ["Fx.Elements"],
		}
	}
};
