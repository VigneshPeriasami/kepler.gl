"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._updateProperty = exports.forwardTo = exports._actionFor = exports.unwrap = exports.isForwardAction = exports.wrapTo = exports.getActionForwardAddress = exports.ADDRESS_PREFIX = exports.FORWARD = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _lodash = _interopRequireDefault(require("lodash.curry"));

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
var FORWARD = '@redux-forward/FORWARD';
exports.FORWARD = FORWARD;
var ADDRESS_PREFIX = '@@KG_';
exports.ADDRESS_PREFIX = ADDRESS_PREFIX;

var getActionForwardAddress = function getActionForwardAddress(id) {
  return "".concat(ADDRESS_PREFIX).concat(id.toUpperCase());
};
/**
 * Wrap an action into a forward action that only modify the state of a specific
 * kepler.gl instance. kepler.gl reducer will look for signatures in the action to
 * determine whether it needs to be forwarded to a specific instance reducer.
 *
 * wrapTo can be curried. You can create a curried action wrapper by only supply the `id` argument
 *
 * A forward action looks like this
 * ```js
 *  {
 *    type: "@@kepler.gl/LAYER_CONFIG_CHANGE",
 *    payload: {
 *      type: '@@kepler.gl/LAYER_CONFIG_CHANGE',
 *      payload: {},
 *      meta: {
 *       // id of instance
 *        _id_: id
 *       // other meta
 *      }
 *    },
 *    meta: {
 *      _forward_: '@redux-forward/FORWARD',
 *      _addr_: '@@KG_id'
 *    }
 *  };
 * ```
 * @param {string} id - The id to forward to
 * @param {Object} action - the action object {type: string, payload: *}
 * @returns {{type: string, payload: {type: string: payload: *, meta: {_id_: string}, meta: {_forward_: string, _addr_: string}}}}
 * @public
 * @example
 *
 * import {wrapTo, togglePerspective} from 'kepler.gl/actions';
 *
 * // This action will only dispatch to the KeplerGl instance with `id: map_1`
 * this.props.dispatch(wrapTo('map_1', togglePerspective()));
 *
 * // You can also create a curried action for each instance
 * const wrapToMap1 = wrapTo('map_1');
 * this.props.dispatch(wrapToMap1(togglePerspective()));
 */


exports.getActionForwardAddress = getActionForwardAddress;
var wrapTo = (0, _lodash.default)(function (id, action) {
  return {
    // keep original action.type
    type: action.type,
    // actual action
    payload: (0, _objectSpread3.default)({}, action, {
      meta: (0, _objectSpread3.default)({}, action.meta, {
        _id_: id
      })
    }),
    // add forward signature to meta
    meta: (0, _objectSpread3.default)({}, action.meta || {}, {
      _forward_: FORWARD,
      _addr_: getActionForwardAddress(id)
    })
  };
});
/**
 * Whether an action is a forward action
 * @param {Object} action - the action object
 * @returns {boolean} boolean - whether the action is a forward action
 * @public
 */

exports.wrapTo = wrapTo;

var isForwardAction = function isForwardAction(action) {
  return Boolean(action && action.meta && action.meta._forward_ === FORWARD);
};
/**
 * Unwrap an action
 * @param {Object} action - the action object
 * @returns {Object} - unwrapped action
 * @public
 */


exports.isForwardAction = isForwardAction;

var unwrap = function unwrap(action) {
  return isForwardAction(action) ? unwrap(action.payload) : action;
};
/**
 * Given an id, returns the action for that id.
 * If the action is not a forward action, return the action
 *
 * @param {String} id
 * @param {Object} action
 * @private
 */


exports.unwrap = unwrap;

var _actionFor = function _actionFor(id, action) {
  return isForwardAction(action) ? action.meta._addr_ === getActionForwardAddress(id) ? action.payload : {} : action;
};
/**
 * Returns an action dispatcher that wraps and forwards the actions to a specific instance
 * @param {string} id - instance id
 * @param {Function} dispatch - action dispatcher
 * @public
 * @example
 *
 * // action and forward dispatcher
 * import {toggleSplitMap, forwardTo} from 'kepler.gl/actions';
 * import {connect} from 'react-redux';
 *
 * const MapContainer = props => (
 *  <div>
 *   <button onClick={() => props.keplerGlDispatch(toggleSplitMap())}/>
 *  </div>
 * )
 *
 * const mapDispatchToProps = (dispatch, props) => ({
 *  dispatch,
 *  keplerGlDispatch: forwardTo(‘foo’, dispatch)
 * });
 *
 * export default connect(
 *  state => state,
 *  mapDispatchToProps
 * )(MapContainer);
 */


