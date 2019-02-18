"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.visStateSchema = exports.visStateSchemaV1 = exports.visStateSchemaV0 = exports.propertiesV1 = exports.propertiesV0 = exports.filterPropsV1 = exports.DimensionFieldSchema = exports.filterPropsV0 = exports.layerPropsV1 = exports.layerPropsV0 = exports.dimensionPropsV0 = void 0;

var _objectSpread11 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf13 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = _interopRequireDefault(require("lodash.pick"));

var _versions = require("./versions");

var _filterUtils = require("../utils/filter-utils");

var _schema = _interopRequireDefault(require("./schema"));

var _visStateSchema;

/**
 * V0 Schema
 */
var dimensionPropsV0 = ['name', 'type']; // in v0 geojson there is only sizeField
// in v1 geojson
// stroke base on -> sizeField
// height based on -> heightField
// radius based on -> radiusField
// here we make our wiredst guess on which channel sizeField belongs to

exports.dimensionPropsV0 = dimensionPropsV0;

function geojsonSizeFieldV0ToV1(config) {
  var defaultRaiuds = 10;
  var defaultRadiusRange = [0, 50]; // if extruded, sizeField is most likely used for height

  if (config.visConfig.extruded) {
    return 'heightField';
  } // if show stroke enabled, sizeField is most likely used for stroke


  if (config.visConfig.stroked) {
    return 'sizeField';
  } // if radius changed, or radius Range Changed, sizeField is most likely used for radius
  // this is the most unreliable guess, that's why we put it in the end


  if (config.visConfig.radius !== defaultRaiuds || config.visConfig.radiusRange.some(function (d, i) {
    return d !== defaultRadiusRange[i];
  })) {
    return 'radiusField';
  }

  return 'sizeField';
} // convert v0 to v1 layer config


var DimensionFieldSchemaV0 =
/*#__PURE__*/
function (_Schema) {
  (0, _inherits2.default)(DimensionFieldSchemaV0, _Schema);

  function DimensionFieldSchemaV0() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, DimensionFieldSchemaV0);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf13.default)(DimensionFieldSchemaV0)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "version", _versions.VERSIONS.v0);
    return _this;
  }

  (0, _createClass2.default)(DimensionFieldSchemaV0, [{
    key: "save",
    value: function save(field, config) {
      // should not be called anymore
      return (0, _defineProperty2.default)({}, this.key, field !== null ? this.savePropertiesOrApplySchema(field)[this.key] : null);
    }
  }, {
    key: "load",
    value: function load(field, config, accumulated) {
      var fieldName = this.key;

      if (config.type === 'geojson' && this.key === 'sizeField' && field) {
        fieldName = geojsonSizeFieldV0ToV1(config);
      } // fold into visualChannels to be load by VisualChannelSchemaV1


      return {
        visualChannels: (0, _objectSpread11.default)({}, accumulated.visualChannels || {}, (0, _defineProperty2.default)({}, fieldName, field))
      };
    }
  }]);
  return DimensionFieldSchemaV0;
}(_schema.default);

var DimensionScaleSchemaV0 =
/*#__PURE__*/
function (_Schema2) {
  (0, _inherits2.default)(DimensionScaleSchemaV0, _Schema2);

  function DimensionScaleSchemaV0() {
    var _getPrototypeOf3;

    var _this2;

    (0, _classCallCheck2.default)(this, DimensionScaleSchemaV0);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf3 = (0, _getPrototypeOf13.default)(DimensionScaleSchemaV0)).call.apply(_getPrototypeOf3, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2)), "version", _versions.VERSIONS.v0);
    return _this2;
  }

  (0, _createClass2.default)(DimensionScaleSchemaV0, [{
    key: "save",
    value: function save(scale) {
      return (0, _defineProperty2.default)({}, this.key, scale);
    }
  }, {
    key: "load",
    value: function load(scale, config, accumulated) {
      // fold into visualChannels to be load by VisualChannelSchemaV1
      if (this.key === 'sizeScale' && config.type === 'geojson') {
        // sizeScale now split into radiusScale, heightScale
        // no user customization, just use default
        return {};
      }

      return {
        visualChannels: (0, _objectSpread11.default)({}, accumulated.visualChannels || {}, (0, _defineProperty2.default)({}, this.key, scale))
      };
    }
  }]);
  return DimensionScaleSchemaV0;
}(_schema.default); // used to convert v0 to v1 layer config


var LayerConfigSchemaV0 =
/*#__PURE__*/
function (_Schema3) {
  (0, _inherits2.default)(LayerConfigSchemaV0, _Schema3);

  function LayerConfigSchemaV0() {
    var _getPrototypeOf4;

    var _this3;

    (0, _classCallCheck2.default)(this, LayerConfigSchemaV0);

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    _this3 = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf4 = (0, _getPrototypeOf13.default)(LayerConfigSchemaV0)).call.apply(_getPrototypeOf4, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this3)), "version", _versions.VERSIONS.v0);
    return _this3;
  }

  (0, _createClass2.default)(LayerConfigSchemaV0, [{
    key: "load",
    value: function load(saved, layer, accumulated) {
      // fold v0 layer property into config.key
      return {
        config: (0, _objectSpread11.default)({}, accumulated.config || {}, (0, _defineProperty2.default)({}, this.key, saved))
      };
    }
  }]);
  return LayerConfigSchemaV0;
}(_schema.default); // used to convert v0 to v1 layer columns
// only return column value for each column


var LayerColumnsSchemaV0 =
/*#__PURE__*/
function (_Schema4) {
  (0, _inherits2.default)(LayerColumnsSchemaV0, _Schema4);

  function LayerColumnsSchemaV0() {
    var _getPrototypeOf5;

    var _this4;

    (0, _classCallCheck2.default)(this, LayerColumnsSchemaV0);

    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    _this4 = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf5 = (0, _getPrototypeOf13.default)(LayerColumnsSchemaV0)).call.apply(_getPrototypeOf5, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this4)), "version", _versions.VERSIONS.v0);
    return _this4;
  }

  (0, _createClass2.default)(LayerColumnsSchemaV0, [{
    key: "load",
    value: function load(saved, layer, accumulated) {
      // fold v0 layer property into config.key, flatten columns
      return {
        config: (0, _objectSpread11.default)({}, accumulated.config || {}, {
          columns: Object.keys(saved).reduce(function (accu, key) {
            return (0, _objectSpread11.default)({}, accu, (0, _defineProperty2.default)({}, key, saved[key].value));
          }, {})
        })
      };
    }
  }]);
  return LayerColumnsSchemaV0;
}(_schema.default); // used to convert v0 to v1 layer config.visConfig


var LayerConfigToVisConfigSchemaV0 =
/*#__PURE__*/
function (_Schema5) {
  (0, _inherits2.default)(LayerConfigToVisConfigSchemaV0, _Schema5);

  function LayerConfigToVisConfigSchemaV0() {
    var _getPrototypeOf6;

    var _this5;

    (0, _classCallCheck2.default)(this, LayerConfigToVisConfigSchemaV0);

    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    _this5 = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf6 = (0, _getPrototypeOf13.default)(LayerConfigToVisConfigSchemaV0)).call.apply(_getPrototypeOf6, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this5)), "version", _versions.VERSIONS.v0);
    return _this5;
  }

  (0, _createClass2.default)(LayerConfigToVisConfigSchemaV0, [{
    key: "load",
    value: function load(saved, layer, accumulated) {
      // fold v0 layer property into config.visConfig
      var accumulatedConfig = accumulated.config || {};
      return {
        config: (0, _objectSpread11.default)({}, accumulatedConfig, {
          visConfig: (0, _objectSpread11.default)({}, accumulatedConfig.visConfig || {}, (0, _defineProperty2.default)({}, this.key, saved))
        })
      };
    }
  }]);
  return LayerConfigToVisConfigSchemaV0;
}(_schema.default);

var LayerVisConfigSchemaV0 =
/*#__PURE__*/
function (_Schema6) {
  (0, _inherits2.default)(LayerVisConfigSchemaV0, _Schema6);

  function LayerVisConfigSchemaV0() {
    var _getPrototypeOf7;

    var _this6;

    (0, _classCallCheck2.default)(this, LayerVisConfigSchemaV0);

    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }

    _this6 = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf7 = (0, _getPrototypeOf13.default)(LayerVisConfigSchemaV0)).call.apply(_getPrototypeOf7, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this6)), "version", _versions.VERSIONS.v0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this6)), "key", 'visConfig');
    return _this6;
  }

  (0, _createClass2.default)(LayerVisConfigSchemaV0, [{
    key: "load",
    value: function load(visConfig, config, accumulator) {
      var rename = {
        geojson: {
          extruded: 'enable3d',
          elevationRange: 'heightRange'
        }
      };

      if (config.type in rename) {
        var propToRename = rename[config.type];
        return {
          config: (0, _objectSpread11.default)({}, accumulator.config || {}, {
            visConfig: Object.keys(visConfig).reduce(function (accu, key) {
              return (0, _objectSpread11.default)({}, accu, propToRename[key] ? (0, _defineProperty2.default)({}, propToRename[key], visConfig[key]) : (0, _defineProperty2.default)({}, key, visConfig[key]));
            }, {})
          })
        };
      }

      return {
        config: (0, _objectSpread11.default)({}, accumulator.config || {}, {
          visConfig: visConfig
        })
      };
    }
  }]);
  return LayerVisConfigSchemaV0;
}(_schema.default);

