"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _window = _interopRequireWildcard(require("global/window"));

var _document = _interopRequireDefault(require("global/document"));

var _console = _interopRequireDefault(require("global/console"));

// Copyright (c) 2019 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/**
 * This file is copied from https://github.com/tsayen/dom-to-image
 * Modified by heshan0131 to allow loading external stylesheets and inline webfonts
 */
var util = newUtil();
var inliner = newInliner();
var fontFaces = newFontFaces();
var images = newImages(); // Default impl options

var defaultOptions = {
  // Default is to fail on error, no placeholder
  imagePlaceholder: undefined,
  // Default cache bust is false, it will use the cache
  cacheBust: false
};
var domtoimage = {
  toSvg: toSvg,
  toPng: toPng,
  toJpeg: toJpeg,
  toBlob: toBlob,
  toPixelData: toPixelData,
  impl: {
    fontFaces: fontFaces,
    images: images,
    util: util,
    inliner: inliner,
    options: {}
  }
};
/**
   * @param {Node} node - The DOM Node object to render
   * @param {Object} options - Rendering options
   * @param {Function} options.filter - Should return true if passed node should be included in the output
   *          (excluding node means excluding it's children as well). Not called on the root node.
   * @param {String} options.bgcolor - color for the background, any valid CSS color value.
   * @param {Number} options.width - width to be applied to node before rendering.
   * @param {Number} options.height - height to be applied to node before rendering.
   * @param {Object} options.style - an object whose properties to be copied to node's style before rendering.
   * @param {Number} options.quality - a Number between 0 and 1 indicating image quality (applicable to JPEG only),
              defaults to 1.0.
    * @param {String} options.imagePlaceholder - dataURL to use as a placeholder for failed images, default behaviour is to fail fast on images we can't fetch
    * @param {Boolean} options.cacheBust - set to true to cache bust by appending the time to the request url
    * @return {Promise} - A promise that is fulfilled with a SVG image data URL
    * */

function toSvg(node, options) {
  options = options || {};
  copyOptions(options);
  return Promise.resolve(node).then(function (nd) {
    return cloneNode(nd, options.filter, true);
  }).then(embedFonts).then(inlineImages).then(applyOptions).then(function (clone) {
    return makeSvgDataUri(clone, options.width || util.width(node), options.height || util.height(node));
  });

  function applyOptions(clone) {
    if (options.bgcolor) clone.style.backgroundColor = options.bgcolor;
    if (options.width) clone.style.width = "".concat(options.width, "px");
    if (options.height) clone.style.height = "".concat(options.height, "px");
    if (options.style) Object.keys(options.style).forEach(function (property) {
      clone.style[property] = options.style[property];
    });
    return clone;
  }
}
/**
 * @param {Node} node - The DOM Node object to render
 * @param {Object} options - Rendering options, @see {@link toSvg}
 * @return {Promise} - A promise that is fulfilled with a Uint8Array containing RGBA pixel data.
 * */


function toPixelData(node, options) {
  return draw(node, options || {}).then(function (canvas) {
    return canvas.getContext('2d').getImageData(0, 0, util.width(node), util.height(node)).data;
  });
}
/**
 * @param {Node} node - The DOM Node object to render
 * @param {Object} options - Rendering options, @see {@link toSvg}
 * @return {Promise} - A promise that is fulfilled with a PNG image data URL
 * */


function toPng(node, options) {
  return draw(node, options || {}).then(function (canvas) {
    return canvas.toDataURL();
  });
}
/**
 * @param {Node} node - The DOM Node object to render
 * @param {Object} options - Rendering options, @see {@link toSvg}
 * @return {Promise} - A promise that is fulfilled with a JPEG image data URL
 * */


function toJpeg(node, options) {
  options = options || {};
  return draw(node, options).then(function (canvas) {
    return canvas.toDataURL('image/jpeg', options.quality || 1.0);
  });
}
/**
 * @param {Node} node - The DOM Node object to render
 * @param {Object} options - Rendering options, @see {@link toSvg}
 * @return {Promise} - A promise that is fulfilled with a PNG image blob
 * */


function toBlob(node, options) {
  return draw(node, options || {}).then(util.canvasToBlob);
}

function copyOptions(options) {
  // Copy options to impl options for use in impl
  if (typeof options.imagePlaceholder === 'undefined') {
    domtoimage.impl.options.imagePlaceholder = defaultOptions.imagePlaceholder;
  } else {
    domtoimage.impl.options.imagePlaceholder = options.imagePlaceholder;
  }

  if (typeof options.cacheBust === 'undefined') {
    domtoimage.impl.options.cacheBust = defaultOptions.cacheBust;
  } else {
    domtoimage.impl.options.cacheBust = options.cacheBust;
  }
}

function draw(domNode, options) {
  return toSvg(domNode, options).then(util.makeImage).then(util.delay(100)).then(function (image) {
    var canvas = newCanvas(domNode);
    canvas.getContext('2d').drawImage(image, 0, 0);
    return canvas;
  });

  function newCanvas(dNode) {
    var canvas = _document.default.createElement('canvas');

    canvas.width = options.width || util.width(dNode);
    canvas.height = options.height || util.height(dNode);

    if (options.bgcolor) {
      var ctx = canvas.getContext('2d');
      ctx.fillStyle = options.bgcolor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    return canvas;
  }
}

function cloneNode(node, filter, root) {
  if (!root && filter && !filter(node)) {
    return Promise.resolve();
  }

  return Promise.resolve(node).then(makeNodeCopy).then(function (clone) {
    return cloneChildren(node, clone, filter);
  }).then(function (clone) {
    return processClone(node, clone);
  });

  function makeNodeCopy(nd) {
    if (nd instanceof _window.default.HTMLCanvasElement) {
      return util.makeImage(nd.toDataURL());
    }

    return nd.cloneNode(false);
  }

  function cloneChildren(original, clone, flt) {
    var children = original.childNodes;

    if (children.length === 0) {
      return Promise.resolve(clone);
    }

    return cloneChildrenInOrder(clone, util.asArray(children)).then(function () {
      return clone;
    });

    function cloneChildrenInOrder(parent, arrChildren) {
      var done = Promise.resolve();
      arrChildren.forEach(function (child) {
        done = done.then(function () {
          return cloneNode(child, flt);
        }).then(function (childClone) {
          if (childClone) parent.appendChild(childClone);
        });
      });
      return done;
    }
  }

  function processClone(original, clone) {
    if (!(clone instanceof _window.default.Element)) {
      return clone;
    }

    ;
    return Promise.resolve().then(cloneStyle).then(clonePseudoElements).then(copyUserInput).then(fixSvg).then(function () {
      return clone;
    });

    function cloneStyle() {
      var originalStyle = _window.default.getComputedStyle(original);

      copyStyle(originalStyle, clone.style);

      function copyStyle(source, target) {
        if (source.cssText) {
          target.cssText = source.cssText; // add additional copy of composite styles

          if (source.font) {
            target.font = source.font;
          }
        } else {
          copyProperties(source, target);
        }

        function copyProperties(sourceStyle, targetStyle) {
          var propertyKeys = util.asArray(sourceStyle);
          propertyKeys.forEach(function (name) {
            targetStyle.setProperty(name, sourceStyle.getPropertyValue(name), sourceStyle.getPropertyPriority(name));
          });
        }
      }
    }

    function clonePseudoElements() {
      [':before', ':after'].forEach(function (element) {
        return clonePseudoElement(element);
      });

      function clonePseudoElement(element) {
        var style = _window.default.getComputedStyle(original, element);

        var content = style.getPropertyValue('content');

        if (content === '' || content === 'none') {
          return;
        }

        var className = util.uid();
        clone.className = "".concat(clone.className, " ").concat(className);

        var styleElement = _document.default.createElement('style');

        styleElement.appendChild(formatPseudoElementStyle(className, element, style));
        clone.appendChild(styleElement);

        function formatPseudoElementStyle(cln, elm, stl) {
          var selector = ".".concat(cln, ":").concat(elm);
          var cssText = stl.cssText ? formatCssText(stl) : formatCssProperties(stl);
          return _document.default.createTextNode("".concat(selector, "{").concat(cssText, "}"));

          function formatCssText(stl1) {
            var cnt = stl1.getPropertyValue('content');
            return "".concat(stl.cssText, " content: ").concat(cnt, ";");
          }

          function formatCssProperties(stl2) {
            return "".concat(util.asArray(stl2).map(formatProperty).join('; '), ";");

            function formatProperty(name) {
              return "".concat(name, ":").concat(stl.getPropertyValue(name)).concat(stl.getPropertyPriority(name) ? ' !important' : '');
            }
          }
        }
      }
    }

    function copyUserInput() {
      if (original instanceof _window.default.HTMLTextAreaElement) clone.innerHTML = original.value;
      if (original instanceof _window.default.HTMLInputElement) clone.setAttribute('value', original.value);
    }

    function fixSvg() {
      if (!(clone instanceof _window.default.SVGElement)) return;
      clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      if (!(clone instanceof _window.default.SVGRectElement)) return;
      ['width', 'height'].forEach(function (attribute) {
        var value = clone.getAttribute(attribute);
        if (!value) return;
        clone.style.setProperty(attribute, value);
      });
    }
  }
}

function embedFonts(node) {
  return fontFaces.resolveAll().then(function (cssText) {
    var styleNode = _document.default.createElement('style');

    node.appendChild(styleNode);
    styleNode.appendChild(_document.default.createTextNode(cssText));
    return node;
  });
}

function inlineImages(node) {
  return images.inlineAll(node).then(function () {
    return node;
  });
}

function makeSvgDataUri(node, width, height) {
  return Promise.resolve(node).then(function (nd) {
    nd.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
    return new _window.default.XMLSerializer().serializeToString(nd);
  }).then(util.escapeXhtml).then(function (xhtml) {
    return "<foreignObject x=\"0\" y=\"0\" width=\"100%\" height=\"100%\">".concat(xhtml, "</foreignObject>");
  }).then(function (foreignObject) {
    return "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"".concat(width, "\" height=\"").concat(height, "\">").concat(foreignObject, "</svg>");
  }).then(function (svg) {
    return "data:image/svg+xml;charset=utf-8,".concat(svg);
  });
}

