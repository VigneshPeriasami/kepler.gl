"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TimeWidget = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reselect = require("reselect");

var _fieldSelector = _interopRequireDefault(require("../common/field-selector"));

var _styledComponents2 = require("../common/styled-components");

var _timeRangeFilter = _interopRequireDefault(require("./time-range-filter"));

var _icons = require("../common/icons");

var _filterUtils = require("../../utils/filter-utils");

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  flex-grow: 0;\n  color: ", ";\n\n  .bottom-widget__icon {\n    margin-right: 6px;\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  border-bottom: 1px solid\n    ", ";\n  color: ", ";\n  display: inline-block;\n  font-size: 12px;\n  height: 24px;\n  margin-right: 4px;\n  text-align: center;\n  width: 24px;\n  line-height: 24px;\n\n  :hover {\n    cursor: pointer;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  padding-right: 76px;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n  padding-right: ", "px;\n  color: ", ";\n\n  .bottom-widget__y-axis {\n    flex-grow: 1;\n    margin-left: 20px;\n  }\n\n  .bottom-widget__field-select {\n    width: 160px;\n    display: inline-block;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n  padding-top: ", "px;\n  padding-right: ", "px;\n  padding-bottom: ", "px;\n  padding-left: ", "px;\n  bottom: 0;\n  right: 0;\n  z-index: 1;\n  width: ", "px;\n\n  .bottom-widget--inner {\n    background-color: ", ";\n    padding: 10px ", "px;\n    position: relative;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var innerPdSide = 32;

var WidgetContainer = _styledComponents.default.div(_templateObject(), function (props) {
  return props.theme.sidePanel.margin.top;
}, function (props) {
  return props.theme.sidePanel.margin.right;
}, function (props) {
  return props.theme.sidePanel.margin.bottom;
}, function (props) {
  return props.theme.sidePanel.margin.left;
}, function (props) {
  return props.width;
}, function (props) {
  return props.theme.sidePanelBg;
}, innerPdSide);

var TopSectionWrapper = _styledComponents.default.div(_templateObject2(), innerPdSide * 2, function (props) {
  return props.theme.labelColor;
});
/* eslint-disable no-unused-vars */


var Tabs = _styledComponents.default.div(_templateObject3());

var Tab = _styledComponents.default.div(_templateObject4(), function (props) {
  return props.active ? props.theme.textColorHl : 'transparent';
}, function (props) {
  return props.active ? props.theme.textColorHl : props.theme.labelColor;
});
/* eslint-enable no-unused-vars */


var StyledTitle = (0, _styledComponents.default)(_styledComponents2.CenterFlexbox)(_templateObject5(), function (props) {
  return props.theme.textColor;
});

var AnimationSpeedToggle = function AnimationSpeedToggle(_ref) {
  var updateAnimationSpeed = _ref.updateAnimationSpeed,
      speed = _ref.speed;
  return _react.default.createElement(Tabs, null, _filterUtils.TIME_ANIMATION_SPEED.map(function (_ref2) {
    var label = _ref2.label,
        value = _ref2.value;
    return _react.default.createElement(Tab, {
      key: value,
      active: value === speed,
      onClick: function onClick() {
        return updateAnimationSpeed(value);
      }
    }, label);
  }));
};

var TimeWidget =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(TimeWidget, _Component);

  function TimeWidget() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, TimeWidget);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(TimeWidget)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "fieldSelector", function (props) {
      return props.fields;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "yAxisFieldsSelector", (0, _reselect.createSelector)(_this.fieldSelector, function (fields) {
      return fields.filter(function (f) {
        return f.type === 'integer' || f.type === 'real';
      });
    }));
    return _this;
  }

  (0, _createClass2.default)(TimeWidget, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          enlargedIdx = _this$props.enlargedIdx,
          enlargeFilter = _this$props.enlargeFilter,
          filter = _this$props.filter,
          isAnyFilterAnimating = _this$props.isAnyFilterAnimating,
          _setFilter = _this$props.setFilter,
          setFilterPlot = _this$props.setFilterPlot,
          _toggleAnimation = _this$props.toggleAnimation,
          _updateAnimationSpeed = _this$props.updateAnimationSpeed,
          width = _this$props.width;
      return _react.default.createElement(WidgetContainer, {
        width: width
      }, _react.default.createElement("div", {
        className: "bottom-widget--inner"
      }, _react.default.createElement(TopSectionWrapper, null, _react.default.createElement(StyledTitle, {
        className: "bottom-widget__field"
      }, _react.default.createElement(_styledComponents2.CenterFlexbox, {
        className: "bottom-widget__icon"
      }, _react.default.createElement(_icons.Clock, {
        height: "15px"
      })), _react.default.createElement(_styledComponents2.SelectTextBold, null, filter.name)), _react.default.createElement(StyledTitle, {
        className: "bottom-widget__y-axis"
      }, _react.default.createElement(_styledComponents2.CenterFlexbox, {
        className: "bottom-widget__icon"
      }, _react.default.createElement(_icons.LineChart, {
        height: "15px"
      })), _react.default.createElement("div", {
        className: "bottom-widget__field-select"
      }, _react.default.createElement(_fieldSelector.default, {
        fields: this.yAxisFieldsSelector(this.props),
        placement: "top",
        id: "selected-time-widget-field",
        value: filter.yAxis ? filter.yAxis.name : null,
        onSelect: function onSelect(value) {
          return setFilterPlot(enlargedIdx, {
            yAxis: value
          });
        },
        inputTheme: "secondary",
        placeholder: "Select Y Axis",
        erasable: true,
        showToken: false
      }))), _react.default.createElement(AnimationSpeedToggle, {
        updateAnimationSpeed: function updateAnimationSpeed(speed) {
          return _updateAnimationSpeed(enlargedIdx, speed);
        },
        speed: filter.speed
      }), _react.default.createElement(_styledComponents2.IconRoundSmall, null, _react.default.createElement(_icons.Close, {
        height: "12px",
        onClick: function onClick() {
          return enlargeFilter(enlargedIdx);
        }
      }))), _react.default.createElement(_timeRangeFilter.default, {
        filter: filter,
        setFilter: function setFilter(value) {
          return _setFilter(enlargedIdx, 'value', value);
        },
        isAnyFilterAnimating: isAnyFilterAnimating,
        updateAnimationSpeed: function updateAnimationSpeed(speed) {
          return _updateAnimationSpeed(enlargedIdx, speed);
        },
        toggleAnimation: function toggleAnimation() {
          return _toggleAnimation(enlargedIdx);
        }
      })));
    }
  }]);
  return TimeWidget;
}(_react.Component);

exports.TimeWidget = TimeWidget;

var TimeWidgetFactory = function TimeWidgetFactory() {
  return TimeWidget;
};

var _default = TimeWidgetFactory;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpbHRlcnMvdGltZS13aWRnZXQuanMiXSwibmFtZXMiOlsiaW5uZXJQZFNpZGUiLCJXaWRnZXRDb250YWluZXIiLCJzdHlsZWQiLCJkaXYiLCJwcm9wcyIsInRoZW1lIiwic2lkZVBhbmVsIiwibWFyZ2luIiwidG9wIiwicmlnaHQiLCJib3R0b20iLCJsZWZ0Iiwid2lkdGgiLCJzaWRlUGFuZWxCZyIsIlRvcFNlY3Rpb25XcmFwcGVyIiwibGFiZWxDb2xvciIsIlRhYnMiLCJUYWIiLCJhY3RpdmUiLCJ0ZXh0Q29sb3JIbCIsIlN0eWxlZFRpdGxlIiwiQ2VudGVyRmxleGJveCIsInRleHRDb2xvciIsIkFuaW1hdGlvblNwZWVkVG9nZ2xlIiwidXBkYXRlQW5pbWF0aW9uU3BlZWQiLCJzcGVlZCIsIlRJTUVfQU5JTUFUSU9OX1NQRUVEIiwibWFwIiwibGFiZWwiLCJ2YWx1ZSIsIlRpbWVXaWRnZXQiLCJmaWVsZHMiLCJmaWVsZFNlbGVjdG9yIiwiZmlsdGVyIiwiZiIsInR5cGUiLCJlbmxhcmdlZElkeCIsImVubGFyZ2VGaWx0ZXIiLCJpc0FueUZpbHRlckFuaW1hdGluZyIsInNldEZpbHRlciIsInNldEZpbHRlclBsb3QiLCJ0b2dnbGVBbmltYXRpb24iLCJuYW1lIiwieUF4aXNGaWVsZHNTZWxlY3RvciIsInlBeGlzIiwiQ29tcG9uZW50IiwiVGltZVdpZGdldEZhY3RvcnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLElBQU1BLFdBQVcsR0FBRyxFQUFwQjs7QUFFQSxJQUFNQyxlQUFlLEdBQUdDLDBCQUFPQyxHQUFWLG9CQUVKLFVBQUFDLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4s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ZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQge2NyZWF0ZVNlbGVjdG9yfSBmcm9tICdyZXNlbGVjdCc7XG5cbmltcG9ydCBGaWVsZFNlbGVjdG9yIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ZpZWxkLXNlbGVjdG9yJztcbmltcG9ydCB7U2VsZWN0VGV4dEJvbGQsIEljb25Sb3VuZFNtYWxsLCBDZW50ZXJGbGV4Ym94fSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgVGltZVJhbmdlRmlsdGVyIGZyb20gJ2NvbXBvbmVudHMvZmlsdGVycy90aW1lLXJhbmdlLWZpbHRlcic7XG5pbXBvcnQge0Nsb3NlLCBDbG9jaywgTGluZUNoYXJ0fSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9pY29ucyc7XG5pbXBvcnQge1RJTUVfQU5JTUFUSU9OX1NQRUVEfSBmcm9tICd1dGlscy9maWx0ZXItdXRpbHMnO1xuY29uc3QgaW5uZXJQZFNpZGUgPSAzMjtcblxuY29uc3QgV2lkZ2V0Q29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBwYWRkaW5nLXRvcDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zaWRlUGFuZWwubWFyZ2luLnRvcH1weDtcbiAgcGFkZGluZy1yaWdodDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zaWRlUGFuZWwubWFyZ2luLnJpZ2h0fXB4O1xuICBwYWRkaW5nLWJvdHRvbTogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zaWRlUGFuZWwubWFyZ2luLmJvdHRvbX1weDtcbiAgcGFkZGluZy1sZWZ0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNpZGVQYW5lbC5tYXJnaW4ubGVmdH1weDtcbiAgYm90dG9tOiAwO1xuICByaWdodDogMDtcbiAgei1pbmRleDogMTtcbiAgd2lkdGg6ICR7cHJvcHMgPT4gcHJvcHMud2lkdGh9cHg7XG5cbiAgLmJvdHRvbS13aWRnZXQtLWlubmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNpZGVQYW5lbEJnfTtcbiAgICBwYWRkaW5nOiAxMHB4ICR7aW5uZXJQZFNpZGV9cHg7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB9XG5gO1xuXG5jb25zdCBUb3BTZWN0aW9uV3JhcHBlciA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZy1yaWdodDogJHtpbm5lclBkU2lkZSAqIDJ9cHg7XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmxhYmVsQ29sb3J9O1xuXG4gIC5ib3R0b20td2lkZ2V0X195LWF4aXMge1xuICAgIGZsZXgtZ3JvdzogMTtcbiAgICBtYXJnaW4tbGVmdDogMjBweDtcbiAgfVxuXG4gIC5ib3R0b20td2lkZ2V0X19maWVsZC1zZWxlY3Qge1xuICAgIHdpZHRoOiAxNjBweDtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIH1cbmA7XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5jb25zdCBUYWJzID0gc3R5bGVkLmRpdmBcbiAgcGFkZGluZy1yaWdodDogNzZweDtcbmA7XG5cbmNvbnN0IFRhYiA9IHN0eWxlZC5kaXZgXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZFxuICAgICR7cHJvcHMgPT4gKHByb3BzLmFjdGl2ZSA/IHByb3BzLnRoZW1lLnRleHRDb2xvckhsIDogJ3RyYW5zcGFyZW50Jyl9O1xuICBjb2xvcjogJHtwcm9wcyA9PlxuICBwcm9wcy5hY3RpdmUgPyBwcm9wcy50aGVtZS50ZXh0Q29sb3JIbCA6IHByb3BzLnRoZW1lLmxhYmVsQ29sb3J9O1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgaGVpZ2h0OiAyNHB4O1xuICBtYXJnaW4tcmlnaHQ6IDRweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB3aWR0aDogMjRweDtcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XG5cbiAgOmhvdmVyIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gIH1cbmA7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG5cbmNvbnN0IFN0eWxlZFRpdGxlID0gc3R5bGVkKENlbnRlckZsZXhib3gpYFxuICBmbGV4LWdyb3c6IDA7XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvcn07XG5cbiAgLmJvdHRvbS13aWRnZXRfX2ljb24ge1xuICAgIG1hcmdpbi1yaWdodDogNnB4O1xuICB9XG5gO1xuXG5jb25zdCBBbmltYXRpb25TcGVlZFRvZ2dsZSA9ICh7dXBkYXRlQW5pbWF0aW9uU3BlZWQsIHNwZWVkfSkgPT4gKFxuICA8VGFicz5cbiAgICB7VElNRV9BTklNQVRJT05fU1BFRUQubWFwKCh7bGFiZWwsIHZhbHVlfSkgPT4gKFxuICAgICAgPFRhYiBrZXk9e3ZhbHVlfSBhY3RpdmU9e3ZhbHVlID09PSBzcGVlZH1cbiAgICAgICAgb25DbGljaz17KCkgPT4gdXBkYXRlQW5pbWF0aW9uU3BlZWQodmFsdWUpfT57bGFiZWx9PC9UYWI+XG4gICAgKSl9XG4gIDwvVGFicz5cbik7XG5cbmV4cG9ydCBjbGFzcyBUaW1lV2lkZ2V0IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgZmllbGRTZWxlY3RvciA9IHByb3BzID0+IHByb3BzLmZpZWxkcztcbiAgeUF4aXNGaWVsZHNTZWxlY3RvciA9IGNyZWF0ZVNlbGVjdG9yKHRoaXMuZmllbGRTZWxlY3RvciwgZmllbGRzID0+XG4gICAgZmllbGRzLmZpbHRlcihmID0+IGYudHlwZSA9PT0gJ2ludGVnZXInIHx8IGYudHlwZSA9PT0gJ3JlYWwnKVxuICApO1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBlbmxhcmdlZElkeCxcbiAgICAgIGVubGFyZ2VGaWx0ZXIsXG4gICAgICBmaWx0ZXIsXG4gICAgICBpc0FueUZpbHRlckFuaW1hdGluZyxcbiAgICAgIHNldEZpbHRlcixcbiAgICAgIHNldEZpbHRlclBsb3QsXG4gICAgICB0b2dnbGVBbmltYXRpb24sXG4gICAgICB1cGRhdGVBbmltYXRpb25TcGVlZCxcbiAgICAgIHdpZHRoXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFdpZGdldENvbnRhaW5lciB3aWR0aD17d2lkdGh9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvdHRvbS13aWRnZXQtLWlubmVyXCI+XG4gICAgICAgICAgPFRvcFNlY3Rpb25XcmFwcGVyPlxuICAgICAgICAgICAgPFN0eWxlZFRpdGxlIGNsYXNzTmFtZT1cImJvdHRvbS13aWRnZXRfX2ZpZWxkXCI+XG4gICAgICAgICAgICAgIDxDZW50ZXJGbGV4Ym94IGNsYXNzTmFtZT1cImJvdHRvbS13aWRnZXRfX2ljb25cIj5cbiAgICAgICAgICAgICAgICA8Q2xvY2sgaGVpZ2h0PVwiMTVweFwiLz5cbiAgICAgICAgICAgICAgPC9DZW50ZXJGbGV4Ym94PlxuICAgICAgICAgICAgICA8U2VsZWN0VGV4dEJvbGQ+e2ZpbHRlci5uYW1lfTwvU2VsZWN0VGV4dEJvbGQ+XG4gICAgICAgICAgICA8L1N0eWxlZFRpdGxlPlxuICAgICAgICAgICAgPFN0eWxlZFRpdGxlIGNsYXNzTmFtZT1cImJvdHRvbS13aWRnZXRfX3ktYXhpc1wiPlxuICAgICAgICAgICAgICA8Q2VudGVyRmxleGJveCBjbGFzc05hbWU9XCJib3R0b20td2lkZ2V0X19pY29uXCI+XG4gICAgICAgICAgICAgICAgPExpbmVDaGFydCBoZWlnaHQ9XCIxNXB4XCIvPlxuICAgICAgICAgICAgICA8L0NlbnRlckZsZXhib3g+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm90dG9tLXdpZGdldF9fZmllbGQtc2VsZWN0XCI+XG4gICAgICAgICAgICAgICAgPEZpZWxkU2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgIGZpZWxkcz17dGhpcy55QXhpc0ZpZWxkc1NlbGVjdG9yKHRoaXMucHJvcHMpfVxuICAgICAgICAgICAgICAgICAgcGxhY2VtZW50PVwidG9wXCJcbiAgICAgICAgICAgICAgICAgIGlkPVwic2VsZWN0ZWQtdGltZS13aWRnZXQtZmllbGRcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2ZpbHRlci55QXhpcyA/IGZpbHRlci55QXhpcy5uYW1lIDogbnVsbH1cbiAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXt2YWx1ZSA9PiBzZXRGaWx0ZXJQbG90KGVubGFyZ2VkSWR4LCB7eUF4aXM6IHZhbHVlfSl9XG4gICAgICAgICAgICAgICAgICBpbnB1dFRoZW1lPVwic2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VsZWN0IFkgQXhpc1wiXG4gICAgICAgICAgICAgICAgICBlcmFzYWJsZVxuICAgICAgICAgICAgICAgICAgc2hvd1Rva2VuPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvU3R5bGVkVGl0bGU+XG4gICAgICAgICAgICA8QW5pbWF0aW9uU3BlZWRUb2dnbGVcbiAgICAgICAgICAgICAgdXBkYXRlQW5pbWF0aW9uU3BlZWQ9eyhzcGVlZCkgPT4gdXBkYXRlQW5pbWF0aW9uU3BlZWQoZW5sYXJnZWRJZHgsIHNwZWVkKX1cbiAgICAgICAgICAgICAgc3BlZWQ9e2ZpbHRlci5zcGVlZH0vPlxuICAgICAgICAgICAgPEljb25Sb3VuZFNtYWxsPlxuICAgICAgICAgICAgICA8Q2xvc2UgaGVpZ2h0PVwiMTJweFwiIG9uQ2xpY2s9eygpID0+IGVubGFyZ2VGaWx0ZXIoZW5sYXJnZWRJZHgpfSAvPlxuICAgICAgICAgICAgPC9JY29uUm91bmRTbWFsbD5cbiAgICAgICAgICA8L1RvcFNlY3Rpb25XcmFwcGVyPlxuICAgICAgICAgIDxUaW1lUmFuZ2VGaWx0ZXJcbiAgICAgICAgICAgIGZpbHRlcj17ZmlsdGVyfVxuICAgICAgICAgICAgc2V0RmlsdGVyPXt2YWx1ZSA9PiBzZXRGaWx0ZXIoZW5sYXJnZWRJZHgsICd2YWx1ZScsIHZhbHVlKX1cbiAgICAgICAgICAgIGlzQW55RmlsdGVyQW5pbWF0aW5nPXtpc0FueUZpbHRlckFuaW1hdGluZ31cbiAgICAgICAgICAgIHVwZGF0ZUFuaW1hdGlvblNwZWVkPXsoc3BlZWQpID0+IHVwZGF0ZUFuaW1hdGlvblNwZWVkKGVubGFyZ2VkSWR4LCBzcGVlZCl9XG4gICAgICAgICAgICB0b2dnbGVBbmltYXRpb249eygpID0+IHRvZ2dsZUFuaW1hdGlvbihlbmxhcmdlZElkeCl9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L1dpZGdldENvbnRhaW5lcj5cbiAgICApO1xuICB9XG59XG5cbmNvbnN0IFRpbWVXaWRnZXRGYWN0b3J5ID0gKCkgPT4gVGltZVdpZGdldDtcbmV4cG9ydCBkZWZhdWx0IFRpbWVXaWRnZXRGYWN0b3J5O1xuIl19