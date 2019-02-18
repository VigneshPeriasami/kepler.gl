"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _d3Scale = require("d3-scale");

var _d3Selection = require("d3-selection");

var _d3Axis = require("d3-axis");

var _reselect = require("reselect");

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  pointer-events: none;\n  position: absolute;\n  top: 0;\n  .axis text {\n    font-size: 9px;\n    fill: ", ";\n  }\n\n  .axis line,\n  .axis path {\n    fill: none;\n    stroke: ", ";\n    shape-rendering: crispEdges;\n    stroke-width: 2;\n  }\n\n  .axis .domain {\n    display: none;\n  }\n\n  .value {\n    fill: ", ";\n    font-size: 10px;\n\n    &.start {\n      text-anchor: start;\n    }\n\n    &.end {\n      text-anchor: end;\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var TimeSliderContainer = _styledComponents.default.svg(_templateObject(), function (props) {
  return props.theme.textColor;
}, function (props) {
  return props.theme.sliderBarBgd;
}, function (props) {
  return props.theme.textColor;
});

var height = 30;

var TimeSliderMarker =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(TimeSliderMarker, _Component);

  function TimeSliderMarker() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, TimeSliderMarker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(TimeSliderMarker)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "domainSelector", function (props) {
      return props.domain;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "widthSelector", function (props) {
      return props.width;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "scaleSelector", (0, _reselect.createSelector)(_this.domainSelector, _this.widthSelector, function (domain, width) {
      return Array.isArray(domain) ? (0, _d3Scale.scaleUtc)().domain(domain).range([0, width]) : null;
    }));
    return _this;
  }

  (0, _createClass2.default)(TimeSliderMarker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._updateAxis(this.scaleSelector(this.props));
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.scaleSelector(this.props) !== this.scaleSelector(nextProps)) {
        this._updateAxis(this.scaleSelector(nextProps));
      }
    }
  }, {
    key: "_updateAxis",
    value: function _updateAxis(scale) {
      if (!scale) {
        return;
      }

      var xAxis = (0, _d3Axis.axisBottom)(scale).ticks(4).tickSize(8).tickPadding(6);
      var svg = (0, _d3Selection.select)(this.svgContainer);
      svg.select('.x.axis').call(xAxis).selectAll('text');
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement(TimeSliderContainer, {
        className: "time-slider-marker",
        width: this.props.width,
        height: height,
        innerRef: function innerRef(comp) {
          _this2.svgContainer = comp;
        }
      }, _react.default.createElement("g", {
        className: "x axis",
        transform: "translate(0, 0)"
      }));
    }
  }]);
  return TimeSliderMarker;
}(_react.Component);

