"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.featureResolver = exports.featureAccessor = exports.geoJsonRequiredColumns = exports.geojsonVisConfigs = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _lodash = _interopRequireDefault(require("lodash.memoize"));

var _lodash2 = _interopRequireDefault(require("lodash.uniq"));

var _baseLayer = _interopRequireDefault(require("../base-layer"));

var _solidPolygonLayer = _interopRequireDefault(require("../../deckgl-layers/geojson-layer/solid-polygon-layer"));

var _deck = require("deck.gl");

var _colorUtils = require("../../utils/color-utils");

var _geojsonUtils = require("./geojson-utils");

var _geojsonLayerIcon = _interopRequireDefault(require("./geojson-layer-icon"));

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
var geojsonVisConfigs = {
  opacity: 'opacity',
  thickness: {
    type: 'number',
    defaultValue: 0.5,
    label: 'Stroke Width',
    isRanged: false,
    range: [0, 100],
    step: 0.1,
    group: 'stroke',
    property: 'thickness'
  },
  colorRange: 'colorRange',
  radius: 'radius',
  sizeRange: 'strokeWidthRange',
  radiusRange: 'radiusRange',
  heightRange: 'elevationRange',
  elevationScale: 'elevationScale',
  'hi-precision': 'hi-precision',
  stroked: 'stroked',
  filled: 'filled',
  enable3d: 'enable3d',
  wireframe: 'wireframe'
};
exports.geojsonVisConfigs = geojsonVisConfigs;
var geoJsonRequiredColumns = ['geojson'];
exports.geoJsonRequiredColumns = geoJsonRequiredColumns;

var featureAccessor = function featureAccessor(_ref) {
  var geojson = _ref.geojson;
  return function (d) {
    return d[geojson.fieldIdx];
  };
};

exports.featureAccessor = featureAccessor;

var featureResolver = function featureResolver(_ref2) {
  var geojson = _ref2.geojson;
  return geojson.fieldIdx;
};

exports.featureResolver = featureResolver;

var GeoJsonLayer =
/*#__PURE__*/
function (_Layer) {
  (0, _inherits2.default)(GeoJsonLayer, _Layer);

  function GeoJsonLayer(props) {
    var _this;

    (0, _classCallCheck2.default)(this, GeoJsonLayer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(GeoJsonLayer).call(this, props));
    _this.dataToFeature = {};

    _this.registerVisConfig(geojsonVisConfigs);

    _this.getFeature = (0, _lodash.default)(featureAccessor, featureResolver);
    return _this;
  }

  (0, _createClass2.default)(GeoJsonLayer, [{
    key: "getDefaultLayerConfig",
    value: function getDefaultLayerConfig() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return (0, _objectSpread2.default)({}, (0, _get2.default)((0, _getPrototypeOf2.default)(GeoJsonLayer.prototype), "getDefaultLayerConfig", this).call(this, props), {
        // add height visual channel
        heightField: null,
        heightDomain: [0, 1],
        heightScale: 'linear',
        // add radius visual channel
        radiusField: null,
        radiusDomain: [0, 1],
        radiusScale: 'linear'
      });
    }
  }, {
    key: "getHoverData",
    value: function getHoverData(object, allData) {
      // index of allData is saved to feature.properties
      return allData[object.properties.index];
    } // TODO: fix complexity

    /* eslint-disable complexity */

  }, {
    key: "formatLayerData",
    value: function formatLayerData(_, allData, filteredIndex, oldLayerData) {
      var _this2 = this;

      var opt = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var _this$config = this.config,
          colorScale = _this$config.colorScale,
          colorField = _this$config.colorField,
          colorDomain = _this$config.colorDomain,
          color = _this$config.color,
          sizeScale = _this$config.sizeScale,
          sizeDomain = _this$config.sizeDomain,
          sizeField = _this$config.sizeField,
          heightField = _this$config.heightField,
          heightDomain = _this$config.heightDomain,
          heightScale = _this$config.heightScale,
          radiusField = _this$config.radiusField,
          radiusDomain = _this$config.radiusDomain,
          radiusScale = _this$config.radiusScale,
          visConfig = _this$config.visConfig,
          columns = _this$config.columns;
      var enable3d = visConfig.enable3d,
          stroked = visConfig.stroked,
          colorRange = visConfig.colorRange,
          heightRange = visConfig.heightRange,
          sizeRange = visConfig.sizeRange,
          radiusRange = visConfig.radiusRange;
      var getFeature = this.getFeature(columns); // geojson feature are object, if doesn't exists
      // create it and save to layer

      if (!oldLayerData || oldLayerData.getFeature !== getFeature) {
        this.updateLayerMeta(allData, getFeature);
      }

      var geojsonData;

      if (oldLayerData && oldLayerData.data && opt.sameData && oldLayerData.getFeature === getFeature) {
        // no need to create a new array of data
        // use updateTriggers to selectively re-calculate attributes
        geojsonData = oldLayerData.data;
      } else {
        // filteredIndex is a reference of index in allData which can map to feature
        geojsonData = filteredIndex.map(function (i) {
          return _this2.dataToFeature[i];
        }).filter(function (d) {
          return d;
        });
      }

      var cScale = colorField && this.getVisChannelScale(colorScale, colorDomain, colorRange.colors.map(_colorUtils.hexToRgb)); // calculate stroke scale - if stroked = true

      var sScale = sizeField && stroked && this.getVisChannelScale(sizeScale, sizeDomain, sizeRange); // calculate elevation scale - if extruded = true

      var eScale = heightField && enable3d && this.getVisChannelScale(heightScale, heightDomain, heightRange); // point radius

      var rScale = radiusField && this.getVisChannelScale(radiusScale, radiusDomain, radiusRange);
      return {
        data: geojsonData,
        getFeature: getFeature,
        getFillColor: function getFillColor(d) {
          return cScale ? _this2.getEncodedChannelValue(cScale, allData[d.properties.index], colorField) : d.properties.fillColor || color;
        },
        getLineColor: function getLineColor(d) {
          return cScale ? _this2.getEncodedChannelValue(cScale, allData[d.properties.index], colorField) : d.properties.lineColor || color;
        },
        getLineWidth: function getLineWidth(d) {
          return sScale ? _this2.getEncodedChannelValue(sScale, allData[d.properties.index], sizeField, 0) : d.properties.lineWidth || 1;
        },
        getElevation: function getElevation(d) {
          return eScale ? _this2.getEncodedChannelValue(eScale, allData[d.properties.index], heightField, 0) : d.properties.elevation || 500;
        },
        getRadius: function getRadius(d) {
          return rScale ? _this2.getEncodedChannelValue(rScale, allData[d.properties.index], radiusField, 0) : d.properties.radius || 1;
        }
      };
    }
    /* eslint-enable complexity */

  }, {
    key: "updateLayerMeta",
    value: function updateLayerMeta(allData, getFeature) {
      this.dataToFeature = (0, _geojsonUtils.getGeojsonDataMaps)(allData, getFeature); // calculate layer meta

      var allFeatures = Object.values(this.dataToFeature); // get bounds from features

      var bounds = (0, _geojsonUtils.getGeojsonBounds)(allFeatures); // get lightSettings from points

      var lightSettings = this.getLightSettingsFromBounds(bounds); // if any of the feature has properties.hi-precision set to be true

      var fp64 = Boolean(allFeatures.find(function (d) {
        return d && d.properties && d.properties['hi-precision'];
      }));
      var fixedRadius = Boolean(allFeatures.find(function (d) {
        return d && d.properties && d.properties.radius;
      })); // keep a record of what type of geometry the collection has

      var featureTypes = allFeatures.reduce(function (accu, f) {
        var geoType = (0, _geojsonUtils.featureToDeckGlGeoType)(f && f.geometry && f.geometry.type);

        if (geoType) {
          accu[geoType] = true;
        }

        return accu;
      }, {});
      this.updateMeta({
        bounds: bounds,
        lightSettings: lightSettings,
        fp64: fp64,
        fixedRadius: fixedRadius,
        featureTypes: featureTypes
      });
    }
  }, {
    key: "renderLayer",
    value: function renderLayer(_ref3) {
      var data = _ref3.data,
          idx = _ref3.idx,
          objectHovered = _ref3.objectHovered,
          mapState = _ref3.mapState,
          interactionConfig = _ref3.interactionConfig;
      var _this$meta = this.meta,
          fp64 = _this$meta.fp64,
          lightSettings = _this$meta.lightSettings,
          fixedRadius = _this$meta.fixedRadius;
      var radiusScale = this.getRadiusScaleByZoom(mapState, fixedRadius);
      var zoomFactor = this.getZoomFactor(mapState);
      var visConfig = this.config.visConfig;
      var layerProps = {
        // multiplier applied just so it being consistent with previously saved maps
        lineWidthScale: visConfig.thickness * zoomFactor * 8,
        lineWidthMinPixels: 1,
        elevationScale: visConfig.elevationScale,
        pointRadiusScale: radiusScale,
        fp64: fp64 || visConfig['hi-precision'],
        lineMiterLimit: 4
      };
      var updateTriggers = {
        getElevation: {
          heightField: this.config.heightField,
          heightScale: this.config.heightScale,
          heightRange: visConfig.heightRange
        },
        getFillColor: {
          color: this.config.color,
          colorField: this.config.colorField,
          colorRange: visConfig.colorRange,
          colorScale: this.config.colorScale
        },
        getLineColor: {
          color: this.config.color,
          colorField: this.config.colorField,
          colorRange: visConfig.colorRange,
          colorScale: this.config.colorScale
        },
        getLineWidth: {
          sizeField: this.config.sizeField,
          sizeRange: visConfig.sizeRange
        },
        getRadius: {
          radiusField: this.config.radiusField,
          radiusRange: visConfig.radiusRange
        }
      };
      return [new _deck.GeoJsonLayer((0, _objectSpread2.default)({}, layerProps, {
        id: this.id,
        idx: idx,
        data: data.data,
        getFillColor: data.getFillColor,
        getLineColor: data.getLineColor,
        getLineWidth: data.getLineWidth,
        getRadius: data.getRadius,
        getElevation: data.getElevation,
        // highlight
        pickable: true,
        // highlightColor: this.config.highlightColor,
        autoHighlight: visConfig.enable3d,
        // parameters
        parameters: {
          depthTest: Boolean(visConfig.enable3d || mapState.dragRotate)
        },
        opacity: visConfig.opacity,
        stroked: visConfig.stroked,
        filled: visConfig.filled,
        extruded: visConfig.enable3d,
        wireframe: visConfig.wireframe,
        lightSettings: lightSettings,
        updateTriggers: updateTriggers,
        subLayers: (0, _objectSpread2.default)({}, _deck.GeoJsonLayer.defaultProps.subLayers, {
          PolygonLayer: _solidPolygonLayer.default
        })
      }))].concat((0, _toConsumableArray2.default)(this.isLayerHovered(objectHovered) && !visConfig.enable3d ? [new _deck.GeoJsonLayer((0, _objectSpread2.default)({}, layerProps, {
        id: "".concat(this.id, "-hovered"),
        data: [objectHovered.object],
        getLineWidth: data.getLineWidth,
        getRadius: data.getRadius,
        getElevation: data.getElevation,
        getLineColor: this.config.highlightColor,
        getFillColor: this.config.highlightColor,
        updateTriggers: updateTriggers,
        stroked: true,
        pickable: false,
        filled: false
      }))] : []));
    }
  }, {
    key: "type",
    get: function get() {
      return 'geojson';
    }
  }, {
    key: "name",
    get: function get() {
      return 'Polygon';
    }
  }, {
    key: "layerIcon",
    get: function get() {
      return _geojsonLayerIcon.default;
    }
  }, {
    key: "requiredLayerColumns",
    get: function get() {
      return geoJsonRequiredColumns;
    }
  }, {
    key: "visualChannels",
    get: function get() {
      return (0, _objectSpread2.default)({}, (0, _get2.default)((0, _getPrototypeOf2.default)(GeoJsonLayer.prototype), "visualChannels", this), {
        size: (0, _objectSpread2.default)({}, (0, _get2.default)((0, _getPrototypeOf2.default)(GeoJsonLayer.prototype), "visualChannels", this).size, {
          property: 'stroke',
          condition: function condition(config) {
            return config.visConfig.stroked;
          }
        }),
        height: {
          property: 'height',
          field: 'heightField',
          scale: 'heightScale',
          domain: 'heightDomain',
          range: 'heightRange',
          key: 'height',
          channelScaleType: 'size',
          condition: function condition(config) {
            return config.visConfig.enable3d;
          }
        },
        radius: {
          property: 'radius',
          field: 'radiusField',
          scale: 'radiusScale',
          domain: 'radiusDomain',
          range: 'radiusRange',
          key: 'radius',
          channelScaleType: 'radius'
        }
      });
    }
  }], [{
    key: "findDefaultLayerProps",
    value: function findDefaultLayerProps(_ref4) {
      var _this3 = this;

      var label = _ref4.label,
          fields = _ref4.fields;
      var geojsonColumns = fields.filter(function (f) {
        return f.type === 'geojson';
      }).map(function (f) {
        return f.name;
      });
      var defaultColumns = {
        geojson: (0, _lodash2.default)([].concat((0, _toConsumableArray2.default)(_defaultSettings.GEOJSON_FIELDS.geojson), (0, _toConsumableArray2.default)(geojsonColumns)))
      };
      var foundColumns = this.findDefaultColumnField(defaultColumns, fields);

      if (!foundColumns || !foundColumns.length) {
        return [];
      }

      return foundColumns.map(function (columns) {
        return {
          label: typeof label === 'string' && label.replace(/\.[^/.]+$/, '') || _this3.type,
          columns: columns,
          isVisible: true
        };
      });
    }
  }]);
  return GeoJsonLayer;
}(_baseLayer.default);

