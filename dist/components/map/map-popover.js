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

var StyledLayerName = _styledComponents2.CenterFlexbox.extend(_templateObject3(), function (props) {
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
        innerRef: function innerRef(comp) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21hcC9tYXAtcG9wb3Zlci5qcyJdLCJuYW1lcyI6WyJNQVhfV0lEVEgiLCJNQVhfSEVJR0hUIiwiU3R5bGVkTWFwUG9wb3ZlciIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJzY3JvbGxCYXIiLCJwYW5lbEJhY2tncm91bmQiLCJ0ZXh0Q29sb3IiLCJ0ZXh0Q29sb3JIbCIsIlN0eWxlZFBpbiIsInByaW1hcnlCdG5CZ2QiLCJsaW5rQnRuQ29sb3IiLCJTdHlsZWRMYXllck5hbWUiLCJDZW50ZXJGbGV4Ym94IiwiZXh0ZW5kIiwiTWFwUG9wb3ZlciIsInN0YXRlIiwiaXNNb3VzZU92ZXIiLCJ3aWR0aCIsImhlaWdodCIsIl9zZXRDb250YWluZXJTaXplIiwibm9kZSIsInBvcG92ZXIiLCJNYXRoIiwibWluIiwic2Nyb2xsV2lkdGgiLCJzY3JvbGxIZWlnaHQiLCJzZXRTdGF0ZSIsIngiLCJ5IiwidG9wT2Zmc2V0IiwibGVmdE9mZnNldCIsIm1hcFN0YXRlIiwicG9zIiwicmlnaHQiLCJsZWZ0IiwiYm90dG9tIiwidG9wIiwiaXNWaXNpYmxlIiwiZGF0YSIsImxheWVyIiwiZnJlZXplZCIsImZpZWxkcyIsImZpZWxkc1RvU2hvdyIsImhpZGRlbiIsImxlbmd0aCIsImluZm9Qcm9wcyIsInN0eWxlIiwiTnVtYmVyIiwiaXNGaW5pdGUiLCJfZ2V0UG9zaXRpb24iLCJjb21wIiwibWF4V2lkdGgiLCJvbkNsb3NlIiwiY29uZmlnIiwibGFiZWwiLCJpc0FnZ3JlZ2F0ZWQiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJhcnJheU9mIiwiYW55IiwiYm9vbCIsIm9iamVjdCIsIm9uZU9mVHlwZSIsIm51bWJlciIsImZ1bmMiLCJpc1JlcXVpcmVkIiwiUm93IiwibmFtZSIsInZhbHVlIiwidXJsIiwibWF0Y2giLCJhc0ltZyIsInRlc3QiLCJFbnRyeUluZm8iLCJtYXAiLCJFbnRyeUluZm9Sb3ciLCJmaWVsZCIsImZpbmQiLCJmIiwidmFsdWVJZHgiLCJ0YWJsZUZpZWxkSW5kZXgiLCJmb3JtYXQiLCJfZ2V0Q2VsbEZvcm1hdCIsInR5cGUiLCJDZWxsSW5mbyIsImNvbG9yRmllbGQiLCJzaXplRmllbGQiLCJwb2ludHMiLCJ2aXN1YWxDaGFubmVscyIsImNvbG9yIiwiZ2V0VmlzdWFsQ2hhbm5lbERlc2NyaXB0aW9uIiwibWVhc3VyZSIsImNvbG9yVmFsdWUiLCJzaXplIiwiZWxldmF0aW9uVmFsdWUiLCJGSUVMRF9ESVNQTEFZX0ZPUk1BVCIsIk1hcFBvcG92ZXJGYWN0b3J5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsU0FBUyxHQUFHLEdBQWxCO0FBQ0EsSUFBTUMsVUFBVSxHQUFHLEdBQW5COztBQUVBLElBQU1DLGdCQUFnQixHQUFHQywwQkFBT0MsR0FBVixvQkFDbEIsVUFBQUMsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZQyxTQUFoQjtBQUFBLENBRGEsRUFJQSxVQUFBRixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlFLGVBQWhCO0FBQUEsQ0FKTCxFQUtYLFVBQUFILEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUcsU0FBaEI7QUFBQSxDQUxNLEVBMEJQLFVBQUFKLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUcsU0FBaEI7QUFBQSxDQTFCRSxFQWdDUCxVQUFBSixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlJLFdBQWhCO0FBQUEsQ0FoQ0UsQ0FBdEI7O0FBcUNBLElBQU1DLFNBQVMsR0FBR1IsMEJBQU9DLEdBQVYscUJBS0osVUFBQUMsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZTSxhQUFoQjtBQUFB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ZUFDZWtGLGlCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7Q2VudGVyRmxleGJveH0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHtQaW4sIExheWVyc30gZnJvbSAnY29tcG9uZW50cy9jb21tb24vaWNvbnMnO1xuaW1wb3J0IHtGSUVMRF9ESVNQTEFZX0ZPUk1BVH0gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuXG5jb25zdCBNQVhfV0lEVEggPSA0MDA7XG5jb25zdCBNQVhfSEVJR0hUID0gNjAwO1xuXG5jb25zdCBTdHlsZWRNYXBQb3BvdmVyID0gc3R5bGVkLmRpdmBcbiAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zY3JvbGxCYXJ9XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbEJhY2tncm91bmR9O1xuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3J9O1xuICB6LWluZGV4OiAxMDAxO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIG92ZXJmbG93LXg6IGF1dG87XG5cbiAgLmd1dHRlciB7XG4gICAgaGVpZ2h0OiA2cHg7XG4gIH1cblxuICB0YWJsZSB7XG4gICAgbWFyZ2luOiAycHggMTJweCAxMnB4IDEycHg7XG4gICAgd2lkdGg6IGF1dG87XG5cbiAgICB0Ym9keSB7XG4gICAgICBib3JkZXItdG9wOiB0cmFuc3BhcmVudDtcbiAgICAgIGJvcmRlci1ib3R0b206IHRyYW5zcGFyZW50O1xuICAgIH1cblxuICAgIHRkIHtcbiAgICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICBwYWRkaW5nOiA0cHg7XG4gICAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3J9O1xuICAgIH1cblxuICAgIHRkLnJvd19fdmFsdWUge1xuICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9ySGx9O1xuICAgIH1cbiAgfVxuYDtcblxuY29uc3QgU3R5bGVkUGluID0gc3R5bGVkLmRpdmBcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiA1MCU7XG4gIHRyYW5zZm9ybTogcm90YXRlKDMwZGVnKTtcbiAgdG9wOiAxMHB4O1xuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wcmltYXJ5QnRuQmdkfTtcblxuICA6aG92ZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5saW5rQnRuQ29sb3J9O1xuICB9XG5gO1xuXG5jb25zdCBTdHlsZWRMYXllck5hbWUgPSBDZW50ZXJGbGV4Ym94LmV4dGVuZGBcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9ySGx9O1xuICBmb250LXNpemU6IDEycHg7XG4gIGxldHRlci1zcGFjaW5nOiAwLjQzcHg7XG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xuICBwYWRkaW5nLWxlZnQ6IDE0cHg7XG4gIG1hcmdpbi10b3A6IDEycHg7XG5cbiAgc3ZnIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDRweDtcbiAgfVxuYDtcblxuZXhwb3J0IGNsYXNzIE1hcFBvcG92ZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGZpZWxkczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSksXG4gICAgZmllbGRzVG9TaG93OiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KSxcbiAgICBpc1Zpc2libGU6IFByb3BUeXBlcy5ib29sLFxuICAgIGxheWVyOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGRhdGE6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLCBQcm9wVHlwZXMub2JqZWN0XSksXG4gICAgZnJlZXplZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgeDogUHJvcFR5cGVzLm51bWJlcixcbiAgICB5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG1hcFN0YXRlOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWRcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaXNNb3VzZU92ZXI6IGZhbHNlLFxuICAgICAgd2lkdGg6IDM4MCxcbiAgICAgIGhlaWdodDogMTYwXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuX3NldENvbnRhaW5lclNpemUoKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICB0aGlzLl9zZXRDb250YWluZXJTaXplKCk7XG4gIH1cblxuICBfc2V0Q29udGFpbmVyU2l6ZSgpIHtcbiAgICBjb25zdCBub2RlID0gdGhpcy5wb3BvdmVyO1xuICAgIGlmICghbm9kZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHdpZHRoID0gTWF0aC5taW4obm9kZS5zY3JvbGxXaWR0aCwgTUFYX1dJRFRIKTtcbiAgICBjb25zdCBoZWlnaHQgPSBNYXRoLm1pbihub2RlLnNjcm9sbEhlaWdodCwgTUFYX0hFSUdIVCk7XG5cbiAgICBpZiAod2lkdGggIT09IHRoaXMuc3RhdGUud2lkdGggfHwgaGVpZ2h0ICE9PSB0aGlzLnN0YXRlLmhlaWdodCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7d2lkdGgsIGhlaWdodH0pO1xuICAgIH1cbiAgfVxuXG4gIF9nZXRQb3NpdGlvbih4LCB5KSB7XG4gICAgY29uc3QgdG9wT2Zmc2V0ID0gMzA7XG4gICAgY29uc3QgbGVmdE9mZnNldCA9IDMwO1xuICAgIGNvbnN0IHttYXBTdGF0ZX0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHt3aWR0aCwgaGVpZ2h0fSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgcG9zID0ge307XG4gICAgaWYgKHggKyBsZWZ0T2Zmc2V0ICsgd2lkdGggPiBtYXBTdGF0ZS53aWR0aCkge1xuICAgICAgcG9zLnJpZ2h0ID0gbWFwU3RhdGUud2lkdGggLSB4ICsgbGVmdE9mZnNldDtcbiAgICB9IGVsc2Uge1xuICAgICAgcG9zLmxlZnQgPSB4ICsgbGVmdE9mZnNldDtcbiAgICB9XG5cbiAgICBpZiAoeSArIHRvcE9mZnNldCArIGhlaWdodCA+IG1hcFN0YXRlLmhlaWdodCkge1xuICAgICAgcG9zLmJvdHRvbSA9IDEwO1xuICAgIH0gZWxzZSB7XG4gICAgICBwb3MudG9wID0geSArIHRvcE9mZnNldDtcbiAgICB9XG5cbiAgICByZXR1cm4gcG9zO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHgsXG4gICAgICB5LFxuICAgICAgaXNWaXNpYmxlLFxuICAgICAgZGF0YSxcbiAgICAgIGxheWVyLFxuICAgICAgZnJlZXplZCxcbiAgICAgIGZpZWxkcyxcbiAgICAgIGZpZWxkc1RvU2hvdyA9IFtdXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaGlkZGVuID0gIWlzVmlzaWJsZSAmJiAhdGhpcy5zdGF0ZS5pc01vdXNlT3ZlcjtcbiAgICBjb25zdCB7d2lkdGh9ID0gdGhpcy5zdGF0ZTtcblxuICAgIGlmICghZGF0YSB8fCAhbGF5ZXIgfHwgIWZpZWxkc1RvU2hvdy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGluZm9Qcm9wcyA9IHtkYXRhLCBsYXllciwgZmllbGRzVG9TaG93LCBmaWVsZHN9O1xuXG4gICAgY29uc3Qgc3R5bGUgPVxuICAgICAgTnVtYmVyLmlzRmluaXRlKHgpICYmIE51bWJlci5pc0Zpbml0ZSh5KSA/IHRoaXMuX2dldFBvc2l0aW9uKHgsIHkpIDoge307XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFN0eWxlZE1hcFBvcG92ZXJcbiAgICAgICAgaW5uZXJSZWY9e2NvbXAgPT4ge1xuICAgICAgICAgIHRoaXMucG9wb3ZlciA9IGNvbXA7XG4gICAgICAgIH19XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcygnbWFwLXBvcG92ZXInLCB7aGlkZGVufSl9XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgLi4uc3R5bGUsXG4gICAgICAgICAgbWF4V2lkdGg6IHdpZHRoXG4gICAgICAgIH19XG4gICAgICAgIG9uTW91c2VFbnRlcj17KCkgPT4ge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzTW91c2VPdmVyOiB0cnVlfSk7XG4gICAgICAgIH19XG4gICAgICAgIG9uTW91c2VMZWF2ZT17KCkgPT4ge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzTW91c2VPdmVyOiBmYWxzZX0pO1xuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7ZnJlZXplZCA/IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1hcC1wb3BvdmVyX190b3BcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3V0dGVyXCIgLz5cbiAgICAgICAgICAgIDxTdHlsZWRQaW4gY2xhc3NOYW1lPVwicG9wb3Zlci1waW5cIiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2xvc2V9PlxuICAgICAgICAgICAgICA8UGluIGhlaWdodD1cIjE2cHhcIiAvPlxuICAgICAgICAgICAgPC9TdHlsZWRQaW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICA8U3R5bGVkTGF5ZXJOYW1lIGNsYXNzTmFtZT1cIm1hcC1wb3BvdmVyX19sYXllci1uYW1lXCI+XG4gICAgICAgICAgPExheWVycyBoZWlnaHQ9XCIxMnB4XCIvPntsYXllci5jb25maWcubGFiZWx9PC9TdHlsZWRMYXllck5hbWU+XG4gICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJtYXAtcG9wb3Zlcl9fdGFibGVcIj5cbiAgICAgICAgICB7bGF5ZXIuaXNBZ2dyZWdhdGVkID8gKFxuICAgICAgICAgICAgPENlbGxJbmZvIHsuLi5pbmZvUHJvcHN9IC8+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxFbnRyeUluZm8gey4uLmluZm9Qcm9wc30gLz5cbiAgICAgICAgICApfVxuICAgICAgICA8L3RhYmxlPlxuICAgICAgPC9TdHlsZWRNYXBQb3BvdmVyPlxuICAgICk7XG4gIH1cbn1cblxuY29uc3QgUm93ID0gKHtuYW1lLCB2YWx1ZSwgdXJsfSkgPT4ge1xuICAvLyBTZXQgJ3VybCcgdG8gJ3ZhbHVlJyBpZiBpdCBsb29rcyBsaWtlIGEgdXJsXG4gIGlmICghdXJsICYmIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUubWF0Y2goL15odHRwLykpIHtcbiAgICB1cmwgPSB2YWx1ZTtcbiAgfVxuXG4gIGNvbnN0IGFzSW1nID0gLzxpbWc+Ly50ZXN0KG5hbWUpO1xuICByZXR1cm4gKFxuICAgIDx0ciBjbGFzc05hbWU9XCJyb3dcIiBrZXk9e25hbWV9PlxuICAgICAgPHRkIGNsYXNzTmFtZT1cInJvd19fbmFtZVwiPntuYW1lfTwvdGQ+XG4gICAgICA8dGQgY2xhc3NOYW1lPVwicm93X192YWx1ZVwiPlxuICAgICAgICB7YXNJbWcgPyAoXG4gICAgICAgICAgPGltZyBzcmM9e3ZhbHVlfSAvPlxuICAgICAgICApIDogdXJsID8gKFxuICAgICAgICAgIDxhIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIiBocmVmPXt1cmx9PlxuICAgICAgICAgICAge3ZhbHVlfVxuICAgICAgICAgIDwvYT5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICB2YWx1ZVxuICAgICAgICApfVxuICAgICAgPC90ZD5cbiAgICA8L3RyPlxuICApO1xufTtcblxuY29uc3QgRW50cnlJbmZvID0gKHtmaWVsZHNUb1Nob3csIGZpZWxkcywgZGF0YX0pID0+IChcbiAgPHRib2R5PlxuICAgIHtmaWVsZHNUb1Nob3cubWFwKG5hbWUgPT4gKFxuICAgICAgPEVudHJ5SW5mb1JvdyBrZXk9e25hbWV9IG5hbWU9e25hbWV9IGZpZWxkcz17ZmllbGRzfSBkYXRhPXtkYXRhfSAvPlxuICAgICkpfVxuICA8L3Rib2R5PlxuKTtcblxuY29uc3QgRW50cnlJbmZvUm93ID0gKHtuYW1lLCBmaWVsZHMsIGRhdGF9KSA9PiB7XG4gIGNvbnN0IGZpZWxkID0gZmllbGRzLmZpbmQoZiA9PiBmLm5hbWUgPT09IG5hbWUpO1xuICBpZiAoIWZpZWxkKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCB2YWx1ZUlkeCA9IGZpZWxkLnRhYmxlRmllbGRJbmRleCAtIDE7XG4gIGNvbnN0IGZvcm1hdCA9IF9nZXRDZWxsRm9ybWF0KGZpZWxkLnR5cGUpO1xuXG4gIHJldHVybiAoXG4gICAgPFJvdyBuYW1lPXtuYW1lfSB2YWx1ZT17Zm9ybWF0ID8gZm9ybWF0KGRhdGFbdmFsdWVJZHhdKSA6IGRhdGFbdmFsdWVJZHhdfSAvPlxuICApO1xufTtcblxuY29uc3QgQ2VsbEluZm8gPSAoe2RhdGEsIGxheWVyfSkgPT4ge1xuICBjb25zdCB7Y29sb3JGaWVsZCwgc2l6ZUZpZWxkfSA9IGxheWVyLmNvbmZpZztcblxuICByZXR1cm4gKFxuICAgIDx0Ym9keT5cbiAgICAgIDxSb3cgbmFtZT17J3RvdGFsIHBvaW50cyd9IGtleT1cImNvdW50XCIgdmFsdWU9e2RhdGEucG9pbnRzICYmIGRhdGEucG9pbnRzLmxlbmd0aH0gLz5cbiAgICAgIHtjb2xvckZpZWxkICYmIGxheWVyLnZpc3VhbENoYW5uZWxzLmNvbG9yID8gKFxuICAgICAgICA8Um93XG4gICAgICAgICAgbmFtZT17bGF5ZXIuZ2V0VmlzdWFsQ2hhbm5lbERlc2NyaXB0aW9uKCdjb2xvcicpLm1lYXN1cmV9XG4gICAgICAgICAga2V5PVwiY29sb3JcIlxuICAgICAgICAgIHZhbHVlPXtkYXRhLmNvbG9yVmFsdWUgfHwgJ04vQSd9XG4gICAgICAgIC8+XG4gICAgICApIDogbnVsbH1cbiAgICAgIHtzaXplRmllbGQgJiYgbGF5ZXIudmlzdWFsQ2hhbm5lbHMuc2l6ZSA/IChcbiAgICAgICAgPFJvd1xuICAgICAgICAgIG5hbWU9e2xheWVyLmdldFZpc3VhbENoYW5uZWxEZXNjcmlwdGlvbignc2l6ZScpLm1lYXN1cmV9XG4gICAgICAgICAga2V5PVwic2l6ZVwiXG4gICAgICAgICAgdmFsdWU9e2RhdGEuZWxldmF0aW9uVmFsdWUgfHwgJ04vQSd9XG4gICAgICAgIC8+XG4gICAgICApIDogbnVsbH1cbiAgICA8L3Rib2R5PlxuICApO1xufTtcblxuZnVuY3Rpb24gX2dldENlbGxGb3JtYXQodHlwZSkge1xuICByZXR1cm4gRklFTERfRElTUExBWV9GT1JNQVRbdHlwZV07XG59XG5cbmNvbnN0IE1hcFBvcG92ZXJGYWN0b3J5ID0gICgpID0+IE1hcFBvcG92ZXI7XG5leHBvcnQgZGVmYXVsdCBNYXBQb3BvdmVyRmFjdG9yeTtcbiJdfQ==