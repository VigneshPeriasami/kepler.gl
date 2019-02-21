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
            width: "".concat(width, "px"),
            height: "".concat(height, "px")
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2tlcGxlci1nbC5qcyJdLCJuYW1lcyI6WyJHbG9iYWxTdHlsZSIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJsYWJlbENvbG9yIiwiS2VwbGVyR2xGYWN0b3J5IiwiZGVwcyIsIkJvdHRvbVdpZGdldEZhY3RvcnkiLCJNYXBDb250YWluZXJGYWN0b3J5IiwiTW9kYWxDb250YWluZXJGYWN0b3J5IiwiU2lkZVBhbmVsRmFjdG9yeSIsIlBsb3RDb250YWluZXJGYWN0b3J5IiwiTm90aWZpY2F0aW9uUGFuZWxGYWN0b3J5IiwiQm90dG9tV2lkZ2V0IiwiTWFwQ29udGFpbmVyIiwiTW9kYWxXcmFwcGVyIiwiU2lkZVBhbmVsIiwiUGxvdENvbnRhaW5lciIsIk5vdGlmaWNhdGlvblBhbmVsIiwiS2VwbGVyR0wiLCJkZWZhdWx0U3R5bGVzIiwiT2JqZWN0IiwidmFsdWVzIiwibWFwU3R5bGUiLCJtYXBTdHlsZXMiLCJjdXN0b21lU3R5bGVzIiwibWFwIiwibXMiLCJpZCIsImZvckVhY2giLCJzdHlsZSIsIm1hcFN0eWxlQWN0aW9ucyIsImxvYWRNYXBTdHlsZXMiLCJfcmVxdWVzdE1hcFN0eWxlIiwidXJsIiwiZG93bmxvYWRVcmwiLCJtYXBib3hBcGlBY2Nlc3NUb2tlbiIsImVycm9yIiwicmVzdWx0IiwiQ29uc29sZSIsIndhcm4iLCJfbG9hZE1hcFN0eWxlIiwiX2hhbmRsZVJlc2l6ZSIsIm5leHRQcm9wcyIsImhlaWdodCIsIndpZHRoIiwibWFwU3RhdGUiLCJOdW1iZXIiLCJpc0Zpbml0ZSIsIm1hcFN0YXRlQWN0aW9ucyIsInVwZGF0ZU1hcCIsImlzU3BsaXQiLCJhcHBOYW1lIiwidmVyc2lvbiIsIm9uU2F2ZU1hcCIsInVpU3RhdGUiLCJ2aXNTdGF0ZSIsInZpc1N0YXRlQWN0aW9ucyIsInVpU3RhdGVBY3Rpb25zIiwiZmlsdGVycyIsImxheWVycyIsInNwbGl0TWFwcyIsImxheWVyT3JkZXIiLCJsYXllckJsZW5kaW5nIiwibGF5ZXJDbGFzc2VzIiwiaW50ZXJhY3Rpb25Db25maWciLCJkYXRhc2V0cyIsImxheWVyRGF0YSIsImhvdmVySW5mbyIsImNsaWNrZWQiLCJub3RpZmljYXRpb25QYW5lbEZpZWxkcyIsInJlbW92ZU5vdGlmaWNhdGlvbiIsIm5vdGlmaWNhdGlvbnMiLCJzaWRlRmllbGRzIiwiRElNRU5TSU9OUyIsInNpZGVQYW5lbCIsIm1hcEZpZWxkcyIsIm1hcENvbnRyb2xzIiwidG9nZ2xlTWFwQ29udHJvbCIsImxlbmd0aCIsImNvbnRhaW5lclciLCJtYXBDb250YWluZXJzIiwic2V0dGluZ3MiLCJpbmRleCIsImlzRXhwb3J0aW5nIiwiY3VycmVudE1vZGFsIiwiRVhQT1JUX0lNQUdFX0lEIiwicG9zaXRpb24iLCJub2RlIiwicm9vdCIsInJlYWRPbmx5IiwiZGlzcGxheSIsImV4cG9ydEltYWdlIiwic3RhcnRFeHBvcnRpbmdJbWFnZSIsInNldEV4cG9ydEltYWdlRGF0YVVyaSIsIm1hcmdpbiIsImxlZnQiLCJDb21wb25lbnQiLCJLRVBMRVJfR0xfTkFNRSIsIktFUExFUl9HTF9WRVJTSU9OIiwibWFwU3RhdGVUb1Byb3BzIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwic3RhdGUiLCJkaXNwYXRjaCIsIm93blByb3BzIiwidXNlckFjdGlvbnMiLCJhY3Rpb25zIiwiVmlzU3RhdGVBY3Rpb25zIiwiTWFwU3RhdGVBY3Rpb25zIiwiTWFwU3R5bGVBY3Rpb25zIiwiVUlTdGF0ZUFjdGlvbnMiLCJtZXJnZUFjdGlvbnMiLCJvdmVycmlkZXMiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBR0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7OztBQUVBO0FBQ0E7QUFDQSxJQUFNQSxXQUFXLEdBQUdDLDBCQUFPQyxHQUFWLG9CQXlCSixVQUFBQyxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlDLFVBQWhCO0FBQUEsQ0F6QkQsQ0FBakI7O0FBNkJBQyxlQUFlLENBQUNDLElBQWhCLEdBQXVCLENBQ3JCQyxxQkFEcUIsRUFFckJDLHFCQUZxQixFQUdyQkMsdUJBSHFCLEVBSXJCQyxrQkFKcUIsRUFLckJDLHNCQUxxQixFQU1yQkMsMEJBTnFCLENBQXZCOztBQVNBLFNBQVNQLGVBQVQsQ0FDRVEsWUFERixFQUVFQyxZQUZGLEVBR0VDLFlBSEYsRUFJRUMsU0FKRixFQUtFQyxhQUxGLEVBTUVDLGlCQU5GLEVBT0U7QUFBQSxNQUNNQyxRQUROO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsd0lBdUNrQixZQUFNO0FBQ3BCLFlBQU1DLGFBQWEsR0FBR0MsTUFBTSxDQUFDQyxNQUFQLENBQWMsTUFBS3BCLEtBQUwsQ0FBV3FCLFFBQVgsQ0FBb0JDLFNBQWxDLENBQXRCLENBRG9CLENBRXBCOztBQUNBLFlBQU1DLGFBQWEsR0FBRyxDQUFDLE1BQUt2QixLQUFMLENBQVdzQixTQUFYLElBQXdCLEVBQXpCLEVBQTZCRSxHQUE3QixDQUFpQyxVQUFBQyxFQUFFO0FBQUEsaURBQ3BEQSxFQURvRDtBQUV2REMsWUFBQUEsRUFBRSxFQUFFRCxFQUFFLENBQUNDLEVBQUgsSUFBUztBQUYwQztBQUFBLFNBQW5DLENBQXRCO0FBS0EsbURBQUlILGFBQUosb0NBQXNCTCxhQUF0QixHQUFxQ1MsT0FBckMsQ0FDRSxVQUFBQyxLQUFLLEVBQUk7QUFDUCxjQUFJQSxLQUFLLENBQUNBLEtBQVYsRUFBaUI7QUFDZixrQkFBSzVCLEtBQUwsQ0FBVzZCLGVBQVgsQ0FBMkJDLGFBQTNCLG1DQUNHRixLQUFLLENBQUNGLEVBRFQsRUFDY0UsS0FEZDtBQUdELFdBSkQsTUFJTztBQUNMLGtCQUFLRyxnQkFBTCxDQUFzQkgsS0FBdEI7QUFDRDtBQUNGLFNBVEg7QUFXRCxPQTFESDtBQUFBLDJJQTREcUIsVUFBQ1AsUUFBRCxFQUFjO0FBQUEsWUFDeEJXLEdBRHdCLEdBQ2JYLFFBRGEsQ0FDeEJXLEdBRHdCO0FBQUEsWUFDbkJOLEVBRG1CLEdBQ2JMLFFBRGEsQ0FDbkJLLEVBRG1CO0FBRy9CLFlBQU1PLFdBQVcsR0FBRywwQ0FBZ0JELEdBQWhCLElBQ2xCLDhDQUFvQkEsR0FBcEIsRUFBeUIsTUFBS2hDLEtBQUwsQ0FBV2tDLG9CQUFwQyxDQURrQixHQUMwQ0YsR0FEOUQ7QUFHQSw2QkFBWUMsV0FBWixFQUF5QixVQUFDRSxLQUFELEVBQVFDLE1BQVIsRUFBbUI7QUFDMUMsY0FBSUQsS0FBSixFQUFXO0FBQ1RFLDRCQUFRQyxJQUFSLG1DQUF3Q04sR0FBeEM7QUFDRCxXQUZELE1BRU87QUFDTCxrQkFBS2hDLEtBQUwsQ0FBVzZCLGVBQVgsQ0FBMkJDLGFBQTNCLG1DQUNHSixFQURILGtDQUNZTCxRQURaO0FBQ3NCTyxjQUFBQSxLQUFLLEVBQUVRO0FBRDdCO0FBR0Q7QUFDRixTQVJEO0FBU0QsT0EzRUg7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSwyQ0FVdUI7QUFDbkIsYUFBS0csYUFBTCxDQUFtQixLQUFLdkMsS0FBTCxDQUFXc0IsU0FBOUI7O0FBQ0EsYUFBS2tCLGFBQUwsQ0FBbUIsS0FBS3hDLEtBQXhCO0FBQ0Q7QUFiSDtBQUFBO0FBQUEsZ0RBZTRCeUMsU0FmNUIsRUFldUM7QUFDbkMsYUFDRTtBQUNBLGFBQUt6QyxLQUFMLENBQVcwQyxNQUFYLEtBQXNCRCxTQUFTLENBQUNDLE1BQWhDLElBQ0EsS0FBSzFDLEtBQUwsQ0FBVzJDLEtBQVgsS0FBcUJGLFNBQVMsQ0FBQ0UsS0FEL0IsSUFFQTtBQUNBO0FBQ0FGLFFBQUFBLFNBQVMsQ0FBQ0MsTUFBVixLQUFxQixLQUFLMUMsS0FBTCxDQUFXNEMsUUFBWCxDQUFvQkYsTUFOM0MsRUFPRTtBQUNBLGVBQUtGLGFBQUwsQ0FBbUJDLFNBQW5CO0FBQ0Q7QUFDRjtBQTFCSDtBQUFBO0FBQUEsMENBNEJpQztBQUFBLFlBQWhCRSxLQUFnQixRQUFoQkEsS0FBZ0I7QUFBQSxZQUFURCxNQUFTLFFBQVRBLE1BQVM7O0FBQzdCLFlBQUksQ0FBQ0csTUFBTSxDQUFDQyxRQUFQLENBQWdCSCxLQUFoQixDQUFELElBQTJCLENBQUNFLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQkosTUFBaEIsQ0FBaEMsRUFBeUQ7QUFDdkRMLDBCQUFRQyxJQUFSLENBQWEsOEJBQWI7O0FBQ0E7QUFDRDs7QUFDRCxhQUFLdEMsS0FBTCxDQUFXK0MsZUFBWCxDQUEyQkMsU0FBM0IsQ0FBcUM7QUFDbkNMLFVBQUFBLEtBQUssRUFBRUEsS0FBSyxJQUFJLElBQUlFLE1BQU0sQ0FBQyxLQUFLN0MsS0FBTCxDQUFXNEMsUUFBWCxDQUFvQkssT0FBckIsQ0FBZCxDQUR1QjtBQUVuQ1AsVUFBQUEsTUFBTSxFQUFOQTtBQUZtQyxTQUFyQztBQUlEO0FBckNIO0FBQUE7QUFBQSwrQkE2RVc7QUFBQTs7QUFBQSwwQkFzQkgsS0FBSzFDLEtBdEJGO0FBQUEsWUFHTDBCLEVBSEssZUFHTEEsRUFISztBQUFBLFlBSUx3QixPQUpLLGVBSUxBLE9BSks7QUFBQSxZQUtMQyxPQUxLLGVBS0xBLE9BTEs7QUFBQSxZQU1MQyxTQU5LLGVBTUxBLFNBTks7QUFBQSxZQU9MVCxLQVBLLGVBT0xBLEtBUEs7QUFBQSxZQVFMRCxNQVJLLGVBUUxBLE1BUks7QUFBQSxZQVNMUixvQkFUSyxlQVNMQSxvQkFUSztBQUFBLFlBWUxiLFFBWkssZUFZTEEsUUFaSztBQUFBLFlBYUx1QixRQWJLLGVBYUxBLFFBYks7QUFBQSxZQWNMUyxPQWRLLGVBY0xBLE9BZEs7QUFBQSxZQWVMQyxRQWZLLGVBZUxBLFFBZks7QUFBQSxZQWtCTEMsZUFsQkssZUFrQkxBLGVBbEJLO0FBQUEsWUFtQkxSLGVBbkJLLGVBbUJMQSxlQW5CSztBQUFBLFlBb0JMbEIsZUFwQkssZUFvQkxBLGVBcEJLO0FBQUEsWUFxQkwyQixjQXJCSyxlQXFCTEEsY0FyQks7QUFBQSxZQXlCTEMsT0F6QkssR0FvQ0hILFFBcENHLENBeUJMRyxPQXpCSztBQUFBLFlBMEJMQyxNQTFCSyxHQW9DSEosUUFwQ0csQ0EwQkxJLE1BMUJLO0FBQUEsWUEyQkxDLFNBM0JLLEdBb0NITCxRQXBDRyxDQTJCTEssU0EzQks7QUFBQSxZQTRCTEMsVUE1QkssR0FvQ0hOLFFBcENHLENBNEJMTSxVQTVCSztBQUFBLFlBNkJMQyxhQTdCSyxHQW9DSFAsUUFwQ0csQ0E2QkxPLGFBN0JLO0FBQUEsWUE4QkxDLFlBOUJLLEdBb0NIUixRQXBDRyxDQThCTFEsWUE5Qks7QUFBQSxZQStCTEMsaUJBL0JLLEdBb0NIVCxRQXBDRyxDQStCTFMsaUJBL0JLO0FBQUEsWUFnQ0xDLFFBaENLLEdBb0NIVixRQXBDRyxDQWdDTFUsUUFoQ0s7QUFBQSxZQWlDTEMsU0FqQ0ssR0FvQ0hYLFFBcENHLENBaUNMVyxTQWpDSztBQUFBLFlBa0NMQyxTQWxDSyxHQW9DSFosUUFwQ0csQ0FrQ0xZLFNBbENLO0FBQUEsWUFtQ0xDLE9BbkNLLEdBb0NIYixRQXBDRyxDQW1DTGEsT0FuQ0s7QUFzQ1AsWUFBTUMsdUJBQXVCLEdBQUc7QUFDOUJDLFVBQUFBLGtCQUFrQixFQUFFYixjQUFjLENBQUNhLGtCQURMO0FBRTlCQyxVQUFBQSxhQUFhLEVBQUVqQixPQUFPLENBQUNpQjtBQUZPLFNBQWhDO0FBS0EsWUFBTUMsVUFBVSxHQUFHO0FBQ2pCckIsVUFBQUEsT0FBTyxFQUFQQSxPQURpQjtBQUVqQkMsVUFBQUEsT0FBTyxFQUFQQSxPQUZpQjtBQUdqQmEsVUFBQUEsUUFBUSxFQUFSQSxRQUhpQjtBQUlqQlAsVUFBQUEsT0FBTyxFQUFQQSxPQUppQjtBQUtqQkMsVUFBQUEsTUFBTSxFQUFOQSxNQUxpQjtBQU1qQkUsVUFBQUEsVUFBVSxFQUFWQSxVQU5pQjtBQU9qQkUsVUFBQUEsWUFBWSxFQUFaQSxZQVBpQjtBQVFqQkMsVUFBQUEsaUJBQWlCLEVBQWpCQSxpQkFSaUI7QUFTakIxQyxVQUFBQSxRQUFRLEVBQVJBLFFBVGlCO0FBVWpCd0MsVUFBQUEsYUFBYSxFQUFiQSxhQVZpQjtBQVdqQlQsVUFBQUEsU0FBUyxFQUFUQSxTQVhpQjtBQVlqQkMsVUFBQUEsT0FBTyxFQUFQQSxPQVppQjtBQWFqQnhCLFVBQUFBLGVBQWUsRUFBZkEsZUFiaUI7QUFjakIwQixVQUFBQSxlQUFlLEVBQWZBLGVBZGlCO0FBZWpCQyxVQUFBQSxjQUFjLEVBQWRBLGNBZmlCO0FBZ0JqQmIsVUFBQUEsS0FBSyxFQUFFNkIsNEJBQVdDLFNBQVgsQ0FBcUI5QjtBQWhCWCxTQUFuQjtBQW1CQSxZQUFNK0IsU0FBUyxHQUFHO0FBQ2hCVixVQUFBQSxRQUFRLEVBQVJBLFFBRGdCO0FBRWhCOUIsVUFBQUEsb0JBQW9CLEVBQXBCQSxvQkFGZ0I7QUFHaEJVLFVBQUFBLFFBQVEsRUFBUkEsUUFIZ0I7QUFJaEJ2QixVQUFBQSxRQUFRLEVBQVJBLFFBSmdCO0FBS2hCc0QsVUFBQUEsV0FBVyxFQUFFdEIsT0FBTyxDQUFDc0IsV0FMTDtBQU1oQmpCLFVBQUFBLE1BQU0sRUFBTkEsTUFOZ0I7QUFPaEJFLFVBQUFBLFVBQVUsRUFBVkEsVUFQZ0I7QUFRaEJLLFVBQUFBLFNBQVMsRUFBVEEsU0FSZ0I7QUFTaEJKLFVBQUFBLGFBQWEsRUFBYkEsYUFUZ0I7QUFVaEJFLFVBQUFBLGlCQUFpQixFQUFqQkEsaUJBVmdCO0FBV2hCRyxVQUFBQSxTQUFTLEVBQVRBLFNBWGdCO0FBWWhCQyxVQUFBQSxPQUFPLEVBQVBBLE9BWmdCO0FBYWhCUyxVQUFBQSxnQkFBZ0IsRUFBRXBCLGNBQWMsQ0FBQ29CLGdCQWJqQjtBQWNoQnBCLFVBQUFBLGNBQWMsRUFBZEEsY0FkZ0I7QUFlaEJELFVBQUFBLGVBQWUsRUFBZkEsZUFmZ0I7QUFnQmhCUixVQUFBQSxlQUFlLEVBQWZBO0FBaEJnQixTQUFsQjtBQW1CQSxZQUFNRSxPQUFPLEdBQUdVLFNBQVMsSUFBSUEsU0FBUyxDQUFDa0IsTUFBVixHQUFtQixDQUFoRDtBQUNBLFlBQU1DLFVBQVUsR0FBR2xDLFFBQVEsQ0FBQ0QsS0FBVCxJQUFrQkUsTUFBTSxDQUFDSSxPQUFELENBQU4sR0FBa0IsQ0FBcEMsQ0FBbkI7QUFFQSxZQUFNOEIsYUFBYSxHQUFHLENBQUM5QixPQUFELEdBQ2xCLENBQ0UsNkJBQUMsWUFBRDtBQUNFLFVBQUEsR0FBRyxFQUFFLENBRFA7QUFFRSxVQUFBLEtBQUssRUFBRTtBQUZULFdBR015QixTQUhOO0FBSUUsVUFBQSxTQUFTLEVBQUV6QixPQUFPLEdBQUdVLFNBQVMsQ0FBQyxDQUFELENBQVQsQ0FBYUQsTUFBaEIsR0FBeUI7QUFKN0MsV0FERixDQURrQixHQVNsQkMsU0FBUyxDQUFDbkMsR0FBVixDQUFjLFVBQUN3RCxRQUFELEVBQVdDLEtBQVg7QUFBQSxpQkFDWiw2QkFBQyxZQUFEO0FBQ0UsWUFBQSxHQUFHLEVBQUVBLEtBRFA7QUFFRSxZQUFBLEtBQUssRUFBRUE7QUFGVCxhQUdNUCxTQUhOO0FBSUUsWUFBQSxTQUFTLEVBQUVmLFNBQVMsQ0FBQ3NCLEtBQUQsQ0FBVCxDQUFpQnZCO0FBSjlCLGFBRFk7QUFBQSxTQUFkLENBVEo7QUFrQkEsWUFBTXdCLFdBQVcsR0FBRzdCLE9BQU8sQ0FBQzhCLFlBQVIsS0FBeUJDLGdDQUE3QztBQUVBLGVBQ0UsNkJBQUMsK0JBQUQ7QUFBZSxVQUFBLEtBQUssRUFBRW5GO0FBQXRCLFdBQ0UsNkJBQUMsV0FBRDtBQUNFLFVBQUEsS0FBSyxFQUFFO0FBQ0xvRixZQUFBQSxRQUFRLEVBQUUsVUFETDtBQUVMMUMsWUFBQUEsS0FBSyxZQUFLQSxLQUFMLE9BRkE7QUFHTEQsWUFBQUEsTUFBTSxZQUFLQSxNQUFMO0FBSEQsV0FEVDtBQU1FLFVBQUEsU0FBUyxFQUFDLFdBTlo7QUFPRSxVQUFBLEVBQUUsdUJBQWdCaEIsRUFBaEIsQ0FQSjtBQVFFLFVBQUEsR0FBRyxFQUFFLGFBQUE0RCxJQUFJLEVBQUk7QUFDWCxZQUFBLE1BQUksQ0FBQ0MsSUFBTCxHQUFZRCxJQUFaO0FBQ0Q7QUFWSCxXQVlFLDZCQUFDLGlCQUFELEVBQXVCbEIsdUJBQXZCLENBWkYsRUFhRyxDQUFDZixPQUFPLENBQUNtQyxRQUFULElBQXFCLDZCQUFDLFNBQUQsRUFBZWpCLFVBQWYsQ0FieEIsRUFjRTtBQUFLLFVBQUEsU0FBUyxFQUFDLE1BQWY7QUFBc0IsVUFBQSxLQUFLLEVBQUU7QUFBQ2tCLFlBQUFBLE9BQU8sRUFBRTtBQUFWO0FBQTdCLFdBQ0dWLGFBREgsQ0FkRixFQWlCR0csV0FBVyxJQUNWLDZCQUFDLGFBQUQ7QUFDRSxVQUFBLEtBQUssRUFBRXZDLEtBRFQ7QUFFRSxVQUFBLE1BQU0sRUFBRUQsTUFGVjtBQUdFLFVBQUEsa0JBQWtCLEVBQUVXLE9BQU8sQ0FBQ3FDLFdBSDlCO0FBSUUsVUFBQSxTQUFTLEVBQUVoQixTQUpiO0FBS0UsVUFBQSxtQkFBbUIsRUFBRWxCLGNBQWMsQ0FBQ21DLG1CQUx0QztBQU1FLFVBQUEscUJBQXFCLEVBQUVuQyxjQUFjLENBQUNvQztBQU54QyxVQWxCSixFQTJCRSw2QkFBQyxZQUFEO0FBQ0UsVUFBQSxPQUFPLEVBQUVuQyxPQURYO0FBRUUsVUFBQSxRQUFRLEVBQUVPLFFBRlo7QUFHRSxVQUFBLE9BQU8sRUFBRVgsT0FIWDtBQUlFLFVBQUEsZUFBZSxFQUFFRSxlQUpuQjtBQUtFLFVBQUEsY0FBYyxFQUNaaUIsNEJBQVdDLFNBQVgsQ0FBcUI5QixLQUFyQixHQUE2QjZCLDRCQUFXQyxTQUFYLENBQXFCb0IsTUFBckIsQ0FBNEJDLElBTjdEO0FBUUUsVUFBQSxVQUFVLEVBQUVoQjtBQVJkLFVBM0JGLEVBcUNFLDZCQUFDLFlBQUQ7QUFDRSxVQUFBLFFBQVEsRUFBRXpELFFBRFo7QUFFRSxVQUFBLFFBQVEsRUFBRWlDLFFBRlo7QUFHRSxVQUFBLFFBQVEsRUFBRVYsUUFIWjtBQUlFLFVBQUEsT0FBTyxFQUFFUyxPQUpYO0FBS0UsVUFBQSxvQkFBb0IsRUFBRW5CLG9CQUx4QjtBQU1FLFVBQUEsZUFBZSxFQUFFcUIsZUFObkI7QUFPRSxVQUFBLGNBQWMsRUFBRUMsY0FQbEI7QUFRRSxVQUFBLGVBQWUsRUFBRTNCLGVBUm5CO0FBU0UsVUFBQSxRQUFRLEVBQUUsS0FBSzBELElBVGpCO0FBVUUsVUFBQSxVQUFVLEVBQUVULFVBVmQ7QUFXRSxVQUFBLFVBQVUsRUFBRWxDLFFBQVEsQ0FBQ0Y7QUFYdkIsVUFyQ0YsQ0FERixDQURGO0FBdUREO0FBNU9IO0FBQUE7QUFBQSxJQUN1QnFELGdCQUR2Qjs7QUFBQSxnQ0FDTTlFLFFBRE4sa0JBRXdCO0FBQ3BCSyxJQUFBQSxTQUFTLEVBQUUsRUFEUztBQUVwQnFCLElBQUFBLEtBQUssRUFBRSxHQUZhO0FBR3BCRCxJQUFBQSxNQUFNLEVBQUUsR0FIWTtBQUlwQlEsSUFBQUEsT0FBTyxFQUFFOEMsK0JBSlc7QUFLcEI3QyxJQUFBQSxPQUFPLEVBQUU4QztBQUxXLEdBRnhCO0FBK09BLFNBQU8sOEJBQWdCQyxlQUFoQixFQUFpQ0Msa0JBQWpDLEVBQXFEbEYsUUFBckQsQ0FBUDtBQUNEOztBQUVELFNBQVNpRixlQUFULENBQXlCRSxLQUF6QixFQUFnQ3BHLEtBQWhDLEVBQXVDO0FBQ3JDLHlDQUNLQSxLQURMO0FBRUVzRCxJQUFBQSxRQUFRLEVBQUU4QyxLQUFLLENBQUM5QyxRQUZsQjtBQUdFakMsSUFBQUEsUUFBUSxFQUFFK0UsS0FBSyxDQUFDL0UsUUFIbEI7QUFJRXVCLElBQUFBLFFBQVEsRUFBRXdELEtBQUssQ0FBQ3hELFFBSmxCO0FBS0VTLElBQUFBLE9BQU8sRUFBRStDLEtBQUssQ0FBQy9DO0FBTGpCO0FBT0Q7O0FBRUQsU0FBUzhDLGtCQUFULENBQTRCRSxRQUE1QixFQUFzQ0MsUUFBdEMsRUFBZ0Q7QUFDOUMsTUFBTUMsV0FBVyxHQUFHRCxRQUFRLENBQUNFLE9BQVQsSUFBb0IsRUFBeEM7O0FBRDhDLGFBUTFDLENBQ0ZDLGVBREUsRUFFRkMsZUFGRSxFQUdGQyxlQUhFLEVBSUZDLGNBSkUsRUFLRnBGLEdBTEUsQ0FLRSxVQUFBZ0YsT0FBTztBQUFBLFdBQ1gsK0JBQW1CSyxZQUFZLENBQUNMLE9BQUQsRUFBVUQsV0FBVixDQUEvQixFQUF1REYsUUFBdkQsQ0FEVztBQUFBLEdBTFQsQ0FSMEM7QUFBQTtBQUFBLE1BSTVDOUMsZUFKNEM7QUFBQSxNQUs1Q1IsZUFMNEM7QUFBQSxNQU01Q2xCLGVBTjRDO0FBQUEsTUFPNUMyQixjQVA0Qzs7QUFpQjlDLFNBQU87QUFDTEQsSUFBQUEsZUFBZSxFQUFmQSxlQURLO0FBRUxSLElBQUFBLGVBQWUsRUFBZkEsZUFGSztBQUdMbEIsSUFBQUEsZUFBZSxFQUFmQSxlQUhLO0FBSUwyQixJQUFBQSxjQUFjLEVBQWRBLGNBSks7QUFLTDZDLElBQUFBLFFBQVEsRUFBUkE7QUFMSyxHQUFQO0FBT0Q7QUFFRDs7Ozs7QUFHQSxTQUFTUSxZQUFULENBQXNCTCxPQUF0QixFQUErQkQsV0FBL0IsRUFBNEM7QUFDMUMsTUFBTU8sU0FBUyxHQUFHLEVBQWxCOztBQUNBLE9BQUssSUFBTUMsR0FBWCxJQUFrQlIsV0FBbEIsRUFBK0I7QUFDN0IsUUFBSUEsV0FBVyxDQUFDUyxjQUFaLENBQTJCRCxHQUEzQixLQUFtQ1AsT0FBTyxDQUFDUSxjQUFSLENBQXVCRCxHQUF2QixDQUF2QyxFQUFvRTtBQUNsRUQsTUFBQUEsU0FBUyxDQUFDQyxHQUFELENBQVQsR0FBaUJSLFdBQVcsQ0FBQ1EsR0FBRCxDQUE1QjtBQUNEO0FBQ0Y7O0FBRUQseUNBQVdQLE9BQVgsRUFBdUJNLFNBQXZCO0FBQ0Q7O2VBRWMzRyxlIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2NvbnNvbGUgYXMgQ29uc29sZX0gZnJvbSAnZ2xvYmFsL3dpbmRvdyc7XG5pbXBvcnQge2JpbmRBY3Rpb25DcmVhdG9yc30gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHtqc29uIGFzIHJlcXVlc3RKc29ufSBmcm9tICdkMy1yZXF1ZXN0JztcbmltcG9ydCBzdHlsZWQsIHtUaGVtZVByb3ZpZGVyfSAgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHtjb25uZWN0IGFzIGtlcGxlckdsQ29ubmVjdH0gZnJvbSAnY29ubmVjdC9rZXBsZXJnbC1jb25uZWN0JztcbmltcG9ydCB7aXNWYWxpZFN0eWxlVXJsLCBnZXRTdHlsZURvd25sb2FkVXJsfSBmcm9tICd1dGlscy9tYXAtc3R5bGUtdXRpbHMvbWFwYm94LWdsLXN0eWxlLWVkaXRvcic7XG5cbmltcG9ydCAqIGFzIFZpc1N0YXRlQWN0aW9ucyBmcm9tICdhY3Rpb25zL3Zpcy1zdGF0ZS1hY3Rpb25zJztcbmltcG9ydCAqIGFzIE1hcFN0YXRlQWN0aW9ucyBmcm9tICdhY3Rpb25zL21hcC1zdGF0ZS1hY3Rpb25zJztcbmltcG9ydCAqIGFzIE1hcFN0eWxlQWN0aW9ucyBmcm9tICdhY3Rpb25zL21hcC1zdHlsZS1hY3Rpb25zJztcbmltcG9ydCAqIGFzIFVJU3RhdGVBY3Rpb25zIGZyb20gJ2FjdGlvbnMvdWktc3RhdGUtYWN0aW9ucyc7XG5cbmltcG9ydCB7RVhQT1JUX0lNQUdFX0lELCBESU1FTlNJT05TLFxuICBLRVBMRVJfR0xfTkFNRSwgS0VQTEVSX0dMX1ZFUlNJT059IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcblxuaW1wb3J0IFNpZGVQYW5lbEZhY3RvcnkgZnJvbSAnLi9zaWRlLXBhbmVsJztcbmltcG9ydCBNYXBDb250YWluZXJGYWN0b3J5IGZyb20gJy4vbWFwLWNvbnRhaW5lcic7XG5pbXBvcnQgQm90dG9tV2lkZ2V0RmFjdG9yeSBmcm9tICcuL2JvdHRvbS13aWRnZXQnO1xuaW1wb3J0IE1vZGFsQ29udGFpbmVyRmFjdG9yeSBmcm9tICcuL21vZGFsLWNvbnRhaW5lcic7XG5pbXBvcnQgUGxvdENvbnRhaW5lckZhY3RvcnkgZnJvbSAnLi9wbG90LWNvbnRhaW5lcic7XG5pbXBvcnQgTm90aWZpY2F0aW9uUGFuZWxGYWN0b3J5IGZyb20gJy4vbm90aWZpY2F0aW9uLXBhbmVsJztcblxuaW1wb3J0IHtnZW5lcmF0ZUhhc2hJZH0gZnJvbSAndXRpbHMvdXRpbHMnO1xuXG5pbXBvcnQge3RoZW1lfSBmcm9tICdzdHlsZXMvYmFzZSc7XG5cbi8vIE1heWJlIHdlIHNob3VsZCB0aGluayBhYm91dCBleHBvcnRpbmcgdGhpcyBvciBjcmVhdGluZyBhIHZhcmlhYmxlXG4vLyBhcyBwYXJ0IG9mIHRoZSBiYXNlLmpzIHRoZW1lXG5jb25zdCBHbG9iYWxTdHlsZSA9IHN0eWxlZC5kaXZgXG4gIGZvbnQtZmFtaWx5OiBmZi1jbGFuLXdlYi1wcm8sICdIZWx2ZXRpY2EgTmV1ZScsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgZm9udC1zaXplOiAwLjg3NWVtO1xuICBsaW5lLWhlaWdodDogMS43MTQyOTtcblxuICAqLFxuICAqOmJlZm9yZSxcbiAgKjphZnRlciB7XG4gICAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIC1tb3otYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICB9XG5cbiAgdWwge1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwO1xuICB9XG5cbiAgbGkge1xuICAgIG1hcmdpbjogMDtcbiAgfVxuXG4gIGEge1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5sYWJlbENvbG9yfTtcbiAgfVxuYDtcblxuS2VwbGVyR2xGYWN0b3J5LmRlcHMgPSBbXG4gIEJvdHRvbVdpZGdldEZhY3RvcnksXG4gIE1hcENvbnRhaW5lckZhY3RvcnksXG4gIE1vZGFsQ29udGFpbmVyRmFjdG9yeSxcbiAgU2lkZVBhbmVsRmFjdG9yeSxcbiAgUGxvdENvbnRhaW5lckZhY3RvcnksXG4gIE5vdGlmaWNhdGlvblBhbmVsRmFjdG9yeVxuXTtcblxuZnVuY3Rpb24gS2VwbGVyR2xGYWN0b3J5KFxuICBCb3R0b21XaWRnZXQsXG4gIE1hcENvbnRhaW5lcixcbiAgTW9kYWxXcmFwcGVyLFxuICBTaWRlUGFuZWwsXG4gIFBsb3RDb250YWluZXIsXG4gIE5vdGlmaWNhdGlvblBhbmVsXG4pIHtcbiAgY2xhc3MgS2VwbGVyR0wgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICBtYXBTdHlsZXM6IFtdLFxuICAgICAgd2lkdGg6IDgwMCxcbiAgICAgIGhlaWdodDogODAwLFxuICAgICAgYXBwTmFtZTogS0VQTEVSX0dMX05BTUUsXG4gICAgICB2ZXJzaW9uOiBLRVBMRVJfR0xfVkVSU0lPTlxuICAgIH07XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICB0aGlzLl9sb2FkTWFwU3R5bGUodGhpcy5wcm9wcy5tYXBTdHlsZXMpO1xuICAgICAgdGhpcy5faGFuZGxlUmVzaXplKHRoaXMucHJvcHMpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICBpZiAoXG4gICAgICAgIC8vIGlmIGRpbWVuc2lvbiBwcm9wcyBoYXMgY2hhbmdlZFxuICAgICAgICB0aGlzLnByb3BzLmhlaWdodCAhPT0gbmV4dFByb3BzLmhlaWdodCB8fFxuICAgICAgICB0aGlzLnByb3BzLndpZHRoICE9PSBuZXh0UHJvcHMud2lkdGggfHxcbiAgICAgICAgLy8gcmVhY3QtbWFwLWdsIHdpbGwgZGlzcGF0Y2ggdXBkYXRlVmlld3BvcnQgYWZ0ZXIgdGhpcy5faGFuZGxlUmVzaXplIGlzIGNhbGxlZFxuICAgICAgICAvLyBoZXJlIHdlIGNoZWNrIGlmIHRoaXMucHJvcHMubWFwU3RhdGUuaGVpZ2h0IGlzIHN5bmMgd2l0aCBwcm9wcy5oZWlnaHRcbiAgICAgICAgbmV4dFByb3BzLmhlaWdodCAhPT0gdGhpcy5wcm9wcy5tYXBTdGF0ZS5oZWlnaHRcbiAgICAgICkge1xuICAgICAgICB0aGlzLl9oYW5kbGVSZXNpemUobmV4dFByb3BzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBfaGFuZGxlUmVzaXplKHt3aWR0aCwgaGVpZ2h0fSkge1xuICAgICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUod2lkdGgpIHx8ICFOdW1iZXIuaXNGaW5pdGUoaGVpZ2h0KSkge1xuICAgICAgICBDb25zb2xlLndhcm4oJ3dpZHRoIGFuZCBoZWlnaHQgaXMgcmVxdWlyZWQnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5wcm9wcy5tYXBTdGF0ZUFjdGlvbnMudXBkYXRlTWFwKHtcbiAgICAgICAgd2lkdGg6IHdpZHRoIC8gKDEgKyBOdW1iZXIodGhpcy5wcm9wcy5tYXBTdGF0ZS5pc1NwbGl0KSksXG4gICAgICAgIGhlaWdodFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgX2xvYWRNYXBTdHlsZSA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGRlZmF1bHRTdHlsZXMgPSBPYmplY3QudmFsdWVzKHRoaXMucHJvcHMubWFwU3R5bGUubWFwU3R5bGVzKTtcbiAgICAgIC8vIGFkZCBpZCB0byBjdXN0b20gbWFwIHN0eWxlcyBpZiBub3QgZ2l2ZW5cbiAgICAgIGNvbnN0IGN1c3RvbWVTdHlsZXMgPSAodGhpcy5wcm9wcy5tYXBTdHlsZXMgfHwgW10pLm1hcChtcyA9PiAoe1xuICAgICAgICAuLi5tcyxcbiAgICAgICAgaWQ6IG1zLmlkIHx8IGdlbmVyYXRlSGFzaElkKClcbiAgICAgIH0pKTtcblxuICAgICAgWy4uLmN1c3RvbWVTdHlsZXMsIC4uLmRlZmF1bHRTdHlsZXNdLmZvckVhY2goXG4gICAgICAgIHN0eWxlID0+IHtcbiAgICAgICAgICBpZiAoc3R5bGUuc3R5bGUpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMubWFwU3R5bGVBY3Rpb25zLmxvYWRNYXBTdHlsZXMoe1xuICAgICAgICAgICAgICBbc3R5bGUuaWRdOiBzdHlsZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcmVxdWVzdE1hcFN0eWxlKHN0eWxlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfTtcblxuICAgIF9yZXF1ZXN0TWFwU3R5bGUgPSAobWFwU3R5bGUpID0+IHtcbiAgICAgIGNvbnN0IHt1cmwsIGlkfSA9IG1hcFN0eWxlO1xuXG4gICAgICBjb25zdCBkb3dubG9hZFVybCA9IGlzVmFsaWRTdHlsZVVybCh1cmwpID9cbiAgICAgICAgZ2V0U3R5bGVEb3dubG9hZFVybCh1cmwsIHRoaXMucHJvcHMubWFwYm94QXBpQWNjZXNzVG9rZW4pIDogdXJsO1xuXG4gICAgICByZXF1ZXN0SnNvbihkb3dubG9hZFVybCwgKGVycm9yLCByZXN1bHQpID0+IHtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgQ29uc29sZS53YXJuKGBFcnJvciBsb2FkaW5nIG1hcCBzdHlsZSAke3VybH1gKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnByb3BzLm1hcFN0eWxlQWN0aW9ucy5sb2FkTWFwU3R5bGVzKHtcbiAgICAgICAgICAgIFtpZF06IHsuLi5tYXBTdHlsZSwgc3R5bGU6IHJlc3VsdH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJlbmRlcigpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgLy8gcHJvcHNcbiAgICAgICAgaWQsXG4gICAgICAgIGFwcE5hbWUsXG4gICAgICAgIHZlcnNpb24sXG4gICAgICAgIG9uU2F2ZU1hcCxcbiAgICAgICAgd2lkdGgsXG4gICAgICAgIGhlaWdodCxcbiAgICAgICAgbWFwYm94QXBpQWNjZXNzVG9rZW4sXG5cbiAgICAgICAgLy8gcmVkdXggc3RhdGVcbiAgICAgICAgbWFwU3R5bGUsXG4gICAgICAgIG1hcFN0YXRlLFxuICAgICAgICB1aVN0YXRlLFxuICAgICAgICB2aXNTdGF0ZSxcblxuICAgICAgICAvLyBhY3Rpb25zLFxuICAgICAgICB2aXNTdGF0ZUFjdGlvbnMsXG4gICAgICAgIG1hcFN0YXRlQWN0aW9ucyxcbiAgICAgICAgbWFwU3R5bGVBY3Rpb25zLFxuICAgICAgICB1aVN0YXRlQWN0aW9uc1xuICAgICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgIGNvbnN0IHtcbiAgICAgICAgZmlsdGVycyxcbiAgICAgICAgbGF5ZXJzLFxuICAgICAgICBzcGxpdE1hcHMsIC8vIHRoaXMgd2lsbCBzdG9yZSBzdXBwb3J0IGZvciBzcGxpdCBtYXAgdmlldyBpcyBuZWNlc3NhcnlcbiAgICAgICAgbGF5ZXJPcmRlcixcbiAgICAgICAgbGF5ZXJCbGVuZGluZyxcbiAgICAgICAgbGF5ZXJDbGFzc2VzLFxuICAgICAgICBpbnRlcmFjdGlvbkNvbmZpZyxcbiAgICAgICAgZGF0YXNldHMsXG4gICAgICAgIGxheWVyRGF0YSxcbiAgICAgICAgaG92ZXJJbmZvLFxuICAgICAgICBjbGlja2VkXG4gICAgICB9ID0gdmlzU3RhdGU7XG5cbiAgICAgIGNvbnN0IG5vdGlmaWNhdGlvblBhbmVsRmllbGRzID0ge1xuICAgICAgICByZW1vdmVOb3RpZmljYXRpb246IHVpU3RhdGVBY3Rpb25zLnJlbW92ZU5vdGlmaWNhdGlvbixcbiAgICAgICAgbm90aWZpY2F0aW9uczogdWlTdGF0ZS5ub3RpZmljYXRpb25zXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBzaWRlRmllbGRzID0ge1xuICAgICAgICBhcHBOYW1lLFxuICAgICAgICB2ZXJzaW9uLFxuICAgICAgICBkYXRhc2V0cyxcbiAgICAgICAgZmlsdGVycyxcbiAgICAgICAgbGF5ZXJzLFxuICAgICAgICBsYXllck9yZGVyLFxuICAgICAgICBsYXllckNsYXNzZXMsXG4gICAgICAgIGludGVyYWN0aW9uQ29uZmlnLFxuICAgICAgICBtYXBTdHlsZSxcbiAgICAgICAgbGF5ZXJCbGVuZGluZyxcbiAgICAgICAgb25TYXZlTWFwLFxuICAgICAgICB1aVN0YXRlLFxuICAgICAgICBtYXBTdHlsZUFjdGlvbnMsXG4gICAgICAgIHZpc1N0YXRlQWN0aW9ucyxcbiAgICAgICAgdWlTdGF0ZUFjdGlvbnMsXG4gICAgICAgIHdpZHRoOiBESU1FTlNJT05TLnNpZGVQYW5lbC53aWR0aFxuICAgICAgfTtcblxuICAgICAgY29uc3QgbWFwRmllbGRzID0ge1xuICAgICAgICBkYXRhc2V0cyxcbiAgICAgICAgbWFwYm94QXBpQWNjZXNzVG9rZW4sXG4gICAgICAgIG1hcFN0YXRlLFxuICAgICAgICBtYXBTdHlsZSxcbiAgICAgICAgbWFwQ29udHJvbHM6IHVpU3RhdGUubWFwQ29udHJvbHMsXG4gICAgICAgIGxheWVycyxcbiAgICAgICAgbGF5ZXJPcmRlcixcbiAgICAgICAgbGF5ZXJEYXRhLFxuICAgICAgICBsYXllckJsZW5kaW5nLFxuICAgICAgICBpbnRlcmFjdGlvbkNvbmZpZyxcbiAgICAgICAgaG92ZXJJbmZvLFxuICAgICAgICBjbGlja2VkLFxuICAgICAgICB0b2dnbGVNYXBDb250cm9sOiB1aVN0YXRlQWN0aW9ucy50b2dnbGVNYXBDb250cm9sLFxuICAgICAgICB1aVN0YXRlQWN0aW9ucyxcbiAgICAgICAgdmlzU3RhdGVBY3Rpb25zLFxuICAgICAgICBtYXBTdGF0ZUFjdGlvbnNcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGlzU3BsaXQgPSBzcGxpdE1hcHMgJiYgc3BsaXRNYXBzLmxlbmd0aCA+IDE7XG4gICAgICBjb25zdCBjb250YWluZXJXID0gbWFwU3RhdGUud2lkdGggKiAoTnVtYmVyKGlzU3BsaXQpICsgMSk7XG5cbiAgICAgIGNvbnN0IG1hcENvbnRhaW5lcnMgPSAhaXNTcGxpdFxuICAgICAgICA/IFtcbiAgICAgICAgICAgIDxNYXBDb250YWluZXJcbiAgICAgICAgICAgICAga2V5PXswfVxuICAgICAgICAgICAgICBpbmRleD17MH1cbiAgICAgICAgICAgICAgey4uLm1hcEZpZWxkc31cbiAgICAgICAgICAgICAgbWFwTGF5ZXJzPXtpc1NwbGl0ID8gc3BsaXRNYXBzWzBdLmxheWVycyA6IG51bGx9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIF1cbiAgICAgICAgOiBzcGxpdE1hcHMubWFwKChzZXR0aW5ncywgaW5kZXgpID0+IChcbiAgICAgICAgICAgIDxNYXBDb250YWluZXJcbiAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgaW5kZXg9e2luZGV4fVxuICAgICAgICAgICAgICB7Li4ubWFwRmllbGRzfVxuICAgICAgICAgICAgICBtYXBMYXllcnM9e3NwbGl0TWFwc1tpbmRleF0ubGF5ZXJzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApKTtcblxuICAgICAgY29uc3QgaXNFeHBvcnRpbmcgPSB1aVN0YXRlLmN1cnJlbnRNb2RhbCA9PT0gRVhQT1JUX0lNQUdFX0lEO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8VGhlbWVQcm92aWRlciB0aGVtZT17dGhlbWV9PlxuICAgICAgICAgIDxHbG9iYWxTdHlsZVxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgICAgIHdpZHRoOiBgJHt3aWR0aH1weGAsXG4gICAgICAgICAgICAgIGhlaWdodDogYCR7aGVpZ2h0fXB4YFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImtlcGxlci1nbFwiXG4gICAgICAgICAgICBpZD17YGtlcGxlci1nbF9fJHtpZH1gfVxuICAgICAgICAgICAgcmVmPXtub2RlID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5yb290ID0gbm9kZTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPE5vdGlmaWNhdGlvblBhbmVsIHsuLi5ub3RpZmljYXRpb25QYW5lbEZpZWxkc30gLz5cbiAgICAgICAgICAgIHshdWlTdGF0ZS5yZWFkT25seSAmJiA8U2lkZVBhbmVsIHsuLi5zaWRlRmllbGRzfSAvPn1cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFwc1wiIHN0eWxlPXt7ZGlzcGxheTogJ2ZsZXgnfX0+XG4gICAgICAgICAgICAgIHttYXBDb250YWluZXJzfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7aXNFeHBvcnRpbmcgJiZcbiAgICAgICAgICAgICAgPFBsb3RDb250YWluZXJcbiAgICAgICAgICAgICAgICB3aWR0aD17d2lkdGh9XG4gICAgICAgICAgICAgICAgaGVpZ2h0PXtoZWlnaHR9XG4gICAgICAgICAgICAgICAgZXhwb3J0SW1hZ2VTZXR0aW5nPXt1aVN0YXRlLmV4cG9ydEltYWdlfVxuICAgICAgICAgICAgICAgIG1hcEZpZWxkcz17bWFwRmllbGRzfVxuICAgICAgICAgICAgICAgIHN0YXJ0RXhwb3J0aW5nSW1hZ2U9e3VpU3RhdGVBY3Rpb25zLnN0YXJ0RXhwb3J0aW5nSW1hZ2V9XG4gICAgICAgICAgICAgICAgc2V0RXhwb3J0SW1hZ2VEYXRhVXJpPXt1aVN0YXRlQWN0aW9ucy5zZXRFeHBvcnRJbWFnZURhdGFVcml9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA8Qm90dG9tV2lkZ2V0XG4gICAgICAgICAgICAgIGZpbHRlcnM9e2ZpbHRlcnN9XG4gICAgICAgICAgICAgIGRhdGFzZXRzPXtkYXRhc2V0c31cbiAgICAgICAgICAgICAgdWlTdGF0ZT17dWlTdGF0ZX1cbiAgICAgICAgICAgICAgdmlzU3RhdGVBY3Rpb25zPXt2aXNTdGF0ZUFjdGlvbnN9XG4gICAgICAgICAgICAgIHNpZGVQYW5lbFdpZHRoPXtcbiAgICAgICAgICAgICAgICBESU1FTlNJT05TLnNpZGVQYW5lbC53aWR0aCArIERJTUVOU0lPTlMuc2lkZVBhbmVsLm1hcmdpbi5sZWZ0XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29udGFpbmVyVz17Y29udGFpbmVyV31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8TW9kYWxXcmFwcGVyXG4gICAgICAgICAgICAgIG1hcFN0eWxlPXttYXBTdHlsZX1cbiAgICAgICAgICAgICAgdmlzU3RhdGU9e3Zpc1N0YXRlfVxuICAgICAgICAgICAgICBtYXBTdGF0ZT17bWFwU3RhdGV9XG4gICAgICAgICAgICAgIHVpU3RhdGU9e3VpU3RhdGV9XG4gICAgICAgICAgICAgIG1hcGJveEFwaUFjY2Vzc1Rva2VuPXttYXBib3hBcGlBY2Nlc3NUb2tlbn1cbiAgICAgICAgICAgICAgdmlzU3RhdGVBY3Rpb25zPXt2aXNTdGF0ZUFjdGlvbnN9XG4gICAgICAgICAgICAgIHVpU3RhdGVBY3Rpb25zPXt1aVN0YXRlQWN0aW9uc31cbiAgICAgICAgICAgICAgbWFwU3R5bGVBY3Rpb25zPXttYXBTdHlsZUFjdGlvbnN9XG4gICAgICAgICAgICAgIHJvb3ROb2RlPXt0aGlzLnJvb3R9XG4gICAgICAgICAgICAgIGNvbnRhaW5lclc9e2NvbnRhaW5lcld9XG4gICAgICAgICAgICAgIGNvbnRhaW5lckg9e21hcFN0YXRlLmhlaWdodH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9HbG9iYWxTdHlsZT5cbiAgICAgICAgPC9UaGVtZVByb3ZpZGVyPlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ga2VwbGVyR2xDb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShLZXBsZXJHTCk7XG59XG5cbmZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZSwgcHJvcHMpIHtcbiAgcmV0dXJuIHtcbiAgICAuLi5wcm9wcyxcbiAgICB2aXNTdGF0ZTogc3RhdGUudmlzU3RhdGUsXG4gICAgbWFwU3R5bGU6IHN0YXRlLm1hcFN0eWxlLFxuICAgIG1hcFN0YXRlOiBzdGF0ZS5tYXBTdGF0ZSxcbiAgICB1aVN0YXRlOiBzdGF0ZS51aVN0YXRlXG4gIH07XG59XG5cbmZ1bmN0aW9uIG1hcERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCwgb3duUHJvcHMpIHtcbiAgY29uc3QgdXNlckFjdGlvbnMgPSBvd25Qcm9wcy5hY3Rpb25zIHx8IHt9O1xuXG4gIGNvbnN0IFtcbiAgICB2aXNTdGF0ZUFjdGlvbnMsXG4gICAgbWFwU3RhdGVBY3Rpb25zLFxuICAgIG1hcFN0eWxlQWN0aW9ucyxcbiAgICB1aVN0YXRlQWN0aW9uc1xuICBdID0gW1xuICAgIFZpc1N0YXRlQWN0aW9ucyxcbiAgICBNYXBTdGF0ZUFjdGlvbnMsXG4gICAgTWFwU3R5bGVBY3Rpb25zLFxuICAgIFVJU3RhdGVBY3Rpb25zXG4gIF0ubWFwKGFjdGlvbnMgPT5cbiAgICBiaW5kQWN0aW9uQ3JlYXRvcnMobWVyZ2VBY3Rpb25zKGFjdGlvbnMsIHVzZXJBY3Rpb25zKSwgZGlzcGF0Y2gpXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICB2aXNTdGF0ZUFjdGlvbnMsXG4gICAgbWFwU3RhdGVBY3Rpb25zLFxuICAgIG1hcFN0eWxlQWN0aW9ucyxcbiAgICB1aVN0YXRlQWN0aW9ucyxcbiAgICBkaXNwYXRjaFxuICB9O1xufVxuXG4vKipcbiAqIE92ZXJyaWRlIGRlZmF1bHQgbWFwcy1nbCBhY3Rpb25zIHdpdGggdXNlciBkZWZpbmVkIGFjdGlvbnMgdXNpbmcgdGhlIHNhbWUga2V5XG4gKi9cbmZ1bmN0aW9uIG1lcmdlQWN0aW9ucyhhY3Rpb25zLCB1c2VyQWN0aW9ucykge1xuICBjb25zdCBvdmVycmlkZXMgPSB7fTtcbiAgZm9yIChjb25zdCBrZXkgaW4gdXNlckFjdGlvbnMpIHtcbiAgICBpZiAodXNlckFjdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBhY3Rpb25zLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIG92ZXJyaWRlc1trZXldID0gdXNlckFjdGlvbnNba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gey4uLmFjdGlvbnMsIC4uLm92ZXJyaWRlc307XG59XG5cbmV4cG9ydCBkZWZhdWx0IEtlcGxlckdsRmFjdG9yeTtcbiJdfQ==