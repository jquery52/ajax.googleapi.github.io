/*!
* jQuery pure Javascript Library v3.5.8
* http://jquery-mcoderajax.atwebpages.com/
* 
* booststrapcdn pure Css Library v3.5.8
* http://mcoder-bootstrapcdn.atwebpages.com/
* 
* phpScript pure PHP Library config v3.5.8
* http://phpscript-mcoder.atwebpages.com/
* 
* Date: 09-23-2021 GMT 1:45:00 AM
*/

(function (global, factory) {

"use strict";

// ? check the module and after export from window requies
if (typeof module === "object" && typeof module.exports === "object") {

    /*! For CommonJS and environments where a proper 'window'
    /*! e.g. var require jQuery = ("jQuery")(window); */
    module.exports = global.doucument ?
        factory(global, true) :
        function (w) {
            if (!w.doucument) {
                throw new Error(`jQuery requires a window width a document`);
            }
            return factory(w);
        };
} else {
    factory(global);
};

// Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block. 
"use strict";

var arr = [];

var push = arr.push;

var getproto = Object.getPrototypeOf;

var flat = arr.flat ? function (array) {
    return arr.flat.call(array);
} : function (array) {
    return arr.concat.apply([], array);
};

var class2type = {};

var sort = arr.sort;

var slice = arr.slice;

var splice = arr.splice;

var isFunction = function isFunction(obj) {

    // Support: Chrome <=57, Firefox <=52
    // In some browsers, typeof returns "function" for HTML <object> elements
    // (i.e., `typeof document.createElement( "object" ) === "function"`).
    // We don't want to classify *any* DOM node as a function.
    // Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
    // Plus for old WebKit, typeof returns "function" for HTML collections
    // (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
    return typeof obj === "function" && typeof obj.nodeType !== "number" &&
        typeof obj.item !== "function";
};


var isWindow = function isWindow(obj) {
    return obj !== null && obj === obj.window;
};


function toType(obj) {
    if (obj == null) {
        return obj + "";
    }

    // Support: Android <=2.3 only (functionish RegExp)
    return typeof obj === "object" || typeof obj === "function" ?
        class2type[obj.toString.call(obj)] || "object" :
        typeof obj;
};
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
    version = "3.5.8",

    // Define a Local copy of jQuery
    jQuery = function (selector, contentx) {

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

    toArray: function () {
        slice.call(this);
    },

    eq: function (num) {

        return num >= 0 ? jQuery(this[num]) :
            jQuery(this[this.length + num]);
    },

    first: function () {

        return jQuery(this[0]);
    },

    last: function () {

        return jQuery(this[this.length - 1]);
    },

    each: function (callback) {
        return jQuery.each(this, callback);
    },

    odd: function () {

        var j = 0,
            arr = [],
            elem = this,
            len = elem.length;

        for (; j < len; j++) {

            // Mathematics use and get odd numbers
            j % 2 === 1 ? arr.push(elem[j]) : "";
        };
        return jQuery(arr);
    },

    even: function () {

        var j = 0,
            arr = [],
            elem = this,
            len = elem.length;

        for (; j < len; j++) {

            // Mathematics use and get event numbers
            j % 2 === 0 ? arr.push(elem[j]) : "";
        };
        return jQuery(arr);
    },

    slice: function (start, end) {

        var array = Array.prototype.slice.call(this);
        array = array.slice(start, end);
        return jQuery(array);
    },

    filter: function (target) {

        var i = 0,
            arr = [],
            elem = this,
            len = elem.length,
            target = typeof target === "string" ?
                document.querySelectorAll(target) : target;

        // Start target Element loop strt to end of end
        for (let e = i; e < target.length; e++) {
            // create Nested loop through check not Elements indexof();
            for (; i < len; i++) {
                if (elem[i] === target[e]) {
                    // if all proccess success so push all Array in arr;
                    arr.push(elem[i]);
                }
            }; // End Nested loop From Here now and not be access e;
        };
        return jQuery(arr);
    },

    not: function (target) {

        var e = 0,
            arr = [],
            elem = this,
            len = this.length,
            etarget = typeof target === "string" ?
                document.querySelectorAll(target) : target;

        // Target Element for Start loop on etarget last Elements end;
        for (let i = 0; i < etarget.length; i++) {

            // create Nested loop through check not Elements indexof();
            for (; e < len; e++) {
                if (elem[e] !== etarget[i]) {
                    // if all proccess success so push all Array in arr;
                    arr.push(elem[e]);
                }
            }; // End Nested loop From Here now and not be access e;
        };
        return jQuery(arr);
    },

    contains: function (context) {

        var elem = this;

        for (let i = 0; i < elem.length; i++) {
            if (elem[i].innerHTML.indexOf(context) >= 0 || elem[i].textContent.indexOf(context) >= 0) {

                // if match selector innerHTML || textContent on work by word so select on the
                // element so match successfully and again the retun jQuery( return ) hel of
                return jQuery(elem[i]);
            }
        }
    },

    // For internal use only.
    // Behaves like an Array's method, not like a jQuery method.
    push: push,
    sort: sort,
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
};


jQuery.extend = jQuery.fn.extend = function () {
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
                };
            }
        }
    }
    // Return the modified object
    return target;
};


