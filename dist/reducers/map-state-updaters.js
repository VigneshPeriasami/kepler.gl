"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleSplitMapUpdater = exports.receiveMapConfigUpdater = exports.togglePerspectiveUpdater = exports.fitBoundsUpdater = exports.updateMapUpdater = exports.INITIAL_MAP_STATE = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _geoViewport = _interopRequireDefault(require("@mapbox/geo-viewport"));

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
 * Default initial `mapState`
 * @constant
 * @property {number} pitch - Default: 0
 * @property {number} bearing - Default: 0
 * @property {number} latitude - Default: 37.75043
 * @property {number} longitude - Default: -122.34679
 * @property {number} zoom - Default: 9
 * @property {boolean} dragRotate - Default: false
 * @property {number} width - Default: 800
 * @property {number} height - Default: 800
 * @property {boolean} isSplit - Default: false
 * @public
 */
var INITIAL_MAP_STATE = {
  pitch: 0,
  bearing: 0,
  latitude: 37.75043,
  longitude: -122.34679,
  zoom: 9,
  dragRotate: false,
  width: 800,
  height: 800,
  isSplit: false
};
/* Updaters */

exports.INITIAL_MAP_STATE = INITIAL_MAP_STATE;

var updateMapUpdater = function updateMapUpdater(state, action) {
  return (0, _objectSpread2.default)({}, state, action.payload || {});
};
/**
 *
 * @param state
 * @param action
 * @returns {{latitude, longitude, zoom}}
 */


exports.updateMapUpdater = updateMapUpdater;

var fitBoundsUpdater = function fitBoundsUpdater(state, action) {
  var bounds = action.payload;

  var _geoViewport$viewport = _geoViewport.default.viewport(bounds, [state.width, state.height]),
      center = _geoViewport$viewport.center,
      zoom = _geoViewport$viewport.zoom;

  return (0, _objectSpread2.default)({}, state, {
    latitude: center[1],
    longitude: center[0],
    zoom: zoom
  });
};

exports.fitBoundsUpdater = fitBoundsUpdater;

var togglePerspectiveUpdater = function togglePerspectiveUpdater(state, action) {
  return (0, _objectSpread2.default)({}, state, {
    pitch: state.dragRotate ? 0 : 50,
    bearing: state.dragRotate ? 0 : 24
  }, {
    dragRotate: !state.dragRotate
  });
}; // consider case where you have a split map and user wants to reset


exports.togglePerspectiveUpdater = togglePerspectiveUpdater;

var receiveMapConfigUpdater = function receiveMapConfigUpdater(state, action) {
  var _ref = action.payload.mapState || {},
      _ref$isSplit = _ref.isSplit,
      isSplit = _ref$isSplit === void 0 ? false : _ref$isSplit;

  return (0, _objectSpread2.default)({}, state, action.payload.mapState || {}, {
    isSplit: isSplit
  }, getMapDimForSplitMap(isSplit, state));
};

exports.receiveMapConfigUpdater = receiveMapConfigUpdater;

var toggleSplitMapUpdater = function toggleSplitMapUpdater(state, action) {
  return (0, _objectSpread2.default)({}, state, {
    isSplit: !state.isSplit
  }, getMapDimForSplitMap(!state.isSplit, state));
}; // Helpers


exports.toggleSplitMapUpdater = toggleSplitMapUpdater;

