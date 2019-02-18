"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeNotificationUpdater = exports.addNotificationUpdater = exports.setExportDataUpdater = exports.setExportFilteredUpdater = exports.setExportDataTypeUpdater = exports.setExportSelectedDatasetUpdater = exports.cleanupExportImage = exports.setExportImageDataUri = exports.startExportingImage = exports.setResolutionUpdater = exports.setRatioUpdater = exports.toggleLegendUpdater = exports.openDeleteModalUpdater = exports.toggleMapControlUpdater = exports.hideExportDropdownUpdater = exports.showExportDropdownUpdater = exports.toggleModalUpdater = exports.toggleSidePanelUpdater = exports.INITIAL_UI_STATE = exports.DEFAULT_NOTIFICATIONS = exports.DEFAULT_EXPORT_DATA = exports.DEFAULT_EXPORT_IMAGE = exports.DEFAULT_MAP_CONTROLS = exports.DEFAULT_MODAL = exports.DEFAULT_ACTIVE_SIDE_PANEL = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _defaultSettings = require("../constants/default-settings");

var _notificationsUtils = require("../utils/notifications-utils");

// Copyright (c) 2019 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
var DEFAULT_ACTIVE_SIDE_PANEL = 'layer';
exports.DEFAULT_ACTIVE_SIDE_PANEL = DEFAULT_ACTIVE_SIDE_PANEL;
var DEFAULT_MODAL = _defaultSettings.ADD_DATA_ID;
/**
 * A list of map control visibilities and activeness.
 * @constant
 * @type {Object}
 * @property {Object} visibleLayers - Default: `{show: true, active: false}`
 * @property {Object} mapLegend - Default: `{show: true, active: false}`
 * @property {Object} toggle3d - Default: `{show: true}`
 * @property {Object} splitMap - Default: `{show: true}`
 * @public
 */

exports.DEFAULT_MODAL = DEFAULT_MODAL;
var DEFAULT_MAP_CONTROLS = {
  visibleLayers: {
    show: true,
    active: false
  },
  mapLegend: {
    show: true,
    active: false
  },
  toggle3d: {
    show: true
  },
  splitMap: {
    show: true
  }
};
/**
 * Default image export config
 * @constant
 * @type {Object}
 * @property {string} ratio - Default: 'SCREEN',
 * @property {string} resolution - Default: 'ONE_X',
 * @property {boolean} legend - Default: false,
 * @property {string} imageDataUri - Default: '',
 * @property {boolean} exporting - Default: false
 * @public
 */

exports.DEFAULT_MAP_CONTROLS = DEFAULT_MAP_CONTROLS;
var DEFAULT_EXPORT_IMAGE = {
  // user options
  ratio: _defaultSettings.RATIOS.SCREEN,
  resolution: _defaultSettings.RESOLUTIONS.ONE_X,
  legend: false,
  // exporting state
  imageDataUri: '',
  exporting: false
};
/**
 * @constant
 * @type {Object}
 * @property {string} selectedDataset - Default: '',
 * @property {string} dataType - Default: 'csv',
 * @property {boolean} filtered - Default: true,
 * @property {boolean} config - deprecated
 * @property {boolean} data - used in modal config expor. Default: falset
 * @public
 */

exports.DEFAULT_EXPORT_IMAGE = DEFAULT_EXPORT_IMAGE;
var DEFAULT_EXPORT_DATA = {
  selectedDataset: '',
  dataType: _defaultSettings.EXPORT_DATA_TYPE.CSV,
  filtered: true,
  config: false,
  // no longer used, since we removed the option to export config from modal data export
  data: false // this is used in modal config export

};
exports.DEFAULT_EXPORT_DATA = DEFAULT_EXPORT_DATA;
var DEFAULT_NOTIFICATIONS = [];
/**
 * Default initial `uiState`
 * @constant
 * @type {Object}
 * @property {boolean} readOnly - Default: false
 * @property {string} activeSidePanel - Default: 'layer'
 * @property {string|null} currentModal - Default: 'addData'
 * @property {string|null} datasetKeyToRemove - Default: null
 * @property {string|null} visibleDropdown - Default: null
 * @property {Object} exportImage - Default: [`DEFAULT_EXPORT_IMAGE`](#default_export_image)
 * @property {Object} exportData - Default: [`DEFAULT_EXPORT_DATA`](#default_export_data)
 * @property {Object} mapControls - Default: [`DEFAULT_MAP_CONTROLS`](#default_map_controls)
 * @public
 */

exports.DEFAULT_NOTIFICATIONS = DEFAULT_NOTIFICATIONS;
var INITIAL_UI_STATE = {
  readOnly: false,
  activeSidePanel: DEFAULT_ACTIVE_SIDE_PANEL,
  currentModal: DEFAULT_MODAL,
  datasetKeyToRemove: null,
  visibleDropdown: null,
  // export image modal ui
  exportImage: DEFAULT_EXPORT_IMAGE,
  // export data modal ui
  exportData: DEFAULT_EXPORT_DATA,
  // map control panels
  mapControls: DEFAULT_MAP_CONTROLS,
  // ui notifications
  notifications: DEFAULT_NOTIFICATIONS
};
/* Updaters */

/**
 * Toggle active side panel
 * @mixin uiStateUpdaters.toggleSidePanelUpdater
 * @param {Object} state - `uiState`
 * @param {Object} action
 * @param {string} action.payload - id of side panel to be shown, one of `layer`, `filter`, `interaction`, `map`
 * @public
 */

exports.INITIAL_UI_STATE = INITIAL_UI_STATE;

