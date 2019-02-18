"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.StyledConfigGroupHeader = exports.StyledLayerConfigGroup = exports.ConfigGroupCollapsibleContent = exports.StyledLayerConfigGroupAction = exports.StyledLayerConfigGroupLabel = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _classnames = _interopRequireDefault(require("classnames"));

var _switch = _interopRequireDefault(require("../../common/switch"));

var _icons = require("../../common/icons");

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  &.disabled {\n    opacity: 0.3;\n    pointer-events: none;\n    * {\n      pointer-events: none;\n    }\n  }\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 12px;\n\n  :hover {\n    cursor: pointer;\n    .layer-config-group__label {\n      color: ", ";\n      border-left: 2px solid ", ";\n    }\n\n    .layer-config-group__action {\n      color:  ", ";\n    }\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  padding-left: 18px;\n  margin-bottom: 12px;\n\n  &.collapsed {\n    .layer-config-group__content {\n\n      .layer-config-group__content__collapsible {\n        /* display: none; */\n        /* flex: 0; */\n        overflow: hidden;\n        max-height: 0;\n      }\n    }\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  overflow: visible;\n  transition: max-height 0.3s ease-out;\n  height: max-content;\n  max-height: 600px;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  align-items: center;\n  color: ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  border-left: 2px solid ", ";\n  color: ", ";\n  font-size: 12px;\n  font-weight: 500;\n  line-height: 12px;\n  margin-left: -12px;\n  padding-left: 10px;\n  text-transform: capitalize;\n  letter-spacing: 0.2px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var StyledLayerConfigGroupLabel = _styledComponents.default.div(_templateObject(), function (props) {
  return props.theme.labelColor;
}, function (props) {
  return props.theme.textColor;
});

exports.StyledLayerConfigGroupLabel = StyledLayerConfigGroupLabel;

var StyledLayerConfigGroupAction = _styledComponents.default.div(_templateObject2(), function (props) {
  return props.theme.textColor;
});

exports.StyledLayerConfigGroupAction = StyledLayerConfigGroupAction;

var ConfigGroupCollapsibleContent = _styledComponents.default.div.attrs({
  className: 'layer-config-group__content__collapsible'
})(_templateObject3());

exports.ConfigGroupCollapsibleContent = ConfigGroupCollapsibleContent;

var StyledLayerConfigGroup = _styledComponents.default.div(_templateObject4());

exports.StyledLayerConfigGroup = StyledLayerConfigGroup;

var StyledConfigGroupHeader = _styledComponents.default.div(_templateObject5(), function (props) {
  return props.theme.textColorHl;
}, function (props) {
  return props.theme.textColorHl;
}, function (props) {
  return props.theme.textColorHl;
});

exports.StyledConfigGroupHeader = StyledConfigGroupHeader;

var ConfigGroupContent = _styledComponents.default.div(_templateObject6());

var LayerConfigGroup =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(LayerConfigGroup, _Component);

  function LayerConfigGroup() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, LayerConfigGroup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(LayerConfigGroup)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      collapsed: true
    });
    return _this;
  }

  (0, _createClass2.default)(LayerConfigGroup, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._setCollapseState(this.props.expanded);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this._setCollapseState(nextProps.expanded);
    }
  }, {
    key: "_setCollapseState",
    value: function _setCollapseState(expanded) {
      // if props,expanded, and state collapsed, set collapsed to be false
      if (expanded && this.state.collapsed) {
        this.setState({
          collapsed: false
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          label = _this$props.label,
          children = _this$props.children,
          property = _this$props.property,
          layer = _this$props.layer,
          _onChange2 = _this$props.onChange,
          collapsible = _this$props.collapsible;
      var collapsed = this.state.collapsed;
      return _react.default.createElement(StyledLayerConfigGroup, {
        className: (0, _classnames.default)('layer-config-group', {
          collapsed: collapsed
        })
      }, _react.default.createElement(StyledConfigGroupHeader, {
        className: "layer-config-group__header",
        onClick: function onClick() {
          return _this2.setState({
            collapsed: !_this2.state.collapsed
          });
        }
      }, _react.default.createElement(StyledLayerConfigGroupLabel, {
        className: "layer-config-group__label"
      }, label), _react.default.createElement(StyledLayerConfigGroupAction, {
        className: "layer-config-group__action"
      }, property ? _react.default.createElement(_switch.default, {
        checked: layer.config.visConfig[property],
        id: "".concat(layer.id, "-").concat(property),
        onChange: function onChange() {
          return _onChange2((0, _defineProperty2.default)({}, property, !layer.config.visConfig[property]));
        }
      }) : null, collapsible ? _react.default.createElement(_icons.VertThreeDots, {
        height: "18px"
      }) : null)), _react.default.createElement(ConfigGroupContent, {
        className: (0, _classnames.default)('layer-config-group__content', {
          disabled: property && !layer.config.visConfig[property]
        })
      }, children));
    }
  }]);
  return LayerConfigGroup;
}(_react.Component);

