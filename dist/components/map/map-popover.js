"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MapPopover = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styledComponents2 = require("../common/styled-components");

var _icons = require("../common/icons");

var _defaultSettings = require("../../constants/default-settings");

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  font-size: 12px;\n  letter-spacing: 0.43px;\n  text-transform: capitalize;\n  padding-left: 14px;\n  margin-top: 12px;\n\n  svg {\n    margin-right: 4px;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n  left: 50%;\n  transform: rotate(30deg);\n  top: 10px;\n  color: ", ";\n\n  :hover {\n    cursor: pointer;\n    color: ", ";\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  ", "\n  font-size: 11px;\n  font-weight: 500;\n  background-color: ", ";\n  color: ", ";\n  z-index: 1001;\n  position: absolute;\n  overflow-x: auto;\n\n  .gutter {\n    height: 6px;\n  }\n\n  table {\n    margin: 2px 12px 12px 12px;\n    width: auto;\n\n    tbody {\n      border-top: transparent;\n      border-bottom: transparent;\n    }\n\n    td {\n      border-color: transparent;\n      padding: 4px;\n      color: ", ";\n    }\n\n    td.row__value {\n      text-align: right;\n      font-weight: 500;\n      color: ", ";\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var MAX_WIDTH = 400;
var MAX_HEIGHT = 600;

var StyledMapPopover = _styledComponents.default.div(_templateObject(), function (props) {
  return props.theme.scrollBar;
}, function (props) {
  return props.theme.panelBackground;
}, function (props) {
  return props.theme.textColor;
}, function (props) {
  return props.theme.textColor;
}, function (props) {
  return props.theme.textColorHl;
});

var StyledPin = _styledComponents.default.div(_templateObject2(), function (props) {
  return props.theme.primaryBtnBgd;
}, function (props) {
  return props.theme.linkBtnColor;
});

var StyledLayerName = (0, _styledComponents.default)(_styledComponents2.CenterFlexbox)(_templateObject3(), function (props) {
  return props.theme.textColorHl;
});

var MapPopover =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(MapPopover, _Component);

  function MapPopover(props) {
    var _this;

    (0, _classCallCheck2.default)(this, MapPopover);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MapPopover).call(this, props));
    _this.state = {
      isMouseOver: false,
      width: 380,
      height: 160
    };
    return _this;
  }

  (0, _createClass2.default)(MapPopover, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._setContainerSize();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this._setContainerSize();
    }
  }, {
    key: "_setContainerSize",
    value: function _setContainerSize() {
      var node = this.popover;

      if (!node) {
        return;
      }

      var width = Math.min(node.scrollWidth, MAX_WIDTH);
      var height = Math.min(node.scrollHeight, MAX_HEIGHT);

      if (width !== this.state.width || height !== this.state.height) {
        this.setState({
          width: width,
          height: height
        });
      }
    }
  }, {
    key: "_getPosition",
    value: function _getPosition(x, y) {
      var topOffset = 30;
      var leftOffset = 30;
      var mapState = this.props.mapState;
      var _this$state = this.state,
          width = _this$state.width,
          height = _this$state.height;
      var pos = {};

      if (x + leftOffset + width > mapState.width) {
        pos.right = mapState.width - x + leftOffset;
      } else {
        pos.left = x + leftOffset;
      }

      if (y + topOffset + height > mapState.height) {
        pos.bottom = 10;
      } else {
        pos.top = y + topOffset;
      }

      return pos;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          x = _this$props.x,
          y = _this$props.y,
          isVisible = _this$props.isVisible,
          data = _this$props.data,
          layer = _this$props.layer,
          freezed = _this$props.freezed,
          fields = _this$props.fields,
          _this$props$fieldsToS = _this$props.fieldsToShow,
          fieldsToShow = _this$props$fieldsToS === void 0 ? [] : _this$props$fieldsToS;
      var hidden = !isVisible && !this.state.isMouseOver;
      var width = this.state.width;

      if (!data || !layer || !fieldsToShow.length) {
        return null;
      }

      var infoProps = {
        data: data,
        layer: layer,
        fieldsToShow: fieldsToShow,
        fields: fields
      };
      var style = Number.isFinite(x) && Number.isFinite(y) ? this._getPosition(x, y) : {};
      return _react.default.createElement(StyledMapPopover, {
        ref: function ref(comp) {
          _this2.popover = comp;
        },
        className: (0, _classnames.default)('map-popover', {
          hidden: hidden
        }),
        style: (0, _objectSpread2.default)({}, style, {
          maxWidth: width
        }),
        onMouseEnter: function onMouseEnter() {
          _this2.setState({
            isMouseOver: true
          });
        },
        onMouseLeave: function onMouseLeave() {
          _this2.setState({
            isMouseOver: false
          });
        }
      }, freezed ? _react.default.createElement("div", {
        className: "map-popover__top"
      }, _react.default.createElement("div", {
        className: "gutter"
      }), _react.default.createElement(StyledPin, {
        className: "popover-pin",
        onClick: this.props.onClose
      }, _react.default.createElement(_icons.Pin, {
        height: "16px"
      }))) : null, _react.default.createElement(StyledLayerName, {
        className: "map-popover__layer-name"
      }, _react.default.createElement(_icons.Layers, {
        height: "12px"
      }), layer.config.label), _react.default.createElement("table", {
        className: "map-popover__table"
      }, layer.isAggregated ? _react.default.createElement(CellInfo, infoProps) : _react.default.createElement(EntryInfo, infoProps)));
    }
  }]);
  return MapPopover;
}(_react.Component);

