"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkboxHeight = exports.checkboxWidth = exports.secondarySwitchBtnBgd = exports.secondarySwitchTrackBgd = exports.switchBtnHeight = exports.switchBtnWidth = exports.switchBtnBorderRadius = exports.switchBtnBoxShadow = exports.switchBtnBgdActive = exports.switchBtnBgd = exports.switchTrackBorderRadius = exports.switchTrackBgdActive = exports.switchTrackBgd = exports.switchLabelMargin = exports.switchHeight = exports.switchWidth = exports.dropdownListBorderTop = exports.dropdownListBgd = exports.dropdownListShadow = exports.dropdownListHighlightBg = exports.selectBorder = exports.selectBorderRadius = exports.selectBorderColorLT = exports.selectBorderColor = exports.selectBackgroundHoverLT = exports.selectBackgroundLT = exports.selectBackgroundHover = exports.selectBackground = exports.selectColorPlaceHolder = exports.selectFontWeightBold = exports.selectFontWeight = exports.selectFontSize = exports.selectActiveBorderColor = exports.selectColorLT = exports.selectColor = exports.secondaryInputBorderActiveColor = exports.secondaryInputBorderColor = exports.secondaryInputColor = exports.secondaryInputBgdActive = exports.secondaryInputBgdHover = exports.secondaryInputBgd = exports.secondaryInputHeight = exports.inputPlaceholderFontWeight = exports.inputPlaceholderColor = exports.inputBorderRadius = exports.inputColor = exports.inputBorderActiveColor = exports.inputBorderHoverColor = exports.inputBorderColor = exports.inputBgdActive = exports.inputBgdHover = exports.inputBgd = exports.inputFontWeight = exports.inputFontSize = exports.inputPadding = exports.inputBoxHeight = exports.negativeBtnActColor = exports.negativeBtnColor = exports.negativeBtnBgdHover = exports.negativeBtnActBgd = exports.negativeBtnBgd = exports.linkBtnActBgdHover = exports.linkBtnActColor = exports.linkBtnColor = exports.linkBtnActBgd = exports.linkBtnBgd = exports.secondaryBtnBgdHover = exports.secondaryBtnActColor = exports.secondaryBtnColor = exports.secondaryBtnActBgd = exports.secondaryBtnBgd = exports.primaryBtnRadius = exports.primaryBtnBgdHover = exports.primaryBtnActColor = exports.primaryBtnColor = exports.primaryBtnActBgd = exports.primaryBtnBgd = exports.errorColor = exports.activeColorHover = exports.activeColor = exports.textColorHlLT = exports.textColorHl = exports.titleTextColor = exports.subtextColorActive = exports.subtextColorLT = exports.subtextColor = exports.titleColorLT = exports.textColorLT = exports.textColor = exports.labelColorLT = exports.labelHoverColor = exports.labelColor = exports.borderColorLight = exports.borderColor = exports.borderRadius = exports.boxSizing = exports.boxShadow = exports.transitionSlow = exports.transitionFast = exports.transition = void 0;
exports.themeLT = exports.theme = exports.modalScrollBar = exports.textTruncate = exports.notificationPanelItemHeight = exports.notificationPanelItemWidth = exports.notificationPanelWidth = exports.notificationColors = exports.rangeBrushBgd = exports.sliderInputWidth = exports.sliderInputHeight = exports.sliderHandleShadow = exports.sliderHandleHoverColor = exports.sliderHandleColor = exports.sliderHandleWidth = exports.sliderHandleHeight = exports.sliderBarHeight = exports.sliderBarRadius = exports.sliderBarHoverColor = exports.sliderBarBgd = exports.sliderBarColor = exports.modalDialogColor = exports.modalDialogBgd = exports.modalImagePlaceHolder = exports.modalFooterBgd = exports.modalTitleFontSize = exports.modalTitleColor = exports.tooltipColor = exports.tooltipBg = exports.mapPanelHeaderBackgroundColor = exports.mapPanelBackgroundColor = exports.panelBorderLT = exports.panelBorder = exports.panelBorderColor = exports.panelBackgroundLT = exports.panelBorderRadius = exports.panelBoxShadow = exports.panelHeaderHeight = exports.panelHeaderIconActive = exports.panelHeaderIcon = exports.panelActiveBgLT = exports.panelActiveBg = exports.panelBackgroundHover = exports.panelBackground = exports.sideBarCloseBtnBgdHover = exports.sideBarCloseBtnColor = exports.sideBarCloseBtnBgd = exports.sidePanelBg = exports.sidePanelHeaderBg = exports.checkboxBoxBgdChecked = exports.checkboxBoxBgd = exports.checkboxBorderColorLT = exports.checkboxBorderRadius = exports.checkboxBorderColor = exports.checkboxMargin = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = require("styled-components");

var _defaultSettings = require("../constants/default-settings");

function _templateObject22() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  ::-webkit-scrollbar {\n    width: 14px;\n    height: 16px;\n  }\n\n  ::-webkit-scrollbar-track {\n    background: white;\n  }\n  ::-webkit-scrollbar-track:horizontal {\n    background: ", ";\n  }\n  ::-webkit-scrollbar-thumb {\n    background: ", ";\n    border: 4px solid white;\n  }\n\n  ::-webkit-scrollbar-corner {\n    background: ", ";\n  }\n\n  ::-webkit-scrollbar-thumb:hover {\n    background: #969da9;\n  }\n\n  ::-webkit-scrollbar-thumb:vertical {\n    border-radius: 7px;\n  }\n\n  ::-webkit-scrollbar-thumb:horizontal {\n    border-radius: 9px;\n    border: 4px solid ", ";\n  }\n"]);

  _templateObject22 = function _templateObject22() {
    return data;
  };

  return data;
}

function _templateObject21() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  ::-webkit-scrollbar {\n    height: 10px;\n    width: 10px;\n  }\n\n  ::-webkit-scrollbar-corner {\n    background: ", ";\n  }\n\n  ::-webkit-scrollbar-track {\n    background: ", ";\n  }\n\n  ::-webkit-scrollbar-thumb {\n    border-radius: 10px;\n    background: ", ";\n    border: 3px solid ", "\n\n    :vertical:hover {\n      background: ", ";\n      cursor: pointer;\n    }\n\n    :horizontal:hover {\n      background: ", ";\n      cursor: pointer;\n    }\n  }\n}"]);

  _templateObject21 = function _templateObject21() {
    return data;
  };

  return data;
}

function _templateObject20() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  ::-webkit-scrollbar {\n    height: 10px;\n    width: 10px;\n  }\n\n  ::-webkit-scrollbar-corner {\n    background: ", ";\n  }\n\n  ::-webkit-scrollbar-track {\n    background: ", ";\n  }\n\n  ::-webkit-scrollbar-thumb {\n    border-radius: 10px;\n    background: ", ";\n    border: 3px solid ", ";\n    :hover {\n      background: ", ";\n      cursor: pointer;\n    }\n  };\n"]);

  _templateObject20 = function _templateObject20() {
    return data;
  };

  return data;
}

function _templateObject19() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  ::-webkit-scrollbar {\n    height: 10px;\n    width: 10px;\n  }\n\n  ::-webkit-scrollbar-corner {\n    background: ", ";\n  }\n\n  ::-webkit-scrollbar-track {\n    background: ", ";\n  }\n\n  ::-webkit-scrollbar-thumb {\n    border-radius: 10px;\n    background: ", ";\n    border: 3px solid ", ";\n\n    :hover {\n      background: ", ";\n      cursor: pointer;\n    }\n  };\n}"]);

  _templateObject19 = function _templateObject19() {
    return data;
  };

  return data;
}

function _templateObject18() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  overflow-y: auto;\n  max-height: 280px;\n  box-shadow: ", ";\n  border-radius: 2px;\n\n  .list__section {\n    ", ";\n  }\n  .list__header {\n    ", ";\n  }\n\n  .list__item {\n    ", ";\n  }\n\n  .list__item__anchor {\n    ", ";\n  }\n\n  ", ";\n"]);

  _templateObject18 = function _templateObject18() {
    return data;
  };

  return data;
}

function _templateObject17() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  padding: 0 0 4px 0;\n  margin-bottom: 4px;\n  border-bottom: 1px solid ", ";\n"]);

  _templateObject17 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  font-size: 11px;\n  padding: 5px 9px;\n  color: ", ";\n"]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  font-size: 11px;\n  padding: 3px 9px;\n  font-weight: 500;\n\n  &.hover,\n  &:hover {\n    cursor: pointer;\n    background-color: ", ";\n\n    .list__item__anchor {\n      color: ", ";\n    }\n  }\n"]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  padding-left: 3px;\n"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  ::-webkit-scrollbar {\n    height: 10px;\n    width: 10px;\n  }\n\n  ::-webkit-scrollbar-corner {\n    background: ", ";\n  }\n\n  ::-webkit-scrollbar-track {\n    background: ", ";\n  }\n\n  ::-webkit-scrollbar-thumb {\n    border-radius: 10px;\n    background: ", ";\n    border: 3px solid ", ";\n  };\n\n  :vertical:hover {\n    background: ", ";\n    cursor: pointer;\n  }\n}"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  ", "\n  :before {\n    ", " background: ", ";\n  }\n\n  :after {\n    ", "\n    background: ", ";\n  }\n"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: inline-block;\n  position: relative;\n  padding-left: 32px;\n  margin-bottom: 24px;\n  line-height: 20px;\n  vertical-align: middle;\n  cursor: pointer;\n  font-size: 12px;\n  color: ", ";\n  margin-left: -", "px;\n\n  :before {\n     ", ";\n  }\n\n  :after {\n    ", ";\n  }\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  width: 10px;\n  height: 5px;\n  border-bottom: 2px solid white;\n  border-left: 2px solid white;\n  top: 4px;\n  left: 3px;\n  transform: rotate(-45deg);\n  display: block;\n  position: absolute;\n  opacity: ", ";\n  content: \"\";\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: ", "px;\n  height: ", "px;\n  background: ", ";\n  border: 1px solid ", ";\n  border-radius: 2px;\n  content: '';\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  user-select: none;\n  cursor: pointer;\n  line-height: 0;\n  font-weight: 500;\n  font-size: 12px;\n  color: ", ";\n  position: relative;\n  display: inline-block;\n  padding-top: ", "px;\n  padding-right: 0;\n  padding-bottom: 0;\n  padding-left: ", "px;\n\n  :before {\n    ", ";\n  }\n\n  :after {\n    ", ";\n  }\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  transition: ", ";\n  position: absolute;\n  top: 0;\n  left: ", "px;\n  content: '';\n  display: block;\n  height: ", ";\n  width: ", ";\n  background: ", ";\n  box-shadow: ", ";\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  background: ", ";\n  position: absolute;\n  top: 0;\n  left: ", "px;\n  content: '';\n  display: block;\n  width: ", "px;\n  height: ", "px;\n  border-radius: ", ";\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  ", " color: ", ";\n  font-size: 13px;\n  letter-spacing: 0.43px;\n  line-height: 18px;\n  height: 24px;\n  font-weight: 400;\n  padding-left: 4px;\n  margin-left: -4px;\n  background-color: transparent;\n  border: 1px solid transparent;\n\n  :hover {\n    height: 24px;\n    cursor: text;\n    background-color: transparent;\n    border: 1px solid ", ";\n  }\n\n  :active,\n  .active,\n  :focus {\n    background-color: transparent;\n    border: 1px solid ", ";\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  ", "\n  cursor: pointer;\n  flex-wrap: wrap;\n  height: auto;\n  justify-content: start;\n  margin-bottom: 2px;\n  padding: 4px 7px 4px 4px;\n  white-space: normal;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  ", "\n  color: ", ";\n  background-color: ", ";\n  height: ", ";\n  border: 1px solid\n    ", ";\n\n  :hover {\n    cursor: pointer;\n    background-color: ", ";\n    border-color: ", ";\n  }\n\n  :active,\n  &.active {\n    background-color: ", ";\n    border-color: ", ";\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  ", "\n\n  background-color: ", ";\n  border: 1px solid\n  ", ";\n  color: ", ";\n  caret-color: ", ";\n\n  ::-webkit-input-placeholder {\n    color: ", ";\n    font-weight: 400;\n  }\n\n  :active,\n  :focus,\n  &.focus,\n  &.active {\n    background-color: ", ";\n    border-color: ", ";\n  }\n\n  :hover {\n    background-color: ", ";\n    cursor: ", ";\n    border-color: ", ";\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  align-items: center;\n  background-color: ", ";\n  border: 1px solid\n    ", ";\n  border-radius: 2px;\n  caret-color: ", ";\n  color: ", ";\n  display: flex;\n  font-size: ", ";\n  font-weight: ", ";\n  height: ", ";\n  justify-content: space-between;\n  outline: none;\n  overflow: hidden;\n  padding: ", ";\n  text-overflow: ellipsis;\n  transition: ", ";\n  white-space: nowrap;\n  width: 100%;\n  word-wrap: normal;\n  pointer-events: ", ";\n  opacity: ", ";\n\n  :hover {\n    cursor: ", ";\n    background-color: ", ";\n    border-color: ", ";\n  }\n\n  :active,\n  :focus,\n  &.focus,\n  &.active {\n    background-color: ", ";\n    border-color: ", ";\n  }\n\n  ::placeholder {\n    color: ", ";\n    font-weight: ", ";\n  }\n\n  /* Disable Arrows on Number Inputs */\n  ::-webkit-inner-spin-button,\n  ::-webkit-outer-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var transition = 'all .4s ease';
exports.transition = transition;
var transitionFast = 'all .2s ease';
exports.transitionFast = transitionFast;
var transitionSlow = 'all .8s ease';
exports.transitionSlow = transitionSlow;
var boxShadow = '0 1px 2px 0 rgba(0,0,0,0.10)';
exports.boxShadow = boxShadow;
var boxSizing = 'border-box';
exports.boxSizing = boxSizing;
var borderRadius = '1px';
exports.borderRadius = borderRadius;
var borderColor = '#3A414C';
exports.borderColor = borderColor;
var borderColorLight = '#F1F1F1'; // TEXT

exports.borderColorLight = borderColorLight;
var labelColor = '#6A7485';
exports.labelColor = labelColor;
var labelHoverColor = '#C6C6C6';
exports.labelHoverColor = labelHoverColor;
var labelColorLT = '#6A7485';
exports.labelColorLT = labelColorLT;
var textColor = '#A0A7B4';
exports.textColor = textColor;
var textColorLT = '#3A414C';
exports.textColorLT = textColorLT;
var titleColorLT = '#29323C';
exports.titleColorLT = titleColorLT;
var subtextColor = '#6A7485';
exports.subtextColor = subtextColor;
var subtextColorLT = '#A0A7B4';
exports.subtextColorLT = subtextColorLT;
var subtextColorActive = '#FFFFFF';
exports.subtextColorActive = subtextColorActive;
var titleTextColor = '#FFFFFF';
exports.titleTextColor = titleTextColor;
var textColorHl = '#D3D8E0';
exports.textColorHl = textColorHl;
var textColorHlLT = '#F1F1F1';
exports.textColorHlLT = textColorHlLT;
var activeColor = '#1FBAD6';
exports.activeColor = activeColor;
var activeColorHover = '#108188';
exports.activeColorHover = activeColorHover;
var errorColor = '#F9042C'; // Button

exports.errorColor = errorColor;
var primaryBtnBgd = '#0F9668';
exports.primaryBtnBgd = primaryBtnBgd;
var primaryBtnActBgd = '#13B17B';
exports.primaryBtnActBgd = primaryBtnActBgd;
var primaryBtnColor = '#FFFFFF';
exports.primaryBtnColor = primaryBtnColor;
var primaryBtnActColor = '#FFFFFF';
exports.primaryBtnActColor = primaryBtnActColor;
var primaryBtnBgdHover = '#13B17B';
exports.primaryBtnBgdHover = primaryBtnBgdHover;
var primaryBtnRadius = '2px';
exports.primaryBtnRadius = primaryBtnRadius;
var secondaryBtnBgd = '#6A7485';
exports.secondaryBtnBgd = secondaryBtnBgd;
var secondaryBtnActBgd = '#A0A7B4';
exports.secondaryBtnActBgd = secondaryBtnActBgd;
var secondaryBtnColor = '#FFFFFF';
exports.secondaryBtnColor = secondaryBtnColor;
var secondaryBtnActColor = '#FFFFFF';
exports.secondaryBtnActColor = secondaryBtnActColor;
var secondaryBtnBgdHover = '#A0A7B4';
exports.secondaryBtnBgdHover = secondaryBtnBgdHover;
var linkBtnBgd = 'transparent';
exports.linkBtnBgd = linkBtnBgd;
var linkBtnActBgd = linkBtnBgd;
exports.linkBtnActBgd = linkBtnActBgd;
var linkBtnColor = '#A0A7B4';
exports.linkBtnColor = linkBtnColor;
var linkBtnActColor = textColorHlLT;
exports.linkBtnActColor = linkBtnActColor;
var linkBtnActBgdHover = linkBtnBgd;
exports.linkBtnActBgdHover = linkBtnActBgdHover;
var negativeBtnBgd = errorColor;
exports.negativeBtnBgd = negativeBtnBgd;
var negativeBtnActBgd = '#FF193E';
exports.negativeBtnActBgd = negativeBtnActBgd;
var negativeBtnBgdHover = '#FF193E';
exports.negativeBtnBgdHover = negativeBtnBgdHover;
var negativeBtnColor = '#FFFFFF';
exports.negativeBtnColor = negativeBtnColor;
var negativeBtnActColor = '#FFFFFF'; // Input

exports.negativeBtnActColor = negativeBtnActColor;
var inputBoxHeight = '34px';
exports.inputBoxHeight = inputBoxHeight;
var inputPadding = '4px 10px';
exports.inputPadding = inputPadding;
var inputFontSize = '11px';
exports.inputFontSize = inputFontSize;
var inputFontWeight = 500;
exports.inputFontWeight = inputFontWeight;
var inputBgd = '#29323C';
exports.inputBgd = inputBgd;
var inputBgdHover = '#3A414C';
exports.inputBgdHover = inputBgdHover;
var inputBgdActive = '#3A414C';
exports.inputBgdActive = inputBgdActive;
var inputBorderColor = '#29323C';
exports.inputBorderColor = inputBorderColor;
var inputBorderHoverColor = '#3A414C';
exports.inputBorderHoverColor = inputBorderHoverColor;
var inputBorderActiveColor = '#D3D8E0';
exports.inputBorderActiveColor = inputBorderActiveColor;
var inputColor = '#A0A7B4';
exports.inputColor = inputColor;
var inputBorderRadius = '1px';
exports.inputBorderRadius = inputBorderRadius;
var inputPlaceholderColor = '#6A7485';
exports.inputPlaceholderColor = inputPlaceholderColor;
var inputPlaceholderFontWeight = 400;
exports.inputPlaceholderFontWeight = inputPlaceholderFontWeight;
var secondaryInputHeight = '28px';
exports.secondaryInputHeight = secondaryInputHeight;
var secondaryInputBgd = '#242730';
exports.secondaryInputBgd = secondaryInputBgd;
var secondaryInputBgdHover = '#3A414C';
exports.secondaryInputBgdHover = secondaryInputBgdHover;
var secondaryInputBgdActive = '#3A414C';
exports.secondaryInputBgdActive = secondaryInputBgdActive;
var secondaryInputColor = '#A0A7B4';
exports.secondaryInputColor = secondaryInputColor;
var secondaryInputBorderColor = '#242730';
exports.secondaryInputBorderColor = secondaryInputBorderColor;
var secondaryInputBorderActiveColor = '#D3D8E0'; // Select

exports.secondaryInputBorderActiveColor = secondaryInputBorderActiveColor;
var selectColor = inputColor;
exports.selectColor = selectColor;
var selectColorLT = titleColorLT;
exports.selectColorLT = selectColorLT;
var selectActiveBorderColor = '#D3D8E0';
exports.selectActiveBorderColor = selectActiveBorderColor;
var selectFontSize = '11px';
exports.selectFontSize = selectFontSize;
var selectFontWeight = '400';
exports.selectFontWeight = selectFontWeight;
var selectFontWeightBold = '500';
exports.selectFontWeightBold = selectFontWeightBold;
var selectColorPlaceHolder = '#6A7485';
exports.selectColorPlaceHolder = selectColorPlaceHolder;
var selectBackground = inputBgd;
exports.selectBackground = selectBackground;
var selectBackgroundHover = inputBgdHover;
exports.selectBackgroundHover = selectBackgroundHover;
var selectBackgroundLT = '#FFFFFF';
exports.selectBackgroundLT = selectBackgroundLT;
var selectBackgroundHoverLT = '#F8F8F9';
exports.selectBackgroundHoverLT = selectBackgroundHoverLT;
var selectBorderColor = '#D3D8E0';
exports.selectBorderColor = selectBorderColor;
var selectBorderColorLT = '#D3D8E0';
exports.selectBorderColorLT = selectBorderColorLT;
var selectBorderRadius = '1px';
exports.selectBorderRadius = selectBorderRadius;
var selectBorder = 0;
exports.selectBorder = selectBorder;
var dropdownListHighlightBg = '#6A7485';
exports.dropdownListHighlightBg = dropdownListHighlightBg;
var dropdownListShadow = '0 6px 12px 0 rgba(0,0,0,0.16)';
exports.dropdownListShadow = dropdownListShadow;
var dropdownListBgd = '#3A414C';
exports.dropdownListBgd = dropdownListBgd;
var dropdownListBorderTop = '#242730'; // Switch

