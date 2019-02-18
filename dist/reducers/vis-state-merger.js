"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeFilters = mergeFilters;
exports.mergeLayers = mergeLayers;
exports.mergeInteractions = mergeInteractions;
exports.mergeInteractionTooltipConfig = mergeInteractionTooltipConfig;
exports.mergeLayerBlending = mergeLayerBlending;
exports.validateSavedLayerColumns = validateSavedLayerColumns;
exports.validateSavedTextLabel = validateSavedTextLabel;
exports.validateSavedVisualChannels = validateSavedVisualChannels;
exports.validateLayerWithData = validateLayerWithData;
exports.validateFilterWithData = validateFilterWithData;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread4 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _lodash = _interopRequireDefault(require("lodash.uniq"));

var _lodash2 = _interopRequireDefault(require("lodash.pick"));

var _filterUtils = require("../utils/filter-utils");

var _defaultSettings = require("../constants/default-settings");

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

/**
 * Merge loaded filters with current state, if no fields or data are loaded
 * save it for later
 *
 * @param {Object} state
 * @param {Object[]} filtersToMerge
 * @return {Object} updatedState
 */
function mergeFilters(state, filtersToMerge) {
  var merged = [];
  var unmerged = [];
  var datasets = state.datasets;

  if (!Array.isArray(filtersToMerge) || !filtersToMerge.length) {
    return state;
  } // merge filters


  filtersToMerge.forEach(function (filter) {
    // match filter.dataId with current datesets id
    // uploaded data need to have the same dataId with the filter
    if (datasets[filter.dataId]) {
      // datasets is already loaded
      var validateFilter = validateFilterWithData(datasets[filter.dataId], filter);

      if (validateFilter) {
        merged.push(validateFilter);
      }
    } else {
      // datasets not yet loaded
      unmerged.push(filter);
    }
  }); // filter data

  var updatedFilters = [].concat((0, _toConsumableArray2.default)(state.filters || []), merged);
  var datasetToFilter = (0, _lodash.default)(merged.map(function (d) {
    return d.dataId;
  }));
  var updatedDataset = datasetToFilter.reduce(function (accu, dataId) {
    return (0, _objectSpread4.default)({}, accu, (0, _defineProperty2.default)({}, dataId, (0, _objectSpread4.default)({}, datasets[dataId], (0, _filterUtils.filterData)(datasets[dataId].allData, dataId, updatedFilters))));
  }, datasets);
  return (0, _objectSpread4.default)({}, state, {
    filters: updatedFilters,
    datasets: updatedDataset,
    filterToBeMerged: unmerged
  });
}
/**
 * Merge layers from de-serialized state, if no fields or data are loaded
 * save it for later
 *
 * @param {object} state
 * @param {Object[]} layersToMerge
 * @return {Object} state
 */


function mergeLayers(state, layersToMerge) {
  var mergedLayer = [];
  var unmerged = [];
  var datasets = state.datasets;

  if (!Array.isArray(layersToMerge) || !layersToMerge.length) {
    return state;
  }

  layersToMerge.forEach(function (layer) {
    if (datasets[layer.config.dataId]) {
      // datasets are already loaded
      var validateLayer = validateLayerWithData(datasets[layer.config.dataId], layer, state.layerClasses);

      if (validateLayer) {
        mergedLayer.push(validateLayer);
      }
    } else {
      // datasets not yet loaded
      unmerged.push(layer);
    }
  });
  var layers = [].concat((0, _toConsumableArray2.default)(state.layers), mergedLayer);
  var newLayerOrder = mergedLayer.map(function (_, i) {
    return state.layers.length + i;
  }); // put new layers in front of current layers

  var layerOrder = [].concat((0, _toConsumableArray2.default)(newLayerOrder), (0, _toConsumableArray2.default)(state.layerOrder));
  return (0, _objectSpread4.default)({}, state, {
    layers: layers,
    layerOrder: layerOrder,
    layerToBeMerged: unmerged
  });
}
/**
 * Merge interactions with saved config
 *
 * @param {object} state
 * @param {Object} interactionToBeMerged
 * @return {Object} mergedState
 */


function mergeInteractions(state, interactionToBeMerged) {
  var merged = {};
  var unmerged = {};

  if (interactionToBeMerged) {
    Object.keys(interactionToBeMerged).forEach(function (key) {
      if (!state.interactionConfig[key]) {
        return;
      }

      var _ref = interactionToBeMerged[key] || {},
          enabled = _ref.enabled,
          configSaved = (0, _objectWithoutProperties2.default)(_ref, ["enabled"]);

      var configToMerge = configSaved;

      if (key === 'tooltip') {
        var _mergeInteractionTool = mergeInteractionTooltipConfig(state, configSaved),
            mergedTooltip = _mergeInteractionTool.mergedTooltip,
            unmergedTooltip = _mergeInteractionTool.unmergedTooltip; // merge new dataset tooltips with original dataset tooltips


        configToMerge = {
          fieldsToShow: (0, _objectSpread4.default)({}, state.interactionConfig[key].config.fieldsToShow, mergedTooltip)
        };

        if (Object.keys(unmergedTooltip).length) {
          unmerged.tooltip = {
            fieldsToShow: unmergedTooltip,
            enabled: enabled
          };
        }
      }

      merged[key] = (0, _objectSpread4.default)({}, state.interactionConfig[key], {
        enabled: enabled,
        config: (0, _lodash2.default)((0, _objectSpread4.default)({}, state.interactionConfig[key].config, configToMerge), Object.keys(state.interactionConfig[key].config))
      });
    });
  }

  return (0, _objectSpread4.default)({}, state, {
    interactionConfig: (0, _objectSpread4.default)({}, state.interactionConfig, merged),
    interactionToBeMerged: unmerged
  });
}
/**
 * Merge interactionConfig.tooltip with saved config,
 * validate fieldsToShow
 *
 * @param {string} state
 * @param {Object} tooltipConfig
 * @return {Object} - {mergedTooltip: {}, unmergedTooltip: {}}
 */


function mergeInteractionTooltipConfig(state) {
  var tooltipConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var unmergedTooltip = {};
  var mergedTooltip = {};

  if (!tooltipConfig.fieldsToShow || !Object.keys(tooltipConfig.fieldsToShow).length) {
    return {
      mergedTooltip: mergedTooltip,
      unmergedTooltip: unmergedTooltip
    };
  }

  for (var dataId in tooltipConfig.fieldsToShow) {
    if (!state.datasets[dataId]) {
      // is not yet loaded
      unmergedTooltip[dataId] = tooltipConfig.fieldsToShow[dataId];
    } else {
      (function () {
        // if dataset is loaded
        var allFields = state.datasets[dataId].fields.map(function (d) {
          return d.name;
        });
        var foundFieldsToShow = tooltipConfig.fieldsToShow[dataId].filter(function (name) {
          return allFields.includes(name);
        });
        mergedTooltip[dataId] = foundFieldsToShow;
      })();
    }
  }

  return {
    mergedTooltip: mergedTooltip,
    unmergedTooltip: unmergedTooltip
  };
}
/**
 * Merge layerBlending with saved
 *
 * @param {object} state
 * @param {string} layerBlending
 * @return {object} merged state
 */


function mergeLayerBlending(state, layerBlending) {
  if (layerBlending && _defaultSettings.LAYER_BLENDINGS[layerBlending]) {
    return (0, _objectSpread4.default)({}, state, {
      layerBlending: layerBlending
    });
  }

  return state;
}
/**
 * Validate saved layer columns with new data,
 * update fieldIdx based on new fields
 *
 * @param {Object[]} fields
 * @param {Object} savedCols
 * @param {Object} emptyCols
 * @return {null | Object} - validated columns or null
 */


function validateSavedLayerColumns(fields, savedCols, emptyCols) {
  var colFound = {}; // find actual column fieldIdx, in case it has changed

  var allColFound = Object.keys(emptyCols).every(function (key) {
    var saved = savedCols[key];
    colFound[key] = (0, _objectSpread4.default)({}, emptyCols[key]);
    var fieldIdx = fields.findIndex(function (_ref2) {
      var name = _ref2.name;
      return name === saved;
    });

    if (fieldIdx > -1) {
      // update found columns
      colFound[key].fieldIdx = fieldIdx;
      colFound[key].value = saved;
      return true;
    } // if col is optional, allow null value


    return emptyCols[key].optional || false;
  });
  return allColFound && colFound;
}
/**
 * Validate saved text label config with new data
 * refer to vis-state-schema.js TextLabelSchemaV1
 *
 * @param {Object[]} fields
 * @param {Object} savedTextLabel
 * @return {Object} - validated textlabel
 */


function validateSavedTextLabel(fields, layerTextLabel, savedTextLabel) {
  // validate field
  var field = savedTextLabel.field ? fields.find(function (fd) {
    return Object.keys(savedTextLabel.field).every(function (key) {
      return savedTextLabel.field[key] === fd[key];
    });
  }) : null;
  return Object.keys(layerTextLabel).reduce(function (accu, key) {
    return (0, _objectSpread4.default)({}, accu, (0, _defineProperty2.default)({}, key, key === 'field' ? field : savedTextLabel[key] || layerTextLabel[key]));
  }, {});
}
/**
 * Validate saved visual channels config with new data,
 * refer to vis-state-schema.js VisualChannelSchemaV1
 *
 * @param {Object[]} fields
 * @param {Object} visualChannels
 * @param {Object} savedLayer
 * @return {Object} - validated visual channel in config or {}
 */


function validateSavedVisualChannels(fields, visualChannels, savedLayer) {
  return Object.values(visualChannels).reduce(function (found, _ref3) {
    var field = _ref3.field,
        scale = _ref3.scale;
    var foundField;

    if (savedLayer.config[field]) {
      foundField = fields.find(function (fd) {
        return Object.keys(savedLayer.config[field]).every(function (key) {
          return savedLayer.config[field][key] === fd[key];
        });
      });
    }

    return (0, _objectSpread4.default)({}, found, foundField ? (0, _defineProperty2.default)({}, field, foundField) : {}, savedLayer.config[scale] ? (0, _defineProperty2.default)({}, scale, savedLayer.config[scale]) : {});
  }, {});
}
/**
 * Validate saved layer config with new data,
 * update fieldIdx based on new fields
 *
 * @param {Object[]} fields
 * @param {String} dataId
 * @param {Object} savedLayer
 * @param {Object} layerClasses
 * @return {null | Object} - validated layer or null
 */


function validateLayerWithData(_ref6, savedLayer, layerClasses) {
  var fields = _ref6.fields,
      dataId = _ref6.id;
  var type = savedLayer.type; // layer doesnt have a valid type

  if (!layerClasses.hasOwnProperty(type) || !savedLayer.config || !savedLayer.config.columns) {
    return null;
  }

  var newLayer = new layerClasses[type]({
    id: savedLayer.id,
    dataId: dataId,
    label: savedLayer.config.label,
    color: savedLayer.config.color,
    isVisible: savedLayer.config.isVisible
  }); // find column fieldIdx

  var columns = validateSavedLayerColumns(fields, savedLayer.config.columns, newLayer.getLayerColumns());

  if (!columns) {
    return null;
  } // visual channel field is saved to be {name, type}
  // find visual channel field by matching both name and type
  // refer to vis-state-schema.js VisualChannelSchemaV1


  var foundVisualChannelConfigs = validateSavedVisualChannels(fields, newLayer.visualChannels, savedLayer);
  var textLabel = savedLayer.config.textLabel && newLayer.config.textLabel ? validateSavedTextLabel(fields, newLayer.config.textLabel, savedLayer.config.textLabel) : newLayer.config.textLabel; // copy visConfig over to emptyLayer to make sure it has all the props

  var visConfig = newLayer.copyLayerConfig(newLayer.config.visConfig, savedLayer.config.visConfig || {}, {
    notToDeepMerge: 'colorRange'
  });
  newLayer.updateLayerConfig((0, _objectSpread4.default)({
    columns: columns,
    visConfig: visConfig,
    textLabel: textLabel
  }, foundVisualChannelConfigs));
  return newLayer;
}
/**
 * Validate saved filter config with new data,
 * calculate domain and fieldIdx based new fields and data
 *
 * @param {Object[]} dataset.fields
 * @param {Object[]} dataset.allData
 * @param {Object} filter - filter to be validate
 * @return {Object | null} - validated filter
 */


