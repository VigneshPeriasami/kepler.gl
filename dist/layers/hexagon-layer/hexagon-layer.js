"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.hexagonVisConfigs = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _deck = require("deck.gl");

var _aggregationLayer = _interopRequireDefault(require("../aggregation-layer"));

var _enhancedHexagonLayer = _interopRequireDefault(require("../../deckgl-layers/hexagon-layer/enhanced-hexagon-layer"));

var _hexagonUtils = require("./hexagon-utils");

var _hexagonLayerIcon = _interopRequireDefault(require("./hexagon-layer-icon"));

var _dataUtils = require("../../utils/data-utils");

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
var hexagonVisConfigs = {
  opacity: 'opacity',
  worldUnitSize: 'worldUnitSize',
  resolution: 'resolution',
  colorRange: 'colorRange',
  coverage: 'coverage',
  sizeRange: 'elevationRange',
  percentile: 'percentile',
  elevationPercentile: 'elevationPercentile',
  elevationScale: 'elevationScale',
  'hi-precision': 'hi-precision',
  colorAggregation: 'aggregation',
  sizeAggregation: 'sizeAggregation',
  enable3d: 'enable3d'
};
exports.hexagonVisConfigs = hexagonVisConfigs;

var HexagonLayer =
/*#__PURE__*/
function (_AggregationLayer) {
  (0, _inherits2.default)(HexagonLayer, _AggregationLayer);

  function HexagonLayer(props) {
    var _this;

    (0, _classCallCheck2.default)(this, HexagonLayer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(HexagonLayer).call(this, props));

    _this.registerVisConfig(hexagonVisConfigs);

    _this.visConfigSettings.worldUnitSize.label = 'Hexagon Radius (km)';
    return _this;
  }

  (0, _createClass2.default)(HexagonLayer, [{
    key: "renderLayer",
    value: function renderLayer(_ref) {
      var data = _ref.data,
          idx = _ref.idx,
          objectHovered = _ref.objectHovered,
          mapState = _ref.mapState,
          interaction = _ref.interaction,
          layerCallbacks = _ref.layerCallbacks;
      var zoomFactor = this.getZoomFactor(mapState);
      var eleZoomFactor = this.getElevationZoomFactor(mapState);
      var visConfig = this.config.visConfig;
      var radius = visConfig.worldUnitSize * 1000;
      return [new _enhancedHexagonLayer.default((0, _objectSpread2.default)({}, data, {
        id: this.id,
        idx: idx,
        // highlight
        autoHighlight: visConfig.enable3d,
        radius: radius,
        coverage: visConfig.coverage,
        // color
        colorRange: this.getColorRange(visConfig.colorRange),
        colorScale: this.config.colorScale,
        opacity: visConfig.opacity,
        upperPercentile: visConfig.percentile[1],
        lowerPercentile: visConfig.percentile[0],
        // parameters
        parameters: {
          depthTest: Boolean(visConfig.enable3d || mapState.dragRotate)
        },
        // elevation
        extruded: visConfig.enable3d,
        elevationScale: visConfig.elevationScale * eleZoomFactor,
        elevationLowerPercentile: visConfig.elevationPercentile[0],
        elevationUpperPercentile: visConfig.elevationPercentile[1],
        // render
        fp64: visConfig['hi-precision'],
        pickable: true,
        lightSettings: this.meta.lightSettings,
        // callbacks
        onSetColorDomain: layerCallbacks.onSetLayerDomain
      }))].concat((0, _toConsumableArray2.default)(this.isLayerHovered(objectHovered) && !visConfig.enable3d ? [new _deck.GeoJsonLayer({
        id: "".concat(this.id, "-hovered"),
        data: [(0, _hexagonUtils.hexagonToPolygonGeo)(objectHovered, {}, radius * visConfig.coverage, mapState)],
        getLineColor: this.config.highlightColor,
        lineWidthScale: (0, _dataUtils.clamp)([1, 100], radius * 0.1 * zoomFactor)
      })] : []));
    }
  }, {
    key: "type",
    get: function get() {
      return 'hexagon';
    }
  }, {
    key: "name",
    get: function get() {
      return 'Hexbin';
    }
  }, {
    key: "layerIcon",
    get: function get() {
      return _hexagonLayerIcon.default;
    }
  }]);
  return HexagonLayer;
}(_aggregationLayer.default);

