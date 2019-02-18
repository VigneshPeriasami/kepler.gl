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

var _hexagonAggregator = require("./hexagon-aggregator");

var _utils = require("../layer-utils/utils");

var _enhancedHexagonCellLayer = _interopRequireDefault(require("./enhanced-hexagon-cell-layer"));

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
var defaultProps = (0, _objectSpread2.default)({}, _deck.HexagonLayer.defaultProps, {
  hexagonAggregator: _hexagonAggregator.pointToHexbin,
  colorScale: 'quantile'
});

var EnhancedHexagonLayer =
/*#__PURE__*/
function (_HexagonLayer) {
  (0, _inherits2.default)(EnhancedHexagonLayer, _HexagonLayer);

  function EnhancedHexagonLayer() {
    (0, _classCallCheck2.default)(this, EnhancedHexagonLayer);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(EnhancedHexagonLayer).apply(this, arguments));
  }

  (0, _createClass2.default)(EnhancedHexagonLayer, [{
    key: "getDimensionUpdaters",
    value: function getDimensionUpdaters() {
      var dimensionUpdaters = (0, _get2.default)((0, _getPrototypeOf2.default)(EnhancedHexagonLayer.prototype), "getDimensionUpdaters", this).call(this); // add colorScale to dimension updates

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
      return _enhancedHexagonCellLayer.default;
    }
  }]);
  return EnhancedHexagonLayer;
}(_deck.HexagonLayer);

exports.default = EnhancedHexagonLayer;
EnhancedHexagonLayer.layerName = 'EnhancedHexagonLayer';
EnhancedHexagonLayer.defaultProps = defaultProps;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZWNrZ2wtbGF5ZXJzL2hleGFnb24tbGF5ZXIvZW5oYW5jZWQtaGV4YWdvbi1sYXllci5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0UHJvcHMiLCJIZXhhZ29uTGF5ZXIiLCJoZXhhZ29uQWdncmVnYXRvciIsInBvaW50VG9IZXhiaW4iLCJjb2xvclNjYWxlIiwiRW5oYW5jZWRIZXhhZ29uTGF5ZXIiLCJkaW1lbnNpb25VcGRhdGVycyIsImdldENvbG9yIiwidHJpZ2dlcnMiLCJwdXNoIiwiRW5oYW5jZWRIZXhhZ29uQ2VsbExheWVyIiwibGF5ZXJOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUF4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFRQSxJQUFNQSxZQUFZLG1DQUNiQyxtQkFBYUQsWUFEQTtBQUVoQkUsRUFBQUEsaUJBQWlCLEVBQUVDLGdDQUZIO0FBR2hCQyxFQUFBQSxVQUFVLEVBQUU7QUFISSxFQUFsQjs7SUFNcUJDLG9COzs7Ozs7Ozs7Ozs7MkNBQ0k7QUFDckIsVUFBTUMsaUJBQWlCLDZIQUF2QixDQURxQixDQUVyQjs7QUFDQUEsTUFBQUEsaUJBQWlCLENBQUNDLFFBQWxCLENBQTJCLENBQTNCLEVBQThCQyxRQUE5QixDQUF1Q0MsSUFBdkMsQ0FBNEMsWUFBNUM7QUFDQSxhQUFPSCxpQkFBUDtBQUNEO0FBRUQ7Ozs7Ozs7MENBSXNCO0FBQ3BCLHNDQUFvQixJQUFwQjtBQUNEOzs7b0NBRWU7QUFDZCx3Q0FBc0IsSUFBdEI7QUFDRDtBQUVEOzs7Ozs7dUNBR21CO0FBQ2pCLGFBQU9JLGlDQUFQO0FBQ0Q7OztFQXpCK0NULGtCOzs7QUE0QmxESSxvQkFBb0IsQ0FBQ00sU0FBckIsR0FBaUMsc0JBQWpDO0FBQ0FOLG9CQUFvQixDQUFDTCxZQUFyQixHQUFvQ0EsWUFBcEMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQge0hleGFnb25MYXllcn0gZnJvbSAnZGVjay5nbCc7XG5pbXBvcnQge3BvaW50VG9IZXhiaW59IGZyb20gJy4vaGV4YWdvbi1hZ2dyZWdhdG9yJztcblxuaW1wb3J0IHtnZXRDb2xvclZhbHVlRG9tYWluLCBnZXRDb2xvclNjYWxlRnVuY3Rpb259IGZyb20gJy4uL2xheWVyLXV0aWxzL3V0aWxzJztcbmltcG9ydCBFbmhhbmNlZEhleGFnb25DZWxsTGF5ZXIgZnJvbSAnLi9lbmhhbmNlZC1oZXhhZ29uLWNlbGwtbGF5ZXInO1xuXG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XG4gIC4uLkhleGFnb25MYXllci5kZWZhdWx0UHJvcHMsXG4gIGhleGFnb25BZ2dyZWdhdG9yOiBwb2ludFRvSGV4YmluLFxuICBjb2xvclNjYWxlOiAncXVhbnRpbGUnXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbmhhbmNlZEhleGFnb25MYXllciBleHRlbmRzIEhleGFnb25MYXllciB7XG4gIGdldERpbWVuc2lvblVwZGF0ZXJzKCkge1xuICAgIGNvbnN0IGRpbWVuc2lvblVwZGF0ZXJzID0gc3VwZXIuZ2V0RGltZW5zaW9uVXBkYXRlcnMoKTtcbiAgICAvLyBhZGQgY29sb3JTY2FsZSB0byBkaW1lbnNpb24gdXBkYXRlc1xuICAgIGRpbWVuc2lvblVwZGF0ZXJzLmdldENvbG9yWzFdLnRyaWdnZXJzLnB1c2goJ2NvbG9yU2NhbGUnKTtcbiAgICByZXR1cm4gZGltZW5zaW9uVXBkYXRlcnM7XG4gIH1cblxuICAvKlxuICAgKiBvdmVycmlkZSBkZWZhdWx0IGxheWVyIG1ldGhvZCB0byBjYWxjdWxhdGUgY29sb3IgZG9tYWluXG4gICAqIGFuZCBzY2FsZSBmdW5jdGlvbiBiYXNlIG9uIGNvbG9yIHNjYWxlIHR5cGVcbiAgICovXG4gIGdldENvbG9yVmFsdWVEb21haW4oKSB7XG4gICAgZ2V0Q29sb3JWYWx1ZURvbWFpbih0aGlzKTtcbiAgfVxuXG4gIGdldENvbG9yU2NhbGUoKSB7XG4gICAgZ2V0Q29sb3JTY2FsZUZ1bmN0aW9uKHRoaXMpO1xuICB9XG5cbiAgLypcbiAgICogb3ZlcnJpZGUgZGVmYXVsdCBnZXRTdWJMYXllckNsYXNzIHRvIHJldHVybiBjdXN0b21pemVkIGNlbGxMYXllclxuICAgKi9cbiAgZ2V0U3ViTGF5ZXJDbGFzcygpIHtcbiAgICByZXR1cm4gRW5oYW5jZWRIZXhhZ29uQ2VsbExheWVyO1xuICB9XG59XG5cbkVuaGFuY2VkSGV4YWdvbkxheWVyLmxheWVyTmFtZSA9ICdFbmhhbmNlZEhleGFnb25MYXllcic7XG5FbmhhbmNlZEhleGFnb25MYXllci5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG4iXX0=