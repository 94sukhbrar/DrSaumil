/*!
 * jQuery JavaScript Library v3.6.0
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2021-03-02T17:08Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

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
	return arr.concat.apply( [], array );
};


var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

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
			typeof obj.item !== "function";
	};


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};


var document = window.document;



	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var i, val,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {

				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `jQuery.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[ i ] || node.getAttribute && node.getAttribute( i );
				if ( val ) {
					script.setAttribute( i, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.6.0",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
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

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	even: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return ( i + 1 ) % 2;
		} ) );
	},

	odd: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return i % 2;
		} ) );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
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
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a provided context; falls back to the global one
	// if not specified.
	globalEval: function( code, options, doc ) {
		DOMEval( code, { nonce: options && options.nonce }, doc );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
						[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return flat( ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( _i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.6
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 * Date: 2021-02-16
 */
( function( window ) {
var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	nonnativeSelectorCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ( {} ).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	pushNative = arr.push,
	push = arr.push,
	slice = arr.slice,

	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[ i ] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|" +
		"ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
	identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
		"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +

		// "Attribute values must be CSS identifiers [capture 5]
		// or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
		whitespace + "*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +

		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +

		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +

		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" +
		whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace +
		"*" ),
	rdescend = new RegExp( whitespace + "|>" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
			whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
			whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),

		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace +
			"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
			"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rhtml = /HTML$/i,
	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g" ),
	funescape = function( escape, nonHex ) {
		var high = "0x" + escape.slice( 1 ) - 0x10000;

		return nonHex ?

			// Strip the backslash prefix from a non-hex escape sequence
			nonHex :

			// Replace a hexadecimal escape sequence with the encoded Unicode code point
			// Support: IE <=11+
			// For values outside the Basic Multilingual Plane (BMP), manually construct a
			// surrogate pair
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" +
				ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	inDisabledFieldset = addCombinator(
		function( elem ) {
			return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		( arr = slice.call( preferredDoc.childNodes ) ),
		preferredDoc.childNodes
	);

	// Support: Android<4.0
	// Detect silently failing push.apply
	// eslint-disable-next-line no-unused-expressions
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			pushNative.apply( target, slice.call( els ) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;

			// Can't trust NodeList.length
			while ( ( target[ j++ ] = els[ i++ ] ) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {
		setDocument( context );
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && ( match = rquickExpr.exec( selector ) ) ) {

				// ID selector
				if ( ( m = match[ 1 ] ) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( ( elem = context.getElementById( m ) ) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && ( elem = newContext.getElementById( m ) ) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[ 2 ] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( ( m = match[ 3 ] ) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!nonnativeSelectorCache[ selector + " " ] &&
				( !rbuggyQSA || !rbuggyQSA.test( selector ) ) &&

				// Support: IE 8 only
				// Exclude object elements
				( nodeType !== 1 || context.nodeName.toLowerCase() !== "object" ) ) {

				newSelector = selector;
				newContext = context;

				// qSA considers elements outside a scoping root when evaluating child or
				// descendant combinators, which is not what we want.
				// In such cases, we work around the behavior by prefixing every selector in the
				// list with an ID selector referencing the scope context.
				// The technique has to be used as well when a leading combinator is used
				// as such selectors are not recognized by querySelectorAll.
				// Thanks to Andrew Dupont for this technique.
				if ( nodeType === 1 &&
					( rdescend.test( selector ) || rcombinators.test( selector ) ) ) {

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;

					// We can use :scope instead of the ID hack if the browser
					// supports it & if we're not changing the context.
					if ( newContext !== context || !support.scope ) {

						// Capture the context ID, setting it first if necessary
						if ( ( nid = context.getAttribute( "id" ) ) ) {
							nid = nid.replace( rcssescape, fcssescape );
						} else {
							context.setAttribute( "id", ( nid = expando ) );
						}
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[ i ] = ( nid ? "#" + nid : ":scope" ) + " " +
							toSelector( groups[ i ] );
					}
					newSelector = groups.join( "," );
				}

				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch ( qsaError ) {
					nonnativeSelectorCache( selector, true );
				} finally {
					if ( nid === expando ) {
						context.removeAttribute( "id" );
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {

		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {

			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return ( cache[ key + " " ] = value );
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement( "fieldset" );

	try {
		return !!fn( el );
	} catch ( e ) {
		return false;
	} finally {

		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}

		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split( "|" ),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[ i ] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( ( cur = cur.nextSibling ) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return ( name === "input" || name === "button" ) && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
					inDisabledFieldset( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction( function( argument ) {
		argument = +argument;
		return markFunction( function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ ( j = matchIndexes[ i ] ) ] ) {
					seed[ j ] = !( matches[ j ] = seed[ j ] );
				}
			}
		} );
	} );
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	var namespace = elem && elem.namespaceURI,
		docElem = elem && ( elem.ownerDocument || elem ).documentElement;

	// Support: IE <=8
	// Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
	// https://bugs.jquery.com/ticket/4833
	return !rhtml.test( namespace || docElem && docElem.nodeName || "HTML" );
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( doc == document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9 - 11+, Edge 12 - 18+
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( preferredDoc != document &&
		( subWindow = document.defaultView ) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	// Support: IE 8 - 11+, Edge 12 - 18+, Chrome <=16 - 25 only, Firefox <=3.6 - 31 only,
	// Safari 4 - 5 only, Opera <=11.6 - 12.x only
	// IE/Edge & older browsers don't support the :scope pseudo-class.
	// Support: Safari 6.0 only
	// Safari 6.0 supports :scope but it's an alias of :root there.
	support.scope = assert( function( el ) {
		docElem.appendChild( el ).appendChild( document.createElement( "div" ) );
		return typeof el.querySelectorAll !== "undefined" &&
			!el.querySelectorAll( ":scope fieldset div" ).length;
	} );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert( function( el ) {
		el.className = "i";
		return !el.getAttribute( "className" );
	} );

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert( function( el ) {
		el.appendChild( document.createComment( "" ) );
		return !el.getElementsByTagName( "*" ).length;
	} );

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert( function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	} );

	// ID filter and find
	if ( support.getById ) {
		Expr.filter[ "ID" ] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute( "id" ) === attrId;
			};
		};
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter[ "ID" ] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode( "id" );
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode( "id" );
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( ( elem = elems[ i++ ] ) ) {
						node = elem.getAttributeNode( "id" );
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find[ "TAG" ] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,

				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( ( elem = results[ i++ ] ) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find[ "CLASS" ] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( ( support.qsa = rnative.test( document.querySelectorAll ) ) ) {

		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert( function( el ) {

			var input;

			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll( "[msallowcapture^='']" ).length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll( "[selected]" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push( "~=" );
			}

			// Support: IE 11+, Edge 15 - 18+
			// IE 11/Edge don't find elements on a `[name='']` query in some cases.
			// Adding a temporary attribute to the document before the selection works
			// around the issue.
			// Interestingly, IE 10 & older don't seem to have the issue.
			input = document.createElement( "input" );
			input.setAttribute( "name", "" );
			el.appendChild( input );
			if ( !el.querySelectorAll( "[name='']" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*name" + whitespace + "*=" +
					whitespace + "*(?:''|\"\")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll( ":checked" ).length ) {
				rbuggyQSA.push( ":checked" );
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push( ".#.+[+~]" );
			}

			// Support: Firefox <=3.6 - 5 only
			// Old Firefox doesn't throw on a badly-escaped identifier.
			el.querySelectorAll( "\\\f" );
			rbuggyQSA.push( "[\\r\\n\\f]" );
		} );

		assert( function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement( "input" );
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll( "[name=d]" ).length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll( ":enabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll( ":disabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: Opera 10 - 11 only
			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll( "*,:x" );
			rbuggyQSA.push( ",.*:" );
		} );
	}

	if ( ( support.matchesSelector = rnative.test( ( matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector ) ) ) ) {

		assert( function( el ) {

			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		} );
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join( "|" ) );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join( "|" ) );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			) );
		} :
		function( a, b ) {
			if ( b ) {
				while ( ( b = b.parentNode ) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		compare = ( a.ownerDocument || a ) == ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			( !support.sortDetached && b.compareDocumentPosition( a ) === compare ) ) {

			// Choose the first element that is related to our preferred document
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( a == document || a.ownerDocument == preferredDoc &&
				contains( preferredDoc, a ) ) {
				return -1;
			}

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( b == document || b.ownerDocument == preferredDoc &&
				contains( preferredDoc, b ) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			return a == document ? -1 :
				b == document ? 1 :
				/* eslint-enable eqeqeq */
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( ( cur = cur.parentNode ) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( ( cur = cur.parentNode ) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[ i ] === bp[ i ] ) {
			i++;
		}

		return i ?

			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[ i ], bp[ i ] ) :

			// Otherwise nodes in our document sort first
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			ap[ i ] == preferredDoc ? -1 :
			bp[ i ] == preferredDoc ? 1 :
			/* eslint-enable eqeqeq */
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	setDocument( elem );

	if ( support.matchesSelector && documentIsHTML &&
		!nonnativeSelectorCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||

				// As well, disconnected nodes are said to be in a document
				// fragment in IE 9
				elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch ( e ) {
			nonnativeSelectorCache( expr, true );
		}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( context.ownerDocument || context ) != document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( elem.ownerDocument || elem ) != document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],

		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			( val = elem.getAttributeNode( name ) ) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return ( sel + "" ).replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( ( elem = results[ i++ ] ) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {

		// If no nodeType, this is expected to be an array
		while ( ( node = elem[ i++ ] ) ) {

			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {

		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {

			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}

	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[ 1 ] = match[ 1 ].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[ 3 ] = ( match[ 3 ] || match[ 4 ] ||
				match[ 5 ] || "" ).replace( runescape, funescape );

			if ( match[ 2 ] === "~=" ) {
				match[ 3 ] = " " + match[ 3 ] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {

			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[ 1 ] = match[ 1 ].toLowerCase();

			if ( match[ 1 ].slice( 0, 3 ) === "nth" ) {

				// nth-* requires argument
				if ( !match[ 3 ] ) {
					Sizzle.error( match[ 0 ] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[ 4 ] = +( match[ 4 ] ?
					match[ 5 ] + ( match[ 6 ] || 1 ) :
					2 * ( match[ 3 ] === "even" || match[ 3 ] === "odd" ) );
				match[ 5 ] = +( ( match[ 7 ] + match[ 8 ] ) || match[ 3 ] === "odd" );

				// other types prohibit arguments
			} else if ( match[ 3 ] ) {
				Sizzle.error( match[ 0 ] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[ 6 ] && match[ 2 ];

			if ( matchExpr[ "CHILD" ].test( match[ 0 ] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[ 3 ] ) {
				match[ 2 ] = match[ 4 ] || match[ 5 ] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&

				// Get excess from tokenize (recursively)
				( excess = tokenize( unquoted, true ) ) &&

				// advance to the next closing parenthesis
				( excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length ) ) {

				// excess is a negative index
				match[ 0 ] = match[ 0 ].slice( 0, excess );
				match[ 2 ] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() {
					return true;
				} :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				( pattern = new RegExp( "(^|" + whitespace +
					")" + className + "(" + whitespace + "|$)" ) ) && classCache(
						className, function( elem ) {
							return pattern.test(
								typeof elem.className === "string" && elem.className ||
								typeof elem.getAttribute !== "undefined" &&
									elem.getAttribute( "class" ) ||
								""
							);
				} );
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				/* eslint-disable max-len */

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
				/* eslint-enable max-len */

			};
		},

		"CHILD": function( type, what, _argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, _context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( ( node = node[ dir ] ) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}

								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || ( node[ expando ] = {} );

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								( outerCache[ node.uniqueID ] = {} );

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( ( node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								( diff = nodeIndex = 0 ) || start.pop() ) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {

							// Use previously-cached element index if available
							if ( useCache ) {

								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || ( node[ expando ] = {} );

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									( outerCache[ node.uniqueID ] = {} );

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {

								// Use the same loop as above to seek `elem` from the start
								while ( ( node = ++nodeIndex && node && node[ dir ] ||
									( diff = nodeIndex = 0 ) || start.pop() ) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] ||
												( node[ expando ] = {} );

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												( outerCache[ node.uniqueID ] = {} );

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {

			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction( function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[ i ] );
							seed[ idx ] = !( matches[ idx ] = matched[ i ] );
						}
					} ) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {

		// Potentially complex pseudos
		"not": markFunction( function( selector ) {

			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction( function( seed, matches, _context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( ( elem = unmatched[ i ] ) ) {
							seed[ i ] = !( matches[ i ] = elem );
						}
					}
				} ) :
				function( elem, _context, xml ) {
					input[ 0 ] = elem;
					matcher( input, null, xml, results );

					// Don't keep the element (issue #299)
					input[ 0 ] = null;
					return !results.pop();
				};
		} ),

		"has": markFunction( function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		} ),

		"contains": markFunction( function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || getText( elem ) ).indexOf( text ) > -1;
			};
		} ),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {

			// lang value must be a valid identifier
			if ( !ridentifier.test( lang || "" ) ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( ( elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute( "xml:lang" ) || elem.getAttribute( "lang" ) ) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( ( elem = elem.parentNode ) && elem.nodeType === 1 );
				return false;
			};
		} ),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement &&
				( !document.hasFocus || document.hasFocus() ) &&
				!!( elem.type || elem.href || ~elem.tabIndex );
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {

			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return ( nodeName === "input" && !!elem.checked ) ||
				( nodeName === "option" && !!elem.selected );
		},

		"selected": function( elem ) {

			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				// eslint-disable-next-line no-unused-expressions
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {

			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos[ "empty" ]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( ( attr = elem.getAttribute( "type" ) ) == null ||
					attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo( function() {
			return [ 0 ];
		} ),

		"last": createPositionalPseudo( function( _matchIndexes, length ) {
			return [ length - 1 ];
		} ),

		"eq": createPositionalPseudo( function( _matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		} ),

		"even": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"odd": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"lt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ?
				argument + length :
				argument > length ?
					length :
					argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"gt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} )
	}
};

Expr.pseudos[ "nth" ] = Expr.pseudos[ "eq" ];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || ( match = rcomma.exec( soFar ) ) ) {
			if ( match ) {

				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[ 0 ].length ) || soFar;
			}
			groups.push( ( tokens = [] ) );
		}

		matched = false;

		// Combinators
		if ( ( match = rcombinators.exec( soFar ) ) ) {
			matched = match.shift();
			tokens.push( {
				value: matched,

				// Cast descendant combinators to space
				type: match[ 0 ].replace( rtrim, " " )
			} );
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( ( match = matchExpr[ type ].exec( soFar ) ) && ( !preFilters[ type ] ||
				( match = preFilters[ type ]( match ) ) ) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,
					type: type,
					matches: match
				} );
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :

			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[ i ].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?

		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( ( elem = elem[ dir ] ) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || ( elem[ expando ] = {} );

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] ||
							( outerCache[ elem.uniqueID ] = {} );

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( ( oldCache = uniqueCache[ key ] ) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return ( newCache[ 2 ] = oldCache[ 2 ] );
						} else {

							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( ( newCache[ 2 ] = matcher( elem, context, xml ) ) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[ i ]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[ 0 ];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[ i ], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( ( elem = unmatched[ i ] ) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction( function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts(
				selector || "*",
				context.nodeType ? [ context ] : context,
				[]
			),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?

				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( ( elem = temp[ i ] ) ) {
					matcherOut[ postMap[ i ] ] = !( matcherIn[ postMap[ i ] ] = elem );
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {

					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( ( elem = matcherOut[ i ] ) ) {

							// Restore matcherIn since elem is not yet a final match
							temp.push( ( matcherIn[ i ] = elem ) );
						}
					}
					postFinder( null, ( matcherOut = [] ), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( ( elem = matcherOut[ i ] ) &&
						( temp = postFinder ? indexOf( seed, elem ) : preMap[ i ] ) > -1 ) {

						seed[ temp ] = !( results[ temp ] = elem );
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	} );
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[ 0 ].type ],
		implicitRelative = leadingRelative || Expr.relative[ " " ],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				( checkContext = context ).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );

			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( ( matcher = Expr.relative[ tokens[ i ].type ] ) ) {
			matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
		} else {
			matcher = Expr.filter[ tokens[ i ].type ].apply( null, tokens[ i ].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {

				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[ j ].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(

					// If the preceding token was a descendant combinator, insert an implicit any-element `*`
					tokens
						.slice( 0, i - 1 )
						.concat( { value: tokens[ i - 2 ].type === " " ? "*" : "" } )
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( ( tokens = tokens.slice( j ) ) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,

				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find[ "TAG" ]( "*", outermost ),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = ( dirruns += contextBackup == null ? 1 : Math.random() || 0.1 ),
				len = elems.length;

			if ( outermost ) {

				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				outermostContext = context == document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && ( elem = elems[ i ] ) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;

					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
					// two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					if ( !context && elem.ownerDocument != document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( ( matcher = elementMatchers[ j++ ] ) ) {
						if ( matcher( elem, context || document, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {

					// They will have gone through all possible matchers
					if ( ( elem = !matcher && elem ) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( ( matcher = setMatchers[ j++ ] ) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {

					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !( unmatched[ i ] || setMatched[ i ] ) ) {
								setMatched[ i ] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {

		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[ i ] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache(
			selector,
			matcherFromGroupMatchers( elementMatchers, setMatchers )
		);

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( ( selector = compiled.selector || selector ) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[ 0 ] = match[ 0 ].slice( 0 );
		if ( tokens.length > 2 && ( token = tokens[ 0 ] ).type === "ID" &&
			context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[ 1 ].type ] ) {

			context = ( Expr.find[ "ID" ]( token.matches[ 0 ]
				.replace( runescape, funescape ), context ) || [] )[ 0 ];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr[ "needsContext" ].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[ i ];

			// Abort if we hit a combinator
			if ( Expr.relative[ ( type = token.type ) ] ) {
				break;
			}
			if ( ( find = Expr.find[ type ] ) ) {

				// Search, expanding context for leading sibling combinators
				if ( ( seed = find(
					token.matches[ 0 ].replace( runescape, funescape ),
					rsibling.test( tokens[ 0 ].type ) && testContext( context.parentNode ) ||
						context
				) ) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split( "" ).sort( sortOrder ).join( "" ) === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert( function( el ) {

	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement( "fieldset" ) ) & 1;
} );

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert( function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute( "href" ) === "#";
} ) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	} );
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert( function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
} ) ) {
	addHandle( "value", function( elem, _name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	} );
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert( function( el ) {
	return el.getAttribute( "disabled" ) == null;
} ) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
				( val = elem.getAttributeNode( name ) ) && val.specified ?
					val.value :
					null;
		}
	} );
}

return Sizzle;

} )( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

	return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

}
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, _i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, _i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, _i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( elem.contentDocument != null &&

			// Support: IE 11+
			// <object> elements with no `data` attribute has an object
			// `contentDocument` with a `null` prototype.
			getProto( elem.contentDocument ) ) {

			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( _i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the primary Deferred
			primary = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						primary.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, primary.done( updateFunc( i ) ).resolve, primary.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( primary.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return primary.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), primary.reject );
		}

		return primary.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, _key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( _all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var documentElement = document.documentElement;



	var isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem );
		},
		composed = { composed: true };

	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	// Support: iOS 10.0-10.2 only
	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	// leading to errors. We need to check for `getRootNode`.
	if ( documentElement.getRootNode ) {
		isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem ) ||
				elem.getRootNode( composed ) === elem.ownerDocument;
		};
	}
var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			isAttached( elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = elem.nodeType &&
			( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// Support: IE <=9 only
	// IE <=9 replaces <option> tags with their contents when inserted outside of
	// the select element.
	div.innerHTML = "<option></option>";
	support.option = !!div.lastChild;
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: IE <=9 only
if ( !support.option ) {
	wrapMap.optgroup = wrapMap.option = [ 1, "<select multiple='multiple'>", "</select>" ];
}


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, attached, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		attached = isAttached( elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( attached ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 - 11+
// focus() and blur() are asynchronous, except when they are no-op.
// So expect focus to be synchronous when the element is already active,
// and blur to be synchronous when the element is not already active.
// (focus and blur are always synchronous in other supported browsers,
// this just defines when we can count on it).
function expectSync( elem, type ) {
	return ( elem === safeActiveElement() ) === ( type === "focus" );
}

// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

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
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Only attach events to objects that accept data
		if ( !acceptData( elem ) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = Object.create( null );
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( nativeEvent ),

			handlers = (
				dataPriv.get( this, "events" ) || Object.create( null )
			)[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// If the event is namespaced, then each handler is only invoked if it is
				// specially universal or its namespaces are a superset of the event's.
				if ( !event.rnamespace || handleObj.namespace === false ||
					event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
						return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
						return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {

			// Utilize native event to ensure correct state for checkable inputs
			setup: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Claim the first handler
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					// dataPriv.set( el, "click", ... )
					leverageNative( el, "click", returnTrue );
				}

				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Force setup before triggering a click
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					leverageNative( el, "click" );
				}

				// Return non-false to allow normal event-path propagation
				return true;
			},

			// For cross-browser consistency, suppress native .click() on links
			// Also prevent it if we're currently inside a leveraged native-event stack
			_default: function( event ) {
				var target = event.target;
				return rcheckableType.test( target.type ) &&
					target.click && nodeName( target, "input" ) &&
					dataPriv.get( target, "click" ) ||
					nodeName( target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative( el, type, expectSync ) {

	// Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
	if ( !expectSync ) {
		if ( dataPriv.get( el, type ) === undefined ) {
			jQuery.event.add( el, type, returnTrue );
		}
		return;
	}

	// Register the controller as a special universal handler for all event namespaces
	dataPriv.set( el, type, false );
	jQuery.event.add( el, type, {
		namespace: false,
		handler: function( event ) {
			var notAsync, result,
				saved = dataPriv.get( this, type );

			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

				// Interrupt processing of the outer synthetic .trigger()ed event
				// Saved data should be false in such cases, but might be a leftover capture object
				// from an async native handler (gh-4350)
				if ( !saved.length ) {

					// Store arguments for use when handling the inner native event
					// There will always be at least one argument (an event object), so this array
					// will not be confused with a leftover capture object.
					saved = slice.call( arguments );
					dataPriv.set( this, type, saved );

					// Trigger the native event and capture its result
					// Support: IE <=9 - 11+
					// focus() and blur() are asynchronous
					notAsync = expectSync( this, type );
					this[ type ]();
					result = dataPriv.get( this, type );
					if ( saved !== result || notAsync ) {
						dataPriv.set( this, type, false );
					} else {
						result = {};
					}
					if ( saved !== result ) {

						// Cancel the outer synthetic event
						event.stopImmediatePropagation();
						event.preventDefault();

						// Support: Chrome 86+
						// In Chrome, if an element having a focusout handler is blurred by
						// clicking outside of it, it invokes the handler synchronously. If
						// that handler calls `.remove()` on the element, the data is cleared,
						// leaving `result` undefined. We need to guard against this.
						return result && result.value;
					}

				// If this is an inner synthetic event for an event with a bubbling surrogate
				// (focus or blur), assume that the surrogate already propagated from triggering the
				// native event and prevent that from happening again here.
				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
				// bubbling surrogate propagates *after* the non-bubbling base), but that seems
				// less bad than duplication.
				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
					event.stopPropagation();
				}

			// If this is a native event triggered above, everything is now in order
			// Fire an inner synthetic event with the original arguments
			} else if ( saved.length ) {

				// ...and capture the result
				dataPriv.set( this, type, {
					value: jQuery.event.trigger(

						// Support: IE <=9 - 11+
						// Extend with the prototype to reset the above stopImmediatePropagation()
						jQuery.extend( saved[ 0 ], jQuery.Event.prototype ),
						saved.slice( 1 ),
						this
					)
				} );

				// Abort handling of the native event
				event.stopImmediatePropagation();
			}
		}
	} );
}

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
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
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
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
}, jQuery.event.addProp );

jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {
	jQuery.event.special[ type ] = {

		// Utilize native event if possible so blur/focus sequence is correct
		setup: function() {

			// Claim the first handler
			// dataPriv.set( this, "focus", ... )
			// dataPriv.set( this, "blur", ... )
			leverageNative( this, type, expectSync );

			// Return false to allow normal processing in the caller
			return false;
		},
		trigger: function() {

			// Force setup before trigger
			leverageNative( this, type );

			// Return non-false to allow normal event-path propagation
			return true;
		},

		// Suppress native focus or blur as it's already being fired
		// in leverageNative.
		_default: function() {
			return true;
		},

		delegateType: delegateType
	};
} );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.get( src );
		events = pdataOld.events;

		if ( events ) {
			dataPriv.remove( dest, "handle events" );

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = flat( args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl && !node.noModule ) {
								jQuery._evalUrl( node.src, {
									nonce: node.nonce || node.getAttribute( "nonce" )
								}, doc );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && isAttached( node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html;
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = isAttached( elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.call( elem );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		// Support: Chrome <=64
		// Don't get tricked when zoom affects offsetWidth (gh-4029)
		div.style.position = "absolute";
		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableTrDimensionsVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		},

		// Support: IE 9 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Behavior in IE 9 is more subtle than in newer versions & it passes
		// some versions of this test; make sure not to make it pass there!
		//
		// Support: Firefox 70+
		// Only Firefox includes border widths
		// in computed dimensions. (gh-4529)
		reliableTrDimensions: function() {
			var table, tr, trChild, trStyle;
			if ( reliableTrDimensionsVal == null ) {
				table = document.createElement( "table" );
				tr = document.createElement( "tr" );
				trChild = document.createElement( "div" );

				table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
				tr.style.cssText = "border:1px solid";

				// Support: Chrome 86+
				// Height set through cssText does not get applied.
				// Computed height then comes back as 0.
				tr.style.height = "1px";
				trChild.style.height = "9px";

				// Support: Android 8 Chrome 86+
				// In our bodyBackground.html iframe,
				// display for all div elements is set to "inline",
				// which causes a problem only in Android 8 Chrome 86.
				// Ensuring the div is display: block
				// gets around this issue.
				trChild.style.display = "block";

				documentElement
					.appendChild( table )
					.appendChild( tr )
					.appendChild( trChild );

				trStyle = window.getComputedStyle( tr );
				reliableTrDimensionsVal = ( parseInt( trStyle.height, 10 ) +
					parseInt( trStyle.borderTopWidth, 10 ) +
					parseInt( trStyle.borderBottomWidth, 10 ) ) === tr.offsetHeight;

				documentElement.removeChild( table );
			}
			return reliableTrDimensionsVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !isAttached( elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style,
	vendorProps = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name ) {

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function finalPropName( name ) {
	var final = jQuery.cssProps[ name ] || vendorProps[ name ];

	if ( final ) {
		return final;
	}
	if ( name in emptyStyle ) {
		return name;
	}
	return vendorProps[ name ] = vendorPropName( name ) || name;
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	};

function setPositiveNumber( _elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5

		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
		// Use an explicit zero to avoid NaN (gh-3964)
		) ) || 0;
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),

		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
		// Fake content-box until we know it's needed to know the true value.
		boxSizingNeeded = !support.boxSizingReliable() || extra,
		isBorderBox = boxSizingNeeded &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox,

		val = curCSS( elem, dimension, styles ),
		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}


	// Support: IE 9 - 11 only
	// Use offsetWidth/offsetHeight for when box sizing is unreliable.
	// In those cases, the computed value can be trusted to be border-box.
	if ( ( !support.boxSizingReliable() && isBorderBox ||

		// Support: IE 10 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Interestingly, in some cases IE 9 doesn't suffer from this issue.
		!support.reliableTrDimensions() && nodeName( elem, "tr" ) ||

		// Fall back to offsetWidth/offsetHeight when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		val === "auto" ||

		// Support: Android <=4.1 - 4.3 only
		// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&

		// Make sure the element is visible & connected
		elem.getClientRects().length ) {

		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Where available, offsetWidth/offsetHeight approximate border box dimensions.
		// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
		// retrieved value as a content box dimension.
		valueIsBorderBox = offsetProp in elem;
		if ( valueIsBorderBox ) {
			val = elem[ offsetProp ];
		}
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"gridArea": true,
		"gridColumn": true,
		"gridColumnEnd": true,
		"gridColumnStart": true,
		"gridRow": true,
		"gridRowEnd": true,
		"gridRowStart": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
			// "px" to a few hardcoded values.
			if ( type === "number" && !isCustomProp ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( _i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
					swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, dimension, extra );
					} ) :
					getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),

				// Only read styles.position if the test has a chance to fail
				// to avoid forcing a reflow.
				scrollboxSizeBuggy = !support.scrollboxSize() &&
					styles.position === "absolute",

				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
				boxSizingNeeded = scrollboxSizeBuggy || extra,
				isBorderBox = boxSizingNeeded &&
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra ?
					boxModelAdjustment(
						elem,
						dimension,
						extra,
						isBorderBox,
						styles
					) :
					0;

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && scrollboxSizeBuggy ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 && (
				jQuery.cssHooks[ tween.prop ] ||
					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

				/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
					animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};

		doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( _i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( _i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || Object.create( null ) )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {

				// Handle: regular nodes (via `this.ownerDocument`), window
				// (via `this.document`) & document (via `this`).
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = { guid: Date.now() };

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, parserErrorElem;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {}

	parserErrorElem = xml && xml.getElementsByTagName( "parsererror" )[ 0 ];
	if ( !xml || parserErrorElem ) {
		jQuery.error( "Invalid XML: " + (
			parserErrorElem ?
				jQuery.map( parserErrorElem.childNodes, function( el ) {
					return el.textContent;
				} ).join( "\n" ) :
				data
		) );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	if ( a == null ) {
		return "";
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} ).filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} ).map( function( _i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );

originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
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
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
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
			"text xml": jQuery.parseXML
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

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
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

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
									( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
										.concat( match[ 2 ] );
							}
						}
						match = responseHeaders[ key.toLowerCase() + " " ];
					}
					return match == null ? null : match.join( ", " );
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

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
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce.guid++ ) +
					uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Use a noop converter for missing script but not if jsonp
			if ( !isSuccess &&
				jQuery.inArray( "script", s.dataTypes ) > -1 &&
				jQuery.inArray( "json", s.dataTypes ) < 0 ) {
				s.converters[ "text script" ] = function() {};
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( _i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );

jQuery.ajaxPrefilter( function( s ) {
	var i;
	for ( i in s.headers ) {
		if ( i.toLowerCase() === "content-type" ) {
			s.contentType = s.headers[ i ] || "";
		}
	}
} );


jQuery._evalUrl = function( url, options, doc ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,

		// Only evaluate the response if it is successful (gh-4126)
		// dataFilter is not invoked for failure responses, so using it instead
		// of the default converter is kludgy but it works.
		converters: {
			"text script": function() {}
		},
		dataFilter: function( response ) {
			jQuery.globalEval( response, options, doc );
		}
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
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
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain or forced-by-attrs requests
	if ( s.crossDomain || s.scriptAttrs ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" )
					.attr( s.scriptAttrs || {} )
					.prop( { charset: s.scriptCharset, src: s.url } )
					.on( "load error", callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					} );

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce.guid++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
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
		if ( !elem.getClientRects().length ) {
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
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
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
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( _i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( {
		padding: "inner" + name,
		content: type,
		"": "outer" + name
	}, function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( _i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );

jQuery.each(
	( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( _i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	}
);




// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};

jQuery.trim = function( text ) {
	return text == null ?
		"" :
		( text + "" ).replace( rtrim, "" );
};



// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === "undefined" ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

;/*! Image Map Resizer
 *  Desc: Resize HTML imageMap to scaled image.
 *  Copyright: (c) 2014-15 David J. Bradshaw - dave@bradshaw.net
 *  License: MIT
 */

;(function() {
  'use strict'

  function scaleImageMap() {
    function resizeMap() {
      function resizeAreaTag(cachedAreaCoords, idx) {
        function scale(coord) {
          var dimension = 1 === (isWidth = 1 - isWidth) ? 'width' : 'height'
          return (
            padding[dimension] +
            Math.floor(Number(coord) * scalingFactor[dimension])
          )
        }

        var isWidth = 0
        areas[idx].coords = cachedAreaCoords
          .split(',')
          .map(scale)
          .join(',')
      }

      var scalingFactor = {
        width: image.width / image.naturalWidth,
        height: image.height / image.naturalHeight,
      }

      var padding = {
        width: parseInt(
          window.getComputedStyle(image, null).getPropertyValue('padding-left'),
          10
        ),
        height: parseInt(
          window.getComputedStyle(image, null).getPropertyValue('padding-top'),
          10
        ),
      }

      cachedAreaCoordsArray.forEach(resizeAreaTag)
    }

    function getCoords(e) {
      //Normalize coord-string to csv format without any space chars
      return e.coords.replace(/ *, */g, ',').replace(/ +/g, ',')
    }

    function debounce() {
      clearTimeout(timer)
      timer = setTimeout(resizeMap, 250)
    }

    function start() {
      if (
        image.width !== image.naturalWidth ||
        image.height !== image.naturalHeight
      ) {
        resizeMap()
      }
    }

    function addEventListeners() {
      image.addEventListener('load', resizeMap, false) //Detect late image loads in IE11
      window.addEventListener('focus', resizeMap, false) //Cope with window being resized whilst on another tab
      window.addEventListener('resize', debounce, false)
      window.addEventListener('readystatechange', resizeMap, false)
      document.addEventListener('fullscreenchange', resizeMap, false)
    }

    function beenHere() {
      return 'function' === typeof map._resize
    }

    function getImg(name) {
      return document.querySelector('img[usemap="' + name + '"]')
    }

    function setup() {
      areas = map.getElementsByTagName('area')
      cachedAreaCoordsArray = Array.prototype.map.call(areas, getCoords)
      image = getImg('#' + map.name) || getImg(map.name)
      map._resize = resizeMap //Bind resize method to HTML map element
    }

    var /*jshint validthis:true */
      map = this,
      areas = null,
      cachedAreaCoordsArray = null,
      image = null,
      timer = null

    if (!beenHere()) {
      setup()
      addEventListeners()
      start()
    } else {
      map._resize() //Already setup, so just resize map
    }
  }

  function factory() {
    function chkMap(element) {
      if (!element.tagName) {
        throw new TypeError('Object is not a valid DOM element')
      } else if ('MAP' !== element.tagName.toUpperCase()) {
        throw new TypeError(
          'Expected <MAP> tag, found <' + element.tagName + '>.'
        )
      }
    }

    function init(element) {
      if (element) {
        chkMap(element)
        scaleImageMap.call(element)
        maps.push(element)
      }
    }

    var maps

    return function imageMapResizeF(target) {
      maps = [] // Only return maps from this call

      switch (typeof target) {
        case 'undefined':
        case 'string':
          Array.prototype.forEach.call(
            document.querySelectorAll(target || 'map'),
            init
          )
          break
        case 'object':
          init(target)
          break
        default:
          throw new TypeError('Unexpected data type (' + typeof target + ').')
      }

      return maps
    }
  }

  if (typeof define === 'function' && define.amd) {
    define([], factory)
  } else if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory() //Node for browserfy
  } else {
    window.imageMapResize = factory()
  }

  if ('jQuery' in window) {
    window.jQuery.fn.imageMapResize = function $imageMapResizeF() {
      return this.filter('map')
        .each(scaleImageMap)
        .end()
    }
  }
})()

;/*! LeaderLine v1.0.5 (c) anseki https://anseki.github.io/leader-line/ */
var LeaderLine=function(){"use strict";var te,g,y,S,_,o,t,h,f,p,a,i,l,v="leader-line",M=1,I=2,C=3,L=4,n={top:M,right:I,bottom:C,left:L},A=1,V=2,P=3,N=4,T=5,m={straight:A,arc:V,fluid:P,magnet:N,grid:T},ne="behind",r=v+"-defs",s='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="leader-line-defs"><style><![CDATA[.leader-line{position:absolute;overflow:visible!important;pointer-events:none!important;font-size:16px}#leader-line-defs{width:0;height:0;position:absolute;left:0;top:0}.leader-line-line-path{fill:none}.leader-line-mask-bg-rect{fill:#fff}.leader-line-caps-mask-anchor,.leader-line-caps-mask-marker-shape{fill:#000}.leader-line-caps-mask-anchor{stroke:#000}.leader-line-caps-mask-line,.leader-line-plugs-face{stroke:transparent}.leader-line-line-mask-shape{stroke:#fff}.leader-line-line-outline-mask-shape{stroke:#000}.leader-line-plug-mask-shape{fill:#fff;stroke:#000}.leader-line-plug-outline-mask-shape{fill:#000;stroke:#fff}.leader-line-areaAnchor{position:absolute;overflow:visible!important}]]></style><defs><circle id="leader-line-disc" cx="0" cy="0" r="5"/><rect id="leader-line-square" x="-5" y="-5" width="10" height="10"/><polygon id="leader-line-arrow1" points="-8,-8 8,0 -8,8 -5,0"/><polygon id="leader-line-arrow2" points="-4,-8 4,0 -4,8 -7,5 -2,0 -7,-5"/><polygon id="leader-line-arrow3" points="-4,-5 8,0 -4,5"/><g id="leader-line-hand"><path style="fill: #fcfcfc" d="M9.19 11.14h4.75c1.38 0 2.49-1.11 2.49-2.49 0-.51-.15-.98-.41-1.37h1.3c1.38 0 2.49-1.11 2.49-2.49s-1.11-2.53-2.49-2.53h1.02c1.38 0 2.49-1.11 2.49-2.49s-1.11-2.49-2.49-2.49h14.96c1.37 0 2.49-1.11 2.49-2.49s-1.11-2.49-2.49-2.49H16.58C16-9.86 14.28-11.14 9.7-11.14c-4.79 0-6.55 3.42-7.87 4.73H-2.14v13.23h3.68C3.29 9.97 5.47 11.14 9.19 11.14L9.19 11.14Z"/><path style="fill: black" d="M13.95 12c1.85 0 3.35-1.5 3.35-3.35 0-.17-.02-.34-.04-.51h.07c1.85 0 3.35-1.5 3.35-3.35 0-.79-.27-1.51-.72-2.08 1.03-.57 1.74-1.67 1.74-2.93 0-.59-.16-1.15-.43-1.63h12.04c1.85 0 3.35-1.5 3.35-3.35 0-1.85-1.5-3.35-3.35-3.35H17.2C16.26-10.93 13.91-12 9.7-12 5.36-12 3.22-9.4 1.94-7.84c0 0-.29.33-.5.57-.63 0-3.58 0-3.58 0C-2.61-7.27-3-6.88-3-6.41v13.23c0 .47.39.86.86.86 0 0 2.48 0 3.2 0C2.9 10.73 5.29 12 9.19 12L13.95 12ZM9.19 10.28c-3.46 0-5.33-1.05-6.9-3.87-.15-.27-.44-.44-.75-.44 0 0-1.81 0-2.82 0V-5.55c1.06 0 3.11 0 3.11 0 .25 0 .44-.06.61-.25l.83-.95c1.23-1.49 2.91-3.53 6.43-3.53 3.45 0 4.9.74 5.57 1.72h-4.3c-.48 0-.86.38-.86.86s.39.86.86.86h22.34c.9 0 1.63.73 1.63 1.63 0 .9-.73 1.63-1.63 1.63H15.83c-.48 0-.86.38-.86.86 0 .47.39.86.86.86h2.52c.9 0 1.63.73 1.63 1.63s-.73 1.63-1.63 1.63h-3.12c-.48 0-.86.38-.86.86 0 .47.39.86.86.86h2.11c.88 0 1.63.76 1.63 1.67 0 .9-.73 1.63-1.63 1.63h-3.2c-.48 0-.86.39-.86.86 0 .47.39.86.86.86h1.36c.05.16.09.34.09.51 0 .9-.73 1.63-1.63 1.63C13.95 10.28 9.19 10.28 9.19 10.28Z"/></g><g id="leader-line-crosshair"><path d="M0-78.97c-43.54 0-78.97 35.43-78.97 78.97 0 43.54 35.43 78.97 78.97 78.97s78.97-35.43 78.97-78.97C78.97-43.54 43.55-78.97 0-78.97ZM76.51-1.21h-9.91v-9.11h-2.43v9.11h-11.45c-.64-28.12-23.38-50.86-51.5-51.5V-64.17h9.11V-66.6h-9.11v-9.91C42.46-75.86 75.86-42.45 76.51-1.21ZM-1.21-30.76h-9.11v2.43h9.11V-4.2c-1.44.42-2.57 1.54-2.98 2.98H-28.33v-9.11h-2.43v9.11H-50.29C-49.65-28-27.99-49.65-1.21-50.29V-30.76ZM-30.76 1.21v9.11h2.43v-9.11H-4.2c.42 1.44 1.54 2.57 2.98 2.98v24.13h-9.11v2.43h9.11v19.53C-27.99 49.65-49.65 28-50.29 1.21H-30.76ZM1.22 30.75h9.11v-2.43h-9.11V4.2c1.44-.42 2.56-1.54 2.98-2.98h24.13v9.11h2.43v-9.11h19.53C49.65 28 28 49.65 1.22 50.29V30.75ZM30.76-1.21v-9.11h-2.43v9.11H4.2c-.42-1.44-1.54-2.56-2.98-2.98V-28.33h9.11v-2.43h-9.11V-50.29C28-49.65 49.65-28 50.29-1.21H30.76ZM-1.21-76.51v9.91h-9.11v2.43h9.11v11.45c-28.12.64-50.86 23.38-51.5 51.5H-64.17v-9.11H-66.6v9.11h-9.91C-75.86-42.45-42.45-75.86-1.21-76.51ZM-76.51 1.21h9.91v9.11h2.43v-9.11h11.45c.64 28.12 23.38 50.86 51.5 51.5v11.45h-9.11v2.43h9.11v9.91C-42.45 75.86-75.86 42.45-76.51 1.21ZM1.22 76.51v-9.91h9.11v-2.43h-9.11v-11.45c28.12-.64 50.86-23.38 51.5-51.5h11.45v9.11h2.43v-9.11h9.91C75.86 42.45 42.45 75.86 1.22 76.51Z"/><path d="M0 83.58-7.1 96 7.1 96Z"/><path d="M0-83.58 7.1-96-7.1-96"/><path d="M83.58 0 96 7.1 96-7.1Z"/><path d="M-83.58 0-96-7.1-96 7.1Z"/></g></defs></svg>',ae={disc:{elmId:"leader-line-disc",noRotate:!0,bBox:{left:-5,top:-5,width:10,height:10,right:5,bottom:5},widthR:2.5,heightR:2.5,bCircle:5,sideLen:5,backLen:5,overhead:0,outlineBase:1,outlineMax:4},square:{elmId:"leader-line-square",noRotate:!0,bBox:{left:-5,top:-5,width:10,height:10,right:5,bottom:5},widthR:2.5,heightR:2.5,bCircle:5,sideLen:5,backLen:5,overhead:0,outlineBase:1,outlineMax:4},arrow1:{elmId:"leader-line-arrow1",bBox:{left:-8,top:-8,width:16,height:16,right:8,bottom:8},widthR:4,heightR:4,bCircle:8,sideLen:8,backLen:8,overhead:8,outlineBase:2,outlineMax:1.5},arrow2:{elmId:"leader-line-arrow2",bBox:{left:-7,top:-8,width:11,height:16,right:4,bottom:8},widthR:2.75,heightR:4,bCircle:8,sideLen:8,backLen:7,overhead:4,outlineBase:1,outlineMax:1.75},arrow3:{elmId:"leader-line-arrow3",bBox:{left:-4,top:-5,width:12,height:10,right:8,bottom:5},widthR:3,heightR:2.5,bCircle:8,sideLen:5,backLen:4,overhead:8,outlineBase:1,outlineMax:2.5},hand:{elmId:"leader-line-hand",bBox:{left:-3,top:-12,width:40,height:24,right:37,bottom:12},widthR:10,heightR:6,bCircle:37,sideLen:12,backLen:3,overhead:37},crosshair:{elmId:"leader-line-crosshair",noRotate:!0,bBox:{left:-96,top:-96,width:192,height:192,right:96,bottom:96},widthR:48,heightR:48,bCircle:96,sideLen:96,backLen:96,overhead:0}},E={behind:ne,disc:"disc",square:"square",arrow1:"arrow1",arrow2:"arrow2",arrow3:"arrow3",hand:"hand",crosshair:"crosshair"},ie={disc:"disc",square:"square",arrow1:"arrow1",arrow2:"arrow2",arrow3:"arrow3",hand:"hand",crosshair:"crosshair"},W=[M,I,C,L],x="auto",oe={x:"left",y:"top",width:"width",height:"height"},B=80,R=4,F=5,G=120,D=8,z=3.75,j=10,H=30,U=.5522847,Z=.25*Math.PI,u=/^\s*(\-?[\d\.]+)\s*(\%)?\s*$/,b="http://www.w3.org/2000/svg",e="-ms-scroll-limit"in document.documentElement.style&&"-ms-ime-align"in document.documentElement.style&&!window.navigator.msPointerEnabled,le=!e&&!!document.uniqueID,re="MozAppearance"in document.documentElement.style,se=!(e||re||!window.chrome||!window.CSS),ue=!e&&!le&&!re&&!se&&!window.chrome&&"WebkitAppearance"in document.documentElement.style,he=le||e?.2:.1,pe={path:P,lineColor:"coral",lineSize:4,plugSE:[ne,"arrow1"],plugSizeSE:[1,1],lineOutlineEnabled:!1,lineOutlineColor:"indianred",lineOutlineSize:.25,plugOutlineEnabledSE:[!1,!1],plugOutlineSizeSE:[1,1]},k=(a={}.toString,i={}.hasOwnProperty.toString,l=i.call(Object),function(e){var t,n;return e&&"[object Object]"===a.call(e)&&(!(t=Object.getPrototypeOf(e))||(n=t.hasOwnProperty("constructor")&&t.constructor)&&"function"==typeof n&&i.call(n)===l)}),w=Number.isFinite||function(e){return"number"==typeof e&&window.isFinite(e)},c=function(){var e,x={ease:[.25,.1,.25,1],linear:[0,0,1,1],"ease-in":[.42,0,1,1],"ease-out":[0,0,.58,1],"ease-in-out":[.42,0,.58,1]},b=1e3/60/2,t=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||function(e){setTimeout(e,b)},n=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame||function(e){clearTimeout(e)},a=Number.isFinite||function(e){return"number"==typeof e&&window.isFinite(e)},k=[],w=0;function l(){var i=Date.now(),o=!1;e&&(n.call(window,e),e=null),k.forEach(function(e){var t,n,a;if(e.framesStart){if((t=i-e.framesStart)>=e.duration&&e.count&&e.loopsLeft<=1)return a=e.frames[e.lastFrame=e.reverse?0:e.frames.length-1],e.frameCallback(a.value,!0,a.timeRatio,a.outputRatio),void(e.framesStart=null);if(t>e.duration){if(n=Math.floor(t/e.duration),e.count){if(n>=e.loopsLeft)return a=e.frames[e.lastFrame=e.reverse?0:e.frames.length-1],e.frameCallback(a.value,!0,a.timeRatio,a.outputRatio),void(e.framesStart=null);e.loopsLeft-=n}e.framesStart+=e.duration*n,t=i-e.framesStart}e.reverse&&(t=e.duration-t),a=e.frames[e.lastFrame=Math.round(t/b)],!1!==e.frameCallback(a.value,!1,a.timeRatio,a.outputRatio)?o=!0:e.framesStart=null}}),o&&(e=t.call(window,l))}function O(e,t){e.framesStart=Date.now(),null!=t&&(e.framesStart-=e.duration*(e.reverse?1-t:t)),e.loopsLeft=e.count,e.lastFrame=null,l()}return{add:function(n,e,t,a,i,o,l){var r,s,u,h,p,c,d,f,y,S,m,g,_,v=++w;function E(e,t){return{value:n(t),timeRatio:e,outputRatio:t}}if("string"==typeof i&&(i=x[i]),n=n||function(){},t<b)s=[E(0,0),E(1,1)];else{if(u=b/t,s=[E(0,0)],0===i[0]&&0===i[1]&&1===i[2]&&1===i[3])for(p=u;p<=1;p+=u)s.push(E(p,p));else for(c=h=(p=u)/10;c<=1;c+=h)void 0,S=(y=(f=c)*f)*f,_=3*(m=1-f)*y,p<=(d={x:(g=3*(m*m)*f)*i[0]+_*i[2]+S,y:g*i[1]+_*i[3]+S}).x&&(s.push(E(d.x,d.y)),p+=u);s.push(E(1,1))}return r={animId:v,frameCallback:e,duration:t,count:a,frames:s,reverse:!!o},k.push(r),!1!==l&&O(r,l),v},remove:function(n){var a;k.some(function(e,t){return e.animId===n&&(a=t,!(e.framesStart=null))})&&k.splice(a,1)},start:function(t,n,a){k.some(function(e){return e.animId===t&&(e.reverse=!!n,O(e,a),!0)})},stop:function(t,n){var a;return k.some(function(e){return e.animId===t&&(n?null!=e.lastFrame&&(a=e.frames[e.lastFrame].timeRatio):(a=(Date.now()-e.framesStart)/e.duration,e.reverse&&(a=1-a),a<0?a=0:1<a&&(a=1)),!(e.framesStart=null))}),a},validTiming:function(t){return"string"==typeof t?x[t]:Array.isArray(t)&&[0,1,2,3].every(function(e){return a(t[e])&&0<=t[e]&&t[e]<=1})?[t[0],t[1],t[2],t[3]]:null}}}(),d=function(e){e.SVGPathElement.prototype.getPathData&&e.SVGPathElement.prototype.setPathData||function(){var i={Z:"Z",M:"M",L:"L",C:"C",Q:"Q",A:"A",H:"H",V:"V",S:"S",T:"T",z:"Z",m:"m",l:"l",c:"c",q:"q",a:"a",h:"h",v:"v",s:"s",t:"t"},o=function(e){this._string=e,this._currentIndex=0,this._endIndex=this._string.length,this._prevCommand=null,this._skipOptionalSpaces()},l=-1!==e.navigator.userAgent.indexOf("MSIE ");o.prototype={parseSegment:function(){var e=this._string[this._currentIndex],t=i[e]?i[e]:null;if(null===t){if(null===this._prevCommand)return null;if(null===(t=("+"===e||"-"===e||"."===e||"0"<=e&&e<="9")&&"Z"!==this._prevCommand?"M"===this._prevCommand?"L":"m"===this._prevCommand?"l":this._prevCommand:null))return null}else this._currentIndex+=1;var n=null,a=(this._prevCommand=t).toUpperCase();return"H"===a||"V"===a?n=[this._parseNumber()]:"M"===a||"L"===a||"T"===a?n=[this._parseNumber(),this._parseNumber()]:"S"===a||"Q"===a?n=[this._parseNumber(),this._parseNumber(),this._parseNumber(),this._parseNumber()]:"C"===a?n=[this._parseNumber(),this._parseNumber(),this._parseNumber(),this._parseNumber(),this._parseNumber(),this._parseNumber()]:"A"===a?n=[this._parseNumber(),this._parseNumber(),this._parseNumber(),this._parseArcFlag(),this._parseArcFlag(),this._parseNumber(),this._parseNumber()]:"Z"===a&&(this._skipOptionalSpaces(),n=[]),null===n||0<=n.indexOf(null)?null:{type:t,values:n}},hasMoreData:function(){return this._currentIndex<this._endIndex},peekSegmentType:function(){var e=this._string[this._currentIndex];return i[e]?i[e]:null},initialCommandIsMoveTo:function(){if(!this.hasMoreData())return!0;var e=this.peekSegmentType();return"M"===e||"m"===e},_isCurrentSpace:function(){var e=this._string[this._currentIndex];return e<=" "&&(" "===e||"\n"===e||"\t"===e||"\r"===e||"\f"===e)},_skipOptionalSpaces:function(){for(;this._currentIndex<this._endIndex&&this._isCurrentSpace();)this._currentIndex+=1;return this._currentIndex<this._endIndex},_skipOptionalSpacesOrDelimiter:function(){return!(this._currentIndex<this._endIndex&&!this._isCurrentSpace()&&","!==this._string[this._currentIndex])&&(this._skipOptionalSpaces()&&this._currentIndex<this._endIndex&&","===this._string[this._currentIndex]&&(this._currentIndex+=1,this._skipOptionalSpaces()),this._currentIndex<this._endIndex)},_parseNumber:function(){var e=0,t=0,n=1,a=0,i=1,o=1,l=this._currentIndex;if(this._skipOptionalSpaces(),this._currentIndex<this._endIndex&&"+"===this._string[this._currentIndex]?this._currentIndex+=1:this._currentIndex<this._endIndex&&"-"===this._string[this._currentIndex]&&(this._currentIndex+=1,i=-1),this._currentIndex===this._endIndex||(this._string[this._currentIndex]<"0"||"9"<this._string[this._currentIndex])&&"."!==this._string[this._currentIndex])return null;for(var r=this._currentIndex;this._currentIndex<this._endIndex&&"0"<=this._string[this._currentIndex]&&this._string[this._currentIndex]<="9";)this._currentIndex+=1;if(this._currentIndex!==r)for(var s=this._currentIndex-1,u=1;r<=s;)t+=u*(this._string[s]-"0"),s-=1,u*=10;if(this._currentIndex<this._endIndex&&"."===this._string[this._currentIndex]){if(this._currentIndex+=1,this._currentIndex>=this._endIndex||this._string[this._currentIndex]<"0"||"9"<this._string[this._currentIndex])return null;for(;this._currentIndex<this._endIndex&&"0"<=this._string[this._currentIndex]&&this._string[this._currentIndex]<="9";)n*=10,a+=(this._string.charAt(this._currentIndex)-"0")/n,this._currentIndex+=1}if(this._currentIndex!==l&&this._currentIndex+1<this._endIndex&&("e"===this._string[this._currentIndex]||"E"===this._string[this._currentIndex])&&"x"!==this._string[this._currentIndex+1]&&"m"!==this._string[this._currentIndex+1]){if(this._currentIndex+=1,"+"===this._string[this._currentIndex]?this._currentIndex+=1:"-"===this._string[this._currentIndex]&&(this._currentIndex+=1,o=-1),this._currentIndex>=this._endIndex||this._string[this._currentIndex]<"0"||"9"<this._string[this._currentIndex])return null;for(;this._currentIndex<this._endIndex&&"0"<=this._string[this._currentIndex]&&this._string[this._currentIndex]<="9";)e*=10,e+=this._string[this._currentIndex]-"0",this._currentIndex+=1}var h=t+a;return h*=i,e&&(h*=Math.pow(10,o*e)),l===this._currentIndex?null:(this._skipOptionalSpacesOrDelimiter(),h)},_parseArcFlag:function(){if(this._currentIndex>=this._endIndex)return null;var e=null,t=this._string[this._currentIndex];if(this._currentIndex+=1,"0"===t)e=0;else{if("1"!==t)return null;e=1}return this._skipOptionalSpacesOrDelimiter(),e}};var a=function(e){if(!e||0===e.length)return[];var t=new o(e),n=[];if(t.initialCommandIsMoveTo())for(;t.hasMoreData();){var a=t.parseSegment();if(null===a)break;n.push(a)}return n},n=e.SVGPathElement.prototype.setAttribute,r=e.SVGPathElement.prototype.removeAttribute,d=e.Symbol?e.Symbol():"__cachedPathData",f=e.Symbol?e.Symbol():"__cachedNormalizedPathData",U=function(e,t,n,a,i,o,l,r,s,u){var h,p,c,d,f,y=function(e,t,n){return{x:e*Math.cos(n)-t*Math.sin(n),y:e*Math.sin(n)+t*Math.cos(n)}},S=(h=l,Math.PI*h/180),m=[];if(u)p=u[0],c=u[1],d=u[2],f=u[3];else{var g=y(e,t,-S);e=g.x,t=g.y;var _=y(n,a,-S),v=(e-(n=_.x))/2,E=(t-(a=_.y))/2,x=v*v/(i*i)+E*E/(o*o);1<x&&(i*=x=Math.sqrt(x),o*=x);var b=i*i,k=o*o,w=b*k-b*E*E-k*v*v,O=b*E*E+k*v*v,M=(r===s?-1:1)*Math.sqrt(Math.abs(w/O));d=M*i*E/o+(e+n)/2,f=M*-o*v/i+(t+a)/2,p=Math.asin(parseFloat(((t-f)/o).toFixed(9))),c=Math.asin(parseFloat(((a-f)/o).toFixed(9))),e<d&&(p=Math.PI-p),n<d&&(c=Math.PI-c),p<0&&(p=2*Math.PI+p),c<0&&(c=2*Math.PI+c),s&&c<p&&(p-=2*Math.PI),!s&&p<c&&(c-=2*Math.PI)}var I=c-p;if(Math.abs(I)>120*Math.PI/180){var C=c,L=n,A=a;c=s&&p<c?p+120*Math.PI/180*1:p+120*Math.PI/180*-1,n=d+i*Math.cos(c),a=f+o*Math.sin(c),m=U(n,a,L,A,i,o,l,0,s,[c,C,d,f])}I=c-p;var V=Math.cos(p),P=Math.sin(p),N=Math.cos(c),T=Math.sin(c),W=Math.tan(I/4),B=4/3*i*W,R=4/3*o*W,F=[e,t],G=[e+B*P,t-R*V],D=[n+B*T,a-R*N],z=[n,a];if(G[0]=2*F[0]-G[0],G[1]=2*F[1]-G[1],u)return[G,D,z].concat(m);m=[G,D,z].concat(m).join().split(",");var j=[],H=[];return m.forEach(function(e,t){t%2?H.push(y(m[t-1],m[t],S).y):H.push(y(m[t],m[t+1],S).x),6===H.length&&(j.push(H),H=[])}),j},y=function(e){return e.map(function(e){return{type:e.type,values:Array.prototype.slice.call(e.values)}})},S=function(e){var S=[],m=null,g=null,_=null,v=null,E=null,x=null,b=null;return e.forEach(function(e){if("M"===e.type){var t=e.values[0],n=e.values[1];S.push({type:"M",values:[t,n]}),v=x=t,E=b=n}else if("C"===e.type){var a=e.values[0],i=e.values[1],o=e.values[2],l=e.values[3];t=e.values[4],n=e.values[5];S.push({type:"C",values:[a,i,o,l,t,n]}),g=o,_=l,v=t,E=n}else if("L"===e.type){t=e.values[0],n=e.values[1];S.push({type:"L",values:[t,n]}),v=t,E=n}else if("H"===e.type){t=e.values[0];S.push({type:"L",values:[t,E]}),v=t}else if("V"===e.type){n=e.values[0];S.push({type:"L",values:[v,n]}),E=n}else if("S"===e.type){o=e.values[0],l=e.values[1],t=e.values[2],n=e.values[3];"C"===m||"S"===m?(r=v+(v-g),s=E+(E-_)):(r=v,s=E),S.push({type:"C",values:[r,s,o,l,t,n]}),g=o,_=l,v=t,E=n}else if("T"===e.type){t=e.values[0],n=e.values[1];"Q"===m||"T"===m?(a=v+(v-g),i=E+(E-_)):(a=v,i=E);var r=v+2*(a-v)/3,s=E+2*(i-E)/3,u=t+2*(a-t)/3,h=n+2*(i-n)/3;S.push({type:"C",values:[r,s,u,h,t,n]}),g=a,_=i,v=t,E=n}else if("Q"===e.type){a=e.values[0],i=e.values[1],t=e.values[2],n=e.values[3],r=v+2*(a-v)/3,s=E+2*(i-E)/3,u=t+2*(a-t)/3,h=n+2*(i-n)/3;S.push({type:"C",values:[r,s,u,h,t,n]}),g=a,_=i,v=t,E=n}else if("A"===e.type){var p=e.values[0],c=e.values[1],d=e.values[2],f=e.values[3],y=e.values[4];t=e.values[5],n=e.values[6];if(0===p||0===c)S.push({type:"C",values:[v,E,t,n,t,n]}),v=t,E=n;else if(v!==t||E!==n)U(v,E,t,n,p,c,d,f,y).forEach(function(e){S.push({type:"C",values:e}),v=t,E=n})}else"Z"===e.type&&(S.push(e),v=x,E=b);m=e.type}),S};e.SVGPathElement.prototype.setAttribute=function(e,t){"d"===e&&(this[d]=null,this[f]=null),n.call(this,e,t)},e.SVGPathElement.prototype.removeAttribute=function(e,t){"d"===e&&(this[d]=null,this[f]=null),r.call(this,e)},e.SVGPathElement.prototype.getPathData=function(e){if(e&&e.normalize){if(this[f])return y(this[f]);this[d]?n=y(this[d]):(n=a(this.getAttribute("d")||""),this[d]=y(n));var t=S((s=[],c=p=h=u=null,n.forEach(function(e){var t=e.type;if("M"===t){var n=e.values[0],a=e.values[1];s.push({type:"M",values:[n,a]}),u=p=n,h=c=a}else if("m"===t)n=u+e.values[0],a=h+e.values[1],s.push({type:"M",values:[n,a]}),u=p=n,h=c=a;else if("L"===t)n=e.values[0],a=e.values[1],s.push({type:"L",values:[n,a]}),u=n,h=a;else if("l"===t)n=u+e.values[0],a=h+e.values[1],s.push({type:"L",values:[n,a]}),u=n,h=a;else if("C"===t){var i=e.values[0],o=e.values[1],l=e.values[2],r=e.values[3];n=e.values[4],a=e.values[5],s.push({type:"C",values:[i,o,l,r,n,a]}),u=n,h=a}else"c"===t?(i=u+e.values[0],o=h+e.values[1],l=u+e.values[2],r=h+e.values[3],n=u+e.values[4],a=h+e.values[5],s.push({type:"C",values:[i,o,l,r,n,a]}),u=n,h=a):"Q"===t?(i=e.values[0],o=e.values[1],n=e.values[2],a=e.values[3],s.push({type:"Q",values:[i,o,n,a]}),u=n,h=a):"q"===t?(i=u+e.values[0],o=h+e.values[1],n=u+e.values[2],a=h+e.values[3],s.push({type:"Q",values:[i,o,n,a]}),u=n,h=a):"A"===t?(n=e.values[5],a=e.values[6],s.push({type:"A",values:[e.values[0],e.values[1],e.values[2],e.values[3],e.values[4],n,a]}),u=n,h=a):"a"===t?(n=u+e.values[5],a=h+e.values[6],s.push({type:"A",values:[e.values[0],e.values[1],e.values[2],e.values[3],e.values[4],n,a]}),u=n,h=a):"H"===t?(n=e.values[0],s.push({type:"H",values:[n]}),u=n):"h"===t?(n=u+e.values[0],s.push({type:"H",values:[n]}),u=n):"V"===t?(a=e.values[0],s.push({type:"V",values:[a]}),h=a):"v"===t?(a=h+e.values[0],s.push({type:"V",values:[a]}),h=a):"S"===t?(l=e.values[0],r=e.values[1],n=e.values[2],a=e.values[3],s.push({type:"S",values:[l,r,n,a]}),u=n,h=a):"s"===t?(l=u+e.values[0],r=h+e.values[1],n=u+e.values[2],a=h+e.values[3],s.push({type:"S",values:[l,r,n,a]}),u=n,h=a):"T"===t?(n=e.values[0],a=e.values[1],s.push({type:"T",values:[n,a]}),u=n,h=a):"t"===t?(n=u+e.values[0],a=h+e.values[1],s.push({type:"T",values:[n,a]}),u=n,h=a):"Z"!==t&&"z"!==t||(s.push({type:"Z",values:[]}),u=p,h=c)}),s));return this[f]=y(t),t}if(this[d])return y(this[d]);var s,u,h,p,c,n=a(this.getAttribute("d")||"");return this[d]=y(n),n},e.SVGPathElement.prototype.setPathData=function(e){if(0===e.length)l?this.setAttribute("d",""):this.removeAttribute("d");else{for(var t="",n=0,a=e.length;n<a;n+=1){var i=e[n];0<n&&(t+=" "),t+=i.type,i.values&&0<i.values.length&&(t+=" "+i.values.join(" "))}this.setAttribute("d",t)}},e.SVGRectElement.prototype.getPathData=function(e){var t=this.x.baseVal.value,n=this.y.baseVal.value,a=this.width.baseVal.value,i=this.height.baseVal.value,o=this.hasAttribute("rx")?this.rx.baseVal.value:this.ry.baseVal.value,l=this.hasAttribute("ry")?this.ry.baseVal.value:this.rx.baseVal.value;a/2<o&&(o=a/2),i/2<l&&(l=i/2);var r=[{type:"M",values:[t+o,n]},{type:"H",values:[t+a-o]},{type:"A",values:[o,l,0,0,1,t+a,n+l]},{type:"V",values:[n+i-l]},{type:"A",values:[o,l,0,0,1,t+a-o,n+i]},{type:"H",values:[t+o]},{type:"A",values:[o,l,0,0,1,t,n+i-l]},{type:"V",values:[n+l]},{type:"A",values:[o,l,0,0,1,t+o,n]},{type:"Z",values:[]}];return r=r.filter(function(e){return"A"!==e.type||0!==e.values[0]&&0!==e.values[1]}),e&&!0===e.normalize&&(r=S(r)),r},e.SVGCircleElement.prototype.getPathData=function(e){var t=this.cx.baseVal.value,n=this.cy.baseVal.value,a=this.r.baseVal.value,i=[{type:"M",values:[t+a,n]},{type:"A",values:[a,a,0,0,1,t,n+a]},{type:"A",values:[a,a,0,0,1,t-a,n]},{type:"A",values:[a,a,0,0,1,t,n-a]},{type:"A",values:[a,a,0,0,1,t+a,n]},{type:"Z",values:[]}];return e&&!0===e.normalize&&(i=S(i)),i},e.SVGEllipseElement.prototype.getPathData=function(e){var t=this.cx.baseVal.value,n=this.cy.baseVal.value,a=this.rx.baseVal.value,i=this.ry.baseVal.value,o=[{type:"M",values:[t+a,n]},{type:"A",values:[a,i,0,0,1,t,n+i]},{type:"A",values:[a,i,0,0,1,t-a,n]},{type:"A",values:[a,i,0,0,1,t,n-i]},{type:"A",values:[a,i,0,0,1,t+a,n]},{type:"Z",values:[]}];return e&&!0===e.normalize&&(o=S(o)),o},e.SVGLineElement.prototype.getPathData=function(){return[{type:"M",values:[this.x1.baseVal.value,this.y1.baseVal.value]},{type:"L",values:[this.x2.baseVal.value,this.y2.baseVal.value]}]},e.SVGPolylineElement.prototype.getPathData=function(){for(var e=[],t=0;t<this.points.numberOfItems;t+=1){var n=this.points.getItem(t);e.push({type:0===t?"M":"L",values:[n.x,n.y]})}return e},e.SVGPolygonElement.prototype.getPathData=function(){for(var e=[],t=0;t<this.points.numberOfItems;t+=1){var n=this.points.getItem(t);e.push({type:0===t?"M":"L",values:[n.x,n.y]})}return e.push({type:"Z",values:[]}),e}}()},O=function(n){var a={};function i(e){if(a[e])return a[e].exports;var t=a[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,i),t.l=!0,t.exports}return i.m=n,i.c=a,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},i.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,n){n.r(t);var a=500,i=[],o=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||function(e){return setTimeout(e,1e3/60)},l=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame||function(e){return clearTimeout(e)},r=void 0,s=Date.now();function u(){var t=void 0,e=void 0;r&&(l.call(window,r),r=null),i.forEach(function(e){e.event&&(e.listener(e.event),e.event=null,t=!0)}),t?(s=Date.now(),e=!0):Date.now()-s<a&&(e=!0),e&&(r=o.call(window,u))}function h(n){var a=-1;return i.some(function(e,t){return e.listener===n&&(a=t,!0)}),a}var p={add:function(e){var t=void 0;return-1===h(e)?(i.push(t={listener:e}),function(e){t.event=e,r||u()}):null},remove:function(e){var t;-1<(t=h(e))&&(i.splice(t,1),!i.length&&r&&(l.call(window,r),r=null))}};t.default=p}]).default,Y={line_altColor:{iniValue:!1},line_color:{},line_colorTra:{iniValue:!1},line_strokeWidth:{},plug_enabled:{iniValue:!1},plug_enabledSE:{hasSE:!0,iniValue:!1},plug_plugSE:{hasSE:!0,iniValue:ne},plug_colorSE:{hasSE:!0},plug_colorTraSE:{hasSE:!0,iniValue:!1},plug_markerWidthSE:{hasSE:!0},plug_markerHeightSE:{hasSE:!0},lineOutline_enabled:{iniValue:!1},lineOutline_color:{},lineOutline_colorTra:{iniValue:!1},lineOutline_strokeWidth:{},lineOutline_inStrokeWidth:{},plugOutline_enabledSE:{hasSE:!0,iniValue:!1},plugOutline_plugSE:{hasSE:!0,iniValue:ne},plugOutline_colorSE:{hasSE:!0},plugOutline_colorTraSE:{hasSE:!0,iniValue:!1},plugOutline_strokeWidthSE:{hasSE:!0},plugOutline_inStrokeWidthSE:{hasSE:!0},position_socketXYSE:{hasSE:!0,hasProps:!0},position_plugOverheadSE:{hasSE:!0},position_path:{},position_lineStrokeWidth:{},position_socketGravitySE:{hasSE:!0},path_pathData:{},path_edge:{hasProps:!0},viewBox_bBox:{hasProps:!0},viewBox_plugBCircleSE:{hasSE:!0},lineMask_enabled:{iniValue:!1},lineMask_outlineMode:{iniValue:!1},lineMask_x:{},lineMask_y:{},lineOutlineMask_x:{},lineOutlineMask_y:{},maskBGRect_x:{},maskBGRect_y:{},capsMaskAnchor_enabledSE:{hasSE:!0,iniValue:!1},capsMaskAnchor_pathDataSE:{hasSE:!0},capsMaskAnchor_strokeWidthSE:{hasSE:!0},capsMaskMarker_enabled:{iniValue:!1},capsMaskMarker_enabledSE:{hasSE:!0,iniValue:!1},capsMaskMarker_plugSE:{hasSE:!0,iniValue:ne},capsMaskMarker_markerWidthSE:{hasSE:!0},capsMaskMarker_markerHeightSE:{hasSE:!0},caps_enabled:{iniValue:!1},attach_plugSideLenSE:{hasSE:!0},attach_plugBackLenSE:{hasSE:!0}},X={show_on:{},show_effect:{},show_animOptions:{},show_animId:{},show_inAnim:{}},q="fade",Q=[],K={},J=0,$={},ee=0;function ce(t,n){var e,a;return typeof t!=typeof n||(e=k(t)?"obj":Array.isArray(t)?"array":"")!=(k(n)?"obj":Array.isArray(n)?"array":"")||("obj"===e?ce(a=Object.keys(t).sort(),Object.keys(n).sort())||a.some(function(e){return ce(t[e],n[e])}):"array"===e?t.length!==n.length||t.some(function(e,t){return ce(e,n[t])}):t!==n)}function de(n){return n?k(n)?Object.keys(n).reduce(function(e,t){return e[t]=de(n[t]),e},{}):Array.isArray(n)?n.map(de):n:n}function fe(e){var t,n,a,i=1,o=e=(e+"").trim();function l(e){var t=1,n=u.exec(e);return n&&(t=parseFloat(n[1]),n[2]?t=0<=t&&t<=100?t/100:1:(t<0||1<t)&&(t=1)),t}return(t=/^(rgba|hsla|hwb|gray|device\-cmyk)\s*\(([\s\S]+)\)$/i.exec(e))?(n=t[1].toLowerCase(),a=t[2].trim().split(/\s*,\s*/),"rgba"===n&&4===a.length?(i=l(a[3]),o="rgb("+a.slice(0,3).join(", ")+")"):"hsla"===n&&4===a.length?(i=l(a[3]),o="hsl("+a.slice(0,3).join(", ")+")"):"hwb"===n&&4===a.length?(i=l(a[3]),o="hwb("+a.slice(0,3).join(", ")+")"):"gray"===n&&2===a.length?(i=l(a[1]),o="gray("+a[0]+")"):"device-cmyk"===n&&5<=a.length&&(i=l(a[4]),o="device-cmyk("+a.slice(0,4).join(", ")+")")):(t=/^\#(?:([\da-f]{6})([\da-f]{2})|([\da-f]{3})([\da-f]))$/i.exec(e))?t[1]?(i=parseInt(t[2],16)/255,o="#"+t[1]):(i=parseInt(t[4]+t[4],16)/255,o="#"+t[3]):"transparent"===e.toLocaleLowerCase()&&(i=0),[i,o]}function ye(e){return!(!e||e.nodeType!==Node.ELEMENT_NODE||"function"!=typeof e.getBoundingClientRect)}function Se(e,t){var n,a,i,o,l={};if(!(i=e.ownerDocument))return console.error("Cannot get document that contains the element."),null;if(e.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_DISCONNECTED)return console.error("A disconnected element was passed."),null;for(a in n=e.getBoundingClientRect())l[a]=n[a];if(!t){if(!(o=i.defaultView))return console.error("Cannot get window that contains the element."),null;l.left+=o.pageXOffset,l.right+=o.pageXOffset,l.top+=o.pageYOffset,l.bottom+=o.pageYOffset}return l}function me(e,t){var n,a,i=[],o=e;for(t=t||window;;){if(!(n=o.ownerDocument))return console.error("Cannot get document that contains the element."),null;if(!(a=n.defaultView))return console.error("Cannot get window that contains the element."),null;if(a===t)break;if(!(o=a.frameElement))return console.error("`baseWindow` was not found."),null;i.unshift(o)}return i}function ge(e,t){var n,a,o=0,l=0;return(a=me(e,t=t||window))?a.length?(a.forEach(function(e,t){var n,a,i=Se(e,0<t);o+=i.left,l+=i.top,a=(n=e).ownerDocument.defaultView.getComputedStyle(n,""),i={left:n.clientLeft+parseFloat(a.paddingLeft),top:n.clientTop+parseFloat(a.paddingTop)},o+=i.left,l+=i.top}),(n=Se(e,!0)).left+=o,n.right+=o,n.top+=l,n.bottom+=l,n):Se(e):null}function _e(e,t){var n=e.x-t.x,a=e.y-t.y;return Math.sqrt(n*n+a*a)}function ve(e,t,n){var a=t.x-e.x,i=t.y-e.y;return{x:e.x+a*n,y:e.y+i*n,angle:Math.atan2(i,a)/(Math.PI/180)}}function Ee(e,t,n){var a=Math.atan2(e.y-t.y,t.x-e.x);return{x:t.x+Math.cos(a)*n,y:t.y+Math.sin(a)*n*-1}}function xe(e,t,n,a,i){var o=i*i,l=o*i,r=1-i,s=r*r,u=s*r,h=u*e.x+3*s*i*t.x+3*r*o*n.x+l*a.x,p=u*e.y+3*s*i*t.y+3*r*o*n.y+l*a.y,c=e.x+2*i*(t.x-e.x)+o*(n.x-2*t.x+e.x),d=e.y+2*i*(t.y-e.y)+o*(n.y-2*t.y+e.y),f=t.x+2*i*(n.x-t.x)+o*(a.x-2*n.x+t.x),y=t.y+2*i*(n.y-t.y)+o*(a.y-2*n.y+t.y),S=r*e.x+i*t.x,m=r*e.y+i*t.y,g=r*n.x+i*a.x,_=r*n.y+i*a.y,v=90-180*Math.atan2(c-f,d-y)/Math.PI;return{x:h,y:p,fromP2:{x:c,y:d},toP1:{x:f,y:y},fromP1:{x:S,y:m},toP2:{x:g,y:_},angle:v+=180<v?-180:180}}function be(n,a,i,o,e){function l(e,t,n,a,i){return e*(e*(-3*t+9*n-9*a+3*i)+6*t-12*n+6*a)-3*t+3*n}var r,s,u,h,p,c=[.2491,.2491,.2335,.2335,.2032,.2032,.1601,.1601,.1069,.1069,.0472,.0472],d=0;return r=(e=null==e||1<e?1:e<0?0:e)/2,[-.1252,.1252,-.3678,.3678,-.5873,.5873,-.7699,.7699,-.9041,.9041,-.9816,.9816].forEach(function(e,t){u=l(s=r*e+r,n.x,a.x,i.x,o.x),h=l(s,n.y,a.y,i.y,o.y),p=u*u+h*h,d+=c[t]*Math.sqrt(p)}),r*d}function ke(e,t,n,a,i){for(var o,l=.5,r=1-l;o=be(e,t,n,a,r),!(Math.abs(o-i)<=.01);)r+=(o<i?1:-1)*(l/=2);return r}function we(e,n){var a;return e.forEach(function(e){var t=n?e.map(function(e){var t={x:e.x,y:e.y};return n(t),t}):e;a||(a=[{type:"M",values:[t[0].x,t[0].y]}]),a.push(t.length?2===t.length?{type:"L",values:[t[1].x,t[1].y]}:{type:"C",values:[t[1].x,t[1].y,t[2].x,t[2].y,t[3].x,t[3].y]}:{type:"Z",values:[]})}),a}function Oe(e){var n=[],a=0;return e.forEach(function(e){var t=(2===e.length?_e:be).apply(null,e);n.push(t),a+=t}),{segsLen:n,lenAll:a}}function Me(e,a){return null==e||null==a||e.length!==a.length||e.some(function(e,t){var n=a[t];return e.type!==n.type||e.values.some(function(e,t){return e!==n.values[t]})})}function Ie(e,t,n){e.events[t]?e.events[t].indexOf(n)<0&&e.events[t].push(n):e.events[t]=[n]}function Ce(e,t,n){var a;e.events[t]&&-1<(a=e.events[t].indexOf(n))&&e.events[t].splice(a,1)}function Le(e){t&&clearTimeout(t),Q.push(e),t=setTimeout(function(){Q.forEach(function(e){e()}),Q=[]},0)}function Ae(e,t){e.reflowTargets.indexOf(t)<0&&e.reflowTargets.push(t)}function Ve(e){e.reflowTargets.forEach(function(e){var n;n=e,setTimeout(function(){var e=n.parentNode,t=n.nextSibling;e.insertBefore(e.removeChild(n),t)},0)}),e.reflowTargets=[]}function Pe(e,t,n,a,i,o,l){var r,s,u;"auto-start-reverse"===n?("boolean"!=typeof h&&(t.setAttribute("orient","auto-start-reverse"),h=t.orientType.baseVal===SVGMarkerElement.SVG_MARKER_ORIENT_UNKNOWN),h?t.setAttribute("orient",n):((r=i.createSVGTransform()).setRotate(180,0,0),o.transform.baseVal.appendItem(r),t.setAttribute("orient","auto"),u=!0)):(t.setAttribute("orient",n),!1===h&&o.transform.baseVal.clear()),s=t.viewBox.baseVal,u?(s.x=-a.right,s.y=-a.bottom):(s.x=a.left,s.y=a.top),s.width=a.width,s.height=a.height,le&&Ae(e,l)}function Ne(e,t){return{prop:e?"markerEnd":"markerStart",orient:t?t.noRotate?"0":e?"auto":"auto-start-reverse":null}}function Te(n,a){Object.keys(a).forEach(function(e){var t=a[e];n[e]=null!=t.iniValue?t.hasSE?[t.iniValue,t.iniValue]:t.iniValue:t.hasSE?t.hasProps?[{},{}]:[]:t.hasProps?{}:null})}function We(t,e,n,a,i){return a!==e[n]&&(e[n]=a,i&&i.forEach(function(e){e(t,a,n)}),!0)}function Be(e){function t(e,t){return e+parseFloat(t)}var n=e.document,a=e.getComputedStyle(n.documentElement,""),i=e.getComputedStyle(n.body,""),o={x:0,y:0};return"static"!==i.position?(o.x-=[a.marginLeft,a.borderLeftWidth,a.paddingLeft,i.marginLeft,i.borderLeftWidth].reduce(t,0),o.y-=[a.marginTop,a.borderTopWidth,a.paddingTop,i.marginTop,i.borderTopWidth].reduce(t,0)):"static"!==a.position&&(o.x-=[a.marginLeft,a.borderLeftWidth].reduce(t,0),o.y-=[a.marginTop,a.borderTopWidth].reduce(t,0)),o}function Re(e){var t,n=e.document;n.getElementById(r)||(t=(new e.DOMParser).parseFromString(s,"image/svg+xml"),n.body.appendChild(t.documentElement),d(e))}function Fe(u){var _,f,v,e,n,a,i,y,s,h,p,t,o,l,r,c,d,S,m,g=u.options,E=u.curStats,x=u.aplStats,b=E.position_socketXYSE,k=!1;function w(e,t){var n=t===M?{x:e.left+e.width/2,y:e.top}:t===I?{x:e.right,y:e.top+e.height/2}:t===C?{x:e.left+e.width/2,y:e.bottom}:{x:e.left,y:e.top+e.height/2};return n.socketId=t,n}function O(e){return{x:e.x,y:e.y}}if(E.position_path=g.path,E.position_lineStrokeWidth=E.line_strokeWidth,E.position_socketGravitySE=_=de(g.socketGravitySE),f=[0,1].map(function(e){var t,n,a,i=g.anchorSE[e],o=u.optionIsAttach.anchorSE[e],l=!1!==o?$[i._id]:null,r=!1!==o&&l.conf.getStrokeWidth?l.conf.getStrokeWidth(l,u):0,s=!1!==o&&l.conf.getBBoxNest?l.conf.getBBoxNest(l,u,r):ge(i,u.baseWindow);return E.capsMaskAnchor_pathDataSE[e]=!1!==o&&l.conf.getPathData?l.conf.getPathData(l,u,r):(n=null!=(t=s).right?t.right:t.left+t.width,a=null!=t.bottom?t.bottom:t.top+t.height,[{type:"M",values:[t.left,t.top]},{type:"L",values:[n,t.top]},{type:"L",values:[n,a]},{type:"L",values:[t.left,a]},{type:"Z",values:[]}]),E.capsMaskAnchor_strokeWidthSE[e]=r,s}),i=-1,g.socketSE[0]&&g.socketSE[1]?(b[0]=w(f[0],g.socketSE[0]),b[1]=w(f[1],g.socketSE[1])):(g.socketSE[0]||g.socketSE[1]?(g.socketSE[0]?(n=0,a=1):(n=1,a=0),b[n]=w(f[n],g.socketSE[n]),(e=W.map(function(e){return w(f[a],e)})).forEach(function(e){var t=_e(e,b[n]);(t<i||-1===i)&&(b[a]=e,i=t)})):(e=W.map(function(e){return w(f[1],e)}),W.map(function(e){return w(f[0],e)}).forEach(function(n){e.forEach(function(e){var t=_e(n,e);(t<i||-1===i)&&(b[0]=n,b[1]=e,i=t)})})),[0,1].forEach(function(e){var t,n;g.socketSE[e]||(f[e].width||f[e].height?f[e].width||b[e].socketId!==L&&b[e].socketId!==I?f[e].height||b[e].socketId!==M&&b[e].socketId!==C||(b[e].socketId=0<=b[e?0:1].y-f[e].top?C:M):b[e].socketId=0<=b[e?0:1].x-f[e].left?I:L:(t=b[e?0:1].x-f[e].left,n=b[e?0:1].y-f[e].top,b[e].socketId=Math.abs(t)>=Math.abs(n)?0<=t?I:L:0<=n?C:M))})),E.position_path!==x.position_path||E.position_lineStrokeWidth!==x.position_lineStrokeWidth||[0,1].some(function(e){return E.position_plugOverheadSE[e]!==x.position_plugOverheadSE[e]||(i=b[e],o=x.position_socketXYSE[e],i.x!==o.x||i.y!==o.y||i.socketId!==o.socketId)||(t=_[e],n=x.position_socketGravitySE[e],(a=null==t?"auto":Array.isArray(t)?"array":"number")!==(null==n?"auto":Array.isArray(n)?"array":"number")||("array"===a?t[0]!==n[0]||t[1]!==n[1]:t!==n));var t,n,a,i,o})){switch(u.pathList.baseVal=v=[],u.pathList.animVal=null,E.position_path){case A:v.push([O(b[0]),O(b[1])]);break;case V:t="number"==typeof _[0]&&0<_[0]||"number"==typeof _[1]&&0<_[1],o=Z*(t?-1:1),l=Math.atan2(b[1].y-b[0].y,b[1].x-b[0].x),r=-l+o,c=Math.PI-l-o,d=_e(b[0],b[1])/Math.sqrt(2)*U,S={x:b[0].x+Math.cos(r)*d,y:b[0].y+Math.sin(r)*d*-1},m={x:b[1].x+Math.cos(c)*d,y:b[1].y+Math.sin(c)*d*-1},v.push([O(b[0]),S,m,O(b[1])]);break;case P:case N:s=[_[0],E.position_path===N?0:_[1]],h=[],p=[],b.forEach(function(e,t){var n,a,i,o,l,r=s[t];Array.isArray(r)?n={x:r[0],y:r[1]}:"number"==typeof r?n=e.socketId===M?{x:0,y:-r}:e.socketId===I?{x:r,y:0}:e.socketId===C?{x:0,y:r}:{x:-r,y:0}:(a=b[t?0:1],o=0<(i=E.position_plugOverheadSE[t])?G+(D<i?(i-D)*z:0):B+(E.position_lineStrokeWidth>R?(E.position_lineStrokeWidth-R)*F:0),e.socketId===M?((l=(e.y-a.y)/2)<o&&(l=o),n={x:0,y:-l}):e.socketId===I?((l=(a.x-e.x)/2)<o&&(l=o),n={x:l,y:0}):e.socketId===C?((l=(a.y-e.y)/2)<o&&(l=o),n={x:0,y:l}):((l=(e.x-a.x)/2)<o&&(l=o),n={x:-l,y:0})),h[t]=e.x+n.x,p[t]=e.y+n.y}),v.push([O(b[0]),{x:h[0],y:p[0]},{x:h[1],y:p[1]},O(b[1])]);break;case T:!function(){var a,o=1,l=2,r=3,s=4,u=[[],[]],h=[];function p(e){return e===o?r:e===l?s:e===r?o:l}function c(e){return e===l||e===s?"x":"y"}function d(e,t,n){var a={x:e.x,y:e.y};if(n){if(n===p(e.dirId))throw new Error("Invalid dirId: "+n);a.dirId=n}else a.dirId=e.dirId;return a.dirId===o?a.y-=t:a.dirId===l?a.x+=t:a.dirId===r?a.y+=t:a.x-=t,a}function f(e,t){return t.dirId===o?e.y<=t.y:t.dirId===l?e.x>=t.x:t.dirId===r?e.y>=t.y:e.x<=t.x}function y(e,t){return t.dirId===o||t.dirId===r?e.x===t.x:e.y===t.y}function S(e){return e[0]?{contain:0,notContain:1}:{contain:1,notContain:0}}function m(e,t,n){return Math.abs(t[n]-e[n])}function g(e,t,n){return"x"===n?e.x<t.x?l:s:e.y<t.y?r:o}function e(){var e,t,a,i,n=[f(h[1],h[0]),f(h[0],h[1])],o=[c(h[0].dirId),c(h[1].dirId)];if(o[0]===o[1]){if(n[0]&&n[1])return y(h[1],h[0])||(h[0][o[0]]===h[1][o[1]]?(u[0].push(h[0]),u[1].push(h[1])):(e=h[0][o[0]]+(h[1][o[1]]-h[0][o[0]])/2,u[0].push(d(h[0],Math.abs(e-h[0][o[0]]))),u[1].push(d(h[1],Math.abs(e-h[1][o[1]]))))),!1;n[0]!==n[1]?(t=S(n),(a=m(h[t.notContain],h[t.contain],o[t.notContain]))<H&&(h[t.notContain]=d(h[t.notContain],H-a)),u[t.notContain].push(h[t.notContain]),h[t.notContain]=d(h[t.notContain],H,y(h[t.contain],h[t.notContain])?"x"===o[t.notContain]?r:l:g(h[t.notContain],h[t.contain],"x"===o[t.notContain]?"y":"x"))):(a=m(h[0],h[1],"x"===o[0]?"y":"x"),u.forEach(function(e,t){var n=0===t?1:0;e.push(h[t]),h[t]=d(h[t],H,2*H<=a?g(h[t],h[n],"x"===o[t]?"y":"x"):"x"===o[t]?r:l)}))}else{if(n[0]&&n[1])return y(h[1],h[0])?u[1].push(h[1]):y(h[0],h[1])?u[0].push(h[0]):u[0].push("x"===o[0]?{x:h[1].x,y:h[0].y}:{x:h[0].x,y:h[1].y}),!1;n[0]!==n[1]?(t=S(n),u[t.notContain].push(h[t.notContain]),h[t.notContain]=d(h[t.notContain],H,m(h[t.notContain],h[t.contain],o[t.contain])>=H?g(h[t.notContain],h[t.contain],o[t.contain]):h[t.contain].dirId)):(i=[{x:h[0].x,y:h[0].y},{x:h[1].x,y:h[1].y}],u.forEach(function(e,t){var n=0===t?1:0,a=m(i[t],i[n],o[t]);a<H&&(h[t]=d(h[t],H-a)),e.push(h[t]),h[t]=d(h[t],H,g(h[t],h[n],o[n]))}))}return!0}for(b.forEach(function(e,t){var n,a=O(e),i=_[t];n=Array.isArray(i)?i[0]<0?[s,-i[0]]:0<i[0]?[l,i[0]]:i[1]<0?[o,-i[1]]:0<i[1]?[r,i[1]]:[e.socketId,0]:"number"!=typeof i?[e.socketId,H]:0<=i?[e.socketId,i]:[p(e.socketId),-i],a.dirId=n[0],i=n[1],u[t].push(a),h[t]=d(a,i)});e(););u[1].reverse(),u[0].concat(u[1]).forEach(function(e,t){var n={x:e.x,y:e.y};0<t&&v.push([a,n]),a=n})}()}y=[],E.position_plugOverheadSE.forEach(function(e,t){var n,a,i,o,l,r,s,u,h,p,c,d=!t;0<e?2===(n=v[a=d?0:v.length-1]).length?(y[a]=y[a]||_e.apply(null,n),y[a]>j&&(y[a]-e<j&&(e=y[a]-j),i=ve(n[0],n[1],(d?e:y[a]-e)/y[a]),v[a]=d?[i,n[1]]:[n[0],i],y[a]-=e)):(y[a]=y[a]||be.apply(null,n),y[a]>j&&(y[a]-e<j&&(e=y[a]-j),i=xe(n[0],n[1],n[2],n[3],ke(n[0],n[1],n[2],n[3],d?e:y[a]-e)),d?(o=n[0],l=i.toP1):(o=n[3],l=i.fromP2),r=Math.atan2(o.y-i.y,i.x-o.x),s=_e(i,l),i.x=o.x+Math.cos(r)*e,i.y=o.y+Math.sin(r)*e*-1,l.x=i.x+Math.cos(r)*s,l.y=i.y+Math.sin(r)*s*-1,v[a]=d?[i,i.toP1,i.toP2,n[3]]:[n[0],i.fromP1,i.fromP2,i],y[a]=null)):e<0&&(n=v[a=d?0:v.length-1],u=b[t].socketId,h=u===L||u===I?"x":"y",e<(c=-f[t]["x"===h?"width":"height"])&&(e=c),p=e*(u===L||u===M?-1:1),2===n.length?n[d?0:n.length-1][h]+=p:(d?[0,1]:[n.length-2,n.length-1]).forEach(function(e){n[e][h]+=p}),y[a]=null)}),x.position_socketXYSE=de(b),x.position_plugOverheadSE=de(E.position_plugOverheadSE),x.position_path=E.position_path,x.position_lineStrokeWidth=E.position_lineStrokeWidth,x.position_socketGravitySE=de(_),k=!0,u.events.apl_position&&u.events.apl_position.forEach(function(e){e(u,v)})}return k}function Ge(t,n){n!==t.isShown&&(!!n!=!!t.isShown&&(t.svg.style.visibility=n?"":"hidden"),t.isShown=n,t.events&&t.events.svgShow&&t.events.svgShow.forEach(function(e){e(t,n)}))}function De(e,t){var n,a,i,o,l,h,p,c,d,f,r,s,u,y,S,m,g,_,v,E,x,b,k,w,O,M,I,C,L,A,V,P,N,T,W,B,R,F,G,D,z,j,H,U,Z,Y,X,q,Q,K,J,$,ee={};t.line&&(ee.line=(a=(n=e).options,i=n.curStats,o=n.events,l=!1,l=We(n,i,"line_color",a.lineColor,o.cur_line_color)||l,l=We(n,i,"line_colorTra",fe(i.line_color)[0]<1)||l,l=We(n,i,"line_strokeWidth",a.lineSize,o.cur_line_strokeWidth)||l)),(t.plug||ee.line)&&(ee.plug=(p=(h=e).options,c=h.curStats,d=h.events,f=!1,[0,1].forEach(function(e){var t,n,a,i,o,l,r,s,u=p.plugSE[e];f=We(h,c.plug_enabledSE,e,u!==ne)||f,f=We(h,c.plug_plugSE,e,u)||f,f=We(h,c.plug_colorSE,e,s=p.plugColorSE[e]||c.line_color,d.cur_plug_colorSE)||f,f=We(h,c.plug_colorTraSE,e,fe(s)[0]<1)||f,u!==ne&&(i=n=(t=ae[ie[u]]).widthR*p.plugSizeSE[e],o=a=t.heightR*p.plugSizeSE[e],ue&&(i*=c.line_strokeWidth,o*=c.line_strokeWidth),f=We(h,c.plug_markerWidthSE,e,i)||f,f=We(h,c.plug_markerHeightSE,e,o)||f,c.capsMaskMarker_markerWidthSE[e]=n,c.capsMaskMarker_markerHeightSE[e]=a),c.plugOutline_plugSE[e]=c.capsMaskMarker_plugSE[e]=u,c.plug_enabledSE[e]?(s=c.line_strokeWidth/pe.lineSize*p.plugSizeSE[e],c.position_plugOverheadSE[e]=t.overhead*s,c.viewBox_plugBCircleSE[e]=t.bCircle*s,l=t.sideLen*s,r=t.backLen*s):(c.position_plugOverheadSE[e]=-c.line_strokeWidth/2,c.viewBox_plugBCircleSE[e]=l=r=0),We(h,c.attach_plugSideLenSE,e,l,d.cur_attach_plugSideLenSE),We(h,c.attach_plugBackLenSE,e,r,d.cur_attach_plugBackLenSE),c.capsMaskAnchor_enabledSE[e]=!c.plug_enabledSE[e]}),f=We(h,c,"plug_enabled",c.plug_enabledSE[0]||c.plug_enabledSE[1])||f)),(t.lineOutline||ee.line)&&(ee.lineOutline=(u=(r=e).options,y=r.curStats,S=!1,S=We(r,y,"lineOutline_enabled",u.lineOutlineEnabled)||S,S=We(r,y,"lineOutline_color",u.lineOutlineColor)||S,S=We(r,y,"lineOutline_colorTra",fe(y.lineOutline_color)[0]<1)||S,s=y.line_strokeWidth*u.lineOutlineSize,S=We(r,y,"lineOutline_strokeWidth",y.line_strokeWidth-2*s)||S,S=We(r,y,"lineOutline_inStrokeWidth",y.lineOutline_colorTra?y.lineOutline_strokeWidth+2*he:y.line_strokeWidth-s)||S)),(t.plugOutline||ee.line||ee.plug||ee.lineOutline)&&(ee.plugOutline=(g=(m=e).options,_=m.curStats,v=!1,[0,1].forEach(function(e){var t,n=_.plugOutline_plugSE[e],a=n!==ne?ae[ie[n]]:null;v=We(m,_.plugOutline_enabledSE,e,g.plugOutlineEnabledSE[e]&&_.plug_enabled&&_.plug_enabledSE[e]&&!!a&&!!a.outlineBase)||v,v=We(m,_.plugOutline_colorSE,e,t=g.plugOutlineColorSE[e]||_.lineOutline_color)||v,v=We(m,_.plugOutline_colorTraSE,e,fe(t)[0]<1)||v,a&&a.outlineBase&&((t=g.plugOutlineSizeSE[e])>a.outlineMax&&(t=a.outlineMax),t*=2*a.outlineBase,v=We(m,_.plugOutline_strokeWidthSE,e,t)||v,v=We(m,_.plugOutline_inStrokeWidthSE,e,_.plugOutline_colorTraSE[e]?t-he/(_.line_strokeWidth/pe.lineSize)/g.plugSizeSE[e]*2:t/2)||v)}),v)),(t.faces||ee.line||ee.plug||ee.lineOutline||ee.plugOutline)&&(ee.faces=(b=(E=e).curStats,k=E.aplStats,w=E.events,O=!1,!b.line_altColor&&We(E,k,"line_color",x=b.line_color,w.apl_line_color)&&(E.lineFace.style.stroke=x,O=!0),We(E,k,"line_strokeWidth",x=b.line_strokeWidth,w.apl_line_strokeWidth)&&(E.lineShape.style.strokeWidth=x+"px",O=!0,(re||le)&&(Ae(E,E.lineShape),le&&(Ae(E,E.lineFace),Ae(E,E.lineMaskCaps)))),We(E,k,"lineOutline_enabled",x=b.lineOutline_enabled,w.apl_lineOutline_enabled)&&(E.lineOutlineFace.style.display=x?"inline":"none",O=!0),b.lineOutline_enabled&&(We(E,k,"lineOutline_color",x=b.lineOutline_color,w.apl_lineOutline_color)&&(E.lineOutlineFace.style.stroke=x,O=!0),We(E,k,"lineOutline_strokeWidth",x=b.lineOutline_strokeWidth,w.apl_lineOutline_strokeWidth)&&(E.lineOutlineMaskShape.style.strokeWidth=x+"px",O=!0,le&&(Ae(E,E.lineOutlineMaskCaps),Ae(E,E.lineOutlineFace))),We(E,k,"lineOutline_inStrokeWidth",x=b.lineOutline_inStrokeWidth,w.apl_lineOutline_inStrokeWidth)&&(E.lineMaskShape.style.strokeWidth=x+"px",O=!0,le&&(Ae(E,E.lineOutlineMaskCaps),Ae(E,E.lineOutlineFace)))),We(E,k,"plug_enabled",x=b.plug_enabled,w.apl_plug_enabled)&&(E.plugsFace.style.display=x?"inline":"none",O=!0),b.plug_enabled&&[0,1].forEach(function(n){var e=b.plug_plugSE[n],t=e!==ne?ae[ie[e]]:null,a=Ne(n,t);We(E,k.plug_enabledSE,n,x=b.plug_enabledSE[n],w.apl_plug_enabledSE)&&(E.plugsFace.style[a.prop]=x?"url(#"+E.plugMarkerIdSE[n]+")":"none",O=!0),b.plug_enabledSE[n]&&(We(E,k.plug_plugSE,n,e,w.apl_plug_plugSE)&&(E.plugFaceSE[n].href.baseVal="#"+t.elmId,Pe(E,E.plugMarkerSE[n],a.orient,t.bBox,E.svg,E.plugMarkerShapeSE[n],E.plugsFace),O=!0,re&&Ae(E,E.plugsFace)),We(E,k.plug_colorSE,n,x=b.plug_colorSE[n],w.apl_plug_colorSE)&&(E.plugFaceSE[n].style.fill=x,O=!0,(se||ue||le)&&!b.line_colorTra&&Ae(E,le?E.lineMaskCaps:E.capsMaskLine)),["markerWidth","markerHeight"].forEach(function(e){var t="plug_"+e+"SE";We(E,k[t],n,x=b[t][n],w["apl_"+t])&&(E.plugMarkerSE[n][e].baseVal.value=x,O=!0)}),We(E,k.plugOutline_enabledSE,n,x=b.plugOutline_enabledSE[n],w.apl_plugOutline_enabledSE)&&(x?(E.plugFaceSE[n].style.mask="url(#"+E.plugMaskIdSE[n]+")",E.plugOutlineFaceSE[n].style.display="inline"):(E.plugFaceSE[n].style.mask="none",E.plugOutlineFaceSE[n].style.display="none"),O=!0),b.plugOutline_enabledSE[n]&&(We(E,k.plugOutline_plugSE,n,e,w.apl_plugOutline_plugSE)&&(E.plugOutlineFaceSE[n].href.baseVal=E.plugMaskShapeSE[n].href.baseVal=E.plugOutlineMaskShapeSE[n].href.baseVal="#"+t.elmId,[E.plugMaskSE[n],E.plugOutlineMaskSE[n]].forEach(function(e){e.x.baseVal.value=t.bBox.left,e.y.baseVal.value=t.bBox.top,e.width.baseVal.value=t.bBox.width,e.height.baseVal.value=t.bBox.height}),O=!0),We(E,k.plugOutline_colorSE,n,x=b.plugOutline_colorSE[n],w.apl_plugOutline_colorSE)&&(E.plugOutlineFaceSE[n].style.fill=x,O=!0,le&&(Ae(E,E.lineMaskCaps),Ae(E,E.lineOutlineMaskCaps))),We(E,k.plugOutline_strokeWidthSE,n,x=b.plugOutline_strokeWidthSE[n],w.apl_plugOutline_strokeWidthSE)&&(E.plugOutlineMaskShapeSE[n].style.strokeWidth=x+"px",O=!0),We(E,k.plugOutline_inStrokeWidthSE,n,x=b.plugOutline_inStrokeWidthSE[n],w.apl_plugOutline_inStrokeWidthSE)&&(E.plugMaskShapeSE[n].style.strokeWidth=x+"px",O=!0)))}),O)),(t.position||ee.line||ee.plug)&&(ee.position=Fe(e)),(t.path||ee.position)&&(ee.path=(C=(M=e).curStats,L=M.aplStats,A=M.pathList.animVal||M.pathList.baseVal,V=C.path_edge,P=!1,A&&(V.x1=V.x2=A[0][0].x,V.y1=V.y2=A[0][0].y,C.path_pathData=I=we(A,function(e){e.x<V.x1&&(V.x1=e.x),e.y<V.y1&&(V.y1=e.y),e.x>V.x2&&(V.x2=e.x),e.y>V.y2&&(V.y2=e.y)}),Me(I,L.path_pathData)&&(M.linePath.setPathData(I),L.path_pathData=I,P=!0,le?(Ae(M,M.plugsFace),Ae(M,M.lineMaskCaps)):re&&Ae(M,M.linePath),M.events.apl_path&&M.events.apl_path.forEach(function(e){e(M,I)}))),P)),ee.viewBox=(B=(N=e).curStats,R=N.aplStats,F=B.path_edge,G=B.viewBox_bBox,D=R.viewBox_bBox,z=N.svg.viewBox.baseVal,j=N.svg.style,H=!1,T=Math.max(B.line_strokeWidth/2,B.viewBox_plugBCircleSE[0]||0,B.viewBox_plugBCircleSE[1]||0),W={x1:F.x1-T,y1:F.y1-T,x2:F.x2+T,y2:F.y2+T},N.events.new_edge4viewBox&&N.events.new_edge4viewBox.forEach(function(e){e(N,W)}),G.x=B.lineMask_x=B.lineOutlineMask_x=B.maskBGRect_x=W.x1,G.y=B.lineMask_y=B.lineOutlineMask_y=B.maskBGRect_y=W.y1,G.width=W.x2-W.x1,G.height=W.y2-W.y1,["x","y","width","height"].forEach(function(e){var t;(t=G[e])!==D[e]&&(z[e]=D[e]=t,j[oe[e]]=t+("x"===e||"y"===e?N.bodyOffset[e]:0)+"px",H=!0)}),H),ee.mask=(Y=(U=e).curStats,X=U.aplStats,q=!1,Y.plug_enabled?[0,1].forEach(function(e){Y.capsMaskMarker_enabledSE[e]=Y.plug_enabledSE[e]&&Y.plug_colorTraSE[e]||Y.plugOutline_enabledSE[e]&&Y.plugOutline_colorTraSE[e]}):Y.capsMaskMarker_enabledSE[0]=Y.capsMaskMarker_enabledSE[1]=!1,Y.capsMaskMarker_enabled=Y.capsMaskMarker_enabledSE[0]||Y.capsMaskMarker_enabledSE[1],Y.lineMask_outlineMode=Y.lineOutline_enabled,Y.caps_enabled=Y.capsMaskMarker_enabled||Y.capsMaskAnchor_enabledSE[0]||Y.capsMaskAnchor_enabledSE[1],Y.lineMask_enabled=Y.caps_enabled||Y.lineMask_outlineMode,(Y.lineMask_enabled&&!Y.lineMask_outlineMode||Y.lineOutline_enabled)&&["x","y"].forEach(function(e){var t="maskBGRect_"+e;We(U,X,t,Z=Y[t])&&(U.maskBGRect[e].baseVal.value=Z,q=!0)}),We(U,X,"lineMask_enabled",Z=Y.lineMask_enabled)&&(U.lineFace.style.mask=Z?"url(#"+U.lineMaskId+")":"none",q=!0,ue&&Ae(U,U.lineMask)),Y.lineMask_enabled&&(We(U,X,"lineMask_outlineMode",Z=Y.lineMask_outlineMode)&&(Z?(U.lineMaskBG.style.display="none",U.lineMaskShape.style.display="inline"):(U.lineMaskBG.style.display="inline",U.lineMaskShape.style.display="none"),q=!0),["x","y"].forEach(function(e){var t="lineMask_"+e;We(U,X,t,Z=Y[t])&&(U.lineMask[e].baseVal.value=Z,q=!0)}),We(U,X,"caps_enabled",Z=Y.caps_enabled)&&(U.lineMaskCaps.style.display=U.lineOutlineMaskCaps.style.display=Z?"inline":"none",q=!0,ue&&Ae(U,U.capsMaskLine)),Y.caps_enabled&&([0,1].forEach(function(e){var t;We(U,X.capsMaskAnchor_enabledSE,e,Z=Y.capsMaskAnchor_enabledSE[e])&&(U.capsMaskAnchorSE[e].style.display=Z?"inline":"none",q=!0,ue&&Ae(U,U.lineMask)),Y.capsMaskAnchor_enabledSE[e]&&(Me(t=Y.capsMaskAnchor_pathDataSE[e],X.capsMaskAnchor_pathDataSE[e])&&(U.capsMaskAnchorSE[e].setPathData(t),X.capsMaskAnchor_pathDataSE[e]=t,q=!0),We(U,X.capsMaskAnchor_strokeWidthSE,e,Z=Y.capsMaskAnchor_strokeWidthSE[e])&&(U.capsMaskAnchorSE[e].style.strokeWidth=Z+"px",q=!0))}),We(U,X,"capsMaskMarker_enabled",Z=Y.capsMaskMarker_enabled)&&(U.capsMaskLine.style.display=Z?"inline":"none",q=!0),Y.capsMaskMarker_enabled&&[0,1].forEach(function(n){var e=Y.capsMaskMarker_plugSE[n],t=e!==ne?ae[ie[e]]:null,a=Ne(n,t);We(U,X.capsMaskMarker_enabledSE,n,Z=Y.capsMaskMarker_enabledSE[n])&&(U.capsMaskLine.style[a.prop]=Z?"url(#"+U.lineMaskMarkerIdSE[n]+")":"none",q=!0),Y.capsMaskMarker_enabledSE[n]&&(We(U,X.capsMaskMarker_plugSE,n,e)&&(U.capsMaskMarkerShapeSE[n].href.baseVal="#"+t.elmId,Pe(U,U.capsMaskMarkerSE[n],a.orient,t.bBox,U.svg,U.capsMaskMarkerShapeSE[n],U.capsMaskLine),q=!0,re&&(Ae(U,U.capsMaskLine),Ae(U,U.lineFace))),["markerWidth","markerHeight"].forEach(function(e){var t="capsMaskMarker_"+e+"SE";We(U,X[t],n,Z=Y[t][n])&&(U.capsMaskMarkerSE[n][e].baseVal.value=Z,q=!0)}))}))),Y.lineOutline_enabled&&["x","y"].forEach(function(e){var t="lineOutlineMask_"+e;We(U,X,t,Z=Y[t])&&(U.lineOutlineMask[e].baseVal.value=Z,q=!0)}),q),t.effect&&(J=(Q=e).curStats,$=Q.aplStats,Object.keys(te).forEach(function(e){var t=te[e],n=e+"_enabled",a=e+"_options",i=J[a];We(Q,$,n,K=J[n])?(K&&($[a]=de(i)),t[K?"init":"remove"](Q)):K&&ce(i,$[a])&&(t.remove(Q),$[n]=!0,$[a]=de(i),t.init(Q))})),(se||ue)&&ee.line&&!ee.path&&Ae(e,e.lineShape),se&&ee.plug&&!ee.line&&Ae(e,e.plugsFace),Ve(e)}function ze(e,t){return{duration:w(e.duration)&&0<e.duration?e.duration:t.duration,timing:c.validTiming(e.timing)?e.timing:de(t.timing)}}function je(e,t,n,a){var i,o=e.curStats,l=e.aplStats,r={};function s(){["show_on","show_effect","show_animOptions"].forEach(function(e){l[e]=o[e]})}o.show_on=t,n&&g[n]&&(o.show_effect=n,o.show_animOptions=ze(k(a)?a:{},g[n].defaultAnimOptions)),r.show_on=o.show_on!==l.show_on,r.show_effect=o.show_effect!==l.show_effect,r.show_animOptions=ce(o.show_animOptions,l.show_animOptions),r.show_effect||r.show_animOptions?o.show_inAnim?(i=r.show_effect?g[l.show_effect].stop(e,!0,!0):g[l.show_effect].stop(e),s(),g[l.show_effect].init(e,i)):r.show_on&&(l.show_effect&&r.show_effect&&g[l.show_effect].stop(e,!0,!0),s(),g[l.show_effect].init(e)):r.show_on&&(s(),g[l.show_effect].start(e))}function He(e,t,n){var a={props:e,optionName:n};return!(!(e.attachments.indexOf(t)<0)||t.conf.bind&&!t.conf.bind(t,a))&&(e.attachments.push(t),t.boundTargets.push(a),!0)}function Ue(n,a,e){var i=n.attachments.indexOf(a);-1<i&&n.attachments.splice(i,1),a.boundTargets.some(function(e,t){return e.props===n&&(a.conf.unbind&&a.conf.unbind(a,e),i=t,!0)})&&(a.boundTargets.splice(i,1),e||Le(function(){a.boundTargets.length||o(a)}))}function Ze(s,u){var e,i,h=s.options,p={};function f(e,t,n,a,i){var o={};return n?null!=a?(o.container=e[n],o.key=a):(o.container=e,o.key=n):(o.container=e,o.key=t),o.default=i,o.acceptsAuto=null==o.default,o}function c(e,t,n,a,i,o,l){var r,s,u,h=f(e,n,i,o,l);return null!=t[n]&&(s=(t[n]+"").toLowerCase())&&(h.acceptsAuto&&s===x||(u=a[s]))&&u!==h.container[h.key]&&(h.container[h.key]=u,r=!0),null!=h.container[h.key]||h.acceptsAuto||(h.container[h.key]=h.default,r=!0),r}function d(e,t,n,a,i,o,l,r,s){var u,h,p,c,d=f(e,n,i,o,l);if(!a){if(null==d.default)throw new Error("Invalid `type`: "+n);a=typeof d.default}return null!=t[n]&&(d.acceptsAuto&&(t[n]+"").toLowerCase()===x||(p=h=t[n],("number"===(c=a)?w(p):typeof p===c)&&(h=s&&"string"===a&&h?h.trim():h,1)&&(!r||r(h))))&&h!==d.container[d.key]&&(d.container[d.key]=h,u=!0),null!=d.container[d.key]||d.acceptsAuto||(d.container[d.key]=d.default,u=!0),u}if(u=u||{},["start","end"].forEach(function(e,t){var n=u[e],a=!1;if(n&&(ye(n)||(a=_(n,"anchor")))&&n!==h.anchorSE[t]){if(!1!==s.optionIsAttach.anchorSE[t]&&Ue(s,$[h.anchorSE[t]._id]),a&&!He(s,$[n._id],e))throw new Error("Can't bind attachment");h.anchorSE[t]=n,s.optionIsAttach.anchorSE[t]=a,i=p.position=!0}}),!h.anchorSE[0]||!h.anchorSE[1]||h.anchorSE[0]===h.anchorSE[1])throw new Error("`start` and `end` are required.");i&&(e=function(e,t){var n,a,i;if(!(n=me(e))||!(a=me(t)))throw new Error("Cannot get frames.");return n.length&&a.length&&(n.reverse(),a.reverse(),n.some(function(t){return a.some(function(e){return e===t&&(i=e.contentWindow,!0)})})),i||window}(!1!==s.optionIsAttach.anchorSE[0]?$[h.anchorSE[0]._id].element:h.anchorSE[0],!1!==s.optionIsAttach.anchorSE[1]?$[h.anchorSE[1]._id].element:h.anchorSE[1]))!==s.baseWindow&&(!function(a,e){var t,n,i,o,l,r,s,u,h,p,c=a.aplStats,d=e.document,f=v+"-"+a._id;function y(e){var t=n.appendChild(d.createElementNS(b,"mask"));return t.id=e,t.maskUnits.baseVal=SVGUnitTypes.SVG_UNIT_TYPE_USERSPACEONUSE,[t.x,t.y,t.width,t.height].forEach(function(e){e.baseVal.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PX,0)}),t}function S(e){var t=n.appendChild(d.createElementNS(b,"marker"));return t.id=e,t.markerUnits.baseVal=SVGMarkerElement.SVG_MARKERUNITS_STROKEWIDTH,t.viewBox.baseVal||t.setAttribute("viewBox","0 0 0 0"),t}function m(e){return[e.width,e.height].forEach(function(e){e.baseVal.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PERCENTAGE,100)}),e}a.pathList={},Te(c,Y),Object.keys(te).forEach(function(e){var t=e+"_enabled";c[t]&&(te[e].remove(a),c[t]=!1)}),a.baseWindow&&a.svg&&a.baseWindow.document.body.removeChild(a.svg),Re(a.baseWindow=e),a.bodyOffset=Be(e),a.svg=t=d.createElementNS(b,"svg"),t.className.baseVal=v,t.viewBox.baseVal||t.setAttribute("viewBox","0 0 0 0"),a.defs=n=t.appendChild(d.createElementNS(b,"defs")),a.linePath=o=n.appendChild(d.createElementNS(b,"path")),o.id=l=f+"-line-path",o.className.baseVal=v+"-line-path",ue&&(o.style.fill="none"),a.lineShape=o=n.appendChild(d.createElementNS(b,"use")),o.id=r=f+"-line-shape",o.href.baseVal="#"+l,(i=n.appendChild(d.createElementNS(b,"g"))).id=s=f+"-caps",a.capsMaskAnchorSE=[0,1].map(function(){var e=i.appendChild(d.createElementNS(b,"path"));return e.className.baseVal=v+"-caps-mask-anchor",e}),a.lineMaskMarkerIdSE=[f+"-caps-mask-marker-0",f+"-caps-mask-marker-1"],a.capsMaskMarkerSE=[0,1].map(function(e){return S(a.lineMaskMarkerIdSE[e])}),a.capsMaskMarkerShapeSE=[0,1].map(function(e){var t=a.capsMaskMarkerSE[e].appendChild(d.createElementNS(b,"use"));return t.className.baseVal=v+"-caps-mask-marker-shape",t}),a.capsMaskLine=o=i.appendChild(d.createElementNS(b,"use")),o.className.baseVal=v+"-caps-mask-line",o.href.baseVal="#"+r,a.maskBGRect=o=m(n.appendChild(d.createElementNS(b,"rect"))),o.id=u=f+"-mask-bg-rect",o.className.baseVal=v+"-mask-bg-rect",ue&&(o.style.fill="white"),a.lineMask=m(y(a.lineMaskId=f+"-line-mask")),a.lineMaskBG=o=a.lineMask.appendChild(d.createElementNS(b,"use")),o.href.baseVal="#"+u,a.lineMaskShape=o=a.lineMask.appendChild(d.createElementNS(b,"use")),o.className.baseVal=v+"-line-mask-shape",o.href.baseVal="#"+l,o.style.display="none",a.lineMaskCaps=o=a.lineMask.appendChild(d.createElementNS(b,"use")),o.href.baseVal="#"+s,a.lineOutlineMask=m(y(h=f+"-line-outline-mask")),(o=a.lineOutlineMask.appendChild(d.createElementNS(b,"use"))).href.baseVal="#"+u,a.lineOutlineMaskShape=o=a.lineOutlineMask.appendChild(d.createElementNS(b,"use")),o.className.baseVal=v+"-line-outline-mask-shape",o.href.baseVal="#"+l,a.lineOutlineMaskCaps=o=a.lineOutlineMask.appendChild(d.createElementNS(b,"use")),o.href.baseVal="#"+s,a.face=t.appendChild(d.createElementNS(b,"g")),a.lineFace=o=a.face.appendChild(d.createElementNS(b,"use")),o.href.baseVal="#"+r,a.lineOutlineFace=o=a.face.appendChild(d.createElementNS(b,"use")),o.href.baseVal="#"+r,o.style.mask="url(#"+h+")",o.style.display="none",a.plugMaskIdSE=[f+"-plug-mask-0",f+"-plug-mask-1"],a.plugMaskSE=[0,1].map(function(e){return y(a.plugMaskIdSE[e])}),a.plugMaskShapeSE=[0,1].map(function(e){var t=a.plugMaskSE[e].appendChild(d.createElementNS(b,"use"));return t.className.baseVal=v+"-plug-mask-shape",t}),p=[],a.plugOutlineMaskSE=[0,1].map(function(e){return y(p[e]=f+"-plug-outline-mask-"+e)}),a.plugOutlineMaskShapeSE=[0,1].map(function(e){var t=a.plugOutlineMaskSE[e].appendChild(d.createElementNS(b,"use"));return t.className.baseVal=v+"-plug-outline-mask-shape",t}),a.plugMarkerIdSE=[f+"-plug-marker-0",f+"-plug-marker-1"],a.plugMarkerSE=[0,1].map(function(e){var t=S(a.plugMarkerIdSE[e]);return ue&&(t.markerUnits.baseVal=SVGMarkerElement.SVG_MARKERUNITS_USERSPACEONUSE),t}),a.plugMarkerShapeSE=[0,1].map(function(e){return a.plugMarkerSE[e].appendChild(d.createElementNS(b,"g"))}),a.plugFaceSE=[0,1].map(function(e){return a.plugMarkerShapeSE[e].appendChild(d.createElementNS(b,"use"))}),a.plugOutlineFaceSE=[0,1].map(function(e){var t=a.plugMarkerShapeSE[e].appendChild(d.createElementNS(b,"use"));return t.style.mask="url(#"+p[e]+")",t.style.display="none",t}),a.plugsFace=o=a.face.appendChild(d.createElementNS(b,"use")),o.className.baseVal=v+"-plugs-face",o.href.baseVal="#"+r,o.style.display="none",a.curStats.show_inAnim?(a.isShown=1,g[c.show_effect].stop(a,!0)):a.isShown||(t.style.visibility="hidden"),d.body.appendChild(t),[0,1,2].forEach(function(e){var t,n=a.options.labelSEM[e];n&&_(n,"label")&&(t=$[n._id]).conf.initSvg&&t.conf.initSvg(t,a)})}(s,e),p.line=p.plug=p.lineOutline=p.plugOutline=p.faces=p.effect=!0),p.position=c(h,u,"path",m,null,null,pe.path)||p.position,p.position=c(h,u,"startSocket",n,"socketSE",0)||p.position,p.position=c(h,u,"endSocket",n,"socketSE",1)||p.position,[u.startSocketGravity,u.endSocketGravity].forEach(function(e,t){var n,a,i=!1;null!=e&&(Array.isArray(e)?w(e[0])&&w(e[1])&&(i=[e[0],e[1]],Array.isArray(h.socketGravitySE[t])&&(n=i,a=h.socketGravitySE[t],n.length===a.length&&n.every(function(e,t){return e===a[t]}))&&(i=!1)):((e+"").toLowerCase()===x?i=null:w(e)&&0<=e&&(i=e),i===h.socketGravitySE[t]&&(i=!1)),!1!==i&&(h.socketGravitySE[t]=i,p.position=!0))}),p.line=d(h,u,"color",null,"lineColor",null,pe.lineColor,null,!0)||p.line,p.line=d(h,u,"size",null,"lineSize",null,pe.lineSize,function(e){return 0<e})||p.line,["startPlug","endPlug"].forEach(function(e,t){p.plug=c(h,u,e,E,"plugSE",t,pe.plugSE[t])||p.plug,p.plug=d(h,u,e+"Color","string","plugColorSE",t,null,null,!0)||p.plug,p.plug=d(h,u,e+"Size",null,"plugSizeSE",t,pe.plugSizeSE[t],function(e){return 0<e})||p.plug}),p.lineOutline=d(h,u,"outline",null,"lineOutlineEnabled",null,pe.lineOutlineEnabled)||p.lineOutline,p.lineOutline=d(h,u,"outlineColor",null,"lineOutlineColor",null,pe.lineOutlineColor,null,!0)||p.lineOutline,p.lineOutline=d(h,u,"outlineSize",null,"lineOutlineSize",null,pe.lineOutlineSize,function(e){return 0<e&&e<=.48})||p.lineOutline,["startPlugOutline","endPlugOutline"].forEach(function(e,t){p.plugOutline=d(h,u,e,null,"plugOutlineEnabledSE",t,pe.plugOutlineEnabledSE[t])||p.plugOutline,p.plugOutline=d(h,u,e+"Color","string","plugOutlineColorSE",t,null,null,!0)||p.plugOutline,p.plugOutline=d(h,u,e+"Size",null,"plugOutlineSizeSE",t,pe.plugOutlineSizeSE[t],function(e){return 1<=e})||p.plugOutline}),["startLabel","endLabel","middleLabel"].forEach(function(e,t){var n,a,i,o=u[e],l=h.labelSEM[t]&&!s.optionIsAttach.labelSEM[t]?$[h.labelSEM[t]._id].text:h.labelSEM[t],r=!1;if((n="string"==typeof o)&&(o=o.trim()),(n||o&&(r=_(o,"label")))&&o!==l){if(h.labelSEM[t]&&(Ue(s,$[h.labelSEM[t]._id]),h.labelSEM[t]=""),o){if(r?(a=$[(i=o)._id]).boundTargets.slice().forEach(function(e){a.conf.removeOption(a,e)}):i=new S(y.captionLabel,[o]),!He(s,$[i._id],e))throw new Error("Can't bind attachment");h.labelSEM[t]=i}s.optionIsAttach.labelSEM[t]=r}}),Object.keys(te).forEach(function(a){var e,t,o=te[a],n=a+"_enabled",i=a+"_options";function l(a){var i={};return o.optionsConf.forEach(function(e){var t=e[0],n=e[3];null==e[4]||i[n]||(i[n]=[]),("function"==typeof t?t:"id"===t?c:d).apply(null,[i,a].concat(e.slice(1)))}),i}function r(e){var t,n=a+"_animOptions";return e.hasOwnProperty("animation")?k(e.animation)?t=s.curStats[n]=ze(e.animation,o.defaultAnimOptions):(t=!!e.animation,s.curStats[n]=t?ze({},o.defaultAnimOptions):null):(t=!!o.defaultEnabled,s.curStats[n]=t?ze({},o.defaultAnimOptions):null),t}u.hasOwnProperty(a)&&(e=u[a],k(e)?(s.curStats[n]=!0,t=s.curStats[i]=l(e),o.anim&&(s.curStats[i].animation=r(e))):(t=s.curStats[n]=!!e)&&(s.curStats[i]=l({}),o.anim&&(s.curStats[i].animation=r({}))),ce(t,h[a])&&(h[a]=t,p.effect=!0))}),De(s,p)}function Ye(e,t,n){var a={options:{anchorSE:[],socketSE:[],socketGravitySE:[],plugSE:[],plugColorSE:[],plugSizeSE:[],plugOutlineEnabledSE:[],plugOutlineColorSE:[],plugOutlineSizeSE:[],labelSEM:["","",""]},optionIsAttach:{anchorSE:[!1,!1],labelSEM:[!1,!1,!1]},curStats:{},aplStats:{},attachments:[],events:{},reflowTargets:[]};Te(a.curStats,Y),Te(a.aplStats,Y),Object.keys(te).forEach(function(e){var t=te[e].stats;Te(a.curStats,t),Te(a.aplStats,t),a.options[e]=!1}),Te(a.curStats,X),Te(a.aplStats,X),a.curStats.show_effect=q,a.curStats.show_animOptions=de(g[q].defaultAnimOptions),Object.defineProperty(this,"_id",{value:++J}),a._id=this._id,K[this._id]=a,1===arguments.length&&(n=e,e=null),n=n||{},(e||t)&&(n=de(n),e&&(n.start=e),t&&(n.end=t)),a.isShown=a.aplStats.show_on=!n.hide,this.setOptions(n)}return te={dash:{stats:{dash_len:{},dash_gap:{},dash_maxOffset:{}},anim:!0,defaultAnimOptions:{duration:1e3,timing:"linear"},optionsConf:[["type","len","number",null,null,null,function(e){return 0<e}],["type","gap","number",null,null,null,function(e){return 0<e}]],init:function(e){Ie(e,"apl_line_strokeWidth",te.dash.update),e.lineFace.style.strokeDashoffset=0,te.dash.update(e)},remove:function(e){var t=e.curStats;Ce(e,"apl_line_strokeWidth",te.dash.update),t.dash_animId&&(c.remove(t.dash_animId),t.dash_animId=null),e.lineFace.style.strokeDasharray="none",e.lineFace.style.strokeDashoffset=0,Te(e.aplStats,te.dash.stats)},update:function(t){var e,n=t.curStats,a=t.aplStats,i=a.dash_options,o=!1;n.dash_len=i.len||2*a.line_strokeWidth,n.dash_gap=i.gap||a.line_strokeWidth,n.dash_maxOffset=n.dash_len+n.dash_gap,o=We(t,a,"dash_len",n.dash_len)||o,(o=We(t,a,"dash_gap",n.dash_gap)||o)&&(t.lineFace.style.strokeDasharray=a.dash_len+","+a.dash_gap),n.dash_animOptions?(o=We(t,a,"dash_maxOffset",n.dash_maxOffset),a.dash_animOptions&&(o||ce(n.dash_animOptions,a.dash_animOptions))&&(n.dash_animId&&(e=c.stop(n.dash_animId),c.remove(n.dash_animId)),a.dash_animOptions=null),a.dash_animOptions||(n.dash_animId=c.add(function(e){return(1-e)*a.dash_maxOffset+"px"},function(e){t.lineFace.style.strokeDashoffset=e},n.dash_animOptions.duration,0,n.dash_animOptions.timing,!1,e),a.dash_animOptions=de(n.dash_animOptions))):a.dash_animOptions&&(n.dash_animId&&(c.remove(n.dash_animId),n.dash_animId=null),t.lineFace.style.strokeDashoffset=0,a.dash_animOptions=null)}},gradient:{stats:{gradient_colorSE:{hasSE:!0},gradient_pointSE:{hasSE:!0,hasProps:!0}},optionsConf:[["type","startColor","string","colorSE",0,null,null,!0],["type","endColor","string","colorSE",1,null,null,!0]],init:function(e){var t,a=e.baseWindow.document,n=e.defs,i=v+"-"+e._id+"-gradient";e.efc_gradient_gradient=t=n.appendChild(a.createElementNS(b,"linearGradient")),t.id=i,t.gradientUnits.baseVal=SVGUnitTypes.SVG_UNIT_TYPE_USERSPACEONUSE,[t.x1,t.y1,t.x2,t.y2].forEach(function(e){e.baseVal.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PX,0)}),e.efc_gradient_stopSE=[0,1].map(function(t){var n=e.efc_gradient_gradient.appendChild(a.createElementNS(b,"stop"));try{n.offset.baseVal=t}catch(e){if(e.code!==DOMException.NO_MODIFICATION_ALLOWED_ERR)throw e;n.setAttribute("offset",t)}return n}),Ie(e,"cur_plug_colorSE",te.gradient.update),Ie(e,"apl_path",te.gradient.update),e.curStats.line_altColor=!0,e.lineFace.style.stroke="url(#"+i+")",te.gradient.update(e)},remove:function(e){e.efc_gradient_gradient&&(e.defs.removeChild(e.efc_gradient_gradient),e.efc_gradient_gradient=e.efc_gradient_stopSE=null),Ce(e,"cur_plug_colorSE",te.gradient.update),Ce(e,"apl_path",te.gradient.update),e.curStats.line_altColor=!1,e.lineFace.style.stroke=e.curStats.line_color,Te(e.aplStats,te.gradient.stats)},update:function(a){var e,t,i=a.curStats,o=a.aplStats,n=o.gradient_options,l=a.pathList.animVal||a.pathList.baseVal;[0,1].forEach(function(e){i.gradient_colorSE[e]=n.colorSE[e]||i.plug_colorSE[e]}),t=l[0][0],i.gradient_pointSE[0]={x:t.x,y:t.y},t=(e=l[l.length-1])[e.length-1],i.gradient_pointSE[1]={x:t.x,y:t.y},[0,1].forEach(function(t){var n;We(a,o.gradient_colorSE,t,n=i.gradient_colorSE[t])&&(ue?(n=fe(n),a.efc_gradient_stopSE[t].style.stopColor=n[1],a.efc_gradient_stopSE[t].style.stopOpacity=n[0]):a.efc_gradient_stopSE[t].style.stopColor=n),["x","y"].forEach(function(e){(n=i.gradient_pointSE[t][e])!==o.gradient_pointSE[t][e]&&(a.efc_gradient_gradient[e+(t+1)].baseVal.value=o.gradient_pointSE[t][e]=n)})})}},dropShadow:{stats:{dropShadow_dx:{},dropShadow_dy:{},dropShadow_blur:{},dropShadow_color:{},dropShadow_opacity:{},dropShadow_x:{},dropShadow_y:{}},optionsConf:[["type","dx",null,null,null,2],["type","dy",null,null,null,4],["type","blur",null,null,null,3,function(e){return 0<=e}],["type","color",null,null,null,"#000",null,!0],["type","opacity",null,null,null,.8,function(e){return 0<=e&&e<=1}]],init:function(t){var e,n,a,i,o,l=t.baseWindow.document,r=t.defs,s=v+"-"+t._id+"-dropShadow",u=(e=l,n=s,o={},"boolean"!=typeof p&&(p=!!window.SVGFEDropShadowElement&&!ue),o.elmsAppend=[o.elmFilter=a=e.createElementNS(b,"filter")],a.filterUnits.baseVal=SVGUnitTypes.SVG_UNIT_TYPE_USERSPACEONUSE,a.x.baseVal.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PX,0),a.y.baseVal.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PX,0),a.width.baseVal.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PERCENTAGE,100),a.height.baseVal.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PERCENTAGE,100),a.id=n,p?(o.elmOffset=o.elmBlur=i=a.appendChild(e.createElementNS(b,"feDropShadow")),o.styleFlood=i.style):(o.elmBlur=a.appendChild(e.createElementNS(b,"feGaussianBlur")),o.elmOffset=i=a.appendChild(e.createElementNS(b,"feOffset")),i.result.baseVal="offsetblur",i=a.appendChild(e.createElementNS(b,"feFlood")),o.styleFlood=i.style,(i=a.appendChild(e.createElementNS(b,"feComposite"))).in2.baseVal="offsetblur",i.operator.baseVal=SVGFECompositeElement.SVG_FECOMPOSITE_OPERATOR_IN,(i=a.appendChild(e.createElementNS(b,"feMerge"))).appendChild(e.createElementNS(b,"feMergeNode")),i.appendChild(e.createElementNS(b,"feMergeNode")).in1.baseVal="SourceGraphic"),o);["elmFilter","elmOffset","elmBlur","styleFlood","elmsAppend"].forEach(function(e){t["efc_dropShadow_"+e]=u[e]}),u.elmsAppend.forEach(function(e){r.appendChild(e)}),t.face.setAttribute("filter","url(#"+s+")"),Ie(t,"new_edge4viewBox",te.dropShadow.adjustEdge),te.dropShadow.update(t)},remove:function(e){var t=e.defs;e.efc_dropShadow_elmsAppend&&(e.efc_dropShadow_elmsAppend.forEach(function(e){t.removeChild(e)}),e.efc_dropShadow_elmFilter=e.efc_dropShadow_elmOffset=e.efc_dropShadow_elmBlur=e.efc_dropShadow_styleFlood=e.efc_dropShadow_elmsAppend=null),Ce(e,"new_edge4viewBox",te.dropShadow.adjustEdge),De(e,{}),e.face.removeAttribute("filter"),Te(e.aplStats,te.dropShadow.stats)},update:function(e){var t,n,a=e.curStats,i=e.aplStats,o=i.dropShadow_options;a.dropShadow_dx=t=o.dx,We(e,i,"dropShadow_dx",t)&&(e.efc_dropShadow_elmOffset.dx.baseVal=t,n=!0),a.dropShadow_dy=t=o.dy,We(e,i,"dropShadow_dy",t)&&(e.efc_dropShadow_elmOffset.dy.baseVal=t,n=!0),a.dropShadow_blur=t=o.blur,We(e,i,"dropShadow_blur",t)&&(e.efc_dropShadow_elmBlur.setStdDeviation(t,t),n=!0),n&&De(e,{}),a.dropShadow_color=t=o.color,We(e,i,"dropShadow_color",t)&&(e.efc_dropShadow_styleFlood.floodColor=t),a.dropShadow_opacity=t=o.opacity,We(e,i,"dropShadow_opacity",t)&&(e.efc_dropShadow_styleFlood.floodOpacity=t)},adjustEdge:function(a,i){var e,t,o=a.curStats,l=a.aplStats;null!=o.dropShadow_dx&&(e=3*o.dropShadow_blur,(t={x1:i.x1-e+o.dropShadow_dx,y1:i.y1-e+o.dropShadow_dy,x2:i.x2+e+o.dropShadow_dx,y2:i.y2+e+o.dropShadow_dy}).x1<i.x1&&(i.x1=t.x1),t.y1<i.y1&&(i.y1=t.y1),t.x2>i.x2&&(i.x2=t.x2),t.y2>i.y2&&(i.y2=t.y2),["x","y"].forEach(function(e){var t,n="dropShadow_"+e;o[n]=t=i[e+"1"],We(a,l,n,t)&&(a.efc_dropShadow_elmFilter[e].baseVal.value=t)}))}}},Object.keys(te).forEach(function(e){var t=te[e],n=t.stats;n[e+"_enabled"]={iniValue:!1},n[e+"_options"]={hasProps:!0},t.anim&&(n[e+"_animOptions"]={},n[e+"_animId"]={})}),g={none:{defaultAnimOptions:{},init:function(e,t){var n=e.curStats;n.show_animId&&(c.remove(n.show_animId),n.show_animId=null),g.none.start(e,t)},start:function(e,t){g.none.stop(e,!0)},stop:function(e,t,n){var a=e.curStats;return n=null!=n?n:e.aplStats.show_on,a.show_inAnim=!1,t&&Ge(e,n),n?1:0}},fade:{defaultAnimOptions:{duration:300,timing:"linear"},init:function(n,e){var t=n.curStats,a=n.aplStats;t.show_animId&&c.remove(t.show_animId),t.show_animId=c.add(function(e){return e},function(e,t){t?g.fade.stop(n,!0):(n.svg.style.opacity=e+"",le&&(Ae(n,n.svg),Ve(n)))},a.show_animOptions.duration,1,a.show_animOptions.timing,null,!1),g.fade.start(n,e)},start:function(e,t){var n,a=e.curStats;a.show_inAnim&&(n=c.stop(a.show_animId)),Ge(e,1),a.show_inAnim=!0,c.start(a.show_animId,!e.aplStats.show_on,null!=t?t:n)},stop:function(e,t,n){var a,i=e.curStats;return n=null!=n?n:e.aplStats.show_on,a=i.show_inAnim?c.stop(i.show_animId):n?1:0,i.show_inAnim=!1,t&&(e.svg.style.opacity=n?"":"0",Ge(e,n)),a}},draw:{defaultAnimOptions:{duration:500,timing:[.58,0,.42,1]},init:function(n,e){var t=n.curStats,a=n.aplStats,l=n.pathList.baseVal,i=Oe(l),r=i.segsLen,s=i.lenAll;t.show_animId&&c.remove(t.show_animId),t.show_animId=c.add(function(e){var t,n,a,i,o=-1;if(0===e)n=[[l[0][0],l[0][0]]];else if(1===e)n=l;else{for(t=s*e,n=[];t>=r[++o];)n.push(l[o]),t-=r[o];t&&(2===(a=l[o]).length?n.push([a[0],ve(a[0],a[1],t/r[o])]):(i=xe(a[0],a[1],a[2],a[3],ke(a[0],a[1],a[2],a[3],t)),n.push([a[0],i.fromP1,i.fromP2,i])))}return n},function(e,t){t?g.draw.stop(n,!0):(n.pathList.animVal=e,De(n,{path:!0}))},a.show_animOptions.duration,1,a.show_animOptions.timing,null,!1),g.draw.start(n,e)},start:function(e,t){var n,a=e.curStats;a.show_inAnim&&(n=c.stop(a.show_animId)),Ge(e,1),a.show_inAnim=!0,Ie(e,"apl_position",g.draw.update),c.start(a.show_animId,!e.aplStats.show_on,null!=t?t:n)},stop:function(e,t,n){var a,i=e.curStats;return n=null!=n?n:e.aplStats.show_on,a=i.show_inAnim?c.stop(i.show_animId):n?1:0,i.show_inAnim=!1,t&&(e.pathList.animVal=n?null:[[e.pathList.baseVal[0][0],e.pathList.baseVal[0][0]]],De(e,{path:!0}),Ge(e,n)),a},update:function(e){Ce(e,"apl_position",g.draw.update),e.curStats.show_inAnim?g.draw.init(e,g.draw.stop(e)):e.aplStats.show_animOptions={}}}},function(){function r(n){return function(e){var t={};t[n]=e,this.setOptions(t)}}[["start","anchorSE",0],["end","anchorSE",1],["color","lineColor"],["size","lineSize"],["startSocketGravity","socketGravitySE",0],["endSocketGravity","socketGravitySE",1],["startPlugColor","plugColorSE",0],["endPlugColor","plugColorSE",1],["startPlugSize","plugSizeSE",0],["endPlugSize","plugSizeSE",1],["outline","lineOutlineEnabled"],["outlineColor","lineOutlineColor"],["outlineSize","lineOutlineSize"],["startPlugOutline","plugOutlineEnabledSE",0],["endPlugOutline","plugOutlineEnabledSE",1],["startPlugOutlineColor","plugOutlineColorSE",0],["endPlugOutlineColor","plugOutlineColorSE",1],["startPlugOutlineSize","plugOutlineSizeSE",0],["endPlugOutlineSize","plugOutlineSizeSE",1]].forEach(function(e){var t=e[0],n=e[1],a=e[2];Object.defineProperty(Ye.prototype,t,{get:function(){var e=null!=a?K[this._id].options[n][a]:n?K[this._id].options[n]:K[this._id].options[t];return null==e?x:de(e)},set:r(t),enumerable:!0})}),[["path",m],["startSocket",n,"socketSE",0],["endSocket",n,"socketSE",1],["startPlug",E,"plugSE",0],["endPlug",E,"plugSE",1]].forEach(function(e){var a=e[0],i=e[1],o=e[2],l=e[3];Object.defineProperty(Ye.prototype,a,{get:function(){var t,n=null!=l?K[this._id].options[o][l]:o?K[this._id].options[o]:K[this._id].options[a];return n?Object.keys(i).some(function(e){return i[e]===n&&(t=e,!0)})?t:new Error("It's broken"):x},set:r(a),enumerable:!0})}),Object.keys(te).forEach(function(n){var a=te[n];Object.defineProperty(Ye.prototype,n,{get:function(){var u,e,t=K[this._id].options[n];return k(t)?(u=t,e=a.optionsConf.reduce(function(e,t){var n,a=t[0],i=t[1],o=t[2],l=t[3],r=t[4],s=null!=r?u[l][r]:l?u[l]:u[i];return e[i]="id"===a?s?Object.keys(o).some(function(e){return o[e]===s&&(n=e,!0)})?n:new Error("It's broken"):x:null==s?x:de(s),e},{}),a.anim&&(e.animation=de(u.animation)),e):t},set:r(n),enumerable:!0})}),["startLabel","endLabel","middleLabel"].forEach(function(e,n){Object.defineProperty(Ye.prototype,e,{get:function(){var e=K[this._id],t=e.options;return t.labelSEM[n]&&!e.optionIsAttach.labelSEM[n]?$[t.labelSEM[n]._id].text:t.labelSEM[n]||""},set:r(e),enumerable:!0})})}(),Ye.prototype.setOptions=function(e){return Ze(K[this._id],e),this},Ye.prototype.position=function(){return De(K[this._id],{position:!0}),this},Ye.prototype.remove=function(){var t=K[this._id],n=t.curStats;Object.keys(te).forEach(function(e){var t=e+"_animId";n[t]&&c.remove(n[t])}),n.show_animId&&c.remove(n.show_animId),t.attachments.slice().forEach(function(e){Ue(t,e)}),t.baseWindow&&t.svg&&t.baseWindow.document.body.removeChild(t.svg),delete K[this._id]},Ye.prototype.show=function(e,t){return je(K[this._id],!0,e,t),this},Ye.prototype.hide=function(e,t){return je(K[this._id],!1,e,t),this},o=function(t){t&&$[t._id]&&(t.boundTargets.slice().forEach(function(e){Ue(e.props,t,!0)}),t.conf.remove&&t.conf.remove(t),delete $[t._id])},S=function(){function e(e,t){var n,a={conf:e,curStats:{},aplStats:{},boundTargets:[]},i={};e.argOptions.every(function(e){return!(!t.length||("string"==typeof e.type?typeof t[0]!==e.type:"function"!=typeof e.type||!e.type(t[0])))&&(i[e.optionName]=t.shift(),!0)}),n=t.length&&k(t[0])?de(t[0]):{},Object.keys(i).forEach(function(e){n[e]=i[e]}),e.stats&&(Te(a.curStats,e.stats),Te(a.aplStats,e.stats)),Object.defineProperty(this,"_id",{value:++ee}),Object.defineProperty(this,"isRemoved",{get:function(){return!$[this._id]}}),a._id=this._id,e.init&&!e.init(a,n)||($[this._id]=a)}return e.prototype.remove=function(){var t=this,n=$[t._id];n&&(n.boundTargets.slice().forEach(function(e){n.conf.removeOption(n,e)}),Le(function(){var e=$[t._id];e&&(console.error("LeaderLineAttachment was not removed by removeOption"),o(e))}))},e}(),window.LeaderLineAttachment=S,_=function(e,t){return e instanceof S&&(!(e.isRemoved||t&&$[e._id].conf.type!==t)||null)},y={pointAnchor:{type:"anchor",argOptions:[{optionName:"element",type:ye}],init:function(e,t){return e.element=y.pointAnchor.checkElement(t.element),e.x=y.pointAnchor.parsePercent(t.x,!0)||[.5,!0],e.y=y.pointAnchor.parsePercent(t.y,!0)||[.5,!0],!0},removeOption:function(e,t){var n=t.props,a={},i=e.element,o=n.options.anchorSE["start"===t.optionName?1:0];i===o&&(i=o===document.body?new S(y.pointAnchor,[i]):document.body),a[t.optionName]=i,Ze(n,a)},getBBoxNest:function(e,t){var n=ge(e.element,t.baseWindow),a=n.width,i=n.height;return n.width=n.height=0,n.left=n.right=n.left+e.x[0]*(e.x[1]?a:1),n.top=n.bottom=n.top+e.y[0]*(e.y[1]?i:1),n},parsePercent:function(e,t){var n,a,i=!1;return w(e)?a=e:"string"==typeof e&&(n=u.exec(e))&&n[2]&&(i=0!==(a=parseFloat(n[1])/100)),null!=a&&(t||0<=a)?[a,i]:null},checkElement:function(e){if(null==e)e=document.body;else if(!ye(e))throw new Error("`element` must be Element");return e}},areaAnchor:{type:"anchor",argOptions:[{optionName:"element",type:ye},{optionName:"shape",type:"string"}],stats:{color:{},strokeWidth:{},elementWidth:{},elementHeight:{},elementLeft:{},elementTop:{},pathListRel:{},bBoxRel:{},pathData:{},viewBoxBBox:{hasProps:!0},dashLen:{},dashGap:{}},init:function(i,e){var t,n,a,o=[];return i.element=y.pointAnchor.checkElement(e.element),"string"==typeof e.color&&(i.color=e.color.trim()),"string"==typeof e.fillColor&&(i.fill=e.fillColor.trim()),w(e.size)&&0<=e.size&&(i.size=e.size),e.dash&&(i.dash=!0,w(e.dash.len)&&0<e.dash.len&&(i.dashLen=e.dash.len),w(e.dash.gap)&&0<e.dash.gap&&(i.dashGap=e.dash.gap)),"circle"===e.shape?i.shape=e.shape:"polygon"===e.shape&&Array.isArray(e.points)&&3<=e.points.length&&e.points.every(function(e){var t={};return!(!(t.x=y.pointAnchor.parsePercent(e[0],!0))||!(t.y=y.pointAnchor.parsePercent(e[1],!0)))&&(o.push(t),(t.x[1]||t.y[1])&&(i.hasRatio=!0),!0)})?(i.shape=e.shape,i.points=o):(i.shape="rect",i.radius=w(e.radius)&&0<=e.radius?e.radius:0),"rect"!==i.shape&&"circle"!==i.shape||(i.x=y.pointAnchor.parsePercent(e.x,!0)||[-.05,!0],i.y=y.pointAnchor.parsePercent(e.y,!0)||[-.05,!0],i.width=y.pointAnchor.parsePercent(e.width)||[1.1,!0],i.height=y.pointAnchor.parsePercent(e.height)||[1.1,!0],(i.x[1]||i.y[1]||i.width[1]||i.height[1])&&(i.hasRatio=!0)),t=i.element.ownerDocument,i.svg=n=t.createElementNS(b,"svg"),n.className.baseVal=v+"-areaAnchor",n.viewBox.baseVal||n.setAttribute("viewBox","0 0 0 0"),i.path=n.appendChild(t.createElementNS(b,"path")),i.path.style.fill=i.fill||"none",i.isShown=!1,n.style.visibility="hidden",t.body.appendChild(n),Re(a=t.defaultView),i.bodyOffset=Be(a),i.updateColor=function(){var e,t=i.curStats,n=i.aplStats,a=i.boundTargets.length?i.boundTargets[0].props.curStats:null;t.color=e=i.color||(a?a.line_color:pe.lineColor),We(i,n,"color",e)&&(i.path.style.stroke=e)},i.updateShow=function(){Ge(i,i.boundTargets.some(function(e){return!0===e.props.isShown}))},!0},bind:function(e,t){var n=t.props;return e.color||Ie(n,"cur_line_color",e.updateColor),Ie(n,"svgShow",e.updateShow),Le(function(){e.updateColor(),e.updateShow()}),!0},unbind:function(e,t){var n=t.props;e.color||Ce(n,"cur_line_color",e.updateColor),Ce(n,"svgShow",e.updateShow),1<e.boundTargets.length&&Le(function(){e.updateColor(),e.updateShow(),y.areaAnchor.update(e)&&e.boundTargets.forEach(function(e){De(e.props,{position:!0})})})},removeOption:function(e,t){y.pointAnchor.removeOption(e,t)},remove:function(t){t.boundTargets.length&&(console.error("LeaderLineAttachment was not unbound by remove"),t.boundTargets.forEach(function(e){y.areaAnchor.unbind(t,e)})),t.svg.parentNode.removeChild(t.svg)},getStrokeWidth:function(e,t){return y.areaAnchor.update(e)&&1<e.boundTargets.length&&Le(function(){e.boundTargets.forEach(function(e){e.props!==t&&De(e.props,{position:!0})})}),e.curStats.strokeWidth},getPathData:function(e,t){var n=ge(e.element,t.baseWindow);return we(e.curStats.pathListRel,function(e){e.x+=n.left,e.y+=n.top})},getBBoxNest:function(e,t){var n=ge(e.element,t.baseWindow),a=e.curStats.bBoxRel;return{left:a.left+n.left,top:a.top+n.top,right:a.right+n.left,bottom:a.bottom+n.top,width:a.width,height:a.height}},update:function(t){var a,n,i,o,e,l,r,s,u,h,p,c,d,f,y,S,m,g,_,v,E,x,b,k,w,O,M,I,C,L,A,V,P=t.curStats,N=t.aplStats,T=t.boundTargets.length?t.boundTargets[0].props.curStats:null,W={};if(W.strokeWidth=We(t,P,"strokeWidth",null!=t.size?t.size:T?T.line_strokeWidth:pe.lineSize),a=Se(t.element),W.elementWidth=We(t,P,"elementWidth",a.width),W.elementHeight=We(t,P,"elementHeight",a.height),W.elementLeft=We(t,P,"elementLeft",a.left),W.elementTop=We(t,P,"elementTop",a.top),W.strokeWidth||t.hasRatio&&(W.elementWidth||W.elementHeight)){switch(t.shape){case"rect":(v={left:t.x[0]*(t.x[1]?a.width:1),top:t.y[0]*(t.y[1]?a.height:1),width:t.width[0]*(t.width[1]?a.width:1),height:t.height[0]*(t.height[1]?a.height:1)}).right=v.left+v.width,v.bottom=v.top+v.height,k=P.strokeWidth/2,x=(b=Math.min(v.width,v.height))?b/2*Math.SQRT2+k:0,(E=t.radius?t.radius<=x?t.radius:x:0)?(O=E-(w=(E-k)/Math.SQRT2),I=E*U,M=[{x:v.left-O,y:v.top+w},{x:v.left+w,y:v.top-O},{x:v.right-w,y:v.top-O},{x:v.right+O,y:v.top+w},{x:v.right+O,y:v.bottom-w},{x:v.right-w,y:v.bottom+O},{x:v.left+w,y:v.bottom+O},{x:v.left-O,y:v.bottom-w}],P.pathListRel=[[M[0],{x:M[0].x,y:M[0].y-I},{x:M[1].x-I,y:M[1].y},M[1]]],M[1].x!==M[2].x&&P.pathListRel.push([M[1],M[2]]),P.pathListRel.push([M[2],{x:M[2].x+I,y:M[2].y},{x:M[3].x,y:M[3].y-I},M[3]]),M[3].y!==M[4].y&&P.pathListRel.push([M[3],M[4]]),P.pathListRel.push([M[4],{x:M[4].x,y:M[4].y+I},{x:M[5].x+I,y:M[5].y},M[5]]),M[5].x!==M[6].x&&P.pathListRel.push([M[5],M[6]]),P.pathListRel.push([M[6],{x:M[6].x-I,y:M[6].y},{x:M[7].x,y:M[7].y+I},M[7]]),M[7].y!==M[0].y&&P.pathListRel.push([M[7],M[0]]),P.pathListRel.push([]),O=E-w+P.strokeWidth/2,M=[{x:v.left-O,y:v.top-O},{x:v.right+O,y:v.bottom+O}]):(O=P.strokeWidth/2,M=[{x:v.left-O,y:v.top-O},{x:v.right+O,y:v.bottom+O}],P.pathListRel=[[M[0],{x:M[1].x,y:M[0].y}],[{x:M[1].x,y:M[0].y},M[1]],[M[1],{x:M[0].x,y:M[1].y}],[]],M=[{x:v.left-P.strokeWidth,y:v.top-P.strokeWidth},{x:v.right+P.strokeWidth,y:v.bottom+P.strokeWidth}]),P.bBoxRel={left:M[0].x,top:M[0].y,right:M[1].x,bottom:M[1].y,width:M[1].x-M[0].x,height:M[1].y-M[0].y};break;case"circle":(r={left:t.x[0]*(t.x[1]?a.width:1),top:t.y[0]*(t.y[1]?a.height:1),width:t.width[0]*(t.width[1]?a.width:1),height:t.height[0]*(t.height[1]?a.height:1)}).width||r.height||(r.width=r.height=10),r.width||(r.width=r.height),r.height||(r.height=r.width),r.right=r.left+r.width,r.bottom=r.top+r.height,s=r.left+r.width/2,u=r.top+r.height/2,f=P.strokeWidth/2,y=r.width/2,S=r.height/2,h=y*Math.SQRT2+f,p=S*Math.SQRT2+f,c=h*U,d=p*U,_=[{x:s-h,y:u},{x:s,y:u-p},{x:s+h,y:u},{x:s,y:u+p}],P.pathListRel=[[_[0],{x:_[0].x,y:_[0].y-d},{x:_[1].x-c,y:_[1].y},_[1]],[_[1],{x:_[1].x+c,y:_[1].y},{x:_[2].x,y:_[2].y-d},_[2]],[_[2],{x:_[2].x,y:_[2].y+d},{x:_[3].x+c,y:_[3].y},_[3]],[_[3],{x:_[3].x-c,y:_[3].y},{x:_[0].x,y:_[0].y+d},_[0]],[]],m=h-y+P.strokeWidth/2,g=p-S+P.strokeWidth/2,_=[{x:r.left-m,y:r.top-g},{x:r.right+m,y:r.bottom+g}],P.bBoxRel={left:_[0].x,top:_[0].y,right:_[1].x,bottom:_[1].y,width:_[1].x-_[0].x,height:_[1].y-_[0].y};break;case"polygon":t.points.forEach(function(e){var t=e.x[0]*(e.x[1]?a.width:1),n=e.y[0]*(e.y[1]?a.height:1);i?(t<i.left&&(i.left=t),t>i.right&&(i.right=t),n<i.top&&(i.top=n),n>i.bottom&&(i.bottom=n)):i={left:t,right:t,top:n,bottom:n},o?P.pathListRel.push([o,{x:t,y:n}]):P.pathListRel=[],o={x:t,y:n}}),P.pathListRel.push([]),e=P.strokeWidth/2,l=[{x:i.left-e,y:i.top-e},{x:i.right+e,y:i.bottom+e}],P.bBoxRel={left:l[0].x,top:l[0].y,right:l[1].x,bottom:l[1].y,width:l[1].x-l[0].x,height:l[1].y-l[0].y}}W.pathListRel=W.bBoxRel=!0}return(W.pathListRel||W.elementLeft||W.elementTop)&&(P.pathData=we(P.pathListRel,function(e){e.x+=a.left,e.y+=a.top})),We(t,N,"strokeWidth",n=P.strokeWidth)&&(t.path.style.strokeWidth=n+"px"),Me(n=P.pathData,N.pathData)&&(t.path.setPathData(n),N.pathData=n,W.pathData=!0),t.dash&&(!W.pathData&&(!W.strokeWidth||t.dashLen&&t.dashGap)||(P.dashLen=t.dashLen||2*P.strokeWidth,P.dashGap=t.dashGap||P.strokeWidth),W.dash=We(t,N,"dashLen",P.dashLen)||W.dash,W.dash=We(t,N,"dashGap",P.dashGap)||W.dash,W.dash&&(t.path.style.strokeDasharray=N.dashLen+","+N.dashGap)),C=P.viewBoxBBox,L=N.viewBoxBBox,A=t.svg.viewBox.baseVal,V=t.svg.style,C.x=P.bBoxRel.left+a.left,C.y=P.bBoxRel.top+a.top,C.width=P.bBoxRel.width,C.height=P.bBoxRel.height,["x","y","width","height"].forEach(function(e){(n=C[e])!==L[e]&&(A[e]=L[e]=n,V[oe[e]]=n+("x"===e||"y"===e?t.bodyOffset[e]:0)+"px")}),W.strokeWidth||W.pathListRel||W.bBoxRel}},mouseHoverAnchor:{type:"anchor",argOptions:[{optionName:"element",type:ye},{optionName:"showEffectName",type:"string"}],style:{backgroundImage:"url('data:image/svg+xml;charset=utf-8;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cG9seWdvbiBwb2ludHM9IjI0LDAgMCw4IDgsMTEgMCwxOSA1LDI0IDEzLDE2IDE2LDI0IiBmaWxsPSJjb3JhbCIvPjwvc3ZnPg==')",backgroundSize:"",backgroundRepeat:"no-repeat",backgroundColor:"#f8f881",cursor:"default"},hoverStyle:{backgroundImage:"none",backgroundColor:"#fadf8f"},padding:{top:1,right:15,bottom:1,left:2},minHeight:15,backgroundPosition:{right:2,top:2},backgroundSize:{width:12,height:12},dirKeys:[["top","Top"],["right","Right"],["bottom","Bottom"],["left","Left"]],init:function(a,i){var o,t,e,n,l,r,s,u,h,p,c,d=y.mouseHoverAnchor,f={};if(a.element=y.pointAnchor.checkElement(i.element),u=a.element,!((p=u.ownerDocument)&&(h=p.defaultView)&&h.HTMLElement&&u instanceof h.HTMLElement))throw new Error("`element` must be HTML element");return d.style.backgroundSize=d.backgroundSize.width+"px "+d.backgroundSize.height+"px",["style","hoverStyle"].forEach(function(e){var n=d[e];a[e]=Object.keys(n).reduce(function(e,t){return e[t]=n[t],e},{})}),"inline"===(o=a.element.ownerDocument.defaultView.getComputedStyle(a.element,"")).display?a.style.display="inline-block":"none"===o.display&&(a.style.display="block"),y.mouseHoverAnchor.dirKeys.forEach(function(e){var t=e[0],n="padding"+e[1];parseFloat(o[n])<d.padding[t]&&(a.style[n]=d.padding[t]+"px")}),a.style.display&&(n=a.element.style.display,a.element.style.display=a.style.display),y.mouseHoverAnchor.dirKeys.forEach(function(e){var t="padding"+e[1];a.style[t]&&(f[t]=a.element.style[t],a.element.style[t]=a.style[t])}),(e=a.element.getBoundingClientRect()).height<d.minHeight&&(le?(c=d.minHeight,"content-box"===o.boxSizing?c-=parseFloat(o.borderTopWidth)+parseFloat(o.borderBottomWidth)+parseFloat(o.paddingTop)+parseFloat(o.paddingBottom):"padding-box"===o.boxSizing&&(c-=parseFloat(o.borderTopWidth)+parseFloat(o.borderBottomWidth)),a.style.height=c+"px"):a.style.height=parseFloat(o.height)+(d.minHeight-e.height)+"px"),a.style.backgroundPosition=ue?e.width-d.backgroundSize.width-d.backgroundPosition.right+"px "+d.backgroundPosition.top+"px":"right "+d.backgroundPosition.right+"px top "+d.backgroundPosition.top+"px",a.style.display&&(a.element.style.display=n),y.mouseHoverAnchor.dirKeys.forEach(function(e){var t="padding"+e[1];a.style[t]&&(a.element.style[t]=f[t])}),["style","hoverStyle"].forEach(function(e){var t=a[e],n=i[e];k(n)&&Object.keys(n).forEach(function(e){"string"==typeof n[e]||w(n[e])?t[e]=n[e]:null==n[e]&&delete t[e]})}),"function"==typeof i.onSwitch&&(s=i.onSwitch),i.showEffectName&&g[i.showEffectName]&&(a.showEffectName=l=i.showEffectName),r=i.animOptions,a.elmStyle=t=a.element.style,a.mouseenter=function(e){a.hoverStyleSave=d.getStyles(t,Object.keys(a.hoverStyle)),d.setStyles(t,a.hoverStyle),a.boundTargets.forEach(function(e){je(e.props,!0,l,r)}),s&&s(e)},a.mouseleave=function(e){d.setStyles(t,a.hoverStyleSave),a.boundTargets.forEach(function(e){je(e.props,!1,l,r)}),s&&s(e)},!0},bind:function(e,t){var n,a,i,o,l;return t.props.svg?y.mouseHoverAnchor.llShow(t.props,!1,e.showEffectName):Le(function(){y.mouseHoverAnchor.llShow(t.props,!1,e.showEffectName)}),e.enabled||(e.styleSave=y.mouseHoverAnchor.getStyles(e.elmStyle,Object.keys(e.style)),y.mouseHoverAnchor.setStyles(e.elmStyle,e.style),e.removeEventListener=(n=e.element,a=e.mouseenter,i=e.mouseleave,"onmouseenter"in n&&"onmouseleave"in n?(n.addEventListener("mouseenter",a,!1),n.addEventListener("mouseleave",i,!1),function(){n.removeEventListener("mouseenter",a,!1),n.removeEventListener("mouseleave",i,!1)}):(console.warn("mouseenter and mouseleave events polyfill is enabled."),o=function(e){e.relatedTarget&&(e.relatedTarget===this||this.compareDocumentPosition(e.relatedTarget)&Node.DOCUMENT_POSITION_CONTAINED_BY)||a.apply(this,arguments)},n.addEventListener("mouseover",o),l=function(e){e.relatedTarget&&(e.relatedTarget===this||this.compareDocumentPosition(e.relatedTarget)&Node.DOCUMENT_POSITION_CONTAINED_BY)||i.apply(this,arguments)},n.addEventListener("mouseout",l),function(){n.removeEventListener("mouseover",o,!1),n.removeEventListener("mouseout",l,!1)})),e.enabled=!0),!0},unbind:function(e,t){e.enabled&&e.boundTargets.length<=1&&(e.removeEventListener(),y.mouseHoverAnchor.setStyles(e.elmStyle,e.styleSave),e.enabled=!1),y.mouseHoverAnchor.llShow(t.props,!0,e.showEffectName)},removeOption:function(e,t){y.pointAnchor.removeOption(e,t)},remove:function(t){t.boundTargets.length&&(console.error("LeaderLineAttachment was not unbound by remove"),t.boundTargets.forEach(function(e){y.mouseHoverAnchor.unbind(t,e)}))},getBBoxNest:function(e,t){return ge(e.element,t.baseWindow)},llShow:function(e,t,n){g[n||e.curStats.show_effect].stop(e,!0,t),e.aplStats.show_on=t},getStyles:function(n,e){return e.reduce(function(e,t){return e[t]=n[t],e},{})},setStyles:function(t,n){Object.keys(n).forEach(function(e){t[e]=n[e]})}},captionLabel:{type:"label",argOptions:[{optionName:"text",type:"string"}],stats:{color:{},x:{},y:{}},textStyleProps:["fontFamily","fontStyle","fontVariant","fontWeight","fontStretch","fontSize","fontSizeAdjust","kerning","letterSpacing","wordSpacing","textDecoration"],init:function(u,t){return"string"==typeof t.text&&(u.text=t.text.trim()),!!u.text&&("string"==typeof t.color&&(u.color=t.color.trim()),u.outlineColor="string"==typeof t.outlineColor?t.outlineColor.trim():"#fff",Array.isArray(t.offset)&&w(t.offset[0])&&w(t.offset[1])&&(u.offset={x:t.offset[0],y:t.offset[1]}),w(t.lineOffset)&&(u.lineOffset=t.lineOffset),y.captionLabel.textStyleProps.forEach(function(e){null!=t[e]&&(u[e]=t[e])}),u.updateColor=function(e){y.captionLabel.updateColor(u,e)},u.updateSocketXY=function(e){var t,n,a,i,o=u.curStats,l=u.aplStats,r=e.curStats,s=r.position_socketXYSE[u.socketIndex];null!=s.x&&(u.offset?(o.x=s.x+u.offset.x,o.y=s.y+u.offset.y):(t=u.height/2,n=Math.max(r.attach_plugSideLenSE[u.socketIndex]||0,r.line_strokeWidth/2),a=r.position_socketXYSE[u.socketIndex?0:1],s.socketId===L||s.socketId===I?(o.x=s.socketId===L?s.x-t-u.width:s.x+t,o.y=a.y<s.y?s.y+n+t:s.y-n-t-u.height):(o.x=a.x<s.x?s.x+n+t:s.x-n-t-u.width,o.y=s.socketId===M?s.y-t-u.height:s.y+t)),We(u,l,"x",i=o.x)&&(u.elmPosition.x.baseVal.getItem(0).value=i),We(u,l,"y",i=o.y)&&(u.elmPosition.y.baseVal.getItem(0).value=i+u.height))},u.updatePath=function(e){var t,n,a=u.curStats,i=u.aplStats,o=e.pathList.animVal||e.pathList.baseVal;o&&(t=y.captionLabel.getMidPoint(o,u.lineOffset),a.x=t.x-u.width/2,a.y=t.y-u.height/2,We(u,i,"x",n=a.x)&&(u.elmPosition.x.baseVal.getItem(0).value=n),We(u,i,"y",n=a.y)&&(u.elmPosition.y.baseVal.getItem(0).value=n+u.height))},u.updateShow=function(e){y.captionLabel.updateShow(u,e)},ue&&(u.adjustEdge=function(e,t){var n=u.curStats;null!=n.x&&y.captionLabel.adjustEdge(t,{x:n.x,y:n.y,width:u.width,height:u.height},u.strokeWidth/2)}),!0)},updateColor:function(e,t){var n,a=e.curStats,i=e.aplStats,o=t.curStats;a.color=n=e.color||o.line_color,We(e,i,"color",n)&&(e.styleFill.fill=n)},updateShow:function(e,t){var n=!0===t.isShown;n!==e.isShown&&(e.styleShow.visibility=n?"":"hidden",e.isShown=n)},adjustEdge:function(e,t,n){var a={x1:t.x-n,y1:t.y-n,x2:t.x+t.width+n,y2:t.y+t.height+n};a.x1<e.x1&&(e.x1=a.x1),a.y1<e.y1&&(e.y1=a.y1),a.x2>e.x2&&(e.x2=a.x2),a.y2>e.y2&&(e.y2=a.y2)},newText:function(e,t,n,a,i){var o,l,r,s,u,h;return(o=t.createElementNS(b,"text")).textContent=e,[o.x,o.y].forEach(function(e){var t=n.createSVGLength();t.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PX,0),e.baseVal.initialize(t)}),"boolean"!=typeof f&&(f="paintOrder"in o.style),i&&!f?(r=t.createElementNS(b,"defs"),o.id=a,r.appendChild(o),(u=(l=t.createElementNS(b,"g")).appendChild(t.createElementNS(b,"use"))).href.baseVal="#"+a,(s=l.appendChild(t.createElementNS(b,"use"))).href.baseVal="#"+a,(h=u.style).strokeLinejoin="round",{elmPosition:o,styleText:o.style,styleFill:s.style,styleStroke:h,styleShow:l.style,elmsAppend:[r,l]}):(h=o.style,i&&(h.strokeLinejoin="round",h.paintOrder="stroke"),{elmPosition:o,styleText:h,styleFill:h,styleStroke:i?h:null,styleShow:h,elmsAppend:[o]})},getMidPoint:function(e,t){var n,a,i,o=Oe(e),l=o.segsLen,r=o.lenAll,s=-1;if((n=r/2+(t||0))<=0)return 2===(a=e[0]).length?ve(a[0],a[1],0):xe(a[0],a[1],a[2],a[3],0);if(r<=n)return 2===(a=e[e.length-1]).length?ve(a[0],a[1],1):xe(a[0],a[1],a[2],a[3],1);for(i=[];n>l[++s];)i.push(e[s]),n-=l[s];return 2===(a=e[s]).length?ve(a[0],a[1],n/l[s]):xe(a[0],a[1],a[2],a[3],ke(a[0],a[1],a[2],a[3],n))},initSvg:function(t,n){var e,a,i=y.captionLabel.newText(t.text,n.baseWindow.document,n.svg,v+"-captionLabel-"+t._id,t.outlineColor);["elmPosition","styleFill","styleShow","elmsAppend"].forEach(function(e){t[e]=i[e]}),t.isShown=!1,t.styleShow.visibility="hidden",y.captionLabel.textStyleProps.forEach(function(e){null!=t[e]&&(i.styleText[e]=t[e])}),i.elmsAppend.forEach(function(e){n.svg.appendChild(e)}),e=i.elmPosition.getBBox(),t.width=e.width,t.height=e.height,t.outlineColor&&(a=10<(a=e.height/9)?10:a<2?2:a,i.styleStroke.strokeWidth=a+"px",i.styleStroke.stroke=t.outlineColor),t.strokeWidth=a||0,Te(t.aplStats,y.captionLabel.stats),t.updateColor(n),t.refSocketXY?t.updateSocketXY(n):t.updatePath(n),ue&&De(n,{}),t.updateShow(n)},bind:function(e,t){var n=t.props;return e.color||Ie(n,"cur_line_color",e.updateColor),(e.refSocketXY="startLabel"===t.optionName||"endLabel"===t.optionName)?(e.socketIndex="startLabel"===t.optionName?0:1,Ie(n,"apl_position",e.updateSocketXY),e.offset||(Ie(n,"cur_attach_plugSideLenSE",e.updateSocketXY),Ie(n,"cur_line_strokeWidth",e.updateSocketXY))):Ie(n,"apl_path",e.updatePath),Ie(n,"svgShow",e.updateShow),ue&&Ie(n,"new_edge4viewBox",e.adjustEdge),y.captionLabel.initSvg(e,n),!0},unbind:function(e,t){var n=t.props;e.elmsAppend&&(e.elmsAppend.forEach(function(e){n.svg.removeChild(e)}),e.elmPosition=e.styleFill=e.styleShow=e.elmsAppend=null),Te(e.curStats,y.captionLabel.stats),Te(e.aplStats,y.captionLabel.stats),e.color||Ce(n,"cur_line_color",e.updateColor),e.refSocketXY?(Ce(n,"apl_position",e.updateSocketXY),e.offset||(Ce(n,"cur_attach_plugSideLenSE",e.updateSocketXY),Ce(n,"cur_line_strokeWidth",e.updateSocketXY))):Ce(n,"apl_path",e.updatePath),Ce(n,"svgShow",e.updateShow),ue&&(Ce(n,"new_edge4viewBox",e.adjustEdge),De(n,{}))},removeOption:function(e,t){var n=t.props,a={};a[t.optionName]="",Ze(n,a)},remove:function(t){t.boundTargets.length&&(console.error("LeaderLineAttachment was not unbound by remove"),t.boundTargets.forEach(function(e){y.captionLabel.unbind(t,e)}))}},pathLabel:{type:"label",argOptions:[{optionName:"text",type:"string"}],stats:{color:{},startOffset:{},pathData:{}},init:function(s,t){return"string"==typeof t.text&&(s.text=t.text.trim()),!!s.text&&("string"==typeof t.color&&(s.color=t.color.trim()),s.outlineColor="string"==typeof t.outlineColor?t.outlineColor.trim():"#fff",w(t.lineOffset)&&(s.lineOffset=t.lineOffset),y.captionLabel.textStyleProps.forEach(function(e){null!=t[e]&&(s[e]=t[e])}),s.updateColor=function(e){y.captionLabel.updateColor(s,e)},s.updatePath=function(e){var t,n=s.curStats,a=s.aplStats,i=e.curStats,o=e.pathList.animVal||e.pathList.baseVal;o&&(n.pathData=t=y.pathLabel.getOffsetPathData(o,i.line_strokeWidth/2+s.strokeWidth/2+s.height/4,1.25*s.height),Me(t,a.pathData)&&(s.elmPath.setPathData(t),a.pathData=t,s.bBox=s.elmPosition.getBBox(),s.updateStartOffset(e)))},s.updateStartOffset=function(e){var t,n,a,i,o=s.curStats,l=s.aplStats,r=e.curStats;o.pathData&&((2!==s.semIndex||s.lineOffset)&&(t=o.pathData.reduce(function(e,t){var n,a=t.values;switch(t.type){case"M":i={x:a[0],y:a[1]};break;case"L":n={x:a[0],y:a[1]},i&&(e+=_e(i,n)),i=n;break;case"C":n={x:a[4],y:a[5]},i&&(e+=be(i,{x:a[0],y:a[1]},{x:a[2],y:a[3]},n)),i=n}return e},0),a=0===s.semIndex?0:1===s.semIndex?t:t/2,2!==s.semIndex&&(n=Math.max(r.attach_plugBackLenSE[s.semIndex]||0,r.line_strokeWidth/2)+s.strokeWidth/2+s.height/4,a=(a+=0===s.semIndex?n:-n)<0?0:t<a?t:a),s.lineOffset&&(a=(a+=s.lineOffset)<0?0:t<a?t:a),o.startOffset=a,We(s,l,"startOffset",a)&&(s.elmOffset.startOffset.baseVal.value=a)))},s.updateShow=function(e){y.captionLabel.updateShow(s,e)},ue&&(s.adjustEdge=function(e,t){s.bBox&&y.captionLabel.adjustEdge(t,s.bBox,s.strokeWidth/2)}),!0)},getOffsetPathData:function(e,x,n){var b,a,i=3,k=[];function w(e,t){return Math.abs(e.x-t.x)<i&&Math.abs(e.y-t.y)<i}return e.forEach(function(e){var t,n,a,i,o,l,r,s,u,h,p,c,d,f,y,S,m,g,_,v,E;2===e.length?(g=e[0],_=e[1],v=x,E=Math.atan2(g.y-_.y,_.x-g.x)+.5*Math.PI,t=[{x:g.x+Math.cos(E)*v,y:g.y+Math.sin(E)*v*-1},{x:_.x+Math.cos(E)*v,y:_.y+Math.sin(E)*v*-1}],b?(a=b.points,0<=(i=Math.atan2(a[1].y-a[0].y,a[0].x-a[1].x)-Math.atan2(e[0].y-e[1].y,e[1].x-e[0].x))&&i<=Math.PI?n={type:"line",points:t,inside:!0}:(l=Ee(a[0],a[1],x),o=Ee(t[1],t[0],x),s=a[0],h=o,p=t[1],c=(u=l).x-s.x,d=u.y-s.y,f=p.x-h.x,y=p.y-h.y,S=(-d*(s.x-h.x)+c*(s.y-h.y))/(-f*d+c*y),m=(f*(s.y-h.y)-y*(s.x-h.x))/(-f*d+c*y),(r=0<=S&&S<=1&&0<=m&&m<=1?{x:s.x+m*c,y:s.y+m*d}:null)?n={type:"line",points:[a[1]=r,t[1]]}:(a[1]=w(o,l)?o:l,n={type:"line",points:[o,t[1]]}),b.len=_e(a[0],a[1]))):n={type:"line",points:t},n.len=_e(n.points[0],n.points[1]),k.push(b=n)):(k.push({type:"cubic",points:function(e,t,n,a,i,o){for(var l,r,s=be(e,t,n,a)/o,u=1/(o<i?s*(i/o):s),h=[],p=0;r=(90-(l=xe(e,t,n,a,p)).angle)*(Math.PI/180),h.push({x:l.x+Math.cos(r)*i,y:l.y+Math.sin(r)*i*-1}),!(1<=p);)1<(p+=u)&&(p=1);return h}(e[0],e[1],e[2],e[3],x,16)}),b=null)}),b=null,k.forEach(function(e){var t;"line"===e.type?(e.inside&&(b.len>x?((t=b.points)[1]=Ee(t[0],t[1],-x),b.len=_e(t[0],t[1])):(b.points=null,b.len=0),e.len>x+n?((t=e.points)[0]=Ee(t[1],t[0],-(x+n)),e.len=_e(t[0],t[1])):(e.points=null,e.len=0)),b=e):b=null}),k.reduce(function(t,e){var n=e.points;return n&&(a&&w(n[0],a)||t.push({type:"M",values:[n[0].x,n[0].y]}),"line"===e.type?t.push({type:"L",values:[n[1].x,n[1].y]}):(n.shift(),n.forEach(function(e){t.push({type:"L",values:[e.x,e.y]})})),a=n[n.length-1]),t},[])},newText:function(e,t,n,a){var i,o,l,r,s,u,h,p,c,d;return(r=(l=t.createElementNS(b,"defs")).appendChild(t.createElementNS(b,"path"))).id=i=n+"-path",(u=(s=t.createElementNS(b,"text")).appendChild(t.createElementNS(b,"textPath"))).href.baseVal="#"+i,u.startOffset.baseVal.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PX,0),u.textContent=e,"boolean"!=typeof f&&(f="paintOrder"in s.style),a&&!f?(s.id=o=n+"-text",l.appendChild(s),(c=(h=t.createElementNS(b,"g")).appendChild(t.createElementNS(b,"use"))).href.baseVal="#"+o,(p=h.appendChild(t.createElementNS(b,"use"))).href.baseVal="#"+o,(d=c.style).strokeLinejoin="round",{elmPosition:s,elmPath:r,elmOffset:u,styleText:s.style,styleFill:p.style,styleStroke:d,styleShow:h.style,elmsAppend:[l,h]}):(d=s.style,a&&(d.strokeLinejoin="round",d.paintOrder="stroke"),{elmPosition:s,elmPath:r,elmOffset:u,styleText:d,styleFill:d,styleStroke:a?d:null,styleShow:d,elmsAppend:[l,s]})},initSvg:function(t,n){var e,a,i=y.pathLabel.newText(t.text,n.baseWindow.document,v+"-pathLabel-"+t._id,t.outlineColor);["elmPosition","elmPath","elmOffset","styleFill","styleShow","elmsAppend"].forEach(function(e){t[e]=i[e]}),t.isShown=!1,t.styleShow.visibility="hidden",y.captionLabel.textStyleProps.forEach(function(e){null!=t[e]&&(i.styleText[e]=t[e])}),i.elmsAppend.forEach(function(e){n.svg.appendChild(e)}),i.elmPath.setPathData([{type:"M",values:[0,100]},{type:"h",values:[100]}]),e=i.elmPosition.getBBox(),i.styleText.textAnchor=["start","end","middle"][t.semIndex],2!==t.semIndex||t.lineOffset||i.elmOffset.startOffset.baseVal.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PERCENTAGE,50),t.height=e.height,t.outlineColor&&(a=10<(a=e.height/9)?10:a<2?2:a,i.styleStroke.strokeWidth=a+"px",i.styleStroke.stroke=t.outlineColor),t.strokeWidth=a||0,Te(t.aplStats,y.pathLabel.stats),t.updateColor(n),t.updatePath(n),t.updateStartOffset(n),ue&&De(n,{}),t.updateShow(n)},bind:function(e,t){var n=t.props;return e.color||Ie(n,"cur_line_color",e.updateColor),Ie(n,"cur_line_strokeWidth",e.updatePath),Ie(n,"apl_path",e.updatePath),e.semIndex="startLabel"===t.optionName?0:"endLabel"===t.optionName?1:2,(2!==e.semIndex||e.lineOffset)&&Ie(n,"cur_attach_plugBackLenSE",e.updateStartOffset),Ie(n,"svgShow",e.updateShow),ue&&Ie(n,"new_edge4viewBox",e.adjustEdge),y.pathLabel.initSvg(e,n),!0},unbind:function(e,t){var n=t.props;e.elmsAppend&&(e.elmsAppend.forEach(function(e){n.svg.removeChild(e)}),e.elmPosition=e.elmPath=e.elmOffset=e.styleFill=e.styleShow=e.elmsAppend=null),Te(e.curStats,y.pathLabel.stats),Te(e.aplStats,y.pathLabel.stats),e.color||Ce(n,"cur_line_color",e.updateColor),Ce(n,"cur_line_strokeWidth",e.updatePath),Ce(n,"apl_path",e.updatePath),(2!==e.semIndex||e.lineOffset)&&Ce(n,"cur_attach_plugBackLenSE",e.updateStartOffset),Ce(n,"svgShow",e.updateShow),ue&&(Ce(n,"new_edge4viewBox",e.adjustEdge),De(n,{}))},removeOption:function(e,t){var n=t.props,a={};a[t.optionName]="",Ze(n,a)},remove:function(t){t.boundTargets.length&&(console.error("LeaderLineAttachment was not unbound by remove"),t.boundTargets.forEach(function(e){y.pathLabel.unbind(t,e)}))}}},Object.keys(y).forEach(function(e){Ye[e]=function(){return new S(y[e],Array.prototype.slice.call(arguments))}}),Ye.positionByWindowResize=!0,window.addEventListener("resize",O.add(function(){Ye.positionByWindowResize&&Object.keys(K).forEach(function(e){De(K[e],{position:!0})})}),!1),Ye}();
;/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Â© 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});
;/*! Copyright (c) 2013 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.1.3
 *
 * Requires: 1.2.2+
 */

(function (factory) {
	if ( typeof define === 'function' && define.amd ) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS style for Browserify
		module.exports = factory;
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'];
	var toBind = 'onwheel' in document || document.documentMode >= 9 ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'];
	var lowestDelta, lowestDeltaXY;

	if ( $.event.fixHooks ) {
		for ( var i = toFix.length; i; ) {
			$.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
		}
	}

	$.event.special.mousewheel = {
		setup: function() {
			if ( this.addEventListener ) {
				for ( var i = toBind.length; i; ) {
					this.addEventListener( toBind[--i], handler, false );
				}
			} else {
				this.onmousewheel = handler;
			}
		},

		teardown: function() {
			if ( this.removeEventListener ) {
				for ( var i = toBind.length; i; ) {
					this.removeEventListener( toBind[--i], handler, false );
				}
			} else {
				this.onmousewheel = null;
			}
		}
	};

	$.fn.extend({
		mousewheel: function(fn) {
			return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
		},

		unmousewheel: function(fn) {
			return this.unbind("mousewheel", fn);
		}
	});


	function handler(event) {
		var orgEvent = event || window.event,
			args = [].slice.call(arguments, 1),
			delta = 0,
			deltaX = 0,
			deltaY = 0,
			absDelta = 0,
			absDeltaXY = 0,
			fn;
		event = $.event.fix(orgEvent);
		event.type = "mousewheel";

		// Old school scrollwheel delta
		if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta; }
		if ( orgEvent.detail )     { delta = orgEvent.detail * -1; }

		// New school wheel delta (wheel event)
		if ( orgEvent.deltaY ) {
			deltaY = orgEvent.deltaY * -1;
			delta  = deltaY;
		}
		if ( orgEvent.deltaX ) {
			deltaX = orgEvent.deltaX;
			delta  = deltaX * -1;
		}

		// Webkit
		if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY; }
		if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = orgEvent.wheelDeltaX * -1; }

		// Look for lowest delta to normalize the delta values
		absDelta = Math.abs(delta);
		if ( !lowestDelta || absDelta < lowestDelta ) { lowestDelta = absDelta; }
		absDeltaXY = Math.max(Math.abs(deltaY), Math.abs(deltaX));
		if ( !lowestDeltaXY || absDeltaXY < lowestDeltaXY ) { lowestDeltaXY = absDeltaXY; }

		// Get a whole value for the deltas
		fn = delta > 0 ? 'floor' : 'ceil';
		delta  = Math[fn](delta / lowestDelta);
		deltaX = Math[fn](deltaX / lowestDeltaXY);
		deltaY = Math[fn](deltaY / lowestDeltaXY);

		// Add event and delta to the front of the arguments
		args.unshift(event, delta, deltaX, deltaY);

		return ($.event.dispatch || $.event.handle).apply(this, args);
	}

}));
;//
// SmoothScroll for websites v1.4.10 (Balazs Galambosi)
// http://www.smoothscroll.net/
//
// Licensed under the terms of the MIT license.
//
// You may use it in your theme if you credit me. 
// It is also free to use on any individual website.
//
// Exception:
// The only restriction is to not publish any  
// extension for browsers or native application
// without getting a written permission first.
//

(function () {
  
    // Scroll Variables (tweakable)
    var defaultOptions = {
    
        // Scrolling Core
        frameRate        : 150, // [Hz]
        animationTime    : 400, // [ms]
        stepSize         : 100, // [px]
    
        // Pulse (less tweakable)
        // ratio of "tail" to "acceleration"
        pulseAlgorithm   : true,
        pulseScale       : 4,
        pulseNormalize   : 1,
    
        // Acceleration
        accelerationDelta : 50,  // 50
        accelerationMax   : 3,   // 3
    
        // Keyboard Settings
        keyboardSupport   : true,  // option
        arrowScroll       : 50,    // [px]
    
        // Other
        fixedBackground   : true, 
        excluded          : ''    
    };
    
    var options = defaultOptions;
    
    
    // Other Variables
    var isExcluded = false;
    var isFrame = false;
    var direction = { x: 0, y: 0 };
    var initDone  = false;
    var root = document.documentElement;
    var activeElement;
    var observer;
    var refreshSize;
    var deltaBuffer = [];
    var deltaBufferTimer;
    var isMac = /^Mac/.test(navigator.platform);
    
    var key = { left: 37, up: 38, right: 39, down: 40, spacebar: 32, 
                pageup: 33, pagedown: 34, end: 35, home: 36 };
    var arrowKeys = { 37: 1, 38: 1, 39: 1, 40: 1 };
    
    /***********************************************
     * INITIALIZE
     ***********************************************/
    
    /**
     * Tests if smooth scrolling is allowed. Shuts down everything if not.
     */
    function initTest() {
        if (options.keyboardSupport) {
            addEvent('keydown', keydown);
        }
    }
    
    /**
     * Sets up scrolls array, determines if frames are involved.
     */
    function init() {
      
        if (initDone || !document.body) return;
    
        initDone = true;
    
        var body = document.body;
        var html = document.documentElement;
        var windowHeight = window.innerHeight; 
        var scrollHeight = body.scrollHeight;
        
        // check compat mode for root element
        root = (document.compatMode.indexOf('CSS') >= 0) ? html : body;
        activeElement = body;
        
        initTest();
    
        // Checks if this script is running in a frame
        if (top != self) {
            isFrame = true;
        }
    
        /**
         * Safari 10 fixed it, Chrome fixed it in v45:
         * This fixes a bug where the areas left and right to 
         * the content does not trigger the onmousewheel event
         * on some pages. e.g.: html, body { height: 100% }
         */
        else if (isOldSafari &&
                 scrollHeight > windowHeight &&
                (body.offsetHeight <= windowHeight || 
                 html.offsetHeight <= windowHeight)) {
    
            var fullPageElem = document.createElement('div');
            fullPageElem.style.cssText = 'position:absolute; z-index:-10000; ' +
                                         'top:0; left:0; right:0; height:' + 
                                          root.scrollHeight + 'px';
            document.body.appendChild(fullPageElem);
            
            // DOM changed (throttled) to fix height
            var pendingRefresh;
            refreshSize = function () {
                if (pendingRefresh) return; // could also be: clearTimeout(pendingRefresh);
                pendingRefresh = setTimeout(function () {
                    if (isExcluded) return; // could be running after cleanup
                    fullPageElem.style.height = '0';
                    fullPageElem.style.height = root.scrollHeight + 'px';
                    pendingRefresh = null;
                }, 500); // act rarely to stay fast
            };
      
            setTimeout(refreshSize, 10);
    
            addEvent('resize', refreshSize);
    
            // TODO: attributeFilter?
            var config = {
                attributes: true, 
                childList: true, 
                characterData: false 
                // subtree: true
            };
    
            observer = new MutationObserver(refreshSize);
            observer.observe(body, config);
    
            if (root.offsetHeight <= windowHeight) {
                var clearfix = document.createElement('div');   
                clearfix.style.clear = 'both';
                body.appendChild(clearfix);
            }
        }
    
        // disable fixed background
        if (!options.fixedBackground && !isExcluded) {
            body.style.backgroundAttachment = 'scroll';
            html.style.backgroundAttachment = 'scroll';
        }
    }
    
    /**
     * Removes event listeners and other traces left on the page.
     */
    function cleanup() {
        observer && observer.disconnect();
        removeEvent(wheelEvent, wheel);
        removeEvent('mousedown', mousedown);
        removeEvent('keydown', keydown);
        removeEvent('resize', refreshSize);
        removeEvent('load', init);
    }
    
    
    /************************************************
     * SCROLLING 
     ************************************************/
     
    var que = [];
    var pending = false;
    var lastScroll = Date.now();
    
    /**
     * Pushes scroll actions to the scrolling queue.
     */
    function scrollArray(elem, left, top) {
        
        directionCheck(left, top);
    
        if (options.accelerationMax != 1) {
            var now = Date.now();
            var elapsed = now - lastScroll;
            if (elapsed < options.accelerationDelta) {
                var factor = (1 + (50 / elapsed)) / 2;
                if (factor > 1) {
                    factor = Math.min(factor, options.accelerationMax);
                    left *= factor;
                    top  *= factor;
                }
            }
            lastScroll = Date.now();
        }          
        
        // push a scroll command
        que.push({
            x: left, 
            y: top, 
            lastX: (left < 0) ? 0.99 : -0.99,
            lastY: (top  < 0) ? 0.99 : -0.99, 
            start: Date.now()
        });
            
        // don't act if there's a pending queue
        if (pending) {
            return;
        }  
    
        var scrollRoot = getScrollRoot();
        var isWindowScroll = (elem === scrollRoot || elem === document.body);
        
        // if we haven't already fixed the behavior, 
        // and it needs fixing for this sesh
        if (elem.$scrollBehavior == null && isScrollBehaviorSmooth(elem)) {
            elem.$scrollBehavior = elem.style.scrollBehavior;
            elem.style.scrollBehavior = 'auto';
        }
    
        var step = function (time) {
            
            var now = Date.now();
            var scrollX = 0;
            var scrollY = 0; 
        
            for (var i = 0; i < que.length; i++) {
                
                var item = que[i];
                var elapsed  = now - item.start;
                var finished = (elapsed >= options.animationTime);
                
                // scroll position: [0, 1]
                var position = (finished) ? 1 : elapsed / options.animationTime;
                
                // easing [optional]
                if (options.pulseAlgorithm) {
                    position = pulse(position);
                }
                
                // only need the difference
                var x = (item.x * position - item.lastX) >> 0;
                var y = (item.y * position - item.lastY) >> 0;
                
                // add this to the total scrolling
                scrollX += x;
                scrollY += y;            
                
                // update last values
                item.lastX += x;
                item.lastY += y;
            
                // delete and step back if it's over
                if (finished) {
                    que.splice(i, 1); i--;
                }           
            }
    
            // scroll left and top
            if (isWindowScroll) {
                window.scrollBy(scrollX, scrollY);
            } 
            else {
                if (scrollX) elem.scrollLeft += scrollX;
                if (scrollY) elem.scrollTop  += scrollY;                    
            }
            
            // clean up if there's nothing left to do
            if (!left && !top) {
                que = [];
            }
            
            if (que.length) { 
                requestFrame(step, elem, (1000 / options.frameRate + 1)); 
            } else { 
                pending = false;
                // restore default behavior at the end of scrolling sesh
                if (elem.$scrollBehavior != null) {
                    elem.style.scrollBehavior = elem.$scrollBehavior;
                    elem.$scrollBehavior = null;
                }
            }
        };
        
        // start a new queue of actions
        requestFrame(step, elem, 0);
        pending = true;
    }
    
    
    /***********************************************
     * EVENTS
     ***********************************************/
    
    /**
     * Mouse wheel handler.
     * @param {Object} event
     */
    function wheel(event) {
    
        if (!initDone) {
            init();
        }
        
        var target = event.target;
    
        // leave early if default action is prevented   
        // or it's a zooming event with CTRL 
        if (event.defaultPrevented || event.ctrlKey) {
            return true;
        }
        
        // leave embedded content alone (flash & pdf)
        if (isNodeName(activeElement, 'embed') || 
           (isNodeName(target, 'embed') && /\.pdf/i.test(target.src)) ||
            isNodeName(activeElement, 'object') ||
            target.shadowRoot) {
            return true;
        }
    
        var deltaX = -event.wheelDeltaX || event.deltaX || 0;
        var deltaY = -event.wheelDeltaY || event.deltaY || 0;
        
        if (isMac) {
            if (event.wheelDeltaX && isDivisible(event.wheelDeltaX, 120)) {
                deltaX = -120 * (event.wheelDeltaX / Math.abs(event.wheelDeltaX));
            }
            if (event.wheelDeltaY && isDivisible(event.wheelDeltaY, 120)) {
                deltaY = -120 * (event.wheelDeltaY / Math.abs(event.wheelDeltaY));
            }
        }
        
        // use wheelDelta if deltaX/Y is not available
        if (!deltaX && !deltaY) {
            deltaY = -event.wheelDelta || 0;
        }
    
        // line based scrolling (Firefox mostly)
        if (event.deltaMode === 1) {
            deltaX *= 40;
            deltaY *= 40;
        }
    
        var overflowing = overflowingAncestor(target);
    
        // nothing to do if there's no element that's scrollable
        if (!overflowing) {
            // except Chrome iframes seem to eat wheel events, which we need to 
            // propagate up, if the iframe has nothing overflowing to scroll
            if (isFrame && isChrome)  {
                // change target to iframe element itself for the parent frame
                Object.defineProperty(event, "target", {value: window.frameElement});
                return parent.wheel(event);
            }
            return true;
        }
        
        // check if it's a touchpad scroll that should be ignored
        if (isTouchpad(deltaY)) {
            return true;
        }
    
        // scale by step size
        // delta is 120 most of the time
        // synaptics seems to send 1 sometimes
        if (Math.abs(deltaX) > 1.2) {
            deltaX *= options.stepSize / 120;
        }
        if (Math.abs(deltaY) > 1.2) {
            deltaY *= options.stepSize / 120;
        }
        
        scrollArray(overflowing, deltaX, deltaY);
        event.preventDefault();
        scheduleClearCache();
    }
    
    /**
     * Keydown event handler.
     * @param {Object} event
     */
    function keydown(event) {
    
        var target   = event.target;
        var modifier = event.ctrlKey || event.altKey || event.metaKey || 
                      (event.shiftKey && event.keyCode !== key.spacebar);
        
        // our own tracked active element could've been removed from the DOM
        if (!document.body.contains(activeElement)) {
            activeElement = document.activeElement;
        }
    
        // do nothing if user is editing text
        // or using a modifier key (except shift)
        // or in a dropdown
        // or inside interactive elements
        var inputNodeNames = /^(textarea|select|embed|object)$/i;
        var buttonTypes = /^(button|submit|radio|checkbox|file|color|image)$/i;
        if ( event.defaultPrevented ||
             inputNodeNames.test(target.nodeName) ||
             isNodeName(target, 'input') && !buttonTypes.test(target.type) ||
             isNodeName(activeElement, 'video') ||
             isInsideYoutubeVideo(event) ||
             target.isContentEditable || 
             modifier ) {
          return true;
        }
    
        // [spacebar] should trigger button press, leave it alone
        if ((isNodeName(target, 'button') ||
             isNodeName(target, 'input') && buttonTypes.test(target.type)) &&
            event.keyCode === key.spacebar) {
          return true;
        }
    
        // [arrwow keys] on radio buttons should be left alone
        if (isNodeName(target, 'input') && target.type == 'radio' &&
            arrowKeys[event.keyCode])  {
          return true;
        }
        
        var shift, x = 0, y = 0;
        var overflowing = overflowingAncestor(activeElement);
    
        if (!overflowing) {
            // Chrome iframes seem to eat key events, which we need to 
            // propagate up, if the iframe has nothing overflowing to scroll
            return (isFrame && isChrome) ? parent.keydown(event) : true;
        }
    
        var clientHeight = overflowing.clientHeight; 
    
        if (overflowing == document.body) {
            clientHeight = window.innerHeight;
        }
    
        switch (event.keyCode) {
            case key.up:
                y = -options.arrowScroll;
                break;
            case key.down:
                y = options.arrowScroll;
                break;         
            case key.spacebar: // (+ shift)
                shift = event.shiftKey ? 1 : -1;
                y = -shift * clientHeight * 0.9;
                break;
            case key.pageup:
                y = -clientHeight * 0.9;
                break;
            case key.pagedown:
                y = clientHeight * 0.9;
                break;
            case key.home:
                if (overflowing == document.body && document.scrollingElement)
                    overflowing = document.scrollingElement;
                y = -overflowing.scrollTop;
                break;
            case key.end:
                var scroll = overflowing.scrollHeight - overflowing.scrollTop;
                var scrollRemaining = scroll - clientHeight;
                y = (scrollRemaining > 0) ? scrollRemaining + 10 : 0;
                break;
            case key.left:
                x = -options.arrowScroll;
                break;
            case key.right:
                x = options.arrowScroll;
                break;            
            default:
                return true; // a key we don't care about
        }
    
        scrollArray(overflowing, x, y);
        event.preventDefault();
        scheduleClearCache();
    }
    
    /**
     * Mousedown event only for updating activeElement
     */
    function mousedown(event) {
        activeElement = event.target;
    }
    
    
    /***********************************************
     * OVERFLOW
     ***********************************************/
    
    var uniqueID = (function () {
        var i = 0;
        return function (el) {
            return el.uniqueID || (el.uniqueID = i++);
        };
    })();
    
    var cacheX = {}; // cleared out after a scrolling session
    var cacheY = {}; // cleared out after a scrolling session
    var clearCacheTimer;
    var smoothBehaviorForElement = {};
    
    //setInterval(function () { cache = {}; }, 10 * 1000);
    
    function scheduleClearCache() {
        clearTimeout(clearCacheTimer);
        clearCacheTimer = setInterval(function () { 
            cacheX = cacheY = smoothBehaviorForElement = {}; 
        }, 1*1000);
    }
    
    function setCache(elems, overflowing, x) {
        var cache = x ? cacheX : cacheY;
        for (var i = elems.length; i--;)
            cache[uniqueID(elems[i])] = overflowing;
        return overflowing;
    }
    
    function getCache(el, x) {
        return (x ? cacheX : cacheY)[uniqueID(el)];
    }
    
    //  (body)                (root)
    //         | hidden | visible | scroll |  auto  |
    // hidden  |   no   |    no   |   YES  |   YES  |
    // visible |   no   |   YES   |   YES  |   YES  |
    // scroll  |   no   |   YES   |   YES  |   YES  |
    // auto    |   no   |   YES   |   YES  |   YES  |
    
    function overflowingAncestor(el) {
        var elems = [];
        var body = document.body;
        var rootScrollHeight = root.scrollHeight;
        do {
            var cached = getCache(el, false);
            if (cached) {
                return setCache(elems, cached);
            }
            elems.push(el);
            if (rootScrollHeight === el.scrollHeight) {
                var topOverflowsNotHidden = overflowNotHidden(root) && overflowNotHidden(body);
                var isOverflowCSS = topOverflowsNotHidden || overflowAutoOrScroll(root);
                if (isFrame && isContentOverflowing(root) || 
                   !isFrame && isOverflowCSS) {
                    return setCache(elems, getScrollRoot()); 
                }
            } else if (isContentOverflowing(el) && overflowAutoOrScroll(el)) {
                return setCache(elems, el);
            }
        } while ((el = el.parentElement));
    }
    
    function isContentOverflowing(el) {
        return (el.clientHeight + 10 < el.scrollHeight);
    }
    
    // typically for <body> and <html>
    function overflowNotHidden(el) {
        var overflow = getComputedStyle(el, '').getPropertyValue('overflow-y');
        return (overflow !== 'hidden');
    }
    
    // for all other elements
    function overflowAutoOrScroll(el) {
        var overflow = getComputedStyle(el, '').getPropertyValue('overflow-y');
        return (overflow === 'scroll' || overflow === 'auto');
    }
    
    // for all other elements
    function isScrollBehaviorSmooth(el) {
        var id = uniqueID(el);
        if (smoothBehaviorForElement[id] == null) {
            var scrollBehavior = getComputedStyle(el, '')['scroll-behavior'];
            smoothBehaviorForElement[id] = ('smooth' == scrollBehavior);
        }
        return smoothBehaviorForElement[id];
    }
    
    
    /***********************************************
     * HELPERS
     ***********************************************/
    
    function addEvent(type, fn, arg) {
        window.addEventListener(type, fn, arg || false);
    }
    
    function removeEvent(type, fn, arg) {
        window.removeEventListener(type, fn, arg || false);  
    }
    
    function isNodeName(el, tag) {
        return el && (el.nodeName||'').toLowerCase() === tag.toLowerCase();
    }
    
    function directionCheck(x, y) {
        x = (x > 0) ? 1 : -1;
        y = (y > 0) ? 1 : -1;
        if (direction.x !== x || direction.y !== y) {
            direction.x = x;
            direction.y = y;
            que = [];
            lastScroll = 0;
        }
    }
    
    if (window.localStorage && localStorage.SS_deltaBuffer) {
        try { // #46 Safari throws in private browsing for localStorage 
            deltaBuffer = localStorage.SS_deltaBuffer.split(',');
        } catch (e) { } 
    }
    
    function isTouchpad(deltaY) {
        if (!deltaY) return;
        if (!deltaBuffer.length) {
            deltaBuffer = [deltaY, deltaY, deltaY];
        }
        deltaY = Math.abs(deltaY);
        deltaBuffer.push(deltaY);
        deltaBuffer.shift();
        clearTimeout(deltaBufferTimer);
        deltaBufferTimer = setTimeout(function () {
            try { // #46 Safari throws in private browsing for localStorage
                localStorage.SS_deltaBuffer = deltaBuffer.join(',');
            } catch (e) { }  
        }, 1000);
        var dpiScaledWheelDelta = deltaY > 120 && allDeltasDivisableBy(deltaY); // win64 
        var tp = !allDeltasDivisableBy(120) && !allDeltasDivisableBy(100) && !dpiScaledWheelDelta;
        if (deltaY < 50) return true;
        return tp;
    } 
    
    function isDivisible(n, divisor) {
        return (Math.floor(n / divisor) == n / divisor);
    }
    
    function allDeltasDivisableBy(divisor) {
        return (isDivisible(deltaBuffer[0], divisor) &&
                isDivisible(deltaBuffer[1], divisor) &&
                isDivisible(deltaBuffer[2], divisor));
    }
    
    function isInsideYoutubeVideo(event) {
        var elem = event.target;
        var isControl = false;
        if (document.URL.indexOf ('www.youtube.com/watch') != -1) {
            do {
                isControl = (elem.classList && 
                             elem.classList.contains('html5-video-controls'));
                if (isControl) break;
            } while ((elem = elem.parentNode));
        }
        return isControl;
    }
    
    var requestFrame = (function () {
          return (window.requestAnimationFrame       || 
                  window.webkitRequestAnimationFrame || 
                  window.mozRequestAnimationFrame    ||
                  function (callback, element, delay) {
                     window.setTimeout(callback, delay || (1000/60));
                 });
    })();
    
    var MutationObserver = (window.MutationObserver || 
                            window.WebKitMutationObserver ||
                            window.MozMutationObserver);  
    
    var getScrollRoot = (function() {
      var SCROLL_ROOT = document.scrollingElement;
      return function() {
        if (!SCROLL_ROOT) {
          var dummy = document.createElement('div');
          dummy.style.cssText = 'height:10000px;width:1px;';
          document.body.appendChild(dummy);
          var bodyScrollTop  = document.body.scrollTop;
          var docElScrollTop = document.documentElement.scrollTop;
          window.scrollBy(0, 3);
          if (document.body.scrollTop != bodyScrollTop)
            (SCROLL_ROOT = document.body);
          else 
            (SCROLL_ROOT = document.documentElement);
          window.scrollBy(0, -3);
          document.body.removeChild(dummy);
        }
        return SCROLL_ROOT;
      };
    })();
    
    
    /***********************************************
     * PULSE (by Michael Herf)
     ***********************************************/
     
    /**
     * Viscous fluid with a pulse for part and decay for the rest.
     * - Applies a fixed force over an interval (a damped acceleration), and
     * - Lets the exponential bleed away the velocity over a longer interval
     * - Michael Herf, http://stereopsis.com/stopping/
     */
    function pulse_(x) {
        var val, start, expx;
        // test
        x = x * options.pulseScale;
        if (x < 1) { // acceleartion
            val = x - (1 - Math.exp(-x));
        } else {     // tail
            // the previous animation ended here:
            start = Math.exp(-1);
            // simple viscous drag
            x -= 1;
            expx = 1 - Math.exp(-x);
            val = start + (expx * (1 - start));
        }
        return val * options.pulseNormalize;
    }
    
    function pulse(x) {
        if (x >= 1) return 1;
        if (x <= 0) return 0;
    
        if (options.pulseNormalize == 1) {
            options.pulseNormalize /= pulse_(1);
        }
        return pulse_(x);
    }
    
    
    /***********************************************
     * FIRST RUN
     ***********************************************/
    
    var userAgent = window.navigator.userAgent;
    var isEdge    = /Edge/.test(userAgent); // thank you MS
    var isChrome  = /chrome/i.test(userAgent) && !isEdge; 
    var isSafari  = /safari/i.test(userAgent) && !isEdge; 
    var isMobile  = /mobile/i.test(userAgent);
    var isIEWin7  = /Windows NT 6.1/i.test(userAgent) && /rv:11/i.test(userAgent);
    var isOldSafari = isSafari && (/Version\/8/i.test(userAgent) || /Version\/9/i.test(userAgent));
    var isEnabledForBrowser = (isChrome || isSafari || isIEWin7) && !isMobile;
    
    var supportsPassive = false;
    try {
      window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () {
                supportsPassive = true;
            } 
        }));
    } catch(e) {}
    
    var wheelOpt = supportsPassive ? { passive: false } : false;
    var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel'; 
    
    if (wheelEvent && isEnabledForBrowser) {
        addEvent(wheelEvent, wheel, wheelOpt);
        addEvent('mousedown', mousedown);
        addEvent('load', init);
    }
    
    
    /***********************************************
     * PUBLIC INTERFACE
     ***********************************************/
    
    function SmoothScroll(optionsToSet) {
        for (var key in optionsToSet)
            if (defaultOptions.hasOwnProperty(key)) 
                options[key] = optionsToSet[key];
    }
    SmoothScroll.destroy = cleanup;
    
    if (window.SmoothScrollOptions) // async API
        SmoothScroll(window.SmoothScrollOptions);
    
    if (typeof define === 'function' && define.amd)
        define(function() {
            return SmoothScroll;
        });
    else if ('object' == typeof exports)
        module.exports = SmoothScroll;
    else
        window.SmoothScroll = SmoothScroll;
    
    })();
;/*
 * Mapplic - Custom Interactive Map Plugin by @sekler
 * Version 3.1
 * http://www.mapplic.com
 */

(function($) {

    var Mapplic = function() {
        var self = this;

        self.o = {
            source: 'locations.json',
            selector: '[id^=landmarks] > *',
            landmark: null,
            mapfill: false,
            height: 420,
            markers: true,
            minimap: true,
            sidebar: true,
            search: true,
            deeplinking: true,
            clearbutton: true,
            zoombuttons: true,
            hovertip: true,
            smartip: true,
            fullscreen: false,
            developer: false,
            maxscale: 4,
            spmaxscale: 4,
            skin: '',
            zoom: true
        };

        self.init = function(el, params) {
            // Extend options
            self.o = $.extend(self.o, params);

            self.x = 0;
            self.y = 0;
            self.scale = 1;
            // alert("sp" + self.o.spmaxscale + " max:: " + self.o.maxscale);
            self.o.spmaxscale = self.o.maxscale

            self.el = el.addClass('mapplic-element mapplic-loading').addClass(self.o.skin).height(self.o.height).addClass('mapplic-full-width');

            // Disable modules when landmark mode is active
            if (self.o.landmark) {
                self.o.sidebar = false;
                self.o.zoombuttons = false;
                self.o.deeplinking = false;
            }

            if (typeof self.o.source === 'string') {
                // Loading .json file with AJAX
                $.getJSON(self.o.source, function(data) { // Success
                    processData(data);
                    self.el.removeClass('mapplic-loading');

                }).fail(function() { // Failure: couldn't load JSON file, or it is invalid.
                    console.error('Couldn\'t load map data. (Make sure you are running the script through a server and not just opening the html file with your browser)');
                    self.el.removeClass('mapplic-loading').addClass('mapplic-error');
                    alert('Data file missing or invalid!');
                });
            } else {
                // Inline json object
                processData(self.o.source);
                self.el.removeClass('mapplic-loading');
            }

            return self;
        }

        // Tooltip
        function Tooltip() {
            this.el = null;
            this.shift = 6;
            this.drop = 0;
            this.location = null;

            this.init = function() {
                var s = this;

                // Construct
                this.el = $('<div></div>').addClass('mapplic-tooltip');
                this.close = $('<a></a>').addClass('mapplic-tooltip-close').attr('href', '#').appendTo(this.el);
                // $('.mapplic-tooltip-close').hide();
                this.close.on('click touchend', function(e) {
                    e.preventDefault();
                    $('.mapplic-active', self.el).attr('class', 'mapplic-clickable');
                    if (self.deeplinking) self.deeplinking.clear();
                    if (!self.o.zoom) zoomTo(0.5, 0.5, 1, 600, 'easeInOutCubic');
                    s.hide();
                });
                this.image = $('<img>').addClass('mapplic-tooltip-image').hide().appendTo(this.el);
                // this.title = $('<h4></h4>').addClass('mapplic-tooltip-title').appendTo(this.el);
                // this.content = $('<div></div>').addClass('mapplic-tooltip-content').appendTo(this.el);
                // this.desc = $('<div></div>').addClass('mapplic-tooltip-description').appendTo(this.content);
                // this.link = $('<a>More</a>').addClass('mapplic-tooltip-link').attr('href', '#').hide().appendTo(this.el);
                // this.triangle = $('<div></div>').addClass('mapplic-tooltip-triangle').prependTo(this.el);

                // var source = 'assets/images/' + value.id + ".png";
                // $('<img>').attr('src', source).addClass('mapplic-map-image').appendTo(this.el);

                // Append
                self.map.append(this.el);
            }

            this.set = function(location) {
                if (location) {
                    var s = this;
                    this.image.attr('src', '');
                    if (location.image) this.image.attr('src', location.image).show();
                    else this.image.hide();

                    // if (location.link) this.link.attr('href', location.link).show();
                    // else this.link.hide();

                    // this.title.text(location.title);
                    // this.desc.html(location.description);
                    // this.content[0].scrollTop = 0;

                    this.position(location);
                }
            }

            this.show = function(location) {
                if (location) {
                    if (location.action == 'none') {
                        this.el.stop().fadeOut(300);
                        return;
                    }

                    var s = this;

                    this.location = location;
                    self.hovertip.hide();
                    $('.mapplic-tooltip').addClass(location.id);
                    switch (location.id) {
                        case "Face_Lifting_start":
                            this.image.css({
                                bottom: '-30%',
                                left: '-190%',
                                maxWidth: '250%'
                            });
                            break;

                        case "Face_Lifting_Female_start":
                            this.image.css({
                                bottom: '120%',
                                left: '-20%',
                                maxWidth: '70%'
                            });
                            break;

                        case "Male_Breast_Removal_start":
                            this.image.css({
                                bottom: '70%',
                                left: '-135%',
                                maxWidth: '200%'
                            });
                            break;

                        case "Dimple_Creation_start":
                            this.image.css({
                                bottom: '40%',
                                left: '-145%',
                                maxWidth: '200%'
                            });
                            break;

                        case "Dimple_Creation_Female_start":
                            this.image.css({
                                bottom: '100%',
                                left: '0%',
                                maxWidth: '80%'
                            });
                            break;

                        case "Liposuction_start":
                            this.image.css({
                                bottom: '30%',
                                left: '-180%',
                                maxWidth: '300%'
                            });
                            break;

                        case "Chin_Augmentation_start":
                            this.image.css({
                                bottom: '140%',
                                left: '10%',
                                maxWidth: '130%'
                            });
                            break;

                        case "Chin_Augmentation_Female_start":
                            this.image.css({
                                bottom: '140%',
                                left: '-5%',
                                maxWidth: '100%'
                            });
                            break;

                        case "Buccal_Fat_Pad_Removal_start":
                            this.image.css({
                                bottom: '-100%',
                                left: '0%',
                                maxWidth: '250%'
                            });
                            break;

                        case "Buccal_Fat_Pad_Removal_Female_start":
                            this.image.css({
                                bottom: '-300%',
                                left: '5%',
                                maxWidth: '220%'
                            });
                            break;

                        case "Eyebrow_Lift_start":
                            this.image.css({
                                bottom: '100%',
                                left: '-10%',
                                maxWidth: '200%'
                            });
                            break;

                        case "Eyebrow_Lift_Female_start":
                            this.image.css({
                                bottom: '100%',
                                left: '0%',
                                maxWidth: '100%'
                            });
                            break;

                        case "Buttlock_Augmentation_start":
                            this.image.css({
                                bottom: '0%',
                                left: '-35%',
                                maxWidth: '150%'
                            });
                            break;

                        case "Buttlock_Augmentation_Female_start":
                            this.image.css({
                                bottom: '0%',
                                left: '-115%',
                                maxWidth: '200%'
                            });
                            break;

                        case "Ear_Reconstruction_start":
                            this.image.css({
                                bottom: '80%',
                                left: '30%',
                                maxWidth: '35%'
                            });
                            break;

                        case "Ear_Reconstruction_Female_start":
                            this.image.css({
                                bottom: '170%',
                                left: '25%',
                                maxWidth: '50%'
                            });
                            break;

                        case "Facial_Scar_start":
                            this.image.css({
                                bottom: '130%',
                                left: '5%',
                                maxWidth: '50%'
                            });
                            break;

                        case "Facial_Scar_Female_start":
                            this.image.css({
                                bottom: '140%',
                                left: '25%',
                                maxWidth: '80%'
                            });
                            break;

                        case "Thread_Lift_start":
                            this.image.css({
                                bottom: '160%',
                                left: '5%',
                                maxWidth: '50%'
                            });
                            break;

                        case "Thread_Lift_Female_start":
                            this.image.css({
                                bottom: '100%',
                                left: '15%',
                                maxWidth: '60%'
                            });
                            break;

                        case "Double_Chin_Treatment_start":
                            this.image.css({
                                bottom: '150%',
                                left: '0%',
                                maxWidth: '50%'
                            });
                            break;

                        case "Double_Chin_Treatment_Female_start":
                            this.image.css({
                                bottom: '100%',
                                left: '30%',
                                maxWidth: '100%'
                            });
                            break;

                        case "Arm_Lift_start":
                            this.image.css({
                                bottom: '-150%',
                                left: '-15%',
                                maxWidth: '100%'
                            });
                            break;

                        case "Arm_Lift_Female_start":
                            this.image.css({
                                bottom: '-50%',
                                left: '-60%',
                                maxWidth: '100%'
                            });
                            break;

                        case "Thigh_Lift_start":
                            this.image.css({
                                bottom: '-150%',
                                left: '-15%',
                                maxWidth: '100%'
                            });
                            break;

                        case "Thigh_Lift_Female_start":
                            this.image.css({
                                bottom: '0%',
                                left: '-15%',
                                maxWidth: '200%'
                            });
                            break;

                            // case "Hair_Replacement_start":
                            // 	this.image.css({
                            // 		bottom: '130%',
                            // 		left: '25%',
                            // 		maxWidth: '150%'
                            // 	});
                            // 	break;

                        case "Lip_Augmentation_start":
                            this.image.css({
                                bottom: '180%',
                                left: '-20%',
                                maxWidth: '110%'
                            });
                            break;

                        case "Hair_Replacement_Female_start":
                            this.image.css({
                                bottom: '130%',
                                left: '25%',
                                maxWidth: '150%'
                            });
                            break;

                        case "Lip_Augmentation_Female_start":
                            this.image.css({
                                bottom: '138%',
                                left: '-8%',
                                maxWidth: '100%'
                            });
                            break;

                        case "Neck_Lift_Female_start":
                            this.image.css({
                                bottom: '200%',
                                left: '-20%',
                                maxWidth: '150%'
                            });
                            break;

                        case "Breast_Reduction_Female_start":
                            this.image.css({
                                bottom: '0%',
                                left: '-30%',
                                maxWidth: '200%'
                            });
                            break;

                        case "Breast_Augmentation_Female_start":
                            this.image.css({
                                bottom: '80%',
                                left: '160%',
                                maxWidth: '170%'
                            });
                            break;

                        case "Tummy_Tuck_Female_start":
                            this.image.css({
                                bottom: '-170%',
                                left: '10%',
                                maxWidth: '200%'
                            });
                            break;

                        case "Liposuction_Female_start":
                            this.image.css({
                                bottom: '-300%',
                                left: '-20%',
                                maxWidth: '135%'
                            });
                            break;

                        default:
                            this.image.css({
                                bottom: '-48%',
                                left: '-67%%',
                                maxWidth: '200%'
                            });
                            break;
                    }

                    this.image.attr('src', '');
                    if (location.image) this.image.attr('src', location.image).show();
                    else this.image.hide();
                    // if (location.link) this.link.attr('href', location.link).show();
                    // else this.link.hide();

                    // this.title.text(location.title);
                    // this.desc.html(location.description);

                    // Shift
                    var pinselect = $('.mapplic-pin[data-location="' + location.id + '"]');
                    if (pinselect.length == 0) {
                        this.shift = 20;
                    } else this.shift = pinselect.height() + 10;

                    // Loading & positioning
                    $('img', this.el).on("load", function() {
                        s.position();
                    });
                    this.position();

                    // Making it visible
                    this.el.stop().show();
                }
            }

            this.position = function() {
                if (this.location) {
                    var cx = self.map.offset().left + self.map.width() * this.location.x - self.container.offset().left,
                        cy = self.map.offset().top + self.map.height() * this.location.y - self.container.offset().top;

                    var x = this.location.x * 100,
                        y = this.location.y * 100,
                        mt = -this.el.outerHeight() - this.shift,
                        ml = -this.el.outerWidth() / 2;


                    if (self.o.smartip) {
                        var verticalPos = 0.5;

                        // Top check
                        if (Math.abs(mt) > cy) {
                            mt = 8 + 2;
                            this.el.addClass('mapplic-bottom');
                        } else this.el.removeClass('mapplic-bottom');

                        // Left-right check
                        if (this.el.outerWidth() / 2 > cx)
                            verticalPos = 0.5 - (this.el.outerWidth() / 2 - cx) / this.el.outerWidth();
                        else if ((self.container.width() - cx - this.el.outerWidth() / 2) < 0)
                            verticalPos = 0.5 + (cx + this.el.outerWidth() / 2 - self.container.width()) / this.el.outerWidth();

                        verticalPos = Math.max(0, Math.min(1, verticalPos));
                        ml = -this.el.outerWidth() * verticalPos;
                        // this.triangle.css('left', Math.max(5, Math.min(95, verticalPos * 100)) + '%');
                    }

                    this.el.css({
                        left: x + '%',
                        top: y + '%',
                        marginTop: mt,
                        marginLeft: ml
                    });
                    this.drop = /*this.el.outerHeight()*/ 240 + this.shift;
                }
            }

            this.hide = function() {
                var s = this;
                if (this.location) {
                    $('.mapplic-tooltip').removeClass(this.location.id);
                }
                this.location = null;

                this.el.stop().fadeOut(300, function() {
                    // s.desc.empty();
                });
            }
        }

        // HoverTooltip
        function HoverTooltip() {
            this.el = null;
            this.shift = 6;

            this.init = function() {
                var s = this;

                // Construct
                this.el = $('<div></div>').addClass('mapplic-tooltip mapplic-hovertip');
                // this.title = $('<h4></h4>').addClass('mapplic-tooltip-title').appendTo(this.el);
                // this.triangle = $('<div></div>').addClass('mapplic-tooltip-triangle').appendTo(this.el);
                this.image = $('<img>').addClass('mapplic-tooltip-image').hide().appendTo(this.el);
                // Events 
                // pins + old svg
                $(self.map).on('mouseover', '.mapplic-layer a', function() {
                    var id = '';
                    if ($(this).hasClass('mapplic-pin')) {
                        id = $(this).data('location');
                        s.shift = $(this).height() + 10;
                    } else {
                        id = $(this).attr('xlink:href').slice(1);
                        s.shift = 20;
                    }

                    var location = getLocationData(id);
                    if (location) s.show(location);
                }).on('mouseout', function() {
                    s.hide();
                });

                // new svg
                if (self.o.selector) {
                    $(self.map).on('mouseover', self.o.selector, function() {
                        var location = getLocationData($(this).attr('id'));
                        s.shift = 20;
                        if (location) s.show(location);
                    }).on('mouseout', function() {
                        s.hide();
                    });
                }

                self.map.append(this.el);
            }

            this.show = function(location) {
                if (self.tooltip.location != location) {
                    // this.title.text(location.title);

                    this.position(location);

                    this.el.stop().fadeIn(100);
                }
            }

            this.position = function(location) {
                var cx = self.map.offset().left + self.map.width() * location.x - self.container.offset().left,
                    cy = self.map.offset().top + self.map.height() * location.y - self.container.offset().top;

                var x = location.x * 100,
                    y = location.y * 100,
                    mt = -this.el.outerHeight() - this.shift,
                    ml = 0;

                var verticalPos = 0.5;

                // Top check

                if (Math.abs(mt) > cy) {
                    mt = 8 + 2;
                    this.el.addClass('mapplic-bottom');
                } else this.el.removeClass('mapplic-bottom');

                // Left-right check
                if (this.el.outerWidth() / 2 > cx)
                    verticalPos = 0.5 - (this.el.outerWidth() / 2 - cx) / this.el.outerWidth();
                else if ((self.container.width() - cx - this.el.outerWidth() / 2) < 0)
                    verticalPos = 0.5 + (cx + this.el.outerWidth() / 2 - self.container.width()) / this.el.outerWidth();

                ml = -this.el.outerWidth() * verticalPos;
                // this.triangle.css('left', Math.max(10, Math.min(90, verticalPos * 100)) + '%');
                this.el.css({
                    left: x + '%',
                    top: y + '%',
                    marginTop: mt,
                    marginLeft: ml
                });
            }

            this.hide = function() {
                this.el.stop().fadeOut(200);
            }
        }

        // Deeplinking
        function Deeplinking() {
            this.param = 'location';

            this.init = function() {
                var s = this;
                this.check(0);

                window.onpopstate = function(e) {
                    if (e.state) {
                        s.check(600);
                    }
                    return false;
                }
            }

            this.check = function(ease) {
                var id = this.getUrlParam(this.param);
                showLocation(id, ease, true);
            }

            this.getUrlParam = function(name) {
                name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                    results = regex.exec(location.search);
                return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
            }

            this.update = function(id) {
                var url = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + this.param + '=' + id;
                window.history.pushState({ path: url }, '', url);
            }

            // Clear
            this.clear = function() {
                history.pushState('', document.title, window.location.pathname);
            }
        }

        // Old hash deeplinking method for old browsers
        function DeeplinkingHash() {
            this.param = 'location';

            this.init = function() {
                var s = this;
                this.check(0);

                $(window).on('hashchange', function() {
                    s.check(600);
                });
            }

            this.check = function(ease) {
                var id = location.hash.slice(this.param.length + 2);
                showLocation(id, ease, true);
            }

            this.update = function(id) {
                window.location.hash = this.param + '-' + id;
            }

            this.clear = function() {
                window.location.hash = this.param;
            }
        }

        // Minimap
        function Minimap() {
            this.el = null;
            this.opacity = null;

            this.init = function() {
                this.el = $('<div></div>').addClass('mapplic-minimap').appendTo(self.container);
                this.el.css('height', this.el.width() * self.hw_ratio);
                this.el.click(function(e) {
                    e.preventDefault();

                    var x = (e.pageX - $(this).offset().left) / $(this).width(),
                        y = (e.pageY - $(this).offset().top) / $(this).height();

                    zoomTo(x, y, self.scale / self.fitscale, 100);
                });
            }

            this.addLayer = function(data) {
                var layer = $('<div></div>').addClass('mapplic-minimap-layer').addClass(data.id).appendTo(this.el);
                $('<img>').attr('src', data.minimap).addClass('mapplic-minimap-background').appendTo(layer);
                $('<div></div>').addClass('mapplic-minimap-overlay').appendTo(layer);
                $('<img>').attr('src', data.minimap).addClass('mapplic-minimap-active').appendTo(layer);
            }

            this.show = function(target) {
                $('.mapplic-minimap-layer', this.el).hide();
                $('.mapplic-minimap-layer.' + target, this.el).show();
            }

            this.update = function(x, y) {
                var active = $('.mapplic-minimap-active', this.el);

                if (x === undefined) x = self.x;
                if (y === undefined) y = self.y;

                var width = Math.round(self.container.width() / self.contentWidth / self.scale * this.el.width()),
                    height = Math.round(self.container.height() / self.contentHeight / self.scale * this.el.height()),
                    top = Math.round(-y / self.contentHeight / self.scale * this.el.height()),
                    left = Math.round(-x / self.contentWidth / self.scale * this.el.width()),
                    right = left + width,
                    bottom = top + height;

                active.each(function() {
                    $(this)[0].style.clip = 'rect(' + top + 'px, ' + right + 'px, ' + bottom + 'px, ' + left + 'px)';
                });


                var s = this;
                this.el.show();
                this.el.css('opacity', 1.0);
                clearTimeout(this.opacity);
                this.opacity = setTimeout(function() {
                    s.el.css('opacity', 0);
                    setTimeout(function() { s.el.hide(); }, 600);
                }, 2000);
            }
        }

        // Sidebar
        function Sidebar() {
            this.el = null;
            this.list = null;

            this.init = function() {
                var s = this;

                this.el = $('<div></div>').addClass('mapplic-sidebar').appendTo(self.el);

                if (self.o.search) {
                    var form = $('<form></form>').addClass('mapplic-search-form').submit(function() {
                        return false;
                    }).appendTo(this.el);
                    self.clear = $('<button></button>').addClass('mapplic-search-clear').click(function() {
                        input.val('');
                        input.keyup();
                    }).appendTo(form);
                    var input = $('<input>').attr({ 'type': 'text', 'spellcheck': 'false', 'placeholder': 'Search...' }).addClass('mapplic-search-input').keyup(function() {
                        var keyword = $(this).val();
                        s.search(keyword);
                    }).prependTo(form);
                }

                var listContainer = $('<div></div>').addClass('mapplic-list-container').appendTo(this.el);
                this.list = $('<ol></ol>').addClass('mapplic-list').appendTo(listContainer);
                this.notfound = $('<p></p>').addClass('mapplic-not-found').text('Nothing found. Please try a different search.').appendTo(listContainer);

                if (!self.o.search) listContainer.css('padding-top', '0');
            }

            this.addCategories = function(categories) {
                var list = this.list;

                if (categories) {
                    $.each(categories, function(index, category) {
                        var item = $('<li></li>').addClass('mapplic-list-category').attr('data-category', category.id);
                        var ol = $('<ol></ol>').css('border-color', category.color).appendTo(item);
                        if (category.show == 'false') ol.hide();
                        else item.addClass('mapplic-opened');
                        var link = $('<a></a>').attr('href', '#').attr('title', category.title).css('background-color', category.color).text(category.title).prependTo(item);
                        link.on('click', function(e) {
                            e.preventDefault();
                            item.toggleClass('mapplic-opened');
                            ol.slideToggle(200);
                        });
                        if (category.icon) $('<img>').attr('src', category.icon).addClass('mapplic-list-thumbnail').prependTo(link);
                        $('<span></span>').text('0').addClass('mapplic-list-count').prependTo(link);
                        list.append(item);
                    });
                }
            }

            this.addLocation = function(data) {
                var item = $('<li></li>').addClass('mapplic-list-location').addClass('mapplic-list-shown');
                var link = $('<a></a>').attr('href', '#').click(function(e) {
                    e.preventDefault();
                    showLocation(data.id, 600);

                    // Scroll back to map on mobile
                    if ($(window).width() < 668) {
                        $('html, body').animate({
                            scrollTop: self.container.offset().top
                        }, 400);
                    }
                }).appendTo(item);

                if (data.thumbnail) $('<img>').attr('src', data.thumbnail).addClass('mapplic-list-thumbnail').appendTo(link);
                $('<h4></h4>').text(data.title).appendTo(link)
                $('<span></span>').html(data.about).appendTo(link);
                var category = $('.mapplic-list-category[data-category="' + data.category + '"]');

                if (category.length) $('ol', category).append(item);
                else this.list.append(item);

                // Count
                $('.mapplic-list-count', category).text($('.mapplic-list-shown', category).length);
            }

            this.search = function(keyword) {
                if (keyword) self.clear.fadeIn(100);
                else self.clear.fadeOut(100);

                $('.mapplic-list li', self.el).each(function() {
                    if ($(this).text().search(new RegExp(keyword, "i")) < 0) {
                        $(this).removeClass('mapplic-list-shown');
                        $(this).slideUp(200);
                    } else {
                        $(this).addClass('mapplic-list-shown');
                        $(this).show();
                    }
                });

                $('.mapplic-list > li', self.el).each(function() {
                    var count = $('.mapplic-list-shown', this).length;
                    $('.mapplic-list-count', this).text(count);
                });

                // Show not-found text
                if ($('.mapplic-list > li.mapplic-list-shown').length > 0) this.notfound.fadeOut(200);
                else this.notfound.fadeIn(200);
            }
        }

        // Developer tools
        function DevTools() {
            this.el = null;

            this.init = function() {
                this.el = $('<div></div>').addClass('mapplic-coordinates').appendTo(self.container);
                this.el.append('x: ');
                $('<code></code>').addClass('mapplic-coordinates-x').appendTo(this.el);
                this.el.append(' y: ');
                $('<code></code>').addClass('mapplic-coordinates-y').appendTo(this.el);

                $('.mapplic-layer', self.map).on('mousemove', function(e) {
                    var x = (e.pageX - self.map.offset().left) / self.map.width(),
                        y = (e.pageY - self.map.offset().top) / self.map.height();
                    $('.mapplic-coordinates-x').text(parseFloat(x).toFixed(4));
                    $('.mapplic-coordinates-y').text(parseFloat(y).toFixed(4));
                });
            }
        }

        // Clear Button
        function ClearButton() {
            this.el = null;

            this.init = function() {
                this.el = $('<a></a>').attr('href', '#').addClass('mapplic-clear-button').appendTo(self.container);

                this.el.on('click touchstart', function(e) {
                    e.preventDefault();
                    if (self.deeplinking) self.deeplinking.clear();
                    $('.mapplic-active', self.el).attr('class', 'mapplic-clickable');
                    self.tooltip.hide();
                    zoomTo(0.5, 0.5, 1, 400, 'easeInOutCubic');
                });
            }
        }

        // Zoom Buttons
        function ZoomButtons() {
            this.el = null;

            this.init = function() {
                this.el = $('<div></div>').addClass('mapplic-zoom-buttons').appendTo(self.container);

                this.zoomin = $('<a></ha>').attr('href', '#').addClass('mapplic-zoomin-button').appendTo(this.el);

                this.zoomin.on('click touchstart', function(e) {
                    e.preventDefault();

                    var scale = self.scale;
                    self.scale = normalizeScale(scale + scale * 0.8);

                    self.x = normalizeX(self.x - (self.container.width() / 2 - self.x) * (self.scale / scale - 1));
                    self.y = normalizeY(self.y - (self.container.height() / 2 - self.y) * (self.scale / scale - 1));

                    moveTo(self.x, self.y, self.scale, 400, 'easeInOutCubic');
                });

                this.zoomout = $('<a></ha>').attr('href', '#').addClass('mapplic-zoomout-button').appendTo(this.el);

                this.zoomout.on('click touchstart', function(e) {
                    e.preventDefault();

                    var scale = self.scale;
                    self.scale = normalizeScale(scale - scale * 0.4);

                    self.x = normalizeX(self.x - (self.container.width() / 2 - self.x) * (self.scale / scale - 1));
                    self.y = normalizeY(self.y - (self.container.height() / 2 - self.y) * (self.scale / scale - 1));

                    moveTo(self.x, self.y, self.scale, 400, 'easeInOutCubic');
                });
            }

            this.update = function(scale) {
                this.zoomin.removeClass('mapplic-disabled');
                this.zoomout.removeClass('mapplic-disabled');
                if (scale == self.fitscale) this.zoomout.addClass('mapplic-disabled');
                else if (scale == self.o.maxscale) this.zoomin.addClass('mapplic-disabled');
            }
        }

        // Full Screen
        function FullScreen() {
            this.el = null;

            this.init = function() {
                var s = this;
                this.element = self.el[0];

                $('<a></a>').attr('href', '#').attr('href', '#').addClass('mapplic-fullscreen-button').click(function(e) {
                    e.preventDefault();

                    if (s.isFull()) s.exitFull();
                    else s.goFull();

                }).appendTo(self.container);
            }

            this.goFull = function() {
                if (this.element.requestFullscreen) this.element.requestFullscreen();
                else if (this.element.mozRequestFullScreen) this.element.mozRequestFullScreen();
                else if (this.element.webkitRequestFullscreen) this.element.webkitRequestFullscreen();
                else if (this.element.msRequestFullscreen) this.element.msRequestFullscreen();
            }

            this.exitFull = function() {
                if (document.exitFullscreen) document.exitFullscreen();
                else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
                else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
            }

            this.isFull = function() {
                if (window.innerHeight == screen.height) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        // Functions
        var processData = function(data) {
            self.data = data;
            var nrlevels = 0;
            var shownLevel;

            self.container = $('<div></div>').addClass('mapplic-container').appendTo(self.el);
            self.map = $('<div></div>').addClass('mapplic-map').appendTo(self.container);
            if (self.o.zoom) self.map.addClass('mapplic-zoomable');

            self.levelselect = $('<select></select>').addClass('mapplic-levels-select');

            if (!self.o.sidebar) self.container.css('width', '100%');

            self.contentWidth = parseInt(data.mapwidth);
            self.contentHeight = parseInt(data.mapheight);

            self.hw_ratio = data.mapheight / data.mapwidth;

            self.map.css({
                'width': data.mapwidth,
                'height': data.mapheight
            });

            // Create minimap
            if (self.o.minimap) {
                self.minimap = new Minimap();
                self.minimap.init();
            }

            // Create sidebar
            if (self.o.sidebar) {
                self.sidebar = new Sidebar();
                self.sidebar.init();
                self.sidebar.addCategories(data.categories);
            }

            // Iterate through levels
            if (data.levels) {
                $.each(data.levels, function(index, value) {
                    var source = value.map;
                    var extension = source.substr((source.lastIndexOf('.') + 1)).toLowerCase();

                    // Create new map layer
                    var layer = $('<div></div>').addClass('mapplic-layer').addClass(value.id).hide().appendTo(self.map);
                    // $('#' + value.id).children('.mapplic-tooltip-close').addClass(value.id);
                    switch (extension) {

                        // Image formats
                        case 'jpg':
                        case 'jpeg':
                        case 'png':
                        case 'gif':
                            $('<img>').attr('src', source).addClass('mapplic-map-image').addClass('img-fluid').appendTo(layer);
                            break;

                            // Vector format
                        case 'svg':
                            $('<div></div>').addClass('mapplic-map-image').load(source, function() {
                                // setting up the location on the map
                                $(self.o.selector, this).each(function() {
                                    var location = getLocationData($(this).attr('id'));
                                    if (location) {
                                        $(this).attr('class', 'mapplic-clickable');
                                        location.onmap = $(this);

                                        if (location.fill) {
                                            $(this).css('fill', location.fill);
                                            $('path', this).css('fill', location.fill);
                                        }

                                        // Landmark mode
                                        if (self.o.landmark === location.id) $(this).attr('class', 'mapplic-active');
                                    }
                                });

                                // click event
                                $(self.o.selector).on('click touchend', function() {
                                    if (!self.dragging) {
                                        var id = $(this).attr('id');
                                        showLocation(id, 600);
                                    }
                                });

                                // Support for the old map format
                                $('svg a', this).each(function() {
                                    var location = getLocationData($(this).attr('xlink:href').substr(1));
                                    if (location) {
                                        $(this).attr('class', 'mapplic-clickable');
                                        location.onmap = $(this);
                                    }
                                });

                                $('svg a', this).click(function(e) {
                                    var id = $(this).attr('xlink:href').substr(1);
                                    showLocation(id, 600);
                                    e.preventDefault();
                                });
                            }).appendTo(layer);
                            break;

                            // Other 
                        default:
                            alert('File type ' + extension + ' is not supported!');
                    }

                    // Create new minimap layer
                    if (self.minimap) self.minimap.addLayer(value);

                    // Build layer control
                    self.levelselect.prepend($('<option></option>').attr('value', value.id).text(value.title));

                    if (!shownLevel || value.show) {
                        shownLevel = value.id;
                    }

                    // Iterate through locations
                    $.each(value.locations, function(index, value) {
                        var top = value.y * 100;
                        var left = value.x * 100;

                        if (value.pin != 'hidden') {
                            if (self.o.markers) {
                                var target = '#';

                                var pin = $('<a></a>').attr('href', target).addClass('mapplic-pin').css({ 'top': top + '%', 'left': left + '%' }).appendTo(layer);
                                pin.on('click touchend', function(e) {
                                    e.preventDefault();
                                    showLocation(value.id, 600);
                                });
                                if (value.fill) pin.css('background-color', value.fill);
                                pin.attr('id', value.id);
                                pin.attr('data-location', value.id);
                                pin.addClass(value.pin);
                            }
                        }

                        if (self.sidebar) self.sidebar.addLocation(value);
                    });

                    nrlevels++;
                });
            }

            // COMPONENTS

            // Tooltip
            self.tooltip = new Tooltip();
            self.tooltip.init();

            // Hover Tooltip
            if (self.o.hovertip) {
                self.hovertip = new HoverTooltip();
                self.hovertip.init();
            }

            // Developer tools
            if (self.o.developer) self.devtools = new DevTools().init();

            // Clear button
            if (self.o.clearbutton) self.clearbutton = new ClearButton().init();

            // Zoom buttons
            if (self.o.zoombuttons) {
                self.zoombuttons = new ZoomButtons();
                self.zoombuttons.init();
                if (!self.o.clearbutton) self.zoombuttons.el.css('bottom', '0');
            }

            // Fullscreen
            if (self.o.fullscreen) self.fullscreen = new FullScreen().init();

            // Levels
            if (nrlevels > 1) {
                self.levels = $('<div></div>').addClass('mapplic-levels');
                var up = $('<a href="#"></a>').addClass('mapplic-levels-up').appendTo(self.levels);
                self.levelselect.appendTo(self.levels);
                var down = $('<a href="#"></a>').addClass('mapplic-levels-down').appendTo(self.levels);
                self.container.append(self.levels);

                self.levelselect.change(function() {
                    var value = $(this).val();
                    switchLevel(value);
                });

                up.click(function(e) {
                    e.preventDefault();
                    if (!$(this).hasClass('mapplic-disabled')) switchLevel('+');
                });

                down.click(function(e) {
                    e.preventDefault();
                    if (!$(this).hasClass('mapplic-disabled')) switchLevel('-');
                });
            }
            switchLevel(shownLevel);

            // Browser resize
            $(window).resize(function() {
                // Mobile
                if ($(window).width() < 668) {
                    self.container.height($(window).height() - 66);
                } else self.container.height('100%');

                var wr = self.container.width() / self.contentWidth,
                    hr = self.container.height() / self.contentHeight;

                if (self.o.mapfill) {
                    if (wr > hr) self.fitscale = wr;
                    else self.fitscale = hr;
                } else {
                    if (wr < hr) self.fitscale = wr;
                    else self.fitscale = hr;
                }

                self.scale = normalizeScale(self.scale);
                self.x = normalizeX(self.x);
                self.y = normalizeY(self.y);

                moveTo(self.x, self.y, self.scale, 100);

            }).resize();

            // Landmark mode
            if (self.o.landmark) {
                showLocation(self.o.landmark, 0);
            } else {
                zoomTo(0.5, 0.5, 1, 0);
            }

            // Deeplinking
            if (self.o.deeplinking) {
                if (history.pushState) self.deeplinking = new Deeplinking();
                else self.deeplinking = new DeeplinkingHash();

                self.deeplinking.init();
            }

            // Controls
            if (self.o.zoom) addControls();
        }

        var addControls = function() {
            var map = self.map,
                mapbody = $('.mapplic-map-image', self.map);

            document.ondragstart = function() { return false; } // IE drag fix

            // Drag & drop
            mapbody.on('mousedown', function(event) {
                self.dragging = false;
                map.stop();

                map.data('mouseX', event.pageX);
                map.data('mouseY', event.pageY);
                map.data('lastX', self.x);
                map.data('lastY', self.y);

                map.addClass('mapplic-dragging');

                self.map.on('mousemove', function(event) {
                    self.dragging = true;

                    var x = event.pageX - map.data('mouseX') + self.x;
                    y = event.pageY - map.data('mouseY') + self.y;

                    x = normalizeX(x);
                    y = normalizeY(y);

                    moveTo(x, y);
                    map.data('lastX', x);
                    map.data('lastY', y);
                });

                $(document).on('mouseup', function(event) {
                    self.x = map.data('lastX');
                    self.y = map.data('lastY');

                    self.map.off('mousemove');
                    $(document).off('mouseup');

                    map.removeClass('mapplic-dragging');
                });
            });

            // Double click
            $(document).on('dblclick', '.mapplic-map-image', function(event) {
                event.preventDefault();

                var scale = self.scale;
                self.scale = normalizeScale(scale * 2);

                self.x = normalizeX(self.x - (event.pageX - self.container.offset().left - self.x) * (self.scale / scale - 1));
                self.y = normalizeY(self.y - (event.pageY - self.container.offset().top - self.y) * (self.scale / scale - 1));

                moveTo(self.x, self.y, self.scale, 400, 'easeInOutCubic');
            });

            // Mousewheel
            $('.mapplic-layer', self.el).bind('mousewheel DOMMouseScroll', function(event, delta) {
                event.preventDefault();

                var scale = self.scale;
                self.scale = normalizeScale(scale + scale * delta / 5);

                self.x = normalizeX(self.x - (event.pageX - self.container.offset().left - self.x) * (self.scale / scale - 1));
                self.y = normalizeY(self.y - (event.pageY - self.container.offset().top - self.y) * (self.scale / scale - 1));

                moveTo(self.x, self.y, self.scale, 200, 'easeOutCubic');
            });

            // Touch support
            if (!('ontouchstart' in window || 'onmsgesturechange' in window)) return true;
            mapbody.on('touchstart', function(e) {
                self.dragging = false;

                var orig = e.originalEvent,
                    pos = map.position();

                map.data('touchY', orig.changedTouches[0].pageY - pos.top);
                map.data('touchX', orig.changedTouches[0].pageX - pos.left);

                mapbody.on('touchmove', function(e) {
                    e.preventDefault();
                    self.dragging = true;

                    var orig = e.originalEvent;
                    var touches = orig.touches.length;

                    if (touches == 1) {
                        self.x = normalizeX(orig.changedTouches[0].pageX - map.data('touchX'));
                        self.y = normalizeY(orig.changedTouches[0].pageY - map.data('touchY'));

                        moveTo(self.x, self.y, self.scale, 50);
                    } else {
                        mapbody.off('touchmove');
                    }
                });

                mapbody.on('touchend', function(e) {
                    mapbody.off('touchmove touchend');
                });
            });

            // Pinch zoom
            var hammer = new Hammer(self.map[0], {
                transform_always_block: true,
                drag_block_horizontal: true,
                drag_block_vertical: true
            });

            /* hammer fix */
            self.map.on('touchstart', function(e) {
                if (e.originalEvent.touches.length > 1) hammer.get('pinch').set({ enable: true });
            });

            self.map.on('touchend', function(e) {
                hammer.get('pinch').set({ enable: false });
            });
            /* hammer fix ends */

            var scale = 1,
                last_scale;
            hammer.on('pinchstart', function(e) {
                self.dragging = false;

                scale = self.scale / self.fitscale;
                last_scale = scale;
            });

            hammer.on('pinch', function(e) {
                self.dragging = true;

                if (e.scale != 1) scale = Math.max(1, Math.min(last_scale * e.scale, 100));

                var oldscale = self.scale;
                self.scale = normalizeScale(scale * self.fitscale);

                self.x = normalizeX(self.x - (e.center.x - self.container.offset().left - self.x) * (self.scale / oldscale - 1));
                self.y = normalizeY(self.y - (e.center.y - self.y) * (self.scale / oldscale - 1)); // - self.container.offset().top

                moveTo(self.x, self.y, self.scale, 100);
            });
        }

        var switchLevel = function(target, tooltip) {
            switch (target) {
                case '+':
                    target = $('option:selected', self.levelselect).removeAttr('selected').prev().prop('selected', 'selected').val();
                    break;
                case '-':
                    target = $('option:selected', self.levelselect).removeAttr('selected').next().prop('selected', 'selected').val();
                    break;
                default:
                    $('option[value="' + target + '"]', self.levelselect).prop('selected', 'selected');
            }

            var layer = $('.mapplic-layer.' + target, self.map);

            // Target layer is active
            if (layer.is(':visible')) return;

            // Hide Tooltip
            if (!tooltip) self.tooltip.hide();

            // Show target layer
            $('.mapplic-layer:visible', self.map).hide();
            layer.show();

            // Show target minimap layer
            if (self.minimap) self.minimap.show(target);

            // Update control
            var index = self.levelselect.get(0).selectedIndex,
                up = $('.mapplic-levels-up', self.levels),
                down = $('.mapplic-levels-down', self.levels);

            up.removeClass('mapplic-disabled');
            down.removeClass('mapplic-disabled');
            if (index == 0) {
                up.addClass('mapplic-disabled');
            } else if (index == self.levelselect.get(0).length - 1) {
                down.addClass('mapplic-disabled');
            }
        }

        var getLocationData = function(id) {
            var data = null;
            $.each(self.data.levels, function(index, layer) {
                $.each(layer.locations, function(index, value) {
                    if (value.id == id) {
                        data = value;
                    }
                });
            });
            return data;
        }

        var showLocation = function(id, duration, check) {
            $.each(self.data.levels, function(index, layer) {
                if (layer.id == id) {
                    switchLevel(layer.id, false);

                    return false;
                }
                $.each(layer.locations, function(index, location) {
                    if (location.id == id) {
                        // redirecting
                        if (location.action == 'open-link') {
                            window.location.href = location.link;
                            return false;
                        } else if (location.action == 'open-link-new-tab') {
                            window.open(location.link);
                            return false;
                        }
                        // alert(self.o.spmaxscale);
                        // tooltip and focus
                        var ry = 0.5;
                        if (id === 'Liposuction_Female_start') {
                            self.o.maxscale = 0.6;
                        } else if (id === 'Tummy_Tuck_start' || id === 'Male_Breast_Removal_start' || id === 'Liposuction_start') {
                            self.o.maxscale = 1;
                        } else if (id === 'Dimple_Creation_start' || id === 'Face_Lifting_start') {
                            self.o.maxscale = 2;
                        } else {
                            self.o.maxscale = self.o.spmaxscale;
                        }
                        // alert("sp" + self.o.spmaxscale + " max:: " + self.o.maxscale);
                        // alert(self.o.maxscale);
                        if (!self.o.landmark) {
                            self.tooltip.set(location);
                            self.tooltip.show(location);
                            ry = ((self.container.height() - self.tooltip.drop) / 2 + self.tooltip.drop) / self.container.height();
                        }
                        var zoom = typeof location.zoom !== 'undefined' ? location.zoom : 4;

                        switchLevel(layer.id, true);

                        zoomTo(location.x, location.y, zoom, duration, 'easeInOutCubic', ry);

                        $('.mapplic-active', self.el).attr('class', 'mapplic-clickable');
                        if (location.onmap) location.onmap.attr('class', 'mapplic-active');

                        if ((self.o.deeplinking) && (!check)) self.deeplinking.update(id);

                        return false;
                    }
                });
            });
        };

        var normalizeX = function(x) {
            var minX = self.container.width() - self.contentWidth * self.scale;

            if (minX < 0) {
                if (x > 0) x = 0;
                else if (x < minX) x = minX;
            } else x = minX / 2;

            return x;
        }

        var normalizeY = function(y) {
            var minY = self.container.height() - self.contentHeight * self.scale;

            if (minY < 0) {
                if (y >= 0) y = 0;
                else if (y < minY) y = minY;
            } else y = minY / 2;

            return y;
        }

        var normalizeScale = function(scale) {
            // alert(self.o.landmark);
            if (scale < self.fitscale) scale = self.fitscale;
            else if (scale > self.o.maxscale) scale = self.o.maxscale;

            if (self.zoombuttons) self.zoombuttons.update(scale);

            return scale;
        }

        var zoomTo = function(x, y, s, duration, easing, ry) {
            // alert("x :: " + x + " y :: " + y + " scale :: " + s + " ry :: " + ry)
            duration = typeof duration !== 'undefined' ? duration : 400;
            ry = typeof ry !== 'undefined' ? ry : 0.5;

            self.scale = normalizeScale(self.fitscale * s);

            self.x = normalizeX(self.container.width() * 0.5 - self.scale * self.contentWidth * x);
            self.y = normalizeY(self.container.height() * ry - self.scale * self.contentHeight * y);
            // alert("x :: " + self.x + " y :: " + self.y + " scale :: " + self.scale + " fitscale :: " + self.fitscale);
            moveTo(self.x, self.y, self.scale, duration, easing);
        }

        var moveTo = function(x, y, scale, d, easing) {
            if (scale !== undefined) {
                self.map.stop().animate({
                    'left': x,
                    'top': y,
                    'width': self.contentWidth * scale,
                    'height': self.contentHeight * scale
                }, d, easing, function() {
                    if (self.tooltip) self.tooltip.position();
                });
            } else {
                self.map.css({
                    'left': x,
                    'top': y
                });
            }
            if (self.tooltip) self.tooltip.position();
            if (self.minimap) self.minimap.update(x, y);
        }
    };

    //  Create a jQuery plugin
    $.fn.mapplic = function(params) {
        var len = this.length;

        return this.each(function(index) {
            var me = $(this),
                key = 'mapplic' + (len > 1 ? '-' + ++index : ''),
                instance = (new Mapplic).init(me, params);
        });
    };

})(jQuery);
;!function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery"],i):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)}(function(i){"use strict";var e=window.Slick||{};(e=function(){var e=0;return function(t,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(t),appendDots:i(t),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(t),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(t).data("slick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,void 0!==document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):void 0!==document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=e++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}}()).prototype.activateADA=function(){this.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):!0===o?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-slick-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),!0===s.options.rtl&&!1===s.options.vertical&&(e=-e),!1===s.transformsEnabled?!1===s.options.vertical?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):!1===s.cssTransitions?(!0===s.options.rtl&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),!1===s.options.vertical?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),!1===s.options.vertical?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this,t=e.options.asNavFor;return t&&null!==t&&(t=i(t).not(e.$slider)),t},e.prototype.asNavFor=function(e){var t=this.getNavTarget();null!==t&&"object"==typeof t&&t.each(function(){var t=i(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};!1===e.options.fade?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(!1===i.options.infinite&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1==0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;!0===e.options.arrows&&(e.$prevArrow=i(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),!0!==e.options.infinite&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(!0===o.options.dots){for(o.$slider.addClass("slick-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-slick-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?i('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),!0!==e.options.centerMode&&!0!==e.options.swipeToSlide||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),!0===e.options.draggable&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>1){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){s=null;for(o in r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(!1===r.originalSettings.mobileFirst?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||!1===l||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n,r=this,l=i(e.currentTarget);switch(l.is("a")&&e.preventDefault(),l.is("li")||(l=l.closest("li")),n=r.slideCount%r.options.slidesToScroll!=0,o=n?0:(r.slideCount-r.currentSlide)%r.options.slidesToScroll,e.data.message){case"previous":s=0===o?r.options.slidesToScroll:r.options.slidesToShow-o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide-s,!1,t);break;case"next":s=0===o?r.options.slidesToScroll:o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide+s,!1,t);break;case"index":var d=0===e.data.index?0:e.data.index||l.index()*r.options.slidesToScroll;r.slideHandler(r.checkNavigable(d),!1,t),l.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t;if(e=this.getNavigableIndexes(),t=0,i>e[e.length-1])i=e[e.length-1];else for(var o in e){if(i<e[o]){i=t;break}t=e[o]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",i.proxy(e.interrupt,e,!0)).off("mouseleave.slick",i.proxy(e.interrupt,e,!1)),!0===e.options.accessibility&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),!0===e.options.accessibility&&(e.$prevArrow&&e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),!0===e.options.accessibility&&e.$list.off("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().off("click.slick",e.selectHandler),i(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),i(window).off("resize.slick.slick-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>1&&((i=e.$slides.children().children()).removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){!1===this.shouldClick&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;!1===t.cssTransitions?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;!1===e.cssTransitions?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*",function(t){t.stopImmediatePropagation();var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&(e.focussed=o.is(":focus"),e.autoPlay())},0)})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){return this.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(!0===i.options.infinite)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(!0===i.options.centerMode)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s,n=this,r=0;return n.slideOffset=0,t=n.$slides.first().outerHeight(!0),!0===n.options.infinite?(n.slideCount>n.options.slidesToShow&&(n.slideOffset=n.slideWidth*n.options.slidesToShow*-1,s=-1,!0===n.options.vertical&&!0===n.options.centerMode&&(2===n.options.slidesToShow?s=-1.5:1===n.options.slidesToShow&&(s=-2)),r=t*n.options.slidesToShow*s),n.slideCount%n.options.slidesToScroll!=0&&i+n.options.slidesToScroll>n.slideCount&&n.slideCount>n.options.slidesToShow&&(i>n.slideCount?(n.slideOffset=(n.options.slidesToShow-(i-n.slideCount))*n.slideWidth*-1,r=(n.options.slidesToShow-(i-n.slideCount))*t*-1):(n.slideOffset=n.slideCount%n.options.slidesToScroll*n.slideWidth*-1,r=n.slideCount%n.options.slidesToScroll*t*-1))):i+n.options.slidesToShow>n.slideCount&&(n.slideOffset=(i+n.options.slidesToShow-n.slideCount)*n.slideWidth,r=(i+n.options.slidesToShow-n.slideCount)*t),n.slideCount<=n.options.slidesToShow&&(n.slideOffset=0,r=0),!0===n.options.centerMode&&n.slideCount<=n.options.slidesToShow?n.slideOffset=n.slideWidth*Math.floor(n.options.slidesToShow)/2-n.slideWidth*n.slideCount/2:!0===n.options.centerMode&&!0===n.options.infinite?n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)-n.slideWidth:!0===n.options.centerMode&&(n.slideOffset=0,n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)),e=!1===n.options.vertical?i*n.slideWidth*-1+n.slideOffset:i*t*-1+r,!0===n.options.variableWidth&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,!0===n.options.centerMode&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow+1),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,e+=(n.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(i){return this.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(!1===e.options.infinite?i=e.slideCount:(t=-1*e.options.slidesToScroll,o=-1*e.options.slidesToScroll,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o=this;return t=!0===o.options.centerMode?o.slideWidth*Math.floor(o.options.slidesToShow/2):0,!0===o.options.swipeToSlide?(o.$slideTrack.find(".slick-slide").each(function(s,n){if(n.offsetLeft-t+i(n).outerWidth()/2>-1*o.swipeLeft)return e=n,!1}),Math.abs(i(e).attr("data-slick-index")-o.currentSlide)||1):o.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(i,e){this.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("slick-initialized")||(i(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),!0===t.options.accessibility&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t){var s=o.indexOf(t);i(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+t,tabindex:-1}),-1!==s&&i(this).attr({"aria-describedby":"slick-slide-control"+e.instanceUid+s})}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+s,"aria-controls":"slick-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.$slides.eq(s).attr("tabindex",0);e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide),!0===i.options.accessibility&&(i.$prevArrow.on("keydown.slick",i.keyHandler),i.$nextArrow.on("keydown.slick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;!0===e.options.dots&&(i("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),!0===e.options.accessibility&&e.$dots.on("keydown.slick",e.keyHandler)),!0===e.options.dots&&!0===e.options.pauseOnDotsHover&&i("li",e.$dots).on("mouseenter.slick",i.proxy(e.interrupt,e,!0)).on("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),!0===e.options.accessibility&&e.$list.on("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),i(window).on("orientationchange.slick.slick-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.slick.slick-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&!0===e.options.accessibility?e.changeSlide({data:{message:!0===e.options.rtl?"next":"previous"}}):39===i.keyCode&&!0===e.options.accessibility&&e.changeSlide({data:{message:!0===e.options.rtl?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||n.$slider.attr("data-sizes"),r=document.createElement("img");r.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),n.$slider.trigger("lazyLoaded",[n,e,t])})},r.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),n.$slider.trigger("lazyLoadError",[n,e,t])},r.src=t})}var t,o,s,n=this;if(!0===n.options.centerMode?!0===n.options.infinite?s=(o=n.currentSlide+(n.options.slidesToShow/2+1))+n.options.slidesToShow+2:(o=Math.max(0,n.currentSlide-(n.options.slidesToShow/2+1)),s=n.options.slidesToShow/2+1+2+n.currentSlide):(o=n.options.infinite?n.options.slidesToShow+n.currentSlide:n.currentSlide,s=Math.ceil(o+n.options.slidesToShow),!0===n.options.fade&&(o>0&&o--,s<=n.slideCount&&s++)),t=n.$slider.find(".slick-slide").slice(o,s),"anticipated"===n.options.lazyLoad)for(var r=o-1,l=s,d=n.$slider.find(".slick-slide"),a=0;a<n.options.slidesToScroll;a++)r<0&&(r=n.slideCount-1),t=(t=t.add(d.eq(r))).add(d.eq(l)),r--,l++;e(t),n.slideCount<=n.options.slidesToShow?e(n.$slider.find(".slick-slide")):n.currentSlide>=n.slideCount-n.options.slidesToShow?e(n.$slider.find(".slick-cloned").slice(0,n.options.slidesToShow)):0===n.currentSlide&&e(n.$slider.find(".slick-cloned").slice(-1*n.options.slidesToShow))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){this.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){var i=this;i.checkResponsive(),i.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){var i=this;i.autoPlayClear(),i.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;t.unslicked||(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),!0===t.options.accessibility&&(t.initADA(),t.options.focusOnChange&&i(t.$slides.get(t.currentSlide)).attr("tabindex",0).focus()))},e.prototype.prev=e.prototype.slickPrev=function(){this.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),(r=document.createElement("img")).onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),!0===l.options.adaptiveHeight&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){s.respondTo=s.options.respondTo||"window";for(e in n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(i,e,t){var o=this;if(i="boolean"==typeof i?!0===(e=i)?0:o.slideCount-1:!0===e?--i:i,o.slideCount<1||i<0||i>o.slideCount-1)return!1;o.unload(),!0===t?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,o.reinit()},e.prototype.setCSS=function(i){var e,t,o=this,s={};!0===o.options.rtl&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,!1===o.transformsEnabled?o.$slideTrack.css(s):(s={},!1===o.cssTransitions?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;!1===i.options.vertical?!0===i.options.centerMode&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),!0===i.options.centerMode&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),!1===i.options.vertical&&!1===i.options.variableWidth?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):!0===i.options.variableWidth?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();!1===i.options.variableWidth&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,!0===t.options.rtl?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":void 0!==arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),!1===i.options.fade?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=!0===i.options.vertical?"top":"left","top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||!0===i.options.useCSS&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&!1!==i.animType&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&!1!==i.animType},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;if(t=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("slick-current"),!0===n.options.centerMode){var r=n.options.slidesToShow%2==0?1:0;e=Math.floor(n.options.slidesToShow/2),!0===n.options.infinite&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e+r,i+e+1).addClass("slick-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1+r,o+e+2).addClass("slick-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("slick-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(i).addClass("slick-center")}else i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("slick-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=!0===n.options.infinite?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(!0===s.options.fade&&(s.options.centerMode=!1),!0===s.options.infinite&&!1===s.options.fade&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=!0===s.options.centerMode?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){var e=this;i||e.autoPlay(),e.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".slick-slide")?i(e.target):i(e.target).parents(".slick-slide"),s=parseInt(o.attr("data-slick-index"));s||(s=0),t.slideCount<=t.options.slidesToShow?t.slideHandler(s,!1,!0):t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(!0===a.animating&&!0===a.options.waitForAnimate||!0===a.options.fade&&a.currentSlide===i))if(!1===e&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,!1===a.options.infinite&&!1===a.options.centerMode&&(i<0||i>a.getDotCount()*a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else if(!1===a.options.infinite&&!0===a.options.centerMode&&(i<0||i>a.slideCount-a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else{if(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!=0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!=0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=(l=a.getNavTarget()).slick("getSlick")).slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide),a.updateDots(),a.updateArrows(),!0===a.options.fade)return!0!==t?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight();!0!==t?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)}},e.prototype.startLoad=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),(o=Math.round(180*t/Math.PI))<0&&(o=360-Math.abs(o)),o<=45&&o>=0?!1===s.options.rtl?"left":"right":o<=360&&o>=315?!1===s.options.rtl?"left":"right":o>=135&&o<=225?!1===s.options.rtl?"right":"left":!0===s.options.verticalSwiping?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(!0===o.touchObject.edgeHit&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(!1===e.options.swipe||"ontouchend"in document&&!1===e.options.swipe||!1===e.options.draggable&&-1!==i.type.indexOf("mouse")))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,!0===e.options.verticalSwiping&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(!0===l.options.verticalSwiping&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(!1===l.options.rtl?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),!0===l.options.verticalSwiping&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,!1===l.options.infinite&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),!1===l.options.vertical?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,!0===l.options.verticalSwiping&&(l.swipeLeft=e+o*s),!0!==l.options.fade&&!1!==l.options.touchMove&&(!0===l.animating?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;if(t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow)return t.touchObject={},!1;void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,t.dragging=!0},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i=this;Math.floor(i.options.slidesToShow/2),!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&!i.options.infinite&&(i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===i.currentSlide?(i.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-i.options.slidesToShow&&!1===i.options.centerMode?(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-1&&!0===i.options.centerMode&&(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.slick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||void 0===s?o[i].slick=new e(o[i],s):t=o[i].slick[s].apply(o[i].slick,n),void 0!==t)return t;return o}});
;