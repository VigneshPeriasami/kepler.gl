"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddDataButtonFactory = AddDataButtonFactory;
exports.default = void 0;

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

var _reactAnythingSortable = _interopRequireDefault(require("react-anything-sortable"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reselect = require("reselect");

var _layerPanel = _interopRequireDefault(require("./layer-panel/layer-panel"));

var _sourceDataCatalog = _interopRequireDefault(require("./source-data-catalog"));

var _icons = require("../common/icons");

var _itemSelector = _interopRequireDefault(require("../common/item-selector/item-selector"));

var _styledComponents2 = require("../common/styled-components");

var _defaultSettings = require("../../constants/default-settings");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  .ui-sortable {\n    display: block;\n    position: relative;\n    overflow: visible;\n    user-select: none;\n\n    :before {\n      content: ' ';\n      display: table;\n    }\n\n    :after {\n      content: ' ';\n      display: table;\n    }\n  }\n\n  .ui-sortable-item.ui-sortable-dragging {\n    position: absolute;\n    z-index: 1688;\n    cursor: move;\n  }\n\n  .ui-sortable-item.ui-sortable-dragging:hover {\n    cursor: move;\n    opacity: 0.5;\n  }\n\n  .ui-sortable-placeholder {\n    display: none;\n  }\n\n  .ui-sortable-placeholder.visible {\n    display: block;\n    opacity: 0;\n    z-index: -1;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var StyledSortable = _styledComponents.default.div(_templateObject());

var LayerBlendingSelector = function LayerBlendingSelector(_ref) {
  var layerBlending = _ref.layerBlending,
      updateLayerBlending = _ref.updateLayerBlending;
  return _react.default.createElement(_styledComponents2.SidePanelSection, null, _react.default.createElement(_styledComponents2.PanelLabel, null, "Layer Blending"), _react.default.createElement(_itemSelector.default, {
    selectedItems: layerBlending,
    options: Object.keys(_defaultSettings.LAYER_BLENDINGS),
    multiSelect: false,
    searchable: false,
    onChange: updateLayerBlending
  }));
};

function AddDataButtonFactory() {
  var AddDataButton = function AddDataButton(_ref2) {
    var onClick = _ref2.onClick,
        isInactive = _ref2.isInactive;
    return _react.default.createElement(_styledComponents2.Button, {
      onClick: onClick,
      isInactive: !isInactive,
      width: "105px",
      secondary: true
    }, _react.default.createElement(_icons.Add, {
      height: "12px"
    }), "Add Data");
  };

  return AddDataButton;
}

LayerManagerFactory.deps = [AddDataButtonFactory, _layerPanel.default, _sourceDataCatalog.default];

function LayerManagerFactory(AddDataButton, LayerPanel, SourceDataCatalog) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2.default)(LayerManager, _Component);

    function LayerManager() {
      var _getPrototypeOf2;

      var _this;

      (0, _classCallCheck2.default)(this, LayerManager);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(LayerManager)).call.apply(_getPrototypeOf2, [this].concat(args)));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "layerClassSelector", function (props) {
        return props.layerClasses;
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "layerTypeOptionsSelector", (0, _reselect.createSelector)(_this.layerClassSelector, function (layerClasses) {
        return Object.keys(layerClasses).map(function (key) {
          var layer = new layerClasses[key]();
          return {
            id: key,
            label: layer.name,
            icon: layer.layerIcon
          };
        });
      }));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_addEmptyNewLayer", function () {
        _this.props.addLayer();
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_handleSort", function (order) {
        _this.props.updateLayerOrder(order);
      });
      return _this;
    }

    (0, _createClass2.default)(LayerManager, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            layers = _this$props.layers,
            datasets = _this$props.datasets,
            layerOrder = _this$props.layerOrder,
            openModal = _this$props.openModal;
        var defaultDataset = Object.keys(datasets)[0];
        var layerTypeOptions = this.layerTypeOptionsSelector(this.props);
        var layerActions = {
          layerConfigChange: this.props.layerConfigChange,
          layerVisualChannelConfigChange: this.props.layerVisualChannelConfigChange,
          layerTypeChange: this.props.layerTypeChange,
          layerVisConfigChange: this.props.layerVisConfigChange,
          removeLayer: this.props.removeLayer
        };
        var panelProps = {
          datasets: datasets,
          openModal: openModal,
          layerTypeOptions: layerTypeOptions
        };
        return _react.default.createElement(StyledSortable, {
          className: "layer-manager"
        }, _react.default.createElement(SourceDataCatalog, {
          datasets: datasets,
          showDatasetTable: this.props.showDatasetTable,
          removeDataset: this.props.removeDataset,
          showDeleteDataset: true
        }), _react.default.createElement(AddDataButton, {
          onClick: this.props.showAddDataModal,
          isInactive: !defaultDataset
        }), _react.default.createElement(_styledComponents2.SidePanelDivider, null), _react.default.createElement(_styledComponents2.SidePanelSection, null, _react.default.createElement(_reactAnythingSortable.default, {
          onSort: this._handleSort,
          direction: "vertical",
          sortHandle: "sort--handle",
          dynamic: true
        }, layerOrder.map(function (idx) {
          return _react.default.createElement(LayerPanel, (0, _extends2.default)({}, panelProps, layerActions, {
            sortData: idx,
            key: layers[idx].id,
            idx: idx,
            layer: layers[idx]
          }));
        }))), _react.default.createElement(_styledComponents2.SidePanelSection, null, defaultDataset ? _react.default.createElement(_styledComponents2.Button, {
          onClick: this._addEmptyNewLayer,
          width: "105px"
        }, _react.default.createElement(_icons.Add, {
          height: "12px"
        }), "Add Layer") : null), _react.default.createElement(LayerBlendingSelector, {
          layerBlending: this.props.layerBlending,
          updateLayerBlending: this.props.updateLayerBlending
        }));
      }
    }]);
    return LayerManager;
  }(_react.Component), (0, _defineProperty2.default)(_class, "propTypes", {
    addLayer: _propTypes.default.func.isRequired,
    datasets: _propTypes.default.object.isRequired,
    layerBlending: _propTypes.default.string.isRequired,
    layerClasses: _propTypes.default.object.isRequired,
    layers: _propTypes.default.arrayOf(_propTypes.default.any).isRequired,
    layerConfigChange: _propTypes.default.func.isRequired,
    layerVisualChannelConfigChange: _propTypes.default.func.isRequired,
    layerTypeChange: _propTypes.default.func.isRequired,
    layerVisConfigChange: _propTypes.default.func.isRequired,
    openModal: _propTypes.default.func.isRequired,
    removeLayer: _propTypes.default.func.isRequired,
    removeDataset: _propTypes.default.func.isRequired,
    showDatasetTable: _propTypes.default.func.isRequired,
    updateLayerBlending: _propTypes.default.func.isRequired,
    updateLayerOrder: _propTypes.default.func.isRequired
  }), _temp;
}

