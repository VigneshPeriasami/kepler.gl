"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _layers = require("@deck.gl/layers");

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
// TODO: a hack becaue solid-polygon-layer is not exported from @deck.gl/layers
var HighlightSolidPolygonLayer =
/*#__PURE__*/
function (_SolidPolygonLayer2) {
  (0, _inherits2.default)(HighlightSolidPolygonLayer, _SolidPolygonLayer2);

  function HighlightSolidPolygonLayer() {
    (0, _classCallCheck2.default)(this, HighlightSolidPolygonLayer);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(HighlightSolidPolygonLayer).apply(this, arguments));
  }

  (0, _createClass2.default)(HighlightSolidPolygonLayer, [{
    key: "draw",
    value: function draw(opts) {
      var uniforms = opts.uniforms;
      (0, _get2.default)((0, _getPrototypeOf2.default)(HighlightSolidPolygonLayer.prototype), "draw", this).call(this, (0, _objectSpread2.default)({}, opts, {
        uniforms: (0, _objectSpread2.default)({}, uniforms, {
          picking_uHighlightScale: this.props.extruded ? 1.4 : 0.0
        })
      }));
    }
  }]);
  return HighlightSolidPolygonLayer;
}(_layers._SolidPolygonLayer);

exports.default = HighlightSolidPolygonLayer;
HighlightSolidPolygonLayer.layerName = 'HighlightSolidPolygonLayer';
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZWNrZ2wtbGF5ZXJzL2dlb2pzb24tbGF5ZXIvc29saWQtcG9seWdvbi1sYXllci5qcyJdLCJuYW1lcyI6WyJIaWdobGlnaHRTb2xpZFBvbHlnb25MYXllciIsIm9wdHMiLCJ1bmlmb3JtcyIsInBpY2tpbmdfdUhpZ2hsaWdodFNjYWxlIiwicHJvcHMiLCJleHRydWRlZCIsIl9Tb2xpZFBvbHlnb25MYXllciIsImxheWVyTmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkE7O0FBckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7SUFHcUJBLDBCOzs7Ozs7Ozs7Ozs7eUJBQ2RDLEksRUFBTTtBQUFBLFVBQ0ZDLFFBREUsR0FDVUQsSUFEVixDQUNGQyxRQURFO0FBR1QsdUpBQ0tELElBREw7QUFFRUMsUUFBQUEsUUFBUSxrQ0FDSEEsUUFERztBQUVOQyxVQUFBQSx1QkFBdUIsRUFBRSxLQUFLQyxLQUFMLENBQVdDLFFBQVgsR0FBc0IsR0FBdEIsR0FBNEI7QUFGL0M7QUFGVjtBQU9EOzs7RUFYcURDLDBCOzs7QUFjeEROLDBCQUEwQixDQUFDTyxTQUEzQixHQUF1Qyw0QkFBdkMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG4vLyBUT0RPOiBhIGhhY2sgYmVjYXVlIHNvbGlkLXBvbHlnb24tbGF5ZXIgaXMgbm90IGV4cG9ydGVkIGZyb20gQGRlY2suZ2wvbGF5ZXJzXG5pbXBvcnQge19Tb2xpZFBvbHlnb25MYXllcn0gZnJvbSAnQGRlY2suZ2wvbGF5ZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGlnaGxpZ2h0U29saWRQb2x5Z29uTGF5ZXIgZXh0ZW5kcyBfU29saWRQb2x5Z29uTGF5ZXIge1xuICBkcmF3KG9wdHMpIHtcbiAgICBjb25zdCB7dW5pZm9ybXN9ID0gb3B0cztcblxuICAgIHN1cGVyLmRyYXcoe1xuICAgICAgLi4ub3B0cyxcbiAgICAgIHVuaWZvcm1zOiB7XG4gICAgICAgIC4uLnVuaWZvcm1zLFxuICAgICAgICBwaWNraW5nX3VIaWdobGlnaHRTY2FsZTogdGhpcy5wcm9wcy5leHRydWRlZCA/IDEuNCA6IDAuMFxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cblxuSGlnaGxpZ2h0U29saWRQb2x5Z29uTGF5ZXIubGF5ZXJOYW1lID0gJ0hpZ2hsaWdodFNvbGlkUG9seWdvbkxheWVyJztcbiJdfQ==