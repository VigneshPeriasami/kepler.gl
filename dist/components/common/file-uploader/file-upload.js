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

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _uploadButton = _interopRequireDefault(require("./upload-button"));

var _icons = require("../icons");

var _loadingSpinner = _interopRequireDefault(require("../loading-spinner"));

var _utils = require("../../../utils/utils");

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n  bottom: 0;\n  padding: 10px 30px;\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  .filter-upload__input {\n    visibility: hidden;\n    height: 0;\n    position: absolute;\n  }\n\n  .file-drop {\n    position: relative;\n  }\n\n  .file-upload__message {\n    color: ", ";\n    font-size: 14px;\n    margin-bottom: 12px;\n  }\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  margin-bottom: 60px;\n\n  .file-type-row {\n    margin-bottom: 26px;\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  font-size: 20px;\n  height: 36px;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  background-color: white;\n  border-radius: 4px;\n  border-style: dashed;\n  border-width: 1px;\n  border-color: ", ";\n  height: 414px;\n  padding-top: 60px;\n  text-align: center;\n  width: 100%;\n\n  .file-upload-or {\n    color: ", ";\n    padding-right: 4px;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin-top: 10px;\n  color: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var FileDrop = typeof document !== 'undefined' ? require('react-file-drop') : null; // File.type is not reliable if the OS does not have a
// registered mapping for the extension.
// NOTE: Shapefiles must be in a compressed format since
// it requires multiple files to be present.

var defaultValidFileExt = ['csv', // 'tar.gz',
// 'tgz',
// 'zip',
// 'gpx',
// 'kml',
'json', 'geojson'];
var MESSAGE = ' Drag & Drop Your File(s) Here';
var CHROME_MSG = '*Chrome user: Limit file size to 250mb, if need to upload larger file, try Safari';
var DISCLAIMER = '*Kepler.gl is a client-side application with no server backend. Data lives only on your machine/browser. ' + 'No information or map data is sent to any server.';
var CONFIG_UPLOAD_MESSAGE = 'Upload data files or upload a saved map via previously exported single Json of both config and data';
var fileIconColor = '#D3D8E0';

var WarningMsg = _styledComponents.default.span(_templateObject(), function (props) {
  return props.theme.errorColor;
});

var PositiveMsg = _styledComponents.default.span(_templateObject2(), function (props) {
  return props.theme.primaryBtnActBgd;
});

var StyledFileDrop = _styledComponents.default.div(_templateObject3(), function (props) {
  return props.theme.subtextColorLT;
}, function (props) {
  return props.theme.linkBtnColor;
});

var MsgWrapper = _styledComponents.default.div(_templateObject4(), function (props) {
  return props.theme.modalTitleColor;
});

var StyledDragNDropIcon = _styledComponents.default.div(_templateObject5(), fileIconColor);

var StyledFileUpload = _styledComponents.default.div(_templateObject6(), function (props) {
  return props.theme.textColorLT;
});

var StyledMessage = _styledComponents.default.div(_templateObject7());

var StyledDisclaimer = StyledMessage.extend(_templateObject8());

var FileUpload =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(FileUpload, _Component);

  function FileUpload() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, FileUpload);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(FileUpload)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      dragOver: false,
      files: [],
      errorFiles: []
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_isValidFileType", function (filename) {
      var validFileExt = _this.props.validFileExt;
      var fileExt = validFileExt.find(function (ext) {
        return filename.endsWith(ext);
      });
      return Boolean(fileExt);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_handleFileDrop", function (files, e) {
      if (e) {
        e.stopPropagation();
      }

      var nextState = {
        files: [],
        errorFiles: [],
        dragOver: false
      };

      for (var i = 0; i < files.length; i++) {
        var file = files[i];

        if (file && _this._isValidFileType(file.name)) {
          nextState.files.push(file);
        } else {
          nextState.errorFiles.push(file.name);
        }
      }

      _this.setState(nextState, function () {
        return nextState.files.length ? _this.props.onFileUpload(nextState.files) : null;
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_toggleDragState", function (newState) {
      _this.setState({
        dragOver: newState
      });
    });
    return _this;
  }

  (0, _createClass2.default)(FileUpload, [{
    key: "_renderMessage",
    value: function _renderMessage() {
      var _this$state = this.state,
          errorFiles = _this$state.errorFiles,
          files = _this$state.files;

      if (errorFiles.length) {
        return _react.default.createElement(WarningMsg, null, "File ".concat(errorFiles.join(', '), " is not supported."));
      }

      if (!files.length) {
        return null;
      }

      return _react.default.createElement(StyledMessage, {
        className: "file-uploader__message"
      }, _react.default.createElement("div", null, "Uploading..."), _react.default.createElement(PositiveMsg, null, "".concat(files.map(function (f) {
        return f.name;
      }).join(' and '), "...")), _react.default.createElement(_loadingSpinner.default, {
        size: 20
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state2 = this.state,
          dragOver = _this$state2.dragOver,
          files = _this$state2.files;
      var validFileExt = this.props.validFileExt;
      return _react.default.createElement(StyledFileUpload, {
        className: "file-uploader",
        innerRef: function innerRef(cmp) {
          return _this2.frame = cmp;
        }
      }, _react.default.createElement("input", {
        className: "filter-upload__input",
        type: "file",
        onChange: this._onChange
      }), FileDrop ? _react.default.createElement(FileDrop, {
        frame: this.frame,
        targetAlwaysVisible: true,
        onDragOver: function onDragOver() {
          return _this2._toggleDragState(true);
        },
        onDragLeave: function onDragLeave() {
          return _this2._toggleDragState(false);
        },
        onDrop: this._handleFileDrop
      }, _react.default.createElement("div", {
        className: "file-upload__message"
      }, CONFIG_UPLOAD_MESSAGE), _react.default.createElement(StyledFileDrop, {
        dragOver: dragOver
      }, _react.default.createElement("div", {
        style: {
          opacity: dragOver ? 0.5 : 1
        }
      }, _react.default.createElement(StyledDragNDropIcon, null, _react.default.createElement("div", {
        className: "file-type-row"
      }, validFileExt.map(function (ext) {
        return _react.default.createElement(_icons.FileType, {
          key: ext,
          ext: ext,
          height: "50px",
          fontSize: "9px"
        });
      })), _react.default.createElement(_icons.DragNDrop, {
        height: "44px"
      })), _react.default.createElement("div", null, this._renderMessage())), !files.length ? _react.default.createElement("div", null, _react.default.createElement(MsgWrapper, null, MESSAGE), _react.default.createElement("span", {
        className: "file-upload-or"
      }, "or"), _react.default.createElement(_uploadButton.default, {
        onUpload: this._handleFileDrop
      }, "browse your files")) : null, _react.default.createElement(StyledDisclaimer, null, DISCLAIMER))) : null, _react.default.createElement(WarningMsg, null, (0, _utils.isChrome)() ? CHROME_MSG : ''));
    }
  }]);
  return FileUpload;
}(_react.Component);

exports.default = FileUpload;
(0, _defineProperty2.default)(FileUpload, "defaultProps", {
  validFileExt: defaultValidFileExt
});
(0, _defineProperty2.default)(FileUpload, "propTypes", {
  onFileUpload: _propTypes.default.func.isRequired,
  validFileExt: _propTypes.default.arrayOf(_propTypes.default.string)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9maWxlLXVwbG9hZGVyL2ZpbGUtdXBsb2FkLmpzIl0sIm5hbWVzIjpbIkZpbGVEcm9wIiwiZG9jdW1lbnQiLCJyZXF1aXJlIiwiZGVmYXVsdFZhbGlkRmlsZUV4dCIsIk1FU1NBR0UiLCJDSFJPTUVfTVNHIiwiRElTQ0xBSU1FUiIsIkNPTkZJR19VUExPQURfTUVTU0FHRSIsImZpbGVJY29uQ29sb3IiLCJXYXJuaW5nTXNnIiwic3R5bGVkIiwic3BhbiIsInByb3BzIiwidGhlbWUiLCJlcnJvckNvbG9yIiwiUG9zaXRpdmVNc2ciLCJwcmltYXJ5QnRuQWN0QmdkIiwiU3R5bGVkRmlsZURyb3AiLCJkaXYiLCJzdWJ0ZXh0Q29sb3JMVCIsImxpbmtCdG5Db2xvciIsIk1zZ1dyYXBwZXIiLCJtb2RhbFRpdGxlQ29sb3IiLCJTdHlsZWREcmFnTkRyb3BJY29uIiwiU3R5bGVkRmlsZVVwbG9hZCIsInRleHRDb2xvckxUIiwiU3R5bGVkTWVzc2FnZSIsIlN0eWxlZERpc2NsYWltZXIiLCJleHRlbmQiLCJGaWxlVXBsb2FkIiwiZHJhZ092ZXIiLCJmaWxlcyIsImVycm9yRmlsZXMiLCJmaWxlbmFtZSIsInZhbGlkRmlsZUV4dCIsImZpbGVFeHQiLCJmaW5kIiwiZXh0IiwiZW5kc1dpdGgiLCJCb29sZWFuIiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsIm5leHRTdGF0ZSIsImkiLCJsZW5ndGgiLCJmaWxlIiwiX2lzVmFsaWRGaWxlVHlwZSIsIm5hbWUiLCJwdXNoIiwic2V0U3RhdGUiLCJvbkZpbGVVcGxvYWQiLCJuZXdTdGF0ZSIsInN0YXRlIiwiam9pbiIsIm1hcCIsImYiLCJjbXAiLCJmcmFtZSIsIl9vbkNoYW5nZSIsIl90b2dnbGVEcmFnU3RhdGUiLCJfaGFuZGxlRmlsZURyb3AiLCJvcGFjaXR5IiwiX3JlbmRlck1lc3NhZ2UiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJmdW5jIiwiaXNSZXF1aXJl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O0FBRWpCaEMsRUFBQUEsWUFBWSxFQUFFOEIsbUJBQVVHLE9BQVYsQ0FBa0JILG1CQUFVSSxNQUE1QjtBQUZHLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IFVwbG9hZEJ1dHRvbiBmcm9tICcuL3VwbG9hZC1idXR0b24nO1xuaW1wb3J0IHtGaWxlVHlwZSwgRHJhZ05Ecm9wfSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9pY29ucyc7XG5pbXBvcnQgTG9hZGluZ1NwaW5uZXIgZnJvbSAnY29tcG9uZW50cy9jb21tb24vbG9hZGluZy1zcGlubmVyJztcbmltcG9ydCB7aXNDaHJvbWV9IGZyb20gJ3V0aWxzL3V0aWxzJztcblxuY29uc3QgRmlsZURyb3AgPVxuICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnID8gcmVxdWlyZSgncmVhY3QtZmlsZS1kcm9wJykgOiBudWxsO1xuXG4vLyBGaWxlLnR5cGUgaXMgbm90IHJlbGlhYmxlIGlmIHRoZSBPUyBkb2VzIG5vdCBoYXZlIGFcbi8vIHJlZ2lzdGVyZWQgbWFwcGluZyBmb3IgdGhlIGV4dGVuc2lvbi5cbi8vIE5PVEU6IFNoYXBlZmlsZXMgbXVzdCBiZSBpbiBhIGNvbXByZXNzZWQgZm9ybWF0IHNpbmNlXG4vLyBpdCByZXF1aXJlcyBtdWx0aXBsZSBmaWxlcyB0byBiZSBwcmVzZW50LlxuY29uc3QgZGVmYXVsdFZhbGlkRmlsZUV4dCA9IFtcbiAgJ2NzdicsXG4gIC8vICd0YXIuZ3onLFxuICAvLyAndGd6JyxcbiAgLy8gJ3ppcCcsXG4gIC8vICdncHgnLFxuICAvLyAna21sJyxcbiAgJ2pzb24nLFxuICAnZ2VvanNvbidcbl07XG5cbmNvbnN0IE1FU1NBR0UgPSAnIERyYWcgJiBEcm9wIFlvdXIgRmlsZShzKSBIZXJlJztcbmNvbnN0IENIUk9NRV9NU0cgPVxuICAnKkNocm9tZSB1c2VyOiBMaW1pdCBmaWxlIHNpemUgdG8gMjUwbWIsIGlmIG5lZWQgdG8gdXBsb2FkIGxhcmdlciBmaWxlLCB0cnkgU2FmYXJpJztcbmNvbnN0IERJU0NMQUlNRVIgPSAnKktlcGxlci5nbCBpcyBhIGNsaWVudC1zaWRlIGFwcGxpY2F0aW9uIHdpdGggbm8gc2VydmVyIGJhY2tlbmQuIERhdGEgbGl2ZXMgb25seSBvbiB5b3VyIG1hY2hpbmUvYnJvd3Nlci4gJyArXG4gICdObyBpbmZvcm1hdGlvbiBvciBtYXAgZGF0YSBpcyBzZW50IHRvIGFueSBzZXJ2ZXIuJztcbmNvbnN0IENPTkZJR19VUExPQURfTUVTU0FHRSA9ICdVcGxvYWQgZGF0YSBmaWxlcyBvciB1cGxvYWQgYSBzYXZlZCBtYXAgdmlhIHByZXZpb3VzbHkgZXhwb3J0ZWQgc2luZ2xlIEpzb24gb2YgYm90aCBjb25maWcgYW5kIGRhdGEnO1xuXG5jb25zdCBmaWxlSWNvbkNvbG9yID0gJyNEM0Q4RTAnO1xuXG5jb25zdCBXYXJuaW5nTXNnID0gc3R5bGVkLnNwYW5gXG4gIG1hcmdpbi10b3A6IDEwcHg7XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmVycm9yQ29sb3J9O1xuYDtcblxuY29uc3QgUG9zaXRpdmVNc2cgPSBzdHlsZWQuc3BhbmBcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucHJpbWFyeUJ0bkFjdEJnZH07XG5gO1xuXG5jb25zdCBTdHlsZWRGaWxlRHJvcCA9IHN0eWxlZC5kaXZgXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJvcmRlci1zdHlsZTogZGFzaGVkO1xuICBib3JkZXItd2lkdGg6IDFweDtcbiAgYm9yZGVyLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnN1YnRleHRDb2xvckxUfTtcbiAgaGVpZ2h0OiA0MTRweDtcbiAgcGFkZGluZy10b3A6IDYwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6IDEwMCU7XG5cbiAgLmZpbGUtdXBsb2FkLW9yIHtcbiAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5saW5rQnRuQ29sb3J9O1xuICAgIHBhZGRpbmctcmlnaHQ6IDRweDtcbiAgfVxuYDtcblxuY29uc3QgTXNnV3JhcHBlciA9IHN0eWxlZC5kaXZgXG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLm1vZGFsVGl0bGVDb2xvcn07XG4gIGZvbnQtc2l6ZTogMjBweDtcbiAgaGVpZ2h0OiAzNnB4O1xuYDtcblxuY29uc3QgU3R5bGVkRHJhZ05Ecm9wSWNvbiA9IHN0eWxlZC5kaXZgXG4gIGNvbG9yOiAke2ZpbGVJY29uQ29sb3J9O1xuICBtYXJnaW4tYm90dG9tOiA2MHB4O1xuXG4gIC5maWxlLXR5cGUtcm93IHtcbiAgICBtYXJnaW4tYm90dG9tOiAyNnB4O1xuICB9XG5gO1xuXG5jb25zdCBTdHlsZWRGaWxlVXBsb2FkID0gc3R5bGVkLmRpdmBcbiAgLmZpbHRlci11cGxvYWRfX2lucHV0IHtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgaGVpZ2h0OiAwO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgfVxuXG4gIC5maWxlLWRyb3Age1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgfVxuXG4gIC5maWxlLXVwbG9hZF9fbWVzc2FnZSB7XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9yTFR9O1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuICB9XG5gO1xuXG5jb25zdCBTdHlsZWRNZXNzYWdlID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5gO1xuXG5jb25zdCBTdHlsZWREaXNjbGFpbWVyID0gU3R5bGVkTWVzc2FnZS5leHRlbmRgXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAwO1xuICBwYWRkaW5nOiAxMHB4IDMwcHg7XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaWxlVXBsb2FkIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICB2YWxpZEZpbGVFeHQ6IGRlZmF1bHRWYWxpZEZpbGVFeHRcbiAgfTtcblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG9uRmlsZVVwbG9hZDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICB2YWxpZEZpbGVFeHQ6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpXG4gIH07XG5cbiAgc3RhdGUgPSB7XG4gICAgZHJhZ092ZXI6IGZhbHNlLFxuICAgIGZpbGVzOiBbXSxcbiAgICBlcnJvckZpbGVzOiBbXVxuICB9O1xuXG4gIF9pc1ZhbGlkRmlsZVR5cGUgPSBmaWxlbmFtZSA9PiB7XG4gICAgY29uc3Qge3ZhbGlkRmlsZUV4dH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGZpbGVFeHQgPSB2YWxpZEZpbGVFeHQuZmluZChleHQgPT4gZmlsZW5hbWUuZW5kc1dpdGgoZXh0KSk7XG5cbiAgICByZXR1cm4gQm9vbGVhbihmaWxlRXh0KTtcbiAgfTtcblxuICBfaGFuZGxlRmlsZURyb3AgPSAoZmlsZXMsIGUpID0+IHtcbiAgICBpZiAoZSkge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBjb25zdCBuZXh0U3RhdGUgPSB7ZmlsZXM6IFtdLCBlcnJvckZpbGVzOiBbXSwgZHJhZ092ZXI6IGZhbHNlfTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBmaWxlID0gZmlsZXNbaV07XG5cbiAgICAgIGlmIChmaWxlICYmIHRoaXMuX2lzVmFsaWRGaWxlVHlwZShmaWxlLm5hbWUpKSB7XG4gICAgICAgIG5leHRTdGF0ZS5maWxlcy5wdXNoKGZpbGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV4dFN0YXRlLmVycm9yRmlsZXMucHVzaChmaWxlLm5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICBuZXh0U3RhdGUsXG4gICAgICAoKSA9PlxuICAgICAgICBuZXh0U3RhdGUuZmlsZXMubGVuZ3RoID8gdGhpcy5wcm9wcy5vbkZpbGVVcGxvYWQobmV4dFN0YXRlLmZpbGVzKSA6IG51bGxcbiAgICApO1xuICB9O1xuXG4gIF90b2dnbGVEcmFnU3RhdGUgPSBuZXdTdGF0ZSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7ZHJhZ092ZXI6IG5ld1N0YXRlfSk7XG4gIH07XG5cbiAgX3JlbmRlck1lc3NhZ2UoKSB7XG4gICAgY29uc3Qge2Vycm9yRmlsZXMsIGZpbGVzfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBpZiAoZXJyb3JGaWxlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxXYXJuaW5nTXNnPlxuICAgICAgICAgIHtgRmlsZSAke2Vycm9yRmlsZXMuam9pbignLCAnKX0gaXMgbm90IHN1cHBvcnRlZC5gfVxuICAgICAgICA8L1dhcm5pbmdNc2c+XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICghZmlsZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFN0eWxlZE1lc3NhZ2UgY2xhc3NOYW1lPVwiZmlsZS11cGxvYWRlcl9fbWVzc2FnZVwiPlxuICAgICAgICA8ZGl2PlVwbG9hZGluZy4uLjwvZGl2PlxuICAgICAgICA8UG9zaXRpdmVNc2c+XG4gICAgICAgICAge2Ake2ZpbGVzLm1hcChmID0+IGYubmFtZSkuam9pbignIGFuZCAnKX0uLi5gfVxuICAgICAgICA8L1Bvc2l0aXZlTXNnPlxuICAgICAgICA8TG9hZGluZ1NwaW5uZXIgc2l6ZT17MjB9IC8+XG4gICAgICA8L1N0eWxlZE1lc3NhZ2U+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7ZHJhZ092ZXIsIGZpbGVzfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3Qge3ZhbGlkRmlsZUV4dH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8U3R5bGVkRmlsZVVwbG9hZFxuICAgICAgICBjbGFzc05hbWU9XCJmaWxlLXVwbG9hZGVyXCJcbiAgICAgICAgaW5uZXJSZWY9e2NtcCA9PiAodGhpcy5mcmFtZSA9IGNtcCl9XG4gICAgICA+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGNsYXNzTmFtZT1cImZpbHRlci11cGxvYWRfX2lucHV0XCJcbiAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMuX29uQ2hhbmdlfVxuICAgICAgICAvPlxuICAgICAgICB7RmlsZURyb3AgPyAoXG4gICAgICAgICAgPEZpbGVEcm9wXG4gICAgICAgICAgICBmcmFtZT17dGhpcy5mcmFtZX1cbiAgICAgICAgICAgIHRhcmdldEFsd2F5c1Zpc2libGVcbiAgICAgICAgICAgIG9uRHJhZ092ZXI9eygpID0+IHRoaXMuX3RvZ2dsZURyYWdTdGF0ZSh0cnVlKX1cbiAgICAgICAgICAgIG9uRHJhZ0xlYXZlPXsoKSA9PiB0aGlzLl90b2dnbGVEcmFnU3RhdGUoZmFsc2UpfVxuICAgICAgICAgICAgb25Ecm9wPXt0aGlzLl9oYW5kbGVGaWxlRHJvcH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbGUtdXBsb2FkX19tZXNzYWdlXCI+e0NPTkZJR19VUExPQURfTUVTU0FHRX08L2Rpdj5cbiAgICAgICAgICAgIDxTdHlsZWRGaWxlRHJvcCBkcmFnT3Zlcj17ZHJhZ092ZXJ9PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7b3BhY2l0eTogZHJhZ092ZXIgPyAwLjUgOiAxfX0+XG4gICAgICAgICAgICAgICAgPFN0eWxlZERyYWdORHJvcEljb24+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbGUtdHlwZS1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAge3ZhbGlkRmlsZUV4dC5tYXAoZXh0ID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8RmlsZVR5cGUga2V5PXtleHR9IGV4dD17ZXh0fSBoZWlnaHQ9XCI1MHB4XCIgZm9udFNpemU9XCI5cHhcIi8+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8RHJhZ05Ecm9wIGhlaWdodD1cIjQ0cHhcIiAvPlxuICAgICAgICAgICAgICAgIDwvU3R5bGVkRHJhZ05Ecm9wSWNvbj5cbiAgICAgICAgICAgICAgICA8ZGl2Pnt0aGlzLl9yZW5kZXJNZXNzYWdlKCl9PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB7IWZpbGVzLmxlbmd0aCA/IDxkaXY+XG4gICAgICAgICAgICAgICAgPE1zZ1dyYXBwZXI+e01FU1NBR0V9PC9Nc2dXcmFwcGVyPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZpbGUtdXBsb2FkLW9yXCI+b3I8L3NwYW4+XG4gICAgICAgICAgICAgICAgPFVwbG9hZEJ1dHRvbiBvblVwbG9hZD17dGhpcy5faGFuZGxlRmlsZURyb3B9PlxuICAgICAgICAgICAgICAgICAgYnJvd3NlIHlvdXIgZmlsZXNcbiAgICAgICAgICAgICAgICA8L1VwbG9hZEJ1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+IDogbnVsbH1cbiAgICAgICAgICAgICAgPFN0eWxlZERpc2NsYWltZXI+e0RJU0NMQUlNRVJ9PC9TdHlsZWREaXNjbGFpbWVyPlxuICAgICAgICAgICAgPC9TdHlsZWRGaWxlRHJvcD5cbiAgICAgICAgICA8L0ZpbGVEcm9wPlxuICAgICAgICApIDogbnVsbH1cblxuICAgICAgICA8V2FybmluZ01zZz57aXNDaHJvbWUoKSA/IENIUk9NRV9NU0cgOiAnJ308L1dhcm5pbmdNc2c+XG4gICAgICA8L1N0eWxlZEZpbGVVcGxvYWQ+XG4gICAgKTtcbiAgfVxufVxuIl19