exports.default = HexagonLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvaGV4YWdvbi1sYXllci9oZXhhZ29uLWxheWVyLmpzIl0sIm5hbWVzIjpbImhleGFnb25WaXNDb25maWdzIiwib3BhY2l0eSIsIndvcmxkVW5pdFNpemUiLCJyZXNvbHV0aW9uIiwiY29sb3JSYW5nZSIsImNvdmVyYWdlIiwic2l6ZVJhbmdlIiwicGVyY2VudGlsZSIsImVsZXZhdGlvblBlcmNlbnRpbGUiLCJlbGV2YXRpb25TY2FsZSIsImNvbG9yQWdncmVnYXRpb24iLCJzaXplQWdncmVnYXRpb24iLCJlbmFibGUzZCIsIkhleGFnb25MYXllciIsInByb3BzIiwicmVnaXN0ZXJWaXNDb25maWciLCJ2aXNDb25maWdTZXR0aW5ncyIsImxhYmVsIiwiZGF0YSIsImlkeCIsIm9iamVjdEhvdmVyZWQiLCJtYXBTdGF0ZSIsImludGVyYWN0aW9uIiwibGF5ZXJDYWxsYmFja3MiLCJ6b29tRmFjdG9yIiwiZ2V0Wm9vbUZhY3RvciIsImVsZVpvb21GYWN0b3IiLCJnZXRFbGV2YXRpb25ab29tRmFjdG9yIiwidmlzQ29uZmlnIiwiY29uZmlnIiwicmFkaXVzIiwiRW5oYW5jZWRIZXhhZ29uTGF5ZXIiLCJpZCIsImF1dG9IaWdobGlnaHQiLCJnZXRDb2xvclJhbmdlIiwiY29sb3JTY2FsZSIsInVwcGVyUGVyY2VudGlsZSIsImxvd2VyUGVyY2VudGlsZSIsInBhcmFtZXRlcnMiLCJkZXB0aFRlc3QiLCJCb29sZWFuIiwiZHJhZ1JvdGF0ZSIsImV4dHJ1ZGVkIiwiZWxldmF0aW9uTG93ZXJQZXJjZW50aWxlIiwiZWxldmF0aW9uVXBwZXJQZXJjZW50aWxlIiwiZnA2NCIsInBpY2thYmxlIiwibGlnaHRTZXR0aW5ncyIsIm1ldGEiLCJvblNldENvbG9yRG9tYWluIiwib25TZXRMYXllckRvbWFpbiIsImlzTGF5ZXJIb3ZlcmVkIiwiR2VvSnNvbkxheWVyIiwiZ2V0TGluZUNvbG9yIiwiaGlnaGxpZ2h0Q29sb3IiLCJsaW5lV2lkdGhT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ZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7R2VvSnNvbkxheWVyfSBmcm9tICdkZWNrLmdsJztcbmltcG9ydCBBZ2dyZWdhdGlvbkxheWVyIGZyb20gJy4uL2FnZ3JlZ2F0aW9uLWxheWVyJztcbmltcG9ydCBFbmhhbmNlZEhleGFnb25MYXllciBmcm9tICdkZWNrZ2wtbGF5ZXJzL2hleGFnb24tbGF5ZXIvZW5oYW5jZWQtaGV4YWdvbi1sYXllcic7XG5pbXBvcnQge2hleGFnb25Ub1BvbHlnb25HZW99IGZyb20gJy4vaGV4YWdvbi11dGlscyc7XG5pbXBvcnQgSGV4YWdvbkxheWVySWNvbiBmcm9tICcuL2hleGFnb24tbGF5ZXItaWNvbic7XG5pbXBvcnQge2NsYW1wfSBmcm9tICd1dGlscy9kYXRhLXV0aWxzJztcblxuZXhwb3J0IGNvbnN0IGhleGFnb25WaXNDb25maWdzID0ge1xuICBvcGFjaXR5OiAnb3BhY2l0eScsXG4gIHdvcmxkVW5pdFNpemU6ICd3b3JsZFVuaXRTaXplJyxcbiAgcmVzb2x1dGlvbjogJ3Jlc29sdXRpb24nLFxuICBjb2xvclJhbmdlOiAnY29sb3JSYW5nZScsXG4gIGNvdmVyYWdlOiAnY292ZXJhZ2UnLFxuICBzaXplUmFuZ2U6ICdlbGV2YXRpb25SYW5nZScsXG4gIHBlcmNlbnRpbGU6ICdwZXJjZW50aWxlJyxcbiAgZWxldmF0aW9uUGVyY2VudGlsZTogJ2VsZXZhdGlvblBlcmNlbnRpbGUnLFxuICBlbGV2YXRpb25TY2FsZTogJ2VsZXZhdGlvblNjYWxlJyxcbiAgJ2hpLXByZWNpc2lvbic6ICdoaS1wcmVjaXNpb24nLFxuICBjb2xvckFnZ3JlZ2F0aW9uOiAnYWdncmVnYXRpb24nLFxuICBzaXplQWdncmVnYXRpb246ICdzaXplQWdncmVnYXRpb24nLFxuICBlbmFibGUzZDogJ2VuYWJsZTNkJ1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGV4YWdvbkxheWVyIGV4dGVuZHMgQWdncmVnYXRpb25MYXllciB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5yZWdpc3RlclZpc0NvbmZpZyhoZXhhZ29uVmlzQ29uZmlncyk7XG4gICAgdGhpcy52aXNDb25maWdTZXR0aW5ncy53b3JsZFVuaXRTaXplLmxhYmVsID0gJ0hleGFnb24gUmFkaXVzIChrbSknO1xuICB9XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuICdoZXhhZ29uJztcbiAgfVxuXG4gIGdldCBuYW1lKCkge1xuICAgIHJldHVybiAnSGV4YmluJztcbiAgfVxuXG4gIGdldCBsYXllckljb24oKSB7XG4gICAgcmV0dXJuIEhleGFnb25MYXllckljb247XG4gIH1cblxuICByZW5kZXJMYXllcih7XG4gICAgZGF0YSxcbiAgICBpZHgsXG4gICAgb2JqZWN0SG92ZXJlZCxcbiAgICBtYXBTdGF0ZSxcbiAgICBpbnRlcmFjdGlvbixcbiAgICBsYXllckNhbGxiYWNrc1xuICB9KSB7XG4gICAgY29uc3Qgem9vbUZhY3RvciA9IHRoaXMuZ2V0Wm9vbUZhY3RvcihtYXBTdGF0ZSk7XG4gICAgY29uc3QgZWxlWm9vbUZhY3RvciA9IHRoaXMuZ2V0RWxldmF0aW9uWm9vbUZhY3RvcihtYXBTdGF0ZSk7XG4gICAgY29uc3Qge3Zpc0NvbmZpZ30gPSB0aGlzLmNvbmZpZztcbiAgICBjb25zdCByYWRpdXMgPSB2aXNDb25maWcud29ybGRVbml0U2l6ZSAqIDEwMDA7XG5cbiAgICByZXR1cm4gW1xuICAgICAgbmV3IEVuaGFuY2VkSGV4YWdvbkxheWVyKHtcbiAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICAgIGlkeCxcblxuICAgICAgICAvLyBoaWdobGlnaHRcbiAgICAgICAgYXV0b0hpZ2hsaWdodDogdmlzQ29uZmlnLmVuYWJsZTNkLFxuXG4gICAgICAgIHJhZGl1cyxcbiAgICAgICAgY292ZXJhZ2U6IHZpc0NvbmZpZy5jb3ZlcmFnZSxcblxuICAgICAgICAvLyBjb2xvclxuICAgICAgICBjb2xvclJhbmdlOiB0aGlzLmdldENvbG9yUmFuZ2UodmlzQ29uZmlnLmNvbG9yUmFuZ2UpLFxuICAgICAgICBjb2xvclNjYWxlOiB0aGlzLmNvbmZpZy5jb2xvclNjYWxlLFxuICAgICAgICBvcGFjaXR5OiB2aXNDb25maWcub3BhY2l0eSxcbiAgICAgICAgdXBwZXJQZXJjZW50aWxlOiB2aXNDb25maWcucGVyY2VudGlsZVsxXSxcbiAgICAgICAgbG93ZXJQZXJjZW50aWxlOiB2aXNDb25maWcucGVyY2VudGlsZVswXSxcblxuICAgICAgICAvLyBwYXJhbWV0ZXJzXG4gICAgICAgIHBhcmFtZXRlcnM6IHtkZXB0aFRlc3Q6IEJvb2xlYW4odmlzQ29uZmlnLmVuYWJsZTNkIHx8IG1hcFN0YXRlLmRyYWdSb3RhdGUpfSxcblxuICAgICAgICAvLyBlbGV2YXRpb25cbiAgICAgICAgZXh0cnVkZWQ6IHZpc0NvbmZpZy5lbmFibGUzZCxcbiAgICAgICAgZWxldmF0aW9uU2NhbGU6IHZpc0NvbmZpZy5lbGV2YXRpb25TY2FsZSAqIGVsZVpvb21GYWN0b3IsXG4gICAgICAgIGVsZXZhdGlvbkxvd2VyUGVyY2VudGlsZTogdmlzQ29uZmlnLmVsZXZhdGlvblBlcmNlbnRpbGVbMF0sXG4gICAgICAgIGVsZXZhdGlvblVwcGVyUGVyY2VudGlsZTogdmlzQ29uZmlnLmVsZXZhdGlvblBlcmNlbnRpbGVbMV0sXG5cbiAgICAgICAgLy8gcmVuZGVyXG4gICAgICAgIGZwNjQ6IHZpc0NvbmZpZ1snaGktcHJlY2lzaW9uJ10sXG4gICAgICAgIHBpY2thYmxlOiB0cnVlLFxuICAgICAgICBsaWdodFNldHRpbmdzOiB0aGlzLm1ldGEubGlnaHRTZXR0aW5ncyxcbiAgICAgICAgLy8gY2FsbGJhY2tzXG4gICAgICAgIG9uU2V0Q29sb3JEb21haW46IGxheWVyQ2FsbGJhY2tzLm9uU2V0TGF5ZXJEb21haW5cbiAgICAgIH0pLFxuXG4gICAgICAvLyByZW5kZXIgYW4gb3V0bGluZSBvZiBlYWNoIGhleGFnb24gaWYgbm90IGV4dHJ1ZGVkXG4gICAgICAuLi4odGhpcy5pc0xheWVySG92ZXJlZChvYmplY3RIb3ZlcmVkKSAmJiAhdmlzQ29uZmlnLmVuYWJsZTNkXG4gICAgICAgID8gW1xuICAgICAgICAgICAgbmV3IEdlb0pzb25MYXllcih7XG4gICAgICAgICAgICAgIGlkOiBgJHt0aGlzLmlkfS1ob3ZlcmVkYCxcbiAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgIGhleGFnb25Ub1BvbHlnb25HZW8oXG4gICAgICAgICAgICAgICAgICBvYmplY3RIb3ZlcmVkLFxuICAgICAgICAgICAgICAgICAge30sXG4gICAgICAgICAgICAgICAgICByYWRpdXMgKiB2aXNDb25maWcuY292ZXJhZ2UsXG4gICAgICAgICAgICAgICAgICBtYXBTdGF0ZVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgZ2V0TGluZUNvbG9yOiB0aGlzLmNvbmZpZy5oaWdobGlnaHRDb2xvcixcbiAgICAgICAgICAgICAgbGluZVdpZHRoU2NhbGU6IGNsYW1wKFsxLCAxMDBdLCByYWRpdXMgKiAwLjEgKiB6b29tRmFjdG9yKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdXG4gICAgICAgIDogW10pXG4gICAgXTtcbiAgfVxufVxuIl19