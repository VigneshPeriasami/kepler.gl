"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ModalContainerFactory;

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

var _styledComponents = require("styled-components");

var _reactDom = require("react-dom");

var _window = require("global/window");

var _modal = _interopRequireDefault(require("./common/modal"));

var _dataProcessor = require("../processors/data-processor");

var _schemas = _interopRequireDefault(require("../schemas"));

var _exportImageUtils = require("../utils/export-image-utils");

var _deleteDataModal = _interopRequireDefault(require("./modals/delete-data-modal"));

var _dataTableModal = _interopRequireDefault(require("./modals/data-table-modal"));

var _loadDataModal = _interopRequireDefault(require("./modals/load-data-modal"));

var _exportImageModal = _interopRequireDefault(require("./modals/export-image-modal"));

var _exportDataModal = _interopRequireDefault(require("./modals/export-data-modal"));

var _exportConfigModal = _interopRequireDefault(require("./modals/export-config-modal"));

var _addMapStyleModal = _interopRequireDefault(require("./modals/add-map-style-modal"));

var _defaultSettings = require("../constants/default-settings");

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  top: 60px;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  width: 40%;\n  padding: 40px 40px 32px 40px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  height: 85%;\n  width: 90%;\n  top: 80px;\n  padding: 32px 0 0 0;\n  max-width: unset;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var DataTableModalStyle = (0, _styledComponents.css)(_templateObject());
var DeleteDatasetModalStyled = (0, _styledComponents.css)(_templateObject2());
var LoadDataModalStyle = (0, _styledComponents.css)(_templateObject3());
ModalContainerFactory.deps = [_deleteDataModal.default, _dataTableModal.default, _loadDataModal.default, _exportImageModal.default, _exportDataModal.default, _exportConfigModal.default, _addMapStyleModal.default];

function ModalContainerFactory(DeleteDatasetModal, DataTableModal, LoadDataModal, ExportImageModal, ExportDataModal, ExportConfigModal, AddMapStyleModal) {
  var ModalWrapper =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2.default)(ModalWrapper, _Component);

    function ModalWrapper() {
      var _getPrototypeOf2;

      var _this;

      (0, _classCallCheck2.default)(this, ModalWrapper);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(ModalWrapper)).call.apply(_getPrototypeOf2, [this].concat(args)));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_closeModal", function () {
        _this.props.uiStateActions.toggleModal(null);
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_deleteDataset", function (key) {
        _this.props.visStateActions.removeDataset(key);

        _this._closeModal();
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_onAddCustomMapStyle", function () {
        _this.props.mapStyleActions.addCustomMapStyle();

        _this._closeModal();
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_onFileUpload", function (blob) {
        _this.props.visStateActions.loadFiles(blob);
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_onExportImage", function () {
        var _this$props$uiState$e = _this.props.uiState.exportImage,
            exporting = _this$props$uiState$e.exporting,
            imageDataUri = _this$props$uiState$e.imageDataUri;

        if (!exporting && imageDataUri) {
          var file = (0, _exportImageUtils.dataURItoBlob)(imageDataUri);
          (0, _exportImageUtils.downloadFile)(file, _defaultSettings.DEFAULT_EXPORT_IMAGE_NAME);
        }

        _this.props.uiStateActions.cleanupExportImage();

        _this._closeModal();
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_onExportData", function () {
        var _this$props = _this.props,
            visState = _this$props.visState,
            uiState = _this$props.uiState;
        var datasets = visState.datasets;
        var _uiState$exportData = uiState.exportData,
            selectedDataset = _uiState$exportData.selectedDataset,
            dataType = _uiState$exportData.dataType,
            filtered = _uiState$exportData.filtered; // get the selected data

        var filename = 'kepler-gl';
        var selectedDatasets = datasets[selectedDataset] ? [datasets[selectedDataset]] : Object.values(datasets);

        if (!selectedDatasets.length) {
          // error: selected dataset not found.
          _this._closeModal();
        }

        selectedDatasets.forEach(function (selectedData) {
          var allData = selectedData.allData,
              data = selectedData.data,
              fields = selectedData.fields,
              label = selectedData.label;
          var exportData = filtered ? data : allData; // start to export data according to selected data type

          switch (dataType) {
            case _defaultSettings.EXPORT_DATA_TYPE.CSV:
              {
                var type = 'text/csv';
                var csv = (0, _dataProcessor.formatCsv)(exportData, fields);

                _this._downloadFile(csv, type, "".concat(filename, "_").concat(label, ".csv"));

                break;
              }
            // TODO: support more file types.

            default:
              break;
          }
        });

        _this._closeModal();
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_onExportConfig", function () {
        var data = _this.props.uiState.exportData.data; // we pass all props because we avoid to create new variables

        var dump = data ? _schemas.default.save(_this.props) : _schemas.default.getConfigToSave(_this.props);

        _this._downloadFile(JSON.stringify(dump, null, 2), 'application/json', 'keplergl.json');

        _this._closeModal();
      });
      return _this;
    }

    (0, _createClass2.default)(ModalWrapper, [{
      key: "_downloadFile",
      value: function _downloadFile(data, type, filename) {
        var fileBlob = new _window.Blob([data], {
          type: type
        });
        (0, _exportImageUtils.downloadFile)(fileBlob, filename);
      }
    }, {
      key: "render",

      /* eslint-disable complexity */
      value: function render() {
        var _this2 = this;

        var _this$props2 = this.props,
            containerW = _this$props2.containerW,
            containerH = _this$props2.containerH,
            mapStyle = _this$props2.mapStyle,
            mapState = _this$props2.mapState,
            uiState = _this$props2.uiState,
            visState = _this$props2.visState,
            rootNode = _this$props2.rootNode,
            visStateActions = _this$props2.visStateActions;
        var currentModal = uiState.currentModal,
            datasetKeyToRemove = uiState.datasetKeyToRemove;
        var datasets = visState.datasets,
            layers = visState.layers,
            editingDataset = visState.editingDataset;
        var template = null;
        var modalProps = {};

        if (currentModal && currentModal.id && currentModal.template) {
          // if currentMdoal template is already provided
          // TODO: need to check whether template is valid
          template = _react.default.createElement(currentModal.template, null);
          modalProps = currentModal.modalProps;
        } else {
          switch (currentModal) {
            case _defaultSettings.DATA_TABLE_ID:
              template = _react.default.createElement(DataTableModal, {
                width: containerW * 0.9,
                height: containerH * 0.85,
                datasets: datasets,
                dataId: editingDataset,
                showDatasetTable: visStateActions.showDatasetTable
              });
              modalProps.cssStyle = DataTableModalStyle;
              break;

            case _defaultSettings.DELETE_DATA_ID:
              // validate options
              if (datasetKeyToRemove && datasets && datasets[datasetKeyToRemove]) {
                template = _react.default.createElement(DeleteDatasetModal, {
                  dataset: datasets[datasetKeyToRemove],
                  layers: layers
                });
                modalProps = {
                  title: 'Delete Dataset',
                  cssStyle: DeleteDatasetModalStyled,
                  footer: true,
                  onConfirm: function onConfirm() {
                    return _this2._deleteDataset(datasetKeyToRemove);
                  },
                  onCancel: this._closeModal,
                  confirmButton: {
                    negative: true,
                    large: true,
                    children: 'Delete'
                  }
                };
              }

              break;
            // in case we add a new case after this one

            case _defaultSettings.ADD_DATA_ID:
              template = _react.default.createElement(LoadDataModal, {
                onClose: this._closeModal,
                onFileUpload: this._onFileUpload
              });
              modalProps = {
                title: 'Add Data To Map',
                cssStyle: LoadDataModalStyle,
                footer: false,
                onConfirm: this._closeModal
              };
              break;

            case _defaultSettings.EXPORT_IMAGE_ID:
              var _uiState$exportImage = uiState.exportImage,
                  ratio = _uiState$exportImage.ratio,
                  legend = _uiState$exportImage.legend,
                  resolution = _uiState$exportImage.resolution,
                  exporting = _uiState$exportImage.exporting,
                  imageDataUri = _uiState$exportImage.imageDataUri;
              template = _react.default.createElement(ExportImageModal, {
                width: containerW,
                height: containerH,
                legend: legend,
                ratio: ratio,
                resolution: resolution,
                exporting: exporting,
                imageDataUri: imageDataUri,
                onChangeRatio: this.props.uiStateActions.setRatio,
                onChangeResolution: this.props.uiStateActions.setResolution,
                onToggleLegend: this.props.uiStateActions.toggleLegend
              });
              modalProps = {
                close: false,
                title: 'Export Image',
                footer: true,
                onCancel: this._closeModal,
                onConfirm: this._onExportImage,
                confirmButton: {
                  large: true,
                  disabled: exporting,
                  children: 'Download'
                }
              };
              break;

            case _defaultSettings.EXPORT_DATA_ID:
              template = _react.default.createElement(ExportDataModal, (0, _extends2.default)({}, uiState.exportData, {
                datasets: datasets,
                onClose: this._closeModal,
                onChangeExportDataType: this.props.uiStateActions.setExportDataType,
                onChangeExportSelectedDataset: this.props.uiStateActions.setExportSelectedDataset,
                onChangeExportFiltered: this.props.uiStateActions.setExportFiltered
              }));
              modalProps = {
                close: false,
                title: 'Export Data',
                footer: true,
                onCancel: this._closeModal,
                onConfirm: this._onExportData,
                confirmButton: {
                  large: true,
                  children: 'Export'
                }
              };
              break;

            case _defaultSettings.EXPORT_CONFIG_ID:
              var keplerGlConfig = _schemas.default.getConfigToSave({
                mapStyle: mapStyle,
                visState: visState,
                mapState: mapState,
                uiState: uiState
              });

              template = _react.default.createElement(ExportConfigModal, {
                config: keplerGlConfig,
                data: uiState.exportData.data,
                onClose: this._closeModal,
                onChangeExportData: this.props.uiStateActions.setExportData
              });
              modalProps = {
                close: false,
                title: 'Export Config',
                footer: true,
                onCancel: this._closeModal,
                onConfirm: this._onExportConfig,
                confirmButton: {
                  large: true,
                  children: 'Export'
                }
              };
              break;

            case _defaultSettings.ADD_MAP_STYLE_ID:
              template = _react.default.createElement(AddMapStyleModal, {
                mapboxApiAccessToken: this.props.mapboxApiAccessToken,
                mapState: this.props.mapState,
                inputStyle: mapStyle.inputStyle,
                inputMapStyle: this.props.mapStyleActions.inputMapStyle,
                loadCustomMapStyle: this.props.mapStyleActions.loadCustomMapStyle
              });
              modalProps = {
                close: false,
                title: 'Add Custom Mapbox Style',
                footer: true,
                onCancel: this._closeModal,
                onConfirm: this._onAddCustomMapStyle,
                confirmButton: {
                  large: true,
                  disabled: !mapStyle.inputStyle.style,
                  children: 'Add Style'
                }
              };
              break;
            // TODO: add this options once we merge dropbox onto kepelr.gl core
            // case SAVE_TO_CLOUD_ID

            default:
              break;
          }
        }

        return this.props.rootNode ? _react.default.createElement(_modal.default, (0, _extends2.default)({}, modalProps, {
          parentSelector: function parentSelector() {
            return (0, _reactDom.findDOMNode)(rootNode);
          },
          isOpen: Boolean(currentModal),
          close: this._closeModal
        }), template) : null;
      }
      /* eslint-enable complexity */

    }]);
    return ModalWrapper;
  }(_react.Component);

  (0, _defineProperty2.default)(ModalWrapper, "propTypes", {
    rootNode: _propTypes.default.object,
    containerW: _propTypes.default.number,
    containerH: _propTypes.default.number,
    mapboxApiAccessToken: _propTypes.default.string.isRequired,
    mapState: _propTypes.default.object.isRequired,
    mapStyle: _propTypes.default.object.isRequired,
    uiState: _propTypes.default.object.isRequired,
    visState: _propTypes.default.object.isRequired,
    visStateActions: _propTypes.default.object.isRequired,
    uiStateActions: _propTypes.default.object.isRequired,
    mapStyleActions: _propTypes.default.object.isRequired
  });
  return ModalWrapper;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL21vZGFsLWNvbnRhaW5lci5qcyJdLCJuYW1lcyI6WyJEYXRhVGFibGVNb2RhbFN0eWxlIiwiY3NzIiwiRGVsZXRlRGF0YXNldE1vZGFsU3R5bGVkIiwiTG9hZERhdGFNb2RhbFN0eWxlIiwiTW9kYWxDb250YWluZXJGYWN0b3J5IiwiZGVwcyIsIkRlbGV0ZURhdGFzZXRNb2RhbEZhY3RvcnkiLCJEYXRhVGFibGVNb2RhbEZhY3RvcnkiLCJMb2FkRGF0YU1vZGFsRmFjdG9yeSIsIkV4cG9ydEltYWdlTW9kYWxGYWN0b3J5IiwiRXhwb3J0RGF0YU1vZGFsRmFjdG9yeSIsIkV4cG9ydENvbmZpZ01vZGFsRmFjdG9yeSIsIkFkZE1hcFN0eWxlTW9kYWxGYWN0b3J5IiwiRGVsZXRlRGF0YXNldE1vZGFsIiwiRGF0YVRhYmxlTW9kYWwiLCJMb2FkRGF0YU1vZGFsIiwiRXhwb3J0SW1hZ2VNb2RhbCIsIkV4cG9ydERhdGFNb2RhbCIsIkV4cG9ydENvbmZpZ01vZGFsIiwiQWRkTWFwU3R5bGVNb2RhbCIsIk1vZGFsV3JhcHBlciIsInByb3BzIiwidWlTdGF0ZUFjdGlvbnMiLCJ0b2dnbGVNb2RhbCIsImtleSIsInZpc1N0YXRlQWN0aW9ucyIsInJlbW92ZURhdGFzZXQiLCJfY2xvc2VNb2RhbCIsIm1hcFN0eWxlQWN0aW9ucyIsImFkZEN1c3RvbU1hcFN0eWxlIiwiYmxvYiIsImxvYWRGaWxlcyIsInVpU3RhdGUiLCJleHBvcnRJbWFnZSIsImV4cG9ydGluZyIsImltYWdlRGF0YVVyaSIsImZpbGUiLCJERUZBVUxUX0VYUE9SVF9JTUFHRV9OQU1FIiwiY2xlYW51cEV4cG9ydEltYWdlIiwidmlzU3RhdGUiLCJkYXRhc2V0cyIsImV4cG9ydERhdGEiLCJzZWxlY3RlZERhdGFzZXQiLCJkYXRhVHlwZSIsImZpbHRlcmVkIiwiZmlsZW5hbWUiLCJzZWxlY3RlZERhdGFzZXRzIiwiT2JqZWN0IiwidmFsdWVzIiwibGVuZ3RoIiwiZm9yRWFjaCIsInNlbGVjdGVkRGF0YSIsImFsbERhdGEiLCJkYXRhIiwiZmllbGRzIiwibGFiZWwiLCJFWFBPUlRfREFUQV9UWVBFIiwiQ1NWIiwidHlwZSIsImNzdiIsIl9kb3dubG9hZEZpbGUiLCJkdW1wIiwiS2VwbGVyR2xTY2hlbWEiLCJzYXZlIiwiZ2V0Q29uZmlnVG9TYXZlIiwiSlNPTiIsInN0cmluZ2lmeSIsImZpbGVCbG9iIiwiQmxvYiIsImNvbnRhaW5lclciLCJjb250YWluZXJIIiwibWFwU3R5bGUiLCJtYXBTdGF0ZSIsInJvb3ROb2RlIiwiY3VycmVudE1vZGFsIiwiZGF0YXNldEtleVRvUmVtb3ZlIiwibGF5ZXJzIiwiZWRpdGluZ0RhdGFzZXQiLCJ0ZW1wbGF0ZSIsIm1vZGFsUHJvcHMiLCJpZCIsIkRBVEFfVEFCTEVfSUQiLCJzaG93RGF0YXNldFRhYmxlIiwiY3NzU3R5bGUiLCJERUxFVEVfREFUQV9JRCIsInRpdGxlIiwiZm9vdGVyIiwib25Db25maXJtIiwiX2RlbGV0ZURhdGFzZXQiLCJvbkNhbmNlbCIsImNvbmZpcm1CdXR0b24iLCJuZWdhdGl2ZSIsImxhcmdlIiwiY2hpbGRyZW4iLCJBRERfREFUQV9JRCIsIl9vbkZpbGVVcGxvYWQiLCJFWFBPUlRfSU1BR0VfSUQiLCJyYXRpbyIsImxlZ2VuZCIsInJlc29sdXRpb24iLCJzZXRSYXRpbyIsInNldFJlc29sdXRpb24iLCJ0b2dnbGVMZWdlbmQiLCJjbG9zZSIsIl9vbkV4cG9ydEltYWdlIiwiZGlzYWJsZWQiLCJFWFBPUlRfREFUQV9JRCIsInNldEV4cG9ydERhdGFUeXBlIiwic2V0RXhwb3J0U2VsZWN0ZWREYXRhc2V0Iiwic2V0RXhwb3J0RmlsdGVyZWQiLCJfb25FeHBvcnREYXRhIiwiRVhQT1JUX0NPTkZJR19JRCIsImtlcGxlckdsQ29uZmlnIiwic2V0RXhwb3J0RGF0YSIsIl9vbkV4cG9ydENvbmZpZyIsIkFERF9NQVBfU1RZTEVfSUQiLCJtYXBib3hBcGlBY2Nlc3NUb2tlbiIsImlucHV0U3R5bGUiLCJpbnB1dE1hcFN0eWxlIiwibG9hZEN1c3RvbU1hcFN0eWxlIiwiX29uQWRkQ3VzdG9tTWFwU3R5bGUiLCJzdHlsZSIsIkJvb2xlYW4iLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJudW1iZXIiLCJzdHJpbmciLCJpc1JlcXVpcmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFZQSxJQUFNQSxtQkFBbUIsT0FBR0MscUJBQUgsb0JBQXpCO0FBUUEsSUFBTUMsd0JBQXdCLE9BQUdELHFCQUFILHFCQUE5QjtBQUtBLElBQU1FLGtCQUFrQixPQUFHRixxQkFBSCxxQkFBeEI7QUFJQUcscUJBQXFCLENBQUNDLElBQXRCLEdBQTZCLENBQzNCQyx3QkFEMkIsRUFFM0JDLHVCQUYyQixFQUczQkMsc0JBSDJCLEVBSTNCQyx5QkFKMkIsRUFLM0JDLHdCQUwyQixFQU0zQkMsMEJBTjJCLEVBTzNCQyx5QkFQMkIsQ0FBN0I7O0FBVWUsU0FBU1IscUJBQVQsQ0FDYlMsa0JBRGEsRUFFYkMsY0FGYSxFQUdiQyxhQUhhLEVBSWJDLGdCQUphLEVBS2JDLGVBTGEsRUFNYkMsaUJBTmEsRUFPYkMsZ0JBUGEsRUFRYjtBQUFBLE1BQ01DLFlBRE47QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxzSUFnQmdCLFlBQU07QUFDbEIsY0FBS0MsS0FBTCxDQUFXQyxjQUFYLENBQTBCQyxXQUExQixDQUFzQyxJQUF0QztBQUNELE9BbEJIO0FBQUEseUlBb0JtQixVQUFBQyxHQUFHLEVBQUk7QUFDdEIsY0FBS0gsS0FBTCxDQUFXSSxlQUFYLENBQTJCQyxhQUEzQixDQUF5Q0YsR0FBekM7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UUFBUSxFQUFFbUQsbUJBQVVDLE1BREg7QUFFakJ4RCxJQUFBQSxVQUFVLEVBQUV1RCxtQkFBVUUsTUFGTDtBQUdqQnhELElBQUFBLFVBQVUsRUFBRXNELG1CQUFVRSxNQUhMO0FBSWpCVixJQUFBQSxvQkFBb0IsRUFBRVEsbUJBQVVHLE1BQVYsQ0FBaUJDLFVBSnRCO0FBS2pCeEQsSUFBQUEsUUFBUSxFQUFFb0QsbUJBQVVDLE1BQVYsQ0FBaUJHLFVBTFY7QUFNakJ6RCxJQUFBQSxRQUFRLEVBQUVxRCxtQkFBVUMsTUFBVixDQUFpQkcsVUFOVjtBQU9qQmhHLElBQUFBLE9BQU8sRUFBRTRGLG1CQUFVQyxNQUFWLENBQWlCRyxVQVBUO0FBUWpCekYsSUFBQUEsUUFBUSxFQUFFcUYsbUJBQVVDLE1BQVYsQ0FBaUJHLFVBUlY7QUFTakJ2RyxJQUFBQSxlQUFlLEVBQUVtRyxtQkFBVUMsTUFBVixDQUFpQkcsVUFUakI7QUFVakIxRyxJQUFBQSxjQUFjLEVBQUVzRyxtQkFBVUMsTUFBVixDQUFpQkcsVUFWaEI7QUFXakJwRyxJQUFBQSxlQUFlLEVBQUVnRyxtQkFBVUMsTUFBVixDQUFpQkc7QUFYakIsR0FGckI7QUE0U0EsU0FBTzVHLFlBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7Y3NzfSBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHtCbG9ifSBmcm9tICdnbG9iYWwvd2luZG93JztcblxuaW1wb3J0IE1vZGFsRGlhbG9nIGZyb20gJy4vY29tbW9uL21vZGFsJztcbmltcG9ydCB7Zm9ybWF0Q3N2fSBmcm9tICdwcm9jZXNzb3JzL2RhdGEtcHJvY2Vzc29yJztcbmltcG9ydCBLZXBsZXJHbFNjaGVtYSBmcm9tICdzY2hlbWFzJztcbmltcG9ydCB7ZG93bmxvYWRGaWxlLCBkYXRhVVJJdG9CbG9ifSBmcm9tICd1dGlscy9leHBvcnQtaW1hZ2UtdXRpbHMnO1xuLy8gbW9kYWxzXG5pbXBvcnQgRGVsZXRlRGF0YXNldE1vZGFsRmFjdG9yeSBmcm9tICcuL21vZGFscy9kZWxldGUtZGF0YS1tb2RhbCc7XG5pbXBvcnQgRGF0YVRhYmxlTW9kYWxGYWN0b3J5IGZyb20gJy4vbW9kYWxzL2RhdGEtdGFibGUtbW9kYWwnO1xuaW1wb3J0IExvYWREYXRhTW9kYWxGYWN0b3J5IGZyb20gJy4vbW9kYWxzL2xvYWQtZGF0YS1tb2RhbCc7XG5pbXBvcnQgRXhwb3J0SW1hZ2VNb2RhbEZhY3RvcnkgZnJvbSAnLi9tb2RhbHMvZXhwb3J0LWltYWdlLW1vZGFsJztcbmltcG9ydCBFeHBvcnREYXRhTW9kYWxGYWN0b3J5IGZyb20gJy4vbW9kYWxzL2V4cG9ydC1kYXRhLW1vZGFsJztcbmltcG9ydCBFeHBvcnRDb25maWdNb2RhbEZhY3RvcnkgZnJvbSAnLi9tb2RhbHMvZXhwb3J0LWNvbmZpZy1tb2RhbCc7XG5pbXBvcnQgQWRkTWFwU3R5bGVNb2RhbEZhY3RvcnkgZnJvbSAnLi9tb2RhbHMvYWRkLW1hcC1zdHlsZS1tb2RhbCc7XG5cbmltcG9ydCB7XG4gIEFERF9EQVRBX0lELFxuICBEQVRBX1RBQkxFX0lELFxuICBERUZBVUxUX0VYUE9SVF9JTUFHRV9OQU1FLFxuICBERUxFVEVfREFUQV9JRCxcbiAgRVhQT1JUX0RBVEFfSUQsXG4gIEVYUE9SVF9EQVRBX1RZUEUsXG4gIEVYUE9SVF9JTUFHRV9JRCxcbiAgRVhQT1JUX0NPTkZJR19JRCxcbiAgQUREX01BUF9TVFlMRV9JRFxufSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5cbmNvbnN0IERhdGFUYWJsZU1vZGFsU3R5bGUgPSBjc3NgXG4gIGhlaWdodDogODUlO1xuICB3aWR0aDogOTAlO1xuICB0b3A6IDgwcHg7XG4gIHBhZGRpbmc6IDMycHggMCAwIDA7XG4gIG1heC13aWR0aDogdW5zZXQ7XG5gO1xuXG5jb25zdCBEZWxldGVEYXRhc2V0TW9kYWxTdHlsZWQgPSBjc3NgXG4gIHdpZHRoOiA0MCU7XG4gIHBhZGRpbmc6IDQwcHggNDBweCAzMnB4IDQwcHg7XG5gO1xuXG5jb25zdCBMb2FkRGF0YU1vZGFsU3R5bGUgPSBjc3NgXG4gIHRvcDogNjBweDtcbmA7XG5cbk1vZGFsQ29udGFpbmVyRmFjdG9yeS5kZXBzID0gW1xuICBEZWxldGVEYXRhc2V0TW9kYWxGYWN0b3J5LFxuICBEYXRhVGFibGVNb2RhbEZhY3RvcnksXG4gIExvYWREYXRhTW9kYWxGYWN0b3J5LFxuICBFeHBvcnRJbWFnZU1vZGFsRmFjdG9yeSxcbiAgRXhwb3J0RGF0YU1vZGFsRmFjdG9yeSxcbiAgRXhwb3J0Q29uZmlnTW9kYWxGYWN0b3J5LFxuICBBZGRNYXBTdHlsZU1vZGFsRmFjdG9yeVxuXTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTW9kYWxDb250YWluZXJGYWN0b3J5KFxuICBEZWxldGVEYXRhc2V0TW9kYWwsXG4gIERhdGFUYWJsZU1vZGFsLFxuICBMb2FkRGF0YU1vZGFsLFxuICBFeHBvcnRJbWFnZU1vZGFsLFxuICBFeHBvcnREYXRhTW9kYWwsXG4gIEV4cG9ydENvbmZpZ01vZGFsLFxuICBBZGRNYXBTdHlsZU1vZGFsXG4pIHtcbiAgY2xhc3MgTW9kYWxXcmFwcGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgcm9vdE5vZGU6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICBjb250YWluZXJXOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgY29udGFpbmVySDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIG1hcGJveEFwaUFjY2Vzc1Rva2VuOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICBtYXBTdGF0ZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgbWFwU3R5bGU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgIHVpU3RhdGU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgIHZpc1N0YXRlOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICB2aXNTdGF0ZUFjdGlvbnM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgIHVpU3RhdGVBY3Rpb25zOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICBtYXBTdHlsZUFjdGlvbnM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxuICAgIH07XG5cbiAgICBfY2xvc2VNb2RhbCA9ICgpID0+IHtcbiAgICAgIHRoaXMucHJvcHMudWlTdGF0ZUFjdGlvbnMudG9nZ2xlTW9kYWwobnVsbCk7XG4gICAgfTtcblxuICAgIF9kZWxldGVEYXRhc2V0ID0ga2V5ID0+IHtcbiAgICAgIHRoaXMucHJvcHMudmlzU3RhdGVBY3Rpb25zLnJlbW92ZURhdGFzZXQoa2V5KTtcbiAgICAgIHRoaXMuX2Nsb3NlTW9kYWwoKTtcbiAgICB9O1xuXG4gICAgX29uQWRkQ3VzdG9tTWFwU3R5bGUgPSAoKSA9PiB7XG4gICAgICB0aGlzLnByb3BzLm1hcFN0eWxlQWN0aW9ucy5hZGRDdXN0b21NYXBTdHlsZSgpO1xuICAgICAgdGhpcy5fY2xvc2VNb2RhbCgpO1xuICAgIH07XG5cbiAgICBfb25GaWxlVXBsb2FkID0gYmxvYiA9PiB7XG4gICAgICB0aGlzLnByb3BzLnZpc1N0YXRlQWN0aW9ucy5sb2FkRmlsZXMoYmxvYik7XG4gICAgfTtcblxuICAgIF9vbkV4cG9ydEltYWdlID0gKCkgPT4ge1xuICAgICAgY29uc3Qge2V4cG9ydGluZywgaW1hZ2VEYXRhVXJpfSA9IHRoaXMucHJvcHMudWlTdGF0ZS5leHBvcnRJbWFnZTtcbiAgICAgIGlmICghZXhwb3J0aW5nICYmIGltYWdlRGF0YVVyaSkge1xuICAgICAgICBjb25zdCBmaWxlID0gZGF0YVVSSXRvQmxvYihpbWFnZURhdGFVcmkpO1xuICAgICAgICBkb3dubG9hZEZpbGUoZmlsZSwgREVGQVVMVF9FWFBPUlRfSU1BR0VfTkFNRSk7XG4gICAgICB9XG4gICAgICB0aGlzLnByb3BzLnVpU3RhdGVBY3Rpb25zLmNsZWFudXBFeHBvcnRJbWFnZSgpO1xuICAgICAgdGhpcy5fY2xvc2VNb2RhbCgpO1xuICAgIH07XG5cbiAgICBfZG93bmxvYWRGaWxlKGRhdGEsIHR5cGUsIGZpbGVuYW1lKSB7XG4gICAgICBjb25zdCBmaWxlQmxvYiA9IG5ldyBCbG9iKFtkYXRhXSwge3R5cGV9KTtcbiAgICAgIGRvd25sb2FkRmlsZShmaWxlQmxvYiwgZmlsZW5hbWUpO1xuICAgIH1cblxuICAgIF9vbkV4cG9ydERhdGEgPSAoKSA9PiB7XG4gICAgICBjb25zdCB7dmlzU3RhdGUsIHVpU3RhdGV9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IHtkYXRhc2V0c30gPSB2aXNTdGF0ZTtcbiAgICAgIGNvbnN0IHtzZWxlY3RlZERhdGFzZXQsIGRhdGFUeXBlLCBmaWx0ZXJlZH0gPSB1aVN0YXRlLmV4cG9ydERhdGE7XG4gICAgICAvLyBnZXQgdGhlIHNlbGVjdGVkIGRhdGFcbiAgICAgIGNvbnN0IGZpbGVuYW1lID0gJ2tlcGxlci1nbCc7XG4gICAgICBjb25zdCBzZWxlY3RlZERhdGFzZXRzID0gZGF0YXNldHNbc2VsZWN0ZWREYXRhc2V0XSA/IFtkYXRhc2V0c1tzZWxlY3RlZERhdGFzZXRdXSA6IE9iamVjdC52YWx1ZXMoZGF0YXNldHMpO1xuICAgICAgaWYgKCFzZWxlY3RlZERhdGFzZXRzLmxlbmd0aCkge1xuICAgICAgICAvLyBlcnJvcjogc2VsZWN0ZWQgZGF0YXNldCBub3QgZm91bmQuXG4gICAgICAgIHRoaXMuX2Nsb3NlTW9kYWwoKTtcbiAgICAgIH1cblxuICAgICAgc2VsZWN0ZWREYXRhc2V0cy5mb3JFYWNoKHNlbGVjdGVkRGF0YSA9PiB7XG4gICAgICAgIGNvbnN0IHthbGxEYXRhLCBkYXRhLCBmaWVsZHMsIGxhYmVsfSA9IHNlbGVjdGVkRGF0YTtcbiAgICAgICAgY29uc3QgZXhwb3J0RGF0YSA9IGZpbHRlcmVkID8gZGF0YSA6IGFsbERhdGE7XG4gICAgICAgIC8vIHN0YXJ0IHRvIGV4cG9ydCBkYXRhIGFjY29yZGluZyB0byBzZWxlY3RlZCBkYXRhIHR5cGVcbiAgICAgICAgc3dpdGNoIChkYXRhVHlwZSkge1xuICAgICAgICAgIGNhc2UgRVhQT1JUX0RBVEFfVFlQRS5DU1Y6IHtcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSAndGV4dC9jc3YnO1xuICAgICAgICAgICAgY29uc3QgY3N2ID0gZm9ybWF0Q3N2KGV4cG9ydERhdGEsIGZpZWxkcyk7XG4gICAgICAgICAgICB0aGlzLl9kb3dubG9hZEZpbGUoY3N2LCB0eXBlLCBgJHtmaWxlbmFtZX1fJHtsYWJlbH0uY3N2YCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gVE9ETzogc3VwcG9ydCBtb3JlIGZpbGUgdHlwZXMuXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9jbG9zZU1vZGFsKCk7XG4gICAgfTtcblxuICAgIF9vbkV4cG9ydENvbmZpZyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHtkYXRhfSA9IHRoaXMucHJvcHMudWlTdGF0ZS5leHBvcnREYXRhO1xuXG4gICAgICAvLyB3ZSBwYXNzIGFsbCBwcm9wcyBiZWNhdXNlIHdlIGF2b2lkIHRvIGNyZWF0ZSBuZXcgdmFyaWFibGVzXG4gICAgICBjb25zdCBkdW1wID0gZGF0YSA/IEtlcGxlckdsU2NoZW1hLnNhdmUodGhpcy5wcm9wcylcbiAgICAgICAgOiBLZXBsZXJHbFNjaGVtYS5nZXRDb25maWdUb1NhdmUodGhpcy5wcm9wcyk7XG5cbiAgICAgIHRoaXMuX2Rvd25sb2FkRmlsZShcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkoZHVtcCwgbnVsbCwgMiksXG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ2tlcGxlcmdsLmpzb24nXG4gICAgICApO1xuXG4gICAgICB0aGlzLl9jbG9zZU1vZGFsKCk7XG4gICAgfTtcblxuICAgIC8qIGVzbGludC1kaXNhYmxlIGNvbXBsZXhpdHkgKi9cbiAgICByZW5kZXIoKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGNvbnRhaW5lclcsXG4gICAgICAgIGNvbnRhaW5lckgsXG4gICAgICAgIG1hcFN0eWxlLFxuICAgICAgICBtYXBTdGF0ZSxcbiAgICAgICAgdWlTdGF0ZSxcbiAgICAgICAgdmlzU3RhdGUsXG4gICAgICAgIHJvb3ROb2RlLFxuICAgICAgICB2aXNTdGF0ZUFjdGlvbnNcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3Qge2N1cnJlbnRNb2RhbCwgZGF0YXNldEtleVRvUmVtb3ZlfSA9IHVpU3RhdGU7XG4gICAgICBjb25zdCB7ZGF0YXNldHMsIGxheWVycywgZWRpdGluZ0RhdGFzZXR9ID0gdmlzU3RhdGU7XG5cbiAgICAgIGxldCB0ZW1wbGF0ZSA9IG51bGw7XG4gICAgICBsZXQgbW9kYWxQcm9wcyA9IHt9O1xuXG4gICAgICBpZiAoY3VycmVudE1vZGFsICYmIGN1cnJlbnRNb2RhbC5pZCAmJlxuICAgICAgICBjdXJyZW50TW9kYWwudGVtcGxhdGUpIHtcbiAgICAgICAgLy8gaWYgY3VycmVudE1kb2FsIHRlbXBsYXRlIGlzIGFscmVhZHkgcHJvdmlkZWRcbiAgICAgICAgLy8gVE9ETzogbmVlZCB0byBjaGVjayB3aGV0aGVyIHRlbXBsYXRlIGlzIHZhbGlkXG4gICAgICAgIHRlbXBsYXRlID0gKDxjdXJyZW50TW9kYWwudGVtcGxhdGUvPik7XG4gICAgICAgIG1vZGFsUHJvcHMgPSBjdXJyZW50TW9kYWwubW9kYWxQcm9wcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXRjaCAoY3VycmVudE1vZGFsKSB7XG4gICAgICAgICAgY2FzZSBEQVRBX1RBQkxFX0lEOlxuICAgICAgICAgICAgdGVtcGxhdGUgPSAoXG4gICAgICAgICAgICAgIDxEYXRhVGFibGVNb2RhbFxuICAgICAgICAgICAgICAgIHdpZHRoPXtjb250YWluZXJXICogMC45fVxuICAgICAgICAgICAgICAgIGhlaWdodD17Y29udGFpbmVySCAqIDAuODV9XG4gICAgICAgICAgICAgICAgZGF0YXNldHM9e2RhdGFzZXRzfVxuICAgICAgICAgICAgICAgIGRhdGFJZD17ZWRpdGluZ0RhdGFzZXR9XG4gICAgICAgICAgICAgICAgc2hvd0RhdGFzZXRUYWJsZT17dmlzU3RhdGVBY3Rpb25zLnNob3dEYXRhc2V0VGFibGV9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbW9kYWxQcm9wcy5jc3NTdHlsZSA9IERhdGFUYWJsZU1vZGFsU3R5bGU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIERFTEVURV9EQVRBX0lEOlxuICAgICAgICAgICAgLy8gdmFsaWRhdGUgb3B0aW9uc1xuICAgICAgICAgICAgaWYgKGRhdGFzZXRLZXlUb1JlbW92ZSAmJiBkYXRhc2V0cyAmJiBkYXRhc2V0c1tkYXRhc2V0S2V5VG9SZW1vdmVdKSB7XG4gICAgICAgICAgICAgIHRlbXBsYXRlID0gKFxuICAgICAgICAgICAgICAgIDxEZWxldGVEYXRhc2V0TW9kYWxcbiAgICAgICAgICAgICAgICAgIGRhdGFzZXQ9e2RhdGFzZXRzW2RhdGFzZXRLZXlUb1JlbW92ZV19XG4gICAgICAgICAgICAgICAgICBsYXllcnM9e2xheWVyc31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgIG1vZGFsUHJvcHMgPSB7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICdEZWxldGUgRGF0YXNldCcsXG4gICAgICAgICAgICAgICAgY3NzU3R5bGU6IERlbGV0ZURhdGFzZXRNb2RhbFN0eWxlZCxcbiAgICAgICAgICAgICAgICBmb290ZXI6IHRydWUsXG4gICAgICAgICAgICAgICAgb25Db25maXJtOiAoKSA9PiB0aGlzLl9kZWxldGVEYXRhc2V0KGRhdGFzZXRLZXlUb1JlbW92ZSksXG4gICAgICAgICAgICAgICAgb25DYW5jZWw6IHRoaXMuX2Nsb3NlTW9kYWwsXG4gICAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbjoge1xuICAgICAgICAgICAgICAgICAgbmVnYXRpdmU6IHRydWUsXG4gICAgICAgICAgICAgICAgICBsYXJnZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiAnRGVsZXRlJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrOyAvLyBpbiBjYXNlIHdlIGFkZCBhIG5ldyBjYXNlIGFmdGVyIHRoaXMgb25lXG4gICAgICAgICAgY2FzZSBBRERfREFUQV9JRDpcbiAgICAgICAgICAgIHRlbXBsYXRlID0gKFxuICAgICAgICAgICAgICA8TG9hZERhdGFNb2RhbFxuICAgICAgICAgICAgICAgIG9uQ2xvc2U9e3RoaXMuX2Nsb3NlTW9kYWx9XG4gICAgICAgICAgICAgICAgb25GaWxlVXBsb2FkPXt0aGlzLl9vbkZpbGVVcGxvYWR9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbW9kYWxQcm9wcyA9IHtcbiAgICAgICAgICAgICAgdGl0bGU6ICdBZGQgRGF0YSBUbyBNYXAnLFxuICAgICAgICAgICAgICBjc3NTdHlsZTogTG9hZERhdGFNb2RhbFN0eWxlLFxuICAgICAgICAgICAgICBmb290ZXI6IGZhbHNlLFxuICAgICAgICAgICAgICBvbkNvbmZpcm06IHRoaXMuX2Nsb3NlTW9kYWxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgRVhQT1JUX0lNQUdFX0lEOlxuICAgICAgICAgICAgY29uc3QgeyByYXRpbywgbGVnZW5kLCByZXNvbHV0aW9uLCBleHBvcnRpbmcsIGltYWdlRGF0YVVyaSB9ID0gdWlTdGF0ZS5leHBvcnRJbWFnZTtcbiAgICAgICAgICAgIHRlbXBsYXRlID0gKFxuICAgICAgICAgICAgICA8RXhwb3J0SW1hZ2VNb2RhbFxuICAgICAgICAgICAgICAgIHdpZHRoPXtjb250YWluZXJXfVxuICAgICAgICAgICAgICAgIGhlaWdodD17Y29udGFpbmVySH1cbiAgICAgICAgICAgICAgICBsZWdlbmQ9e2xlZ2VuZH1cbiAgICAgICAgICAgICAgICByYXRpbz17cmF0aW99XG4gICAgICAgICAgICAgICAgcmVzb2x1dGlvbj17cmVzb2x1dGlvbn1cbiAgICAgICAgICAgICAgICBleHBvcnRpbmc9e2V4cG9ydGluZ31cbiAgICAgICAgICAgICAgICBpbWFnZURhdGFVcmk9e2ltYWdlRGF0YVVyaX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZVJhdGlvPXt0aGlzLnByb3BzLnVpU3RhdGVBY3Rpb25zLnNldFJhdGlvfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlUmVzb2x1dGlvbj17dGhpcy5wcm9wcy51aVN0YXRlQWN0aW9ucy5zZXRSZXNvbHV0aW9ufVxuICAgICAgICAgICAgICAgIG9uVG9nZ2xlTGVnZW5kPXt0aGlzLnByb3BzLnVpU3RhdGVBY3Rpb25zLnRvZ2dsZUxlZ2VuZH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBtb2RhbFByb3BzID0ge1xuICAgICAgICAgICAgICBjbG9zZTogZmFsc2UsXG4gICAgICAgICAgICAgIHRpdGxlOiAnRXhwb3J0IEltYWdlJyxcbiAgICAgICAgICAgICAgZm9vdGVyOiB0cnVlLFxuICAgICAgICAgICAgICBvbkNhbmNlbDogdGhpcy5fY2xvc2VNb2RhbCxcbiAgICAgICAgICAgICAgb25Db25maXJtOiB0aGlzLl9vbkV4cG9ydEltYWdlLFxuICAgICAgICAgICAgICBjb25maXJtQnV0dG9uOiB7XG4gICAgICAgICAgICAgICAgbGFyZ2U6IHRydWUsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGV4cG9ydGluZyxcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogJ0Rvd25sb2FkJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlIEVYUE9SVF9EQVRBX0lEOlxuXG4gICAgICAgICAgICB0ZW1wbGF0ZSA9IChcbiAgICAgICAgICAgICAgPEV4cG9ydERhdGFNb2RhbFxuICAgICAgICAgICAgICAgIHsuLi51aVN0YXRlLmV4cG9ydERhdGF9XG4gICAgICAgICAgICAgICAgZGF0YXNldHM9e2RhdGFzZXRzfVxuICAgICAgICAgICAgICAgIG9uQ2xvc2U9e3RoaXMuX2Nsb3NlTW9kYWx9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2VFeHBvcnREYXRhVHlwZT17dGhpcy5wcm9wcy51aVN0YXRlQWN0aW9ucy5zZXRFeHBvcnREYXRhVHlwZX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZUV4cG9ydFNlbGVjdGVkRGF0YXNldD17dGhpcy5wcm9wcy51aVN0YXRlQWN0aW9ucy5zZXRFeHBvcnRTZWxlY3RlZERhdGFzZXR9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2VFeHBvcnRGaWx0ZXJlZD17dGhpcy5wcm9wcy51aVN0YXRlQWN0aW9ucy5zZXRFeHBvcnRGaWx0ZXJlZH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBtb2RhbFByb3BzID0ge1xuICAgICAgICAgICAgICBjbG9zZTogZmFsc2UsXG4gICAgICAgICAgICAgIHRpdGxlOiAnRXhwb3J0IERhdGEnLFxuICAgICAgICAgICAgICBmb290ZXI6IHRydWUsXG4gICAgICAgICAgICAgIG9uQ2FuY2VsOiB0aGlzLl9jbG9zZU1vZGFsLFxuICAgICAgICAgICAgICBvbkNvbmZpcm06IHRoaXMuX29uRXhwb3J0RGF0YSxcbiAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbjoge1xuICAgICAgICAgICAgICAgIGxhcmdlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiAnRXhwb3J0J1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlIEVYUE9SVF9DT05GSUdfSUQ6XG4gICAgICAgICAgICBjb25zdCBrZXBsZXJHbENvbmZpZyA9IEtlcGxlckdsU2NoZW1hLmdldENvbmZpZ1RvU2F2ZShcbiAgICAgICAgICAgICAgeyBtYXBTdHlsZSwgdmlzU3RhdGUsIG1hcFN0YXRlLCB1aVN0YXRlIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0ZW1wbGF0ZSA9IChcbiAgICAgICAgICAgICAgPEV4cG9ydENvbmZpZ01vZGFsXG4gICAgICAgICAgICAgICAgY29uZmlnPXtrZXBsZXJHbENvbmZpZ31cbiAgICAgICAgICAgICAgICBkYXRhPXt1aVN0YXRlLmV4cG9ydERhdGEuZGF0YX1cbiAgICAgICAgICAgICAgICBvbkNsb3NlPXt0aGlzLl9jbG9zZU1vZGFsfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlRXhwb3J0RGF0YT17dGhpcy5wcm9wcy51aVN0YXRlQWN0aW9ucy5zZXRFeHBvcnREYXRhfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG1vZGFsUHJvcHMgPSB7XG4gICAgICAgICAgICAgIGNsb3NlOiBmYWxzZSxcbiAgICAgICAgICAgICAgdGl0bGU6ICdFeHBvcnQgQ29uZmlnJyxcbiAgICAgICAgICAgICAgZm9vdGVyOiB0cnVlLFxuICAgICAgICAgICAgICBvbkNhbmNlbDogdGhpcy5fY2xvc2VNb2RhbCxcbiAgICAgICAgICAgICAgb25Db25maXJtOiB0aGlzLl9vbkV4cG9ydENvbmZpZyxcbiAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbjoge1xuICAgICAgICAgICAgICAgIGxhcmdlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiAnRXhwb3J0J1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlIEFERF9NQVBfU1RZTEVfSUQ6XG4gICAgICAgICAgICB0ZW1wbGF0ZSA9IChcbiAgICAgICAgICAgICAgPEFkZE1hcFN0eWxlTW9kYWxcbiAgICAgICAgICAgICAgICBtYXBib3hBcGlBY2Nlc3NUb2tlbj17dGhpcy5wcm9wcy5tYXBib3hBcGlBY2Nlc3NUb2tlbn1cbiAgICAgICAgICAgICAgICBtYXBTdGF0ZT17dGhpcy5wcm9wcy5tYXBTdGF0ZX1cbiAgICAgICAgICAgICAgICBpbnB1dFN0eWxlPXttYXBTdHlsZS5pbnB1dFN0eWxlfVxuICAgICAgICAgICAgICAgIGlucHV0TWFwU3R5bGU9e3RoaXMucHJvcHMubWFwU3R5bGVBY3Rpb25zLmlucHV0TWFwU3R5bGV9XG4gICAgICAgICAgICAgICAgbG9hZEN1c3RvbU1hcFN0eWxlPXt0aGlzLnByb3BzLm1hcFN0eWxlQWN0aW9ucy5sb2FkQ3VzdG9tTWFwU3R5bGV9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbW9kYWxQcm9wcyA9IHtcbiAgICAgICAgICAgICAgY2xvc2U6IGZhbHNlLFxuICAgICAgICAgICAgICB0aXRsZTogJ0FkZCBDdXN0b20gTWFwYm94IFN0eWxlJyxcbiAgICAgICAgICAgICAgZm9vdGVyOiB0cnVlLFxuICAgICAgICAgICAgICBvbkNhbmNlbDogdGhpcy5fY2xvc2VNb2RhbCxcbiAgICAgICAgICAgICAgb25Db25maXJtOiB0aGlzLl9vbkFkZEN1c3RvbU1hcFN0eWxlLFxuICAgICAgICAgICAgICBjb25maXJtQnV0dG9uOiB7XG4gICAgICAgICAgICAgICAgbGFyZ2U6IHRydWUsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICFtYXBTdHlsZS5pbnB1dFN0eWxlLnN0eWxlLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiAnQWRkIFN0eWxlJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAvLyBUT0RPOiBhZGQgdGhpcyBvcHRpb25zIG9uY2Ugd2UgbWVyZ2UgZHJvcGJveCBvbnRvIGtlcGVsci5nbCBjb3JlXG4gICAgICAgICAgLy8gY2FzZSBTQVZFX1RPX0NMT1VEX0lEXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnByb3BzLnJvb3ROb2RlID8gKFxuICAgICAgICA8TW9kYWxEaWFsb2dcbiAgICAgICAgICB7Li4ubW9kYWxQcm9wc31cbiAgICAgICAgICBwYXJlbnRTZWxlY3Rvcj17KCkgPT4gZmluZERPTU5vZGUocm9vdE5vZGUpfVxuICAgICAgICAgIGlzT3Blbj17Qm9vbGVhbihjdXJyZW50TW9kYWwpfVxuICAgICAgICAgIGNsb3NlPXt0aGlzLl9jbG9zZU1vZGFsfVxuICAgICAgICA+XG4gICAgICAgICAge3RlbXBsYXRlfVxuICAgICAgICA8L01vZGFsRGlhbG9nPlxuICAgICAgKSA6IG51bGw7XG4gICAgfVxuICAgIC8qIGVzbGludC1lbmFibGUgY29tcGxleGl0eSAqL1xuICB9XG5cbiAgcmV0dXJuIE1vZGFsV3JhcHBlcjtcbn1cbiJdfQ==