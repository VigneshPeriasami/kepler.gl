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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21hcC9tYXAtcG9wb3Zlci5qcyJdLCJuYW1lcyI6WyJNQVhfV0lEVEgiLCJNQVhfSEVJR0hUIiwiU3R5bGVkTWFwUG9wb3ZlciIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJzY3JvbGxCYXIiLCJwYW5lbEJhY2tncm91bmQiLCJ0ZXh0Q29sb3IiLCJ0ZXh0Q29sb3JIbCIsIlN0eWxlZFBpbiIsInByaW1hcnlCdG5CZ2QiLCJsaW5rQnRuQ29sb3IiLCJTdHlsZWRMYXllck5hbWUiLCJDZW50ZXJGbGV4Ym94IiwiTWFwUG9wb3ZlciIsInN0YXRlIiwiaXNNb3VzZU92ZXIiLCJ3aWR0aCIsImhlaWdodCIsIl9zZXRDb250YWluZXJTaXplIiwibm9kZSIsInBvcG92ZXIiLCJNYXRoIiwibWluIiwic2Nyb2xsV2lkdGgiLCJzY3JvbGxIZWlnaHQiLCJzZXRTdGF0ZSIsIngiLCJ5IiwidG9wT2Zmc2V0IiwibGVmdE9mZnNldCIsIm1hcFN0YXRlIiwicG9zIiwicmlnaHQiLCJsZWZ0IiwiYm90dG9tIiwidG9wIiwiaXNWaXNpYmxlIiwiZGF0YSIsImxheWVyIiwiZnJlZXplZCIsImZpZWxkcyIsImZpZWxkc1RvU2hvdyIsImhpZGRlbiIsImxlbmd0aCIsImluZm9Qcm9wcyIsInN0eWxlIiwiTnVtYmVyIiwiaXNGaW5pdGUiLCJfZ2V0UG9zaXRpb24iLCJjb21wIiwibWF4V2lkdGgiLCJvbkNsb3NlIiwiY29uZmlnIiwibGFiZWwiLCJpc0FnZ3JlZ2F0ZWQiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJhcnJheU9mIiwiYW55IiwiYm9vbCIsIm9iamVjdCIsIm9uZU9mVHlwZSIsIm51bWJlciIsImZ1bmMiLCJpc1JlcXVpcmVkIiwiUm93IiwibmFtZSIsInZhbHVlIiwidXJsIiwibWF0Y2giLCJhc0ltZyIsInRlc3QiLCJFbnRyeUluZm8iLCJtYXAiLCJFbnRyeUluZm9Sb3ciLCJmaWVsZCIsImZpbmQiLCJmIiwidmFsdWVJZHgiLCJ0YWJsZUZpZWxkSW5kZXgiLCJmb3JtYXQiLCJfZ2V0Q2VsbEZvcm1hdCIsInR5cGUiLCJDZWxsSW5mbyIsImNvbG9yRmllbGQiLCJzaXplRmllbGQiLCJwb2ludHMiLCJ2aXN1YWxDaGFubmVscyIsImNvbG9yIiwiZ2V0VmlzdWFsQ2hhbm5lbERlc2NyaXB0aW9uIiwibWVhc3VyZSIsImNvbG9yVmFsdWUiLCJzaXplIiwiZWxldmF0aW9uVmFsdWUiLCJGSUVMRF9ESVNQTEFZX0ZPUk1BVCIsIk1hcFBvcG92ZXJGYWN0b3J5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsU0FBUyxHQUFHLEdBQWxCO0FBQ0EsSUFBTUMsVUFBVSxHQUFHLEdBQW5COztBQUVBLElBQU1DLGdCQUFnQixHQUFHQywwQkFBT0MsR0FBVixvQkFDbEIsVUFBQUMsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZQyxTQUFoQjtBQUFBLENBRGEsRUFJQSxVQUFBRixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlFLGVBQWhCO0FBQUEsQ0FKTCxFQUtYLFVBQUFILEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUcsU0FBaEI7QUFBQSxDQUxNLEVBMEJQLFVBQUFKLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUcsU0FBaEI7QUFBQSxDQTFCRSxFQWdDUCxVQUFBSixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlJLFdBQWhCO0FBQUEsQ0FoQ0UsQ0FBdEI7O0FBcUNBLElBQU1DLFNBQVMsR0FBR1IsMEJBQU9DLEdBQVYscUJBS0osVUFBQUMsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZTSxhQUFoQjtBQUFBLENBTEQsRUFT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RixpQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQge0NlbnRlckZsZXhib3h9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7UGluLCBMYXllcnN9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ljb25zJztcbmltcG9ydCB7RklFTERfRElTUExBWV9GT1JNQVR9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcblxuY29uc3QgTUFYX1dJRFRIID0gNDAwO1xuY29uc3QgTUFYX0hFSUdIVCA9IDYwMDtcblxuY29uc3QgU3R5bGVkTWFwUG9wb3ZlciA9IHN0eWxlZC5kaXZgXG4gICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2Nyb2xsQmFyfVxuICBmb250LXNpemU6IDExcHg7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxCYWNrZ3JvdW5kfTtcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9yfTtcbiAgei1pbmRleDogMTAwMTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBvdmVyZmxvdy14OiBhdXRvO1xuXG4gIC5ndXR0ZXIge1xuICAgIGhlaWdodDogNnB4O1xuICB9XG5cbiAgdGFibGUge1xuICAgIG1hcmdpbjogMnB4IDEycHggMTJweCAxMnB4O1xuICAgIHdpZHRoOiBhdXRvO1xuXG4gICAgdGJvZHkge1xuICAgICAgYm9yZGVyLXRvcDogdHJhbnNwYXJlbnQ7XG4gICAgICBib3JkZXItYm90dG9tOiB0cmFuc3BhcmVudDtcbiAgICB9XG5cbiAgICB0ZCB7XG4gICAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgcGFkZGluZzogNHB4O1xuICAgICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9yfTtcbiAgICB9XG5cbiAgICB0ZC5yb3dfX3ZhbHVlIHtcbiAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvckhsfTtcbiAgICB9XG4gIH1cbmA7XG5cbmNvbnN0IFN0eWxlZFBpbiA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogNTAlO1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgzMGRlZyk7XG4gIHRvcDogMTBweDtcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucHJpbWFyeUJ0bkJnZH07XG5cbiAgOmhvdmVyIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGlua0J0bkNvbG9yfTtcbiAgfVxuYDtcblxuY29uc3QgU3R5bGVkTGF5ZXJOYW1lID0gc3R5bGVkKENlbnRlckZsZXhib3gpYFxuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JIbH07XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNDNweDtcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG4gIHBhZGRpbmctbGVmdDogMTRweDtcbiAgbWFyZ2luLXRvcDogMTJweDtcblxuICBzdmcge1xuICAgIG1hcmdpbi1yaWdodDogNHB4O1xuICB9XG5gO1xuXG5leHBvcnQgY2xhc3MgTWFwUG9wb3ZlciBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZmllbGRzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KSxcbiAgICBmaWVsZHNUb1Nob3c6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLFxuICAgIGlzVmlzaWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgbGF5ZXI6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgZGF0YTogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSksIFByb3BUeXBlcy5vYmplY3RdKSxcbiAgICBmcmVlemVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgbWFwU3RhdGU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpc01vdXNlT3ZlcjogZmFsc2UsXG4gICAgICB3aWR0aDogMzgwLFxuICAgICAgaGVpZ2h0OiAxNjBcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5fc2V0Q29udGFpbmVyU2l6ZSgpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIHRoaXMuX3NldENvbnRhaW5lclNpemUoKTtcbiAgfVxuXG4gIF9zZXRDb250YWluZXJTaXplKCkge1xuICAgIGNvbnN0IG5vZGUgPSB0aGlzLnBvcG92ZXI7XG4gICAgaWYgKCFub2RlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgd2lkdGggPSBNYXRoLm1pbihub2RlLnNjcm9sbFdpZHRoLCBNQVhfV0lEVEgpO1xuICAgIGNvbnN0IGhlaWdodCA9IE1hdGgubWluKG5vZGUuc2Nyb2xsSGVpZ2h0LCBNQVhfSEVJR0hUKTtcblxuICAgIGlmICh3aWR0aCAhPT0gdGhpcy5zdGF0ZS53aWR0aCB8fCBoZWlnaHQgIT09IHRoaXMuc3RhdGUuaGVpZ2h0KSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHt3aWR0aCwgaGVpZ2h0fSk7XG4gICAgfVxuICB9XG5cbiAgX2dldFBvc2l0aW9uKHgsIHkpIHtcbiAgICBjb25zdCB0b3BPZmZzZXQgPSAzMDtcbiAgICBjb25zdCBsZWZ0T2Zmc2V0ID0gMzA7XG4gICAgY29uc3Qge21hcFN0YXRlfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge3dpZHRoLCBoZWlnaHR9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBwb3MgPSB7fTtcbiAgICBpZiAoeCArIGxlZnRPZmZzZXQgKyB3aWR0aCA+IG1hcFN0YXRlLndpZHRoKSB7XG4gICAgICBwb3MucmlnaHQgPSBtYXBTdGF0ZS53aWR0aCAtIHggKyBsZWZ0T2Zmc2V0O1xuICAgIH0gZWxzZSB7XG4gICAgICBwb3MubGVmdCA9IHggKyBsZWZ0T2Zmc2V0O1xuICAgIH1cblxuICAgIGlmICh5ICsgdG9wT2Zmc2V0ICsgaGVpZ2h0ID4gbWFwU3RhdGUuaGVpZ2h0KSB7XG4gICAgICBwb3MuYm90dG9tID0gMTA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBvcy50b3AgPSB5ICsgdG9wT2Zmc2V0O1xuICAgIH1cblxuICAgIHJldHVybiBwb3M7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgeCxcbiAgICAgIHksXG4gICAgICBpc1Zpc2libGUsXG4gICAgICBkYXRhLFxuICAgICAgbGF5ZXIsXG4gICAgICBmcmVlemVkLFxuICAgICAgZmllbGRzLFxuICAgICAgZmllbGRzVG9TaG93ID0gW11cbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBoaWRkZW4gPSAhaXNWaXNpYmxlICYmICF0aGlzLnN0YXRlLmlzTW91c2VPdmVyO1xuICAgIGNvbnN0IHt3aWR0aH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgaWYgKCFkYXRhIHx8ICFsYXllciB8fCAhZmllbGRzVG9TaG93Lmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgaW5mb1Byb3BzID0ge2RhdGEsIGxheWVyLCBmaWVsZHNUb1Nob3csIGZpZWxkc307XG5cbiAgICBjb25zdCBzdHlsZSA9XG4gICAgICBOdW1iZXIuaXNGaW5pdGUoeCkgJiYgTnVtYmVyLmlzRmluaXRlKHkpID8gdGhpcy5fZ2V0UG9zaXRpb24oeCwgeSkgOiB7fTtcblxuICAgIHJldHVybiAoXG4gICAgICA8U3R5bGVkTWFwUG9wb3ZlclxuICAgICAgICBpbm5lclJlZj17Y29tcCA9PiB7XG4gICAgICAgICAgdGhpcy5wb3BvdmVyID0gY29tcDtcbiAgICAgICAgfX1cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCdtYXAtcG9wb3ZlcicsIHtoaWRkZW59KX1cbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAuLi5zdHlsZSxcbiAgICAgICAgICBtYXhXaWR0aDogd2lkdGhcbiAgICAgICAgfX1cbiAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNNb3VzZU92ZXI6IHRydWV9KTtcbiAgICAgICAgfX1cbiAgICAgICAgb25Nb3VzZUxlYXZlPXsoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNNb3VzZU92ZXI6IGZhbHNlfSk7XG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHtmcmVlemVkID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFwLXBvcG92ZXJfX3RvcFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJndXR0ZXJcIiAvPlxuICAgICAgICAgICAgPFN0eWxlZFBpbiBjbGFzc05hbWU9XCJwb3BvdmVyLXBpblwiIG9uQ2xpY2s9e3RoaXMucHJvcHMub25DbG9zZX0+XG4gICAgICAgICAgICAgIDxQaW4gaGVpZ2h0PVwiMTZweFwiIC8+XG4gICAgICAgICAgICA8L1N0eWxlZFBpbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDxTdHlsZWRMYXllck5hbWUgY2xhc3NOYW1lPVwibWFwLXBvcG92ZXJfX2xheWVyLW5hbWVcIj5cbiAgICAgICAgICA8TGF5ZXJzIGhlaWdodD1cIjEycHhcIi8+e2xheWVyLmNvbmZpZy5sYWJlbH08L1N0eWxlZExheWVyTmFtZT5cbiAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cIm1hcC1wb3BvdmVyX190YWJsZVwiPlxuICAgICAgICAgIHtsYXllci5pc0FnZ3JlZ2F0ZWQgPyAoXG4gICAgICAgICAgICA8Q2VsbEluZm8gey4uLmluZm9Qcm9wc30gLz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPEVudHJ5SW5mbyB7Li4uaW5mb1Byb3BzfSAvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvdGFibGU+XG4gICAgICA8L1N0eWxlZE1hcFBvcG92ZXI+XG4gICAgKTtcbiAgfVxufVxuXG5jb25zdCBSb3cgPSAoe25hbWUsIHZhbHVlLCB1cmx9KSA9PiB7XG4gIC8vIFNldCAndXJsJyB0byAndmFsdWUnIGlmIGl0IGxvb2tzIGxpa2UgYSB1cmxcbiAgaWYgKCF1cmwgJiYgdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZS5tYXRjaCgvXmh0dHAvKSkge1xuICAgIHVybCA9IHZhbHVlO1xuICB9XG5cbiAgY29uc3QgYXNJbWcgPSAvPGltZz4vLnRlc3QobmFtZSk7XG4gIHJldHVybiAoXG4gICAgPHRyIGNsYXNzTmFtZT1cInJvd1wiIGtleT17bmFtZX0+XG4gICAgICA8dGQgY2xhc3NOYW1lPVwicm93X19uYW1lXCI+e25hbWV9PC90ZD5cbiAgICAgIDx0ZCBjbGFzc05hbWU9XCJyb3dfX3ZhbHVlXCI+XG4gICAgICAgIHthc0ltZyA/IChcbiAgICAgICAgICA8aW1nIHNyYz17dmFsdWV9IC8+XG4gICAgICAgICkgOiB1cmwgPyAoXG4gICAgICAgICAgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiIGhyZWY9e3VybH0+XG4gICAgICAgICAgICB7dmFsdWV9XG4gICAgICAgICAgPC9hPlxuICAgICAgICApIDogKFxuICAgICAgICAgIHZhbHVlXG4gICAgICAgICl9XG4gICAgICA8L3RkPlxuICAgIDwvdHI+XG4gICk7XG59O1xuXG5jb25zdCBFbnRyeUluZm8gPSAoe2ZpZWxkc1RvU2hvdywgZmllbGRzLCBkYXRhfSkgPT4gKFxuICA8dGJvZHk+XG4gICAge2ZpZWxkc1RvU2hvdy5tYXAobmFtZSA9PiAoXG4gICAgICA8RW50cnlJbmZvUm93IGtleT17bmFtZX0gbmFtZT17bmFtZX0gZmllbGRzPXtmaWVsZHN9IGRhdGE9e2RhdGF9IC8+XG4gICAgKSl9XG4gIDwvdGJvZHk+XG4pO1xuXG5jb25zdCBFbnRyeUluZm9Sb3cgPSAoe25hbWUsIGZpZWxkcywgZGF0YX0pID0+IHtcbiAgY29uc3QgZmllbGQgPSBmaWVsZHMuZmluZChmID0+IGYubmFtZSA9PT0gbmFtZSk7XG4gIGlmICghZmllbGQpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IHZhbHVlSWR4ID0gZmllbGQudGFibGVGaWVsZEluZGV4IC0gMTtcbiAgY29uc3QgZm9ybWF0ID0gX2dldENlbGxGb3JtYXQoZmllbGQudHlwZSk7XG5cbiAgcmV0dXJuIChcbiAgICA8Um93IG5hbWU9e25hbWV9IHZhbHVlPXtmb3JtYXQgPyBmb3JtYXQoZGF0YVt2YWx1ZUlkeF0pIDogZGF0YVt2YWx1ZUlkeF19IC8+XG4gICk7XG59O1xuXG5jb25zdCBDZWxsSW5mbyA9ICh7ZGF0YSwgbGF5ZXJ9KSA9PiB7XG4gIGNvbnN0IHtjb2xvckZpZWxkLCBzaXplRmllbGR9ID0gbGF5ZXIuY29uZmlnO1xuXG4gIHJldHVybiAoXG4gICAgPHRib2R5PlxuICAgICAgPFJvdyBuYW1lPXsndG90YWwgcG9pbnRzJ30ga2V5PVwiY291bnRcIiB2YWx1ZT17ZGF0YS5wb2ludHMgJiYgZGF0YS5wb2ludHMubGVuZ3RofSAvPlxuICAgICAge2NvbG9yRmllbGQgJiYgbGF5ZXIudmlzdWFsQ2hhbm5lbHMuY29sb3IgPyAoXG4gICAgICAgIDxSb3dcbiAgICAgICAgICBuYW1lPXtsYXllci5nZXRWaXN1YWxDaGFubmVsRGVzY3JpcHRpb24oJ2NvbG9yJykubWVhc3VyZX1cbiAgICAgICAgICBrZXk9XCJjb2xvclwiXG4gICAgICAgICAgdmFsdWU9e2RhdGEuY29sb3JWYWx1ZSB8fCAnTi9BJ31cbiAgICAgICAgLz5cbiAgICAgICkgOiBudWxsfVxuICAgICAge3NpemVGaWVsZCAmJiBsYXllci52aXN1YWxDaGFubmVscy5zaXplID8gKFxuICAgICAgICA8Um93XG4gICAgICAgICAgbmFtZT17bGF5ZXIuZ2V0VmlzdWFsQ2hhbm5lbERlc2NyaXB0aW9uKCdzaXplJykubWVhc3VyZX1cbiAgICAgICAgICBrZXk9XCJzaXplXCJcbiAgICAgICAgICB2YWx1ZT17ZGF0YS5lbGV2YXRpb25WYWx1ZSB8fCAnTi9BJ31cbiAgICAgICAgLz5cbiAgICAgICkgOiBudWxsfVxuICAgIDwvdGJvZHk+XG4gICk7XG59O1xuXG5mdW5jdGlvbiBfZ2V0Q2VsbEZvcm1hdCh0eXBlKSB7XG4gIHJldHVybiBGSUVMRF9ESVNQTEFZX0ZPUk1BVFt0eXBlXTtcbn1cblxuY29uc3QgTWFwUG9wb3ZlckZhY3RvcnkgPSAgKCkgPT4gTWFwUG9wb3ZlcjtcbmV4cG9ydCBkZWZhdWx0IE1hcFBvcG92ZXJGYWN0b3J5O1xuIl19