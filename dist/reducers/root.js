"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.provideInitialState = provideInitialState;
exports.default = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread4 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _reduxActions = require("redux-actions");

var _actionWrapper = require("../actions/action-wrapper");

var _actions = require("../actions/actions");

var _core = require("./core");

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
// INITIAL_STATE
var initialCoreState = {};

function provideInitialState(initialState) {
  var coreReducer = (0, _core.coreReducerFactory)(initialState);

  var handleRegisterEntry = function handleRegisterEntry(state, _ref) {
    var _ref$payload = _ref.payload,
        id = _ref$payload.id,
        mint = _ref$payload.mint,
        mapboxApiAccessToken = _ref$payload.mapboxApiAccessToken;
    return (0, _objectSpread4.default)({}, state, (0, _defineProperty2.default)({}, id, state[id] && mint === false ? state[id] : (0, _objectSpread4.default)({}, coreReducer(undefined, (0, _actions.keplerGlInit)({
      mapboxApiAccessToken: mapboxApiAccessToken
    })))));
  };

  var handleDeleteEntry = function handleDeleteEntry(state, _ref2) {
    var id = _ref2.payload;
    return Object.keys(state).reduce(function (accu, curr) {
      return (0, _objectSpread4.default)({}, accu, curr === id ? {} : (0, _defineProperty2.default)({}, curr, state[curr]));
    }, {});
  };

  var handleRenameEntry = function handleRenameEntry(state, _ref4) {
    var _ref4$payload = _ref4.payload,
        oldId = _ref4$payload.oldId,
        newId = _ref4$payload.newId;
    return Object.keys(state).reduce(function (accu, curr) {
      return (0, _objectSpread4.default)({}, accu, (0, _defineProperty2.default)({}, curr === oldId ? newId : curr, state[curr]));
    }, {});
  };

  return function () {
    var _handleActions;

    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialCoreState;
    var action = arguments.length > 1 ? arguments[1] : undefined;
    // update child states
    Object.keys(state).forEach(function (id) {
      var updateItemState = coreReducer(state[id], (0, _actionWrapper._actionFor)(id, action));
      state = (0, _actionWrapper._updateProperty)(state, id, updateItemState);
    }); // perform additional state reducing (e.g. switch action.type etc...)

    return (0, _reduxActions.handleActions)((_handleActions = {}, (0, _defineProperty2.default)(_handleActions, _actionTypes.default.REGISTER_ENTRY, handleRegisterEntry), (0, _defineProperty2.default)(_handleActions, _actionTypes.default.DELETE_ENTRY, handleDeleteEntry), (0, _defineProperty2.default)(_handleActions, _actionTypes.default.RENAME_ENTRY, handleRenameEntry), _handleActions), initialCoreState)(state, action);
  };
}

var keplerGlReducer = provideInitialState();

function mergeInitialState() {
  var saved = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var provided = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var keys = ['mapState', 'mapStyle', 'visState', 'uiState']; // shallow merge each reducer

  return keys.reduce(function (accu, key) {
    return (0, _objectSpread4.default)({}, accu, saved[key] && provided[key] ? (0, _defineProperty2.default)({}, key, (0, _objectSpread4.default)({}, saved[key], provided[key])) : (0, _defineProperty2.default)({}, key, saved[key] || provided[key] || {}));
  }, {});
}

