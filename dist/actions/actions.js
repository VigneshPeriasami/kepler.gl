"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keplerGlInit = exports.receiveMapConfig = exports.resetMapConfig = exports.addDataToMap = void 0;

var _actionTypes = _interopRequireDefault(require("../constants/action-types"));

var _reduxActions = require("redux-actions");

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
 * Add data to kepler.gl reducer, prepare map with preset configuration if config is passed.
 * Kepler.gl provides a handy set of utils to parse data from different format to the `data` object required in dataset. You rarely need to manually format the data obejct.
 *
 * Use `KeplerGlSchema.getConfigToSave` to generate a json blob of the currents instance config.
 * The config object value will always have higher precedence than the options properties.
 *
 * Kepler.gl uses `dataId` in the config to match with loaded dataset. If you pass a config object, you need
 * to match the `info.id` of your dataset to the `dataId` in eath `layer`, `filter` and `interactionConfig.tooltips.fieldsToShow`
 *
 * @param {Array<Object>|Object} datasets - ***required** datasets can be a dataset or an array of datasets
 * Each dataset object needs to have `info` and `data` property.
 * @param {Object} datasets.info -info of a dataset
 * @param {string} datasets.info.id - id of this dataset. If config is defined, `id` should matches the `dataId` in config.
 * @param {string} datasets.info.label - A display name of this dataset
 * @param {Object} datasets.data - ***required** The data object, in a tabular format with 2 properties `fields` and `rows`
 * @param {Array<Object>} datasets.data.fields - ***required** Array of fields,
 * @param {string} datasets.data.fields.name - ***required** Name of the field,
 * @param {Array<Array>} datasets.data.rows - ***required** Array of rows, in a tabular format with `fields` and `rows`
 *
 * @param {Object} options
 * @param {boolean} options.centerMap `default: true` if `centerMap` is set to `true` kepler.gl will
 * place the map view within the data points boundaries
 * @param {boolean} options.readOnly `default: false` if `readOnly` is set to `true`
 * the left setting panel will be hidden
 * @param {Object} config this object will contain the full kepler.gl instance configuration {mapState, mapStyle, visState}
 * @public
 * @example
 *
 * // app.js
 * import {addDataToMap} from 'kepler.gl/actions';
 *
 * const sampleTripData = {
 *  fields: [
 *    {name: 'tpep_pickup_datetime', format: 'YYYY-M-D H:m:s', type: 'timestamp'},
 *    {name: 'pickup_longitude', format: '', type: 'real'},
 *    {name: 'pickup_latitude', format: '', type: 'real'}
 *  ],
 *  rows: [
 *    ['2015-01-15 19:05:39 +00:00', -73.99389648, 40.75011063],
 *    ['2015-01-15 19:05:39 +00:00', -73.97642517, 40.73981094],
 *    ['2015-01-15 19:05:40 +00:00', -73.96870422, 40.75424576],
 *  ]
 * };
 *
 * const sampleConfig = {
 *   visState: {
 *     filters: [
 *       {
 *         id: 'me',
 *         dataId: 'test_trip_data',
 *         name: 'tpep_pickup_datetime',
 *         type: 'timeRange',
 *         enlarged: true
 *       }
 *     ]
 *   }
 * }
 *
 * this.props.dispatch(
 *   addDataToMap({
 *     datasets: {
 *       info: {
 *         label: 'Sample Taxi Trips in New York City',
 *         id: 'test_trip_data'
 *       },
 *       data: sampleTripData
 *     },
 *     option: {
 *       centerMap: true,
 *       readOnly: false
 *     },
 *     config: sampleConfig
 *   })
 * );
 */
var addDataToMap = (0, _reduxActions.createAction)(_actionTypes.default.ADD_DATA_TO_MAP, function (data) {
  return data;
});
/**
 * Reset all sub-reducers to its initial state. This can be used to clear out all configuration in the reducer.
 * @public
 */

