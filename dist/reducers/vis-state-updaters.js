"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.layerConfigChangeUpdater = layerConfigChangeUpdater;
exports.layerTypeChangeUpdater = layerTypeChangeUpdater;
exports.layerVisualChannelChangeUpdater = layerVisualChannelChangeUpdater;
exports.layerVisConfigChangeUpdater = layerVisConfigChangeUpdater;
exports.interactionConfigChangeUpdater = interactionConfigChangeUpdater;
exports.setFilterUpdater = setFilterUpdater;
exports.addDefaultLayers = addDefaultLayers;
exports.addDefaultTooltips = addDefaultTooltips;
exports.updateAllLayerDomainData = updateAllLayerDomainData;
exports.loadFilesErrUpdater = exports.loadFilesUpdater = exports.updateVisDataUpdater = exports.toggleLayerForMapUpdater = exports.setVisibleLayersForMapUpdater = exports.toggleSplitMapUpdater = exports.mapClickUpdater = exports.layerClickUpdater = exports.layerHoverUpdater = exports.receiveMapConfigUpdater = exports.resetMapConfigVisStateUpdater = exports.showDatasetTableUpdater = exports.updateLayerBlendingUpdater = exports.removeDatasetUpdater = exports.reorderLayerUpdater = exports.removeLayerUpdater = exports.addLayerUpdater = exports.removeFilterUpdater = exports.enlargeFilterUpdater = exports.updateAnimationSpeedUpdater = exports.toggleFilterAnimationUpdater = exports.addFilterUpdater = exports.setFilterPlotUpdater = exports.INITIAL_VIS_STATE = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _objectSpread13 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _window = require("global/window");

var _tasks = _interopRequireWildcard(require("react-palm/tasks"));

var _tasks2 = require("../tasks/tasks");

var _visStateActions = require("../actions/vis-state-actions");

var _actions = require("../actions");

var _interactionUtils = require("../utils/interaction-utils");

var _filterUtils = require("../utils/filter-utils");

var _datasetUtils = require("../utils/dataset-utils");

var _layerUtils = require("../utils/layer-utils/layer-utils");

var _visStateMerger = require("./vis-state-merger");

var _layers = require("../layers");

