"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.HexagonIdVisConfigs = exports.hexIdResolver = exports.hexIdAccessor = exports.hexIdRequiredColumns = exports.HEXAGON_ID_FIELDS = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _lodash = _interopRequireDefault(require("lodash.memoize"));

var _baseLayer = _interopRequireDefault(require("../base-layer"));

var _deck = require("deck.gl");

var _h3HexagonCellLayer = _interopRequireDefault(require("../../deckgl-layers/h3-hexagon-cell-layer/h3-hexagon-cell-layer"));

var _h3Utils = require("./h3-utils");

var _h3HexagonLayerIcon = _interopRequireDefault(require("./h3-hexagon-layer-icon"));

var _defaultSettings = require("../../constants/default-settings");

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
var HEXAGON_ID_FIELDS = {
  hex_id: ['hex_id', 'hexagon_id', 'h3_id']
};
exports.HEXAGON_ID_FIELDS = HEXAGON_ID_FIELDS;
var hexIdRequiredColumns = ['hex_id'];
exports.hexIdRequiredColumns = hexIdRequiredColumns;

var hexIdAccessor = function hexIdAccessor(_ref) {
  var hex_id = _ref.hex_id;
  return function (d) {
    return d[hex_id.fieldIdx];
  };
};

exports.hexIdAccessor = hexIdAccessor;

var hexIdResolver = function hexIdResolver(_ref2) {
  var hex_id = _ref2.hex_id;
  return hex_id.fieldIdx;
};

exports.hexIdResolver = hexIdResolver;
var HexagonIdVisConfigs = {
  opacity: 'opacity',
  colorRange: 'colorRange',
  coverage: 'coverage',
  sizeRange: 'elevationRange',
  coverageRange: 'coverageRange',
  elevationScale: 'elevationScale',
  'hi-precision': 'hi-precision'
};
exports.HexagonIdVisConfigs = HexagonIdVisConfigs;

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var r = parseInt(result[1], 16);
  var g = parseInt(result[2], 16);
  var b = parseInt(result[3], 16);
  return [r, g, b];
}

