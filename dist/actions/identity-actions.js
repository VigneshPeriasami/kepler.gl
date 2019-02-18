"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renameEntry = exports.deleteEntry = exports.registerEntry = void 0;

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
 * Add a new kepler.gl instance in `keplerGlReducer`. This action is called under-the-hood when a `KeplerGl` component is **mounted** to the dom.
 * Note that if you dispatch actions such as adding data to a kepler.gl instance before the React component is mounted, the action will not be
 * performed. Instance reducer can only handle actions when it is instantiated.
 * @param {Object} payload
 * @param {string} payload.id - ***required** The id of the instance
 * @param {boolean} payload.mint - Whether to use a fresh empty state, when `mint: true` it will *always* load a fresh state when the component is re-mounted.
 * When `mint: false` it will register with existing instance state under the same `id`, when the component is unmounted then mounted again. Default: `true`
 * @param {string} payload.mapboxApiAccessToken - mapboxApiAccessToken to be saved in `map-style` reducer.
 * @public
 */
var registerEntry = (0, _reduxActions.createAction)(_actionTypes.default.REGISTER_ENTRY, function (_ref) {
  var id = _ref.id,
      mint = _ref.mint,
      mapboxApiAccessToken = _ref.mapboxApiAccessToken;
  return {
    id: id,
    mint: mint,
    mapboxApiAccessToken: mapboxApiAccessToken
  };
});
/**
 *
 * Delete an instance from `keplerGlReducer`. This action is called under-the-hood when a `KeplerGl` component is **un-mounted** to the dom.
 * If `mint` is set to be `true` in the component prop, the instance state will be deleted from the root reducer. Otherwise, the root reducer will keep
 * the instance state and later transfer it to a newly mounted component with the same `id`
 * @param {string} id - the id of the instance to be deleted
 * @public
 */

exports.registerEntry = registerEntry;
var deleteEntry = (0, _reduxActions.createAction)(_actionTypes.default.DELETE_ENTRY, function (id) {
  return id;
});
/**
 *
 * Rename an instance in the root reducer, keep its entire state
 * @param {string} oldId - ***required** old id
 * @param {string} newId - ***required** new id
 * @public
 */

