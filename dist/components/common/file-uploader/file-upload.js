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

var StyledDisclaimer = (0, _styledComponents.default)(StyledMessage)(_templateObject8());

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
        ref: function ref(cmp) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9maWxlLXVwbG9hZGVyL2ZpbGUtdXBsb2FkLmpzIl0sIm5hbWVzIjpbIkZpbGVEcm9wIiwiZG9jdW1lbnQiLCJyZXF1aXJlIiwiZGVmYXVsdFZhbGlkRmlsZUV4dCIsIk1FU1NBR0UiLCJDSFJPTUVfTVNHIiwiRElTQ0xBSU1FUiIsIkNPTkZJR19VUExPQURfTUVTU0FHRSIsImZpbGVJY29uQ29sb3IiLCJXYXJuaW5nTXNnIiwic3R5bGVkIiwic3BhbiIsInByb3BzIiwidGhlbWUiLCJlcnJvckNvbG9yIiwiUG9zaXRpdmVNc2ciLCJwcmltYXJ5QnRuQWN0QmdkIiwiU3R5bGVkRmlsZURyb3AiLCJkaXYiLCJzdWJ0ZXh0Q29sb3JMVCIsImxpbmtCdG5Db2xvciIsIk1zZ1dyYXBwZXIiLCJtb2RhbFRpdGxlQ29sb3IiLCJTdHlsZWREcmFnTkRyb3BJY29uIiwiU3R5bGVkRmlsZVVwbG9hZCIsInRleHRDb2xvckxUIiwiU3R5bGVkTWVzc2FnZSIsIlN0eWxlZERpc2NsYWltZXIiLCJGaWxlVXBsb2FkIiwiZHJhZ092ZXIiLCJmaWxlcyIsImVycm9yRmlsZXMiLCJmaWxlbmFtZSIsInZhbGlkRmlsZUV4dCIsImZpbGVFeHQiLCJmaW5kIiwiZXh0IiwiZW5kc1dpdGgiLCJCb29sZWFuIiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsIm5leHRTdGF0ZSIsImkiLCJsZW5ndGgiLCJmaWxlIiwiX2lzVmFsaWRGaWxlVHlwZSIsIm5hbWUiLCJwdXNoIiwic2V0U3RhdGUiLCJvbkZpbGVVcGxvYWQiLCJuZXdTdGF0ZSIsInN0YXRlIiwiam9pbiIsIm1hcCIsImYiLCJjbXAiLCJmcmFtZSIsIl9vbkNoYW5nZSIsIl90b2dnbGVEcmFnU3RhdGUiLCJfaGFuZGxlRmlsZURyb3AiLCJvcGFjaXR5IiwiX3JlbmRlck1lc3NhZ2UiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJmdW5jIiwiaXNSZXF1aXJlZCIsImFycmF5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QUFBLFlBQVksRUFBRThCLG1CQUFVRyxPQUFWLENBQWtCSCxtQkFBVUksTUFBNUI7QUFGRyxDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCBVcGxvYWRCdXR0b24gZnJvbSAnLi91cGxvYWQtYnV0dG9uJztcbmltcG9ydCB7RmlsZVR5cGUsIERyYWdORHJvcH0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vaWNvbnMnO1xuaW1wb3J0IExvYWRpbmdTcGlubmVyIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2xvYWRpbmctc3Bpbm5lcic7XG5pbXBvcnQge2lzQ2hyb21lfSBmcm9tICd1dGlscy91dGlscyc7XG5cbmNvbnN0IEZpbGVEcm9wID1cbiAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyA/IHJlcXVpcmUoJ3JlYWN0LWZpbGUtZHJvcCcpIDogbnVsbDtcblxuLy8gRmlsZS50eXBlIGlzIG5vdCByZWxpYWJsZSBpZiB0aGUgT1MgZG9lcyBub3QgaGF2ZSBhXG4vLyByZWdpc3RlcmVkIG1hcHBpbmcgZm9yIHRoZSBleHRlbnNpb24uXG4vLyBOT1RFOiBTaGFwZWZpbGVzIG11c3QgYmUgaW4gYSBjb21wcmVzc2VkIGZvcm1hdCBzaW5jZVxuLy8gaXQgcmVxdWlyZXMgbXVsdGlwbGUgZmlsZXMgdG8gYmUgcHJlc2VudC5cbmNvbnN0IGRlZmF1bHRWYWxpZEZpbGVFeHQgPSBbXG4gICdjc3YnLFxuICAvLyAndGFyLmd6JyxcbiAgLy8gJ3RneicsXG4gIC8vICd6aXAnLFxuICAvLyAnZ3B4JyxcbiAgLy8gJ2ttbCcsXG4gICdqc29uJyxcbiAgJ2dlb2pzb24nXG5dO1xuXG5jb25zdCBNRVNTQUdFID0gJyBEcmFnICYgRHJvcCBZb3VyIEZpbGUocykgSGVyZSc7XG5jb25zdCBDSFJPTUVfTVNHID1cbiAgJypDaHJvbWUgdXNlcjogTGltaXQgZmlsZSBzaXplIHRvIDI1MG1iLCBpZiBuZWVkIHRvIHVwbG9hZCBsYXJnZXIgZmlsZSwgdHJ5IFNhZmFyaSc7XG5jb25zdCBESVNDTEFJTUVSID0gJypLZXBsZXIuZ2wgaXMgYSBjbGllbnQtc2lkZSBhcHBsaWNhdGlvbiB3aXRoIG5vIHNlcnZlciBiYWNrZW5kLiBEYXRhIGxpdmVzIG9ubHkgb24geW91ciBtYWNoaW5lL2Jyb3dzZXIuICcgK1xuICAnTm8gaW5mb3JtYXRpb24gb3IgbWFwIGRhdGEgaXMgc2VudCB0byBhbnkgc2VydmVyLic7XG5jb25zdCBDT05GSUdfVVBMT0FEX01FU1NBR0UgPSAnVXBsb2FkIGRhdGEgZmlsZXMgb3IgdXBsb2FkIGEgc2F2ZWQgbWFwIHZpYSBwcmV2aW91c2x5IGV4cG9ydGVkIHNpbmdsZSBKc29uIG9mIGJvdGggY29uZmlnIGFuZCBkYXRhJztcblxuY29uc3QgZmlsZUljb25Db2xvciA9ICcjRDNEOEUwJztcblxuY29uc3QgV2FybmluZ01zZyA9IHN0eWxlZC5zcGFuYFxuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5lcnJvckNvbG9yfTtcbmA7XG5cbmNvbnN0IFBvc2l0aXZlTXNnID0gc3R5bGVkLnNwYW5gXG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnByaW1hcnlCdG5BY3RCZ2R9O1xuYDtcblxuY29uc3QgU3R5bGVkRmlsZURyb3AgPSBzdHlsZWQuZGl2YFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBib3JkZXItc3R5bGU6IGRhc2hlZDtcbiAgYm9yZGVyLXdpZHRoOiAxcHg7XG4gIGJvcmRlci1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zdWJ0ZXh0Q29sb3JMVH07XG4gIGhlaWdodDogNDE0cHg7XG4gIHBhZGRpbmctdG9wOiA2MHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiAxMDAlO1xuXG4gIC5maWxlLXVwbG9hZC1vciB7XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGlua0J0bkNvbG9yfTtcbiAgICBwYWRkaW5nLXJpZ2h0OiA0cHg7XG4gIH1cbmA7XG5cbmNvbnN0IE1zZ1dyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5tb2RhbFRpdGxlQ29sb3J9O1xuICBmb250LXNpemU6IDIwcHg7XG4gIGhlaWdodDogMzZweDtcbmA7XG5cbmNvbnN0IFN0eWxlZERyYWdORHJvcEljb24gPSBzdHlsZWQuZGl2YFxuICBjb2xvcjogJHtmaWxlSWNvbkNvbG9yfTtcbiAgbWFyZ2luLWJvdHRvbTogNjBweDtcblxuICAuZmlsZS10eXBlLXJvdyB7XG4gICAgbWFyZ2luLWJvdHRvbTogMjZweDtcbiAgfVxuYDtcblxuY29uc3QgU3R5bGVkRmlsZVVwbG9hZCA9IHN0eWxlZC5kaXZgXG4gIC5maWx0ZXItdXBsb2FkX19pbnB1dCB7XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgIGhlaWdodDogMDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIH1cblxuICAuZmlsZS1kcm9wIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIH1cblxuICAuZmlsZS11cGxvYWRfX21lc3NhZ2Uge1xuICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvckxUfTtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgfVxuYDtcblxuY29uc3QgU3R5bGVkTWVzc2FnZSA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuYDtcblxuY29uc3QgU3R5bGVkRGlzY2xhaW1lciA9IHN0eWxlZChTdHlsZWRNZXNzYWdlKWBcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDA7XG4gIHBhZGRpbmc6IDEwcHggMzBweDtcbmA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbGVVcGxvYWQgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHZhbGlkRmlsZUV4dDogZGVmYXVsdFZhbGlkRmlsZUV4dFxuICB9O1xuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgb25GaWxlVXBsb2FkOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHZhbGlkRmlsZUV4dDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZylcbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBkcmFnT3ZlcjogZmFsc2UsXG4gICAgZmlsZXM6IFtdLFxuICAgIGVycm9yRmlsZXM6IFtdXG4gIH07XG5cbiAgX2lzVmFsaWRGaWxlVHlwZSA9IGZpbGVuYW1lID0+IHtcbiAgICBjb25zdCB7dmFsaWRGaWxlRXh0fSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgZmlsZUV4dCA9IHZhbGlkRmlsZUV4dC5maW5kKGV4dCA9PiBmaWxlbmFtZS5lbmRzV2l0aChleHQpKTtcblxuICAgIHJldHVybiBCb29sZWFuKGZpbGVFeHQpO1xuICB9O1xuXG4gIF9oYW5kbGVGaWxlRHJvcCA9IChmaWxlcywgZSkgPT4ge1xuICAgIGlmIChlKSB7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIGNvbnN0IG5leHRTdGF0ZSA9IHtmaWxlczogW10sIGVycm9yRmlsZXM6IFtdLCBkcmFnT3ZlcjogZmFsc2V9O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGZpbGUgPSBmaWxlc1tpXTtcblxuICAgICAgaWYgKGZpbGUgJiYgdGhpcy5faXNWYWxpZEZpbGVUeXBlKGZpbGUubmFtZSkpIHtcbiAgICAgICAgbmV4dFN0YXRlLmZpbGVzLnB1c2goZmlsZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXh0U3RhdGUuZXJyb3JGaWxlcy5wdXNoKGZpbGUubmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgIG5leHRTdGF0ZSxcbiAgICAgICgpID0+XG4gICAgICAgIG5leHRTdGF0ZS5maWxlcy5sZW5ndGggPyB0aGlzLnByb3BzLm9uRmlsZVVwbG9hZChuZXh0U3RhdGUuZmlsZXMpIDogbnVsbFxuICAgICk7XG4gIH07XG5cbiAgX3RvZ2dsZURyYWdTdGF0ZSA9IG5ld1N0YXRlID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtkcmFnT3ZlcjogbmV3U3RhdGV9KTtcbiAgfTtcblxuICBfcmVuZGVyTWVzc2FnZSgpIHtcbiAgICBjb25zdCB7ZXJyb3JGaWxlcywgZmlsZXN9ID0gdGhpcy5zdGF0ZTtcblxuICAgIGlmIChlcnJvckZpbGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFdhcm5pbmdNc2c+XG4gICAgICAgICAge2BGaWxlICR7ZXJyb3JGaWxlcy5qb2luKCcsICcpfSBpcyBub3Qgc3VwcG9ydGVkLmB9XG4gICAgICAgIDwvV2FybmluZ01zZz5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKCFmaWxlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8U3R5bGVkTWVzc2FnZSBjbGFzc05hbWU9XCJmaWxlLXVwbG9hZGVyX19tZXNzYWdlXCI+XG4gICAgICAgIDxkaXY+VXBsb2FkaW5nLi4uPC9kaXY+XG4gICAgICAgIDxQb3NpdGl2ZU1zZz5cbiAgICAgICAgICB7YCR7ZmlsZXMubWFwKGYgPT4gZi5uYW1lKS5qb2luKCcgYW5kICcpfS4uLmB9XG4gICAgICAgIDwvUG9zaXRpdmVNc2c+XG4gICAgICAgIDxMb2FkaW5nU3Bpbm5lciBzaXplPXsyMH0gLz5cbiAgICAgIDwvU3R5bGVkTWVzc2FnZT5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtkcmFnT3ZlciwgZmlsZXN9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7dmFsaWRGaWxlRXh0fSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxTdHlsZWRGaWxlVXBsb2FkXG4gICAgICAgIGNsYXNzTmFtZT1cImZpbGUtdXBsb2FkZXJcIlxuICAgICAgICByZWY9e2NtcCA9PiAodGhpcy5mcmFtZSA9IGNtcCl9XG4gICAgICA+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGNsYXNzTmFtZT1cImZpbHRlci11cGxvYWRfX2lucHV0XCJcbiAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMuX29uQ2hhbmdlfVxuICAgICAgICAvPlxuICAgICAgICB7RmlsZURyb3AgPyAoXG4gICAgICAgICAgPEZpbGVEcm9wXG4gICAgICAgICAgICBmcmFtZT17dGhpcy5mcmFtZX1cbiAgICAgICAgICAgIHRhcmdldEFsd2F5c1Zpc2libGVcbiAgICAgICAgICAgIG9uRHJhZ092ZXI9eygpID0+IHRoaXMuX3RvZ2dsZURyYWdTdGF0ZSh0cnVlKX1cbiAgICAgICAgICAgIG9uRHJhZ0xlYXZlPXsoKSA9PiB0aGlzLl90b2dnbGVEcmFnU3RhdGUoZmFsc2UpfVxuICAgICAgICAgICAgb25Ecm9wPXt0aGlzLl9oYW5kbGVGaWxlRHJvcH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbGUtdXBsb2FkX19tZXNzYWdlXCI+e0NPTkZJR19VUExPQURfTUVTU0FHRX08L2Rpdj5cbiAgICAgICAgICAgIDxTdHlsZWRGaWxlRHJvcCBkcmFnT3Zlcj17ZHJhZ092ZXJ9PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7b3BhY2l0eTogZHJhZ092ZXIgPyAwLjUgOiAxfX0+XG4gICAgICAgICAgICAgICAgPFN0eWxlZERyYWdORHJvcEljb24+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbGUtdHlwZS1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAge3ZhbGlkRmlsZUV4dC5tYXAoZXh0ID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8RmlsZVR5cGUga2V5PXtleHR9IGV4dD17ZXh0fSBoZWlnaHQ9XCI1MHB4XCIgZm9udFNpemU9XCI5cHhcIi8+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8RHJhZ05Ecm9wIGhlaWdodD1cIjQ0cHhcIiAvPlxuICAgICAgICAgICAgICAgIDwvU3R5bGVkRHJhZ05Ecm9wSWNvbj5cbiAgICAgICAgICAgICAgICA8ZGl2Pnt0aGlzLl9yZW5kZXJNZXNzYWdlKCl9PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB7IWZpbGVzLmxlbmd0aCA/IDxkaXY+XG4gICAgICAgICAgICAgICAgPE1zZ1dyYXBwZXI+e01FU1NBR0V9PC9Nc2dXcmFwcGVyPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZpbGUtdXBsb2FkLW9yXCI+b3I8L3NwYW4+XG4gICAgICAgICAgICAgICAgPFVwbG9hZEJ1dHRvbiBvblVwbG9hZD17dGhpcy5faGFuZGxlRmlsZURyb3B9PlxuICAgICAgICAgICAgICAgICAgYnJvd3NlIHlvdXIgZmlsZXNcbiAgICAgICAgICAgICAgICA8L1VwbG9hZEJ1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+IDogbnVsbH1cbiAgICAgICAgICAgICAgPFN0eWxlZERpc2NsYWltZXI+e0RJU0NMQUlNRVJ9PC9TdHlsZWREaXNjbGFpbWVyPlxuICAgICAgICAgICAgPC9TdHlsZWRGaWxlRHJvcD5cbiAgICAgICAgICA8L0ZpbGVEcm9wPlxuICAgICAgICApIDogbnVsbH1cblxuICAgICAgICA8V2FybmluZ01zZz57aXNDaHJvbWUoKSA/IENIUk9NRV9NU0cgOiAnJ308L1dhcm5pbmdNc2c+XG4gICAgICA8L1N0eWxlZEZpbGVVcGxvYWQ+XG4gICAgKTtcbiAgfVxufVxuIl19