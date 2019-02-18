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

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _rangePlot = _interopRequireDefault(require("./range-plot"));

var _slider = _interopRequireDefault(require("./slider/slider"));

var _styledComponents2 = require("./styled-components");

var _dataUtils = require("../../utils/data-utils");

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin-top: 6px;\n  display: flex;\n  justify-content: space-between;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  position: relative;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  height: ", "px;\n  width: ", "px;\n  padding: 4px 6px;\n  margin-left: ", "px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var SliderInput = (0, _styledComponents.default)(_styledComponents2.Input)(_templateObject(), function (props) {
  return props.theme.sliderInputHeight;
}, function (props) {
  return props.theme.sliderInputWidth;
}, function (props) {
  return props.flush ? 0 : 24;
});

var SliderWrapper = _styledComponents.default.div(_templateObject2());

var RangeInputWrapper = _styledComponents.default.div(_templateObject3());

var RangeSlider =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(RangeSlider, _Component);

  function RangeSlider() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, RangeSlider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(RangeSlider)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      value0: 0,
      value1: 1,
      width: 288
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_setValueFromProps", function (props) {
      var value0 = props.value0,
          value1 = props.value1;

      if (!isNaN(value0) && !isNaN(value1)) {
        _this.setState({
          value0: value0,
          value1: value1
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_isVal0InRange", function (val) {
      var _this$props = _this.props,
          value1 = _this$props.value1,
          range = _this$props.range;
      return Boolean(val >= range[0] && val <= value1);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_isVal1InRange", function (val) {
      var _this$props2 = _this.props,
          range = _this$props2.range,
          value0 = _this$props2.value0;
      return Boolean(val <= range[1] && val >= value0);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_roundValToStep", function (val) {
      var _this$props3 = _this.props,
          range = _this$props3.range,
          step = _this$props3.step;
      return (0, _dataUtils.roundValToStep)(range[0], step, val);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_setRangeVal1", function (val) {
      var _this$props4 = _this.props,
          value0 = _this$props4.value0,
          onChange = _this$props4.onChange;
      val = Number(val);

      if (_this._isVal1InRange(val)) {
        onChange([value0, _this._roundValToStep(val)]);
        return true;
      }

      return false;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_setRangeVal0", function (val) {
      var _this$props5 = _this.props,
          value1 = _this$props5.value1,
          onChange = _this$props5.onChange;
      val = Number(val);

      if (_this._isVal0InRange(val)) {
        onChange([_this._roundValToStep(val), value1]);
        return true;
      }

      return false;
    });
    return _this;
  }

  (0, _createClass2.default)(RangeSlider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._setValueFromProps(this.props);

      this._resize();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this._setValueFromProps(nextProps);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this._resize();
    }
  }, {
    key: "_resize",
    value: function _resize() {
      var width = this.sliderContainer.offsetWidth;

      if (width !== this.state.width) {
        this.setState({
          width: width
        });
      }
    }
  }, {
    key: "_renderInput",
    value: function _renderInput(key) {
      var _this2 = this;

      var setRange = key === 'value0' ? this._setRangeVal0 : this._setRangeVal1;

      var update = function update(e) {
        if (!setRange(e.target.value)) {
          _this2.setState((0, _defineProperty2.default)({}, key, _this2.state[key]));
        }
      };

      return _react.default.createElement(SliderInput, {
        className: "kg-range-slider__input",
        type: "number",
        innerRef: function innerRef(comp) {
          _this2["input-".concat(key)] = comp;
        },
        id: "filter-".concat(key),
        value: this.state[key],
        onChange: function onChange(e) {
          _this2.setState((0, _defineProperty2.default)({}, key, e.target.value));
        },
        onKeyPress: function onKeyPress(e) {
          if (e.key === 'Enter') {
            update(e);

            _this2["input-".concat(key)].blur();
          }
        },
        onBlur: update,
        flush: key === 'value0',
        secondary: this.props.inputTheme === 'secondary'
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props6 = this.props,
          isRanged = _this$props6.isRanged,
          showInput = _this$props6.showInput,
          histogram = _this$props6.histogram,
          lineChart = _this$props6.lineChart,
          plotType = _this$props6.plotType,
          isEnlarged = _this$props6.isEnlarged,
          range = _this$props6.range,
          onChange = _this$props6.onChange,
          value0 = _this$props6.value0,
          value1 = _this$props6.value1,
          sliderHandleWidth = _this$props6.sliderHandleWidth;
      var height = isRanged && showInput ? '16px' : '24px';
      var width = this.state.width;
      var plotWidth = width - sliderHandleWidth;
      return _react.default.createElement("div", {
        className: "kg-range-slider",
        style: {
          width: '100%',
          padding: "0 ".concat(sliderHandleWidth / 2, "px")
        },
        ref: function ref(comp) {
          _this3.sliderContainer = comp;
        }
      }, histogram && histogram.length ? _react.default.createElement(_rangePlot.default, {
        histogram: histogram,
        lineChart: lineChart,
        plotType: plotType,
        isEnlarged: isEnlarged,
        onBrush: function onBrush(val0, val1) {
          onChange([_this3._roundValToStep(val0), _this3._roundValToStep(val1)]);
        },
        range: range,
        value: [value0, value1],
        width: plotWidth
      }) : null, _react.default.createElement(SliderWrapper, {
        style: {
          height: height
        },
        className: "kg-range-slider__slider"
      }, this.props.xAxis ? _react.default.createElement(this.props.xAxis, {
        width: plotWidth,
        domain: range
      }) : null, _react.default.createElement(_slider.default, {
        showValues: false,
        isRanged: isRanged,
        minValue: range[0],
        maxValue: range[1],
        value0: value0,
        value1: value1,
        handleWidth: sliderHandleWidth,
        onSlider0Change: this._setRangeVal0,
        onSlider1Change: this._setRangeVal1,
        onSliderBarChange: function onSliderBarChange(val0, val1) {
          if (_this3._isVal1InRange(val1) && _this3._isVal0InRange(val0)) {
            onChange([_this3._roundValToStep(val0), _this3._roundValToStep(val1)]);
          }
        },
        enableBarDrag: true
      }), !isRanged && showInput ? this._renderInput('value1') : null), isRanged && showInput ? _react.default.createElement(RangeInputWrapper, {
        className: "range-slider__input-group"
      }, this._renderInput('value0'), this._renderInput('value1')) : null);
    }
  }]);
  return RangeSlider;
}(_react.Component);

exports.default = RangeSlider;
(0, _defineProperty2.default)(RangeSlider, "propTypes", {
  range: _propTypes.default.arrayOf(_propTypes.default.number).isRequired,
  value0: _propTypes.default.number.isRequired,
  value1: _propTypes.default.number.isRequired,
  onChange: _propTypes.default.func.isRequired,
  histogram: _propTypes.default.arrayOf(_propTypes.default.any),
  isRanged: _propTypes.default.bool,
  isEnlarged: _propTypes.default.bool,
  showInput: _propTypes.default.bool,
  inputTheme: _propTypes.default.string,
  step: _propTypes.default.number,
  sliderHandleWidth: _propTypes.default.number,
  xAxis: _propTypes.default.func
});
(0, _defineProperty2.default)(RangeSlider, "defaultProps", {
  isEnlarged: false,
  isRanged: true,
  showInput: true,
  sliderHandleWidth: 12,
  onChange: function onChange() {}
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9yYW5nZS1zbGlkZXIuanMiXSwibmFtZXMiOlsiU2xpZGVySW5wdXQiLCJJbnB1dCIsInByb3BzIiwidGhlbWUiLCJzbGlkZXJJbnB1dEhlaWdodCIsInNsaWRlcklucHV0V2lkdGgiLCJmbHVzaCIsIlNsaWRlcldyYXBwZXIiLCJzdHlsZWQiLCJkaXYiLCJSYW5nZUlucHV0V3JhcHBlciIsIlJhbmdlU2xpZGVyIiwidmFsdWUwIiwidmFsdWUxIiwid2lkdGgiLCJpc05hTiIsInNldFN0YXRlIiwidmFsIiwicmFuZ2UiLCJCb29sZWFuIiwic3RlcCIsIm9uQ2hhbmdlIiwiTnVtYmVyIiwiX2lzVmFsMUluUmFuZ2UiLCJfcm91bmRWYWxUb1N0ZXAiLCJfaXNWYWwwSW5SYW5nZSIsIl9zZXRWYWx1ZUZyb21Qcm9wcyIsIl9yZXNpemUiLCJuZXh0UHJvcHMiLCJzbGlkZXJDb250YWluZXIiLCJvZmZzZXRXaWR0aCIsInN0YXRlIiwia2V5Iiwic2V0UmFuZ2UiLCJfc2V0UmFuZ2VWYWwwIiwiX3NldFJhbmdlVmFsMSIsInVwZGF0ZSIsImUiLCJ0YXJnZXQiLCJ2YWx1ZSIsImNvbXAiLCJibHVyIiwiaW5wdXRUaGVtZSIsImlzUmFuZ2VkIiwic2hvd0lucHV0IiwiaGlzdG9ncmFtIiwibGluZUNoYXJ0IiwicGxvdFR5cGUiLCJpc0VubGFyZ2VkIiwic2xpZGVySGFuZGxlV2lkdGgiLCJoZWlnaHQiLCJwbG90V2lkdGgiLCJwYWRkaW5nIiwibGVuZ3RoIiwidmFsMCIsInZhbDEiLCJ4QXhpcyIsIl9yZW5kZXJJbnB1dCIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsImFycmF5T2YiLCJudW1iZXIiLCJpc1JlcXVpcmVkIiwiZnVuYyIsImFueSIsImJvb2wiLCJzdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7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Q29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IFJhbmdlUGxvdCBmcm9tICcuL3JhbmdlLXBsb3QnO1xuaW1wb3J0IFNsaWRlciBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zbGlkZXIvc2xpZGVyJztcbmltcG9ydCB7SW5wdXR9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHtyb3VuZFZhbFRvU3RlcH0gZnJvbSAndXRpbHMvZGF0YS11dGlscyc7XG5cbmNvbnN0IFNsaWRlcklucHV0ID0gc3R5bGVkKElucHV0KWBcbiAgaGVpZ2h0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNsaWRlcklucHV0SGVpZ2h0fXB4O1xuICB3aWR0aDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zbGlkZXJJbnB1dFdpZHRofXB4O1xuICBwYWRkaW5nOiA0cHggNnB4O1xuICBtYXJnaW4tbGVmdDogJHtwcm9wcyA9PiBwcm9wcy5mbHVzaCA/IDAgOiAyNH1weDtcbmA7XG5cbmNvbnN0IFNsaWRlcldyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5gO1xuXG5jb25zdCBSYW5nZUlucHV0V3JhcHBlciA9c3R5bGVkLmRpdmBcbiAgbWFyZ2luLXRvcDogNnB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYW5nZVNsaWRlciBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgcmFuZ2U6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpLmlzUmVxdWlyZWQsXG4gICAgdmFsdWUwOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgdmFsdWUxOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgaGlzdG9ncmFtOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KSxcbiAgICBpc1JhbmdlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgaXNFbmxhcmdlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0lucHV0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBpbnB1dFRoZW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHN0ZXA6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgc2xpZGVySGFuZGxlV2lkdGg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgeEF4aXM6IFByb3BUeXBlcy5mdW5jXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBpc0VubGFyZ2VkOiBmYWxzZSxcbiAgICBpc1JhbmdlZDogdHJ1ZSxcbiAgICBzaG93SW5wdXQ6IHRydWUsXG4gICAgc2xpZGVySGFuZGxlV2lkdGg6IDEyLFxuICAgIG9uQ2hhbmdlOiAoKSA9PiB7fVxuICB9O1xuXG4gIHN0YXRlID0ge3ZhbHVlMDogMCwgdmFsdWUxOiAxLCB3aWR0aDogMjg4fTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLl9zZXRWYWx1ZUZyb21Qcm9wcyh0aGlzLnByb3BzKTtcbiAgICB0aGlzLl9yZXNpemUoKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgdGhpcy5fc2V0VmFsdWVGcm9tUHJvcHMobmV4dFByb3BzKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICB0aGlzLl9yZXNpemUoKTtcbiAgfVxuXG4gIF9zZXRWYWx1ZUZyb21Qcm9wcyA9IHByb3BzID0+IHtcbiAgICBjb25zdCB7dmFsdWUwLCB2YWx1ZTF9ID0gcHJvcHM7XG5cbiAgICBpZiAoIWlzTmFOKHZhbHVlMCkgJiYgIWlzTmFOKHZhbHVlMSkpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlMCwgdmFsdWUxfSk7XG4gICAgfVxuICB9O1xuXG4gIF9pc1ZhbDBJblJhbmdlID0gdmFsID0+IHtcbiAgICBjb25zdCB7dmFsdWUxLCByYW5nZX0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIEJvb2xlYW4odmFsID49IHJhbmdlWzBdICYmIHZhbCA8PSB2YWx1ZTEpO1xuICB9O1xuXG4gIF9pc1ZhbDFJblJhbmdlID0gdmFsID0+IHtcbiAgICBjb25zdCB7cmFuZ2UsIHZhbHVlMH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIEJvb2xlYW4odmFsIDw9IHJhbmdlWzFdICYmIHZhbCA+PSB2YWx1ZTApO1xuICB9O1xuXG4gIF9yb3VuZFZhbFRvU3RlcCA9IHZhbCA9PiB7XG4gICAgY29uc3Qge3JhbmdlLCBzdGVwfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gcm91bmRWYWxUb1N0ZXAocmFuZ2VbMF0sIHN0ZXAsIHZhbCk7XG4gIH07XG5cbiAgX3NldFJhbmdlVmFsMSA9IHZhbCA9PiB7XG4gICAgY29uc3Qge3ZhbHVlMCwgb25DaGFuZ2V9ID0gdGhpcy5wcm9wcztcbiAgICB2YWwgPSBOdW1iZXIodmFsKTtcblxuICAgIGlmICh0aGlzLl9pc1ZhbDFJblJhbmdlKHZhbCkpIHtcbiAgICAgIG9uQ2hhbmdlKFt2YWx1ZTAsIHRoaXMuX3JvdW5kVmFsVG9TdGVwKHZhbCldKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgX3NldFJhbmdlVmFsMCA9IHZhbCA9PiB7XG4gICAgY29uc3Qge3ZhbHVlMSwgb25DaGFuZ2V9ID0gdGhpcy5wcm9wcztcbiAgICB2YWwgPSBOdW1iZXIodmFsKTtcblxuICAgIGlmICh0aGlzLl9pc1ZhbDBJblJhbmdlKHZhbCkpIHtcbiAgICAgIG9uQ2hhbmdlKFt0aGlzLl9yb3VuZFZhbFRvU3RlcCh2YWwpLCB2YWx1ZTFdKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgX3Jlc2l6ZSgpIHtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuc2xpZGVyQ29udGFpbmVyLm9mZnNldFdpZHRoO1xuICAgIGlmICh3aWR0aCAhPT0gdGhpcy5zdGF0ZS53aWR0aCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7d2lkdGh9KTtcbiAgICB9XG4gIH1cblxuICBfcmVuZGVySW5wdXQoa2V5KSB7XG4gICAgY29uc3Qgc2V0UmFuZ2UgPSBrZXkgPT09ICd2YWx1ZTAnID8gdGhpcy5fc2V0UmFuZ2VWYWwwIDogdGhpcy5fc2V0UmFuZ2VWYWwxO1xuICAgIGNvbnN0IHVwZGF0ZSA9IGUgPT4ge1xuICAgICAgaWYgKCFzZXRSYW5nZShlLnRhcmdldC52YWx1ZSkpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7W2tleV06IHRoaXMuc3RhdGVba2V5XX0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFNsaWRlcklucHV0XG4gICAgICAgIGNsYXNzTmFtZT1cImtnLXJhbmdlLXNsaWRlcl9faW5wdXRcIlxuICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgaW5uZXJSZWY9e2NvbXAgPT4ge1xuICAgICAgICAgIHRoaXNbYGlucHV0LSR7a2V5fWBdID0gY29tcDtcbiAgICAgICAgfX1cbiAgICAgICAgaWQ9e2BmaWx0ZXItJHtrZXl9YH1cbiAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGVba2V5XX1cbiAgICAgICAgb25DaGFuZ2U9e2UgPT4ge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1trZXldOiBlLnRhcmdldC52YWx1ZX0pO1xuICAgICAgICB9fVxuICAgICAgICBvbktleVByZXNzPXtlID0+IHtcbiAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgICAgIHVwZGF0ZShlKTtcbiAgICAgICAgICAgIHRoaXNbYGlucHV0LSR7a2V5fWBdLmJsdXIoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH19XG4gICAgICAgIG9uQmx1cj17dXBkYXRlfVxuICAgICAgICBmbHVzaD17a2V5ID09PSAndmFsdWUwJ31cbiAgICAgICAgc2Vjb25kYXJ5PXt0aGlzLnByb3BzLmlucHV0VGhlbWUgPT09ICdzZWNvbmRhcnknfVxuICAgICAgLz5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGlzUmFuZ2VkLFxuICAgICAgc2hvd0lucHV0LFxuICAgICAgaGlzdG9ncmFtLFxuICAgICAgbGluZUNoYXJ0LFxuICAgICAgcGxvdFR5cGUsXG4gICAgICBpc0VubGFyZ2VkLFxuICAgICAgcmFuZ2UsXG4gICAgICBvbkNoYW5nZSxcbiAgICAgIHZhbHVlMCxcbiAgICAgIHZhbHVlMSxcbiAgICAgIHNsaWRlckhhbmRsZVdpZHRoXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBoZWlnaHQgPSBpc1JhbmdlZCAmJiBzaG93SW5wdXQgPyAnMTZweCcgOiAnMjRweCc7XG4gICAgY29uc3Qge3dpZHRofSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgcGxvdFdpZHRoID0gIHdpZHRoIC0gc2xpZGVySGFuZGxlV2lkdGg7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJrZy1yYW5nZS1zbGlkZXJcIiBzdHlsZT17e3dpZHRoOiAnMTAwJScsIHBhZGRpbmc6IGAwICR7c2xpZGVySGFuZGxlV2lkdGggLyAyfXB4YH19XG4gICAgICAgIHJlZj17Y29tcCA9PiB7XG4gICAgICAgICAgdGhpcy5zbGlkZXJDb250YWluZXIgPSBjb21wO1xuICAgICAgICB9fT5cbiAgICAgICAge2hpc3RvZ3JhbSAmJiBoaXN0b2dyYW0ubGVuZ3RoID8gKFxuICAgICAgICAgIDxSYW5nZVBsb3RcbiAgICAgICAgICAgIGhpc3RvZ3JhbT17aGlzdG9ncmFtfVxuICAgICAgICAgICAgbGluZUNoYXJ0PXtsaW5lQ2hhcnR9XG4gICAgICAgICAgICBwbG90VHlwZT17cGxvdFR5cGV9XG4gICAgICAgICAgICBpc0VubGFyZ2VkPXtpc0VubGFyZ2VkfVxuICAgICAgICAgICAgb25CcnVzaD17KHZhbDAsIHZhbDEpID0+IHtcbiAgICAgICAgICAgICAgb25DaGFuZ2UoW1xuICAgICAgICAgICAgICAgIHRoaXMuX3JvdW5kVmFsVG9TdGVwKHZhbDApLFxuICAgICAgICAgICAgICAgIHRoaXMuX3JvdW5kVmFsVG9TdGVwKHZhbDEpXG4gICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIHJhbmdlPXtyYW5nZX1cbiAgICAgICAgICAgIHZhbHVlPXtbdmFsdWUwLCB2YWx1ZTFdfVxuICAgICAgICAgICAgd2lkdGg9e3Bsb3RXaWR0aH1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPFNsaWRlcldyYXBwZXJcbiAgICAgICAgICBzdHlsZT17e2hlaWdodH19XG4gICAgICAgICAgY2xhc3NOYW1lPVwia2ctcmFuZ2Utc2xpZGVyX19zbGlkZXJcIj5cbiAgICAgICAgICB7dGhpcy5wcm9wcy54QXhpcyA/IDx0aGlzLnByb3BzLnhBeGlzIHdpZHRoPXtwbG90V2lkdGh9IGRvbWFpbj17cmFuZ2V9Lz4gOiBudWxsfVxuICAgICAgICAgIDxTbGlkZXJcbiAgICAgICAgICAgIHNob3dWYWx1ZXM9e2ZhbHNlfVxuICAgICAgICAgICAgaXNSYW5nZWQ9e2lzUmFuZ2VkfVxuICAgICAgICAgICAgbWluVmFsdWU9e3JhbmdlWzBdfVxuICAgICAgICAgICAgbWF4VmFsdWU9e3JhbmdlWzFdfVxuICAgICAgICAgICAgdmFsdWUwPXt2YWx1ZTB9XG4gICAgICAgICAgICB2YWx1ZTE9e3ZhbHVlMX1cbiAgICAgICAgICAgIGhhbmRsZVdpZHRoPXtzbGlkZXJIYW5kbGVXaWR0aH1cbiAgICAgICAgICAgIG9uU2xpZGVyMENoYW5nZT17dGhpcy5fc2V0UmFuZ2VWYWwwfVxuICAgICAgICAgICAgb25TbGlkZXIxQ2hhbmdlPXt0aGlzLl9zZXRSYW5nZVZhbDF9XG4gICAgICAgICAgICBvblNsaWRlckJhckNoYW5nZT17KHZhbDAsIHZhbDEpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzVmFsMUluUmFuZ2UodmFsMSkgJiYgdGhpcy5faXNWYWwwSW5SYW5nZSh2YWwwKSkge1xuICAgICAgICAgICAgICAgIG9uQ2hhbmdlKFtcbiAgICAgICAgICAgICAgICAgIHRoaXMuX3JvdW5kVmFsVG9TdGVwKHZhbDApLFxuICAgICAgICAgICAgICAgICAgdGhpcy5fcm91bmRWYWxUb1N0ZXAodmFsMSlcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGVuYWJsZUJhckRyYWdcbiAgICAgICAgICAvPlxuICAgICAgICAgIHshaXNSYW5nZWQgJiYgc2hvd0lucHV0ID8gdGhpcy5fcmVuZGVySW5wdXQoJ3ZhbHVlMScpIDogbnVsbH1cbiAgICAgICAgPC9TbGlkZXJXcmFwcGVyPlxuICAgICAgICB7aXNSYW5nZWQgJiYgc2hvd0lucHV0ID8gPFJhbmdlSW5wdXRXcmFwcGVyIGNsYXNzTmFtZT1cInJhbmdlLXNsaWRlcl9faW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICB7dGhpcy5fcmVuZGVySW5wdXQoJ3ZhbHVlMCcpfVxuICAgICAgICAgIHt0aGlzLl9yZW5kZXJJbnB1dCgndmFsdWUxJyl9XG4gICAgICAgIDwvUmFuZ2VJbnB1dFdyYXBwZXI+IDogbnVsbH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG4iXX0=