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

var _document = _interopRequireDefault(require("global/document"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n  background-color: ", ";\n  height: ", ";\n  border-radius: ", ";\n\n  :hover {\n    cursor: pointer;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var StyledSlider = _styledComponents.default.div(_templateObject(), function (props) {
  return props.active ? props.theme.sliderBarHoverColor : props.theme.sliderBarColor;
}, function (props) {
  return props.theme.sliderBarHeight;
}, function (props) {
  return props.theme.sliderBarRadius;
});
/**
 *
 * props:
 *  width : default 23
 *  height : default 23
 *  left
 *  onMove
 *  sliderBarListener
 */


var SliderHandle =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(SliderHandle, _Component);

  function SliderHandle() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, SliderHandle);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(SliderHandle)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      mouseOver: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "prevX", 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleMouseDown", function () {
      _document.default.addEventListener('mouseup', _this.mouseup);

      _document.default.addEventListener('mousemove', _this.mousemove);

      _this.setState({
        mouseOver: true
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "mouseup", function () {
      _document.default.removeEventListener('mouseup', _this.mouseup);

      _document.default.removeEventListener('mousemove', _this.mousemove);

      _this.setState({
        mouseOver: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "mousemove", function (e) {
      e.preventDefault();

      _this.props.sliderBarListener(e.movementX);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleTouchStart", function (e) {
      _document.default.addEventListener('touchend', _this.touchend);

      _document.default.addEventListener('touchmove', _this.touchmove);

      _this.prevX = e.touches[0].clientX;

      _this.setState({
        mouseOver: true
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "touchmove", function (e) {
      var deltaX = e.touches[0].clientX - _this.prevX;
      _this.prevX = e.touches[0].clientX;

      _this.props.sliderBarListener(deltaX);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "touchend", function () {
      _document.default.removeEventListener('touchend', _this.touchend);

      _document.default.removeEventListener('touchmove', _this.touchmove);

      _this.setState({
        mouseOver: false
      });
    });
    return _this;
  }

  (0, _createClass2.default)(SliderHandle, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(StyledSlider, {
        active: this.state.mouseOver,
        className: (0, _classnames.default)('kg-range-slider__bar', {
          'kg-range-slider__bar--active': this.state.mouseOver
        }),
        style: {
          width: "".concat(this.props.width, "%"),
          left: "".concat(this.props.v0Left, "%")
        },
        onMouseDown: this.props.enableBarDrag && this.handleMouseDown,
        onTouchStart: this.props.enableBarDrag && this.handleTouchStart
      });
    }
  }]);
  return SliderHandle;
}(_react.Component);

exports.default = SliderHandle;
(0, _defineProperty2.default)(SliderHandle, "propTypes", {
  width: _propTypes.default.number,
  left: _propTypes.default.string,
  sliderBarListener: _propTypes.default.func,
  enableBarDrag: _propTypes.default.bool
});
(0, _defineProperty2.default)(SliderHandle, "defaultProps", {
  sliderBarListener: function sliderBarListenerTn() {},
  enableBarDrag: false
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9zbGlkZXIvc2xpZGVyLWJhci1oYW5kbGUuanMiXSwibmFtZXMiOlsiU3R5bGVkU2xpZGVyIiwic3R5bGVkIiwiZGl2IiwicHJvcHMiLCJhY3RpdmUiLCJ0aGVtZSIsInNsaWRlckJhckhvdmVyQ29sb3IiLCJzbGlkZXJCYXJDb2xvciIsInNsaWRlckJhckhlaWdodCIsInNsaWRlckJhclJhZGl1cyIsIlNsaWRlckhhbmRsZSIsIm1vdXNlT3ZlciIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsIm1vdXNldXAiLCJtb3VzZW1vdmUiLCJzZXRTdGF0ZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJzbGlkZXJCYXJMaXN0ZW5lciIsIm1vdmVtZW50WCIsInRvdWNoZW5kIiwidG91Y2htb3ZlIiwicHJldlgiLCJ0b3VjaGVzIiwiY2xpZW50WCIsImRlbHRhWCIsInN0YXRlIiwid2lkdGgiLCJsZWZ0IiwidjBMZWZ0IiwiZW5hYmxlQmFyRHJhZyIsImhhbmRsZU1vdXNlRG93biIsImhhbmRsZVRvdWNoU3RhcnQiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJudW1iZXIiLCJzdHJpbmciLCJmdW5jIiwiYm9vbCIsInNsaWRlckJhckxpc3RlbmVyVG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsWUFBWSxHQUFHQywwQkFBT0MsR0FBVixvQkFFSSxVQUFBQyxLQUFLO0FBQUEsU0FDdkJBLEtBQUssQ0FBQ0MsTUFBTixHQUNJRCxLQUFLLENBQUNFLEtBQU4sQ0FBWUMsbUJBRGhCLEdBRUlILEtBQUssQ0FBQ0UsS0FBTixDQUFZRSxjQUhPO0FBQUEsQ0FGVCxFQU1OLFVBQUFKLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNFLEtBQU4sQ0FB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QkFBaUIsRUFBRWdCLG1CQUFVRyxJQUhaO0FBSWpCUCxFQUFBQSxhQUFhLEVBQUVJLG1CQUFVSTtBQUpSLEM7OEJBREE5QixZLGtCQVFHO0FBQ3BCVSxFQUFBQSxpQkFBaUIsRUFBRSxTQUFTcUIsbUJBQVQsR0FBK0IsQ0FBRSxDQURoQztBQUVwQlQsRUFBQUEsYUFBYSxFQUFFO0FBRkssQztBQTREdkIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgZG9jdW1lbnQgZnJvbSAnZ2xvYmFsL2RvY3VtZW50JztcbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmNvbnN0IFN0eWxlZFNsaWRlciA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PlxuICAgIHByb3BzLmFjdGl2ZVxuICAgICAgPyBwcm9wcy50aGVtZS5zbGlkZXJCYXJIb3ZlckNvbG9yXG4gICAgICA6IHByb3BzLnRoZW1lLnNsaWRlckJhckNvbG9yfTtcbiAgaGVpZ2h0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNsaWRlckJhckhlaWdodH07XG4gIGJvcmRlci1yYWRpdXM6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2xpZGVyQmFyUmFkaXVzfTtcblxuICA6aG92ZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxuYDtcbi8qKlxuICpcbiAqIHByb3BzOlxuICogIHdpZHRoIDogZGVmYXVsdCAyM1xuICogIGhlaWdodCA6IGRlZmF1bHQgMjNcbiAqICBsZWZ0XG4gKiAgb25Nb3ZlXG4gKiAgc2xpZGVyQmFyTGlzdGVuZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2xpZGVySGFuZGxlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICB3aWR0aDogUHJvcFR5cGVzLm51bWJlcixcbiAgICBsZWZ0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNsaWRlckJhckxpc3RlbmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBlbmFibGVCYXJEcmFnOiBQcm9wVHlwZXMuYm9vbFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgc2xpZGVyQmFyTGlzdGVuZXI6IGZ1bmN0aW9uIHNsaWRlckJhckxpc3RlbmVyVG4oKSB7fSxcbiAgICBlbmFibGVCYXJEcmFnOiBmYWxzZVxuICB9O1xuXG4gIHN0YXRlID0ge21vdXNlT3ZlcjogZmFsc2V9O1xuICBwcmV2WCA9IDA7XG5cbiAgaGFuZGxlTW91c2VEb3duID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm1vdXNldXApO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW91c2Vtb3ZlKTtcbiAgICB0aGlzLnNldFN0YXRlKHttb3VzZU92ZXI6IHRydWV9KTtcbiAgfTtcblxuICBtb3VzZXVwID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm1vdXNldXApO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW91c2Vtb3ZlKTtcbiAgICB0aGlzLnNldFN0YXRlKHttb3VzZU92ZXI6IGZhbHNlfSk7XG4gIH07XG5cbiAgbW91c2Vtb3ZlID0gZSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMucHJvcHMuc2xpZGVyQmFyTGlzdGVuZXIoZS5tb3ZlbWVudFgpO1xuICB9O1xuXG4gIGhhbmRsZVRvdWNoU3RhcnQgPSBlID0+IHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMudG91Y2hlbmQpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMudG91Y2htb3ZlKTtcbiAgICB0aGlzLnByZXZYID0gZS50b3VjaGVzWzBdLmNsaWVudFg7XG4gICAgdGhpcy5zZXRTdGF0ZSh7bW91c2VPdmVyOiB0cnVlfSk7XG4gIH07XG5cbiAgdG91Y2htb3ZlID0gZSA9PiB7XG4gICAgY29uc3QgZGVsdGFYID0gZS50b3VjaGVzWzBdLmNsaWVudFggLSB0aGlzLnByZXZYO1xuICAgIHRoaXMucHJldlggPSBlLnRvdWNoZXNbMF0uY2xpZW50WDtcbiAgICB0aGlzLnByb3BzLnNsaWRlckJhckxpc3RlbmVyKGRlbHRhWCk7XG4gIH07XG5cbiAgdG91Y2hlbmQgPSAoKSA9PiB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnRvdWNoZW5kKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLnRvdWNobW92ZSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7bW91c2VPdmVyOiBmYWxzZX0pO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPFN0eWxlZFNsaWRlclxuICAgICAgICBhY3RpdmU9e3RoaXMuc3RhdGUubW91c2VPdmVyfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ2tnLXJhbmdlLXNsaWRlcl9fYmFyJywge1xuICAgICAgICAgICdrZy1yYW5nZS1zbGlkZXJfX2Jhci0tYWN0aXZlJzogdGhpcy5zdGF0ZS5tb3VzZU92ZXJcbiAgICAgICAgfSl9XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgd2lkdGg6IGAke3RoaXMucHJvcHMud2lkdGh9JWAsXG4gICAgICAgICAgbGVmdDogYCR7dGhpcy5wcm9wcy52MExlZnR9JWBcbiAgICAgICAgfX1cbiAgICAgICAgb25Nb3VzZURvd249e3RoaXMucHJvcHMuZW5hYmxlQmFyRHJhZyAmJiB0aGlzLmhhbmRsZU1vdXNlRG93bn1cbiAgICAgICAgb25Ub3VjaFN0YXJ0PXt0aGlzLnByb3BzLmVuYWJsZUJhckRyYWcgJiYgdGhpcy5oYW5kbGVUb3VjaFN0YXJ0fVxuICAgICAgLz5cbiAgICApO1xuICB9XG59O1xuIl19