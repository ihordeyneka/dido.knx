/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(9);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lightrouter__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lightrouter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lightrouter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_hashchange__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_hashchange___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_hashchange__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_simplegrid_simple_grid_scss__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_simplegrid_simple_grid_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_simplegrid_simple_grid_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_css_toggle_switch_src_toggle_switch_scss__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_css_toggle_switch_src_toggle_switch_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_css_toggle_switch_src_toggle_switch_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__scss_switch_scss__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__scss_switch_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__scss_switch_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__scss_main_scss__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__scss_main_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__scss_main_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_light__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_blinds__ = __webpack_require__(20);










var router = new __WEBPACK_IMPORTED_MODULE_0_lightrouter___default.a({
  type: 'hash',
  handler: {
    home: function () { __WEBPACK_IMPORTED_MODULE_6__pages_home__["a" /* default */].render(); },
    light: function () { __WEBPACK_IMPORTED_MODULE_7__pages_light__["a" /* default */].render(); },
    blinds: function (params) { __WEBPACK_IMPORTED_MODULE_8__pages_blinds__["a" /* default */].render(); }
  },
  pathRoot: 'my-app/path',
  routes: {
    '': 'home',
    'light': 'light',
    'blinds': 'blinds'
  }
});

router.run();

__WEBPACK_IMPORTED_MODULE_1_hashchange___default.a.update(function () {
  router.run();
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
 *  Copyright 2014 Gary Green.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

(function(window, factory) {

	if (true)
	{
		module.exports = factory(window);
	}
	else
	{
		window.LightRouter = factory(window);
	}

}(typeof window === 'undefined' ? undefined : window, function(window) {

	function LightRouter(options)
	{
		/**
		 * Path root (will be stripped out when testing path-based routes)
		 * @type string
		 */
		this.pathRoot = '';

		/**
		 * Routes
		 * @type array
		 */
		this.routes = [];

		/**
		 * Default routing type [hash or path]
		 * @type string
		 */
		this.type = 'path';

		/**
		 * Custom path (mainly used for testing)
		 * @type string
		 */
		this.path = null;

		/**
		 * Custom hash (mainly used for testing)
		 * @type string
		 */
		this.hash = null;

		/**
		 * Context to call matched routes under
		 * @type {mixed}
		 */
		this.context = this;

		/**
		 * Handler for string based callbacks
		 * @type {object|function}
		 */
		this.handler = window;

		/**
		 * Named param replace and matching regex
		 * @type {Object}
		 */
		var namedParam = '([\\w-]+)';
		this.namedParam = {
			match: new RegExp('{(' + namedParam + ')}', 'g'),
			replace: namedParam
		};

		options = options || {};

		if (options.type)      this.setType(options.type);
		if (options.path)      this.setPath(options.path);
		if (options.pathRoot)  this.setPathRoot(options.pathRoot);
		if (options.hash)      this.setHash(options.hash);
		if (options.context)   this.setContext(options.context);
		if (options.handler)   this.setHandler(options.handler);

		if (options.routes)
		{
			var route;
			for (route in options.routes)
			{
				this.add(route, options.routes[route]);
			}
		}
	}

	LightRouter.prototype = {

		/**
		 * Route constructor
		 * @type {Route}
		 */
		Route: Route,

		/**
		 * Add a route
		 * @param string|RegExp   route
		 * @param string|function callback
		 * @return self
		 */
		add: function(route, callback) {
			this.routes.push(new this.Route(route, callback, this));
			return this;
		},


		/**
		 * Empty/clear all the routes
		 * @return self
		 */
		empty: function() {
			this.routes = [];
			return this;
		},

		/**
		 * Set's the routing type
		 * @param self
		 */
		setType: function(type) {
			this.type = type;
			return this;
		},

		/**
		 * Set the path root url
		 * @param string url
		 * @return self
		 */
		setPathRoot: function(url) {
			this.pathRoot = url;
			return this;
		},

		/**
		 * Sets the custom path to test routes against
		 * @param  string path
		 * @return self
		 */
		setPath: function(path) {
			this.path = path;
			return this;
		},

		/**
		 * Sets the custom hash to test routes against
		 * @param  string hash
		 * @return self
		 */
		setHash: function(hash) {
			this.hash = hash;
			return this;
		},

		/**
		 * Sets context to call matched routes under
		 * @param  mixed context
		 * @return self
		 */
		setContext: function(context) {
			this.context = context;
			return this;
		},

		/**
		 * Set handler
		 * @param  mixed context
		 * @return self
		 */
		setHandler: function(handler) {
			this.handler = handler;
			return this;
		},

		/**
		 * Gets the url to test the routes against
		 * @return self
		 */
		getUrl: function(routeType) {

			var url;
			routeType = routeType || this.type;

			if (routeType == 'path')
			{
				var rootRegex = new RegExp('^' + this.pathRoot + '/?');
				url = this.path || window.location.pathname.substring(1);
				url = url.replace(rootRegex, '');
			}
			else if (routeType == 'hash')
			{
				url = this.hash || window.location.hash.substring(1);
			}
				
			return decodeURI(url);
		},

		/**
		 * Attempt to match a one-time route and callback
		 *
		 * @param  {string} path
		 * @param  {closure|string} callback
		 * @return {mixed}
		 */
		match: function(path, callback) {
			var route = new this.Route(path, callback, this);
			if (route.test(this.getUrl()))
			{
				return route.run();
			}
		},

		/**
		 * Run the router
		 * @return Route|undefined
		 */
		run: function() {
			var url = this.getUrl(), route;

			for (var i in this.routes)
			{
				// Get the route
				route = this.routes[i];

				// Test and run the route if it matches
				if (route.test(url))
				{
					route.run();
					return route;
				}
			}
		}
	};


	/**
	 * Route object
	 * @param {string} path
	 * @param {string} closure
	 * @param {LightRouter} router  Instance of the light router the route belongs to.
	 */
	function Route(path, callback, router)
	{
		this.path = path;
		this.callback = callback;
		this.router = router;
		this.values = [];
	}

	Route.prototype = {

		/**
		 * Converts route to a regex (if required) so that it's suitable for matching against.
		 * @param  string route
		 * @return RegExp
		 */
		regex: function() {

			var path = this.path;

			if (typeof path === 'string')
			{
				return new RegExp('^' + path.replace(/\//g, '\\/').replace(this.router.namedParam.match, this.router.namedParam.replace) + '$');
			}
			return path;
		},

		/**
		 * Get the matching param keys
		 * @return object  Object keyed with param name (or index) with the value.
		 */
		params: function() {

			var obj = {}, name, values = this.values, params = values, i, t = 0, path = this.path;

			if (typeof path === 'string')
			{
				t = 1;
				params = path.match(this.router.namedParam.match);
			}
			
			for (i in params)
			{
				name = t ? params[i].replace(this.router.namedParam.match, '$1') : i;
				obj[name] = values[i];
			}

			return obj;
		},

		/**
		 * Test the route to see if it matches
		 * @param  {string} url Url to match against
		 * @return {boolean}
		 */
		test: function(url) {
			var matches;
			if (matches = url.match(this.regex()))
			{
				this.values = matches.slice(1);
				return true;
			}
			return false;
		},

		/**
		 * Run the route callback with the matched params
		 * @return {mixed}
		 */
		run: function() {
			if (typeof this.callback === 'string')
			{
				return this.router.handler[this.callback](this.params());
			}
			return this.callback.apply(this.router.context, [this.params()]);
		}
	};

	return LightRouter;

}));

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var each = __webpack_require__(5),
	indexOf = __webpack_require__(6);

var getFragment = function( url ){

	var url = url || window.location.href;
	return url.replace( /^[^#]*#?(.*)$/, '$1' );

};

var HashChange = function(){

	var self = this;

	this.onChangeCallbacks = [];

	window.addEventListener("hashchange", function(e){
		
		self.hashChanged( getFragment(e.newURL) );

	}, false);

	return this;

};

HashChange.prototype = {

	update : function( callback ){

		if(callback){

			this.onChangeCallbacks.push( callback );
			return this;

		} else {

			this.hashChanged( getFragment() );

		}

	},

	unbind : function( callback ){

		var i = indexOf( this.onChangeCallbacks , callback);

		if(i !== -1){

			this.onChangeCallbacks.splice(i - 1, 1);

		}

		return this;

	},
	
	updateHash : function( hash ){
 
			this.currentHash = hash;
 
			window.location.href = window.location.href.replace( /#.*/, '') + '#' + hash;
 
		},

	hashChanged : function( frag ){

		if(this.onChangeCallbacks.length){

			each(this.onChangeCallbacks, function( callback ){

				callback( frag );

				return true;

			});

		}

		return this;

	},


}

hashChange = new HashChange();

module.exports = hashChange;


/***/ }),
/* 5 */
/***/ (function(module, exports) {


var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};



/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = function(arr, obj){
  if (arr.indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(8);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../css-loader/index.js!../sass-loader/lib/loader.js!./simple-grid.scss", function() {
		var newContent = require("!!../css-loader/index.js!../sass-loader/lib/loader.js!./simple-grid.scss");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Lato:400,300,300italic,400italic,700,700italic);", ""]);

// module
exports.push([module.i, "html,\nbody {\n  height: 100%;\n  width: 100%;\n  margin: 0;\n  padding: 0;\n  left: 0;\n  top: 0;\n  font-size: 100%; }\n\n* {\n  font-family: \"Lato\", Helvetica, sans-serif;\n  color: #333447;\n  line-height: 1.5; }\n\nh1 {\n  font-size: 2.5rem; }\n\nh2 {\n  font-size: 2rem; }\n\nh3 {\n  font-size: 1.375rem; }\n\nh4 {\n  font-size: 1.125rem; }\n\nh5 {\n  font-size: 1rem; }\n\nh6 {\n  font-size: 0.875rem; }\n\np {\n  font-size: 1.125rem;\n  font-weight: 200;\n  line-height: 1.8; }\n\n.font-light {\n  font-weight: 300; }\n\n.font-regular {\n  font-weight: 400; }\n\n.font-heavy {\n  font-weight: 700; }\n\n.left {\n  text-align: left; }\n\n.right {\n  text-align: right; }\n\n.center {\n  text-align: center;\n  margin-left: auto;\n  margin-right: auto; }\n\n.justify {\n  text-align: justify; }\n\n.hidden-sm {\n  display: none; }\n\n.container {\n  width: 90%;\n  margin-left: auto;\n  margin-right: auto; }\n  @media only screen and (min-width: 33.75em) {\n    .container {\n      width: 80%; } }\n  @media only screen and (min-width: 60em) {\n    .container {\n      width: 75%;\n      max-width: 60rem; } }\n\n.row {\n  position: relative;\n  width: 100%; }\n\n.row [class^=\"col\"] {\n  float: left;\n  margin: 0.5rem 2%;\n  min-height: 0.125rem; }\n\n.row::after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n.col-1,\n.col-2,\n.col-3,\n.col-4,\n.col-5,\n.col-6,\n.col-7,\n.col-8,\n.col-9,\n.col-10,\n.col-11,\n.col-12 {\n  width: 96%; }\n\n.col-1-sm {\n  width: 4.33333%; }\n\n.col-2-sm {\n  width: 12.66667%; }\n\n.col-3-sm {\n  width: 21%; }\n\n.col-4-sm {\n  width: 29.33333%; }\n\n.col-5-sm {\n  width: 37.66667%; }\n\n.col-6-sm {\n  width: 46%; }\n\n.col-7-sm {\n  width: 54.33333%; }\n\n.col-8-sm {\n  width: 62.66667%; }\n\n.col-9-sm {\n  width: 71%; }\n\n.col-10-sm {\n  width: 79.33333%; }\n\n.col-11-sm {\n  width: 87.66667%; }\n\n.col-12-sm {\n  width: 96%; }\n\n@media only screen and (min-width: 45em) {\n  .col-1 {\n    width: 4.33333%; }\n  .col-2 {\n    width: 12.66667%; }\n  .col-3 {\n    width: 21%; }\n  .col-4 {\n    width: 29.33333%; }\n  .col-5 {\n    width: 37.66667%; }\n  .col-6 {\n    width: 46%; }\n  .col-7 {\n    width: 54.33333%; }\n  .col-8 {\n    width: 62.66667%; }\n  .col-9 {\n    width: 71%; }\n  .col-10 {\n    width: 79.33333%; }\n  .col-11 {\n    width: 87.66667%; }\n  .col-12 {\n    width: 96%; }\n  .hidden-sm {\n    display: block; } }\n", ""]);

// exports


/***/ }),
/* 9 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(11);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../css-loader/index.js!../../sass-loader/lib/loader.js!./toggle-switch.scss", function() {
		var newContent = require("!!../../css-loader/index.js!../../sass-loader/lib/loader.js!./toggle-switch.scss");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n/*\n* CSS TOGGLE SWITCH\n*\n* Ionuț Colceriu - ghinda.net\n* https://github.com/ghinda/css-toggle-switch\n*\n*/\n/* supported values are px, rem-calc, em-calc\n */\n/* imports\n */\n/* Functions\n */\n/* Shared\n */\n/* Hide by default\n */\n.switch-toggle a,\n.switch-light span span {\n  display: none; }\n\n/* We can't test for a specific feature,\n * so we only target browsers with support for media queries.\n */\n@media only screen {\n  /* Checkbox\n */\n  .switch-light {\n    position: relative;\n    display: block;\n    /* simulate default browser focus outlines on the switch,\n   * when the inputs are focused.\n   */ }\n    .switch-light::after {\n      clear: both;\n      content: '';\n      display: table; }\n    .switch-light *,\n    .switch-light *:before,\n    .switch-light *:after {\n      box-sizing: border-box; }\n    .switch-light a {\n      display: block;\n      transition: all 0.2s ease-out; }\n    .switch-light label,\n    .switch-light > span {\n      /* breathing room for bootstrap/foundation classes.\n     */\n      line-height: 2em; }\n    .switch-light input:focus ~ span a,\n    .switch-light input:focus + label {\n      outline-width: 2px;\n      outline-style: solid;\n      outline-color: Highlight;\n      /* Chrome/Opera gets its native focus styles.\n     */ } }\n    @media only screen and (-webkit-min-device-pixel-ratio: 0) {\n      .switch-light input:focus ~ span a,\n      .switch-light input:focus + label {\n        outline-color: -webkit-focus-ring-color;\n        outline-style: auto; } }\n\n@media only screen {\n  /* don't hide the input from screen-readers and keyboard access\n */\n  .switch-light input {\n    position: absolute;\n    opacity: 0;\n    z-index: 3; }\n  .switch-light input:checked ~ span a {\n    right: 0%; }\n  /* inherit from label\n */\n  .switch-light strong {\n    font-weight: inherit; }\n  .switch-light > span {\n    position: relative;\n    overflow: hidden;\n    display: block;\n    min-height: 2em;\n    /* overwrite 3rd party classes padding\n   * eg. bootstrap .alert\n   */\n    padding: 0;\n    text-align: left; }\n  .switch-light span span {\n    position: relative;\n    z-index: 2;\n    display: block;\n    float: left;\n    width: 50%;\n    text-align: center;\n    user-select: none; }\n  .switch-light a {\n    position: absolute;\n    right: 50%;\n    top: 0;\n    z-index: 1;\n    display: block;\n    width: 50%;\n    height: 100%;\n    padding: 0; }\n  /* bootstrap 4 tweaks\n*/\n  .switch-light.row {\n    display: flex; }\n  .switch-light .alert-light {\n    color: #333; }\n  /* Radio Switch\n */\n  .switch-toggle {\n    position: relative;\n    display: block;\n    /* simulate default browser focus outlines on the switch,\n   * when the inputs are focused.\n   */\n    /* For callout panels in foundation\n  */\n    padding: 0 !important;\n    /* 2 items\n   */\n    /* 3 items\n   */\n    /* 4 items\n   */\n    /* 5 items\n   */\n    /* 6 items\n   */ }\n    .switch-toggle::after {\n      clear: both;\n      content: '';\n      display: table; }\n    .switch-toggle *,\n    .switch-toggle *:before,\n    .switch-toggle *:after {\n      box-sizing: border-box; }\n    .switch-toggle a {\n      display: block;\n      transition: all 0.2s ease-out; }\n    .switch-toggle label,\n    .switch-toggle > span {\n      /* breathing room for bootstrap/foundation classes.\n     */\n      line-height: 2em; }\n    .switch-toggle input:focus ~ span a,\n    .switch-toggle input:focus + label {\n      outline-width: 2px;\n      outline-style: solid;\n      outline-color: Highlight;\n      /* Chrome/Opera gets its native focus styles.\n     */ } }\n    @media only screen and (-webkit-min-device-pixel-ratio: 0) {\n      .switch-toggle input:focus ~ span a,\n      .switch-toggle input:focus + label {\n        outline-color: -webkit-focus-ring-color;\n        outline-style: auto; } }\n\n@media only screen {\n    .switch-toggle input {\n      position: absolute;\n      left: 0;\n      opacity: 0; }\n    .switch-toggle input + label {\n      position: relative;\n      z-index: 2;\n      display: block;\n      float: left;\n      padding: 0 0.5em;\n      margin: 0;\n      text-align: center; }\n    .switch-toggle a {\n      position: absolute;\n      top: 0;\n      left: 0;\n      padding: 0;\n      z-index: 1;\n      width: 10px;\n      height: 100%; }\n    .switch-toggle label:nth-child(2):nth-last-child(4),\n    .switch-toggle label:nth-child(2):nth-last-child(4) ~ label,\n    .switch-toggle label:nth-child(2):nth-last-child(4) ~ a {\n      width: 50%; }\n    .switch-toggle label:nth-child(2):nth-last-child(4) ~ input:checked:nth-child(3) + label ~ a {\n      left: 50%; }\n    .switch-toggle label:nth-child(2):nth-last-child(6),\n    .switch-toggle label:nth-child(2):nth-last-child(6) ~ label,\n    .switch-toggle label:nth-child(2):nth-last-child(6) ~ a {\n      width: 33.33%; }\n    .switch-toggle label:nth-child(2):nth-last-child(6) ~ input:checked:nth-child(3) + label ~ a {\n      left: 33.33%; }\n    .switch-toggle label:nth-child(2):nth-last-child(6) ~ input:checked:nth-child(5) + label ~ a {\n      left: 66.66%; }\n    .switch-toggle label:nth-child(2):nth-last-child(8),\n    .switch-toggle label:nth-child(2):nth-last-child(8) ~ label,\n    .switch-toggle label:nth-child(2):nth-last-child(8) ~ a {\n      width: 25%; }\n    .switch-toggle label:nth-child(2):nth-last-child(8) ~ input:checked:nth-child(3) + label ~ a {\n      left: 25%; }\n    .switch-toggle label:nth-child(2):nth-last-child(8) ~ input:checked:nth-child(5) + label ~ a {\n      left: 50%; }\n    .switch-toggle label:nth-child(2):nth-last-child(8) ~ input:checked:nth-child(7) + label ~ a {\n      left: 75%; }\n    .switch-toggle label:nth-child(2):nth-last-child(10),\n    .switch-toggle label:nth-child(2):nth-last-child(10) ~ label,\n    .switch-toggle label:nth-child(2):nth-last-child(10) ~ a {\n      width: 20%; }\n    .switch-toggle label:nth-child(2):nth-last-child(10) ~ input:checked:nth-child(3) + label ~ a {\n      left: 20%; }\n    .switch-toggle label:nth-child(2):nth-last-child(10) ~ input:checked:nth-child(5) + label ~ a {\n      left: 40%; }\n    .switch-toggle label:nth-child(2):nth-last-child(10) ~ input:checked:nth-child(7) + label ~ a {\n      left: 60%; }\n    .switch-toggle label:nth-child(2):nth-last-child(10) ~ input:checked:nth-child(9) + label ~ a {\n      left: 80%; }\n    .switch-toggle label:nth-child(2):nth-last-child(12),\n    .switch-toggle label:nth-child(2):nth-last-child(12) ~ label,\n    .switch-toggle label:nth-child(2):nth-last-child(12) ~ a {\n      width: 16.6%; }\n    .switch-toggle label:nth-child(2):nth-last-child(12) ~ input:checked:nth-child(3) + label ~ a {\n      left: 16.6%; }\n    .switch-toggle label:nth-child(2):nth-last-child(12) ~ input:checked:nth-child(5) + label ~ a {\n      left: 33.2%; }\n    .switch-toggle label:nth-child(2):nth-last-child(12) ~ input:checked:nth-child(7) + label ~ a {\n      left: 49.8%; }\n    .switch-toggle label:nth-child(2):nth-last-child(12) ~ input:checked:nth-child(9) + label ~ a {\n      left: 66.4%; }\n    .switch-toggle label:nth-child(2):nth-last-child(12) ~ input:checked:nth-child(11) + label ~ a {\n      left: 83%; }\n  /* Candy Theme\n * Based on the \"Sort Switches / Toggles (PSD)\" by Ormal Clarck\n * http://www.premiumpixels.com/freebies/sort-switches-toggles-psd/\n */\n  .switch-toggle.switch-candy,\n  .switch-light.switch-candy > span {\n    background-color: #2d3035;\n    border-radius: 3px;\n    box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.3), 0 1px 0 rgba(255, 255, 255, 0.2); }\n  .switch-light.switch-candy span span,\n  .switch-light.switch-candy input:checked ~ span span:first-child,\n  .switch-toggle.switch-candy label {\n    color: #fff;\n    font-weight: bold;\n    text-align: center;\n    text-shadow: 1px 1px 1px #191b1e; }\n  .switch-light.switch-candy input ~ span span:first-child,\n  .switch-light.switch-candy input:checked ~ span span:nth-child(2),\n  .switch-candy input:checked + label {\n    color: #333;\n    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5); }\n  .switch-candy a {\n    border: 1px solid #333;\n    border-radius: 3px;\n    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.45);\n    background-color: #70c66b;\n    background-image: linear-gradient(rgba(255, 255, 255, 0.2), transparent); }\n  .switch-candy-blue a {\n    background-color: #38a3d4; }\n  .switch-candy-yellow a {\n    background-color: #f5e560; }\n  /* iOS Theme\n*/\n  .switch-ios.switch-light span span {\n    color: #888b92; }\n  .switch-ios.switch-light a {\n    left: 0;\n    top: 0;\n    width: 2em;\n    height: 2em;\n    background-color: #fff;\n    border-radius: 100%;\n    border: 0.25em solid #D8D9DB;\n    transition: all .2s ease-out; }\n  .switch-ios.switch-light > span {\n    display: block;\n    width: 100%;\n    height: 2em;\n    background-color: #D8D9DB;\n    border-radius: 1.75em;\n    transition: all .4s ease-out; }\n  .switch-ios.switch-light > span span {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    opacity: 0;\n    line-height: 1.875em;\n    vertical-align: middle;\n    transition: all .2s ease-out; }\n    .switch-ios.switch-light > span span:first-of-type {\n      opacity: 1;\n      padding-left: 1.875em; }\n    .switch-ios.switch-light > span span:last-of-type {\n      padding-right: 1.875em; }\n  .switch-ios.switch-light input:checked ~ span a {\n    left: 100%;\n    border-color: #4BD865;\n    margin-left: -2em; }\n  .switch-ios.switch-light input:checked ~ span {\n    border-color: #4BD865;\n    box-shadow: inset 0 0 0 30px #4BD865; }\n  .switch-ios.switch-light input:checked ~ span span:first-of-type {\n    opacity: 0; }\n  .switch-ios.switch-light input:checked ~ span span:last-of-type {\n    opacity: 1;\n    color: #fff; }\n  .switch-ios.switch-toggle {\n    background-color: #D8D9DB;\n    border-radius: 30px;\n    box-shadow: inset rgba(0, 0, 0, 0.1) 0 1px 0; }\n    .switch-ios.switch-toggle a {\n      background-color: #4BD865;\n      border: 0.125em solid #D8D9DB;\n      border-radius: 1.75em;\n      transition: all 0.12s ease-out; }\n    .switch-ios.switch-toggle label {\n      height: 2.4em;\n      color: #888b92;\n      line-height: 2.4em;\n      vertical-align: middle; }\n  .switch-ios input:checked + label {\n    color: #3e4043; }\n  /* Holo Theme\n */\n  .switch-toggle.switch-holo,\n  .switch-light.switch-holo > span {\n    background-color: #464747;\n    border-radius: 1px;\n    box-shadow: inset rgba(0, 0, 0, 0.1) 0 1px 0;\n    color: #fff;\n    text-transform: uppercase; }\n  .switch-holo label {\n    color: #fff; }\n  .switch-holo > span span {\n    opacity: 0;\n    transition: all 0.1s; }\n    .switch-holo > span span:first-of-type {\n      opacity: 1; }\n  .switch-holo > span span,\n  .switch-holo label {\n    font-size: 85%;\n    line-height: 2.15625em; }\n  .switch-holo a {\n    background-color: #666;\n    border-radius: 1px;\n    box-shadow: inset rgba(255, 255, 255, 0.2) 0 1px 0, inset rgba(0, 0, 0, 0.3) 0 -1px 0; }\n  /* Selected ON switch-light\n*/\n  .switch-holo.switch-light input:checked ~ span a {\n    background-color: #0E88B1; }\n  .switch-holo.switch-light input:checked ~ span span:first-of-type {\n    opacity: 0; }\n  .switch-holo.switch-light input:checked ~ span span:last-of-type {\n    opacity: 1; }\n  /* Material Theme\n */\n  /* switch-light\n */\n  .switch-light.switch-material a {\n    top: -0.1875em;\n    width: 1.75em;\n    height: 1.75em;\n    border-radius: 50%;\n    background: #fafafa;\n    box-shadow: 0 0.125em 0.125em 0 rgba(0, 0, 0, 0.14), 0 0.1875em 0.125em -0.125em rgba(0, 0, 0, 0.2), 0 0.125em 0.25em 0 rgba(0, 0, 0, 0.12);\n    transition: right 0.28s cubic-bezier(0.4, 0, 0.2, 1); }\n  .switch-material.switch-light {\n    overflow: visible; }\n    .switch-material.switch-light::after {\n      clear: both;\n      content: '';\n      display: table; }\n  .switch-material.switch-light > span {\n    overflow: visible;\n    position: relative;\n    top: 0.1875em;\n    width: 3.25em;\n    height: 1.5em;\n    min-height: auto;\n    border-radius: 1em;\n    background: rgba(0, 0, 0, 0.26); }\n  .switch-material.switch-light span span {\n    position: absolute;\n    clip: rect(0 0 0 0); }\n  .switch-material.switch-light input:checked ~ span a {\n    right: 0;\n    background: #3f51b5;\n    box-shadow: 0 0.1875em 0.25em 0 rgba(0, 0, 0, 0.14), 0 0.1875em 0.1875em -0.125em rgba(0, 0, 0, 0.2), 0 0.0625em 0.375em 0 rgba(0, 0, 0, 0.12); }\n  .switch-material.switch-light input:checked ~ span {\n    background: rgba(63, 81, 181, 0.5); }\n  /* switch-toggle\n */\n  .switch-toggle.switch-material {\n    overflow: visible; }\n    .switch-toggle.switch-material::after {\n      clear: both;\n      content: '';\n      display: table; }\n  .switch-toggle.switch-material a {\n    top: 48%;\n    width: 0.375em !important;\n    height: 0.375em;\n    margin-left: 0.25em;\n    background: #3f51b5;\n    border-radius: 100%;\n    transform: translateY(-50%);\n    transition: transform .4s ease-in; }\n  .switch-toggle.switch-material label {\n    color: rgba(0, 0, 0, 0.54);\n    font-size: 1em; }\n  .switch-toggle.switch-material label:before {\n    content: '';\n    position: absolute;\n    top: 48%;\n    left: 0;\n    display: block;\n    width: 0.875em;\n    height: 0.875em;\n    border-radius: 100%;\n    border: 0.125em solid rgba(0, 0, 0, 0.54);\n    transform: translateY(-50%); }\n  .switch-toggle.switch-material input:checked + label:before {\n    border-color: #3f51b5; }\n  /* ripple\n */\n  .switch-light.switch-material > span:before,\n  .switch-light.switch-material > span:after,\n  .switch-toggle.switch-material label:after {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    z-index: 3;\n    display: block;\n    width: 4em;\n    height: 4em;\n    border-radius: 100%;\n    background: #3f51b5;\n    opacity: .4;\n    margin-left: -1.25em;\n    margin-top: -1.25em;\n    transform: scale(0);\n    transition: opacity .4s ease-in; }\n  .switch-light.switch-material > span:after {\n    left: auto;\n    right: 0;\n    margin-left: 0;\n    margin-right: -1.25em; }\n  .switch-toggle.switch-material label:after {\n    width: 3.25em;\n    height: 3.25em;\n    margin-top: -0.75em; }\n  @keyframes materialRipple {\n    0% {\n      transform: scale(0); }\n    20% {\n      transform: scale(1); }\n    100% {\n      opacity: 0;\n      transform: scale(1); } }\n  .switch-material.switch-light input:not(:checked) ~ span:after,\n  .switch-material.switch-light input:checked ~ span:before,\n  .switch-toggle.switch-material input:checked + label:after {\n    animation: materialRipple .4s ease-in; }\n  /* trick to prevent the default checked ripple animation from showing\n * when the page loads.\n * the ripples are hidden by default, and shown only when the input is focused.\n */\n  .switch-light.switch-material.switch-light input ~ span:before,\n  .switch-light.switch-material.switch-light input ~ span:after,\n  .switch-material.switch-toggle input + label:after {\n    visibility: hidden; }\n  .switch-light.switch-material.switch-light input:focus:checked ~ span:before,\n  .switch-light.switch-material.switch-light input:focus:not(:checked) ~ span:after,\n  .switch-material.switch-toggle input:focus:checked + label:after {\n    visibility: visible; } }\n\n/* Bugfix for older Webkit, including mobile Webkit. Adapted from\n * http://css-tricks.com/webkit-sibling-bug/\n */\n@media only screen and (-webkit-max-device-pixel-ratio: 2) and (max-device-width: 80em) {\n  .switch-light,\n  .switch-toggle {\n    -webkit-animation: webkitSiblingBugfix infinite 1s; } }\n\n@-webkit-keyframes webkitSiblingBugfix {\n  from {\n    -webkit-transform: translate3d(0, 0, 0); }\n  to {\n    -webkit-transform: translate3d(0, 0, 0); } }\n", ""]);

// exports


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(13);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./main.scss", function() {
		var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./main.scss");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "/* -- box model --------------------------------------- */\n*,\n*:after,\n*:before {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\n/* -- Tiles content ----------------------------------- */\n.tile .content-wrapper {\n  position: relative;\n  display: block;\n  top: 0;\n  width: 100%;\n  -webkit-transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);\n  -o-transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);\n  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1); }\n  .tile .content-wrapper .tile-content {\n    position: relative;\n    display: block;\n    overflow: hidden; }\n    .tile .content-wrapper .tile-content .tile-img {\n      position: relative;\n      display: block;\n      width: 100%;\n      margin: 0 auto;\n      background-repeat: no-repeat;\n      background-position: center center;\n      -webkit-background-size: contain;\n      -moz-background-size: contain;\n      -o-background-size: contain;\n      background-size: contain;\n      text-align: center; }\n      .tile .content-wrapper .tile-content .tile-img.tile-img-sm {\n        position: absolute;\n        margin: 0;\n        padding: 0;\n        display: block;\n        opacity: 0.3; }\n      .tile .content-wrapper .tile-content .tile-img.tile-img-bg {\n        position: absolute;\n        background-position: left top;\n        -webkit-background-size: cover;\n        -moz-background-size: cover;\n        -o-background-size: cover;\n        background-size: cover; }\n      .tile .content-wrapper .tile-content .tile-img img {\n        height: 100%; }\n    .tile .content-wrapper .tile-content .tile-holder {\n      position: relative;\n      display: block;\n      padding: 0; }\n      .tile .content-wrapper .tile-content .tile-holder.tile-holder-sm {\n        position: absolute;\n        margin: 0;\n        padding: 0; }\n      .tile .content-wrapper .tile-content .tile-holder span {\n        color: #000 !important;\n        font-weight: bold;\n        font-size: 24px; }\n\n/* -- Tiles color ------------------------------------- */\n.tile-red {\n  background-color: #e84e40; }\n  .tile-red .tile-content, .tile-red .title {\n    color: #eceff1; }\n  .tile-red:hover, .tile-red:active, .tile-red.active {\n    background-color: #dd191d; }\n  .tile-red:focus {\n    background-color: #d01716; }\n  .tile-red:disabled, .tile-red.disabled, .tile-red[disabled] {\n    background-color: #b3b3b3; }\n  .tile-red .ink {\n    background-color: #c41411; }\n\n.tile-red-reverse {\n  background-color: #e84e40; }\n  .tile-red-reverse:hover {\n    background-color: #eceff1; }\n    .tile-red-reverse:hover .tile-content, .tile-red-reverse:hover .title {\n      color: #e84e40; }\n\n.tile-red-inverse {\n  background-color: #eceff1; }\n  .tile-red-inverse .tile-content, .tile-red-inverse .title {\n    color: #e84e40; }\n\n.tile-red-inverse-reverse .tile-content, .tile-red-inverse-reverse .title {\n  color: #e84e40; }\n\n.tile-red-inverse-reverse:hover {\n  background-color: #e84e40; }\n  .tile-red-inverse-reverse:hover .tile-content, .tile-red-inverse-reverse:hover .title {\n    color: #eceff1; }\n\n.tile-red-inverse-reverse .ink {\n  background-color: #c41411; }\n\n.tile-pink {\n  background-color: #ec407a; }\n  .tile-pink .tile-content, .tile-pink .title {\n    color: #eceff1; }\n  .tile-pink:hover, .tile-pink:active, .tile-pink.active {\n    background-color: #d81b60; }\n  .tile-pink:focus {\n    background-color: #c2185b; }\n  .tile-pink:disabled, .tile-pink.disabled, .tile-pink[disabled] {\n    background-color: #b3b3b3; }\n  .tile-pink .ink {\n    background-color: #ad1457; }\n\n.tile-pink-reverse {\n  background-color: #ec407a; }\n  .tile-pink-reverse:hover {\n    background-color: #eceff1; }\n    .tile-pink-reverse:hover .tile-content, .tile-pink-reverse:hover .title {\n      color: #ec407a; }\n\n.tile-pink-inverse {\n  background-color: #eceff1; }\n  .tile-pink-inverse .tile-content, .tile-pink-inverse .title {\n    color: #ec407a; }\n\n.tile-pink-inverse-reverse .tile-content, .tile-pink-inverse-reverse .title {\n  color: #ec407a; }\n\n.tile-pink-inverse-reverse:hover {\n  background-color: #ec407a; }\n  .tile-pink-inverse-reverse:hover .tile-content, .tile-pink-inverse-reverse:hover .title {\n    color: #eceff1; }\n\n.tile-pink-inverse-reverse .ink {\n  background-color: #ad1457; }\n\n.tile-purple {\n  background-color: #ab47bc; }\n  .tile-purple .tile-content, .tile-purple .title {\n    color: #eceff1; }\n  .tile-purple:hover, .tile-purple:active, .tile-purple.active {\n    background-color: #8e24aa; }\n  .tile-purple:focus {\n    background-color: #7b1fa2; }\n  .tile-purple:disabled, .tile-purple.disabled, .tile-purple[disabled] {\n    background-color: #b3b3b3; }\n  .tile-purple .ink {\n    background-color: #6a1b9a; }\n\n.tile-purple-reverse {\n  background-color: #ab47bc; }\n  .tile-purple-reverse:hover {\n    background-color: #eceff1; }\n    .tile-purple-reverse:hover .tile-content, .tile-purple-reverse:hover .title {\n      color: #ab47bc; }\n\n.tile-purple-inverse {\n  background-color: #eceff1; }\n  .tile-purple-inverse .tile-content, .tile-purple-inverse .title {\n    color: #ab47bc; }\n\n.tile-purple-inverse-reverse .tile-content, .tile-purple-inverse-reverse .title {\n  color: #ab47bc; }\n\n.tile-purple-inverse-reverse:hover {\n  background-color: #ab47bc; }\n  .tile-purple-inverse-reverse:hover .tile-content, .tile-purple-inverse-reverse:hover .title {\n    color: #eceff1; }\n\n.tile-purple-inverse-reverse .ink {\n  background-color: #6a1b9a; }\n\n.tile-deep-purple {\n  background-color: #7e57c2; }\n  .tile-deep-purple .tile-content, .tile-deep-purple .title {\n    color: #eceff1; }\n  .tile-deep-purple:hover, .tile-deep-purple:active, .tile-deep-purple.active {\n    background-color: #5e35b1; }\n  .tile-deep-purple:focus {\n    background-color: #512da8; }\n  .tile-deep-purple:disabled, .tile-deep-purple.disabled, .tile-deep-purple[disabled] {\n    background-color: #b3b3b3; }\n  .tile-deep-purple .ink {\n    background-color: #4527a0; }\n\n.tile-deep-purple-reverse {\n  background-color: #7e57c2; }\n  .tile-deep-purple-reverse:hover {\n    background-color: #eceff1; }\n    .tile-deep-purple-reverse:hover .tile-content, .tile-deep-purple-reverse:hover .title {\n      color: #7e57c2; }\n\n.tile-deep-purple-inverse {\n  background-color: #eceff1; }\n  .tile-deep-purple-inverse .tile-content, .tile-deep-purple-inverse .title {\n    color: #7e57c2; }\n\n.tile-deep-purple-inverse-reverse .tile-content, .tile-deep-purple-inverse-reverse .title {\n  color: #7e57c2; }\n\n.tile-deep-purple-inverse-reverse:hover {\n  background-color: #7e57c2; }\n  .tile-deep-purple-inverse-reverse:hover .tile-content, .tile-deep-purple-inverse-reverse:hover .title {\n    color: #eceff1; }\n\n.tile-deep-purple-inverse-reverse .ink {\n  background-color: #4527a0; }\n\n.tile-indigo {\n  background-color: #5c6bc0; }\n  .tile-indigo .tile-content, .tile-indigo .title {\n    color: #eceff1; }\n  .tile-indigo:hover, .tile-indigo:active, .tile-indigo.active {\n    background-color: #3949ab; }\n  .tile-indigo:focus {\n    background-color: #303f9f; }\n  .tile-indigo:disabled, .tile-indigo.disabled, .tile-indigo[disabled] {\n    background-color: #b3b3b3; }\n  .tile-indigo .ink {\n    background-color: #283593; }\n\n.tile-indigo-reverse {\n  background-color: #5c6bc0; }\n  .tile-indigo-reverse:hover {\n    background-color: #eceff1; }\n    .tile-indigo-reverse:hover .tile-content, .tile-indigo-reverse:hover .title {\n      color: #5c6bc0; }\n\n.tile-indigo-inverse {\n  background-color: #eceff1; }\n  .tile-indigo-inverse .tile-content, .tile-indigo-inverse .title {\n    color: #5c6bc0; }\n\n.tile-indigo-inverse-reverse .tile-content, .tile-indigo-inverse-reverse .title {\n  color: #5c6bc0; }\n\n.tile-indigo-inverse-reverse:hover {\n  background-color: #5c6bc0; }\n  .tile-indigo-inverse-reverse:hover .tile-content, .tile-indigo-inverse-reverse:hover .title {\n    color: #eceff1; }\n\n.tile-indigo-inverse-reverse .ink {\n  background-color: #283593; }\n\n.tile-blue {\n  background-color: #738ffe; }\n  .tile-blue .tile-content, .tile-blue .title {\n    color: #eceff1; }\n  .tile-blue:hover, .tile-blue:active, .tile-blue.active {\n    background-color: #4e6cef; }\n  .tile-blue:focus {\n    background-color: #455ede; }\n  .tile-blue:disabled, .tile-blue.disabled, .tile-blue[disabled] {\n    background-color: #b3b3b3; }\n  .tile-blue .ink {\n    background-color: #3b50ce; }\n\n.tile-blue-reverse {\n  background-color: #738ffe; }\n  .tile-blue-reverse:hover {\n    background-color: #eceff1; }\n    .tile-blue-reverse:hover .tile-content, .tile-blue-reverse:hover .title {\n      color: #738ffe; }\n\n.tile-blue-inverse {\n  background-color: #eceff1; }\n  .tile-blue-inverse .tile-content, .tile-blue-inverse .title {\n    color: #738ffe; }\n\n.tile-blue-inverse-reverse .tile-content, .tile-blue-inverse-reverse .title {\n  color: #738ffe; }\n\n.tile-blue-inverse-reverse:hover {\n  background-color: #738ffe; }\n  .tile-blue-inverse-reverse:hover .tile-content, .tile-blue-inverse-reverse:hover .title {\n    color: #eceff1; }\n\n.tile-blue-inverse-reverse .ink {\n  background-color: #3b50ce; }\n\n.tile-light-blue {\n  background-color: #29b6f6; }\n  .tile-light-blue .tile-content, .tile-light-blue .title {\n    color: #eceff1; }\n  .tile-light-blue:hover, .tile-light-blue:active, .tile-light-blue.active {\n    background-color: #039be5; }\n  .tile-light-blue:focus {\n    background-color: #0288d1; }\n  .tile-light-blue:disabled, .tile-light-blue.disabled, .tile-light-blue[disabled] {\n    background-color: #b3b3b3; }\n  .tile-light-blue .ink {\n    background-color: #0277bd; }\n\n.tile-light-blue-reverse {\n  background-color: #29b6f6; }\n  .tile-light-blue-reverse:hover {\n    background-color: #eceff1; }\n    .tile-light-blue-reverse:hover .tile-content, .tile-light-blue-reverse:hover .title {\n      color: #29b6f6; }\n\n.tile-light-blue-inverse {\n  background-color: #eceff1; }\n  .tile-light-blue-inverse .tile-content, .tile-light-blue-inverse .title {\n    color: #29b6f6; }\n\n.tile-light-blue-inverse-reverse .tile-content, .tile-light-blue-inverse-reverse .title {\n  color: #29b6f6; }\n\n.tile-light-blue-inverse-reverse:hover {\n  background-color: #29b6f6; }\n  .tile-light-blue-inverse-reverse:hover .tile-content, .tile-light-blue-inverse-reverse:hover .title {\n    color: #eceff1; }\n\n.tile-light-blue-inverse-reverse .ink {\n  background-color: #0277bd; }\n\n.tile-cyan {\n  background-color: #26c6da; }\n  .tile-cyan .tile-content, .tile-cyan .title {\n    color: #eceff1; }\n  .tile-cyan:hover, .tile-cyan:active, .tile-cyan.active {\n    background-color: #00acc1; }\n  .tile-cyan:focus {\n    background-color: #0097a7; }\n  .tile-cyan:disabled, .tile-cyan.disabled, .tile-cyan[disabled] {\n    background-color: #b3b3b3; }\n  .tile-cyan .ink {\n    background-color: #00838f; }\n\n.tile-cyan-reverse {\n  background-color: #26c6da; }\n  .tile-cyan-reverse:hover {\n    background-color: #eceff1; }\n    .tile-cyan-reverse:hover .tile-content, .tile-cyan-reverse:hover .title {\n      color: #26c6da; }\n\n.tile-cyan-inverse {\n  background-color: #eceff1; }\n  .tile-cyan-inverse .tile-content, .tile-cyan-inverse .title {\n    color: #26c6da; }\n\n.tile-cyan-inverse-reverse .tile-content, .tile-cyan-inverse-reverse .title {\n  color: #26c6da; }\n\n.tile-cyan-inverse-reverse:hover {\n  background-color: #26c6da; }\n  .tile-cyan-inverse-reverse:hover .tile-content, .tile-cyan-inverse-reverse:hover .title {\n    color: #eceff1; }\n\n.tile-cyan-inverse-reverse .ink {\n  background-color: #00838f; }\n\n.tile-teal {\n  background-color: #26a69a; }\n  .tile-teal .tile-content, .tile-teal .title {\n    color: #eceff1; }\n  .tile-teal:hover, .tile-teal:active, .tile-teal.active {\n    background-color: #00897b; }\n  .tile-teal:focus {\n    background-color: #00796b; }\n  .tile-teal:disabled, .tile-teal.disabled, .tile-teal[disabled] {\n    background-color: #b3b3b3; }\n  .tile-teal .ink {\n    background-color: #00695c; }\n\n.tile-teal-reverse {\n  background-color: #26a69a; }\n  .tile-teal-reverse:hover {\n    background-color: #eceff1; }\n    .tile-teal-reverse:hover .tile-content, .tile-teal-reverse:hover .title {\n      color: #26a69a; }\n\n.tile-teal-inverse {\n  background-color: #eceff1; }\n  .tile-teal-inverse .tile-content, .tile-teal-inverse .title {\n    color: #26a69a; }\n\n.tile-teal-inverse-reverse .tile-content, .tile-teal-inverse-reverse .title {\n  color: #26a69a; }\n\n.tile-teal-inverse-reverse:hover {\n  background-color: #26a69a; }\n  .tile-teal-inverse-reverse:hover .tile-content, .tile-teal-inverse-reverse:hover .title {\n    color: #eceff1; }\n\n.tile-teal-inverse-reverse .ink {\n  background-color: #00695c; }\n\n.tile-green {\n  background-color: #2baf2b; }\n  .tile-green .tile-content, .tile-green .title {\n    color: #eceff1; }\n  .tile-green:hover, .tile-green:active, .tile-green.active {\n    background-color: #0a8f08; }\n  .tile-green:focus {\n    background-color: #0a7e07; }\n  .tile-green:disabled, .tile-green.disabled, .tile-green[disabled] {\n    background-color: #b3b3b3; }\n  .tile-green .ink {\n    background-color: #0a7e07; }\n\n.tile-green-reverse {\n  background-color: #2baf2b; }\n  .tile-green-reverse:hover {\n    background-color: #eceff1; }\n    .tile-green-reverse:hover .tile-content, .tile-green-reverse:hover .title {\n      color: #2baf2b; }\n\n.tile-green-inverse {\n  background-color: #eceff1; }\n  .tile-green-inverse .tile-content, .tile-green-inverse .title {\n    color: #2baf2b; }\n\n.tile-green-inverse-reverse .tile-content, .tile-green-inverse-reverse .title {\n  color: #2baf2b; }\n\n.tile-green-inverse-reverse:hover {\n  background-color: #2baf2b; }\n  .tile-green-inverse-reverse:hover .tile-content, .tile-green-inverse-reverse:hover .title {\n    color: #eceff1; }\n\n.tile-green-inverse-reverse .ink {\n  background-color: #0a7e07; }\n\n.tile-light-green {\n  background-color: #9ccc65; }\n  .tile-light-green .tile-content, .tile-light-green .title {\n    color: #eceff1; }\n  .tile-light-green:hover, .tile-light-green:active, .tile-light-green.active {\n    background-color: #7cb342; }\n  .tile-light-green:focus {\n    background-color: #689f38; }\n  .tile-light-green:disabled, .tile-light-green.disabled, .tile-light-green[disabled] {\n    background-color: #b3b3b3; }\n  .tile-light-green .ink {\n    background-color: #558b2f; }\n\n.tile-light-green-reverse {\n  background-color: #9ccc65; }\n  .tile-light-green-reverse:hover {\n    background-color: #eceff1; }\n    .tile-light-green-reverse:hover .tile-content, .tile-light-green-reverse:hover .title {\n      color: #9ccc65; }\n\n.tile-light-green-inverse {\n  background-color: #eceff1; }\n  .tile-light-green-inverse .tile-content, .tile-light-green-inverse .title {\n    color: #9ccc65; }\n\n.tile-light-green-inverse-reverse .tile-content, .tile-light-green-inverse-reverse .title {\n  color: #9ccc65; }\n\n.tile-light-green-inverse-reverse:hover {\n  background-color: #9ccc65; }\n  .tile-light-green-inverse-reverse:hover .tile-content, .tile-light-green-inverse-reverse:hover .title {\n    color: #eceff1; }\n\n.tile-light-green-inverse-reverse .ink {\n  background-color: #558b2f; }\n\n.tile-lime {\n  background-color: #d4e157; }\n  .tile-lime .tile-content, .tile-lime .title {\n    color: #eceff1; }\n  .tile-lime:hover, .tile-lime:active, .tile-lime.active {\n    background-color: #c0ca33; }\n  .tile-lime:focus {\n    background-color: #afb42b; }\n  .tile-lime:disabled, .tile-lime.disabled, .tile-lime[disabled] {\n    background-color: #b3b3b3; }\n  .tile-lime .ink {\n    background-color: #9e9d24; }\n\n.tile-lime-reverse {\n  background-color: #d4e157; }\n  .tile-lime-reverse:hover {\n    background-color: #eceff1; }\n    .tile-lime-reverse:hover .tile-content, .tile-lime-reverse:hover .title {\n      color: #d4e157; }\n\n.tile-lime-inverse {\n  background-color: #eceff1; }\n  .tile-lime-inverse .tile-content, .tile-lime-inverse .title {\n    color: #d4e157; }\n\n.tile-lime-inverse-reverse .tile-content, .tile-lime-inverse-reverse .title {\n  color: #d4e157; }\n\n.tile-lime-inverse-reverse:hover {\n  background-color: #d4e157; }\n  .tile-lime-inverse-reverse:hover .tile-content, .tile-lime-inverse-reverse:hover .title {\n    color: #eceff1; }\n\n.tile-lime-inverse-reverse .ink {\n  background-color: #9e9d24; }\n\n.tile-yellow {\n  background-color: #ffee58; }\n  .tile-yellow .tile-content, .tile-yellow .title {\n    color: #eceff1; }\n  .tile-yellow:hover, .tile-yellow:active, .tile-yellow.active {\n    background-color: #fdd835; }\n  .tile-yellow:focus {\n    background-color: #fbc02d; }\n  .tile-yellow:disabled, .tile-yellow.disabled, .tile-yellow[disabled] {\n    background-color: #b3b3b3; }\n  .tile-yellow .ink {\n    background-color: #f9a825; }\n\n.tile-yellow-reverse {\n  background-color: #ffee58; }\n  .tile-yellow-reverse:hover {\n    background-color: #eceff1; }\n    .tile-yellow-reverse:hover .tile-content, .tile-yellow-reverse:hover .title {\n      color: #ffee58; }\n\n.tile-yellow-inverse {\n  background-color: #eceff1; }\n  .tile-yellow-inverse .tile-content, .tile-yellow-inverse .title {\n    color: #ffee58; }\n\n.tile-yellow-inverse-reverse .tile-content, .tile-yellow-inverse-reverse .title {\n  color: #ffee58; }\n\n.tile-yellow-inverse-reverse:hover {\n  background-color: #ffee58; }\n  .tile-yellow-inverse-reverse:hover .tile-content, .tile-yellow-inverse-reverse:hover .title {\n    color: #eceff1; }\n\n.tile-yellow-inverse-reverse .ink {\n  background-color: #f9a825; }\n\n.tile-amber {\n  background-color: #ffca28; }\n  .tile-amber .tile-content, .tile-amber .title {\n    color: #eceff1; }\n  .tile-amber:hover, .tile-amber:active, .tile-amber.active {\n    background-color: #ffb300; }\n  .tile-amber:focus {\n    background-color: #ffa000; }\n  .tile-amber:disabled, .tile-amber.disabled, .tile-amber[disabled] {\n    background-color: #b3b3b3; }\n  .tile-amber .ink {\n    background-color: #ff8f00; }\n\n.tile-amber-reverse {\n  background-color: #ffca28; }\n  .tile-amber-reverse:hover {\n    background-color: #eceff1; }\n    .tile-amber-reverse:hover .tile-content, .tile-amber-reverse:hover .title {\n      color: #ffca28; }\n\n.tile-amber-inverse {\n  background-color: #eceff1; }\n  .tile-amber-inverse .tile-content, .tile-amber-inverse .title {\n    color: #ffca28; }\n\n.tile-amber-inverse-reverse .tile-content, .tile-amber-inverse-reverse .title {\n  color: #ffca28; }\n\n.tile-amber-inverse-reverse:hover {\n  background-color: #ffca28; }\n  .tile-amber-inverse-reverse:hover .tile-content, .tile-amber-inverse-reverse:hover .title {\n    color: #eceff1; }\n\n.tile-amber-inverse-reverse .ink {\n  background-color: #ff8f00; }\n\n.tile-orange {\n  background-color: #ffa726; }\n  .tile-orange .tile-content, .tile-orange .title {\n    color: #eceff1; }\n  .tile-orange:hover, .tile-orange:active, .tile-orange.active {\n    background-color: #fb8c00; }\n  .tile-orange:focus {\n    background-color: #f57c00; }\n  .tile-orange:disabled, .tile-orange.disabled, .tile-orange[disabled] {\n    background-color: #b3b3b3; }\n  .tile-orange .ink {\n    background-color: #ef6c00; }\n\n.tile-orange-reverse {\n  background-color: #ffa726; }\n  .tile-orange-reverse:hover {\n    background-color: #eceff1; }\n    .tile-orange-reverse:hover .tile-content, .tile-orange-reverse:hover .title {\n      color: #ffa726; }\n\n.tile-orange-inverse {\n  background-color: #eceff1; }\n  .tile-orange-inverse .tile-content, .tile-orange-inverse .title {\n    color: #ffa726; }\n\n.tile-orange-inverse-reverse .tile-content, .tile-orange-inverse-reverse .title {\n  color: #ffa726; }\n\n.tile-orange-inverse-reverse:hover {\n  background-color: #ffa726; }\n  .tile-orange-inverse-reverse:hover .tile-content, .tile-orange-inverse-reverse:hover .title {\n    color: #eceff1; }\n\n.tile-orange-inverse-reverse .ink {\n  background-color: #ef6c00; }\n\n.tile-deep-orange {\n  background-color: #ff7043; }\n  .tile-deep-orange .tile-content, .tile-deep-orange .title {\n    color: #eceff1; }\n  .tile-deep-orange:hover, .tile-deep-orange:active, .tile-deep-orange.active {\n    background-color: #f4511e; }\n  .tile-deep-orange:focus {\n    background-color: #e64a19; }\n  .tile-deep-orange:disabled, .tile-deep-orange.disabled, .tile-deep-orange[disabled] {\n    background-color: #b3b3b3; }\n  .tile-deep-orange .ink {\n    background-color: #d84315; }\n\n.tile-deep-orange-reverse {\n  background-color: #ff7043; }\n  .tile-deep-orange-reverse:hover {\n    background-color: #eceff1; }\n    .tile-deep-orange-reverse:hover .tile-content, .tile-deep-orange-reverse:hover .title {\n      color: #ff7043; }\n\n.tile-deep-orange-inverse {\n  background-color: #eceff1; }\n  .tile-deep-orange-inverse .tile-content, .tile-deep-orange-inverse .title {\n    color: #ff7043; }\n\n.tile-deep-orange-inverse-reverse .tile-content, .tile-deep-orange-inverse-reverse .title {\n  color: #ff7043; }\n\n.tile-deep-orange-inverse-reverse:hover {\n  background-color: #ff7043; }\n  .tile-deep-orange-inverse-reverse:hover .tile-content, .tile-deep-orange-inverse-reverse:hover .title {\n    color: #eceff1; }\n\n.tile-deep-orange-inverse-reverse .ink {\n  background-color: #d84315; }\n\n.tile-brown {\n  background-color: #8d6e63; }\n  .tile-brown .tile-content, .tile-brown .title {\n    color: #eceff1; }\n  .tile-brown:hover, .tile-brown:active, .tile-brown.active {\n    background-color: #6d4c41; }\n  .tile-brown:focus {\n    background-color: #5d4037; }\n  .tile-brown:disabled, .tile-brown.disabled, .tile-brown[disabled] {\n    background-color: #b3b3b3; }\n  .tile-brown .ink {\n    background-color: #4e342e; }\n\n.tile-brown-reverse {\n  background-color: #8d6e63; }\n  .tile-brown-reverse:hover {\n    background-color: #eceff1; }\n    .tile-brown-reverse:hover .tile-content, .tile-brown-reverse:hover .title {\n      color: #8d6e63; }\n\n.tile-brown-inverse {\n  background-color: #eceff1; }\n  .tile-brown-inverse .tile-content, .tile-brown-inverse .title {\n    color: #8d6e63; }\n\n.tile-brown-inverse-reverse .tile-content, .tile-brown-inverse-reverse .title {\n  color: #8d6e63; }\n\n.tile-brown-inverse-reverse:hover {\n  background-color: #8d6e63; }\n  .tile-brown-inverse-reverse:hover .tile-content, .tile-brown-inverse-reverse:hover .title {\n    color: #eceff1; }\n\n.tile-brown-inverse-reverse .ink {\n  background-color: #4e342e; }\n\n/*-- Tiles size --------------------------------------- */\n.tile {\n  width: 100%;\n  height: 270px;\n  display: block; }\n  .tile .content-wrapper .tile-content {\n    height: 270px;\n    padding: 20px; }\n    .tile .content-wrapper .tile-content .tile-img {\n      height: 180px; }\n    .tile .content-wrapper .tile-content .tile-img-bg {\n      width: 550px;\n      height: 270px;\n      margin-left: -20px;\n      margin-top: -20px; }\n    .tile .content-wrapper .tile-content .tile-holder-sm {\n      bottom: 20px;\n      left: 20px; }\n", ""]);

// exports


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__html_home_html__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__html_home_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__html_home_html__);


var self = {};

self.render = function () {
  document.body.innerHTML = __WEBPACK_IMPORTED_MODULE_0__html_home_html___default.a;
};

/* harmony default export */ __webpack_exports__["a"] = (self);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<div class=\"container\">\r\n  <div class=\"row\">\r\n    <div class=\"col-6\">\r\n      <a class=\"tile tile-orange\" href=\"#light\">\r\n        <span class=\"content-wrapper\">\r\n          <span class=\"tile-content\">\r\n            <span class=\"tile-img\">\r\n              <img src=\"" + __webpack_require__(16) + "\" />\r\n            </span>\r\n            <span class=\"tile-holder tile-holder-sm\"> \r\n              <span>Light</span>\r\n            </span>\r\n          </span>\r\n        </span>\r\n      </a>\r\n    </div>\r\n    <div class=\"col-6\">\r\n      <a class=\"tile tile-teal\" href=\"#blinds\">\r\n        <span class=\"content-wrapper\">\r\n          <span class=\"tile-content\">\r\n            <span class=\"tile-img\">\r\n              <img src=\"" + __webpack_require__(17) + "\" />\r\n            </span> \r\n            <span class=\"tile-holder tile-holder-sm\">\r\n              <span>Blinds</span>\r\n            </span>\r\n          </span>\r\n        </span>\r\n      </a>\r\n    </div>\r\n  </div>\r\n</div>";

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__html_light_html__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__html_light_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__html_light_html__);


var self = {};

self.render = function () {
  document.body.innerHTML = __WEBPACK_IMPORTED_MODULE_0__html_light_html___default.a;
};

/* harmony default export */ __webpack_exports__["a"] = (self);

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <div class=\"row\">\r\n    <div class=\"col-12\">\r\n      <h1>Light</h1>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <label class=\"switch-light switch-dido\">\r\n      <input type=\"checkbox\">\r\n      <span class=\"col-2 columns float-left\">\r\n        <span>Off</span><span>On</span><a></a>\r\n      </span>\r\n      <strong class=\"col-8\">Basement</strong>\r\n    </label>\r\n  </div>\r\n  <div class=\"row\">\r\n    <label class=\"switch-light switch-dido\">\r\n      <input type=\"checkbox\">\r\n      <span class=\"col-2 columns float-left\">\r\n        <span>Off</span><span>On</span><a></a>\r\n      </span>\r\n      <strong class=\"col-8\">Kitchen Sink</strong>\r\n    </label>\r\n  </div>\r\n</div>";

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__html_blinds_html__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__html_blinds_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__html_blinds_html__);


var self = {};

self.render = function () {
  document.body.innerHTML = __WEBPACK_IMPORTED_MODULE_0__html_blinds_html___default.a;
};

/* harmony default export */ __webpack_exports__["a"] = (self);

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = "<div>BLINDS RENDERED</div>";

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(23);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./switch.scss", function() {
		var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./switch.scss");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "/* Dido Theme\n */\n.switch-toggle.switch-dido,\n.switch-light.switch-dido > span {\n  background-color: #464747;\n  border-radius: 1px;\n  box-shadow: inset rgba(0, 0, 0, 0.1) 0 1px 0;\n  color: #fff;\n  text-transform: uppercase;\n  width: 100px; }\n\n.switch-dido label {\n  color: #fff; }\n\n.switch-dido > span span {\n  opacity: 0;\n  transition: all 0.1s; }\n  .switch-dido > span span:first-of-type {\n    opacity: 1; }\n\n.switch-dido > span span,\n.switch-dido label {\n  cursor: pointer;\n  padding: 3px;\n  font-weight: bold;\n  font-size: 85%;\n  line-height: size(30)size(4.5); }\n\n.switch-dido a {\n  outline: none !important;\n  background-color: #26a69a;\n  border-radius: 1px;\n  box-shadow: inset rgba(255, 255, 255, 0.2) 0 1px 0, inset rgba(0, 0, 0, 0.3) 0 -1px 0; }\n\n/* Selected ON switch-light\n*/\n.switch-dido.switch-light input:checked ~ span a {\n  background-color: #ffa726; }\n\n.switch-dido.switch-light input:checked ~ span span:first-of-type {\n  opacity: 0; }\n\n.switch-dido.switch-light input:checked ~ span span:last-of-type {\n  opacity: 1; }\n", ""]);

// exports


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map