"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf4 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = _interopRequireDefault(require("lodash.pick"));

var _window = require("global/window");

var _versions = require("./versions");

var _schema = _interopRequireDefault(require("./schema"));

var _dataProcessor = require("../processors/data-processor");

var _defaultSettings = require("../constants/default-settings");

var _datasetSchema;

// version v0
var fieldPropertiesV0 = {
  name: null,
  type: null
};
var fieldPropertiesV1 = {
  name: null,
  type: null,
  format: null
};

var FieldSchema =
/*#__PURE__*/
function (_Schema) {
  (0, _inherits2.default)(FieldSchema, _Schema);

  function FieldSchema() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, FieldSchema);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf4.default)(FieldSchema)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "key", 'fields');
    return _this;
  }

  (0, _createClass2.default)(FieldSchema, [{
    key: "save",
    value: function save(fields) {
      var _this2 = this;

      return (0, _defineProperty2.default)({}, this.key, fields.map(function (f) {
        return _this2.savePropertiesOrApplySchema(f)[_this2.key];
      }));
    }
  }, {
    key: "load",
    value: function load(fields) {
      return (0, _defineProperty2.default)({}, this.key, fields);
    }
  }]);
  return FieldSchema;
}(_schema.default);

var propertiesV0 = {
  id: null,
  label: null,
  color: null,
  allData: null,
  fields: new FieldSchema({
    version: _versions.VERSIONS.v0,
    properties: fieldPropertiesV0
  })
};
var propertiesV1 = (0, _objectSpread2.default)({}, propertiesV0, {
  fields: new FieldSchema({
    version: _versions.VERSIONS.v1,
    properties: fieldPropertiesV1
  })
});

var DatasetSchema =
/*#__PURE__*/
function (_Schema2) {
  (0, _inherits2.default)(DatasetSchema, _Schema2);

  function DatasetSchema() {
    var _getPrototypeOf3;

    var _this3;

    (0, _classCallCheck2.default)(this, DatasetSchema);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this3 = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf3 = (0, _getPrototypeOf4.default)(DatasetSchema)).call.apply(_getPrototypeOf3, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this3)), "key", 'dataset');
    return _this3;
  }

  (0, _createClass2.default)(DatasetSchema, [{
    key: "save",
    value: function save(dataset) {
      return this.savePropertiesOrApplySchema(dataset)[this.key];
    }
  }, {
    key: "load",
    value: function load(dataset) {
      var fields = dataset.fields,
          allData = dataset.allData;
      var updatedFields = fields; // recalculate field type
      // because we have updated type-analyzer
      // we need to add format to each field

      var needCalculateMeta = fields[0] && !fields[0].hasOwnProperty('format');

      if (needCalculateMeta) {
        var fieldOrder = fields.map(function (f) {
          return f.name;
        });
        var sampleData = (0, _dataProcessor.getSampleForTypeAnalyze)({
          fields: fieldOrder,
          allData: allData
        });
        var meta = (0, _dataProcessor.getFieldsFromData)(sampleData, fieldOrder);
        updatedFields = fields.map(function (f, i) {
          return (0, _objectSpread2.default)({}, f, {
            // note here we add format to timestamp field
            format: f.type === _defaultSettings.ALL_FIELD_TYPES.timestamp ? meta[i].format : ''
          });
        });
        updatedFields.forEach(function (f, i) {
          if (meta[i].type !== f.type) {
            // if newly detected field type is different from saved type
            // we log it but won't update it, cause we don't want to break people's map
            _window.console.warn("detect ".concat(f.name, " type is now ").concat(meta[i].type, " instead of ").concat(f.type));
          }
        });
      } // get format of all fields


      return {
        data: {
          fields: updatedFields,
          rows: dataset.allData
        },
        info: (0, _lodash.default)(dataset, ['id', 'label', 'color'])
      };
    }
  }]);
  return DatasetSchema;
}(_schema.default);

var datasetSchema = (_datasetSchema = {}, (0, _defineProperty2.default)(_datasetSchema, _versions.VERSIONS.v0, new DatasetSchema({
  version: _versions.VERSIONS.v0,
  properties: propertiesV0
})), (0, _defineProperty2.default)(_datasetSchema, _versions.VERSIONS.v1, new DatasetSchema({
  version: _versions.VERSIONS.v1,
  properties: propertiesV1
})), _datasetSchema);
var _default = datasetSchema;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY2hlbWFzL2RhdGFzZXQtc2NoZW1hLmpzIl0sIm5hbWVzIjpbImZpZWxkUHJvcGVydGllc1YwIiwibmFtZSIsInR5cGUiLCJmaWVsZFByb3BlcnRpZXNWMSIsImZvcm1hdCIsIkZpZWxkU2NoZW1hIiwiZmllbGRzIiwia2V5IiwibWFwIiwiZiIsInNhdmVQcm9wZXJ0aWVzT3JBcHBseVNjaGVtYSIsIlNjaGVtYSIsInByb3BlcnRpZXNWMCIsImlkIiwibGFiZWwiLCJjb2xvciIsImFsbERhdGEiLCJ2ZXJzaW9uIiwiVkVSU0lPTlMiLCJ2MCIsInByb3BlcnRpZXMiLCJwcm9wZXJ0aWVzVjEiLCJ2MSIsIkRhdGFzZXRTY2hlbWEiLCJkYXRhc2V0IiwidXBkYXRlZEZpZWxkcyIsIm5lZWRDYWxjdWxhdGVNZXRhIiwiaGFzT3duUHJvcGVydHkiLCJmaWVsZE9yZGVyIiwic2FtcGxlRGF0YSIsIm1ldGEiLCJpIiwiQUxMX0ZJRUxEX1RZUEVTIiwidGltZXN0YW1wIiwiZm9yRWFjaCIsImdsb2JhbENvbnNvbGUiLCJ3YXJuIiwiZGF0YSIsInJvd3MiLCJpbmZvIiwiZGF0YXNldFNjaGVtYSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBO0FBQ0EsSUFBTUEsaUJBQWlCLEdBQUc7QUFDeEJDLEVBQUFBLElBQUksRUFBRSxJQURrQjtBQUV4QkMsRUFBQUEsSUFBSSxFQUFFO0FBRmtCLENBQTFCO0FBS0EsSUFBTUMsaUJBQWlCLEdBQUc7QUFDeEJGLEVBQUFBLElBQUksRUFBRSxJQURrQjtBQUV4QkMsRUFBQUEsSUFBSSxFQUFFLElBRmtCO0FBR3hCRSxFQUFBQSxNQUFNLEVBQUU7QUFIZ0IsQ0FBMUI7O0lBTU1DLFc7Ozs7Ozs7Ozs7Ozs7Ozs7OzRIQUNFLFE7Ozs7Ozt5QkFDREMsTSxFQUFRO0FBQUE7O0FBQ1gsK0NBQ0csS0FBS0MsR0FEUixF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O0FBQUMvQixVQUFBQSxNQUFNLEVBQUVtQixhQUFUO0FBQXdCYSxVQUFBQSxJQUFJLEVBQUVkLE9BQU8sQ0FBQ1I7QUFBdEMsU0FERDtBQUVMdUIsUUFBQUEsSUFBSSxFQUFFLHFCQUFLZixPQUFMLEVBQWMsQ0FBQyxJQUFELEVBQU8sT0FBUCxFQUFnQixPQUFoQixDQUFkO0FBRkQsT0FBUDtBQUlEOzs7RUEzQ3lCYixlOztBQThDNUIsSUFBTTZCLGFBQWEsdUVBQ2hCdEIsbUJBQVNDLEVBRE8sRUFDRixJQUFJSSxhQUFKLENBQWtCO0FBQy9CTixFQUFBQSxPQUFPLEVBQUVDLG1CQUFTQyxFQURhO0FBRS9CQyxFQUFBQSxVQUFVLEVBQUVSO0FBRm1CLENBQWxCLENBREUsaURBS2hCTSxtQkFBU0ksRUFMTyxFQUtGLElBQUlDLGFBQUosQ0FBa0I7QUFDL0JOLEVBQUFBLE9BQU8sRUFBRUMsbUJBQVNJLEVBRGE7QUFFL0JGLEVBQUFBLFVBQVUsRUFBRUM7QUFGbUIsQ0FBbEIsQ0FMRSxrQkFBbkI7ZUFXZW1CLGEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgcGljayBmcm9tICdsb2Rhc2gucGljayc7XG5pbXBvcnQge2NvbnNvbGUgYXMgZ2xvYmFsQ29uc29sZX0gZnJvbSAnZ2xvYmFsL3dpbmRvdyc7XG5cbmltcG9ydCB7VkVSU0lPTlN9IGZyb20gJy4vdmVyc2lvbnMnO1xuaW1wb3J0IFNjaGVtYSBmcm9tICcuL3NjaGVtYSc7XG5pbXBvcnQge2dldEZpZWxkc0Zyb21EYXRhLCBnZXRTYW1wbGVGb3JUeXBlQW5hbHl6ZX0gZnJvbSAncHJvY2Vzc29ycy9kYXRhLXByb2Nlc3Nvcic7XG5pbXBvcnQge0FMTF9GSUVMRF9UWVBFU30gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuXG4vLyB2ZXJzaW9uIHYwXG5jb25zdCBmaWVsZFByb3BlcnRpZXNWMCA9IHtcbiAgbmFtZTogbnVsbCxcbiAgdHlwZTogbnVsbFxufTtcblxuY29uc3QgZmllbGRQcm9wZXJ0aWVzVjEgPSB7XG4gIG5hbWU6IG51bGwsXG4gIHR5cGU6IG51bGwsXG4gIGZvcm1hdDogbnVsbFxufTtcblxuY2xhc3MgRmllbGRTY2hlbWEgZXh0ZW5kcyBTY2hlbWEge1xuICBrZXkgPSAnZmllbGRzJztcbiAgc2F2ZShmaWVsZHMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgW3RoaXMua2V5XTogZmllbGRzLm1hcChmID0+IHRoaXMuc2F2ZVByb3BlcnRpZXNPckFwcGx5U2NoZW1hKGYpW3RoaXMua2V5XSlcbiAgICB9O1xuICB9XG4gIGxvYWQoZmllbGRzKSB7XG4gICAgcmV0dXJuIHtbdGhpcy5rZXldOiBmaWVsZHN9O1xuICB9XG59XG5cbmNvbnN0IHByb3BlcnRpZXNWMCA9IHtcbiAgaWQ6IG51bGwsXG4gIGxhYmVsOiBudWxsLFxuICBjb2xvcjogbnVsbCxcbiAgYWxsRGF0YTogbnVsbCxcbiAgZmllbGRzOiBuZXcgRmllbGRTY2hlbWEoe1xuICAgIHZlcnNpb246IFZFUlNJT05TLnYwLFxuICAgIHByb3BlcnRpZXM6IGZpZWxkUHJvcGVydGllc1YwXG4gIH0pXG59O1xuXG5jb25zdCBwcm9wZXJ0aWVzVjEgPSB7XG4gIC4uLnByb3BlcnRpZXNWMCxcbiAgZmllbGRzOiBuZXcgRmllbGRTY2hlbWEoe1xuICAgIHZlcnNpb246IFZFUlNJT05TLnYxLFxuICAgIHByb3BlcnRpZXM6IGZpZWxkUHJvcGVydGllc1YxXG4gIH0pXG59O1xuXG5jbGFzcyBEYXRhc2V0U2NoZW1hIGV4dGVuZHMgU2NoZW1hIHtcbiAga2V5ID0gJ2RhdGFzZXQnO1xuXG4gIHNhdmUoZGF0YXNldCkge1xuICAgIHJldHVybiB0aGlzLnNhdmVQcm9wZXJ0aWVzT3JBcHBseVNjaGVtYShkYXRhc2V0KVt0aGlzLmtleV07XG4gIH1cbiAgbG9hZChkYXRhc2V0KSB7XG4gICAgY29uc3Qge2ZpZWxkcywgYWxsRGF0YX0gPSBkYXRhc2V0O1xuICAgIGxldCB1cGRhdGVkRmllbGRzID0gZmllbGRzO1xuXG4gICAgLy8gcmVjYWxjdWxhdGUgZmllbGQgdHlwZVxuICAgIC8vIGJlY2F1c2Ugd2UgaGF2ZSB1cGRhdGVkIHR5cGUtYW5hbHl6ZXJcbiAgICAvLyB3ZSBuZWVkIHRvIGFkZCBmb3JtYXQgdG8gZWFjaCBmaWVsZFxuICAgIGNvbnN0IG5lZWRDYWxjdWxhdGVNZXRhID0gZmllbGRzWzBdICYmICFmaWVsZHNbMF0uaGFzT3duUHJvcGVydHkoJ2Zvcm1hdCcpO1xuXG4gICAgaWYgKG5lZWRDYWxjdWxhdGVNZXRhKSB7XG4gICAgICBjb25zdCBmaWVsZE9yZGVyID0gZmllbGRzLm1hcChmID0+IGYubmFtZSk7XG5cbiAgICAgIGNvbnN0IHNhbXBsZURhdGEgPSBnZXRTYW1wbGVGb3JUeXBlQW5hbHl6ZSh7ZmllbGRzOiBmaWVsZE9yZGVyLCBhbGxEYXRhfSk7XG4gICAgICBjb25zdCBtZXRhID0gZ2V0RmllbGRzRnJvbURhdGEoc2FtcGxlRGF0YSwgZmllbGRPcmRlcik7XG5cbiAgICAgIHVwZGF0ZWRGaWVsZHMgPSBmaWVsZHMubWFwKChmLCBpKSA9PiAoe1xuICAgICAgICAuLi5mLFxuICAgICAgICAvLyBub3RlIGhlcmUgd2UgYWRkIGZvcm1hdCB0byB0aW1lc3RhbXAgZmllbGRcbiAgICAgICAgZm9ybWF0OiBmLnR5cGUgPT09IEFMTF9GSUVMRF9UWVBFUy50aW1lc3RhbXAgPyBtZXRhW2ldLmZvcm1hdCA6ICcnXG4gICAgICB9KSk7XG5cbiAgICAgIHVwZGF0ZWRGaWVsZHMuZm9yRWFjaCgoZiwgaSkgPT4ge1xuICAgICAgICBpZiAobWV0YVtpXS50eXBlICE9PSBmLnR5cGUpIHtcbiAgICAgICAgICAvLyBpZiBuZXdseSBkZXRlY3RlZCBmaWVsZCB0eXBlIGlzIGRpZmZlcmVudCBmcm9tIHNhdmVkIHR5cGVcbiAgICAgICAgICAvLyB3ZSBsb2cgaXQgYnV0IHdvbid0IHVwZGF0ZSBpdCwgY2F1c2Ugd2UgZG9uJ3Qgd2FudCB0byBicmVhayBwZW9wbGUncyBtYXBcbiAgICAgICAgICBnbG9iYWxDb25zb2xlLndhcm4oXG4gICAgICAgICAgICBgZGV0ZWN0ICR7Zi5uYW1lfSB0eXBlIGlzIG5vdyAke21ldGFbaV0udHlwZX0gaW5zdGVhZCBvZiAke2YudHlwZX1gXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gZ2V0IGZvcm1hdCBvZiBhbGwgZmllbGRzXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGE6IHtmaWVsZHM6IHVwZGF0ZWRGaWVsZHMsIHJvd3M6IGRhdGFzZXQuYWxsRGF0YX0sXG4gICAgICBpbmZvOiBwaWNrKGRhdGFzZXQsIFsnaWQnLCAnbGFiZWwnLCAnY29sb3InXSlcbiAgICB9O1xuICB9XG59XG5cbmNvbnN0IGRhdGFzZXRTY2hlbWEgPSB7XG4gIFtWRVJTSU9OUy52MF06IG5ldyBEYXRhc2V0U2NoZW1hKHtcbiAgICB2ZXJzaW9uOiBWRVJTSU9OUy52MCxcbiAgICBwcm9wZXJ0aWVzOiBwcm9wZXJ0aWVzVjBcbiAgfSksXG4gIFtWRVJTSU9OUy52MV06IG5ldyBEYXRhc2V0U2NoZW1hKHtcbiAgICB2ZXJzaW9uOiBWRVJTSU9OUy52MSxcbiAgICBwcm9wZXJ0aWVzOiBwcm9wZXJ0aWVzVjFcbiAgfSlcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRhdGFzZXRTY2hlbWE7XG4iXX0=