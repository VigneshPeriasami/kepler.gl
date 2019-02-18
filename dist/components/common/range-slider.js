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

var SliderInput = _styledComponents2.Input.extend(_templateObject(), function (props) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9yYW5nZS1zbGlkZXIuanMiXSwibmFtZXMiOlsiU2xpZGVySW5wdXQiLCJJbnB1dCIsImV4dGVuZCIsInByb3BzIiwidGhlbWUiLCJzbGlkZXJJbnB1dEhlaWdodCIsInNsaWRlcklucHV0V2lkdGgiLCJmbHVzaCIsIlNsaWRlcldyYXBwZXIiLCJzdHlsZWQiLCJkaXYiLCJSYW5nZUlucHV0V3JhcHBlciIsIlJhbmdlU2xpZGVyIiwidmFsdWUwIiwidmFsdWUxIiwid2lkdGgiLCJpc05hTiIsInNldFN0YXRlIiwidmFsIiwicmFuZ2UiLCJCb29sZWFuIiwic3RlcCIsIm9uQ2hhbmdlIiwiTnVtYmVyIiwiX2lzVmFsMUluUmFuZ2UiLCJfcm91bmRWYWxUb1N0ZXAiLCJfaXNWYWwwSW5SYW5nZSIsIl9zZXRWYWx1ZUZyb21Qcm9wcyIsIl9yZXNpemUiLCJuZXh0UHJvcHMiLCJzbGlkZXJDb250YWluZXIiLCJvZmZzZXRXaWR0aCIsInN0YXRlIiwia2V5Iiwic2V0UmFuZ2UiLCJfc2V0UmFuZ2VWYWwwIiwiX3NldFJhbmdlVmFsMSIsInVwZGF0ZSIsImUiLCJ0YXJnZXQiLCJ2YWx1ZSIsImNvbXAiLCJibHVyIiwiaW5wdXRUaGVtZSIsImlzUmFuZ2VkIiwic2hvd0lucHV0IiwiaGlzdG9ncmFtIiwibGluZUNoYXJ0IiwicGxvdFR5cGUiLCJpc0VubGFyZ2VkIiwic2xpZGVySGFuZGxlV2lkdGgiLCJoZWlnaHQiLCJwbG90V2lkdGgiLCJwYWRkaW5nIiwibGVuZ3RoIiwidmFsMCIsInZhbDEiLCJ4QXhpcyIsIl9yZW5kZXJJbnB1dCIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsImFycmF5T2YiLCJudW1iZXIiLCJpc1JlcXVpcmVkIiwiZnVuYyIsImFueSIsImJvb2wiLCJzdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFD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cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCBSYW5nZVBsb3QgZnJvbSAnLi9yYW5nZS1wbG90JztcbmltcG9ydCBTbGlkZXIgZnJvbSAnY29tcG9uZW50cy9jb21tb24vc2xpZGVyL3NsaWRlcic7XG5pbXBvcnQge0lucHV0fSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7cm91bmRWYWxUb1N0ZXB9IGZyb20gJ3V0aWxzL2RhdGEtdXRpbHMnO1xuXG5jb25zdCBTbGlkZXJJbnB1dCA9IElucHV0LmV4dGVuZGBcbiAgaGVpZ2h0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNsaWRlcklucHV0SGVpZ2h0fXB4O1xuICB3aWR0aDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zbGlkZXJJbnB1dFdpZHRofXB4O1xuICBwYWRkaW5nOiA0cHggNnB4O1xuICBtYXJnaW4tbGVmdDogJHtwcm9wcyA9PiBwcm9wcy5mbHVzaCA/IDAgOiAyNH1weDtcbmA7XG5cbmNvbnN0IFNsaWRlcldyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5gO1xuXG5jb25zdCBSYW5nZUlucHV0V3JhcHBlciA9c3R5bGVkLmRpdmBcbiAgbWFyZ2luLXRvcDogNnB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYW5nZVNsaWRlciBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgcmFuZ2U6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpLmlzUmVxdWlyZWQsXG4gICAgdmFsdWUwOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgdmFsdWUxOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgaGlzdG9ncmFtOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KSxcbiAgICBpc1JhbmdlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgaXNFbmxhcmdlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0lucHV0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBpbnB1dFRoZW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHN0ZXA6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgc2xpZGVySGFuZGxlV2lkdGg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgeEF4aXM6IFByb3BUeXBlcy5mdW5jXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBpc0VubGFyZ2VkOiBmYWxzZSxcbiAgICBpc1JhbmdlZDogdHJ1ZSxcbiAgICBzaG93SW5wdXQ6IHRydWUsXG4gICAgc2xpZGVySGFuZGxlV2lkdGg6IDEyLFxuICAgIG9uQ2hhbmdlOiAoKSA9PiB7fVxuICB9O1xuXG4gIHN0YXRlID0ge3ZhbHVlMDogMCwgdmFsdWUxOiAxLCB3aWR0aDogMjg4fTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLl9zZXRWYWx1ZUZyb21Qcm9wcyh0aGlzLnByb3BzKTtcbiAgICB0aGlzLl9yZXNpemUoKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgdGhpcy5fc2V0VmFsdWVGcm9tUHJvcHMobmV4dFByb3BzKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICB0aGlzLl9yZXNpemUoKTtcbiAgfVxuXG4gIF9zZXRWYWx1ZUZyb21Qcm9wcyA9IHByb3BzID0+IHtcbiAgICBjb25zdCB7dmFsdWUwLCB2YWx1ZTF9ID0gcHJvcHM7XG5cbiAgICBpZiAoIWlzTmFOKHZhbHVlMCkgJiYgIWlzTmFOKHZhbHVlMSkpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlMCwgdmFsdWUxfSk7XG4gICAgfVxuICB9O1xuXG4gIF9pc1ZhbDBJblJhbmdlID0gdmFsID0+IHtcbiAgICBjb25zdCB7dmFsdWUxLCByYW5nZX0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIEJvb2xlYW4odmFsID49IHJhbmdlWzBdICYmIHZhbCA8PSB2YWx1ZTEpO1xuICB9O1xuXG4gIF9pc1ZhbDFJblJhbmdlID0gdmFsID0+IHtcbiAgICBjb25zdCB7cmFuZ2UsIHZhbHVlMH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIEJvb2xlYW4odmFsIDw9IHJhbmdlWzFdICYmIHZhbCA+PSB2YWx1ZTApO1xuICB9O1xuXG4gIF9yb3VuZFZhbFRvU3RlcCA9IHZhbCA9PiB7XG4gICAgY29uc3Qge3JhbmdlLCBzdGVwfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gcm91bmRWYWxUb1N0ZXAocmFuZ2VbMF0sIHN0ZXAsIHZhbCk7XG4gIH07XG5cbiAgX3NldFJhbmdlVmFsMSA9IHZhbCA9PiB7XG4gICAgY29uc3Qge3ZhbHVlMCwgb25DaGFuZ2V9ID0gdGhpcy5wcm9wcztcbiAgICB2YWwgPSBOdW1iZXIodmFsKTtcblxuICAgIGlmICh0aGlzLl9pc1ZhbDFJblJhbmdlKHZhbCkpIHtcbiAgICAgIG9uQ2hhbmdlKFt2YWx1ZTAsIHRoaXMuX3JvdW5kVmFsVG9TdGVwKHZhbCldKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgX3NldFJhbmdlVmFsMCA9IHZhbCA9PiB7XG4gICAgY29uc3Qge3ZhbHVlMSwgb25DaGFuZ2V9ID0gdGhpcy5wcm9wcztcbiAgICB2YWwgPSBOdW1iZXIodmFsKTtcblxuICAgIGlmICh0aGlzLl9pc1ZhbDBJblJhbmdlKHZhbCkpIHtcbiAgICAgIG9uQ2hhbmdlKFt0aGlzLl9yb3VuZFZhbFRvU3RlcCh2YWwpLCB2YWx1ZTFdKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgX3Jlc2l6ZSgpIHtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuc2xpZGVyQ29udGFpbmVyLm9mZnNldFdpZHRoO1xuICAgIGlmICh3aWR0aCAhPT0gdGhpcy5zdGF0ZS53aWR0aCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7d2lkdGh9KTtcbiAgICB9XG4gIH1cblxuICBfcmVuZGVySW5wdXQoa2V5KSB7XG4gICAgY29uc3Qgc2V0UmFuZ2UgPSBrZXkgPT09ICd2YWx1ZTAnID8gdGhpcy5fc2V0UmFuZ2VWYWwwIDogdGhpcy5fc2V0UmFuZ2VWYWwxO1xuICAgIGNvbnN0IHVwZGF0ZSA9IGUgPT4ge1xuICAgICAgaWYgKCFzZXRSYW5nZShlLnRhcmdldC52YWx1ZSkpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7W2tleV06IHRoaXMuc3RhdGVba2V5XX0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFNsaWRlcklucHV0XG4gICAgICAgIGNsYXNzTmFtZT1cImtnLXJhbmdlLXNsaWRlcl9faW5wdXRcIlxuICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgaW5uZXJSZWY9e2NvbXAgPT4ge1xuICAgICAgICAgIHRoaXNbYGlucHV0LSR7a2V5fWBdID0gY29tcDtcbiAgICAgICAgfX1cbiAgICAgICAgaWQ9e2BmaWx0ZXItJHtrZXl9YH1cbiAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGVba2V5XX1cbiAgICAgICAgb25DaGFuZ2U9e2UgPT4ge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1trZXldOiBlLnRhcmdldC52YWx1ZX0pO1xuICAgICAgICB9fVxuICAgICAgICBvbktleVByZXNzPXtlID0+IHtcbiAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgICAgIHVwZGF0ZShlKTtcbiAgICAgICAgICAgIHRoaXNbYGlucHV0LSR7a2V5fWBdLmJsdXIoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH19XG4gICAgICAgIG9uQmx1cj17dXBkYXRlfVxuICAgICAgICBmbHVzaD17a2V5ID09PSAndmFsdWUwJ31cbiAgICAgICAgc2Vjb25kYXJ5PXt0aGlzLnByb3BzLmlucHV0VGhlbWUgPT09ICdzZWNvbmRhcnknfVxuICAgICAgLz5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGlzUmFuZ2VkLFxuICAgICAgc2hvd0lucHV0LFxuICAgICAgaGlzdG9ncmFtLFxuICAgICAgbGluZUNoYXJ0LFxuICAgICAgcGxvdFR5cGUsXG4gICAgICBpc0VubGFyZ2VkLFxuICAgICAgcmFuZ2UsXG4gICAgICBvbkNoYW5nZSxcbiAgICAgIHZhbHVlMCxcbiAgICAgIHZhbHVlMSxcbiAgICAgIHNsaWRlckhhbmRsZVdpZHRoXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBoZWlnaHQgPSBpc1JhbmdlZCAmJiBzaG93SW5wdXQgPyAnMTZweCcgOiAnMjRweCc7XG4gICAgY29uc3Qge3dpZHRofSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgcGxvdFdpZHRoID0gIHdpZHRoIC0gc2xpZGVySGFuZGxlV2lkdGg7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJrZy1yYW5nZS1zbGlkZXJcIiBzdHlsZT17e3dpZHRoOiAnMTAwJScsIHBhZGRpbmc6IGAwICR7c2xpZGVySGFuZGxlV2lkdGggLyAyfXB4YH19XG4gICAgICAgIHJlZj17Y29tcCA9PiB7XG4gICAgICAgICAgdGhpcy5zbGlkZXJDb250YWluZXIgPSBjb21wO1xuICAgICAgICB9fT5cbiAgICAgICAge2hpc3RvZ3JhbSAmJiBoaXN0b2dyYW0ubGVuZ3RoID8gKFxuICAgICAgICAgIDxSYW5nZVBsb3RcbiAgICAgICAgICAgIGhpc3RvZ3JhbT17aGlzdG9ncmFtfVxuICAgICAgICAgICAgbGluZUNoYXJ0PXtsaW5lQ2hhcnR9XG4gICAgICAgICAgICBwbG90VHlwZT17cGxvdFR5cGV9XG4gICAgICAgICAgICBpc0VubGFyZ2VkPXtpc0VubGFyZ2VkfVxuICAgICAgICAgICAgb25CcnVzaD17KHZhbDAsIHZhbDEpID0+IHtcbiAgICAgICAgICAgICAgb25DaGFuZ2UoW1xuICAgICAgICAgICAgICAgIHRoaXMuX3JvdW5kVmFsVG9TdGVwKHZhbDApLFxuICAgICAgICAgICAgICAgIHRoaXMuX3JvdW5kVmFsVG9TdGVwKHZhbDEpXG4gICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIHJhbmdlPXtyYW5nZX1cbiAgICAgICAgICAgIHZhbHVlPXtbdmFsdWUwLCB2YWx1ZTFdfVxuICAgICAgICAgICAgd2lkdGg9e3Bsb3RXaWR0aH1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPFNsaWRlcldyYXBwZXJcbiAgICAgICAgICBzdHlsZT17e2hlaWdodH19XG4gICAgICAgICAgY2xhc3NOYW1lPVwia2ctcmFuZ2Utc2xpZGVyX19zbGlkZXJcIj5cbiAgICAgICAgICB7dGhpcy5wcm9wcy54QXhpcyA/IDx0aGlzLnByb3BzLnhBeGlzIHdpZHRoPXtwbG90V2lkdGh9IGRvbWFpbj17cmFuZ2V9Lz4gOiBudWxsfVxuICAgICAgICAgIDxTbGlkZXJcbiAgICAgICAgICAgIHNob3dWYWx1ZXM9e2ZhbHNlfVxuICAgICAgICAgICAgaXNSYW5nZWQ9e2lzUmFuZ2VkfVxuICAgICAgICAgICAgbWluVmFsdWU9e3JhbmdlWzBdfVxuICAgICAgICAgICAgbWF4VmFsdWU9e3JhbmdlWzFdfVxuICAgICAgICAgICAgdmFsdWUwPXt2YWx1ZTB9XG4gICAgICAgICAgICB2YWx1ZTE9e3ZhbHVlMX1cbiAgICAgICAgICAgIGhhbmRsZVdpZHRoPXtzbGlkZXJIYW5kbGVXaWR0aH1cbiAgICAgICAgICAgIG9uU2xpZGVyMENoYW5nZT17dGhpcy5fc2V0UmFuZ2VWYWwwfVxuICAgICAgICAgICAgb25TbGlkZXIxQ2hhbmdlPXt0aGlzLl9zZXRSYW5nZVZhbDF9XG4gICAgICAgICAgICBvblNsaWRlckJhckNoYW5nZT17KHZhbDAsIHZhbDEpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzVmFsMUluUmFuZ2UodmFsMSkgJiYgdGhpcy5faXNWYWwwSW5SYW5nZSh2YWwwKSkge1xuICAgICAgICAgICAgICAgIG9uQ2hhbmdlKFtcbiAgICAgICAgICAgICAgICAgIHRoaXMuX3JvdW5kVmFsVG9TdGVwKHZhbDApLFxuICAgICAgICAgICAgICAgICAgdGhpcy5fcm91bmRWYWxUb1N0ZXAodmFsMSlcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGVuYWJsZUJhckRyYWdcbiAgICAgICAgICAvPlxuICAgICAgICAgIHshaXNSYW5nZWQgJiYgc2hvd0lucHV0ID8gdGhpcy5fcmVuZGVySW5wdXQoJ3ZhbHVlMScpIDogbnVsbH1cbiAgICAgICAgPC9TbGlkZXJXcmFwcGVyPlxuICAgICAgICB7aXNSYW5nZWQgJiYgc2hvd0lucHV0ID8gPFJhbmdlSW5wdXRXcmFwcGVyIGNsYXNzTmFtZT1cInJhbmdlLXNsaWRlcl9faW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICB7dGhpcy5fcmVuZGVySW5wdXQoJ3ZhbHVlMCcpfVxuICAgICAgICAgIHt0aGlzLl9yZW5kZXJJbnB1dCgndmFsdWUxJyl9XG4gICAgICAgIDwvUmFuZ2VJbnB1dFdyYXBwZXI+IDogbnVsbH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG4iXX0=