var LayerConfigSchemaDeleteV0 =
/*#__PURE__*/
function (_Schema7) {
  (0, _inherits2.default)(LayerConfigSchemaDeleteV0, _Schema7);

  function LayerConfigSchemaDeleteV0() {
    var _getPrototypeOf8;

    var _this7;

    (0, _classCallCheck2.default)(this, LayerConfigSchemaDeleteV0);

    for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      args[_key7] = arguments[_key7];
    }

    _this7 = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf8 = (0, _getPrototypeOf13.default)(LayerConfigSchemaDeleteV0)).call.apply(_getPrototypeOf8, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this7)), "version", _versions.VERSIONS.v0);
    return _this7;
  }

  (0, _createClass2.default)(LayerConfigSchemaDeleteV0, [{
    key: "load",
    value: function load(value) {
      return {};
    }
  }]);
  return LayerConfigSchemaDeleteV0;
}(_schema.default);
/**
 * V0 -> V1 Changes
 * - layer is now a class
 * - config saved in a config object
 * - id, type, isAggregated is outside layer.config
 * - visualChannels is outside config, it defines available visual channel and
 *   property names for field, scale, domain and range of each visual chanel.
 * - enable3d, colorAggregation and sizeAggregation are moved into visConfig
 * - GeojsonLayer - added height, radius specific properties
 */


var layerPropsV0 = {
  id: null,
  type: null,
  // move into layer.config
  dataId: new LayerConfigSchemaV0({
    key: 'dataId'
  }),
  label: new LayerConfigSchemaV0({
    key: 'label'
  }),
  color: new LayerConfigSchemaV0({
    key: 'color'
  }),
  isVisible: new LayerConfigSchemaV0({
    key: 'isVisible'
  }),
  // convert visConfig
  visConfig: new LayerVisConfigSchemaV0({
    key: 'visConfig'
  }),
  // move into layer.config
  // flatten
  columns: new LayerColumnsSchemaV0(),
  // save into visualChannels
  colorField: new DimensionFieldSchemaV0({
    properties: dimensionPropsV0,
    key: 'colorField'
  }),
  colorScale: new DimensionScaleSchemaV0({
    key: 'colorScale'
  }),
  sizeField: new DimensionFieldSchemaV0({
    properties: dimensionPropsV0,
    key: 'sizeField'
  }),
  sizeScale: new DimensionScaleSchemaV0({
    key: 'sizeScale'
  }),
  // move into config.visConfig
  enable3d: new LayerConfigToVisConfigSchemaV0({
    key: 'enable3d'
  }),
  colorAggregation: new LayerConfigToVisConfigSchemaV0({
    key: 'colorAggregation'
  }),
  sizeAggregation: new LayerConfigToVisConfigSchemaV0({
    key: 'sizeAggregation'
  }),
  // delete
  isAggregated: new LayerConfigSchemaDeleteV0()
};
/**
 * V1 Schema
 */

exports.layerPropsV0 = layerPropsV0;

var ColumnSchemaV1 =
/*#__PURE__*/
function (_Schema8) {
  (0, _inherits2.default)(ColumnSchemaV1, _Schema8);

  function ColumnSchemaV1() {
    (0, _classCallCheck2.default)(this, ColumnSchemaV1);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf13.default)(ColumnSchemaV1).apply(this, arguments));
  }

  (0, _createClass2.default)(ColumnSchemaV1, [{
    key: "save",
    value: function save(columns, state) {
      // starting from v1, only save column value
      // fieldIdx will be calculated during merge
      return (0, _defineProperty2.default)({}, this.key, Object.keys(columns).reduce(function (accu, ckey) {
        return (0, _objectSpread11.default)({}, accu, (0, _defineProperty2.default)({}, ckey, columns[ckey].value));
      }, {}));
    }
  }, {
    key: "load",
    value: function load(columns) {
      return {
        columns: columns
      };
    }
  }]);
  return ColumnSchemaV1;
}(_schema.default);

var TextLabelSchemaV1 =
/*#__PURE__*/
function (_Schema9) {
  (0, _inherits2.default)(TextLabelSchemaV1, _Schema9);

  function TextLabelSchemaV1() {
    (0, _classCallCheck2.default)(this, TextLabelSchemaV1);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf13.default)(TextLabelSchemaV1).apply(this, arguments));
  }

  (0, _createClass2.default)(TextLabelSchemaV1, [{
    key: "save",
    value: function save(textLabel) {
      return (0, _defineProperty2.default)({}, this.key, (0, _objectSpread11.default)({}, textLabel, {
        field: textLabel.field ? (0, _lodash.default)(textLabel.field, ['name', 'type']) : null
      }));
    }
  }, {
    key: "load",
    value: function load(textLabel) {
      return {
        textLabel: textLabel
      };
    }
  }]);
  return TextLabelSchemaV1;
}(_schema.default);
/**
 * V1: save [field]: {name, type}, [scale]: '' for each channel
 */


var VisualChannelSchemaV1 =
/*#__PURE__*/
function (_Schema10) {
  (0, _inherits2.default)(VisualChannelSchemaV1, _Schema10);

  function VisualChannelSchemaV1() {
    (0, _classCallCheck2.default)(this, VisualChannelSchemaV1);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf13.default)(VisualChannelSchemaV1).apply(this, arguments));
  }

  (0, _createClass2.default)(VisualChannelSchemaV1, [{
    key: "save",
    value: function save(visualChannels, layer) {
      // only save field and scale of each channel
      return (0, _defineProperty2.default)({}, this.key, Object.keys(visualChannels).reduce( //  save channel to null if didn't select any field
      function (accu, key) {
        var _objectSpread8;

        return (0, _objectSpread11.default)({}, accu, (_objectSpread8 = {}, (0, _defineProperty2.default)(_objectSpread8, visualChannels[key].field, layer.config[visualChannels[key].field] ? (0, _lodash.default)(layer.config[visualChannels[key].field], ['name', 'type']) : null), (0, _defineProperty2.default)(_objectSpread8, visualChannels[key].scale, layer.config[visualChannels[key].scale]), _objectSpread8));
      }, {}));
    }
  }, {
    key: "load",
    value: function load(vc, layer, accumulator) {
      // fold channels into config
      return (0, _objectSpread11.default)({}, accumulator, {
        config: (0, _objectSpread11.default)({}, accumulator.config || {}, vc)
      });
    }
  }]);
  return VisualChannelSchemaV1;
}(_schema.default);

var layerPropsV1 = {
  id: null,
  type: null,
  config: new _schema.default({
    version: _versions.VERSIONS.v1,
    key: 'config',
    properties: {
      dataId: null,
      label: null,
      color: null,
      columns: new ColumnSchemaV1({
        version: _versions.VERSIONS.v1,
        key: 'columns'
      }),
      isVisible: null,
      visConfig: null,
      textLabel: new TextLabelSchemaV1({
        version: _versions.VERSIONS.v1,
        key: 'textLabel'
      })
    }
  }),
  visualChannels: new VisualChannelSchemaV1({
    version: _versions.VERSIONS.v1,
    key: 'visualChannels'
  })
};
exports.layerPropsV1 = layerPropsV1;

var LayerSchemaV0 =
/*#__PURE__*/
function (_Schema11) {
  (0, _inherits2.default)(LayerSchemaV0, _Schema11);

  function LayerSchemaV0() {
    var _getPrototypeOf9;

    var _this8;

    (0, _classCallCheck2.default)(this, LayerSchemaV0);

    for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      args[_key8] = arguments[_key8];
    }

    _this8 = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf9 = (0, _getPrototypeOf13.default)(LayerSchemaV0)).call.apply(_getPrototypeOf9, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this8)), "key", 'layers');
    return _this8;
  }

  (0, _createClass2.default)(LayerSchemaV0, [{
    key: "save",
    value: function save(layers, visState) {
      var _this9 = this;

      return (0, _defineProperty2.default)({}, this.key, visState.layerOrder.reduce(function (saved, index) {
        // save layers according to their rendering order
        var layer = layers[index];

        if (layer.isValidToSave()) {
          saved.push(_this9.savePropertiesOrApplySchema(layer).layers);
        }

        return saved;
      }, []));
    }
  }, {
    key: "load",
    value: function load(layers, visState) {
      var _this10 = this;

      return (0, _defineProperty2.default)({}, this.key, layers.map(function (layer) {
        return _this10.loadPropertiesOrApplySchema(layer, layers).layers;
      }));
    }
  }]);
  return LayerSchemaV0;
}(_schema.default);