exports._actionFor = _actionFor;

var forwardTo = function forwardTo(id, dispatch) {
  return function (action) {
    return dispatch(wrapTo(id, action));
  };
};
/**
 * Update the state of a kepler.gl instance
 * @param {Object} state
 * @param {string} id
 * @param {Object} nextState
 * @private
 */


exports.forwardTo = forwardTo;

var _updateProperty = function _updateProperty(state, id, nextState) {
  return state[id] === nextState ? state : (0, _objectSpread3.default)({}, state, (0, _defineProperty2.default)({}, id, nextState));
};

exports._updateProperty = _updateProperty;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL2FjdGlvbi13cmFwcGVyLmpzIl0sIm5hbWVzIjpbIkZPUldBUkQiLCJBRERSRVNTX1BSRUZJWCIsImdldEFjdGlvbkZvcndhcmRBZGRyZXNzIiwiaWQiLCJ0b1VwcGVyQ2FzZSIsIndyYXBUbyIsImFjdGlvbiIsInR5cGUiLCJwYXlsb2FkIiwibWV0YSIsIl9pZF8iLCJfZm9yd2FyZF8iLCJfYWRkcl8iLCJpc0ZvcndhcmRBY3Rpb24iLCJCb29sZWFuIiwidW53cmFwIiwiX2FjdGlvbkZvciIsImZvcndhcmRUbyIsImRpc3BhdGNoIiwiX3VwZGF0ZVByb3BlcnR5Iiwic3RhdGUiLCJuZXh0U3RhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUF1QkE7O0FBdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRU8sSUFBTUEsT0FBTyxHQUFHLHdCQUFoQjs7QUFDQSxJQUFNQyxjQUFjLEdBQUcsT0FBdkI7OztBQUlBLElBQU1DLHVCQUF1QixHQUFHLFNBQTFCQSx1QkFBMEIsQ0FBQUMsRUFBRTtBQUFBLG1CQUNwQ0YsY0FEb0MsU0FDbkJFLEVBQUUsQ0FBQ0MsV0FBSCxFQURtQjtBQUFBLENBQWxDO0FBR1A7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUNPLElBQU1DLE1BQU0sR0FBRyxxQkFBTSxVQUFDRixFQUFELEVBQUtHLE1BQUw7QUFBQSxTQUFpQjtBQUMzQztBQUNBQyxJQUFBQSxJQUFJLEVBQUVELE1BQU0sQ0FBQ0MsSUFGOEI7QUFJM0M7QUFDQUMsSUFBQUEsT0FBTyxrQ0FDRkYsTUFERTtBQUVMRyxNQUFBQSxJQUFJLGtDQUNDSCxNQUFNLENBQUNHLElBRFI7QUFFRkMsUUFBQUEsSUFBSSxFQUFFUDtBQUZKO0FBRkMsTUFMb0M7QUFhM0M7QUFDQU0sSUFBQUEsSUFBSSxrQ0FDRUgsTUFBTSxDQUFDRyxJQUFQLElBQWUsRUFEakI7QUFFRkUsTUFBQUEsU0FBUyxFQUFFWCxPQUZUO0FBR0ZZLE1BQUFBLE1BQU0sRUFBRVYsdUJBQXVCLENBQUNDLEVBQUQ7QUFIN0I7QUFkdUMsR0FBakI7QUFBQSxDQUFOLENBQWY7QUFxQlA7Ozs7Ozs7OztBQU1PLElBQU1VLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsQ0FBQVAsTUFBTSxFQUFJO0FBQ3ZDLFNBQU9RLE9BQU8sQ0FBQ1IsTUFBTSxJQUFJQSxNQUFNLENBQUNHLElBQWpCLElBQXlCSCxNQUFNLENBQUNHLElBQVAsQ0FBWUUsU0FBWixLQUEwQlgsT0FBcEQsQ0FBZDtBQUNELENBRk07QUFJUDs7Ozs7Ozs7OztBQU1PLElBQU1lLE1BQU0sR0FBRyxTQUFUQSxNQUFTLENBQUFULE1BQU07QUFBQSxTQUMxQk8sZUFBZSxDQUFDUCxNQUFELENBQWYsR0FBMEJTLE1BQU0sQ0FBQ1QsTUFBTSxDQUFDRSxPQUFSLENBQWhDLEdBQW1ERixNQUR6QjtBQUFBLENBQXJCO0FBR1A7Ozs7Ozs7Ozs7OztBQVFPLElBQU1VLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQUNiLEVBQUQsRUFBS0csTUFBTDtBQUFBLFNBQ3hCTyxlQUFlLENBQUNQLE1BQUQsQ0FBZixHQUNJQSxNQUFNLENBQUNHLElBQVAsQ0FBWUcsTUFBWixLQUF1QlYsdUJBQXVCLENBQUNDLEVBQUQsQ0FBOUMsR0FBcURHLE1BQU0sQ0FBQ0UsT0FBNUQsR0FBc0UsRUFEMUUsR0FFSUYsTUFIb0I7QUFBQSxDQUFuQjtBQUtQOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkJPLElBQU1XLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUNkLEVBQUQsRUFBS2UsUUFBTDtBQUFBLFNBQWtCLFVBQUFaLE1BQU07QUFBQSxXQUMvQ1ksUUFBUSxDQUFDYixNQUFNLENBQUNGLEVBQUQsRUFBS0csTUFBTCxDQUFQLENBRHVDO0FBQUEsR0FBeEI7QUFBQSxDQUFsQjtBQUdQOzs7Ozs7Ozs7OztBQU9PLElBQU1hLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsQ0FBQ0MsS0FBRCxFQUFRakIsRUFBUixFQUFZa0IsU0FBWjtBQUFBLFNBQzdCRCxLQUFLLENBQUNqQixFQUFELENBQUwsS0FBY2tCLFNBQWQsR0FDSUQsS0FESixtQ0FHU0EsS0FIVCxvQ0FJT2pCLEVBSlAsRUFJWWtCLFNBSlosRUFENkI7QUFBQSxDQUF4QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmV4cG9ydCBjb25zdCBGT1JXQVJEID0gJ0ByZWR1eC1mb3J3YXJkL0ZPUldBUkQnO1xuZXhwb3J0IGNvbnN0IEFERFJFU1NfUFJFRklYID0gJ0BAS0dfJztcblxuaW1wb3J0IGN1cnJ5IGZyb20gJ2xvZGFzaC5jdXJyeSc7XG5cbmV4cG9ydCBjb25zdCBnZXRBY3Rpb25Gb3J3YXJkQWRkcmVzcyA9IGlkID0+XG4gIGAke0FERFJFU1NfUFJFRklYfSR7aWQudG9VcHBlckNhc2UoKX1gO1xuXG4vKipcbiAqIFdyYXAgYW4gYWN0aW9uIGludG8gYSBmb3J3YXJkIGFjdGlvbiB0aGF0IG9ubHkgbW9kaWZ5IHRoZSBzdGF0ZSBvZiBhIHNwZWNpZmljXG4gKiBrZXBsZXIuZ2wgaW5zdGFuY2UuIGtlcGxlci5nbCByZWR1Y2VyIHdpbGwgbG9vayBmb3Igc2lnbmF0dXJlcyBpbiB0aGUgYWN0aW9uIHRvXG4gKiBkZXRlcm1pbmUgd2hldGhlciBpdCBuZWVkcyB0byBiZSBmb3J3YXJkZWQgdG8gYSBzcGVjaWZpYyBpbnN0YW5jZSByZWR1Y2VyLlxuICpcbiAqIHdyYXBUbyBjYW4gYmUgY3VycmllZC4gWW91IGNhbiBjcmVhdGUgYSBjdXJyaWVkIGFjdGlvbiB3cmFwcGVyIGJ5IG9ubHkgc3VwcGx5IHRoZSBgaWRgIGFyZ3VtZW50XG4gKlxuICogQSBmb3J3YXJkIGFjdGlvbiBsb29rcyBsaWtlIHRoaXNcbiAqIGBgYGpzXG4gKiAge1xuICogICAgdHlwZTogXCJAQGtlcGxlci5nbC9MQVlFUl9DT05GSUdfQ0hBTkdFXCIsXG4gKiAgICBwYXlsb2FkOiB7XG4gKiAgICAgIHR5cGU6ICdAQGtlcGxlci5nbC9MQVlFUl9DT05GSUdfQ0hBTkdFJyxcbiAqICAgICAgcGF5bG9hZDoge30sXG4gKiAgICAgIG1ldGE6IHtcbiAqICAgICAgIC8vIGlkIG9mIGluc3RhbmNlXG4gKiAgICAgICAgX2lkXzogaWRcbiAqICAgICAgIC8vIG90aGVyIG1ldGFcbiAqICAgICAgfVxuICogICAgfSxcbiAqICAgIG1ldGE6IHtcbiAqICAgICAgX2ZvcndhcmRfOiAnQHJlZHV4LWZvcndhcmQvRk9SV0FSRCcsXG4gKiAgICAgIF9hZGRyXzogJ0BAS0dfaWQnXG4gKiAgICB9XG4gKiAgfTtcbiAqIGBgYFxuICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gVGhlIGlkIHRvIGZvcndhcmQgdG9cbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24gLSB0aGUgYWN0aW9uIG9iamVjdCB7dHlwZTogc3RyaW5nLCBwYXlsb2FkOiAqfVxuICogQHJldHVybnMge3t0eXBlOiBzdHJpbmcsIHBheWxvYWQ6IHt0eXBlOiBzdHJpbmc6IHBheWxvYWQ6ICosIG1ldGE6IHtfaWRfOiBzdHJpbmd9LCBtZXRhOiB7X2ZvcndhcmRfOiBzdHJpbmcsIF9hZGRyXzogc3RyaW5nfX19fVxuICogQHB1YmxpY1xuICogQGV4YW1wbGVcbiAqXG4gKiBpbXBvcnQge3dyYXBUbywgdG9nZ2xlUGVyc3BlY3RpdmV9IGZyb20gJ2tlcGxlci5nbC9hY3Rpb25zJztcbiAqXG4gKiAvLyBUaGlzIGFjdGlvbiB3aWxsIG9ubHkgZGlzcGF0Y2ggdG8gdGhlIEtlcGxlckdsIGluc3RhbmNlIHdpdGggYGlkOiBtYXBfMWBcbiAqIHRoaXMucHJvcHMuZGlzcGF0Y2god3JhcFRvKCdtYXBfMScsIHRvZ2dsZVBlcnNwZWN0aXZlKCkpKTtcbiAqXG4gKiAvLyBZb3UgY2FuIGFsc28gY3JlYXRlIGEgY3VycmllZCBhY3Rpb24gZm9yIGVhY2ggaW5zdGFuY2VcbiAqIGNvbnN0IHdyYXBUb01hcDEgPSB3cmFwVG8oJ21hcF8xJyk7XG4gKiB0aGlzLnByb3BzLmRpc3BhdGNoKHdyYXBUb01hcDEodG9nZ2xlUGVyc3BlY3RpdmUoKSkpO1xuICovXG5leHBvcnQgY29uc3Qgd3JhcFRvID0gY3VycnkoKGlkLCBhY3Rpb24pID0+ICh7XG4gIC8vIGtlZXAgb3JpZ2luYWwgYWN0aW9uLnR5cGVcbiAgdHlwZTogYWN0aW9uLnR5cGUsXG5cbiAgLy8gYWN0dWFsIGFjdGlvblxuICBwYXlsb2FkOiB7XG4gICAgLi4uYWN0aW9uLFxuICAgIG1ldGE6IHtcbiAgICAgIC4uLmFjdGlvbi5tZXRhLFxuICAgICAgX2lkXzogaWRcbiAgICB9XG4gIH0sXG5cbiAgLy8gYWRkIGZvcndhcmQgc2lnbmF0dXJlIHRvIG1ldGFcbiAgbWV0YToge1xuICAgIC4uLihhY3Rpb24ubWV0YSB8fCB7fSksXG4gICAgX2ZvcndhcmRfOiBGT1JXQVJELFxuICAgIF9hZGRyXzogZ2V0QWN0aW9uRm9yd2FyZEFkZHJlc3MoaWQpXG4gIH1cbn0pKTtcblxuLyoqXG4gKiBXaGV0aGVyIGFuIGFjdGlvbiBpcyBhIGZvcndhcmQgYWN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uIC0gdGhlIGFjdGlvbiBvYmplY3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBib29sZWFuIC0gd2hldGhlciB0aGUgYWN0aW9uIGlzIGEgZm9yd2FyZCBhY3Rpb25cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IGlzRm9yd2FyZEFjdGlvbiA9IGFjdGlvbiA9PiB7XG4gIHJldHVybiBCb29sZWFuKGFjdGlvbiAmJiBhY3Rpb24ubWV0YSAmJiBhY3Rpb24ubWV0YS5fZm9yd2FyZF8gPT09IEZPUldBUkQpO1xufTtcblxuLyoqXG4gKiBVbndyYXAgYW4gYWN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uIC0gdGhlIGFjdGlvbiBvYmplY3RcbiAqIEByZXR1cm5zIHtPYmplY3R9IC0gdW53cmFwcGVkIGFjdGlvblxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgdW53cmFwID0gYWN0aW9uID0+XG4gIGlzRm9yd2FyZEFjdGlvbihhY3Rpb24pID8gdW53cmFwKGFjdGlvbi5wYXlsb2FkKSA6IGFjdGlvbjtcblxuLyoqXG4gKiBHaXZlbiBhbiBpZCwgcmV0dXJucyB0aGUgYWN0aW9uIGZvciB0aGF0IGlkLlxuICogSWYgdGhlIGFjdGlvbiBpcyBub3QgYSBmb3J3YXJkIGFjdGlvbiwgcmV0dXJuIHRoZSBhY3Rpb25cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb25cbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBfYWN0aW9uRm9yID0gKGlkLCBhY3Rpb24pID0+XG4gIGlzRm9yd2FyZEFjdGlvbihhY3Rpb24pXG4gICAgPyBhY3Rpb24ubWV0YS5fYWRkcl8gPT09IGdldEFjdGlvbkZvcndhcmRBZGRyZXNzKGlkKSA/IGFjdGlvbi5wYXlsb2FkIDoge31cbiAgICA6IGFjdGlvbjtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIGFjdGlvbiBkaXNwYXRjaGVyIHRoYXQgd3JhcHMgYW5kIGZvcndhcmRzIHRoZSBhY3Rpb25zIHRvIGEgc3BlY2lmaWMgaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIGluc3RhbmNlIGlkXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBkaXNwYXRjaCAtIGFjdGlvbiBkaXNwYXRjaGVyXG4gKiBAcHVibGljXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIGFjdGlvbiBhbmQgZm9yd2FyZCBkaXNwYXRjaGVyXG4gKiBpbXBvcnQge3RvZ2dsZVNwbGl0TWFwLCBmb3J3YXJkVG99IGZyb20gJ2tlcGxlci5nbC9hY3Rpb25zJztcbiAqIGltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuICpcbiAqIGNvbnN0IE1hcENvbnRhaW5lciA9IHByb3BzID0+IChcbiAqICA8ZGl2PlxuICogICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHByb3BzLmtlcGxlckdsRGlzcGF0Y2godG9nZ2xlU3BsaXRNYXAoKSl9Lz5cbiAqICA8L2Rpdj5cbiAqIClcbiAqXG4gKiBjb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gsIHByb3BzKSA9PiAoe1xuICogIGRpc3BhdGNoLFxuICogIGtlcGxlckdsRGlzcGF0Y2g6IGZvcndhcmRUbyjigJhmb2/igJksIGRpc3BhdGNoKVxuICogfSk7XG4gKlxuICogZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbiAqICBzdGF0ZSA9PiBzdGF0ZSxcbiAqICBtYXBEaXNwYXRjaFRvUHJvcHNcbiAqICkoTWFwQ29udGFpbmVyKTtcbiAqL1xuZXhwb3J0IGNvbnN0IGZvcndhcmRUbyA9IChpZCwgZGlzcGF0Y2gpID0+IGFjdGlvbiA9PlxuICBkaXNwYXRjaCh3cmFwVG8oaWQsIGFjdGlvbikpO1xuXG4vKipcbiAqIFVwZGF0ZSB0aGUgc3RhdGUgb2YgYSBrZXBsZXIuZ2wgaW5zdGFuY2VcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gKiBAcGFyYW0ge09iamVjdH0gbmV4dFN0YXRlXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgY29uc3QgX3VwZGF0ZVByb3BlcnR5ID0gKHN0YXRlLCBpZCwgbmV4dFN0YXRlKSA9PlxuICBzdGF0ZVtpZF0gPT09IG5leHRTdGF0ZVxuICAgID8gc3RhdGVcbiAgICA6IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIFtpZF06IG5leHRTdGF0ZVxuICAgICAgfTtcbiJdfQ==