function newUtil() {
  return {
    escape: escape,
    parseExtension: parseExtension,
    mimeType: mimeType,
    dataAsUrl: dataAsUrl,
    isDataUrl: isDataUrl,
    isSrcAsDataUrl: isSrcAsDataUrl,
    canvasToBlob: canvasToBlob,
    resolveUrl: resolveUrl,
    getAndEncode: getAndEncode,
    uid: uid(),
    delay: delay,
    asArray: asArray,
    escapeXhtml: escapeXhtml,
    makeImage: makeImage,
    width: width,
    height: height
  };

  function mimes() {
    /*
            * Only WOFF and EOT mime types for fonts are 'real'
            * see http://www.iana.org/assignments/media-types/media-types.xhtml
            */
    var WOFF = 'application/font-woff';
    var JPEG = 'image/jpeg';
    return {
      woff: WOFF,
      woff2: WOFF,
      ttf: 'application/font-truetype',
      eot: 'application/vnd.ms-fontobject',
      png: 'image/png',
      jpg: JPEG,
      jpeg: JPEG,
      gif: 'image/gif',
      tiff: 'image/tiff',
      svg: 'image/svg+xml'
    };
  }

  function parseExtension(url) {
    var match = /\.([^\.\/]*?)$/g.exec(url);

    if (match) {
      return match[1];
    }

    return '';
  }

  function mimeType(url) {
    var extension = parseExtension(url).toLowerCase();
    return mimes()[extension] || '';
  }

  function isDataUrl(url) {
    return url.search(/^(data:)/) !== -1;
  }

  function isSrcAsDataUrl(text) {
    var DATA_URL_REGEX = /url\(['"]?(data:)([^'"]+?)['"]?\)/;
    return text.search(DATA_URL_REGEX) !== -1;
  }

  function cvToBlob(canvas) {
    return new Promise(function (resolve) {
      var binaryString = _window.default.atob(canvas.toDataURL().split(',')[1]);

      var length = binaryString.length;
      var binaryArray = new Uint8Array(length);

      for (var i = 0; i < length; i++) {
        binaryArray[i] = binaryString.charCodeAt(i);
      }

      resolve(new _window.default.Blob([binaryArray], {
        type: 'image/png'
      }));
    });
  }

  function canvasToBlob(canvas) {
    if (canvas.toBlob) return new Promise(function (resolve) {
      canvas.toBlob(resolve);
    });
    return cvToBlob(canvas);
  }

  function resolveUrl(url, baseUrl) {
    var doc = _document.default.implementation.createHTMLDocument();

    var base = doc.createElement('base');
    doc.head.appendChild(base);
    var a = doc.createElement('a');
    doc.body.appendChild(a);
    base.href = baseUrl;
    a.href = url;
    return a.href;
  }

  function fourRandomChars() {
    /* see http://stackoverflow.com/a/6248722/2519373 */
    return "0000".concat((Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
  }

  function uid() {
    var index = 0;
    return function () {
      return "u".concat(fourRandomChars()).concat(index++);
    };
  }

  function makeImage(uri) {
    return new Promise(function (resolve, reject) {
      var image = new _window.default.Image();

      image.onload = function () {
        resolve(image);
      };

      image.onerror = reject;
      image.src = uri;
    });
  }

  function getAndEncode(url) {
    var TIMEOUT = 30000;

    if (domtoimage.impl.options.cacheBust) {
      // Cache bypass so we dont have CORS issues with cached images
      // Source: https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache
      url += (/\?/.test(url) ? '&' : '?') + new Date().getTime();
    }

    return new Promise(function (resolve) {
      var request = new _window.XMLHttpRequest();
      request.onreadystatechange = done;
      request.ontimeout = timeout;
      request.responseType = 'blob';
      request.timeout = TIMEOUT;
      request.open('GET', url, true);
      request.send();
      var placeholder;

      if (domtoimage.impl.options.imagePlaceholder) {
        var split = domtoimage.impl.options.imagePlaceholder.split(/,/);

        if (split && split[1]) {
          placeholder = split[1];
        }
      }

      function done() {
        if (request.readyState !== 4) return;

        if (request.status !== 200) {
          if (placeholder) {
            resolve(placeholder);
          } else {
            fail("cannot fetch resource: ".concat(url, ", status: ").concat(request.status));
          }

          return;
        }

        var encoder = new _window.FileReader();

        encoder.onloadend = function () {
          var content = encoder.result.split(/,/)[1];
          resolve(content);
        };

        encoder.readAsDataURL(request.response);
      }

      function timeout() {
        if (placeholder) {
          resolve(placeholder);
        } else {
          fail("timeout of ".concat(TIMEOUT, "ms occured while fetching resource: ").concat(url));
        }
      }

      function fail(message) {
        _console.default.error(message);

        resolve('');
      }
    });
  }

  function dataAsUrl(content, type) {
    return "data:".concat(type, ";base64,").concat(content);
  }

  function escape(string) {
    return string.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1');
  }

  function delay(ms) {
    return function (arg) {
      return new Promise(function (resolve) {
        (0, _window.setTimeout)(function () {
          resolve(arg);
        }, ms);
      });
    };
  }

  function asArray(arrayLike) {
    var array = [];
    var length = arrayLike.length;

    for (var i = 0; i < length; i++) {
      array.push(arrayLike[i]);
    }

    return array;
  }

  function escapeXhtml(string) {
    return string.replace(/#/g, '%23').replace(/\n/g, '%0A');
  }

  function width(node) {
    var leftBorder = px(node, 'border-left-width');
    var rightBorder = px(node, 'border-right-width');
    return node.scrollWidth + leftBorder + rightBorder;
  }

  function height(node) {
    var topBorder = px(node, 'border-top-width');
    var bottomBorder = px(node, 'border-bottom-width');
    return node.scrollHeight + topBorder + bottomBorder;
  }

  function px(node, styleProperty) {
    var value = _window.default.getComputedStyle(node).getPropertyValue(styleProperty);

    return parseFloat(value.replace('px', ''));
  }
}

function newInliner() {
  var URL_REGEX = /url\(['"]?([^'"]+?)['"]?\)/g;
  return {
    inlineAll: inlineAll,
    shouldProcess: shouldProcess,
    impl: {
      readUrls: readUrls,
      inline: inline
    }
  };

  function shouldProcess(string) {
    return string.search(URL_REGEX) !== -1;
  }

  function readUrls(string) {
    var result = [];
    var match;

    while ((match = URL_REGEX.exec(string)) !== null) {
      result.push(match[1]);
    }

    return result.filter(function (url) {
      return !util.isDataUrl(url);
    });
  }

  function inline(string, url, baseUrl, get) {
    return Promise.resolve(url).then(function (ul) {
      return baseUrl ? util.resolveUrl(ul, baseUrl) : ul;
    }).then(get || util.getAndEncode).then(function (data) {
      return util.dataAsUrl(data, util.mimeType(url));
    }).then(function (dataUrl) {
      return string.replace(urlAsRegex(url), "$1".concat(dataUrl, "$3"));
    });

    function urlAsRegex(url0) {
      return new RegExp("(url\\(['\"]?)(".concat(util.escape(url0), ")(['\"]?\\))"), 'g');
    }
  }

  function inlineAll(string, baseUrl, get) {
    if (nothingToInline() || util.isSrcAsDataUrl(string)) {
      return Promise.resolve(string);
    }

    return Promise.resolve(string).then(readUrls).then(function (urls) {
      var done = Promise.resolve(string);
      urls.forEach(function (url) {
        done = done.then(function (str) {
          return inline(str, url, baseUrl, get);
        });
      });
      return done;
    });

    function nothingToInline() {
      return !shouldProcess(string);
    }
  }
}

function newFontFaces() {
  return {
    resolveAll: resolveAll,
    impl: {
      readAll: readAll
    }
  };

  function resolveAll() {
    return readAll(_document.default).then(function (webFonts) {
      return Promise.all(webFonts.map(function (webFont) {
        return webFont.resolve();
      }));
    }).then(function (cssStrings) {
      return cssStrings.join('\n');
    });
  }

  function readAll() {
    return Promise.resolve(util.asArray(_document.default.styleSheets)).then(loadExternalStyleSheets).then(getCssRules).then(selectWebFontRules).then(function (rules) {
      return rules.map(newWebFont);
    });

    function selectWebFontRules(cssRules) {
      return cssRules.filter(function (rule) {
        return rule.type === _window.default.CSSRule.FONT_FACE_RULE;
      }).filter(function (rule) {
        return inliner.shouldProcess(rule.style.getPropertyValue('src'));
      });
    }

    function loadExternalStyleSheets(styleSheets) {
      return Promise.all(styleSheets.map(function (sheet) {
        if (sheet.href) {
          return (0, _window.fetch)(sheet.href, {
            credentials: 'omit'
          }).then(toText).then(setBaseHref(sheet.href)).then(toStyleSheet).catch(function (err) {
            // Handle any error that occurred in any of the previous
            // promises in the chain.
            _console.default.log(err);

            return sheet;
          });
        }

        return Promise.resolve(sheet);
      }));

      function toText(response) {
        return response.text();
      }

      function setBaseHref(base) {
        base = base.split('/');
        base.pop();
        base = base.join('/');
        return function (text) {
          return util.isSrcAsDataUrl(text) ? text : text.replace(/url\(['"]?([^'"]+?)['"]?\)/g, addBaseHrefToUrl);
        };

        function addBaseHrefToUrl(match, p1) {
          var url = /^http/i.test(p1) ? p1 : concatAndResolveUrl(base, p1);
          return "url('".concat(url, "')");
        } // Source: http://stackoverflow.com/a/2676231/3786856


        function concatAndResolveUrl(url, concat) {
          var url1 = url.split('/');
          var url2 = concat.split('/');
          var url3 = [];

          for (var i = 0, l = url1.length; i < l; i++) {
            if (url1[i] === '..') {
              url3.pop();
            } else if (url1[i] !== '.') {
              url3.push(url1[i]);
            }
          }

          for (var _i = 0, _l = url2.length; _i < _l; _i++) {
            if (url2[_i] === '..') {
              url3.pop();
            } else if (url2[_i] !== '.') {
              url3.push(url2[_i]);
            }
          }

          return url3.join('/');
        }
      }

      function toStyleSheet(text) {
        var doc = _document.default.implementation.createHTMLDocument('');

        var styleElement = _document.default.createElement('style');

        styleElement.textContent = text;
        doc.body.appendChild(styleElement);
        return styleElement.sheet;
      }
    }

    function getCssRules(styleSheets) {
      var cssRules = [];
      styleSheets.forEach(function (sheet) {
        // try...catch because browser may not able to enumerate rules for cross-domain sheets
        var rules;

        try {
          rules = sheet.rules || sheet.cssRules;
        } catch (e) {
          _console.default.error("'Can't read the css rules of: ".concat(sheet.href), e);

          return;
        }

        if (rules && (0, _typeof2.default)(rules) === 'object') {
          try {
            util.asArray(rules || []).forEach(cssRules.push.bind(cssRules));
          } catch (e) {
            _console.default.error("Error while reading CSS rules from ".concat(sheet.href), e);

            return;
          }
        } else {
          _console.default.error('getCssRules can not find cssRules');

          return;
        }
      });
      return cssRules;
    }

    function newWebFont(webFontRule) {
      return {
        resolve: function resolve() {
          var baseUrl = (webFontRule.parentStyleSheet || {}).href;
          return inliner.inlineAll(webFontRule.cssText, baseUrl);
        },
        src: function src() {
          return webFontRule.style.getPropertyValue('src');
        }
      };
    }
  }
}

function newImages() {
  return {
    inlineAll: inlineAll,
    impl: {
      newImage: newImage
    }
  };

  function newImage(element) {
    return {
      inline: inline
    };

    function inline(get) {
      if (util.isDataUrl(element.src)) {
        return Promise.resolve();
      }

      return Promise.resolve(element.src).then(get || util.getAndEncode).then(function (data) {
        return util.dataAsUrl(data, util.mimeType(element.src));
      }).then(function (dataUrl) {
        return new Promise(function (resolve, reject) {
          element.onload = resolve;
          element.onerror = reject;
          element.src = dataUrl;
        });
      });
    }
  }

  function inlineAll(node) {
    if (!(node instanceof Element)) {
      return Promise.resolve(node);
    }

    return inlineBackground(node).then(function () {
      if (node instanceof HTMLImageElement) {
        return newImage(node).inline();
      }

      return Promise.all(util.asArray(node.childNodes).map(function (child) {
        return inlineAll(child);
      }));
    });

    function inlineBackground(nd) {
      var background = nd.style.getPropertyValue('background');

      if (!background) {
        return Promise.resolve(nd);
      }

      return inliner.inlineAll(background).then(function (inlined) {
        nd.style.setProperty('background', inlined, nd.style.getPropertyPriority('background'));
      }).then(function () {
        return nd;
      });
    }
  }
}

var _default = domtoimage;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9kb20tdG8taW1hZ2UuanMiXSwibmFtZXMiOlsidXRpbCIsIm5ld1V0aWwiLCJpbmxpbmVyIiwibmV3SW5saW5lciIsImZvbnRGYWNlcyIsIm5ld0ZvbnRGYWNlcyIsImltYWdlcyIsIm5ld0ltYWdlcyIsImRlZmF1bHRPcHRpb25zIiwiaW1hZ2VQbGFjZWhvbGRlciIsInVuZGVmaW5lZCIsImNhY2hlQnVzdCIsImRvbXRvaW1hZ2UiLCJ0b1N2ZyIsInRvUG5nIiwidG9KcGVnIiwidG9CbG9iIiwidG9QaXhlbERhdGEiLCJpbXBsIiwib3B0aW9ucyIsIm5vZGUiLCJjb3B5T3B0aW9ucyIsIlByb21pc2UiLCJyZXNvbHZlIiwidGhlbiIsIm5kIiwiY2xvbmVOb2RlIiwiZmlsdGVyIiwiZW1iZWRGb250cyIsImlubGluZUltYWdlcyIsImFwcGx5T3B0aW9ucyIsImNsb25lIiwibWFrZVN2Z0RhdGFVcmkiLCJ3aWR0aCIsImhlaWdodCIsImJnY29sb3IiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwicHJvcGVydHkiLCJkcmF3IiwiY2FudmFzIiwiZ2V0Q29udGV4dCIsImdldEltYWdlRGF0YSIsImRhdGEiLCJ0b0RhdGFVUkwiLCJxdWFsaXR5IiwiY2FudmFzVG9CbG9iIiwiZG9tTm9kZSIsIm1ha2VJbWFnZSIsImRlbGF5IiwiaW1hZ2UiLCJuZXdDYW52YXMiLCJkcmF3SW1hZ2UiLCJkTm9kZSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImN0eCIsImZpbGxTdHlsZSIsImZpbGxSZWN0Iiwicm9vdCIsIm1ha2VOb2RlQ29weSIsImNsb25lQ2hpbGRyZW4iLCJwcm9jZXNzQ2xvbmUiLCJ3aW5kb3ciLCJIVE1MQ2FudmFzRWxlbWVudCIsIm9yaWdpbmFsIiwiZmx0IiwiY2hpbGRyZW4iLCJjaGlsZE5vZGVzIiwibGVuZ3RoIiwiY2xvbmVDaGlsZHJlbkluT3JkZXIiLCJhc0FycmF5IiwicGFyZW50IiwiYXJyQ2hpbGRyZW4iLCJkb25lIiwiY2hpbGQiLCJjaGlsZENsb25lIiwiYXBwZW5kQ2hpbGQiLCJFbGVtZW50IiwiY2xvbmVTdHlsZSIsImNsb25lUHNldWRvRWxlbWVudHMiLCJjb3B5VXNlcklucHV0IiwiZml4U3ZnIiwib3JpZ2luYWxTdHlsZSIsImdldENvbXB1dGVkU3R5bGUiLCJjb3B5U3R5bGUiLCJzb3VyY2UiLCJ0YXJnZXQiLCJjc3NUZXh0IiwiZm9udCIsImNvcHlQcm9wZXJ0aWVzIiwic291cmNlU3R5bGUiLCJ0YXJnZXRTdHlsZSIsInByb3BlcnR5S2V5cyIsIm5hbWUiLCJzZXRQcm9wZXJ0eSIsImdldFByb3BlcnR5VmFsdWUiLCJnZXRQcm9wZXJ0eVByaW9yaXR5IiwiZWxlbWVudCIsImNsb25lUHNldWRvRWxlbWVudCIsImNvbnRlbnQiLCJjbGFzc05hbWUiLCJ1aWQiLCJzdHlsZUVsZW1lbnQiLCJmb3JtYXRQc2V1ZG9FbGVtZW50U3R5bGUiLCJjbG4iLCJlbG0iLCJzdGwiLCJzZWxlY3RvciIsImZvcm1hdENzc1RleHQiLCJmb3JtYXRDc3NQcm9wZXJ0aWVzIiwiY3JlYXRlVGV4dE5vZGUiLCJzdGwxIiwiY250Iiwic3RsMiIsIm1hcCIsImZvcm1hdFByb3BlcnR5Iiwiam9pbiIsIkhUTUxUZXh0QXJlYUVsZW1lbnQiLCJpbm5lckhUTUwiLCJ2YWx1ZSIsIkhUTUxJbnB1dEVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJTVkdFbGVtZW50IiwiU1ZHUmVjdEVsZW1lbnQiLCJhdHRyaWJ1dGUiLCJnZXRBdHRyaWJ1dGUiLCJyZXNvbHZlQWxsIiwic3R5bGVOb2RlIiwiaW5saW5lQWxsIiwiWE1MU2VyaWFsaXplciIsInNlcmlhbGl6ZVRvU3RyaW5nIiwiZXNjYXBlWGh0bWwiLCJ4aHRtbCIsImZvcmVpZ25PYmplY3QiLCJzdmciLCJlc2NhcGUiLCJwYXJzZUV4dGVuc2lvbiIsIm1pbWVUeXBlIiwiZGF0YUFzVXJsIiwiaXNEYXRhVXJsIiwiaXNTcmNBc0RhdGFVcmwiLCJyZXNvbHZlVXJsIiwiZ2V0QW5kRW5jb2RlIiwibWltZXMiLCJXT0ZGIiwiSlBFRyIsIndvZmYiLCJ3b2ZmMiIsInR0ZiIsImVvdCIsInBuZyIsImpwZyIsImpwZWciLCJnaWYiLCJ0aWZmIiwidXJsIiwibWF0Y2giLCJleGVjIiwiZXh0ZW5zaW9uIiwidG9Mb3dlckNhc2UiLCJzZWFyY2giLCJ0ZXh0IiwiREFUQV9VUkxfUkVHRVgiLCJjdlRvQmxvYiIsImJpbmFyeVN0cmluZyIsImF0b2IiLCJzcGxpdCIsImJpbmFyeUFycmF5IiwiVWludDhBcnJheSIsImkiLCJjaGFyQ29kZUF0IiwiQmxvYiIsInR5cGUiLCJiYXNlVXJsIiwiZG9jIiwiaW1wbGVtZW50YXRpb24iLCJjcmVhdGVIVE1MRG9jdW1lbnQiLCJiYXNlIiwiaGVhZCIsImEiLCJib2R5IiwiaHJlZiIsImZvdXJSYW5kb21DaGFycyIsIk1hdGgiLCJyYW5kb20iLCJwb3ciLCJ0b1N0cmluZyIsInNsaWNlIiwiaW5kZXgiLCJ1cmkiLCJyZWplY3QiLCJJbWFnZSIsIm9ubG9hZCIsIm9uZXJyb3IiLCJzcmMiLCJUSU1FT1VUIiwidGVzdCIsIkRhdGUiLCJnZXRUaW1lIiwicmVxdWVzdCIsIlhNTEh0dHBSZXF1ZXN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwib250aW1lb3V0IiwidGltZW91dCIsInJlc3BvbnNlVHlwZSIsIm9wZW4iLCJzZW5kIiwicGxhY2Vob2xkZXIiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwiZmFpbCIsImVuY29kZXIiLCJGaWxlUmVhZGVyIiwib25sb2FkZW5kIiwicmVzdWx0IiwicmVhZEFzRGF0YVVSTCIsInJlc3BvbnNlIiwibWVzc2FnZSIsImNvbnNvbGUiLCJlcnJvciIsInN0cmluZyIsInJlcGxhY2UiLCJtcyIsImFyZyIsImFycmF5TGlrZSIsImFycmF5IiwicHVzaCIsImxlZnRCb3JkZXIiLCJweCIsInJpZ2h0Qm9yZGVyIiwic2Nyb2xsV2lkdGgiLCJ0b3BCb3JkZXIiLCJib3R0b21Cb3JkZXIiLCJzY3JvbGxIZWlnaHQiLCJzdHlsZVByb3BlcnR5IiwicGFyc2VGbG9hdCIsIlVSTF9SRUdFWCIsInNob3VsZFByb2Nlc3MiLCJyZWFkVXJscyIsImlubGluZSIsImdldCIsInVsIiwiZGF0YVVybCIsInVybEFzUmVnZXgiLCJ1cmwwIiwiUmVnRXhwIiwibm90aGluZ1RvSW5saW5lIiwidXJscyIsInN0ciIsInJlYWRBbGwiLCJ3ZWJGb250cyIsImFsbCIsIndlYkZvbnQiLCJjc3NTdHJpbmdzIiwic3R5bGVTaGVldHMiLCJsb2FkRXh0ZXJuYWxTdHlsZVNoZWV0cyIsImdldENzc1J1bGVzIiwic2VsZWN0V2ViRm9udFJ1bGVzIiwicnVsZXMiLCJuZXdXZWJGb250IiwiY3NzUnVsZXMiLCJydWxlIiwiQ1NTUnVsZSIsIkZPTlRfRkFDRV9SVUxFIiwic2hlZXQiLCJjcmVkZW50aWFscyIsInRvVGV4dCIsInNldEJhc2VIcmVmIiwidG9TdHlsZVNoZWV0IiwiY2F0Y2giLCJlcnIiLCJsb2ciLCJwb3AiLCJhZGRCYXNlSHJlZlRvVXJsIiwicDEiLCJjb25jYXRBbmRSZXNvbHZlVXJsIiwiY29uY2F0IiwidXJsMSIsInVybDIiLCJ1cmwzIiwibCIsInRleHRDb250ZW50IiwiZSIsImJpbmQiLCJ3ZWJGb250UnVsZSIsInBhcmVudFN0eWxlU2hlZXQiLCJuZXdJbWFnZSIsImlubGluZUJhY2tncm91bmQiLCJIVE1MSW1hZ2VFbGVtZW50IiwiYmFja2dyb3VuZCIsImlubGluZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUF5QkE7O0FBTUE7O0FBQ0E7O0FBaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBY0EsSUFBTUEsSUFBSSxHQUFHQyxPQUFPLEVBQXBCO0FBQ0EsSUFBTUMsT0FBTyxHQUFHQyxVQUFVLEVBQTFCO0FBQ0EsSUFBTUMsU0FBUyxHQUFHQyxZ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bUQsVUFBbEIsRUFBOEIrQyxHQUE5QixDQUFrQyxVQUFBeEMsS0FBSztBQUFBLGVBQUlzRCxTQUFTLENBQUN0RCxLQUFELENBQWI7QUFBQSxPQUF2QyxDQURLLENBQVA7QUFHRCxLQVBNLENBQVA7O0FBU0EsYUFBU3FOLGdCQUFULENBQTBCMVEsRUFBMUIsRUFBOEI7QUFDNUIsVUFBTTRRLFVBQVUsR0FBRzVRLEVBQUUsQ0FBQ1csS0FBSCxDQUFTK0QsZ0JBQVQsQ0FBMEIsWUFBMUIsQ0FBbkI7O0FBRUEsVUFBSSxDQUFDa00sVUFBTCxFQUFpQjtBQUNmLGVBQU8vUSxPQUFPLENBQUNDLE9BQVIsQ0FBZ0JFLEVBQWhCLENBQVA7QUFDRDs7QUFFRCxhQUFPdkIsT0FBTyxDQUNYa0ksU0FESSxDQUNNaUssVUFETixFQUVKN1EsSUFGSSxDQUVDLFVBQUE4USxPQUFPLEVBQUk7QUFDZjdRLFFBQUFBLEVBQUUsQ0FBQ1csS0FBSCxDQUFTOEQsV0FBVCxDQUNFLFlBREYsRUFFRW9NLE9BRkYsRUFHRTdRLEVBQUUsQ0FBQ1csS0FBSCxDQUFTZ0UsbUJBQVQsQ0FBNkIsWUFBN0IsQ0FIRjtBQUtELE9BUkksRUFTSjVFLElBVEksQ0FTQztBQUFBLGVBQU1DLEVBQU47QUFBQSxPQVRELENBQVA7QUFVRDtBQUNGO0FBQ0Y7O2VBRWNiLFUiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG4vKipcbiAqIFRoaXMgZmlsZSBpcyBjb3BpZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vdHNheWVuL2RvbS10by1pbWFnZVxuICogTW9kaWZpZWQgYnkgaGVzaGFuMDEzMSB0byBhbGxvdyBsb2FkaW5nIGV4dGVybmFsIHN0eWxlc2hlZXRzIGFuZCBpbmxpbmUgd2ViZm9udHNcbiAqL1xuXG5pbXBvcnQgd2luZG93LCB7XG4gIFhNTEh0dHBSZXF1ZXN0LFxuICBGaWxlUmVhZGVyLFxuICBzZXRUaW1lb3V0LFxuICBmZXRjaFxufSBmcm9tICdnbG9iYWwvd2luZG93JztcbmltcG9ydCBkb2N1bWVudCBmcm9tICdnbG9iYWwvZG9jdW1lbnQnO1xuaW1wb3J0IGNvbnNvbGUgZnJvbSAnZ2xvYmFsL2NvbnNvbGUnO1xuXG5jb25zdCB1dGlsID0gbmV3VXRpbCgpO1xuY29uc3QgaW5saW5lciA9IG5ld0lubGluZXIoKTtcbmNvbnN0IGZvbnRGYWNlcyA9IG5ld0ZvbnRGYWNlcygpO1xuY29uc3QgaW1hZ2VzID0gbmV3SW1hZ2VzKCk7XG4vLyBEZWZhdWx0IGltcGwgb3B0aW9uc1xuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XG4gIC8vIERlZmF1bHQgaXMgdG8gZmFpbCBvbiBlcnJvciwgbm8gcGxhY2Vob2xkZXJcbiAgaW1hZ2VQbGFjZWhvbGRlcjogdW5kZWZpbmVkLFxuICAvLyBEZWZhdWx0IGNhY2hlIGJ1c3QgaXMgZmFsc2UsIGl0IHdpbGwgdXNlIHRoZSBjYWNoZVxuICBjYWNoZUJ1c3Q6IGZhbHNlXG59O1xuXG5jb25zdCBkb210b2ltYWdlID0ge1xuICB0b1N2ZyxcbiAgdG9QbmcsXG4gIHRvSnBlZyxcbiAgdG9CbG9iLFxuICB0b1BpeGVsRGF0YSxcbiAgaW1wbDoge1xuICAgIGZvbnRGYWNlcyxcbiAgICBpbWFnZXMsXG4gICAgdXRpbCxcbiAgICBpbmxpbmVyLFxuICAgIG9wdGlvbnM6IHt9XG4gIH1cbn07XG5cbi8qKlxuICAgKiBAcGFyYW0ge05vZGV9IG5vZGUgLSBUaGUgRE9NIE5vZGUgb2JqZWN0IHRvIHJlbmRlclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFJlbmRlcmluZyBvcHRpb25zXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMuZmlsdGVyIC0gU2hvdWxkIHJldHVybiB0cnVlIGlmIHBhc3NlZCBub2RlIHNob3VsZCBiZSBpbmNsdWRlZCBpbiB0aGUgb3V0cHV0XG4gICAqICAgICAgICAgIChleGNsdWRpbmcgbm9kZSBtZWFucyBleGNsdWRpbmcgaXQncyBjaGlsZHJlbiBhcyB3ZWxsKS4gTm90IGNhbGxlZCBvbiB0aGUgcm9vdCBub2RlLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5iZ2NvbG9yIC0gY29sb3IgZm9yIHRoZSBiYWNrZ3JvdW5kLCBhbnkgdmFsaWQgQ1NTIGNvbG9yIHZhbHVlLlxuICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy53aWR0aCAtIHdpZHRoIHRvIGJlIGFwcGxpZWQgdG8gbm9kZSBiZWZvcmUgcmVuZGVyaW5nLlxuICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5oZWlnaHQgLSBoZWlnaHQgdG8gYmUgYXBwbGllZCB0byBub2RlIGJlZm9yZSByZW5kZXJpbmcuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnN0eWxlIC0gYW4gb2JqZWN0IHdob3NlIHByb3BlcnRpZXMgdG8gYmUgY29waWVkIHRvIG5vZGUncyBzdHlsZSBiZWZvcmUgcmVuZGVyaW5nLlxuICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5xdWFsaXR5IC0gYSBOdW1iZXIgYmV0d2VlbiAwIGFuZCAxIGluZGljYXRpbmcgaW1hZ2UgcXVhbGl0eSAoYXBwbGljYWJsZSB0byBKUEVHIG9ubHkpLFxuICAgICAgICAgICAgICBkZWZhdWx0cyB0byAxLjAuXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5pbWFnZVBsYWNlaG9sZGVyIC0gZGF0YVVSTCB0byB1c2UgYXMgYSBwbGFjZWhvbGRlciBmb3IgZmFpbGVkIGltYWdlcywgZGVmYXVsdCBiZWhhdmlvdXIgaXMgdG8gZmFpbCBmYXN0IG9uIGltYWdlcyB3ZSBjYW4ndCBmZXRjaFxuICAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmNhY2hlQnVzdCAtIHNldCB0byB0cnVlIHRvIGNhY2hlIGJ1c3QgYnkgYXBwZW5kaW5nIHRoZSB0aW1lIHRvIHRoZSByZXF1ZXN0IHVybFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSBBIHByb21pc2UgdGhhdCBpcyBmdWxmaWxsZWQgd2l0aCBhIFNWRyBpbWFnZSBkYXRhIFVSTFxuICAgICogKi9cbmZ1bmN0aW9uIHRvU3ZnKG5vZGUsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGNvcHlPcHRpb25zKG9wdGlvbnMpO1xuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5vZGUpXG4gICAgLnRoZW4obmQgPT4gY2xvbmVOb2RlKG5kLCBvcHRpb25zLmZpbHRlciwgdHJ1ZSkpXG4gICAgLnRoZW4oZW1iZWRGb250cylcbiAgICAudGhlbihpbmxpbmVJbWFnZXMpXG4gICAgLnRoZW4oYXBwbHlPcHRpb25zKVxuICAgIC50aGVuKGNsb25lID0+XG4gICAgICBtYWtlU3ZnRGF0YVVyaShcbiAgICAgICAgY2xvbmUsXG4gICAgICAgIG9wdGlvbnMud2lkdGggfHwgdXRpbC53aWR0aChub2RlKSxcbiAgICAgICAgb3B0aW9ucy5oZWlnaHQgfHwgdXRpbC5oZWlnaHQobm9kZSlcbiAgICAgIClcbiAgICApO1xuXG4gIGZ1bmN0aW9uIGFwcGx5T3B0aW9ucyhjbG9uZSkge1xuICAgIGlmIChvcHRpb25zLmJnY29sb3IpIGNsb25lLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IG9wdGlvbnMuYmdjb2xvcjtcblxuICAgIGlmIChvcHRpb25zLndpZHRoKSBjbG9uZS5zdHlsZS53aWR0aCA9IGAke29wdGlvbnMud2lkdGh9cHhgO1xuICAgIGlmIChvcHRpb25zLmhlaWdodCkgY2xvbmUuc3R5bGUuaGVpZ2h0ID0gYCR7b3B0aW9ucy5oZWlnaHR9cHhgO1xuXG4gICAgaWYgKG9wdGlvbnMuc3R5bGUpXG4gICAgICBPYmplY3Qua2V5cyhvcHRpb25zLnN0eWxlKS5mb3JFYWNoKChwcm9wZXJ0eSkgPT4ge1xuICAgICAgICBjbG9uZS5zdHlsZVtwcm9wZXJ0eV0gPSBvcHRpb25zLnN0eWxlW3Byb3BlcnR5XTtcbiAgICAgIH0pO1xuXG4gICAgcmV0dXJuIGNsb25lO1xuICB9XG59XG5cbi8qKlxuICogQHBhcmFtIHtOb2RlfSBub2RlIC0gVGhlIERPTSBOb2RlIG9iamVjdCB0byByZW5kZXJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gUmVuZGVyaW5nIG9wdGlvbnMsIEBzZWUge0BsaW5rIHRvU3ZnfVxuICogQHJldHVybiB7UHJvbWlzZX0gLSBBIHByb21pc2UgdGhhdCBpcyBmdWxmaWxsZWQgd2l0aCBhIFVpbnQ4QXJyYXkgY29udGFpbmluZyBSR0JBIHBpeGVsIGRhdGEuXG4gKiAqL1xuZnVuY3Rpb24gdG9QaXhlbERhdGEobm9kZSwgb3B0aW9ucykge1xuICByZXR1cm4gZHJhdyhub2RlLCBvcHRpb25zIHx8IHt9KS50aGVuKGNhbnZhcyA9PlxuICAgIGNhbnZhc1xuICAgICAgLmdldENvbnRleHQoJzJkJylcbiAgICAgIC5nZXRJbWFnZURhdGEoMCwgMCwgdXRpbC53aWR0aChub2RlKSwgdXRpbC5oZWlnaHQobm9kZSkpLmRhdGFcbiAgKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge05vZGV9IG5vZGUgLSBUaGUgRE9NIE5vZGUgb2JqZWN0IHRvIHJlbmRlclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBSZW5kZXJpbmcgb3B0aW9ucywgQHNlZSB7QGxpbmsgdG9Tdmd9XG4gKiBAcmV0dXJuIHtQcm9taXNlfSAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGZpbGxlZCB3aXRoIGEgUE5HIGltYWdlIGRhdGEgVVJMXG4gKiAqL1xuZnVuY3Rpb24gdG9Qbmcobm9kZSwgb3B0aW9ucykge1xuICByZXR1cm4gZHJhdyhub2RlLCBvcHRpb25zIHx8IHt9KS50aGVuKGNhbnZhcyA9PiBjYW52YXMudG9EYXRhVVJMKCkpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZSAtIFRoZSBET00gTm9kZSBvYmplY3QgdG8gcmVuZGVyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFJlbmRlcmluZyBvcHRpb25zLCBAc2VlIHtAbGluayB0b1N2Z31cbiAqIEByZXR1cm4ge1Byb21pc2V9IC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsZmlsbGVkIHdpdGggYSBKUEVHIGltYWdlIGRhdGEgVVJMXG4gKiAqL1xuZnVuY3Rpb24gdG9KcGVnKG5vZGUsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHJldHVybiBkcmF3KG5vZGUsIG9wdGlvbnMpLnRoZW4oY2FudmFzID0+IGNhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL2pwZWcnLCBvcHRpb25zLnF1YWxpdHkgfHwgMS4wKSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtOb2RlfSBub2RlIC0gVGhlIERPTSBOb2RlIG9iamVjdCB0byByZW5kZXJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gUmVuZGVyaW5nIG9wdGlvbnMsIEBzZWUge0BsaW5rIHRvU3ZnfVxuICogQHJldHVybiB7UHJvbWlzZX0gLSBBIHByb21pc2UgdGhhdCBpcyBmdWxmaWxsZWQgd2l0aCBhIFBORyBpbWFnZSBibG9iXG4gKiAqL1xuZnVuY3Rpb24gdG9CbG9iKG5vZGUsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIGRyYXcobm9kZSwgb3B0aW9ucyB8fCB7fSkudGhlbih1dGlsLmNhbnZhc1RvQmxvYik7XG59XG5cbmZ1bmN0aW9uIGNvcHlPcHRpb25zKG9wdGlvbnMpIHtcbiAgLy8gQ29weSBvcHRpb25zIHRvIGltcGwgb3B0aW9ucyBmb3IgdXNlIGluIGltcGxcbiAgaWYgKHR5cGVvZiBvcHRpb25zLmltYWdlUGxhY2Vob2xkZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgZG9tdG9pbWFnZS5pbXBsLm9wdGlvbnMuaW1hZ2VQbGFjZWhvbGRlciA9XG4gICAgICBkZWZhdWx0T3B0aW9ucy5pbWFnZVBsYWNlaG9sZGVyO1xuICB9IGVsc2Uge1xuICAgIGRvbXRvaW1hZ2UuaW1wbC5vcHRpb25zLmltYWdlUGxhY2Vob2xkZXIgPSBvcHRpb25zLmltYWdlUGxhY2Vob2xkZXI7XG4gIH1cblxuICBpZiAodHlwZW9mIG9wdGlvbnMuY2FjaGVCdXN0ID09PSAndW5kZWZpbmVkJykge1xuICAgIGRvbXRvaW1hZ2UuaW1wbC5vcHRpb25zLmNhY2hlQnVzdCA9IGRlZmF1bHRPcHRpb25zLmNhY2hlQnVzdDtcbiAgfSBlbHNlIHtcbiAgICBkb210b2ltYWdlLmltcGwub3B0aW9ucy5jYWNoZUJ1c3QgPSBvcHRpb25zLmNhY2hlQnVzdDtcbiAgfVxufVxuXG5mdW5jdGlvbiBkcmF3KGRvbU5vZGUsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIHRvU3ZnKGRvbU5vZGUsIG9wdGlvbnMpXG4gICAgLnRoZW4odXRpbC5tYWtlSW1hZ2UpXG4gICAgLnRoZW4odXRpbC5kZWxheSgxMDApKVxuICAgIC50aGVuKGltYWdlID0+IHtcbiAgICAgIGNvbnN0IGNhbnZhcyA9IG5ld0NhbnZhcyhkb21Ob2RlKTtcbiAgICAgIGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpLmRyYXdJbWFnZShpbWFnZSwgMCwgMCk7XG4gICAgICByZXR1cm4gY2FudmFzO1xuICAgIH0pO1xuXG4gIGZ1bmN0aW9uIG5ld0NhbnZhcyhkTm9kZSkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIGNhbnZhcy53aWR0aCA9IG9wdGlvbnMud2lkdGggfHwgdXRpbC53aWR0aChkTm9kZSk7XG4gICAgY2FudmFzLmhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0IHx8IHV0aWwuaGVpZ2h0KGROb2RlKTtcblxuICAgIGlmIChvcHRpb25zLmJnY29sb3IpIHtcbiAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IG9wdGlvbnMuYmdjb2xvcjtcbiAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIH1cblxuICAgIHJldHVybiBjYW52YXM7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2xvbmVOb2RlKG5vZGUsIGZpbHRlciwgcm9vdCkge1xuICBpZiAoIXJvb3QgJiYgZmlsdGVyICYmICFmaWx0ZXIobm9kZSkpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5vZGUpXG4gICAgLnRoZW4obWFrZU5vZGVDb3B5KVxuICAgIC50aGVuKGNsb25lID0+IGNsb25lQ2hpbGRyZW4obm9kZSwgY2xvbmUsIGZpbHRlcikpXG4gICAgLnRoZW4oY2xvbmUgPT4gcHJvY2Vzc0Nsb25lKG5vZGUsIGNsb25lKSk7XG5cbiAgZnVuY3Rpb24gbWFrZU5vZGVDb3B5KG5kKSB7XG4gICAgaWYgKG5kIGluc3RhbmNlb2Ygd2luZG93LkhUTUxDYW52YXNFbGVtZW50KSB7XG4gICAgICByZXR1cm4gdXRpbC5tYWtlSW1hZ2UobmQudG9EYXRhVVJMKCkpO1xuICAgIH1cbiAgICByZXR1cm4gbmQuY2xvbmVOb2RlKGZhbHNlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsb25lQ2hpbGRyZW4ob3JpZ2luYWwsIGNsb25lLCBmbHQpIHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IG9yaWdpbmFsLmNoaWxkTm9kZXM7XG4gICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjbG9uZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsb25lQ2hpbGRyZW5Jbk9yZGVyKGNsb25lLCB1dGlsLmFzQXJyYXkoY2hpbGRyZW4pKVxuICAgIC50aGVuKCgpID0+IGNsb25lKTtcblxuICAgIGZ1bmN0aW9uIGNsb25lQ2hpbGRyZW5Jbk9yZGVyKHBhcmVudCwgYXJyQ2hpbGRyZW4pIHtcbiAgICAgIGxldCBkb25lID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICBhcnJDaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgZG9uZSA9IGRvbmVcbiAgICAgICAgICAudGhlbigoKSA9PiBjbG9uZU5vZGUoY2hpbGQsIGZsdCkpXG4gICAgICAgICAgLnRoZW4oY2hpbGRDbG9uZSA9PiB7XG4gICAgICAgICAgICBpZiAoY2hpbGRDbG9uZSkgcGFyZW50LmFwcGVuZENoaWxkKGNoaWxkQ2xvbmUpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gZG9uZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwcm9jZXNzQ2xvbmUob3JpZ2luYWwsIGNsb25lKSB7XG4gICAgaWYgKCEoY2xvbmUgaW5zdGFuY2VvZiB3aW5kb3cuRWxlbWVudCkpIHtcbiAgICAgIHJldHVybiBjbG9uZVxuICAgIH07XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgIC50aGVuKGNsb25lU3R5bGUpXG4gICAgICAudGhlbihjbG9uZVBzZXVkb0VsZW1lbnRzKVxuICAgICAgLnRoZW4oY29weVVzZXJJbnB1dClcbiAgICAgIC50aGVuKGZpeFN2ZylcbiAgICAgIC50aGVuKCgpID0+IGNsb25lKTtcblxuICAgIGZ1bmN0aW9uIGNsb25lU3R5bGUoKSB7XG4gICAgICBjb25zdCBvcmlnaW5hbFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUob3JpZ2luYWwpO1xuICAgICAgY29weVN0eWxlKG9yaWdpbmFsU3R5bGUsIGNsb25lLnN0eWxlKTtcbiAgICAgIGZ1bmN0aW9uIGNvcHlTdHlsZShzb3VyY2UsIHRhcmdldCkge1xuICAgICAgICBpZiAoc291cmNlLmNzc1RleHQpIHtcbiAgICAgICAgICB0YXJnZXQuY3NzVGV4dCA9IHNvdXJjZS5jc3NUZXh0O1xuICAgICAgICAgIC8vIGFkZCBhZGRpdGlvbmFsIGNvcHkgb2YgY29tcG9zaXRlIHN0eWxlc1xuICAgICAgICAgIGlmIChzb3VyY2UuZm9udCkge1xuICAgICAgICAgICAgdGFyZ2V0LmZvbnQgPSBzb3VyY2UuZm9udDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29weVByb3BlcnRpZXMoc291cmNlLCB0YXJnZXQpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNvcHlQcm9wZXJ0aWVzKHNvdXJjZVN0eWxlLCB0YXJnZXRTdHlsZSkge1xuICAgICAgICAgIGNvbnN0IHByb3BlcnR5S2V5cyA9IHV0aWwuYXNBcnJheShzb3VyY2VTdHlsZSk7XG4gICAgICAgICAgcHJvcGVydHlLZXlzLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgICAgICB0YXJnZXRTdHlsZS5zZXRQcm9wZXJ0eShcbiAgICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgICAgc291cmNlU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShuYW1lKSxcbiAgICAgICAgICAgICAgc291cmNlU3R5bGUuZ2V0UHJvcGVydHlQcmlvcml0eShuYW1lKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb25lUHNldWRvRWxlbWVudHMoKSB7XG4gICAgICBbJzpiZWZvcmUnLCAnOmFmdGVyJ10uZm9yRWFjaChlbGVtZW50ID0+IGNsb25lUHNldWRvRWxlbWVudChlbGVtZW50KSk7XG5cbiAgICAgIGZ1bmN0aW9uIGNsb25lUHNldWRvRWxlbWVudChlbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUob3JpZ2luYWwsIGVsZW1lbnQpO1xuICAgICAgICBjb25zdCBjb250ZW50ID0gc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnY29udGVudCcpO1xuXG4gICAgICAgIGlmIChjb250ZW50ID09PSAnJyB8fCBjb250ZW50ID09PSAnbm9uZScpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjbGFzc05hbWUgPSB1dGlsLnVpZCgpO1xuICAgICAgICBjbG9uZS5jbGFzc05hbWUgPSBgJHtjbG9uZS5jbGFzc05hbWV9ICR7Y2xhc3NOYW1lfWA7XG4gICAgICAgIGNvbnN0IHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChcbiAgICAgICAgICBmb3JtYXRQc2V1ZG9FbGVtZW50U3R5bGUoY2xhc3NOYW1lLCBlbGVtZW50LCBzdHlsZSlcbiAgICAgICAgKTtcbiAgICAgICAgY2xvbmUuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcblxuICAgICAgICBmdW5jdGlvbiBmb3JtYXRQc2V1ZG9FbGVtZW50U3R5bGUoY2xuLCBlbG0sIHN0bCkge1xuICAgICAgICAgIGNvbnN0IHNlbGVjdG9yID0gYC4ke2Nsbn06JHtlbG19YDtcbiAgICAgICAgICBjb25zdCBjc3NUZXh0ID0gc3RsLmNzc1RleHRcbiAgICAgICAgICAgID8gZm9ybWF0Q3NzVGV4dChzdGwpXG4gICAgICAgICAgICA6IGZvcm1hdENzc1Byb3BlcnRpZXMoc3RsKTtcbiAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYCR7c2VsZWN0b3J9eyR7Y3NzVGV4dH19YCk7XG5cbiAgICAgICAgICBmdW5jdGlvbiBmb3JtYXRDc3NUZXh0KHN0bDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGNudCA9IHN0bDEuZ2V0UHJvcGVydHlWYWx1ZSgnY29udGVudCcpO1xuICAgICAgICAgICAgcmV0dXJuIGAke3N0bC5jc3NUZXh0fSBjb250ZW50OiAke2NudH07YDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmdW5jdGlvbiBmb3JtYXRDc3NQcm9wZXJ0aWVzKHN0bDIpIHtcbiAgICAgICAgICAgIHJldHVybiBgJHt1dGlsLmFzQXJyYXkoc3RsMikubWFwKGZvcm1hdFByb3BlcnR5KS5qb2luKCc7ICcpfTtgO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBmb3JtYXRQcm9wZXJ0eShuYW1lKSB7XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgYCR7bmFtZX06JHtzdGwuZ2V0UHJvcGVydHlWYWx1ZShuYW1lKX0ke3N0bC5nZXRQcm9wZXJ0eVByaW9yaXR5KG5hbWUpID8gJyAhaW1wb3J0YW50JyA6ICcnfWBcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb3B5VXNlcklucHV0KCkge1xuICAgICAgaWYgKG9yaWdpbmFsIGluc3RhbmNlb2Ygd2luZG93LkhUTUxUZXh0QXJlYUVsZW1lbnQpXG4gICAgICAgIGNsb25lLmlubmVySFRNTCA9IG9yaWdpbmFsLnZhbHVlO1xuICAgICAgaWYgKG9yaWdpbmFsIGluc3RhbmNlb2Ygd2luZG93LkhUTUxJbnB1dEVsZW1lbnQpXG4gICAgICAgIGNsb25lLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBvcmlnaW5hbC52YWx1ZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZml4U3ZnKCkge1xuICAgICAgaWYgKCEoY2xvbmUgaW5zdGFuY2VvZiB3aW5kb3cuU1ZHRWxlbWVudCkpIHJldHVybjtcbiAgICAgIGNsb25lLnNldEF0dHJpYnV0ZSgneG1sbnMnLCAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnKTtcblxuICAgICAgaWYgKCEoY2xvbmUgaW5zdGFuY2VvZiB3aW5kb3cuU1ZHUmVjdEVsZW1lbnQpKSByZXR1cm47XG4gICAgICBbJ3dpZHRoJywgJ2hlaWdodCddLmZvckVhY2goYXR0cmlidXRlID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBjbG9uZS5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgICAgICAgaWYgKCF2YWx1ZSkgcmV0dXJuO1xuXG4gICAgICAgIGNsb25lLnN0eWxlLnNldFByb3BlcnR5KGF0dHJpYnV0ZSwgdmFsdWUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGVtYmVkRm9udHMobm9kZSkge1xuICByZXR1cm4gZm9udEZhY2VzLnJlc29sdmVBbGwoKS50aGVuKChjc3NUZXh0KSA9PiB7XG4gICAgY29uc3Qgc3R5bGVOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBub2RlLmFwcGVuZENoaWxkKHN0eWxlTm9kZSk7XG4gICAgc3R5bGVOb2RlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzc1RleHQpKTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGlubGluZUltYWdlcyhub2RlKSB7XG4gIHJldHVybiBpbWFnZXMuaW5saW5lQWxsKG5vZGUpLnRoZW4oKCkgPT4gbm9kZSk7XG59XG5cbmZ1bmN0aW9uIG1ha2VTdmdEYXRhVXJpKG5vZGUsIHdpZHRoLCBoZWlnaHQpIHtcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShub2RlKVxuICAgIC50aGVuKG5kID0+IHtcbiAgICAgIG5kLnNldEF0dHJpYnV0ZSgneG1sbnMnLCAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCcpO1xuICAgICAgcmV0dXJuIG5ldyB3aW5kb3cuWE1MU2VyaWFsaXplcigpLnNlcmlhbGl6ZVRvU3RyaW5nKG5kKTtcbiAgICB9KVxuICAgIC50aGVuKHV0aWwuZXNjYXBlWGh0bWwpXG4gICAgLnRoZW4oeGh0bWwgPT5cbiAgICAgIGA8Zm9yZWlnbk9iamVjdCB4PVwiMFwiIHk9XCIwXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiPiR7eGh0bWx9PC9mb3JlaWduT2JqZWN0PmBcbiAgICApXG4gICAgLnRoZW4oZm9yZWlnbk9iamVjdCA9PlxuICAgICAgYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiJHt3aWR0aH1cIiBoZWlnaHQ9XCIke2hlaWdodH1cIj4ke2ZvcmVpZ25PYmplY3R9PC9zdmc+YFxuICAgIClcbiAgICAudGhlbihzdmcgPT4gYGRhdGE6aW1hZ2Uvc3ZnK3htbDtjaGFyc2V0PXV0Zi04LCR7c3ZnfWApO1xufVxuXG5mdW5jdGlvbiBuZXdVdGlsKCkge1xuICByZXR1cm4ge1xuICAgIGVzY2FwZSxcbiAgICBwYXJzZUV4dGVuc2lvbixcbiAgICBtaW1lVHlwZSxcbiAgICBkYXRhQXNVcmwsXG4gICAgaXNEYXRhVXJsLFxuICAgIGlzU3JjQXNEYXRhVXJsLFxuICAgIGNhbnZhc1RvQmxvYixcbiAgICByZXNvbHZlVXJsLFxuICAgIGdldEFuZEVuY29kZSxcbiAgICB1aWQ6IHVpZCgpLFxuICAgIGRlbGF5LFxuICAgIGFzQXJyYXksXG4gICAgZXNjYXBlWGh0bWwsXG4gICAgbWFrZUltYWdlLFxuICAgIHdpZHRoLFxuICAgIGhlaWdodFxuICB9O1xuXG4gIGZ1bmN0aW9uIG1pbWVzKCkge1xuICAgIC8qXG4gICAgICAgICAgICAqIE9ubHkgV09GRiBhbmQgRU9UIG1pbWUgdHlwZXMgZm9yIGZvbnRzIGFyZSAncmVhbCdcbiAgICAgICAgICAgICogc2VlIGh0dHA6Ly93d3cuaWFuYS5vcmcvYXNzaWdubWVudHMvbWVkaWEtdHlwZXMvbWVkaWEtdHlwZXMueGh0bWxcbiAgICAgICAgICAgICovXG4gICAgY29uc3QgV09GRiA9ICdhcHBsaWNhdGlvbi9mb250LXdvZmYnO1xuICAgIGNvbnN0IEpQRUcgPSAnaW1hZ2UvanBlZyc7XG5cbiAgICByZXR1cm4ge1xuICAgICAgd29mZjogV09GRixcbiAgICAgIHdvZmYyOiBXT0ZGLFxuICAgICAgdHRmOiAnYXBwbGljYXRpb24vZm9udC10cnVldHlwZScsXG4gICAgICBlb3Q6ICdhcHBsaWNhdGlvbi92bmQubXMtZm9udG9iamVjdCcsXG4gICAgICBwbmc6ICdpbWFnZS9wbmcnLFxuICAgICAganBnOiBKUEVHLFxuICAgICAganBlZzogSlBFRyxcbiAgICAgIGdpZjogJ2ltYWdlL2dpZicsXG4gICAgICB0aWZmOiAnaW1hZ2UvdGlmZicsXG4gICAgICBzdmc6ICdpbWFnZS9zdmcreG1sJ1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUV4dGVuc2lvbih1cmwpIHtcbiAgICBjb25zdCBtYXRjaCA9IC9cXC4oW15cXC5cXC9dKj8pJC9nLmV4ZWModXJsKTtcbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgIHJldHVybiBtYXRjaFsxXTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgZnVuY3Rpb24gbWltZVR5cGUodXJsKSB7XG4gICAgY29uc3QgZXh0ZW5zaW9uID0gcGFyc2VFeHRlbnNpb24odXJsKS50b0xvd2VyQ2FzZSgpO1xuICAgIHJldHVybiBtaW1lcygpW2V4dGVuc2lvbl0gfHwgJyc7XG4gIH1cblxuICBmdW5jdGlvbiBpc0RhdGFVcmwodXJsKSB7XG4gICAgcmV0dXJuIHVybC5zZWFyY2goL14oZGF0YTopLykgIT09IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNTcmNBc0RhdGFVcmwodGV4dCkge1xuICAgIGNvbnN0IERBVEFfVVJMX1JFR0VYID0gL3VybFxcKFsnXCJdPyhkYXRhOikoW14nXCJdKz8pWydcIl0/XFwpLztcblxuICAgIHJldHVybiB0ZXh0LnNlYXJjaChEQVRBX1VSTF9SRUdFWCkgIT09IC0xO1xuICB9XG4gIGZ1bmN0aW9uIGN2VG9CbG9iKGNhbnZhcykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGNvbnN0IGJpbmFyeVN0cmluZyA9IHdpbmRvdy5hdG9iKGNhbnZhcy50b0RhdGFVUkwoKS5zcGxpdCgnLCcpWzFdKTtcbiAgICAgIGNvbnN0IGxlbmd0aCA9IGJpbmFyeVN0cmluZy5sZW5ndGg7XG4gICAgICBjb25zdCBiaW5hcnlBcnJheSA9IG5ldyBVaW50OEFycmF5KGxlbmd0aCk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspXG4gICAgICAgIGJpbmFyeUFycmF5W2ldID0gYmluYXJ5U3RyaW5nLmNoYXJDb2RlQXQoaSk7XG5cbiAgICAgIHJlc29sdmUoXG4gICAgICAgIG5ldyB3aW5kb3cuQmxvYihbYmluYXJ5QXJyYXldLCB7dHlwZTogJ2ltYWdlL3BuZyd9KVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbnZhc1RvQmxvYihjYW52YXMpIHtcbiAgICBpZiAoY2FudmFzLnRvQmxvYilcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgY2FudmFzLnRvQmxvYihyZXNvbHZlKTtcbiAgICAgIH0pO1xuXG4gICAgcmV0dXJuIGN2VG9CbG9iKGNhbnZhcyk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNvbHZlVXJsKHVybCwgYmFzZVVybCkge1xuICAgIGNvbnN0IGRvYyA9IGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCgpO1xuICAgIGNvbnN0IGJhc2UgPSBkb2MuY3JlYXRlRWxlbWVudCgnYmFzZScpO1xuICAgIGRvYy5oZWFkLmFwcGVuZENoaWxkKGJhc2UpO1xuICAgIGNvbnN0IGEgPSBkb2MuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGRvYy5ib2R5LmFwcGVuZENoaWxkKGEpO1xuICAgIGJhc2UuaHJlZiA9IGJhc2VVcmw7XG4gICAgYS5ocmVmID0gdXJsO1xuICAgIHJldHVybiBhLmhyZWY7XG4gIH1cblxuICBmdW5jdGlvbiBmb3VyUmFuZG9tQ2hhcnMoKSB7XG4gICAgLyogc2VlIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzYyNDg3MjIvMjUxOTM3MyAqL1xuICAgIHJldHVybiBgMDAwMCR7KChNYXRoLnJhbmRvbSgpICogTWF0aC5wb3coMzYsIDQpKSA8PCAwKS50b1N0cmluZygzNil9YC5zbGljZSgtNCk7XG4gIH1cblxuICBmdW5jdGlvbiB1aWQoKSB7XG4gICAgbGV0IGluZGV4ID0gMDtcblxuICAgIHJldHVybiAoKSA9PiBgdSR7Zm91clJhbmRvbUNoYXJzKCl9JHtpbmRleCsrfWA7XG4gIH1cblxuICBmdW5jdGlvbiBtYWtlSW1hZ2UodXJpKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGltYWdlID0gbmV3IHdpbmRvdy5JbWFnZSgpO1xuICAgICAgaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgICByZXNvbHZlKGltYWdlKTtcbiAgICAgIH07XG4gICAgICBpbWFnZS5vbmVycm9yID0gcmVqZWN0O1xuICAgICAgaW1hZ2Uuc3JjID0gdXJpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0QW5kRW5jb2RlKHVybCkge1xuICAgIGNvbnN0IFRJTUVPVVQgPSAzMDAwMDtcbiAgICBpZiAoZG9tdG9pbWFnZS5pbXBsLm9wdGlvbnMuY2FjaGVCdXN0KSB7XG4gICAgICAvLyBDYWNoZSBieXBhc3Mgc28gd2UgZG9udCBoYXZlIENPUlMgaXNzdWVzIHdpdGggY2FjaGVkIGltYWdlc1xuICAgICAgLy8gU291cmNlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9kb2NzL1dlYi9BUEkvWE1MSHR0cFJlcXVlc3QvVXNpbmdfWE1MSHR0cFJlcXVlc3QjQnlwYXNzaW5nX3RoZV9jYWNoZVxuICAgICAgdXJsICs9ICgvXFw/Ly50ZXN0KHVybCkgPyAnJicgOiAnPycpICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgY29uc3QgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGRvbmU7XG4gICAgICByZXF1ZXN0Lm9udGltZW91dCA9IHRpbWVvdXQ7XG4gICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9ICdibG9iJztcbiAgICAgIHJlcXVlc3QudGltZW91dCA9IFRJTUVPVVQ7XG4gICAgICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG4gICAgICByZXF1ZXN0LnNlbmQoKTtcblxuICAgICAgbGV0IHBsYWNlaG9sZGVyO1xuICAgICAgaWYgKGRvbXRvaW1hZ2UuaW1wbC5vcHRpb25zLmltYWdlUGxhY2Vob2xkZXIpIHtcbiAgICAgICAgY29uc3Qgc3BsaXQgPSBkb210b2ltYWdlLmltcGwub3B0aW9ucy5pbWFnZVBsYWNlaG9sZGVyLnNwbGl0KC8sLyk7XG4gICAgICAgIGlmIChzcGxpdCAmJiBzcGxpdFsxXSkge1xuICAgICAgICAgIHBsYWNlaG9sZGVyID0gc3BsaXRbMV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZG9uZSgpIHtcbiAgICAgICAgaWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuXG4gICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgICAgaWYgKHBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICByZXNvbHZlKHBsYWNlaG9sZGVyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmFpbChgY2Fubm90IGZldGNoIHJlc291cmNlOiAke3VybH0sIHN0YXR1czogJHtyZXF1ZXN0LnN0YXR1c31gKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBlbmNvZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgZW5jb2Rlci5vbmxvYWRlbmQgPSAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgY29udGVudCA9IGVuY29kZXIucmVzdWx0LnNwbGl0KC8sLylbMV07XG4gICAgICAgICAgcmVzb2x2ZShjb250ZW50KTtcbiAgICAgICAgfTtcbiAgICAgICAgZW5jb2Rlci5yZWFkQXNEYXRhVVJMKHJlcXVlc3QucmVzcG9uc2UpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB0aW1lb3V0KCkge1xuICAgICAgICBpZiAocGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICByZXNvbHZlKHBsYWNlaG9sZGVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmYWlsKFxuICAgICAgICAgICAgYHRpbWVvdXQgb2YgJHtUSU1FT1VUfW1zIG9jY3VyZWQgd2hpbGUgZmV0Y2hpbmcgcmVzb3VyY2U6ICR7dXJsfWBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGZhaWwobWVzc2FnZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgICAgICByZXNvbHZlKCcnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRhdGFBc1VybChjb250ZW50LCB0eXBlKSB7XG4gICAgcmV0dXJuIGBkYXRhOiR7dHlwZX07YmFzZTY0LCR7Y29udGVudH1gO1xuICB9XG5cbiAgZnVuY3Rpb24gZXNjYXBlKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvKFsuKis/XiR7fSgpfFxcW1xcXVxcL1xcXFxdKS9nLCAnXFxcXCQxJyk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWxheShtcykge1xuICAgIHJldHVybiBhcmcgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHJlc29sdmUoYXJnKTtcbiAgICAgICAgfSwgbXMpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFzQXJyYXkoYXJyYXlMaWtlKSB7XG4gICAgY29uc3QgYXJyYXkgPSBbXTtcbiAgICBjb25zdCBsZW5ndGggPSBhcnJheUxpa2UubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIGFycmF5LnB1c2goYXJyYXlMaWtlW2ldKTtcbiAgICByZXR1cm4gYXJyYXk7XG4gIH1cblxuICBmdW5jdGlvbiBlc2NhcGVYaHRtbChzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyMvZywgJyUyMycpLnJlcGxhY2UoL1xcbi9nLCAnJTBBJyk7XG4gIH1cblxuICBmdW5jdGlvbiB3aWR0aChub2RlKSB7XG4gICAgY29uc3QgbGVmdEJvcmRlciA9IHB4KG5vZGUsICdib3JkZXItbGVmdC13aWR0aCcpO1xuICAgIGNvbnN0IHJpZ2h0Qm9yZGVyID0gcHgobm9kZSwgJ2JvcmRlci1yaWdodC13aWR0aCcpO1xuICAgIHJldHVybiBub2RlLnNjcm9sbFdpZHRoICsgbGVmdEJvcmRlciArIHJpZ2h0Qm9yZGVyO1xuICB9XG5cbiAgZnVuY3Rpb24gaGVpZ2h0KG5vZGUpIHtcbiAgICBjb25zdCB0b3BCb3JkZXIgPSBweChub2RlLCAnYm9yZGVyLXRvcC13aWR0aCcpO1xuICAgIGNvbnN0IGJvdHRvbUJvcmRlciA9IHB4KG5vZGUsICdib3JkZXItYm90dG9tLXdpZHRoJyk7XG4gICAgcmV0dXJuIG5vZGUuc2Nyb2xsSGVpZ2h0ICsgdG9wQm9yZGVyICsgYm90dG9tQm9yZGVyO1xuICB9XG5cbiAgZnVuY3Rpb24gcHgobm9kZSwgc3R5bGVQcm9wZXJ0eSkge1xuICAgIGNvbnN0IHZhbHVlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZSkuZ2V0UHJvcGVydHlWYWx1ZShzdHlsZVByb3BlcnR5KTtcbiAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZS5yZXBsYWNlKCdweCcsICcnKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbmV3SW5saW5lcigpIHtcbiAgY29uc3QgVVJMX1JFR0VYID0gL3VybFxcKFsnXCJdPyhbXidcIl0rPylbJ1wiXT9cXCkvZztcblxuICByZXR1cm4ge1xuICAgIGlubGluZUFsbCxcbiAgICBzaG91bGRQcm9jZXNzLFxuICAgIGltcGw6IHtcbiAgICAgIHJlYWRVcmxzLFxuICAgICAgaW5saW5lXG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIHNob3VsZFByb2Nlc3Moc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5zZWFyY2goVVJMX1JFR0VYKSAhPT0gLTE7XG4gIH1cblxuICBmdW5jdGlvbiByZWFkVXJscyhzdHJpbmcpIHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBsZXQgbWF0Y2g7XG4gICAgd2hpbGUgKChtYXRjaCA9IFVSTF9SRUdFWC5leGVjKHN0cmluZykpICE9PSBudWxsKSB7XG4gICAgICByZXN1bHQucHVzaChtYXRjaFsxXSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQuZmlsdGVyKCh1cmwpID0+IHtcbiAgICAgIHJldHVybiAhdXRpbC5pc0RhdGFVcmwodXJsKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlubGluZShzdHJpbmcsIHVybCwgYmFzZVVybCwgZ2V0KSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh1cmwpXG4gICAgICAudGhlbih1bCA9PiBiYXNlVXJsID8gdXRpbC5yZXNvbHZlVXJsKHVsLCBiYXNlVXJsKSA6IHVsKVxuICAgICAgLnRoZW4oZ2V0IHx8IHV0aWwuZ2V0QW5kRW5jb2RlKVxuICAgICAgLnRoZW4oZGF0YSA9PiB1dGlsLmRhdGFBc1VybChkYXRhLCB1dGlsLm1pbWVUeXBlKHVybCkpKVxuICAgICAgLnRoZW4oZGF0YVVybCA9PiBzdHJpbmcucmVwbGFjZSh1cmxBc1JlZ2V4KHVybCksIGAkMSR7ZGF0YVVybH0kM2ApKTtcblxuICAgIGZ1bmN0aW9uIHVybEFzUmVnZXgodXJsMCkge1xuICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoXG4gICAgICAgIGAodXJsXFxcXChbXFwnXCJdPykoJHt1dGlsLmVzY2FwZSh1cmwwKX0pKFtcXCdcIl0/XFxcXCkpYCxcbiAgICAgICAgJ2cnXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlubGluZUFsbChzdHJpbmcsIGJhc2VVcmwsIGdldCkge1xuICAgIGlmIChub3RoaW5nVG9JbmxpbmUoKSB8fCB1dGlsLmlzU3JjQXNEYXRhVXJsKHN0cmluZykpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoc3RyaW5nKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShzdHJpbmcpXG4gICAgICAudGhlbihyZWFkVXJscylcbiAgICAgIC50aGVuKHVybHMgPT4ge1xuICAgICAgICBsZXQgZG9uZSA9IFByb21pc2UucmVzb2x2ZShzdHJpbmcpO1xuICAgICAgICB1cmxzLmZvckVhY2godXJsID0+IHtcbiAgICAgICAgICBkb25lID0gZG9uZS50aGVuKHN0ciA9PiBpbmxpbmUoc3RyLCB1cmwsIGJhc2VVcmwsIGdldCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRvbmU7XG4gICAgICB9KTtcblxuICAgIGZ1bmN0aW9uIG5vdGhpbmdUb0lubGluZSgpIHtcbiAgICAgIHJldHVybiAhc2hvdWxkUHJvY2VzcyhzdHJpbmcpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBuZXdGb250RmFjZXMoKSB7XG4gIHJldHVybiB7XG4gICAgcmVzb2x2ZUFsbCxcbiAgICBpbXBsOiB7cmVhZEFsbH1cbiAgfTtcblxuICBmdW5jdGlvbiByZXNvbHZlQWxsKCkge1xuICAgIHJldHVybiByZWFkQWxsKGRvY3VtZW50KVxuICAgICAgLnRoZW4od2ViRm9udHMgPT4ge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoXG4gICAgICAgICAgd2ViRm9udHMubWFwKHdlYkZvbnQgPT4gd2ViRm9udC5yZXNvbHZlKCkpXG4gICAgICAgICk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oY3NzU3RyaW5ncyA9PiBjc3NTdHJpbmdzLmpvaW4oJ1xcbicpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRBbGwoKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh1dGlsLmFzQXJyYXkoZG9jdW1lbnQuc3R5bGVTaGVldHMpKVxuICAgICAgLnRoZW4obG9hZEV4dGVybmFsU3R5bGVTaGVldHMpXG4gICAgICAudGhlbihnZXRDc3NSdWxlcylcbiAgICAgIC50aGVuKHNlbGVjdFdlYkZvbnRSdWxlcylcbiAgICAgIC50aGVuKHJ1bGVzID0+IHJ1bGVzLm1hcChuZXdXZWJGb250KSk7XG5cbiAgICBmdW5jdGlvbiBzZWxlY3RXZWJGb250UnVsZXMoY3NzUnVsZXMpIHtcbiAgICAgIHJldHVybiBjc3NSdWxlc1xuICAgICAgICAuZmlsdGVyKHJ1bGUgPT4gcnVsZS50eXBlID09PSB3aW5kb3cuQ1NTUnVsZS5GT05UX0ZBQ0VfUlVMRSlcbiAgICAgICAgLmZpbHRlcihydWxlID0+IGlubGluZXIuc2hvdWxkUHJvY2VzcyhydWxlLnN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ3NyYycpKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9hZEV4dGVybmFsU3R5bGVTaGVldHMoc3R5bGVTaGVldHMpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChcbiAgICAgICAgc3R5bGVTaGVldHMubWFwKHNoZWV0ID0+IHtcbiAgICAgICAgICBpZiAoc2hlZXQuaHJlZikge1xuICAgICAgICAgICAgcmV0dXJuIGZldGNoKHNoZWV0LmhyZWYsIHtjcmVkZW50aWFsczogJ29taXQnfSlcbiAgICAgICAgICAgICAgLnRoZW4odG9UZXh0KVxuICAgICAgICAgICAgICAudGhlbihzZXRCYXNlSHJlZihzaGVldC5ocmVmKSlcbiAgICAgICAgICAgICAgLnRoZW4odG9TdHlsZVNoZWV0KVxuICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICAvLyBIYW5kbGUgYW55IGVycm9yIHRoYXQgb2NjdXJyZWQgaW4gYW55IG9mIHRoZSBwcmV2aW91c1xuICAgICAgICAgICAgICAgIC8vIHByb21pc2VzIGluIHRoZSBjaGFpbi5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNoZWV0O1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShzaGVldCk7XG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICBmdW5jdGlvbiB0b1RleHQocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnRleHQoKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gc2V0QmFzZUhyZWYoYmFzZSkge1xuICAgICAgICBiYXNlID0gYmFzZS5zcGxpdCgnLycpO1xuICAgICAgICBiYXNlLnBvcCgpO1xuICAgICAgICBiYXNlID0gYmFzZS5qb2luKCcvJyk7XG5cbiAgICAgICAgcmV0dXJuIHRleHQgPT4ge1xuICAgICAgICAgIHJldHVybiB1dGlsLmlzU3JjQXNEYXRhVXJsKHRleHQpXG4gICAgICAgICAgICA/IHRleHRcbiAgICAgICAgICAgIDogdGV4dC5yZXBsYWNlKC91cmxcXChbJ1wiXT8oW14nXCJdKz8pWydcIl0/XFwpL2csIGFkZEJhc2VIcmVmVG9VcmwpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIGFkZEJhc2VIcmVmVG9VcmwobWF0Y2gsIHAxKSB7XG4gICAgICAgICAgY29uc3QgdXJsID0gL15odHRwL2kudGVzdChwMSkgPyBwMSA6IGNvbmNhdEFuZFJlc29sdmVVcmwoYmFzZSwgcDEpO1xuICAgICAgICAgIHJldHVybiBgdXJsKCcke3VybH0nKWA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTb3VyY2U6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NzYyMzEvMzc4Njg1NlxuICAgICAgICBmdW5jdGlvbiBjb25jYXRBbmRSZXNvbHZlVXJsKHVybCwgY29uY2F0KSB7XG4gICAgICAgICAgY29uc3QgdXJsMSA9IHVybC5zcGxpdCgnLycpO1xuICAgICAgICAgIGNvbnN0IHVybDIgPSBjb25jYXQuc3BsaXQoJy8nKTtcbiAgICAgICAgICBjb25zdCB1cmwzID0gW107XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSB1cmwxLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgaWYgKHVybDFbaV0gPT09ICcuLicpIHtcbiAgICAgICAgICAgICAgdXJsMy5wb3AoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodXJsMVtpXSAhPT0gJy4nKSB7XG4gICAgICAgICAgICAgIHVybDMucHVzaCh1cmwxW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSB1cmwyLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgaWYgKHVybDJbaV0gPT09ICcuLicpIHtcbiAgICAgICAgICAgICAgdXJsMy5wb3AoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodXJsMltpXSAhPT0gJy4nKSB7XG4gICAgICAgICAgICAgIHVybDMucHVzaCh1cmwyW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHVybDMuam9pbignLycpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHRvU3R5bGVTaGVldCh0ZXh0KSB7XG4gICAgICAgIGNvbnN0IGRvYyA9IGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCgnJyk7XG4gICAgICAgIGNvbnN0IHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cbiAgICAgICAgc3R5bGVFbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgICAgZG9jLmJvZHkuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcblxuICAgICAgICByZXR1cm4gc3R5bGVFbGVtZW50LnNoZWV0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldENzc1J1bGVzKHN0eWxlU2hlZXRzKSB7XG4gICAgICBjb25zdCBjc3NSdWxlcyA9IFtdO1xuICAgICAgc3R5bGVTaGVldHMuZm9yRWFjaCgoc2hlZXQpID0+IHtcbiAgICAgICAgLy8gdHJ5Li4uY2F0Y2ggYmVjYXVzZSBicm93c2VyIG1heSBub3QgYWJsZSB0byBlbnVtZXJhdGUgcnVsZXMgZm9yIGNyb3NzLWRvbWFpbiBzaGVldHNcbiAgICAgICAgbGV0IHJ1bGVzO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJ1bGVzID0gc2hlZXQucnVsZXMgfHwgc2hlZXQuY3NzUnVsZXM7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGAnQ2FuJ3QgcmVhZCB0aGUgY3NzIHJ1bGVzIG9mOiAke3NoZWV0LmhyZWZ9YCwgZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJ1bGVzICYmIHR5cGVvZiBydWxlcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdXRpbFxuICAgICAgICAgICAgICAuYXNBcnJheShydWxlcyB8fCBbXSlcbiAgICAgICAgICAgICAgLmZvckVhY2goY3NzUnVsZXMucHVzaC5iaW5kKGNzc1J1bGVzKSk7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3Igd2hpbGUgcmVhZGluZyBDU1MgcnVsZXMgZnJvbSAke3NoZWV0LmhyZWZ9YCwgZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2dldENzc1J1bGVzIGNhbiBub3QgZmluZCBjc3NSdWxlcycpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBjc3NSdWxlcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBuZXdXZWJGb250KHdlYkZvbnRSdWxlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXNvbHZlOiAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgYmFzZVVybCA9ICh3ZWJGb250UnVsZS5wYXJlbnRTdHlsZVNoZWV0IHx8IHt9KS5ocmVmO1xuICAgICAgICAgIHJldHVybiBpbmxpbmVyLmlubGluZUFsbCh3ZWJGb250UnVsZS5jc3NUZXh0LCBiYXNlVXJsKTtcbiAgICAgICAgfSxcbiAgICAgICAgc3JjOiAoKSA9PiB3ZWJGb250UnVsZS5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdzcmMnKVxuICAgICAgfTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbmV3SW1hZ2VzKCkge1xuICByZXR1cm4ge1xuICAgIGlubGluZUFsbCxcbiAgICBpbXBsOiB7XG4gICAgICBuZXdJbWFnZVxuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiBuZXdJbWFnZShlbGVtZW50KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlubGluZVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBpbmxpbmUoZ2V0KSB7XG4gICAgICBpZiAodXRpbC5pc0RhdGFVcmwoZWxlbWVudC5zcmMpKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZWxlbWVudC5zcmMpXG4gICAgICAgIC50aGVuKGdldCB8fCB1dGlsLmdldEFuZEVuY29kZSlcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB1dGlsLmRhdGFBc1VybChkYXRhLCB1dGlsLm1pbWVUeXBlKGVsZW1lbnQuc3JjKSkpXG4gICAgICAgIC50aGVuKGRhdGFVcmwgPT5cbiAgICAgICAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50Lm9ubG9hZCA9IHJlc29sdmU7XG4gICAgICAgICAgICBlbGVtZW50Lm9uZXJyb3IgPSByZWplY3Q7XG4gICAgICAgICAgICBlbGVtZW50LnNyYyA9IGRhdGFVcmw7XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbmxpbmVBbGwobm9kZSkge1xuICAgIGlmICghKG5vZGUgaW5zdGFuY2VvZiBFbGVtZW50KSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShub2RlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5saW5lQmFja2dyb3VuZChub2RlKS50aGVuKCgpID0+IHtcbiAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gbmV3SW1hZ2Uobm9kZSkuaW5saW5lKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoXG4gICAgICAgIHV0aWwuYXNBcnJheShub2RlLmNoaWxkTm9kZXMpLm1hcChjaGlsZCA9PiBpbmxpbmVBbGwoY2hpbGQpKVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGlubGluZUJhY2tncm91bmQobmQpIHtcbiAgICAgIGNvbnN0IGJhY2tncm91bmQgPSBuZC5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdiYWNrZ3JvdW5kJyk7XG5cbiAgICAgIGlmICghYmFja2dyb3VuZCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5kKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGlubGluZXJcbiAgICAgICAgLmlubGluZUFsbChiYWNrZ3JvdW5kKVxuICAgICAgICAudGhlbihpbmxpbmVkID0+IHtcbiAgICAgICAgICBuZC5zdHlsZS5zZXRQcm9wZXJ0eShcbiAgICAgICAgICAgICdiYWNrZ3JvdW5kJyxcbiAgICAgICAgICAgIGlubGluZWQsXG4gICAgICAgICAgICBuZC5zdHlsZS5nZXRQcm9wZXJ0eVByaW9yaXR5KCdiYWNrZ3JvdW5kJylcbiAgICAgICAgICApO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiBuZCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRvbXRvaW1hZ2U7XG4iXX0=