var HexagonIdLayer =
/*#__PURE__*/
function (_Layer) {
  (0, _inherits2.default)(HexagonIdLayer, _Layer);

  function HexagonIdLayer(props) {
    var _this;

    (0, _classCallCheck2.default)(this, HexagonIdLayer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(HexagonIdLayer).call(this, props));

    _this.registerVisConfig(HexagonIdVisConfigs);

    _this.getHexId = (0, _lodash.default)(hexIdAccessor, hexIdResolver);
    return _this;
  }

  (0, _createClass2.default)(HexagonIdLayer, [{
    key: "getDefaultLayerConfig",
    value: function getDefaultLayerConfig() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return (0, _objectSpread2.default)({}, (0, _get2.default)((0, _getPrototypeOf2.default)(HexagonIdLayer.prototype), "getDefaultLayerConfig", this).call(this, props), {
        // add height visual channel
        coverageField: null,
        coverageDomain: [0, 1],
        coverageScale: 'linear'
      });
    } // TODO: fix complexity

    /* eslint-disable complexity */

  }, {
    key: "formatLayerData",
    value: function formatLayerData(_, allData, filteredIndex, oldLayerData) {
      var _this2 = this;

      var opt = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var _this$config = this.config,
          colorScale = _this$config.colorScale,
          colorDomain = _this$config.colorDomain,
          colorField = _this$config.colorField,
          color = _this$config.color,
          columns = _this$config.columns,
          sizeField = _this$config.sizeField,
          sizeScale = _this$config.sizeScale,
          sizeDomain = _this$config.sizeDomain,
          coverageField = _this$config.coverageField,
          coverageScale = _this$config.coverageScale,
          coverageDomain = _this$config.coverageDomain,
          _this$config$visConfi = _this$config.visConfig,
          sizeRange = _this$config$visConfi.sizeRange,
          colorRange = _this$config$visConfi.colorRange,
          coverageRange = _this$config$visConfi.coverageRange; // color

      var cScale = colorField && this.getVisChannelScale(colorScale, colorDomain, colorRange.colors.map(function (c) {
        return hexToRgb(c);
      })); // height

      var sScale = sizeField && this.getVisChannelScale(sizeScale, sizeDomain, sizeRange); // coverage

      var coScale = coverageField && this.getVisChannelScale(coverageScale, coverageDomain, coverageRange);
      var getHexId = this.getHexId(columns);

      if (!oldLayerData || oldLayerData.getHexId !== getHexId) {
        this.updateLayerMeta(allData, getHexId);
      }

      var data;

      if (oldLayerData && oldLayerData.data && opt.sameData && oldLayerData.getHexId === getHexId) {
        data = oldLayerData.data;
      } else {
        data = filteredIndex.reduce(function (accu, index, i) {
          var id = getHexId(allData[index]);
          var centroid = _this2.dataToFeature.centroids[index];

          if (centroid) {
            accu.push({
              // keep a reference to the original data index
              index: i,
              data: allData[index],
              id: id,
              centroid: centroid
            });
          }

          return accu;
        }, []);
      }

      var getElevation = sScale ? function (d) {
        return _this2.getEncodedChannelValue(sScale, d.data, sizeField, 0);
      } : 0;
      var getColor = cScale ? function (d) {
        return _this2.getEncodedChannelValue(cScale, d.data, colorField);
      } : color;
      var getCoverage = coScale ? function (d) {
        return _this2.getEncodedChannelValue(coScale, d.data, coverageField, 0);
      } : 1; // const layerData = {

      return {
        data: data,
        getElevation: getElevation,
        getColor: getColor,
        getHexId: getHexId,
        getCoverage: getCoverage,
        hexagonVertices: this.dataToFeature.hexagonVertices,
        hexagonCenter: this.dataToFeature.hexagonCenter
      };
    }
    /* eslint-enable complexity */

  }, {
    key: "updateLayerMeta",
    value: function updateLayerMeta(allData, getHexId) {
      var hexagonVertices;
      var hexagonCenter;
      var centroids = {};
      allData.forEach(function (d, index) {
        var id = getHexId(d);

        if (typeof id !== 'string' || !id.length) {
          return;
        } // find hexagonVertices
        // only need 1 instance of hexagonVertices


        if (!hexagonVertices) {
          hexagonVertices = id && (0, _h3Utils.getVertices)({
            id: id
          });
          hexagonCenter = id && (0, _h3Utils.getCentroid)({
            id: id
          });
        } // save a reference of centroids to dataToFeature
        // so we don't have to re calculate it again


        centroids[index] = (0, _h3Utils.getCentroid)({
          id: id
        });
      });
      var bounds = this.getPointsBounds(Object.values(centroids), function (d) {
        return d;
      });
      var lightSettings = this.getLightSettingsFromBounds(bounds);
      this.dataToFeature = {
        hexagonVertices: hexagonVertices,
        hexagonCenter: hexagonCenter,
        centroids: centroids
      };
      this.updateMeta({
        bounds: bounds,
        lightSettings: lightSettings
      });
    }
  }, {
    key: "renderLayer",
    value: function renderLayer(_ref3) {
      var data = _ref3.data,
          idx = _ref3.idx,
          layerInteraction = _ref3.layerInteraction,
          objectHovered = _ref3.objectHovered,
          mapState = _ref3.mapState,
          interactionConfig = _ref3.interactionConfig;
      var zoomFactor = this.getZoomFactor(mapState);
      var eleZoomFactor = this.getElevationZoomFactor(mapState);
      var config = this.config,
          meta = this.meta;
      var visConfig = config.visConfig;
      var updateTriggers = {
        getColor: {
          color: config.color,
          colorField: config.colorField,
          colorRange: config.visConfig.colorRange,
          colorScale: config.colorScale
        },
        getElevation: {
          sizeField: config.sizeField,
          sizeRange: config.visConfig.sizeRange
        },
        getCoverage: {
          coverageField: config.coverageField,
          coverageRange: config.visConfig.coverageRange
        }
      };
      return [new _h3HexagonCellLayer.default((0, _objectSpread2.default)({}, layerInteraction, data, {
        id: this.id,
        idx: idx,
        pickable: true,
        // coverage
        coverage: config.coverageField ? 1 : visConfig.coverage,
        // parameters
        parameters: {
          depthTest: Boolean(config.sizeField || mapState.dragRotate)
        },
        // highlight
        autoHighlight: Boolean(config.sizeField),
        // elevation
        extruded: Boolean(config.sizeField),
        elevationScale: visConfig.elevationScale * eleZoomFactor,
        // color
        opacity: visConfig.opacity,
        // render
        lightSettings: meta.lightSettings,
        updateTriggers: updateTriggers
      }))].concat((0, _toConsumableArray2.default)(this.isLayerHovered(objectHovered) && !config.sizeField ? [new _deck.GeoJsonLayer({
        id: "".concat(this.id, "-hovered"),
        data: [(0, _h3Utils.idToPolygonGeo)(objectHovered)],
        getLineColor: config.highlightColor,
        lineWidthScale: 8 * zoomFactor
      })] : []));
    }
  }, {
    key: "type",
    get: function get() {
      return 'hexagonId';
    }
  }, {
    key: "name",
    get: function get() {
      return 'H3';
    }
  }, {
    key: "requiredLayerColumns",
    get: function get() {
      return hexIdRequiredColumns;
    }
  }, {
    key: "layerIcon",
    get: function get() {
      // use hexagon layer icon for now
      return _h3HexagonLayerIcon.default;
    }
  }, {
    key: "visualChannels",
    get: function get() {
      return (0, _objectSpread2.default)({}, (0, _get2.default)((0, _getPrototypeOf2.default)(HexagonIdLayer.prototype), "visualChannels", this), {
        size: (0, _objectSpread2.default)({}, (0, _get2.default)((0, _getPrototypeOf2.default)(HexagonIdLayer.prototype), "visualChannels", this).size, {
          property: 'height'
        }),
        coverage: {
          property: 'coverage',
          field: 'coverageField',
          scale: 'coverageScale',
          domain: 'coverageDomain',
          range: 'coverageRange',
          key: 'coverage',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.radius
        }
      });
    }
  }], [{
    key: "findDefaultLayerProps",
    value: function findDefaultLayerProps(_ref4) {
      var fields = _ref4.fields;
      var foundColumns = this.findDefaultColumnField(HEXAGON_ID_FIELDS, fields);

      if (!foundColumns || !foundColumns.length) {
        return null;
      }

      return foundColumns.map(function (columns) {
        return {
          isVisible: true,
          label: 'H3 Hexagon',
          columns: columns
        };
      });
    }
  }]);
  return HexagonIdLayer;
}(_baseLayer.default);

