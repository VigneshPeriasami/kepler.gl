"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _delete = _interopRequireDefault(require("../icons/delete"));

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  ", "\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin-right: 10px;\n  text-overflow: ellipsis;\n  width: 100%;\n  overflow: hidden;\n\n  :hover {\n    overflow: visible;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  background: ", ";\n  border-radius: 1px;\n  color: ", ";\n  font-size: 11px;\n  line-height: 20px;\n  margin: 3px 10px 3px 3px;\n  padding: 4px 6px;\n  display: flex;\n  align-items: center;\n  max-width: calc(100% - 8px);\n\n  :hover {\n    color: ", ";\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var propTypes = {
  // required properties
  onClick: _propTypes.default.func.isRequired,
  removeItem: _propTypes.default.func.isRequired,
  // optional properties
  selectedItems: _propTypes.default.arrayOf(_propTypes.default.any),
  disabled: _propTypes.default.bool,
  displayOption: _propTypes.default.func,
  focus: _propTypes.default.bool,
  error: _propTypes.default.bool,
  placeholder: _propTypes.default.string
};

var ChickletButton = _styledComponents.default.div(_templateObject(), function (props) {
  return props.theme.panelActiveBg;
}, function (props) {
  return props.theme.textColor;
}, function (props) {
  return props.theme.textColorHl;
});

var ChickletTag = _styledComponents.default.span(_templateObject2());

var Chicklet = function Chicklet(_ref) {
  var disabled = _ref.disabled,
      name = _ref.name,
      remove = _ref.remove;
  return _react.default.createElement(ChickletButton, null, _react.default.createElement(ChickletTag, null, name), _react.default.createElement(_delete.default, {
    height: "10px",
    onClick: disabled ? null : remove
  }));
};

var ChickletedInputContainer = _styledComponents.default.div(_templateObject3(), function (props) {
  return props.theme.chickletedInput;
});

var ChickletedInput = function ChickletedInput(_ref2) {
  var focus = _ref2.focus,
      disabled = _ref2.disabled,
      error = _ref2.error,
      onClick = _ref2.onClick,
      className = _ref2.className,
      _ref2$selectedItems = _ref2.selectedItems,
      selectedItems = _ref2$selectedItems === void 0 ? [] : _ref2$selectedItems,
      _ref2$placeholder = _ref2.placeholder,
      placeholder = _ref2$placeholder === void 0 ? '' : _ref2$placeholder,
      removeItem = _ref2.removeItem,
      _ref2$displayOption = _ref2.displayOption,
      displayOption = _ref2$displayOption === void 0 ? function (d) {
    return d;
  } : _ref2$displayOption;
  return _react.default.createElement(ChickletedInputContainer, {
    className: "".concat(className, " chickleted-input"),
    focus: focus,
    disabled: disabled,
    error: error,
    onClick: onClick
  }, selectedItems.length > 0 ? selectedItems.map(function (item, i) {
    return _react.default.createElement(Chicklet, {
      disabled: disabled,
      key: "".concat(displayOption(item), "_").concat(i),
      name: displayOption(item),
      remove: function remove(e) {
        return removeItem(item, e);
      }
    });
  }) : placeholder);
};

ChickletedInput.propTypes = propTypes;
var _default = ChickletedInput;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9pdGVtLXNlbGVjdG9yL2NoaWNrbGV0ZWQtaW5wdXQuanMiXSwibmFtZXMiOlsicHJvcFR5cGVzIiwib25DbGljayIsIlByb3BUeXBlcyIsImZ1bmMiLCJpc1JlcXVpcmVkIiwicmVtb3ZlSXRlbSIsInNlbGVjdGVkSXRlbXMiLCJhcnJheU9mIiwiYW55IiwiZGlzYWJsZWQiLCJib29sIiwiZGlzcGxheU9wdGlvbiIsImZvY3VzIiwiZXJyb3IiLCJwbGFjZWhvbGRlciIsInN0cmluZyIsIkNoaWNrbGV0QnV0dG9uIiwic3R5bGVkIiwiZGl2IiwicHJvcHMiLCJ0aGVtZSIsInBhbmVsQWN0aXZlQmciLCJ0ZXh0Q29sb3IiLCJ0ZXh0Q29sb3JIbCIsIkNoaWNrbGV0VGFnIiwic3BhbiIsIkNoaWNrbGV0IiwibmFtZSIsInJlbW92ZSIsIkNoaWNrbGV0ZWRJbnB1dENvbnRhaW5lciIsImNoaWNrbGV0ZWRJbnB1dCIsIkNoaWNrbGV0ZWRJbnB1dCIsImNsYXNzTmFtZSIsImQiLCJsZW5ndGgiLCJtYXAiLCJpdGVtIiwiaSIsImUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFNBQVMsR0FBRztBQUNoQjtBQUNBQyxFQUFBQSxPQUFPLEVBQUVDLG1CQUFVQyxJQUFWLENBQWVDLFVBRlI7QUFHaEJDLEVBQUFBLFVBQVUsRUFBRUgsbUJBQVVDLElBQVYsQ0FBZUMsVUFIWDtBQUtoQjtBQUNBRSxFQUFBQSxhQUFhLEVBQUVKLG1CQUFVSyxPQUFWLENBQWtCTCxtQkFBVU0sR0FBNUIsQ0FOQztBQU9oQkMsRUFBQUEsUUFBUSxFQUFFUCxtQkFBVVEsSUFQSjtBQVFoQkMsRUFBQUEsYUFBYSxFQUFFVCxtQkFBVUMsSUFSVDtBQVNoQlMsRUFBQUEsS0FBSyxFQUFFVixtQkFBVVEsSUFURDtBQVVo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ZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgRGVsZXRlIGZyb20gJy4uL2ljb25zL2RlbGV0ZSc7XG5cbmNvbnN0IHByb3BUeXBlcyA9IHtcbiAgLy8gcmVxdWlyZWQgcHJvcGVydGllc1xuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICByZW1vdmVJdGVtOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8vIG9wdGlvbmFsIHByb3BlcnRpZXNcbiAgc2VsZWN0ZWRJdGVtczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSksXG4gIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgZGlzcGxheU9wdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gIGZvY3VzOiBQcm9wVHlwZXMuYm9vbCxcbiAgZXJyb3I6IFByb3BUeXBlcy5ib29sLFxuICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZ1xufTtcblxuY29uc3QgQ2hpY2tsZXRCdXR0b24gPSBzdHlsZWQuZGl2YFxuICBiYWNrZ3JvdW5kOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsQWN0aXZlQmd9O1xuICBib3JkZXItcmFkaXVzOiAxcHg7XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvcn07XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgbGluZS1oZWlnaHQ6IDIwcHg7XG4gIG1hcmdpbjogM3B4IDEwcHggM3B4IDNweDtcbiAgcGFkZGluZzogNHB4IDZweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWF4LXdpZHRoOiBjYWxjKDEwMCUgLSA4cHgpO1xuXG4gIDpob3ZlciB7XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9ySGx9O1xuICB9XG5gO1xuXG5jb25zdCBDaGlja2xldFRhZyA9IHN0eWxlZC5zcGFuYFxuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICB3aWR0aDogMTAwJTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcblxuICA6aG92ZXIge1xuICAgIG92ZXJmbG93OiB2aXNpYmxlO1xuICB9XG5gO1xuXG5jb25zdCBDaGlja2xldCA9ICh7ZGlzYWJsZWQsIG5hbWUsIHJlbW92ZX0pID0+IChcbiAgPENoaWNrbGV0QnV0dG9uPlxuICAgIDxDaGlja2xldFRhZz57bmFtZX08L0NoaWNrbGV0VGFnPlxuICAgIDxEZWxldGUgaGVpZ2h0PVwiMTBweFwiIG9uQ2xpY2s9e2Rpc2FibGVkID8gbnVsbCA6IHJlbW92ZX0gLz5cbiAgPC9DaGlja2xldEJ1dHRvbj5cbik7XG5cbmNvbnN0IENoaWNrbGV0ZWRJbnB1dENvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuY2hpY2tsZXRlZElucHV0fVxuYDtcblxuY29uc3QgQ2hpY2tsZXRlZElucHV0ID0gKHtcbiAgZm9jdXMsXG4gIGRpc2FibGVkLFxuICBlcnJvcixcbiAgb25DbGljayxcbiAgY2xhc3NOYW1lLFxuICBzZWxlY3RlZEl0ZW1zID0gW10sXG4gIHBsYWNlaG9sZGVyID0gJycsXG4gIHJlbW92ZUl0ZW0sXG4gIGRpc3BsYXlPcHRpb24gPSBkID0+IGRcbn0pID0+IChcbiAgPENoaWNrbGV0ZWRJbnB1dENvbnRhaW5lclxuICAgIGNsYXNzTmFtZT17YCR7Y2xhc3NOYW1lfSBjaGlja2xldGVkLWlucHV0YH1cbiAgICBmb2N1cz17Zm9jdXN9XG4gICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgIGVycm9yPXtlcnJvcn1cbiAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICA+XG4gICAge3NlbGVjdGVkSXRlbXMubGVuZ3RoID4gMFxuICAgICAgPyBzZWxlY3RlZEl0ZW1zLm1hcCgoaXRlbSwgaSkgPT4gKFxuICAgICAgICAgIDxDaGlja2xldFxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAga2V5PXtgJHtkaXNwbGF5T3B0aW9uKGl0ZW0pfV8ke2l9YH1cbiAgICAgICAgICAgIG5hbWU9e2Rpc3BsYXlPcHRpb24oaXRlbSl9XG4gICAgICAgICAgICByZW1vdmU9e2UgPT4gcmVtb3ZlSXRlbShpdGVtLCBlKX1cbiAgICAgICAgICAvPlxuICAgICAgICApKVxuICAgICAgOiBwbGFjZWhvbGRlcn1cbiAgPC9DaGlja2xldGVkSW5wdXRDb250YWluZXI+XG4pO1xuXG5DaGlja2xldGVkSW5wdXQucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xuXG5leHBvcnQgZGVmYXVsdCBDaGlja2xldGVkSW5wdXQ7XG4iXX0=