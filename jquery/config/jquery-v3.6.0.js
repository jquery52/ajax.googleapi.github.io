/*!
 * jQuery pure Javascript Library v3.6.0
 * http://jquery-mcoderajax.atwebpages.com/
 *
 * booststrapcdn pure Css Library v5.4.9
 * http://mcoder-bootstrapcdn.atwebpages.com/
 *
 * phpScript pure PHP Library config v5.4.9
 * http://phpscript-mcoder.atwebpages.com/
 *
 * Date: 20-10-2021 GMT 1:08:00 PM ( India )
*/
( function ( global, factory ) {

    "use strict";

    if (typeof module === "object" && typeof module.exports === "object") {

        // For CommonJS and CommonJS-like environments where a proper `window`
        // is present, execute the factory and get jQuery.
        // For environments that do not have a `window` with a `document`
        // (such as Node.js), expose a factory as module.exports.
        // This accentuates the need for the creation of a real `window`.
        // e.g. var jQuery = require("jquery")(window);
        // See ticket #14549 for more info.
        module.exports = global.document ?
            factory( global, true ) : 
            function ( w ) {
                if ( !w.document ) {
                    throw Error("jQuery requires a window with a document");
                }
                return factory( w );
            };
    } else {
        factory( global );
    }

    // Pass this if window is not defined yet
} ) ( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

    // Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
    // throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
    // arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
    // enough that all such attempts are guarded in a try block.
    "use strict";

    var arr = [];
    
    var getProto = Object.getPrototypeOf;

    var slice = arr.slice;

    var flat = arr.flat ? function( array ) {
        return arr.flat.call( array );
    } : function( array ) {
        return arr.concat.apply([], array);
    };

    var push = arr.push;

    var indexOf = arr.indexOf;

    var class2type = {};

    var toString = class2type.toString;

    var hasOwn = class2type.hasOwnProperty;

    var support = {};

    var isFunction = function isFunction( obj ) {

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


    var isWindow = function isWindow( obj ) {
        return obj !== null && obj == obj.window;
    };


    var document = window.document;


    function toType( obj ) {
        if ( obj == null ) {
            return obj + "";
        }

        // Support: Android <=2.3 only (functionish RegExp)
        return typeof obj === "object" || typeof obj === "function" ?
            class2type[ toString.call( obj ) ] || "object" :
            typeof obj;
    };
    /* global Symbol */
    // Defining this global in .eslintrc.json would create a danger of using the global
    // unguarded in another place, it seems safer to define global only for this module

    

    var 
        version = "3.6.0",

        // Define a local copy of jQuery
        jQuery = function ( selector, context ) {

            // The jQuery object is actually just the init constructor 'enhanced'
            // Need init if jQuery is called (just allow error to be thrown if not included)
            return new jQuery.fn.init( selector, context );
        };


    function isArrayLike( obj ) {

        // Support: real iOS 8.2 only (not reproducible in simulator)
        // `in` check used to prevent JIT error (gh-2145)
        // hasOwn isn't used here due to false negatives
        // regarding Nodelist length in IE
        var length = !!obj && "length" in obj && obj.length,
            type = toType( obj );

        if (isFunction( obj ) || isWindow(obj)) {
            return false;
        }

        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && (length - 1) in obj;
    }


    /* Regular Expression Hub
     * (\\s*\\w+\\W+\\s*?[\\w+]) for example classList identifier new RegEXp('(\\s|^)' + className + '(\\s|$)') for testing regex
     * REgular Expression use be without check dataType && function etc. only regular follow given [ command ] && work command(*)
    */
    var RegExpr = {

        // [ ] square brackets identifier with regularExpr
        square: new RegExp("\\s*[\\[\\]]\\s*", "gm"),

        // { } curly brackets identifier with regularExpr
        curly: new RegExp("\\s*[\\{\\}]\\s*", "gm"),

        // ( ) parentheses bracked identifier with regularExpr
        parenthesis: new RegExp("\\s*[\\(\\)]\\s*", "gm"),

        // < > angle bracked identifier with regularExpr
        angle: new RegExp("\\s*[\\<\\>]\\s*", "gm"),

        // = / = angle bracked identifier with regularExpr
        forward: new RegExp("(\\s*)\\/(\\s*)", "gm"),

        // = \ = angle bracked identifier with regularExpr
        backward: new RegExp("(\\s*)\\\\(\\s*)", "gm"),

        // = | = angle bracked identifier with regularExpr
        paie: new RegExp("(\\s*)\\|(\\s*)", "gm"),

        // (\s*) whiteSpace identifier with regularExpr
        rtrim: /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

        // (? * = + - & ^ % $ # @ ! ~ `) find multiple sign regularExpression
        extraSign: ( sign ) => new RegExp("(\\s*)\\" + sign + "(\\s*)", "gm"),

        // {jquery: "3.6.0", type: "plugins"} object identifier regularExpr
        object: new RegExp("\\s*(\"|\')?\\w+(\"|\')?(\:|\,)+\\s*(\\S*)?\\s*"),

        identifier: {
            char: /^[\\\/\.\-\+\=\*\&\^\%\$\#\@\!\`\~\?\<\>\;\"'\|\{\}\(\)\[\]\,]$/,
        },

        ajaxRegex: {
            rlocalProtocol: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            rnoContent: /^(?:GET|HEAD)$/,
            rprotocol: /^\/\//,
            rheaders: /^(.*?):[ \t]*([^\r\n]*)$/mg,
        }
    };

    var ajaxRegex = RegExpr.ajaxRegex;
    var check = RegExpr.identifier;
    


    var preservedScriptAttributes = {
        type: true,
        src: true,
        nonce: true,
        noModule: true
    };


    function DOMEval(code, node, doc) {
        doc = doc || document;

        var i, val,
            script = doc.createElement("script");

        script.text = code;
        if ( node ) {
            for (i in preservedScriptAttributes) {

                // Support: Firefox 64+, Edge 18+
                // Some browsers don't support the "nonce" property on scripts.
                // On the other hand, just using `getAttribute` is not enough as
                // the `nonce` attribute is reset to an empty string whenever it
                // becomes browsing-context connected.
                // The `node.getAttribute` check was added for the sake of
                // `jQuery.globalEval` so that it can fake a nonce-containing node
                // via an object.
                val = node[ i ] || node.getAttribute && node.getAttribute( i );
                if ( val ) {
                    script.setAttribute(i, val);
                }
            }
        }
        doc.head.appendChild( script ).parentNode.removeChild( script );
    }



    jQuery.fn = jQuery.prototype = {

        // The current version of jQuery being used
        version: version,

        constructor: jQuery,

        // The default length of a jQuery object is 0
        length: 0,

        toArray: function() {
            return slice.call( this );
        },

        pushStack: function( elems ) {

            // if empty elems value || null value return 
            if ( !elems ) return;

            // Build a new jQuery matched element set
            var ret = jQuery.merge(this.constructor(), elems);
            
            // Add the old object onto the stack (as a reference)
            ret.prevObject = this;

            // Return the newly-formed element set
            return ret;
        },

        flat: function( time ) {
            var flatObj = Array.prototype.slice.call( this );
            return this.pushStack(!time ? flatObj.flat( Infinity ) : flatObj.flat( time ));
        },

        // Get the Nth element in the matched element set OR
        // Get the whole matched element set as a clean array
        get: function( num ) {

            // Return all the elements in a clean array
            if ( num == null ) {
                return slice.call( this );
            }

            // Return just the one element from the set
            return num < 0 ? this[ num + this.length ] : this[ num ];
        },

        map: function( callback ) {
            return this.pushStack(jQuery.map(this, function(elems, i) {
                return callback.call( elems, i, elems );
            } ) );
        },

        each: function( callback ) {
            return this.pushStack( jQuery.each(this, callback) );
        },

        eq: function( i ) {
            return this.pushStack( i >= 0 && !isNaN( i ) ? [ this[ i ] ] : 
                !isNaN( i ) ? [ this[ this.length + i ] ] : [] );
        },

        first: function () {
            return this.pushStack( [ this[ 0 ] ] );
        },

        last: function () {
            return this.pushStack( [ this[ this.length - 1 ] ] );
        },

        odd: function () {
            return this.pushStack(jQuery.greps(this, function( elems, i ) {
                return i % 2;
            } ) );
        },

        even: function () {
            return this.pushStack(jQuery.greps(this, function (elems, i) {
                return ( i + 1 ) % 2;
            } ) );
        },

        slice: function (start, end) {
            var sliceObject = Array.prototype.slice.call( this );
            sliceObject = sliceObject.slice( start, end );
            return this.pushStack( sliceObject );
        },

        contains: function ( elems ) {
            return this.pushStack(jQuery.greps(this, function ( _elems, _i ) {
                var results = _elems.innerHTML || _elems.textContent,
                    selectors = String.prototype.trim.call( elems || "");
                return results.indexOf( selectors ) >= 0;
            }));
        },

        not: function( selector ) {
            return this.pushStack(winnow(this, selector || [], true));
        },

        filter: function( selector ) {
            return this.pushStack(winnow(this, selector || [], false));
        },

        deepAll52: function( selector ) {
            var deepObject = [];

            jQuery.each( this, function( _i, elems ) {
                while( elems = elems.children[ 0 ] ) {

                    if ( !selector && typeof elems !== "undefined") {
                        deepObject.push( elems );
                    }

                    if ( typeof elems.children[ 0 ] === "undefined" && selector === true ) {
                        deepObject.push( elems );
                    }

                    if ( selector && typeof selector == "string" ) {
                        jQuery.each( jQuery( selector ), function( _i, matched ) {
                            if ( elems === matched ) deepObject.push( elems );
                        } );
                    }
                }
            } );

            deepObject = Filter( deepObject );
            return this.pushStack( deepObject );
        },

        reverse: function () {
            var array = Array.prototype.slice.call(this);
            return jQuery(array.reverse());
        },

        // For internal use only.
        // Behaves like an Array's method, not like a jQuery method.
        push: push,
        sort: arr.sort,
        splice: arr.splice,
    };

    jQuery.extend = jQuery.fn.extend= function() {
        var options, name, copy, target = arguments[ 0 ] || {},
            i = 1, length = arguments.length, deep = false;
        
        // Handle a deep copy situation
        if ( typeof target === "boolean" ) {
            deep = target;

            target = arguments[ i ] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if ( typeof target !== "object" && !isFunction( target ) ) {
            target = {};
        }

        // Extend jQuery itself if only one argument is passed
        if ( i === length ) {
            target = this;
            i--;
        }

        for ( ; i < length; i++ ) {

            // Only deal with non-null/undefined values
            if ((options = arguments[ i ]) != null) {

                // Extend the base object
                for ( name in options ) {
                    copy = options[ name ];

                    // Prevent Object.prototype pollution
                    // Prevent never-ending loop
                    if ( name === "__proto__" || target === copy ) {
                        continue;
                    }

                    // Don't bring in undefined values
                    if ( copy !== undefined ) {
                        target[ name ] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };

    jQuery.extend({

        timers: [],
        
        etag: {},

        isReady: true,

        readyWait: 0,

        active: 0,

        cssProps: {},

        noop: function() { },

        error: function( msg ) {
            throw new Error( msg );
        },

        isEmptyObject ( obj ) {
            var name;

            for ( name in obj ) {
                return false;
            }
            return true;
        },

        inHTML: function ( elem ) {
            if (isWindow( elem || {} ) || !elem) {
                return false;
            }
            
            return jQuery.map( jQuery( elem ), function( el ) {
                return el.nodeType === 1 || el.nodeType === 3 || el.nodeType === 8;
            } ) [ 0 ] || false;
        },

        flat: function( array, time ) {
            // flating array infinite time && custom time array
            return !time ? array.flat( Infinity ) : array.flat( time );
        },

        isDoc: function( elem, docname, type ) {
            var ownerDocument, docType, contentType,
                trigger = jQuery.makeArray( elem ),
              
                type = String.prototype.trim.call( type || "" ),
                docname = String.prototype.trim.call( docname || "");
            
            if ((trigger[ 0 ] || []).constructor.name === "NodeList") {
                trigger = trigger[ 0 ];
            }
            
            return jQuery.map(trigger, function ( el, _i ) {
                ownerDocument = el.ownerDocument || el;
                docType = ( ownerDocument || [] ).constructor.name;
                contentType = ownerDocument.contentType;
                
                if ( type && docname ) {
                    return docType === docname && contentType === type;
                }
                return docType === docname;
            } )[ 0 ] || false;
        },

        isHTMLDoc: function ( elem ) {
            return jQuery.isDoc(elem, "HTMLDocument", "text/html");
        },

        isXMLDoc: function ( elem ) {
            return jQuery.isDoc(elem, "XMLDocument", "text/xml");
        },

        // jQuery throwing erros with error line
        throw: function( type, msg ) {
            var message = msg, line = "require";
            
            try {
                // get error line throw erors
                throw new Error( message );

            } catch ( error ) {
                var line = error.stack;
                line = line.split("at");
                line = line[line.length - 1];
                line = "$_at Line: " + line;
            }

            // throwing the filter errors with line;
            throw type + " " + message + "\n\n" + line;
        },

        globalEval: function(code, options, doc) {
            DOMEval(code, { nonce: options && options.nonce }, doc);
        },

        // Unique for each copy of jQuery on the page
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),

        // results is for internal usage only
        makeArray: function (arr, results) {
            var ret = results || [];

            if ((arr != null) && (arr.constructor.name === jQuery().constructor.name ||

                // if not arr == [ jQuery.fn.init ] so see another conditon run another
                // condition for check the two conditions 1 detection [ Array ] && [ NodeList ];
                arr.constructor.name === "NodeList" || arr.constructor.name === "Array")) {
                push.call(ret, ...arr);

                // single Object && values Handle
            } else if (arr != null) { push.call(ret, arr); }
            return ret;
        },

        setArray: function( module ) {
            if (arguments.length === 0 || !module) return [];

            var arg = arguments, i = 0, 
                regexInteger = new RegExp("^\\b\\d+\\b$"),
                len = arguments.length, XMB08T9 = [],
                deepth, altradeepth, retArray = [] || {};

            for (; i < len; i++) {
                // check input HTMLDoc formatting && convert Array
                if (jQuery.isHTMLDoc(arg[ i ])) {
                    deepth = Array.prototype.slice.call(arg[ i ]);
                    deepth = deepth.length > 0 ? deepth : [arg[ i ]];
                    retArray.push( deepth );
                }

                // check input Object formatting && convert Array
                if (arg[ i ]) {
                    if (jQuery.isObject( arg[ i ] )) {
                        deepth = jQuery.flat(Object.entries(arg[ i ]));
                        retArray.push( ...deepth );
                    }
                }

                // check input Array formatting && convert Array
                if (Array.isArray( arg[ i ] )) {
                    retArray.push( arg[ i ] );
                }

                // check input String && Number && function && 
                // [ !Object && !Array && !HTMLDoc ] formatting && convert Array
                if (!Array.isArray(arg[i]) && !jQuery.isObject(arg[i])
                    && arg[i] && !jQuery.isHTMLDoc(arg[i])) {

                    altradeepth = String.prototype.trim.call( arg[ i ] );
                    altradeepth = altradeepth.split(/[,]/g);
                    altradeepth = new Array(...altradeepth)
                    retArray.push( altradeepth );
                }
            }

            // filter after converting array in value Object
            retArray = retArray.flat( Infinity );

            for (let r = 0; r < retArray.length; r++) {
                retArray[ r ] = typeof retArray[ r ] !== "object" ? 
                    String.prototype.trim.call( retArray[ r ] ) : retArray[ r ];

                if (regexInteger.test(retArray[ r ]) == true) 
                { retArray[ r ] = Number(retArray[ r ]);}

                if (jQuery.isObject(retArray[ r ])) 
                { retArray[ r ] = Object.entries(retArray[ r ]); }

                if (retArray[ r ] !== undefined && retArray[ r ]) {
                    
                    retArray[ r ] = typeof retArray[ r ] === "string" ? 
                        jQuery.extraTrim( retArray[ r ] ) : retArray[ r ];
                        
                    XMB08T9.push(retArray[ r ]);
                }
            }

            return jQuery.flat( XMB08T9.flat( Infinity ) );
        },

        each: function( obj, callback ) {
            var length, i = 0;

            if ( isArrayLike( obj ) ) {
                length = obj.length;
                for (; i < length; i++) {
                    if (callback.call(obj[ i ], i, obj[ i ]) === false) {
                        break;
                    }
                }
            } else {
                for ( i in obj ) {
                    if ( callback.call(obj[ i ], i, obj[ i ]) === false) {
                        break;
                    }
                }
            }

            return obj;
        },

        inArray: function(elems, arr, i) {
            if ( arguments.length === 0 ) return -1;
            return arr == null ? -1 : indexOf.call(elems, arr, i);
        },

        greps: function(elems, callback, invert) {
            var callbackInverse,
                matches = [],
                i = 0,
                length = elems.length,
                callbackExpect = !invert;

            // Go through the array, only saving the items
            // that pass the validator function
            for ( ; i < length; i++ ) {
                callbackInverse = !callback(elems[ i ], i);
                if ( callbackInverse !== callbackExpect ) {
                    matches.push( elems[ i ] );
                }
            }

            return matches;
        },

        // Support: Android <=4.0 only, PhantomJS 1 only
        // push.apply(_, arraylike) throws on ancient WebKit
        merge: function( first, second ) {
            var length = +second.length,
                j = 0,
                i = first.length;

            for ( ; j < length; j++ ) {
                first[ i++ ] = second[ j ];
            }

            first.length = i;

            return first;
        },

        // arg is for internal usage only
        map: function( elems, callback, args ) {
            var length, value,
                i = 0,
                ret = [];
            
            if ( isArrayLike( elems ) ) {
                length = elems.length;
                for ( ; i < length; i++ ) {
                    value = callback(elems[ i ], i, args);

                    if ( value != null ) {
                        ret.push( value );
                    }
                }

                // Go through every key on the object,
            } else {
                for ( i in elems ) {
                    value = callback(elems[ i ], i, args);

                    if ( value != null ) {
                        ret.push( value );
                    }
                }
            }

            return ret.flat( Infinity );
        },

        loops: function( obj, callback ) {
            var length, i = 0,
                elems = jQuery.makeArray( obj );
                length = elems.length;

            if (typeof obj === "object" && !jQuery.isHTMLDoc( obj )) {
                for ( i in obj ) {
                    callback.call( obj[ i ], i, obj[ i ], obj)
                }
            } else {
                for ( ; i < length; i++ ) {
                    callback.call( elems[ i ], i, elems[ i ], elems );
                }
            }

            return elems;
        },

        // check Single element
        singleElement: function( elem, extra ) {
            var trigger = elem,
                trigger = Array.isArray(trigger) ?
                    trigger.flat(Infinity)[ 0 ] : trigger,
                trigger = jQuery(trigger).flat();

            if (trigger.length === 1 && trigger[ 0 ].nodeType) {
                return typeof extra === "boolean" && 
                    extra ? trigger[ 0 ] : true;
            }
            return false;
        },
        
        // A global GUID counter for objects
        guid: 1,

        // jQuery.support is not used in Core but other projects attach their
        // properties to it so it needs to exist.
        support: support
    } );

    // fixed the @@non-call itrator error
    if (typeof Symbol === "function") {
        jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
    }


    // Populate the class2type map
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
        function( _i, name ) {
           class2type["[object " + name + "]"] = name.toLowerCase();
        }
    );
    
   
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

        init = jQuery.fn.init = function( selector, context, root ) {
            var elems, matched = [];

            if ( !selector ) {
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
                    var _newElems = document.querySelectorAll( elems ) || 
                        document.documentElement.querySelectorAll( elems );
                    _newElems = jQuery.makeArray( _newElems );

                    // now return Selected Eelements with pushStack selector
                    return jQuery( rootjQuery ).pushStack( _newElems );
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
    rootjQuery = jQuery( document );

    var documentElement = document.documentElement;

    // jQuery constructor name validation exchangeble if  minify code
    var jQueryExpando = jQuery().constructor.name;


    jQuery.each(
        ("isString isNumber isBoolean isSymbol isObject " +
            "isNodeList isRegExp isHistory isNavigator isTypeOf").split(" "),
        function( _i, name ) {
            name === "isTypeOf" ? jQuery[ name ] = function ( obj ) {
                return isDataType( obj, name, true );

            } : jQuery[ name ] = function ( obj ) {
                var plugin = name.slice( 2 );
                return isDataType( obj, plugin, false );
            };
        }
    );

    jQuery.extend({

        filter: function (obj, extra, callback) {
            return Filter( obj, extra, callback );
        },

        Callbacks: function ( fn ) {
            if ( arguments.length === 0 ) return;

            if ( arguments.length === 1 && isFunction( fn ) ) {
                return fn.call( null );
            }
            
            var called = arguments;

            for (let i = 0; i < called.length; i++) {
                if (typeof called[ i ] !== "function") {
                    called[ i ] = function() { };
                }
                called[ i ].call( null );
            }
        },

        speed: function (speed, callback) {
            var duration, delay, speed,
                callback = callback || jQuery.noop;

            // shift argument input parameter
            if ( speed == undefined || !speed ) {
                duration = 2000;
                delay = 20;

            } else if ( speed === "slow" ) {
                duration = 4000;
                delay = 20;

            } else if ( speed === "fast" ) {
                duration = 1000;
                delay = 20;

            } else if ( !Array.isArray( speed ) ) {
                duration = speed;
                delay = 20;

            } else if ( Array.isArray( speed ) ) {
                duration = speed[ 0 ];
                delay = speed[ 1 ];
            }

            if ( typeof delay === "boolean" && delay ) {
                delay = 1000;
            }

            // set speed with duration && deley time && extra future are [ dafault ]
            speed = !delay ? ( duration * 20 ) / 1000 : ( duration * delay ) / 1000;
         
            // control speed && manage speed duration
            if (delay < 3 || speed < 2 ) jQuery.throw("Warning:", "we cannot accept such low speed. this may put your machine at risk.");

            // let a name of the jqinterval [interval] function && after called callback function && last method set speed;
            var jqinterval = setInterval(function () { callback.call( jqinterval, jqinterval, clearInterval, speed ); }, speed);
        },

        timeout: function(speed, callback) {
            var int = parseInt(speed, 10),
            speed = isNaN( int ) ? 1000 : int,
            callback = callback || jQuery.noop;

            // call the callback in settimeout
            setTimeout( callback, speed );
        },

        cssNumber: function(elems, single) {
            var extraArr = [],
                trigger = jQuery( elems )[ 0 ];

            if (typeof single === "string" && single) {
                jQuery.loops(elems, function ( _i, el ) {
                    extraArr.push( el.style[ single ] );
                } );
            }
            return !single ? trigger.style.cssText : extraArr;
        },

        style: function(elems, name, value) {
            var trigger = elems, completeStyle,
                styles = window.getComputedStyle( trigger );

            completeStyle = !isNaN( parseFloat( styles[ name ] ) ) ?
                parseFloat( parseFloat( styles[ name ] ) ) : styles[ name ];

            return !value ? completeStyle :
                trigger.style[ name ] = value;
        },

        css: function(elems, name, styles) {
            var self = jQuery( elems )[ 0 ], 
                cssComplete,
                style = window.getComputedStyle( self );

            jQuery.loops(elems, function (_i, trigger) {
                if (typeof name == "string" && ( styles || !isNaN( styles ))) {
                    
                    styles = typeof styles === "number" && 
                        name !== "opacity" ? `${styles}px` : styles;
                    return trigger.style[ name ] = styles;

                }
                else if (typeof name !== "string" && typeof name === "object") {
                    jQuery.each(name, function (property, value) {

                        value = typeof value === "number" && 
                            property !== "opacity" ? `${value}px` : value;
                        trigger.style[ property ] = value;
                    } )
                };
            } );

            if ( typeof styles === "boolean" && styles ) {
                return cssComplete = !isNaN( parseFloat( style[ name ] ) ) ? 
                    parseFloat( parseFloat( style[ name ] ) ) : 0;

            } else if ((!styles || styles === false ) && isNaN( styles )) {
                return cssComplete = style[ name ];
            }

            return elems; // return [default] jQuery[selector, prevObject: jQuer..init];
        },

        cssInsert: function (pos, url, extra) {
            var cssRegex = /(\.css)$/,
                CSSAutoValid = /\.\w+\s*$/,
                CSSRecieve = jQuery.makeArray( url ),
                CSSExtentions, CSSNodes, CSSValidator;
                
            jQuery.greps( CSSRecieve, function( _CSSName ) {

                CSSNodes = document.createElement('link');
                CSSNodes.rel = "stylesheet";
                CSSNodes.type = "text/css";
                CSSNodes.contentType = "text/css";

                // autoValid CSSExtentions [ .cssd ] => output [ .css ];
                CSSValidator = _CSSName.replace(CSSAutoValid, ".css");

                CSSNodes.href = 
                    window.encodeURIComponent( 
                        extra == true ? CSSValidator : _CSSName.trim() 
                    );

                CSSNodes.media = "all"; // CSSChildNodes access all media

                if ( cssRegex.exec( CSSNodes.href ) === null ) {
                    jQuery.throw("ImplementionError:", "Failed execute '" + url + "' not valid CSSExtention.");
                }

                CSSExtentions = document.querySelectorAll('link');
                jQuery.greps( CSSExtentions, function( _CSSExt ) {
                    if ( CSSNodes.href !== _CSSExt.href ) {
                        pos === "after" ? document.body.append( CSSNodes ) :
                            pos === "before" ? document.head.append( CSSNodes ) : "";
                    
                    } else { CSSNodes.remove(); }
                } );
            } ); 
        },

        styleInsert: function (pos, styles) {

            var styleCode = document.createElement('style'),
                textNodes = document.createTextNode(styles);
            styleCode.append(textNodes);

            pos === "before" || pos === "prepend" ?
                document.head.insertAdjacentElement('beforeend', styleCode) :
            pos === "after" || pos === "append" ?
                document.body.insertAdjacentElement('beforeend', styleCode) : "";
        },

        scriptInsert: function(pos, url, type, extra ) {
            // shift arguments scriptInsert js modules
            if (typeof type === "boolean") {
                extra = type;
                type = undefined;
            }

            type = !type ? "text/javascript" : type;
            
            var SRCPosition = pos, SRCURL = url,
                SRCNodes,  SRCExtentions, store = [],
                SRCRegex = new RegExp("(\\.js)$"), 
                SRCAutovalid = new RegExp("(\\.\\w+\\s*)$");

            jQuery.loops(SRCURL, function( _i, URI) {
                URI = URI.trim();

                if (SRCRegex.exec( URI ) === null && !extra) {
                    jQuery.throw("ScriptError:", "Failed execute '" + url + "' not valid script Extentions");
                }

                // auto validator javascript extentions
                if (typeof extra === "boolean" && extra) {
                    URI = URI.replace(SRCAutovalid, ".js");
                }

                // create script element && set src modules
                SRCNodes = document.createElement("script");
                SRCNodes.src = URI; // set script src URI
                SRCNodes.type = type; // set scrpt types
                SRCNodes.charset = "utf-8"; // charset utf-8

                SRCExtentions = document.querySelectorAll('script');
                jQuery.greps(SRCExtentions, function( URI ) {
                    store.push( URI.src );
                } );
                
                if ((indexOf.call(store, SRCNodes.src) > -1) !== true) {
                    SRCPosition == "prepend" ? document.head.append( SRCNodes ) : 
                        SRCPosition == "append" ? document.body.append( SRCNodes ) : null;
                }
            } );
        },

        nodeName: function (elem, name) {
            if (arguments.length === 0 || !name) return false;
            
            if ( jQuery.singleElement( elem ) ) {
                var trigger = jQuery.singleElement(elem, true);
                return trigger.nodeName && 
                    trigger.nodeName.toLowerCase() === name.trim().toLowerCase();
            }
        },

        nodeType: function( elem ) {
            if (arguments.length === 0) return false;
            return typeof elem.nodeType !== "undefined";
        },

        removeAttr: function (elems, value) {
            if (!value && typeof value == "string") return;
            jQuery.each(elems, function ( _i, _elems ) {
                jQuery.each(value.trim().split(" "), function ( _i, attr ) {
                    if (_elems.hasAttribute( attr )) {
                        _elems.removeAttribute( attr );
                    }
                } );
            } );
            return elems;
        },

        attr: function( elems, name, value) {
            var key = ['checked', 'readonly', 'autocomplete', 'disabled', 'autofocus'],
                values = ['checked', 'readonly', 'on', 'disabled', 'on'],
                index = key.indexOf(name),
                argument = arguments.length;

            if (!name && !value) {
                return elems;
            }
        
            if (name && !value) {
                return jQuery.makeArray( elems )[ 0 ].getAttribute( name ) || undefined;
            }

            jQuery.each(elems, function (_i, trigger) {
                if (typeof value === "boolean") {
                    if ( value ) {
                        if ( index >= 0 ) {
                            trigger.setAttribute( key[ index ], values[ index ] );
                        }
                    } else {
                        if ( trigger.hasAttribute( name ) ) {
                            trigger.removeAttribute( name );
                        }
                    }
                }

                if (argument === 3 && typeof value !== "boolean" && index >= 0) {
                    trigger.setAttribute( key[ index ], values[ index ] );

                } else if (argument === 3 && typeof value !== "boolean" && value) {
                    trigger.setAttribute(name, jQuery.extraTrim( value ) || value);
                }
            } );

            return elems;
        },

        access: function( args, start, end ) {
            var argument = typeof args === "object" ? args : [],
                retAccess = [], startIndex, lastIndex;
            
            startIndex = !start ? 0 : parseInt( start );
            lastIndex = !end ? argument.length : parseInt( end );

            for ( ; startIndex < lastIndex; startIndex++ ) {
                retAccess.push( argument[ startIndex ] );
            }

            return retAccess; // return Array @@iterator;
        }
    } );

    // Handle Array plugins $.Array() plugins in shorthands ?
    // Here create Array related only short Hand plugins ([])
    // 1 ) shift plugins created now shift use element remove
    // 2 ) unshift plugins created now unshift add new element
    // 3 ) indexOf plugins will be worked on findIndex element
    // 4 ) includes plugins give exist value in true && false
    jQuery.each(["indexOf", "includes", "slice", "lastIndexOf", "find", 
        "flat", "join", "fill", "concat"], function( _i, methods ) {
            
        jQuery[ methods ] = function( arr, options ) {
            var startIndex = 1; options = arguments;
            return [][ methods ].call (
                arr, ...jQuery.access(options, startIndex)
            );
        };
    } );

    // $.html() && $.text() plugin in jQuery method ("*")
    jQuery.each(["text", "html"], function( _i, method ) {
        jQuery[ method ] = function( selector, value ) {
            return getHtmlOrText( selector, value, method );
        };
    } );

    jQuery.each(
        ("setLocalStorage setSessionStorage getLocalStorage getSessionStorage " +
            "clearLocalStorage clearSessionStorage clearStorage").split(" "),
        function (_i, name) {
            jQuery[name] = function (key, value) {
                return customizeLocalOrSessionStorage([key, value], name);
            };
        }
    );

    // Argument "data" should be string of html
    // context (optional): If specified, the fragment will be created in this context,
    // defaults to document
    // keepScripts (optional): If true, will include scripts passed in the html string
    jQuery.parseHTML = function ( html ) {
        var html, fragments, parsed;
        if (typeof html !== "string") {
            return [];
        }

        fragments = document.createElement('template');
        fragments.innerHTML = html;
        parsed = fragments.content;
        return jQuery.merge( [], parsed.childNodes );
    };

    // Cross-browser xml parsing
    jQuery.parseXML = function( data ) {
        var xml, xmlError;
        if (!data || typeof data !== "string") return [];

        // Support: IE 9 - 11 only
	    // IE throws on parseFromString with invalid input.
        try { xml = (new DOMParser()).parseFromString(data, "text/xml")}
        catch( e ) { };

        xmlError = xml && xml.getElementsByTagName("parsererror")[ 0 ];
        if ( !xml || xmlError ) {
            jQuery.throw("XMLError:", "Failed execute your entered '"+ data +"' doesn't match from XMLDocument."+
            "\n @suggest: <xmldata></xmldata>");
        }
        return xml; // if all proccess done successfully so return parsed XMLDocument code ***
    };
    

    /* Multiple Functions --|
    */
    function isDataType( obj, name, extra ) {
        if (!obj && typeof obj !== "boolean") return;

        if ( extra === true ) {
            return Object.prototype.toString.call( obj )
                .replace(RegExpr.square, "")
                .split(" ")[ 1 ].toLowerCase();
        }

        return obj.constructor.name === name;
    }


    /* Text Related Functions --|
    */
    function capitalizeOrTitle( txt, extra, assign ) {
        if (typeof txt !== "string" || arguments.length === 0) {
            return "Sorry!";
        }

        // shift arguments !detect boolean;
        if ( typeof extra !== "boolean" ) {
            assign = assign || extra;
            extra = undefined;
        }

        // extra trim whiteSpace on globly and replce "";
        var trimed = txt.trim().replace(/\s+/gm, " ");
      
        // if only 1 arguments && only txt persent ret filter txt;
        if ( !extra && !assign && typeof extra !== "boolean" ) {
            return trimed;
        }

        // if assign ^ output [OUTPUT] && assign ^^ 
        // output [output] set the lowerCase() text;
        if (assign === "^") {
            return trimed.toUpperCase();
        } else if (assign === "^^") {
            return trimed.toLowerCase();
        }

        // if assign ! output [Output] && assign !!
        // output [output] set the lowerCase() text;
        if ( assign === "!" ) {
            return trimed.substr(0, 1).toUpperCase() + trimed.substr( 1 );
        } else if ( assign === "!!" ) {
            return trimed.substr(0, 1).toLowerCase() + trimed.substr( 1 );
        }

        // let multipe variable && initialization now variable
        var input = trimed.trim(), capitalize, i = 0,
            regex = new RegExp("[\\\\\\/\\-\\.\\s*_,\\=\\+]", "g"),
            matched = input.match( regex ) || [], 
            capToTitle = input.split( regex ), returnCase = "";
        
        for ( ; i < capToTitle.length; i++ ) {
            capitalize = capToTitle[ i ].substr(0, 1).toUpperCase() + 
                capToTitle[ i ].substr( 1 ).toLowerCase();
            
            // Here check undefined value ( if matched any
            // value so replace && override && set blank "")
            if ( typeof matched[ i ] === "undefined" ) {
                matched[ i ] = "";
            }

            // if all proccess done so give the access
            // name of the returnCase variable in all v;
            returnCase += capitalize + matched[ i ];
        }
      
        if (typeof extra === "boolean" && extra) {
            returnCase = returnCase.replace(regex, "");
        }

        // if assign three exclamation line !!! so
        // convert returnCase of camelCase form
        if ( assign === "!!!" ) {
            return returnCase.substr(0, 1)
                .toLowerCase() + returnCase.substr( 1 );
        }

        return returnCase; // return [default] returnCase
    } 
    
    // replaceText function for text find && replace
    function replaceText( text, find, replace, extra ) {
        if ( !text ) return "Sorry!";

        var text = String.prototype.slice.call( text ),
            text = capitalizeOrTitle( text ),
            i = 0, 
            output = "",
            split = text.split(" "),
            exec = text, 
            matched = [],
            regex = check.char,
            compiler = new RegExp("(\\s*)\\/\\w+\\s*$");
        
        if (!isDataType(find, "RegExp")) {
            if (regex.test( find )) {
                find = new RegExp("(\\s*)\\" + find + "(\\s*)","g");
            } else {
                find = new RegExp("(\\s*)" + find + "(\\s*)", "g");
            }
        }

        if (compiler.test(find) !== true) {
            find = find + "g";
        }

        while(exec = find.exec( text )) {
            matched.push( exec[ 0 ] );
        }

        for (; i < split.length; i++) {
            
            if ( typeof extra === "boolean" && extra ) {
                if (typeof matched[ i ] === "undefined") {
                    matched[ i ] = "";
                }
                output += split[ i ].replace( find, replace + matched[ i ] ) + " ";
            } else {
                output += split[ i ].replace( find, replace );
            }
        }

        return output.trim();
    }

    function removeWhiteSpace( txt ) {
        var txt = capitalizeOrTitle( txt ),
            regex = new RegExp("\\s*[\\W]\\s*", "g"),
            matched = txt.match( regex ) || [],
            split = txt.split(regex), storeObject = "";
    
        for (let i = 0; i < split.length; i++) {
            if (typeof matched[ i ] === "undefined") {
                matched[ i ] = "";
            }
            matched[ i ] = matched[ i ] !== " " ? 
                matched[ i ].trim() : matched[ i ];
            storeObject += split[ i ].trim() + matched[ i ];
        }
        return storeObject;
    }
    

    /* jQuery.plugin && jQuery(selector).plugin --|
    /* Filter && remove Duplicate Elements function
    */
    function Filter (elems, extra, callback) {
        elems = elems || [];

        // shift arguments for detect function
        if ( typeof extra === "function" ) {
            callback = callback || extra;
            extra = undefined;
        }
        
        callback = callback || function() { };
        
        if ( arguments.length === 0 || typeof elems !== "object" ) return [];

        if ( Array.isArray( elems ) ) {
            elems = elems;
        } else if ( typeof elems === "object" ) {
            elems = jQuery.makeArray( elems );
        }

        var filtered = elems.filter((v, i, a) => {
            if (typeof extra === "boolean" && extra) {
                return a.indexOf(v) === i && v && v != null;
            }
            return v && v !== null && v !== NaN;
        } );

        for (let i = 0; i < filtered.length; i++ ) {
            callback.call( filtered[ i ], i, filtered[ i ], filtered );
        }

        return filtered;
    }

    /* jQuery(selector).html() && jQuery(selector).text() plugins --|
    */
    function getHtmlOrText( elems, value, name ) {
        var trigger = jQuery( elems );
        var complete = "", i = 0;
        
        for (; i < trigger.length; i++) {

            if (name === "html" && value !== undefined) {
                trigger[ i ].innerHTML = value;
            } else if ( name == "html" && !value) {
                return trigger[ i ].innerHTML;
            }

            if (name === "text" && value !== undefined) {
                trigger[ i ].textContent = value;
            } else if (name === "text" && !value) {
                complete += trigger[ i ].textContent;
            }
        }

        return complete ? complete : elems;
    }


    /* Implement the identical functionality for filter and not
    */
    function winnow(elements, qualifier, not) {
        // Single element
        if (qualifier.nodeType) {
            return jQuery.greps(elements, function ( elem ) {
                return (elem === qualifier) !== not;
            });
        }

        // Arraylike of elements (jQuery, arguments, Array)
        if (typeof qualifier !== "string") {
            return jQuery.greps(elements, function ( elem ) {
                return (indexOf.call(qualifier, elem) > -1) !== not;
            } );
        }

        if (typeof qualifier === "string") {
            return jQuery.greps(elements, function( elem ) {

                elem = Array.isArray(elem) || typeof elem === "string" || 
                    typeof elem === "number" || elem.nodeType ? elem : null;

                if (elem != null && elem) {
                    return elem.matches( qualifier ) !== not;
                }
            } );
        }
    }


    // make short hand [append, prepend, appendTo, prependTo, after, before] plugins function;
    // this plugins be use only element insert or adjust in HTMLDocuemnet HTMLElements insert
    // allowed permission only HTMLElements !body element && array, String, number function only
    function manipulationReplace(elems, place, replace) {
        var where, Insert, rfilter, extractNode = [];
        rfilter = replace.flat(Infinity);
        rfilter = ( rfilter[ 0 ] || {} ).constructor.name === jQueryExpando ? rfilter[ 0 ] : rfilter;
        where = place === "appendTo" ? "append" : place === "prependTo" ? "prepend" : place;
        
        jQuery.each(rfilter, function ( _i, extract ) {
            extract = extract || {}; // Force to be an Object
            if ((!extract.nodeType && typeof extract === "number") || (!extract.nodeType && typeof extract === "string")) {
                // convertation number to String for extract dataType at defined
                extract = typeof extract === "number" ? String.prototype.trim.call(extract || "") : extract;
                extract = jQuery.parseHTML(extract); // convert extract String to HTMLNodesList #[node]
            }
            else if (extract.nodeType === 1 || extract.nodeType === 3 || extract.nodeType === 11 || 
                extract.nodeType === 7 || extract.nodeType === 8) {
                extract = extract;
            }

            // push extract for name of the extractNode array dataType && all data accepted variable
            extractNode.push( jQuery.makeArray(extract) ); // give the access extract data from to extractNode variab..
        });

        // Flating extractNode for Infinity time
        extractNode = extractNode.flat(Infinity);

        // reverse extractNode some setuation in "prepend" || "after" place;
        extractNode = where === "prepend" || where === "after" ? 
            jQuery(extractNode).reverse() : extractNode;
        
        jQuery.each(elems, function ( _i, cur, clonemerge ) { jQuery.each(extractNode, function ( _i, merge ) {
            // cloning merge item && store in clonemerge var clone only node allowed ?
            clonemerge = merge.nodeType ? merge.cloneNode( true ) : merge;
            
            if (!([].indexOf.call(extractNode, cur) > -1) && 
                (clonemerge || {}).tagName !== document.body.tagName && clonemerge.nodeType !== 9) {
                // remove prevNode merge old data remove allowed only nodes;
                clonemerge.nodeType ? merge.remove() : merge;

                // check conditon && set or convert clonemerge data String format !nodes only allowed
                if (jQuery.isObject(clonemerge) || jQuery.isFunction(clonemerge) || 
                    Array.isArray(clonemerge) || jQuery.isString(clonemerge) || jQuery.isNumeric(clonemerge)) {
                    clonemerge = String.prototype.trim.call(clonemerge || ""); // edit clonemerge
                }
                
                if ((clonemerge.nodeType || typeof clonemerge === "string") && cur.nodeType) {

                    // final proccess if done so merge in HTMLDocument Eelements;
                    cur[ where ]( clonemerge ); // HTMLElement in merges success!
                }
            }
        } ); } );

        return elems; // jQuery this type return now
    }

    /* Override HTML Tag && Replace HTML Tage to another tags */
    // override HTMLEelements Tag || replace HTMLEelements Noddes
    function replaceNodes(elems, replace) {
        var fragments, replaceNodes = [], acceptInner,
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

        acceptInner = ["input", "img", "source", "link", "base"];
    
        jQuery.loops(elems, function (_i, _elems) {
            jQuery.loops(replaceNodes, function (_i, rn) {
                // store all children in name of backup var;
                backup = _elems.innerHTML;

                // clone nodes rn for duplicate nodes && setHTML
                cloneNodes = rn.cloneNode( true );
                // get last dom Elements tree of childNodes
                deep = jQuery( cloneNodes ).deepAll52( true );
                targets = deep.length > 0 ? deep[ 0 ] : cloneNodes;
                
                // set All _elems childrens elements in
                // name of target varable and after replace
                !acceptInner.includes(cloneNodes.tagName.toLowerCase()) ? 
                    targets.innerHTML = backup : null;
                _elems.parentElement.replaceChild(cloneNodes, _elems);
            } );
        } );

        if (jQuery(elems).not(replace).length > 0) {
            jQuery.loops(elems, function (_i, cur, _arr, rmove) {
                jQuery.loops(replace, function (_i, node) {
                    if (node.nodeType && node.parentNode) {
                        node = node.cloneNode( true );
                        // rmove = cur;
                    }
                } );
            } );
        }

        return elems;
    }

    
    /* Animation ) make Animation function only for HTMLElement 
     * 1 ) Animation through animate element smoothly && faded
     * 2 ) Animation in a advance future added [stop] methods ?
     * 3 ) stop mehtod only work setet animtion of acsact stop
    */
    function Animation (elem, prop, speed, callback ) {
        // shift arguments for target on detect callback function
        if ( isFunction( speed ) ) {
            callback = callback || speed;
            speed = undefined;
        }

        // check none set negative size from element styles not work styles in n;
        var rprop1 = /^(width|height|maxWidth|maxHeight|minWidth|minHeight)$/,
            rprop2 = /^(padding|paddingLeft|paddingRight|paddingTop|paddingBottom)$/,
            rprop3 = /^(fontSize|border|borderWidth|borderTopWidth|botderLeftWidth)$/;

        jQuery.each( prop, function( key, value ) {
            // run querys && check conditons regex through none nagive stles
            if (rprop1.test( key ) || rprop2.test( key ) || rprop3.test( key )) {

                // if value conditions true so override key vlaue now
                parseFloat( value ) < 0 ? prop[ key ] = "0px" : null;
            }
        } );

        speed = !speed ? 2 : speed === "slow" ?
            3 : speed === "fast" ? 1 : speed;

        var Ospeed = speed === 2 ? 800 : speed === 3 ?
            1000 : speed === 1 ? 500 : speed;

        jQuery.each(elem, function( _i, trigger, maxvalue = [] ) {
            jQuery.each(prop, function( _ii, integerValue) {
                if ( parseFloat( integerValue ) < 0 ) {
                    maxvalue.push( - parseFloat( integerValue, 10 ) );
                } else {
                    maxvalue.push( parseFloat( integerValue, 10 ) );
                }
            } );
            
            jQuery.loops(prop, function( property, value ) {
                var complete = 0,
                    cssvalue = parseFloat(value, 10),
                    currentSizes = jQuery.style(trigger, property),
                    currentSizes = parseFloat(currentSizes),
                    cur = currentSizes, dir = cssvalue,
                    maxNumber = Math.max( ...maxvalue );
                
                // start timing Intervals function only [#Number] deal
                var intervals = setInterval(function( _arg1, _arg2 ) {

                    if (trigger.style[ property ] != value && property !== "opacity") {

                        if ( cur <= 11 && dir > 0 ) {
                            currentSizes = currentSizes + 1;
                        } 
                        else if ( cur <= 11 && dir < 0 ) {
                            currentSizes = currentSizes - 1;
                        }
                        else if ( parseInt(cssvalue) > parseInt(currentSizes) && dir > 0 ) {
                            currentSizes = currentSizes + 1;
                        }
                        else if ((parseInt(cssvalue) < parseInt(currentSizes)) && dir >= 0 ) {
                            currentSizes = currentSizes - 1;
                        }
                        else if ((parseInt(cssvalue) < parseInt(currentSizes)) && dir <= 0 ) {
                            currentSizes = currentSizes - 1;
                        }
                        else { currentSizes = cssvalue; } // set as [default] value complete


                        if ( parseInt( currentSizes ) === maxNumber || currentSizes === - maxNumber ) {

                            // now callback function called if callback function
                            // not be defined another resion user so here one 
                            // function extra by default set beacuse fixed error
                            ( callback || function() { } ).call( trigger, _i );

                            // set sizing "0px" only [width height padding fontSize] elements sizes
                            if ( property.includes("width") || property.includes("height") || 
                                property.includes("padding") || property.includes("fontSize") ) {

                                currentSizes.toFixed( 0 ) == 0 ? trigger.style[ property ] = "0px" : 
                                    trigger.style[ property ] = value;
                            } else { trigger.style[ property ] = value; } // else part run && set value

                            clearInterval( intervals ); // when timing proccess done interval clrear
                        } else {
                        
                        // set only numbers styles for example styles
                        // [margin, padding, fontSize, transform, width
                        // height, scale ] work only not be work colors
                        trigger.style[ property ] = currentSizes + "px"; }
                    }
                }, speed / 300 );

                
                // start timing miniIntervals function only [#Number] deal
                if (property === "opacity") {
                    var miniIntervals = setInterval(function() {
                        
                        if ( currentSizes > cssvalue && dir >= 0 ) {
                            currentSizes = currentSizes - ( 1 / 10 );
                        } 
                        else if ( currentSizes > cssvalue && dir < 0 ) {
                            currentSizes = currentSizes + ( cssvalue / 10 );
                        } 
                        else if ( currentSizes < cssvalue ) {
                            currentSizes = currentSizes + ( cssvalue / 10 );
                        }

                        if ( currentSizes.toFixed( 3 ) == cssvalue ) {

                            // if currentSizes decrement--; or increment++;
                            // approx cssvalue so direct set backup value
                            trigger.style[ property ] = value;
                            clearInterval( miniIntervals ); // Interval clear now
                        } else {

                            // here set only opacity fadeIn && fadeOut
                            // effect Animation set smoothly effects
                            trigger.style[ property ] = currentSizes;
                        }
                    }, Ospeed / 10 ); // set mini opacity timing duration
                }
            } );
        } );
    }

   
    /* WidthOrHeight ) get Full width or Height make function
     * 1 ) $(selector).width(value) content width get only
     * 2 ) $(selector).innerWidth() content innerWidth get only
     * 3 ) $(selector).outerWidth(true) get outerWidth with m-
    */
    function getWidthOrHeight (elem, axis, extra) {
        if (axis === "scrollWidth" || axis === "scrollHeight") {
            return elem[ 0 ][ axis ];
        }
        
        var trigger, styles, clientRect, titleAxis, border, margin, padding, doc,
            Axis = axis == "innerWidth" ? "width" : axis == "outerWidth" ? "width" :
            axis == "innerHeight" ? "height" : axis == "outerHeight" ? "height" : axis;
        

        // getting first element of elem in Array format ?
        trigger = jQuery.nodeType( elem ) ? [ elem ][ 0 ] : elem[ 0 ];
        styles = ( property ) => jQuery.style(trigger, property); 
        titleAxis = capitalizeOrTitle(Axis, "", "!");
        border = ( trigger["offset" + titleAxis] - trigger["client" + titleAxis] );


        if ( isWindow( trigger ) ) {

            // $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
            return axis.indexOf("outer") === 0 ?
                trigger["inner" + titleAxis] :
                trigger.document.documentElement["client" + titleAxis];
        }

        // Get document width or height
        if ( trigger.nodeType === 9 ) {
            doc = trigger.documentElement;

            // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
            // whichever is greatest
            return Math.max(
                trigger.body["scroll" + titleAxis], doc["scroll" + titleAxis],
                trigger.body["offset" + titleAxis], doc["offset" + titleAxis],
                doc["client" + titleAxis]
            );
        }

        // make a clientRect variable object of getBoundingClientRect();
        clientRect = trigger.getBoundingClientRect()[ Axis ];
        
        // getting for way margin [marginTop, marginBottom, marginLeft, marginRight] in styles
        margin = Axis === "width" ? ["marginLeft", "marginRight"] : ["marginTop", "marginBottom"];
        // getting for way padding [paddingTop, paddingBottom, paddingLeft, paddingRight] in styles
        padding = Axis === "width" ? ["paddingLeft", "paddingRight"] : ["paddingTop", "paddingBottom"];
        
        // convertation String to Number format && after added two margins [marginLeft + marginRight];
        margin = (parseFloat(styles( margin[ 0 ] ), 10) + parseFloat(styles( margin[ 1 ] ), 10));
        // convertation String to Number format && after added two padding [paddingLeft + paddingRight];
        padding = (parseFloat(styles( padding[ 0 ] ), 10) + parseFloat(styles( padding[ 1 ] ), 10));

        // if extra of dataType number so set all available sizes in elem
        if (( typeof extra === "number" || typeof extra === "string" ) && typeof extra !== "boolean") {
            extra = typeof extra === "string" ? parseFloat( extra ) : extra;

            jQuery.loops(elem, function ( _i, setWidthOrHeight ) {
                if (axis === "width" || axis === "height") {
                    jQuery.css(setWidthOrHeight, Axis, `${ extra < 0 ? 0 : extra }px`);

                } else if (axis === "innerWidth" || axis === "innerHeight") {
                    jQuery.css(setWidthOrHeight, Axis, `${ extra - padding < 0 ? 0 : extra - padding }px`);

                } else if (axis === "outerWidth" || axis === "outerHeight") {
                    jQuery.css(setWidthOrHeight, Axis, `${ ( extra - padding) - border < 0 ? 0 : ( extra - padding ) - border }px`);
                }
            } ); return elem;
        }

        // return [default] value [width, height] && [outerWidth, outerHeight]
        if (axis === "width" || axis === "height") {
            return ( clientRect - border ) - padding;

        } else if (axis === "outerWidth" || axis === "outerHeight") {
            return typeof extra === "boolean" && extra ? 
                clientRect + margin: clientRect;
        }
        
        // return [default] innerWidth or innerHeight
        return ( clientRect - border ); // return[ ];
    }

    // [ STORAGE ] control function on tow types storage [localStorage, sessionStorage]
    function customizeLocalOrSessionStorage(_items, _storageName) {

        var key = _items[0],
            value = _items[1],
            execStorage = /(LocalStorage|SessionStorage)/.exec(_storageName),
            storageName = execStorage != null ? execStorage[ 0 ] : "Storage",
            storageName = capitalizeOrTitle(storageName, "!!"),
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
                validator = RegExpr.object.test(get) === true &&
                    get[0] === "{" && get[get.length - 1] === "}";
            return validator === true ? JSON.parse( get ) : get || undefined;
        }

    }

    /* allFadeCustomize function create for help making fade jQuery plugins */

    var prevDisBackup = [] || {};

    function allFadeCustomize(cur, speed, callback, to, dir) {
        // shift arguments for detect function 
        if (typeof speed === "function") {
            callback = callback || speed;
            speed = undefined; // set undefined speed;
        }

        // Force function to be an function
        callback = callback || function () { };

        speed = !speed ? 1000 : speed === "slow" ? 1500 : speed === "fase" ? 500 : speed;  

        jQuery.each(cur, function ( _i, cur ) {
            if (jQuery.css(cur, "display") !== "none") {
                prevDisBackup.push(cur.style.display);
            }
 
            var o = jQuery.css(cur, "opacity", true),  
                backup = jQuery.cssNumber( cur ),
                fto = to ? parseFloat( to || 0 ) : o, counter = 0; 

            if ((jQuery.css(cur, "display") === "none" || 
                    jQuery.css(cur, "visibility") === "hidden") && dir === "fadeIn") {
                cur.style.opacity = 0;
                cur.style.display = ""; // unset cur of display

                jQuery.speed([parseInt(speed), 5], function (intervals, clear) {
                    counter = counter + ( o / 100.11 );
                    counter = Number(counter.toFixed(7));

                    // check clear intervals condition of counter
                    if ( counter >= 1 ) {
                        cur.style = backup; // css property recycle or backups
                        cur.style.opacity = "";

                        // cur of Element of display backups !none display
                        cur.style.display = prevDisBackup[_i] || ""; 

                        // when all process done && all backups set
                        // successfully so call the one function 
                        // callback function in pass three arguments
                        // first arguments this key sencond caller ?
                        callback.call( cur, _i, cur );
                        clear( intervals ); // now Here clear intervals

                        // when condtion not be true so run this conditon
                        // if up clear intervals condition true so stop 
                    } else {
                        // set opacity in cur element of number formatting
                        cur.style.opacity = counter; // opacity set success!
                    }
                } );
            }

            if (jQuery.css(cur, "display") !== "none" && dir === "fadeOut") {
                jQuery.speed([speed, 5], function (intervals, clear) {
                    o = o - ( 1 / 100.11 ); 
                    o = Number(o.toFixed( 7 ));
    
                    if ( Number(o.toFixed( 2 )) <= 0.00 ) {
                        cur.style = backup; // css property recycle or backups
                        cur.style.opacity = "";

                        // cur of Element of display backups !none display
                        cur.style.display = "none";

                        // when all process done && all backups set
                        // successfully so call the one function 
                        // callback function in pass three arguments
                        // first arguments this key sencond caller ?
                        callback.call( cur, _i, cur );
                        
                        clear(intervals); // now Here clear intervals

                        // when condtion not be true so run this conditon
                        // if up clear intervals condition true so stop 
                    } else if (jQuery.css(cur, "display") !== "none") {
                        // set opacity in cur element of number formatting
                        cur.style.opacity = o; // opacity set success!
                    }
                } );
            }

            if (dir === "fadeTo") {
                jQuery.speed([speed, 5], function (intervals, clear) {
                    counter = counter + ( fto / 100.11 );
                    counter = Number(counter.toFixed(7));
                    
                    if ( fto < 0 ? counter <= fto : counter >= fto ) {
                        cur.style = backup; // css property recycle or backups
                        cur.style.opacity = fto;

                        // when all process done && all backups set
                        // successfully so call the one function 
                        // callback function in pass three arguments
                        // first arguments this key sencond caller ?
                        callback.call( cur, _i, cur );

                        clear(intervals); // now Here clear intervals

                        // when condtion not be true so run this conditon
                        // if up clear intervals condition true so stop 
                    } else { 
                        // set opacity in cur element of number formatting
                        cur.style.opacity = counter; // opacity set success!
                    }
                } );
            }
        } ); 
    }  

    /* showHide function create for use help of show && hide && toggle
     * plugins | here inject two types plugins first smoothness effect
     * and without smoothness direct run code use plugins hide plugins
     * will be work element hide && show plugins will be work elements
     * if hidden || none show plugins show all target element and again
     * toggle plugins will be work show && hide two types work effect
    */
    var prevDisBackup = []; // let a variable prevDisBackup type array
    function showHide (cur, speed, callback, dir) {
        // shift arguments for only get from function
        if (typeof speed === "function") {
            callback = callback || speed;
            speed = undefined; // set speed undefined
        }

        // Force to be an a function will be attach fake function || {};
        callback = callback || function () { }; // attach fake function

        // shift easing or effecting speed values only Numbers formatting
        speed = speed === "" ? 150 : speed === "slow" ?
            200 : speed === "fast" ? 100 : speed; // shift successful!

        jQuery.each(cur, function ( _i, cur, CSSMatched ) {

            // stored or push display property in name of the prevDisBackup
            if (jQuery.css(cur, "display") !== "none") {
                prevDisBackup.push(cur.style.display);
            } else { prevDisBackup.push("") } // else push "" blank values
        
            // set [default] show && hide && toggle if !speed defined ?
            if (!speed && typeof speed !== "function" && dir == "show") {
                cur.style.display = prevDisBackup[ _i ];
            }
            if (!speed && typeof speed !== "function" && dir === "hide") {
                jQuery.css(cur, "display", "none"); // set none display
            }
        
            CSSMatched = jQuery.css(cur, "display");

            // if dir equal to "show" so reset cur of display && set display blank
            if (jQuery.css(cur, "display") === "none" && speed && dir === "show") {
                cur.style.display = ""; // on show cur css display unset blank
            }
            
            var CSSBackup = jQuery.cssNumber( cur ), // backup cur styles
            CSSMRG = jQuery.css(cur, "margin", true), // get css margins
            CSSPAD = jQuery.css(cur, "padding", true), // get css padding
            CSSWDH = jQuery.css(cur, "width", true), // get css width
            CSSHEI = jQuery.css(cur, "height", true), // get css height
            CSSOPC = jQuery.css(cur, "opacity", true); // get css opacity

            // let showHide variables [show hide] shift one by one props
            var SHOWMRG = 0, SHOWPAD = 0, SHOWHEI = 0, SHOWWDH = 0,
                SHOWOPC = 0, FIXINT = 0; // [default] settings ?
            var HIDEMRG = CSSMRG, HIDEPAD = CSSPAD, HIDEHEI = CSSHEI,
                HIDEWDH = CSSWDH, HIDEOPC = CSSOPC || 1; // attach css property
            
            // decrease--; cur of style property values | cur css styles
            // property reset now set css value 0; margin padding width
            // height and overflow hidden and before all property set 0
            speed && dir === "show" && CSSMatched === "none" ? jQuery.css(cur, {
                width: "0px", height: "0px", padding: "0px", 
                margin: "0px", overflow: "hidden" // done proccess
            }) : null;

            // start now [intervals] function with jQuery plugins jQuery.speed
            // plugins through this plugins facility start intervals && clear
            // intervals give two types facility for easy now with callbacks ?
            jQuery.speed([speed, 20], function ( Intervals, clear ) {

                // start css [show hide and toggle] plugins animations here create || define two 
                // types of animation first animation for increase-- css property values && second
                // animation for decrease++ css property values and clear( intervals ) provide for
                // facility before Initilialize check two types important conditons first conditon
                // check if cur of display !== none so run hide Animation code else not run hided
                // animation code but run second code if !== none display of cur so start animation
                // show animation show animation again check code or conditon same before opposite
                jQuery.Callbacks( function CSSAnimationSetup( _type ) {
                    if (dir === "hide" && CSSMatched !== "none" && speed && 
                        jQuery.css(cur, "display") !== "none") {
                        
                        if ( Number( HIDEOPC.toFixed( 2 ) ) === 0.00 ) {
                            cur.style = CSSBackup; // set all prev css backup
                            cur.style.display = "none"; // set display none
                            callback.call(cur, cur, _i); // callback call now
                            clear( Intervals ); // stop || clear intervals int

                        } else if ( Number( HIDEOPC.toFixed( 2 ) ) !== 0.00 ) {

                            // HIDECSSPROPERTY decreament--; css property set counters only
                            // deal numbers but here simple check condition && auto set
                            // integer number value 0 in All Hide css property last val = 0;

                            HIDEHEI = ( HIDEHEI > FIXINT ) ? HIDEHEI - ( CSSHEI / 100.11 ) :
                                ( CSSHEI < FIXINT ) ? HIDEHEI - ( CSSHEI / 100.11 ) : FIXINT;

                            HIDEWDH = ( HIDEWDH > FIXINT ) ? HIDEWDH - ( CSSWDH / 100.11 ) :
                                ( CSSWDH < FIXINT ) ? HIDEWDH - ( CSSWDH / 100.11 ) : FIXINT;

                            HIDEMRG = ( HIDEMRG > FIXINT ) ? HIDEMRG - ( CSSMRG / 100.11 ) :
                                ( CSSMRG < FIXINT ) ? HIDEMRG - ( CSSMRG / 100.11 ) : FIXINT;

                            HIDEPAD = ( HIDEPAD > FIXINT ) ? HIDEPAD - ( CSSPAD / 100.11 ) :
                                ( CSSPAD < FIXINT ) ? HIDEPAD - ( CSSPAD / 100.11 ) : FIXINT;

                            HIDEOPC = ( HIDEOPC > FIXINT ) ? HIDEOPC - ( CSSOPC / 100.11 ) :
                                ( CSSOPC < FIXINT ) ? HIDEOPC - ( CSSOPC / 100.11 ) : FIXINT;

                            jQuery.css(cur, {
                                padding: HIDEPAD + "px", width: HIDEWDH + "px",
                                height: HIDEHEI + "px", margin: HIDEMRG + "px", 
                                opacity: HIDEOPC, overflow: "hidden"
                            } );
                        } 

                        // sencond plugins is ready now ? start sencond animation for show 
                        // here process show cur display with smoothness animations counter
                        // through counter is number tree inc++ or dec--; types of counter
                    } else if (dir === "show" && CSSMatched === "none" && speed) {
                        
                        if ( Number(SHOWOPC.toFixed( 2 )) >= 1 ) {
                            cur.style = CSSBackup; // set all prev css backup
                            cur.style.display = prevDisBackup[ _i ] || "";
                            callback.call(cur, cur, _i); // callback call now
                            clear( Intervals ); // stop || clear intervals int

                        } else {

                            // HIDECSSPROPERTY increament++; css property set counters only
                            // deal numbers but here simple check condition && auto set
                            // integer number value 0 in All Hide css property last val = 0;

                            SHOWMRG = ( SHOWMRG < CSSMRG ) ? SHOWMRG + ( CSSMRG / 100.11 ) :
                                ( CSSMRG < 0 ) ? SHOWMRG + ( CSSMRG / 100.11 ) : FIXINT;

                            SHOWPAD = ( SHOWPAD < CSSPAD ) ? SHOWPAD + ( CSSPAD / 100.11 ) :
                                ( CSSPAD < 0 ) ? SHOWPAD + ( CSSPAD / 100.11 ) : FIXINT;

                            SHOWWDH = ( SHOWWDH < CSSWDH ) ? SHOWWDH + ( CSSWDH / 100.11 ) :
                                ( CSSWDH < 0 ) ? SHOWWDH + ( CSSWDH / 100.11 ) : FIXINT;

                            SHOWHEI = ( SHOWHEI < CSSHEI ) ? SHOWHEI + ( CSSHEI / 100.11 ) :
                                ( CSSHEI < 0 ) ? SHOWHEI + ( CSSHEI / 100.11 ) : FIXINT;

                            SHOWOPC = ( SHOWOPC < CSSOPC ) ? SHOWOPC + ( CSSOPC / 100.11 ) :
                                ( CSSOPC < 0 ) ? SHOWOPC + ( CSSOPC / 100.11 ) : FIXINT;

                            jQuery.css(cur, {
                                display: prevDisBackup[ _i ] || jQuery.css(cur, "display"), 
                                margin: SHOWMRG + "px", padding: SHOWPAD + "px", width: SHOWWDH + "px",
                                height: SHOWHEI + "px", opacity: SHOWOPC, overflow: "hidden"
                            } );
                        }
                    }
                } );
            } );
        } );

        return cur; // return [default] jQuery object
    }

    /*<!================== End create Functions =================!> */


    var location = window.location;

    var nonce = { guid: Date.now() };

    var rquery = (/\?/);

    // 
    // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
    var allTypes = "*/".concat("*");
    jQuery.extend({

        htmlPrefilter: function( html ) {
            return html;
        },

        // Last-Modified header cache for next request
        lastModified: {},

        /* ajaxSettings */
        ajaxSettings: {
            url: location.href,
            type: "GET",
            isLocal: ajaxRegex.rlocalProtocol.test(location.protocol),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",

            /*
            timeout: 0,
            data: null,
            dataType: null,
            username: null,
            password: null,
            cache: null,
            throws: false,
            traditional: false,
            headers: {},
            */

            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript",
                script: "text/javascript, application/javascript, " +
                    "application/ecmascript, application/x-ecmascript"
            },

            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/,
                script: /\b(?:java|ecma)script\b/
            },

            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },

            // Data converters
            // Keys separate source (or catchall "*") and destination types with a single space
            converters: {

                // Convert anything to text
                "* text": String,

                // Text to html (true = no transformation)
                "text html": true,

                // Evaluate text as a json expression
                "text json": JSON.parse,

                // Parse text as xml
                "text xml": jQuery.parseXML,

                "text script": function (text) {
                    jQuery.globalEval(text);
                    return text;
                }
            },

            // For options that shouldn't be deep extended:
            // you can add your own custom options here if
            // and when you create one that shouldn't be
            // deep extended (see ajaxExtend)
            flatOptions: {
                url: true,
                context: true
            }
        },

        /* ajaxPrefilter [jQuery.ajax({ })] */
        ajaxPrefilter: function( target ) {
            target = !target ? jQuery.ajaxSettings.xhr : target;
            var ajaxObj = {
                readyState: target.readyState,
                abort: target.onabort,
                done: target.DONE,
                getAllResponseHeaders: target.getAllResponseHeaders,
                getResponseHeader: target.getResponseHeader,
                overrideMimeType: target.overrideMimeType,
                progress: function() {},
                setRequestHeader: target.setRequestHeader,
                status: target.status,
                timeout: target.timeout

            };
            return ajaxObj;
        },

        ajaxExtend: function (target, src) {
            var key, deep,
                flatOptions = jQuery.ajaxSettings.flatOptions || {};

            for (key in src) {
                if (src[key] !== undefined) {
                    (flatOptions[ key ] ? target : (deep || (deep = {})))[ key ] = src[ key ];
                }
            }
            if ( deep ) {
                jQuery.extend(true, target, deep);
            }

            return target;
        },

        /* ajaxSetup */
        ajaxSetup: function (target, settings) {
            var ajaxExtend = jQuery.ajaxExtend;
            return settings ?

                // Building a settings object
                ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :

                // Extending ajaxSettings
                ajaxExtend(jQuery.ajaxSettings, target);
        },

        // settings for XHR setRequestHeaders jquery.Ajax plugins
        // setRequest Headers use another another place && moment
        setRequestHeaders: function (target, dataType, data) {
            var s = target || {},
                Regex = new RegExp("(\\s*)\\/(\\s*)"),
                S = dataType,
                header = jQuery.isTypeOf(target) === "promise" ? {} : "setRequestHeader";

            if (s.constructor.name === "XMLHttpRequest") {

                s.setRequestHeader("Access-Control-Allow-Credentials", "true");
                s.setRequestHeader("Cache-Control", "no-cache");
                s.setRequestHeader("Paragma", "no-cache");
                s.setRequestHeader("Access-Control-Allow-Origin", "*");
                s.setRequestHeader("Access-Control-Allow-Methods", "POST");
                s.setRequestHeader("Access-Control-Headers", "Content-type");
            }

            var request = (req, contentTypes) => {
                contentTypes = (contentTypes || "").trim();

                if (s.constructor.name === "Promise") {
                    if (Regex.test(contentTypes) === true) {
                        return {
                            "Content-type": contentTypes + "; " + "charset=UTF-8"
                        }
                    } else if (contentTypes) {
                        return {
                            "Content-type": "application/" + contentTypes + "; " + "charset=UTF-8"
                        }
                    } else {
                        return {};
                    }

                } else if (s.constructor.name === "XMLHttpRequest") {

                    if (Regex.test(contentTypes)) {
                        s[ req ]("Content-type", contentTypes + "; " + "charset=UTF-8");

                    } else if (contentTypes) {
                        s[ header ]("Content-type", "application/" + contentTypes + "; " + "charset=UTF-8");

                    } else if (!contentTypes) {
                        s[ req ](null, null);
                    }
                }
            };

            if (S === "json") {
                return request("setRequestHeader", "json");
            } else if (S === "html" && !data) {
                return request("setRequestHeader", "text/html");
            } else if (S === "html" && jQuery.isTypeOf(data) !== "formdata") {
                return request("setRequestHeader", "x-www-form-urlencoded");
            } else if (S === "html" && jQuery.isTypeOf(data) === "formdata") {
                return request("setRequestHeader", null);
            } else if (S === "text") {
                return request("setRequestHeader", "text/plain");
            } else if (S === "script") {
                return request("setRequestHeader", "javascript");
            } else if (S === "document") {
                return request("setRequestHeader", "xml");
            } else {
                return request("setRequestHeader", S);
            }
        },

        ajaxDataType: async function( url, extra, assign ) {
            var ultraExtract = {},
                singleResponse, extract = {}, rComma = /;.*$/;

            await fetch( url ).then((access) => {
                return extract = access.headers.get("Content-type");
            } );

            var XH =  new XMLHttpRequest();
            XH.open("GET", url, true);
            XH.onload = function() {

                ultraExtract = XH.getResponseHeader("Content-Type");
                // shift arguments from ajaxDataType
                if (typeof extra === "function") {
                    ultraExtract = ultraExtract.replace(rComma, "");
                    ultraExtract = ultraExtract.split("/")[ 1 ];
                    extra.call(extract, extract, ultraExtract);
                }
            };
            XH.send();

            if ( Array.isArray( extra ) ) {
                assign = assign || extra;
                extra = undefined;
            }

            if ( Array.isArray( assign ) ) {
                return extract;
            }

            if ( extract == null ) return;

            singleResponse = await extract.split(" ")[ 0 ];
            singleResponse = await singleResponse.replace(/;/g, "");
            singleResponse = await singleResponse.split("/");

            if ( typeof extra === "boolean" && extra ) {

                singleResponse[ 1 ] = singleResponse[ 1 ] === "plain" ? 
                singleResponse[ 1 ] = "text" : singleResponse[ 1 ] === "xml" ? 
                singleResponse[ 1 ] = "document" : singleResponse[ 1 ];
                
            } else {
                singleResponse[ 1 ] = singleResponse[ 1 ] === "plain" ? 
                singleResponse[ 1 ] = "text" : singleResponse[ 1 ] === "javascript" ?
                singleResponse[ 1 ] = "script" : singleResponse[ 1 ];
            }

            return typeof extra === "boolean" && extra ? 
                await singleResponse[ 1 ] : await singleResponse[ 1 ];
        },

        ajaxRequest: function( url, types, callback ) {
            var request = {}, rSemiColon = /;.*$/,
                XHR = jQuery.ajaxSettings.xhr(), done;

            // shift arguments for request function
            if (typeof types === "function") {
                callback = callback || types;
                types = undefined;
            }

            // set dataTypes in variable [default];
            types = !types ? "Content-Type" : types;
            callback = callback || jQuery.noop;

            // run fake XMLHttpRequest() [Object XMLHttpRequest];
            XHR.open("GET", url, true);
            XHR.onload = function() {
                if (XHR.DONE === 4) {

                    request = XHR.getResponseHeader( types );
                    done = request.replace(rSemiColon, "");
                    done = done.split("/")[ 1 ];

                    // call callback function with 3 args
                    callback.call(request, request, done);
                }
            };
            XHR.send(); // send XMLHttpRequest for request?
        },

        // send data from 
        sendAjax: function( data, dataType ) {
            if ( !data || typeof dataType != "string") {
                return null;
            }

            var ajaxData = data, ajaxType = dataType.trim(),
                ajaxType = ajaxType.toLowerCase(), parsed;

            if (ajaxType === "json" || ajaxType === "text") {
                return JSON.stringify( ajaxData );
            }
            if (ajaxType === "html" && jQuery.isTypeOf(ajaxData) === "formdata") {
                return ajaxData;
            }
            if (ajaxType === "html" && jQuery.isTypeOf(ajaxData) !== "formdata") {
                if ( jQuery.isObject( ajaxData ) ) {

                    ajaxData = JSON.stringify( ajaxData );
                    parsed = ajaxData.replace(/['\{\}"]/g, "");
                    parsed = parsed.replace(/[:]/g, "=");
                    parsed = parsed.replace(/[,]/g, "&");
                    return window.encodeURI( parsed );

                } else if ( typeof ajaxData === "string" ) {
                    return jQuery.extraTrim( ajaxData );

                } else {
                    // return html dataType data [default] only ?
                    return ajaxData; // else return all types data
                }
            }

            // Handle XML dataType sending XMLData
            if (ajaxType === "xml") {
                return jQuery.parseXML( ajaxData );
            }

            // Handle javasctipt dataType sending script data
            if ( ajaxType === "script" || ajaxType === "javascript") {

                parsed = new jQuery.ajaxSetup();
                return typeof ajaxData !== "function" && typeof ajaxData !== "object" ?
                parsed.converters["text script"]( ajaxData ) : JSON.stringify( ajaxData );
            }
        }
    } );


    jQuery.ajaxSettings.xhr = function() {
        try {
            return new window.XMLHttpRequest();
        } catch ( e ) { };
    }

    var xhrSuccessStatus = {

        // File protocol always yields status code 0, assume 200
        0: 200,

        // Support: IE <=9 only
        // #1450: sometimes IE returns 1223 when it should be 204
        1223: 204
    },
        xhrSupported = jQuery.ajaxSettings.xhr();

    var 
        r20 = /%20/g,
        rhash = /#.*$/,
        rproto = /^(https:\/\/||http:\/\/)+/,
        // Anchor tag for parsing the document origin
        rnothtmlwhite = (/[^\x20\t\r\n\f]+/g),
        rantiCache = /([?&])_=[^&]*/,
        originAnchor = document.createElement("a");

    originAnchor.href = window.location.href;

    
    jQuery.extend({

        ajax: function (url, options) {
            
            // If url is an object, simulate pre-1.5 signature
            if (typeof url === "object") {
                options = url;
                url = undefined;
            }

            // Force options to be an object
            options = options || {};

            var transport,

            // URL without anti-cache param
            cacheURL,

            // Response headers
            responseHeadersString,
            responseHeaders,

            // timeout handle
            timeoutTimer,

            // Url cleanup var
            urlAnchor,

            // Request state (becomes false upon send and true upon completion)
            completed,

            // Loop variable
            i,

            // uncached part of the url
            uncached,

            // Create the final options object
            s = jQuery.ajaxSetup({}, options),

            // Callbacks context
            callbackContext = s.context || s,

            // fail || error setuation call
            errorCallback,

            // Status-dependent callbacks
            statusCode = s.statusCode || {},

            // give the access data of s in options
            options = s,

            // fake xhr 
            jqXHR = {};

            // Add protocol if not provided (prefilters might expect it)
            // Handle falsy url in the settings object (#10093: consistency with old signature)
            // We also use the url parameter if available
            s.url = (url || s.url || location.href + "")
                .replace(ajaxRegex.rprotocol, location.protocol + "//");

            // Alias method option to type as per ticket #12004
            s.type = options.type || options.method || s.method || s.type;

            s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];

            // A cross-domain request is in order when the origin doesn't match the current origin.
            if (s.crossDomain == null) {
                urlAnchor = document.createElement("a");

                // Support: IE <=8 - 11, Edge 12 - 15
                // IE throws exception on accessing the href property if url is malformed,
                // e.g. http://example.com:80x/
                try {
                    urlAnchor.href = s.url;

                    // Support: IE <=8 - 11 only
                    // Anchor's host property isn't correctly set when s.url is relative
                    urlAnchor.href = urlAnchor.href;
                    s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
                        urlAnchor.protocol + "//" + urlAnchor.host;
                } catch (e) {

                    // If there is an error parsing the URL, assume it is crossDomain,
                    // it can be rejected by the transport if it is invalid
                    s.crossDomain = true;
                }
            }

            // Convert data if not already a string
            if (s.data && s.processData && typeof s.data !== "string") {
                if (typeof s.data === "object") {
                    s.data = jQuery.sendAjax( s.data, "html");
                }
            }
            
            // Uppercase the type
            s.type = s.type.toUpperCase();

            // Determine if request has content
            s.hasContent = !ajaxRegex.rnoContent.test(s.type);

            // Save the URL in case we're toying with the If-Modified-Since
            // and/or If-None-Match header later on
            // Remove hash to simplify url manipulation
            cacheURL = s.url.replace(rhash, "");

            // More options handling for requests with no content
            if (!s.hasContent) {

                // Remember the hash so we can put it back
                uncached = s.url.slice(cacheURL.length);

                // If data is available and should be processed, append data to url
                if (s.data && (s.processData || typeof s.data === "string")) {
                    cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;

                    // #9682: remove data so that it's not used in an eventual retry
                    delete s.data;
                }

                // Add or update anti-cache param if needed
                if (s.cache === false ) {
                    cacheURL = cacheURL.replace(rantiCache, "$1");
                    uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + (nonce.guid++) +
                        uncached;
                }

                // Put hash and anti-cache on the URL that will be requested (gh-1732)
                s.url = cacheURL + uncached;

                // Change '%20' to '+' if this is encoded form body content (gh-2658)
            } else if (s.data && s.processData &&
                (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
                s.data = s.data.replace(r20, "+");
            }


            jQuery.ajaxRequest(s.url, function( ct ) {
                var ct = ct, type, finalDataType,
                    contents = s.contents,
                    dataTypes = s.dataTypes;

                // Remove auto dataType and get content-type in the process
                if (dataTypes[ 0 ] === "*") {
                    dataTypes.shift();

                    // Check if we're dealing with a known content-type
                    if ( ct ) {
                        for (type in contents) {
                            if (contents[ type ] && contents[ type ].test( ct )) {
                                dataTypes.unshift( type );
                                break;
                            }
                        }
                    }
                    
                    finalDataType = "text";

                    // unshift second first value ['text', 'html']
                    if (finalDataType) {
                        if (finalDataType !== dataTypes[ 0 ]) {
                            dataTypes.unshift( finalDataType );
                        }
                    }
                }
            } );

            if ( s.dataTypes[ 0 ] !== "*" && s.dataTypes[ 0 ] !== "text") {
                s.dataTypes.unshift("text");
            }
            
            jQuery.ajaxRequest( s.url, function( _i, cross ) {

                var i, context,
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

                // context is a errorObject use context in if 
                // detect an erros || failed code resources
                // so autometically call errorCallback context
                context = jQuery.ajaxPrefilter( xhr );

                xhr.progress = context.onprogress;

                // filter ajax XMLHttpRequest responstType => url through && s.res
                cross = options.dataType || cross;
                cross = cross === "xml" ? "document" : cross === "html" ? "text" :
                    cross === "script" ? "text" : cross;

                xhr.responseType = cross;

                errorCallback = xhr.onerror = xhr.ontimeout;

                if ( xhr.onabort !== undefined ) {
                    xhr.onabort = errorCallback;
                }
                
                /* ajaxSuccess 
                 * 1 ) main step ajax success || xhr onloaded here && after get ?
                 * response && call success function && error function ajax in
                 * identify multiple conditons && follow xhr API Object identify
                 * now three steps follow as respected condition one by one test
                 * 1 ) xhr status code check now if xhr status code minimum 200
                 * && maximum 299 || 1223 so xhr success else xhr throw a errors
                 * 2 ) xhr Done code if xhr Done code 4 so success else xhr error
                 * 3 ) xhr readyState = 4 xhr success now else != 4 xhr go error
                */
                xhr.onload = function () {

                    // if no content
                    if (xhr.status === 204) {
                        context.statusText = "nocontent";

                    } else if (xhr.status === 304) {
                        context.statusText = "notmodified";

                        // if not modified
                    } else if (!xhr.statusText) {
                        context.statusText = "Error";

                    } else if (xhr.status < 0) {
                        xhr.status = 0;

                    } else {
                        context.statusText = xhr.statusText;
                    }

                    context.timeout = xhr.timeout;
                    context.responseJSON = jQuery.isObject(xhr.response) ?
                        xhr.response : undefined;
                    context.abort = xhr.abort;
                    context.status = xhr.status;
                    context.readyState = xhr.readyState;
                    context.statusCode = s.statusCode || jQuery.noop;


                    if (xhr.readyState === 4 && ( xhr.status === xhrSuccessStatus[ 0 ] || ( xhr.status >= 200 && xhr.status <= 299  ) ||
                        xhr.status === xhrSuccessStatus[ 1223 ] ) && xhr.DONE === 4) {
                        
                        options.success.call(callbackContext, xhr.response, "success");
                        ( options.complete || function() { } ).call(callbackContext);

                    } else {

                        /* XMLParserError
                         * 1 ) if mini to mini error detections && check all micro
                         * errors all types error so again call options.error.call
                         * functions but Here not be code stop error method will ?
                         * call && after all code executed successfully runing now
                        */
                        options.error.call(context, context, context.statusText);
                    }
                };

                /* XMLError
                 * 1 ) if hard error detect in url && not responded && 404 detection 
                 * Xhr status code so run xhr.oerror function automatic call now && 
                 * after Here all code runing time && run immedieatlly stop all code
                */
                xhr.onerror = function () {
                    options.error.call(context, context, "Error");
                };

                /* AjaxSetRequestHeader
                 * 1 ) if Ajax dataType json so setRequestHeader application/json give the
                 * information so i'am a json data Type in server indentify all dataTypes
                 * 2 ) if Ajax dataType xml so setRequestHeader application/xml give the ?
                 * information all Types all setuations Here work only form scrope targets
                 * [set && get] setuations here facility string to from app../x-www-form..
                */
                jQuery.setRequestHeaders(xhr, ( options.dataTypes[ 1 ] || "text" ), options.data );
                
                try {

                    // Do send the request (this may raise an exception)
                    xhr.send(options.data && options.hasContent || null);
                } catch (e) {

                    // #14683: Only rethrow if this hasn't been notified as an error yet
                    jQuery.throw("ajaxError:", "Failed execute ajaxError. Please check code.");
                }
            } );

            // fake XHR Object define && set now
        },

        getJSON: function (url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },

        getScript: function (url, callback) {
            callback = typeof callback === "function" ? callback : function () { };
            return jQuery.get(url, undefined, callback, "script");
        },

        getXML: function ( url, data, callback ) {
            return jQuery.get(url, data, callback, "xml");
        }
    } );

    
    var oldCallbacks = [];

    // Default jsonp settings
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce.guid++));
            this[callback] = true;
            return callback;
        }
    } );


    jQuery.each(["get", "post"], function( _i, method ) {
        jQuery[ method ] = function(url, data, callback, type) {

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
                dataType: type,
                data: data,
                success: callback
            } );
        };
    } );

    /* Ajax End coding scripting [Ajax code, programming stoped] */




    /* Voice && speak plugins build now
    */
    var synthesis = window.speechSynthesis;

    jQuery.extend({

        speakSettings: {
            pitch: 1,
            rate: 1,
            loop: 1,
            volume: 100,
            lang: "en-US",
            speechSynthesis: {},
            getVoices: function( callback ) {
                var voice = [];
                window.speechSynthesis.onvoiceschanged = function() {
                    voice = window.speechSynthesis.getVoices();
                    callback.call( voice, voice );
                }
            }
        },

        speakExtend: function (target, src) {
            var key, deep,
                flatOptions = jQuery.speakSettings || {};

            for (key in src) {
                if (src[key] !== undefined) {
                    (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
                }
            }
            if ( deep ) {
                jQuery.extend(true, target, deep);
            }

            return target;
        },

        speakSetup: function (target, settings) {
            var speakExtend = jQuery.speakExtend;
            return settings ?
        
                // Building a settings object
                speakExtend(speakExtend(target, jQuery.speakSettings), settings) :

                // Extending speakSettings
                speakExtend(jQuery.speakSettings, target);
        }
    } );


    jQuery.each(["pause", "getVoices", "resume", "speak", "cancel"], 
        function ( _i, method ) {
            jQuery.speakSettings.speechSynthesis[ method ] = function () {
                return synthesis[ method ]( ...jQuery.access( arguments ) );
            };
        }
    );

    jQuery.each(["paused", "pending", "speaking", "onvoiceschanged"],
        function( _i, method ) {
            jQuery.speakSettings.speechSynthesis[ method ] = synthesis[ method ];
        }
    );

    jQuery.speakSettings.speechUtterance = function ( msg ) {
        try {
            return new window.SpeechSynthesisUtterance( msg );
        } catch ( e ) { };
    };


    jQuery.extend({

        speak: function (msg, options) {
            
            // shift arguments for Object
            if (typeof msg === "object") {
                options = msg;
                msg = undefined;
            }

            // Force options to be an object
            options = options || {};

            var 
                // Initialize new SpeechSynthesisUtterance object
                S,

                // loop stater key
                i,

                voices = [],

                // speaking SynthesisUtterance
                synthesis,

                // store all voices in storeVoice[]
                storeVoice = [],

                // give the access in s of options
                s = jQuery.speakSetup({}, options),

                options = s;

            // convertation string to number when need ?
            if ( s.repeat || s.loop ) {
                if (( !isNaN( s.repeat ) || jQuery.isString( s.repeat ) ) && s.repeat) {
                    s.repeat = parseInt( s.repeat );
                }
                if (( !isNaN( s.loop ) || jQuery.isString( s.loop ) ) && 
                    s.loop && typeof s.loop !== "boolean") {

                    s.loop = parseInt( s.loop );
                }
            }

            if ( s.duration || s.delay ) {
                if (( !isNaN( s.duration ) || jQuery.isString( s.duration ) ) && s.duration) {
                    s.duration = parseInt( s.duration );
                }
                if (( !isNaN( s.delay ) || jQuery.isString( s.delay ) ) && s.delay) {
                    s.delay = parseInt( s.delay );
                }
            }

            s.pitch && ( !isNaN( s.pitch ) || jQuery.isString( s.pitch ) ) ? 
                s.pitch = parseFloat( s.pitch ) : null;
            s.rate && ( !isNaN( s.rate ) || jQuery.isString( s.rate ) ) ? 
                s.rate = parseFloat( s.rate ) : null;
            s.volume && ( !isNaN( s.volume ) || jQuery.isString( s.volume ) ) ? 
                s.volume = parseFloat( s.volume ) : null;

            // delete unusable && set [default] object variable in s || options
            !s.repeat && isNaN( s.repeat ) ? delete s.repeat : null;
            !s.loop && isNaN( s.loop ) ? s.loop = 1 : null;

            !s.delay && isNaN( s.delay ) ? delete s.delay : null;
            !s.duration && isNaN( s.duration ) ? delete s.duration : null;

            !s.pitch && isNaN( s.pitch ) ? s.pitch = 1 : null;
            !s.rate && isNaN( s.rate ) ? s.rate = 1 : null;
            !s.volume && isNaN( s.volume ) ? s.volume = 100 : null;

            // merge + add same workable Objects
            if ( ( s.text || s.Text ) && s.message ) {
                s.message = s.message.concat(" " + ( s.text || s.Text ));

                delete s.text; delete s.Text; // delete prevObject
            }
            if ( s.repeat && s.loop ) {
                s.loop = s.loop + s.repeat;

                delete s.repeat; // delete prevObject
            }

            if ( s.duration && s.delay ) {
                s.duration = s.duration + s.delay;

                delete s.delay; // delete prevObject
            }

            // control pitch && volume && rate control
            s.pitch >= 2 ? s.pitch = 1 : s.pitch = s.pitch;
            s.rate >= 2 ? s.rate = 1 : s.rate = s.rate;
            s.volume >= 2 ? s.volume = 1 : s.volume = s.volume;

            // Initialize new SpeechSynthesisUtterance object
            S = new SpeechSynthesisUtterance();

            // Set Speech Language
            S.lang = s.lang;
            
            window.speechSynthesis.onvoiceschanged = function () {
                // Get List of Voices
                synthesis = window.speechSynthesis.getVoices();
                voices = synthesis;

                // Initially set the First Voice in the Array.
                S.voice = voices[ 0 ];

                // only enternal use S.unique Voice in the Array
                S.unique = voices;

                // Set the Voice Select List. (Set the Index as the value, which we'll 
                // use later when the user updates the Voice using the Select Menu.)
                s.voice = S.voice;

                // call getVoices name of the function getll All voices
                if (s.getVoices && typeof s.getVoices === "function") {
                    jQuery.each( voices, function ( _i, v ) {
                        s.getVoices.call( v, v.name, voices);
                    } );
                }
            };
            
            // Set rate property of the SpeechSynthesisUtterance instance
            S.rate = s.rate;

            // Set pitch property of the SpeechSynthesisUtterance instance
            S.pitch = s.pitch;

            // Set volume property of the SpeechSynthesisUtterance instance
            S.volume = s.volume;

            // Set voice property of the SpeechSyntheisUtterance instance
            S.voice = s.voice;

            // Set the text property with the value of the textarea
            S.text = ( s.message || msg || "" );

            S.onerror = ( s.error || jQuery.noop ); // callback call onerror
            S.onstart = ( s.start || jQuery.noop ); // callback call onstart
            S.onend = ( s.end || jQuery.noop ); // callback call onend
            S.onboundary = ( s.boundary || jQuery.noop ); // callback call onboundary
            S.onmark = ( s.mark || jQuery.noop ); // callback call onmark
            S.onpause = ( s.pause || jQuery.noop ); // callback call onpause
            S.onresume = ( s.resume || jQuery.noop ); // callback call onresume

            // Start Speaking
            synthesis = window.speechSynthesis;
            !s.loop ? window.speechSynthesis.speak( S ) : null;

            // Start loop speaking repeated speaking
            if ( typeof s.loop !== "boolean" && s.loop ) {
                for ( i = 0; i < s.loop; i++ ) {

                    // speaking for a limited time utterance
                    synthesis.speak( S || null )
                }
            }

            // Start loop ( Infinity ) time none stop voice
            if ( typeof s.loop === "boolean" && s.loop ) {
                for ( i = 0; i < 100; i++ ) {

                    // speaking for ( Infinity ) time utterance
                    synthesis.speak( S || null );
                }
            }

            s.resume && typeof s.resume === "boolean" ? synthesis.resume() : null;
            s.pause && typeof s.pause === "boolean" ? synthesis.pause() : null;
            s.cancel && typeof s.cancel === "boolean" ? synthesis.cancel() : null;

            // override && recover voiced position && settings
            !s.pause && synthesis.paused === true ? synthesis.resume() : null;

            // update options SpeechSythsisUtterance instance Object vlaue
            s.volume = S.volume; // update volume property of value
            s.rate = S.rate; // update rate property of value maximum 1
            s.pitch = S.pitch; // update pitch property of value maximum 1
            
            return s; // return main voice utterance objects
        }
    } );


    function returnTrue () {
        return true;
    }

    function returnFalse () {
        return false;
    }

    // Support: IE <=9 - 11+
    // focus() and blur() are asynchronous, except when they are no-op.
    // So expect focus to be synchronous when the element is already active,
    // and blur to be synchronous when the element is not already active.
    // (focus and blur are always synchronous in other supported browsers,
    // this just defines when we can count on it).
    function expectSync(elem, type) {
        return (elem === safeActiveElement()) === (type === "focus");
    }

    // Support: IE <=9 only
    // Accessing document.activeElement can throw unexpectedly
    // https://bugs.jquery.com/ticket/13393
    function safeActiveElement () {
        try {
            return document.activeElement;
        } catch ( e ) { };
    }

    jQuery.event = {
        addProp: function (name, hook) {
            Object.defineProperty(jQuery.Event.prototype, name, {
                enumerable: true,
                configurable: true,

                get: isFunction(hook) ?
                    function () {
                        if (this.originalEvent) {
                            return hook(this.originalEvent);
                        }
                    } :
                    function () {
                        if (this.originalEvent) {
                            return this.originalEvent[name];
                        }
                    },

                set: function (value) {
                    Object.defineProperty(this, name, {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: value
                    });
                }
            });
        },

        trigger: function (elem, types, data) {

        }
    };

    jQuery.removeEvent = function (elem, type, handle) {

        // This "if" is needed for plain objects
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handle);
        }
    };

    jQuery.Event = function (src, props) {

        // Allow instantiation without the 'new' keyword
        if (!(this instanceof jQuery.Event)) {
            return new jQuery.Event(src, props);
        }

        // Event Object
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;

            // Events bubbling up the document may have been marked as prevented
            // by a handler lower down the tree; reflect the correct value.
            this.isDefaultPrevented = src.defaultPrevented || 
                src.defaultPrevented === undefined && 

                // Support: Android <=2.3 only
                src.returnValue === false ?
                returnTrue :
                returnFalse;

            // Create target properties
            // Support: Safari <=6 - 7 only
            // Target should not be a text node (#504, #13143)
            this.target = (src.target && src.target.nodeType === 3) ?
                src.target.parentNode : 
                src.target;

            this.currentTarget = src.currentTarget;
            this.data = undefined;
            this.relatedTarget = src.relatedTarget;

            // Event type
        } else {
            this.type = src;
        }

        // Put explicitly provided properties onto the event object
        if (props) {
            jQuery.extend(this, props);
        }

        // Create a timestamp if incoming event doesn't have one
        this.timeStamp = src && src.timeStamp || Date.now();

        // Mark it as fixed
        this[jQuery.expando] = true;
    };

    // // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
    // // https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
    jQuery.Event.prototype = {
        constructor: jQuery.Event,
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        isSimulated: false,

        preventDefault: function () {
            var e = this.originalEvent;

            this.isDefaultPrevented = returnTrue;

            if (e && !this.isSimulated) {
                e.preventDefault();
            }
        },
        stopPropagation: function () {
            var e = this.originalEvent;

            this.isPropagationStopped = returnTrue;

            if (e && !this.isSimulated) {
                e.stopPropagation();
            }
        },
        stopImmediatePropagation: function () {
            var e = this.orignalEvent;

            this.isImmediatePropagationStopped = returnTrue;

            if (e && e.isSimulated) {
                e.stopImmediatePropagation();
            }

            this.stopPropagation();
        }
    };

    // Includes all common event props including KeyEvent and MouseEvent specific props
    jQuery.each({
        altKey: true,
        bubbles: true,
        cancelable: true,
        changedTouches: true,
        ctrlKey: true,
        detail: true,
        eventPhase: true,
        metaKey: true,
        pageX: true,
        pageY: true,
        shiftKey: true,
        view: true,
        "char": true,
        code: true,
        charCode: true,
        key: true,
        keyCode: true,
        button: true,
        buttons: true,
        clientX: true,
        clientY: true,
        offsetX: true,
        offsetY: true,
        pointerId: true,
        pointerType: true,
        screenX: true,
        screenY: true,
        targetTouches: true,
        toElement: true,
        touches: true,
        which: true
    }, jQuery.event.addProp);


    function on (elem, types, selector, data, fn, one) {
        var origFn, type, target, Events, delegateTargeted;

        // Types can be a map of types/handlers
        if (typeof types === "object") {

            // ( types-Object, selector, data )
            if (typeof selector !== "string") {
                data = data || selector;
                selector = undefined;
            }

            for (type in types) {
                jQuery.each(elem, function ( _i, cur ) {
                    if (cur.nodeType && cur) {
                        if ( selector && jQuery( cur ).has( selector || null )) {
                            target = cur.querySelectorAll( selector );
                            // delegateTargeted prev selector parentNode
                            delegateTargeted = cur;

                        } else {
                            // convert Array format [Object]
                            target = jQuery.makeArray( cur );
                        }
                        
                    } else if ( !selector ) {
                        // convert Array format [Object]
                        target = jQuery.makeArray( cur );
                    }
                    
                    jQuery.each(target || {}, function ( _i, cur ) {
                        cur.addEventListener(type, function jqhandler(jqevent) {
                            delegateTargeted = !selector ? cur : delegateTargeted;
                            Events = jQuery.Event(jqevent, {
                                data: data,
                                delegateTargeted: delegateTargeted
                            } );

                            // Handle only one time fire event of cur HTMLElements with
                            // event types if one in exist value in number format && if
                            // set one value 1 so work event only one time again remove
                            // event with handler && stop event for help stopPropagation
                            // method && set extra event stopImmediatePropagation method
                            if (one === 1 && one) {
                                cur.addEventListener(jqevent.type, function (jqevent) {
                                    jqevent.stopImmediatePropagation();
                                    jqevent.stopPropagation();
                                }, true);
                                // removing Events with cur HTMLElements Handler
                                origFn = jqhandler; // already set event Handler
                                jQuery.removeEvent(cur, jqevent.type, origFn);
                            }
                            
                            // call fn callback function fn cur HTMLElement added event
                            ( types[type] || function () { } ).call(cur, Events);
                        } );
                    } );
                } );
            }
            return elem;
        }

        if (fn == null && data == null) {

            // ( types, fn )
            fn = selector;
            data = selector = undefined;
        } else if (fn == null) {
            if (typeof selector === "string") {

                // ( types, selector, fn )
                fn = data;
                data = undefined;
            } else {

                // ( types, data, fn )
                fn = data;
                data = selector;
                selector = undefined;
            }
        }
        
        types = jQuery.extraTrim(types).split(" "); // splited types on where space
        // create plain or empty Object #object{} => empty object
        var eventSetup = {};
    
        // attach event type && fn in {};
        for (type of types) {
            eventSetup[type] = fn;
        }
        
        for (type in eventSetup) {
            jQuery.each(elem, function ( _i, cur ) {
                if (cur.nodeType && cur) {
                    if ( selector && jQuery( cur ).has( selector || null )) {
                        target = cur.querySelectorAll( selector );
                        // delegateTargeted prev selector parentNode
                        delegateTargeted = cur;

                    } else {
                        // convert Array format [Object]
                        target = jQuery.makeArray( cur );
                    }
                    
                } else if ( !selector ) {
                    // convert Array format [Object]
                    target = jQuery.makeArray( cur );
                }
            
                jQuery.each(target || {}, function ( _i, cur ) {
                    cur.addEventListener(type, function jqhandler(jqevent) {
                        delegateTargeted = !selector ? cur : delegateTargeted;
                        Events = jQuery.Event(jqevent, {
                            data: data,
                            delegateTargeted: delegateTargeted
                        } );

                        // Handle only one time fire event of cur HTMLElements with
                        // event types if one in exist value in number format && if
                        // set one value 1 so work event only one time again remove
                        // event with handler && stop event for help stopPropagation
                        // method && set extra event stopImmediatePropagation method
                        if (one === 1 && one) {
                            cur.addEventListener(jqevent.type, function (jqevent) {
                                jqevent.stopImmediatePropagation(); // stop events
                                jqevent.stopPropagation(); // stop midd events
                            }, true);
                            // removing Events with cur HTMLElements Handler
                            origFn = jqhandler; // already set event Handler
                            jQuery.removeEvent(cur, jqevent.type, origFn);
                        }
                        
                        // call fn callback function fn cur HTMLElement added event
                        ( eventSetup[type] || function () { } ).call(cur, Events);
                    } );
                } );
            } );
        }
        return elem;
    }


    function off (elem, types, selector, fn) {
        var origFn, type, target, 
            Events, delegateTargeted;

        if (typeof types === "object") {

        } 
        
        if (typeof types === "string") {
            // now extraTrim whiteSpace
            types = jQuery.extraTrim( types );
            // now split types when Space
            types = types.split(" ");

            // let plain or empty Object #object{} => empty object
            var eventSetup = {};

            // Force function to be an fake function
            origFn = fn || function () { };

            // attach event type && fn in {};
            for (type of types) {
                eventSetup[type] = origFn;
            }
            console.log(eventSetup);
        }
    }


    /* Initialize new HTMLObjects && extend || attach in [window]
     * new HTMLObject plugins not be attach || not be related for
     * jQuery any plugins && jQuery of part or plugins HTMLObject
     * attach direct [window] Object uses for new Form() examples
     * this plugins typeof API types Here provided All HTMLElement
     * shortHand Objects in very very short format way ? thank you
    */
    jQuery.extend( window, {

        // Initialize new HTMLFormElement
        Form: function ( action, method, enctype, append ) {
            // Force arguments from Form methods
            append = append || {},
            action = action || "",
            method = method || {},
            enctype = enctype || "";

            // shift arguments for new Form{} HTMLObject
            if (typeof method === "object") {
                append = append || method;
                method = "";
                enctype = "";
            }

            if (typeof enctype === "object") {
                append = append || enctype;
                enctype = "";
            }

            action = typeof action === "object" ? "" : action;
            method = typeof method === "object" ? "" : method;
            enctype = typeof enctype === "object" ? "" : enctype;

            var formElement, appender, throwError, clone,
                rmethod = /^(HEAD|GET|PUT|DELETE|POST)$/i;

            formElement = document.createElement("form");

            if (typeof append === "string") {
                appender = jQuery.parseHTML( append );
            }
            if (jQuery.isHTMLDoc( append )) {
                appender = append.nodeType ? [ append ] : append;
            }

            // append child || nodes only HTMLElements not XMLDoc
            jQuery.each( appender || {}, function( _i, nodes ) {
                // clone node when appen in Form
                clone = nodes.cloneNode( true );
                formElement.append( clone );
            } );

            // Error Handling throw Error if detect mistake && Faild
            throwError = ( error, attr ) => {
                jQuery.throw("ImplemantionError:", "Failed execute '" + error + "' Not valid Form " + attr + ".");
            };

            // set attributes before identify valid attributes in formElement Object / HTMLObject
            action = typeof action !== "string" && action ? throwError( action, "action" ): action;
            method = !rmethod.test( method ) && method ? throwError( method, "method") : method;
            method = method ? method.toUpperCase() : ""; // re-check condition of formElement method
            enctype = typeof enctype !== "string" && enctype ? throwError( enctype, "enctype" ) : enctype;
            
            // set action in formElement
            // encode URI for form action
            action = window.encodeURI( action );
            formElement.action = window.encodeURI(action);

            // set method in formElement
            formElement.method = method;

            // set enctype in formElement
            formElement.enctype = enctype;

            // set [default] attribute in formElement
            formElement.acceptCharset = "UTF-8";

            // remove null set || undefined set attribute value
            if (!formElement.getAttribute("action") && formElement.hasAttribute("action")) {
                formElement.removeAttribute("action");
            }
            if (!formElement.getAttribute("method") && formElement.hasAttribute("method")) {
                formElement.removeAttribute("method");
            }
            if (!formElement.getAttribute("enctype") && formElement.hasAttribute("enctype")) {
                formElement.removeAttribute("enctype");
            }

            return formElement; // when all proccess done so retun formElement
        },

        // Initialize new HTMLButtonElement
        Button: function (name, value, defultDisabled) {
            var buttonElement, values, merge;

            // create HTMLButtonElement jQuery.parseHTML through
            buttonElement = jQuery.parseHTML("<button><button>")[ 0 ];

            if (typeof name === "string") {
                merge = jQuery.parseHTML( name );
            }
            if (jQuery.isHTMLDoc( name )) {
                merge = name.nodeType ? [ name ] : name;
            }
            
            // merge || append buttonElement content
            jQuery.each( merge || {}, function( _i, merge ) {
                // clone merge make duplicate for merge
                merge = ( merge || {} ).nodeType ? merge.cloneNode( merge ) : merge;
                buttonElement.append( merge );
            } );

            // identify now values for only string || number
            values = typeof value == "string" || typeof value == "number" ? value : null;

            // set value in buttonElement with check conditon
            !values ? null : buttonElement.value = values;
            
            // [defultDisabled] attributes set in buttonElement
            typeof defultDisabled === "boolean" && defultDisabled ?
                buttonElement.disabled = true : null;

            return buttonElement; // return HTMLButtonElement
        },

        // Initialize new HTMLStyleElement
        Style: function ( style ) {
            var styleElement, merge;

            // create HTMLStyleElement jQuery.parseHTML through
            styleElement = jQuery.parseHTML("<style></style>")[ 0 ];

            // set [default] attributes in styleElement
            styleElement.type = "text/css";
            styleElement.media = "all";

            // set styles in styleElement only string format
            merge = typeof style === "string" ? style.trim() : null;
            !merge ? null : styleElement.append(jQuery.parseHTML( merge )[0]);

            return styleElement; // return HTMLButtonElement
        },

        // Initialize new makeArray
        makeArray: function ( arr, results ) {
            return jQuery.makeArray( arr, results );
        },

        // Initialize new setArray
        setArray: function ( put ) {
            return jQuery.setArray( arguments || put );
        },

        // Initialize new HTMLProgressElement 
        // <progress value="0" max=100></progress>
        Progress: function (value, min, max) {
            var progressElement;

            // shift argument min max
            if ( !max ) {
                max = max || min;
                min = undefined;
            }

            // create HTMLProgressElement jQuery.parseHTML through
            progressElement = jQuery.parseHTML("<progress></progress>")[ 0 ];

            // convertation String to Number
            value = parseFloat( value );
            min = parseFloat( min );
            max = parseFloat( max );

            // set value in HTMLProgressElement
            !isNaN( value ) ? progressElement.value = value : null;
            !isNaN( min ) ? progressElement.setAttribute("min", min) : null;
            !isNaN( max ) ? progressElement.max = max : null;

            return progressElement; // return HTMLProgressElement
        },

        // Initialize new HTMLBodyElement <body>NodeList</body>
        Body: function ( value ) {
            var bodyElement, merge, value = value || {};

            // shift arguments of value
            if (typeof value === "string" || value.nodeType !== 9) {
                value = value || {};
            } else {
                value = undefined;
            }

            // create HTMLBodyElement on document.createElement
            bodyElement = document.createElement("body");

            if (typeof value === "string") {
                if (!value.includes("body")) {
                    merge = jQuery.parseHTML( value );
                }
            }

            if (jQuery.isHTMLDoc( value )) {
                merge = value.nodeType ? [ value ] : value;
            }

            jQuery.each( merge || {}, function( _i, merge ) {
                // clone merge make duplicate for merge
                merge = ( merge || {} ).nodeType ? merge.cloneNode( merge ) : merge;
                bodyElement.append( merge );
            } );

            return bodyElement; // return HTMLBodyElement
        },

        // Initialize new HTMLScriptElement 
        // <script src="jQuery.min.js" type"text/javascript"></script>
        Script: function (src, type) {
            var rsrc = /(\.js)$/, scriptElement, 
                rtype = /^(module|text\/javascript)$/;

            // create HTMLScriptElement of method document.createdElement
            scriptElement = document.createElement("script");

            // identify HTMLScriptElement of Script src a proper javascript src //
            src = rsrc.test( src ) ? src : 
                jQuery.throw("ScriptError:", "Failed execute invalid script src.'" + src + "'");

            // Set src in HTMLScriptElement if src is persent else not Set src in HTMLSCript
            typeof src === "string" ? scriptElement.src = window.encodeURI( src ) : null;

            // Set type with identify type only accept type/module || type/javascript
            rtype.test( type ) ? scriptElement.type = rtype.exec( type.trim() )[ 0 ] : null;
            scriptElement.charset = "utf-8"; // Set charset in HTMLScriptElement

            return scriptElement; // return HTMLScriptElement
        },

        // Initialize new HTMLSelectElement <select name="jQuery" id="select">NodeList</select>
        Select: function (name, value, id) {
            var HTMLSelectElement, merge, rid = /^#.+$/,
                id = String.prototype.trim.call( id || ""),
                name = typeof name === "string" || 
                typeof name === "number" ? name : null;

            // create HTMLSelectElement now
            HTMLSelectElement = document.createElement("select");

            // Set name in HTMLSelectElement
            name != null && name ? HTMLSelectElement.name = name : null;

            // Set id in HTMLSelectElement with identify
            rid.test( value ) ? HTMLSelectElement.id = value.slice( 1 ) : null;
            rid.test( id ) ? HTMLSelectElement.id = id.slice( 1 ) : null;

            // Set || append HTMLSelectElement values ^ before identify
            if (value.nodeType === 9 || ( value[ 0 ] || {} ).nodeType === 9 ) {
                value = undefined;
            }

            // Error Handling not work #document detect !value set
            if (typeof value === "string" && !rid.test( value )) {
                merge = jQuery.parseHTML( value );
            } 

            // identify HTMLSelectElement of value only HTMLObject
            if (jQuery.isHTMLDoc( value ) && !rid.test( value )) {
                merge = value.nodeType !== 9 && value.nodeType ? [ value ] : value;
            }

            jQuery.each( merge || {}, function ( _i, merge ) {
                // clone merge make duplicate for merge
                merge = ( merge || {} ).nodeType ? merge.cloneNode( merge ) : merge;

                merge.nodeType !== 9 && merge.nodeType !== 10 && merge.nodeType !== 11 ? 
                    HTMLSelectElement.append( merge ) : null;
            } );

            return HTMLSelectElement; // return HTMLSelectElement
        },

        // Initialize new HTMLAnchorElement <a href="http://localhost/">jQuery</a>
        Anchor: function (url, name) {
            var HTMLAnchorElement, merge = jQuery.makeArray( name ), Anchor;

            // create HTMLAnchorElement with a document
            HTMLAnchorElement = document.createElement("a");

            // shift arguments for url detect string
            url = typeof url === "object" ? "" : url || "";

            // check persent value in merge variable
            merge = !merge[ 0 ] ? [ name ] : merge;

            // encode HTMLAnchorElement url
            Anchor = window.encodeURI( url.trim() );

            // set href HTMLAnchorElement with url
            Anchor ? HTMLAnchorElement.href = Anchor : null;
            
            jQuery.each( merge || {}, function( _i, merge ) {
                // clone merge make duplicate for merge
                merge = ( merge || {} ).nodeType ? merge.cloneNode( merge ) : merge;

                // set value || node || child in HTMLAnchorElement <a>Node</a>
                jQuery.inHTML( merge ) ? HTMLAnchorElement.append( merge ) : 
                typeof merge === "string" ? HTMLAnchorElement.append( merge ) : null;
            } );

            return HTMLAnchorElement; // return HTMLAnchorElement
        },

        // Initialize new HTMLFooterElement <footer>Object</footer>
        Footer: function ( value ) {
            var HTMLFooterElement, merge;

            // create HTMLFooterElement with document
            HTMLFooterElement = document.createElement("footer");

            if (typeof value === "string" || jQuery.isNumeric(value)) {
                merge = jQuery.parseHTML( value );
            }

            if (jQuery.isHTMLDoc( value ) && value.nodeType !== 9) {
                merge = value.nodeType ? [ value ] : value;
            }

            jQuery.each( merge || {}, function( _i, merge ) {
                // if merge #document so remove #document
                merge = merge.nodeType === 9 ? "" : merge;

                // clone merge || make duplicate of merge
                merge = merge.nodeType ? merge.cloneNode( true ) : merge;
                HTMLFooterElement.append( merge );
            } );

            return HTMLFooterElement; // return HTMLFooterElement
        },

        // Initialize new HTMLHeaderElement <footer>Object</footer>
        Header: function ( value ) {
            var HTMLHeaderElement, merge;

            // create HTMLHeaderElement with document
            HTMLHeaderElement = document.createElement("header");

            if (typeof value === "string" || jQuery.isNumeric(value)) {
                merge = jQuery.parseHTML( value );
            }

            if (jQuery.isHTMLDoc( value ) && value.nodeType !== 9) {
                merge = value.nodeType ? [ value ] : value;
            }

            jQuery.each( merge || {}, function( _i, merge ) {
                // if merge #document so remove #document
                merge = merge.nodeType === 9 ? "" : merge;

                // clone merge || make duplicate of merge
                merge = merge.nodeType ? merge.cloneNode( true ) : merge;
                HTMLHeaderElement.append( merge );
            } );

            return HTMLHeaderElement; // return HTMLHeaderElement
        },

        Marquee: function (behavior, dir, val, loop, scrolldelay, scrollamount, vspace, hspace) {
            var loop = jQuery.isNumeric( loop ) ? loop : undefined, 
                delay = jQuery.isNumeric( scrolldelay ) ? scrolldelay : undefined,
                amount = jQuery.isNumeric( scrollamount ) ? scrollamount : undefined,
                HTMLMarqueeElement, rbehavior = /^(scroll|alternate|slide)$/,
                rdir = /^(left|right|top|bottom)$/, vSpace, hSpace;  

            // create HTMLMarqueeElement with a document
            HTMLMarqueeElement = document.createElement("marquee");

            // Set behavior in HTMLMarqueeElement with identify
            rbehavior.test( behavior ) ? HTMLMarqueeElement.behavior = behavior : null;

            // Set direction in HTMLMarqueeElement with identify
            rdir.test( dir ) ? HTMLMarqueeElement.direction = dir : null;

            // Set loop in HTMLMarqueeElement
            loop ? HTMLMarqueeElement.loop = loop : null;

            // Set scrolldelay in HTMLMarqueeElement
            delay ? HTMLMarqueeElement.setAttribute("scrolldelay", delay) : null;
           
            // Set scrollamount in HTMLMarqueeElement
            amount ? HTMLMarqueeElement.setAttribute("scrollamount", amount) : null;

            // give access vspace && hspace two type data identify
            vSpace = jQuery.isNumeric( vspace ) ? `${vspace}px` : vspace;
            hSpace = jQuery.isNumeric( hspace ) ? `${hspace}px` : hspace;

            // Set vspace in HTMLMarqueeElement
            vSpace ? HTMLMarqueeElement.setAttribute("vspace", vSpace) : null;

            // Set hspace in HTMLMarqueeElement
            hSpace ? HTMLMarqueeElement.setAttribute("hspace", hSpace) : null;

            // Set value in HTMLMarqueeElement
            jQuery.loops( val || {}, function( _i, merge ) {
                // if merge #document so remove #document
                merge = merge.nodeType === 9 ? "" : merge;

                // clone merge || make duplicate of merge
                merge = merge.nodeType ? merge.cloneNode( true ) : merge;
                HTMLMarqueeElement.append( merge );
            } );
            
            return HTMLMarqueeElement; // return HTMLMarqueeElement
        },

        // Initialize new HTMLTextAreaElement <textarea cols="4" rows="3">Object</textarea>
        TextArea: function ( cols = "?", rows = "?", value) {
            var HTMLTextAreaElement, merge;

            // create HTMLTextAreaElement with a document
            HTMLTextAreaElement = document.createElement("textarea");

            // Set cols in HTMLTextAreaElement
            typeof cols === "number" ? HTMLTextAreaElement.cols = cols : null;

            // Set rows in HTMLTextAreaElement
            typeof rows === "number" ? HTMLTextAreaElement.rows = rows : null;

            // Set value in HTMLTextAreaElement
            merge = typeof value === "string" ? value : undefined;
            merge ? HTMLTextAreaElement.append( merge ) : null;

            return HTMLTextAreaElement; // return HTMLTextAreaElement
        },

        // Initialize new HTMLRangeElement <input type="range" min="0" max="100" .../>
        Range: function (min = "?", max = "?", val, step) {
            var HTMLRangeElement, min, max, value, step;

            // create HTMLRangeElement with document
            HTMLRangeElement = document.createElement("input");

            // Set type in HTMLRangeElement [default]
            HTMLRangeElement.type = "range"; // set range

            // Set min && max in HTMLRangeElement
            jQuery.isNumeric( min ) ? HTMLRangeElement.min = min : null;
            jQuery.isNumeric( max ) ? HTMLRangeElement.max = max : null;

            value = typeof val === "object" ? JSON.stringify( val ) : val;

            // Set value in HTMLRangeElement
            value ? HTMLRangeElement.value = value : null;

            // Set step in HTMLRangeElement
            jQuery.isNumeric( step ) ? HTMLRangeElement.step = step : null;

            return HTMLRangeElement; // return HTMLRangeElement
        },

        // Initialize new HTMLTitleElement <title> text </title>
        Title: function ( title="?" ) {
            var HTMLTitleElement, value;

            // create HTMLTitleElement #document
            HTMLTitleElement = document.createElement("title");

            // give the access title in name of the value var
            value = typeof title !== "object" ? title : null;
            value ? HTMLTitleElement.append( value ) : null;

            return HTMLTitleElement; // return HTMLTitleElement
        },

        // Initialize new HTMLCreateElement CreateElemnt(HTMLObj|tagName, className, id, value)
        CreateElement: function ( name, classes, id, value ) {
            var ObjectCreater, create = name || null, ralpha,
                setClass, setId, setValue,
                ralpha = new RegExp("^[A-Za-z0-9_-]+$");

            if ( create == null && typeof name !== "object") {
                jQuery.throw("DOMException:",
                    "Failed execute Can't create '" + create + "' HTMLElement."
                );
            }

            if (typeof name !== "string" && typeof name !== "object") {
                jQuery.throw("DOMException:",
                    "Failed execute Can't create '" + create + "' of HTMLElement " +
                    "beacause '" + create + "' Not valid HTMLElement tag name."
                );
            }
            
            // ObjectCreater proccess execute now for help of #document
            try {
                // if create of dataType a String && create in uppercase
                // so conver create of case value in lowerCase() formate

                create = typeof create === "string" ?
                    create.toLowerCase() : create;

                ObjectCreater = typeof create !== "object" ? 
                    document.createElement( create ) : create;
            } catch( e ) { };

            // conver number dataType to String format String.prototyp
            setClass = String.prototype.trim.call( classes || "" );
            setId = String.prototype.trim.call( id || "" ); 
            
            // extra Trim setClass of variable remove extraWhiteSpace
            setClass  = setClass ? jQuery.extraTrim( setClass ) : "";
           
            // Set multiple classList in ObjectCreater help jQuery.each
            jQuery.each( setClass.split(" "), function( _i, ClassList ) {
                if (!ralpha.test( ClassList ) && ClassList) {
                    jQuery.throw("DOMException:",
                        "Failed execute set Element class '" + ClassList + "' on document: " +
                        "Element '" + ClassList + "' not valid HTMLElement class."
                    );
                }
                // now Set in HTMLCreateElements for name of ObjectCreater
                ClassList ? ObjectCreater.classList.add( ClassList ) : null;
            } );

            // Set single HTMLElement in ObjectCreater for id
            setId = ( setId.split(" ") || [] )[ 0 ];
            setId ? ObjectCreater.id = setId : null;

            // throw Error if id selector not be alphabate format
            if ( !ralpha.test( setId ) && setId ) {
                jQuery.throw("DOMException:", 
                    "Failed execute set Element id '" + setId + "' on document: " +
                    "Element '" + setId + "' not valid HTMLElement ID."
                );
            }

            // Set all dataType value in HTMLElement in ObjectCreater
            value = typeof value === "number" ? JSON.stringify( value ) : value;
            setValue = typeof value === "string" ? jQuery.parseHTML( value ) :
                typeof value !== "function" ? value : undefined;

            jQuery.loops( setValue, function ( _i, merge ) {
                // if merge #document so remove #document
                merge = merge.nodeType === 9 ? "" : merge;

                // clone merge || make duplicate of merge
                merge = merge.nodeType ? merge.cloneNode( true ) : merge;
                ObjectCreater.append( merge ? merge : "" );
            } );

            return ObjectCreater; // return HTMLObjectCreater;
        },

        Video: function ( src ) {
            var HTMLVideoElement, setSrc;

            // create HTMLVideoElement use help of #doucment ?
            HTMLVideoElement = document.createElement("video");

            // Set [default] attribute in HTMLVideoElement
            HTMLVideoElement.preload = "auto";

            // Set src in HTMLVideoElement
            setSrc = typeof src === "string" ? src.trim() : "";
            setSrc = setSrc ? window.encodeURI( setSrc ) : "";
            setSrc ? HTMLVideoElement.src = setSrc.trim() : undefined;

            return HTMLVideoElement; // return HTMLVideoElement;
        },

        Abbr: function ( title, data ) {
            var HTMLAbbrElement; // let single main variable

            // create HTMLAbbrElement for help of #document
            HTMLAbbrElement = new CreateElement("abbr");

            // set title in HTMLAbbrElement
            if (typeof title !== "object" && title) {
                HTMLAbbrElement.title = title;
            }

            // set data in HTMLAbbrElement
            jQuery.loops( data, function( _i, merge ) {
                // if merge #document so remove #document
                merge = merge.nodeType === 9 ? "" : merge;

                // clone merge || make duplicate of merge
                merge = merge.nodeType ? 
                    merge.cloneNode(true) : merge;
                HTMLAbbrElement.append(merge ? merge : "");
            } );

            return HTMLAbbrElement; // return HTMLAbbrElement
        },

        Iframe: function ( src, frmBorder, data ) {
            var HTMLIFrameElement, setSrc, frameBorder;

            // create HTMLIFrameElement for help of #document
            HTMLIFrameElement = new CreateElement("iframe");

            // Set src in HTMLIFrameElement
            setSrc = typeof src === "string" ? src : null;
            setSrc = setSrc ? window.encodeURI( setSrc ) : "";
            setSrc && setSrc != null ? 
                HTMLIFrameElement.src = setSrc.trim() : null;

            // Set default attribute in HTMLIFrameElement
            frameBorder = !frmBorder ? 0 : parseFloat( frmBorder );
            !isNaN( frameBorder ) ? 
                HTMLIFrameElement.frameBorder = frameBorder : null;

            // Set data in HTMLIFrameElement all Types data set
            jQuery.loops( data || {}, function( _i, merge ) {
                // if merge #document so remove #document
                merge = merge.nodeType === 9 ? "" : merge;

                // clone merge || make duplicate of merge
                merge = merge.nodeType ?
                    merge.cloneNode( true ) : merge;
                HTMLIFrameElement.append(merge ? merge : "");
            } );

            return HTMLIFrameElement; // HTMLIFrameElement
        }
    } );


    /* all HTMLLinkObject attach [window]
     * Here create only HTMLLinkElements not be create another elements element
     * HTMLLinkElement create diffrent diffrent types with url future provide
     * 1 ) LinkCSs: method use only make for link css related HTMLLink
     * 2 ) Link : method use be multiple && another another types style
     * [LinkAtom, LinkManifest, LinkRss, LinkTouch, LinkImport, LinkPrint] =>
     * plugins use suggest example 1 new LinkAtom( href|| url, true (optional))
    */
    var HTMLAllLinkObject = {
        Link: { rel: "stylesheet" }, LinkCss: { rel: "stylesheet", type: "text/css" },
        LinkAtom: { rel: "alternate", type: "application/atom+xml", title: "Atom" },
        LinkFavicon: { rel: "shortcut icon", type: "image/x-icon" }, LinkImport: { rel: "import" },
        LinkManifest: { rel: "manifest" }, LinkPrint: { rel: "stylesheet", media: "Print" },
        LinkRss: { rel: "alternate", type: "application/rss+xml", title: "RSS" },
        LinkTouch: { rel: "apple-touch-icon" }
    };

    jQuery.each( HTMLAllLinkObject, function ( plugin, defaultSettings, HTMLLinkElement ) {
        HTMLLinkElement = document.createElement("link"); // create link element
        var ownerObject = window, // plugins of ownerObject let a [window] Object
            linkHref = undefined, // set link href undefined now currently
            encodeURI = ownerObject.encodeURI, // simple encode URI method
            encodeURIComponent = ownerObject.encodeURIComponent; // advance encoded method

        ownerObject[ plugin ] = function ( url, encoded ) {

            // HTMLLinkElement of url link setup with simple encoding && advance encoding URI
            linkHref = typeof encoded === "boolean" && encoded ? 
                encodeURIComponent( url ) : encodeURI( url );

            // now Set url in HTMLLinkElement
            linkHref && url ? HTMLLinkElement.href = linkHref : null;
            
            // now Set [default] HTMLLinkElement attributes 
            jQuery.each( defaultSettings, function ( attr, value ) {
                
                HTMLLinkElement[ attr ] = value;
            } );

            // now return main plugin Object / HTMLLinkElement all bugs proof
            return HTMLLinkElement; // return All HTMLLinkElement with Initializer
        };
    } );


    /* all HTMLMetaElement attach [window]
    */
    var HTMLAllMetaProperty = {
        
    };
    
    var HTMLAllAnchorProperty = {
        AnchorBlank: { rel: "noopener noreferrer", target: "_blank", href: "http://"},
        AnchorLink: { href: "http://" }, AnchorMail: { href: "mailto:" }, AnchorTel: { href: "tel:+" }
    };

    jQuery.each(HTMLAllAnchorProperty, function( plugins, defaultProperty, HTMLAnchorElement ) {
        var rhasProtocol = /^(http:\/\/|https:\/\/)/, // rprotocol indentifier regex
            rsingleProtocol = /^(http:)/, rprotoBackup, // rsingle only work http://
            ownerObject = window, // main plugins merge in Object [window]
            encodeURI = ownerObject.encodeURI, // normal encoding URI
            encodeURIComponent = ownerObject.encodeURIComponent, // advance encoding URI
            ObjectURI, encodedURI, rTrimProtocol; // let current undefined set variable data
        
        // main plugins Handle object && attached plugins in [window] [Object window]
        // use oprator new pluginName() new oprater is optional bute take new oprator
        ownerObject[ plugins ] = function ( href, value, httpsProto = false, encoded ) {
            // convert HTMLAnchorElement input url || href String format
            ObjectURI = String.prototype.trim.call( href || "" );

            // get rprotocol [http://|https://|mailto:|tel:+] name of data
            // for help name of the rTrimProtocol regex variable rTrimProtocol
            // variable work only check left side first match value && execute
            rTrimProtocol = plugins === "AnchorBlank" || plugins === "AnchorLink" ?
                ( rhasProtocol.exec(ObjectURI) || [] )[ 0 ] :
                ( /^(mailto:|tel\+)/.exec() || [] )[ 0 ];
            
            // remove || unset || delete existed value in HTMLAnchorElement
            // href || url exist value for [http://|https://|mailto:|tel:+]
            ObjectURI = ObjectURI.replace(rhasProtocol, "");

            // encoded url now Here url || href encoded two types first type
            // simple encode if user not give encoded value true && if users
            // give the encoded value true so href||url encoded advance level
            encodedURI = typeof encoded === "boolean" && encoded ? 
            encodeURIComponent( ObjectURI ) : encodeURI( ObjectURI );
            
            // create main HTMLAnchorElement for help of the document.createElement("a");
            // method He created Object || element plugins of main part i can say
            // plugins attribute & body of ownerObject and HTMLElemnt of ownerObject
            // is [window] [Object window] but plugins attributes ownerObject Anchor
            HTMLAnchorElement = document.createElement("a"); // create HTMLAnchorElement

            // shift arguments for HTMLLinkElement data || value detect not Boolean
            // if shifted aruments done so set value HTMLLinkElement set all Data
            if (typeof value !== "boolean" && typeof value !== "function") {
                jQuery.loops( value, function( _i, merge) {
                    // if merge #document so remove #document
                    merge = merge.nodeType == 9 ? null : merge;

                    // clone merge || make duplicate of merge
                    merge = merge.nodeType ? merge.cloneNode( true ) : merge;
                    // merge || Set data in HTMLLinkEleemnt all types data ?
                    HTMLAnchorElement.append( merge ? merge : "" );
                } ); 
            }

            jQuery.each( defaultProperty, function( defaultAttr, defaultVal ) {
                // without conditon check set as [default] property
                // and values [default] value not be editable data
                HTMLAnchorElement[ defaultAttr ] = defaultVal;

                // here same work here set property but here set 
                // property before check condition if rTromproto
                // or href in allready exist protocol so this conditon
                // run and set prtocole of help of the rTrimProtocol
                if (rTrimProtocol && rTrimProtocol.length >= 3) {
                    // Set HTMLLinkElement globle protocol
                    HTMLAnchorElement.href = rTrimProtocol;
                }
            } );

            // get HTMLAnchorElement protocol backup in HTMLLinkElement
            rprotoBackup = HTMLAnchorElement.href; // protocol backup ?

            HTMLAnchorElement.href = rprotoBackup.includes("http:") || rprotoBackup.includes("https:") ? 
                rprotoBackup + "//" + encodedURI : rprotoBackup + encodedURI;

            // change || edit HTMLLinkElement protocol http://protocol to edit && change to https://protocol
            // bute before check some conditions here condition is httpsProto equal true && httpsProto types
            // dataType has Boolean tow conditon correct should be compolsary no any one false condtion rule
            if (typeof httpsProto === "boolean" && httpsProto && rsingleProtocol.test(HTMLAnchorElement.href)) {
                
                // [default] set HTMLLinkElement in set as protocol http://protocol localprotocol
                // if httpsProto detect dataType Boolean && httpsProto value of true set HTMLLink
                // protocol globly conected internet https://protocol provide now with https://www
                HTMLAnchorElement.href = HTMLAnchorElement.href.replace(/(http:\/\/)/, "https://");
            }

            return HTMLAnchorElement; // return HTMLAnchorElement unsetable data && url ?
        };
    } );


    /* all HTMLInputElement attach [window]
    */
    var HTMLAllInputProperty = {
        InputRange: { type: "range" },
        InputResset: { type: "reset" },
        InputSearch: { type: "search" },
        InputSubmit: { type: "submit" },
        InputText: { type: "text" },
        InputTel: { type: "tel" },
        InputTime: { type: "time" },
        InputUrl: { type: "url" },
        InputButton: { type: "button" },
        InputWeek: { type: "week" },
        InputCheckbox: { type: "checkbox" },
        InputColor: { type: "color" },
        InputDate: { type: "date" },
        InputDateTime: { type: "datetime" },
        InputDateTimeLocal: { type: "datetime-local" },
        InputEmail: { type: "email" },
        InputFile: { type: "file" },
        InputHidden: { type: "hidden" },
        InputImage: { type: "image" },
        InputMonth: { type: "month" },
        InputPassword: { type: "password" },
        InputRadio: { type: "radio" }
    };
    
    jQuery.each(HTMLAllInputProperty, function (plugins, defaultProperty, HTMLInputElement) {
        var ownerObject = window, rexecID = /^[A-Za-z0-9_\-]+$/,
            encodeURI = ownerObject.encodeURI;
        plugins === "InputImage" ? ownerObject[ plugins ] = function (src, alt, name, id) {
            HTMLInputElement = new CreateElement("input"), // create main input Element
            encodeURI = encodeURI( src || "" ), name = ( name || "" ).trim(),
            src = ( src || "" ).trim(), alt = ( alt || "" ).trim();

            // Set [Necessary] attribute name of type="{defaultProperty}";
            jQuery.each(defaultProperty, function ( defaultAttr, defaultVal) {
                // Set type in HTMLInputElement attribute
                HTMLInputElement[ defaultAttr ] = defaultVal;
            } );

            // Set src in HTMLInputElement with image type selected
            typeof src === "string" && src ? HTMLInputElement.src = encodeURI : null;

            // Set alt in HTMLInputElement with image type selected
            typeof alt !== "object" ? HTMLInputElement.alt = alt : null;

            // Set name in HTMLInputElement with image type selected
            typeof name !== "object" && name ? HTMLInputElement.name = name : null;

            // Set id in HTMLInputElement help of the CreateElement
            new CreateElement(HTMLInputElement, "", id);

            // remove none usable attribute in HTMLInputElement
            if (!rexecID.test(HTMLInputElement.name)) {
                HTMLInputElement.removeAttribute("name");
            }

            return HTMLInputElement; // return HTMLInputElement
        } : ownerObject[ plugins ] = function (name, id, value, defultDisabled) {
                HTMLInputElement = new CreateElement("input"), // create main input Element
                    value = value,
                    id = String.prototype.trim.call( id || ""),
                    name = String.prototype.trim.call( name || "");

                // Set [Necessary] attribute name of type="{defaultProperty}";
                jQuery.each(defaultProperty, function (defaultAttr, defaultVal) {
                    // Set type in HTMLInputElement attribute
                    HTMLInputElement[ defaultAttr ] = defaultVal;
                } );

                // Set name in HTMLInputElement
                name ? HTMLInputElement.name = name : null;

                // Set id in HTMLInputElement
                new CreateElement(HTMLInputElement, "", id);

                // Set value only String or number format in HTMLInputElement
                typeof value !== "object" && typeof value !== "boolean" ? 
                    HTMLInputElement.value = value : null;
                
                // Set disabled property in HTMLInputElement
                typeof defultDisabled === "boolean" && defultDisabled ?
                    HTMLInputElement.disabled = true : undefined;

                typeof value === "boolean" && value ?
                    HTMLInputElement.disabled = true : undefined;

                typeof id === "boolean" && id ?
                    HTMLInputElement.disabled = true : undefined;

                if (HTMLInputElement.type === "checkbox" || 
                    HTMLInputElement.type === "radio") {

                    if (defultDisabled === "checked") {
                        HTMLInputElement.checked = true;
                    }
                }

                return HTMLInputElement; // return HTMLInputElement
        }
    } );


    /* new HTMLObject() method with attached [window]
    */
    jQuery.extend(window, {
        HTMLObject : function (name, options) {
            // shift argument of Object options
            if (typeof name === "object") {
                options = name;
                name = undefined;
            }

            // shorHand return HTMLElement with create
            if ( typeof options !== "object" && typeof name === "string" && name) {
                var shortElement, setAttr, rexecID = /^[A-Za-z0-9\-_]+$/,
                    nameAccepted, identifier;

                // create HTMLShorElement with jQuery launched plug
                shortElement = new CreateElement( name.trim() );

                // Set name shortElement in only String
                setAttr = rexecID.test( options ) && typeof options === "string" ? 
                    options.trim() : undefined;
                
                // make storate or group for all accepted name && value in HTMLElements ?
                nameAccepted = ["input", "select", "button", "option", "progress", "list", "anchor"];

                // get tagName for shortElement in store identifier var 
                identifier = shortElement.tagName.toLowerCase();

                // setAttr ? shortElement.name = setAttr : null;
                nameAccepted.includes( identifier ) && setAttr ?
                    shortElement.name = setAttr :
                    setAttr ? shortElement.id = setAttr || "" : null;
                    
                if (identifier === "input" || identifier === "button") {
                    shortElement.removeAttribute("name");
                    setAttr ? shortElement.type = setAttr : null;
                }

                return shortElement; // return shortElement
            }


            // Force options an to be Object
            options = options || {};

            // change options key case in lowerCase()
            jQuery.each(options, function ( key, value, rgetdata) {
                // empty now all Object value
                delete options[key];

                // conver all key lowerCase()
                key = key.toLowerCase();

                // make a regulare expression expr
                rgetdata = /^(data.*)$/;

                // get name of data[Property] in key 
                // and after getting key value push
                if (rgetdata.test( key ) && key) {
                   
                    // split now && create auto []
                    var pushkey = key.split("data");
                    // now push jQuery.timers obj
                    jQuery.timers.push( Filter(pushkey, true) );
                }

                // set new {} property && value
                options[ key ] = value;
            } );

            var 
                // give access options all data in name of s var
                s = options,

                // Initialize a window Object
                ownerObject = window,

                // Advance encodeURIComponent with [window]
                encodeURIComponent = ownerObject.encodeURIComponent,

                // normal encodeURI with [window]
                encodeURI = ownerObject.encodeURI,

                // rhasData only check String number some char
                rsetAttr = /^[A-Za-z0-9_\-]+$/,

                // get s.data[uncknown] attribute detect 
                hasData = jQuery.timers.flat( Infinity ),

                // Extra trim whiteSpace in text format type
                extraTrim = jQuery.extraTrim,

                // Initialize HTMLElements var
                HTMLElementInit,

                // check type in HTMLInputElement regex through
                rinputType = new RegExp("^(range|reset|search|submit|text|tel|" +
                    "time|url|button|week|checkbox|color|date|datetime|" +
                    "datetime-local|email|file|hidden|image|month|password|radio)$"
                ),

                // rmultihasTag check multiple conditon with regular expression
                rmultihasTag = (...source) => new RegExp("^(" + source + ")+$"),

                // HTMLTagName crrent undefined set
                hasTag,

                extraType = {
                    application: "javascript|pdf|EDI-X-12|EDIFACT|octet-stream|ogg|xhtml\\+xml|" +
                        "x-shockwave-flash|json|id\\+json|xml|zip|x-www-form-urlencoded",
                    audio: "mpeg|x-ms-wma|vnd\\.rn-realaudio|x-wav",
                    image: "gif|jpeg|png|tiff|vnd\\.microsoft\\.icon|x-icon|vnd\\.djvu|svg\\+xml",
                    multipart: "mixed|alternative|related\\(usign by MHTML mail\\)|form-data",
                    text: "css|csv|html|javascript\\(obsolete\\)|plain|xml|javascript",
                    video: "mpeg|mp4|quicktime|x-ms-wmv|x-msvideo|x-flv|webm",
                    vnd: ""
                },

                rlocalType = new RegExp("^(application\/+(" + extraType.application + ")|audio\/+(" + extraType.audio + 
                    ")|image\/+(" + extraType.image + ")|multipart\/+(" + extraType.multipart + ")|text\/+" +
                    "(" + extraType.text + ")|video\/+(" + extraType.video + ")|vnd\/+(" + extraType.vnd + "))$"),

                // rdataset help set data-attribute check or set help to type
                rdataset = /^(data.*)+$/;

                // check {} Object key existing property in hasOwn
                s.hasOwn = ( key ) => s.hasOwnProperty( key );

            // override || remove {} key property
            if (s.hasOwn("classlist") && s.hasOwn("class")) {
                delete s.class; // delete if classlist or class exist
            }
            
            if (s.hasOwn("class") && !s.hasOwn("classlist")) {
                s.classlist = s.class; // override class to classlist
                delete s.class; // delete class if added classlist
            }

            if (s.hasOwn("style") && s.hasOwn("css")) {
                delete s.style; // delete if style or css exist
            }

            if (s.hasOwn("style") && !s.hasOwn("css")) {
                s.css = s.style; // override style to css
                delete s.style; // delete style if added css
            }

            // if not s.create so throw the new Error
            if (!s.create || typeof s.create === "number") {
                jQuery.throw("DOMException:",
                    "Failed execute Can't provide HTMLElement '" + s.create + 
                    "' on Document: '" + s.create + "' not valid HTMLElement tag." +
                    "\n\n@suggest: " + "add create property in HTMLObject(" +
                    "{create: String or HTMLObject})"
                );
            }

            // Advance Error Handling throw new Error in deep
            if (typeof s.create !== "string" && !jQuery.isHTMLDoc(s.create)) {
                jQuery.throw("DOMException",
                    "Failed execute Can't provide HTMLElement '" + s.create + 
                    "' type " + jQuery.isTypeOf( s.create ) + " Method not allowed " +
                    "on Document: " + s.create + " Not valid HTML tag or HTMLObject." +
                    "\n\n@suggest: " + "add create property in HTMLObject(" +
                    "{create: String or HTMLObject})"
                );
            }

            // Initialize HTMLElement in [window] Object
            HTMLElementInit = s.create && typeof s.create === "string" ?
                new CreateElement((s.create).trim()) :
                typeof s.create === "object" ? s.create : undefined;

            
            jQuery.loops(HTMLElementInit, function (_i, HTMLElementInit) {
                // set HTMLTagName in name of the hasTag variable
                hasTag = HTMLElementInit.tagName.toLowerCase();

                // if hasTage equal to "input" Set type attribute in HTMLInputElement
                // identifier type if !execute type or not valid type so throw error
                if (!rinputType.test( s.type ) && hasTag === "input" && s.type) {
                    jQuery.throw("TypeError:",
                        "Failed execute cannot set type '" + s.type + "' in " +
                        "HTMLInputElement on Document: '" + s.type + "' Not " +
                        "valid HTMLInputElement type."
                    );
                }

                // Set rel attribute in only accepted rel attribute htmlEement
                if (rmultihasTag("area|a|link|form").test(hasTag) && typeof s.rel === "string") {
                    HTMLElementInit.rel = (s.rel).trim();
                }

                // Set metaTage attributes in HTMLMetaEelment
                if (hasTag === "meta") {
                    typeof charset === "string" && !s.name && !s.httpequiv ? 
                        HTMLElementInit.charset = (s.charset).trim() : null;

                    typeof s.name === "string" ? HTMLElementInit.name = (s.name).trim() : null;

                    typeof s.httpequiv === "string" && !s.name ? 
                        HTMLElementInit.httpEquiv = (s.httpequiv).trim() : null;

                    typeof s.content === "string" ? HTMLElementInit.content = (s.content).trim() : null;
                }

                if (hasTag === "link" && s.rel === "stylesheet") {
                    HTMLElementInit.type = "text/css";
                }

                // Set [action] property attribute in HTMLFormElement
                if (typeof s.action === "string" && hasTag === "form") {
                    HTMLElementInit.action = ( s.action ).trim();
                }

                // Set [method] property attribute in HTMLFormElement
                if (hasTag === "form" && rmultihasTag("GET|POST|PUT|DELETE").test( (s.method || "").toUpperCase() )) {
                    HTMLElementInit.method = ( s.method.trim() ).toUpperCase();
                }

                // now set type in HTMLInputElement if exist s.type && match s.type
                if (rinputType.test( s.type ) && s.type && hasTag === "input") {
                    HTMLElementInit.type = s.type; // type set successfully!
                }

                // Set href only href accepted HTMLElement so accept href attribute
                if (rmultihasTag("a|area|base|link") && s.href && typeof s.href !== "object") {
                    if ((s.href && typeof s.encoded !== "boolean") || s.encoded === false) {
                        HTMLElementInit.href = encodeURI( s.href ); // set href successfully!
                    }
                    if (s.href && typeof s.encoded === "boolean" && s.encoded) {
                        HTMLElementInit.href = encodeURIComponent( s.href ); // set href successfully!
                    }
                }

                // Set src only srcset HTMLElement when so accept src attributes
                if (rmultihasTag("script|video|audio|iframe|img|embed|source|track")
                    .test( hasTag ) && s.src && typeof s.src !== "object") {
                    if ((s.src && typeof s.encoded !== "boolean") || s.encoded === false) {
                        HTMLElementInit.src = encodeURI( s.src ); // src set successfully!
                    }
                    if (s.src && typeof s.encoded === "boolean" && s.encoded) {
                        HTMLElementInit.src = encodeURIComponent( s.src ); // src set successfully!
                    }
                }

                // Set advance type not input tage without input tag from another tag
                if (rlocalType.test( s.type ) && typeof s.type !== "object" && 
                    rmultihasTag("script|video|audio|iframe|embed|source|track").test( hasTag )) {
                    HTMLElementInit.type = s.type; // advance type set successfully!
                }

                // set [default] attributes [id or class] in HTMLElementInit && Initialize
                HTMLElementInit = new CreateElement(HTMLElementInit, s.classlist, s.id);

                // Set value in valueAccepted some HTMLElement 
                if (rmultihasTag("select|option|input|button|progress|textarea")
                    .test( hasTag ) && s.value && typeof s.value !== "object") {
                    HTMLElementInit.value = s.value; // value set successfully
                }

                // set name of the [data-property] attributes in HTMLElementInit
                jQuery.loops(hasData, function ( _i, dataAttr, _arr, datavalue) {
                    if (dataAttr && s["data" + dataAttr]) {
                        datavalue = extraTrim(s["data" + dataAttr]);
                        s["data" + dataAttr] ? 
                            HTMLElementInit.dataset[dataAttr] = datavalue : null;
                    }
                } );

                // Set [width or height] attributes property in HTMLElementInit
                if ((s.width || s.height) && (typeof s.width !== "object" || typeof s.height !== "object") && 
                    rmultihasTag("canvas|embed|iframe|img|input|object|video")) {
                    if (s.width && typeof s.width !== "function") {
                        HTMLElementInit.width = parseFloat( s.width ); // set width successfully!
                    }

                    if (s.height && typeof s.height !== "function") {
                        HTMLElementInit.height = parseFloat( s.height ); // set height successfully!
                    }
                }

                // Set [css style] attributes property in HTMLElementInit
                if (s.css && typeof s.css !== "function") {
                    if (typeof s.css === "string") {
                        HTMLElementInit.style = s.css; // set single css style
                    }

                    if (jQuery.isObject( s.css ) && typeof s.css === "object") {
                        jQuery.css(HTMLElementInit, s.css); // set multiple css
                    }
                }

                // Set charset attributes property in HTMLEelement only charset accept tag
                if (rmultihasTag("script|link|style|form|iframe").test( hasTag )) {
                    if (s.charset && typeof s.charset === "string") {
                        HTMLElementInit.charset = s.charset;
                    }
                    else {
                        // set [default] charset="utf-8" in HTMLElementInit;
                        HTMLElementInit.charset = "utf-8";
                    }
                }

                // Handle Marquee tage in if set tag in HTMLElementInit set marquee attributes
                if (hasTag === "marquee") {
                    HTMLElementInit = new window.Marquee(
                        s.behavior, 
                        s.direction, 
                        s.html, 
                        s.loop, 
                        s.scrolldelay, 
                        s.scrollamount, 
                        s.vspace, 
                        s.hspace
                    );
                }

                // Set [enctype] property attribute in HTMLFormElement
                if (hasTag === "form" && rlocalType.test( s.enctype )) {
                    HTMLElementInit.enctype = (s.enctype).trim(); // enctype set successfully!
                }

                // Set alt property attribute in HTMLImageElement
                if (rmultihasTag("area|input|img").test( hasTag ) && typeof s.alt === "string") {
                    HTMLElementInit.alt = (s.alt).trim();
                }

                // Set [Iframe tage] attribute in HTMLIframeElement
                if (hasTag === "iframe") {
                    HTMLElementInit.frameBorder = (parseInt(s.frameborder) || 0);
                    // set allow attribute in HTMLIframeElement
                    s.allow ? HTMLElementInit.allow = s.allow : null;
                    s.allowfullscreen ? HTMLElementInit.allowfullscreen = s.allowfullscreen : null;
                    s.loading ? HTMLElementInit.loading = s.loading : null;
                    s.referrerpolicy ? HTMLElementInit.referrerpolicy = s.referrerpolicy : null;
                    s.sendbox ? HTMLElementInit.sendbox = s.sendbox : null;
                    s.srcdoc ? HTMLElementInit.srcdoc = s.srcdoc : null;
                }

                // Set [audio] attributes in HTMLAudioElement
                if (rmultihasTag("audio|video").test( hasTag )) {
                    hasOwn("autoplay") ? HTMLElementInit.autoplay = "autoplay" : null;
                    hasOwn("controls") ? HTMLElementInit.controls = "controls" : null;
                    hasOwn("loop") ? HTMLElementInit.loop = "loop" : null;
                    hasOwn("muted") && hasTag === "video" ? HTMLElementInit.muted = "muted" : null;
                    hasTag === "video" && typeof s.poster === "string" ? HTMLElementInit.poster = s.poster : null;
                    rmultihasTag("auto|metadata|none").test( s.preload ) ? HTMLElementInit.preload = s.preload : null;
                }

                // Set [disabled && autocomplete && readonly && autofocus] attribute
                if (rmultihasTag("input|fieldset|button|optgroup|option|select|textarea").test(hasTag)) {
                    typeof s.disabled === "boolean" && s.disabled ? 
                        HTMLElementInit.disabled = true : HTMLElementInit.disabled = false;

                    typeof s.autocomplete === "boolean" && s.autocomplete ? 
                        HTMLElementInit.autocomplete = "on" : HTMLElementInit.removeAttribute("autocomplete");

                    typeof s.checked === "boolean" && s.checked ? 
                        HTMLElementInit.checked = true : HTMLElementInit.checked = false;

                    typeof s.selected === "boolean" && s.selected ? 
                        HTMLElementInit.selected = true : HTMLElementInit.selected = false;

                    typeof s.readonly === "boolean" && s.readonly ? 
                        HTMLElementInit.readonly = true : HTMLElementInit.readonly = false;

                    typeof s.autofocus === "boolean" && s.autofocus ? 
                        HTMLElementInit.autofocus = true : HTMLElementInit.autofocus = false;
                }

                // Set title attributes in HTMLTitleAcceptElemnt 
                if (rmultihasTag("link|abbr|object").test( hasTag ) && typeof s.title === "string") {
                    HTMLElementInit.title = (s.title).trim();
                }

                // Set childrentNode && html content || textContent in HTMLElement
                if (!rmultihasTag("input|audio|video|img|textarea|track|object|link|meta|").test(hasTag)) {
                    if (typeof s.text  === "string" && s.text) {
                        HTMLElementInit.textContent = ( s.text ).trim();
                    }
                    
                    s.html = typeof s.html === "string" ? 
                        HTMLElementInit.innerHTML = s.html : null;
                    
                    s.append = typeof s.append === "string" ?
                        jQuery.parseHTML(s.append) : s.append;
                    
                    s.prepend = typeof s.prepend === "string" ?
                        jQuery.parseHTML(s.prepend) : s.prepend;
                    
                    s.after = typeof s.after === "string" ? 
                        jQuery.parseHTML(s.after) : s.after;
                    
                    s.before = typeof s.before === "string" ? 
                        jQuery.parseHTML(s.before) : s.before;

                    jQuery.loops(s.append, function ( _i, html ) {
                        // if merge #document so remove #document
                        html = html.nodeType === 9 ? "" : html;

                        // clone html || make duplicate of html
                        html = html.nodeType ? html.cloneNode( true ) : html;
                        
                        s.append ? HTMLElementInit.append( html ? html : "" ) : null;
                    } );

                    jQuery.loops(s.prepend, function( _i, prepend ) {
                        // if merge #document so remove #document
                        prepend = prepend.nodeType === 9 ? "" : prepend;

                        // clone prepend || make duplicate of prepend
                        prepend = prepend.nodeType ? prepend.cloneNode(true) : prepend;

                        s.prepend ? HTMLElementInit.prepend( prepend ? prepend : "" ) : null;
                    } );

                    jQuery.loops(s.after, function (_i, afterHTML) {
                        // if merge #document so remove #document
                        afterHTML = afterHTML.nodeType === 9 ? "" : afterHTML;

                        // clone afterHTML || make duplicate of afterHTML
                        afterHTML = afterHTML.nodeType ? afterHTML.cloneNode(true) : afterHTML;

                        s.after ? HTMLElementInit.after( afterHTML ? afterHTML : "" ) : null;
                    } );

                    jQuery.loops(s.before, function (_i, beforeHTML) {
                        // if merge #document so remove #document
                        beforeHTML = beforeHTML.nodeType === 9 ? "" : beforeHTML;

                        // clone beforeHTML || make duplicate of beforeHTML
                        beforeHTML = beforeHTML.nodeType ? beforeHTML.cloneNode(true) : beforeHTML;

                        s.before ? HTMLElementInit.before(beforeHTML ? beforeHTML : "") : null;
                    } );
                } 
            } );

            return HTMLElementInit; // retrun now HTMLElementInit
        }
    } );



    /* jQuery(selector).plugins() methods create now ?
     * 1 ) make jQuery(selector).plugins with selector plugins
     * 2 ) Here after line not create full $(selector).plugins 
     *   85% (percent) create here after line in plugins && 
     * some create plugins [ not defined place ] defined where
    */
    jQuery.offset = {
        setOffset: function (elem, options) {
            var curPosition, curCSSTop, curCSSLeft, curOffset, curLeft, curTop, calculatePosition,
                position = jQuery.css(elem, "position"),
                curElem = jQuery( elem ),
                props = {};
            
            // Set position first, in-case top/left are set even on static elem
            if ( position === "static" ) {
                elem.style.position = "relative";
            }
            
            curOffset = curElem.offset();
            curCSSLeft = jQuery.css(elem, "left");
            curCSSTop = jQuery.css(elem, "top");
            calculatePosition = (position === "fixed" || position === "absolute") &&
                (curCSSLeft + curCSSTop).indexOf("auto") > -1;
            
            // Need to be able to calculate position if either
            // top or left is auto and position is either absolute or fixed
            if ( calculatePosition ) {
                curPosition = curElem.position();
                curLeft = curPosition.left;
                curTop = curPosition.top;

            } else {
                curLeft = parseFloat( curCSSLeft );
                curTop = parseFloat( curCSSTop );
            }

            if (typeof options === "object" && options.top != null) {
                props.top = (options.top - curOffset.top) + curTop;
            }
            if (typeof options === "object" && options.left != null) {
                props.left = (options.left - curOffset.left) + curLeft;
            }

            jQuery.css(elem, props); // set CSSProperty in HTMLElements
        }
    };


    jQuery.fn.extend({

        // offset() relates an element's border box to the document origin
        offset: function( options ) {

            // Preserve chaining for setter
            if ( arguments.length ) {
                return options === undefined ?
                    this :
                    this.each(function ( _i ) {
                        jQuery.offset.setOffset(this, options);
                    } );
            }

            var rect, win,
                elem = this[ 0 ];
            
            if ( !elem ) {
                return;
            }

            // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
            // Support: IE <=11 only
            // Running getBoundingClientRect on a
            // disconnected node in IE throws an error
            if (!elem.getClientRects().length) {
                return { top: 0, left: 0 };
            }

            // Get document-relative position by adding viewport scroll to viewport-relative gBCR
            rect = elem.getBoundingClientRect();
            win = elem.ownerDocument.defaultView;
            return {
                top: rect.top + win.pageYOffset,
                left: rect.left + win.pageXOffset
            };
        },

        // position() relates an element's margin box to its offset parent's padding box
        // This corresponds to the behavior of CSS absolute positioning
        position: function() {
            if ( !this[ 0 ] ) {
                return;
            }

            var offsetParent, offset, doc,
                elem = this[ 0 ],
                parentOffset = { top: 0, left: 0 };
            
            // position:fixed elements are offset from the viewport, which itself always has zero offset
            if (jQuery.css(elem, "position") === "fixed" || jQuery.style(elem, "position" === "fixed")) {

                // Assume position:fixed implies availability of getBoundingClientRect
                offset = elem.getBoundingClientRect();

            } else {
                offset = this.offset();

                // Account for the *real* offset parent, which can be the document or its root element
                // when a statically positioned element is identified
                doc = elem.ownerDocument;
                offsetParent = elem.offsetParent || doc.documentElement;
                
                while( offsetParent && 
                    (offsetParent === doc.body || offsetParent === doc.documentElement) &&
                    jQuery.css(offsetParent, "position") === "static") {

                    offsetParent = offsetParent.parentNode;
                }
                if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {

                    // Incorporate borders into its offset, since they are outside its content origin
                    parentOffset = jQuery( offsetParent ).offset();
                    parentOffset.top += jQuery.css(offsetParent, "borderTopWidth", true);
                    parentOffset.left += jQuery.css(offsetParent, "borderLeftWidth", true);
                }
            }

            // Subtract parent offsets and element margins
            return {
                top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
                left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
            };
        },

        // This method will return documentElement in the following cases:
        // 1) For the element inside the iframe without offsetParent, this method will return
        //    documentElement of the parent window
        // 2) For the hidden or detached element
        // 3) For body or html element, i.e. in case of the html node - it will return itself
        //
        // but those exceptions were never presented as a real life use-cases
        // and might be considered as more preferable results.
        //
        // This logic, however, is not guaranteed and can change at any point in the future
        offsetParent: function() {
            return this.map(function () {
                var offsetParent = this.offsetParent;

                while( offsetParent && jQuery.css(offsetParent, "position") === "static") {
                    offsetParent = offsetParent.offsetParent;
                }

                return offsetParent || documentElement;
            } );
        }
    } );



    // create scrollLeft or scrollTop method
    jQuery.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, props ) {
        var top = "pageYOffset" === props;

        jQuery.fn[ method ] = function( value ) {
            
            // Coalesce documents and windows
            var win, elem = this[ 0 ];
            if ( isWindow( elem ) ) {
                win = elem;
            } else if ( elem.nodeType === 9 ) {
                win = elem.defaultView;
            }

            if (value === undefined) {

                return win ? win[ props ] : elem[ method ];
            }

            if ( win ) {
                win.scrollTo(
                    !top ? value : win.pageXOffset,
                    top ? value : win.pageYOffset
                );
            } else {
                elem[ method ] = value;
            }

            return this;
        };
    } );

    // create get[html, text] or set[html, text] methods
    jQuery.each(["html", "text"], function( _i, method ) {
        jQuery.fn[ method ] = function( value ) {
            return getHtmlOrText( this, value, method );
        };
    } );

    // create get[width, innerWidth, innerHeight,
    //  height, outerWidth, outerHeight]
    // or set [width, height, innerWidth, 
    // innerHeight, outerWidth, outerHeight] methods
    jQuery.each([
        "width", 
        "height", 
        "innerWidth", 
        "innerHeight", 
        "outerWidth", 
        "outerHeight",
        "scrollWidth",
        "scrollHeight"
    ], function( _i, methods ) {
        jQuery.fn[ methods ] = function( value ) {
            return getWidthOrHeight(this, methods, value);
        };
    } );


    /* create [fadeIn, fadeOut, fadeToggle, fadeTo] methods
     * this plugins work type of hide && show && toggle but
     * this plugins smoothness && show hide and toggle plugins
     * smoothness very diffrent this plugins will be give 
     * very smooth && fadeLimit facility your set limit of
     * element transparancy 0 for Infinity -number of Infinit
    */
    jQuery.each(["fadeIn", "fadeOut", "fadeToggle", "fadeTo"], function ( _i, methods ) {
        methods === "fadeTo" ? jQuery.fn[ methods ] = function (speed, to, callback) {
            allFadeCustomize(this, speed, callback, to, methods);
            return this;

        } : methods === "fadeToggle" ? jQuery.fn[ methods ] = function (speed, callback) {

            for (let i = 0; i < this .length; i++) {
                if (jQuery.css(this[ i ], "display") === "none") {
                    this.fadeIn(speed, callback);
                    break;
                    
                } else {
                    this.fadeOut(speed, callback);
                    break;
                }
            }

            return this; 

        } : jQuery.fn[ methods ] = function (speed, callback) {
                    allFadeCustomize(this, speed, callback, undefined, methods);
            return this;
        }
    } );  

    /* create [show, hide, toggle] jQuery plugins with help of shoHide function
     * showHide function give the facility element show if element display none
     * && if element show or !none showHide function hide elemnet and auto set
     * display none with css property but only change display property only css
     * number && when show your element now set bakcup display set without none
    */
   jQuery.each(["show", "hide", "toggle"], function ( _i, methods ) {
        methods === "toggle" ? jQuery.fn[ methods ] = function (speed, callback) {

            jQuery.each(this, function ( _i, cur ) {
                // set show jQuery property if HTMLElement display
                // set none so jQuery plugins set display not none
                if (jQuery.css(cur, "display") === "none") {
                    jQuery( cur ).show(speed, callback);

                // set hide jQuery property if HTMLElement display
                // not be none so jQuery plugin set none display ?
                } else if (jQuery.css(cur, "display") !== "none") {
                    jQuery( cur ).hide(speed, callback);
                }
            } );
            return this; // return [default] jQuery.fn.init[prevElement];

        } : jQuery.fn[ methods ] = function (speed, callback) {
            // two in one work for two much fun here deal show
            // and hide two types of case only deal HTMLElement
            return showHide(this, speed, callback, methods);
        }
   } );


    /* Create [on, one, off] methods in jQuery(selector).plugins()
     * attach now use third function in create this plugins but
     * here called third function for by name on && off function()
     * 1 ) discus work on work set event in your HTMLElementObject
     * but here no limit set of event you can set multiple event
     * && extra future provide data your can put data object in on
     * plugins 
     * 2 ) discus work one [ one plugins work same of on but here
     * only one different one plugins set multiple time event 
     * but only one time trigger or fire event only for one time
     * 3 ) discus work off method off method will be work remove
     * event for set as HTMLEleemnt event off remove limit event
    */
    jQuery.fn.extend({

        on: function (types, selector, data, fn) {
            return on(this, types, selector, data, fn);
        },
        one: function (types, selector, data, fn) {
            return on(this, types, selector, data, fn, 1);
        },
        off: function (types, selector, fn) {
            return off(this, types, selector, fn);
        }
    } );


    /* Animation
     * create jQuery(selector).animate({props}, speed, callback) jQuery plugins
     * animate plugins use will be HTMLElements animate smoothly effect only
     * number format css property for example [opacity, width, height, margin]
     * && extra only for px or number formate accept property not color accept
     * in animate plugins && set speed smoothness effect && last callback function
     */
    jQuery.fn.extend({
        animate: function (props, speed, callback) {
            return jQuery.Animation(this, props, speed, callback);
        }
    });

    jQuery.each(["after", "before", "append", "prepend", "appendTo", "prependTo"], 
        function ( _i, methods ) {
            methods === "appendTo" || methods === "prependTo" ? 
            jQuery.fn[ methods ] = function (selector) {
                return manipulationReplace(jQuery( selector ), methods, this);

            } : jQuery.fn[ methods ] = function () {
                return manipulationReplace(this, methods, jQuery.access(arguments));
            }
    } );

    jQuery.each(
        ("blur focus focusin focusout resize scroll click dblclick timeupdate " +
            "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
            "change select submit keydown keypress keyup contextmenu").split(" "),
        function ( _i, name ) {

            // Handle event binding
            jQuery.fn[ name ] = function (data, fn) {
                return arguments.length > 0 ? 
                    this.on(name, null, data, fn) :
                    this.trigger( name );
            };
        }
    );

    // Create jQuery(selector).ready(fn) plugins work DOM ready
    // shortcuts DOM ready on compaire direct DOM ready event
    // in use by $(function() {}) with some long $(document).ready(fn)
    // but Initiliazation same only work effect && output give same
    jQuery.fn.ready = function (fn) {
        jQuery(rootjQuery).on("DOMContentLoaded", fn);
        return this;
    };

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


    jQuery.fn.extend({

        attr: function (name, value) {
            return jQuery.attr(this, name, value);
        },

        removeAttr: function (value) {
            return jQuery.removeAttr(this, value);
        },

        css: function (name, value) {
            return jQuery.css(this, name, value);
        },

        style: function (name, value) {
            if (arguments.length === 0 ) {
                return this;
            }

            for (let i = 0; i < this.length; i++) {
                return jQuery.style(this[ i ], name, value);
            }
        },

        cssNumber: function (single) {
            return jQuery.cssNumber(this, single);
        },

        remove: function (selector) {
            var node,
                nodes = selector ? this.filter(selector) : this,
                i = 0;
            
            for (; (node = nodes[ i ]) != null; i++) {
                
                if (!node.nodeType) {
                    return this;
                }

                if (node.parentNode) {
                    node.parentNode.removeChild(node);
                }
            }

            return this;
        },

        empty: function () {
            var elem,
                i = 0;
            
            for (; (elem = this[ i ]) != null; i++) {
                if (elem.nodeType === 1) {

                    // Remove any remaining nodes
                    elem.textContent = "";
                }
            }

            return this;
        },

        html: function ( value ) {
            var elem = this[ 0 ] || {},
                i = 0,
                l = this.length;
            
            if (value === undefined && elem.nodeType === 1) {
                return elem.innerHTML;
            }

            if (typeof value === "string") {

                value = jQuery.htmlPrefilter(value);

                try {
                    for (; i < l; i++) {
                        elem = this[ i ] || {};

                        // Remove element nodes and prevent memory leaks
                        if (elem.nodeType === 1) {
                            elem.innerHTML = value;
                        }
                    }

                    // If using innerHTML throws an exception, use the fallback method
                } catch (e) { };
            } 

            if (elem) {
                this.empty().append( value );
            }

            return this;
        },

        outerHTML: function (value) {
            var elem = this[ 0 ] || {},
                i = 0,
                l = this.length;
            
            if (value === undefined && elem.nodeType === 1) {
                return elem.outerHTML;
            }

            if (typeof value === "string") {

                value = jQuery.htmlPrefilter(value);

                try {
                    for (; i < l; i++) {
                        elem = this[ i ] || {};

                        // Remove element nodes and prevent memory leaks
                        if (elem.nodeType) {
                            elem.outerHTML = value;
                        }
                    }

                    // If using innerHTML throws an exception, use the fallback method
                } catch (e) { };
            }

            if (elem) {
                replaceNodes(this, value);
            }

            return this;
        },

        text: function (value) {
            var elem = this[ 0 ] || {},
                i = 0,
                text = "",
                l = this.length;

            if (value && typeof value === "boolean") {
                return elem.textContent;
            }
            
            for (; i < l; i++) {
                elem = this[ i ] || {};

                value = jQuery.htmlPrefilter(value);

                if (value === undefined) {
                    // d++; merge text in text
                    text += elem.textContent;

                } else {
                    // set textContent in elem
                    elem.textContent = value;
                }
            }

            return value === undefined ? text : this;
        },

        addClass: function (value) {
            var classes, j, elem, cur, finalValue,
                i = 0;

            value = typeof value === "string" || 
                jQuery.isNumeric(value) ? value : null;

            value = jQuery.isNumeric(value) ?
                String.prototype.trim.call(value) : value;

            classes = (value || "").replace(/\s+/g, " ");
            classes = (classes || "").split(/[, ]/g);
            classes = Filter(classes, true);

            for (; i < classes.length; i++) {
                cur = classes[ i ];

                for (elem of this) {
                    if ([].indexOf.call(elem.classList, cur) > -1) {
                        // delete duplicate && exist className
                        delete classes[ i ];
                        // Filtering classsName in Array
                        classes = Filter(classes, true);
                    }

                    // check exist attribute for [class]
                    if ( !elem.hasAttribute("class") ) {
                        elem.setAttribute("class", "");
                    }
                }
            }
            
            // final loop only for this elem target
            for (j of this) {
                // final loop only classes
                for (finalValue of classes) {
                    if (finalValue) {
                        // set classlist in elem;
                        j.classList.add(finalValue);
                    }
                }
            }

            return this;
        }
    } );


    /* Advance jQuery selectors
    */
    /* Ancestors Methods
    */
    jQuery.fn.extend({

        // Advance selector for parent methods ?
        parent: function () {
            return this.pushStack(Filter(jQuery.map(this, function( elem ) {
                var parent = elem.parentNode;
                return parent && parent.nodeType !== 11 ? parent : null;
            }), true).sort())
        },

        // Advance selector for parents methods ?
        parents: function ( selector ) {
            var parentsObject = [],
                self = this;

            jQuery.each(self, function ( _i, elem ) {
                while(elem = elem.parentNode) {
                    if (elem.nodeType === 9) continue;
                    if ( elem.nodeType === 1 ) {
                        parentsObject.push( elem );
                    } 
                }
            } );

            parentsObject.reverse();
            parentsObject = Filter(parentsObject, true);

            // get specific search HTMLEleemnt ?
            if ( selector ) {
                return this.pushStack(
                    winnow(parentsObject, selector, false)
                );
            }

            parentsObject.reverse();
            return this.pushStack( parentsObject );
        },

        // Advance selector for parentsUntil methods ?
        parentsUntil: function ( selector ) {
            var parentsUntil = [], getIndex,
                self = this.parents( selector );

            jQuery.each(this, function ( _i, elem) {
                while(elem = elem.parentElement) {
                    if (elem.tagName === self[0].tagName ) break;
                    parentsUntil.push( elem );
                }
            } );

            // Filter now parentsUntil [duplicate]
            parentsUntil = Filter(parentsUntil, true).reverse();

            // shift [] Array value for only html shift of last Index in Array
            getIndex = parentsUntil.indexOf(document.querySelector('html'));

            // delete HTMLObject for HTMLHTMLElement [html] current delete
            delete parentsUntil[getIndex >= 0 ? getIndex : null ];

            // push new [html] HTMLElement for Array [] of last Index
            parentsUntil.push( getIndex >= 0 ? document.querySelector('html') : "" );

            // now Again Filter undefined or null value remove
            parentsUntil = Filter(parentsUntil, true);

            return selector ? this.pushStack(parentsUntil) : self;
        },

        // Advance selector for parentsUntil methods ?
        closest: function ( selector ) {
            var closestObject = [],
                target = jQuery( selector );

            if ( selector ) {
                closestObject.push(
                    winnow(this.parents(), target, false)
                );
                
                closestObject.push(
                    winnow(this, target, false)
                );
            }

            closestObject = closestObject.flat(Infinity);
            closestObject = Filter(closestObject, true);

            closestObject = closestObject.filter((v, i, a) => {
                return v.nodeType === 1 && v.nodeType !== 9 && v;
            });

            return this.pushStack( closestObject );
        },

        uniqueSort: function (extra, callback) {
            return this.pushStack(
                jQuery.filter(this, extra, callback)
            );
        }
    } );

    /* has() && is() method jQuery plugins build
    */
    jQuery.fn.extend({

        has: function ( selector ) {
            return getHasOrIs(this, selector, "has");
        },

        is: function ( selector ) {
            return getHasOrIs(this, selector, "is");
        }
    } );

    /* next() && prev() methods create for jQuery plugins
    */
    jQuery.each({

        next: function ( elems ) {
            return sibling(elems, "nextSibling");
        },

        prev: function ( elems ) {
            return sibling(elems, "previousSibling");
        }

    }, function ( name, fn ) {
        jQuery.fn[ name ] = function () {
            var matched = jQuery.map(this, fn);

            return this.pushStack(matched).uniqueSort(true);
        }
    } );

    // make a function for shorthand Has && is method Hanle
    function getHasOrIs( cur, selector, dir ) {
        var matched = [], select;

        if (!selector.nodeType && typeof selector !== "string") {
            selector = null; // reset selector value if not valid
        }

        for ( let i = 0; i < cur.length; i++ ) {
            if (typeof selector === "string") {
                select = cur[ i ].querySelectorAll( selector.trim() );
            }

            if (typeof selector === "object" && 
                cur[ i ].hasChildNodes(selector)) {

                jQuery.loops(selector, function( _i, matching ) {
                    matching = matching.tagName.toLowerCase();
                    select = cur[i].querySelectorAll( matching );
                } );
            }
        
            if ( dir === "has" && selector && select.length > 0 ) {
                matched.push(jQuery.makeArray(cur[ i ]));
            }

            if (dir === "is" && typeof selector === "string") {
                return cur[ i ].matches( selector.trim() );
            }

            if (dir === "is" && typeof selector !== "string") {
                return cur[ i ].hasChildNodes( selector );
            }
        }

        matched = matched.flat( Infinity );

        return dir === "has" ? 
            cur.pushStack( matched ).uniqueSort(true) : false;
    }

    // Sibling function make shorhand selector plugins help
    function sibling (cur, dir) {
        while((cur = cur[ dir ]) && cur.nodeType !== 1) { }
        return cur;
    }
    
    /*<!================= End jQuery.fn.plugins() ===============!> */


    jQuery.textDecorate = function (txt, extra, assign) {
        var retObj = capitalizeOrTitle(txt, extra, assign);
        return removeWhiteSpace( retObj );
    };
    
    jQuery.extraTrim = function ( txt ) {
        txt = removeWhiteSpace( txt );
        return capitalizeOrTitle( txt );
    };

    jQuery.capitalize = function ( txt, extra ) {
        txt = removeWhiteSpace( txt );
        extra = !extra ? extra === false : extra;
        return capitalizeOrTitle(txt, extra);
    };

    jQuery.camelCase = function ( txt, extra ) {
        txt = removeWhiteSpace( txt );
        return capitalizeOrTitle(txt, extra, "!!!");
    };
    
    
    jQuery.jQueryExpando = jQueryExpando;
    jQuery.regularExpr = RegExpr;
    jQuery.isWindow = isWindow;
    jQuery.isFunction = isFunction;
    jQuery.parseJSON = JSON.parse;
    jQuery.type = toType;
    jQuery.Animation = Animation;
    jQuery.replaceText = replaceText;
    jQuery.isArray = Array.isArray;
    jQuery.stringJSON = JSON.stringify;

    jQuery.now = Date.now;

    jQuery.isNumeric = function ( obj ) {

        // As of jQuery 3.0, isNumeric is limited to
        // strings and numbers (primitives or objects)
        // that can be coerced to finite numbers (gh-2662)
        var type = jQuery.type( obj );
        return (type === "number" || type === "string") &&

            // parseFloat NaNs numeric-cast false positives ("")
            // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
            // subtraction forces infinities to NaN
            !isNaN(obj - parseInt( obj ));
    };

    jQuery.instanceOf = function intanceof( obj, match ) {

        if (obj == null) {
            obj + "";
        }

        var result = obj instanceof match;
        return result;
    };

    jQuery.trim = function( text ) {
        return text == null ? 
            "" : 
            (text + "").replace(RegExpr.rtrim, "");
    };


    var 

        // Map over jQuery in case of overwrite
        _jQuery = window.jQuery,

        // Map over the $ in case of overwrite
        _$ = window.$;

    jQuery.noConflict = function( deep ) {
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
} );