exports.MapPopover = MapPopover;
(0, _defineProperty2.default)(MapPopover, "propTypes", {
  fields: _propTypes.default.arrayOf(_propTypes.default.any),
  fieldsToShow: _propTypes.default.arrayOf(_propTypes.default.any),
  isVisible: _propTypes.default.bool,
  layer: _propTypes.default.object,
  data: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.any), _propTypes.default.object]),
  freezed: _propTypes.default.bool,
  x: _propTypes.default.number,
  y: _propTypes.default.number,
  onClose: _propTypes.default.func,
  mapState: _propTypes.default.object.isRequired
});

var Row = function Row(_ref) {
  var name = _ref.name,
      value = _ref.value,
      url = _ref.url;

  // Set 'url' to 'value' if it looks like a url
  if (!url && value && typeof value === 'string' && value.match(/^http/)) {
    url = value;
  }

  var asImg = /<img>/.test(name);
  return _react.default.createElement("tr", {
    className: "row",
    key: name
  }, _react.default.createElement("td", {
    className: "row__name"
  }, name), _react.default.createElement("td", {
    className: "row__value"
  }, asImg ? _react.default.createElement("img", {
    src: value
  }) : url ? _react.default.createElement("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: url
  }, value) : value));
};

var EntryInfo = function EntryInfo(_ref2) {
  var fieldsToShow = _ref2.fieldsToShow,
      fields = _ref2.fields,
      data = _ref2.data;
  return _react.default.createElement("tbody", null, fieldsToShow.map(function (name) {
    return _react.default.createElement(EntryInfoRow, {
      key: name,
      name: name,
      fields: fields,
      data: data
    });
  }));
};

var EntryInfoRow = function EntryInfoRow(_ref3) {
  var name = _ref3.name,
      fields = _ref3.fields,
      data = _ref3.data;
  var field = fields.find(function (f) {
    return f.name === name;
  });

  if (!field) {
    return null;
  }

  var valueIdx = field.tableFieldIndex - 1;

  var format = _getCellFormat(field.type);

  return _react.default.createElement(Row, {
    name: name,
    value: format ? format(data[valueIdx]) : data[valueIdx]
  });
};

var CellInfo = function CellInfo(_ref4) {
  var data = _ref4.data,
      layer = _ref4.layer;
  var _layer$config = layer.config,
      colorField = _layer$config.colorField,
      sizeField = _layer$config.sizeField;
  return _react.default.createElement("tbody", null, _react.default.createElement(Row, {
    name: 'total points',
    key: "count",
    value: data.points && data.points.length
  }), colorField && layer.visualChannels.color ? _react.default.createElement(Row, {
    name: layer.getVisualChannelDescription('color').measure,
    key: "color",
    value: data.colorValue || 'N/A'
  }) : null, sizeField && layer.visualChannels.size ? _react.default.createElement(Row, {
    name: layer.getVisualChannelDescription('size').measure,
    key: "size",
    value: data.elevationValue || 'N/A'
  }) : null);
};