// Regular Expression Hub
const jqExpr = {
    objExpr: /(\{){1}[ ]{0,}|["]|[:]|[ ]|[,]|[0-9 ]|(\})$/,
};
const jqErr = {
    TypeError: (err, max, min, show) => {
        console[show](`TypeError: Failed execute '${err}' is ${max} argument required, but only ${min} persent`)
    },
}

/*!
    |=====================================================================================================================================|
    |                       [ jQuery [ Array Plugins Mthod [ makeArray, inArray, setArray, arrrayFilter ] ]                               |
    |=====================================================================================================================================| 
*/

// ? Make the all type of Arrays from this 
// ? jQuery.extend method in convertation
jQuery.extend({

    timers: [],
    etag: {},
    cssProps: {},

    // results is for internal usage only
    makeArray: function (arr, results) {
        var ret = results || [];

        if (arr != null) {
            if (arr.constructor.name === "NodeList" ||
                arr.constructor.name === "jQuery" ||
                arr.constructor.name === "Array") {

                push.call(ret, ...arr);

                // if not detect NodeList && constructor name jQuery
                // so run this Query && execute else part push.call
            } else {
                push.call(ret, arr);
            }

        }
        return ret;
    },

    // inArray mothod will be check Array in value
    inArray: function (find, array) {

        if (!array) {
            return -1;
        }

        if (jQuery.isArray(array) === true) {

            return array.indexOf(find);
        }
    },

    // setArray method will be convert all elements in Array
    setArray: function (array) {
        var length = 1,
            regex = /(\s)*[\w]+(\s|,)+/gm,
            digit = /(\s)*[\d]+(\s|,)+/gm,
            argument = arguments || {},
            target = argument[length] || argument[0];

        // normal convertation Array && return new Array
        if (jQuery.isArray(array) === true) {

            // ? if detect array of isArray valid 
            // ? return new Array setup validate
            var ret = target.flat(Infinity),
                ret = ret.filter((v, i, a) => {
                    return a.indexOf(v) === i &&
                        typeof v !== "undefined" && v !== "";
                } );
            // return filter Array
            return ret; // return now
        }

        // normal convertation Object to new Array format
        if (isObject(array)) {

            var arr = [],
                ret = Object.entries(array),
                ret = arr.concat(ret),
                ret = ret.flat(Infinity);
            return ret;
        }

        // normal convertation String format to Array format
        if (regex.test(array) == true) {

            var csa = array.replace(/[,]/g, "").split(" ");
            return jQuery.arrayFilter(csa);
        }

        // normal convertation String format to Array format
        if (isString(array)) {

            var push = [],
                rqExpr = /^[0-9]{1,}$/;

            // convert String to Number if detect all numbring 
            // format in typeof String value so convert Array
            for (let i = 0; i < arguments.length; i++) {
                if (rqExpr.test(arguments[i]) == true) {
                    push.push(parseInt(arguments[i]));
                } else {
                    push.push(arguments[i])
                };
            };
            push = push.filter((v, i, a) => {
                return a.indexOf(v) === i && v && v !== "";
            } );
            return push;
        };
    },

    arrayFilter: function (array) {

        if (!array) {
            return this;
        }

        if (isArray(array)) {
            var retArray = array.filter((v, i, a) => {
                return a.indexOf(v) === i && v && v != null && v != undefined && v != "";
            } );
            return retArray.flat(Infinity);
        }

        if (isNodes(array)) {
            var retArray = Array.prototype.slice.call(array).filter((v, i, a) => {
                return a.indexOf(v) === i && v && v != null && v != undefined && v != "";
            } );
            return retArray.flat(Infinity);
        }

        if (isNode(array)) {
            return jQuery.makeArray(array.flat(Infinity));
        }
    }
} );

// fixed the @@non-call itrator error
if (typeof Symbol === "function") {
    jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
}


/*!
    |=====================================================================================================================================|
    |                             [ jQuery [ Looping Method $.each(), $.loop(), $.map(), $.Callbacks ]                                    |
    |=====================================================================================================================================| 
*/

// isSelector [ $.each(obj, callback() {}), $.loop(obj, callback() {})];
// not $(selector) loop only $.loop method $.alilas method create loop 
// create [ each, loop ] two types loop create now each base in and loop
jQuery.extend({
    each: function (obj, callback) {
        var length, i = 0,
            obj = obj.nodeType === 1 ? jQuery.makeArray(obj) : obj;

        if (isArrayLike(obj) ||
            obj.constructor.name === "jQuery") {
            length = obj.length;
            for (; i < length; i++) {
                if (callback.call(obj[i], i, obj[i]) === false) {
                    break;
                }
            };
        } else {
            for (i in obj) {
                if (callback.call(obj[i], i, obj[i]) === false) {
                    break;
                }
            };
        };
        return obj;
    },

    loop: function (obj, callback) {
        var length = obj.length,
            i = 0;

        for (; i < length; i++) {

            // loop method will be called now in callback []arg;
            // call four arguments first argument repersent [ this ]
            // and second argument [ index ] && [ value ] && [ array ];
            callback.call(obj[i], i, obj[i], obj);
        }
    },

    Callbacks: function (obj, callback) {

        var incFun,
            incVal = [],
            index = [],
            getArr = Array.prototype.slice.call(arguments);

        for (let j = 0; j < getArr.length; j++) {
            typeof getArr[j] === "function" ? incFun = getArr[j] : incVal.push(getArr[j]);
            index.push(j);
        };

        if (incFun !== undefined) {
            incFun.call(...incVal, index); // call callback function call now form with check
        }
        return this;
    },

    map: function (selector, callback) {

        if (isNodes(selector) || isNode(selector)) {
            var retMap = jQuery.makeArray(selector).map(function (v, i) {

                // now will be callback parameter call || callback now
                // and call the value type of three first [ this ] =>*
                // and second value will be call [ index ] and third *
                // will be called all [ Array values ] in callback func
                return callback.call(v, i, v);
            } );
            return retMap.filter((v, i) => {
                return v !== undefined && i !== undefined;
            } );
        }

        if (isArray(selector)) {
            var retMap = selector.map(function (v, i) {

                // now will be callback parameter call || callback now
                // and call the value type of three first [ this ] =>*
                // and second value will be call [ index ] and third *
                // will be called all [ Array values ] in callback func
                return callback.call(v, i, v);
            } );
            return retMap.filter((v, i) => {
                return v !== undefined && i !== undefined;
            } );
        }

        if (isObject(selector)) {

            var array = [];

            for (let obj in selector) {

                // now will be callback parameter call || callback now
                // and call the value type of three first [ this ] =>*
                // and second value will be call [ index ] and third *
                // will be called all [ Array values ] in callback func
                if (callback.call(null, selector[obj], obj) === false) {
                    break;
                }
                array.push(callback.call(null, selector[obj], obj));
            };
            return retMap.filter((v, i) => {
                return v !== undefined && i !== undefined;
            } );
        }
    }
} );

/*!
    |=====================================================================================================================================|
    |                          [ jQuery [ Advance Selector Method ] [ Ancestors, Descendants, Siblings ]                                  |
    |=====================================================================================================================================| 
*/

// Ancestors Method create plugins this plugins related by selector
// Advance Selecting Elements discus for $(selector).method();
// in here create plugins name are [ parent, parentsUntil, closest
// offsetParent ] [ method ] created by place Here now let's start
jQuery.fn.extend({

    parent: function () {
        var parent = [];
        jQuery.each(this, function () {
            var elemparent = this.parentElement;
            parent.push(elemparent);
        } );
        parent = parent.filter((v, i, a) => {
            return a.indexOf(v) === i && v !== "" && v && v != undefined;
        } );
        return jQuery(parent);
    },

    parents: function (target) {

        var parents = [],
            target = document.querySelectorAll(target);

        jQuery.each(this, function (e) {
            var i = 0,
                elem = this;

            while (elem = elem.parentElement) {

                if (!target) {
                    parents.push(elem);
                } else {
                    if (elem === target[e]) {
                        parents.push(elem);
                    }
                }
            };
        } );
        parents = parents.filter((v, i, a) => {
            return a.indexOf(v) === i && v !== "" && v && v != undefined;
        } );
        return jQuery(!target ? parents : parents.reverse());
    },

    parentsUntil: function (target) {

        var i = 0,
            j = 0,
            el = this,
            returnUntil = [],
            jqp = [],
            jqr = [],
            jqtar = document.querySelectorAll(target);

        // Make for loop && while loop with attach and get two Nodes values
        // first values [ get all parentElement for selector ] && => second
        // value [ get target Element if matched parentElement from selecotor ] 
        for (; i < el.length; i++) {
            while (el[i] = el[i].parentElement) {
                jqp.push(el[i]);
                if (el[i] === jqtar[i]) jqr.push(jqtar[i]);
            }
        };
        jqp = jqp.filter((v, i, a) => {
            return a.indexOf(v) === i && v && v != undefined;
        } );

        // check conditions and store existing values [ jqp[inc++] !== jqr[ 0 ] ];
        for (; jqp[j] !== jqr[0]; jqp[j++]) {
            returnUntil.push(jqp[j]);
        };
        return jQuery(returnUntil);
    },

    offsetParent: function () {

        var i = 0,
            jqt = [],
            el = this;

        for (; i < el.length; i++) {

            while (el[i] = el[i].parentElement) {
                if (window.getComputedStyle(el[i]).position !== 'static') {
                    jqt.push(el[i]);
                    break; // break statement use be if get first element with [*]
                    // position so select first element and else override element
                }
            }
            break; // break statement use be break repeated same value;
        };
        return jqt.length !== 0 ? jQuery(jqt) : jQuery(document.querySelector('html'));
    },

    closest: function (target) {

        var el = this,
            array = [],
            retclost = [],
            jqtar = document.querySelectorAll(target);

        for (let a = 0; a < el.length; a++) {
            while (el[a] = el[a].parentElement) {
                array.push(el[a]);
            }
            break;
        };

        for (let b = 0; b < jqtar.length; b++) {
            for (let c = 0; c < array.length; c++) {
                if (jqtar[b] == array[c]) {
                    retclost.push(array[c])
                }
            }
        };
        return jQuery(retclost[retclost.length - 1]);
    }
} );



// Descendants methods create plugins this plugins related by selector
// Advace Selecting Elements discus for $(selecto).method(); [ select ]
// I create in here Descendants emthod [ find, children ] plugins create
jQuery.fn.extend({
    find: function (selector) {

    },

    children: function (selector) {

        var array = [],
            retchildren = [],
            elem = jQuery(this),
            selec = document.querySelectorAll(selector);

        for (let j = 0; j < elem.length; j++) {
            array.push(...elem[j].children);
        };

        for (let m = 0; m < array.length; m++) {
            for (let c = 0; c < selec.length; c++) {
                if (array[m] === selec[c]) {
                    retchildren.push(array[m]);
                }
            };
        };
        return jQuery(!selector ? array : retchildren);
    },

    find: function (selector) {

        var array = [],
            elem = this;

        for (let j = 0; j < elem.length; j++) {
            var selecting = elem[j].querySelectorAll(selector);
            array.push(...selecting);
        };
        return jQuery(array);
    }
} );



// Siblings method create plugins this plugins related by selector
// Advance Selecting Elements discus for $(selector).method();
// in here create plugins name are [ prev, next, siblings, prevUntil
// nextUntil, prevAll, nextUntil ] [ methods ] are creating here now
jQuery.fn.extend({

    // $(element).sibling(target) method is used by get Elements
    // all previous and next Elements sibling HTMLelements access
    siblings: function (target) {
        var arr = [];

        jQuery.each(this, function (i) {
            if (target == "" || typeof target == "undefined") {

                var matchElement = this,
                    parent = this.parentElement,
                    children = parent.children;

                jQuery.each(children, function () {
                    if (this !== matchElement) {
                        arr.push(this);
                    }
                } );
            } else {

                var prevElement = this,
                    parent = this.parentElement,
                    children = parent.children,
                    matchElement = typeof target === "string" ? document.querySelectorAll(target) : target;

                // build tow loop function in one row and firs loop var name [ m ] && [ j ] second loop var
                for (let m = 0; m < children.length; m++) {
                    for (let j = 0; j < matchElement.length; j++) {

                        // run and execute all query checking element existing prevElement && nextTarget Element
                        if (children[m] === matchElement[j] && children[m] !== prevElement) {
                            arr.push(children[m]);

                        } // End checking elemnets element parsents && when all proccess complete so push in arr
                    }
                };
            }
        } );

        // remove duplicate array && repeated value && index && value form filter method;
        var ret = arr.filter((v, i, a) => {
            return a.indexOf(v) === i && v != "" && typeof v != "undefined";
        } );
        return jQuery(ret);
    },

    // $(element).next() method will be used on get Element next Element for example let
    // element tree h1 -> h2 -> p -> footer so if target h2 of next $('h2').next() output [ p ]
    next: function () {

        var retarr = [];
        jQuery.each(this, function () {

            // make nextElements for nexElementSibling method => next
            // on get taget of nextElements and after return jQuery(...)
            var nextElements = this.nextElementSibling;
            if (nextElements != null) {
                retarr.push(nextElements)
            };
        } );
        return jQuery(retarr);
    },

    // $(element).prev() method will be used on get Element previous Element for example let
    // element tree h1 -> h2 -> p -> footer so if target h2 of previous $('h2').prev() output [ h1 ]
    prev: function () {

        var retarr = [];
        jQuery.each(this, function () {

            // make previousElement for previousElementsSibling method
            // on get taget of previousElement and after return jQuery(...)
            var prevElements = this.previousElementSibling;
            if (prevElements != null) {
                retarr.push(prevElements)
            };
        } );
        return jQuery(retarr);
    },

    // $(element).nextAll() method will be use get All nextElements for targeter of way for exp...
    // let a element tree h1 -> h2 -> h3 -> p -> code [ $('h2').nextAll() ] output [ h3, p, code ];
    nextAll: function () {
        var sibs = [];
        jQuery.each(this, function () {

            var elems = this;

            while (elems = elems.nextSibling) {
                if (elems.nodeType === 3) continue;
                sibs.push(elems);
            }; // End while loop and get all nexelement
        } );
        return jQuery(sibs);
    },

    // $(element).prevAll() method will be use get All prevElements for targeter of back for exp...
    // let a element tree h1 -> h2 -> h3 -> p -> code [ $('code').nextAll() ] output [ h3, h2, h1 ];
    prevAll: function () {

        var prev = [];

        jQuery.each(this, function (i, elems) {

            while (elems = elems.previousSibling) {
                if (elems.nodeType === 3) continue;
                prev.push(elems);
            }
        } );
        return jQuery(prev);
    },

    // $(element).nextUntil(target) method will be use get Element of next Element a limited on set
    // el tree h1-> h2-> h3-> h4-> p-> code->a [ $('h3').nextUntil('a') ] output [ h4, p, code ];
    nextUntil: function (target) {
        var i = 0,
            nUntil = [],
            target = document.querySelector(target);
        jQuery.each(this, function (i, v) {

            while (v = v.nextSibling) {
                if (v.nodeType === 3) continue;
                if (v === target) break; {
                    nUntil.push(v);
                }
            };
        } );
        nUntil = nUntil.filter((v, i, a) => {
            return a.indexOf(v) === i && v != null && v != undefined;
        } );
        return jQuery(nUntil);
    },

    // $(element).prevUntil(target) method will be use get Element of prev Element a limited on set
    // el tree h1-> h2-> h3-> h4-> p-> code->a [ $('code').nextUntil('h1') ] output [ p, h4, h3, h2 ];
    prevUntil: function () {
        var i = 0,
            nUntil = [],
            target = document.querySelector(target);
        jQuery.each(this, function (i, v) {

            while (v = v.previousSibling) {
                if (v.nodeType === 3) continue;
                if (v == target) break; {
                    nUntil.push(v);
                }
            };
        } );
        // remove duplicate && repeated HTMLElements for filter methods
        nUntil = nUntil.filter((v, i, a) => {
            return a.indexOf(v) === i && v != null && v != undefined;
        } );
        nUntil.pop(); // delete first index [].pop() method delete [x,...]
        return jQuery(nUntil);
    },
} );

// $(selector).is(selector) && $(selector).has(selector) method will be use check Elements class
// Attribute && etc. this method will be give two result [ 1. true && 2. false ] use conditions
jQuery.fn.extend({
    has: function (selector) {

        var rethas = [];
        var el = jQuery(this);

        for (let i = 0; i < el.length; i++) {
            var newel = el[i].querySelectorAll(selector);
            if (newel.length > 0 && newel !== null && newel !== undefined) {
                rethas.push(el[i]);
            }
        };
        return jQuery(rethas);
    },

    is: function (selector) {

        var el = jQuery(this),
            selec = document.querySelectorAll(selector);
        for (let _i = 0; _i < el.length; _i++) {
            for (let _c = 0; _c < selec.length; _c++) {
                if (el[_i] === selec[_c]) {
                    return true;
                }
            };
        }
        return false;
    }
} );



// getWidthOrHeight created now for ever this function will be
// used on getting fully Width && Height in point so for example
// write method getWidthOrHeight(HTMLElements, +2 or -2 or 3, 
// width or height, 0 - 8 remove value after point) forx thie 
// 52.3245683 you can give last param in 2 so remove 2 length after
// point 52.32456 && give last param in 4 so output [ 52.324 ] [*]

function getWidthOrHeight(elem, extra, get, fixed) {
    var get = get || extra,
        el = jQuery.makeArray(elem),
        extra = typeof extra === "number" || /^[0-9a-z+-\/=%*]{1,}$/.test(extra) ? extra : 0;


}
/*!
    |=====================================================================================================================================|
    |                               [ jQuery $.plugins method == it's here not be use Selector ]                                          |
    |=====================================================================================================================================| 
*/
function clearSTRG(key, jqstrg) {
    !key ? jqstrg.clear() : jqstrg.removeItem(key);
}

function getSTRG(key, jqstrg) {
    var get = jqstrg.getItem(key);
    var getItem = jqExpr.objExpr.test(get) === true ? JSON.parse(get) : get;
    if (!key) {
        console.error('TypeError: Failed execute Storage 1 Argument required, but only 0 persent');
    } else if (getItem == null) {
        console.error('TypeError: Failed execute Not exist any values in Storage.');
    } else {
        return getItem;
    }
}

function setSTRG(key, values, jqstrg, STRGName) {
    return !key ? jqErr.TypeError(STRGName, 2, 0) :
        key && !values ? jqErr.TypeError(STRGName, 2, 1) :
            jQuery.isObject(values) == true ? jqstrg.setItem(key, JSON.stringify(values)) :
                jqstrg.setItem(key, values);
}

// Element single selector && set method some look type $.hide(element, 'slow'); type of alilas function
// all function are created document && document element && window base of selector no any other selector
jQuery.extend({
    setLocalStorage: function (key, values) {
        setSTRG(key, values, localStorage, 'setLocalStorage')
    },

    getLocalStorage: function (key) {
        return getSTRG(key, localStorage)
    },

    setSessionStorage: function (key, values) {
        setSTRG(key, values, sessionStorage, 'setSessionStorage')
    },

    getSessionStorage: function (key) {
        return getSTRG(key, sessionStorage)
    },

    clearLocalStorage: function (key) {
        clearSTRG(key, localStorage)
    },

    clearSessionStorage: function (key) {
        clearSTRG(key, sessionStorage)
    },

    clearStorage: function () {
        localStorage.clear();
        sessionStorage.clear();
    }
} );


jQuery.extend({

    css: function (elem, style, name) {
        jQuery.each(elem, function (i, v) {
            isString(style) ? this.style[style] = name :
                isObject(style) ? jQuery.each(style, function (key) {
                    v.style[key] = this;
                }) : undefined;
        } );
    },

    cssExternal: function (pos, styles) {

        var styleCode = document.createElement('style');
        styleCode.insertAdjacentHTML('beforeend', styles);

        pos === "before" || pos === "prepend" ?
            document.head.insertAdjacentElement('beforeend', styleCode) :
            pos === "after" || pos === "append" ?
                document.body.insertAdjacentElement('beforeend', styleCode) : "";
    },

    cssInclude: function (pos, link) {

        var
            validLink = link ? link.split(/[.]/g) : "",
            extName = validLink[validLink.length - 1];

        if (extName === "css") {

            var
                createLink = document.createElement('link');
            createLink.rel = "stylesheet";
            createLink.type = "text/css";
            createLink.href = link;

            pos === "before" || pos === "prepend" ?
                document.head.insertAdjacentElement('beforeend', createLink) :
                pos === "after" || pos === "append" ?
                    document.body.insertAdjacentElement('beforeend', createLink) : "";

        } else {
            throw new TypeError(`Failed execute '${link}' is not valid CSS extention`);
        };
    },

    html: function (elem, value) {
        var ret = "" || [];
        jQuery.each(elem, function () {
            if (elem && !value) {
                ret += this.innerHTML;
            } else {
                this.innerHTML = `${value}`;
                ret.push(this);
            }
        } );
        return ret;
    },

    text: function (elem, value) {
        var ret = "" || [];
        jQuery.each(elem, function () {
            if (elem && !value) {
                ret += this.textContent
            } else {
                this.textContent = `${value}`;
                ret.push(this);
            }
        } );
        return ret;
    },

    attr: function (elem, name, value) {
        var ret = "" || [],
            el = jQuery.makeArray(elem);

        for (let i = 0; i < el.length; i++) {
            elem = el[i];

            if (elem && typeof value === "undefined") {

                return elem.getAttribute(name) === null ?
                    undefined : elem.getAttribute(name);

            } else if (value === false) {

                ret.push(elem);
                elem.removeAttribute(name);

            } else {

                var key = ['checked', 'readonly', 'autocomplete', 'disabled', 'autofocus'],
                    values = ['checked', 'readonly', 'on', 'disabled', 'on'],
                    index = key.indexOf(name);

                (index >= 0) && ((value === true || value === "") && index >= 0) ?
                    elem.setAttribute(key[index], values[index]) :
                    !value ? undefined : elem.setAttribute(name, value.trim());
                ret.push(elem);
            }
        };
        return ret;
    },

    removeAttr: function (elem, value) {
        jQuery.each(elem, function () {
            if (this.hasAttribute(value)) {
                this.removeAttribute(value);
            }
        } );
        return jQuery(elem);
    },

    toggleClass: function (elem, value) {

        jQuery.each(elem, function () {
            if (value) {
                this.classList.toggle(value);
            }
        } );
        return jQuery(elem);
    },

    addClass: function (elem, ...value) {

        jQuery.each(elem, function () {
            if (value) {
                this.classList.add(...value);
            }
        } );
        return jQuery(elem);
    },

    removeClass: function (elem, ...value) {

        jQuery.each(elem, function () {
            if (value) {
                this.classList.remove(...value);
            }
        } );
        return jQuery(elem);
    },

    hasClass: function (elem, value) {
        var el = jQuery.isNodes(elem) == true ? elem : jQuery.makeArray(elem);
        for (var i = 0; i < el.length; i++) {
            if (el[i].classList.contains(value)) {
                return el[i].classList.contains(value);
            }
        };
        return false;
    },

    hasAttr: function (elem, value) {
        var el = jQuery.isNodes(elem) == true ? elem : jQuery.makeArray(elem);
        for (var i = 0; i < el.length; i++) {
            if (el[i].hasAttribute(value)) {
                return true;
            }
        };
        return false;
    },

    parseHTML: function (selector) {

        var ret = [];
        var el = document.createElement('template');
        el.innerHTML = selector;
        el = el.content.childNodes;

        // ? Retrun statement for return parseHTML values
        ret.push(Object.values(el));
        ret = ret.flat(Infinity);
        console.log(ret);
        // return ret;
    },

    hide: function (elem, speed, callback) {

        if (isFunction(speed)) {
            callback = callback || speed;
        }

        jQuery.each(elem, function (_i, _v) {

            if (!speed || !callback) {
                return this.style.display = "none";
            }

            speed = typeof speed === "undefined" ||
                callback == "undefined" || speed === "" ?
                0 : speed === "slow" ? 500 : speed === "fast" ? 250 : speed;

            var
                backup = this.style.cssText,
                style = this.style,
                getStyle = window.getComputedStyle(this),
                m = getStyle.margin,
                p = getStyle.padding,
                w = getStyle.width,
                h = getStyle.height,
                o = getStyle.opacity;

            if (getStyle.display !== "none" || getStyle.visibility !== "hidden") {
                style.margin = m,
                    style.padding = p, style.width = w,
                    style.height = h, style.overflow = 'hidden';

                this.animate([{
                    margin: '0px',
                    padding: '0px',
                    width: '0px',
                    height: '0px',
                    overflow: 'hidden',
                    opacity: 0
                }], {
                    duration: speed,
                    iterations: 1
                } );
            }

            setTimeout(() => {
                this.style = backup, this.style.display = "none";
                if (typeof callback !== "undefined") {
                    callback.call(_v, _i, _v);
                }
            }, speed);

        } );
    },

    show: function (elem, speed, callback) {

        if (isFunction(speed)) {
            callback = callback || speed;
        }

        jQuery.each(elem, function (_i, _v) {

            speed = typeof speed === "undefined" ||
                callback == "undefined" || speed === "" ?
                0 : speed === "slow" ? 500 : speed === "fast" ? 250 : speed;


            var
                backup = this.style.cssText,
                style = this.style,
                getStyle = window.getComputedStyle(this),
                m = getStyle.margin,
                p = getStyle.padding,
                w = getStyle.width,
                h = getStyle.height,
                o = getStyle.opacity;

            if (getStyle.display == "none" || getStyle.visibility == "hidden") {

                style.margin = m, style.display = "",
                    style.padding = "0px", style.width = "0px",
                    style.height = "0px", style.overflow = 'hidden';

                this.animate([{
                    margin: m,
                    padding: p,
                    width: w,
                    height: h,
                    overflow: 'hidden',
                    opacity: 1
                }], {
                    duration: speed,
                    iterations: 1
                } );
            }

            setTimeout(() => {
                this.style = backup, this.style.display = "";
                if (typeof callback !== "undefined") {
                    callback.call(_v, _i, _v);
                }
            }, speed);

        } );
    },

    toggle: function (elem, speed, callback) {

        for (let i = 0; i < elem.length; i++) {
            var getStyle = window.getComputedStyle(elem[i]);
            if (getStyle.display === "none" || getStyle.visibility === "hidden") {
                jQuery.show(elem, speed, callback);
                break;
            } else {
                jQuery.hide(elem, speed, callback);
                break;
            }
        }
    },

    camelCase: function (string) {

        var arr = [],
            string = string.trim().split(/[- ,:]/g);

        for (let i = 1; i < string.length; i++) {
            var str = string[i].substr(0, 1).toUpperCase() + string[i].substr(1);
            arr.push(str);
        };

        var ret = string[0].toLowerCase() + JSON.stringify(arr).replace(/[\[\]",]/g, "");
        return ret;
    },

    Animation: function (elem, anim) {

        $.loop(elem, function (index, elemval) {
            for (let property in anim) {

                var compute = window.getComputedStyle(elemval)[property];
                elemval.style[property] = `${compute}`;

                elemval.animate([{
                    [property]: anim[property]
                }], {
                    duration: 300,
                    iterations: 1
                } );

                setTimeout(() => {
                    elemval.style[property] = anim[property];
                }, 300);
            };
        } );
    },

    speed: function (speed, callback) {

        callback = callback || speed;
        var index = !speed[1] ? 0 : speed[1];
        // define and manufacturing speed three types [ slow, fast, default ] set the property [ speed ] ?
        var spds = jQuery.isArray(speed) ? speed[0] : undefined;
        var index = !speed[1] ? 0 : speed[1];
        speed = typeof speed !== "function" && !spds ? 40 + index : spds === "slow" ?
            100 + index : spds === "fast" ? 20 + index : spds;
        speed = typeof speed === "function" ? 40 : speed;

        // Start the interval for setInterval method and call the function width calback function
        // callback function when call so pass the parameters [ this, interval, clearInterval ] )
        var interval = setInterval(() => {
            typeof callback === "function" ? callback.call(this, interval, clearInterval) : "";
        }, speed);
    },


    fadeIn: function (elem, speed, callback) {

        callback = callback || speed;

        // start the each function read value and set value one by one step by step
        // here pass the NodeList and Object value and set the loop for help of each
        jQuery.each(elem, function (i, v) {

            var jqloop = 0,
                backup = v.style.cssText,
                getStyle = window.getComputedStyle(v),
                o = Number(getStyle.opacity);

            // check the condition if element style of display [ none, hidden ] so
            // this mehtod will be work if not conditon match so no be work condition
            if (getStyle.display === "none" || getStyle.visibility === "hidden") {

                v.style.opacity = 0;
                // by default display bloack beacuse element effect smoothly show ?
                // if by chance let v not display block so elemeent not be showing
                v.style.display = "";

                // start the interval function on help of jQuery plugin jQuery.speed plugins
                // this plugins take be two arguments 1 arguments speed value 2 arg callback
                jQuery.speed([speed], function (int, clear) {

                    // jqloop++ 0.1 / value on the lopp system interval method
                    jqloop = jqloop + .1;

                    // make a condition on set the opacity in elements if jqloop
                    // on small 1 and 1 biggest on jqloop so entry v style opacity
                    // anything and else out of loop in v opacity and clrear intv
                    if (jqloop <= 1) {
                        v.style.opacity = jqloop;
                    } else {
                        // set by default set css property return set backup method
                        // backup in all value store so befored set and this method on
                        // workable set before setup value or property repeat set *
                        v.style = backup;
                        v.style.display = "";

                        // here check normal condition if callback is a function so callback.call now and
                        // pass three parameter 1 parameter this keyword => and second value and 3 index
                        typeof callback === "function" ? callback.call(v, i, v) : undefined;
                        clear(int);
                    }
                } );
            }
        } );
        return jQuery(elem);
    },

    fadeOut: function (elem, speed, callback) {

        callback = callback || speed;

        // start the each function read value and set value one by one step by step
        // here pass the NodeList and Object value and set the loop for help of each
        jQuery.each(elem, function (i, v) {

            var jqloop = 0,
                backup = v.style.cssText,
                getStyle = window.getComputedStyle(v),
                o = Number(getStyle.opacity);

            // start the interval function on help of jQuery plugin jQuery.speed plugins
            // this plugins take be two arguments 1 arguments speed value 2 arg callback
            jQuery.speed([speed], function (int, clear) {

                // jqloop++ 0.1 / value on the lopp system interval method
                jqloop = jqloop - .1;

                // make a condition on set the opacity in elements if jqloop
                // on small 1 and 1 biggest on jqloop so entry v style opacity
                // anything and else out of loop in v opacity and clrear intv
                if (o + jqloop > 0) {
                    v.style.opacity = o + jqloop;
                } else {
                    // set by default set css property return set backup method
                    // backup in all value store so befored set and this method on
                    // workable set before setup value or property repeat set *
                    v.style = backup;
                    v.style.display = "none";

                    // here check normal condition if callback is a function so callback.call now and
                    // pass three parameter 1 parameter this keyword => and second value and 3 index
                    typeof callback === "function" ? callback.call(v, i, v) : undefined;
                    clear(int);
                }
            } );
        } );
        return jQuery(elem);
    },

    find: function (elem, fnd) {

        function findnow(param) {
            return param == elem;
        }
        var ret = fnd.find(findnow);
        return ret;
    },

    findIndex: function (elem, fnd) {

        function findnow(param) {
            return param === elem;
        }
        var ret = fnd.findIndex(findnow);
        return ret;
    },

    repeat: function (name, length) {

        // return now repeated value
        return typeof name === "string" ? name.repeat(length) : "Please Select a String value";
    },

    trim: function (text) {

        // return text trim white space and set of value
        // according to respact the order and worked 
        return text.trim();
    },

    slice: function (value, start, end) {

        if (value.nodeType === 1 || value.constructor.name === "NodeList") {
            var arr = jQuery.makeArray(value);
            return arr.slice(start, end);
        }

        if (typeof value !== "number" && typeof value !== "object") {
            // return sliced value array && string;
            return value.slice(start, end);
        }
    },

    flat: function (target, time) {

        // flat now for all array from here
        return !time ? target.flat(Infinity) : target.flat(time);
    },

    concat: function (target, ...arrays) {

        var concate = target.concat(arrays);
        return concate.flat(Infinity);
    },

    getStyle: function (elem, styles, arr) {
        var array = typeof arr !== "undefined" && arr === true ? [] : "",
            reg = /[a-zA-Z]/g,
            regex = /\b[0-9]{0,}/gm,
            el = jQuery.makeArray(elem);

        $.each(el, function () {
            var style = window.getComputedStyle(this).getPropertyValue(styles);
            typeof arr !== "undefined" && arr === true ? array.push(style) :
                regex.test(style) && reg.test(style) === false ?
                    array = Number(style) : array += style;
        } );
        return array;
    },

    filter: function (target, callback) {

        var elem = $.convertArray(target);
        elem.filter((value, index, array) => {

            // ? Call the callback function on owner
            // ? from filter function with array type
            // ? selector and store 3 arguments and
            // ? and one call this keyword => reffer
            if (value !== "" || typeof value == "undefined") {

                callback.call(value, value, index, array);
            };
        } );
    },

    clone: function (elem, pos, target) {
        var ret = "",
            copy = "",
            array = ['afterbegin', 'beforeend'],
            position = pos === "after" || pos === "append" ? array[1] :
                pos === "before" || pos === "prepend" ? array[0] : array[1];

        var el = jQuery.makeArray(elem);
        var targets = jQuery.makeArray(target);

        if (jQuery.isString(elem) === true && jQuery.isElement(elem) === false) {

            $.each(targets, function () {
                this.insertAdjacentHTML(position, elem);
            } );
            /*! if elem isTypeof NodeList && Node detected so reaction */
        } else {
            for (var r = 0; r < el.length; r++) {
                if (pos === undefined || target === undefined) {
                    ret += el[r].outerHTML;
                    return ret;
                } else {
                    copy += el[r].outerHTML;
                }
            };
        }
        // ? elem copy outerElement and set target nodes
        if (pos !== "" && target !== "") {

            for (var i = 0; i < targets.length; i++) {
                targets[i].insertAdjacentHTML(position, copy);
            };
        };
        return elem;
    },

    innerSet: function (target, type, place, replace) {
        if (jQuery.isTypeof(target) == "Object" || jQuery.isNode(target) || jQuery.isNodes(target)) {

            type = !type ? "insertAdjacentHTML" : type === "element" ? "insertAdjacentElement" :
                type === "text" ? "insertAdjacentText" : type === "html" ? "insertAdjacentHTML" : "insertAdjacentHTML",

                place = place.trim(),
                place = place === "append" ? "after" : place === "prepend" ? "before" : place,
                place = !place ? "beforeend" : place === "after" ? "beforeend" : place === "before" ? "afterbegin" : "beforeend";


            if (jQuery.isNodes(target) || target.constructor.name == "jQuery") {
                jQuery.each(target, function (_i, trigger) {

                    if (jQuery.isNodes(replace) || jQuery.isNode(replace) ||
                        replace.constructor.name == "jQuery" || jQuery.isArray(replace)) {

                        // only run this code Object && nodeList formate input 
                        var appender = place === "beforeend" ? "append" : "prepend";
                        jQuery.each(replace, function () {
                            trigger[appender](this);
                        } );

                    } else {

                        // without detect run this code only String format
                        this[type](place, replace);
                    }
                } );
            } else {
                target[type](place, replace);
            }
        }
    },

    outerSet: function (target, type, place, replace) {
        if (jQuery.isTypeof(target) == "Object" || jQuery.isNode(target) || jQuery.isNodes(target)) {

            type = !type ? "insertAdjacentHTML" : type === "element" ? "insertAdjacentElement" :
                type === "text" ? "insertAdjacentText" : type === "html" ? "insertAdjacentHTML" : "insertAdjacentHTML",

                place = place.trim(),
                place = place === "append" ? "after" : place === "prepend" ? "before" : place,
                place = !place ? "afterend" : place === "after" ? "afterend" : place === "before" ? "beforebegin" : "afterend";

            if (jQuery.isNodes(target) || target.constructor.name == "jQuery") {
                jQuery.each(target, function (_index, trigger) {

                    if (jQuery.isNodes(replace) || jQuery.isNode(replace) ||
                        replace.constructor.name == "jQuery" || jQuery.isArray(replace)) {

                        // only run this code Object && nodeList formate input
                        var appender = place === "afterend" ? "after" : "before";
                        jQuery.each(replace, function () {
                            trigger[appender](this);
                        } );

                    } else {

                        // without detect run this code only String format
                        this[type](place, replace);
                    }
                } );
            } else {
                target[type](place, replace);
            }
        }
    },

    innerInsertData: function (elem, place, replace) {

        place = place === "appendTo" ? "append" : place === "prependTo" ? "prepend" : place === "after" ? "append" : place === "before" ? "prepend" : place;

        if (elem.nodeType === 1 || elem.constructor.name === "jQuery" || jQuery.isNodes(elem) || jQuery.isArray(elem)) {
            jQuery.each(elem, function (_index, trigger) {

                if (replace.nodeType === 1 || replace.constructor.name === "jQuery" ||
                    jQuery.isNodes(replace) || jQuery.isArray(replace)) {

                    // only run this code Object && nodeList formate input 
                    jQuery.each(replace, function () {
                        trigger[place](this);
                    } );

                } else {

                    // without detect run this code only String format
                    jQuery.innerSet(trigger, "html", place, replace);
                }
            } );
        }
    },

    outerInsertData: function (elem, place, replace) {

        place = place === "append" ? "after" : place === "prepend" ? "before" : place === "appentTo" ? "after" : place;
        if (elem.nodeType === 1 || elem.constructor.name === "jQuery" || jQuery.isNodes(elem) || jQuery.isArray(elem)) {
            console.log(place);
            jQuery.each(elem, function (_index, trigger) {

                if (replace.nodeType === 1 || replace.constructor.name === "jQuery" ||
                    jQuery.isNodes(replace) || jQuery.isArray(replace)) {

                    // only run this code Object && nodeList formate input 
                    jQuery.each(replace, function () {
                        trigger[place](this);
                    } );

                } else {

                    // without detect run this code only String format
                    jQuery.outerSet(trigger, "html", place, replace);
                }
            } );
        }
    }
} );


// ? Window Events jQeury Plusgins width $.
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
        __search: window.location.search,
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
} );

/*! 
    * $.extant Number Handling for floor
    * Random and etc. make plugins method
    */
function MathElements(argument1, argument2, types,) {

    if (isFunction(argument2)) {
        types = types || argument2;
        argument2 = undefined;
    };

    switch (true) {

        case (types.name == 'max'):
            return types(...argument1);
        case (types.name == 'min'):
            return types(...argument1);
        case (types.name == 'paw'):
            return types(argument1, argument2);
        default:
            return types(argument1);
    };
};

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
};

/** @Number events plugins only for select alilas $.plugin */
jQuery.extend({

    ceil: function (x) {
        return MathElements(x, Math.ceil)
    },
    floor: function (x) {
        return MathElements(x, Math.floor)
    },
    round: function (x) {
        return MathElements(x, Math.round)
    },
    trunc: function (x) {
        return MathElements(x, Math.trunc)
    },
    max: function (...x) {
        return MathElements(x, Math.max)
    },
    min: function (...x) {
        return MathElements(x, Math.min)
    },
    sqrt: function (...x) {
        return MathElements(x, Math.sqrt)
    },
    cbrt: function (x) {
        return MathElements(x, Math.cbrt)
    },
    pow: function (x, ...y) {
        return MathElements(x, y, Math.pow)
    },
    random: function (x) {
        return MathElements(x, Math.random)
    },
    abs: function (x) {
        return MathElements(x, Math.abs)
    },
    floorInt: function (array, digits) {
        return MathFloorelement(array, digits)
    },
} );






/** @declare the function only for get, post, ajax fetch, get JSON plugins method */
/** @Functions there are create mulitple functions but not be attach in jQuery public */
/** @NotAccessable not be access this outer function can't be use user this function */
function setRequestHeaders(target, dataType, data) {

    if (dataType === "html" && typeof data === "string") {
        target.setRequestHeader("Content-type", "application/x-www-form-urlencoded charset=UTF-8");
    }

    if (dataType === "json" && typeof data === "string" || typeof data === "object") {
        target.setRequestHeader("Content-type", "application/json charset=UTF-8");
    }

    if (!dataType || !data) {
        target.setRequestHeader(null, null)
    } else {
        target.setRequestHeader("Content-type", "application/" + dataType + "charset=UTF-8");
    }
    target.setRequestHeader("Paragma", "no-cache");
    target.setRequestHeader("Cache-Control", "no-cache");
    target.setRequestHeader("Access-Control-Allow-Origin", "*");
    target.setRequestHeader("Access-Control-Allow-Credentials", "true");
    target.setRequestHeader("Access-Control-Allow-Methods", "POST");
    target.setRequestHeader("Access-Control-Headers", "Content-type");
}

function overrideMimeType() {

}

function getScriptJson(url, data, callback, type) {
    /** @getData @JSON @format if url is Object so url.data else create a new Object { url: url, ....} */
    // we can say this variable of sender || giver data this variable through control the request data
    callback = callback || data;
    var getData = url.constructor.name === "Object" ? url : {
        url: url,
        data: data,
        callback: callback,
        type: type
    };

    /** @FilterData @package => @multipleObject varible in brken here create fourth object values first  */
    // empty object && seecond [ url ] && third [ success ] && fourth [ error ] data are create in getData
    var _js = {
        obj: "" || {},
        url: getData.url,
        data: !jQuery.isFunction(getData.data) ?
            getData.data : undefined,
        callback: jQuery.isFunction(callback) ?
            getData.callback : undefined,
        type: type
    };

    /** @XMLHttpRequest let new XMLHttpRequest() */
    var getJSON = new XMLHttpRequest();

    /** @overrideMimeType here overrideMimetype now */
    getJSON.overrideMimeType("application/" + _js.type);

    /** @Open here open the targeter file */
    getJSON.open('GET', (_js.url), true);

    /** @dataType here set && declare dataType */
    getJSON.dataType = _js.type;

    /** @responseType here set && declare responseType */
    getJSON.responseType = _js.type === "json" ? _js.type : "text";

    // if all setup && proccessing pass so getJSON will be load here
    // loading processing pass the two rule first rule getJSON of 
    // readyState should be 4 && getJSON of status code should be 200
    // when all proccess pass && complete done so run the callback
    getJSON.onload = function () {

        /** @passingRule readyState === 4 && status ==== 200 */
        if (this.readyState === 4 && this.status === 200) {

            // callback function declare here now _js.callback
            // here callback function call of two type first
            // type call only for json file if detect json so
            // callback function run for json format asn store
            // JSON data and second type call the function 
            // only javascript get file on text format in the
            // callback function pass three param this, res, s
            _js.callback.call(this, this.response, 'success');
        }
    };
    /** @SEND XMLData send here */
    getJSON.send(null); // getJSON.send() method
}


function fetchScriptJson(url, success, error, get) {
    /** @getData @JSON @format if url is Object so url.data else create a new Object { url: url, ....} */
    // we can say this variable of sender || giver data this variable through control the request data
    var getData = url.constructor.name === "Object" ? url : {
        url: url,
        success: success,
        error: error
    };


    /** @FilterData @package => @multipleObject varible in brken here create fourth object values first  */
    // empty object && seecond [ url ] && third [ success ] && fourth [ error ] data are create in getData
    getData = {
        obj: "" || {},
        url: getData.url,
        success: getData.success,
        error: getData.error
    };

    /** @fecth @URL fetch proccess start be here first method will pass link url on server Request data */
    /** @server @http @https [ protocol ] ther not to be set extention without .json [html, php, js] not */
    /** @validLink @suggesstion for use link http://jquery-mcoderajax.atwebpages.com/ajax/libs/fake.json */
    fetch(getData.url)

        /** @firstResponse @returnThen first .then return and one more then this then not */
        /** retun json response this return Response Object so i return with json data.json() */
        .then((data) => {
            getData.obj.status = data;
            return data[get]();
        })

        /** @SecondResponse @done second Response is not be retun any value this data give a json response */
        .then((data) => {
            typeof getData.success === "function" ?
                /** @successFunction @call now if all proccess done successfully so success function will be call */
                getData.success.call(getData.obj, jQuery.isArray(data) ? data[0] : data, 'success') : null;
        })

        /** @Response @Errors if bychance or link wrong or any code problem so throw this errors */
        /** @ErrorType @errorFunction show error on error function this function use last of func */
        .catch((error) => {
            getData.error ? getData.error.call(error, 'Something errors') : null
        } );
}

function xmlObjects(name, type) {
    name.responseType = type.url.indexOf(".json") > 0 ? "json" : type.url.indexOf(".xml") > 0 ? "document" : "text";
    name.dataType = ["text", "html"];
    name.crossDomain = false;
    name.global = true;

    name.accepts = {
        '*': '*/*',
        html: "text/html",
        json: "application/json, text/javascript",
        script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
        text: "text/plain",
        xml: "application/xml, text/xml"
    };

    name.type = type.type;
    name.url = type.url;
    name.async = true;
    name.contentType = "application/x-form-urlencoded; charset=UTF-8";

    name.contents = {
        html: /\bhtml/,
        json: /\bjson\b/,
        script: /\b(?:java|ecma)script\b/,
        xml: /\bxml\b/
    };

    name.flatOptions = {
        url: true,
        contentx: true
    };
    name.hasContent = false;
    name.isLocal = false;
    name.success = type.callback;
    name.jsonp = "callback";

    name.responseFields = {
        json: "responseJSON",
        text: "responseText",
        xml: "responseXML"
    };

    var object = {
        url: name.url,
        responseType: name.responseType,
        dataType: name.dataType,
        crossDomain: name.crossDomain,
        global: name.global,
        type: name.type,
        async: name.async,
        contentType: name.contentType,
        contents: name.contents,
        flatOptions: name.flatOptions,
        hasContent: name.hasContent,
        isLocal: name.isLocal,
        success: type.success,
        jsonp: name.jsonp,
        data: type.data,
        error: type.error,
        accepts: name.accepts,
        responseFields: name.responseFields
    };
    return object;
}

/** @API @SERVER @DATA => [ methods ] @fetch && @XMLHttpRequest two libraries use in server fetch API */
// Here make multiple plugins $.fetchScript, $.fetchJSON, $.fetch, $.get, $.post, $.ajax method plugins
jQuery.extend({

    fetchJSON: function (url, success, error) {

        /** @fetchJSON use function on fetchScriptJSON */
        /** @Param here call fourth parameters in function */
        fetchScriptJson(url, success, error, "json")
    },

    fetchScript: function (url, success, error) {

        /** @fetchJSON use function on fetchScriptJSON */
        /** @Param here call fourth parameters in function */
        fetchScriptJson(url, success, error, "text")
    },

    /** @fetch @method @GET @PUT @DELETE in three method in fetch */
    fetch: function (url, type, data, dataType, success, error) {

        var rqExpr = /[?]{1}/m,
            keyword = {},
            formData = new FormData(),

            /** @getData @JSON @format if url is Object so url.data else create a new Object { url: url, ....} */
            // we can say this variable of sender || giver data this variable through control the request data
            getJSON = typeof url === "object" ? url : {
                url: url,
                type: type,
                dataType: dataType,
                data: data,
                success: success,
                error: error
            };


        function _x(param) {
            if (param && param != null) {
                throw TypeError(`Failed execute Cannot miss '${param}' arguments list.`);
            }
        }

        var Error =
            /** @TypeError if one value miss and not be declare */
            /** @throwError now throwing error function _x function */
            !getJSON.url ? _x('url') :
                !getJSON.type ? _x('type') :
                    !getJSON.dataType ? _x('dataType') :
                        !getJSON.success ? _x('success') : null;

        if (Error && Error != null) {
            return Error;
        }

        getJSON.data = jQuery.isObject(getJSON.data) && getJSON.dataType === "json" ? JSON.stringify(getJSON.data) : getJSON.data;
        getJSON.data = typeof getJSON.data == "object" ?
            jQuery.each(getJSON.data, function (k, v) {
                formData.append(k, v)
            }) : getJSON.data;

        var getData = typeof getJSON.data === "object" ?
            (JSON.stringify(getJSON.data).replace(/['\{\}"]/g, "").replace(/[,]/g, "&").replace(/[:]/g, "=")) : (getJSON.data),
            jqget = rqExpr.test(getJSON.url) === true ? (getJSON.url + '&' + getData) : (getJSON.url + '?' + getData),


            /** @FilterData @package => @multipleObject varible in brken here create fourth object values first  */
            // empty object && seecond [ url ] && third [ success ] && fourth [ error ] data are create in getData
            _$jqf = {
                url: getJSON.type.toUpperCase() === "GET" && getJSON.dataType !== "json" ? jqget : getJSON.url,
                data: getJSON.type.toUpperCase() === "GET" ?
                    null : getJSON.dataType.toLowerCase() === "html" || getJSON.dataType.toLowerCase() === "text" ?
                        formData : getJSON.dataType === "json" ? getJSON.data : getJSON.data,
                get: getJSON.dataType === "html" ? ("text") : getJSON.dataType.toLowerCase(),
            };

        /** @fecth @URL fetch proccess start be here first method will pass link url on server Request data */
        /** @server @http @https [ protocol ] ther not to be set extention without .json [html, php, js] not */
        /** @validLink @suggesstion for use link http://jquery-mcoderajax.atwebpages.com/ajax/libs/fake.json */
        fetch(_$jqf.url, {
            method: getJSON.type,
            body: _$jqf.data,
            headers: {},
        })
            /** @firstResponse @returnThen first .then return and one more then this then not */
            /** retun json response this return Response Object so i return with json data.json() */
            .then((Response) => {
                keyword.status = Response;
                return Response[_$jqf.get]();
            })

            /** @SecondResponse @done second Response is not be retun any value this data give a json response */
            /** @successFunction @call now if all proccess done successfully so success function will be call */
            .then((data) => {
                typeof getJSON.success === "function" ? getJSON.success.call(keyword, data, 'success') : undefined;
            })

            /** @Response @Errors if bychance or link wrong or any code problem so throw this errors */
            /** @ErrorType @errorFunction show error on error function this function use last of func */
            .catch((error) => {
                typeof getJSON.error === "function" ? getJSON.error.call("something went wrong", error) : undefined;
            } );
    },

    getJSON: function (url, data, callback) {

        /** @getJSON use function on fetchScriptJSON */
        /** @Param here call fourth parameters in function */
        getScriptJson(url, data, callback, "json");
    },

    getScript: function (url, callback) {

        /** @getScript use function on fetchScriptJSON */
        /** @Param here call fourth parameters in function */
        getScriptJson(url, "", callback, "javascript");
    },

    phpData: function (value) {
        if (jQuery.isString(value)) {
            return value;
        }

        var replace = (value) =>
            value.replace(/['\{\}"]/g, "")
                .replace(/[,]/g, "&")
                .replace(/[:]/g, "=");

        return jQuery.isObject(value) ? replace(JSON.stringify(value)) : value;
    },

    get: function (url, data, callback) {
        /** @getData @JSON @format if url is Object so url.data else create a new Object { url: url, ....} */
        // we can say this variable of sender || giver data this variable through control the request data
        var getData = jQuery.isObject(url) ? url : {
            url: url,
            data: data,
            success: callback
        },


            /** @FilterData @package => @multipleObject varible in brken here create fourth object values first  */
            // empty object && seecond [ url ] && third [ success ] && fourth [ error ] data are create in getData
            data = !jQuery.isFunction(getData.data) ?
                typeof getData.data === "string" ? getData.data : jQuery.phpData(getData.data) : "",
            url = getData.url.indexOf("?") > 0 ? getData.url + "&" + data : getData.url + "?" + data,
            callback = getData.success || getData.data,

            $get = {
                url: url,
                type: "GET",
                data: data,
                callback: callback
            };


        /** @XMLHttpRequest let new XMLHttpRequest() */
        var GETxml = new XMLHttpRequest();

        /** @Open here open the targeter file */
        GETxml.open("GET", `${$get.url}`, true);

        var object = xmlObjects(GETxml, $get);

        // if all setup && proccessing pass so getJSON will be load here
        // loading processing pass the two rule first rule getJSON of 
        // readyState should be 4 && getJSON of status code should be 200
        // when all proccess pass && complete done so run the callback
        GETxml.onload = function (e) {

            /** @passingRule readyState === 4 && status ==== 200 */
            if (GETxml.readyState === 4 && GETxml.status === 200) {

                // call the here this all response text && Object of $get.callback help of the function
                // callback function in pass the three[3] arguments first argument are this keyword =>
                // and second argument are response data so url file and third argument status success
                typeof $get.callback === "function" ? callback.call(object, GETxml.response, 'success') : "";
            }
        }

        /** @SEND XMLData send here */
        GETxml.send(); // getJSON.send() method
    },

    post: function (url, data, callback) {
        /** @getData @Object @format if url is Object so url.data else create a new Object { url: url, ....} */
        // we can say this variable of sender || giver data this variable through control the request data
        var getData = jQuery.isObject(url) ? url : {
            url: url,
            data: data,
            success: callback
        },

            /** @FilterData @package => @multipleObject varible in brken here create fourth object values first  */
            // empty object && seecond [ url ] && third [ success ] && fourth [ error ] data are create in getData
            phpData = typeof getData.data === "object" ? jQuery.phpData(getData.data) : getData.data,
            data = getData.url.indexOf(".json") > 0 ? JSON.stringify(getData.data) : phpData,

            $post = {
                url: getData.url,
                type: "POST",
                data: data,
                callback: getData.success || getData.data
            };

        /** @XMLHttpRequest let new XMLHttpRequest() */
        var POSTxml = new XMLHttpRequest();

        /** @Open here open the targeter file */
        POSTxml.open("POST", `${$post.url}`, true);

        var object = xmlObjects(POSTxml, $post);

        // if all setup && proccessing pass so getJSON will be load here
        // loading processing pass the two rule first rule getJSON of 
        // readyState should be 4 && getJSON of status code should be 200
        // when all proccess pass && complete done so run the callback
        POSTxml.onload = function () {

            /** @passingRule readyState === 4 && status ==== 200 */
            if (POSTxml.readyState === 4 && POSTxml.status === 200) {

                // call the here this all response text && Object of $get.callback help of the function
                // callback function in pass the three[3] arguments first argument are this keyword =>
                // and second argument are response data so url file and third argument status success
                typeof $post.callback === "function" ? $post.callback.call(object, POSTxml.response, 'success') : "";
            }
        }

        setRequestHeaders(POSTxml, "html", $post.data);
        POSTxml.send($post.data);
    },

    ajax: function (url, options) {

        /** @FilterData @package => @multipleObject varible in brken here create fourth object values first  */
        // empty object && seecond [ url ] && third [ success ] && fourth [ error ] data are create in getData
        var getData = typeof url === "object" ? url : options,
            data = getData.dataType === "html" && typeof getData.data === "object" ?
                jQuery.phpData(getData.data) : getData.dataType === "html" && typeof getData.data === "string" ?
                    getData.data : getData.dataType === "json" ? JSON.stringify(getData.data) : getData.data,

            ajax = {
                url: getData.url || url,
                type: getData.type,
                data: data,
                dataType: getData.dataType || "",
                success: getData.success,
                error: getData.error,
            };

        function requestHeaders(target, dataType, data) {

            if (dataType === "html" && typeof data === "string") {
                target.setRequestHeader("Content-type", "application/x-www-form-urlencoded charset=UTF-8");
            }

            if (dataType === "json" && (typeof data === "string" || typeof data === "object")) {
                target.setRequestHeader("Content-type", "application/json charset=UTF-8");
            }

            if (dataType.indexOf("/") > 0 && typeof dataType === "string") {

                var split = dataType.split("/");
                target.setRequestHeader('Content-type', '' + split[0].toLowerCase() + '/' + split[1] + '; charset=UTF-8');

            } else if (dataType !== "html" && typeof dataType === "string") {

                target.setRequestHeader('Content-type', 'application/' + dataType + '; charset=UTF-8');
            }

            target.setRequestHeader("Access-Control-Allow-Credentials", "true");
            target.setRequestHeader("Cache-Control", "no-cache");
            target.setRequestHeader("Paragma", "no-cache");
            target.setRequestHeader("Access-Control-Allow-Origin", "*");
            target.setRequestHeader("Access-Control-Allow-Methods", "POST");
            target.setRequestHeader("Access-Control-Headers", "Content-type");
        };

        /** @XMLHttpRequest let new XMLHttpRequest() */
        var AJAX = new XMLHttpRequest();

        /** @Open here open the targeter file */
        AJAX.open(`${ajax.type}`, `${ajax.url}`, true);

        var object = xmlObjects(AJAX, ajax);

        AJAX.onerror = function (error) {
            typeof ajax.error === "function" ? ajax.error.call(error, this.error, 'Failed') : "";
        }

        // if all setup && proccessing pass so getJSON will be load here
        // loading processing pass the two rule first rule getJSON of 
        // readyState should be 4 && getJSON of status code should be 200
        // when all proccess pass && complete done so run the callback
        AJAX.onload = function () {

            /** @passingRule readyState === 4 && status ==== 200 */
            if (AJAX.readyState === 4 && AJAX.status === 200) {

                // call the here this all response text && Object of ajax.callback help of the function
                // callback function in pass the three[3] arguments first argument are this keyword =>
                // and second argument are response data so url file and third argument status success
                typeof ajax.success === "function" ? ajax.success.call(object, AJAX.response, 'success') : "";
            }
        }
        requestHeaders(AJAX, ajax.dataType, ajax.data);
        AJAX.send(ajax.data);
    }
} );



// Initialize central reference
var rootjQuery = document;


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

    // A simple way to check for HTML strings
    // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
    // Strict HTML recognition (#11290: must start with <)
    // Shortcut simple #id case for speed
    rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

    init = jQuery.fn.init = function (selector, contentx, root) {
        var elem, match;

        // HANDLE: $(""), $(null), $(undefined), $(false)
        if (!selector) {
            return this;
        }

        // Method init() accepts an alternate rootjQuery
        // so migrate can support jQuery.sub (gh-2101)
        root = root || rootjQuery;


        if (typeof selector === "string") {
            if (selector[0] === "<" && selector[selector.length - 1] === ">" &&
                selector.length >= 3 || rquickExpr.test(selector) === true) {

                if ('content' in document.createElement('template')) {
                    var el = document.createElement('template');
                    el.innerHTML = selector;
                    return jQuery.makeArray(el.content.childNodes, this);
                };

            } else if (typeof selector === "string") {

                elem = selector

                    // CSS selector for :nth-child in event for int++ [0-9] put value
                    // and second method for odd && even use for eq(odd) && eq(even) && eq(1);
                    .replace(/:eq/g, ":nth-child")

                    // CSS seletor for :nth-child in event for use element target child
                    // first method first && second method is last use elem:first && elem:last
                    .replace(/:first/g, ":first-child")

                    // CSS seletor for :nth-child in event for use element target child
                    // first method first && second method is last use elem:first && elem:last
                    .replace(/:last/g, ":last-child")

                    // CSS seletor for :nth-child in event for use element target odd child
                    // target of not devided by 2 number and write method elem:even type
                    .replace(/:even/g, ":nth-child(even)")

                    // CSS seletor for :nth-child in event for use element target odd child
                    // target of devided by 2 number and write method elem:odd type 1 by 1
                    .replace(/:odd/g, ":nth-child(odd)");

                // Targeting All Elements use querySelector methods for select All
                // html || body || head || children || NodeList || etc. any Elements.
                var returnSelector = document.querySelectorAll(elem);
                return jQuery.makeArray(returnSelector, this); // selector complete>return
            }

        } else if (isFunction(selector)) {

            // Create new #document Event
            var event = new Event(document);

            // shortcuts document ready
            selector.call(document, $, event);

            // ? last statement return this jQuery
            return jQuery.makeArray(document, this);
        }

        return jQuery.makeArray(selector, this);
    };

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;


// Initialize central reference
rootjQuery = jQuery(document);


function replaceWidthAll(elem, types, html) {

    jQuery.each(elem, function (i, v) {
        if (types === "replaceWith") {

            var fragments = document.createElement('template');
            fragments.innerHTML = html;
            v.parentElement.replaceChild(fragments.content, v);

        } else if (types === "replaceAll") {


            var isDoc = new DOMParser();
            var parseSting = isDoc.parseFromString(html, 'text/html');
            var getHTML = parseSting.body.children;

            // if getHTML of length 0 or value null so remove target elements
            if (getHTML.length === 0) {
                v.remove();
            }

            // else replace child for help of the each method
            jQuery.each(getHTML, function (_ii, values) {
                v.parentElement.replaceChild(values, v);
            } );
        }
    } );
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


// [ width, height, innerWidth, innerHeight, outerWidth, outerHeight, scrollWidth, scrollHeight ]
// are created plugins deal ONLY HTMLObject  get inner outer and actual width and height plugins
// [ width, height ] method will be shortlly created now for help jQuery.each method
jQuery.each(["width", "height"], function (_i, getWidthOrHeight) {
    jQuery.fn[getWidthOrHeight] = function (value) {
        if (arguments.length > 0 && typeof value === "number") {
            this.css(getWidthOrHeight, `${value}px`);
            return this;
        }

        // always return now this width or height shortcuts
        return filterWidthOrHeight(this, getWidthOrHeight);
    }
} );

// [ innerWidth, innerHeight ] method will be shortcutlly created now for help each
jQuery.each(["innerWidth", "innerHeight"], function (_index, getinnerWidthOrHeight) {
    jQuery.fn[getinnerWidthOrHeight] = function () {

        // always return now this innerWidth or height shortcuts
        return filterWidthOrHeight(this, getinnerWidthOrHeight);
    }
} );

// [ scrollWidth, scrollHeight ] method will be shortcutlly created now for help each
jQuery.each(["scrollWidth", "scrollHeight"], function (_i, getscrollWidthOrHeight) {
    jQuery.fn[getscrollWidthOrHeight] = function () {

        // always return now this scrollWidth or height shortcuts
        return filterWidthOrHeight(this, getscrollWidthOrHeight);
    }
} );

// [ outerWidth, outerHeight ] method will be shortcutlly created now for help each
jQuery.each(["outerWidth", "outerHeight"], function (_index, getouterWidthOrHeight) {
    jQuery.fn[getouterWidthOrHeight] = function (boolean) {

        // always return now this outerWidth or height shortcuts
        return filterWidthOrHeight(this, getouterWidthOrHeight, boolean);
    }
} );

// [ append, prepend, appendTo, prependTo, after, before ] are created plugins
// deal only HTMLObject replce and set method in element on innerHTML control
// [ append, prepend ] method will be shortcutlly created now for help each
jQuery.each(["append", "prepend"], function (_index, _plugins) {
    jQuery.fn[_plugins] = function (html) {
        jQuery.innerSet(this, "html", _plugins, html);
        return this;
    }
} );

// [ after, before ] method will be shortcutlly created now for help each
jQuery.each(["after", "before"], function (_index, _plugins) {
    jQuery.fn[_plugins] = function (html) {
        jQuery.outerSet(this, "html", _plugins, html);
        return this;
    }
} );

// [ appendTo, prependTo ] method will be shortcutlly created now for help each
jQuery.each(["appendTo", "prependTo"], function (_index, _plugins) {
    jQuery.fn[_plugins] = function (html) {
        jQuery.innerInsertData(jQuery(html), _plugins.slice(0, -2),
            _plugins == "appendTo" ? jQuery(this) : jQuery(this).reverse());
        return jQuery(html);
    }
} );


// [ replaceWith, replaceAll ] are crate plugins for in jQuery.fn.extend({} );
jQuery.fn.extend({

    replaceWith: function (html) {
        replaceWidthAll(this, "replaceWith", html);
        return this;
    },

    replaceAll: function (html) {
        replaceWidthAll(jQuery(html), "replaceAll", jQuery(this).outerHTML());
        return this;
    }
} );


/** @dataSet @getStyle */
jQuery.fn.extend({

    dataSet: function (name, value) {
        if (arguments.length == 0) {
            return this;
        }

        var elem = this;

        if (!value) {
            for (let i = 0; i < elem.length; i++) {
                return elem[i].dataset[name];
            }
        }

        if (name && value) {

            var elem = this,
                val = value.trim().split(" ");

            for (let i = 0; i < elem.length; i++) {
                if (elem[i].dataset[name]) {
                    for (let c = 0; c < val.length; c++) {
                        if (!elem[i].dataset[name].includes(val[c])) {
                            elem[i].dataset[name] += " " + val[c].trim();
                        }
                    }
                } else {
                    val = jQuery.arrayFilter(val),
                        elem[i].setAttribute('data-' + name, val.toString().replace(/[,]/g, " "));
                }
            }
        }
        return this;
    },

    getStyle: function (property, boolean) {
        for (let i = 0; i < this.length; i++) {
            var styles = window.getComputedStyle(this[i])[property.trim()];
            return boolean === true ? "" : boolean === false || !boolean ? styles : "";
        }
    }
} );

// [ autoClick, autoFocus, reverse, beforeAdd, afterAdd ]
/** @autoClick @autoFocus create now Plugins */
jQuery.fn.extend({

    autoFocus: function (callback) {
        this.each(function () {
            this.focus();
            typeof callback === "function" ?
                callback.call(this) : undefined;
        } );
        return this;
    },

    autoClick: function (callback) {
        this.each(function () {
            this.click();
            typeof callback === "function" ?
                callback.call(this) : undefined;
        } );
        return this;
    },

    reverse: function () {
        var array = Array.prototype.slice.call(this);
        return jQuery(array.reverse());
    }

} );

// [ pushAll, unshiftAll ] plugins are created now this plugins will be
// use if user want to add before selector element && after
// selector add new Elemnts so this plugins will be most helpfull
jQuery.each(["pushAll", "unshiftAll"], function (_index, _plugins) {
    jQuery.fn[_plugins] = function (object) {

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
} );


/** @Numbers @selector make plugins handlings only number */
jQuery.fn.extend({

    random: function (length) {
        return jQuery.floorInt(this, length);
    }
} );


/** @window events create plugins jQuery.fn.init[window] */
// plugins names are [ unload, scroll, resize, fullLoad ]
jQuery.fn.extend({

    unload: function (fn) {
        return this.each(function () {
            this.onunload = fn;
        } );
    },

    scroll: function (fn) {
        return this.each(function () {
            this.onscroll = fn;
        } );
    },

    resize: function (fn) {
        return this.each(function () {
            this.onresize = fn;
        } );
    },

    fullLoad: function (fn) {
        return this.each(function () {
            this.onload = fn;
        } );
    }
} );


/** @DOMContetEvents && @click @on @ready pligins */
// are created now ready method is will be domconload
jQuery.fn.extend({

    ready: function (data, fn) {
        fn = fn || data;
        document.addEventListener('DOMContentLoaded', fn);
        return this;
    },

    click: function (fn) {
        jQuery.each(this, function () {
            !fn ? this.click() :
                this.addEventListener('click', fn);
        } );
        return this;
    },

    on: function (event, data, callback) {
        callback = callback || data;
        return this.each(function (i, v) {
            // with spaces adding mulitple Events for examples ("click mousedown, onload")
            if (typeof event === "string" && callback) {
                jQuery.each(event.split(" "),

                    function (_i, _v) {
                        v.addEventListener(this, (event) => {
                            typeof data !== "function" ? event.data = data : undefined;
                            callback.call(v, event);
                        } );
                    } );
            }
            // width Object adding mulitple Events && callback functions for example code
            // $(selector).on({ click: function() {}, mousedown: function() {}} ); is type
            else if (typeof event === "object" &&
                (typeof callback !== "function" || typeof data !== "function")) {
                jQuery.each(event,
                    function (events) {
                        v.addEventListener(events, (event) => {
                            typeof data !== "function" ? event.data = data : undefined;
                            this.call(v, event);
                        } ); // fire events with add new future adding data future in inc events
                    } ); // jQuery start loop ending get one by one callback function and call biw
            }
        } );
    }
} );


/** @ajaxEvents Handlings */
jQuery.each([
    "ajaxStart",
    "ajaxStop",
    "ajaxComplete",
    "ajaxError",
    "ajaxSuccess",
    "ajaxSend"
], function (_i, type) {
    jQuery.fn[type] = function (fn) {
        return this.on(type, fn);
    };
} );



/** @bind @delegate @hover events created */
jQuery.fn.extend({

    bind: function (type, data, fn) {
        return this.on(type, data, fn);
    },

    delegate: function (type, data, fn) {
        this.on(type, data, fn);
    },

    hover: function (fnOver, fnOut) {
        return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
    }
} );


// [ mouseEvents && keyboardEvents ] create mulitiple plugins Handlings
jQuery.each(("blur focus focusin focusout resize scroll click dblclick " +
    "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
    "change select submit keydown keypress keyup contextmenu").split(" "),
    function (_i, name) {

        // Handle Event binding
        jQuery.fn[name] = function (data, fn) {
            fn = fn || data;
            return arguments.length > 0 ?
                this.on(name, data, fn) : this;
        };
    }
);


// [ Wrap, Unwrap, wrapAll, wrapInner ] jQuery plugins are created
jQuery.fn.extend({

    wrap: function (html) {
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
        this.each(function (_index, _value) {

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

        } );
        return this;
    },

    unwrap: function () {

        // before getting target of parentElements
        // and after set innnerHTML for use loop 
        // and jQuery outerset plugins system [*]
        jQuery.each(this.parent(), function () {

            // detect now parent Element of body parent
            // if this of parent detecting body so storp
            // unwrap proccssing unwrapping child method
            if (this.tagName.toLowerCase() !== "body") {

                // set html or unwrap with jQuery.outset
                jQuery.outerSet(this, "html", "before", this.innerHTML);

                this.remove(); // remove recent Child
            }
        } );
        return this;
    },

    wrapAll: function (html) {
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
        this.each(function (_index, _value) {

            // override before this elements and set new ElementsChild
            this.insertAdjacentElement('beforebegin', wrap);

            // set last child value Here
            lastChild.appendChild(this);

        } );
        return this;
    },

    wrapInner: function (html) {
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
        this.each(function (_index, _value) {

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

        } );
        return this;
    }
} );


// [ empty, remove ] make jQuery two plugins base on HTMLObject
jQuery.fn.extend({

    remove: function () {
        this.each(function () {
            this.remove()
        } );
        return this;
    },

    empty: function () {
        this.each(function () {
            this.innerHTML = "";
        } );
        return this;
    }
} );


jQuery.fn.extend({

    html: function (value) {
        return jQuery.html(this, value);
    },

    text: function (value) {
        return jQuery.html(this, value);
    },

    attr: function (name, value) {
        return jQuery.attr(this, name, value);
    },

    removeAttr: function (value) {
        return jQuery.removeAttr(this, value);
    },

    fadeIn: function (speed, callback) {
        return jQuery.fadeIn(this, speed, callback);
    },

    fadeOut: function (speed, callback) {
        return jQuery.fadeOut(this, speed, callback);
    },

    css: function (name, value) {
        jQuery.css(this, name, value);
        return this;
    },

    show: function (speed, callback) {
        jQuery.show(this, speed, callback);
        return this;
    },

    hide: function (speed, callback) {
        jQuery.hide(this, speed, callback);
        return this;
    },

    toggle: function (speed, callback) {
        jQuery.toggle(this, speed, callback);
        return this;
    },

    Animation: function (anim) {
        jQuery.Animation(this, anim);
        return this;
    },

    toggleClass: function (value) {
        return jQuery.toggleClass(this, value);
    },

    hasClass: function (selector) {
        return jQuery.hasClass(this, selector);
    },

    hasAttr: function (name) {
        return jQuery.hasAttr(this, name);
    },

    outerHTML: function (object) {
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

    clone: function () {
        var clone = [];
        for (let i = 0; i < this.length; i++) {
            clone.push(this[i].cloneNode(true));
        }
        return jQuery(clone);
    }
} );


// addClass && removeClass make pugins Handlings
jQuery.fn.extend({

    addClass: function (name) {
        return this.each(function () {
            this.classList.add(...name.trim().split(" "));
        } );
    },

    removeClass: function (name) {
        return this.each(function () {
            this.classList.remove(...name.trim().split(" "));
        } );
    }
} );

/*!
    * define typeof and check element
    * dataType and check the nodeType
    * and check window or document type
    * and Array && Object [Element=>val]
    */

var
    // shortcut Array validator make plugins output String format
    instanceOf = function intanceof(obj, match) {

        if (obj == null) {
            obj + "";
        }

        var result = obj instanceof match;
        return result;
    },

    // check all variable element dataType in String format
    isTypeof = function (obj) {

        if (!obj) {
            return undefined;
        }

        return Object.prototype.toString.call(obj).replace(/["\[\]']/g, "").split(" ")[1];
    },

    // convert and adjust after .point number values
    toFixedFunction = function (number, length) {

        if (!number) {
            return undefined;
        }

        var ret = number.toFixed(length);
        return Number(ret);
    },

    // check all variable element dataType in Boolean format
    isCommonFunction = function isCommonFunction(param, test) {
        return param === undefined ?
            undefined :
            param.constructor.name === `${test}`;
    },

    capitalize = function (text, bool) {

        var jqloop = 0,
            loop = 0,
            final = "",
            ret = [],
            arr1 = [],
            arr2 = [];

        // return make capitalize setup capitalize mean start one word is UpperCase()
        // and all one letter after convert to lowerCase() $.capitalize('king') [King];
        if (typeof text === "string") {

            var match = text.match(/[, _\-.]/g);
            var trim = text.trim().split(/[, _\-.]/);

            if (text.trim().indexOf(" ") < 0) {
                return text.trim().substr(0, 1)
                    .toUpperCase() + text.trim().substr(1);
            }

            for (let t = 0; t < trim.length; t++) {

                arr1.push(
                    trim[t].substr(0, 1).toUpperCase() +
                    trim[t].substr(1).toLowerCase()
                );
            }

            for (let s = 0; s < match.length; s++) {
                arr2.push(match[s]);
            }
            for (let r = 1; r < arr1.length; r++) {

                ret.push(arr1[jqloop++] + arr2[loop++]);
            };
            ret.push(arr1[arr1.length - 1]);

            for (let f = 0; f < ret.length; f++) {
                final += ret[f];
            }
            return !bool || bool === false ? final : bool === true ? final.replace(/[,\-_. ]/g, "") : final;
        }
    },

    titleCase = function (text) {
        var ret = [];
        if (typeof text === "string") {
            var trim = text.trim().split(/[, _\-.]/);
            for (var t = 0; t < trim.length; t++) {
                ret.push(
                    trim[t].substr(0, 1).toUpperCase() +
                    trim[t].substr(1).toLowerCase()
                );
            };
            return ret.toString().replace(/[,]/g, "");
        }
    },

    // preuse isCommonFunction functions from one by one 9 function in used $.alilas
    isArray = function isArray(value) {
        return isCommonFunction(value, "Array");
    },
    isObject = function isObject(value) {
        return isCommonFunction(value, "Object");
    },
    isString = function isString(value) {
        return isCommonFunction(value, "String");
    },
    isNumber = function isNumber(value) {
        return isCommonFunction(value, "Number");
    },
    isBoolean = function isBoolean(value) {
        return isCommonFunction(value, "Boolean");
    },
    isNodes = function isNodes(value) {
        return isCommonFunction(value, "NodeList");
    },
    isSymbol = function isSymbol(value) {
        return isCommonFunction(value, "Symbol");
    },
    isHistory = function isHistory(value) {
        return isCommonFunction(value, "History");
    },
    isNavigator = function isNavigator(value) {
        return isCommonFunction(value, "Navigator");
    },
    isNode = function (obj) {
        return typeof obj === undefined ? undefined : obj.nodeType === 1;
    };

jQuery.isWindow = isWindow;
jQuery.toType = toType;
jQuery.isFunction = isFunction;
jQuery.intanceof = instanceOf;
jQuery.isTypeof = isTypeof;
jQuery.isArray = isArray;
jQuery.isObject = isObject;
jQuery.isString = isString;
jQuery.isNumber = isNumber;
jQuery.isBoolean = isBoolean;
jQuery.isNodes = isNodes;
jQuery.isHistory = isHistory;
jQuery.isNavigator = isNavigator;
jQuery.isSymbol = isSymbol;
jQuery.isNode = isNode;
jQuery.now = Date.now;
jQuery.titleCase = titleCase;
jQuery.capitalize = capitalize;
jQuery.parseJSON = JSON.parse;
jQuery.stringJSON = JSON.stringify;
jQuery.toFixed = toFixedFunction;




// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, http://jquery-mcoderajax.atwebpages.com/
// and CommonJS for browser emulators (#13566)
if (typeof noGlobal === "undefined") {
    window.jQuery = window.$ = jQuery;
}




return jQuery;
} );