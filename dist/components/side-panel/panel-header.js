"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SaveExportDropdown = exports.PanelAction = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents2 = require("../common/styled-components");

var _logo = _interopRequireDefault(require("../common/logo"));

var _icons = require("../common/icons");

var _panelDropdown = _interopRequireDefault(require("./panel-dropdown"));

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  background-color: ", ";\n  box-shadow: ", ";\n  font-size: 11px;\n  padding: 16px 0;\n  position: absolute;\n  transition: ", ";\n  display: flex;\n  margin-top: ", ";\n  opacity: ", ";\n  transform: translateX(calc(-50% + 20px));\n  pointer-events:  ", ";\n  z-index: 1000;\n\n  .save-export-dropdown__inner {\n    box-shadow: none;\n    background-color: transparent;\n    display: flex;\n  }\n\n  .save-export-dropdown__item {\n    align-items: center;\n    border-right: 1px solid ", ";\n    color: ", ";\n    display: flex;\n    flex-direction: column;\n    padding: 0 22px;\n\n    :hover {\n      cursor: pointer;\n      color: ", ";\n    }\n\n    &:last-child {\n      border-right: 0;\n    }\n  }\n\n  .save-export-dropdown__title {\n    white-space: nowrap;\n    margin-top: 4px;\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  align-items: center;\n  border-radius: 2px;\n  color: ", ";\n  display: flex;\n  height: 26px;\n  justify-content: space-between;\n  margin-left: 4px;\n  width: 70px;\n  padding: 5px;\n  font-weight: bold;\n  a {\n    height: 20px;\n  }\n\n  :hover {\n    cursor: pointer;\n    background-color: ", ";\n    color: ", ";\n\n    a {\n      color: ", ";\n    }\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 16px;\n  width: 100%;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  background-color: ", ";\n  padding: 12px 16px 0 16px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var StyledPanelHeader = _styledComponents.default.div.attrs({
  className: 'side-side-panel__header'
})(_templateObject(), function (props) {
  return props.theme.sidePanelHeaderBg;
});

var StyledPanelHeaderTop = _styledComponents.default.div.attrs({
  className: 'side-panel__header__top'
})(_templateObject2());

var StyledPanelTopActions = _styledComponents.default.div.attrs({
  className: 'side-panel__header__actions'
})(_templateObject3());

var StyledPanelAction = _styledComponents.default.div.attrs({
  className: 'side-panel__header__actions'
})(_templateObject4(), function (props) {
  return props.active ? props.theme.textColorHl : props.theme.subtextColor;
}, function (props) {
  return props.theme.secondaryBtnActBgd;
}, function (props) {
  return props.theme.textColorHl;
}, function (props) {
  return props.theme.textColorHl;
});

var StyledPanelDropdown = _styledComponents.default.div(_templateObject5(), function (props) {
  return props.theme.dropdownListBgd;
}, function (props) {
  return props.theme.dropdownListShadow;
}, function (props) {
  return props.theme.transitionSlow;
}, function (props) {
  return props.show ? '6px' : '20px';
}, function (props) {
  return props.show ? 1 : 0;
}, function (props) {
  return props.show ? 'all' : 'none';
}, function (props) {
  return props.theme.panelHeaderIcon;
}, function (props) {
  return props.theme.textColor;
}, function (props) {
  return props.theme.textColorHl;
});

var PanelAction = function PanelAction(_ref) {
  var item = _ref.item,
      onClick = _ref.onClick;
  return _react.default.createElement(StyledPanelAction, {
    className: "side-panel__panel-header__action",
    "data-tip": true,
    "data-for": "".concat(item.id, "-action"),
    onClick: onClick
  }, item.label ? _react.default.createElement("p", null, item.label) : null, _react.default.createElement("a", {
    target: item.blank ? '_blank' : '',
    href: item.href
  }, _react.default.createElement(item.iconComponent, {
    height: "20px"
  })), item.tooltip ? _react.default.createElement(_styledComponents2.Tooltip, {
    id: "".concat(item.id, "-action"),
    place: "bottom",
    delayShow: 500,
    effect: "solid"
  }, _react.default.createElement("span", null, item.tooltip)) : null);
};

exports.PanelAction = PanelAction;

var PanelItem = function PanelItem(_ref2) {
  var onClose = _ref2.onClose,
      onClickHandler = _ref2.onClickHandler,
      label = _ref2.label,
      icon = _ref2.icon;
  return _react.default.createElement("div", {
    className: "save-export-dropdown__item",
    onClick: function onClick(e) {
      e.stopPropagation();
      onClose();
      onClickHandler();
    }
  }, icon, _react.default.createElement("div", {
    className: "save-export-dropdown__title"
  }, label));
};

var SaveExportDropdown = function SaveExportDropdown(_ref3) {
  var onExportImage = _ref3.onExportImage,
      onExportData = _ref3.onExportData,
      onExportConfig = _ref3.onExportConfig,
      onSaveMap = _ref3.onSaveMap,
      show = _ref3.show,
      onClose = _ref3.onClose;
  return _react.default.createElement(StyledPanelDropdown, {
    show: show,
    className: "save-export-dropdown"
  }, _react.default.createElement(_panelDropdown.default, {
    className: "save-export-dropdown__inner",
    show: show,
    onClose: onClose
  }, _react.default.createElement(PanelItem, {
    label: "Export Image",
    onClickHandler: onExportImage,
    onClose: onClose,
    icon: _react.default.createElement(_icons.Picture, {
      height: "16px"
    })
  }), _react.default.createElement(PanelItem, {
    label: "Export Data",
    onClickHandler: onExportData,
    onClose: onClose,
    icon: _react.default.createElement(_icons.Files, {
      height: "16px"
    })
  }), _react.default.createElement(PanelItem, {
    label: "Export Config",
    onClickHandler: onExportConfig,
    onClose: onClose,
    icon: _react.default.createElement(_icons.CodeAlt, {
      height: "16px"
    })
  }), onSaveMap ? _react.default.createElement(PanelItem, {
    label: "Save Map Url",
    onClickHandler: onSaveMap,
    onClose: onClose,
    icon: _react.default.createElement(_icons.Share, {
      height: "16px"
    })
  }) : null));
};

exports.SaveExportDropdown = SaveExportDropdown;
var defaultActionItems = [{
  id: 'save',
  iconComponent: _icons.Save,
  onClick: function onClick() {},
  label: 'Share',
  dropdownComponent: SaveExportDropdown
}];

function PanelHeaderFactory() {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2.default)(PanelHeader, _Component);

    function PanelHeader() {
      (0, _classCallCheck2.default)(this, PanelHeader);
      return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PanelHeader).apply(this, arguments));
    }

    (0, _createClass2.default)(PanelHeader, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            appName = _this$props.appName,
            version = _this$props.version,
            actionItems = _this$props.actionItems,
            onSaveMap = _this$props.onSaveMap,
            onExportImage = _this$props.onExportImage,
            onExportData = _this$props.onExportData,
            onExportConfig = _this$props.onExportConfig,
            visibleDropdown = _this$props.visibleDropdown,
            showExportDropdown = _this$props.showExportDropdown,
            hideExportDropdown = _this$props.hideExportDropdown;
        return _react.default.createElement(StyledPanelHeader, {
          className: "side-panel__panel-header"
        }, _react.default.createElement(StyledPanelHeaderTop, {
          className: "side-panel__panel-header__top"
        }, _react.default.createElement(this.props.logoComponent, {
          appName: appName,
          version: version
        }), _react.default.createElement(StyledPanelTopActions, null, actionItems.map(function (item) {
          return _react.default.createElement("div", {
            className: "side-panel__panel-header__right",
            key: item.id,
            style: {
              position: 'relative'
            }
          }, _react.default.createElement(PanelAction, {
            item: item,
            onClick: function onClick() {
              if (item.dropdownComponent) {
                showExportDropdown(item.id);
              }

              item.onClick();
            }
          }), item.dropdownComponent ? _react.default.createElement(item.dropdownComponent, {
            onClose: hideExportDropdown,
            show: visibleDropdown === item.id,
            onSaveMap: onSaveMap,
            onExportData: onExportData,
            onExportImage: onExportImage,
            onExportConfig: onExportConfig
          }) : null);
        }))));
      }
    }]);
    return PanelHeader;
  }(_react.Component), (0, _defineProperty2.default)(_class, "propTypes", {
    appName: _propTypes.default.string,
    version: _propTypes.default.string,
    uiState: _propTypes.default.object,
    uiStateActions: _propTypes.default.object,
    logoComponent: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func]),
    actionItems: _propTypes.default.arrayOf(_propTypes.default.any)
  }), (0, _defineProperty2.default)(_class, "defaultProps", {
    logoComponent: _logo.default,
    actionItems: defaultActionItems
  }), _temp;
}

var _default = PanelHeaderFactory;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvcGFuZWwtaGVhZGVyLmpzIl0sIm5hbWVzIjpbIlN0eWxlZFBhbmVsSGVhZGVyIiwic3R5bGVkIiwiZGl2IiwiYXR0cnMiLCJjbGFzc05hbWUiLCJwcm9wcyIsInRoZW1lIiwic2lkZVBhbmVsSGVhZGVyQmciLCJTdHlsZWRQYW5lbEhlYWRlclRvcCIsIlN0eWxlZFBhbmVsVG9wQWN0aW9ucyIsIlN0eWxlZFBhbmVsQWN0aW9uIiwiYWN0aXZlIiwidGV4dENvbG9ySGwiLCJzdWJ0ZXh0Q29sb3IiLCJzZWNvbmRhcnlCdG5BY3RCZ2QiLCJTdHlsZWRQYW5lbERyb3Bkb3duIiwiZHJvcGRvd25MaXN0QmdkIiwiZHJvcGRvd25MaXN0U2hhZG93IiwidHJhbnNpdGlvblNsb3ciLCJzaG93IiwicGFuZWxIZWFkZXJJY29uIiwidGV4dENvbG9yIiwiUGFuZWxBY3Rpb24iLCJpdGVtIiwib25DbGljayIsImlkIiwibGFiZWwiLCJibGFuayIsImhyZWYiLCJ0b29sdGlwIiwiUGFuZWxJdGVtIiwib25DbG9zZSIsIm9uQ2xpY2tIYW5kbGVyIiwiaWNvbiIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJTYXZlRXhwb3J0RHJvcGRvd24iLCJvbkV4cG9ydEltYWdlIiwib25FeHBvcnREYXRhIiwib25FeHBvcnRDb25maWciLCJvblNhdmVNYXAiLCJkZWZhdWx0QWN0aW9uSXRlbXMiLCJpY29uQ29tcG9uZW50IiwiU2F2ZSIsImRyb3Bkb3duQ29tcG9uZW50IiwiUGFuZWxIZWFkZXJGYWN0b3J5IiwiYXBwTmFtZSIsInZlcnNpb24iLCJhY3Rpb25JdGVtcyIsInZpc2libGVEcm9wZG93biIsInNob3dFeHBvcnREcm9wZG93biIsImhpZGVFeHBvcnREcm9wZG93biIsIm1hcCIsInBvc2l0aW9uIiwiQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwic3RyaW5nIiwidWlTdGF0ZSIsIm9iamVjdCIsInVpU3RhdGVBY3Rpb25zIiwibG9nb0NvbXBvbmVudCIsIm9uZU9mVHlwZSIsImVsZW1lbnQiLCJmdW5jIiwiYXJyYXlPZiIsImFueSIsIktlcGxlckdsTG9nbyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGlCQUFpQixHQUFHQywwQkFBT0MsR0FBUCxDQUFXQyxLQUFYLENBQWlCO0FBQ3pDQyxFQUFBQSxTQUFTLEVBQUU7QUFEOEIsQ0FBakIsQ0FBSCxvQkFHRCxVQUFBQyxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlDLGlCQUFoQjtBQUFBLENBSEosQ0FBdkI7O0FBT0EsSUFBTUMsb0JBQW9CLEdBQUdQLDBCQUFPQyxHQUFQLENBQVdDLEtBQVgsQ0FBaUI7QUFDNUNDLEVBQUFBLFNBQVMsRUFBRTtBQURpQyxDQUFqQixDQUFILG9CQUExQjs7QUFTQSxJQUFNSyxxQkFBcUIsR0FBR1IsMEJBQU9DLEdBQVAsQ0FBV0MsS0FBWCxDQUFpQjtBQUM3Q0MsRUFBQUEsU0FBUyxFQUFFO0FBRGtDLENBQWpCLENBQUgsb0JBQTNCOztBQU1BLElBQU1NLGlCQUFpQixHQUFHVCwwQkFBT0MsR0FBUCxDQUFXQyxLQUFYLENBQWlCO0FBQ3pDQyxFQUFBQSxTQUFTLEVBQUU7QUFEOEIsQ0FBakIsQ0FBSCxxQkFLWixVQUFBQyxLQUFLO0FBQUEsU0FDWkEsS0FBSyxDQUFDTSxNQUFOLEdBQWVOLEtBQUssQ0FBQ0MsS0FBTixDQUFZTSxXQUEzQixHQUF5Q1AsS0FBSyxDQUFDQyxLQUFOLENBQVlPLFlBRHpDO0FBQUEsQ0FMTyxFQW9CQyxVQUFBUixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlRLGtCQUFoQjtBQUFBLENBcEJOLEVBcUJWLFVBQUFULEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUND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LGNBQWMsRUFBRUosbUJBQVVHLE1BSlQ7QUFLakJFLElBQUFBLGFBQWEsRUFBRUwsbUJBQVVNLFNBQVYsQ0FBb0IsQ0FBQ04sbUJBQVVPLE9BQVgsRUFBb0JQLG1CQUFVUSxJQUE5QixDQUFwQixDQUxFO0FBTWpCZixJQUFBQSxXQUFXLEVBQUVPLG1CQUFVUyxPQUFWLENBQWtCVCxtQkFBVVUsR0FBNUI7QUFOSSxHQURyQix5REFVd0I7QUFDcEJMLElBQUFBLGFBQWEsRUFBRU0sYUFESztBQUVwQmxCLElBQUFBLFdBQVcsRUFBRVA7QUFGTyxHQVZ4QjtBQWdFRDs7ZUFFY0ksa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7VG9vbHRpcH0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IEtlcGxlckdsTG9nbyBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9sb2dvJztcbmltcG9ydCB7Q29kZUFsdCwgU2F2ZSwgRmlsZXMsIFNoYXJlLCBQaWN0dXJlfSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9pY29ucyc7XG5pbXBvcnQgQ2xpY2tPdXRzaWRlQ2xvc2VEcm9wZG93biBmcm9tICdjb21wb25lbnRzL3NpZGUtcGFuZWwvcGFuZWwtZHJvcGRvd24nO1xuXG5jb25zdCBTdHlsZWRQYW5lbEhlYWRlciA9IHN0eWxlZC5kaXYuYXR0cnMoe1xuICBjbGFzc05hbWU6ICdzaWRlLXNpZGUtcGFuZWxfX2hlYWRlcidcbn0pYFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNpZGVQYW5lbEhlYWRlckJnfTtcbiAgcGFkZGluZzogMTJweCAxNnB4IDAgMTZweDtcbmA7XG5cbmNvbnN0IFN0eWxlZFBhbmVsSGVhZGVyVG9wID0gc3R5bGVkLmRpdi5hdHRycyh7XG4gIGNsYXNzTmFtZTogJ3NpZGUtcGFuZWxfX2hlYWRlcl9fdG9wJ1xufSlgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgd2lkdGg6IDEwMCU7XG5gO1xuXG5jb25zdCBTdHlsZWRQYW5lbFRvcEFjdGlvbnMgPSBzdHlsZWQuZGl2LmF0dHJzKHtcbiAgY2xhc3NOYW1lOiAnc2lkZS1wYW5lbF9faGVhZGVyX19hY3Rpb25zJ1xufSlgXG4gIGRpc3BsYXk6IGZsZXg7XG5gO1xuXG5jb25zdCBTdHlsZWRQYW5lbEFjdGlvbiA9IHN0eWxlZC5kaXYuYXR0cnMoe1xuICBjbGFzc05hbWU6ICdzaWRlLXBhbmVsX19oZWFkZXJfX2FjdGlvbnMnXG59KWBcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xuICBjb2xvcjogJHtwcm9wcyA9PlxuICAgIHByb3BzLmFjdGl2ZSA/IHByb3BzLnRoZW1lLnRleHRDb2xvckhsIDogcHJvcHMudGhlbWUuc3VidGV4dENvbG9yfTtcbiAgZGlzcGxheTogZmxleDtcbiAgaGVpZ2h0OiAyNnB4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIG1hcmdpbi1sZWZ0OiA0cHg7XG4gIHdpZHRoOiA3MHB4O1xuICBwYWRkaW5nOiA1cHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBhIHtcbiAgICBoZWlnaHQ6IDIwcHg7XG4gIH1cblxuICA6aG92ZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNlY29uZGFyeUJ0bkFjdEJnZH07XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9ySGx9O1xuXG4gICAgYSB7XG4gICAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JIbH07XG4gICAgfVxuICB9XG5gO1xuXG5jb25zdCBTdHlsZWRQYW5lbERyb3Bkb3duID0gc3R5bGVkLmRpdmBcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5kcm9wZG93bkxpc3RCZ2R9O1xuICBib3gtc2hhZG93OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmRyb3Bkb3duTGlzdFNoYWRvd307XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgcGFkZGluZzogMTZweCAwO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRyYW5zaXRpb246ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudHJhbnNpdGlvblNsb3d9O1xuICBkaXNwbGF5OiBmbGV4O1xuICBtYXJnaW4tdG9wOiAke3Byb3BzID0+IHByb3BzLnNob3cgPyAnNnB4JyA6ICcyMHB4J307XG4gIG9wYWNpdHk6ICR7cHJvcHMgPT4gcHJvcHMuc2hvdyA/IDEgOiAwfTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKGNhbGMoLTUwJSArIDIwcHgpKTtcbiAgcG9pbnRlci1ldmVudHM6ICAke3Byb3BzID0+IHByb3BzLnNob3cgPyAnYWxsJyA6ICdub25lJ307XG4gIHotaW5kZXg6IDEwMDA7XG5cbiAgLnNhdmUtZXhwb3J0LWRyb3Bkb3duX19pbm5lciB7XG4gICAgYm94LXNoYWRvdzogbm9uZTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICB9XG5cbiAgLnNhdmUtZXhwb3J0LWRyb3Bkb3duX19pdGVtIHtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxIZWFkZXJJY29ufTtcbiAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3J9O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBwYWRkaW5nOiAwIDIycHg7XG5cbiAgICA6aG92ZXIge1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9ySGx9O1xuICAgIH1cblxuICAgICY6bGFzdC1jaGlsZCB7XG4gICAgICBib3JkZXItcmlnaHQ6IDA7XG4gICAgfVxuICB9XG5cbiAgLnNhdmUtZXhwb3J0LWRyb3Bkb3duX190aXRsZSB7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICBtYXJnaW4tdG9wOiA0cHg7XG4gIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBQYW5lbEFjdGlvbiA9ICh7aXRlbSwgb25DbGlja30pID0+IChcbiAgPFN0eWxlZFBhbmVsQWN0aW9uIGNsYXNzTmFtZT1cInNpZGUtcGFuZWxfX3BhbmVsLWhlYWRlcl9fYWN0aW9uXCJcbiAgICBkYXRhLXRpcCBkYXRhLWZvcj17YCR7aXRlbS5pZH0tYWN0aW9uYH0gb25DbGljaz17b25DbGlja30+XG4gICAge2l0ZW0ubGFiZWwgPyA8cD57aXRlbS5sYWJlbH08L3A+IDogbnVsbH1cbiAgICA8YSB0YXJnZXQ9e2l0ZW0uYmxhbmsgPyAnX2JsYW5rJyA6ICcnfSBocmVmPXtpdGVtLmhyZWZ9PlxuICAgICAgPGl0ZW0uaWNvbkNvbXBvbmVudCBoZWlnaHQ9XCIyMHB4XCIgLz5cbiAgICA8L2E+XG4gICAge2l0ZW0udG9vbHRpcCA/ICg8VG9vbHRpcFxuICAgICAgaWQ9e2Ake2l0ZW0uaWR9LWFjdGlvbmB9XG4gICAgICBwbGFjZT1cImJvdHRvbVwiXG4gICAgICBkZWxheVNob3c9ezUwMH1cbiAgICAgIGVmZmVjdD1cInNvbGlkXCJcbiAgICA+XG4gICAgICA8c3Bhbj57aXRlbS50b29sdGlwfTwvc3Bhbj5cbiAgICA8L1Rvb2x0aXA+KSA6IG51bGwgfVxuICA8L1N0eWxlZFBhbmVsQWN0aW9uPlxuKTtcblxuY29uc3QgUGFuZWxJdGVtID0gKHtvbkNsb3NlLCBvbkNsaWNrSGFuZGxlciwgbGFiZWwsIGljb259KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwic2F2ZS1leHBvcnQtZHJvcGRvd25fX2l0ZW1cIiBvbkNsaWNrPXsoZSkgPT4ge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgb25DbG9zZSgpO1xuICAgIG9uQ2xpY2tIYW5kbGVyKCk7XG4gIH19PlxuICAgIHtpY29ufVxuICAgIDxkaXYgY2xhc3NOYW1lPVwic2F2ZS1leHBvcnQtZHJvcGRvd25fX3RpdGxlXCI+e2xhYmVsfTwvZGl2PlxuICA8L2Rpdj5cbik7XG5cbmV4cG9ydCBjb25zdCBTYXZlRXhwb3J0RHJvcGRvd24gPSAoe1xuICBvbkV4cG9ydEltYWdlLFxuICBvbkV4cG9ydERhdGEsXG4gIG9uRXhwb3J0Q29uZmlnLFxuICBvblNhdmVNYXAsXG4gIHNob3csXG4gIG9uQ2xvc2Vcbn0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8U3R5bGVkUGFuZWxEcm9wZG93biBzaG93PXtzaG93fSBjbGFzc05hbWU9XCJzYXZlLWV4cG9ydC1kcm9wZG93blwiPlxuICAgICAgPENsaWNrT3V0c2lkZUNsb3NlRHJvcGRvd24gY2xhc3NOYW1lPVwic2F2ZS1leHBvcnQtZHJvcGRvd25fX2lubmVyXCJcbiAgICAgICAgc2hvdz17c2hvd31cbiAgICAgICAgb25DbG9zZT17b25DbG9zZX0+XG4gICAgICAgIDxQYW5lbEl0ZW1cbiAgICAgICAgICBsYWJlbD1cIkV4cG9ydCBJbWFnZVwiXG4gICAgICAgICAgb25DbGlja0hhbmRsZXI9e29uRXhwb3J0SW1hZ2V9XG4gICAgICAgICAgb25DbG9zZT17b25DbG9zZX1cbiAgICAgICAgICBpY29uPXsoPFBpY3R1cmUgaGVpZ2h0PVwiMTZweFwiIC8+KX1cbiAgICAgICAgLz5cblxuICAgICAgICA8UGFuZWxJdGVtXG4gICAgICAgICAgbGFiZWw9XCJFeHBvcnQgRGF0YVwiXG4gICAgICAgICAgb25DbGlja0hhbmRsZXI9e29uRXhwb3J0RGF0YX1cbiAgICAgICAgICBvbkNsb3NlPXtvbkNsb3NlfVxuICAgICAgICAgIGljb249eyg8RmlsZXMgaGVpZ2h0PVwiMTZweFwiIC8+KX1cbiAgICAgICAgLz5cblxuICAgICAgICA8UGFuZWxJdGVtXG4gICAgICAgICAgbGFiZWw9XCJFeHBvcnQgQ29uZmlnXCJcbiAgICAgICAgICBvbkNsaWNrSGFuZGxlcj17b25FeHBvcnRDb25maWd9XG4gICAgICAgICAgb25DbG9zZT17b25DbG9zZX1cbiAgICAgICAgICBpY29uPXsoPENvZGVBbHQgaGVpZ2h0PVwiMTZweFwiIC8+KX1cbiAgICAgICAgLz5cblxuICAgICAgICB7b25TYXZlTWFwID8gKFxuICAgICAgICAgIDxQYW5lbEl0ZW1cbiAgICAgICAgICAgIGxhYmVsPVwiU2F2ZSBNYXAgVXJsXCJcbiAgICAgICAgICAgIG9uQ2xpY2tIYW5kbGVyPXtvblNhdmVNYXB9XG4gICAgICAgICAgICBvbkNsb3NlPXtvbkNsb3NlfVxuICAgICAgICAgICAgaWNvbj17KDxTaGFyZSBoZWlnaHQ9XCIxNnB4XCIgLz4pfVxuICAgICAgICAgIC8+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgPC9DbGlja091dHNpZGVDbG9zZURyb3Bkb3duPlxuICAgIDwvU3R5bGVkUGFuZWxEcm9wZG93bj5cbiAgKTtcbn07XG5cbmNvbnN0IGRlZmF1bHRBY3Rpb25JdGVtcyA9IFtcbiAge1xuICAgIGlkOiAnc2F2ZScsXG4gICAgaWNvbkNvbXBvbmVudDogU2F2ZSxcbiAgICBvbkNsaWNrOiAoKSA9PiB7fSxcbiAgICBsYWJlbDogJ1NoYXJlJyxcbiAgICBkcm9wZG93bkNvbXBvbmVudDogU2F2ZUV4cG9ydERyb3Bkb3duXG4gIH1cbl07XG5cbmZ1bmN0aW9uIFBhbmVsSGVhZGVyRmFjdG9yeSgpIHtcbiAgcmV0dXJuIGNsYXNzIFBhbmVsSGVhZGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgYXBwTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIHZlcnNpb246IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICB1aVN0YXRlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgdWlTdGF0ZUFjdGlvbnM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICBsb2dvQ29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZWxlbWVudCwgUHJvcFR5cGVzLmZ1bmNdKSxcbiAgICAgIGFjdGlvbkl0ZW1zOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KVxuICAgIH07XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgbG9nb0NvbXBvbmVudDogS2VwbGVyR2xMb2dvLFxuICAgICAgYWN0aW9uSXRlbXM6IGRlZmF1bHRBY3Rpb25JdGVtc1xuICAgIH07XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGFwcE5hbWUsXG4gICAgICAgIHZlcnNpb24sXG4gICAgICAgIGFjdGlvbkl0ZW1zLFxuICAgICAgICBvblNhdmVNYXAsXG4gICAgICAgIG9uRXhwb3J0SW1hZ2UsXG4gICAgICAgIG9uRXhwb3J0RGF0YSxcbiAgICAgICAgb25FeHBvcnRDb25maWcsXG4gICAgICAgIHZpc2libGVEcm9wZG93bixcbiAgICAgICAgc2hvd0V4cG9ydERyb3Bkb3duLFxuICAgICAgICBoaWRlRXhwb3J0RHJvcGRvd25cbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8U3R5bGVkUGFuZWxIZWFkZXIgY2xhc3NOYW1lPVwic2lkZS1wYW5lbF9fcGFuZWwtaGVhZGVyXCI+XG4gICAgICAgICAgPFN0eWxlZFBhbmVsSGVhZGVyVG9wIGNsYXNzTmFtZT1cInNpZGUtcGFuZWxfX3BhbmVsLWhlYWRlcl9fdG9wXCI+XG4gICAgICAgICAgICA8dGhpcy5wcm9wcy5sb2dvQ29tcG9uZW50IGFwcE5hbWU9e2FwcE5hbWV9IHZlcnNpb249e3ZlcnNpb259Lz5cbiAgICAgICAgICAgIDxTdHlsZWRQYW5lbFRvcEFjdGlvbnM+XG4gICAgICAgICAgICAgIHthY3Rpb25JdGVtcy5tYXAoaXRlbSA9PiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaWRlLXBhbmVsX19wYW5lbC1oZWFkZXJfX3JpZ2h0XCJcbiAgICAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5pZH0gc3R5bGU9e3twb3NpdGlvbjogJ3JlbGF0aXZlJ319PlxuICAgICAgICAgICAgICAgICAgPFBhbmVsQWN0aW9uXG4gICAgICAgICAgICAgICAgICAgIGl0ZW09e2l0ZW19XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5kcm9wZG93bkNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0V4cG9ydERyb3Bkb3duKGl0ZW0uaWQpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBpdGVtLm9uQ2xpY2soKTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICB7aXRlbS5kcm9wZG93bkNvbXBvbmVudCA/IChcbiAgICAgICAgICAgICAgICAgICAgPGl0ZW0uZHJvcGRvd25Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsb3NlPXtoaWRlRXhwb3J0RHJvcGRvd259XG4gICAgICAgICAgICAgICAgICAgICAgc2hvdz17dmlzaWJsZURyb3Bkb3duID09PSBpdGVtLmlkfVxuICAgICAgICAgICAgICAgICAgICAgIG9uU2F2ZU1hcD17b25TYXZlTWFwfVxuICAgICAgICAgICAgICAgICAgICAgIG9uRXhwb3J0RGF0YT17b25FeHBvcnREYXRhfVxuICAgICAgICAgICAgICAgICAgICAgIG9uRXhwb3J0SW1hZ2U9e29uRXhwb3J0SW1hZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgb25FeHBvcnRDb25maWc9e29uRXhwb3J0Q29uZmlnfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9TdHlsZWRQYW5lbFRvcEFjdGlvbnM+XG4gICAgICAgICAgPC9TdHlsZWRQYW5lbEhlYWRlclRvcD5cbiAgICAgICAgPC9TdHlsZWRQYW5lbEhlYWRlcj5cbiAgICAgICk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhbmVsSGVhZGVyRmFjdG9yeTtcbiJdfQ==