exports.addDataToMap = addDataToMap;
var resetMapConfig = (0, _reduxActions.createAction)(_actionTypes.default.RESET_MAP_CONFIG);
/**
 * Pass config to kepler.gl instance, prepare the state with preset configs.
 * Calling `KeplerGlSchema.parseSavedConfig` to convert saved config before passing it in is required.
 *
 * You can call `receiveMapConfig` before passing in any data. The reducer will store layer and filter config, waiting for
 * data to come in. When data arrives, you can call `addDataToMap` without passing any config, and the reducer will try to match
 * preloaded configs. This behavior is designed to allow asynchronic data loading.
 *
 * It is also useful when you want to prepare the kepler.gl instance with some preset layer and filter settings.
 * **Note** Sequence is important, `receiveMapConfig` needs to be called __before__ data is loaded. Currently kepler.gl doesn't allow callling `receiveMapConfig` after data is loaded.
 * It will reset current configuration first then apply config to it.
 *
 * @param {Object} config - ***required** The Config Object
 * @public
 * @example
 * import {receiveMapConfig} from 'kepler.gl/actions';
 * import KeplerGlSchema from 'kepler.gl/schemas';
 *
 * const parsedConfig = KeplerGlSchema.parseSavedConfig(config);
 * this.props.dispatch(receiveMapConfig(parsedConfig));
 */

exports.resetMapConfig = resetMapConfig;
var receiveMapConfig = (0, _reduxActions.createAction)(_actionTypes.default.RECEIVE_MAP_CONFIG, function (config) {
  return config;
});
/**
 * Initialize kepler.gl reducer. It is used to pass in `mapboxApiAccessToken` to `mapStyle` reducer.
 * @param {Object} payload
 * @param {string} payload.mapboxApiAccessToken - mapboxApiAccessToken to be saved to mapStyle reducer
 * @public
 */