exports.default = TimeSliderMarker;
(0, _defineProperty2.default)(TimeSliderMarker, "propTypes", {
  domain: _propTypes.default.arrayOf(_propTypes.default.any).isRequired,
  width: _propTypes.default.number.isRequired
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi90aW1lLXNsaWRlci1tYXJrZXIuanMiXSwibmFtZXMiOlsiVGltZVNsaWRlckNvbnRhaW5lciIsInN0eWxlZCIsInN2ZyIsInByb3BzIiwidGhlbWUiLCJ0ZXh0Q29sb3IiLCJzbGlkZXJCYXJCZ2QiLCJoZWlnaHQiLCJUaW1lU2xpZGVyTWFya2VyIiwiZG9tYWluIiwid2lkdGgiLCJkb21haW5TZWxlY3RvciIsIndpZHRoU2VsZWN0b3IiLCJBcnJheSIsImlzQXJyYXkiLCJyYW5nZSIsIl91cGRhdGVBeGlzIiwic2NhbGVTZWxlY3RvciIsIm5leHRQcm9wcyIsInNjYWxlIiwieEF4aXMiLCJ0aWNrcyIsInRpY2tTaXplIiwidGlja1BhZGRpbmciLCJzdmdDb250YWluZXIiLCJzZWxlY3QiLCJjYWxsIiwic2VsZWN0QWxsIiwiY29tcCIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsImFycmF5T2YiLCJhbnkiLCJpc1JlcXVpcmVkIiwibnVtYmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLG1CQUFtQixHQUFHQywwQkFBT0MsR0FBVixvQkFNYixVQUFBQyxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlDLFNBQWhCO0FBQUEsQ0FOUSxFQVlYLFVBQUFGLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUUsWUFBaEI7QUFBQSxDQVpNLEVBc0JiLFVBQUFILEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUMsU0FBaEI7QUFBQSxDQXRCUSxDQUF6Qjs7QUFtQ0EsSUFBTUUsTUFBTSxHQUFHLEVBQWY7O0lBRXFCQyxnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7dUlBZ0JGLFVBQUFMLEtBQUs7QUFBQSxhQUFJQSxLQUFLLENBQUNNLE1BQVY7QUFBQSxLO3NJQUNOLFVBQUFOLEtBQUs7QUFBQSxhQUFJQSxLQUFLLENBQUNPLEtBQVY7QUFBQSxLO3NJQUNMLDhCQUNkLE1BQUtDLGNBRFMsRUFFZCxNQUFLQyxhQUZTLEVBR2QsVUFBQ0gsTUFBRCxFQUFTQyxLQUFUO0FBQUEsYUFDRUcsS0FBSyxDQUFDQyxPQUFOLENBQWNMLE1BQWQsSUFDSSx5QkFDR0EsTUFESCxDQUNVQSxNQURWLEVBRUdNLEtBRkgsQ0FFUyxDQUFDLENBQUQsRUFBSUwsS0FBSixDQUZULENBREosR0FJSSxJQUxOO0FBQUEsS0FIYyxDOzs7Ozs7d0NBWkk7QUFDbEIsV0FBS00sV0FBTCxDQUFpQixLQUFLQyxhQUFMLENBQW1CLEtBQUtkLEtBQXhCLENBQWpCO0FBQ0Q7Ozs4Q0FFeUJlLFMsRUFBVztBQUNuQyxVQUFJLEtBQUtELGFBQUwsQ0FBbUIsS0FBS2QsS0FBeEIsTUFBbUMsS0FBS2MsYUFBTCxDQUFtQkMsU0FBbkIsQ0FBdkMsRUFBc0U7QUFDcEUsYUFBS0YsV0FBTCxDQUFpQixLQUFLQyxhQUFMLENBQW1CQyxTQUFuQixDQUFqQjtBQUNEO0FBQ0Y7OztnQ0FlV0MsSyxFQUFPO0FBQ2pCLFVBQUksQ0FBQ0EsS0FBTCxFQUFZO0FBQ1Y7QUFDRDs7QUFDRCxVQUFNQyxLQUFLLEdBQUcsd0JBQVdELEtBQVgsRUFDWEUsS0FEVyxDQUNMLENBREssRUFFWEMsUUFGVyxDQUVGLENBRkUsRUFHWEMsV0FIVyxDQUdDLENBSEQsQ0FBZDtBQUtBLFVBQU1yQixHQUFHLEdBQUcseUJBQU8sS0FBS3NCLFlBQVosQ0FBWjtBQUVBdEIsTUFBQUEsR0FBRyxDQUNBdUIsTUFESCxDQUNVLFNBRFYsRUFFR0MsSUFGSCxDQUVRTixLQUZSLEVBR0dPLFNBSEgsQ0FHYSxNQUhiO0FBSUQ7Ozs2QkFFUTtBQUFBOztBQUNQLGFBQ0UsNkJBQUMsbUJBQUQ7QUFDRSxRQUFBLFNBQVMsRUFBQyxvQkFEWjtBQUVFLFFBQUEsS0FBSyxFQUFFLEtBQUt4QixLQUFMLENBQVdPLEtBRnBCO0FBR0UsUUFBQSxNQUFNLEVBQUVILE1BSFY7QUFJRSxRQUFBLFFBQVEsRUFBRSxrQkFBQXFCLElBQUksRUFBSTtBQUNoQixVQUFBLE1BQUksQ0FBQ0osWUFBTCxHQUFvQkksSUFBcEI7QUFDRDtBQU5ILFNBUUU7QUFBRyxRQUFBLFNBQVMsRUFBQyxRQUFiO0FBQXNCLFFBQUEsU0FBUyxFQUFDO0FBQWhDLFFBUkYsQ0FERjtBQVlEOzs7RUEzRDJDQyxnQjs7OzhCQUF6QnJCLGdCLGVBQ0E7QUFDakJDLEVBQUFBLE1BQU0sRUFBRXFCLG1CQUFVQyxPQUFWLENBQWtCRCxtQkFBVUUsR0FBNUIsRUFBaUNDLFVBRHhCO0FBRWpCdkIsRUFBQUEsS0FBSyxFQUFFb0IsbUJBQVVJLE1BQVYsQ0FBaUJEO0FBRlAsQztBQTJEcEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQge3NjYWxlVXRjfSBmcm9tICdkMy1zY2FsZSc7XG5pbXBvcnQge3NlbGVjdH0gZnJvbSAnZDMtc2VsZWN0aW9uJztcbmltcG9ydCB7YXhpc0JvdHRvbX0gZnJvbSAnZDMtYXhpcyc7XG5pbXBvcnQge2NyZWF0ZVNlbGVjdG9yfSBmcm9tICdyZXNlbGVjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuY29uc3QgVGltZVNsaWRlckNvbnRhaW5lciA9IHN0eWxlZC5zdmdgXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgLmF4aXMgdGV4dCB7XG4gICAgZm9udC1zaXplOiA5cHg7XG4gICAgZmlsbDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3J9O1xuICB9XG5cbiAgLmF4aXMgbGluZSxcbiAgLmF4aXMgcGF0aCB7XG4gICAgZmlsbDogbm9uZTtcbiAgICBzdHJva2U6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2xpZGVyQmFyQmdkfTtcbiAgICBzaGFwZS1yZW5kZXJpbmc6IGNyaXNwRWRnZXM7XG4gICAgc3Ryb2tlLXdpZHRoOiAyO1xuICB9XG5cbiAgLmF4aXMgLmRvbWFpbiB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxuXG4gIC52YWx1ZSB7XG4gICAgZmlsbDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3J9O1xuICAgIGZvbnQtc2l6ZTogMTBweDtcblxuICAgICYuc3RhcnQge1xuICAgICAgdGV4dC1hbmNob3I6IHN0YXJ0O1xuICAgIH1cblxuICAgICYuZW5kIHtcbiAgICAgIHRleHQtYW5jaG9yOiBlbmQ7XG4gICAgfVxuICB9XG5gO1xuXG5jb25zdCBoZWlnaHQgPSAzMDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZVNsaWRlck1hcmtlciBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZG9tYWluOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KS5pc1JlcXVpcmVkLFxuICAgIHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWRcbiAgfTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLl91cGRhdGVBeGlzKHRoaXMuc2NhbGVTZWxlY3Rvcih0aGlzLnByb3BzKSk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGlmICh0aGlzLnNjYWxlU2VsZWN0b3IodGhpcy5wcm9wcykgIT09IHRoaXMuc2NhbGVTZWxlY3RvcihuZXh0UHJvcHMpKSB7XG4gICAgICB0aGlzLl91cGRhdGVBeGlzKHRoaXMuc2NhbGVTZWxlY3RvcihuZXh0UHJvcHMpKTtcbiAgICB9XG4gIH1cblxuICBkb21haW5TZWxlY3RvciA9IHByb3BzID0+IHByb3BzLmRvbWFpbjtcbiAgd2lkdGhTZWxlY3RvciA9IHByb3BzID0+IHByb3BzLndpZHRoO1xuICBzY2FsZVNlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3IoXG4gICAgdGhpcy5kb21haW5TZWxlY3RvcixcbiAgICB0aGlzLndpZHRoU2VsZWN0b3IsXG4gICAgKGRvbWFpbiwgd2lkdGgpID0+XG4gICAgICBBcnJheS5pc0FycmF5KGRvbWFpbilcbiAgICAgICAgPyBzY2FsZVV0YygpXG4gICAgICAgICAgICAuZG9tYWluKGRvbWFpbilcbiAgICAgICAgICAgIC5yYW5nZShbMCwgd2lkdGhdKVxuICAgICAgICA6IG51bGxcbiAgKTtcblxuICBfdXBkYXRlQXhpcyhzY2FsZSkge1xuICAgIGlmICghc2NhbGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgeEF4aXMgPSBheGlzQm90dG9tKHNjYWxlKVxuICAgICAgLnRpY2tzKDQpXG4gICAgICAudGlja1NpemUoOClcbiAgICAgIC50aWNrUGFkZGluZyg2KTtcblxuICAgIGNvbnN0IHN2ZyA9IHNlbGVjdCh0aGlzLnN2Z0NvbnRhaW5lcik7XG5cbiAgICBzdmdcbiAgICAgIC5zZWxlY3QoJy54LmF4aXMnKVxuICAgICAgLmNhbGwoeEF4aXMpXG4gICAgICAuc2VsZWN0QWxsKCd0ZXh0Jyk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxUaW1lU2xpZGVyQ29udGFpbmVyXG4gICAgICAgIGNsYXNzTmFtZT1cInRpbWUtc2xpZGVyLW1hcmtlclwiXG4gICAgICAgIHdpZHRoPXt0aGlzLnByb3BzLndpZHRofVxuICAgICAgICBoZWlnaHQ9e2hlaWdodH1cbiAgICAgICAgaW5uZXJSZWY9e2NvbXAgPT4ge1xuICAgICAgICAgIHRoaXMuc3ZnQ29udGFpbmVyID0gY29tcDtcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPGcgY2xhc3NOYW1lPVwieCBheGlzXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAsIDApXCIgLz5cbiAgICAgIDwvVGltZVNsaWRlckNvbnRhaW5lcj5cbiAgICApO1xuICB9XG59O1xuIl19