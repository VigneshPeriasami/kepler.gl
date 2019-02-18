"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _window = require("global/window");

var _visStateSchema = _interopRequireDefault(require("./vis-state-schema"));

var _datasetSchema = _interopRequireDefault(require("./dataset-schema"));

var _mapStyleSchema = _interopRequireDefault(require("./map-style-schema"));

var _mapStateSchema = _interopRequireDefault(require("./map-state-schema"));

var _versions = require("./versions");

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
var REDUCER_SCHEMAS = {
  visState: _visStateSchema.default,
  mapState: _mapStateSchema.default,
  mapStyle: _mapStyleSchema.default
};

var KeplerGLSchema =
/*#__PURE__*/
function () {
  function KeplerGLSchema() {
    (0, _classCallCheck2.default)(this, KeplerGLSchema);
    this._validVersions = _versions.VERSIONS;
    this._version = _versions.CURRENT_VERSION;
    this._reducerSchemas = REDUCER_SCHEMAS;
    this._datasetSchema = _datasetSchema.default;
    this._datasetLastSaved = null;
    this._savedDataset = null;
  }
  /**
   * stateToSave = {
   *   datasets: [
   *     {
   *       version: 'v0',
   *       data: {id, label, color, allData, fields}
   *     },
   *     {
   *       version: 'v0',
   *       data: {id, label, color, allData, fields}
   *     }
   *   ],
   *   config: {
   *     version: 'v0',
   *     config: {}
   *   },
   *   info: {
   *     app: 'kepler.gl',
   *     create_at: 'Mon May 28 2018 21:04:46 GMT-0700 (PDT)'
   *   }
   * }
   *
   * Get config and data of current map to save
   * @param {Object} state
   * @returns {{datasets: Object[], config: Object, info: Object}} app state to save
   */


  (0, _createClass2.default)(KeplerGLSchema, [{
    key: "save",
    value: function save(state) {
      return {
        datasets: this.getDatasetToSave(state),
        config: this.getConfigToSave(state),
        info: {
          app: 'kepler.gl',
          created_at: new Date().toString()
        }
      };
    }
  }, {
    key: "load",
    value: function load(savedDatasets, savedConfig) {
      return {
        datasets: this.parseSavedData(savedDatasets),
        config: savedConfig ? this.parseSavedConfig(savedConfig) : undefined
      };
    }
    /**
     * Get data to save
     * @param {Object} state - app state
     * @returns {{version: String, data: Object}} - dataset to save
     */

  }, {
    key: "getDatasetToSave",
    value: function getDatasetToSave(state) {
      var _this = this;

      var dataChangedSinceLastSave = this.hasDataChanged(state);

      if (!dataChangedSinceLastSave) {
        return this._savedDataset;
      }

      var visState = state.visState;
      var datasets = Object.values(visState.datasets).map(function (ds) {
        return {
          version: _this._version,
          data: _this._datasetSchema[_this._version].save(ds)
        };
      }); // keep a copy of formatted datasets to save

      this._datasetLastSaved = visState.datasets;
      this._savedDataset = datasets;
      return datasets;
    }
    /**
     * Get App config to save
     * @param {Object} state - app state
     * @returns {{version: String, config: Object}} - config to save
     */

  }, {
    key: "getConfigToSave",
    value: function getConfigToSave(state) {
      var _this2 = this;

      var config = Object.keys(this._reducerSchemas).reduce(function (accu, key) {
        return (0, _objectSpread2.default)({}, accu, _this2._reducerSchemas[key][_this2._version].save(state[key]));
      }, {});
      return {
        version: this._version,
        config: config
      };
    }
    /**
     * Parse saved data
     * @param {Array} datasets
     * @returns {Object | null} - data to save
     */

  }, {
    key: "parseSavedData",
    value: function parseSavedData(datasets) {
      var _this3 = this;

      return datasets.reduce(function (accu, ds) {
        var validVersion = _this3.validateVersion(ds.version);

        if (!validVersion) {
          return accu;
        }

        accu.push(_this3._datasetSchema[validVersion].load(ds.data));
        return accu;
      }, []);
    }
    /**
     * Parse saved App config
     * @param {String} opt.version - config version
     * @param {Object} opt.config - saved config
     * @param {Object} state - current App State
     * @returns {Object | null} - parsed config
     */

  }, {
    key: "parseSavedConfig",
    value: function parseSavedConfig(_ref) {
      var _this4 = this;

      var version = _ref.version,
          config = _ref.config;
      var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var validVersion = this.validateVersion(version);

      if (!validVersion) {
        return null;
      }

      return Object.keys(config).reduce(function (accu, key) {
        return (0, _objectSpread2.default)({}, accu, key in _this4._reducerSchemas ? _this4._reducerSchemas[key][validVersion].load(config[key], state[key]) : {});
      }, {});
    }
    /**
     * Validate version
     * @param {String} version
     * @returns {String | null} validVersion
     */

  }, {
    key: "validateVersion",
    value: function validateVersion(version) {
      if (!version) {
        _window.console.error('There is no version number associated with this saved map');

        return null;
      }

      if (!this._validVersions[version]) {
        _window.console.error("".concat(version, " is not a valid version"));

        return null;
      }

      return version;
    }
    /**
     * Check if data has changed since last save
     * @param {Object} state
     * @returns {boolean} - whether data has changed or not
     */

  }, {
    key: "hasDataChanged",
    value: function hasDataChanged(state) {
      return this._datasetLastSaved !== state.visState.datasets;
    }
  }]);
  return KeplerGLSchema;
}();

