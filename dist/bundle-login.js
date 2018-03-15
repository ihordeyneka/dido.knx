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
/******/ 	return __webpack_require__(__webpack_require__.s = 120);
/******/ })
/************************************************************************/
/******/ ({

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_simplegrid_simple_grid_scss__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_simplegrid_simple_grid_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_simplegrid_simple_grid_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scss_main_scss__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scss_main_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__scss_main_scss__);




/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(17);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(3)(content, options);

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

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Lato:400,300,300italic,400italic,700,700italic);", ""]);

// module
exports.push([module.i, "html,\nbody {\n  height: 100%;\n  width: 100%;\n  margin: 0;\n  padding: 0;\n  left: 0;\n  top: 0;\n  font-size: 100%; }\n\n* {\n  font-family: \"Lato\", Helvetica, sans-serif;\n  color: #333447;\n  line-height: 1.5; }\n\nh1 {\n  font-size: 2.5rem; }\n\nh2 {\n  font-size: 2rem; }\n\nh3 {\n  font-size: 1.375rem; }\n\nh4 {\n  font-size: 1.125rem; }\n\nh5 {\n  font-size: 1rem; }\n\nh6 {\n  font-size: 0.875rem; }\n\np {\n  font-size: 1.125rem;\n  font-weight: 200;\n  line-height: 1.8; }\n\n.font-light {\n  font-weight: 300; }\n\n.font-regular {\n  font-weight: 400; }\n\n.font-heavy {\n  font-weight: 700; }\n\n.left {\n  text-align: left; }\n\n.right {\n  text-align: right; }\n\n.center {\n  text-align: center;\n  margin-left: auto;\n  margin-right: auto; }\n\n.justify {\n  text-align: justify; }\n\n.hidden-sm {\n  display: none; }\n\n.container {\n  width: 90%;\n  margin-left: auto;\n  margin-right: auto; }\n  @media only screen and (min-width: 33.75em) {\n    .container {\n      width: 80%; } }\n  @media only screen and (min-width: 60em) {\n    .container {\n      width: 75%;\n      max-width: 60rem; } }\n\n.row {\n  position: relative;\n  width: 100%; }\n\n.row [class^=\"col\"] {\n  float: left;\n  margin: 0.5rem 2%;\n  min-height: 0.125rem; }\n\n.row::after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n.col-1,\n.col-2,\n.col-3,\n.col-4,\n.col-5,\n.col-6,\n.col-7,\n.col-8,\n.col-9,\n.col-10,\n.col-11,\n.col-12 {\n  width: 96%; }\n\n.col-1-sm {\n  width: 4.33333%; }\n\n.col-2-sm {\n  width: 12.66667%; }\n\n.col-3-sm {\n  width: 21%; }\n\n.col-4-sm {\n  width: 29.33333%; }\n\n.col-5-sm {\n  width: 37.66667%; }\n\n.col-6-sm {\n  width: 46%; }\n\n.col-7-sm {\n  width: 54.33333%; }\n\n.col-8-sm {\n  width: 62.66667%; }\n\n.col-9-sm {\n  width: 71%; }\n\n.col-10-sm {\n  width: 79.33333%; }\n\n.col-11-sm {\n  width: 87.66667%; }\n\n.col-12-sm {\n  width: 96%; }\n\n@media only screen and (min-width: 45em) {\n  .col-1 {\n    width: 4.33333%; }\n  .col-2 {\n    width: 12.66667%; }\n  .col-3 {\n    width: 21%; }\n  .col-4 {\n    width: 29.33333%; }\n  .col-5 {\n    width: 37.66667%; }\n  .col-6 {\n    width: 46%; }\n  .col-7 {\n    width: 54.33333%; }\n  .col-8 {\n    width: 62.66667%; }\n  .col-9 {\n    width: 71%; }\n  .col-10 {\n    width: 79.33333%; }\n  .col-11 {\n    width: 87.66667%; }\n  .col-12 {\n    width: 96%; }\n  .hidden-sm {\n    display: block; } }\n", ""]);

// exports


/***/ }),

/***/ 18:
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

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(20);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(3)(content, options);

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

