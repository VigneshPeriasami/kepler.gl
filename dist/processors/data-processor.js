"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processCsvData = processCsvData;
exports.getSampleForTypeAnalyze = getSampleForTypeAnalyze;
exports.parseCsvDataByFieldType = parseCsvDataByFieldType;
exports.getFieldsFromData = getFieldsFromData;
exports.renameDuplicateFields = renameDuplicateFields;
exports.analyzerTypeToFieldType = analyzerTypeToFieldType;
exports.processRowObject = processRowObject;
exports.processGeojson = processGeojson;
exports.formatCsv = formatCsv;
exports.validateInputData = validateInputData;
exports.processKeplerglJSON = processKeplerglJSON;
exports.default = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

var _d3Dsv = require("d3-dsv");

var _d3Array = require("d3-array");

var _window = require("global/window");

var _assert = _interopRequireDefault(require("assert"));

var _typeAnalyzer = require("type-analyzer");

var _geojsonNormalize = _interopRequireDefault(require("@mapbox/geojson-normalize"));

var _defaultSettings = require("../constants/default-settings");

var _dataUtils = require("../utils/data-utils");

var _schemas = _interopRequireDefault(require("../schemas"));

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
// if any of these value occurs in csv, parse it to null;
var CSV_NULLS = ['', 'null', 'NULL', 'Null', 'NaN'];

function processCsvData(rawData) {
  // here we assume the csv file that people uploaded will have first row
  // as name of the column
  // TODO: add a alert at upload csv to remind define first row
  var _csvParseRows = (0, _d3Dsv.csvParseRows)(rawData),
      _csvParseRows2 = (0, _toArray2.default)(_csvParseRows),
      headerRow = _csvParseRows2[0],
      rows = _csvParseRows2.slice(1);

  if (!rows.length || !headerRow) {
    // looks like an empty file
    // resolve null, and catch them later in one place
    return null;
  }

  cleanUpFalsyCsvValue(rows); // No need to run type detection on every data point
  // here we get a list of none null values to run analyze on

  var sample = getSampleForTypeAnalyze({
    fields: headerRow,
    allData: rows
  });
  var fields = getFieldsFromData(sample, headerRow);
  fields.forEach(parseCsvDataByFieldType.bind(null, rows));
  return {
    fields: fields,
    rows: rows
  };
}
/**
 * get fields from csv data
 *
 * @param {array} fields - an array of fields name
 * @param {array} allData
 * @param {array} sampleCount
 * @returns {array} formatted fields
 */


function getSampleForTypeAnalyze(_ref) {
  var fields = _ref.fields,
      allData = _ref.allData,
      _ref$sampleCount = _ref.sampleCount,
      sampleCount = _ref$sampleCount === void 0 ? 50 : _ref$sampleCount;
  var total = Math.min(sampleCount, allData.length); // const fieldOrder = fields.map(f => f.name);

  var sample = (0, _d3Array.range)(0, total, 1).map(function (d) {
    return {};
  }); // collect sample data for each field

  fields.forEach(function (field, fieldIdx) {
    // data counter
    var i = 0; // sample counter

    var j = 0;

    while (j < total) {
      if (i >= allData.length) {
        // if depleted data pool
        sample[j][field] = null;
        j++;
      } else if ((0, _dataUtils.notNullorUndefined)(allData[i][fieldIdx])) {
        sample[j][field] = allData[i][fieldIdx];
        j++;
        i++;
      } else {
        i++;
      }
    }
  });
  return sample;
}

function cleanUpFalsyCsvValue(rows) {
  for (var i = 0; i < rows.length; i++) {
    for (var j = 0; j < rows[i].length; j++) {
      // analyzer will set any fields to 'string' if there are empty values
      // which will be parsed as '' by d3.csv
      // here we parse empty data as null
      // TODO: create warning when deltect `CSV_NULLS` in the data
      if (!rows[i][j] || CSV_NULLS.includes(rows[i][j])) {
        rows[i][j] = null;
      }
    }
  }
}
/**
 * Process uploaded csv file to parse value by field type
 *
 * @param {array} rows
 * @param {object} field
 * @param {number} i
 * @returns {void}
 */


function parseCsvDataByFieldType(rows, field, i) {
  var unixFormat = ['x', 'X'];
  rows.forEach(function (row) {
    if (row[i] !== null) {
      switch (field.type) {
        case _defaultSettings.ALL_FIELD_TYPES.real:
          row[i] = parseFloat(row[i]);
          break;
        // TODO: timestamp can be either '1495827326' or '2016-03-10 11:20'
        // if it's '1495827326' we pass it to int

        case _defaultSettings.ALL_FIELD_TYPES.timestamp:
          row[i] = unixFormat.includes(field.format) ? Number(row[i]) : row[i];
          break;

        case _defaultSettings.ALL_FIELD_TYPES.integer:
          row[i] = parseInt(row[i], 10);
          break;

        case _defaultSettings.ALL_FIELD_TYPES.boolean:
          // 0 and 1 only field can also be boolean
          row[i] = row[i] === 'true' || row[i] === 'True' || row[i] === '1';
          break;

        default:
          break;
      }
    }
  });
}
/**
 * get fields from csv data
 *
 * @param {array} data
 * @param {array} fieldOrder
 * @returns {array} formatted fields
 */


function getFieldsFromData(data, fieldOrder) {
  // add a check for epoch timestamp
  var metadata = _typeAnalyzer.Analyzer.computeColMeta(data, [{
    regex: /.*geojson|all_points/g,
    dataType: 'GEOMETRY'
  }]);

  var _renameDuplicateField = renameDuplicateFields(fieldOrder),
      fieldByIndex = _renameDuplicateField.fieldByIndex;

  return fieldOrder.reduce(function (orderedArray, field, index) {
    var name = fieldByIndex[index];
    var fieldMeta = metadata.find(function (m) {
      return m.key === field;
    });

    var _ref2 = fieldMeta || {},
        type = _ref2.type,
        format = _ref2.format;

    orderedArray[index] = {
      name: name,
      format: format,
      // need this for mapbuilder conversion: filter type detection
      // category,
      tableFieldIndex: index + 1,
      type: analyzerTypeToFieldType(type)
    };
    return orderedArray;
  }, []);
}
/**
 * pass in an array of field names, rename duplicated one
 * and return a map from old field index to new name
 *
 * @param {array} fieldOrder
 * @returns {Object} new field name by index
 */


function renameDuplicateFields(fieldOrder) {
  return fieldOrder.reduce(function (accu, field, i) {
    var allNames = accu.allNames;
    var fieldName = field; // add a counter to duplicated names

    if (allNames.includes(field)) {
      var counter = 0;

      while (allNames.includes("".concat(field, "-").concat(counter))) {
        counter++;
      }

      fieldName = "".concat(field, "-").concat(counter);
    }

    accu.fieldByIndex[i] = fieldName;
    accu.allNames.push(fieldName);
    return accu;
  }, {
    allNames: [],
    fieldByIndex: {}
  });
}
/**
 * Map Analyzer types to local field types
 *
 * @param {string} aType
 * @returns {string} corresponding type in ALL_FIELD_TYPES
 */

/* eslint-disable complexity */


function analyzerTypeToFieldType(aType) {
  var DATE = _typeAnalyzer.DATA_TYPES.DATE,
      TIME = _typeAnalyzer.DATA_TYPES.TIME,
      DATETIME = _typeAnalyzer.DATA_TYPES.DATETIME,
      NUMBER = _typeAnalyzer.DATA_TYPES.NUMBER,
      INT = _typeAnalyzer.DATA_TYPES.INT,
      FLOAT = _typeAnalyzer.DATA_TYPES.FLOAT,
      BOOLEAN = _typeAnalyzer.DATA_TYPES.BOOLEAN,
      STRING = _typeAnalyzer.DATA_TYPES.STRING,
      CITY = _typeAnalyzer.DATA_TYPES.CITY,
      GEOMETRY = _typeAnalyzer.DATA_TYPES.GEOMETRY,
      GEOMETRY_FROM_STRING = _typeAnalyzer.DATA_TYPES.GEOMETRY_FROM_STRING,
      ZIPCODE = _typeAnalyzer.DATA_TYPES.ZIPCODE,
      PAIR_GEOMETRY_FROM_STRING = _typeAnalyzer.DATA_TYPES.PAIR_GEOMETRY_FROM_STRING; // TODO: un recognized types
  // CURRENCY PERCENT NONE

  switch (aType) {
    case DATE:
      return _defaultSettings.ALL_FIELD_TYPES.date;

    case TIME:
    case DATETIME:
      return _defaultSettings.ALL_FIELD_TYPES.timestamp;

    case NUMBER:
    case FLOAT:
      return _defaultSettings.ALL_FIELD_TYPES.real;

    case INT:
      return _defaultSettings.ALL_FIELD_TYPES.integer;

    case BOOLEAN:
      return _defaultSettings.ALL_FIELD_TYPES.boolean;

    case GEOMETRY:
    case GEOMETRY_FROM_STRING:
    case PAIR_GEOMETRY_FROM_STRING:
      return _defaultSettings.ALL_FIELD_TYPES.geojson;

    case STRING:
    case CITY:
    case ZIPCODE:
      return _defaultSettings.ALL_FIELD_TYPES.string;

    default:
      _window.console.warn("Unsupported analyzer type: ".concat(aType));

      return _defaultSettings.ALL_FIELD_TYPES.string;
  }
}
/* eslint-enable complexity */

/*
 * Process rawData where each row is an object
 */


function processRowObject(rawData) {
  if (!rawData.length) {
    return null;
  }

  var keys = Object.keys(rawData[0]);
  var rows = rawData.map(function (d) {
    return keys.map(function (key) {
      return d[key];
    });
  });
  var fields = getFieldsFromData(rawData, keys);
  return {
    fields: fields,
    rows: rows
  };
}
/**
 *
 * @param {Object} rawData - raw geojson feature collection
 */


