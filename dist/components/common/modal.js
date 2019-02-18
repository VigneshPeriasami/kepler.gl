"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ModalFooter = exports.ModalTitle = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactModal = _interopRequireDefault(require("react-modal"));

var _icons = require("./icons");

var _styledComponents2 = require("./styled-components");

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  z-index: 10000;\n  transition: ", ";\n\n  :focus {\n    outline: 0\n  }\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  justify-content: flex-end;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n  z-index: 10002;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  width: 100%;\n  left: 0;\n  bottom: 0;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-end;\n  padding-top: 36px;\n  z-index: 10001;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  font-size: ", ";\n  color: ", ";\n  margin-bottom: 10px;\n  position: relative;\n  z-index: 10003;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  display: flex;\n  justify-content: flex-end;\n  z-index: 10005;\n\n  :hover {\n    cursor: pointer;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  width: 60%;\n  max-width: 960px;\n  padding: 24px 24px 40px;\n  position: absolute;\n  top: 92px;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  background-color: #ffffff;\n  border-radius: 4px;\n  transition: ", ";\n  min-width: 600px;\n  overflow: hidden;\n  box-sizing: border-box;\n  margin-right: auto;\n  font-size: 12px;\n  color: ", ";\n  ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var ModalContentWrapper = _styledComponents.default.div(_templateObject(), function (props) {
  return props.theme.transition;
}, function (props) {
  return props.theme.labelColorLT;
}, function (props) {
  return props.cssStyle || '';
});

var CloseButton = _styledComponents.default.div(_templateObject2(), function (props) {
  return props.theme.titleColorLT;
});

var ModalTitle = _styledComponents.default.div(_templateObject3(), function (props) {
  return props.theme.modalTitleFontSize;
}, function (props) {
  return props.theme.modalTitleColor;
});

exports.ModalTitle = ModalTitle;

var StyledModalFooter = _styledComponents.default.div(_templateObject4());

var ModalContent = _styledComponents.default.div(_templateObject5());

var FooterActionWrapper = _styledComponents.default.div(_templateObject6());

var defaultCancelButton = {
  link: true,
  large: true,
  children: 'Cancel'
};
var defaultConfirmButton = {
  large: true,
  width: '160px',
  children: 'Confirm'
};

var ModalFooter = function ModalFooter(_ref) {
  var cancel = _ref.cancel,
      confirm = _ref.confirm,
      cancelButton = _ref.cancelButton,
      confirmButton = _ref.confirmButton;
  var cancelButtonProps = (0, _objectSpread2.default)({}, defaultCancelButton, cancelButton);
  var confirmButtonProps = (0, _objectSpread2.default)({}, defaultConfirmButton, confirmButton);
  return _react.default.createElement(StyledModalFooter, {
    className: "modal--footer"
  }, _react.default.createElement(FooterActionWrapper, null, _react.default.createElement(_styledComponents2.Button, (0, _extends2.default)({}, cancelButtonProps, {
    onClick: cancel
  }), cancelButtonProps.children), _react.default.createElement(_styledComponents2.Button, (0, _extends2.default)({}, confirmButtonProps, {
    onClick: confirm
  }), confirmButtonProps.children)));
};

exports.ModalFooter = ModalFooter;

var ModalDialog =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ModalDialog, _Component);

  function ModalDialog() {
    (0, _classCallCheck2.default)(this, ModalDialog);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ModalDialog).apply(this, arguments));
  }

  (0, _createClass2.default)(ModalDialog, [{
    key: "render",
    value: function render() {
      var props = this.props;
      return _react.default.createElement(_reactModal.default, (0, _extends2.default)({}, props, {
        ariaHideApp: false,
        style: {
          overlay: (0, _objectSpread2.default)({
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 10000,
            overflowY: 'auto',
            position: 'absolute'
          }, props.style)
        }
      }), _react.default.createElement(ModalContentWrapper, {
        className: "modal--content",
        cssStyle: props.cssStyle,
        footer: props.footer
      }, props.close && _react.default.createElement(CloseButton, {
        className: "modal--close",
        onClick: props.close
      }, _react.default.createElement(_icons.Delete, {
        height: "14px"
      })), _react.default.createElement("div", {
        style: {
          padding: '0px 72px'
        }
      }, props.title && _react.default.createElement(ModalTitle, {
        className: "modal--title"
      }, props.title), _react.default.createElement(ModalContent, {
        className: "content"
      }, props.children), props.footer && _react.default.createElement(ModalFooter, {
        cancel: props.close,
        confirm: props.onConfirm,
        cancelButton: props.cancelButton,
        confirmButton: props.confirmButton
      }))));
    }
  }]);
  return ModalDialog;
}(_react.Component);

