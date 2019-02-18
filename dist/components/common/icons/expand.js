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
var Expand =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Expand, _Component);

  function Expand() {
    (0, _classCallCheck2.default)(this, Expand);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Expand).apply(this, arguments));
  }

  (0, _createClass2.default)(Expand, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_base.default, this.props, _react.default.createElement("g", {
        transform: "translate(6.000000, 6.000000)"
      }, _react.default.createElement("path", {
        d: "M31.25,6.25 L36.0416667,11.0416667 L30.0208333,17.0208333 L32.9791667,19.9791667 L38.9583333,13.9583333 L43.75,18.75 L43.75,6.25 L31.25,6.25 Z M6.25,18.75 L11.0416667,13.9583333 L17.0208333,19.9791667 L19.9791667,17.0208333 L13.9583333,11.0416667 L18.75,6.25 L6.25,6.25 L6.25,18.75 Z M18.75,43.75 L13.9583333,38.9583333 L19.9791667,32.9791667 L17.0208333,30.0208333 L11.0416667,36.0416667 L6.25,31.25 L6.25,43.75 L18.75,43.75 Z M43.75,31.25 L38.9583333,36.0416667 L32.9791667,30.0208333 L30.0208333,32.9791667 L36.0416667,38.9583333 L31.25,43.75 L43.75,43.75 L43.75,31.25 Z"
      })));
    }
  }]);
  return Expand;
}(_react.Component);

exports.default = Expand;
(0, _defineProperty2.default)(Expand, "propTypes", {
  /** Set the height of the icon, ex. '16px' */
  height: _propTypes.default.string
});
(0, _defineProperty2.default)(Expand, "defaultProps", {
  height: '16px',
  predefinedClassName: 'data-ex-icons-expand'
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9pY29ucy9leHBhbmQuanMiXSwibmFtZXMiOlsiRXhwYW5kIiwicHJvcHMiLCJDb21wb25lbnQiLCJoZWlnaHQiLCJQcm9wVHlwZXMiLCJzdHJpbmciLCJwcmVkZWZpbmVkQ2xhc3NOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUF0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7SUFNcUJBLE07Ozs7Ozs7Ozs7Ozs2QkFXVjtBQUNQLGFBQ0UsNkJBQUMsYUFBRCxFQUFVLEtBQUtDLEtBQWYsRUFDRTtBQUFHLFFBQUEsU0FBUyxFQUFDO0FBQWIsU0FDRTtBQUFNLFFBQUEsQ0FBQyxFQUFDO0FBQVIsUUFERixDQURGLENBREY7QUFPRDs7O0VBbkJpQ0MsZ0I7Ozs4QkFBZkYsTSxlQUNBO0FBQ2pCO0FBQ0FHLEVBQUFBLE1BQU0sRUFBRUMsbUJBQVVDO0FBRkQsQzs4QkFEQUwsTSxrQkFNRztBQUNwQkcsRUFBQUEsTUFBTSxFQUFFLE1BRFk7QUFFcEJHLEVBQUFBLG1CQUFtQixFQUFFO0FBRkQsQztBQWN2QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBCYXNlIGZyb20gJy4vYmFzZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4cGFuZCBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgLyoqIFNldCB0aGUgaGVpZ2h0IG9mIHRoZSBpY29uLCBleC4gJzE2cHgnICovXG4gICAgaGVpZ2h0OiBQcm9wVHlwZXMuc3RyaW5nXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBoZWlnaHQ6ICcxNnB4JyxcbiAgICBwcmVkZWZpbmVkQ2xhc3NOYW1lOiAnZGF0YS1leC1pY29ucy1leHBhbmQnXG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8QmFzZSB7Li4udGhpcy5wcm9wc30+XG4gICAgICAgIDxnIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSg2LjAwMDAwMCwgNi4wMDAwMDApXCI+XG4gICAgICAgICAgPHBhdGggZD1cIk0zMS4yNSw2LjI1IEwzNi4wNDE2NjY3LDExLjA0MTY2NjcgTDMwLjAyMDgzMzMsMTcuMDIwODMzMyBMMzIuOTc5MTY2NywxOS45NzkxNjY3IEwzOC45NTgzMzMzLDEzLjk1ODMzMzMgTDQzLjc1LDE4Ljc1IEw0My43NSw2LjI1IEwzMS4yNSw2LjI1IFogTTYuMjUsMTguNzUgTDExLjA0MTY2NjcsMTMuOTU4MzMzMyBMMTcuMDIwODMzMywxOS45NzkxNjY3IEwxOS45NzkxNjY3LDE3LjAyMDgzMzMgTDEzLjk1ODMzMzMsMTEuMDQxNjY2NyBMMTguNzUsNi4yNSBMNi4yNSw2LjI1IEw2LjI1LDE4Ljc1IFogTTE4Ljc1LDQzLjc1IEwxMy45NTgzMzMzLDM4Ljk1ODMzMzMgTDE5Ljk3OTE2NjcsMzIuOTc5MTY2NyBMMTcuMDIwODMzMywzMC4wMjA4MzMzIEwxMS4wNDE2NjY3LDM2LjA0MTY2NjcgTDYuMjUsMzEuMjUgTDYuMjUsNDMuNzUgTDE4Ljc1LDQzLjc1IFogTTQzLjc1LDMxLjI1IEwzOC45NTgzMzMzLDM2LjA0MTY2NjcgTDMyLjk3OTE2NjcsMzAuMDIwODMzMyBMMzAuMDIwODMzMywzMi45NzkxNjY3IEwzNi4wNDE2NjY3LDM4Ljk1ODMzMzMgTDMxLjI1LDQzLjc1IEw0My43NSw0My43NSBMNDMuNzUsMzEuMjUgWlwiIC8+XG4gICAgICAgIDwvZz5cbiAgICAgIDwvQmFzZT5cbiAgICApO1xuICB9XG59O1xuIl19