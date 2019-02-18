"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _sourceDataCatalog = require("../source-data-catalog");

var _styledComponents = require("../../common/styled-components");

var _fieldSelector = _interopRequireDefault(require("../../common/field-selector"));

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
function TooltipConfigFactory() {
  var TooltipConfig = function TooltipConfig(_ref) {
    var config = _ref.config,
        datasets = _ref.datasets,
        onChange = _ref.onChange;
    return _react.default.createElement("div", null, Object.keys(config.fieldsToShow).map(function (dataId) {
      return _react.default.createElement(_styledComponents.SidePanelSection, {
        key: dataId
      }, _react.default.createElement(_sourceDataCatalog.DatasetTag, {
        dataset: datasets[dataId]
      }), _react.default.createElement(_fieldSelector.default, {
        fields: datasets[dataId].fields,
        value: config.fieldsToShow[dataId],
        onSelect: function onSelect(fieldsToShow) {
          var newConfig = (0, _objectSpread3.default)({}, config, {
            fieldsToShow: (0, _objectSpread3.default)({}, config.fieldsToShow, (0, _defineProperty2.default)({}, dataId, fieldsToShow.map(function (d) {
              return d.name;
            })))
          });
          onChange(newConfig);
        },
        closeOnSelect: false,
        multiSelect: true
      }));
    }));
  };

  return TooltipConfig;
}

var _default = TooltipConfigFactory;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvaW50ZXJhY3Rpb24tcGFuZWwvdG9vbHRpcC1jb25maWcuanMiXSwibmFtZXMiOlsiVG9vbHRpcENvbmZpZ0ZhY3RvcnkiLCJUb29sdGlwQ29uZmlnIiwiY29uZmlnIiwiZGF0YXNldHMiLCJvbkNoYW5nZSIsIk9iamVjdCIsImtleXMiLCJmaWVsZHNUb1Nob3ciLCJtYXAiLCJkYXRhSWQiLCJmaWVsZHMiLCJuZXdDb25maWciLCJkIiwibmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUF4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFRQSxTQUFTQSxvQkFBVCxHQUFnQztBQUM5QixNQUFNQyxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCO0FBQUEsUUFBRUMsTUFBRixRQUFFQSxNQUFGO0FBQUEsUUFBVUMsUUFBVixRQUFVQSxRQUFWO0FBQUEsUUFBb0JDLFFBQXBCLFFBQW9CQSxRQUFwQjtBQUFBLFdBQ3BCLDBDQUNHQyxNQUFNLENBQUNDLElBQVAsQ0FBWUosTUFBTSxDQUFDSyxZQUFuQixFQUFpQ0MsR0FBakMsQ0FBcUMsVUFBQUMsTUFBTTtBQUFBLGFBQzFDLDZCQUFDLGtDQUFEO0FBQWtCLFFBQUEsR0FBRyxFQUFFQTtBQUF2QixTQUNFLDZCQUFDLDZCQUFEO0FBQVksUUFBQSxPQUFPLEVBQUVOLFFBQVEsQ0FBQ00sTUFBRDtBQUE3QixRQURGLEVBRUUsNkJBQUMsc0JBQUQ7QUFDRSxRQUFBLE1BQU0sRUFBRU4sUUFBUSxDQUFDTSxNQUFELENBQVIsQ0FBaUJDLE1BRDNCO0FBRUUsUUFBQSxLQUFLLEVBQUVSLE1BQU0sQ0FBQ0ssWUFBUCxDQUFvQkUsTUFBcEIsQ0FGVDtBQUdFLFFBQUEsUUFBUSxFQUFFLGtCQUFBRixZQUFZLEVBQUk7QUFDeEIsY0FBTUksU0FBUyxtQ0FDVlQsTUFEVTtBQUViSyxZQUFBQSxZQUFZLGtDQUNQTCxNQUFNLENBQUNLLFlBREEsb0NBRVRFLE1BRlMsRUFFQUYsWUFBWSxDQUFDQyxHQUFiLENBQWlCLFVBQUFJLENBQUM7QUFBQSxxQkFBSUEsQ0FBQyxDQUFDQyxJQUFOO0FBQUEsYUFBbEIsQ0FGQTtBQUZDLFlBQWY7QUFPQVQsVUFBQUEsUUFBUSxDQUFDTyxTQUFELENBQVI7QUFDRCxTQVpIO0FBYUUsUUFBQSxhQUFhLEVBQUUsS0FiakI7QUFjRSxRQUFBLFdBQVc7QUFkYixRQUZGLENBRDBDO0FBQUEsS0FBM0MsQ0FESCxDQURvQjtBQUFBLEdBQXRCOztBQTBCQSxTQUFPVixhQUFQO0FBQ0Q7O2VBRWNELG9CIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7RGF0YXNldFRhZ30gZnJvbSAnLi4vc291cmNlLWRhdGEtY2F0YWxvZyc7XG5cbmltcG9ydCB7U2lkZVBhbmVsU2VjdGlvbn0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IEZpZWxkU2VsZWN0b3IgZnJvbSAnY29tcG9uZW50cy9jb21tb24vZmllbGQtc2VsZWN0b3InO1xuXG5mdW5jdGlvbiBUb29sdGlwQ29uZmlnRmFjdG9yeSgpIHtcbiAgY29uc3QgVG9vbHRpcENvbmZpZyA9ICh7Y29uZmlnLCBkYXRhc2V0cywgb25DaGFuZ2V9KSA9PiAoXG4gICAgPGRpdj5cbiAgICAgIHtPYmplY3Qua2V5cyhjb25maWcuZmllbGRzVG9TaG93KS5tYXAoZGF0YUlkID0+IChcbiAgICAgICAgPFNpZGVQYW5lbFNlY3Rpb24ga2V5PXtkYXRhSWR9PlxuICAgICAgICAgIDxEYXRhc2V0VGFnIGRhdGFzZXQ9e2RhdGFzZXRzW2RhdGFJZF19IC8+XG4gICAgICAgICAgPEZpZWxkU2VsZWN0b3JcbiAgICAgICAgICAgIGZpZWxkcz17ZGF0YXNldHNbZGF0YUlkXS5maWVsZHN9XG4gICAgICAgICAgICB2YWx1ZT17Y29uZmlnLmZpZWxkc1RvU2hvd1tkYXRhSWRdfVxuICAgICAgICAgICAgb25TZWxlY3Q9e2ZpZWxkc1RvU2hvdyA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IG5ld0NvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICAuLi5jb25maWcsXG4gICAgICAgICAgICAgICAgZmllbGRzVG9TaG93OiB7XG4gICAgICAgICAgICAgICAgICAuLi5jb25maWcuZmllbGRzVG9TaG93LFxuICAgICAgICAgICAgICAgICAgW2RhdGFJZF06IGZpZWxkc1RvU2hvdy5tYXAoZCA9PiBkLm5hbWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICBvbkNoYW5nZShuZXdDb25maWcpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGNsb3NlT25TZWxlY3Q9e2ZhbHNlfVxuICAgICAgICAgICAgbXVsdGlTZWxlY3RcbiAgICAgICAgICAvPlxuICAgICAgICA8L1NpZGVQYW5lbFNlY3Rpb24+XG4gICAgICApKX1cbiAgICA8L2Rpdj5cbiAgKTtcblxuICByZXR1cm4gVG9vbHRpcENvbmZpZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgVG9vbHRpcENvbmZpZ0ZhY3Rvcnk7XG4iXX0=