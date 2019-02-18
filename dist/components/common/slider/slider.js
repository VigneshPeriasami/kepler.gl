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
        innerRef: this._saveRef,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9zbGlkZXIvc2xpZGVyLmpzIl0sIm5hbWVzIjpbIm5vb3AiLCJTdHlsZWRSYW5nZVNsaWRlciIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJzbGlkZXJCYXJCZ2QiLCJzbGlkZXJCYXJIZWlnaHQiLCJTbGlkZXJXcmFwcGVyIiwiaXNSYW5nZWQiLCJTbGlkZXIiLCJ1bmRlZmluZWQiLCJyZWYiLCJ4IiwieFBlcmNlbnQiLCJvZmZzZXRXaWR0aCIsIm1heERlbHRhIiwibWF4VmFsdWUiLCJtaW5WYWx1ZSIsInZhbCIsIm9uU2xpZGVyMENoYW5nZSIsImNhbGwiLCJ2YWx1ZTAiLCJvblNsaWRlcjFDaGFuZ2UiLCJ2YWx1ZTEiLCJ2YWwwIiwidmFsMSIsIm9uU2xpZGVyQmFyQ2hhbmdlIiwidyIsImwiLCJudW0iLCJzbGlkZXJIYW5kbGVXaWR0aCIsIndpZHRoIiwidjBMZWZ0IiwiY2FsY0hhbmRsZUxlZnQwIiwic2xpZGUwTGlzdGVuZXIiLCJjYWxjSGFuZGxlTGVmdDEiLCJzbGlkZTFMaXN0ZW5lciIsImVuYWJsZUJhckRyYWciLCJzbGlkZXJCYXJMaXN0ZW5lciIsImNsYXNzU2V0IiwiY3VyclZhbERlbHRhIiwiX3NhdmVSZWYiLCJjcmVhdGVTbGlkZXIiLCJDb21wb25lbnQiLCJ0aXRsZSIsIlByb3BUeXBlcyIsInN0cmluZyIsImJvb2wiLCJudW1iZXIiLCJmdW5jIiwib25JbnB1dDBDaGFuZ2UiLCJvbklucHV0MUNoYW5nZSIsInN0ZXAiLCJkaXNhYmxlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxTQUFTQSxJQUFULEdBQWdCLENBQUU7O0FBRWxCLElBQU1DLGlCQUFpQixHQUFHQywwQkFBT0MsR0FBVixvQkFHRCxVQUFBQyxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlDLFlBQWhCO0FBQUEsQ0FISixFQUlYLFVBQUFGLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUUsZUFBaEI7QUFBQSxDQUpNLENBQXZCOztBQU9BLElBQU1DLGFBQWEsR0FBR04sMEJBQU9DLEdBQVYscUJBRUgsVUFBQUMsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0ssUUFBTixHQUFpQixDQUFqQixHQUFxQixFQUF6QjtBQUFBLENBRkYsQ0FBbkI7O0lBS3FCQyxNOzs7Ozs7Ozs7Ozs7Ozs7Ozs0SEFvQ2JDLFM7aUlBRUssVUFBQUMsR0FBRyxFQUFJO0FBQ2hCLFlBQUtBLEdBQUwsR0FBV0EsR0FBWDtBQUNELEs7dUlBRWdCLFVBQUFDLENBQUMsRUFBSTtBQUNwQixVQUFNQyxRQUFRLEdBQUdELENBQUMsR0FBRyxNQUFLRCxHQUFMLENBQVNHLFdBQTlCO0FBQ0EsVUFBTUMsUUFBUSxHQUFHLE1BQUtaLEtBQUwsQ0FBV2EsUUFBWCxHQUFzQixNQUFLYixLQUFMLENBQVdjLFFBQWxEO0FBQ0EsVUFBTUMsR0FBRyxHQUFHTCxRQUFRLEdBQUdFLFFBQXZCOztBQUNBLFlBQUtaLEtBQUwsQ0FBV2dCLGVBQVgsQ0FBMkJDLElBQTNCLG9GQUFzQ0YsR0FBRyxHQUFHLE1BQUtmLEtBQUwsQ0FBV2tCLE1BQXZEO0FBQ0QsSzt1SUFFZ0IsVUFBQVQsQ0FBQyxFQUFJO0FBQ3BCLFVBQU1DLFFBQVEsR0FBR0QsQ0FBQyxHQUFHLE1BQUtELEdBQUwsQ0FBU0csV0FBOUI7QUFDQSxVQUFNQyxRQUFRLEdBQUcsTUFBS1osS0FBTCxDQUFXYSxRQUFYLEdBQXNCLE1BQUtiLEtBQUwsQ0FBV2MsUUFBbEQ7QUFDQSxVQUFNQyxHQUFHLEdBQUdMLFFBQVEsR0FBR0UsUUFBdkI7O0FBQ0EsWUFBS1osS0FBTCxDQUFXbUIsZUFBWCxDQUEyQkosR0FBRyxHQUFHLE1BQUtmLEtBQUwsQ0FBV29CLE1BQTVDO0FBQ0QsSzswSUFFbUIsVUFBQVgsQ0FBQyxFQUFJO0FBQ3ZCLFVBQU1DLFFBQVEsR0FBR0QsQ0FBQyxHQUFHLE1BQUtELEdBQUwsQ0FBU0csV0FBOUI7QUFDQSxVQUFNQyxRQUFRLEdBQUcsTUFBS1osS0FBTCxDQUFXYSxRQUFYLEdBQXNCLE1BQUtiLEtBQUwsQ0FBV2MsUUFBbEQ7QUFDQSxVQUFNQyxHQUFHLEdBQUdMLFFBQVEsR0FBR0UsUUFBdkI7QUFDQSxVQUFNUyxJQUFJLEdBQUdOLEdBQUcsR0FBRyxNQUFLZixLQUFMLENBQVdrQixNQUE5QjtBQUNBLFVBQU1JLElBQUksR0FBR1AsR0FBRyxHQUFHLE1BQUtmLEtBQUwsQ0FBV29CLE1BQTlCOztBQUNBLFlBQUtwQixLQUFMLENBQVd1QixpQkFBWCxDQUE2QkYsSUFBN0IsRUFBbUNDLElBQW5DO0FBQ0QsSzt3SUFFaUIsVUFBQ0UsQ0FBRCxFQUFJQyxDQUFKLEVBQU9DLEdBQVAsRUFBZTtBQUMvQixhQUFPRixDQUFDLEtBQUssQ0FBTixrQkFBa0JDLENBQWxCLGlCQUEwQixNQUFLekIsS0FBTCxDQUFXMkIsaUJBQVgsR0FBK0IsQ0FBekQsMEJBQ0dGLENBREgsaUJBQ1csTUFBS3pCLEtBQUwsQ0FBVzJCLGlCQUFYLEdBQStCLENBRDFDLFFBQVA7QUFFRCxLO3dJQUVpQixVQUFDSCxDQUFELEVBQUlDLENBQUosRUFBVTtBQUMxQixhQUFPLE1BQUt6QixLQUFMLENBQVdLLFFBQVgsSUFBdUJtQixDQUFDLEtBQUssQ0FBN0IsYUFDQUMsQ0FEQSx3QkFFS0EsQ0FBQyxHQUFHRCxDQUZULGlCQUVpQixNQUFLeEIsS0FBTCxDQUFXMkIsaUJBQVgsR0FBK0IsQ0FGaEQsUUFBUDtBQUdELEs7cUlBRWMsVUFBQ0MsS0FBRCxFQUFRQyxNQUFSLEVBQW1CO0FBQ2hDLGFBQ0UsMENBQ0UsNkJBQUMsaUJBQUQ7QUFBbUIsUUFBQSxTQUFTLEVBQUM7QUFBN0IsU0FDRSw2QkFBQyxxQkFBRDtBQUNFLFFBQUEsU0FBUyxFQUFDLHlCQURaO0FBRUUsUUFBQSxJQUFJLEVBQUUsTUFBS0MsZUFBTCxDQUFxQkYsS0FBckIsRUFBNEJDLE1BQTVCLENBRlI7QUFHRSxRQUFBLGFBQWEsRUFBRSxNQUFLRSxjQUh0QjtBQUlFLFFBQUEsaUJBQWlCLEVBQUUsTUFBSy9CLEtBQUwsQ0FBVzJCLGlCQUpoQztBQUtFLFFBQUEsT0FBTyxFQUFFLE1BQUszQixLQUFMLENBQVdLO0FBTHRCLFFBREYsRUFRRSw2QkFBQyxxQkFBRDtBQUNFLFFBQUEsU0FBUyxFQUFDLHlCQURaO0FBRUUsUUFBQSxJQUFJLEVBQUUsTUFBSzJCLGVBQUwsQ0FBcUJKLEtBQXJCLEVBQTRCQyxNQUE1QixDQUZSO0FBR0UsUUFBQSxhQUFhLEVBQUUsTUFBS0ksY0FIdEI7QUFJRSxRQUFBLGlCQUFpQixFQUFFLE1BQUtqQyxLQUFMLENBQVcyQjtBQUpoQyxRQVJGLEVBY0UsNkJBQUMsd0JBQUQ7QUFDRSxRQUFBLEtBQUssRUFBRUMsS0FEVDtBQUVFLFFBQUEsTUFBTSxFQUFFQyxNQUZWO0FBR0UsUUFBQSxhQUFhLEVBQUUsTUFBSzdCLEtBQUwsQ0FBV2tDLGFBSDVCO0FBSUUsUUFBQSxpQkFBaUIsRUFBRSxNQUFLQztBQUoxQixRQWRGLENBREYsQ0FERjtBQXlCRCxLOzs7Ozs7NkJBRVE7QUFBQSx3QkFPSCxLQUFLbkMsS0FQRjtBQUFBLFVBRUxvQyxRQUZLLGVBRUxBLFFBRks7QUFBQSxVQUdML0IsUUFISyxlQUdMQSxRQUhLO0FBQUEsVUFJTFEsUUFKSyxlQUlMQSxRQUpLO0FBQUEsVUFLTEMsUUFMSyxlQUtMQSxRQUxLO0FBQUEsVUFNTE0sTUFOSyxlQU1MQSxNQU5LO0FBUVAsVUFBTUYsTUFBTSxHQUFHLENBQUNiLFFBQUQsSUFBYVMsUUFBUSxHQUFHLENBQXhCLEdBQTRCQSxRQUE1QixHQUF1QyxLQUFLZCxLQUFMLENBQVdrQixNQUFqRTtBQUNBLFVBQU1tQixZQUFZLEdBQUdqQixNQUFNLEdBQUdGLE1BQTlCO0FBQ0EsVUFBTU4sUUFBUSxHQUFHQyxRQUFRLEdBQUdDLFFBQTVCO0FBQ0EsVUFBTWMsS0FBSyxHQUFHUyxZQUFZLEdBQUd6QixRQUFmLEdBQTBCLEdBQXhDO0FBRUEsVUFBTWlCLE1BQU0sR0FBRyxDQUFDWCxNQUFNLEdBQUdKLFFBQVYsSUFBc0JGLFFBQXRCLEdBQWlDLEdBQWhEO0FBRUEsYUFDRSw2QkFBQyxhQUFEO0FBQ0UsUUFBQSxTQUFTLEVBQUUseUJBQVcsV0FBWCxrQ0FBNEJ3QixRQUE1QixFQURiO0FBRUUsUUFBQSxRQUFRLEVBQUUsS0FBS0UsUUFGakI7QUFHRSxRQUFBLFFBQVEsRUFBRWpDO0FBSFosU0FLRyxLQUFLa0MsWUFBTCxDQUFrQlgsS0FBbEIsRUFBeUJDLE1BQXpCLENBTEgsQ0FERjtBQVNEOzs7RUFoSWlDVyxnQjs7OzhCQUFmbEMsTSxlQUNBO0FBQ2pCbUMsRUFBQUEsS0FBSyxFQUFFQyxtQkFBVUMsTUFEQTtBQUVqQnRDLEVBQUFBLFFBQVEsRUFBRXFDLG1CQUFVRSxJQUZIO0FBR2pCMUIsRUFBQUEsTUFBTSxFQUFFd0IsbUJBQVVHLE1BSEQ7QUFJakJ6QixFQUFBQSxNQUFNLEVBQUVzQixtQkFBVUcsTUFKRDtBQUtqQi9CLEVBQUFBLFFBQVEsRUFBRTRCLG1CQUFVRyxNQUxIO0FBTWpCaEMsRUFBQUEsUUFBUSxFQUFFNkIsbUJBQVVHLE1BTkg7QUFPakJsQixFQUFBQSxpQkFBaUIsRUFBRWUsbUJBQVVHLE1BUFo7QUFRakI3QixFQUFBQSxlQUFlLEVBQUUwQixtQkFBVUksSUFSVjtBQVNqQkMsRUFBQUEsY0FBYyxFQUFFTCxtQkFBVUksSUFUVDtBQVVqQjNCLEVBQUFBLGVBQWUsRUFBRXVCLG1CQUFVSSxJQVZWO0FBV2pCRSxFQUFBQSxjQUFjLEVBQUVOLG1CQUFVSSxJQVhUO0FBWWpCdkIsRUFBQUEsaUJBQWlCLEVBQUVtQixtQkFBVUksSUFaWjtBQWFqQkcsRUFBQUEsSUFBSSxFQUFFUCxtQkFBVUcsTUFiQztBQWNqQlgsRUFBQUEsYUFBYSxFQUFFUSxtQkFBVUU7QUFkUixDOzhCQURBdEMsTSxrQkFrQkc7QUFDcEJtQyxFQUFBQSxLQUFLLEVBQUUsRUFEYTtBQUVwQnBDLEVBQUFBLFFBQVEsRUFBRSxJQUZVO0FBR3BCYSxFQUFBQSxNQUFNLEVBQUUsQ0FIWTtBQUlwQkUsRUFBQUEsTUFBTSxFQUFFLEdBSlk7QUFLcEJOLEVBQUFBLFFBQVEsRUFBRSxDQUxVO0FBTXBCRCxFQUFBQSxRQUFRLEVBQUUsR0FOVTtBQU9wQm9DLEVBQUFBLElBQUksRUFBRSxDQVBjO0FBUXBCdEIsRUFBQUEsaUJBQWlCLEVBQUUsRUFSQztBQVNwQk8sRUFBQUEsYUFBYSxFQUFFLEtBVEs7QUFVcEJsQixFQUFBQSxlQUFlLEVBQUVwQixJQVZHO0FBV3BCbUQsRUFBQUEsY0FBYyxFQUFFbkQsSUFYSTtBQVlwQnVCLEVBQUFBLGVBQWUsRUFBRXZCLElBWkc7QUFhcEJvRCxFQUFBQSxjQUFjLEVBQUVwRCxJQWJJO0FBY3BCMkIsRUFBQUEsaUJBQWlCLEVBQUUzQixJQWRDO0FBZXBCc0QsRUFBQUEsUUFBUSxFQUFFO0FBZlUsQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCBTbGlkZXJIYW5kbGUgZnJvbSAnLi9zbGlkZXItaGFuZGxlJztcbmltcG9ydCBTbGlkZXJCYXJIYW5kbGUgZnJvbSAnLi9zbGlkZXItYmFyLWhhbmRsZSc7XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5jb25zdCBTdHlsZWRSYW5nZVNsaWRlciA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zbGlkZXJCYXJCZ2R9O1xuICBoZWlnaHQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2xpZGVyQmFySGVpZ2h0fTtcbmA7XG5cbmNvbnN0IFNsaWRlcldyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBmbGV4LWdyb3c6IDE7XG4gIG1hcmdpbi10b3A6ICR7cHJvcHMgPT4gcHJvcHMuaXNSYW5nZWQgPyAwIDogMTB9cHg7XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGlkZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGlzUmFuZ2VkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB2YWx1ZTA6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgdmFsdWUxOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG1pblZhbHVlOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG1heFZhbHVlOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHNsaWRlckhhbmRsZVdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG9uU2xpZGVyMENoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25JbnB1dDBDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2xpZGVyMUNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25JbnB1dDFDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2xpZGVyQmFyQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzdGVwOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGVuYWJsZUJhckRyYWc6IFByb3BUeXBlcy5ib29sXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICB0aXRsZTogJycsXG4gICAgaXNSYW5nZWQ6IHRydWUsXG4gICAgdmFsdWUwOiAwLFxuICAgIHZhbHVlMTogMTAwLFxuICAgIG1pblZhbHVlOiAwLFxuICAgIG1heFZhbHVlOiAxMDAsXG4gICAgc3RlcDogMSxcbiAgICBzbGlkZXJIYW5kbGVXaWR0aDogMTIsXG4gICAgZW5hYmxlQmFyRHJhZzogZmFsc2UsXG4gICAgb25TbGlkZXIwQ2hhbmdlOiBub29wLFxuICAgIG9uSW5wdXQwQ2hhbmdlOiBub29wLFxuICAgIG9uU2xpZGVyMUNoYW5nZTogbm9vcCxcbiAgICBvbklucHV0MUNoYW5nZTogbm9vcCxcbiAgICBvblNsaWRlckJhckNoYW5nZTogbm9vcCxcbiAgICBkaXNhYmxlZDogZmFsc2VcbiAgfTtcblxuICByZWYgPSB1bmRlZmluZWQ7XG5cbiAgX3NhdmVSZWYgPSByZWYgPT4ge1xuICAgIHRoaXMucmVmID0gcmVmO1xuICB9O1xuXG4gIHNsaWRlMExpc3RlbmVyID0geCA9PiB7XG4gICAgY29uc3QgeFBlcmNlbnQgPSB4IC8gdGhpcy5yZWYub2Zmc2V0V2lkdGg7XG4gICAgY29uc3QgbWF4RGVsdGEgPSB0aGlzLnByb3BzLm1heFZhbHVlIC0gdGhpcy5wcm9wcy5taW5WYWx1ZTtcbiAgICBjb25zdCB2YWwgPSB4UGVyY2VudCAqIG1heERlbHRhO1xuICAgIHRoaXMucHJvcHMub25TbGlkZXIwQ2hhbmdlLmNhbGwodGhpcywgdmFsICsgdGhpcy5wcm9wcy52YWx1ZTApO1xuICB9O1xuXG4gIHNsaWRlMUxpc3RlbmVyID0geCA9PiB7XG4gICAgY29uc3QgeFBlcmNlbnQgPSB4IC8gdGhpcy5yZWYub2Zmc2V0V2lkdGg7XG4gICAgY29uc3QgbWF4RGVsdGEgPSB0aGlzLnByb3BzLm1heFZhbHVlIC0gdGhpcy5wcm9wcy5taW5WYWx1ZTtcbiAgICBjb25zdCB2YWwgPSB4UGVyY2VudCAqIG1heERlbHRhO1xuICAgIHRoaXMucHJvcHMub25TbGlkZXIxQ2hhbmdlKHZhbCArIHRoaXMucHJvcHMudmFsdWUxKTtcbiAgfTtcblxuICBzbGlkZXJCYXJMaXN0ZW5lciA9IHggPT4ge1xuICAgIGNvbnN0IHhQZXJjZW50ID0geCAvIHRoaXMucmVmLm9mZnNldFdpZHRoO1xuICAgIGNvbnN0IG1heERlbHRhID0gdGhpcy5wcm9wcy5tYXhWYWx1ZSAtIHRoaXMucHJvcHMubWluVmFsdWU7XG4gICAgY29uc3QgdmFsID0geFBlcmNlbnQgKiBtYXhEZWx0YTtcbiAgICBjb25zdCB2YWwwID0gdmFsICsgdGhpcy5wcm9wcy52YWx1ZTA7XG4gICAgY29uc3QgdmFsMSA9IHZhbCArIHRoaXMucHJvcHMudmFsdWUxO1xuICAgIHRoaXMucHJvcHMub25TbGlkZXJCYXJDaGFuZ2UodmFsMCwgdmFsMSk7XG4gIH07XG5cbiAgY2FsY0hhbmRsZUxlZnQwID0gKHcsIGwsIG51bSkgPT4ge1xuICAgIHJldHVybiB3ID09PSAwID8gYGNhbGMoJHtsfSUgLSAke3RoaXMucHJvcHMuc2xpZGVySGFuZGxlV2lkdGggLyAyfXB4KWAgOlxuICAgICAgYGNhbGMoJHtsfSUgLSAke3RoaXMucHJvcHMuc2xpZGVySGFuZGxlV2lkdGggLyAyfXB4KWA7XG4gIH07XG5cbiAgY2FsY0hhbmRsZUxlZnQxID0gKHcsIGwpID0+IHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5pc1JhbmdlZCAmJiB3ID09PSAwXG4gICAgICA/IGAke2x9JWBcbiAgICAgIDogYGNhbGMoJHtsICsgd30lIC0gJHt0aGlzLnByb3BzLnNsaWRlckhhbmRsZVdpZHRoIC8gMn1weClgO1xuICB9O1xuXG4gIGNyZWF0ZVNsaWRlciA9ICh3aWR0aCwgdjBMZWZ0KSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxTdHlsZWRSYW5nZVNsaWRlciBjbGFzc05hbWU9XCJrZy1yYW5nZS1zbGlkZXJcIj5cbiAgICAgICAgICA8U2xpZGVySGFuZGxlXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJrZy1yYW5nZS1zbGlkZXJfX2hhbmRsZVwiXG4gICAgICAgICAgICBsZWZ0PXt0aGlzLmNhbGNIYW5kbGVMZWZ0MCh3aWR0aCwgdjBMZWZ0KX1cbiAgICAgICAgICAgIHZhbHVlTGlzdGVuZXI9e3RoaXMuc2xpZGUwTGlzdGVuZXJ9XG4gICAgICAgICAgICBzbGlkZXJIYW5kbGVXaWR0aD17dGhpcy5wcm9wcy5zbGlkZXJIYW5kbGVXaWR0aH1cbiAgICAgICAgICAgIGRpc3BsYXk9e3RoaXMucHJvcHMuaXNSYW5nZWR9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8U2xpZGVySGFuZGxlXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJrZy1yYW5nZS1zbGlkZXJfX2hhbmRsZVwiXG4gICAgICAgICAgICBsZWZ0PXt0aGlzLmNhbGNIYW5kbGVMZWZ0MSh3aWR0aCwgdjBMZWZ0KX1cbiAgICAgICAgICAgIHZhbHVlTGlzdGVuZXI9e3RoaXMuc2xpZGUxTGlzdGVuZXJ9XG4gICAgICAgICAgICBzbGlkZXJIYW5kbGVXaWR0aD17dGhpcy5wcm9wcy5zbGlkZXJIYW5kbGVXaWR0aH1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxTbGlkZXJCYXJIYW5kbGVcbiAgICAgICAgICAgIHdpZHRoPXt3aWR0aH1cbiAgICAgICAgICAgIHYwTGVmdD17djBMZWZ0fVxuICAgICAgICAgICAgZW5hYmxlQmFyRHJhZz17dGhpcy5wcm9wcy5lbmFibGVCYXJEcmFnfVxuICAgICAgICAgICAgc2xpZGVyQmFyTGlzdGVuZXI9e3RoaXMuc2xpZGVyQmFyTGlzdGVuZXJ9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9TdHlsZWRSYW5nZVNsaWRlcj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNsYXNzU2V0LFxuICAgICAgaXNSYW5nZWQsXG4gICAgICBtYXhWYWx1ZSxcbiAgICAgIG1pblZhbHVlLFxuICAgICAgdmFsdWUxXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgdmFsdWUwID0gIWlzUmFuZ2VkICYmIG1pblZhbHVlID4gMCA/IG1pblZhbHVlIDogdGhpcy5wcm9wcy52YWx1ZTA7XG4gICAgY29uc3QgY3VyclZhbERlbHRhID0gdmFsdWUxIC0gdmFsdWUwO1xuICAgIGNvbnN0IG1heERlbHRhID0gbWF4VmFsdWUgLSBtaW5WYWx1ZTtcbiAgICBjb25zdCB3aWR0aCA9IGN1cnJWYWxEZWx0YSAvIG1heERlbHRhICogMTAwO1xuXG4gICAgY29uc3QgdjBMZWZ0ID0gKHZhbHVlMCAtIG1pblZhbHVlKSAvIG1heERlbHRhICogMTAwO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxTbGlkZXJXcmFwcGVyXG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcygna2ctc2xpZGVyJywgey4uLmNsYXNzU2V0fSl9XG4gICAgICAgIGlubmVyUmVmPXt0aGlzLl9zYXZlUmVmfVxuICAgICAgICBpc1JhbmdlZD17aXNSYW5nZWR9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLmNyZWF0ZVNsaWRlcih3aWR0aCwgdjBMZWZ0KX1cbiAgICAgIDwvU2xpZGVyV3JhcHBlcj5cbiAgICApO1xuICB9XG59XG4iXX0=