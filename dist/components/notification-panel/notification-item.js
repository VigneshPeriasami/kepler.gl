"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NotificationItemFactory;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

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

var _icons = require("../common/icons");

var _reactMarkdown = _interopRequireDefault(require("react-markdown"));

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  svg {\n    vertical-align: text-top;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  flex-grow: 2;\n  width: ", "px;\n  margin: 0 1em;\n  overflow: ", ";\n  padding-right: ", ";\n  p {\n    margin-top: 0;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  cursor: pointer;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  background-color: ", ";\n  color: #fff;\n  display: flex;\n  flex-direction: row;\n  width: ", "px;\n  height: ", "px;\n  font-size: 10px;\n  margin-bottom: 1rem;\n  padding: 1em;\n  border-radius: 4px;\n  box-shadow: ", ";\n  cursor: pointer;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var NotificationItemContent = _styledComponents.default.div(_templateObject(), function (props) {
  return props.theme.notificationColors[props.notification.type] || '#000';
}, function (props) {
  return props.theme.notificationPanelItemWidth * (1 + Number(props.isExpanded));
}, function (props) {
  return props.theme.notificationPanelItemHeight * (1 + Number(props.isExpanded));
}, function (props) {
  return props.theme.boxShadow;
});

var DeleteIcon = (0, _styledComponents.default)(_icons.Delete)(_templateObject2());

var NotificationMessage = _styledComponents.default.div(_templateObject3(), function (props) {
  return props.theme.notificationPanelItemWidth;
}, function (props) {
  return props.isExpanded ? 'auto' : 'hidden';
}, function (props) {
  return props.isExpanded ? '1em' : 0;
});

var NotificationIcon = _styledComponents.default.div(_templateObject4());

var icons = {
  info: _react.default.createElement(_icons.Info, null),
  warning: _react.default.createElement(_icons.Warning, null),
  error: _react.default.createElement(_icons.Warning, null),
  success: _react.default.createElement(_icons.Checkmark, null)
};

function NotificationItemFactory() {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2.default)(NotificationItem, _Component);

    function NotificationItem(props) {
      var _this;

      (0, _classCallCheck2.default)(this, NotificationItem);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(NotificationItem).call(this, props));
      _this.state = {
        isExpanded: false
      };
      return _this;
    }

    (0, _createClass2.default)(NotificationItem, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var _this$props = this.props,
            notification = _this$props.notification,
            removeNotification = _this$props.removeNotification;
        return _react.default.createElement(NotificationItemContent, (0, _extends2.default)({
          className: "notification-item"
        }, this.props, {
          onClick: function onClick() {
            return _this2.setState({
              isExpanded: !_this2.state.isExpanded
            });
          },
          isExpanded: this.state.isExpanded
        }), _react.default.createElement(NotificationIcon, {
          className: "notification-item--icon"
        }, icons[notification.type]), _react.default.createElement(NotificationMessage, {
          className: "notification-item--message",
          expanded: this.state.isExpanded,
          theme: this.props.theme
        }, _react.default.createElement(_reactMarkdown.default, {
          source: notification.message
        })), _react.default.createElement("div", {
          className: "notification-item--action"
        }, _react.default.createElement(DeleteIcon, {
          height: "10px",
          onClick: function onClick() {
            return removeNotification(notification.id);
          }
        })));
      }
    }]);
    return NotificationItem;
  }(_react.Component), (0, _defineProperty2.default)(_class, "propTypes", {
    notification: _propTypes.default.shape({
      id: _propTypes.default.string.isRequired,
      type: _propTypes.default.string.isRequired,
      message: _propTypes.default.string.isRequired
    }).isRequired
  }), _temp;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL25vdGlmaWNhdGlvbi1wYW5lbC9ub3RpZmljYXRpb24taXRlbS5qcyJdLCJuYW1lcyI6WyJOb3RpZmljYXRpb25JdGVtQ29udGVudCIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJub3RpZmljYXRpb25Db2xvcnMiLCJub3RpZmljYXRpb24iLCJ0eXBlIiwibm90aWZpY2F0aW9uUGFuZWxJdGVtV2lkdGgiLCJOdW1iZXIiLCJpc0V4cGFuZGVkIiwibm90aWZpY2F0aW9uUGFuZWxJdGVtSGVpZ2h0IiwiYm94U2hhZG93IiwiRGVsZXRlSWNvbiIsIkRlbGV0ZSIsIk5vdGlmaWNhdGlvbk1lc3NhZ2UiLCJOb3RpZmljYXRpb25JY29uIiwiaWNvbnMiLCJpbmZvIiwid2FybmluZyIsImVycm9yIiwic3VjY2VzcyIsIk5vdGlmaWNhdGlvbkl0ZW1GYWN0b3J5Iiwic3RhdGUiLCJyZW1vdmVOb3RpZmljYXRpb24iLCJzZXRTdGF0ZSIsIm1lc3NhZ2UiLCJpZCIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsInNoYXBlIiwic3RyaW5nIiwiaXNSZXF1aXJlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSx1QkFBdUIsR0FBR0MsMEJBQU9DLEdBQVYsb0JBQ1AsVUFBQUMsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZQyxrQkFBWixDQUErQkYsS0FBSyxDQUFDRyxZQUFOLENBQW1CQyxJQUFsRCxLQUEyRCxNQUEvRDtBQUFBLENBREUsRUFLbEIsVUFBQUosS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZSSwwQkFBWixJQUEwQyxJQUFJQyxNQUFNLENBQUNOLEtBQUssQ0FBQ08sVUFBUCxDQUFwRCxDQUFK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LEVBQUVFLG1CQUFVRSxNQUFWLENBQWlCQyxVQURPO0FBRTVCekIsTUFBQUEsSUFBSSxFQUFFc0IsbUJBQVVFLE1BQVYsQ0FBaUJDLFVBRks7QUFHNUJOLE1BQUFBLE9BQU8sRUFBRUcsbUJBQVVFLE1BQVYsQ0FBaUJDO0FBSEUsS0FBaEIsRUFJWEE7QUFMYyxHQURyQjtBQTBDRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHtEZWxldGUsIEluZm8sIFdhcm5pbmcsIENoZWNrbWFya30gZnJvbSAnY29tcG9uZW50cy9jb21tb24vaWNvbnMnO1xuaW1wb3J0IFJlYWN0TWFya2Rvd24gZnJvbSAncmVhY3QtbWFya2Rvd24nO1xuXG5jb25zdCBOb3RpZmljYXRpb25JdGVtQ29udGVudCA9IHN0eWxlZC5kaXZgXG4gIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubm90aWZpY2F0aW9uQ29sb3JzW3Byb3BzLm5vdGlmaWNhdGlvbi50eXBlXSB8fCAnIzAwMCd9O1xuICBjb2xvcjogI2ZmZjtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgd2lkdGg6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubm90aWZpY2F0aW9uUGFuZWxJdGVtV2lkdGggKiAoMSArIE51bWJlcihwcm9wcy5pc0V4cGFuZGVkKSl9cHg7XG4gIGhlaWdodDogJHtwcm9wcyA9PiBcbiAgICBwcm9wcy50aGVtZS5ub3RpZmljYXRpb25QYW5lbEl0ZW1IZWlnaHQgKiAoMSArIE51bWJlcihwcm9wcy5pc0V4cGFuZGVkKSkgXG4gIH1weDtcbiAgZm9udC1zaXplOiAxMHB4O1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICBwYWRkaW5nOiAxZW07XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYm94LXNoYWRvdzogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5ib3hTaGFkb3d9O1xuICBjdXJzb3I6IHBvaW50ZXI7XG5gO1xuXG5jb25zdCBEZWxldGVJY29uID0gc3R5bGVkKERlbGV0ZSlgXG4gIGN1cnNvcjogcG9pbnRlcjtcbmA7XG5cbmNvbnN0IE5vdGlmaWNhdGlvbk1lc3NhZ2UgPSBzdHlsZWQuZGl2YFxuICBmbGV4LWdyb3c6IDI7XG4gIHdpZHRoOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLm5vdGlmaWNhdGlvblBhbmVsSXRlbVdpZHRofXB4O1xuICBtYXJnaW46IDAgMWVtO1xuICBvdmVyZmxvdzogJHtwcm9wcyA9PiBwcm9wcy5pc0V4cGFuZGVkID8gJ2F1dG8nIDogJ2hpZGRlbid9O1xuICBwYWRkaW5nLXJpZ2h0OiAke3Byb3BzID0+IHByb3BzLmlzRXhwYW5kZWQgPyAnMWVtJyA6IDB9O1xuICBwIHtcbiAgICBtYXJnaW4tdG9wOiAwO1xuICB9XG5gO1xuXG5jb25zdCBOb3RpZmljYXRpb25JY29uID0gc3R5bGVkLmRpdmBcbiAgc3ZnIHtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdGV4dC10b3A7XG4gIH1cbmA7XG5cbmNvbnN0IGljb25zID0ge1xuICBpbmZvOiA8SW5mbyAvPixcbiAgd2FybmluZzogPFdhcm5pbmcgLz4sXG4gIGVycm9yOiA8V2FybmluZyAvPixcbiAgc3VjY2VzczogPENoZWNrbWFyayAvPlxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTm90aWZpY2F0aW9uSXRlbUZhY3RvcnkoKVxue1xuICByZXR1cm4gY2xhc3MgTm90aWZpY2F0aW9uSXRlbSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgIG5vdGlmaWNhdGlvbjogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgdHlwZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcbiAgICAgIH0pLmlzUmVxdWlyZWRcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIGlzRXhwYW5kZWQ6IGZhbHNlXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgIGNvbnN0IHtub3RpZmljYXRpb24sIHJlbW92ZU5vdGlmaWNhdGlvbn0gPSB0aGlzLnByb3BzO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPE5vdGlmaWNhdGlvbkl0ZW1Db250ZW50XG4gICAgICAgICAgY2xhc3NOYW1lPVwibm90aWZpY2F0aW9uLWl0ZW1cIlxuICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0U3RhdGUoe2lzRXhwYW5kZWQ6ICF0aGlzLnN0YXRlLmlzRXhwYW5kZWR9KX1cbiAgICAgICAgICBpc0V4cGFuZGVkPXt0aGlzLnN0YXRlLmlzRXhwYW5kZWR9PlxuICAgICAgICAgIDxOb3RpZmljYXRpb25JY29uXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJub3RpZmljYXRpb24taXRlbS0taWNvblwiPlxuICAgICAgICAgICAge2ljb25zW25vdGlmaWNhdGlvbi50eXBlXX1cbiAgICAgICAgICA8L05vdGlmaWNhdGlvbkljb24+XG4gICAgICAgICAgPE5vdGlmaWNhdGlvbk1lc3NhZ2VcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm5vdGlmaWNhdGlvbi1pdGVtLS1tZXNzYWdlXCJcbiAgICAgICAgICAgIGV4cGFuZGVkPXt0aGlzLnN0YXRlLmlzRXhwYW5kZWR9XG4gICAgICAgICAgICB0aGVtZT17dGhpcy5wcm9wcy50aGVtZX0+XG4gICAgICAgICAgICA8UmVhY3RNYXJrZG93biBzb3VyY2U9e25vdGlmaWNhdGlvbi5tZXNzYWdlfSAvPlxuICAgICAgICAgIDwvTm90aWZpY2F0aW9uTWVzc2FnZT5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJub3RpZmljYXRpb24taXRlbS0tYWN0aW9uXCI+XG4gICAgICAgICAgICA8RGVsZXRlSWNvbiBoZWlnaHQ9XCIxMHB4XCIgb25DbGljaz17KCkgPT4gcmVtb3ZlTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbi5pZCl9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvTm90aWZpY2F0aW9uSXRlbUNvbnRlbnQ+XG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIl19