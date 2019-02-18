"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injector = injector;
exports.withState = withState;
exports.errorMsg = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread4 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _window = require("global/window");

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
var MissingComp = function MissingComp() {
  return _react.default.createElement("div", null);
};

var errorMsg = {
  noDep: function noDep(fac, parent) {
    return "".concat(fac.name, " is required as a dependency of ").concat(parent.name, ", ") + "but is not provided to injectComponents. It will not be rendered";
  },
  notFunc: '`factory and its replacment should be a function`'
};
exports.errorMsg = errorMsg;

function injector() {
  var map = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var cache = {}; // map<factory, factory -> ?>

  var get = function get(fac, parent) {
    var factory = map[fac]; // factory is not injected

    if (!factory) {
      _window.console.error(errorMsg.noDep(fac, parent));

      return MissingComp;
    }

    var instances = cache[factory] || factory.apply(void 0, (0, _toConsumableArray2.default)(factory.deps ? factory.deps.map(function (dep) {
      return get(dep, factory);
    }) : []));
    cache[fac] = instances;
    return instances;
  }; // if you have two functions that happen to have the exactly same text
  // it will be override: 2018-02-05


  return {
    provide: function provide(factory, replacement) {
      if (typeof factory !== 'function' || typeof replacement !== 'function') {
        _window.console.error(errorMsg.notFunc);

        return injector(map);
      }

      return injector((0, _objectSpread4.default)({}, map, (0, _defineProperty2.default)({}, factory, replacement)));
    },
    get: get
  };
}

var identity = function identity(state) {
  return state;
}; // Helper to add reducer state to custom component


