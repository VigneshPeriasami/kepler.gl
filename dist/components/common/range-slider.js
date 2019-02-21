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
        ref: function ref(comp) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9yYW5nZS1zbGlkZXIuanMiXSwibmFtZXMiOlsiU2xpZGVySW5wdXQiLCJJbnB1dCIsInByb3BzIiwidGhlbWUiLCJzbGlkZXJJbnB1dEhlaWdodCIsInNsaWRlcklucHV0V2lkdGgiLCJmbHVzaCIsIlNsaWRlcldyYXBwZXIiLCJzdHlsZWQiLCJkaXYiLCJSYW5nZUlucHV0V3JhcHBlciIsIlJhbmdlU2xpZGVyIiwidmFsdWUwIiwidmFsdWUxIiwid2lkdGgiLCJpc05hTiIsInNldFN0YXRlIiwidmFsIiwicmFuZ2UiLCJCb29sZWFuIiwic3RlcCIsIm9uQ2hhbmdlIiwiTnVtYmVyIiwiX2lzVmFsMUluUmFuZ2UiLCJfcm91bmRWYWxUb1N0ZXAiLCJfaXNWYWwwSW5SYW5nZSIsIl9zZXRWYWx1ZUZyb21Qcm9wcyIsIl9yZXNpemUiLCJuZXh0UHJvcHMiLCJzbGlkZXJDb250YWluZXIiLCJvZmZzZXRXaWR0aCIsInN0YXRlIiwia2V5Iiwic2V0UmFuZ2UiLCJfc2V0UmFuZ2VWYWwwIiwiX3NldFJhbmdlVmFsMSIsInVwZGF0ZSIsImUiLCJ0YXJnZXQiLCJ2YWx1ZSIsImNvbXAiLCJibHVyIiwiaW5wdXRUaGVtZSIsImlzUmFuZ2VkIiwic2hvd0lucHV0IiwiaGlzdG9ncmFtIiwibGluZUNoYXJ0IiwicGxvdFR5cGUiLCJpc0VubGFyZ2VkIiwic2xpZGVySGFuZGxlV2lkdGgiLCJoZWlnaHQiLCJwbG90V2lkdGgiLCJwYWRkaW5nIiwibGVuZ3RoIiwidmFsMCIsInZhbDEiLCJ4QXhpcyIsIl9yZW5kZXJJbnB1dCIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsImFycmF5T2YiLCJudW1iZXIiLCJpc1JlcXVpcmVkIiwiZnVuYyIsImFueSIsImJvb2wiLCJzdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7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bnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCBSYW5nZVBsb3QgZnJvbSAnLi9yYW5nZS1wbG90JztcbmltcG9ydCBTbGlkZXIgZnJvbSAnY29tcG9uZW50cy9jb21tb24vc2xpZGVyL3NsaWRlcic7XG5pbXBvcnQge0lucHV0fSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7cm91bmRWYWxUb1N0ZXB9IGZyb20gJ3V0aWxzL2RhdGEtdXRpbHMnO1xuXG5jb25zdCBTbGlkZXJJbnB1dCA9IHN0eWxlZChJbnB1dClgXG4gIGhlaWdodDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zbGlkZXJJbnB1dEhlaWdodH1weDtcbiAgd2lkdGg6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2xpZGVySW5wdXRXaWR0aH1weDtcbiAgcGFkZGluZzogNHB4IDZweDtcbiAgbWFyZ2luLWxlZnQ6ICR7cHJvcHMgPT4gcHJvcHMuZmx1c2ggPyAwIDogMjR9cHg7XG5gO1xuXG5jb25zdCBTbGlkZXJXcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuYDtcblxuY29uc3QgUmFuZ2VJbnB1dFdyYXBwZXIgPXN0eWxlZC5kaXZgXG4gIG1hcmdpbi10b3A6IDZweDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuYDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFuZ2VTbGlkZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIHJhbmdlOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMubnVtYmVyKS5pc1JlcXVpcmVkLFxuICAgIHZhbHVlMDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIHZhbHVlMTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGhpc3RvZ3JhbTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSksXG4gICAgaXNSYW5nZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGlzRW5sYXJnZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dJbnB1dDogUHJvcFR5cGVzLmJvb2wsXG4gICAgaW5wdXRUaGVtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzdGVwOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHNsaWRlckhhbmRsZVdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHhBeGlzOiBQcm9wVHlwZXMuZnVuY1xuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgaXNFbmxhcmdlZDogZmFsc2UsXG4gICAgaXNSYW5nZWQ6IHRydWUsXG4gICAgc2hvd0lucHV0OiB0cnVlLFxuICAgIHNsaWRlckhhbmRsZVdpZHRoOiAxMixcbiAgICBvbkNoYW5nZTogKCkgPT4ge31cbiAgfTtcblxuICBzdGF0ZSA9IHt2YWx1ZTA6IDAsIHZhbHVlMTogMSwgd2lkdGg6IDI4OH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5fc2V0VmFsdWVGcm9tUHJvcHModGhpcy5wcm9wcyk7XG4gICAgdGhpcy5fcmVzaXplKCk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIHRoaXMuX3NldFZhbHVlRnJvbVByb3BzKG5leHRQcm9wcyk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgdGhpcy5fcmVzaXplKCk7XG4gIH1cblxuICBfc2V0VmFsdWVGcm9tUHJvcHMgPSBwcm9wcyA9PiB7XG4gICAgY29uc3Qge3ZhbHVlMCwgdmFsdWUxfSA9IHByb3BzO1xuXG4gICAgaWYgKCFpc05hTih2YWx1ZTApICYmICFpc05hTih2YWx1ZTEpKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTAsIHZhbHVlMX0pO1xuICAgIH1cbiAgfTtcblxuICBfaXNWYWwwSW5SYW5nZSA9IHZhbCA9PiB7XG4gICAgY29uc3Qge3ZhbHVlMSwgcmFuZ2V9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiBCb29sZWFuKHZhbCA+PSByYW5nZVswXSAmJiB2YWwgPD0gdmFsdWUxKTtcbiAgfTtcblxuICBfaXNWYWwxSW5SYW5nZSA9IHZhbCA9PiB7XG4gICAgY29uc3Qge3JhbmdlLCB2YWx1ZTB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiBCb29sZWFuKHZhbCA8PSByYW5nZVsxXSAmJiB2YWwgPj0gdmFsdWUwKTtcbiAgfTtcblxuICBfcm91bmRWYWxUb1N0ZXAgPSB2YWwgPT4ge1xuICAgIGNvbnN0IHtyYW5nZSwgc3RlcH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIHJvdW5kVmFsVG9TdGVwKHJhbmdlWzBdLCBzdGVwLCB2YWwpO1xuICB9O1xuXG4gIF9zZXRSYW5nZVZhbDEgPSB2YWwgPT4ge1xuICAgIGNvbnN0IHt2YWx1ZTAsIG9uQ2hhbmdlfSA9IHRoaXMucHJvcHM7XG4gICAgdmFsID0gTnVtYmVyKHZhbCk7XG5cbiAgICBpZiAodGhpcy5faXNWYWwxSW5SYW5nZSh2YWwpKSB7XG4gICAgICBvbkNoYW5nZShbdmFsdWUwLCB0aGlzLl9yb3VuZFZhbFRvU3RlcCh2YWwpXSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIF9zZXRSYW5nZVZhbDAgPSB2YWwgPT4ge1xuICAgIGNvbnN0IHt2YWx1ZTEsIG9uQ2hhbmdlfSA9IHRoaXMucHJvcHM7XG4gICAgdmFsID0gTnVtYmVyKHZhbCk7XG5cbiAgICBpZiAodGhpcy5faXNWYWwwSW5SYW5nZSh2YWwpKSB7XG4gICAgICBvbkNoYW5nZShbdGhpcy5fcm91bmRWYWxUb1N0ZXAodmFsKSwgdmFsdWUxXSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIF9yZXNpemUoKSB7XG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLnNsaWRlckNvbnRhaW5lci5vZmZzZXRXaWR0aDtcbiAgICBpZiAod2lkdGggIT09IHRoaXMuc3RhdGUud2lkdGgpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe3dpZHRofSk7XG4gICAgfVxuICB9XG5cbiAgX3JlbmRlcklucHV0KGtleSkge1xuICAgIGNvbnN0IHNldFJhbmdlID0ga2V5ID09PSAndmFsdWUwJyA/IHRoaXMuX3NldFJhbmdlVmFsMCA6IHRoaXMuX3NldFJhbmdlVmFsMTtcbiAgICBjb25zdCB1cGRhdGUgPSBlID0+IHtcbiAgICAgIGlmICghc2V0UmFuZ2UoZS50YXJnZXQudmFsdWUpKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1trZXldOiB0aGlzLnN0YXRlW2tleV19KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxTbGlkZXJJbnB1dFxuICAgICAgICBjbGFzc05hbWU9XCJrZy1yYW5nZS1zbGlkZXJfX2lucHV0XCJcbiAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgIHJlZj17Y29tcCA9PiB7XG4gICAgICAgICAgdGhpc1tgaW5wdXQtJHtrZXl9YF0gPSBjb21wO1xuICAgICAgICB9fVxuICAgICAgICBpZD17YGZpbHRlci0ke2tleX1gfVxuICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZVtrZXldfVxuICAgICAgICBvbkNoYW5nZT17ZSA9PiB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7W2tleV06IGUudGFyZ2V0LnZhbHVlfSk7XG4gICAgICAgIH19XG4gICAgICAgIG9uS2V5UHJlc3M9e2UgPT4ge1xuICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgdXBkYXRlKGUpO1xuICAgICAgICAgICAgdGhpc1tgaW5wdXQtJHtrZXl9YF0uYmx1cigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfX1cbiAgICAgICAgb25CbHVyPXt1cGRhdGV9XG4gICAgICAgIGZsdXNoPXtrZXkgPT09ICd2YWx1ZTAnfVxuICAgICAgICBzZWNvbmRhcnk9e3RoaXMucHJvcHMuaW5wdXRUaGVtZSA9PT0gJ3NlY29uZGFyeSd9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgaXNSYW5nZWQsXG4gICAgICBzaG93SW5wdXQsXG4gICAgICBoaXN0b2dyYW0sXG4gICAgICBsaW5lQ2hhcnQsXG4gICAgICBwbG90VHlwZSxcbiAgICAgIGlzRW5sYXJnZWQsXG4gICAgICByYW5nZSxcbiAgICAgIG9uQ2hhbmdlLFxuICAgICAgdmFsdWUwLFxuICAgICAgdmFsdWUxLFxuICAgICAgc2xpZGVySGFuZGxlV2lkdGhcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IGhlaWdodCA9IGlzUmFuZ2VkICYmIHNob3dJbnB1dCA/ICcxNnB4JyA6ICcyNHB4JztcbiAgICBjb25zdCB7d2lkdGh9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBwbG90V2lkdGggPSAgd2lkdGggLSBzbGlkZXJIYW5kbGVXaWR0aDtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cImtnLXJhbmdlLXNsaWRlclwiIHN0eWxlPXt7d2lkdGg6ICcxMDAlJywgcGFkZGluZzogYDAgJHtzbGlkZXJIYW5kbGVXaWR0aCAvIDJ9cHhgfX1cbiAgICAgICAgcmVmPXtjb21wID0+IHtcbiAgICAgICAgICB0aGlzLnNsaWRlckNvbnRhaW5lciA9IGNvbXA7XG4gICAgICAgIH19PlxuICAgICAgICB7aGlzdG9ncmFtICYmIGhpc3RvZ3JhbS5sZW5ndGggPyAoXG4gICAgICAgICAgPFJhbmdlUGxvdFxuICAgICAgICAgICAgaGlzdG9ncmFtPXtoaXN0b2dyYW19XG4gICAgICAgICAgICBsaW5lQ2hhcnQ9e2xpbmVDaGFydH1cbiAgICAgICAgICAgIHBsb3RUeXBlPXtwbG90VHlwZX1cbiAgICAgICAgICAgIGlzRW5sYXJnZWQ9e2lzRW5sYXJnZWR9XG4gICAgICAgICAgICBvbkJydXNoPXsodmFsMCwgdmFsMSkgPT4ge1xuICAgICAgICAgICAgICBvbkNoYW5nZShbXG4gICAgICAgICAgICAgICAgdGhpcy5fcm91bmRWYWxUb1N0ZXAodmFsMCksXG4gICAgICAgICAgICAgICAgdGhpcy5fcm91bmRWYWxUb1N0ZXAodmFsMSlcbiAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgcmFuZ2U9e3JhbmdlfVxuICAgICAgICAgICAgdmFsdWU9e1t2YWx1ZTAsIHZhbHVlMV19XG4gICAgICAgICAgICB3aWR0aD17cGxvdFdpZHRofVxuICAgICAgICAgIC8+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICA8U2xpZGVyV3JhcHBlclxuICAgICAgICAgIHN0eWxlPXt7aGVpZ2h0fX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJrZy1yYW5nZS1zbGlkZXJfX3NsaWRlclwiPlxuICAgICAgICAgIHt0aGlzLnByb3BzLnhBeGlzID8gPHRoaXMucHJvcHMueEF4aXMgd2lkdGg9e3Bsb3RXaWR0aH0gZG9tYWluPXtyYW5nZX0vPiA6IG51bGx9XG4gICAgICAgICAgPFNsaWRlclxuICAgICAgICAgICAgc2hvd1ZhbHVlcz17ZmFsc2V9XG4gICAgICAgICAgICBpc1JhbmdlZD17aXNSYW5nZWR9XG4gICAgICAgICAgICBtaW5WYWx1ZT17cmFuZ2VbMF19XG4gICAgICAgICAgICBtYXhWYWx1ZT17cmFuZ2VbMV19XG4gICAgICAgICAgICB2YWx1ZTA9e3ZhbHVlMH1cbiAgICAgICAgICAgIHZhbHVlMT17dmFsdWUxfVxuICAgICAgICAgICAgaGFuZGxlV2lkdGg9e3NsaWRlckhhbmRsZVdpZHRofVxuICAgICAgICAgICAgb25TbGlkZXIwQ2hhbmdlPXt0aGlzLl9zZXRSYW5nZVZhbDB9XG4gICAgICAgICAgICBvblNsaWRlcjFDaGFuZ2U9e3RoaXMuX3NldFJhbmdlVmFsMX1cbiAgICAgICAgICAgIG9uU2xpZGVyQmFyQ2hhbmdlPXsodmFsMCwgdmFsMSkgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpcy5faXNWYWwxSW5SYW5nZSh2YWwxKSAmJiB0aGlzLl9pc1ZhbDBJblJhbmdlKHZhbDApKSB7XG4gICAgICAgICAgICAgICAgb25DaGFuZ2UoW1xuICAgICAgICAgICAgICAgICAgdGhpcy5fcm91bmRWYWxUb1N0ZXAodmFsMCksXG4gICAgICAgICAgICAgICAgICB0aGlzLl9yb3VuZFZhbFRvU3RlcCh2YWwxKVxuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgZW5hYmxlQmFyRHJhZ1xuICAgICAgICAgIC8+XG4gICAgICAgICAgeyFpc1JhbmdlZCAmJiBzaG93SW5wdXQgPyB0aGlzLl9yZW5kZXJJbnB1dCgndmFsdWUxJykgOiBudWxsfVxuICAgICAgICA8L1NsaWRlcldyYXBwZXI+XG4gICAgICAgIHtpc1JhbmdlZCAmJiBzaG93SW5wdXQgPyA8UmFuZ2VJbnB1dFdyYXBwZXIgY2xhc3NOYW1lPVwicmFuZ2Utc2xpZGVyX19pbnB1dC1ncm91cFwiPlxuICAgICAgICAgIHt0aGlzLl9yZW5kZXJJbnB1dCgndmFsdWUwJyl9XG4gICAgICAgICAge3RoaXMuX3JlbmRlcklucHV0KCd2YWx1ZTEnKX1cbiAgICAgICAgPC9SYW5nZUlucHV0V3JhcHBlcj4gOiBudWxsfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcbiJdfQ==