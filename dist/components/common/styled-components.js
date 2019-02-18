"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledMapContainer = exports.StyledModalContent = exports.Table = exports.DatasetSquare = exports.ButtonGroup = exports.StyledPanelDropdown = exports.StyledPanelHeader = exports.InlineInput = exports.InputLight = exports.Input = exports.Button = exports.Tooltip = exports.SidePanelDivider = exports.SidePanelSection = exports.PanelContent = exports.PanelHeaderContent = exports.PanelHeaderTitle = exports.PanelLabelBold = exports.PanelLabelWrapper = exports.PanelLabel = exports.CenterFlexbox = exports.IconRoundSmall = exports.SelectTextBold = exports.SelectText = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactTooltip = _interopRequireDefault(require("react-tooltip"));

function _templateObject24() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  .mapboxgl-map .mapboxgl-missing-css {\n    display: none;\n  }\n"]);

  _templateObject24 = function _templateObject24() {
    return data;
  };

  return data;
}

function _templateObject23() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  background: ", ";\n  color: ", ";\n  display: flex;\n  flex-direction: row;\n  font-size: 10px;\n  margin: 0 -96px;\n  padding: 30px 96px;\n  justify-content: space-between;\n"]);

  _templateObject23 = function _templateObject23() {
    return data;
  };

  return data;
}

function _templateObject22() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  width: 100%;\n  border-spacing: 0;\n\n  thead {\n    tr th {\n      background: ", ";\n      color: ", ";\n      padding: 18px 12px;\n      text-align: start;\n    }\n  }\n\n  tbody {\n   tr td {\n     border-bottom: ", ";\n     padding: 12px;\n   }\n  }\n"]);

  _templateObject22 = function _templateObject22() {
    return data;
  };

  return data;
}

function _templateObject21() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: inline-block;\n  width: 8px;\n  height: 8px;\n  background-color: rgb(", ");\n  margin-right: 12px\n"]);

  _templateObject21 = function _templateObject21() {
    return data;
  };

  return data;
}

function _templateObject20() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  .button {\n    border-radius: 0;\n    margin-left: 2px;\n  }\n  .button:first-child {\n    border-bottom-left-radius: ", ";\n    border-top-left-radius: ", ";\n    margin-left: 0;\n  }\n  .button:last-child {\n    border-bottom-right-radius: ", ";\n    border-top-right-radius: ", ";\n  }\n"]);

  _templateObject20 = function _templateObject20() {
    return data;
  };

  return data;
}

function _templateObject19() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  ", "\n  background-color: ", ";\n  overflow-y: auto;\n  box-shadow: ", ";\n  border-radius: ", ";\n  margin-top: 2px;\n  max-height: 500px;\n  position: relative;\n  z-index: 999;\n"]);

  _templateObject19 = function _templateObject19() {
    return data;
  };

  return data;
}

function _templateObject18() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  background-color: ", ";\n  border-left: 3px solid\n    rgb(\n      ", "\n    );\n  padding: 0 10px 0 0;\n  height: ", "px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  transition: ", ";\n"]);

  _templateObject18 = function _templateObject18() {
    return data;
  };

  return data;
}

function _templateObject17() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  ", ";\n"]);

  _templateObject17 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  ", "\n"]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  ", ";\n"]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  align-items: center;\n  background-color: ", ";\n  border-radius: ", ";\n  color: ", ";\n  cursor: pointer;\n  display: inline-flex;\n  font-size: ", ";\n  font-weight: 500;\n  justify-content: center;\n  letter-spacing: 0.3px;\n  line-height: 14px;\n  outline: 0;\n  padding: ", ";\n  text-align: center;\n  transition: ", ";\n  vertical-align: middle;\n  width: ", ";\n  opacity: ", ";\n  pointer-events: ", ";\n\n  :hover,\n  :focus,\n  :active,\n  &.active {\n    background-color: ", ";\n    color: ", ";\n  }\n\n  svg {\n    margin-right: 8px;\n  }\n"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  &.__react_component_tooltip {\n    font-size: 9.5px;\n    font-weight: 500;\n    padding: 7px 18px;\n\n    &.type-dark {\n      background-color: ", ";\n      color: ", ";\n      &.place-bottom {\n        :after {\n          border-bottom-color: ", ";\n        }\n      }\n\n      &.place-top {\n        :after {\n          border-top-color: ", ";\n        }\n      }\n\n      &.place-right {\n        :after {\n          border-right-color: ", ";\n        }\n      }\n\n      &.place-left {\n        :after {\n          border-left-color: ", ";\n        }\n      }\n    }\n  }\n"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  border-bottom: 1px solid ", ";\n  height: 12px;\n  margin-bottom: 12px;\n"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin-bottom: 12px;\n  opacity: ", ";\n  pointer-events: ", ";\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  background-color: ", ";\n  padding: 12px;\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  align-items: center;\n  color: ", ";\n  padding-left: 12px;\n\n  .icon {\n    color: ", ";\n    display: flex;\n    align-items: center;\n    margin-right: 12px;\n  }\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  font-size: 13px;\n  letter-spacing: 0.43px;\n  text-transform: capitalize;\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  font-weight: 500;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  align-items: self-start;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  display: inline-block;\n  font-size: 11px;\n  font-weight: 400;\n  margin-bottom: 4px;\n  text-transform: capitalize;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  align-items: center;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  width: 18px;\n  height: 18px;\n  border-radius: 9px;\n  background-color: ", "; // updated after checking sketch file\n  color: ", ";\n  align-items: center;\n  justify-content: center;\n\n  :hover {\n    cursor: pointer;\n    background-color: ", ";\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  font-weight: 500;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  font-size: ", ";\n  font-weight: 400;\n\n  i {\n    font-size: 13px;\n    margin-right: 6px;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var SelectText = _styledComponents.default.span(_templateObject(), function (props) {
  return props.theme.labelColor;
}, function (props) {
  return props.theme.selectFontSize;
});

exports.SelectText = SelectText;
var SelectTextBold = (0, _styledComponents.default)(SelectText)(_templateObject2(), function (props) {
  return props.theme.textColor;
});
exports.SelectTextBold = SelectTextBold;
var IconRoundSmall = (0, _styledComponents.default)('div')(_templateObject3(), function (props) {
  return props.theme.secondaryBtnBgdHover;
}, function (props) {
  return props.theme.secondaryBtnColor;
}, function (props) {
  return props.theme.secondaryBtnBgdHover;
});
exports.IconRoundSmall = IconRoundSmall;
var CenterFlexbox = (0, _styledComponents.default)('div')(_templateObject4());
exports.CenterFlexbox = CenterFlexbox;

var PanelLabel = _styledComponents.default.label.attrs({
  className: 'side-panel-panel__label'
})(_templateObject5(), function (props) {
  return props.theme.labelColor;
});

exports.PanelLabel = PanelLabel;

var PanelLabelWrapper = _styledComponents.default.div.attrs({
  className: 'side-panel-panel__label-wrapper'
})(_templateObject6());

exports.PanelLabelWrapper = PanelLabelWrapper;
var PanelLabelBold = (0, _styledComponents.default)(PanelLabel)(_templateObject7());
exports.PanelLabelBold = PanelLabelBold;

var PanelHeaderTitle = _styledComponents.default.span.attrs({
  className: 'side-panel-panel__header__title'
})(_templateObject8(), function (props) {
  return props.theme.textColor;
});

exports.PanelHeaderTitle = PanelHeaderTitle;

var PanelHeaderContent = _styledComponents.default.div(_templateObject9(), function (props) {
  return props.theme.textColor;
}, function (props) {
  return props.theme.labelColor;
});

exports.PanelHeaderContent = PanelHeaderContent;

var PanelContent = _styledComponents.default.div.attrs({
  className: 'side-panel-panel__content'
})(_templateObject10(), function (props) {
  return props.theme.panelBackground;
});

exports.PanelContent = PanelContent;

var SidePanelSection = _styledComponents.default.div.attrs({
  className: 'side-panel-section'
})(_templateObject11(), function (props) {
  return props.disabled ? 0.4 : 1;
}, function (props) {
  return props.disabled ? 'none' : 'all';
});

exports.SidePanelSection = SidePanelSection;

var SidePanelDivider = _styledComponents.default.div.attrs({
  className: 'side-panel-divider'
})(_templateObject12(), function (props) {
  return props.theme.panelBorderColor;
});

exports.SidePanelDivider = SidePanelDivider;
var Tooltip = (0, _styledComponents.default)(_reactTooltip.default)(_templateObject13(), function (props) {
  return props.theme.tooltipBg;
}, function (props) {
  return props.theme.tooltipColor;
}, function (props) {
  return props.theme.tooltipBg;
}, function (props) {
  return props.theme.tooltipBg;
}, function (props) {
  return props.theme.tooltipBg;
}, function (props) {
  return props.theme.tooltipBg;
});
exports.Tooltip = Tooltip;

var Button = _styledComponents.default.div.attrs({
  className: 'button'
})(_templateObject14(), function (props) {
  return props.negative ? props.theme.negativeBtnBgd : props.secondary ? props.theme.secondaryBtnBgd : props.link ? props.theme.linkBtnBgd : props.theme.primaryBtnBgd;
}, function (props) {
  return props.theme.primaryBtnRadius;
}, function (props) {
  return props.negative ? props.theme.negativeBtnColor : props.secondary ? props.theme.secondaryBtnColor : props.link ? props.theme.linkBtnColor : props.theme.primaryBtnColor;
}, function (props) {
  return props.large ? '14px' : props.small ? '10px' : '11px';
}, function (props) {
  return props.large ? '14px 32px' : props.small ? '6px 9px' : '9px 12px';
}, function (props) {
  return props.theme.transition;
}, function (props) {
  return props.width || 'auto';
}, function (props) {
  return props.disabled ? 0.4 : 1;
}, function (props) {
  return props.disabled ? 'none' : 'all';
}, function (props) {
  return props.negative ? props.theme.negativeBtnBgdHover : props.secondary ? props.theme.secondaryBtnBgdHover : props.link ? props.theme.linkBtnActBgdHover : props.theme.primaryBtnBgdHover;
}, function (props) {
  return props.negative ? props.theme.negativeBtnActColor : props.secondary ? props.theme.secondaryBtnActColor : props.link ? props.theme.linkBtnActColor : props.theme.primaryBtnActColor;
});

exports.Button = Button;

var Input = _styledComponents.default.input(_templateObject15(), function (props) {
  return props.secondary ? props.theme.secondaryInput : props.theme.input;
});

exports.Input = Input;

var InputLight = _styledComponents.default.input(_templateObject16(), function (props) {
  return props.theme.inputLT;
});

exports.InputLight = InputLight;
var InlineInput = (0, _styledComponents.default)(Input)(_templateObject17(), function (props) {
  return props.theme.inlineInput;
});
exports.InlineInput = InlineInput;

var StyledPanelHeader = _styledComponents.default.div(_templateObject18(), function (props) {
  return props.active ? props.theme.panelBackgroundHover : props.theme.panelBackground;
}, function (props) {
  return props.labelRCGColorValues ? props.labelRCGColorValues.join(',') : 'transparent';
}, function (props) {
  return props.theme.panelHeaderHeight;
}, function (props) {
  return props.theme.transition;
});

exports.StyledPanelHeader = StyledPanelHeader;

var StyledPanelDropdown = _styledComponents.default.div(_templateObject19(), function (props) {
  return props.theme.panelDropdownScrollBar;
}, function (props) {
  return props.theme.panelBackground;
}, function (props) {
  return props.theme.panelBoxShadow;
}, function (props) {
  return props.theme.panelBorderRadius;
});

exports.StyledPanelDropdown = StyledPanelDropdown;

var ButtonGroup = _styledComponents.default.div(_templateObject20(), function (props) {
  return props.theme.primaryBtnRadius;
}, function (props) {
  return props.theme.primaryBtnRadius;
}, function (props) {
  return props.theme.primaryBtnRadius;
}, function (props) {
  return props.theme.primaryBtnRadius;
});

exports.ButtonGroup = ButtonGroup;

var DatasetSquare = _styledComponents.default.div(_templateObject21(), function (props) {
  return props.color.join(',');
});

exports.DatasetSquare = DatasetSquare;

var Table = _styledComponents.default.table(_templateObject22(), function (props) {
  return props.theme.panelBackgroundLT;
}, function (props) {
  return props.theme.titleColorLT;
}, function (props) {
  return props.theme.panelBorderLT;
});

exports.Table = Table;

var StyledModalContent = _styledComponents.default.div(_templateObject23(), function (props) {
  return props.theme.panelBackgroundLT;
}, function (props) {
  return props.theme.textColorLT;
});
/**
 * Newer versions of mapbox.gl display an error message banner on top of the map by default
 * which will cause the map to display points in the wrong locations
 * This workaround will hide the error banner.
 */


exports.StyledModalContent = StyledModalContent;

var StyledMapContainer = _styledComponents.default.div(_templateObject24());

exports.StyledMapContainer = StyledMapContainer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cy5qcyJdLCJuYW1lcyI6WyJTZWxlY3RUZXh0Iiwic3R5bGVkIiwic3BhbiIsInByb3BzIiwidGhlbWUiLCJsYWJlbENvbG9yIiwic2VsZWN0Rm9udFNpemUiLCJTZWxlY3RUZXh0Qm9sZCIsInRleHRDb2xvciIsIkljb25Sb3VuZFNtYWxsIiwic2Vjb25kYXJ5QnRuQmdkSG92ZXIiLCJzZWNvbmRhcnlCdG5Db2xvciIsIkNlbnRlckZsZXhib3giLCJQYW5lbExhYmVsIiwibGFiZWwiLCJhdHRycyIsImNsYXNzTmFtZSIsIlBhbmVsTGFiZWxXcmFwcGVyIiwiZGl2IiwiUGFuZWxMYWJlbEJvbGQiLCJQYW5lbEhlYWRlclRpdGxlIiwiUGFuZWxIZWFkZXJDb250ZW50IiwiUGFuZWxDb250ZW50IiwicGFuZWxCYWNrZ3JvdW5kIiwiU2lkZVBhbmVsU2VjdGlvbiIsImRpc2FibGVkIiwiU2lkZVBhbmVsRGl2aWRlciIsInBhbmVsQm9yZGVyQ29sb3IiLCJUb29sdGlwIiwiUmVhY3RUb29sdGlwIiwidG9vbHRpcEJnIiwidG9vbHRpcENvbG9yIiwiQnV0dG9uIiwibmVnYXRpdmUiLCJuZWdhdGl2ZUJ0bkJnZCIsInNlY29uZGFyeSIsInNlY29uZGFyeUJ0bkJnZCIsImxpbmsiLCJsaW5rQnRuQmdkIiwicHJpbWFyeUJ0bkJnZCIsInByaW1hcnlCdG5SYWRpdXMiLCJuZWdhdGl2ZUJ0bkNvbG9yIiwibGlua0J0bkNvbG9yIiwicHJpbWFyeUJ0bkNvbG9yIiwibGFyZ2UiLCJzbWFsbCIsInRyYW5zaXRpb24iLCJ3aWR0aCIsIm5lZ2F0aXZlQnRuQmdkSG92ZXIiLCJsaW5rQnRuQWN0QmdkSG92ZXIiLCJwcmltYXJ5QnRuQmdkSG92ZXIiLCJuZWdhdGl2ZUJ0bkFjdENvbG9yIiwic2Vjb25kYXJ5QnRuQWN0Q29sb3IiLCJsaW5rQnRuQWN0Q29sb3IiLCJwcmltYXJ5QnRuQWN0Q29sb3IiLCJJbnB1dCIsImlucHV0Iiwic2Vjb25kYXJ5SW5wdXQiLCJJbnB1dExpZ2h0IiwiaW5wdXRMVCIsIklubGluZUlucHV0IiwiaW5saW5lSW5wdXQiLCJTdHlsZWRQYW5lbEhlYWRlciIsImFjdGl2ZSIsInBhbmVsQmFja2dyb3VuZEhvdmVyIiwibGFiZWxSQ0dDb2xvclZhbHVlcyIsImpvaW4iLCJwYW5lbEhlYWRlckhlaWdodCIsIlN0eWxlZFBhbmVsRHJvcGRvd24iLCJwYW5lbERyb3Bkb3duU2Nyb2xsQmFyIiwicGFuZWxCb3hTaGFkb3ciLCJwYW5lbEJvcmRlclJhZGl1cyIsIkJ1dHRvbkdyb3VwIiwiRGF0YXNldFNxdWFyZSIsImNvbG9yIiwiVGFibGUiLCJ0YWJsZSIsInBhbmVsQmFja2dyb3VuZExUIiwidGl0bGVDb2xvckxUIiwicGFuZWxCb3JkZXJMVCIsIlN0eWxlZE1vZGFsQ29udGVudCIsInRleHRDb2xvckxUIiwiU3R5bGVkTWFwQ29udGFpbmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFTyxJQUFNQSxVQUFVLEdBQUdDLDBCQUFPQyxJQUFWLG9CQUNaLFVBQUFDLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUMsVUFBaEI7QUFBQSxDQURPLEVBRVIsVUFBQUYsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZRSxjQUFoQjtBQUFBLENBRkcsQ0FBaEI7OztBQVdBLElBQU1DLGNBQWMs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Q0FBbkI7Ozs7QUFRQSxJQUFNUyxLQUFLLEdBQUcxRSwwQkFBTzJFLEtBQVYsc0JBTUUsVUFBQXpFLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWXlFLGlCQUFoQjtBQUFBLENBTlAsRUFPSCxVQUFBMUUsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZMEUsWUFBaEI7QUFBQSxDQVBGLEVBZUksVUFBQTNFLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWTJFLGFBQWhCO0FBQUEsQ0FmVCxDQUFYOzs7O0FBcUJBLElBQU1DLGtCQUFrQixHQUFHL0UsMEJBQU9pQixHQUFWLHNCQUNmLFVBQUFmLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWXlFLGlCQUFoQjtBQUFBLENBRFUsRUFFcEIsVUFBQTFFLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWTZFLFdBQWhCO0FBQUEsQ0FGZSxDQUF4QjtBQVdQOzs7Ozs7Ozs7QUFLTyxJQUFNQyxrQkFBa0IsR0FBR2pGLDBCQUFPaUIsR0FBVixxQkFBeEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBSZWFjdFRvb2x0aXAgZnJvbSAncmVhY3QtdG9vbHRpcCc7XG5cbmV4cG9ydCBjb25zdCBTZWxlY3RUZXh0ID0gc3R5bGVkLnNwYW5gXG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmxhYmVsQ29sb3J9O1xuICBmb250LXNpemU6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2VsZWN0Rm9udFNpemV9O1xuICBmb250LXdlaWdodDogNDAwO1xuXG4gIGkge1xuICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICBtYXJnaW4tcmlnaHQ6IDZweDtcbiAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFNlbGVjdFRleHRCb2xkID0gc3R5bGVkKFNlbGVjdFRleHQpYFxuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3J9O1xuICBmb250LXdlaWdodDogNTAwO1xuYDtcblxuZXhwb3J0IGNvbnN0IEljb25Sb3VuZFNtYWxsID0gc3R5bGVkKCdkaXYnKWBcbiAgZGlzcGxheTogZmxleDtcbiAgd2lkdGg6IDE4cHg7XG4gIGhlaWdodDogMThweDtcbiAgYm9yZGVyLXJhZGl1czogOXB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+XG4gICAgcHJvcHMudGhlbWUuc2Vjb25kYXJ5QnRuQmdkSG92ZXJ9OyAvLyB1cGRhdGVkIGFmdGVyIGNoZWNraW5nIHNrZXRjaCBmaWxlXG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNlY29uZGFyeUJ0bkNvbG9yfTtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cbiAgOmhvdmVyIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWNvbmRhcnlCdG5CZ2RIb3Zlcn07XG4gIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBDZW50ZXJGbGV4Ym94ID0gc3R5bGVkKCdkaXYnKWBcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbmA7XG5cbmV4cG9ydCBjb25zdCBQYW5lbExhYmVsID0gc3R5bGVkLmxhYmVsLmF0dHJzKHtcbiAgY2xhc3NOYW1lOiAnc2lkZS1wYW5lbC1wYW5lbF9fbGFiZWwnXG59KWBcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGFiZWxDb2xvcn07XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgZm9udC1zaXplOiAxMXB4O1xuICBmb250LXdlaWdodDogNDAwO1xuICBtYXJnaW4tYm90dG9tOiA0cHg7XG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xuYDtcblxuZXhwb3J0IGNvbnN0IFBhbmVsTGFiZWxXcmFwcGVyID0gc3R5bGVkLmRpdi5hdHRycyh7XG4gIGNsYXNzTmFtZTogJ3NpZGUtcGFuZWwtcGFuZWxfX2xhYmVsLXdyYXBwZXInXG59KWBcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IHNlbGYtc3RhcnQ7XG5gO1xuXG5leHBvcnQgY29uc3QgUGFuZWxMYWJlbEJvbGQgPSBzdHlsZWQoUGFuZWxMYWJlbClgXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG5gO1xuXG5leHBvcnQgY29uc3QgUGFuZWxIZWFkZXJUaXRsZSA9IHN0eWxlZC5zcGFuLmF0dHJzKHtcbiAgY2xhc3NOYW1lOiAnc2lkZS1wYW5lbC1wYW5lbF9faGVhZGVyX190aXRsZSdcbn0pYFxuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3J9O1xuICBmb250LXNpemU6IDEzcHg7XG4gIGxldHRlci1zcGFjaW5nOiAwLjQzcHg7XG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xuYDtcblxuZXhwb3J0IGNvbnN0IFBhbmVsSGVhZGVyQ29udGVudCA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvcn07XG4gIHBhZGRpbmctbGVmdDogMTJweDtcblxuICAuaWNvbiB7XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGFiZWxDb2xvcn07XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIG1hcmdpbi1yaWdodDogMTJweDtcbiAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFBhbmVsQ29udGVudCA9IHN0eWxlZC5kaXYuYXR0cnMoe1xuICBjbGFzc05hbWU6ICdzaWRlLXBhbmVsLXBhbmVsX19jb250ZW50J1xufSlgXG4gIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxCYWNrZ3JvdW5kfTtcbiAgcGFkZGluZzogMTJweDtcbmA7XG5cbmV4cG9ydCBjb25zdCBTaWRlUGFuZWxTZWN0aW9uID0gc3R5bGVkLmRpdi5hdHRycyh7XG4gIGNsYXNzTmFtZTogJ3NpZGUtcGFuZWwtc2VjdGlvbidcbn0pYFxuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuICBvcGFjaXR5OiAke3Byb3BzID0+IChwcm9wcy5kaXNhYmxlZCA/IDAuNCA6IDEpfTtcbiAgcG9pbnRlci1ldmVudHM6ICR7cHJvcHMgPT4gKHByb3BzLmRpc2FibGVkID8gJ25vbmUnIDogJ2FsbCcpfTtcbmA7XG5cbmV4cG9ydCBjb25zdCBTaWRlUGFuZWxEaXZpZGVyID0gc3R5bGVkLmRpdi5hdHRycyh7XG4gIGNsYXNzTmFtZTogJ3NpZGUtcGFuZWwtZGl2aWRlcidcbn0pYFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbEJvcmRlckNvbG9yfTtcbiAgaGVpZ2h0OiAxMnB4O1xuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuYDtcblxuZXhwb3J0IGNvbnN0IFRvb2x0aXAgPSBzdHlsZWQoUmVhY3RUb29sdGlwKWBcbiAgJi5fX3JlYWN0X2NvbXBvbmVudF90b29sdGlwIHtcbiAgICBmb250LXNpemU6IDkuNXB4O1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgcGFkZGluZzogN3B4IDE4cHg7XG5cbiAgICAmLnR5cGUtZGFyayB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRvb2x0aXBCZ307XG4gICAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50b29sdGlwQ29sb3J9O1xuICAgICAgJi5wbGFjZS1ib3R0b20ge1xuICAgICAgICA6YWZ0ZXIge1xuICAgICAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudG9vbHRpcEJnfTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAmLnBsYWNlLXRvcCB7XG4gICAgICAgIDphZnRlciB7XG4gICAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50b29sdGlwQmd9O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgICYucGxhY2UtcmlnaHQge1xuICAgICAgICA6YWZ0ZXIge1xuICAgICAgICAgIGJvcmRlci1yaWdodC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50b29sdGlwQmd9O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgICYucGxhY2UtbGVmdCB7XG4gICAgICAgIDphZnRlciB7XG4gICAgICAgICAgYm9yZGVyLWxlZnQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudG9vbHRpcEJnfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IEJ1dHRvbiA9IHN0eWxlZC5kaXYuYXR0cnMoe1xuICBjbGFzc05hbWU6ICdidXR0b24nXG59KWBcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PlxuICAgIHByb3BzLm5lZ2F0aXZlXG4gICAgICA/IHByb3BzLnRoZW1lLm5lZ2F0aXZlQnRuQmdkXG4gICAgICA6IHByb3BzLnNlY29uZGFyeVxuICAgICAgICA/IHByb3BzLnRoZW1lLnNlY29uZGFyeUJ0bkJnZFxuICAgICAgICA6IHByb3BzLmxpbmsgPyBwcm9wcy50aGVtZS5saW5rQnRuQmdkIDogcHJvcHMudGhlbWUucHJpbWFyeUJ0bkJnZH07XG4gIGJvcmRlci1yYWRpdXM6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucHJpbWFyeUJ0blJhZGl1c307XG4gIGNvbG9yOiAke3Byb3BzID0+XG4gICAgcHJvcHMubmVnYXRpdmVcbiAgICAgID8gcHJvcHMudGhlbWUubmVnYXRpdmVCdG5Db2xvclxuICAgICAgOiBwcm9wcy5zZWNvbmRhcnlcbiAgICAgICAgPyBwcm9wcy50aGVtZS5zZWNvbmRhcnlCdG5Db2xvclxuICAgICAgICA6IHByb3BzLmxpbmsgPyBwcm9wcy50aGVtZS5saW5rQnRuQ29sb3IgOiBwcm9wcy50aGVtZS5wcmltYXJ5QnRuQ29sb3J9O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBmb250LXNpemU6ICR7cHJvcHMgPT5cbiAgICBwcm9wcy5sYXJnZSA/XG4gICAgICAnMTRweCdcbiAgICAgIDogcHJvcHMuc21hbGxcbiAgICAgICAgPyAnMTBweCdcbiAgICAgICAgOiAnMTFweCd9O1xuICBmb250LXdlaWdodDogNTAwO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuM3B4O1xuICBsaW5lLWhlaWdodDogMTRweDtcbiAgb3V0bGluZTogMDtcbiAgcGFkZGluZzogJHtwcm9wcyA9PlxuICAgIHByb3BzLmxhcmdlID9cbiAgICAgICcxNHB4IDMycHgnXG4gICAgICA6IHByb3BzLnNtYWxsXG4gICAgICAgID8gJzZweCA5cHgnXG4gICAgICAgIDogJzlweCAxMnB4J307XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgdHJhbnNpdGlvbjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50cmFuc2l0aW9ufTtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgd2lkdGg6ICR7cHJvcHMgPT4gcHJvcHMud2lkdGggfHwgJ2F1dG8nfTtcbiAgb3BhY2l0eTogJHtwcm9wcyA9PiAocHJvcHMuZGlzYWJsZWQgPyAwLjQgOiAxKX07XG4gIHBvaW50ZXItZXZlbnRzOiAke3Byb3BzID0+IChwcm9wcy5kaXNhYmxlZCA/ICdub25lJyA6ICdhbGwnKX07XG5cbiAgOmhvdmVyLFxuICA6Zm9jdXMsXG4gIDphY3RpdmUsXG4gICYuYWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+XG4gICAgICBwcm9wcy5uZWdhdGl2ZVxuICAgICAgICA/IHByb3BzLnRoZW1lLm5lZ2F0aXZlQnRuQmdkSG92ZXJcbiAgICAgICAgOiBwcm9wcy5zZWNvbmRhcnlcbiAgICAgICAgICA/IHByb3BzLnRoZW1lLnNlY29uZGFyeUJ0bkJnZEhvdmVyXG4gICAgICAgICAgOiBwcm9wcy5saW5rXG4gICAgICAgICAgICA/IHByb3BzLnRoZW1lLmxpbmtCdG5BY3RCZ2RIb3ZlclxuICAgICAgICAgICAgOiBwcm9wcy50aGVtZS5wcmltYXJ5QnRuQmdkSG92ZXJ9O1xuICAgIGNvbG9yOiAke3Byb3BzID0+XG4gICAgICBwcm9wcy5uZWdhdGl2ZVxuICAgICAgICA/IHByb3BzLnRoZW1lLm5lZ2F0aXZlQnRuQWN0Q29sb3JcbiAgICAgICAgOiBwcm9wcy5zZWNvbmRhcnlcbiAgICAgICAgICA/IHByb3BzLnRoZW1lLnNlY29uZGFyeUJ0bkFjdENvbG9yXG4gICAgICAgICAgOiBwcm9wcy5saW5rXG4gICAgICAgICAgICA/IHByb3BzLnRoZW1lLmxpbmtCdG5BY3RDb2xvclxuICAgICAgICAgICAgOiBwcm9wcy50aGVtZS5wcmltYXJ5QnRuQWN0Q29sb3J9O1xuICB9XG5cbiAgc3ZnIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDhweDtcbiAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IElucHV0ID0gc3R5bGVkLmlucHV0YFxuICAke3Byb3BzID0+XG4gICAgcHJvcHMuc2Vjb25kYXJ5ID8gcHJvcHMudGhlbWUuc2Vjb25kYXJ5SW5wdXQgOiBwcm9wcy50aGVtZS5pbnB1dH07XG5gO1xuXG5leHBvcnQgY29uc3QgSW5wdXRMaWdodCA9IHN0eWxlZC5pbnB1dGBcbiAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5pbnB1dExUfVxuYDtcblxuZXhwb3J0IGNvbnN0IElubGluZUlucHV0ID0gc3R5bGVkKElucHV0KWBcbiAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5pbmxpbmVJbnB1dH07XG5gO1xuXG5leHBvcnQgY29uc3QgU3R5bGVkUGFuZWxIZWFkZXIgPSBzdHlsZWQuZGl2YFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+XG4gICAgcHJvcHMuYWN0aXZlXG4gICAgICA/IHByb3BzLnRoZW1lLnBhbmVsQmFja2dyb3VuZEhvdmVyXG4gICAgICA6IHByb3BzLnRoZW1lLnBhbmVsQmFja2dyb3VuZH07XG4gIGJvcmRlci1sZWZ0OiAzcHggc29saWRcbiAgICByZ2IoXG4gICAgICAke3Byb3BzID0+XG4gICAgICAgIHByb3BzLmxhYmVsUkNHQ29sb3JWYWx1ZXNcbiAgICAgICAgICA/IHByb3BzLmxhYmVsUkNHQ29sb3JWYWx1ZXMuam9pbignLCcpXG4gICAgICAgICAgOiAndHJhbnNwYXJlbnQnfVxuICAgICk7XG4gIHBhZGRpbmc6IDAgMTBweCAwIDA7XG4gIGhlaWdodDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbEhlYWRlckhlaWdodH1weDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB0cmFuc2l0aW9uOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRyYW5zaXRpb259O1xuYDtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZFBhbmVsRHJvcGRvd24gPSBzdHlsZWQuZGl2YFxuICAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsRHJvcGRvd25TY3JvbGxCYXJ9XG4gIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxCYWNrZ3JvdW5kfTtcbiAgb3ZlcmZsb3cteTogYXV0bztcbiAgYm94LXNoYWRvdzogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbEJveFNoYWRvd307XG4gIGJvcmRlci1yYWRpdXM6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxCb3JkZXJSYWRpdXN9O1xuICBtYXJnaW4tdG9wOiAycHg7XG4gIG1heC1oZWlnaHQ6IDUwMHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHotaW5kZXg6IDk5OTtcbmA7XG5cbmV4cG9ydCBjb25zdCBCdXR0b25Hcm91cCA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIC5idXR0b24ge1xuICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgbWFyZ2luLWxlZnQ6IDJweDtcbiAgfVxuICAuYnV0dG9uOmZpcnN0LWNoaWxkIHtcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnByaW1hcnlCdG5SYWRpdXN9O1xuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucHJpbWFyeUJ0blJhZGl1c307XG4gICAgbWFyZ2luLWxlZnQ6IDA7XG4gIH1cbiAgLmJ1dHRvbjpsYXN0LWNoaWxkIHtcbiAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wcmltYXJ5QnRuUmFkaXVzfTtcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wcmltYXJ5QnRuUmFkaXVzfTtcbiAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IERhdGFzZXRTcXVhcmUgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHdpZHRoOiA4cHg7XG4gIGhlaWdodDogOHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoJHtwcm9wcyA9PiBwcm9wcy5jb2xvci5qb2luKCcsJyl9KTtcbiAgbWFyZ2luLXJpZ2h0OiAxMnB4XG5gO1xuXG5leHBvcnQgY29uc3QgVGFibGUgPSBzdHlsZWQudGFibGVgXG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXItc3BhY2luZzogMDtcblxuICB0aGVhZCB7XG4gICAgdHIgdGgge1xuICAgICAgYmFja2dyb3VuZDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbEJhY2tncm91bmRMVH07XG4gICAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50aXRsZUNvbG9yTFR9O1xuICAgICAgcGFkZGluZzogMThweCAxMnB4O1xuICAgICAgdGV4dC1hbGlnbjogc3RhcnQ7XG4gICAgfVxuICB9XG5cbiAgdGJvZHkge1xuICAgdHIgdGQge1xuICAgICBib3JkZXItYm90dG9tOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsQm9yZGVyTFR9O1xuICAgICBwYWRkaW5nOiAxMnB4O1xuICAgfVxuICB9XG5gO1xuXG5leHBvcnQgY29uc3QgU3R5bGVkTW9kYWxDb250ZW50ID0gc3R5bGVkLmRpdmBcbiAgYmFja2dyb3VuZDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbEJhY2tncm91bmRMVH07XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvckxUfTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgZm9udC1zaXplOiAxMHB4O1xuICBtYXJnaW46IDAgLTk2cHg7XG4gIHBhZGRpbmc6IDMwcHggOTZweDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuYDtcblxuLyoqXG4gKiBOZXdlciB2ZXJzaW9ucyBvZiBtYXBib3guZ2wgZGlzcGxheSBhbiBlcnJvciBtZXNzYWdlIGJhbm5lciBvbiB0b3Agb2YgdGhlIG1hcCBieSBkZWZhdWx0XG4gKiB3aGljaCB3aWxsIGNhdXNlIHRoZSBtYXAgdG8gZGlzcGxheSBwb2ludHMgaW4gdGhlIHdyb25nIGxvY2F0aW9uc1xuICogVGhpcyB3b3JrYXJvdW5kIHdpbGwgaGlkZSB0aGUgZXJyb3IgYmFubmVyLlxuICovXG5leHBvcnQgY29uc3QgU3R5bGVkTWFwQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgLm1hcGJveGdsLW1hcCAubWFwYm94Z2wtbWlzc2luZy1jc3Mge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cbmA7XG4iXX0=