exports.dropdownListBorderTop = dropdownListBorderTop;
var switchWidth = 24;
exports.switchWidth = switchWidth;
var switchHeight = 12;
exports.switchHeight = switchHeight;
var switchLabelMargin = 12;
exports.switchLabelMargin = switchLabelMargin;
var switchTrackBgd = '#29323C';
exports.switchTrackBgd = switchTrackBgd;
var switchTrackBgdActive = activeColor;
exports.switchTrackBgdActive = switchTrackBgdActive;
var switchTrackBorderRadius = '1px';
exports.switchTrackBorderRadius = switchTrackBorderRadius;
var switchBtnBgd = '#6A7485';
exports.switchBtnBgd = switchBtnBgd;
var switchBtnBgdActive = '#D3D8E0';
exports.switchBtnBgdActive = switchBtnBgdActive;
var switchBtnBoxShadow = '0 2px 4px 0 rgba(0,0,0,0.40)';
exports.switchBtnBoxShadow = switchBtnBoxShadow;
var switchBtnBorderRadius = '1px';
exports.switchBtnBorderRadius = switchBtnBorderRadius;
var switchBtnWidth = '12px';
exports.switchBtnWidth = switchBtnWidth;
var switchBtnHeight = '12px';
exports.switchBtnHeight = switchBtnHeight;
var secondarySwitchTrackBgd = '#242730';
exports.secondarySwitchTrackBgd = secondarySwitchTrackBgd;
var secondarySwitchBtnBgd = '#3A414C'; // Checkbox

exports.secondarySwitchBtnBgd = secondarySwitchBtnBgd;
var checkboxWidth = 16;
exports.checkboxWidth = checkboxWidth;
var checkboxHeight = 16;
exports.checkboxHeight = checkboxHeight;
var checkboxMargin = 12;
exports.checkboxMargin = checkboxMargin;
var checkboxBorderColor = selectBorderColor;
exports.checkboxBorderColor = checkboxBorderColor;
var checkboxBorderRadius = '2px';
exports.checkboxBorderRadius = checkboxBorderRadius;
var checkboxBorderColorLT = selectBorderColorLT;
exports.checkboxBorderColorLT = checkboxBorderColorLT;
var checkboxBoxBgd = 'white';
exports.checkboxBoxBgd = checkboxBoxBgd;
var checkboxBoxBgdChecked = primaryBtnBgd; // Side Panel

exports.checkboxBoxBgdChecked = checkboxBoxBgdChecked;
var sidePanelHeaderBg = '#29323C';
exports.sidePanelHeaderBg = sidePanelHeaderBg;
var sidePanelBg = '#242730';
exports.sidePanelBg = sidePanelBg;
var sideBarCloseBtnBgd = secondaryBtnBgd;
exports.sideBarCloseBtnBgd = sideBarCloseBtnBgd;
var sideBarCloseBtnColor = '#29323C';
exports.sideBarCloseBtnColor = sideBarCloseBtnColor;
var sideBarCloseBtnBgdHover = secondaryBtnActBgd;
exports.sideBarCloseBtnBgdHover = sideBarCloseBtnBgdHover;
var panelBackground = '#29323C';
exports.panelBackground = panelBackground;
var panelBackgroundHover = '#3A4552';
exports.panelBackgroundHover = panelBackgroundHover;
var panelActiveBg = '#3A4552';
exports.panelActiveBg = panelActiveBg;
var panelActiveBgLT = '#6A7485';
exports.panelActiveBgLT = panelActiveBgLT;
var panelHeaderIcon = '#6A7485';
exports.panelHeaderIcon = panelHeaderIcon;
var panelHeaderIconActive = '#A0A7B4';
exports.panelHeaderIconActive = panelHeaderIconActive;
var panelHeaderHeight = 48;
exports.panelHeaderHeight = panelHeaderHeight;
var panelBoxShadow = '0 6px 12px 0 rgba(0,0,0,0.16)';
exports.panelBoxShadow = panelBoxShadow;
var panelBorderRadius = '2px';
exports.panelBorderRadius = panelBorderRadius;
var panelBackgroundLT = '#f8f8f9';
exports.panelBackgroundLT = panelBackgroundLT;
var panelBorderColor = '#3A414C';
exports.panelBorderColor = panelBorderColor;
var panelBorder = "1px solid ".concat(borderColor);
exports.panelBorder = panelBorder;
var panelBorderLT = "1px solid ".concat(borderColorLight);
exports.panelBorderLT = panelBorderLT;
var mapPanelBackgroundColor = '#242730';
exports.mapPanelBackgroundColor = mapPanelBackgroundColor;
var mapPanelHeaderBackgroundColor = '#29323C';
exports.mapPanelHeaderBackgroundColor = mapPanelHeaderBackgroundColor;
var tooltipBg = '#F8F8F9';
exports.tooltipBg = tooltipBg;
var tooltipColor = '#333334'; // Modal

exports.tooltipColor = tooltipColor;
var modalTitleColor = '#3A414C';
exports.modalTitleColor = modalTitleColor;
var modalTitleFontSize = '24px';
exports.modalTitleFontSize = modalTitleFontSize;
var modalFooterBgd = '#F8F8F9';
exports.modalFooterBgd = modalFooterBgd;
var modalImagePlaceHolder = '#DDDFE3'; // Modal Dialog (Dark)

exports.modalImagePlaceHolder = modalImagePlaceHolder;
var modalDialogBgd = '#3A414C';
exports.modalDialogBgd = modalDialogBgd;
var modalDialogColor = textColorHl; // Slider

exports.modalDialogColor = modalDialogColor;
var sliderBarColor = '#6A7485';
exports.sliderBarColor = sliderBarColor;
var sliderBarBgd = '#3A414C';
exports.sliderBarBgd = sliderBarBgd;
var sliderBarHoverColor = '#D3D8E0';
exports.sliderBarHoverColor = sliderBarHoverColor;
var sliderBarRadius = '1px';
exports.sliderBarRadius = sliderBarRadius;
var sliderBarHeight = '4px';
exports.sliderBarHeight = sliderBarHeight;
var sliderHandleHeight = '12px';
exports.sliderHandleHeight = sliderHandleHeight;
var sliderHandleWidth = '12px';
exports.sliderHandleWidth = sliderHandleWidth;
var sliderHandleColor = '#D3D8E0';
exports.sliderHandleColor = sliderHandleColor;
var sliderHandleHoverColor = '#FFFFFF';
exports.sliderHandleHoverColor = sliderHandleHoverColor;
var sliderHandleShadow = '0 2px 4px 0 rgba(0,0,0,0.40)';
exports.sliderHandleShadow = sliderHandleShadow;
var sliderInputHeight = 24;
exports.sliderInputHeight = sliderInputHeight;
var sliderInputWidth = 50; // Plot

exports.sliderInputWidth = sliderInputWidth;
var rangeBrushBgd = '#3A414C'; // Notification

exports.rangeBrushBgd = rangeBrushBgd;
var notificationColors = {
  info: '#276ef1',
  error: '#f25138',
  success: '#47b275',
  warning: '#ffc043'
};
exports.notificationColors = notificationColors;
var notificationPanelWidth = 240;
exports.notificationPanelWidth = notificationPanelWidth;
var notificationPanelItemWidth = notificationPanelWidth - 60;
exports.notificationPanelItemWidth = notificationPanelItemWidth;
var notificationPanelItemHeight = 60;
exports.notificationPanelItemHeight = notificationPanelItemHeight;
var textTruncate = {
  maxWidth: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  wordWrap: 'normal'
}; // theme is passed to kepler.gl when it's mounted,
// it is used by styled-components to pass along to
// all child components

exports.textTruncate = textTruncate;
var input = (0, _styledComponents.css)(_templateObject(), function (props) {
  return props.theme.inputBgd;
}, function (props) {
  return props.active ? props.theme.inputBorderActiveColor : props.error ? props.theme.errorColor : props.theme.inputBgd;
}, function (props) {
  return props.theme.inputBorderActiveColor;
}, function (props) {
  return props.theme.inputColor;
}, function (props) {
  return props.theme.inputFontSize;
}, function (props) {
  return props.theme.inputFontWeight;
}, function (props) {
  return props.theme.inputBoxHeight;
}, function (props) {
  return props.theme.inputPadding;
}, function (props) {
  return props.theme.transition;
}, function (props) {
  return props.disabled ? 'none' : 'all';
}, function (props) {
  return props.disabled ? 0.5 : 1;
}, function (props) {
  return props.type === 'number' ? 'text' : 'pointer';
}, function (props) {
  return props.active ? props.theme.inputBgdActive : props.theme.inputBgdHover;
}, function (props) {
  return props.active ? props.theme.inputBorderActiveColor : props.theme.inputBorderHoverColor;
}, function (props) {
  return props.theme.inputBgdActive;
}, function (props) {
  return props.theme.inputBorderActiveColor;
}, function (props) {
  return props.theme.inputPlaceholderColor;
}, function (props) {
  return props.theme.inputPlaceholderFontWeight;
});
var inputLT = (0, _styledComponents.css)(_templateObject2(), input, function (props) {
  return props.theme.selectBackgroundLT;
}, function (props) {
  return props.active ? props.theme.selectActiveBorderColor : props.error ? props.theme.errorColor : props.theme.selectBorderColorLT;
}, function (props) {
  return props.theme.selectColorLT;
}, function (props) {
  return props.theme.selectColorLT;
}, function (props) {
  return props.theme.subtextColorLT;
}, function (props) {
  return props.theme.selectBackgroundLT;
}, function (props) {
  return props.theme.textColorLT;
}, function (props) {
  return props.theme.selectBackgroundLT;
}, function (props) {
  return ['number', 'text'].includes(props.type) ? 'text' : 'pointer';
}, function (props) {
  return props.active ? props.theme.textColorLT : props.theme.subtextColor;
});
var secondaryInput = (0, _styledComponents.css)(_templateObject3(), function (props) {
  return props.theme.input;
}, function (props) {
  return props.theme.secondaryInputColor;
}, function (props) {
  return props.theme.secondaryInputBgd;
}, function (props) {
  return props.theme.secondaryInputHeight;
}, function (props) {
  return props.error ? props.theme.errorColor : props.theme.secondaryInputBorderColor;
}, function (props) {
  return props.theme.secondaryInputBgdHover;
}, function (props) {
  return props.theme.secondaryInputBgdHover;
}, function (props) {
  return props.theme.secondaryInputBgdActive;
}, function (props) {
  return props.theme.secondaryInputBorderActiveColor;
});
var chickletedInput = (0, _styledComponents.css)(_templateObject4(), function (props) {
  return props.theme.secondaryInput;
});
var inlineInput = (0, _styledComponents.css)(_templateObject5(), function (props) {
  return props.theme.input;
}, function (props) {
  return props.theme.textColor;
}, function (props) {
  return props.theme.labelColor;
}, function (props) {
  return props.theme.inputBorderActiveColor;
});
var switchTrack = (0, _styledComponents.css)(_templateObject6(), function (props) {
  return props.checked ? props.theme.switchTrackBgdActive : props.theme.switchTrackBgd;
}, function (props) {
  return -props.theme.switchLabelMargin;
}, function (props) {
  return props.theme.switchWidth;
}, function (props) {
  return props.theme.switchHeight;
}, function (props) {
  return props.theme.switchTrackBorderRadius;
});
var switchButton = (0, _styledComponents.css)(_templateObject7(), function (props) {
  return props.theme.transition;
}, function (props) {
  return (props.checked ? props.theme.switchWidth / 2 : -1) - props.theme.switchLabelMargin;
}, function (props) {
  return props.theme.switchBtnHeight;
}, function (props) {
  return props.theme.switchBtnWidth;
}, function (props) {
  return props.checked ? props.theme.switchBtnBgdActive : props.theme.switchBtnBgd;
}, function (props) {
  return props.theme.switchBtnBoxShadow;
});
var inputSwitch = (0, _styledComponents.css)(_templateObject8(), function (props) {
  return props.theme.labelColor;
}, function (props) {
  return props.theme.switchHeight / 2;
}, function (props) {
  return props.theme.switchWidth;
}, function (props) {
  return props.theme.switchTrack;
}, function (props) {
  return props.theme.switchButton;
}); // This is a light version checkbox

