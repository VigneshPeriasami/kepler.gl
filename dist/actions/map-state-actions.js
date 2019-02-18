"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleSplitMap = exports.updateMap = exports.fitBounds = exports.togglePerspective = void 0;

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
 *
 * Toggle between 3d and 2d map.
 * @public
 * @example
 * import {togglePerspective} from 'kepler.gl/actions';
 * this.props.dispatch(togglePerspective());
 */
var togglePerspective = (0, _reduxActions.createAction)(_actionTypes.default.TOGGLE_PERSPECTIVE);
/**
 * Fit map viewport to bounds
 * @param {number[]} - bounds as `[lngMin, latMin, lngMax, latMax]`
 * @public
 * @example
 * import {fitBounds} from 'kepler.gl/actions';
 * this.props.dispatch(fitBounds([-122.23, 37.127, -122.11, 37.456]));
 */

exports.togglePerspective = togglePerspective;
var fitBounds = (0, _reduxActions.createAction)(_actionTypes.default.FIT_BOUNDS, function (bounds) {
  return bounds;
});
/**
 * Update map viewport
 * @param {Object} viewport - viewport object container one or any of these properties `width`, `height`, `latitude` `longitude`, `zoom`, `pitch`, `bearing`, `dragRotate`
 * @param {number} [viewport.width] - Width of viewport
 * @param {number} [viewport.height] - Height of viewport
 * @param {number} [viewport.zoom] - Zoom of viewport
 * @param {number} [viewport.pitch] - Camera angle in degrees (0 is straight down)
 * @param {number} [viewport.bearing] - Map rotation in degrees (0 means north is up)
 * @param {number} [viewport.latitude] - Latitude center of viewport on map in mercator projection
 * @param {number} [viewport.longitude] - Longitude Center of viewport on map in mercator projection
 * @param {boolean} [viewport.dragRotate] - Whether to enable drag and rotate map into perspective viewport
 * @public
 * @example
 * import {updateMap} from 'kepler.gl/actions';
 * this.props.dispatch(updateMap({latitude: 37.75043, longitude: -122.34679, width: 800, height: 1200}));
 */

exports.fitBounds = fitBounds;
var updateMap = (0, _reduxActions.createAction)(_actionTypes.default.UPDATE_MAP, function (viewport) {
  return viewport;
});
/**
 * Toggle between one or split maps
 * @public
 * @example
 * import {toggleSplitMap} from 'kepler.gl/actions';
 * this.props.dispatch(toggleSplitMap());
 */

