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

var _shaderUtils = require("../layer-utils/shader-utils");

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
function addBrushingVsShader(vs) {
  return (0, _shaderUtils.editShader)(vs, 'scatterplot brushing vs', 'outerRadiusPixels += outline * strokeWidth / 2.0;', 'outerRadiusPixels = brushing_getRadius(instancePositions, outerRadiusPixels + outline * strokeWidth / 2.0);');
}

var defaultProps = (0, _objectSpread2.default)({}, _deck.ScatterplotLayer.defaultProps, {
  enableBrushing: true,
  // brush radius in meters
  brushRadius: 100000,
  mousePosition: [0, 0],
  outsideBrushRadius: 0
});

var ScatterplotBrushingLayer =
/*#__PURE__*/
function (_ScatterplotLayer) {
  (0, _inherits2.default)(ScatterplotBrushingLayer, _ScatterplotLayer);

  function ScatterplotBrushingLayer() {
    (0, _classCallCheck2.default)(this, ScatterplotBrushingLayer);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ScatterplotBrushingLayer).apply(this, arguments));
  }

  (0, _createClass2.default)(ScatterplotBrushingLayer, [{
    key: "getShaders",
    value: function getShaders() {
      var shaders = (0, _get2.default)((0, _getPrototypeOf2.default)(ScatterplotBrushingLayer.prototype), "getShaders", this).call(this);
      return {
        vs: addBrushingVsShader(shaders.vs),
        fs: shaders.fs,
        modules: shaders.modules.concat(['brushing'])
      };
    }
  }, {
    key: "draw",
    value: function draw(opts) {
      var uniforms = opts.uniforms;
      var _this$props = this.props,
          brushRadius = _this$props.brushRadius,
          enableBrushing = _this$props.enableBrushing,
          mousePosition = _this$props.mousePosition,
          outsideBrushRadius = _this$props.outsideBrushRadius; // add uniforms

      (0, _get2.default)((0, _getPrototypeOf2.default)(ScatterplotBrushingLayer.prototype), "draw", this).call(this, (0, _objectSpread2.default)({}, opts, {
        uniforms: (0, _objectSpread2.default)({}, uniforms, {
          brushing_uBrushRadius: brushRadius,
          brushing_uOutsideBrushRadius: outsideBrushRadius,
          brushing_uMousePosition: mousePosition ? new Float32Array(this.unproject(mousePosition)) : defaultProps.mousePosition,
          brushing_uEnableBrushing: enableBrushing ? 1 : 0
        })
      }));
    }
  }]);
  return ScatterplotBrushingLayer;
}(_deck.ScatterplotLayer);