function getMapDimForSplitMap(isSplit, state) {
  // cases:
  // 1. state split: true - isSplit: true
  // do nothing
  // 2. state split: false - isSplit: false
  // do nothing
  if (state.isSplit === isSplit) {
    return {};
  }

  var width = state.isSplit && !isSplit ? // 3. state split: true - isSplit: false
  // double width
  state.width * 2 // 4. state split: false - isSplit: true
  // split width
  : state.width / 2;
  return {
    width: width
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy9tYXAtc3RhdGUtdXBkYXRlcnMuanMiXSwibmFtZXMiOlsiSU5JVElBTF9NQVBfU1RBVEUiLCJwaXRjaCIsImJlYXJpbmciLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsInpvb20iLCJkcmFnUm90YXRlIiwid2lkdGgiLCJoZWlnaHQiLCJpc1NwbGl0IiwidXBkYXRlTWFwVXBkYXRlciIsInN0YXRlIiwiYWN0aW9uIiwicGF5bG9hZCIsImZpdEJvdW5kc1VwZGF0ZXIiLCJib3VuZHMiLCJnZW9WaWV3cG9ydCIsInZpZXdwb3J0IiwiY2VudGVyIiwidG9nZ2xlUGVyc3BlY3RpdmVVcGRhdGVyIiwicmVjZWl2ZU1hcENvbmZpZ1VwZGF0ZXIiLCJtYXBTdGF0ZSIsImdldE1hcERpbUZvclNwbGl0TWFwIiwidG9nZ2xlU3BsaXRNYXBVcGRhdGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQW9CQTs7QUFwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBSUE7Ozs7Ozs7Ozs7Ozs7O0FBY08sSUFBTUEsaUJBQWlCLEdBQUc7QUFDL0JDLEVBQUFBLEtBQUssRUFBRSxDQUR3QjtBQUUvQkMsRUFBQUEsT0FBTyxFQUFFLENBRnNCO0FBRy9CQyxFQUFBQSxRQUFRLEVBQUUsUUFIcUI7QUFJL0JDLEVBQUFBLFNBQVMsRUFBRSxDQUFDLFNBSm1CO0FBSy9CQyxFQUFBQSxJQUFJLEVBQUUsQ0FMeUI7QUFNL0JDLEVBQUFBLFVBQVUsRUFBRSxLQU5tQjtBQU8vQkMsRUFBQUEsS0FBSyxFQUFFLEdBUHdCO0FBUS9CQyxFQUFBQSxNQUFNLEVBQUUsR0FSdUI7QUFTL0JDLEVBQUFBLE9BQU8sRUFBRTtBQVRzQixDQUExQjtBQVlQOzs7O0FBQ08sSUFBTUMsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFtQixDQUFDQyxLQUFELEVBQVFDLE1BQVI7QUFBQSx5Q0FDM0JELEtBRDJCLEVBRTFCQyxNQUFNLENBQUNDLE9BQVAsSUFBa0IsRUFGUTtBQUFBLENBQXpCO0FBS1A7Ozs7Ozs7Ozs7QUFNTyxJQUFNQyxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CLENBQUNILEtBQUQsRUFBUUMsTUFBUixFQUFtQjtBQUNqRCxNQUFNRyxNQUFNLEdBQUdILE1BQU0sQ0FBQ0MsT0FBdEI7O0FBRGlELDhCQUUxQkcscUJBQVlDLFFBQVosQ0FBcUJGLE1BQXJCLEVBQTZCLENBQ2xESixLQUFLLENBQUNKLEtBRDRDLEVBRWxESSxLQUFLLENBQUNILE1BRjRDLENBQTdCLENBRjBCO0FBQUEsTUFFMUNVLE1BRjBDLHlCQUUxQ0EsTUFGMEM7QUFBQSxNQUVsQ2IsSUFGa0MseUJBRWxDQSxJQUZrQzs7QUFPakQseUNBQ0tNLEtBREw7QUFFRVIsSUFBQUEsUUFBUSxFQUFFZSxNQUFNLENBQUMsQ0FBRCxDQUZsQjtBQUdFZCxJQUFBQSxTQUFTLEVBQUVjLE1BQU0sQ0FBQyxDQUFELENBSG5CO0FBSUViLElBQUFBLElBQUksRUFBSkE7QUFKRjtBQU1ELENBYk07Ozs7QUFlQSxJQUFNYyx3QkFBd0IsR0FBRyxTQUEzQkEsd0JBQTJCLENBQUNSLEtBQUQsRUFBUUMsTUFBUjtBQUFBLHlDQUNuQ0QsS0FEbUMsRUFFbkM7QUFDRFYsSUFBQUEsS0FBSyxFQUFFVSxLQUFLLENBQUNMLFVBQU4sR0FBbUIsQ0FBbkIsR0FBdUIsRUFEN0I7QUFFREosSUFBQUEsT0FBTyxFQUFFUyxLQUFLLENBQUNMLFVBQU4sR0FBbUIsQ0FBbkIsR0FBdUI7QUFGL0IsR0FGbUM7QUFNdENBLElBQUFBLFVBQVUsRUFBRSxDQUFDSyxLQUFLLENBQUNMO0FBTm1CO0FBQUEsQ0FBakMsQyxDQVNQOzs7OztBQUNPLElBQU1jLHVCQUF1QixHQUFHLFNBQTFCQSx1QkFBMEIsQ0FBQ1QsS0FBRCxFQUFRQyxNQUFSLEVBQW1CO0FBQUEsYUFDOUJBLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlUSxRQUFmLElBQTJCLEVBREc7QUFBQSwwQkFDakRaLE9BRGlEO0FBQUEsTUFDakRBLE9BRGlELDZCQUN2QyxLQUR1Qzs7QUFHeEQseUNBQ0tFLEtBREwsRUFFTUMsTUFBTSxDQUFDQyxPQUFQLENBQWVRLFFBQWYsSUFBMkIsRUFGakM7QUFHRVosSUFBQUEsT0FBTyxFQUFQQTtBQUhGLEtBSUthLG9CQUFvQixDQUFDYixPQUFELEVBQVVFLEtBQVYsQ0FKekI7QUFNRCxDQVRNOzs7O0FBV0EsSUFBTVkscUJBQXFCLEdBQUcsU0FBeEJBLHFCQUF3QixDQUFDWixLQUFELEVBQVFDLE1BQVI7QUFBQSx5Q0FDaENELEtBRGdDO0FBRW5DRixJQUFBQSxPQUFPLEVBQUUsQ0FBQ0UsS0FBSyxDQUFDRjtBQUZtQixLQUdoQ2Esb0JBQW9CLENBQUMsQ0FBQ1gsS0FBSyxDQUFDRixPQUFSLEVBQWlCRSxLQUFqQixDQUhZO0FBQUEsQ0FBOUIsQyxDQU1QOzs7OztBQUNBLFNBQVNXLG9CQUFULENBQThCYixPQUE5QixFQUF1Q0UsS0FBdkMsRUFBOEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUlBLEtBQUssQ0FBQ0YsT0FBTixLQUFrQkEsT0FBdEIsRUFBK0I7QUFDN0IsV0FBTyxFQUFQO0FBQ0Q7O0FBRUQsTUFBTUYsS0FBSyxHQUFHSSxLQUFLLENBQUNGLE9BQU4sSUFBaUIsQ0FBQ0EsT0FBbEIsR0FDWjtBQUNBO0FBQ0FFLEVBQUFBLEtBQUssQ0FBQ0osS0FBTixHQUFjLENBSEYsQ0FJWjtBQUNBO0FBTFksSUFNVkksS0FBSyxDQUFDSixLQUFOLEdBQWMsQ0FObEI7QUFRQSxTQUFPO0FBQ0xBLElBQUFBLEtBQUssRUFBTEE7QUFESyxHQUFQO0FBR0QiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgZ2VvVmlld3BvcnQgZnJvbSAnQG1hcGJveC9nZW8tdmlld3BvcnQnO1xuXG4vKipcbiAqIERlZmF1bHQgaW5pdGlhbCBgbWFwU3RhdGVgXG4gKiBAY29uc3RhbnRcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwaXRjaCAtIERlZmF1bHQ6IDBcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBiZWFyaW5nIC0gRGVmYXVsdDogMFxuICogQHByb3BlcnR5IHtudW1iZXJ9IGxhdGl0dWRlIC0gRGVmYXVsdDogMzcuNzUwNDNcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBsb25naXR1ZGUgLSBEZWZhdWx0OiAtMTIyLjM0Njc5XG4gKiBAcHJvcGVydHkge251bWJlcn0gem9vbSAtIERlZmF1bHQ6IDlcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gZHJhZ1JvdGF0ZSAtIERlZmF1bHQ6IGZhbHNlXG4gKiBAcHJvcGVydHkge251bWJlcn0gd2lkdGggLSBEZWZhdWx0OiA4MDBcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBoZWlnaHQgLSBEZWZhdWx0OiA4MDBcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaXNTcGxpdCAtIERlZmF1bHQ6IGZhbHNlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBJTklUSUFMX01BUF9TVEFURSA9IHtcbiAgcGl0Y2g6IDAsXG4gIGJlYXJpbmc6IDAsXG4gIGxhdGl0dWRlOiAzNy43NTA0MyxcbiAgbG9uZ2l0dWRlOiAtMTIyLjM0Njc5LFxuICB6b29tOiA5LFxuICBkcmFnUm90YXRlOiBmYWxzZSxcbiAgd2lkdGg6IDgwMCxcbiAgaGVpZ2h0OiA4MDAsXG4gIGlzU3BsaXQ6IGZhbHNlXG59O1xuXG4vKiBVcGRhdGVycyAqL1xuZXhwb3J0IGNvbnN0IHVwZGF0ZU1hcFVwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIC4uLihhY3Rpb24ucGF5bG9hZCB8fCB7fSlcbn0pO1xuXG4vKipcbiAqXG4gKiBAcGFyYW0gc3RhdGVcbiAqIEBwYXJhbSBhY3Rpb25cbiAqIEByZXR1cm5zIHt7bGF0aXR1ZGUsIGxvbmdpdHVkZSwgem9vbX19XG4gKi9cbmV4cG9ydCBjb25zdCBmaXRCb3VuZHNVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgY29uc3QgYm91bmRzID0gYWN0aW9uLnBheWxvYWQ7XG4gIGNvbnN0IHtjZW50ZXIsIHpvb219ID0gZ2VvVmlld3BvcnQudmlld3BvcnQoYm91bmRzLCBbXG4gICAgc3RhdGUud2lkdGgsXG4gICAgc3RhdGUuaGVpZ2h0XG4gIF0pO1xuXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgbGF0aXR1ZGU6IGNlbnRlclsxXSxcbiAgICBsb25naXR1ZGU6IGNlbnRlclswXSxcbiAgICB6b29tXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgdG9nZ2xlUGVyc3BlY3RpdmVVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+ICh7XG4gIC4uLnN0YXRlLFxuICAuLi57XG4gICAgcGl0Y2g6IHN0YXRlLmRyYWdSb3RhdGUgPyAwIDogNTAsXG4gICAgYmVhcmluZzogc3RhdGUuZHJhZ1JvdGF0ZSA/IDAgOiAyNFxuICB9LFxuICBkcmFnUm90YXRlOiAhc3RhdGUuZHJhZ1JvdGF0ZVxufSk7XG5cbi8vIGNvbnNpZGVyIGNhc2Ugd2hlcmUgeW91IGhhdmUgYSBzcGxpdCBtYXAgYW5kIHVzZXIgd2FudHMgdG8gcmVzZXRcbmV4cG9ydCBjb25zdCByZWNlaXZlTWFwQ29uZmlnVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIGNvbnN0IHtpc1NwbGl0ID0gZmFsc2V9ID0gYWN0aW9uLnBheWxvYWQubWFwU3RhdGUgfHwge307XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICAuLi4oYWN0aW9uLnBheWxvYWQubWFwU3RhdGUgfHwge30pLFxuICAgIGlzU3BsaXQsXG4gICAgLi4uZ2V0TWFwRGltRm9yU3BsaXRNYXAoaXNTcGxpdCwgc3RhdGUpXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgdG9nZ2xlU3BsaXRNYXBVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBpc1NwbGl0OiAhc3RhdGUuaXNTcGxpdCxcbiAgLi4uZ2V0TWFwRGltRm9yU3BsaXRNYXAoIXN0YXRlLmlzU3BsaXQsIHN0YXRlKVxufSk7XG5cbi8vIEhlbHBlcnNcbmZ1bmN0aW9uIGdldE1hcERpbUZvclNwbGl0TWFwKGlzU3BsaXQsIHN0YXRlKSB7XG4gIC8vIGNhc2VzOlxuICAvLyAxLiBzdGF0ZSBzcGxpdDogdHJ1ZSAtIGlzU3BsaXQ6IHRydWVcbiAgLy8gZG8gbm90aGluZ1xuICAvLyAyLiBzdGF0ZSBzcGxpdDogZmFsc2UgLSBpc1NwbGl0OiBmYWxzZVxuICAvLyBkbyBub3RoaW5nXG4gIGlmIChzdGF0ZS5pc1NwbGl0ID09PSBpc1NwbGl0KSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgY29uc3Qgd2lkdGggPSBzdGF0ZS5pc1NwbGl0ICYmICFpc1NwbGl0ID9cbiAgICAvLyAzLiBzdGF0ZSBzcGxpdDogdHJ1ZSAtIGlzU3BsaXQ6IGZhbHNlXG4gICAgLy8gZG91YmxlIHdpZHRoXG4gICAgc3RhdGUud2lkdGggKiAyXG4gICAgLy8gNC4gc3RhdGUgc3BsaXQ6IGZhbHNlIC0gaXNTcGxpdDogdHJ1ZVxuICAgIC8vIHNwbGl0IHdpZHRoXG4gICAgOiBzdGF0ZS53aWR0aCAvIDI7XG5cbiAgcmV0dXJuIHtcbiAgICB3aWR0aFxuICB9O1xufVxuIl19