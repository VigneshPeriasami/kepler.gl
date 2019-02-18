"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateMapboxLayers = generateMapboxLayers;
exports.updateMapboxLayers = updateMapboxLayers;
exports.geojsonFromPoints = geojsonFromPoints;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread5 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _baseLayer = require("./base-layer");

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
 * This function will convert layers to mapbox layers
 * @param layers the layers to be converted
 * @param layerData extra layer information
 * @param layerOrder the order by which we should convert layers
 * @returns {*}
 */
function generateMapboxLayers() {
  var layers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var layerData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var layerOrder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (layerData.length > 0) {
    return layerOrder.slice().reverse().reduce(function (overlays, idx) {
      var layer = layers[idx];
      return layer.overlayType !== _baseLayer.OVERLAY_TYPE.mapboxgl ? overlays : [].concat((0, _toConsumableArray2.default)(overlays), [{
        id: layer.id,
        data: layerData[idx].data,
        config: layerData[idx].config,
        datasetId: layer.config.dataId
      }]);
    }, []);
  }

  return [];
}

;
/**
 * Update mapbox layers on the given map
 * @param map
 * @param newLayers Array of new mapbox layers to be displayed
 * @param oldLayers Map of the old layers to be compare with the current ones to detect deleted layers
 *                  {layerId: datasetId}
 * @param mapLayers carries information about split map view
 */

function updateMapboxLayers(map) {
  var newLayers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var oldLayers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var mapLayers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var opt = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
    force: true
  };

  // delete non existing layers
  if (oldLayers) {
    var oldLayersKeys = Object.keys(oldLayers);

    if (newLayers.length === 0 && oldLayersKeys.length > 0) {
      oldLayersKeys.forEach(function (layerId) {
        return map.removeLayer(layerId);
      });
    } else {
      // remove layers
      var currentLayersIds = newLayers.reduce(function (final, layer) {
        return (0, _objectSpread5.default)({}, final, (0, _defineProperty2.default)({}, layer.id, true));
      }, {});
      var layersToDelete = oldLayersKeys.reduce(function (final, layerId) {
        // if layer doesn't exists anymore
        if (!currentLayersIds[layerId]) {
          return (0, _objectSpread5.default)({}, final, (0, _defineProperty2.default)({}, layerId, oldLayers[layerId]));
        }

        return final;
      }, []);
      Object.keys(layersToDelete).forEach(function (layerId) {
        return map.removeLayer(layerId);
      });
    }
  } // insert or update new layer
  // TODO: fix complexity

  /* eslint-disable complexity */


  newLayers.forEach(function (overlay) {
    var layerId = overlay.id,
        config = overlay.config,
        data = overlay.data,
        datasetId = overlay.datasetId;

    if (!data && !config) {
      return;
    }

    var isAvailableAndVisible = !(mapLayers && mapLayers[layerId]) || mapLayers[layerId].isVisible; // checking if source already exists

    if (data && isAvailableAndVisible) {
      var source = map.getSource(datasetId);

      if (!source) {
        map.addSource(datasetId, {
          type: 'geojson',
          data: data
        });
      } else {
        source.setData(data);
      }
    }

    var oldConfig = oldLayers[layerId];
    var mapboxLayer = map.getLayer(layerId); // compare with previous configs

    if (!oldConfig || oldConfig !== config || !mapboxLayer || opt.force) {
      // check if layer already is set
      // remove it if exists
      if (mapboxLayer) {
        map.removeLayer(layerId);
      } // add if visible and available


      if (isAvailableAndVisible) {
        map.addLayer(config);
      }
    }
  });
  /* eslint-enable complexity */
  // TODO: think about removing sources
}

;
/**
 *
 * @param points
 * @param columns {
 * lat: {fieldIdx},
 * lng: {fieldIdx},
 * alt: {fieldIdx}
 * }
 * @param properties [{label: {fieldIdx}]
 * @returns {{type: string, properties: {}, features: {type: string, properties: {}, geometry: {type: string, coordinates: *[]}}[]}}
 */