var toggleSidePanelUpdater = function toggleSidePanelUpdater(state, _ref) {
  var id = _ref.payload;

  if (id === state.activeSidePanel) {
    return state;
  }

  return (0, _objectSpread3.default)({}, state, {
    activeSidePanel: id
  });
};
/**
 * Show and hide modal dialog
 * @mixin uiStateUpdaters.toggleModalUpdater
 * @param {Object} state - `uiState`
 * @param {Object} action
 * @param {string|null} action.payload - id of modal to be shown, null to hide modals. One of:
 *
 *  - [`DATA_TABLE_ID`](../constants/default-settings.md#data_table_id)
 *  - [`DELETE_DATA_ID`](../constants/default-settings.md#delete_data_id)
 *  - [`ADD_DATA_ID`](../constants/default-settings.md#add_data_id)
 *  - [`EXPORT_IMAGE_ID`](../constants/default-settings.md#export_image_id)
 *  - [`EXPORT_DATA_ID`](../constants/default-settings.md#export_data_id)
 *  - [`EXPORT_CONFIG_ID`](../constants/default-settings.md#export_config_id)
 *  - [`ADD_MAP_STYLE_ID`](../constants/default-settings.md#add_map_style_id)
 * @public
 */


exports.toggleSidePanelUpdater = toggleSidePanelUpdater;

var toggleModalUpdater = function toggleModalUpdater(state, _ref2) {
  var id = _ref2.payload;
  return (0, _objectSpread3.default)({}, state, {
    currentModal: id
  });
};
/**
 * Hide and show side panel header dropdown, activated by clicking the share link on top of the side panel
 * @mixin uiStateUpdaters.showExportDropdownUpdater
 * @param {Object} state - `uiState`
 * @param {Object} action
 * @param {string} action.payload - id of the dropdown
 * @public
 */


exports.toggleModalUpdater = toggleModalUpdater;

var showExportDropdownUpdater = function showExportDropdownUpdater(state, _ref3) {
  var id = _ref3.payload;
  return (0, _objectSpread3.default)({}, state, {
    visibleDropdown: id
  });
};
/**
 * Hide side panel header dropdown, activated by clicking the share link on top of the side panel
 * @mixin uiStateUpdaters.hideExportDropdownUpdater
 * @param {Object} state - `uiState`
 * @param {*} action
 * @public
 */


exports.showExportDropdownUpdater = showExportDropdownUpdater;

var hideExportDropdownUpdater = function hideExportDropdownUpdater(state, action) {
  return (0, _objectSpread3.default)({}, state, {
    visibleDropdown: null
  });
};
/**
 * Toggle active map control panel
 * @mixin uiStateUpdaters.toggleMapControlUpdater
 * @param {Object} state - `uiState`
 * @param {Object} action
 * @param {string} action.payload - map control panel id, one of the keys of: [`DEFAULT_MAP_CONTROLS`](#default_map_controls)
 * @public
 */


exports.hideExportDropdownUpdater = hideExportDropdownUpdater;

var toggleMapControlUpdater = function toggleMapControlUpdater(state, _ref4) {
  var panelId = _ref4.payload;
  return (0, _objectSpread3.default)({}, state, {
    mapControls: (0, _objectSpread3.default)({}, state.mapControls, (0, _defineProperty2.default)({}, panelId, (0, _objectSpread3.default)({}, state.mapControls[panelId], {
      active: !state.mapControls[panelId].active
    })))
  });
};
/**
 * Toggle active map control panel
 * @mixin uiStateUpdaters.openDeleteModalUpdater
 * @param {Object} state - `uiState`
 * @param {Object} action
 * @param {string} action.payload - map control panel id, one of the keys of: [`DEFAULT_MAP_CONTROLS`](#default_map_controls)
 * @public
 */


exports.toggleMapControlUpdater = toggleMapControlUpdater;

var openDeleteModalUpdater = function openDeleteModalUpdater(state, _ref5) {
  var datasetKeyToRemove = _ref5.payload;
  return (0, _objectSpread3.default)({}, state, {
    currentModal: _defaultSettings.DELETE_DATA_ID,
    datasetKeyToRemove: datasetKeyToRemove
  });
};
/**
 * set exportImage.legend to true or false
 * @mixin uiStateUpdaters.toggleLegendUpdater
 * @param {Object} state - `uiState`
 * @public
 */


exports.openDeleteModalUpdater = openDeleteModalUpdater;

var toggleLegendUpdater = function toggleLegendUpdater(state) {
  return (0, _objectSpread3.default)({}, state, {
    exportImage: (0, _objectSpread3.default)({}, state.exportImage, {
      legend: !state.exportImage.legend
    })
  });
};
/**
 * set `exportImage.ratio`
 * @mixin uiStateUpdaters.setRatioUpdater
 * @param {Object} state - `uiState`
 * @param {Object} action
 * @param {string} action.payload - one of `'SCREEN'`, `'FOUR_BY_THREE'` and `'SIXTEEN_BY_NINE'`
 * @public
 */


exports.toggleLegendUpdater = toggleLegendUpdater;

var setRatioUpdater = function setRatioUpdater(state, _ref6) {
  var payload = _ref6.payload;
  return (0, _objectSpread3.default)({}, state, {
    exportImage: (0, _objectSpread3.default)({}, state.exportImage, {
      ratio: payload.ratio
    })
  });
};
/**
 * set `exportImage.resolution`
 * @mixin uiStateUpdaters.setResolutionUpdater
 * @param {Object} state - `uiState`
 * @param {Object} action
 * @param {string} action.payload - one of `'ONE_X'`, `'TWO_X'`
 * @public
 */


exports.setRatioUpdater = setRatioUpdater;

var setResolutionUpdater = function setResolutionUpdater(state, _ref7) {
  var payload = _ref7.payload;
  return (0, _objectSpread3.default)({}, state, {
    exportImage: (0, _objectSpread3.default)({}, state.exportImage, {
      resolution: payload.resolution
    })
  });
};
/**
 * set `exportImage.exporting` to true
 * @mixin uiStateUpdaters.setResolutionUpdater
 * @param {Object} state - `uiState`
 * @public
 */


exports.setResolutionUpdater = setResolutionUpdater;

var startExportingImage = function startExportingImage(state) {
  return (0, _objectSpread3.default)({}, state, {
    exportImage: (0, _objectSpread3.default)({}, state.exportImage, {
      exporting: true,
      imageDataUri: ''
    })
  });
};
/**
 * set `exportImage.setExportImageDataUri` to a dataUri
 * @mixin uiStateUpdaters.setResolutionUpdater
 * @param {Object} state - `uiState`
 * @param {Object} action
 * @param {string} action.payload - export image data uri
 * @public
 */


exports.startExportingImage = startExportingImage;

var setExportImageDataUri = function setExportImageDataUri(state, _ref8) {
  var dataUri = _ref8.payload;
  return (0, _objectSpread3.default)({}, state, {
    exportImage: (0, _objectSpread3.default)({}, state.exportImage, {
      exporting: false,
      imageDataUri: dataUri
    })
  });
};
/**
 * cleanup export image
 * @mixin uiStateUpdaters.cleanupExportImage
 * @param {Object} state - `uiState`
 * @public
 */


exports.setExportImageDataUri = setExportImageDataUri;

var cleanupExportImage = function cleanupExportImage(state) {
  return (0, _objectSpread3.default)({}, state, {
    exportImage: (0, _objectSpread3.default)({}, state.exportImage, {
      exporting: false,
      imageDataUri: ''
    })
  });
};
/**
 * set selected dataset to export
 * @mixin uiStateUpdaters.setExportSelectedDatasetUpdater
 * @param {Object} state - `uiState`
 * @param {Object} action
 * @param {string} action.payload - dataset id
 * @public
 */


exports.cleanupExportImage = cleanupExportImage;

var setExportSelectedDatasetUpdater = function setExportSelectedDatasetUpdater(state, _ref9) {
  var dataset = _ref9.payload;
  return (0, _objectSpread3.default)({}, state, {
    exportData: (0, _objectSpread3.default)({}, state.exportData, {
      selectedDataset: dataset
    })
  });
};
/**
 * set selected dataset to export
 * @mixin uiStateUpdaters.setExportDataTypeUpdater
 * @param {Object} state - `uiState`
 * @param {Object} action
 * @param {string} action.payload - dataset id
 * @public
 */


exports.setExportSelectedDatasetUpdater = setExportSelectedDatasetUpdater;

var setExportDataTypeUpdater = function setExportDataTypeUpdater(state, _ref10) {
  var dataType = _ref10.payload;
  return (0, _objectSpread3.default)({}, state, {
    exportData: (0, _objectSpread3.default)({}, state.exportData, {
      dataType: dataType
    })
  });
};
/**
 * whether to export filtered data, `true` or `false`
 * @mixin uiStateUpdaters.setExportFilteredUpdater
 * @param {Object} state - `uiState`
 * @param {Object} action
 * @param {bollean} action.payload
 * @public
 */


exports.setExportDataTypeUpdater = setExportDataTypeUpdater;

var setExportFilteredUpdater = function setExportFilteredUpdater(state, _ref11) {
  var filtered = _ref11.payload;
  return (0, _objectSpread3.default)({}, state, {
    exportData: (0, _objectSpread3.default)({}, state.exportData, {
      filtered: filtered
    })
  });
};
/**
 * whether to including data data in map config, toggle between `true` or `false`
 * @mixin uiStateUpdaters.setExportConfigUpdater
 * @param {Object} state - `uiState`
 * @public
 */


exports.setExportFilteredUpdater = setExportFilteredUpdater;

var setExportDataUpdater = function setExportDataUpdater(state, action) {
  return (0, _objectSpread3.default)({}, state, {
    exportData: (0, _objectSpread3.default)({}, state.exportData, {
      data: !state.exportData.data
    })
  });
};

exports.setExportDataUpdater = setExportDataUpdater;

var addNotificationUpdater = function addNotificationUpdater(state, _ref12) {
  var payload = _ref12.payload;
  return (0, _objectSpread3.default)({}, state, {
    notifications: [].concat((0, _toConsumableArray2.default)(state.notifications || []), [(0, _notificationsUtils.createNotification)(payload)])
  });
};

exports.addNotificationUpdater = addNotificationUpdater;

var removeNotificationUpdater = function removeNotificationUpdater(state, _ref13) {
  var payload = _ref13.payload;
  return (0, _objectSpread3.default)({}, state, {
    notifications: state.notifications.filter(function (n) {
      return n.id !== payload;
    })
  });
};