var FilterSchemaV0 =
/*#__PURE__*/
function (_Schema12) {
  (0, _inherits2.default)(FilterSchemaV0, _Schema12);

  function FilterSchemaV0() {
    var _getPrototypeOf10;

    var _this11;

    (0, _classCallCheck2.default)(this, FilterSchemaV0);

    for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
      args[_key9] = arguments[_key9];
    }

    _this11 = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf10 = (0, _getPrototypeOf13.default)(FilterSchemaV0)).call.apply(_getPrototypeOf10, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this11)), "key", 'filters');
    return _this11;
  }

  (0, _createClass2.default)(FilterSchemaV0, [{
    key: "save",
    value: function save(filters) {
      var _this12 = this;

      return {
        filters: filters.filter(_filterUtils.isValidFilterValue).map(function (filter) {
          return _this12.savePropertiesOrApplySchema(filter, _this12.properties).filters;
        })
      };
    }
  }, {
    key: "load",
    value: function load(filters) {
      return {
        filters: filters
      };
    }
  }]);
  return FilterSchemaV0;
}(_schema.default);

var interactionPropsV0 = ['tooltip', 'brush'];

var InteractionSchemaV0 =
/*#__PURE__*/
function (_Schema13) {
  (0, _inherits2.default)(InteractionSchemaV0, _Schema13);

  function InteractionSchemaV0() {
    var _getPrototypeOf11;

    var _this13;

    (0, _classCallCheck2.default)(this, InteractionSchemaV0);

    for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
      args[_key10] = arguments[_key10];
    }

    _this13 = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf11 = (0, _getPrototypeOf13.default)(InteractionSchemaV0)).call.apply(_getPrototypeOf11, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this13)), "key", 'interactionConfig');
    return _this13;
  }

  (0, _createClass2.default)(InteractionSchemaV0, [{
    key: "save",
    value: function save(interactionConfig) {
      return (0, _defineProperty2.default)({}, this.key, this.properties.reduce(function (accu, key) {
        return (0, _objectSpread11.default)({}, accu, interactionConfig[key].enabled ? (0, _defineProperty2.default)({}, key, interactionConfig[key].config) : {});
      }, {}));
    }
  }, {
    key: "load",
    value: function load(interactionConfig) {
      // convert v0 -> v1
      // return enabled: false if disabled,
      return (0, _defineProperty2.default)({}, this.key, this.properties.reduce(function (accu, key) {
        return (0, _objectSpread11.default)({}, accu, (0, _defineProperty2.default)({}, key, (0, _objectSpread11.default)({}, interactionConfig[key] || {}, {
          enabled: Boolean(interactionConfig[key])
        })));
      }, {}));
    }
  }]);
  return InteractionSchemaV0;
}(_schema.default);

var InteractionSchemaV1 =
/*#__PURE__*/
function (_Schema14) {
  (0, _inherits2.default)(InteractionSchemaV1, _Schema14);

  function InteractionSchemaV1() {
    var _getPrototypeOf12;

    var _this14;

    (0, _classCallCheck2.default)(this, InteractionSchemaV1);

    for (var _len11 = arguments.length, args = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
      args[_key11] = arguments[_key11];
    }

    _this14 = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf12 = (0, _getPrototypeOf13.default)(InteractionSchemaV1)).call.apply(_getPrototypeOf12, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this14)), "key", 'interactionConfig');
    return _this14;
  }

  (0, _createClass2.default)(InteractionSchemaV1, [{
    key: "save",
    value: function save(interactionConfig) {
      // save config even if disabled,
      return (0, _defineProperty2.default)({}, this.key, this.properties.reduce(function (accu, key) {
        return (0, _objectSpread11.default)({}, accu, (0, _defineProperty2.default)({}, key, (0, _objectSpread11.default)({}, interactionConfig[key].config, {
          enabled: interactionConfig[key].enabled
        })));
      }, {}));
    }
  }, {
    key: "load",
    value: function load(interactionConfig) {
      return (0, _defineProperty2.default)({}, this.key, interactionConfig);
    }
  }]);
  return InteractionSchemaV1;
}(_schema.default);

var filterPropsV0 = {
  dataId: null,
  id: null,
  name: null,
  type: null,
  value: null,
  enlarged: null
};
exports.filterPropsV0 = filterPropsV0;

var DimensionFieldSchema =
/*#__PURE__*/
function (_Schema15) {
  (0, _inherits2.default)(DimensionFieldSchema, _Schema15);

  function DimensionFieldSchema() {
    (0, _classCallCheck2.default)(this, DimensionFieldSchema);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf13.default)(DimensionFieldSchema).apply(this, arguments));
  }

  (0, _createClass2.default)(DimensionFieldSchema, [{
    key: "save",
    value: function save(field) {
      return (0, _defineProperty2.default)({}, this.key, field ? this.savePropertiesOrApplySchema(field)[this.key] : null);
    }
  }, {
    key: "load",
    value: function load(field) {
      return (0, _defineProperty2.default)({}, this.key, field);
    }
  }]);
  return DimensionFieldSchema;
}(_schema.default);

exports.DimensionFieldSchema = DimensionFieldSchema;
var filterPropsV1 = (0, _objectSpread11.default)({}, filterPropsV0, {
  plotType: null,
  yAxis: new DimensionFieldSchema({
    version: _versions.VERSIONS.v1,
    key: 'yAxis',
    properties: {
      name: null,
      type: null
    }
  })
});
exports.filterPropsV1 = filterPropsV1;
var propertiesV0 = {
  filters: new FilterSchemaV0({
    version: _versions.VERSIONS.v0,
    properties: filterPropsV0
  }),
  layers: new LayerSchemaV0({
    version: _versions.VERSIONS.v0,
    properties: layerPropsV0
  }),
  interactionConfig: new InteractionSchemaV0({
    version: _versions.VERSIONS.v0,
    properties: interactionPropsV0
  }),
  layerBlending: null
};
exports.propertiesV0 = propertiesV0;
var propertiesV1 = {
  filters: new FilterSchemaV0({
    version: _versions.VERSIONS.v1,
    properties: filterPropsV1
  }),
  layers: new LayerSchemaV0({
    version: _versions.VERSIONS.v1,
    properties: layerPropsV1
  }),
  interactionConfig: new InteractionSchemaV1({
    version: _versions.VERSIONS.v1,
    properties: interactionPropsV0
  }),
  layerBlending: null,
  splitMaps: null
};
exports.propertiesV1 = propertiesV1;
var visStateSchemaV0 = new _schema.default({
  version: _versions.VERSIONS.v0,
  properties: propertiesV0,
  key: 'visState'
});
exports.visStateSchemaV0 = visStateSchemaV0;
var visStateSchemaV1 = new _schema.default({
  version: _versions.VERSIONS.v1,
  properties: propertiesV1,
  key: 'visState'
});
exports.visStateSchemaV1 = visStateSchemaV1;
var visStateSchema = (_visStateSchema = {}, (0, _defineProperty2.default)(_visStateSchema, _versions.VERSIONS.v0, {
  save: function save(toSave) {
    return visStateSchemaV0.save(toSave);
  },
  load: function load(toLoad) {
    return visStateSchemaV1.load(visStateSchemaV0.load(toLoad).visState);
  }
}), (0, _defineProperty2.default)(_visStateSchema, _versions.VERSIONS.v1, visStateSchemaV1), _visStateSchema); // test load v0

