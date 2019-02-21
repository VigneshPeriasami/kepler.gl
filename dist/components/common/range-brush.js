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
        ref: function ref(comp) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9yYW5nZS1icnVzaC5qcyJdLCJuYW1lcyI6WyJTdHlsZWRHIiwic3R5bGVkIiwiZyIsInByb3BzIiwidGhlbWUiLCJyYW5nZUJydXNoQmdkIiwiUmFuZ2VCcnVzaCIsInJhbmdlIiwibWluIiwibWF4IiwidmFsdWUiLCJ2YWwwIiwidmFsMSIsImJydXNoaW5nIiwibW92aW5nIiwicm9vdCIsInJvb3RDb250YWluZXIiLCJicnVzaCIsIm9uIiwiZXZlbnQiLCJzZWxlY3Rpb24iLCJfcmVzZXQiLCJfYnJ1c2giLCJjYWxsIiwicHJldlByb3BzIiwid2lkdGgiLCJwcmV2VmFsMCIsInByZXZWYWwxIiwiX21vdmUiLCJtb3ZlIiwibWluVmFsdWUiLCJtYXhWYWx1ZSIsIm9uQnJ1c2giLCJkb21haW4iLCJzY2FsZSIsIngiLCJzZWwwIiwic2VsMSIsImludmVydCIsImNvbXAiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJhcnJheU9mIiwibnVtYmVyIiwiaXNSZXF1aXJlZCIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBTyxHQUFHQywwQkFBT0MsQ0FBVixvQkFHRCxVQUFBQyxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlDLGFBQWhCO0FBQUEsQ0FISixDQUFiOztJQVFxQkMsVTs7Ozs7Ozs7Ozs7O3dDQVNDO0FBQUE7O0FBQUEsd0JBQytCLEtBQUtILEtBRHBDO0FBQUEsdUVBQ1hJLEtBRFc7QUFBQSxVQUNIQyxHQURHO0FBQUEsVUFDRUMsR0FERjtBQUFBLHVFQUNRQyxLQURSO0FBQUEsVUFDZ0JDLElBRGhCO0FBQUEsVUFDc0JDLElBRHRCLHlCQUVsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLFdBQUtDLFFBQUwsR0FBZ0IsS0FB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LENBQWtCRCxtQkFBVUUsTUFBNUIsRUFBb0NDLFVBSDFCO0FBSWpCbEMsRUFBQUEsS0FBSyxFQUFFK0IsbUJBQVVDLE9BQVYsQ0FBa0JELG1CQUFVRSxNQUE1QixFQUFvQ0MsVUFKMUI7QUFLakJuQixFQUFBQSxLQUFLLEVBQUVnQixtQkFBVUUsTUFBVixDQUFpQkM7QUFMUCxDO0FBNEZwQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHtldmVudCwgc2VsZWN0fSBmcm9tICdkMy1zZWxlY3Rpb24nO1xuaW1wb3J0IHticnVzaFh9IGZyb20gJ2QzLWJydXNoJztcblxuY29uc3QgU3R5bGVkRyA9IHN0eWxlZC5nYFxuICAuc2VsZWN0aW9uIHtcbiAgICBzdHJva2U6IG5vbmU7XG4gICAgZmlsbDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5yYW5nZUJydXNoQmdkfTtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYW5nZUJydXNoIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBkb21haW46IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpLmlzUmVxdWlyZWQsXG4gICAgb25CcnVzaDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICByYW5nZTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm51bWJlcikuaXNSZXF1aXJlZCxcbiAgICB2YWx1ZTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm51bWJlcikuaXNSZXF1aXJlZCxcbiAgICB3aWR0aDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3Qge3JhbmdlOiBbbWluLCBtYXhdLCB2YWx1ZTogW3ZhbDAsIHZhbDFdfSA9IHRoaXMucHJvcHM7XG4gICAgLy8gV2Ugd2FudCB0aGUgUmVhY3QgYXBwIHRvIHJlc3BvbmQgdG8gYnJ1c2ggc3RhdGUgYW5kIHZpY2UtdmVyc2FcbiAgICAvLyBidXQgZDMtYnJ1c2ggZmlyZXMgdGhlIHNhbWUgZXZlbnRzIGZvciBib3RoIHVzZXItaW5pdGlhdGVkIGJydXNoaW5nXG4gICAgLy8gYW5kIHByb2dyYW1tYXRpYyBicnVzaGluZyAoYnJ1c2gubW92ZSkuIFdlIG5lZWQgdGhlc2UgZmxhZ3MgdG9cbiAgICAvLyBkaXN0aW5ndWlzaCBiZXR3ZWVuIHRoZSB1c2VzLlxuICAgIC8vXG4gICAgLy8gV2UgZG9uJ3QgdXNlIHN0YXRlIGJlY2F1c2UgdGhhdCB3b3VsZCB0cmlnZ2VyIGFub3RoZXIgYGNvbXBvbmVudERpZFVwYXRlYFxuICAgIHRoaXMuYnJ1c2hpbmcgPSBmYWxzZTtcbiAgICB0aGlzLm1vdmluZyA9IGZhbHNlO1xuXG4gICAgdGhpcy5yb290ID0gc2VsZWN0KHRoaXMucm9vdENvbnRhaW5lcik7XG4gICAgdGhpcy5icnVzaCA9IGJydXNoWCgpXG4gICAgICAub24oJ3N0YXJ0JywgKCkgPT4ge1xuICAgICAgICB0aGlzLmJydXNoaW5nID0gdHJ1ZTtcbiAgICAgIH0pXG4gICAgICAub24oJ2JydXNoJywgKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5tb3ZpbmcpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5zZWxlY3Rpb24gPT09IG51bGwgPyB0aGlzLl9yZXNldCgpIDogdGhpcy5fYnJ1c2goZXZlbnQuc2VsZWN0aW9uKTtcbiAgICAgIH0pXG4gICAgICAub24oJ2VuZCcsICgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLm1vdmluZyAmJiBldmVudC5zZWxlY3Rpb24gPT09IG51bGwpIHtcbiAgICAgICAgICB0aGlzLl9yZXNldCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5icnVzaGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1vdmluZyA9IGZhbHNlO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLnJvb3QuY2FsbCh0aGlzLmJydXNoKTtcblxuICAgIGlmICh2YWwwID09PSBtaW4gJiYgdmFsMSA9PT0gbWF4KSB7XG4gICAgICB0aGlzLl9yZXNldCgpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICBjb25zdCB7cmFuZ2U6IFttaW4sIG1heF0sIHZhbHVlOiBbdmFsMCwgdmFsMV0sIHdpZHRofSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgW3ByZXZWYWwwLCBwcmV2VmFsMV0gPSBwcmV2UHJvcHMudmFsdWU7XG5cbiAgICBpZiAocHJldlByb3BzLndpZHRoICE9PSB3aWR0aCkge1xuICAgICAgdGhpcy5yb290LmNhbGwodGhpcy5icnVzaCk7XG4gICAgICB0aGlzLl9tb3ZlKHZhbDAsIHZhbDEpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5icnVzaGluZyAmJiAhdGhpcy5tb3ZpbmcpIHtcbiAgICAgIGlmICh2YWwwID09PSBtaW4gJiYgdmFsMSA9PT0gbWF4KSB7XG4gICAgICAgIHRoaXMubW92aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5icnVzaC5tb3ZlKHRoaXMucm9vdCwgbnVsbCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcmV2VmFsMCAhPT0gdmFsMCB8fCBwcmV2VmFsMSAhPT0gdmFsMSkge1xuICAgICAgICB0aGlzLm1vdmluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuX21vdmUodmFsMCwgdmFsMSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX3Jlc2V0KCkge1xuICAgIGNvbnN0IFttaW5WYWx1ZSwgbWF4VmFsdWVdID0gdGhpcy5wcm9wcy5yYW5nZTtcbiAgICB0aGlzLnByb3BzLm9uQnJ1c2gobWluVmFsdWUsIG1heFZhbHVlKTtcbiAgfVxuXG4gIF9tb3ZlKHZhbDAsIHZhbDEpIHtcbiAgICBjb25zdCB7ZG9tYWluOiBbbWluLCBtYXhdLCB3aWR0aH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNjYWxlID0geCA9PiAoeCAtIG1pbikgKiB3aWR0aCAvIChtYXggLSBtaW4pO1xuICAgIHRoaXMuYnJ1c2gubW92ZSh0aGlzLnJvb3QsIFtzY2FsZSh2YWwwKSwgc2NhbGUodmFsMSldKTtcbiAgfVxuXG4gIF9icnVzaChbc2VsMCwgc2VsMV0pIHtcbiAgICBjb25zdCB7ZG9tYWluOiBbbWluLCBtYXhdLCBvbkJydXNoLCB3aWR0aH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGludmVydCA9IHggPT4geCAqIChtYXggLSBtaW4pIC8gd2lkdGggKyBtaW47XG4gICAgb25CcnVzaChpbnZlcnQoc2VsMCksIGludmVydChzZWwxKSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIDxTdHlsZWRHIGNsYXNzTmFtZT1cImtnLXJhbmdlLXNsaWRlcl9fYnJ1c2hcIlxuICAgICAgICAgICAgICAgICAgICByZWY9e2NvbXAgPT4ge1xuICAgICAgdGhpcy5yb290Q29udGFpbmVyID0gY29tcDtcbiAgICB9fS8+O1xuICB9XG59O1xuIl19