exports.removeNotificationUpdater = removeNotificationUpdater;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy91aS1zdGF0ZS11cGRhdGVycy5qcyJdLCJuYW1lcyI6WyJERUZBVUxUX0FDVElWRV9TSURFX1BBTkVMIiwiREVGQVVMVF9NT0RBTCIsIkFERF9EQVRBX0lEIiwiREVGQVVMVF9NQVBfQ09OVFJPTFMiLCJ2aXNpYmxlTGF5ZXJzIiwic2hvdyIsImFjdGl2ZSIsIm1hcExlZ2VuZCIsInRvZ2dsZTNkIiwic3BsaXRNYXAiLCJERUZBVUxUX0VYUE9SVF9JTUFHRSIsInJhdGlvIiwiUkFUSU9TIiwiU0NSRUVOIiwicmVzb2x1dGlvbiIsIlJFU09MVVRJT05TIiwiT05FX1giLCJsZWdlbmQiLCJpbWFnZURhdGFVcmkiLCJleHBvcnRpbmciLCJERUZBVUxUX0VYUE9SVF9EQVRBIiwic2VsZWN0ZWREYXRhc2V0IiwiZGF0YVR5cGUiLCJFWFBPUlRfREFUQV9UWVBFIiwiQ1NWIiwiZmlsdGVyZWQiLCJjb25maWciLCJkYXRhIiwiREVGQVVMVF9OT1RJRklDQVRJT05TIiwiSU5JVElBTF9VSV9TVEFURSIsInJlYWRPbmx5IiwiYWN0aXZlU2lkZVBhbmVsIiwiY3VycmVudE1vZGFsIiwiZGF0YXNldEtleVRvUmVtb3ZlIiwidmlzaWJsZURyb3Bkb3duIiwiZXhwb3J0SW1hZ2UiLCJleHBvcnREYXRhIiwibWFwQ29udHJvbHMiLCJub3RpZmljYXRpb25zIiwidG9nZ2xlU2lkZVBhbmVsVXBkYXRlciIsInN0YXRlIiwiaWQiLCJwYXlsb2FkIiwidG9nZ2xlTW9kYWxVcGRhdGVyIiwic2hvd0V4cG9ydERyb3Bkb3duVXBkYXRlciIsImhpZGVFeHBvcnREcm9wZG93blVwZGF0ZXIiLCJhY3Rpb24iLCJ0b2dnbGVNYXBDb250cm9sVXBkYXRlciIsInBhbmVsSWQiLCJvcGVuRGVsZXRlTW9kYWxVcGRhdGVyIiwiREVMRVRFX0RBVEFfSUQiLCJ0b2dnbGVMZWdlbmRVcGRhdGVyIiwic2V0UmF0aW9VcGRhdGVyIiwic2V0UmVzb2x1dGlvblVwZGF0ZXIiLCJzdGFydEV4cG9ydGluZ0ltYWdlIiwic2V0RXhwb3J0SW1hZ2VEYXRhVXJpIiwiZGF0YVVyaSIsImNsZWFudXBFeHBvcnRJbWFnZSIsInNldEV4cG9ydFNlbGVjdGVkRGF0YXNldFVwZGF0ZXIiLCJkYXRhc2V0Iiwic2V0RXhwb3J0RGF0YVR5cGVVcGRhdGVyIiwic2V0RXhwb3J0RmlsdGVyZWRVcGRhdGVyIiwic2V0RXhwb3J0RGF0YVVwZGF0ZXIiLCJhZGROb3RpZmljYXRpb25VcGRhdGVyIiwicmVtb3ZlTm90aWZpY2F0aW9uVXBkYXRlciIsImZpbHRlciIsIm4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFPQTs7QUEzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFXTyxJQUFNQSx5QkFBeUIsR0FBRyxPQUFsQzs7QUFDQSxJQUFNQyxhQUFhLEdBQUdDLDRCQUF0QjtBQUVQOzs7Ozs7Ozs7Ozs7QUFVTyxJQUFNQyxvQkFBb0IsR0FBRztBQUNsQ0MsRUFBQUEsYUFBYSxFQUFFO0FBQ2JDLElBQUFBLElBQUksRUFBRSxJQURPO0FBRWJDLElBQUFBLE1BQU0sRUFBRTtBQUZLLEdBRG1CO0FBS2xDQyxFQUFBQSxTQUFTLEVBQUU7QUFDVEYsSUFBQUEsSUFBSSxFQUFFLElBREc7QUFFVEMsSUFBQUEsTUFBTSxFQUFFO0FBRkMsR0FMdUI7QUFTbENFLEVBQUFBLFFBQVEsRUFBRTtBQUNSSCxJQUFBQSxJQUFJLEVBQUU7QUFERSxHQVR3QjtBQVlsQ0ksRUFBQUEsUUFBUSxFQUFFO0FBQ1JKLElBQUFBLElBQUksRUFBRTtBQURFO0FBWndCLENBQTdCO0FBaUJQOzs7Ozs7Ozs7Ozs7O0FBV08sSUFBTUssb0JBQW9CLEdBQUc7QUFDbEM7QUFDQUMsRUFBQUEsS0FBSyxFQUFFQyx3QkFBT0MsTUFGb0I7QUFHbENDLEVBQUFBLFVBQVUsRUFBRUMsNkJBQVlD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LE9BQVQ7QUFBQSx5Q0FDbkNGLEtBRG1DO0FBRXRDSixJQUFBQSxVQUFVLGtDQUNMSSxLQUFLLENBQUNKLFVBREQ7QUFFUlgsTUFBQUEsUUFBUSxFQUFSQTtBQUZRO0FBRjRCO0FBQUEsQ0FBakM7QUFRUDs7Ozs7Ozs7OztBQU1PLElBQU1xQyxvQkFBb0IsR0FBRyxTQUF2QkEsb0JBQXVCLENBQUN0QixLQUFELEVBQVFNLE1BQVI7QUFBQSx5Q0FDL0JOLEtBRCtCO0FBRWxDSixJQUFBQSxVQUFVLGtDQUNMSSxLQUFLLENBQUNKLFVBREQ7QUFFUlQsTUFBQUEsSUFBSSxFQUFFLENBQUNhLEtBQUssQ0FBQ0osVUFBTixDQUFpQlQ7QUFGaEI7QUFGd0I7QUFBQSxDQUE3Qjs7OztBQVFBLElBQU1vQyxzQkFBc0IsR0FBRyxTQUF6QkEsc0JBQXlCLENBQUN2QixLQUFEO0FBQUEsTUFBU0UsT0FBVCxVQUFTQSxPQUFUO0FBQUEseUNBQ2pDRixLQURpQztBQUVwQ0YsSUFBQUEsYUFBYSw2Q0FDUkUsS0FBSyxDQUFDRixhQUFOLElBQXVCLEVBRGYsSUFFWCw0Q0FBbUJJLE9BQW5CLENBRlc7QUFGdUI7QUFBQSxDQUEvQjs7OztBQVFBLElBQU1zQix5QkFBeUIsR0FBRyxTQUE1QkEseUJBQTRCLENBQUN4QixLQUFEO0FBQUEsTUFBU0UsT0FBVCxVQUFTQSxPQUFUO0FBQUEseUNBQ3BDRixLQURvQztBQUV2Q0YsSUFBQUEsYUFBYSxFQUFFRSxLQUFLLENBQUNGLGFBQU4sQ0FBb0IyQixNQUFwQixDQUEyQixVQUFBQyxDQUFDO0FBQUEsYUFBSUEsQ0FBQyxDQUFDekIsRUFBRixLQUFTQyxPQUFiO0FBQUEsS0FBNUI7QUFGd0I7QUFBQSxDQUFsQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7XG4gIERFTEVURV9EQVRBX0lELFxuICBBRERfREFUQV9JRCxcbiAgRVhQT1JUX0RBVEFfVFlQRSxcbiAgUkFUSU9TLFxuICBSRVNPTFVUSU9OU1xufSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5pbXBvcnQge2NyZWF0ZU5vdGlmaWNhdGlvbn0gZnJvbSAndXRpbHMvbm90aWZpY2F0aW9ucy11dGlscyc7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0FDVElWRV9TSURFX1BBTkVMID0gJ2xheWVyJztcbmV4cG9ydCBjb25zdCBERUZBVUxUX01PREFMID0gQUREX0RBVEFfSUQ7XG5cbi8qKlxuICogQSBsaXN0IG9mIG1hcCBjb250cm9sIHZpc2liaWxpdGllcyBhbmQgYWN0aXZlbmVzcy5cbiAqIEBjb25zdGFudFxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSB2aXNpYmxlTGF5ZXJzIC0gRGVmYXVsdDogYHtzaG93OiB0cnVlLCBhY3RpdmU6IGZhbHNlfWBcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBtYXBMZWdlbmQgLSBEZWZhdWx0OiBge3Nob3c6IHRydWUsIGFjdGl2ZTogZmFsc2V9YFxuICogQHByb3BlcnR5IHtPYmplY3R9IHRvZ2dsZTNkIC0gRGVmYXVsdDogYHtzaG93OiB0cnVlfWBcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBzcGxpdE1hcCAtIERlZmF1bHQ6IGB7c2hvdzogdHJ1ZX1gXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX01BUF9DT05UUk9MUyA9IHtcbiAgdmlzaWJsZUxheWVyczoge1xuICAgIHNob3c6IHRydWUsXG4gICAgYWN0aXZlOiBmYWxzZVxuICB9LFxuICBtYXBMZWdlbmQ6IHtcbiAgICBzaG93OiB0cnVlLFxuICAgIGFjdGl2ZTogZmFsc2VcbiAgfSxcbiAgdG9nZ2xlM2Q6IHtcbiAgICBzaG93OiB0cnVlXG4gIH0sXG4gIHNwbGl0TWFwOiB7XG4gICAgc2hvdzogdHJ1ZVxuICB9XG59O1xuXG4vKipcbiAqIERlZmF1bHQgaW1hZ2UgZXhwb3J0IGNvbmZpZ1xuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHJhdGlvIC0gRGVmYXVsdDogJ1NDUkVFTicsXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcmVzb2x1dGlvbiAtIERlZmF1bHQ6ICdPTkVfWCcsXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGxlZ2VuZCAtIERlZmF1bHQ6IGZhbHNlLFxuICogQHByb3BlcnR5IHtzdHJpbmd9IGltYWdlRGF0YVVyaSAtIERlZmF1bHQ6ICcnLFxuICogQHByb3BlcnR5IHtib29sZWFufSBleHBvcnRpbmcgLSBEZWZhdWx0OiBmYWxzZVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9FWFBPUlRfSU1BR0UgPSB7XG4gIC8vIHVzZXIgb3B0aW9uc1xuICByYXRpbzogUkFUSU9TLlNDUkVFTixcbiAgcmVzb2x1dGlvbjogUkVTT0xVVElPTlMuT05FX1gsXG4gIGxlZ2VuZDogZmFsc2UsXG4gIC8vIGV4cG9ydGluZyBzdGF0ZVxuICBpbWFnZURhdGFVcmk6ICcnLFxuICBleHBvcnRpbmc6IGZhbHNlXG59O1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzZWxlY3RlZERhdGFzZXQgLSBEZWZhdWx0OiAnJyxcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBkYXRhVHlwZSAtIERlZmF1bHQ6ICdjc3YnLFxuICogQHByb3BlcnR5IHtib29sZWFufSBmaWx0ZXJlZCAtIERlZmF1bHQ6IHRydWUsXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGNvbmZpZyAtIGRlcHJlY2F0ZWRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gZGF0YSAtIHVzZWQgaW4gbW9kYWwgY29uZmlnIGV4cG9yLiBEZWZhdWx0OiBmYWxzZXRcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfRVhQT1JUX0RBVEEgPSB7XG4gIHNlbGVjdGVkRGF0YXNldDogJycsXG4gIGRhdGFUeXBlOiBFWFBPUlRfREFUQV9UWVBFLkNTVixcbiAgZmlsdGVyZWQ6IHRydWUsXG4gIGNvbmZpZzogZmFsc2UsIC8vIG5vIGxvbmdlciB1c2VkLCBzaW5jZSB3ZSByZW1vdmVkIHRoZSBvcHRpb24gdG8gZXhwb3J0IGNvbmZpZyBmcm9tIG1vZGFsIGRhdGEgZXhwb3J0XG4gIGRhdGE6IGZhbHNlIC8vIHRoaXMgaXMgdXNlZCBpbiBtb2RhbCBjb25maWcgZXhwb3J0XG59O1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9OT1RJRklDQVRJT05TID0gW107XG5cbi8qKlxuICogRGVmYXVsdCBpbml0aWFsIGB1aVN0YXRlYFxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByb3BlcnR5IHtib29sZWFufSByZWFkT25seSAtIERlZmF1bHQ6IGZhbHNlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gYWN0aXZlU2lkZVBhbmVsIC0gRGVmYXVsdDogJ2xheWVyJ1xuICogQHByb3BlcnR5IHtzdHJpbmd8bnVsbH0gY3VycmVudE1vZGFsIC0gRGVmYXVsdDogJ2FkZERhdGEnXG4gKiBAcHJvcGVydHkge3N0cmluZ3xudWxsfSBkYXRhc2V0S2V5VG9SZW1vdmUgLSBEZWZhdWx0OiBudWxsXG4gKiBAcHJvcGVydHkge3N0cmluZ3xudWxsfSB2aXNpYmxlRHJvcGRvd24gLSBEZWZhdWx0OiBudWxsXG4gKiBAcHJvcGVydHkge09iamVjdH0gZXhwb3J0SW1hZ2UgLSBEZWZhdWx0OiBbYERFRkFVTFRfRVhQT1JUX0lNQUdFYF0oI2RlZmF1bHRfZXhwb3J0X2ltYWdlKVxuICogQHByb3BlcnR5IHtPYmplY3R9IGV4cG9ydERhdGEgLSBEZWZhdWx0OiBbYERFRkFVTFRfRVhQT1JUX0RBVEFgXSgjZGVmYXVsdF9leHBvcnRfZGF0YSlcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBtYXBDb250cm9scyAtIERlZmF1bHQ6IFtgREVGQVVMVF9NQVBfQ09OVFJPTFNgXSgjZGVmYXVsdF9tYXBfY29udHJvbHMpXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBJTklUSUFMX1VJX1NUQVRFID0ge1xuICByZWFkT25seTogZmFsc2UsXG4gIGFjdGl2ZVNpZGVQYW5lbDogREVGQVVMVF9BQ1RJVkVfU0lERV9QQU5FTCxcbiAgY3VycmVudE1vZGFsOiBERUZBVUxUX01PREFMLFxuICBkYXRhc2V0S2V5VG9SZW1vdmU6IG51bGwsXG4gIHZpc2libGVEcm9wZG93bjogbnVsbCxcbiAgLy8gZXhwb3J0IGltYWdlIG1vZGFsIHVpXG4gIGV4cG9ydEltYWdlOiBERUZBVUxUX0VYUE9SVF9JTUFHRSxcbiAgLy8gZXhwb3J0IGRhdGEgbW9kYWwgdWlcbiAgZXhwb3J0RGF0YTogREVGQVVMVF9FWFBPUlRfREFUQSxcbiAgLy8gbWFwIGNvbnRyb2wgcGFuZWxzXG4gIG1hcENvbnRyb2xzOiBERUZBVUxUX01BUF9DT05UUk9MUyxcbiAgLy8gdWkgbm90aWZpY2F0aW9uc1xuICBub3RpZmljYXRpb25zOiBERUZBVUxUX05PVElGSUNBVElPTlNcbn07XG5cbi8qIFVwZGF0ZXJzICovXG4vKipcbiAqIFRvZ2dsZSBhY3RpdmUgc2lkZSBwYW5lbFxuICogQG1peGluIHVpU3RhdGVVcGRhdGVycy50b2dnbGVTaWRlUGFuZWxVcGRhdGVyXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgLSBgdWlTdGF0ZWBcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpb24ucGF5bG9hZCAtIGlkIG9mIHNpZGUgcGFuZWwgdG8gYmUgc2hvd24sIG9uZSBvZiBgbGF5ZXJgLCBgZmlsdGVyYCwgYGludGVyYWN0aW9uYCwgYG1hcGBcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHRvZ2dsZVNpZGVQYW5lbFVwZGF0ZXIgPSAoc3RhdGUsIHtwYXlsb2FkOiBpZH0pID0+IHtcbiAgaWYgKGlkID09PSBzdGF0ZS5hY3RpdmVTaWRlUGFuZWwpIHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIGFjdGl2ZVNpZGVQYW5lbDogaWRcbiAgfTtcbn07XG5cbi8qKlxuICogU2hvdyBhbmQgaGlkZSBtb2RhbCBkaWFsb2dcbiAqIEBtaXhpbiB1aVN0YXRlVXBkYXRlcnMudG9nZ2xlTW9kYWxVcGRhdGVyXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgLSBgdWlTdGF0ZWBcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfG51bGx9IGFjdGlvbi5wYXlsb2FkIC0gaWQgb2YgbW9kYWwgdG8gYmUgc2hvd24sIG51bGwgdG8gaGlkZSBtb2RhbHMuIE9uZSBvZjpcbiAqXG4gKiAgLSBbYERBVEFfVEFCTEVfSURgXSguLi9jb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncy5tZCNkYXRhX3RhYmxlX2lkKVxuICogIC0gW2BERUxFVEVfREFUQV9JRGBdKC4uL2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzLm1kI2RlbGV0ZV9kYXRhX2lkKVxuICogIC0gW2BBRERfREFUQV9JRGBdKC4uL2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzLm1kI2FkZF9kYXRhX2lkKVxuICogIC0gW2BFWFBPUlRfSU1BR0VfSURgXSguLi9jb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncy5tZCNleHBvcnRfaW1hZ2VfaWQpXG4gKiAgLSBbYEVYUE9SVF9EQVRBX0lEYF0oLi4vY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MubWQjZXhwb3J0X2RhdGFfaWQpXG4gKiAgLSBbYEVYUE9SVF9DT05GSUdfSURgXSguLi9jb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncy5tZCNleHBvcnRfY29uZmlnX2lkKVxuICogIC0gW2BBRERfTUFQX1NUWUxFX0lEYF0oLi4vY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MubWQjYWRkX21hcF9zdHlsZV9pZClcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHRvZ2dsZU1vZGFsVXBkYXRlciA9IChzdGF0ZSwge3BheWxvYWQ6IGlkfSkgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGN1cnJlbnRNb2RhbDogaWRcbn0pO1xuXG4vKipcbiAqIEhpZGUgYW5kIHNob3cgc2lkZSBwYW5lbCBoZWFkZXIgZHJvcGRvd24sIGFjdGl2YXRlZCBieSBjbGlja2luZyB0aGUgc2hhcmUgbGluayBvbiB0b3Agb2YgdGhlIHNpZGUgcGFuZWxcbiAqIEBtaXhpbiB1aVN0YXRlVXBkYXRlcnMuc2hvd0V4cG9ydERyb3Bkb3duVXBkYXRlclxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIC0gYHVpU3RhdGVgXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gYWN0aW9uLnBheWxvYWQgLSBpZCBvZiB0aGUgZHJvcGRvd25cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHNob3dFeHBvcnREcm9wZG93blVwZGF0ZXIgPSAoc3RhdGUsIHtwYXlsb2FkOiBpZH0pID0+ICh7XG4gIC4uLnN0YXRlLFxuICB2aXNpYmxlRHJvcGRvd246IGlkXG59KTtcblxuLyoqXG4gKiBIaWRlIHNpZGUgcGFuZWwgaGVhZGVyIGRyb3Bkb3duLCBhY3RpdmF0ZWQgYnkgY2xpY2tpbmcgdGhlIHNoYXJlIGxpbmsgb24gdG9wIG9mIHRoZSBzaWRlIHBhbmVsXG4gKiBAbWl4aW4gdWlTdGF0ZVVwZGF0ZXJzLmhpZGVFeHBvcnREcm9wZG93blVwZGF0ZXJcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSAtIGB1aVN0YXRlYFxuICogQHBhcmFtIHsqfSBhY3Rpb25cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IGhpZGVFeHBvcnREcm9wZG93blVwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIHZpc2libGVEcm9wZG93bjogbnVsbFxufSk7XG5cbi8qKlxuICogVG9nZ2xlIGFjdGl2ZSBtYXAgY29udHJvbCBwYW5lbFxuICogQG1peGluIHVpU3RhdGVVcGRhdGVycy50b2dnbGVNYXBDb250cm9sVXBkYXRlclxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIC0gYHVpU3RhdGVgXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gYWN0aW9uLnBheWxvYWQgLSBtYXAgY29udHJvbCBwYW5lbCBpZCwgb25lIG9mIHRoZSBrZXlzIG9mOiBbYERFRkFVTFRfTUFQX0NPTlRST0xTYF0oI2RlZmF1bHRfbWFwX2NvbnRyb2xzKVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgdG9nZ2xlTWFwQ29udHJvbFVwZGF0ZXIgPSAoc3RhdGUsIHtwYXlsb2FkOiBwYW5lbElkfSkgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIG1hcENvbnRyb2xzOiB7XG4gICAgLi4uc3RhdGUubWFwQ29udHJvbHMsXG4gICAgW3BhbmVsSWRdOiB7XG4gICAgICAuLi5zdGF0ZS5tYXBDb250cm9sc1twYW5lbElkXSxcbiAgICAgIGFjdGl2ZTogIXN0YXRlLm1hcENvbnRyb2xzW3BhbmVsSWRdLmFjdGl2ZVxuICAgIH1cbiAgfVxufSk7XG5cbi8qKlxuICogVG9nZ2xlIGFjdGl2ZSBtYXAgY29udHJvbCBwYW5lbFxuICogQG1peGluIHVpU3RhdGVVcGRhdGVycy5vcGVuRGVsZXRlTW9kYWxVcGRhdGVyXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgLSBgdWlTdGF0ZWBcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpb24ucGF5bG9hZCAtIG1hcCBjb250cm9sIHBhbmVsIGlkLCBvbmUgb2YgdGhlIGtleXMgb2Y6IFtgREVGQVVMVF9NQVBfQ09OVFJPTFNgXSgjZGVmYXVsdF9tYXBfY29udHJvbHMpXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBvcGVuRGVsZXRlTW9kYWxVcGRhdGVyID0gKFxuICBzdGF0ZSxcbiAge3BheWxvYWQ6IGRhdGFzZXRLZXlUb1JlbW92ZX1cbikgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGN1cnJlbnRNb2RhbDogREVMRVRFX0RBVEFfSUQsXG4gIGRhdGFzZXRLZXlUb1JlbW92ZVxufSk7XG5cbi8qKlxuICogc2V0IGV4cG9ydEltYWdlLmxlZ2VuZCB0byB0cnVlIG9yIGZhbHNlXG4gKiBAbWl4aW4gdWlTdGF0ZVVwZGF0ZXJzLnRvZ2dsZUxlZ2VuZFVwZGF0ZXJcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSAtIGB1aVN0YXRlYFxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgdG9nZ2xlTGVnZW5kVXBkYXRlciA9IHN0YXRlID0+ICh7XG4gIC4uLnN0YXRlLFxuICBleHBvcnRJbWFnZToge1xuICAgIC4uLnN0YXRlLmV4cG9ydEltYWdlLFxuICAgIGxlZ2VuZDogIXN0YXRlLmV4cG9ydEltYWdlLmxlZ2VuZFxuICB9XG59KTtcblxuLyoqXG4gKiBzZXQgYGV4cG9ydEltYWdlLnJhdGlvYFxuICogQG1peGluIHVpU3RhdGVVcGRhdGVycy5zZXRSYXRpb1VwZGF0ZXJcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSAtIGB1aVN0YXRlYFxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IGFjdGlvbi5wYXlsb2FkIC0gb25lIG9mIGAnU0NSRUVOJ2AsIGAnRk9VUl9CWV9USFJFRSdgIGFuZCBgJ1NJWFRFRU5fQllfTklORSdgXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRSYXRpb1VwZGF0ZXIgPSAoc3RhdGUsIHtwYXlsb2FkfSkgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGV4cG9ydEltYWdlOiB7XG4gICAgLi4uc3RhdGUuZXhwb3J0SW1hZ2UsXG4gICAgcmF0aW86IHBheWxvYWQucmF0aW9cbiAgfVxufSk7XG5cbi8qKlxuICogc2V0IGBleHBvcnRJbWFnZS5yZXNvbHV0aW9uYFxuICogQG1peGluIHVpU3RhdGVVcGRhdGVycy5zZXRSZXNvbHV0aW9uVXBkYXRlclxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIC0gYHVpU3RhdGVgXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gYWN0aW9uLnBheWxvYWQgLSBvbmUgb2YgYCdPTkVfWCdgLCBgJ1RXT19YJ2BcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHNldFJlc29sdXRpb25VcGRhdGVyID0gKHN0YXRlLCB7cGF5bG9hZH0pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBleHBvcnRJbWFnZToge1xuICAgIC4uLnN0YXRlLmV4cG9ydEltYWdlLFxuICAgIHJlc29sdXRpb246IHBheWxvYWQucmVzb2x1dGlvblxuICB9XG59KTtcblxuLyoqXG4gKiBzZXQgYGV4cG9ydEltYWdlLmV4cG9ydGluZ2AgdG8gdHJ1ZVxuICogQG1peGluIHVpU3RhdGVVcGRhdGVycy5zZXRSZXNvbHV0aW9uVXBkYXRlclxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIC0gYHVpU3RhdGVgXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBzdGFydEV4cG9ydGluZ0ltYWdlID0gc3RhdGUgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGV4cG9ydEltYWdlOiB7XG4gICAgLi4uc3RhdGUuZXhwb3J0SW1hZ2UsXG4gICAgZXhwb3J0aW5nOiB0cnVlLFxuICAgIGltYWdlRGF0YVVyaTogJydcbiAgfVxufSk7XG5cbi8qKlxuICogc2V0IGBleHBvcnRJbWFnZS5zZXRFeHBvcnRJbWFnZURhdGFVcmlgIHRvIGEgZGF0YVVyaVxuICogQG1peGluIHVpU3RhdGVVcGRhdGVycy5zZXRSZXNvbHV0aW9uVXBkYXRlclxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIC0gYHVpU3RhdGVgXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gYWN0aW9uLnBheWxvYWQgLSBleHBvcnQgaW1hZ2UgZGF0YSB1cmlcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHNldEV4cG9ydEltYWdlRGF0YVVyaSA9IChzdGF0ZSwge3BheWxvYWQ6IGRhdGFVcml9KSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgZXhwb3J0SW1hZ2U6IHtcbiAgICAuLi5zdGF0ZS5leHBvcnRJbWFnZSxcbiAgICBleHBvcnRpbmc6IGZhbHNlLFxuICAgIGltYWdlRGF0YVVyaTogZGF0YVVyaVxuICB9XG59KTtcblxuLyoqXG4gKiBjbGVhbnVwIGV4cG9ydCBpbWFnZVxuICogQG1peGluIHVpU3RhdGVVcGRhdGVycy5jbGVhbnVwRXhwb3J0SW1hZ2VcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSAtIGB1aVN0YXRlYFxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgY2xlYW51cEV4cG9ydEltYWdlID0gc3RhdGUgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGV4cG9ydEltYWdlOiB7XG4gICAgLi4uc3RhdGUuZXhwb3J0SW1hZ2UsXG4gICAgZXhwb3J0aW5nOiBmYWxzZSxcbiAgICBpbWFnZURhdGFVcmk6ICcnXG4gIH1cbn0pO1xuXG4vKipcbiAqIHNldCBzZWxlY3RlZCBkYXRhc2V0IHRvIGV4cG9ydFxuICogQG1peGluIHVpU3RhdGVVcGRhdGVycy5zZXRFeHBvcnRTZWxlY3RlZERhdGFzZXRVcGRhdGVyXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgLSBgdWlTdGF0ZWBcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpb24ucGF5bG9hZCAtIGRhdGFzZXQgaWRcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHNldEV4cG9ydFNlbGVjdGVkRGF0YXNldFVwZGF0ZXIgPSAoc3RhdGUsIHtwYXlsb2FkOiBkYXRhc2V0fSkgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGV4cG9ydERhdGE6IHtcbiAgICAuLi5zdGF0ZS5leHBvcnREYXRhLFxuICAgIHNlbGVjdGVkRGF0YXNldDogZGF0YXNldFxuICB9XG59KTtcblxuLyoqXG4gKiBzZXQgc2VsZWN0ZWQgZGF0YXNldCB0byBleHBvcnRcbiAqIEBtaXhpbiB1aVN0YXRlVXBkYXRlcnMuc2V0RXhwb3J0RGF0YVR5cGVVcGRhdGVyXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgLSBgdWlTdGF0ZWBcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpb24ucGF5bG9hZCAtIGRhdGFzZXQgaWRcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHNldEV4cG9ydERhdGFUeXBlVXBkYXRlciA9IChzdGF0ZSwge3BheWxvYWQ6IGRhdGFUeXBlfSkgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGV4cG9ydERhdGE6IHtcbiAgICAuLi5zdGF0ZS5leHBvcnREYXRhLFxuICAgIGRhdGFUeXBlXG4gIH1cbn0pO1xuXG4vKipcbiAqIHdoZXRoZXIgdG8gZXhwb3J0IGZpbHRlcmVkIGRhdGEsIGB0cnVlYCBvciBgZmFsc2VgXG4gKiBAbWl4aW4gdWlTdGF0ZVVwZGF0ZXJzLnNldEV4cG9ydEZpbHRlcmVkVXBkYXRlclxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIC0gYHVpU3RhdGVgXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uXG4gKiBAcGFyYW0ge2JvbGxlYW59IGFjdGlvbi5wYXlsb2FkXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRFeHBvcnRGaWx0ZXJlZFVwZGF0ZXIgPSAoc3RhdGUsIHtwYXlsb2FkOiBmaWx0ZXJlZH0pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBleHBvcnREYXRhOiB7XG4gICAgLi4uc3RhdGUuZXhwb3J0RGF0YSxcbiAgICBmaWx0ZXJlZFxuICB9XG59KTtcblxuLyoqXG4gKiB3aGV0aGVyIHRvIGluY2x1ZGluZyBkYXRhIGRhdGEgaW4gbWFwIGNvbmZpZywgdG9nZ2xlIGJldHdlZW4gYHRydWVgIG9yIGBmYWxzZWBcbiAqIEBtaXhpbiB1aVN0YXRlVXBkYXRlcnMuc2V0RXhwb3J0Q29uZmlnVXBkYXRlclxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIC0gYHVpU3RhdGVgXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRFeHBvcnREYXRhVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgZXhwb3J0RGF0YToge1xuICAgIC4uLnN0YXRlLmV4cG9ydERhdGEsXG4gICAgZGF0YTogIXN0YXRlLmV4cG9ydERhdGEuZGF0YVxuICB9XG59KTtcblxuZXhwb3J0IGNvbnN0IGFkZE5vdGlmaWNhdGlvblVwZGF0ZXIgPSAoc3RhdGUsIHtwYXlsb2FkfSkgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIG5vdGlmaWNhdGlvbnM6IFtcbiAgICAuLi5zdGF0ZS5ub3RpZmljYXRpb25zIHx8IFtdLFxuICAgIGNyZWF0ZU5vdGlmaWNhdGlvbihwYXlsb2FkKVxuICBdXG59KTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZU5vdGlmaWNhdGlvblVwZGF0ZXIgPSAoc3RhdGUsIHtwYXlsb2FkfSkgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIG5vdGlmaWNhdGlvbnM6IHN0YXRlLm5vdGlmaWNhdGlvbnMuZmlsdGVyKG4gPT4gbi5pZCAhPT0gcGF5bG9hZClcbn0pO1xuIl19