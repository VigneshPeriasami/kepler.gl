"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

var _exportImageUtils = require("../../utils/export-image-utils");

var _defaultSettings = require("../../constants/default-settings");

var _loadingSpinner = _interopRequireDefault(require("../common/loading-spinner"));

var _styledComponents2 = require("../common/styled-components");

var _switch = _interopRequireDefault(require("../common/switch"));

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  border-radius: 2px;\n  border: 1px solid ", ";\n  color: ", ";\n  cursor: pointer;\n  font-weight: 500;\n  margin-right: 6px;\n  padding: 6px 10px;\n\n  :hover {\n    color: ", ";\n    border: 1px solid ", ";\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  justify-content: center;\n  padding: 30px;\n\n  .dimension, .instruction {\n    padding: 8px 0px;\n  }\n\n  .preview-image {\n    background: #e2e2e2;\n    border-radius: 4px;\n    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.18);\n    width: 100%;\n    padding-bottom: ", ";\n    position: relative;\n  }\n\n  .preview-image-placeholder {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n\n  .preview-image-spinner {\n    position: absolute;\n    left: calc(50% - 25px);\n    top: calc(50% - 25px);\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  width: 250px;\n\n  .image-option-section {\n    .image-option-section-title {\n      font-weight: 500;\n      font-size: 14px;\n    }\n  }\n\n  .button-list {\n    display: flex;\n    flex-direction: row;\n    padding: 8px 0px;\n  }\n\n  input {\n    margin-right: 8px;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var ImageOptionList = _styledComponents.default.div(_templateObject());

var PreviewImageSection = _styledComponents.default.div(_templateObject2(), function (props) {
  return props.ratio === _defaultSettings.RATIOS.SCREEN ? "".concat(100 * props.height / props.width, "%") : props.ratio === _defaultSettings.RATIOS.SIXTEEN_BY_NINE ? '56.25%' : '75%';
});

var Button = _styledComponents.default.div(_templateObject3(), function (props) {
  return props.selected ? props.theme.primaryBtnBgd : props.theme.selectBorderColorLT;
}, function (props) {
  return props.selected ? props.theme.primaryBtnBgd : props.theme.selectBorderColorLT;
}, function (props) {
  return props.available && props.theme.primaryBtnBgd;
}, function (props) {
  return props.available && props.theme.primaryBtnBgd;
});

var ExportImageModal =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ExportImageModal, _Component);

  function ExportImageModal() {
    (0, _classCallCheck2.default)(this, ExportImageModal);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ExportImageModal).apply(this, arguments));
  }

  (0, _createClass2.default)(ExportImageModal, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          height = _this$props.height,
          legend = _this$props.legend,
          ratio = _this$props.ratio,
          resolution = _this$props.resolution,
          width = _this$props.width,
          exporting = _this$props.exporting,
          imageDataUri = _this$props.imageDataUri,
          onChangeRatio = _this$props.onChangeRatio,
          onChangeResolution = _this$props.onChangeResolution,
          onToggleLegend = _this$props.onToggleLegend;
      var exportImageSize = (0, _exportImageUtils.calculateExportImageSize)({
        width: width,
        height: height,
        ratio: ratio,
        resolution: resolution
      });
      return _react.default.createElement("div", {
        className: "export-image-modal"
      }, _react.default.createElement(_styledComponents2.StyledModalContent, null, _react.default.createElement(ImageOptionList, null, _react.default.createElement("div", {
        className: "image-option-section"
      }, _react.default.createElement("div", {
        className: "image-option-section-title"
      }, "Ratio"), "Choose the ratio for various usages.", _react.default.createElement("div", {
        className: "button-list"
      }, _defaultSettings.RATIO_OPTIONS.map(function (op) {
        return _react.default.createElement(Button, {
          key: op.id,
          selected: ratio === op.id,
          onClick: function onClick() {
            return onChangeRatio({
              ratio: op.id
            });
          }
        }, op.label);
      }))), _react.default.createElement("div", {
        className: "image-option-section"
      }, _react.default.createElement("div", {
        className: "image-option-section-title"
      }, "Resolution"), "High resolution is better for prints.", _react.default.createElement("div", {
        className: "button-list"
      }, _defaultSettings.RESOLUTION_OPTIONS.map(function (op) {
        return _react.default.createElement(Button, {
          key: op.id,
          selected: resolution === op.id,
          onClick: function onClick() {
            return op.available && onChangeResolution({
              resolution: op.id
            });
          }
        }, op.label);
      }))), _react.default.createElement("div", {
        className: "image-option-section"
      }, _react.default.createElement("div", {
        className: "image-option-section-title"
      }, "Map Legend"), _react.default.createElement(_switch.default, {
        type: "checkbox",
        id: "add-map-legend",
        checked: legend,
        label: "Add legend on map",
        onChange: onToggleLegend
      }))), _react.default.createElement(PreviewImageSection, {
        ratio: ratio,
        width: width,
        height: height
      }, _react.default.createElement("div", {
        className: "dimension"
      }, "".concat(exportImageSize.width, " x ").concat(exportImageSize.height)), _react.default.createElement("div", {
        className: "preview-image"
      }, exporting ? _react.default.createElement("div", {
        className: "preview-image-spinner"
      }, _react.default.createElement(_loadingSpinner.default, null)) : _react.default.createElement("img", {
        className: "preview-image-placeholder",
        src: imageDataUri
      })))));
    }
  }]);
  return ExportImageModal;
}(_react.Component);

