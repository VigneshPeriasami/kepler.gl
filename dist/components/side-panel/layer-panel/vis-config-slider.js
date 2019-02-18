"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VisConfigSlider = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = require("../../common/styled-components");

var _utils = require("../../../utils/utils");

var _rangeSlider = _interopRequireDefault(require("../../common/range-slider"));

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
var propTypes = {
  layer: _propTypes.default.object.isRequired,
  property: _propTypes.default.string.isRequired,
  onChange: _propTypes.default.func.isRequired,
  label: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.bool, _propTypes.default.func]),
  range: _propTypes.default.arrayOf(_propTypes.default.number).isRequired,
  step: _propTypes.default.number,
  isRanged: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  inputTheme: _propTypes.default.bool
};

var VisConfigSlider = function VisConfigSlider(_ref) {
  var config = _ref.layer.config,
      property = _ref.property,
      label = _ref.label,
      range = _ref.range,
      step = _ref.step,
      isRanged = _ref.isRanged,
      disabled = _ref.disabled,
      _onChange2 = _ref.onChange,
      inputTheme = _ref.inputTheme;
  return _react.default.createElement(_styledComponents.SidePanelSection, {
    disabled: Boolean(disabled)
  }, label ? _react.default.createElement(_styledComponents.PanelLabel, null, typeof label === 'string' ? label : typeof label === 'function' ? label(config) : (0, _utils.capitalizeFirstLetter)(property)) : null, _react.default.createElement(_rangeSlider.default, {
    range: range,
    value0: isRanged ? config.visConfig[property][0] : range[0],
    value1: isRanged ? config.visConfig[property][1] : config.visConfig[property],
    step: step,
    isRanged: Boolean(isRanged),
    onChange: function onChange(value) {
      return _onChange2((0, _defineProperty2.default)({}, property, isRanged ? value : value[1]));
    },
    inputTheme: inputTheme,
    showInput: true
  }));
};