var checkboxBox = (0, _styledComponents.css)(_templateObject9(), function (props) {
  return props.theme.checkboxWidth;
}, function (props) {
  return props.theme.checkboxHeight;
}, function (props) {
  return props.checked ? props.theme.checkboxBoxBgdChecked : props.theme.checkboxBoxBgd;
}, function (props) {
  return props.checked ? props.theme.checkboxBoxBgdChecked : props.theme.checkboxBorderColor;
});
var checkboxCheck = (0, _styledComponents.css)(_templateObject10(), function (props) {
  return props.checked ? 1 : 0;
});
var inputCheckbox = (0, _styledComponents.css)(_templateObject11(), function (props) {
  return props.theme.labelColor;
}, function (props) {
  return props.theme.switchLabelMargin;
}, function (props) {
  return props.theme.checkboxBox;
}, function (props) {
  return props.theme.checkboxCheck;
});
var secondarySwitch = (0, _styledComponents.css)(_templateObject12(), function (props) {
  return props.theme.inputSwitch;
}, function (props) {
  return props.theme.switchTrack;
}, function (props) {
  return props.checked ? props.theme.switchTrackBgdActive : props.theme.secondarySwitchTrackBgd;
}, function (props) {
  return props.theme.switchButton;
}, function (props) {
  return props.checked ? props.theme.switchBtnBgdActive : props.theme.secondarySwitchBtnBgd;
});
var dropdownScrollBar = (0, _styledComponents.css)(_templateObject13(), function (props) {
  return props.theme.dropdownListBgd;
}, function (props) {
  return props.theme.dropdownListBgd;
}, function (props) {
  return props.theme.labelColor;
}, function (props) {
  return props.theme.dropdownListBgd;
}, function (props) {
  return props.theme.textColorHl;
});
var dropdownListAnchor = (0, _styledComponents.css)(_templateObject14(), function (props) {
  return props.theme.selectColor;
});
var dropdownListItem = (0, _styledComponents.css)(_templateObject15(), function (props) {
  return props.theme.dropdownListHighlightBg;
}, function (props) {
  return props.theme.textColorHl;
});
var dropdownListHeader = (0, _styledComponents.css)(_templateObject16(), function (props) {
  return props.theme.labelColor;
});
var dropdownListSection = (0, _styledComponents.css)(_templateObject17(), function (props) {
  return props.theme.labelColor;
});
var dropdownList = (0, _styledComponents.css)(_templateObject18(), function (props) {
  return props.theme.dropdownListShadow;
}, function (props) {
  return props.theme.dropdownListSection;
}, function (props) {
  return props.theme.dropdownListHeader;
}, function (props) {
  return props.theme.dropdownListItem;
}, function (props) {
  return props.theme.dropdownListAnchor;
}, function (props) {
  return props.theme.dropdownScrollBar;
});
var sidePanelScrollBar = (0, _styledComponents.css)(_templateObject19(), function (props) {
  return props.theme.sidePanelBg;
}, function (props) {
  return props.theme.sidePanelBg;
}, function (props) {
  return props.theme.panelBackgroundHover;
}, function (props) {
  return props.theme.sidePanelBg;
}, function (props) {
  return props.theme.labelColor;
});
var panelDropdownScrollBar = (0, _styledComponents.css)(_templateObject20(), function (props) {
  return props.theme.panelBackground;
}, function (props) {
  return props.theme.panelBackground;
}, function (props) {
  return props.theme.panelBackgroundHover;
}, function (props) {
  return props.theme.panelBackground;
}, function (props) {
  return props.theme.labelColor;
});
var scrollBar = (0, _styledComponents.css)(_templateObject21(), function (props) {
  return props.theme.panelBackground;
}, function (props) {
  return props.theme.panelBackground;
}, function (props) {
  return props.theme.labelColor;
}, function (props) {
  return props.theme.panelBackground;
}, function (props) {
  return props.theme.textColorHl;
}, function (props) {
  return props.theme.textColorHl;
});
var modalScrollBar = (0, _styledComponents.css)(_templateObject22(), function (props) {
  return props.theme.textColorHl;
}, function (props) {
  return props.theme.labelColorLT;
}, function (props) {
  return props.theme.textColorHl;
}, function (props) {
  return props.theme.textColorHl;
});
exports.modalScrollBar = modalScrollBar;
var theme = (0, _objectSpread2.default)({}, _defaultSettings.DIMENSIONS, {
  // templates
  input: input,
  inputLT: inputLT,
  inlineInput: inlineInput,
  chickletedInput: chickletedInput,
  secondaryInput: secondaryInput,
  dropdownScrollBar: dropdownScrollBar,
  dropdownList: dropdownList,
  dropdownListItem: dropdownListItem,
  dropdownListAnchor: dropdownListAnchor,
  dropdownListHeader: dropdownListHeader,
  dropdownListSection: dropdownListSection,
  dropdownListShadow: dropdownListShadow,
  modalScrollBar: modalScrollBar,
  scrollBar: scrollBar,
  sidePanelScrollBar: sidePanelScrollBar,
  inputSwitch: inputSwitch,
  secondarySwitch: secondarySwitch,
  switchTrack: switchTrack,
  switchButton: switchButton,
  inputCheckbox: inputCheckbox,
  checkboxBox: checkboxBox,
  checkboxCheck: checkboxCheck,
  // Transitions
  transition: transition,
  transitionFast: transitionFast,
  transitionSlow: transitionSlow,
  // styles
  activeColor: activeColor,
  activeColorHover: activeColorHover,
  borderRadius: borderRadius,
  boxShadow: boxShadow,
  errorColor: errorColor,
  dropdownListHighlightBg: dropdownListHighlightBg,
  dropdownListBgd: dropdownListBgd,
  dropdownListBorderTop: dropdownListBorderTop,
  labelColor: labelColor,
  labelColorLT: labelColorLT,
  labelHoverColor: labelHoverColor,
  mapPanelBackgroundColor: mapPanelBackgroundColor,
  mapPanelHeaderBackgroundColor: mapPanelHeaderBackgroundColor,
  // Select
  selectActiveBorderColor: selectActiveBorderColor,
  selectBackground: selectBackground,
  selectBackgroundLT: selectBackgroundLT,
  selectBackgroundHover: selectBackgroundHover,
  selectBackgroundHoverLT: selectBackgroundHoverLT,
  selectBorder: selectBorder,
  selectBorderColor: selectBorderColor,
  selectBorderRadius: selectBorderRadius,
  selectBorderColorLT: selectBorderColorLT,
  selectColor: selectColor,
  selectColorPlaceHolder: selectColorPlaceHolder,
  selectFontSize: selectFontSize,
  selectFontWeight: selectFontWeight,
  selectColorLT: selectColorLT,
  // Input
  inputBgd: inputBgd,
  inputBgdHover: inputBgdHover,
  inputBgdActive: inputBgdActive,
  inputBoxHeight: inputBoxHeight,
  inputBorderColor: inputBorderColor,
  inputBorderActiveColor: inputBorderActiveColor,
  inputBorderHoverColor: inputBorderHoverColor,
  inputBorderRadius: inputBorderRadius,
  inputColor: inputColor,
  inputPadding: inputPadding,
  inputFontSize: inputFontSize,
  inputFontWeight: inputFontWeight,
  inputPlaceholderColor: inputPlaceholderColor,
  inputPlaceholderFontWeight: inputPlaceholderFontWeight,
  secondaryInputBgd: secondaryInputBgd,
  secondaryInputBgdHover: secondaryInputBgdHover,
  secondaryInputBgdActive: secondaryInputBgdActive,
  secondaryInputHeight: secondaryInputHeight,
  secondaryInputColor: secondaryInputColor,
  secondaryInputBorderColor: secondaryInputBorderColor,
  secondaryInputBorderActiveColor: secondaryInputBorderActiveColor,
  // Switch
  switchWidth: switchWidth,
  switchHeight: switchHeight,
  switchTrackBgd: switchTrackBgd,
  switchTrackBgdActive: switchTrackBgdActive,
  switchTrackBorderRadius: switchTrackBorderRadius,
  switchBtnBgd: switchBtnBgd,
  switchBtnBgdActive: switchBtnBgdActive,
  switchBtnBoxShadow: switchBtnBoxShadow,
  switchBtnBorderRadius: switchBtnBorderRadius,
  switchBtnWidth: switchBtnWidth,
  switchBtnHeight: switchBtnHeight,
  switchLabelMargin: switchLabelMargin,
  secondarySwitchTrackBgd: secondarySwitchTrackBgd,
  secondarySwitchBtnBgd: secondarySwitchBtnBgd,
  // Checkbox
  checkboxWidth: checkboxWidth,
  checkboxHeight: checkboxHeight,
  checkboxMargin: checkboxMargin,
  checkboxBorderColor: checkboxBorderColor,
  checkboxBorderRadius: checkboxBorderRadius,
  checkboxBorderColorLT: checkboxBorderColorLT,
  checkboxBoxBgd: checkboxBoxBgd,
  checkboxBoxBgdChecked: checkboxBoxBgdChecked,
  // Button
  primaryBtnBgd: primaryBtnBgd,
  primaryBtnActBgd: primaryBtnActBgd,
  primaryBtnColor: primaryBtnColor,
  primaryBtnActColor: primaryBtnActColor,
  primaryBtnBgdHover: primaryBtnBgdHover,
  primaryBtnRadius: primaryBtnRadius,
  secondaryBtnBgd: secondaryBtnBgd,
  secondaryBtnActBgd: secondaryBtnActBgd,
  secondaryBtnBgdHover: secondaryBtnBgdHover,
  secondaryBtnColor: secondaryBtnColor,
  secondaryBtnActColor: secondaryBtnActColor,
  negativeBtnBgd: negativeBtnBgd,
  negativeBtnActBgd: negativeBtnActBgd,
  negativeBtnBgdHover: negativeBtnBgdHover,
  negativeBtnColor: negativeBtnColor,
  negativeBtnActColor: negativeBtnActColor,
  linkBtnBgd: linkBtnBgd,
  linkBtnActBgd: linkBtnActBgd,
  linkBtnColor: linkBtnColor,
  linkBtnActColor: linkBtnActColor,
  linkBtnActBgdHover: linkBtnActBgdHover,
  // Modal
  modalTitleColor: modalTitleColor,
  modalTitleFontSize: modalTitleFontSize,
  modalFooterBgd: modalFooterBgd,
  modalImagePlaceHolder: modalImagePlaceHolder,
  modalDialogBgd: modalDialogBgd,
  modalDialogColor: modalDialogColor,
  // Side Panel
  sidePanelBg: sidePanelBg,
  sideBarCloseBtnBgd: sideBarCloseBtnBgd,
  sideBarCloseBtnColor: sideBarCloseBtnColor,
  sideBarCloseBtnBgdHover: sideBarCloseBtnBgdHover,
  sidePanelHeaderBg: sidePanelHeaderBg,
  // Side Panel Panel
  panelActiveBg: panelActiveBg,
  panelBackground: panelBackground,
  panelBackgroundHover: panelBackgroundHover,
  panelBackgroundLT: panelBackgroundLT,
  panelBoxShadow: panelBoxShadow,
  panelBorderRadius: panelBorderRadius,
  panelBorder: panelBorder,
  panelBorderColor: panelBorderColor,
  panelBorderLT: panelBorderLT,
  panelHeaderIcon: panelHeaderIcon,
  panelHeaderIconActive: panelHeaderIconActive,
  panelHeaderHeight: panelHeaderHeight,
  panelDropdownScrollBar: panelDropdownScrollBar,
  // Text
  textColor: textColor,
  textColorLT: textColorLT,
  textColorHl: textColorHl,
  titleTextColor: titleTextColor,
  subtextColor: subtextColor,
  subtextColorLT: subtextColorLT,
  subtextColorActive: subtextColorActive,
  textTruncate: textTruncate,
  titleColorLT: titleColorLT,
  tooltipBg: tooltipBg,
  tooltipColor: tooltipColor,
  // Slider
  sliderBarColor: sliderBarColor,
  sliderBarBgd: sliderBarBgd,
  sliderBarHoverColor: sliderBarHoverColor,
  sliderBarRadius: sliderBarRadius,
  sliderBarHeight: sliderBarHeight,
  sliderHandleHeight: sliderHandleHeight,
  sliderHandleWidth: sliderHandleWidth,
  sliderHandleColor: sliderHandleColor,
  sliderHandleHoverColor: sliderHandleHoverColor,
  sliderHandleShadow: sliderHandleShadow,
  sliderInputHeight: sliderInputHeight,
  sliderInputWidth: sliderInputWidth,
  // Plot
  rangeBrushBgd: rangeBrushBgd,
  // Notifications
  notificationColors: notificationColors,
  notificationPanelWidth: notificationPanelWidth,
  notificationPanelItemWidth: notificationPanelItemWidth,
  notificationPanelItemHeight: notificationPanelItemHeight
});
exports.theme = theme;
var themeLT = (0, _objectSpread2.default)({}, theme, {
  // template
  input: inputLT,
  panelActiveBg: panelActiveBgLT,
  textColor: textColorLT,
  textColorHl: textColorHlLT
});
exports.themeLT = themeLT;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHlsZXMvYmFzZS5qcyJdLCJuYW1lcyI6WyJ0cmFuc2l0aW9uIiwidHJhbnNpdGlvbkZhc3QiLCJ0cmFuc2l0aW9uU2xvdyIsImJveFNoYWRvdyIsImJveFNpemluZyIsImJvcmRlclJhZGl1cyIsImJvcmRlckNvbG9yIiwiYm9yZGVyQ29sb3JMaWdodCIsImxhYmVsQ29sb3IiLCJsYWJlbEhvdmVyQ29sb3IiLCJsYWJlbENvbG9yTFQiLCJ0ZXh0Q29sb3IiLCJ0ZXh0Q29sb3JMVCIsInRpdGxlQ29sb3JMVCIsInN1YnRleHRDb2xvciIsInN1YnRleHRDb2xvckxUIiwic3VidGV4dENvbG9yQWN0aXZlIiwidGl0bGVUZXh0Q29sb3IiLCJ0ZXh0Q29sb3JIbCIsInRleHRDb2xvckhsTFQiLCJhY3RpdmVDb2xvciIsImFjdGl2ZUNvbG9ySG92ZXIiLCJlcnJvckNvbG9yIiwicHJpbWFyeUJ0bkJnZCIsInByaW1hcnlCdG5BY3RCZ2QiLCJwcmltYXJ5QnRuQ29sb3IiLCJwcmltYXJ5QnRuQWN0Q29sb3IiLCJwcmltYXJ5QnRuQmdkSG92ZXIiLCJwcmltYXJ5QnRuUmFkaXVzIiwic2Vjb25kYXJ5QnRuQmdkIiwic2Vjb25kYXJ5QnRuQWN0QmdkIiwic2Vjb25kYXJ5QnRuQ29sb3IiLCJzZWNvbmRhcnlCdG5BY3RDb2xvciIsInNlY29uZGFyeUJ0bkJnZEhvdmVyIiwibGlua0J0bkJnZCIsImxpbmtCdG5BY3RCZ2QiLCJsaW5rQnRuQ29sb3IiLCJsaW5rQnRuQWN0Q29sb3IiLCJsaW5rQnRuQWN0QmdkSG92ZXIiLCJuZWdhdGl2ZUJ0bkJnZCIsIm5lZ2F0aXZlQnRuQWN0QmdkIiwibmVnYXRpdmVCdG5CZ2RIb3ZlciIsIm5lZ2F0aXZlQnRuQ29sb3IiLCJuZWdhdGl2ZUJ0bkFjdENvbG9yIiwiaW5wdXRCb3hIZWlnaHQiLCJpbnB1dFBhZGRpbmciLCJpbnB1dEZvbnRTaXplIiwiaW5wdXRGb250V2VpZ2h0IiwiaW5wdXRCZ2QiLCJpbnB1dEJnZEhvdmVyIiwiaW5wdXRCZ2RBY3RpdmUiLCJpbnB1dEJvcmRlckNvbG9yIiwiaW5wdXRCb3JkZXJIb3ZlckNvbG9yIiwiaW5wdXRCb3JkZXJBY3RpdmVDb2xvciIsImlucHV0Q29sb3IiLCJpbnB1dEJvcmRlclJhZGl1cyIsImlucHV0UGxhY2Vob2xkZXJDb2xvciIsImlucHV0UGxhY2Vob2xkZXJGb250V2VpZ2h0Iiwic2Vjb25kYXJ5SW5wdXRIZWlnaHQiLCJzZWNvbmRhcnlJbnB1dEJnZCIsInNlY29uZGFyeUlucHV0QmdkSG92ZXIiLCJzZWNvbmRhcnlJbnB1dEJnZEFjdGl2ZSIsInNlY29uZGFyeUlucHV0Q29sb3IiLCJzZWNvbmRhcnlJbnB1dEJvcmRlckNvbG9yIiwic2Vjb25kYXJ5SW5wdXRCb3JkZXJBY3RpdmVDb2xvciIsInNlbGVjdENvbG9yIiwic2VsZWN0Q29sb3JMVCIsInNlbGVjdEFjdGl2ZUJvcmRlckNvbG9yIiwic2VsZWN0Rm9udFNpemUiLCJzZWxlY3RGb250V2VpZ2h0Iiwic2VsZWN0Rm9udFdlaWdodEJvbGQiLCJzZWxlY3RDb2xvclBsYWNlSG9sZGVyIiwic2VsZWN0QmFja2dyb3VuZCIsInNlbGVjdEJhY2tncm91bmRIb3ZlciIsInNlbGVjdEJhY2tncm91bmRMVCIsInNlbGVjdEJhY2tncm91bmRIb3ZlckxUIiwic2VsZWN0Qm9yZGVyQ29sb3IiLCJzZWxlY3RCb3JkZXJDb2xvckxUIiwic2VsZWN0Qm9yZGVyUmFkaXVzIiwic2VsZWN0Qm9yZGVyIiwiZHJvcGRvd25MaXN0SGlnaGxpZ2h0QmciLCJkcm9wZG93bkxpc3RTaGFkb3ciLCJkcm9wZG93bkxpc3RCZ2QiLCJkcm9wZG93bkxpc3RCb3JkZXJUb3AiLCJzd2l0Y2hXaWR0aCIsInN3aXRjaEhlaWdodCIsInN3aXRjaExhYmVsTWFyZ2luIiwic3dpdGNoVHJhY2tCZ2QiLCJzd2l0Y2hUcmFja0JnZEFjdGl2ZSIsInN3aXRjaFRyYWNrQm9yZGVyUmFkaXVzIiwic3dpdGNoQnRuQmdkIiwic3dpdGNoQnRuQmdkQWN0aXZlIiwic3dpdGNoQnRuQm94U2hhZG93Iiwic3dpdGNoQnRuQm9yZGVyUmFkaXVzIiwic3dpdGNoQnRuV2lkdGgiLCJzd2l0Y2hCdG5IZWlnaHQiLCJzZWNvbmRhcnlTd2l0Y2hUcmFja0JnZCIsInNlY29uZGFyeVN3aXRjaEJ0bkJnZCIsImNoZWNrYm94V2lkdGgiLCJjaGVja2JveEhlaWdodCIsImNoZWNrYm94TWFyZ2luIiwiY2hlY2tib3hCb3JkZXJDb2xvciIsImNoZWNrYm94Qm9yZGVyUmFkaXVzIiwiY2hlY2tib3hCb3JkZXJDb2xvckxUIiwiY2hlY2tib3hCb3hCZ2QiLCJjaGVja2JveEJveEJnZENoZWNrZWQiLCJzaWRlUGFuZWxIZWFkZXJCZyIsInNpZGVQYW5lbEJnIiwic2lkZUJhckNsb3NlQnRuQmdkIiwic2lkZUJhckNsb3NlQnRuQ29sb3IiLCJzaWRlQmFyQ2xvc2VCdG5CZ2RIb3ZlciIsInBhbmVsQmFja2dyb3VuZCIsInBhbmVsQmFja2dyb3VuZEhvdmVyIiwicGFuZWxBY3RpdmVCZyIsInBhbmVsQWN0aXZlQmdMVCIsInBhbmVsSGVhZGVySWNvbiIsInBhbmVsSGVhZGVySWNvbkFjdGl2ZSIsInBhbmVsSGVhZGVySGVpZ2h0IiwicGFuZWxCb3hTaGFkb3ciLCJwYW5lbEJvcmRlclJhZGl1cyIsInBhbmVsQmFja2dyb3VuZExUIiwicGFuZWxCb3JkZXJDb2xvciIsInBhbmVsQm9yZGVyIiwicGFuZWxCb3JkZXJMVCIsIm1hcFBhbmVsQmFja2dyb3VuZENvbG9yIiwibWFwUGFuZWxIZWFkZXJCYWNrZ3JvdW5kQ29sb3IiLCJ0b29sdGlwQmciLCJ0b29sdGlwQ29sb3IiLCJtb2RhbFRpdGxlQ29sb3IiLCJtb2RhbFRpdGxlRm9udFNpemUiLCJtb2RhbEZvb3RlckJnZCIsIm1vZGFsSW1hZ2VQbGFjZUhvbGRlciIsIm1vZGFsRGlhbG9nQmdkIiwibW9kYWxEaWFsb2dDb2xvciIsInNsaWRlckJhckNvbG9yIiwic2xpZGVyQmFyQmdkIiwic2xpZGVyQmFySG92ZXJDb2xvciIsInNsaWRlckJhclJhZGl1cyIsInNsaWRlckJhckhlaWdodCIsInNsaWRlckhhbmRsZUhlaWdodCIsInNsaWRlckhhbmRsZVdpZHRoIiwic2xpZGVySGFuZGxlQ29sb3IiLCJzbGlkZXJIYW5kbGVIb3ZlckNvbG9yIiwic2xpZGVySGFuZGxlU2hhZG93Iiwic2xpZGVySW5wdXRIZWlnaHQiLCJzbGlkZXJJbnB1dFdpZHRoIiwicmFuZ2VCcnVzaEJnZCIsIm5vdGlmaWNhdGlvbkNvbG9ycyIsImluZm8iLCJlcnJvciIsInN1Y2Nlc3MiLCJ3YXJuaW5nIiwibm90aWZpY2F0aW9uUGFuZWxXaWR0aCIsIm5vdGlmaWNhdGlvblBhbmVsSXRlbVdpZHRoIiwibm90aWZpY2F0aW9uUGFuZWxJdGVtSGVpZ2h0IiwidGV4dFRydW5jYXRlIiwibWF4V2lkdGgiLCJvdmVyZmxvdyIsInRleHRPdmVyZmxvdyIsIndoaXRlU3BhY2UiLCJ3b3JkV3JhcCIsImlucHV0IiwiY3NzIiwicHJvcHMiLCJ0aGVtZSIsImFjdGl2ZSIsImRpc2FibGVkIiwidHlwZSIsImlucHV0TFQiLCJpbmNsdWRlcyIsInNlY29uZGFyeUlucHV0IiwiY2hpY2tsZXRlZElucHV0IiwiaW5saW5lSW5wdXQiLCJzd2l0Y2hUcmFjayIsImNoZWNrZWQiLCJzd2l0Y2hCdXR0b24iLCJpbnB1dFN3aXRjaCIsImNoZWNrYm94Qm94IiwiY2hlY2tib3hDaGVjayIsImlucHV0Q2hlY2tib3giLCJzZWNvbmRhcnlTd2l0Y2giLCJkcm9wZG93blNjcm9sbEJhciIsImRyb3Bkb3duTGlzdEFuY2hvciIsImRyb3Bkb3duTGlzdEl0ZW0iLCJkcm9wZG93bkxpc3RIZWFkZXIiLCJkcm9wZG93bkxpc3RTZWN0aW9uIiwiZHJvcGRvd25MaXN0Iiwic2lkZVBhbmVsU2Nyb2xsQmFyIiwicGFuZWxEcm9wZG93blNjcm9sbEJhciIsInNjcm9sbEJhciIsIm1vZGFsU2Nyb2xsQmFyIiwiRElNRU5TSU9OUyIsInRoZW1lTFQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFTyxJQUFNQSxVQUFVLEdBQUcsY0FBbkI7O0FBQ0EsSUFBTUMsY0FBYyxHQUFHLGNBQXZCOztBQUNBLElBQU1DLGNBQWMsR0FBRyxjQUF2Qjs7QUFFQSxJQUFNQyxTQUFTLEdBQUcsOEJBQWxCOztBQUNBLElBQU1DLFNBQVMsR0FBRyxZQUFsQjs7QUFDQSxJQUFNQyxZQUFZLEdBQUcsS0FBckI7O0FBQ0EsSUFBTUMsV0FBVyxHQUFHLFNBQXBCOztBQUNBLElBQU1DLGdCQUFnQixHQUFHLFNBQXpCLEMsQ0FFUDs7O0FBQ08sSUFBTUMsVUFBVSxHQUFHLFNBQW5COztBQUNBLElBQU1DLGVBQWUsR0FBRyxTQUF4Qjs7QUFDQSxJQUFNQyxZQUFZLEdBQUcsU0FBckI7O0FBRUEsSUFBTUMsU0FBUyxHQUFHLFNBQWxCOztBQUNBLElBQU1DLFdBQVcsR0FBRyxTQUFwQjs7QUFDQSxJQUFNQyxZQUFZLEdBQUcsU0FBckI7O0FBRUEsSUFBTUMsWUFBWSxHQUFHLFNBQXJCOztBQUNBLElBQU1DLGNBQWMsR0FBRyxTQUF2Qjs7QUFDQSxJQUFNQyxrQkFBa0IsR0FBRyxTQUEzQjs7QUFFQSxJQUFNQyxjQUFjLEdBQUcsU0FBdkI7O0FBQ0EsSUFBTUMsV0FBVyxHQUFHLFNBQXBCOztBQUNBLElBQU1DLGFBQWEsR0FBRyxTQUF0Qjs7QUFDQSxJQUFNQyxXQUFXLEdBQUcsU0FBcEI7O0FBQ0EsSUFBTUMsZ0JBQWdCLEdBQUcsU0FBekI7O0FBQ0EsSUFBTUMsVUFBVSxHQUFHLFNBQW5CLEMsQ0FFUDs7O0FBQ08sSUFBTUMsYUFBYSxHQUFHLFNBQXRCOztBQUNBLElBQU1DLGdCQUFnQixHQUFHLFNBQXpCOztBQUNBLElBQU1DLGVBQWUsR0FBRyxTQUF4Qjs7QUFDQSxJQUFNQyxrQkFBa0IsR0FBRyxTQUEzQjs7QUFDQSxJQUFNQyxrQkFBa0IsR0FBRyxTQUEzQjs7QUFDQSxJQUFNQyxnQkFBZ0IsR0FBRyxLQUF6Qjs7QUFFQSxJQUFNQyxlQUFlLEdBQUcsU0FBeEI7O0FBQ0EsSUFBTUMsa0JBQWtCLEdBQUcsU0FBM0I7O0FBQ0EsSUFBTUMsaUJBQWlCLEdBQUcsU0FBMUI7O0FBQ0EsSUFBTUMsb0JBQW9CLEdBQUcsU0FBN0I7O0FBQ0EsSUFBTUMsb0JBQW9CLEdBQUcsU0FBN0I7O0FBRUEsSUFBTUMsVUFBVSxHQUFHLGFBQW5COztBQUNBLElBQU1DLGFBQWEsR0FBR0QsVUFBdEI7O0FBQ0EsSUFBTUUsWUFBWSxHQUFHLFNBQXJCOztBQUNBLElBQU1DLGVBQWUsR0FBR2xCLGFBQXhCOztBQUNBLElBQU1tQixrQkFBa0IsR0FBR0osVUFBM0I7O0FBRUEsSUFBTUssY0FBYyxHQUFHakIsVUFBdkI7O0FBQ0EsSUFBTWtCLGlCQUFpQixHQUFHLFNBQTFCOztBQUNBLElBQU1DLG1CQUFtQixHQUFHLFNBQTVCOztBQUNBLElBQU1DLGdCQUFnQixHQUFHLFNBQXpCOztBQUNBLElBQU1DLG1CQUFtQixHQUFHLFNBQTVCLEMsQ0FFUDs7O0FBQ08sSUFBTUMsY0FBYyxHQUFHLE1BQXZCOztBQUNBLElBQU1DLFlBQVksR0FBRyxVQUFyQjs7QUFDQSxJQUFNQyxhQUFhLEdBQUcsTUFBdEI7O0FBQ0EsSUFBTUMsZUFBZSxHQUFHLEdBQXhCOztBQUNBLElBQU1DLFFBQVEsR0FBRyxTQUFqQjs7QUFDQSxJQUFNQyxhQUFhLEdBQUcsU0FBdEI7O0FBQ0EsSUFBTUMsY0FBYyxHQUFHLFNBQXZCOztBQUNBLElBQU1DLGdCQUFnQixHQUFHLFNBQXpCOztBQUNBLElBQU1DLHFCQUFxQixHQUFHLFNBQTlCOztBQUNBLElBQU1DLHNCQUFzQixHQUFHLFNBQS9COztBQUNBLElBQU1DLFVBQVUsR0FBRyxTQUFuQjs7QUFDQSxJQUFNQyxpQkFBaUIsR0FBRyxLQUExQjs7QUFDQSxJQUFNQyxxQkFBcUIsR0FBRyxTQUE5Qjs7QUFDQSxJQUFNQywwQkFBMEIsR0FBRyxHQUFuQzs7QUFFQSxJQUFNQyxvQkFBb0IsR0FBRyxNQUE3Qjs7QUFDQSxJQUFNQyxpQkFBaUIsR0FBRyxTQUExQjs7QUFDQSxJQUFNQyxzQkFBc0IsR0FBRyxTQUEvQjs7QUFDQSxJQUFNQyx1QkFBdUIsR0FBRyxTQUFoQzs7QUFDQSxJQUFNQyxtQkFBbUIsR0FBRyxTQUE1Qjs7QUFDQSxJQUFNQyx5QkFBeUIsR0FBRyxTQUFsQzs7QUFDQSxJQUFNQywrQkFBK0IsR0FBRyxTQUF4QyxDLENBRVA7OztBQUNPLElBQU1DLFdBQVcsR0FBR1gsVUFBcEI7O0FBQ0EsSUFBTVksYUFBYSxHQUFHckQsWUFBdEI7O0FBRUEsSUFBTXNELHVCQUF1QixHQUFHLFNBQWhDOztBQUNBLElBQU1DLGNBQWMsR0FBRyxNQUF2Qjs7QUFDQSxJQUFNQyxnQkFBZ0IsR0FBRyxLQUF6Qjs7QUFDQSxJQUFNQyxvQkFBb0IsR0FBRyxLQUE3Qjs7QUFFQSxJQUFNQyxzQkFBc0IsR0FBRyxTQUEvQjs7QUFDQSxJQUFNQyxnQkFBZ0IsR0FBR3hCLFFBQXpCOztBQUNBLElBQU15QixxQkFBcUIsR0FBR3hCLGFBQTlCOztBQUNBLElBQU15QixrQkFBa0IsR0FBRyxTQUEzQjs7QUFDQSxJQUFNQyx1QkFBdUIsR0FBRyxTQUFoQzs7QUFDQSxJQUFNQyxpQkFBaUIsR0FBRyxTQUExQjs7QUFDQSxJQUFNQyxtQkFBbUIsR0FBRyxTQUE1Qjs7QUFDQSxJQUFNQyxrQkFBa0IsR0FBRyxLQUEzQjs7QUFDQSxJQUFNQyxZQUFZLEdBQUcsQ0FBckI7O0FBRUEsSUFBTUMsdUJBQXVCLEdBQUcsU0FBaEM7O0FBQ0EsSUFBTUMsa0JBQWtCLEdBQUcsK0JBQTNCOztBQUNBLElBQU1DLGVBQWUsR0FBRyxTQUF4Qjs7QUFDQSxJQUFNQyxxQkFBcUIsR0FBRyxTQUE5QixDLENBRVA7OztBQUNPLElBQU1DLFdBQVcsR0FBRyxFQUFwQjs7QUFDQSxJQUFNQyxZQUFZLEdBQUcsRUFBckI7O0FBQ0EsSUFBTUMsaUJBQWlCLEdBQUcsRUFBMUI7O0FBRUEsSUFBTUMsY0FBYyxHQUFHLFNBQXZCOztBQUNBLElBQU1DLG9CQUFvQixHQUFHcEUsV0FBN0I7O0FBQ0EsSUFBTXFFLHVCQUF1QixHQUFHLEtBQWhDOztBQUNBLElBQU1DLFlBQVksR0FBRyxTQUFyQjs7QUFDQSxJQUFNQyxrQkFBa0IsR0FBRyxTQUEzQjs7QUFDQSxJQUFNQyxrQkFBa0IsR0FBRyw4QkFBM0I7O0FBQ0EsSUFBTUMscUJBQXFCLEdBQUcsS0FBOUI7O0FBQ0EsSUFBTUMsY0FBYyxHQUFHLE1BQXZCOztBQUNBLElBQU1DLGVBQWUsR0FBRyxNQUF4Qjs7QUFFQSxJQUFNQyx1QkFBdUIsR0FBRyxTQUFoQzs7QUFDQSxJQUFNQyxxQkFBcUIsR0FBRyxTQUE5QixDLENBRVA7OztBQUNPLElBQU1DLGFBQWEsR0FBRyxFQUF0Qjs7QUFDQSxJQUFNQyxjQUFjLEdBQUcsRUFBdkI7O0FBQ0EsSUFBTUMsY0FBYyxHQUFHLEVBQXZCOztBQUNBLElBQU1DLG1CQUFtQixHQUFHekIsaUJBQTVCOztBQUNBLElBQU0wQixvQkFBb0IsR0FBRyxLQUE3Qjs7QUFDQSxJQUFNQyxxQkFBcUIsR0FBRzFCLG1CQUE5Qjs7QUFDQSxJQUFNMkIsY0FBYyxHQUFHLE9BQXZCOztBQUNBLElBQU1DLHFCQUFxQixHQUFHbEYsYUFBOUIsQyxDQUVQOzs7QUFDTyxJQUFNbUYsaUJBQWlCLEdBQUcsU0FBMUI7O0FBQ0EsSUFBTUMsV0FBVyxHQUFHLFNBQXBCOztBQUNBLElBQU1DLGtCQUFrQixHQUFHL0UsZUFBM0I7O0FBQ0EsSUFBTWdGLG9CQUFvQixHQUFHLFNBQTdCOztBQUNBLElBQU1DLHVCQUF1QixHQUFHaEYsa0JBQWhDOztBQUVBLElBQU1pRixlQUFlLEdBQUcsU0FBeEI7O0FBQ0EsSUFBTUMsb0JBQW9CLEdBQUcsU0FBN0I7O0FBQ0EsSUFBTUMsYUFBYSxHQUFHLFNBQXRCOztBQUNBLElBQU1DLGVBQWUsR0FBRyxTQUF4Qjs7QUFDQSxJQUFNQyxlQUFlLEdBQUcsU0FBeEI7O0FBQ0EsSUFBTUMscUJBQXFCLEdBQUcsU0FBOUI7O0FBQ0EsSUFBTUMsaUJBQWlCLEdBQUcsRUFBMUI7O0FBQ0EsSUFBTUMsY0FBYyxHQUFHLCtCQUF2Qjs7QUFDQSxJQUFNQyxpQkFBaUIsR0FBRyxLQUExQjs7QUFDQSxJQUFNQyxpQkFBaUIsR0FBRyxTQUExQjs7QUFFQSxJQUFNQyxnQkFBZ0IsR0FBRyxTQUF6Qjs7QUFDQSxJQUFNQyxXQUFXLHVCQUFnQnBILFdBQWhCLENBQWpCOztBQUNBLElBQU1xSCxhQUFhLHVCQUFnQnBILGdCQUFoQixDQUFuQjs7QUFFQSxJQUFNcUgsdUJBQXVCLEdBQUcsU0FBaEM7O0FBQ0EsSUFBTUMsNkJBQTZCLEdBQUcsU0FBdEM7O0FBQ0EsSUFBTUMsU0FBUyxHQUFHLFNBQWxCOztBQUNBLElBQU1DLFlBQVksR0FBRyxTQUFyQixDLENBRVA7OztBQUNPLElBQU1DLGVBQWUsR0FBRyxTQUF4Qjs7QUFDQSxJQUFNQyxrQkFBa0IsR0FBRyxNQUEzQjs7QUFDQSxJQUFNQyxjQUFjLEdBQUcsU0FBdkI7O0FBQ0EsSUFBTUMscUJBQXFCLEdBQUcsU0FBOUIsQyxDQUVQOzs7QUFDTyxJQUFNQyxjQUFjLEdBQUcsU0FBdkI7O0FBQ0EsSUFBTUMsZ0JBQWdCLEdBQUduSCxXQUF6QixDLENBRVA7OztBQUNPLElBQU1vSCxjQUFjLEdBQUcsU0FBdkI7O0FBQ0EsSUFBTUMsWUFBWSxHQUFHLFNBQXJCOztBQUNBLElBQU1DLG1CQUFtQixHQUFHLFNBQTVCOztBQUNBLElBQU1DLGVBQWUsR0FBRyxLQUF4Qjs7QUFDQSxJQUFNQyxlQUFlLEdBQUcsS0FBeEI7O0FBQ0EsSUFBTUMsa0JBQWtCLEdBQUcsTUFBM0I7O0FBQ0EsSUFBTUMsaUJBQWlCLEdBQUcsTUFBMUI7O0FBQ0EsSUFBTUMsaUJBQWlCLEdBQUcsU0FBMUI7O0FBQ0EsSUFBTUMsc0JBQXNCLEdBQUcsU0FBL0I7O0FBQ0EsSUFBTUMsa0JBQWtCLEdBQUcsOEJBQTNCOztBQUNBLElBQU1DLGlCQUFpQixHQUFHLEVBQTFCOztBQUNBLElBQU1DLGdCQUFnQixHQUFHLEVBQXpCLEMsQ0FFUDs7O0FBQ08sSUFBTUMsYUFBYSxHQUFHLFNBQXRCLEMsQ0FFUDs7O0FBQ08sSUFBTUMsa0JBQWtCLEdBQUc7QUFDaENDLEVBQUFBLElBQUksRUFBRSxTQUQwQjtBQUVoQ0MsRUFBQUEsS0FBSyxFQUFFLFNBRnlCO0FBR2hDQyxFQUFBQSxPQUFPLEVBQUUsU0FIdUI7QUFJaENDLEVBQUFBLE9BQU8sRUFBRTtBQUp1QixDQUEzQjs7QUFPQSxJQUFNQyxzQkFBc0IsR0FBRyxHQUEvQjs7QUFDQSxJQUFNQywwQkFBMEIsR0FBR0Qsc0JBQXNCLEdBQUcsRUFBNUQ7O0FBQ0EsSUFBTUUsMkJBQTJCLEdBQUcsRUFBcEM7O0FBRUEsSUFBTUMsWUFBWSxHQUFHO0FBQzFCQyxFQUFBQSxRQUFRLEVBQUUsTUFEZ0I7QUFFMUJDLEVBQUFBLFFBQVEsRUFBRSxRQUZnQjtBQUcxQkMsRUFBQUEsWUFBWSxFQUFFLFVBSFk7QUFJMUJDLEVBQUFBLFVBQVUsRUFBRSxRQUpjO0FBSzFCQyxFQUFBQSxRQUFRLEVBQUU7QUFMZ0IsQ0FBckIsQyxDQVFQO0FBQ0E7QUFDQTs7O0FBRUEsSUFBTUMsS0FBSyxPQUFHQyxxQkFBSCxxQkFFVyxVQUFBQyxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlwSCxRQUFoQjtBQUFBLENBRmhCLEVBSUwsVUFBQW1ILEtBQUs7QUFBQSxTQUNMQSxLQUFLLENBQUNFLE1BQU4sR0FDSUYsS0FBSyxDQUFDQyxLQUFOLENBQVkvRyxzQkFEaEIsR0FFSThHLEtBQUssQ0FBQ2QsS0FBTixHQUFjYyxLQUFLLENBQUNDLEtBQU4sQ0FBWTlJLFVBQTFCLEdBQXVDNkksS0FBSyxDQUFDQyxLQUFOLENBQVlwSCxRQUhsRDtBQUFBLENBSkEsRUFTTSxVQUFBbUgsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZL0csc0JBQWhCO0FBQUEsQ0FUWCxFQVVBLFVBQUE4RyxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVk5RyxVQUFoQjtBQUFBLENBVkwsRUFZSSxVQUFBNkcsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZdEgsYUFBaEI7QUFBQSxDQVpULEVBYU0sVUFBQXFILEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWXJILGVBQWhCO0FBQUEsQ0FiWCxFQWNDLFVBQUFvSCxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVl4SCxjQUFoQjtBQUFBLENBZE4sRUFrQkUsVUFBQXVILEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWXZILFlBQWhCO0FBQUEsQ0FsQlAsRUFvQkssVUFBQXNILEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWXBLLFVBQWhCO0FBQUEsQ0FwQlYsRUF3QlMsVUFBQW1LLEtBQUs7QUFBQSxTQUFLQSxLQUFLLENBQUNHLFFBQU4sR0FBaUIsTUFBakIsR0FBMEIsS0FBL0I7QUFBQSxDQXhCZCxFQXlCRSxVQUFBSCxLQUFLO0FBQUEsU0FBS0EsS0FBSyxDQUFDRyxRQUFOLEdBQWlCLEdBQWpCLEdBQXVCLENBQTVCO0FBQUEsQ0F6QlAsRUE0QkcsVUFBQUgsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0ksSUFBTixLQUFlLFFBQWYsR0FBMEIsTUFBMUIsR0FBbUMsU0FBdkM7QUFBQSxDQTVCUixFQTZCYSxVQUFBSixLQUFLO0FBQUEsU0FDdkJBLEtBQUssQ0FBQ0UsTUFBTixHQUFlRixLQUFLLENBQUNDLEtBQU4sQ0FBWWxILGNBQTNCLEdBQTRDaUgsS0FBSyxDQUFDQyxLQUFOLENBQVluSCxhQURqQztBQUFBLENBN0JsQixFQStCUyxVQUFBa0gsS0FBSztBQUFBLFNBQ25CQSxLQUFLLENBQUNFLE1BQU4sR0FDSUYsS0FBSyxDQUFDQyxLQUFOLENBQVkvRyxzQkFEaEIsR0FFSThHLEtBQUssQ0FBQ0MsS0FBTixDQUFZaEgscUJBSEc7QUFBQSxDQS9CZCxFQXlDYSxVQUFBK0csS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZbEgsY0FBaEI7QUFBQSxDQXpDbEIsRUEwQ1MsVUFBQWlILEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWS9HLHNCQUFoQjtBQUFBLENBMUNkLEVBOENFLFVBQUE4RyxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVk1RyxxQkFBaEI7QUFBQSxDQTlDUCxFQStDUSxVQUFBMkcsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZM0csMEJBQWhCO0FBQUEsQ0EvQ2IsQ0FBWDtBQTBEQSxJQUFNK0csT0FBTyxPQUFHTixxQkFBSCxzQkFDVEQsS0FEUyxFQUdTLFVBQUFFLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWTFGLGtCQUFoQjtBQUFBLENBSGQsRUFLVCxVQUFBeUYsS0FBSztBQUFBLFNBQ0xBLEtBQUssQ0FBQ0UsTUFBTixHQUNJRixLQUFLLENBQUNDLEtBQU4sQ0FBWWpHLHVCQURoQixHQUVJZ0csS0FBSyxDQUFDZCxLQUFOLEdBQ0FjLEtBQUssQ0FBQ0MsS0FBTixDQUFZOUksVUFEWixHQUVBNkksS0FBSyxDQUFDQyxLQUFOLENBQVl2RixtQkFMWDtBQUFBLENBTEksRUFXRixVQUFBc0YsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZbEcsYUFBaEI7QUFBQSxDQVhILEVBWUksVUFBQWlHLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWWxHLGFBQWhCO0FBQUEsQ0FaVCxFQWVBLFVBQUFpRyxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlySixjQUFoQjtBQUFBLENBZkwsRUF1QlcsVUFBQW9KLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWTFGLGtCQUFoQjtBQUFBLENBdkJoQixFQXdCTyxVQUFBeUYsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZeEosV0FBaEI7QUFBQSxDQXhCWixFQTRCVyxVQUFBdUosS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZMUYsa0JBQWhCO0FBQUEsQ0E1QmhCLEVBNkJDLFVBQUF5RixLQUFLO0FBQUEsU0FBSSxDQUFDLFFBQUQsRUFBVyxNQUFYLEVBQW1CTSxRQUFuQixDQUE0Qk4sS0FBSyxDQUFDSSxJQUFsQyxJQUEwQyxNQUExQyxHQUFtRCxTQUF2RDtBQUFBLENBN0JOLEVBOEJPLFVBQUFKLEtBQUs7QUFBQSxTQUNyQkEsS0FBSyxDQUFDRSxNQUFOLEdBQ0lGLEtBQUssQ0FBQ0MsS0FBTixDQUFZeEosV0FEaEIsR0FFSXVKLEtBQUssQ0FBQ0MsS0FBTixDQUFZdEosWUFISztBQUFBLENBOUJaLENBQWI7QUFxQ0EsSUFBTTRKLGNBQWMsT0FBR1IscUJBQUgsc0JBQ2hCLFVBQUFDLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUgsS0FBaEI7QUFBQSxDQURXLEVBRVQsVUFBQUUsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZdEcsbUJBQWhCO0FBQUEsQ0FGSSxFQUdFLFVBQUFxRyxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVl6RyxpQkFBaEI7QUFBQSxDQUhQLEVBSVIsVUFBQXdHLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWTFHLG9CQUFoQjtBQUFBLENBSkcsRUFNZCxVQUFBeUcsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ2QsS0FBTixHQUNIYyxLQUFLLENBQUNDLEtBQU4sQ0FBWTlJLFVBRFQsR0FFSDZJLEtBQUssQ0FBQ0MsS0FBTixDQUFZckcseUJBRmI7QUFBQSxDQU5TLEVBWUksVUFBQW9HLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWXhHLHNCQUFoQjtBQUFBLENBWlQsRUFhQSxVQUFBdUcsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZeEcsc0JBQWhCO0FBQUEsQ0FiTCxFQWtCSSxVQUFBdUcsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZdkcsdUJBQWhCO0FBQUEsQ0FsQlQsRUFtQkEsVUFBQXNHLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWXBHLCtCQUFoQjtBQUFBLENBbkJMLENBQXBCO0FBdUJBLElBQU0yRyxlQUFlLE9BQUdULHFCQUFILHNCQUNqQixVQUFBQyxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlNLGNBQWhCO0FBQUEsQ0FEWSxDQUFyQjtBQVdBLElBQU1FLFdBQVcsT0FBR1YscUJBQUgsc0JBQ2IsVUFBQUMsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZSCxLQUFoQjtBQUFBLENBRFEsRUFDd0IsVUFBQUUsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZekosU0FBaEI7QUFBQSxDQUQ3QixFQWdCTyxVQUFBd0osS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZNUosVUFBaEI7QUFBQSxDQWhCWixFQXVCTyxVQUFBMkosS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZL0csc0JBQWhCO0FBQUEsQ0F2QlosQ0FBakI7QUEyQkEsSUFBTXdILFdBQVcsT0FBR1gscUJBQUgsc0JBQ0QsVUFBQUMsS0FBSztBQUFBLFNBQ2pCQSxLQUFLLENBQUNXLE9BQU4sR0FDSVgsS0FBSyxDQUFDQyxLQUFOLENBQVk1RSxvQkFEaEIsR0FFSTJFLEtBQUssQ0FBQ0MsS0FBTixDQUFZN0UsY0FIQztBQUFBLENBREosRUFPUCxVQUFBNEUsS0FBSztBQUFBLFNBQUksQ0FBQ0EsS0FBSyxDQUFDQyxLQUFOLENBQVk5RSxpQkFBakI7QUFBQSxDQVBFLEVBVU4sVUFBQTZFLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWWhGLFdBQWhCO0FBQUEsQ0FWQyxFQVdMLFVBQUErRSxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVkvRSxZQUFoQjtBQUFBLENBWEEsRUFZRSxVQUFBOEUsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZM0UsdUJBQWhCO0FBQUEsQ0FaUCxDQUFqQjtBQWVBLElBQU1zRixZQUFZLE9BQUdiLHFCQUFILHNCQUNGLFVBQUFDLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWXBLLFVBQWhCO0FBQUEsQ0FESCxFQUlSLFVBQUFtSyxLQUFLO0FBQUEsU0FBSSxDQUFDQSxLQUFLLENBQUNXLE9BQU4sR0FBZ0JYLEtBQUssQ0FBQ0MsS0FBTixDQUFZaEYsV0FBWixHQUEwQixDQUExQyxHQUE4QyxDQUFDLENBQWhELElBQXFEK0UsS0FBSyxDQUFDQyxLQUFOLENBQVk5RSxpQkFBckU7QUFBQSxDQUpHLEVBT04sVUFBQTZFLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWXJFLGVBQWhCO0FBQUEsQ0FQQyxFQVFQLFVBQUFvRSxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVl0RSxjQUFoQjtBQUFBLENBUkUsRUFTRixVQUFBcUUsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ1csT0FBTixHQUN2QlgsS0FBSyxDQUFDQyxLQUFOLENBQVl6RSxrQkFEVyxHQUNVd0UsS0FBSyxDQUFDQyxLQUFOLENBQVkxRSxZQUQxQjtBQUFBLENBVEgsRUFXRixVQUFBeUUsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZeEUsa0JBQWhCO0FBQUEsQ0FYSCxDQUFsQjtBQWNBLElBQU1vRixXQUFXLE9BQUdkLHFCQUFILHNCQU1OLFVBQUFDLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWTVKLFVBQWhCO0FBQUEsQ0FOQyxFQVNBLFVBQUEySixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVkvRSxZQUFaLEdBQTJCLENBQS9CO0FBQUEsQ0FUTCxFQVlDLFVBQUE4RSxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVloRixXQUFoQjtBQUFBLENBWk4sRUFlWCxVQUFBK0UsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZUyxXQUFoQjtBQUFBLENBZk0sRUFtQlgsVUFBQVYsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZVyxZQUFoQjtBQUFBLENBbkJNLENBQWpCLEMsQ0F1QkE7O0FBQ0EsSUFBTUUsV0FBVyxPQUFHZixxQkFBSCxzQkFLTixVQUFBQyxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlsRSxhQUFoQjtBQUFBLENBTEMsRUFNTCxVQUFBaUUsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZakUsY0FBaEI7QUFBQSxDQU5BLEVBT0QsVUFBQWdFLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNXLE9BQU4sR0FBZ0JYLEtBQUssQ0FBQ0MsS0FBTixDQUFZM0QscUJBQTVCLEdBQW9EMEQsS0FBSyxDQUFDQyxLQUFOLENBQVk1RCxjQUFwRTtBQUFBLENBUEosRUFRSyxVQUFBMkQsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ1csT0FBTixHQUFnQlgsS0FBSyxDQUFDQyxLQUFOLENBQVkzRCxxQkFBNUIsR0FBb0QwRCxLQUFLLENBQUNDLEtBQU4sQ0FBWS9ELG1CQUFwRTtBQUFBLENBUlYsQ0FBakI7QUFhQSxJQUFNNkUsYUFBYSxPQUFHaEIscUJBQUgsdUJBVU4sVUFBQUMsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ1csT0FBTixHQUFnQixDQUFoQixHQUFvQixDQUF4QjtBQUFBLENBVkMsQ0FBbkI7QUFjQSxJQUFNSyxhQUFhLE9BQUdqQixxQkFBSCx1QkFTUixVQUFBQyxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVk1SixVQUFoQjtBQUFBLENBVEcsRUFVRCxVQUFBMkosS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZOUUsaUJBQWhCO0FBQUEsQ0FWSixFQWFaLFVBQUE2RSxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlhLFdBQWhCO0FBQUEsQ0FiTyxFQWlCYixVQUFBZCxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVljLGFBQWhCO0FBQUEsQ0FqQlEsQ0FBbkI7QUFxQkEsSUFBTUUsZUFBZSxPQUFHbEIscUJBQUgsdUJBQ2pCLFVBQUFDLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWVksV0FBaEI7QUFBQSxDQURZLEVBR2YsVUFBQWIsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZUyxXQUFoQjtBQUFBLENBSFUsRUFHaUMsVUFBQVYsS0FBSztBQUFBLFNBQ25EQSxLQUFLLENBQUNXLE9BQU4sR0FDSVgsS0FBSyxDQUFDQyxLQUFOLENBQVk1RSxvQkFEaEIsR0FFSTJFLEtBQUssQ0FBQ0MsS0FBTixDQUFZcEUsdUJBSG1DO0FBQUEsQ0FIdEMsRUFVZixVQUFBbUUsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZVyxZQUFoQjtBQUFBLENBVlUsRUFXSCxVQUFBWixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDVyxPQUFOLEdBQ2ZYLEtBQUssQ0FBQ0MsS0FBTixDQUFZekUsa0JBREcsR0FFZndFLEtBQUssQ0FBQ0MsS0FBTixDQUFZbkUscUJBRkQ7QUFBQSxDQVhGLENBQXJCO0FBaUJBLElBQU1vRixpQkFBaUIsT0FBR25CLHFCQUFILHVCQU9MLFVBQUFDLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWWxGLGVBQWhCO0FBQUEsQ0FQQSxFQVdMLFVBQUFpRixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlsRixlQUFoQjtBQUFBLENBWEEsRUFnQkwsVUFBQWlGLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWTVKLFVBQWhCO0FBQUEsQ0FoQkEsRUFpQkMsVUFBQTJKLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWWxGLGVBQWhCO0FBQUEsQ0FqQk4sRUFxQkwsVUFBQWlGLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWWxKLFdBQWhCO0FBQUEsQ0FyQkEsQ0FBdkI7QUEwQkEsSUFBTW9LLGtCQUFrQixPQUFHcEIscUJBQUgsdUJBQ2IsVUFBQUMsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZbkcsV0FBaEI7QUFBQSxDQURRLENBQXhCO0FBS0EsSUFBTXNILGdCQUFnQixPQUFHckIscUJBQUgsdUJBUUUsVUFBQUMsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZcEYsdUJBQWhCO0FBQUEsQ0FSUCxFQVdQLFVBQUFtRixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlsSixXQUFoQjtBQUFBLENBWEUsQ0FBdEI7QUFnQkEsSUFBTXNLLGtCQUFrQixPQUFHdEIscUJBQUgsdUJBR2IsVUFBQUMsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZNUosVUFBaEI7QUFBQSxDQUhRLENBQXhCO0FBTUEsSUFBTWlMLG1CQUFtQixPQUFHdkIscUJBQUgsdUJBR0ksVUFBQUMsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZNUosVUFBaEI7QUFBQSxDQUhULENBQXpCO0FBTUEsSUFBTWtMLFlBQVksT0FBR3hCLHFCQUFILHVCQUdGLFVBQUFDLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWW5GLGtCQUFoQjtBQUFBLENBSEgsRUFPWixVQUFBa0YsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZcUIsbUJBQWhCO0FBQUEsQ0FQTyxFQVVaLFVBQUF0QixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlvQixrQkFBaEI7QUFBQSxDQVZPLEVBY1osVUFBQXJCLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWW1CLGdCQUFoQjtBQUFBLENBZE8sRUFrQlosVUFBQXBCLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWWtCLGtCQUFoQjtBQUFBLENBbEJPLEVBcUJkLFVBQUFuQixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlpQixpQkFBaEI7QUFBQSxDQXJCUyxDQUFsQjtBQXdCQSxJQUFNTSxrQkFBa0IsT0FBR3pCLHFCQUFILHVCQU9OLFVBQUFDLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWXpELFdBQWhCO0FBQUEsQ0FQQyxFQVdOLFVBQUF3RCxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVl6RCxXQUFoQjtBQUFBLENBWEMsRUFnQk4sVUFBQXdELEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWXBELG9CQUFoQjtBQUFBLENBaEJDLEVBaUJBLFVBQUFtRCxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVl6RCxXQUFoQjtBQUFBLENBakJMLEVBb0JKLFVBQUF3RCxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVk1SixVQUFoQjtBQUFBLENBcEJELENBQXhCO0FBMEJBLElBQU1vTCxzQkFBc0IsT0FBRzFCLHFCQUFILHVCQU9WLFVBQUFDLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWXJELGVBQWhCO0FBQUEsQ0FQSyxFQVdWLFVBQUFvRCxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlyRCxlQUFoQjtBQUFBLENBWEssRUFnQlYsVUFBQW9ELEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWXBELG9CQUFoQjtBQUFBLENBaEJLLEVBaUJKLFVBQUFtRCxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlyRCxlQUFoQjtBQUFBLENBakJELEVBbUJSLFVBQUFvRCxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVk1SixVQUFoQjtBQUFBLENBbkJHLENBQTVCO0FBeUJBLElBQU1xTCxTQUFTLE9BQUczQixxQkFBSCx1QkFPRyxVQUFBQyxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlyRCxlQUFoQjtBQUFBLENBUFIsRUFXRyxVQUFBb0QsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZckQsZUFBaEI7QUFBQSxDQVhSLEVBZ0JHLFVBQUFvRCxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVk1SixVQUFoQjtBQUFBLENBaEJSLEVBaUJTLFVBQUEySixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlyRCxlQUFoQjtBQUFBLENBakJkLEVBb0JLLFVBQUFvRCxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlsSixXQUFoQjtBQUFBLENBcEJWLEVBeUJLLFVBQUFpSixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlsSixXQUFoQjtBQUFBLENBekJWLENBQWY7QUErQk8sSUFBTTRLLGNBQWMsT0FBRzVCLHFCQUFILHVCQVVULFVBQUFDLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWWxKLFdBQWhCO0FBQUEsQ0FWSSxFQWFULFVBQUFpSixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVkxSixZQUFoQjtBQUFBLENBYkksRUFrQlQsVUFBQXlKLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWWxKLFdBQWhCO0FBQUEsQ0FsQkksRUErQkgsVUFBQWlKLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWWxKLFdBQWhCO0FBQUEsQ0EvQkYsQ0FBcEI7O0FBbUNBLElBQU1rSixLQUFLLG1DQUNiMkIsMkJBRGE7QUFFaEI7QUFDQTlCLEVBQUFBLEtBQUssRUFBTEEsS0FIZ0I7QUFJaEJPLEVBQUFBLE9BQU8sRUFBUEEsT0FKZ0I7QUFLaEJJLEVBQUFBLFdBQVcsRUFBWEEsV0FMZ0I7QUFNaEJELEVBQUFBLGVBQWUsRUFBZkEsZUFOZ0I7QUFPaEJELEVBQUFBLGNBQWMsRUFBZEEsY0FQZ0I7QUFRaEJXLEVBQUFBLGlCQUFpQixFQUFqQkEsaUJBUmdCO0FBU2hCSyxFQUFBQSxZQUFZLEVBQVpBLFlBVGdCO0FBVWhCSCxFQUFBQSxnQkFBZ0IsRUFBaEJBLGdCQVZnQjtBQVdoQkQsRUFBQUEsa0JBQWtCLEVBQWxCQSxrQkFYZ0I7QUFZaEJFLEVBQUFBLGtCQUFrQixFQUFsQkEsa0JBWmdCO0FBYWhCQyxFQUFBQSxtQkFBbUIsRUFBbkJBLG1CQWJnQjtBQWNoQnhHLEVBQUFBLGtCQUFrQixFQUFsQkEsa0JBZGdCO0FBZWhCNkcsRUFBQUEsY0FBYyxFQUFkQSxjQWZnQjtBQWdCaEJELEVBQUFBLFNBQVMsRUFBVEEsU0FoQmdCO0FBaUJoQkYsRUFBQUEsa0JBQWtCLEVBQWxCQSxrQkFqQmdCO0FBa0JoQlgsRUFBQUEsV0FBVyxFQUFYQSxXQWxCZ0I7QUFtQmhCSSxFQUFBQSxlQUFlLEVBQWZBLGVBbkJnQjtBQW9CaEJQLEVBQUFBLFdBQVcsRUFBWEEsV0FwQmdCO0FBcUJoQkUsRUFBQUEsWUFBWSxFQUFaQSxZQXJCZ0I7QUFzQmhCSSxFQUFBQSxhQUFhLEVBQWJBLGFBdEJnQjtBQXVCaEJGLEVBQUFBLFdBQVcsRUFBWEEsV0F2QmdCO0FBd0JoQkMsRUFBQUEsYUFBYSxFQUFiQSxhQXhCZ0I7QUEwQmhCO0FBQ0FsTCxFQUFBQSxVQUFVLEVBQVZBLFVBM0JnQjtBQTRCaEJDLEVBQUFBLGNBQWMsRUFBZEEsY0E1QmdCO0FBNkJoQkMsRUFBQUEsY0FBYyxFQUFkQSxjQTdCZ0I7QUErQmhCO0FBQ0FrQixFQUFBQSxXQUFXLEVBQVhBLFdBaENnQjtBQWlDaEJDLEVBQUFBLGdCQUFnQixFQUFoQkEsZ0JBakNnQjtBQWtDaEJoQixFQUFBQSxZQUFZLEVBQVpBLFlBbENnQjtBQW1DaEJGLEVBQUFBLFNBQVMsRUFBVEEsU0FuQ2dCO0FBb0NoQm1CLEVBQUFBLFVBQVUsRUFBVkEsVUFwQ2dCO0FBcUNoQjBELEVBQUFBLHVCQUF1QixFQUF2QkEsdUJBckNnQjtBQXNDaEJFLEVBQUFBLGVBQWUsRUFBZkEsZUF0Q2dCO0FBdUNoQkMsRUFBQUEscUJBQXFCLEVBQXJCQSxxQkF2Q2dCO0FBeUNoQjNFLEVBQUFBLFVBQVUsRUFBVkEsVUF6Q2dCO0FBMENoQkUsRUFBQUEsWUFBWSxFQUFaQSxZQTFDZ0I7QUEyQ2hCRCxFQUFBQSxlQUFlLEVBQWZBLGVBM0NnQjtBQTRDaEJtSCxFQUFBQSx1QkFBdUIsRUFBdkJBLHVCQTVDZ0I7QUE2Q2hCQyxFQUFBQSw2QkFBNkIsRUFBN0JBLDZCQTdDZ0I7QUErQ2hCO0FBQ0ExRCxFQUFBQSx1QkFBdUIsRUFBdkJBLHVCQWhEZ0I7QUFpRGhCSyxFQUFBQSxnQkFBZ0IsRUFBaEJBLGdCQWpEZ0I7QUFrRGhCRSxFQUFBQSxrQkFBa0IsRUFBbEJBLGtCQWxEZ0I7QUFtRGhCRCxFQUFBQSxxQkFBcUIsRUFBckJBLHFCQW5EZ0I7QUFvRGhCRSxFQUFBQSx1QkFBdUIsRUFBdkJBLHVCQXBEZ0I7QUFxRGhCSSxFQUFBQSxZQUFZLEVBQVpBLFlBckRnQjtBQXNEaEJILEVBQUFBLGlCQUFpQixFQUFqQkEsaUJBdERnQjtBQXVEaEJFLEVBQUFBLGtCQUFrQixFQUFsQkEsa0JBdkRnQjtBQXdEaEJELEVBQUFBLG1CQUFtQixFQUFuQkEsbUJBeERnQjtBQXlEaEJaLEVBQUFBLFdBQVcsRUFBWEEsV0F6RGdCO0FBMERoQk0sRUFBQUEsc0JBQXNCLEVBQXRCQSxzQkExRGdCO0FBMkRoQkgsRUFBQUEsY0FBYyxFQUFkQSxjQTNEZ0I7QUE0RGhCQyxFQUFBQSxnQkFBZ0IsRUFBaEJBLGdCQTVEZ0I7QUE2RGhCSCxFQUFBQSxhQUFhLEVBQWJBLGFBN0RnQjtBQStEaEI7QUFDQWxCLEVBQUFBLFFBQVEsRUFBUkEsUUFoRWdCO0FBaUVoQkMsRUFBQUEsYUFBYSxFQUFiQSxhQWpFZ0I7QUFrRWhCQyxFQUFBQSxjQUFjLEVBQWRBLGNBbEVnQjtBQW1FaEJOLEVBQUFBLGNBQWMsRUFBZEEsY0FuRWdCO0FBb0VoQk8sRUFBQUEsZ0JBQWdCLEVBQWhCQSxnQkFwRWdCO0FBcUVoQkUsRUFBQUEsc0JBQXNCLEVBQXRCQSxzQkFyRWdCO0FBc0VoQkQsRUFBQUEscUJBQXFCLEVBQXJCQSxxQkF0RWdCO0FBdUVoQkcsRUFBQUEsaUJBQWlCLEVBQWpCQSxpQkF2RWdCO0FBd0VoQkQsRUFBQUEsVUFBVSxFQUFWQSxVQXhFZ0I7QUF5RWhCVCxFQUFBQSxZQUFZLEVBQVpBLFlBekVnQjtBQTBFaEJDLEVBQUFBLGFBQWEsRUFBYkEsYUExRWdCO0FBMkVoQkMsRUFBQUEsZUFBZSxFQUFmQSxlQTNFZ0I7QUE0RWhCUyxFQUFBQSxxQkFBcUIsRUFBckJBLHFCQTVFZ0I7QUE2RWhCQyxFQUFBQSwwQkFBMEIsRUFBMUJBLDBCQTdFZ0I7QUErRWhCRSxFQUFBQSxpQkFBaUIsRUFBakJBLGlCQS9FZ0I7QUFnRmhCQyxFQUFBQSxzQkFBc0IsRUFBdEJBLHNCQWhGZ0I7QUFpRmhCQyxFQUFBQSx1QkFBdUIsRUFBdkJBLHVCQWpGZ0I7QUFrRmhCSCxFQUFBQSxvQkFBb0IsRUFBcEJBLG9CQWxGZ0I7QUFtRmhCSSxFQUFBQSxtQkFBbUIsRUFBbkJBLG1CQW5GZ0I7QUFvRmhCQyxFQUFBQSx5QkFBeUIsRUFBekJBLHlCQXBGZ0I7QUFxRmhCQyxFQUFBQSwrQkFBK0IsRUFBL0JBLCtCQXJGZ0I7QUF1RmhCO0FBQ0FvQixFQUFBQSxXQUFXLEVBQVhBLFdBeEZnQjtBQXlGaEJDLEVBQUFBLFlBQVksRUFBWkEsWUF6RmdCO0FBMEZoQkUsRUFBQUEsY0FBYyxFQUFkQSxjQTFGZ0I7QUEyRmhCQyxFQUFBQSxvQkFBb0IsRUFBcEJBLG9CQTNGZ0I7QUE0RmhCQyxFQUFBQSx1QkFBdUIsRUFBdkJBLHVCQTVGZ0I7QUE2RmhCQyxFQUFBQSxZQUFZLEVBQVpBLFlBN0ZnQjtBQThGaEJDLEVBQUFBLGtCQUFrQixFQUFsQkEsa0JBOUZnQjtBQStGaEJDLEVBQUFBLGtCQUFrQixFQUFsQkEsa0JBL0ZnQjtBQWdHaEJDLEVBQUFBLHFCQUFxQixFQUFyQkEscUJBaEdnQjtBQWlHaEJDLEVBQUFBLGNBQWMsRUFBZEEsY0FqR2dCO0FBa0doQkMsRUFBQUEsZUFBZSxFQUFmQSxlQWxHZ0I7QUFtR2hCVCxFQUFBQSxpQkFBaUIsRUFBakJBLGlCQW5HZ0I7QUFxR2hCVSxFQUFBQSx1QkFBdUIsRUFBdkJBLHVCQXJHZ0I7QUFzR2hCQyxFQUFBQSxxQkFBcUIsRUFBckJBLHFCQXRHZ0I7QUF3R2hCO0FBQ0FDLEVBQUFBLGFBQWEsRUFBYkEsYUF6R2dCO0FBMEdoQkMsRUFBQUEsY0FBYyxFQUFkQSxjQTFHZ0I7QUEyR2hCQyxFQUFBQSxjQUFjLEVBQWRBLGNBM0dnQjtBQTRHaEJDLEVBQUFBLG1CQUFtQixFQUFuQkEsbUJBNUdnQjtBQTZHaEJDLEVBQUFBLG9CQUFvQixFQUFwQkEsb0JBN0dnQjtBQThHaEJDLEVBQUFBLHFCQUFxQixFQUFyQkEscUJBOUdnQjtBQStHaEJDLEVBQUFBLGNBQWMsRUFBZEEsY0EvR2dCO0FBZ0hoQkMsRUFBQUEscUJBQXFCLEVBQXJCQSxxQkFoSGdCO0FBa0hoQjtBQUNBbEYsRUFBQUEsYUFBYSxFQUFiQSxhQW5IZ0I7QUFvSGhCQyxFQUFBQSxnQkFBZ0IsRUFBaEJBLGdCQXBIZ0I7QUFxSGhCQyxFQUFBQSxlQUFlLEVBQWZBLGVBckhnQjtBQXNIaEJDLEVBQUFBLGtCQUFrQixFQUFsQkEsa0JBdEhnQjtBQXVIaEJDLEVBQUFBLGtCQUFrQixFQUFsQkEsa0JBdkhnQjtBQXdIaEJDLEVBQUFBLGdCQUFnQixFQUFoQkEsZ0JBeEhnQjtBQXlIaEJDLEVBQUFBLGVBQWUsRUFBZkEsZUF6SGdCO0FBMEhoQkMsRUFBQUEsa0JBQWtCLEVBQWxCQSxrQkExSGdCO0FBMkhoQkcsRUFBQUEsb0JBQW9CLEVBQXBCQSxvQkEzSGdCO0FBNEhoQkYsRUFBQUEsaUJBQWlCLEVBQWpCQSxpQkE1SGdCO0FBNkhoQkMsRUFBQUEsb0JBQW9CLEVBQXBCQSxvQkE3SGdCO0FBK0hoQk8sRUFBQUEsY0FBYyxFQUFkQSxjQS9IZ0I7QUFnSWhCQyxFQUFBQSxpQkFBaUIsRUFBakJBLGlCQWhJZ0I7QUFpSWhCQyxFQUFBQSxtQkFBbUIsRUFBbkJBLG1CQWpJZ0I7QUFrSWhCQyxFQUFBQSxnQkFBZ0IsRUFBaEJBLGdCQWxJZ0I7QUFtSWhCQyxFQUFBQSxtQkFBbUIsRUFBbkJBLG1CQW5JZ0I7QUFxSWhCVCxFQUFBQSxVQUFVLEVBQVZBLFVBcklnQjtBQXNJaEJDLEVBQUFBLGFBQWEsRUFBYkEsYUF0SWdCO0FBdUloQkMsRUFBQUEsWUFBWSxFQUFaQSxZQXZJZ0I7QUF3SWhCQyxFQUFBQSxlQUFlLEVBQWZBLGVBeElnQjtBQXlJaEJDLEVBQUFBLGtCQUFrQixFQUFsQkEsa0JBeklnQjtBQTJJaEI7QUFDQTBGLEVBQUFBLGVBQWUsRUFBZkEsZUE1SWdCO0FBNkloQkMsRUFBQUEsa0JBQWtCLEVBQWxCQSxrQkE3SWdCO0FBOEloQkMsRUFBQUEsY0FBYyxFQUFkQSxjQTlJZ0I7QUErSWhCQyxFQUFBQSxxQkFBcUIsRUFBckJBLHFCQS9JZ0I7QUFpSmhCQyxFQUFBQSxjQUFjLEVBQWRBLGNBakpnQjtBQWtKaEJDLEVBQUFBLGdCQUFnQixFQUFoQkEsZ0JBbEpnQjtBQW9KaEI7QUFDQTFCLEVBQUFBLFdBQVcsRUFBWEEsV0FySmdCO0FBdUpoQkMsRUFBQUEsa0JBQWtCLEVBQWxCQSxrQkF2SmdCO0FBd0poQkMsRUFBQUEsb0JBQW9CLEVBQXBCQSxvQkF4SmdCO0FBeUpoQkMsRUFBQUEsdUJBQXVCLEVBQXZCQSx1QkF6SmdCO0FBMEpoQkosRUFBQUEsaUJBQWlCLEVBQWpCQSxpQkExSmdCO0FBNEpoQjtBQUNBTyxFQUFBQSxhQUFhLEVBQWJBLGFBN0pnQjtBQThKaEJGLEVBQUFBLGVBQWUsRUFBZkEsZUE5SmdCO0FBK0poQkMsRUFBQUEsb0JBQW9CLEVBQXBCQSxvQkEvSmdCO0FBZ0toQlEsRUFBQUEsaUJBQWlCLEVBQWpCQSxpQkFoS2dCO0FBaUtoQkYsRUFBQUEsY0FBYyxFQUFkQSxjQWpLZ0I7QUFrS2hCQyxFQUFBQSxpQkFBaUIsRUFBakJBLGlCQWxLZ0I7QUFtS2hCRyxFQUFBQSxXQUFXLEVBQVhBLFdBbktnQjtBQW9LaEJELEVBQUFBLGdCQUFnQixFQUFoQkEsZ0JBcEtnQjtBQXFLaEJFLEVBQUFBLGFBQWEsRUFBYkEsYUFyS2dCO0FBc0toQlIsRUFBQUEsZUFBZSxFQUFmQSxlQXRLZ0I7QUF1S2hCQyxFQUFBQSxxQkFBcUIsRUFBckJBLHFCQXZLZ0I7QUF3S2hCQyxFQUFBQSxpQkFBaUIsRUFBakJBLGlCQXhLZ0I7QUF5S2hCdUUsRUFBQUEsc0JBQXNCLEVBQXRCQSxzQkF6S2dCO0FBMktoQjtBQUNBakwsRUFBQUEsU0FBUyxFQUFUQSxTQTVLZ0I7QUE2S2hCQyxFQUFBQSxXQUFXLEVBQVhBLFdBN0tnQjtBQThLaEJNLEVBQUFBLFdBQVcsRUFBWEEsV0E5S2dCO0FBK0toQkQsRUFBQUEsY0FBYyxFQUFkQSxjQS9LZ0I7QUFnTGhCSCxFQUFBQSxZQUFZLEVBQVpBLFlBaExnQjtBQWlMaEJDLEVBQUFBLGNBQWMsRUFBZEEsY0FqTGdCO0FBa0xoQkMsRUFBQUEsa0JBQWtCLEVBQWxCQSxrQkFsTGdCO0FBbUxoQjJJLEVBQUFBLFlBQVksRUFBWkEsWUFuTGdCO0FBb0xoQjlJLEVBQUFBLFlBQVksRUFBWkEsWUFwTGdCO0FBcUxoQmlILEVBQUFBLFNBQVMsRUFBVEEsU0FyTGdCO0FBc0xoQkMsRUFBQUEsWUFBWSxFQUFaQSxZQXRMZ0I7QUF3TGhCO0FBQ0FPLEVBQUFBLGNBQWMsRUFBZEEsY0F6TGdCO0FBMExoQkMsRUFBQUEsWUFBWSxFQUFaQSxZQTFMZ0I7QUEyTGhCQyxFQUFBQSxtQkFBbUIsRUFBbkJBLG1CQTNMZ0I7QUE0TGhCQyxFQUFBQSxlQUFlLEVBQWZBLGVBNUxnQjtBQTZMaEJDLEVBQUFBLGVBQWUsRUFBZkEsZUE3TGdCO0FBOExoQkMsRUFBQUEsa0JBQWtCLEVBQWxCQSxrQkE5TGdCO0FBK0xoQkMsRUFBQUEsaUJBQWlCLEVBQWpCQSxpQkEvTGdCO0FBZ01oQkMsRUFBQUEsaUJBQWlCLEVBQWpCQSxpQkFoTWdCO0FBaU1oQkMsRUFBQUEsc0JBQXNCLEVBQXRCQSxzQkFqTWdCO0FBa01oQkMsRUFBQUEsa0JBQWtCLEVBQWxCQSxrQkFsTWdCO0FBbU1oQkMsRUFBQUEsaUJBQWlCLEVBQWpCQSxpQkFuTWdCO0FBb01oQkMsRUFBQUEsZ0JBQWdCLEVBQWhCQSxnQkFwTWdCO0FBc01oQjtBQUNBQyxFQUFBQSxhQUFhLEVBQWJBLGFBdk1nQjtBQXlNaEI7QUFDQUMsRUFBQUEsa0JBQWtCLEVBQWxCQSxrQkExTWdCO0FBMk1oQkssRUFBQUEsc0JBQXNCLEVBQXRCQSxzQkEzTWdCO0FBNE1oQkMsRUFBQUEsMEJBQTBCLEVBQTFCQSwwQkE1TWdCO0FBNk1oQkMsRUFBQUEsMkJBQTJCLEVBQTNCQTtBQTdNZ0IsRUFBWDs7QUFnTkEsSUFBTXNDLE9BQU8sbUNBQ2Y1QixLQURlO0FBR2xCO0FBQ0FILEVBQUFBLEtBQUssRUFBRU8sT0FKVztBQUtsQnZELEVBQUFBLGFBQWEsRUFBRUMsZUFMRztBQU1sQnZHLEVBQUFBLFNBQVMsRUFBRUMsV0FOTztBQU9sQk0sRUFBQUEsV0FBVyxFQUFFQztBQVBLLEVBQWIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQge2Nzc30gZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHtESU1FTlNJT05TfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5cbmV4cG9ydCBjb25zdCB0cmFuc2l0aW9uID0gJ2FsbCAuNHMgZWFzZSc7XG5leHBvcnQgY29uc3QgdHJhbnNpdGlvbkZhc3QgPSAnYWxsIC4ycyBlYXNlJztcbmV4cG9ydCBjb25zdCB0cmFuc2l0aW9uU2xvdyA9ICdhbGwgLjhzIGVhc2UnO1xuXG5leHBvcnQgY29uc3QgYm94U2hhZG93ID0gJzAgMXB4IDJweCAwIHJnYmEoMCwwLDAsMC4xMCknO1xuZXhwb3J0IGNvbnN0IGJveFNpemluZyA9ICdib3JkZXItYm94JztcbmV4cG9ydCBjb25zdCBib3JkZXJSYWRpdXMgPSAnMXB4JztcbmV4cG9ydCBjb25zdCBib3JkZXJDb2xvciA9ICcjM0E0MTRDJztcbmV4cG9ydCBjb25zdCBib3JkZXJDb2xvckxpZ2h0ID0gJyNGMUYxRjEnO1xuXG4vLyBURVhUXG5leHBvcnQgY29uc3QgbGFiZWxDb2xvciA9ICcjNkE3NDg1JztcbmV4cG9ydCBjb25zdCBsYWJlbEhvdmVyQ29sb3IgPSAnI0M2QzZDNic7XG5leHBvcnQgY29uc3QgbGFiZWxDb2xvckxUID0gJyM2QTc0ODUnO1xuXG5leHBvcnQgY29uc3QgdGV4dENvbG9yID0gJyNBMEE3QjQnO1xuZXhwb3J0IGNvbnN0IHRleHRDb2xvckxUID0gJyMzQTQxNEMnO1xuZXhwb3J0IGNvbnN0IHRpdGxlQ29sb3JMVCA9ICcjMjkzMjNDJztcblxuZXhwb3J0IGNvbnN0IHN1YnRleHRDb2xvciA9ICcjNkE3NDg1JztcbmV4cG9ydCBjb25zdCBzdWJ0ZXh0Q29sb3JMVCA9ICcjQTBBN0I0JztcbmV4cG9ydCBjb25zdCBzdWJ0ZXh0Q29sb3JBY3RpdmUgPSAnI0ZGRkZGRic7XG5cbmV4cG9ydCBjb25zdCB0aXRsZVRleHRDb2xvciA9ICcjRkZGRkZGJztcbmV4cG9ydCBjb25zdCB0ZXh0Q29sb3JIbCA9ICcjRDNEOEUwJztcbmV4cG9ydCBjb25zdCB0ZXh0Q29sb3JIbExUID0gJyNGMUYxRjEnO1xuZXhwb3J0IGNvbnN0IGFjdGl2ZUNvbG9yID0gJyMxRkJBRDYnO1xuZXhwb3J0IGNvbnN0IGFjdGl2ZUNvbG9ySG92ZXIgPSAnIzEwODE4OCc7XG5leHBvcnQgY29uc3QgZXJyb3JDb2xvciA9ICcjRjkwNDJDJztcblxuLy8gQnV0dG9uXG5leHBvcnQgY29uc3QgcHJpbWFyeUJ0bkJnZCA9ICcjMEY5NjY4JztcbmV4cG9ydCBjb25zdCBwcmltYXJ5QnRuQWN0QmdkID0gJyMxM0IxN0InO1xuZXhwb3J0IGNvbnN0IHByaW1hcnlCdG5Db2xvciA9ICcjRkZGRkZGJztcbmV4cG9ydCBjb25zdCBwcmltYXJ5QnRuQWN0Q29sb3IgPSAnI0ZGRkZGRic7XG5leHBvcnQgY29uc3QgcHJpbWFyeUJ0bkJnZEhvdmVyID0gJyMxM0IxN0InO1xuZXhwb3J0IGNvbnN0IHByaW1hcnlCdG5SYWRpdXMgPSAnMnB4JztcblxuZXhwb3J0IGNvbnN0IHNlY29uZGFyeUJ0bkJnZCA9ICcjNkE3NDg1JztcbmV4cG9ydCBjb25zdCBzZWNvbmRhcnlCdG5BY3RCZ2QgPSAnI0EwQTdCNCc7XG5leHBvcnQgY29uc3Qgc2Vjb25kYXJ5QnRuQ29sb3IgPSAnI0ZGRkZGRic7XG5leHBvcnQgY29uc3Qgc2Vjb25kYXJ5QnRuQWN0Q29sb3IgPSAnI0ZGRkZGRic7XG5leHBvcnQgY29uc3Qgc2Vjb25kYXJ5QnRuQmdkSG92ZXIgPSAnI0EwQTdCNCc7XG5cbmV4cG9ydCBjb25zdCBsaW5rQnRuQmdkID0gJ3RyYW5zcGFyZW50JztcbmV4cG9ydCBjb25zdCBsaW5rQnRuQWN0QmdkID0gbGlua0J0bkJnZDtcbmV4cG9ydCBjb25zdCBsaW5rQnRuQ29sb3IgPSAnI0EwQTdCNCc7XG5leHBvcnQgY29uc3QgbGlua0J0bkFjdENvbG9yID0gdGV4dENvbG9ySGxMVDtcbmV4cG9ydCBjb25zdCBsaW5rQnRuQWN0QmdkSG92ZXIgPSBsaW5rQnRuQmdkO1xuXG5leHBvcnQgY29uc3QgbmVnYXRpdmVCdG5CZ2QgPSBlcnJvckNvbG9yO1xuZXhwb3J0IGNvbnN0IG5lZ2F0aXZlQnRuQWN0QmdkID0gJyNGRjE5M0UnO1xuZXhwb3J0IGNvbnN0IG5lZ2F0aXZlQnRuQmdkSG92ZXIgPSAnI0ZGMTkzRSc7XG5leHBvcnQgY29uc3QgbmVnYXRpdmVCdG5Db2xvciA9ICcjRkZGRkZGJztcbmV4cG9ydCBjb25zdCBuZWdhdGl2ZUJ0bkFjdENvbG9yID0gJyNGRkZGRkYnO1xuXG4vLyBJbnB1dFxuZXhwb3J0IGNvbnN0IGlucHV0Qm94SGVpZ2h0ID0gJzM0cHgnO1xuZXhwb3J0IGNvbnN0IGlucHV0UGFkZGluZyA9ICc0cHggMTBweCc7XG5leHBvcnQgY29uc3QgaW5wdXRGb250U2l6ZSA9ICcxMXB4JztcbmV4cG9ydCBjb25zdCBpbnB1dEZvbnRXZWlnaHQgPSA1MDA7XG5leHBvcnQgY29uc3QgaW5wdXRCZ2QgPSAnIzI5MzIzQyc7XG5leHBvcnQgY29uc3QgaW5wdXRCZ2RIb3ZlciA9ICcjM0E0MTRDJztcbmV4cG9ydCBjb25zdCBpbnB1dEJnZEFjdGl2ZSA9ICcjM0E0MTRDJztcbmV4cG9ydCBjb25zdCBpbnB1dEJvcmRlckNvbG9yID0gJyMyOTMyM0MnO1xuZXhwb3J0IGNvbnN0IGlucHV0Qm9yZGVySG92ZXJDb2xvciA9ICcjM0E0MTRDJztcbmV4cG9ydCBjb25zdCBpbnB1dEJvcmRlckFjdGl2ZUNvbG9yID0gJyNEM0Q4RTAnO1xuZXhwb3J0IGNvbnN0IGlucHV0Q29sb3IgPSAnI0EwQTdCNCc7XG5leHBvcnQgY29uc3QgaW5wdXRCb3JkZXJSYWRpdXMgPSAnMXB4JztcbmV4cG9ydCBjb25zdCBpbnB1dFBsYWNlaG9sZGVyQ29sb3IgPSAnIzZBNzQ4NSc7XG5leHBvcnQgY29uc3QgaW5wdXRQbGFjZWhvbGRlckZvbnRXZWlnaHQgPSA0MDA7XG5cbmV4cG9ydCBjb25zdCBzZWNvbmRhcnlJbnB1dEhlaWdodCA9ICcyOHB4JztcbmV4cG9ydCBjb25zdCBzZWNvbmRhcnlJbnB1dEJnZCA9ICcjMjQyNzMwJztcbmV4cG9ydCBjb25zdCBzZWNvbmRhcnlJbnB1dEJnZEhvdmVyID0gJyMzQTQxNEMnO1xuZXhwb3J0IGNvbnN0IHNlY29uZGFyeUlucHV0QmdkQWN0aXZlID0gJyMzQTQxNEMnO1xuZXhwb3J0IGNvbnN0IHNlY29uZGFyeUlucHV0Q29sb3IgPSAnI0EwQTdCNCc7XG5leHBvcnQgY29uc3Qgc2Vjb25kYXJ5SW5wdXRCb3JkZXJDb2xvciA9ICcjMjQyNzMwJztcbmV4cG9ydCBjb25zdCBzZWNvbmRhcnlJbnB1dEJvcmRlckFjdGl2ZUNvbG9yID0gJyNEM0Q4RTAnO1xuXG4vLyBTZWxlY3RcbmV4cG9ydCBjb25zdCBzZWxlY3RDb2xvciA9IGlucHV0Q29sb3I7XG5leHBvcnQgY29uc3Qgc2VsZWN0Q29sb3JMVCA9IHRpdGxlQ29sb3JMVDtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdEFjdGl2ZUJvcmRlckNvbG9yID0gJyNEM0Q4RTAnO1xuZXhwb3J0IGNvbnN0IHNlbGVjdEZvbnRTaXplID0gJzExcHgnO1xuZXhwb3J0IGNvbnN0IHNlbGVjdEZvbnRXZWlnaHQgPSAnNDAwJztcbmV4cG9ydCBjb25zdCBzZWxlY3RGb250V2VpZ2h0Qm9sZCA9ICc1MDAnO1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0Q29sb3JQbGFjZUhvbGRlciA9ICcjNkE3NDg1JztcbmV4cG9ydCBjb25zdCBzZWxlY3RCYWNrZ3JvdW5kID0gaW5wdXRCZ2Q7XG5leHBvcnQgY29uc3Qgc2VsZWN0QmFja2dyb3VuZEhvdmVyID0gaW5wdXRCZ2RIb3ZlcjtcbmV4cG9ydCBjb25zdCBzZWxlY3RCYWNrZ3JvdW5kTFQgPSAnI0ZGRkZGRic7XG5leHBvcnQgY29uc3Qgc2VsZWN0QmFja2dyb3VuZEhvdmVyTFQgPSAnI0Y4RjhGOSc7XG5leHBvcnQgY29uc3Qgc2VsZWN0Qm9yZGVyQ29sb3IgPSAnI0QzRDhFMCc7XG5leHBvcnQgY29uc3Qgc2VsZWN0Qm9yZGVyQ29sb3JMVCA9ICcjRDNEOEUwJztcbmV4cG9ydCBjb25zdCBzZWxlY3RCb3JkZXJSYWRpdXMgPSAnMXB4JztcbmV4cG9ydCBjb25zdCBzZWxlY3RCb3JkZXIgPSAwO1xuXG5leHBvcnQgY29uc3QgZHJvcGRvd25MaXN0SGlnaGxpZ2h0QmcgPSAnIzZBNzQ4NSc7XG5leHBvcnQgY29uc3QgZHJvcGRvd25MaXN0U2hhZG93ID0gJzAgNnB4IDEycHggMCByZ2JhKDAsMCwwLDAuMTYpJztcbmV4cG9ydCBjb25zdCBkcm9wZG93bkxpc3RCZ2QgPSAnIzNBNDE0Qyc7XG5leHBvcnQgY29uc3QgZHJvcGRvd25MaXN0Qm9yZGVyVG9wID0gJyMyNDI3MzAnO1xuXG4vLyBTd2l0Y2hcbmV4cG9ydCBjb25zdCBzd2l0Y2hXaWR0aCA9IDI0O1xuZXhwb3J0IGNvbnN0IHN3aXRjaEhlaWdodCA9IDEyO1xuZXhwb3J0IGNvbnN0IHN3aXRjaExhYmVsTWFyZ2luID0gMTI7XG5cbmV4cG9ydCBjb25zdCBzd2l0Y2hUcmFja0JnZCA9ICcjMjkzMjNDJztcbmV4cG9ydCBjb25zdCBzd2l0Y2hUcmFja0JnZEFjdGl2ZSA9IGFjdGl2ZUNvbG9yO1xuZXhwb3J0IGNvbnN0IHN3aXRjaFRyYWNrQm9yZGVyUmFkaXVzID0gJzFweCc7XG5leHBvcnQgY29uc3Qgc3dpdGNoQnRuQmdkID0gJyM2QTc0ODUnO1xuZXhwb3J0IGNvbnN0IHN3aXRjaEJ0bkJnZEFjdGl2ZSA9ICcjRDNEOEUwJztcbmV4cG9ydCBjb25zdCBzd2l0Y2hCdG5Cb3hTaGFkb3cgPSAnMCAycHggNHB4IDAgcmdiYSgwLDAsMCwwLjQwKSc7XG5leHBvcnQgY29uc3Qgc3dpdGNoQnRuQm9yZGVyUmFkaXVzID0gJzFweCc7XG5leHBvcnQgY29uc3Qgc3dpdGNoQnRuV2lkdGggPSAnMTJweCc7XG5leHBvcnQgY29uc3Qgc3dpdGNoQnRuSGVpZ2h0ID0gJzEycHgnO1xuXG5leHBvcnQgY29uc3Qgc2Vjb25kYXJ5U3dpdGNoVHJhY2tCZ2QgPSAnIzI0MjczMCc7XG5leHBvcnQgY29uc3Qgc2Vjb25kYXJ5U3dpdGNoQnRuQmdkID0gJyMzQTQxNEMnO1xuXG4vLyBDaGVja2JveFxuZXhwb3J0IGNvbnN0IGNoZWNrYm94V2lkdGggPSAxNjtcbmV4cG9ydCBjb25zdCBjaGVja2JveEhlaWdodCA9IDE2O1xuZXhwb3J0IGNvbnN0IGNoZWNrYm94TWFyZ2luID0gMTI7XG5leHBvcnQgY29uc3QgY2hlY2tib3hCb3JkZXJDb2xvciA9IHNlbGVjdEJvcmRlckNvbG9yO1xuZXhwb3J0IGNvbnN0IGNoZWNrYm94Qm9yZGVyUmFkaXVzID0gJzJweCc7XG5leHBvcnQgY29uc3QgY2hlY2tib3hCb3JkZXJDb2xvckxUID0gc2VsZWN0Qm9yZGVyQ29sb3JMVDtcbmV4cG9ydCBjb25zdCBjaGVja2JveEJveEJnZCA9ICd3aGl0ZSc7XG5leHBvcnQgY29uc3QgY2hlY2tib3hCb3hCZ2RDaGVja2VkID0gcHJpbWFyeUJ0bkJnZDtcblxuLy8gU2lkZSBQYW5lbFxuZXhwb3J0IGNvbnN0IHNpZGVQYW5lbEhlYWRlckJnID0gJyMyOTMyM0MnO1xuZXhwb3J0IGNvbnN0IHNpZGVQYW5lbEJnID0gJyMyNDI3MzAnO1xuZXhwb3J0IGNvbnN0IHNpZGVCYXJDbG9zZUJ0bkJnZCA9IHNlY29uZGFyeUJ0bkJnZDtcbmV4cG9ydCBjb25zdCBzaWRlQmFyQ2xvc2VCdG5Db2xvciA9ICcjMjkzMjNDJztcbmV4cG9ydCBjb25zdCBzaWRlQmFyQ2xvc2VCdG5CZ2RIb3ZlciA9IHNlY29uZGFyeUJ0bkFjdEJnZDtcblxuZXhwb3J0IGNvbnN0IHBhbmVsQmFja2dyb3VuZCA9ICcjMjkzMjNDJztcbmV4cG9ydCBjb25zdCBwYW5lbEJhY2tncm91bmRIb3ZlciA9ICcjM0E0NTUyJztcbmV4cG9ydCBjb25zdCBwYW5lbEFjdGl2ZUJnID0gJyMzQTQ1NTInO1xuZXhwb3J0IGNvbnN0IHBhbmVsQWN0aXZlQmdMVCA9ICcjNkE3NDg1JztcbmV4cG9ydCBjb25zdCBwYW5lbEhlYWRlckljb24gPSAnIzZBNzQ4NSc7XG5leHBvcnQgY29uc3QgcGFuZWxIZWFkZXJJY29uQWN0aXZlID0gJyNBMEE3QjQnO1xuZXhwb3J0IGNvbnN0IHBhbmVsSGVhZGVySGVpZ2h0ID0gNDg7XG5leHBvcnQgY29uc3QgcGFuZWxCb3hTaGFkb3cgPSAnMCA2cHggMTJweCAwIHJnYmEoMCwwLDAsMC4xNiknO1xuZXhwb3J0IGNvbnN0IHBhbmVsQm9yZGVyUmFkaXVzID0gJzJweCc7XG5leHBvcnQgY29uc3QgcGFuZWxCYWNrZ3JvdW5kTFQgPSAnI2Y4ZjhmOSc7XG5cbmV4cG9ydCBjb25zdCBwYW5lbEJvcmRlckNvbG9yID0gJyMzQTQxNEMnO1xuZXhwb3J0IGNvbnN0IHBhbmVsQm9yZGVyID0gYDFweCBzb2xpZCAke2JvcmRlckNvbG9yfWA7XG5leHBvcnQgY29uc3QgcGFuZWxCb3JkZXJMVCA9IGAxcHggc29saWQgJHtib3JkZXJDb2xvckxpZ2h0fWA7XG5cbmV4cG9ydCBjb25zdCBtYXBQYW5lbEJhY2tncm91bmRDb2xvciA9ICcjMjQyNzMwJztcbmV4cG9ydCBjb25zdCBtYXBQYW5lbEhlYWRlckJhY2tncm91bmRDb2xvciA9ICcjMjkzMjNDJztcbmV4cG9ydCBjb25zdCB0b29sdGlwQmcgPSAnI0Y4RjhGOSc7XG5leHBvcnQgY29uc3QgdG9vbHRpcENvbG9yID0gJyMzMzMzMzQnO1xuXG4vLyBNb2RhbFxuZXhwb3J0IGNvbnN0IG1vZGFsVGl0bGVDb2xvciA9ICcjM0E0MTRDJztcbmV4cG9ydCBjb25zdCBtb2RhbFRpdGxlRm9udFNpemUgPSAnMjRweCc7XG5leHBvcnQgY29uc3QgbW9kYWxGb290ZXJCZ2QgPSAnI0Y4RjhGOSc7XG5leHBvcnQgY29uc3QgbW9kYWxJbWFnZVBsYWNlSG9sZGVyID0gJyNERERGRTMnO1xuXG4vLyBNb2RhbCBEaWFsb2cgKERhcmspXG5leHBvcnQgY29uc3QgbW9kYWxEaWFsb2dCZ2QgPSAnIzNBNDE0Qyc7XG5leHBvcnQgY29uc3QgbW9kYWxEaWFsb2dDb2xvciA9IHRleHRDb2xvckhsO1xuXG4vLyBTbGlkZXJcbmV4cG9ydCBjb25zdCBzbGlkZXJCYXJDb2xvciA9ICcjNkE3NDg1JztcbmV4cG9ydCBjb25zdCBzbGlkZXJCYXJCZ2QgPSAnIzNBNDE0Qyc7XG5leHBvcnQgY29uc3Qgc2xpZGVyQmFySG92ZXJDb2xvciA9ICcjRDNEOEUwJztcbmV4cG9ydCBjb25zdCBzbGlkZXJCYXJSYWRpdXMgPSAnMXB4JztcbmV4cG9ydCBjb25zdCBzbGlkZXJCYXJIZWlnaHQgPSAnNHB4JztcbmV4cG9ydCBjb25zdCBzbGlkZXJIYW5kbGVIZWlnaHQgPSAnMTJweCc7XG5leHBvcnQgY29uc3Qgc2xpZGVySGFuZGxlV2lkdGggPSAnMTJweCc7XG5leHBvcnQgY29uc3Qgc2xpZGVySGFuZGxlQ29sb3IgPSAnI0QzRDhFMCc7XG5leHBvcnQgY29uc3Qgc2xpZGVySGFuZGxlSG92ZXJDb2xvciA9ICcjRkZGRkZGJztcbmV4cG9ydCBjb25zdCBzbGlkZXJIYW5kbGVTaGFkb3cgPSAnMCAycHggNHB4IDAgcmdiYSgwLDAsMCwwLjQwKSc7XG5leHBvcnQgY29uc3Qgc2xpZGVySW5wdXRIZWlnaHQgPSAyNDtcbmV4cG9ydCBjb25zdCBzbGlkZXJJbnB1dFdpZHRoID0gNTA7XG5cbi8vIFBsb3RcbmV4cG9ydCBjb25zdCByYW5nZUJydXNoQmdkID0gJyMzQTQxNEMnO1xuXG4vLyBOb3RpZmljYXRpb25cbmV4cG9ydCBjb25zdCBub3RpZmljYXRpb25Db2xvcnMgPSB7XG4gIGluZm86ICcjMjc2ZWYxJyxcbiAgZXJyb3I6ICcjZjI1MTM4JyxcbiAgc3VjY2VzczogJyM0N2IyNzUnLFxuICB3YXJuaW5nOiAnI2ZmYzA0Mydcbn07XG5cbmV4cG9ydCBjb25zdCBub3RpZmljYXRpb25QYW5lbFdpZHRoID0gMjQwO1xuZXhwb3J0IGNvbnN0IG5vdGlmaWNhdGlvblBhbmVsSXRlbVdpZHRoID0gbm90aWZpY2F0aW9uUGFuZWxXaWR0aCAtIDYwO1xuZXhwb3J0IGNvbnN0IG5vdGlmaWNhdGlvblBhbmVsSXRlbUhlaWdodCA9IDYwO1xuXG5leHBvcnQgY29uc3QgdGV4dFRydW5jYXRlID0ge1xuICBtYXhXaWR0aDogJzEwMCUnLFxuICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyxcbiAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gIHdvcmRXcmFwOiAnbm9ybWFsJ1xufTtcblxuLy8gdGhlbWUgaXMgcGFzc2VkIHRvIGtlcGxlci5nbCB3aGVuIGl0J3MgbW91bnRlZCxcbi8vIGl0IGlzIHVzZWQgYnkgc3R5bGVkLWNvbXBvbmVudHMgdG8gcGFzcyBhbG9uZyB0b1xuLy8gYWxsIGNoaWxkIGNvbXBvbmVudHNcblxuY29uc3QgaW5wdXQgPSBjc3NgXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaW5wdXRCZ2R9O1xuICBib3JkZXI6IDFweCBzb2xpZFxuICAgICR7cHJvcHMgPT5cbiAgICAgIHByb3BzLmFjdGl2ZVxuICAgICAgICA/IHByb3BzLnRoZW1lLmlucHV0Qm9yZGVyQWN0aXZlQ29sb3JcbiAgICAgICAgOiBwcm9wcy5lcnJvciA/IHByb3BzLnRoZW1lLmVycm9yQ29sb3IgOiBwcm9wcy50aGVtZS5pbnB1dEJnZH07XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgY2FyZXQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaW5wdXRCb3JkZXJBY3RpdmVDb2xvcn07XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmlucHV0Q29sb3J9O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmb250LXNpemU6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaW5wdXRGb250U2l6ZX07XG4gIGZvbnQtd2VpZ2h0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmlucHV0Rm9udFdlaWdodH07XG4gIGhlaWdodDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5pbnB1dEJveEhlaWdodH07XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgb3V0bGluZTogbm9uZTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgcGFkZGluZzogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5pbnB1dFBhZGRpbmd9O1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgdHJhbnNpdGlvbjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50cmFuc2l0aW9ufTtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgd2lkdGg6IDEwMCU7XG4gIHdvcmQtd3JhcDogbm9ybWFsO1xuICBwb2ludGVyLWV2ZW50czogJHtwcm9wcyA9PiAocHJvcHMuZGlzYWJsZWQgPyAnbm9uZScgOiAnYWxsJyl9O1xuICBvcGFjaXR5OiAke3Byb3BzID0+IChwcm9wcy5kaXNhYmxlZCA/IDAuNSA6IDEpfTtcblxuICA6aG92ZXIge1xuICAgIGN1cnNvcjogJHtwcm9wcyA9PiBwcm9wcy50eXBlID09PSAnbnVtYmVyJyA/ICd0ZXh0JyA6ICdwb2ludGVyJ307XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PlxuICAgICAgcHJvcHMuYWN0aXZlID8gcHJvcHMudGhlbWUuaW5wdXRCZ2RBY3RpdmUgOiBwcm9wcy50aGVtZS5pbnB1dEJnZEhvdmVyfTtcbiAgICBib3JkZXItY29sb3I6ICR7cHJvcHMgPT5cbiAgICAgIHByb3BzLmFjdGl2ZVxuICAgICAgICA/IHByb3BzLnRoZW1lLmlucHV0Qm9yZGVyQWN0aXZlQ29sb3JcbiAgICAgICAgOiBwcm9wcy50aGVtZS5pbnB1dEJvcmRlckhvdmVyQ29sb3J9O1xuICB9XG5cbiAgOmFjdGl2ZSxcbiAgOmZvY3VzLFxuICAmLmZvY3VzLFxuICAmLmFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5pbnB1dEJnZEFjdGl2ZX07XG4gICAgYm9yZGVyLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmlucHV0Qm9yZGVyQWN0aXZlQ29sb3J9O1xuICB9XG5cbiAgOjpwbGFjZWhvbGRlciB7XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaW5wdXRQbGFjZWhvbGRlckNvbG9yfTtcbiAgICBmb250LXdlaWdodDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5pbnB1dFBsYWNlaG9sZGVyRm9udFdlaWdodH07XG4gIH1cblxuICAvKiBEaXNhYmxlIEFycm93cyBvbiBOdW1iZXIgSW5wdXRzICovXG4gIDo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcbiAgOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgbWFyZ2luOiAwO1xuICB9XG5gO1xuXG5jb25zdCBpbnB1dExUID0gY3NzYFxuICAke2lucHV0fVxuXG4gIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2VsZWN0QmFja2dyb3VuZExUfTtcbiAgYm9yZGVyOiAxcHggc29saWRcbiAgJHtwcm9wcyA9PlxuICAgIHByb3BzLmFjdGl2ZVxuICAgICAgPyBwcm9wcy50aGVtZS5zZWxlY3RBY3RpdmVCb3JkZXJDb2xvclxuICAgICAgOiBwcm9wcy5lcnJvclxuICAgICAgPyBwcm9wcy50aGVtZS5lcnJvckNvbG9yXG4gICAgICA6IHByb3BzLnRoZW1lLnNlbGVjdEJvcmRlckNvbG9yTFR9O1xuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWxlY3RDb2xvckxUfTtcbiAgY2FyZXQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2VsZWN0Q29sb3JMVH07XG5cbiAgOjotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHtcbiAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zdWJ0ZXh0Q29sb3JMVH07XG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgfVxuXG4gIDphY3RpdmUsXG4gIDpmb2N1cyxcbiAgJi5mb2N1cyxcbiAgJi5hY3RpdmUge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2VsZWN0QmFja2dyb3VuZExUfTtcbiAgICBib3JkZXItY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9yTFR9O1xuICB9XG5cbiAgOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNlbGVjdEJhY2tncm91bmRMVH07XG4gICAgY3Vyc29yOiAke3Byb3BzID0+IFsnbnVtYmVyJywgJ3RleHQnXS5pbmNsdWRlcyhwcm9wcy50eXBlKSA/ICd0ZXh0JyA6ICdwb2ludGVyJ307XG4gICAgYm9yZGVyLWNvbG9yOiAke3Byb3BzID0+XG4gICAgcHJvcHMuYWN0aXZlXG4gICAgICA/IHByb3BzLnRoZW1lLnRleHRDb2xvckxUXG4gICAgICA6IHByb3BzLnRoZW1lLnN1YnRleHRDb2xvcn07XG4gIH1cbmA7XG5cbmNvbnN0IHNlY29uZGFyeUlucHV0ID0gY3NzYFxuICAke3Byb3BzID0+IHByb3BzLnRoZW1lLmlucHV0fVxuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWNvbmRhcnlJbnB1dENvbG9yfTtcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWNvbmRhcnlJbnB1dEJnZH07XG4gIGhlaWdodDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWNvbmRhcnlJbnB1dEhlaWdodH07XG4gIGJvcmRlcjogMXB4IHNvbGlkXG4gICAgJHtwcm9wcyA9PiBwcm9wcy5lcnJvclxuICAgICAgICAgID8gcHJvcHMudGhlbWUuZXJyb3JDb2xvclxuICAgICAgICAgIDogcHJvcHMudGhlbWUuc2Vjb25kYXJ5SW5wdXRCb3JkZXJDb2xvcn07XG5cbiAgOmhvdmVyIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWNvbmRhcnlJbnB1dEJnZEhvdmVyfTtcbiAgICBib3JkZXItY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2Vjb25kYXJ5SW5wdXRCZ2RIb3Zlcn07XG4gIH1cblxuICA6YWN0aXZlLFxuICAmLmFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWNvbmRhcnlJbnB1dEJnZEFjdGl2ZX07XG4gICAgYm9yZGVyLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNlY29uZGFyeUlucHV0Qm9yZGVyQWN0aXZlQ29sb3J9O1xuICB9XG5gO1xuXG5jb25zdCBjaGlja2xldGVkSW5wdXQgPSBjc3NgXG4gICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2Vjb25kYXJ5SW5wdXR9XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBoZWlnaHQ6IGF1dG87XG4gIGp1c3RpZnktY29udGVudDogc3RhcnQ7XG4gIG1hcmdpbi1ib3R0b206IDJweDtcbiAgcGFkZGluZzogNHB4IDdweCA0cHggNHB4O1xuICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xuYDtcblxuY29uc3QgaW5saW5lSW5wdXQgPSBjc3NgXG4gICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaW5wdXR9IGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvcn07XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNDNweDtcbiAgbGluZS1oZWlnaHQ6IDE4cHg7XG4gIGhlaWdodDogMjRweDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgcGFkZGluZy1sZWZ0OiA0cHg7XG4gIG1hcmdpbi1sZWZ0OiAtNHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XG5cbiAgOmhvdmVyIHtcbiAgICBoZWlnaHQ6IDI0cHg7XG4gICAgY3Vyc29yOiB0ZXh0O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGFiZWxDb2xvcn07XG4gIH1cblxuICA6YWN0aXZlLFxuICAuYWN0aXZlLFxuICA6Zm9jdXMge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaW5wdXRCb3JkZXJBY3RpdmVDb2xvcn07XG4gIH1cbmA7XG5cbmNvbnN0IHN3aXRjaFRyYWNrID0gY3NzYFxuICBiYWNrZ3JvdW5kOiAke3Byb3BzID0+XG4gICAgcHJvcHMuY2hlY2tlZFxuICAgICAgPyBwcm9wcy50aGVtZS5zd2l0Y2hUcmFja0JnZEFjdGl2ZVxuICAgICAgOiBwcm9wcy50aGVtZS5zd2l0Y2hUcmFja0JnZH07XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAke3Byb3BzID0+IC1wcm9wcy50aGVtZS5zd2l0Y2hMYWJlbE1hcmdpbn1weDtcbiAgY29udGVudDogJyc7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zd2l0Y2hXaWR0aH1weDtcbiAgaGVpZ2h0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnN3aXRjaEhlaWdodH1weDtcbiAgYm9yZGVyLXJhZGl1czogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zd2l0Y2hUcmFja0JvcmRlclJhZGl1c307XG5gO1xuXG5jb25zdCBzd2l0Y2hCdXR0b24gPSBjc3NgXG4gIHRyYW5zaXRpb246ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudHJhbnNpdGlvbn07XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAke3Byb3BzID0+IChwcm9wcy5jaGVja2VkID8gcHJvcHMudGhlbWUuc3dpdGNoV2lkdGggLyAyIDogLTEpIC0gcHJvcHMudGhlbWUuc3dpdGNoTGFiZWxNYXJnaW59cHg7XG4gIGNvbnRlbnQ6ICcnO1xuICBkaXNwbGF5OiBibG9jaztcbiAgaGVpZ2h0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnN3aXRjaEJ0bkhlaWdodH07XG4gIHdpZHRoOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnN3aXRjaEJ0bldpZHRofTtcbiAgYmFja2dyb3VuZDogJHtwcm9wcyA9PiBwcm9wcy5jaGVja2VkID9cbiAgcHJvcHMudGhlbWUuc3dpdGNoQnRuQmdkQWN0aXZlIDogcHJvcHMudGhlbWUuc3dpdGNoQnRuQmdkfTtcbiAgYm94LXNoYWRvdzogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zd2l0Y2hCdG5Cb3hTaGFkb3d9O1xuYDtcblxuY29uc3QgaW5wdXRTd2l0Y2ggPSBjc3NgXG4gIHVzZXItc2VsZWN0OiBub25lO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGxpbmUtaGVpZ2h0OiAwO1xuICBmb250LXdlaWdodDogNTAwO1xuICBmb250LXNpemU6IDEycHg7XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmxhYmVsQ29sb3J9O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgcGFkZGluZy10b3A6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc3dpdGNoSGVpZ2h0IC8gMn1weDtcbiAgcGFkZGluZy1yaWdodDogMDtcbiAgcGFkZGluZy1ib3R0b206IDA7XG4gIHBhZGRpbmctbGVmdDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zd2l0Y2hXaWR0aH1weDtcblxuICA6YmVmb3JlIHtcbiAgICAke3Byb3BzID0+IHByb3BzLnRoZW1lLnN3aXRjaFRyYWNrfTtcbiAgfVxuXG4gIDphZnRlciB7XG4gICAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zd2l0Y2hCdXR0b259O1xuICB9XG5gO1xuXG4vLyBUaGlzIGlzIGEgbGlnaHQgdmVyc2lvbiBjaGVja2JveFxuY29uc3QgY2hlY2tib3hCb3ggPSBjc3NgXG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgd2lkdGg6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuY2hlY2tib3hXaWR0aH1weDtcbiAgaGVpZ2h0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNoZWNrYm94SGVpZ2h0fXB4O1xuICBiYWNrZ3JvdW5kOiAke3Byb3BzID0+IHByb3BzLmNoZWNrZWQgPyBwcm9wcy50aGVtZS5jaGVja2JveEJveEJnZENoZWNrZWQgOiBwcm9wcy50aGVtZS5jaGVja2JveEJveEJnZH07XG4gIGJvcmRlcjogMXB4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMuY2hlY2tlZCA/IHByb3BzLnRoZW1lLmNoZWNrYm94Qm94QmdkQ2hlY2tlZCA6IHByb3BzLnRoZW1lLmNoZWNrYm94Qm9yZGVyQ29sb3J9O1xuICBib3JkZXItcmFkaXVzOiAycHg7XG4gIGNvbnRlbnQ6ICcnO1xuYDtcblxuY29uc3QgY2hlY2tib3hDaGVjayA9IGNzc2BcbiAgd2lkdGg6IDEwcHg7XG4gIGhlaWdodDogNXB4O1xuICBib3JkZXItYm90dG9tOiAycHggc29saWQgd2hpdGU7XG4gIGJvcmRlci1sZWZ0OiAycHggc29saWQgd2hpdGU7XG4gIHRvcDogNHB4O1xuICBsZWZ0OiAzcHg7XG4gIHRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIG9wYWNpdHk6ICR7cHJvcHMgPT4gcHJvcHMuY2hlY2tlZCA/IDEgOiAwfTtcbiAgY29udGVudDogXCJcIjtcbmA7XG5cbmNvbnN0IGlucHV0Q2hlY2tib3ggPSBjc3NgXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBwYWRkaW5nLWxlZnQ6IDMycHg7XG4gIG1hcmdpbi1ib3R0b206IDI0cHg7XG4gIGxpbmUtaGVpZ2h0OiAyMHB4O1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGFiZWxDb2xvcn07XG4gIG1hcmdpbi1sZWZ0OiAtJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zd2l0Y2hMYWJlbE1hcmdpbn1weDtcblxuICA6YmVmb3JlIHtcbiAgICAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5jaGVja2JveEJveH07XG4gIH1cblxuICA6YWZ0ZXIge1xuICAgICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuY2hlY2tib3hDaGVja307XG4gIH1cbmA7XG5cbmNvbnN0IHNlY29uZGFyeVN3aXRjaCA9IGNzc2BcbiAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5pbnB1dFN3aXRjaH1cbiAgOmJlZm9yZSB7XG4gICAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zd2l0Y2hUcmFja30gYmFja2dyb3VuZDogJHtwcm9wcyA9PlxuICAgICAgICBwcm9wcy5jaGVja2VkXG4gICAgICAgICAgPyBwcm9wcy50aGVtZS5zd2l0Y2hUcmFja0JnZEFjdGl2ZVxuICAgICAgICAgIDogcHJvcHMudGhlbWUuc2Vjb25kYXJ5U3dpdGNoVHJhY2tCZ2R9O1xuICB9XG5cbiAgOmFmdGVyIHtcbiAgICAke3Byb3BzID0+IHByb3BzLnRoZW1lLnN3aXRjaEJ1dHRvbn1cbiAgICBiYWNrZ3JvdW5kOiAke3Byb3BzID0+IHByb3BzLmNoZWNrZWRcbiAgICAgICAgICA/IHByb3BzLnRoZW1lLnN3aXRjaEJ0bkJnZEFjdGl2ZVxuICAgICAgICAgIDogcHJvcHMudGhlbWUuc2Vjb25kYXJ5U3dpdGNoQnRuQmdkfTtcbiAgfVxuYDtcblxuY29uc3QgZHJvcGRvd25TY3JvbGxCYXIgPSBjc3NgXG4gIDo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICAgIGhlaWdodDogMTBweDtcbiAgICB3aWR0aDogMTBweDtcbiAgfVxuXG4gIDo6LXdlYmtpdC1zY3JvbGxiYXItY29ybmVyIHtcbiAgICBiYWNrZ3JvdW5kOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmRyb3Bkb3duTGlzdEJnZH07XG4gIH1cblxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcbiAgICBiYWNrZ3JvdW5kOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmRyb3Bkb3duTGlzdEJnZH07XG4gIH1cblxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGFiZWxDb2xvcn07XG4gICAgYm9yZGVyOiAzcHggc29saWQgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5kcm9wZG93bkxpc3RCZ2R9O1xuICB9O1xuXG4gIDp2ZXJ0aWNhbDpob3ZlciB7XG4gICAgYmFja2dyb3VuZDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JIbH07XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICB9XG59YDtcblxuY29uc3QgZHJvcGRvd25MaXN0QW5jaG9yID0gY3NzYFxuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWxlY3RDb2xvcn07XG4gIHBhZGRpbmctbGVmdDogM3B4O1xuYDtcblxuY29uc3QgZHJvcGRvd25MaXN0SXRlbSA9IGNzc2BcbiAgZm9udC1zaXplOiAxMXB4O1xuICBwYWRkaW5nOiAzcHggOXB4O1xuICBmb250LXdlaWdodDogNTAwO1xuXG4gICYuaG92ZXIsXG4gICY6aG92ZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmRyb3Bkb3duTGlzdEhpZ2hsaWdodEJnfTtcblxuICAgIC5saXN0X19pdGVtX19hbmNob3Ige1xuICAgICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9ySGx9O1xuICAgIH1cbiAgfVxuYDtcblxuY29uc3QgZHJvcGRvd25MaXN0SGVhZGVyID0gY3NzYFxuICBmb250LXNpemU6IDExcHg7XG4gIHBhZGRpbmc6IDVweCA5cHg7XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmxhYmVsQ29sb3J9O1xuYDtcblxuY29uc3QgZHJvcGRvd25MaXN0U2VjdGlvbiA9IGNzc2BcbiAgcGFkZGluZzogMCAwIDRweCAwO1xuICBtYXJnaW4tYm90dG9tOiA0cHg7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAke3Byb3BzID0+IHByb3BzLnRoZW1lLmxhYmVsQ29sb3J9O1xuYDtcblxuY29uc3QgZHJvcGRvd25MaXN0ID0gY3NzYFxuICBvdmVyZmxvdy15OiBhdXRvO1xuICBtYXgtaGVpZ2h0OiAyODBweDtcbiAgYm94LXNoYWRvdzogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5kcm9wZG93bkxpc3RTaGFkb3d9O1xuICBib3JkZXItcmFkaXVzOiAycHg7XG5cbiAgLmxpc3RfX3NlY3Rpb24ge1xuICAgICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZHJvcGRvd25MaXN0U2VjdGlvbn07XG4gIH1cbiAgLmxpc3RfX2hlYWRlciB7XG4gICAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5kcm9wZG93bkxpc3RIZWFkZXJ9O1xuICB9XG5cbiAgLmxpc3RfX2l0ZW0ge1xuICAgICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZHJvcGRvd25MaXN0SXRlbX07XG4gIH1cblxuICAubGlzdF9faXRlbV9fYW5jaG9yIHtcbiAgICAke3Byb3BzID0+IHByb3BzLnRoZW1lLmRyb3Bkb3duTGlzdEFuY2hvcn07XG4gIH1cblxuICAke3Byb3BzID0+IHByb3BzLnRoZW1lLmRyb3Bkb3duU2Nyb2xsQmFyfTtcbmA7XG5cbmNvbnN0IHNpZGVQYW5lbFNjcm9sbEJhciA9IGNzc2BcbiAgOjotd2Via2l0LXNjcm9sbGJhciB7XG4gICAgaGVpZ2h0OiAxMHB4O1xuICAgIHdpZHRoOiAxMHB4O1xuICB9XG5cbiAgOjotd2Via2l0LXNjcm9sbGJhci1jb3JuZXIge1xuICAgIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2lkZVBhbmVsQmd9O1xuICB9XG5cbiAgOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG4gICAgYmFja2dyb3VuZDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zaWRlUGFuZWxCZ307XG4gIH1cblxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxCYWNrZ3JvdW5kSG92ZXJ9O1xuICAgIGJvcmRlcjogM3B4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2lkZVBhbmVsQmd9O1xuXG4gICAgOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGFiZWxDb2xvcn07XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgfVxuICB9O1xufWA7XG5cbmNvbnN0IHBhbmVsRHJvcGRvd25TY3JvbGxCYXIgPSBjc3NgXG4gIDo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICAgIGhlaWdodDogMTBweDtcbiAgICB3aWR0aDogMTBweDtcbiAgfVxuXG4gIDo6LXdlYmtpdC1zY3JvbGxiYXItY29ybmVyIHtcbiAgICBiYWNrZ3JvdW5kOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsQmFja2dyb3VuZH07XG4gIH1cblxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcbiAgICBiYWNrZ3JvdW5kOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsQmFja2dyb3VuZH07XG4gIH1cblxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxCYWNrZ3JvdW5kSG92ZXJ9O1xuICAgIGJvcmRlcjogM3B4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxCYWNrZ3JvdW5kfTtcbiAgICA6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5sYWJlbENvbG9yfTtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICB9XG4gIH07XG5gO1xuXG5jb25zdCBzY3JvbGxCYXIgPSBjc3NgXG4gIDo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICAgIGhlaWdodDogMTBweDtcbiAgICB3aWR0aDogMTBweDtcbiAgfVxuXG4gIDo6LXdlYmtpdC1zY3JvbGxiYXItY29ybmVyIHtcbiAgICBiYWNrZ3JvdW5kOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsQmFja2dyb3VuZH07XG4gIH1cblxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcbiAgICBiYWNrZ3JvdW5kOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsQmFja2dyb3VuZH07XG4gIH1cblxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGFiZWxDb2xvcn07XG4gICAgYm9yZGVyOiAzcHggc29saWQgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbEJhY2tncm91bmR9XG5cbiAgICA6dmVydGljYWw6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JIbH07XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgfVxuXG4gICAgOmhvcml6b250YWw6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JIbH07XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgfVxuICB9XG59YDtcblxuZXhwb3J0IGNvbnN0IG1vZGFsU2Nyb2xsQmFyID0gY3NzYFxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcbiAgICB3aWR0aDogMTRweDtcbiAgICBoZWlnaHQ6IDE2cHg7XG4gIH1cblxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgfVxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrOmhvcml6b250YWwge1xuICAgIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9ySGx9O1xuICB9XG4gIDo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xuICAgIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGFiZWxDb2xvckxUfTtcbiAgICBib3JkZXI6IDRweCBzb2xpZCB3aGl0ZTtcbiAgfVxuXG4gIDo6LXdlYmtpdC1zY3JvbGxiYXItY29ybmVyIHtcbiAgICBiYWNrZ3JvdW5kOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvckhsfTtcbiAgfVxuXG4gIDo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWI6aG92ZXIge1xuICAgIGJhY2tncm91bmQ6ICM5NjlkYTk7XG4gIH1cblxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOnZlcnRpY2FsIHtcbiAgICBib3JkZXItcmFkaXVzOiA3cHg7XG4gIH1cblxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOmhvcml6b250YWwge1xuICAgIGJvcmRlci1yYWRpdXM6IDlweDtcbiAgICBib3JkZXI6IDRweCBzb2xpZCAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvckhsfTtcbiAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IHRoZW1lID0ge1xuICAuLi5ESU1FTlNJT05TLFxuICAvLyB0ZW1wbGF0ZXNcbiAgaW5wdXQsXG4gIGlucHV0TFQsXG4gIGlubGluZUlucHV0LFxuICBjaGlja2xldGVkSW5wdXQsXG4gIHNlY29uZGFyeUlucHV0LFxuICBkcm9wZG93blNjcm9sbEJhcixcbiAgZHJvcGRvd25MaXN0LFxuICBkcm9wZG93bkxpc3RJdGVtLFxuICBkcm9wZG93bkxpc3RBbmNob3IsXG4gIGRyb3Bkb3duTGlzdEhlYWRlcixcbiAgZHJvcGRvd25MaXN0U2VjdGlvbixcbiAgZHJvcGRvd25MaXN0U2hhZG93LFxuICBtb2RhbFNjcm9sbEJhcixcbiAgc2Nyb2xsQmFyLFxuICBzaWRlUGFuZWxTY3JvbGxCYXIsXG4gIGlucHV0U3dpdGNoLFxuICBzZWNvbmRhcnlTd2l0Y2gsXG4gIHN3aXRjaFRyYWNrLFxuICBzd2l0Y2hCdXR0b24sXG4gIGlucHV0Q2hlY2tib3gsXG4gIGNoZWNrYm94Qm94LFxuICBjaGVja2JveENoZWNrLFxuXG4gIC8vIFRyYW5zaXRpb25zXG4gIHRyYW5zaXRpb24sXG4gIHRyYW5zaXRpb25GYXN0LFxuICB0cmFuc2l0aW9uU2xvdyxcblxuICAvLyBzdHlsZXNcbiAgYWN0aXZlQ29sb3IsXG4gIGFjdGl2ZUNvbG9ySG92ZXIsXG4gIGJvcmRlclJhZGl1cyxcbiAgYm94U2hhZG93LFxuICBlcnJvckNvbG9yLFxuICBkcm9wZG93bkxpc3RIaWdobGlnaHRCZyxcbiAgZHJvcGRvd25MaXN0QmdkLFxuICBkcm9wZG93bkxpc3RCb3JkZXJUb3AsXG5cbiAgbGFiZWxDb2xvcixcbiAgbGFiZWxDb2xvckxULFxuICBsYWJlbEhvdmVyQ29sb3IsXG4gIG1hcFBhbmVsQmFja2dyb3VuZENvbG9yLFxuICBtYXBQYW5lbEhlYWRlckJhY2tncm91bmRDb2xvcixcblxuICAvLyBTZWxlY3RcbiAgc2VsZWN0QWN0aXZlQm9yZGVyQ29sb3IsXG4gIHNlbGVjdEJhY2tncm91bmQsXG4gIHNlbGVjdEJhY2tncm91bmRMVCxcbiAgc2VsZWN0QmFja2dyb3VuZEhvdmVyLFxuICBzZWxlY3RCYWNrZ3JvdW5kSG92ZXJMVCxcbiAgc2VsZWN0Qm9yZGVyLFxuICBzZWxlY3RCb3JkZXJDb2xvcixcbiAgc2VsZWN0Qm9yZGVyUmFkaXVzLFxuICBzZWxlY3RCb3JkZXJDb2xvckxULFxuICBzZWxlY3RDb2xvcixcbiAgc2VsZWN0Q29sb3JQbGFjZUhvbGRlcixcbiAgc2VsZWN0Rm9udFNpemUsXG4gIHNlbGVjdEZvbnRXZWlnaHQsXG4gIHNlbGVjdENvbG9yTFQsXG5cbiAgLy8gSW5wdXRcbiAgaW5wdXRCZ2QsXG4gIGlucHV0QmdkSG92ZXIsXG4gIGlucHV0QmdkQWN0aXZlLFxuICBpbnB1dEJveEhlaWdodCxcbiAgaW5wdXRCb3JkZXJDb2xvcixcbiAgaW5wdXRCb3JkZXJBY3RpdmVDb2xvcixcbiAgaW5wdXRCb3JkZXJIb3ZlckNvbG9yLFxuICBpbnB1dEJvcmRlclJhZGl1cyxcbiAgaW5wdXRDb2xvcixcbiAgaW5wdXRQYWRkaW5nLFxuICBpbnB1dEZvbnRTaXplLFxuICBpbnB1dEZvbnRXZWlnaHQsXG4gIGlucHV0UGxhY2Vob2xkZXJDb2xvcixcbiAgaW5wdXRQbGFjZWhvbGRlckZvbnRXZWlnaHQsXG5cbiAgc2Vjb25kYXJ5SW5wdXRCZ2QsXG4gIHNlY29uZGFyeUlucHV0QmdkSG92ZXIsXG4gIHNlY29uZGFyeUlucHV0QmdkQWN0aXZlLFxuICBzZWNvbmRhcnlJbnB1dEhlaWdodCxcbiAgc2Vjb25kYXJ5SW5wdXRDb2xvcixcbiAgc2Vjb25kYXJ5SW5wdXRCb3JkZXJDb2xvcixcbiAgc2Vjb25kYXJ5SW5wdXRCb3JkZXJBY3RpdmVDb2xvcixcblxuICAvLyBTd2l0Y2hcbiAgc3dpdGNoV2lkdGgsXG4gIHN3aXRjaEhlaWdodCxcbiAgc3dpdGNoVHJhY2tCZ2QsXG4gIHN3aXRjaFRyYWNrQmdkQWN0aXZlLFxuICBzd2l0Y2hUcmFja0JvcmRlclJhZGl1cyxcbiAgc3dpdGNoQnRuQmdkLFxuICBzd2l0Y2hCdG5CZ2RBY3RpdmUsXG4gIHN3aXRjaEJ0bkJveFNoYWRvdyxcbiAgc3dpdGNoQnRuQm9yZGVyUmFkaXVzLFxuICBzd2l0Y2hCdG5XaWR0aCxcbiAgc3dpdGNoQnRuSGVpZ2h0LFxuICBzd2l0Y2hMYWJlbE1hcmdpbixcblxuICBzZWNvbmRhcnlTd2l0Y2hUcmFja0JnZCxcbiAgc2Vjb25kYXJ5U3dpdGNoQnRuQmdkLFxuXG4gIC8vIENoZWNrYm94XG4gIGNoZWNrYm94V2lkdGgsXG4gIGNoZWNrYm94SGVpZ2h0LFxuICBjaGVja2JveE1hcmdpbixcbiAgY2hlY2tib3hCb3JkZXJDb2xvcixcbiAgY2hlY2tib3hCb3JkZXJSYWRpdXMsXG4gIGNoZWNrYm94Qm9yZGVyQ29sb3JMVCxcbiAgY2hlY2tib3hCb3hCZ2QsXG4gIGNoZWNrYm94Qm94QmdkQ2hlY2tlZCxcblxuICAvLyBCdXR0b25cbiAgcHJpbWFyeUJ0bkJnZCxcbiAgcHJpbWFyeUJ0bkFjdEJnZCxcbiAgcHJpbWFyeUJ0bkNvbG9yLFxuICBwcmltYXJ5QnRuQWN0Q29sb3IsXG4gIHByaW1hcnlCdG5CZ2RIb3ZlcixcbiAgcHJpbWFyeUJ0blJhZGl1cyxcbiAgc2Vjb25kYXJ5QnRuQmdkLFxuICBzZWNvbmRhcnlCdG5BY3RCZ2QsXG4gIHNlY29uZGFyeUJ0bkJnZEhvdmVyLFxuICBzZWNvbmRhcnlCdG5Db2xvcixcbiAgc2Vjb25kYXJ5QnRuQWN0Q29sb3IsXG5cbiAgbmVnYXRpdmVCdG5CZ2QsXG4gIG5lZ2F0aXZlQnRuQWN0QmdkLFxuICBuZWdhdGl2ZUJ0bkJnZEhvdmVyLFxuICBuZWdhdGl2ZUJ0bkNvbG9yLFxuICBuZWdhdGl2ZUJ0bkFjdENvbG9yLFxuXG4gIGxpbmtCdG5CZ2QsXG4gIGxpbmtCdG5BY3RCZ2QsXG4gIGxpbmtCdG5Db2xvcixcbiAgbGlua0J0bkFjdENvbG9yLFxuICBsaW5rQnRuQWN0QmdkSG92ZXIsXG5cbiAgLy8gTW9kYWxcbiAgbW9kYWxUaXRsZUNvbG9yLFxuICBtb2RhbFRpdGxlRm9udFNpemUsXG4gIG1vZGFsRm9vdGVyQmdkLFxuICBtb2RhbEltYWdlUGxhY2VIb2xkZXIsXG5cbiAgbW9kYWxEaWFsb2dCZ2QsXG4gIG1vZGFsRGlhbG9nQ29sb3IsXG5cbiAgLy8gU2lkZSBQYW5lbFxuICBzaWRlUGFuZWxCZyxcblxuICBzaWRlQmFyQ2xvc2VCdG5CZ2QsXG4gIHNpZGVCYXJDbG9zZUJ0bkNvbG9yLFxuICBzaWRlQmFyQ2xvc2VCdG5CZ2RIb3ZlcixcbiAgc2lkZVBhbmVsSGVhZGVyQmcsXG5cbiAgLy8gU2lkZSBQYW5lbCBQYW5lbFxuICBwYW5lbEFjdGl2ZUJnLFxuICBwYW5lbEJhY2tncm91bmQsXG4gIHBhbmVsQmFja2dyb3VuZEhvdmVyLFxuICBwYW5lbEJhY2tncm91bmRMVCxcbiAgcGFuZWxCb3hTaGFkb3csXG4gIHBhbmVsQm9yZGVyUmFkaXVzLFxuICBwYW5lbEJvcmRlcixcbiAgcGFuZWxCb3JkZXJDb2xvcixcbiAgcGFuZWxCb3JkZXJMVCxcbiAgcGFuZWxIZWFkZXJJY29uLFxuICBwYW5lbEhlYWRlckljb25BY3RpdmUsXG4gIHBhbmVsSGVhZGVySGVpZ2h0LFxuICBwYW5lbERyb3Bkb3duU2Nyb2xsQmFyLFxuXG4gIC8vIFRleHRcbiAgdGV4dENvbG9yLFxuICB0ZXh0Q29sb3JMVCxcbiAgdGV4dENvbG9ySGwsXG4gIHRpdGxlVGV4dENvbG9yLFxuICBzdWJ0ZXh0Q29sb3IsXG4gIHN1YnRleHRDb2xvckxULFxuICBzdWJ0ZXh0Q29sb3JBY3RpdmUsXG4gIHRleHRUcnVuY2F0ZSxcbiAgdGl0bGVDb2xvckxULFxuICB0b29sdGlwQmcsXG4gIHRvb2x0aXBDb2xvcixcblxuICAvLyBTbGlkZXJcbiAgc2xpZGVyQmFyQ29sb3IsXG4gIHNsaWRlckJhckJnZCxcbiAgc2xpZGVyQmFySG92ZXJDb2xvcixcbiAgc2xpZGVyQmFyUmFkaXVzLFxuICBzbGlkZXJCYXJIZWlnaHQsXG4gIHNsaWRlckhhbmRsZUhlaWdodCxcbiAgc2xpZGVySGFuZGxlV2lkdGgsXG4gIHNsaWRlckhhbmRsZUNvbG9yLFxuICBzbGlkZXJIYW5kbGVIb3ZlckNvbG9yLFxuICBzbGlkZXJIYW5kbGVTaGFkb3csXG4gIHNsaWRlcklucHV0SGVpZ2h0LFxuICBzbGlkZXJJbnB1dFdpZHRoLFxuXG4gIC8vIFBsb3RcbiAgcmFuZ2VCcnVzaEJnZCxcblxuICAvLyBOb3RpZmljYXRpb25zXG4gIG5vdGlmaWNhdGlvbkNvbG9ycyxcbiAgbm90aWZpY2F0aW9uUGFuZWxXaWR0aCxcbiAgbm90aWZpY2F0aW9uUGFuZWxJdGVtV2lkdGgsXG4gIG5vdGlmaWNhdGlvblBhbmVsSXRlbUhlaWdodFxufTtcblxuZXhwb3J0IGNvbnN0IHRoZW1lTFQgPSB7XG4gIC4uLnRoZW1lLFxuXG4gIC8vIHRlbXBsYXRlXG4gIGlucHV0OiBpbnB1dExULFxuICBwYW5lbEFjdGl2ZUJnOiBwYW5lbEFjdGl2ZUJnTFQsXG4gIHRleHRDb2xvcjogdGV4dENvbG9yTFQsXG4gIHRleHRDb2xvckhsOiB0ZXh0Q29sb3JIbExUXG59O1xuIl19