function decorate(target) {
  var savedInitialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var targetInitialState = savedInitialState;
  /**
   * Returns a kepler.gl reducer that will also pass each action through additional reducers spiecified.
   * The parameter should be either a reducer map or a reducer function.
   * The state passed into the additional action handler is the instance state.
   * It will include all the subreducers `visState`, `uiState`, `mapState` and `mapStyle`.
   * `.plugin` is only meant to be called once when mounting the keplerGlReducer to the store.
   * **Note** This is an advanced option to give you more freedom to modify the internal state of the kepler.gl instance.
   * You should only use this to adding additional actions instead of replacing default actions.
   *
   * @mixin reducer.plugin
   * @param {Object|Function} customReducer - A reducer map or a reducer
   * @public
   * @example
   * const myKeplerGlReducer = keplerGlReducer
   *  .plugin({
   *    // 1. as reducer map
   *    HIDE_AND_SHOW_SIDE_PANEL: (state, action) => ({
   *      ...state,
   *      uiState: {
   *        ...state.uiState,
   *        readOnly: !state.uiState.readOnly
   *      }
   *    })
   *  })
   * .plugin(handleActions({
   *   // 2. as reducer
   *   'HIDE_MAP_CONTROLS': (state, action) => ({
   *     ...state,
   *     uiState: {
   *       ...state.uiState,
   *       mapControls: hiddenMapControl
   *     }
   *   })
   * }, {}));
   */

  target.plugin = function plugin(customReducer) {
    var _this = this;

    if ((0, _typeof2.default)(customReducer) === 'object') {
      // if only provided a reducerMap, wrap it in a reducer
      customReducer = (0, _reduxActions.handleActions)(customReducer, {});
    } // use 'function' keyword to enable 'this'


    return decorate(function () {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var nextState = _this(state, action); // for each entry in the staten


      Object.keys(nextState).forEach(function (id) {
        // update child states
        nextState = (0, _actionWrapper._updateProperty)(nextState, id, customReducer(nextState[id], (0, _actionWrapper._actionFor)(id, action)));
      });
      return nextState;
    });
  };
  /**
   * REturn a reducer that innitiated with custom initial state.
   * The parameter should be an object mapping from `subreducer` name to custom subreducer state,
   * which will be shallow **merged** with default initial state.
   *
   * Default subreducer state:
   *  - `[visState](./vis-state.md#INITIAL_VIS_STATE)`
   *  - `[mapState](./map-state.md#INITIAL_MAP_STATE)`
   *  - `[mapStyle](./map-style.md#INITIAL_MAP_STYLE)`
   *  - `[uiState](./ui-state.md#INITIAL_UI_STATE)`
   * @mixin reducer.initialState
   * @param {Object} iniSt - custom state to be merged with default initial state
   * @public
   * @example
   * const myKeplerGlReducer = keplerGlReducer
   *  .initialState({
   *    uiState: {readOnly: true}
   *  });
   */


  target.initialState = function initialState(iniSt) {
    var merged = mergeInitialState(targetInitialState, iniSt);
    var targetReducer = provideInitialState(merged);
    return decorate(targetReducer, merged);
  };

  return target;
}