function processGeojson(rawData) {
  var normalizedGeojson = (0, _geojsonNormalize.default)(rawData);

  if (!normalizedGeojson || !Array.isArray(normalizedGeojson.features)) {
    // fail to normalize geojson
    return null;
  } // getting all feature fields


  var allData = normalizedGeojson.features.reduce(function (accu, f, i) {
    if (f.geometry) {
      accu.push((0, _objectSpread2.default)({
        // add feature to _geojson field
        _geojson: f
      }, f.properties || {}));
    }

    return accu;
  }, []); // get all the field

  var fields = allData.reduce(function (prev, curr) {
    Object.keys(curr).forEach(function (key) {
      if (!prev.includes(key)) {
        prev.push(key);
      }
    });
    return prev;
  }, []); // make sure each feature has exact same fields

  allData.forEach(function (d) {
    fields.forEach(function (f) {
      if (!(f in d)) {
        d[f] = null;
      }
    });
  });
  return processRowObject(allData);
}
/**
 * On export data to csv
 * @param data
 * @param fields
 */


function formatCsv(data, fields) {
  var columns = fields.map(function (f) {
    return f.name;
  });
  var formattedData = [columns]; // parse geojson object as string

  data.forEach(function (row) {
    formattedData.push(row.map(function (d, i) {
      return d && _defaultSettings.GEOJSON_FIELDS.geojson.includes(fields[i].name) ? JSON.stringify(d) : d;
    }));
  });
  return (0, _d3Dsv.csvFormatRows)(formattedData);
}
/**
 * @param data
 * @returns {{allData: Array, fields: Array}}
 */


function validateInputData(data) {
  // TODO: add test

  /*
   * expected input data format
   * {
   *   fields: [],
   *   rows: []
   * }
   */
  var proceed = true;

  if (!data) {
    (0, _assert.default)('receiveVisData: data cannot be null');
    proceed = false;
  } else if (!Array.isArray(data.fields)) {
    (0, _assert.default)('receiveVisData: expect data.fields to be an array');
    proceed = false;
  } else if (!Array.isArray(data.rows)) {
    (0, _assert.default)('receiveVisData: expect data.rows to be an array');
    proceed = false;
  }

  if (!proceed) {
    return null;
  }

  var fields = data.fields,
      rows = data.rows; // check if all fields has name, format and type

  var allValid = fields.every(function (f, i) {
    if ((0, _typeof2.default)(f) !== 'object') {
      (0, _assert.default)("fields needs to be an array of object, but find ".concat(f));
      return false;
    }

    if (!f.name) {
      (0, _assert.default)("field.name is required but missing in field ".concat(JSON.stringify(f))); // assign a name

      f.name = "column_".concat(i);
    }

    if (!_defaultSettings.ALL_FIELD_TYPES[f.type]) {
      (0, _assert.default)("unknown field type ".concat(f.type));
      return false;
    }

    return f.type !== _defaultSettings.ALL_FIELD_TYPES.timestamp || typeof f.format === 'string';
  });

  if (allValid) {
    return {
      rows: rows,
      fields: fields
    };
  } // if any field has missing type, recalculate it for everyone
  // because we simply lost faith in humanity


  var sampleData = getSampleForTypeAnalyze({
    fields: fields.map(function (f) {
      return f.name;
    }),
    allData: rows
  });
  var fieldOrder = fields.map(function (f) {
    return f.name;
  });
  var meta = getFieldsFromData(sampleData, fieldOrder);
  var updatedFields = fields.map(function (f, i) {
    return (0, _objectSpread2.default)({}, f, {
      type: meta[i].type,
      format: meta[i].format
    });
  });
  return {
    fields: updatedFields,
    rows: rows
  };
}
/**
 * Process kepler.gl json to be load by addDataToMap
 * @param {Object} rawData
 */


function processKeplerglJSON(rawData) {
  return rawData ? _schemas.default.load(rawData.datasets, rawData.config) : null;
}