exports.receiveMapConfig = receiveMapConfig;
var keplerGlInit = (0, _reduxActions.createAction)(_actionTypes.default.INIT, function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      mapboxApiAccessToken = _ref.mapboxApiAccessToken;

  return {
    mapboxApiAccessToken: mapboxApiAccessToken
  };
});
exports.keplerGlInit = keplerGlInit;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL2FjdGlvbnMuanMiXSwibmFtZXMiOlsiYWRkRGF0YVRvTWFwIiwiQWN0aW9uVHlwZXMiLCJBRERfREFUQV9UT19NQVAiLCJkYXRhIiwicmVzZXRNYXBDb25maWciLCJSRVNFVF9NQVBfQ09ORklHIiwicmVjZWl2ZU1hcENvbmZpZyIsIlJFQ0VJVkVfTUFQX0NPTkZJRyIsImNvbmZpZyIsImtlcGxlckdsSW5pdCIsIklOSVQiLCJtYXBib3hBcGlBY2Nlc3NUb2tlbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQXJCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFLRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRFSyxJQUFNQSxZQUFZLEdBQUcsZ0NBQzFCQyxxQkFBWUMsZUFEYyxFQUUxQixVQUFBQyxJQUFJO0FBQUEsU0FBSUEsSUFBSjtBQUFBLENBRnNCLENBQXJCO0FBS1A7Ozs7OztBQUlPLElBQU1DLGNBQWMsR0FBRyxnQ0FDNUJILHFCQUFZSSxnQkFEZ0IsQ0FBdkI7QUFJUDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQk8sSUFBTUMsZ0JBQWdCLEdBQUcsZ0NBQzlCTCxxQkFBWU0sa0JBRGtCLEVBRTlCLFVBQUFDLE1BQU07QUFBQSxTQUFJQSxNQUFKO0FBQUEsQ0FGd0IsQ0FBekI7QUFLUDs7Ozs7Ozs7QUFNTyxJQUFNQyxZQUFZLEdBQUksZ0NBQzNCUixxQkFBWVMsSUFEZSxFQUUzQjtBQUFBLGlGQUEwQixFQUExQjtBQUFBLE1BQUVDLG9CQUFGLFFBQUVBLG9CQUFGOztBQUFBLFNBQWtDO0FBQUNBLElBQUFBLG9CQUFvQixFQUFwQkE7QUFBRCxHQUFsQztBQUFBLENBRjJCLENBQXRCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IEFjdGlvblR5cGVzIGZyb20gJ2NvbnN0YW50cy9hY3Rpb24tdHlwZXMnO1xuaW1wb3J0IHtjcmVhdGVBY3Rpb259IGZyb20gJ3JlZHV4LWFjdGlvbnMnO1xuXG4gIC8qKlxuICAgKiBBZGQgZGF0YSB0byBrZXBsZXIuZ2wgcmVkdWNlciwgcHJlcGFyZSBtYXAgd2l0aCBwcmVzZXQgY29uZmlndXJhdGlvbiBpZiBjb25maWcgaXMgcGFzc2VkLlxuICAgKiBLZXBsZXIuZ2wgcHJvdmlkZXMgYSBoYW5keSBzZXQgb2YgdXRpbHMgdG8gcGFyc2UgZGF0YSBmcm9tIGRpZmZlcmVudCBmb3JtYXQgdG8gdGhlIGBkYXRhYCBvYmplY3QgcmVxdWlyZWQgaW4gZGF0YXNldC4gWW91IHJhcmVseSBuZWVkIHRvIG1hbnVhbGx5IGZvcm1hdCB0aGUgZGF0YSBvYmVqY3QuXG4gICAqXG4gICAqIFVzZSBgS2VwbGVyR2xTY2hlbWEuZ2V0Q29uZmlnVG9TYXZlYCB0byBnZW5lcmF0ZSBhIGpzb24gYmxvYiBvZiB0aGUgY3VycmVudHMgaW5zdGFuY2UgY29uZmlnLlxuICAgKiBUaGUgY29uZmlnIG9iamVjdCB2YWx1ZSB3aWxsIGFsd2F5cyBoYXZlIGhpZ2hlciBwcmVjZWRlbmNlIHRoYW4gdGhlIG9wdGlvbnMgcHJvcGVydGllcy5cbiAgICpcbiAgICogS2VwbGVyLmdsIHVzZXMgYGRhdGFJZGAgaW4gdGhlIGNvbmZpZyB0byBtYXRjaCB3aXRoIGxvYWRlZCBkYXRhc2V0LiBJZiB5b3UgcGFzcyBhIGNvbmZpZyBvYmplY3QsIHlvdSBuZWVkXG4gICAqIHRvIG1hdGNoIHRoZSBgaW5mby5pZGAgb2YgeW91ciBkYXRhc2V0IHRvIHRoZSBgZGF0YUlkYCBpbiBlYXRoIGBsYXllcmAsIGBmaWx0ZXJgIGFuZCBgaW50ZXJhY3Rpb25Db25maWcudG9vbHRpcHMuZmllbGRzVG9TaG93YFxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5PE9iamVjdD58T2JqZWN0fSBkYXRhc2V0cyAtICoqKnJlcXVpcmVkKiogZGF0YXNldHMgY2FuIGJlIGEgZGF0YXNldCBvciBhbiBhcnJheSBvZiBkYXRhc2V0c1xuICAgKiBFYWNoIGRhdGFzZXQgb2JqZWN0IG5lZWRzIHRvIGhhdmUgYGluZm9gIGFuZCBgZGF0YWAgcHJvcGVydHkuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhc2V0cy5pbmZvIC1pbmZvIG9mIGEgZGF0YXNldFxuICAgKiBAcGFyYW0ge3N0cmluZ30gZGF0YXNldHMuaW5mby5pZCAtIGlkIG9mIHRoaXMgZGF0YXNldC4gSWYgY29uZmlnIGlzIGRlZmluZWQsIGBpZGAgc2hvdWxkIG1hdGNoZXMgdGhlIGBkYXRhSWRgIGluIGNvbmZpZy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGRhdGFzZXRzLmluZm8ubGFiZWwgLSBBIGRpc3BsYXkgbmFtZSBvZiB0aGlzIGRhdGFzZXRcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFzZXRzLmRhdGEgLSAqKipyZXF1aXJlZCoqIFRoZSBkYXRhIG9iamVjdCwgaW4gYSB0YWJ1bGFyIGZvcm1hdCB3aXRoIDIgcHJvcGVydGllcyBgZmllbGRzYCBhbmQgYHJvd3NgXG4gICAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gZGF0YXNldHMuZGF0YS5maWVsZHMgLSAqKipyZXF1aXJlZCoqIEFycmF5IG9mIGZpZWxkcyxcbiAgICogQHBhcmFtIHtzdHJpbmd9IGRhdGFzZXRzLmRhdGEuZmllbGRzLm5hbWUgLSAqKipyZXF1aXJlZCoqIE5hbWUgb2YgdGhlIGZpZWxkLFxuICAgKiBAcGFyYW0ge0FycmF5PEFycmF5Pn0gZGF0YXNldHMuZGF0YS5yb3dzIC0gKioqcmVxdWlyZWQqKiBBcnJheSBvZiByb3dzLCBpbiBhIHRhYnVsYXIgZm9ybWF0IHdpdGggYGZpZWxkc2AgYW5kIGByb3dzYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMuY2VudGVyTWFwIGBkZWZhdWx0OiB0cnVlYCBpZiBgY2VudGVyTWFwYCBpcyBzZXQgdG8gYHRydWVgIGtlcGxlci5nbCB3aWxsXG4gICAqIHBsYWNlIHRoZSBtYXAgdmlldyB3aXRoaW4gdGhlIGRhdGEgcG9pbnRzIGJvdW5kYXJpZXNcbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnJlYWRPbmx5IGBkZWZhdWx0OiBmYWxzZWAgaWYgYHJlYWRPbmx5YCBpcyBzZXQgdG8gYHRydWVgXG4gICAqIHRoZSBsZWZ0IHNldHRpbmcgcGFuZWwgd2lsbCBiZSBoaWRkZW5cbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyB0aGlzIG9iamVjdCB3aWxsIGNvbnRhaW4gdGhlIGZ1bGwga2VwbGVyLmdsIGluc3RhbmNlIGNvbmZpZ3VyYXRpb24ge21hcFN0YXRlLCBtYXBTdHlsZSwgdmlzU3RhdGV9XG4gICAqIEBwdWJsaWNcbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogLy8gYXBwLmpzXG4gICAqIGltcG9ydCB7YWRkRGF0YVRvTWFwfSBmcm9tICdrZXBsZXIuZ2wvYWN0aW9ucyc7XG4gICAqXG4gICAqIGNvbnN0IHNhbXBsZVRyaXBEYXRhID0ge1xuICAgKiAgZmllbGRzOiBbXG4gICAqICAgIHtuYW1lOiAndHBlcF9waWNrdXBfZGF0ZXRpbWUnLCBmb3JtYXQ6ICdZWVlZLU0tRCBIOm06cycsIHR5cGU6ICd0aW1lc3RhbXAnfSxcbiAgICogICAge25hbWU6ICdwaWNrdXBfbG9uZ2l0dWRlJywgZm9ybWF0OiAnJywgdHlwZTogJ3JlYWwnfSxcbiAgICogICAge25hbWU6ICdwaWNrdXBfbGF0aXR1ZGUnLCBmb3JtYXQ6ICcnLCB0eXBlOiAncmVhbCd9XG4gICAqICBdLFxuICAgKiAgcm93czogW1xuICAgKiAgICBbJzIwMTUtMDEtMTUgMTk6MDU6MzkgKzAwOjAwJywgLTczLjk5Mzg5NjQ4LCA0MC43NTAxMTA2M10sXG4gICAqICAgIFsnMjAxNS0wMS0xNSAxOTowNTozOSArMDA6MDAnLCAtNzMuOTc2NDI1MTcsIDQwLjczOTgxMDk0XSxcbiAgICogICAgWycyMDE1LTAxLTE1IDE5OjA1OjQwICswMDowMCcsIC03My45Njg3MDQyMiwgNDAuNzU0MjQ1NzZdLFxuICAgKiAgXVxuICAgKiB9O1xuICAgKlxuICAgKiBjb25zdCBzYW1wbGVDb25maWcgPSB7XG4gICAqICAgdmlzU3RhdGU6IHtcbiAgICogICAgIGZpbHRlcnM6IFtcbiAgICogICAgICAge1xuICAgKiAgICAgICAgIGlkOiAnbWUnLFxuICAgKiAgICAgICAgIGRhdGFJZDogJ3Rlc3RfdHJpcF9kYXRhJyxcbiAgICogICAgICAgICBuYW1lOiAndHBlcF9waWNrdXBfZGF0ZXRpbWUnLFxuICAgKiAgICAgICAgIHR5cGU6ICd0aW1lUmFuZ2UnLFxuICAgKiAgICAgICAgIGVubGFyZ2VkOiB0cnVlXG4gICAqICAgICAgIH1cbiAgICogICAgIF1cbiAgICogICB9XG4gICAqIH1cbiAgICpcbiAgICogdGhpcy5wcm9wcy5kaXNwYXRjaChcbiAgICogICBhZGREYXRhVG9NYXAoe1xuICAgKiAgICAgZGF0YXNldHM6IHtcbiAgICogICAgICAgaW5mbzoge1xuICAgKiAgICAgICAgIGxhYmVsOiAnU2FtcGxlIFRheGkgVHJpcHMgaW4gTmV3IFlvcmsgQ2l0eScsXG4gICAqICAgICAgICAgaWQ6ICd0ZXN0X3RyaXBfZGF0YSdcbiAgICogICAgICAgfSxcbiAgICogICAgICAgZGF0YTogc2FtcGxlVHJpcERhdGFcbiAgICogICAgIH0sXG4gICAqICAgICBvcHRpb246IHtcbiAgICogICAgICAgY2VudGVyTWFwOiB0cnVlLFxuICAgKiAgICAgICByZWFkT25seTogZmFsc2VcbiAgICogICAgIH0sXG4gICAqICAgICBjb25maWc6IHNhbXBsZUNvbmZpZ1xuICAgKiAgIH0pXG4gICAqICk7XG4gICAqL1xuZXhwb3J0IGNvbnN0IGFkZERhdGFUb01hcCA9IGNyZWF0ZUFjdGlvbihcbiAgQWN0aW9uVHlwZXMuQUREX0RBVEFfVE9fTUFQLFxuICBkYXRhID0+IGRhdGFcbik7XG5cbi8qKlxuICogUmVzZXQgYWxsIHN1Yi1yZWR1Y2VycyB0byBpdHMgaW5pdGlhbCBzdGF0ZS4gVGhpcyBjYW4gYmUgdXNlZCB0byBjbGVhciBvdXQgYWxsIGNvbmZpZ3VyYXRpb24gaW4gdGhlIHJlZHVjZXIuXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCByZXNldE1hcENvbmZpZyA9IGNyZWF0ZUFjdGlvbihcbiAgQWN0aW9uVHlwZXMuUkVTRVRfTUFQX0NPTkZJR1xuKTtcblxuLyoqXG4gKiBQYXNzIGNvbmZpZyB0byBrZXBsZXIuZ2wgaW5zdGFuY2UsIHByZXBhcmUgdGhlIHN0YXRlIHdpdGggcHJlc2V0IGNvbmZpZ3MuXG4gKiBDYWxsaW5nIGBLZXBsZXJHbFNjaGVtYS5wYXJzZVNhdmVkQ29uZmlnYCB0byBjb252ZXJ0IHNhdmVkIGNvbmZpZyBiZWZvcmUgcGFzc2luZyBpdCBpbiBpcyByZXF1aXJlZC5cbiAqXG4gKiBZb3UgY2FuIGNhbGwgYHJlY2VpdmVNYXBDb25maWdgIGJlZm9yZSBwYXNzaW5nIGluIGFueSBkYXRhLiBUaGUgcmVkdWNlciB3aWxsIHN0b3JlIGxheWVyIGFuZCBmaWx0ZXIgY29uZmlnLCB3YWl0aW5nIGZvclxuICogZGF0YSB0byBjb21lIGluLiBXaGVuIGRhdGEgYXJyaXZlcywgeW91IGNhbiBjYWxsIGBhZGREYXRhVG9NYXBgIHdpdGhvdXQgcGFzc2luZyBhbnkgY29uZmlnLCBhbmQgdGhlIHJlZHVjZXIgd2lsbCB0cnkgdG8gbWF0Y2hcbiAqIHByZWxvYWRlZCBjb25maWdzLiBUaGlzIGJlaGF2aW9yIGlzIGRlc2lnbmVkIHRvIGFsbG93IGFzeW5jaHJvbmljIGRhdGEgbG9hZGluZy5cbiAqXG4gKiBJdCBpcyBhbHNvIHVzZWZ1bCB3aGVuIHlvdSB3YW50IHRvIHByZXBhcmUgdGhlIGtlcGxlci5nbCBpbnN0YW5jZSB3aXRoIHNvbWUgcHJlc2V0IGxheWVyIGFuZCBmaWx0ZXIgc2V0dGluZ3MuXG4gKiAqKk5vdGUqKiBTZXF1ZW5jZSBpcyBpbXBvcnRhbnQsIGByZWNlaXZlTWFwQ29uZmlnYCBuZWVkcyB0byBiZSBjYWxsZWQgX19iZWZvcmVfXyBkYXRhIGlzIGxvYWRlZC4gQ3VycmVudGx5IGtlcGxlci5nbCBkb2Vzbid0IGFsbG93IGNhbGxsaW5nIGByZWNlaXZlTWFwQ29uZmlnYCBhZnRlciBkYXRhIGlzIGxvYWRlZC5cbiAqIEl0IHdpbGwgcmVzZXQgY3VycmVudCBjb25maWd1cmF0aW9uIGZpcnN0IHRoZW4gYXBwbHkgY29uZmlnIHRvIGl0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgLSAqKipyZXF1aXJlZCoqIFRoZSBDb25maWcgT2JqZWN0XG4gKiBAcHVibGljXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IHtyZWNlaXZlTWFwQ29uZmlnfSBmcm9tICdrZXBsZXIuZ2wvYWN0aW9ucyc7XG4gKiBpbXBvcnQgS2VwbGVyR2xTY2hlbWEgZnJvbSAna2VwbGVyLmdsL3NjaGVtYXMnO1xuICpcbiAqIGNvbnN0IHBhcnNlZENvbmZpZyA9IEtlcGxlckdsU2NoZW1hLnBhcnNlU2F2ZWRDb25maWcoY29uZmlnKTtcbiAqIHRoaXMucHJvcHMuZGlzcGF0Y2gocmVjZWl2ZU1hcENvbmZpZyhwYXJzZWRDb25maWcpKTtcbiAqL1xuZXhwb3J0IGNvbnN0IHJlY2VpdmVNYXBDb25maWcgPSBjcmVhdGVBY3Rpb24oXG4gIEFjdGlvblR5cGVzLlJFQ0VJVkVfTUFQX0NPTkZJRyxcbiAgY29uZmlnID0+IGNvbmZpZ1xuKTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGtlcGxlci5nbCByZWR1Y2VyLiBJdCBpcyB1c2VkIHRvIHBhc3MgaW4gYG1hcGJveEFwaUFjY2Vzc1Rva2VuYCB0byBgbWFwU3R5bGVgIHJlZHVjZXIuXG4gKiBAcGFyYW0ge09iamVjdH0gcGF5bG9hZFxuICogQHBhcmFtIHtzdHJpbmd9IHBheWxvYWQubWFwYm94QXBpQWNjZXNzVG9rZW4gLSBtYXBib3hBcGlBY2Nlc3NUb2tlbiB0byBiZSBzYXZlZCB0byBtYXBTdHlsZSByZWR1Y2VyXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBrZXBsZXJHbEluaXQgPSAgY3JlYXRlQWN0aW9uKFxuICBBY3Rpb25UeXBlcy5JTklULFxuICAoe21hcGJveEFwaUFjY2Vzc1Rva2VufSA9IHt9KSA9PiAoe21hcGJveEFwaUFjY2Vzc1Rva2VufSlcbik7XG4iXX0=