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
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n  z-index: 10;\n  display: ", ";\n  margin-top: -4px;\n  height: ", ";\n  width: ", ";\n  box-shadow: ", ";\n  background-color: ", ";\n  border-width: 1px;\n  border-style: solid;\n  border-color: ", ";\n\n  :hover {\n    background-color: ", ";\n    cursor: pointer;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var StyledSliderHandle = _styledComponents.default.span(_templateObject(), function (props) {
  return props.hidden ? 'none' : 'block';
}, function (props) {
  return Number.isFinite(props.sliderHandleWidth) ? "".concat(props.sliderHandleWidth, "px") : props.theme.sliderHandleHeight;
}, function (props) {
  return Number.isFinite(props.sliderHandleWidth) ? "".concat(props.sliderHandleWidth, "px") : props.theme.sliderHandleHeight;
}, function (props) {
  return props.theme.sliderHandleShadow;
}, function (props) {
  return props.theme.sliderHandleColor;
}, function (props) {
  return props.active ? props.theme.selectBorderColor : props.theme.sliderHandleColor;
}, function (props) {
  return props.theme.sliderHandleHoverColor;
});
/**
 *
 * props:
 *  width : default 23
 *  height : default 23
 *  display
 *  left
 *  onMove
 *  valueListener
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

      _this.props.valueListener(e.movementX);
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

      _this.props.valueListener(deltaX);
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
      return _react.default.createElement(StyledSliderHandle, {
        className: (0, _classnames.default)('kg-range-slider__handle', {
          'kg-range-slider__handle--active': this.state.mouseOver
        }),
        sliderHandleWidth: this.props.sliderHandleWidth,
        active: this.state.mouseOver,
        hidden: !this.props.display,
        style: {
          left: this.props.left
        },
        onMouseDown: this.handleMouseDown,
        onTouchStart: this.handleTouchStart
      });
    }
  }]);
  return SliderHandle;
}(_react.Component);

exports.default = SliderHandle;
(0, _defineProperty2.default)(SliderHandle, "propTypes", {
  width: _propTypes.default.number,
  height: _propTypes.default.number,
  left: _propTypes.default.string,
  display: _propTypes.default.bool,
  valueListener: _propTypes.default.func
});
(0, _defineProperty2.default)(SliderHandle, "defaultProps", {
  left: '50%',
  display: true,
  valueListener: function valueListenerFn() {}
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9zbGlkZXIvc2xpZGVyLWhhbmRsZS5qcyJdLCJuYW1lcyI6WyJTdHlsZWRTbGlkZXJIYW5kbGUiLCJzdHlsZWQiLCJzcGFuIiwicHJvcHMiLCJoaWRkZW4iLCJOdW1iZXIiLCJpc0Zpbml0ZSIsInNsaWRlckhhbmRsZVdpZHRoIiwidGhlbWUiLCJzbGlkZXJIYW5kbGVIZWlnaHQiLCJzbGlkZXJIYW5kbGVTaGFkb3ciLCJzbGlkZXJIYW5kbGVDb2xvciIsImFjdGl2ZSIsInNlbGVjdEJvcmRlckNvbG9yIiwic2xpZGVySGFuZGxlSG92ZXJDb2xvciIsIlNsaWRlckhhbmRsZSIsIm1vdXNlT3ZlciIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsIm1vdXNldXAiLCJtb3VzZW1vdmUiLCJzZXRTdGF0ZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJ2YWx1ZUxpc3RlbmVyIiwibW92ZW1lbnRYIiwidG91Y2hlbmQiLCJ0b3VjaG1vdmUiLCJwcmV2WCIsInRvdWNoZXMiLCJjbGllbnRYIiwiZGVsdGFYIiwic3RhdGUiLCJkaXNwbGF5IiwibGVmdCIsImhhbmRsZU1vdXNlRG93biIsImhhbmRsZVRvdWNoU3RhcnQiLCJDb21wb25lbnQiLCJ3aWR0aCIsIlByb3BUeXBlcyIsIm51bWJlciIsImhlaWdodCIsInN0cmluZyIsImJvb2wiLCJmdW5jIiwidmFsdWVMaXN0ZW5lckZuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGtCQUFrQixHQUFHQywwQkFBT0MsSUFBVixvQkFHWCxVQUFBQyxLQUFLO0FBQUEsU0FBS0EsS0FBSyxDQUFDQyxNQUFOLEdBQWUsTUFBZixHQUF3QixPQUE3QjtBQUFBLENBSE0sRUFLWixVQUFBRCxLQUFLO0FBQUEs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QVcseUJBQVgsRUFBc0M7QUFDL0MsNkNBQW1DLEtBQUtpQixLQUFMLENBQVdqQjtBQURDLFNBQXRDLENBRGI7QUFJRSxRQUFBLGlCQUFpQixFQUFFLEtBQUtiLEtBQUwsQ0FBV0ksaUJBSmhDO0FBS0UsUUFBQSxNQUFNLEVBQUUsS0FBSzBCLEtBQUwsQ0FBV2pCLFNBTHJCO0FBTUUsUUFBQSxNQUFNLEVBQUUsQ0FBQyxLQUFLYixLQUFMLENBQVcrQixPQU50QjtBQU9FLFFBQUEsS0FBSyxFQUFFO0FBQUNDLFVBQUFBLElBQUksRUFBRSxLQUFLaEMsS0FBTCxDQUFXZ0M7QUFBbEIsU0FQVDtBQVFFLFFBQUEsV0FBVyxFQUFFLEtBQUtDLGVBUnBCO0FBU0UsUUFBQSxZQUFZLEVBQUUsS0FBS0M7QUFUckIsUUFERjtBQWFEOzs7RUFwRXVDQyxnQjs7OzhCQUFyQnZCLFksZUFDQTtBQUNqQndCLEVBQUFBLEtBQUssRUFBRUMsbUJBQVVDLE1BREE7QUFFakJDLEVBQUFBLE1BQU0sRUFBRUYsbUJBQVVDLE1BRkQ7QUFHakJOLEVBQUFBLElBQUksRUFBRUssbUJBQVVHLE1BSEM7QUFJakJULEVBQUFBLE9BQU8sRUFBRU0sbUJBQVVJLElBSkY7QUFLakJuQixFQUFBQSxhQUFhLEVBQUVlLG1CQUFVSztBQUxSLEM7OEJBREE5QixZLGtCQVNHO0FBQ3BCb0IsRUFBQUEsSUFBSSxFQUFFLEtBRGM7QUFFcEJELEVBQUFBLE9BQU8sRUFBRSxJQUZXO0FBR3BCVCxFQUFBQSxhQUFhLEVBQUUsU0FBU3FCLGVBQVQsR0FBMkIsQ0FBRTtBQUh4QixDO0FBNER2QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBkb2N1bWVudCBmcm9tICdnbG9iYWwvZG9jdW1lbnQnO1xuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuY29uc3QgU3R5bGVkU2xpZGVySGFuZGxlID0gc3R5bGVkLnNwYW5gXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgei1pbmRleDogMTA7XG4gIGRpc3BsYXk6ICR7cHJvcHMgPT4gKHByb3BzLmhpZGRlbiA/ICdub25lJyA6ICdibG9jaycpfTtcbiAgbWFyZ2luLXRvcDogLTRweDtcbiAgaGVpZ2h0OiAke3Byb3BzID0+XG4gICAgTnVtYmVyLmlzRmluaXRlKHByb3BzLnNsaWRlckhhbmRsZVdpZHRoKVxuICAgICAgPyBgJHtwcm9wcy5zbGlkZXJIYW5kbGVXaWR0aH1weGBcbiAgICAgIDogcHJvcHMudGhlbWUuc2xpZGVySGFuZGxlSGVpZ2h0fTtcbiAgd2lkdGg6ICR7cHJvcHMgPT5cbiAgICBOdW1iZXIuaXNGaW5pdGUocHJvcHMuc2xpZGVySGFuZGxlV2lkdGgpXG4gICAgICA/IGAke3Byb3BzLnNsaWRlckhhbmRsZVdpZHRofXB4YFxuICAgICAgOiBwcm9wcy50aGVtZS5zbGlkZXJIYW5kbGVIZWlnaHR9O1xuICBib3gtc2hhZG93OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNsaWRlckhhbmRsZVNoYWRvd307XG4gIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2xpZGVySGFuZGxlQ29sb3J9O1xuICBib3JkZXItd2lkdGg6IDFweDtcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgYm9yZGVyLWNvbG9yOiAke3Byb3BzID0+XG4gICAgcHJvcHMuYWN0aXZlXG4gICAgICA/IHByb3BzLnRoZW1lLnNlbGVjdEJvcmRlckNvbG9yXG4gICAgICA6IHByb3BzLnRoZW1lLnNsaWRlckhhbmRsZUNvbG9yfTtcblxuICA6aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2xpZGVySGFuZGxlSG92ZXJDb2xvcn07XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICB9XG5gO1xuXG4vKipcbiAqXG4gKiBwcm9wczpcbiAqICB3aWR0aCA6IGRlZmF1bHQgMjNcbiAqICBoZWlnaHQgOiBkZWZhdWx0IDIzXG4gKiAgZGlzcGxheVxuICogIGxlZnRcbiAqICBvbk1vdmVcbiAqICB2YWx1ZUxpc3RlbmVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlckhhbmRsZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgd2lkdGg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgaGVpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGxlZnQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGlzcGxheTogUHJvcFR5cGVzLmJvb2wsXG4gICAgdmFsdWVMaXN0ZW5lcjogUHJvcFR5cGVzLmZ1bmNcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGxlZnQ6ICc1MCUnLFxuICAgIGRpc3BsYXk6IHRydWUsXG4gICAgdmFsdWVMaXN0ZW5lcjogZnVuY3Rpb24gdmFsdWVMaXN0ZW5lckZuKCkge31cbiAgfTtcblxuICBzdGF0ZSA9IHttb3VzZU92ZXI6IGZhbHNlfTtcbiAgcHJldlggPSAwO1xuXG4gIGhhbmRsZU1vdXNlRG93biA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tb3VzZXVwKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlbW92ZSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7bW91c2VPdmVyOiB0cnVlfSk7XG4gIH07XG5cbiAgbW91c2V1cCA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tb3VzZXVwKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlbW92ZSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7bW91c2VPdmVyOiBmYWxzZX0pO1xuICB9O1xuXG4gIG1vdXNlbW92ZSA9IGUgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnByb3BzLnZhbHVlTGlzdGVuZXIoZS5tb3ZlbWVudFgpO1xuICB9O1xuXG4gIGhhbmRsZVRvdWNoU3RhcnQgPSBlID0+IHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMudG91Y2hlbmQpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMudG91Y2htb3ZlKTtcbiAgICB0aGlzLnByZXZYID0gZS50b3VjaGVzWzBdLmNsaWVudFg7XG4gICAgdGhpcy5zZXRTdGF0ZSh7bW91c2VPdmVyOiB0cnVlfSk7XG4gIH07XG5cbiAgdG91Y2htb3ZlID0gZSA9PiB7XG4gICAgY29uc3QgZGVsdGFYID0gZS50b3VjaGVzWzBdLmNsaWVudFggLSB0aGlzLnByZXZYO1xuICAgIHRoaXMucHJldlggPSBlLnRvdWNoZXNbMF0uY2xpZW50WDtcbiAgICB0aGlzLnByb3BzLnZhbHVlTGlzdGVuZXIoZGVsdGFYKTtcbiAgfTtcblxuICB0b3VjaGVuZCA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMudG91Y2hlbmQpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMudG91Y2htb3ZlKTtcbiAgICB0aGlzLnNldFN0YXRlKHttb3VzZU92ZXI6IGZhbHNlfSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8U3R5bGVkU2xpZGVySGFuZGxlXG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcygna2ctcmFuZ2Utc2xpZGVyX19oYW5kbGUnLCB7XG4gICAgICAgICAgJ2tnLXJhbmdlLXNsaWRlcl9faGFuZGxlLS1hY3RpdmUnOiB0aGlzLnN0YXRlLm1vdXNlT3ZlclxuICAgICAgICB9KX1cbiAgICAgICAgc2xpZGVySGFuZGxlV2lkdGg9e3RoaXMucHJvcHMuc2xpZGVySGFuZGxlV2lkdGh9XG4gICAgICAgIGFjdGl2ZT17dGhpcy5zdGF0ZS5tb3VzZU92ZXJ9XG4gICAgICAgIGhpZGRlbj17IXRoaXMucHJvcHMuZGlzcGxheX1cbiAgICAgICAgc3R5bGU9e3tsZWZ0OiB0aGlzLnByb3BzLmxlZnR9fVxuICAgICAgICBvbk1vdXNlRG93bj17dGhpcy5oYW5kbGVNb3VzZURvd259XG4gICAgICAgIG9uVG91Y2hTdGFydD17dGhpcy5oYW5kbGVUb3VjaFN0YXJ0fVxuICAgICAgLz5cbiAgICApO1xuICB9XG59O1xuIl19