exports.default = GeoJsonLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvZ2VvanNvbi1sYXllci9nZW9qc29uLWxheWVyLmpzIl0sIm5hbWVzIjpbImdlb2pzb25WaXNDb25maWdzIiwib3BhY2l0eSIsInRoaWNrbmVzcyIsInR5cGUiLCJkZWZhdWx0VmFsdWUiLCJsYWJlbCIsImlzUmFuZ2VkIiwicmFuZ2UiLCJzdGVwIiwiZ3JvdXAiLCJwcm9wZXJ0eSIsImNvbG9yUmFuZ2UiLCJyYWRpdXMiLCJzaXplUmFuZ2UiLCJyYWRpdXNSYW5nZSIsImhlaWdodFJhbmdlIiwiZWxldmF0aW9uU2NhbGUiLCJzdHJva2VkIiwiZmlsbGVkIiwiZW5hYmxlM2QiLCJ3aXJlZnJhbWUiLCJnZW9Kc29uUmVxdWlyZWRDb2x1bW5zIiwiZmVhdHVyZUFjY2Vzc29yIiwiZ2VvanNvbiIsImQiLCJmaWVsZElkeCIsImZlYXR1cmVSZXNvbHZlciIsIkdlb0pzb25MYXllciIsInByb3BzIiwiZGF0YVRvRmVhdHVyZSIsInJlZ2lzdGVyVmlzQ29uZmlnIiwiZ2V0RmVhdHVyZSIsImhlaWdodEZpZWxkIiwiaGVpZ2h0RG9tYWluIiwiaGVpZ2h0U2NhbGUiLCJyYWRpdXNGaWVsZCIsInJhZGl1c0RvbWFpbiIsInJhZGl1c1NjYWxlIiwib2JqZWN0IiwiYWxsRGF0YSIsInByb3BlcnRpZXMiLCJpbmRleCIsIl8iLCJmaWx0ZXJlZEluZGV4Iiwib2xkTGF5ZXJEYXRhIiwib3B0IiwiY29uZmlnIiwiY29sb3JTY2FsZSIsImNvbG9yRmllbGQiLCJjb2xvckRvbWFpbiIsImNvbG9yIiwic2l6ZVNjYWxlIiwic2l6ZURvbWFpbiIsInNpemVGaWVsZCIsInZpc0NvbmZpZyIsImNvbHVtbnMiLCJ1cGRhdGVMYXllck1ldGEiLCJnZW9qc29uRGF0YSIsImRhdGEiLCJzYW1lRGF0YSIsIm1hcCIsImkiLCJmaWx0ZXIiLCJjU2NhbGUiLCJnZXRWaXNDaGFubmVsU2NhbGUiLCJjb2xvcnMiLCJoZXhUb1JnYiIsInNTY2FsZSIsImVTY2FsZSIsInJTY2FsZSIsImdldEZpbGxDb2xvciIsImdldEVuY29kZWRDaGFubmVsVmFsdWUiLCJmaWxsQ29sb3IiLCJnZXRMaW5lQ29sb3IiLCJsaW5lQ29sb3IiLCJnZXRMaW5lV2lkdGgiLCJsaW5lV2lkdGgiLCJnZXRFbGV2YXRpb24iLCJlbGV2YXRpb24iLCJnZXRSYWRpdXMiLCJhbGxGZWF0dXJlcyIsIk9iamVjdCIsInZhbHVlcyIsImJvdW5kcyIsImxpZ2h0U2V0dGluZ3MiLCJnZXRMaWdodFNldHRpbmdzRnJvbUJvdW5kcyIsImZwNjQiLCJCb29sZWFuIiwiZmluZCIsImZpeGVkUmFkaXVzIiwiZmVhdHVyZVR5cGVzIiwicmVkdWNlIiwiYWNjdSIsImYiLCJnZW9UeXBlIiwiZ2VvbWV0cnkiLCJ1cGRhdGVNZXRhIiwiaWR4Iiwib2JqZWN0SG92ZXJlZCIsIm1hcFN0YXRlIiwiaW50ZXJhY3Rpb25Db25maWciLCJtZXRhIiwiZ2V0UmFkaXVzU2NhbGVCeVpvb20iLCJ6b29tRmFjdG9yIiwiZ2V0Wm9vbUZhY3RvciIsImxheWVyUHJvcHMiLCJsaW5lV2lkdGhTY2FsZSIsImxpbmVXaWR0aE1pblBpeGVscyIsInBvaW50UmFkaXVzU2NhbGUiLCJsaW5lTWl0ZXJMaW1pdCIsInVwZGF0ZVRyaWdnZXJzIiwiRGVja0dMR2VvSnNvbkxheWVyIiwiaWQiLCJwaWNrYWJsZSIsImF1dG9IaWdobGlnaHQiLCJwYXJhbWV0ZXJzIiwiZGVwdGhUZXN0IiwiZHJhZ1JvdGF0ZSIsImV4dHJ1ZGVkIiwic3ViTGF5ZXJzIiwiZGVmYXVsdFByb3BzIiwiUG9seWdvbkxheWVyIiwiSGlnaGxpZ2h0UG9seWdvbkxheWVyIiwiaXNMYXllckhvdmVyZWQiLCJoaWdobGlnaHRDb2xvciIsIkdlb2pzb25MYXllckljb24iLCJzaXplIiwiY29uZGl0aW9uIiwiaGVpZ2h0IiwiZmllbGQiLCJzY2FsZSIsImRvbWFpbiIsImtleSIsImNoYW5uZWxTY2FsZVR5cGUiLCJmaWVsZHMiLCJnZW9qc29uQ29sdW1ucyIsIm5hbWUiLCJkZWZhdWx0Q29sdW1ucyIsIkdFT0pTT05fRklFTERTIiwiZm91bmRDb2x1bW5zIiwiZmluZERlZmF1bHRDb2x1bW5GaWVsZCIsImxlbmd0aCIsInJlcGxhY2UiLCJpc1Zpc2libGUiLCJMYXllciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFLQTs7QUFDQTs7QUFsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFrQk8sSUFBTUEsaUJBQWlCLEdBQUc7QUFDL0JDLEVBQUFBLE9BQU8sRUFBRSxTQURzQjtBQUUvQkMsRUFBQUEsU0FBUyxFQUFFO0FBQ1RDLElBQUFBLElBQUksRUFBRSxRQURHO0FBRVRDLElBQUFBLFlBQVksRUFBRSxHQUZMO0FBR1RDLElBQUFBLEtBQUssRUFBRSxjQUhFO0FBSVRDLElBQUFBLFFBQVEsRUFBRSxLQUpEO0FBS1RDLElBQUFBLEtBQUssRUFBRSxDQUFDLENBQUQsRUFBSSxHQUFKLENBTEU7QUFNVEMsSUFBQUEsSUFBSSxFQUFFLEdBTkc7QUFPVEMsSUFBQUEsS0FBSyxFQUFFLFFBUEU7QUFRVEMsSUFBQUEsUUFBUSxFQUFFO0FBUkQsR0FGb0I7QUFZL0JDLEVBQUFBLFVBQVUsRUFBRSxZQVptQjtBQWEvQkMsRUFBQUEsTUFBTSxFQUFFLFFBYnVCO0FBZS9CQyxFQUFBQSxTQUFTLEVBQUUsa0JBZm9CO0FBZ0IvQkMsRUFBQUEsV0FBVyxFQUFFLGFBaEJrQjtBQWlCL0JDLEVBQUFBLFdBQVcsRUFBRSxnQkFqQmtCO0FBa0IvQkMsRUFBQUEsY0FBYyxFQUFFLGdCQWxCZTtBQW9CL0Isa0JBQWdCLGNBcEJlO0FBcUIvQkMsRUFBQUEsT0FBTyxFQUFFLFNBckJzQjtBQXNCL0JDLEVBQUFBLE1BQU0sRUFBRSxRQXRCdUI7QUF1Qi9CQyxFQUFBQSxRQUFR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RTZDO0FBQUE7O0FBQUEsVUFBaEJoSSxLQUFnQixTQUFoQkEsS0FBZ0I7QUFBQSxVQUFUaUksTUFBUyxTQUFUQSxNQUFTO0FBQzVDLFVBQU1DLGNBQWMsR0FBR0QsTUFBTSxDQUMxQnhFLE1BRG9CLENBQ2IsVUFBQStCLENBQUM7QUFBQSxlQUFJQSxDQUFDLENBQUMxRixJQUFGLEtBQVcsU0FBZjtBQUFBLE9BRFksRUFFcEJ5RCxHQUZvQixDQUVoQixVQUFBaUMsQ0FBQztBQUFBLGVBQUlBLENBQUMsQ0FBQzJDLElBQU47QUFBQSxPQUZlLENBQXZCO0FBSUEsVUFBTUMsY0FBYyxHQUFHO0FBQ3JCbEgsUUFBQUEsT0FBTyxFQUFFLGlFQUFTbUgsZ0NBQWVuSCxPQUF4QixvQ0FBb0NnSCxjQUFwQztBQURZLE9BQXZCO0FBSUEsVUFBTUksWUFBWSxHQUFHLEtBQUtDLHNCQUFMLENBQTRCSCxjQUE1QixFQUE0Q0gsTUFBNUMsQ0FBckI7O0FBQ0EsVUFBSSxDQUFDSyxZQUFELElBQWlCLENBQUNBLFlBQVksQ0FBQ0UsTUFBbkMsRUFBMkM7QUFDekMsZUFBTyxFQUFQO0FBQ0Q7O0FBRUQsYUFBT0YsWUFBWSxDQUFDL0UsR0FBYixDQUFpQixVQUFBTCxPQUFPO0FBQUEsZUFBSztBQUNsQ2xELFVBQUFBLEtBQUssRUFBRSxPQUFPQSxLQUFQLEtBQWlCLFFBQWpCLElBQTZCQSxLQUFLLENBQUN5SSxPQUFOLENBQWMsV0FBZCxFQUEyQixFQUEzQixDQUE3QixJQUErRCxNQUFJLENBQUMzSSxJQUR6QztBQUVsQ29ELFVBQUFBLE9BQU8sRUFBUEEsT0FGa0M7QUFHbEN3RixVQUFBQSxTQUFTLEVBQUU7QUFIdUIsU0FBTDtBQUFBLE9BQXhCLENBQVA7QUFLRDs7O0VBMUV1Q0Msa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgbWVtb2l6ZSBmcm9tICdsb2Rhc2gubWVtb2l6ZSc7XG5pbXBvcnQgdW5pcSBmcm9tICdsb2Rhc2gudW5pcSc7XG5cbmltcG9ydCBMYXllciBmcm9tICcuLi9iYXNlLWxheWVyJztcbmltcG9ydCBIaWdobGlnaHRQb2x5Z29uTGF5ZXIgZnJvbSAnZGVja2dsLWxheWVycy9nZW9qc29uLWxheWVyL3NvbGlkLXBvbHlnb24tbGF5ZXInO1xuaW1wb3J0IHtHZW9Kc29uTGF5ZXIgYXMgRGVja0dMR2VvSnNvbkxheWVyfSBmcm9tICdkZWNrLmdsJztcblxuaW1wb3J0IHtoZXhUb1JnYn0gZnJvbSAndXRpbHMvY29sb3ItdXRpbHMnO1xuaW1wb3J0IHtcbiAgZ2V0R2VvanNvbkRhdGFNYXBzLFxuICBnZXRHZW9qc29uQm91bmRzLFxuICBmZWF0dXJlVG9EZWNrR2xHZW9UeXBlXG59IGZyb20gJy4vZ2VvanNvbi11dGlscyc7XG5pbXBvcnQgR2VvanNvbkxheWVySWNvbiBmcm9tICcuL2dlb2pzb24tbGF5ZXItaWNvbic7XG5pbXBvcnQge0dFT0pTT05fRklFTERTfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5cbmV4cG9ydCBjb25zdCBnZW9qc29uVmlzQ29uZmlncyA9IHtcbiAgb3BhY2l0eTogJ29wYWNpdHknLFxuICB0aGlja25lc3M6IHtcbiAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICBkZWZhdWx0VmFsdWU6IDAuNSxcbiAgICBsYWJlbDogJ1N0cm9rZSBXaWR0aCcsXG4gICAgaXNSYW5nZWQ6IGZhbHNlLFxuICAgIHJhbmdlOiBbMCwgMTAwXSxcbiAgICBzdGVwOiAwLjEsXG4gICAgZ3JvdXA6ICdzdHJva2UnLFxuICAgIHByb3BlcnR5OiAndGhpY2tuZXNzJ1xuICB9LFxuICBjb2xvclJhbmdlOiAnY29sb3JSYW5nZScsXG4gIHJhZGl1czogJ3JhZGl1cycsXG5cbiAgc2l6ZVJhbmdlOiAnc3Ryb2tlV2lkdGhSYW5nZScsXG4gIHJhZGl1c1JhbmdlOiAncmFkaXVzUmFuZ2UnLFxuICBoZWlnaHRSYW5nZTogJ2VsZXZhdGlvblJhbmdlJyxcbiAgZWxldmF0aW9uU2NhbGU6ICdlbGV2YXRpb25TY2FsZScsXG5cbiAgJ2hpLXByZWNpc2lvbic6ICdoaS1wcmVjaXNpb24nLFxuICBzdHJva2VkOiAnc3Ryb2tlZCcsXG4gIGZpbGxlZDogJ2ZpbGxlZCcsXG4gIGVuYWJsZTNkOiAnZW5hYmxlM2QnLFxuICB3aXJlZnJhbWU6ICd3aXJlZnJhbWUnXG59O1xuXG5leHBvcnQgY29uc3QgZ2VvSnNvblJlcXVpcmVkQ29sdW1ucyA9IFsnZ2VvanNvbiddO1xuZXhwb3J0IGNvbnN0IGZlYXR1cmVBY2Nlc3NvciA9ICh7Z2VvanNvbn0pID0+IGQgPT4gZFtnZW9qc29uLmZpZWxkSWR4XTtcbmV4cG9ydCBjb25zdCBmZWF0dXJlUmVzb2x2ZXIgPSAoe2dlb2pzb259KSA9PiBnZW9qc29uLmZpZWxkSWR4O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW9Kc29uTGF5ZXIgZXh0ZW5kcyBMYXllciB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5kYXRhVG9GZWF0dXJlID0ge307XG4gICAgdGhpcy5yZWdpc3RlclZpc0NvbmZpZyhnZW9qc29uVmlzQ29uZmlncyk7XG4gICAgdGhpcy5nZXRGZWF0dXJlID0gbWVtb2l6ZShmZWF0dXJlQWNjZXNzb3IsIGZlYXR1cmVSZXNvbHZlcik7XG4gIH1cblxuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gJ2dlb2pzb24nO1xuICB9XG5cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuICdQb2x5Z29uJztcbiAgfVxuXG4gIGdldCBsYXllckljb24oKSB7XG4gICAgcmV0dXJuIEdlb2pzb25MYXllckljb247XG4gIH1cblxuICBnZXQgcmVxdWlyZWRMYXllckNvbHVtbnMoKSB7XG4gICAgcmV0dXJuIGdlb0pzb25SZXF1aXJlZENvbHVtbnM7XG4gIH1cblxuICBnZXQgdmlzdWFsQ2hhbm5lbHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN1cGVyLnZpc3VhbENoYW5uZWxzLFxuICAgICAgc2l6ZToge1xuICAgICAgICAuLi5zdXBlci52aXN1YWxDaGFubmVscy5zaXplLFxuICAgICAgICBwcm9wZXJ0eTogJ3N0cm9rZScsXG4gICAgICAgIGNvbmRpdGlvbjogY29uZmlnID0+IGNvbmZpZy52aXNDb25maWcuc3Ryb2tlZFxuICAgICAgfSxcbiAgICAgIGhlaWdodDoge1xuICAgICAgICBwcm9wZXJ0eTogJ2hlaWdodCcsXG4gICAgICAgIGZpZWxkOiAnaGVpZ2h0RmllbGQnLFxuICAgICAgICBzY2FsZTogJ2hlaWdodFNjYWxlJyxcbiAgICAgICAgZG9tYWluOiAnaGVpZ2h0RG9tYWluJyxcbiAgICAgICAgcmFuZ2U6ICdoZWlnaHRSYW5nZScsXG4gICAgICAgIGtleTogJ2hlaWdodCcsXG4gICAgICAgIGNoYW5uZWxTY2FsZVR5cGU6ICdzaXplJyxcbiAgICAgICAgY29uZGl0aW9uOiBjb25maWcgPT4gY29uZmlnLnZpc0NvbmZpZy5lbmFibGUzZFxuICAgICAgfSxcbiAgICAgIHJhZGl1czoge1xuICAgICAgICBwcm9wZXJ0eTogJ3JhZGl1cycsXG4gICAgICAgIGZpZWxkOiAncmFkaXVzRmllbGQnLFxuICAgICAgICBzY2FsZTogJ3JhZGl1c1NjYWxlJyxcbiAgICAgICAgZG9tYWluOiAncmFkaXVzRG9tYWluJyxcbiAgICAgICAgcmFuZ2U6ICdyYWRpdXNSYW5nZScsXG4gICAgICAgIGtleTogJ3JhZGl1cycsXG4gICAgICAgIGNoYW5uZWxTY2FsZVR5cGU6ICdyYWRpdXMnXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBmaW5kRGVmYXVsdExheWVyUHJvcHMoe2xhYmVsLCBmaWVsZHN9KSB7XG4gICAgY29uc3QgZ2VvanNvbkNvbHVtbnMgPSBmaWVsZHNcbiAgICAgIC5maWx0ZXIoZiA9PiBmLnR5cGUgPT09ICdnZW9qc29uJylcbiAgICAgIC5tYXAoZiA9PiBmLm5hbWUpO1xuXG4gICAgY29uc3QgZGVmYXVsdENvbHVtbnMgPSB7XG4gICAgICBnZW9qc29uOiB1bmlxKFsuLi5HRU9KU09OX0ZJRUxEUy5nZW9qc29uLCAuLi5nZW9qc29uQ29sdW1uc10pXG4gICAgfTtcblxuICAgIGNvbnN0IGZvdW5kQ29sdW1ucyA9IHRoaXMuZmluZERlZmF1bHRDb2x1bW5GaWVsZChkZWZhdWx0Q29sdW1ucywgZmllbGRzKTtcbiAgICBpZiAoIWZvdW5kQ29sdW1ucyB8fCAhZm91bmRDb2x1bW5zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIHJldHVybiBmb3VuZENvbHVtbnMubWFwKGNvbHVtbnMgPT4gKHtcbiAgICAgIGxhYmVsOiB0eXBlb2YgbGFiZWwgPT09ICdzdHJpbmcnICYmIGxhYmVsLnJlcGxhY2UoL1xcLlteLy5dKyQvLCAnJykgfHwgdGhpcy50eXBlLFxuICAgICAgY29sdW1ucyxcbiAgICAgIGlzVmlzaWJsZTogdHJ1ZVxuICAgIH0pKTtcbiAgfVxuXG4gIGdldERlZmF1bHRMYXllckNvbmZpZyhwcm9wcyA9IHt9KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN1cGVyLmdldERlZmF1bHRMYXllckNvbmZpZyhwcm9wcyksXG5cbiAgICAgIC8vIGFkZCBoZWlnaHQgdmlzdWFsIGNoYW5uZWxcbiAgICAgIGhlaWdodEZpZWxkOiBudWxsLFxuICAgICAgaGVpZ2h0RG9tYWluOiBbMCwgMV0sXG4gICAgICBoZWlnaHRTY2FsZTogJ2xpbmVhcicsXG5cbiAgICAgIC8vIGFkZCByYWRpdXMgdmlzdWFsIGNoYW5uZWxcbiAgICAgIHJhZGl1c0ZpZWxkOiBudWxsLFxuICAgICAgcmFkaXVzRG9tYWluOiBbMCwgMV0sXG4gICAgICByYWRpdXNTY2FsZTogJ2xpbmVhcidcbiAgICB9O1xuICB9XG5cbiAgZ2V0SG92ZXJEYXRhKG9iamVjdCwgYWxsRGF0YSkge1xuICAgIC8vIGluZGV4IG9mIGFsbERhdGEgaXMgc2F2ZWQgdG8gZmVhdHVyZS5wcm9wZXJ0aWVzXG4gICAgcmV0dXJuIGFsbERhdGFbb2JqZWN0LnByb3BlcnRpZXMuaW5kZXhdO1xuICB9XG5cbiAgLy8gVE9ETzogZml4IGNvbXBsZXhpdHlcbiAgLyogZXNsaW50LWRpc2FibGUgY29tcGxleGl0eSAqL1xuICBmb3JtYXRMYXllckRhdGEoXywgYWxsRGF0YSwgZmlsdGVyZWRJbmRleCwgb2xkTGF5ZXJEYXRhLCBvcHQgPSB7fSkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNvbG9yU2NhbGUsXG4gICAgICBjb2xvckZpZWxkLFxuICAgICAgY29sb3JEb21haW4sXG4gICAgICBjb2xvcixcbiAgICAgIHNpemVTY2FsZSxcbiAgICAgIHNpemVEb21haW4sXG4gICAgICBzaXplRmllbGQsXG4gICAgICBoZWlnaHRGaWVsZCxcbiAgICAgIGhlaWdodERvbWFpbixcbiAgICAgIGhlaWdodFNjYWxlLFxuICAgICAgcmFkaXVzRmllbGQsXG4gICAgICByYWRpdXNEb21haW4sXG4gICAgICByYWRpdXNTY2FsZSxcbiAgICAgIHZpc0NvbmZpZyxcbiAgICAgIGNvbHVtbnNcbiAgICB9ID0gdGhpcy5jb25maWc7XG5cbiAgICBjb25zdCB7XG4gICAgICBlbmFibGUzZCxcbiAgICAgIHN0cm9rZWQsXG4gICAgICBjb2xvclJhbmdlLFxuICAgICAgaGVpZ2h0UmFuZ2UsXG4gICAgICBzaXplUmFuZ2UsXG4gICAgICByYWRpdXNSYW5nZVxuICAgIH0gPSB2aXNDb25maWc7XG5cbiAgICBjb25zdCBnZXRGZWF0dXJlID0gdGhpcy5nZXRGZWF0dXJlKGNvbHVtbnMpO1xuXG4gICAgLy8gZ2VvanNvbiBmZWF0dXJlIGFyZSBvYmplY3QsIGlmIGRvZXNuJ3QgZXhpc3RzXG4gICAgLy8gY3JlYXRlIGl0IGFuZCBzYXZlIHRvIGxheWVyXG4gICAgaWYgKCFvbGRMYXllckRhdGEgfHwgb2xkTGF5ZXJEYXRhLmdldEZlYXR1cmUgIT09IGdldEZlYXR1cmUpIHtcbiAgICAgIHRoaXMudXBkYXRlTGF5ZXJNZXRhKGFsbERhdGEsIGdldEZlYXR1cmUpO1xuICAgIH1cblxuICAgIGxldCBnZW9qc29uRGF0YTtcblxuICAgIGlmIChcbiAgICAgIG9sZExheWVyRGF0YSAmJlxuICAgICAgb2xkTGF5ZXJEYXRhLmRhdGEgJiZcbiAgICAgIG9wdC5zYW1lRGF0YSAmJlxuICAgICAgb2xkTGF5ZXJEYXRhLmdldEZlYXR1cmUgPT09IGdldEZlYXR1cmVcbiAgICApIHtcbiAgICAgIC8vIG5vIG5lZWQgdG8gY3JlYXRlIGEgbmV3IGFycmF5IG9mIGRhdGFcbiAgICAgIC8vIHVzZSB1cGRhdGVUcmlnZ2VycyB0byBzZWxlY3RpdmVseSByZS1jYWxjdWxhdGUgYXR0cmlidXRlc1xuICAgICAgZ2VvanNvbkRhdGEgPSBvbGRMYXllckRhdGEuZGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZmlsdGVyZWRJbmRleCBpcyBhIHJlZmVyZW5jZSBvZiBpbmRleCBpbiBhbGxEYXRhIHdoaWNoIGNhbiBtYXAgdG8gZmVhdHVyZVxuICAgICAgZ2VvanNvbkRhdGEgPSBmaWx0ZXJlZEluZGV4XG4gICAgICAgIC5tYXAoaSA9PiB0aGlzLmRhdGFUb0ZlYXR1cmVbaV0pXG4gICAgICAgIC5maWx0ZXIoZCA9PiBkKTtcbiAgICB9XG5cbiAgICBjb25zdCBjU2NhbGUgPVxuICAgICAgY29sb3JGaWVsZCAmJlxuICAgICAgdGhpcy5nZXRWaXNDaGFubmVsU2NhbGUoXG4gICAgICAgIGNvbG9yU2NhbGUsXG4gICAgICAgIGNvbG9yRG9tYWluLFxuICAgICAgICBjb2xvclJhbmdlLmNvbG9ycy5tYXAoaGV4VG9SZ2IpXG4gICAgICApO1xuXG4gICAgLy8gY2FsY3VsYXRlIHN0cm9rZSBzY2FsZSAtIGlmIHN0cm9rZWQgPSB0cnVlXG4gICAgY29uc3Qgc1NjYWxlID1cbiAgICAgIHNpemVGaWVsZCAmJlxuICAgICAgc3Ryb2tlZCAmJlxuICAgICAgdGhpcy5nZXRWaXNDaGFubmVsU2NhbGUoc2l6ZVNjYWxlLCBzaXplRG9tYWluLCBzaXplUmFuZ2UpO1xuXG4gICAgLy8gY2FsY3VsYXRlIGVsZXZhdGlvbiBzY2FsZSAtIGlmIGV4dHJ1ZGVkID0gdHJ1ZVxuICAgIGNvbnN0IGVTY2FsZSA9XG4gICAgICBoZWlnaHRGaWVsZCAmJlxuICAgICAgZW5hYmxlM2QgJiZcbiAgICAgIHRoaXMuZ2V0VmlzQ2hhbm5lbFNjYWxlKGhlaWdodFNjYWxlLCBoZWlnaHREb21haW4sIGhlaWdodFJhbmdlKTtcblxuICAgIC8vIHBvaW50IHJhZGl1c1xuICAgIGNvbnN0IHJTY2FsZSA9XG4gICAgICByYWRpdXNGaWVsZCAmJlxuICAgICAgdGhpcy5nZXRWaXNDaGFubmVsU2NhbGUocmFkaXVzU2NhbGUsIHJhZGl1c0RvbWFpbiwgcmFkaXVzUmFuZ2UpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGE6IGdlb2pzb25EYXRhLFxuICAgICAgZ2V0RmVhdHVyZSxcbiAgICAgIGdldEZpbGxDb2xvcjogZCA9PlxuICAgICAgICBjU2NhbGVcbiAgICAgICAgICA/IHRoaXMuZ2V0RW5jb2RlZENoYW5uZWxWYWx1ZShcbiAgICAgICAgICAgICAgY1NjYWxlLFxuICAgICAgICAgICAgICBhbGxEYXRhW2QucHJvcGVydGllcy5pbmRleF0sXG4gICAgICAgICAgICAgIGNvbG9yRmllbGRcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6IGQucHJvcGVydGllcy5maWxsQ29sb3IgfHwgY29sb3IsXG4gICAgICBnZXRMaW5lQ29sb3I6IGQgPT5cbiAgICAgICAgY1NjYWxlXG4gICAgICAgICAgPyB0aGlzLmdldEVuY29kZWRDaGFubmVsVmFsdWUoXG4gICAgICAgICAgICAgIGNTY2FsZSxcbiAgICAgICAgICAgICAgYWxsRGF0YVtkLnByb3BlcnRpZXMuaW5kZXhdLFxuICAgICAgICAgICAgICBjb2xvckZpZWxkXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiBkLnByb3BlcnRpZXMubGluZUNvbG9yIHx8IGNvbG9yLFxuICAgICAgZ2V0TGluZVdpZHRoOiBkID0+XG4gICAgICAgIHNTY2FsZVxuICAgICAgICAgID8gdGhpcy5nZXRFbmNvZGVkQ2hhbm5lbFZhbHVlKFxuICAgICAgICAgICAgICBzU2NhbGUsXG4gICAgICAgICAgICAgIGFsbERhdGFbZC5wcm9wZXJ0aWVzLmluZGV4XSxcbiAgICAgICAgICAgICAgc2l6ZUZpZWxkLFxuICAgICAgICAgICAgICAwXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiBkLnByb3BlcnRpZXMubGluZVdpZHRoIHx8IDEsXG4gICAgICBnZXRFbGV2YXRpb246IGQgPT5cbiAgICAgICAgZVNjYWxlXG4gICAgICAgICAgPyB0aGlzLmdldEVuY29kZWRDaGFubmVsVmFsdWUoXG4gICAgICAgICAgICAgIGVTY2FsZSxcbiAgICAgICAgICAgICAgYWxsRGF0YVtkLnByb3BlcnRpZXMuaW5kZXhdLFxuICAgICAgICAgICAgICBoZWlnaHRGaWVsZCxcbiAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgKVxuICAgICAgICAgIDogZC5wcm9wZXJ0aWVzLmVsZXZhdGlvbiB8fCA1MDAsXG4gICAgICBnZXRSYWRpdXM6IGQgPT5cbiAgICAgICAgclNjYWxlXG4gICAgICAgICAgPyB0aGlzLmdldEVuY29kZWRDaGFubmVsVmFsdWUoXG4gICAgICAgICAgICAgIHJTY2FsZSxcbiAgICAgICAgICAgICAgYWxsRGF0YVtkLnByb3BlcnRpZXMuaW5kZXhdLFxuICAgICAgICAgICAgICByYWRpdXNGaWVsZCxcbiAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgKVxuICAgICAgICAgIDogZC5wcm9wZXJ0aWVzLnJhZGl1cyB8fCAxXG4gICAgfTtcbiAgfVxuICAvKiBlc2xpbnQtZW5hYmxlIGNvbXBsZXhpdHkgKi9cblxuICB1cGRhdGVMYXllck1ldGEoYWxsRGF0YSwgZ2V0RmVhdHVyZSkge1xuICAgIHRoaXMuZGF0YVRvRmVhdHVyZSA9IGdldEdlb2pzb25EYXRhTWFwcyhhbGxEYXRhLCBnZXRGZWF0dXJlKTtcblxuICAgIC8vIGNhbGN1bGF0ZSBsYXllciBtZXRhXG4gICAgY29uc3QgYWxsRmVhdHVyZXMgPSBPYmplY3QudmFsdWVzKHRoaXMuZGF0YVRvRmVhdHVyZSk7XG5cbiAgICAvLyBnZXQgYm91bmRzIGZyb20gZmVhdHVyZXNcbiAgICBjb25zdCBib3VuZHMgPSBnZXRHZW9qc29uQm91bmRzKGFsbEZlYXR1cmVzKTtcblxuICAgIC8vIGdldCBsaWdodFNldHRpbmdzIGZyb20gcG9pbnRzXG4gICAgY29uc3QgbGlnaHRTZXR0aW5ncyA9IHRoaXMuZ2V0TGlnaHRTZXR0aW5nc0Zyb21Cb3VuZHMoYm91bmRzKTtcblxuICAgIC8vIGlmIGFueSBvZiB0aGUgZmVhdHVyZSBoYXMgcHJvcGVydGllcy5oaS1wcmVjaXNpb24gc2V0IHRvIGJlIHRydWVcbiAgICBjb25zdCBmcDY0ID0gQm9vbGVhbihcbiAgICAgIGFsbEZlYXR1cmVzLmZpbmQoZCA9PiBkICYmIGQucHJvcGVydGllcyAmJiBkLnByb3BlcnRpZXNbJ2hpLXByZWNpc2lvbiddKVxuICAgICk7XG4gICAgY29uc3QgZml4ZWRSYWRpdXMgPSBCb29sZWFuKFxuICAgICAgYWxsRmVhdHVyZXMuZmluZChkID0+IGQgJiYgZC5wcm9wZXJ0aWVzICYmIGQucHJvcGVydGllcy5yYWRpdXMpXG4gICAgKTtcblxuICAgIC8vIGtlZXAgYSByZWNvcmQgb2Ygd2hhdCB0eXBlIG9mIGdlb21ldHJ5IHRoZSBjb2xsZWN0aW9uIGhhc1xuICAgIGNvbnN0IGZlYXR1cmVUeXBlcyA9IGFsbEZlYXR1cmVzLnJlZHVjZSgoYWNjdSwgZikgPT4ge1xuICAgICAgY29uc3QgZ2VvVHlwZSA9IGZlYXR1cmVUb0RlY2tHbEdlb1R5cGUoXG4gICAgICAgIGYgJiYgZi5nZW9tZXRyeSAmJiBmLmdlb21ldHJ5LnR5cGVcbiAgICAgICk7XG5cbiAgICAgIGlmIChnZW9UeXBlKSB7XG4gICAgICAgIGFjY3VbZ2VvVHlwZV0gPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFjY3U7XG4gICAgfSwge30pO1xuXG4gICAgdGhpcy51cGRhdGVNZXRhKHtib3VuZHMsIGxpZ2h0U2V0dGluZ3MsIGZwNjQsIGZpeGVkUmFkaXVzLCBmZWF0dXJlVHlwZXN9KTtcbiAgfVxuXG4gIHJlbmRlckxheWVyKHtcbiAgICBkYXRhLFxuICAgIGlkeCxcbiAgICBvYmplY3RIb3ZlcmVkLFxuICAgIG1hcFN0YXRlLFxuICAgIGludGVyYWN0aW9uQ29uZmlnXG4gIH0pIHtcbiAgICBjb25zdCB7ZnA2NCwgbGlnaHRTZXR0aW5ncywgZml4ZWRSYWRpdXN9ID0gdGhpcy5tZXRhO1xuICAgIGNvbnN0IHJhZGl1c1NjYWxlID0gdGhpcy5nZXRSYWRpdXNTY2FsZUJ5Wm9vbShtYXBTdGF0ZSwgZml4ZWRSYWRpdXMpO1xuICAgIGNvbnN0IHpvb21GYWN0b3IgPSB0aGlzLmdldFpvb21GYWN0b3IobWFwU3RhdGUpO1xuICAgIGNvbnN0IHt2aXNDb25maWd9ID0gdGhpcy5jb25maWc7XG5cbiAgICBjb25zdCBsYXllclByb3BzID0ge1xuICAgICAgLy8gbXVsdGlwbGllciBhcHBsaWVkIGp1c3Qgc28gaXQgYmVpbmcgY29uc2lzdGVudCB3aXRoIHByZXZpb3VzbHkgc2F2ZWQgbWFwc1xuICAgICAgbGluZVdpZHRoU2NhbGU6IHZpc0NvbmZpZy50aGlja25lc3MgKiB6b29tRmFjdG9yICogOCxcbiAgICAgIGxpbmVXaWR0aE1pblBpeGVsczogMSxcbiAgICAgIGVsZXZhdGlvblNjYWxlOiB2aXNDb25maWcuZWxldmF0aW9uU2NhbGUsXG4gICAgICBwb2ludFJhZGl1c1NjYWxlOiByYWRpdXNTY2FsZSxcbiAgICAgIGZwNjQ6IGZwNjQgfHwgdmlzQ29uZmlnWydoaS1wcmVjaXNpb24nXSxcbiAgICAgIGxpbmVNaXRlckxpbWl0OiA0XG4gICAgfTtcblxuICAgIGNvbnN0IHVwZGF0ZVRyaWdnZXJzID0ge1xuICAgICAgZ2V0RWxldmF0aW9uOiB7XG4gICAgICAgIGhlaWdodEZpZWxkOiB0aGlzLmNvbmZpZy5oZWlnaHRGaWVsZCxcbiAgICAgICAgaGVpZ2h0U2NhbGU6IHRoaXMuY29uZmlnLmhlaWdodFNjYWxlLFxuICAgICAgICBoZWlnaHRSYW5nZTogdmlzQ29uZmlnLmhlaWdodFJhbmdlXG4gICAgICB9LFxuICAgICAgZ2V0RmlsbENvbG9yOiB7XG4gICAgICAgIGNvbG9yOiB0aGlzLmNvbmZpZy5jb2xvcixcbiAgICAgICAgY29sb3JGaWVsZDogdGhpcy5jb25maWcuY29sb3JGaWVsZCxcbiAgICAgICAgY29sb3JSYW5nZTogdmlzQ29uZmlnLmNvbG9yUmFuZ2UsXG4gICAgICAgIGNvbG9yU2NhbGU6IHRoaXMuY29uZmlnLmNvbG9yU2NhbGVcbiAgICAgIH0sXG4gICAgICBnZXRMaW5lQ29sb3I6IHtcbiAgICAgICAgY29sb3I6IHRoaXMuY29uZmlnLmNvbG9yLFxuICAgICAgICBjb2xvckZpZWxkOiB0aGlzLmNvbmZpZy5jb2xvckZpZWxkLFxuICAgICAgICBjb2xvclJhbmdlOiB2aXNDb25maWcuY29sb3JSYW5nZSxcbiAgICAgICAgY29sb3JTY2FsZTogdGhpcy5jb25maWcuY29sb3JTY2FsZVxuICAgICAgfSxcbiAgICAgIGdldExpbmVXaWR0aDoge1xuICAgICAgICBzaXplRmllbGQ6IHRoaXMuY29uZmlnLnNpemVGaWVsZCxcbiAgICAgICAgc2l6ZVJhbmdlOiB2aXNDb25maWcuc2l6ZVJhbmdlXG4gICAgICB9LFxuICAgICAgZ2V0UmFkaXVzOiB7XG4gICAgICAgIHJhZGl1c0ZpZWxkOiB0aGlzLmNvbmZpZy5yYWRpdXNGaWVsZCxcbiAgICAgICAgcmFkaXVzUmFuZ2U6IHZpc0NvbmZpZy5yYWRpdXNSYW5nZVxuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gW1xuICAgICAgbmV3IERlY2tHTEdlb0pzb25MYXllcih7XG4gICAgICAgIC4uLmxheWVyUHJvcHMsXG4gICAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgICBpZHgsXG4gICAgICAgIGRhdGE6IGRhdGEuZGF0YSxcbiAgICAgICAgZ2V0RmlsbENvbG9yOiBkYXRhLmdldEZpbGxDb2xvcixcbiAgICAgICAgZ2V0TGluZUNvbG9yOiBkYXRhLmdldExpbmVDb2xvcixcbiAgICAgICAgZ2V0TGluZVdpZHRoOiBkYXRhLmdldExpbmVXaWR0aCxcbiAgICAgICAgZ2V0UmFkaXVzOiBkYXRhLmdldFJhZGl1cyxcbiAgICAgICAgZ2V0RWxldmF0aW9uOiBkYXRhLmdldEVsZXZhdGlvbixcbiAgICAgICAgLy8gaGlnaGxpZ2h0XG4gICAgICAgIHBpY2thYmxlOiB0cnVlLFxuICAgICAgICAvLyBoaWdobGlnaHRDb2xvcjogdGhpcy5jb25maWcuaGlnaGxpZ2h0Q29sb3IsXG4gICAgICAgIGF1dG9IaWdobGlnaHQ6IHZpc0NvbmZpZy5lbmFibGUzZCxcbiAgICAgICAgLy8gcGFyYW1ldGVyc1xuICAgICAgICBwYXJhbWV0ZXJzOiB7ZGVwdGhUZXN0OiBCb29sZWFuKHZpc0NvbmZpZy5lbmFibGUzZCB8fCBtYXBTdGF0ZS5kcmFnUm90YXRlKX0sXG4gICAgICAgIG9wYWNpdHk6IHZpc0NvbmZpZy5vcGFjaXR5LFxuICAgICAgICBzdHJva2VkOiB2aXNDb25maWcuc3Ryb2tlZCxcbiAgICAgICAgZmlsbGVkOiB2aXNDb25maWcuZmlsbGVkLFxuICAgICAgICBleHRydWRlZDogdmlzQ29uZmlnLmVuYWJsZTNkLFxuICAgICAgICB3aXJlZnJhbWU6IHZpc0NvbmZpZy53aXJlZnJhbWUsXG4gICAgICAgIGxpZ2h0U2V0dGluZ3MsXG4gICAgICAgIHVwZGF0ZVRyaWdnZXJzLFxuXG4gICAgICAgIHN1YkxheWVyczoge1xuICAgICAgICAgIC4uLkRlY2tHTEdlb0pzb25MYXllci5kZWZhdWx0UHJvcHMuc3ViTGF5ZXJzLFxuICAgICAgICAgIFBvbHlnb25MYXllcjogSGlnaGxpZ2h0UG9seWdvbkxheWVyXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgLi4uKHRoaXMuaXNMYXllckhvdmVyZWQob2JqZWN0SG92ZXJlZCkgJiYgIXZpc0NvbmZpZy5lbmFibGUzZFxuICAgICAgICA/IFtcbiAgICAgICAgICAgIG5ldyBEZWNrR0xHZW9Kc29uTGF5ZXIoe1xuICAgICAgICAgICAgICAuLi5sYXllclByb3BzLFxuICAgICAgICAgICAgICBpZDogYCR7dGhpcy5pZH0taG92ZXJlZGAsXG4gICAgICAgICAgICAgIGRhdGE6IFtvYmplY3RIb3ZlcmVkLm9iamVjdF0sXG4gICAgICAgICAgICAgIGdldExpbmVXaWR0aDogZGF0YS5nZXRMaW5lV2lkdGgsXG4gICAgICAgICAgICAgIGdldFJhZGl1czogZGF0YS5nZXRSYWRpdXMsXG4gICAgICAgICAgICAgIGdldEVsZXZhdGlvbjogZGF0YS5nZXRFbGV2YXRpb24sXG4gICAgICAgICAgICAgIGdldExpbmVDb2xvcjogdGhpcy5jb25maWcuaGlnaGxpZ2h0Q29sb3IsXG4gICAgICAgICAgICAgIGdldEZpbGxDb2xvcjogdGhpcy5jb25maWcuaGlnaGxpZ2h0Q29sb3IsXG4gICAgICAgICAgICAgIHVwZGF0ZVRyaWdnZXJzLFxuICAgICAgICAgICAgICBzdHJva2VkOiB0cnVlLFxuICAgICAgICAgICAgICBwaWNrYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgIGZpbGxlZDogZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXVxuICAgICAgICA6IFtdKVxuICAgIF07XG4gIH1cbn1cbiJdfQ==