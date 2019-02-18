"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.OVERLAY_TYPE = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread6 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _colorUtils = require("../utils/color-utils");

var _window = require("global/window");

var _keymirror = _interopRequireDefault(require("keymirror"));

var _defaultLayerIcon = _interopRequireDefault(require("./default-layer-icon"));

var _defaultSettings = require("../constants/default-settings");

var _customColorRanges = require("../constants/custom-color-ranges");

var _layerFactory = require("./layer-factory");

var _utils = require("../utils/utils");

var _dataUtils = require("../utils/data-utils");

var _dataScaleUtils = require("../utils/data-scale-utils");

var _marked =
/*#__PURE__*/
_regenerator.default.mark(generateColor);

/**
 * Approx. number of points to sample in a large data set
 * @type {number}
 */
var MAX_SAMPLE_SIZE = 5000;
var OVERLAY_TYPE = (0, _keymirror.default)({
  deckgl: null,
  mapboxgl: null
});
exports.OVERLAY_TYPE = OVERLAY_TYPE;
var layerColors = Object.values(_customColorRanges.DataVizColors).map(_colorUtils.hexToRgb);

function generateColor() {
  var index;
  return _regenerator.default.wrap(function generateColor$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          index = 0;

        case 1:
          if (!(index < layerColors.length + 1)) {
            _context.next = 7;
            break;
          }

          if (index === layerColors.length) {
            index = 0;
          }

          _context.next = 5;
          return layerColors[index++];

        case 5:
          _context.next = 1;
          break;

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

var colorMaker = generateColor();

var defaultGetFieldValue = function defaultGetFieldValue(field, d) {
  return d[field.tableFieldIndex - 1];
};

var Layer =
/*#__PURE__*/
function () {
  function Layer() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2.default)(this, Layer);
    this.id = props.id || (0, _utils.generateHashId)(6); // meta

    this.meta = {}; // visConfigSettings

    this.visConfigSettings = {};
    this.config = this.getDefaultLayerConfig((0, _objectSpread6.default)({
      columns: this.getLayerColumns()
    }, props));
  }

  (0, _createClass2.default)(Layer, [{
    key: "getDefaultLayerConfig",
    value: function getDefaultLayerConfig() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return {
        dataId: props.dataId || null,
        label: props.label || 'new layer',
        color: props.color || colorMaker.next().value,
        columns: props.columns || null,
        isVisible: props.isVisible || false,
        isConfigActive: props.isConfigActive || false,
        highlightColor: props.highlightColor || [252, 242, 26, 255],
        // TODO: refactor this into separate visual Channel config
        // color by field, domain is set by filters, field, scale type
        colorField: null,
        colorDomain: [0, 1],
        colorScale: 'quantile',
        // color by size, domain is set by filters, field, scale type
        sizeDomain: [0, 1],
        sizeScale: 'linear',
        sizeField: null,
        visConfig: {},
        textLabel: {
          field: null,
          color: [255, 255, 255],
          size: 50,
          offset: [0, 0],
          anchor: 'middle'
        }
      };
    }
    /**
     * Get the description of a visualChannel config
     * @param key
     * @returns {{label: string, measure: (string|string)}}
     */

  }, {
    key: "getVisualChannelDescription",
    value: function getVisualChannelDescription(key) {
      // e.g. label: Color, measure: Vehicle Type
      return {
        label: this.visConfigSettings[this.visualChannels[key].range].label,
        measure: this.config[this.visualChannels[key].field] ? this.config[this.visualChannels[key].field].name : this.visualChannels[key].defaultMeasure
      };
    }
    /**
     * Assign a field to layer column, return column config
     * @param key - Column Key
     * @param field - Selected field
     * @returns {{}} - Column config
     */

  }, {
    key: "assignColumn",
    value: function assignColumn(key, field) {
      // field value could be null for optional columns
      var update = field ? {
        value: field.name,
        fieldIdx: field.tableFieldIndex - 1
      } : {
        value: null,
        fieldIdx: -1
      };
      return (0, _objectSpread6.default)({}, this.config.columns, (0, _defineProperty2.default)({}, key, (0, _objectSpread6.default)({}, this.config.columns[key], update)));
    }
    /**
     * Assign a field pair to column config, return column config
     * @param key - Column Key
     * @param pair - field Pair
     * @returns {{}} - Column config
     */

  }, {
    key: "assignColumnPairs",
    value: function assignColumnPairs(key, pair) {
      var _objectSpread3;

      if (!this.columnPairs || !this.columnPairs[key]) {
        // should not end in this state
        return this.config.columns;
      }

      var _this$columnPairs$key = this.columnPairs[key],
          partnerKey = _this$columnPairs$key.pair,
          fieldPairKey = _this$columnPairs$key.fieldPairKey;
      var partnerFieldPairKey = this.columnPairs[partnerKey].fieldPairKey;
      return (0, _objectSpread6.default)({}, this.config.columns, (_objectSpread3 = {}, (0, _defineProperty2.default)(_objectSpread3, key, pair[fieldPairKey]), (0, _defineProperty2.default)(_objectSpread3, partnerKey, pair[partnerFieldPairKey]), _objectSpread3));
    }
    /**
      * Calculate a radius zoom multiplier to render points, so they are visible in all zoom level
      * @param mapState
      * @param mapState.zoom - actual zoom
      * @param mapState.zoomOffset - zoomOffset when render in the plot container for export image
      * @returns {number}
      */

  }, {
    key: "getZoomFactor",
    value: function getZoomFactor(_ref) {
      var zoom = _ref.zoom,
          _ref$zoomOffset = _ref.zoomOffset,
          zoomOffset = _ref$zoomOffset === void 0 ? 0 : _ref$zoomOffset;
      return Math.pow(2, Math.max(14 - zoom + zoomOffset, 0));
    }
    /**
      * Calculate a elevation zoom multiplier to render points, so they are visible in all zoom level
      * @param mapState
      * @param mapState.zoom - actual zoom
      * @param mapState.zoomOffset - zoomOffset when render in the plot container for export image
      * @returns {number}
      */

  }, {
    key: "getElevationZoomFactor",
    value: function getElevationZoomFactor(_ref2) {
      var zoom = _ref2.zoom,
          _ref2$zoomOffset = _ref2.zoomOffset,
          zoomOffset = _ref2$zoomOffset === void 0 ? 0 : _ref2$zoomOffset;
      return Math.pow(2, Math.max(8 - zoom + zoomOffset, 0));
    }
  }, {
    key: "formatLayerData",
    value: function formatLayerData(data, allData, filteredIndex) {
      return {};
    }
  }, {
    key: "renderLayer",
    value: function renderLayer() {
      return [];
    }
  }, {
    key: "getHoverData",
    value: function getHoverData(object) {
      if (!object) {
        return null;
      } // by default, each entry of layerData should have a data property points
      // to the original item in the allData array
      // each layer can implement its own getHoverData method


      return object.data;
    }
    /**
     * When change layer type, try to copy over layer configs as much as possible
     * @param configToCopy - config to copy over
     * @param visConfigSettings - visConfig settings of config to copy
     */

  }, {
    key: "assignConfigToLayer",
    value: function assignConfigToLayer(configToCopy, visConfigSettings) {
      var _this = this;

      // don't deep merge visualChannel field
      var notToDeepMerge = Object.values(this.visualChannels).map(function (v) {
        return v.field;
      }); // don't deep merge color range, reversed: is not a key by default

      notToDeepMerge.push('colorRange'); // don't copy over domain

      var notToCopy = Object.values(this.visualChannels).map(function (v) {
        return v.domain;
      }); // if range is for the same property group copy it, otherwise, not to copy

      Object.values(this.visualChannels).forEach(function (v) {
        if (configToCopy.visConfig[v.range] && visConfigSettings[v.range].group !== _this.visConfigSettings[v.range].group) {
          notToCopy.push(v.range);
        }
      }); // don't copy over visualChannel range

      var currentConfig = this.config;
      var copied = this.copyLayerConfig(currentConfig, configToCopy, {
        notToDeepMerge: notToDeepMerge,
        notToCopy: notToCopy
      });
      this.updateLayerConfig(copied); // validate visualChannel field type and scale types

      Object.keys(this.visualChannels).forEach(function (channel) {
        _this.validateVisualChannel(channel);
      });
    }
    /*
     * Recursively copy config over to an empty layer
     * when received saved config, or copy config over from a different layer type
     * make sure to only copy over value to existing keys
     * @param {object} currentConfig - existing config to be override
     * @param {object} configToCopy - new Config to copy over
     * @param {string[]} notToDeepMerge - array of properties to not to be deep copied
     * @param {string[]} notToCopy - array of properties not to copy
     * @returns {object} - copied config
     */

  }, {
    key: "copyLayerConfig",
    value: function copyLayerConfig(currentConfig, configToCopy) {
      var _this2 = this;

      var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref3$notToDeepMerge = _ref3.notToDeepMerge,
          notToDeepMerge = _ref3$notToDeepMerge === void 0 ? [] : _ref3$notToDeepMerge,
          _ref3$notToCopy = _ref3.notToCopy,
          notToCopy = _ref3$notToCopy === void 0 ? [] : _ref3$notToCopy;

      var copied = {};
      Object.keys(currentConfig).forEach(function (key) {
        if ((0, _utils.isPlainObject)(currentConfig[key]) && (0, _utils.isPlainObject)(configToCopy[key]) && !notToDeepMerge.includes(key) && !notToCopy.includes(key)) {
          // recursively assign object value
          copied[key] = _this2.copyLayerConfig(currentConfig[key], configToCopy[key], {
            notToDeepMerge: notToDeepMerge,
            notToCopy: notToCopy
          });
        } else if ((0, _utils.notNullorUndefined)(configToCopy[key]) && !notToCopy.includes(key)) {
          // copy
          copied[key] = configToCopy[key];
        } else {
          // keep existing
          copied[key] = currentConfig[key];
        }
      });
      return copied;
    }
  }, {
    key: "registerVisConfig",
    value: function registerVisConfig(layerVisConfigs) {
      var _this3 = this;

      Object.keys(layerVisConfigs).forEach(function (item) {
        if (typeof item === 'string' && _layerFactory.LAYER_VIS_CONFIGS[layerVisConfigs[item]]) {
          // if assigned one of default LAYER_CONFIGS
          _this3.config.visConfig[item] = _layerFactory.LAYER_VIS_CONFIGS[layerVisConfigs[item]].defaultValue;
          _this3.visConfigSettings[item] = _layerFactory.LAYER_VIS_CONFIGS[layerVisConfigs[item]];
        } else if (['type', 'defaultValue'].every(function (p) {
          return layerVisConfigs[item][p];
        })) {
          // if provided customized visConfig, and has type && defaultValue
          // TODO: further check if customized visConfig is valid
          _this3.config.visConfig[item] = layerVisConfigs[item].defaultValue;
          _this3.visConfigSettings[item] = layerVisConfigs[item];
        }
      });
    }
  }, {
    key: "getLayerColumns",
    value: function getLayerColumns() {
      var required = this.requiredLayerColumns.reduce(function (accu, key) {
        return (0, _objectSpread6.default)({}, accu, (0, _defineProperty2.default)({}, key, {
          value: null,
          fieldIdx: -1
        }));
      }, {});
      var optional = this.optionalColumns.reduce(function (accu, key) {
        return (0, _objectSpread6.default)({}, accu, (0, _defineProperty2.default)({}, key, {
          value: null,
          fieldIdx: -1,
          optional: true
        }));
      }, {});
      return (0, _objectSpread6.default)({}, required, optional);
    }
  }, {
    key: "updateLayerConfig",
    value: function updateLayerConfig(newConfig) {
      this.config = (0, _objectSpread6.default)({}, this.config, newConfig);
      return this;
    }
  }, {
    key: "updateLayerVisConfig",
    value: function updateLayerVisConfig(newVisConfig) {
      this.config.visConfig = (0, _objectSpread6.default)({}, this.config.visConfig, newVisConfig);
      return this;
    }
    /**
     * Check whether layer has all columns
     *
     * @param {object} layer
     * @returns {boolean} yes or no
     */

  }, {
    key: "hasAllColumns",
    value: function hasAllColumns() {
      var columns = this.config.columns;
      return columns && Object.values(columns).every(function (v) {
        return Boolean(v.optional || v.value && v.fieldIdx > -1);
      });
    }
    /**
     * Check whether layer has data
     *
     * @param {object} layer
     * @param {Array | Object} layerData
     * @returns {boolean} yes or no
     */

  }, {
    key: "hasLayerData",
    value: function hasLayerData(layerData) {
      if (!layerData) {
        return false;
      }

      return Boolean(layerData.data && layerData.data.length);
    }
  }, {
    key: "isValidToSave",
    value: function isValidToSave() {
      return this.type && this.hasAllColumns();
    }
  }, {
    key: "shouldRenderLayer",
    value: function shouldRenderLayer(data) {
      return this.type && this.hasAllColumns() && this.config.isVisible && this.hasLayerData(data);
    }
  }, {
    key: "getVisChannelScale",
    value: function getVisChannelScale(scale, domain, range, fixed) {
      return _defaultSettings.SCALE_FUNC[fixed ? 'linear' : scale]().domain(domain).range(fixed ? domain : range);
    }
  }, {
    key: "getPointsBounds",
    value: function getPointsBounds(allData, getPosition) {
      // no need to loop through the entire dataset
      // get a sample of data to calculate bounds
      var sampleData = allData.length > MAX_SAMPLE_SIZE ? (0, _dataUtils.getSampleData)(allData, MAX_SAMPLE_SIZE) : allData;
      var points = sampleData.map(getPosition);
      var latBounds = (0, _dataUtils.getLatLngBounds)(points, 1, [-90, 90]);
      var lngBounds = (0, _dataUtils.getLatLngBounds)(points, 0, [-180, 180]);

      if (!latBounds || !lngBounds) {
        return null;
      }

      return [lngBounds[0], latBounds[0], lngBounds[1], latBounds[1]];
    }
  }, {
    key: "getLightSettingsFromBounds",
    value: function getLightSettingsFromBounds(bounds) {
      return Array.isArray(bounds) && bounds.length >= 4 ? (0, _objectSpread6.default)({}, _defaultSettings.DEFAULT_LIGHT_SETTINGS, {
        lightsPosition: [].concat((0, _toConsumableArray2.default)(bounds.slice(0, 2)), [_defaultSettings.DEFAULT_LIGHT_SETTINGS.lightsPosition[2]], (0, _toConsumableArray2.default)(bounds.slice(2, 4)), [_defaultSettings.DEFAULT_LIGHT_SETTINGS.lightsPosition[5]])
      }) : _defaultSettings.DEFAULT_LIGHT_SETTINGS;
    }
  }, {
    key: "getEncodedChannelValue",
    value: function getEncodedChannelValue(scale, data, field) {
      var defaultValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _defaultSettings.NO_VALUE_COLOR;
      var getValue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : defaultGetFieldValue;
      var type = field.type;
      var value = getValue(field, data);
      var attributeValue;

      if (type === _defaultSettings.ALL_FIELD_TYPES.timestamp) {
        // shouldn't need to convert here
        // scale Function should take care of it
        attributeValue = scale(new Date(value));
      } else {
        attributeValue = scale(value);
      }

      if (!attributeValue) {
        attributeValue = defaultValue;
      }

      return attributeValue;
    }
  }, {
    key: "updateMeta",
    value: function updateMeta(meta) {
      this.meta = (0, _objectSpread6.default)({}, this.meta, meta);
    }
    /**
     * helper function to update one layer domain when state.data changed
     * if state.data change is due ot update filter, newFiler will be passed
     * called by updateAllLayerDomainData
     * @param {Object} dataset
     * @param {Object} newFilter
     * @returns {object} layer
     */

  }, {
    key: "updateLayerDomain",
    value: function updateLayerDomain(dataset, newFilter) {
      var _this4 = this;

      Object.values(this.visualChannels).forEach(function (channel) {
        var scale = channel.scale;
        var scaleType = _this4.config[scale]; // ordinal domain is based on allData, if only filter changed
        // no need to update ordinal domain

        if (!newFilter || scaleType !== _defaultSettings.SCALE_TYPES.ordinal) {
          var domain = channel.domain;

          var updatedDomain = _this4.calculateLayerDomain(dataset, channel);

          _this4.updateLayerConfig((0, _defineProperty2.default)({}, domain, updatedDomain));
        }
      });
      return this;
    }
    /**
     * Validate visual channel field and scales based on supported field & scale type
     * @param channel
     */

  }, {
    key: "validateVisualChannel",
    value: function validateVisualChannel(channel) {
      this.validateFieldType(channel);
      this.validateScale(channel);
    }
    /**
     * Validate field type based on channelScaleType
     */

  }, {
    key: "validateFieldType",
    value: function validateFieldType(channel) {
      var visualChannel = this.visualChannels[channel];
      var field = visualChannel.field,
          channelScaleType = visualChannel.channelScaleType,
          supportedFieldTypes = visualChannel.supportedFieldTypes;

      if (this.config[field]) {
        // if field is selected, check if field type is supported
        var channelSupportedFieldTypes = supportedFieldTypes || _defaultSettings.CHANNEL_SCALE_SUPPORTED_FIELDS[channelScaleType];

        if (!channelSupportedFieldTypes.includes(this.config[field].type)) {
          // field type is not supported, set it back to null
          // set scale back to default
          this.updateLayerConfig((0, _defineProperty2.default)({}, field, null));
        }
      }
    }
    /**
     * Validate scale type based on aggregation
     */

  }, {
    key: "validateScale",
    value: function validateScale(channel) {
      var visualChannel = this.visualChannels[channel];
      var scale = visualChannel.scale;

      if (!scale) {
        // visualChannel doesn't have scale
        return;
      }

      var scaleOptions = this.getScaleOptions(channel); // check if current selected scale is
      // supported, if not, change to default

      if (!scaleOptions.includes(this.config[scale])) {
        this.updateLayerConfig((0, _defineProperty2.default)({}, scale, scaleOptions[0]));
      }
    }
    /**
     * Get scale options based on current field
     * @param {string} channel
     * @returns {string[]}
     */

  }, {
    key: "getScaleOptions",
    value: function getScaleOptions(channel) {
      var visualChannel = this.visualChannels[channel];
      var field = visualChannel.field,
          scale = visualChannel.scale,
          channelScaleType = visualChannel.channelScaleType;
      return this.config[field] ? _defaultSettings.FIELD_OPTS[this.config[field].type].scale[channelScaleType] : [this.getDefaultLayerConfig()[scale]];
    }
  }, {
    key: "updateLayerVisualChannel",
    value: function updateLayerVisualChannel(dataset, channel) {
      var visualChannel = this.visualChannels[channel];
      this.validateVisualChannel(channel); // calculate layer channel domain

      var updatedDomain = this.calculateLayerDomain(dataset, visualChannel);
      this.updateLayerConfig((0, _defineProperty2.default)({}, visualChannel.domain, updatedDomain));
    }
  }, {
    key: "calculateLayerDomain",
    value: function calculateLayerDomain(dataset, visualChannel) {
      var allData = dataset.allData,
          filteredIndexForDomain = dataset.filteredIndexForDomain;
      var defaultDomain = [0, 1];
      var scale = visualChannel.scale;
      var scaleType = this.config[scale];
      var field = this.config[visualChannel.field];

      if (!field) {
        // if colorField or sizeField were set back to null
        return defaultDomain;
      }

      if (!_defaultSettings.SCALE_TYPES[scaleType]) {
        _window.console.error("scale type ".concat(scaleType, " not supported"));

        return defaultDomain;
      } // TODO: refactor to add valueAccessor to field


      var fieldIdx = field.tableFieldIndex - 1;
      var isTime = field.type === _defaultSettings.ALL_FIELD_TYPES.timestamp;

      var valueAccessor = _dataUtils.maybeToDate.bind(null, isTime, fieldIdx, field.format);

      var indexValueAccessor = function indexValueAccessor(i) {
        return valueAccessor(allData[i]);
      };

      var sortFunction = (0, _dataUtils.getSortingFunction)(field.type);

      switch (scaleType) {
        case _defaultSettings.SCALE_TYPES.ordinal:
        case _defaultSettings.SCALE_TYPES.point:
          // do not recalculate ordinal domain based on filtered data
          // don't need to update ordinal domain every time
          return (0, _dataScaleUtils.getOrdinalDomain)(allData, valueAccessor);

        case _defaultSettings.SCALE_TYPES.quantile:
          return (0, _dataScaleUtils.getQuantileDomain)(filteredIndexForDomain, indexValueAccessor, sortFunction);

        case _defaultSettings.SCALE_TYPES.quantize:
        case _defaultSettings.SCALE_TYPES.linear:
        case _defaultSettings.SCALE_TYPES.sqrt:
        default:
          return (0, _dataScaleUtils.getLinearDomain)(filteredIndexForDomain, indexValueAccessor);
      }
    }
  }, {
    key: "isLayerHovered",
    value: function isLayerHovered(objectInfo) {
      return objectInfo && objectInfo.layer && objectInfo.picked && objectInfo.layer.props.id === this.id;
    }
  }, {
    key: "getRadiusScaleByZoom",
    value: function getRadiusScaleByZoom(mapState, fixedRadius) {
      var radiusChannel = Object.values(this.visualChannels).find(function (vc) {
        return vc.property === 'radius';
      });

      if (!radiusChannel) {
        return 1;
      }

      var field = radiusChannel.field;
      var fixed = fixedRadius === undefined ? this.config.visConfig.fixedRadius : fixedRadius;
      var radius = this.config.visConfig.radius;
      return fixed ? 1 : (this.config[field] ? 1 : radius) * this.getZoomFactor(mapState);
    }
  }, {
    key: "shouldCalculateLayerData",
    value: function shouldCalculateLayerData(props) {
      var _this5 = this;

      return props.some(function (p) {
        return !_this5.noneLayerDataAffectingProps.includes(p);
      });
    }
  }, {
    key: "layerIcon",
    get: function get() {
      return _defaultLayerIcon.default;
    }
  }, {
    key: "overlayType",
    get: function get() {
      return OVERLAY_TYPE.deckgl;
    }
  }, {
    key: "type",
    get: function get() {
      return null;
    }
  }, {
    key: "name",
    get: function get() {
      return this.type;
    }
  }, {
    key: "isAggregated",
    get: function get() {
      return false;
    }
  }, {
    key: "requiredLayerColumns",
    get: function get() {
      return [];
    }
  }, {
    key: "optionalColumns",
    get: function get() {
      return [];
    }
  }, {
    key: "noneLayerDataAffectingProps",
    get: function get() {
      return ['label', 'opacity', 'thickness', 'isVisible'];
    }
  }, {
    key: "visualChannels",
    get: function get() {
      return {
        color: {
          property: 'color',
          field: 'colorField',
          scale: 'colorScale',
          domain: 'colorDomain',
          range: 'colorRange',
          key: 'color',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.color
        },
        size: {
          property: 'size',
          field: 'sizeField',
          scale: 'sizeScale',
          domain: 'sizeDomain',
          range: 'sizeRange',
          key: 'size',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.size
        }
      };
    }
    /*
     * Column pairs maps layer column to a specific field pairs,
     * By default, it is set to null
     */

  }, {
    key: "columnPairs",
    get: function get() {
      return null;
    }
    /*
     * Default point column pairs, can be used for point based layers: point, icon etc.
     */

  }, {
    key: "defaultPointColumnPairs",
    get: function get() {
      return {
        lat: {
          pair: 'lng',
          fieldPairKey: 'lat'
        },
        lng: {
          pair: 'lat',
          fieldPairKey: 'lng'
        }
      };
    }
    /*
     * Default link column pairs, can be used for link based layers: arc, line etc
     */

  }, {
    key: "defaultLinkColumnPairs",
    get: function get() {
      return {
        lat0: {
          pair: 'lng0',
          fieldPairKey: 'lat'
        },
        lng0: {
          pair: 'lat0',
          fieldPairKey: 'lng'
        },
        lat1: {
          pair: 'lng1',
          fieldPairKey: 'lat'
        },
        lng1: {
          pair: 'lat1',
          fieldPairKey: 'lng'
        }
      };
    }
    /**
     * Return a React component for to render layer instructions in a modal
     * @returns {object} - an object
     * @example
     *  return {
     *    id: 'iconInfo',
     *    template: IconInfoModal,
     *    modalProps: {
     *      title: 'How to draw icons'
     *   };
     * }
     */

  }, {
    key: "layerInfoModal",
    get: function get() {
      return null;
    }
    /*
     * Given a dataset, automatically create layers based on it
     * and return the props
     * By default, no layers will be found
     */

  }], [{
    key: "findDefaultLayerProps",
    value: function findDefaultLayerProps(fieldPairs, dataId) {
      return null;
    }
    /**
     * Given a array of preset required column names
     * found field that has the same name to set as layer column
     *
     * @param {object[]} defaultFields
     * @param {object[]} allFields
     * @returns {object[] | null} all possible required layer column pairs
     */

  }, {
    key: "findDefaultColumnField",
    value: function findDefaultColumnField(defaultFields, allFields) {
      // find all matched fields for each required col
      var requiredColumns = Object.keys(defaultFields).reduce(function (prev, key) {
        var requiredFields = allFields.filter(function (f) {
          return f.name === defaultFields[key] || defaultFields[key].includes(f.name);
        });
        prev[key] = requiredFields.length ? requiredFields.map(function (f) {
          return {
            value: f.name,
            fieldIdx: f.tableFieldIndex - 1
          };
        }) : null;
        return prev;
      }, {});

      if (!Object.values(requiredColumns).every(Boolean)) {
        // if any field missing, return null
        return null;
      }

      return this.getAllPossibleColumnParis(requiredColumns);
    }
  }, {
    key: "getAllPossibleColumnParis",
    value: function getAllPossibleColumnParis(requiredColumns) {
      // for multiple matched field for one required column, return multiple
      // combinations, e. g. if column a has 2 matched, column b has 3 matched
      // 6 possible column pairs will be returned
      var allKeys = Object.keys(requiredColumns);
      var pointers = allKeys.map(function (k, i) {
        return i === allKeys.length - 1 ? -1 : 0;
      });
      var countPerKey = allKeys.map(function (k) {
        return requiredColumns[k].length;
      });
      var pairs = [];
      /* eslint-disable no-loop-func */

      while (incrementPointers(pointers, countPerKey, pointers.length - 1)) {
        var newPair = pointers.reduce(function (prev, cuur, i) {
          prev[allKeys[i]] = requiredColumns[allKeys[i]][cuur];
          return prev;
        }, {});
        pairs.push(newPair);
      }
      /* eslint-enable no-loop-func */
      // recursively increment pointers


      function incrementPointers(pts, counts, index) {
        if (index === 0 && pts[0] === counts[0] - 1) {
          // nothing to increment
          return false;
        }

        if (pts[index] + 1 < counts[index]) {
          pts[index] = pts[index] + 1;
          return true;
        }

        pts[index] = 0;
        return incrementPointers(pts, counts, index - 1);
      }

      return pairs;
    }
  }, {
    key: "hexToRgb",
    value: function hexToRgb(c) {
      return (0, _colorUtils.hexToRgb)(c);
    }
  }]);
  return Layer;
}();