(0, _defineProperty2.default)(ExportImageModal, "propTypes", {
  height: _propTypes.default.number.isRequired,
  ratio: _propTypes.default.string.isRequired,
  resolution: _propTypes.default.string.isRequired,
  width: _propTypes.default.number.isRequired,
  exporting: _propTypes.default.bool.isRequired,
  imageDataUri: _propTypes.default.string,
  // callbacks
  onChangeRatio: _propTypes.default.func.isRequired,
  onChangeResolution: _propTypes.default.func.isRequired,
  onToggleLegend: _propTypes.default.func.isRequired
});

var ExportImageModalFactory = function ExportImageModalFactory() {
  return ExportImageModal;
};

var _default = ExportImageModalFactory;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZGFscy9leHBvcnQtaW1hZ2UtbW9kYWwuanMiXSwibmFtZXMiOlsiSW1hZ2VPcHRpb25MaXN0Iiwic3R5bGVkIiwiZGl2IiwiUHJldmlld0ltYWdlU2VjdGlvbiIsInByb3BzIiwicmF0aW8iLCJSQVRJT1MiLCJTQ1JFRU4iLCJoZWlnaHQiLCJ3aWR0aCIsIlNJWFRFRU5fQllfTklORSIsIkJ1dHRvbiIsInNlbGVjdGVkIiwidGhlbWUiLCJwcmltYXJ5QnRuQmdkIiwic2VsZWN0Qm9yZGVyQ29sb3JMVCIsImF2YWlsYWJsZSIsIkV4cG9ydEltYWdlTW9kYWwiLCJsZWdlbmQiLCJyZXNvbHV0aW9uIiwiZXhwb3J0aW5nIiwiaW1hZ2VEYXRhVXJpIiwib25DaGFuZ2VSYXRpbyIsIm9uQ2hhbmdlUmVzb2x1dGlvbiIsIm9uVG9nZ2xlTGVnZW5kIiwiZXhwb3J0SW1hZ2VTaXplIiwiUkFUSU9fT1BUSU9OUyIsIm1hcCIsIm9wIiwiaWQiLCJsYWJlbCIsIlJFU09MVVRJT05fT1BUSU9OUyIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsIm51bWJlciIsImlzUmVxdWlyZWQiLCJzdHJpbmciLCJib29sIiwiZnVuYyIsIkV4cG9ydEltYWdlTW9kYWxGYWN0b3J5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUtBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGVBQWUsR0FBR0MsMEJBQU9DLEdBQVYsbUJBQXJCOztBQXdCQSxJQUFNQyxtQkFBbUIsR0FBR0YsMEJBQU9DLEdBQVYscUJBaUJILFVBQUFFLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sS0FBZ0JDLHdCQUFPQyxNQUF2QixhQUN0QixNQUFNSCxLQUFLLENBQUNJLE1BQVosR0FBbUJKLEtBQUssQ0FBQ0ssS0FESCxT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TUFBVixDQUFpQkQsVUFIWjtBQUlqQjFCLEVBQUFBLEtBQUssRUFBRXdCLG1CQUFVQyxNQUFWLENBQWlCQyxVQUpQO0FBS2pCZixFQUFBQSxTQUFTLEVBQUVhLG1CQUFVSSxJQUFWLENBQWVGLFVBTFQ7QUFNakJkLEVBQUFBLFlBQVksRUFBRVksbUJBQVVHLE1BTlA7QUFPakI7QUFDQWQsRUFBQUEsYUFBYSxFQUFFVyxtQkFBVUssSUFBVixDQUFlSCxVQVJiO0FBU2pCWixFQUFBQSxrQkFBa0IsRUFBRVUsbUJBQVVLLElBQVYsQ0FBZUgsVUFUbEI7QUFVakJYLEVBQUFBLGNBQWMsRUFBRVMsbUJBQVVLLElBQVYsQ0FBZUg7QUFWZCxDOztBQTBGckIsSUFBTUksdUJBQXVCLEdBQUcsU0FBMUJBLHVCQUEwQjtBQUFBLFNBQU10QixnQkFBTjtBQUFBLENBQWhDOztlQUNlc0IsdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHtjYWxjdWxhdGVFeHBvcnRJbWFnZVNpemV9IGZyb20gJ3V0aWxzL2V4cG9ydC1pbWFnZS11dGlscyc7XG5pbXBvcnQge1xuICBSQVRJT19PUFRJT05TLFxuICBSQVRJT1MsXG4gIFJFU09MVVRJT05fT1BUSU9OU1xufSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5pbXBvcnQgTG9hZGluZ1NwaW5uZXIgZnJvbSAnY29tcG9uZW50cy9jb21tb24vbG9hZGluZy1zcGlubmVyJztcbmltcG9ydCB7U3R5bGVkTW9kYWxDb250ZW50fSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgU3dpdGNoIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N3aXRjaCc7XG5cbmNvbnN0IEltYWdlT3B0aW9uTGlzdCA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICB3aWR0aDogMjUwcHg7XG5cbiAgLmltYWdlLW9wdGlvbi1zZWN0aW9uIHtcbiAgICAuaW1hZ2Utb3B0aW9uLXNlY3Rpb24tdGl0bGUge1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICB9XG4gIH1cblxuICAuYnV0dG9uLWxpc3Qge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICBwYWRkaW5nOiA4cHggMHB4O1xuICB9XG5cbiAgaW5wdXQge1xuICAgIG1hcmdpbi1yaWdodDogOHB4O1xuICB9XG5gO1xuXG5jb25zdCBQcmV2aWV3SW1hZ2VTZWN0aW9uID0gc3R5bGVkLmRpdmBcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZmxleDogMTtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHBhZGRpbmc6IDMwcHg7XG5cbiAgLmRpbWVuc2lvbiwgLmluc3RydWN0aW9uIHtcbiAgICBwYWRkaW5nOiA4cHggMHB4O1xuICB9XG5cbiAgLnByZXZpZXctaW1hZ2Uge1xuICAgIGJhY2tncm91bmQ6ICNlMmUyZTI7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgIGJveC1zaGFkb3c6IDAgOHB4IDE2cHggMCByZ2JhKDAsMCwwLDAuMTgpO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIHBhZGRpbmctYm90dG9tOiAke3Byb3BzID0+IHByb3BzLnJhdGlvID09PSBSQVRJT1MuU0NSRUVOID9cbiAgICAgIGAkezEwMCAqIHByb3BzLmhlaWdodC9wcm9wcy53aWR0aH0lYDpcbiAgICAgIChwcm9wcy5yYXRpbyA9PT0gUkFUSU9TLlNJWFRFRU5fQllfTklORSA/ICc1Ni4yNSUnIDogJzc1JScpXG4gICAgfTtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIH1cblxuICAucHJldmlldy1pbWFnZS1wbGFjZWhvbGRlciB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgfVxuXG4gIC5wcmV2aWV3LWltYWdlLXNwaW5uZXIge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiBjYWxjKDUwJSAtIDI1cHgpO1xuICAgIHRvcDogY2FsYyg1MCUgLSAyNXB4KTtcbiAgfVxuYDtcblxuY29uc3QgQnV0dG9uID0gc3R5bGVkLmRpdmBcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAke3Byb3BzID0+IHByb3BzLnNlbGVjdGVkID8gcHJvcHMudGhlbWUucHJpbWFyeUJ0bkJnZCA6IHByb3BzLnRoZW1lLnNlbGVjdEJvcmRlckNvbG9yTFR9O1xuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy5zZWxlY3RlZCA/IHByb3BzLnRoZW1lLnByaW1hcnlCdG5CZ2QgOiBwcm9wcy50aGVtZS5zZWxlY3RCb3JkZXJDb2xvckxUfTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmb250LXdlaWdodDogNTAwO1xuICBtYXJnaW4tcmlnaHQ6IDZweDtcbiAgcGFkZGluZzogNnB4IDEwcHg7XG5cbiAgOmhvdmVyIHtcbiAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy5hdmFpbGFibGUgJiYgcHJvcHMudGhlbWUucHJpbWFyeUJ0bkJnZH07XG4gICAgYm9yZGVyOiAxcHggc29saWQgJHtwcm9wcyA9PiBwcm9wcy5hdmFpbGFibGUgJiYgcHJvcHMudGhlbWUucHJpbWFyeUJ0bkJnZH07XG4gIH1cbmA7XG5cbmNsYXNzIEV4cG9ydEltYWdlTW9kYWwgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgaGVpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgcmF0aW86IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICByZXNvbHV0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgd2lkdGg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICBleHBvcnRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaW1hZ2VEYXRhVXJpOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIC8vIGNhbGxiYWNrc1xuICAgIG9uQ2hhbmdlUmF0aW86IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25DaGFuZ2VSZXNvbHV0aW9uOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uVG9nZ2xlTGVnZW5kOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGhlaWdodCxcbiAgICAgIGxlZ2VuZCxcbiAgICAgIHJhdGlvLFxuICAgICAgcmVzb2x1dGlvbixcbiAgICAgIHdpZHRoLFxuICAgICAgZXhwb3J0aW5nLFxuICAgICAgaW1hZ2VEYXRhVXJpLFxuICAgICAgLy8gY2FsbGJhY2tzOlxuICAgICAgb25DaGFuZ2VSYXRpbyxcbiAgICAgIG9uQ2hhbmdlUmVzb2x1dGlvbixcbiAgICAgIG9uVG9nZ2xlTGVnZW5kXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBleHBvcnRJbWFnZVNpemUgPSBjYWxjdWxhdGVFeHBvcnRJbWFnZVNpemUoe1xuICAgICAgd2lkdGgsIGhlaWdodCwgcmF0aW8sIHJlc29sdXRpb25cbiAgICB9KTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImV4cG9ydC1pbWFnZS1tb2RhbFwiPlxuICAgICAgICA8U3R5bGVkTW9kYWxDb250ZW50PlxuICAgICAgICAgIDxJbWFnZU9wdGlvbkxpc3Q+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImltYWdlLW9wdGlvbi1zZWN0aW9uXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW1hZ2Utb3B0aW9uLXNlY3Rpb24tdGl0bGVcIj5SYXRpbzwvZGl2PlxuICAgICAgICAgICAgICBDaG9vc2UgdGhlIHJhdGlvIGZvciB2YXJpb3VzIHVzYWdlcy5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidXR0b24tbGlzdFwiPlxuICAgICAgICAgICAgICAgIHtSQVRJT19PUFRJT05TLm1hcChvcCA9PlxuICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBrZXk9e29wLmlkfVxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17cmF0aW8gPT09IG9wLmlkfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbkNoYW5nZVJhdGlvKHtyYXRpbzogb3AuaWR9KX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge29wLmxhYmVsfVxuICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW1hZ2Utb3B0aW9uLXNlY3Rpb25cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbWFnZS1vcHRpb24tc2VjdGlvbi10aXRsZVwiPlJlc29sdXRpb248L2Rpdj5cbiAgICAgICAgICAgICAgSGlnaCByZXNvbHV0aW9uIGlzIGJldHRlciBmb3IgcHJpbnRzLlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1dHRvbi1saXN0XCI+XG4gICAgICAgICAgICAgICAge1JFU09MVVRJT05fT1BUSU9OUy5tYXAob3AgPT5cbiAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAga2V5PXtvcC5pZH1cbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e3Jlc29sdXRpb24gPT09IG9wLmlkfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvcC5hdmFpbGFibGUgJiYgb25DaGFuZ2VSZXNvbHV0aW9uKHtyZXNvbHV0aW9uOiBvcC5pZH0pfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7b3AubGFiZWx9XG4gICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbWFnZS1vcHRpb24tc2VjdGlvblwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImltYWdlLW9wdGlvbi1zZWN0aW9uLXRpdGxlXCI+TWFwIExlZ2VuZDwvZGl2PlxuICAgICAgICAgICAgICA8U3dpdGNoIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgICAgaWQ9XCJhZGQtbWFwLWxlZ2VuZFwiXG4gICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17bGVnZW5kfVxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiQWRkIGxlZ2VuZCBvbiBtYXBcIlxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvblRvZ2dsZUxlZ2VuZH0vPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9JbWFnZU9wdGlvbkxpc3Q+XG4gICAgICAgICAgPFByZXZpZXdJbWFnZVNlY3Rpb24gcmF0aW89e3JhdGlvfSB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGltZW5zaW9uXCI+e2Ake2V4cG9ydEltYWdlU2l6ZS53aWR0aH0geCAke2V4cG9ydEltYWdlU2l6ZS5oZWlnaHR9YH08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJldmlldy1pbWFnZVwiPlxuICAgICAgICAgICAgICB7ZXhwb3J0aW5nID9cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByZXZpZXctaW1hZ2Utc3Bpbm5lclwiPjxMb2FkaW5nU3Bpbm5lciAvPjwvZGl2PiA6XG4gICAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJwcmV2aWV3LWltYWdlLXBsYWNlaG9sZGVyXCIgc3JjPXtpbWFnZURhdGFVcml9IC8+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvUHJldmlld0ltYWdlU2VjdGlvbj5cbiAgICAgICAgPC9TdHlsZWRNb2RhbENvbnRlbnQ+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmNvbnN0IEV4cG9ydEltYWdlTW9kYWxGYWN0b3J5ID0gKCkgPT4gRXhwb3J0SW1hZ2VNb2RhbDtcbmV4cG9ydCBkZWZhdWx0IEV4cG9ydEltYWdlTW9kYWxGYWN0b3J5O1xuIl19