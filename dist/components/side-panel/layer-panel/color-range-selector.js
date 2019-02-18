"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash.uniq"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _itemSelector = _interopRequireDefault(require("../../common/item-selector/item-selector"));

var _styledComponents2 = require("../../common/styled-components");

var _rangeSlider = _interopRequireDefault(require("../../common/range-slider"));

var _switch = _interopRequireDefault(require("../../common/switch"));

var _colorPalette = _interopRequireDefault(require("./color-palette"));

var _colorRanges = require("../../../constants/color-ranges");

var _dataUtils = require("../../../utils/data-utils");

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  padding: 0 8px;\n  :hover {\n    background-color: ", ";\n    cursor: pointer;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin-bottom: 8px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  .color-palette__config__label {\n    flex-grow: 1;\n  }\n  .color-palette__config__select {\n    flex-grow: 1;\n  }\n  .item-selector .item-selector__dropdown {\n    ", ";\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  padding-bottom: 12px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  padding: 12px 12px 0 12px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var ALL_TYPES = (0, _lodash.default)(_colorRanges.COLOR_RANGES.map(function (c) {
  return c.type;
}).concat(['all']));
var ALL_STEPS = (0, _lodash.default)(_colorRanges.COLOR_RANGES.map(function (d) {
  return d.colors.length;
})).sort(_dataUtils.numberSort);

var StyledColorConfig = _styledComponents.default.div(_templateObject());

var ColorRangeSelector = _styledComponents.default.div(_templateObject2());

var ColorRangeSelect =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ColorRangeSelect, _Component);

  function ColorRangeSelect() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, ColorRangeSelect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(ColorRangeSelect)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      config: {
        type: {
          type: 'select',
          value: 'all',
          options: ALL_TYPES
        },
        steps: {
          type: 'select',
          value: 6,
          options: ALL_STEPS
        },
        reversed: {
          type: 'switch',
          value: false,
          options: [true, false]
        }
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_updateConfig", function (_ref) {
      var key = _ref.key,
          value = _ref.value;
      var currentValue = _this.state.config[key].value;

      if (value !== currentValue) {
        _this.setState({
          config: (0, _objectSpread3.default)({}, _this.state.config, (0, _defineProperty2.default)({}, key, (0, _objectSpread3.default)({}, _this.state.config[key], {
            value: value
          })))
        });
      }
    });
    return _this;
  }

  (0, _createClass2.default)(ColorRangeSelect, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var config = this.state.config;
      return _react.default.createElement(ColorRangeSelector, {
        className: "color-range-selector"
      }, _react.default.createElement(StyledColorConfig, null, Object.keys(config).map(function (key) {
        return _react.default.createElement(PaletteConfig, {
          key: key,
          label: key,
          config: config[key],
          onChange: function onChange(value) {
            return _this2._updateConfig({
              key: key,
              value: value
            });
          }
        });
      })), _react.default.createElement(ColorPaletteGroup, {
        config: config,
        colorRanges: this.props.colorRanges,
        onSelect: this.props.onSelectColorRange,
        selected: this.props.selectedColorRange
      }));
    }
  }]);
  return ColorRangeSelect;
}(_react.Component);

exports.default = ColorRangeSelect;
(0, _defineProperty2.default)(ColorRangeSelect, "propTypes", {
  colorRanges: _propTypes.default.arrayOf(_propTypes.default.any),
  selectedColorRange: _propTypes.default.object,
  onSelectColorRange: _propTypes.default.func.isRequired
});
(0, _defineProperty2.default)(ColorRangeSelect, "defaultProps", {
  colorRanges: _colorRanges.COLOR_RANGES,
  onSelectColorRange: function onSelectColorRange() {}
});

var StyledPaletteConfig = _styledComponents.default.div(_templateObject3(), function (props) {
  return props.theme.secondaryInput;
});