exports.default = Layer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sYXllcnMvYmFzZS1sYXllci5qcyJdLCJuYW1lcyI6WyJnZW5lcmF0ZUNvbG9yIiwiTUFYX1NBTVBMRV9TSVpFIiwiT1ZFUkxBWV9UWVBFIiwiZGVja2dsIiwibWFwYm94Z2wiLCJsYXllckNvbG9ycyIsIk9iamVjdCIsInZhbHVlcyIsIkRhdGFWaXpDb2xvcnMiLCJtYXAiLCJoZXhUb1JnYiIsImluZGV4IiwibGVuZ3RoIiwiY29sb3JNYWtlciIsImRlZmF1bHRHZXRGaWVsZFZhbHVlIiwiZmllbGQiLCJkIiwidGFibGVGaWVsZEluZGV4IiwiTGF5ZXIiLCJwcm9wcyIsImlkIiwibWV0YSIsInZpc0NvbmZpZ1NldHRpbmdzIiwiY29uZmlnIiwiZ2V0RGVmYXVsdExheWVyQ29uZmlnIiwiY29sdW1ucyIsImdldExheWVyQ29sdW1ucyIsImRhdGFJZCIsImxhYmVsIiwiY29sb3IiLCJuZXh0IiwidmFsdWUiLCJpc1Zpc2libGUiLCJpc0NvbmZpZ0FjdGl2ZSIsImhpZ2hsaWdodENvbG9yIiwiY29sb3JGaWVsZCIsImNvbG9yRG9tYWluIiwiY29sb3JTY2FsZSIsInNpemVEb21haW4iLCJzaXplU2NhbGUiLCJzaXplRmllbGQiLCJ2aXNDb25maWciLCJ0ZXh0TGFiZWwiLCJzaXplIiwib2Zmc2V0IiwiYW5jaG9yIiwia2V5IiwidmlzdWFsQ2hhbm5lbHMiLCJyYW5nZSIsIm1lYXN1cmUiLCJuYW1lIiwiZGVmYXVsdE1lYXN1cmUiLCJ1cGRhdGUiLCJmaWVsZElkeCIsInBhaXIiLCJjb2x1bW5QYWlycyIsInBhcnRuZXJLZXkiLCJmaWVsZFBhaXJLZXkiLCJwYXJ0bmVyRmllbGRQYWlyS2V5Iiwiem9vbSIsInpvb21PZmZzZXQiLCJNYXRoIiwicG93IiwibWF4IiwiZGF0YSIsImFsbERhdGEiLCJmaWx0ZXJlZEluZGV4Iiwib2JqZWN0IiwiY29uZmlnVG9Db3B5Iiwibm90VG9EZWVwTWVyZ2UiLCJ2IiwicHVzaCIsIm5vdFRvQ29weSIsImRvbWFpbiIsImZvckVhY2giLCJncm91cCIsImN1cnJlbnRDb25maWciLCJjb3BpZWQiLCJjb3B5TGF5ZXJDb25maWciLCJ1cGRhdGVMYXllckNvbmZpZyIsImtleXMiLCJjaGFubmVsIiwidmFsaWRhdGVWaXN1YWxDaGFubmVsIiwiaW5jbHVkZXMiLCJsYXllclZpc0NvbmZpZ3MiLCJpdGVtIiwiTEFZRVJfVklTX0NPTkZJR1MiLCJkZWZhdWx0VmFsdWUiLCJldmVyeSIsInAiLCJyZXF1aXJlZCIsInJlcXVpcmVkTGF5ZXJDb2x1bW5zIiwicmVkdWNlIiwiYWNjdSIsIm9wdGlvbmFsIiwib3B0aW9uYWxDb2x1bW5zIiwibmV3Q29uZmlnIiwibmV3VmlzQ29uZmlnIiwiQm9vbGVhbiIsImxheWVyRGF0YSIsInR5cGUiLCJoYXNBbGxDb2x1bW5zIiwiaGFzTGF5ZXJEYXRhIiwic2NhbGUiLCJmaXhlZCIsIlNDQUxFX0ZVTkMiLCJnZXRQb3NpdGlvbiIsInNhbXBsZURhdGEiLCJwb2ludHMiLCJsYXRCb3VuZHMiLCJsbmdCb3VuZHMiLCJib3VuZHMiLCJBcnJheSIsImlzQXJyYXkiLCJERUZBVUxUX0xJR0hUX1NFVFRJTkdTIiwibGlnaHRzUG9zaXRpb24iLCJzbGljZSIsIk5PX1ZBTFVFX0NPTE9SIiwiZ2V0VmFsdWUiLCJhdHRyaWJ1dGVWYWx1ZSIsIkFMTF9GSUVMRF9UWVBFUyIsInRpbWVzdGFtcCIsIkRhdGUiLCJkYXRhc2V0IiwibmV3RmlsdGVyIiwic2NhbGVUeXBlIiwiU0NBTEVfVFlQRVMiLCJvcmRpbmFsIiwidXBkYXRlZERvbWFpbiIsImNhbGN1bGF0ZUxheWVyRG9tYWluIiwidmFsaWRhdGVGaWVsZFR5cGUiLCJ2YWxpZGF0ZVNjYWxlIiwidmlzdWFsQ2hhbm5lbCIsImNoYW5uZWxTY2FsZVR5cGUiLCJzdXBwb3J0ZWRGaWVsZFR5cGVzIiwiY2hhbm5lbFN1cHBvcnRlZEZpZWxkVHlwZXMiLCJDSEFOTkVMX1NDQUxFX1NVUFBPUlRFRF9GSUVMRFMiLCJzY2FsZU9wdGlvbnMiLCJnZXRTY2FsZU9wdGlvbnMiLCJGSUVMRF9PUFRTIiwiZmlsdGVyZWRJbmRleEZvckRvbWFpbiIsImRlZmF1bHREb21haW4iLCJDb25zb2xlIiwiZXJyb3IiLCJpc1RpbWUiLCJ2YWx1ZUFjY2Vzc29yIiwibWF5YmVUb0RhdGUiLCJiaW5kIiwiZm9ybWF0IiwiaW5kZXhWYWx1ZUFjY2Vzc29yIiwiaSIsInNvcnRGdW5jdGlvbiIsInBvaW50IiwicXVhbnRpbGUiLCJxdWFudGl6ZSIsImxpbmVhciIsInNxcnQiLCJvYmplY3RJbmZvIiwibGF5ZXIiLCJwaWNrZWQiLCJtYXBTdGF0ZSIsImZpeGVkUmFkaXVzIiwicmFkaXVzQ2hhbm5lbCIsImZpbmQiLCJ2YyIsInByb3BlcnR5IiwidW5kZWZpbmVkIiwicmFkaXVzIiwiZ2V0Wm9vbUZhY3RvciIsInNvbWUiLCJub25lTGF5ZXJEYXRhQWZmZWN0aW5nUHJvcHMiLCJEZWZhdWx0TGF5ZXJJY29uIiwiQ0hBTk5FTF9TQ0FMRVMiLCJsYXQiLCJsbmciLCJsYXQwIiwibG5nMCIsImxhdDEiLCJsbmcxIiwiZmllbGRQYWlycyIsImRlZmF1bHRGaWVsZHMiLCJhbGxGaWVsZHMiLCJyZXF1aXJlZENvbHVtbnMiLCJwcmV2IiwicmVxdWlyZWRGaWVsZHMiLCJmaWx0ZXIiLCJmIiwiZ2V0QWxsUG9zc2libGVDb2x1bW5QYXJpcyIsImFsbEtleXMiLCJwb2ludGVycyIsImsiLCJjb3VudFBlcktleSIsInBhaXJzIiwiaW5jcmVtZW50UG9pbnRlcnMiLCJuZXdQYWlyIiwiY3V1ciIsInB0cyIsImNvdW50cyIsImMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFVQTs7QUFDQTs7QUFFQTs7QUFFQTs7QUFPQTs7OzswQkFrQlVBLGE7O0FBWlY7Ozs7QUFJQSxJQUFNQyxlQUFlLEdBQUcsSUFBeEI7QUFFTyxJQUFNQyxZQUFZLEdBQUcsd0JBQVU7QUFDcENDLEVBQUFBLE1BQU0sRUFBRSxJQUQ0QjtBQUVwQ0Ms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LEdBQUQsRUFBTUMsTUFBTixFQUFjMUwsS0FBSyxHQUFHLENBQXRCLENBQXhCO0FBQ0Q7O0FBRUQsYUFBT3FMLEtBQVA7QUFDRDs7OzZCQUVlTSxDLEVBQUc7QUFDakIsYUFBTywwQkFBU0EsQ0FBVCxDQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQge2hleFRvUmdifSBmcm9tICd1dGlscy9jb2xvci11dGlscyc7XG5pbXBvcnQge2NvbnNvbGUgYXMgQ29uc29sZX0gZnJvbSAnZ2xvYmFsL3dpbmRvdyc7XG5pbXBvcnQga2V5bWlycm9yIGZyb20gJ2tleW1pcnJvcic7XG5pbXBvcnQgRGVmYXVsdExheWVySWNvbiBmcm9tICcuL2RlZmF1bHQtbGF5ZXItaWNvbic7XG5cbmltcG9ydCB7XG4gIEFMTF9GSUVMRF9UWVBFUyxcbiAgREVGQVVMVF9MSUdIVF9TRVRUSU5HUyxcbiAgTk9fVkFMVUVfQ09MT1IsXG4gIFNDQUxFX1RZUEVTLFxuICBDSEFOTkVMX1NDQUxFUyxcbiAgRklFTERfT1BUUyxcbiAgU0NBTEVfRlVOQyxcbiAgQ0hBTk5FTF9TQ0FMRV9TVVBQT1JURURfRklFTERTXG59IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcbmltcG9ydCB7RGF0YVZpekNvbG9yc30gZnJvbSAnY29uc3RhbnRzL2N1c3RvbS1jb2xvci1yYW5nZXMnO1xuaW1wb3J0IHtMQVlFUl9WSVNfQ09ORklHU30gZnJvbSAnLi9sYXllci1mYWN0b3J5JztcblxuaW1wb3J0IHtnZW5lcmF0ZUhhc2hJZCwgbm90TnVsbG9yVW5kZWZpbmVkLCBpc1BsYWluT2JqZWN0fSBmcm9tICd1dGlscy91dGlscyc7XG5cbmltcG9ydCB7XG4gIGdldFNhbXBsZURhdGEsXG4gIGdldExhdExuZ0JvdW5kcyxcbiAgbWF5YmVUb0RhdGUsXG4gIGdldFNvcnRpbmdGdW5jdGlvblxufSBmcm9tICd1dGlscy9kYXRhLXV0aWxzJztcblxuaW1wb3J0IHtcbiAgZ2V0UXVhbnRpbGVEb21haW4sXG4gIGdldE9yZGluYWxEb21haW4sXG4gIGdldExpbmVhckRvbWFpblxufSBmcm9tICd1dGlscy9kYXRhLXNjYWxlLXV0aWxzJztcblxuLyoqXG4gKiBBcHByb3guIG51bWJlciBvZiBwb2ludHMgdG8gc2FtcGxlIGluIGEgbGFyZ2UgZGF0YSBzZXRcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKi9cbmNvbnN0IE1BWF9TQU1QTEVfU0laRSA9IDUwMDA7XG5cbmV4cG9ydCBjb25zdCBPVkVSTEFZX1RZUEUgPSBrZXltaXJyb3Ioe1xuICBkZWNrZ2w6IG51bGwsXG4gIG1hcGJveGdsOiBudWxsXG59KTtcblxuY29uc3QgbGF5ZXJDb2xvcnMgPSBPYmplY3QudmFsdWVzKERhdGFWaXpDb2xvcnMpLm1hcChoZXhUb1JnYik7XG5mdW5jdGlvbiogZ2VuZXJhdGVDb2xvcigpIHtcbiAgbGV0IGluZGV4ID0gMDtcbiAgd2hpbGUgKGluZGV4IDwgbGF5ZXJDb2xvcnMubGVuZ3RoICsgMSkge1xuICAgIGlmIChpbmRleCA9PT0gbGF5ZXJDb2xvcnMubGVuZ3RoKSB7XG4gICAgICBpbmRleCA9IDA7XG4gICAgfVxuICAgIHlpZWxkIGxheWVyQ29sb3JzW2luZGV4KytdO1xuICB9XG59XG5cbmNvbnN0IGNvbG9yTWFrZXIgPSBnZW5lcmF0ZUNvbG9yKCk7XG5jb25zdCBkZWZhdWx0R2V0RmllbGRWYWx1ZSA9IChmaWVsZCwgZCkgPT4gZFtmaWVsZC50YWJsZUZpZWxkSW5kZXggLSAxXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGF5ZXIge1xuICBjb25zdHJ1Y3Rvcihwcm9wcyA9IHt9KSB7XG4gICAgdGhpcy5pZCA9IHByb3BzLmlkIHx8IGdlbmVyYXRlSGFzaElkKDYpO1xuXG4gICAgLy8gbWV0YVxuICAgIHRoaXMubWV0YSA9IHt9O1xuXG4gICAgLy8gdmlzQ29uZmlnU2V0dGluZ3NcbiAgICB0aGlzLnZpc0NvbmZpZ1NldHRpbmdzID0ge307XG5cbiAgICB0aGlzLmNvbmZpZyA9IHRoaXMuZ2V0RGVmYXVsdExheWVyQ29uZmlnKHtcbiAgICAgIGNvbHVtbnM6IHRoaXMuZ2V0TGF5ZXJDb2x1bW5zKCksXG4gICAgICAuLi5wcm9wc1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0IGxheWVySWNvbigpIHtcbiAgICByZXR1cm4gRGVmYXVsdExheWVySWNvbjtcbiAgfVxuXG4gIGdldCBvdmVybGF5VHlwZSgpIHtcbiAgICByZXR1cm4gT1ZFUkxBWV9UWVBFLmRlY2tnbDtcbiAgfVxuXG4gIGdldCB0eXBlKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgfVxuXG4gIGdldCBpc0FnZ3JlZ2F0ZWQoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0IHJlcXVpcmVkTGF5ZXJDb2x1bW5zKCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGdldCBvcHRpb25hbENvbHVtbnMoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgZ2V0IG5vbmVMYXllckRhdGFBZmZlY3RpbmdQcm9wcygpIHtcbiAgICByZXR1cm4gWydsYWJlbCcsICdvcGFjaXR5JywgJ3RoaWNrbmVzcycsICdpc1Zpc2libGUnXTtcbiAgfVxuXG4gIGdldCB2aXN1YWxDaGFubmVscygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6IHtcbiAgICAgICAgcHJvcGVydHk6ICdjb2xvcicsXG4gICAgICAgIGZpZWxkOiAnY29sb3JGaWVsZCcsXG4gICAgICAgIHNjYWxlOiAnY29sb3JTY2FsZScsXG4gICAgICAgIGRvbWFpbjogJ2NvbG9yRG9tYWluJyxcbiAgICAgICAgcmFuZ2U6ICdjb2xvclJhbmdlJyxcbiAgICAgICAga2V5OiAnY29sb3InLFxuICAgICAgICBjaGFubmVsU2NhbGVUeXBlOiBDSEFOTkVMX1NDQUxFUy5jb2xvclxuICAgICAgfSxcbiAgICAgIHNpemU6IHtcbiAgICAgICAgcHJvcGVydHk6ICdzaXplJyxcbiAgICAgICAgZmllbGQ6ICdzaXplRmllbGQnLFxuICAgICAgICBzY2FsZTogJ3NpemVTY2FsZScsXG4gICAgICAgIGRvbWFpbjogJ3NpemVEb21haW4nLFxuICAgICAgICByYW5nZTogJ3NpemVSYW5nZScsXG4gICAgICAgIGtleTogJ3NpemUnLFxuICAgICAgICBjaGFubmVsU2NhbGVUeXBlOiBDSEFOTkVMX1NDQUxFUy5zaXplXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qXG4gICAqIENvbHVtbiBwYWlycyBtYXBzIGxheWVyIGNvbHVtbiB0byBhIHNwZWNpZmljIGZpZWxkIHBhaXJzLFxuICAgKiBCeSBkZWZhdWx0LCBpdCBpcyBzZXQgdG8gbnVsbFxuICAgKi9cbiAgZ2V0IGNvbHVtblBhaXJzKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLypcbiAgICogRGVmYXVsdCBwb2ludCBjb2x1bW4gcGFpcnMsIGNhbiBiZSB1c2VkIGZvciBwb2ludCBiYXNlZCBsYXllcnM6IHBvaW50LCBpY29uIGV0Yy5cbiAgICovXG4gIGdldCBkZWZhdWx0UG9pbnRDb2x1bW5QYWlycygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGF0OiB7cGFpcjogJ2xuZycsIGZpZWxkUGFpcktleTogJ2xhdCd9LFxuICAgICAgbG5nOiB7cGFpcjogJ2xhdCcsIGZpZWxkUGFpcktleTogJ2xuZyd9XG4gICAgfTtcbiAgfVxuXG4gIC8qXG4gICAqIERlZmF1bHQgbGluayBjb2x1bW4gcGFpcnMsIGNhbiBiZSB1c2VkIGZvciBsaW5rIGJhc2VkIGxheWVyczogYXJjLCBsaW5lIGV0Y1xuICAgKi9cbiAgZ2V0IGRlZmF1bHRMaW5rQ29sdW1uUGFpcnMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxhdDA6IHtwYWlyOiAnbG5nMCcsIGZpZWxkUGFpcktleTogJ2xhdCd9LFxuICAgICAgbG5nMDoge3BhaXI6ICdsYXQwJywgZmllbGRQYWlyS2V5OiAnbG5nJ30sXG4gICAgICBsYXQxOiB7cGFpcjogJ2xuZzEnLCBmaWVsZFBhaXJLZXk6ICdsYXQnfSxcbiAgICAgIGxuZzE6IHtwYWlyOiAnbGF0MScsIGZpZWxkUGFpcktleTogJ2xuZyd9XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBSZWFjdCBjb21wb25lbnQgZm9yIHRvIHJlbmRlciBsYXllciBpbnN0cnVjdGlvbnMgaW4gYSBtb2RhbFxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSAtIGFuIG9iamVjdFxuICAgKiBAZXhhbXBsZVxuICAgKiAgcmV0dXJuIHtcbiAgICogICAgaWQ6ICdpY29uSW5mbycsXG4gICAqICAgIHRlbXBsYXRlOiBJY29uSW5mb01vZGFsLFxuICAgKiAgICBtb2RhbFByb3BzOiB7XG4gICAqICAgICAgdGl0bGU6ICdIb3cgdG8gZHJhdyBpY29ucydcbiAgICogICB9O1xuICAgKiB9XG4gICAqL1xuICBnZXQgbGF5ZXJJbmZvTW9kYWwoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgLypcbiAgICogR2l2ZW4gYSBkYXRhc2V0LCBhdXRvbWF0aWNhbGx5IGNyZWF0ZSBsYXllcnMgYmFzZWQgb24gaXRcbiAgICogYW5kIHJldHVybiB0aGUgcHJvcHNcbiAgICogQnkgZGVmYXVsdCwgbm8gbGF5ZXJzIHdpbGwgYmUgZm91bmRcbiAgICovXG4gIHN0YXRpYyBmaW5kRGVmYXVsdExheWVyUHJvcHMoZmllbGRQYWlycywgZGF0YUlkKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogR2l2ZW4gYSBhcnJheSBvZiBwcmVzZXQgcmVxdWlyZWQgY29sdW1uIG5hbWVzXG4gICAqIGZvdW5kIGZpZWxkIHRoYXQgaGFzIHRoZSBzYW1lIG5hbWUgdG8gc2V0IGFzIGxheWVyIGNvbHVtblxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdFtdfSBkZWZhdWx0RmllbGRzXG4gICAqIEBwYXJhbSB7b2JqZWN0W119IGFsbEZpZWxkc1xuICAgKiBAcmV0dXJucyB7b2JqZWN0W10gfCBudWxsfSBhbGwgcG9zc2libGUgcmVxdWlyZWQgbGF5ZXIgY29sdW1uIHBhaXJzXG4gICAqL1xuICBzdGF0aWMgZmluZERlZmF1bHRDb2x1bW5GaWVsZChkZWZhdWx0RmllbGRzLCBhbGxGaWVsZHMpIHtcbiAgICAvLyBmaW5kIGFsbCBtYXRjaGVkIGZpZWxkcyBmb3IgZWFjaCByZXF1aXJlZCBjb2xcbiAgICBjb25zdCByZXF1aXJlZENvbHVtbnMgPSBPYmplY3Qua2V5cyhkZWZhdWx0RmllbGRzKS5yZWR1Y2UoKHByZXYsIGtleSkgPT4ge1xuICAgICAgY29uc3QgcmVxdWlyZWRGaWVsZHMgPSBhbGxGaWVsZHMuZmlsdGVyKFxuICAgICAgICBmID0+IGYubmFtZSA9PT0gZGVmYXVsdEZpZWxkc1trZXldIHx8IGRlZmF1bHRGaWVsZHNba2V5XS5pbmNsdWRlcyhmLm5hbWUpXG4gICAgICApO1xuXG4gICAgICBwcmV2W2tleV0gPSByZXF1aXJlZEZpZWxkcy5sZW5ndGhcbiAgICAgICAgPyByZXF1aXJlZEZpZWxkcy5tYXAoZiA9PiAoe1xuICAgICAgICAgIHZhbHVlOiBmLm5hbWUsXG4gICAgICAgICAgZmllbGRJZHg6IGYudGFibGVGaWVsZEluZGV4IC0gMVxuICAgICAgICB9KSlcbiAgICAgICAgOiBudWxsO1xuICAgICAgcmV0dXJuIHByZXY7XG4gICAgfSwge30pO1xuXG4gICAgaWYgKCFPYmplY3QudmFsdWVzKHJlcXVpcmVkQ29sdW1ucykuZXZlcnkoQm9vbGVhbikpIHtcbiAgICAgIC8vIGlmIGFueSBmaWVsZCBtaXNzaW5nLCByZXR1cm4gbnVsbFxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZ2V0QWxsUG9zc2libGVDb2x1bW5QYXJpcyhyZXF1aXJlZENvbHVtbnMpO1xuICB9XG5cbiAgc3RhdGljIGdldEFsbFBvc3NpYmxlQ29sdW1uUGFyaXMocmVxdWlyZWRDb2x1bW5zKSB7XG4gICAgLy8gZm9yIG11bHRpcGxlIG1hdGNoZWQgZmllbGQgZm9yIG9uZSByZXF1aXJlZCBjb2x1bW4sIHJldHVybiBtdWx0aXBsZVxuICAgIC8vIGNvbWJpbmF0aW9ucywgZS4gZy4gaWYgY29sdW1uIGEgaGFzIDIgbWF0Y2hlZCwgY29sdW1uIGIgaGFzIDMgbWF0Y2hlZFxuICAgIC8vIDYgcG9zc2libGUgY29sdW1uIHBhaXJzIHdpbGwgYmUgcmV0dXJuZWRcbiAgICBjb25zdCBhbGxLZXlzID0gT2JqZWN0LmtleXMocmVxdWlyZWRDb2x1bW5zKTtcbiAgICBjb25zdCBwb2ludGVycyA9IGFsbEtleXMubWFwKChrLCBpKSA9PiAoaSA9PT0gYWxsS2V5cy5sZW5ndGggLSAxID8gLTEgOiAwKSk7XG4gICAgY29uc3QgY291bnRQZXJLZXkgPSBhbGxLZXlzLm1hcChrID0+IHJlcXVpcmVkQ29sdW1uc1trXS5sZW5ndGgpO1xuICAgIGNvbnN0IHBhaXJzID0gW107XG5cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1sb29wLWZ1bmMgKi9cbiAgICB3aGlsZSAoaW5jcmVtZW50UG9pbnRlcnMocG9pbnRlcnMsIGNvdW50UGVyS2V5LCBwb2ludGVycy5sZW5ndGggLSAxKSkge1xuICAgICAgY29uc3QgbmV3UGFpciA9IHBvaW50ZXJzLnJlZHVjZSgocHJldiwgY3V1ciwgaSkgPT4ge1xuICAgICAgICBwcmV2W2FsbEtleXNbaV1dID0gcmVxdWlyZWRDb2x1bW5zW2FsbEtleXNbaV1dW2N1dXJdO1xuICAgICAgICByZXR1cm4gcHJldjtcbiAgICAgIH0sIHt9KTtcblxuICAgICAgcGFpcnMucHVzaChuZXdQYWlyKTtcbiAgICB9XG4gICAgLyogZXNsaW50LWVuYWJsZSBuby1sb29wLWZ1bmMgKi9cblxuICAgIC8vIHJlY3Vyc2l2ZWx5IGluY3JlbWVudCBwb2ludGVyc1xuICAgIGZ1bmN0aW9uIGluY3JlbWVudFBvaW50ZXJzKHB0cywgY291bnRzLCBpbmRleCkge1xuICAgICAgaWYgKGluZGV4ID09PSAwICYmIHB0c1swXSA9PT0gY291bnRzWzBdIC0gMSkge1xuICAgICAgICAvLyBub3RoaW5nIHRvIGluY3JlbWVudFxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChwdHNbaW5kZXhdICsgMSA8IGNvdW50c1tpbmRleF0pIHtcbiAgICAgICAgcHRzW2luZGV4XSA9IHB0c1tpbmRleF0gKyAxO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcHRzW2luZGV4XSA9IDA7XG4gICAgICByZXR1cm4gaW5jcmVtZW50UG9pbnRlcnMocHRzLCBjb3VudHMsIGluZGV4IC0gMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhaXJzO1xuICB9XG5cbiAgc3RhdGljIGhleFRvUmdiKGMpIHtcbiAgICByZXR1cm4gaGV4VG9SZ2IoYyk7XG4gIH1cblxuICBnZXREZWZhdWx0TGF5ZXJDb25maWcocHJvcHMgPSB7fSkge1xuICAgIHJldHVybiB7XG4gICAgICBkYXRhSWQ6IHByb3BzLmRhdGFJZCB8fCBudWxsLFxuICAgICAgbGFiZWw6IHByb3BzLmxhYmVsIHx8ICduZXcgbGF5ZXInLFxuICAgICAgY29sb3I6IHByb3BzLmNvbG9yIHx8IGNvbG9yTWFrZXIubmV4dCgpLnZhbHVlLFxuICAgICAgY29sdW1uczogcHJvcHMuY29sdW1ucyB8fCBudWxsLFxuICAgICAgaXNWaXNpYmxlOiBwcm9wcy5pc1Zpc2libGUgfHwgZmFsc2UsXG4gICAgICBpc0NvbmZpZ0FjdGl2ZTogcHJvcHMuaXNDb25maWdBY3RpdmUgfHwgZmFsc2UsXG4gICAgICBoaWdobGlnaHRDb2xvcjogcHJvcHMuaGlnaGxpZ2h0Q29sb3IgfHwgWzI1MiwgMjQyLCAyNiwgMjU1XSxcblxuICAgICAgLy8gVE9ETzogcmVmYWN0b3IgdGhpcyBpbnRvIHNlcGFyYXRlIHZpc3VhbCBDaGFubmVsIGNvbmZpZ1xuICAgICAgLy8gY29sb3IgYnkgZmllbGQsIGRvbWFpbiBpcyBzZXQgYnkgZmlsdGVycywgZmllbGQsIHNjYWxlIHR5cGVcbiAgICAgIGNvbG9yRmllbGQ6IG51bGwsXG4gICAgICBjb2xvckRvbWFpbjogWzAsIDFdLFxuICAgICAgY29sb3JTY2FsZTogJ3F1YW50aWxlJyxcblxuICAgICAgLy8gY29sb3IgYnkgc2l6ZSwgZG9tYWluIGlzIHNldCBieSBmaWx0ZXJzLCBmaWVsZCwgc2NhbGUgdHlwZVxuICAgICAgc2l6ZURvbWFpbjogWzAsIDFdLFxuICAgICAgc2l6ZVNjYWxlOiAnbGluZWFyJyxcbiAgICAgIHNpemVGaWVsZDogbnVsbCxcblxuICAgICAgdmlzQ29uZmlnOiB7fSxcblxuICAgICAgdGV4dExhYmVsOiB7XG4gICAgICAgIGZpZWxkOiBudWxsLFxuICAgICAgICBjb2xvcjogWzI1NSwgMjU1LCAyNTVdLFxuICAgICAgICBzaXplOiA1MCxcbiAgICAgICAgb2Zmc2V0OiBbMCwgMF0sXG4gICAgICAgIGFuY2hvcjogJ21pZGRsZSdcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZGVzY3JpcHRpb24gb2YgYSB2aXN1YWxDaGFubmVsIGNvbmZpZ1xuICAgKiBAcGFyYW0ga2V5XG4gICAqIEByZXR1cm5zIHt7bGFiZWw6IHN0cmluZywgbWVhc3VyZTogKHN0cmluZ3xzdHJpbmcpfX1cbiAgICovXG4gIGdldFZpc3VhbENoYW5uZWxEZXNjcmlwdGlvbihrZXkpIHtcbiAgICAvLyBlLmcuIGxhYmVsOiBDb2xvciwgbWVhc3VyZTogVmVoaWNsZSBUeXBlXG4gICAgcmV0dXJuIHtcbiAgICAgIGxhYmVsOiB0aGlzLnZpc0NvbmZpZ1NldHRpbmdzW3RoaXMudmlzdWFsQ2hhbm5lbHNba2V5XS5yYW5nZV0ubGFiZWwsXG4gICAgICBtZWFzdXJlOiB0aGlzLmNvbmZpZ1t0aGlzLnZpc3VhbENoYW5uZWxzW2tleV0uZmllbGRdXG4gICAgICAgID8gdGhpcy5jb25maWdbdGhpcy52aXN1YWxDaGFubmVsc1trZXldLmZpZWxkXS5uYW1lXG4gICAgICAgIDogdGhpcy52aXN1YWxDaGFubmVsc1trZXldLmRlZmF1bHRNZWFzdXJlXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFzc2lnbiBhIGZpZWxkIHRvIGxheWVyIGNvbHVtbiwgcmV0dXJuIGNvbHVtbiBjb25maWdcbiAgICogQHBhcmFtIGtleSAtIENvbHVtbiBLZXlcbiAgICogQHBhcmFtIGZpZWxkIC0gU2VsZWN0ZWQgZmllbGRcbiAgICogQHJldHVybnMge3t9fSAtIENvbHVtbiBjb25maWdcbiAgICovXG4gIGFzc2lnbkNvbHVtbihrZXksIGZpZWxkKSB7XG4gICAgLy8gZmllbGQgdmFsdWUgY291bGQgYmUgbnVsbCBmb3Igb3B0aW9uYWwgY29sdW1uc1xuICAgIGNvbnN0IHVwZGF0ZSA9IGZpZWxkXG4gICAgICA/IHtcbiAgICAgICAgICB2YWx1ZTogZmllbGQubmFtZSxcbiAgICAgICAgICBmaWVsZElkeDogZmllbGQudGFibGVGaWVsZEluZGV4IC0gMVxuICAgICAgICB9XG4gICAgICA6IHt2YWx1ZTogbnVsbCwgZmllbGRJZHg6IC0xfTtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi50aGlzLmNvbmZpZy5jb2x1bW5zLFxuICAgICAgW2tleV06IHtcbiAgICAgICAgLi4udGhpcy5jb25maWcuY29sdW1uc1trZXldLFxuICAgICAgICAuLi51cGRhdGVcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEFzc2lnbiBhIGZpZWxkIHBhaXIgdG8gY29sdW1uIGNvbmZpZywgcmV0dXJuIGNvbHVtbiBjb25maWdcbiAgICogQHBhcmFtIGtleSAtIENvbHVtbiBLZXlcbiAgICogQHBhcmFtIHBhaXIgLSBmaWVsZCBQYWlyXG4gICAqIEByZXR1cm5zIHt7fX0gLSBDb2x1bW4gY29uZmlnXG4gICAqL1xuICBhc3NpZ25Db2x1bW5QYWlycyhrZXksIHBhaXIpIHtcbiAgICBpZiAoIXRoaXMuY29sdW1uUGFpcnMgfHwgIXRoaXMuY29sdW1uUGFpcnNba2V5XSkge1xuICAgICAgLy8gc2hvdWxkIG5vdCBlbmQgaW4gdGhpcyBzdGF0ZVxuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmNvbHVtbnM7XG4gICAgfVxuXG4gICAgY29uc3Qge3BhaXI6IHBhcnRuZXJLZXksIGZpZWxkUGFpcktleX0gPSB0aGlzLmNvbHVtblBhaXJzW2tleV07XG4gICAgY29uc3Qge2ZpZWxkUGFpcktleTogcGFydG5lckZpZWxkUGFpcktleX0gPSB0aGlzLmNvbHVtblBhaXJzW3BhcnRuZXJLZXldO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnRoaXMuY29uZmlnLmNvbHVtbnMsXG4gICAgICBba2V5XTogcGFpcltmaWVsZFBhaXJLZXldLFxuICAgICAgW3BhcnRuZXJLZXldOiBwYWlyW3BhcnRuZXJGaWVsZFBhaXJLZXldXG4gICAgfTtcbiAgfVxuXG5cdC8qKlxuICAgKiBDYWxjdWxhdGUgYSByYWRpdXMgem9vbSBtdWx0aXBsaWVyIHRvIHJlbmRlciBwb2ludHMsIHNvIHRoZXkgYXJlIHZpc2libGUgaW4gYWxsIHpvb20gbGV2ZWxcbiAgICogQHBhcmFtIG1hcFN0YXRlXG4gICAqIEBwYXJhbSBtYXBTdGF0ZS56b29tIC0gYWN0dWFsIHpvb21cbiAgICogQHBhcmFtIG1hcFN0YXRlLnpvb21PZmZzZXQgLSB6b29tT2Zmc2V0IHdoZW4gcmVuZGVyIGluIHRoZSBwbG90IGNvbnRhaW5lciBmb3IgZXhwb3J0IGltYWdlXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqL1xuICBnZXRab29tRmFjdG9yKHt6b29tLCB6b29tT2Zmc2V0ID0gMH0pIHtcbiAgICByZXR1cm4gTWF0aC5wb3coMiwgTWF0aC5tYXgoMTQgLSB6b29tICsgem9vbU9mZnNldCwgMCkpO1xuICB9XG5cblx0LyoqXG4gICAqIENhbGN1bGF0ZSBhIGVsZXZhdGlvbiB6b29tIG11bHRpcGxpZXIgdG8gcmVuZGVyIHBvaW50cywgc28gdGhleSBhcmUgdmlzaWJsZSBpbiBhbGwgem9vbSBsZXZlbFxuICAgKiBAcGFyYW0gbWFwU3RhdGVcbiAgICogQHBhcmFtIG1hcFN0YXRlLnpvb20gLSBhY3R1YWwgem9vbVxuICAgKiBAcGFyYW0gbWFwU3RhdGUuem9vbU9mZnNldCAtIHpvb21PZmZzZXQgd2hlbiByZW5kZXIgaW4gdGhlIHBsb3QgY29udGFpbmVyIGZvciBleHBvcnQgaW1hZ2VcbiAgICogQHJldHVybnMge251bWJlcn1cbiAgICovXG4gIGdldEVsZXZhdGlvblpvb21GYWN0b3Ioe3pvb20sIHpvb21PZmZzZXQgPSAwfSkge1xuICAgIHJldHVybiBNYXRoLnBvdygyLCBNYXRoLm1heCg4IC0gem9vbSArIHpvb21PZmZzZXQsIDApKTtcbiAgfVxuXG4gIGZvcm1hdExheWVyRGF0YShkYXRhLCBhbGxEYXRhLCBmaWx0ZXJlZEluZGV4KSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgcmVuZGVyTGF5ZXIoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgZ2V0SG92ZXJEYXRhKG9iamVjdCkge1xuICAgIGlmICghb2JqZWN0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLy8gYnkgZGVmYXVsdCwgZWFjaCBlbnRyeSBvZiBsYXllckRhdGEgc2hvdWxkIGhhdmUgYSBkYXRhIHByb3BlcnR5IHBvaW50c1xuICAgIC8vIHRvIHRoZSBvcmlnaW5hbCBpdGVtIGluIHRoZSBhbGxEYXRhIGFycmF5XG4gICAgLy8gZWFjaCBsYXllciBjYW4gaW1wbGVtZW50IGl0cyBvd24gZ2V0SG92ZXJEYXRhIG1ldGhvZFxuICAgIHJldHVybiBvYmplY3QuZGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIGNoYW5nZSBsYXllciB0eXBlLCB0cnkgdG8gY29weSBvdmVyIGxheWVyIGNvbmZpZ3MgYXMgbXVjaCBhcyBwb3NzaWJsZVxuICAgKiBAcGFyYW0gY29uZmlnVG9Db3B5IC0gY29uZmlnIHRvIGNvcHkgb3ZlclxuICAgKiBAcGFyYW0gdmlzQ29uZmlnU2V0dGluZ3MgLSB2aXNDb25maWcgc2V0dGluZ3Mgb2YgY29uZmlnIHRvIGNvcHlcbiAgICovXG4gIGFzc2lnbkNvbmZpZ1RvTGF5ZXIoY29uZmlnVG9Db3B5LCB2aXNDb25maWdTZXR0aW5ncykge1xuICAgIC8vIGRvbid0IGRlZXAgbWVyZ2UgdmlzdWFsQ2hhbm5lbCBmaWVsZFxuICAgIGNvbnN0IG5vdFRvRGVlcE1lcmdlID0gT2JqZWN0LnZhbHVlcyh0aGlzLnZpc3VhbENoYW5uZWxzKS5tYXAodiA9PiB2LmZpZWxkKTtcblxuICAgIC8vIGRvbid0IGRlZXAgbWVyZ2UgY29sb3IgcmFuZ2UsIHJldmVyc2VkOiBpcyBub3QgYSBrZXkgYnkgZGVmYXVsdFxuICAgIG5vdFRvRGVlcE1lcmdlLnB1c2goJ2NvbG9yUmFuZ2UnKTtcblxuICAgIC8vIGRvbid0IGNvcHkgb3ZlciBkb21haW5cbiAgICBjb25zdCBub3RUb0NvcHkgPSBPYmplY3QudmFsdWVzKHRoaXMudmlzdWFsQ2hhbm5lbHMpLm1hcCh2ID0+IHYuZG9tYWluKTtcblxuICAgIC8vIGlmIHJhbmdlIGlzIGZvciB0aGUgc2FtZSBwcm9wZXJ0eSBncm91cCBjb3B5IGl0LCBvdGhlcndpc2UsIG5vdCB0byBjb3B5XG4gICAgT2JqZWN0LnZhbHVlcyh0aGlzLnZpc3VhbENoYW5uZWxzKS5mb3JFYWNoKHYgPT4ge1xuICAgICAgaWYgKGNvbmZpZ1RvQ29weS52aXNDb25maWdbdi5yYW5nZV0gJiYgdmlzQ29uZmlnU2V0dGluZ3Nbdi5yYW5nZV0uZ3JvdXAgIT09IHRoaXMudmlzQ29uZmlnU2V0dGluZ3Nbdi5yYW5nZV0uZ3JvdXApIHtcbiAgICAgICAgbm90VG9Db3B5LnB1c2godi5yYW5nZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBkb24ndCBjb3B5IG92ZXIgdmlzdWFsQ2hhbm5lbCByYW5nZVxuICAgIGNvbnN0IGN1cnJlbnRDb25maWcgPSB0aGlzLmNvbmZpZztcbiAgICBjb25zdCBjb3BpZWQgPSB0aGlzLmNvcHlMYXllckNvbmZpZyhjdXJyZW50Q29uZmlnLCBjb25maWdUb0NvcHksIHtub3RUb0RlZXBNZXJnZSwgbm90VG9Db3B5fSk7XG5cbiAgICB0aGlzLnVwZGF0ZUxheWVyQ29uZmlnKGNvcGllZCk7XG4gICAgLy8gdmFsaWRhdGUgdmlzdWFsQ2hhbm5lbCBmaWVsZCB0eXBlIGFuZCBzY2FsZSB0eXBlc1xuICAgIE9iamVjdC5rZXlzKHRoaXMudmlzdWFsQ2hhbm5lbHMpLmZvckVhY2goY2hhbm5lbCA9PiB7XG4gICAgICB0aGlzLnZhbGlkYXRlVmlzdWFsQ2hhbm5lbChjaGFubmVsKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qXG4gICAqIFJlY3Vyc2l2ZWx5IGNvcHkgY29uZmlnIG92ZXIgdG8gYW4gZW1wdHkgbGF5ZXJcbiAgICogd2hlbiByZWNlaXZlZCBzYXZlZCBjb25maWcsIG9yIGNvcHkgY29uZmlnIG92ZXIgZnJvbSBhIGRpZmZlcmVudCBsYXllciB0eXBlXG4gICAqIG1ha2Ugc3VyZSB0byBvbmx5IGNvcHkgb3ZlciB2YWx1ZSB0byBleGlzdGluZyBrZXlzXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjdXJyZW50Q29uZmlnIC0gZXhpc3RpbmcgY29uZmlnIHRvIGJlIG92ZXJyaWRlXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWdUb0NvcHkgLSBuZXcgQ29uZmlnIHRvIGNvcHkgb3ZlclxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBub3RUb0RlZXBNZXJnZSAtIGFycmF5IG9mIHByb3BlcnRpZXMgdG8gbm90IHRvIGJlIGRlZXAgY29waWVkXG4gICAqIEBwYXJhbSB7c3RyaW5nW119IG5vdFRvQ29weSAtIGFycmF5IG9mIHByb3BlcnRpZXMgbm90IHRvIGNvcHlcbiAgICogQHJldHVybnMge29iamVjdH0gLSBjb3BpZWQgY29uZmlnXG4gICAqL1xuICBjb3B5TGF5ZXJDb25maWcoY3VycmVudENvbmZpZywgY29uZmlnVG9Db3B5LCB7bm90VG9EZWVwTWVyZ2UgPSBbXSwgbm90VG9Db3B5ID0gW119ID0ge30pIHtcbiAgICBjb25zdCBjb3BpZWQgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhjdXJyZW50Q29uZmlnKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIGlzUGxhaW5PYmplY3QoY3VycmVudENvbmZpZ1trZXldKSAmJlxuICAgICAgICBpc1BsYWluT2JqZWN0KGNvbmZpZ1RvQ29weVtrZXldKSAmJlxuICAgICAgICAhbm90VG9EZWVwTWVyZ2UuaW5jbHVkZXMoa2V5KSAmJlxuICAgICAgICAhbm90VG9Db3B5LmluY2x1ZGVzKGtleSlcbiAgICAgICkge1xuICAgICAgICAvLyByZWN1cnNpdmVseSBhc3NpZ24gb2JqZWN0IHZhbHVlXG4gICAgICAgIGNvcGllZFtrZXldID0gdGhpcy5jb3B5TGF5ZXJDb25maWcoY3VycmVudENvbmZpZ1trZXldLCBjb25maWdUb0NvcHlba2V5XSwge25vdFRvRGVlcE1lcmdlLCBub3RUb0NvcHl9KTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIG5vdE51bGxvclVuZGVmaW5lZChjb25maWdUb0NvcHlba2V5XSkgJiZcbiAgICAgICAgIW5vdFRvQ29weS5pbmNsdWRlcyhrZXkpXG4gICAgICApIHtcbiAgICAgICAgLy8gY29weVxuICAgICAgICBjb3BpZWRba2V5XSA9IGNvbmZpZ1RvQ29weVtrZXldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8ga2VlcCBleGlzdGluZ1xuICAgICAgICBjb3BpZWRba2V5XSA9IGN1cnJlbnRDb25maWdba2V5XTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBjb3BpZWQ7XG4gIH1cblxuICByZWdpc3RlclZpc0NvbmZpZyhsYXllclZpc0NvbmZpZ3MpIHtcbiAgICBPYmplY3Qua2V5cyhsYXllclZpc0NvbmZpZ3MpLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJyAmJlxuICAgICAgICBMQVlFUl9WSVNfQ09ORklHU1tsYXllclZpc0NvbmZpZ3NbaXRlbV1dXG4gICAgICApIHtcbiAgICAgICAgLy8gaWYgYXNzaWduZWQgb25lIG9mIGRlZmF1bHQgTEFZRVJfQ09ORklHU1xuICAgICAgICB0aGlzLmNvbmZpZy52aXNDb25maWdbaXRlbV0gPVxuICAgICAgICAgIExBWUVSX1ZJU19DT05GSUdTW2xheWVyVmlzQ29uZmlnc1tpdGVtXV0uZGVmYXVsdFZhbHVlO1xuICAgICAgICB0aGlzLnZpc0NvbmZpZ1NldHRpbmdzW2l0ZW1dID0gTEFZRVJfVklTX0NPTkZJR1NbbGF5ZXJWaXNDb25maWdzW2l0ZW1dXTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIFsndHlwZScsICdkZWZhdWx0VmFsdWUnXS5ldmVyeShwID0+IGxheWVyVmlzQ29uZmlnc1tpdGVtXVtwXSlcbiAgICAgICkge1xuICAgICAgICAvLyBpZiBwcm92aWRlZCBjdXN0b21pemVkIHZpc0NvbmZpZywgYW5kIGhhcyB0eXBlICYmIGRlZmF1bHRWYWx1ZVxuICAgICAgICAvLyBUT0RPOiBmdXJ0aGVyIGNoZWNrIGlmIGN1c3RvbWl6ZWQgdmlzQ29uZmlnIGlzIHZhbGlkXG4gICAgICAgIHRoaXMuY29uZmlnLnZpc0NvbmZpZ1tpdGVtXSA9IGxheWVyVmlzQ29uZmlnc1tpdGVtXS5kZWZhdWx0VmFsdWU7XG4gICAgICAgIHRoaXMudmlzQ29uZmlnU2V0dGluZ3NbaXRlbV0gPSBsYXllclZpc0NvbmZpZ3NbaXRlbV07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZXRMYXllckNvbHVtbnMoKSB7XG4gICAgY29uc3QgcmVxdWlyZWQgPSB0aGlzLnJlcXVpcmVkTGF5ZXJDb2x1bW5zLnJlZHVjZShcbiAgICAgIChhY2N1LCBrZXkpID0+ICh7XG4gICAgICAgIC4uLmFjY3UsXG4gICAgICAgIFtrZXldOiB7dmFsdWU6IG51bGwsIGZpZWxkSWR4OiAtMX1cbiAgICAgIH0pLFxuICAgICAge31cbiAgICApO1xuICAgIGNvbnN0IG9wdGlvbmFsID0gdGhpcy5vcHRpb25hbENvbHVtbnMucmVkdWNlKFxuICAgICAgKGFjY3UsIGtleSkgPT4gKHtcbiAgICAgICAgLi4uYWNjdSxcbiAgICAgICAgW2tleV06IHt2YWx1ZTogbnVsbCwgZmllbGRJZHg6IC0xLCBvcHRpb25hbDogdHJ1ZX1cbiAgICAgIH0pLFxuICAgICAge31cbiAgICApO1xuXG4gICAgcmV0dXJuIHsuLi5yZXF1aXJlZCwgLi4ub3B0aW9uYWx9O1xuICB9XG5cbiAgdXBkYXRlTGF5ZXJDb25maWcobmV3Q29uZmlnKSB7XG4gICAgdGhpcy5jb25maWcgPSB7Li4udGhpcy5jb25maWcsIC4uLm5ld0NvbmZpZ307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB1cGRhdGVMYXllclZpc0NvbmZpZyhuZXdWaXNDb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZy52aXNDb25maWcgPSB7Li4udGhpcy5jb25maWcudmlzQ29uZmlnLCAuLi5uZXdWaXNDb25maWd9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qKlxuICAgKiBDaGVjayB3aGV0aGVyIGxheWVyIGhhcyBhbGwgY29sdW1uc1xuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gbGF5ZXJcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHllcyBvciBub1xuICAgKi9cbiAgaGFzQWxsQ29sdW1ucygpIHtcbiAgICBjb25zdCB7Y29sdW1uc30gPSB0aGlzLmNvbmZpZztcbiAgICByZXR1cm4gKFxuICAgICAgY29sdW1ucyAmJlxuICAgICAgT2JqZWN0LnZhbHVlcyhjb2x1bW5zKS5ldmVyeSh2ID0+IHtcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4odi5vcHRpb25hbCB8fCAodi52YWx1ZSAmJiB2LmZpZWxkSWR4ID4gLTEpKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayB3aGV0aGVyIGxheWVyIGhhcyBkYXRhXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBsYXllclxuICAgKiBAcGFyYW0ge0FycmF5IHwgT2JqZWN0fSBsYXllckRhdGFcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHllcyBvciBub1xuICAgKi9cbiAgaGFzTGF5ZXJEYXRhKGxheWVyRGF0YSkge1xuICAgIGlmICghbGF5ZXJEYXRhKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIEJvb2xlYW4obGF5ZXJEYXRhLmRhdGEgJiYgbGF5ZXJEYXRhLmRhdGEubGVuZ3RoKTtcbiAgfVxuXG4gIGlzVmFsaWRUb1NhdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMudHlwZSAmJiB0aGlzLmhhc0FsbENvbHVtbnMoKTtcbiAgfVxuXG4gIHNob3VsZFJlbmRlckxheWVyKGRhdGEpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy50eXBlICYmXG4gICAgICB0aGlzLmhhc0FsbENvbHVtbnMoKSAmJlxuICAgICAgdGhpcy5jb25maWcuaXNWaXNpYmxlICYmXG4gICAgICB0aGlzLmhhc0xheWVyRGF0YShkYXRhKVxuICAgICk7XG4gIH1cblxuICBnZXRWaXNDaGFubmVsU2NhbGUoc2NhbGUsIGRvbWFpbiwgcmFuZ2UsIGZpeGVkKSB7XG4gICAgcmV0dXJuIFNDQUxFX0ZVTkNbZml4ZWQgPyAnbGluZWFyJyA6IHNjYWxlXSgpXG4gICAgICAuZG9tYWluKGRvbWFpbilcbiAgICAgIC5yYW5nZShmaXhlZCA/IGRvbWFpbiA6IHJhbmdlKTtcbiAgfVxuXG4gIGdldFBvaW50c0JvdW5kcyhhbGxEYXRhLCBnZXRQb3NpdGlvbikge1xuICAgIC8vIG5vIG5lZWQgdG8gbG9vcCB0aHJvdWdoIHRoZSBlbnRpcmUgZGF0YXNldFxuICAgIC8vIGdldCBhIHNhbXBsZSBvZiBkYXRhIHRvIGNhbGN1bGF0ZSBib3VuZHNcbiAgICBjb25zdCBzYW1wbGVEYXRhID1cbiAgICAgIGFsbERhdGEubGVuZ3RoID4gTUFYX1NBTVBMRV9TSVpFXG4gICAgICAgID8gZ2V0U2FtcGxlRGF0YShhbGxEYXRhLCBNQVhfU0FNUExFX1NJWkUpXG4gICAgICAgIDogYWxsRGF0YTtcbiAgICBjb25zdCBwb2ludHMgPSBzYW1wbGVEYXRhLm1hcChnZXRQb3NpdGlvbik7XG5cbiAgICBjb25zdCBsYXRCb3VuZHMgPSBnZXRMYXRMbmdCb3VuZHMocG9pbnRzLCAxLCBbLTkwLCA5MF0pO1xuICAgIGNvbnN0IGxuZ0JvdW5kcyA9IGdldExhdExuZ0JvdW5kcyhwb2ludHMsIDAsIFstMTgwLCAxODBdKTtcblxuICAgIGlmICghbGF0Qm91bmRzIHx8ICFsbmdCb3VuZHMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBbbG5nQm91bmRzWzBdLCBsYXRCb3VuZHNbMF0sIGxuZ0JvdW5kc1sxXSwgbGF0Qm91bmRzWzFdXTtcbiAgfVxuXG4gIGdldExpZ2h0U2V0dGluZ3NGcm9tQm91bmRzKGJvdW5kcykge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KGJvdW5kcykgJiYgYm91bmRzLmxlbmd0aCA+PSA0XG4gICAgICA/IHtcbiAgICAgICAgICAuLi5ERUZBVUxUX0xJR0hUX1NFVFRJTkdTLFxuICAgICAgICAgIGxpZ2h0c1Bvc2l0aW9uOiBbXG4gICAgICAgICAgICAuLi5ib3VuZHMuc2xpY2UoMCwgMiksXG4gICAgICAgICAgICBERUZBVUxUX0xJR0hUX1NFVFRJTkdTLmxpZ2h0c1Bvc2l0aW9uWzJdLFxuICAgICAgICAgICAgLi4uYm91bmRzLnNsaWNlKDIsIDQpLFxuICAgICAgICAgICAgREVGQVVMVF9MSUdIVF9TRVRUSU5HUy5saWdodHNQb3NpdGlvbls1XVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgOiBERUZBVUxUX0xJR0hUX1NFVFRJTkdTO1xuICB9XG5cbiAgZ2V0RW5jb2RlZENoYW5uZWxWYWx1ZShcbiAgICBzY2FsZSxcbiAgICBkYXRhLFxuICAgIGZpZWxkLFxuICAgIGRlZmF1bHRWYWx1ZSA9IE5PX1ZBTFVFX0NPTE9SLFxuICAgIGdldFZhbHVlID0gZGVmYXVsdEdldEZpZWxkVmFsdWVcbiAgKSB7XG4gICAgY29uc3Qge3R5cGV9ID0gZmllbGQ7XG4gICAgY29uc3QgdmFsdWUgPSBnZXRWYWx1ZShmaWVsZCwgZGF0YSk7XG4gICAgbGV0IGF0dHJpYnV0ZVZhbHVlO1xuICAgIGlmICh0eXBlID09PSBBTExfRklFTERfVFlQRVMudGltZXN0YW1wKSB7XG4gICAgICAvLyBzaG91bGRuJ3QgbmVlZCB0byBjb252ZXJ0IGhlcmVcbiAgICAgIC8vIHNjYWxlIEZ1bmN0aW9uIHNob3VsZCB0YWtlIGNhcmUgb2YgaXRcbiAgICAgIGF0dHJpYnV0ZVZhbHVlID0gc2NhbGUobmV3IERhdGUodmFsdWUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXR0cmlidXRlVmFsdWUgPSBzY2FsZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKCFhdHRyaWJ1dGVWYWx1ZSkge1xuICAgICAgYXR0cmlidXRlVmFsdWUgPSBkZWZhdWx0VmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGF0dHJpYnV0ZVZhbHVlO1xuICB9XG5cbiAgdXBkYXRlTWV0YShtZXRhKSB7XG4gICAgdGhpcy5tZXRhID0gey4uLnRoaXMubWV0YSwgLi4ubWV0YX07XG4gIH1cblxuICAvKipcbiAgICogaGVscGVyIGZ1bmN0aW9uIHRvIHVwZGF0ZSBvbmUgbGF5ZXIgZG9tYWluIHdoZW4gc3RhdGUuZGF0YSBjaGFuZ2VkXG4gICAqIGlmIHN0YXRlLmRhdGEgY2hhbmdlIGlzIGR1ZSBvdCB1cGRhdGUgZmlsdGVyLCBuZXdGaWxlciB3aWxsIGJlIHBhc3NlZFxuICAgKiBjYWxsZWQgYnkgdXBkYXRlQWxsTGF5ZXJEb21haW5EYXRhXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhc2V0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBuZXdGaWx0ZXJcbiAgICogQHJldHVybnMge29iamVjdH0gbGF5ZXJcbiAgICovXG4gIHVwZGF0ZUxheWVyRG9tYWluKGRhdGFzZXQsIG5ld0ZpbHRlcikge1xuICAgIE9iamVjdC52YWx1ZXModGhpcy52aXN1YWxDaGFubmVscykuZm9yRWFjaChjaGFubmVsID0+IHtcbiAgICAgIGNvbnN0IHtzY2FsZX0gPSBjaGFubmVsO1xuICAgICAgY29uc3Qgc2NhbGVUeXBlID0gdGhpcy5jb25maWdbc2NhbGVdO1xuICAgICAgLy8gb3JkaW5hbCBkb21haW4gaXMgYmFzZWQgb24gYWxsRGF0YSwgaWYgb25seSBmaWx0ZXIgY2hhbmdlZFxuICAgICAgLy8gbm8gbmVlZCB0byB1cGRhdGUgb3JkaW5hbCBkb21haW5cbiAgICAgIGlmICghbmV3RmlsdGVyIHx8IHNjYWxlVHlwZSAhPT0gU0NBTEVfVFlQRVMub3JkaW5hbCkge1xuICAgICAgICBjb25zdCB7ZG9tYWlufSA9IGNoYW5uZWw7XG4gICAgICAgIGNvbnN0IHVwZGF0ZWREb21haW4gPSB0aGlzLmNhbGN1bGF0ZUxheWVyRG9tYWluKGRhdGFzZXQsIGNoYW5uZWwpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlTGF5ZXJDb25maWcoe1tkb21haW5dOiB1cGRhdGVkRG9tYWlufSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0ZSB2aXN1YWwgY2hhbm5lbCBmaWVsZCBhbmQgc2NhbGVzIGJhc2VkIG9uIHN1cHBvcnRlZCBmaWVsZCAmIHNjYWxlIHR5cGVcbiAgICogQHBhcmFtIGNoYW5uZWxcbiAgICovXG4gIHZhbGlkYXRlVmlzdWFsQ2hhbm5lbChjaGFubmVsKSB7XG4gICAgdGhpcy52YWxpZGF0ZUZpZWxkVHlwZShjaGFubmVsKTtcbiAgICB0aGlzLnZhbGlkYXRlU2NhbGUoY2hhbm5lbCk7XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdGUgZmllbGQgdHlwZSBiYXNlZCBvbiBjaGFubmVsU2NhbGVUeXBlXG4gICAqL1xuICB2YWxpZGF0ZUZpZWxkVHlwZShjaGFubmVsKSB7XG4gICAgY29uc3QgdmlzdWFsQ2hhbm5lbCA9IHRoaXMudmlzdWFsQ2hhbm5lbHNbY2hhbm5lbF07XG4gICAgY29uc3Qge2ZpZWxkLCBjaGFubmVsU2NhbGVUeXBlLCBzdXBwb3J0ZWRGaWVsZFR5cGVzfSA9IHZpc3VhbENoYW5uZWw7XG5cbiAgICBpZiAodGhpcy5jb25maWdbZmllbGRdKSB7XG4gICAgICAvLyBpZiBmaWVsZCBpcyBzZWxlY3RlZCwgY2hlY2sgaWYgZmllbGQgdHlwZSBpcyBzdXBwb3J0ZWRcbiAgICAgIGNvbnN0IGNoYW5uZWxTdXBwb3J0ZWRGaWVsZFR5cGVzID0gc3VwcG9ydGVkRmllbGRUeXBlcyB8fCBDSEFOTkVMX1NDQUxFX1NVUFBPUlRFRF9GSUVMRFNbY2hhbm5lbFNjYWxlVHlwZV07XG5cbiAgICAgIGlmICghY2hhbm5lbFN1cHBvcnRlZEZpZWxkVHlwZXMuaW5jbHVkZXModGhpcy5jb25maWdbZmllbGRdLnR5cGUpKSB7XG4gICAgICAgIC8vIGZpZWxkIHR5cGUgaXMgbm90IHN1cHBvcnRlZCwgc2V0IGl0IGJhY2sgdG8gbnVsbFxuICAgICAgICAvLyBzZXQgc2NhbGUgYmFjayB0byBkZWZhdWx0XG4gICAgICAgIHRoaXMudXBkYXRlTGF5ZXJDb25maWcoe1tmaWVsZF06IG51bGx9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdGUgc2NhbGUgdHlwZSBiYXNlZCBvbiBhZ2dyZWdhdGlvblxuICAgKi9cbiAgdmFsaWRhdGVTY2FsZShjaGFubmVsKSB7XG4gICAgY29uc3QgdmlzdWFsQ2hhbm5lbCA9IHRoaXMudmlzdWFsQ2hhbm5lbHNbY2hhbm5lbF07XG4gICAgY29uc3Qge3NjYWxlfSA9IHZpc3VhbENoYW5uZWw7XG4gICAgaWYgKCFzY2FsZSkge1xuICAgICAgLy8gdmlzdWFsQ2hhbm5lbCBkb2Vzbid0IGhhdmUgc2NhbGVcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgc2NhbGVPcHRpb25zID0gdGhpcy5nZXRTY2FsZU9wdGlvbnMoY2hhbm5lbCk7XG4gICAgLy8gY2hlY2sgaWYgY3VycmVudCBzZWxlY3RlZCBzY2FsZSBpc1xuICAgIC8vIHN1cHBvcnRlZCwgaWYgbm90LCBjaGFuZ2UgdG8gZGVmYXVsdFxuICAgIGlmICghc2NhbGVPcHRpb25zLmluY2x1ZGVzKHRoaXMuY29uZmlnW3NjYWxlXSkpIHtcbiAgICAgIHRoaXMudXBkYXRlTGF5ZXJDb25maWcoe1tzY2FsZV06IHNjYWxlT3B0aW9uc1swXX0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgc2NhbGUgb3B0aW9ucyBiYXNlZCBvbiBjdXJyZW50IGZpZWxkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjaGFubmVsXG4gICAqIEByZXR1cm5zIHtzdHJpbmdbXX1cbiAgICovXG4gIGdldFNjYWxlT3B0aW9ucyhjaGFubmVsKSB7XG4gICAgY29uc3QgdmlzdWFsQ2hhbm5lbCA9IHRoaXMudmlzdWFsQ2hhbm5lbHNbY2hhbm5lbF07XG4gICAgY29uc3Qge2ZpZWxkLCBzY2FsZSwgY2hhbm5lbFNjYWxlVHlwZX0gPSB2aXN1YWxDaGFubmVsO1xuXG4gICAgcmV0dXJuIHRoaXMuY29uZmlnW2ZpZWxkXSA/XG4gICAgICBGSUVMRF9PUFRTW3RoaXMuY29uZmlnW2ZpZWxkXS50eXBlXS5zY2FsZVtjaGFubmVsU2NhbGVUeXBlXSA6XG4gICAgICBbdGhpcy5nZXREZWZhdWx0TGF5ZXJDb25maWcoKVtzY2FsZV1dO1xuICB9XG5cbiAgdXBkYXRlTGF5ZXJWaXN1YWxDaGFubmVsKGRhdGFzZXQsIGNoYW5uZWwpIHtcbiAgICBjb25zdCB2aXN1YWxDaGFubmVsID0gdGhpcy52aXN1YWxDaGFubmVsc1tjaGFubmVsXTtcblxuICAgIHRoaXMudmFsaWRhdGVWaXN1YWxDaGFubmVsKGNoYW5uZWwpO1xuICAgICAgLy8gY2FsY3VsYXRlIGxheWVyIGNoYW5uZWwgZG9tYWluXG4gICAgY29uc3QgdXBkYXRlZERvbWFpbiA9IHRoaXMuY2FsY3VsYXRlTGF5ZXJEb21haW4oZGF0YXNldCwgdmlzdWFsQ2hhbm5lbCk7XG5cbiAgICB0aGlzLnVwZGF0ZUxheWVyQ29uZmlnKHtbdmlzdWFsQ2hhbm5lbC5kb21haW5dOiB1cGRhdGVkRG9tYWlufSk7XG4gIH1cblxuICBjYWxjdWxhdGVMYXllckRvbWFpbihkYXRhc2V0LCB2aXN1YWxDaGFubmVsKSB7XG4gICAgY29uc3Qge2FsbERhdGEsIGZpbHRlcmVkSW5kZXhGb3JEb21haW59ID0gZGF0YXNldDtcbiAgICBjb25zdCBkZWZhdWx0RG9tYWluID0gWzAsIDFdO1xuICAgIGNvbnN0IHtzY2FsZX0gPSB2aXN1YWxDaGFubmVsO1xuICAgIGNvbnN0IHNjYWxlVHlwZSA9IHRoaXMuY29uZmlnW3NjYWxlXTtcblxuICAgIGNvbnN0IGZpZWxkID0gdGhpcy5jb25maWdbdmlzdWFsQ2hhbm5lbC5maWVsZF07XG4gICAgaWYgKCFmaWVsZCkge1xuICAgICAgLy8gaWYgY29sb3JGaWVsZCBvciBzaXplRmllbGQgd2VyZSBzZXQgYmFjayB0byBudWxsXG4gICAgICByZXR1cm4gZGVmYXVsdERvbWFpbjtcbiAgICB9XG5cbiAgICBpZiAoIVNDQUxFX1RZUEVTW3NjYWxlVHlwZV0pIHtcbiAgICAgIENvbnNvbGUuZXJyb3IoYHNjYWxlIHR5cGUgJHtzY2FsZVR5cGV9IG5vdCBzdXBwb3J0ZWRgKTtcbiAgICAgIHJldHVybiBkZWZhdWx0RG9tYWluO1xuICAgIH1cblxuICAgIC8vIFRPRE86IHJlZmFjdG9yIHRvIGFkZCB2YWx1ZUFjY2Vzc29yIHRvIGZpZWxkXG4gICAgY29uc3QgZmllbGRJZHggPSBmaWVsZC50YWJsZUZpZWxkSW5kZXggLSAxO1xuICAgIGNvbnN0IGlzVGltZSA9IGZpZWxkLnR5cGUgPT09IEFMTF9GSUVMRF9UWVBFUy50aW1lc3RhbXA7XG4gICAgY29uc3QgdmFsdWVBY2Nlc3NvciA9IG1heWJlVG9EYXRlLmJpbmQoXG4gICAgICBudWxsLFxuICAgICAgaXNUaW1lLFxuICAgICAgZmllbGRJZHgsXG4gICAgICBmaWVsZC5mb3JtYXRcbiAgICApO1xuICAgIGNvbnN0IGluZGV4VmFsdWVBY2Nlc3NvciA9IGkgPT4gdmFsdWVBY2Nlc3NvcihhbGxEYXRhW2ldKTtcblxuICAgIGNvbnN0IHNvcnRGdW5jdGlvbiA9IGdldFNvcnRpbmdGdW5jdGlvbihmaWVsZC50eXBlKTtcblxuICAgIHN3aXRjaCAoc2NhbGVUeXBlKSB7XG4gICAgICBjYXNlIFNDQUxFX1RZUEVTLm9yZGluYWw6XG4gICAgICBjYXNlIFNDQUxFX1RZUEVTLnBvaW50OlxuICAgICAgICAvLyBkbyBub3QgcmVjYWxjdWxhdGUgb3JkaW5hbCBkb21haW4gYmFzZWQgb24gZmlsdGVyZWQgZGF0YVxuICAgICAgICAvLyBkb24ndCBuZWVkIHRvIHVwZGF0ZSBvcmRpbmFsIGRvbWFpbiBldmVyeSB0aW1lXG4gICAgICAgIHJldHVybiBnZXRPcmRpbmFsRG9tYWluKGFsbERhdGEsIHZhbHVlQWNjZXNzb3IpO1xuXG4gICAgICBjYXNlIFNDQUxFX1RZUEVTLnF1YW50aWxlOlxuICAgICAgICByZXR1cm4gZ2V0UXVhbnRpbGVEb21haW4oZmlsdGVyZWRJbmRleEZvckRvbWFpbiwgaW5kZXhWYWx1ZUFjY2Vzc29yLCBzb3J0RnVuY3Rpb24pO1xuXG4gICAgICBjYXNlIFNDQUxFX1RZUEVTLnF1YW50aXplOlxuICAgICAgY2FzZSBTQ0FMRV9UWVBFUy5saW5lYXI6XG4gICAgICBjYXNlIFNDQUxFX1RZUEVTLnNxcnQ6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZ2V0TGluZWFyRG9tYWluKGZpbHRlcmVkSW5kZXhGb3JEb21haW4sIGluZGV4VmFsdWVBY2Nlc3Nvcik7XG4gICAgfVxuICB9XG5cbiAgaXNMYXllckhvdmVyZWQob2JqZWN0SW5mbykge1xuICAgIHJldHVybiAoXG4gICAgICBvYmplY3RJbmZvICYmXG4gICAgICBvYmplY3RJbmZvLmxheWVyICYmXG4gICAgICBvYmplY3RJbmZvLnBpY2tlZCAmJlxuICAgICAgb2JqZWN0SW5mby5sYXllci5wcm9wcy5pZCA9PT0gdGhpcy5pZFxuICAgICk7XG4gIH1cblxuICBnZXRSYWRpdXNTY2FsZUJ5Wm9vbShtYXBTdGF0ZSwgZml4ZWRSYWRpdXMpIHtcbiAgICBjb25zdCByYWRpdXNDaGFubmVsID0gT2JqZWN0LnZhbHVlcyh0aGlzLnZpc3VhbENoYW5uZWxzKS5maW5kKFxuICAgICAgdmMgPT4gdmMucHJvcGVydHkgPT09ICdyYWRpdXMnXG4gICAgKTtcblxuICAgIGlmICghcmFkaXVzQ2hhbm5lbCkge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuXG4gICAgY29uc3QgZmllbGQgPSByYWRpdXNDaGFubmVsLmZpZWxkO1xuICAgIGNvbnN0IGZpeGVkID1cbiAgICAgIGZpeGVkUmFkaXVzID09PSB1bmRlZmluZWRcbiAgICAgICAgPyB0aGlzLmNvbmZpZy52aXNDb25maWcuZml4ZWRSYWRpdXNcbiAgICAgICAgOiBmaXhlZFJhZGl1cztcbiAgICBjb25zdCB7cmFkaXVzfSA9IHRoaXMuY29uZmlnLnZpc0NvbmZpZztcblxuICAgIHJldHVybiBmaXhlZFxuICAgICAgPyAxXG4gICAgICA6ICh0aGlzLmNvbmZpZ1tmaWVsZF0gPyAxIDogcmFkaXVzKSAqIHRoaXMuZ2V0Wm9vbUZhY3RvcihtYXBTdGF0ZSk7XG4gIH1cblxuICBzaG91bGRDYWxjdWxhdGVMYXllckRhdGEocHJvcHMpIHtcbiAgICByZXR1cm4gcHJvcHMuc29tZShwID0+ICF0aGlzLm5vbmVMYXllckRhdGFBZmZlY3RpbmdQcm9wcy5pbmNsdWRlcyhwKSk7XG4gIH1cbn1cbiJdfQ==