"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _base = _interopRequireDefault(require("./base"));

// Copyright (c) 2019 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
var Info =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Info, _Component);

  function Info() {
    (0, _classCallCheck2.default)(this, Info);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Info).apply(this, arguments));
  }

  (0, _createClass2.default)(Info, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_base.default, (0, _extends2.default)({
        viewBox: "0 0 64 64"
      }, this.props), _react.default.createElement("circle", {
        cx: "25",
        cy: "25",
        fill: "none",
        r: "24",
        stroke: this.props.stroke,
        strokeLinecap: "round",
        strokeMiterlimit: "10",
        strokeWidth: "2"
      }), _react.default.createElement("path", {
        d: "M23.779,16.241c-0.216,0-0.357-0.144-0.357-0.359v-2.618c0-0.215,0.142-0.359,0.357-0.359h2.439  c0.215,0,0.359,0.144,0.359,0.359v2.618c0,0.215-0.145,0.359-0.359,0.359H23.779z M23.852,37.293c-0.215,0-0.358-0.143-0.358-0.358  V20.473c0-0.215,0.144-0.359,0.358-0.359h2.295c0.216,0,0.359,0.144,0.359,0.359v16.462c0,0.216-0.144,0.358-0.359,0.358H23.852z"
      }));
    }
  }]);
  return Info;
}(_react.Component);

exports.default = Info;
(0, _defineProperty2.default)(Info, "propTypes", {
  /** Set the height of the icon, ex. '16px' */
  height: _propTypes.default.string
});
(0, _defineProperty2.default)(Info, "defaultProps", {
  height: '16px',
  predefinedClassName: 'data-ex-icons-info',
  stroke: '#FFF'
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9pY29ucy9pbmZvLmpzIl0sIm5hbWVzIjpbIkluZm8iLCJwcm9wcyIsInN0cm9rZSIsIkNvbXBvbmVudCIsImhlaWdodCIsIlByb3BUeXBlcyIsInN0cmluZyIsInByZWRlZmluZWRDbGFzc05hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0lBTXFCQSxJOzs7Ozs7Ozs7Ozs7NkJBWVY7QUFDUCxhQUNFLDZCQUFDLGFBQUQ7QUFBTSxRQUFBLE9BQU8sRUFBQztBQUFkLFNBQThCLEtBQUtDLEtBQW5DLEdBQ0U7QUFBUSxRQUFBLEVBQUUsRUFBQyxJQUFYO0FBQWdCLFFBQUEsRUFBRSxFQUFDLElBQW5CO0FBQXdCLFFBQUEsSUFBSSxFQUFDLE1BQTdCO0FBQW9DLFFBQUEsQ0FBQyxFQUFDLElBQXRDO0FBQTJDLFFBQUEsTUFBTSxFQUFFLEtBQUtBLEtBQUwsQ0FBV0MsTUFBOUQ7QUFBc0UsUUFBQSxhQUFhLEVBQUMsT0FBcEY7QUFBNEYsUUFBQSxnQkFBZ0IsRUFBQyxJQUE3RztBQUFrSCxRQUFBLFdBQVcsRUFBQztBQUE5SCxRQURGLEVBRUU7QUFBTSxRQUFBLENBQUMsRUFBQztBQUFSLFFBRkYsQ0FERjtBQU1EOzs7RUFuQitCQyxnQjs7OzhCQUFiSCxJLGVBQ0E7QUFDakI7QUFDQUksRUFBQUEsTUFBTSxFQUFFQyxtQkFBVUM7QUFGRCxDOzhCQURBTixJLGtCQU1HO0FBQ3BCSSxFQUFBQSxNQUFNLEVBQUUsTUFEWTtBQUVwQkcsRUFBQUEsbUJBQW1CLEVBQUUsb0JBRkQ7QUFHcEJMLEVBQUFBLE1BQU0sRUFBRTtBQUhZLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQmFzZSBmcm9tICcuL2Jhc2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmZvIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAvKiogU2V0IHRoZSBoZWlnaHQgb2YgdGhlIGljb24sIGV4LiAnMTZweCcgKi9cbiAgICBoZWlnaHQ6IFByb3BUeXBlcy5zdHJpbmdcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGhlaWdodDogJzE2cHgnLFxuICAgIHByZWRlZmluZWRDbGFzc05hbWU6ICdkYXRhLWV4LWljb25zLWluZm8nLFxuICAgIHN0cm9rZTogJyNGRkYnXG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8QmFzZSB2aWV3Qm94PVwiMCAwIDY0IDY0XCIgey4uLnRoaXMucHJvcHN9PlxuICAgICAgICA8Y2lyY2xlIGN4PVwiMjVcIiBjeT1cIjI1XCIgZmlsbD1cIm5vbmVcIiByPVwiMjRcIiBzdHJva2U9e3RoaXMucHJvcHMuc3Ryb2tlfSBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VNaXRlcmxpbWl0PVwiMTBcIiBzdHJva2VXaWR0aD1cIjJcIi8+XG4gICAgICAgIDxwYXRoIGQ9XCJNMjMuNzc5LDE2LjI0MWMtMC4yMTYsMC0wLjM1Ny0wLjE0NC0wLjM1Ny0wLjM1OXYtMi42MThjMC0wLjIxNSwwLjE0Mi0wLjM1OSwwLjM1Ny0wLjM1OWgyLjQzOSAgYzAuMjE1LDAsMC4zNTksMC4xNDQsMC4zNTksMC4zNTl2Mi42MThjMCwwLjIxNS0wLjE0NSwwLjM1OS0wLjM1OSwwLjM1OUgyMy43Nzl6IE0yMy44NTIsMzcuMjkzYy0wLjIxNSwwLTAuMzU4LTAuMTQzLTAuMzU4LTAuMzU4ICBWMjAuNDczYzAtMC4yMTUsMC4xNDQtMC4zNTksMC4zNTgtMC4zNTloMi4yOTVjMC4yMTYsMCwwLjM1OSwwLjE0NCwwLjM1OSwwLjM1OXYxNi40NjJjMCwwLjIxNi0wLjE0NCwwLjM1OC0wLjM1OSwwLjM1OEgyMy44NTJ6XCIvPlxuICAgICAgPC9CYXNlPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==