exports.default = ScatterplotBrushingLayer;
ScatterplotBrushingLayer.layerName = 'ScatterplotBrushingLayer';
ScatterplotBrushingLayer.defaultProps = defaultProps;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZWNrZ2wtbGF5ZXJzL3NjYXR0ZXJwbG90LWJydXNoaW5nLWxheWVyL3NjYXR0ZXJwbG90LWJydXNoaW5nLWxheWVyLmpzIl0sIm5hbWVzIjpbImFkZEJydXNoaW5nVnNTaGFkZXIiLCJ2cyIsImRlZmF1bHRQcm9wcyIsIlNjYXR0ZXJwbG90TGF5ZXIiLCJlbmFibGVCcnVzaGluZyIsImJydXNoUmFkaXVzIiwibW91c2VQb3NpdGlvbiIsIm91dHNpZGVCcnVzaFJhZGl1cyIsIlNjYXR0ZXJwbG90QnJ1c2hpbmdMYXllciIsInNoYWRlcnMiLCJmcyIsIm1vZHVsZXMiLCJjb25jYXQiLCJvcHRzIiwidW5pZm9ybXMiLCJwcm9wcyIsImJydXNoaW5nX3VCcnVzaFJhZGl1cyIsImJydXNoaW5nX3VPdXRzaWRlQnJ1c2hSYWRpdXMiLCJicnVzaGluZ191TW91c2VQb3NpdGlvbiIsIkZsb2F0MzJBcnJheSIsInVucHJvamVjdCIsImJydXNoaW5nX3VFbmFibGVCcnVzaGluZyIsImxheWVyTmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0EsU0FBU0EsbUJBQVQsQ0FBNkJDLEVBQTdCLEVBQWlDO0FBQy9CLFNBQU8sNkJBQ0xBLEVBREssRUFFTCx5QkFGSyxFQUdMLG1EQUhLLEVBSUwsNkdBSkssQ0FBUDtBQU1EOztBQUVELElBQU1DLFlBQVksbUNBQ2JDLHVCQUFpQkQsWUFESjtBQUVoQkUsRUFBQUEsY0FBYyxFQUFFLElBRkE7QUFHaEI7QUFDQUMsRUFBQUEsV0FBVyxFQUFFLE1BSkc7QUFLaEJDLEVBQUFBLGFBQWEsRUFBRSxDQUFDLENBQUQsRUFBSSxDQUFKLENBTEM7QUFNaEJDLEVBQUFBLGtCQUFrQixFQUFFO0FBTkosRUFBbEI7O0lBU3FCQyx3Qjs7Ozs7Ozs7Ozs7O2lDQUVOO0FBQ1gsVUFBTUMsT0FBTyx1SEFBYjtBQUNBLGFBQU87QUFDTFIsUUFBQUEsRUFBRSxFQUFFRCxtQkFBbUIsQ0FBQ1MsT0FBTyxDQUFDUixFQUFULENBRGxCO0FBRUxTLFFBQUFBLEVBQUUsRUFBRUQsT0FBTyxDQUFDQyxFQUZQO0FBR0xDLFFBQUFBLE9BQU8sRUFBRUYsT0FBTyxDQUFDRSxPQUFSLENBQWdCQyxNQUFoQixDQUF1QixDQUFDLFVBQUQsQ0FBdkI7QUFISixPQUFQO0FBS0Q7Ozt5QkFDSUMsSSxFQUFNO0FBQUEsVUFDRkMsUUFERSxHQUNVRCxJQURWLENBQ0ZDLFFBREU7QUFBQSx3QkFPTCxLQUFLQyxLQVBBO0FBQUEsVUFHUFYsV0FITyxlQUdQQSxXQUhPO0FBQUEsVUFJUEQsY0FKTyxlQUlQQSxjQUpPO0FBQUEsVUFLUEUsYUFMTyxlQUtQQSxhQUxPO0FBQUEsVUFNUEMsa0JBTk8sZUFNUEEsa0JBTk8sRUFTVDs7QUFDQSxxSkFDS00sSUFETDtBQUVFQyxRQUFBQSxRQUFRLGtDQUNIQSxRQURHO0FBRU5FLFVBQUFBLHFCQUFxQixFQUFFWCxXQUZqQjtBQUdOWSxVQUFBQSw0QkFBNEIsRUFBRVYsa0JBSHhCO0FBSU5XLFVBQUFBLHVCQUF1QixFQUFFWixhQUFhLEdBQ2xDLElBQUlhLFlBQUosQ0FBaUIsS0FBS0MsU0FBTCxDQUFlZCxhQUFmLENBQWpCLENBRGtDLEdBRWxDSixZQUFZLENBQUNJLGFBTlg7QUFPTmUsVUFBQUEsd0JBQXdCLEVBQUVqQixjQUFjLEdBQUcsQ0FBSCxHQUFPO0FBUHpDO0FBRlY7QUFZRDs7O0VBaENtREQsc0I7OztBQW1DdERLLHdCQUF3QixDQUFDYyxTQUF6QixHQUFxQywwQkFBckM7QUFDQWQsd0JBQXdCLENBQUNOLFlBQXpCLEdBQXdDQSxZQUF4QyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7U2NhdHRlcnBsb3RMYXllcn0gZnJvbSAnZGVjay5nbCc7XG5pbXBvcnQge2VkaXRTaGFkZXJ9IGZyb20gJ2RlY2tnbC1sYXllcnMvbGF5ZXItdXRpbHMvc2hhZGVyLXV0aWxzJztcblxuZnVuY3Rpb24gYWRkQnJ1c2hpbmdWc1NoYWRlcih2cykge1xuICByZXR1cm4gZWRpdFNoYWRlcihcbiAgICB2cyxcbiAgICAnc2NhdHRlcnBsb3QgYnJ1c2hpbmcgdnMnLFxuICAgICdvdXRlclJhZGl1c1BpeGVscyArPSBvdXRsaW5lICogc3Ryb2tlV2lkdGggLyAyLjA7JyxcbiAgICAnb3V0ZXJSYWRpdXNQaXhlbHMgPSBicnVzaGluZ19nZXRSYWRpdXMoaW5zdGFuY2VQb3NpdGlvbnMsIG91dGVyUmFkaXVzUGl4ZWxzICsgb3V0bGluZSAqIHN0cm9rZVdpZHRoIC8gMi4wKTsnXG4gICk7XG59XG5cbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcbiAgLi4uU2NhdHRlcnBsb3RMYXllci5kZWZhdWx0UHJvcHMsXG4gIGVuYWJsZUJydXNoaW5nOiB0cnVlLFxuICAvLyBicnVzaCByYWRpdXMgaW4gbWV0ZXJzXG4gIGJydXNoUmFkaXVzOiAxMDAwMDAsXG4gIG1vdXNlUG9zaXRpb246IFswLCAwXSxcbiAgb3V0c2lkZUJydXNoUmFkaXVzOiAwXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2F0dGVycGxvdEJydXNoaW5nTGF5ZXIgZXh0ZW5kcyBTY2F0dGVycGxvdExheWVyIHtcblxuICBnZXRTaGFkZXJzKCkge1xuICAgIGNvbnN0IHNoYWRlcnMgPSBzdXBlci5nZXRTaGFkZXJzKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZzOiBhZGRCcnVzaGluZ1ZzU2hhZGVyKHNoYWRlcnMudnMpLFxuICAgICAgZnM6IHNoYWRlcnMuZnMsXG4gICAgICBtb2R1bGVzOiBzaGFkZXJzLm1vZHVsZXMuY29uY2F0KFsnYnJ1c2hpbmcnXSlcbiAgICB9O1xuICB9XG4gIGRyYXcob3B0cykge1xuICAgIGNvbnN0IHt1bmlmb3Jtc30gPSBvcHRzO1xuICAgIGNvbnN0IHtcbiAgICAgIGJydXNoUmFkaXVzLFxuICAgICAgZW5hYmxlQnJ1c2hpbmcsXG4gICAgICBtb3VzZVBvc2l0aW9uLFxuICAgICAgb3V0c2lkZUJydXNoUmFkaXVzXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAvLyBhZGQgdW5pZm9ybXNcbiAgICBzdXBlci5kcmF3KHtcbiAgICAgIC4uLm9wdHMsXG4gICAgICB1bmlmb3Jtczoge1xuICAgICAgICAuLi51bmlmb3JtcyxcbiAgICAgICAgYnJ1c2hpbmdfdUJydXNoUmFkaXVzOiBicnVzaFJhZGl1cyxcbiAgICAgICAgYnJ1c2hpbmdfdU91dHNpZGVCcnVzaFJhZGl1czogb3V0c2lkZUJydXNoUmFkaXVzLFxuICAgICAgICBicnVzaGluZ191TW91c2VQb3NpdGlvbjogbW91c2VQb3NpdGlvblxuICAgICAgICAgID8gbmV3IEZsb2F0MzJBcnJheSh0aGlzLnVucHJvamVjdChtb3VzZVBvc2l0aW9uKSlcbiAgICAgICAgICA6IGRlZmF1bHRQcm9wcy5tb3VzZVBvc2l0aW9uLFxuICAgICAgICBicnVzaGluZ191RW5hYmxlQnJ1c2hpbmc6IGVuYWJsZUJydXNoaW5nID8gMSA6IDBcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5TY2F0dGVycGxvdEJydXNoaW5nTGF5ZXIubGF5ZXJOYW1lID0gJ1NjYXR0ZXJwbG90QnJ1c2hpbmdMYXllcic7XG5TY2F0dGVycGxvdEJydXNoaW5nTGF5ZXIuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuIl19