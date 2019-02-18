"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _styledComponents2 = require("./styled-components");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  font-weight: 500;\n  font-size: 12px;\n  color: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var DatasetName = _styledComponents.default.div(_templateObject(), function (props) {
  return props.theme.titleColorLT;
});

var DatasetLabel = function DatasetLabel(_ref) {
  var dataset = _ref.dataset;
  return _react.default.createElement(_styledComponents2.CenterFlexbox, null, _react.default.createElement(_styledComponents2.DatasetSquare, {
    className: "dataset-clolor",
    color: dataset.color
  }), _react.default.createElement(DatasetName, {
    className: "dataset-name"
  }, dataset.label));
};

var _default = DatasetLabel;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9kYXRhc2V0LWxhYmVsLmpzIl0sIm5hbWVzIjpbIkRhdGFzZXROYW1lIiwic3R5bGVkIiwiZGl2IiwicHJvcHMiLCJ0aGVtZSIsInRpdGxlQ29sb3JMVCIsIkRhdGFzZXRMYWJlbCIsImRhdGFzZXQiLCJjb2xvciIsImxhYmVsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsV0FBVyxHQUFHQywwQkFBT0MsR0FBVixvQkFHTixVQUFBQyxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlDLFlBQWhCO0FBQUEsQ0FIQyxDQUFqQjs7QUFNQSxJQUFNQyxZQUFZLEdBQUcsU0FBZkEsWUFBZTtBQUFBLE1BQUVDLE9BQUYsUUFBRUEsT0FBRjtBQUFBLFNBQ25CLDZCQUFDLGdDQUFELFFBQ0UsNkJBQUMsZ0NBQUQ7QUFBZSxJQUFBLFNBQVMsRUFBQyxnQkFBekI7QUFBMEMsSUFBQSxLQUFLLEVBQUVBLE9BQU8sQ0FBQ0M7QUFBekQsSUFERixFQUVFLDZCQUFDLFdBQUQ7QUFBYSxJQUFBLFNBQVMsRUFBQztBQUF2QixLQUF1Q0QsT0FBTyxDQUFDRSxLQUEvQyxDQUZGLENBRG1CO0FBQUEsQ0FBckI7O2VBT2VILFkiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQge0NlbnRlckZsZXhib3gsIERhdGFzZXRTcXVhcmV9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcblxuY29uc3QgRGF0YXNldE5hbWUgPSBzdHlsZWQuZGl2YFxuICBmb250LXdlaWdodDogNTAwO1xuICBmb250LXNpemU6IDEycHg7XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRpdGxlQ29sb3JMVH07XG5gO1xuXG5jb25zdCBEYXRhc2V0TGFiZWwgPSAoe2RhdGFzZXR9KSA9PiAoXG4gIDxDZW50ZXJGbGV4Ym94PlxuICAgIDxEYXRhc2V0U3F1YXJlIGNsYXNzTmFtZT1cImRhdGFzZXQtY2xvbG9yXCIgY29sb3I9e2RhdGFzZXQuY29sb3J9IC8+XG4gICAgPERhdGFzZXROYW1lIGNsYXNzTmFtZT1cImRhdGFzZXQtbmFtZVwiPntkYXRhc2V0LmxhYmVsfTwvRGF0YXNldE5hbWU+XG4gIDwvQ2VudGVyRmxleGJveD5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IERhdGFzZXRMYWJlbDtcbiJdfQ==