var _default = decorate(keplerGlReducer);

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy9yb290LmpzIl0sIm5hbWVzIjpbImluaXRpYWxDb3JlU3RhdGUiLCJwcm92aWRlSW5pdGlhbFN0YXRlIiwiaW5pdGlhbFN0YXRlIiwiY29yZVJlZHVjZXIiLCJoYW5kbGVSZWdpc3RlckVudHJ5Iiwic3RhdGUiLCJwYXlsb2FkIiwiaWQiLCJtaW50IiwibWFwYm94QXBpQWNjZXNzVG9rZW4iLCJ1bmRlZmluZWQiLCJoYW5kbGVEZWxldGVFbnRyeSIsIk9iamVjdCIsImtleXMiLCJyZWR1Y2UiLCJhY2N1IiwiY3VyciIsImhhbmRsZVJlbmFtZUVudHJ5Iiwib2xkSWQiLCJuZXdJZCIsImFjdGlvbiIsImZvckVhY2giLCJ1cGRhdGVJdGVtU3RhdGUiLCJBY3Rpb25UeXBlcyIsIlJFR0lTVEVSX0VOVFJZIiwiREVMRVRFX0VOVFJZIiwiUkVOQU1FX0VOVFJZIiwia2VwbGVyR2xSZWR1Y2VyIiwibWVyZ2VJbml0aWFsU3RhdGUiLCJzYXZlZCIsInByb3ZpZGVkIiwia2V5IiwiZGVjb3JhdGUiLCJ0YXJnZXQiLCJzYXZlZEluaXRpYWxTdGF0ZSIsInRhcmdldEluaXRpYWxTdGF0ZSIsInBsdWdpbiIsImN1c3RvbVJlZHVjZXIiLCJuZXh0U3RhdGUiLCJpbmlTdCIsIm1lcmdlZCIsInRhcmdldFJlZHVjZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBU0E7QUFDQSxJQUFNQSxnQkFBZ0IsR0FBRyxFQUF6Qjs7QUFFTyxTQUFTQyxtQkFBVCxDQUE2QkMsWUFBN0IsRUFBMkM7QUFDaEQsTUFBTUMsV0FBVyxHQUFHLDhCQUFtQkQsWUFBbkIsQ0FBcEI7O0FBRUEsTUFBTUUsbUJBQW1CLEdBQUcs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SCxDQUFaO0FBS0QsT0FQRDtBQVNBLGFBQU9rQixTQUFQO0FBQ0QsS0FkYyxDQUFmO0FBZUQsR0F0QkQ7QUF3QkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQUwsRUFBQUEsTUFBTSxDQUFDL0IsWUFBUCxHQUFzQixTQUFTQSxZQUFULENBQXNCcUMsS0FBdEIsRUFBNkI7QUFDakQsUUFBTUMsTUFBTSxHQUFHWixpQkFBaUIsQ0FBQ08sa0JBQUQsRUFBcUJJLEtBQXJCLENBQWhDO0FBQ0EsUUFBTUUsYUFBYSxHQUFHeEMsbUJBQW1CLENBQUN1QyxNQUFELENBQXpDO0FBRUEsV0FBT1IsUUFBUSxDQUFDUyxhQUFELEVBQWdCRCxNQUFoQixDQUFmO0FBQ0QsR0FMRDs7QUFPQSxTQUFPUCxNQUFQO0FBQ0Q7O2VBRWNELFFBQVEsQ0FBQ0wsZUFBRCxDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtoYW5kbGVBY3Rpb25zfSBmcm9tICdyZWR1eC1hY3Rpb25zJztcblxuaW1wb3J0IHtfYWN0aW9uRm9yLCBfdXBkYXRlUHJvcGVydHl9IGZyb20gJy4uL2FjdGlvbnMvYWN0aW9uLXdyYXBwZXInO1xuaW1wb3J0IHtrZXBsZXJHbEluaXR9IGZyb20gJy4uL2FjdGlvbnMvYWN0aW9ucyc7XG5pbXBvcnQge2NvcmVSZWR1Y2VyRmFjdG9yeX0gZnJvbSAnLi9jb3JlJztcbmltcG9ydCBBY3Rpb25UeXBlcyBmcm9tICdjb25zdGFudHMvYWN0aW9uLXR5cGVzJztcblxuLy8gSU5JVElBTF9TVEFURVxuY29uc3QgaW5pdGlhbENvcmVTdGF0ZSA9IHt9O1xuXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZUluaXRpYWxTdGF0ZShpbml0aWFsU3RhdGUpIHtcbiAgY29uc3QgY29yZVJlZHVjZXIgPSBjb3JlUmVkdWNlckZhY3RvcnkoaW5pdGlhbFN0YXRlKTtcblxuICBjb25zdCBoYW5kbGVSZWdpc3RlckVudHJ5ID0gKHN0YXRlLCB7cGF5bG9hZDoge2lkLCBtaW50LCBtYXBib3hBcGlBY2Nlc3NUb2tlbn19KSA9PiAoe1xuICAgIC8vIHJlZ2lzdGVyIGEgbmV3IGVudHJ5IHRvIHZveWFnZXIgcmVkdWNlclxuICAgIC8vIGJ5IGRlZmF1bHQsIGFsd2F5cyBjcmVhdGUgYSBtaW50IHN0YXRlIGV2ZW4gaWYgdGhlIHNhbWUgaWQgYWxyZWFkeSBleGlzdFxuICAgIC8vIGlmIHN0YXRlLmlkIGV4aXN0IGFuZCBtaW50PWZhbHNlLCBrZWVwIHRoZSBleGlzdGluZyBzdGF0ZVxuICAgIC4uLnN0YXRlLFxuICAgIFtpZF06IHN0YXRlW2lkXSAmJiBtaW50ID09PSBmYWxzZSA/IHN0YXRlW2lkXSA6IHtcbiAgICAgIC4uLmNvcmVSZWR1Y2VyKHVuZGVmaW5lZCwga2VwbGVyR2xJbml0KHttYXBib3hBcGlBY2Nlc3NUb2tlbn0pKVxuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgaGFuZGxlRGVsZXRlRW50cnkgPSAoc3RhdGUsIHtwYXlsb2FkOiBpZH0pID0+XG4gICAgT2JqZWN0LmtleXMoc3RhdGUpLnJlZHVjZShcbiAgICAgIChhY2N1LCBjdXJyKSA9PiAoe1xuICAgICAgICAuLi5hY2N1LFxuICAgICAgICAuLi4oY3VyciA9PT0gaWQgPyB7fSA6IHtbY3Vycl06IHN0YXRlW2N1cnJdfSlcbiAgICAgIH0pLFxuICAgICAge31cbiAgICApO1xuXG4gIGNvbnN0IGhhbmRsZVJlbmFtZUVudHJ5ID0gKHN0YXRlLCB7cGF5bG9hZDoge29sZElkLCBuZXdJZH19KSA9PlxuICAgIE9iamVjdC5rZXlzKHN0YXRlKS5yZWR1Y2UoXG4gICAgICAoYWNjdSwgY3VycikgPT4gKHtcbiAgICAgICAgLi4uYWNjdSxcbiAgICAgICAgLi4ue1tjdXJyID09PSBvbGRJZCA/IG5ld0lkIDogY3Vycl06IHN0YXRlW2N1cnJdfVxuICAgICAgfSksXG4gICAgICB7fVxuICAgICk7XG5cbiAgcmV0dXJuIChzdGF0ZSA9IGluaXRpYWxDb3JlU3RhdGUsIGFjdGlvbikgPT4ge1xuICAgIC8vIHVwZGF0ZSBjaGlsZCBzdGF0ZXNcbiAgICBPYmplY3Qua2V5cyhzdGF0ZSkuZm9yRWFjaChpZCA9PiB7XG4gICAgICBjb25zdCB1cGRhdGVJdGVtU3RhdGUgPSBjb3JlUmVkdWNlcihzdGF0ZVtpZF0sIF9hY3Rpb25Gb3IoaWQsIGFjdGlvbikpO1xuICAgICAgc3RhdGUgPSBfdXBkYXRlUHJvcGVydHkoc3RhdGUsIGlkLCB1cGRhdGVJdGVtU3RhdGUpO1xuICAgIH0pO1xuXG4gICAgLy8gcGVyZm9ybSBhZGRpdGlvbmFsIHN0YXRlIHJlZHVjaW5nIChlLmcuIHN3aXRjaCBhY3Rpb24udHlwZSBldGMuLi4pXG4gICAgcmV0dXJuIGhhbmRsZUFjdGlvbnMoXG4gICAgICB7XG4gICAgICAgIFtBY3Rpb25UeXBlcy5SRUdJU1RFUl9FTlRSWV06IGhhbmRsZVJlZ2lzdGVyRW50cnksXG4gICAgICAgIFtBY3Rpb25UeXBlcy5ERUxFVEVfRU5UUlldOiBoYW5kbGVEZWxldGVFbnRyeSxcbiAgICAgICAgW0FjdGlvblR5cGVzLlJFTkFNRV9FTlRSWV06IGhhbmRsZVJlbmFtZUVudHJ5XG4gICAgICB9LFxuICAgICAgaW5pdGlhbENvcmVTdGF0ZVxuICAgICkoc3RhdGUsIGFjdGlvbik7XG4gIH07XG59XG5cbmNvbnN0IGtlcGxlckdsUmVkdWNlciA9IHByb3ZpZGVJbml0aWFsU3RhdGUoKTtcblxuZnVuY3Rpb24gbWVyZ2VJbml0aWFsU3RhdGUoc2F2ZWQgPSB7fSwgcHJvdmlkZWQgPSB7fSkge1xuICBjb25zdCBrZXlzID0gWydtYXBTdGF0ZScsICdtYXBTdHlsZScsICd2aXNTdGF0ZScsICd1aVN0YXRlJ107XG5cbiAgLy8gc2hhbGxvdyBtZXJnZSBlYWNoIHJlZHVjZXJcbiAgcmV0dXJuIGtleXMucmVkdWNlKChhY2N1LCBrZXkpID0+ICh7XG4gICAgLi4uYWNjdSxcbiAgICAuLi4oc2F2ZWRba2V5XSAmJiBwcm92aWRlZFtrZXldID9cbiAgICAgICAge1trZXldOiB7Li4uc2F2ZWRba2V5XSwgLi4ucHJvdmlkZWRba2V5XX19IDpcbiAgICAgICAge1trZXldOiBzYXZlZFtrZXldIHx8IHByb3ZpZGVkW2tleV0gfHwge319KVxuICB9KSwge30pO1xufVxuXG5mdW5jdGlvbiBkZWNvcmF0ZSh0YXJnZXQsIHNhdmVkSW5pdGlhbFN0YXRlID0ge30pIHtcbiAgY29uc3QgdGFyZ2V0SW5pdGlhbFN0YXRlID0gc2F2ZWRJbml0aWFsU3RhdGU7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBrZXBsZXIuZ2wgcmVkdWNlciB0aGF0IHdpbGwgYWxzbyBwYXNzIGVhY2ggYWN0aW9uIHRocm91Z2ggYWRkaXRpb25hbCByZWR1Y2VycyBzcGllY2lmaWVkLlxuICAgKiBUaGUgcGFyYW1ldGVyIHNob3VsZCBiZSBlaXRoZXIgYSByZWR1Y2VyIG1hcCBvciBhIHJlZHVjZXIgZnVuY3Rpb24uXG4gICAqIFRoZSBzdGF0ZSBwYXNzZWQgaW50byB0aGUgYWRkaXRpb25hbCBhY3Rpb24gaGFuZGxlciBpcyB0aGUgaW5zdGFuY2Ugc3RhdGUuXG4gICAqIEl0IHdpbGwgaW5jbHVkZSBhbGwgdGhlIHN1YnJlZHVjZXJzIGB2aXNTdGF0ZWAsIGB1aVN0YXRlYCwgYG1hcFN0YXRlYCBhbmQgYG1hcFN0eWxlYC5cbiAgICogYC5wbHVnaW5gIGlzIG9ubHkgbWVhbnQgdG8gYmUgY2FsbGVkIG9uY2Ugd2hlbiBtb3VudGluZyB0aGUga2VwbGVyR2xSZWR1Y2VyIHRvIHRoZSBzdG9yZS5cbiAgICogKipOb3RlKiogVGhpcyBpcyBhbiBhZHZhbmNlZCBvcHRpb24gdG8gZ2l2ZSB5b3UgbW9yZSBmcmVlZG9tIHRvIG1vZGlmeSB0aGUgaW50ZXJuYWwgc3RhdGUgb2YgdGhlIGtlcGxlci5nbCBpbnN0YW5jZS5cbiAgICogWW91IHNob3VsZCBvbmx5IHVzZSB0aGlzIHRvIGFkZGluZyBhZGRpdGlvbmFsIGFjdGlvbnMgaW5zdGVhZCBvZiByZXBsYWNpbmcgZGVmYXVsdCBhY3Rpb25zLlxuICAgKlxuICAgKiBAbWl4aW4gcmVkdWNlci5wbHVnaW5cbiAgICogQHBhcmFtIHtPYmplY3R8RnVuY3Rpb259IGN1c3RvbVJlZHVjZXIgLSBBIHJlZHVjZXIgbWFwIG9yIGEgcmVkdWNlclxuICAgKiBAcHVibGljXG4gICAqIEBleGFtcGxlXG4gICAqIGNvbnN0IG15S2VwbGVyR2xSZWR1Y2VyID0ga2VwbGVyR2xSZWR1Y2VyXG4gICAqICAucGx1Z2luKHtcbiAgICogICAgLy8gMS4gYXMgcmVkdWNlciBtYXBcbiAgICogICAgSElERV9BTkRfU0hPV19TSURFX1BBTkVMOiAoc3RhdGUsIGFjdGlvbikgPT4gKHtcbiAgICogICAgICAuLi5zdGF0ZSxcbiAgICogICAgICB1aVN0YXRlOiB7XG4gICAqICAgICAgICAuLi5zdGF0ZS51aVN0YXRlLFxuICAgKiAgICAgICAgcmVhZE9ubHk6ICFzdGF0ZS51aVN0YXRlLnJlYWRPbmx5XG4gICAqICAgICAgfVxuICAgKiAgICB9KVxuICAgKiAgfSlcbiAgICogLnBsdWdpbihoYW5kbGVBY3Rpb25zKHtcbiAgICogICAvLyAyLiBhcyByZWR1Y2VyXG4gICAqICAgJ0hJREVfTUFQX0NPTlRST0xTJzogKHN0YXRlLCBhY3Rpb24pID0+ICh7XG4gICAqICAgICAuLi5zdGF0ZSxcbiAgICogICAgIHVpU3RhdGU6IHtcbiAgICogICAgICAgLi4uc3RhdGUudWlTdGF0ZSxcbiAgICogICAgICAgbWFwQ29udHJvbHM6IGhpZGRlbk1hcENvbnRyb2xcbiAgICogICAgIH1cbiAgICogICB9KVxuICAgKiB9LCB7fSkpO1xuICAgKi9cbiAgdGFyZ2V0LnBsdWdpbiA9IGZ1bmN0aW9uIHBsdWdpbihjdXN0b21SZWR1Y2VyKSB7XG4gICAgaWYgKHR5cGVvZiBjdXN0b21SZWR1Y2VyID09PSAnb2JqZWN0Jykge1xuICAgICAgLy8gaWYgb25seSBwcm92aWRlZCBhIHJlZHVjZXJNYXAsIHdyYXAgaXQgaW4gYSByZWR1Y2VyXG4gICAgICBjdXN0b21SZWR1Y2VyID0gaGFuZGxlQWN0aW9ucyhjdXN0b21SZWR1Y2VyLCB7fSk7XG4gICAgfVxuXG4gICAgLy8gdXNlICdmdW5jdGlvbicga2V5d29yZCB0byBlbmFibGUgJ3RoaXMnXG4gICAgcmV0dXJuIGRlY29yYXRlKChzdGF0ZSA9IHt9LCBhY3Rpb24gPSB7fSkgPT4ge1xuICAgICAgbGV0IG5leHRTdGF0ZSA9IHRoaXMoc3RhdGUsIGFjdGlvbik7XG5cbiAgICAgIC8vIGZvciBlYWNoIGVudHJ5IGluIHRoZSBzdGF0ZW5cbiAgICAgIE9iamVjdC5rZXlzKG5leHRTdGF0ZSkuZm9yRWFjaChpZCA9PiB7XG4gICAgICAgIC8vIHVwZGF0ZSBjaGlsZCBzdGF0ZXNcbiAgICAgICAgbmV4dFN0YXRlID0gX3VwZGF0ZVByb3BlcnR5KFxuICAgICAgICAgIG5leHRTdGF0ZSxcbiAgICAgICAgICBpZCxcbiAgICAgICAgICBjdXN0b21SZWR1Y2VyKG5leHRTdGF0ZVtpZF0sIF9hY3Rpb25Gb3IoaWQsIGFjdGlvbikpXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIG5leHRTdGF0ZTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogUkV0dXJuIGEgcmVkdWNlciB0aGF0IGlubml0aWF0ZWQgd2l0aCBjdXN0b20gaW5pdGlhbCBzdGF0ZS5cbiAgICogVGhlIHBhcmFtZXRlciBzaG91bGQgYmUgYW4gb2JqZWN0IG1hcHBpbmcgZnJvbSBgc3VicmVkdWNlcmAgbmFtZSB0byBjdXN0b20gc3VicmVkdWNlciBzdGF0ZSxcbiAgICogd2hpY2ggd2lsbCBiZSBzaGFsbG93ICoqbWVyZ2VkKiogd2l0aCBkZWZhdWx0IGluaXRpYWwgc3RhdGUuXG4gICAqXG4gICAqIERlZmF1bHQgc3VicmVkdWNlciBzdGF0ZTpcbiAgICogIC0gYFt2aXNTdGF0ZV0oLi92aXMtc3RhdGUubWQjSU5JVElBTF9WSVNfU1RBVEUpYFxuICAgKiAgLSBgW21hcFN0YXRlXSguL21hcC1zdGF0ZS5tZCNJTklUSUFMX01BUF9TVEFURSlgXG4gICAqICAtIGBbbWFwU3R5bGVdKC4vbWFwLXN0eWxlLm1kI0lOSVRJQUxfTUFQX1NUWUxFKWBcbiAgICogIC0gYFt1aVN0YXRlXSguL3VpLXN0YXRlLm1kI0lOSVRJQUxfVUlfU1RBVEUpYFxuICAgKiBAbWl4aW4gcmVkdWNlci5pbml0aWFsU3RhdGVcbiAgICogQHBhcmFtIHtPYmplY3R9IGluaVN0IC0gY3VzdG9tIHN0YXRlIHRvIGJlIG1lcmdlZCB3aXRoIGRlZmF1bHQgaW5pdGlhbCBzdGF0ZVxuICAgKiBAcHVibGljXG4gICAqIEBleGFtcGxlXG4gICAqIGNvbnN0IG15S2VwbGVyR2xSZWR1Y2VyID0ga2VwbGVyR2xSZWR1Y2VyXG4gICAqICAuaW5pdGlhbFN0YXRlKHtcbiAgICogICAgdWlTdGF0ZToge3JlYWRPbmx5OiB0cnVlfVxuICAgKiAgfSk7XG4gICAqL1xuICB0YXJnZXQuaW5pdGlhbFN0YXRlID0gZnVuY3Rpb24gaW5pdGlhbFN0YXRlKGluaVN0KSB7XG4gICAgY29uc3QgbWVyZ2VkID0gbWVyZ2VJbml0aWFsU3RhdGUodGFyZ2V0SW5pdGlhbFN0YXRlLCBpbmlTdCk7XG4gICAgY29uc3QgdGFyZ2V0UmVkdWNlciA9IHByb3ZpZGVJbml0aWFsU3RhdGUobWVyZ2VkKTtcblxuICAgIHJldHVybiBkZWNvcmF0ZSh0YXJnZXRSZWR1Y2VyLCBtZXJnZWQpO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZGVjb3JhdGUoa2VwbGVyR2xSZWR1Y2VyKTtcbiJdfQ==