var PaletteConfig = function PaletteConfig(_ref2) {
  var category = _ref2.category,
      label = _ref2.label,
      _ref2$config = _ref2.config,
      type = _ref2$config.type,
      value = _ref2$config.value,
      options = _ref2$config.options,
      _onChange = _ref2.onChange;
  return _react.default.createElement(StyledPaletteConfig, {
    className: "color-palette__config",
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, _react.default.createElement("div", {
    className: "color-palette__config__label"
  }, _react.default.createElement(_styledComponents2.PanelLabel, null, label)), type === 'select' && _react.default.createElement("div", {
    className: "color-palette__config__select"
  }, _react.default.createElement(_itemSelector.default, {
    selectedItems: value,
    options: options,
    multiSelect: false,
    searchable: false,
    onChange: _onChange
  })), type === 'slider' && _react.default.createElement("div", {
    className: "color-palette__config__slider"
  }, _react.default.createElement("div", {
    className: "color-palette__config__slider__slider"
  }, _react.default.createElement(_rangeSlider.default, {
    range: options,
    value0: options[0],
    value1: value,
    step: 1,
    isRanged: false,
    showInput: false,
    onChange: function onChange(val) {
      return _onChange(val[1]);
    }
  })), _react.default.createElement("div", {
    className: "color-palette__config__slider__number"
  }, value)), type === 'switch' && _react.default.createElement(_switch.default, {
    checked: value,
    id: "".concat(category, "-").concat(label, "-toggle"),
    onChange: function onChange() {
      return _onChange(!value);
    },
    secondary: true
  }));
};

var StyledColorRange = _styledComponents.default.div(_templateObject4(), function (props) {
  return props.theme.panelBackgroundHover;
});

var ColorPaletteGroup = function ColorPaletteGroup(_ref3) {
  var _ref3$config = _ref3.config,
      config = _ref3$config === void 0 ? {} : _ref3$config,
      onSelect = _ref3.onSelect,
      selected = _ref3.selected,
      colorRanges = _ref3.colorRanges;
  var steps = config.steps,
      reversed = config.reversed,
      type = config.type;
  var filtered = colorRanges.filter(function (colorRange) {
    var isType = !type || type.value === 'all' || type.value === colorRange.type;
    var isStep = !steps || Number(steps.value) === colorRange.colors.length;
    return isType && isStep;
  });
  var isReversed = Boolean(reversed && reversed.value);
  return _react.default.createElement("div", {
    className: "color-palette__group"
  }, filtered.map(function (colorRange) {
    return _react.default.createElement(StyledColorRange, {
      className: "color-ranges",
      key: colorRange.name,
      onClick: function onClick(e) {
        return onSelect((0, _objectSpread3.default)({}, colorRange, {
          reversed: isReversed,
          colors: isReversed ? colorRange.colors.slice().reverse() : colorRange.colors
        }), e);
      }
    }, _react.default.createElement(_colorPalette.default, {
      colors: colorRange.colors,
      isReversed: isReversed,
      isSelected: colorRange.name === selected.name && isReversed === Boolean(selected.reversed)
    }));
  }));
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItcGFuZWwvY29sb3ItcmFuZ2Utc2VsZWN0b3IuanMiXSwibmFtZXMiOlsiQUxMX1RZUEVTIiwiQ09MT1JfUkFOR0VTIiwibWFwIiwiYyIsInR5cGUiLCJjb25jYXQiLCJBTExfU1RFUFMiLCJkIiwiY29sb3JzIiwibGVuZ3RoIiwic29ydCIsIm51bWJlclNvcnQiLCJTdHlsZWRDb2xvckNvbmZpZyIsInN0eWxlZCIsImRpdiIsIkNvbG9yUmFuZ2VTZWxlY3RvciIsIkNvbG9yUmFuZ2VTZWxlY3QiLCJjb25maWciLCJ2YWx1ZSIsIm9wdGlvbnMiLCJzdGVwcyIsInJldmVyc2VkIiwia2V5IiwiY3VycmVudFZhbHVlIiwic3RhdGUiLCJzZXRTdGF0ZSIsIk9iamVjdCIsImtleXMiLCJfdXBkYXRlQ29uZmlnIiwicHJvcHMiLCJjb2xvclJhbmdlcyIsIm9uU2VsZWN0Q29sb3JSYW5nZSIsInNlbGVjdGVkQ29sb3JSYW5nZSIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsImFycmF5T2YiLCJhbnkiLCJvYmplY3QiLCJmdW5jIiwiaXNSZXF1aXJlZCIsIlN0eWxlZFBhbGV0dGVDb25maWciLCJ0aGVtZSIsInNlY29uZGFyeUlucHV0IiwiUGFsZXR0ZUNvbmZpZyIsImNhdGVnb3J5IiwibGFiZWwiLCJvbkNoYW5nZSIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJ2YWwiLCJTdHlsZWRDb2xvclJhbmdlIiwicGFuZWxCYWNrZ3JvdW5kSG92ZXIiLCJDb2xvclBhbGV0dGVHcm91cCIsIm9uU2VsZWN0Iiwic2VsZWN0ZWQiLCJmaWx0ZXJlZCIsImZpbHRlciIsImNvbG9yUmFuZ2UiLCJpc1R5cGUiLCJpc1N0ZXAiLCJOdW1iZXIiLCJpc1JldmVyc2VkIiwiQm9vbGVhbiIsIm5hbWUiLCJzbGljZSIsInJldmVyc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FB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LDZCQUFDLGdCQUFEO0FBQ0UsTUFBQSxTQUFTLEVBQUMsY0FEWjtBQUVFLE1BQUEsR0FBRyxFQUFFQSxVQUFVLENBQUNNLElBRmxCO0FBR0UsTUFBQSxPQUFPLEVBQUUsaUJBQUFoQixDQUFDO0FBQUEsZUFDUk0sUUFBUSxpQ0FFREksVUFGQztBQUdKcEMsVUFBQUEsUUFBUSxFQUFFd0MsVUFITjtBQUlKckQsVUFBQUEsTUFBTSxFQUFFcUQsVUFBVSxHQUNkSixVQUFVLENBQUNqRCxNQUFYLENBQWtCd0QsS0FBbEIsR0FBMEJDLE9BQTFCLEVBRGMsR0FFZFIsVUFBVSxDQUFDakQ7QUFOWCxZQVFOdUMsQ0FSTSxDQURBO0FBQUE7QUFIWixPQWdCRSw2QkFBQyxxQkFBRDtBQUNFLE1BQUEsTUFBTSxFQUFFVSxVQUFVLENBQUNqRCxNQURyQjtBQUVFLE1BQUEsVUFBVSxFQUFFcUQsVUFGZDtBQUdFLE1BQUEsVUFBVSxFQUNSSixVQUFVLENBQUNNLElBQVgsS0FBb0JULFFBQVEsQ0FBQ1MsSUFBN0IsSUFDQUYsVUFBVSxLQUFLQyxPQUFPLENBQUNSLFFBQVEsQ0FBQ2pDLFFBQVY7QUFMMUIsTUFoQkYsQ0FEc0I7QUFBQSxHQUF2QixDQURILENBREY7QUErQkQsQ0E1Q0QiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgdW5pcSBmcm9tICdsb2Rhc2gudW5pcSc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBJdGVtU2VsZWN0b3IgZnJvbSAnY29tcG9uZW50cy9jb21tb24vaXRlbS1zZWxlY3Rvci9pdGVtLXNlbGVjdG9yJztcbmltcG9ydCB7UGFuZWxMYWJlbH0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IFJhbmdlU2xpZGVyIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3JhbmdlLXNsaWRlcic7XG5pbXBvcnQgU3dpdGNoIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N3aXRjaCc7XG5pbXBvcnQgQ29sb3JQYWxldHRlIGZyb20gJy4vY29sb3ItcGFsZXR0ZSc7XG5cbmltcG9ydCB7Q09MT1JfUkFOR0VTfSBmcm9tICdjb25zdGFudHMvY29sb3ItcmFuZ2VzJztcbmltcG9ydCB7bnVtYmVyU29ydH0gZnJvbSAndXRpbHMvZGF0YS11dGlscyc7XG5cbmNvbnN0IEFMTF9UWVBFUyA9IHVuaXEoQ09MT1JfUkFOR0VTLm1hcChjID0+IGMudHlwZSkuY29uY2F0KFsnYWxsJ10pKTtcbmNvbnN0IEFMTF9TVEVQUyA9IHVuaXEoQ09MT1JfUkFOR0VTLm1hcChkID0+IGQuY29sb3JzLmxlbmd0aCkpLnNvcnQobnVtYmVyU29ydCk7XG5cbmNvbnN0IFN0eWxlZENvbG9yQ29uZmlnID0gc3R5bGVkLmRpdmBcbiAgcGFkZGluZzogMTJweCAxMnB4IDAgMTJweDtcbmA7XG5cbmNvbnN0IENvbG9yUmFuZ2VTZWxlY3RvciA9IHN0eWxlZC5kaXZgXG4gIHBhZGRpbmctYm90dG9tOiAxMnB4O1xuYDtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbG9yUmFuZ2VTZWxlY3QgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNvbG9yUmFuZ2VzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KSxcbiAgICBzZWxlY3RlZENvbG9yUmFuZ2U6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgb25TZWxlY3RDb2xvclJhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBjb2xvclJhbmdlczogQ09MT1JfUkFOR0VTLFxuICAgIG9uU2VsZWN0Q29sb3JSYW5nZTogKCkgPT4ge31cbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBjb25maWc6IHtcbiAgICAgIHR5cGU6IHtcbiAgICAgICAgdHlwZTogJ3NlbGVjdCcsXG4gICAgICAgIHZhbHVlOiAnYWxsJyxcbiAgICAgICAgb3B0aW9uczogQUxMX1RZUEVTXG4gICAgICB9LFxuICAgICAgc3RlcHM6IHtcbiAgICAgICAgdHlwZTogJ3NlbGVjdCcsXG4gICAgICAgIHZhbHVlOiA2LFxuICAgICAgICBvcHRpb25zOiBBTExfU1RFUFNcbiAgICAgIH0sXG4gICAgICByZXZlcnNlZDoge1xuICAgICAgICB0eXBlOiAnc3dpdGNoJyxcbiAgICAgICAgdmFsdWU6IGZhbHNlLFxuICAgICAgICBvcHRpb25zOiBbdHJ1ZSwgZmFsc2VdXG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIF91cGRhdGVDb25maWcgPSAoe2tleSwgdmFsdWV9KSA9PiB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5zdGF0ZS5jb25maWdba2V5XS52YWx1ZTtcbiAgICBpZiAodmFsdWUgIT09IGN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgIC4uLnRoaXMuc3RhdGUuY29uZmlnLFxuICAgICAgICAgIFtrZXldOiB7XG4gICAgICAgICAgICAuLi50aGlzLnN0YXRlLmNvbmZpZ1trZXldLFxuICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge2NvbmZpZ30gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8Q29sb3JSYW5nZVNlbGVjdG9yIGNsYXNzTmFtZT1cImNvbG9yLXJhbmdlLXNlbGVjdG9yXCI+XG4gICAgICAgIDxTdHlsZWRDb2xvckNvbmZpZz5cbiAgICAgICAgICB7T2JqZWN0LmtleXMoY29uZmlnKS5tYXAoa2V5ID0+IChcbiAgICAgICAgICAgIDxQYWxldHRlQ29uZmlnXG4gICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgICBsYWJlbD17a2V5fVxuICAgICAgICAgICAgICBjb25maWc9e2NvbmZpZ1trZXldfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17dmFsdWUgPT4gdGhpcy5fdXBkYXRlQ29uZmlnKHtrZXksIHZhbHVlfSl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L1N0eWxlZENvbG9yQ29uZmlnPlxuICAgICAgICA8Q29sb3JQYWxldHRlR3JvdXBcbiAgICAgICAgICBjb25maWc9e2NvbmZpZ31cbiAgICAgICAgICBjb2xvclJhbmdlcz17dGhpcy5wcm9wcy5jb2xvclJhbmdlc31cbiAgICAgICAgICBvblNlbGVjdD17dGhpcy5wcm9wcy5vblNlbGVjdENvbG9yUmFuZ2V9XG4gICAgICAgICAgc2VsZWN0ZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWRDb2xvclJhbmdlfVxuICAgICAgICAvPlxuICAgICAgPC9Db2xvclJhbmdlU2VsZWN0b3I+XG4gICAgKTtcbiAgfVxufVxuXG5jb25zdCBTdHlsZWRQYWxldHRlQ29uZmlnID0gc3R5bGVkLmRpdmBcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIC5jb2xvci1wYWxldHRlX19jb25maWdfX2xhYmVsIHtcbiAgICBmbGV4LWdyb3c6IDE7XG4gIH1cbiAgLmNvbG9yLXBhbGV0dGVfX2NvbmZpZ19fc2VsZWN0IHtcbiAgICBmbGV4LWdyb3c6IDE7XG4gIH1cbiAgLml0ZW0tc2VsZWN0b3IgLml0ZW0tc2VsZWN0b3JfX2Ryb3Bkb3duIHtcbiAgICAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNlY29uZGFyeUlucHV0fTtcbiAgfVxuYDtcblxuY29uc3QgUGFsZXR0ZUNvbmZpZyA9ICh7XG4gIGNhdGVnb3J5LFxuICBsYWJlbCxcbiAgY29uZmlnOiB7dHlwZSwgdmFsdWUsIG9wdGlvbnN9LFxuICBvbkNoYW5nZVxufSkgPT4gKFxuICA8U3R5bGVkUGFsZXR0ZUNvbmZpZ1xuICAgIGNsYXNzTmFtZT1cImNvbG9yLXBhbGV0dGVfX2NvbmZpZ1wiXG4gICAgb25DbGljaz17ZSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpfVxuICA+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJjb2xvci1wYWxldHRlX19jb25maWdfX2xhYmVsXCI+XG4gICAgICA8UGFuZWxMYWJlbD57bGFiZWx9PC9QYW5lbExhYmVsPlxuICAgIDwvZGl2PlxuICAgIHt0eXBlID09PSAnc2VsZWN0JyAmJiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbG9yLXBhbGV0dGVfX2NvbmZpZ19fc2VsZWN0XCI+XG4gICAgICAgIDxJdGVtU2VsZWN0b3JcbiAgICAgICAgICBzZWxlY3RlZEl0ZW1zPXt2YWx1ZX1cbiAgICAgICAgICBvcHRpb25zPXtvcHRpb25zfVxuICAgICAgICAgIG11bHRpU2VsZWN0PXtmYWxzZX1cbiAgICAgICAgICBzZWFyY2hhYmxlPXtmYWxzZX1cbiAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApfVxuICAgIHt0eXBlID09PSAnc2xpZGVyJyAmJiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbG9yLXBhbGV0dGVfX2NvbmZpZ19fc2xpZGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sb3ItcGFsZXR0ZV9fY29uZmlnX19zbGlkZXJfX3NsaWRlclwiPlxuICAgICAgICAgIDxSYW5nZVNsaWRlclxuICAgICAgICAgICAgcmFuZ2U9e29wdGlvbnN9XG4gICAgICAgICAgICB2YWx1ZTA9e29wdGlvbnNbMF19XG4gICAgICAgICAgICB2YWx1ZTE9e3ZhbHVlfVxuICAgICAgICAgICAgc3RlcD17MX1cbiAgICAgICAgICAgIGlzUmFuZ2VkPXtmYWxzZX1cbiAgICAgICAgICAgIHNob3dJbnB1dD17ZmFsc2V9XG4gICAgICAgICAgICBvbkNoYW5nZT17dmFsID0+IG9uQ2hhbmdlKHZhbFsxXSl9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sb3ItcGFsZXR0ZV9fY29uZmlnX19zbGlkZXJfX251bWJlclwiPnt2YWx1ZX08L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICl9XG4gICAge3R5cGUgPT09ICdzd2l0Y2gnICYmIChcbiAgICAgIDxTd2l0Y2hcbiAgICAgICAgY2hlY2tlZD17dmFsdWV9XG4gICAgICAgIGlkPXtgJHtjYXRlZ29yeX0tJHtsYWJlbH0tdG9nZ2xlYH1cbiAgICAgICAgb25DaGFuZ2U9eygpID0+IG9uQ2hhbmdlKCF2YWx1ZSl9XG4gICAgICAgIHNlY29uZGFyeVxuICAgICAgLz5cbiAgICApfVxuICA8L1N0eWxlZFBhbGV0dGVDb25maWc+XG4pO1xuXG5jb25zdCBTdHlsZWRDb2xvclJhbmdlID0gc3R5bGVkLmRpdmBcbiAgcGFkZGluZzogMCA4cHg7XG4gIDpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbEJhY2tncm91bmRIb3Zlcn07XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICB9XG5gO1xuXG5jb25zdCBDb2xvclBhbGV0dGVHcm91cCA9ICh7Y29uZmlnID0ge30sIG9uU2VsZWN0LCBzZWxlY3RlZCwgY29sb3JSYW5nZXN9KSA9PiB7XG4gIGNvbnN0IHtzdGVwcywgcmV2ZXJzZWQsIHR5cGV9ID0gY29uZmlnO1xuXG4gIGNvbnN0IGZpbHRlcmVkID0gY29sb3JSYW5nZXMuZmlsdGVyKGNvbG9yUmFuZ2UgPT4ge1xuICAgIGNvbnN0IGlzVHlwZSA9XG4gICAgICAhdHlwZSB8fCB0eXBlLnZhbHVlID09PSAnYWxsJyB8fCB0eXBlLnZhbHVlID09PSBjb2xvclJhbmdlLnR5cGU7XG4gICAgY29uc3QgaXNTdGVwID0gIXN0ZXBzIHx8IE51bWJlcihzdGVwcy52YWx1ZSkgPT09IGNvbG9yUmFuZ2UuY29sb3JzLmxlbmd0aDtcblxuICAgIHJldHVybiBpc1R5cGUgJiYgaXNTdGVwO1xuICB9KTtcblxuICBjb25zdCBpc1JldmVyc2VkID0gQm9vbGVhbihyZXZlcnNlZCAmJiByZXZlcnNlZC52YWx1ZSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbG9yLXBhbGV0dGVfX2dyb3VwXCI+XG4gICAgICB7ZmlsdGVyZWQubWFwKGNvbG9yUmFuZ2UgPT4gKFxuICAgICAgICA8U3R5bGVkQ29sb3JSYW5nZVxuICAgICAgICAgIGNsYXNzTmFtZT1cImNvbG9yLXJhbmdlc1wiXG4gICAgICAgICAga2V5PXtjb2xvclJhbmdlLm5hbWV9XG4gICAgICAgICAgb25DbGljaz17ZSA9PlxuICAgICAgICAgICAgb25TZWxlY3QoXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAuLi5jb2xvclJhbmdlLFxuICAgICAgICAgICAgICAgIHJldmVyc2VkOiBpc1JldmVyc2VkLFxuICAgICAgICAgICAgICAgIGNvbG9yczogaXNSZXZlcnNlZFxuICAgICAgICAgICAgICAgICAgPyBjb2xvclJhbmdlLmNvbG9ycy5zbGljZSgpLnJldmVyc2UoKVxuICAgICAgICAgICAgICAgICAgOiBjb2xvclJhbmdlLmNvbG9yc1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBlXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICA+XG4gICAgICAgICAgPENvbG9yUGFsZXR0ZVxuICAgICAgICAgICAgY29sb3JzPXtjb2xvclJhbmdlLmNvbG9yc31cbiAgICAgICAgICAgIGlzUmV2ZXJzZWQ9e2lzUmV2ZXJzZWR9XG4gICAgICAgICAgICBpc1NlbGVjdGVkPXtcbiAgICAgICAgICAgICAgY29sb3JSYW5nZS5uYW1lID09PSBzZWxlY3RlZC5uYW1lICYmXG4gICAgICAgICAgICAgIGlzUmV2ZXJzZWQgPT09IEJvb2xlYW4oc2VsZWN0ZWQucmV2ZXJzZWQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9TdHlsZWRDb2xvclJhbmdlPlxuICAgICAgKSl9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl19