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
  var data = (0, _taggedTemplateLiteral2.default)(["\n  border-bottom: 1px solid\n    ", ";\n  color: ", ";\n  display: inline-block;\n  font-size: 12px;\n  height: 24px;\n  margin-right: 4px;\n  text-align: center;\n  width: 24px;\n  line-height: 24px;\n  \n  :hover {\n    cursor: pointer;\n  }\n"]);

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
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n  padding-right: ", "px;\n  color: ", ";\n  \n  .bottom-widget__y-axis {\n    flex-grow: 1;\n    margin-left: 20px;\n  }\n  \n  .bottom-widget__field-select {\n    width: 160px;\n    display: inline-block;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n  padding-top: ", "px;\n  padding-right: ", "px;\n  padding-bottom: ", "px;\n  padding-left: ", "px;  \n  bottom: 0;\n  right: 0;\n  z-index: 1;\n  width: ", "px;\n\n  .bottom-widget--inner {\n    background-color: ", ";\n    padding: 10px ", "px;\n    position: relative;\n  }\n"]);

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


var StyledTitle = _styledComponents2.CenterFlexbox.extend(_templateObject5(), function (props) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpbHRlcnMvdGltZS13aWRnZXQuanMiXSwibmFtZXMiOlsiaW5uZXJQZFNpZGUiLCJXaWRnZXRDb250YWluZXIiLCJzdHlsZWQiLCJkaXYiLCJwcm9wcyIsInRoZW1lIiwic2lkZVBhbmVsIiwibWFyZ2luIiwidG9wIiwicmlnaHQiLCJib3R0b20iLCJsZWZ0Iiwid2lkdGgiLCJzaWRlUGFuZWxCZyIsIlRvcFNlY3Rpb25XcmFwcGVyIiwibGFiZWxDb2xvciIsIlRhYnMiLCJUYWIiLCJhY3RpdmUiLCJ0ZXh0Q29sb3JIbCIsIlN0eWxlZFRpdGxlIiwiQ2VudGVyRmxleGJveCIsImV4dGVuZCIsInRleHRDb2xvciIsIkFuaW1hdGlvblNwZWVkVG9nZ2xlIiwidXBkYXRlQW5pbWF0aW9uU3BlZWQiLCJzcGVlZCIsIlRJTUVfQU5JTUFUSU9OX1NQRUVEIiwibWFwIiwibGFiZWwiLCJ2YWx1ZSIsIlRpbWVXaWRnZXQiLCJmaWVsZHMiLCJmaWVsZFNlbGVjdG9yIiwiZmlsdGVyIiwiZiIsInR5cGUiLCJlbmxhcmdlZElkeCIsImVubGFyZ2VGaWx0ZXIiLCJpc0FueUZpbHRlckFuaW1hdGluZyIsInNldEZpbHRlciIsInNldEZpbHRlclBsb3QiLCJ0b2dnbGVBbmltYXRpb24iLCJuYW1lIiwieUF4aXNGaWVsZHNTZWxlY3RvciIsInlBeGlzIiwiQ29tcG9uZW50IiwiVGltZVdpZGdldEZhY3RvcnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLElBQU1BLFdBQVcsR0FBRyxFQUFwQjs7QUFFQSxJQUFNQyxlQUFlLEdBQUdDLDBCQUFPQyxHQUFWLG9CQUVKLFVBQUFDLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENB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c291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7Y3JlYXRlU2VsZWN0b3J9IGZyb20gJ3Jlc2VsZWN0JztcblxuaW1wb3J0IEZpZWxkU2VsZWN0b3IgZnJvbSAnY29tcG9uZW50cy9jb21tb24vZmllbGQtc2VsZWN0b3InO1xuaW1wb3J0IHtTZWxlY3RUZXh0Qm9sZCwgSWNvblJvdW5kU21hbGwsIENlbnRlckZsZXhib3h9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBUaW1lUmFuZ2VGaWx0ZXIgZnJvbSAnY29tcG9uZW50cy9maWx0ZXJzL3RpbWUtcmFuZ2UtZmlsdGVyJztcbmltcG9ydCB7Q2xvc2UsIENsb2NrLCBMaW5lQ2hhcnR9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ljb25zJztcbmltcG9ydCB7VElNRV9BTklNQVRJT05fU1BFRUR9IGZyb20gJ3V0aWxzL2ZpbHRlci11dGlscyc7XG5jb25zdCBpbm5lclBkU2lkZSA9IDMyO1xuXG5jb25zdCBXaWRnZXRDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHBhZGRpbmctdG9wOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNpZGVQYW5lbC5tYXJnaW4udG9wfXB4O1xuICBwYWRkaW5nLXJpZ2h0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNpZGVQYW5lbC5tYXJnaW4ucmlnaHR9cHg7XG4gIHBhZGRpbmctYm90dG9tOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNpZGVQYW5lbC5tYXJnaW4uYm90dG9tfXB4O1xuICBwYWRkaW5nLWxlZnQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2lkZVBhbmVsLm1hcmdpbi5sZWZ0fXB4OyAgXG4gIGJvdHRvbTogMDtcbiAgcmlnaHQ6IDA7XG4gIHotaW5kZXg6IDE7XG4gIHdpZHRoOiAke3Byb3BzID0+IHByb3BzLndpZHRofXB4O1xuXG4gIC5ib3R0b20td2lkZ2V0LS1pbm5lciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zaWRlUGFuZWxCZ307XG4gICAgcGFkZGluZzogMTBweCAke2lubmVyUGRTaWRlfXB4O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgfVxuYDtcblxuY29uc3QgVG9wU2VjdGlvbldyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmctcmlnaHQ6ICR7aW5uZXJQZFNpZGUgKiAyfXB4O1xuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5sYWJlbENvbG9yfTtcbiAgXG4gIC5ib3R0b20td2lkZ2V0X195LWF4aXMge1xuICAgIGZsZXgtZ3JvdzogMTtcbiAgICBtYXJnaW4tbGVmdDogMjBweDtcbiAgfVxuICBcbiAgLmJvdHRvbS13aWRnZXRfX2ZpZWxkLXNlbGVjdCB7XG4gICAgd2lkdGg6IDE2MHB4O1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgfVxuYDtcblxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbmNvbnN0IFRhYnMgPSBzdHlsZWQuZGl2YFxuICBwYWRkaW5nLXJpZ2h0OiA3NnB4O1xuYDtcblxuY29uc3QgVGFiID0gc3R5bGVkLmRpdmBcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkXG4gICAgJHtwcm9wcyA9PiAocHJvcHMuYWN0aXZlID8gcHJvcHMudGhlbWUudGV4dENvbG9ySGwgOiAndHJhbnNwYXJlbnQnKX07XG4gIGNvbG9yOiAke3Byb3BzID0+XG4gIHByb3BzLmFjdGl2ZSA/IHByb3BzLnRoZW1lLnRleHRDb2xvckhsIDogcHJvcHMudGhlbWUubGFiZWxDb2xvcn07XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgZm9udC1zaXplOiAxMnB4O1xuICBoZWlnaHQ6IDI0cHg7XG4gIG1hcmdpbi1yaWdodDogNHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiAyNHB4O1xuICBsaW5lLWhlaWdodDogMjRweDtcbiAgXG4gIDpob3ZlciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICB9XG5gO1xuLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xuXG5jb25zdCBTdHlsZWRUaXRsZSA9IENlbnRlckZsZXhib3guZXh0ZW5kYFxuICBmbGV4LWdyb3c6IDA7XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvcn07XG5cbiAgLmJvdHRvbS13aWRnZXRfX2ljb24ge1xuICAgIG1hcmdpbi1yaWdodDogNnB4O1xuICB9XG5gO1xuXG5jb25zdCBBbmltYXRpb25TcGVlZFRvZ2dsZSA9ICh7dXBkYXRlQW5pbWF0aW9uU3BlZWQsIHNwZWVkfSkgPT4gKFxuICA8VGFicz5cbiAgICB7VElNRV9BTklNQVRJT05fU1BFRUQubWFwKCh7bGFiZWwsIHZhbHVlfSkgPT4gKFxuICAgICAgPFRhYiBrZXk9e3ZhbHVlfSBhY3RpdmU9e3ZhbHVlID09PSBzcGVlZH1cbiAgICAgICAgb25DbGljaz17KCkgPT4gdXBkYXRlQW5pbWF0aW9uU3BlZWQodmFsdWUpfT57bGFiZWx9PC9UYWI+XG4gICAgKSl9XG4gIDwvVGFicz5cbik7XG5cbmV4cG9ydCBjbGFzcyBUaW1lV2lkZ2V0IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgZmllbGRTZWxlY3RvciA9IHByb3BzID0+IHByb3BzLmZpZWxkcztcbiAgeUF4aXNGaWVsZHNTZWxlY3RvciA9IGNyZWF0ZVNlbGVjdG9yKHRoaXMuZmllbGRTZWxlY3RvciwgZmllbGRzID0+XG4gICAgZmllbGRzLmZpbHRlcihmID0+IGYudHlwZSA9PT0gJ2ludGVnZXInIHx8IGYudHlwZSA9PT0gJ3JlYWwnKVxuICApO1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBlbmxhcmdlZElkeCxcbiAgICAgIGVubGFyZ2VGaWx0ZXIsXG4gICAgICBmaWx0ZXIsXG4gICAgICBpc0FueUZpbHRlckFuaW1hdGluZyxcbiAgICAgIHNldEZpbHRlcixcbiAgICAgIHNldEZpbHRlclBsb3QsXG4gICAgICB0b2dnbGVBbmltYXRpb24sXG4gICAgICB1cGRhdGVBbmltYXRpb25TcGVlZCxcbiAgICAgIHdpZHRoXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFdpZGdldENvbnRhaW5lciB3aWR0aD17d2lkdGh9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvdHRvbS13aWRnZXQtLWlubmVyXCI+XG4gICAgICAgICAgPFRvcFNlY3Rpb25XcmFwcGVyPlxuICAgICAgICAgICAgPFN0eWxlZFRpdGxlIGNsYXNzTmFtZT1cImJvdHRvbS13aWRnZXRfX2ZpZWxkXCI+XG4gICAgICAgICAgICAgIDxDZW50ZXJGbGV4Ym94IGNsYXNzTmFtZT1cImJvdHRvbS13aWRnZXRfX2ljb25cIj5cbiAgICAgICAgICAgICAgICA8Q2xvY2sgaGVpZ2h0PVwiMTVweFwiLz5cbiAgICAgICAgICAgICAgPC9DZW50ZXJGbGV4Ym94PlxuICAgICAgICAgICAgICA8U2VsZWN0VGV4dEJvbGQ+e2ZpbHRlci5uYW1lfTwvU2VsZWN0VGV4dEJvbGQ+XG4gICAgICAgICAgICA8L1N0eWxlZFRpdGxlPlxuICAgICAgICAgICAgPFN0eWxlZFRpdGxlIGNsYXNzTmFtZT1cImJvdHRvbS13aWRnZXRfX3ktYXhpc1wiPlxuICAgICAgICAgICAgICA8Q2VudGVyRmxleGJveCBjbGFzc05hbWU9XCJib3R0b20td2lkZ2V0X19pY29uXCI+XG4gICAgICAgICAgICAgICAgPExpbmVDaGFydCBoZWlnaHQ9XCIxNXB4XCIvPlxuICAgICAgICAgICAgICA8L0NlbnRlckZsZXhib3g+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm90dG9tLXdpZGdldF9fZmllbGQtc2VsZWN0XCI+XG4gICAgICAgICAgICAgICAgPEZpZWxkU2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgIGZpZWxkcz17dGhpcy55QXhpc0ZpZWxkc1NlbGVjdG9yKHRoaXMucHJvcHMpfVxuICAgICAgICAgICAgICAgICAgcGxhY2VtZW50PVwidG9wXCJcbiAgICAgICAgICAgICAgICAgIGlkPVwic2VsZWN0ZWQtdGltZS13aWRnZXQtZmllbGRcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2ZpbHRlci55QXhpcyA/IGZpbHRlci55QXhpcy5uYW1lIDogbnVsbH1cbiAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXt2YWx1ZSA9PiBzZXRGaWx0ZXJQbG90KGVubGFyZ2VkSWR4LCB7eUF4aXM6IHZhbHVlfSl9XG4gICAgICAgICAgICAgICAgICBpbnB1dFRoZW1lPVwic2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VsZWN0IFkgQXhpc1wiXG4gICAgICAgICAgICAgICAgICBlcmFzYWJsZVxuICAgICAgICAgICAgICAgICAgc2hvd1Rva2VuPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvU3R5bGVkVGl0bGU+XG4gICAgICAgICAgICA8QW5pbWF0aW9uU3BlZWRUb2dnbGVcbiAgICAgICAgICAgICAgdXBkYXRlQW5pbWF0aW9uU3BlZWQ9eyhzcGVlZCkgPT4gdXBkYXRlQW5pbWF0aW9uU3BlZWQoZW5sYXJnZWRJZHgsIHNwZWVkKX1cbiAgICAgICAgICAgICAgc3BlZWQ9e2ZpbHRlci5zcGVlZH0vPlxuICAgICAgICAgICAgPEljb25Sb3VuZFNtYWxsPlxuICAgICAgICAgICAgICA8Q2xvc2UgaGVpZ2h0PVwiMTJweFwiIG9uQ2xpY2s9eygpID0+IGVubGFyZ2VGaWx0ZXIoZW5sYXJnZWRJZHgpfSAvPlxuICAgICAgICAgICAgPC9JY29uUm91bmRTbWFsbD5cbiAgICAgICAgICA8L1RvcFNlY3Rpb25XcmFwcGVyPlxuICAgICAgICAgIDxUaW1lUmFuZ2VGaWx0ZXJcbiAgICAgICAgICAgIGZpbHRlcj17ZmlsdGVyfVxuICAgICAgICAgICAgc2V0RmlsdGVyPXt2YWx1ZSA9PiBzZXRGaWx0ZXIoZW5sYXJnZWRJZHgsICd2YWx1ZScsIHZhbHVlKX1cbiAgICAgICAgICAgIGlzQW55RmlsdGVyQW5pbWF0aW5nPXtpc0FueUZpbHRlckFuaW1hdGluZ31cbiAgICAgICAgICAgIHVwZGF0ZUFuaW1hdGlvblNwZWVkPXsoc3BlZWQpID0+IHVwZGF0ZUFuaW1hdGlvblNwZWVkKGVubGFyZ2VkSWR4LCBzcGVlZCl9XG4gICAgICAgICAgICB0b2dnbGVBbmltYXRpb249eygpID0+IHRvZ2dsZUFuaW1hdGlvbihlbmxhcmdlZElkeCl9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L1dpZGdldENvbnRhaW5lcj5cbiAgICApO1xuICB9XG59XG5cbmNvbnN0IFRpbWVXaWRnZXRGYWN0b3J5ID0gKCkgPT4gVGltZVdpZGdldDtcbmV4cG9ydCBkZWZhdWx0IFRpbWVXaWRnZXRGYWN0b3J5O1xuIl19