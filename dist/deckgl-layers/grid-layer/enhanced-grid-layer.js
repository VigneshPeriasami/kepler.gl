"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _deck = require("deck.gl");

var _utils = require("../layer-utils/utils");

var _enhancedGridCellLayer = _interopRequireDefault(require("./enhanced-grid-cell-layer"));

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
var defaultProps = (0, _objectSpread2.default)({}, _deck.GridLayer.defaultProps, {
  colorScale: 'quantile'
});

var EnhancedGridLayer =
/*#__PURE__*/
function (_GridLayer) {
  (0, _inherits2.default)(EnhancedGridLayer, _GridLayer);

  function EnhancedGridLayer() {
    (0, _classCallCheck2.default)(this, EnhancedGridLayer);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(EnhancedGridLayer).apply(this, arguments));
  }

  (0, _createClass2.default)(EnhancedGridLayer, [{
    key: "getDimensionUpdaters",
    value: function getDimensionUpdaters() {
      var dimensionUpdaters = (0, _get2.default)((0, _getPrototypeOf2.default)(EnhancedGridLayer.prototype), "getDimensionUpdaters", this).call(this); // add colorScale to dimension updates

      dimensionUpdaters.getColor[1].triggers.push('colorScale');
      return dimensionUpdaters;
    }
    /*
     * override default layer method to calculate color domain
     * and scale function base on color scale type
     */

  }, {
    key: "getColorValueDomain",
    value: function getColorValueDomain() {
      (0, _utils.getColorValueDomain)(this);
    }
  }, {
    key: "getColorScale",
    value: function getColorScale() {
      (0, _utils.getColorScaleFunction)(this);
    }
    /*
     * override default getSubLayerClass to return customized cellLayer
     */

  }, {
    key: "getSubLayerClass",
    value: function getSubLayerClass() {
      return _enhancedGridCellLayer.default;
    }
  }]);
  return EnhancedGridLayer;
}(_deck.GridLayer);

exports.default = EnhancedGridLayer;
EnhancedGridLayer.layerName = 'EnhancedGridLayer';
EnhancedGridLayer.defaultProps = defaultProps;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZWNrZ2wtbGF5ZXJzL2dyaWQtbGF5ZXIvZW5oYW5jZWQtZ3JpZC1sYXllci5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0UHJvcHMiLCJHcmlkTGF5ZXIiLCJjb2xvclNjYWxlIiwiRW5oYW5jZWRHcmlkTGF5ZXIiLCJkaW1lbnNpb25VcGRhdGVycyIsImdldENvbG9yIiwidHJpZ2dlcnMiLCJwdXNoIiwiRW5oYW5jZWRHcmlkQ2VsbExheWVyIiwibGF5ZXJOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUF0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFNQSxJQUFNQSxZQUFZLG1DQUNiQyxnQkFBVUQsWUFERztBQUVoQkUsRUFBQUEsVUFBVSxFQUFFO0FBRkksRUFBbEI7O0lBS3FCQyxpQjs7Ozs7Ozs7Ozs7OzJDQUNJO0FBQ3JCLFVBQU1DLGlCQUFpQiwwSEFBdkIsQ0FEcUIsQ0FFckI7O0FBQ0FBLE1BQUFBLGlCQUFpQixDQUFDQyxRQUFsQixDQUEyQixDQUEzQixFQUE4QkMsUUFBOUIsQ0FBdUNDLElBQXZDLENBQTRDLFlBQTVDO0FBQ0EsYUFBT0gsaUJBQVA7QUFDRDtBQUVEOzs7Ozs7OzBDQUlzQjtBQUNwQixzQ0FBb0IsSUFBcEI7QUFDRDs7O29DQUVlO0FBQ2Qsd0NBQXNCLElBQXRCO0FBQ0Q7QUFFRDs7Ozs7O3VDQUdtQjtBQUNqQixhQUFPSSw4QkFBUDtBQUNEOzs7RUF6QjRDUCxlOzs7QUE0Qi9DRSxpQkFBaUIsQ0FBQ00sU0FBbEIsR0FBOEIsbUJBQTlCO0FBQ0FOLGlCQUFpQixDQUFDSCxZQUFsQixHQUFpQ0EsWUFBakMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQge0dyaWRMYXllcn0gZnJvbSAnZGVjay5nbCc7XG5pbXBvcnQge2dldENvbG9yVmFsdWVEb21haW4sIGdldENvbG9yU2NhbGVGdW5jdGlvbn0gZnJvbSAnLi4vbGF5ZXItdXRpbHMvdXRpbHMnO1xuaW1wb3J0IEVuaGFuY2VkR3JpZENlbGxMYXllciBmcm9tICcuL2VuaGFuY2VkLWdyaWQtY2VsbC1sYXllcic7XG5cbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcbiAgLi4uR3JpZExheWVyLmRlZmF1bHRQcm9wcyxcbiAgY29sb3JTY2FsZTogJ3F1YW50aWxlJ1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW5oYW5jZWRHcmlkTGF5ZXIgZXh0ZW5kcyBHcmlkTGF5ZXIge1xuICBnZXREaW1lbnNpb25VcGRhdGVycygpIHtcbiAgICBjb25zdCBkaW1lbnNpb25VcGRhdGVycyA9IHN1cGVyLmdldERpbWVuc2lvblVwZGF0ZXJzKCk7XG4gICAgLy8gYWRkIGNvbG9yU2NhbGUgdG8gZGltZW5zaW9uIHVwZGF0ZXNcbiAgICBkaW1lbnNpb25VcGRhdGVycy5nZXRDb2xvclsxXS50cmlnZ2Vycy5wdXNoKCdjb2xvclNjYWxlJyk7XG4gICAgcmV0dXJuIGRpbWVuc2lvblVwZGF0ZXJzO1xuICB9XG5cbiAgLypcbiAgICogb3ZlcnJpZGUgZGVmYXVsdCBsYXllciBtZXRob2QgdG8gY2FsY3VsYXRlIGNvbG9yIGRvbWFpblxuICAgKiBhbmQgc2NhbGUgZnVuY3Rpb24gYmFzZSBvbiBjb2xvciBzY2FsZSB0eXBlXG4gICAqL1xuICBnZXRDb2xvclZhbHVlRG9tYWluKCkge1xuICAgIGdldENvbG9yVmFsdWVEb21haW4odGhpcyk7XG4gIH1cblxuICBnZXRDb2xvclNjYWxlKCkge1xuICAgIGdldENvbG9yU2NhbGVGdW5jdGlvbih0aGlzKTtcbiAgfVxuXG4gIC8qXG4gICAqIG92ZXJyaWRlIGRlZmF1bHQgZ2V0U3ViTGF5ZXJDbGFzcyB0byByZXR1cm4gY3VzdG9taXplZCBjZWxsTGF5ZXJcbiAgICovXG4gIGdldFN1YkxheWVyQ2xhc3MoKSB7XG4gICAgcmV0dXJuIEVuaGFuY2VkR3JpZENlbGxMYXllcjtcbiAgfVxufVxuXG5FbmhhbmNlZEdyaWRMYXllci5sYXllck5hbWUgPSAnRW5oYW5jZWRHcmlkTGF5ZXInO1xuRW5oYW5jZWRHcmlkTGF5ZXIuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuIl19