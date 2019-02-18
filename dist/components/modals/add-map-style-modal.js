"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

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

var _classnames = _interopRequireDefault(require("classnames"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactMapGl = _interopRequireDefault(require("react-map-gl"));

var _reactDom = require("react-dom");

var _styledComponents2 = require("../common/styled-components");

var _mapboxUtils = require("../../utils/map-style-utils/mapbox-utils");

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  font-weight: 500;\n  \n  :hover {\n    cursor: pointer;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  margin-left: 116px;\n  flex-shrink: 0;\n  width: ", "px;\n\n  .preview-title {\n    font-weight: 500;\n    font-size: 10px;\n    padding: 8px 0px;\n  }\n  \n  .preview-title.error {\n    color: ", ";\n  }\n\n  .preview-image {\n    background: ", ";\n    border-radius: 4px;\n    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.18);\n    width: ", "px;\n    height: ", "px;\n    position: relative;\n  }\n\n  .preview-image-placeholder {\n    position: absolute;\n    top: 0;\n    left: 0;\n  }\n\n  .preview-image-spinner {\n    position: absolute;\n    left: calc(50% - 25px);\n    top: calc(50% - 25px);\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  font-size: 12px;\n  .modal-section {\n    margin-bottom: 32px;\n  }\n  .modal-section:first-child {\n    margin-top: 24px;\n  }\n  \n  .modal-section {\n    .modal-section-title {\n      font-weight: 500;\n    }\n    .modal-section-subtitle {\n      color: ", ";\n    }\n    \n    input {\n      margin-top: 8px;\n    }\n  }\n\n  input {\n    margin-right: 8px;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var MapH = 190;
var MapW = 264;
var ErrorMsg = {
  styleError: 'Failed to load map style, make sure it is published. For private style, paste in your access token.'
};

var InstructionPanel = _styledComponents.default.div(_templateObject(), function (props) {
  return props.theme.subtextColorLT;
});

var PreviewMap = _styledComponents.default.div(_templateObject2(), MapW, function (props) {
  return props.theme.errorColor;
}, function (props) {
  return props.theme.modalImagePlaceHolder;
}, MapW, MapH);

var InlineLink = _styledComponents.default.a(_templateObject3());

var AddMapStyleModal =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(AddMapStyleModal, _Component);

  function AddMapStyleModal() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, AddMapStyleModal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(AddMapStyleModal)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      reRenderKey: 0
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "loadMapStyleJson", function (style) {
      _this.props.loadCustomMapStyle({
        style: style,
        error: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "loadMapStyleIcon", function () {
      if (_this.mapRef) {
        var canvas = (0, _reactDom.findDOMNode)(_this.mapRef).querySelector('.mapboxgl-canvas');
        var dataUri = canvas.toDataURL();

        _this.props.loadCustomMapStyle({
          icon: dataUri
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "loadMaoStyleError", function () {
      _this.props.loadCustomMapStyle({
        error: true
      });
    });
    return _this;
  }

  (0, _createClass2.default)(AddMapStyleModal, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.inputStyle.accessToken !== nextProps.inputStyle.accessToken) {
        // toke has changed
        // ReactMapGl doesn't re-create map when token has changed
        // here we force the map to update
        this.setState({
          reRenderKey: this.state.reRenderKey + 1
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this2 = this;

      var map = this.mapRef && this.mapRef.getMap();

      if (map && this._map !== map) {
        this._map = map;
        map.on('style.load', function () {
          var style = map.getStyle();

          _this2.loadMapStyleJson(style);
        });
        map.on('render', function () {
          if (map.isStyleLoaded()) {
            _this2.loadMapStyleIcon();
          }
        });
        map.on('error', function () {
          _this2.loadMaoStyleError();
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          inputStyle = _this$props.inputStyle,
          mapState = _this$props.mapState;
      var mapProps = (0, _objectSpread2.default)({}, mapState, {
        preserveDrawingBuffer: true,
        mapboxApiAccessToken: inputStyle.accessToken || this.props.mapboxApiAccessToken,
        transformRequest: _mapboxUtils.transformRequest
      });
      return _react.default.createElement("div", {
        className: "add-map-style-modal"
      }, _react.default.createElement(_styledComponents2.StyledModalContent, null, _react.default.createElement(InstructionPanel, null, _react.default.createElement("div", {
        className: "modal-section"
      }, _react.default.createElement("div", {
        className: "modal-section-title"
      }, "1. Publish your style at mapbox or provide access token"), _react.default.createElement("div", {
        className: "modal-section-subtitle"
      }, "You can create your own map style at", _react.default.createElement(InlineLink, {
        target: "_blank",
        href: "https://www.mapbox.com/studio/styles/"
      }, " mapbox"), " and", _react.default.createElement(InlineLink, {
        target: "_blank",
        href: "https://www.mapbox.com/help/studio-manual-publish/"
      }, " publish"), " it."), _react.default.createElement("div", {
        className: "modal-section-subtitle"
      }, "To use private style, paste your", _react.default.createElement(InlineLink, {
        target: "_blank",
        href: "https://www.mapbox.com/help/how-access-tokens-work/"
      }, " access token"), " here. *kepler.gl is a client-side application, data stays in your browser.."), _react.default.createElement(_styledComponents2.InputLight, {
        type: "text",
        value: inputStyle.accessToken || '',
        onChange: function onChange(_ref) {
          var value = _ref.target.value;
          return _this3.props.inputMapStyle((0, _objectSpread2.default)({}, inputStyle, {
            accessToken: value
          }));
        },
        placeholder: "e.g. pk.abcdefg.xxxxxx"
      })), _react.default.createElement("div", {
        className: "modal-section"
      }, _react.default.createElement("div", {
        className: "modal-section-title"
      }, "2. Paste style url"), _react.default.createElement("div", {
        className: "modal-section-subtitle"
      }, "What is a", _react.default.createElement(InlineLink, {
        target: "_blank",
        href: "https://www.mapbox.com/help/studio-manual-publish/#style-url"
      }, " style URL")), _react.default.createElement(_styledComponents2.InputLight, {
        type: "text",
        value: inputStyle.url || '',
        onChange: function onChange(_ref2) {
          var value = _ref2.target.value;
          return _this3.props.inputMapStyle((0, _objectSpread2.default)({}, inputStyle, {
            url: value
          }));
        },
        placeholder: "e.g. mapbox://styles/uberdataviz/abcdefghijklmnopq"
      })), _react.default.createElement("div", {
        className: "modal-section"
      }, _react.default.createElement("div", {
        className: "modal-section-title"
      }, "3. Name your style"), _react.default.createElement(_styledComponents2.InputLight, {
        type: "text",
        value: inputStyle.label || '',
        onChange: function onChange(_ref3) {
          var value = _ref3.target.value;
          return _this3.props.inputMapStyle((0, _objectSpread2.default)({}, inputStyle, {
            label: value
          }));
        }
      }))), _react.default.createElement(PreviewMap, null, _react.default.createElement("div", {
        className: (0, _classnames.default)('preview-title', {
          error: inputStyle.error
        })
      }, inputStyle.error ? ErrorMsg.styleError : inputStyle.style && inputStyle.style.name || ''), _react.default.createElement("div", {
        className: "preview-image"
      }, !inputStyle.isValid ? _react.default.createElement("div", {
        className: "preview-image-spinner"
      }) : _react.default.createElement(_styledComponents2.StyledMapContainer, null, _react.default.createElement(_reactMapGl.default, (0, _extends2.default)({}, mapProps, {
        ref: function ref(el) {
          _this3.mapRef = el;
        },
        key: this.state.reRenderKey,
        width: MapW,
        height: MapH,
        mapStyle: inputStyle.url
      })))))));
    }
  }]);
  return AddMapStyleModal;
}(_react.Component);

(0, _defineProperty2.default)(AddMapStyleModal, "propTypes", {
  mapState: _propTypes.default.object.isRequired,
  inputMapStyle: _propTypes.default.func.isRequired,
  loadCustomMapStyle: _propTypes.default.func.isRequired,
  inputStyle: _propTypes.default.object.isRequired
});

var AddMapStyleModalFactory = function AddMapStyleModalFactory() {
  return AddMapStyleModal;
};

var _default = AddMapStyleModalFactory;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZGFscy9hZGQtbWFwLXN0eWxlLW1vZGFsLmpzIl0sIm5hbWVzIjpbIk1hcEgiLCJNYXBXIiwiRXJyb3JNc2ciLCJzdHlsZUVycm9yIiwiSW5zdHJ1Y3Rpb25QYW5lbCIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJzdWJ0ZXh0Q29sb3JMVCIsIlByZXZpZXdNYXAiLCJlcnJvckNvbG9yIiwibW9kYWxJbWFnZVBsYWNlSG9sZGVyIiwiSW5saW5lTGluayIsImEiLCJBZGRNYXBTdHlsZU1vZGFsIiwicmVSZW5kZXJLZXkiLCJzdHlsZSIsImxvYWRDdXN0b21NYXBTdHlsZSIsImVycm9yIiwibWFwUmVmIiwiY2FudmFzIiwicXVlcnlTZWxlY3RvciIsImRhdGFVcmkiLCJ0b0RhdGFVUkwiLCJpY29uIiwibmV4dFByb3BzIiwiaW5wdXRTdHlsZSIsImFjY2Vzc1Rva2VuIiwic2V0U3RhdGUiLCJzdGF0ZSIsIm1hcCIsImdldE1hcCIsIl9tYXAiLCJvbiIsImdldFN0eWxlIiwibG9hZE1hcFN0eWxlSnNvbiIsImlzU3R5bGVMb2FkZWQiLCJsb2FkTWFwU3R5bGVJY29uIiwibG9hZE1hb1N0eWxlRXJyb3IiLCJtYXBTdGF0ZSIsIm1hcFByb3BzIiwicHJlc2VydmVEcmF3aW5nQnVmZmVyIiwibWFwYm94QXBpQWNjZXNzVG9rZW4iLCJ0cmFuc2Zvcm1SZXF1ZXN0IiwidmFsdWUiLCJ0YXJnZXQiLCJpbnB1dE1hcFN0eWxlIiwidXJsIiwibGFiZWwiLCJuYW1lIiwiaXNWYWxpZCIsImVsIiwiQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiaXNSZXF1aXJlZCIsImZ1bmMiLCJBZGRNYXBTdHlsZU1vZGFsRmFjdG9yeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFHQTs7Ozs7Ozs7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InNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgTWFwYm94R0xNYXAgZnJvbSAncmVhY3QtbWFwLWdsJztcbmltcG9ydCB7ZmluZERPTU5vZGV9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQge1N0eWxlZE1vZGFsQ29udGVudCwgSW5wdXRMaWdodCwgU3R5bGVkTWFwQ29udGFpbmVyfSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5cbi8vIFV0aWxzXG5pbXBvcnQge3RyYW5zZm9ybVJlcXVlc3R9IGZyb20gJ3V0aWxzL21hcC1zdHlsZS11dGlscy9tYXBib3gtdXRpbHMnO1xuXG5jb25zdCBNYXBIID0gMTkwO1xuY29uc3QgTWFwVyA9IDI2NDtcbmNvbnN0IEVycm9yTXNnID0ge1xuICBzdHlsZUVycm9yIDogJ0ZhaWxlZCB0byBsb2FkIG1hcCBzdHlsZSwgbWFrZSBzdXJlIGl0IGlzIHB1Ymxpc2hlZC4gRm9yIHByaXZhdGUgc3R5bGUsIHBhc3RlIGluIHlvdXIgYWNjZXNzIHRva2VuLidcbn07XG5cbmNvbnN0IEluc3RydWN0aW9uUGFuZWwgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbiAgZm9udC1zaXplOiAxMnB4O1xuICAubW9kYWwtc2VjdGlvbiB7XG4gICAgbWFyZ2luLWJvdHRvbTogMzJweDtcbiAgfVxuICAubW9kYWwtc2VjdGlvbjpmaXJzdC1jaGlsZCB7XG4gICAgbWFyZ2luLXRvcDogMjRweDtcbiAgfVxuICBcbiAgLm1vZGFsLXNlY3Rpb24ge1xuICAgIC5tb2RhbC1zZWN0aW9uLXRpdGxlIHtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgfVxuICAgIC5tb2RhbC1zZWN0aW9uLXN1YnRpdGxlIHtcbiAgICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnN1YnRleHRDb2xvckxUfTtcbiAgICB9XG4gICAgXG4gICAgaW5wdXQge1xuICAgICAgbWFyZ2luLXRvcDogOHB4O1xuICAgIH1cbiAgfVxuXG4gIGlucHV0IHtcbiAgICBtYXJnaW4tcmlnaHQ6IDhweDtcbiAgfVxuYDtcblxuY29uc3QgUHJldmlld01hcCA9IHN0eWxlZC5kaXZgXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBtYXJnaW4tbGVmdDogMTE2cHg7XG4gIGZsZXgtc2hyaW5rOiAwO1xuICB3aWR0aDogJHtNYXBXfXB4O1xuXG4gIC5wcmV2aWV3LXRpdGxlIHtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICAgIGZvbnQtc2l6ZTogMTBweDtcbiAgICBwYWRkaW5nOiA4cHggMHB4O1xuICB9XG4gIFxuICAucHJldmlldy10aXRsZS5lcnJvciB7XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZXJyb3JDb2xvcn07XG4gIH1cblxuICAucHJldmlldy1pbWFnZSB7XG4gICAgYmFja2dyb3VuZDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5tb2RhbEltYWdlUGxhY2VIb2xkZXJ9O1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICBib3gtc2hhZG93OiAwIDhweCAxNnB4IDAgcmdiYSgwLDAsMCwwLjE4KTtcbiAgICB3aWR0aDogJHtNYXBXfXB4O1xuICAgIGhlaWdodDogJHtNYXBIfXB4O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgfVxuXG4gIC5wcmV2aWV3LWltYWdlLXBsYWNlaG9sZGVyIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gIH1cblxuICAucHJldmlldy1pbWFnZS1zcGlubmVyIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogY2FsYyg1MCUgLSAyNXB4KTtcbiAgICB0b3A6IGNhbGMoNTAlIC0gMjVweCk7XG4gIH1cbmA7XG5cbmNvbnN0IElubGluZUxpbmsgPSBzdHlsZWQuYWBcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgXG4gIDpob3ZlciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICB9XG5gO1xuXG5jbGFzcyBBZGRNYXBTdHlsZU1vZGFsIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBtYXBTdGF0ZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIGlucHV0TWFwU3R5bGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgbG9hZEN1c3RvbU1hcFN0eWxlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGlucHV0U3R5bGU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxuICB9O1xuXG4gIHN0YXRlID0ge1xuICAgIHJlUmVuZGVyS2V5OiAwXG4gIH07XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5pbnB1dFN0eWxlLmFjY2Vzc1Rva2VuICE9PSBuZXh0UHJvcHMuaW5wdXRTdHlsZS5hY2Nlc3NUb2tlbikge1xuICAgICAgLy8gdG9rZSBoYXMgY2hhbmdlZFxuICAgICAgLy8gUmVhY3RNYXBHbCBkb2Vzbid0IHJlLWNyZWF0ZSBtYXAgd2hlbiB0b2tlbiBoYXMgY2hhbmdlZFxuICAgICAgLy8gaGVyZSB3ZSBmb3JjZSB0aGUgbWFwIHRvIHVwZGF0ZVxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHJlUmVuZGVyS2V5OiB0aGlzLnN0YXRlLnJlUmVuZGVyS2V5ICsgMVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIGNvbnN0IG1hcCA9IHRoaXMubWFwUmVmICYmIHRoaXMubWFwUmVmLmdldE1hcCgpO1xuICAgIGlmIChtYXAgJiYgdGhpcy5fbWFwICE9PSBtYXApIHtcbiAgICAgIHRoaXMuX21hcCA9IG1hcDtcblxuICAgICAgbWFwLm9uKCdzdHlsZS5sb2FkJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBzdHlsZSA9IG1hcC5nZXRTdHlsZSgpO1xuICAgICAgICB0aGlzLmxvYWRNYXBTdHlsZUpzb24oc3R5bGUpO1xuICAgICAgfSk7XG5cbiAgICAgIG1hcC5vbigncmVuZGVyJywgKCkgPT4ge1xuICAgICAgICBpZiAobWFwLmlzU3R5bGVMb2FkZWQoKSkge1xuICAgICAgICAgIHRoaXMubG9hZE1hcFN0eWxlSWNvbigpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgbWFwLm9uKCdlcnJvcicsICgpID0+IHtcbiAgICAgICAgdGhpcy5sb2FkTWFvU3R5bGVFcnJvcigpO1xuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBsb2FkTWFwU3R5bGVKc29uID0gKHN0eWxlKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5sb2FkQ3VzdG9tTWFwU3R5bGUoe3N0eWxlLCBlcnJvcjogZmFsc2V9KTtcbiAgfTtcblxuICBsb2FkTWFwU3R5bGVJY29uID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLm1hcFJlZikge1xuICAgICAgY29uc3QgY2FudmFzID0gZmluZERPTU5vZGUodGhpcy5tYXBSZWYpLnF1ZXJ5U2VsZWN0b3IoJy5tYXBib3hnbC1jYW52YXMnKTtcbiAgICAgIGNvbnN0IGRhdGFVcmkgPSBjYW52YXMudG9EYXRhVVJMKCk7XG4gICAgICB0aGlzLnByb3BzLmxvYWRDdXN0b21NYXBTdHlsZSh7XG4gICAgICAgIGljb246IGRhdGFVcmlcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBsb2FkTWFvU3R5bGVFcnJvciA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLmxvYWRDdXN0b21NYXBTdHlsZSh7ZXJyb3I6IHRydWV9KTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge2lucHV0U3R5bGUsIG1hcFN0YXRlfSA9IHRoaXMucHJvcHM7XG5cbiAgY29uc3QgbWFwUHJvcHMgPSB7XG4gICAgLi4ubWFwU3RhdGUsXG4gICAgcHJlc2VydmVEcmF3aW5nQnVmZmVyOiB0cnVlLFxuICAgIG1hcGJveEFwaUFjY2Vzc1Rva2VuOiBpbnB1dFN0eWxlLmFjY2Vzc1Rva2VuIHx8IHRoaXMucHJvcHMubWFwYm94QXBpQWNjZXNzVG9rZW4sXG4gICAgdHJhbnNmb3JtUmVxdWVzdFxuICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRkLW1hcC1zdHlsZS1tb2RhbFwiPlxuICAgICAgICA8U3R5bGVkTW9kYWxDb250ZW50PlxuICAgICAgICAgIDxJbnN0cnVjdGlvblBhbmVsPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1zZWN0aW9uXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtc2VjdGlvbi10aXRsZVwiPjEuIFB1Ymxpc2ggeW91ciBzdHlsZSBhdCBtYXBib3ggb3IgcHJvdmlkZSBhY2Nlc3MgdG9rZW48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1zZWN0aW9uLXN1YnRpdGxlXCI+XG4gICAgICAgICAgICAgICAgWW91IGNhbiBjcmVhdGUgeW91ciBvd24gbWFwIHN0eWxlIGF0XG4gICAgICAgICAgICAgICAgPElubGluZUxpbmsgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vd3d3Lm1hcGJveC5jb20vc3R1ZGlvL3N0eWxlcy9cIj4gbWFwYm94PC9JbmxpbmVMaW5rPiBhbmRcbiAgICAgICAgICAgICAgICA8SW5saW5lTGluayB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly93d3cubWFwYm94LmNvbS9oZWxwL3N0dWRpby1tYW51YWwtcHVibGlzaC9cIj4gcHVibGlzaDwvSW5saW5lTGluaz4gaXQuXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLXNlY3Rpb24tc3VidGl0bGVcIj5cbiAgICAgICAgICAgICAgICBUbyB1c2UgcHJpdmF0ZSBzdHlsZSwgcGFzdGUgeW91clxuICAgICAgICAgICAgICAgIDxJbmxpbmVMaW5rIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL3d3dy5tYXBib3guY29tL2hlbHAvaG93LWFjY2Vzcy10b2tlbnMtd29yay9cIj4gYWNjZXNzIHRva2VuPC9JbmxpbmVMaW5rPiBoZXJlLiAqa2VwbGVyLmdsIGlzIGEgY2xpZW50LXNpZGUgYXBwbGljYXRpb24sIGRhdGEgc3RheXMgaW4geW91ciBicm93c2VyLi5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxJbnB1dExpZ2h0XG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtpbnB1dFN0eWxlLmFjY2Vzc1Rva2VuIHx8ICcnfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoe3RhcmdldDoge3ZhbHVlfX0pID0+IHRoaXMucHJvcHMuaW5wdXRNYXBTdHlsZSh7Li4uaW5wdXRTdHlsZSwgYWNjZXNzVG9rZW46IHZhbHVlfSl9XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJlLmcuIHBrLmFiY2RlZmcueHh4eHh4XCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1zZWN0aW9uXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtc2VjdGlvbi10aXRsZVwiPjIuIFBhc3RlIHN0eWxlIHVybDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLXNlY3Rpb24tc3VidGl0bGVcIj5cbiAgICAgICAgICAgICAgICBXaGF0IGlzIGFcbiAgICAgICAgICAgICAgICA8SW5saW5lTGluayB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly93d3cubWFwYm94LmNvbS9oZWxwL3N0dWRpby1tYW51YWwtcHVibGlzaC8jc3R5bGUtdXJsXCI+IHN0eWxlIFVSTDwvSW5saW5lTGluaz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxJbnB1dExpZ2h0XG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtpbnB1dFN0eWxlLnVybCB8fCAnJ31cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KHt0YXJnZXQ6IHt2YWx1ZX19KSA9PiB0aGlzLnByb3BzLmlucHV0TWFwU3R5bGUoey4uLmlucHV0U3R5bGUsIHVybDogdmFsdWV9KX1cbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cImUuZy4gbWFwYm94Oi8vc3R5bGVzL3ViZXJkYXRhdml6L2FiY2RlZmdoaWprbG1ub3BxXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1zZWN0aW9uXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtc2VjdGlvbi10aXRsZVwiPjMuIE5hbWUgeW91ciBzdHlsZTwvZGl2PlxuICAgICAgICAgICAgICA8SW5wdXRMaWdodFxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17aW5wdXRTdHlsZS5sYWJlbCB8fCAnJ31cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KHt0YXJnZXQ6IHt2YWx1ZX19KSA9PiB0aGlzLnByb3BzLmlucHV0TWFwU3R5bGUoey4uLmlucHV0U3R5bGUsIGxhYmVsOiB2YWx1ZX0pfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9JbnN0cnVjdGlvblBhbmVsPlxuICAgICAgICAgIDxQcmV2aWV3TWFwPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ3ByZXZpZXctdGl0bGUnLCB7ZXJyb3I6IGlucHV0U3R5bGUuZXJyb3J9KX0+XG4gICAgICAgICAgICAgIHtpbnB1dFN0eWxlLmVycm9yID8gRXJyb3JNc2cuc3R5bGVFcnJvciA6XG4gICAgICAgICAgICAgICAgKGlucHV0U3R5bGUuc3R5bGUgJiYgaW5wdXRTdHlsZS5zdHlsZS5uYW1lKSB8fCAnJ308L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJldmlldy1pbWFnZVwiPlxuICAgICAgICAgICAgICB7IWlucHV0U3R5bGUuaXNWYWxpZCA/XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcmV2aWV3LWltYWdlLXNwaW5uZXJcIi8+IDpcbiAgICAgICAgICAgICAgICA8U3R5bGVkTWFwQ29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgPE1hcGJveEdMTWFwXG4gICAgICAgICAgICAgICAgICAgIHsuLi5tYXBQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPXtlbCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBSZWYgPSBlbDtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAga2V5PXt0aGlzLnN0YXRlLnJlUmVuZGVyS2V5fVxuICAgICAgICAgICAgICAgICAgICB3aWR0aD17TWFwV31cbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PXtNYXBIfVxuICAgICAgICAgICAgICAgICAgICBtYXBTdHlsZT17aW5wdXRTdHlsZS51cmx9Lz5cbiAgICAgICAgICAgICAgICA8L1N0eWxlZE1hcENvbnRhaW5lcj5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9QcmV2aWV3TWFwPlxuICAgICAgICA8L1N0eWxlZE1vZGFsQ29udGVudD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuY29uc3QgQWRkTWFwU3R5bGVNb2RhbEZhY3RvcnkgPSAoKSA9PiBBZGRNYXBTdHlsZU1vZGFsO1xuZXhwb3J0IGRlZmF1bHQgQWRkTWFwU3R5bGVNb2RhbEZhY3Rvcnk7XG4iXX0=