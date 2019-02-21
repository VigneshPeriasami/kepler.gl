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

var _classnames = _interopRequireDefault(require("classnames"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _sliderHandle = _interopRequireDefault(require("./slider-handle"));

var _sliderBarHandle = _interopRequireDefault(require("./slider-bar-handle"));

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  flex-grow: 1;\n  margin-top: ", "px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n  margin-bottom: 12px;\n  background-color: ", ";\n  height: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function noop() {}

var StyledRangeSlider = _styledComponents.default.div(_templateObject(), function (props) {
  return props.theme.sliderBarBgd;
}, function (props) {
  return props.theme.sliderBarHeight;
});

var SliderWrapper = _styledComponents.default.div(_templateObject2(), function (props) {
  return props.isRanged ? 0 : 10;
});

var Slider =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Slider, _Component);

  function Slider() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Slider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Slider)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "ref", undefined);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_saveRef", function (ref) {
      _this.ref = ref;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "slide0Listener", function (x) {
      var xPercent = x / _this.ref.offsetWidth;
      var maxDelta = _this.props.maxValue - _this.props.minValue;
      var val = xPercent * maxDelta;

      _this.props.onSlider0Change.call((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), val + _this.props.value0);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "slide1Listener", function (x) {
      var xPercent = x / _this.ref.offsetWidth;
      var maxDelta = _this.props.maxValue - _this.props.minValue;
      var val = xPercent * maxDelta;

      _this.props.onSlider1Change(val + _this.props.value1);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "sliderBarListener", function (x) {
      var xPercent = x / _this.ref.offsetWidth;
      var maxDelta = _this.props.maxValue - _this.props.minValue;
      var val = xPercent * maxDelta;
      var val0 = val + _this.props.value0;
      var val1 = val + _this.props.value1;

      _this.props.onSliderBarChange(val0, val1);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "calcHandleLeft0", function (w, l, num) {
      return w === 0 ? "calc(".concat(l, "% - ").concat(_this.props.sliderHandleWidth / 2, "px)") : "calc(".concat(l, "% - ").concat(_this.props.sliderHandleWidth / 2, "px)");
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "calcHandleLeft1", function (w, l) {
      return _this.props.isRanged && w === 0 ? "".concat(l, "%") : "calc(".concat(l + w, "% - ").concat(_this.props.sliderHandleWidth / 2, "px)");
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "createSlider", function (width, v0Left) {
      return _react.default.createElement("div", null, _react.default.createElement(StyledRangeSlider, {
        className: "kg-range-slider"
      }, _react.default.createElement(_sliderHandle.default, {
        className: "kg-range-slider__handle",
        left: _this.calcHandleLeft0(width, v0Left),
        valueListener: _this.slide0Listener,
        sliderHandleWidth: _this.props.sliderHandleWidth,
        display: _this.props.isRanged
      }), _react.default.createElement(_sliderHandle.default, {
        className: "kg-range-slider__handle",
        left: _this.calcHandleLeft1(width, v0Left),
        valueListener: _this.slide1Listener,
        sliderHandleWidth: _this.props.sliderHandleWidth
      }), _react.default.createElement(_sliderBarHandle.default, {
        width: width,
        v0Left: v0Left,
        enableBarDrag: _this.props.enableBarDrag,
        sliderBarListener: _this.sliderBarListener
      })));
    });
    return _this;
  }

  (0, _createClass2.default)(Slider, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          classSet = _this$props.classSet,
          isRanged = _this$props.isRanged,
          maxValue = _this$props.maxValue,
          minValue = _this$props.minValue,
          value1 = _this$props.value1;
      var value0 = !isRanged && minValue > 0 ? minValue : this.props.value0;
      var currValDelta = value1 - value0;
      var maxDelta = maxValue - minValue;
      var width = currValDelta / maxDelta * 100;
      var v0Left = (value0 - minValue) / maxDelta * 100;
      return _react.default.createElement(SliderWrapper, {
        className: (0, _classnames.default)('kg-slider', (0, _objectSpread2.default)({}, classSet)),
        ref: this._saveRef,
        isRanged: isRanged
      }, this.createSlider(width, v0Left));
    }
  }]);
  return Slider;
}(_react.Component);