exports.updateMap = updateMap;
var toggleSplitMap = (0, _reduxActions.createAction)(_actionTypes.default.TOGGLE_SPLIT_MAP);
exports.toggleSplitMap = toggleSplitMap;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL21hcC1zdGF0ZS1hY3Rpb25zLmpzIl0sIm5hbWVzIjpbInRvZ2dsZVBlcnNwZWN0aXZlIiwiQWN0aW9uVHlwZXMiLCJUT0dHTEVfUEVSU1BFQ1RJVkUiLCJmaXRCb3VuZHMiLCJGSVRfQk9VTkRTIiwiYm91bmRzIiwidXBkYXRlTWFwIiwiVVBEQVRFX01BUCIsInZpZXdwb3J0IiwidG9nZ2xlU3BsaXRNYXAiLCJUT0dHTEVfU1BMSVRfTUFQIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUtBOzs7Ozs7OztBQVFPLElBQU1BLGlCQUFpQixHQUFHLGdDQUMvQkMscUJBQVlDLGtCQURtQixDQUExQjtBQUlQOzs7Ozs7Ozs7O0FBUU8sSUFBTUMsU0FBUyxHQUFJLGdDQUN4QkYscUJBQVlHLFVBRFksRUFFeEIsVUFBQUMsTUFBTTtBQUFBLFNBQUlBLE1BQUo7QUFBQSxDQUZrQixDQUFuQjtBQUtQOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQk8sSUFBTUMsU0FBUyxHQUFHLGdDQUN2QkwscUJBQVlNLFVBRFcsRUFFdkIsVUFBQUMsUUFBUTtBQUFBLFNBQUlBLFFBQUo7QUFBQSxDQUZlLENBQWxCO0FBS1A7Ozs7Ozs7OztBQU9PLElBQU1DLGNBQWMsR0FBRyxnQ0FDNUJSLHFCQUFZUyxnQkFEZ0IsQ0FBdkIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQge2NyZWF0ZUFjdGlvbn0gZnJvbSAncmVkdXgtYWN0aW9ucyc7XG5pbXBvcnQgQWN0aW9uVHlwZXMgZnJvbSAnY29uc3RhbnRzL2FjdGlvbi10eXBlcyc7XG5cbi8qKlxuICpcbiAqIFRvZ2dsZSBiZXR3ZWVuIDNkIGFuZCAyZCBtYXAuXG4gKiBAcHVibGljXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IHt0b2dnbGVQZXJzcGVjdGl2ZX0gZnJvbSAna2VwbGVyLmdsL2FjdGlvbnMnO1xuICogdGhpcy5wcm9wcy5kaXNwYXRjaCh0b2dnbGVQZXJzcGVjdGl2ZSgpKTtcbiAqL1xuZXhwb3J0IGNvbnN0IHRvZ2dsZVBlcnNwZWN0aXZlID0gY3JlYXRlQWN0aW9uKFxuICBBY3Rpb25UeXBlcy5UT0dHTEVfUEVSU1BFQ1RJVkVcbik7XG5cbi8qKlxuICogRml0IG1hcCB2aWV3cG9ydCB0byBib3VuZHNcbiAqIEBwYXJhbSB7bnVtYmVyW119IC0gYm91bmRzIGFzIGBbbG5nTWluLCBsYXRNaW4sIGxuZ01heCwgbGF0TWF4XWBcbiAqIEBwdWJsaWNcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQge2ZpdEJvdW5kc30gZnJvbSAna2VwbGVyLmdsL2FjdGlvbnMnO1xuICogdGhpcy5wcm9wcy5kaXNwYXRjaChmaXRCb3VuZHMoWy0xMjIuMjMsIDM3LjEyNywgLTEyMi4xMSwgMzcuNDU2XSkpO1xuICovXG5leHBvcnQgY29uc3QgZml0Qm91bmRzID0gIGNyZWF0ZUFjdGlvbihcbiAgQWN0aW9uVHlwZXMuRklUX0JPVU5EUyxcbiAgYm91bmRzID0+IGJvdW5kc1xuKTtcblxuLyoqXG4gKiBVcGRhdGUgbWFwIHZpZXdwb3J0XG4gKiBAcGFyYW0ge09iamVjdH0gdmlld3BvcnQgLSB2aWV3cG9ydCBvYmplY3QgY29udGFpbmVyIG9uZSBvciBhbnkgb2YgdGhlc2UgcHJvcGVydGllcyBgd2lkdGhgLCBgaGVpZ2h0YCwgYGxhdGl0dWRlYCBgbG9uZ2l0dWRlYCwgYHpvb21gLCBgcGl0Y2hgLCBgYmVhcmluZ2AsIGBkcmFnUm90YXRlYFxuICogQHBhcmFtIHtudW1iZXJ9IFt2aWV3cG9ydC53aWR0aF0gLSBXaWR0aCBvZiB2aWV3cG9ydFxuICogQHBhcmFtIHtudW1iZXJ9IFt2aWV3cG9ydC5oZWlnaHRdIC0gSGVpZ2h0IG9mIHZpZXdwb3J0XG4gKiBAcGFyYW0ge251bWJlcn0gW3ZpZXdwb3J0Lnpvb21dIC0gWm9vbSBvZiB2aWV3cG9ydFxuICogQHBhcmFtIHtudW1iZXJ9IFt2aWV3cG9ydC5waXRjaF0gLSBDYW1lcmEgYW5nbGUgaW4gZGVncmVlcyAoMCBpcyBzdHJhaWdodCBkb3duKVxuICogQHBhcmFtIHtudW1iZXJ9IFt2aWV3cG9ydC5iZWFyaW5nXSAtIE1hcCByb3RhdGlvbiBpbiBkZWdyZWVzICgwIG1lYW5zIG5vcnRoIGlzIHVwKVxuICogQHBhcmFtIHtudW1iZXJ9IFt2aWV3cG9ydC5sYXRpdHVkZV0gLSBMYXRpdHVkZSBjZW50ZXIgb2Ygdmlld3BvcnQgb24gbWFwIGluIG1lcmNhdG9yIHByb2plY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSBbdmlld3BvcnQubG9uZ2l0dWRlXSAtIExvbmdpdHVkZSBDZW50ZXIgb2Ygdmlld3BvcnQgb24gbWFwIGluIG1lcmNhdG9yIHByb2plY3Rpb25cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3ZpZXdwb3J0LmRyYWdSb3RhdGVdIC0gV2hldGhlciB0byBlbmFibGUgZHJhZyBhbmQgcm90YXRlIG1hcCBpbnRvIHBlcnNwZWN0aXZlIHZpZXdwb3J0XG4gKiBAcHVibGljXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IHt1cGRhdGVNYXB9IGZyb20gJ2tlcGxlci5nbC9hY3Rpb25zJztcbiAqIHRoaXMucHJvcHMuZGlzcGF0Y2godXBkYXRlTWFwKHtsYXRpdHVkZTogMzcuNzUwNDMsIGxvbmdpdHVkZTogLTEyMi4zNDY3OSwgd2lkdGg6IDgwMCwgaGVpZ2h0OiAxMjAwfSkpO1xuICovXG5leHBvcnQgY29uc3QgdXBkYXRlTWFwID0gY3JlYXRlQWN0aW9uKFxuICBBY3Rpb25UeXBlcy5VUERBVEVfTUFQLFxuICB2aWV3cG9ydCA9PiB2aWV3cG9ydFxuKTtcblxuLyoqXG4gKiBUb2dnbGUgYmV0d2VlbiBvbmUgb3Igc3BsaXQgbWFwc1xuICogQHB1YmxpY1xuICogQGV4YW1wbGVcbiAqIGltcG9ydCB7dG9nZ2xlU3BsaXRNYXB9IGZyb20gJ2tlcGxlci5nbC9hY3Rpb25zJztcbiAqIHRoaXMucHJvcHMuZGlzcGF0Y2godG9nZ2xlU3BsaXRNYXAoKSk7XG4gKi9cbmV4cG9ydCBjb25zdCB0b2dnbGVTcGxpdE1hcCA9IGNyZWF0ZUFjdGlvbihcbiAgQWN0aW9uVHlwZXMuVE9HR0xFX1NQTElUX01BUFxuKTtcbiJdfQ==