exports.default = LayerConfigGroup;
(0, _defineProperty2.default)(LayerConfigGroup, "defaultProps", {
  collapsible: false,
  expanded: false,
  onChange: function onChange() {}
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItcGFuZWwvbGF5ZXItY29uZmlnLWdyb3VwLmpzIl0sIm5hbWVzIjpbIlN0eWxlZExheWVyQ29uZmlnR3JvdXBMYWJlbCIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJsYWJlbENvbG9yIiwidGV4dENvbG9yIiwiU3R5bGVkTGF5ZXJDb25maWdHcm91cEFjdGlvbiIsIkNvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50IiwiYXR0cnMiLCJjbGFzc05hbWUiLCJTdHlsZWRMYXllckNvbmZpZ0dyb3VwIiwiU3R5bGVkQ29uZmlnR3JvdXBIZWFkZXIiLCJ0ZXh0Q29sb3JIbCIsIkNvbmZpZ0dyb3VwQ29udGVudCIsIkxheWVyQ29uZmlnR3JvdXAiLCJjb2xsYXBzZWQiLCJfc2V0Q29sbGFwc2VTdGF0ZSIsImV4cGFuZGVkIiwibmV4dFByb3BzIiwic3RhdGUiLCJzZXRTdGF0ZSIsImxhYmVsIiwiY2hpbGRyZW4iLCJwcm9wZXJ0eSIsImxheWVyIiwib25DaGFuZ2UiLCJjb2xsYXBzaWJsZSIsImNvbmZpZyIsInZpc0NvbmZpZyIsImlkIiwiZGlzYWJsZWQiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFTyxJQUFNQSwyQkFBMkIsR0FBR0MsMEJBQU9DLEdBQVYsb0JBQ2IsVUFBQUMsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZQyxVQUFoQjtBQUFBLENBRFEsRUFFN0IsVUFBQUYsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZRSxTQUFoQjtBQUFBLENBRndCLENBQWpDOzs7O0FBWUEsSUFBTUMsNEJBQTRCLEdBQUdO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RUFBQztBQUF0QixRQUFILEdBQW9DLElBVmxELENBTkYsQ0FERixFQW9CRSw2QkFBQyxrQkFBRDtBQUNFLFFBQUEsU0FBUyxFQUFFLHlCQUFXLDZCQUFYLEVBQTBDO0FBQ25ESSxVQUFBQSxRQUFRLEVBQUVQLFFBQVEsSUFBSSxDQUFDQyxLQUFLLENBQUNHLE1BQU4sQ0FBYUMsU0FBYixDQUF1QkwsUUFBdkI7QUFENEIsU0FBMUM7QUFEYixTQUtHRCxRQUxILENBcEJGLENBREY7QUE4QkQ7OztFQXJFMkNTLGdCOzs7OEJBQXpCakIsZ0Isa0JBRUc7QUFDcEJZLEVBQUFBLFdBQVcsRUFBRSxLQURPO0FBRXBCVCxFQUFBQSxRQUFRLEVBQUUsS0FGVTtBQUdwQlEsRUFBQUEsUUFBUSxFQUFFLG9CQUFNLENBQUU7QUFIRSxDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IFN3aXRjaCBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zd2l0Y2gnO1xuaW1wb3J0IHtWZXJ0VGhyZWVEb3RzfSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9pY29ucyc7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRMYXllckNvbmZpZ0dyb3VwTGFiZWwgPSBzdHlsZWQuZGl2YFxuICBib3JkZXItbGVmdDogMnB4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGFiZWxDb2xvcn07XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvcn07XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgbGluZS1oZWlnaHQ6IDEycHg7XG4gIG1hcmdpbi1sZWZ0OiAtMTJweDtcbiAgcGFkZGluZy1sZWZ0OiAxMHB4O1xuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMnB4O1xuYDtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZExheWVyQ29uZmlnR3JvdXBBY3Rpb24gPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3J9O1xuYDtcblxuZXhwb3J0IGNvbnN0IENvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50ID0gc3R5bGVkLmRpdi5hdHRycyh7XG4gIGNsYXNzTmFtZTogJ2xheWVyLWNvbmZpZy1ncm91cF9fY29udGVudF9fY29sbGFwc2libGUnXG59KWBcbiAgb3ZlcmZsb3c6IHZpc2libGU7XG4gIHRyYW5zaXRpb246IG1heC1oZWlnaHQgMC4zcyBlYXNlLW91dDtcbiAgaGVpZ2h0OiBtYXgtY29udGVudDtcbiAgbWF4LWhlaWdodDogNjAwcHg7XG5gO1xuXG5leHBvcnQgY29uc3QgU3R5bGVkTGF5ZXJDb25maWdHcm91cCA9IHN0eWxlZC5kaXZgXG4gIHBhZGRpbmctbGVmdDogMThweDtcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcblxuICAmLmNvbGxhcHNlZCB7XG4gICAgLmxheWVyLWNvbmZpZy1ncm91cF9fY29udGVudCB7XG5cbiAgICAgIC5sYXllci1jb25maWctZ3JvdXBfX2NvbnRlbnRfX2NvbGxhcHNpYmxlIHtcbiAgICAgICAgLyogZGlzcGxheTogbm9uZTsgKi9cbiAgICAgICAgLyogZmxleDogMDsgKi9cbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgbWF4LWhlaWdodDogMDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRDb25maWdHcm91cEhlYWRlciA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcblxuICA6aG92ZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAubGF5ZXItY29uZmlnLWdyb3VwX19sYWJlbCB7XG4gICAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JIbH07XG4gICAgICBib3JkZXItbGVmdDogMnB4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9ySGx9O1xuICAgIH1cblxuICAgIC5sYXllci1jb25maWctZ3JvdXBfX2FjdGlvbiB7XG4gICAgICBjb2xvcjogICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9ySGx9O1xuICAgIH1cbiAgfVxuYDtcblxuY29uc3QgQ29uZmlnR3JvdXBDb250ZW50ID0gc3R5bGVkLmRpdmBcbiAgJi5kaXNhYmxlZCB7XG4gICAgb3BhY2l0eTogMC4zO1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICoge1xuICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgfVxuICB9XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMYXllckNvbmZpZ0dyb3VwIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGNvbGxhcHNpYmxlOiBmYWxzZSxcbiAgICBleHBhbmRlZDogZmFsc2UsXG4gICAgb25DaGFuZ2U6ICgpID0+IHt9XG4gIH07XG5cbiAgc3RhdGUgPSB7XG4gICAgY29sbGFwc2VkOiB0cnVlXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5fc2V0Q29sbGFwc2VTdGF0ZSh0aGlzLnByb3BzLmV4cGFuZGVkKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgdGhpcy5fc2V0Q29sbGFwc2VTdGF0ZShuZXh0UHJvcHMuZXhwYW5kZWQpO1xuICB9XG5cbiAgX3NldENvbGxhcHNlU3RhdGUoZXhwYW5kZWQpIHtcbiAgICAvLyBpZiBwcm9wcyxleHBhbmRlZCwgYW5kIHN0YXRlIGNvbGxhcHNlZCwgc2V0IGNvbGxhcHNlZCB0byBiZSBmYWxzZVxuICAgIGlmIChleHBhbmRlZCAmJiB0aGlzLnN0YXRlLmNvbGxhcHNlZCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29sbGFwc2VkOiBmYWxzZX0pO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBsYWJlbCxcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgcHJvcGVydHksXG4gICAgICBsYXllcixcbiAgICAgIG9uQ2hhbmdlLFxuICAgICAgY29sbGFwc2libGVcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHtjb2xsYXBzZWR9ID0gdGhpcy5zdGF0ZTtcblxuICAgIHJldHVybiAoXG4gICAgICA8U3R5bGVkTGF5ZXJDb25maWdHcm91cCBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ2xheWVyLWNvbmZpZy1ncm91cCcsIHtjb2xsYXBzZWR9KX0+XG4gICAgICAgIDxTdHlsZWRDb25maWdHcm91cEhlYWRlciBjbGFzc05hbWU9XCJsYXllci1jb25maWctZ3JvdXBfX2hlYWRlclwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5zZXRTdGF0ZSh7Y29sbGFwc2VkOiAhdGhpcy5zdGF0ZS5jb2xsYXBzZWR9KX1cbiAgICAgICAgPlxuICAgICAgICAgIDxTdHlsZWRMYXllckNvbmZpZ0dyb3VwTGFiZWwgY2xhc3NOYW1lPVwibGF5ZXItY29uZmlnLWdyb3VwX19sYWJlbFwiPlxuICAgICAgICAgICAge2xhYmVsfVxuICAgICAgICAgIDwvU3R5bGVkTGF5ZXJDb25maWdHcm91cExhYmVsPlxuICAgICAgICAgIDxTdHlsZWRMYXllckNvbmZpZ0dyb3VwQWN0aW9uIGNsYXNzTmFtZT1cImxheWVyLWNvbmZpZy1ncm91cF9fYWN0aW9uXCI+XG4gICAgICAgICAgICB7cHJvcGVydHkgPyAoXG4gICAgICAgICAgICAgIDxTd2l0Y2hcbiAgICAgICAgICAgICAgICBjaGVja2VkPXtsYXllci5jb25maWcudmlzQ29uZmlnW3Byb3BlcnR5XX1cbiAgICAgICAgICAgICAgICBpZD17YCR7bGF5ZXIuaWR9LSR7cHJvcGVydHl9YH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KCkgPT5cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlKHtbcHJvcGVydHldOiAhbGF5ZXIuY29uZmlnLnZpc0NvbmZpZ1twcm9wZXJ0eV19KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAge2NvbGxhcHNpYmxlID8gPFZlcnRUaHJlZURvdHMgaGVpZ2h0PVwiMThweFwiLz4gOiBudWxsfVxuICAgICAgICAgIDwvU3R5bGVkTGF5ZXJDb25maWdHcm91cEFjdGlvbj5cbiAgICAgICAgPC9TdHlsZWRDb25maWdHcm91cEhlYWRlcj5cbiAgICAgICAgPENvbmZpZ0dyb3VwQ29udGVudFxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcygnbGF5ZXItY29uZmlnLWdyb3VwX19jb250ZW50Jywge1xuICAgICAgICAgICAgZGlzYWJsZWQ6IHByb3BlcnR5ICYmICFsYXllci5jb25maWcudmlzQ29uZmlnW3Byb3BlcnR5XVxuICAgICAgICAgIH0pfVxuICAgICAgICA+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L0NvbmZpZ0dyb3VwQ29udGVudD5cbiAgICAgIDwvU3R5bGVkTGF5ZXJDb25maWdHcm91cD5cbiAgICApO1xuICB9XG59XG5cbiJdfQ==