exports.deleteEntry = deleteEntry;
var renameEntry = (0, _reduxActions.createAction)(_actionTypes.default.RENAME_ENTRY, function (oldId, newId) {
  return {
    oldId: oldId,
    newId: newId
  };
});
exports.renameEntry = renameEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL2lkZW50aXR5LWFjdGlvbnMuanMiXSwibmFtZXMiOlsicmVnaXN0ZXJFbnRyeSIsIkFjdGlvblR5cGVzIiwiUkVHSVNURVJfRU5UUlkiLCJpZCIsIm1pbnQiLCJtYXBib3hBcGlBY2Nlc3NUb2tlbiIsImRlbGV0ZUVudHJ5IiwiREVMRVRFX0VOVFJZIiwicmVuYW1lRW50cnkiLCJSRU5BTUVfRU5UUlkiLCJvbGRJZCIsIm5ld0lkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUtBOzs7Ozs7Ozs7Ozs7QUFZTyxJQUFNQSxhQUFhLEdBQUcsZ0NBQzNCQyxxQkFBWUMsY0FEZSxFQUUzQjtBQUFBLE1BQUVDLEVBQUYsUUFBRUEsRUFBRjtBQUFBLE1BQU1DLElBQU4sUUFBTUEsSUFBTjtBQUFBLE1BQVlDLG9CQUFaLFFBQVlBLG9CQUFaO0FBQUEsU0FBdUM7QUFBQ0YsSUFBQUEsRUFBRSxFQUFGQSxFQUFEO0FBQUtDLElBQUFBLElBQUksRUFBSkEsSUFBTDtBQUFXQyxJQUFBQSxvQkFBb0IsRUFBcEJBO0FBQVgsR0FBdkM7QUFBQSxDQUYyQixDQUF0QjtBQUtQOzs7Ozs7Ozs7O0FBUU8sSUFBTUMsV0FBVyxHQUFHLGdDQUN6QkwscUJBQVlNLFlBRGEsRUFFekIsVUFBQUosRUFBRTtBQUFBLFNBQUlBLEVBQUo7QUFBQSxDQUZ1QixDQUFwQjtBQUtQOzs7Ozs7Ozs7QUFPTyxJQUFNSyxXQUFXLEdBQUcsZ0NBQ3pCUCxxQkFBWVEsWUFEYSxFQUV6QixVQUFDQyxLQUFELEVBQVFDLEtBQVI7QUFBQSxTQUFtQjtBQUFDRCxJQUFBQSxLQUFLLEVBQUxBLEtBQUQ7QUFBUUMsSUFBQUEsS0FBSyxFQUFMQTtBQUFSLEdBQW5CO0FBQUEsQ0FGeUIsQ0FBcEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQge2NyZWF0ZUFjdGlvbn0gZnJvbSAncmVkdXgtYWN0aW9ucyc7XG5pbXBvcnQgQWN0aW9uVHlwZXMgZnJvbSAnY29uc3RhbnRzL2FjdGlvbi10eXBlcyc7XG5cbi8qKlxuICpcbiAqIEFkZCBhIG5ldyBrZXBsZXIuZ2wgaW5zdGFuY2UgaW4gYGtlcGxlckdsUmVkdWNlcmAuIFRoaXMgYWN0aW9uIGlzIGNhbGxlZCB1bmRlci10aGUtaG9vZCB3aGVuIGEgYEtlcGxlckdsYCBjb21wb25lbnQgaXMgKiptb3VudGVkKiogdG8gdGhlIGRvbS5cbiAqIE5vdGUgdGhhdCBpZiB5b3UgZGlzcGF0Y2ggYWN0aW9ucyBzdWNoIGFzIGFkZGluZyBkYXRhIHRvIGEga2VwbGVyLmdsIGluc3RhbmNlIGJlZm9yZSB0aGUgUmVhY3QgY29tcG9uZW50IGlzIG1vdW50ZWQsIHRoZSBhY3Rpb24gd2lsbCBub3QgYmVcbiAqIHBlcmZvcm1lZC4gSW5zdGFuY2UgcmVkdWNlciBjYW4gb25seSBoYW5kbGUgYWN0aW9ucyB3aGVuIGl0IGlzIGluc3RhbnRpYXRlZC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXlsb2FkXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF5bG9hZC5pZCAtICoqKnJlcXVpcmVkKiogVGhlIGlkIG9mIHRoZSBpbnN0YW5jZVxuICogQHBhcmFtIHtib29sZWFufSBwYXlsb2FkLm1pbnQgLSBXaGV0aGVyIHRvIHVzZSBhIGZyZXNoIGVtcHR5IHN0YXRlLCB3aGVuIGBtaW50OiB0cnVlYCBpdCB3aWxsICphbHdheXMqIGxvYWQgYSBmcmVzaCBzdGF0ZSB3aGVuIHRoZSBjb21wb25lbnQgaXMgcmUtbW91bnRlZC5cbiAqIFdoZW4gYG1pbnQ6IGZhbHNlYCBpdCB3aWxsIHJlZ2lzdGVyIHdpdGggZXhpc3RpbmcgaW5zdGFuY2Ugc3RhdGUgdW5kZXIgdGhlIHNhbWUgYGlkYCwgd2hlbiB0aGUgY29tcG9uZW50IGlzIHVubW91bnRlZCB0aGVuIG1vdW50ZWQgYWdhaW4uIERlZmF1bHQ6IGB0cnVlYFxuICogQHBhcmFtIHtzdHJpbmd9IHBheWxvYWQubWFwYm94QXBpQWNjZXNzVG9rZW4gLSBtYXBib3hBcGlBY2Nlc3NUb2tlbiB0byBiZSBzYXZlZCBpbiBgbWFwLXN0eWxlYCByZWR1Y2VyLlxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgcmVnaXN0ZXJFbnRyeSA9IGNyZWF0ZUFjdGlvbihcbiAgQWN0aW9uVHlwZXMuUkVHSVNURVJfRU5UUlksXG4gICh7aWQsIG1pbnQsIG1hcGJveEFwaUFjY2Vzc1Rva2VufSkgPT4gKHtpZCwgbWludCwgbWFwYm94QXBpQWNjZXNzVG9rZW59KVxuKTtcblxuLyoqXG4gKlxuICogRGVsZXRlIGFuIGluc3RhbmNlIGZyb20gYGtlcGxlckdsUmVkdWNlcmAuIFRoaXMgYWN0aW9uIGlzIGNhbGxlZCB1bmRlci10aGUtaG9vZCB3aGVuIGEgYEtlcGxlckdsYCBjb21wb25lbnQgaXMgKip1bi1tb3VudGVkKiogdG8gdGhlIGRvbS5cbiAqIElmIGBtaW50YCBpcyBzZXQgdG8gYmUgYHRydWVgIGluIHRoZSBjb21wb25lbnQgcHJvcCwgdGhlIGluc3RhbmNlIHN0YXRlIHdpbGwgYmUgZGVsZXRlZCBmcm9tIHRoZSByb290IHJlZHVjZXIuIE90aGVyd2lzZSwgdGhlIHJvb3QgcmVkdWNlciB3aWxsIGtlZXBcbiAqIHRoZSBpbnN0YW5jZSBzdGF0ZSBhbmQgbGF0ZXIgdHJhbnNmZXIgaXQgdG8gYSBuZXdseSBtb3VudGVkIGNvbXBvbmVudCB3aXRoIHRoZSBzYW1lIGBpZGBcbiAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIHRoZSBpZCBvZiB0aGUgaW5zdGFuY2UgdG8gYmUgZGVsZXRlZFxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgZGVsZXRlRW50cnkgPSBjcmVhdGVBY3Rpb24oXG4gIEFjdGlvblR5cGVzLkRFTEVURV9FTlRSWSxcbiAgaWQgPT4gaWRcbik7XG5cbi8qKlxuICpcbiAqIFJlbmFtZSBhbiBpbnN0YW5jZSBpbiB0aGUgcm9vdCByZWR1Y2VyLCBrZWVwIGl0cyBlbnRpcmUgc3RhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBvbGRJZCAtICoqKnJlcXVpcmVkKiogb2xkIGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gbmV3SWQgLSAqKipyZXF1aXJlZCoqIG5ldyBpZFxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgcmVuYW1lRW50cnkgPSBjcmVhdGVBY3Rpb24oXG4gIEFjdGlvblR5cGVzLlJFTkFNRV9FTlRSWSxcbiAgKG9sZElkLCBuZXdJZCkgPT4gKHtvbGRJZCwgbmV3SWR9KVxuKTtcbiJdfQ==