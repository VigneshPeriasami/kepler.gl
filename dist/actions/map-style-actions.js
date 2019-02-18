"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadCustomMapStyle = exports.mapStyleChange = exports.loadMapStyleErr = exports.loadMapStyles = exports.mapConfigChange = exports.inputMapStyle = exports.addCustomMapStyle = void 0;

var _reduxActions = require("redux-actions");

var _actionTypes = _interopRequireDefault(require("../constants/action-types"));

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

/**
 * Add map style from user input to reducer and set it to current style
 * This action is called when user click confirm after putting in a valid style url in the custom map style dialog.
 * It should not be called from outside kepler.gl without a valid `inputStyle` in the `mapStyle` reducer.
 * param {void}
 * @public
 */
var addCustomMapStyle = (0, _reduxActions.createAction)(_actionTypes.default.ADD_CUSTOM_MAP_STYLE);
/**
 * Add map style from user input to reducer and set it to current style
 * This action is called when user click confirm after putting in a valid style url in the custom map style dialog.
 * It should not be called from outside kepler.gl without a valid `inputStyle` in the `mapStyle` reducer.
 * param {void}
 * @public
 */

exports.addCustomMapStyle = addCustomMapStyle;
var inputMapStyle = (0, _reduxActions.createAction)(_actionTypes.default.INPUT_MAP_STYLE, function (inputStyle) {
  return inputStyle;
});
exports.inputMapStyle = inputMapStyle;
var mapConfigChange = (0, _reduxActions.createAction)(_actionTypes.default.MAP_CONFIG_CHANGE, function (mapStyle) {
  return mapStyle;
});
exports.mapConfigChange = mapConfigChange;
var loadMapStyles = (0, _reduxActions.createAction)(_actionTypes.default.LOAD_MAP_STYLES, function (newStyles) {
  return newStyles;
});
exports.loadMapStyles = loadMapStyles;
var loadMapStyleErr = (0, _reduxActions.createAction)(_actionTypes.default.LOAD_MAP_STYLE_ERR, function (error) {
  return error;
});
exports.loadMapStyleErr = loadMapStyleErr;
var mapStyleChange = (0, _reduxActions.createAction)(_actionTypes.default.MAP_STYLE_CHANGE, function (styleType) {
  return styleType;
});
exports.mapStyleChange = mapStyleChange;
var loadCustomMapStyle = (0, _reduxActions.createAction)(_actionTypes.default.LOAD_CUSTOM_MAP_STYLE, function (customMapStyle) {
  return customMapStyle;
});
exports.loadCustomMapStyle = loadCustomMapStyle;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL21hcC1zdHlsZS1hY3Rpb25zLmpzIl0sIm5hbWVzIjpbImFkZEN1c3RvbU1hcFN0eWxlIiwiQWN0aW9uVHlwZXMiLCJBRERfQ1VTVE9NX01BUF9TVFlMRSIsImlucHV0TWFwU3R5bGUiLCJJTlBVVF9NQVBfU1RZTEUiLCJpbnB1dFN0eWxlIiwibWFwQ29uZmlnQ2hhbmdlIiwiTUFQX0NPTkZJR19DSEFOR0UiLCJtYXBTdHlsZSIsImxvYWRNYXBTdHlsZXMiLCJMT0FEX01BUF9TVFlMRVMiLCJuZXdTdHlsZXMiLCJsb2FkTWFwU3R5bGVFcnIiLCJMT0FEX01BUF9TVFlMRV9FUlIiLCJlcnJvciIsIm1hcFN0eWxlQ2hhbmdlIiwiTUFQX1NUWUxFX0NIQU5HRSIsInN0eWxlVHlwZSIsImxvYWRDdXN0b21NYXBTdHlsZSIsIkxPQURfQ1VTVE9NX01BUF9TVFlMRSIsImN1c3RvbU1hcFN0eWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUtBOzs7Ozs7O0FBT08sSUFBTUEsaUJBQWlCLEdBQUcsZ0NBQy9CQyxxQkFBWUMsb0JBRG1CLENBQTFCO0FBSVA7Ozs7Ozs7OztBQU9PLElBQU1DLGFBQWEsR0FBRyxnQ0FDM0JGLHFCQUFZRyxlQURlLEVBRTNCLFVBQUFDLFVBQVU7QUFBQSxTQUFJQSxVQUFKO0FBQUEsQ0FGaUIsQ0FBdEI7O0FBS0EsSUFBTUMsZUFBZSxHQUFHLGdDQUM3QkwscUJBQVlNLGlCQURpQixFQUU3QixVQUFBQyxRQUFRO0FBQUEsU0FBSUEsUUFBSjtBQUFBLENBRnFCLENBQXhCOztBQUtBLElBQU1DLGFBQWEsR0FBRyxnQ0FDM0JSLHFCQUFZUyxlQURlLEVBRTNCLFVBQUFDLFNBQVM7QUFBQSxTQUFJQSxTQUFKO0FBQUEsQ0FGa0IsQ0FBdEI7O0FBS0EsSUFBTUMsZUFBZSxHQUFHLGdDQUM3QlgscUJBQVlZLGtCQURpQixFQUU3QixVQUFBQyxLQUFLO0FBQUEsU0FBSUEsS0FBSjtBQUFBLENBRndCLENBQXhCOztBQUtBLElBQU1DLGNBQWMsR0FBRyxnQ0FDNUJkLHFCQUFZZSxnQkFEZ0IsRUFFNUIsVUFBQUMsU0FBUztBQUFBLFNBQUlBLFNBQUo7QUFBQSxDQUZtQixDQUF2Qjs7QUFLQSxJQUFNQyxrQkFBa0IsR0FBRyxnQ0FDaENqQixxQkFBWWtCLHFCQURvQixFQUVoQyxVQUFBQyxjQUFjO0FBQUEsU0FBSUEsY0FBSjtBQUFBLENBRmtCLENBQTNCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtjcmVhdGVBY3Rpb259IGZyb20gJ3JlZHV4LWFjdGlvbnMnO1xuaW1wb3J0IEFjdGlvblR5cGVzIGZyb20gJ2NvbnN0YW50cy9hY3Rpb24tdHlwZXMnO1xuXG4vKipcbiAqIEFkZCBtYXAgc3R5bGUgZnJvbSB1c2VyIGlucHV0IHRvIHJlZHVjZXIgYW5kIHNldCBpdCB0byBjdXJyZW50IHN0eWxlXG4gKiBUaGlzIGFjdGlvbiBpcyBjYWxsZWQgd2hlbiB1c2VyIGNsaWNrIGNvbmZpcm0gYWZ0ZXIgcHV0dGluZyBpbiBhIHZhbGlkIHN0eWxlIHVybCBpbiB0aGUgY3VzdG9tIG1hcCBzdHlsZSBkaWFsb2cuXG4gKiBJdCBzaG91bGQgbm90IGJlIGNhbGxlZCBmcm9tIG91dHNpZGUga2VwbGVyLmdsIHdpdGhvdXQgYSB2YWxpZCBgaW5wdXRTdHlsZWAgaW4gdGhlIGBtYXBTdHlsZWAgcmVkdWNlci5cbiAqIHBhcmFtIHt2b2lkfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgYWRkQ3VzdG9tTWFwU3R5bGUgPSBjcmVhdGVBY3Rpb24oXG4gIEFjdGlvblR5cGVzLkFERF9DVVNUT01fTUFQX1NUWUxFLFxuKTtcblxuLyoqXG4gKiBBZGQgbWFwIHN0eWxlIGZyb20gdXNlciBpbnB1dCB0byByZWR1Y2VyIGFuZCBzZXQgaXQgdG8gY3VycmVudCBzdHlsZVxuICogVGhpcyBhY3Rpb24gaXMgY2FsbGVkIHdoZW4gdXNlciBjbGljayBjb25maXJtIGFmdGVyIHB1dHRpbmcgaW4gYSB2YWxpZCBzdHlsZSB1cmwgaW4gdGhlIGN1c3RvbSBtYXAgc3R5bGUgZGlhbG9nLlxuICogSXQgc2hvdWxkIG5vdCBiZSBjYWxsZWQgZnJvbSBvdXRzaWRlIGtlcGxlci5nbCB3aXRob3V0IGEgdmFsaWQgYGlucHV0U3R5bGVgIGluIHRoZSBgbWFwU3R5bGVgIHJlZHVjZXIuXG4gKiBwYXJhbSB7dm9pZH1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IGlucHV0TWFwU3R5bGUgPSBjcmVhdGVBY3Rpb24oXG4gIEFjdGlvblR5cGVzLklOUFVUX01BUF9TVFlMRSxcbiAgaW5wdXRTdHlsZSA9PiBpbnB1dFN0eWxlXG4pO1xuXG5leHBvcnQgY29uc3QgbWFwQ29uZmlnQ2hhbmdlID0gY3JlYXRlQWN0aW9uKFxuICBBY3Rpb25UeXBlcy5NQVBfQ09ORklHX0NIQU5HRSxcbiAgbWFwU3R5bGUgPT4gbWFwU3R5bGVcbik7XG5cbmV4cG9ydCBjb25zdCBsb2FkTWFwU3R5bGVzID0gY3JlYXRlQWN0aW9uKFxuICBBY3Rpb25UeXBlcy5MT0FEX01BUF9TVFlMRVMsXG4gIG5ld1N0eWxlcyA9PiBuZXdTdHlsZXNcbik7XG5cbmV4cG9ydCBjb25zdCBsb2FkTWFwU3R5bGVFcnIgPSBjcmVhdGVBY3Rpb24oXG4gIEFjdGlvblR5cGVzLkxPQURfTUFQX1NUWUxFX0VSUixcbiAgZXJyb3IgPT4gZXJyb3Jcbik7XG5cbmV4cG9ydCBjb25zdCBtYXBTdHlsZUNoYW5nZSA9IGNyZWF0ZUFjdGlvbihcbiAgQWN0aW9uVHlwZXMuTUFQX1NUWUxFX0NIQU5HRSxcbiAgc3R5bGVUeXBlID0+IHN0eWxlVHlwZVxuKTtcblxuZXhwb3J0IGNvbnN0IGxvYWRDdXN0b21NYXBTdHlsZSA9IGNyZWF0ZUFjdGlvbihcbiAgQWN0aW9uVHlwZXMuTE9BRF9DVVNUT01fTUFQX1NUWUxFLFxuICBjdXN0b21NYXBTdHlsZSA9PiBjdXN0b21NYXBTdHlsZVxuKTtcbiJdfQ==