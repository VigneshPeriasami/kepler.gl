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
var Legend =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Legend, _Component);

  function Legend() {
    (0, _classCallCheck2.default)(this, Legend);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Legend).apply(this, arguments));
  }

  (0, _createClass2.default)(Legend, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_base.default, this.props, _react.default.createElement("path", {
        d: "M29.78,45.89v5.56H46.44V45.89Zm-11.11,0v5.56h5.56V45.89ZM29.78,34.78v5.56H46.44V34.78Zm-11.11,0v5.56h5.56V34.78ZM29.78,23.67v5.56H46.44V23.67Zm-11.11,0v5.56h5.56V23.67ZM29.78,12.56v5.56H46.44V12.56Zm-11.11,0v5.56h5.56V12.56ZM15.89,7H49.22A2.78,2.78,0,0,1,52,9.78V54.22A2.78,2.78,0,0,1,49.22,57H15.89a2.78,2.78,0,0,1-2.78-2.78V9.78A2.78,2.78,0,0,1,15.89,7Z"
      }));
    }
  }]);
  return Legend;
}(_react.Component);

exports.default = Legend;
(0, _defineProperty2.default)(Legend, "propTypes", {
  /** Set the height of the icon, ex. '16px' */
  height: _propTypes.default.string
});
(0, _defineProperty2.default)(Legend, "defaultProps", {
  height: '16px',
  predefinedClassName: 'data-ex-icons-legend'
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9pY29ucy9sZWdlbmQuanMiXSwibmFtZXMiOlsiTGVnZW5kIiwicHJvcHMiLCJDb21wb25lbnQiLCJoZWlnaHQiLCJQcm9wVHlwZXMiLCJzdHJpbmciLCJwcmVkZWZpbmVkQ2xhc3NOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUF0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7SUFNcUJBLE07Ozs7Ozs7Ozs7Ozs2QkFXVjtBQUNQLGFBQ0UsNkJBQUMsYUFBRCxFQUFVLEtBQUtDLEtBQWYsRUFDRTtBQUFNLFFBQUEsQ0FBQyxFQUFDO0FBQVIsUUFERixDQURGO0FBS0Q7OztFQWpCaUNDLGdCOzs7OEJBQWZGLE0sZUFDQTtBQUNqQjtBQUNBRyxFQUFBQSxNQUFNLEVBQUVDLG1CQUFVQztBQUZELEM7OEJBREFMLE0sa0JBTUc7QUFDcEJHLEVBQUFBLE1BQU0sRUFBRSxNQURZO0FBRXBCRyxFQUFBQSxtQkFBbUIsRUFBRTtBQUZELEM7QUFZdkIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQmFzZSBmcm9tICcuL2Jhc2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMZWdlbmQgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIC8qKiBTZXQgdGhlIGhlaWdodCBvZiB0aGUgaWNvbiwgZXguICcxNnB4JyAqL1xuICAgIGhlaWdodDogUHJvcFR5cGVzLnN0cmluZ1xuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgaGVpZ2h0OiAnMTZweCcsXG4gICAgcHJlZGVmaW5lZENsYXNzTmFtZTogJ2RhdGEtZXgtaWNvbnMtbGVnZW5kJ1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEJhc2Ugey4uLnRoaXMucHJvcHN9PlxuICAgICAgICA8cGF0aCBkPVwiTTI5Ljc4LDQ1Ljg5djUuNTZINDYuNDRWNDUuODlabS0xMS4xMSwwdjUuNTZoNS41NlY0NS44OVpNMjkuNzgsMzQuNzh2NS41Nkg0Ni40NFYzNC43OFptLTExLjExLDB2NS41Nmg1LjU2VjM0Ljc4Wk0yOS43OCwyMy42N3Y1LjU2SDQ2LjQ0VjIzLjY3Wm0tMTEuMTEsMHY1LjU2aDUuNTZWMjMuNjdaTTI5Ljc4LDEyLjU2djUuNTZINDYuNDRWMTIuNTZabS0xMS4xMSwwdjUuNTZoNS41NlYxMi41NlpNMTUuODksN0g0OS4yMkEyLjc4LDIuNzgsMCwwLDEsNTIsOS43OFY1NC4yMkEyLjc4LDIuNzgsMCwwLDEsNDkuMjIsNTdIMTUuODlhMi43OCwyLjc4LDAsMCwxLTIuNzgtMi43OFY5Ljc4QTIuNzgsMi43OCwwLDAsMSwxNS44OSw3WlwiIC8+XG4gICAgICA8L0Jhc2U+XG4gICAgKTtcbiAgfVxufTtcbiJdfQ==