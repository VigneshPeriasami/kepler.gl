"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

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

var _window = require("global/window");

var _redux = require("redux");

var _d3Request = require("d3-request");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _keplerglConnect = require("../connect/keplergl-connect");

var _mapboxGlStyleEditor = require("../utils/map-style-utils/mapbox-gl-style-editor");

var VisStateActions = _interopRequireWildcard(require("../actions/vis-state-actions"));

var MapStateActions = _interopRequireWildcard(require("../actions/map-state-actions"));

var MapStyleActions = _interopRequireWildcard(require("../actions/map-style-actions"));

var UIStateActions = _interopRequireWildcard(require("../actions/ui-state-actions"));

var _defaultSettings = require("../constants/default-settings");

var _sidePanel = _interopRequireDefault(require("./side-panel"));

var _mapContainer = _interopRequireDefault(require("./map-container"));

var _bottomWidget = _interopRequireDefault(require("./bottom-widget"));

var _modalContainer = _interopRequireDefault(require("./modal-container"));

var _plotContainer = _interopRequireDefault(require("./plot-container"));

var _notificationPanel = _interopRequireDefault(require("./notification-panel"));

var _utils = require("../utils/utils");

var _base = require("../styles/base");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  font-family: ff-clan-web-pro, 'Helvetica Neue', Helvetica, sans-serif;\n  font-weight: 400;\n  font-size: 0.875em;\n  line-height: 1.71429;\n\n  *,\n  *:before,\n  *:after {\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n  }\n\n  ul {\n    margin: 0;\n    padding: 0;\n  }\n\n  li {\n    margin: 0;\n  }\n\n  a {\n    text-decoration: none;\n    color: ", ";\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

// Maybe we should think about exporting this or creating a variable
// as part of the base.js theme
var GlobalStyle = _styledComponents.default.div(_templateObject(), function (props) {
  return props.theme.labelColor;
});

KeplerGlFactory.deps = [_bottomWidget.default, _mapContainer.default, _modalContainer.default, _sidePanel.default, _plotContainer.default, _notificationPanel.default];

function KeplerGlFactory(BottomWidget, MapContainer, ModalWrapper, SidePanel, PlotContainer, NotificationPanel) {
  var KeplerGL =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2.default)(KeplerGL, _Component);

    function KeplerGL() {
      var _getPrototypeOf2;

      var _this;

      (0, _classCallCheck2.default)(this, KeplerGL);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(KeplerGL)).call.apply(_getPrototypeOf2, [this].concat(args)));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_loadMapStyle", function () {
        var defaultStyles = Object.values(_this.props.mapStyle.mapStyles); // add id to custom map styles if not given

        var customeStyles = (_this.props.mapStyles || []).map(function (ms) {
          return (0, _objectSpread2.default)({}, ms, {
            id: ms.id || (0, _utils.generateHashId)()
          });
        });
        [].concat((0, _toConsumableArray2.default)(customeStyles), (0, _toConsumableArray2.default)(defaultStyles)).forEach(function (style) {
          if (style.style) {
            _this.props.mapStyleActions.loadMapStyles((0, _defineProperty2.default)({}, style.id, style));
          } else {
            _this._requestMapStyle(style);
          }
        });
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_requestMapStyle", function (mapStyle) {
        var url = mapStyle.url,
            id = mapStyle.id;
        var downloadUrl = (0, _mapboxGlStyleEditor.isValidStyleUrl)(url) ? (0, _mapboxGlStyleEditor.getStyleDownloadUrl)(url, _this.props.mapboxApiAccessToken) : url;
        (0, _d3Request.json)(downloadUrl, function (error, result) {
          if (error) {
            _window.console.warn("Error loading map style ".concat(url));
          } else {
            _this.props.mapStyleActions.loadMapStyles((0, _defineProperty2.default)({}, id, (0, _objectSpread2.default)({}, mapStyle, {
              style: result
            })));
          }
        });
      });
      return _this;
    }

    (0, _createClass2.default)(KeplerGL, [{
      key: "componentWillMount",
      value: function componentWillMount() {
        this._loadMapStyle(this.props.mapStyles);

        this._handleResize(this.props);
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        if ( // if dimension props has changed
        this.props.height !== nextProps.height || this.props.width !== nextProps.width || // react-map-gl will dispatch updateViewport after this._handleResize is called
        // here we check if this.props.mapState.height is sync with props.height
        nextProps.height !== this.props.mapState.height) {
          this._handleResize(nextProps);
        }
      }
    }, {
      key: "_handleResize",
      value: function _handleResize(_ref) {
        var width = _ref.width,
            height = _ref.height;

        if (!Number.isFinite(width) || !Number.isFinite(height)) {
          _window.console.warn('width and height is required');

          return;
        }

        this.props.mapStateActions.updateMap({
          width: width / (1 + Number(this.props.mapState.isSplit)),
          height: height
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var _this$props = this.props,
            id = _this$props.id,
            appName = _this$props.appName,
            version = _this$props.version,
            onSaveMap = _this$props.onSaveMap,
            width = _this$props.width,
            height = _this$props.height,
            mapboxApiAccessToken = _this$props.mapboxApiAccessToken,
            mapStyle = _this$props.mapStyle,
            mapState = _this$props.mapState,
            uiState = _this$props.uiState,
            visState = _this$props.visState,
            visStateActions = _this$props.visStateActions,
            mapStateActions = _this$props.mapStateActions,
            mapStyleActions = _this$props.mapStyleActions,
            uiStateActions = _this$props.uiStateActions;
        var filters = visState.filters,
            layers = visState.layers,
            splitMaps = visState.splitMaps,
            layerOrder = visState.layerOrder,
            layerBlending = visState.layerBlending,
            layerClasses = visState.layerClasses,
            interactionConfig = visState.interactionConfig,
            datasets = visState.datasets,
            layerData = visState.layerData,
            hoverInfo = visState.hoverInfo,
            clicked = visState.clicked;
        var notificationPanelFields = {
          removeNotification: uiStateActions.removeNotification,
          notifications: uiState.notifications
        };
        var sideFields = {
          appName: appName,
          version: version,
          datasets: datasets,
          filters: filters,
          layers: layers,
          layerOrder: layerOrder,
          layerClasses: layerClasses,
          interactionConfig: interactionConfig,
          mapStyle: mapStyle,
          layerBlending: layerBlending,
          onSaveMap: onSaveMap,
          uiState: uiState,
          mapStyleActions: mapStyleActions,
          visStateActions: visStateActions,
          uiStateActions: uiStateActions,
          width: _defaultSettings.DIMENSIONS.sidePanel.width
        };
        var mapFields = {
          datasets: datasets,
          mapboxApiAccessToken: mapboxApiAccessToken,
          mapState: mapState,
          mapStyle: mapStyle,
          mapControls: uiState.mapControls,
          layers: layers,
          layerOrder: layerOrder,
          layerData: layerData,
          layerBlending: layerBlending,
          interactionConfig: interactionConfig,
          hoverInfo: hoverInfo,
          clicked: clicked,
          toggleMapControl: uiStateActions.toggleMapControl,
          uiStateActions: uiStateActions,
          visStateActions: visStateActions,
          mapStateActions: mapStateActions
        };
        var isSplit = splitMaps && splitMaps.length > 1;
        var containerW = mapState.width * (Number(isSplit) + 1);
        var mapContainers = !isSplit ? [_react.default.createElement(MapContainer, (0, _extends2.default)({
          key: 0,
          index: 0
        }, mapFields, {
          mapLayers: isSplit ? splitMaps[0].layers : null
        }))] : splitMaps.map(function (settings, index) {
          return _react.default.createElement(MapContainer, (0, _extends2.default)({
            key: index,
            index: index
          }, mapFields, {
            mapLayers: splitMaps[index].layers
          }));
        });
        var isExporting = uiState.currentModal === _defaultSettings.EXPORT_IMAGE_ID;
        return _react.default.createElement(_styledComponents.ThemeProvider, {
          theme: _base.theme
        }, _react.default.createElement(GlobalStyle, {
          style: {
            position: 'relative',
            width: "".concat(mapState.width, "px"),
            height: "".concat(mapState.height, "px")
          },
          className: "kepler-gl",
          id: "kepler-gl__".concat(id),
          ref: function ref(node) {
            _this2.root = node;
          }
        }, _react.default.createElement(NotificationPanel, notificationPanelFields), !uiState.readOnly && _react.default.createElement(SidePanel, sideFields), _react.default.createElement("div", {
          className: "maps",
          style: {
            display: 'flex'
          }
        }, mapContainers), isExporting && _react.default.createElement(PlotContainer, {
          width: width,
          height: height,
          exportImageSetting: uiState.exportImage,
          mapFields: mapFields,
          startExportingImage: uiStateActions.startExportingImage,
          setExportImageDataUri: uiStateActions.setExportImageDataUri
        }), _react.default.createElement(BottomWidget, {
          filters: filters,
          datasets: datasets,
          uiState: uiState,
          visStateActions: visStateActions,
          sidePanelWidth: _defaultSettings.DIMENSIONS.sidePanel.width + _defaultSettings.DIMENSIONS.sidePanel.margin.left,
          containerW: containerW
        }), _react.default.createElement(ModalWrapper, {
          mapStyle: mapStyle,
          visState: visState,
          mapState: mapState,
          uiState: uiState,
          mapboxApiAccessToken: mapboxApiAccessToken,
          visStateActions: visStateActions,
          uiStateActions: uiStateActions,
          mapStyleActions: mapStyleActions,
          rootNode: this.root,
          containerW: containerW,
          containerH: mapState.height
        })));
      }
    }]);
    return KeplerGL;
  }(_react.Component);

  (0, _defineProperty2.default)(KeplerGL, "defaultProps", {
    mapStyles: [],
    width: 800,
    height: 800,
    appName: _defaultSettings.KEPLER_GL_NAME,
    version: _defaultSettings.KEPLER_GL_VERSION
  });
  return (0, _keplerglConnect.connect)(mapStateToProps, mapDispatchToProps)(KeplerGL);
}