exports.visStateSchema = visStateSchema;
var _default = visStateSchema;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY2hlbWFzL3Zpcy1zdGF0ZS1zY2hlbWEuanMiXSwibmFtZXMiOlsiZGltZW5zaW9uUHJvcHNWMCIsImdlb2pzb25TaXplRmllbGRWMFRvVjEiLCJjb25maWciLCJkZWZhdWx0UmFpdWRzIiwiZGVmYXVsdFJhZGl1c1JhbmdlIiwidmlzQ29uZmlnIiwiZXh0cnVkZWQiLCJzdHJva2VkIiwicmFkaXVzIiwicmFkaXVzUmFuZ2UiLCJzb21lIiwiZCIsImkiLCJEaW1lbnNpb25GaWVsZFNjaGVtYVYwIiwiVkVSU0lPTlMiLCJ2MCIsImZpZWxkIiwia2V5Iiwic2F2ZVByb3BlcnRpZXNPckFwcGx5U2NoZW1hIiwiYWNjdW11bGF0ZWQiLCJmaWVsZE5hbWUiLCJ0eXBlIiwidmlzdWFsQ2hhbm5lbHMiLCJTY2hlbWEiLCJEaW1lbnNpb25TY2FsZVNjaGVtYVYwIiwic2NhbGUiLCJMYXllckNvbmZpZ1NjaGVtYVYwIiwic2F2ZWQiLCJsYXllciIsIkxheWVyQ29sdW1uc1NjaGVtYVYwIiwiY29sdW1ucyIsIk9iamVjdCIsImtleXMiLCJyZWR1Y2UiLCJhY2N1IiwidmFsdWUiLCJMYXllckNvbmZpZ1RvVmlzQ29uZmlnU2NoZW1hVjAiLCJhY2N1bXVsYXRlZENvbmZpZyIsIkxheWVyVmlzQ29uZmlnU2NoZW1hVjAiLCJhY2N1bXVsYXRvciIsInJlbmFtZSIsImdlb2pzb24iLCJlbGV2YXRpb25SYW5nZSIsInByb3BUb1JlbmFtZSIsIkxheWVyQ29uZmlnU2NoZW1hRGVsZXRlVjAiLCJsYXllclByb3BzVjAiLCJpZCIsImRhdGFJZCIsImxhYmVsIiwiY29sb3IiLCJpc1Zpc2libGUiLCJjb2xvckZpZWxkIiwicHJvcGVydGllcyIsImNvbG9yU2NhbGUiLCJzaXplRmllbGQiLCJzaXplU2NhbGUiLCJlbmFibGUzZCIsImNvbG9yQWdncmVnYXRpb24iLCJzaXplQWdncmVnYXRpb24iLCJpc0FnZ3JlZ2F0ZWQiLCJDb2x1bW5TY2hlbWFWMSIsInN0YXRlIiwiY2tleSIsIlRleHRMYWJlbFNjaGVtYVYxIiwidGV4dExhYmVsIiwiVmlzdWFsQ2hhbm5lbFNjaGVtYVYxIiwidmMiLCJsYXllclByb3BzVjEiLCJ2ZXJzaW9uIiwidjEiLCJMYXllclNjaGVtYVYwIiwibGF5ZXJzIiwidmlzU3RhdGUiLCJsYXllck9yZGVyIiwiaW5kZXgiLCJpc1ZhbGlkVG9TYXZlIiwicHVzaCIsIm1hcCIsImxvYWRQcm9wZXJ0aWVzT3JBcHBseVNjaGVtYSIsIkZpbHRlclNjaGVtYVYwIiwiZmlsdGVycyIsImZpbHRlciIsImlzVmFsaWRGaWx0ZXJWYWx1ZSIsImludGVyYWN0aW9uUHJvcHNWMCIsIkludGVyYWN0aW9uU2NoZW1hVjAiLCJpbnRlcmFjdGlvbkNvbmZpZyIsImVuYWJsZWQiLCJCb29sZWFuIiwiSW50ZXJhY3Rpb25TY2hlbWFWMSIsImZpbHRlclByb3BzVjAiLCJuYW1lIiwiZW5sYXJnZWQiLCJEaW1lbnNpb25GaWVsZFNjaGVtYSIsImZpbHRlclByb3BzVjEiLCJwbG90VHlwZSIsInlBeGlzIiwicHJvcGVydGllc1YwIiwibGF5ZXJCbGVuZGluZyIsInByb3BlcnRpZXNWMSIsInNwbGl0TWFwcyIsInZpc1N0YXRlU2NoZW1hVjAiLCJ2aXNTdGF0ZVNjaGVtYVYxIiwidmlzU3RhdGVTY2hlbWEiLCJzYXZlIiwidG9TYXZlIiwibG9hZCIsInRvTG9hZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUVBOzs7QUFJTyxJQUFNQSxnQkFBZ0IsR0FBRyxDQUFDLE1BQUQsRUFBUyxNQUFULENBQXpCLEMsQ0FFUDtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFDQSxTQUFTQyxzQkFBVCxDQUFnQ0MsTUFBaEMsRUFBd0M7QUFDdEMsTUFBTUMsYUFBYSxHQUFHLEVBQXRCO0FBQ0EsTUFBTUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFELEVBQUksRUFBSixDQUEzQixDQUZzQyxDQUl0Qzs7QUFD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RUFBQUEsYUFBYSxFQUFFLElBYlc7QUFjMUJFLEVBQUFBLFNBQVMsRUFBRTtBQWRlLENBQXJCOztBQWlCQSxJQUFNQyxnQkFBZ0IsR0FBRyxJQUFJN0UsZUFBSixDQUFXO0FBQ3pDNkMsRUFBQUEsT0FBTyxFQUFFdEQsbUJBQVNDLEVBRHVCO0FBRXpDcUMsRUFBQUEsVUFBVSxFQUFFNEMsWUFGNkI7QUFHekMvRSxFQUFBQSxHQUFHLEVBQUU7QUFIb0MsQ0FBWCxDQUF6Qjs7QUFNQSxJQUFNb0YsZ0JBQWdCLEdBQUcsSUFBSTlFLGVBQUosQ0FBVztBQUN6QzZDLEVBQUFBLE9BQU8sRUFBRXRELG1CQUFTdUQsRUFEdUI7QUFFekNqQixFQUFBQSxVQUFVLEVBQUU4QyxZQUY2QjtBQUd6Q2pGLEVBQUFBLEdBQUcsRUFBRTtBQUhvQyxDQUFYLENBQXpCOztBQU1BLElBQU1xRixjQUFjLHlFQUN4QnhGLG1CQUFTQyxFQURlLEVBQ1Y7QUFDYndGLEVBQUFBLElBQUksRUFBRSxjQUFBQyxNQUFNO0FBQUEsV0FBSUosZ0JBQWdCLENBQUNHLElBQWpCLENBQXNCQyxNQUF0QixDQUFKO0FBQUEsR0FEQztBQUViQyxFQUFBQSxJQUFJLEVBQUUsY0FBQUMsTUFBTTtBQUFBLFdBQ1ZMLGdCQUFnQixDQUFDSSxJQUFqQixDQUFzQkwsZ0JBQWdCLENBQUNLLElBQWpCLENBQXNCQyxNQUF0QixFQUE4QmxDLFFBQXBELENBRFU7QUFBQTtBQUZDLENBRFUsa0RBTXhCMUQsbUJBQVN1RCxFQU5lLEVBTVZnQyxnQkFOVSxtQkFBcEIsQyxDQVNQOzs7ZUFDZUMsYyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBwaWNrIGZyb20gJ2xvZGFzaC5waWNrJztcbmltcG9ydCB7VkVSU0lPTlN9IGZyb20gJy4vdmVyc2lvbnMnO1xuaW1wb3J0IHtpc1ZhbGlkRmlsdGVyVmFsdWV9IGZyb20gJ3V0aWxzL2ZpbHRlci11dGlscyc7XG5cbmltcG9ydCBTY2hlbWEgZnJvbSAnLi9zY2hlbWEnO1xuXG4vKipcbiAqIFYwIFNjaGVtYVxuICovXG5cbmV4cG9ydCBjb25zdCBkaW1lbnNpb25Qcm9wc1YwID0gWyduYW1lJywgJ3R5cGUnXTtcblxuLy8gaW4gdjAgZ2VvanNvbiB0aGVyZSBpcyBvbmx5IHNpemVGaWVsZFxuXG4vLyBpbiB2MSBnZW9qc29uXG4vLyBzdHJva2UgYmFzZSBvbiAtPiBzaXplRmllbGRcbi8vIGhlaWdodCBiYXNlZCBvbiAtPiBoZWlnaHRGaWVsZFxuLy8gcmFkaXVzIGJhc2VkIG9uIC0+IHJhZGl1c0ZpZWxkXG4vLyBoZXJlIHdlIG1ha2Ugb3VyIHdpcmVkc3QgZ3Vlc3Mgb24gd2hpY2ggY2hhbm5lbCBzaXplRmllbGQgYmVsb25ncyB0b1xuZnVuY3Rpb24gZ2VvanNvblNpemVGaWVsZFYwVG9WMShjb25maWcpIHtcbiAgY29uc3QgZGVmYXVsdFJhaXVkcyA9IDEwO1xuICBjb25zdCBkZWZhdWx0UmFkaXVzUmFuZ2UgPSBbMCwgNTBdO1xuXG4gIC8vIGlmIGV4dHJ1ZGVkLCBzaXplRmllbGQgaXMgbW9zdCBsaWtlbHkgdXNlZCBmb3IgaGVpZ2h0XG4gIGlmIChjb25maWcudmlzQ29uZmlnLmV4dHJ1ZGVkKSB7XG4gICAgcmV0dXJuICdoZWlnaHRGaWVsZCc7XG4gIH1cblxuICAvLyBpZiBzaG93IHN0cm9rZSBlbmFibGVkLCBzaXplRmllbGQgaXMgbW9zdCBsaWtlbHkgdXNlZCBmb3Igc3Ryb2tlXG4gIGlmIChjb25maWcudmlzQ29uZmlnLnN0cm9rZWQpIHtcbiAgICByZXR1cm4gJ3NpemVGaWVsZCc7XG4gIH1cblxuICAvLyBpZiByYWRpdXMgY2hhbmdlZCwgb3IgcmFkaXVzIFJhbmdlIENoYW5nZWQsIHNpemVGaWVsZCBpcyBtb3N0IGxpa2VseSB1c2VkIGZvciByYWRpdXNcbiAgLy8gdGhpcyBpcyB0aGUgbW9zdCB1bnJlbGlhYmxlIGd1ZXNzLCB0aGF0J3Mgd2h5IHdlIHB1dCBpdCBpbiB0aGUgZW5kXG4gIGlmIChcbiAgICBjb25maWcudmlzQ29uZmlnLnJhZGl1cyAhPT0gZGVmYXVsdFJhaXVkcyB8fFxuICAgIGNvbmZpZy52aXNDb25maWcucmFkaXVzUmFuZ2Uuc29tZSgoZCwgaSkgPT4gZCAhPT0gZGVmYXVsdFJhZGl1c1JhbmdlW2ldKVxuICApIHtcbiAgICByZXR1cm4gJ3JhZGl1c0ZpZWxkJztcbiAgfVxuXG4gIHJldHVybiAnc2l6ZUZpZWxkJztcbn1cblxuLy8gY29udmVydCB2MCB0byB2MSBsYXllciBjb25maWdcbmNsYXNzIERpbWVuc2lvbkZpZWxkU2NoZW1hVjAgZXh0ZW5kcyBTY2hlbWEge1xuICB2ZXJzaW9uID0gVkVSU0lPTlMudjA7XG4gIHNhdmUoZmllbGQsIGNvbmZpZykge1xuICAgIC8vIHNob3VsZCBub3QgYmUgY2FsbGVkIGFueW1vcmVcbiAgICByZXR1cm4ge1xuICAgICAgW3RoaXMua2V5XTpcbiAgICAgICAgZmllbGQgIT09IG51bGxcbiAgICAgICAgICA/IHRoaXMuc2F2ZVByb3BlcnRpZXNPckFwcGx5U2NoZW1hKGZpZWxkKVt0aGlzLmtleV1cbiAgICAgICAgICA6IG51bGxcbiAgICB9O1xuICB9XG5cbiAgbG9hZChmaWVsZCwgY29uZmlnLCBhY2N1bXVsYXRlZCkge1xuICAgIGxldCBmaWVsZE5hbWUgPSB0aGlzLmtleTtcbiAgICBpZiAoY29uZmlnLnR5cGUgPT09ICdnZW9qc29uJyAmJiB0aGlzLmtleSA9PT0gJ3NpemVGaWVsZCcgJiYgZmllbGQpIHtcbiAgICAgIGZpZWxkTmFtZSA9IGdlb2pzb25TaXplRmllbGRWMFRvVjEoY29uZmlnKTtcbiAgICB9XG4gICAgLy8gZm9sZCBpbnRvIHZpc3VhbENoYW5uZWxzIHRvIGJlIGxvYWQgYnkgVmlzdWFsQ2hhbm5lbFNjaGVtYVYxXG4gICAgcmV0dXJuIHtcbiAgICAgIHZpc3VhbENoYW5uZWxzOiB7XG4gICAgICAgIC4uLihhY2N1bXVsYXRlZC52aXN1YWxDaGFubmVscyB8fCB7fSksXG4gICAgICAgIFtmaWVsZE5hbWVdOiBmaWVsZFxuICAgICAgfVxuICAgIH07XG4gIH1cbn1cblxuY2xhc3MgRGltZW5zaW9uU2NhbGVTY2hlbWFWMCBleHRlbmRzIFNjaGVtYSB7XG4gIHZlcnNpb24gPSBWRVJTSU9OUy52MDtcbiAgc2F2ZShzY2FsZSkge1xuICAgIHJldHVybiB7W3RoaXMua2V5XTogc2NhbGV9O1xuICB9XG4gIGxvYWQoc2NhbGUsIGNvbmZpZywgYWNjdW11bGF0ZWQpIHtcbiAgICAvLyBmb2xkIGludG8gdmlzdWFsQ2hhbm5lbHMgdG8gYmUgbG9hZCBieSBWaXN1YWxDaGFubmVsU2NoZW1hVjFcbiAgICBpZiAodGhpcy5rZXkgPT09ICdzaXplU2NhbGUnICYmIGNvbmZpZy50eXBlID09PSAnZ2VvanNvbicpIHtcbiAgICAgIC8vIHNpemVTY2FsZSBub3cgc3BsaXQgaW50byByYWRpdXNTY2FsZSwgaGVpZ2h0U2NhbGVcbiAgICAgIC8vIG5vIHVzZXIgY3VzdG9taXphdGlvbiwganVzdCB1c2UgZGVmYXVsdFxuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB2aXN1YWxDaGFubmVsczoge1xuICAgICAgICAuLi4oYWNjdW11bGF0ZWQudmlzdWFsQ2hhbm5lbHMgfHwge30pLFxuICAgICAgICBbdGhpcy5rZXldOiBzY2FsZVxuICAgICAgfVxuICAgIH07XG4gIH1cbn1cblxuLy8gdXNlZCB0byBjb252ZXJ0IHYwIHRvIHYxIGxheWVyIGNvbmZpZ1xuY2xhc3MgTGF5ZXJDb25maWdTY2hlbWFWMCBleHRlbmRzIFNjaGVtYSB7XG4gIHZlcnNpb24gPSBWRVJTSU9OUy52MDtcbiAgbG9hZChzYXZlZCwgbGF5ZXIsIGFjY3VtdWxhdGVkKSB7XG4gICAgLy8gZm9sZCB2MCBsYXllciBwcm9wZXJ0eSBpbnRvIGNvbmZpZy5rZXlcbiAgICByZXR1cm4ge1xuICAgICAgY29uZmlnOiB7XG4gICAgICAgIC4uLihhY2N1bXVsYXRlZC5jb25maWcgfHwge30pLFxuICAgICAgICBbdGhpcy5rZXldOiBzYXZlZFxuICAgICAgfVxuICAgIH07XG4gIH1cbn1cblxuLy8gdXNlZCB0byBjb252ZXJ0IHYwIHRvIHYxIGxheWVyIGNvbHVtbnNcbi8vIG9ubHkgcmV0dXJuIGNvbHVtbiB2YWx1ZSBmb3IgZWFjaCBjb2x1bW5cbmNsYXNzIExheWVyQ29sdW1uc1NjaGVtYVYwIGV4dGVuZHMgU2NoZW1hIHtcbiAgdmVyc2lvbiA9IFZFUlNJT05TLnYwO1xuICBsb2FkKHNhdmVkLCBsYXllciwgYWNjdW11bGF0ZWQpIHtcbiAgICAvLyBmb2xkIHYwIGxheWVyIHByb3BlcnR5IGludG8gY29uZmlnLmtleSwgZmxhdHRlbiBjb2x1bW5zXG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbmZpZzoge1xuICAgICAgICAuLi4oYWNjdW11bGF0ZWQuY29uZmlnIHx8IHt9KSxcbiAgICAgICAgY29sdW1uczogT2JqZWN0LmtleXMoc2F2ZWQpLnJlZHVjZShcbiAgICAgICAgICAoYWNjdSwga2V5KSA9PiAoe1xuICAgICAgICAgICAgLi4uYWNjdSxcbiAgICAgICAgICAgIFtrZXldOiBzYXZlZFtrZXldLnZhbHVlXG4gICAgICAgICAgfSksXG4gICAgICAgICAge31cbiAgICAgICAgKVxuICAgICAgfVxuICAgIH07XG4gIH1cbn1cblxuLy8gdXNlZCB0byBjb252ZXJ0IHYwIHRvIHYxIGxheWVyIGNvbmZpZy52aXNDb25maWdcbmNsYXNzIExheWVyQ29uZmlnVG9WaXNDb25maWdTY2hlbWFWMCBleHRlbmRzIFNjaGVtYSB7XG4gIHZlcnNpb24gPSBWRVJTSU9OUy52MDtcbiAgbG9hZChzYXZlZCwgbGF5ZXIsIGFjY3VtdWxhdGVkKSB7XG4gICAgLy8gZm9sZCB2MCBsYXllciBwcm9wZXJ0eSBpbnRvIGNvbmZpZy52aXNDb25maWdcbiAgICBjb25zdCBhY2N1bXVsYXRlZENvbmZpZyA9IGFjY3VtdWxhdGVkLmNvbmZpZyB8fCB7fTtcbiAgICByZXR1cm4ge1xuICAgICAgY29uZmlnOiB7XG4gICAgICAgIC4uLmFjY3VtdWxhdGVkQ29uZmlnLFxuICAgICAgICB2aXNDb25maWc6IHtcbiAgICAgICAgICAuLi4oYWNjdW11bGF0ZWRDb25maWcudmlzQ29uZmlnIHx8IHt9KSxcbiAgICAgICAgICBbdGhpcy5rZXldOiBzYXZlZFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuXG5jbGFzcyBMYXllclZpc0NvbmZpZ1NjaGVtYVYwIGV4dGVuZHMgU2NoZW1hIHtcbiAgdmVyc2lvbiA9IFZFUlNJT05TLnYwO1xuICBrZXkgPSAndmlzQ29uZmlnJztcblxuICBsb2FkKHZpc0NvbmZpZywgY29uZmlnLCBhY2N1bXVsYXRvcikge1xuICAgIGNvbnN0IHJlbmFtZSA9IHtcbiAgICAgIGdlb2pzb246IHtcbiAgICAgICAgZXh0cnVkZWQ6ICdlbmFibGUzZCcsXG4gICAgICAgIGVsZXZhdGlvblJhbmdlOiAnaGVpZ2h0UmFuZ2UnXG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChjb25maWcudHlwZSBpbiByZW5hbWUpIHtcbiAgICAgIGNvbnN0IHByb3BUb1JlbmFtZSA9IHJlbmFtZVtjb25maWcudHlwZV07XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAuLi4oYWNjdW11bGF0b3IuY29uZmlnIHx8IHt9KSxcbiAgICAgICAgICB2aXNDb25maWc6IE9iamVjdC5rZXlzKHZpc0NvbmZpZykucmVkdWNlKFxuICAgICAgICAgICAgKGFjY3UsIGtleSkgPT4gKHtcbiAgICAgICAgICAgICAgLi4uYWNjdSxcbiAgICAgICAgICAgICAgLi4uKHByb3BUb1JlbmFtZVtrZXldXG4gICAgICAgICAgICAgICAgPyB7W3Byb3BUb1JlbmFtZVtrZXldXTogdmlzQ29uZmlnW2tleV19XG4gICAgICAgICAgICAgICAgOiB7W2tleV06IHZpc0NvbmZpZ1trZXldfSlcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAge31cbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbmZpZzoge1xuICAgICAgICAuLi4oYWNjdW11bGF0b3IuY29uZmlnIHx8IHt9KSxcbiAgICAgICAgdmlzQ29uZmlnXG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuXG5jbGFzcyBMYXllckNvbmZpZ1NjaGVtYURlbGV0ZVYwIGV4dGVuZHMgU2NoZW1hIHtcbiAgdmVyc2lvbiA9IFZFUlNJT05TLnYwO1xuICBsb2FkKHZhbHVlKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG59XG5cbi8qKlxuICogVjAgLT4gVjEgQ2hhbmdlc1xuICogLSBsYXllciBpcyBub3cgYSBjbGFzc1xuICogLSBjb25maWcgc2F2ZWQgaW4gYSBjb25maWcgb2JqZWN0XG4gKiAtIGlkLCB0eXBlLCBpc0FnZ3JlZ2F0ZWQgaXMgb3V0c2lkZSBsYXllci5jb25maWdcbiAqIC0gdmlzdWFsQ2hhbm5lbHMgaXMgb3V0c2lkZSBjb25maWcsIGl0IGRlZmluZXMgYXZhaWxhYmxlIHZpc3VhbCBjaGFubmVsIGFuZFxuICogICBwcm9wZXJ0eSBuYW1lcyBmb3IgZmllbGQsIHNjYWxlLCBkb21haW4gYW5kIHJhbmdlIG9mIGVhY2ggdmlzdWFsIGNoYW5lbC5cbiAqIC0gZW5hYmxlM2QsIGNvbG9yQWdncmVnYXRpb24gYW5kIHNpemVBZ2dyZWdhdGlvbiBhcmUgbW92ZWQgaW50byB2aXNDb25maWdcbiAqIC0gR2VvanNvbkxheWVyIC0gYWRkZWQgaGVpZ2h0LCByYWRpdXMgc3BlY2lmaWMgcHJvcGVydGllc1xuICovXG5cbmV4cG9ydCBjb25zdCBsYXllclByb3BzVjAgPSB7XG4gIGlkOiBudWxsLFxuICB0eXBlOiBudWxsLFxuXG4gIC8vIG1vdmUgaW50byBsYXllci5jb25maWdcbiAgZGF0YUlkOiBuZXcgTGF5ZXJDb25maWdTY2hlbWFWMCh7a2V5OiAnZGF0YUlkJ30pLFxuICBsYWJlbDogbmV3IExheWVyQ29uZmlnU2NoZW1hVjAoe2tleTogJ2xhYmVsJ30pLFxuICBjb2xvcjogbmV3IExheWVyQ29uZmlnU2NoZW1hVjAoe2tleTogJ2NvbG9yJ30pLFxuICBpc1Zpc2libGU6IG5ldyBMYXllckNvbmZpZ1NjaGVtYVYwKHtrZXk6ICdpc1Zpc2libGUnfSksXG5cbiAgLy8gY29udmVydCB2aXNDb25maWdcbiAgdmlzQ29uZmlnOiBuZXcgTGF5ZXJWaXNDb25maWdTY2hlbWFWMCh7a2V5OiAndmlzQ29uZmlnJ30pLFxuXG4gIC8vIG1vdmUgaW50byBsYXllci5jb25maWdcbiAgLy8gZmxhdHRlblxuICBjb2x1bW5zOiBuZXcgTGF5ZXJDb2x1bW5zU2NoZW1hVjAoKSxcblxuICAvLyBzYXZlIGludG8gdmlzdWFsQ2hhbm5lbHNcbiAgY29sb3JGaWVsZDogbmV3IERpbWVuc2lvbkZpZWxkU2NoZW1hVjAoe1xuICAgIHByb3BlcnRpZXM6IGRpbWVuc2lvblByb3BzVjAsXG4gICAga2V5OiAnY29sb3JGaWVsZCdcbiAgfSksXG4gIGNvbG9yU2NhbGU6IG5ldyBEaW1lbnNpb25TY2FsZVNjaGVtYVYwKHtcbiAgICBrZXk6ICdjb2xvclNjYWxlJ1xuICB9KSxcbiAgc2l6ZUZpZWxkOiBuZXcgRGltZW5zaW9uRmllbGRTY2hlbWFWMCh7XG4gICAgcHJvcGVydGllczogZGltZW5zaW9uUHJvcHNWMCxcbiAgICBrZXk6ICdzaXplRmllbGQnXG4gIH0pLFxuICBzaXplU2NhbGU6IG5ldyBEaW1lbnNpb25TY2FsZVNjaGVtYVYwKHtcbiAgICBrZXk6ICdzaXplU2NhbGUnXG4gIH0pLFxuXG4gIC8vIG1vdmUgaW50byBjb25maWcudmlzQ29uZmlnXG4gIGVuYWJsZTNkOiBuZXcgTGF5ZXJDb25maWdUb1Zpc0NvbmZpZ1NjaGVtYVYwKHtrZXk6ICdlbmFibGUzZCd9KSxcbiAgY29sb3JBZ2dyZWdhdGlvbjogbmV3IExheWVyQ29uZmlnVG9WaXNDb25maWdTY2hlbWFWMCh7XG4gICAga2V5OiAnY29sb3JBZ2dyZWdhdGlvbidcbiAgfSksXG4gIHNpemVBZ2dyZWdhdGlvbjogbmV3IExheWVyQ29uZmlnVG9WaXNDb25maWdTY2hlbWFWMCh7a2V5OiAnc2l6ZUFnZ3JlZ2F0aW9uJ30pLFxuXG4gIC8vIGRlbGV0ZVxuICBpc0FnZ3JlZ2F0ZWQ6IG5ldyBMYXllckNvbmZpZ1NjaGVtYURlbGV0ZVYwKClcbn07XG5cbi8qKlxuICogVjEgU2NoZW1hXG4gKi9cbmNsYXNzIENvbHVtblNjaGVtYVYxIGV4dGVuZHMgU2NoZW1hIHtcbiAgc2F2ZShjb2x1bW5zLCBzdGF0ZSkge1xuICAgIC8vIHN0YXJ0aW5nIGZyb20gdjEsIG9ubHkgc2F2ZSBjb2x1bW4gdmFsdWVcbiAgICAvLyBmaWVsZElkeCB3aWxsIGJlIGNhbGN1bGF0ZWQgZHVyaW5nIG1lcmdlXG4gICAgcmV0dXJuIHtcbiAgICAgIFt0aGlzLmtleV06IE9iamVjdC5rZXlzKGNvbHVtbnMpLnJlZHVjZShcbiAgICAgICAgKGFjY3UsIGNrZXkpID0+ICh7XG4gICAgICAgICAgLi4uYWNjdSxcbiAgICAgICAgICBbY2tleV06IGNvbHVtbnNbY2tleV0udmFsdWVcbiAgICAgICAgfSksXG4gICAgICAgIHt9XG4gICAgICApXG4gICAgfTtcbiAgfVxuXG4gIGxvYWQoY29sdW1ucykge1xuICAgIHJldHVybiB7Y29sdW1uc307XG4gIH1cbn1cblxuY2xhc3MgVGV4dExhYmVsU2NoZW1hVjEgZXh0ZW5kcyBTY2hlbWEge1xuICBzYXZlKHRleHRMYWJlbCkge1xuICAgIHJldHVybiB7XG4gICAgICBbdGhpcy5rZXldOiB7XG4gICAgICAgIC4uLnRleHRMYWJlbCxcbiAgICAgICAgZmllbGQ6IHRleHRMYWJlbC5maWVsZCA/IHBpY2sodGV4dExhYmVsLmZpZWxkLCBbJ25hbWUnLCAndHlwZSddKSA6IG51bGxcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBsb2FkKHRleHRMYWJlbCkge1xuICAgIHJldHVybiB7dGV4dExhYmVsfTtcbiAgfVxufVxuXG4vKipcbiAqIFYxOiBzYXZlIFtmaWVsZF06IHtuYW1lLCB0eXBlfSwgW3NjYWxlXTogJycgZm9yIGVhY2ggY2hhbm5lbFxuICovXG5jbGFzcyBWaXN1YWxDaGFubmVsU2NoZW1hVjEgZXh0ZW5kcyBTY2hlbWEge1xuICBzYXZlKHZpc3VhbENoYW5uZWxzLCBsYXllcikge1xuICAgIC8vIG9ubHkgc2F2ZSBmaWVsZCBhbmQgc2NhbGUgb2YgZWFjaCBjaGFubmVsXG4gICAgcmV0dXJuIHtcbiAgICAgIFt0aGlzLmtleV06IE9iamVjdC5rZXlzKHZpc3VhbENoYW5uZWxzKS5yZWR1Y2UoXG4gICAgICAgIC8vICBzYXZlIGNoYW5uZWwgdG8gbnVsbCBpZiBkaWRuJ3Qgc2VsZWN0IGFueSBmaWVsZFxuICAgICAgICAoYWNjdSwga2V5KSA9PiAoe1xuICAgICAgICAgIC4uLmFjY3UsXG4gICAgICAgICAgW3Zpc3VhbENoYW5uZWxzW2tleV0uZmllbGRdOiBsYXllci5jb25maWdbdmlzdWFsQ2hhbm5lbHNba2V5XS5maWVsZF1cbiAgICAgICAgICAgID8gcGljayhsYXllci5jb25maWdbdmlzdWFsQ2hhbm5lbHNba2V5XS5maWVsZF0sIFsnbmFtZScsICd0eXBlJ10pXG4gICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgW3Zpc3VhbENoYW5uZWxzW2tleV0uc2NhbGVdOiBsYXllci5jb25maWdbdmlzdWFsQ2hhbm5lbHNba2V5XS5zY2FsZV1cbiAgICAgICAgfSksXG4gICAgICAgIHt9XG4gICAgICApXG4gICAgfTtcbiAgfVxuICBsb2FkKHZjLCBsYXllciwgYWNjdW11bGF0b3IpIHtcbiAgICAvLyBmb2xkIGNoYW5uZWxzIGludG8gY29uZmlnXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmFjY3VtdWxhdG9yLFxuICAgICAgY29uZmlnOiB7XG4gICAgICAgIC4uLihhY2N1bXVsYXRvci5jb25maWcgfHwge30pLFxuICAgICAgICAuLi52Y1xuICAgICAgfVxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGxheWVyUHJvcHNWMSA9IHtcbiAgaWQ6IG51bGwsXG4gIHR5cGU6IG51bGwsXG4gIGNvbmZpZzogbmV3IFNjaGVtYSh7XG4gICAgdmVyc2lvbjogVkVSU0lPTlMudjEsXG4gICAga2V5OiAnY29uZmlnJyxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBkYXRhSWQ6IG51bGwsXG4gICAgICBsYWJlbDogbnVsbCxcbiAgICAgIGNvbG9yOiBudWxsLFxuICAgICAgY29sdW1uczogbmV3IENvbHVtblNjaGVtYVYxKHtcbiAgICAgICAgdmVyc2lvbjogVkVSU0lPTlMudjEsXG4gICAgICAgIGtleTogJ2NvbHVtbnMnXG4gICAgICB9KSxcbiAgICAgIGlzVmlzaWJsZTogbnVsbCxcbiAgICAgIHZpc0NvbmZpZzogbnVsbCxcbiAgICAgIHRleHRMYWJlbDogbmV3IFRleHRMYWJlbFNjaGVtYVYxKHtcbiAgICAgICAgdmVyc2lvbjogVkVSU0lPTlMudjEsXG4gICAgICAgIGtleTogJ3RleHRMYWJlbCdcbiAgICAgIH0pXG4gICAgfVxuICB9KSxcbiAgdmlzdWFsQ2hhbm5lbHM6IG5ldyBWaXN1YWxDaGFubmVsU2NoZW1hVjEoe1xuICAgIHZlcnNpb246IFZFUlNJT05TLnYxLFxuICAgIGtleTogJ3Zpc3VhbENoYW5uZWxzJ1xuICB9KVxufTtcblxuY2xhc3MgTGF5ZXJTY2hlbWFWMCBleHRlbmRzIFNjaGVtYSB7XG4gIGtleSA9ICdsYXllcnMnO1xuXG4gIHNhdmUobGF5ZXJzLCB2aXNTdGF0ZSkge1xuICAgIHJldHVybiB7XG4gICAgICBbdGhpcy5rZXldOiB2aXNTdGF0ZS5sYXllck9yZGVyLnJlZHVjZSgoc2F2ZWQsIGluZGV4KSA9PiB7XG4gICAgICAgIC8vIHNhdmUgbGF5ZXJzIGFjY29yZGluZyB0byB0aGVpciByZW5kZXJpbmcgb3JkZXJcbiAgICAgICAgY29uc3QgbGF5ZXIgPSBsYXllcnNbaW5kZXhdO1xuICAgICAgICBpZiAobGF5ZXIuaXNWYWxpZFRvU2F2ZSgpKSB7XG4gICAgICAgICAgc2F2ZWQucHVzaCh0aGlzLnNhdmVQcm9wZXJ0aWVzT3JBcHBseVNjaGVtYShsYXllcikubGF5ZXJzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2F2ZWQ7XG4gICAgICB9LCBbXSlcbiAgICB9O1xuICB9XG5cbiAgbG9hZChsYXllcnMsIHZpc1N0YXRlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIFt0aGlzLmtleV06IGxheWVycy5tYXAoXG4gICAgICAgIGxheWVyID0+IHRoaXMubG9hZFByb3BlcnRpZXNPckFwcGx5U2NoZW1hKGxheWVyLCBsYXllcnMpLmxheWVyc1xuICAgICAgKVxuICAgIH07XG4gIH1cbn1cblxuY2xhc3MgRmlsdGVyU2NoZW1hVjAgZXh0ZW5kcyBTY2hlbWEge1xuICBrZXkgPSAnZmlsdGVycyc7XG4gIHNhdmUoZmlsdGVycykge1xuICAgIHJldHVybiB7XG4gICAgICBmaWx0ZXJzOiBmaWx0ZXJzXG4gICAgICAgIC5maWx0ZXIoaXNWYWxpZEZpbHRlclZhbHVlKVxuICAgICAgICAubWFwKFxuICAgICAgICAgIGZpbHRlciA9PlxuICAgICAgICAgICAgdGhpcy5zYXZlUHJvcGVydGllc09yQXBwbHlTY2hlbWEoZmlsdGVyLCB0aGlzLnByb3BlcnRpZXMpLmZpbHRlcnNcbiAgICAgICAgKVxuICAgIH07XG4gIH1cbiAgbG9hZChmaWx0ZXJzKSB7XG4gICAgcmV0dXJuIHtmaWx0ZXJzfTtcbiAgfVxufVxuXG5jb25zdCBpbnRlcmFjdGlvblByb3BzVjAgPSBbJ3Rvb2x0aXAnLCAnYnJ1c2gnXTtcblxuY2xhc3MgSW50ZXJhY3Rpb25TY2hlbWFWMCBleHRlbmRzIFNjaGVtYSB7XG4gIGtleSA9ICdpbnRlcmFjdGlvbkNvbmZpZyc7XG5cbiAgc2F2ZShpbnRlcmFjdGlvbkNvbmZpZykge1xuICAgIHJldHVybiB7XG4gICAgICBbdGhpcy5rZXldOiB0aGlzLnByb3BlcnRpZXMucmVkdWNlKFxuICAgICAgICAoYWNjdSwga2V5KSA9PiAoe1xuICAgICAgICAgIC4uLmFjY3UsXG4gICAgICAgICAgLi4uKGludGVyYWN0aW9uQ29uZmlnW2tleV0uZW5hYmxlZFxuICAgICAgICAgICAgPyB7W2tleV06IGludGVyYWN0aW9uQ29uZmlnW2tleV0uY29uZmlnfVxuICAgICAgICAgICAgOiB7fSlcbiAgICAgICAgfSksXG4gICAgICAgIHt9XG4gICAgICApXG4gICAgfTtcbiAgfVxuICBsb2FkKGludGVyYWN0aW9uQ29uZmlnKSB7XG4gICAgLy8gY29udmVydCB2MCAtPiB2MVxuICAgIC8vIHJldHVybiBlbmFibGVkOiBmYWxzZSBpZiBkaXNhYmxlZCxcbiAgICByZXR1cm4ge1xuICAgICAgW3RoaXMua2V5XTogdGhpcy5wcm9wZXJ0aWVzLnJlZHVjZShcbiAgICAgICAgKGFjY3UsIGtleSkgPT4gKHtcbiAgICAgICAgICAuLi5hY2N1LFxuICAgICAgICAgIC4uLntcbiAgICAgICAgICAgIFtrZXldOiB7XG4gICAgICAgICAgICAgIC4uLihpbnRlcmFjdGlvbkNvbmZpZ1trZXldIHx8IHt9KSxcbiAgICAgICAgICAgICAgZW5hYmxlZDogQm9vbGVhbihpbnRlcmFjdGlvbkNvbmZpZ1trZXldKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIHt9XG4gICAgICApXG4gICAgfTtcbiAgfVxufVxuXG5jbGFzcyBJbnRlcmFjdGlvblNjaGVtYVYxIGV4dGVuZHMgU2NoZW1hIHtcbiAga2V5ID0gJ2ludGVyYWN0aW9uQ29uZmlnJztcblxuICBzYXZlKGludGVyYWN0aW9uQ29uZmlnKSB7XG4gICAgLy8gc2F2ZSBjb25maWcgZXZlbiBpZiBkaXNhYmxlZCxcbiAgICByZXR1cm4ge1xuICAgICAgW3RoaXMua2V5XTogdGhpcy5wcm9wZXJ0aWVzLnJlZHVjZShcbiAgICAgICAgKGFjY3UsIGtleSkgPT4gKHtcbiAgICAgICAgICAuLi5hY2N1LFxuICAgICAgICAgIFtrZXldOiB7XG4gICAgICAgICAgICAuLi5pbnRlcmFjdGlvbkNvbmZpZ1trZXldLmNvbmZpZyxcbiAgICAgICAgICAgIGVuYWJsZWQ6IGludGVyYWN0aW9uQ29uZmlnW2tleV0uZW5hYmxlZFxuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIHt9XG4gICAgICApXG4gICAgfTtcbiAgfVxuICBsb2FkKGludGVyYWN0aW9uQ29uZmlnKSB7XG4gICAgcmV0dXJuIHtbdGhpcy5rZXldOiBpbnRlcmFjdGlvbkNvbmZpZ307XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGZpbHRlclByb3BzVjAgPSB7XG4gIGRhdGFJZDogbnVsbCxcbiAgaWQ6IG51bGwsXG4gIG5hbWU6IG51bGwsXG4gIHR5cGU6IG51bGwsXG4gIHZhbHVlOiBudWxsLFxuICBlbmxhcmdlZDogbnVsbFxufTtcblxuZXhwb3J0IGNsYXNzIERpbWVuc2lvbkZpZWxkU2NoZW1hIGV4dGVuZHMgU2NoZW1hIHtcbiAgc2F2ZShmaWVsZCkge1xuICAgIHJldHVybiB7XG4gICAgICBbdGhpcy5rZXldOiBmaWVsZFxuICAgICAgICA/IHRoaXMuc2F2ZVByb3BlcnRpZXNPckFwcGx5U2NoZW1hKGZpZWxkKVt0aGlzLmtleV1cbiAgICAgICAgOiBudWxsXG4gICAgfTtcbiAgfVxuXG4gIGxvYWQoZmllbGQpIHtcbiAgICByZXR1cm4ge1t0aGlzLmtleV06IGZpZWxkfTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZmlsdGVyUHJvcHNWMSA9IHtcbiAgLi4uZmlsdGVyUHJvcHNWMCxcbiAgcGxvdFR5cGU6IG51bGwsXG4gIHlBeGlzOiBuZXcgRGltZW5zaW9uRmllbGRTY2hlbWEoe1xuICAgIHZlcnNpb246IFZFUlNJT05TLnYxLFxuICAgIGtleTogJ3lBeGlzJyxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBuYW1lOiBudWxsLFxuICAgICAgdHlwZTogbnVsbFxuICAgIH1cbiAgfSlcbn07XG5cbmV4cG9ydCBjb25zdCBwcm9wZXJ0aWVzVjAgPSB7XG4gIGZpbHRlcnM6IG5ldyBGaWx0ZXJTY2hlbWFWMCh7XG4gICAgdmVyc2lvbjogVkVSU0lPTlMudjAsXG4gICAgcHJvcGVydGllczogZmlsdGVyUHJvcHNWMFxuICB9KSxcbiAgbGF5ZXJzOiBuZXcgTGF5ZXJTY2hlbWFWMCh7XG4gICAgdmVyc2lvbjogVkVSU0lPTlMudjAsXG4gICAgcHJvcGVydGllczogbGF5ZXJQcm9wc1YwXG4gIH0pLFxuICBpbnRlcmFjdGlvbkNvbmZpZzogbmV3IEludGVyYWN0aW9uU2NoZW1hVjAoe1xuICAgIHZlcnNpb246IFZFUlNJT05TLnYwLFxuICAgIHByb3BlcnRpZXM6IGludGVyYWN0aW9uUHJvcHNWMFxuICB9KSxcbiAgbGF5ZXJCbGVuZGluZzogbnVsbFxufTtcblxuZXhwb3J0IGNvbnN0IHByb3BlcnRpZXNWMSA9IHtcbiAgZmlsdGVyczogbmV3IEZpbHRlclNjaGVtYVYwKHtcbiAgICB2ZXJzaW9uOiBWRVJTSU9OUy52MSxcbiAgICBwcm9wZXJ0aWVzOiBmaWx0ZXJQcm9wc1YxXG4gIH0pLFxuICBsYXllcnM6IG5ldyBMYXllclNjaGVtYVYwKHtcbiAgICB2ZXJzaW9uOiBWRVJTSU9OUy52MSxcbiAgICBwcm9wZXJ0aWVzOiBsYXllclByb3BzVjFcbiAgfSksXG4gIGludGVyYWN0aW9uQ29uZmlnOiBuZXcgSW50ZXJhY3Rpb25TY2hlbWFWMSh7XG4gICAgdmVyc2lvbjogVkVSU0lPTlMudjEsXG4gICAgcHJvcGVydGllczogaW50ZXJhY3Rpb25Qcm9wc1YwXG4gIH0pLFxuICBsYXllckJsZW5kaW5nOiBudWxsLFxuICBzcGxpdE1hcHM6IG51bGxcbn07XG5cbmV4cG9ydCBjb25zdCB2aXNTdGF0ZVNjaGVtYVYwID0gbmV3IFNjaGVtYSh7XG4gIHZlcnNpb246IFZFUlNJT05TLnYwLFxuICBwcm9wZXJ0aWVzOiBwcm9wZXJ0aWVzVjAsXG4gIGtleTogJ3Zpc1N0YXRlJ1xufSk7XG5cbmV4cG9ydCBjb25zdCB2aXNTdGF0ZVNjaGVtYVYxID0gbmV3IFNjaGVtYSh7XG4gIHZlcnNpb246IFZFUlNJT05TLnYxLFxuICBwcm9wZXJ0aWVzOiBwcm9wZXJ0aWVzVjEsXG4gIGtleTogJ3Zpc1N0YXRlJ1xufSk7XG5cbmV4cG9ydCBjb25zdCB2aXNTdGF0ZVNjaGVtYSA9IHtcbiAgW1ZFUlNJT05TLnYwXToge1xuICAgIHNhdmU6IHRvU2F2ZSA9PiB2aXNTdGF0ZVNjaGVtYVYwLnNhdmUodG9TYXZlKSxcbiAgICBsb2FkOiB0b0xvYWQgPT5cbiAgICAgIHZpc1N0YXRlU2NoZW1hVjEubG9hZCh2aXNTdGF0ZVNjaGVtYVYwLmxvYWQodG9Mb2FkKS52aXNTdGF0ZSlcbiAgfSxcbiAgW1ZFUlNJT05TLnYxXTogdmlzU3RhdGVTY2hlbWFWMVxufTtcblxuLy8gdGVzdCBsb2FkIHYwXG5leHBvcnQgZGVmYXVsdCB2aXNTdGF0ZVNjaGVtYTtcbiJdfQ==