/***/ 2:
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

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "/* -- box model --------------------------------------- */\n*,\n*:after,\n*:before {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\n/* -- general ----------------------------------------- */\n.flex {\n  display: flex;\n  justify-content: space-between; }\n\n.title-back {\n  vertical-align: sub;\n  height: 50px; }\n\n/* -- form -------------------------------------------- */\nform.dido-form .row {\n  margin-bottom: 10px; }\n\nform.dido-form .nomargin {\n  margin: 0px !important; }\n\nform.dido-form label {\n  width: 100px;\n  display: inline-block;\n  font-size: 20px; }\n\nform.dido-form input {\n  width: calc(100% - 105px);\n  display: inline-block; }\n\nform.dido-form button {\n  width: 120px;\n  border: none;\n  color: #000;\n  background-color: #ffa726;\n  padding: 5px;\n  cursor: pointer;\n  font-size: 20px; }\n  form.dido-form button:hover, form.dido-form button:active, form.dido-form button.active {\n    background-color: #fb8c00; }\n\n/* -- loader -------------------------------------------*/\n.lds-hourglass {\n  display: inline-block;\n  position: relative;\n  width: 64px;\n  height: 64px; }\n\n.lds-hourglass:after {\n  content: \" \";\n  display: block;\n  border-radius: 50%;\n  width: 0;\n  height: 0;\n  margin: 8px;\n  box-sizing: border-box;\n  border: 32px solid #000;\n  border-color: #000 transparent #000 transparent;\n  animation: lds-hourglass 1.2s infinite; }\n\n@keyframes lds-hourglass {\n  0% {\n    transform: rotate(0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  50% {\n    transform: rotate(900deg);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  100% {\n    transform: rotate(1800deg); } }\n\n/* -- Tiles content ----------------------------------- */\n.tile .content-wrapper {\n  position: relative;\n  display: block;\n  top: 0;\n  width: 100%;\n  -webkit-transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);\n  -o-transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);\n  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1); }\n  .tile .content-wrapper .tile-content {\n    position: relative;\n    display: block;\n    overflow: hidden; }\n    .tile .content-wrapper .tile-content .tile-img {\n      position: relative;\n      display: block;\n      width: 100%;\n      margin: 0 auto;\n      background-repeat: no-repeat;\n      background-position: center center;\n      -webkit-background-size: contain;\n      -moz-background-size: contain;\n      -o-background-size: contain;\n      background-size: contain;\n      text-align: center; }\n      .tile .content-wrapper .tile-content .tile-img.tile-img-sm {\n        position: absolute;\n        margin: 0;\n        padding: 0;\n        display: block;\n        opacity: 0.3; }\n      .tile .content-wrapper .tile-content .tile-img.tile-img-bg {\n        position: absolute;\n        background-position: left top;\n        -webkit-background-size: cover;\n        -moz-background-size: cover;\n        -o-background-size: cover;\n        background-size: cover; }\n      .tile .content-wrapper .tile-content .tile-img img {\n        height: 100%; }\n    .tile .content-wrapper .tile-content .tile-holder {\n      position: relative;\n      display: block;\n      padding: 0; }\n      .tile .content-wrapper .tile-content .tile-holder.tile-holder-sm {\n        position: absolute;\n        margin: 0;\n        padding: 0; }\n      .tile .content-wrapper .tile-content .tile-holder span {\n        color: #000 !important;\n        font-weight: bold;\n        font-size: 24px; }\n\n/* -- Tiles color ------------------------------------- */\n.tile-red {\n  background-color: #e84e40; }\n  .tile-red .tile-content, .tile-red .title {\n    color: #eceff1; }\n  .tile-red:hover, .tile-red:active, .tile-red.active {\n    background-color: #dd191d; }\n  .tile-red:focus {\n    background-color: #d01716; }\n  .tile-red:disabled, .tile-red.disabled, .tile-red[disabled] {\n    background-color: #b3b3b3; }\n  .tile-red .ink {\n    background-color: #c41411; }\n\n.tile-red-reverse {\n  background-color: #e84e40; }\n  .tile-red-reverse:hover {\n    background-color: #eceff1; }\n    .tile-red-reverse:hover .tile-content, .tile-red-reverse:hover .title {\n      color: #e84e40; }\n\n.tile-red-inverse {\n  background-color: #eceff1; }\n  .tile-red-inverse .tile-content, .tile-red-inverse .title {\n    color: #e84e40; }\n\n.tile-red-inverse-reverse .tile-content, .tile-red-inverse-reverse .title {\n  color: #e84e40; }\n\n.tile-red-inverse-reverse:hover {\n  background-color: #e84e40; }\n  .tile-red-inverse-reverse:hover .tile-content, .tile-red-inverse-reverse:hover .title {\n    color: #eceff1; }\n\n.tile-red-inverse-reverse .ink {\n  background-color: #c41411; }\n\n.tile-pink {\n  background-color: #ec407a; }\n  .tile-pink .tile-content, .tile-pink .title {\n    color: #eceff1; }\n  .tile-pink:hover, .tile-pink:active, .tile-pink.active {\n    background-color: #d81b60; }\n  .tile-pink:focus {\n    background-color: #c2185b; }\n  .tile-pink:disabled, .tile-pink.disabled, .tile-pink[disabled] {\n    background-color: #b3b3b3; }\n  .tile-pink .ink {\n    background-color: #ad1457; }\n\n.tile-pink-reverse {\n  background-color: #ec407a; }\n  .tile-pink-reverse:hover {\n    background-color: #eceff1; }\n    .tile-pink-reverse:hover .tile-content, .tile-pink-reverse:hover .title {\n      color: #ec407a; }\n\n.tile-pink-inverse {\n  background-color: #eceff1; }\n  .tile-pink-inverse .tile-content, .tile-pink-inverse .title {\n    color: #ec407a; }\n\n.tile-pink-inverse-reverse .tile-content, .tile-pink-inverse-reverse .title {\n  color: #ec407a; }\n\n.tile-pink-inverse-reverse:hover {\n  background-color: #ec407a; }\n  .tile-pink-inverse-reverse:hover .tile-content, .tile-pink-inverse-reverse:hover .title {\n    color: #eceff1; }\n\n.tile-pink-inverse-reverse .ink {\n  background-color: #ad1457; }\n\n.tile-purple {\n  background-color: #ab47bc; }\n  .tile-purple .tile-content, .tile-purple .title {\n    color: #eceff1; }\n  .tile-purple:hover, .tile-purple:active, .tile-purple.active {\n    background-color: #8e24aa; }\n  .tile-purple:focus {\n    background-color: #7b1fa2; }\n  .tile-purple:disabled, .tile-purple.disabled, .tile-purple[disabled] {\n    background-color: #b3b3b3; }\n  .tile-purple .ink {\n    background-color: #6a1b9a; }\n\n.tile-purple-reverse {\n  background-color: #ab47bc; }\n  .tile-purple-reverse:hover {\n    background-color: #eceff1; }\n    .tile-purple-reverse:hover .tile-content, .tile-purple-reverse:hover .title {\n      color: #ab47bc; }\n\n.tile-purple-inverse {\n  background-color: #eceff1; }\n  .tile-purple-inverse .tile-content, .tile-purple-inverse .title {\n    color: #ab47bc; }\n\n.tile-purple-inverse-reverse .tile-content, .tile-purple-inverse-reverse .title {\n  color: #ab47bc; }\n\n.tile-purple-inverse-reverse:hover {\n  background-color: #ab47bc; }\n  .tile-purple-inverse-reverse:hover .tile-content, .tile-purple-inverse-reverse:hover .title {\n    color: #eceff1; }\n\n.tile-purple-inverse-reverse .ink {\n  background-color: #6a1b9a; }\n\n.tile-deep-purple {\n  background-color: #7e57c2; }\n  .tile-deep-purple .tile-content, .tile-deep-purple .title {\n    color: #eceff1; }\n  .tile-deep-purple:hover, .tile-deep-purple:active, .tile-deep-purple.active {\n    background-color: #5e35b1; }\n  .tile-deep-purple:focus {\n    background-color: #512da8; }\n  .tile-deep-purple:disabled, .tile-deep-purple.disabled, .tile-deep-purple[disabled] {\n    background-color: #b3b3b3; }\n  .tile-deep-purple .ink {\n    background-color: #4527a0; }\n\n.tile-deep-purple-reverse {\n  background-color: #7e57c2; }\n  .tile-deep-purple-reverse:hover {\n    background-color: #eceff1; }\n    .tile-deep-purple-reverse:hover .tile-content, .tile-deep-purple-reverse:hover .title {\n      color: #7e57c2; }\n\n.tile-deep-purple-inverse {\n  background-color: #eceff1; }\n  .tile-deep-purple-inverse .tile-content, .tile-deep-purple-inverse .title {\n    color: #7e57c2; }\n\n.tile-deep-purple-inverse-reverse .tile-content, .tile-deep-purple-inverse-reverse .title {\n  color: #7e57c2; }\n\n.tile-deep-purple-inverse-reverse:hover {\n  background-color: #7e57c2; }\n  .tile-deep-purple-inverse-reverse:hover .tile-content, .tile-deep-purple-inverse-reverse:hover .title {\n    color: #eceff1; }\n\n.tile-deep-purple-inverse-reverse .ink {\n  background-color: #4527a0; }\n\n.tile-indigo {\n  background-color: #5c6bc0; }\n  .tile-indigo .tile-content, .tile-indigo .title {\n    color: #eceff1; }\n  .tile-indigo:hover, .tile-indigo:active, .tile-indigo.active {\n    background-color: #3949ab; }\n  .tile-indigo:focus {\n    background-color: #303f9f; }\n  .tile-indigo:disabled, .tile-indigo.disabled, .tile-indigo[disabled] {\n    background-color: #b3b3b3; }\n  .tile-indigo .ink {\n    background-color: #283593; }\n\n.tile-indigo-reverse {\n  background-color: #5c6bc0; }\n  .tile-indigo-reverse:hover {\n    background-color: #eceff1; }\n    .tile-indigo-reverse:hover .tile-content, .tile-indigo-reverse:hover .title {\n      color: #5c6bc0; }\n\n.tile-indigo-inverse {\n  background-color: #eceff1; }\n  .tile-indigo-inverse .tile-content, .tile-indigo-inverse .title {\n    color: #5c6bc0; }\n\n.tile-indigo-inverse-reverse .tile-content, .tile-indigo-inverse-reverse .title {\n  color: #5c6bc0; }\n\n.tile-indigo-inverse-reverse:hover {\n  background-color: #5c6bc0; }\n  .tile-indigo-inverse-reverse:hover .tile-content, .tile-indigo-inverse-reverse:hover .title {\n    color: #eceff1; }\n\n.tile-indigo-inverse-reverse .ink {\n  background-color: #283593; }\n\n.tile-blue {\n  background-color: #738ffe; }\n  .tile-blue .tile-content, .tile-blue .title {\n    color: #eceff1; }\n  .tile-blue:hover, .tile-blue:active, .tile-blue.active {\n    background-color: #4e6cef; }\n  .tile-blue:focus {\n    background-color: #455ede; }\n  .tile-blue:disabled, .tile-blue.disabled, .tile-blue[disabled] {\n    background-color: #b3b3b3; }\n  .tile-blue .ink {\n    background-color: #3b50ce; }\n\n.tile-blue-reverse {\n  background-color: #738ffe; }\n  .tile-blue-reverse:hover {\n    background-color: #eceff1; }\n    .tile-blue-reverse:hover .tile-content, .tile-blue-reverse:hover .title {\n      color: #738ffe; }\n\n.tile-blue-inverse {\n  background-color: #eceff1; }\n  .tile-blue-inverse .tile-content, .tile-blue-inverse .title {\n    color: #738ffe; }\n\n.tile-blue-inverse-reverse .tile-content, .tile-blue-inverse-reverse .title {\n  color: #738ffe; }\n\n.tile-blue-inverse-reverse:hover {\n  background-color: #738ffe; }\n  .tile-blue-inverse-reverse:hover .tile-content, .tile-blue-inverse-reverse:hover .title {\n    color: #eceff1; }\n\n.tile-blue-inverse-reverse .ink {\n  background-color: #3b50ce; }\n\n.tile-light-blue {\n  background-color: #29b6f6; }\n  .tile-light-blue .tile-content, .tile-light-blue .title {\n    color: #eceff1; }\n  .tile-light-blue:hover, .tile-light-blue:active, .tile-light-blue.active {\n    background-color: #039be5; }\n  .tile-light-blue:focus {\n    background-color: #0288d1; }\n  .tile-light-blue:disabled, .tile-light-blue.disabled, .tile-light-blue[disabled] {\n    background-color: #b3b3b3; }\n  .tile-light-blue .ink {\n    background-color: #0277bd; }\n\n.tile-light-blue-reverse {\n  background-color: #29b6f6; }\n  .tile-light-blue-reverse:hover {\n    background-color: #eceff1; }\n    .tile-light-blue-reverse:hover .tile-content, .tile-light-blue-reverse:hover .title {\n      color: #29b6f6; }\n\n.tile-light-blue-inverse {\n  background-color: #eceff1; }\n  .tile-light-blue-inverse .tile-content, .tile-light-blue-inverse .title {\n    color: #29b6f6; }\n\n.tile-light-blue-inverse-reverse .tile-content, .tile-light-blue-inverse-reverse .title {\n  color: #29b6f6; }\n\n.tile-light-blue-inverse-reverse:hover {\n  background-color: #29b6f6; }\n  .tile-light-blue-inverse-reverse:hover .tile-content, .tile-light-blue-inverse-reverse:hover .title {\n    color: #eceff1; }\n\n.tile-light-blue-inverse-reverse .ink {\n  background-color: #0277bd; }\n\n.tile-cyan {\n  background-color: #26c6da; }\n  .tile-cyan .tile-content, .tile-cyan .title {\n    color: #eceff1; }\n  .tile-cyan:hover, .tile-cyan:active, .tile-cyan.active {\n    background-color: #00acc1; }\n  .tile-cyan:focus {\n    background-color: #0097a7; }\n  .tile-cyan:disabled, .tile-cyan.disabled, .tile-cyan[disabled] {\n    background-color: #b3b3b3; }\n  .tile-cyan .ink {\n    background-color: #00838f; }\n\n.tile-cyan-reverse {\n  background-color: #26c6da; }\n  .tile-cyan-reverse:hover {\n    background-color: #eceff1; }\n    .tile-cyan-reverse:hover .tile-content, .tile-cyan-reverse:hover .title {\n      color: #26c6da; }\n\n.tile-cyan-inverse {\n  background-color: #eceff1; }\n  .tile-cyan-inverse .tile-content, .tile-cyan-inverse .title {\n    color: #26c6da; }\n\n.tile-cyan-inverse-reverse .tile-content, .tile-cyan-inverse-reverse .title {\n  color: #26c6da; }\n\n.tile-cyan-inverse-reverse:hover {\n  background-color: #26c6da; }\n  .tile-cyan-inverse-reverse:hover .tile-content, .tile-cyan-inverse-reverse:hover .title {\n    color: #eceff1; }\n\n.tile-cyan-inverse-reverse .ink {\n  background-color: #00838f; }\n\n.tile-teal {\n  background-color: #26a69a; }\n  .tile-teal .tile-content, .tile-teal .title {\n    color: #eceff1; }\n  .tile-teal:hover, .tile-teal:active, .tile-teal.active {\n    background-color: #00897b; }\n  .tile-teal:focus {\n    background-color: #00796b; }\n  .tile-teal:disabled, .tile-teal.disabled, .tile-teal[disabled] {\n    background-color: #b3b3b3; }\n  .tile-teal .ink {\n    background-color: #00695c; }\n\n.tile-teal-reverse {\n  background-color: #26a69a; }\n  .tile-teal-reverse:hover {\n    background-color: #eceff1; }\n    .tile-teal-reverse:hover .tile-content, .tile-teal-reverse:hover .title {\n      color: #26a69a; }\n\n.tile-teal-inverse {\n  background-color: #eceff1; }\n  .tile-teal-inverse .tile-content, .tile-teal-inverse .title {\n    color: #26a69a; }\n\n.tile-teal-inverse-reverse .tile-content, .tile-teal-inverse-reverse .title {\n  color: #26a69a; }\n\n.tile-teal-inverse-reverse:hover {\n  background-color: #26a69a; }\n  .tile-teal-inverse-reverse:hover .tile-content, .tile-teal-inverse-reverse:hover .title {\n    color: #eceff1; }\n\n.tile-teal-inverse-reverse .ink {\n  background-color: #00695c; }\n\n.tile-green {\n  background-color: #2baf2b; }\n  .tile-green .tile-content, .tile-green .title {\n    color: #eceff1; }\n  .tile-green:hover, .tile-green:active, .tile-green.active {\n    background-color: #0a8f08; }\n  .tile-green:focus {\n    background-color: #0a7e07; }\n  .tile-green:disabled, .tile-green.disabled, .tile-green[disabled] {\n    background-color: #b3b3b3; }\n  .tile-green .ink {\n    background-color: #0a7e07; }\n\n.tile-green-reverse {\n  background-color: #2baf2b; }\n  .tile-green-reverse:hover {\n    background-color: #eceff1; }\n    .tile-green-reverse:hover .tile-content, .tile-green-reverse:hover .title {\n      color: #2baf2b; }\n\n.tile-green-inverse {\n  background-color: #eceff1; }\n  .tile-green-inverse .tile-content, .tile-green-inverse .title {\n    color: #2baf2b; }\n\n.tile-green-inverse-reverse .tile-content, .tile-green-inverse-reverse .title {\n  color: #2baf2b; }\n\n.tile-green-inverse-reverse:hover {\n  background-color: #2baf2b; }\n  .tile-green-inverse-reverse:hover .tile-content, .tile-green-inverse-reverse:hover .title {\n    color: #eceff1; }\n\n.tile-green-inverse-reverse .ink {\n  background-color: #0a7e07; }\n\n.tile-light-green {\n  background-color: #9ccc65; }\n  .tile-light-green .tile-content, .tile-light-green .title {\n    color: #eceff1; }\n  .tile-light-green:hover, .tile-light-green:active, .tile-light-green.active {\n    background-color: #7cb342; }\n  .tile-light-green:focus {\n    background-color: #689f38; }\n  .tile-light-green:disabled, .tile-light-green.disabled, .tile-light-green[disabled] {\n    background-color: #b3b3b3; }\n  .tile-light-green .ink {\n    background-color: #558b2f; }\n\n.tile-light-green-reverse {\n  background-color: #9ccc65; }\n  .tile-light-green-reverse:hover {\n    background-color: #eceff1; }\n    .tile-light-green-reverse:hover .tile-content, .tile-light-green-reverse:hover .title {\n      color: #9ccc65; }\n\n.tile-light-green-inverse {\n  background-color: #eceff1; }\n  .tile-light-green-inverse .tile-content, .tile-light-green-inverse .title {\n    color: #9ccc65; }\n\n.tile-light-green-inverse-reverse .tile-content, .tile-light-green-inverse-reverse .title {\n  color: #9ccc65; }\n\n.tile-light-green-inverse-reverse:hover {\n  background-color: #9ccc65; }\n  .tile-light-green-inverse-reverse:hover .tile-content, .tile-light-green-inverse-reverse:hover .title {\n    color: #eceff1; }\n\n.tile-light-green-inverse-reverse .ink {\n  background-color: #558b2f; }\n\n.tile-lime {\n  background-color: #d4e157; }\n  .tile-lime .tile-content, .tile-lime .title {\n    color: #eceff1; }\n  .tile-lime:hover, .tile-lime:active, .tile-lime.active {\n    background-color: #c0ca33; }\n  .tile-lime:focus {\n    background-color: #afb42b; }\n  .tile-lime:disabled, .tile-lime.disabled, .tile-lime[disabled] {\n    background-color: #b3b3b3; }\n  .tile-lime .ink {\n    background-color: #9e9d24; }\n\n.tile-lime-reverse {\n  background-color: #d4e157; }\n  .tile-lime-reverse:hover {\n    background-color: #eceff1; }\n    .tile-lime-reverse:hover .tile-content, .tile-lime-reverse:hover .title {\n      color: #d4e157; }\n\n.tile-lime-inverse {\n  background-color: #eceff1; }\n  .tile-lime-inverse .tile-content, .tile-lime-inverse .title {\n    color: #d4e157; }\n\n.tile-lime-inverse-reverse .tile-content, .tile-lime-inverse-reverse .title {\n  color: #d4e157; }\n\n.tile-lime-inverse-reverse:hover {\n  background-color: #d4e157; }\n  .tile-lime-inverse-reverse:hover .tile-content, .tile-lime-inverse-reverse:hover .title {\n    color: #eceff1; }\n\n.tile-lime-inverse-reverse .ink {\n  background-color: #9e9d24; }\n\n.tile-yellow {\n  background-color: #ffee58; }\n  .tile-yellow .tile-content, .tile-yellow .title {\n    color: #eceff1; }\n  .tile-yellow:hover, .tile-yellow:active, .tile-yellow.active {\n    background-color: #fdd835; }\n  .tile-yellow:focus {\n    background-color: #fbc02d; }\n  .tile-yellow:disabled, .tile-yellow.disabled, .tile-yellow[disabled] {\n    background-color: #b3b3b3; }\n  .tile-yellow .ink {\n    background-color: #f9a825; }\n\n.tile-yellow-reverse {\n  background-color: #ffee58; }\n  .tile-yellow-reverse:hover {\n    background-color: #eceff1; }\n    .tile-yellow-reverse:hover .tile-content, .tile-yellow-reverse:hover .title {\n      color: #ffee58; }\n\n.tile-yellow-inverse {\n  background-color: #eceff1; }\n  .tile-yellow-inverse .tile-content, .tile-yellow-inverse .title {\n    color: #ffee58; }\n\n.tile-yellow-inverse-reverse .tile-content, .tile-yellow-inverse-reverse .title {\n  color: #ffee58; }\n\n.tile-yellow-inverse-reverse:hover {\n  background-color: #ffee58; }\n  .tile-yellow-inverse-reverse:hover .tile-content, .tile-yellow-inverse-reverse:hover .title {\n    color: #eceff1; }\n\n.tile-yellow-inverse-reverse .ink {\n  background-color: #f9a825; }\n\n.tile-amber {\n  background-color: #ffca28; }\n  .tile-amber .tile-content, .tile-amber .title {\n    color: #eceff1; }\n  .tile-amber:hover, .tile-amber:active, .tile-amber.active {\n    background-color: #ffb300; }\n  .tile-amber:focus {\n    background-color: #ffa000; }\n  .tile-amber:disabled, .tile-amber.disabled, .tile-amber[disabled] {\n    background-color: #b3b3b3; }\n  .tile-amber .ink {\n    background-color: #ff8f00; }\n\n.tile-amber-reverse {\n  background-color: #ffca28; }\n  .tile-amber-reverse:hover {\n    background-color: #eceff1; }\n    .tile-amber-reverse:hover .tile-content, .tile-amber-reverse:hover .title {\n      color: #ffca28; }\n\n.tile-amber-inverse {\n  background-color: #eceff1; }\n  .tile-amber-inverse .tile-content, .tile-amber-inverse .title {\n    color: #ffca28; }\n\n.tile-amber-inverse-reverse .tile-content, .tile-amber-inverse-reverse .title {\n  color: #ffca28; }\n\n.tile-amber-inverse-reverse:hover {\n  background-color: #ffca28; }\n  .tile-amber-inverse-reverse:hover .tile-content, .tile-amber-inverse-reverse:hover .title {\n    color: #eceff1; }\n\n.tile-amber-inverse-reverse .ink {\n  background-color: #ff8f00; }\n\n.tile-orange {\n  background-color: #ffa726; }\n  .tile-orange .tile-content, .tile-orange .title {\n    color: #eceff1; }\n  .tile-orange:hover, .tile-orange:active, .tile-orange.active {\n    background-color: #fb8c00; }\n  .tile-orange:focus {\n    background-color: #f57c00; }\n  .tile-orange:disabled, .tile-orange.disabled, .tile-orange[disabled] {\n    background-color: #b3b3b3; }\n  .tile-orange .ink {\n    background-color: #ef6c00; }\n\n.tile-orange-reverse {\n  background-color: #ffa726; }\n  .tile-orange-reverse:hover {\n    background-color: #eceff1; }\n    .tile-orange-reverse:hover .tile-content, .tile-orange-reverse:hover .title {\n      color: #ffa726; }\n\n.tile-orange-inverse {\n  background-color: #eceff1; }\n  .tile-orange-inverse .tile-content, .tile-orange-inverse .title {\n    color: #ffa726; }\n\n.tile-orange-inverse-reverse .tile-content, .tile-orange-inverse-reverse .title {\n  color: #ffa726; }\n\n.tile-orange-inverse-reverse:hover {\n  background-color: #ffa726; }\n  .tile-orange-inverse-reverse:hover .tile-content, .tile-orange-inverse-reverse:hover .title {\n    color: #eceff1; }\n\n.tile-orange-inverse-reverse .ink {\n  background-color: #ef6c00; }\n\n.tile-deep-orange {\n  background-color: #ff7043; }\n  .tile-deep-orange .tile-content, .tile-deep-orange .title {\n    color: #eceff1; }\n  .tile-deep-orange:hover, .tile-deep-orange:active, .tile-deep-orange.active {\n    background-color: #f4511e; }\n  .tile-deep-orange:focus {\n    background-color: #e64a19; }\n  .tile-deep-orange:disabled, .tile-deep-orange.disabled, .tile-deep-orange[disabled] {\n    background-color: #b3b3b3; }\n  .tile-deep-orange .ink {\n    background-color: #d84315; }\n\n.tile-deep-orange-reverse {\n  background-color: #ff7043; }\n  .tile-deep-orange-reverse:hover {\n    background-color: #eceff1; }\n    .tile-deep-orange-reverse:hover .tile-content, .tile-deep-orange-reverse:hover .title {\n      color: #ff7043; }\n\n.tile-deep-orange-inverse {\n  background-color: #eceff1; }\n  .tile-deep-orange-inverse .tile-content, .tile-deep-orange-inverse .title {\n    color: #ff7043; }\n\n.tile-deep-orange-inverse-reverse .tile-content, .tile-deep-orange-inverse-reverse .title {\n  color: #ff7043; }\n\n.tile-deep-orange-inverse-reverse:hover {\n  background-color: #ff7043; }\n  .tile-deep-orange-inverse-reverse:hover .tile-content, .tile-deep-orange-inverse-reverse:hover .title {\n    color: #eceff1; }\n\n.tile-deep-orange-inverse-reverse .ink {\n  background-color: #d84315; }\n\n.tile-brown {\n  background-color: #8d6e63; }\n  .tile-brown .tile-content, .tile-brown .title {\n    color: #eceff1; }\n  .tile-brown:hover, .tile-brown:active, .tile-brown.active {\n    background-color: #6d4c41; }\n  .tile-brown:focus {\n    background-color: #5d4037; }\n  .tile-brown:disabled, .tile-brown.disabled, .tile-brown[disabled] {\n    background-color: #b3b3b3; }\n  .tile-brown .ink {\n    background-color: #4e342e; }\n\n.tile-brown-reverse {\n  background-color: #8d6e63; }\n  .tile-brown-reverse:hover {\n    background-color: #eceff1; }\n    .tile-brown-reverse:hover .tile-content, .tile-brown-reverse:hover .title {\n      color: #8d6e63; }\n\n.tile-brown-inverse {\n  background-color: #eceff1; }\n  .tile-brown-inverse .tile-content, .tile-brown-inverse .title {\n    color: #8d6e63; }\n\n.tile-brown-inverse-reverse .tile-content, .tile-brown-inverse-reverse .title {\n  color: #8d6e63; }\n\n.tile-brown-inverse-reverse:hover {\n  background-color: #8d6e63; }\n  .tile-brown-inverse-reverse:hover .tile-content, .tile-brown-inverse-reverse:hover .title {\n    color: #eceff1; }\n\n.tile-brown-inverse-reverse .ink {\n  background-color: #4e342e; }\n\n/*-- Tiles size --------------------------------------- */\n.tile {\n  width: 100%;\n  height: 270px;\n  display: block; }\n  .tile .content-wrapper .tile-content {\n    height: 270px;\n    padding: 20px; }\n    .tile .content-wrapper .tile-content .tile-img {\n      height: 180px; }\n    .tile .content-wrapper .tile-content .tile-img-bg {\n      width: 550px;\n      height: 270px;\n      margin-left: -20px;\n      margin-top: -20px; }\n    .tile .content-wrapper .tile-content .tile-holder-sm {\n      bottom: 20px;\n      left: 20px; }\n", ""]);

// exports


/***/ }),

/***/ 3:
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

var	fixUrls = __webpack_require__(18);

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


/***/ })

/******/ });
//# sourceMappingURL=bundle-login.js.map