function mapStateToProps(state, props) {
  return (0, _objectSpread2.default)({}, props, {
    visState: state.visState,
    mapStyle: state.mapStyle,
    mapState: state.mapState,
    uiState: state.uiState
  });
}

function mapDispatchToProps(dispatch, ownProps) {
  var userActions = ownProps.actions || {};

  var _map = [VisStateActions, MapStateActions, MapStyleActions, UIStateActions].map(function (actions) {
    return (0, _redux.bindActionCreators)(mergeActions(actions, userActions), dispatch);
  }),
      _map2 = (0, _slicedToArray2.default)(_map, 4),
      visStateActions = _map2[0],
      mapStateActions = _map2[1],
      mapStyleActions = _map2[2],
      uiStateActions = _map2[3];

  return {
    visStateActions: visStateActions,
    mapStateActions: mapStateActions,
    mapStyleActions: mapStyleActions,
    uiStateActions: uiStateActions,
    dispatch: dispatch
  };
}
/**
 * Override default maps-gl actions with user defined actions using the same key
 */


function mergeActions(actions, userActions) {
  var overrides = {};

  for (var key in userActions) {
    if (userActions.hasOwnProperty(key) && actions.hasOwnProperty(key)) {
      overrides[key] = userActions[key];
    }
  }

  return (0, _objectSpread2.default)({}, actions, overrides);
}

var _default = KeplerGlFactory;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2tlcGxlci1nbC5qcyJdLCJuYW1lcyI6WyJHbG9iYWxTdHlsZSIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJsYWJlbENvbG9yIiwiS2VwbGVyR2xGYWN0b3J5IiwiZGVwcyIsIkJvdHRvbVdpZGdldEZhY3RvcnkiLCJNYXBDb250YWluZXJGYWN0b3J5IiwiTW9kYWxDb250YWluZXJGYWN0b3J5IiwiU2lkZVBhbmVsRmFjdG9yeSIsIlBsb3RDb250YWluZXJGYWN0b3J5IiwiTm90aWZpY2F0aW9uUGFuZWxGYWN0b3J5IiwiQm90dG9tV2lkZ2V0IiwiTWFwQ29udGFpbmVyIiwiTW9kYWxXcmFwcGVyIiwiU2lkZVBhbmVsIiwiUGxvdENvbnRhaW5lciIsIk5vdGlmaWNhdGlvblBhbmVsIiwiS2VwbGVyR0wiLCJkZWZhdWx0U3R5bGVzIiwiT2JqZWN0IiwidmFsdWVzIiwibWFwU3R5bGUiLCJtYXBTdHlsZXMiLCJjdXN0b21lU3R5bGVzIiwibWFwIiwibXMiLCJpZCIsImZvckVhY2giLCJzdHlsZSIsIm1hcFN0eWxlQWN0aW9ucyIsImxvYWRNYXBTdHlsZXMiLCJfcmVxdWVzdE1hcFN0eWxlIiwidXJsIiwiZG93bmxvYWRVcmwiLCJtYXBib3hBcGlBY2Nlc3NUb2tlbiIsImVycm9yIiwicmVzdWx0IiwiQ29uc29sZSIsIndhcm4iLCJfbG9hZE1hcFN0eWxlIiwiX2hhbmRsZVJlc2l6ZSIsIm5leHRQcm9wcyIsImhlaWdodCIsIndpZHRoIiwibWFwU3RhdGUiLCJOdW1iZXIiLCJpc0Zpbml0ZSIsIm1hcFN0YXRlQWN0aW9ucyIsInVwZGF0ZU1hcCIsImlzU3BsaXQiLCJhcHBOYW1lIiwidmVyc2lvbiIsIm9uU2F2ZU1hcCIsInVpU3RhdGUiLCJ2aXNTdGF0ZSIsInZpc1N0YXRlQWN0aW9ucyIsInVpU3RhdGVBY3Rpb25zIiwiZmlsdGVycyIsImxheWVycyIsInNwbGl0TWFwcyIsImxheWVyT3JkZXIiLCJsYXllckJsZW5kaW5nIiwibGF5ZXJDbGFzc2VzIiwiaW50ZXJhY3Rpb25Db25maWciLCJkYXRhc2V0cyIsImxheWVyRGF0YSIsImhvdmVySW5mbyIsImNsaWNrZWQiLCJub3RpZmljYXRpb25QYW5lbEZpZWxkcyIsInJlbW92ZU5vdGlmaWNhdGlvbiIsIm5vdGlmaWNhdGlvbnMiLCJzaWRlRmllbGRzIiwiRElNRU5TSU9OUyIsInNpZGVQYW5lbCIsIm1hcEZpZWxkcyIsIm1hcENvbnRyb2xzIiwidG9nZ2xlTWFwQ29udHJvbCIsImxlbmd0aCIsImNvbnRhaW5lclciLCJtYXBDb250YWluZXJzIiwic2V0dGluZ3MiLCJpbmRleCIsImlzRXhwb3J0aW5nIiwiY3VycmVudE1vZGFsIiwiRVhQT1JUX0lNQUdFX0lEIiwicG9zaXRpb24iLCJub2RlIiwicm9vdCIsInJlYWRPbmx5IiwiZGlzcGxheSIsImV4cG9ydEltYWdlIiwic3RhcnRFeHBvcnRpbmdJbWFnZSIsInNldEV4cG9ydEltYWdlRGF0YVVyaSIsIm1hcmdpbiIsImxlZnQiLCJDb21wb25lbnQiLCJLRVBMRVJfR0xfTkFNRSIsIktFUExFUl9HTF9WRVJTSU9OIiwibWFwU3RhdGVUb1Byb3BzIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwic3RhdGUiLCJkaXNwYXRjaCIsIm93blByb3BzIiwidXNlckFjdGlvbnMiLCJhY3Rpb25zIiwiVmlzU3RhdGVBY3Rpb25zIiwiTWFwU3RhdGVBY3Rpb25zIiwiTWFwU3R5bGVBY3Rpb25zIiwiVUlTdGF0ZUFjdGlvbnMiLCJtZXJnZUFjdGlvbnMiLCJvdmVycmlkZXMiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBR0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBRUE7Ozs7Ozs7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LENBRFc7QUFBQSxHQUxULENBUjBDO0FBQUE7QUFBQSxNQUk1QzlDLGVBSjRDO0FBQUEsTUFLNUNSLGVBTDRDO0FBQUEsTUFNNUNsQixlQU40QztBQUFBLE1BTzVDMkIsY0FQNEM7O0FBaUI5QyxTQUFPO0FBQ0xELElBQUFBLGVBQWUsRUFBZkEsZUFESztBQUVMUixJQUFBQSxlQUFlLEVBQWZBLGVBRks7QUFHTGxCLElBQUFBLGVBQWUsRUFBZkEsZUFISztBQUlMMkIsSUFBQUEsY0FBYyxFQUFkQSxjQUpLO0FBS0w2QyxJQUFBQSxRQUFRLEVBQVJBO0FBTEssR0FBUDtBQU9EO0FBRUQ7Ozs7O0FBR0EsU0FBU1EsWUFBVCxDQUFzQkwsT0FBdEIsRUFBK0JELFdBQS9CLEVBQTRDO0FBQzFDLE1BQU1PLFNBQVMsR0FBRyxFQUFsQjs7QUFDQSxPQUFLLElBQU1DLEdBQVgsSUFBa0JSLFdBQWxCLEVBQStCO0FBQzdCLFFBQUlBLFdBQVcsQ0FBQ1MsY0FBWixDQUEyQkQsR0FBM0IsS0FBbUNQLE9BQU8sQ0FBQ1EsY0FBUixDQUF1QkQsR0FBdkIsQ0FBdkMsRUFBb0U7QUFDbEVELE1BQUFBLFNBQVMsQ0FBQ0MsR0FBRCxDQUFULEdBQWlCUixXQUFXLENBQUNRLEdBQUQsQ0FBNUI7QUFDRDtBQUNGOztBQUVELHlDQUFXUCxPQUFYLEVBQXVCTSxTQUF2QjtBQUNEOztlQUVjM0csZSIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtjb25zb2xlIGFzIENvbnNvbGV9IGZyb20gJ2dsb2JhbC93aW5kb3cnO1xuaW1wb3J0IHtiaW5kQWN0aW9uQ3JlYXRvcnN9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7anNvbiBhcyByZXF1ZXN0SnNvbn0gZnJvbSAnZDMtcmVxdWVzdCc7XG5pbXBvcnQgc3R5bGVkLCB7VGhlbWVQcm92aWRlcn0gIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7Y29ubmVjdCBhcyBrZXBsZXJHbENvbm5lY3R9IGZyb20gJ2Nvbm5lY3Qva2VwbGVyZ2wtY29ubmVjdCc7XG5pbXBvcnQge2lzVmFsaWRTdHlsZVVybCwgZ2V0U3R5bGVEb3dubG9hZFVybH0gZnJvbSAndXRpbHMvbWFwLXN0eWxlLXV0aWxzL21hcGJveC1nbC1zdHlsZS1lZGl0b3InO1xuXG5pbXBvcnQgKiBhcyBWaXNTdGF0ZUFjdGlvbnMgZnJvbSAnYWN0aW9ucy92aXMtc3RhdGUtYWN0aW9ucyc7XG5pbXBvcnQgKiBhcyBNYXBTdGF0ZUFjdGlvbnMgZnJvbSAnYWN0aW9ucy9tYXAtc3RhdGUtYWN0aW9ucyc7XG5pbXBvcnQgKiBhcyBNYXBTdHlsZUFjdGlvbnMgZnJvbSAnYWN0aW9ucy9tYXAtc3R5bGUtYWN0aW9ucyc7XG5pbXBvcnQgKiBhcyBVSVN0YXRlQWN0aW9ucyBmcm9tICdhY3Rpb25zL3VpLXN0YXRlLWFjdGlvbnMnO1xuXG5pbXBvcnQge0VYUE9SVF9JTUFHRV9JRCwgRElNRU5TSU9OUyxcbiAgS0VQTEVSX0dMX05BTUUsIEtFUExFUl9HTF9WRVJTSU9OfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5cbmltcG9ydCBTaWRlUGFuZWxGYWN0b3J5IGZyb20gJy4vc2lkZS1wYW5lbCc7XG5pbXBvcnQgTWFwQ29udGFpbmVyRmFjdG9yeSBmcm9tICcuL21hcC1jb250YWluZXInO1xuaW1wb3J0IEJvdHRvbVdpZGdldEZhY3RvcnkgZnJvbSAnLi9ib3R0b20td2lkZ2V0JztcbmltcG9ydCBNb2RhbENvbnRhaW5lckZhY3RvcnkgZnJvbSAnLi9tb2RhbC1jb250YWluZXInO1xuaW1wb3J0IFBsb3RDb250YWluZXJGYWN0b3J5IGZyb20gJy4vcGxvdC1jb250YWluZXInO1xuaW1wb3J0IE5vdGlmaWNhdGlvblBhbmVsRmFjdG9yeSBmcm9tICcuL25vdGlmaWNhdGlvbi1wYW5lbCc7XG5cbmltcG9ydCB7Z2VuZXJhdGVIYXNoSWR9IGZyb20gJ3V0aWxzL3V0aWxzJztcblxuaW1wb3J0IHt0aGVtZX0gZnJvbSAnc3R5bGVzL2Jhc2UnO1xuXG4vLyBNYXliZSB3ZSBzaG91bGQgdGhpbmsgYWJvdXQgZXhwb3J0aW5nIHRoaXMgb3IgY3JlYXRpbmcgYSB2YXJpYWJsZVxuLy8gYXMgcGFydCBvZiB0aGUgYmFzZS5qcyB0aGVtZVxuY29uc3QgR2xvYmFsU3R5bGUgPSBzdHlsZWQuZGl2YFxuICBmb250LWZhbWlseTogZmYtY2xhbi13ZWItcHJvLCAnSGVsdmV0aWNhIE5ldWUnLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGZvbnQtc2l6ZTogMC44NzVlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNzE0Mjk7XG5cbiAgKixcbiAgKjpiZWZvcmUsXG4gICo6YWZ0ZXIge1xuICAgIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAtbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgfVxuXG4gIHVsIHtcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogMDtcbiAgfVxuXG4gIGxpIHtcbiAgICBtYXJnaW46IDA7XG4gIH1cblxuICBhIHtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGFiZWxDb2xvcn07XG4gIH1cbmA7XG5cbktlcGxlckdsRmFjdG9yeS5kZXBzID0gW1xuICBCb3R0b21XaWRnZXRGYWN0b3J5LFxuICBNYXBDb250YWluZXJGYWN0b3J5LFxuICBNb2RhbENvbnRhaW5lckZhY3RvcnksXG4gIFNpZGVQYW5lbEZhY3RvcnksXG4gIFBsb3RDb250YWluZXJGYWN0b3J5LFxuICBOb3RpZmljYXRpb25QYW5lbEZhY3Rvcnlcbl07XG5cbmZ1bmN0aW9uIEtlcGxlckdsRmFjdG9yeShcbiAgQm90dG9tV2lkZ2V0LFxuICBNYXBDb250YWluZXIsXG4gIE1vZGFsV3JhcHBlcixcbiAgU2lkZVBhbmVsLFxuICBQbG90Q29udGFpbmVyLFxuICBOb3RpZmljYXRpb25QYW5lbFxuKSB7XG4gIGNsYXNzIEtlcGxlckdMIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgbWFwU3R5bGVzOiBbXSxcbiAgICAgIHdpZHRoOiA4MDAsXG4gICAgICBoZWlnaHQ6IDgwMCxcbiAgICAgIGFwcE5hbWU6IEtFUExFUl9HTF9OQU1FLFxuICAgICAgdmVyc2lvbjogS0VQTEVSX0dMX1ZFUlNJT05cbiAgICB9O1xuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgdGhpcy5fbG9hZE1hcFN0eWxlKHRoaXMucHJvcHMubWFwU3R5bGVzKTtcbiAgICAgIHRoaXMuX2hhbmRsZVJlc2l6ZSh0aGlzLnByb3BzKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgaWYgKFxuICAgICAgICAvLyBpZiBkaW1lbnNpb24gcHJvcHMgaGFzIGNoYW5nZWRcbiAgICAgICAgdGhpcy5wcm9wcy5oZWlnaHQgIT09IG5leHRQcm9wcy5oZWlnaHQgfHxcbiAgICAgICAgdGhpcy5wcm9wcy53aWR0aCAhPT0gbmV4dFByb3BzLndpZHRoIHx8XG4gICAgICAgIC8vIHJlYWN0LW1hcC1nbCB3aWxsIGRpc3BhdGNoIHVwZGF0ZVZpZXdwb3J0IGFmdGVyIHRoaXMuX2hhbmRsZVJlc2l6ZSBpcyBjYWxsZWRcbiAgICAgICAgLy8gaGVyZSB3ZSBjaGVjayBpZiB0aGlzLnByb3BzLm1hcFN0YXRlLmhlaWdodCBpcyBzeW5jIHdpdGggcHJvcHMuaGVpZ2h0XG4gICAgICAgIG5leHRQcm9wcy5oZWlnaHQgIT09IHRoaXMucHJvcHMubWFwU3RhdGUuaGVpZ2h0XG4gICAgICApIHtcbiAgICAgICAgdGhpcy5faGFuZGxlUmVzaXplKG5leHRQcm9wcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgX2hhbmRsZVJlc2l6ZSh7d2lkdGgsIGhlaWdodH0pIHtcbiAgICAgIGlmICghTnVtYmVyLmlzRmluaXRlKHdpZHRoKSB8fCAhTnVtYmVyLmlzRmluaXRlKGhlaWdodCkpIHtcbiAgICAgICAgQ29uc29sZS53YXJuKCd3aWR0aCBhbmQgaGVpZ2h0IGlzIHJlcXVpcmVkJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMucHJvcHMubWFwU3RhdGVBY3Rpb25zLnVwZGF0ZU1hcCh7XG4gICAgICAgIHdpZHRoOiB3aWR0aCAvICgxICsgTnVtYmVyKHRoaXMucHJvcHMubWFwU3RhdGUuaXNTcGxpdCkpLFxuICAgICAgICBoZWlnaHRcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIF9sb2FkTWFwU3R5bGUgPSAoKSA9PiB7XG4gICAgICBjb25zdCBkZWZhdWx0U3R5bGVzID0gT2JqZWN0LnZhbHVlcyh0aGlzLnByb3BzLm1hcFN0eWxlLm1hcFN0eWxlcyk7XG4gICAgICAvLyBhZGQgaWQgdG8gY3VzdG9tIG1hcCBzdHlsZXMgaWYgbm90IGdpdmVuXG4gICAgICBjb25zdCBjdXN0b21lU3R5bGVzID0gKHRoaXMucHJvcHMubWFwU3R5bGVzIHx8IFtdKS5tYXAobXMgPT4gKHtcbiAgICAgICAgLi4ubXMsXG4gICAgICAgIGlkOiBtcy5pZCB8fCBnZW5lcmF0ZUhhc2hJZCgpXG4gICAgICB9KSk7XG5cbiAgICAgIFsuLi5jdXN0b21lU3R5bGVzLCAuLi5kZWZhdWx0U3R5bGVzXS5mb3JFYWNoKFxuICAgICAgICBzdHlsZSA9PiB7XG4gICAgICAgICAgaWYgKHN0eWxlLnN0eWxlKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm1hcFN0eWxlQWN0aW9ucy5sb2FkTWFwU3R5bGVzKHtcbiAgICAgICAgICAgICAgW3N0eWxlLmlkXTogc3R5bGVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3JlcXVlc3RNYXBTdHlsZShzdHlsZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApO1xuICAgIH07XG5cbiAgICBfcmVxdWVzdE1hcFN0eWxlID0gKG1hcFN0eWxlKSA9PiB7XG4gICAgICBjb25zdCB7dXJsLCBpZH0gPSBtYXBTdHlsZTtcblxuICAgICAgY29uc3QgZG93bmxvYWRVcmwgPSBpc1ZhbGlkU3R5bGVVcmwodXJsKSA/XG4gICAgICAgIGdldFN0eWxlRG93bmxvYWRVcmwodXJsLCB0aGlzLnByb3BzLm1hcGJveEFwaUFjY2Vzc1Rva2VuKSA6IHVybDtcblxuICAgICAgcmVxdWVzdEpzb24oZG93bmxvYWRVcmwsIChlcnJvciwgcmVzdWx0KSA9PiB7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIENvbnNvbGUud2FybihgRXJyb3IgbG9hZGluZyBtYXAgc3R5bGUgJHt1cmx9YCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5tYXBTdHlsZUFjdGlvbnMubG9hZE1hcFN0eWxlcyh7XG4gICAgICAgICAgICBbaWRdOiB7Li4ubWFwU3R5bGUsIHN0eWxlOiByZXN1bHR9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIC8vIHByb3BzXG4gICAgICAgIGlkLFxuICAgICAgICBhcHBOYW1lLFxuICAgICAgICB2ZXJzaW9uLFxuICAgICAgICBvblNhdmVNYXAsXG4gICAgICAgIHdpZHRoLFxuICAgICAgICBoZWlnaHQsXG4gICAgICAgIG1hcGJveEFwaUFjY2Vzc1Rva2VuLFxuXG4gICAgICAgIC8vIHJlZHV4IHN0YXRlXG4gICAgICAgIG1hcFN0eWxlLFxuICAgICAgICBtYXBTdGF0ZSxcbiAgICAgICAgdWlTdGF0ZSxcbiAgICAgICAgdmlzU3RhdGUsXG5cbiAgICAgICAgLy8gYWN0aW9ucyxcbiAgICAgICAgdmlzU3RhdGVBY3Rpb25zLFxuICAgICAgICBtYXBTdGF0ZUFjdGlvbnMsXG4gICAgICAgIG1hcFN0eWxlQWN0aW9ucyxcbiAgICAgICAgdWlTdGF0ZUFjdGlvbnNcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICBjb25zdCB7XG4gICAgICAgIGZpbHRlcnMsXG4gICAgICAgIGxheWVycyxcbiAgICAgICAgc3BsaXRNYXBzLCAvLyB0aGlzIHdpbGwgc3RvcmUgc3VwcG9ydCBmb3Igc3BsaXQgbWFwIHZpZXcgaXMgbmVjZXNzYXJ5XG4gICAgICAgIGxheWVyT3JkZXIsXG4gICAgICAgIGxheWVyQmxlbmRpbmcsXG4gICAgICAgIGxheWVyQ2xhc3NlcyxcbiAgICAgICAgaW50ZXJhY3Rpb25Db25maWcsXG4gICAgICAgIGRhdGFzZXRzLFxuICAgICAgICBsYXllckRhdGEsXG4gICAgICAgIGhvdmVySW5mbyxcbiAgICAgICAgY2xpY2tlZFxuICAgICAgfSA9IHZpc1N0YXRlO1xuXG4gICAgICBjb25zdCBub3RpZmljYXRpb25QYW5lbEZpZWxkcyA9IHtcbiAgICAgICAgcmVtb3ZlTm90aWZpY2F0aW9uOiB1aVN0YXRlQWN0aW9ucy5yZW1vdmVOb3RpZmljYXRpb24sXG4gICAgICAgIG5vdGlmaWNhdGlvbnM6IHVpU3RhdGUubm90aWZpY2F0aW9uc1xuICAgICAgfTtcblxuICAgICAgY29uc3Qgc2lkZUZpZWxkcyA9IHtcbiAgICAgICAgYXBwTmFtZSxcbiAgICAgICAgdmVyc2lvbixcbiAgICAgICAgZGF0YXNldHMsXG4gICAgICAgIGZpbHRlcnMsXG4gICAgICAgIGxheWVycyxcbiAgICAgICAgbGF5ZXJPcmRlcixcbiAgICAgICAgbGF5ZXJDbGFzc2VzLFxuICAgICAgICBpbnRlcmFjdGlvbkNvbmZpZyxcbiAgICAgICAgbWFwU3R5bGUsXG4gICAgICAgIGxheWVyQmxlbmRpbmcsXG4gICAgICAgIG9uU2F2ZU1hcCxcbiAgICAgICAgdWlTdGF0ZSxcbiAgICAgICAgbWFwU3R5bGVBY3Rpb25zLFxuICAgICAgICB2aXNTdGF0ZUFjdGlvbnMsXG4gICAgICAgIHVpU3RhdGVBY3Rpb25zLFxuICAgICAgICB3aWR0aDogRElNRU5TSU9OUy5zaWRlUGFuZWwud2lkdGhcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IG1hcEZpZWxkcyA9IHtcbiAgICAgICAgZGF0YXNldHMsXG4gICAgICAgIG1hcGJveEFwaUFjY2Vzc1Rva2VuLFxuICAgICAgICBtYXBTdGF0ZSxcbiAgICAgICAgbWFwU3R5bGUsXG4gICAgICAgIG1hcENvbnRyb2xzOiB1aVN0YXRlLm1hcENvbnRyb2xzLFxuICAgICAgICBsYXllcnMsXG4gICAgICAgIGxheWVyT3JkZXIsXG4gICAgICAgIGxheWVyRGF0YSxcbiAgICAgICAgbGF5ZXJCbGVuZGluZyxcbiAgICAgICAgaW50ZXJhY3Rpb25Db25maWcsXG4gICAgICAgIGhvdmVySW5mbyxcbiAgICAgICAgY2xpY2tlZCxcbiAgICAgICAgdG9nZ2xlTWFwQ29udHJvbDogdWlTdGF0ZUFjdGlvbnMudG9nZ2xlTWFwQ29udHJvbCxcbiAgICAgICAgdWlTdGF0ZUFjdGlvbnMsXG4gICAgICAgIHZpc1N0YXRlQWN0aW9ucyxcbiAgICAgICAgbWFwU3RhdGVBY3Rpb25zXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBpc1NwbGl0ID0gc3BsaXRNYXBzICYmIHNwbGl0TWFwcy5sZW5ndGggPiAxO1xuICAgICAgY29uc3QgY29udGFpbmVyVyA9IG1hcFN0YXRlLndpZHRoICogKE51bWJlcihpc1NwbGl0KSArIDEpO1xuXG4gICAgICBjb25zdCBtYXBDb250YWluZXJzID0gIWlzU3BsaXRcbiAgICAgICAgPyBbXG4gICAgICAgICAgICA8TWFwQ29udGFpbmVyXG4gICAgICAgICAgICAgIGtleT17MH1cbiAgICAgICAgICAgICAgaW5kZXg9ezB9XG4gICAgICAgICAgICAgIHsuLi5tYXBGaWVsZHN9XG4gICAgICAgICAgICAgIG1hcExheWVycz17aXNTcGxpdCA/IHNwbGl0TWFwc1swXS5sYXllcnMgOiBudWxsfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICBdXG4gICAgICAgIDogc3BsaXRNYXBzLm1hcCgoc2V0dGluZ3MsIGluZGV4KSA9PiAoXG4gICAgICAgICAgICA8TWFwQ29udGFpbmVyXG4gICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgIGluZGV4PXtpbmRleH1cbiAgICAgICAgICAgICAgey4uLm1hcEZpZWxkc31cbiAgICAgICAgICAgICAgbWFwTGF5ZXJzPXtzcGxpdE1hcHNbaW5kZXhdLmxheWVyc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSk7XG5cbiAgICAgIGNvbnN0IGlzRXhwb3J0aW5nID0gdWlTdGF0ZS5jdXJyZW50TW9kYWwgPT09IEVYUE9SVF9JTUFHRV9JRDtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFRoZW1lUHJvdmlkZXIgdGhlbWU9e3RoZW1lfT5cbiAgICAgICAgICA8R2xvYmFsU3R5bGVcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgICB3aWR0aDogYCR7bWFwU3RhdGUud2lkdGh9cHhgLFxuICAgICAgICAgICAgICBoZWlnaHQ6IGAke21hcFN0YXRlLmhlaWdodH1weGBcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJrZXBsZXItZ2xcIlxuICAgICAgICAgICAgaWQ9e2BrZXBsZXItZ2xfXyR7aWR9YH1cbiAgICAgICAgICAgIHJlZj17bm9kZSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMucm9vdCA9IG5vZGU7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxOb3RpZmljYXRpb25QYW5lbCB7Li4ubm90aWZpY2F0aW9uUGFuZWxGaWVsZHN9IC8+XG4gICAgICAgICAgICB7IXVpU3RhdGUucmVhZE9ubHkgJiYgPFNpZGVQYW5lbCB7Li4uc2lkZUZpZWxkc30gLz59XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1hcHNcIiBzdHlsZT17e2Rpc3BsYXk6ICdmbGV4J319PlxuICAgICAgICAgICAgICB7bWFwQ29udGFpbmVyc31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge2lzRXhwb3J0aW5nICYmXG4gICAgICAgICAgICAgIDxQbG90Q29udGFpbmVyXG4gICAgICAgICAgICAgICAgd2lkdGg9e3dpZHRofVxuICAgICAgICAgICAgICAgIGhlaWdodD17aGVpZ2h0fVxuICAgICAgICAgICAgICAgIGV4cG9ydEltYWdlU2V0dGluZz17dWlTdGF0ZS5leHBvcnRJbWFnZX1cbiAgICAgICAgICAgICAgICBtYXBGaWVsZHM9e21hcEZpZWxkc31cbiAgICAgICAgICAgICAgICBzdGFydEV4cG9ydGluZ0ltYWdlPXt1aVN0YXRlQWN0aW9ucy5zdGFydEV4cG9ydGluZ0ltYWdlfVxuICAgICAgICAgICAgICAgIHNldEV4cG9ydEltYWdlRGF0YVVyaT17dWlTdGF0ZUFjdGlvbnMuc2V0RXhwb3J0SW1hZ2VEYXRhVXJpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgPEJvdHRvbVdpZGdldFxuICAgICAgICAgICAgICBmaWx0ZXJzPXtmaWx0ZXJzfVxuICAgICAgICAgICAgICBkYXRhc2V0cz17ZGF0YXNldHN9XG4gICAgICAgICAgICAgIHVpU3RhdGU9e3VpU3RhdGV9XG4gICAgICAgICAgICAgIHZpc1N0YXRlQWN0aW9ucz17dmlzU3RhdGVBY3Rpb25zfVxuICAgICAgICAgICAgICBzaWRlUGFuZWxXaWR0aD17XG4gICAgICAgICAgICAgICAgRElNRU5TSU9OUy5zaWRlUGFuZWwud2lkdGggKyBESU1FTlNJT05TLnNpZGVQYW5lbC5tYXJnaW4ubGVmdFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnRhaW5lclc9e2NvbnRhaW5lcld9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPE1vZGFsV3JhcHBlclxuICAgICAgICAgICAgICBtYXBTdHlsZT17bWFwU3R5bGV9XG4gICAgICAgICAgICAgIHZpc1N0YXRlPXt2aXNTdGF0ZX1cbiAgICAgICAgICAgICAgbWFwU3RhdGU9e21hcFN0YXRlfVxuICAgICAgICAgICAgICB1aVN0YXRlPXt1aVN0YXRlfVxuICAgICAgICAgICAgICBtYXBib3hBcGlBY2Nlc3NUb2tlbj17bWFwYm94QXBpQWNjZXNzVG9rZW59XG4gICAgICAgICAgICAgIHZpc1N0YXRlQWN0aW9ucz17dmlzU3RhdGVBY3Rpb25zfVxuICAgICAgICAgICAgICB1aVN0YXRlQWN0aW9ucz17dWlTdGF0ZUFjdGlvbnN9XG4gICAgICAgICAgICAgIG1hcFN0eWxlQWN0aW9ucz17bWFwU3R5bGVBY3Rpb25zfVxuICAgICAgICAgICAgICByb290Tm9kZT17dGhpcy5yb290fVxuICAgICAgICAgICAgICBjb250YWluZXJXPXtjb250YWluZXJXfVxuICAgICAgICAgICAgICBjb250YWluZXJIPXttYXBTdGF0ZS5oZWlnaHR9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvR2xvYmFsU3R5bGU+XG4gICAgICAgIDwvVGhlbWVQcm92aWRlcj5cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGtlcGxlckdsQ29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoS2VwbGVyR0wpO1xufVxuXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUsIHByb3BzKSB7XG4gIHJldHVybiB7XG4gICAgLi4ucHJvcHMsXG4gICAgdmlzU3RhdGU6IHN0YXRlLnZpc1N0YXRlLFxuICAgIG1hcFN0eWxlOiBzdGF0ZS5tYXBTdHlsZSxcbiAgICBtYXBTdGF0ZTogc3RhdGUubWFwU3RhdGUsXG4gICAgdWlTdGF0ZTogc3RhdGUudWlTdGF0ZVxuICB9O1xufVxuXG5mdW5jdGlvbiBtYXBEaXNwYXRjaFRvUHJvcHMoZGlzcGF0Y2gsIG93blByb3BzKSB7XG4gIGNvbnN0IHVzZXJBY3Rpb25zID0gb3duUHJvcHMuYWN0aW9ucyB8fCB7fTtcblxuICBjb25zdCBbXG4gICAgdmlzU3RhdGVBY3Rpb25zLFxuICAgIG1hcFN0YXRlQWN0aW9ucyxcbiAgICBtYXBTdHlsZUFjdGlvbnMsXG4gICAgdWlTdGF0ZUFjdGlvbnNcbiAgXSA9IFtcbiAgICBWaXNTdGF0ZUFjdGlvbnMsXG4gICAgTWFwU3RhdGVBY3Rpb25zLFxuICAgIE1hcFN0eWxlQWN0aW9ucyxcbiAgICBVSVN0YXRlQWN0aW9uc1xuICBdLm1hcChhY3Rpb25zID0+XG4gICAgYmluZEFjdGlvbkNyZWF0b3JzKG1lcmdlQWN0aW9ucyhhY3Rpb25zLCB1c2VyQWN0aW9ucyksIGRpc3BhdGNoKVxuICApO1xuXG4gIHJldHVybiB7XG4gICAgdmlzU3RhdGVBY3Rpb25zLFxuICAgIG1hcFN0YXRlQWN0aW9ucyxcbiAgICBtYXBTdHlsZUFjdGlvbnMsXG4gICAgdWlTdGF0ZUFjdGlvbnMsXG4gICAgZGlzcGF0Y2hcbiAgfTtcbn1cblxuLyoqXG4gKiBPdmVycmlkZSBkZWZhdWx0IG1hcHMtZ2wgYWN0aW9ucyB3aXRoIHVzZXIgZGVmaW5lZCBhY3Rpb25zIHVzaW5nIHRoZSBzYW1lIGtleVxuICovXG5mdW5jdGlvbiBtZXJnZUFjdGlvbnMoYWN0aW9ucywgdXNlckFjdGlvbnMpIHtcbiAgY29uc3Qgb3ZlcnJpZGVzID0ge307XG4gIGZvciAoY29uc3Qga2V5IGluIHVzZXJBY3Rpb25zKSB7XG4gICAgaWYgKHVzZXJBY3Rpb25zLmhhc093blByb3BlcnR5KGtleSkgJiYgYWN0aW9ucy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBvdmVycmlkZXNba2V5XSA9IHVzZXJBY3Rpb25zW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsuLi5hY3Rpb25zLCAuLi5vdmVycmlkZXN9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBLZXBsZXJHbEZhY3Rvcnk7XG4iXX0=