function withState(lenses) {
  var mapStateToProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : identity;
  var actions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return function (Component) {
    var WrappedComponent = function WrappedComponent(_ref, _ref2) {
      var state = _ref.state,
          props = (0, _objectWithoutProperties2.default)(_ref, ["state"]);
      var selector = _ref2.selector,
          id = _ref2.id;
      return _react.default.createElement(Component, lenses.reduce(function (totalState, lens) {
        return (0, _objectSpread4.default)({}, totalState, lens(selector(state)));
      }, props));
    };

    WrappedComponent.contextTypes = {
      selector: _propTypes.default.func,
      id: _propTypes.default.string
    };
    return (0, _reactRedux.connect)(function (state) {
      return (0, _objectSpread4.default)({}, mapStateToProps(state), {
        state: state
      });
    }, function (dispatch) {
      return Object.keys(actions).reduce(function (accu, key) {
        return (0, _objectSpread4.default)({}, accu, (0, _defineProperty2.default)({}, key, (0, _redux.bindActionCreators)(actions[key], dispatch)));
      }, {});
    })(WrappedComponent);
  };
} // Helpter to add actionCreator to custom component
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2luamVjdG9yLmpzIl0sIm5hbWVzIjpbIk1pc3NpbmdDb21wIiwiZXJyb3JNc2ciLCJub0RlcCIsImZhYyIsInBhcmVudCIsIm5hbWUiLCJub3RGdW5jIiwiaW5qZWN0b3IiLCJtYXAiLCJjYWNoZSIsImdldCIsImZhY3RvcnkiLCJDb25zb2xlIiwiZXJyb3IiLCJpbnN0YW5jZXMiLCJkZXBzIiwiZGVwIiwicHJvdmlkZSIsInJlcGxhY2VtZW50IiwiaWRlbnRpdHkiLCJzdGF0ZSIsIndpdGhTdGF0ZSIsImxlbnNlcyIsIm1hcFN0YXRlVG9Qcm9wcyIsImFjdGlvbnMiLCJDb21wb25lbnQiLCJXcmFwcGVkQ29tcG9uZW50IiwicHJvcHMiLCJzZWxlY3RvciIsImlkIiwicmVkdWNlIiwidG90YWxTdGF0ZSIsImxlbnMiLCJjb250ZXh0VHlwZXMiLCJQcm9wVHlwZXMiLCJmdW5jIiwic3RyaW5nIiwiZGlzcGF0Y2giLCJPYmplY3QiLCJrZXlzIiwiYWNjdSIsImtleSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUF4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFRQSxJQUFNQSxXQUFXLEdBQUcsU0FBZEEsV0FBYztBQUFBLFNBQU0seUNBQU47QUFBQSxDQUFwQjs7QUFDTyxJQUFNQyxRQUFRLEdBQUc7QUFDdEJDLEVBQUFBLEtBQUssRUFBRSxlQUFDQyxHQUFELEVBQU1DLE1BQU47QUFBQSxXQUNMLFVBQUdELEdBQUcsQ0FBQ0UsSUFBUCw2Q0FBOENELE1BQU0sQ0FBQ0MsSUFBckQsNEVBREs7QUFBQSxHQURlO0FBSXRCQyxFQUFBQSxPQUFPLEVBQUU7QUFKYSxDQUFqQjs7O0FBT0EsU0FBU0MsUUFBVCxHQUE0QjtBQUFBLE1B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QUNpQixHQUFELENBQTFCLEVBQWlDSixRQUFqQyxDQUYrQjtBQUFBLE9BQTVCLEVBR1IsRUFIUSxDQUFKO0FBQUEsS0FGSCxFQU1MWCxnQkFOSyxDQUFQO0FBT0QsR0F2QkQ7QUF3QkQsQyxDQUVEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtiaW5kQWN0aW9uQ3JlYXRvcnN9IGZyb20gJ3JlZHV4JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQge2NvbnNvbGUgYXMgQ29uc29sZX0gZnJvbSAnZ2xvYmFsL3dpbmRvdyc7XG5cbmNvbnN0IE1pc3NpbmdDb21wID0gKCkgPT4gPGRpdiAvPjtcbmV4cG9ydCBjb25zdCBlcnJvck1zZyA9IHtcbiAgbm9EZXA6IChmYWMsIHBhcmVudCkgPT5cbiAgICBgJHtmYWMubmFtZX0gaXMgcmVxdWlyZWQgYXMgYSBkZXBlbmRlbmN5IG9mICR7cGFyZW50Lm5hbWV9LCBgICtcbiAgICBgYnV0IGlzIG5vdCBwcm92aWRlZCB0byBpbmplY3RDb21wb25lbnRzLiBJdCB3aWxsIG5vdCBiZSByZW5kZXJlZGAsXG4gIG5vdEZ1bmM6ICdgZmFjdG9yeSBhbmQgaXRzIHJlcGxhY21lbnQgc2hvdWxkIGJlIGEgZnVuY3Rpb25gJ1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGluamVjdG9yKG1hcCA9IHt9KSB7XG4gIGNvbnN0IGNhY2hlID0ge307IC8vIG1hcDxmYWN0b3J5LCBmYWN0b3J5IC0+ID8+XG4gIGNvbnN0IGdldCA9IChmYWMsIHBhcmVudCkgPT4ge1xuICAgIGNvbnN0IGZhY3RvcnkgPSBtYXBbZmFjXTtcbiAgICAvLyBmYWN0b3J5IGlzIG5vdCBpbmplY3RlZFxuICAgIGlmICghZmFjdG9yeSkge1xuICAgICAgQ29uc29sZS5lcnJvcihlcnJvck1zZy5ub0RlcChmYWMsIHBhcmVudCkpO1xuICAgICAgcmV0dXJuIE1pc3NpbmdDb21wO1xuICAgIH1cblxuICAgIGNvbnN0IGluc3RhbmNlcyA9XG4gICAgICBjYWNoZVtmYWN0b3J5XSB8fFxuICAgICAgZmFjdG9yeShcbiAgICAgICAgLi4uKGZhY3RvcnkuZGVwcyA/IGZhY3RvcnkuZGVwcy5tYXAoZGVwID0+IGdldChkZXAsIGZhY3RvcnkpKSA6IFtdKVxuICAgICAgKTtcblxuICAgIGNhY2hlW2ZhY10gPSBpbnN0YW5jZXM7XG4gICAgcmV0dXJuIGluc3RhbmNlcztcbiAgfTtcblxuICAvLyBpZiB5b3UgaGF2ZSB0d28gZnVuY3Rpb25zIHRoYXQgaGFwcGVuIHRvIGhhdmUgdGhlIGV4YWN0bHkgc2FtZSB0ZXh0XG4gIC8vIGl0IHdpbGwgYmUgb3ZlcnJpZGU6IDIwMTgtMDItMDVcbiAgcmV0dXJuIHtcbiAgICBwcm92aWRlOiAoZmFjdG9yeSwgcmVwbGFjZW1lbnQpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgZmFjdG9yeSAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgcmVwbGFjZW1lbnQgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgQ29uc29sZS5lcnJvcihlcnJvck1zZy5ub3RGdW5jKTtcbiAgICAgICAgcmV0dXJuIGluamVjdG9yKG1hcCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaW5qZWN0b3Ioey4uLm1hcCwgW2ZhY3RvcnldOiByZXBsYWNlbWVudH0pO1xuICAgIH0sXG4gICAgZ2V0XG4gIH07XG59XG5cbmNvbnN0IGlkZW50aXR5ID0gc3RhdGUgPT4gKHN0YXRlKTtcbi8vIEhlbHBlciB0byBhZGQgcmVkdWNlciBzdGF0ZSB0byBjdXN0b20gY29tcG9uZW50XG5leHBvcnQgZnVuY3Rpb24gd2l0aFN0YXRlKGxlbnNlcywgbWFwU3RhdGVUb1Byb3BzID0gaWRlbnRpdHksIGFjdGlvbnMgPSB7fSkge1xuICByZXR1cm4gKENvbXBvbmVudCkgPT4ge1xuICAgIGNvbnN0IFdyYXBwZWRDb21wb25lbnQgPSAoe3N0YXRlLCAuLi5wcm9wc30sIHtzZWxlY3RvciwgaWR9KSA9PiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHsuLi5sZW5zZXMucmVkdWNlKFxuICAgICAgICAgICh0b3RhbFN0YXRlLCBsZW5zKSA9PiAoe1xuICAgICAgICAgICAgLi4udG90YWxTdGF0ZSxcbiAgICAgICAgICAgIC4uLmxlbnMoc2VsZWN0b3Ioc3RhdGUpKVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIHByb3BzXG4gICAgICAgICl9XG4gICAgICAvPlxuICAgICk7XG4gICAgV3JhcHBlZENvbXBvbmVudC5jb250ZXh0VHlwZXMgPSB7XG4gICAgICBzZWxlY3RvcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBpZDogUHJvcFR5cGVzLnN0cmluZ1xuICAgIH07XG4gICAgcmV0dXJuIGNvbm5lY3QoXG4gICAgICBzdGF0ZSA9PiAoey4uLm1hcFN0YXRlVG9Qcm9wcyhzdGF0ZSksIHN0YXRlfSksXG4gICAgICBkaXNwYXRjaCA9PiBPYmplY3Qua2V5cyhhY3Rpb25zKS5yZWR1Y2UoKGFjY3UsIGtleSkgPT4gKHtcbiAgICAgICAgLi4uYWNjdSxcbiAgICAgICAgW2tleV06IGJpbmRBY3Rpb25DcmVhdG9ycyhhY3Rpb25zW2tleV0sIGRpc3BhdGNoKVxuICAgICAgfSksIHt9KVxuICAgICkoV3JhcHBlZENvbXBvbmVudCk7XG4gIH1cbn1cblxuLy8gSGVscHRlciB0byBhZGQgYWN0aW9uQ3JlYXRvciB0byBjdXN0b20gY29tcG9uZW50XG4iXX0=