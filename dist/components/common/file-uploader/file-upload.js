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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9maWxlLXVwbG9hZGVyL2ZpbGUtdXBsb2FkLmpzIl0sIm5hbWVzIjpbIkZpbGVEcm9wIiwiZG9jdW1lbnQiLCJyZXF1aXJlIiwiZGVmYXVsdFZhbGlkRmlsZUV4dCIsIk1FU1NBR0UiLCJDSFJPTUVfTVNHIiwiRElTQ0xBSU1FUiIsIkNPTkZJR19VUExPQURfTUVTU0FHRSIsImZpbGVJY29uQ29sb3IiLCJXYXJuaW5nTXNnIiwic3R5bGVkIiwic3BhbiIsInByb3BzIiwidGhlbWUiLCJlcnJvckNvbG9yIiwiUG9zaXRpdmVNc2ciLCJwcmltYXJ5QnRuQWN0QmdkIiwiU3R5bGVkRmlsZURyb3AiLCJkaXYiLCJzdWJ0ZXh0Q29sb3JMVCIsImxpbmtCdG5Db2xvciIsIk1zZ1dyYXBwZXIiLCJtb2RhbFRpdGxlQ29sb3IiLCJTdHlsZWREcmFnTkRyb3BJY29uIiwiU3R5bGVkRmlsZVVwbG9hZCIsInRleHRDb2xvckxUIiwiU3R5bGVkTWVzc2FnZSIsIlN0eWxlZERpc2NsYWltZXIiLCJGaWxlVXBsb2FkIiwiZHJhZ092ZXIiLCJmaWxlcyIsImVycm9yRmlsZXMiLCJmaWxlbmFtZSIsInZhbGlkRmlsZUV4dCIsImZpbGVFeHQiLCJmaW5kIiwiZXh0IiwiZW5kc1dpdGgiLCJCb29sZWFuIiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsIm5leHRTdGF0ZSIsImkiLCJsZW5ndGgiLCJmaWxlIiwiX2lzVmFsaWRGaWxlVHlwZSIsIm5hbWUiLCJwdXNoIiwic2V0U3RhdGUiLCJvbkZpbGVVcGxvYWQiLCJuZXdTdGF0ZSIsInN0YXRlIiwiam9pbiIsIm1hcCIsImYiLCJjbXAiLCJmcmFtZSIsIl9vbkNoYW5nZSIsIl90b2dnbGVEcmFnU3RhdGUiLCJfaGFuZGxlRmlsZURyb3AiLCJvcGFjaXR5IiwiX3JlbmRlck1lc3NhZ2UiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJmdW5jIiwiaXNSZXF1aXJlZCIsImFycmF5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QUFBQSxZQUFZLEVBQUU4QixtQkFBVUcsT0FBVixDQUFrQkgsbUJBQVVJLE1BQTVCO0FBRkcsQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5pbXBvcnQgVXBsb2FkQnV0dG9uIGZyb20gJy4vdXBsb2FkLWJ1dHRvbic7XG5pbXBvcnQge0ZpbGVUeXBlLCBEcmFnTkRyb3B9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ljb25zJztcbmltcG9ydCBMb2FkaW5nU3Bpbm5lciBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9sb2FkaW5nLXNwaW5uZXInO1xuaW1wb3J0IHtpc0Nocm9tZX0gZnJvbSAndXRpbHMvdXRpbHMnO1xuXG5jb25zdCBGaWxlRHJvcCA9XG4gIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgPyByZXF1aXJlKCdyZWFjdC1maWxlLWRyb3AnKSA6IG51bGw7XG5cbi8vIEZpbGUudHlwZSBpcyBub3QgcmVsaWFibGUgaWYgdGhlIE9TIGRvZXMgbm90IGhhdmUgYVxuLy8gcmVnaXN0ZXJlZCBtYXBwaW5nIGZvciB0aGUgZXh0ZW5zaW9uLlxuLy8gTk9URTogU2hhcGVmaWxlcyBtdXN0IGJlIGluIGEgY29tcHJlc3NlZCBmb3JtYXQgc2luY2Vcbi8vIGl0IHJlcXVpcmVzIG11bHRpcGxlIGZpbGVzIHRvIGJlIHByZXNlbnQuXG5jb25zdCBkZWZhdWx0VmFsaWRGaWxlRXh0ID0gW1xuICAnY3N2JyxcbiAgLy8gJ3Rhci5neicsXG4gIC8vICd0Z3onLFxuICAvLyAnemlwJyxcbiAgLy8gJ2dweCcsXG4gIC8vICdrbWwnLFxuICAnanNvbicsXG4gICdnZW9qc29uJ1xuXTtcblxuY29uc3QgTUVTU0FHRSA9ICcgRHJhZyAmIERyb3AgWW91ciBGaWxlKHMpIEhlcmUnO1xuY29uc3QgQ0hST01FX01TRyA9XG4gICcqQ2hyb21lIHVzZXI6IExpbWl0IGZpbGUgc2l6ZSB0byAyNTBtYiwgaWYgbmVlZCB0byB1cGxvYWQgbGFyZ2VyIGZpbGUsIHRyeSBTYWZhcmknO1xuY29uc3QgRElTQ0xBSU1FUiA9ICcqS2VwbGVyLmdsIGlzIGEgY2xpZW50LXNpZGUgYXBwbGljYXRpb24gd2l0aCBubyBzZXJ2ZXIgYmFja2VuZC4gRGF0YSBsaXZlcyBvbmx5IG9uIHlvdXIgbWFjaGluZS9icm93c2VyLiAnICtcbiAgJ05vIGluZm9ybWF0aW9uIG9yIG1hcCBkYXRhIGlzIHNlbnQgdG8gYW55IHNlcnZlci4nO1xuY29uc3QgQ09ORklHX1VQTE9BRF9NRVNTQUdFID0gJ1VwbG9hZCBkYXRhIGZpbGVzIG9yIHVwbG9hZCBhIHNhdmVkIG1hcCB2aWEgcHJldmlvdXNseSBleHBvcnRlZCBzaW5nbGUgSnNvbiBvZiBib3RoIGNvbmZpZyBhbmQgZGF0YSc7XG5cbmNvbnN0IGZpbGVJY29uQ29sb3IgPSAnI0QzRDhFMCc7XG5cbmNvbnN0IFdhcm5pbmdNc2cgPSBzdHlsZWQuc3BhbmBcbiAgbWFyZ2luLXRvcDogMTBweDtcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZXJyb3JDb2xvcn07XG5gO1xuXG5jb25zdCBQb3NpdGl2ZU1zZyA9IHN0eWxlZC5zcGFuYFxuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wcmltYXJ5QnRuQWN0QmdkfTtcbmA7XG5cbmNvbnN0IFN0eWxlZEZpbGVEcm9wID0gc3R5bGVkLmRpdmBcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYm9yZGVyLXN0eWxlOiBkYXNoZWQ7XG4gIGJvcmRlci13aWR0aDogMXB4O1xuICBib3JkZXItY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc3VidGV4dENvbG9yTFR9O1xuICBoZWlnaHQ6IDQxNHB4O1xuICBwYWRkaW5nLXRvcDogNjBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB3aWR0aDogMTAwJTtcblxuICAuZmlsZS11cGxvYWQtb3Ige1xuICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmxpbmtCdG5Db2xvcn07XG4gICAgcGFkZGluZy1yaWdodDogNHB4O1xuICB9XG5gO1xuXG5jb25zdCBNc2dXcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubW9kYWxUaXRsZUNvbG9yfTtcbiAgZm9udC1zaXplOiAyMHB4O1xuICBoZWlnaHQ6IDM2cHg7XG5gO1xuXG5jb25zdCBTdHlsZWREcmFnTkRyb3BJY29uID0gc3R5bGVkLmRpdmBcbiAgY29sb3I6ICR7ZmlsZUljb25Db2xvcn07XG4gIG1hcmdpbi1ib3R0b206IDYwcHg7XG5cbiAgLmZpbGUtdHlwZS1yb3cge1xuICAgIG1hcmdpbi1ib3R0b206IDI2cHg7XG4gIH1cbmA7XG5cbmNvbnN0IFN0eWxlZEZpbGVVcGxvYWQgPSBzdHlsZWQuZGl2YFxuICAuZmlsdGVyLXVwbG9hZF9faW5wdXQge1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICBoZWlnaHQ6IDA7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICB9XG5cbiAgLmZpbGUtZHJvcCB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB9XG5cbiAgLmZpbGUtdXBsb2FkX19tZXNzYWdlIHtcbiAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JMVH07XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDEycHg7XG4gIH1cbmA7XG5cbmNvbnN0IFN0eWxlZE1lc3NhZ2UgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbmA7XG5cbmNvbnN0IFN0eWxlZERpc2NsYWltZXIgPSBzdHlsZWQoU3R5bGVkTWVzc2FnZSlgXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAwO1xuICBwYWRkaW5nOiAxMHB4IDMwcHg7XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaWxlVXBsb2FkIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICB2YWxpZEZpbGVFeHQ6IGRlZmF1bHRWYWxpZEZpbGVFeHRcbiAgfTtcblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG9uRmlsZVVwbG9hZDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICB2YWxpZEZpbGVFeHQ6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpXG4gIH07XG5cbiAgc3RhdGUgPSB7XG4gICAgZHJhZ092ZXI6IGZhbHNlLFxuICAgIGZpbGVzOiBbXSxcbiAgICBlcnJvckZpbGVzOiBbXVxuICB9O1xuXG4gIF9pc1ZhbGlkRmlsZVR5cGUgPSBmaWxlbmFtZSA9PiB7XG4gICAgY29uc3Qge3ZhbGlkRmlsZUV4dH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGZpbGVFeHQgPSB2YWxpZEZpbGVFeHQuZmluZChleHQgPT4gZmlsZW5hbWUuZW5kc1dpdGgoZXh0KSk7XG5cbiAgICByZXR1cm4gQm9vbGVhbihmaWxlRXh0KTtcbiAgfTtcblxuICBfaGFuZGxlRmlsZURyb3AgPSAoZmlsZXMsIGUpID0+IHtcbiAgICBpZiAoZSkge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBjb25zdCBuZXh0U3RhdGUgPSB7ZmlsZXM6IFtdLCBlcnJvckZpbGVzOiBbXSwgZHJhZ092ZXI6IGZhbHNlfTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBmaWxlID0gZmlsZXNbaV07XG5cbiAgICAgIGlmIChmaWxlICYmIHRoaXMuX2lzVmFsaWRGaWxlVHlwZShmaWxlLm5hbWUpKSB7XG4gICAgICAgIG5leHRTdGF0ZS5maWxlcy5wdXNoKGZpbGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV4dFN0YXRlLmVycm9yRmlsZXMucHVzaChmaWxlLm5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICBuZXh0U3RhdGUsXG4gICAgICAoKSA9PlxuICAgICAgICBuZXh0U3RhdGUuZmlsZXMubGVuZ3RoID8gdGhpcy5wcm9wcy5vbkZpbGVVcGxvYWQobmV4dFN0YXRlLmZpbGVzKSA6IG51bGxcbiAgICApO1xuICB9O1xuXG4gIF90b2dnbGVEcmFnU3RhdGUgPSBuZXdTdGF0ZSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7ZHJhZ092ZXI6IG5ld1N0YXRlfSk7XG4gIH07XG5cbiAgX3JlbmRlck1lc3NhZ2UoKSB7XG4gICAgY29uc3Qge2Vycm9yRmlsZXMsIGZpbGVzfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBpZiAoZXJyb3JGaWxlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxXYXJuaW5nTXNnPlxuICAgICAgICAgIHtgRmlsZSAke2Vycm9yRmlsZXMuam9pbignLCAnKX0gaXMgbm90IHN1cHBvcnRlZC5gfVxuICAgICAgICA8L1dhcm5pbmdNc2c+XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICghZmlsZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFN0eWxlZE1lc3NhZ2UgY2xhc3NOYW1lPVwiZmlsZS11cGxvYWRlcl9fbWVzc2FnZVwiPlxuICAgICAgICA8ZGl2PlVwbG9hZGluZy4uLjwvZGl2PlxuICAgICAgICA8UG9zaXRpdmVNc2c+XG4gICAgICAgICAge2Ake2ZpbGVzLm1hcChmID0+IGYubmFtZSkuam9pbignIGFuZCAnKX0uLi5gfVxuICAgICAgICA8L1Bvc2l0aXZlTXNnPlxuICAgICAgICA8TG9hZGluZ1NwaW5uZXIgc2l6ZT17MjB9IC8+XG4gICAgICA8L1N0eWxlZE1lc3NhZ2U+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7ZHJhZ092ZXIsIGZpbGVzfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3Qge3ZhbGlkRmlsZUV4dH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8U3R5bGVkRmlsZVVwbG9hZFxuICAgICAgICBjbGFzc05hbWU9XCJmaWxlLXVwbG9hZGVyXCJcbiAgICAgICAgaW5uZXJSZWY9e2NtcCA9PiAodGhpcy5mcmFtZSA9IGNtcCl9XG4gICAgICA+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGNsYXNzTmFtZT1cImZpbHRlci11cGxvYWRfX2lucHV0XCJcbiAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMuX29uQ2hhbmdlfVxuICAgICAgICAvPlxuICAgICAgICB7RmlsZURyb3AgPyAoXG4gICAgICAgICAgPEZpbGVEcm9wXG4gICAgICAgICAgICBmcmFtZT17dGhpcy5mcmFtZX1cbiAgICAgICAgICAgIHRhcmdldEFsd2F5c1Zpc2libGVcbiAgICAgICAgICAgIG9uRHJhZ092ZXI9eygpID0+IHRoaXMuX3RvZ2dsZURyYWdTdGF0ZSh0cnVlKX1cbiAgICAgICAgICAgIG9uRHJhZ0xlYXZlPXsoKSA9PiB0aGlzLl90b2dnbGVEcmFnU3RhdGUoZmFsc2UpfVxuICAgICAgICAgICAgb25Ecm9wPXt0aGlzLl9oYW5kbGVGaWxlRHJvcH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbGUtdXBsb2FkX19tZXNzYWdlXCI+e0NPTkZJR19VUExPQURfTUVTU0FHRX08L2Rpdj5cbiAgICAgICAgICAgIDxTdHlsZWRGaWxlRHJvcCBkcmFnT3Zlcj17ZHJhZ092ZXJ9PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7b3BhY2l0eTogZHJhZ092ZXIgPyAwLjUgOiAxfX0+XG4gICAgICAgICAgICAgICAgPFN0eWxlZERyYWdORHJvcEljb24+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbGUtdHlwZS1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAge3ZhbGlkRmlsZUV4dC5tYXAoZXh0ID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8RmlsZVR5cGUga2V5PXtleHR9IGV4dD17ZXh0fSBoZWlnaHQ9XCI1MHB4XCIgZm9udFNpemU9XCI5cHhcIi8+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8RHJhZ05Ecm9wIGhlaWdodD1cIjQ0cHhcIiAvPlxuICAgICAgICAgICAgICAgIDwvU3R5bGVkRHJhZ05Ecm9wSWNvbj5cbiAgICAgICAgICAgICAgICA8ZGl2Pnt0aGlzLl9yZW5kZXJNZXNzYWdlKCl9PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB7IWZpbGVzLmxlbmd0aCA/IDxkaXY+XG4gICAgICAgICAgICAgICAgPE1zZ1dyYXBwZXI+e01FU1NBR0V9PC9Nc2dXcmFwcGVyPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZpbGUtdXBsb2FkLW9yXCI+b3I8L3NwYW4+XG4gICAgICAgICAgICAgICAgPFVwbG9hZEJ1dHRvbiBvblVwbG9hZD17dGhpcy5faGFuZGxlRmlsZURyb3B9PlxuICAgICAgICAgICAgICAgICAgYnJvd3NlIHlvdXIgZmlsZXNcbiAgICAgICAgICAgICAgICA8L1VwbG9hZEJ1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+IDogbnVsbH1cbiAgICAgICAgICAgICAgPFN0eWxlZERpc2NsYWltZXI+e0RJU0NMQUlNRVJ9PC9TdHlsZWREaXNjbGFpbWVyPlxuICAgICAgICAgICAgPC9TdHlsZWRGaWxlRHJvcD5cbiAgICAgICAgICA8L0ZpbGVEcm9wPlxuICAgICAgICApIDogbnVsbH1cblxuICAgICAgICA8V2FybmluZ01zZz57aXNDaHJvbWUoKSA/IENIUk9NRV9NU0cgOiAnJ308L1dhcm5pbmdNc2c+XG4gICAgICA8L1N0eWxlZEZpbGVVcGxvYWQ+XG4gICAgKTtcbiAgfVxufVxuIl19