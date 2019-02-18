"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NotificationPanelFactory;

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

var _notificationItem = _interopRequireDefault(require("./notification-panel/notification-item"));

var _defaultSettings = require("../constants/default-settings");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  background: transparent;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  padding: 4px;\n  overflow-y: scroll;\n  overflow-x: hidden;\n  position: absolute;\n  top: 1em;\n  right: 1em;\n  z-index: 10000;\n  box-sizing: border-box;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var NotificationPanelContent = _styledComponents.default.div(_templateObject());

NotificationPanelFactory.deps = [_notificationItem.default];

function NotificationPanelFactory(NotificationItem) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2.default)(NotificationPanel, _Component);

    function NotificationPanel() {
      (0, _classCallCheck2.default)(this, NotificationPanel);
      return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(NotificationPanel).apply(this, arguments));
    }

    (0, _createClass2.default)(NotificationPanel, [{
      key: "render",
      value: function render() {
        var _this = this;

        return _react.default.createElement(NotificationPanelContent, {
          className: "notification-panel"
        }, this.props.notifications.filter(function (n) {
          return n.topic === _defaultSettings.DEFAULT_NOTIFICATION_TOPICS.global;
        }).map(function (n) {
          return _react.default.createElement(NotificationItem, {
            key: n.id,
            notification: n,
            removeNotification: _this.props.removeNotification
          });
        }));
      }
    }]);
    return NotificationPanel;
  }(_react.Component), (0, _defineProperty2.default)(_class, "propTypes", {
    removeNotification: _propTypes.default.func.isRequired,
    notifications: _propTypes.default.arrayOf(_propTypes.default.object).isRequired
  }), _temp;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL25vdGlmaWNhdGlvbi1wYW5lbC5qcyJdLCJuYW1lcyI6WyJOb3RpZmljYXRpb25QYW5lbENvbnRlbnQiLCJzdHlsZWQiLCJkaXYiLCJOb3RpZmljYXRpb25QYW5lbEZhY3RvcnkiLCJkZXBzIiwiTm90aWZpY2F0aW9uSXRlbUZhY3RvcnkiLCJOb3RpZmljYXRpb25JdGVtIiwicHJvcHMiLCJub3RpZmljYXRpb25zIiwiZmlsdGVyIiwibiIsInRvcGljIiwiREVGQVVMVF9OT1RJRklDQVRJT05fVE9QSUNTIiwiZ2xvYmFsIiwibWFwIiwiaWQiLCJyZW1vdmVOb3RpZmljYXRpb24iLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJmdW5jIiwiaXNSZXF1aXJlZCIsImFycmF5T2YiLCJvYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLHdCQUF3QixHQUFHQywwQkFBT0MsR0FBVixtQkFBOUI7O0FBZUFDLHdCQUF3QixDQUFDQyxJQUF6QixHQUFnQyxDQUM5QkMseUJBRDhCLENBQWhDOztBQUllLFNBQVNGLHdCQUFULENBQ2JHLGdCQURhLEVBRWI7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsK0JBTVc7QUFBQTs7QUFDUCxlQUNFLDZCQUFDLHdCQUFEO0FBQTBCLFVBQUEsU0FBUyxFQUFDO0FBQXBDLFdBQ0csS0FBS0MsS0FBTCxDQUFXQyxhQUFYLENBQ0VDLE1BREYsQ0FDUyxVQUFBQyxDQUFDO0FBQUEsaUJBQUlBLENBQUMsQ0FBQ0MsS0FBRixLQUFZQyw2Q0FBNEJDLE1BQTVDO0FBQUEsU0FEVixFQUVFQyxHQUZGLENBRU0sVUFBQUosQ0FBQztBQUFBLGlCQUNKLDZCQUFDLGdCQUFEO0FBQ0UsWUFBQSxHQUFHLEVBQUVBLENBQUMsQ0FBQ0ssRUFEVDtBQUVFLFlBQUEsWUFBWSxFQUFFTCxDQUZoQjtBQUdFLFlBQUEsa0JBQWtCLEVBQUUsS0FBSSxDQUFDSCxLQUFMLENBQVdTO0FBSGpDLFlBREk7QUFBQSxTQUZQLENBREgsQ0FERjtBQWNEO0FBckJIO0FBQUE7QUFBQSxJQUF1Q0MsZ0JBQXZDLHNEQUNxQjtBQUNqQkQsSUFBQUEsa0JBQWtCLEVBQUVFLG1CQUFVQyxJQUFWLENBQWVDLFVBRGxCO0FBRWpCWixJQUFBQSxhQUFhLEVBQUVVLG1CQUFVRyxPQUFWLENBQWtCSCxtQkFBVUksTUFBNUIsRUFBb0NGO0FBRmxDLEdBRHJCO0FBdUJEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCBOb3RpZmljYXRpb25JdGVtRmFjdG9yeSBmcm9tICcuL25vdGlmaWNhdGlvbi1wYW5lbC9ub3RpZmljYXRpb24taXRlbSc7XG5pbXBvcnQge0RFRkFVTFRfTk9USUZJQ0FUSU9OX1RPUElDU30gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuXG5jb25zdCBOb3RpZmljYXRpb25QYW5lbENvbnRlbnQgPSBzdHlsZWQuZGl2YFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xuICBwYWRkaW5nOiA0cHg7XG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcbiAgb3ZlcmZsb3cteDogaGlkZGVuO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMWVtO1xuICByaWdodDogMWVtO1xuICB6LWluZGV4OiAxMDAwMDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbmA7XG5cbk5vdGlmaWNhdGlvblBhbmVsRmFjdG9yeS5kZXBzID0gW1xuICBOb3RpZmljYXRpb25JdGVtRmFjdG9yeVxuXTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTm90aWZpY2F0aW9uUGFuZWxGYWN0b3J5IChcbiAgTm90aWZpY2F0aW9uSXRlbVxuKSB7XG4gIHJldHVybiBjbGFzcyBOb3RpZmljYXRpb25QYW5lbCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgIHJlbW92ZU5vdGlmaWNhdGlvbjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIG5vdGlmaWNhdGlvbnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpLmlzUmVxdWlyZWRcbiAgICB9O1xuXG4gICAgcmVuZGVyKCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPE5vdGlmaWNhdGlvblBhbmVsQ29udGVudCBjbGFzc05hbWU9XCJub3RpZmljYXRpb24tcGFuZWxcIj5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5ub3RpZmljYXRpb25zXG4gICAgICAgICAgICAuZmlsdGVyKG4gPT4gbi50b3BpYyA9PT0gREVGQVVMVF9OT1RJRklDQVRJT05fVE9QSUNTLmdsb2JhbClcbiAgICAgICAgICAgIC5tYXAobiA9PiAoXG4gICAgICAgICAgICAgIDxOb3RpZmljYXRpb25JdGVtXG4gICAgICAgICAgICAgICAga2V5PXtuLmlkfVxuICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbj17bn1cbiAgICAgICAgICAgICAgICByZW1vdmVOb3RpZmljYXRpb249e3RoaXMucHJvcHMucmVtb3ZlTm90aWZpY2F0aW9ufVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSlcbiAgICAgICAgICB9XG4gICAgICAgIDwvTm90aWZpY2F0aW9uUGFuZWxDb250ZW50PlxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxuIl19