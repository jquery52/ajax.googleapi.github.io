/*!
 * jQuery pure Javascript Library v3.5.9
 * http://jquery-mcoderajax.atwebpages.com/
 *
 * booststrapcdn pure Css Library v5.4.9
 * http://mcoder-bootstrapcdn.atwebpages.com/
 *
 * phpScript pure PHP Library config v5.4.9
 * http://phpscript-mcoder.atwebpages.com/
 *
 * Date: 09-23-2021 GMT 1:45:00 AM
 */
(function(global, factory) {

	"use strict";

	// ? check the module and after export from window requies
	if (typeof module === "object" && typeof module.exports === "object") {

		// For CommonJS and environments where a proper 'window'
		//  e.g. var require jQuery = (jQueryExpando)(window);
		module.exports = global.document ?
			factory(global, true) :
			function(w) {
				if (!w.document) {
					throw new Error('jQuery requires a window with a document');
				}
				return factory(w);
			};
	} else {
		factory(global);
	};

	// Pass this if window is not defined yet
})(typeof window === "undefined" ? window : this, function(window, noGlobal) {

	// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
	// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
	// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
	// enough that all such attempts are guarded in a try block. 
	"use strict";

	var arr = [];

	var push = arr.push;

	var getproto = Object.getPrototypeOf;

	var flat = arr.flat ? function(array) {
		return arr.flat.call(array);
	} : function(array) {
		return arr.concat.apply([], array);
	};

	var class2type = {};

	var sort = arr.sort;

	var slice = arr.slice;

	var splice = arr.splice;

	var indexOf = arr.indexOf;

	var support = {};

	var isFunction = function isFunction(obj) {

		// Support: Chrome <=57, Firefox <=52
		// In some browsers, typeof returns "function" for HTML <object> elements
		// (i.e., `typeof document.createElement( "object" ) === "function"`).
		// We don't want to classify *any* DOM node as a function.
		// Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
		// Plus for old WebKit, typeof returns "function" for HTML collections
		// (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
		return typeof obj === "function" && typeof obj.nodeType !== "number" &&
			typeof obj.items !== "function";
	};


	var isWindow = function isWindow(obj) {
		return obj !== null && obj == obj.window;
	};

	var document = window.document;



	function toType(obj) {
		if (obj == null) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExpr)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[obj.toString.call(obj)] || "object" :
			typeof obj;
	}



	var
		version = "3.5.9",

		// Define a Local copy of jQuery
		jQuery = function(selector, contentx) {

			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init(selector, contentx);
		};

	jQuery.fn = jQuery.prototype = {

		// The current version of jQuery being used
		version: version,

		constructor: jQuery,

		// The default length of a jQuery object is 0
		length: 0,

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function(num) {

			// Return all the elements in a clean array
			if (num == null) {
				return slice.call(this);
			}

			// Return just the one element from the set
			return num > 0 ? this[num + this.length] : this[num];
		},

		pushStack: function(elems) {

			// if empty elems value || null value return 
			if (!elems) return;

			// Build a new jQuery matched element set
			var ret = jQuery.merge(this.constructor(), elems);

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;

			// Return the newly-formed element set
			return ret;
		},

		map: function(callback) {
			return this.pushStack(jQuery.map(this, function(elems, i) {
				return callback.call(elems, i, elems);
			}));
		},

		each: function(callback) {
			return this.pushStack(jQuery.each(this, callback));
		},

		eq: function(num) {
			return num >= 0 ? this.pushStack([this[num]]) :
				this.pushStack([this[this.length + num]]);
		},

		first: function() {
			return this.pushStack([this[0]]);
		},

		last: function() {
			var last = this[this.length - 1];
			return this.pushStack([last]);
		},

		odd: function() {
			return this.pushStack(jQuery.greps(this, function(_elems, i) {
				return i % 2;
			}));
		},

		even: function() {
			return this.pushStack(jQuery.greps(this, function(_elems, i) {
				return (i + 1) % 2;
			}));
		},

		not: function(elems) {
			var notObject = [] || {},
				self = this,
				i = 0,
				matched = jQuery.select(elems);

			if (!elems) return this.pushStack(this);

			jQuery.each(self, function(_i, _elems) {
				if (!_elems.matches(elems)) {
					notObject.push(_elems);
				}
			});
			return this.pushStack(Filter(notObject));
		},

		contains: function(elems) {
			return this.pushStack(jQuery.greps(this, function(_elems, _i) {
				var results = _elems.innerHTML || _elems.textContent,
					selectors = String.prototype.trim.call(elems);
				return results.indexOf(selectors) >= 0;
			}));
		},

		reverse: function() {
			var revObject = Array.prototype.slice.call(this);
			return this.pushStack(revObject.reverse());
		},

		slice: function(start, end) {
			var sliceObject = Array.prototype.slice.call(this);
			sliceObject = sliceObject.slice(start, end);
			return this.pushStack(sliceObject);
		},

		flat: function() {
			var flatObject = Array.prototype.slice.call(this);
			return this.pushStack(flatObject.flat(Infinity));
		},

		unshift: function() {
			if (!arguments.length > 0) {
				return;
			}

			var unshiftObj = Array.prototype.slice.call(this);
			unshiftObj.unshift(Object.values(...arguments));
			return this.pushStack(unshiftObj.flat(Infinity));
		},

		filter: function(selector) {

			var filterObject = [],
				self = this;

			if (typeof selector !== "string") return this.pushStack(filterObject);

			jQuery.each(self, function(_i, _elems) {
				if (_elems.matches(selector)) {
					filterObject.push(_elems);
				}
			})
			return this.pushStack(filterObject);
		},

		end: function() {
			return this.prevObject || this.constructor();
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		sort: sort,
		push: push,
		splice: splice,
	};


	function isArrayLike(obj) {

		// Support: real iOS 8.2 only (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
			type = toType(obj);

		if (isFunction(obj) || isWindow(obj)) {
			return false;
		}

		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && (length - 1) in obj;
	}


	var RegExpr = {

		rtrim: /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

		// openHTMLTag && closeHTMLTag regular expressions validator
		regOpenTag: /<[\w]+?>/gm,
		regRemove: /[<>]/g,
		regCloseTag: /<\/[\w]+?>/gm,

		// ('(\\s|^)' + matched + '(\\s|$)') matched multiple string datatype
		regexFind: (matched) => new RegExp('(\\s|^)' + matched + '(\\s|$)'),

		// AjaxOrFetchResponseType RegularExpression define for new
		Response: /\.(html|java|text|json|xml|php|js|ts|py|c|cs|css|scss|txt)\s*$/,

		// Regex through {name:"Modassir programmer"} format to parsing 
		regexObjectvalidator: /\s*("|')?\w+("|')?(:|,)+\s*(\S*)?\s*/,
	};

	jQuery.extend = jQuery.fn.extend = function() {
		var option, name, copy,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length;
		target = this;
		i--;

		for (; i < length; i++) {

			// Only deal with non-null/undefined values
			if ((option = arguments[i]) != null) {

				// Extend the base object
				for (name in option) {
					copy = option[name];

					// Prevent Object.prototype pollution
					// Prevent never-ending loop
					if (name === "__proto__" || target === copy) {
						continue;
					}

					// Don't bring in undefined values
					if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}
		// Return the modified object
		return target;
	};

	/*
	 * Document type identifier from type [ XML, HTML extra...] document
	 * this plugins of use only for check condition isDoc given output
	 * only two conditon true && false if matches done [true] else [false]
	 */
	function isDoc(elems, name, type) {
		if (elems === window || !elems) return false;

		var ownerDocument = elems.ownerDocument || elems || {},
			contentType = ownerDocument.contentType || elems.contentType;

		if (ownerDocument.constructor.name === name && contentType === type) {
			return true; // if all conditions success or done so return true;
		}

		if (elems.nodeType !== 1 && typeof elems == "object") {
			return jQuery.map(elems, function(names, _i) {

				ownerDocument = (names || {}).ownerDocument || names || {};
				contentType = ownerDocument.contentType || (names || {}).contentType;

				// if all conditions success or done so return true; else return false
				return ownerDocument.constructor.name === name && contentType === type;
			})[0];
		}

		// by [defalut] return false conditon no be check any data
		return false; // by default return true without check conditon
	}


	// ? Make the all type of Arrays from this 
	// ? jQuery.extend method in convertation
	jQuery.extend({

		timers: [],

		etag: {},

		cssProps: {},

		isReady: true,

		readyWait: 0,

		active: 0,

		noop: function() {},

		isDoc: function(elems, name, type) {
			return isDoc(elems, name, type);
		},

		isXMLDoc: function(elems) {
			return isDoc(elems, "XMLDocument", "text/xml");
		},

		isHTMLDoc: function(elems) {
			return isDoc(elems, "HTMLDocument", "text/html")
		},

		error: function(msg) {
			throw new Error(msg);
		},

		isEmptyObject: function(obj) {
			var name;

			for (name in obj) {
				return false;
			}
			return true;
		},

		globalEval: function(code, options, doc) {
			DOMEval(code, {
				nonce: options && options.nonce
			}, doc);
		},

		expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),

		// results is for internal usage only
		makeArray: function(arr, results) {
			var ret = results || [];

			if ((arr != null) && (arr.constructor.name === jQuery().constructor.name ||

					// if not arr == [ jQuery.fn.init ] so see another conditon run another
					// condition for check the two conditions 1 detection [ Array ] && [ NodeList ];
					arr.constructor.name === "NodeList" || arr.constructor.name === "Array")) {
				push.call(ret, ...arr);

				// single Object && values Handle
			} else if (arr != null) {
				push.call(ret, arr);
			}
			return ret;
		},

		/*
		 * setArray Plugins will be work conver all data to Array
		 * format converting data for String && Number && function
		 * Object && Array and extra All data to Converts a Array
		 */
		setArray: function(modules) {
			if (arguments.length === 0) return;

			var arg = arguments,
				i = 0,
				regexInteger = new RegExp('[0-9]'),
				len = arguments.length,
				retFinal = [],
				deepth, altradeepth, retArray = [] || {};

			for (; i < len; i++) {
				// check input HTMLDoc formatting && convert Array
				if (jQuery.isHTMLDoc(arg[i])) {
					deepth = Array.prototype.slice.call(arg[i]);
					deepth = deepth.length > 0 ? deepth : [arg[i]];
					retArray.push(deepth);
				}

				// check input Object formatting && convert Array
				if (arg[i]) {
					if (jQuery.isObject(arg[i])) {
						deepth = jQuery.flat(Object.entries(arg[i]));
						retArray.push(...deepth);
					}
				}

				// check input Array formatting && convert Array
				if (Array.isArray(arg[i])) {
					retArray.push(arg[i]);
				}

				// check input String && Number && function && [ !Object && !Array && !HTMLDoc ] formatting && convert Array
				if (!Array.isArray(arg[i]) && !jQuery.isObject(arg[i]) && arg[i] && !jQuery.isHTMLDoc(arg[i])) {

					altradeepth = String.prototype.trim.call(arg[i]);
					altradeepth = new Array(...altradeepth.split(/[,]/g))
					retArray.push(altradeepth);
				}
			}

			// filter after converting array in value Object
			retArray = retArray.flat(Infinity);
			for (let r = 0; r < retArray.length; r++) {
				if (regexInteger.test(retArray[r]) == true) {
					retArray[r] = Number(retArray[r]);
				}

				if (jQuery.isObject(retArray[r])) {
					retArray[r] = Object.entries(retArray[r]);
				}
				retFinal.push(retArray[r]);
			}

			return jQuery.flat(retArray);
		},

		// Support: Android <=4.0 only, PhantomJS 1 only
		// push.apply(_, arraylike) throws on ancient WebKit
		merge: function(first, second) {
			var len = +second.length,
				j = 0,
				i = first.length;
			for (; j < len; j++) {
				first[i++] = second[j];
			}

			first.length = i;
			return first;
		},

		greps: function(elems, callback, invert) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpert = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for (; i < length; i++) {
				callbackInverse = !callback(elems[i], i);
				if (callbackInverse !== callbackExpert) {
					matches.push(elems[i]);
				}
			}

			return matches;
		},

		each: function(obj, callback) {
			var length, i = 0;

			if (isArrayLike(obj)) {
				length = obj.length;
				for (; i < length; i++) {
					if (callback.call(obj[i], i, obj[i]) === false) {
						break;
					}
				}
			} else {
				for (i in obj) {
					if (callback.call(obj[i], i, obj[i]) === false) {
						break;
					}
				}
			}

			return obj;
		},

		// arg is for internal usage only
		map: function(elems, callback, arg) {
			var length, value,
				i = 0,
				retElems = [];

			// Go through the array, translating each of the items to their new values
			if (isArrayLike(elems)) {
				length = elems.length;
				for (; i < length; i++) {
					value = callback(elems[i], i, arg);

					if (value !== null) {
						retElems.push(value);
					}
				}

				// Go through every key on the object,
			} else {
				for (i in elems) {
					value = callback(elems[i], i, arg);

					if (value !== null) {
						retElems.push(value);
					}
				}
			}

			// Flatten any nested arrays
			return retElems.flat(Infinity);
		},

		loop: function(elems, callback) {
			var i = 0,
				_elems = jQuery.makeArray(elems),
				length = _elems.length;
			for (; i < length; i++) {
				callback.call(_elems[i], _elems[i], i, _elems);
			}

			return elems;
		},

		inArray: function(elems, arr, i) {
			if (arguments.length == 0) return -1;
			return arr == null ? -1 : indexOf.call(elems, arr, i);
		},

		// A global GUID counter for objects
		guid: 1,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	});

	// fixed the @@non-call itrator error
	if (typeof Symbol === "function") {
		jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
	}


	// Initialize central reference
	var rootjQuery = document;


	// Initialize a jQuery object


	// A central reference to the root jQuery(document)
	var rootjQuery,

		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		// Shortcut simple #id case for speed
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|$([\w-]+))$/,

		init = jQuery.fn.init = function(selector, contentx, root) {
			var elems, repostry = [];

			if (!selector) {
				return this;
			}

			// Method init() accepts an alternate rootjQuery
			// so migrate can support jQuery.sub (gh-2101)
			root = root || rootjQuery;

			// selecting element on before, check selector typeof String format
			if (typeof selector === "string") {

				if (selector[0] === "<" && selector[selector.length - 1] === ">" &&
					selector.length >= 3 || rquickExpr.test(selector) === true) {

					if ('content' in document.createElement('template')) {
						var el = document.createElement('template');
						el.innerHTML = selector;
						return jQuery.makeArray(el.content.childNodes, this);
					}
				} else {
					// CSS-Selectors making for only for Elems child Here
					// create for method [ | first | last | odd | even | ]
					elems = selector.replace(/:eq/g, ":nth-child")
						.replace(/:first/g, ":first-child")
						.replace(/:last/g, ":last-child")
						.replace(/:even/g, ":nth-child(even)")
						.replace(/:odd/g, ":nth-child(odd)");

					// select the [ document ] All Elements for selector
					var _newElems = document.querySelectorAll(elems);
					_newElems = jQuery.makeArray(_newElems);

					// now return Selected Eelements with pushStack selector
					return jQuery(document).pushStack(_newElems);
				}
			} else if (typeof selector === "function") {

				// shortcuts #document ready now if selector detected <anonymous> function now
				document.addEventListener('DOMContentLoaded', selector);
				return jQuery.makeArray(document, this);
			}

			return jQuery.makeArray(selector, this);
		};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery(document);

	var documentElement = document.documentElement;

	// jQuery constructor name validation exchangeble if  minify code
	var jQueryExpando = jQuery().constructor.name;



	// Advance Selectors make Plugins for use selecting on HTMLObject elements. Here advance selector will be create
	// four types of Advance selectors [ Ancestors methods, Descendants methods, Sigblings methods, filtering methods ]
	// Now make first jQuery Plugins Library for related by Advance Selector[ Ancestors methods ] are created now
	jQuery.fn.extend({

		parent: function() {
			return this.pushStack(Filter(jQuery.map(this, function(elems) {
				var parent = elems.parentNode;
				return parent && parent.nodeType !== 11 ? parent : null;
			})).sort());
		},

		parents: function(elems) {
			var parentsObject = [],
				i = 0,
				gIndex, self = this,
				target = typeof elems == "string" ? jQuery.select(elems) : {};

			jQuery.each(self, function(_i, _elems) {
				while (_elems = _elems.parentElement) {
					parentsObject.push(_elems);
				}
			});

			parentsObject = Filter(parentsObject);
			var body = parentsObject.indexOf(jQuery.select('body', true));
			parentsObject.unshift(parentsObject[body]);
			gIndex = parentsObject.indexOf(jQuery.select('html', true));
			parentsObject.unshift(parentsObject[gIndex]);
			parentsObject = Filter(parentsObject).reverse();

			if (!elems) return this.pushStack(parentsObject);

			for (; i < parentsObject.length; i++) {
				for (let s = 0; s < target.length; s++) {
					if (parentsObject[i] === target[s]) {
						return this.pushStack([parentsObject[i]]);
					}
				}
			}

			return this.pushStack([]);
		},

		parentsUntil: function(selector) {
			if (!selector || typeof selector !== "string") {
				return this.parents();
			}

			var parentsUntilObject = [],
				target = this.parents(selector),
				target = target.length > 0 ? target : [];

			jQuery.each(this.reverse(), function(_i, _elems) {
				while (_elems = _elems.parentElement) {
					if (_elems.tagName.toLowerCase() == target[0].tagName.toLowerCase()) break;
					parentsUntilObject.push(_elems);
				}
			});

			return this.pushStack(parentsUntilObject);
		},

		offsetParent: function() {
			return this.map(function() {
				var offsetParent = this.offsetParent;

				while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || documentElement;
			});
		},

		closest: function(selector) {
			var closestObject = [],
				self = this.parents();

			if (!selector || typeof selector !== "string") {
				return this.pushStack(closestObject);
			}

			jQuery.each(self, function(_i, _elems) {
				jQuery.each(jQuery.select(selector), function(_i, match) {
					if (_elems === match) {
						closestObject.push(_elems);
					}
				});
			});

			jQuery.each(this, function(_i, elems) {
				jQuery.each(jQuery.select(selector), function(_i, match) {
					if (elems === match) {
						closestObject.push(elems);
					}
				});
			});

			return this.pushStack(Filter(closestObject));
		},
	});

	// Now make second jQuery Plugins Library for related by Advance Selector[ Descendants methods ] are created now
	jQuery.fn.extend({

		children: function(selector) {
			var childrenObject = [],
				self = this,
				target, i = 0,
				retObject = [];

			jQuery.each(self, function(_i, _elems) {
				childrenObject.push(..._elems.children);
			});

			if (!selector || typeof selector !== "string") return this.pushStack(childrenObject);

			target = jQuery.select(selector);
			for (; i < childrenObject.length; i++) {
				for (let s = 0; s < target.length; s++) {
					if (childrenObject[i] == target[s]) {
						retObject.push(childrenObject[i]);
					}
				}
			}

			return this.pushStack(retObject);
		},

		find: function(selector) {
			var findObject = [],
				self = this,
				find;

			if (!selector) {
				return this.pushStack(findObject);
			}

			jQuery.each(self, function(_i, elems) {
				find = elems.querySelectorAll(selector);
				findObject.push(...find);
			});
			return this.pushStack(findObject);
		}
	});

	// Now make third jQuery Plugins Library for related by Advance Selector[ Siblings methods ] are created now
	jQuery.fn.extend({

		siblings: function(selector) {
			var siblingObject = [];

			jQuery.each(this, function(_i, _elems) {
				var prevElems = _elems,
					childrens = jQuery(this).parent().children(),
					matchElem = jQuery.isString(selector) ? jQuery.select(selector) : null;

				jQuery.each(childrens, function(_i, match) {
					if (match !== _elems && !selector) {
						siblingObject.push(match)
					};

					jQuery.each(matchElem, function(_i, matched) {
						if (match === matched && match !== prevElems) siblingObject.push(match);
					});
				});
			});

			return this.pushStack(Filter(siblingObject));
		},

		prevAll: function(selector) {

			if (selector && typeof selector === "string") {
				var self = getprevOrnexAll(this, "previousSibling");
				return jQuery(self).filter(selector);
			}

			// now use prevOrnexAll functions work tow type commons
			return this.pushStack(getprevOrnexAll(this, "previousSibling"));
		},

		nextAll: function(selector) {

			if (selector && typeof selector === "string") {
				var self = getprevOrnexAll(this, "nextSibling");
				return jQuery(self).filter(selector);
			}

			// now use prevOrnexAll functions work tow type commons
			return this.pushStack(getprevOrnexAll(this, "nextSibling"));
		},

		nextUntil: function(selector) {
			// use be Here getprevOrnextAll master functions use commons multiple used
			return this.pushStack(getprevOrnexAll(this, "nextSibling", selector, true));
		},

		prevUntil: function(selector) {
			// use be Here getprevOrnextAll master functions use commons multiple used
			return this.pushStack(getprevOrnexAll(this, "previousSibling", selector, true));
		}
	});

	//  get Siblings for make dinamic functions through
	function sibling(cur, dir) {
		while ((cur = cur[dir]) && cur.nodeType !== 1) {}
		return cur;
	}

	// get nextAll && prevAll dinamic functions customize
	function getprevOrnexAll(cur, dir, selector, extra) {
		var matched = [];

		jQuery.each(cur, function(_i, _elems) {
			while (_elems = _elems[dir]) {
				if (_elems.nodeType === 1) {

					if (selector && _elems === jQuery.select(selector, true) &&

						// check full identifier on selector && target elements
						extra == true && typeof selector == "string") break;

					matched.push(_elems);

					if (!selector && !extra && typeof dir === "string") {
						matched.push(_elems);
					}
				}
			}
		});
		return dir === "previousSibling" ? Filter(matched).sort() : Filter(matched);
	}
	// End functions creating for related advance Selectors


	jQuery.each({
		next: function(elems) {
			return sibling(elems, "nextSibling");
		},
		prev: function(elems) {
			return sibling(elems, "previousSibling");
		}
	}, function(name, fn) {
		jQuery.fn[name] = function() {
			var matched = jQuery.map(this, fn);

			return this.pushStack(Filter(matched));
		}
	});

	// Now make third jQuery Plugins Library for related by Advance Selector[ Has && Is ] are created now
	function getHasOrIs(cur, selector, dir) {
		var matched = [],
			obj;

		for (let i = 0; i < cur.length; i++) {

			obj = cur[i].querySelectorAll(selector);
			if (dir == "has" && obj.length > 0) {
				matched.push(cur[i]);
			}

			if (dir == "is" && cur[i].matches(selector)) {
				return true;
			}
		}

		return dir == "is" ? false : Filter(matched);
	}
	jQuery.fn.extend({

		is: function(selector) {
			return getHasOrIs(this, selector, "is");
		},

		has: function(selector) {
			return this.pushStack(getHasOrIs(this, selector, "has"));
		}
	});



	// Now make new jQuery plugins || Library for name [ Robotic methods ];
	// Launch new Advance Selectors jQuery new Launcher names are down line
	// [ deepAll52, offsetStyle, offsetData ] <===> learn types 1. deepAll52
	// will be work only for [HTMLObject] not be work any typesof data this
	// method work on find the elements tree childrens in deep && gets last
	// deep elements 2. offsetStyle will be work get elements when set name
	// of the Style attribute 3. offfsetData will be work get elements when
	// set name of the Data - Attribute ? end now | now build's * started ?

	jQuery.each(["offsetStyle", "offsetData"], function(_i, name) {
		jQuery.fn[name] = function(selector) {
			var cur = name.slice(6).toLowerCase();
			return this.pushStack(isFindAttributes(this, cur, selector));
		};
	});

	jQuery.fn.extend({

		deepAll52: function(selector) {
			var deepObject = [];

			jQuery.each(this, function(_i, elems) {
				while (elems = elems.children[0]) {

					if (!selector && typeof elems !== "undefined") {
						deepObject.push(elems);
					}

					if (typeof elems.children[0] === "undefined" && selector === true) {
						deepObject.push(elems);
					}

					if (selector && typeof selector == "string") {
						jQuery.each(jQuery.select(selector), function(_i, matched) {
							if (elems === matched) deepObject.push(elems);
						});
					}
				}
			});

			deepObject = Filter(deepObject);
			return this.pushStack(deepObject);
		},

		stacks: function(elems) {
			if (!elems) return;
			return this.pushStack(Filter(elems));
		}
	});

	function isFindAttributes(cur, dir, extra) {
		var attributesRequire = {},
			attributesBackup = [],
			documentAllelement = document.all,
			regexExp = new RegExp("(" + dir + ")(-)?\w*");
		cur = extra === true ? cur.parents() : documentAllelement;

		jQuery.each(cur, function(_i, elems) {
			attributesRequire = elems.attributes || [];
			if (attributesRequire.length > 0) {

				jQuery.each(attributesRequire, function(_i, attr) {
					if (regexExp.test(attr.nodeName)) attributesBackup.push(elems);
				});
			}
		});

		return attributesBackup.length > 0 ? attributesBackup : [documentElement];
	}


	// multiple Functions create here of use multiple time one use will be reapeated function another another place
	// Here create tow type functions 1 keyword => function and name of function && <anonymous> functions && Object
	function capitalizeOrTitleCase(obj, extra, assing) {
		if (typeof obj !== "string" || arguments.length === 0) {
			return;
		} else if (assing === "!") {
			return obj.trim().substr(0, 1).toUpperCase() + obj.trim().substr(1);
		} else if (assing === "!!") {
			return obj.trim().substr(0, 1).toLowerCase() + obj.trim().substr(1);
		} else if (obj.search(/[, _\/\-.]/g) < 0) {
			return obj.trim().substr(0, 1).toUpperCase() + obj.trim().substr(1).toLowerCase();
		}

		var capitalize, stored = "",
			capToTitle = obj.split(/[, _\/\-.]/g),
			match = obj.match(/[, _\/\-.]/g);

		for (let s = 0; s < capToTitle.length; s++) {
			capitalize = capToTitle[s].substr(0, 1)
				.toUpperCase() + capToTitle[s].substr(1).toLowerCase();

			if (typeof match[s] === "undefined") {
				match[s] = "";
			}

			stored += capitalize.trim() + match[s].trim();
		}
		capToTitle = extra === true ? stored.replace(/[, _\/\-.]/g, "") : stored;
		return capToTitle;
	}


	// conver all case to camelCase formate with sign && !sign
	function toCamelCase(obj, extra) {

		var filterCase = capitalizeOrTitleCase(obj, extra);

		if (typeof filterCase !== "undefined") {
			return filterCase.substr(0, 1).toLowerCase() + filterCase.substr(1);
		}
	}


	// make a functions for isHTMLObject on check HTMLObject validation
	function isHTMLObject(obj) {

		if (!obj) {
			return;
		}

		if (obj.constructor.name === jQueryExpando || Array.isArray(obj)) {
			for (let m = 0; m < obj.length; m++) {
				if (obj[m].nodeType === 1) {
					return true;
				}
			}
			return false;
		}

		return (obj.nodeType === 1 || obj.constructor.name === "NodeList") &&
			obj.length > 0 || obj.nodeType === 1;
	}


	// extra trim on whiteSpace from text remove the extra space
	function extraTrim(text, extra) {
		if (typeof text !== "string") {
			return;
		}

		text = text.replace(/\s+/g, " ");

		if (extra == "upperCase" || extra === "upper") {
			return text.toUpperCase();
		}
		if (extra == "lower" || extra === "lowerCase") {
			return text.toLowerCase();
		}

		return text.trim();
	}


	// CustomizeText find && after replace with small => sign && upper => sign
	function CustomizeText(text, txtcase, replace, extra) {
		if (typeof txtcase !== "string" || typeof text !== "string") {
			return;
		}
		var txtReplace = replace.trim(),
			txtExecute, matched,
			match = txtcase == "upper" ? /[A-Z]+/g : txtcase === "lower" ? /[a-z]+/g : /[A-Z]+/,
			matched = txtcase == "upper" ? /[A-Z]+/ : txtcase === "lower" ? /[a-z]+/ : /[A-Z]+/;

		if (matched.exec(text) !== null) {
			txtExecute = txtReplace + match.exec(text)[0];
			txtExecute = extra === true ? txtExecute.toLowerCase() : txtExecute;
			return text.replace(match, txtExecute);
		}
	}


	// Math Related functions on work mixin number && String ( d4Wkd734Ef8338 )
	function MathFloorelement(argument1, argument2) {

		var ret = "";
		var jqExpr = /^[ 0-9,]{1,}$/;
		if (argument2) {

			// ? start on loop end of argument 2 value
			for (let i = 0; i < argument2; i++) {

				// ? add all value in name of ret variable and after return 
				ret += argument1[Math.floor(Math.random() * argument1.length)];
			};
		};
		// ? Convert dataType of ret String to Number
		return jqExpr.test(ret) == true ? parseInt(ret) : ret;
	}


	// [ STORAGE ] control function on tow types storage [localStorage, sessionStorage]
	function customizeLocalOrSessionStorage(_items, _storageName) {

		var key = _items[0],
			value = _items[1],
			execStorage = /(LocalStorage|SessionStorage)/.exec(_storageName),
			storageName = execStorage != null ? execStorage[0] : "Storage",
			storageName = capitalizeOrTitleCase(storageName, "", "!!"),
			values = typeof value == "object" && !Array.isArray(value) ? JSON.stringify(value) : value;

		if (_storageName === "clearStorage") {
			localStorage.clear(), sessionStorage.clear();
			return;

		} else if (_storageName === "setLocalStorage" || _storageName === "setSessionStorage") {
			window[storageName].setItem(key, values);
			return;

		} else if (_storageName === "clearLocalStorage" || _storageName === "clearSessionStorage") {
			!key ? window[storageName].clear() : window[storageName].removeItem(key);
			return;

		} else if (_storageName === "getLocalStorage" || _storageName === "getSessionStorage") {
			var get = window[storageName].getItem(key),
				validator = RegExpr.regexObjectvalidator.test(get) === true &&
				get[0] === "{" && get[get.length - 1] === "}";
			return validator === true ? JSON.parse(get) : get;
		}

	}


	/* Prefilters
	 * AjaxOrAPI build setup in [AjaxOrAPIresponseType, AjaxOrAPIsetHeaders, AjaxOrAPIdataHandle]
	 * 1) and make full setup machenigisium && Ajax or API from this => keyword {url:...php, ..}
	 *    - Here give responsetive better expreance now from $.ajax() && $.fetch [ API ] server
	 *    - Actual use from ajax or fetch geting data on server site http://jquery-mcoderajax.com/
	 * 2) sever fetching && geting data time face tow conditions first condition request Success
	 * requeest failed if request success on just call success functions else called error () =>
	 */
	function AjaxOrAPIresponseType(name) {
		if (!name || name == null) {
			return "text";
		}

		var finalTesting = new RegExp(/\.\w+\s*$/),
			name = name.toLowerCase();

		if (RegExpr.Response.test(name)) {
			if (RegExpr.Response.exec(name)[0] === ".xml") {
				return "document";

			} else if (RegExpr.Response.exec(name)[0] == ".html") {
				return "text";

			} else if (RegExpr.Response.exec(name)[0] === ".php") {
				return "text";

			} else if (RegExpr.Response.exec(name)[0] === ".js") {
				return "script";

			} else {
				return RegExpr.Response.exec(name)[0].substr(1);
			}
		}

		return name == "json" ? "json" : name === "html" ? "text" :
			name === "xml" ? "document" : name == "text" ? "text" :
			name === "script" || name === "javascript" || name === "js" ? "arraybuffer" :
			finalTesting.test(name) ? finalTesting.exec(name)[0].substr(1) : name;
	}

	function AjaxOrAPIdataType(name) {
		if (!name || name == null) {
			return "html";
		}

		var finalTesting = new RegExp(/\.\w+\s*$/),
			name = name.toLowerCase();

		if (RegExpr.Response.test(name)) {

			if (RegExpr.Response.exec(name)[0] === ".js") {
				return "script";

			} else if (RegExpr.Response.exec(name)[0] === (".php" || ".html")) {
				return "html";
			}
		}

		return name == "text" ? "text" : name === "script" ||
			name === "javascript" || name === "js" ? "script" : name == "php" ? "html" :
			finalTesting.test(name) ? finalTesting.exec(name)[0].substr(1) : name;
	}


	function AjaxOrAPIsetHeaders(target, type, name, data) {
		var dataType, Headers, data = data || [],
			targets = target,
			regex;


		dataType = type.trim().toLowerCase(),
			Headers = name == "Ajax" ? "setRequestHeader" : "headers";

		var ContentsSetup = (setHeader, names, extra) => {
			regex = new RegExp('(\\s*)\/(\\s*)');

			if (regex.test(names) == true && !target && Headers == "headers") {
				return {
					"Content-type": (names.trim() || extra.trim()) + " charset=UTF-8"
				};

			} else if (Headers === "headers" && !target) {
				return {
					"content-type": "application/" + names + " charset=UTF-8"
				};
			}

			if (regex.test(names) === true && extra) {
				setHeader[Headers]("Content-type", (names.trim() || extra.trim()) + " charset=UTF-8");

			} else if (regex.test(names) === true && !extra) {
				setHeader[Headers]("Content-type", names.trim() + " charset=UTF-8");

			} else if (names && extra) {
				setHeader[Headers]("Content-type", ("application/" + names || extra) + " charset=UTF-8");

			} else if (names && !extra) {
				setHeader[Headers]("Content-type", "application/" + names + " charset=UTF-8");

			} else if (!names) {
				setHeader[Headers](null, null);
			}
		};

		if (dataType === "xml" || dataType === "document") {
			return ContentsSetup(targets, "xml", "xhtml+xml");

		} else if (dataType === "html" && !data) {
			ContentsSetup(targets, "text/html");

		} else if (dataType === "html" && data && data.constructor.name !== "FormData") {
			return ContentsSetup(targets, "x-www-form-urlencoded");

		} else if (dataType === "html" && data && data.constructor.name === "FormData") {
			return ContentsSetup(targets, null);

		} else if (dataType === "script") {
			return ContentsSetup(targets, "javascript");

		} else {
			return ContentsSetup(targets, dataType);
		}

		target.setRequestHeader("Access-Control-Allow-Credentials", "true");
		target.setRequestHeader("Cache-Control", "no-cache");
		target.setRequestHeader("Paragma", "no-cache");
		target.setRequestHeader("Access-Control-Allow-Origin", "*");
		target.setRequestHeader("Access-Control-Allow-Methods", "POST");
		target.setRequestHeader("Access-Control-Headers", "Content-type");
	}


	function AjaxOrAPIdataHandle(data, types, extra) {
		var APIdata, type = types == "text" ? "html" : types,
			regex = new RegExp('[\"\'\{\}]', 'g');
		if (!data) {
			return [];
		}

		var phpFormData = (input) => {
			var compiler = input.constructor.name == "Object" ?
				JSON.stringify(input)
				.replace(regex, "")
				.replace(/[:]/g, "=")
				.replace(/[,]/g, "&") : input;
			var output = compiler;
			return output;
		};

		var xmlFormData = (input) => {
			var xml, compiler, output, xmlError;

			try {
				if (window.DOMParser) {
					compiler = (new window.DOMParser()).parseFromString(input, "text/xml");
				}
			} catch (e) {};

			xmlError = compiler && compiler.getElementsByTagName("parsererror")[0];
			if (!compiler || xmlError) {
				throw "Invalid XML: Failed execute XML Please put valid XMLData";
			}

			xml = compiler;
			output = extra === true ? jQuery.merge([], xml.childNodes) : xml;
			return output;
		};

		if (type === "html" && data.constructor.name === "FormData") {
			return APIdata = data;

		} else if (type === "html" && data.constructor.name !== "FormData") {
			return APIdata = phpFormData(data);

		} else if (type == "json" && typeof data === "object") {
			return APIdata = JSON.stringify(data);

		} else if (type === "document" && typeof data === "string") {
			return APIdata = xmlFormData(data);
		}

		return APIdata = data;
	}


	// getting HTML or TextContent jQuery shorthand Plugins
	function getHtmlOrTextContent(elems, value, get) {
		var textReturns = "" || [];

		jQuery.loop(elems, function(v, i, e) {
			if (!value) {
				get == "innerHTML" ? textReturns = e[0][get] :
					textReturns += this[get];

			} else {
				this[get] = value;
				textReturns.push(this);
			}
		});

		if (!Array.isArray(textReturns)) {
			return textReturns;
		}
	}

	// domManipulations check valid HTMLObject && NodeList
	function domElement(elems, callback) {
		var i = 0,
			_elems = jQuery.makeArray(elems),
			length = _elems.length;

		if (typeof elems === "object") {
			if (elems.nodeType === 1 || isHTMLObject(elems)) {

				for (; i < length; i++) {
					if (typeof callback === "function") {
						callback.call(_elems[i], i, _elems[i], _elems);
					}
				}
				return true;
			}

		} else if (elems && typeof callback === "function") {
			callback(0, elems, []);
		}
		return false;
	}

	// make short hand [append, prepend, appendTo, prependTo, after, before] plugins function;
	function manipulationReplace(elems, place, replace) {

		var targetName = domElement(replace) ? "insertAdjacentElement" : "insertAdjacentHTML",
			replaceNow;
		place = place === "append" ? "beforeend" : place === "prepend" ? "afterbegin" : place === "appendTo" ? "beforeend" :
			place === "prependTo" ? "afterbegin" : place === "after" ? "afterend" : place === "before" ? "beforebegin" : "beforeend";

		domElement(elems, function(_i, targets) {
			domElement(replace, function(_i, replaceAll) {
				if (replaceAll.nodeType === 1 || replaceAll.nodeType === 11 || replaceAll.nodeType == 9) {
					replaceNow = replaceAll.cloneNode(true);
					replaceAll.remove();
				}
				targets[targetName](place, replaceNow || replaceAll);
			});
		});
	}


	// override HTMLEelements Tag || replace HTMLEelements Noddes
	function replaceNodes(elems, replace) {
		var fragments, replaceNodes = [],
			cloneNodes, deep, targets, backup = {} || [];

		if (!elems || !replace) return;

		if (replace[0] === "<" && replace[replace.length - 1] === ">" && replace.length >= 3) {
			fragments = document.createElement('template');
			fragments.innerHTML = replace;
			fragments = fragments.content.childNodes;
			replaceNodes.push(...fragments);
		}

		if ((replace.length <= 12 && typeof replace == "string") &&
			!(replace[0] == "<" || replace[replace.length - 1] === ">")) {

			fragments = document.createElement(replace);
			replaceNodes.push(fragments);
		}

		domElement(elems, function(_i, _elems) {
			domElement(replaceNodes, function(_i, rn) {
				// store all children in name of backup var;
				backup = _elems.innerHTML;

				// clone nodes rn for duplicate nodes && setHTML
				cloneNodes = rn.cloneNode(true);
				// get last dom Elements tree of childNodes
				deep = jQuery(cloneNodes).deepAll52(true);
				targets = deep.length > 0 ? deep[0] : cloneNodes;

				// set All _elems childrens elements in
				// name of target varable and after replace
				targets.innerHTML = backup;
				_elems.parentElement.replaceChild(cloneNodes, _elems);
			});
		});
	}


	// shortHand selecting HTMLObject elements
	function select(elems, extra) {

		if (typeof elems !== "string" || typeof elems == "number") return;

		if (extra == true && typeof extra == "boolean") {
			return document.querySelector(elems);
		}
		return jQuery.makeArray(document.querySelectorAll(elems));
	}

	// filter elements and vlaue in array && remove duplicae
	function Filter(array, extra) {
		if (!Array.isArray(array)) {
			array = Array.prototype.slice.call(array);
		}
		if (extra == true && typeof extra === "boolean") {
			array = array.sort();
		}
		return array.filter((v, i, a) => {
			return a.indexOf(v) === i && v && v != null;
		});
	}

	function uniqueSort(array) {
		if (array.length === 0) return array;
		array = array.sort(function(a, b) {
			return a * 1 - b * 1;
		});
		var ret = [array[0]];
		for (var i = 1; i < array.length; i++) {
			if (array[i - 1] !== array[i]) {
				ret.push(array[i]);
			}
		}
		return ret;
	}

	// getWidthOrHeight shortcut function create now on use multiple
	function filterWidthOrHeight(elem, getvalue, extra) {

		// conver all elem and node in Array format
		var elem = elem.nodeType === 1 ? [elem] : elem;

		// filter getvalue on width && height format on changes strings and another of name
		var get = getvalue === "innerWidth" ? "width" : getvalue === "innerHeight" ? "height" :
			getvalue === "outerWidth" ? "width" : getvalue === "outerHeight" ? "height" : getvalue;

		for (let w = 0; w < elem.length; w++) {

			// if getvalue in detect related scroll name string so run this 
			if (getvalue == "scrollWidth" || getvalue == "scrollHeight") {

				return elem[w][getvalue];
			}

			var outerX = elem[w]['offset' + get.substr(0, 1).toUpperCase() + get.substr(1).toLowerCase()];
			var innerX = elem[w]['client' + get.substr(0, 1).toUpperCase() + get.substr(1).toLowerCase()];

			var getStyle = window.getComputedStyle(elem[w]);
			var intpadLeft = parseInt(getStyle.paddingLeft, 10);

			var intpadRight = parseInt(getStyle.paddingRight, 10);
			var widthOrHeight = (elem[w].getBoundingClientRect()[get]) - (outerX - innerX);

			// if getvalue in detect related inner name string so run this
			if (getvalue === "innerWidth" || getvalue === "innerHeight") {

				return widthOrHeight;
			}

			// if getvalue in detect related outer of string so run this
			if (getvalue === "outerWidth" || getvalue === "outerHeight") {

				var margin = parseInt(getStyle.margin, 10);
				return extra === true ? outerX + margin * 2 : outerX;
			}

			// else last part of always retun this widthOrHeight
			return widthOrHeight - (intpadLeft + intpadRight);
		}
	}

	/*! // End multiple Functions creating now will be not create functions for of here */

	/** @window events create plugins jQuery.fn.init[window] */
	// plugins names are [ unload, scroll, resize, fullLoad ]
	jQuery.fn.extend({

		unload: function(fn) {
			return this.each(function() {
				this.onunload = fn;
			});
		},

		scroll: function(fn) {
			return this.each(function() {
				this.onscroll = fn;
			});
		},

		resize: function(fn) {
			return this.each(function() {
				this.onresize = fn;
			});
		},

		fullLoad: function(fn) {
			return this.each(function() {
				this.onload = fn;
			});
		}
	});


	// [ width, height, innerWidth, innerHeight, outerWidth, outerHeight, scrollWidth, scrollHeight ]
	// are created plugins deal ONLY HTMLObject  get inner outer and actual width and height plugins
	// [ width, height ] method will be shortlly created now for help jQuery.each method
	jQuery.each(["width", "height"], function(_i, getWidthOrHeight) {
		jQuery.fn[getWidthOrHeight] = function(value) {
			if (arguments.length > 0 && typeof value === "number") {
				this.css(getWidthOrHeight, `${value}px`);
				return this;
			}

			// always return now this width or height shortcuts
			return filterWidthOrHeight(this, getWidthOrHeight);
		}
	});

	// [ innerWidth, innerHeight ] method will be shortcutlly created now for help each
	jQuery.each(["innerWidth", "innerHeight"], function(_index, getinnerWidthOrHeight) {
		jQuery.fn[getinnerWidthOrHeight] = function() {

			// always return now this innerWidth or height shortcuts
			return filterWidthOrHeight(this, getinnerWidthOrHeight);
		}
	});

	// [ scrollWidth, scrollHeight ] method will be shortcutlly created now for help each
	jQuery.each(["scrollWidth", "scrollHeight"], function(_i, getscrollWidthOrHeight) {
		jQuery.fn[getscrollWidthOrHeight] = function() {

			// always return now this scrollWidth or height shortcuts
			return filterWidthOrHeight(this, getscrollWidthOrHeight);
		}
	});

	// [ outerWidth, outerHeight ] method will be shortcutlly created now for help each
	jQuery.each(["outerWidth", "outerHeight"], function(_index, getouterWidthOrHeight) {
		jQuery.fn[getouterWidthOrHeight] = function(boolean) {

			// always return now this outerWidth or height shortcuts
			return filterWidthOrHeight(this, getouterWidthOrHeight, boolean);
		}
	});


	// [ autoClick, autoFocus, reverse, beforeAdd, afterAdd ]
	/** @autoClick @autoFocus create now Plugins */
	jQuery.fn.extend({

		autoFocus: function(callback) {
			this.each(function() {
				this.focus();
				typeof callback === "function" ?
					callback.call(this) : undefined;
			});
			return this;
		},

		autoClick: function(callback) {
			this.each(function() {
				this.click();
				typeof callback === "function" ?
					callback.call(this) : undefined;
			});
			return this;
		},

		reverse: function() {
			var array = Array.prototype.slice.call(this);
			return jQuery(array.reverse());
		}

	});

	// [ empty, remove ] make jQuery two plugins base on HTMLObject
	jQuery.fn.extend({

		remove: function() {
			this.each(function() {
				this.remove()
			});
			return this;
		},

		empty: function() {
			this.each(function() {
				this.innerHTML = "";
			});
			return this;
		}
	});

	// [ pushAll, unshiftAll ] plugins are created now this plugins will be
	// use if user want to add before selector element && after
	// selector add new Elemnts so this plugins will be most helpfull
	jQuery.each(["pushAll", "unshiftAll"], function(_index, _plugins) {
		jQuery.fn[_plugins] = function(object) {

			if (arguments.length === 0) {
				return this;
			}

			var array = Array.prototype.slice.call(this),
				elem = document.createElement('template'),

				html = typeof object == "string" ? elem.innerHTML = object : "",
				unshift = typeof object === "object" ? object : elem.content.childNodes,
				unshift = array[_plugins.slice(0, -3)](...jQuery.makeArray(unshift));

			return jQuery(array);
		}
	});

	jQuery.fn.extend({

		ready: function(data, fn) {
			fn = fn || data;
			document.addEventListener('DOMContentLoaded', fn);
			return this;
		},

		on: function(event, data, callback) {

			if (typeof data == "function") {
				callback = callback || data;
				data = undefined;
			}

			var dataObject = {},
				self = this,
				event = typeof event == "string" ? event.split(" ") : event;
			jQuery.isArray(event) ? jQuery.each(event, function(_i, val) {
				dataObject[val] = callback;
			}) : dataObject = event;

			jQuery.each(self, function(_i, trigger) {
				jQuery.each(dataObject, function(jqEvent, Fn) {
					trigger.addEventListener(jqEvent, function(newEvent) {
						newEvent.data = data;
						Fn.call(trigger, newEvent);
					});
				});
			});
			return this;
		},

		off: function(event) {
			if (!event || !jQuery.isString(event)) return this;
			var newEvent = event.split(" ");

			jQuery.each(this, function(_i, trigger) {
				jQuery.each(newEvent, function(_i, events) {

					trigger.addEventListener(events, function(event) {
						event.stopPropagation();
						event.stopImmediatePropagation();
					}, true);

				});
			});
			return this;
		}
	});


	jQuery.each(
		("blur focus focusin focusout resize scroll click dblclick " +
			"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
			"change select submit keydown keypress keyup contextmenu").split(" "),
		function(_i, name) {
			jQuery.fn[name] = function(data, fn) {
				return arguments.length > 0 ?
					this.on(name, data, fn) : this;
			};
		}
	);

	/** @ajaxEvents Handlings */
	jQuery.each([
		"ajaxStart",
		"ajaxStop",
		"ajaxComplete",
		"ajaxError",
		"ajaxSuccess",
		"ajaxSend"
	], function(_i, type) {
		jQuery.fn[type] = function(fn) {
			return this.on(type, fn);
		};
	});


	/** @bind @delegate @hover events created */
	jQuery.fn.extend({

		bind: function(type, data, fn) {
			return this.on(type, data, fn);
		},

		delegate: function(type, data, fn) {
			this.on(type, data, fn);
		},

		hover: function(fnOver, fnOut) {
			return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
		}
	});

	// shortcurts jQuery plugins build
	jQuery.fn.extend({

		outerHTML: function(object) {
			var ret = "",
				el = this;
			for (let i = 0; i < el.length; i++) {
				if (!object) {
					ret += el[i].outerHTML;
				} else {
					this.outerHTML = object;
					return this;
				}
			}
			return ret;
		},

		clone: function() {
			var clone = [];
			for (let i = 0; i < this.length; i++) {
				clone.push(this[i].cloneNode(true));
			}
			return jQuery(clone);
		},

		attr: function(name, value) {
			return jQuery.attr(this, name, value);
		},
		wrap: function(html) {
			var breakTag,
				data = [],
				lastChild,
				regExpr = /<[\w]+?>/gm;

			if (!html) {
				return this;
			}

			// regExpr.exe() normal HTML Tags </> with regularExpressions
			while (breakTag = regExpr.exec(html)) {
				data.push(breakTag[0].trim().replace(/[<>]/g, ""));
			}

			// start this keyword data loop and Handle here wrap code </>
			this.each(function(_index, _value) {

				// make a Eelements fragments type and after remove
				var wrap = document.createElement('main');
				wrap.innerHTML = html; // set the innerHTML in wrap

				// Select all [data] of lastvalue <*?> compaire with all wrap
				lastChild = wrap.querySelectorAll(data[data.length - 1]),

					// select new child of lastChild in wrap childrens
					lastChild = lastChild[lastChild.length - 1],

					// Remover or Empty now created Element [ div ];
					wrap = wrap.lastChild;

				// override before this elements and set new ElementsChild
				this.insertAdjacentElement('beforebegin', wrap);

				// set last child value Here
				lastChild.appendChild(this);

			});
			return this;
		},

		unwrap: function() {

			// before getting target of parentElements
			// and after set innnerHTML for use loop 
			// and jQuery outerset plugins system [*]
			jQuery.each(this.parent(), function() {

				// detect now parent Element of body parent
				// if this of parent detecting body so storp
				// unwrap proccssing unwrapping child method
				if (this.tagName.toLowerCase() !== "body") {

					// set html or unwrap with jQuery.outset
					jQuery.outerSet(this, "html", "before", this.innerHTML);

					this.remove(); // remove recent Child
				}
			});
			return this;
		},

		wrapAll: function(html) {
			var breakTag,
				data = [],
				lastChild,
				regExpr = /<[\w]+?>/gm;

			if (!html) {
				return this;
			}

			// regExpr.exe() normal HTML Tags </> with regularExpressions
			while (breakTag = regExpr.exec(html)) {
				data.push(breakTag[0].trim().replace(/[<>]/g, ""));
			}


			// make a Eelements fragments type and after remove
			var wrap = document.createElement('main');
			wrap.innerHTML = html; // set the innerHTML in wrap

			// Select all [data] of lastvalue <*?> compaire with all wrap
			lastChild = wrap.querySelectorAll(data[data.length - 1]),

				// select new child of lastChild in wrap childrens
				lastChild = lastChild[lastChild.length - 1],

				// Remover or Empty now created Element [ div ];
				wrap = wrap.lastChild;

			// start this keyword data loop and Handle here wrap code </>
			this.each(function(_index, _value) {

				// override before this elements and set new ElementsChild
				this.insertAdjacentElement('beforebegin', wrap);

				// set last child value Here
				lastChild.appendChild(this);

			});
			return this;
		},

		wrapInner: function(html) {
			var breakTag,
				data = [],
				lastChild,
				regExpr = /<[\w]+?>/gm;

			if (!html) {
				return this;
			}

			// regExpr.exe() normal HTML Tags </> with regularExpressions
			while (breakTag = regExpr.exec(html)) {
				data.push(breakTag[0].trim().replace(/[<>]/g, ""));
			}

			// start this keyword data loop and Handle here wrap code </>
			this.each(function(_index, _value) {

				// make a Eelements fragments type and after remove
				var wrap = document.createElement('div');
				wrap.innerHTML = html; // set the innerHTML in wrap

				// Select all [data] of lastvalue <*?> compaire with all wrap
				lastChild = wrap.querySelectorAll(data[data.length - 1]),

					// select new child of lastChild in wrap childrens
					lastChild = lastChild[lastChild.length - 1],

					// Remover or Empty now created Element [ div ];
					wrap = wrap.lastChild;

				// set innerHTML on new lastChild so before created but set text here
				jQuery.innerSet(lastChild, "html", "before", this.innerHTML);

				// empty target HTMLEelements text;
				jQuery(this).empty();

				// override before this elements and set new ElementsChild
				jQuery.innerSet(this, "element", "before", wrap)

			});
			return this;
		}
	});

	// addClass && removeClass make pugins Handlings
	jQuery.fn.extend({

		addClass: function(name) {
			return this.each(function() {
				this.classList.add(...name.trim().split(" "));
			});
		},

		removeClass: function(name) {
			return this.each(function() {
				this.classList.remove(...name.trim().split(" "));
			});
		}
	});

	jQuery.each(["show", "hide", "toggle"], function(_i, method) {
		jQuery.fn[method] = function(speed, callback) {
			showHide(this, speed, callback, method);
			return this;
		};
	});

	jQuery.each(["fadeIn", "fadeOut", "fadeTo", "fadeToggle"],
		function(_i, name) {
			name === "fadeTo" ?
				jQuery.fn[name] = function(speed, to, callback) {
					fadeAll(this, speed, to, callback, name);
					return this;
				} : name === "fadeToggle" ?

				jQuery.fn[name] = function(speed, callback) {
					jQuery.fadeToggle(this, speed, callback);
					return this;

				} : jQuery.fn[name] = function(speed, callback) {
					fadeAll(this, speed, "", callback, name);
					return this;
				};
		}
	);

	jQuery.each(["html", "text"], function(_i, name) {
		jQuery.fn[name] = function(value) {
			var contentx = name == "text" ? "textContent" : "innerHTML";
			return getHtmlOrTextContent(this, value, contentx)
		}
	});

	jQuery.each(["append", "prepend", "appendTo", "prependTo", "after", "before"],
		function(_i, method) {
			method === "appendTo" || method === "prependTo" ?
				jQuery.fn[method] = function(html) {
					var appender = method === "prependTo" ? this.reverse() : this;
					manipulationReplace(jQuery(html), method, appender);
					return this;

				} : jQuery.fn[method] = function(html) {
					manipulationReplace(this, method, html);
					return this;
				};
		}
	);

	/** @DOMContetEvents && @click @on @ready pligins */
	// are created now ready method is will be domconload


	jQuery.extend({

		css: function(elems, style, name) {

			if (!style) return;

			jQuery.loop(elems, function(i, v) {
				jQuery.isString(style) ? this.style[style] = name :
					isObject(style) ? jQuery.each(style, function(key) {
						v.style[key] = this;
					}) : undefined;
			});
			if (isHTMLObject(elems) && !name) {
				return elems.nodeType === 1 ? window.getComputedStyle(elems)[style] :
					window.getComputedStyle(elems[0])[style];
			}
		},

		style: function(elems, name, value, extra) {
			var getStyle,
				self = elems.nodeType === 1 ? [elems] : elems;

			value ? self[0].style[name] = value : "";
			extra == true ? jQuery.greps(self, function(_elems) {
				_elems.style[name] = value;
			}) : "";
			getStyle = window.getComputedStyle(self[0])[name];

			return getStyle;
		},

		cssInclude: function(pos, name, extra) {
			var cssRegex = /(\.css)$/,
				CSSAutoValid = /\.\w+\s*$/,
				CSSRecieve = jQuery.makeArray(name),
				CSSExtentions, CSSNodes, CSSValidator;

			jQuery.greps(CSSRecieve, function(_CSSName) {

				CSSNodes = document.createElement('link');
				CSSNodes.rel = "stylesheet";
				CSSNodes.type = "text/css";
				CSSNodes.contentType = "text/css";

				// autoValid CSSExtentions [ .cssd ] => output [ .css ];
				CSSValidator = _CSSName.replace(CSSAutoValid, ".css");
				CSSNodes.href = extra == true ? CSSValidator : _CSSName.trim();
				CSSNodes.media = "all"; // CSSChildNodes access all media

				if (cssRegex.exec(CSSNodes.href) === null) {
					throw TypeError(`Failed execute '${ _CSSName }' not valid CSSExtension.`);
				}

				CSSExtentions = document.querySelectorAll('link');
				jQuery.greps(CSSExtentions, function(_CSSExt) {
					if (CSSNodes.href !== _CSSExt.href) {
						pos === "after" ? document.body.append(CSSNodes) :
							pos === "before" ? document.head.append(CSSNodes) : "";

					} else {
						CSSNodes.remove();
					}
				});
			});
		},

		includeStyle: function(pos, styles) {

			var styleCode = document.createElement('style'),
				textNodes = document.createTextNode(styles);
			styleCode.append(textNodes);

			pos === "before" || pos === "prepend" ?
				document.head.insertAdjacentElement('beforeend', styleCode) :
				pos === "after" || pos === "append" ?
				document.body.insertAdjacentElement('beforeend', styleCode) : "";
		},

		TypeError: function(type, msg, error, min, max, show) {
			try {
				if (typeof msg !== "string") {
					return;
				}
				error = typeof error === "string" ? error : "";
				min = typeof min === "number" ? min : "";
				max = typeof max === "number" ? max : "";
				show = !show ? "error" : show.trim();

				msg = msg.replace(/[.]{3}/, `'${error}' `).replace(/(\{\})/, min).replace(/(\{\})/, max);
				throw new type(msg);

			} catch (_errors) {
				var message = _errors.message,
					line = _errors.stack;
				line = line.split("at");
				line = line[line.length - 1];
				line = "ErrorLocation:" + line;
				console[show](message + "\n\n" + line);
			};
		},

		scriptInclude: function(pos, name, extra) {
			var scriptRegex = /(\.js)$/,
				SRCAutoValid = /\.\w+\s*$/,
				SRCRecieve = jQuery.makeArray(name),
				SRCExtentions, SRCNodes, SRCValidator;

			jQuery.greps(SRCRecieve, function(_SRCName) {

				SRCNodes = document.createElement('script');
				SRCNodes.type = "text/javascript";
				SRCNodes.accept = "UTF-8";
				SRCNodes.contentType = "text/javascript";

				// autoValid SRCExtentions [ .jsd ] => output [ .js ];
				SRCValidator = _SRCName.replace(SRCAutoValid, ".js");
				SRCNodes.src = extra == true ? SRCValidator : _SRCName.trim();

				if (scriptRegex.exec(SRCNodes.src) === null) {
					throw TypeError(`Failed execute '${_SRCName}' not valid SCRIPTExtension.`);
				}

				SRCExtentions = document.querySelectorAll('script');
				jQuery.greps(SRCExtentions, function(_SRCExt) {
					if (SRCNodes.src !== _SRCExt.src) {
						pos === "after" ? document.body.append(SRCNodes) :
							pos === "before" ? document.head.append(SRCNodes) : "";

					} else {
						SRCNodes.remove();
					}
				});
			});
		},

		IncludeScript: function(pos, script) {
			var scriptNode = document.createElement('script'),
				textNodes = document.createTextNode(script);
			scriptNode.append(textNodes);

			pos === "before" || pos === "prepend" ?
				document.head.insertAdjacentElement('beforeend', scriptNode) :
				pos === "after" || pos === "append" ?
				document.body.insertAdjacentElement('beforeend', scriptNode) : "";
		},

		speed: function(speed, callback) {

			callback = callback || speed;
			var index = !speed[1] ? 0 : speed[1];
			// define and manufacturing speed three types [ slow, fast, default ] set the property [ speed ] ?
			var spds = Array.isArray(speed) ? speed[0] : undefined;
			var index = !speed[1] ? 0 : speed[1];
			speed = typeof speed !== "function" && !spds ? 40 + index : spds === "slow" ?
				100 + index : spds === "fast" ? 20 + index : spds;
			speed = typeof speed === "function" ? 40 : speed;

			// Start the interval for setInterval method and call the function width calback function
			// callback function when call so pass the parameters [ this, interval, clearInterval ] )
			var interval = setInterval(() => {
				typeof callback === "function" ? callback.call(speed, interval, clearInterval) : "";
			}, speed); // end interval functions not be work of outof limit interval ?
		},

		random: function(array, digits) {
			return MathFloorelement(array, digits)
		},

		concat: function(target, ...array) {
			if (arguments.length == 1) {
				return target;
			}

			var concat = target.concat(array);
			return Filter(concat.flat(Infinity));
		},

		flat: function(array, time) {

			// flating array infinite time && custom time array
			return !time ? array.flat(Infinity) : array.flat(time);
		},

		repeat: function(text, length) {
			return typeof text === "string" ? text.repeat(length) : undefined;
		},

		removeAttr: function(elems, value) {
			if (!value && typeof value == "string") return;
			jQuery.each(elems, function(_i, _elems) {
				jQuery.each(value.trim().split(" "), function(_i, attr) {
					if (_elems.hasAttribute(attr)) {
						_elems.removeAttribute(attr);
					}
				});
			});
		},

		attr: function(elems, name, value) {

			var key = ['checked', 'readonly', 'autocomplete', 'disabled', 'autofocus'],
				values = ['checked', 'readonly', 'on', 'disabled', 'on'],
				index = key.indexOf(name),
				argument = arguments.length;

			if (!name && !value) {
				return jQuery(rootjQuery).pushStack(elems);
			}

			if (argument === 2) {
				return jQuery(elems)[0].getAttribute(name) || undefined;
			}

			jQuery.each(elems, function(_i, trigger) {
				if (typeof value === "boolean") {
					if (value) {
						if (index >= 0) {
							trigger.setAttribute(key[index], values[index]);
						}
					} else {
						if (trigger.hasAttribute(name)) {
							trigger.removeAttribute(name);
						}
					}
				}

				if (argument === 3 && typeof value !== "boolean" && index >= 0) {
					trigger.setAttribute(key[index], values[index]);

				} else if (argument === 3 && typeof value !== "boolean") {
					trigger.setAttribute(name, jQuery.extraTrim(value) || value);
				}
			});

			return jQuery(rootjQuery).pushStack(elems);
		}
	});

	jQuery.each(("html text").split(" "),
		function(_i, name) {
			jQuery[name] = function(elems, value) {
				var contentx = name == "text" ? "textContent" : "innerHTML";
				return getHtmlOrTextContent(elems, value, contentx);
			};
		}
	);

	jQuery.each(
		("setLocalStorage setSessionStorage getLocalStorage getSessionStorage " +
			"clearLocalStorage clearSessionStorage clearStorage").split(" "),
		function(_i, name) {
			jQuery[name] = function(key, value) {
				return customizeLocalOrSessionStorage([key, value], name);
			};
		}
	);

	function fadeAll(elems, speed, to, callback) {
		if (!isHTMLObject(elems)) {
			return;
		}

		var fadeType = arguments[arguments.length - 1],
			callback = typeof callback == "function" ? callback :
			typeof to == "function" ? to : typeof speed == "function" ? speed : function() {},
			speeds = !speed || typeof speed == "function" ? 40 : speed == "slow" ? 100 : speed === "fast" ? 20 : speed;

		jQuery.loop(elems, function(trigger, _i) {
			var counter = 0,
				backup = trigger.style.cssText,
				getStyle = window.getComputedStyle(trigger),
				Opacity = Number(getStyle.opacity),
				count = 0,
				toInt = typeof to == "number" && to < 1 ? to : 0;

			if ((getStyle.display == "none" || getStyle.visibility == "hidden") &&
				fadeType == "fadeIn") {

				trigger.style.opacity = 0;
				trigger.style.display = "";

				jQuery.speed([speeds], function(interval, clear) {
					// counter++; increment now counter;
					counter = counter + .1;

					if (counter <= 1) {
						trigger.style.opacity = counter;
					} else {
						trigger.style = backup;
						trigger.style.display = "";
						callback.call(trigger, _i, trigger);
						clear(interval);
					}
				})
			};

			if (fadeType == "fadeOut" || fadeType == "fadeTo") {
				jQuery.speed([speeds], function(interval, clear) {
					// counter--; decrement now counter
					counter = counter - .1;
					trigger.style.display = "";

					if (window.getComputedStyle(trigger).display === "none") {
						clear(interval);
						return;
					}

					if ((Opacity + counter) >= toInt) {
						trigger.style.opacity = Opacity + counter;

					} else if (Number(window.getComputedStyle(trigger).opacity) < toInt) {
						trigger.style.opacity = Opacity - counter;

					} else {
						if (fadeType === "fadeOut" || !to) {
							trigger.style = backup;
							trigger.style.display = "none";
						}
						callback.call(trigger, _i, trigger);
						clear(interval);
					}
				})
			};
		});
	}


	jQuery.each(["fadeIn", "fadeOut", "fadeTo", "fadeToggle"],
		function(_i, name) {
			name == "fadeToggle" ?
				jQuery[name] = function(elems, speed, callback) {

					for (let i = 0; i < elems.length; i++) {
						var getStyle = window.getComputedStyle(elems[i]);

						if (getStyle.display === "none" || getStyle.visibility === "hidden") {
							jQuery.fadeIn(elems, speed, callback);
							break;
						} else {
							jQuery.fadeOut(elems, speed, callback);
							break;
						}
					}

				} : name == "fadeTo" ? jQuery[name] = function(elems, speed, to, callback) {
					fadeAll(elems, speed, to, callback, name);

				} : jQuery[name] = function(elems, speed, callback) {
					fadeAll(elems, speed, callback, name);
				};
		}
	);

	jQuery.each(
		("append prepend appendTo prependTo after before").split(" "),
		function(_i, name) {
			jQuery[name] = function(elems, html) {
				manipulationReplace(elems, name, html);
			};
		}
	);

	jQuery.extend({

		jqwin: {
			__docURL: document.URL,
			__pathname: window.location.pathname,
			__origin: window.location.origin,
			__host: window.location.host,
			__hostname: window.location.hostname,
			__protocol: window.location.protocole,
			__port: window.location.port,
			__href: window.location.href,
			__hash: window.location.hash,
			__search: window.location.search
		},
		__assing: (url) => window.location.assign(url),
		href: (url) => window.location.href = `${url}`,
		replace: (url) => window.location.replace(url),
		reload: () => window.location.reload(),
		close: (param1, param2, param3) => window.close(param1),
		hash: (url) => window.location.hash = `${url}`,
		search: (url) => window.location.search = `${url}`,

		getParam: (find, bool) => {

			var params = new URLSearchParams(!bool || bool === false ?
					window.location.search : bool === true ? bool : window.location.search),
				get = params.get(find);
			return !bool || bool === false ? get : bool === true ? params : get;
		}
	});


	jQuery.ajaxSettings = {
		xhr: function() {
			try {
				return new window.XMLHttpRequest();
			} catch (e) {};
		}
	};

	var xhrSupported = jQuery.ajaxSettings.xhr;

	/*
	 */
	jQuery.extend({

		ajax: function(url, options) {

			// If url is an object, simulate pre-1.5 signature
			if (typeof url === "object") {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var ajaxTree = {
				url: window.encodeURI(options.url),
				type: (options.type || "GET").toUpperCase(),
				data: (options.data),
				dataType: options.dataType,
				success: options.success || jQuery.noop,
				error: options.error || jQuery.noop
			}

			options.xhr = xhrSupported;

			var responseMatched, deepResponse, url,
				ajaxResponse = AjaxOrAPIresponseType,
				ajaxData = AjaxOrAPIdataHandle,
				ajaxHeaders = AjaxOrAPIsetHeaders,
				ajaxdataType = AjaxOrAPIdataType;


			/* 1) set dataType in XMLHttpRequest() for looks { dataType: "xml" } */
			options.dataType = ajaxdataType(options.dataType || options.url);

			/* 2) set dataTypes in XMLHttpRequest() for looks { dataTypes: ["text", "xml"] } */
			options.dataTypes = Filter(["text", ajaxdataType(options.dataType || options.url)]);

			/* 3) delete current data only external */
			delete options.data;

			/* 4) set contents in XMLHttpRequest() for looks { contents: {html:.., json:...,script..} } */
			options.contents = {
				html: /\bhtml/,
				json: /\bjson\b/,
				script: /\b(?:java|ecma)script\b/,
				xml: /\bxml\b/
			};

			/* 5) set accepts in XMLHttpRequest() for looks { accepts: {*: '.., html:.., json...} } */
			options.accepts = {
				'*': '*/*',
				html: "text/html",
				json: "application/json, text/javascript",
				script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
				text: "text/plain",
				xml: "application/xml, text/xml"
			};

			/* 6) set responseFields in XMLHttpRequest() for looks { json: "responseJSON", text:...} */
			options.responseFields = {
				json: "responseJSON",
				text: "responseText",
				xml: "responseXML"
			};

			/* 7) set contents in XMLHttpRequest() for looks { type: "GET" } */
			options.type = ajaxTree.type;

			/* 8) set async in XMLHttpRequest() for looks { async: true } */
			options.async = true;

			/* 9) set global in XMLHttpRequest() for looks { global: true } */
			options.global = true;

			/* 10) set hasContent in XMLHttpRequest() for looks { hasContent: true } */
			options.hasContent = true;

			/* 11) set isLocal in XMLHttpRequest() for looks { isLocal: false } */
			options.isLocal = false;

			/* 12) set crossDomain in XMLHttpRequest() for looks { crossDomain: false } */
			options.crossDomain = false;

			/* 13) set jsonp in XMLHttpRequest() for looks { jsonp: "callback" } */
			options.jsonp = "callback";

			/* 14) set processData in XMLHttpRequest() for looks { processData: true } */
			options.processData = true;

			/* 15) set success in XMLHttpRequest() for looks { success: functions () } */
			options.success = ajaxTree.success;

			/* 16) set error in XMLHttpRequest() for looks { error: function () } */
			options.error = ajaxTree.error;

			/* 17) set jsonpCallback in XMLHttpRequest() for looks { jsonpCallback: function() } */
			options.jsonpCallback = jQuery.noop;

			/* 18) set flatOptions in XMLHttpRequest() for looks { flatOptions: {url: true, context: true} } */
			options.flatOptions = {
				url: true,
				context: true
			};

			/* 19) set contents in XMLHttpRequest() for looks { data: 'name=modassir' or url: index.php?name=modassir } */
			if (ajaxTree.type === "GET" && ajaxTree.data) {

				var setURLdata = ajaxTree.url.includes("?") == true ? "&" +
					ajaxData(ajaxTree.data, options.dataType) : "?" + ajaxData(ajaxTree.data, options.dataType);

				options.url = options.url + setURLdata;

			} else if (ajaxTree.type === "POST" && ajaxTree.data || ajaxTree.type === "POST") {
				options.data = ajaxData(ajaxTree.data, options.dataType);

			} else if (options.dataType === "script") {
				options.url = options.url + "?_=" + jQuery.random([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], 13);

			} else {
				options.url = options.url;
			}

			/* 20) if not get data or detect undefined so delete data in options items */
			// showing data in options Object Handling now if data in exist value so data show else delete data
			typeof options.data === "undefined" || !options.data ? delete options.data : "";

			/* 21) set contentType in XMLHttpRequest() for looks {contentType: "Content-type", "applicat.." } */
			options.contentType = ("Content-type", "application/x-www-form-urlencoded charset=UTF-8");

			/* 22) set responseType in XMLHttpRequest() for looks { responseType: "json" } */
			options.responseType = ajaxResponse(ajaxTree.dataType || ajaxTree.url);

			// not used only defined && declare now  but not be used this variables
			deepResponse = options.dataType === "xml" ? "responseXML" :
				options.dataType === "html" ? "responseText" : options.dataType === "json" ? "responseJSON" : deepResponse = "response";


			/* startAjax XMLHttpRequest()
			 * start code from ajax setup && make plugins setup
			 * one time make ajax code and use multiple plugins
			 * Here data fetch using XMLHttRequest method jQuery
			 * ajax future only tow first success && second fail
			 * not be onprogress file uploader method Can't use
			 */
			var i,
				xhr = options.xhr();

			xhr.open(
				options.type,
				options.url,
				options.async,
				options.username,
				options.password
			);

			// Apply custom fields if provided
			if (options.xhrFields) {
				for (i in options.xhrFields) {
					xhr[i] = options.xhrFields[i];
				}
			}

			xhr.responseType = !options.overType ? options.responseType : options.overType;
			xhr.dataType = options.dataType;
			xhr.async = true;
			xhr.global = true;
			xhr.crossDomain = false;
			xhr.responseFields = options.responseFields;
			xhr.flatOptions = options.flatOptions;
			xhr.contents = options.contents;
			xhr.contentType = options.contentType;

			xhr.onprogress = jQuery.noop;
			xhr.onabort = jQuery.noop;

			var errorObject = jQuery.etag;
			responseMatched = ["json", "blob", "arraybuffer", "xml", "string", "text", "html", "basic"];

			xhr.onload = function() {


				/*
				 * AJAX Error Handling now => error handling work be advance with future
				 * showing error a object setup {error............multiple} functions &&
				 * single varible XMLHttpRequest informations for example code status []
				 * 1) get error && extra error future xml fail or done infomation && 
				 * 2) status infomations && xml onabort facility && xml onprogress && state
				 * 3) you want to set Headers && overrideMimeType or getAllresponseHeaders
				 * 4) get response Header so use this keyword=> in store all object () =>
				 * 5) || onerror: function(erroObj <--, error) use arrwo keyword parameter
				 */

				errorObject.readyState = xhr.readyState;

				errorObject.abort = xhr.onabort;

				errorObject.always = jQuery.noop;

				errorObject.catch = jQuery.noop;

				errorObject.done = xhr.DONE;

				errorObject.fail = jQuery.noop;

				errorObject.getAllResponseHeaders = xhr.getAllResponseHeaders;

				errorObject.getResponseHeader = xhr.getResponseHeader;

				errorObject.overrideMimeType = xhr.overrideMimeType;

				errorObject.pipe = jQuery.noop;

				errorObject.progress = xhr.onprogress;

				errorObject.promise = jQuery.noop;

				errorObject.responseJSON = options.dataType == "json" ? xhr.response : undefined;

				errorObject.setRequestHeader = xhr.setRequestHeader;

				errorObject.state = jQuery.noop;

				errorObject.status = xhr.status;

				errorObject.statusCode = jQuery.noop;

				errorObject.then = jQuery.noop;

				errorObject.timeout = xhr.timeout;

				// if no content
				if (xhr.status === 204) {
					errorObject.statusText = "nocontent";

				} else if (xhr.status === 304) {
					errorObject.statusText = "notmodified";

					// if not modified
				} else if (!xhr.statusText) {
					errorObject.statusText = "Error";

				} else if (xhr.status < 0) {
					xhr.status = 0;

				} else {
					errorObject.statusText = xhr.statusText;
				}

				/* Callback XMLHttpRequest() error
				 * if detect any errors small to small && large large so catch && store in Obj
				 * and after call $.ajax({error: functions(errorObj, error)}) functions called
				 * when function called so pass three parameters 1 parameter this keyword [*]
				 * and second parameters passed by advance xml error ObjectHub && third statusText
				 */

				xhr.onerror = function() {
					options.error.call(errorObject, errorObject, errorObject.statusText);
				};

				/* 18384) End error Handling for $.ajax({ object: values }); onerror 3 arguments req; */



				if (xhr.readyState === 4 && xhr.status === 200 && xhr.DONE === 4) {

					if (xhr.response == null && xhr.dataType == "xml") {
						options.error.call(errorObject, errorObject, "parsererror");

					} else if (xhr.response && xhr.response !== null) {
						options.success.call(options, xhr.response, "success");
					}

				} else if (xhr.status === 404 || xhr.status == 204 || xhr.status == 304 || xhr.status < 0) {

					options.error.call(errorObject, errorObject, errorObject.statusText);
				}

				return errorObject;
			}


			/* setRequestHeaders(*)
			 * 1) XMLHttpRequest() send a request Headers for html content or any data
			 * 2) setRequestHeader on work base most data send another file && server
			 *    - SEND FORM DATA [JSON, XML, HTML, TEXT, PHP, JAVASCRIPT, ANY..LANG]
			 *    - HELP of the setRequestHeader not be catch && not be blocked cross
			 *    - origin when use headers and auto Allow-Cross-Origin, ("*") on web
			 * 3) Not be cache Pragma && dataTypes && modulars and not be thrust cache
			 */
			ajaxHeaders(xhr, options.dataType, "Ajax", options.data);


			// Here send data of another server site && another file extentions
			// xhr help of the send diffrent diffrent types data => dataTypes
			// name are ( json, normalString, stringifyString, array, Object &&
			//  FormData, serializeData, && xmlData, phpData ) are sending types
			xhr.send(ajaxData(options.data, options.dataType));

			return xhr.onload();
		},

		getScript: function(url, callback) {
			return jQuery.get(url, undefined, callback, "script");
		},

		getJSON: function(url, data, callback) {
			return jQuery.get(url, data, callback, "json");
		},

		fetch: function(url, options) {

			if (typeof url === "object") {
				options = url;
			}

			options = options || {};

			var fetchTree = {
				url: window.encodeURI(options.url),
				type: (options.type || "GET").toUpperCase(),
				data: options.data,
				dataType: options.dataType,
				success: options.success || jQuery.noop,
				error: options.error || jQuery.noop
			}

			var objComponents = {},
				APIheaders = AjaxOrAPIsetHeaders,
				APIdata = AjaxOrAPIdataHandle,
				APIdataType = AjaxOrAPIdataType,
				APIresponstType = AjaxOrAPIresponseType;

			var url = fetchTree.url,
				type = fetchTree.type,
				data = fetchTree.data,
				dataType = fetchTree.dataType,
				success = fetchTree.success,
				error = fetchTree.error;


			options.global = true;
			options.isLocal = false;
			options.async = true;
			options.type = fetchTree.type;
			options.success = success;
			options.error = error;
			options.contents = {
				html: /\bhtml/,
				json: /\bjson\b/,
				script: /\b(?:java|ecma)script\b/,
				xml: /\bxml\b/
			};
			options.accepts = {
				'*': '*/*',
				html: "text/html",
				json: "application/json, text/javascript",
				script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
				text: "text/plain",
				xml: "application/xml, text/xml"
			};
			options.responseFields = {
				json: "responseJSON",
				text: "responseText",
				xml: "responseXML"
			};
			options.hasContent = true;
			options.crossDomain = false;
			options.jsonp = "callback";
			options.processData = true;
			options.jsonpCallback = jQuery.noop;
			options.flatOptions = {
				url: true,
				context: true
			};
			options.dataType = APIdataType(options.dataType || options.url);
			options.dataTypes = Filter(["text", APIdata(options.dataType)]);
			options.responseType = APIresponstType(options.dataType);
			options.contentType = ("Content-type", "application/x-www-form-urlencoded charset=UTF");

			if (type === "GET" && data) {
				if (url.includes("?") == true) {
					options.url = url + "&" + APIdata(data, options.dataType);
				} else {
					options.url = url + "?" + APIdata(data, options.dataType);
				}

			} else if (type === "POST") {
				options.data = data ? APIdata(data, options.dataType) : APIdata(data, options.dataType);

			} else {
				options.url = url;
			}
			if (options.dataType == "script" || options.dataType == "javascript") {
				options.url = url + "?_=" + jQuery.random([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], 13);

			}

			if (fetchTree.type === "GET") delete options.data;


			var prevObject = {},
				setResponse = options.responseType == "document" ||
				options.dataType == "javascript" || options.dataType == "script" ? "text" : options.responseType;


			/* start API XMLHttpRequest()
			 * start code from API setup && make plugins setup
			 * one time make API code and use multiple plugins
			 * Here data fetch using XMLHttRequest method jQuery
			 * API future only tow first success && second fail
			 * not be onprogress file uploader method Can't use
			 */
			fetch(options.url, {
				method: options.type,
				body: options.data,
				headers: APIheaders("", options.dataType, "headers", options.data),

			}).then((process) => {
				prevObject = process;
				return process[setResponse]();

			}).then((data) => {
				if (prevObject.status == 200 && prevObject.ok === true) {
					if (options.dataType === "xml") {
						options.success.call(options, jQuery.parseXML(data), "success");
					} else {
						fetchTree.success.call(options, data, "success");
					}
				} else {
					options.error.call(prevObject, prevObject, prevObject.statusText);
				}

				jQuery.each(prevObject, function(key, values) {
					objComponents[key] = values;
				});

				jQuery.setLocalStorage("object", objComponents);

			}).catch((error) => {

				/* Callback XMLHttpRequest() error
				 * if detect any errors small to small && large large so catch && store in Obj
				 * and after call $.fetch({error: functions(errorObj, error)}) functions called
				 * when function called so pass three parameters 1 parameter this keyword [*]
				 * and second parameters passed by advance xml error ObjectHub && third statusText
				 */
				fetchTree.error.call(error, error, "parsererror");
			});


			var prevObjects = $.getLocalStorage("object");

			prevObjects.API = function(url, type) {
				if (typeof type === "object") {
					return fetch(url, type);
				}
				return fetch(url, type);
			};

			jQuery.getJSON(options.url, options.data, function(data) {
				if (options.dataType == "json") {
					return prevObjects.responseJSON = data;
				}
			});

			if (options.dataType !== "json") {
				prevObjects.responseJSON = undefined
			};

			return prevObjects;
		},

		fetchScript: function(url, callback) {
			return jQuery.getAPI(url, undefined, callback, "script");
		},

		fetchJSON: function(url, data, callback) {
			return jQuery.getAPI(url, data, callback, "json");
		}
	});


	jQuery.each(["get", "post"], function(_i, method) {
		jQuery[method] = function(url, data, callback, type) {

			// Shift arguments if data argument was omitted
			if (typeof data == "function") {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			// The url can be an options object (which then must have .url)
			return jQuery.ajax({
				url: url,
				type: method,
				data: data,
				dataType: type || url,
				success: callback
			});
		};
	});

	jQuery.each(["getAPI", "postAPI"], function(_i, method) {
		jQuery[method] = function(url, data, callback, type) {

			// Shift arguments if data argument was omitted
			if (typeof data === "function") {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			return jQuery.fetch({
				url: url,
				type: method.slice(0, -3),
				data: data,
				dataType: type || url,
				success: callback
			});
		};
	});




	/* Voice changer convert[ text to voice ];
	 * ? jQuery.voice a multiple voice related object hubing
	 * jQuery.voice in only set a full setup plugins setting
	 * jQuery.voice.extra use set voice || change voice || 
	 * pause || resume voices help of the $.voice.objects ("*")
	 */
	jQuery.voice = {

		speechUtterance: function(voice) {
			return new window.SpeechSynthesisUtterance(voice);
		},

		speechSynthesis: window.speechSynthesis,

		speak: function(msg, lang) {
			var voiceObject = {},
				message, voice, lang;

			lang = !lang ? "en-US" : lang;
			message = new window.SpeechSynthesisUtterance();
			voice = window.speechSynthesis.getVoices();

			message.voice = voice[10];
			message.rate = 1;
			message.pitch = 0.8;
			message.volume = 1;
			message.text = msg;
			message.lang = lang;
			speechSynthesis.speak(message);

			jQuery.each(speechSynthesis, function(key, values) {
				voiceObject[key] = values;
			});

			return voiceObject;
		},

		speechErrorEvent: SpeechSynthesisErrorEvent,

		speechEvent: SpeechSynthesisEvent
	};

	jQuery.speak = function(message, lang) {
		// use voice message speaker text
		return jQuery.voice.speak(message, lang);
	};


	/* showHide Effect ?
	 * jQuery plugins library create showHide && toggle plugins
	 * show plugin will be work two types direct show && if set
	 * speed so showing slowing faded all plugins will be work
	 * same conditions showing effect base not change any effect
	 */
	var DisplayBackup = [];

	function showHide(elems, speed, callback, type) {
		var argumentValid = !speed && !callback ? false : true;
		jQuery.each(elems, function(_i, _elems) {

			if (typeof speed === "function") {
				callback = speed;
				speed = undefined;
			}

			if (jQuery.css(_elems, "display") !== "none") {
				DisplayBackup.push(_elems.style.display);
			}

			callback = callback || function() {};

			speed = !speed ? 2000 : speed === "slow" ?
				4000 : speed === "fast" ? 1000 : speed;

			var CSSMatched = window.getComputedStyle(_elems).display;

			if (argumentValid == false && type === "show") {
				_elems.style.display = DisplayBackup[_i];
				return;

			} else if (argumentValid == false && type == "hide") {
				_elems.style.display = "none";
				return;
			}
			if (argumentValid == false && type == "toggle") {
				CSSMatched !== "none" ? _elems.style.display = "none" :
					_elems.style.display = DisplayBackup[_i] || "";
				return;
			}

			if (argumentValid == true) {

				if (CSSMatched !== "none") {
					_elems.style.display = CSSMatched;
				} else if (CSSMatched == "none" && (type == "show" || type === "toggle")) {
					_elems.style.display = "";
					_elems.style.opacity = 0;
				}
			}


			var CSSBackup = _elems.style.cssText,
				getStyles = (prop) => window.getComputedStyle(_elems)[prop],
				CSSNumber = (prop) => parseInt(getStyles(prop), 10),

				X = CSSNumber("width"),
				Y = CSSNumber("height"),
				M = CSSNumber("margin"),
				P = CSSNumber("padding"),
				O = CSSNumber("opacity"),

				trigger = (prop, value) => _elems.style[prop] = value;

			var
				showX = 0,
				showY = 0,
				showM = 0,
				showP = 0,
				showO = 0,
				hideY = Y,
				hideX = X,
				hideM = M,
				hideP = P,
				hideO = O;

			if (argumentValid == true) {
				jQuery.speed([(speed * 2) / 1000], function(interval, clear) {

					showX = (showX <= parseInt(X)) ? showX + (X / 10) : 0;
					showY = (showY <= parseInt(Y)) ? showY + (Y / 10) : 0;
					showM = (showM <= parseInt(M)) ? showM + (M / 10) : 0;
					showP = (showP <= parseInt(P)) ? showP + (P / 10) : 0;
					showO = (showO <= parseInt(1)) ? showO + (1 / 10) : 0;

					hideX = (hideX >= 0) ? hideX - (hideX / 10) : parseInt(0);
					hideY = (hideY >= 0) ? hideY - (hideY / 10) : parseInt(0);
					hideM = (hideM >= 0) ? hideM - (hideM / 10) : parseInt(0);
					hideP = (hideP >= 0) ? hideP - (hideP / 10) : parseInt(0);
					hideO = (hideO >= 0) ? hideO - (hideO / 10) : parseInt(0);

					function CSSeffectControler(type) {
						if (type === "show" && CSSMatched === "none") {

							if (showO >= 1) {
								_elems.style = CSSBackup;
								_elems.style.opacity = "";
								_elems.style.display = DisplayBackup[_i];
								callback.call(_elems, _i, _elems);
								clear(interval);
							} else {
								trigger("display", DisplayBackup[_i] || "");
								trigger("opacity", showO)
								trigger("width", showX + "px");
								trigger("height", showY + "px");
								trigger("overflow", "hidden");
								trigger("margin", showM + "px");
								trigger("padding", showP + "px");
							}

						} else if (type === "hide" && CSSMatched !== "none") {

							if (hideO.toFixed(1) <= 0) {
								_elems.style = CSSBackup;
								trigger("display", "none");
								callback.call(_elems, _i, _elems);
								clear(interval);
							} else {
								trigger("opacity", hideO)
								trigger("width", hideX + "px");
								trigger("height", hideY + "px");
								trigger("overflow", "hidden");
								trigger("margin", hideM + "px");
								trigger("padding", hideP + "px");
							}
						}
					}

					type === "hide" && argumentValid == true ? CSSeffectControler("hide") :
						type === "show" && argumentValid == true ? CSSeffectControler("show") : null;

					type === "toggle" && CSSMatched === "none" && argumentValid == true ?
						CSSeffectControler("show") : CSSeffectControler("hide");

				})
			};
		});
	}


	/*!
	 * define typeof and check element dataType and check the nodeType
	 * and check window or document type and Array && Object [Element=>val]
	 */
	jQuery.each(
		("isString isNumber isBoolean isSymbol isObject " +
			"isNodeList isHistory isNavigator").split(" "),
		function(_i, name) {
			jQuery[name] = function(obj) {
				return obj === undefined ?
					undefined :
					obj.constructor.name === name.slice(2);
			};
		}
	);

	jQuery.isTypeof = function(obj) {

		if (!obj) {
			return;
		}

		return Object.prototype.toString.call(obj)
			.replace(/["\[\]']/g, "").split(" ")[1];
	};



	// Cross-browser xml parsing
	jQuery.parseXML = function(data) {
		var xml, xmlError;

		if (!data || typeof data !== "string") {
			return null;
		}

		// Support: IE 9 - 11 only
		// IE throws on parseFromString with invalid input.
		try {
			xml = (new window.DOMParser()).parseFromString(data, "text/xml");
		} catch (e) {};

		xmlError = xml && xml.getElementsByTagName("parsererror")[0];
		if (!xml || xmlError) {
			jQuery.TypeError(TypeError, "Invalid XML:" + (
				"Failed execute 'parseXML' document is empty '" +
				data + "' not be valid XMLTag please enter valid XMLTag"
			) + "\n\n" + "Suggest: @following <jquery></jquery>");
			return;
		}

		return xml;
	};



	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function(html) {
		var html, fragments, parsed;
		if (typeof html !== "string") {
			return [];
		}

		fragments = document.createElement('template');
		fragments.innerHTML = html;
		parsed = fragments.content;
		return jQuery.merge([], parsed.childNodes);
	};



	jQuery.isHTMLObject = isHTMLObject;
	jQuery.jQueryExpando = jQueryExpando;
	jQuery.isFunction = isFunction;
	jQuery.select = select;
	jQuery.type = toType;
	jQuery.isHTMLIdentifier = domElement;
	jQuery.isWindow = isWindow;
	jQuery.paseJSON = JSON.parse;
	jQuery.stringJSON = JSON.stringify;
	jQuery.isArray = Array.isArray;
	jQuery.camelCase = toCamelCase;
	jQuery.extraTrim = extraTrim;
	jQuery.capToTitle = capitalizeOrTitleCase;

	jQuery.now = Date.now;

	jQuery.isNumeric = function(obj) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type(obj);
		return (type === "number" || type === "string") &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN(obj - parseInt(obj));
	};

	jQuery.instanceOf = function intanceof(obj, match) {

		if (obj == null) {
			obj + "";
		}

		var result = obj instanceof match;
		return result;
	};

	jQuery.trim = function(text) {
		return text == null ?
			"" :
			(text + "").replace(RegExpr.rtrim, "");
	};


	var

		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,

		// Map over the $ in case of overwrite
		_$ = window.$;

	jQuery.noConflict = function(deep) {
		if (window.$ === jQuery) {
			window.$ = _$;
		}

		if (deep && window.jQuery === jQuery) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};




	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, http://jquery-mcoderajax.atwebpages.com/
	// and CommonJS for browser emulators (#13566)
	if (typeof noGlobal === "undefined") {
		window.jQuery = window.$ = jQuery;
	}



	return jQuery;
});