function geojsonFromPoints() {
  var allData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var filteredIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var columns = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var properties = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  return {
    type: 'FeatureCollection',
    features: filteredIndex.map(function (index) {
      return allData[index];
    }).map(function (point) {
      return {
        type: 'Feature',
        properties: properties.reduce(function (final, property) {
          return (0, _objectSpread5.default)({}, final, (0, _defineProperty2.default)({}, property.name, point[property.tableFieldIndex - 1]));
        }, {}),
        geometry: {
          type: 'Point',
          coordinates: [columns.lng ? point[columns.lng.fieldIdx] : null, // lng
          columns.lat ? point[columns.lat.fieldIdx] : null, // lat
          columns.altitude ? point[columns.altitude.fieldIdx] : 0 // altitude
          ]
        }
      };
    })
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sYXllcnMvbWFwYm94LXV0aWxzLmpzIl0sIm5hbWVzIjpbImdlbmVyYXRlTWFwYm94TGF5ZXJzIiwibGF5ZXJzIiwibGF5ZXJEYXRhIiwibGF5ZXJPcmRlciIsImxlbmd0aCIsInNsaWNlIiwicmV2ZXJzZSIsInJlZHVjZSIsIm92ZXJsYXlzIiwiaWR4IiwibGF5ZXIiLCJvdmVybGF5VHlwZSIsIk9WRVJMQVlfVFlQRSIsIm1hcGJveGdsIiwiaWQiLCJkYXRhIiwiY29uZmlnIiwiZGF0YXNldElkIiwiZGF0YUlkIiwidXBkYXRlTWFwYm94TGF5ZXJzIiwibWFwIiwibmV3TGF5ZXJzIiwib2xkTGF5ZXJzIiwibWFwTGF5ZXJzIiwib3B0IiwiZm9yY2UiLCJvbGRMYXllcnNLZXlzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJsYXllcklkIiwicmVtb3ZlTGF5ZXIiLCJjdXJyZW50TGF5ZXJzSWRzIiwiZmluYWwiLCJsYXllcnNUb0RlbGV0ZSIsIm92ZXJsYXkiLCJpc0F2YWlsYWJsZUFuZFZpc2libGUiLCJpc1Zpc2libGUiLCJzb3VyY2UiLCJnZXRTb3VyY2UiLCJhZGRTb3VyY2UiLCJ0eXBlIiwic2V0RGF0YSIsIm9sZENvbmZpZyIsIm1hcGJveExheWVyIiwiZ2V0TGF5ZXIiLCJhZGRMYXllciIsImdlb2pzb25Gcm9tUG9pbnRzIiwiYWxsRGF0YSIsImZpbHRlcmVkSW5kZXgiLCJjb2x1bW5zIiwicHJvcGVydGllcyIsImZlYXR1cmVzIiwiaW5kZXgiLCJwb2ludCIsInByb3BlcnR5IiwibmFtZSIsInRhYmxlRmllbGRJbmRleCIsImdlb21ldHJ5IiwiY29vcmRpbmF0ZXMiLCJsbmciLCJmaWVsZElkeCIsImxhdCIsImFsdGl0dWRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFLLENBQUNKLE9BQU8sQ0FBQ1ksR0FBUixDQUFZRCxRQUFiLENBQW5CLEdBQTRDLElBRmpDLEVBRXVDO0FBQ2xEWCxVQUFBQSxPQUFPLENBQUNhLFFBQVIsR0FBbUJULEtBQUssQ0FBQ0osT0FBTyxDQUFDYSxRQUFSLENBQWlCRixRQUFsQixDQUF4QixHQUFzRCxDQUgzQyxDQUc2QztBQUg3QztBQUZMO0FBTnVELE9BQUw7QUFBQSxLQUFwRDtBQUZMLEdBQVA7QUFrQkQiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQge09WRVJMQVlfVFlQRX0gZnJvbSAnLi9iYXNlLWxheWVyJztcblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIHdpbGwgY29udmVydCBsYXllcnMgdG8gbWFwYm94IGxheWVyc1xuICogQHBhcmFtIGxheWVycyB0aGUgbGF5ZXJzIHRvIGJlIGNvbnZlcnRlZFxuICogQHBhcmFtIGxheWVyRGF0YSBleHRyYSBsYXllciBpbmZvcm1hdGlvblxuICogQHBhcmFtIGxheWVyT3JkZXIgdGhlIG9yZGVyIGJ5IHdoaWNoIHdlIHNob3VsZCBjb252ZXJ0IGxheWVyc1xuICogQHJldHVybnMgeyp9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZU1hcGJveExheWVycyhsYXllcnMgPSBbXSwgbGF5ZXJEYXRhID0gW10sIGxheWVyT3JkZXIgPSBbXSkge1xuICBpZiAobGF5ZXJEYXRhLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gbGF5ZXJPcmRlci5zbGljZSgpXG4gICAgICAucmV2ZXJzZSgpXG4gICAgICAucmVkdWNlKChvdmVybGF5cywgaWR4KSA9PiB7XG4gICAgICAgIGNvbnN0IGxheWVyID0gbGF5ZXJzW2lkeF07XG5cbiAgICAgICAgcmV0dXJuIGxheWVyLm92ZXJsYXlUeXBlICE9PSBPVkVSTEFZX1RZUEUubWFwYm94Z2wgP1xuICAgICAgICAgIG92ZXJsYXlzXG4gICAgICAgICAgOiBbXG4gICAgICAgICAgICAuLi5vdmVybGF5cyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6IGxheWVyLmlkLFxuICAgICAgICAgICAgICBkYXRhOiBsYXllckRhdGFbaWR4XS5kYXRhLFxuICAgICAgICAgICAgICBjb25maWc6IGxheWVyRGF0YVtpZHhdLmNvbmZpZyxcbiAgICAgICAgICAgICAgZGF0YXNldElkOiBsYXllci5jb25maWcuZGF0YUlkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgfSwgW10pO1xuICB9XG5cbiAgcmV0dXJuIFtdO1xufTtcblxuLyoqXG4gKiBVcGRhdGUgbWFwYm94IGxheWVycyBvbiB0aGUgZ2l2ZW4gbWFwXG4gKiBAcGFyYW0gbWFwXG4gKiBAcGFyYW0gbmV3TGF5ZXJzIEFycmF5IG9mIG5ldyBtYXBib3ggbGF5ZXJzIHRvIGJlIGRpc3BsYXllZFxuICogQHBhcmFtIG9sZExheWVycyBNYXAgb2YgdGhlIG9sZCBsYXllcnMgdG8gYmUgY29tcGFyZSB3aXRoIHRoZSBjdXJyZW50IG9uZXMgdG8gZGV0ZWN0IGRlbGV0ZWQgbGF5ZXJzXG4gKiAgICAgICAgICAgICAgICAgIHtsYXllcklkOiBkYXRhc2V0SWR9XG4gKiBAcGFyYW0gbWFwTGF5ZXJzIGNhcnJpZXMgaW5mb3JtYXRpb24gYWJvdXQgc3BsaXQgbWFwIHZpZXdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZU1hcGJveExheWVycyhtYXAsIG5ld0xheWVycyA9IFtdLCBvbGRMYXllcnMgPSBudWxsLCBtYXBMYXllcnMgPSBudWxsLCBvcHQgPSB7Zm9yY2U6IHRydWV9KSB7XG4gIC8vIGRlbGV0ZSBub24gZXhpc3RpbmcgbGF5ZXJzXG5cbiAgaWYgKG9sZExheWVycykge1xuICAgIGNvbnN0IG9sZExheWVyc0tleXMgPSBPYmplY3Qua2V5cyhvbGRMYXllcnMpO1xuICAgIGlmIChuZXdMYXllcnMubGVuZ3RoID09PSAwICYmIG9sZExheWVyc0tleXMubGVuZ3RoID4gMCkge1xuICAgICAgb2xkTGF5ZXJzS2V5cy5mb3JFYWNoKGxheWVySWQgPT4gbWFwLnJlbW92ZUxheWVyKGxheWVySWQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gcmVtb3ZlIGxheWVyc1xuICAgICAgY29uc3QgY3VycmVudExheWVyc0lkcyA9IG5ld0xheWVycy5yZWR1Y2UoKGZpbmFsLCBsYXllcikgPT4gKHtcbiAgICAgICAgLi4uZmluYWwsXG4gICAgICAgIFtsYXllci5pZF06IHRydWVcbiAgICAgIH0pLCB7fSk7XG5cbiAgICAgIGNvbnN0IGxheWVyc1RvRGVsZXRlID0gb2xkTGF5ZXJzS2V5cy5yZWR1Y2UoKGZpbmFsLCBsYXllcklkKSA9PiB7XG4gICAgICAgIC8vIGlmIGxheWVyIGRvZXNuJ3QgZXhpc3RzIGFueW1vcmVcbiAgICAgICAgaWYgKCFjdXJyZW50TGF5ZXJzSWRzW2xheWVySWRdKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLmZpbmFsLFxuICAgICAgICAgICAgW2xheWVySWRdOiBvbGRMYXllcnNbbGF5ZXJJZF1cbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaW5hbDtcbiAgICAgIH0sIFtdKTtcbiAgICAgIE9iamVjdC5rZXlzKGxheWVyc1RvRGVsZXRlKS5mb3JFYWNoKGxheWVySWQgPT4gbWFwLnJlbW92ZUxheWVyKGxheWVySWQpKTtcbiAgICB9XG4gIH1cblxuICAvLyBpbnNlcnQgb3IgdXBkYXRlIG5ldyBsYXllclxuICAvLyBUT0RPOiBmaXggY29tcGxleGl0eVxuICAvKiBlc2xpbnQtZGlzYWJsZSBjb21wbGV4aXR5ICovXG4gIG5ld0xheWVycy5mb3JFYWNoKG92ZXJsYXkgPT4ge1xuICAgIGNvbnN0IHtpZDogbGF5ZXJJZCwgY29uZmlnLCBkYXRhLCBkYXRhc2V0SWR9ID0gb3ZlcmxheTtcbiAgICBpZiAoIWRhdGEgJiYgIWNvbmZpZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBpc0F2YWlsYWJsZUFuZFZpc2libGUgPVxuICAgICAgIShtYXBMYXllcnMgJiYgbWFwTGF5ZXJzW2xheWVySWRdKSB8fCBtYXBMYXllcnNbbGF5ZXJJZF0uaXNWaXNpYmxlO1xuICAgIC8vIGNoZWNraW5nIGlmIHNvdXJjZSBhbHJlYWR5IGV4aXN0c1xuXG4gICAgaWYgKGRhdGEgJiYgaXNBdmFpbGFibGVBbmRWaXNpYmxlKSB7XG4gICAgICBjb25zdCBzb3VyY2UgPSBtYXAuZ2V0U291cmNlKGRhdGFzZXRJZCk7XG4gICAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgICBtYXAuYWRkU291cmNlKGRhdGFzZXRJZCwge1xuICAgICAgICAgIHR5cGU6ICdnZW9qc29uJyxcbiAgICAgICAgICBkYXRhXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHNvdXJjZS5zZXREYXRhKGRhdGEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IG9sZENvbmZpZyA9IG9sZExheWVyc1tsYXllcklkXTtcbiAgICBjb25zdCBtYXBib3hMYXllciA9IG1hcC5nZXRMYXllcihsYXllcklkKTtcbiAgICAvLyBjb21wYXJlIHdpdGggcHJldmlvdXMgY29uZmlnc1xuXG4gICAgaWYgKCFvbGRDb25maWcgfHwgb2xkQ29uZmlnICE9PSBjb25maWcgfHwgIW1hcGJveExheWVyIHx8IG9wdC5mb3JjZSkge1xuICAgICAgLy8gY2hlY2sgaWYgbGF5ZXIgYWxyZWFkeSBpcyBzZXRcbiAgICAgIC8vIHJlbW92ZSBpdCBpZiBleGlzdHNcbiAgICAgIGlmIChtYXBib3hMYXllcikge1xuICAgICAgICBtYXAucmVtb3ZlTGF5ZXIobGF5ZXJJZCk7XG4gICAgICB9XG4gICAgICAvLyBhZGQgaWYgdmlzaWJsZSBhbmQgYXZhaWxhYmxlXG4gICAgICBpZiAoaXNBdmFpbGFibGVBbmRWaXNpYmxlKSB7XG4gICAgICAgIG1hcC5hZGRMYXllcihjb25maWcpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIC8qIGVzbGludC1lbmFibGUgY29tcGxleGl0eSAqL1xuICAvLyBUT0RPOiB0aGluayBhYm91dCByZW1vdmluZyBzb3VyY2VzXG59O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0gcG9pbnRzXG4gKiBAcGFyYW0gY29sdW1ucyB7XG4gKiBsYXQ6IHtmaWVsZElkeH0sXG4gKiBsbmc6IHtmaWVsZElkeH0sXG4gKiBhbHQ6IHtmaWVsZElkeH1cbiAqIH1cbiAqIEBwYXJhbSBwcm9wZXJ0aWVzIFt7bGFiZWw6IHtmaWVsZElkeH1dXG4gKiBAcmV0dXJucyB7e3R5cGU6IHN0cmluZywgcHJvcGVydGllczoge30sIGZlYXR1cmVzOiB7dHlwZTogc3RyaW5nLCBwcm9wZXJ0aWVzOiB7fSwgZ2VvbWV0cnk6IHt0eXBlOiBzdHJpbmcsIGNvb3JkaW5hdGVzOiAqW119fVtdfX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdlb2pzb25Gcm9tUG9pbnRzKGFsbERhdGEgPSBbXSwgZmlsdGVyZWRJbmRleCA9IFtdLCBjb2x1bW5zID0ge30sIHByb3BlcnRpZXMgPSBbXSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgZmVhdHVyZXM6IGZpbHRlcmVkSW5kZXgubWFwKGluZGV4ID0+IGFsbERhdGFbaW5kZXhdKS5tYXAocG9pbnQgPT4gKHtcbiAgICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICAgIHByb3BlcnRpZXM6IHByb3BlcnRpZXMucmVkdWNlKChmaW5hbCwgcHJvcGVydHkpID0+ICh7XG4gICAgICAgIC4uLmZpbmFsLFxuICAgICAgICBbcHJvcGVydHkubmFtZV06IHBvaW50W3Byb3BlcnR5LnRhYmxlRmllbGRJbmRleCAtIDFdXG4gICAgICB9KSwge30pLFxuICAgICAgZ2VvbWV0cnk6IHtcbiAgICAgICAgdHlwZTogJ1BvaW50JyxcbiAgICAgICAgY29vcmRpbmF0ZXM6IFtcbiAgICAgICAgICBjb2x1bW5zLmxuZyA/IHBvaW50W2NvbHVtbnMubG5nLmZpZWxkSWR4XSA6IG51bGwsIC8vIGxuZ1xuICAgICAgICAgIGNvbHVtbnMubGF0ID8gcG9pbnRbY29sdW1ucy5sYXQuZmllbGRJZHhdIDogbnVsbCwgLy8gbGF0XG4gICAgICAgICAgY29sdW1ucy5hbHRpdHVkZSA/IHBvaW50W2NvbHVtbnMuYWx0aXR1ZGUuZmllbGRJZHhdIDogMCAvLyBhbHRpdHVkZVxuICAgICAgICBdXG4gICAgICB9XG4gICAgfSkpXG4gIH07XG59XG4iXX0=