function _getCellFormat(type) {
  return _defaultSettings.FIELD_DISPLAY_FORMAT[type];
}

var MapPopoverFactory = function MapPopoverFactory() {
  return MapPopover;
};

var _default = MapPopoverFactory;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21hcC9tYXAtcG9wb3Zlci5qcyJdLCJuYW1lcyI6WyJNQVhfV0lEVEgiLCJNQVhfSEVJR0hUIiwiU3R5bGVkTWFwUG9wb3ZlciIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJzY3JvbGxCYXIiLCJwYW5lbEJhY2tncm91bmQiLCJ0ZXh0Q29sb3IiLCJ0ZXh0Q29sb3JIbCIsIlN0eWxlZFBpbiIsInByaW1hcnlCdG5CZ2QiLCJsaW5rQnRuQ29sb3IiLCJTdHlsZWRMYXllck5hbWUiLCJDZW50ZXJGbGV4Ym94IiwiTWFwUG9wb3ZlciIsInN0YXRlIiwiaXNNb3VzZU92ZXIiLCJ3aWR0aCIsImhlaWdodCIsIl9zZXRDb250YWluZXJTaXplIiwibm9kZSIsInBvcG92ZXIiLCJNYXRoIiwibWluIiwic2Nyb2xsV2lkdGgiLCJzY3JvbGxIZWlnaHQiLCJzZXRTdGF0ZSIsIngiLCJ5IiwidG9wT2Zmc2V0IiwibGVmdE9mZnNldCIsIm1hcFN0YXRlIiwicG9zIiwicmlnaHQiLCJsZWZ0IiwiYm90dG9tIiwidG9wIiwiaXNWaXNpYmxlIiwiZGF0YSIsImxheWVyIiwiZnJlZXplZCIsImZpZWxkcyIsImZpZWxkc1RvU2hvdyIsImhpZGRlbiIsImxlbmd0aCIsImluZm9Qcm9wcyIsInN0eWxlIiwiTnVtYmVyIiwiaXNGaW5pdGUiLCJfZ2V0UG9zaXRpb24iLCJjb21wIiwibWF4V2lkdGgiLCJvbkNsb3NlIiwiY29uZmlnIiwibGFiZWwiLCJpc0FnZ3JlZ2F0ZWQiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJhcnJheU9mIiwiYW55IiwiYm9vbCIsIm9iamVjdCIsIm9uZU9mVHlwZSIsIm51bWJlciIsImZ1bmMiLCJpc1JlcXVpcmVkIiwiUm93IiwibmFtZSIsInZhbHVlIiwidXJsIiwibWF0Y2giLCJhc0ltZyIsInRlc3QiLCJFbnRyeUluZm8iLCJtYXAiLCJFbnRyeUluZm9Sb3ciLCJmaWVsZCIsImZpbmQiLCJmIiwidmFsdWVJZHgiLCJ0YWJsZUZpZWxkSW5kZXgiLCJmb3JtYXQiLCJfZ2V0Q2VsbEZvcm1hdCIsInR5cGUiLCJDZWxsSW5mbyIsImNvbG9yRmllbGQiLCJzaXplRmllbGQiLCJwb2ludHMiLCJ2aXN1YWxDaGFubmVscyIsImNvbG9yIiwiZ2V0VmlzdWFsQ2hhbm5lbERlc2NyaXB0aW9uIiwibWVhc3VyZSIsImNvbG9yVmFsdWUiLCJzaXplIiwiZWxldmF0aW9uVmFsdWUiLCJGSUVMRF9ESVNQTEFZX0ZPUk1BVCIsIk1hcFBvcG92ZXJGYWN0b3J5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsU0FBUyxHQUFHLEdBQWxCO0FBQ0EsSUFBTUMsVUFBVSxHQUFHLEdBQW5COztBQUVBLElBQU1DLGdCQUFnQixHQUFHQywwQkFBT0MsR0FBVixvQkFDbEIsVUFBQUMsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZQyxTQUFoQjtBQUFBLENBRGEsRUFJQSxVQUFBRixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlFLGVBQWhCO0FBQUEsQ0FKTCxFQUtYLFVBQUFILEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUcsU0FBaEI7QUFBQSxDQUxNLEVBMEJQLFVBQUFKLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUcsU0FBaEI7QUFBQSxDQTFCRSxFQWdDUCxVQUFBSixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlJLFdBQWhCO0FBQUEsQ0FoQ0UsQ0FBdEI7O0FBcUNBLElBQU1DLFNBQVMsR0FBR1IsMEJBQU9DLEdBQVYscUJBS0osVUFBQUMsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZTSxhQUFoQjtBQUFBLENBTEQsRUFT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aUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHtDZW50ZXJGbGV4Ym94fSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQge1BpbiwgTGF5ZXJzfSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9pY29ucyc7XG5pbXBvcnQge0ZJRUxEX0RJU1BMQVlfRk9STUFUfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5cbmNvbnN0IE1BWF9XSURUSCA9IDQwMDtcbmNvbnN0IE1BWF9IRUlHSFQgPSA2MDA7XG5cbmNvbnN0IFN0eWxlZE1hcFBvcG92ZXIgPSBzdHlsZWQuZGl2YFxuICAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNjcm9sbEJhcn1cbiAgZm9udC1zaXplOiAxMXB4O1xuICBmb250LXdlaWdodDogNTAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsQmFja2dyb3VuZH07XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvcn07XG4gIHotaW5kZXg6IDEwMDE7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgb3ZlcmZsb3cteDogYXV0bztcblxuICAuZ3V0dGVyIHtcbiAgICBoZWlnaHQ6IDZweDtcbiAgfVxuXG4gIHRhYmxlIHtcbiAgICBtYXJnaW46IDJweCAxMnB4IDEycHggMTJweDtcbiAgICB3aWR0aDogYXV0bztcblxuICAgIHRib2R5IHtcbiAgICAgIGJvcmRlci10b3A6IHRyYW5zcGFyZW50O1xuICAgICAgYm9yZGVyLWJvdHRvbTogdHJhbnNwYXJlbnQ7XG4gICAgfVxuXG4gICAgdGQge1xuICAgICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgIHBhZGRpbmc6IDRweDtcbiAgICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvcn07XG4gICAgfVxuXG4gICAgdGQucm93X192YWx1ZSB7XG4gICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JIbH07XG4gICAgfVxuICB9XG5gO1xuXG5jb25zdCBTdHlsZWRQaW4gPSBzdHlsZWQuZGl2YFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDUwJTtcbiAgdHJhbnNmb3JtOiByb3RhdGUoMzBkZWcpO1xuICB0b3A6IDEwcHg7XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnByaW1hcnlCdG5CZ2R9O1xuXG4gIDpob3ZlciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmxpbmtCdG5Db2xvcn07XG4gIH1cbmA7XG5cbmNvbnN0IFN0eWxlZExheWVyTmFtZSA9IHN0eWxlZChDZW50ZXJGbGV4Ym94KWBcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9ySGx9O1xuICBmb250LXNpemU6IDEycHg7XG4gIGxldHRlci1zcGFjaW5nOiAwLjQzcHg7XG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xuICBwYWRkaW5nLWxlZnQ6IDE0cHg7XG4gIG1hcmdpbi10b3A6IDEycHg7XG5cbiAgc3ZnIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDRweDtcbiAgfVxuYDtcblxuZXhwb3J0IGNsYXNzIE1hcFBvcG92ZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGZpZWxkczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSksXG4gICAgZmllbGRzVG9TaG93OiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KSxcbiAgICBpc1Zpc2libGU6IFByb3BUeXBlcy5ib29sLFxuICAgIGxheWVyOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGRhdGE6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLCBQcm9wVHlwZXMub2JqZWN0XSksXG4gICAgZnJlZXplZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgeDogUHJvcFR5cGVzLm51bWJlcixcbiAgICB5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG1hcFN0YXRlOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWRcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaXNNb3VzZU92ZXI6IGZhbHNlLFxuICAgICAgd2lkdGg6IDM4MCxcbiAgICAgIGhlaWdodDogMTYwXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuX3NldENvbnRhaW5lclNpemUoKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICB0aGlzLl9zZXRDb250YWluZXJTaXplKCk7XG4gIH1cblxuICBfc2V0Q29udGFpbmVyU2l6ZSgpIHtcbiAgICBjb25zdCBub2RlID0gdGhpcy5wb3BvdmVyO1xuICAgIGlmICghbm9kZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHdpZHRoID0gTWF0aC5taW4obm9kZS5zY3JvbGxXaWR0aCwgTUFYX1dJRFRIKTtcbiAgICBjb25zdCBoZWlnaHQgPSBNYXRoLm1pbihub2RlLnNjcm9sbEhlaWdodCwgTUFYX0hFSUdIVCk7XG5cbiAgICBpZiAod2lkdGggIT09IHRoaXMuc3RhdGUud2lkdGggfHwgaGVpZ2h0ICE9PSB0aGlzLnN0YXRlLmhlaWdodCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7d2lkdGgsIGhlaWdodH0pO1xuICAgIH1cbiAgfVxuXG4gIF9nZXRQb3NpdGlvbih4LCB5KSB7XG4gICAgY29uc3QgdG9wT2Zmc2V0ID0gMzA7XG4gICAgY29uc3QgbGVmdE9mZnNldCA9IDMwO1xuICAgIGNvbnN0IHttYXBTdGF0ZX0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHt3aWR0aCwgaGVpZ2h0fSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgcG9zID0ge307XG4gICAgaWYgKHggKyBsZWZ0T2Zmc2V0ICsgd2lkdGggPiBtYXBTdGF0ZS53aWR0aCkge1xuICAgICAgcG9zLnJpZ2h0ID0gbWFwU3RhdGUud2lkdGggLSB4ICsgbGVmdE9mZnNldDtcbiAgICB9IGVsc2Uge1xuICAgICAgcG9zLmxlZnQgPSB4ICsgbGVmdE9mZnNldDtcbiAgICB9XG5cbiAgICBpZiAoeSArIHRvcE9mZnNldCArIGhlaWdodCA+IG1hcFN0YXRlLmhlaWdodCkge1xuICAgICAgcG9zLmJvdHRvbSA9IDEwO1xuICAgIH0gZWxzZSB7XG4gICAgICBwb3MudG9wID0geSArIHRvcE9mZnNldDtcbiAgICB9XG5cbiAgICByZXR1cm4gcG9zO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHgsXG4gICAgICB5LFxuICAgICAgaXNWaXNpYmxlLFxuICAgICAgZGF0YSxcbiAgICAgIGxheWVyLFxuICAgICAgZnJlZXplZCxcbiAgICAgIGZpZWxkcyxcbiAgICAgIGZpZWxkc1RvU2hvdyA9IFtdXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaGlkZGVuID0gIWlzVmlzaWJsZSAmJiAhdGhpcy5zdGF0ZS5pc01vdXNlT3ZlcjtcbiAgICBjb25zdCB7d2lkdGh9ID0gdGhpcy5zdGF0ZTtcblxuICAgIGlmICghZGF0YSB8fCAhbGF5ZXIgfHwgIWZpZWxkc1RvU2hvdy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGluZm9Qcm9wcyA9IHtkYXRhLCBsYXllciwgZmllbGRzVG9TaG93LCBmaWVsZHN9O1xuXG4gICAgY29uc3Qgc3R5bGUgPVxuICAgICAgTnVtYmVyLmlzRmluaXRlKHgpICYmIE51bWJlci5pc0Zpbml0ZSh5KSA/IHRoaXMuX2dldFBvc2l0aW9uKHgsIHkpIDoge307XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFN0eWxlZE1hcFBvcG92ZXJcbiAgICAgICAgcmVmPXtjb21wID0+IHtcbiAgICAgICAgICB0aGlzLnBvcG92ZXIgPSBjb21wO1xuICAgICAgICB9fVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ21hcC1wb3BvdmVyJywge2hpZGRlbn0pfVxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIC4uLnN0eWxlLFxuICAgICAgICAgIG1heFdpZHRoOiB3aWR0aFxuICAgICAgICB9fVxuICAgICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpc01vdXNlT3ZlcjogdHJ1ZX0pO1xuICAgICAgICB9fVxuICAgICAgICBvbk1vdXNlTGVhdmU9eygpID0+IHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpc01vdXNlT3ZlcjogZmFsc2V9KTtcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2ZyZWV6ZWQgPyAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXAtcG9wb3Zlcl9fdG9wXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImd1dHRlclwiIC8+XG4gICAgICAgICAgICA8U3R5bGVkUGluIGNsYXNzTmFtZT1cInBvcG92ZXItcGluXCIgb25DbGljaz17dGhpcy5wcm9wcy5vbkNsb3NlfT5cbiAgICAgICAgICAgICAgPFBpbiBoZWlnaHQ9XCIxNnB4XCIgLz5cbiAgICAgICAgICAgIDwvU3R5bGVkUGluPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPFN0eWxlZExheWVyTmFtZSBjbGFzc05hbWU9XCJtYXAtcG9wb3Zlcl9fbGF5ZXItbmFtZVwiPlxuICAgICAgICAgIDxMYXllcnMgaGVpZ2h0PVwiMTJweFwiLz57bGF5ZXIuY29uZmlnLmxhYmVsfTwvU3R5bGVkTGF5ZXJOYW1lPlxuICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwibWFwLXBvcG92ZXJfX3RhYmxlXCI+XG4gICAgICAgICAge2xheWVyLmlzQWdncmVnYXRlZCA/IChcbiAgICAgICAgICAgIDxDZWxsSW5mbyB7Li4uaW5mb1Byb3BzfSAvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8RW50cnlJbmZvIHsuLi5pbmZvUHJvcHN9IC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC90YWJsZT5cbiAgICAgIDwvU3R5bGVkTWFwUG9wb3Zlcj5cbiAgICApO1xuICB9XG59XG5cbmNvbnN0IFJvdyA9ICh7bmFtZSwgdmFsdWUsIHVybH0pID0+IHtcbiAgLy8gU2V0ICd1cmwnIHRvICd2YWx1ZScgaWYgaXQgbG9va3MgbGlrZSBhIHVybFxuICBpZiAoIXVybCAmJiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLm1hdGNoKC9eaHR0cC8pKSB7XG4gICAgdXJsID0gdmFsdWU7XG4gIH1cblxuICBjb25zdCBhc0ltZyA9IC88aW1nPi8udGVzdChuYW1lKTtcbiAgcmV0dXJuIChcbiAgICA8dHIgY2xhc3NOYW1lPVwicm93XCIga2V5PXtuYW1lfT5cbiAgICAgIDx0ZCBjbGFzc05hbWU9XCJyb3dfX25hbWVcIj57bmFtZX08L3RkPlxuICAgICAgPHRkIGNsYXNzTmFtZT1cInJvd19fdmFsdWVcIj5cbiAgICAgICAge2FzSW1nID8gKFxuICAgICAgICAgIDxpbWcgc3JjPXt2YWx1ZX0gLz5cbiAgICAgICAgKSA6IHVybCA/IChcbiAgICAgICAgICA8YSB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCIgaHJlZj17dXJsfT5cbiAgICAgICAgICAgIHt2YWx1ZX1cbiAgICAgICAgICA8L2E+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgdmFsdWVcbiAgICAgICAgKX1cbiAgICAgIDwvdGQ+XG4gICAgPC90cj5cbiAgKTtcbn07XG5cbmNvbnN0IEVudHJ5SW5mbyA9ICh7ZmllbGRzVG9TaG93LCBmaWVsZHMsIGRhdGF9KSA9PiAoXG4gIDx0Ym9keT5cbiAgICB7ZmllbGRzVG9TaG93Lm1hcChuYW1lID0+IChcbiAgICAgIDxFbnRyeUluZm9Sb3cga2V5PXtuYW1lfSBuYW1lPXtuYW1lfSBmaWVsZHM9e2ZpZWxkc30gZGF0YT17ZGF0YX0gLz5cbiAgICApKX1cbiAgPC90Ym9keT5cbik7XG5cbmNvbnN0IEVudHJ5SW5mb1JvdyA9ICh7bmFtZSwgZmllbGRzLCBkYXRhfSkgPT4ge1xuICBjb25zdCBmaWVsZCA9IGZpZWxkcy5maW5kKGYgPT4gZi5uYW1lID09PSBuYW1lKTtcbiAgaWYgKCFmaWVsZCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgdmFsdWVJZHggPSBmaWVsZC50YWJsZUZpZWxkSW5kZXggLSAxO1xuICBjb25zdCBmb3JtYXQgPSBfZ2V0Q2VsbEZvcm1hdChmaWVsZC50eXBlKTtcblxuICByZXR1cm4gKFxuICAgIDxSb3cgbmFtZT17bmFtZX0gdmFsdWU9e2Zvcm1hdCA/IGZvcm1hdChkYXRhW3ZhbHVlSWR4XSkgOiBkYXRhW3ZhbHVlSWR4XX0gLz5cbiAgKTtcbn07XG5cbmNvbnN0IENlbGxJbmZvID0gKHtkYXRhLCBsYXllcn0pID0+IHtcbiAgY29uc3Qge2NvbG9yRmllbGQsIHNpemVGaWVsZH0gPSBsYXllci5jb25maWc7XG5cbiAgcmV0dXJuIChcbiAgICA8dGJvZHk+XG4gICAgICA8Um93IG5hbWU9eyd0b3RhbCBwb2ludHMnfSBrZXk9XCJjb3VudFwiIHZhbHVlPXtkYXRhLnBvaW50cyAmJiBkYXRhLnBvaW50cy5sZW5ndGh9IC8+XG4gICAgICB7Y29sb3JGaWVsZCAmJiBsYXllci52aXN1YWxDaGFubmVscy5jb2xvciA/IChcbiAgICAgICAgPFJvd1xuICAgICAgICAgIG5hbWU9e2xheWVyLmdldFZpc3VhbENoYW5uZWxEZXNjcmlwdGlvbignY29sb3InKS5tZWFzdXJlfVxuICAgICAgICAgIGtleT1cImNvbG9yXCJcbiAgICAgICAgICB2YWx1ZT17ZGF0YS5jb2xvclZhbHVlIHx8ICdOL0EnfVxuICAgICAgICAvPlxuICAgICAgKSA6IG51bGx9XG4gICAgICB7c2l6ZUZpZWxkICYmIGxheWVyLnZpc3VhbENoYW5uZWxzLnNpemUgPyAoXG4gICAgICAgIDxSb3dcbiAgICAgICAgICBuYW1lPXtsYXllci5nZXRWaXN1YWxDaGFubmVsRGVzY3JpcHRpb24oJ3NpemUnKS5tZWFzdXJlfVxuICAgICAgICAgIGtleT1cInNpemVcIlxuICAgICAgICAgIHZhbHVlPXtkYXRhLmVsZXZhdGlvblZhbHVlIHx8ICdOL0EnfVxuICAgICAgICAvPlxuICAgICAgKSA6IG51bGx9XG4gICAgPC90Ym9keT5cbiAgKTtcbn07XG5cbmZ1bmN0aW9uIF9nZXRDZWxsRm9ybWF0KHR5cGUpIHtcbiAgcmV0dXJuIEZJRUxEX0RJU1BMQVlfRk9STUFUW3R5cGVdO1xufVxuXG5jb25zdCBNYXBQb3BvdmVyRmFjdG9yeSA9ICAoKSA9PiBNYXBQb3BvdmVyO1xuZXhwb3J0IGRlZmF1bHQgTWFwUG9wb3ZlckZhY3Rvcnk7XG4iXX0=