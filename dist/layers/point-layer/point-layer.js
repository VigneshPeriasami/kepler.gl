"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.pointVisConfigs = exports.pointOptionalColumns = exports.pointRequiredColumns = exports.pointLabelResolver = exports.pointLabelAccessor = exports.pointPosResolver = exports.pointPosAccessor = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _baseLayer = _interopRequireDefault(require("../base-layer"));

var _lodash = _interopRequireDefault(require("lodash.memoize"));

var _deck = require("deck.gl");

var _scatterplotBrushingLayer = _interopRequireDefault(require("../../deckgl-layers/scatterplot-brushing-layer/scatterplot-brushing-layer"));

var _lodash2 = _interopRequireDefault(require("lodash.uniq"));

var _colorUtils = require("../../utils/color-utils");

var _pointLayerIcon = _interopRequireDefault(require("./point-layer-icon"));

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
var pointPosAccessor = function pointPosAccessor(_ref) {
  var lat = _ref.lat,
      lng = _ref.lng,
      altitude = _ref.altitude;
  return function (d) {
    return [d.data[lng.fieldIdx], d.data[lat.fieldIdx], altitude && altitude.fieldIdx > -1 ? d.data[altitude.fieldIdx] : 0];
  };
};

exports.pointPosAccessor = pointPosAccessor;

var pointPosResolver = function pointPosResolver(_ref2) {
  var lat = _ref2.lat,
      lng = _ref2.lng,
      altitude = _ref2.altitude;
  return "".concat(lat.fieldIdx, "-").concat(lng.fieldIdx, "-").concat(altitude ? altitude.fieldIdx : 'z');
};

exports.pointPosResolver = pointPosResolver;

var pointLabelAccessor = function pointLabelAccessor(textLabel) {
  return function (d) {
    return String(d.data[textLabel.field.tableFieldIndex - 1]);
  };
};

exports.pointLabelAccessor = pointLabelAccessor;

var pointLabelResolver = function pointLabelResolver(textLabel) {
  return textLabel.field && textLabel.field.tableFieldIndex;
};

exports.pointLabelResolver = pointLabelResolver;
var pointRequiredColumns = ['lat', 'lng'];
exports.pointRequiredColumns = pointRequiredColumns;
var pointOptionalColumns = ['altitude'];
exports.pointOptionalColumns = pointOptionalColumns;
var pointVisConfigs = {
  radius: 'radius',
  fixedRadius: 'fixedRadius',
  opacity: 'opacity',
  outline: 'outline',
  thickness: 'thickness',
  colorRange: 'colorRange',
  radiusRange: 'radiusRange',
  'hi-precision': 'hi-precision'
};
exports.pointVisConfigs = pointVisConfigs;

var PointLayer =
/*#__PURE__*/
function (_Layer) {
  (0, _inherits2.default)(PointLayer, _Layer);

  function PointLayer(props) {
    var _this;

    (0, _classCallCheck2.default)(this, PointLayer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PointLayer).call(this, props));

    _this.registerVisConfig(pointVisConfigs);

    _this.getPosition = (0, _lodash.default)(pointPosAccessor, pointPosResolver);
    _this.getText = (0, _lodash.default)(pointLabelAccessor, pointLabelResolver);
    return _this;
  }

  (0, _createClass2.default)(PointLayer, [{
    key: "formatLayerData",
    // TODO: fix complexity

    /* eslint-disable complexity */
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
          textLabel = _this$config.textLabel,
          _this$config$visConfi = _this$config.visConfig,
          radiusRange = _this$config$visConfi.radiusRange,
          fixedRadius = _this$config$visConfi.fixedRadius,
          colorRange = _this$config$visConfi.colorRange; // point color

      var cScale = colorField && this.getVisChannelScale(colorScale, colorDomain, colorRange.colors.map(_colorUtils.hexToRgb)); // point radius

      var rScale = sizeField && this.getVisChannelScale(sizeScale, sizeDomain, radiusRange, fixedRadius);
      var getPosition = this.getPosition(columns);

      if (!oldLayerData || oldLayerData.getPosition !== getPosition) {
        this.updateLayerMeta(allData, getPosition);
      }

      var data;

      if (oldLayerData && oldLayerData.data && opt.sameData && oldLayerData.getPosition === getPosition) {
        data = oldLayerData.data;
      } else {
        data = filteredIndex.reduce(function (accu, index) {
          var pos = getPosition({
            data: allData[index]
          }); // if doesn't have point lat or lng, do not add the point
          // deck.gl can't handle position = null

          if (!pos.every(Number.isFinite)) {
            return accu;
          }

          accu.push({
            data: allData[index]
          });
          return accu;
        }, []);
      } // get all distinct characters in the text labels


      var getText = this.getText(textLabel);
      var labelCharacterSet;

      if (oldLayerData && oldLayerData.labelCharacterSet && opt.sameData && oldLayerData.getText === getText) {
        labelCharacterSet = oldLayerData.labelCharacterSet;
      } else {
        var textLabels = textLabel.field ? data.map(getText) : [];
        labelCharacterSet = (0, _lodash2.default)(textLabels.join(''));
      }

      var getRadius = rScale ? function (d) {
        return _this2.getEncodedChannelValue(rScale, d.data, sizeField);
      } : 1;
      var getColor = cScale ? function (d) {
        return _this2.getEncodedChannelValue(cScale, d.data, colorField);
      } : color;
      return {
        data: data,
        labelCharacterSet: labelCharacterSet,
        getPosition: getPosition,
        getColor: getColor,
        getRadius: getRadius,
        getText: getText
      };
    }
    /* eslint-enable complexity */

  }, {
    key: "updateLayerMeta",
    value: function updateLayerMeta(allData, getPosition) {
      var bounds = this.getPointsBounds(allData, function (d) {
        return getPosition({
          data: d
        });
      });
      this.updateMeta({
        bounds: bounds
      });
    }
  }, {
    key: "renderLayer",
    value: function renderLayer(_ref3) {
      var _this3 = this;

      var data = _ref3.data,
          idx = _ref3.idx,
          layerInteraction = _ref3.layerInteraction,
          objectHovered = _ref3.objectHovered,
          mapState = _ref3.mapState,
          interactionConfig = _ref3.interactionConfig;
      var enableBrushing = interactionConfig.brush.enabled;
      var layerProps = (0, _objectSpread2.default)({
        outline: this.config.visConfig.outline,
        radiusMinPixels: 1,
        fp64: this.config.visConfig['hi-precision'],
        strokeWidth: this.config.visConfig.thickness,
        radiusScale: this.getRadiusScaleByZoom(mapState)
      }, this.config.visConfig.fixedRadius ? {} : {
        radiusMaxPixels: 500
      });
      var interaction = {
        autoHighlight: !enableBrushing,
        enableBrushing: enableBrushing,
        brushRadius: interactionConfig.brush.config.size * 1000,
        highlightColor: this.config.highlightColor
      };
      return [new _scatterplotBrushingLayer.default((0, _objectSpread2.default)({}, layerProps, layerInteraction, data, interaction, {
        idx: idx,
        id: this.id,
        opacity: this.config.visConfig.opacity,
        pickable: true,
        parameters: {
          // circles will be flat on the map when the altitude column is not used
          depthTest: this.config.columns.altitude.fieldIdx > -1
        },
        updateTriggers: {
          getRadius: {
            sizeField: this.config.sizeField,
            radiusRange: this.config.visConfig.radiusRange,
            fixedRadius: this.config.visConfig.fixedRadius,
            sizeScale: this.config.sizeScale
          },
          getColor: {
            color: this.config.color,
            colorField: this.config.colorField,
            colorRange: this.config.visConfig.colorRange,
            colorScale: this.config.colorScale
          }
        }
      }))].concat((0, _toConsumableArray2.default)(this.config.textLabel.field ? [new _deck.TextLayer({
        id: "".concat(this.id, "-label"),
        data: data.data,
        getPosition: data.getPosition,
        getPixelOffset: this.config.textLabel.offset,
        getSize: this.config.textLabel.size,
        getTextAnchor: this.config.textLabel.anchor,
        getText: data.getText,
        getColor: function getColor(d) {
          return _this3.config.textLabel.color;
        },
        fp64: this.config.visConfig['hi-precision'],
        parameters: {
          // text will always show on top of all layers
          depthTest: false
        },
        characterSet: data.labelCharacterSet,
        updateTriggers: {
          getPosition: data.getPosition,
          getPixelOffset: this.config.textLabel.offset,
          getText: this.config.textLabel.field,
          getTextAnchor: this.config.textLabel.anchor,
          getSize: this.config.textLabel.size,
          getColor: this.config.textLabel.color
        }
      })] : []));
    }
  }, {
    key: "type",
    get: function get() {
      return 'point';
    }
  }, {
    key: "isAggregated",
    get: function get() {
      return false;
    }
  }, {
    key: "layerIcon",
    get: function get() {
      return _pointLayerIcon.default;
    }
  }, {
    key: "requiredLayerColumns",
    get: function get() {
      return pointRequiredColumns;
    }
  }, {
    key: "optionalColumns",
    get: function get() {
      return pointOptionalColumns;
    }
  }, {
    key: "columnPairs",
    get: function get() {
      return this.defaultPointColumnPairs;
    }
  }, {
    key: "noneLayerDataAffectingProps",
    get: function get() {
      return [].concat((0, _toConsumableArray2.default)((0, _get2.default)((0, _getPrototypeOf2.default)(PointLayer.prototype), "noneLayerDataAffectingProps", this)), ['radius']);
    }
  }, {
    key: "visualChannels",
    get: function get() {
      return (0, _objectSpread2.default)({}, (0, _get2.default)((0, _getPrototypeOf2.default)(PointLayer.prototype), "visualChannels", this), {
        size: (0, _objectSpread2.default)({}, (0, _get2.default)((0, _getPrototypeOf2.default)(PointLayer.prototype), "visualChannels", this).size, {
          range: 'radiusRange',
          property: 'radius',
          channelScaleType: 'radius'
        })
      });
    }
  }], [{
    key: "findDefaultLayerProps",
    value: function findDefaultLayerProps(_ref4) {
      var _ref4$fieldPairs = _ref4.fieldPairs,
          fieldPairs = _ref4$fieldPairs === void 0 ? [] : _ref4$fieldPairs;
      var props = []; // Make layer for each pair

      fieldPairs.forEach(function (pair) {
        // find fields for tableFieldIndex
        var latField = pair.pair.lat;
        var lngField = pair.pair.lng;
        var layerName = pair.defaultName;
        var prop = {
          label: layerName.length ? layerName : 'Point'
        }; // default layer color for begintrip and dropoff point

        if (latField.value in _defaultSettings.DEFAULT_LAYER_COLOR) {
          prop.color = (0, _colorUtils.hexToRgb)(_defaultSettings.DEFAULT_LAYER_COLOR[latField.value]);
        } // set the first layer to be visible


        if (props.length === 0) {
          prop.isVisible = true;
        } // const newLayer = new KeplerGlLayers.PointLayer(prop);


        prop.columns = {
          lat: latField,
          lng: lngField,
          altitude: {
            value: null,
            fieldIdx: -1,
            optional: true
          }
        };
        props.push(prop);
      });
      return props;
    }
  }]);
  return PointLayer;
}(_baseLayer.default);

exports.default = PointLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvcG9pbnQtbGF5ZXIvcG9pbnQtbGF5ZXIuanMiXSwibmFtZXMiOlsicG9pbnRQb3NBY2Nlc3NvciIsImxhdCIsImxuZyIsImFsdGl0dWRlIiwiZCIsImRhdGEiLCJmaWVsZElkeCIsInBvaW50UG9zUmVzb2x2ZXIiLCJwb2ludExhYmVsQWNjZXNzb3IiLCJ0ZXh0TGFiZWwiLCJTdHJpbmciLCJmaWVsZCIsInRhYmxlRmllbGRJbmRleCIsInBvaW50TGFiZWxSZXNvbHZlciIsInBvaW50UmVxdWlyZWRDb2x1bW5zIiwicG9pbnRPcHRpb25hbENvbHVtbnMiLCJwb2ludFZpc0NvbmZpZ3MiLCJyYWRpdXMiLCJmaXhlZFJhZGl1cyIsIm9wYWNpdHkiLCJvdXRsaW5lIiwidGhpY2tuZXNzIiwiY29sb3JSYW5nZSIsInJhZGl1c1JhbmdlIiwiUG9pbnRMYXllciIsInByb3BzIiwicmVnaXN0ZXJWaXNDb25maWciLCJnZXRQb3NpdGlvbiIsImdldFRleHQiLCJfIiwiYWxsRGF0YSIsImZpbHRlcmVkSW5kZXgiLCJvbGRMYXllckRhdGEiLCJvcHQiLCJjb25maWciLCJjb2xvclNjYWxlIiwiY29sb3JEb21haW4iLCJjb2xvckZpZWxkIiwiY29sb3IiLCJjb2x1bW5zIiwic2l6ZUZpZWxkIiwic2l6ZVNjYWxlIiwic2l6ZURvbWFpbiIsInZpc0NvbmZpZyIsImNTY2FsZSIsImdldFZpc0NoYW5uZWxTY2FsZSIsImNvbG9ycyIsIm1hcCIsImhleFRvUmdiIiwiclNjYWxlIiwidXBkYXRlTGF5ZXJNZXRhIiwic2FtZURhdGEiLCJyZWR1Y2UiLCJhY2N1IiwiaW5kZXgiLCJwb3MiLCJldmVyeSIsIk51bWJlciIsImlzRmluaXRlIiwicHVzaCIsImxhYmVsQ2hhcmFjdGVyU2V0IiwidGV4dExhYmVscyIsImpvaW4iLCJnZXRSYWRpdXMiLCJnZXRFbmNvZGVkQ2hhbm5lbFZhbHVlIiwiZ2V0Q29sb3IiLCJib3VuZHMiLCJnZXRQb2ludHNCb3VuZHMiLCJ1cGRhdGVNZXRhIiwiaWR4IiwibGF5ZXJJbnRlcmFjdGlvbiIsIm9iamVjdEhvdmVyZWQiLCJtYXBTdGF0ZSIsImludGVyYWN0aW9uQ29uZmlnIiwiZW5hYmxlQnJ1c2hpbmciLCJicnVzaCIsImVuYWJsZWQiLCJsYXllclByb3BzIiwicmFkaXVzTWluUGl4ZWxzIiwiZnA2NCIsInN0cm9rZVdpZHRoIiwicmFkaXVzU2NhbGUiLCJnZXRSYWRpdXNTY2FsZUJ5Wm9vbSIsInJhZGl1c01heFBpeGVscyIsImludGVyYWN0aW9uIiwiYXV0b0hpZ2hsaWdodCIsImJydXNoUmFkaXVzIiwic2l6ZSIsImhpZ2hsaWdodENvbG9yIiwiU2NhdHRlcnBsb3RCcnVzaGluZ0xheWVyIiwiaWQiLCJwaWNrYWJsZSIsInBhcmFtZXRlcnMiLCJkZXB0aFRlc3QiLCJ1cGRhdGVUcmlnZ2VycyIsIlRleHRMYXllciIsImdldFBpeGVsT2Zmc2V0Iiwib2Zmc2V0IiwiZ2V0U2l6ZSIsImdldFRleHRBbmNob3IiLCJhbmNob3IiLCJjaGFyYWN0ZXJTZXQiLCJQb2ludExheWVySWNvbiIsImRlZmF1bHRQb2ludENvbHVtblBhaXJzIiwicmFuZ2UiLCJwcm9wZXJ0eSIsImNoYW5uZWxTY2FsZVR5cGUiLCJmaWVsZFBhaXJzIiwiZm9yRWFjaCIsInBhaXIiLCJsYXRGaWVsZCIsImxuZ0ZpZWxkIiwibGF5ZXJOYW1lIiwiZGVmYXVsdE5hbWUiLCJwcm9wIiwibGFiZWwiLCJsZW5ndGgiLCJ2YWx1ZSIsIkRFRkFVTFRfTEFZRVJfQ09MT1IiLCJpc1Zpc2libGUiLCJvcHRpb25hbCIsIkxheWVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQTNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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LEVBQUUsSUFBUjtBQUFjL0csWUFBQUEsUUFBUSxFQUFFLENBQUMsQ0FBekI7QUFBNEJrSCxZQUFBQSxRQUFRLEVBQUU7QUFBdEM7QUFIRyxTQUFmO0FBTUEvRixRQUFBQSxLQUFLLENBQUNrQyxJQUFOLENBQVd1RCxJQUFYO0FBQ0QsT0E1QkQ7QUE4QkEsYUFBT3pGLEtBQVA7QUFDRDs7O0VBbkZxQ2dHLGtCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IExheWVyIGZyb20gJy4uL2Jhc2UtbGF5ZXInO1xuaW1wb3J0IG1lbW9pemUgZnJvbSAnbG9kYXNoLm1lbW9pemUnO1xuaW1wb3J0IHtUZXh0TGF5ZXJ9IGZyb20gJ2RlY2suZ2wnO1xuaW1wb3J0IFNjYXR0ZXJwbG90QnJ1c2hpbmdMYXllciBmcm9tICdkZWNrZ2wtbGF5ZXJzL3NjYXR0ZXJwbG90LWJydXNoaW5nLWxheWVyL3NjYXR0ZXJwbG90LWJydXNoaW5nLWxheWVyJztcbmltcG9ydCB1bmlxIGZyb20gJ2xvZGFzaC51bmlxJztcbmltcG9ydCB7aGV4VG9SZ2J9IGZyb20gJ3V0aWxzL2NvbG9yLXV0aWxzJztcbmltcG9ydCBQb2ludExheWVySWNvbiBmcm9tICcuL3BvaW50LWxheWVyLWljb24nO1xuaW1wb3J0IHtERUZBVUxUX0xBWUVSX0NPTE9SfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5cbmV4cG9ydCBjb25zdCBwb2ludFBvc0FjY2Vzc29yID0gKHtsYXQsIGxuZywgYWx0aXR1ZGV9KSA9PiBkID0+IFtcbiAgZC5kYXRhW2xuZy5maWVsZElkeF0sXG4gIGQuZGF0YVtsYXQuZmllbGRJZHhdLFxuICBhbHRpdHVkZSAmJiBhbHRpdHVkZS5maWVsZElkeCA+IC0xID8gZC5kYXRhW2FsdGl0dWRlLmZpZWxkSWR4XSA6IDBcbl07XG5cbmV4cG9ydCBjb25zdCBwb2ludFBvc1Jlc29sdmVyID0gKHtsYXQsIGxuZywgYWx0aXR1ZGV9KSA9PlxuICBgJHtsYXQuZmllbGRJZHh9LSR7bG5nLmZpZWxkSWR4fS0ke2FsdGl0dWRlID8gYWx0aXR1ZGUuZmllbGRJZHggOiAneid9YDtcblxuZXhwb3J0IGNvbnN0IHBvaW50TGFiZWxBY2Nlc3NvciA9IHRleHRMYWJlbCA9PiBkID0+IFN0cmluZyhkLmRhdGFbdGV4dExhYmVsLmZpZWxkLnRhYmxlRmllbGRJbmRleCAtIDFdKTtcbmV4cG9ydCBjb25zdCBwb2ludExhYmVsUmVzb2x2ZXIgPSB0ZXh0TGFiZWwgPT4gdGV4dExhYmVsLmZpZWxkICYmIHRleHRMYWJlbC5maWVsZC50YWJsZUZpZWxkSW5kZXg7XG5cbmV4cG9ydCBjb25zdCBwb2ludFJlcXVpcmVkQ29sdW1ucyA9IFsnbGF0JywgJ2xuZyddO1xuZXhwb3J0IGNvbnN0IHBvaW50T3B0aW9uYWxDb2x1bW5zID0gWydhbHRpdHVkZSddO1xuXG5leHBvcnQgY29uc3QgcG9pbnRWaXNDb25maWdzID0ge1xuICByYWRpdXM6ICdyYWRpdXMnLFxuICBmaXhlZFJhZGl1czogJ2ZpeGVkUmFkaXVzJyxcbiAgb3BhY2l0eTogJ29wYWNpdHknLFxuICBvdXRsaW5lOiAnb3V0bGluZScsXG4gIHRoaWNrbmVzczogJ3RoaWNrbmVzcycsXG4gIGNvbG9yUmFuZ2U6ICdjb2xvclJhbmdlJyxcbiAgcmFkaXVzUmFuZ2U6ICdyYWRpdXNSYW5nZScsXG4gICdoaS1wcmVjaXNpb24nOiAnaGktcHJlY2lzaW9uJ1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9pbnRMYXllciBleHRlbmRzIExheWVyIHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnJlZ2lzdGVyVmlzQ29uZmlnKHBvaW50VmlzQ29uZmlncyk7XG4gICAgdGhpcy5nZXRQb3NpdGlvbiA9IG1lbW9pemUocG9pbnRQb3NBY2Nlc3NvciwgcG9pbnRQb3NSZXNvbHZlcik7XG4gICAgdGhpcy5nZXRUZXh0ID0gbWVtb2l6ZShwb2ludExhYmVsQWNjZXNzb3IsIHBvaW50TGFiZWxSZXNvbHZlcik7XG4gIH1cblxuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gJ3BvaW50JztcbiAgfVxuXG4gIGdldCBpc0FnZ3JlZ2F0ZWQoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0IGxheWVySWNvbigpIHtcbiAgICByZXR1cm4gUG9pbnRMYXllckljb247XG4gIH1cbiAgZ2V0IHJlcXVpcmVkTGF5ZXJDb2x1bW5zKCkge1xuICAgIHJldHVybiBwb2ludFJlcXVpcmVkQ29sdW1ucztcbiAgfVxuXG4gIGdldCBvcHRpb25hbENvbHVtbnMoKSB7XG4gICAgcmV0dXJuIHBvaW50T3B0aW9uYWxDb2x1bW5zO1xuICB9XG5cbiAgZ2V0IGNvbHVtblBhaXJzKCkge1xuICAgIHJldHVybiB0aGlzLmRlZmF1bHRQb2ludENvbHVtblBhaXJzO1xuICB9XG5cbiAgZ2V0IG5vbmVMYXllckRhdGFBZmZlY3RpbmdQcm9wcygpIHtcbiAgICByZXR1cm4gWy4uLnN1cGVyLm5vbmVMYXllckRhdGFBZmZlY3RpbmdQcm9wcywgJ3JhZGl1cyddO1xuICB9XG5cbiAgZ2V0IHZpc3VhbENoYW5uZWxzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdXBlci52aXN1YWxDaGFubmVscyxcbiAgICAgIHNpemU6IHtcbiAgICAgICAgLi4uc3VwZXIudmlzdWFsQ2hhbm5lbHMuc2l6ZSxcbiAgICAgICAgcmFuZ2U6ICdyYWRpdXNSYW5nZScsXG4gICAgICAgIHByb3BlcnR5OiAncmFkaXVzJyxcbiAgICAgICAgY2hhbm5lbFNjYWxlVHlwZTogJ3JhZGl1cydcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGZpbmREZWZhdWx0TGF5ZXJQcm9wcyh7ZmllbGRQYWlycyA9IFtdfSkge1xuICAgIGNvbnN0IHByb3BzID0gW107XG5cbiAgICAvLyBNYWtlIGxheWVyIGZvciBlYWNoIHBhaXJcbiAgICBmaWVsZFBhaXJzLmZvckVhY2gocGFpciA9PiB7XG4gICAgICAvLyBmaW5kIGZpZWxkcyBmb3IgdGFibGVGaWVsZEluZGV4XG4gICAgICBjb25zdCBsYXRGaWVsZCA9IHBhaXIucGFpci5sYXQ7XG4gICAgICBjb25zdCBsbmdGaWVsZCA9IHBhaXIucGFpci5sbmc7XG4gICAgICBjb25zdCBsYXllck5hbWUgPSBwYWlyLmRlZmF1bHROYW1lO1xuXG4gICAgICBjb25zdCBwcm9wID0ge1xuICAgICAgICBsYWJlbDogbGF5ZXJOYW1lLmxlbmd0aCA/IGxheWVyTmFtZSA6ICdQb2ludCdcbiAgICAgIH07XG5cbiAgICAgIC8vIGRlZmF1bHQgbGF5ZXIgY29sb3IgZm9yIGJlZ2ludHJpcCBhbmQgZHJvcG9mZiBwb2ludFxuICAgICAgaWYgKGxhdEZpZWxkLnZhbHVlIGluIERFRkFVTFRfTEFZRVJfQ09MT1IpIHtcbiAgICAgICAgcHJvcC5jb2xvciA9IGhleFRvUmdiKERFRkFVTFRfTEFZRVJfQ09MT1JbbGF0RmllbGQudmFsdWVdKTtcbiAgICAgIH1cblxuICAgICAgLy8gc2V0IHRoZSBmaXJzdCBsYXllciB0byBiZSB2aXNpYmxlXG4gICAgICBpZiAocHJvcHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHByb3AuaXNWaXNpYmxlID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gY29uc3QgbmV3TGF5ZXIgPSBuZXcgS2VwbGVyR2xMYXllcnMuUG9pbnRMYXllcihwcm9wKTtcbiAgICAgIHByb3AuY29sdW1ucyA9IHtcbiAgICAgICAgbGF0OiBsYXRGaWVsZCxcbiAgICAgICAgbG5nOiBsbmdGaWVsZCxcbiAgICAgICAgYWx0aXR1ZGU6IHt2YWx1ZTogbnVsbCwgZmllbGRJZHg6IC0xLCBvcHRpb25hbDogdHJ1ZX1cbiAgICAgIH07XG5cbiAgICAgIHByb3BzLnB1c2gocHJvcCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcHJvcHM7XG4gIH1cblxuICAvLyBUT0RPOiBmaXggY29tcGxleGl0eVxuICAvKiBlc2xpbnQtZGlzYWJsZSBjb21wbGV4aXR5ICovXG4gIGZvcm1hdExheWVyRGF0YShfLCBhbGxEYXRhLCBmaWx0ZXJlZEluZGV4LCBvbGRMYXllckRhdGEsIG9wdCA9IHt9KSB7XG4gICAgY29uc3Qge1xuICAgICAgY29sb3JTY2FsZSxcbiAgICAgIGNvbG9yRG9tYWluLFxuICAgICAgY29sb3JGaWVsZCxcbiAgICAgIGNvbG9yLFxuICAgICAgY29sdW1ucyxcbiAgICAgIHNpemVGaWVsZCxcbiAgICAgIHNpemVTY2FsZSxcbiAgICAgIHNpemVEb21haW4sXG4gICAgICB0ZXh0TGFiZWwsXG4gICAgICB2aXNDb25maWc6IHtyYWRpdXNSYW5nZSwgZml4ZWRSYWRpdXMsIGNvbG9yUmFuZ2V9XG4gICAgfSA9IHRoaXMuY29uZmlnO1xuXG4gICAgLy8gcG9pbnQgY29sb3JcbiAgICBjb25zdCBjU2NhbGUgPVxuICAgICAgY29sb3JGaWVsZCAmJlxuICAgICAgdGhpcy5nZXRWaXNDaGFubmVsU2NhbGUoXG4gICAgICAgIGNvbG9yU2NhbGUsXG4gICAgICAgIGNvbG9yRG9tYWluLFxuICAgICAgICBjb2xvclJhbmdlLmNvbG9ycy5tYXAoaGV4VG9SZ2IpXG4gICAgICApO1xuXG4gICAgLy8gcG9pbnQgcmFkaXVzXG4gICAgY29uc3QgclNjYWxlID1cbiAgICAgIHNpemVGaWVsZCAmJlxuICAgICAgdGhpcy5nZXRWaXNDaGFubmVsU2NhbGUoc2l6ZVNjYWxlLCBzaXplRG9tYWluLCByYWRpdXNSYW5nZSwgZml4ZWRSYWRpdXMpO1xuXG4gICAgY29uc3QgZ2V0UG9zaXRpb24gPSB0aGlzLmdldFBvc2l0aW9uKGNvbHVtbnMpO1xuXG4gICAgaWYgKCFvbGRMYXllckRhdGEgfHwgb2xkTGF5ZXJEYXRhLmdldFBvc2l0aW9uICE9PSBnZXRQb3NpdGlvbikge1xuICAgICAgdGhpcy51cGRhdGVMYXllck1ldGEoYWxsRGF0YSwgZ2V0UG9zaXRpb24pO1xuICAgIH1cblxuICAgIGxldCBkYXRhO1xuICAgIGlmIChcbiAgICAgIG9sZExheWVyRGF0YSAmJlxuICAgICAgb2xkTGF5ZXJEYXRhLmRhdGEgJiZcbiAgICAgIG9wdC5zYW1lRGF0YSAmJlxuICAgICAgb2xkTGF5ZXJEYXRhLmdldFBvc2l0aW9uID09PSBnZXRQb3NpdGlvblxuICAgICkge1xuICAgICAgZGF0YSA9IG9sZExheWVyRGF0YS5kYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRhID0gZmlsdGVyZWRJbmRleC5yZWR1Y2UoKGFjY3UsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IHBvcyA9IGdldFBvc2l0aW9uKHtkYXRhOiBhbGxEYXRhW2luZGV4XX0pO1xuXG4gICAgICAgIC8vIGlmIGRvZXNuJ3QgaGF2ZSBwb2ludCBsYXQgb3IgbG5nLCBkbyBub3QgYWRkIHRoZSBwb2ludFxuICAgICAgICAvLyBkZWNrLmdsIGNhbid0IGhhbmRsZSBwb3NpdGlvbiA9IG51bGxcbiAgICAgICAgaWYgKCFwb3MuZXZlcnkoTnVtYmVyLmlzRmluaXRlKSkge1xuICAgICAgICAgIHJldHVybiBhY2N1O1xuICAgICAgICB9XG5cbiAgICAgICAgYWNjdS5wdXNoKHtcbiAgICAgICAgICBkYXRhOiBhbGxEYXRhW2luZGV4XVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gYWNjdTtcbiAgICAgIH0sIFtdKTtcbiAgICB9XG5cbiAgICAvLyBnZXQgYWxsIGRpc3RpbmN0IGNoYXJhY3RlcnMgaW4gdGhlIHRleHQgbGFiZWxzXG4gICAgY29uc3QgZ2V0VGV4dCA9IHRoaXMuZ2V0VGV4dCh0ZXh0TGFiZWwpO1xuICAgIGxldCBsYWJlbENoYXJhY3RlclNldDtcbiAgICBpZiAoXG4gICAgICBvbGRMYXllckRhdGEgJiZcbiAgICAgIG9sZExheWVyRGF0YS5sYWJlbENoYXJhY3RlclNldCAmJlxuICAgICAgb3B0LnNhbWVEYXRhICYmXG4gICAgICBvbGRMYXllckRhdGEuZ2V0VGV4dCA9PT0gZ2V0VGV4dFxuICAgICkge1xuICAgICAgbGFiZWxDaGFyYWN0ZXJTZXQgPSBvbGRMYXllckRhdGEubGFiZWxDaGFyYWN0ZXJTZXRcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdGV4dExhYmVscyA9IHRleHRMYWJlbC5maWVsZCA/IGRhdGEubWFwKGdldFRleHQpIDogW107XG4gICAgICBsYWJlbENoYXJhY3RlclNldCA9IHVuaXEodGV4dExhYmVscy5qb2luKCcnKSk7XG4gICAgfVxuXG4gICAgY29uc3QgZ2V0UmFkaXVzID0gclNjYWxlID8gZCA9PlxuICAgICAgdGhpcy5nZXRFbmNvZGVkQ2hhbm5lbFZhbHVlKHJTY2FsZSwgZC5kYXRhLCBzaXplRmllbGQpIDogMTtcblxuICAgIGNvbnN0IGdldENvbG9yID0gY1NjYWxlID8gZCA9PlxuICAgICAgdGhpcy5nZXRFbmNvZGVkQ2hhbm5lbFZhbHVlKGNTY2FsZSwgZC5kYXRhLCBjb2xvckZpZWxkKSA6IGNvbG9yO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGEsXG4gICAgICBsYWJlbENoYXJhY3RlclNldCxcbiAgICAgIGdldFBvc2l0aW9uLFxuICAgICAgZ2V0Q29sb3IsXG4gICAgICBnZXRSYWRpdXMsXG4gICAgICBnZXRUZXh0XG4gICAgfTtcbiAgfVxuICAvKiBlc2xpbnQtZW5hYmxlIGNvbXBsZXhpdHkgKi9cblxuICB1cGRhdGVMYXllck1ldGEoYWxsRGF0YSwgZ2V0UG9zaXRpb24pIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldFBvaW50c0JvdW5kcyhhbGxEYXRhLCBkID0+IGdldFBvc2l0aW9uKHtkYXRhOiBkfSkpO1xuICAgIHRoaXMudXBkYXRlTWV0YSh7Ym91bmRzfSk7XG4gIH1cblxuICByZW5kZXJMYXllcih7XG4gICAgZGF0YSxcbiAgICBpZHgsXG4gICAgbGF5ZXJJbnRlcmFjdGlvbixcbiAgICBvYmplY3RIb3ZlcmVkLFxuICAgIG1hcFN0YXRlLFxuICAgIGludGVyYWN0aW9uQ29uZmlnXG4gIH0pIHtcbiAgICBjb25zdCBlbmFibGVCcnVzaGluZyA9IGludGVyYWN0aW9uQ29uZmlnLmJydXNoLmVuYWJsZWQ7XG5cbiAgICBjb25zdCBsYXllclByb3BzID0ge1xuICAgICAgb3V0bGluZTogdGhpcy5jb25maWcudmlzQ29uZmlnLm91dGxpbmUsXG4gICAgICByYWRpdXNNaW5QaXhlbHM6IDEsXG4gICAgICBmcDY0OiB0aGlzLmNvbmZpZy52aXNDb25maWdbJ2hpLXByZWNpc2lvbiddLFxuICAgICAgc3Ryb2tlV2lkdGg6IHRoaXMuY29uZmlnLnZpc0NvbmZpZy50aGlja25lc3MsXG4gICAgICByYWRpdXNTY2FsZTogdGhpcy5nZXRSYWRpdXNTY2FsZUJ5Wm9vbShtYXBTdGF0ZSksXG4gICAgICAuLi4odGhpcy5jb25maWcudmlzQ29uZmlnLmZpeGVkUmFkaXVzID8ge30gOiB7cmFkaXVzTWF4UGl4ZWxzOiA1MDB9KVxuICAgIH07XG5cbiAgICBjb25zdCBpbnRlcmFjdGlvbiA9IHtcbiAgICAgIGF1dG9IaWdobGlnaHQ6ICFlbmFibGVCcnVzaGluZyxcbiAgICAgIGVuYWJsZUJydXNoaW5nLFxuICAgICAgYnJ1c2hSYWRpdXM6IGludGVyYWN0aW9uQ29uZmlnLmJydXNoLmNvbmZpZy5zaXplICogMTAwMCxcbiAgICAgIGhpZ2hsaWdodENvbG9yOiB0aGlzLmNvbmZpZy5oaWdobGlnaHRDb2xvclxuICAgIH07XG5cbiAgICByZXR1cm4gW1xuICAgICAgbmV3IFNjYXR0ZXJwbG90QnJ1c2hpbmdMYXllcih7XG4gICAgICAgIC4uLmxheWVyUHJvcHMsXG4gICAgICAgIC4uLmxheWVySW50ZXJhY3Rpb24sXG4gICAgICAgIC4uLmRhdGEsXG4gICAgICAgIC4uLmludGVyYWN0aW9uLFxuICAgICAgICBpZHgsXG4gICAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgICBvcGFjaXR5OiB0aGlzLmNvbmZpZy52aXNDb25maWcub3BhY2l0eSxcbiAgICAgICAgcGlja2FibGU6IHRydWUsXG4gICAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAvLyBjaXJjbGVzIHdpbGwgYmUgZmxhdCBvbiB0aGUgbWFwIHdoZW4gdGhlIGFsdGl0dWRlIGNvbHVtbiBpcyBub3QgdXNlZFxuICAgICAgICAgIGRlcHRoVGVzdDogdGhpcy5jb25maWcuY29sdW1ucy5hbHRpdHVkZS5maWVsZElkeCA+IC0xXG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlVHJpZ2dlcnM6IHtcbiAgICAgICAgICBnZXRSYWRpdXM6IHtcbiAgICAgICAgICAgIHNpemVGaWVsZDogdGhpcy5jb25maWcuc2l6ZUZpZWxkLFxuICAgICAgICAgICAgcmFkaXVzUmFuZ2U6IHRoaXMuY29uZmlnLnZpc0NvbmZpZy5yYWRpdXNSYW5nZSxcbiAgICAgICAgICAgIGZpeGVkUmFkaXVzOiB0aGlzLmNvbmZpZy52aXNDb25maWcuZml4ZWRSYWRpdXMsXG4gICAgICAgICAgICBzaXplU2NhbGU6IHRoaXMuY29uZmlnLnNpemVTY2FsZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0Q29sb3I6IHtcbiAgICAgICAgICAgIGNvbG9yOiB0aGlzLmNvbmZpZy5jb2xvcixcbiAgICAgICAgICAgIGNvbG9yRmllbGQ6IHRoaXMuY29uZmlnLmNvbG9yRmllbGQsXG4gICAgICAgICAgICBjb2xvclJhbmdlOiB0aGlzLmNvbmZpZy52aXNDb25maWcuY29sb3JSYW5nZSxcbiAgICAgICAgICAgIGNvbG9yU2NhbGU6IHRoaXMuY29uZmlnLmNvbG9yU2NhbGVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgLy8gdGV4dCBsYWJlbCBsYXllclxuICAgICAgLi4uKHRoaXMuY29uZmlnLnRleHRMYWJlbC5maWVsZFxuICAgICAgICA/IFtcbiAgICAgICAgICAgIG5ldyBUZXh0TGF5ZXIoe1xuICAgICAgICAgICAgICBpZDogYCR7dGhpcy5pZH0tbGFiZWxgLFxuICAgICAgICAgICAgICBkYXRhOiBkYXRhLmRhdGEsXG4gICAgICAgICAgICAgIGdldFBvc2l0aW9uOiBkYXRhLmdldFBvc2l0aW9uLFxuICAgICAgICAgICAgICBnZXRQaXhlbE9mZnNldDogdGhpcy5jb25maWcudGV4dExhYmVsLm9mZnNldCxcbiAgICAgICAgICAgICAgZ2V0U2l6ZTogdGhpcy5jb25maWcudGV4dExhYmVsLnNpemUsXG4gICAgICAgICAgICAgIGdldFRleHRBbmNob3I6IHRoaXMuY29uZmlnLnRleHRMYWJlbC5hbmNob3IsXG4gICAgICAgICAgICAgIGdldFRleHQ6IGRhdGEuZ2V0VGV4dCxcbiAgICAgICAgICAgICAgZ2V0Q29sb3I6IGQgPT4gdGhpcy5jb25maWcudGV4dExhYmVsLmNvbG9yLFxuICAgICAgICAgICAgICBmcDY0OiB0aGlzLmNvbmZpZy52aXNDb25maWdbJ2hpLXByZWNpc2lvbiddLFxuICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgICAgICAgLy8gdGV4dCB3aWxsIGFsd2F5cyBzaG93IG9uIHRvcCBvZiBhbGwgbGF5ZXJzXG4gICAgICAgICAgICAgICAgZGVwdGhUZXN0OiBmYWxzZVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBjaGFyYWN0ZXJTZXQ6IGRhdGEubGFiZWxDaGFyYWN0ZXJTZXQsXG4gICAgICAgICAgICAgIHVwZGF0ZVRyaWdnZXJzOiB7XG4gICAgICAgICAgICAgICAgZ2V0UG9zaXRpb246IGRhdGEuZ2V0UG9zaXRpb24sXG4gICAgICAgICAgICAgICAgZ2V0UGl4ZWxPZmZzZXQ6IHRoaXMuY29uZmlnLnRleHRMYWJlbC5vZmZzZXQsXG4gICAgICAgICAgICAgICAgZ2V0VGV4dDogdGhpcy5jb25maWcudGV4dExhYmVsLmZpZWxkLFxuICAgICAgICAgICAgICAgIGdldFRleHRBbmNob3I6IHRoaXMuY29uZmlnLnRleHRMYWJlbC5hbmNob3IsXG4gICAgICAgICAgICAgICAgZ2V0U2l6ZTogdGhpcy5jb25maWcudGV4dExhYmVsLnNpemUsXG4gICAgICAgICAgICAgICAgZ2V0Q29sb3I6IHRoaXMuY29uZmlnLnRleHRMYWJlbC5jb2xvclxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF1cbiAgICAgICAgOiBbXSlcbiAgICBdO1xuICB9XG59XG4iXX0=