var _default = LayerManagerFactory;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItbWFuYWdlci5qcyJdLCJuYW1lcyI6WyJTdHlsZWRTb3J0YWJsZSIsInN0eWxlZCIsImRpdiIsIkxheWVyQmxlbmRpbmdTZWxlY3RvciIsImxheWVyQmxlbmRpbmciLCJ1cGRhdGVMYXllckJsZW5kaW5nIiwiT2JqZWN0Iiwia2V5cyIsIkxBWUVSX0JMRU5ESU5HUyIsIkFkZERhdGFCdXR0b25GYWN0b3J5IiwiQWRkRGF0YUJ1dHRvbiIsIm9uQ2xpY2siLCJpc0luYWN0aXZlIiwiTGF5ZXJNYW5hZ2VyRmFjdG9yeSIsImRlcHMiLCJMYXllclBhbmVsRmFjdG9yeSIsIlNvdXJjZURhdGFDYXRhbG9nRmFjdG9yeSIsIkxheWVyUGFuZWwiLCJTb3VyY2VEYXRhQ2F0YWxvZyIsInByb3BzIiwibGF5ZXJDbGFzc2VzIiwibGF5ZXJDbGFzc1NlbGVjdG9yIiwibWFwIiwia2V5IiwibGF5ZXIiLCJpZCIsImxhYmVsIiwibmFtZSIsImljb24iLCJsYXllckljb24iLCJhZGRMYXllciIsIm9yZGVyIiwidXBkYXRlTGF5ZXJPcmRlciIsImxheWVycyIsImRhdGFzZXRzIiwibGF5ZXJPcmRlciIsIm9wZW5Nb2RhbCIsImRlZmF1bHREYXRhc2V0IiwibGF5ZXJUeXBlT3B0aW9ucyIsImxheWVyVHlwZU9wdGlvbnNTZWxlY3RvciIsImxheWVyQWN0aW9ucyIsImxheWVyQ29uZmlnQ2hhbmdlIiwibGF5ZXJWaXN1YWxDaGFubmVsQ29uZmlnQ2hhbmdlIiwibGF5ZXJUeXBlQ2hhbmdlIiwibGF5ZXJWaXNDb25maWdDaGFuZ2UiLCJyZW1vdmVMYXllciIsInBhbmVsUHJvcHMiLCJzaG93RGF0YXNldFRhYmxlIiwicmVtb3ZlRGF0YXNldCIsInNob3dBZGREYXRhTW9kYWwiLCJfaGFuZGxlU29ydCIsImlkeCIsIl9hZGRFbXB0eU5ld0xheWVyIiwiQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwiZnVuYyIsImlz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LEVBQUVxQixtQkFBVUssT0FBVixDQUFrQkwsbUJBQVVNLEdBQTVCLEVBQWlDSixVQUx4QjtBQU1qQmYsSUFBQUEsaUJBQWlCLEVBQUVhLG1CQUFVQyxJQUFWLENBQWVDLFVBTmpCO0FBT2pCZCxJQUFBQSw4QkFBOEIsRUFBRVksbUJBQVVDLElBQVYsQ0FBZUMsVUFQOUI7QUFRakJiLElBQUFBLGVBQWUsRUFBRVcsbUJBQVVDLElBQVYsQ0FBZUMsVUFSZjtBQVNqQlosSUFBQUEsb0JBQW9CLEVBQUVVLG1CQUFVQyxJQUFWLENBQWVDLFVBVHBCO0FBVWpCcEIsSUFBQUEsU0FBUyxFQUFFa0IsbUJBQVVDLElBQVYsQ0FBZUMsVUFWVDtBQVdqQlgsSUFBQUEsV0FBVyxFQUFFUyxtQkFBVUMsSUFBVixDQUFlQyxVQVhYO0FBWWpCUixJQUFBQSxhQUFhLEVBQUVNLG1CQUFVQyxJQUFWLENBQWVDLFVBWmI7QUFhakJULElBQUFBLGdCQUFnQixFQUFFTyxtQkFBVUMsSUFBVixDQUFlQyxVQWJoQjtBQWNqQm5ELElBQUFBLG1CQUFtQixFQUFFaUQsbUJBQVVDLElBQVYsQ0FBZUMsVUFkbkI7QUFlakJ4QixJQUFBQSxnQkFBZ0IsRUFBRXNCLG1CQUFVQyxJQUFWLENBQWVDO0FBZmhCLEdBRHJCO0FBcUdEOztlQUVjM0MsbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgU29ydGFibGUgZnJvbSAncmVhY3QtYW55dGhpbmctc29ydGFibGUnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQge2NyZWF0ZVNlbGVjdG9yfSBmcm9tICdyZXNlbGVjdCc7XG5cbmltcG9ydCBMYXllclBhbmVsRmFjdG9yeSBmcm9tICcuL2xheWVyLXBhbmVsL2xheWVyLXBhbmVsJztcbmltcG9ydCBTb3VyY2VEYXRhQ2F0YWxvZ0ZhY3RvcnkgZnJvbSAnLi9zb3VyY2UtZGF0YS1jYXRhbG9nJztcbmltcG9ydCB7QWRkfSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9pY29ucyc7XG5pbXBvcnQgSXRlbVNlbGVjdG9yIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2l0ZW0tc2VsZWN0b3IvaXRlbS1zZWxlY3Rvcic7XG5pbXBvcnQge1xuICBQYW5lbExhYmVsLFxuICBTaWRlUGFuZWxEaXZpZGVyLFxuICBTaWRlUGFuZWxTZWN0aW9uLFxuICBCdXR0b25cbn0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5pbXBvcnQge0xBWUVSX0JMRU5ESU5HU30gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuXG5jb25zdCBTdHlsZWRTb3J0YWJsZSA9IHN0eWxlZC5kaXZgXG4gIC51aS1zb3J0YWJsZSB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIG92ZXJmbG93OiB2aXNpYmxlO1xuICAgIHVzZXItc2VsZWN0OiBub25lO1xuXG4gICAgOmJlZm9yZSB7XG4gICAgICBjb250ZW50OiAnICc7XG4gICAgICBkaXNwbGF5OiB0YWJsZTtcbiAgICB9XG5cbiAgICA6YWZ0ZXIge1xuICAgICAgY29udGVudDogJyAnO1xuICAgICAgZGlzcGxheTogdGFibGU7XG4gICAgfVxuICB9XG5cbiAgLnVpLXNvcnRhYmxlLWl0ZW0udWktc29ydGFibGUtZHJhZ2dpbmcge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB6LWluZGV4OiAxNjg4O1xuICAgIGN1cnNvcjogbW92ZTtcbiAgfVxuXG4gIC51aS1zb3J0YWJsZS1pdGVtLnVpLXNvcnRhYmxlLWRyYWdnaW5nOmhvdmVyIHtcbiAgICBjdXJzb3I6IG1vdmU7XG4gICAgb3BhY2l0eTogMC41O1xuICB9XG5cbiAgLnVpLXNvcnRhYmxlLXBsYWNlaG9sZGVyIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG5cbiAgLnVpLXNvcnRhYmxlLXBsYWNlaG9sZGVyLnZpc2libGUge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIG9wYWNpdHk6IDA7XG4gICAgei1pbmRleDogLTE7XG4gIH1cbmA7XG5cbmNvbnN0IExheWVyQmxlbmRpbmdTZWxlY3RvciA9ICh7bGF5ZXJCbGVuZGluZywgdXBkYXRlTGF5ZXJCbGVuZGluZ30pID0+IChcbiAgPFNpZGVQYW5lbFNlY3Rpb24+XG4gICAgPFBhbmVsTGFiZWw+TGF5ZXIgQmxlbmRpbmc8L1BhbmVsTGFiZWw+XG4gICAgPEl0ZW1TZWxlY3RvclxuICAgICAgc2VsZWN0ZWRJdGVtcz17bGF5ZXJCbGVuZGluZ31cbiAgICAgIG9wdGlvbnM9e09iamVjdC5rZXlzKExBWUVSX0JMRU5ESU5HUyl9XG4gICAgICBtdWx0aVNlbGVjdD17ZmFsc2V9XG4gICAgICBzZWFyY2hhYmxlPXtmYWxzZX1cbiAgICAgIG9uQ2hhbmdlPXt1cGRhdGVMYXllckJsZW5kaW5nfVxuICAgIC8+XG4gIDwvU2lkZVBhbmVsU2VjdGlvbj5cbik7XG5cbmV4cG9ydCBmdW5jdGlvbiBBZGREYXRhQnV0dG9uRmFjdG9yeSgpIHtcbiAgY29uc3QgQWRkRGF0YUJ1dHRvbiA9ICh7b25DbGljaywgaXNJbmFjdGl2ZX0pID0+IChcbiAgICA8QnV0dG9uXG4gICAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICAgICAgaXNJbmFjdGl2ZT17IWlzSW5hY3RpdmV9XG4gICAgICB3aWR0aD1cIjEwNXB4XCJcbiAgICAgIHNlY29uZGFyeVxuICAgID5cbiAgICAgIDxBZGQgaGVpZ2h0PVwiMTJweFwiIC8+QWRkIERhdGFcbiAgICA8L0J1dHRvbj5cbiAgKTtcblxuICByZXR1cm4gQWRkRGF0YUJ1dHRvbjtcbn1cblxuTGF5ZXJNYW5hZ2VyRmFjdG9yeS5kZXBzID0gW1xuICBBZGREYXRhQnV0dG9uRmFjdG9yeSxcbiAgTGF5ZXJQYW5lbEZhY3RvcnksXG4gIFNvdXJjZURhdGFDYXRhbG9nRmFjdG9yeVxuXTtcblxuZnVuY3Rpb24gTGF5ZXJNYW5hZ2VyRmFjdG9yeShBZGREYXRhQnV0dG9uLCBMYXllclBhbmVsLCBTb3VyY2VEYXRhQ2F0YWxvZykge1xuICByZXR1cm4gY2xhc3MgTGF5ZXJNYW5hZ2VyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgYWRkTGF5ZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICBkYXRhc2V0czogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgbGF5ZXJCbGVuZGluZzogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgbGF5ZXJDbGFzc2VzOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICBsYXllcnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLmlzUmVxdWlyZWQsXG4gICAgICBsYXllckNvbmZpZ0NoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIGxheWVyVmlzdWFsQ2hhbm5lbENvbmZpZ0NoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIGxheWVyVHlwZUNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIGxheWVyVmlzQ29uZmlnQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgb3Blbk1vZGFsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgcmVtb3ZlTGF5ZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICByZW1vdmVEYXRhc2V0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgc2hvd0RhdGFzZXRUYWJsZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIHVwZGF0ZUxheWVyQmxlbmRpbmc6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICB1cGRhdGVMYXllck9yZGVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG4gICAgfTtcblxuICAgIGxheWVyQ2xhc3NTZWxlY3RvciA9IHByb3BzID0+IHByb3BzLmxheWVyQ2xhc3NlcztcbiAgICBsYXllclR5cGVPcHRpb25zU2VsZWN0b3IgPSBjcmVhdGVTZWxlY3RvcihcbiAgICAgIHRoaXMubGF5ZXJDbGFzc1NlbGVjdG9yLFxuICAgICAgbGF5ZXJDbGFzc2VzID0+IE9iamVjdC5rZXlzKGxheWVyQ2xhc3NlcykubWFwKGtleSA9PiB7XG4gICAgICAgIGNvbnN0IGxheWVyID0gbmV3IGxheWVyQ2xhc3Nlc1trZXldKCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaWQ6IGtleSxcbiAgICAgICAgICBsYWJlbDogbGF5ZXIubmFtZSxcbiAgICAgICAgICBpY29uOiBsYXllci5sYXllckljb25cbiAgICAgICAgfTtcbiAgICB9KSk7XG5cbiAgICBfYWRkRW1wdHlOZXdMYXllciA9ICgpID0+IHtcbiAgICAgIHRoaXMucHJvcHMuYWRkTGF5ZXIoKTtcbiAgICB9O1xuXG4gICAgX2hhbmRsZVNvcnQgPSBvcmRlciA9PiB7XG4gICAgICB0aGlzLnByb3BzLnVwZGF0ZUxheWVyT3JkZXIob3JkZXIpO1xuICAgIH07XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICBjb25zdCB7bGF5ZXJzLCBkYXRhc2V0cywgbGF5ZXJPcmRlciwgb3Blbk1vZGFsfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBkZWZhdWx0RGF0YXNldCA9IE9iamVjdC5rZXlzKGRhdGFzZXRzKVswXTtcbiAgICAgIGNvbnN0IGxheWVyVHlwZU9wdGlvbnMgPSB0aGlzLmxheWVyVHlwZU9wdGlvbnNTZWxlY3Rvcih0aGlzLnByb3BzKTtcblxuICAgICAgY29uc3QgbGF5ZXJBY3Rpb25zID0ge1xuICAgICAgICBsYXllckNvbmZpZ0NoYW5nZTogdGhpcy5wcm9wcy5sYXllckNvbmZpZ0NoYW5nZSxcbiAgICAgICAgbGF5ZXJWaXN1YWxDaGFubmVsQ29uZmlnQ2hhbmdlOiB0aGlzLnByb3BzLmxheWVyVmlzdWFsQ2hhbm5lbENvbmZpZ0NoYW5nZSxcbiAgICAgICAgbGF5ZXJUeXBlQ2hhbmdlOiB0aGlzLnByb3BzLmxheWVyVHlwZUNoYW5nZSxcbiAgICAgICAgbGF5ZXJWaXNDb25maWdDaGFuZ2U6IHRoaXMucHJvcHMubGF5ZXJWaXNDb25maWdDaGFuZ2UsXG4gICAgICAgIHJlbW92ZUxheWVyOiB0aGlzLnByb3BzLnJlbW92ZUxheWVyXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBwYW5lbFByb3BzID0ge2RhdGFzZXRzLCBvcGVuTW9kYWwsIGxheWVyVHlwZU9wdGlvbnN9O1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8U3R5bGVkU29ydGFibGUgY2xhc3NOYW1lPVwibGF5ZXItbWFuYWdlclwiPlxuICAgICAgICAgIDxTb3VyY2VEYXRhQ2F0YWxvZ1xuICAgICAgICAgICAgZGF0YXNldHM9e2RhdGFzZXRzfVxuICAgICAgICAgICAgc2hvd0RhdGFzZXRUYWJsZT17dGhpcy5wcm9wcy5zaG93RGF0YXNldFRhYmxlfVxuICAgICAgICAgICAgcmVtb3ZlRGF0YXNldD17dGhpcy5wcm9wcy5yZW1vdmVEYXRhc2V0fVxuICAgICAgICAgICAgc2hvd0RlbGV0ZURhdGFzZXRcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxBZGREYXRhQnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLnNob3dBZGREYXRhTW9kYWx9XG4gICAgICAgICAgICBpc0luYWN0aXZlPXshZGVmYXVsdERhdGFzZXR9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8U2lkZVBhbmVsRGl2aWRlciAvPlxuICAgICAgICAgIDxTaWRlUGFuZWxTZWN0aW9uPlxuICAgICAgICAgICAgPFNvcnRhYmxlXG4gICAgICAgICAgICAgIG9uU29ydD17dGhpcy5faGFuZGxlU29ydH1cbiAgICAgICAgICAgICAgZGlyZWN0aW9uPVwidmVydGljYWxcIlxuICAgICAgICAgICAgICBzb3J0SGFuZGxlPVwic29ydC0taGFuZGxlXCJcbiAgICAgICAgICAgICAgZHluYW1pY1xuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7bGF5ZXJPcmRlci5tYXAoaWR4ID0+IChcbiAgICAgICAgICAgICAgICA8TGF5ZXJQYW5lbFxuICAgICAgICAgICAgICAgICAgey4uLnBhbmVsUHJvcHN9XG4gICAgICAgICAgICAgICAgICB7Li4ubGF5ZXJBY3Rpb25zfVxuICAgICAgICAgICAgICAgICAgc29ydERhdGE9e2lkeH1cbiAgICAgICAgICAgICAgICAgIGtleT17bGF5ZXJzW2lkeF0uaWR9XG4gICAgICAgICAgICAgICAgICBpZHg9e2lkeH1cbiAgICAgICAgICAgICAgICAgIGxheWVyPXtsYXllcnNbaWR4XX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvU29ydGFibGU+XG4gICAgICAgICAgPC9TaWRlUGFuZWxTZWN0aW9uPlxuICAgICAgICAgIDxTaWRlUGFuZWxTZWN0aW9uPlxuICAgICAgICAgICAge2RlZmF1bHREYXRhc2V0ID8gKFxuICAgICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMuX2FkZEVtcHR5TmV3TGF5ZXJ9IHdpZHRoPVwiMTA1cHhcIj5cbiAgICAgICAgICAgICAgICA8QWRkIGhlaWdodD1cIjEycHhcIiAvPkFkZCBMYXllclxuICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgIDwvU2lkZVBhbmVsU2VjdGlvbj5cbiAgICAgICAgICA8TGF5ZXJCbGVuZGluZ1NlbGVjdG9yXG4gICAgICAgICAgICBsYXllckJsZW5kaW5nPXt0aGlzLnByb3BzLmxheWVyQmxlbmRpbmd9XG4gICAgICAgICAgICB1cGRhdGVMYXllckJsZW5kaW5nPXt0aGlzLnByb3BzLnVwZGF0ZUxheWVyQmxlbmRpbmd9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9TdHlsZWRTb3J0YWJsZT5cbiAgICAgICk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExheWVyTWFuYWdlckZhY3Rvcnk7XG4iXX0=