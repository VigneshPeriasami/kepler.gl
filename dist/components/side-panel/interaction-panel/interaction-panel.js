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

var StyledPanelContent = (0, _styledComponents.default)(_styledComponents2.PanelContent)(_templateObject(), function (props) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvaW50ZXJhY3Rpb24tcGFuZWwvaW50ZXJhY3Rpb24tcGFuZWwuanMiXSwibmFtZXMiOlsiU3R5bGVkUGFuZWxDb250ZW50IiwiUGFuZWxDb250ZW50IiwicHJvcHMiLCJ0aGVtZSIsInBhbmVsQm9yZGVyQ29sb3IiLCJTdHlsZWRJbnRlcmFjdGlvblBhbmVsIiwic3R5bGVkIiwiZGl2IiwiSW50ZXJhY3Rpb25QYW5lbEZhY3RvcnkiLCJkZXBzIiwiVG9vbHRpcENvbmZpZ0ZhY3RvcnkiLCJCcnVzaENvbmZpZ0ZhY3RvcnkiLCJUb29sdGlwQ29uZmlnIiwiQnJ1c2hDb25maWciLCJpc0NvbmZpZ0FjdGl2ZSIsIm5ld1Byb3AiLCJvbkNvbmZpZ0NoYW5nZSIsImNvbmZpZyIsInNldFN0YXRlIiwic3RhdGUiLCJkYXRhc2V0cyIsIm9uQ2hhbmdlIiwibmV3Q29uZmlnIiwiX3VwZGF0ZUNvbmZpZyIsInRlbXBsYXRlIiwiaWQiLCJfZW5hYmxlQ29uZmlnIiwiZW5hYmxlZCIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsIm9iamVjdCIsImlzUmVxdWlyZWQiLCJmdW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9BLElBQU1BLGtCQUFrQixHQUFHLCtCQUFPQywrQkFBUCxDQUFILG9CQUNFLFVBQUFDLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUMsZ0JBQWhCO0FBQUEsQ0FEUCxDQUF4Qjs7QUFJQSxJQUFNQyxzQkFBc0IsR0FBR0MsMEJBQU9DLEdBQVYsb0JBQTVCOztBQUlBQyx1QkFBdUIsQ0FBQ0MsSUFBeEIsR0FBK0IsQ0FDN0JDLHNCQUQ2QixFQUU3QkMsb0JBRjZCLENBQS9COztBQUtBLFNBQVNILHVCQUFULENBQWlD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UjtBQUdqQmYsSUFBQUEsY0FBYyxFQUFFYSxtQkFBVUcsSUFBVixDQUFlRDtBQUhkLEdBRHJCO0FBNEVEOztlQUVjdkIsdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBTd2l0Y2ggZnJvbSAnY29tcG9uZW50cy9jb21tb24vc3dpdGNoJztcblxuaW1wb3J0IEJydXNoQ29uZmlnRmFjdG9yeSBmcm9tICcuL2JydXNoLWNvbmZpZyc7XG5pbXBvcnQgVG9vbHRpcENvbmZpZ0ZhY3RvcnkgZnJvbSAnLi90b29sdGlwLWNvbmZpZyc7XG5cbmltcG9ydCB7XG4gIFN0eWxlZFBhbmVsSGVhZGVyLFxuICBQYW5lbEhlYWRlclRpdGxlLFxuICBQYW5lbEhlYWRlckNvbnRlbnQsXG4gIFBhbmVsQ29udGVudFxufSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5cbmNvbnN0IFN0eWxlZFBhbmVsQ29udGVudCA9IHN0eWxlZChQYW5lbENvbnRlbnQpYFxuICBib3JkZXItdG9wOiAxcHggc29saWQgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbEJvcmRlckNvbG9yfTtcbmA7XG5cbmNvbnN0IFN0eWxlZEludGVyYWN0aW9uUGFuZWwgPSBzdHlsZWQuZGl2YFxuICBwYWRkaW5nLWJvdHRvbTogNnB4O1xuYDtcblxuSW50ZXJhY3Rpb25QYW5lbEZhY3RvcnkuZGVwcyA9IFtcbiAgVG9vbHRpcENvbmZpZ0ZhY3RvcnksXG4gIEJydXNoQ29uZmlnRmFjdG9yeVxuXTtcblxuZnVuY3Rpb24gSW50ZXJhY3Rpb25QYW5lbEZhY3RvcnkoVG9vbHRpcENvbmZpZywgQnJ1c2hDb25maWcpIHtcbiAgcmV0dXJuIGNsYXNzIEludGVyYWN0aW9uUGFuZWwgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICBkYXRhc2V0czogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgY29uZmlnOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICBvbkNvbmZpZ0NoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxuICAgIH07XG5cbiAgICBzdGF0ZSA9IHtpc0NvbmZpZ0FjdGl2ZTogZmFsc2V9O1xuXG4gICAgX3VwZGF0ZUNvbmZpZyA9IG5ld1Byb3AgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5vbkNvbmZpZ0NoYW5nZSh7XG4gICAgICAgIC4uLnRoaXMucHJvcHMuY29uZmlnLFxuICAgICAgICAuLi5uZXdQcm9wXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgX2VuYWJsZUNvbmZpZyA9ICgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2lzQ29uZmlnQWN0aXZlOiAhdGhpcy5zdGF0ZS5pc0NvbmZpZ0FjdGl2ZX0pO1xuICAgIH07XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICBjb25zdCB7Y29uZmlnLCBkYXRhc2V0c30gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3Qgb25DaGFuZ2UgPSBuZXdDb25maWcgPT4gdGhpcy5fdXBkYXRlQ29uZmlnKHtjb25maWc6IG5ld0NvbmZpZ30pO1xuICAgICAgbGV0IHRlbXBsYXRlID0gbnVsbDtcblxuICAgICAgc3dpdGNoIChjb25maWcuaWQpIHtcbiAgICAgICAgY2FzZSAndG9vbHRpcCc6XG4gICAgICAgICAgdGVtcGxhdGUgPSAoXG4gICAgICAgICAgICA8VG9vbHRpcENvbmZpZ1xuICAgICAgICAgICAgICBkYXRhc2V0cz17ZGF0YXNldHN9XG4gICAgICAgICAgICAgIGNvbmZpZz17Y29uZmlnLmNvbmZpZ31cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2JydXNoJzpcbiAgICAgICAgICB0ZW1wbGF0ZSA9IDxCcnVzaENvbmZpZyBjb25maWc9e2NvbmZpZy5jb25maWd9IG9uQ2hhbmdlPXtvbkNoYW5nZX0gLz47XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFN0eWxlZEludGVyYWN0aW9uUGFuZWwgY2xhc3NOYW1lPVwiaW50ZXJhY3Rpb24tcGFuZWxcIj5cbiAgICAgICAgICA8U3R5bGVkUGFuZWxIZWFkZXJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImludGVyYWN0aW9uLXBhbmVsX19oZWFkZXJcIlxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5fZW5hYmxlQ29uZmlnfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxQYW5lbEhlYWRlckNvbnRlbnQgY2xhc3NOYW1lPVwiaW50ZXJhY3Rpb24tcGFuZWxfX2hlYWRlcl9fY29udGVudFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImludGVyYWN0aW9uLXBhbmVsX19oZWFkZXJfX2ljb24gaWNvblwiPlxuICAgICAgICAgICAgICAgIDxjb25maWcuaWNvbkNvbXBvbmVudCBoZWlnaHQ9XCIxMnB4XCIvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnRlcmFjdGlvbi1wYW5lbF9faGVhZGVyX190aXRsZVwiPlxuICAgICAgICAgICAgICAgIDxQYW5lbEhlYWRlclRpdGxlPntjb25maWcuaWR9PC9QYW5lbEhlYWRlclRpdGxlPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvUGFuZWxIZWFkZXJDb250ZW50PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnRlcmFjdGlvbi1wYW5lbF9faGVhZGVyX19hY3Rpb25zXCI+XG4gICAgICAgICAgICAgIDxTd2l0Y2hcbiAgICAgICAgICAgICAgICBjaGVja2VkPXtjb25maWcuZW5hYmxlZH1cbiAgICAgICAgICAgICAgICBpZD17YCR7Y29uZmlnLmlkfS10b2dnbGVgfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PiB0aGlzLl91cGRhdGVDb25maWcoe2VuYWJsZWQ6ICFjb25maWcuZW5hYmxlZH0pfVxuICAgICAgICAgICAgICAgIHNlY29uZGFyeVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9TdHlsZWRQYW5lbEhlYWRlcj5cbiAgICAgICAgICB7Y29uZmlnLmVuYWJsZWQgJiYgKFxuICAgICAgICAgICAgPFN0eWxlZFBhbmVsQ29udGVudCBjbGFzc05hbWU9XCJpbnRlcmFjdGlvbi1wYW5lbF9fY29udGVudFwiPlxuICAgICAgICAgICAgICB7dGVtcGxhdGV9XG4gICAgICAgICAgICA8L1N0eWxlZFBhbmVsQ29udGVudD5cbiAgICAgICAgICApfVxuICAgICAgICA8L1N0eWxlZEludGVyYWN0aW9uUGFuZWw+XG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBJbnRlcmFjdGlvblBhbmVsRmFjdG9yeTtcbiJdfQ==