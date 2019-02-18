"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContainerFactory = ContainerFactory;
exports.injectComponents = injectComponents;
exports.default = exports.appInjector = exports.errorMsg = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _lodash = _interopRequireDefault(require("lodash.memoize"));

var _window = require("global/window");

var _injector = require("./injector");

var _keplerGl = _interopRequireDefault(require("./kepler-gl"));

var _actionWrapper = require("../actions/action-wrapper");

var _identityActions = require("../actions/identity-actions");

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
var errorMsg = {
  noState: "kepler.gl state doesnt exist. " + "You might forget to mount keplerGlReducer in your root reducer." + "If it is not mounted as state.keplerGl by default, you need to provide getState as a prop",
  wrongType: function wrongType(type) {
    return "injectComponents takes an array of factories replacement pairs as input, " + "".concat(type, " is provided");
  },
  wrongPairType: "injectComponents takes an array of factories replacement pairs as input, " + "each pair be a array as [originalFactory, replacement]"
};
exports.errorMsg = errorMsg;
ContainerFactory.deps = [_keplerGl.default];

function ContainerFactory(KeplerGl) {
  /** @lends KeplerGl */

  /**
    * Main Kepler.gl Component
    * @param {Object} props
    *
    * @param {string} props.id - _required_
    *
    * - Default: `map`
    * The id of this KeplerGl instance. `id` is required if you have multiple
    * KeplerGl instances in your app. It defines the prop name of the KeplerGl state that is
    * stored in the KeplerGl reducer. For example, the state of the KeplerGl component with id `foo` is
    * stored in `state.keplerGl.foo`.
    *
    * In case you create multiple kepler.gl instances using the same id, the kepler.gl state defined by the entry will be
    * overridden by the latest instance and reset to a blank state.
    * @param {string} props.mapboxApiAccessToken - _required_
     * You can create a free account at [www.mapbox.com](www.mapbox.com) and create a token at
    * [www.mapbox.com/account/access-tokens](www.mapbox.com/account/access-tokens)
    *
    *
    * @param {Number} props.width - _required_ Width of the KeplerGl UI.
    * @public
   */
  var Container =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2.default)(Container, _Component);

    // default id and address if not provided
    function Container(props, ctx) {
      var _this;

      (0, _classCallCheck2.default)(this, Container);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Container).call(this, props, ctx));
      _this.getSelector = (0, _lodash.default)(function (id, getState) {
        return function (state) {
          if (!getState(state)) {
            // log error
            _window.console.error(errorMsg.noState);

            return null;
          }

          return getState(state)[id];
        };
      });
      _this.getDispatch = (0, _lodash.default)(function (id, dispatch) {
        return (0, _actionWrapper.forwardTo)(id, dispatch);
      });
      return _this;
    }

    (0, _createClass2.default)(Container, [{
      key: "componentWillMount",
      value: function componentWillMount() {
        var _this$props = this.props,
            id = _this$props.id,
            mint = _this$props.mint,
            mapboxApiAccessToken = _this$props.mapboxApiAccessToken; // add a new entry to reducer

        this.props.dispatch((0, _identityActions.registerEntry)({
          id: id,
          mint: mint,
          mapboxApiAccessToken: mapboxApiAccessToken
        }));
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        // check if id has changed, if true, copy state over
        if (nextProps.id && nextProps.id !== this.props.id) {
          this.props.dispatch((0, _identityActions.renameEntry)(this.props.id, nextProps.id));
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.props.mint !== false) {
          // delete entry in reducer
          this.props.dispatch((0, _identityActions.deleteEntry)(this.props.id));
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props2 = this.props,
            id = _this$props2.id,
            getState = _this$props2.getState,
            dispatch = _this$props2.dispatch,
            state = _this$props2.state;
        var selector = this.getSelector(id, getState);

        if (!selector || !selector(state)) {
          // instance state hasn't been mounted yet
          return _react.default.createElement("div", null);
        }

        return _react.default.createElement(KeplerGl, (0, _extends2.default)({}, this.props, {
          id: id,
          selector: selector,
          dispatch: this.getDispatch(id, dispatch)
        }));
      }
    }]);
    return Container;
  }(_react.Component);

  (0, _defineProperty2.default)(Container, "defaultProps", {
    id: 'map',
    getState: function getState(state) {
      return state.keplerGl;
    },
    mint: true
  });

  var mapStateToProps = function mapStateToProps(state, props) {
    return (0, _objectSpread2.default)({
      state: state
    }, props);
  };

  var dispatchToProps = function dispatchToProps(dispatch) {
    return {
      dispatch: dispatch
    };
  };

  return (0, _reactRedux.connect)(mapStateToProps, dispatchToProps)(Container);
} // entryPoint


