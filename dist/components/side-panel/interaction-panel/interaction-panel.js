"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

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

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _switch = _interopRequireDefault(require("../../common/switch"));

var _brushConfig = _interopRequireDefault(require("./brush-config"));

var _tooltipConfig = _interopRequireDefault(require("./tooltip-config"));

var _styledComponents2 = require("../../common/styled-components");

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  padding-bottom: 6px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  border-top: 1px solid ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var StyledPanelContent = _styledComponents2.PanelContent.extend(_templateObject(), function (props) {
  return props.theme.panelBorderColor;
});

var StyledInteractionPanel = _styledComponents.default.div(_templateObject2());

InteractionPanelFactory.deps = [_tooltipConfig.default, _brushConfig.default];

function InteractionPanelFactory(TooltipConfig, BrushConfig) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2.default)(InteractionPanel, _Component);

    function InteractionPanel() {
      var _getPrototypeOf2;

      var _this;

      (0, _classCallCheck2.default)(this, InteractionPanel);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(InteractionPanel)).call.apply(_getPrototypeOf2, [this].concat(args)));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
        isConfigActive: false
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_updateConfig", function (newProp) {
        _this.props.onConfigChange((0, _objectSpread2.default)({}, _this.props.config, newProp));
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_enableConfig", function () {
        _this.setState({
          isConfigActive: !_this.state.isConfigActive
        });
      });
      return _this;
    }

    (0, _createClass2.default)(InteractionPanel, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var _this$props = this.props,
            config = _this$props.config,
            datasets = _this$props.datasets;

        var onChange = function onChange(newConfig) {
          return _this2._updateConfig({
            config: newConfig
          });
        };

        var template = null;

        switch (config.id) {
          case 'tooltip':
            template = _react.default.createElement(TooltipConfig, {
              datasets: datasets,
              config: config.config,
              onChange: onChange
            });
            break;

          case 'brush':
            template = _react.default.createElement(BrushConfig, {
              config: config.config,
              onChange: onChange
            });
            break;

          default:
            break;
        }

        return _react.default.createElement(StyledInteractionPanel, {
          className: "interaction-panel"
        }, _react.default.createElement(_styledComponents2.StyledPanelHeader, {
          className: "interaction-panel__header",
          onClick: this._enableConfig
        }, _react.default.createElement(_styledComponents2.PanelHeaderContent, {
          className: "interaction-panel__header__content"
        }, _react.default.createElement("div", {
          className: "interaction-panel__header__icon icon"
        }, _react.default.createElement(config.iconComponent, {
          height: "12px"
        })), _react.default.createElement("div", {
          className: "interaction-panel__header__title"
        }, _react.default.createElement(_styledComponents2.PanelHeaderTitle, null, config.id))), _react.default.createElement("div", {
          className: "interaction-panel__header__actions"
        }, _react.default.createElement(_switch.default, {
          checked: config.enabled,
          id: "".concat(config.id, "-toggle"),
          onChange: function onChange() {
            return _this2._updateConfig({
              enabled: !config.enabled
            });
          },
          secondary: true
        }))), config.enabled && _react.default.createElement(StyledPanelContent, {
          className: "interaction-panel__content"
        }, template));
      }
    }]);
    return InteractionPanel;
  }(_react.Component), (0, _defineProperty2.default)(_class, "propTypes", {
    datasets: _propTypes.default.object.isRequired,
    config: _propTypes.default.object.isRequired,
    onConfigChange: _propTypes.default.func.isRequired
  }), _temp;
}

var _default = InteractionPanelFactory;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvaW50ZXJhY3Rpb24tcGFuZWwvaW50ZXJhY3Rpb24tcGFuZWwuanMiXSwibmFtZXMiOlsiU3R5bGVkUGFuZWxDb250ZW50IiwiUGFuZWxDb250ZW50IiwiZXh0ZW5kIiwicHJvcHMiLCJ0aGVtZSIsInBhbmVsQm9yZGVyQ29sb3IiLCJTdHlsZWRJbnRlcmFjdGlvblBhbmVsIiwic3R5bGVkIiwiZGl2IiwiSW50ZXJhY3Rpb25QYW5lbEZhY3RvcnkiLCJkZXBzIiwiVG9vbHRpcENvbmZpZ0ZhY3RvcnkiLCJCcnVzaENvbmZpZ0ZhY3RvcnkiLCJUb29sdGlwQ29uZmlnIiwiQnJ1c2hDb25maWciLCJpc0NvbmZpZ0FjdGl2ZSIsIm5ld1Byb3AiLCJvbkNvbmZpZ0NoYW5nZSIsImNvbmZpZyIsInNldFN0YXRlIiwic3RhdGUiLCJkYXRhc2V0cyIsIm9uQ2hhbmdlIiwibmV3Q29uZmlnIiwiX3VwZGF0ZUNvbmZpZyIsInRlbXBsYXRlIiwiaWQiLCJfZW5hYmxlQ29uZmlnIiwiZW5hYmxlZCIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsIm9iamVjdCIsImlzUmVxdWlyZWQiLCJmdW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9BLElBQU1BLGtCQUFrQixHQUFHQyxnQ0FBYUMsTUFBaEIsb0JBQ0UsVUFBQUMsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZQyxnQkFBaEI7QUFBQSxDQURQLENBQXhCOztBQUlBLElBQU1DLHNCQUFzQixHQUFHQywwQkFBT0MsR0FBVixvQkFBNUI7O0FBSUFDLHVCQUF1QixDQUFDQyxJQUF4QixHQUErQixDQUM3QkMsc0JBRDZCLEVBRTdCQyxvQkFGNkIsQ0FBL0I7O0FBS0EsU0FBU0gsdUJBQVQs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QyxVQUZSO0FBR2pCZixJQUFBQSxjQUFjLEVBQUVhLG1CQUFVRyxJQUFWLENBQWVEO0FBSGQsR0FEckI7QUE0RUQ7O2VBRWN2Qix1QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IFN3aXRjaCBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zd2l0Y2gnO1xuXG5pbXBvcnQgQnJ1c2hDb25maWdGYWN0b3J5IGZyb20gJy4vYnJ1c2gtY29uZmlnJztcbmltcG9ydCBUb29sdGlwQ29uZmlnRmFjdG9yeSBmcm9tICcuL3Rvb2x0aXAtY29uZmlnJztcblxuaW1wb3J0IHtcbiAgU3R5bGVkUGFuZWxIZWFkZXIsXG4gIFBhbmVsSGVhZGVyVGl0bGUsXG4gIFBhbmVsSGVhZGVyQ29udGVudCxcbiAgUGFuZWxDb250ZW50XG59IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcblxuY29uc3QgU3R5bGVkUGFuZWxDb250ZW50ID0gUGFuZWxDb250ZW50LmV4dGVuZGBcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxCb3JkZXJDb2xvcn07XG5gO1xuXG5jb25zdCBTdHlsZWRJbnRlcmFjdGlvblBhbmVsID0gc3R5bGVkLmRpdmBcbiAgcGFkZGluZy1ib3R0b206IDZweDtcbmA7XG5cbkludGVyYWN0aW9uUGFuZWxGYWN0b3J5LmRlcHMgPSBbXG4gIFRvb2x0aXBDb25maWdGYWN0b3J5LFxuICBCcnVzaENvbmZpZ0ZhY3Rvcnlcbl07XG5cbmZ1bmN0aW9uIEludGVyYWN0aW9uUGFuZWxGYWN0b3J5KFRvb2x0aXBDb25maWcsIEJydXNoQ29uZmlnKSB7XG4gIHJldHVybiBjbGFzcyBJbnRlcmFjdGlvblBhbmVsIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgZGF0YXNldHM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgIGNvbmZpZzogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgb25Db25maWdDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbiAgICB9O1xuXG4gICAgc3RhdGUgPSB7aXNDb25maWdBY3RpdmU6IGZhbHNlfTtcblxuICAgIF91cGRhdGVDb25maWcgPSBuZXdQcm9wID0+IHtcbiAgICAgIHRoaXMucHJvcHMub25Db25maWdDaGFuZ2Uoe1xuICAgICAgICAuLi50aGlzLnByb3BzLmNvbmZpZyxcbiAgICAgICAgLi4ubmV3UHJvcFxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIF9lbmFibGVDb25maWcgPSAoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtpc0NvbmZpZ0FjdGl2ZTogIXRoaXMuc3RhdGUuaXNDb25maWdBY3RpdmV9KTtcbiAgICB9O1xuXG4gICAgcmVuZGVyKCkge1xuICAgICAgY29uc3Qge2NvbmZpZywgZGF0YXNldHN9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IG9uQ2hhbmdlID0gbmV3Q29uZmlnID0+IHRoaXMuX3VwZGF0ZUNvbmZpZyh7Y29uZmlnOiBuZXdDb25maWd9KTtcbiAgICAgIGxldCB0ZW1wbGF0ZSA9IG51bGw7XG5cbiAgICAgIHN3aXRjaCAoY29uZmlnLmlkKSB7XG4gICAgICAgIGNhc2UgJ3Rvb2x0aXAnOlxuICAgICAgICAgIHRlbXBsYXRlID0gKFxuICAgICAgICAgICAgPFRvb2x0aXBDb25maWdcbiAgICAgICAgICAgICAgZGF0YXNldHM9e2RhdGFzZXRzfVxuICAgICAgICAgICAgICBjb25maWc9e2NvbmZpZy5jb25maWd9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdicnVzaCc6XG4gICAgICAgICAgdGVtcGxhdGUgPSA8QnJ1c2hDb25maWcgY29uZmlnPXtjb25maWcuY29uZmlnfSBvbkNoYW5nZT17b25DaGFuZ2V9IC8+O1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxTdHlsZWRJbnRlcmFjdGlvblBhbmVsIGNsYXNzTmFtZT1cImludGVyYWN0aW9uLXBhbmVsXCI+XG4gICAgICAgICAgPFN0eWxlZFBhbmVsSGVhZGVyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJpbnRlcmFjdGlvbi1wYW5lbF9faGVhZGVyXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuX2VuYWJsZUNvbmZpZ31cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8UGFuZWxIZWFkZXJDb250ZW50IGNsYXNzTmFtZT1cImludGVyYWN0aW9uLXBhbmVsX19oZWFkZXJfX2NvbnRlbnRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnRlcmFjdGlvbi1wYW5lbF9faGVhZGVyX19pY29uIGljb25cIj5cbiAgICAgICAgICAgICAgICA8Y29uZmlnLmljb25Db21wb25lbnQgaGVpZ2h0PVwiMTJweFwiLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW50ZXJhY3Rpb24tcGFuZWxfX2hlYWRlcl9fdGl0bGVcIj5cbiAgICAgICAgICAgICAgICA8UGFuZWxIZWFkZXJUaXRsZT57Y29uZmlnLmlkfTwvUGFuZWxIZWFkZXJUaXRsZT5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L1BhbmVsSGVhZGVyQ29udGVudD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW50ZXJhY3Rpb24tcGFuZWxfX2hlYWRlcl9fYWN0aW9uc1wiPlxuICAgICAgICAgICAgICA8U3dpdGNoXG4gICAgICAgICAgICAgICAgY2hlY2tlZD17Y29uZmlnLmVuYWJsZWR9XG4gICAgICAgICAgICAgICAgaWQ9e2Ake2NvbmZpZy5pZH0tdG9nZ2xlYH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KCkgPT4gdGhpcy5fdXBkYXRlQ29uZmlnKHtlbmFibGVkOiAhY29uZmlnLmVuYWJsZWR9KX1cbiAgICAgICAgICAgICAgICBzZWNvbmRhcnlcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvU3R5bGVkUGFuZWxIZWFkZXI+XG4gICAgICAgICAge2NvbmZpZy5lbmFibGVkICYmIChcbiAgICAgICAgICAgIDxTdHlsZWRQYW5lbENvbnRlbnQgY2xhc3NOYW1lPVwiaW50ZXJhY3Rpb24tcGFuZWxfX2NvbnRlbnRcIj5cbiAgICAgICAgICAgICAge3RlbXBsYXRlfVxuICAgICAgICAgICAgPC9TdHlsZWRQYW5lbENvbnRlbnQ+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9TdHlsZWRJbnRlcmFjdGlvblBhbmVsPlxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW50ZXJhY3Rpb25QYW5lbEZhY3Rvcnk7XG4iXX0=