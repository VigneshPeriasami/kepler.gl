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
var Trash =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Trash, _Component);

  function Trash() {
    (0, _classCallCheck2.default)(this, Trash);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Trash).apply(this, arguments));
  }

  (0, _createClass2.default)(Trash, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_base.default, this.props, _react.default.createElement("path", {
        d: "M51.4,13.9v1.6c0,0.9-0.7,1.6-1.6,1.6H13.6c-0.9,0-1.6-0.7-1.6-1.6v-1.6c0-0.9,0.7-1.6,1.6-1.6h9 c0.9,0,1.6-0.7,1.6-1.6C24.3,9.7,25.1,9,26,9h11.5c0.9,0,1.6,0.7,1.6,1.6c0,0.9,0.7,1.6,1.6,1.6h9C50.7,12.3,51.4,13,51.4,13.9z"
      }), _react.default.createElement("path", {
        d: "M40.8,50.1l0.8-25.4h-3.3l-0.8,25.4H40.8z M30.1,50.1h3.3V24.7h-3.3V50.1z M26,50.1l-0.8-25.4h-3.3l0.8,25.4H26 z M44.9,55H18.5c-0.9,0-1.6-0.7-1.6-1.6l-1.5-31.2c0-0.9,0.7-1.7,1.6-1.7h29.4c0.9,0,1.7,0.8,1.6,1.7l-1.5,31.2 C46.5,54.3,45.8,55,44.9,55z"
      }));
    }
  }]);
  return Trash;
}(_react.Component);

exports.default = Trash;
(0, _defineProperty2.default)(Trash, "propTypes", {
  /** Set the height of the icon, ex. '16px' */
  height: _propTypes.default.string
});
(0, _defineProperty2.default)(Trash, "defaultProps", {
  height: '16px',
  predefinedClassName: 'data-ex-icons-trash'
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9pY29ucy90cmFzaC5qcyJdLCJuYW1lcyI6WyJUcmFzaCIsInByb3BzIiwiQ29tcG9uZW50IiwiaGVpZ2h0IiwiUHJvcFR5cGVzIiwic3RyaW5nIiwicHJlZGVmaW5lZENsYXNzTmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0lBTXFCQSxLOzs7Ozs7Ozs7Ozs7NkJBV1Y7QUFDUCxhQUNFLDZCQUFDLGFBQUQsRUFBVSxLQUFLQyxLQUFmLEVBQ0U7QUFBTSxRQUFBLENBQUMsRUFBQztBQUFSLFFBREYsRUFHRTtBQUFNLFFBQUEsQ0FBQyxFQUFDO0FBQVIsUUFIRixDQURGO0FBU0Q7OztFQXJCZ0NDLGdCOzs7OEJBQWRGLEssZUFDQTtBQUNqQjtBQUNBRyxFQUFBQSxNQUFNLEVBQUVDLG1CQUFVQztBQUZELEM7OEJBREFMLEssa0JBTUc7QUFDcEJHLEVBQUFBLE1BQU0sRUFBRSxNQURZO0FBRXBCRyxFQUFBQSxtQkFBbUIsRUFBRTtBQUZELEMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQmFzZSBmcm9tICcuL2Jhc2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcmFzaCBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgLyoqIFNldCB0aGUgaGVpZ2h0IG9mIHRoZSBpY29uLCBleC4gJzE2cHgnICovXG4gICAgaGVpZ2h0OiBQcm9wVHlwZXMuc3RyaW5nXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBoZWlnaHQ6ICcxNnB4JyxcbiAgICBwcmVkZWZpbmVkQ2xhc3NOYW1lOiAnZGF0YS1leC1pY29ucy10cmFzaCdcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxCYXNlIHsuLi50aGlzLnByb3BzfT5cbiAgICAgICAgPHBhdGggZD1cIk01MS40LDEzLjl2MS42YzAsMC45LTAuNywxLjYtMS42LDEuNkgxMy42Yy0wLjksMC0xLjYtMC43LTEuNi0xLjZ2LTEuNmMwLTAuOSwwLjctMS42LDEuNi0xLjZoOVxuXHRjMC45LDAsMS42LTAuNywxLjYtMS42QzI0LjMsOS43LDI1LjEsOSwyNiw5aDExLjVjMC45LDAsMS42LDAuNywxLjYsMS42YzAsMC45LDAuNywxLjYsMS42LDEuNmg5QzUwLjcsMTIuMyw1MS40LDEzLDUxLjQsMTMuOXpcIiAvPlxuICAgICAgICA8cGF0aCBkPVwiTTQwLjgsNTAuMWwwLjgtMjUuNGgtMy4zbC0wLjgsMjUuNEg0MC44eiBNMzAuMSw1MC4xaDMuM1YyNC43aC0zLjNWNTAuMXogTTI2LDUwLjFsLTAuOC0yNS40aC0zLjNsMC44LDI1LjRIMjZcblx0eiBNNDQuOSw1NUgxOC41Yy0wLjksMC0xLjYtMC43LTEuNi0xLjZsLTEuNS0zMS4yYzAtMC45LDAuNy0xLjcsMS42LTEuN2gyOS40YzAuOSwwLDEuNywwLjgsMS42LDEuN2wtMS41LDMxLjJcblx0QzQ2LjUsNTQuMyw0NS44LDU1LDQ0LjksNTV6XCIgLz5cbiAgICAgIDwvQmFzZT5cbiAgICApO1xuICB9XG59XG4iXX0=