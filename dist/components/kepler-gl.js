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
          innerRef: function innerRef(node) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2tlcGxlci1nbC5qcyJdLCJuYW1lcyI6WyJHbG9iYWxTdHlsZSIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJsYWJlbENvbG9yIiwiS2VwbGVyR2xGYWN0b3J5IiwiZGVwcyIsIkJvdHRvbVdpZGdldEZhY3RvcnkiLCJNYXBDb250YWluZXJGYWN0b3J5IiwiTW9kYWxDb250YWluZXJGYWN0b3J5IiwiU2lkZVBhbmVsRmFjdG9yeSIsIlBsb3RDb250YWluZXJGYWN0b3J5IiwiTm90aWZpY2F0aW9uUGFuZWxGYWN0b3J5IiwiQm90dG9tV2lkZ2V0IiwiTWFwQ29udGFpbmVyIiwiTW9kYWxXcmFwcGVyIiwiU2lkZVBhbmVsIiwiUGxvdENvbnRhaW5lciIsIk5vdGlmaWNhdGlvblBhbmVsIiwiS2VwbGVyR0wiLCJkZWZhdWx0U3R5bGVzIiwiT2JqZWN0IiwidmFsdWVzIiwibWFwU3R5bGUiLCJtYXBTdHlsZXMiLCJjdXN0b21lU3R5bGVzIiwibWFwIiwibXMiLCJpZCIsImZvckVhY2giLCJzdHlsZSIsIm1hcFN0eWxlQWN0aW9ucyIsImxvYWRNYXBTdHlsZXMiLCJfcmVxdWVzdE1hcFN0eWxlIiwidXJsIiwiZG93bmxvYWRVcmwiLCJtYXBib3hBcGlBY2Nlc3NUb2tlbiIsImVycm9yIiwicmVzdWx0IiwiQ29uc29sZSIsIndhcm4iLCJfbG9hZE1hcFN0eWxlIiwiX2hhbmRsZVJlc2l6ZSIsIm5leHRQcm9wcyIsImhlaWdodCIsIndpZHRoIiwibWFwU3RhdGUiLCJOdW1iZXIiLCJpc0Zpbml0ZSIsIm1hcFN0YXRlQWN0aW9ucyIsInVwZGF0ZU1hcCIsImlzU3BsaXQiLCJhcHBOYW1lIiwidmVyc2lvbiIsIm9uU2F2ZU1hcCIsInVpU3RhdGUiLCJ2aXNTdGF0ZSIsInZpc1N0YXRlQWN0aW9ucyIsInVpU3RhdGVBY3Rpb25zIiwiZmlsdGVycyIsImxheWVycyIsInNwbGl0TWFwcyIsImxheWVyT3JkZXIiLCJsYXllckJsZW5kaW5nIiwibGF5ZXJDbGFzc2VzIiwiaW50ZXJhY3Rpb25Db25maWciLCJkYXRhc2V0cyIsImxheWVyRGF0YSIsImhvdmVySW5mbyIsImNsaWNrZWQiLCJub3RpZmljYXRpb25QYW5lbEZpZWxkcyIsInJlbW92ZU5vdGlmaWNhdGlvbiIsIm5vdGlmaWNhdGlvbnMiLCJzaWRlRmllbGRzIiwiRElNRU5TSU9OUyIsInNpZGVQYW5lbCIsIm1hcEZpZWxkcyIsIm1hcENvbnRyb2xzIiwidG9nZ2xlTWFwQ29udHJvbCIsImxlbmd0aCIsImNvbnRhaW5lclciLCJtYXBDb250YWluZXJzIiwic2V0dGluZ3MiLCJpbmRleCIsImlzRXhwb3J0aW5nIiwiY3VycmVudE1vZGFsIiwiRVhQT1JUX0lNQUdFX0lEIiwicG9zaXRpb24iLCJub2RlIiwicm9vdCIsInJlYWRPbmx5IiwiZGlzcGxheSIsImV4cG9ydEltYWdlIiwic3RhcnRFeHBvcnRpbmdJbWFnZSIsInNldEV4cG9ydEltYWdlRGF0YVVyaSIsIm1hcmdpbiIsImxlZnQiLCJDb21wb25lbnQiLCJLRVBMRVJfR0xfTkFNRSIsIktFUExFUl9HTF9WRVJTSU9OIiwibWFwU3RhdGVUb1Byb3BzIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwic3RhdGUiLCJkaXNwYXRjaCIsIm93blByb3BzIiwidXNlckFjdGlvbnMiLCJhY3Rpb25zIiwiVmlzU3RhdGVBY3Rpb25zIiwiTWFwU3RhdGVBY3Rpb25zIiwiTWFwU3R5bGVBY3Rpb25zIiwiVUlTdGF0ZUFjdGlvbnMiLCJtZXJnZUFjdGlvbnMiLCJvdmVycmlkZXMiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBR0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7OztBQUVBO0FBQ0E7QUFDQSxJQUFNQSxXQUFXLEdBQUdDLDBCQUFPQyxHQUFWLG9CQXlCSixVQUFBQyxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlDLFVBQWhCO0FBQUEsQ0F6QkQsQ0FBakI7O0FBNkJBQyxlQUFlLENBQUNDLElBQWhCLEdBQXVCLENBQ3JCQyxxQkFEcUIsRUFFckJDLHFCQUZxQixFQUdyQkMsdUJBSHFCLEVBSXJCQyxrQkFKcUIsRUFLckJDLHNCQUxxQixFQU1yQkMsMEJBTnFCLENBQXZCOztBQVNBLFNBQVNQLGVBQVQsQ0FDRVEsWUFERixFQUVFQyxZQUZGLEVBR0VDLFlBSEYsRUFJRUMsU0FKRixFQUtFQyxhQUxGLEVBTUVDLGlCQU5GLEVBT0U7QUFBQSxNQUNNQyxRQUROO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsd0lBdUNrQixZQUFNO0FBQ3BCLFlBQU1DLGFBQWEsR0FBR0MsTUFBTSxDQUFDQyxNQUFQLENBQWMsTUFBS3BCLEtBQUwsQ0FBV3FCLFFBQVgsQ0FBb0JDLFNBQWxDLENBQXRCLENBRG9CLENBRXBCOztBQUNBLFlBQU1DLGFBQWEsR0FBRyxDQUFDLE1BQUt2QixLQUFMLENBQVdzQixTQUFYLElBQXdCLEVBQXpCLEVBQTZCRSxHQUE3QixDQUFpQyxVQUFBQyxFQUFFO0FBQUEsaURBQ3BEQSxFQURvRDtBQUV2REMsWUFBQUEsRUFBRSxFQUFFRCxFQUFFLENBQUNDLEVBQUgsSUFBUztBQUYwQztBQUFBLFNBQW5DLENBQXRCO0FBS0EsbURBQUlILGFBQUosb0NBQXNCTCxhQUF0QixHQUFxQ1MsT0FBckMsQ0FDRSxVQUFBQyxLQUFLLEVBQUk7QUFDUCxjQUFJQSxLQUFLLENBQUNBLEtBQVYsRUFBaUI7QUFDZixrQkFBSzVCLEtBQUwsQ0FBVzZCLGVBQVgsQ0FBMkJDLGFBQTNCLG1DQUNHRixLQUFLLENBQUNGLEVBRFQsRUFDY0UsS0FEZDtBQUdELFdBSkQsTUFJTztBQUNMLGtCQUFLRyxnQkFBTCxDQUFzQkgsS0FBdEI7QUFDRDtBQUNGLFNBVEg7QUFXRCxPQTFESDtBQUFBLDJJQTREcUIsVUFBQ1AsUUFBRCxFQUFjO0FBQUEsWUFDeEJXLEdBRHdCLEdBQ2JYLFFBRGEsQ0FDeEJXLEdBRHdCO0FBQUEsWUFDbkJOLEVBRG1CLEdBQ2JMLFFBRGEsQ0FDbkJLLEVBRG1CO0FBRy9CLFlBQU1PLFdBQVcsR0FBRywwQ0FBZ0JELEdBQWhCLElBQ2xCLDhDQUFvQkEsR0FBcEIsRUFBeUIsTUFBS2hDLEtBQUwsQ0FBV2tDLG9CQUFwQyxDQURrQixHQUMwQ0YsR0FEOUQ7QUFHQSw2QkFBWUMsV0FBWixFQUF5QixVQUFDRSxLQUFELEVBQVFDLE1BQVIsRUFBbUI7QUFDMUMsY0FBSUQsS0FBSixFQUFXO0FBQ1RFLDRCQUFRQyxJQUFSLG1DQUF3Q04sR0FBeEM7QUFDRCxXQUZELE1BRU87QUFDTCxrQkFBS2hDLEtBQUwsQ0FBVzZCLGVBQVgsQ0FBMkJDLGFBQTNCLG1DQUNHSixFQURILGtDQUNZTCxRQURaO0FBQ3NCTyxjQUFBQSxLQUFLLEVBQUVRO0FBRDdCO0FBR0Q7QUFDRixTQVJEO0FBU0QsT0EzRUg7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSwyQ0FVdUI7QUFDbkIsYUFBS0csYUFBTCxDQUFtQixLQUFLdkMsS0FBTCxDQUFXc0IsU0FBOUI7O0FBQ0EsYUFBS2tCLGFBQUwsQ0FBbUIsS0FBS3hDLEtBQXhCO0FBQ0Q7QUFiSDtBQUFBO0FBQUEsZ0RBZTRCeUMsU0FmNUIsRUFldUM7QUFDbkMsYUFDRTtBQUNBLGFBQUt6QyxLQUFMLENBQVcwQyxNQUFYLEtBQXNCRCxTQUFTLENBQUNDLE1BQWhDLElBQ0EsS0FBSzFDLEtBQUwsQ0FBVzJDLEtBQVgsS0FBcUJGLFNBQVMsQ0FBQ0UsS0FEL0IsSUFFQTtBQUNBO0FBQ0FGLFFBQUFBLFNBQVMsQ0FBQ0MsTUFBVixLQUFxQixLQUFLMUMsS0FBTCxDQUFXNEMsUUFBWCxDQUFvQkYsTUFOM0MsRUFPRTtBQUNBLGVBQUtGLGFBQUwsQ0FBbUJDLFNBQW5CO0FBQ0Q7QUFDRjtBQTFCSDtBQUFBO0FBQUEsMENBNEJpQztBQUFBLFlBQWhCRSxLQUFnQixRQUFoQkEsS0FBZ0I7QUFBQSxZQUFURCxNQUFTLFFBQVRBLE1BQVM7O0FBQzdCLFlBQUksQ0FBQ0csTUFBTSxDQUFDQyxRQUFQLENBQWdCSCxLQUFoQixDQUFELElBQTJCLENBQUNFLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQkosTUFBaEIsQ0FBaEMsRUFBeUQ7QUFDdkRMLDBCQUFRQyxJQUFSLENBQWEsOEJBQWI7O0FBQ0E7QUFDRDs7QUFDRCxhQUFLdEMsS0FBTCxDQUFXK0MsZUFBWCxDQUEyQkMsU0FBM0IsQ0FBcUM7QUFDbkNMLFVBQUFBLEtBQUssRUFBRUEsS0FBSyxJQUFJLElBQUlFLE1BQU0sQ0FBQyxLQUFLN0MsS0FBTCxDQUFXNEMsUUFBWCxDQUFvQkssT0FBckIsQ0FBZCxDQUR1QjtBQUVuQ1AsVUFBQUEsTUFBTSxFQUFOQTtBQUZtQyxTQUFyQztBQUlEO0FBckNIO0FBQUE7QUFBQSwrQkE2RVc7QUFBQTs7QUFBQSwwQkFzQkgsS0FBSzFDLEtBdEJGO0FBQUEsWUFHTDBCLEVBSEssZUFHTEEsRUFISztBQUFBLFlBSUx3QixPQUpLLGVBSUxBLE9BSks7QUFBQSxZQUtMQyxPQUxLLGVBS0xBLE9BTEs7QUFBQSxZQU1MQyxTQU5LLGVBTUxBLFNBTks7QUFBQSxZQU9MVCxLQVBLLGVBT0xBLEtBUEs7QUFBQSxZQVFMRCxNQVJLLGVBUUxBLE1BUks7QUFBQSxZQVNMUixvQkFUSyxlQVNMQSxvQkFUSztBQUFBLFlBWUxiLFFBWkssZUFZTEEsUUFaSztBQUFBLFlBYUx1QixRQWJLLGVBYUxBLFFBYks7QUFBQSxZQWNMUyxPQWRLLGVBY0xBLE9BZEs7QUFBQSxZQWVMQyxRQWZLLGVBZUxBLFFBZks7QUFBQSxZQWtCTEMsZUFsQkssZUFrQkxBLGVBbEJLO0FBQUEsWUFtQkxSLGVBbkJLLGVBbUJMQSxlQW5CSztBQUFBLFlBb0JMbEIsZUFwQkssZUFvQkxBLGVBcEJLO0FBQUEsWUFxQkwyQixjQXJCSyxlQXFCTEEsY0FyQks7QUFBQSxZQXlCTEMsT0F6QkssR0FvQ0hILFFBcENHLENBeUJMRyxPQXpCSztBQUFBLFlBMEJMQyxNQTFCSyxHQW9DSEosUUFwQ0csQ0EwQkxJLE1BMUJLO0FBQUEsWUEyQkxDLFNBM0JLLEdBb0NITCxRQXBDRyxDQTJCTEssU0EzQks7QUFBQSxZQTRCTEMsVUE1QkssR0FvQ0hOLFFBcENHLENBNEJMTSxVQTVCSztBQUFBLFlBNkJMQyxhQTdCSyxHQW9DSFAsUUFwQ0csQ0E2QkxPLGFBN0JLO0FBQUEsWUE4QkxDLFlBOUJLLEdBb0NIUixRQXBDRyxDQThCTFEsWUE5Qks7QUFBQSxZQStCTEMsaUJBL0JLLEdBb0NIVCxRQXBDRyxDQStCTFMsaUJBL0JLO0FBQUEsWUFnQ0xDLFFBaENLLEdBb0NIVixRQXBDRyxDQWdDTFUsUUFoQ0s7QUFBQSxZQWlDTEMsU0FqQ0ssR0FvQ0hYLFFBcENHLENBaUNMVyxTQWpDSztBQUFBLFlBa0NMQyxTQWxDSyxHQW9DSFosUUFwQ0csQ0FrQ0xZLFNBbENLO0FBQUEsWUFtQ0xDLE9BbkNLLEdBb0NIYixRQXBDRyxDQW1DTGEsT0FuQ0s7QUFzQ1AsWUFBTUMsdUJBQXVCLEdBQUc7QUFDOUJDLFVBQUFBLGtCQUFrQixFQUFFYixjQUFjLENBQUNhLGtCQURMO0FBRTlCQyxVQUFBQSxhQUFhLEVBQUVqQixPQUFPLENBQUNpQjtBQUZPLFNBQWhDO0FBS0EsWUFBTUMsVUFBVSxHQUFHO0FBQ2pCckIsVUFBQUEsT0FBTyxFQUFQQSxPQURpQjtBQUVqQkMsVUFBQUEsT0FBTyxFQUFQQSxPQUZpQjtBQUdqQmEsVUFBQUEsUUFBUSxFQUFSQSxRQUhpQjtBQUlqQlAsVUFBQUEsT0FBTyxFQUFQQSxPQUppQjtBQUtqQkMsVUFBQUEsTUFBTSxFQUFOQSxNQUxpQjtBQU1qQkUsVUFBQUEsVUFBVSxFQUFWQSxVQU5pQjtBQU9qQkUsVUFBQUEsWUFBWSxFQUFaQSxZQVBpQjtBQVFqQkMsVUFBQUEsaUJBQWlCLEVBQWpCQSxpQkFSaUI7QUFTakIxQyxVQUFBQSxRQUFRLEVBQVJBLFFBVGlCO0FBVWpCd0MsVUFBQUEsYUFBYSxFQUFiQSxhQVZpQjtBQVdqQlQsVUFBQUEsU0FBUyxFQUFUQSxTQVhpQjtBQVlqQkMsVUFBQUEsT0FBTyxFQUFQQSxPQVppQjtBQWFqQnhCLFVBQUFBLGVBQWUsRUFBZkEsZUFiaUI7QUFjakIwQixVQUFBQSxlQUFlLEVBQWZBLGVBZGlCO0FBZWpCQyxVQUFBQSxjQUFjLEVBQWRBLGNBZmlCO0FBZ0JqQmIsVUFBQUEsS0FBSyxFQUFFNkIsNEJBQVdDLFNBQVgsQ0FBcUI5QjtBQWhCWCxTQUFuQjtBQW1CQSxZQUFNK0IsU0FBUyxHQUFHO0FBQ2hCVixVQUFBQSxRQUFRLEVBQVJBLFFBRGdCO0FBRWhCOUIsVUFBQUEsb0JBQW9CLEVBQXBCQSxvQkFGZ0I7QUFHaEJVLFVBQUFBLFFBQVEsRUFBUkEsUUFIZ0I7QUFJaEJ2QixVQUFBQSxRQUFRLEVBQVJBLFFBSmdCO0FBS2hCc0QsVUFBQUEsV0FBVyxFQUFFdEIsT0FBTyxDQUFDc0IsV0FMTDtBQU1oQmpCLFVBQUFBLE1BQU0sRUFBTkEsTUFOZ0I7QUFPaEJFLFVBQUFBLFVBQVUsRUFBVkEsVUFQZ0I7QUFRaEJLLFVBQUFBLFNBQVMsRUFBVEEsU0FSZ0I7QUFTaEJKLFVBQUFBLGFBQWEsRUFBYkEsYUFUZ0I7QUFVaEJFLFVBQUFBLGlCQUFpQixFQUFqQkEsaUJBVmdCO0FBV2hCRyxVQUFBQSxTQUFTLEVBQVRBLFNBWGdCO0FBWWhCQyxVQUFBQSxPQUFPLEVBQVBBLE9BWmdCO0FBYWhCUyxVQUFBQSxnQkFBZ0IsRUFBRXBCLGNBQWMsQ0FBQ29CLGdCQWJqQjtBQWNoQnBCLFVBQUFBLGNBQWMsRUFBZEEsY0FkZ0I7QUFlaEJELFVBQUFBLGVBQWUsRUFBZkEsZUFmZ0I7QUFnQmhCUixVQUFBQSxlQUFlLEVBQWZBO0FBaEJnQixTQUFsQjtBQW1CQSxZQUFNRSxPQUFPLEdBQUdVLFNBQVMsSUFBSUEsU0FBUyxDQUFDa0IsTUFBVixHQUFtQixDQUFoRDtBQUNBLFlBQU1DLFVBQVUsR0FBR2xDLFFBQVEsQ0FBQ0QsS0FBVCxJQUFrQkUsTUFBTSxDQUFDSSxPQUFELENBQU4sR0FBa0IsQ0FBcEMsQ0FBbkI7QUFFQSxZQUFNOEIsYUFBYSxHQUFHLENBQUM5QixPQUFELEdBQ2xCLENBQ0UsNkJBQUMsWUFBRDtBQUNFLFVBQUEsR0FBRyxFQUFFLENBRFA7QUFFRSxVQUFBLEtBQUssRUFBRTtBQUZULFdBR015QixTQUhOO0FBSUUsVUFBQSxTQUFTLEVBQUV6QixPQUFPLEdBQUdVLFNBQVMsQ0FBQyxDQUFELENBQVQsQ0FBYUQsTUFBaEIsR0FBeUI7QUFKN0MsV0FERixDQURrQixHQVNsQkMsU0FBUyxDQUFDbkMsR0FBVixDQUFjLFVBQUN3RCxRQUFELEVBQVdDLEtBQVg7QUFBQSxpQkFDWiw2QkFBQyxZQUFEO0FBQ0UsWUFBQSxHQUFHLEVBQUVBLEtBRFA7QUFFRSxZQUFBLEtBQUssRUFBRUE7QUFGVCxhQUdNUCxTQUhOO0FBSUUsWUFBQSxTQUFTLEVBQUVmLFNBQVMsQ0FBQ3NCLEtBQUQsQ0FBVCxDQUFpQnZCO0FBSjlCLGFBRFk7QUFBQSxTQUFkLENBVEo7QUFrQkEsWUFBTXdCLFdBQVcsR0FBRzdCLE9BQU8sQ0FBQzhCLFlBQVIsS0FBeUJDLGdDQUE3QztBQUVBLGVBQ0UsNkJBQUMsK0JBQUQ7QUFBZSxVQUFBLEtBQUssRUFBRW5GO0FBQXRCLFdBQ0UsNkJBQUMsV0FBRDtBQUNFLFVBQUEsS0FBSyxFQUFFO0FBQ0xvRixZQUFBQSxRQUFRLEVBQUUsVUFETDtBQUVMMUMsWUFBQUEsS0FBSyxZQUFLQSxLQUFMLE9BRkE7QUFHTEQsWUFBQUEsTUFBTSxZQUFLQSxNQUFMO0FBSEQsV0FEVDtBQU1FLFVBQUEsU0FBUyxFQUFDLFdBTlo7QUFPRSxVQUFBLEVBQUUsdUJBQWdCaEIsRUFBaEIsQ0FQSjtBQVFFLFVBQUEsUUFBUSxFQUFFLGtCQUFBNEQsSUFBSSxFQUFJO0FBQ2hCLFlBQUEsTUFBSSxDQUFDQyxJQUFMLEdBQVlELElBQVo7QUFDRDtBQVZILFdBWUUsNkJBQUMsaUJBQUQsRUFBdUJsQix1QkFBdkIsQ0FaRixFQWFHLENBQUNmLE9BQU8sQ0FBQ21DLFFBQVQsSUFBcUIsNkJBQUMsU0FBRCxFQUFlakIsVUFBZixDQWJ4QixFQWNFO0FBQUssVUFBQSxTQUFTLEVBQUMsTUFBZjtBQUFzQixVQUFBLEtBQUssRUFBRTtBQUFDa0IsWUFBQUEsT0FBTyxFQUFFO0FBQVY7QUFBN0IsV0FDR1YsYUFESCxDQWRGLEVBaUJHRyxXQUFXLElBQ1YsNkJBQUMsYUFBRDtBQUNFLFVBQUEsS0FBSyxFQUFFdkMsS0FEVDtBQUVFLFVBQUEsTUFBTSxFQUFFRCxNQUZWO0FBR0UsVUFBQSxrQkFBa0IsRUFBRVcsT0FBTyxDQUFDcUMsV0FIOUI7QUFJRSxVQUFBLFNBQVMsRUFBRWhCLFNBSmI7QUFLRSxVQUFBLG1CQUFtQixFQUFFbEIsY0FBYyxDQUFDbUMsbUJBTHRDO0FBTUUsVUFBQSxxQkFBcUIsRUFBRW5DLGNBQWMsQ0FBQ29DO0FBTnhDLFVBbEJKLEVBMkJFLDZCQUFDLFlBQUQ7QUFDRSxVQUFBLE9BQU8sRUFBRW5DLE9BRFg7QUFFRSxVQUFBLFFBQVEsRUFBRU8sUUFGWjtBQUdFLFVBQUEsT0FBTyxFQUFFWCxPQUhYO0FBSUUsVUFBQSxlQUFlLEVBQUVFLGVBSm5CO0FBS0UsVUFBQSxjQUFjLEVBQ1ppQiw0QkFBV0MsU0FBWCxDQUFxQjlCLEtBQXJCLEdBQTZCNkIsNEJBQVdDLFNBQVgsQ0FBcUJvQixNQUFyQixDQUE0QkMsSUFON0Q7QUFRRSxVQUFBLFVBQVUsRUFBRWhCO0FBUmQsVUEzQkYsRUFxQ0UsNkJBQUMsWUFBRDtBQUNFLFVBQUEsUUFBUSxFQUFFekQsUUFEWjtBQUVFLFVBQUEsUUFBUSxFQUFFaUMsUUFGWjtBQUdFLFVBQUEsUUFBUSxFQUFFVixRQUhaO0FBSUUsVUFBQSxPQUFPLEVBQUVTLE9BSlg7QUFLRSxVQUFBLG9CQUFvQixFQUFFbkIsb0JBTHhCO0FBTUUsVUFBQSxlQUFlLEVBQUVxQixlQU5uQjtBQU9FLFVBQUEsY0FBYyxFQUFFQyxjQVBsQjtBQVFFLFVBQUEsZUFBZSxFQUFFM0IsZUFSbkI7QUFTRSxVQUFBLFFBQVEsRUFBRSxLQUFLMEQsSUFUakI7QUFVRSxVQUFBLFVBQVUsRUFBRVQsVUFWZDtBQVdFLFVBQUEsVUFBVSxFQUFFbEMsUUFBUSxDQUFDRjtBQVh2QixVQXJDRixDQURGLENBREY7QUF1REQ7QUE1T0g7QUFBQTtBQUFBLElBQ3VCcUQsZ0JBRHZCOztBQUFBLGdDQUNNOUUsUUFETixrQkFFd0I7QUFDcEJLLElBQUFBLFNBQVMsRUFBRSxFQURTO0FBRXBCcUIsSUFBQUEsS0FBSyxFQUFFLEdBRmE7QUFHcEJELElBQUFBLE1BQU0sRUFBRSxHQUhZO0FBSXBCUSxJQUFBQSxPQUFPLEVBQUU4QywrQkFKVztBQUtwQjdDLElBQUFBLE9BQU8sRUFBRThDO0FBTFcsR0FGeEI7QUErT0EsU0FBTyw4QkFBZ0JDLGVBQWhCLEVBQWlDQyxrQkFBakMsRUFBcURsRixRQUFyRCxDQUFQO0FBQ0Q7O0FBRUQsU0FBU2lGLGVBQVQsQ0FBeUJFLEtBQXpCLEVBQWdDcEcsS0FBaEMsRUFBdUM7QUFDckMseUNBQ0tBLEtBREw7QUFFRXNELElBQUFBLFFBQVEsRUFBRThDLEtBQUssQ0FBQzlDLFFBRmxCO0FBR0VqQyxJQUFBQSxRQUFRLEVBQUUrRSxLQUFLLENBQUMvRSxRQUhsQjtBQUlFdUIsSUFBQUEsUUFBUSxFQUFFd0QsS0FBSyxDQUFDeEQsUUFKbEI7QUFLRVMsSUFBQUEsT0FBTyxFQUFFK0MsS0FBSyxDQUFDL0M7QUFMakI7QUFPRDs7QUFFRCxTQUFTOEMsa0JBQVQsQ0FBNEJFLFFBQTVCLEVBQXNDQyxRQUF0QyxFQUFnRDtBQUM5QyxNQUFNQyxXQUFXLEdBQUdELFFBQVEsQ0FBQ0UsT0FBVCxJQUFvQixFQUF4Qzs7QUFEOEMsYUFRMUMsQ0FDRkMsZUFERSxFQUVGQyxlQUZFLEVBR0ZDLGVBSEUsRUFJRkMsY0FKRSxFQUtGcEYsR0FMRSxDQUtFLFVBQUFnRixPQUFPO0FBQUEsV0FDWCwrQkFBbUJLLFlBQVksQ0FBQ0wsT0FBRCxFQUFVRCxXQUFWLENBQS9CLEVBQXVERixRQUF2RCxDQURXO0FBQUEsR0FMVCxDQVIwQztBQUFBO0FBQUEsTUFJNUM5QyxlQUo0QztBQUFBLE1BSzVDUixlQUw0QztBQUFBLE1BTTVDbEIsZUFONEM7QUFBQSxNQU81QzJCLGNBUDRDOztBQWlCOUMsU0FBTztBQUNMRCxJQUFBQSxlQUFlLEVBQWZBLGVBREs7QUFFTFIsSUFBQUEsZUFBZSxFQUFmQSxlQUZLO0FBR0xsQixJQUFBQSxlQUFlLEVBQWZBLGVBSEs7QUFJTDJCLElBQUFBLGNBQWMsRUFBZEEsY0FKSztBQUtMNkMsSUFBQUEsUUFBUSxFQUFSQTtBQUxLLEdBQVA7QUFPRDtBQUVEOzs7OztBQUdBLFNBQVNRLFlBQVQsQ0FBc0JMLE9BQXRCLEVBQStCRCxXQUEvQixFQUE0QztBQUMxQyxNQUFNTyxTQUFTLEdBQUcsRUFBbEI7O0FBQ0EsT0FBSyxJQUFNQyxHQUFYLElBQWtCUixXQUFsQixFQUErQjtBQUM3QixRQUFJQSxXQUFXLENBQUNTLGNBQVosQ0FBMkJELEdBQTNCLEtBQW1DUCxPQUFPLENBQUNRLGNBQVIsQ0FBdUJELEdBQXZCLENBQXZDLEVBQW9FO0FBQ2xFRCxNQUFBQSxTQUFTLENBQUNDLEdBQUQsQ0FBVCxHQUFpQlIsV0FBVyxDQUFDUSxHQUFELENBQTVCO0FBQ0Q7QUFDRjs7QUFFRCx5Q0FBV1AsT0FBWCxFQUF1Qk0sU0FBdkI7QUFDRDs7ZUFFYzNHLGUiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7Y29uc29sZSBhcyBDb25zb2xlfSBmcm9tICdnbG9iYWwvd2luZG93JztcbmltcG9ydCB7YmluZEFjdGlvbkNyZWF0b3JzfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQge2pzb24gYXMgcmVxdWVzdEpzb259IGZyb20gJ2QzLXJlcXVlc3QnO1xuaW1wb3J0IHN0eWxlZCwge1RoZW1lUHJvdmlkZXJ9ICBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQge2Nvbm5lY3QgYXMga2VwbGVyR2xDb25uZWN0fSBmcm9tICdjb25uZWN0L2tlcGxlcmdsLWNvbm5lY3QnO1xuaW1wb3J0IHtpc1ZhbGlkU3R5bGVVcmwsIGdldFN0eWxlRG93bmxvYWRVcmx9IGZyb20gJ3V0aWxzL21hcC1zdHlsZS11dGlscy9tYXBib3gtZ2wtc3R5bGUtZWRpdG9yJztcblxuaW1wb3J0ICogYXMgVmlzU3RhdGVBY3Rpb25zIGZyb20gJ2FjdGlvbnMvdmlzLXN0YXRlLWFjdGlvbnMnO1xuaW1wb3J0ICogYXMgTWFwU3RhdGVBY3Rpb25zIGZyb20gJ2FjdGlvbnMvbWFwLXN0YXRlLWFjdGlvbnMnO1xuaW1wb3J0ICogYXMgTWFwU3R5bGVBY3Rpb25zIGZyb20gJ2FjdGlvbnMvbWFwLXN0eWxlLWFjdGlvbnMnO1xuaW1wb3J0ICogYXMgVUlTdGF0ZUFjdGlvbnMgZnJvbSAnYWN0aW9ucy91aS1zdGF0ZS1hY3Rpb25zJztcblxuaW1wb3J0IHtFWFBPUlRfSU1BR0VfSUQsIERJTUVOU0lPTlMsXG4gIEtFUExFUl9HTF9OQU1FLCBLRVBMRVJfR0xfVkVSU0lPTn0gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuXG5pbXBvcnQgU2lkZVBhbmVsRmFjdG9yeSBmcm9tICcuL3NpZGUtcGFuZWwnO1xuaW1wb3J0IE1hcENvbnRhaW5lckZhY3RvcnkgZnJvbSAnLi9tYXAtY29udGFpbmVyJztcbmltcG9ydCBCb3R0b21XaWRnZXRGYWN0b3J5IGZyb20gJy4vYm90dG9tLXdpZGdldCc7XG5pbXBvcnQgTW9kYWxDb250YWluZXJGYWN0b3J5IGZyb20gJy4vbW9kYWwtY29udGFpbmVyJztcbmltcG9ydCBQbG90Q29udGFpbmVyRmFjdG9yeSBmcm9tICcuL3Bsb3QtY29udGFpbmVyJztcbmltcG9ydCBOb3RpZmljYXRpb25QYW5lbEZhY3RvcnkgZnJvbSAnLi9ub3RpZmljYXRpb24tcGFuZWwnO1xuXG5pbXBvcnQge2dlbmVyYXRlSGFzaElkfSBmcm9tICd1dGlscy91dGlscyc7XG5cbmltcG9ydCB7dGhlbWV9IGZyb20gJ3N0eWxlcy9iYXNlJztcblxuLy8gTWF5YmUgd2Ugc2hvdWxkIHRoaW5rIGFib3V0IGV4cG9ydGluZyB0aGlzIG9yIGNyZWF0aW5nIGEgdmFyaWFibGVcbi8vIGFzIHBhcnQgb2YgdGhlIGJhc2UuanMgdGhlbWVcbmNvbnN0IEdsb2JhbFN0eWxlID0gc3R5bGVkLmRpdmBcbiAgZm9udC1mYW1pbHk6IGZmLWNsYW4td2ViLXBybywgJ0hlbHZldGljYSBOZXVlJywgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LXNpemU6IDAuODc1ZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjcxNDI5O1xuXG4gICosXG4gICo6YmVmb3JlLFxuICAqOmFmdGVyIHtcbiAgICAtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgLW1vei1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIH1cblxuICB1bCB7XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDA7XG4gIH1cblxuICBsaSB7XG4gICAgbWFyZ2luOiAwO1xuICB9XG5cbiAgYSB7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmxhYmVsQ29sb3J9O1xuICB9XG5gO1xuXG5LZXBsZXJHbEZhY3RvcnkuZGVwcyA9IFtcbiAgQm90dG9tV2lkZ2V0RmFjdG9yeSxcbiAgTWFwQ29udGFpbmVyRmFjdG9yeSxcbiAgTW9kYWxDb250YWluZXJGYWN0b3J5LFxuICBTaWRlUGFuZWxGYWN0b3J5LFxuICBQbG90Q29udGFpbmVyRmFjdG9yeSxcbiAgTm90aWZpY2F0aW9uUGFuZWxGYWN0b3J5XG5dO1xuXG5mdW5jdGlvbiBLZXBsZXJHbEZhY3RvcnkoXG4gIEJvdHRvbVdpZGdldCxcbiAgTWFwQ29udGFpbmVyLFxuICBNb2RhbFdyYXBwZXIsXG4gIFNpZGVQYW5lbCxcbiAgUGxvdENvbnRhaW5lcixcbiAgTm90aWZpY2F0aW9uUGFuZWxcbikge1xuICBjbGFzcyBLZXBsZXJHTCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgIG1hcFN0eWxlczogW10sXG4gICAgICB3aWR0aDogODAwLFxuICAgICAgaGVpZ2h0OiA4MDAsXG4gICAgICBhcHBOYW1lOiBLRVBMRVJfR0xfTkFNRSxcbiAgICAgIHZlcnNpb246IEtFUExFUl9HTF9WRVJTSU9OXG4gICAgfTtcblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgIHRoaXMuX2xvYWRNYXBTdHlsZSh0aGlzLnByb3BzLm1hcFN0eWxlcyk7XG4gICAgICB0aGlzLl9oYW5kbGVSZXNpemUodGhpcy5wcm9wcyk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgIGlmIChcbiAgICAgICAgLy8gaWYgZGltZW5zaW9uIHByb3BzIGhhcyBjaGFuZ2VkXG4gICAgICAgIHRoaXMucHJvcHMuaGVpZ2h0ICE9PSBuZXh0UHJvcHMuaGVpZ2h0IHx8XG4gICAgICAgIHRoaXMucHJvcHMud2lkdGggIT09IG5leHRQcm9wcy53aWR0aCB8fFxuICAgICAgICAvLyByZWFjdC1tYXAtZ2wgd2lsbCBkaXNwYXRjaCB1cGRhdGVWaWV3cG9ydCBhZnRlciB0aGlzLl9oYW5kbGVSZXNpemUgaXMgY2FsbGVkXG4gICAgICAgIC8vIGhlcmUgd2UgY2hlY2sgaWYgdGhpcy5wcm9wcy5tYXBTdGF0ZS5oZWlnaHQgaXMgc3luYyB3aXRoIHByb3BzLmhlaWdodFxuICAgICAgICBuZXh0UHJvcHMuaGVpZ2h0ICE9PSB0aGlzLnByb3BzLm1hcFN0YXRlLmhlaWdodFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuX2hhbmRsZVJlc2l6ZShuZXh0UHJvcHMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIF9oYW5kbGVSZXNpemUoe3dpZHRoLCBoZWlnaHR9KSB7XG4gICAgICBpZiAoIU51bWJlci5pc0Zpbml0ZSh3aWR0aCkgfHwgIU51bWJlci5pc0Zpbml0ZShoZWlnaHQpKSB7XG4gICAgICAgIENvbnNvbGUud2Fybignd2lkdGggYW5kIGhlaWdodCBpcyByZXF1aXJlZCcpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLnByb3BzLm1hcFN0YXRlQWN0aW9ucy51cGRhdGVNYXAoe1xuICAgICAgICB3aWR0aDogd2lkdGggLyAoMSArIE51bWJlcih0aGlzLnByb3BzLm1hcFN0YXRlLmlzU3BsaXQpKSxcbiAgICAgICAgaGVpZ2h0XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBfbG9hZE1hcFN0eWxlID0gKCkgPT4ge1xuICAgICAgY29uc3QgZGVmYXVsdFN0eWxlcyA9IE9iamVjdC52YWx1ZXModGhpcy5wcm9wcy5tYXBTdHlsZS5tYXBTdHlsZXMpO1xuICAgICAgLy8gYWRkIGlkIHRvIGN1c3RvbSBtYXAgc3R5bGVzIGlmIG5vdCBnaXZlblxuICAgICAgY29uc3QgY3VzdG9tZVN0eWxlcyA9ICh0aGlzLnByb3BzLm1hcFN0eWxlcyB8fCBbXSkubWFwKG1zID0+ICh7XG4gICAgICAgIC4uLm1zLFxuICAgICAgICBpZDogbXMuaWQgfHwgZ2VuZXJhdGVIYXNoSWQoKVxuICAgICAgfSkpO1xuXG4gICAgICBbLi4uY3VzdG9tZVN0eWxlcywgLi4uZGVmYXVsdFN0eWxlc10uZm9yRWFjaChcbiAgICAgICAgc3R5bGUgPT4ge1xuICAgICAgICAgIGlmIChzdHlsZS5zdHlsZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5tYXBTdHlsZUFjdGlvbnMubG9hZE1hcFN0eWxlcyh7XG4gICAgICAgICAgICAgIFtzdHlsZS5pZF06IHN0eWxlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9yZXF1ZXN0TWFwU3R5bGUoc3R5bGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgX3JlcXVlc3RNYXBTdHlsZSA9IChtYXBTdHlsZSkgPT4ge1xuICAgICAgY29uc3Qge3VybCwgaWR9ID0gbWFwU3R5bGU7XG5cbiAgICAgIGNvbnN0IGRvd25sb2FkVXJsID0gaXNWYWxpZFN0eWxlVXJsKHVybCkgP1xuICAgICAgICBnZXRTdHlsZURvd25sb2FkVXJsKHVybCwgdGhpcy5wcm9wcy5tYXBib3hBcGlBY2Nlc3NUb2tlbikgOiB1cmw7XG5cbiAgICAgIHJlcXVlc3RKc29uKGRvd25sb2FkVXJsLCAoZXJyb3IsIHJlc3VsdCkgPT4ge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICBDb25zb2xlLndhcm4oYEVycm9yIGxvYWRpbmcgbWFwIHN0eWxlICR7dXJsfWApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucHJvcHMubWFwU3R5bGVBY3Rpb25zLmxvYWRNYXBTdHlsZXMoe1xuICAgICAgICAgICAgW2lkXTogey4uLm1hcFN0eWxlLCBzdHlsZTogcmVzdWx0fVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgcmVuZGVyKCkge1xuICAgICAgY29uc3Qge1xuICAgICAgICAvLyBwcm9wc1xuICAgICAgICBpZCxcbiAgICAgICAgYXBwTmFtZSxcbiAgICAgICAgdmVyc2lvbixcbiAgICAgICAgb25TYXZlTWFwLFxuICAgICAgICB3aWR0aCxcbiAgICAgICAgaGVpZ2h0LFxuICAgICAgICBtYXBib3hBcGlBY2Nlc3NUb2tlbixcblxuICAgICAgICAvLyByZWR1eCBzdGF0ZVxuICAgICAgICBtYXBTdHlsZSxcbiAgICAgICAgbWFwU3RhdGUsXG4gICAgICAgIHVpU3RhdGUsXG4gICAgICAgIHZpc1N0YXRlLFxuXG4gICAgICAgIC8vIGFjdGlvbnMsXG4gICAgICAgIHZpc1N0YXRlQWN0aW9ucyxcbiAgICAgICAgbWFwU3RhdGVBY3Rpb25zLFxuICAgICAgICBtYXBTdHlsZUFjdGlvbnMsXG4gICAgICAgIHVpU3RhdGVBY3Rpb25zXG4gICAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgY29uc3Qge1xuICAgICAgICBmaWx0ZXJzLFxuICAgICAgICBsYXllcnMsXG4gICAgICAgIHNwbGl0TWFwcywgLy8gdGhpcyB3aWxsIHN0b3JlIHN1cHBvcnQgZm9yIHNwbGl0IG1hcCB2aWV3IGlzIG5lY2Vzc2FyeVxuICAgICAgICBsYXllck9yZGVyLFxuICAgICAgICBsYXllckJsZW5kaW5nLFxuICAgICAgICBsYXllckNsYXNzZXMsXG4gICAgICAgIGludGVyYWN0aW9uQ29uZmlnLFxuICAgICAgICBkYXRhc2V0cyxcbiAgICAgICAgbGF5ZXJEYXRhLFxuICAgICAgICBob3ZlckluZm8sXG4gICAgICAgIGNsaWNrZWRcbiAgICAgIH0gPSB2aXNTdGF0ZTtcblxuICAgICAgY29uc3Qgbm90aWZpY2F0aW9uUGFuZWxGaWVsZHMgPSB7XG4gICAgICAgIHJlbW92ZU5vdGlmaWNhdGlvbjogdWlTdGF0ZUFjdGlvbnMucmVtb3ZlTm90aWZpY2F0aW9uLFxuICAgICAgICBub3RpZmljYXRpb25zOiB1aVN0YXRlLm5vdGlmaWNhdGlvbnNcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHNpZGVGaWVsZHMgPSB7XG4gICAgICAgIGFwcE5hbWUsXG4gICAgICAgIHZlcnNpb24sXG4gICAgICAgIGRhdGFzZXRzLFxuICAgICAgICBmaWx0ZXJzLFxuICAgICAgICBsYXllcnMsXG4gICAgICAgIGxheWVyT3JkZXIsXG4gICAgICAgIGxheWVyQ2xhc3NlcyxcbiAgICAgICAgaW50ZXJhY3Rpb25Db25maWcsXG4gICAgICAgIG1hcFN0eWxlLFxuICAgICAgICBsYXllckJsZW5kaW5nLFxuICAgICAgICBvblNhdmVNYXAsXG4gICAgICAgIHVpU3RhdGUsXG4gICAgICAgIG1hcFN0eWxlQWN0aW9ucyxcbiAgICAgICAgdmlzU3RhdGVBY3Rpb25zLFxuICAgICAgICB1aVN0YXRlQWN0aW9ucyxcbiAgICAgICAgd2lkdGg6IERJTUVOU0lPTlMuc2lkZVBhbmVsLndpZHRoXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBtYXBGaWVsZHMgPSB7XG4gICAgICAgIGRhdGFzZXRzLFxuICAgICAgICBtYXBib3hBcGlBY2Nlc3NUb2tlbixcbiAgICAgICAgbWFwU3RhdGUsXG4gICAgICAgIG1hcFN0eWxlLFxuICAgICAgICBtYXBDb250cm9sczogdWlTdGF0ZS5tYXBDb250cm9scyxcbiAgICAgICAgbGF5ZXJzLFxuICAgICAgICBsYXllck9yZGVyLFxuICAgICAgICBsYXllckRhdGEsXG4gICAgICAgIGxheWVyQmxlbmRpbmcsXG4gICAgICAgIGludGVyYWN0aW9uQ29uZmlnLFxuICAgICAgICBob3ZlckluZm8sXG4gICAgICAgIGNsaWNrZWQsXG4gICAgICAgIHRvZ2dsZU1hcENvbnRyb2w6IHVpU3RhdGVBY3Rpb25zLnRvZ2dsZU1hcENvbnRyb2wsXG4gICAgICAgIHVpU3RhdGVBY3Rpb25zLFxuICAgICAgICB2aXNTdGF0ZUFjdGlvbnMsXG4gICAgICAgIG1hcFN0YXRlQWN0aW9uc1xuICAgICAgfTtcblxuICAgICAgY29uc3QgaXNTcGxpdCA9IHNwbGl0TWFwcyAmJiBzcGxpdE1hcHMubGVuZ3RoID4gMTtcbiAgICAgIGNvbnN0IGNvbnRhaW5lclcgPSBtYXBTdGF0ZS53aWR0aCAqIChOdW1iZXIoaXNTcGxpdCkgKyAxKTtcblxuICAgICAgY29uc3QgbWFwQ29udGFpbmVycyA9ICFpc1NwbGl0XG4gICAgICAgID8gW1xuICAgICAgICAgICAgPE1hcENvbnRhaW5lclxuICAgICAgICAgICAgICBrZXk9ezB9XG4gICAgICAgICAgICAgIGluZGV4PXswfVxuICAgICAgICAgICAgICB7Li4ubWFwRmllbGRzfVxuICAgICAgICAgICAgICBtYXBMYXllcnM9e2lzU3BsaXQgPyBzcGxpdE1hcHNbMF0ubGF5ZXJzIDogbnVsbH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgXVxuICAgICAgICA6IHNwbGl0TWFwcy5tYXAoKHNldHRpbmdzLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgPE1hcENvbnRhaW5lclxuICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICBpbmRleD17aW5kZXh9XG4gICAgICAgICAgICAgIHsuLi5tYXBGaWVsZHN9XG4gICAgICAgICAgICAgIG1hcExheWVycz17c3BsaXRNYXBzW2luZGV4XS5sYXllcnN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkpO1xuXG4gICAgICBjb25zdCBpc0V4cG9ydGluZyA9IHVpU3RhdGUuY3VycmVudE1vZGFsID09PSBFWFBPUlRfSU1BR0VfSUQ7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxUaGVtZVByb3ZpZGVyIHRoZW1lPXt0aGVtZX0+XG4gICAgICAgICAgPEdsb2JhbFN0eWxlXG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgICAgd2lkdGg6IGAke3dpZHRofXB4YCxcbiAgICAgICAgICAgICAgaGVpZ2h0OiBgJHtoZWlnaHR9cHhgXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwia2VwbGVyLWdsXCJcbiAgICAgICAgICAgIGlkPXtga2VwbGVyLWdsX18ke2lkfWB9XG4gICAgICAgICAgICBpbm5lclJlZj17bm9kZSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMucm9vdCA9IG5vZGU7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxOb3RpZmljYXRpb25QYW5lbCB7Li4ubm90aWZpY2F0aW9uUGFuZWxGaWVsZHN9IC8+XG4gICAgICAgICAgICB7IXVpU3RhdGUucmVhZE9ubHkgJiYgPFNpZGVQYW5lbCB7Li4uc2lkZUZpZWxkc30gLz59XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1hcHNcIiBzdHlsZT17e2Rpc3BsYXk6ICdmbGV4J319PlxuICAgICAgICAgICAgICB7bWFwQ29udGFpbmVyc31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge2lzRXhwb3J0aW5nICYmXG4gICAgICAgICAgICAgIDxQbG90Q29udGFpbmVyXG4gICAgICAgICAgICAgICAgd2lkdGg9e3dpZHRofVxuICAgICAgICAgICAgICAgIGhlaWdodD17aGVpZ2h0fVxuICAgICAgICAgICAgICAgIGV4cG9ydEltYWdlU2V0dGluZz17dWlTdGF0ZS5leHBvcnRJbWFnZX1cbiAgICAgICAgICAgICAgICBtYXBGaWVsZHM9e21hcEZpZWxkc31cbiAgICAgICAgICAgICAgICBzdGFydEV4cG9ydGluZ0ltYWdlPXt1aVN0YXRlQWN0aW9ucy5zdGFydEV4cG9ydGluZ0ltYWdlfVxuICAgICAgICAgICAgICAgIHNldEV4cG9ydEltYWdlRGF0YVVyaT17dWlTdGF0ZUFjdGlvbnMuc2V0RXhwb3J0SW1hZ2VEYXRhVXJpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgPEJvdHRvbVdpZGdldFxuICAgICAgICAgICAgICBmaWx0ZXJzPXtmaWx0ZXJzfVxuICAgICAgICAgICAgICBkYXRhc2V0cz17ZGF0YXNldHN9XG4gICAgICAgICAgICAgIHVpU3RhdGU9e3VpU3RhdGV9XG4gICAgICAgICAgICAgIHZpc1N0YXRlQWN0aW9ucz17dmlzU3RhdGVBY3Rpb25zfVxuICAgICAgICAgICAgICBzaWRlUGFuZWxXaWR0aD17XG4gICAgICAgICAgICAgICAgRElNRU5TSU9OUy5zaWRlUGFuZWwud2lkdGggKyBESU1FTlNJT05TLnNpZGVQYW5lbC5tYXJnaW4ubGVmdFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnRhaW5lclc9e2NvbnRhaW5lcld9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPE1vZGFsV3JhcHBlclxuICAgICAgICAgICAgICBtYXBTdHlsZT17bWFwU3R5bGV9XG4gICAgICAgICAgICAgIHZpc1N0YXRlPXt2aXNTdGF0ZX1cbiAgICAgICAgICAgICAgbWFwU3RhdGU9e21hcFN0YXRlfVxuICAgICAgICAgICAgICB1aVN0YXRlPXt1aVN0YXRlfVxuICAgICAgICAgICAgICBtYXBib3hBcGlBY2Nlc3NUb2tlbj17bWFwYm94QXBpQWNjZXNzVG9rZW59XG4gICAgICAgICAgICAgIHZpc1N0YXRlQWN0aW9ucz17dmlzU3RhdGVBY3Rpb25zfVxuICAgICAgICAgICAgICB1aVN0YXRlQWN0aW9ucz17dWlTdGF0ZUFjdGlvbnN9XG4gICAgICAgICAgICAgIG1hcFN0eWxlQWN0aW9ucz17bWFwU3R5bGVBY3Rpb25zfVxuICAgICAgICAgICAgICByb290Tm9kZT17dGhpcy5yb290fVxuICAgICAgICAgICAgICBjb250YWluZXJXPXtjb250YWluZXJXfVxuICAgICAgICAgICAgICBjb250YWluZXJIPXttYXBTdGF0ZS5oZWlnaHR9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvR2xvYmFsU3R5bGU+XG4gICAgICAgIDwvVGhlbWVQcm92aWRlcj5cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGtlcGxlckdsQ29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoS2VwbGVyR0wpO1xufVxuXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUsIHByb3BzKSB7XG4gIHJldHVybiB7XG4gICAgLi4ucHJvcHMsXG4gICAgdmlzU3RhdGU6IHN0YXRlLnZpc1N0YXRlLFxuICAgIG1hcFN0eWxlOiBzdGF0ZS5tYXBTdHlsZSxcbiAgICBtYXBTdGF0ZTogc3RhdGUubWFwU3RhdGUsXG4gICAgdWlTdGF0ZTogc3RhdGUudWlTdGF0ZVxuICB9O1xufVxuXG5mdW5jdGlvbiBtYXBEaXNwYXRjaFRvUHJvcHMoZGlzcGF0Y2gsIG93blByb3BzKSB7XG4gIGNvbnN0IHVzZXJBY3Rpb25zID0gb3duUHJvcHMuYWN0aW9ucyB8fCB7fTtcblxuICBjb25zdCBbXG4gICAgdmlzU3RhdGVBY3Rpb25zLFxuICAgIG1hcFN0YXRlQWN0aW9ucyxcbiAgICBtYXBTdHlsZUFjdGlvbnMsXG4gICAgdWlTdGF0ZUFjdGlvbnNcbiAgXSA9IFtcbiAgICBWaXNTdGF0ZUFjdGlvbnMsXG4gICAgTWFwU3RhdGVBY3Rpb25zLFxuICAgIE1hcFN0eWxlQWN0aW9ucyxcbiAgICBVSVN0YXRlQWN0aW9uc1xuICBdLm1hcChhY3Rpb25zID0+XG4gICAgYmluZEFjdGlvbkNyZWF0b3JzKG1lcmdlQWN0aW9ucyhhY3Rpb25zLCB1c2VyQWN0aW9ucyksIGRpc3BhdGNoKVxuICApO1xuXG4gIHJldHVybiB7XG4gICAgdmlzU3RhdGVBY3Rpb25zLFxuICAgIG1hcFN0YXRlQWN0aW9ucyxcbiAgICBtYXBTdHlsZUFjdGlvbnMsXG4gICAgdWlTdGF0ZUFjdGlvbnMsXG4gICAgZGlzcGF0Y2hcbiAgfTtcbn1cblxuLyoqXG4gKiBPdmVycmlkZSBkZWZhdWx0IG1hcHMtZ2wgYWN0aW9ucyB3aXRoIHVzZXIgZGVmaW5lZCBhY3Rpb25zIHVzaW5nIHRoZSBzYW1lIGtleVxuICovXG5mdW5jdGlvbiBtZXJnZUFjdGlvbnMoYWN0aW9ucywgdXNlckFjdGlvbnMpIHtcbiAgY29uc3Qgb3ZlcnJpZGVzID0ge307XG4gIGZvciAoY29uc3Qga2V5IGluIHVzZXJBY3Rpb25zKSB7XG4gICAgaWYgKHVzZXJBY3Rpb25zLmhhc093blByb3BlcnR5KGtleSkgJiYgYWN0aW9ucy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBvdmVycmlkZXNba2V5XSA9IHVzZXJBY3Rpb25zW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsuLi5hY3Rpb25zLCAuLi5vdmVycmlkZXN9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBLZXBsZXJHbEZhY3Rvcnk7XG4iXX0=