"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.gridVisConfigs = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _deck = require("deck.gl");

var _aggregationLayer = _interopRequireDefault(require("../aggregation-layer"));

var _enhancedGridLayer = _interopRequireDefault(require("../../deckgl-layers/grid-layer/enhanced-grid-layer"));

var _gridUtils = require("./grid-utils");

var _gridLayerIcon = _interopRequireDefault(require("./grid-layer-icon"));

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
var gridVisConfigs = {
  opacity: 'opacity',
  worldUnitSize: 'worldUnitSize',
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
exports.gridVisConfigs = gridVisConfigs;

var GridLayer =
/*#__PURE__*/
function (_AggregationLayer) {
  (0, _inherits2.default)(GridLayer, _AggregationLayer);

  function GridLayer(props) {
    var _this;

    (0, _classCallCheck2.default)(this, GridLayer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(GridLayer).call(this, props));

    _this.registerVisConfig(gridVisConfigs);

    _this.visConfigSettings.worldUnitSize.label = 'Grid Size (km)';
    return _this;
  }

  (0, _createClass2.default)(GridLayer, [{
    key: "formatLayerData",
    value: function formatLayerData(_, allData, filteredIndex, oldLayerData) {
      var opt = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var formattedData = (0, _get2.default)((0, _getPrototypeOf2.default)(GridLayer.prototype), "formatLayerData", this).call(this, _, allData, filteredIndex, oldLayerData, opt);
      var getPosition = formattedData.getPosition,
          data = formattedData.data; // TODO: fix this in deck.gl layer

      var cleaned = data.filter(function (d) {
        var pos = getPosition(d);
        return pos.every(Number.isFinite);
      }); // All data processing is done in deck.gl layer

      return (0, _objectSpread2.default)({}, formattedData, {
        data: cleaned
      });
    }
  }, {
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
      var cellSize = visConfig.worldUnitSize * 1000;
      return [new _enhancedGridLayer.default((0, _objectSpread2.default)({}, data, {
        id: this.id,
        idx: idx,
        cellSize: cellSize,
        coverage: visConfig.coverage,
        // highlight
        autoHighlight: visConfig.enable3d,
        // color
        colorRange: this.getColorRange(visConfig.colorRange),
        colorScale: this.config.colorScale,
        opacity: visConfig.opacity,
        upperPercentile: visConfig.percentile[1],
        lowerPercentile: visConfig.percentile[0],
        // elevation
        extruded: visConfig.enable3d,
        elevationScale: visConfig.elevationScale * eleZoomFactor,
        elevationLowerPercentile: visConfig.elevationPercentile[0],
        elevationUpperPercentile: visConfig.elevationPercentile[1],
        // parameters
        parameters: {
          depthTest: Boolean(visConfig.enable3d || mapState.dragRotate)
        },
        // render
        fp64: visConfig['hi-precision'],
        pickable: true,
        lightSettings: this.meta && this.meta.lightSettings,
        // callbacks
        onSetColorDomain: layerCallbacks.onSetLayerDomain
      }))].concat((0, _toConsumableArray2.default)(this.isLayerHovered(objectHovered) && !visConfig.enable3d ? [new _deck.GeoJsonLayer({
        id: "".concat(this.id, "-hovered"),
        data: [(0, _gridUtils.pointToPolygonGeo)({
          object: objectHovered.object,
          cellSize: cellSize,
          coverage: visConfig.coverage,
          mapState: mapState
        })],
        getLineColor: this.config.highlightColor,
        lineWidthScale: 8 * zoomFactor
      })] : []));
    }
  }, {
    key: "type",
    get: function get() {
      return 'grid';
    }
  }, {
    key: "layerIcon",
    get: function get() {
      return _gridLayerIcon.default;
    }
  }]);
  return GridLayer;
}(_aggregationLayer.default);

