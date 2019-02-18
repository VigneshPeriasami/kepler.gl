"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInitialInputStyle = getInitialInputStyle;
exports.addCustomMapStyleUpdater = exports.inputMapStyleUpdater = exports.loadCustomMapStyleUpdater = exports.resetMapConfigMapStyleUpdater = exports.receiveMapConfigUpdater = exports.loadMapStyleErrUpdater = exports.loadMapStylesUpdater = exports.mapStyleChangeUpdater = exports.mapConfigChangeUpdater = exports.initMapStyleUpdater = exports.INITIAL_MAP_STYLE = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread6 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _immutable = _interopRequireDefault(require("immutable"));

var _tasks = _interopRequireWildcard(require("react-palm/tasks"));

var _mapboxGlStyleEditor = require("../utils/map-style-utils/mapbox-gl-style-editor");

var _defaultSettings = require("../constants/default-settings");

var _utils = require("../utils/utils");

var _tasks2 = require("../tasks/tasks");

var _mapStyleActions = require("../actions/map-style-actions");

var _d3Color = require("d3-color");

var _colorUtils = require("../utils/color-utils");

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
// Utils
var DEFAULT_BLDG_COLOR = '#D1CEC7';

var getDefaultState = function getDefaultState() {
  var visibleLayerGroups = {};
  var styleType = 'dark';
  var topLayerGroups = {};
  return {
    styleType: styleType,
    visibleLayerGroups: visibleLayerGroups,
    topLayerGroups: topLayerGroups,
    mapStyles: _defaultSettings.DEFAULT_MAP_STYLES.reduce(function (accu, curr) {
      return (0, _objectSpread6.default)({}, accu, (0, _defineProperty2.default)({}, curr.id, curr));
    }, {}),
    // save mapbox access token
    mapboxApiAccessToken: null,
    inputStyle: getInitialInputStyle(),
    threeDBuildingColor: (0, _colorUtils.hexToRgb)(DEFAULT_BLDG_COLOR)
  };
};
/**
 * Default initial `mapStyle`
 * @constant
 * @property {string} styleType - Default: 'dark'
 * @property {Object} visibleLayerGroups - Default: {}
 * @property {Object} topLayerGroups - Default: {}
 * @property {Object} mapStyles - mapping from style key to style obejct
 * @property {string} mapboxApiAccessToken - Default: null
 * @property {Object} inputStyle - Default: {}
 * @property {Array} threeDBuildingColor - Default: [r, g, b]
 * @public
 */


var INITIAL_MAP_STYLE = getDefaultState();
/**
 * Create two map styles from preset map style, one for top map one for bottom
 *
 * @param {string} styleType - current map style
 * @param {object} visibleLayerGroups - visible layers of bottom map
 * @param {object} topLayerGroups - visible layers of top map
 * @param {object} mapStyles - a dictionary of all map styles
 * @returns {object} bottomMapStyle | topMapStyle | isRaster
 */

exports.INITIAL_MAP_STYLE = INITIAL_MAP_STYLE;

function getMapStyles(_ref) {
  var styleType = _ref.styleType,
      visibleLayerGroups = _ref.visibleLayerGroups,
      topLayerGroups = _ref.topLayerGroups,
      mapStyles = _ref.mapStyles;
  var mapStyle = mapStyles[styleType]; // style might not be loaded yet

  if (!mapStyle || !mapStyle.style) {
    return {};
  }

  var editable = Object.keys(visibleLayerGroups).length;
  var bottomMapStyle = !editable ? _immutable.default.fromJS(mapStyle.style) : (0, _mapboxGlStyleEditor.editBottomMapStyle)({
    id: styleType,
    mapStyle: mapStyle,
    visibleLayerGroups: visibleLayerGroups
  });
  var hasTopLayer = editable && Object.values(topLayerGroups).some(function (v) {
    return v;
  }); // mute top layer if not visible in bottom layer

  var topLayers = hasTopLayer && Object.keys(topLayerGroups).reduce(function (accu, key) {
    return (0, _objectSpread6.default)({}, accu, (0, _defineProperty2.default)({}, key, topLayerGroups[key] && visibleLayerGroups[key]));
  }, {});
  var topMapStyle = hasTopLayer ? (0, _mapboxGlStyleEditor.editTopMapStyle)({
    id: styleType,
    mapStyle: mapStyle,
    visibleLayerGroups: topLayers
  }) : null;
  var threeDBuildingColor = get3DBuildingColor(mapStyle);
  return {
    bottomMapStyle: bottomMapStyle,
    topMapStyle: topMapStyle,
    editable: editable,
    threeDBuildingColor: threeDBuildingColor
  };
}

function get3DBuildingColor(style) {
  // set building color to be the same as the background color.
  var backgroundLayer = (style.style.layers || []).find(function (_ref2) {
    var id = _ref2.id;
    return id === 'background';
  });
  var buildingColor = backgroundLayer && backgroundLayer.paint && backgroundLayer.paint['background-color'] ? backgroundLayer.paint['background-color'] : DEFAULT_BLDG_COLOR; // brighten or darken building based on style

  var operation = style.id.match(/(?=(dark|night))/) ? 'brighter' : 'darker';
  var rgbObj = (0, _d3Color.rgb)(buildingColor)[operation]([0.2]);
  return [rgbObj.r, rgbObj.g, rgbObj.b];
}

function getLayerGroupsFromStyle(style) {
  return _defaultSettings.DEFAULT_LAYER_GROUPS.filter(function (lg) {
    return style.layers.filter(lg.filter).length;
  });
} // Updaters


var initMapStyleUpdater = function initMapStyleUpdater(state, action) {
  return (0, _objectSpread6.default)({}, state, {
    // save mapbox access token to map style state
    mapboxApiAccessToken: (action.payload || {}).mapboxApiAccessToken
  });
};

exports.initMapStyleUpdater = initMapStyleUpdater;

var mapConfigChangeUpdater = function mapConfigChangeUpdater(state, action) {
  return (0, _objectSpread6.default)({}, state, action.payload, getMapStyles((0, _objectSpread6.default)({}, state, action.payload)));
};

exports.mapConfigChangeUpdater = mapConfigChangeUpdater;

var mapStyleChangeUpdater = function mapStyleChangeUpdater(state, _ref3) {
  var styleType = _ref3.payload;

  if (!state.mapStyles[styleType]) {
    // we might not have received the style yet
    return state;
  }

  var defaultLGVisibility = (0, _mapboxGlStyleEditor.getDefaultLayerGroupVisibility)(state.mapStyles[styleType]);
  var visibleLayerGroups = (0, _mapboxGlStyleEditor.mergeLayerGroupVisibility)(defaultLGVisibility, state.visibleLayerGroups);
  return (0, _objectSpread6.default)({}, state, {
    styleType: styleType,
    visibleLayerGroups: visibleLayerGroups
  }, getMapStyles((0, _objectSpread6.default)({}, state, {
    visibleLayerGroups: visibleLayerGroups,
    styleType: styleType
  })));
};

exports.mapStyleChangeUpdater = mapStyleChangeUpdater;

var loadMapStylesUpdater = function loadMapStylesUpdater(state, action) {
  var newStyles = action.payload; // add new styles to state

  var newState = (0, _objectSpread6.default)({}, state, {
    mapStyles: (0, _objectSpread6.default)({}, state.mapStyles, newStyles)
  });
  return newStyles[state.styleType] ? mapStyleChangeUpdater(newState, {
    payload: state.styleType
  }) : newState;
}; // do nothing for now, if didn't load, skip it


exports.loadMapStylesUpdater = loadMapStylesUpdater;

var loadMapStyleErrUpdater = function loadMapStyleErrUpdater(state, action) {
  return state;
};

exports.loadMapStyleErrUpdater = loadMapStyleErrUpdater;

var receiveMapConfigUpdater = function receiveMapConfigUpdater(state, _ref4) {
  var mapStyle = _ref4.payload.mapStyle;

  if (!mapStyle) {
    return state;
  } // if saved custom mapStyles load the style object


  var loadMapStyleTasks = mapStyle.mapStyles ? [_tasks.default.all(Object.values(mapStyle.mapStyles).map(function (_ref5) {
    var id = _ref5.id,
        url = _ref5.url,
        accessToken = _ref5.accessToken;
    return {
      id: id,
      url: (0, _mapboxGlStyleEditor.getStyleDownloadUrl)(url, accessToken || state.mapboxApiAccessToken)
    };
  }).map(_tasks2.LOAD_MAP_STYLE_TASK)).bimap( // success
  function (results) {
    return (0, _mapStyleActions.loadMapStyles)(results.reduce(function (accu, _ref6) {
      var id = _ref6.id,
          style = _ref6.style;
      return (0, _objectSpread6.default)({}, accu, (0, _defineProperty2.default)({}, id, (0, _objectSpread6.default)({}, mapStyle.mapStyles[id], {
        layerGroups: getLayerGroupsFromStyle(style),
        style: style
      })));
    }, {}));
  }, // error
  function (error) {
    return (0, _mapStyleActions.loadMapStyleErr)(error);
  })] : null;
  var newState = mapConfigChangeUpdater(state, {
    payload: mapStyle
  });
  return loadMapStyleTasks ? (0, _tasks.withTask)(newState, loadMapStyleTasks) : newState;
};

exports.receiveMapConfigUpdater = receiveMapConfigUpdater;

var resetMapConfigMapStyleUpdater = function resetMapConfigMapStyleUpdater(state) {
  var emptyConfig = (0, _objectSpread6.default)({}, INITIAL_MAP_STYLE, {
    mapboxApiAccessToken: state.mapboxApiAccessToken
  }, state.initialState, {
    mapStyles: state.mapStyles,
    initialState: state.initialState
  });
  return mapStyleChangeUpdater(emptyConfig, {
    payload: emptyConfig.styleType
  });
};

exports.resetMapConfigMapStyleUpdater = resetMapConfigMapStyleUpdater;

var loadCustomMapStyleUpdater = function loadCustomMapStyleUpdater(state, _ref7) {
  var _ref7$payload = _ref7.payload,
      icon = _ref7$payload.icon,
      style = _ref7$payload.style,
      error = _ref7$payload.error;
  return (0, _objectSpread6.default)({}, state, {
    inputStyle: (0, _objectSpread6.default)({}, state.inputStyle, style ? {
      id: style.id || (0, _utils.generateHashId)(),
      // make a copy of the style object
      style: JSON.parse(JSON.stringify(style)),
      label: style.name,
      // gathering layer group info from style json
      layerGroups: getLayerGroupsFromStyle(style)
    } : {}, icon ? {
      icon: icon
    } : {}, error !== undefined ? {
      error: error
    } : {})
  });
};

exports.loadCustomMapStyleUpdater = loadCustomMapStyleUpdater;

var inputMapStyleUpdater = function inputMapStyleUpdater(state, _ref8) {
  var inputStyle = _ref8.payload;
  return (0, _objectSpread6.default)({}, state, {
    inputStyle: (0, _objectSpread6.default)({}, inputStyle, {
      isValid: (0, _mapboxGlStyleEditor.isValidStyleUrl)(inputStyle.url)
    })
  });
};

exports.inputMapStyleUpdater = inputMapStyleUpdater;

var addCustomMapStyleUpdater = function addCustomMapStyleUpdater(state, action) {
  var styleId = state.inputStyle.id;
  var newState = (0, _objectSpread6.default)({}, state, {
    mapStyles: (0, _objectSpread6.default)({}, state.mapStyles, (0, _defineProperty2.default)({}, styleId, state.inputStyle)),
    // set to default
    inputStyle: getInitialInputStyle()
  }); // set new style

  return mapStyleChangeUpdater(newState, {
    payload: styleId
  });
};

exports.addCustomMapStyleUpdater = addCustomMapStyleUpdater;

