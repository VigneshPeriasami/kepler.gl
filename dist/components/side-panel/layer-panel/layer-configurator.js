"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AggregationTypeSelector = exports.AggrColorScaleSelector = exports.ChannelByValueSelector = exports.ColorRangeConfig = exports.ArcLayerColorSelector = exports.LayerColorSelector = exports.HowToButton = exports.default = void 0;

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _styledComponents2 = require("../../common/styled-components");

var _itemSelector = _interopRequireDefault(require("../../common/item-selector/item-selector"));

var _visConfigByFieldSelector = _interopRequireDefault(require("./vis-config-by-field-selector"));

var _layerColumnConfig = _interopRequireDefault(require("./layer-column-config"));

var _layerTypeSelector = _interopRequireDefault(require("./layer-type-selector"));

var _dimensionScaleSelector = _interopRequireDefault(require("./dimension-scale-selector"));

var _colorSelector = _interopRequireDefault(require("./color-selector"));

var _sourceDataSelector = _interopRequireDefault(require("../source-data-selector"));

var _visConfigSwitch = _interopRequireDefault(require("./vis-config-switch"));

var _visConfigSlider = _interopRequireDefault(require("./vis-config-slider"));

var _layerConfigGroup = _interopRequireWildcard(require("./layer-config-group"));

var _textLabelPanel = _interopRequireDefault(require("./text-label-panel"));

var _layerFactory = require("../../../layers/layer-factory");

var _utils = require("../../../utils/utils");

var _defaultSettings = require("../../../constants/default-settings");

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n  right: 12px;\n  top: -4px;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin-top: 12px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n  margin-top: 12px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var StyledLayerConfigurator = _styledComponents.default.div.attrs({
  className: 'layer-panel__config'
})(_templateObject());

var StyledLayerVisualConfigurator = _styledComponents.default.div.attrs({
  className: 'layer-panel__config__visualC-config'
})(_templateObject2());