function validateFilterWithData(_ref7, filter) {
  var fields = _ref7.fields,
      allData = _ref7.allData;
  // match filter.name to field.name
  var fieldIdx = fields.findIndex(function (_ref8) {
    var name = _ref8.name;
    return name === filter.name;
  });

  if (fieldIdx < 0) {
    // if can't find field with same name, discharge filter
    return null;
  }

  var field = fields[fieldIdx];
  var value = filter.value; // return filter type, default value, fieldType and fieldDomain from field

  var filterPropsFromField = (0, _filterUtils.getFilterProps)(allData, field);
  var matchedFilter = (0, _objectSpread4.default)({}, (0, _filterUtils.getDefaultFilter)(filter.dataId), filter, filterPropsFromField, {
    freeze: true,
    fieldIdx: fieldIdx
  });
  var _matchedFilter = matchedFilter,
      yAxis = _matchedFilter.yAxis;

  if (yAxis) {
    var matcheAxis = fields.find(function (_ref9) {
      var name = _ref9.name,
          type = _ref9.type;
      return name === yAxis.name && type === yAxis.type;
    });
    matchedFilter = matcheAxis ? (0, _objectSpread4.default)({}, matchedFilter, {
      yAxis: matcheAxis
    }, (0, _filterUtils.getFilterPlot)((0, _objectSpread4.default)({}, matchedFilter, {
      yAxis: matcheAxis
    }), allData)) : matchedFilter;
  }

  matchedFilter.value = (0, _filterUtils.adjustValueToFilterDomain)(value, matchedFilter);

  if (matchedFilter.value === null) {
    // cannt adjust saved value to filter
    return null;
  }

  return matchedFilter;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy92aXMtc3RhdGUtbWVyZ2VyLmpzIl0sIm5hbWVzIjpbIm1lcmdlRmlsdGVycyIsInN0YXRlIiwiZmlsdGVyc1RvTWVyZ2UiLCJtZXJnZWQiLCJ1bm1lcmdlZCIsImRhdGFzZXRzIiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwiZm9yRWFjaCIsImZpbHRlciIsImRhdGFJZCIsInZhbGlkYXRlRmlsdGVyIiwidmFsaWRhdGVGaWx0ZXJXaXRoRGF0YSIsInB1c2giLCJ1cGRhdGVkRmlsdGVycyIsImZpbHRlcnMiLCJkYXRhc2V0VG9GaWx0ZXIiLCJtYXAiLCJkIiwidXBkYXRlZERhdGFzZXQiLCJyZWR1Y2UiLCJhY2N1IiwiYWxsRGF0YSIsImZpbHRlclRvQmVNZXJnZWQiLCJtZXJnZUxheWVycyIsImxheWVyc1RvTWVyZ2UiLCJtZXJnZWRMYXllciIsImxheWVyIiwiY29uZmlnIiwidmFsaWRhdGVMYXllciIsInZhbGlkYXRlTGF5ZXJXaXRoRGF0YSIsImxheWVyQ2xhc3NlcyIsImxheWVycyIsIm5ld0xheWVyT3JkZXIiLCJfIiwiaSIsImxheWVyT3JkZXIiLCJsYXllclRvQmVNZXJnZWQiLCJtZXJnZUludGVyYWN0aW9ucyIsImludGVyYWN0aW9uVG9CZU1lcmdlZCIsIk9iamVjdCIsImtleXMiLCJrZXkiLCJpbnRlcmFjdGlvbkNvbmZpZyIsImVuYWJsZWQiLCJjb25maWdTYXZlZCIsImNvbmZpZ1RvTWVyZ2UiLCJtZXJnZUludGVyYWN0aW9uVG9vbHRpcENvbmZpZyIsIm1lcmdlZFRvb2x0aXAiLCJ1bm1lcmdlZFRvb2x0aXAiLCJmaWVsZHNUb1Nob3ciLCJ0b29sdGlwIiwidG9vbHRpcENvbmZpZyIsImFsbEZpZWxkcyIsImZpZWxkcyIsIm5hbWUiLCJmb3VuZEZpZWxkc1RvU2hvdyIsImluY2x1ZGVzIiwibWVyZ2VMYXllckJsZW5kaW5nIiwibGF5ZXJCbGVuZGluZyIsIkxBWUVSX0JMRU5ESU5HUyIsInZhbGlkYXRlU2F2ZWRMYXllckNvbHVtbnMiLCJzYXZlZENvbHMiLCJlbXB0eUNvbHMiLCJjb2xGb3VuZCIsImFsbENvbEZvdW5kIiwiZXZlcnkiLCJzYXZlZCIsImZpZWxkSWR4IiwiZmluZEluZGV4IiwidmFsdWUiLCJvcHRpb25hbCIsInZhbGlkYXRlU2F2ZWRUZXh0TGFiZWwiLCJsYXllclRleHRMYWJlbCIsInNhdmVkVGV4dExhYmVsIiwiZmllbGQiLCJmaW5kIiwiZmQiLCJ2YWxpZGF0ZVNhdmVkVmlzdWFsQ2hhbm5lbHMiLCJ2aXN1YWxDaGFubmVscyIsInNhdmVkTGF5ZXIiLCJ2YWx1ZXMiLCJmb3VuZCIsInNjYWxlIiwiZm91bmRGaWVsZCIsImlkIiwidHlwZSIsImhhc093blByb3BlcnR5IiwiY29sdW1ucyIsIm5ld0xheWVyIiwibGFiZWwiLCJjb2xvciIsImlzVmlzaWJsZSIsImdldExheWVyQ29sdW1ucyIsImZvdW5kVmlzdWFsQ2hhbm5lbENvbmZpZ3MiLCJ0ZXh0TGFiZWwiLCJ2aXNDb25maWciLCJjb3B5TGF5ZXJDb25maWciLCJub3RUb0RlZXBNZXJnZSIsInVwZGF0ZUxheWVyQ29uZmlnIiwiZmlsdGVyUHJvcHNGcm9tRmllbGQiLCJtYXRjaGVkRmlsdGVyIiwiZnJlZXplIiwieUF4aXMiLCJtYXRjaGVBeGlzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFFQTs7QUFRQTs7QUEvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBZUE7Ozs7Ozs7O0FBUU8sU0FBU0EsWUFBVCxDQUFzQkMsS0FBdEIsRUFBNkJDLGNBQTdCLEVBQTZDO0FBQ2xELE1BQU1DLE1BQU0sR0FBRyxFQUFmO0FBQ0EsTUFBTUMsUUFBUSxHQUFHLEVBQWpCO0FBRmtELE1BRzNDQyxRQUgyQyxHQUcvQkosS0FIK0IsQ0FHM0NJLFFBSDJDOztB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QUEsS0FEaUIsQ0FBbkI7QUFJQWUsSUFBQUEsYUFBYSxHQUFHRyxVQUFVLG1DQUVqQkgsYUFGaUI7QUFHcEJFLE1BQUFBLEtBQUssRUFBRUM7QUFIYSxPQUlqQixnRUFBa0JILGFBQWxCO0FBQWlDRSxNQUFBQSxLQUFLLEVBQUVDO0FBQXhDLFFBQXFEbEYsT0FBckQsQ0FKaUIsSUFNdEIrRSxhQU5KO0FBT0Q7O0FBRURBLEVBQUFBLGFBQWEsQ0FBQy9CLEtBQWQsR0FBc0IsNENBQTBCQSxLQUExQixFQUFpQytCLGFBQWpDLENBQXRCOztBQUVBLE1BQUlBLGFBQWEsQ0FBQy9CLEtBQWQsS0FBd0IsSUFBNUIsRUFBa0M7QUFDaEM7QUFDQSxXQUFPLElBQVA7QUFDRDs7QUFFRCxTQUFPK0IsYUFBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHVuaXEgZnJvbSAnbG9kYXNoLnVuaXEnO1xuaW1wb3J0IHBpY2sgZnJvbSAnbG9kYXNoLnBpY2snO1xuXG5pbXBvcnQge1xuICBnZXREZWZhdWx0RmlsdGVyLFxuICBnZXRGaWx0ZXJQcm9wcyxcbiAgZ2V0RmlsdGVyUGxvdCxcbiAgZmlsdGVyRGF0YSxcbiAgYWRqdXN0VmFsdWVUb0ZpbHRlckRvbWFpblxufSBmcm9tICd1dGlscy9maWx0ZXItdXRpbHMnO1xuXG5pbXBvcnQge0xBWUVSX0JMRU5ESU5HU30gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuXG4vKipcbiAqIE1lcmdlIGxvYWRlZCBmaWx0ZXJzIHdpdGggY3VycmVudCBzdGF0ZSwgaWYgbm8gZmllbGRzIG9yIGRhdGEgYXJlIGxvYWRlZFxuICogc2F2ZSBpdCBmb3IgbGF0ZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcbiAqIEBwYXJhbSB7T2JqZWN0W119IGZpbHRlcnNUb01lcmdlXG4gKiBAcmV0dXJuIHtPYmplY3R9IHVwZGF0ZWRTdGF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VGaWx0ZXJzKHN0YXRlLCBmaWx0ZXJzVG9NZXJnZSkge1xuICBjb25zdCBtZXJnZWQgPSBbXTtcbiAgY29uc3QgdW5tZXJnZWQgPSBbXTtcbiAgY29uc3Qge2RhdGFzZXRzfSA9IHN0YXRlO1xuXG4gIGlmICghQXJyYXkuaXNBcnJheShmaWx0ZXJzVG9NZXJnZSkgfHwgIWZpbHRlcnNUb01lcmdlLmxlbmd0aCkge1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIC8vIG1lcmdlIGZpbHRlcnNcbiAgZmlsdGVyc1RvTWVyZ2UuZm9yRWFjaChmaWx0ZXIgPT4ge1xuICAgIC8vIG1hdGNoIGZpbHRlci5kYXRhSWQgd2l0aCBjdXJyZW50IGRhdGVzZXRzIGlkXG4gICAgLy8gdXBsb2FkZWQgZGF0YSBuZWVkIHRvIGhhdmUgdGhlIHNhbWUgZGF0YUlkIHdpdGggdGhlIGZpbHRlclxuICAgIGlmIChkYXRhc2V0c1tmaWx0ZXIuZGF0YUlkXSkge1xuICAgICAgLy8gZGF0YXNldHMgaXMgYWxyZWFkeSBsb2FkZWRcbiAgICAgIGNvbnN0IHZhbGlkYXRlRmlsdGVyID0gdmFsaWRhdGVGaWx0ZXJXaXRoRGF0YShcbiAgICAgICAgZGF0YXNldHNbZmlsdGVyLmRhdGFJZF0sXG4gICAgICAgIGZpbHRlclxuICAgICAgKTtcblxuICAgICAgaWYgKHZhbGlkYXRlRmlsdGVyKSB7XG4gICAgICAgIG1lcmdlZC5wdXNoKHZhbGlkYXRlRmlsdGVyKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZGF0YXNldHMgbm90IHlldCBsb2FkZWRcbiAgICAgIHVubWVyZ2VkLnB1c2goZmlsdGVyKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIGZpbHRlciBkYXRhXG4gIGNvbnN0IHVwZGF0ZWRGaWx0ZXJzID0gWy4uLihzdGF0ZS5maWx0ZXJzIHx8IFtdKSwgLi4ubWVyZ2VkXTtcbiAgY29uc3QgZGF0YXNldFRvRmlsdGVyID0gdW5pcShtZXJnZWQubWFwKGQgPT4gZC5kYXRhSWQpKTtcblxuICBjb25zdCB1cGRhdGVkRGF0YXNldCA9IGRhdGFzZXRUb0ZpbHRlci5yZWR1Y2UoXG4gICAgKGFjY3UsIGRhdGFJZCkgPT4gKHtcbiAgICAgIC4uLmFjY3UsXG4gICAgICBbZGF0YUlkXToge1xuICAgICAgICAuLi5kYXRhc2V0c1tkYXRhSWRdLFxuICAgICAgICAuLi5maWx0ZXJEYXRhKGRhdGFzZXRzW2RhdGFJZF0uYWxsRGF0YSwgZGF0YUlkLCB1cGRhdGVkRmlsdGVycylcbiAgICAgIH1cbiAgICB9KSxcbiAgICBkYXRhc2V0c1xuICApO1xuXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgZmlsdGVyczogdXBkYXRlZEZpbHRlcnMsXG4gICAgZGF0YXNldHM6IHVwZGF0ZWREYXRhc2V0LFxuICAgIGZpbHRlclRvQmVNZXJnZWQ6IHVubWVyZ2VkXG4gIH07XG59XG5cbi8qKlxuICogTWVyZ2UgbGF5ZXJzIGZyb20gZGUtc2VyaWFsaXplZCBzdGF0ZSwgaWYgbm8gZmllbGRzIG9yIGRhdGEgYXJlIGxvYWRlZFxuICogc2F2ZSBpdCBmb3IgbGF0ZXJcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gc3RhdGVcbiAqIEBwYXJhbSB7T2JqZWN0W119IGxheWVyc1RvTWVyZ2VcbiAqIEByZXR1cm4ge09iamVjdH0gc3RhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlTGF5ZXJzKHN0YXRlLCBsYXllcnNUb01lcmdlKSB7XG4gIGNvbnN0IG1lcmdlZExheWVyID0gW107XG4gIGNvbnN0IHVubWVyZ2VkID0gW107XG5cbiAgY29uc3Qge2RhdGFzZXRzfSA9IHN0YXRlO1xuXG4gIGlmICghQXJyYXkuaXNBcnJheShsYXllcnNUb01lcmdlKSB8fCAhbGF5ZXJzVG9NZXJnZS5sZW5ndGgpIHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuICBsYXllcnNUb01lcmdlLmZvckVhY2gobGF5ZXIgPT4ge1xuICAgIGlmIChkYXRhc2V0c1tsYXllci5jb25maWcuZGF0YUlkXSkge1xuICAgICAgLy8gZGF0YXNldHMgYXJlIGFscmVhZHkgbG9hZGVkXG4gICAgICBjb25zdCB2YWxpZGF0ZUxheWVyID0gdmFsaWRhdGVMYXllcldpdGhEYXRhKFxuICAgICAgICBkYXRhc2V0c1tsYXllci5jb25maWcuZGF0YUlkXSxcbiAgICAgICAgbGF5ZXIsXG4gICAgICAgIHN0YXRlLmxheWVyQ2xhc3Nlc1xuICAgICAgKTtcblxuICAgICAgaWYgKHZhbGlkYXRlTGF5ZXIpIHtcbiAgICAgICAgbWVyZ2VkTGF5ZXIucHVzaCh2YWxpZGF0ZUxheWVyKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZGF0YXNldHMgbm90IHlldCBsb2FkZWRcbiAgICAgIHVubWVyZ2VkLnB1c2gobGF5ZXIpO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgbGF5ZXJzID0gWy4uLnN0YXRlLmxheWVycywgLi4ubWVyZ2VkTGF5ZXJdO1xuICBjb25zdCBuZXdMYXllck9yZGVyID0gbWVyZ2VkTGF5ZXIubWFwKChfLCBpKSA9PiBzdGF0ZS5sYXllcnMubGVuZ3RoICsgaSk7XG5cbiAgLy8gcHV0IG5ldyBsYXllcnMgaW4gZnJvbnQgb2YgY3VycmVudCBsYXllcnNcbiAgY29uc3QgbGF5ZXJPcmRlciA9IFsuLi5uZXdMYXllck9yZGVyLCAuLi5zdGF0ZS5sYXllck9yZGVyXTtcblxuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIGxheWVycyxcbiAgICBsYXllck9yZGVyLFxuICAgIGxheWVyVG9CZU1lcmdlZDogdW5tZXJnZWRcbiAgfTtcbn1cblxuLyoqXG4gKiBNZXJnZSBpbnRlcmFjdGlvbnMgd2l0aCBzYXZlZCBjb25maWdcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gc3RhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnRlcmFjdGlvblRvQmVNZXJnZWRcbiAqIEByZXR1cm4ge09iamVjdH0gbWVyZ2VkU3RhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlSW50ZXJhY3Rpb25zKHN0YXRlLCBpbnRlcmFjdGlvblRvQmVNZXJnZWQpIHtcbiAgY29uc3QgbWVyZ2VkID0ge307XG4gIGNvbnN0IHVubWVyZ2VkID0ge307XG5cbiAgaWYgKGludGVyYWN0aW9uVG9CZU1lcmdlZCkge1xuICAgIE9iamVjdC5rZXlzKGludGVyYWN0aW9uVG9CZU1lcmdlZCkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKCFzdGF0ZS5pbnRlcmFjdGlvbkNvbmZpZ1trZXldKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qge2VuYWJsZWQsIC4uLmNvbmZpZ1NhdmVkfSA9IGludGVyYWN0aW9uVG9CZU1lcmdlZFtrZXldIHx8IHt9O1xuICAgICAgbGV0IGNvbmZpZ1RvTWVyZ2UgPSBjb25maWdTYXZlZDtcblxuICAgICAgaWYgKGtleSA9PT0gJ3Rvb2x0aXAnKSB7XG4gICAgICAgIGNvbnN0IHttZXJnZWRUb29sdGlwLCB1bm1lcmdlZFRvb2x0aXB9ID0gbWVyZ2VJbnRlcmFjdGlvblRvb2x0aXBDb25maWcoXG4gICAgICAgICAgc3RhdGUsXG4gICAgICAgICAgY29uZmlnU2F2ZWRcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBtZXJnZSBuZXcgZGF0YXNldCB0b29sdGlwcyB3aXRoIG9yaWdpbmFsIGRhdGFzZXQgdG9vbHRpcHNcbiAgICAgICAgY29uZmlnVG9NZXJnZSA9IHtcbiAgICAgICAgICBmaWVsZHNUb1Nob3c6IHtcbiAgICAgICAgICAgIC4uLnN0YXRlLmludGVyYWN0aW9uQ29uZmlnW2tleV0uY29uZmlnLmZpZWxkc1RvU2hvdyxcbiAgICAgICAgICAgIC4uLm1lcmdlZFRvb2x0aXBcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHVubWVyZ2VkVG9vbHRpcCkubGVuZ3RoKSB7XG4gICAgICAgICAgdW5tZXJnZWQudG9vbHRpcCA9IHtmaWVsZHNUb1Nob3c6IHVubWVyZ2VkVG9vbHRpcCwgZW5hYmxlZH07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbWVyZ2VkW2tleV0gPSB7XG4gICAgICAgIC4uLnN0YXRlLmludGVyYWN0aW9uQ29uZmlnW2tleV0sXG4gICAgICAgIGVuYWJsZWQsXG4gICAgICAgIGNvbmZpZzogcGljayhcbiAgICAgICAgICB7XG4gICAgICAgICAgICAuLi5zdGF0ZS5pbnRlcmFjdGlvbkNvbmZpZ1trZXldLmNvbmZpZyxcbiAgICAgICAgICAgIC4uLmNvbmZpZ1RvTWVyZ2VcbiAgICAgICAgICB9LFxuICAgICAgICAgIE9iamVjdC5rZXlzKHN0YXRlLmludGVyYWN0aW9uQ29uZmlnW2tleV0uY29uZmlnKVxuICAgICAgICApXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBpbnRlcmFjdGlvbkNvbmZpZzoge1xuICAgICAgLi4uc3RhdGUuaW50ZXJhY3Rpb25Db25maWcsXG4gICAgICAuLi5tZXJnZWRcbiAgICB9LFxuICAgIGludGVyYWN0aW9uVG9CZU1lcmdlZDogdW5tZXJnZWRcbiAgfTtcbn1cblxuLyoqXG4gKiBNZXJnZSBpbnRlcmFjdGlvbkNvbmZpZy50b29sdGlwIHdpdGggc2F2ZWQgY29uZmlnLFxuICogdmFsaWRhdGUgZmllbGRzVG9TaG93XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gdG9vbHRpcENvbmZpZ1xuICogQHJldHVybiB7T2JqZWN0fSAtIHttZXJnZWRUb29sdGlwOiB7fSwgdW5tZXJnZWRUb29sdGlwOiB7fX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlSW50ZXJhY3Rpb25Ub29sdGlwQ29uZmlnKHN0YXRlLCB0b29sdGlwQ29uZmlnID0ge30pIHtcbiAgY29uc3QgdW5tZXJnZWRUb29sdGlwID0ge307XG4gIGNvbnN0IG1lcmdlZFRvb2x0aXAgPSB7fTtcblxuICBpZiAoXG4gICAgIXRvb2x0aXBDb25maWcuZmllbGRzVG9TaG93IHx8XG4gICAgIU9iamVjdC5rZXlzKHRvb2x0aXBDb25maWcuZmllbGRzVG9TaG93KS5sZW5ndGhcbiAgKSB7XG4gICAgcmV0dXJuIHttZXJnZWRUb29sdGlwLCB1bm1lcmdlZFRvb2x0aXB9O1xuICB9XG5cbiAgZm9yIChjb25zdCBkYXRhSWQgaW4gdG9vbHRpcENvbmZpZy5maWVsZHNUb1Nob3cpIHtcbiAgICBpZiAoIXN0YXRlLmRhdGFzZXRzW2RhdGFJZF0pIHtcbiAgICAgIC8vIGlzIG5vdCB5ZXQgbG9hZGVkXG4gICAgICB1bm1lcmdlZFRvb2x0aXBbZGF0YUlkXSA9IHRvb2x0aXBDb25maWcuZmllbGRzVG9TaG93W2RhdGFJZF07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIGRhdGFzZXQgaXMgbG9hZGVkXG4gICAgICBjb25zdCBhbGxGaWVsZHMgPSBzdGF0ZS5kYXRhc2V0c1tkYXRhSWRdLmZpZWxkcy5tYXAoZCA9PiBkLm5hbWUpO1xuICAgICAgY29uc3QgZm91bmRGaWVsZHNUb1Nob3cgPSB0b29sdGlwQ29uZmlnLmZpZWxkc1RvU2hvd1tkYXRhSWRdLmZpbHRlcihcbiAgICAgICAgbmFtZSA9PiBhbGxGaWVsZHMuaW5jbHVkZXMobmFtZSlcbiAgICAgICk7XG5cbiAgICAgIG1lcmdlZFRvb2x0aXBbZGF0YUlkXSA9IGZvdW5kRmllbGRzVG9TaG93O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7bWVyZ2VkVG9vbHRpcCwgdW5tZXJnZWRUb29sdGlwfTtcbn1cbi8qKlxuICogTWVyZ2UgbGF5ZXJCbGVuZGluZyB3aXRoIHNhdmVkXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHN0YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gbGF5ZXJCbGVuZGluZ1xuICogQHJldHVybiB7b2JqZWN0fSBtZXJnZWQgc3RhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlTGF5ZXJCbGVuZGluZyhzdGF0ZSwgbGF5ZXJCbGVuZGluZykge1xuICBpZiAobGF5ZXJCbGVuZGluZyAmJiBMQVlFUl9CTEVORElOR1NbbGF5ZXJCbGVuZGluZ10pIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBsYXllckJsZW5kaW5nXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBzdGF0ZTtcbn1cblxuLyoqXG4gKiBWYWxpZGF0ZSBzYXZlZCBsYXllciBjb2x1bW5zIHdpdGggbmV3IGRhdGEsXG4gKiB1cGRhdGUgZmllbGRJZHggYmFzZWQgb24gbmV3IGZpZWxkc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0W119IGZpZWxkc1xuICogQHBhcmFtIHtPYmplY3R9IHNhdmVkQ29sc1xuICogQHBhcmFtIHtPYmplY3R9IGVtcHR5Q29sc1xuICogQHJldHVybiB7bnVsbCB8IE9iamVjdH0gLSB2YWxpZGF0ZWQgY29sdW1ucyBvciBudWxsXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlU2F2ZWRMYXllckNvbHVtbnMoZmllbGRzLCBzYXZlZENvbHMsIGVtcHR5Q29scykge1xuICBjb25zdCBjb2xGb3VuZCA9IHt9O1xuICAvLyBmaW5kIGFjdHVhbCBjb2x1bW4gZmllbGRJZHgsIGluIGNhc2UgaXQgaGFzIGNoYW5nZWRcbiAgY29uc3QgYWxsQ29sRm91bmQgPSBPYmplY3Qua2V5cyhlbXB0eUNvbHMpLmV2ZXJ5KGtleSA9PiB7XG4gICAgY29uc3Qgc2F2ZWQgPSBzYXZlZENvbHNba2V5XTtcbiAgICBjb2xGb3VuZFtrZXldID0gey4uLmVtcHR5Q29sc1trZXldfTtcblxuICAgIGNvbnN0IGZpZWxkSWR4ID0gZmllbGRzLmZpbmRJbmRleCgoe25hbWV9KSA9PiBuYW1lID09PSBzYXZlZCk7XG5cbiAgICBpZiAoZmllbGRJZHggPiAtMSkge1xuICAgICAgLy8gdXBkYXRlIGZvdW5kIGNvbHVtbnNcbiAgICAgIGNvbEZvdW5kW2tleV0uZmllbGRJZHggPSBmaWVsZElkeDtcbiAgICAgIGNvbEZvdW5kW2tleV0udmFsdWUgPSBzYXZlZDtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIGlmIGNvbCBpcyBvcHRpb25hbCwgYWxsb3cgbnVsbCB2YWx1ZVxuICAgIHJldHVybiBlbXB0eUNvbHNba2V5XS5vcHRpb25hbCB8fCBmYWxzZTtcbiAgfSk7XG5cbiAgcmV0dXJuIGFsbENvbEZvdW5kICYmIGNvbEZvdW5kO1xufVxuXG4vKipcbiAqIFZhbGlkYXRlIHNhdmVkIHRleHQgbGFiZWwgY29uZmlnIHdpdGggbmV3IGRhdGFcbiAqIHJlZmVyIHRvIHZpcy1zdGF0ZS1zY2hlbWEuanMgVGV4dExhYmVsU2NoZW1hVjFcbiAqXG4gKiBAcGFyYW0ge09iamVjdFtdfSBmaWVsZHNcbiAqIEBwYXJhbSB7T2JqZWN0fSBzYXZlZFRleHRMYWJlbFxuICogQHJldHVybiB7T2JqZWN0fSAtIHZhbGlkYXRlZCB0ZXh0bGFiZWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlU2F2ZWRUZXh0TGFiZWwoZmllbGRzLCBsYXllclRleHRMYWJlbCwgc2F2ZWRUZXh0TGFiZWwpIHtcblxuICAvLyB2YWxpZGF0ZSBmaWVsZFxuICBjb25zdCBmaWVsZCA9IHNhdmVkVGV4dExhYmVsLmZpZWxkID8gZmllbGRzLmZpbmQoZmQgPT5cbiAgICBPYmplY3Qua2V5cyhzYXZlZFRleHRMYWJlbC5maWVsZCkuZXZlcnkoXG4gICAgICBrZXkgPT4gc2F2ZWRUZXh0TGFiZWwuZmllbGRba2V5XSA9PT0gZmRba2V5XVxuICAgIClcbiAgKSA6IG51bGw7XG5cbiAgcmV0dXJuIE9iamVjdC5rZXlzKGxheWVyVGV4dExhYmVsKS5yZWR1Y2UoKGFjY3UsIGtleSkgPT4gKHtcbiAgICAuLi5hY2N1LFxuICAgIFtrZXldOiBrZXkgPT09ICdmaWVsZCcgPyBmaWVsZCA6IChzYXZlZFRleHRMYWJlbFtrZXldIHx8IGxheWVyVGV4dExhYmVsW2tleV0pXG4gIH0pLCB7fSk7XG59XG5cbi8qKlxuICogVmFsaWRhdGUgc2F2ZWQgdmlzdWFsIGNoYW5uZWxzIGNvbmZpZyB3aXRoIG5ldyBkYXRhLFxuICogcmVmZXIgdG8gdmlzLXN0YXRlLXNjaGVtYS5qcyBWaXN1YWxDaGFubmVsU2NoZW1hVjFcbiAqXG4gKiBAcGFyYW0ge09iamVjdFtdfSBmaWVsZHNcbiAqIEBwYXJhbSB7T2JqZWN0fSB2aXN1YWxDaGFubmVsc1xuICogQHBhcmFtIHtPYmplY3R9IHNhdmVkTGF5ZXJcbiAqIEByZXR1cm4ge09iamVjdH0gLSB2YWxpZGF0ZWQgdmlzdWFsIGNoYW5uZWwgaW4gY29uZmlnIG9yIHt9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZVNhdmVkVmlzdWFsQ2hhbm5lbHMoXG4gIGZpZWxkcyxcbiAgdmlzdWFsQ2hhbm5lbHMsXG4gIHNhdmVkTGF5ZXJcbikge1xuICByZXR1cm4gT2JqZWN0LnZhbHVlcyh2aXN1YWxDaGFubmVscykucmVkdWNlKChmb3VuZCwge2ZpZWxkLCBzY2FsZX0pID0+IHtcbiAgICBsZXQgZm91bmRGaWVsZDtcbiAgICBpZiAoc2F2ZWRMYXllci5jb25maWdbZmllbGRdKSB7XG4gICAgICBmb3VuZEZpZWxkID0gZmllbGRzLmZpbmQoZmQgPT5cbiAgICAgICAgT2JqZWN0LmtleXMoc2F2ZWRMYXllci5jb25maWdbZmllbGRdKS5ldmVyeShcbiAgICAgICAgICBrZXkgPT4gc2F2ZWRMYXllci5jb25maWdbZmllbGRdW2tleV0gPT09IGZkW2tleV1cbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uZm91bmQsXG4gICAgICAuLi4oZm91bmRGaWVsZCA/IHtbZmllbGRdOiBmb3VuZEZpZWxkfSA6IHt9KSxcbiAgICAgIC4uLihzYXZlZExheWVyLmNvbmZpZ1tzY2FsZV0gPyB7W3NjYWxlXTogc2F2ZWRMYXllci5jb25maWdbc2NhbGVdfSA6IHt9KVxuICAgIH07XG4gIH0sIHt9KTtcbn1cblxuLyoqXG4gKiBWYWxpZGF0ZSBzYXZlZCBsYXllciBjb25maWcgd2l0aCBuZXcgZGF0YSxcbiAqIHVwZGF0ZSBmaWVsZElkeCBiYXNlZCBvbiBuZXcgZmllbGRzXG4gKlxuICogQHBhcmFtIHtPYmplY3RbXX0gZmllbGRzXG4gKiBAcGFyYW0ge1N0cmluZ30gZGF0YUlkXG4gKiBAcGFyYW0ge09iamVjdH0gc2F2ZWRMYXllclxuICogQHBhcmFtIHtPYmplY3R9IGxheWVyQ2xhc3Nlc1xuICogQHJldHVybiB7bnVsbCB8IE9iamVjdH0gLSB2YWxpZGF0ZWQgbGF5ZXIgb3IgbnVsbFxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVMYXllcldpdGhEYXRhKHtmaWVsZHMsIGlkOiBkYXRhSWR9LCBzYXZlZExheWVyLCBsYXllckNsYXNzZXMpIHtcbiAgY29uc3Qge3R5cGV9ID0gc2F2ZWRMYXllcjtcbiAgLy8gbGF5ZXIgZG9lc250IGhhdmUgYSB2YWxpZCB0eXBlXG4gIGlmIChcbiAgICAhbGF5ZXJDbGFzc2VzLmhhc093blByb3BlcnR5KHR5cGUpIHx8XG4gICAgIXNhdmVkTGF5ZXIuY29uZmlnIHx8XG4gICAgIXNhdmVkTGF5ZXIuY29uZmlnLmNvbHVtbnNcbiAgKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBuZXdMYXllciA9IG5ldyBsYXllckNsYXNzZXNbdHlwZV0oe1xuICAgIGlkOiBzYXZlZExheWVyLmlkLFxuICAgIGRhdGFJZCxcbiAgICBsYWJlbDogc2F2ZWRMYXllci5jb25maWcubGFiZWwsXG4gICAgY29sb3I6IHNhdmVkTGF5ZXIuY29uZmlnLmNvbG9yLFxuICAgIGlzVmlzaWJsZTogc2F2ZWRMYXllci5jb25maWcuaXNWaXNpYmxlXG4gIH0pO1xuXG4gIC8vIGZpbmQgY29sdW1uIGZpZWxkSWR4XG4gIGNvbnN0IGNvbHVtbnMgPSB2YWxpZGF0ZVNhdmVkTGF5ZXJDb2x1bW5zKFxuICAgIGZpZWxkcyxcbiAgICBzYXZlZExheWVyLmNvbmZpZy5jb2x1bW5zLFxuICAgIG5ld0xheWVyLmdldExheWVyQ29sdW1ucygpXG4gICk7XG5cbiAgaWYgKCFjb2x1bW5zKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyB2aXN1YWwgY2hhbm5lbCBmaWVsZCBpcyBzYXZlZCB0byBiZSB7bmFtZSwgdHlwZX1cbiAgLy8gZmluZCB2aXN1YWwgY2hhbm5lbCBmaWVsZCBieSBtYXRjaGluZyBib3RoIG5hbWUgYW5kIHR5cGVcbiAgLy8gcmVmZXIgdG8gdmlzLXN0YXRlLXNjaGVtYS5qcyBWaXN1YWxDaGFubmVsU2NoZW1hVjFcbiAgY29uc3QgZm91bmRWaXN1YWxDaGFubmVsQ29uZmlncyA9IHZhbGlkYXRlU2F2ZWRWaXN1YWxDaGFubmVscyhcbiAgICBmaWVsZHMsXG4gICAgbmV3TGF5ZXIudmlzdWFsQ2hhbm5lbHMsXG4gICAgc2F2ZWRMYXllclxuICApO1xuXG4gIGNvbnN0IHRleHRMYWJlbCA9IHNhdmVkTGF5ZXIuY29uZmlnLnRleHRMYWJlbCAmJiBuZXdMYXllci5jb25maWcudGV4dExhYmVsID8gdmFsaWRhdGVTYXZlZFRleHRMYWJlbChcbiAgICBmaWVsZHMsXG4gICAgbmV3TGF5ZXIuY29uZmlnLnRleHRMYWJlbCxcbiAgICBzYXZlZExheWVyLmNvbmZpZy50ZXh0TGFiZWxcbiAgKSA6IG5ld0xheWVyLmNvbmZpZy50ZXh0TGFiZWw7XG5cbiAgLy8gY29weSB2aXNDb25maWcgb3ZlciB0byBlbXB0eUxheWVyIHRvIG1ha2Ugc3VyZSBpdCBoYXMgYWxsIHRoZSBwcm9wc1xuICBjb25zdCB2aXNDb25maWcgPSBuZXdMYXllci5jb3B5TGF5ZXJDb25maWcoXG4gICAgbmV3TGF5ZXIuY29uZmlnLnZpc0NvbmZpZyxcbiAgICBzYXZlZExheWVyLmNvbmZpZy52aXNDb25maWcgfHwge30sXG4gICAge25vdFRvRGVlcE1lcmdlOiAnY29sb3JSYW5nZSd9XG4gICk7XG5cbiAgbmV3TGF5ZXIudXBkYXRlTGF5ZXJDb25maWcoe1xuICAgIGNvbHVtbnMsXG4gICAgdmlzQ29uZmlnLFxuICAgIHRleHRMYWJlbCxcbiAgICAuLi5mb3VuZFZpc3VhbENoYW5uZWxDb25maWdzXG4gIH0pO1xuXG4gIHJldHVybiBuZXdMYXllcjtcbn1cblxuLyoqXG4gKiBWYWxpZGF0ZSBzYXZlZCBmaWx0ZXIgY29uZmlnIHdpdGggbmV3IGRhdGEsXG4gKiBjYWxjdWxhdGUgZG9tYWluIGFuZCBmaWVsZElkeCBiYXNlZCBuZXcgZmllbGRzIGFuZCBkYXRhXG4gKlxuICogQHBhcmFtIHtPYmplY3RbXX0gZGF0YXNldC5maWVsZHNcbiAqIEBwYXJhbSB7T2JqZWN0W119IGRhdGFzZXQuYWxsRGF0YVxuICogQHBhcmFtIHtPYmplY3R9IGZpbHRlciAtIGZpbHRlciB0byBiZSB2YWxpZGF0ZVxuICogQHJldHVybiB7T2JqZWN0IHwgbnVsbH0gLSB2YWxpZGF0ZWQgZmlsdGVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUZpbHRlcldpdGhEYXRhKHtmaWVsZHMsIGFsbERhdGF9LCBmaWx0ZXIpIHtcbiAgLy8gbWF0Y2ggZmlsdGVyLm5hbWUgdG8gZmllbGQubmFtZVxuICBjb25zdCBmaWVsZElkeCA9IGZpZWxkcy5maW5kSW5kZXgoKHtuYW1lfSkgPT4gbmFtZSA9PT0gZmlsdGVyLm5hbWUpO1xuXG4gIGlmIChmaWVsZElkeCA8IDApIHtcbiAgICAvLyBpZiBjYW4ndCBmaW5kIGZpZWxkIHdpdGggc2FtZSBuYW1lLCBkaXNjaGFyZ2UgZmlsdGVyXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBmaWVsZCA9IGZpZWxkc1tmaWVsZElkeF07XG4gIGNvbnN0IHZhbHVlID0gZmlsdGVyLnZhbHVlO1xuXG4gIC8vIHJldHVybiBmaWx0ZXIgdHlwZSwgZGVmYXVsdCB2YWx1ZSwgZmllbGRUeXBlIGFuZCBmaWVsZERvbWFpbiBmcm9tIGZpZWxkXG4gIGNvbnN0IGZpbHRlclByb3BzRnJvbUZpZWxkID0gZ2V0RmlsdGVyUHJvcHMoYWxsRGF0YSwgZmllbGQpO1xuXG4gIGxldCBtYXRjaGVkRmlsdGVyID0ge1xuICAgIC4uLmdldERlZmF1bHRGaWx0ZXIoZmlsdGVyLmRhdGFJZCksXG4gICAgLi4uZmlsdGVyLFxuICAgIC4uLmZpbHRlclByb3BzRnJvbUZpZWxkLFxuICAgIGZyZWV6ZTogdHJ1ZSxcbiAgICBmaWVsZElkeFxuICB9O1xuXG4gIGNvbnN0IHt5QXhpc30gPSBtYXRjaGVkRmlsdGVyO1xuICBpZiAoeUF4aXMpIHtcbiAgICBjb25zdCBtYXRjaGVBeGlzID0gZmllbGRzLmZpbmQoXG4gICAgICAoe25hbWUsIHR5cGV9KSA9PiBuYW1lID09PSB5QXhpcy5uYW1lICYmIHR5cGUgPT09IHlBeGlzLnR5cGVcbiAgICApO1xuXG4gICAgbWF0Y2hlZEZpbHRlciA9IG1hdGNoZUF4aXNcbiAgICAgID8ge1xuICAgICAgICAgIC4uLm1hdGNoZWRGaWx0ZXIsXG4gICAgICAgICAgeUF4aXM6IG1hdGNoZUF4aXMsXG4gICAgICAgICAgLi4uZ2V0RmlsdGVyUGxvdCh7Li4ubWF0Y2hlZEZpbHRlciwgeUF4aXM6IG1hdGNoZUF4aXN9LCBhbGxEYXRhKVxuICAgICAgICB9XG4gICAgICA6IG1hdGNoZWRGaWx0ZXI7XG4gIH1cblxuICBtYXRjaGVkRmlsdGVyLnZhbHVlID0gYWRqdXN0VmFsdWVUb0ZpbHRlckRvbWFpbih2YWx1ZSwgbWF0Y2hlZEZpbHRlcik7XG5cbiAgaWYgKG1hdGNoZWRGaWx0ZXIudmFsdWUgPT09IG51bGwpIHtcbiAgICAvLyBjYW5udCBhZGp1c3Qgc2F2ZWQgdmFsdWUgdG8gZmlsdGVyXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gbWF0Y2hlZEZpbHRlcjtcbn1cbiJdfQ==