var KeplerGLSchemaManager = new KeplerGLSchema();
var _default = KeplerGLSchemaManager;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY2hlbWFzL3NjaGVtYS1tYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIlJFRFVDRVJfU0NIRU1BUyIsInZpc1N0YXRlIiwidmlzU3RhdGVTY2hlbWEiLCJtYXBTdGF0ZSIsIm1hcFN0YXRlU2NoZW1hIiwibWFwU3R5bGUiLCJtYXBTdHlsZVNjaGVtYSIsIktlcGxlckdMU2NoZW1hIiwiX3ZhbGlkVmVyc2lvbnMiLCJWRVJTSU9OUyIsIl92ZXJzaW9uIiwiQ1VSUkVOVF9WRVJTSU9OIiwiX3JlZHVjZXJTY2hlbWFzIiwiX2RhdGFzZXRTY2hlbWEiLCJkYXRhc2V0U2NoZW1hIiwiX2RhdGFzZXRMYXN0U2F2ZWQiLCJfc2F2ZWREYXRhc2V0Iiwic3RhdGUiLCJkYXRhc2V0cyIsImdldERhdGFzZXRUb1NhdmUiLCJjb25maWciLCJnZXRDb25maWdUb1NhdmUiLCJpbmZvIiwiYXBwIiwiY3JlYXRlZF9hdCIsIkRhdGUiLCJ0b1N0cmluZyIsInNhdmVkRGF0YXNldHMiLCJzYXZlZENvbmZpZyIsInBhcnNlU2F2ZWREYXRhIiwicGFyc2VTYXZlZENvbmZpZyIsInVuZGVmaW5lZCIsImRhdGFDaGFuZ2VkU2luY2VMYXN0U2F2ZSIsImhhc0RhdGFDaGFuZ2VkIiwiT2JqZWN0IiwidmFsdWVzIiwibWFwIiwiZHMiLCJ2ZXJzaW9uIiwiZGF0YSIsInNhdmUiLCJrZXlzIiwicmVkdWNlIiwiYWNjdSIsImtleSIsInZhbGlkVmVyc2lvbiIsInZhbGlkYXRlVmVyc2lvbiIsInB1c2giLCJsb2FkIiwiQ29uc29sZSIsImVycm9yIiwiS2VwbGVyR0xTY2hlbWFNYW5hZ2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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LGNBQUwsQ0FBb0I4QixPQUFwQixDQUFMLEVBQW1DO0FBQ2pDVyx3QkFBUUMsS0FBUixXQUFpQlosT0FBakI7O0FBQ0EsZUFBTyxJQUFQO0FBQ0Q7O0FBRUQsYUFBT0EsT0FBUDtBQUNEO0FBRUQ7Ozs7Ozs7O21DQUtlckIsSyxFQUFPO0FBQ3BCLGFBQU8sS0FBS0YsaUJBQUwsS0FBMkJFLEtBQUssQ0FBQ2hCLFFBQU4sQ0FBZWlCLFFBQWpEO0FBQ0Q7Ozs7O0FBR0gsSUFBTWlDLHFCQUFxQixHQUFHLElBQUk1QyxjQUFKLEVBQTlCO2VBRWU0QyxxQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7Y29uc29sZSBhcyBDb25zb2xlfSBmcm9tICdnbG9iYWwvd2luZG93JztcblxuaW1wb3J0IHZpc1N0YXRlU2NoZW1hIGZyb20gJy4vdmlzLXN0YXRlLXNjaGVtYSc7XG5pbXBvcnQgZGF0YXNldFNjaGVtYSBmcm9tICcuL2RhdGFzZXQtc2NoZW1hJztcbmltcG9ydCBtYXBTdHlsZVNjaGVtYSBmcm9tICcuL21hcC1zdHlsZS1zY2hlbWEnO1xuaW1wb3J0IG1hcFN0YXRlU2NoZW1hIGZyb20gJy4vbWFwLXN0YXRlLXNjaGVtYSc7XG5cbmltcG9ydCB7Q1VSUkVOVF9WRVJTSU9OLCBWRVJTSU9OU30gZnJvbSAnLi92ZXJzaW9ucyc7XG5cbmNvbnN0IFJFRFVDRVJfU0NIRU1BUyA9IHtcbiAgdmlzU3RhdGU6IHZpc1N0YXRlU2NoZW1hLFxuICBtYXBTdGF0ZTogbWFwU3RhdGVTY2hlbWEsXG4gIG1hcFN0eWxlOiBtYXBTdHlsZVNjaGVtYVxufTtcblxuY2xhc3MgS2VwbGVyR0xTY2hlbWEge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl92YWxpZFZlcnNpb25zID0gVkVSU0lPTlM7XG4gICAgdGhpcy5fdmVyc2lvbiA9IENVUlJFTlRfVkVSU0lPTjtcbiAgICB0aGlzLl9yZWR1Y2VyU2NoZW1hcyA9IFJFRFVDRVJfU0NIRU1BUztcbiAgICB0aGlzLl9kYXRhc2V0U2NoZW1hID0gZGF0YXNldFNjaGVtYTtcblxuICAgIHRoaXMuX2RhdGFzZXRMYXN0U2F2ZWQgPSBudWxsO1xuICAgIHRoaXMuX3NhdmVkRGF0YXNldCA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogc3RhdGVUb1NhdmUgPSB7XG4gICAqICAgZGF0YXNldHM6IFtcbiAgICogICAgIHtcbiAgICogICAgICAgdmVyc2lvbjogJ3YwJyxcbiAgICogICAgICAgZGF0YToge2lkLCBsYWJlbCwgY29sb3IsIGFsbERhdGEsIGZpZWxkc31cbiAgICogICAgIH0sXG4gICAqICAgICB7XG4gICAqICAgICAgIHZlcnNpb246ICd2MCcsXG4gICAqICAgICAgIGRhdGE6IHtpZCwgbGFiZWwsIGNvbG9yLCBhbGxEYXRhLCBmaWVsZHN9XG4gICAqICAgICB9XG4gICAqICAgXSxcbiAgICogICBjb25maWc6IHtcbiAgICogICAgIHZlcnNpb246ICd2MCcsXG4gICAqICAgICBjb25maWc6IHt9XG4gICAqICAgfSxcbiAgICogICBpbmZvOiB7XG4gICAqICAgICBhcHA6ICdrZXBsZXIuZ2wnLFxuICAgKiAgICAgY3JlYXRlX2F0OiAnTW9uIE1heSAyOCAyMDE4IDIxOjA0OjQ2IEdNVC0wNzAwIChQRFQpJ1xuICAgKiAgIH1cbiAgICogfVxuICAgKlxuICAgKiBHZXQgY29uZmlnIGFuZCBkYXRhIG9mIGN1cnJlbnQgbWFwIHRvIHNhdmVcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gICAqIEByZXR1cm5zIHt7ZGF0YXNldHM6IE9iamVjdFtdLCBjb25maWc6IE9iamVjdCwgaW5mbzogT2JqZWN0fX0gYXBwIHN0YXRlIHRvIHNhdmVcbiAgICovXG4gIHNhdmUoc3RhdGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZGF0YXNldHM6IHRoaXMuZ2V0RGF0YXNldFRvU2F2ZShzdGF0ZSksXG4gICAgICBjb25maWc6IHRoaXMuZ2V0Q29uZmlnVG9TYXZlKHN0YXRlKSxcbiAgICAgIGluZm86IHtcbiAgICAgICAgYXBwOiAna2VwbGVyLmdsJyxcbiAgICAgICAgY3JlYXRlZF9hdDogbmV3IERhdGUoKS50b1N0cmluZygpXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGxvYWQoc2F2ZWREYXRhc2V0cywgc2F2ZWRDb25maWcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZGF0YXNldHM6IHRoaXMucGFyc2VTYXZlZERhdGEoc2F2ZWREYXRhc2V0cyksXG4gICAgICBjb25maWc6IHNhdmVkQ29uZmlnID8gdGhpcy5wYXJzZVNhdmVkQ29uZmlnKHNhdmVkQ29uZmlnKSA6IHVuZGVmaW5lZFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogR2V0IGRhdGEgdG8gc2F2ZVxuICAgKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgLSBhcHAgc3RhdGVcbiAgICogQHJldHVybnMge3t2ZXJzaW9uOiBTdHJpbmcsIGRhdGE6IE9iamVjdH19IC0gZGF0YXNldCB0byBzYXZlXG4gICAqL1xuICBnZXREYXRhc2V0VG9TYXZlKHN0YXRlKSB7XG4gICAgY29uc3QgZGF0YUNoYW5nZWRTaW5jZUxhc3RTYXZlID0gdGhpcy5oYXNEYXRhQ2hhbmdlZChzdGF0ZSk7XG4gICAgaWYgKCFkYXRhQ2hhbmdlZFNpbmNlTGFzdFNhdmUpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zYXZlZERhdGFzZXQ7XG4gICAgfVxuXG4gICAgY29uc3Qge3Zpc1N0YXRlfSA9IHN0YXRlO1xuXG4gICAgY29uc3QgZGF0YXNldHMgPSBPYmplY3QudmFsdWVzKHZpc1N0YXRlLmRhdGFzZXRzKS5tYXAoZHMgPT4gKHtcbiAgICAgIHZlcnNpb246IHRoaXMuX3ZlcnNpb24sXG4gICAgICBkYXRhOiB0aGlzLl9kYXRhc2V0U2NoZW1hW3RoaXMuX3ZlcnNpb25dLnNhdmUoZHMpXG4gICAgfSkpO1xuXG4gICAgLy8ga2VlcCBhIGNvcHkgb2YgZm9ybWF0dGVkIGRhdGFzZXRzIHRvIHNhdmVcbiAgICB0aGlzLl9kYXRhc2V0TGFzdFNhdmVkID0gdmlzU3RhdGUuZGF0YXNldHM7XG4gICAgdGhpcy5fc2F2ZWREYXRhc2V0ID0gZGF0YXNldHM7XG5cbiAgICByZXR1cm4gZGF0YXNldHM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IEFwcCBjb25maWcgdG8gc2F2ZVxuICAgKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgLSBhcHAgc3RhdGVcbiAgICogQHJldHVybnMge3t2ZXJzaW9uOiBTdHJpbmcsIGNvbmZpZzogT2JqZWN0fX0gLSBjb25maWcgdG8gc2F2ZVxuICAgKi9cbiAgZ2V0Q29uZmlnVG9TYXZlKHN0YXRlKSB7XG4gICAgY29uc3QgY29uZmlnID0gT2JqZWN0LmtleXModGhpcy5fcmVkdWNlclNjaGVtYXMpLnJlZHVjZShcbiAgICAgIChhY2N1LCBrZXkpID0+ICh7XG4gICAgICAgIC4uLmFjY3UsXG4gICAgICAgIC4uLnRoaXMuX3JlZHVjZXJTY2hlbWFzW2tleV1bdGhpcy5fdmVyc2lvbl0uc2F2ZShzdGF0ZVtrZXldKVxuICAgICAgfSksXG4gICAgICB7fVxuICAgICk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgdmVyc2lvbjogdGhpcy5fdmVyc2lvbixcbiAgICAgIGNvbmZpZ1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogUGFyc2Ugc2F2ZWQgZGF0YVxuICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhc2V0c1xuICAgKiBAcmV0dXJucyB7T2JqZWN0IHwgbnVsbH0gLSBkYXRhIHRvIHNhdmVcbiAgICovXG4gIHBhcnNlU2F2ZWREYXRhKGRhdGFzZXRzKSB7XG4gICAgcmV0dXJuIGRhdGFzZXRzLnJlZHVjZSgoYWNjdSwgZHMpID0+IHtcbiAgICAgIGNvbnN0IHZhbGlkVmVyc2lvbiA9IHRoaXMudmFsaWRhdGVWZXJzaW9uKGRzLnZlcnNpb24pO1xuICAgICAgaWYgKCF2YWxpZFZlcnNpb24pIHtcbiAgICAgICAgcmV0dXJuIGFjY3U7XG4gICAgICB9XG4gICAgICBhY2N1LnB1c2godGhpcy5fZGF0YXNldFNjaGVtYVt2YWxpZFZlcnNpb25dLmxvYWQoZHMuZGF0YSkpO1xuICAgICAgcmV0dXJuIGFjY3U7XG4gICAgfSwgW10pO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlIHNhdmVkIEFwcCBjb25maWdcbiAgICogQHBhcmFtIHtTdHJpbmd9IG9wdC52ZXJzaW9uIC0gY29uZmlnIHZlcnNpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdC5jb25maWcgLSBzYXZlZCBjb25maWdcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIC0gY3VycmVudCBBcHAgU3RhdGVcbiAgICogQHJldHVybnMge09iamVjdCB8IG51bGx9IC0gcGFyc2VkIGNvbmZpZ1xuICAgKi9cbiAgcGFyc2VTYXZlZENvbmZpZyh7dmVyc2lvbiwgY29uZmlnfSwgc3RhdGUgPSB7fSkge1xuICAgIGNvbnN0IHZhbGlkVmVyc2lvbiA9IHRoaXMudmFsaWRhdGVWZXJzaW9uKHZlcnNpb24pO1xuICAgIGlmICghdmFsaWRWZXJzaW9uKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmtleXMoY29uZmlnKS5yZWR1Y2UoXG4gICAgICAoYWNjdSwga2V5KSA9PiAoe1xuICAgICAgICAgIC4uLmFjY3UsXG4gICAgICAgICAgLi4uKGtleSBpbiB0aGlzLl9yZWR1Y2VyU2NoZW1hc1xuICAgICAgICAgICAgPyB0aGlzLl9yZWR1Y2VyU2NoZW1hc1trZXldW3ZhbGlkVmVyc2lvbl0ubG9hZChcbiAgICAgICAgICAgICAgICBjb25maWdba2V5XSxcbiAgICAgICAgICAgICAgICBzdGF0ZVtrZXldXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDoge30pXG4gICAgICAgIH0pLFxuICAgICAge31cbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlIHZlcnNpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHZlcnNpb25cbiAgICogQHJldHVybnMge1N0cmluZyB8IG51bGx9IHZhbGlkVmVyc2lvblxuICAgKi9cbiAgdmFsaWRhdGVWZXJzaW9uKHZlcnNpb24pIHtcbiAgICBpZiAoIXZlcnNpb24pIHtcbiAgICAgIENvbnNvbGUuZXJyb3IoXG4gICAgICAgICdUaGVyZSBpcyBubyB2ZXJzaW9uIG51bWJlciBhc3NvY2lhdGVkIHdpdGggdGhpcyBzYXZlZCBtYXAnXG4gICAgICApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl92YWxpZFZlcnNpb25zW3ZlcnNpb25dKSB7XG4gICAgICBDb25zb2xlLmVycm9yKGAke3ZlcnNpb259IGlzIG5vdCBhIHZhbGlkIHZlcnNpb25gKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB2ZXJzaW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGRhdGEgaGFzIGNoYW5nZWQgc2luY2UgbGFzdCBzYXZlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSB3aGV0aGVyIGRhdGEgaGFzIGNoYW5nZWQgb3Igbm90XG4gICAqL1xuICBoYXNEYXRhQ2hhbmdlZChzdGF0ZSkge1xuICAgIHJldHVybiB0aGlzLl9kYXRhc2V0TGFzdFNhdmVkICE9PSBzdGF0ZS52aXNTdGF0ZS5kYXRhc2V0cztcbiAgfVxufVxuXG5jb25zdCBLZXBsZXJHTFNjaGVtYU1hbmFnZXIgPSBuZXcgS2VwbGVyR0xTY2hlbWEoKTtcblxuZXhwb3J0IGRlZmF1bHQgS2VwbGVyR0xTY2hlbWFNYW5hZ2VyO1xuIl19