var LayerConfigurator =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(LayerConfigurator, _Component);

  function LayerConfigurator() {
    (0, _classCallCheck2.default)(this, LayerConfigurator);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(LayerConfigurator).apply(this, arguments));
  }

  (0, _createClass2.default)(LayerConfigurator, [{
    key: "_renderPointLayerConfig",
    value: function _renderPointLayerConfig(props) {
      return this._renderScatterplotLayerConfig(props);
    }
  }, {
    key: "_renderIconLayerConfig",
    value: function _renderIconLayerConfig(props) {
      return this._renderScatterplotLayerConfig(props);
    }
  }, {
    key: "_renderScatterplotLayerConfig",
    value: function _renderScatterplotLayerConfig(_ref) {
      var layer = _ref.layer,
          visConfiguratorProps = _ref.visConfiguratorProps,
          layerChannelConfigProps = _ref.layerChannelConfigProps,
          layerConfiguratorProps = _ref.layerConfiguratorProps;
      return _react.default.createElement(StyledLayerVisualConfigurator, null, _react.default.createElement(_layerConfigGroup.default, {
        label: 'color',
        collapsible: true
      }, layer.config.colorField ? _react.default.createElement(ColorRangeConfig, visConfiguratorProps) : _react.default.createElement(LayerColorSelector, layerConfiguratorProps), _react.default.createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react.default.createElement(ChannelByValueSelector, (0, _extends2.default)({
        channel: layer.visualChannels.color
      }, layerChannelConfigProps)), _react.default.createElement(_visConfigSlider.default, (0, _extends2.default)({}, _layerFactory.LAYER_VIS_CONFIGS.opacity, visConfiguratorProps)))), _react.default.createElement(_layerConfigGroup.default, {
        label: 'radius',
        collapsible: true
      }, !layer.config.sizeField ? _react.default.createElement(_visConfigSlider.default, (0, _extends2.default)({}, _layerFactory.LAYER_VIS_CONFIGS.radius, visConfiguratorProps, {
        label: false,
        disabled: Boolean(layer.config.sizeField)
      })) : _react.default.createElement(_visConfigSlider.default, (0, _extends2.default)({}, _layerFactory.LAYER_VIS_CONFIGS.radiusRange, visConfiguratorProps, {
        label: false,
        disabled: !layer.config.sizeField || layer.config.visConfig.fixedRadius
      })), _react.default.createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react.default.createElement(ChannelByValueSelector, (0, _extends2.default)({
        channel: layer.visualChannels.size
      }, layerChannelConfigProps)), layer.config.sizeField ? _react.default.createElement(_visConfigSwitch.default, (0, _extends2.default)({}, _layerFactory.LAYER_VIS_CONFIGS.fixedRadius, visConfiguratorProps, {
        disabled: !layer.config.sizeField
      })) : null)), layer.type === _defaultSettings.LAYER_TYPES.point ? _react.default.createElement(_layerConfigGroup.default, (0, _extends2.default)({}, _layerFactory.LAYER_VIS_CONFIGS.outline, visConfiguratorProps), _react.default.createElement(_visConfigSlider.default, (0, _extends2.default)({}, _layerFactory.LAYER_VIS_CONFIGS.thickness, visConfiguratorProps, {
        label: false,
        disabled: !layer.config.visConfig.outline
      }))) : null, _react.default.createElement(_textLabelPanel.default, {
        visConfiguratorProps: visConfiguratorProps,
        layerConfiguratorProps: layerConfiguratorProps,
        textLabel: layer.config.textLabel
      }), _react.default.createElement(_layerConfigGroup.default, (0, _extends2.default)({}, _layerFactory.LAYER_VIS_CONFIGS['hi-precision'], visConfiguratorProps)));
    }
  }, {
    key: "_renderClusterLayerConfig",
    value: function _renderClusterLayerConfig(_ref2) {
      var layer = _ref2.layer,
          visConfiguratorProps = _ref2.visConfiguratorProps,
          layerConfiguratorProps = _ref2.layerConfiguratorProps,
          layerChannelConfigProps = _ref2.layerChannelConfigProps;
      return _react.default.createElement(StyledLayerVisualConfigurator, null, _react.default.createElement(_layerConfigGroup.default, {
        label: 'color',
        collapsible: true
      }, _react.default.createElement(ColorRangeConfig, visConfiguratorProps), _react.default.createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react.default.createElement(AggrColorScaleSelector, layerConfiguratorProps), _react.default.createElement(ChannelByValueSelector, (0, _extends2.default)({
        channel: layer.visualChannels.color
      }, layerChannelConfigProps)), layer.visConfigSettings.colorAggregation.condition(layer.config) ? _react.default.createElement(AggregationTypeSelector, (0, _extends2.default)({}, layer.visConfigSettings.colorAggregation, layerChannelConfigProps, {
        channel: layer.visualChannels.color
      })) : null, _react.default.createElement(_visConfigSlider.default, (0, _extends2.default)({}, layer.visConfigSettings.opacity, visConfiguratorProps)))), _react.default.createElement(_layerConfigGroup.default, {
        label: 'radius',
        collapsible: true
      }, _react.default.createElement(_visConfigSlider.default, (0, _extends2.default)({}, layer.visConfigSettings.clusterRadius, visConfiguratorProps)), _react.default.createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react.default.createElement(_visConfigSlider.default, (0, _extends2.default)({}, layer.visConfigSettings.radiusRange, visConfiguratorProps)))));
    }
  }, {
    key: "_renderHeatmapLayerConfig",
    value: function _renderHeatmapLayerConfig(_ref3) {
      var layer = _ref3.layer,
          visConfiguratorProps = _ref3.visConfiguratorProps,
          layerConfiguratorProps = _ref3.layerConfiguratorProps,
          layerChannelConfigProps = _ref3.layerChannelConfigProps;
      return _react.default.createElement(StyledLayerVisualConfigurator, null, _react.default.createElement(_layerConfigGroup.default, {
        label: 'color',
        collapsible: true
      }, _react.default.createElement(ColorRangeConfig, visConfiguratorProps), _react.default.createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react.default.createElement(_visConfigSlider.default, (0, _extends2.default)({}, layer.visConfigSettings.opacity, visConfiguratorProps)))), _react.default.createElement(_layerConfigGroup.default, {
        label: 'radius'
      }, _react.default.createElement(_visConfigSlider.default, (0, _extends2.default)({}, layer.visConfigSettings.radius, visConfiguratorProps, {
        label: false
      }))), _react.default.createElement(_layerConfigGroup.default, {
        label: 'weight'
      }, _react.default.createElement(ChannelByValueSelector, (0, _extends2.default)({
        channel: layer.visualChannels.weight
      }, layerChannelConfigProps))));
    }
  }, {
    key: "_renderGridLayerConfig",
    value: function _renderGridLayerConfig(props) {
      return this._renderAggregationLayerConfig(props);
    }
  }, {
    key: "_renderHexagonLayerConfig",
    value: function _renderHexagonLayerConfig(props) {
      return this._renderAggregationLayerConfig(props);
    }
  }, {
    key: "_renderAggregationLayerConfig",
    value: function _renderAggregationLayerConfig(_ref4) {
      var layer = _ref4.layer,
          visConfiguratorProps = _ref4.visConfiguratorProps,
          layerConfiguratorProps = _ref4.layerConfiguratorProps,
          layerChannelConfigProps = _ref4.layerChannelConfigProps;
      var config = layer.config;
      var enable3d = config.visConfig.enable3d;
      var elevationByDescription = 'When off, height is based on count of points';
      var colorByDescription = 'When off, color is based on count of points';
      return _react.default.createElement(StyledLayerVisualConfigurator, null, _react.default.createElement(_layerConfigGroup.default, {
        label: 'color',
        collapsible: true
      }, _react.default.createElement(ColorRangeConfig, visConfiguratorProps), _react.default.createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react.default.createElement(AggrColorScaleSelector, layerConfiguratorProps), _react.default.createElement(ChannelByValueSelector, (0, _extends2.default)({
        channel: layer.visualChannels.color
      }, layerChannelConfigProps)), layer.visConfigSettings.colorAggregation.condition(layer.config) ? _react.default.createElement(AggregationTypeSelector, (0, _extends2.default)({}, layer.visConfigSettings.colorAggregation, layerChannelConfigProps, {
        descreiption: colorByDescription,
        channel: layer.visualChannels.color
      })) : null, layer.visConfigSettings.percentile && layer.visConfigSettings.percentile.condition(layer.config) ? _react.default.createElement(_visConfigSlider.default, (0, _extends2.default)({}, layer.visConfigSettings.percentile, visConfiguratorProps)) : null, _react.default.createElement(_visConfigSlider.default, (0, _extends2.default)({}, layer.visConfigSettings.opacity, visConfiguratorProps)))), _react.default.createElement(_layerConfigGroup.default, {
        label: 'radius',
        collapsible: true
      }, _react.default.createElement(_visConfigSlider.default, (0, _extends2.default)({}, layer.visConfigSettings.worldUnitSize, visConfiguratorProps)), _react.default.createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react.default.createElement(_visConfigSlider.default, (0, _extends2.default)({}, layer.visConfigSettings.coverage, visConfiguratorProps)))), layer.visConfigSettings.enable3d ? _react.default.createElement(_layerConfigGroup.default, (0, _extends2.default)({}, layer.visConfigSettings.enable3d, visConfiguratorProps, {
        collapsible: true
      }), _react.default.createElement(_visConfigSlider.default, (0, _extends2.default)({}, layer.visConfigSettings.elevationScale, visConfiguratorProps)), _react.default.createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react.default.createElement(ChannelByValueSelector, (0, _extends2.default)({}, layerChannelConfigProps, {
        channel: layer.visualChannels.size,
        description: elevationByDescription,
        disabled: !enable3d
      })), layer.visConfigSettings.sizeAggregation.condition(layer.config) ? _react.default.createElement(AggregationTypeSelector, (0, _extends2.default)({}, layer.visConfigSettings.sizeAggregation, layerChannelConfigProps, {
        channel: layer.visualChannels.size
      })) : null, layer.visConfigSettings.elevationPercentile.condition(layer.config) ? _react.default.createElement(_visConfigSlider.default, (0, _extends2.default)({}, layer.visConfigSettings.elevationPercentile, visConfiguratorProps)) : null)) : null, _react.default.createElement(_layerConfigGroup.default, (0, _extends2.default)({}, layer.visConfigSettings['hi-precision'], visConfiguratorProps)));
    } // TODO: Shan move these into layer class

  }, {
    key: "_renderHexagonIdLayerConfig",
    value: function _renderHexagonIdLayerConfig(_ref5) {
      var layer = _ref5.layer,
          visConfiguratorProps = _ref5.visConfiguratorProps,
          layerConfiguratorProps = _ref5.layerConfiguratorProps,
          layerChannelConfigProps = _ref5.layerChannelConfigProps;
      return _react.default.createElement(StyledLayerVisualConfigurator, null, _react.default.createElement(_layerConfigGroup.default, {
        label: 'color',
        collapsible: true
      }, layer.config.colorField ? _react.default.createElement(ColorRangeConfig, visConfiguratorProps) : _react.default.createElement(LayerColorSelector, layerConfiguratorProps), _react.default.createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react.default.createElement(ChannelByValueSelector, (0, _extends2.default)({
        channel: layer.visualChannels.color
      }, layerChannelConfigProps)), _react.default.createElement(_visConfigSlider.default, (0, _extends2.default)({}, _layerFactory.LAYER_VIS_CONFIGS.opacity, visConfiguratorProps)))), _react.default.createElement(_layerConfigGroup.default, {
        label: 'coverage',
        collapsible: true
      }, !layer.config.coverageField ? _react.default.createElement(_visConfigSlider.default, (0, _extends2.default)({}, layer.visConfigSettings.coverage, visConfiguratorProps, {
        label: false
      })) : _react.default.createElement(_visConfigSlider.default, (0, _extends2.default)({}, layer.visConfigSettings.coverageRange, visConfiguratorProps, {
        label: false
      })), _react.default.createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react.default.createElement(ChannelByValueSelector, (0, _extends2.default)({
        channel: layer.visualChannels.coverage
      }, layerChannelConfigProps)))), _react.default.createElement(_layerConfigGroup.default, (0, _extends2.default)({}, _layerFactory.LAYER_VIS_CONFIGS.enable3d, visConfiguratorProps, {
        collapsible: true
      }), _react.default.createElement(_visConfigSlider.default, (0, _extends2.default)({}, _layerFactory.LAYER_VIS_CONFIGS.elevationRange, visConfiguratorProps, {
        label: false
      })), _react.default.createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react.default.createElement(ChannelByValueSelector, (0, _extends2.default)({
        channel: layer.visualChannels.size
      }, layerChannelConfigProps)))), _react.default.createElement(_layerConfigGroup.default, (0, _extends2.default)({}, _layerFactory.LAYER_VIS_CONFIGS['hi-precision'], visConfiguratorProps)));
    }
  }, {
    key: "_renderArcLayerConfig",
    value: function _renderArcLayerConfig(args) {
      return this._renderLineLayerConfig(args);
    }
  }, {
    key: "_renderLineLayerConfig",
    value: function _renderLineLayerConfig(_ref6) {
      var layer = _ref6.layer,
          visConfiguratorProps = _ref6.visConfiguratorProps,
          layerConfiguratorProps = _ref6.layerConfiguratorProps,
          layerChannelConfigProps = _ref6.layerChannelConfigProps;
      return _react.default.createElement(StyledLayerVisualConfigurator, null, _react.default.createElement(_layerConfigGroup.default, {
        label: 'color',
        collapsible: true
      }, layer.config.colorField ? _react.default.createElement(ColorRangeConfig, visConfiguratorProps) : _react.default.createElement(ArcLayerColorSelector, {
        layer: layer,
        onChangeConfig: layerConfiguratorProps.onChange,
        onChangeVisConfig: visConfiguratorProps.onChange
      }), _react.default.createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react.default.createElement(ChannelByValueSelector, (0, _extends2.default)({
        channel: layer.visualChannels.color
      }, layerChannelConfigProps)), _react.default.createElement(_visConfigSlider.default, (0, _extends2.default)({}, _layerFactory.LAYER_VIS_CONFIGS.opacity, visConfiguratorProps)))), _react.default.createElement(_layerConfigGroup.default, {
        label: 'stroke',
        collapsible: true
      }, layer.config.sizeField ? _react.default.createElement(_visConfigSlider.default, (0, _extends2.default)({}, _layerFactory.LAYER_VIS_CONFIGS.strokeWidthRange, visConfiguratorProps, {
        disabled: !layer.config.sizeField,
        label: false
      })) : _react.default.createElement(_visConfigSlider.default, (0, _extends2.default)({}, _layerFactory.LAYER_VIS_CONFIGS.thickness, visConfiguratorProps, {
        label: false
      })), _react.default.createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react.default.createElement(ChannelByValueSelector, (0, _extends2.default)({
        channel: layer.visualChannels.size
      }, layerChannelConfigProps)))), _react.default.createElement(_layerConfigGroup.default, (0, _extends2.default)({}, _layerFactory.LAYER_VIS_CONFIGS['hi-precision'], visConfiguratorProps)));
    }
  }, {
    key: "_renderGeojsonLayerConfig",
    value: function _renderGeojsonLayerConfig(_ref7) {
      var layer = _ref7.layer,
          visConfiguratorProps = _ref7.visConfiguratorProps,
          layerConfiguratorProps = _ref7.layerConfiguratorProps,
          layerChannelConfigProps = _ref7.layerChannelConfigProps;
      var _layer$meta$featureTy = layer.meta.featureTypes,
          featureTypes = _layer$meta$featureTy === void 0 ? {} : _layer$meta$featureTy,
          visConfig = layer.config.visConfig;
      return _react.default.createElement(StyledLayerVisualConfigurator, null, _react.default.createElement(_layerConfigGroup.default, {
        label: 'color',
        collapsible: true
      }, layer.config.colorField ? _react.default.createElement(ColorRangeConfig, visConfiguratorProps) : _react.default.createElement(LayerColorSelector, layerConfiguratorProps), _react.default.createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react.default.createElement(ChannelByValueSelector, (0, _extends2.default)({
        channel: layer.visualChannels.color
      }, layerChannelConfigProps)), _react.default.createElement(_visConfigSlider.default, (0, _extends2.default)({}, _layerFactory.LAYER_VIS_CONFIGS.opacity, visConfiguratorProps)))), featureTypes.polygon ? _react.default.createElement(_layerConfigGroup.default, (0, _extends2.default)({
        label: 'fill'
      }, visConfiguratorProps, _layerFactory.LAYER_VIS_CONFIGS.filled)) : null, featureTypes.line || featureTypes.polygon ? _react.default.createElement(_layerConfigGroup.default, (0, _extends2.default)({
        label: "stroke"
      }, visConfiguratorProps, featureTypes.polygon ? _layerFactory.LAYER_VIS_CONFIGS.stroked : {}, {
        collapsible: true
      }), layer.config.sizeField ? _react.default.createElement(_visConfigSlider.default, (0, _extends2.default)({}, _layerFactory.LAYER_VIS_CONFIGS.strokeWidthRange, visConfiguratorProps, {
        label: false
      })) : _react.default.createElement(_visConfigSlider.default, (0, _extends2.default)({}, _layerFactory.LAYER_VIS_CONFIGS.thickness, visConfiguratorProps, {
        label: false
      })), _react.default.createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react.default.createElement(ChannelByValueSelector, (0, _extends2.default)({
        channel: layer.visualChannels.size
      }, layerChannelConfigProps)))) : null, featureTypes.polygon && visConfig.filled ? _react.default.createElement(_layerConfigGroup.default, (0, _extends2.default)({}, visConfiguratorProps, _layerFactory.LAYER_VIS_CONFIGS.enable3d, {
        collapsible: true
      }), _react.default.createElement(_visConfigSlider.default, (0, _extends2.default)({}, _layerFactory.LAYER_VIS_CONFIGS.elevationScale, visConfiguratorProps, {
        label: false
      })), _react.default.createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react.default.createElement(ChannelByValueSelector, (0, _extends2.default)({
        channel: layer.visualChannels.height
      }, layerChannelConfigProps)), _react.default.createElement(_visConfigSwitch.default, (0, _extends2.default)({}, visConfiguratorProps, _layerFactory.LAYER_VIS_CONFIGS.wireframe)))) : null, featureTypes.point ? _react.default.createElement(_layerConfigGroup.default, {
        label: 'radius',
        collapsible: true
      }, !layer.config.radiusField ? _react.default.createElement(_visConfigSlider.default, (0, _extends2.default)({}, _layerFactory.LAYER_VIS_CONFIGS.radius, visConfiguratorProps, {
        label: false,
        disabled: Boolean(layer.config.radiusField)
      })) : _react.default.createElement(_visConfigSlider.default, (0, _extends2.default)({}, _layerFactory.LAYER_VIS_CONFIGS.radiusRange, visConfiguratorProps, {
        label: false,
        disabled: !layer.config.radiusField
      })), _react.default.createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react.default.createElement(ChannelByValueSelector, (0, _extends2.default)({
        channel: layer.visualChannels.radius
      }, layerChannelConfigProps)))) : null, _react.default.createElement(_layerConfigGroup.default, (0, _extends2.default)({}, _layerFactory.LAYER_VIS_CONFIGS['hi-precision'], visConfiguratorProps)));
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          layer = _this$props.layer,
          datasets = _this$props.datasets,
          updateLayerConfig = _this$props.updateLayerConfig,
          layerTypeOptions = _this$props.layerTypeOptions,
          updateLayerType = _this$props.updateLayerType;

      var _ref8 = layer.config.dataId ? datasets[layer.config.dataId] : {},
          _ref8$fields = _ref8.fields,
          fields = _ref8$fields === void 0 ? [] : _ref8$fields,
          fieldPairs = _ref8.fieldPairs;

      var config = layer.config;
      var commonConfigProp = {
        layer: layer,
        fields: fields
      };
      var visConfiguratorProps = (0, _objectSpread3.default)({}, commonConfigProp, {
        onChange: this.props.updateLayerVisConfig
      });
      var layerConfiguratorProps = (0, _objectSpread3.default)({}, commonConfigProp, {
        onChange: updateLayerConfig
      });
      var layerChannelConfigProps = (0, _objectSpread3.default)({}, commonConfigProp, {
        onChange: this.props.updateLayerVisualChannelConfig
      });
      var renderTemplate = layer.type && "_render".concat((0, _utils.capitalizeFirstLetter)(layer.type), "LayerConfig");
      return _react.default.createElement(StyledLayerConfigurator, null, layer.layerInfoModal ? _react.default.createElement(HowToButton, {
        onClick: function onClick() {
          return _this.props.openModal(layer.layerInfoModal);
        }
      }) : null, _react.default.createElement(_layerConfigGroup.default, {
        label: 'basic',
        collapsible: true,
        expanded: !layer.hasAllColumns()
      }, _react.default.createElement(_layerTypeSelector.default, {
        layer: layer,
        layerTypeOptions: layerTypeOptions,
        onSelect: updateLayerType
      }), _react.default.createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, Object.keys(datasets).length > 1 && _react.default.createElement(_sourceDataSelector.default, {
        datasets: datasets,
        id: layer.id,
        disabled: layer.tyep && config.columns,
        dataId: config.dataId,
        onSelect: function onSelect(value) {
          return updateLayerConfig({
            dataId: value
          });
        }
      }), _react.default.createElement(_layerColumnConfig.default, {
        layer: layer,
        fields: fields,
        fieldPairs: fieldPairs,
        updateLayerConfig: updateLayerConfig,
        updateLayerType: this.props.updateLayerType
      }))), this[renderTemplate] && this[renderTemplate]({
        layer: layer,
        visConfiguratorProps: visConfiguratorProps,
        layerChannelConfigProps: layerChannelConfigProps,
        layerConfiguratorProps: layerConfiguratorProps
      }));
    }
  }]);
  return LayerConfigurator;
}(_react.Component);
/*
 * Componentize config component into pure functional components
 */