function getInitialInputStyle() {
  return {
    accessToken: null,
    error: false,
    isValid: false,
    label: null,
    style: null,
    url: null,
    custom: true
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy9tYXAtc3R5bGUtdXBkYXRlcnMuanMiXSwibmFtZXMiOlsiREVGQVVMVF9CTERHX0NPTE9SIiwiZ2V0RGVmYXVsdFN0YXRlIiwidmlzaWJsZUxheWVyR3JvdXBzIiwic3R5bGVUeXBlIiwidG9wTGF5ZXJHcm91cHMiLCJtYXBTdHlsZXMiLCJERUZBVUxUX01BUF9TVFlMRVMiLCJyZWR1Y2UiLCJhY2N1IiwiY3VyciIsImlkIiwibWFwYm94QXBpQWNjZXNzVG9rZW4iLCJpbnB1dFN0eWxlIiwiZ2V0SW5pdGlhbElucHV0U3R5bGUiLCJ0aHJlZURCdWlsZGluZ0NvbG9yIiwiSU5JVElBTF9NQVBfU1RZTEUiLCJnZXRNYXBTdHlsZXMiLCJtYXBTdHlsZSIsInN0eWxlIiwiZWRpdGFibGUiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiYm90dG9tTWFwU3R5bGUiLCJJbW11dGFibGUiLCJmcm9tSlMiLCJoYXNUb3BMYXllciIsInZhbHVlcyIsInNvbWUiLCJ2IiwidG9wTGF5ZXJzIiwia2V5IiwidG9wTWFwU3R5bGUiLCJnZXQzREJ1aWxkaW5nQ29sb3IiLCJiYWNrZ3JvdW5kTGF5ZXIiLCJsYXllcnMiLCJmaW5kIiwiYnVpbGRpbmdDb2xvciIsInBhaW50Iiwib3BlcmF0aW9uIiwibWF0Y2giLCJyZ2JPYmoiLCJyIiwiZyIsImIiLCJnZXRMYXllckdyb3Vwc0Zyb21TdHlsZSIsIkRFRkFVTFRfTEFZRVJfR1JPVVBTIiwiZmlsdGVyIiwibGciLCJpbml0TWFwU3R5bGVVcGRhdGVyIiwic3RhdGUiLCJhY3Rpb24iLCJwYXlsb2FkIiwibWFwQ29uZmlnQ2hhbmdlVXBkYXRlciIsIm1hcFN0eWxlQ2hhbmdlVXBkYXRlciIsImRlZmF1bHRMR1Zpc2liaWxpdHkiLCJsb2FkTWFwU3R5bGVzVXBkYXRlciIsIm5ld1N0eWxlcyIsIm5ld1N0YXRlIiwibG9hZE1hcFN0eWxlRXJyVXBkYXRlciIsInJlY2VpdmVNYXBDb25maWdVcGRhdGVyIiwibG9hZE1hcFN0eWxlVGFza3MiLCJUYXNrIiwiYWxsIiwibWFwIiwidXJsIiwiYWNjZXNzVG9rZW4iLCJMT0FEX01BUF9TVFlMRV9UQVNLIiwiYmltYXAiLCJyZXN1bHRzIiwibGF5ZXJHcm91cHMiLCJlcnJvciIsInJlc2V0TWFwQ29uZmlnTWFwU3R5bGVVcGRhdGVyIiwiZW1wdHlDb25maWciLCJpbml0aWFsU3RhdGUiLCJsb2FkQ3VzdG9tTWFwU3R5bGVVcGRhdGVyIiwiaWNvbiIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsImxhYmVsIiwibmFtZSIsInVuZGVmaW5lZCIsImlucHV0TWFwU3R5bGVVcGRhdGVyIiwiaXNWYWxpZCIsImFkZEN1c3RvbU1hcFN0eWxlVXBkYXRlciIsInN0eWxlSWQiLCJjdXN0b20iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBR0E7O0FBUUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFnQkEsSUFBTUEsa0JBQWtCLEdBQUcsU0FBM0I7O0FBRUEsSUFBTUMsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixHQUFNO0FBQzVCLE1BQU1DLGtCQUFrQixHQUFHLEVBQTNCO0FBQ0EsTUFBTUMsU0FBUyxHQUFHLE1BQWxCO0FBQ0EsTUFBTUMsY0FBYyxHQUFHLEVBQXZCO0FBRUEsU0FBTztBQUNMRCxJQUFBQSxTQUFTLEVBQVRBLFNBREs7QUFFTEQsSUFBQUEsa0JBQWtCLEVBQWxCQSxrQkFGSztBQUdMRSxJQUFBQSxjQUFjLEVBQWRBLGNBSEs7QUFJTEMsSUFBQUEsU0FBUyxFQUFFQyxvQ0FBbUJDLE1BQW5CLENBQTBCLFVBQUNDLElBQUQsRUFBT0MsSUFBUDtBQUFBLDZDQUNoQ0QsSUFEZ0Msb0NBRWxDQyxJQUFJLENBQUNDLEVBRjZCLEVBRXhCRCxJQUZ3QjtBQUFBLEtBQTFCLEVBR1AsRUFITyxDQUpOO0FBUUw7QUFDQUUsSUFBQUEsb0JBQW9CLEVBQUUsSUFUakI7QUFVTEMsSUFBQUEsVUFBVSxFQUFFQyxvQkFBb0IsRUFWM0I7QUFXTEMsSUFBQUEsbUJBQW1CLEVBQUUsMEJBQVNkLGtCQUFUO0FBWGhCLEdBQVA7QUFhRCxDQWxCRDtBQW9CQTs7Ozs7Ozs7Ozs7Ozs7QUFZTyxJQUFNZSxpQkFBaUIsR0FBR2QsZUFBZSxFQUF6QztBQUVQOzs7Ozs7Ozs7Ozs7QUFTQSxTQUFTZSxZQUFULE9BS0c7QUFBQSxNQUpEYixTQUlDLFFBSkRBLFNBSUM7QUFBQSxNQUhERCxrQkFHQyxRQUhEQSxrQkFHQztBQUFBLE1BRkRFLGNBRUMsUUFGREEsY0FFQztBQUFBLE1BRERDLFNBQ0MsUUFEREEsU0FDQztBQUNELE1BQU1ZLFFBQVEsR0FBR1osU0FBUyxDQUFDRixTQUFELENBQTFCLENBREMsQ0FHRDs7QUFDQSxNQUFJLENBQUNjLFFBQUQsSUFBYSxDQUFDQSxRQUFRLENBQUNDLEtBQTNCLEVBQWtDO0FBQ2hDLFdBQU8sRUFBUDtBQUNEOztBQUVELE1BQU1DLFFBQVEsR0FBR0MsTUFBTSxDQUFDQyxJQUFQLENBQVluQixrQkFBWixFQUFnQ29CLE1BQWpEO0FBRUEsTUFBTUMsY0FBYyxHQUFHLENBQUNKLFFBQUQsR0FDbkJLLG1CQUFVQyxNQUFWLENBQWlCUixRQUFRLENBQUNDLEtBQTFCLENBRG1CLEdBRW5CLDZDQUFtQjtBQUNqQlIsSUFBQUEsRUFBRSxFQUFFUCxTQURhO0FBRWpCYyxJQUFBQSxRQUFRLEVBQVJBLFFBRmlCO0FBR2pCZixJQUFBQSxrQkFBa0IsRUFBbEJBO0FBSGlCLEdBQW5CLENBRko7QUFRQSxNQUFNd0IsV0FBVyxHQUFHUCxRQUFRLElBQUlDLE1BQU0sQ0FBQ08sTUFBUCxDQUFjdkIsY0FBZCxFQUE4QndCLElBQTlCLENBQW1DLFVBQUFDLENBQUM7QUFBQSxXQUFJQSxDQUFKO0FBQUEsR0FBcEMsQ0FBaEMsQ0FsQkMsQ0FvQkQ7O0FBQ0EsTUFBTUMsU0FBUyxHQUNiSixXQUFXLElBQ1hOLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZakIsY0FBWixFQUE0QkcsTUFBNUIsQ0FDRSxVQUFDQyxJQUFELEVBQU91QixHQUFQO0FBQUEsMkNBQ0t2QixJQURMLG9DQUVHdUIsR0FGSCxFQUVTM0IsY0FBYyxDQUFDMkIsR0FBRCxDQUFkLElBQXVCN0Isa0JBQWtCLENBQUM2QixHQUFELENBRmxEO0FBQUEsR0FERixFQUtFLEVBTEYsQ0FGRjtBQVVBLE1BQU1DLFdBQVcsR0FBR04sV0FBVyxHQUMzQiwwQ0FBZ0I7QUFDZGhCLElBQUFBLEVBQUUsRUFBRVAsU0FEVTtBQUVkYyxJQUFBQSxRQUFRLEVBQVJBLFFBRmM7QUFHZGYsSUFBQUEsa0JBQWtCLEVBQUU0QjtBQUhOLEdBQWhCLENBRDJCLEdBTTNCLElBTko7QUFPQSxNQUFNaEIsbUJBQW1CLEdBQUdtQixrQkFBa0IsQ0FBQ2hCLFFBQUQsQ0FBOUM7QUFDQSxTQUFPO0FBQUNNLElBQUFBLGNBQWMsRUFBZEEsY0FBRDtBQUFpQlMsSUFBQUEsV0FBVyxFQUFYQSxXQUFqQjtBQUE4QmIsSUFBQUEsUUFBUSxFQUFSQSxRQUE5QjtBQUF3Q0wsSUFBQUEsbUJBQW1CLEVBQW5CQTtBQUF4QyxHQUFQO0FBQ0Q7O0FBRUQsU0FBU21CLGtCQUFULENBQTRCZixLQUE1QixFQUFtQztBQUNqQztBQUNBLE1BQU1nQixlQUFlLEdBQUcsQ0FBQ2hCLEtBQUssQ0FBQ0EsS0FBTixDQUFZaUIsTUFBWixJQUFzQixFQUF2QixFQUEyQkMsSUFBM0IsQ0FBZ0M7QUFBQSxRQUFFMUIsRUFBRixTQUFFQSxFQUFGO0FBQUEsV0FBVUEsRUFBRSxLQUFLLFlBQWpCO0FBQUEsR0FBaEMsQ0FBeEI7QUFDQSxNQUFNMkIsYUFBYSxHQUFHSCxlQUFlLElBQUlBLGVBQWUsQ0FBQ0ksS0FBbkMsSUFBNENKLGVBQWUsQ0FBQ0ksS0FBaEIsQ0FBc0Isa0JBQXRCLENBQTVDLEdBQ0FKLGVBQWUsQ0FBQ0ksS0FBaEIsQ0FBc0Isa0JBQXRCLENBREEsR0FDNEN0QyxrQkFEbEUsQ0FIaUMsQ0FLakM7O0FBQ0EsTUFBTXVDLFNBQVMsR0FBR3JCLEtBQUssQ0FBQ1IsRUFBTixDQUFTOEIsS0FBVCxDQUFlLGtCQUFmLElBQXFDLFVBQXJDLEdBQWtELFFBQXBFO0FBQ0EsTUFBTUMsTUFBTSxHQUFHLGtCQUFJSixhQUFKLEVBQW1CRSxTQUFuQixFQUE4QixDQUFDLEdBQUQsQ0FBOUIsQ0FBZjtBQUNBLFNBQU8sQ0FBQ0UsTUFBTSxDQUFDQyxDQUFSLEVBQVdELE1BQU0sQ0FBQ0UsQ0FBbEIsRUFBcUJGLE1BQU0sQ0FBQ0csQ0FBNUIsQ0FBUDtBQUNEOztBQUVELFNBQVNDLHVCQUFULENBQWlDM0IsS0FBakMsRUFBd0M7QUFDdEMsU0FBTzRCLHNDQUFxQkMsTUFBckIsQ0FBNEIsVUFBQUMsRUFBRTtBQUFBLFdBQUk5QixLQUFLLENBQUNpQixNQUFOLENBQWFZLE1BQWIsQ0FBb0JDLEVBQUUsQ0FBQ0QsTUFBdkIsRUFBK0J6QixNQUFuQztBQUFBLEdBQTlCLENBQVA7QUFDRCxDLENBRUQ7OztBQUNPLElBQU0yQixtQkFBbUIsR0FBRyxTQUF0QkEsbUJBQXNCLENBQUNDLEtBQUQsRUFBUUMsTUFBUjtBQUFBLHlDQUM5QkQsS0FEOEI7QUFFakM7QUFDQXZDLElBQUFBLG9CQUFvQixFQUFFLENBQUN3QyxNQUFNLENBQUNDLE9BQVAsSUFBa0IsRUFBbkIsRUFBdUJ6QztBQUhaO0FBQUEsQ0FBNUI7Ozs7QUFNQSxJQUFNMEMsc0JBQXNCLEdBQUcsU0FBekJBLHNCQUF5QixDQUFDSCxLQUFELEVBQVFDLE1BQVI7QUFBQSx5Q0FDakNELEtBRGlDLEVBRWpDQyxNQUFNLENBQUNDLE9BRjBCLEVBR2pDcEMsWUFBWSxpQ0FDVmtDLEtBRFUsRUFFVkMsTUFBTSxDQUFDQyxPQUZHLEVBSHFCO0FBQUEsQ0FBL0I7Ozs7QUFTQSxJQUFNRSxxQkFBcUIsR0FBRyxTQUF4QkEscUJBQXdCLENBQUNKLEtBQUQsU0FBaUM7QUFBQSxNQUFmL0MsU0FBZSxTQUF4QmlELE9BQXdCOztBQUNwRSxNQUFJLENBQUNGLEtBQUssQ0FBQzdDLFNBQU4sQ0FBZ0JGLFNBQWhCLENBQUwsRUFBaUM7QUFDL0I7QUFDQSxXQUFPK0MsS0FBUDtBQUNEOztBQUNELE1BQU1LLG1CQUFtQixHQUFHLHlEQUMxQkwsS0FBSyxDQUFDN0MsU0FBTixDQUFnQkYsU0FBaEIsQ0FEMEIsQ0FBNUI7QUFJQSxNQUFNRCxrQkFBa0IsR0FBRyxvREFBMEJxRCxtQkFBMUIsRUFBK0NMLEtBQUssQ0FBQ2hELGtCQUFyRCxDQUEzQjtBQUVBLHlDQUNLZ0QsS0FETDtBQUVFL0MsSUFBQUEsU0FBUyxFQUFUQSxTQUZGO0FBR0VELElBQUFBLGtCQUFrQixFQUFsQkE7QUFIRixLQUlLYyxZQUFZLGlDQUNWa0MsS0FEVTtBQUViaEQsSUFBQUEsa0JBQWtCLEVBQWxCQSxrQkFGYTtBQUdiQyxJQUFBQSxTQUFTLEVBQVRBO0FBSGEsS0FKakI7QUFVRCxDQXJCTTs7OztBQXVCQSxJQUFNcUQsb0JBQW9CLEdBQUcsU0FBdkJBLG9CQUF1QixDQUFDTixLQUFELEVBQVFDLE1BQVIsRUFBbUI7QUFDckQsTUFBTU0sU0FBUyxHQUFHTixNQUFNLENBQUNDLE9BQXpCLENBRHFELENBR3JEOztBQUNBLE1BQU1NLFFBQVEsbUNBQ1RSLEtBRFM7QUFFWjdDLElBQUFBLFNBQVMsa0NBQ0o2QyxLQUFLLENBQUM3QyxTQURGLEVBRUpvRCxTQUZJO0FBRkcsSUFBZDtBQVFBLFNBQU9BLFNBQVMsQ0FBQ1AsS0FBSyxDQUFDL0MsU0FBUCxDQUFULEdBQ0htRCxxQkFBcUIsQ0FBQ0ksUUFBRCxFQUFXO0FBQUNOLElBQUFBLE9BQU8sRUFBRUYsS0FBSyxDQUFDL0M7QUFBaEIsR0FBWCxDQURsQixHQUVIdUQsUUFGSjtBQUdELENBZk0sQyxDQWlCUDs7Ozs7QUFDTyxJQUFNQyxzQkFBc0IsR0FBRyxTQUF6QkEsc0JBQXlCLENBQUNULEtBQUQsRUFBUUMsTUFBUjtBQUFBLFNBQW1CRCxLQUFuQjtBQUFBLENBQS9COzs7O0FBQ0EsSUFBTVUsdUJBQXVCLEdBQUcsU0FBMUJBLHVCQUEwQixDQUFDVixLQUFELFNBQWtDO0FBQUEsTUFBZmpDLFFBQWUsU0FBekJtQyxPQUF5QixDQUFmbkMsUUFBZTs7QUFDdkUsTUFBSSxDQUFDQSxRQUFMLEVBQWU7QUFDYixXQUFPaUMsS0FBUDtBQUNELEdBSHNFLENBS3ZFOzs7QUFDQSxNQUFNVyxpQkFBaUIsR0FBRzVDLFFBQVEsQ0FBQ1osU0FBVCxHQUFxQixDQUM3Q3lELGVBQUtDLEdBQUwsQ0FDRTNDLE1BQU0sQ0FBQ08sTUFBUCxDQUFjVixRQUFRLENBQUNaLFNBQXZCLEVBQ0MyRCxHQURELENBQ0s7QUFBQSxRQUFFdEQsRUFBRixTQUFFQSxFQUFGO0FBQUEsUUFBTXVELEdBQU4sU0FBTUEsR0FBTjtBQUFBLFFBQVdDLFdBQVgsU0FBV0EsV0FBWDtBQUFBLFdBQTZCO0FBQ2hDeEQsTUFBQUEsRUFBRSxFQUFGQSxFQURnQztBQUM1QnVELE1BQUFBLEdBQUcsRUFBRSw4Q0FBb0JBLEdBQXBCLEVBQXlCQyxXQUFXLElBQUloQixLQUFLLENBQUN2QyxvQkFBOUM7QUFEdUIsS0FBN0I7QUFBQSxHQURMLEVBSUNxRCxHQUpELENBSUtHLDJCQUpMLENBREYsRUFNR0MsS0FOSCxFQU9JO0FBQ0EsWUFBQUMsT0FBTztBQUFBLFdBQ0wsb0NBQ0VBLE9BQU8sQ0FBQzlELE1BQVIsQ0FBZSxVQUFDQyxJQUFEO0FBQUEsVUFBUUUsRUFBUixTQUFRQSxFQUFSO0FBQUEsVUFBWVEsS0FBWixTQUFZQSxLQUFaO0FBQUEsNkNBQ1ZWLElBRFUsb0NBRVpFLEVBRlksa0NBR1JPLFFBQVEsQ0FBQ1osU0FBVCxDQUFtQkssRUFBbkIsQ0FIUTtBQUlYNEQsUUFBQUEsV0FBVyxFQUFFekIsdUJBQXVCLENBQUMzQixLQUFELENBSnpCO0FBS1hBLFFBQUFBLEtBQUssRUFBTEE7QUFMVztBQUFBLEtBQWYsRUFPSSxFQVBKLENBREYsQ0FESztBQUFBLEdBUlgsRUFvQkk7QUFDQSxZQUFBcUQsS0FBSztBQUFBLFdBQUksc0NBQWdCQSxLQUFoQixDQUFKO0FBQUEsR0FyQlQsQ0FENkMsQ0FBckIsR0F3QnRCLElBeEJKO0FBMEJBLE1BQU1iLFFBQVEsR0FBR0wsc0JBQXNCLENBQUNILEtBQUQsRUFBUTtBQUFDRSxJQUFBQSxPQUFPLEVBQUVuQztBQUFWLEdBQVIsQ0FBdkM7QUFFQSxTQUFPNEMsaUJBQWlCLEdBQUcscUJBQ3pCSCxRQUR5QixFQUV6QkcsaUJBRnlCLENBQUgsR0FHcEJILFFBSEo7QUFJRCxDQXRDTTs7OztBQXdDQSxJQUFNYyw2QkFBNkIsR0FBRyxTQUFoQ0EsNkJBQWdDLENBQUN0QixLQUFELEVBQVc7QUFDdEQsTUFBTXVCLFdBQVcsbUNBQ1oxRCxpQkFEWTtBQUVmSixJQUFBQSxvQkFBb0IsRUFBRXVDLEtBQUssQ0FBQ3ZDO0FBRmIsS0FHWnVDLEtBQUssQ0FBQ3dCLFlBSE07QUFJZnJFLElBQUFBLFNBQVMsRUFBRTZDLEtBQUssQ0FBQzdDLFNBSkY7QUFLZnFFLElBQUFBLFlBQVksRUFBRXhCLEtBQUssQ0FBQ3dCO0FBTEwsSUFBakI7QUFRQSxTQUFPcEIscUJBQXFCLENBQUNtQixXQUFELEVBQWM7QUFBQ3JCLElBQUFBLE9BQU8sRUFBRXFCLFdBQVcsQ0FBQ3RFO0FBQXRCLEdBQWQsQ0FBNUI7QUFDRCxDQVZNOzs7O0FBWUEsSUFBTXdFLHlCQUF5QixHQUFHLFNBQTVCQSx5QkFBNEIsQ0FBQ3pCLEtBQUQ7QUFBQSw0QkFBU0UsT0FBVDtBQUFBLE1BQW1Cd0IsSUFBbkIsaUJBQW1CQSxJQUFuQjtBQUFBLE1BQXlCMUQsS0FBekIsaUJBQXlCQSxLQUF6QjtBQUFBLE1BQWdDcUQsS0FBaEMsaUJBQWdDQSxLQUFoQztBQUFBLHlDQUNwQ3JCLEtBRG9DO0FBRXZDdEMsSUFBQUEsVUFBVSxrQ0FDTHNDLEtBQUssQ0FBQ3RDLFVBREQsRUFHSk0sS0FBSyxHQUFHO0FBQ1ZSLE1BQUFBLEVBQUUsRUFBRVEsS0FBSyxDQUFDUixFQUFOLElBQVksNEJBRE47QUFFVjtBQUNBUSxNQUFBQSxLQUFLLEVBQUUyRCxJQUFJLENBQUNDLEtBQUwsQ0FBV0QsSUFBSSxDQUFDRSxTQUFMLENBQWU3RCxLQUFmLENBQVgsQ0FIRztBQUlWOEQsTUFBQUEsS0FBSyxFQUFFOUQsS0FBSyxDQUFDK0QsSUFKSDtBQUtWO0FBQ0FYLE1BQUFBLFdBQVcsRUFBRXpCLHVCQUF1QixDQUFDM0IsS0FBRDtBQU4xQixLQUFILEdBT0wsRUFWSSxFQVdKMEQsSUFBSSxHQUFHO0FBQUNBLE1BQUFBLElBQUksRUFBSkE7QUFBRCxLQUFILEdBQVksRUFYWixFQVlKTCxLQUFLLEtBQUtXLFNBQVYsR0FBc0I7QUFBQ1gsTUFBQUEsS0FBSyxFQUFMQTtBQUFELEtBQXRCLEdBQWdDLEVBWjVCO0FBRjZCO0FBQUEsQ0FBbEM7Ozs7QUFrQkEsSUFBTVksb0JBQW9CLEdBQUcsU0FBdkJBLG9CQUF1QixDQUFDakMsS0FBRDtBQUFBLE1BQWtCdEMsVUFBbEIsU0FBU3dDLE9BQVQ7QUFBQSx5Q0FDL0JGLEtBRCtCO0FBRWxDdEMsSUFBQUEsVUFBVSxrQ0FDTEEsVUFESztBQUVSd0UsTUFBQUEsT0FBTyxFQUFFLDBDQUFnQnhFLFVBQVUsQ0FBQ3FELEdBQTNCO0FBRkQ7QUFGd0I7QUFBQSxDQUE3Qjs7OztBQVFBLElBQU1vQix3QkFBd0IsR0FBRyxTQUEzQkEsd0JBQTJCLENBQUNuQyxLQUFELEVBQVFDLE1BQVIsRUFBbUI7QUFDekQsTUFBTW1DLE9BQU8sR0FBR3BDLEtBQUssQ0FBQ3RDLFVBQU4sQ0FBaUJGLEVBQWpDO0FBQ0EsTUFBTWdELFFBQVEsbUNBQ1RSLEtBRFM7QUFFWjdDLElBQUFBLFNBQVMsa0NBQ0o2QyxLQUFLLENBQUM3QyxTQURGLG9DQUVOaUYsT0FGTSxFQUVJcEMsS0FBSyxDQUFDdEMsVUFGVixFQUZHO0FBTVo7QUFDQUEsSUFBQUEsVUFBVSxFQUFFQyxvQkFBb0I7QUFQcEIsSUFBZCxDQUZ5RCxDQVd6RDs7QUFDQSxTQUFPeUMscUJBQXFCLENBQUNJLFFBQUQsRUFBVztBQUFDTixJQUFBQSxPQUFPLEVBQUVrQztBQUFWLEdBQVgsQ0FBNUI7QUFDRCxDQWJNOzs7O0FBZUEsU0FBU3pFLG9CQUFULEdBQWdDO0FBQ3JDLFNBQU87QUFDTHFELElBQUFBLFdBQVcsRUFBRSxJQURSO0FBRUxLLElBQUFBLEtBQUssRUFBRSxLQUZGO0FBR0xhLElBQUFBLE9BQU8sRUFBRSxLQUhKO0FBSUxKLElBQUFBLEtBQUssRUFBRSxJQUpGO0FBS0w5RCxJQUFBQSxLQUFLLEVBQUUsSUFMRjtBQU1MK0MsSUFBQUEsR0FBRyxFQUFFLElBTkE7QUFPTHNCLElBQUFBLE1BQU0sRUFBRTtBQVBILEdBQVA7QUFTRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBJbW11dGFibGUgZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBUYXNrLCB7d2l0aFRhc2t9IGZyb20gJ3JlYWN0LXBhbG0vdGFza3MnO1xuXG4vLyBVdGlsc1xuaW1wb3J0IHtcbiAgZ2V0RGVmYXVsdExheWVyR3JvdXBWaXNpYmlsaXR5LFxuICBpc1ZhbGlkU3R5bGVVcmwsXG4gIGdldFN0eWxlRG93bmxvYWRVcmwsXG4gIG1lcmdlTGF5ZXJHcm91cFZpc2liaWxpdHksXG4gIGVkaXRUb3BNYXBTdHlsZSxcbiAgZWRpdEJvdHRvbU1hcFN0eWxlXG59IGZyb20gJ3V0aWxzL21hcC1zdHlsZS11dGlscy9tYXBib3gtZ2wtc3R5bGUtZWRpdG9yJztcbmltcG9ydCB7REVGQVVMVF9NQVBfU1RZTEVTLCBERUZBVUxUX0xBWUVSX0dST1VQU30gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuaW1wb3J0IHtnZW5lcmF0ZUhhc2hJZH0gZnJvbSAndXRpbHMvdXRpbHMnO1xuaW1wb3J0IHtMT0FEX01BUF9TVFlMRV9UQVNLfSBmcm9tICd0YXNrcy90YXNrcyc7XG5pbXBvcnQge2xvYWRNYXBTdHlsZXMsIGxvYWRNYXBTdHlsZUVycn0gZnJvbSAnYWN0aW9ucy9tYXAtc3R5bGUtYWN0aW9ucyc7XG5pbXBvcnQge3JnYn0gZnJvbSAnZDMtY29sb3InO1xuaW1wb3J0IHsgaGV4VG9SZ2IgfSBmcm9tICd1dGlscy9jb2xvci11dGlscyc7XG5cbmNvbnN0IERFRkFVTFRfQkxER19DT0xPUiA9ICcjRDFDRUM3JztcblxuY29uc3QgZ2V0RGVmYXVsdFN0YXRlID0gKCkgPT4ge1xuICBjb25zdCB2aXNpYmxlTGF5ZXJHcm91cHMgPSB7fTtcbiAgY29uc3Qgc3R5bGVUeXBlID0gJ2RhcmsnO1xuICBjb25zdCB0b3BMYXllckdyb3VwcyA9IHt9O1xuXG4gIHJldHVybiB7XG4gICAgc3R5bGVUeXBlLFxuICAgIHZpc2libGVMYXllckdyb3VwcyxcbiAgICB0b3BMYXllckdyb3VwcyxcbiAgICBtYXBTdHlsZXM6IERFRkFVTFRfTUFQX1NUWUxFUy5yZWR1Y2UoKGFjY3UsIGN1cnIpID0+ICh7XG4gICAgICAuLi5hY2N1LFxuICAgICAgW2N1cnIuaWRdOiBjdXJyXG4gICAgfSksIHt9KSxcbiAgICAvLyBzYXZlIG1hcGJveCBhY2Nlc3MgdG9rZW5cbiAgICBtYXBib3hBcGlBY2Nlc3NUb2tlbjogbnVsbCxcbiAgICBpbnB1dFN0eWxlOiBnZXRJbml0aWFsSW5wdXRTdHlsZSgpLFxuICAgIHRocmVlREJ1aWxkaW5nQ29sb3I6IGhleFRvUmdiKERFRkFVTFRfQkxER19DT0xPUilcbiAgfTtcbn07XG5cbi8qKlxuICogRGVmYXVsdCBpbml0aWFsIGBtYXBTdHlsZWBcbiAqIEBjb25zdGFudFxuICogQHByb3BlcnR5IHtzdHJpbmd9IHN0eWxlVHlwZSAtIERlZmF1bHQ6ICdkYXJrJ1xuICogQHByb3BlcnR5IHtPYmplY3R9IHZpc2libGVMYXllckdyb3VwcyAtIERlZmF1bHQ6IHt9XG4gKiBAcHJvcGVydHkge09iamVjdH0gdG9wTGF5ZXJHcm91cHMgLSBEZWZhdWx0OiB7fVxuICogQHByb3BlcnR5IHtPYmplY3R9IG1hcFN0eWxlcyAtIG1hcHBpbmcgZnJvbSBzdHlsZSBrZXkgdG8gc3R5bGUgb2JlamN0XG4gKiBAcHJvcGVydHkge3N0cmluZ30gbWFwYm94QXBpQWNjZXNzVG9rZW4gLSBEZWZhdWx0OiBudWxsXG4gKiBAcHJvcGVydHkge09iamVjdH0gaW5wdXRTdHlsZSAtIERlZmF1bHQ6IHt9XG4gKiBAcHJvcGVydHkge0FycmF5fSB0aHJlZURCdWlsZGluZ0NvbG9yIC0gRGVmYXVsdDogW3IsIGcsIGJdXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBJTklUSUFMX01BUF9TVFlMRSA9IGdldERlZmF1bHRTdGF0ZSgpO1xuXG4vKipcbiAqIENyZWF0ZSB0d28gbWFwIHN0eWxlcyBmcm9tIHByZXNldCBtYXAgc3R5bGUsIG9uZSBmb3IgdG9wIG1hcCBvbmUgZm9yIGJvdHRvbVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHlsZVR5cGUgLSBjdXJyZW50IG1hcCBzdHlsZVxuICogQHBhcmFtIHtvYmplY3R9IHZpc2libGVMYXllckdyb3VwcyAtIHZpc2libGUgbGF5ZXJzIG9mIGJvdHRvbSBtYXBcbiAqIEBwYXJhbSB7b2JqZWN0fSB0b3BMYXllckdyb3VwcyAtIHZpc2libGUgbGF5ZXJzIG9mIHRvcCBtYXBcbiAqIEBwYXJhbSB7b2JqZWN0fSBtYXBTdHlsZXMgLSBhIGRpY3Rpb25hcnkgb2YgYWxsIG1hcCBzdHlsZXNcbiAqIEByZXR1cm5zIHtvYmplY3R9IGJvdHRvbU1hcFN0eWxlIHwgdG9wTWFwU3R5bGUgfCBpc1Jhc3RlclxuICovXG5mdW5jdGlvbiBnZXRNYXBTdHlsZXMoe1xuICBzdHlsZVR5cGUsXG4gIHZpc2libGVMYXllckdyb3VwcyxcbiAgdG9wTGF5ZXJHcm91cHMsXG4gIG1hcFN0eWxlc1xufSkge1xuICBjb25zdCBtYXBTdHlsZSA9IG1hcFN0eWxlc1tzdHlsZVR5cGVdO1xuXG4gIC8vIHN0eWxlIG1pZ2h0IG5vdCBiZSBsb2FkZWQgeWV0XG4gIGlmICghbWFwU3R5bGUgfHwgIW1hcFN0eWxlLnN0eWxlKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgY29uc3QgZWRpdGFibGUgPSBPYmplY3Qua2V5cyh2aXNpYmxlTGF5ZXJHcm91cHMpLmxlbmd0aDtcblxuICBjb25zdCBib3R0b21NYXBTdHlsZSA9ICFlZGl0YWJsZVxuICAgID8gSW1tdXRhYmxlLmZyb21KUyhtYXBTdHlsZS5zdHlsZSlcbiAgICA6IGVkaXRCb3R0b21NYXBTdHlsZSh7XG4gICAgICAgIGlkOiBzdHlsZVR5cGUsXG4gICAgICAgIG1hcFN0eWxlLFxuICAgICAgICB2aXNpYmxlTGF5ZXJHcm91cHNcbiAgICAgIH0pO1xuXG4gIGNvbnN0IGhhc1RvcExheWVyID0gZWRpdGFibGUgJiYgT2JqZWN0LnZhbHVlcyh0b3BMYXllckdyb3Vwcykuc29tZSh2ID0+IHYpO1xuXG4gIC8vIG11dGUgdG9wIGxheWVyIGlmIG5vdCB2aXNpYmxlIGluIGJvdHRvbSBsYXllclxuICBjb25zdCB0b3BMYXllcnMgPVxuICAgIGhhc1RvcExheWVyICYmXG4gICAgT2JqZWN0LmtleXModG9wTGF5ZXJHcm91cHMpLnJlZHVjZShcbiAgICAgIChhY2N1LCBrZXkpID0+ICh7XG4gICAgICAgIC4uLmFjY3UsXG4gICAgICAgIFtrZXldOiB0b3BMYXllckdyb3Vwc1trZXldICYmIHZpc2libGVMYXllckdyb3Vwc1trZXldXG4gICAgICB9KSxcbiAgICAgIHt9XG4gICAgKTtcblxuICBjb25zdCB0b3BNYXBTdHlsZSA9IGhhc1RvcExheWVyXG4gICAgPyBlZGl0VG9wTWFwU3R5bGUoe1xuICAgICAgICBpZDogc3R5bGVUeXBlLFxuICAgICAgICBtYXBTdHlsZSxcbiAgICAgICAgdmlzaWJsZUxheWVyR3JvdXBzOiB0b3BMYXllcnNcbiAgICAgIH0pXG4gICAgOiBudWxsO1xuICBjb25zdCB0aHJlZURCdWlsZGluZ0NvbG9yID0gZ2V0M0RCdWlsZGluZ0NvbG9yKG1hcFN0eWxlKTtcbiAgcmV0dXJuIHtib3R0b21NYXBTdHlsZSwgdG9wTWFwU3R5bGUsIGVkaXRhYmxlLCB0aHJlZURCdWlsZGluZ0NvbG9yfTtcbn1cblxuZnVuY3Rpb24gZ2V0M0RCdWlsZGluZ0NvbG9yKHN0eWxlKSB7XG4gIC8vIHNldCBidWlsZGluZyBjb2xvciB0byBiZSB0aGUgc2FtZSBhcyB0aGUgYmFja2dyb3VuZCBjb2xvci5cbiAgY29uc3QgYmFja2dyb3VuZExheWVyID0gKHN0eWxlLnN0eWxlLmxheWVycyB8fCBbXSkuZmluZCgoe2lkfSkgPT4gaWQgPT09ICdiYWNrZ3JvdW5kJyk7XG4gIGNvbnN0IGJ1aWxkaW5nQ29sb3IgPSBiYWNrZ3JvdW5kTGF5ZXIgJiYgYmFja2dyb3VuZExheWVyLnBhaW50ICYmIGJhY2tncm91bmRMYXllci5wYWludFsnYmFja2dyb3VuZC1jb2xvciddID9cbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRMYXllci5wYWludFsnYmFja2dyb3VuZC1jb2xvciddIDogREVGQVVMVF9CTERHX0NPTE9SO1xuICAvLyBicmlnaHRlbiBvciBkYXJrZW4gYnVpbGRpbmcgYmFzZWQgb24gc3R5bGVcbiAgY29uc3Qgb3BlcmF0aW9uID0gc3R5bGUuaWQubWF0Y2goLyg/PShkYXJrfG5pZ2h0KSkvKSA/ICdicmlnaHRlcic6ICAnZGFya2VyJztcbiAgY29uc3QgcmdiT2JqID0gcmdiKGJ1aWxkaW5nQ29sb3IpW29wZXJhdGlvbl0oWzAuMl0pO1xuICByZXR1cm4gW3JnYk9iai5yLCByZ2JPYmouZywgcmdiT2JqLmJdO1xufVxuXG5mdW5jdGlvbiBnZXRMYXllckdyb3Vwc0Zyb21TdHlsZShzdHlsZSkge1xuICByZXR1cm4gREVGQVVMVF9MQVlFUl9HUk9VUFMuZmlsdGVyKGxnID0+IHN0eWxlLmxheWVycy5maWx0ZXIobGcuZmlsdGVyKS5sZW5ndGgpO1xufVxuXG4vLyBVcGRhdGVyc1xuZXhwb3J0IGNvbnN0IGluaXRNYXBTdHlsZVVwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIC8vIHNhdmUgbWFwYm94IGFjY2VzcyB0b2tlbiB0byBtYXAgc3R5bGUgc3RhdGVcbiAgbWFwYm94QXBpQWNjZXNzVG9rZW46IChhY3Rpb24ucGF5bG9hZCB8fCB7fSkubWFwYm94QXBpQWNjZXNzVG9rZW5cbn0pO1xuXG5leHBvcnQgY29uc3QgbWFwQ29uZmlnQ2hhbmdlVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgLi4uYWN0aW9uLnBheWxvYWQsXG4gIC4uLmdldE1hcFN0eWxlcyh7XG4gICAgLi4uc3RhdGUsXG4gICAgLi4uYWN0aW9uLnBheWxvYWRcbiAgfSlcbn0pO1xuXG5leHBvcnQgY29uc3QgbWFwU3R5bGVDaGFuZ2VVcGRhdGVyID0gKHN0YXRlLCB7cGF5bG9hZDogc3R5bGVUeXBlfSkgPT4ge1xuICBpZiAoIXN0YXRlLm1hcFN0eWxlc1tzdHlsZVR5cGVdKSB7XG4gICAgLy8gd2UgbWlnaHQgbm90IGhhdmUgcmVjZWl2ZWQgdGhlIHN0eWxlIHlldFxuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuICBjb25zdCBkZWZhdWx0TEdWaXNpYmlsaXR5ID0gZ2V0RGVmYXVsdExheWVyR3JvdXBWaXNpYmlsaXR5KFxuICAgIHN0YXRlLm1hcFN0eWxlc1tzdHlsZVR5cGVdXG4gICk7XG5cbiAgY29uc3QgdmlzaWJsZUxheWVyR3JvdXBzID0gbWVyZ2VMYXllckdyb3VwVmlzaWJpbGl0eShkZWZhdWx0TEdWaXNpYmlsaXR5LCBzdGF0ZS52aXNpYmxlTGF5ZXJHcm91cHMpO1xuXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgc3R5bGVUeXBlLFxuICAgIHZpc2libGVMYXllckdyb3VwcyxcbiAgICAuLi5nZXRNYXBTdHlsZXMoe1xuICAgICAgLi4uc3RhdGUsXG4gICAgICB2aXNpYmxlTGF5ZXJHcm91cHMsXG4gICAgICBzdHlsZVR5cGVcbiAgICB9KVxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGxvYWRNYXBTdHlsZXNVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgY29uc3QgbmV3U3R5bGVzID0gYWN0aW9uLnBheWxvYWQ7XG5cbiAgLy8gYWRkIG5ldyBzdHlsZXMgdG8gc3RhdGVcbiAgY29uc3QgbmV3U3RhdGUgPSB7XG4gICAgLi4uc3RhdGUsXG4gICAgbWFwU3R5bGVzOiB7XG4gICAgICAuLi5zdGF0ZS5tYXBTdHlsZXMsXG4gICAgICAuLi5uZXdTdHlsZXNcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIG5ld1N0eWxlc1tzdGF0ZS5zdHlsZVR5cGVdXG4gICAgPyBtYXBTdHlsZUNoYW5nZVVwZGF0ZXIobmV3U3RhdGUsIHtwYXlsb2FkOiBzdGF0ZS5zdHlsZVR5cGV9KVxuICAgIDogbmV3U3RhdGU7XG59O1xuXG4vLyBkbyBub3RoaW5nIGZvciBub3csIGlmIGRpZG4ndCBsb2FkLCBza2lwIGl0XG5leHBvcnQgY29uc3QgbG9hZE1hcFN0eWxlRXJyVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiBzdGF0ZTtcbmV4cG9ydCBjb25zdCByZWNlaXZlTWFwQ29uZmlnVXBkYXRlciA9IChzdGF0ZSwge3BheWxvYWQ6IHttYXBTdHlsZX19KSA9PiB7XG4gIGlmICghbWFwU3R5bGUpIHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuICAvLyBpZiBzYXZlZCBjdXN0b20gbWFwU3R5bGVzIGxvYWQgdGhlIHN0eWxlIG9iamVjdFxuICBjb25zdCBsb2FkTWFwU3R5bGVUYXNrcyA9IG1hcFN0eWxlLm1hcFN0eWxlcyA/IFtcbiAgICBUYXNrLmFsbChcbiAgICAgIE9iamVjdC52YWx1ZXMobWFwU3R5bGUubWFwU3R5bGVzKVxuICAgICAgLm1hcCgoe2lkLCB1cmwsIGFjY2Vzc1Rva2VufSkgPT4gKHtcbiAgICAgICAgaWQsIHVybDogZ2V0U3R5bGVEb3dubG9hZFVybCh1cmwsIGFjY2Vzc1Rva2VuIHx8IHN0YXRlLm1hcGJveEFwaUFjY2Vzc1Rva2VuKVxuICAgICAgfSkpXG4gICAgICAubWFwKExPQURfTUFQX1NUWUxFX1RBU0spKVxuICAgICAgLmJpbWFwKFxuICAgICAgICAvLyBzdWNjZXNzXG4gICAgICAgIHJlc3VsdHMgPT4gKFxuICAgICAgICAgIGxvYWRNYXBTdHlsZXMoXG4gICAgICAgICAgICByZXN1bHRzLnJlZHVjZSgoYWNjdSwge2lkLCBzdHlsZX0pID0+ICh7XG4gICAgICAgICAgICAgIC4uLmFjY3UsXG4gICAgICAgICAgICAgIFtpZF06IHtcbiAgICAgICAgICAgICAgICAuLi5tYXBTdHlsZS5tYXBTdHlsZXNbaWRdLFxuICAgICAgICAgICAgICAgIGxheWVyR3JvdXBzOiBnZXRMYXllckdyb3Vwc0Zyb21TdHlsZShzdHlsZSksXG4gICAgICAgICAgICAgICAgc3R5bGVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksIHt9KVxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgLy8gZXJyb3JcbiAgICAgICAgZXJyb3IgPT4gbG9hZE1hcFN0eWxlRXJyKGVycm9yKVxuICAgICAgKVxuICBdIDogbnVsbDtcblxuICBjb25zdCBuZXdTdGF0ZSA9IG1hcENvbmZpZ0NoYW5nZVVwZGF0ZXIoc3RhdGUsIHtwYXlsb2FkOiBtYXBTdHlsZX0pO1xuXG4gIHJldHVybiBsb2FkTWFwU3R5bGVUYXNrcyA/IHdpdGhUYXNrKFxuICAgIG5ld1N0YXRlLFxuICAgIGxvYWRNYXBTdHlsZVRhc2tzXG4gICkgOiBuZXdTdGF0ZTtcbn07XG5cbmV4cG9ydCBjb25zdCByZXNldE1hcENvbmZpZ01hcFN0eWxlVXBkYXRlciA9IChzdGF0ZSkgPT4ge1xuICBjb25zdCBlbXB0eUNvbmZpZyA9IHtcbiAgICAuLi5JTklUSUFMX01BUF9TVFlMRSxcbiAgICBtYXBib3hBcGlBY2Nlc3NUb2tlbjogc3RhdGUubWFwYm94QXBpQWNjZXNzVG9rZW4sXG4gICAgLi4uc3RhdGUuaW5pdGlhbFN0YXRlLFxuICAgIG1hcFN0eWxlczogc3RhdGUubWFwU3R5bGVzLFxuICAgIGluaXRpYWxTdGF0ZTogc3RhdGUuaW5pdGlhbFN0YXRlXG4gIH07XG5cbiAgcmV0dXJuIG1hcFN0eWxlQ2hhbmdlVXBkYXRlcihlbXB0eUNvbmZpZywge3BheWxvYWQ6IGVtcHR5Q29uZmlnLnN0eWxlVHlwZX0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGxvYWRDdXN0b21NYXBTdHlsZVVwZGF0ZXIgPSAoc3RhdGUsIHtwYXlsb2FkOiB7aWNvbiwgc3R5bGUsIGVycm9yfX0pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBpbnB1dFN0eWxlOiB7XG4gICAgLi4uc3RhdGUuaW5wdXRTdHlsZSxcbiAgICAvLyBzdHlsZSBqc29uIGFuZCBpY29uIHdpbGwgbG9hZCBhc3luY2hyb25vdXNseVxuICAgIC4uLihzdHlsZSA/IHtcbiAgICAgIGlkOiBzdHlsZS5pZCB8fCBnZW5lcmF0ZUhhc2hJZCgpLFxuICAgICAgLy8gbWFrZSBhIGNvcHkgb2YgdGhlIHN0eWxlIG9iamVjdFxuICAgICAgc3R5bGU6IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoc3R5bGUpKSxcbiAgICAgIGxhYmVsOiBzdHlsZS5uYW1lLFxuICAgICAgLy8gZ2F0aGVyaW5nIGxheWVyIGdyb3VwIGluZm8gZnJvbSBzdHlsZSBqc29uXG4gICAgICBsYXllckdyb3VwczogZ2V0TGF5ZXJHcm91cHNGcm9tU3R5bGUoc3R5bGUpXG4gICAgfSA6IHt9KSxcbiAgICAuLi4oaWNvbiA/IHtpY29ufSA6IHt9KSxcbiAgICAuLi4oZXJyb3IgIT09IHVuZGVmaW5lZCA/IHtlcnJvcn0gOiB7fSlcbiAgfVxufSk7XG5cbmV4cG9ydCBjb25zdCBpbnB1dE1hcFN0eWxlVXBkYXRlciA9IChzdGF0ZSwge3BheWxvYWQ6IGlucHV0U3R5bGV9KSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgaW5wdXRTdHlsZToge1xuICAgIC4uLmlucHV0U3R5bGUsXG4gICAgaXNWYWxpZDogaXNWYWxpZFN0eWxlVXJsKGlucHV0U3R5bGUudXJsKVxuICB9XG59KTtcblxuZXhwb3J0IGNvbnN0IGFkZEN1c3RvbU1hcFN0eWxlVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIGNvbnN0IHN0eWxlSWQgPSBzdGF0ZS5pbnB1dFN0eWxlLmlkO1xuICBjb25zdCBuZXdTdGF0ZSA9IHtcbiAgICAuLi5zdGF0ZSxcbiAgICBtYXBTdHlsZXM6IHtcbiAgICAgIC4uLnN0YXRlLm1hcFN0eWxlcyxcbiAgICAgIFtzdHlsZUlkXTogc3RhdGUuaW5wdXRTdHlsZVxuICAgIH0sXG4gICAgLy8gc2V0IHRvIGRlZmF1bHRcbiAgICBpbnB1dFN0eWxlOiBnZXRJbml0aWFsSW5wdXRTdHlsZSgpXG4gIH07XG4gIC8vIHNldCBuZXcgc3R5bGVcbiAgcmV0dXJuIG1hcFN0eWxlQ2hhbmdlVXBkYXRlcihuZXdTdGF0ZSwge3BheWxvYWQ6IHN0eWxlSWR9KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbml0aWFsSW5wdXRTdHlsZSgpIHtcbiAgcmV0dXJuIHtcbiAgICBhY2Nlc3NUb2tlbjogbnVsbCxcbiAgICBlcnJvcjogZmFsc2UsXG4gICAgaXNWYWxpZDogZmFsc2UsXG4gICAgbGFiZWw6IG51bGwsXG4gICAgc3R5bGU6IG51bGwsXG4gICAgdXJsOiBudWxsLFxuICAgIGN1c3RvbTogdHJ1ZVxuICB9O1xufVxuIl19