exports.default = GridLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvZ3JpZC1sYXllci9ncmlkLWxheWVyLmpzIl0sIm5hbWVzIjpbImdyaWRWaXNDb25maWdzIiwib3BhY2l0eSIsIndvcmxkVW5pdFNpemUiLCJjb2xvclJhbmdlIiwiY292ZXJhZ2UiLCJzaXplUmFuZ2UiLCJwZXJjZW50aWxlIiwiZWxldmF0aW9uUGVyY2VudGlsZSIsImVsZXZhdGlvblNjYWxlIiwiY29sb3JBZ2dyZWdhdGlvbiIsInNpemVBZ2dyZWdhdGlvbiIsImVuYWJsZTNkIiwiR3JpZExheWVyIiwicHJvcHMiLCJyZWdpc3RlclZpc0NvbmZpZyIsInZpc0NvbmZpZ1NldHRpbmdzIiwibGFiZWwiLCJfIiwiYWxsRGF0YSIsImZpbHRlcmVkSW5kZXgiLCJvbGRMYXllckRhdGEiLCJvcHQiLCJmb3JtYXR0ZWREYXRhIiwiZ2V0UG9zaXRpb24iLCJkYXRhIiwiY2xlYW5lZCIsImZpbHRlciIsImQiLCJwb3MiLCJldmVyeSIsIk51bWJlciIsImlzRmluaXRlIiwiaWR4Iiwib2JqZWN0SG92ZXJlZCIsIm1hcFN0YXRlIiwiaW50ZXJhY3Rpb24iLCJsYXllckNhbGxiYWNrcyIsInpvb21GYWN0b3IiLCJnZXRab29tRmFjdG9yIiwiZWxlWm9vbUZhY3RvciIsImdldEVsZXZhdGlvblpvb21GYWN0b3IiLCJ2aXNDb25maWciLCJjb25maWciLCJjZWxsU2l6ZSIsIkVuaGFuY2VkR3JpZExheWVyIiwiaWQiLCJhdXRvSGlnaGxpZ2h0IiwiZ2V0Q29sb3JSYW5nZSIsImNvbG9yU2NhbGUiLCJ1cHBlclBlcmNlbnRpbGUiLCJsb3dlclBlcmNlbnRpbGUiLCJleHRydWRlZCIsImVsZXZhdGlvbkxvd2VyUGVyY2VudGlsZSIsImVsZXZhdGlvblVwcGVyUGVyY2VudGlsZSIsInBhcmFtZXRlcnMiLCJkZXB0aFRlc3QiLCJCb29sZWFuIiwiZHJhZ1JvdGF0ZSIsImZwNjQiLCJwaWNrYWJsZSIsImxpZ2h0U2V0dGluZ3MiLCJtZXRhIiwib25TZXRDb2xvckRvbWFpbiIsIm9uU2V0TGF5ZXJEb21haW4iLCJpc0xheWVySG92ZXJlZCIsIkdlb0pzb25MYXllciIsIm9iamVjdCIsImdldExpbmVDb2xvciIsImhpZ2hsaWdodENvbG9yIiwibGluZVdpZHRoU2NhbGUiLCJHcmlkTGF5ZXJJY29uIiwiQWdncmVnYXRpb25MYXllciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUF4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFRTyxJQUFNQSxjQUFjLEdBQUc7QUFDNUJDLEVBQUFBLE9BQU8sRUFBRSxTQURtQjtBQUU1QkMsRUFBQUEsYUFBYSxFQUFFLGVBRmE7QUFHNUJDLEVBQUFBLFVBQVUsRUFBRSxZQUhnQjtBQUk1QkMsRUFBQUEsUUFBUSxFQUFFLFVBSmtCO0FBSzVCQyxFQUFBQSxTQUFTLEVBQUUsZ0JBTGlCO0FBTTVCQyxFQUFBQSxVQUFVLEVBQUUsWUFOZ0I7QUFPNUJDLEVBQUFBLG1CQUFtQixFQUFFLHFCQVBPO0FBUTVCQyxFQUFBQSxjQUFjLEVBQUUsZ0JBUlk7QUFTNUIsa0JBQWdCLGNBVFk7QUFVNUJDLEVBQUFBLGdCQUFnQixFQUFFLGFBVlU7QUFXNUJDLEVBQUFBLGVBQWUsRUFBRSxpQkFYVztBQVk1QkMsRUFBQUEsUUFBUSxFQUFFO0FBWmtCLENBQXZCOzs7SUFlY0MsUzs7Ozs7QUFDbkIscUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQTtBQUNqQiwrR0FBTUEsS0FBTjs7QUFFQSxVQUFLQyxpQkFBTCxDQUF1QmQsY0FBdkI7O0FBQ0EsVUFBS2UsaUJBQUwsQ0FBdUJiLGFBQXZCLENBQXFDYyxLQUFyQyxHQUE2QyxnQkFBN0M7QUFKaUI7QUFLbEI7Ozs7b0NBVWVDLEMsRUFBR0MsTyxFQUFTQyxhLEVBQWVDLFksRUFB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QVVELGFBM0J4QztBQTZCRTtBQUNBRSxRQUFBQSxnQkFBZ0IsRUFBRTFCLGNBQWMsQ0FBQzJCO0FBOUJuQyxTQURGLDBDQW1DTSxLQUFLQyxjQUFMLENBQW9CL0IsYUFBcEIsS0FBc0MsQ0FBQ1EsU0FBUyxDQUFDOUIsUUFBakQsR0FDQSxDQUNFLElBQUlzRCxrQkFBSixDQUFpQjtBQUNmcEIsUUFBQUEsRUFBRSxZQUFLLEtBQUtBLEVBQVYsYUFEYTtBQUVmckIsUUFBQUEsSUFBSSxFQUFFLENBQ0osa0NBQWtCO0FBQ2hCMEMsVUFBQUEsTUFBTSxFQUFFakMsYUFBYSxDQUFDaUMsTUFETjtBQUVoQnZCLFVBQUFBLFFBQVEsRUFBUkEsUUFGZ0I7QUFHaEJ2QyxVQUFBQSxRQUFRLEVBQUVxQyxTQUFTLENBQUNyQyxRQUhKO0FBSWhCOEIsVUFBQUEsUUFBUSxFQUFSQTtBQUpnQixTQUFsQixDQURJLENBRlM7QUFVZmlDLFFBQUFBLFlBQVksRUFBRSxLQUFLekIsTUFBTCxDQUFZMEIsY0FWWDtBQVdmQyxRQUFBQSxjQUFjLEVBQUUsSUFBSWhDO0FBWEwsT0FBakIsQ0FERixDQURBLEdBZ0JBLEVBbkROO0FBcUREOzs7d0JBbEdVO0FBQ1QsYUFBTyxNQUFQO0FBQ0Q7Ozt3QkFFZTtBQUNkLGFBQU9pQyxzQkFBUDtBQUNEOzs7RUFkb0NDLHlCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtHZW9Kc29uTGF5ZXJ9IGZyb20gJ2RlY2suZ2wnO1xuaW1wb3J0IEFnZ3JlZ2F0aW9uTGF5ZXIgZnJvbSAnLi4vYWdncmVnYXRpb24tbGF5ZXInO1xuaW1wb3J0IEVuaGFuY2VkR3JpZExheWVyIGZyb20gJ2RlY2tnbC1sYXllcnMvZ3JpZC1sYXllci9lbmhhbmNlZC1ncmlkLWxheWVyJztcbmltcG9ydCB7cG9pbnRUb1BvbHlnb25HZW99IGZyb20gJy4vZ3JpZC11dGlscyc7XG5pbXBvcnQgR3JpZExheWVySWNvbiBmcm9tICcuL2dyaWQtbGF5ZXItaWNvbic7XG5cbmV4cG9ydCBjb25zdCBncmlkVmlzQ29uZmlncyA9IHtcbiAgb3BhY2l0eTogJ29wYWNpdHknLFxuICB3b3JsZFVuaXRTaXplOiAnd29ybGRVbml0U2l6ZScsXG4gIGNvbG9yUmFuZ2U6ICdjb2xvclJhbmdlJyxcbiAgY292ZXJhZ2U6ICdjb3ZlcmFnZScsXG4gIHNpemVSYW5nZTogJ2VsZXZhdGlvblJhbmdlJyxcbiAgcGVyY2VudGlsZTogJ3BlcmNlbnRpbGUnLFxuICBlbGV2YXRpb25QZXJjZW50aWxlOiAnZWxldmF0aW9uUGVyY2VudGlsZScsXG4gIGVsZXZhdGlvblNjYWxlOiAnZWxldmF0aW9uU2NhbGUnLFxuICAnaGktcHJlY2lzaW9uJzogJ2hpLXByZWNpc2lvbicsXG4gIGNvbG9yQWdncmVnYXRpb246ICdhZ2dyZWdhdGlvbicsXG4gIHNpemVBZ2dyZWdhdGlvbjogJ3NpemVBZ2dyZWdhdGlvbicsXG4gIGVuYWJsZTNkOiAnZW5hYmxlM2QnXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmlkTGF5ZXIgZXh0ZW5kcyBBZ2dyZWdhdGlvbkxheWVyIHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnJlZ2lzdGVyVmlzQ29uZmlnKGdyaWRWaXNDb25maWdzKTtcbiAgICB0aGlzLnZpc0NvbmZpZ1NldHRpbmdzLndvcmxkVW5pdFNpemUubGFiZWwgPSAnR3JpZCBTaXplIChrbSknO1xuICB9XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuICdncmlkJztcbiAgfVxuXG4gIGdldCBsYXllckljb24oKSB7XG4gICAgcmV0dXJuIEdyaWRMYXllckljb247XG4gIH1cblxuICBmb3JtYXRMYXllckRhdGEoXywgYWxsRGF0YSwgZmlsdGVyZWRJbmRleCwgb2xkTGF5ZXJEYXRhLCBvcHQgPSB7fSkge1xuICAgIGNvbnN0IGZvcm1hdHRlZERhdGEgPSBzdXBlci5mb3JtYXRMYXllckRhdGEoXG4gICAgICBfLFxuICAgICAgYWxsRGF0YSxcbiAgICAgIGZpbHRlcmVkSW5kZXgsXG4gICAgICBvbGRMYXllckRhdGEsXG4gICAgICBvcHRcbiAgICApO1xuXG4gICAgY29uc3Qge2dldFBvc2l0aW9uLCBkYXRhfSA9IGZvcm1hdHRlZERhdGE7XG5cbiAgICAvLyBUT0RPOiBmaXggdGhpcyBpbiBkZWNrLmdsIGxheWVyXG4gICAgY29uc3QgY2xlYW5lZCA9IGRhdGEuZmlsdGVyKGQgPT4ge1xuICAgICAgY29uc3QgcG9zID0gZ2V0UG9zaXRpb24oZCk7XG4gICAgICByZXR1cm4gcG9zLmV2ZXJ5KE51bWJlci5pc0Zpbml0ZSk7XG4gICAgfSk7XG5cbiAgICAvLyBBbGwgZGF0YSBwcm9jZXNzaW5nIGlzIGRvbmUgaW4gZGVjay5nbCBsYXllclxuICAgIHJldHVybiB7XG4gICAgICAuLi5mb3JtYXR0ZWREYXRhLFxuICAgICAgZGF0YTogY2xlYW5lZFxuICAgIH07XG4gIH1cblxuICByZW5kZXJMYXllcih7XG4gICAgZGF0YSxcbiAgICBpZHgsXG4gICAgb2JqZWN0SG92ZXJlZCxcbiAgICBtYXBTdGF0ZSxcbiAgICBpbnRlcmFjdGlvbixcbiAgICBsYXllckNhbGxiYWNrc1xuICB9KSB7XG4gICAgY29uc3Qgem9vbUZhY3RvciA9IHRoaXMuZ2V0Wm9vbUZhY3RvcihtYXBTdGF0ZSk7XG4gICAgY29uc3QgZWxlWm9vbUZhY3RvciA9IHRoaXMuZ2V0RWxldmF0aW9uWm9vbUZhY3RvcihtYXBTdGF0ZSk7XG4gICAgY29uc3Qge3Zpc0NvbmZpZ30gPSB0aGlzLmNvbmZpZztcbiAgICBjb25zdCBjZWxsU2l6ZSA9IHZpc0NvbmZpZy53b3JsZFVuaXRTaXplICogMTAwMDtcblxuICAgIHJldHVybiBbXG4gICAgICBuZXcgRW5oYW5jZWRHcmlkTGF5ZXIoe1xuICAgICAgICAuLi5kYXRhLFxuICAgICAgICBpZDogdGhpcy5pZCxcbiAgICAgICAgaWR4LFxuICAgICAgICBjZWxsU2l6ZSxcbiAgICAgICAgY292ZXJhZ2U6IHZpc0NvbmZpZy5jb3ZlcmFnZSxcbiAgICAgICAgLy8gaGlnaGxpZ2h0XG4gICAgICAgIGF1dG9IaWdobGlnaHQ6IHZpc0NvbmZpZy5lbmFibGUzZCxcblxuICAgICAgICAvLyBjb2xvclxuICAgICAgICBjb2xvclJhbmdlOiB0aGlzLmdldENvbG9yUmFuZ2UodmlzQ29uZmlnLmNvbG9yUmFuZ2UpLFxuICAgICAgICBjb2xvclNjYWxlOiB0aGlzLmNvbmZpZy5jb2xvclNjYWxlLFxuICAgICAgICBvcGFjaXR5OiB2aXNDb25maWcub3BhY2l0eSxcbiAgICAgICAgdXBwZXJQZXJjZW50aWxlOiB2aXNDb25maWcucGVyY2VudGlsZVsxXSxcbiAgICAgICAgbG93ZXJQZXJjZW50aWxlOiB2aXNDb25maWcucGVyY2VudGlsZVswXSxcblxuICAgICAgICAvLyBlbGV2YXRpb25cbiAgICAgICAgZXh0cnVkZWQ6IHZpc0NvbmZpZy5lbmFibGUzZCxcbiAgICAgICAgZWxldmF0aW9uU2NhbGU6IHZpc0NvbmZpZy5lbGV2YXRpb25TY2FsZSAqIGVsZVpvb21GYWN0b3IsXG4gICAgICAgIGVsZXZhdGlvbkxvd2VyUGVyY2VudGlsZTogdmlzQ29uZmlnLmVsZXZhdGlvblBlcmNlbnRpbGVbMF0sXG4gICAgICAgIGVsZXZhdGlvblVwcGVyUGVyY2VudGlsZTogdmlzQ29uZmlnLmVsZXZhdGlvblBlcmNlbnRpbGVbMV0sXG4gICAgICAgIC8vIHBhcmFtZXRlcnNcbiAgICAgICAgcGFyYW1ldGVyczoge2RlcHRoVGVzdDogQm9vbGVhbih2aXNDb25maWcuZW5hYmxlM2QgfHwgbWFwU3RhdGUuZHJhZ1JvdGF0ZSl9LFxuXG4gICAgICAgIC8vIHJlbmRlclxuICAgICAgICBmcDY0OiB2aXNDb25maWdbJ2hpLXByZWNpc2lvbiddLFxuICAgICAgICBwaWNrYWJsZTogdHJ1ZSxcbiAgICAgICAgbGlnaHRTZXR0aW5nczogdGhpcy5tZXRhICYmIHRoaXMubWV0YS5saWdodFNldHRpbmdzLFxuXG4gICAgICAgIC8vIGNhbGxiYWNrc1xuICAgICAgICBvblNldENvbG9yRG9tYWluOiBsYXllckNhbGxiYWNrcy5vblNldExheWVyRG9tYWluXG4gICAgICB9KSxcblxuICAgICAgLy8gcmVuZGVyIGFuIG91dGxpbmUgb2YgZWFjaCBjZWxsIGlmIG5vdCBleHRydWRlZFxuICAgICAgLi4uKHRoaXMuaXNMYXllckhvdmVyZWQob2JqZWN0SG92ZXJlZCkgJiYgIXZpc0NvbmZpZy5lbmFibGUzZFxuICAgICAgICA/IFtcbiAgICAgICAgICAgIG5ldyBHZW9Kc29uTGF5ZXIoe1xuICAgICAgICAgICAgICBpZDogYCR7dGhpcy5pZH0taG92ZXJlZGAsXG4gICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICBwb2ludFRvUG9seWdvbkdlbyh7XG4gICAgICAgICAgICAgICAgICBvYmplY3Q6IG9iamVjdEhvdmVyZWQub2JqZWN0LFxuICAgICAgICAgICAgICAgICAgY2VsbFNpemUsXG4gICAgICAgICAgICAgICAgICBjb3ZlcmFnZTogdmlzQ29uZmlnLmNvdmVyYWdlLFxuICAgICAgICAgICAgICAgICAgbWFwU3RhdGVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBnZXRMaW5lQ29sb3I6IHRoaXMuY29uZmlnLmhpZ2hsaWdodENvbG9yLFxuICAgICAgICAgICAgICBsaW5lV2lkdGhTY2FsZTogOCAqIHpvb21GYWN0b3JcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXVxuICAgICAgICA6IFtdKVxuICAgIF07XG4gIH1cbn1cbiJdfQ==