function flattenDeps(allDeps, factory) {
  var addToDeps = allDeps.concat([factory]);
  return Array.isArray(factory.deps) && factory.deps.length ? factory.deps.reduce(function (accu, dep) {
    return flattenDeps(accu, dep);
  }, addToDeps) : addToDeps;
}

var allDependencies = flattenDeps([], ContainerFactory); // provide all dependencies to appInjector

var appInjector = allDependencies.reduce(function (inj, factory) {
  return inj.provide(factory, factory);
}, (0, _injector.injector)()); // Helper to inject custom components and return kepler.gl container

exports.appInjector = appInjector;

function injectComponents(recipes) {
  if (!Array.isArray(recipes)) {
    _window.console.error(errorMsg.wrongType((0, _typeof2.default)(recipes)));

    return appInjector.get(ContainerFactory);
  }

  return recipes.reduce(function (inj, recipe) {
    if (!Array.isArray(recipes)) {
      _window.console.error(errorMsg.wrongPairType);

      return inj;
    }

    return inj.provide.apply(inj, (0, _toConsumableArray2.default)(recipe));
  }, appInjector).get(ContainerFactory);
}

var InjectedContainer = appInjector.get(ContainerFactory);
var _default = InjectedContainer;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbnRhaW5lci5qcyJdLCJuYW1lcyI6WyJlcnJvck1zZyIsIm5vU3RhdGUiLCJ3cm9uZ1R5cGUiLCJ0eXBlIiwid3JvbmdQYWlyVHlwZSIsIkNvbnRhaW5lckZhY3RvcnkiLCJkZXBzIiwiS2VwbGVyR2xGYWN0b3J5IiwiS2VwbGVyR2wiLCJDb250YWluZXIiLCJwcm9wcyIsImN0eCIsImdldFNlbGVjdG9yIiwiaWQiLCJnZXRTdGF0ZSIsInN0YXRlIiwiQ29uc29sZSIsImVycm9yIiwiZ2V0RGlzcGF0Y2giLCJkaXNwYXRjaCIsIm1pbnQiLCJtYXBib3hBcGlBY2Nlc3NUb2tlbiIsIm5leHRQcm9wcyIsInNlbGVjdG9yIiwiQ29tcG9uZW50Iiwia2VwbGVyR2wiLCJtYXBTdGF0ZVRvUHJvcHMiLCJkaXNwYXRjaFRvUHJvcHMiLCJmbGF0dGVuRGVwcyIsImFsbERlcHMiLCJmYWN0b3J5IiwiYWRkVG9EZXBzIiwiY29uY2F0IiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwicmVkdWNlIiwiYWNjdSIsImRlcCIsImFsbERlcGVuZGVuY2llcyIsImFwcEluamVjdG9yIiwiaW5qIiwicHJvdmlkZSIsImluamVjdENvbXBvbmVudHMiLCJyZWNpcGVzIiwiZ2V0IiwicmVjaXBlIiwiSW5qZWN0ZWRDb250YWluZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUE1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFnQk8sSUFBTUEsUUFBUSxHQUFHO0FBQ3RCQyxFQUFBQSxPQUFPLEVBQ0wsa01BRm9CO0FBTXRCQyxFQUFBQSxTQUFTLEVBQUUsbUJBQUFDLElBQUk7QUFBQSxX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TVEsZUFBZSxHQUFHWCxXQUFXLENBQUMsRUFBRCxFQUFLdkIsZ0JBQUwsQ0FBbkMsQyxDQUVBOztBQUNPLElBQU1tQyxXQUFXLEdBQUdELGVBQWUsQ0FDdkNILE1BRHdCLENBQ2pCLFVBQUNLLEdBQUQsRUFBTVgsT0FBTjtBQUFBLFNBQWtCVyxHQUFHLENBQUNDLE9BQUosQ0FBWVosT0FBWixFQUFxQkEsT0FBckIsQ0FBbEI7QUFBQSxDQURpQixFQUNnQyx5QkFEaEMsQ0FBcEIsQyxDQUdQOzs7O0FBQ08sU0FBU2EsZ0JBQVQsQ0FBMEJDLE9BQTFCLEVBQW1DO0FBQ3hDLE1BQUksQ0FBQ1gsS0FBSyxDQUFDQyxPQUFOLENBQWNVLE9BQWQsQ0FBTCxFQUE2QjtBQUMzQjVCLG9CQUFRQyxLQUFSLENBQWNqQixRQUFRLENBQUNFLFNBQVQsdUJBQTBCMEMsT0FBMUIsRUFBZDs7QUFDQSxXQUFPSixXQUFXLENBQUNLLEdBQVosQ0FBZ0J4QyxnQkFBaEIsQ0FBUDtBQUNEOztBQUVELFNBQU91QyxPQUFPLENBQ1hSLE1BREksQ0FDRyxVQUFDSyxHQUFELEVBQU1LLE1BQU4sRUFBaUI7QUFDdkIsUUFBSSxDQUFDYixLQUFLLENBQUNDLE9BQU4sQ0FBY1UsT0FBZCxDQUFMLEVBQTZCO0FBQzNCNUIsc0JBQVFDLEtBQVIsQ0FBY2pCLFFBQVEsQ0FBQ0ksYUFBdkI7O0FBQ0EsYUFBT3FDLEdBQVA7QUFDRDs7QUFDRCxXQUFPQSxHQUFHLENBQUNDLE9BQUosT0FBQUQsR0FBRyxtQ0FBWUssTUFBWixFQUFWO0FBQ0QsR0FQSSxFQU9GTixXQVBFLEVBUUpLLEdBUkksQ0FRQXhDLGdCQVJBLENBQVA7QUFTRDs7QUFFRCxJQUFNMEMsaUJBQWlCLEdBQUdQLFdBQVcsQ0FBQ0ssR0FBWixDQUFnQnhDLGdCQUFoQixDQUExQjtlQUVlMEMsaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IG1lbW9pemUgZnJvbSAnbG9kYXNoLm1lbW9pemUnO1xuaW1wb3J0IHtjb25zb2xlIGFzIENvbnNvbGV9IGZyb20gJ2dsb2JhbC93aW5kb3cnO1xuaW1wb3J0IHtpbmplY3Rvcn0gZnJvbSAnLi9pbmplY3Rvcic7XG5pbXBvcnQgS2VwbGVyR2xGYWN0b3J5IGZyb20gJy4va2VwbGVyLWdsJztcbmltcG9ydCB7Zm9yd2FyZFRvfSBmcm9tICdhY3Rpb25zL2FjdGlvbi13cmFwcGVyJztcblxuaW1wb3J0IHtcbiAgcmVnaXN0ZXJFbnRyeSxcbiAgZGVsZXRlRW50cnksXG4gIHJlbmFtZUVudHJ5XG59IGZyb20gJ2FjdGlvbnMvaWRlbnRpdHktYWN0aW9ucyc7XG5cbmV4cG9ydCBjb25zdCBlcnJvck1zZyA9IHtcbiAgbm9TdGF0ZTpcbiAgICBga2VwbGVyLmdsIHN0YXRlIGRvZXNudCBleGlzdC4gYCArXG4gICAgYFlvdSBtaWdodCBmb3JnZXQgdG8gbW91bnQga2VwbGVyR2xSZWR1Y2VyIGluIHlvdXIgcm9vdCByZWR1Y2VyLmAgK1xuICAgIGBJZiBpdCBpcyBub3QgbW91bnRlZCBhcyBzdGF0ZS5rZXBsZXJHbCBieSBkZWZhdWx0LCB5b3UgbmVlZCB0byBwcm92aWRlIGdldFN0YXRlIGFzIGEgcHJvcGAsXG5cbiAgd3JvbmdUeXBlOiB0eXBlID0+IGBpbmplY3RDb21wb25lbnRzIHRha2VzIGFuIGFycmF5IG9mIGZhY3RvcmllcyByZXBsYWNlbWVudCBwYWlycyBhcyBpbnB1dCwgYCArXG4gICAgYCR7dHlwZX0gaXMgcHJvdmlkZWRgLFxuXG4gIHdyb25nUGFpclR5cGU6IGBpbmplY3RDb21wb25lbnRzIHRha2VzIGFuIGFycmF5IG9mIGZhY3RvcmllcyByZXBsYWNlbWVudCBwYWlycyBhcyBpbnB1dCwgYCArXG4gIGBlYWNoIHBhaXIgYmUgYSBhcnJheSBhcyBbb3JpZ2luYWxGYWN0b3J5LCByZXBsYWNlbWVudF1gXG59O1xuXG5Db250YWluZXJGYWN0b3J5LmRlcHMgPSBbS2VwbGVyR2xGYWN0b3J5XTtcblxuZXhwb3J0IGZ1bmN0aW9uIENvbnRhaW5lckZhY3RvcnkoS2VwbGVyR2wpIHtcbiAgLyoqIEBsZW5kcyBLZXBsZXJHbCAqL1xuICAvKipcbiAgICAqIE1haW4gS2VwbGVyLmdsIENvbXBvbmVudFxuICAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzXG4gICAgKlxuICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BzLmlkIC0gX3JlcXVpcmVkX1xuICAgICpcbiAgICAqIC0gRGVmYXVsdDogYG1hcGBcbiAgICAqIFRoZSBpZCBvZiB0aGlzIEtlcGxlckdsIGluc3RhbmNlLiBgaWRgIGlzIHJlcXVpcmVkIGlmIHlvdSBoYXZlIG11bHRpcGxlXG4gICAgKiBLZXBsZXJHbCBpbnN0YW5jZXMgaW4geW91ciBhcHAuIEl0IGRlZmluZXMgdGhlIHByb3AgbmFtZSBvZiB0aGUgS2VwbGVyR2wgc3RhdGUgdGhhdCBpc1xuICAgICogc3RvcmVkIGluIHRoZSBLZXBsZXJHbCByZWR1Y2VyLiBGb3IgZXhhbXBsZSwgdGhlIHN0YXRlIG9mIHRoZSBLZXBsZXJHbCBjb21wb25lbnQgd2l0aCBpZCBgZm9vYCBpc1xuICAgICogc3RvcmVkIGluIGBzdGF0ZS5rZXBsZXJHbC5mb29gLlxuICAgICpcbiAgICAqIEluIGNhc2UgeW91IGNyZWF0ZSBtdWx0aXBsZSBrZXBsZXIuZ2wgaW5zdGFuY2VzIHVzaW5nIHRoZSBzYW1lIGlkLCB0aGUga2VwbGVyLmdsIHN0YXRlIGRlZmluZWQgYnkgdGhlIGVudHJ5IHdpbGwgYmVcbiAgICAqIG92ZXJyaWRkZW4gYnkgdGhlIGxhdGVzdCBpbnN0YW5jZSBhbmQgcmVzZXQgdG8gYSBibGFuayBzdGF0ZS5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wcy5tYXBib3hBcGlBY2Nlc3NUb2tlbiAtIF9yZXF1aXJlZF9cblxuICAgICogWW91IGNhbiBjcmVhdGUgYSBmcmVlIGFjY291bnQgYXQgW3d3dy5tYXBib3guY29tXSh3d3cubWFwYm94LmNvbSkgYW5kIGNyZWF0ZSBhIHRva2VuIGF0XG4gICAgKiBbd3d3Lm1hcGJveC5jb20vYWNjb3VudC9hY2Nlc3MtdG9rZW5zXSh3d3cubWFwYm94LmNvbS9hY2NvdW50L2FjY2Vzcy10b2tlbnMpXG4gICAgKlxuICAgICpcbiAgICAqIEBwYXJhbSB7TnVtYmVyfSBwcm9wcy53aWR0aCAtIF9yZXF1aXJlZF8gV2lkdGggb2YgdGhlIEtlcGxlckdsIFVJLlxuICAgICogQHB1YmxpY1xuICAgKi9cbiAgY2xhc3MgQ29udGFpbmVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICAvLyBkZWZhdWx0IGlkIGFuZCBhZGRyZXNzIGlmIG5vdCBwcm92aWRlZFxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICBpZDogJ21hcCcsXG4gICAgICBnZXRTdGF0ZTogc3RhdGUgPT4gc3RhdGUua2VwbGVyR2wsXG4gICAgICBtaW50OiB0cnVlXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjdHgpIHtcbiAgICAgIHN1cGVyKHByb3BzLCBjdHgpO1xuXG4gICAgICB0aGlzLmdldFNlbGVjdG9yID0gbWVtb2l6ZSgoaWQsIGdldFN0YXRlKSA9PiBzdGF0ZSA9PiB7XG4gICAgICAgIGlmICghZ2V0U3RhdGUoc3RhdGUpKSB7XG4gICAgICAgICAgLy8gbG9nIGVycm9yXG4gICAgICAgICAgQ29uc29sZS5lcnJvcihlcnJvck1zZy5ub1N0YXRlKTtcblxuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBnZXRTdGF0ZShzdGF0ZSlbaWRdO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmdldERpc3BhdGNoID0gbWVtb2l6ZSgoaWQsIGRpc3BhdGNoKSA9PiBmb3J3YXJkVG8oaWQsIGRpc3BhdGNoKSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgY29uc3Qge2lkLCBtaW50LCBtYXBib3hBcGlBY2Nlc3NUb2tlbn0gPSB0aGlzLnByb3BzO1xuICAgICAgLy8gYWRkIGEgbmV3IGVudHJ5IHRvIHJlZHVjZXJcbiAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2gocmVnaXN0ZXJFbnRyeSh7aWQsIG1pbnQsIG1hcGJveEFwaUFjY2Vzc1Rva2VufSkpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAvLyBjaGVjayBpZiBpZCBoYXMgY2hhbmdlZCwgaWYgdHJ1ZSwgY29weSBzdGF0ZSBvdmVyXG4gICAgICBpZiAobmV4dFByb3BzLmlkICYmIG5leHRQcm9wcy5pZCAhPT0gdGhpcy5wcm9wcy5pZCkge1xuICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHJlbmFtZUVudHJ5KHRoaXMucHJvcHMuaWQsIG5leHRQcm9wcy5pZCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgaWYgKHRoaXMucHJvcHMubWludCAhPT0gZmFsc2UpIHtcbiAgICAgICAgLy8gZGVsZXRlIGVudHJ5IGluIHJlZHVjZXJcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaChkZWxldGVFbnRyeSh0aGlzLnByb3BzLmlkKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgY29uc3Qge2lkLCBnZXRTdGF0ZSwgZGlzcGF0Y2gsIHN0YXRlfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBzZWxlY3RvciA9IHRoaXMuZ2V0U2VsZWN0b3IoaWQsIGdldFN0YXRlKTtcblxuICAgICAgaWYgKCFzZWxlY3RvciB8fCAhc2VsZWN0b3Ioc3RhdGUpKSB7XG4gICAgICAgIC8vIGluc3RhbmNlIHN0YXRlIGhhc24ndCBiZWVuIG1vdW50ZWQgeWV0XG4gICAgICAgIHJldHVybiA8ZGl2IC8+O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8S2VwbGVyR2xcbiAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICBpZD17aWR9XG4gICAgICAgICAgc2VsZWN0b3I9e3NlbGVjdG9yfVxuICAgICAgICAgIGRpc3BhdGNoPXt0aGlzLmdldERpc3BhdGNoKGlkLCBkaXNwYXRjaCl9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSwgcHJvcHMpID0+ICh7c3RhdGUsIC4uLnByb3BzfSk7XG4gIGNvbnN0IGRpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+ICh7ZGlzcGF0Y2h9KTtcbiAgcmV0dXJuIGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBkaXNwYXRjaFRvUHJvcHMpKENvbnRhaW5lcik7XG59XG5cbi8vIGVudHJ5UG9pbnRcbmZ1bmN0aW9uIGZsYXR0ZW5EZXBzKGFsbERlcHMsIGZhY3RvcnkpIHtcbiAgY29uc3QgYWRkVG9EZXBzID0gYWxsRGVwcy5jb25jYXQoW2ZhY3RvcnldKTtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoZmFjdG9yeS5kZXBzKSAmJiBmYWN0b3J5LmRlcHMubGVuZ3RoID9cbiAgICBmYWN0b3J5LmRlcHMucmVkdWNlKChhY2N1LCBkZXApID0+IGZsYXR0ZW5EZXBzKGFjY3UsIGRlcCksIGFkZFRvRGVwcykgOlxuICAgIGFkZFRvRGVwcztcbn1cblxuY29uc3QgYWxsRGVwZW5kZW5jaWVzID0gZmxhdHRlbkRlcHMoW10sIENvbnRhaW5lckZhY3RvcnkpO1xuXG4vLyBwcm92aWRlIGFsbCBkZXBlbmRlbmNpZXMgdG8gYXBwSW5qZWN0b3JcbmV4cG9ydCBjb25zdCBhcHBJbmplY3RvciA9IGFsbERlcGVuZGVuY2llc1xuICAucmVkdWNlKChpbmosIGZhY3RvcnkpID0+IGluai5wcm92aWRlKGZhY3RvcnksIGZhY3RvcnkpLCBpbmplY3RvcigpKTtcblxuLy8gSGVscGVyIHRvIGluamVjdCBjdXN0b20gY29tcG9uZW50cyBhbmQgcmV0dXJuIGtlcGxlci5nbCBjb250YWluZXJcbmV4cG9ydCBmdW5jdGlvbiBpbmplY3RDb21wb25lbnRzKHJlY2lwZXMpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KHJlY2lwZXMpKSB7XG4gICAgQ29uc29sZS5lcnJvcihlcnJvck1zZy53cm9uZ1R5cGUodHlwZW9mKHJlY2lwZXMpKSk7XG4gICAgcmV0dXJuIGFwcEluamVjdG9yLmdldChDb250YWluZXJGYWN0b3J5KTtcbiAgfVxuXG4gIHJldHVybiByZWNpcGVzXG4gICAgLnJlZHVjZSgoaW5qLCByZWNpcGUpID0+IHtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShyZWNpcGVzKSkge1xuICAgICAgICBDb25zb2xlLmVycm9yKGVycm9yTXNnLndyb25nUGFpclR5cGUpO1xuICAgICAgICByZXR1cm4gaW5qO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGluai5wcm92aWRlKC4uLnJlY2lwZSk7XG4gICAgfSwgYXBwSW5qZWN0b3IpXG4gICAgLmdldChDb250YWluZXJGYWN0b3J5KTtcbn1cblxuY29uc3QgSW5qZWN0ZWRDb250YWluZXIgPSBhcHBJbmplY3Rvci5nZXQoQ29udGFpbmVyRmFjdG9yeSk7XG5cbmV4cG9ydCBkZWZhdWx0IEluamVjdGVkQ29udGFpbmVyO1xuIl19