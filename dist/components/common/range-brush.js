"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _d3Selection = require("d3-selection");

var _d3Brush = require("d3-brush");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  .selection {\n    stroke: none;\n    fill: ", ";\n    opacity: 1;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var StyledG = _styledComponents.default.g(_templateObject(), function (props) {
  return props.theme.rangeBrushBgd;
});

var RangeBrush =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(RangeBrush, _Component);

  function RangeBrush() {
    (0, _classCallCheck2.default)(this, RangeBrush);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(RangeBrush).apply(this, arguments));
  }

  (0, _createClass2.default)(RangeBrush, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      var _this$props = this.props,
          _this$props$range = (0, _slicedToArray2.default)(_this$props.range, 2),
          min = _this$props$range[0],
          max = _this$props$range[1],
          _this$props$value = (0, _slicedToArray2.default)(_this$props.value, 2),
          val0 = _this$props$value[0],
          val1 = _this$props$value[1]; // We want the React app to respond to brush state and vice-versa
      // but d3-brush fires the same events for both user-initiated brushing
      // and programmatic brushing (brush.move). We need these flags to
      // distinguish between the uses.
      //
      // We don't use state because that would trigger another `componentDidUpate`


      this.brushing = false;
      this.moving = false;
      this.root = (0, _d3Selection.select)(this.rootContainer);
      this.brush = (0, _d3Brush.brushX)().on('start', function () {
        _this.brushing = true;
      }).on('brush', function () {
        if (_this.moving) {
          return;
        }

        _d3Selection.event.selection === null ? _this._reset() : _this._brush(_d3Selection.event.selection);
      }).on('end', function () {
        if (!_this.moving && _d3Selection.event.selection === null) {
          _this._reset();
        }

        _this.brushing = false;
        _this.moving = false;
      });
      this.root.call(this.brush);

      if (val0 === min && val1 === max) {
        this._reset();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props2 = this.props,
          _this$props2$range = (0, _slicedToArray2.default)(_this$props2.range, 2),
          min = _this$props2$range[0],
          max = _this$props2$range[1],
          _this$props2$value = (0, _slicedToArray2.default)(_this$props2.value, 2),
          val0 = _this$props2$value[0],
          val1 = _this$props2$value[1],
          width = _this$props2.width;

      var _prevProps$value = (0, _slicedToArray2.default)(prevProps.value, 2),
          prevVal0 = _prevProps$value[0],
          prevVal1 = _prevProps$value[1];

      if (prevProps.width !== width) {
        this.root.call(this.brush);

        this._move(val0, val1);
      }

      if (!this.brushing && !this.moving) {
        if (val0 === min && val1 === max) {
          this.moving = true;
          this.brush.move(this.root, null);
        }

        if (prevVal0 !== val0 || prevVal1 !== val1) {
          this.moving = true;

          this._move(val0, val1);
        }
      }
    }
  }, {
    key: "_reset",
    value: function _reset() {
      var _this$props$range2 = (0, _slicedToArray2.default)(this.props.range, 2),
          minValue = _this$props$range2[0],
          maxValue = _this$props$range2[1];

      this.props.onBrush(minValue, maxValue);
    }
  }, {
    key: "_move",
    value: function _move(val0, val1) {
      var _this$props3 = this.props,
          _this$props3$domain = (0, _slicedToArray2.default)(_this$props3.domain, 2),
          min = _this$props3$domain[0],
          max = _this$props3$domain[1],
          width = _this$props3.width;

      var scale = function scale(x) {
        return (x - min) * width / (max - min);
      };

      this.brush.move(this.root, [scale(val0), scale(val1)]);
    }
  }, {
    key: "_brush",
    value: function _brush(_ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
          sel0 = _ref2[0],
          sel1 = _ref2[1];

      var _this$props4 = this.props,
          _this$props4$domain = (0, _slicedToArray2.default)(_this$props4.domain, 2),
          min = _this$props4$domain[0],
          max = _this$props4$domain[1],
          onBrush = _this$props4.onBrush,
          width = _this$props4.width;

      var invert = function invert(x) {
        return x * (max - min) / width + min;
      };

      onBrush(invert(sel0), invert(sel1));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement(StyledG, {
        className: "kg-range-slider__brush",
        innerRef: function innerRef(comp) {
          _this2.rootContainer = comp;
        }
      });
    }
  }]);
  return RangeBrush;
}(_react.Component);

exports.default = RangeBrush;
(0, _defineProperty2.default)(RangeBrush, "propTypes", {
  domain: _propTypes.default.arrayOf(_propTypes.default.number).isRequired,
  onBrush: _propTypes.default.func.isRequired,
  range: _propTypes.default.arrayOf(_propTypes.default.number).isRequired,
  value: _propTypes.default.arrayOf(_propTypes.default.number).isRequired,
  width: _propTypes.default.number.isRequired
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9yYW5nZS1icnVzaC5qcyJdLCJuYW1lcyI6WyJTdHlsZWRHIiwic3R5bGVkIiwiZyIsInByb3BzIiwidGhlbWUiLCJyYW5nZUJydXNoQmdkIiwiUmFuZ2VCcnVzaCIsInJhbmdlIiwibWluIiwibWF4IiwidmFsdWUiLCJ2YWwwIiwidmFsMSIsImJydXNoaW5nIiwibW92aW5nIiwicm9vdCIsInJvb3RDb250YWluZXIiLCJicnVzaCIsIm9uIiwiZXZlbnQiLCJzZWxlY3Rpb24iLCJfcmVzZXQiLCJfYnJ1c2giLCJjYWxsIiwicHJldlByb3BzIiwid2lkdGgiLCJwcmV2VmFsMCIsInByZXZWYWwxIiwiX21vdmUiLCJtb3ZlIiwibWluVmFsdWUiLCJtYXhWYWx1ZSIsIm9uQnJ1c2giLCJkb21haW4iLCJzY2FsZSIsIngiLCJzZWwwIiwic2VsMSIsImludmVydCIsImNvbXAiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJhcnJheU9mIiwibnVtYmVyIiwiaXNSZXF1aXJlZCIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBTyxHQUFHQywwQkFBT0MsQ0FBVixvQkFHRCxVQUFBQyxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlDLGFBQWhCO0FBQUEsQ0FISixDQUFiOztJQVFxQkMsVTs7Ozs7Ozs7Ozs7O3dDQVNDO0FBQUE7O0FBQUEsd0JBQytCLEtBQUtILEtBRHBDO0FBQUEsdUVBQ1hJLEtBRFc7QUFBQSxVQUNIQyxHQURHO0FBQUEsVUFDRUMsR0FERjtBQUFBLHVFQUNRQyxLQURSO0FBQUEsVUFDZ0JDLElBRGhCO0FBQUEsVUFDc0JDLElBRHRCLHlCQUVsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLFdBQUtDLFFBQUwsR0FBZ0IsS0FB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VixDQUFrQkQsbUJBQVVFLE1BQTVCLEVBQW9DQyxVQUgxQjtBQUlqQmxDLEVBQUFBLEtBQUssRUFBRStCLG1CQUFVQyxPQUFWLENBQWtCRCxtQkFBVUUsTUFBNUIsRUFBb0NDLFVBSjFCO0FBS2pCbkIsRUFBQUEsS0FBSyxFQUFFZ0IsbUJBQVVFLE1BQVYsQ0FBaUJDO0FBTFAsQztBQTRGcEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7ZXZlbnQsIHNlbGVjdH0gZnJvbSAnZDMtc2VsZWN0aW9uJztcbmltcG9ydCB7YnJ1c2hYfSBmcm9tICdkMy1icnVzaCc7XG5cbmNvbnN0IFN0eWxlZEcgPSBzdHlsZWQuZ2BcbiAgLnNlbGVjdGlvbiB7XG4gICAgc3Ryb2tlOiBub25lO1xuICAgIGZpbGw6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucmFuZ2VCcnVzaEJnZH07XG4gICAgb3BhY2l0eTogMTtcbiAgfVxuYDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFuZ2VCcnVzaCBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZG9tYWluOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMubnVtYmVyKS5pc1JlcXVpcmVkLFxuICAgIG9uQnJ1c2g6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgcmFuZ2U6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpLmlzUmVxdWlyZWQsXG4gICAgdmFsdWU6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpLmlzUmVxdWlyZWQsXG4gICAgd2lkdGg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZFxuICB9O1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHtyYW5nZTogW21pbiwgbWF4XSwgdmFsdWU6IFt2YWwwLCB2YWwxXX0gPSB0aGlzLnByb3BzO1xuICAgIC8vIFdlIHdhbnQgdGhlIFJlYWN0IGFwcCB0byByZXNwb25kIHRvIGJydXNoIHN0YXRlIGFuZCB2aWNlLXZlcnNhXG4gICAgLy8gYnV0IGQzLWJydXNoIGZpcmVzIHRoZSBzYW1lIGV2ZW50cyBmb3IgYm90aCB1c2VyLWluaXRpYXRlZCBicnVzaGluZ1xuICAgIC8vIGFuZCBwcm9ncmFtbWF0aWMgYnJ1c2hpbmcgKGJydXNoLm1vdmUpLiBXZSBuZWVkIHRoZXNlIGZsYWdzIHRvXG4gICAgLy8gZGlzdGluZ3Vpc2ggYmV0d2VlbiB0aGUgdXNlcy5cbiAgICAvL1xuICAgIC8vIFdlIGRvbid0IHVzZSBzdGF0ZSBiZWNhdXNlIHRoYXQgd291bGQgdHJpZ2dlciBhbm90aGVyIGBjb21wb25lbnREaWRVcGF0ZWBcbiAgICB0aGlzLmJydXNoaW5nID0gZmFsc2U7XG4gICAgdGhpcy5tb3ZpbmcgPSBmYWxzZTtcblxuICAgIHRoaXMucm9vdCA9IHNlbGVjdCh0aGlzLnJvb3RDb250YWluZXIpO1xuICAgIHRoaXMuYnJ1c2ggPSBicnVzaFgoKVxuICAgICAgLm9uKCdzdGFydCcsICgpID0+IHtcbiAgICAgICAgdGhpcy5icnVzaGluZyA9IHRydWU7XG4gICAgICB9KVxuICAgICAgLm9uKCdicnVzaCcsICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMubW92aW5nKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQuc2VsZWN0aW9uID09PSBudWxsID8gdGhpcy5fcmVzZXQoKSA6IHRoaXMuX2JydXNoKGV2ZW50LnNlbGVjdGlvbik7XG4gICAgICB9KVxuICAgICAgLm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5tb3ZpbmcgJiYgZXZlbnQuc2VsZWN0aW9uID09PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5fcmVzZXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYnJ1c2hpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tb3ZpbmcgPSBmYWxzZTtcbiAgICAgIH0pO1xuXG4gICAgdGhpcy5yb290LmNhbGwodGhpcy5icnVzaCk7XG5cbiAgICBpZiAodmFsMCA9PT0gbWluICYmIHZhbDEgPT09IG1heCkge1xuICAgICAgdGhpcy5fcmVzZXQoKTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgY29uc3Qge3JhbmdlOiBbbWluLCBtYXhdLCB2YWx1ZTogW3ZhbDAsIHZhbDFdLCB3aWR0aH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IFtwcmV2VmFsMCwgcHJldlZhbDFdID0gcHJldlByb3BzLnZhbHVlO1xuXG4gICAgaWYgKHByZXZQcm9wcy53aWR0aCAhPT0gd2lkdGgpIHtcbiAgICAgIHRoaXMucm9vdC5jYWxsKHRoaXMuYnJ1c2gpO1xuICAgICAgdGhpcy5fbW92ZSh2YWwwLCB2YWwxKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuYnJ1c2hpbmcgJiYgIXRoaXMubW92aW5nKSB7XG4gICAgICBpZiAodmFsMCA9PT0gbWluICYmIHZhbDEgPT09IG1heCkge1xuICAgICAgICB0aGlzLm1vdmluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuYnJ1c2gubW92ZSh0aGlzLnJvb3QsIG51bGwpO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJldlZhbDAgIT09IHZhbDAgfHwgcHJldlZhbDEgIT09IHZhbDEpIHtcbiAgICAgICAgdGhpcy5tb3ZpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLl9tb3ZlKHZhbDAsIHZhbDEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9yZXNldCgpIHtcbiAgICBjb25zdCBbbWluVmFsdWUsIG1heFZhbHVlXSA9IHRoaXMucHJvcHMucmFuZ2U7XG4gICAgdGhpcy5wcm9wcy5vbkJydXNoKG1pblZhbHVlLCBtYXhWYWx1ZSk7XG4gIH1cblxuICBfbW92ZSh2YWwwLCB2YWwxKSB7XG4gICAgY29uc3Qge2RvbWFpbjogW21pbiwgbWF4XSwgd2lkdGh9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzY2FsZSA9IHggPT4gKHggLSBtaW4pICogd2lkdGggLyAobWF4IC0gbWluKTtcbiAgICB0aGlzLmJydXNoLm1vdmUodGhpcy5yb290LCBbc2NhbGUodmFsMCksIHNjYWxlKHZhbDEpXSk7XG4gIH1cblxuICBfYnJ1c2goW3NlbDAsIHNlbDFdKSB7XG4gICAgY29uc3Qge2RvbWFpbjogW21pbiwgbWF4XSwgb25CcnVzaCwgd2lkdGh9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBpbnZlcnQgPSB4ID0+IHggKiAobWF4IC0gbWluKSAvIHdpZHRoICsgbWluO1xuICAgIG9uQnJ1c2goaW52ZXJ0KHNlbDApLCBpbnZlcnQoc2VsMSkpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiA8U3R5bGVkRyBjbGFzc05hbWU9XCJrZy1yYW5nZS1zbGlkZXJfX2JydXNoXCJcbiAgICAgICAgICAgICAgICAgICAgaW5uZXJSZWY9e2NvbXAgPT4ge1xuICAgICAgdGhpcy5yb290Q29udGFpbmVyID0gY29tcDtcbiAgICB9fS8+O1xuICB9XG59O1xuIl19