(0, _defineProperty2.default)(ModalDialog, "propTypes", {
  footer: _propTypes.default.bool,
  close: _propTypes.default.func.isRequired,
  onConfirm: _propTypes.default.func,
  onCancel: _propTypes.default.func,
  confirmButton: _propTypes.default.object,
  confirmButtonLabel: _propTypes.default.string,
  cancelButton: _propTypes.default.object,
  cancelButtonLabel: _propTypes.default.string,
  cssStyle: _propTypes.default.arrayOf(_propTypes.default.any)
});
(0, _defineProperty2.default)(ModalDialog, "defaultProps", {
  footer: false,
  close: function close() {},
  onConfirm: function onConfirm() {},
  onCancel: function onCancel() {},
  cancelButton: defaultCancelButton,
  confirmButton: defaultConfirmButton,
  cssStyle: []
});
var StyledModal = (0, _styledComponents.default)(ModalDialog)(_templateObject7(), function (props) {
  return props.theme.transition;
});
var _default = StyledModal;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9tb2RhbC5qcyJdLCJuYW1lcyI6WyJNb2RhbENvbnRlbnRXcmFwcGVyIiwic3R5bGVkIiwiZGl2IiwicHJvcHMiLCJ0aGVtZSIsInRyYW5zaXRpb24iLCJsYWJlbENvbG9yTFQiLCJjc3NTdHlsZSIsIkNsb3NlQnV0dG9uIiwidGl0bGVDb2xvckxUIiwiTW9kYWxUaXRsZSIsIm1vZGFsVGl0bGVGb250U2l6ZSIsIm1vZGFsVGl0bGVDb2xvciIsIlN0eWxlZE1vZGFsRm9vdGVyIiwiTW9kYWxDb250ZW50IiwiRm9vdGVyQWN0aW9uV3JhcHBlciIsImRlZmF1bHRDYW5jZWxCdXR0b24iLCJsaW5rIiwibGFyZ2UiLCJjaGlsZHJlbiIsImRlZmF1bHRDb25maXJtQnV0dG9uIiwid2lkdGgiLCJNb2RhbEZvb3RlciIsImNhbmNlbCIsImNvbmZpcm0iLCJjYW5jZWxCdXR0b24iLCJjb25maXJtQnV0dG9uIiwiY2FuY2VsQnV0dG9uUHJvcHMiLCJjb25maXJtQnV0dG9uUHJvcHMiLCJNb2RhbERpYWxvZyIsIm92ZXJsYXkiLCJiYWNrZ3JvdW5kQ29sb3IiLCJ6SW5kZXgiLCJvdmVyZmxvd1kiLCJwb3NpdGlvbiIsInN0eWxlIiwiZm9vdGVyIiwiY2xvc2UiLCJwYWRkaW5nIiwidGl0bGUiLCJvbkNvbmZpcm0iLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJib29sIiwiZnVuYyIsImlzUmVxdWlyZWQiLCJvbkNhbmNlbCIsIm9iamVjdCIsImNvbmZpcm1CdXR0b25MYWJlbCIsInN0cmluZyIsImNhbmNlbEJ1dHRvbkxhYmVsIiwiYXJyYXlPZiIsImFueSIsIlN0eWxlZE1vZGFsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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LEVBQUVOLG1CQUFVTyxNQU5iO0FBT2pCeEIsRUFBQUEsWUFBWSxFQUFFaUIsbUJBQVVLLE1BUFA7QUFRakJHLEVBQUFBLGlCQUFpQixFQUFFUixtQkFBVU8sTUFSWjtBQVNqQjFDLEVBQUFBLFFBQVEsRUFBRW1DLG1CQUFVUyxPQUFWLENBQWtCVCxtQkFBVVUsR0FBNUI7QUFUTyxDOzhCQURmdkIsVyxrQkFha0I7QUFDcEJPLEVBQUFBLE1BQU0sRUFBRSxLQURZO0FBRXBCQyxFQUFBQSxLQUFLLEVBQUUsaUJBQU0sQ0FBRSxDQUZLO0FBR3BCRyxFQUFBQSxTQUFTLEVBQUUscUJBQU0sQ0FBRSxDQUhDO0FBSXBCTSxFQUFBQSxRQUFRLEVBQUUsb0JBQU0sQ0FBRSxDQUpFO0FBS3BCckIsRUFBQUEsWUFBWSxFQUFFVCxtQkFMTTtBQU1wQlUsRUFBQUEsYUFBYSxFQUFFTixvQkFOSztBQU9wQmIsRUFBQUEsUUFBUSxFQUFFO0FBUFUsQztBQTBEeEIsSUFBTThDLFdBQVcsR0FBRywrQkFBT3hCLFdBQVAsQ0FBSCxxQkFNRCxVQUFBMUIsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZQyxVQUFoQjtBQUFBLENBTkosQ0FBakI7ZUFhZWdELFciLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IE1vZGFsIGZyb20gJ3JlYWN0LW1vZGFsJztcbmltcG9ydCB7RGVsZXRlfSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9pY29ucyc7XG5pbXBvcnQge0J1dHRvbn0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5jb25zdCBNb2RhbENvbnRlbnRXcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgd2lkdGg6IDYwJTtcbiAgbWF4LXdpZHRoOiA5NjBweDtcbiAgcGFkZGluZzogMjRweCAyNHB4IDQwcHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA5MnB4O1xuICBsZWZ0OiAwO1xuICByaWdodDogMDtcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgdHJhbnNpdGlvbjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50cmFuc2l0aW9ufTtcbiAgbWluLXdpZHRoOiA2MDBweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICBmb250LXNpemU6IDEycHg7XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmxhYmVsQ29sb3JMVH07XG4gICR7cHJvcHMgPT4gcHJvcHMuY3NzU3R5bGUgfHwgJyd9O1xuYDtcblxuY29uc3QgQ2xvc2VCdXR0b24gPSBzdHlsZWQuZGl2YFxuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50aXRsZUNvbG9yTFR9O1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICB6LWluZGV4OiAxMDAwNTtcblxuICA6aG92ZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IE1vZGFsVGl0bGUgPSBzdHlsZWQuZGl2YFxuICBmb250LXNpemU6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubW9kYWxUaXRsZUZvbnRTaXplfTtcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubW9kYWxUaXRsZUNvbG9yfTtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB6LWluZGV4OiAxMDAwMztcbmA7XG5cbmNvbnN0IFN0eWxlZE1vZGFsRm9vdGVyID0gc3R5bGVkLmRpdmBcbiAgd2lkdGg6IDEwMCU7XG4gIGxlZnQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgcGFkZGluZy10b3A6IDM2cHg7XG4gIHotaW5kZXg6IDEwMDAxO1xuYDtcblxuY29uc3QgTW9kYWxDb250ZW50ID0gc3R5bGVkLmRpdmBcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB6LWluZGV4OiAxMDAwMjtcbmA7XG5cbmNvbnN0IEZvb3RlckFjdGlvbldyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuYDtcblxuY29uc3QgZGVmYXVsdENhbmNlbEJ1dHRvbiA9IHtcbiAgbGluazogdHJ1ZSxcbiAgbGFyZ2U6IHRydWUsXG4gIGNoaWxkcmVuOiAnQ2FuY2VsJ1xufTtcblxuY29uc3QgZGVmYXVsdENvbmZpcm1CdXR0b24gPSB7XG4gIGxhcmdlOiB0cnVlLFxuICB3aWR0aDogJzE2MHB4JyxcbiAgY2hpbGRyZW46ICdDb25maXJtJ1xufTtcblxuZXhwb3J0IGNvbnN0IE1vZGFsRm9vdGVyID0gKHtcbiAgY2FuY2VsLFxuICBjb25maXJtLFxuICBjYW5jZWxCdXR0b24sXG4gIGNvbmZpcm1CdXR0b25cbn0pID0+IHtcbiAgY29uc3QgY2FuY2VsQnV0dG9uUHJvcHMgPSB7Li4uZGVmYXVsdENhbmNlbEJ1dHRvbiwgLi4uY2FuY2VsQnV0dG9ufTtcbiAgY29uc3QgY29uZmlybUJ1dHRvblByb3BzID0gey4uLmRlZmF1bHRDb25maXJtQnV0dG9uLCAuLi5jb25maXJtQnV0dG9ufTtcbiAgcmV0dXJuIChcbiAgICA8U3R5bGVkTW9kYWxGb290ZXIgY2xhc3NOYW1lPVwibW9kYWwtLWZvb3RlclwiPlxuICAgICAgPEZvb3RlckFjdGlvbldyYXBwZXI+XG4gICAgICAgIDxCdXR0b24gey4uLmNhbmNlbEJ1dHRvblByb3BzfSBvbkNsaWNrPXtjYW5jZWx9PlxuICAgICAgICAgIHtjYW5jZWxCdXR0b25Qcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDxCdXR0b24gey4uLmNvbmZpcm1CdXR0b25Qcm9wc30gb25DbGljaz17Y29uZmlybX0+XG4gICAgICAgICAge2NvbmZpcm1CdXR0b25Qcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICA8L0Zvb3RlckFjdGlvbldyYXBwZXI+XG4gICAgPC9TdHlsZWRNb2RhbEZvb3Rlcj5cbiAgKTtcbn07XG5cbmNsYXNzIE1vZGFsRGlhbG9nIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBmb290ZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIGNsb3NlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uQ29uZmlybTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DYW5jZWw6IFByb3BUeXBlcy5mdW5jLFxuICAgIGNvbmZpcm1CdXR0b246IFByb3BUeXBlcy5vYmplY3QsXG4gICAgY29uZmlybUJ1dHRvbkxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNhbmNlbEJ1dHRvbjogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBjYW5jZWxCdXR0b25MYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjc3NTdHlsZTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSlcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGZvb3RlcjogZmFsc2UsXG4gICAgY2xvc2U6ICgpID0+IHt9LFxuICAgIG9uQ29uZmlybTogKCkgPT4ge30sXG4gICAgb25DYW5jZWw6ICgpID0+IHt9LFxuICAgIGNhbmNlbEJ1dHRvbjogZGVmYXVsdENhbmNlbEJ1dHRvbixcbiAgICBjb25maXJtQnV0dG9uOiBkZWZhdWx0Q29uZmlybUJ1dHRvbixcbiAgICBjc3NTdHlsZTogW11cbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge3Byb3BzfSA9IHRoaXM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxNb2RhbFxuICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgIGFyaWFIaWRlQXBwPXtmYWxzZX1cbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBvdmVybGF5OiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsIDAsIDAsIDAuNSknLFxuICAgICAgICAgICAgekluZGV4OiAxMDAwMCxcbiAgICAgICAgICAgIG92ZXJmbG93WTogJ2F1dG8nLFxuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAvLyBpbiBjYXNlIHdlIHdhbnQgdG8gb3ZlcnJpZGUgdGhlIG1vZGFsIGRpYWxvZyBzdHlsZVxuICAgICAgICAgICAgLi4ucHJvcHMuc3R5bGVcbiAgICAgICAgICB9XG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxNb2RhbENvbnRlbnRXcmFwcGVyXG4gICAgICAgICAgY2xhc3NOYW1lPVwibW9kYWwtLWNvbnRlbnRcIlxuICAgICAgICAgIGNzc1N0eWxlPXtwcm9wcy5jc3NTdHlsZX1cbiAgICAgICAgICBmb290ZXI9e3Byb3BzLmZvb3Rlcn1cbiAgICAgICAgPlxuICAgICAgICAgIHtwcm9wcy5jbG9zZSAmJiAoXG4gICAgICAgICAgICA8Q2xvc2VCdXR0b24gY2xhc3NOYW1lPVwibW9kYWwtLWNsb3NlXCIgb25DbGljaz17cHJvcHMuY2xvc2V9PlxuICAgICAgICAgICAgICA8RGVsZXRlIGhlaWdodD1cIjE0cHhcIiAvPlxuICAgICAgICAgICAgPC9DbG9zZUJ1dHRvbj5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxkaXYgc3R5bGU9e3twYWRkaW5nOiAnMHB4IDcycHgnfX0+XG4gICAgICAgICAgICB7cHJvcHMudGl0bGUgJiYgKFxuICAgICAgICAgICAgICA8TW9kYWxUaXRsZSBjbGFzc05hbWU9XCJtb2RhbC0tdGl0bGVcIj57cHJvcHMudGl0bGV9PC9Nb2RhbFRpdGxlPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxNb2RhbENvbnRlbnQgY2xhc3NOYW1lPVwiY29udGVudFwiPntwcm9wcy5jaGlsZHJlbn08L01vZGFsQ29udGVudD5cbiAgICAgICAgICAgIHtwcm9wcy5mb290ZXIgJiYgKFxuICAgICAgICAgICAgICA8TW9kYWxGb290ZXJcbiAgICAgICAgICAgICAgICBjYW5jZWw9e3Byb3BzLmNsb3NlfVxuICAgICAgICAgICAgICAgIGNvbmZpcm09e3Byb3BzLm9uQ29uZmlybX1cbiAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b249e3Byb3BzLmNhbmNlbEJ1dHRvbn1cbiAgICAgICAgICAgICAgICBjb25maXJtQnV0dG9uPXtwcm9wcy5jb25maXJtQnV0dG9ufVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8L01vZGFsQ29udGVudFdyYXBwZXI+XG4gICAgICA8L01vZGFsPlxuICAgICk7XG4gIH1cbn1cblxuY29uc3QgU3R5bGVkTW9kYWwgPSBzdHlsZWQoTW9kYWxEaWFsb2cpYFxuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHotaW5kZXg6IDEwMDAwO1xuICB0cmFuc2l0aW9uOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRyYW5zaXRpb259O1xuXG4gIDpmb2N1cyB7XG4gICAgb3V0bGluZTogMFxuICB9XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBTdHlsZWRNb2RhbDtcbiJdfQ==