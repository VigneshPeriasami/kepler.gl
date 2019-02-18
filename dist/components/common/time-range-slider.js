"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _moment = _interopRequireDefault(require("moment"));

var _window = require("global/window");

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash.throttle"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reselect = require("reselect");

var _icons = require("./icons");

var _styledComponents2 = require("./styled-components");

var _filterUtils = require("../../utils/filter-utils");

var _rangeSlider = _interopRequireDefault(require("./range-slider"));

var _timeSliderMarker = _interopRequireDefault(require("./time-slider-marker"));

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  svg {\n    margin: 0 6px;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin-bottom: 12px;\n  margin-right: 42px;\n\n  &.disabled {\n    opacity: 0.4;\n    pointer-events: none;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  height: ", ";\n  align-items: center;\n  font-size: 11px;\n  justify-content: ", ";\n  color: ", ";\n\n  .horizontal-bar {\n    padding: 0 12px;\n  }\n\n  .time-value {\n    display: flex;\n    flex-direction: ", ";\n    align-items: flex-start;\n  }\n\n  .time-value:last-child {\n    align-items: flex-end;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin-top: ", ";\n  align-items: flex-end;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var defaultTimeFormat = function defaultTimeFormat(val) {
  return _moment.default.utc(val).format('MM/DD/YY hh:mma');
};

var animationControlWidth = 140;

var StyledSliderContainer = _styledComponents.default.div(_templateObject(), function (props) {
  return props.isEnlarged ? '12px' : '0px';
});

var TimeRangeSlider =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(TimeRangeSlider, _Component);

  function TimeRangeSlider(_props) {
    var _this;

    (0, _classCallCheck2.default)(this, TimeRangeSlider);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TimeRangeSlider).call(this, _props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "domainSelector", function (props) {
      return props.domain;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "titleFormatter", (0, _reselect.createSelector)(_this.domainSelector, function (domain) {
      return (0, _filterUtils.getTimeWidgetTitleFormatter)(domain);
    }));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_sliderUpdate", function (args) {
      _this._sliderThrottle.cancel();

      _this._sliderThrottle(args);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_resetAnimation", function () {
      var _this$props = _this.props,
          domain = _this$props.domain,
          value = _this$props.value;
      var value0 = domain[0];
      var value1 = value0 + value[1] - value[0];

      _this.props.onChange([value0, value1]);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_startAnimation", function () {
      _this._pauseAnimation();

      _this.props.toggleAnimation();

      _this.setState({
        isAnimating: true
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_pauseAnimation", function () {
      if (_this._animation) {
        (0, _window.cancelAnimationFrame)(_this._animation);

        _this.props.toggleAnimation();

        _this._animation = null;
      }

      _this.setState({
        isAnimating: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_nextFrame", function () {
      _this._animation = null;
      var _this$props2 = _this.props,
          domain = _this$props2.domain,
          value = _this$props2.value;
      var speed = (domain[1] - domain[0]) / _filterUtils.BASE_SPEED * _this.props.speed; // loop when reaches the end

      var value0 = value[1] + speed > domain[1] ? domain[0] : value[0] + speed;
      var value1 = value0 + value[1] - value[0];

      _this.props.onChange([value0, value1]);
    });
    _this.state = {
      isAnimating: false,
      width: 288
    };
    _this._animation = null;
    _this._sliderThrottle = (0, _lodash.default)(function () {
      var _this$props3;

      return (_this$props3 = _this.props).onChange.apply(_this$props3, arguments);
    }, 20);
    return _this;
  }

  (0, _createClass2.default)(TimeRangeSlider, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (!this._animation && this.state.isAnimating) {
        this._animation = (0, _window.requestAnimationFrame)(this._nextFrame);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          domain = _this$props4.domain,
          value = _this$props4.value,
          isEnlarged = _this$props4.isEnlarged;
      var isAnimating = this.state.isAnimating;
      return _react.default.createElement("div", {
        className: "time-range-slider"
      }, _react.default.createElement(TimeTitle, {
        timeFormat: this.titleFormatter(this.props),
        value: value,
        isEnlarged: isEnlarged
      }), _react.default.createElement(StyledSliderContainer, {
        className: "time-range-slider__container",
        isEnlarged: isEnlarged
      }, isEnlarged ? _react.default.createElement(AnimationControls, {
        isAnimatable: this.props.isAnimatable,
        isEnlarged: isEnlarged,
        isAnimating: isAnimating,
        pauseAnimation: this._pauseAnimation,
        resetAnimation: this._resetAnimation,
        startAnimation: this._startAnimation
      }) : null, _react.default.createElement("div", {
        style: {
          width: isEnlarged ? "calc(100% - ".concat(animationControlWidth, "px)") : '100%'
        }
      }, _react.default.createElement(_rangeSlider.default, {
        range: domain,
        value0: value[0],
        value1: value[1],
        histogram: this.props.histogram,
        lineChart: this.props.lineChart,
        plotType: this.props.plotType,
        isEnlarged: isEnlarged,
        showInput: false,
        step: this.props.step,
        onChange: this._sliderUpdate,
        xAxis: _timeSliderMarker.default
      }))));
    }
  }]);
  return TimeRangeSlider;
}(_react.Component);

exports.default = TimeRangeSlider;
(0, _defineProperty2.default)(TimeRangeSlider, "propTypes", {
  onChange: _propTypes.default.func.isRequired,
  domain: _propTypes.default.arrayOf(_propTypes.default.number).isRequired,
  value: _propTypes.default.arrayOf(_propTypes.default.number).isRequired,
  step: _propTypes.default.number.isRequired,
  plotType: _propTypes.default.string,
  histogram: _propTypes.default.arrayOf(_propTypes.default.any),
  lineChart: _propTypes.default.object,
  toggleAnimation: _propTypes.default.func.isRequired,
  isAnimatable: _propTypes.default.bool,
  isEnlarged: _propTypes.default.bool,
  speed: _propTypes.default.number
});

var TimeValueWrapper = _styledComponents.default.div(_templateObject2(), function (props) {
  return props.theme.secondaryInputHeight;
}, function (props) {
  return props.isEnlarged ? 'center' : 'space-between';
}, function (props) {
  return props.theme.labelColor;
}, function (props) {
  return props.isEnlarged ? 'row' : 'column';
});

var TimeTitle = function TimeTitle(_ref) {
  var value = _ref.value,
      isEnlarged = _ref.isEnlarged,
      _ref$timeFormat = _ref.timeFormat,
      timeFormat = _ref$timeFormat === void 0 ? defaultTimeFormat : _ref$timeFormat;
  return _react.default.createElement(TimeValueWrapper, {
    isEnlarged: isEnlarged
  }, _react.default.createElement(TimeValue, {
    key: 0,
    value: _moment.default.utc(value[0]).format(timeFormat),
    split: !isEnlarged
  }), isEnlarged ? _react.default.createElement("div", {
    className: "horizontal-bar"
  }, _react.default.createElement(_icons.Minus, {
    height: "12px"
  })) : null, _react.default.createElement(TimeValue, {
    key: 1,
    value: _moment.default.utc(value[1]).format(timeFormat),
    split: !isEnlarged
  }));
};

var TimeValue = function TimeValue(_ref2) {
  var value = _ref2.value,
      split = _ref2.split;
  return (// render two lines if not enlarged
    _react.default.createElement("div", {
      className: "time-value"
    }, split ? value.split(' ').map(function (v, i) {
      return _react.default.createElement("div", {
        key: i
      }, i === 0 ? _react.default.createElement(_styledComponents2.SelectText, null, v) : _react.default.createElement(_styledComponents2.SelectTextBold, null, v));
    }) : _react.default.createElement(_styledComponents2.SelectTextBold, null, value))
  );
};

var StyledAnimationControls = _styledComponents.default.div(_templateObject3());

var IconButton = _styledComponents2.Button.extend(_templateObject4());

var AnimationControls = function AnimationControls(_ref3) {
  var isAnimatable = _ref3.isAnimatable,
      isAnimating = _ref3.isAnimating,
      pauseAnimation = _ref3.pauseAnimation,
      resetAnimation = _ref3.resetAnimation,
      startAnimation = _ref3.startAnimation;
  return _react.default.createElement(StyledAnimationControls, {
    className: (0, _classnames.default)('time-range-slider__control', {
      disabled: !isAnimatable
    })
  }, _react.default.createElement(_styledComponents2.ButtonGroup, null, _react.default.createElement(IconButton, {
    className: "playback-control-button",
    onClick: resetAnimation,
    secondary: true
  }, _react.default.createElement(_icons.Reset, {
    height: "12px"
  })), _react.default.createElement(IconButton, {
    className: (0, _classnames.default)('playback-control-button', {
      active: isAnimating
    }),
    onClick: isAnimating ? pauseAnimation : startAnimation,
    secondary: true
  }, isAnimating ? _react.default.createElement(_icons.Pause, {
    height: "12px"
  }) : _react.default.createElement(_icons.Play, {
    height: "12px"
  }))));
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi90aW1lLXJhbmdlLXNsaWRlci5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0VGltZUZvcm1hdCIsInZhbCIsIm1vbWVudCIsInV0YyIsImZvcm1hdCIsImFuaW1hdGlvbkNvbnRyb2xXaWR0aCIsIlN0eWxlZFNsaWRlckNvbnRhaW5lciIsInN0eWxlZCIsImRpdiIsInByb3BzIiwiaXNFbmxhcmdlZCIsIlRpbWVSYW5nZVNsaWRlciIsImRvbWFpbiIsImRvbWFpblNlbGVjdG9yIiwiYXJncyIsIl9zbGlkZXJUaHJvdHRsZSIsImNhbmNlbCIsInZhbHVlIiwidmFsdWUwIiwidmFsdWUxIiwib25DaGFuZ2UiLCJfcGF1c2VBbmltYXRpb24iLCJ0b2dnbGVBbmltYXRpb24iLCJzZXRTdGF0ZSIsImlzQW5pbWF0aW5nIiwiX2FuaW1hdGlvbiIsInNwZWVkIiwiQkFTRV9TUEVFRCIsInN0YXRlIiwid2lkdGgiLCJfbmV4dEZyYW1lIiwidGl0bGVGb3JtYXR0ZXIiLCJpc0FuaW1hdGFibGUiLCJfcmVzZXRBbmltYXRpb24iLCJfc3RhcnRBbmltYXRpb24iLCJoaXN0b2dyYW0iLCJsaW5lQ2hhcnQiLCJwbG90VHlwZSIsInN0ZXAiLCJfc2xpZGVyVXBkYXRlIiwiVGltZVNsaWRlck1hcmtlciIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsImZ1bmMiLCJpc1JlcXVpcmVkIiwiYXJyYXlPZiIsIm51bWJlciIsInN0cmluZyIsImFueSIsIm9iamVjdCIsImJvb2wiLCJUaW1lVmFsdWVXcmFwcGVyIiwidGhlbWUiLCJzZWNvbmRhcnlJbnB1dEhlaWdodCIsImxhYmVsQ29sb3IiLCJUaW1lVGl0bGUiLCJ0aW1lRm9ybWF0IiwiVGltZVZhbHVlIiwic3BsaXQiLCJtYXAiLCJ2IiwiaSIsIlN0eWxlZEFuaW1hdGlvbkNvbnRyb2xzIiwiSWNvbkJ1dHRvbiIsIkJ1dHRvbiIsImV4dGVuZCIsIkFuaW1hdGlvbkNvbnRyb2xzIiwicGF1c2VBbmltYXRpb24iLCJyZXNldEFuaW1hdGlvbiIsInN0YXJ0QW5pbWF0aW9uIiwiZGlzYWJsZWQiLCJhY3RpdmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFvQixDQUFBQyxHQUFHO0FBQUEsU0FBSUMsZ0JBQU9DLEdBQVAsQ0FBV0YsR0FBWCxFQUFnQkcsTUFBaEIsQ0FBdUIsaUJBQXZCLENBQUo7QUFBQSxDQUE3Qjs7QUFDQSxJQUFNQyxxQkFBcUIsR0FBRyxHQUE5Qjs7QUFFQSxJQUFNQyxxQkFBcUIsR0FBR0MsMEJBQU9DLEdBQVYsb0JBQ1gsVUFBQUMsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsVUFBTixHQUFtQixNQUFuQixHQUE0QixLQUFoQztBQUFBLENBRE0sQ0FBM0I7O0lBUXFCQyxlOzs7OztBQWVuQiwyQkFBWUYsTUFBWixFQUFtQjtBQUFBOztBQUFBO0FBQ2pCLHFIQUFNQSxNQUFOO0FBRGlCLHVJQWdCRixVQUFBQSxLQUFLO0FBQUEsYUFBSUEsS0FBSyxDQUFDRyxNQUFWO0FBQUEsS0FoQkg7QUFBQSx1SUFpQkYsOEJBQWUsTUFBS0MsY0FBcEIsRUFBb0MsVUFBQUQsTUFBTTtBQUFBLGFBQ3pELDhDQUE0QkEsTUFBNUIsQ0FEeUQ7QUFBQSxLQUExQyxDQWpCRTtBQUFBLHNJQXFCSCxVQUFBRSxJQUFJLEVBQUk7QUFDdEIsWUFBS0MsZUFBTCxDQUFxQkMsTUFBckI7O0FBQ0EsWUFBS0QsZUFBTCxDQUFxQkQsSUFBckI7QUFDRCxLQXhCa0I7QUFBQSx3SUEwQkQsWUFBTTtBQUFBLHdCQUNFLE1BQUtMLEtBRFA7QUFBQSxVQUNmRyxNQURlLGVBQ2ZBLE1BRGU7QUFBQSxV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QU0sRUFBQztBQUFiLElBRjFDLENBTEYsQ0FIRixDQVB3QjtBQUFBLENBQTFCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHtyZXF1ZXN0QW5pbWF0aW9uRnJhbWUsIGNhbmNlbEFuaW1hdGlvbkZyYW1lfSBmcm9tICdnbG9iYWwvd2luZG93JztcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHRocm90dGxlIGZyb20gJ2xvZGFzaC50aHJvdHRsZSc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7Y3JlYXRlU2VsZWN0b3J9IGZyb20gJ3Jlc2VsZWN0JztcbmltcG9ydCB7UGxheSwgUmVzZXQsIFBhdXNlLCBNaW51c30gZnJvbSAnY29tcG9uZW50cy9jb21tb24vaWNvbnMnO1xuaW1wb3J0IHtTZWxlY3RUZXh0Qm9sZCwgU2VsZWN0VGV4dCwgQnV0dG9uLCBCdXR0b25Hcm91cH0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHtnZXRUaW1lV2lkZ2V0VGl0bGVGb3JtYXR0ZXIsIEJBU0VfU1BFRUR9IGZyb20gJ3V0aWxzL2ZpbHRlci11dGlscyc7XG5pbXBvcnQgUmFuZ2VTbGlkZXIgZnJvbSAnLi9yYW5nZS1zbGlkZXInO1xuaW1wb3J0IFRpbWVTbGlkZXJNYXJrZXIgZnJvbSAnLi90aW1lLXNsaWRlci1tYXJrZXInO1xuXG5jb25zdCBkZWZhdWx0VGltZUZvcm1hdCA9IHZhbCA9PiBtb21lbnQudXRjKHZhbCkuZm9ybWF0KCdNTS9ERC9ZWSBoaDptbWEnKTtcbmNvbnN0IGFuaW1hdGlvbkNvbnRyb2xXaWR0aCA9IDE0MDtcblxuY29uc3QgU3R5bGVkU2xpZGVyQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgbWFyZ2luLXRvcDogJHtwcm9wcyA9PiBwcm9wcy5pc0VubGFyZ2VkID8gJzEycHgnIDogJzBweCd9O1xuICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbmA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbWVSYW5nZVNsaWRlciBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZG9tYWluOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMubnVtYmVyKS5pc1JlcXVpcmVkLFxuICAgIHZhbHVlOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMubnVtYmVyKS5pc1JlcXVpcmVkLFxuICAgIHN0ZXA6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICBwbG90VHlwZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBoaXN0b2dyYW06IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLFxuICAgIGxpbmVDaGFydDogUHJvcFR5cGVzLm9iamVjdCxcbiAgICB0b2dnbGVBbmltYXRpb246IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgaXNBbmltYXRhYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBpc0VubGFyZ2VkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzcGVlZDogUHJvcFR5cGVzLm51bWJlclxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpc0FuaW1hdGluZzogZmFsc2UsXG4gICAgICB3aWR0aDogMjg4XG4gICAgfTtcbiAgICB0aGlzLl9hbmltYXRpb24gPSBudWxsO1xuICAgIHRoaXMuX3NsaWRlclRocm90dGxlID0gdGhyb3R0bGUoKC4uLnZhbHVlKSA9PiB0aGlzLnByb3BzLm9uQ2hhbmdlKC4uLnZhbHVlKSwgMjApO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIGlmICghdGhpcy5fYW5pbWF0aW9uICYmIHRoaXMuc3RhdGUuaXNBbmltYXRpbmcpIHtcbiAgICAgIHRoaXMuX2FuaW1hdGlvbiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLl9uZXh0RnJhbWUpO1xuICAgIH1cbiAgfVxuXG4gIGRvbWFpblNlbGVjdG9yID0gcHJvcHMgPT4gcHJvcHMuZG9tYWluO1xuICB0aXRsZUZvcm1hdHRlciA9IGNyZWF0ZVNlbGVjdG9yKHRoaXMuZG9tYWluU2VsZWN0b3IsIGRvbWFpbiA9PlxuICAgIGdldFRpbWVXaWRnZXRUaXRsZUZvcm1hdHRlcihkb21haW4pXG4gICk7XG5cbiAgX3NsaWRlclVwZGF0ZSA9IGFyZ3MgPT4ge1xuICAgIHRoaXMuX3NsaWRlclRocm90dGxlLmNhbmNlbCgpO1xuICAgIHRoaXMuX3NsaWRlclRocm90dGxlKGFyZ3MpO1xuICB9O1xuXG4gIF9yZXNldEFuaW1hdGlvbiA9ICgpID0+IHtcbiAgICBjb25zdCB7ZG9tYWluLCB2YWx1ZX0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHZhbHVlMCA9IGRvbWFpblswXTtcbiAgICBjb25zdCB2YWx1ZTEgPSB2YWx1ZTAgKyB2YWx1ZVsxXSAtIHZhbHVlWzBdO1xuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoW3ZhbHVlMCwgdmFsdWUxXSk7XG4gIH07XG5cbiAgX3N0YXJ0QW5pbWF0aW9uID0gKCkgPT4ge1xuICAgIHRoaXMuX3BhdXNlQW5pbWF0aW9uKCk7XG4gICAgdGhpcy5wcm9wcy50b2dnbGVBbmltYXRpb24oKTtcbiAgICB0aGlzLnNldFN0YXRlKHtpc0FuaW1hdGluZzogdHJ1ZX0pO1xuICB9O1xuXG4gIF9wYXVzZUFuaW1hdGlvbiA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5fYW5pbWF0aW9uKSB7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLl9hbmltYXRpb24pO1xuICAgICAgdGhpcy5wcm9wcy50b2dnbGVBbmltYXRpb24oKTtcbiAgICAgIHRoaXMuX2FuaW1hdGlvbiA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoe2lzQW5pbWF0aW5nOiBmYWxzZX0pO1xuICB9O1xuXG4gIF9uZXh0RnJhbWUgPSAoKSA9PiB7XG4gICAgdGhpcy5fYW5pbWF0aW9uID0gbnVsbDtcblxuICAgIGNvbnN0IHtkb21haW4sIHZhbHVlfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc3BlZWQgPSAoKGRvbWFpblsxXSAtIGRvbWFpblswXSkgLyBCQVNFX1NQRUVEKSAqIHRoaXMucHJvcHMuc3BlZWQ7XG5cbiAgICAvLyBsb29wIHdoZW4gcmVhY2hlcyB0aGUgZW5kXG4gICAgY29uc3QgdmFsdWUwID0gdmFsdWVbMV0gKyBzcGVlZCA+IGRvbWFpblsxXSA/IGRvbWFpblswXSA6IHZhbHVlWzBdICsgc3BlZWQ7XG4gICAgY29uc3QgdmFsdWUxID0gdmFsdWUwICsgdmFsdWVbMV0gLSB2YWx1ZVswXTtcbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKFt2YWx1ZTAsIHZhbHVlMV0pO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7ZG9tYWluLCB2YWx1ZSwgaXNFbmxhcmdlZH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHtpc0FuaW1hdGluZ30gPSB0aGlzLnN0YXRlO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZS1yYW5nZS1zbGlkZXJcIj5cbiAgICAgICAgPFRpbWVUaXRsZVxuICAgICAgICAgIHRpbWVGb3JtYXQ9e3RoaXMudGl0bGVGb3JtYXR0ZXIodGhpcy5wcm9wcyl9XG4gICAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICAgIGlzRW5sYXJnZWQ9e2lzRW5sYXJnZWR9XG4gICAgICAgIC8+XG4gICAgICAgIDxTdHlsZWRTbGlkZXJDb250YWluZXJcbiAgICAgICAgICBjbGFzc05hbWU9XCJ0aW1lLXJhbmdlLXNsaWRlcl9fY29udGFpbmVyXCJcbiAgICAgICAgICBpc0VubGFyZ2VkPXtpc0VubGFyZ2VkfT5cbiAgICAgICAgICB7aXNFbmxhcmdlZCA/IDxBbmltYXRpb25Db250cm9sc1xuICAgICAgICAgICAgaXNBbmltYXRhYmxlPXt0aGlzLnByb3BzLmlzQW5pbWF0YWJsZX1cbiAgICAgICAgICAgIGlzRW5sYXJnZWQ9e2lzRW5sYXJnZWR9XG4gICAgICAgICAgICBpc0FuaW1hdGluZz17aXNBbmltYXRpbmd9XG4gICAgICAgICAgICBwYXVzZUFuaW1hdGlvbj17dGhpcy5fcGF1c2VBbmltYXRpb259XG4gICAgICAgICAgICByZXNldEFuaW1hdGlvbj17dGhpcy5fcmVzZXRBbmltYXRpb259XG4gICAgICAgICAgICBzdGFydEFuaW1hdGlvbj17dGhpcy5fc3RhcnRBbmltYXRpb259XG4gICAgICAgICAgLz4gOiBudWxsfVxuICAgICAgICAgIDxkaXYgc3R5bGU9e3t3aWR0aDogaXNFbmxhcmdlZCA/IGBjYWxjKDEwMCUgLSAke2FuaW1hdGlvbkNvbnRyb2xXaWR0aH1weClgIDogJzEwMCUnfX0+XG4gICAgICAgICAgICA8UmFuZ2VTbGlkZXJcbiAgICAgICAgICAgICAgcmFuZ2U9e2RvbWFpbn1cbiAgICAgICAgICAgICAgdmFsdWUwPXt2YWx1ZVswXX1cbiAgICAgICAgICAgICAgdmFsdWUxPXt2YWx1ZVsxXX1cbiAgICAgICAgICAgICAgaGlzdG9ncmFtPXt0aGlzLnByb3BzLmhpc3RvZ3JhbX1cbiAgICAgICAgICAgICAgbGluZUNoYXJ0PXt0aGlzLnByb3BzLmxpbmVDaGFydH1cbiAgICAgICAgICAgICAgcGxvdFR5cGU9e3RoaXMucHJvcHMucGxvdFR5cGV9XG4gICAgICAgICAgICAgIGlzRW5sYXJnZWQ9e2lzRW5sYXJnZWR9XG4gICAgICAgICAgICAgIHNob3dJbnB1dD17ZmFsc2V9XG4gICAgICAgICAgICAgIHN0ZXA9e3RoaXMucHJvcHMuc3RlcH1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuX3NsaWRlclVwZGF0ZX1cbiAgICAgICAgICAgICAgeEF4aXM9e1RpbWVTbGlkZXJNYXJrZXJ9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L1N0eWxlZFNsaWRlckNvbnRhaW5lcj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuY29uc3QgVGltZVZhbHVlV3JhcHBlciA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGhlaWdodDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWNvbmRhcnlJbnB1dEhlaWdodH07XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAganVzdGlmeS1jb250ZW50OiAke3Byb3BzID0+IHByb3BzLmlzRW5sYXJnZWQgPyAnY2VudGVyJyA6ICdzcGFjZS1iZXR3ZWVuJ307XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmxhYmVsQ29sb3J9O1xuXG4gIC5ob3Jpem9udGFsLWJhciB7XG4gICAgcGFkZGluZzogMCAxMnB4O1xuICB9XG5cbiAgLnRpbWUtdmFsdWUge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246ICR7cHJvcHMgPT4gcHJvcHMuaXNFbmxhcmdlZCA/ICdyb3cnIDogJ2NvbHVtbid9O1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICB9XG5cbiAgLnRpbWUtdmFsdWU6bGFzdC1jaGlsZCB7XG4gICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xuICB9XG5gO1xuXG5jb25zdCBUaW1lVGl0bGUgPSAoe3ZhbHVlLCBpc0VubGFyZ2VkLCB0aW1lRm9ybWF0ID0gZGVmYXVsdFRpbWVGb3JtYXR9KSA9PiAoXG4gIDxUaW1lVmFsdWVXcmFwcGVyIGlzRW5sYXJnZWQ9e2lzRW5sYXJnZWR9PlxuICAgIDxUaW1lVmFsdWUga2V5PXswfSB2YWx1ZT17bW9tZW50LnV0Yyh2YWx1ZVswXSkuZm9ybWF0KHRpbWVGb3JtYXQpfSBzcGxpdD17IWlzRW5sYXJnZWR9Lz5cbiAgICB7aXNFbmxhcmdlZCA/IChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaG9yaXpvbnRhbC1iYXJcIj5cbiAgICAgICAgPE1pbnVzIGhlaWdodD1cIjEycHhcIi8+XG4gICAgICA8L2Rpdj5cbiAgICApIDogbnVsbH1cbiAgICA8VGltZVZhbHVlIGtleT17MX0gdmFsdWU9e21vbWVudC51dGModmFsdWVbMV0pLmZvcm1hdCh0aW1lRm9ybWF0KX0gc3BsaXQ9eyFpc0VubGFyZ2VkfS8+XG4gIDwvVGltZVZhbHVlV3JhcHBlcj5cbik7XG5cbmNvbnN0IFRpbWVWYWx1ZSA9ICh7dmFsdWUsIHNwbGl0fSkgPT4gKFxuICAvLyByZW5kZXIgdHdvIGxpbmVzIGlmIG5vdCBlbmxhcmdlZFxuICA8ZGl2IGNsYXNzTmFtZT1cInRpbWUtdmFsdWVcIj5cbiAgICB7c3BsaXQgPyB2YWx1ZS5zcGxpdCgnICcpLm1hcCgodiwgaSkgPT4gKFxuICAgICAgPGRpdiBrZXk9e2l9PlxuICAgICAgICB7aSA9PT0gMCA/IDxTZWxlY3RUZXh0Pnt2fTwvU2VsZWN0VGV4dD4gOlxuICAgICAgICA8U2VsZWN0VGV4dEJvbGQ+e3Z9PC9TZWxlY3RUZXh0Qm9sZD59XG4gICAgICA8L2Rpdj5cbiAgICApKSA6IDxTZWxlY3RUZXh0Qm9sZD57dmFsdWV9PC9TZWxlY3RUZXh0Qm9sZD59XG4gIDwvZGl2PlxuKTtcblxuY29uc3QgU3R5bGVkQW5pbWF0aW9uQ29udHJvbHMgPSBzdHlsZWQuZGl2YFxuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuICBtYXJnaW4tcmlnaHQ6IDQycHg7XG5cbiAgJi5kaXNhYmxlZCB7XG4gICAgb3BhY2l0eTogMC40O1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICB9XG5gO1xuXG5jb25zdCBJY29uQnV0dG9uID0gQnV0dG9uLmV4dGVuZGBcbiAgc3ZnIHtcbiAgICBtYXJnaW46IDAgNnB4O1xuICB9XG5gO1xuXG5jb25zdCBBbmltYXRpb25Db250cm9scyA9ICh7XG4gIGlzQW5pbWF0YWJsZSxcbiAgaXNBbmltYXRpbmcsXG4gIHBhdXNlQW5pbWF0aW9uLFxuICByZXNldEFuaW1hdGlvbixcbiAgc3RhcnRBbmltYXRpb25cbn0pID0+IChcbiAgPFN0eWxlZEFuaW1hdGlvbkNvbnRyb2xzXG4gICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCd0aW1lLXJhbmdlLXNsaWRlcl9fY29udHJvbCcsIHtkaXNhYmxlZDogIWlzQW5pbWF0YWJsZX0pfVxuICA+XG4gICAgPEJ1dHRvbkdyb3VwPlxuICAgICAgPEljb25CdXR0b24gY2xhc3NOYW1lPVwicGxheWJhY2stY29udHJvbC1idXR0b25cIlxuICAgICAgICBvbkNsaWNrPXtyZXNldEFuaW1hdGlvbn0gc2Vjb25kYXJ5PlxuICAgICAgICA8UmVzZXQgaGVpZ2h0PVwiMTJweFwiLz5cbiAgICAgIDwvSWNvbkJ1dHRvbj5cbiAgICAgIDxJY29uQnV0dG9uIGNsYXNzTmFtZT17Y2xhc3NuYW1lcygncGxheWJhY2stY29udHJvbC1idXR0b24nLCB7YWN0aXZlOiBpc0FuaW1hdGluZ30pfVxuICAgICAgICBvbkNsaWNrPXtpc0FuaW1hdGluZyA/IHBhdXNlQW5pbWF0aW9uIDogc3RhcnRBbmltYXRpb259IHNlY29uZGFyeT5cbiAgICAgICAge2lzQW5pbWF0aW5nID8gPFBhdXNlIGhlaWdodD1cIjEycHhcIi8+IDogPFBsYXkgaGVpZ2h0PVwiMTJweFwiLz59XG4gICAgICA8L0ljb25CdXR0b24+XG4gICAgPC9CdXR0b25Hcm91cD5cbiAgPC9TdHlsZWRBbmltYXRpb25Db250cm9scz5cbik7XG4iXX0=