var _default = {
  processGeojson: processGeojson,
  processCsvData: processCsvData,
  processRowObject: processRowObject,
  processKeplerglJSON: processKeplerglJSON,
  analyzerTypeToFieldType: analyzerTypeToFieldType,
  getFieldsFromData: getFieldsFromData,
  parseCsvDataByFieldType: parseCsvDataByFieldType
};
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcm9jZXNzb3JzL2RhdGEtcHJvY2Vzc29yLmpzIl0sIm5hbWVzIjpbIkNTVl9OVUxMUyIsInByb2Nlc3NDc3ZEYXRhIiwicmF3RGF0YSIsImhlYWRlclJvdyIsInJvd3MiLCJsZW5ndGgiLCJjbGVhblVwRmFsc3lDc3ZWYWx1ZSIsInNhbXBsZSIsImdldFNhbXBsZUZvclR5cGVBbmFseXplIiwiZmllbGRzIiwiYWxsRGF0YSIsImdldEZpZWxkc0Zyb21EYXRhIiwiZm9yRWFjaCIsInBhcnNlQ3N2RGF0YUJ5RmllbGRUeXBlIiwiYmluZCIsInNhbXBsZUNvdW50IiwidG90YWwiLCJNYXRoIiwibWluIiwibWFwIiwiZCIsImZpZWxkIiwiZmllbGRJZHgiLCJpIiwiaiIsImluY2x1ZGVzIiwidW5peEZvcm1hdCIsInJvdyIsInR5cGUiLCJBTExfRklFTERfVFlQRVMiLCJyZWFsIiwicGFyc2VGbG9hdCIsInRpbWVzdGFtcCIsImZvcm1hdCIsIk51bWJlciIsImludGVnZXIiLCJwYXJzZUludCIsImJvb2xlYW4iLCJkYXRhIiwiZmllbGRPcmRlciIsIm1ldGFkYXRhIiwiQW5hbHl6ZXIiLCJjb21wdXRlQ29sTWV0YSIsInJlZ2V4IiwiZGF0YVR5cGUiLCJyZW5hbWVEdXBsaWNhdGVGaWVsZHMiLCJmaWVsZEJ5SW5kZXgiLCJyZWR1Y2UiLCJvcmRlcmVkQXJyYXkiLCJpbmRleCIsIm5hbWUiLCJmaWVsZE1ldGEiLCJmaW5kIiwibSIsImtleSIsInRhYmxlRmllbGRJbmRleCIsImFuYWx5emVyVHlwZVRvRmllbGRUeXBlIiwiYWNjdSIsImFsbE5hbWVzIiwiZmllbGROYW1lIiwiY291bnRlciIsInB1c2giLCJhVHlwZSIsIkRBVEUiLCJBbmFseXplckRBVEFfVFlQRVMiLCJUSU1FIiwiREFURVRJTUUiLCJOVU1CRVIiLCJJTlQiLCJGTE9BVCIsIkJPT0xFQU4iLCJTVFJJTkciLCJDSVRZIiwiR0VPTUVUUlkiLCJHRU9NRVRSWV9GUk9NX1NUUklORyIsIlpJUENPREUiLCJQQUlSX0dFT01FVFJZX0ZST01fU1RSSU5HIiwiZGF0ZSIsImdlb2pzb24iLCJzdHJpbmciLCJnbG9iYWxDb25zb2xlIiwid2FybiIsInByb2Nlc3NSb3dPYmplY3QiLCJrZXlzIiwiT2JqZWN0IiwicHJvY2Vzc0dlb2pzb24iLCJub3JtYWxpemVkR2VvanNvbiIsIkFycmF5IiwiaXNBcnJheSIsImZlYXR1cmVzIiwiZiIsImdlb21ldHJ5IiwiX2dlb2pzb24iLCJwcm9wZXJ0aWVzIiwicHJldiIsImN1cnIiLCJmb3JtYXRDc3YiLCJjb2x1bW5zIiwiZm9ybWF0dGVkRGF0YSIsIkdFT0pTT05fRklFTERTIiwiSlNPTiIsInN0cmluZ2lmeSIsInZhbGlkYXRlSW5wdXREYXRhIiwicHJvY2VlZCIsImFsbFZhbGlkIiwiZXZlcnkiLCJzYW1wbGVEYXRhIiwibWV0YSIsInVwZGF0ZWRGaWVsZHMiLCJwcm9jZXNzS2VwbGVyZ2xKU09OIiwiS2VwbGVyR2xTY2hlbWEiLCJsb2FkIiwiZGF0YXNldHMiLCJjb25maWciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQTVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVlBO0FBQ0EsSUFBTUEsU0FBUyxHQUFHLENBQUMsRUFBRCxFQUFLLE1BQUwsRUFBYSxNQUFiLEVBQXFCLE1BQXJCLEVBQTZCLEtBQTdCLENBQWxCOztBQUVPLFNBQVNDLGNBQVQsQ0FBd0JDLE9BQXhCLEVBQWlDO0FBRXRDO0FBQ0E7QUFDQTtBQUpzQyxzQkFLVCx5QkFBYUEsT0FBYixDQUxTO0FBQUE7QUFBQSxNQUsvQkMsU0FMK0I7QUFBQSxNQUtqQkMsSUFMaUI7O0FBT3RDLE1BQUksQ0FBQ0EsSUFBSSxDQUFDQyxNQUFOLElBQWdCLENBQUNGLFNBQXJCLEVBQWdDO0FBQzlCO0FBQ0E7QUFDQSxXQUFPLElBQVA7QUFDRDs7QUFFREcsRUFBQUEsb0JBQW9CLENBQUNGLElBQUQsQ0FBcEIsQ0Fic0MsQ0FjdEM7QUFDQTs7QUFDQSxNQUFNRyxNQUFNLEdBQUdDLHVCQUF1QixDQUFDO0FBQUNDLElBQUFBLE1BQU0sRUFBRU4sU0FBVDtBQUFvQk8sSUFBQUEsT0FBTyxFQUFFTjtBQUE3QixHQUFELENBQXRDO0FBRUEsTUFBTUssTUFBTSxHQUFHRSxpQkFBaUIsQ0FBQ0osTUFBRCxFQUFTSixTQUFULENBQWhDO0FBRUFNLEVBQUFBLE1BQU0sQ0FBQ0csT0FBUCxDQUFlQyx1QkFBdUIsQ0FBQ0MsSUFBeEIsQ0FBNkIsSUFBN0IsRUFBbUNWLElBQW5DLENBQWY7QUFFQSxTQUFPO0FBQUNLLElBQUFBLE1BQU0sRUFBTkEsTUFBRDtBQUFTTCxJQUFBQSxJQUFJLEVBQUpBO0FBQVQsR0FBUDtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7QUFRTyxTQUFTSSx1QkFBVCxPQUFzRTtBQUFBLE1BQXBDQyxNQUFvQyxRQUFwQ0EsTUFBb0M7QUFBQSxNQUE1QkMsT0FBNEIsUUFBNUJBLE9BQTRCO0FBQUEsOEJBQW5CSyxXQUFtQjtBQUFBLE1BQW5CQSxXQUFtQixpQ0FBTCxFQUFLO0FBQzNFLE1BQU1DLEtBQUssR0FBR0MsSUFBSSxDQUFDQyxHQUFMLENBQVNILFdBQVQsRUFBc0JMLE9BQU8sQ0FBQ0wsTUFBOUIsQ0FBZCxDQUQyRSxDQUUzRTs7QUFDQSxNQUFNRSxNQUFNLEdBQUcsb0JBQU0sQ0FBTixFQUFTUyxLQUFULEVBQWdCLENBQWhCLEVBQW1CRyxHQUFuQixDQUF1QixVQUFBQyxDQUFDO0FBQUEsV0FBSyxFQUFMO0FBQUEsR0FBeEIsQ0FBZixDQUgyRSxDQUszRTs7QUFDQVgsRUFBQUEsTUFBTSxDQUFDRyxPQUFQLENBQWUsVUFBQ1MsS0FBRCxFQUFRQyxRQUFSLEVBQXFCO0FBQ2xDO0FBQ0EsUUFBSUMsQ0FBQyxHQUFHLENBQVIsQ0FGa0MsQ0FHbEM7O0FBQ0EsUUFBSUMsQ0FBQyxHQUFHLENBQVI7O0FBRUEsV0FBT0EsQ0FBQyxHQUFHUixLQUFYLEVBQWtCO0FBQ2hCLFVBQUlPLENBQUMsSUFBSWIsT0FBTyxDQUFDTCxNQUFqQixFQUF5QjtBQUN2QjtBQUNBRSxRQUFBQSxNQUFNLENBQUNpQixDQUFELENBQU4sQ0FBVUgsS0FBVixJQUFtQixJQUFuQjtBQUNBRyxRQUFBQSxDQUFDO0FBQ0YsT0FKRCxNQUlPLElBQUksbUNBQW1CZCxPQUFPLENBQUNhLENBQUQsQ0FBUCxDQUFXRCxRQUFYLENBQW5CLENBQUosRUFBOEM7QUFDbkRmLFFBQUFBLE1BQU0sQ0FBQ2lCLENBQUQsQ0FBTixDQUFVSCxLQUFWLElBQW1CWCxPQUFPLENBQUNhLENBQUQsQ0FBUCxDQUFXRCxRQUFYLENBQW5CO0FBQ0FFLFFBQUFBLENBQUM7QUFDREQsUUFBQUEsQ0FBQztBQUNGLE9BSk0sTUFJQTtBQUNMQSxRQUFBQSxDQUFDO0FBQ0Y7QUFDRjtBQUNGLEdBbkJEO0FBcUJBLFNBQU9oQixNQUFQO0FBQ0Q7O0FBRUQsU0FBU0Qsb0JBQVQsQ0FBOEJGLElBQTlCLEVBQW9DO0FBQ2xDLE9BQUssSUFBSW1CLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUduQixJQUFJLENBQUNDLE1BQXpCLEVBQWlDa0IsQ0FBQyxFQUFsQyxFQUFzQztBQUNwQyxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdwQixJQUFJLENBQUNtQixDQUFELENBQUosQ0FBUWxCLE1BQTVCLEVBQW9DbUIsQ0FBQyxFQUFyQyxFQUF5QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQUksQ0FBQ3BCLElBQUksQ0FBQ21CLENBQUQsQ0FBSixDQUFRQyxDQUFSLENBQUQsSUFBZXhCLFNBQVMsQ0FBQ3lCLFFBQVYsQ0FBbUJyQixJQUFJLENBQUNtQixDQUFELENBQUosQ0FBUUMsQ0FBUixDQUFuQixDQUFuQixFQUFtRDtBQUNqRHBCLFFBQUFBLElBQUksQ0FBQ21CLENBQUQsQ0FBSixDQUFRQyxDQUFSLElBQWEsSUFBYjtBQUNEO0FBQ0Y7QUFDRjtBQUNGO0FBQ0Q7Ozs7Ozs7Ozs7QUFRTyxTQUFTWCx1QkFBVCxDQUFpQ1QsSUFBakMsRUFBdUNpQixLQUF2QyxFQUE4Q0UsQ0FBOUMsRUFBaUQ7QUFDdEQsTUFBTUcsVUFBVSxHQUFHLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBbkI7QUFFQXRCLEVBQUFBLElBQUksQ0FBQ1EsT0FBTCxDQUFhLFVBQUFlLEdBQUcsRUFBSTtBQUNsQixRQUFJQSxHQUFHLENBQUNKLENBQUQsQ0FBSCxLQUFXLElBQWYsRUFBcUI7QUFDbkIsY0FBUUYsS0FBSyxDQUFDTyxJQUFkO0FBQ0UsYUFBS0MsaUNBQWdCQyxJQUFyQjtBQUNFSCxVQUFBQSxHQUFHLENBQUNKLENBQUQsQ0FBSCxHQUFTUSxVQUFVLENBQUNKLEdBQUcsQ0FBQ0osQ0FBRCxDQUFKLENBQW5CO0FBQ0E7QUFFRjtBQUNBOztBQUNBLGFBQUtNLGlDQUFnQkcsU0FBckI7QUFDRUwsVUFBQUEsR0FBRyxDQUFDSixDQUFELENBQUgsR0FBU0csVUFBVSxDQUFDRCxRQUFYLENBQW9CSixLQUFLLENBQUNZLE1BQTFCLElBQW9DQyxNQUFNLENBQUNQLEdBQUcsQ0FBQ0osQ0FBRCxDQUFKLENBQTFDLEdBQXFESSxHQUFHLENBQUNKLENBQUQsQ0FBakU7QUFDQTs7QUFFRixhQUFLTSxpQ0FBZ0JNLE9BQXJCO0FBQ0VSLFVBQUFBLEdBQUcsQ0FBQ0osQ0FBRCxDQUFILEdBQVNhLFFBQVEsQ0FBQ1QsR0FBRyxDQUFDSixDQUFELENBQUosRUFBUyxFQUFULENBQWpCO0FBQ0E7O0FBRUYsYUFBS00saUNBQWdCUSxPQUFyQjtBQUNFO0FBQ0FWLFVBQUFBLEdBQUcsQ0FBQ0osQ0FBRCxDQUFILEdBQVNJLEdBQUcsQ0FBQ0osQ0FBRCxDQUFILEtBQVcsTUFBWCxJQUFxQkksR0FBRyxDQUFDSixDQUFELENBQUgsS0FBVyxNQUFoQyxJQUEwQ0ksR0FBRyxDQUFDSixDQUFELENBQUgsS0FBVyxHQUE5RDtBQUNBOztBQUVGO0FBQ0U7QUFyQko7QUF1QkQ7QUFDRixHQTFCRDtBQTJCRDtBQUVEOzs7Ozs7Ozs7QUFPTyxTQUFTWixpQkFBVCxDQUEyQjJCLElBQTNCLEVBQWlDQyxVQUFqQyxFQUE2QztBQUNsRDtBQUNBLE1BQU1DLFFBQVEsR0FBR0MsdUJBQVNDLGNBQVQsQ0FBd0JKLElBQXhCLEVBQThCLENBQzdDO0FBQUNLLElBQUFBLEtBQUssRUFBRSx1QkFBUjtBQUFpQ0MsSUFBQUEsUUFBUSxFQUFFO0FBQTNDLEdBRDZDLENBQTlCLENBQWpCOztBQUZrRCw4QkFNM0JDLHFCQUFxQixDQUFDTixVQUFELENBTk07QUFBQSxNQU0zQ08sWUFOMkMseUJBTTNDQSxZQU4yQzs7QUFRbEQsU0FBT1AsVUFBVSxDQUFDUSxNQUFYLENBQWtCLFVBQUNDLFlBQUQsRUFBZTNCLEtBQWYsRUFBc0I0QixLQUF0QixFQUFnQztBQUN2RCxRQUFNQyxJQUFJLEdBQUdKLFlBQVksQ0FBQ0csS0FBRCxDQUF6QjtBQUNBLFFBQU1FLFNBQVMsR0FBR1gsUUFBUSxDQUFDWSxJQUFULENBQWMsVUFBQUMsQ0FBQztBQUFBLGFBQUlBLENBQUMsQ0FBQ0MsR0FBRixLQUFVakMsS0FBZDtBQUFBLEtBQWYsQ0FBbEI7O0FBRnVELGdCQUdoQzhCLFNBQVMsSUFBSSxFQUhtQjtBQUFBLFFBR2hEdkIsSUFIZ0QsU0FHaERBLElBSGdEO0FBQUEsUUFHMUNLLE1BSDBDLFNBRzFDQSxNQUgwQzs7QUFLdkRlLElBQUFBLFlBQVksQ0FBQ0MsS0FBRCxDQUFaLEdBQXNCO0FBQ3BCQyxNQUFBQSxJQUFJLEVBQUpBLElBRG9CO0FBRXBCakIsTUFBQUEsTUFBTSxFQUFOQSxNQUZvQjtBQUlwQjtBQUNBO0FBQ0FzQixNQUFBQSxlQUFlLEVBQUVOLEtBQUssR0FBRyxDQU5MO0FBT3BCckIsTUFBQUEsSUFBSSxFQUFFNEIsdUJBQXVCLENBQUM1QixJQUFEO0FBUFQsS0FBdEI7QUFVQSxXQUFPb0IsWUFBUDtBQUNELEdBaEJNLEVBZ0JKLEVBaEJJLENBQVA7QUFpQkQ7QUFFRDs7Ozs7Ozs7O0FBT08sU0FBU0gscUJBQVQsQ0FBK0JOLFVBQS9CLEVBQTJDO0FBQ2hELFNBQU9BLFVBQVUsQ0FBQ1EsTUFBWCxDQUNMLFVBQUNVLElBQUQsRUFBT3BDLEtBQVAsRUFBY0UsQ0FBZCxFQUFvQjtBQUFBLFFBQ1htQyxRQURXLEdBQ0NELElBREQsQ0FDWEMsUUFEVztBQUVsQixRQUFJQyxTQUFTLEdBQUd0QyxLQUFoQixDQUZrQixDQUlsQjs7QUFDQSxRQUFJcUMsUUFBUSxDQUFDakMsUUFBVCxDQUFrQkosS0FBbEIsQ0FBSixFQUE4QjtBQUM1QixVQUFJdUMsT0FBTyxHQUFHLENBQWQ7O0FBQ0EsYUFBT0YsUUFBUSxDQUFDakMsUUFBVCxXQUFxQkosS0FBckIsY0FBOEJ1QyxPQUE5QixFQUFQLEVBQWlEO0FBQy9DQSxRQUFBQSxPQUFPO0FBQ1I7O0FBQ0RELE1BQUFBLFNBQVMsYUFBTXRDLEtBQU4sY0FBZXVDLE9BQWYsQ0FBVDtBQUNEOztBQUVESCxJQUFBQSxJQUFJLENBQUNYLFlBQUwsQ0FBa0J2QixDQUFsQixJQUF1Qm9DLFNBQXZCO0FBQ0FGLElBQUFBLElBQUksQ0FBQ0MsUUFBTCxDQUFjRyxJQUFkLENBQW1CRixTQUFuQjtBQUVBLFdBQU9GLElBQVA7QUFDRCxHQWxCSSxFQW1CTDtBQUFDQyxJQUFBQSxRQUFRLEVBQUUsRUFBWDtBQUFlWixJQUFBQSxZQUFZLEVBQUU7QUFBN0IsR0FuQkssQ0FBUDtBQXFCRDtBQUVEOzs7Ozs7O0FBTUE7OztBQUNPLFNBQVNVLHVCQUFULENBQWlDTSxLQUFqQyxFQUF3QztBQUFBLE1BRTNDQyxJQUYyQyxHQWV6Q0Msd0JBZnlDLENBRTNDRCxJQUYyQztBQUFBLE1BRzNDRSxJQUgyQyxHQWV6Q0Qsd0JBZnlDLENBRzNDQyxJQUgyQztBQUFBLE1BSTNDQyxRQUoyQyxHQWV6Q0Ysd0JBZnlDLENBSTNDRSxRQUoyQztBQUFBLE1BSzNDQyxNQUwyQyxHQWV6Q0gsd0JBZnlDLENBSzNDRyxNQUwyQztBQUFBLE1BTTNDQyxHQU4yQyxHQWV6Q0osd0JBZnlDLENBTTNDSSxHQU4yQztBQUFBLE1BTzNDQyxLQVAyQyxHQWV6Q0wsd0JBZnlDLENBTzNDSyxLQVAyQztBQUFBLE1BUTNDQyxPQVIyQyxHQWV6Q04sd0JBZnlDLENBUTNDTSxPQVIyQztBQUFBLE1BUzNDQyxNQVQyQyxHQWV6Q1Asd0JBZnlDLENBUzNDTyxNQVQyQztBQUFBLE1BVTNDQyxJQVYyQyxHQWV6Q1Isd0JBZnlDLENBVTNDUSxJQVYyQztBQUFBLE1BVzNDQyxRQVgyQyxHQWV6Q1Qsd0JBZnlDLENBVzNDUyxRQVgyQztBQUFBLE1BWTNDQyxvQkFaMkMsR0FlekNWLHdCQWZ5QyxDQVkzQ1Usb0JBWjJDO0FBQUEsTUFhM0NDLE9BYjJDLEdBZXpDWCx3QkFmeUMsQ0FhM0NXLE9BYjJDO0FBQUEsTUFjM0NDLHlCQWQyQyxHQWV6Q1osd0JBZnlDLENBYzNDWSx5QkFkMkMsRUFpQjdDO0FBQ0E7O0FBQ0EsVUFBUWQsS0FBUjtBQUNFLFNBQUtDLElBQUw7QUFDRSxhQUFPbEMsaUNBQWdCZ0QsSUFBdkI7O0FBQ0YsU0FBS1osSUFBTDtBQUNBLFNBQUtDLFFBQUw7QUFDRSxhQUFPckMsaUNBQWdCRyxTQUF2Qjs7QUFDRixTQUFLbUMsTUFBTDtBQUNBLFNBQUtFLEtBQUw7QUFDRSxhQUFPeEMsaUNBQWdCQyxJQUF2Qjs7QUFDRixTQUFLc0MsR0FBTDtBQUNFLGFBQU92QyxpQ0FBZ0JNLE9BQXZCOztBQUNGLFNBQUttQyxPQUFMO0FBQ0UsYUFBT3pDLGlDQUFnQlEsT0FBdkI7O0FBQ0YsU0FBS29DLFFBQUw7QUFDQSxTQUFLQyxvQkFBTDtBQUNBLFNBQUtFLHlCQUFMO0FBQ0UsYUFBTy9DLGlDQUFnQmlELE9BQXZCOztBQUNGLFNBQUtQLE1BQUw7QUFDQSxTQUFLQyxJQUFMO0FBQ0EsU0FBS0csT0FBTDtBQUNFLGFBQU85QyxpQ0FBZ0JrRCxNQUF2Qjs7QUFDRjtBQUNFQyxzQkFBY0MsSUFBZCxzQ0FBaURuQixLQUFqRDs7QUFDQSxhQUFPakMsaUNBQWdCa0QsTUFBdkI7QUF2Qko7QUF5QkQ7QUFDRDs7QUFFQTs7Ozs7QUFHTyxTQUFTRyxnQkFBVCxDQUEwQmhGLE9BQTFCLEVBQW1DO0FBQ3hDLE1BQUksQ0FBQ0EsT0FBTyxDQUFDRyxNQUFiLEVBQXFCO0FBQ25CLFdBQU8sSUFBUDtBQUNEOztBQUVELE1BQU04RSxJQUFJLEdBQUdDLE1BQU0sQ0FBQ0QsSUFBUCxDQUFZakYsT0FBTyxDQUFDLENBQUQsQ0FBbkIsQ0FBYjtBQUNBLE1BQU1FLElBQUksR0FBR0YsT0FBTyxDQUFDaUIsR0FBUixDQUFZLFVBQUFDLENBQUM7QUFBQSxXQUFJK0QsSUFBSSxDQUFDaEUsR0FBTCxDQUFTLFVBQUFtQyxHQUFHO0FBQUEsYUFBSWxDLENBQUMsQ0FBQ2tDLEdBQUQsQ0FBTDtBQUFBLEtBQVosQ0FBSjtBQUFBLEdBQWIsQ0FBYjtBQUNBLE1BQU03QyxNQUFNLEdBQUdFLGlCQUFpQixDQUFDVCxPQUFELEVBQVVpRixJQUFWLENBQWhDO0FBRUEsU0FBTztBQUNMMUUsSUFBQUEsTUFBTSxFQUFOQSxNQURLO0FBRUxMLElBQUFBLElBQUksRUFBSkE7QUFGSyxHQUFQO0FBSUQ7QUFFRDs7Ozs7O0FBSU8sU0FBU2lGLGNBQVQsQ0FBd0JuRixPQUF4QixFQUFpQztBQUN0QyxNQUFNb0YsaUJBQWlCLEdBQUcsK0JBQVVwRixPQUFWLENBQTFCOztBQUVBLE1BQUksQ0FBQ29GLGlCQUFELElBQXNCLENBQUNDLEtBQUssQ0FBQ0MsT0FBTixDQUFjRixpQkFBaUIsQ0FBQ0csUUFBaEMsQ0FBM0IsRUFBc0U7QUFDcEU7QUFDQSxXQUFPLElBQVA7QUFDRCxHQU5xQyxDQVF0Qzs7O0FBQ0EsTUFBTS9FLE9BQU8sR0FBRzRFLGlCQUFpQixDQUFDRyxRQUFsQixDQUEyQjFDLE1BQTNCLENBQWtDLFVBQUNVLElBQUQsRUFBT2lDLENBQVAsRUFBVW5FLENBQVYsRUFBZ0I7QUFDaEUsUUFBSW1FLENBQUMsQ0FBQ0MsUUFBTixFQUFnQjtBQUNkbEMsTUFBQUEsSUFBSSxDQUFDSSxJQUFMO0FBQ0U7QUFDQStCLFFBQUFBLFFBQVEsRUFBRUY7QUFGWixTQUdNQSxDQUFDLENBQUNHLFVBQUYsSUFBZ0IsRUFIdEI7QUFLRDs7QUFDRCxXQUFPcEMsSUFBUDtBQUNELEdBVGUsRUFTYixFQVRhLENBQWhCLENBVHNDLENBb0J0Qzs7QUFDQSxNQUFNaEQsTUFBTSxHQUFHQyxPQUFPLENBQUNxQyxNQUFSLENBQWUsVUFBQytDLElBQUQsRUFBT0MsSUFBUCxFQUFnQjtBQUM1Q1gsSUFBQUEsTUFBTSxDQUFDRCxJQUFQLENBQVlZLElBQVosRUFBa0JuRixPQUFsQixDQUEwQixVQUFBMEMsR0FBRyxFQUFJO0FBQy9CLFVBQUksQ0FBQ3dDLElBQUksQ0FBQ3JFLFFBQUwsQ0FBYzZCLEdBQWQsQ0FBTCxFQUF5QjtBQUN2QndDLFFBQUFBLElBQUksQ0FBQ2pDLElBQUwsQ0FBVVAsR0FBVjtBQUNEO0FBQ0YsS0FKRDtBQUtBLFdBQU93QyxJQUFQO0FBQ0QsR0FQYyxFQU9aLEVBUFksQ0FBZixDQXJCc0MsQ0E4QnRDOztBQUNBcEYsRUFBQUEsT0FBTyxDQUFDRSxPQUFSLENBQWdCLFVBQUFRLENBQUMsRUFBSTtBQUNuQlgsSUFBQUEsTUFBTSxDQUFDRyxPQUFQLENBQWUsVUFBQThFLENBQUMsRUFBSTtBQUNsQixVQUFJLEVBQUVBLENBQUMsSUFBSXRFLENBQVAsQ0FBSixFQUFlO0FBQ2JBLFFBQUFBLENBQUMsQ0FBQ3NFLENBQUQsQ0FBRCxHQUFPLElBQVA7QUFDRDtBQUNGLEtBSkQ7QUFLRCxHQU5EO0FBUUEsU0FBT1IsZ0JBQWdCLENBQUN4RSxPQUFELENBQXZCO0FBQ0Q7QUFFRDs7Ozs7OztBQUtPLFNBQVNzRixTQUFULENBQW1CMUQsSUFBbkIsRUFBeUI3QixNQUF6QixFQUFpQztBQUN0QyxNQUFNd0YsT0FBTyxHQUFHeEYsTUFBTSxDQUFDVSxHQUFQLENBQVcsVUFBQXVFLENBQUM7QUFBQSxXQUFJQSxDQUFDLENBQUN4QyxJQUFOO0FBQUEsR0FBWixDQUFoQjtBQUNBLE1BQU1nRCxhQUFhLEdBQUcsQ0FBQ0QsT0FBRCxDQUF0QixDQUZzQyxDQUl0Qzs7QUFDQTNELEVBQUFBLElBQUksQ0FBQzFCLE9BQUwsQ0FBYSxVQUFBZSxHQUFHLEVBQUk7QUFDbEJ1RSxJQUFBQSxhQUFhLENBQUNyQyxJQUFkLENBQ0VsQyxHQUFHLENBQUNSLEdBQUosQ0FDRSxVQUFDQyxDQUFELEVBQUlHLENBQUo7QUFBQSxhQUFVSCxDQUFDLElBQUkrRSxnQ0FBZXJCLE9BQWYsQ0FBdUJyRCxRQUF2QixDQUFnQ2hCLE1BQU0sQ0FBQ2MsQ0FBRCxDQUFOLENBQVUyQixJQUExQyxDQUFMLEdBQ1JrRCxJQUFJLENBQUNDLFNBQUwsQ0FBZWpGLENBQWYsQ0FEUSxHQUNZQSxDQUR0QjtBQUFBLEtBREYsQ0FERjtBQU1ELEdBUEQ7QUFTQSxTQUFPLDBCQUFjOEUsYUFBZCxDQUFQO0FBQ0Q7QUFFRDs7Ozs7O0FBSU8sU0FBU0ksaUJBQVQsQ0FBMkJoRSxJQUEzQixFQUFpQztBQUN0Qzs7QUFDQTs7Ozs7OztBQU9BLE1BQUlpRSxPQUFPLEdBQUcsSUFBZDs7QUFDQSxNQUFJLENBQUNqRSxJQUFMLEVBQVc7QUFDVCx5QkFBTyxxQ0FBUDtBQUNBaUUsSUFBQUEsT0FBTyxHQUFHLEtBQVY7QUFDRCxHQUhELE1BR08sSUFBSSxDQUFDaEIsS0FBSyxDQUFDQyxPQUFOLENBQWNsRCxJQUFJLENBQUM3QixNQUFuQixDQUFMLEVBQWlDO0FBQ3RDLHlCQUFPLG1EQUFQO0FBQ0E4RixJQUFBQSxPQUFPLEdBQUcsS0FBVjtBQUNELEdBSE0sTUFHQSxJQUFJLENBQUNoQixLQUFLLENBQUNDLE9BQU4sQ0FBY2xELElBQUksQ0FBQ2xDLElBQW5CLENBQUwsRUFBK0I7QUFDcEMseUJBQU8saURBQVA7QUFDQW1HLElBQUFBLE9BQU8sR0FBRyxLQUFWO0FBQ0Q7O0FBRUQsTUFBSSxDQUFDQSxPQUFMLEVBQWM7QUFDWixXQUFPLElBQVA7QUFDRDs7QUF2QnFDLE1BeUIvQjlGLE1BekIrQixHQXlCZjZCLElBekJlLENBeUIvQjdCLE1BekIrQjtBQUFBLE1BeUJ2QkwsSUF6QnVCLEdBeUJma0MsSUF6QmUsQ0F5QnZCbEMsSUF6QnVCLEVBMkJ0Qzs7QUFDQSxNQUFNb0csUUFBUSxHQUFHL0YsTUFBTSxDQUFDZ0csS0FBUCxDQUFhLFVBQUNmLENBQUQsRUFBSW5FLENBQUosRUFBVTtBQUN0QyxRQUFJLHNCQUFPbUUsQ0FBUCxNQUFhLFFBQWpCLEVBQTJCO0FBQ3pCLHFGQUEwREEsQ0FBMUQ7QUFDQSxhQUFPLEtBQVA7QUFDRDs7QUFFRCxRQUFJLENBQUNBLENBQUMsQ0FBQ3hDLElBQVAsRUFBYTtBQUNYLGlGQUNpRGtELElBQUksQ0FBQ0MsU0FBTCxDQUFlWCxDQUFmLENBRGpELEdBRFcsQ0FJWDs7QUFDQUEsTUFBQUEsQ0FBQyxDQUFDeEMsSUFBRixvQkFBbUIzQixDQUFuQjtBQUNEOztBQUVELFFBQUksQ0FBQ00saUNBQWdCNkQsQ0FBQyxDQUFDOUQsSUFBbEIsQ0FBTCxFQUE4QjtBQUM1Qix3REFBNkI4RCxDQUFDLENBQUM5RCxJQUEvQjtBQUNBLGFBQU8sS0FBUDtBQUNEOztBQUVELFdBQU84RCxDQUFDLENBQUM5RCxJQUFGLEtBQVdDLGlDQUFnQkcsU0FBM0IsSUFBd0MsT0FBTzBELENBQUMsQ0FBQ3pELE1BQVQsS0FBb0IsUUFBbkU7QUFDRCxHQXBCZ0IsQ0FBakI7O0FBc0JBLE1BQUl1RSxRQUFKLEVBQWM7QUFDWixXQUFPO0FBQUNwRyxNQUFBQSxJQUFJLEVBQUpBLElBQUQ7QUFBT0ssTUFBQUEsTUFBTSxFQUFOQTtBQUFQLEtBQVA7QUFDRCxHQXBEcUMsQ0FzRHRDO0FBQ0E7OztBQUNBLE1BQU1pRyxVQUFVLEdBQUdsRyx1QkFBdUIsQ0FBQztBQUFDQyxJQUFBQSxNQUFNLEVBQUVBLE1BQU0sQ0FBQ1UsR0FBUCxDQUFXLFVBQUF1RSxDQUFDO0FBQUEsYUFBSUEsQ0FBQyxDQUFDeEMsSUFBTjtBQUFBLEtBQVosQ0FBVDtBQUFrQ3hDLElBQUFBLE9BQU8sRUFBRU47QUFBM0MsR0FBRCxDQUExQztBQUNBLE1BQU1tQyxVQUFVLEdBQUc5QixNQUFNLENBQUNVLEdBQVAsQ0FBVyxVQUFBdUUsQ0FBQztBQUFBLFdBQUlBLENBQUMsQ0FBQ3hDLElBQU47QUFBQSxHQUFaLENBQW5CO0FBQ0EsTUFBTXlELElBQUksR0FBR2hHLGlCQUFpQixDQUFDK0YsVUFBRCxFQUFhbkUsVUFBYixDQUE5QjtBQUNBLE1BQU1xRSxhQUFhLEdBQUduRyxNQUFNLENBQUNVLEdBQVAsQ0FBVyxVQUFDdUUsQ0FBRCxFQUFJbkUsQ0FBSjtBQUFBLDJDQUM1Qm1FLENBRDRCO0FBRS9COUQsTUFBQUEsSUFBSSxFQUFFK0UsSUFBSSxDQUFDcEYsQ0FBRCxDQUFKLENBQVFLLElBRmlCO0FBRy9CSyxNQUFBQSxNQUFNLEVBQUUwRSxJQUFJLENBQUNwRixDQUFELENBQUosQ0FBUVU7QUFIZTtBQUFBLEdBQVgsQ0FBdEI7QUFNQSxTQUFPO0FBQUN4QixJQUFBQSxNQUFNLEVBQUVtRyxhQUFUO0FBQXdCeEcsSUFBQUEsSUFBSSxFQUFKQTtBQUF4QixHQUFQO0FBQ0Q7QUFFRDs7Ozs7O0FBSU8sU0FBU3lHLG1CQUFULENBQTZCM0csT0FBN0IsRUFBc0M7QUFDM0MsU0FBT0EsT0FBTyxHQUNWNEcsaUJBQWVDLElBQWYsQ0FBb0I3RyxPQUFPLENBQUM4RyxRQUE1QixFQUFzQzlHLE9BQU8sQ0FBQytHLE1BQTlDLENBRFUsR0FFVixJQUZKO0FBR0Q7O2VBRWM7QUFDYjVCLEVBQUFBLGNBQWMsRUFBZEEsY0FEYTtBQUVicEYsRUFBQUEsY0FBYyxFQUFkQSxjQUZhO0FBR2JpRixFQUFBQSxnQkFBZ0IsRUFBaEJBLGdCQUhhO0FBSWIyQixFQUFBQSxtQkFBbUIsRUFBbkJBLG1CQUphO0FBS2JyRCxFQUFBQSx1QkFBdUIsRUFBdkJBLHVCQUxhO0FBTWI3QyxFQUFBQSxpQkFBaUIsRUFBakJBLGlCQU5hO0FBT2JFLEVBQUFBLHVCQUF1QixFQUF2QkE7QUFQYSxDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtjc3ZQYXJzZVJvd3MsIGNzdkZvcm1hdFJvd3N9IGZyb20gJ2QzLWRzdic7XG5pbXBvcnQge3JhbmdlfSBmcm9tICdkMy1hcnJheSc7XG5pbXBvcnQge2NvbnNvbGUgYXMgZ2xvYmFsQ29uc29sZX0gZnJvbSAnZ2xvYmFsL3dpbmRvdyc7XG5pbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQge0FuYWx5emVyLCBEQVRBX1RZUEVTIGFzIEFuYWx5emVyREFUQV9UWVBFU30gZnJvbSAndHlwZS1hbmFseXplcic7XG5pbXBvcnQgbm9ybWFsaXplIGZyb20gJ0BtYXBib3gvZ2VvanNvbi1ub3JtYWxpemUnO1xuaW1wb3J0IHtBTExfRklFTERfVFlQRVMsIEdFT0pTT05fRklFTERTfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5pbXBvcnQge25vdE51bGxvclVuZGVmaW5lZH0gZnJvbSAndXRpbHMvZGF0YS11dGlscyc7XG5pbXBvcnQgS2VwbGVyR2xTY2hlbWEgZnJvbSAnc2NoZW1hcyc7XG5cbi8vIGlmIGFueSBvZiB0aGVzZSB2YWx1ZSBvY2N1cnMgaW4gY3N2LCBwYXJzZSBpdCB0byBudWxsO1xuY29uc3QgQ1NWX05VTExTID0gWycnLCAnbnVsbCcsICdOVUxMJywgJ051bGwnLCAnTmFOJ107XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzQ3N2RGF0YShyYXdEYXRhKSB7XG5cbiAgLy8gaGVyZSB3ZSBhc3N1bWUgdGhlIGNzdiBmaWxlIHRoYXQgcGVvcGxlIHVwbG9hZGVkIHdpbGwgaGF2ZSBmaXJzdCByb3dcbiAgLy8gYXMgbmFtZSBvZiB0aGUgY29sdW1uXG4gIC8vIFRPRE86IGFkZCBhIGFsZXJ0IGF0IHVwbG9hZCBjc3YgdG8gcmVtaW5kIGRlZmluZSBmaXJzdCByb3dcbiAgY29uc3QgW2hlYWRlclJvdywgLi4ucm93c10gPSBjc3ZQYXJzZVJvd3MocmF3RGF0YSk7XG5cbiAgaWYgKCFyb3dzLmxlbmd0aCB8fCAhaGVhZGVyUm93KSB7XG4gICAgLy8gbG9va3MgbGlrZSBhbiBlbXB0eSBmaWxlXG4gICAgLy8gcmVzb2x2ZSBudWxsLCBhbmQgY2F0Y2ggdGhlbSBsYXRlciBpbiBvbmUgcGxhY2VcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNsZWFuVXBGYWxzeUNzdlZhbHVlKHJvd3MpO1xuICAvLyBObyBuZWVkIHRvIHJ1biB0eXBlIGRldGVjdGlvbiBvbiBldmVyeSBkYXRhIHBvaW50XG4gIC8vIGhlcmUgd2UgZ2V0IGEgbGlzdCBvZiBub25lIG51bGwgdmFsdWVzIHRvIHJ1biBhbmFseXplIG9uXG4gIGNvbnN0IHNhbXBsZSA9IGdldFNhbXBsZUZvclR5cGVBbmFseXplKHtmaWVsZHM6IGhlYWRlclJvdywgYWxsRGF0YTogcm93c30pO1xuXG4gIGNvbnN0IGZpZWxkcyA9IGdldEZpZWxkc0Zyb21EYXRhKHNhbXBsZSwgaGVhZGVyUm93KTtcblxuICBmaWVsZHMuZm9yRWFjaChwYXJzZUNzdkRhdGFCeUZpZWxkVHlwZS5iaW5kKG51bGwsIHJvd3MpKTtcblxuICByZXR1cm4ge2ZpZWxkcywgcm93c307XG59XG5cbi8qKlxuICogZ2V0IGZpZWxkcyBmcm9tIGNzdiBkYXRhXG4gKlxuICogQHBhcmFtIHthcnJheX0gZmllbGRzIC0gYW4gYXJyYXkgb2YgZmllbGRzIG5hbWVcbiAqIEBwYXJhbSB7YXJyYXl9IGFsbERhdGFcbiAqIEBwYXJhbSB7YXJyYXl9IHNhbXBsZUNvdW50XG4gKiBAcmV0dXJucyB7YXJyYXl9IGZvcm1hdHRlZCBmaWVsZHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNhbXBsZUZvclR5cGVBbmFseXplKHtmaWVsZHMsIGFsbERhdGEsIHNhbXBsZUNvdW50ID0gNTB9KSB7XG4gIGNvbnN0IHRvdGFsID0gTWF0aC5taW4oc2FtcGxlQ291bnQsIGFsbERhdGEubGVuZ3RoKTtcbiAgLy8gY29uc3QgZmllbGRPcmRlciA9IGZpZWxkcy5tYXAoZiA9PiBmLm5hbWUpO1xuICBjb25zdCBzYW1wbGUgPSByYW5nZSgwLCB0b3RhbCwgMSkubWFwKGQgPT4gKHt9KSk7XG5cbiAgLy8gY29sbGVjdCBzYW1wbGUgZGF0YSBmb3IgZWFjaCBmaWVsZFxuICBmaWVsZHMuZm9yRWFjaCgoZmllbGQsIGZpZWxkSWR4KSA9PiB7XG4gICAgLy8gZGF0YSBjb3VudGVyXG4gICAgbGV0IGkgPSAwO1xuICAgIC8vIHNhbXBsZSBjb3VudGVyXG4gICAgbGV0IGogPSAwO1xuXG4gICAgd2hpbGUgKGogPCB0b3RhbCkge1xuICAgICAgaWYgKGkgPj0gYWxsRGF0YS5sZW5ndGgpIHtcbiAgICAgICAgLy8gaWYgZGVwbGV0ZWQgZGF0YSBwb29sXG4gICAgICAgIHNhbXBsZVtqXVtmaWVsZF0gPSBudWxsO1xuICAgICAgICBqKys7XG4gICAgICB9IGVsc2UgaWYgKG5vdE51bGxvclVuZGVmaW5lZChhbGxEYXRhW2ldW2ZpZWxkSWR4XSkpIHtcbiAgICAgICAgc2FtcGxlW2pdW2ZpZWxkXSA9IGFsbERhdGFbaV1bZmllbGRJZHhdO1xuICAgICAgICBqKys7XG4gICAgICAgIGkrKztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGkrKztcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBzYW1wbGU7XG59XG5cbmZ1bmN0aW9uIGNsZWFuVXBGYWxzeUNzdlZhbHVlKHJvd3MpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCByb3dzW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAvLyBhbmFseXplciB3aWxsIHNldCBhbnkgZmllbGRzIHRvICdzdHJpbmcnIGlmIHRoZXJlIGFyZSBlbXB0eSB2YWx1ZXNcbiAgICAgIC8vIHdoaWNoIHdpbGwgYmUgcGFyc2VkIGFzICcnIGJ5IGQzLmNzdlxuICAgICAgLy8gaGVyZSB3ZSBwYXJzZSBlbXB0eSBkYXRhIGFzIG51bGxcbiAgICAgIC8vIFRPRE86IGNyZWF0ZSB3YXJuaW5nIHdoZW4gZGVsdGVjdCBgQ1NWX05VTExTYCBpbiB0aGUgZGF0YVxuICAgICAgaWYgKCFyb3dzW2ldW2pdIHx8IENTVl9OVUxMUy5pbmNsdWRlcyhyb3dzW2ldW2pdKSkge1xuICAgICAgICByb3dzW2ldW2pdID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbi8qKlxuICogUHJvY2VzcyB1cGxvYWRlZCBjc3YgZmlsZSB0byBwYXJzZSB2YWx1ZSBieSBmaWVsZCB0eXBlXG4gKlxuICogQHBhcmFtIHthcnJheX0gcm93c1xuICogQHBhcmFtIHtvYmplY3R9IGZpZWxkXG4gKiBAcGFyYW0ge251bWJlcn0gaVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUNzdkRhdGFCeUZpZWxkVHlwZShyb3dzLCBmaWVsZCwgaSkge1xuICBjb25zdCB1bml4Rm9ybWF0ID0gWyd4JywgJ1gnXTtcblxuICByb3dzLmZvckVhY2gocm93ID0+IHtcbiAgICBpZiAocm93W2ldICE9PSBudWxsKSB7XG4gICAgICBzd2l0Y2ggKGZpZWxkLnR5cGUpIHtcbiAgICAgICAgY2FzZSBBTExfRklFTERfVFlQRVMucmVhbDpcbiAgICAgICAgICByb3dbaV0gPSBwYXJzZUZsb2F0KHJvd1tpXSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgLy8gVE9ETzogdGltZXN0YW1wIGNhbiBiZSBlaXRoZXIgJzE0OTU4MjczMjYnIG9yICcyMDE2LTAzLTEwIDExOjIwJ1xuICAgICAgICAvLyBpZiBpdCdzICcxNDk1ODI3MzI2JyB3ZSBwYXNzIGl0IHRvIGludFxuICAgICAgICBjYXNlIEFMTF9GSUVMRF9UWVBFUy50aW1lc3RhbXA6XG4gICAgICAgICAgcm93W2ldID0gdW5peEZvcm1hdC5pbmNsdWRlcyhmaWVsZC5mb3JtYXQpID8gTnVtYmVyKHJvd1tpXSkgOiByb3dbaV07XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBBTExfRklFTERfVFlQRVMuaW50ZWdlcjpcbiAgICAgICAgICByb3dbaV0gPSBwYXJzZUludChyb3dbaV0sIDEwKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIEFMTF9GSUVMRF9UWVBFUy5ib29sZWFuOlxuICAgICAgICAgIC8vIDAgYW5kIDEgb25seSBmaWVsZCBjYW4gYWxzbyBiZSBib29sZWFuXG4gICAgICAgICAgcm93W2ldID0gcm93W2ldID09PSAndHJ1ZScgfHwgcm93W2ldID09PSAnVHJ1ZScgfHwgcm93W2ldID09PSAnMSc7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIGdldCBmaWVsZHMgZnJvbSBjc3YgZGF0YVxuICpcbiAqIEBwYXJhbSB7YXJyYXl9IGRhdGFcbiAqIEBwYXJhbSB7YXJyYXl9IGZpZWxkT3JkZXJcbiAqIEByZXR1cm5zIHthcnJheX0gZm9ybWF0dGVkIGZpZWxkc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmllbGRzRnJvbURhdGEoZGF0YSwgZmllbGRPcmRlcikge1xuICAvLyBhZGQgYSBjaGVjayBmb3IgZXBvY2ggdGltZXN0YW1wXG4gIGNvbnN0IG1ldGFkYXRhID0gQW5hbHl6ZXIuY29tcHV0ZUNvbE1ldGEoZGF0YSwgW1xuICAgIHtyZWdleDogLy4qZ2VvanNvbnxhbGxfcG9pbnRzL2csIGRhdGFUeXBlOiAnR0VPTUVUUlknfVxuICBdKTtcblxuICBjb25zdCB7ZmllbGRCeUluZGV4fSA9IHJlbmFtZUR1cGxpY2F0ZUZpZWxkcyhmaWVsZE9yZGVyKTtcblxuICByZXR1cm4gZmllbGRPcmRlci5yZWR1Y2UoKG9yZGVyZWRBcnJheSwgZmllbGQsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgbmFtZSA9IGZpZWxkQnlJbmRleFtpbmRleF07XG4gICAgY29uc3QgZmllbGRNZXRhID0gbWV0YWRhdGEuZmluZChtID0+IG0ua2V5ID09PSBmaWVsZCk7XG4gICAgY29uc3Qge3R5cGUsIGZvcm1hdH0gPSBmaWVsZE1ldGEgfHwge307XG5cbiAgICBvcmRlcmVkQXJyYXlbaW5kZXhdID0ge1xuICAgICAgbmFtZSxcbiAgICAgIGZvcm1hdCxcblxuICAgICAgLy8gbmVlZCB0aGlzIGZvciBtYXBidWlsZGVyIGNvbnZlcnNpb246IGZpbHRlciB0eXBlIGRldGVjdGlvblxuICAgICAgLy8gY2F0ZWdvcnksXG4gICAgICB0YWJsZUZpZWxkSW5kZXg6IGluZGV4ICsgMSxcbiAgICAgIHR5cGU6IGFuYWx5emVyVHlwZVRvRmllbGRUeXBlKHR5cGUpXG4gICAgfTtcblxuICAgIHJldHVybiBvcmRlcmVkQXJyYXk7XG4gIH0sIFtdKTtcbn1cblxuLyoqXG4gKiBwYXNzIGluIGFuIGFycmF5IG9mIGZpZWxkIG5hbWVzLCByZW5hbWUgZHVwbGljYXRlZCBvbmVcbiAqIGFuZCByZXR1cm4gYSBtYXAgZnJvbSBvbGQgZmllbGQgaW5kZXggdG8gbmV3IG5hbWVcbiAqXG4gKiBAcGFyYW0ge2FycmF5fSBmaWVsZE9yZGVyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBuZXcgZmllbGQgbmFtZSBieSBpbmRleFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVuYW1lRHVwbGljYXRlRmllbGRzKGZpZWxkT3JkZXIpIHtcbiAgcmV0dXJuIGZpZWxkT3JkZXIucmVkdWNlKFxuICAgIChhY2N1LCBmaWVsZCwgaSkgPT4ge1xuICAgICAgY29uc3Qge2FsbE5hbWVzfSA9IGFjY3U7XG4gICAgICBsZXQgZmllbGROYW1lID0gZmllbGQ7XG5cbiAgICAgIC8vIGFkZCBhIGNvdW50ZXIgdG8gZHVwbGljYXRlZCBuYW1lc1xuICAgICAgaWYgKGFsbE5hbWVzLmluY2x1ZGVzKGZpZWxkKSkge1xuICAgICAgICBsZXQgY291bnRlciA9IDA7XG4gICAgICAgIHdoaWxlIChhbGxOYW1lcy5pbmNsdWRlcyhgJHtmaWVsZH0tJHtjb3VudGVyfWApKSB7XG4gICAgICAgICAgY291bnRlcisrO1xuICAgICAgICB9XG4gICAgICAgIGZpZWxkTmFtZSA9IGAke2ZpZWxkfS0ke2NvdW50ZXJ9YDtcbiAgICAgIH1cblxuICAgICAgYWNjdS5maWVsZEJ5SW5kZXhbaV0gPSBmaWVsZE5hbWU7XG4gICAgICBhY2N1LmFsbE5hbWVzLnB1c2goZmllbGROYW1lKTtcblxuICAgICAgcmV0dXJuIGFjY3U7XG4gICAgfSxcbiAgICB7YWxsTmFtZXM6IFtdLCBmaWVsZEJ5SW5kZXg6IHt9fVxuICApO1xufVxuXG4vKipcbiAqIE1hcCBBbmFseXplciB0eXBlcyB0byBsb2NhbCBmaWVsZCB0eXBlc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBhVHlwZVxuICogQHJldHVybnMge3N0cmluZ30gY29ycmVzcG9uZGluZyB0eXBlIGluIEFMTF9GSUVMRF9UWVBFU1xuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBjb21wbGV4aXR5ICovXG5leHBvcnQgZnVuY3Rpb24gYW5hbHl6ZXJUeXBlVG9GaWVsZFR5cGUoYVR5cGUpIHtcbiAgY29uc3Qge1xuICAgIERBVEUsXG4gICAgVElNRSxcbiAgICBEQVRFVElNRSxcbiAgICBOVU1CRVIsXG4gICAgSU5ULFxuICAgIEZMT0FULFxuICAgIEJPT0xFQU4sXG4gICAgU1RSSU5HLFxuICAgIENJVFksXG4gICAgR0VPTUVUUlksXG4gICAgR0VPTUVUUllfRlJPTV9TVFJJTkcsXG4gICAgWklQQ09ERSxcbiAgICBQQUlSX0dFT01FVFJZX0ZST01fU1RSSU5HXG4gIH0gPSBBbmFseXplckRBVEFfVFlQRVM7XG5cbiAgLy8gVE9ETzogdW4gcmVjb2duaXplZCB0eXBlc1xuICAvLyBDVVJSRU5DWSBQRVJDRU5UIE5PTkVcbiAgc3dpdGNoIChhVHlwZSkge1xuICAgIGNhc2UgREFURTpcbiAgICAgIHJldHVybiBBTExfRklFTERfVFlQRVMuZGF0ZTtcbiAgICBjYXNlIFRJTUU6XG4gICAgY2FzZSBEQVRFVElNRTpcbiAgICAgIHJldHVybiBBTExfRklFTERfVFlQRVMudGltZXN0YW1wO1xuICAgIGNhc2UgTlVNQkVSOlxuICAgIGNhc2UgRkxPQVQ6XG4gICAgICByZXR1cm4gQUxMX0ZJRUxEX1RZUEVTLnJlYWw7XG4gICAgY2FzZSBJTlQ6XG4gICAgICByZXR1cm4gQUxMX0ZJRUxEX1RZUEVTLmludGVnZXI7XG4gICAgY2FzZSBCT09MRUFOOlxuICAgICAgcmV0dXJuIEFMTF9GSUVMRF9UWVBFUy5ib29sZWFuO1xuICAgIGNhc2UgR0VPTUVUUlk6XG4gICAgY2FzZSBHRU9NRVRSWV9GUk9NX1NUUklORzpcbiAgICBjYXNlIFBBSVJfR0VPTUVUUllfRlJPTV9TVFJJTkc6XG4gICAgICByZXR1cm4gQUxMX0ZJRUxEX1RZUEVTLmdlb2pzb247XG4gICAgY2FzZSBTVFJJTkc6XG4gICAgY2FzZSBDSVRZOlxuICAgIGNhc2UgWklQQ09ERTpcbiAgICAgIHJldHVybiBBTExfRklFTERfVFlQRVMuc3RyaW5nO1xuICAgIGRlZmF1bHQ6XG4gICAgICBnbG9iYWxDb25zb2xlLndhcm4oYFVuc3VwcG9ydGVkIGFuYWx5emVyIHR5cGU6ICR7YVR5cGV9YCk7XG4gICAgICByZXR1cm4gQUxMX0ZJRUxEX1RZUEVTLnN0cmluZztcbiAgfVxufVxuLyogZXNsaW50LWVuYWJsZSBjb21wbGV4aXR5ICovXG5cbi8qXG4gKiBQcm9jZXNzIHJhd0RhdGEgd2hlcmUgZWFjaCByb3cgaXMgYW4gb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzUm93T2JqZWN0KHJhd0RhdGEpIHtcbiAgaWYgKCFyYXdEYXRhLmxlbmd0aCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHJhd0RhdGFbMF0pO1xuICBjb25zdCByb3dzID0gcmF3RGF0YS5tYXAoZCA9PiBrZXlzLm1hcChrZXkgPT4gZFtrZXldKSk7XG4gIGNvbnN0IGZpZWxkcyA9IGdldEZpZWxkc0Zyb21EYXRhKHJhd0RhdGEsIGtleXMpO1xuXG4gIHJldHVybiB7XG4gICAgZmllbGRzLFxuICAgIHJvd3NcbiAgfTtcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHJhd0RhdGEgLSByYXcgZ2VvanNvbiBmZWF0dXJlIGNvbGxlY3Rpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NHZW9qc29uKHJhd0RhdGEpIHtcbiAgY29uc3Qgbm9ybWFsaXplZEdlb2pzb24gPSBub3JtYWxpemUocmF3RGF0YSk7XG5cbiAgaWYgKCFub3JtYWxpemVkR2VvanNvbiB8fCAhQXJyYXkuaXNBcnJheShub3JtYWxpemVkR2VvanNvbi5mZWF0dXJlcykpIHtcbiAgICAvLyBmYWlsIHRvIG5vcm1hbGl6ZSBnZW9qc29uXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBnZXR0aW5nIGFsbCBmZWF0dXJlIGZpZWxkc1xuICBjb25zdCBhbGxEYXRhID0gbm9ybWFsaXplZEdlb2pzb24uZmVhdHVyZXMucmVkdWNlKChhY2N1LCBmLCBpKSA9PiB7XG4gICAgaWYgKGYuZ2VvbWV0cnkpIHtcbiAgICAgIGFjY3UucHVzaCh7XG4gICAgICAgIC8vIGFkZCBmZWF0dXJlIHRvIF9nZW9qc29uIGZpZWxkXG4gICAgICAgIF9nZW9qc29uOiBmLFxuICAgICAgICAuLi4oZi5wcm9wZXJ0aWVzIHx8IHt9KVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBhY2N1O1xuICB9LCBbXSk7XG5cbiAgLy8gZ2V0IGFsbCB0aGUgZmllbGRcbiAgY29uc3QgZmllbGRzID0gYWxsRGF0YS5yZWR1Y2UoKHByZXYsIGN1cnIpID0+IHtcbiAgICBPYmplY3Qua2V5cyhjdXJyKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAoIXByZXYuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgICBwcmV2LnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcHJldjtcbiAgfSwgW10pO1xuXG4gIC8vIG1ha2Ugc3VyZSBlYWNoIGZlYXR1cmUgaGFzIGV4YWN0IHNhbWUgZmllbGRzXG4gIGFsbERhdGEuZm9yRWFjaChkID0+IHtcbiAgICBmaWVsZHMuZm9yRWFjaChmID0+IHtcbiAgICAgIGlmICghKGYgaW4gZCkpIHtcbiAgICAgICAgZFtmXSA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBwcm9jZXNzUm93T2JqZWN0KGFsbERhdGEpO1xufVxuXG4vKipcbiAqIE9uIGV4cG9ydCBkYXRhIHRvIGNzdlxuICogQHBhcmFtIGRhdGFcbiAqIEBwYXJhbSBmaWVsZHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdENzdihkYXRhLCBmaWVsZHMpIHtcbiAgY29uc3QgY29sdW1ucyA9IGZpZWxkcy5tYXAoZiA9PiBmLm5hbWUpO1xuICBjb25zdCBmb3JtYXR0ZWREYXRhID0gW2NvbHVtbnNdO1xuXG4gIC8vIHBhcnNlIGdlb2pzb24gb2JqZWN0IGFzIHN0cmluZ1xuICBkYXRhLmZvckVhY2gocm93ID0+IHtcbiAgICBmb3JtYXR0ZWREYXRhLnB1c2goXG4gICAgICByb3cubWFwKFxuICAgICAgICAoZCwgaSkgPT4gZCAmJiBHRU9KU09OX0ZJRUxEUy5nZW9qc29uLmluY2x1ZGVzKGZpZWxkc1tpXS5uYW1lKSA/XG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZCkgOiBkXG4gICAgICApXG4gICAgKVxuICB9KTtcblxuICByZXR1cm4gY3N2Rm9ybWF0Um93cyhmb3JtYXR0ZWREYXRhKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0gZGF0YVxuICogQHJldHVybnMge3thbGxEYXRhOiBBcnJheSwgZmllbGRzOiBBcnJheX19XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUlucHV0RGF0YShkYXRhKSB7XG4gIC8vIFRPRE86IGFkZCB0ZXN0XG4gIC8qXG4gICAqIGV4cGVjdGVkIGlucHV0IGRhdGEgZm9ybWF0XG4gICAqIHtcbiAgICogICBmaWVsZHM6IFtdLFxuICAgKiAgIHJvd3M6IFtdXG4gICAqIH1cbiAgICovXG4gIGxldCBwcm9jZWVkID0gdHJ1ZTtcbiAgaWYgKCFkYXRhKSB7XG4gICAgYXNzZXJ0KCdyZWNlaXZlVmlzRGF0YTogZGF0YSBjYW5ub3QgYmUgbnVsbCcpO1xuICAgIHByb2NlZWQgPSBmYWxzZTtcbiAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheShkYXRhLmZpZWxkcykpIHtcbiAgICBhc3NlcnQoJ3JlY2VpdmVWaXNEYXRhOiBleHBlY3QgZGF0YS5maWVsZHMgdG8gYmUgYW4gYXJyYXknKTtcbiAgICBwcm9jZWVkID0gZmFsc2U7XG4gIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YS5yb3dzKSkge1xuICAgIGFzc2VydCgncmVjZWl2ZVZpc0RhdGE6IGV4cGVjdCBkYXRhLnJvd3MgdG8gYmUgYW4gYXJyYXknKTtcbiAgICBwcm9jZWVkID0gZmFsc2U7XG4gIH1cblxuICBpZiAoIXByb2NlZWQpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IHtmaWVsZHMsIHJvd3N9ID0gZGF0YTtcblxuICAvLyBjaGVjayBpZiBhbGwgZmllbGRzIGhhcyBuYW1lLCBmb3JtYXQgYW5kIHR5cGVcbiAgY29uc3QgYWxsVmFsaWQgPSBmaWVsZHMuZXZlcnkoKGYsIGkpID0+IHtcbiAgICBpZiAodHlwZW9mIGYgIT09ICdvYmplY3QnKSB7XG4gICAgICBhc3NlcnQoYGZpZWxkcyBuZWVkcyB0byBiZSBhbiBhcnJheSBvZiBvYmplY3QsIGJ1dCBmaW5kICR7Zn1gKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIWYubmFtZSkge1xuICAgICAgYXNzZXJ0KFxuICAgICAgICBgZmllbGQubmFtZSBpcyByZXF1aXJlZCBidXQgbWlzc2luZyBpbiBmaWVsZCAke0pTT04uc3RyaW5naWZ5KGYpfWBcbiAgICAgICk7XG4gICAgICAvLyBhc3NpZ24gYSBuYW1lXG4gICAgICBmLm5hbWUgPSBgY29sdW1uXyR7aX1gO1xuICAgIH1cblxuICAgIGlmICghQUxMX0ZJRUxEX1RZUEVTW2YudHlwZV0pIHtcbiAgICAgIGFzc2VydChgdW5rbm93biBmaWVsZCB0eXBlICR7Zi50eXBlfWApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBmLnR5cGUgIT09IEFMTF9GSUVMRF9UWVBFUy50aW1lc3RhbXAgfHwgdHlwZW9mIGYuZm9ybWF0ID09PSAnc3RyaW5nJztcbiAgfSk7XG5cbiAgaWYgKGFsbFZhbGlkKSB7XG4gICAgcmV0dXJuIHtyb3dzLCBmaWVsZHN9O1xuICB9XG5cbiAgLy8gaWYgYW55IGZpZWxkIGhhcyBtaXNzaW5nIHR5cGUsIHJlY2FsY3VsYXRlIGl0IGZvciBldmVyeW9uZVxuICAvLyBiZWNhdXNlIHdlIHNpbXBseSBsb3N0IGZhaXRoIGluIGh1bWFuaXR5XG4gIGNvbnN0IHNhbXBsZURhdGEgPSBnZXRTYW1wbGVGb3JUeXBlQW5hbHl6ZSh7ZmllbGRzOiBmaWVsZHMubWFwKGYgPT4gZi5uYW1lKSwgYWxsRGF0YTogcm93c30pO1xuICBjb25zdCBmaWVsZE9yZGVyID0gZmllbGRzLm1hcChmID0+IGYubmFtZSk7XG4gIGNvbnN0IG1ldGEgPSBnZXRGaWVsZHNGcm9tRGF0YShzYW1wbGVEYXRhLCBmaWVsZE9yZGVyKTtcbiAgY29uc3QgdXBkYXRlZEZpZWxkcyA9IGZpZWxkcy5tYXAoKGYsIGkpID0+ICh7XG4gICAgLi4uZixcbiAgICB0eXBlOiBtZXRhW2ldLnR5cGUsXG4gICAgZm9ybWF0OiBtZXRhW2ldLmZvcm1hdFxuICB9KSk7XG5cbiAgcmV0dXJuIHtmaWVsZHM6IHVwZGF0ZWRGaWVsZHMsIHJvd3N9O1xufVxuXG4vKipcbiAqIFByb2Nlc3Mga2VwbGVyLmdsIGpzb24gdG8gYmUgbG9hZCBieSBhZGREYXRhVG9NYXBcbiAqIEBwYXJhbSB7T2JqZWN0fSByYXdEYXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzS2VwbGVyZ2xKU09OKHJhd0RhdGEpIHtcbiAgcmV0dXJuIHJhd0RhdGFcbiAgICA/IEtlcGxlckdsU2NoZW1hLmxvYWQocmF3RGF0YS5kYXRhc2V0cywgcmF3RGF0YS5jb25maWcpXG4gICAgOiBudWxsO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHByb2Nlc3NHZW9qc29uLFxuICBwcm9jZXNzQ3N2RGF0YSxcbiAgcHJvY2Vzc1Jvd09iamVjdCxcbiAgcHJvY2Vzc0tlcGxlcmdsSlNPTixcbiAgYW5hbHl6ZXJUeXBlVG9GaWVsZFR5cGUsXG4gIGdldEZpZWxkc0Zyb21EYXRhLFxuICBwYXJzZUNzdkRhdGFCeUZpZWxkVHlwZVxufTtcbiJdfQ==