exports.default = LayerConfigurator;
(0, _defineProperty2.default)(LayerConfigurator, "propTypes", {
  layer: _propTypes.default.object.isRequired,
  datasets: _propTypes.default.object.isRequired,
  layerTypeOptions: _propTypes.default.arrayOf(_propTypes.default.any).isRequired,
  openModal: _propTypes.default.func.isRequired,
  updateLayerConfig: _propTypes.default.func.isRequired,
  updateLayerType: _propTypes.default.func.isRequired,
  updateLayerVisConfig: _propTypes.default.func.isRequired,
  updateLayerVisualChannelConfig: _propTypes.default.func.isRequired
});

var StyledHowToButton = _styledComponents.default.div(_templateObject3());

var HowToButton = function HowToButton(_ref9) {
  var onClick = _ref9.onClick;
  return _react.default.createElement(StyledHowToButton, null, _react.default.createElement(_styledComponents2.Button, {
    link: true,
    small: true,
    onClick: onClick
  }, "How to"));
};

exports.HowToButton = HowToButton;

var LayerColorSelector = function LayerColorSelector(_ref10) {
  var layer = _ref10.layer,
      onChange = _ref10.onChange,
      label = _ref10.label;
  return _react.default.createElement(_styledComponents2.SidePanelSection, {
    disabled: layer.config.colorField
  }, _react.default.createElement(_colorSelector.default, {
    colorSets: [{
      selectedColor: layer.config.color,
      setColor: function setColor(rgbValue) {
        return onChange({
          color: rgbValue
        });
      }
    }]
  }));
};

exports.LayerColorSelector = LayerColorSelector;

var ArcLayerColorSelector = function ArcLayerColorSelector(_ref11) {
  var layer = _ref11.layer,
      onChangeConfig = _ref11.onChangeConfig,
      onChangeVisConfig = _ref11.onChangeVisConfig;
  return _react.default.createElement(_styledComponents2.SidePanelSection, null, _react.default.createElement(_colorSelector.default, {
    colorSets: [{
      selectedColor: layer.config.color,
      setColor: function setColor(rgbValue) {
        return onChangeConfig({
          color: rgbValue
        });
      },
      label: 'Source'
    }, {
      selectedColor: layer.config.visConfig.targetColor || layer.config.color,
      setColor: function setColor(rgbValue) {
        return onChangeVisConfig({
          targetColor: rgbValue
        });
      },
      label: 'Target'
    }]
  }));
};

exports.ArcLayerColorSelector = ArcLayerColorSelector;

var ColorRangeConfig = function ColorRangeConfig(_ref12) {
  var layer = _ref12.layer,
      onChange = _ref12.onChange;
  return _react.default.createElement(_styledComponents2.SidePanelSection, null, _react.default.createElement(_colorSelector.default, {
    colorSets: [{
      selectedColor: layer.config.visConfig.colorRange,
      isRange: true,
      setColor: function setColor(colorRange) {
        return onChange({
          colorRange: colorRange
        });
      }
    }]
  }));
};

exports.ColorRangeConfig = ColorRangeConfig;

var ChannelByValueSelector = function ChannelByValueSelector(_ref13) {
  var layer = _ref13.layer,
      channel = _ref13.channel,
      onChange = _ref13.onChange,
      fields = _ref13.fields,
      description = _ref13.description;
  var channelScaleType = channel.channelScaleType,
      domain = channel.domain,
      field = channel.field,
      key = channel.key,
      property = channel.property,
      range = channel.range,
      scale = channel.scale,
      defaultMeasure = channel.defaultMeasure,
      supportedFieldTypes = channel.supportedFieldTypes;
  var channelSupportedFieldTypes = supportedFieldTypes || _defaultSettings.CHANNEL_SCALE_SUPPORTED_FIELDS[channelScaleType];
  var supportedFields = fields.filter(function (_ref14) {
    var type = _ref14.type;
    return channelSupportedFieldTypes.includes(type);
  });
  var scaleOptions = layer.getScaleOptions(channel.key);
  var showScale = !layer.isAggregated && layer.config[scale] && scaleOptions.length > 1;
  var defaultDescription = "Calculate ".concat(property, " based on selected field");
  return _react.default.createElement(_visConfigByFieldSelector.default, {
    channel: channel.key,
    description: description || defaultDescription,
    domain: layer.config[domain],
    fields: supportedFields,
    id: layer.id,
    key: "".concat(key, "-channel-selector"),
    property: property,
    placeholder: defaultMeasure || 'Select a field',
    range: layer.config.visConfig[range],
    scaleOptions: scaleOptions,
    scaleType: scale ? layer.config[scale] : null,
    selectedField: layer.config[field],
    showScale: showScale,
    updateField: function updateField(val) {
      return onChange((0, _defineProperty2.default)({}, field, val), key);
    },
    updateScale: function updateScale(val) {
      return onChange((0, _defineProperty2.default)({}, scale, val), key);
    }
  });
};

exports.ChannelByValueSelector = ChannelByValueSelector;

var AggrColorScaleSelector = function AggrColorScaleSelector(_ref15) {
  var layer = _ref15.layer,
      onChange = _ref15.onChange;
  var scaleOptions = layer.getScaleOptions('color');
  return Array.isArray(scaleOptions) && scaleOptions.length > 1 ? _react.default.createElement(_dimensionScaleSelector.default, {
    label: "Color Scale",
    options: scaleOptions,
    scaleType: layer.config.colorScale,
    onSelect: function onSelect(val) {
      return onChange({
        colorScale: val
      }, 'color');
    }
  }) : null;
};

exports.AggrColorScaleSelector = AggrColorScaleSelector;

var AggregationTypeSelector = function AggregationTypeSelector(_ref16) {
  var layer = _ref16.layer,
      channel = _ref16.channel,
      _onChange3 = _ref16.onChange;
  var field = channel.field,
      aggregation = channel.aggregation,
      key = channel.key;
  var selectedField = layer.config[field];
  var visConfig = layer.config.visConfig; // aggregation should only be selectable when field is selected

  var aggregationOptions = layer.getAggregationOptions(key);
  return _react.default.createElement(_styledComponents2.SidePanelSection, null, _react.default.createElement(_styledComponents2.PanelLabel, null, "Aggregate ".concat(selectedField.name, " by")), _react.default.createElement(_itemSelector.default, {
    selectedItems: visConfig[aggregation],
    options: aggregationOptions,
    multiSelect: false,
    searchable: false,
    onChange: function onChange(value) {
      return _onChange3({
        visConfig: (0, _objectSpread3.default)({}, layer.config.visConfig, (0, _defineProperty2.default)({}, aggregation, value))
      }, channel.key);
    }
  }));
};
/* eslint-enable max-params */