exports.VisConfigSlider = VisConfigSlider;
VisConfigSlider.propTypes = propTypes;
var _default = VisConfigSlider;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItcGFuZWwvdmlzLWNvbmZpZy1zbGlkZXIuanMiXSwibmFtZXMiOlsicHJvcFR5cGVzIiwibGF5ZXIiLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJpc1JlcXVpcmVkIiwicHJvcGVydHkiLCJzdHJpbmciLCJvbkNoYW5nZSIsImZ1bmMiLCJsYWJlbCIsIm9uZU9mVHlwZSIsImJvb2wiLCJyYW5nZSIsImFycmF5T2YiLCJudW1iZXIiLCJzdGVwIiwiaXNSYW5nZWQiLCJkaXNhYmxlZCIsImlucHV0VGhlbWUiLCJWaXNDb25maWdTbGlkZXIiLCJjb25maWciLCJCb29sZWFuIiwidmlzQ29uZmlnIiwidmFsdWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUlBOztBQUVBOztBQTVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVlBLElBQU1BLFNBQVMsR0FBRztBQUNoQkMsRUFBQUEsS0FBSyxFQUFFQyxtQkFBVUMsTUFBVixDQUFpQkMsVUFEUjtBQUVoQkMsRUFBQUEsUUFBUSxFQUFFSCxtQkFBVUksTUFBVixDQUFpQkYsVUFGWDtBQUdoQkcsRUFBQUEsUUFBUSxFQUFFTCxtQkFBVU0sSUFBVixDQUFlSixVQUhUO0FBSWhCSyxFQUFBQSxLQUFLLEVBQUVQLG1CQUFVUSxTQUFWLENBQW9CLENBQ3pCUixtQkFBVUksTUFEZSxFQUV6QkosbUJBQVVTLElBRmUsRUFHekJULG1CQUFVTSxJQUhlLENBQXBCLENBSlM7QUFTaEJJLEVBQUFBLEtBQUssRUFBRVYsbUJBQVVXLE9BQVYsQ0FBa0JYLG1CQUFVWSxNQUE1QixFQUFvQ1YsVUFUM0I7QUFVaEJXLEVBQUFBLElBQUksRUFBRWIsbUJBQVVZLE1BVkE7QUFXaEJFLEVBQUFBLFFBQVEsRUFBRWQsbUJBQVVTLElBWEo7QUFZaEJNLEVBQUFBLFFBQVEsRUFBRWYsbUJBQVVTLElBWko7QUFhaEJPLEVBQUFBLFVBQVUsRUFBRWhCLG1CQUFVUztBQWJOLENBQWxCOztBQWdCTyxJQUFNUSxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCO0FBQUEsTUFDckJDLE1BRHFCLFFBQzdCbkIsS0FENkIsQ0FDckJtQixNQURxQjtBQUFBLE1BRTdCZixRQUY2QixRQUU3QkEsUUFGNkI7QUFBQSxNQUc3QkksS0FINkIsUUFHN0JBLEtBSDZCO0FBQUEsTUFJN0JHLEtBSjZCLFFBSTdCQSxLQUo2QjtBQUFBLE1BSzdCRyxJQUw2QixRQUs3QkEsSUFMNkI7QUFBQSxNQU03QkMsUUFONkIsUUFNN0JBLFFBTjZCO0FBQUEsTUFPN0JDLFFBUDZCLFFBTzdCQSxRQVA2QjtBQUFBLE1BUTdCVixVQVI2QixRQVE3QkEsUUFSNkI7QUFBQSxNQVM3QlcsVUFUNkIsUUFTN0JBLFVBVDZCO0FBQUEsU0FXN0IsNkJBQUMsa0NBQUQ7QUFBa0IsSUFBQSxRQUFRLEVBQUVHLE9BQU8sQ0FBQ0osUUFBRDtBQUFuQyxLQUNHUixLQUFLLEdBQ0osNkJBQUMsNEJBQUQsUUFDRyxPQUFPQSxLQUFQLEtBQWlCLFFBQWpCLEdBQ0dBLEtBREgsR0FFRyxPQUFPQSxLQUFQLEtBQWlCLFVBQWpCLEdBQ0VBLEtBQUssQ0FBQ1csTUFBRCxDQURQLEdBRUUsa0NBQXNCZixRQUF0QixDQUxSLENBREksR0FRRixJQVROLEVBVUUsNkJBQUMsb0JBQUQ7QUFDRSxJQUFBLEtBQUssRUFBRU8sS0FEVDtBQUVFLElBQUEsTUFBTSxFQUFFSSxRQUFRLEdBQUdJLE1BQU0sQ0FBQ0UsU0FBUCxDQUFpQmpCLFFBQWpCLEVBQTJCLENBQTNCLENBQUgsR0FBbUNPLEtBQUssQ0FBQyxDQUFELENBRjFEO0FBR0UsSUFBQSxNQUFNLEVBQ0pJLFFBQVEsR0FBR0ksTUFBTSxDQUFDRSxTQUFQLENBQWlCakIsUUFBakIsRUFBMkIsQ0FBM0IsQ0FBSCxHQUFtQ2UsTUFBTSxDQUFDRSxTQUFQLENBQWlCakIsUUFBakIsQ0FKL0M7QUFNRSxJQUFBLElBQUksRUFBRVUsSUFOUjtBQU9FLElBQUEsUUFBUSxFQUFFTSxPQUFPLENBQUNMLFFBQUQsQ0FQbkI7QUFRRSxJQUFBLFFBQVEsRUFBRSxrQkFBQU8sS0FBSztBQUFBLGFBQUloQixVQUFRLG1DQUFHRixRQUFILEVBQWNXLFFBQVEsR0FBR08sS0FBSCxHQUFXQSxLQUFLLENBQUMsQ0FBRCxDQUF0QyxFQUFaO0FBQUEsS0FSakI7QUFTRSxJQUFBLFVBQVUsRUFBRUwsVUFUZDtBQVVFLElBQUEsU0FBUztBQVZYLElBVkYsQ0FYNkI7QUFBQSxDQUF4Qjs7O0FBb0NQQyxlQUFlLENBQUNuQixTQUFoQixHQUE0QkEsU0FBNUI7ZUFFZW1CLGUiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7XG4gIFNpZGVQYW5lbFNlY3Rpb24sXG4gIFBhbmVsTGFiZWxcbn0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHtjYXBpdGFsaXplRmlyc3RMZXR0ZXJ9IGZyb20gJ3V0aWxzL3V0aWxzJztcblxuaW1wb3J0IFJhbmdlU2xpZGVyIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3JhbmdlLXNsaWRlcic7XG5cbmNvbnN0IHByb3BUeXBlcyA9IHtcbiAgbGF5ZXI6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgcHJvcGVydHk6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGxhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIFByb3BUeXBlcy5ib29sLFxuICAgIFByb3BUeXBlcy5mdW5jXG4gIF0pLFxuICByYW5nZTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm51bWJlcikuaXNSZXF1aXJlZCxcbiAgc3RlcDogUHJvcFR5cGVzLm51bWJlcixcbiAgaXNSYW5nZWQ6IFByb3BUeXBlcy5ib29sLFxuICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gIGlucHV0VGhlbWU6IFByb3BUeXBlcy5ib29sXG59O1xuXG5leHBvcnQgY29uc3QgVmlzQ29uZmlnU2xpZGVyID0gKHtcbiAgbGF5ZXI6IHtjb25maWd9LFxuICBwcm9wZXJ0eSxcbiAgbGFiZWwsXG4gIHJhbmdlLFxuICBzdGVwLFxuICBpc1JhbmdlZCxcbiAgZGlzYWJsZWQsXG4gIG9uQ2hhbmdlLFxuICBpbnB1dFRoZW1lXG59KSA9PiAoXG4gIDxTaWRlUGFuZWxTZWN0aW9uIGRpc2FibGVkPXtCb29sZWFuKGRpc2FibGVkKX0+XG4gICAge2xhYmVsID8gKFxuICAgICAgPFBhbmVsTGFiZWw+XG4gICAgICAgIHt0eXBlb2YgbGFiZWwgPT09ICdzdHJpbmcnXG4gICAgICAgICAgPyBsYWJlbFxuICAgICAgICAgIDogdHlwZW9mIGxhYmVsID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICA/IGxhYmVsKGNvbmZpZylcbiAgICAgICAgICAgIDogY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHByb3BlcnR5KX1cbiAgICAgIDwvUGFuZWxMYWJlbD5cbiAgICApIDogbnVsbH1cbiAgICA8UmFuZ2VTbGlkZXJcbiAgICAgIHJhbmdlPXtyYW5nZX1cbiAgICAgIHZhbHVlMD17aXNSYW5nZWQgPyBjb25maWcudmlzQ29uZmlnW3Byb3BlcnR5XVswXSA6IHJhbmdlWzBdfVxuICAgICAgdmFsdWUxPXtcbiAgICAgICAgaXNSYW5nZWQgPyBjb25maWcudmlzQ29uZmlnW3Byb3BlcnR5XVsxXSA6IGNvbmZpZy52aXNDb25maWdbcHJvcGVydHldXG4gICAgICB9XG4gICAgICBzdGVwPXtzdGVwfVxuICAgICAgaXNSYW5nZWQ9e0Jvb2xlYW4oaXNSYW5nZWQpfVxuICAgICAgb25DaGFuZ2U9e3ZhbHVlID0+IG9uQ2hhbmdlKHtbcHJvcGVydHldOiBpc1JhbmdlZCA/IHZhbHVlIDogdmFsdWVbMV19KX1cbiAgICAgIGlucHV0VGhlbWU9e2lucHV0VGhlbWV9XG4gICAgICBzaG93SW5wdXRcbiAgICAvPlxuICA8L1NpZGVQYW5lbFNlY3Rpb24+XG4pO1xuXG5WaXNDb25maWdTbGlkZXIucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xuXG5leHBvcnQgZGVmYXVsdCBWaXNDb25maWdTbGlkZXI7XG4iXX0=