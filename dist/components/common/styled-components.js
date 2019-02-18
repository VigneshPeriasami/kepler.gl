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
var SelectTextBold = SelectText.extend(_templateObject2(), function (props) {
  return props.theme.textColor;
});
exports.SelectTextBold = SelectTextBold;

var IconRoundSmall = _styledComponents.default.div(_templateObject3(), function (props) {
  return props.theme.secondaryBtnBgdHover;
}, function (props) {
  return props.theme.secondaryBtnColor;
}, function (props) {
  return props.theme.secondaryBtnBgdHover;
});

exports.IconRoundSmall = IconRoundSmall;

var CenterFlexbox = _styledComponents.default.div(_templateObject4());

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
var PanelLabelBold = PanelLabel.extend(_templateObject7());
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
var InlineInput = Input.extend(_templateObject17(), function (props) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cy5qcyJdLCJuYW1lcyI6WyJTZWxlY3RUZXh0Iiwic3R5bGVkIiwic3BhbiIsInByb3BzIiwidGhlbWUiLCJsYWJlbENvbG9yIiwic2VsZWN0Rm9udFNpemUiLCJTZWxlY3RUZXh0Qm9sZCIsImV4dGVuZCIsInRleHRDb2xvciIsIkljb25Sb3VuZFNtYWxsIiwiZGl2Iiwic2Vjb25kYXJ5QnRuQmdkSG92ZXIiLCJzZWNvbmRhcnlCdG5Db2xvciIsIkNlbnRlckZsZXhib3giLCJQYW5lbExhYmVsIiwibGFiZWwiLCJhdHRycyIsImNsYXNzTmFtZSIsIlBhbmVsTGFiZWxXcmFwcGVyIiwiUGFuZWxMYWJlbEJvbGQiLCJQYW5lbEhlYWRlclRpdGxlIiwiUGFuZWxIZWFkZXJDb250ZW50IiwiUGFuZWxDb250ZW50IiwicGFuZWxCYWNrZ3JvdW5kIiwiU2lkZVBhbmVsU2VjdGlvbiIsImRpc2FibGVkIiwiU2lkZVBhbmVsRGl2aWRlciIsInBhbmVsQm9yZGVyQ29sb3IiLCJUb29sdGlwIiwiUmVhY3RUb29sdGlwIiwidG9vbHRpcEJnIiwidG9vbHRpcENvbG9yIiwiQnV0dG9uIiwibmVnYXRpdmUiLCJuZWdhdGl2ZUJ0bkJnZCIsInNlY29uZGFyeSIsInNlY29uZGFyeUJ0bkJnZCIsImxpbmsiLCJsaW5rQnRuQmdkIiwicHJpbWFyeUJ0bkJnZCIsInByaW1hcnlCdG5SYWRpdXMiLCJuZWdhdGl2ZUJ0bkNvbG9yIiwibGlua0J0bkNvbG9yIiwicHJpbWFyeUJ0bkNvbG9yIiwibGFyZ2UiLCJzbWFsbCIsInRyYW5zaXRpb24iLCJ3aWR0aCIsIm5lZ2F0aXZlQnRuQmdkSG92ZXIiLCJsaW5rQnRuQWN0QmdkSG92ZXIiLCJwcmltYXJ5QnRuQmdkSG92ZXIiLCJuZWdhdGl2ZUJ0bkFjdENvbG9yIiwic2Vjb25kYXJ5QnRuQWN0Q29sb3IiLCJsaW5rQnRuQWN0Q29sb3IiLCJwcmltYXJ5QnRuQWN0Q29sb3IiLCJJbnB1dCIsImlucHV0Iiwic2Vjb25kYXJ5SW5wdXQiLCJJbnB1dExpZ2h0IiwiaW5wdXRMVCIsIklubGluZUlucHV0IiwiaW5saW5lSW5wdXQiLCJTdHlsZWRQYW5lbEhlYWRlciIsImFjdGl2ZSIsInBhbmVsQmFja2dyb3VuZEhvdmVyIiwibGFiZWxSQ0dDb2xvclZhbHVlcyIsImpvaW4iLCJwYW5lbEhlYWRlckhlaWdodCIsIlN0eWxlZFBhbmVsRHJvcGRvd24iLCJwYW5lbERyb3Bkb3duU2Nyb2xsQmFyIiwicGFuZWxCb3hTaGFkb3ciLCJwYW5lbEJvcmRlclJhZGl1cyIsIkJ1dHRvbkdyb3VwIiwiRGF0YXNldFNxdWFyZSIsImNvbG9yIiwiVGFibGUiLCJ0YWJsZSIsInBhbmVsQmFja2dyb3VuZExUIiwidGl0bGVDb2xvckxUIiwicGFuZWxCb3JkZXJMVCIsIlN0eWxlZE1vZGFsQ29udGVudCIsInRleHRDb2xvckxUIiwiU3R5bGVkTWFwQ29udGFpbmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFTyxJQUFNQSxVQUFVLEdBQUdDLDBCQUFPQyxJQUFWLG9CQUNaLFVBQUFDLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUMsVUFBaEI7QUFBQSxDQURPLEVBRVIsVUFBQUYsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZRSxjQUFoQjtBQUFBLENBRkcsQ0FBaEI7OztBQVdBLElB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bkI7Ozs7QUFRQSxJQUFNUyxLQUFLLEdBQUczRSwwQkFBTzRFLEtBQVYsc0JBTUUsVUFBQTFFLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWTBFLGlCQUFoQjtBQUFBLENBTlAsRUFPSCxVQUFBM0UsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZMkUsWUFBaEI7QUFBQSxDQVBGLEVBZUksVUFBQTVFLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWTRFLGFBQWhCO0FBQUEsQ0FmVCxDQUFYOzs7O0FBcUJBLElBQU1DLGtCQUFrQixHQUFHaEYsMEJBQU9VLEdBQVYsc0JBQ2YsVUFBQVIsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZMEUsaUJBQWhCO0FBQUEsQ0FEVSxFQUVwQixVQUFBM0UsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZOEUsV0FBaEI7QUFBQSxDQUZlLENBQXhCO0FBV1A7Ozs7Ozs7OztBQUtPLElBQU1DLGtCQUFrQixHQUFHbEYsMEJBQU9VLEdBQVYscUJBQXhCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgUmVhY3RUb29sdGlwIGZyb20gJ3JlYWN0LXRvb2x0aXAnO1xuXG5leHBvcnQgY29uc3QgU2VsZWN0VGV4dCA9IHN0eWxlZC5zcGFuYFxuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5sYWJlbENvbG9yfTtcbiAgZm9udC1zaXplOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNlbGVjdEZvbnRTaXplfTtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcblxuICBpIHtcbiAgICBmb250LXNpemU6IDEzcHg7XG4gICAgbWFyZ2luLXJpZ2h0OiA2cHg7XG4gIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBTZWxlY3RUZXh0Qm9sZCA9IFNlbGVjdFRleHQuZXh0ZW5kYFxuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3J9O1xuICBmb250LXdlaWdodDogNTAwO1xuYDtcblxuZXhwb3J0IGNvbnN0IEljb25Sb3VuZFNtYWxsID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgd2lkdGg6IDE4cHg7XG4gIGhlaWdodDogMThweDtcbiAgYm9yZGVyLXJhZGl1czogOXB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+XG4gICAgcHJvcHMudGhlbWUuc2Vjb25kYXJ5QnRuQmdkSG92ZXJ9OyAvLyB1cGRhdGVkIGFmdGVyIGNoZWNraW5nIHNrZXRjaCBmaWxlXG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNlY29uZGFyeUJ0bkNvbG9yfTtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cbiAgOmhvdmVyIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWNvbmRhcnlCdG5CZ2RIb3Zlcn07XG4gIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBDZW50ZXJGbGV4Ym94ID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbmA7XG5cbmV4cG9ydCBjb25zdCBQYW5lbExhYmVsID0gc3R5bGVkLmxhYmVsLmF0dHJzKHtcbiAgY2xhc3NOYW1lOiAnc2lkZS1wYW5lbC1wYW5lbF9fbGFiZWwnXG59KWBcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGFiZWxDb2xvcn07XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgZm9udC1zaXplOiAxMXB4O1xuICBmb250LXdlaWdodDogNDAwO1xuICBtYXJnaW4tYm90dG9tOiA0cHg7XG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xuYDtcblxuZXhwb3J0IGNvbnN0IFBhbmVsTGFiZWxXcmFwcGVyID0gc3R5bGVkLmRpdi5hdHRycyh7XG4gIGNsYXNzTmFtZTogJ3NpZGUtcGFuZWwtcGFuZWxfX2xhYmVsLXdyYXBwZXInXG59KWBcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IHNlbGYtc3RhcnQ7XG5gO1xuXG5leHBvcnQgY29uc3QgUGFuZWxMYWJlbEJvbGQgPSBQYW5lbExhYmVsLmV4dGVuZGBcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbmA7XG5cbmV4cG9ydCBjb25zdCBQYW5lbEhlYWRlclRpdGxlID0gc3R5bGVkLnNwYW4uYXR0cnMoe1xuICBjbGFzc05hbWU6ICdzaWRlLXBhbmVsLXBhbmVsX19oZWFkZXJfX3RpdGxlJ1xufSlgXG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvcn07XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNDNweDtcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG5gO1xuXG5leHBvcnQgY29uc3QgUGFuZWxIZWFkZXJDb250ZW50ID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9yfTtcbiAgcGFkZGluZy1sZWZ0OiAxMnB4O1xuXG4gIC5pY29uIHtcbiAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5sYWJlbENvbG9yfTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgbWFyZ2luLXJpZ2h0OiAxMnB4O1xuICB9XG5gO1xuXG5leHBvcnQgY29uc3QgUGFuZWxDb250ZW50ID0gc3R5bGVkLmRpdi5hdHRycyh7XG4gIGNsYXNzTmFtZTogJ3NpZGUtcGFuZWwtcGFuZWxfX2NvbnRlbnQnXG59KWBcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbEJhY2tncm91bmR9O1xuICBwYWRkaW5nOiAxMnB4O1xuYDtcblxuZXhwb3J0IGNvbnN0IFNpZGVQYW5lbFNlY3Rpb24gPSBzdHlsZWQuZGl2LmF0dHJzKHtcbiAgY2xhc3NOYW1lOiAnc2lkZS1wYW5lbC1zZWN0aW9uJ1xufSlgXG4gIG1hcmdpbi1ib3R0b206IDEycHg7XG4gIG9wYWNpdHk6ICR7cHJvcHMgPT4gKHByb3BzLmRpc2FibGVkID8gMC40IDogMSl9O1xuICBwb2ludGVyLWV2ZW50czogJHtwcm9wcyA9PiAocHJvcHMuZGlzYWJsZWQgPyAnbm9uZScgOiAnYWxsJyl9O1xuYDtcblxuZXhwb3J0IGNvbnN0IFNpZGVQYW5lbERpdmlkZXIgPSBzdHlsZWQuZGl2LmF0dHJzKHtcbiAgY2xhc3NOYW1lOiAnc2lkZS1wYW5lbC1kaXZpZGVyJ1xufSlgXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsQm9yZGVyQ29sb3J9O1xuICBoZWlnaHQ6IDEycHg7XG4gIG1hcmdpbi1ib3R0b206IDEycHg7XG5gO1xuXG5leHBvcnQgY29uc3QgVG9vbHRpcCA9IHN0eWxlZChSZWFjdFRvb2x0aXApYFxuICAmLl9fcmVhY3RfY29tcG9uZW50X3Rvb2x0aXAge1xuICAgIGZvbnQtc2l6ZTogOS41cHg7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICBwYWRkaW5nOiA3cHggMThweDtcblxuICAgICYudHlwZS1kYXJrIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudG9vbHRpcEJnfTtcbiAgICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRvb2x0aXBDb2xvcn07XG4gICAgICAmLnBsYWNlLWJvdHRvbSB7XG4gICAgICAgIDphZnRlciB7XG4gICAgICAgICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50b29sdGlwQmd9O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgICYucGxhY2UtdG9wIHtcbiAgICAgICAgOmFmdGVyIHtcbiAgICAgICAgICBib3JkZXItdG9wLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRvb2x0aXBCZ307XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgJi5wbGFjZS1yaWdodCB7XG4gICAgICAgIDphZnRlciB7XG4gICAgICAgICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRvb2x0aXBCZ307XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgJi5wbGFjZS1sZWZ0IHtcbiAgICAgICAgOmFmdGVyIHtcbiAgICAgICAgICBib3JkZXItbGVmdC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50b29sdGlwQmd9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5gO1xuXG5leHBvcnQgY29uc3QgQnV0dG9uID0gc3R5bGVkLmRpdi5hdHRycyh7XG4gIGNsYXNzTmFtZTogJ2J1dHRvbidcbn0pYFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+XG4gICAgcHJvcHMubmVnYXRpdmVcbiAgICAgID8gcHJvcHMudGhlbWUubmVnYXRpdmVCdG5CZ2RcbiAgICAgIDogcHJvcHMuc2Vjb25kYXJ5XG4gICAgICAgID8gcHJvcHMudGhlbWUuc2Vjb25kYXJ5QnRuQmdkXG4gICAgICAgIDogcHJvcHMubGluayA/IHByb3BzLnRoZW1lLmxpbmtCdG5CZ2QgOiBwcm9wcy50aGVtZS5wcmltYXJ5QnRuQmdkfTtcbiAgYm9yZGVyLXJhZGl1czogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wcmltYXJ5QnRuUmFkaXVzfTtcbiAgY29sb3I6ICR7cHJvcHMgPT5cbiAgICBwcm9wcy5uZWdhdGl2ZVxuICAgICAgPyBwcm9wcy50aGVtZS5uZWdhdGl2ZUJ0bkNvbG9yXG4gICAgICA6IHByb3BzLnNlY29uZGFyeVxuICAgICAgICA/IHByb3BzLnRoZW1lLnNlY29uZGFyeUJ0bkNvbG9yXG4gICAgICAgIDogcHJvcHMubGluayA/IHByb3BzLnRoZW1lLmxpbmtCdG5Db2xvciA6IHByb3BzLnRoZW1lLnByaW1hcnlCdG5Db2xvcn07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGZvbnQtc2l6ZTogJHtwcm9wcyA9PlxuICAgIHByb3BzLmxhcmdlID9cbiAgICAgICcxNHB4J1xuICAgICAgOiBwcm9wcy5zbWFsbFxuICAgICAgICA/ICcxMHB4J1xuICAgICAgICA6ICcxMXB4J307XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBsZXR0ZXItc3BhY2luZzogMC4zcHg7XG4gIGxpbmUtaGVpZ2h0OiAxNHB4O1xuICBvdXRsaW5lOiAwO1xuICBwYWRkaW5nOiAke3Byb3BzID0+XG4gICAgcHJvcHMubGFyZ2UgP1xuICAgICAgJzE0cHggMzJweCdcbiAgICAgIDogcHJvcHMuc21hbGxcbiAgICAgICAgPyAnNnB4IDlweCdcbiAgICAgICAgOiAnOXB4IDEycHgnfTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB0cmFuc2l0aW9uOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRyYW5zaXRpb259O1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICB3aWR0aDogJHtwcm9wcyA9PiBwcm9wcy53aWR0aCB8fCAnYXV0byd9O1xuICBvcGFjaXR5OiAke3Byb3BzID0+IChwcm9wcy5kaXNhYmxlZCA/IDAuNCA6IDEpfTtcbiAgcG9pbnRlci1ldmVudHM6ICR7cHJvcHMgPT4gKHByb3BzLmRpc2FibGVkID8gJ25vbmUnIDogJ2FsbCcpfTtcblxuICA6aG92ZXIsXG4gIDpmb2N1cyxcbiAgOmFjdGl2ZSxcbiAgJi5hY3RpdmUge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT5cbiAgICAgIHByb3BzLm5lZ2F0aXZlXG4gICAgICAgID8gcHJvcHMudGhlbWUubmVnYXRpdmVCdG5CZ2RIb3ZlclxuICAgICAgICA6IHByb3BzLnNlY29uZGFyeVxuICAgICAgICAgID8gcHJvcHMudGhlbWUuc2Vjb25kYXJ5QnRuQmdkSG92ZXJcbiAgICAgICAgICA6IHByb3BzLmxpbmtcbiAgICAgICAgICAgID8gcHJvcHMudGhlbWUubGlua0J0bkFjdEJnZEhvdmVyXG4gICAgICAgICAgICA6IHByb3BzLnRoZW1lLnByaW1hcnlCdG5CZ2RIb3Zlcn07XG4gICAgY29sb3I6ICR7cHJvcHMgPT5cbiAgICAgIHByb3BzLm5lZ2F0aXZlXG4gICAgICAgID8gcHJvcHMudGhlbWUubmVnYXRpdmVCdG5BY3RDb2xvclxuICAgICAgICA6IHByb3BzLnNlY29uZGFyeVxuICAgICAgICAgID8gcHJvcHMudGhlbWUuc2Vjb25kYXJ5QnRuQWN0Q29sb3JcbiAgICAgICAgICA6IHByb3BzLmxpbmtcbiAgICAgICAgICAgID8gcHJvcHMudGhlbWUubGlua0J0bkFjdENvbG9yXG4gICAgICAgICAgICA6IHByb3BzLnRoZW1lLnByaW1hcnlCdG5BY3RDb2xvcn07XG4gIH1cblxuICBzdmcge1xuICAgIG1hcmdpbi1yaWdodDogOHB4O1xuICB9XG5gO1xuXG5leHBvcnQgY29uc3QgSW5wdXQgPSBzdHlsZWQuaW5wdXRgXG4gICR7cHJvcHMgPT5cbiAgICBwcm9wcy5zZWNvbmRhcnkgPyBwcm9wcy50aGVtZS5zZWNvbmRhcnlJbnB1dCA6IHByb3BzLnRoZW1lLmlucHV0fTtcbmA7XG5cbmV4cG9ydCBjb25zdCBJbnB1dExpZ2h0ID0gc3R5bGVkLmlucHV0YFxuICAke3Byb3BzID0+IHByb3BzLnRoZW1lLmlucHV0TFR9XG5gO1xuXG5leHBvcnQgY29uc3QgSW5saW5lSW5wdXQgPSBJbnB1dC5leHRlbmRgXG4gICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaW5saW5lSW5wdXR9O1xuYDtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZFBhbmVsSGVhZGVyID0gc3R5bGVkLmRpdmBcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PlxuICAgIHByb3BzLmFjdGl2ZVxuICAgICAgPyBwcm9wcy50aGVtZS5wYW5lbEJhY2tncm91bmRIb3ZlclxuICAgICAgOiBwcm9wcy50aGVtZS5wYW5lbEJhY2tncm91bmR9O1xuICBib3JkZXItbGVmdDogM3B4IHNvbGlkXG4gICAgcmdiKFxuICAgICAgJHtwcm9wcyA9PlxuICAgICAgICBwcm9wcy5sYWJlbFJDR0NvbG9yVmFsdWVzXG4gICAgICAgICAgPyBwcm9wcy5sYWJlbFJDR0NvbG9yVmFsdWVzLmpvaW4oJywnKVxuICAgICAgICAgIDogJ3RyYW5zcGFyZW50J31cbiAgICApO1xuICBwYWRkaW5nOiAwIDEwcHggMCAwO1xuICBoZWlnaHQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxIZWFkZXJIZWlnaHR9cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgdHJhbnNpdGlvbjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50cmFuc2l0aW9ufTtcbmA7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRQYW5lbERyb3Bkb3duID0gc3R5bGVkLmRpdmBcbiAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbERyb3Bkb3duU2Nyb2xsQmFyfVxuICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsQmFja2dyb3VuZH07XG4gIG92ZXJmbG93LXk6IGF1dG87XG4gIGJveC1zaGFkb3c6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxCb3hTaGFkb3d9O1xuICBib3JkZXItcmFkaXVzOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsQm9yZGVyUmFkaXVzfTtcbiAgbWFyZ2luLXRvcDogMnB4O1xuICBtYXgtaGVpZ2h0OiA1MDBweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB6LWluZGV4OiA5OTk7XG5gO1xuXG5leHBvcnQgY29uc3QgQnV0dG9uR3JvdXAgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICAuYnV0dG9uIHtcbiAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgIG1hcmdpbi1sZWZ0OiAycHg7XG4gIH1cbiAgLmJ1dHRvbjpmaXJzdC1jaGlsZCB7XG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wcmltYXJ5QnRuUmFkaXVzfTtcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnByaW1hcnlCdG5SYWRpdXN9O1xuICAgIG1hcmdpbi1sZWZ0OiAwO1xuICB9XG4gIC5idXR0b246bGFzdC1jaGlsZCB7XG4gICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucHJpbWFyeUJ0blJhZGl1c307XG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucHJpbWFyeUJ0blJhZGl1c307XG4gIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBEYXRhc2V0U3F1YXJlID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aWR0aDogOHB4O1xuICBoZWlnaHQ6IDhweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKCR7cHJvcHMgPT4gcHJvcHMuY29sb3Iuam9pbignLCcpfSk7XG4gIG1hcmdpbi1yaWdodDogMTJweFxuYDtcblxuZXhwb3J0IGNvbnN0IFRhYmxlID0gc3R5bGVkLnRhYmxlYFxuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyLXNwYWNpbmc6IDA7XG5cbiAgdGhlYWQge1xuICAgIHRyIHRoIHtcbiAgICAgIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxCYWNrZ3JvdW5kTFR9O1xuICAgICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGl0bGVDb2xvckxUfTtcbiAgICAgIHBhZGRpbmc6IDE4cHggMTJweDtcbiAgICAgIHRleHQtYWxpZ246IHN0YXJ0O1xuICAgIH1cbiAgfVxuXG4gIHRib2R5IHtcbiAgIHRyIHRkIHtcbiAgICAgYm9yZGVyLWJvdHRvbTogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbEJvcmRlckxUfTtcbiAgICAgcGFkZGluZzogMTJweDtcbiAgIH1cbiAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZE1vZGFsQ29udGVudCA9IHN0eWxlZC5kaXZgXG4gIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxCYWNrZ3JvdW5kTFR9O1xuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JMVH07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGZvbnQtc2l6ZTogMTBweDtcbiAgbWFyZ2luOiAwIC05NnB4O1xuICBwYWRkaW5nOiAzMHB4IDk2cHg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbmA7XG5cbi8qKlxuICogTmV3ZXIgdmVyc2lvbnMgb2YgbWFwYm94LmdsIGRpc3BsYXkgYW4gZXJyb3IgbWVzc2FnZSBiYW5uZXIgb24gdG9wIG9mIHRoZSBtYXAgYnkgZGVmYXVsdFxuICogd2hpY2ggd2lsbCBjYXVzZSB0aGUgbWFwIHRvIGRpc3BsYXkgcG9pbnRzIGluIHRoZSB3cm9uZyBsb2NhdGlvbnNcbiAqIFRoaXMgd29ya2Fyb3VuZCB3aWxsIGhpZGUgdGhlIGVycm9yIGJhbm5lci5cbiAqL1xuZXhwb3J0IGNvbnN0IFN0eWxlZE1hcENvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIC5tYXBib3hnbC1tYXAgLm1hcGJveGdsLW1pc3NpbmctY3NzIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG5gO1xuIl19