exports.AggregationTypeSelector = AggregationTypeSelector;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItcGFuZWwvbGF5ZXItY29uZmlndXJhdG9yLmpzIl0sIm5hbWVzIjpbIlN0eWxlZExheWVyQ29uZmlndXJhdG9yIiwic3R5bGVkIiwiZGl2IiwiYXR0cnMiLCJjbGFzc05hbWUiLCJTdHlsZWRMYXllclZpc3VhbENvbmZpZ3VyYXRvciIsIkxheWVyQ29uZmlndXJhdG9yIiwicHJvcHMiLCJfcmVuZGVyU2NhdHRlcnBsb3RMYXllckNvbmZpZyIsImxheWVyIiwidmlzQ29uZmlndXJhdG9yUHJvcHMiLCJsYXllckNoYW5uZWxDb25maWdQcm9wcyIsImxheWVyQ29uZmlndXJhdG9yUHJvcHMiLCJjb25maWciLCJjb2xvckZpZWxkIiwidmlzdWFsQ2hhbm5lbHMiLCJjb2xvciIsIkxBWUVSX1ZJU19DT05GSUdTIiwib3BhY2l0eSIsInNpemVGaWVsZCIsInJhZGl1cyIsIkJvb2xlYW4iLCJyYWRpdXNSYW5nZSIsInZpc0NvbmZpZyIsImZpeGVkUmFkaXVzIiwic2l6ZSIsInR5cGUiLCJMQVlFUl9UWVBFUyIsInBvaW50Iiwib3V0bGluZSIsInRoaWNrbmVzcyIsInRleHRMYWJlbCIsInZpc0NvbmZpZ1NldHRpbmdzIiwiY29sb3JBZ2dyZWdhdGlvbiIsImNvbmRpdGlvbiIsImNsdXN0ZXJSYWRpdXMiLCJ3ZWlnaHQiLCJfcmVuZGVyQWdncmVnYXRpb25MYXllckNvbmZpZyIsImVuYWJsZTNkIiwiZWxldmF0aW9uQnlEZXNjcmlwdGlvbiIsImNvbG9yQnlEZXNjcmlwdGlvbiIsInBlcmNlbnRpbGUiLCJ3b3JsZFVuaXRTaXplIiwiY292ZXJhZ2UiLCJlbGV2YXRpb25TY2FsZSIsInNpemVBZ2dyZWdhdGlvbiIsImVsZXZhdGlvblBlcmNlbnRpbGUiLCJjb3ZlcmFnZUZpZWxkIiwiY292ZXJhZ2VSYW5nZSIsImVsZXZhdGlvblJhbmdlIiwiYXJncyIsIl9yZW5kZXJMaW5lTGF5ZXJDb25maWciLCJvbkNoYW5nZSIsInN0cm9rZVdpZHRoUmFuZ2UiLCJtZXRhIiwiZmVhdHVyZVR5cGVzIiwicG9seWdvbiIsImZpbGxlZCIsImxpbmUiLCJzdHJva2VkIiwiaGVpZ2h0Iiwid2lyZWZyYW1lIiwicmFkaXVzRmllbGQiLCJkYXRhc2V0cyIsInVwZGF0ZUxheWVyQ29uZmlnIiwibGF5ZXJUeXBlT3B0aW9ucyIsInVwZGF0ZUxheWVyVHlwZSIsImRhdGFJZCIsImZpZWxkcyIsImZpZWxkUGFpcnMiLCJjb21tb25Db25maWdQcm9wIiwidXBkYXRlTGF5ZXJWaXNDb25maWciLCJ1cGRhdGVMYXllclZpc3VhbENoYW5uZWxDb25maWciLCJyZW5kZXJUZW1wbGF0ZSIsImxheWVySW5mb01vZGFsIiwib3Blbk1vZGFsIiwiaGFzQWxsQ29sdW1ucyIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJpZCIsInR5ZXAiLCJjb2x1bW5zIiwidmFsdWUiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJpc1JlcXVpcmVkIiwiYXJyYXlPZiIsImFueSIsImZ1bmMiLCJTdHlsZWRIb3dUb0J1dHRvbiIsIkhvd1RvQnV0dG9uIiwib25DbGljayIsIkxheWVyQ29sb3JTZWxlY3RvciIsImxhYmVsIiwic2VsZWN0ZWRDb2xvciIsInNldENvbG9yIiwicmdiVmFsdWUiLCJBcmNMYXllckNvbG9yU2VsZWN0b3IiLCJvbkNoYW5nZUNvbmZpZyIsIm9uQ2hhbmdlVmlzQ29uZmlnIiwidGFyZ2V0Q29sb3IiLCJDb2xvclJhbmdlQ29uZmlnIiwiY29sb3JSYW5nZSIsImlzUmFuZ2UiLCJDaGFubmVsQnlWYWx1ZVNlbGVjdG9yIiwiY2hhbm5lbCIsImRlc2NyaXB0aW9uIiwiY2hhbm5lbFNjYWxlVHlwZSIsImRvbWFpbiIsImZpZWxkIiwia2V5IiwicHJvcGVydHkiLCJyYW5nZSIsInNjYWxlIiwiZGVmYXVsdE1lYXN1cmUiLCJzdXBwb3J0ZWRGaWVsZFR5cGVzIiwiY2hhbm5lbFN1cHBvcnRlZEZpZWxkVHlwZXMiLCJDSEFOTkVMX1NDQUxFX1NVUFBPUlRFRF9GSUVMRFMiLCJzdXBwb3J0ZWRGaWVsZHMiLCJmaWx0ZXIiLCJpbmNsdWRlcyIsInNjYWxlT3B0aW9ucyIsImdldFNjYWxlT3B0aW9ucyIsInNob3dTY2FsZSIsImlzQWdncmVnYXRlZCIsImRlZmF1bHREZXNjcmlwdGlvbiIsInZhbCIsIkFnZ3JDb2xvclNjYWxlU2VsZWN0b3IiLCJBcnJheSIsImlzQXJyYXkiLCJjb2xvclNjYWxlIiwiQWdncmVnYXRpb25UeXBlU2VsZWN0b3IiLCJhZ2dyZWdhdGlvbiIsInNlbGVjdGVkRmllbGQiLCJhZ2dyZWdhdGlvbk9wdGlvbnMiLCJnZXRBZ2dyZWdhdGlvbk9wdGlvbnMiLCJuYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFLQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLQSxJQUFNQSx1QkFBdUIsR0FBR0MsMEJBQU9DLEdBQVAsQ0FBV0MsS0FBWCxDQUFpQjtBQUMvQ0MsRUFBQUEsU0FBUyxFQUFFO0FBRG9DLENBQWpCLENBQUgsbUJBQTdCOztBQU9BLElBQU1DLDZCQUE2QixHQUFHSiwwQkFBT0MsR0FBUCxDQUFXQyxLQUFYLENBQWlCO0FBQ3JEQyxFQUFBQSxTQUFTLEVBQUU7QUFEMEMsQ0FBakIsQ0FBSCxvQkFBbkM7O0lBTXFCRSxpQjs7Ozs7Ozs7Ozs7OzRDQVlLQyxLLEVBQU87QUFDN0IsYUFBTyxLQUFLQyw2QkFBTCxDQUFtQ0QsS0FBbkMsQ0FBUDtBQUNEOzs7MkNBRXNCQSxLLEVBQU87QUFDNUIsYUFBTyxLQUFLQyw2QkFBTCxDQUFtQ0QsS0FBbkMsQ0FBUDtBQUNEOzs7d0RBT0U7QUFBQSxVQUpERSxLQUlDLFFBSkRBLEtBSUM7QUFBQSxVQUhEQyxvQkFH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QUFFRSxJQUFBLE9BQU8sRUFBRUUsa0JBRlg7QUFHRSxJQUFBLFdBQVcsRUFBRSxLQUhmO0FBSUUsSUFBQSxVQUFVLEVBQUUsS0FKZDtBQUtFLElBQUEsUUFBUSxFQUFFLGtCQUFBckQsS0FBSztBQUFBLGFBQ2IvQixVQUFRLENBQ047QUFDRTdCLFFBQUFBLFNBQVMsa0NBQ0pkLEtBQUssQ0FBQ0ksTUFBTixDQUFhVSxTQURULG9DQUVOK0csV0FGTSxFQUVRbkQsS0FGUjtBQURYLE9BRE0sRUFPTndCLE9BQU8sQ0FBQ0ssR0FQRixDQURLO0FBQUE7QUFMakIsSUFGRixDQURGO0FBc0JELENBOUJNO0FBK0JQIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7XG4gIEJ1dHRvbixcbiAgUGFuZWxMYWJlbCxcbiAgU2lkZVBhbmVsU2VjdGlvblxufSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgSXRlbVNlbGVjdG9yIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2l0ZW0tc2VsZWN0b3IvaXRlbS1zZWxlY3Rvcic7XG5cbmltcG9ydCBWaXNDb25maWdCeUZpZWxkU2VsZWN0b3IgZnJvbSAnLi92aXMtY29uZmlnLWJ5LWZpZWxkLXNlbGVjdG9yJztcbmltcG9ydCBMYXllckNvbHVtbkNvbmZpZyBmcm9tICcuL2xheWVyLWNvbHVtbi1jb25maWcnO1xuaW1wb3J0IExheWVyVHlwZVNlbGVjdG9yIGZyb20gJy4vbGF5ZXItdHlwZS1zZWxlY3Rvcic7XG5pbXBvcnQgRGltZW5zaW9uU2NhbGVTZWxlY3RvciBmcm9tICcuL2RpbWVuc2lvbi1zY2FsZS1zZWxlY3Rvcic7XG5pbXBvcnQgQ29sb3JTZWxlY3RvciBmcm9tICcuL2NvbG9yLXNlbGVjdG9yJztcbmltcG9ydCBTb3VyY2VEYXRhU2VsZWN0b3IgZnJvbSAnY29tcG9uZW50cy9zaWRlLXBhbmVsL3NvdXJjZS1kYXRhLXNlbGVjdG9yJztcbmltcG9ydCBWaXNDb25maWdTd2l0Y2ggZnJvbSAnLi92aXMtY29uZmlnLXN3aXRjaCc7XG5pbXBvcnQgVmlzQ29uZmlnU2xpZGVyIGZyb20gJy4vdmlzLWNvbmZpZy1zbGlkZXInO1xuaW1wb3J0IExheWVyQ29uZmlnR3JvdXAsIHtDb25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudH0gZnJvbSAnLi9sYXllci1jb25maWctZ3JvdXAnO1xuaW1wb3J0IFRleHRMYWJlbFBhbmVsIGZyb20gJy4vdGV4dC1sYWJlbC1wYW5lbCc7XG5cbmltcG9ydCB7TEFZRVJfVklTX0NPTkZJR1N9IGZyb20gJ2xheWVycy9sYXllci1mYWN0b3J5JztcblxuaW1wb3J0IHtjYXBpdGFsaXplRmlyc3RMZXR0ZXJ9IGZyb20gJ3V0aWxzL3V0aWxzJztcblxuaW1wb3J0IHtcbiAgTEFZRVJfVFlQRVMsXG4gIENIQU5ORUxfU0NBTEVfU1VQUE9SVEVEX0ZJRUxEU1xufSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5cbmNvbnN0IFN0eWxlZExheWVyQ29uZmlndXJhdG9yID0gc3R5bGVkLmRpdi5hdHRycyh7XG4gIGNsYXNzTmFtZTogJ2xheWVyLXBhbmVsX19jb25maWcnXG59KWBcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBtYXJnaW4tdG9wOiAxMnB4O1xuYDtcblxuY29uc3QgU3R5bGVkTGF5ZXJWaXN1YWxDb25maWd1cmF0b3IgPSBzdHlsZWQuZGl2LmF0dHJzKHtcbiAgY2xhc3NOYW1lOiAnbGF5ZXItcGFuZWxfX2NvbmZpZ19fdmlzdWFsQy1jb25maWcnXG59KWBcbiAgbWFyZ2luLXRvcDogMTJweDtcbmA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExheWVyQ29uZmlndXJhdG9yIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBsYXllcjogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIGRhdGFzZXRzOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgbGF5ZXJUeXBlT3B0aW9uczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSkuaXNSZXF1aXJlZCxcbiAgICBvcGVuTW9kYWw6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgdXBkYXRlTGF5ZXJDb25maWc6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgdXBkYXRlTGF5ZXJUeXBlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHVwZGF0ZUxheWVyVmlzQ29uZmlnOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHVwZGF0ZUxheWVyVmlzdWFsQ2hhbm5lbENvbmZpZzogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxuICB9O1xuXG4gIF9yZW5kZXJQb2ludExheWVyQ29uZmlnKHByb3BzKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlbmRlclNjYXR0ZXJwbG90TGF5ZXJDb25maWcocHJvcHMpO1xuICB9XG5cbiAgX3JlbmRlckljb25MYXllckNvbmZpZyhwcm9wcykge1xuICAgIHJldHVybiB0aGlzLl9yZW5kZXJTY2F0dGVycGxvdExheWVyQ29uZmlnKHByb3BzKTtcbiAgfVxuXG4gIF9yZW5kZXJTY2F0dGVycGxvdExheWVyQ29uZmlnKHtcbiAgICBsYXllcixcbiAgICB2aXNDb25maWd1cmF0b3JQcm9wcyxcbiAgICBsYXllckNoYW5uZWxDb25maWdQcm9wcyxcbiAgICBsYXllckNvbmZpZ3VyYXRvclByb3BzXG4gIH0pIHtcbiAgICByZXR1cm4gKFxuICAgICAgPFN0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICAgICB7LyogQ29sb3IgKi99XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsnY29sb3InfSBjb2xsYXBzaWJsZT5cbiAgICAgICAgICB7bGF5ZXIuY29uZmlnLmNvbG9yRmllbGQgPyAoXG4gICAgICAgICAgICA8Q29sb3JSYW5nZUNvbmZpZyB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxMYXllckNvbG9yU2VsZWN0b3Igey4uLmxheWVyQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8Q29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgICA8Q2hhbm5lbEJ5VmFsdWVTZWxlY3RvclxuICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5jb2xvcn1cbiAgICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgey4uLkxBWUVSX1ZJU19DT05GSUdTLm9wYWNpdHl9XG4gICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9Db25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuXG4gICAgICAgIHsvKiBSYWRpdXMgKi99XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsncmFkaXVzJ30gY29sbGFwc2libGU+XG4gICAgICAgICAgeyFsYXllci5jb25maWcuc2l6ZUZpZWxkID8gKFxuICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICB7Li4uTEFZRVJfVklTX0NPTkZJR1MucmFkaXVzfVxuICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgIGxhYmVsPXtmYWxzZX1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e0Jvb2xlYW4obGF5ZXIuY29uZmlnLnNpemVGaWVsZCl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgIHsuLi5MQVlFUl9WSVNfQ09ORklHUy5yYWRpdXNSYW5nZX1cbiAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICBsYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtcbiAgICAgICAgICAgICAgICAhbGF5ZXIuY29uZmlnLnNpemVGaWVsZCB8fCBsYXllci5jb25maWcudmlzQ29uZmlnLmZpeGVkUmFkaXVzXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8Q29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgICA8Q2hhbm5lbEJ5VmFsdWVTZWxlY3RvclxuICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5zaXplfVxuICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAge2xheWVyLmNvbmZpZy5zaXplRmllbGQgPyAoXG4gICAgICAgICAgICAgIDxWaXNDb25maWdTd2l0Y2hcbiAgICAgICAgICAgICAgICB7Li4uTEFZRVJfVklTX0NPTkZJR1MuZml4ZWRSYWRpdXN9XG4gICAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXshbGF5ZXIuY29uZmlnLnNpemVGaWVsZH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgIDwvQ29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cblxuICAgICAgICB7Lyogb3V0bGluZSAqL31cbiAgICAgICAge2xheWVyLnR5cGUgPT09IExBWUVSX1RZUEVTLnBvaW50ID8gKFxuICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwXG4gICAgICAgICAgICB7Li4uTEFZRVJfVklTX0NPTkZJR1Mub3V0bGluZX1cbiAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgIHsuLi5MQVlFUl9WSVNfQ09ORklHUy50aGlja25lc3N9XG4gICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgbGFiZWw9e2ZhbHNlfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17IWxheWVyLmNvbmZpZy52aXNDb25maWcub3V0bGluZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuICAgICAgICApIDogbnVsbH1cblxuICAgICAgICB7LyogdGV4dCBsYWJlbCAqL31cbiAgICAgICAgPFRleHRMYWJlbFBhbmVsXG4gICAgICAgICAgdmlzQ29uZmlndXJhdG9yUHJvcHM9e3Zpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgIGxheWVyQ29uZmlndXJhdG9yUHJvcHM9e2xheWVyQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgdGV4dExhYmVsPXtsYXllci5jb25maWcudGV4dExhYmVsfVxuICAgICAgICAvPlxuICAgICAgICB7LyogaGlnaCBwcmVjaXNpb24gKi99XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwXG4gICAgICAgICAgey4uLkxBWUVSX1ZJU19DT05GSUdTWydoaS1wcmVjaXNpb24nXX1cbiAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgIC8+XG4gICAgICA8L1N0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICk7XG4gIH1cblxuICBfcmVuZGVyQ2x1c3RlckxheWVyQ29uZmlnKHtcbiAgICBsYXllcixcbiAgICB2aXNDb25maWd1cmF0b3JQcm9wcyxcbiAgICBsYXllckNvbmZpZ3VyYXRvclByb3BzLFxuICAgIGxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzXG4gIH0pIHtcbiAgICByZXR1cm4gKFxuICAgICAgPFN0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICAgICB7LyogQ29sb3IgKi99XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsnY29sb3InfSBjb2xsYXBzaWJsZT5cbiAgICAgICAgICA8Q29sb3JSYW5nZUNvbmZpZyB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgPENvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgPEFnZ3JDb2xvclNjYWxlU2VsZWN0b3Igey4uLmxheWVyQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgICA8Q2hhbm5lbEJ5VmFsdWVTZWxlY3RvclxuICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5jb2xvcn1cbiAgICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIHtsYXllci52aXNDb25maWdTZXR0aW5ncy5jb2xvckFnZ3JlZ2F0aW9uLmNvbmRpdGlvbihsYXllci5jb25maWcpID9cbiAgICAgICAgICAgICAgPEFnZ3JlZ2F0aW9uVHlwZVNlbGVjdG9yXG4gICAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmNvbG9yQWdncmVnYXRpb259XG4gICAgICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLmNvbG9yfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA6IG51bGx9XG4gICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5vcGFjaXR5fVxuICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvQ29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cblxuICAgICAgICB7LyogQ2x1c3RlciBSYWRpdXMgKi99XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsncmFkaXVzJ30gY29sbGFwc2libGU+XG4gICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmNsdXN0ZXJSYWRpdXN9XG4gICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8Q29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5yYWRpdXNSYW5nZX1cbiAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG4gICAgICA8L1N0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICk7XG4gIH1cblxuICBfcmVuZGVySGVhdG1hcExheWVyQ29uZmlnKHtcbiAgICBsYXllcixcbiAgICB2aXNDb25maWd1cmF0b3JQcm9wcyxcbiAgICBsYXllckNvbmZpZ3VyYXRvclByb3BzLFxuICAgIGxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzXG4gIH0pIHtcbiAgICByZXR1cm4gKFxuICAgICAgPFN0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICAgICB7LyogQ29sb3IgKi99XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsnY29sb3InfSBjb2xsYXBzaWJsZT5cbiAgICAgICAgICA8Q29sb3JSYW5nZUNvbmZpZyB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgPENvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3Mub3BhY2l0eX1cbiAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG4gICAgICAgIHsvKiBSYWRpdXMgKi99XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsncmFkaXVzJ30+XG4gICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnJhZGl1c31cbiAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgIGxhYmVsPXtmYWxzZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG4gICAgICAgIHsvKiBXZWlnaHQgKi99XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsnd2VpZ2h0J30+XG4gICAgICAgICAgPENoYW5uZWxCeVZhbHVlU2VsZWN0b3JcbiAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLndlaWdodH1cbiAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAvPlxuICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG4gICAgICA8L1N0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICk7XG4gIH1cblxuICBfcmVuZGVyR3JpZExheWVyQ29uZmlnKHByb3BzKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlbmRlckFnZ3JlZ2F0aW9uTGF5ZXJDb25maWcocHJvcHMpO1xuICB9XG5cbiAgX3JlbmRlckhleGFnb25MYXllckNvbmZpZyhwcm9wcykge1xuICAgIHJldHVybiB0aGlzLl9yZW5kZXJBZ2dyZWdhdGlvbkxheWVyQ29uZmlnKHByb3BzKTtcbiAgfVxuXG4gIF9yZW5kZXJBZ2dyZWdhdGlvbkxheWVyQ29uZmlnKHtcbiAgICBsYXllcixcbiAgICB2aXNDb25maWd1cmF0b3JQcm9wcyxcbiAgICBsYXllckNvbmZpZ3VyYXRvclByb3BzLFxuICAgIGxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzXG4gIH0pIHtcbiAgICBjb25zdCB7Y29uZmlnfSA9IGxheWVyO1xuICAgIGNvbnN0IHtcbiAgICAgIHZpc0NvbmZpZzoge2VuYWJsZTNkfVxuICAgIH0gPSBjb25maWc7XG4gICAgY29uc3QgZWxldmF0aW9uQnlEZXNjcmlwdGlvbiA9XG4gICAgICAnV2hlbiBvZmYsIGhlaWdodCBpcyBiYXNlZCBvbiBjb3VudCBvZiBwb2ludHMnO1xuICAgIGNvbnN0IGNvbG9yQnlEZXNjcmlwdGlvbiA9ICdXaGVuIG9mZiwgY29sb3IgaXMgYmFzZWQgb24gY291bnQgb2YgcG9pbnRzJztcblxuICAgIHJldHVybiAoXG4gICAgICA8U3R5bGVkTGF5ZXJWaXN1YWxDb25maWd1cmF0b3I+XG4gICAgICAgIHsvKiBDb2xvciAqL31cbiAgICAgICAgPExheWVyQ29uZmlnR3JvdXAgbGFiZWw9eydjb2xvcid9IGNvbGxhcHNpYmxlPlxuICAgICAgICAgIDxDb2xvclJhbmdlQ29uZmlnIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICA8Q29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgICA8QWdnckNvbG9yU2NhbGVTZWxlY3RvciB7Li4ubGF5ZXJDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLmNvbG9yfVxuICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAge2xheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmNvbG9yQWdncmVnYXRpb24uY29uZGl0aW9uKGxheWVyLmNvbmZpZykgPyAoXG4gICAgICAgICAgICAgIDxBZ2dyZWdhdGlvblR5cGVTZWxlY3RvclxuICAgICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5jb2xvckFnZ3JlZ2F0aW9ufVxuICAgICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgICAgICBkZXNjcmVpcHRpb249e2NvbG9yQnlEZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5jb2xvcn1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAge2xheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnBlcmNlbnRpbGUgJiYgbGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MucGVyY2VudGlsZS5jb25kaXRpb24obGF5ZXIuY29uZmlnKSA/IChcbiAgICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5wZXJjZW50aWxlfVxuICAgICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3Mub3BhY2l0eX1cbiAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG5cbiAgICAgICAgey8qIENlbGwgc2l6ZSAqL31cbiAgICAgICAgPExheWVyQ29uZmlnR3JvdXAgbGFiZWw9eydyYWRpdXMnfSBjb2xsYXBzaWJsZT5cbiAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3Mud29ybGRVbml0U2l6ZX1cbiAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxDb25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmNvdmVyYWdlfVxuICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvQ29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cblxuICAgICAgICB7LyogRWxldmF0aW9uICovfVxuICAgICAgICB7bGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuZW5hYmxlM2QgP1xuICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwXG4gICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuZW5hYmxlM2R9XG4gICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICBjb2xsYXBzaWJsZVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmVsZXZhdGlvblNjYWxlfVxuICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPENvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgICA8Q2hhbm5lbEJ5VmFsdWVTZWxlY3RvclxuICAgICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5zaXplfVxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uPXtlbGV2YXRpb25CeURlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXshZW5hYmxlM2R9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIHtsYXllci52aXNDb25maWdTZXR0aW5ncy5zaXplQWdncmVnYXRpb24uY29uZGl0aW9uKGxheWVyLmNvbmZpZykgPyAoXG4gICAgICAgICAgICAgICAgPEFnZ3JlZ2F0aW9uVHlwZVNlbGVjdG9yXG4gICAgICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3Muc2l6ZUFnZ3JlZ2F0aW9ufVxuICAgICAgICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuc2l6ZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAge2xheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmVsZXZhdGlvblBlcmNlbnRpbGUuY29uZGl0aW9uKFxuICAgICAgICAgICAgICAgIGxheWVyLmNvbmZpZ1xuICAgICAgICAgICAgICApID8gKFxuICAgICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5lbGV2YXRpb25QZXJjZW50aWxlfVxuICAgICAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgPC9Db25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+IDogbnVsbH1cblxuICAgICAgICB7LyogSGlnaCBQcmVjaXNpb24gKi99XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwXG4gICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzWydoaS1wcmVjaXNpb24nXX1cbiAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgIC8+XG4gICAgICA8L1N0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICk7XG4gIH1cblxuICAvLyBUT0RPOiBTaGFuIG1vdmUgdGhlc2UgaW50byBsYXllciBjbGFzc1xuICBfcmVuZGVySGV4YWdvbklkTGF5ZXJDb25maWcoe1xuICAgIGxheWVyLFxuICAgIHZpc0NvbmZpZ3VyYXRvclByb3BzLFxuICAgIGxheWVyQ29uZmlndXJhdG9yUHJvcHMsXG4gICAgbGF5ZXJDaGFubmVsQ29uZmlnUHJvcHNcbiAgfSkge1xuICAgIHJldHVybiAoXG4gICAgICA8U3R5bGVkTGF5ZXJWaXN1YWxDb25maWd1cmF0b3I+XG4gICAgICAgIHsvKiBDb2xvciAqL31cbiAgICAgICAgPExheWVyQ29uZmlnR3JvdXAgbGFiZWw9eydjb2xvcid9IGNvbGxhcHNpYmxlPlxuICAgICAgICAgIHtsYXllci5jb25maWcuY29sb3JGaWVsZCA/IChcbiAgICAgICAgICAgIDxDb2xvclJhbmdlQ29uZmlnIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPExheWVyQ29sb3JTZWxlY3RvciB7Li4ubGF5ZXJDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxDb25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLmNvbG9yfVxuICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICB7Li4uTEFZRVJfVklTX0NPTkZJR1Mub3BhY2l0eX1cbiAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG5cbiAgICAgICAgey8qIENvdmVyYWdlICovfVxuICAgICAgICA8TGF5ZXJDb25maWdHcm91cCBsYWJlbD17J2NvdmVyYWdlJ30gY29sbGFwc2libGU+XG4gICAgICAgICAgeyFsYXllci5jb25maWcuY292ZXJhZ2VGaWVsZCA/IChcbiAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmNvdmVyYWdlfVxuICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgIGxhYmVsPXtmYWxzZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmNvdmVyYWdlUmFuZ2V9XG4gICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgbGFiZWw9e2ZhbHNlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxDb25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLmNvdmVyYWdlfVxuICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvQ29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cblxuICAgICAgICB7LyogaGVpZ2h0ICovfVxuICAgICAgICA8TGF5ZXJDb25maWdHcm91cFxuICAgICAgICAgIHsuLi5MQVlFUl9WSVNfQ09ORklHUy5lbmFibGUzZH1cbiAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgY29sbGFwc2libGVcbiAgICAgICAgPlxuICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgIHsuLi5MQVlFUl9WSVNfQ09ORklHUy5lbGV2YXRpb25SYW5nZX1cbiAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgIGxhYmVsPXtmYWxzZX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxDb25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLnNpemV9XG4gICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9Db25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuICAgICAgICB7LyogaGlnaCBwcmVjaXNpb24gKi99XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwXG4gICAgICAgICAgey4uLkxBWUVSX1ZJU19DT05GSUdTWydoaS1wcmVjaXNpb24nXX1cbiAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgIC8+XG4gICAgICA8L1N0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICk7XG4gIH1cblxuICBfcmVuZGVyQXJjTGF5ZXJDb25maWcoYXJncykge1xuICAgIHJldHVybiB0aGlzLl9yZW5kZXJMaW5lTGF5ZXJDb25maWcoYXJncyk7XG4gIH1cblxuICBfcmVuZGVyTGluZUxheWVyQ29uZmlnKHtcbiAgICBsYXllcixcbiAgICB2aXNDb25maWd1cmF0b3JQcm9wcyxcbiAgICBsYXllckNvbmZpZ3VyYXRvclByb3BzLFxuICAgIGxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzXG4gIH0pIHtcbiAgICByZXR1cm4gKFxuICAgICAgPFN0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICAgICB7LyogQ29sb3IgKi99XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsnY29sb3InfSBjb2xsYXBzaWJsZT5cbiAgICAgICAgICB7bGF5ZXIuY29uZmlnLmNvbG9yRmllbGQgPyAoXG4gICAgICAgICAgICA8Q29sb3JSYW5nZUNvbmZpZyB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxBcmNMYXllckNvbG9yU2VsZWN0b3JcbiAgICAgICAgICAgICAgbGF5ZXI9e2xheWVyfVxuICAgICAgICAgICAgICBvbkNoYW5nZUNvbmZpZz17bGF5ZXJDb25maWd1cmF0b3JQcm9wcy5vbkNoYW5nZX1cbiAgICAgICAgICAgICAgb25DaGFuZ2VWaXNDb25maWc9e3Zpc0NvbmZpZ3VyYXRvclByb3BzLm9uQ2hhbmdlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxDb25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLmNvbG9yfVxuICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICB7Li4uTEFZRVJfVklTX0NPTkZJR1Mub3BhY2l0eX1cbiAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG5cbiAgICAgICAgey8qIHRoaWNrbmVzcyAqL31cbiAgICAgICAgPExheWVyQ29uZmlnR3JvdXAgbGFiZWw9eydzdHJva2UnfSBjb2xsYXBzaWJsZT5cbiAgICAgICAgICB7bGF5ZXIuY29uZmlnLnNpemVGaWVsZCA/IChcbiAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgey4uLkxBWUVSX1ZJU19DT05GSUdTLnN0cm9rZVdpZHRoUmFuZ2V9XG4gICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFsYXllci5jb25maWcuc2l6ZUZpZWxkfVxuICAgICAgICAgICAgICBsYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgIHsuLi5MQVlFUl9WSVNfQ09ORklHUy50aGlja25lc3N9XG4gICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgbGFiZWw9e2ZhbHNlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxDb25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLnNpemV9XG4gICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9Db25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuXG4gICAgICAgIHsvKiBoaWdoIHByZWNpc2lvbiAqL31cbiAgICAgICAgPExheWVyQ29uZmlnR3JvdXBcbiAgICAgICAgICB7Li4uTEFZRVJfVklTX0NPTkZJR1NbJ2hpLXByZWNpc2lvbiddfVxuICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgLz5cbiAgICAgIDwvU3R5bGVkTGF5ZXJWaXN1YWxDb25maWd1cmF0b3I+XG4gICAgKTtcbiAgfVxuXG4gIF9yZW5kZXJHZW9qc29uTGF5ZXJDb25maWcoe1xuICAgIGxheWVyLFxuICAgIHZpc0NvbmZpZ3VyYXRvclByb3BzLFxuICAgIGxheWVyQ29uZmlndXJhdG9yUHJvcHMsXG4gICAgbGF5ZXJDaGFubmVsQ29uZmlnUHJvcHNcbiAgfSkge1xuICAgIGNvbnN0IHtcbiAgICAgIG1ldGE6IHtmZWF0dXJlVHlwZXMgPSB7fX0sXG4gICAgICBjb25maWc6IHt2aXNDb25maWd9XG4gICAgfSA9IGxheWVyO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxTdHlsZWRMYXllclZpc3VhbENvbmZpZ3VyYXRvcj5cbiAgICAgICAgey8qIENvbG9yIEJ5ICovfVxuICAgICAgICA8TGF5ZXJDb25maWdHcm91cCBsYWJlbD17J2NvbG9yJ30gY29sbGFwc2libGU+XG4gICAgICAgICAge2xheWVyLmNvbmZpZy5jb2xvckZpZWxkID8gKFxuICAgICAgICAgICAgPENvbG9yUmFuZ2VDb25maWcgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfSAvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8TGF5ZXJDb2xvclNlbGVjdG9yIHsuLi5sYXllckNvbmZpZ3VyYXRvclByb3BzfSAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAgPENvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgPENoYW5uZWxCeVZhbHVlU2VsZWN0b3JcbiAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuY29sb3J9XG4gICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgIHsuLi5MQVlFUl9WSVNfQ09ORklHUy5vcGFjaXR5fVxuICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvQ29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cblxuICAgICAgICB7LyogRmlsbCAqL31cbiAgICAgICAge2ZlYXR1cmVUeXBlcy5wb2x5Z29uID8gKFxuICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsnZmlsbCd9XG4gICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICB7Li4uTEFZRVJfVklTX0NPTkZJR1MuZmlsbGVkfVxuICAgICAgICAgIC8+XG4gICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgIHsvKiBTdHJva2UgV2lkdGggKi99XG4gICAgICAgIHtmZWF0dXJlVHlwZXMubGluZSB8fCBmZWF0dXJlVHlwZXMucG9seWdvbiA/IChcbiAgICAgICAgICA8TGF5ZXJDb25maWdHcm91cFxuICAgICAgICAgICAgbGFiZWw9XCJzdHJva2VcIlxuICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgey4uLihmZWF0dXJlVHlwZXMucG9seWdvbiA/IExBWUVSX1ZJU19DT05GSUdTLnN0cm9rZWQgOiB7fSl9XG4gICAgICAgICAgICBjb2xsYXBzaWJsZVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtsYXllci5jb25maWcuc2l6ZUZpZWxkID8gKFxuICAgICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgICB7Li4uTEFZRVJfVklTX0NPTkZJR1Muc3Ryb2tlV2lkdGhSYW5nZX1cbiAgICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgICAgbGFiZWw9e2ZhbHNlfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICAgIHsuLi5MQVlFUl9WSVNfQ09ORklHUy50aGlja25lc3N9XG4gICAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICAgIGxhYmVsPXtmYWxzZX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8Q29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuc2l6ZX1cbiAgICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cbiAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgey8qIEVsZXZhdGlvbiAqL31cbiAgICAgICAge2ZlYXR1cmVUeXBlcy5wb2x5Z29uICYmIHZpc0NvbmZpZy5maWxsZWQgPyAoXG4gICAgICAgICAgPExheWVyQ29uZmlnR3JvdXBcbiAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgIHsuLi5MQVlFUl9WSVNfQ09ORklHUy5lbmFibGUzZH1cbiAgICAgICAgICAgIGNvbGxhcHNpYmxlXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICB7Li4uTEFZRVJfVklTX0NPTkZJR1MuZWxldmF0aW9uU2NhbGV9XG4gICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgbGFiZWw9e2ZhbHNlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxDb25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICAgICAgPENoYW5uZWxCeVZhbHVlU2VsZWN0b3JcbiAgICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5oZWlnaHR9XG4gICAgICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8VmlzQ29uZmlnU3dpdGNoXG4gICAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICAgIHsuLi5MQVlFUl9WSVNfQ09ORklHUy53aXJlZnJhbWV9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cbiAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgey8qIFJhZGl1cyAqL31cbiAgICAgICAge2ZlYXR1cmVUeXBlcy5wb2ludCA/IChcbiAgICAgICAgICA8TGF5ZXJDb25maWdHcm91cCBsYWJlbD17J3JhZGl1cyd9IGNvbGxhcHNpYmxlPlxuICAgICAgICAgICAgIHshbGF5ZXIuY29uZmlnLnJhZGl1c0ZpZWxkID8gKDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgICB7Li4uTEFZRVJfVklTX0NPTkZJR1MucmFkaXVzfVxuICAgICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgICBsYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e0Jvb2xlYW4obGF5ZXIuY29uZmlnLnJhZGl1c0ZpZWxkKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgICAgey4uLkxBWUVSX1ZJU19DT05GSUdTLnJhZGl1c1JhbmdlfVxuICAgICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgICBsYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFsYXllci5jb25maWcucmFkaXVzRmllbGR9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPENvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgICA8Q2hhbm5lbEJ5VmFsdWVTZWxlY3RvclxuICAgICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLnJhZGl1c31cbiAgICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cbiAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgey8qIGhpZ2ggcHJlY2lzaW9uICovfVxuICAgICAgICA8TGF5ZXJDb25maWdHcm91cFxuICAgICAgICAgIHsuLi5MQVlFUl9WSVNfQ09ORklHU1snaGktcHJlY2lzaW9uJ119XG4gICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAvPlxuICAgICAgPC9TdHlsZWRMYXllclZpc3VhbENvbmZpZ3VyYXRvcj5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGxheWVyLFxuICAgICAgZGF0YXNldHMsXG4gICAgICB1cGRhdGVMYXllckNvbmZpZyxcbiAgICAgIGxheWVyVHlwZU9wdGlvbnMsXG4gICAgICB1cGRhdGVMYXllclR5cGVcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7ZmllbGRzID0gW10sIGZpZWxkUGFpcnN9ID0gbGF5ZXIuY29uZmlnLmRhdGFJZFxuICAgICAgPyBkYXRhc2V0c1tsYXllci5jb25maWcuZGF0YUlkXVxuICAgICAgOiB7fTtcbiAgICBjb25zdCB7Y29uZmlnfSA9IGxheWVyO1xuXG4gICAgY29uc3QgY29tbW9uQ29uZmlnUHJvcCA9IHtcbiAgICAgIGxheWVyLFxuICAgICAgZmllbGRzXG4gICAgfTtcblxuICAgIGNvbnN0IHZpc0NvbmZpZ3VyYXRvclByb3BzID0ge1xuICAgICAgLi4uY29tbW9uQ29uZmlnUHJvcCxcbiAgICAgIG9uQ2hhbmdlOiB0aGlzLnByb3BzLnVwZGF0ZUxheWVyVmlzQ29uZmlnXG4gICAgfTtcblxuICAgIGNvbnN0IGxheWVyQ29uZmlndXJhdG9yUHJvcHMgPSB7XG4gICAgICAuLi5jb21tb25Db25maWdQcm9wLFxuICAgICAgb25DaGFuZ2U6IHVwZGF0ZUxheWVyQ29uZmlnXG4gICAgfTtcblxuICAgIGNvbnN0IGxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzID0ge1xuICAgICAgLi4uY29tbW9uQ29uZmlnUHJvcCxcbiAgICAgIG9uQ2hhbmdlOiB0aGlzLnByb3BzLnVwZGF0ZUxheWVyVmlzdWFsQ2hhbm5lbENvbmZpZ1xuICAgIH07XG5cbiAgICBjb25zdCByZW5kZXJUZW1wbGF0ZSA9XG4gICAgICBsYXllci50eXBlICYmIGBfcmVuZGVyJHtjYXBpdGFsaXplRmlyc3RMZXR0ZXIobGF5ZXIudHlwZSl9TGF5ZXJDb25maWdgO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxTdHlsZWRMYXllckNvbmZpZ3VyYXRvcj5cbiAgICAgICAge2xheWVyLmxheWVySW5mb01vZGFsID8gPEhvd1RvQnV0dG9uIG9uQ2xpY2s9eygpID0+IHRoaXMucHJvcHMub3Blbk1vZGFsKGxheWVyLmxheWVySW5mb01vZGFsKX0vPiA6IG51bGx9XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsnYmFzaWMnfSBjb2xsYXBzaWJsZSBleHBhbmRlZD17IWxheWVyLmhhc0FsbENvbHVtbnMoKX0+XG4gICAgICAgICAgPExheWVyVHlwZVNlbGVjdG9yXG4gICAgICAgICAgICBsYXllcj17bGF5ZXJ9XG4gICAgICAgICAgICBsYXllclR5cGVPcHRpb25zPXtsYXllclR5cGVPcHRpb25zfVxuICAgICAgICAgICAgb25TZWxlY3Q9e3VwZGF0ZUxheWVyVHlwZX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxDb25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICAgIHtPYmplY3Qua2V5cyhkYXRhc2V0cykubGVuZ3RoID4gMSAmJiAoXG4gICAgICAgICAgICAgIDxTb3VyY2VEYXRhU2VsZWN0b3JcbiAgICAgICAgICAgICAgICBkYXRhc2V0cz17ZGF0YXNldHN9XG4gICAgICAgICAgICAgICAgaWQ9e2xheWVyLmlkfVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtsYXllci50eWVwICYmIGNvbmZpZy5jb2x1bW5zfVxuICAgICAgICAgICAgICAgIGRhdGFJZD17Y29uZmlnLmRhdGFJZH1cbiAgICAgICAgICAgICAgICBvblNlbGVjdD17dmFsdWUgPT4gdXBkYXRlTGF5ZXJDb25maWcoe2RhdGFJZDogdmFsdWV9KX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8TGF5ZXJDb2x1bW5Db25maWdcbiAgICAgICAgICAgICAgbGF5ZXI9e2xheWVyfVxuICAgICAgICAgICAgICBmaWVsZHM9e2ZpZWxkc31cbiAgICAgICAgICAgICAgZmllbGRQYWlycz17ZmllbGRQYWlyc31cbiAgICAgICAgICAgICAgdXBkYXRlTGF5ZXJDb25maWc9e3VwZGF0ZUxheWVyQ29uZmlnfVxuICAgICAgICAgICAgICB1cGRhdGVMYXllclR5cGU9e3RoaXMucHJvcHMudXBkYXRlTGF5ZXJUeXBlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG4gICAgICAgIHt0aGlzW3JlbmRlclRlbXBsYXRlXSAmJlxuICAgICAgICAgIHRoaXNbcmVuZGVyVGVtcGxhdGVdKHtcbiAgICAgICAgICAgIGxheWVyLFxuICAgICAgICAgICAgdmlzQ29uZmlndXJhdG9yUHJvcHMsXG4gICAgICAgICAgICBsYXllckNoYW5uZWxDb25maWdQcm9wcyxcbiAgICAgICAgICAgIGxheWVyQ29uZmlndXJhdG9yUHJvcHNcbiAgICAgICAgICB9KX1cbiAgICAgIDwvU3R5bGVkTGF5ZXJDb25maWd1cmF0b3I+XG4gICAgKTtcbiAgfVxufVxuXG4vKlxuICogQ29tcG9uZW50aXplIGNvbmZpZyBjb21wb25lbnQgaW50byBwdXJlIGZ1bmN0aW9uYWwgY29tcG9uZW50c1xuICovXG5cbmNvbnN0IFN0eWxlZEhvd1RvQnV0dG9uID0gc3R5bGVkLmRpdmBcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMTJweDtcbiAgdG9wOiAtNHB4O1xuYDtcblxuZXhwb3J0IGNvbnN0IEhvd1RvQnV0dG9uID0gKHtvbkNsaWNrfSkgPT4gKFxuICA8U3R5bGVkSG93VG9CdXR0b24+XG4gICAgPEJ1dHRvbiBsaW5rIHNtYWxsIG9uQ2xpY2s9e29uQ2xpY2t9PkhvdyB0bzwvQnV0dG9uPlxuICA8L1N0eWxlZEhvd1RvQnV0dG9uPlxuKTtcblxuZXhwb3J0IGNvbnN0IExheWVyQ29sb3JTZWxlY3RvciA9ICh7bGF5ZXIsIG9uQ2hhbmdlLCBsYWJlbH0pID0+IChcbiAgPFNpZGVQYW5lbFNlY3Rpb24gZGlzYWJsZWQ9e2xheWVyLmNvbmZpZy5jb2xvckZpZWxkfT5cbiAgICA8Q29sb3JTZWxlY3RvclxuICAgICAgY29sb3JTZXRzPXtbXG4gICAgICAgIHtcbiAgICAgICAgICBzZWxlY3RlZENvbG9yOiBsYXllci5jb25maWcuY29sb3IsXG4gICAgICAgICAgc2V0Q29sb3I6IHJnYlZhbHVlID0+IG9uQ2hhbmdlKHtjb2xvcjogcmdiVmFsdWV9KVxuICAgICAgICB9XG4gICAgICBdfVxuICAgIC8+XG4gIDwvU2lkZVBhbmVsU2VjdGlvbj5cbik7XG5cbmV4cG9ydCBjb25zdCBBcmNMYXllckNvbG9yU2VsZWN0b3IgPSAoe1xuICBsYXllcixcbiAgb25DaGFuZ2VDb25maWcsXG4gIG9uQ2hhbmdlVmlzQ29uZmlnXG59KSA9PiAoXG4gIDxTaWRlUGFuZWxTZWN0aW9uPlxuICAgIDxDb2xvclNlbGVjdG9yXG4gICAgICBjb2xvclNldHM9e1tcbiAgICAgICAge1xuICAgICAgICAgIHNlbGVjdGVkQ29sb3I6IGxheWVyLmNvbmZpZy5jb2xvcixcbiAgICAgICAgICBzZXRDb2xvcjogcmdiVmFsdWUgPT4gb25DaGFuZ2VDb25maWcoe2NvbG9yOiByZ2JWYWx1ZX0pLFxuICAgICAgICAgIGxhYmVsOiAnU291cmNlJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc2VsZWN0ZWRDb2xvcjpcbiAgICAgICAgICAgIGxheWVyLmNvbmZpZy52aXNDb25maWcudGFyZ2V0Q29sb3IgfHwgbGF5ZXIuY29uZmlnLmNvbG9yLFxuICAgICAgICAgIHNldENvbG9yOiByZ2JWYWx1ZSA9PiBvbkNoYW5nZVZpc0NvbmZpZyh7dGFyZ2V0Q29sb3I6IHJnYlZhbHVlfSksXG4gICAgICAgICAgbGFiZWw6ICdUYXJnZXQnXG4gICAgICAgIH1cbiAgICAgIF19XG4gICAgLz5cbiAgPC9TaWRlUGFuZWxTZWN0aW9uPlxuKTtcblxuZXhwb3J0IGNvbnN0IENvbG9yUmFuZ2VDb25maWcgPSAoe2xheWVyLCBvbkNoYW5nZX0pID0+IChcbiAgPFNpZGVQYW5lbFNlY3Rpb24+XG4gICAgPENvbG9yU2VsZWN0b3JcbiAgICAgIGNvbG9yU2V0cz17W1xuICAgICAgICB7XG4gICAgICAgICAgc2VsZWN0ZWRDb2xvcjogbGF5ZXIuY29uZmlnLnZpc0NvbmZpZy5jb2xvclJhbmdlLFxuICAgICAgICAgIGlzUmFuZ2U6IHRydWUsXG4gICAgICAgICAgc2V0Q29sb3I6IGNvbG9yUmFuZ2UgPT4gb25DaGFuZ2Uoe2NvbG9yUmFuZ2V9KVxuICAgICAgICB9XG4gICAgICBdfVxuICAgIC8+XG4gIDwvU2lkZVBhbmVsU2VjdGlvbj5cbik7XG5cbmV4cG9ydCBjb25zdCBDaGFubmVsQnlWYWx1ZVNlbGVjdG9yID0gKHtcbiAgbGF5ZXIsXG4gIGNoYW5uZWwsXG4gIG9uQ2hhbmdlLFxuICBmaWVsZHMsXG4gIGRlc2NyaXB0aW9uXG59KSA9PiB7XG4gIGNvbnN0IHtcbiAgICBjaGFubmVsU2NhbGVUeXBlLFxuICAgIGRvbWFpbixcbiAgICBmaWVsZCxcbiAgICBrZXksXG4gICAgcHJvcGVydHksXG4gICAgcmFuZ2UsXG4gICAgc2NhbGUsXG4gICAgZGVmYXVsdE1lYXN1cmUsXG4gICAgc3VwcG9ydGVkRmllbGRUeXBlc1xuICB9ID0gY2hhbm5lbDtcbiAgY29uc3QgY2hhbm5lbFN1cHBvcnRlZEZpZWxkVHlwZXMgPSBzdXBwb3J0ZWRGaWVsZFR5cGVzIHx8IENIQU5ORUxfU0NBTEVfU1VQUE9SVEVEX0ZJRUxEU1tjaGFubmVsU2NhbGVUeXBlXTtcbiAgY29uc3Qgc3VwcG9ydGVkRmllbGRzID0gZmllbGRzLmZpbHRlcigoe3R5cGV9KSA9PlxuICAgIGNoYW5uZWxTdXBwb3J0ZWRGaWVsZFR5cGVzLmluY2x1ZGVzKHR5cGUpXG4gICk7XG4gIGNvbnN0IHNjYWxlT3B0aW9ucyA9IGxheWVyLmdldFNjYWxlT3B0aW9ucyhjaGFubmVsLmtleSk7XG4gIGNvbnN0IHNob3dTY2FsZSA9ICFsYXllci5pc0FnZ3JlZ2F0ZWQgJiYgbGF5ZXIuY29uZmlnW3NjYWxlXSAmJiBzY2FsZU9wdGlvbnMubGVuZ3RoID4gMTtcbiAgY29uc3QgZGVmYXVsdERlc2NyaXB0aW9uID0gYENhbGN1bGF0ZSAke3Byb3BlcnR5fSBiYXNlZCBvbiBzZWxlY3RlZCBmaWVsZGA7XG5cbiAgcmV0dXJuIChcbiAgICA8VmlzQ29uZmlnQnlGaWVsZFNlbGVjdG9yXG4gICAgICBjaGFubmVsPXtjaGFubmVsLmtleX1cbiAgICAgIGRlc2NyaXB0aW9uPXtkZXNjcmlwdGlvbiB8fCBkZWZhdWx0RGVzY3JpcHRpb259XG4gICAgICBkb21haW49e2xheWVyLmNvbmZpZ1tkb21haW5dfVxuICAgICAgZmllbGRzPXtzdXBwb3J0ZWRGaWVsZHN9XG4gICAgICBpZD17bGF5ZXIuaWR9XG4gICAgICBrZXk9e2Ake2tleX0tY2hhbm5lbC1zZWxlY3RvcmB9XG4gICAgICBwcm9wZXJ0eT17cHJvcGVydHl9XG4gICAgICBwbGFjZWhvbGRlcj17ZGVmYXVsdE1lYXN1cmUgfHwgJ1NlbGVjdCBhIGZpZWxkJ31cbiAgICAgIHJhbmdlPXtsYXllci5jb25maWcudmlzQ29uZmlnW3JhbmdlXX1cbiAgICAgIHNjYWxlT3B0aW9ucz17c2NhbGVPcHRpb25zfVxuICAgICAgc2NhbGVUeXBlPXtzY2FsZSA/IGxheWVyLmNvbmZpZ1tzY2FsZV0gOiBudWxsfVxuICAgICAgc2VsZWN0ZWRGaWVsZD17bGF5ZXIuY29uZmlnW2ZpZWxkXX1cbiAgICAgIHNob3dTY2FsZT17c2hvd1NjYWxlfVxuICAgICAgdXBkYXRlRmllbGQ9e3ZhbCA9PiBvbkNoYW5nZSh7W2ZpZWxkXTogdmFsfSwga2V5KX1cbiAgICAgIHVwZGF0ZVNjYWxlPXt2YWwgPT4gb25DaGFuZ2Uoe1tzY2FsZV06IHZhbH0sIGtleSl9XG4gICAgLz5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBBZ2dyQ29sb3JTY2FsZVNlbGVjdG9yID0gKHtsYXllciwgb25DaGFuZ2V9KSA9PiB7XG4gIGNvbnN0IHNjYWxlT3B0aW9ucyA9IGxheWVyLmdldFNjYWxlT3B0aW9ucygnY29sb3InKTtcbiAgcmV0dXJuIChcbiAgICBBcnJheS5pc0FycmF5KHNjYWxlT3B0aW9ucykgJiYgc2NhbGVPcHRpb25zLmxlbmd0aCA+IDEgP1xuICAgICAgPERpbWVuc2lvblNjYWxlU2VsZWN0b3JcbiAgICAgICAgbGFiZWw9XCJDb2xvciBTY2FsZVwiXG4gICAgICAgIG9wdGlvbnM9e3NjYWxlT3B0aW9uc31cbiAgICAgICAgc2NhbGVUeXBlPXtsYXllci5jb25maWcuY29sb3JTY2FsZX1cbiAgICAgICAgb25TZWxlY3Q9e3ZhbCA9PiBvbkNoYW5nZSh7Y29sb3JTY2FsZTogdmFsfSwgJ2NvbG9yJyl9XG4gICAgICAvPiA6IG51bGxcbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBBZ2dyZWdhdGlvblR5cGVTZWxlY3RvciA9ICh7bGF5ZXIsIGNoYW5uZWwsIG9uQ2hhbmdlfSkgPT4ge1xuICBjb25zdCB7ZmllbGQsIGFnZ3JlZ2F0aW9uLCBrZXl9ID0gY2hhbm5lbDtcbiAgY29uc3Qgc2VsZWN0ZWRGaWVsZCA9IGxheWVyLmNvbmZpZ1tmaWVsZF07XG4gIGNvbnN0IHt2aXNDb25maWd9ID0gbGF5ZXIuY29uZmlnO1xuXG4gIC8vIGFnZ3JlZ2F0aW9uIHNob3VsZCBvbmx5IGJlIHNlbGVjdGFibGUgd2hlbiBmaWVsZCBpcyBzZWxlY3RlZFxuICBjb25zdCBhZ2dyZWdhdGlvbk9wdGlvbnMgPSBsYXllci5nZXRBZ2dyZWdhdGlvbk9wdGlvbnMoa2V5KTtcblxuICByZXR1cm4gKFxuICAgIDxTaWRlUGFuZWxTZWN0aW9uPlxuICAgICAgPFBhbmVsTGFiZWw+e2BBZ2dyZWdhdGUgJHtzZWxlY3RlZEZpZWxkLm5hbWV9IGJ5YH08L1BhbmVsTGFiZWw+XG4gICAgICA8SXRlbVNlbGVjdG9yXG4gICAgICAgIHNlbGVjdGVkSXRlbXM9e3Zpc0NvbmZpZ1thZ2dyZWdhdGlvbl19XG4gICAgICAgIG9wdGlvbnM9e2FnZ3JlZ2F0aW9uT3B0aW9uc31cbiAgICAgICAgbXVsdGlTZWxlY3Q9e2ZhbHNlfVxuICAgICAgICBzZWFyY2hhYmxlPXtmYWxzZX1cbiAgICAgICAgb25DaGFuZ2U9e3ZhbHVlID0+XG4gICAgICAgICAgb25DaGFuZ2UoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHZpc0NvbmZpZzoge1xuICAgICAgICAgICAgICAgIC4uLmxheWVyLmNvbmZpZy52aXNDb25maWcsXG4gICAgICAgICAgICAgICAgW2FnZ3JlZ2F0aW9uXTogdmFsdWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYW5uZWwua2V5XG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAvPlxuICAgIDwvU2lkZVBhbmVsU2VjdGlvbj5cbiAgKTtcbn07XG4vKiBlc2xpbnQtZW5hYmxlIG1heC1wYXJhbXMgKi9cbiJdfQ==