var _fileUtils = require("../utils/file-utils");

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return (0, _typeof2.default)(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if ((0, _typeof2.default)(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if ((0, _typeof2.default)(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

// react-palm
// disable capture exception for react-palm call to withTask
(0, _tasks.disableStackCapturing)();
/**
 * Default initial `visState`
 * @constant
 * @type {Object}
 * @property {Array} layers
 * @property {Array} layerData
 * @property {Array} layerToBeMerged
 * @property {Array} layerOrder
 * @property {Array} filters
 * @property {Array} filterToBeMerged
 * @property {Array} datasets
 * @property {string} editingDataset
 * @property {Object} interactionConfig
 * @property {Object} interactionToBeMerged
 * @property {string} layerBlending
 * @property {Object} hoverInfo
 * @property {Object} clicked
 * @property {boolean} fileLoading
 * @property {*} fileLoadingErr
 * @property {Array} splitMaps - a list of objects of layer availabilities and visibilities for each map
 * @public
 */

var INITIAL_VIS_STATE = {
  // layers
  layers: [],
  layerData: [],
  layerToBeMerged: [],
  layerOrder: [],
  // filters
  filters: [],
  filterToBeMerged: [],
  // a collection of multiple dataset
  datasets: {},
  editingDataset: undefined,
  interactionConfig: (0, _interactionUtils.getDefaultInteraction)(),
  interactionToBeMerged: undefined,
  layerBlending: 'normal',
  hoverInfo: undefined,
  clicked: undefined,
  // TODO: not used anywhere, delete it
  fileLoading: false,
  fileLoadingErr: null,
  // this is used when user split maps
  splitMaps: [// this will contain a list of objects to
    // describe the state of layer availability and visibility for each map
    // [
    //   {
    //     layers: {
    //       layer_id: {
    //         isAvailable: true|false # this is driven by the left hand panel
    //         isVisible: true|false
    //       }
    //     }
    //   }
    // ]
  ],
  // defaults layer classes
  layerClasses: _layers.LayerClasses
};
exports.INITIAL_VIS_STATE = INITIAL_VIS_STATE;

function updateStateWithLayerAndData(state, _ref) {
  var layerData = _ref.layerData,
      layer = _ref.layer,
      idx = _ref.idx;
  return (0, _objectSpread13.default)({}, state, {
    layers: state.layers.map(function (lyr, i) {
      return i === idx ? layer : lyr;
    }),
    layerData: layerData ? state.layerData.map(function (d, i) {
      return i === idx ? layerData : d;
    }) : state.layerData
  });
}
/**
 * Called to update layer base config: dataId, label, column, isVisible
 * @public
 */


function layerConfigChangeUpdater(state, action) {
  var oldLayer = action.oldLayer;
  var idx = state.layers.findIndex(function (l) {
    return l.id === oldLayer.id;
  });
  var props = Object.keys(action.newConfig);
  var newLayer = oldLayer.updateLayerConfig(action.newConfig);

  if (newLayer.shouldCalculateLayerData(props)) {
    var oldLayerData = state.layerData[idx];

    var _calculateLayerData = (0, _layerUtils.calculateLayerData)(newLayer, state, oldLayerData, {
      sameData: true
    }),
        layerData = _calculateLayerData.layerData,
        layer = _calculateLayerData.layer;

    return updateStateWithLayerAndData(state, {
      layerData: layerData,
      layer: layer,
      idx: idx
    });
  }

  var newState = (0, _objectSpread13.default)({}, state, {
    splitMaps: 'isVisible' in action.newConfig ? toggleLayerFromSplitMaps(state, newLayer) : state.splitMaps
  });
  return updateStateWithLayerAndData(newState, {
    layer: newLayer,
    idx: idx
  });
}
/**
 * Update layer type
 * @public
 */


function layerTypeChangeUpdater(state, action) {
  var oldLayer = action.oldLayer,
      newType = action.newType;
  var oldId = oldLayer.id;
  var idx = state.layers.findIndex(function (l) {
    return l.id === oldId;
  });

  if (!state.layerClasses[newType]) {
    _window.console.error("".concat(newType, " is not a valid layer type"));

    return state;
  } // get a mint layer, with new id and type
  // because deck.gl uses id to match between new and old layer.
  // If type has changed but id is the same, it will break


  var newLayer = new state.layerClasses[newType]();
  newLayer.assignConfigToLayer(oldLayer.config, oldLayer.visConfigSettings);

  if (newLayer.config.dataId) {
    var dataset = state.datasets[newLayer.config.dataId];
    newLayer.updateLayerDomain(dataset);
  }

  var _calculateLayerData2 = (0, _layerUtils.calculateLayerData)(newLayer, state),
      layerData = _calculateLayerData2.layerData,
      layer = _calculateLayerData2.layer;

  var newState = state; // update splitMap layer id

  if (state.splitMaps) {
    newState = (0, _objectSpread13.default)({}, state, {
      splitMaps: state.splitMaps.map(function (settings) {
        var _settings$layers = settings.layers,
            oldLayerMap = _settings$layers[oldId],
            otherLayers = (0, _objectWithoutProperties2.default)(_settings$layers, [oldId].map(_toPropertyKey));
        return (0, _objectSpread13.default)({}, settings, {
          layers: (0, _objectSpread13.default)({}, otherLayers, (0, _defineProperty2.default)({}, layer.id, oldLayerMap))
        });
      })
    });
  }

  return updateStateWithLayerAndData(newState, {
    layerData: layerData,
    layer: layer,
    idx: idx
  });
}
/**
 * Update layer visual channel
 * @public
 */


function layerVisualChannelChangeUpdater(state, action) {
  var oldLayer = action.oldLayer,
      newConfig = action.newConfig,
      channel = action.channel;
  var dataset = state.datasets[oldLayer.config.dataId];
  var idx = state.layers.findIndex(function (l) {
    return l.id === oldLayer.id;
  });
  var newLayer = oldLayer.updateLayerConfig(newConfig);
  newLayer.updateLayerVisualChannel(dataset, channel);
  var oldLayerData = state.layerData[idx];

  var _calculateLayerData3 = (0, _layerUtils.calculateLayerData)(newLayer, state, oldLayerData, {
    sameData: true
  }),
      layerData = _calculateLayerData3.layerData,
      layer = _calculateLayerData3.layer;

  return updateStateWithLayerAndData(state, {
    layerData: layerData,
    layer: layer,
    idx: idx
  });
}
/**
 * Update layer vis config
 * @public
 */


function layerVisConfigChangeUpdater(state, action) {
  var oldLayer = action.oldLayer;
  var idx = state.layers.findIndex(function (l) {
    return l.id === oldLayer.id;
  });
  var props = Object.keys(action.newVisConfig);
  var newVisConfig = (0, _objectSpread13.default)({}, oldLayer.config.visConfig, action.newVisConfig);
  var newLayer = oldLayer.updateLayerConfig({
    visConfig: newVisConfig
  });

  if (newLayer.shouldCalculateLayerData(props)) {
    var oldLayerData = state.layerData[idx];

    var _calculateLayerData4 = (0, _layerUtils.calculateLayerData)(newLayer, state, oldLayerData, {
      sameData: true
    }),
        layerData = _calculateLayerData4.layerData,
        layer = _calculateLayerData4.layer;

    return updateStateWithLayerAndData(state, {
      layerData: layerData,
      layer: layer,
      idx: idx
    });
  }

  return updateStateWithLayerAndData(state, {
    layer: newLayer,
    idx: idx
  });
}
/* eslint-enable max-statements */

/**
 * Update interactionConfig
 * @public
 */


function interactionConfigChangeUpdater(state, action) {
  var config = action.config;
  var interactionConfig = (0, _objectSpread13.default)({}, state.interactionConfig, (0, _defineProperty2.default)({}, config.id, config));

  if (config.enabled && !state.interactionConfig[config.id].enabled) {
    // only enable one interaction at a time
    Object.keys(interactionConfig).forEach(function (k) {
      if (k !== config.id) {
        interactionConfig[k] = (0, _objectSpread13.default)({}, interactionConfig[k], {
          enabled: false
        });
      }
    });
  }

  return (0, _objectSpread13.default)({}, state, {
    interactionConfig: interactionConfig
  });
}
/**
 * Update filter
 * @public
 */


function setFilterUpdater(state, action) {
  var idx = action.idx,
      prop = action.prop,
      value = action.value;
  var newState = state;
  var newFilter = (0, _objectSpread13.default)({}, state.filters[idx], (0, _defineProperty2.default)({}, prop, value));
  var _newFilter = newFilter,
      dataId = _newFilter.dataId;

  if (!dataId) {
    return state;
  }

  var _state$datasets$dataI = state.datasets[dataId],
      fields = _state$datasets$dataI.fields,
      allData = _state$datasets$dataI.allData;

  switch (prop) {
    case 'dataId':
      // if trying to update filter dataId. create an empty new filter
      newFilter = (0, _filterUtils.getDefaultFilter)(dataId);
      break;

    case 'name':
      // find the field
      var fieldIdx = fields.findIndex(function (f) {
        return f.name === value;
      });
      var field = fields[fieldIdx];

      if (!field.filterProp) {
        // get filter domain from field
        // save filterProps: {domain, steps, value} to field, avoid recalculate
        field = (0, _objectSpread13.default)({}, field, {
          filterProp: (0, _filterUtils.getFilterProps)(allData, field)
        });
      }

      newFilter = (0, _objectSpread13.default)({}, newFilter, field.filterProp, {
        name: field.name,
        // can't edit dataId once name is selected
        freeze: true,
        fieldIdx: fieldIdx
      });
      var enlargedFilterIdx = state.filters.findIndex(function (f) {
        return f.enlarged;
      });

      if (enlargedFilterIdx > -1 && enlargedFilterIdx !== idx) {
        // there should be only one enlarged filter
        newFilter.enlarged = false;
      }

      newState = (0, _objectSpread13.default)({}, state, {
        datasets: (0, _objectSpread13.default)({}, state.datasets, (0, _defineProperty2.default)({}, dataId, (0, _objectSpread13.default)({}, state.datasets[dataId], {
          fields: fields.map(function (d, i) {
            return i === fieldIdx ? field : d;
          })
        })))
      });
      break;

    case 'value':
    default:
      break;
  } // save new filters to newState


  newState = (0, _objectSpread13.default)({}, newState, {
    filters: state.filters.map(function (f, i) {
      return i === idx ? newFilter : f;
    })
  }); // filter data

  newState = (0, _objectSpread13.default)({}, newState, {
    datasets: (0, _objectSpread13.default)({}, newState.datasets, (0, _defineProperty2.default)({}, dataId, (0, _objectSpread13.default)({}, newState.datasets[dataId], (0, _filterUtils.filterData)(allData, dataId, newState.filters))))
  });
  newState = updateAllLayerDomainData(newState, dataId, newFilter);
  return newState;
}
/**
 * Update filter plot
 * @public
 */


var setFilterPlotUpdater = function setFilterPlotUpdater(state, _ref2) {
  var idx = _ref2.idx,
      newProp = _ref2.newProp;
  var newFilter = (0, _objectSpread13.default)({}, state.filters[idx], newProp);
  var prop = Object.keys(newProp)[0];

  if (prop === 'yAxis') {
    var plotType = (0, _filterUtils.getDefaultFilterPlotType)(newFilter);

    if (plotType) {
      newFilter = (0, _objectSpread13.default)({}, newFilter, (0, _filterUtils.getFilterPlot)((0, _objectSpread13.default)({}, newFilter, {
        plotType: plotType
      }), state.datasets[newFilter.dataId].allData), {
        plotType: plotType
      });
    }
  }

  return (0, _objectSpread13.default)({}, state, {
    filters: state.filters.map(function (f, i) {
      return i === idx ? newFilter : f;
    })
  });
};
/**
 * Add filter
 * @public
 */


exports.setFilterPlotUpdater = setFilterPlotUpdater;

var addFilterUpdater = function addFilterUpdater(state, action) {
  return !action.dataId ? state : (0, _objectSpread13.default)({}, state, {
    filters: [].concat((0, _toConsumableArray2.default)(state.filters), [(0, _filterUtils.getDefaultFilter)(action.dataId)])
  });
};
/**
 * toggle filter animation
 * @public
 */


exports.addFilterUpdater = addFilterUpdater;

var toggleFilterAnimationUpdater = function toggleFilterAnimationUpdater(state, action) {
  return (0, _objectSpread13.default)({}, state, {
    filters: state.filters.map(function (f, i) {
      return i === action.idx ? (0, _objectSpread13.default)({}, f, {
        isAnimating: !f.isAnimating
      }) : f;
    })
  });
};
/**
 * update filter animation speed
 * @public
 */


exports.toggleFilterAnimationUpdater = toggleFilterAnimationUpdater;

var updateAnimationSpeedUpdater = function updateAnimationSpeedUpdater(state, action) {
  return (0, _objectSpread13.default)({}, state, {
    filters: state.filters.map(function (f, i) {
      return i === action.idx ? (0, _objectSpread13.default)({}, f, {
        speed: action.speed
      }) : f;
    })
  });
};
/**
 * enlarge filter to time playback (apply to time filter only)
 * @public
 */


exports.updateAnimationSpeedUpdater = updateAnimationSpeedUpdater;

var enlargeFilterUpdater = function enlargeFilterUpdater(state, action) {
  var isEnlarged = state.filters[action.idx].enlarged;
  return (0, _objectSpread13.default)({}, state, {
    filters: state.filters.map(function (f, i) {
      f.enlarged = !isEnlarged && i === action.idx;
      return f;
    })
  });
};
/**
 * remove filter
 * @public
 */


exports.enlargeFilterUpdater = enlargeFilterUpdater;

var removeFilterUpdater = function removeFilterUpdater(state, action) {
  var idx = action.idx;
  var dataId = state.filters[idx].dataId;
  var newFilters = [].concat((0, _toConsumableArray2.default)(state.filters.slice(0, idx)), (0, _toConsumableArray2.default)(state.filters.slice(idx + 1, state.filters.length)));
  var newState = (0, _objectSpread13.default)({}, state, {
    datasets: (0, _objectSpread13.default)({}, state.datasets, (0, _defineProperty2.default)({}, dataId, (0, _objectSpread13.default)({}, state.datasets[dataId], (0, _filterUtils.filterData)(state.datasets[dataId].allData, dataId, newFilters)))),
    filters: newFilters
  });
  return updateAllLayerDomainData(newState, dataId);
};
/**
 * add layer
 * @public
 */


exports.removeFilterUpdater = removeFilterUpdater;

var addLayerUpdater = function addLayerUpdater(state, action) {
  var defaultDataset = Object.keys(state.datasets)[0];
  var newLayer = new _layers.Layer((0, _objectSpread13.default)({
    isVisible: true,
    isConfigActive: true,
    dataId: defaultDataset
  }, action.props));
  return (0, _objectSpread13.default)({}, state, {
    layers: [].concat((0, _toConsumableArray2.default)(state.layers), [newLayer]),
    layerData: [].concat((0, _toConsumableArray2.default)(state.layerData), [{}]),
    layerOrder: [].concat((0, _toConsumableArray2.default)(state.layerOrder), [state.layerOrder.length]),
    splitMaps: addNewLayersToSplitMap(state.splitMaps, newLayer)
  });
};
/**
 * remove layer
 * @public
 */


exports.addLayerUpdater = addLayerUpdater;

var removeLayerUpdater = function removeLayerUpdater(state, _ref3) {
  var idx = _ref3.idx;
  var layers = state.layers,
      layerData = state.layerData,
      clicked = state.clicked,
      hoverInfo = state.hoverInfo;
  var layerToRemove = state.layers[idx];
  var newMaps = removeLayerFromSplitMaps(state, layerToRemove);
  return (0, _objectSpread13.default)({}, state, {
    layers: [].concat((0, _toConsumableArray2.default)(layers.slice(0, idx)), (0, _toConsumableArray2.default)(layers.slice(idx + 1, layers.length))),
    layerData: [].concat((0, _toConsumableArray2.default)(layerData.slice(0, idx)), (0, _toConsumableArray2.default)(layerData.slice(idx + 1, layerData.length))),
    layerOrder: state.layerOrder.filter(function (i) {
      return i !== idx;
    }).map(function (pid) {
      return pid > idx ? pid - 1 : pid;
    }),
    clicked: layerToRemove.isLayerHovered(clicked) ? undefined : clicked,
    hoverInfo: layerToRemove.isLayerHovered(hoverInfo) ? undefined : hoverInfo,
    splitMaps: newMaps
  });
};
/**
 * reorder layer, update layerOrder
 * @public
 */


exports.removeLayerUpdater = removeLayerUpdater;

var reorderLayerUpdater = function reorderLayerUpdater(state, _ref4) {
  var order = _ref4.order;
  return (0, _objectSpread13.default)({}, state, {
    layerOrder: order
  });
};
/**
 * remove a dataset and all layers, filters, tooltip configs that based on it
 * @public
 */


exports.reorderLayerUpdater = reorderLayerUpdater;

var removeDatasetUpdater = function removeDatasetUpdater(state, action) {
  // extract dataset key
  var datasetKey = action.key;
  var datasets = state.datasets; // check if dataset is present

  if (!datasets[datasetKey]) {
    return state;
  }
  /* eslint-disable no-unused-vars */


  var layers = state.layers,
      _state$datasets = state.datasets,
      dataset = _state$datasets[datasetKey],
      newDatasets = (0, _objectWithoutProperties2.default)(_state$datasets, [datasetKey].map(_toPropertyKey));
  /* eslint-enable no-unused-vars */

  var indexes = layers.reduce(function (listOfIndexes, layer, index) {
    if (layer.config.dataId === datasetKey) {
      listOfIndexes.push(index);
    }

    return listOfIndexes;
  }, []); // remove layers and datasets

  var _indexes$reduce = indexes.reduce(function (_ref5, idx) {
    var currentState = _ref5.newState,
        indexCounter = _ref5.indexCounter;
    var currentIndex = idx - indexCounter;
    currentState = removeLayerUpdater(currentState, {
      idx: currentIndex
    });
    indexCounter++;
    return {
      newState: currentState,
      indexCounter: indexCounter
    };
  }, {
    newState: (0, _objectSpread13.default)({}, state, {
      datasets: newDatasets
    }),
    indexCounter: 0
  }),
      newState = _indexes$reduce.newState; // remove filters


  var filters = state.filters.filter(function (filter) {
    return filter.dataId !== datasetKey;
  }); // update interactionConfig

  var interactionConfig = state.interactionConfig;
  var _interactionConfig = interactionConfig,
      tooltip = _interactionConfig.tooltip;

  if (tooltip) {
    var config = tooltip.config;
    /* eslint-disable no-unused-vars */

    var _config$fieldsToShow = config.fieldsToShow,
        fields = _config$fieldsToShow[datasetKey],
        fieldsToShow = (0, _objectWithoutProperties2.default)(_config$fieldsToShow, [datasetKey].map(_toPropertyKey));
    /* eslint-enable no-unused-vars */

    interactionConfig = (0, _objectSpread13.default)({}, interactionConfig, {
      tooltip: (0, _objectSpread13.default)({}, tooltip, {
        config: (0, _objectSpread13.default)({}, config, {
          fieldsToShow: fieldsToShow
        })
      })
    });
  }

  return (0, _objectSpread13.default)({}, newState, {
    filters: filters,
    interactionConfig: interactionConfig
  });
};
/**
 * update layer blending
 * @public
 */


exports.removeDatasetUpdater = removeDatasetUpdater;

var updateLayerBlendingUpdater = function updateLayerBlendingUpdater(state, action) {
  return (0, _objectSpread13.default)({}, state, {
    layerBlending: action.mode
  });
};
/**
 * show dataset table
 * @public
 */


exports.updateLayerBlendingUpdater = updateLayerBlendingUpdater;

var showDatasetTableUpdater = function showDatasetTableUpdater(state, action) {
  return (0, _objectSpread13.default)({}, state, {
    editingDataset: action.dataId
  });
};
/**
 * reset visState to initial State
 * @public
 */


exports.showDatasetTableUpdater = showDatasetTableUpdater;

var resetMapConfigVisStateUpdater = function resetMapConfigVisStateUpdater(state, action) {
  return (0, _objectSpread13.default)({}, INITIAL_VIS_STATE, state.initialState, {
    initialState: state.initialState
  });
};
/**
 * Loads custom configuration into state
 * @param state
 * @param action
 * @returns {*}
 * @public
 */


exports.resetMapConfigVisStateUpdater = resetMapConfigVisStateUpdater;

var receiveMapConfigUpdater = function receiveMapConfigUpdater(state, action) {
  if (!action.payload.visState) {
    return state;
  }

  var _action$payload$visSt = action.payload.visState,
      filters = _action$payload$visSt.filters,
      layers = _action$payload$visSt.layers,
      interactionConfig = _action$payload$visSt.interactionConfig,
      layerBlending = _action$payload$visSt.layerBlending,
      splitMaps = _action$payload$visSt.splitMaps; // always reset config when receive a new config

  var resetState = resetMapConfigVisStateUpdater(state);
  var mergedState = (0, _objectSpread13.default)({}, resetState, {
    splitMaps: splitMaps || [] // maps doesn't require any logic

  });
  mergedState = (0, _visStateMerger.mergeFilters)(mergedState, filters);
  mergedState = (0, _visStateMerger.mergeLayers)(mergedState, layers);
  mergedState = (0, _visStateMerger.mergeInteractions)(mergedState, interactionConfig);
  mergedState = (0, _visStateMerger.mergeLayerBlending)(mergedState, layerBlending);
  return mergedState;
};
/**
 * update hovered object
 * @param {*} state
 * @param {*} action
 * @public
 */


exports.receiveMapConfigUpdater = receiveMapConfigUpdater;

var layerHoverUpdater = function layerHoverUpdater(state, action) {
  return (0, _objectSpread13.default)({}, state, {
    hoverInfo: action.info
  });
};
/**
 * update clicked object
 * @param {*} state
 * @param {*} action
 * @public
 */


exports.layerHoverUpdater = layerHoverUpdater;

var layerClickUpdater = function layerClickUpdater(state, action) {
  return (0, _objectSpread13.default)({}, state, {
    clicked: action.info && action.info.picked ? action.info : null
  });
};
/**
 * action triggered by clicking on map
 * @param {*} state
 * @param {*} action
 * @public
 */


exports.layerClickUpdater = layerClickUpdater;

var mapClickUpdater = function mapClickUpdater(state, action) {
  return (0, _objectSpread13.default)({}, state, {
    clicked: null
  });
};
/**
 * toggle split map
 * @param {*} state
 * @param {*} action
 * @public
 */


exports.mapClickUpdater = mapClickUpdater;

var toggleSplitMapUpdater = function toggleSplitMapUpdater(state, action) {
  return state.splitMaps && state.splitMaps.length === 0 ? (0, _objectSpread13.default)({}, state, {
    // maybe we should use an array to store state for a single map as well
    // if current maps length is equal to 0 it means that we are about to split the view
    splitMaps: computeSplitMapLayers(state.layers)
  }) : closeSpecificMapAtIndex(state, action);
};
/**
 * This is triggered when view is split into multiple maps.
 * It will only update layers that belong to the map layer dropdown
 * the user is interacting wit
 * @param state
 * @param action
 * @public
 */


exports.toggleSplitMapUpdater = toggleSplitMapUpdater;

var setVisibleLayersForMapUpdater = function setVisibleLayersForMapUpdater(state, action) {
  var mapIndex = action.mapIndex,
      layerIds = action.layerIds;

  if (!layerIds) {
    return state;
  }

  var _state$splitMaps = state.splitMaps,
      splitMaps = _state$splitMaps === void 0 ? [] : _state$splitMaps;

  if (splitMaps.length === 0) {
    // we should never get into this state
    // because this action should only be triggered
    // when map view is split
    // but something may have happened
    return state;
  } // need to check if maps is populated otherwise will create


  var _splitMaps$mapIndex = splitMaps[mapIndex],
      map = _splitMaps$mapIndex === void 0 ? {} : _splitMaps$mapIndex;
  var layers = map.layers || []; // we set visibility to true for all layers included in our input list

  var newLayers = (Object.keys(layers) || []).reduce(function (currentLayers, idx) {
    return (0, _objectSpread13.default)({}, currentLayers, (0, _defineProperty2.default)({}, idx, (0, _objectSpread13.default)({}, layers[idx], {
      isVisible: layerIds.includes(idx)
    })));
  }, {});
  var newMaps = (0, _toConsumableArray2.default)(splitMaps);
  newMaps[mapIndex] = (0, _objectSpread13.default)({}, splitMaps[mapIndex], {
    layers: newLayers
  });
  return (0, _objectSpread13.default)({}, state, {
    splitMaps: newMaps
  });
};
/**
 * Toggle split map layer visibility
 * @param {*} state
 * @param {*} action
 */


exports.setVisibleLayersForMapUpdater = setVisibleLayersForMapUpdater;

var toggleLayerForMapUpdater = function toggleLayerForMapUpdater(state, action) {
  if (!state.splitMaps[action.mapIndex]) {
    return state;
  }

  var mapSettings = state.splitMaps[action.mapIndex];
  var layers = mapSettings.layers;

  if (!layers || !layers[action.layerId]) {
    return state;
  }

  var layer = layers[action.layerId];
  var newLayer = (0, _objectSpread13.default)({}, layer, {
    isVisible: !layer.isVisible
  });
  var newLayers = (0, _objectSpread13.default)({}, layers, (0, _defineProperty2.default)({}, action.layerId, newLayer)); // const splitMaps = state.splitMaps;

  var newSplitMaps = (0, _toConsumableArray2.default)(state.splitMaps);
  newSplitMaps[action.mapIndex] = (0, _objectSpread13.default)({}, mapSettings, {
    layers: newLayers
  });
  return (0, _objectSpread13.default)({}, state, {
    splitMaps: newSplitMaps
  });
};
/**
 * Add new datasets
 * @param {*} state
 * @param {*} action
 * @public
 */

/* eslint-disable max-statements */


exports.toggleLayerForMapUpdater = toggleLayerForMapUpdater;

var updateVisDataUpdater = function updateVisDataUpdater(state, action) {
  // datasets can be a single data entries or an array of multiple data entries
  var datasets = Array.isArray(action.datasets) ? action.datasets : [action.datasets];

  if (action.config) {
    // apply config if passed from action
    state = receiveMapConfigUpdater(state, {
      payload: {
        visState: action.config
      }
    });
  }

  var newDateEntries = datasets.reduce(function (accu, _ref6) {
    var _ref6$info = _ref6.info,
        info = _ref6$info === void 0 ? {} : _ref6$info,
        data = _ref6.data;
    return (0, _objectSpread13.default)({}, accu, (0, _datasetUtils.createNewDataEntry)({
      info: info,
      data: data
    }, state.datasets) || {});
  }, {});

  if (!Object.keys(newDateEntries).length) {
    return state;
  }

  var stateWithNewData = (0, _objectSpread13.default)({}, state, {
    datasets: (0, _objectSpread13.default)({}, state.datasets, newDateEntries)
  }); // previously saved config before data loaded

  var _stateWithNewData$fil = stateWithNewData.filterToBeMerged,
      filterToBeMerged = _stateWithNewData$fil === void 0 ? [] : _stateWithNewData$fil,
      _stateWithNewData$lay = stateWithNewData.layerToBeMerged,
      layerToBeMerged = _stateWithNewData$lay === void 0 ? [] : _stateWithNewData$lay,
      _stateWithNewData$int = stateWithNewData.interactionToBeMerged,
      interactionToBeMerged = _stateWithNewData$int === void 0 ? {} : _stateWithNewData$int; // merge state with saved filters

  var mergedState = (0, _visStateMerger.mergeFilters)(stateWithNewData, filterToBeMerged); // merge state with saved layers

  mergedState = (0, _visStateMerger.mergeLayers)(mergedState, layerToBeMerged);

  if (mergedState.layers.length === state.layers.length) {
    // no layer merged, find defaults
    mergedState = addDefaultLayers(mergedState, newDateEntries);
  }

  if (mergedState.splitMaps.length) {
    var newLayers = mergedState.layers.filter(function (l) {
      return l.config.dataId in newDateEntries;
    }); // if map is splited, add new layers to splitMaps

    mergedState = (0, _objectSpread13.default)({}, mergedState, {
      splitMaps: addNewLayersToSplitMap(mergedState.splitMaps, newLayers)
    });
  } // merge state with saved interactions


  mergedState = (0, _visStateMerger.mergeInteractions)(mergedState, interactionToBeMerged); // if no tooltips merged add default tooltips

  Object.keys(newDateEntries).forEach(function (dataId) {
    var tooltipFields = mergedState.interactionConfig.tooltip.config.fieldsToShow[dataId];

    if (!Array.isArray(tooltipFields) || !tooltipFields.length) {
      mergedState = addDefaultTooltips(mergedState, newDateEntries[dataId]);
    }
  });
  return updateAllLayerDomainData(mergedState, Object.keys(newDateEntries));
};
/* eslint-enable max-statements */


exports.updateVisDataUpdater = updateVisDataUpdater;

function generateLayerMetaForSplitViews(layer) {
  return {
    isAvailable: layer.config.isVisible,
    isVisible: layer.config.isVisible
  };
}
/**
 * This method will compute the default maps custom list
 * based on the current layers status
 * @param layers
 * @returns {[*,*]}
 */


function computeSplitMapLayers(layers) {
  var mapLayers = layers.reduce(function (newLayers, currentLayer) {
    return (0, _objectSpread13.default)({}, newLayers, (0, _defineProperty2.default)({}, currentLayer.id, generateLayerMetaForSplitViews(currentLayer)));
  }, {});
  return [{
    layers: mapLayers
  }, {
    layers: mapLayers
  }];
}
/**
 * Remove an existing layer from custom map layer objects
 * @param state
 * @param layer
 * @returns {[*,*]} Maps of custom layer objects
 */


function removeLayerFromSplitMaps(state, layer) {
  return state.splitMaps.map(function (settings) {
    var layers = settings.layers;
    /* eslint-disable no-unused-vars */

    var _ = layers[layer.id],
        newLayers = (0, _objectWithoutProperties2.default)(layers, [layer.id].map(_toPropertyKey));
    /* eslint-enable no-unused-vars */

    return (0, _objectSpread13.default)({}, settings, {
      layers: newLayers
    });
  });
}
/**
 * Add new layers to both existing maps
 * @param splitMaps
 * @param layers
 * @returns {[*,*]} new splitMaps
 */


function addNewLayersToSplitMap(splitMaps, layers) {
  var newLayers = Array.isArray(layers) ? layers : [layers];

  if (!splitMaps || !splitMaps.length || !newLayers.length) {
    return splitMaps;
  } // add new layer to both maps,
  //  don't override, if layer.id is already in splitMaps.settings.layers


  return splitMaps.map(function (settings) {
    return (0, _objectSpread13.default)({}, settings, {
      layers: (0, _objectSpread13.default)({}, settings.layers, newLayers.reduce(function (accu, newLayer) {
        return newLayer.config.isVisible ? (0, _objectSpread13.default)({}, accu, (0, _defineProperty2.default)({}, newLayer.id, settings.layers[newLayer.id] ? settings.layers[newLayer.id] : generateLayerMetaForSplitViews(newLayer))) : accu;
      }, {}))
    });
  });
}
/**
 * Hide an existing layers from custom map layer objects
 * @param state
 * @param layer
 * @returns {[*,*]} Maps of custom layer objects
 */


function toggleLayerFromSplitMaps(state, layer) {
  return state.splitMaps.map(function (settings) {
    var layers = settings.layers;
    var newLayers = (0, _objectSpread13.default)({}, layers, (0, _defineProperty2.default)({}, layer.id, generateLayerMetaForSplitViews(layer)));
    return (0, _objectSpread13.default)({}, settings, {
      layers: newLayers
    });
  });
}
/**
 * When a user clicks on the specific map closing icon
 * the application will close the selected map
 * and will merge the remaining one with the global state
 * TODO: i think in the future this action should be called merge map layers with global settings
 * @param state
 * @param action
 * @returns {*}
 */


function closeSpecificMapAtIndex(state, action) {
  // retrieve layers meta data from the remaining map that we need to keep
  var indexToRetrieve = 1 - action.payload;
  var metaSettings = state.splitMaps[indexToRetrieve];

  if (!metaSettings || !metaSettings.layers) {
    // if we can't find the meta settings we simply clean up splitMaps and
    // keep global state as it is
    // but why does this ever happen?
    return (0, _objectSpread13.default)({}, state, {
      splitMaps: []
    });
  }

  var layers = state.layers; // update layer visibility

  var newLayers = layers.map(function (layer) {
    return layer.updateLayerConfig({
      isVisible: metaSettings.layers[layer.id] ? metaSettings.layers[layer.id].isVisible : layer.config.isVisible
    });
  }); // delete map

  return (0, _objectSpread13.default)({}, state, {
    layers: newLayers,
    splitMaps: []
  });
}
/**
 * Trigger file loading dispatch `addDataToMap` if succeed, or `loadFilesErr` if failed
 * @param {*} state
 * @param {*} action
 * @public
 */


var loadFilesUpdater = function loadFilesUpdater(state, action) {
  var files = action.files;
  var filesToLoad = files.map(function (fileBlob) {
    return (0, _fileUtils.processFileToLoad)(fileBlob);
  }); // reader -> parser -> augment -> receiveVisData

  var loadFileTasks = [_tasks.default.all(filesToLoad.map(_tasks2.LOAD_FILE_TASK)).bimap(function (results) {
    var data = results.reduce(function (f, c) {
      return {
        // using concat here because the current datasets could be an array or a single item
        datasets: f.datasets.concat(c.datasets),
        // we need to deep merge this thing unless we find a better solution
        // this case will only happen if we allow to load multiple keplergl json files
        config: (0, _objectSpread13.default)({}, f.config, c.config || {})
      };
    }, {
      datasets: [],
      config: {},
      options: {
        centerMap: true
      }
    });
    return (0, _actions.addDataToMap)(data);
  }, function (error) {
    return (0, _visStateActions.loadFilesErr)(error);
  })];
  return (0, _tasks.withTask)((0, _objectSpread13.default)({}, state, {
    fileLoading: true
  }), loadFileTasks);
};

exports.loadFilesUpdater = loadFilesUpdater;

var loadFilesErrUpdater = function loadFilesErrUpdater(state, _ref7) {
  var error = _ref7.error;
  return (0, _objectSpread13.default)({}, state, {
    fileLoading: false,
    fileLoadingErr: error
  });
};
/**
 * helper function to update All layer domain and layer data of state
 *
 * @param {object} state
 * @param {string} datasets
 * @returns {object} state
 */


exports.loadFilesErrUpdater = loadFilesErrUpdater;

function addDefaultLayers(state, datasets) {
  var defaultLayers = Object.values(datasets).reduce(function (accu, dataset) {
    return [].concat((0, _toConsumableArray2.default)(accu), (0, _toConsumableArray2.default)((0, _layerUtils.findDefaultLayer)(dataset, state.layerClasses) || []));
  }, []);
  return (0, _objectSpread13.default)({}, state, {
    layers: [].concat((0, _toConsumableArray2.default)(state.layers), (0, _toConsumableArray2.default)(defaultLayers)),
    layerOrder: [].concat((0, _toConsumableArray2.default)(defaultLayers.map(function (_, i) {
      return state.layers.length + i;
    })), (0, _toConsumableArray2.default)(state.layerOrder))
  });
}
/**
 * helper function to find default tooltips
 *
 * @param {object} state
 * @param {object} dataset
 * @returns {object} state
 */


function addDefaultTooltips(state, dataset) {
  var tooltipFields = (0, _interactionUtils.findFieldsToShow)(dataset);
  return (0, _objectSpread13.default)({}, state, {
    interactionConfig: (0, _objectSpread13.default)({}, state.interactionConfig, {
      tooltip: (0, _objectSpread13.default)({}, state.interactionConfig.tooltip, {
        config: {
          // find default fields to show in tooltip
          fieldsToShow: (0, _objectSpread13.default)({}, state.interactionConfig.tooltip.config.fieldsToShow, tooltipFields)
        }
      })
    })
  });
}
/**
 * helper function to update layer domains for an array of datsets
 *
 * @param {object} state
 * @param {array | string} dataId
 * @param {object} newFilter - if is called by setFilter, the filter that has changed
 * @returns {object} state
 */


function updateAllLayerDomainData(state, dataId, newFilter) {
  var dataIds = typeof dataId === 'string' ? [dataId] : dataId;
  var newLayers = [];
  var newLayerDatas = [];
  state.layers.forEach(function (oldLayer, i) {
    if (oldLayer.config.dataId && dataIds.includes(oldLayer.config.dataId)) {
      // No need to recalculate layer domain if filter has fixed domain
      var newLayer = newFilter && newFilter.fixedDomain ? oldLayer : oldLayer.updateLayerDomain(state.datasets[oldLayer.config.dataId], newFilter);

      var _calculateLayerData5 = (0, _layerUtils.calculateLayerData)(newLayer, state, state.layerData[i]),
          layerData = _calculateLayerData5.layerData,
          layer = _calculateLayerData5.layer;

      newLayers.push(layer);
      newLayerDatas.push(layerData);
    } else {
      newLayers.push(oldLayer);
      newLayerDatas.push(state.layerData[i]);
    }
  });
  return (0, _objectSpread13.default)({}, state, {
    layers: newLayers,
    layerData: newLayerDatas
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy92aXMtc3RhdGUtdXBkYXRlcnMuanMiXSwibmFtZXMiOlsiSU5JVElBTF9WSVNfU1RBVEUiLCJsYXllcnMiLCJsYXllckRhdGEiLCJsYXllclRvQmVNZXJnZWQiLCJsYXllck9yZGVyIiwiZmlsdGVycyIsImZpbHRlclRvQmVNZXJnZWQiLCJkYXRhc2V0cyIsImVkaXRpbmdEYXRhc2V0IiwidW5kZWZpbmVkIiwiaW50ZXJhY3Rpb25Db25maWciLCJpbnRlcmFjdGlvblRvQmVNZXJnZWQiLCJsYXllckJsZW5kaW5nIiwiaG92ZXJJbmZvIiwiY2xpY2tlZCIsImZpbGVMb2FkaW5nIiwiZmlsZUxvYWRpbmdFcnIiLCJzcGxpdE1hcHMiLCJsYXllckNsYXNzZXMiLCJMYXllckNsYXNzZXMiLCJ1cGRhdGVTdGF0ZVdpdGhMYXllckFuZERhdGEiLCJzdGF0ZSIsImxheWVyIiwiaWR4IiwibWFwIiwibHlyIiwiaSIsImQiLCJsYXllckNvbmZpZ0NoYW5nZVVwZGF0ZXIiLCJhY3Rpb24iLCJvbGRMYXllciIsImZpbmRJbmRleCIsImwiLCJpZCIsInByb3BzIiwiT2JqZWN0Iiwia2V5cyIsIm5ld0NvbmZpZyIsIm5ld0xheWVyIiwidXBkYXRlTGF5ZXJDb25maWciLCJzaG91bGRDYWxjdWxhdGVMYXllckRhdGEiLCJvbGRMYXllckRhdGEiLCJzYW1lRGF0YSIsIm5ld1N0YXRlIiwidG9nZ2xlTGF5ZXJGcm9tU3BsaXRNYXBzIiwibGF5ZXJUeXBlQ2hhbmdlVXBkYXRlciIsIm5ld1R5cGUiLCJvbGRJZCIsIkNvbnNvbGUiLCJlcnJvciIsImFzc2lnbkNvbmZpZ1RvTGF5ZXIiLCJjb25maWciLCJ2aXNDb25maWdTZXR0aW5ncyIsImRhdGFJZCIsImRhdGFzZXQiLCJ1cGRhdGVMYXllckRvbWFpbiIsInNldHRpbmdzIiwib2xkTGF5ZXJNYXAiLCJvdGhlckxheWVycyIsImxheWVyVmlzdWFsQ2hhbm5lbENoYW5nZVVwZGF0ZXIiLCJjaGFubmVsIiwidXBkYXRlTGF5ZXJWaXN1YWxDaGFubmVsIiwibGF5ZXJWaXNDb25maWdDaGFuZ2VVcGRhdGVyIiwibmV3VmlzQ29uZmlnIiwidmlzQ29uZmlnIiwiaW50ZXJhY3Rpb25Db25maWdDaGFuZ2VVcGRhdGVyIiwiZW5hYmxlZCIsImZvckVhY2giLCJrIiwic2V0RmlsdGVyVXBkYXRlciIsInByb3AiLCJ2YWx1ZSIsIm5ld0ZpbHRlciIsImZpZWxkcyIsImFsbERhdGEiLCJmaWVsZElkeCIsImYiLCJuYW1lIiwiZmllbGQiLCJmaWx0ZXJQcm9wIiwiZnJlZXplIiwiZW5sYXJnZWRGaWx0ZXJJZHgiLCJlbmxhcmdlZCIsInVwZGF0ZUFsbExheWVyRG9tYWluRGF0YSIsInNldEZpbHRlclBsb3RVcGRhdGVyIiwibmV3UHJvcCIsInBsb3RUeXBlIiwiYWRkRmlsdGVyVXBkYXRlciIsInRvZ2dsZUZpbHRlckFuaW1hdGlvblVwZGF0ZXIiLCJpc0FuaW1hdGluZyIsInVwZGF0ZUFuaW1hdGlvblNwZWVkVXBkYXRlciIsInNwZWVkIiwiZW5sYXJnZUZpbHRlclVwZGF0ZXIiLCJpc0VubGFyZ2VkIiwicmVtb3ZlRmlsdGVyVXBkYXRlciIsIm5ld0ZpbHRlcnMiLCJzbGljZSIsImxlbmd0aCIsImFkZExheWVyVXBkYXRlciIsImRlZmF1bHREYXRhc2V0IiwiTGF5ZXIiLCJpc1Zpc2libGUiLCJpc0NvbmZpZ0FjdGl2ZSIsImFkZE5ld0xheWVyc1RvU3BsaXRNYXAiLCJyZW1vdmVMYXllclVwZGF0ZXIiLCJsYXllclRvUmVtb3ZlIiwibmV3TWFwcyIsInJlbW92ZUxheWVyRnJvbVNwbGl0TWFwcyIsImZpbHRlciIsInBpZCIsImlzTGF5ZXJIb3ZlcmVkIiwicmVvcmRlckxheWVyVXBkYXRlciIsIm9yZGVyIiwicmVtb3ZlRGF0YXNldFVwZGF0ZXIiLCJkYXRhc2V0S2V5Iiwia2V5IiwibmV3RGF0YXNldHMiLCJpbmRleGVzIiwicmVkdWNlIiwibGlzdE9mSW5kZXhlcyIsImluZGV4IiwicHVzaCIsImN1cnJlbnRTdGF0ZSIsImluZGV4Q291bnRlciIsImN1cnJlbnRJbmRleCIsInRvb2x0aXAiLCJmaWVsZHNUb1Nob3ciLCJ1cGRhdGVMYXllckJsZW5kaW5nVXBkYXRlciIsIm1vZGUiLCJzaG93RGF0YXNldFRhYmxlVXBkYXRlciIsInJlc2V0TWFwQ29uZmlnVmlzU3RhdGVVcGRhdGVyIiwiaW5pdGlhbFN0YXRlIiwicmVjZWl2ZU1hcENvbmZpZ1VwZGF0ZXIiLCJwYXlsb2FkIiwidmlzU3RhdGUiLCJyZXNldFN0YXRlIiwibWVyZ2VkU3RhdGUiLCJsYXllckhvdmVyVXBkYXRlciIsImluZm8iLCJsYXllckNsaWNrVXBkYXRlciIsInBpY2tlZCIsIm1hcENsaWNrVXBkYXRlciIsInRvZ2dsZVNwbGl0TWFwVXBkYXRlciIsImNvbXB1dGVTcGxpdE1hcExheWVycyIsImNsb3NlU3BlY2lmaWNNYXBBdEluZGV4Iiwic2V0VmlzaWJsZUxheWVyc0Zvck1hcFVwZGF0ZXIiLCJtYXBJbmRleCIsImxheWVySWRzIiwibmV3TGF5ZXJzIiwiY3VycmVudExheWVycyIsImluY2x1ZGVzIiwidG9nZ2xlTGF5ZXJGb3JNYXBVcGRhdGVyIiwibWFwU2V0dGluZ3MiLCJsYXllcklkIiwibmV3U3BsaXRNYXBzIiwidXBkYXRlVmlzRGF0YVVwZGF0ZXIiLCJBcnJheSIsImlzQXJyYXkiLCJuZXdEYXRlRW50cmllcyIsImFjY3UiLCJkYXRhIiwic3RhdGVXaXRoTmV3RGF0YSIsImFkZERlZmF1bHRMYXllcnMiLCJ0b29sdGlwRmllbGRzIiwiYWRkRGVmYXVsdFRvb2x0aXBzIiwiZ2VuZXJhdGVMYXllck1ldGFGb3JTcGxpdFZpZXdzIiwiaXNBdmFpbGFibGUiLCJtYXBMYXllcnMiLCJjdXJyZW50TGF5ZXIiLCJfIiwiaW5kZXhUb1JldHJpZXZlIiwibWV0YVNldHRpbmdzIiwibG9hZEZpbGVzVXBkYXRlciIsImZpbGVzIiwiZmlsZXNUb0xvYWQiLCJmaWxlQmxvYiIsImxvYWRGaWxlVGFza3MiLCJUYXNrIiwiYWxsIiwiTE9BRF9GSUxFX1RBU0siLCJiaW1hcCIsInJlc3VsdHMiLCJjIiwiY29uY2F0Iiwib3B0aW9ucyIsImNlbnRlck1hcCIsImxvYWRGaWxlc0VyclVwZGF0ZXIiLCJkZWZhdWx0TGF5ZXJzIiwidmFsdWVzIiwiZGF0YUlkcyIsIm5ld0xheWVyRGF0YXMiLCJmaXhlZERvbWFpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUdBOztBQUdBOztBQUNBOztBQUdBOztBQUlBOztBQU9BOztBQUVBOztBQUtBOztBQWFBOztBQUNBOzs7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQk8sSUFBTUEsaUJBQWlCLEdBQUc7QUFDL0I7QUFDQUMsRUFBQUEsTUFBTSxFQUFFLEVBRnVCO0FBRy9CQyxFQUFBQSxTQUFTLEVBQUUsRUFIb0I7QUFJL0JDLEVBQUFBLGVBQWUsRUFBRSxFQUpjO0FBSy9CQyxFQUFBQSxVQUFVLEVBQUUsRUFMbUI7QUFPL0I7QUFDQUMsRUFBQUEsT0FBTyxFQUFFLEVBUnNCO0FBUy9CQyxFQUFBQSxnQkFBZ0IsRUFBRSxFQVRhO0FBVy9CO0FBQ0FDLEVBQUFBLFFBQVEsRUFBRSxFQVpxQjtBQWEvQkMsRUFBQUEsY0FBYyxFQUFFQyxTQWJlO0FBZS9CQyxFQUFBQSxpQkFBaUIsRUFBRSw4Q0FmWTtBQWdCL0JDLEVBQUFBLHFCQUFxQixFQUFFRixTQWhCUTtBQWtCL0JHLEVBQUFBLGFBQWEsRUFBRSxRQWxCZ0I7QUFtQi9CQyxFQUFBQSxTQUFTLEVBQUVKLFNBbkJvQjtBQW9CL0JLLEVBQUFBLE9BQU8sRUFBRUwsU0FwQnNCO0FBc0IvQjtBQUNBTSxFQUFBQSxXQUFXLEVBQUUsS0F2QmtCO0FBd0IvQkMsRUFBQUEsY0FBYyxFQUFFLElBeEJlO0FBMEIvQjtBQUNBQyxFQUFBQSxTQUFTLEVBQUUsQ0FDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFa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YWtFLE9BQWIsQ0FBcUIsVUFBQ3JDLFFBQUQsRUFBV0osQ0FBWCxFQUFpQjtBQUNwQyxRQUFJSSxRQUFRLENBQUNxQixNQUFULENBQWdCRSxNQUFoQixJQUEwQndJLE9BQU8sQ0FBQ3ZDLFFBQVIsQ0FBaUJ4SCxRQUFRLENBQUNxQixNQUFULENBQWdCRSxNQUFqQyxDQUE5QixFQUF3RTtBQUN0RTtBQUNBLFVBQU1mLFFBQVEsR0FDWmtDLFNBQVMsSUFBSUEsU0FBUyxDQUFDdUgsV0FBdkIsR0FDSWpLLFFBREosR0FFSUEsUUFBUSxDQUFDeUIsaUJBQVQsQ0FDRWxDLEtBQUssQ0FBQ2QsUUFBTixDQUFldUIsUUFBUSxDQUFDcUIsTUFBVCxDQUFnQkUsTUFBL0IsQ0FERixFQUVFbUIsU0FGRixDQUhOOztBQUZzRSxpQ0FVM0Msb0NBQ3pCbEMsUUFEeUIsRUFFekJqQixLQUZ5QixFQUd6QkEsS0FBSyxDQUFDbkIsU0FBTixDQUFnQndCLENBQWhCLENBSHlCLENBVjJDO0FBQUEsVUFVL0R4QixTQVYrRCx3QkFVL0RBLFNBVitEO0FBQUEsVUFVcERvQixLQVZvRCx3QkFVcERBLEtBVm9EOztBQWdCdEU4SCxNQUFBQSxTQUFTLENBQUMzQixJQUFWLENBQWVuRyxLQUFmO0FBQ0F3SyxNQUFBQSxhQUFhLENBQUNyRSxJQUFkLENBQW1CdkgsU0FBbkI7QUFDRCxLQWxCRCxNQWtCTztBQUNMa0osTUFBQUEsU0FBUyxDQUFDM0IsSUFBVixDQUFlM0YsUUFBZjtBQUNBZ0ssTUFBQUEsYUFBYSxDQUFDckUsSUFBZCxDQUFtQnBHLEtBQUssQ0FBQ25CLFNBQU4sQ0FBZ0J3QixDQUFoQixDQUFuQjtBQUNEO0FBQ0YsR0F2QkQ7QUF5QkEsMENBQ0tMLEtBREw7QUFFRXBCLElBQUFBLE1BQU0sRUFBRW1KLFNBRlY7QUFHRWxKLElBQUFBLFNBQVMsRUFBRTRMO0FBSGI7QUFLRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7Y29uc29sZSBhcyBDb25zb2xlfSBmcm9tICdnbG9iYWwvd2luZG93JztcbmltcG9ydCBUYXNrLCB7ZGlzYWJsZVN0YWNrQ2FwdHVyaW5nLCB3aXRoVGFza30gZnJvbSAncmVhY3QtcGFsbS90YXNrcyc7XG5cbi8vIFRhc2tzXG5pbXBvcnQge0xPQURfRklMRV9UQVNLfSBmcm9tICd0YXNrcy90YXNrcyc7XG5cbi8vIEFjdGlvbnNcbmltcG9ydCB7bG9hZEZpbGVzRXJyfSBmcm9tICdhY3Rpb25zL3Zpcy1zdGF0ZS1hY3Rpb25zJztcbmltcG9ydCB7YWRkRGF0YVRvTWFwfSBmcm9tICdhY3Rpb25zJztcblxuLy8gVXRpbHNcbmltcG9ydCB7XG4gIGdldERlZmF1bHRJbnRlcmFjdGlvbixcbiAgZmluZEZpZWxkc1RvU2hvd1xufSBmcm9tICd1dGlscy9pbnRlcmFjdGlvbi11dGlscyc7XG5pbXBvcnQge1xuICBnZXREZWZhdWx0RmlsdGVyLFxuICBnZXRGaWx0ZXJQcm9wcyxcbiAgZ2V0RmlsdGVyUGxvdCxcbiAgZ2V0RGVmYXVsdEZpbHRlclBsb3RUeXBlLFxuICBmaWx0ZXJEYXRhXG59IGZyb20gJ3V0aWxzL2ZpbHRlci11dGlscyc7XG5pbXBvcnQge2NyZWF0ZU5ld0RhdGFFbnRyeX0gZnJvbSAndXRpbHMvZGF0YXNldC11dGlscyc7XG5cbmltcG9ydCB7XG4gIGZpbmREZWZhdWx0TGF5ZXIsXG4gIGNhbGN1bGF0ZUxheWVyRGF0YVxufSBmcm9tICd1dGlscy9sYXllci11dGlscy9sYXllci11dGlscyc7XG5cbmltcG9ydCB7XG4gIG1lcmdlRmlsdGVycyxcbiAgbWVyZ2VMYXllcnMsXG4gIG1lcmdlSW50ZXJhY3Rpb25zLFxuICBtZXJnZUxheWVyQmxlbmRpbmdcbn0gZnJvbSAnLi92aXMtc3RhdGUtbWVyZ2VyJztcblxuLy8gTGF5ZXJDbGFzc2VzIGNvbnRhaW4gRVM2IENsYXNzLCBkbyBub3QgaW5zdGF0aWF0ZSBpbiBpc28gcmVuZGVyaW5nXG4vLyBjb25zdCB7TGF5ZXJDbGFzc2VzfSA9IGlzQnJvd3NlciB8fCBpc1Rlc3RpbmcgP1xuLy8gICByZXF1aXJlKCdsYXllcnMnKSA6IHtcbi8vICAgICBMYXllckNsYXNzZXM6IHt9XG4vLyAgIH07XG5cbmltcG9ydCB7TGF5ZXIsIExheWVyQ2xhc3Nlc30gZnJvbSAnbGF5ZXJzJztcbmltcG9ydCB7cHJvY2Vzc0ZpbGVUb0xvYWR9IGZyb20gJy91dGlscy9maWxlLXV0aWxzJztcblxuLy8gcmVhY3QtcGFsbVxuLy8gZGlzYWJsZSBjYXB0dXJlIGV4Y2VwdGlvbiBmb3IgcmVhY3QtcGFsbSBjYWxsIHRvIHdpdGhUYXNrXG5kaXNhYmxlU3RhY2tDYXB0dXJpbmcoKTtcblxuLyoqXG4gKiBEZWZhdWx0IGluaXRpYWwgYHZpc1N0YXRlYFxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByb3BlcnR5IHtBcnJheX0gbGF5ZXJzXG4gKiBAcHJvcGVydHkge0FycmF5fSBsYXllckRhdGFcbiAqIEBwcm9wZXJ0eSB7QXJyYXl9IGxheWVyVG9CZU1lcmdlZFxuICogQHByb3BlcnR5IHtBcnJheX0gbGF5ZXJPcmRlclxuICogQHByb3BlcnR5IHtBcnJheX0gZmlsdGVyc1xuICogQHByb3BlcnR5IHtBcnJheX0gZmlsdGVyVG9CZU1lcmdlZFxuICogQHByb3BlcnR5IHtBcnJheX0gZGF0YXNldHNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBlZGl0aW5nRGF0YXNldFxuICogQHByb3BlcnR5IHtPYmplY3R9IGludGVyYWN0aW9uQ29uZmlnXG4gKiBAcHJvcGVydHkge09iamVjdH0gaW50ZXJhY3Rpb25Ub0JlTWVyZ2VkXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbGF5ZXJCbGVuZGluZ1xuICogQHByb3BlcnR5IHtPYmplY3R9IGhvdmVySW5mb1xuICogQHByb3BlcnR5IHtPYmplY3R9IGNsaWNrZWRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gZmlsZUxvYWRpbmdcbiAqIEBwcm9wZXJ0eSB7Kn0gZmlsZUxvYWRpbmdFcnJcbiAqIEBwcm9wZXJ0eSB7QXJyYXl9IHNwbGl0TWFwcyAtIGEgbGlzdCBvZiBvYmplY3RzIG9mIGxheWVyIGF2YWlsYWJpbGl0aWVzIGFuZCB2aXNpYmlsaXRpZXMgZm9yIGVhY2ggbWFwXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBJTklUSUFMX1ZJU19TVEFURSA9IHtcbiAgLy8gbGF5ZXJzXG4gIGxheWVyczogW10sXG4gIGxheWVyRGF0YTogW10sXG4gIGxheWVyVG9CZU1lcmdlZDogW10sXG4gIGxheWVyT3JkZXI6IFtdLFxuXG4gIC8vIGZpbHRlcnNcbiAgZmlsdGVyczogW10sXG4gIGZpbHRlclRvQmVNZXJnZWQ6IFtdLFxuXG4gIC8vIGEgY29sbGVjdGlvbiBvZiBtdWx0aXBsZSBkYXRhc2V0XG4gIGRhdGFzZXRzOiB7fSxcbiAgZWRpdGluZ0RhdGFzZXQ6IHVuZGVmaW5lZCxcblxuICBpbnRlcmFjdGlvbkNvbmZpZzogZ2V0RGVmYXVsdEludGVyYWN0aW9uKCksXG4gIGludGVyYWN0aW9uVG9CZU1lcmdlZDogdW5kZWZpbmVkLFxuXG4gIGxheWVyQmxlbmRpbmc6ICdub3JtYWwnLFxuICBob3ZlckluZm86IHVuZGVmaW5lZCxcbiAgY2xpY2tlZDogdW5kZWZpbmVkLFxuXG4gIC8vIFRPRE86IG5vdCB1c2VkIGFueXdoZXJlLCBkZWxldGUgaXRcbiAgZmlsZUxvYWRpbmc6IGZhbHNlLFxuICBmaWxlTG9hZGluZ0VycjogbnVsbCxcblxuICAvLyB0aGlzIGlzIHVzZWQgd2hlbiB1c2VyIHNwbGl0IG1hcHNcbiAgc3BsaXRNYXBzOiBbXG4gICAgLy8gdGhpcyB3aWxsIGNvbnRhaW4gYSBsaXN0IG9mIG9iamVjdHMgdG9cbiAgICAvLyBkZXNjcmliZSB0aGUgc3RhdGUgb2YgbGF5ZXIgYXZhaWxhYmlsaXR5IGFuZCB2aXNpYmlsaXR5IGZvciBlYWNoIG1hcFxuICAgIC8vIFtcbiAgICAvLyAgIHtcbiAgICAvLyAgICAgbGF5ZXJzOiB7XG4gICAgLy8gICAgICAgbGF5ZXJfaWQ6IHtcbiAgICAvLyAgICAgICAgIGlzQXZhaWxhYmxlOiB0cnVlfGZhbHNlICMgdGhpcyBpcyBkcml2ZW4gYnkgdGhlIGxlZnQgaGFuZCBwYW5lbFxuICAgIC8vICAgICAgICAgaXNWaXNpYmxlOiB0cnVlfGZhbHNlXG4gICAgLy8gICAgICAgfVxuICAgIC8vICAgICB9XG4gICAgLy8gICB9XG4gICAgLy8gXVxuICBdLFxuXG4gIC8vIGRlZmF1bHRzIGxheWVyIGNsYXNzZXNcbiAgbGF5ZXJDbGFzc2VzOiBMYXllckNsYXNzZXNcbn07XG5cbmZ1bmN0aW9uIHVwZGF0ZVN0YXRlV2l0aExheWVyQW5kRGF0YShzdGF0ZSwge2xheWVyRGF0YSwgbGF5ZXIsIGlkeH0pIHtcbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBsYXllcnM6IHN0YXRlLmxheWVycy5tYXAoKGx5ciwgaSkgPT4gKGkgPT09IGlkeCA/IGxheWVyIDogbHlyKSksXG4gICAgbGF5ZXJEYXRhOiBsYXllckRhdGFcbiAgICAgID8gc3RhdGUubGF5ZXJEYXRhLm1hcCgoZCwgaSkgPT4gKGkgPT09IGlkeCA/IGxheWVyRGF0YSA6IGQpKVxuICAgICAgOiBzdGF0ZS5sYXllckRhdGFcbiAgfTtcbn1cblxuLyoqXG4gKiBDYWxsZWQgdG8gdXBkYXRlIGxheWVyIGJhc2UgY29uZmlnOiBkYXRhSWQsIGxhYmVsLCBjb2x1bW4sIGlzVmlzaWJsZVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gbGF5ZXJDb25maWdDaGFuZ2VVcGRhdGVyKHN0YXRlLCBhY3Rpb24pIHtcbiAgY29uc3Qge29sZExheWVyfSA9IGFjdGlvbjtcbiAgY29uc3QgaWR4ID0gc3RhdGUubGF5ZXJzLmZpbmRJbmRleChsID0+IGwuaWQgPT09IG9sZExheWVyLmlkKTtcbiAgY29uc3QgcHJvcHMgPSBPYmplY3Qua2V5cyhhY3Rpb24ubmV3Q29uZmlnKTtcblxuICBjb25zdCBuZXdMYXllciA9IG9sZExheWVyLnVwZGF0ZUxheWVyQ29uZmlnKGFjdGlvbi5uZXdDb25maWcpO1xuICBpZiAobmV3TGF5ZXIuc2hvdWxkQ2FsY3VsYXRlTGF5ZXJEYXRhKHByb3BzKSkge1xuICAgIGNvbnN0IG9sZExheWVyRGF0YSA9IHN0YXRlLmxheWVyRGF0YVtpZHhdO1xuICAgIGNvbnN0IHtsYXllckRhdGEsIGxheWVyfSA9IGNhbGN1bGF0ZUxheWVyRGF0YShcbiAgICAgIG5ld0xheWVyLFxuICAgICAgc3RhdGUsXG4gICAgICBvbGRMYXllckRhdGEsXG4gICAgICB7c2FtZURhdGE6IHRydWV9XG4gICAgKTtcbiAgICByZXR1cm4gdXBkYXRlU3RhdGVXaXRoTGF5ZXJBbmREYXRhKHN0YXRlLCB7bGF5ZXJEYXRhLCBsYXllciwgaWR4fSk7XG4gIH1cblxuICBjb25zdCBuZXdTdGF0ZSA9IHtcbiAgICAuLi5zdGF0ZSxcbiAgICBzcGxpdE1hcHM6XG4gICAgICAnaXNWaXNpYmxlJyBpbiBhY3Rpb24ubmV3Q29uZmlnXG4gICAgICAgID8gdG9nZ2xlTGF5ZXJGcm9tU3BsaXRNYXBzKHN0YXRlLCBuZXdMYXllcilcbiAgICAgICAgOiBzdGF0ZS5zcGxpdE1hcHNcbiAgfTtcblxuICByZXR1cm4gdXBkYXRlU3RhdGVXaXRoTGF5ZXJBbmREYXRhKG5ld1N0YXRlLCB7bGF5ZXI6IG5ld0xheWVyLCBpZHh9KTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgbGF5ZXIgdHlwZVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gbGF5ZXJUeXBlQ2hhbmdlVXBkYXRlcihzdGF0ZSwgYWN0aW9uKSB7XG4gIGNvbnN0IHtvbGRMYXllciwgbmV3VHlwZX0gPSBhY3Rpb247XG4gIGNvbnN0IG9sZElkID0gb2xkTGF5ZXIuaWQ7XG4gIGNvbnN0IGlkeCA9IHN0YXRlLmxheWVycy5maW5kSW5kZXgobCA9PiBsLmlkID09PSBvbGRJZCk7XG5cbiAgaWYgKCFzdGF0ZS5sYXllckNsYXNzZXNbbmV3VHlwZV0pIHtcbiAgICBDb25zb2xlLmVycm9yKGAke25ld1R5cGV9IGlzIG5vdCBhIHZhbGlkIGxheWVyIHR5cGVgKTtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuICAvLyBnZXQgYSBtaW50IGxheWVyLCB3aXRoIG5ldyBpZCBhbmQgdHlwZVxuICAvLyBiZWNhdXNlIGRlY2suZ2wgdXNlcyBpZCB0byBtYXRjaCBiZXR3ZWVuIG5ldyBhbmQgb2xkIGxheWVyLlxuICAvLyBJZiB0eXBlIGhhcyBjaGFuZ2VkIGJ1dCBpZCBpcyB0aGUgc2FtZSwgaXQgd2lsbCBicmVha1xuICBjb25zdCBuZXdMYXllciA9IG5ldyBzdGF0ZS5sYXllckNsYXNzZXNbbmV3VHlwZV0oKTtcblxuICBuZXdMYXllci5hc3NpZ25Db25maWdUb0xheWVyKG9sZExheWVyLmNvbmZpZywgb2xkTGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MpO1xuXG4gIGlmIChuZXdMYXllci5jb25maWcuZGF0YUlkKSB7XG4gICAgY29uc3QgZGF0YXNldCA9IHN0YXRlLmRhdGFzZXRzW25ld0xheWVyLmNvbmZpZy5kYXRhSWRdO1xuICAgIG5ld0xheWVyLnVwZGF0ZUxheWVyRG9tYWluKGRhdGFzZXQpO1xuICB9XG5cbiAgY29uc3Qge2xheWVyRGF0YSwgbGF5ZXJ9ID0gY2FsY3VsYXRlTGF5ZXJEYXRhKG5ld0xheWVyLCBzdGF0ZSk7XG5cbiAgbGV0IG5ld1N0YXRlID0gc3RhdGU7XG5cbiAgLy8gdXBkYXRlIHNwbGl0TWFwIGxheWVyIGlkXG4gIGlmIChzdGF0ZS5zcGxpdE1hcHMpIHtcbiAgICBuZXdTdGF0ZSA9IHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgc3BsaXRNYXBzOiBzdGF0ZS5zcGxpdE1hcHMubWFwKHNldHRpbmdzID0+IHtcbiAgICAgICAgY29uc3Qge1tvbGRJZF06IG9sZExheWVyTWFwLCAuLi5vdGhlckxheWVyc30gPSBzZXR0aW5ncy5sYXllcnM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uc2V0dGluZ3MsXG4gICAgICAgICAgbGF5ZXJzOiB7XG4gICAgICAgICAgICAuLi5vdGhlckxheWVycyxcbiAgICAgICAgICAgIFtsYXllci5pZF06IG9sZExheWVyTWFwXG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSlcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHVwZGF0ZVN0YXRlV2l0aExheWVyQW5kRGF0YShuZXdTdGF0ZSwge2xheWVyRGF0YSwgbGF5ZXIsIGlkeH0pO1xufVxuXG4vKipcbiAqIFVwZGF0ZSBsYXllciB2aXN1YWwgY2hhbm5lbFxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gbGF5ZXJWaXN1YWxDaGFubmVsQ2hhbmdlVXBkYXRlcihzdGF0ZSwgYWN0aW9uKSB7XG4gIGNvbnN0IHtvbGRMYXllciwgbmV3Q29uZmlnLCBjaGFubmVsfSA9IGFjdGlvbjtcbiAgY29uc3QgZGF0YXNldCA9IHN0YXRlLmRhdGFzZXRzW29sZExheWVyLmNvbmZpZy5kYXRhSWRdO1xuXG4gIGNvbnN0IGlkeCA9IHN0YXRlLmxheWVycy5maW5kSW5kZXgobCA9PiBsLmlkID09PSBvbGRMYXllci5pZCk7XG4gIGNvbnN0IG5ld0xheWVyID0gb2xkTGF5ZXIudXBkYXRlTGF5ZXJDb25maWcobmV3Q29uZmlnKTtcblxuICBuZXdMYXllci51cGRhdGVMYXllclZpc3VhbENoYW5uZWwoZGF0YXNldCwgY2hhbm5lbCk7XG5cbiAgY29uc3Qgb2xkTGF5ZXJEYXRhID0gc3RhdGUubGF5ZXJEYXRhW2lkeF07XG4gIGNvbnN0IHtsYXllckRhdGEsIGxheWVyfSA9IGNhbGN1bGF0ZUxheWVyRGF0YShuZXdMYXllciwgc3RhdGUsIG9sZExheWVyRGF0YSwge1xuICAgIHNhbWVEYXRhOiB0cnVlXG4gIH0pO1xuXG4gIHJldHVybiB1cGRhdGVTdGF0ZVdpdGhMYXllckFuZERhdGEoc3RhdGUsIHtsYXllckRhdGEsIGxheWVyLCBpZHh9KTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgbGF5ZXIgdmlzIGNvbmZpZ1xuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gbGF5ZXJWaXNDb25maWdDaGFuZ2VVcGRhdGVyKHN0YXRlLCBhY3Rpb24pIHtcbiAgY29uc3Qge29sZExheWVyfSA9IGFjdGlvbjtcbiAgY29uc3QgaWR4ID0gc3RhdGUubGF5ZXJzLmZpbmRJbmRleChsID0+IGwuaWQgPT09IG9sZExheWVyLmlkKTtcbiAgY29uc3QgcHJvcHMgPSBPYmplY3Qua2V5cyhhY3Rpb24ubmV3VmlzQ29uZmlnKTtcblxuICBjb25zdCBuZXdWaXNDb25maWcgPSB7XG4gICAgLi4ub2xkTGF5ZXIuY29uZmlnLnZpc0NvbmZpZyxcbiAgICAuLi5hY3Rpb24ubmV3VmlzQ29uZmlnXG4gIH07XG5cbiAgY29uc3QgbmV3TGF5ZXIgPSBvbGRMYXllci51cGRhdGVMYXllckNvbmZpZyh7dmlzQ29uZmlnOiBuZXdWaXNDb25maWd9KTtcblxuICBpZiAobmV3TGF5ZXIuc2hvdWxkQ2FsY3VsYXRlTGF5ZXJEYXRhKHByb3BzKSkge1xuICAgIGNvbnN0IG9sZExheWVyRGF0YSA9IHN0YXRlLmxheWVyRGF0YVtpZHhdO1xuICAgIGNvbnN0IHtsYXllckRhdGEsIGxheWVyfSA9IGNhbGN1bGF0ZUxheWVyRGF0YShcbiAgICAgIG5ld0xheWVyLFxuICAgICAgc3RhdGUsXG4gICAgICBvbGRMYXllckRhdGEsXG4gICAgICB7c2FtZURhdGE6IHRydWV9XG4gICAgKTtcbiAgICByZXR1cm4gdXBkYXRlU3RhdGVXaXRoTGF5ZXJBbmREYXRhKHN0YXRlLCB7bGF5ZXJEYXRhLCBsYXllciwgaWR4fSk7XG4gIH1cblxuICByZXR1cm4gdXBkYXRlU3RhdGVXaXRoTGF5ZXJBbmREYXRhKHN0YXRlLCB7bGF5ZXI6IG5ld0xheWVyLCBpZHh9KTtcbn1cblxuLyogZXNsaW50LWVuYWJsZSBtYXgtc3RhdGVtZW50cyAqL1xuXG4vKipcbiAqIFVwZGF0ZSBpbnRlcmFjdGlvbkNvbmZpZ1xuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gaW50ZXJhY3Rpb25Db25maWdDaGFuZ2VVcGRhdGVyKHN0YXRlLCBhY3Rpb24pIHtcbiAgY29uc3Qge2NvbmZpZ30gPSBhY3Rpb247XG5cbiAgY29uc3QgaW50ZXJhY3Rpb25Db25maWcgPSB7XG4gICAgLi4uc3RhdGUuaW50ZXJhY3Rpb25Db25maWcsXG4gICAgLi4ue1tjb25maWcuaWRdOiBjb25maWd9XG4gIH07XG5cbiAgaWYgKGNvbmZpZy5lbmFibGVkICYmICFzdGF0ZS5pbnRlcmFjdGlvbkNvbmZpZ1tjb25maWcuaWRdLmVuYWJsZWQpIHtcbiAgICAvLyBvbmx5IGVuYWJsZSBvbmUgaW50ZXJhY3Rpb24gYXQgYSB0aW1lXG4gICAgT2JqZWN0LmtleXMoaW50ZXJhY3Rpb25Db25maWcpLmZvckVhY2goayA9PiB7XG4gICAgICBpZiAoayAhPT0gY29uZmlnLmlkKSB7XG4gICAgICAgIGludGVyYWN0aW9uQ29uZmlnW2tdID0gey4uLmludGVyYWN0aW9uQ29uZmlnW2tdLCBlbmFibGVkOiBmYWxzZX07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIGludGVyYWN0aW9uQ29uZmlnXG4gIH07XG59XG5cbi8qKlxuICogVXBkYXRlIGZpbHRlclxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0RmlsdGVyVXBkYXRlcihzdGF0ZSwgYWN0aW9uKSB7XG4gIGNvbnN0IHtpZHgsIHByb3AsIHZhbHVlfSA9IGFjdGlvbjtcbiAgbGV0IG5ld1N0YXRlID0gc3RhdGU7XG4gIGxldCBuZXdGaWx0ZXIgPSB7XG4gICAgLi4uc3RhdGUuZmlsdGVyc1tpZHhdLFxuICAgIFtwcm9wXTogdmFsdWVcbiAgfTtcblxuICBjb25zdCB7ZGF0YUlkfSA9IG5ld0ZpbHRlcjtcbiAgaWYgKCFkYXRhSWQpIHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cbiAgY29uc3Qge2ZpZWxkcywgYWxsRGF0YX0gPSBzdGF0ZS5kYXRhc2V0c1tkYXRhSWRdO1xuXG4gIHN3aXRjaCAocHJvcCkge1xuICAgIGNhc2UgJ2RhdGFJZCc6XG4gICAgICAvLyBpZiB0cnlpbmcgdG8gdXBkYXRlIGZpbHRlciBkYXRhSWQuIGNyZWF0ZSBhbiBlbXB0eSBuZXcgZmlsdGVyXG4gICAgICBuZXdGaWx0ZXIgPSBnZXREZWZhdWx0RmlsdGVyKGRhdGFJZCk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ25hbWUnOlxuICAgICAgLy8gZmluZCB0aGUgZmllbGRcbiAgICAgIGNvbnN0IGZpZWxkSWR4ID0gZmllbGRzLmZpbmRJbmRleChmID0+IGYubmFtZSA9PT0gdmFsdWUpO1xuICAgICAgbGV0IGZpZWxkID0gZmllbGRzW2ZpZWxkSWR4XTtcblxuICAgICAgaWYgKCFmaWVsZC5maWx0ZXJQcm9wKSB7XG4gICAgICAgIC8vIGdldCBmaWx0ZXIgZG9tYWluIGZyb20gZmllbGRcbiAgICAgICAgLy8gc2F2ZSBmaWx0ZXJQcm9wczoge2RvbWFpbiwgc3RlcHMsIHZhbHVlfSB0byBmaWVsZCwgYXZvaWQgcmVjYWxjdWxhdGVcbiAgICAgICAgZmllbGQgPSB7XG4gICAgICAgICAgLi4uZmllbGQsXG4gICAgICAgICAgZmlsdGVyUHJvcDogZ2V0RmlsdGVyUHJvcHMoYWxsRGF0YSwgZmllbGQpXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIG5ld0ZpbHRlciA9IHtcbiAgICAgICAgLi4ubmV3RmlsdGVyLFxuICAgICAgICAuLi5maWVsZC5maWx0ZXJQcm9wLFxuICAgICAgICBuYW1lOiBmaWVsZC5uYW1lLFxuICAgICAgICAvLyBjYW4ndCBlZGl0IGRhdGFJZCBvbmNlIG5hbWUgaXMgc2VsZWN0ZWRcbiAgICAgICAgZnJlZXplOiB0cnVlLFxuICAgICAgICBmaWVsZElkeFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGVubGFyZ2VkRmlsdGVySWR4ID0gc3RhdGUuZmlsdGVycy5maW5kSW5kZXgoZiA9PiBmLmVubGFyZ2VkKTtcbiAgICAgIGlmIChlbmxhcmdlZEZpbHRlcklkeCA+IC0xICYmIGVubGFyZ2VkRmlsdGVySWR4ICE9PSBpZHgpIHtcbiAgICAgICAgLy8gdGhlcmUgc2hvdWxkIGJlIG9ubHkgb25lIGVubGFyZ2VkIGZpbHRlclxuICAgICAgICBuZXdGaWx0ZXIuZW5sYXJnZWQgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgbmV3U3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBkYXRhc2V0czoge1xuICAgICAgICAgIC4uLnN0YXRlLmRhdGFzZXRzLFxuICAgICAgICAgIFtkYXRhSWRdOiB7XG4gICAgICAgICAgICAuLi5zdGF0ZS5kYXRhc2V0c1tkYXRhSWRdLFxuICAgICAgICAgICAgZmllbGRzOiBmaWVsZHMubWFwKChkLCBpKSA9PiAoaSA9PT0gZmllbGRJZHggPyBmaWVsZCA6IGQpKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3ZhbHVlJzpcbiAgICBkZWZhdWx0OlxuICAgICAgYnJlYWs7XG4gIH1cblxuICAvLyBzYXZlIG5ldyBmaWx0ZXJzIHRvIG5ld1N0YXRlXG4gIG5ld1N0YXRlID0ge1xuICAgIC4uLm5ld1N0YXRlLFxuICAgIGZpbHRlcnM6IHN0YXRlLmZpbHRlcnMubWFwKChmLCBpKSA9PiAoaSA9PT0gaWR4ID8gbmV3RmlsdGVyIDogZikpXG4gIH07XG5cbiAgLy8gZmlsdGVyIGRhdGFcbiAgbmV3U3RhdGUgPSB7XG4gICAgLi4ubmV3U3RhdGUsXG4gICAgZGF0YXNldHM6IHtcbiAgICAgIC4uLm5ld1N0YXRlLmRhdGFzZXRzLFxuICAgICAgW2RhdGFJZF06IHtcbiAgICAgICAgLi4ubmV3U3RhdGUuZGF0YXNldHNbZGF0YUlkXSxcbiAgICAgICAgLi4uZmlsdGVyRGF0YShhbGxEYXRhLCBkYXRhSWQsIG5ld1N0YXRlLmZpbHRlcnMpXG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIG5ld1N0YXRlID0gdXBkYXRlQWxsTGF5ZXJEb21haW5EYXRhKG5ld1N0YXRlLCBkYXRhSWQsIG5ld0ZpbHRlcik7XG5cbiAgcmV0dXJuIG5ld1N0YXRlO1xufVxuXG4vKipcbiAqIFVwZGF0ZSBmaWx0ZXIgcGxvdFxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3Qgc2V0RmlsdGVyUGxvdFVwZGF0ZXIgPSAoc3RhdGUsIHtpZHgsIG5ld1Byb3B9KSA9PiB7XG4gIGxldCBuZXdGaWx0ZXIgPSB7Li4uc3RhdGUuZmlsdGVyc1tpZHhdLCAuLi5uZXdQcm9wfTtcbiAgY29uc3QgcHJvcCA9IE9iamVjdC5rZXlzKG5ld1Byb3ApWzBdO1xuICBpZiAocHJvcCA9PT0gJ3lBeGlzJykge1xuICAgIGNvbnN0IHBsb3RUeXBlID0gZ2V0RGVmYXVsdEZpbHRlclBsb3RUeXBlKG5ld0ZpbHRlcik7XG5cbiAgICBpZiAocGxvdFR5cGUpIHtcbiAgICAgIG5ld0ZpbHRlciA9IHtcbiAgICAgICAgLi4ubmV3RmlsdGVyLFxuICAgICAgICAuLi5nZXRGaWx0ZXJQbG90KFxuICAgICAgICAgIHsuLi5uZXdGaWx0ZXIsIHBsb3RUeXBlfSxcbiAgICAgICAgICBzdGF0ZS5kYXRhc2V0c1tuZXdGaWx0ZXIuZGF0YUlkXS5hbGxEYXRhXG4gICAgICAgICksXG4gICAgICAgIHBsb3RUeXBlXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgZmlsdGVyczogc3RhdGUuZmlsdGVycy5tYXAoKGYsIGkpID0+IChpID09PSBpZHggPyBuZXdGaWx0ZXIgOiBmKSlcbiAgfTtcbn07XG5cbi8qKlxuICogQWRkIGZpbHRlclxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgYWRkRmlsdGVyVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PlxuICAhYWN0aW9uLmRhdGFJZFxuICAgID8gc3RhdGVcbiAgICA6IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGZpbHRlcnM6IFsuLi5zdGF0ZS5maWx0ZXJzLCBnZXREZWZhdWx0RmlsdGVyKGFjdGlvbi5kYXRhSWQpXVxuICAgICAgfTtcblxuLyoqXG4gKiB0b2dnbGUgZmlsdGVyIGFuaW1hdGlvblxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgdG9nZ2xlRmlsdGVyQW5pbWF0aW9uVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgZmlsdGVyczogc3RhdGUuZmlsdGVycy5tYXAoXG4gICAgKGYsIGkpID0+IChpID09PSBhY3Rpb24uaWR4ID8gey4uLmYsIGlzQW5pbWF0aW5nOiAhZi5pc0FuaW1hdGluZ30gOiBmKVxuICApXG59KTtcblxuLyoqXG4gKiB1cGRhdGUgZmlsdGVyIGFuaW1hdGlvbiBzcGVlZFxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgdXBkYXRlQW5pbWF0aW9uU3BlZWRVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBmaWx0ZXJzOiBzdGF0ZS5maWx0ZXJzLm1hcChcbiAgICAoZiwgaSkgPT4gKGkgPT09IGFjdGlvbi5pZHggPyB7Li4uZiwgc3BlZWQ6IGFjdGlvbi5zcGVlZH0gOiBmKVxuICApXG59KTtcblxuLyoqXG4gKiBlbmxhcmdlIGZpbHRlciB0byB0aW1lIHBsYXliYWNrIChhcHBseSB0byB0aW1lIGZpbHRlciBvbmx5KVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgZW5sYXJnZUZpbHRlclVwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICBjb25zdCBpc0VubGFyZ2VkID0gc3RhdGUuZmlsdGVyc1thY3Rpb24uaWR4XS5lbmxhcmdlZDtcblxuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIGZpbHRlcnM6IHN0YXRlLmZpbHRlcnMubWFwKChmLCBpKSA9PiB7XG4gICAgICBmLmVubGFyZ2VkID0gIWlzRW5sYXJnZWQgJiYgaSA9PT0gYWN0aW9uLmlkeDtcbiAgICAgIHJldHVybiBmO1xuICAgIH0pXG4gIH07XG59O1xuXG4vKipcbiAqIHJlbW92ZSBmaWx0ZXJcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHJlbW92ZUZpbHRlclVwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICBjb25zdCB7aWR4fSA9IGFjdGlvbjtcbiAgY29uc3Qge2RhdGFJZH0gPSBzdGF0ZS5maWx0ZXJzW2lkeF07XG5cbiAgY29uc3QgbmV3RmlsdGVycyA9IFtcbiAgICAuLi5zdGF0ZS5maWx0ZXJzLnNsaWNlKDAsIGlkeCksXG4gICAgLi4uc3RhdGUuZmlsdGVycy5zbGljZShpZHggKyAxLCBzdGF0ZS5maWx0ZXJzLmxlbmd0aClcbiAgXTtcblxuICBjb25zdCBuZXdTdGF0ZSA9IHtcbiAgICAuLi5zdGF0ZSxcbiAgICBkYXRhc2V0czoge1xuICAgICAgLi4uc3RhdGUuZGF0YXNldHMsXG4gICAgICBbZGF0YUlkXToge1xuICAgICAgICAuLi5zdGF0ZS5kYXRhc2V0c1tkYXRhSWRdLFxuICAgICAgICAuLi5maWx0ZXJEYXRhKHN0YXRlLmRhdGFzZXRzW2RhdGFJZF0uYWxsRGF0YSwgZGF0YUlkLCBuZXdGaWx0ZXJzKVxuICAgICAgfVxuICAgIH0sXG4gICAgZmlsdGVyczogbmV3RmlsdGVyc1xuICB9O1xuXG4gIHJldHVybiB1cGRhdGVBbGxMYXllckRvbWFpbkRhdGEobmV3U3RhdGUsIGRhdGFJZCk7XG59O1xuXG4vKipcbiAqIGFkZCBsYXllclxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgYWRkTGF5ZXJVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgY29uc3QgZGVmYXVsdERhdGFzZXQgPSBPYmplY3Qua2V5cyhzdGF0ZS5kYXRhc2V0cylbMF07XG4gIGNvbnN0IG5ld0xheWVyID0gbmV3IExheWVyKHtcbiAgICBpc1Zpc2libGU6IHRydWUsXG4gICAgaXNDb25maWdBY3RpdmU6IHRydWUsXG4gICAgZGF0YUlkOiBkZWZhdWx0RGF0YXNldCxcbiAgICAuLi5hY3Rpb24ucHJvcHNcbiAgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBsYXllcnM6IFsuLi5zdGF0ZS5sYXllcnMsIG5ld0xheWVyXSxcbiAgICBsYXllckRhdGE6IFsuLi5zdGF0ZS5sYXllckRhdGEsIHt9XSxcbiAgICBsYXllck9yZGVyOiBbLi4uc3RhdGUubGF5ZXJPcmRlciwgc3RhdGUubGF5ZXJPcmRlci5sZW5ndGhdLFxuICAgIHNwbGl0TWFwczogYWRkTmV3TGF5ZXJzVG9TcGxpdE1hcChzdGF0ZS5zcGxpdE1hcHMsIG5ld0xheWVyKVxuICB9O1xufTtcblxuLyoqXG4gKiByZW1vdmUgbGF5ZXJcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHJlbW92ZUxheWVyVXBkYXRlciA9IChzdGF0ZSwge2lkeH0pID0+IHtcbiAgY29uc3Qge2xheWVycywgbGF5ZXJEYXRhLCBjbGlja2VkLCBob3ZlckluZm99ID0gc3RhdGU7XG4gIGNvbnN0IGxheWVyVG9SZW1vdmUgPSBzdGF0ZS5sYXllcnNbaWR4XTtcbiAgY29uc3QgbmV3TWFwcyA9IHJlbW92ZUxheWVyRnJvbVNwbGl0TWFwcyhzdGF0ZSwgbGF5ZXJUb1JlbW92ZSk7XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBsYXllcnM6IFsuLi5sYXllcnMuc2xpY2UoMCwgaWR4KSwgLi4ubGF5ZXJzLnNsaWNlKGlkeCArIDEsIGxheWVycy5sZW5ndGgpXSxcbiAgICBsYXllckRhdGE6IFtcbiAgICAgIC4uLmxheWVyRGF0YS5zbGljZSgwLCBpZHgpLFxuICAgICAgLi4ubGF5ZXJEYXRhLnNsaWNlKGlkeCArIDEsIGxheWVyRGF0YS5sZW5ndGgpXG4gICAgXSxcbiAgICBsYXllck9yZGVyOiBzdGF0ZS5sYXllck9yZGVyXG4gICAgICAuZmlsdGVyKGkgPT4gaSAhPT0gaWR4KVxuICAgICAgLm1hcChwaWQgPT4gKHBpZCA+IGlkeCA/IHBpZCAtIDEgOiBwaWQpKSxcbiAgICBjbGlja2VkOiBsYXllclRvUmVtb3ZlLmlzTGF5ZXJIb3ZlcmVkKGNsaWNrZWQpID8gdW5kZWZpbmVkIDogY2xpY2tlZCxcbiAgICBob3ZlckluZm86IGxheWVyVG9SZW1vdmUuaXNMYXllckhvdmVyZWQoaG92ZXJJbmZvKSA/IHVuZGVmaW5lZCA6IGhvdmVySW5mbyxcbiAgICBzcGxpdE1hcHM6IG5ld01hcHNcbiAgfTtcbn07XG5cbi8qKlxuICogcmVvcmRlciBsYXllciwgdXBkYXRlIGxheWVyT3JkZXJcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHJlb3JkZXJMYXllclVwZGF0ZXIgPSAoc3RhdGUsIHtvcmRlcn0pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBsYXllck9yZGVyOiBvcmRlclxufSk7XG5cbi8qKlxuICogcmVtb3ZlIGEgZGF0YXNldCBhbmQgYWxsIGxheWVycywgZmlsdGVycywgdG9vbHRpcCBjb25maWdzIHRoYXQgYmFzZWQgb24gaXRcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHJlbW92ZURhdGFzZXRVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgLy8gZXh0cmFjdCBkYXRhc2V0IGtleVxuICBjb25zdCB7a2V5OiBkYXRhc2V0S2V5fSA9IGFjdGlvbjtcbiAgY29uc3Qge2RhdGFzZXRzfSA9IHN0YXRlO1xuXG4gIC8vIGNoZWNrIGlmIGRhdGFzZXQgaXMgcHJlc2VudFxuICBpZiAoIWRhdGFzZXRzW2RhdGFzZXRLZXldKSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbiAgY29uc3Qge1xuICAgIGxheWVycyxcbiAgICBkYXRhc2V0czoge1tkYXRhc2V0S2V5XTogZGF0YXNldCwgLi4ubmV3RGF0YXNldHN9XG4gIH0gPSBzdGF0ZTtcbiAgLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xuXG4gIGNvbnN0IGluZGV4ZXMgPSBsYXllcnMucmVkdWNlKChsaXN0T2ZJbmRleGVzLCBsYXllciwgaW5kZXgpID0+IHtcbiAgICBpZiAobGF5ZXIuY29uZmlnLmRhdGFJZCA9PT0gZGF0YXNldEtleSkge1xuICAgICAgbGlzdE9mSW5kZXhlcy5wdXNoKGluZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIGxpc3RPZkluZGV4ZXM7XG4gIH0sIFtdKTtcblxuICAvLyByZW1vdmUgbGF5ZXJzIGFuZCBkYXRhc2V0c1xuICBjb25zdCB7bmV3U3RhdGV9ID0gaW5kZXhlcy5yZWR1Y2UoXG4gICAgKHtuZXdTdGF0ZTogY3VycmVudFN0YXRlLCBpbmRleENvdW50ZXJ9LCBpZHgpID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IGlkeCAtIGluZGV4Q291bnRlcjtcbiAgICAgIGN1cnJlbnRTdGF0ZSA9IHJlbW92ZUxheWVyVXBkYXRlcihjdXJyZW50U3RhdGUsIHtpZHg6IGN1cnJlbnRJbmRleH0pO1xuICAgICAgaW5kZXhDb3VudGVyKys7XG4gICAgICByZXR1cm4ge25ld1N0YXRlOiBjdXJyZW50U3RhdGUsIGluZGV4Q291bnRlcn07XG4gICAgfSxcbiAgICB7bmV3U3RhdGU6IHsuLi5zdGF0ZSwgZGF0YXNldHM6IG5ld0RhdGFzZXRzfSwgaW5kZXhDb3VudGVyOiAwfVxuICApO1xuXG4gIC8vIHJlbW92ZSBmaWx0ZXJzXG4gIGNvbnN0IGZpbHRlcnMgPSBzdGF0ZS5maWx0ZXJzLmZpbHRlcihmaWx0ZXIgPT4gZmlsdGVyLmRhdGFJZCAhPT0gZGF0YXNldEtleSk7XG5cbiAgLy8gdXBkYXRlIGludGVyYWN0aW9uQ29uZmlnXG4gIGxldCB7aW50ZXJhY3Rpb25Db25maWd9ID0gc3RhdGU7XG4gIGNvbnN0IHt0b29sdGlwfSA9IGludGVyYWN0aW9uQ29uZmlnO1xuICBpZiAodG9vbHRpcCkge1xuICAgIGNvbnN0IHtjb25maWd9ID0gdG9vbHRpcDtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuICAgIGNvbnN0IHtbZGF0YXNldEtleV06IGZpZWxkcywgLi4uZmllbGRzVG9TaG93fSA9IGNvbmZpZy5maWVsZHNUb1Nob3c7XG4gICAgLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xuICAgIGludGVyYWN0aW9uQ29uZmlnID0ge1xuICAgICAgLi4uaW50ZXJhY3Rpb25Db25maWcsXG4gICAgICB0b29sdGlwOiB7Li4udG9vbHRpcCwgY29uZmlnOiB7Li4uY29uZmlnLCBmaWVsZHNUb1Nob3d9fVxuICAgIH07XG4gIH1cblxuICByZXR1cm4gey4uLm5ld1N0YXRlLCBmaWx0ZXJzLCBpbnRlcmFjdGlvbkNvbmZpZ307XG59O1xuXG4vKipcbiAqIHVwZGF0ZSBsYXllciBibGVuZGluZ1xuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgdXBkYXRlTGF5ZXJCbGVuZGluZ1VwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGxheWVyQmxlbmRpbmc6IGFjdGlvbi5tb2RlXG59KTtcblxuLyoqXG4gKiBzaG93IGRhdGFzZXQgdGFibGVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHNob3dEYXRhc2V0VGFibGVVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBlZGl0aW5nRGF0YXNldDogYWN0aW9uLmRhdGFJZFxuICB9O1xufTtcblxuLyoqXG4gKiByZXNldCB2aXNTdGF0ZSB0byBpbml0aWFsIFN0YXRlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCByZXNldE1hcENvbmZpZ1Zpc1N0YXRlVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiAoe1xuICAuLi5JTklUSUFMX1ZJU19TVEFURSxcbiAgLi4uc3RhdGUuaW5pdGlhbFN0YXRlLFxuICBpbml0aWFsU3RhdGU6IHN0YXRlLmluaXRpYWxTdGF0ZVxufSk7XG5cbi8qKlxuICogTG9hZHMgY3VzdG9tIGNvbmZpZ3VyYXRpb24gaW50byBzdGF0ZVxuICogQHBhcmFtIHN0YXRlXG4gKiBAcGFyYW0gYWN0aW9uXG4gKiBAcmV0dXJucyB7Kn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHJlY2VpdmVNYXBDb25maWdVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgaWYgKCFhY3Rpb24ucGF5bG9hZC52aXNTdGF0ZSkge1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIGNvbnN0IHtcbiAgICBmaWx0ZXJzLFxuICAgIGxheWVycyxcbiAgICBpbnRlcmFjdGlvbkNvbmZpZyxcbiAgICBsYXllckJsZW5kaW5nLFxuICAgIHNwbGl0TWFwc1xuICB9ID0gYWN0aW9uLnBheWxvYWQudmlzU3RhdGU7XG5cbiAgLy8gYWx3YXlzIHJlc2V0IGNvbmZpZyB3aGVuIHJlY2VpdmUgYSBuZXcgY29uZmlnXG4gIGNvbnN0IHJlc2V0U3RhdGUgPSByZXNldE1hcENvbmZpZ1Zpc1N0YXRlVXBkYXRlcihzdGF0ZSk7XG4gIGxldCBtZXJnZWRTdGF0ZSA9IHtcbiAgICAuLi5yZXNldFN0YXRlLFxuICAgIHNwbGl0TWFwczogc3BsaXRNYXBzIHx8IFtdIC8vIG1hcHMgZG9lc24ndCByZXF1aXJlIGFueSBsb2dpY1xuICB9O1xuXG4gIG1lcmdlZFN0YXRlID0gbWVyZ2VGaWx0ZXJzKG1lcmdlZFN0YXRlLCBmaWx0ZXJzKTtcbiAgbWVyZ2VkU3RhdGUgPSBtZXJnZUxheWVycyhtZXJnZWRTdGF0ZSwgbGF5ZXJzKTtcbiAgbWVyZ2VkU3RhdGUgPSBtZXJnZUludGVyYWN0aW9ucyhtZXJnZWRTdGF0ZSwgaW50ZXJhY3Rpb25Db25maWcpO1xuICBtZXJnZWRTdGF0ZSA9IG1lcmdlTGF5ZXJCbGVuZGluZyhtZXJnZWRTdGF0ZSwgbGF5ZXJCbGVuZGluZyk7XG5cbiAgcmV0dXJuIG1lcmdlZFN0YXRlO1xufTtcblxuLyoqXG4gKiB1cGRhdGUgaG92ZXJlZCBvYmplY3RcbiAqIEBwYXJhbSB7Kn0gc3RhdGVcbiAqIEBwYXJhbSB7Kn0gYWN0aW9uXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBsYXllckhvdmVyVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgaG92ZXJJbmZvOiBhY3Rpb24uaW5mb1xufSk7XG5cbi8qKlxuICogdXBkYXRlIGNsaWNrZWQgb2JqZWN0XG4gKiBAcGFyYW0geyp9IHN0YXRlXG4gKiBAcGFyYW0geyp9IGFjdGlvblxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgbGF5ZXJDbGlja1VwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGNsaWNrZWQ6IGFjdGlvbi5pbmZvICYmIGFjdGlvbi5pbmZvLnBpY2tlZCA/IGFjdGlvbi5pbmZvIDogbnVsbFxufSk7XG5cbi8qKlxuICogYWN0aW9uIHRyaWdnZXJlZCBieSBjbGlja2luZyBvbiBtYXBcbiAqIEBwYXJhbSB7Kn0gc3RhdGVcbiAqIEBwYXJhbSB7Kn0gYWN0aW9uXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBtYXBDbGlja1VwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGNsaWNrZWQ6IG51bGxcbn0pO1xuXG4vKipcbiAqIHRvZ2dsZSBzcGxpdCBtYXBcbiAqIEBwYXJhbSB7Kn0gc3RhdGVcbiAqIEBwYXJhbSB7Kn0gYWN0aW9uXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCB0b2dnbGVTcGxpdE1hcFVwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT5cbiAgc3RhdGUuc3BsaXRNYXBzICYmIHN0YXRlLnNwbGl0TWFwcy5sZW5ndGggPT09IDBcbiAgICA/IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIC8vIG1heWJlIHdlIHNob3VsZCB1c2UgYW4gYXJyYXkgdG8gc3RvcmUgc3RhdGUgZm9yIGEgc2luZ2xlIG1hcCBhcyB3ZWxsXG4gICAgICAgIC8vIGlmIGN1cnJlbnQgbWFwcyBsZW5ndGggaXMgZXF1YWwgdG8gMCBpdCBtZWFucyB0aGF0IHdlIGFyZSBhYm91dCB0byBzcGxpdCB0aGUgdmlld1xuICAgICAgICBzcGxpdE1hcHM6IGNvbXB1dGVTcGxpdE1hcExheWVycyhzdGF0ZS5sYXllcnMpXG4gICAgICB9XG4gICAgOiBjbG9zZVNwZWNpZmljTWFwQXRJbmRleChzdGF0ZSwgYWN0aW9uKTtcblxuLyoqXG4gKiBUaGlzIGlzIHRyaWdnZXJlZCB3aGVuIHZpZXcgaXMgc3BsaXQgaW50byBtdWx0aXBsZSBtYXBzLlxuICogSXQgd2lsbCBvbmx5IHVwZGF0ZSBsYXllcnMgdGhhdCBiZWxvbmcgdG8gdGhlIG1hcCBsYXllciBkcm9wZG93blxuICogdGhlIHVzZXIgaXMgaW50ZXJhY3Rpbmcgd2l0XG4gKiBAcGFyYW0gc3RhdGVcbiAqIEBwYXJhbSBhY3Rpb25cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHNldFZpc2libGVMYXllcnNGb3JNYXBVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgY29uc3Qge21hcEluZGV4LCBsYXllcklkc30gPSBhY3Rpb247XG4gIGlmICghbGF5ZXJJZHMpIHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuICBjb25zdCB7c3BsaXRNYXBzID0gW119ID0gc3RhdGU7XG5cbiAgaWYgKHNwbGl0TWFwcy5sZW5ndGggPT09IDApIHtcbiAgICAvLyB3ZSBzaG91bGQgbmV2ZXIgZ2V0IGludG8gdGhpcyBzdGF0ZVxuICAgIC8vIGJlY2F1c2UgdGhpcyBhY3Rpb24gc2hvdWxkIG9ubHkgYmUgdHJpZ2dlcmVkXG4gICAgLy8gd2hlbiBtYXAgdmlldyBpcyBzcGxpdFxuICAgIC8vIGJ1dCBzb21ldGhpbmcgbWF5IGhhdmUgaGFwcGVuZWRcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuICAvLyBuZWVkIHRvIGNoZWNrIGlmIG1hcHMgaXMgcG9wdWxhdGVkIG90aGVyd2lzZSB3aWxsIGNyZWF0ZVxuICBjb25zdCB7W21hcEluZGV4XTogbWFwID0ge319ID0gc3BsaXRNYXBzO1xuXG4gIGNvbnN0IGxheWVycyA9IG1hcC5sYXllcnMgfHwgW107XG5cbiAgLy8gd2Ugc2V0IHZpc2liaWxpdHkgdG8gdHJ1ZSBmb3IgYWxsIGxheWVycyBpbmNsdWRlZCBpbiBvdXIgaW5wdXQgbGlzdFxuICBjb25zdCBuZXdMYXllcnMgPSAoT2JqZWN0LmtleXMobGF5ZXJzKSB8fCBbXSkucmVkdWNlKChjdXJyZW50TGF5ZXJzLCBpZHgpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uY3VycmVudExheWVycyxcbiAgICAgIFtpZHhdOiB7XG4gICAgICAgIC4uLmxheWVyc1tpZHhdLFxuICAgICAgICBpc1Zpc2libGU6IGxheWVySWRzLmluY2x1ZGVzKGlkeClcbiAgICAgIH1cbiAgICB9O1xuICB9LCB7fSk7XG5cbiAgY29uc3QgbmV3TWFwcyA9IFsuLi5zcGxpdE1hcHNdO1xuXG4gIG5ld01hcHNbbWFwSW5kZXhdID0ge1xuICAgIC4uLnNwbGl0TWFwc1ttYXBJbmRleF0sXG4gICAgbGF5ZXJzOiBuZXdMYXllcnNcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIHNwbGl0TWFwczogbmV3TWFwc1xuICB9O1xufTtcblxuLyoqXG4gKiBUb2dnbGUgc3BsaXQgbWFwIGxheWVyIHZpc2liaWxpdHlcbiAqIEBwYXJhbSB7Kn0gc3RhdGVcbiAqIEBwYXJhbSB7Kn0gYWN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCB0b2dnbGVMYXllckZvck1hcFVwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICBpZiAoIXN0YXRlLnNwbGl0TWFwc1thY3Rpb24ubWFwSW5kZXhdKSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgY29uc3QgbWFwU2V0dGluZ3MgPSBzdGF0ZS5zcGxpdE1hcHNbYWN0aW9uLm1hcEluZGV4XTtcbiAgY29uc3Qge2xheWVyc30gPSBtYXBTZXR0aW5ncztcbiAgaWYgKCFsYXllcnMgfHwgIWxheWVyc1thY3Rpb24ubGF5ZXJJZF0pIHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuICBjb25zdCBsYXllciA9IGxheWVyc1thY3Rpb24ubGF5ZXJJZF07XG5cbiAgY29uc3QgbmV3TGF5ZXIgPSB7XG4gICAgLi4ubGF5ZXIsXG4gICAgaXNWaXNpYmxlOiAhbGF5ZXIuaXNWaXNpYmxlXG4gIH07XG5cbiAgY29uc3QgbmV3TGF5ZXJzID0ge1xuICAgIC4uLmxheWVycyxcbiAgICBbYWN0aW9uLmxheWVySWRdOiBuZXdMYXllclxuICB9O1xuXG4gIC8vIGNvbnN0IHNwbGl0TWFwcyA9IHN0YXRlLnNwbGl0TWFwcztcbiAgY29uc3QgbmV3U3BsaXRNYXBzID0gWy4uLnN0YXRlLnNwbGl0TWFwc107XG4gIG5ld1NwbGl0TWFwc1thY3Rpb24ubWFwSW5kZXhdID0ge1xuICAgIC4uLm1hcFNldHRpbmdzLFxuICAgIGxheWVyczogbmV3TGF5ZXJzXG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBzcGxpdE1hcHM6IG5ld1NwbGl0TWFwc1xuICB9O1xufTtcblxuLyoqXG4gKiBBZGQgbmV3IGRhdGFzZXRzXG4gKiBAcGFyYW0geyp9IHN0YXRlXG4gKiBAcGFyYW0geyp9IGFjdGlvblxuICogQHB1YmxpY1xuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBtYXgtc3RhdGVtZW50cyAqL1xuZXhwb3J0IGNvbnN0IHVwZGF0ZVZpc0RhdGFVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgLy8gZGF0YXNldHMgY2FuIGJlIGEgc2luZ2xlIGRhdGEgZW50cmllcyBvciBhbiBhcnJheSBvZiBtdWx0aXBsZSBkYXRhIGVudHJpZXNcbiAgY29uc3QgZGF0YXNldHMgPSBBcnJheS5pc0FycmF5KGFjdGlvbi5kYXRhc2V0cylcbiAgICA/IGFjdGlvbi5kYXRhc2V0c1xuICAgIDogW2FjdGlvbi5kYXRhc2V0c107XG5cbiAgaWYgKGFjdGlvbi5jb25maWcpIHtcbiAgICAvLyBhcHBseSBjb25maWcgaWYgcGFzc2VkIGZyb20gYWN0aW9uXG4gICAgc3RhdGUgPSByZWNlaXZlTWFwQ29uZmlnVXBkYXRlcihzdGF0ZSwge1xuICAgICAgcGF5bG9hZDoge3Zpc1N0YXRlOiBhY3Rpb24uY29uZmlnfVxuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgbmV3RGF0ZUVudHJpZXMgPSBkYXRhc2V0cy5yZWR1Y2UoXG4gICAgKGFjY3UsIHtpbmZvID0ge30sIGRhdGF9KSA9PiAoe1xuICAgICAgLi4uYWNjdSxcbiAgICAgIC4uLihjcmVhdGVOZXdEYXRhRW50cnkoe2luZm8sIGRhdGF9LCBzdGF0ZS5kYXRhc2V0cykgfHwge30pXG4gICAgfSksXG4gICAge31cbiAgKTtcblxuICBpZiAoIU9iamVjdC5rZXlzKG5ld0RhdGVFbnRyaWVzKS5sZW5ndGgpIHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuICBjb25zdCBzdGF0ZVdpdGhOZXdEYXRhID0ge1xuICAgIC4uLnN0YXRlLFxuICAgIGRhdGFzZXRzOiB7XG4gICAgICAuLi5zdGF0ZS5kYXRhc2V0cyxcbiAgICAgIC4uLm5ld0RhdGVFbnRyaWVzXG4gICAgfVxuICB9O1xuXG4gIC8vIHByZXZpb3VzbHkgc2F2ZWQgY29uZmlnIGJlZm9yZSBkYXRhIGxvYWRlZFxuICBjb25zdCB7XG4gICAgZmlsdGVyVG9CZU1lcmdlZCA9IFtdLFxuICAgIGxheWVyVG9CZU1lcmdlZCA9IFtdLFxuICAgIGludGVyYWN0aW9uVG9CZU1lcmdlZCA9IHt9XG4gIH0gPSBzdGF0ZVdpdGhOZXdEYXRhO1xuXG4gIC8vIG1lcmdlIHN0YXRlIHdpdGggc2F2ZWQgZmlsdGVyc1xuICBsZXQgbWVyZ2VkU3RhdGUgPSBtZXJnZUZpbHRlcnMoc3RhdGVXaXRoTmV3RGF0YSwgZmlsdGVyVG9CZU1lcmdlZCk7XG4gIC8vIG1lcmdlIHN0YXRlIHdpdGggc2F2ZWQgbGF5ZXJzXG4gIG1lcmdlZFN0YXRlID0gbWVyZ2VMYXllcnMobWVyZ2VkU3RhdGUsIGxheWVyVG9CZU1lcmdlZCk7XG5cbiAgaWYgKG1lcmdlZFN0YXRlLmxheWVycy5sZW5ndGggPT09IHN0YXRlLmxheWVycy5sZW5ndGgpIHtcbiAgICAvLyBubyBsYXllciBtZXJnZWQsIGZpbmQgZGVmYXVsdHNcbiAgICBtZXJnZWRTdGF0ZSA9IGFkZERlZmF1bHRMYXllcnMobWVyZ2VkU3RhdGUsIG5ld0RhdGVFbnRyaWVzKTtcbiAgfVxuXG4gIGlmIChtZXJnZWRTdGF0ZS5zcGxpdE1hcHMubGVuZ3RoKSB7XG4gICAgY29uc3QgbmV3TGF5ZXJzID0gbWVyZ2VkU3RhdGUubGF5ZXJzLmZpbHRlcihcbiAgICAgIGwgPT4gbC5jb25maWcuZGF0YUlkIGluIG5ld0RhdGVFbnRyaWVzXG4gICAgKTtcbiAgICAvLyBpZiBtYXAgaXMgc3BsaXRlZCwgYWRkIG5ldyBsYXllcnMgdG8gc3BsaXRNYXBzXG4gICAgbWVyZ2VkU3RhdGUgPSB7XG4gICAgICAuLi5tZXJnZWRTdGF0ZSxcbiAgICAgIHNwbGl0TWFwczogYWRkTmV3TGF5ZXJzVG9TcGxpdE1hcChtZXJnZWRTdGF0ZS5zcGxpdE1hcHMsIG5ld0xheWVycylcbiAgICB9O1xuICB9XG5cbiAgLy8gbWVyZ2Ugc3RhdGUgd2l0aCBzYXZlZCBpbnRlcmFjdGlvbnNcbiAgbWVyZ2VkU3RhdGUgPSBtZXJnZUludGVyYWN0aW9ucyhtZXJnZWRTdGF0ZSwgaW50ZXJhY3Rpb25Ub0JlTWVyZ2VkKTtcblxuICAvLyBpZiBubyB0b29sdGlwcyBtZXJnZWQgYWRkIGRlZmF1bHQgdG9vbHRpcHNcbiAgT2JqZWN0LmtleXMobmV3RGF0ZUVudHJpZXMpLmZvckVhY2goZGF0YUlkID0+IHtcbiAgICBjb25zdCB0b29sdGlwRmllbGRzID1cbiAgICAgIG1lcmdlZFN0YXRlLmludGVyYWN0aW9uQ29uZmlnLnRvb2x0aXAuY29uZmlnLmZpZWxkc1RvU2hvd1tkYXRhSWRdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheSh0b29sdGlwRmllbGRzKSB8fCAhdG9vbHRpcEZpZWxkcy5sZW5ndGgpIHtcbiAgICAgIG1lcmdlZFN0YXRlID0gYWRkRGVmYXVsdFRvb2x0aXBzKG1lcmdlZFN0YXRlLCBuZXdEYXRlRW50cmllc1tkYXRhSWRdKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiB1cGRhdGVBbGxMYXllckRvbWFpbkRhdGEobWVyZ2VkU3RhdGUsIE9iamVjdC5rZXlzKG5ld0RhdGVFbnRyaWVzKSk7XG59O1xuLyogZXNsaW50LWVuYWJsZSBtYXgtc3RhdGVtZW50cyAqL1xuXG5mdW5jdGlvbiBnZW5lcmF0ZUxheWVyTWV0YUZvclNwbGl0Vmlld3MobGF5ZXIpIHtcbiAgcmV0dXJuIHtcbiAgICBpc0F2YWlsYWJsZTogbGF5ZXIuY29uZmlnLmlzVmlzaWJsZSxcbiAgICBpc1Zpc2libGU6IGxheWVyLmNvbmZpZy5pc1Zpc2libGVcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCB3aWxsIGNvbXB1dGUgdGhlIGRlZmF1bHQgbWFwcyBjdXN0b20gbGlzdFxuICogYmFzZWQgb24gdGhlIGN1cnJlbnQgbGF5ZXJzIHN0YXR1c1xuICogQHBhcmFtIGxheWVyc1xuICogQHJldHVybnMge1sqLCpdfVxuICovXG5mdW5jdGlvbiBjb21wdXRlU3BsaXRNYXBMYXllcnMobGF5ZXJzKSB7XG4gIGNvbnN0IG1hcExheWVycyA9IGxheWVycy5yZWR1Y2UoXG4gICAgKG5ld0xheWVycywgY3VycmVudExheWVyKSA9PiAoe1xuICAgICAgLi4ubmV3TGF5ZXJzLFxuICAgICAgW2N1cnJlbnRMYXllci5pZF06IGdlbmVyYXRlTGF5ZXJNZXRhRm9yU3BsaXRWaWV3cyhjdXJyZW50TGF5ZXIpXG4gICAgfSksXG4gICAge31cbiAgKTtcbiAgcmV0dXJuIFtcbiAgICB7XG4gICAgICBsYXllcnM6IG1hcExheWVyc1xuICAgIH0sXG4gICAge1xuICAgICAgbGF5ZXJzOiBtYXBMYXllcnNcbiAgICB9XG4gIF07XG59XG5cbi8qKlxuICogUmVtb3ZlIGFuIGV4aXN0aW5nIGxheWVyIGZyb20gY3VzdG9tIG1hcCBsYXllciBvYmplY3RzXG4gKiBAcGFyYW0gc3RhdGVcbiAqIEBwYXJhbSBsYXllclxuICogQHJldHVybnMge1sqLCpdfSBNYXBzIG9mIGN1c3RvbSBsYXllciBvYmplY3RzXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUxheWVyRnJvbVNwbGl0TWFwcyhzdGF0ZSwgbGF5ZXIpIHtcbiAgcmV0dXJuIHN0YXRlLnNwbGl0TWFwcy5tYXAoc2V0dGluZ3MgPT4ge1xuICAgIGNvbnN0IHtsYXllcnN9ID0gc2V0dGluZ3M7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbiAgICBjb25zdCB7W2xheWVyLmlkXTogXywgLi4ubmV3TGF5ZXJzfSA9IGxheWVycztcbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnNldHRpbmdzLFxuICAgICAgbGF5ZXJzOiBuZXdMYXllcnNcbiAgICB9O1xuICB9KTtcbn1cblxuLyoqXG4gKiBBZGQgbmV3IGxheWVycyB0byBib3RoIGV4aXN0aW5nIG1hcHNcbiAqIEBwYXJhbSBzcGxpdE1hcHNcbiAqIEBwYXJhbSBsYXllcnNcbiAqIEByZXR1cm5zIHtbKiwqXX0gbmV3IHNwbGl0TWFwc1xuICovXG5mdW5jdGlvbiBhZGROZXdMYXllcnNUb1NwbGl0TWFwKHNwbGl0TWFwcywgbGF5ZXJzKSB7XG4gIGNvbnN0IG5ld0xheWVycyA9IEFycmF5LmlzQXJyYXkobGF5ZXJzKSA/IGxheWVycyA6IFtsYXllcnNdO1xuXG4gIGlmICghc3BsaXRNYXBzIHx8ICFzcGxpdE1hcHMubGVuZ3RoIHx8ICFuZXdMYXllcnMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHNwbGl0TWFwcztcbiAgfVxuXG4gIC8vIGFkZCBuZXcgbGF5ZXIgdG8gYm90aCBtYXBzLFxuICAvLyAgZG9uJ3Qgb3ZlcnJpZGUsIGlmIGxheWVyLmlkIGlzIGFscmVhZHkgaW4gc3BsaXRNYXBzLnNldHRpbmdzLmxheWVyc1xuICByZXR1cm4gc3BsaXRNYXBzLm1hcChzZXR0aW5ncyA9PiAoe1xuICAgIC4uLnNldHRpbmdzLFxuICAgIGxheWVyczoge1xuICAgICAgLi4uc2V0dGluZ3MubGF5ZXJzLFxuICAgICAgLi4ubmV3TGF5ZXJzLnJlZHVjZShcbiAgICAgICAgKGFjY3UsIG5ld0xheWVyKSA9PlxuICAgICAgICAgIG5ld0xheWVyLmNvbmZpZy5pc1Zpc2libGVcbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIC4uLmFjY3UsXG4gICAgICAgICAgICAgICAgW25ld0xheWVyLmlkXTogc2V0dGluZ3MubGF5ZXJzW25ld0xheWVyLmlkXVxuICAgICAgICAgICAgICAgICAgPyBzZXR0aW5ncy5sYXllcnNbbmV3TGF5ZXIuaWRdXG4gICAgICAgICAgICAgICAgICA6IGdlbmVyYXRlTGF5ZXJNZXRhRm9yU3BsaXRWaWV3cyhuZXdMYXllcilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiBhY2N1LFxuICAgICAgICB7fVxuICAgICAgKVxuICAgIH1cbiAgfSkpO1xufVxuXG4vKipcbiAqIEhpZGUgYW4gZXhpc3RpbmcgbGF5ZXJzIGZyb20gY3VzdG9tIG1hcCBsYXllciBvYmplY3RzXG4gKiBAcGFyYW0gc3RhdGVcbiAqIEBwYXJhbSBsYXllclxuICogQHJldHVybnMge1sqLCpdfSBNYXBzIG9mIGN1c3RvbSBsYXllciBvYmplY3RzXG4gKi9cbmZ1bmN0aW9uIHRvZ2dsZUxheWVyRnJvbVNwbGl0TWFwcyhzdGF0ZSwgbGF5ZXIpIHtcbiAgcmV0dXJuIHN0YXRlLnNwbGl0TWFwcy5tYXAoc2V0dGluZ3MgPT4ge1xuICAgIGNvbnN0IHtsYXllcnN9ID0gc2V0dGluZ3M7XG4gICAgY29uc3QgbmV3TGF5ZXJzID0ge1xuICAgICAgLi4ubGF5ZXJzLFxuICAgICAgW2xheWVyLmlkXTogZ2VuZXJhdGVMYXllck1ldGFGb3JTcGxpdFZpZXdzKGxheWVyKVxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc2V0dGluZ3MsXG4gICAgICBsYXllcnM6IG5ld0xheWVyc1xuICAgIH07XG4gIH0pO1xufVxuXG4vKipcbiAqIFdoZW4gYSB1c2VyIGNsaWNrcyBvbiB0aGUgc3BlY2lmaWMgbWFwIGNsb3NpbmcgaWNvblxuICogdGhlIGFwcGxpY2F0aW9uIHdpbGwgY2xvc2UgdGhlIHNlbGVjdGVkIG1hcFxuICogYW5kIHdpbGwgbWVyZ2UgdGhlIHJlbWFpbmluZyBvbmUgd2l0aCB0aGUgZ2xvYmFsIHN0YXRlXG4gKiBUT0RPOiBpIHRoaW5rIGluIHRoZSBmdXR1cmUgdGhpcyBhY3Rpb24gc2hvdWxkIGJlIGNhbGxlZCBtZXJnZSBtYXAgbGF5ZXJzIHdpdGggZ2xvYmFsIHNldHRpbmdzXG4gKiBAcGFyYW0gc3RhdGVcbiAqIEBwYXJhbSBhY3Rpb25cbiAqIEByZXR1cm5zIHsqfVxuICovXG5mdW5jdGlvbiBjbG9zZVNwZWNpZmljTWFwQXRJbmRleChzdGF0ZSwgYWN0aW9uKSB7XG4gIC8vIHJldHJpZXZlIGxheWVycyBtZXRhIGRhdGEgZnJvbSB0aGUgcmVtYWluaW5nIG1hcCB0aGF0IHdlIG5lZWQgdG8ga2VlcFxuICBjb25zdCBpbmRleFRvUmV0cmlldmUgPSAxIC0gYWN0aW9uLnBheWxvYWQ7XG5cbiAgY29uc3QgbWV0YVNldHRpbmdzID0gc3RhdGUuc3BsaXRNYXBzW2luZGV4VG9SZXRyaWV2ZV07XG4gIGlmICghbWV0YVNldHRpbmdzIHx8ICFtZXRhU2V0dGluZ3MubGF5ZXJzKSB7XG4gICAgLy8gaWYgd2UgY2FuJ3QgZmluZCB0aGUgbWV0YSBzZXR0aW5ncyB3ZSBzaW1wbHkgY2xlYW4gdXAgc3BsaXRNYXBzIGFuZFxuICAgIC8vIGtlZXAgZ2xvYmFsIHN0YXRlIGFzIGl0IGlzXG4gICAgLy8gYnV0IHdoeSBkb2VzIHRoaXMgZXZlciBoYXBwZW4/XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgc3BsaXRNYXBzOiBbXVxuICAgIH07XG4gIH1cblxuICBjb25zdCB7bGF5ZXJzfSA9IHN0YXRlO1xuXG4gIC8vIHVwZGF0ZSBsYXllciB2aXNpYmlsaXR5XG4gIGNvbnN0IG5ld0xheWVycyA9IGxheWVycy5tYXAobGF5ZXIgPT5cbiAgICBsYXllci51cGRhdGVMYXllckNvbmZpZyh7XG4gICAgICBpc1Zpc2libGU6IG1ldGFTZXR0aW5ncy5sYXllcnNbbGF5ZXIuaWRdXG4gICAgICAgID8gbWV0YVNldHRpbmdzLmxheWVyc1tsYXllci5pZF0uaXNWaXNpYmxlXG4gICAgICAgIDogbGF5ZXIuY29uZmlnLmlzVmlzaWJsZVxuICAgIH0pXG4gICk7XG5cbiAgLy8gZGVsZXRlIG1hcFxuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIGxheWVyczogbmV3TGF5ZXJzLFxuICAgIHNwbGl0TWFwczogW11cbiAgfTtcbn1cblxuLyoqXG4gKiBUcmlnZ2VyIGZpbGUgbG9hZGluZyBkaXNwYXRjaCBgYWRkRGF0YVRvTWFwYCBpZiBzdWNjZWVkLCBvciBgbG9hZEZpbGVzRXJyYCBpZiBmYWlsZWRcbiAqIEBwYXJhbSB7Kn0gc3RhdGVcbiAqIEBwYXJhbSB7Kn0gYWN0aW9uXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBsb2FkRmlsZXNVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgY29uc3Qge2ZpbGVzfSA9IGFjdGlvbjtcblxuICBjb25zdCBmaWxlc1RvTG9hZCA9IGZpbGVzLm1hcChmaWxlQmxvYiA9PiBwcm9jZXNzRmlsZVRvTG9hZChmaWxlQmxvYikpO1xuXG4gIC8vIHJlYWRlciAtPiBwYXJzZXIgLT4gYXVnbWVudCAtPiByZWNlaXZlVmlzRGF0YVxuICBjb25zdCBsb2FkRmlsZVRhc2tzID0gW1xuICAgIFRhc2suYWxsKGZpbGVzVG9Mb2FkLm1hcChMT0FEX0ZJTEVfVEFTSykpLmJpbWFwKFxuICAgICAgcmVzdWx0cyA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSByZXN1bHRzLnJlZHVjZSgoZiwgYykgPT4gKHtcbiAgICAgICAgICAvLyB1c2luZyBjb25jYXQgaGVyZSBiZWNhdXNlIHRoZSBjdXJyZW50IGRhdGFzZXRzIGNvdWxkIGJlIGFuIGFycmF5IG9yIGEgc2luZ2xlIGl0ZW1cbiAgICAgICAgICBkYXRhc2V0czogZi5kYXRhc2V0cy5jb25jYXQoYy5kYXRhc2V0cyksXG4gICAgICAgICAgLy8gd2UgbmVlZCB0byBkZWVwIG1lcmdlIHRoaXMgdGhpbmcgdW5sZXNzIHdlIGZpbmQgYSBiZXR0ZXIgc29sdXRpb25cbiAgICAgICAgICAvLyB0aGlzIGNhc2Ugd2lsbCBvbmx5IGhhcHBlbiBpZiB3ZSBhbGxvdyB0byBsb2FkIG11bHRpcGxlIGtlcGxlcmdsIGpzb24gZmlsZXNcbiAgICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIC4uLmYuY29uZmlnLFxuICAgICAgICAgICAgLi4uKGMuY29uZmlnIHx8IHt9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSksIHtkYXRhc2V0czogW10sIGNvbmZpZzoge30sIG9wdGlvbnM6IHtjZW50ZXJNYXA6IHRydWV9fSk7XG4gICAgICAgIHJldHVybiBhZGREYXRhVG9NYXAoZGF0YSk7XG4gICAgICB9LFxuICAgICAgZXJyb3IgPT4gbG9hZEZpbGVzRXJyKGVycm9yKVxuICAgIClcbiAgXTtcblxuICByZXR1cm4gd2l0aFRhc2soXG4gICAge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBmaWxlTG9hZGluZzogdHJ1ZVxuICAgIH0sXG4gICAgbG9hZEZpbGVUYXNrc1xuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IGxvYWRGaWxlc0VyclVwZGF0ZXIgPSAoc3RhdGUsIHtlcnJvcn0pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBmaWxlTG9hZGluZzogZmFsc2UsXG4gIGZpbGVMb2FkaW5nRXJyOiBlcnJvclxufSk7XG5cbi8qKlxuICogaGVscGVyIGZ1bmN0aW9uIHRvIHVwZGF0ZSBBbGwgbGF5ZXIgZG9tYWluIGFuZCBsYXllciBkYXRhIG9mIHN0YXRlXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHN0YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0YXNldHNcbiAqIEByZXR1cm5zIHtvYmplY3R9IHN0YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGREZWZhdWx0TGF5ZXJzKHN0YXRlLCBkYXRhc2V0cykge1xuICBjb25zdCBkZWZhdWx0TGF5ZXJzID0gT2JqZWN0LnZhbHVlcyhkYXRhc2V0cykucmVkdWNlKFxuICAgIChhY2N1LCBkYXRhc2V0KSA9PiBbXG4gICAgICAuLi5hY2N1LFxuICAgICAgLi4uKGZpbmREZWZhdWx0TGF5ZXIoZGF0YXNldCwgc3RhdGUubGF5ZXJDbGFzc2VzKSB8fCBbXSlcbiAgICBdLFxuICAgIFtdXG4gICk7XG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgbGF5ZXJzOiBbLi4uc3RhdGUubGF5ZXJzLCAuLi5kZWZhdWx0TGF5ZXJzXSxcbiAgICBsYXllck9yZGVyOiBbXG4gICAgICAvLyBwdXQgbmV3IGxheWVycyBvbiB0b3Agb2Ygb2xkIG9uZXNcbiAgICAgIC4uLmRlZmF1bHRMYXllcnMubWFwKChfLCBpKSA9PiBzdGF0ZS5sYXllcnMubGVuZ3RoICsgaSksXG4gICAgICAuLi5zdGF0ZS5sYXllck9yZGVyXG4gICAgXVxuICB9O1xufVxuXG4vKipcbiAqIGhlbHBlciBmdW5jdGlvbiB0byBmaW5kIGRlZmF1bHQgdG9vbHRpcHNcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gc3RhdGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhc2V0XG4gKiBAcmV0dXJucyB7b2JqZWN0fSBzdGF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkRGVmYXVsdFRvb2x0aXBzKHN0YXRlLCBkYXRhc2V0KSB7XG4gIGNvbnN0IHRvb2x0aXBGaWVsZHMgPSBmaW5kRmllbGRzVG9TaG93KGRhdGFzZXQpO1xuXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgaW50ZXJhY3Rpb25Db25maWc6IHtcbiAgICAgIC4uLnN0YXRlLmludGVyYWN0aW9uQ29uZmlnLFxuICAgICAgdG9vbHRpcDoge1xuICAgICAgICAuLi5zdGF0ZS5pbnRlcmFjdGlvbkNvbmZpZy50b29sdGlwLFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAvLyBmaW5kIGRlZmF1bHQgZmllbGRzIHRvIHNob3cgaW4gdG9vbHRpcFxuICAgICAgICAgIGZpZWxkc1RvU2hvdzoge1xuICAgICAgICAgICAgLi4uc3RhdGUuaW50ZXJhY3Rpb25Db25maWcudG9vbHRpcC5jb25maWcuZmllbGRzVG9TaG93LFxuICAgICAgICAgICAgLi4udG9vbHRpcEZpZWxkc1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxuLyoqXG4gKiBoZWxwZXIgZnVuY3Rpb24gdG8gdXBkYXRlIGxheWVyIGRvbWFpbnMgZm9yIGFuIGFycmF5IG9mIGRhdHNldHNcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gc3RhdGVcbiAqIEBwYXJhbSB7YXJyYXkgfCBzdHJpbmd9IGRhdGFJZFxuICogQHBhcmFtIHtvYmplY3R9IG5ld0ZpbHRlciAtIGlmIGlzIGNhbGxlZCBieSBzZXRGaWx0ZXIsIHRoZSBmaWx0ZXIgdGhhdCBoYXMgY2hhbmdlZFxuICogQHJldHVybnMge29iamVjdH0gc3RhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUFsbExheWVyRG9tYWluRGF0YShzdGF0ZSwgZGF0YUlkLCBuZXdGaWx0ZXIpIHtcbiAgY29uc3QgZGF0YUlkcyA9IHR5cGVvZiBkYXRhSWQgPT09ICdzdHJpbmcnID8gW2RhdGFJZF0gOiBkYXRhSWQ7XG4gIGNvbnN0IG5ld0xheWVycyA9IFtdO1xuICBjb25zdCBuZXdMYXllckRhdGFzID0gW107XG5cbiAgc3RhdGUubGF5ZXJzLmZvckVhY2goKG9sZExheWVyLCBpKSA9PiB7XG4gICAgaWYgKG9sZExheWVyLmNvbmZpZy5kYXRhSWQgJiYgZGF0YUlkcy5pbmNsdWRlcyhvbGRMYXllci5jb25maWcuZGF0YUlkKSkge1xuICAgICAgLy8gTm8gbmVlZCB0byByZWNhbGN1bGF0ZSBsYXllciBkb21haW4gaWYgZmlsdGVyIGhhcyBmaXhlZCBkb21haW5cbiAgICAgIGNvbnN0IG5ld0xheWVyID1cbiAgICAgICAgbmV3RmlsdGVyICYmIG5ld0ZpbHRlci5maXhlZERvbWFpblxuICAgICAgICAgID8gb2xkTGF5ZXJcbiAgICAgICAgICA6IG9sZExheWVyLnVwZGF0ZUxheWVyRG9tYWluKFxuICAgICAgICAgICAgICBzdGF0ZS5kYXRhc2V0c1tvbGRMYXllci5jb25maWcuZGF0YUlkXSxcbiAgICAgICAgICAgICAgbmV3RmlsdGVyXG4gICAgICAgICAgICApO1xuXG4gICAgICBjb25zdCB7bGF5ZXJEYXRhLCBsYXllcn0gPSBjYWxjdWxhdGVMYXllckRhdGEoXG4gICAgICAgIG5ld0xheWVyLFxuICAgICAgICBzdGF0ZSxcbiAgICAgICAgc3RhdGUubGF5ZXJEYXRhW2ldXG4gICAgICApO1xuXG4gICAgICBuZXdMYXllcnMucHVzaChsYXllcik7XG4gICAgICBuZXdMYXllckRhdGFzLnB1c2gobGF5ZXJEYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3TGF5ZXJzLnB1c2gob2xkTGF5ZXIpO1xuICAgICAgbmV3TGF5ZXJEYXRhcy5wdXNoKHN0YXRlLmxheWVyRGF0YVtpXSk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIGxheWVyczogbmV3TGF5ZXJzLFxuICAgIGxheWVyRGF0YTogbmV3TGF5ZXJEYXRhc1xuICB9O1xufVxuIl19