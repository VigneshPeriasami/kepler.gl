"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = void 0;

var _reactRedux = require("react-redux");

var _withLocalSelector = _interopRequireDefault(require("./with-local-selector"));

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
var defaultMapStateToProps = function defaultMapStateToProps(state) {
  return state;
};

var defaultMapDispatchToProps = function defaultMapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  };
};

var connect = function connect() {
  var mapStateToProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultMapStateToProps;
  var mapDispatchToProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultMapDispatchToProps;
  var reduxMergeProps = arguments.length > 2 ? arguments[2] : undefined;
  var options = arguments.length > 3 ? arguments[3] : undefined;
  return function (BaseComponent) {
    var reduxMapState = function reduxMapState(state, props) {
      return mapStateToProps(props.selector(state), props, state);
    };

    var reduxMapDispatch = function reduxMapDispatch(dispatch, props) {
      return mapDispatchToProps(props.dispatch, props, dispatch);
    }; // const reduxMergeProps = (stateProps, dispatchProps, ownProps) =>
    //   ({ ...stateProps, ...dispatchProps, ...ownProps });


    var ReduxComponent = (0, _reactRedux.connect)(reduxMapState, reduxMapDispatch, reduxMergeProps, options)(BaseComponent); // save selector to context so it can be accessed by its children

    return (0, _withLocalSelector.default)(ReduxComponent);
  };
};

exports.connect = connect;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25uZWN0L2tlcGxlcmdsLWNvbm5lY3QuanMiXSwibmFtZXMiOlsiZGVmYXVsdE1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwiZGVmYXVsdE1hcERpc3BhdGNoVG9Qcm9wcyIsImRpc3BhdGNoIiwiY29ubmVjdCIsIm1hcFN0YXRlVG9Qcm9wcyIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsInJlZHV4TWVyZ2VQcm9wcyIsIm9wdGlvbnMiLCJCYXNlQ29tcG9uZW50IiwicmVkdXhNYXBTdGF0ZSIsInByb3BzIiwic2VsZWN0b3IiLCJyZWR1eE1hcERpc3BhdGNoIiwiUmVkdXhDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQSxJQUFNQSxzQkFBc0IsR0FBRyxTQUF6QkEsc0JBQXlCLENBQUFDLEtBQUs7QUFBQSxTQUFJQSxLQUFKO0FBQUEsQ0FBcEM7O0FBQ0EsSUFBTUMseUJBQXlCLEdBQUcsU0FBNUJBLHlCQUE0QixDQUFBQyxRQUFRO0FBQUEsU0FBSztBQUFDQSxJQUFBQSxRQUFRLEVBQVJBO0FBQUQsR0FBTDtBQUFBLENBQTFDOztBQUVPLElBQU1DLE9BQU8sR0FBRyxTQUFWQSxPQUFVO0FBQUEsTUFDckJDLGVBRHFCLHVFQUNITCxzQkFERztBQUFBLE1BRXJCTSxrQkFGcUIsdUVBRUFKLHlCQUZBO0FBQUEsTUFHckJLLGVBSHFCO0FBQUEsTUFJckJDLE9BSnFCO0FBQUEsU0FLbEIsVUFBQUMsYUFBYSxFQUFJO0FBQ3BCLFFBQU1DLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBQ1QsS0FBRCxFQUFRVSxLQUFSO0FBQUEsYUFDcEJOLGVBQWUsQ0FBQ00sS0FBSyxDQUFDQyxRQUFOLENBQWVYLEtBQWYsQ0FBRCxFQUF3QlUsS0FBeEIsRUFBK0JWLEtBQS9CLENBREs7QUFBQSxLQUF0Qjs7QUFHQSxRQUFNWSxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CLENBQUNWLFFBQUQsRUFBV1EsS0FBWDtBQUFBLGFBQ3ZCTCxrQkFBa0IsQ0FBQ0ssS0FBSyxDQUFDUixRQUFQLEVBQWlCUSxLQUFqQixFQUF3QlIsUUFBeEIsQ0FESztBQUFBLEtBQXpCLENBSm9CLENBT3BCO0FBQ0E7OztBQUVBLFFBQU1XLGNBQWMsR0FBRyx5QkFDckJKLGFBRHFCLEVBRXJCRyxnQkFGcUIsRUFHckJOLGVBSHFCLEVBSXJCQyxPQUpxQixFQUtyQkMsYUFMcUIsQ0FBdkIsQ0FWb0IsQ0FpQnBCOztBQUNBLFdBQU8sZ0NBQWtCSyxjQUFsQixDQUFQO0FBQ0QsR0F4QnNCO0FBQUEsQ0FBaEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQge2Nvbm5lY3QgYXMgcmVkdXhDb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgd2l0aExvY2FsU2VsZWN0b3IgZnJvbSAnLi93aXRoLWxvY2FsLXNlbGVjdG9yJztcblxuY29uc3QgZGVmYXVsdE1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IHN0YXRlO1xuY29uc3QgZGVmYXVsdE1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+ICh7ZGlzcGF0Y2h9KTtcblxuZXhwb3J0IGNvbnN0IGNvbm5lY3QgPSAoXG4gIG1hcFN0YXRlVG9Qcm9wcyA9IGRlZmF1bHRNYXBTdGF0ZVRvUHJvcHMsXG4gIG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRlZmF1bHRNYXBEaXNwYXRjaFRvUHJvcHMsXG4gIHJlZHV4TWVyZ2VQcm9wcyxcbiAgb3B0aW9uc1xuKSA9PiBCYXNlQ29tcG9uZW50ID0+IHtcbiAgY29uc3QgcmVkdXhNYXBTdGF0ZSA9IChzdGF0ZSwgcHJvcHMpID0+XG4gICAgbWFwU3RhdGVUb1Byb3BzKHByb3BzLnNlbGVjdG9yKHN0YXRlKSwgcHJvcHMsIHN0YXRlKTtcblxuICBjb25zdCByZWR1eE1hcERpc3BhdGNoID0gKGRpc3BhdGNoLCBwcm9wcykgPT5cbiAgICBtYXBEaXNwYXRjaFRvUHJvcHMocHJvcHMuZGlzcGF0Y2gsIHByb3BzLCBkaXNwYXRjaCk7XG5cbiAgLy8gY29uc3QgcmVkdXhNZXJnZVByb3BzID0gKHN0YXRlUHJvcHMsIGRpc3BhdGNoUHJvcHMsIG93blByb3BzKSA9PlxuICAvLyAgICh7IC4uLnN0YXRlUHJvcHMsIC4uLmRpc3BhdGNoUHJvcHMsIC4uLm93blByb3BzIH0pO1xuXG4gIGNvbnN0IFJlZHV4Q29tcG9uZW50ID0gcmVkdXhDb25uZWN0KFxuICAgIHJlZHV4TWFwU3RhdGUsXG4gICAgcmVkdXhNYXBEaXNwYXRjaCxcbiAgICByZWR1eE1lcmdlUHJvcHMsXG4gICAgb3B0aW9uc1xuICApKEJhc2VDb21wb25lbnQpO1xuXG4gIC8vIHNhdmUgc2VsZWN0b3IgdG8gY29udGV4dCBzbyBpdCBjYW4gYmUgYWNjZXNzZWQgYnkgaXRzIGNoaWxkcmVuXG4gIHJldHVybiB3aXRoTG9jYWxTZWxlY3RvcihSZWR1eENvbXBvbmVudCk7XG59O1xuIl19