exports.default = Slider;
(0, _defineProperty2.default)(Slider, "propTypes", {
  title: _propTypes.default.string,
  isRanged: _propTypes.default.bool,
  value0: _propTypes.default.number,
  value1: _propTypes.default.number,
  minValue: _propTypes.default.number,
  maxValue: _propTypes.default.number,
  sliderHandleWidth: _propTypes.default.number,
  onSlider0Change: _propTypes.default.func,
  onInput0Change: _propTypes.default.func,
  onSlider1Change: _propTypes.default.func,
  onInput1Change: _propTypes.default.func,
  onSliderBarChange: _propTypes.default.func,
  step: _propTypes.default.number,
  enableBarDrag: _propTypes.default.bool
});
(0, _defineProperty2.default)(Slider, "defaultProps", {
  title: '',
  isRanged: true,
  value0: 0,
  value1: 100,
  minValue: 0,
  maxValue: 100,
  step: 1,
  sliderHandleWidth: 12,
  enableBarDrag: false,
  onSlider0Change: noop,
  onInput0Change: noop,
  onSlider1Change: noop,
  onInput1Change: noop,
  onSliderBarChange: noop,
  disabled: false
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9zbGlkZXIvc2xpZGVyLmpzIl0sIm5hbWVzIjpbIm5vb3AiLCJTdHlsZWRSYW5nZVNsaWRlciIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJzbGlkZXJCYXJCZ2QiLCJzbGlkZXJCYXJIZWlnaHQiLCJTbGlkZXJXcmFwcGVyIiwiaXNSYW5nZWQiLCJTbGlkZXIiLCJ1bmRlZmluZWQiLCJyZWYiLCJ4IiwieFBlcmNlbnQiLCJvZmZzZXRXaWR0aCIsIm1heERlbHRhIiwibWF4VmFsdWUiLCJtaW5WYWx1ZSIsInZhbCIsIm9uU2xpZGVyMENoYW5nZSIsImNhbGwiLCJ2YWx1ZTAiLCJvblNsaWRlcjFDaGFuZ2UiLCJ2YWx1ZTEiLCJ2YWwwIiwidmFsMSIsIm9uU2xpZGVyQmFyQ2hhbmdlIiwidyIsImwiLCJudW0iLCJzbGlkZXJIYW5kbGVXaWR0aCIsIndpZHRoIiwidjBMZWZ0IiwiY2FsY0hhbmRsZUxlZnQwIiwic2xpZGUwTGlzdGVuZXIiLCJjYWxjSGFuZGxlTGVmdDEiLCJzbGlkZTFMaXN0ZW5lciIsImVuYWJsZUJhckRyYWciLCJzbGlkZXJCYXJMaXN0ZW5lciIsImNsYXNzU2V0IiwiY3VyclZhbERlbHRhIiwiX3NhdmVSZWYiLCJjcmVhdGVTbGlkZXIiLCJDb21wb25lbnQiLCJ0aXRsZSIsIlByb3BUeXBlcyIsInN0cmluZyIsImJvb2wiLCJudW1iZXIiLCJmdW5jIiwib25JbnB1dDBDaGFuZ2UiLCJvbklucHV0MUNoYW5nZSIsInN0ZXAiLCJkaXNhYmxlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxTQUFTQSxJQUFULEdBQWdCLENBQUU7O0FBRWxCLElBQU1DLGlCQUFpQixHQUFHQywwQkFBT0MsR0FBVixvQkFHRCxVQUFBQyxLQUFL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QUFHcEJhLEVBQUFBLE1BQU0sRUFBRSxDQUhZO0FBSXBCRSxFQUFBQSxNQUFNLEVBQUUsR0FKWTtBQUtwQk4sRUFBQUEsUUFBUSxFQUFFLENBTFU7QUFNcEJELEVBQUFBLFFBQVEsRUFBRSxHQU5VO0FBT3BCb0MsRUFBQUEsSUFBSSxFQUFFLENBUGM7QUFRcEJ0QixFQUFBQSxpQkFBaUIsRUFBRSxFQVJDO0FBU3BCTyxFQUFBQSxhQUFhLEVBQUUsS0FUSztBQVVwQmxCLEVBQUFBLGVBQWUsRUFBRXBCLElBVkc7QUFXcEJtRCxFQUFBQSxjQUFjLEVBQUVuRCxJQVhJO0FBWXBCdUIsRUFBQUEsZUFBZSxFQUFFdkIsSUFaRztBQWFwQm9ELEVBQUFBLGNBQWMsRUFBRXBELElBYkk7QUFjcEIyQixFQUFBQSxpQkFBaUIsRUFBRTNCLElBZEM7QUFlcEJzRCxFQUFBQSxRQUFRLEVBQUU7QUFmVSxDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IFNsaWRlckhhbmRsZSBmcm9tICcuL3NsaWRlci1oYW5kbGUnO1xuaW1wb3J0IFNsaWRlckJhckhhbmRsZSBmcm9tICcuL3NsaWRlci1iYXItaGFuZGxlJztcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbmNvbnN0IFN0eWxlZFJhbmdlU2xpZGVyID0gc3R5bGVkLmRpdmBcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNsaWRlckJhckJnZH07XG4gIGhlaWdodDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zbGlkZXJCYXJIZWlnaHR9O1xuYDtcblxuY29uc3QgU2xpZGVyV3JhcHBlciA9IHN0eWxlZC5kaXZgXG4gIGZsZXgtZ3JvdzogMTtcbiAgbWFyZ2luLXRvcDogJHtwcm9wcyA9PiBwcm9wcy5pc1JhbmdlZCA/IDAgOiAxMH1weDtcbmA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlciBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaXNSYW5nZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHZhbHVlMDogUHJvcFR5cGVzLm51bWJlcixcbiAgICB2YWx1ZTE6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbWluVmFsdWU6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbWF4VmFsdWU6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgc2xpZGVySGFuZGxlV2lkdGg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgb25TbGlkZXIwQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbklucHV0MENoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TbGlkZXIxQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbklucHV0MUNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TbGlkZXJCYXJDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIHN0ZXA6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgZW5hYmxlQmFyRHJhZzogUHJvcFR5cGVzLmJvb2xcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHRpdGxlOiAnJyxcbiAgICBpc1JhbmdlZDogdHJ1ZSxcbiAgICB2YWx1ZTA6IDAsXG4gICAgdmFsdWUxOiAxMDAsXG4gICAgbWluVmFsdWU6IDAsXG4gICAgbWF4VmFsdWU6IDEwMCxcbiAgICBzdGVwOiAxLFxuICAgIHNsaWRlckhhbmRsZVdpZHRoOiAxMixcbiAgICBlbmFibGVCYXJEcmFnOiBmYWxzZSxcbiAgICBvblNsaWRlcjBDaGFuZ2U6IG5vb3AsXG4gICAgb25JbnB1dDBDaGFuZ2U6IG5vb3AsXG4gICAgb25TbGlkZXIxQ2hhbmdlOiBub29wLFxuICAgIG9uSW5wdXQxQ2hhbmdlOiBub29wLFxuICAgIG9uU2xpZGVyQmFyQ2hhbmdlOiBub29wLFxuICAgIGRpc2FibGVkOiBmYWxzZVxuICB9O1xuXG4gIHJlZiA9IHVuZGVmaW5lZDtcblxuICBfc2F2ZVJlZiA9IHJlZiA9PiB7XG4gICAgdGhpcy5yZWYgPSByZWY7XG4gIH07XG5cbiAgc2xpZGUwTGlzdGVuZXIgPSB4ID0+IHtcbiAgICBjb25zdCB4UGVyY2VudCA9IHggLyB0aGlzLnJlZi5vZmZzZXRXaWR0aDtcbiAgICBjb25zdCBtYXhEZWx0YSA9IHRoaXMucHJvcHMubWF4VmFsdWUgLSB0aGlzLnByb3BzLm1pblZhbHVlO1xuICAgIGNvbnN0IHZhbCA9IHhQZXJjZW50ICogbWF4RGVsdGE7XG4gICAgdGhpcy5wcm9wcy5vblNsaWRlcjBDaGFuZ2UuY2FsbCh0aGlzLCB2YWwgKyB0aGlzLnByb3BzLnZhbHVlMCk7XG4gIH07XG5cbiAgc2xpZGUxTGlzdGVuZXIgPSB4ID0+IHtcbiAgICBjb25zdCB4UGVyY2VudCA9IHggLyB0aGlzLnJlZi5vZmZzZXRXaWR0aDtcbiAgICBjb25zdCBtYXhEZWx0YSA9IHRoaXMucHJvcHMubWF4VmFsdWUgLSB0aGlzLnByb3BzLm1pblZhbHVlO1xuICAgIGNvbnN0IHZhbCA9IHhQZXJjZW50ICogbWF4RGVsdGE7XG4gICAgdGhpcy5wcm9wcy5vblNsaWRlcjFDaGFuZ2UodmFsICsgdGhpcy5wcm9wcy52YWx1ZTEpO1xuICB9O1xuXG4gIHNsaWRlckJhckxpc3RlbmVyID0geCA9PiB7XG4gICAgY29uc3QgeFBlcmNlbnQgPSB4IC8gdGhpcy5yZWYub2Zmc2V0V2lkdGg7XG4gICAgY29uc3QgbWF4RGVsdGEgPSB0aGlzLnByb3BzLm1heFZhbHVlIC0gdGhpcy5wcm9wcy5taW5WYWx1ZTtcbiAgICBjb25zdCB2YWwgPSB4UGVyY2VudCAqIG1heERlbHRhO1xuICAgIGNvbnN0IHZhbDAgPSB2YWwgKyB0aGlzLnByb3BzLnZhbHVlMDtcbiAgICBjb25zdCB2YWwxID0gdmFsICsgdGhpcy5wcm9wcy52YWx1ZTE7XG4gICAgdGhpcy5wcm9wcy5vblNsaWRlckJhckNoYW5nZSh2YWwwLCB2YWwxKTtcbiAgfTtcblxuICBjYWxjSGFuZGxlTGVmdDAgPSAodywgbCwgbnVtKSA9PiB7XG4gICAgcmV0dXJuIHcgPT09IDAgPyBgY2FsYygke2x9JSAtICR7dGhpcy5wcm9wcy5zbGlkZXJIYW5kbGVXaWR0aCAvIDJ9cHgpYCA6XG4gICAgICBgY2FsYygke2x9JSAtICR7dGhpcy5wcm9wcy5zbGlkZXJIYW5kbGVXaWR0aCAvIDJ9cHgpYDtcbiAgfTtcblxuICBjYWxjSGFuZGxlTGVmdDEgPSAodywgbCkgPT4ge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmlzUmFuZ2VkICYmIHcgPT09IDBcbiAgICAgID8gYCR7bH0lYFxuICAgICAgOiBgY2FsYygke2wgKyB3fSUgLSAke3RoaXMucHJvcHMuc2xpZGVySGFuZGxlV2lkdGggLyAyfXB4KWA7XG4gIH07XG5cbiAgY3JlYXRlU2xpZGVyID0gKHdpZHRoLCB2MExlZnQpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPFN0eWxlZFJhbmdlU2xpZGVyIGNsYXNzTmFtZT1cImtnLXJhbmdlLXNsaWRlclwiPlxuICAgICAgICAgIDxTbGlkZXJIYW5kbGVcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImtnLXJhbmdlLXNsaWRlcl9faGFuZGxlXCJcbiAgICAgICAgICAgIGxlZnQ9e3RoaXMuY2FsY0hhbmRsZUxlZnQwKHdpZHRoLCB2MExlZnQpfVxuICAgICAgICAgICAgdmFsdWVMaXN0ZW5lcj17dGhpcy5zbGlkZTBMaXN0ZW5lcn1cbiAgICAgICAgICAgIHNsaWRlckhhbmRsZVdpZHRoPXt0aGlzLnByb3BzLnNsaWRlckhhbmRsZVdpZHRofVxuICAgICAgICAgICAgZGlzcGxheT17dGhpcy5wcm9wcy5pc1JhbmdlZH1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxTbGlkZXJIYW5kbGVcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImtnLXJhbmdlLXNsaWRlcl9faGFuZGxlXCJcbiAgICAgICAgICAgIGxlZnQ9e3RoaXMuY2FsY0hhbmRsZUxlZnQxKHdpZHRoLCB2MExlZnQpfVxuICAgICAgICAgICAgdmFsdWVMaXN0ZW5lcj17dGhpcy5zbGlkZTFMaXN0ZW5lcn1cbiAgICAgICAgICAgIHNsaWRlckhhbmRsZVdpZHRoPXt0aGlzLnByb3BzLnNsaWRlckhhbmRsZVdpZHRofVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPFNsaWRlckJhckhhbmRsZVxuICAgICAgICAgICAgd2lkdGg9e3dpZHRofVxuICAgICAgICAgICAgdjBMZWZ0PXt2MExlZnR9XG4gICAgICAgICAgICBlbmFibGVCYXJEcmFnPXt0aGlzLnByb3BzLmVuYWJsZUJhckRyYWd9XG4gICAgICAgICAgICBzbGlkZXJCYXJMaXN0ZW5lcj17dGhpcy5zbGlkZXJCYXJMaXN0ZW5lcn1cbiAgICAgICAgICAvPlxuICAgICAgICA8L1N0eWxlZFJhbmdlU2xpZGVyPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgY2xhc3NTZXQsXG4gICAgICBpc1JhbmdlZCxcbiAgICAgIG1heFZhbHVlLFxuICAgICAgbWluVmFsdWUsXG4gICAgICB2YWx1ZTFcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB2YWx1ZTAgPSAhaXNSYW5nZWQgJiYgbWluVmFsdWUgPiAwID8gbWluVmFsdWUgOiB0aGlzLnByb3BzLnZhbHVlMDtcbiAgICBjb25zdCBjdXJyVmFsRGVsdGEgPSB2YWx1ZTEgLSB2YWx1ZTA7XG4gICAgY29uc3QgbWF4RGVsdGEgPSBtYXhWYWx1ZSAtIG1pblZhbHVlO1xuICAgIGNvbnN0IHdpZHRoID0gY3VyclZhbERlbHRhIC8gbWF4RGVsdGEgKiAxMDA7XG5cbiAgICBjb25zdCB2MExlZnQgPSAodmFsdWUwIC0gbWluVmFsdWUpIC8gbWF4RGVsdGEgKiAxMDA7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFNsaWRlcldyYXBwZXJcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCdrZy1zbGlkZXInLCB7Li4uY2xhc3NTZXR9KX1cbiAgICAgICAgcmVmPXt0aGlzLl9zYXZlUmVmfVxuICAgICAgICBpc1JhbmdlZD17aXNSYW5nZWR9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLmNyZWF0ZVNsaWRlcih3aWR0aCwgdjBMZWZ0KX1cbiAgICAgIDwvU2xpZGVyV3JhcHBlcj5cbiAgICApO1xuICB9XG59XG4iXX0=