"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SidePanelFactory;
exports.PanelTitleFactory = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

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

var _sideBar = _interopRequireDefault(require("./side-panel/side-bar"));

var _panelHeader = _interopRequireDefault(require("./side-panel/panel-header"));

var _layerManager = _interopRequireDefault(require("./side-panel/layer-manager"));

var _filterManager = _interopRequireDefault(require("./side-panel/filter-manager"));

var _interactionManager = _interopRequireDefault(require("./side-panel/interaction-manager"));

var _mapManager = _interopRequireDefault(require("./side-panel/map-manager"));

var _panelToggle = _interopRequireDefault(require("./side-panel/panel-toggle"));

var _defaultSettings = require("../constants/default-settings");

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  font-size: 20px;\n  font-weight: 400;\n  letter-spacing: 1.25px;\n  margin-bottom: 14px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  ", ";\n  flex-grow: 1;\n  padding: 16px;\n  overflow-y: scroll;\n  overflow-x: hidden;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var SidePanelContent = _styledComponents.default.div(_templateObject(), function (props) {
  return props.theme.sidePanelScrollBar;
});

var PanelTitleFactory = function PanelTitleFactory() {
  return _styledComponents.default.div(_templateObject2(), function (props) {
    return props.theme.titleTextColor;
  });
};

exports.PanelTitleFactory = PanelTitleFactory;
SidePanelFactory.deps = [_sideBar.default, _panelHeader.default, _panelToggle.default, PanelTitleFactory, _layerManager.default, _filterManager.default, _interactionManager.default, _mapManager.default];
/**
 *
 * Vertical sidebar containing input components for the rendering layers
 */

function SidePanelFactory(Sidebar, PanelHeader, PanelToggle, PanelTitle, LayerManager, FilterManager, InteractionManager, MapManager) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2.default)(SidePanel, _Component);

    function SidePanel() {
      var _getPrototypeOf2;

      var _this;

      (0, _classCallCheck2.default)(this, SidePanel);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(SidePanel)).call.apply(_getPrototypeOf2, [this].concat(args)));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_onOpenOrClose", function () {
        _this.props.uiStateActions.toggleSidePanel(_this.props.uiState.activeSidePanel ? null : 'layer');
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_showDatasetTable", function (dataId) {
        // this will open data table modal
        _this.props.visStateActions.showDatasetTable(dataId);

        _this.props.uiStateActions.toggleModal(_defaultSettings.DATA_TABLE_ID);
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_showAddDataModal", function () {
        _this.props.uiStateActions.toggleModal(_defaultSettings.ADD_DATA_ID);
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_showAddMapStyleModal", function () {
        _this.props.uiStateActions.toggleModal(_defaultSettings.ADD_MAP_STYLE_ID);
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_removeDataset", function (key) {
        // this will show the modal dialog to confirm deletion
        _this.props.uiStateActions.openDeleteModal(key);
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_onExportImage", function () {
        return _this.props.uiStateActions.toggleModal(_defaultSettings.EXPORT_IMAGE_ID);
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_onExportData", function () {
        return _this.props.uiStateActions.toggleModal(_defaultSettings.EXPORT_DATA_ID);
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_onExportConfig", function () {
        return _this.props.uiStateActions.toggleModal(_defaultSettings.EXPORT_CONFIG_ID);
      });
      return _this;
    }

    (0, _createClass2.default)(SidePanel, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            appName = _this$props.appName,
            version = _this$props.version,
            datasets = _this$props.datasets,
            filters = _this$props.filters,
            layers = _this$props.layers,
            layerBlending = _this$props.layerBlending,
            layerClasses = _this$props.layerClasses,
            uiState = _this$props.uiState,
            layerOrder = _this$props.layerOrder,
            interactionConfig = _this$props.interactionConfig,
            visStateActions = _this$props.visStateActions,
            mapStyleActions = _this$props.mapStyleActions,
            uiStateActions = _this$props.uiStateActions;
        var activeSidePanel = uiState.activeSidePanel;
        var isOpen = Boolean(activeSidePanel);
        var layerManagerActions = {
          addLayer: visStateActions.addLayer,
          layerConfigChange: visStateActions.layerConfigChange,
          layerVisualChannelConfigChange: visStateActions.layerVisualChannelConfigChange,
          layerTypeChange: visStateActions.layerTypeChange,
          layerVisConfigChange: visStateActions.layerVisConfigChange,
          updateLayerBlending: visStateActions.updateLayerBlending,
          updateLayerOrder: visStateActions.reorderLayer,
          showDatasetTable: this._showDatasetTable,
          showAddDataModal: this._showAddDataModal,
          removeLayer: visStateActions.removeLayer,
          removeDataset: this._removeDataset
        };
        var filterManagerActions = {
          addFilter: visStateActions.addFilter,
          removeFilter: visStateActions.removeFilter,
          setFilter: visStateActions.setFilter,
          showDatasetTable: this._showDatasetTable,
          showAddDataModal: this._showAddDataModal,
          toggleAnimation: visStateActions.toggleAnimation,
          enlargeFilter: visStateActions.enlargeFilter
        };
        var interactionManagerActions = {
          onConfigChange: visStateActions.interactionConfigChange
        };
        var mapManagerActions = {
          addMapStyleUrl: mapStyleActions.addMapStyleUrl,
          onConfigChange: mapStyleActions.mapConfigChange,
          onStyleChange: mapStyleActions.mapStyleChange,
          onBuildingChange: mapStyleActions.mapBuildingChange,
          showAddMapStyleModal: this._showAddMapStyleModal
        };
        return _react.default.createElement("div", null, _react.default.createElement(Sidebar, {
          width: this.props.width,
          isOpen: isOpen,
          minifiedWidth: 0,
          onOpenOrClose: this._onOpenOrClose
        }, _react.default.createElement(PanelHeader, {
          appName: appName,
          version: version,
          onExportImage: this._onExportImage,
          onExportData: this._onExportData,
          visibleDropdown: uiState.visibleDropdown,
          showExportDropdown: uiStateActions.showExportDropdown,
          hideExportDropdown: uiStateActions.hideExportDropdown,
          onExportConfig: this._onExportConfig,
          onSaveMap: this.props.onSaveMap
        }), _react.default.createElement(PanelToggle, {
          panels: _defaultSettings.PANELS,
          activePanel: activeSidePanel,
          togglePanel: uiStateActions.toggleSidePanel
        }), _react.default.createElement(SidePanelContent, {
          className: "side-panel__content"
        }, _react.default.createElement("div", null, _react.default.createElement(PanelTitle, {
          className: "side-panel__content__title"
        }, (_defaultSettings.PANELS.find(function (_ref) {
          var id = _ref.id;
          return id === activeSidePanel;
        }) || {}).label), activeSidePanel === 'layer' && _react.default.createElement(LayerManager, (0, _extends2.default)({}, layerManagerActions, {
          datasets: datasets,
          layers: layers,
          layerClasses: layerClasses,
          layerOrder: layerOrder,
          layerBlending: layerBlending,
          openModal: uiStateActions.toggleModal
        })), activeSidePanel === 'filter' && _react.default.createElement(FilterManager, (0, _extends2.default)({}, filterManagerActions, {
          datasets: datasets,
          filters: filters
        })), activeSidePanel === 'interaction' && _react.default.createElement(InteractionManager, (0, _extends2.default)({}, interactionManagerActions, {
          datasets: datasets,
          interactionConfig: interactionConfig
        })), activeSidePanel === 'map' && _react.default.createElement(MapManager, (0, _extends2.default)({}, mapManagerActions, {
          mapStyle: this.props.mapStyle
        }))))));
      }
    }]);
    return SidePanel;
  }(_react.Component), (0, _defineProperty2.default)(_class, "propTypes", {
    filters: _propTypes.default.arrayOf(_propTypes.default.any).isRequired,
    interactionConfig: _propTypes.default.object.isRequired,
    layerBlending: _propTypes.default.string.isRequired,
    layers: _propTypes.default.arrayOf(_propTypes.default.any).isRequired,
    layerClasses: _propTypes.default.object.isRequired,
    mapStyle: _propTypes.default.object.isRequired,
    width: _propTypes.default.number.isRequired,
    datasets: _propTypes.default.object.isRequired,
    visStateActions: _propTypes.default.object.isRequired,
    mapStyleActions: _propTypes.default.object.isRequired
  }), _temp;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwuanMiXSwibmFtZXMiOlsiU2lkZVBhbmVsQ29udGVudCIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJzaWRlUGFuZWxTY3JvbGxCYXIiLCJQYW5lbFRpdGxlRmFjdG9yeSIsInRpdGxlVGV4dENvbG9yIiwiU2lkZVBhbmVsRmFjdG9yeSIsImRlcHMiLCJTaWRlYmFyRmFjdG9yeSIsIlBhbmVsSGVhZGVyRmFjdG9yeSIsIlBhbmVsVG9nZ2xlRmFjdG9yeSIsIkxheWVyTWFuYWdlckZhY3RvcnkiLCJGaWx0ZXJNYW5hZ2VyRmFjdG9yeSIsIkludGVyYWN0aW9uTWFuYWdlckZhY3RvcnkiLCJNYXBNYW5hZ2VyRmFjdG9yeSIsIlNpZGViYXIiLCJQYW5lbEhlYWRlciIsIlBhbmVsVG9nZ2xlIiwiUGFuZWxUaXRsZSIsIkxheWVyTWFuYWdlciIsIkZpbHRlck1hbmFnZXIiLCJJbnRlcmFjdGlvbk1hbmFnZXIiLCJNYXBNYW5hZ2VyIiwidWlTdGF0ZUFjdGlvbnMiLCJ0b2dnbGVTaWRlUGFuZWwiLCJ1aVN0YXRlIiwiYWN0aXZlU2lkZVBhbmVsIiwiZGF0YUlkIiwidmlzU3RhdGVBY3Rpb25zIiwic2hvd0RhdGFzZXRUYWJsZSIsInRvZ2dsZU1vZGFsIiwiREFUQV9UQUJMRV9JRCIsIkFERF9EQVRBX0lEIiwiQUREX01BUF9TVFlMRV9JRCIsImtleSIsIm9wZW5EZWxldGVNb2RhbCIsIkVYUE9SVF9JTUFHRV9JRCIsIkVYUE9SVF9EQVRBX0lEIiwiRVhQT1JUX0NPTkZJR19JRCIsImFwcE5hbWUiLCJ2ZXJzaW9uIiwiZGF0YXNldHMiLCJmaWx0ZXJzIiwibGF5ZXJzIiwibGF5ZXJCbGVuZGluZyIsImxheWVyQ2xhc3NlcyIsImxheWVyT3JkZXIiLCJpbnRlcmFjdGlvbkNvbmZpZyIsIm1hcFN0eWxlQWN0aW9ucyIsImlzT3BlbiIsIkJvb2xlYW4iLCJsYXllck1hbmFnZXJBY3Rpb25zIiwiYWRkTGF5ZXIiLCJsYXllckNvbmZpZ0NoYW5nZSIsImxheWVyVmlzdWFsQ2hhbm5lbENvbmZpZ0NoYW5nZSIsImxheWVyVHlwZUNoYW5nZSIsImxheWVyVmlzQ29uZmlnQ2hhbmdlIiwidXBkYXRlTGF5ZXJCbGVuZGluZyIsInVwZGF0ZUxheWVyT3JkZXIiLCJyZW9yZGVyTGF5ZXIiLCJfc2hvd0RhdGFzZXRUYWJsZSIsInNob3dBZGREYXRhTW9kYWwiLCJfc2hvd0FkZERhdGFNb2RhbCIsInJlbW92ZUxheWVyIiwicmVtb3ZlRGF0YXNldCIsIl9yZW1vdmVEYXRhc2V0IiwiZmlsdGVyTWFuYWdlckFjdGlvbnMiLCJhZGRGaWx0ZXIiLCJyZW1vdmVGaWx0ZXIiLCJzZXRGaWx0ZXIiLCJ0b2dnbGVBbmltYXRpb24iLCJlbmxhcmdlRmlsdGVyIiwiaW50ZXJhY3Rpb25NYW5hZ2VyQWN0aW9ucyIsIm9uQ29uZmlnQ2hhbmdlIiwiaW50ZXJhY3Rpb25Db25maWdDaGFuZ2UiLCJtYXBNYW5hZ2VyQWN0aW9ucyIsImFkZE1hcFN0eWxlVXJsIiwibWFwQ29uZmlnQ2hhbmdlIiwib25TdHlsZUNoYW5nZSIsIm1hcFN0eWxlQ2hhbmdlIiwib25CdWlsZGluZ0NoYW5nZSIsIm1hcEJ1aWxkaW5nQ2hhbmdlIiwic2hvd0FkZE1hcFN0eWxlTW9kYWwiLCJfc2hvd0FkZE1hcFN0eWxlTW9kYWwiLCJ3aWR0aCIsIl9vbk9wZW5PckNsb3NlIiwiX29uRXhwb3J0SW1hZ2UiLCJfb25FeHBvcnREYXRhIiwidmlzaWJsZURyb3Bkb3duIiwic2hvd0V4cG9ydERyb3Bkb3duIiwiaGlkZUV4cG9ydERyb3Bkb3duIiwiX29uRXhwb3J0Q29uZmlnIiwib25TYXZlTWFwIiwiUEFORUxTIiwiZmluZCIsImlkIiwibGFiZWwiLCJtYXBTdHlsZSIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsImFycmF5T2YiLCJhbnkiLCJpc1JlcXVpcmVkIiwib2JqZWN0Iiwic3RyaW5nIiwibnVtYmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7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RE47QUFFRSxVQUFBLFFBQVEsRUFBRSxLQUFLMUUsS0FBTCxDQUFXZ0c7QUFGdkIsV0E5QkosQ0FERixDQXRCRixDQURGLENBREY7QUFpRUQ7QUF4S0g7QUFBQTtBQUFBLElBQStCQyxnQkFBL0Isc0RBQ3FCO0FBQ2pCeEQsSUFBQUEsT0FBTyxFQUFFeUQsbUJBQVVDLE9BQVYsQ0FBa0JELG1CQUFVRSxHQUE1QixFQUFpQ0MsVUFEekI7QUFFakJ2RCxJQUFBQSxpQkFBaUIsRUFBRW9ELG1CQUFVSSxNQUFWLENBQWlCRCxVQUZuQjtBQUdqQjFELElBQUFBLGFBQWEsRUFBRXVELG1CQUFVSyxNQUFWLENBQWlCRixVQUhmO0FBSWpCM0QsSUFBQUEsTUFBTSxFQUFFd0QsbUJBQVVDLE9BQVYsQ0FBa0JELG1CQUFVRSxHQUE1QixFQUFpQ0MsVUFKeEI7QUFLakJ6RCxJQUFBQSxZQUFZLEVBQUVzRCxtQkFBVUksTUFBVixDQUFpQkQsVUFMZDtBQU1qQkwsSUFBQUEsUUFBUSxFQUFFRSxtQkFBVUksTUFBVixDQUFpQkQsVUFOVjtBQU9qQmxCLElBQUFBLEtBQUssRUFBRWUsbUJBQVVNLE1BQVYsQ0FBaUJILFVBUFA7QUFRakI3RCxJQUFBQSxRQUFRLEVBQUUwRCxtQkFBVUksTUFBVixDQUFpQkQsVUFSVjtBQVNqQjFFLElBQUFBLGVBQWUsRUFBRXVFLG1CQUFVSSxNQUFWLENBQWlCRCxVQVRqQjtBQVVqQnRELElBQUFBLGVBQWUsRUFBRW1ELG1CQUFVSSxNQUFWLENBQWlCRDtBQVZqQixHQURyQjtBQTBLRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5pbXBvcnQgU2lkZWJhckZhY3RvcnkgZnJvbSAnLi9zaWRlLXBhbmVsL3NpZGUtYmFyJztcbmltcG9ydCBQYW5lbEhlYWRlckZhY3RvcnkgZnJvbSAnLi9zaWRlLXBhbmVsL3BhbmVsLWhlYWRlcic7XG5pbXBvcnQgTGF5ZXJNYW5hZ2VyRmFjdG9yeSBmcm9tICcuL3NpZGUtcGFuZWwvbGF5ZXItbWFuYWdlcic7XG5pbXBvcnQgRmlsdGVyTWFuYWdlckZhY3RvcnkgZnJvbSAnLi9zaWRlLXBhbmVsL2ZpbHRlci1tYW5hZ2VyJztcbmltcG9ydCBJbnRlcmFjdGlvbk1hbmFnZXJGYWN0b3J5IGZyb20gJy4vc2lkZS1wYW5lbC9pbnRlcmFjdGlvbi1tYW5hZ2VyJztcbmltcG9ydCBNYXBNYW5hZ2VyRmFjdG9yeSBmcm9tICcuL3NpZGUtcGFuZWwvbWFwLW1hbmFnZXInO1xuaW1wb3J0IFBhbmVsVG9nZ2xlRmFjdG9yeSBmcm9tICcuL3NpZGUtcGFuZWwvcGFuZWwtdG9nZ2xlJztcblxuaW1wb3J0IHtcbiAgQUREX0RBVEFfSUQsXG4gIEFERF9NQVBfU1RZTEVfSUQsXG4gIERBVEFfVEFCTEVfSUQsXG4gIEVYUE9SVF9JTUFHRV9JRCxcbiAgRVhQT1JUX0RBVEFfSUQsXG4gIEVYUE9SVF9DT05GSUdfSUQsXG4gIFBBTkVMU1xufSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5cbmNvbnN0IFNpZGVQYW5lbENvbnRlbnQgPSBzdHlsZWQuZGl2YFxuICAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNpZGVQYW5lbFNjcm9sbEJhcn07XG4gIGZsZXgtZ3JvdzogMTtcbiAgcGFkZGluZzogMTZweDtcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xuICBvdmVyZmxvdy14OiBoaWRkZW47XG5gO1xuXG5leHBvcnQgY29uc3QgUGFuZWxUaXRsZUZhY3RvcnkgPSAoKSA9PiBzdHlsZWQuZGl2YFxuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50aXRsZVRleHRDb2xvcn07XG4gIGZvbnQtc2l6ZTogMjBweDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IDEuMjVweDtcbiAgbWFyZ2luLWJvdHRvbTogMTRweDtcbmA7XG5cblNpZGVQYW5lbEZhY3RvcnkuZGVwcyA9IFtcbiAgU2lkZWJhckZhY3RvcnksXG4gIFBhbmVsSGVhZGVyRmFjdG9yeSxcbiAgUGFuZWxUb2dnbGVGYWN0b3J5LFxuICBQYW5lbFRpdGxlRmFjdG9yeSxcbiAgTGF5ZXJNYW5hZ2VyRmFjdG9yeSxcbiAgRmlsdGVyTWFuYWdlckZhY3RvcnksXG4gIEludGVyYWN0aW9uTWFuYWdlckZhY3RvcnksXG4gIE1hcE1hbmFnZXJGYWN0b3J5XG5dO1xuXG4vKipcbiAqXG4gKiBWZXJ0aWNhbCBzaWRlYmFyIGNvbnRhaW5pbmcgaW5wdXQgY29tcG9uZW50cyBmb3IgdGhlIHJlbmRlcmluZyBsYXllcnNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2lkZVBhbmVsRmFjdG9yeShcbiAgU2lkZWJhcixcbiAgUGFuZWxIZWFkZXIsXG4gIFBhbmVsVG9nZ2xlLFxuICBQYW5lbFRpdGxlLFxuICBMYXllck1hbmFnZXIsXG4gIEZpbHRlck1hbmFnZXIsXG4gIEludGVyYWN0aW9uTWFuYWdlcixcbiAgTWFwTWFuYWdlclxuKSB7XG5cbiAgcmV0dXJuIGNsYXNzIFNpZGVQYW5lbCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgIGZpbHRlcnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLmlzUmVxdWlyZWQsXG4gICAgICBpbnRlcmFjdGlvbkNvbmZpZzogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgbGF5ZXJCbGVuZGluZzogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgbGF5ZXJzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KS5pc1JlcXVpcmVkLFxuICAgICAgbGF5ZXJDbGFzc2VzOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICBtYXBTdHlsZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgd2lkdGg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgIGRhdGFzZXRzOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICB2aXNTdGF0ZUFjdGlvbnM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgIG1hcFN0eWxlQWN0aW9uczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXG4gICAgfTtcblxuICAgIC8qIGNvbXBvbmVudCBwcml2YXRlIGZ1bmN0aW9ucyAqL1xuICAgIF9vbk9wZW5PckNsb3NlID0gKCkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy51aVN0YXRlQWN0aW9ucy50b2dnbGVTaWRlUGFuZWwoXG4gICAgICAgIHRoaXMucHJvcHMudWlTdGF0ZS5hY3RpdmVTaWRlUGFuZWwgPyBudWxsIDogJ2xheWVyJ1xuICAgICAgKTtcbiAgICB9O1xuXG4gICAgX3Nob3dEYXRhc2V0VGFibGUgPSBkYXRhSWQgPT4ge1xuICAgICAgLy8gdGhpcyB3aWxsIG9wZW4gZGF0YSB0YWJsZSBtb2RhbFxuICAgICAgdGhpcy5wcm9wcy52aXNTdGF0ZUFjdGlvbnMuc2hvd0RhdGFzZXRUYWJsZShkYXRhSWQpO1xuICAgICAgdGhpcy5wcm9wcy51aVN0YXRlQWN0aW9ucy50b2dnbGVNb2RhbChEQVRBX1RBQkxFX0lEKTtcbiAgICB9O1xuXG4gICAgX3Nob3dBZGREYXRhTW9kYWwgPSAoKSA9PiB7XG4gICAgICB0aGlzLnByb3BzLnVpU3RhdGVBY3Rpb25zLnRvZ2dsZU1vZGFsKEFERF9EQVRBX0lEKTtcbiAgICB9O1xuXG4gICAgX3Nob3dBZGRNYXBTdHlsZU1vZGFsID0gKCkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy51aVN0YXRlQWN0aW9ucy50b2dnbGVNb2RhbChBRERfTUFQX1NUWUxFX0lEKTtcbiAgICB9O1xuXG4gICAgX3JlbW92ZURhdGFzZXQgPSBrZXkgPT4ge1xuICAgICAgLy8gdGhpcyB3aWxsIHNob3cgdGhlIG1vZGFsIGRpYWxvZyB0byBjb25maXJtIGRlbGV0aW9uXG4gICAgICB0aGlzLnByb3BzLnVpU3RhdGVBY3Rpb25zLm9wZW5EZWxldGVNb2RhbChrZXkpO1xuICAgIH07XG5cbiAgICBfb25FeHBvcnRJbWFnZSA9ICgpID0+IHRoaXMucHJvcHMudWlTdGF0ZUFjdGlvbnMudG9nZ2xlTW9kYWwoRVhQT1JUX0lNQUdFX0lEKTtcblxuICAgIF9vbkV4cG9ydERhdGEgPSAoKSA9PiB0aGlzLnByb3BzLnVpU3RhdGVBY3Rpb25zLnRvZ2dsZU1vZGFsKEVYUE9SVF9EQVRBX0lEKTtcblxuICAgIF9vbkV4cG9ydENvbmZpZyA9ICgpID0+IHRoaXMucHJvcHMudWlTdGF0ZUFjdGlvbnMudG9nZ2xlTW9kYWwoRVhQT1JUX0NPTkZJR19JRCk7XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGFwcE5hbWUsXG4gICAgICAgIHZlcnNpb24sXG4gICAgICAgIGRhdGFzZXRzLFxuICAgICAgICBmaWx0ZXJzLFxuICAgICAgICBsYXllcnMsXG4gICAgICAgIGxheWVyQmxlbmRpbmcsXG4gICAgICAgIGxheWVyQ2xhc3NlcyxcbiAgICAgICAgdWlTdGF0ZSxcbiAgICAgICAgbGF5ZXJPcmRlcixcbiAgICAgICAgaW50ZXJhY3Rpb25Db25maWcsXG4gICAgICAgIHZpc1N0YXRlQWN0aW9ucyxcbiAgICAgICAgbWFwU3R5bGVBY3Rpb25zLFxuICAgICAgICB1aVN0YXRlQWN0aW9uc1xuICAgICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgIGNvbnN0IHthY3RpdmVTaWRlUGFuZWx9ID0gdWlTdGF0ZTtcbiAgICAgIGNvbnN0IGlzT3BlbiA9IEJvb2xlYW4oYWN0aXZlU2lkZVBhbmVsKTtcblxuICAgICAgY29uc3QgbGF5ZXJNYW5hZ2VyQWN0aW9ucyA9IHtcbiAgICAgICAgYWRkTGF5ZXI6IHZpc1N0YXRlQWN0aW9ucy5hZGRMYXllcixcbiAgICAgICAgbGF5ZXJDb25maWdDaGFuZ2U6IHZpc1N0YXRlQWN0aW9ucy5sYXllckNvbmZpZ0NoYW5nZSxcbiAgICAgICAgbGF5ZXJWaXN1YWxDaGFubmVsQ29uZmlnQ2hhbmdlOlxuICAgICAgICB2aXNTdGF0ZUFjdGlvbnMubGF5ZXJWaXN1YWxDaGFubmVsQ29uZmlnQ2hhbmdlLFxuICAgICAgICBsYXllclR5cGVDaGFuZ2U6IHZpc1N0YXRlQWN0aW9ucy5sYXllclR5cGVDaGFuZ2UsXG4gICAgICAgIGxheWVyVmlzQ29uZmlnQ2hhbmdlOiB2aXNTdGF0ZUFjdGlvbnMubGF5ZXJWaXNDb25maWdDaGFuZ2UsXG4gICAgICAgIHVwZGF0ZUxheWVyQmxlbmRpbmc6IHZpc1N0YXRlQWN0aW9ucy51cGRhdGVMYXllckJsZW5kaW5nLFxuICAgICAgICB1cGRhdGVMYXllck9yZGVyOiB2aXNTdGF0ZUFjdGlvbnMucmVvcmRlckxheWVyLFxuICAgICAgICBzaG93RGF0YXNldFRhYmxlOiB0aGlzLl9zaG93RGF0YXNldFRhYmxlLFxuICAgICAgICBzaG93QWRkRGF0YU1vZGFsOiB0aGlzLl9zaG93QWRkRGF0YU1vZGFsLFxuICAgICAgICByZW1vdmVMYXllcjogdmlzU3RhdGVBY3Rpb25zLnJlbW92ZUxheWVyLFxuICAgICAgICByZW1vdmVEYXRhc2V0OiB0aGlzLl9yZW1vdmVEYXRhc2V0XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBmaWx0ZXJNYW5hZ2VyQWN0aW9ucyA9IHtcbiAgICAgICAgYWRkRmlsdGVyOiB2aXNTdGF0ZUFjdGlvbnMuYWRkRmlsdGVyLFxuICAgICAgICByZW1vdmVGaWx0ZXI6IHZpc1N0YXRlQWN0aW9ucy5yZW1vdmVGaWx0ZXIsXG4gICAgICAgIHNldEZpbHRlcjogdmlzU3RhdGVBY3Rpb25zLnNldEZpbHRlcixcbiAgICAgICAgc2hvd0RhdGFzZXRUYWJsZTogdGhpcy5fc2hvd0RhdGFzZXRUYWJsZSxcbiAgICAgICAgc2hvd0FkZERhdGFNb2RhbDogdGhpcy5fc2hvd0FkZERhdGFNb2RhbCxcbiAgICAgICAgdG9nZ2xlQW5pbWF0aW9uOiB2aXNTdGF0ZUFjdGlvbnMudG9nZ2xlQW5pbWF0aW9uLFxuICAgICAgICBlbmxhcmdlRmlsdGVyOiB2aXNTdGF0ZUFjdGlvbnMuZW5sYXJnZUZpbHRlclxuICAgICAgfTtcblxuICAgICAgY29uc3QgaW50ZXJhY3Rpb25NYW5hZ2VyQWN0aW9ucyA9IHtcbiAgICAgICAgb25Db25maWdDaGFuZ2U6IHZpc1N0YXRlQWN0aW9ucy5pbnRlcmFjdGlvbkNvbmZpZ0NoYW5nZVxuICAgICAgfTtcblxuICAgICAgY29uc3QgbWFwTWFuYWdlckFjdGlvbnMgPSB7XG4gICAgICAgIGFkZE1hcFN0eWxlVXJsOiBtYXBTdHlsZUFjdGlvbnMuYWRkTWFwU3R5bGVVcmwsXG4gICAgICAgIG9uQ29uZmlnQ2hhbmdlOiBtYXBTdHlsZUFjdGlvbnMubWFwQ29uZmlnQ2hhbmdlLFxuICAgICAgICBvblN0eWxlQ2hhbmdlOiBtYXBTdHlsZUFjdGlvbnMubWFwU3R5bGVDaGFuZ2UsXG4gICAgICAgIG9uQnVpbGRpbmdDaGFuZ2U6IG1hcFN0eWxlQWN0aW9ucy5tYXBCdWlsZGluZ0NoYW5nZSxcbiAgICAgICAgc2hvd0FkZE1hcFN0eWxlTW9kYWw6IHRoaXMuX3Nob3dBZGRNYXBTdHlsZU1vZGFsXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxTaWRlYmFyXG4gICAgICAgICAgICB3aWR0aD17dGhpcy5wcm9wcy53aWR0aH1cbiAgICAgICAgICAgIGlzT3Blbj17aXNPcGVufVxuICAgICAgICAgICAgbWluaWZpZWRXaWR0aD17MH1cbiAgICAgICAgICAgIG9uT3Blbk9yQ2xvc2U9e3RoaXMuX29uT3Blbk9yQ2xvc2V9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFBhbmVsSGVhZGVyXG4gICAgICAgICAgICAgIGFwcE5hbWU9e2FwcE5hbWV9XG4gICAgICAgICAgICAgIHZlcnNpb249e3ZlcnNpb259XG4gICAgICAgICAgICAgIG9uRXhwb3J0SW1hZ2U9e3RoaXMuX29uRXhwb3J0SW1hZ2V9XG4gICAgICAgICAgICAgIG9uRXhwb3J0RGF0YT17dGhpcy5fb25FeHBvcnREYXRhfVxuICAgICAgICAgICAgICB2aXNpYmxlRHJvcGRvd249e3VpU3RhdGUudmlzaWJsZURyb3Bkb3dufVxuICAgICAgICAgICAgICBzaG93RXhwb3J0RHJvcGRvd249e3VpU3RhdGVBY3Rpb25zLnNob3dFeHBvcnREcm9wZG93bn1cbiAgICAgICAgICAgICAgaGlkZUV4cG9ydERyb3Bkb3duPXt1aVN0YXRlQWN0aW9ucy5oaWRlRXhwb3J0RHJvcGRvd259XG4gICAgICAgICAgICAgIG9uRXhwb3J0Q29uZmlnPXt0aGlzLl9vbkV4cG9ydENvbmZpZ31cbiAgICAgICAgICAgICAgb25TYXZlTWFwPXt0aGlzLnByb3BzLm9uU2F2ZU1hcH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8UGFuZWxUb2dnbGVcbiAgICAgICAgICAgICAgcGFuZWxzPXtQQU5FTFN9XG4gICAgICAgICAgICAgIGFjdGl2ZVBhbmVsPXthY3RpdmVTaWRlUGFuZWx9XG4gICAgICAgICAgICAgIHRvZ2dsZVBhbmVsPXt1aVN0YXRlQWN0aW9ucy50b2dnbGVTaWRlUGFuZWx9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPFNpZGVQYW5lbENvbnRlbnQgY2xhc3NOYW1lPVwic2lkZS1wYW5lbF9fY29udGVudFwiPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxQYW5lbFRpdGxlIGNsYXNzTmFtZT1cInNpZGUtcGFuZWxfX2NvbnRlbnRfX3RpdGxlXCI+XG4gICAgICAgICAgICAgICAgICB7KFBBTkVMUy5maW5kKCh7aWR9KSA9PiBpZCA9PT0gYWN0aXZlU2lkZVBhbmVsKSB8fCB7fSkubGFiZWx9XG4gICAgICAgICAgICAgICAgPC9QYW5lbFRpdGxlPlxuICAgICAgICAgICAgICAgIHthY3RpdmVTaWRlUGFuZWwgPT09ICdsYXllcicgJiYgKFxuICAgICAgICAgICAgICAgICAgPExheWVyTWFuYWdlclxuICAgICAgICAgICAgICAgICAgICB7Li4ubGF5ZXJNYW5hZ2VyQWN0aW9uc31cbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldHM9e2RhdGFzZXRzfVxuICAgICAgICAgICAgICAgICAgICBsYXllcnM9e2xheWVyc31cbiAgICAgICAgICAgICAgICAgICAgbGF5ZXJDbGFzc2VzPXtsYXllckNsYXNzZXN9XG4gICAgICAgICAgICAgICAgICAgIGxheWVyT3JkZXI9e2xheWVyT3JkZXJ9XG4gICAgICAgICAgICAgICAgICAgIGxheWVyQmxlbmRpbmc9e2xheWVyQmxlbmRpbmd9XG4gICAgICAgICAgICAgICAgICAgIG9wZW5Nb2RhbD17dWlTdGF0ZUFjdGlvbnMudG9nZ2xlTW9kYWx9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge2FjdGl2ZVNpZGVQYW5lbCA9PT0gJ2ZpbHRlcicgJiYgKFxuICAgICAgICAgICAgICAgICAgPEZpbHRlck1hbmFnZXJcbiAgICAgICAgICAgICAgICAgICAgey4uLmZpbHRlck1hbmFnZXJBY3Rpb25zfVxuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0cz17ZGF0YXNldHN9XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcnM9e2ZpbHRlcnN9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge2FjdGl2ZVNpZGVQYW5lbCA9PT0gJ2ludGVyYWN0aW9uJyAmJiAoXG4gICAgICAgICAgICAgICAgICA8SW50ZXJhY3Rpb25NYW5hZ2VyXG4gICAgICAgICAgICAgICAgICAgIHsuLi5pbnRlcmFjdGlvbk1hbmFnZXJBY3Rpb25zfVxuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0cz17ZGF0YXNldHN9XG4gICAgICAgICAgICAgICAgICAgIGludGVyYWN0aW9uQ29uZmlnPXtpbnRlcmFjdGlvbkNvbmZpZ31cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7YWN0aXZlU2lkZVBhbmVsID09PSAnbWFwJyAmJiAoXG4gICAgICAgICAgICAgICAgICA8TWFwTWFuYWdlclxuICAgICAgICAgICAgICAgICAgICB7Li4ubWFwTWFuYWdlckFjdGlvbnN9XG4gICAgICAgICAgICAgICAgICAgIG1hcFN0eWxlPXt0aGlzLnByb3BzLm1hcFN0eWxlfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvU2lkZVBhbmVsQ29udGVudD5cbiAgICAgICAgICA8L1NpZGViYXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gIH07XG59XG4iXX0=