exports.default = HexagonIdLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvaDMtaGV4YWdvbi1sYXllci9oMy1oZXhhZ29uLWxheWVyLmpzIl0sIm5hbWVzIjpbIkhFWEFHT05fSURfRklFTERTIiwiaGV4X2lkIiwiaGV4SWRSZXF1aXJlZENvbHVtbnMiLCJoZXhJZEFjY2Vzc29yIiwiZCIsImZpZWxkSWR4IiwiaGV4SWRSZXNvbHZlciIsIkhleGFnb25JZFZpc0NvbmZpZ3MiLCJvcGFjaXR5IiwiY29sb3JSYW5nZSIsImNvdmVyYWdlIiwic2l6ZVJhbmdlIiwiY292ZXJhZ2VSYW5nZSIsImVsZXZhdGlvblNjYWxlIiwiaGV4VG9SZ2IiLCJoZXgiLCJyZXN1bHQiLCJleGVjIiwiciIsInBhcnNlSW50IiwiZyIsImIiLCJIZXhhZ29uSWRMYXllciIsInByb3BzIiwicmVnaXN0ZXJWaXNDb25maWciLCJnZXRIZXhJZCIsImNvdmVyYWdlRmllbGQiLCJjb3ZlcmFnZURvbWFpbiIsImNvdmVyYWdlU2NhbGUiLCJfIiwiYWxsRGF0YSIsImZpbHRlcmVkSW5kZXgiLCJvbGRMYXllckRhdGEiLCJvcHQiLCJjb25maWciLCJjb2xvclNjYWxlIiwiY29sb3JEb21haW4iLCJjb2xvckZpZWxkIiwiY29sb3IiLCJjb2x1bW5zIiwic2l6ZUZpZWxkIiwic2l6ZVNjYWxlIiwic2l6ZURvbWFpbiIsInZpc0NvbmZpZyIsImNTY2FsZSIsImdldFZpc0NoYW5uZWxTY2FsZSIsImNvbG9ycyIsIm1hcCIsImMiLCJzU2NhbGUiLCJjb1NjYWxlIiwidXBkYXRlTGF5ZXJNZXRhIiwiZGF0YSIsInNhbWVEYXRhIiwicmVkdWNlIiwiYWNjdSIsImluZGV4IiwiaSIsImlkIiwiY2VudHJvaWQiLCJkYXRhVG9GZWF0dXJlIiwiY2VudHJvaWRzIiwicHVzaCIsImdldEVsZXZhdGlvbiIsImdldEVuY29kZWRDaGFubmVsVmFsdWUiLCJnZXRDb2xvciIsImdldENvdmVyYWdlIiwiaGV4YWdvblZlcnRpY2VzIiwiaGV4YWdvbkNlbnRlciIsImZvckVhY2giLCJsZW5ndGgiLCJib3VuZHMiLCJnZXRQb2ludHNCb3VuZHMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJsaWdodFNldHRpbmdzIiwiZ2V0TGlnaHRTZXR0aW5nc0Zyb21Cb3VuZHMiLCJ1cGRhdGVNZXRhIiwiaWR4IiwibGF5ZXJJbnRlcmFjdGlvbiIsIm9iamVjdEhvdmVyZWQiLCJtYXBTdGF0ZSIsImludGVyYWN0aW9uQ29uZmlnIiwiem9vbUZhY3RvciIsImdldFpvb21GYWN0b3IiLCJlbGVab29tRmFjdG9yIiwiZ2V0RWxldmF0aW9uWm9vbUZhY3RvciIsIm1ldGEiLCJ1cGRhdGVUcmlnZ2VycyIsIkgzSGV4YWdvbkNlbGxMYXllciIsInBpY2thYmxlIiwicGFyYW1ldGVycyIsImRlcHRoVGVzdCIsIkJvb2xlYW4iLCJkcmFnUm90YXRlIiwiYXV0b0hpZ2hsaWdodCIsImV4dHJ1ZGVkIiwiaXNMYXllckhvdmVyZWQiLCJHZW9Kc29uTGF5ZXIiLCJnZXRMaW5lQ29sb3IiLCJoaWdobGlnaHRDb2xvciIsImxpbmVXaWR0aFNjYWxlIiwiSDNIZXhhZ29uTGF5ZXJJY29uIiwic2l6ZSIsInByb3BlcnR5IiwiZmllbGQiLCJzY2FsZSIsImRvbWFpbiIsInJhbmdlIiwia2V5IiwiY2hhbm5lbFNjYWxlVHlwZSIsIkNIQU5ORUxfU0NBTEVTIiwicmFkaXVzIiwiZmllbGRzIiwiZm91bmRDb2x1bW5zIiwiZmluZERlZmF1bHRDb2x1bW5GaWVsZCIsImlzVmlzaWJsZSIsImxhYmVsIiwiTGF5ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBV08sSUFBTUEsaUJBQWlCLEdBQUc7QUFDL0JDLEVBQUFBLE1BQU0sRUFB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LFlBQVksQ0FBQzVDLE1BQW5DLEVBQTJDO0FBQ3pDLGVBQU8sSUFBUDtBQUNEOztBQUVELGFBQU80QyxZQUFZLENBQUNuRSxHQUFiLENBQWlCLFVBQUFSLE9BQU87QUFBQSxlQUFLO0FBQ2xDNkUsVUFBQUEsU0FBUyxFQUFFLElBRHVCO0FBRWxDQyxVQUFBQSxLQUFLLEVBQUUsWUFGMkI7QUFHbEM5RSxVQUFBQSxPQUFPLEVBQVBBO0FBSGtDLFNBQUw7QUFBQSxPQUF4QixDQUFQO0FBS0Q7OztFQXREeUMrRSxrQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBtZW1vaXplIGZyb20gJ2xvZGFzaC5tZW1vaXplJztcblxuaW1wb3J0IExheWVyIGZyb20gJy4uL2Jhc2UtbGF5ZXInO1xuaW1wb3J0IHtHZW9Kc29uTGF5ZXJ9IGZyb20gJ2RlY2suZ2wnO1xuaW1wb3J0IEgzSGV4YWdvbkNlbGxMYXllciBmcm9tICdkZWNrZ2wtbGF5ZXJzL2gzLWhleGFnb24tY2VsbC1sYXllci9oMy1oZXhhZ29uLWNlbGwtbGF5ZXInO1xuaW1wb3J0IHtnZXRWZXJ0aWNlcywgZ2V0Q2VudHJvaWQsIGlkVG9Qb2x5Z29uR2VvfSBmcm9tICcuL2gzLXV0aWxzJztcbmltcG9ydCBIM0hleGFnb25MYXllckljb24gZnJvbSAnLi9oMy1oZXhhZ29uLWxheWVyLWljb24nO1xuaW1wb3J0IHtDSEFOTkVMX1NDQUxFU30gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuXG5leHBvcnQgY29uc3QgSEVYQUdPTl9JRF9GSUVMRFMgPSB7XG4gIGhleF9pZDogWydoZXhfaWQnLCAnaGV4YWdvbl9pZCcsICdoM19pZCddXG59O1xuXG5leHBvcnQgY29uc3QgaGV4SWRSZXF1aXJlZENvbHVtbnMgPSBbJ2hleF9pZCddO1xuZXhwb3J0IGNvbnN0IGhleElkQWNjZXNzb3IgPSAoe2hleF9pZH0pID0+IGQgPT4gZFtoZXhfaWQuZmllbGRJZHhdO1xuZXhwb3J0IGNvbnN0IGhleElkUmVzb2x2ZXIgPSAoe2hleF9pZH0pID0+IGhleF9pZC5maWVsZElkeDtcblxuZXhwb3J0IGNvbnN0IEhleGFnb25JZFZpc0NvbmZpZ3MgPSB7XG4gIG9wYWNpdHk6ICdvcGFjaXR5JyxcbiAgY29sb3JSYW5nZTogJ2NvbG9yUmFuZ2UnLFxuICBjb3ZlcmFnZTogJ2NvdmVyYWdlJyxcbiAgc2l6ZVJhbmdlOiAnZWxldmF0aW9uUmFuZ2UnLFxuICBjb3ZlcmFnZVJhbmdlOiAnY292ZXJhZ2VSYW5nZScsXG4gIGVsZXZhdGlvblNjYWxlOiAnZWxldmF0aW9uU2NhbGUnLFxuICAnaGktcHJlY2lzaW9uJzogJ2hpLXByZWNpc2lvbidcbn07XG5cbmZ1bmN0aW9uIGhleFRvUmdiKGhleCkge1xuICBjb25zdCByZXN1bHQgPSAvXiM/KFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pJC9pLmV4ZWMoaGV4KTtcblxuICBjb25zdCByID0gcGFyc2VJbnQocmVzdWx0WzFdLCAxNik7XG4gIGNvbnN0IGcgPSBwYXJzZUludChyZXN1bHRbMl0sIDE2KTtcbiAgY29uc3QgYiA9IHBhcnNlSW50KHJlc3VsdFszXSwgMTYpO1xuXG4gIHJldHVybiBbciwgZywgYl07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhleGFnb25JZExheWVyIGV4dGVuZHMgTGF5ZXIge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnJlZ2lzdGVyVmlzQ29uZmlnKEhleGFnb25JZFZpc0NvbmZpZ3MpO1xuICAgIHRoaXMuZ2V0SGV4SWQgPSBtZW1vaXplKGhleElkQWNjZXNzb3IsIGhleElkUmVzb2x2ZXIpO1xuICB9XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuICdoZXhhZ29uSWQnO1xuICB9XG5cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuICdIMyc7XG4gIH1cblxuICBnZXQgcmVxdWlyZWRMYXllckNvbHVtbnMoKSB7XG4gICAgcmV0dXJuIGhleElkUmVxdWlyZWRDb2x1bW5zO1xuICB9XG5cbiAgZ2V0IGxheWVySWNvbigpIHtcbiAgICAvLyB1c2UgaGV4YWdvbiBsYXllciBpY29uIGZvciBub3dcbiAgICByZXR1cm4gSDNIZXhhZ29uTGF5ZXJJY29uO1xuICB9XG5cbiAgZ2V0IHZpc3VhbENoYW5uZWxzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdXBlci52aXN1YWxDaGFubmVscyxcbiAgICAgIHNpemU6IHtcbiAgICAgICAgLi4uc3VwZXIudmlzdWFsQ2hhbm5lbHMuc2l6ZSxcbiAgICAgICAgcHJvcGVydHk6ICdoZWlnaHQnXG4gICAgICB9LFxuICAgICAgY292ZXJhZ2U6IHtcbiAgICAgICAgcHJvcGVydHk6ICdjb3ZlcmFnZScsXG4gICAgICAgIGZpZWxkOiAnY292ZXJhZ2VGaWVsZCcsXG4gICAgICAgIHNjYWxlOiAnY292ZXJhZ2VTY2FsZScsXG4gICAgICAgIGRvbWFpbjogJ2NvdmVyYWdlRG9tYWluJyxcbiAgICAgICAgcmFuZ2U6ICdjb3ZlcmFnZVJhbmdlJyxcbiAgICAgICAga2V5OiAnY292ZXJhZ2UnLFxuICAgICAgICBjaGFubmVsU2NhbGVUeXBlOiBDSEFOTkVMX1NDQUxFUy5yYWRpdXNcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGZpbmREZWZhdWx0TGF5ZXJQcm9wcyh7ZmllbGRzfSkge1xuICAgIGNvbnN0IGZvdW5kQ29sdW1ucyA9IHRoaXMuZmluZERlZmF1bHRDb2x1bW5GaWVsZChIRVhBR09OX0lEX0ZJRUxEUywgZmllbGRzKTtcbiAgICBpZiAoIWZvdW5kQ29sdW1ucyB8fCAhZm91bmRDb2x1bW5zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZvdW5kQ29sdW1ucy5tYXAoY29sdW1ucyA9PiAoe1xuICAgICAgaXNWaXNpYmxlOiB0cnVlLFxuICAgICAgbGFiZWw6ICdIMyBIZXhhZ29uJyxcbiAgICAgIGNvbHVtbnNcbiAgICB9KSk7XG4gIH1cblxuICBnZXREZWZhdWx0TGF5ZXJDb25maWcocHJvcHMgPSB7fSkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdXBlci5nZXREZWZhdWx0TGF5ZXJDb25maWcocHJvcHMpLFxuXG4gICAgICAvLyBhZGQgaGVpZ2h0IHZpc3VhbCBjaGFubmVsXG4gICAgICBjb3ZlcmFnZUZpZWxkOiBudWxsLFxuICAgICAgY292ZXJhZ2VEb21haW46IFswLCAxXSxcbiAgICAgIGNvdmVyYWdlU2NhbGU6ICdsaW5lYXInXG4gICAgfTtcbiAgfVxuXG4gIC8vIFRPRE86IGZpeCBjb21wbGV4aXR5XG4gIC8qIGVzbGludC1kaXNhYmxlIGNvbXBsZXhpdHkgKi9cbiAgZm9ybWF0TGF5ZXJEYXRhKF8sIGFsbERhdGEsIGZpbHRlcmVkSW5kZXgsIG9sZExheWVyRGF0YSwgb3B0ID0ge30pIHtcbiAgICBjb25zdCB7XG4gICAgICBjb2xvclNjYWxlLFxuICAgICAgY29sb3JEb21haW4sXG4gICAgICBjb2xvckZpZWxkLFxuICAgICAgY29sb3IsXG4gICAgICBjb2x1bW5zLFxuICAgICAgc2l6ZUZpZWxkLFxuICAgICAgc2l6ZVNjYWxlLFxuICAgICAgc2l6ZURvbWFpbixcbiAgICAgIGNvdmVyYWdlRmllbGQsXG4gICAgICBjb3ZlcmFnZVNjYWxlLFxuICAgICAgY292ZXJhZ2VEb21haW4sXG4gICAgICB2aXNDb25maWc6IHtzaXplUmFuZ2UsIGNvbG9yUmFuZ2UsIGNvdmVyYWdlUmFuZ2V9XG4gICAgfSA9IHRoaXMuY29uZmlnO1xuXG4gICAgLy8gY29sb3JcbiAgICBjb25zdCBjU2NhbGUgPVxuICAgICAgY29sb3JGaWVsZCAmJlxuICAgICAgdGhpcy5nZXRWaXNDaGFubmVsU2NhbGUoXG4gICAgICAgIGNvbG9yU2NhbGUsXG4gICAgICAgIGNvbG9yRG9tYWluLFxuICAgICAgICBjb2xvclJhbmdlLmNvbG9ycy5tYXAoYyA9PiBoZXhUb1JnYihjKSlcbiAgICAgICk7XG5cbiAgICAvLyBoZWlnaHRcbiAgICBjb25zdCBzU2NhbGUgPVxuICAgICAgc2l6ZUZpZWxkICYmIHRoaXMuZ2V0VmlzQ2hhbm5lbFNjYWxlKHNpemVTY2FsZSwgc2l6ZURvbWFpbiwgc2l6ZVJhbmdlKTtcblxuICAgIC8vIGNvdmVyYWdlXG4gICAgY29uc3QgY29TY2FsZSA9XG4gICAgICBjb3ZlcmFnZUZpZWxkICYmIHRoaXMuZ2V0VmlzQ2hhbm5lbFNjYWxlKGNvdmVyYWdlU2NhbGUsIGNvdmVyYWdlRG9tYWluLCBjb3ZlcmFnZVJhbmdlKTtcblxuICAgIGNvbnN0IGdldEhleElkID0gdGhpcy5nZXRIZXhJZChjb2x1bW5zKTtcblxuICAgIGlmICghb2xkTGF5ZXJEYXRhIHx8IG9sZExheWVyRGF0YS5nZXRIZXhJZCAhPT0gZ2V0SGV4SWQpIHtcbiAgICAgIHRoaXMudXBkYXRlTGF5ZXJNZXRhKGFsbERhdGEsIGdldEhleElkKTtcbiAgICB9XG5cbiAgICBsZXQgZGF0YTtcbiAgICBpZiAoXG4gICAgICBvbGRMYXllckRhdGEgJiZcbiAgICAgIG9sZExheWVyRGF0YS5kYXRhICYmXG4gICAgICBvcHQuc2FtZURhdGEgJiZcbiAgICAgIG9sZExheWVyRGF0YS5nZXRIZXhJZCA9PT0gZ2V0SGV4SWRcbiAgICApIHtcbiAgICAgIGRhdGEgPSBvbGRMYXllckRhdGEuZGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YSA9IGZpbHRlcmVkSW5kZXgucmVkdWNlKChhY2N1LCBpbmRleCwgaSkgPT4ge1xuICAgICAgICBjb25zdCBpZCA9IGdldEhleElkKGFsbERhdGFbaW5kZXhdKTtcbiAgICAgICAgY29uc3QgY2VudHJvaWQgPSB0aGlzLmRhdGFUb0ZlYXR1cmUuY2VudHJvaWRzW2luZGV4XTtcblxuICAgICAgICBpZiAoY2VudHJvaWQpIHtcbiAgICAgICAgICBhY2N1LnB1c2goe1xuICAgICAgICAgICAgLy8ga2VlcCBhIHJlZmVyZW5jZSB0byB0aGUgb3JpZ2luYWwgZGF0YSBpbmRleFxuICAgICAgICAgICAgaW5kZXg6IGksXG4gICAgICAgICAgICBkYXRhOiBhbGxEYXRhW2luZGV4XSxcbiAgICAgICAgICAgIGlkLFxuICAgICAgICAgICAgY2VudHJvaWRcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhY2N1O1xuICAgICAgfSwgW10pO1xuICAgIH1cblxuICAgIGNvbnN0IGdldEVsZXZhdGlvbiA9IHNTY2FsZSA/IGQgPT5cbiAgICAgIHRoaXMuZ2V0RW5jb2RlZENoYW5uZWxWYWx1ZShzU2NhbGUsIGQuZGF0YSwgc2l6ZUZpZWxkLCAwKSA6IDA7XG5cbiAgICBjb25zdCBnZXRDb2xvciA9IGNTY2FsZSA/IGQgPT5cbiAgICAgIHRoaXMuZ2V0RW5jb2RlZENoYW5uZWxWYWx1ZShjU2NhbGUsIGQuZGF0YSwgY29sb3JGaWVsZCkgOiBjb2xvcjtcblxuICAgIGNvbnN0IGdldENvdmVyYWdlID0gY29TY2FsZSA/IGQgPT5cbiAgICAgIHRoaXMuZ2V0RW5jb2RlZENoYW5uZWxWYWx1ZShjb1NjYWxlLCBkLmRhdGEsIGNvdmVyYWdlRmllbGQsIDApIDogMTtcblxuICAgIC8vIGNvbnN0IGxheWVyRGF0YSA9IHtcbiAgICByZXR1cm4ge1xuICAgICAgZGF0YSxcbiAgICAgIGdldEVsZXZhdGlvbixcbiAgICAgIGdldENvbG9yLFxuICAgICAgZ2V0SGV4SWQsXG4gICAgICBnZXRDb3ZlcmFnZSxcbiAgICAgIGhleGFnb25WZXJ0aWNlczogdGhpcy5kYXRhVG9GZWF0dXJlLmhleGFnb25WZXJ0aWNlcyxcbiAgICAgIGhleGFnb25DZW50ZXI6IHRoaXMuZGF0YVRvRmVhdHVyZS5oZXhhZ29uQ2VudGVyXG4gICAgfTtcbiAgfVxuICAvKiBlc2xpbnQtZW5hYmxlIGNvbXBsZXhpdHkgKi9cblxuICB1cGRhdGVMYXllck1ldGEoYWxsRGF0YSwgZ2V0SGV4SWQpIHtcbiAgICBsZXQgaGV4YWdvblZlcnRpY2VzO1xuICAgIGxldCBoZXhhZ29uQ2VudGVyO1xuICAgIGNvbnN0IGNlbnRyb2lkcyA9IHt9O1xuXG4gICAgYWxsRGF0YS5mb3JFYWNoKChkLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgaWQgPSBnZXRIZXhJZChkKTtcbiAgICAgIGlmICh0eXBlb2YgaWQgIT09ICdzdHJpbmcnIHx8ICFpZC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gZmluZCBoZXhhZ29uVmVydGljZXNcbiAgICAgIC8vIG9ubHkgbmVlZCAxIGluc3RhbmNlIG9mIGhleGFnb25WZXJ0aWNlc1xuICAgICAgaWYgKCFoZXhhZ29uVmVydGljZXMpIHtcbiAgICAgICAgaGV4YWdvblZlcnRpY2VzID0gaWQgJiYgZ2V0VmVydGljZXMoe2lkfSk7XG4gICAgICAgIGhleGFnb25DZW50ZXIgPSBpZCAmJiBnZXRDZW50cm9pZCh7aWR9KVxuICAgICAgfVxuXG4gICAgICAvLyBzYXZlIGEgcmVmZXJlbmNlIG9mIGNlbnRyb2lkcyB0byBkYXRhVG9GZWF0dXJlXG4gICAgICAvLyBzbyB3ZSBkb24ndCBoYXZlIHRvIHJlIGNhbGN1bGF0ZSBpdCBhZ2FpblxuICAgICAgY2VudHJvaWRzW2luZGV4XSA9IGdldENlbnRyb2lkKHtpZH0pO1xuICAgIH0pO1xuXG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRQb2ludHNCb3VuZHMoT2JqZWN0LnZhbHVlcyhjZW50cm9pZHMpLCBkID0+IGQpO1xuICAgIGNvbnN0IGxpZ2h0U2V0dGluZ3MgPSB0aGlzLmdldExpZ2h0U2V0dGluZ3NGcm9tQm91bmRzKGJvdW5kcyk7XG5cbiAgICB0aGlzLmRhdGFUb0ZlYXR1cmUgPSB7aGV4YWdvblZlcnRpY2VzLCBoZXhhZ29uQ2VudGVyLCBjZW50cm9pZHN9O1xuICAgIHRoaXMudXBkYXRlTWV0YSh7Ym91bmRzLCBsaWdodFNldHRpbmdzfSk7XG4gIH1cblxuICByZW5kZXJMYXllcih7XG4gICAgZGF0YSxcbiAgICBpZHgsXG4gICAgbGF5ZXJJbnRlcmFjdGlvbixcbiAgICBvYmplY3RIb3ZlcmVkLFxuICAgIG1hcFN0YXRlLFxuICAgIGludGVyYWN0aW9uQ29uZmlnXG4gIH0pIHtcbiAgICBjb25zdCB6b29tRmFjdG9yID0gdGhpcy5nZXRab29tRmFjdG9yKG1hcFN0YXRlKTtcbiAgICBjb25zdCBlbGVab29tRmFjdG9yID0gdGhpcy5nZXRFbGV2YXRpb25ab29tRmFjdG9yKG1hcFN0YXRlKTtcbiAgICBjb25zdCB7Y29uZmlnLCBtZXRhfSA9IHRoaXM7XG4gICAgY29uc3Qge3Zpc0NvbmZpZ30gPSBjb25maWc7XG5cbiAgICBjb25zdCB1cGRhdGVUcmlnZ2VycyA9IHtcbiAgICAgIGdldENvbG9yOiB7XG4gICAgICAgIGNvbG9yOiBjb25maWcuY29sb3IsXG4gICAgICAgIGNvbG9yRmllbGQ6IGNvbmZpZy5jb2xvckZpZWxkLFxuICAgICAgICBjb2xvclJhbmdlOiBjb25maWcudmlzQ29uZmlnLmNvbG9yUmFuZ2UsXG4gICAgICAgIGNvbG9yU2NhbGU6IGNvbmZpZy5jb2xvclNjYWxlXG4gICAgICB9LFxuICAgICAgZ2V0RWxldmF0aW9uOiB7XG4gICAgICAgIHNpemVGaWVsZDogY29uZmlnLnNpemVGaWVsZCxcbiAgICAgICAgc2l6ZVJhbmdlOiBjb25maWcudmlzQ29uZmlnLnNpemVSYW5nZVxuICAgICAgfSxcbiAgICAgIGdldENvdmVyYWdlOiB7XG4gICAgICAgIGNvdmVyYWdlRmllbGQ6IGNvbmZpZy5jb3ZlcmFnZUZpZWxkLFxuICAgICAgICBjb3ZlcmFnZVJhbmdlOiBjb25maWcudmlzQ29uZmlnLmNvdmVyYWdlUmFuZ2VcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIFtcbiAgICAgIG5ldyBIM0hleGFnb25DZWxsTGF5ZXIoe1xuICAgICAgICAuLi5sYXllckludGVyYWN0aW9uLFxuICAgICAgICAuLi5kYXRhLFxuICAgICAgICBpZDogdGhpcy5pZCxcbiAgICAgICAgaWR4LFxuICAgICAgICBwaWNrYWJsZTogdHJ1ZSxcblxuICAgICAgICAvLyBjb3ZlcmFnZVxuICAgICAgICBjb3ZlcmFnZTogY29uZmlnLmNvdmVyYWdlRmllbGQgPyAxIDogdmlzQ29uZmlnLmNvdmVyYWdlLFxuXG4gICAgICAgIC8vIHBhcmFtZXRlcnNcbiAgICAgICAgcGFyYW1ldGVyczoge2RlcHRoVGVzdDogQm9vbGVhbihjb25maWcuc2l6ZUZpZWxkIHx8IG1hcFN0YXRlLmRyYWdSb3RhdGUpfSxcblxuICAgICAgICAvLyBoaWdobGlnaHRcbiAgICAgICAgYXV0b0hpZ2hsaWdodDogQm9vbGVhbihjb25maWcuc2l6ZUZpZWxkKSxcblxuICAgICAgICAvLyBlbGV2YXRpb25cbiAgICAgICAgZXh0cnVkZWQ6IEJvb2xlYW4oY29uZmlnLnNpemVGaWVsZCksXG4gICAgICAgIGVsZXZhdGlvblNjYWxlOiB2aXNDb25maWcuZWxldmF0aW9uU2NhbGUgKiBlbGVab29tRmFjdG9yLFxuXG4gICAgICAgIC8vIGNvbG9yXG4gICAgICAgIG9wYWNpdHk6IHZpc0NvbmZpZy5vcGFjaXR5LFxuXG4gICAgICAgIC8vIHJlbmRlclxuICAgICAgICBsaWdodFNldHRpbmdzOiBtZXRhLmxpZ2h0U2V0dGluZ3MsXG4gICAgICAgIHVwZGF0ZVRyaWdnZXJzXG4gICAgICB9KSxcbiAgICAgIC4uLih0aGlzLmlzTGF5ZXJIb3ZlcmVkKG9iamVjdEhvdmVyZWQpICYmICFjb25maWcuc2l6ZUZpZWxkXG4gICAgICAgID8gW1xuICAgICAgICAgICAgbmV3IEdlb0pzb25MYXllcih7XG4gICAgICAgICAgICAgIGlkOiBgJHt0aGlzLmlkfS1ob3ZlcmVkYCxcbiAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgIGlkVG9Qb2x5Z29uR2VvKG9iamVjdEhvdmVyZWQpXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIGdldExpbmVDb2xvcjogY29uZmlnLmhpZ2hsaWdodENvbG9yLFxuICAgICAgICAgICAgICBsaW5lV2lkdGhTY2FsZTogOCAqIHpvb21GYWN0b3JcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXVxuICAgICAgICA6IFtdKVxuICAgIF07XG4gIH1cbn1cbiJdfQ==