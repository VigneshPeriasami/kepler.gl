"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGeoJSON = getGeoJSON;
exports.clustersAtZoom = clustersAtZoom;
exports.clearClustererCache = clearClustererCache;

var _supercluster = _interopRequireDefault(require("supercluster"));

var _lodash = _interopRequireDefault(require("lodash.memoize"));

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
function getGeoJSON(data, getPosition) {
  return data.map(function (d) {
    return {
      type: 'Point',
      properties: {
        data: d,
        points: [d],
        point_count: 1,
        point_count_abbreviated: '1'
      },
      geometry: {
        coordinates: getPosition(d)
      }
    };
  }).filter(function (d) {
    return d.geometry.coordinates.every(Number.isFinite);
  });
}

var clusterResolver = function clusterResolver(_ref) {
  var clusterRadius = _ref.clusterRadius;
  return "".concat(clusterRadius);
};

var getClusterer = (0, _lodash.default)(function (_ref2) {
  var clusterRadius = _ref2.clusterRadius,
      geoJSON = _ref2.geoJSON;
  return (0, _supercluster.default)({
    maxZoom: 20,
    radius: clusterRadius,
    initial: function initial() {
      return {
        points: []
      };
    },
    map: function map(props) {
      return props.data;
    },
    reduce: function reduce(accumulated, props) {
      if (props.points) {
        // avoid using spread to prevent max call stack exceeded error
        props.points.forEach(function (p) {
          accumulated.points.push(p);
        });
      } else {
        accumulated.points.push(props);
      }
    }
  }).load(geoJSON);
}, clusterResolver);

function clustersAtZoom(_ref3) {
  var bbox = _ref3.bbox,
      clusterRadius = _ref3.clusterRadius,
      geoJSON = _ref3.geoJSON,
      zoom = _ref3.zoom;
  var clusterer = getClusterer({
    clusterRadius: clusterRadius,
    geoJSON: geoJSON
  });
  return clusterer.getClusters(bbox, zoom);
}

function clearClustererCache() {
  getClusterer.cache.clear();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZWNrZ2wtbGF5ZXJzL2xheWVyLXV0aWxzL2NsdXN0ZXItdXRpbHMuanMiXSwibmFtZXMiOlsiZ2V0R2VvSlNPTiIsImRhdGEiLCJnZXRQb3NpdGlvbiIsIm1hcCIsImQiLCJ0eXBlIiwicHJvcGVydGllcyIsInBvaW50cyIsInBvaW50X2NvdW50IiwicG9pbnRfY291bnRfYWJicmV2aWF0ZWQiLCJnZW9tZXRyeSIsImNvb3JkaW5hdGVzIiwiZmlsdGVyIiwiZXZlcnkiLCJOdW1iZXIiLCJpc0Zpbml0ZSIsImNsdXN0ZXJSZXNvbHZlciIsImNsdXN0ZXJSYWRpdXMiLCJnZXRDbHVzdGVyZXIiLCJnZW9KU09OIiwibWF4Wm9vbSIsInJhZGl1cyIsImluaXRpYWwiLCJwcm9wcyIsInJlZHVjZSIsImFjY3VtdWxhdGVkIiwiZm9yRWFjaCIsInAiLCJwdXNoIiwibG9hZCIsImNsdXN0ZXJzQXRab29tIiwiYmJveCIsInpvb20iLCJjbHVzdGVyZXIiLCJnZXRDbHVzdGVycyIsImNsZWFyQ2x1c3RlcmVyQ2FjaGUiLCJjYWNoZSIsImNsZWFyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLTyxTQUFTQSxVQUFULENBQW9CQyxJQUFwQixFQUEwQkMsV0FBMUIsRUFBdUM7QUFDNUMsU0FBT0QsSUFBSSxDQUNSRSxHQURJLENBQ0EsVUFBQUMsQ0FBQztBQUFBLFdBQUs7QUFDVEMsTUFBQUEsSUFBSSxFQUFFLE9BREc7QUFFVEMsTUFBQUEsVUFBVSxFQUFFO0FBQ1ZMLFFBQUFBLElBQUksRUFBRUcsQ0FESTtBQUVWRyxRQUFBQSxNQUFNLEVBQUUsQ0FBQ0gsQ0FBRCxDQUZFO0FBR1ZJLFFBQUFBLFdBQVcsRUFBRSxDQUhIO0FBSVZDLFFBQUFBLHVCQUF1QixFQUFFO0FBSmYsT0FGSDtBQVFUQyxNQUFBQSxRQUFRLEVBQUU7QUFDUkMsUUFBQUEsV0FBVyxFQUFFVCxXQUFXLENBQUNFLENBQUQ7QUFEaEI7QUFSRCxLQUFMO0FBQUEsR0FERCxFQWFKUSxNQWJJLENBYUcsVUFBQVIsQ0FBQztBQUFBLFdBQUlBLENBQUMsQ0FBQ00sUUFBRixDQUFXQyxXQUFYLENBQXVCRSxLQUF2QixDQUE2QkMsTUFBTSxDQUFDQyxRQUFwQyxDQUFKO0FBQUEsR0FiSixDQUFQO0FBY0Q7O0FBRUQsSUFBTUMsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQjtBQUFBLE1BQUVDLGFBQUYsUUFBRUEsYUFBRjtBQUFBLG1CQUF3QkEsYUFBeEI7QUFBQSxDQUF4Qjs7QUFFQSxJQUFNQyxZQUFZLEdBQUcscUJBQVEsaUJBQThCO0FBQUEsTUFBNUJELGFBQTRCLFNBQTVCQSxhQUE0QjtBQUFBLE1BQWJFLE9BQWEsU0FBYkEsT0FBYTtBQUN6RCxTQUFPLDJCQUFhO0FBQ2xCQyxJQUFBQSxPQUFPLEVBQUUsRUFEUztBQUVsQkMsSUFBQUEsTUFBTSxFQUFFSixhQUZVO0FBR2xCSyxJQUFBQSxPQUFPLEVBQUU7QUFBQSxhQUFPO0FBQUNmLFFBQUFBLE1BQU0sRUFBRTtBQUFULE9BQVA7QUFBQSxLQUhTO0FBSWxCSixJQUFBQSxHQUFHLEVBQUUsYUFBQW9CLEtBQUs7QUFBQSxhQUFJQSxLQUFLLENBQUN0QixJQUFWO0FBQUEsS0FKUTtBQUtsQnVCLElBQUFBLE1BQU0sRUFBRSxnQkFBQ0MsV0FBRCxFQUFjRixLQUFkLEVBQXdCO0FBQzlCLFVBQUlBLEtBQUssQ0FBQ2hCLE1BQVYsRUFBa0I7QUFDaEI7QUFDQWdCLFFBQUFBLEtBQUssQ0FBQ2hCLE1BQU4sQ0FBYW1CLE9BQWIsQ0FBcUIsVUFBQUMsQ0FBQyxFQUFJO0FBQ3hCRixVQUFBQSxXQUFXLENBQUNsQixNQUFaLENBQW1CcUIsSUFBbkIsQ0FBd0JELENBQXhCO0FBQ0QsU0FGRDtBQUdELE9BTEQsTUFLTztBQUNMRixRQUFBQSxXQUFXLENBQUNsQixNQUFaLENBQW1CcUIsSUFBbkIsQ0FBd0JMLEtBQXhCO0FBQ0Q7QUFDRjtBQWRpQixHQUFiLEVBZUpNLElBZkksQ0FlQ1YsT0FmRCxDQUFQO0FBZ0JELENBakJvQixFQWlCbEJILGVBakJrQixDQUFyQjs7QUFtQk8sU0FBU2MsY0FBVCxRQUE4RDtBQUFBLE1BQXJDQyxJQUFxQyxTQUFyQ0EsSUFBcUM7QUFBQSxNQUEvQmQsYUFBK0IsU0FBL0JBLGFBQStCO0FBQUEsTUFBaEJFLE9BQWdCLFNBQWhCQSxPQUFnQjtBQUFBLE1BQVBhLElBQU8sU0FBUEEsSUFBTztBQUNuRSxNQUFNQyxTQUFTLEdBQUdmLFlBQVksQ0FBQztBQUFDRCxJQUFBQSxhQUFhLEVBQWJBLGFBQUQ7QUFBZ0JFLElBQUFBLE9BQU8sRUFBUEE7QUFBaEIsR0FBRCxDQUE5QjtBQUVBLFNBQU9jLFNBQVMsQ0FBQ0MsV0FBVixDQUFzQkgsSUFBdEIsRUFBNEJDLElBQTVCLENBQVA7QUFDRDs7QUFFTSxTQUFTRyxtQkFBVCxHQUErQjtBQUNwQ2pCLEVBQUFBLFlBQVksQ0FBQ2tCLEtBQWIsQ0FBbUJDLEtBQW5CO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgc3VwZXJjbHVzdGVyIGZyb20gJ3N1cGVyY2x1c3Rlcic7XG5pbXBvcnQgbWVtb2l6ZSBmcm9tICdsb2Rhc2gubWVtb2l6ZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRHZW9KU09OKGRhdGEsIGdldFBvc2l0aW9uKSB7XG4gIHJldHVybiBkYXRhXG4gICAgLm1hcChkID0+ICh7XG4gICAgICB0eXBlOiAnUG9pbnQnLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBkYXRhOiBkLFxuICAgICAgICBwb2ludHM6IFtkXSxcbiAgICAgICAgcG9pbnRfY291bnQ6IDEsXG4gICAgICAgIHBvaW50X2NvdW50X2FiYnJldmlhdGVkOiAnMSdcbiAgICAgIH0sXG4gICAgICBnZW9tZXRyeToge1xuICAgICAgICBjb29yZGluYXRlczogZ2V0UG9zaXRpb24oZClcbiAgICAgIH1cbiAgICB9KSlcbiAgICAuZmlsdGVyKGQgPT4gZC5nZW9tZXRyeS5jb29yZGluYXRlcy5ldmVyeShOdW1iZXIuaXNGaW5pdGUpKTtcbn1cblxuY29uc3QgY2x1c3RlclJlc29sdmVyID0gKHtjbHVzdGVyUmFkaXVzfSkgPT4gYCR7Y2x1c3RlclJhZGl1c31gO1xuXG5jb25zdCBnZXRDbHVzdGVyZXIgPSBtZW1vaXplKCh7Y2x1c3RlclJhZGl1cywgZ2VvSlNPTn0pID0+IHtcbiAgcmV0dXJuIHN1cGVyY2x1c3Rlcih7XG4gICAgbWF4Wm9vbTogMjAsXG4gICAgcmFkaXVzOiBjbHVzdGVyUmFkaXVzLFxuICAgIGluaXRpYWw6ICgpID0+ICh7cG9pbnRzOiBbXX0pLFxuICAgIG1hcDogcHJvcHMgPT4gcHJvcHMuZGF0YSxcbiAgICByZWR1Y2U6IChhY2N1bXVsYXRlZCwgcHJvcHMpID0+IHtcbiAgICAgIGlmIChwcm9wcy5wb2ludHMpIHtcbiAgICAgICAgLy8gYXZvaWQgdXNpbmcgc3ByZWFkIHRvIHByZXZlbnQgbWF4IGNhbGwgc3RhY2sgZXhjZWVkZWQgZXJyb3JcbiAgICAgICAgcHJvcHMucG9pbnRzLmZvckVhY2gocCA9PiB7XG4gICAgICAgICAgYWNjdW11bGF0ZWQucG9pbnRzLnB1c2gocCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWNjdW11bGF0ZWQucG9pbnRzLnB1c2gocHJvcHMpO1xuICAgICAgfVxuICAgIH1cbiAgfSkubG9hZChnZW9KU09OKTtcbn0sIGNsdXN0ZXJSZXNvbHZlcik7XG5cbmV4cG9ydCBmdW5jdGlvbiBjbHVzdGVyc0F0Wm9vbSh7YmJveCwgY2x1c3RlclJhZGl1cywgZ2VvSlNPTiwgem9vbX0pIHtcbiAgY29uc3QgY2x1c3RlcmVyID0gZ2V0Q2x1c3RlcmVyKHtjbHVzdGVyUmFkaXVzLCBnZW9KU09OfSk7XG5cbiAgcmV0dXJuIGNsdXN0ZXJlci5nZXRDbHVzdGVycyhiYm94LCB6b29tKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyQ2x1c3RlcmVyQ2FjaGUoKSB7XG4gIGdldENsdXN0ZXJlci5jYWNoZS5jbGVhcigpO1xufVxuIl19