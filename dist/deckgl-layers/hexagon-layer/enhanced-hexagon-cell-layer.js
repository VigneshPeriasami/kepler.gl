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

var _deck = require("deck.gl");

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
var EnhancedHexagonCellLayer =
/*#__PURE__*/
function (_HexagonCellLayer) {
  (0, _inherits2.default)(EnhancedHexagonCellLayer, _HexagonCellLayer);

  function EnhancedHexagonCellLayer() {
    (0, _classCallCheck2.default)(this, EnhancedHexagonCellLayer);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(EnhancedHexagonCellLayer).apply(this, arguments));
  }

  (0, _createClass2.default)(EnhancedHexagonCellLayer, [{
    key: "draw",
    value: function draw(opts) {
      var uniforms = opts.uniforms;
      (0, _get2.default)((0, _getPrototypeOf2.default)(EnhancedHexagonCellLayer.prototype), "draw", this).call(this, (0, _objectSpread2.default)({}, opts, {
        uniforms: (0, _objectSpread2.default)({}, uniforms, {
          picking_uHighlightScale: this.props.extruded ? 1.4 : 0.0
        })
      }));
    }
  }]);
  return EnhancedHexagonCellLayer;
}(_deck.HexagonCellLayer);

exports.default = EnhancedHexagonCellLayer;
EnhancedHexagonCellLayer.layerName = 'EnhancedHexagonCellLayer';
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZWNrZ2wtbGF5ZXJzL2hleGFnb24tbGF5ZXIvZW5oYW5jZWQtaGV4YWdvbi1jZWxsLWxheWVyLmpzIl0sIm5hbWVzIjpbIkVuaGFuY2VkSGV4YWdvbkNlbGxMYXllciIsIm9wdHMiLCJ1bmlmb3JtcyIsInBpY2tpbmdfdUhpZ2hsaWdodFNjYWxlIiwicHJvcHMiLCJleHRydWRlZCIsIkhleGFnb25DZWxsTGF5ZXIiLCJsYXllck5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQXBCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtJQUlxQkEsd0I7Ozs7Ozs7Ozs7Ozt5QkFDZEMsSSxFQUFNO0FBQUEsVUFDRkMsUUFERSxHQUNVRCxJQURWLENBQ0ZDLFFBREU7QUFHVCxxSkFDS0QsSUFETDtBQUVFQyxRQUFBQSxRQUFRLGtDQUNIQSxRQURHO0FBRU5DLFVBQUFBLHVCQUF1QixFQUFFLEtBQUtDLEtBQUwsQ0FBV0MsUUFBWCxHQUFzQixHQUF0QixHQUE0QjtBQUYvQztBQUZWO0FBT0Q7OztFQVhtREMsc0I7OztBQWN0RE4sd0JBQXdCLENBQUNPLFNBQXpCLEdBQXFDLDBCQUFyQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7SGV4YWdvbkNlbGxMYXllcn0gZnJvbSAnZGVjay5nbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVuaGFuY2VkSGV4YWdvbkNlbGxMYXllciBleHRlbmRzIEhleGFnb25DZWxsTGF5ZXIge1xuICBkcmF3KG9wdHMpIHtcbiAgICBjb25zdCB7dW5pZm9ybXN9ID0gb3B0cztcblxuICAgIHN1cGVyLmRyYXcoe1xuICAgICAgLi4ub3B0cyxcbiAgICAgIHVuaWZvcm1zOiB7XG4gICAgICAgIC4uLnVuaWZvcm1zLFxuICAgICAgICBwaWNraW5nX3VIaWdobGlnaHRTY2FsZTogdGhpcy5wcm9wcy5leHRydWRlZCA/IDEuNCA6IDAuMFxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cblxuRW5oYW5jZWRIZXhhZ29uQ2VsbExheWVyLmxheWVyTmFtZSA9ICdFbmhhbmNlZEhleGFnb25DZWxsTGF5ZXInO1xuIl19