"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultFilter = getDefaultFilter;
exports.getFilterProps = getFilterProps;
exports.getFieldDomain = getFieldDomain;
exports.filterData = filterData;
exports.isDataMatchFilter = isDataMatchFilter;
exports.adjustValueToFilterDomain = adjustValueToFilterDomain;
exports.getNumericFieldDomain = getNumericFieldDomain;
exports.getTimestampFieldDomain = getTimestampFieldDomain;
exports.histogramConstruct = histogramConstruct;
exports.formatNumberByStep = formatNumberByStep;
exports.isInRange = isInRange;
exports.getTimeWidgetTitleFormatter = getTimeWidgetTitleFormatter;
exports.getTimeWidgetHintFormatter = getTimeWidgetHintFormatter;
exports.isValidFilterValue = isValidFilterValue;
exports.getFilterPlot = getFilterPlot;
exports.getDefaultFilterPlotType = getDefaultFilterPlotType;
exports.TIME_ANIMATION_SPEED = exports.BASE_SPEED = exports.FILTER_COMPONENTS = exports.PLOT_TYPES = exports.FILTER_TYPES = exports.enlargedHistogramBins = exports.histogramBins = exports.TimestampStepMap = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _moment = _interopRequireDefault(require("moment"));

var _d3Array = require("d3-array");

var _keymirror = _interopRequireDefault(require("keymirror"));

var _defaultSettings = require("../constants/default-settings");

var _dataUtils = require("./data-utils");

var ScaleUtils = _interopRequireWildcard(require("./data-scale-utils"));

var _utils = require("./utils");

var _FILTER_TYPES$timeRan, _FILTER_TYPES$range, _SupportedPlotType, _FILTER_COMPONENTS;

var TimestampStepMap = [{
  max: 1,
  step: 0.05
}, {
  max: 10,
  step: 0.1
}, {
  max: 100,
  step: 1
}, {
  max: 500,
  step: 5
}, {
  max: 1000,
  step: 10
}, {
  max: 5000,
  step: 50
}, {
  max: Number.POSITIVE_INFINITY,
  step: 1000
}];
exports.TimestampStepMap = TimestampStepMap;
var histogramBins = 30;
exports.histogramBins = histogramBins;
var enlargedHistogramBins = 100;
exports.enlargedHistogramBins = enlargedHistogramBins;
var durationSecond = 1000;
var durationMinute = durationSecond * 60;
var durationHour = durationMinute * 60;
var durationDay = durationHour * 24;
var durationWeek = durationDay * 7;
var durationYear = durationDay * 365;
var FILTER_TYPES = (0, _keymirror.default)({
  range: null,
  select: null,
  timeRange: null,
  multiSelect: null
});
exports.FILTER_TYPES = FILTER_TYPES;
var PLOT_TYPES = (0, _keymirror.default)({
  histogram: null,
  lineChart: null
});
exports.PLOT_TYPES = PLOT_TYPES;
var SupportedPlotType = (_SupportedPlotType = {}, (0, _defineProperty2.default)(_SupportedPlotType, FILTER_TYPES.timeRange, (_FILTER_TYPES$timeRan = {
  default: 'histogram'
}, (0, _defineProperty2.default)(_FILTER_TYPES$timeRan, _defaultSettings.ALL_FIELD_TYPES.integer, 'lineChart'), (0, _defineProperty2.default)(_FILTER_TYPES$timeRan, _defaultSettings.ALL_FIELD_TYPES.real, 'lineChart'), _FILTER_TYPES$timeRan)), (0, _defineProperty2.default)(_SupportedPlotType, FILTER_TYPES.range, (_FILTER_TYPES$range = {
  default: 'histogram'
}, (0, _defineProperty2.default)(_FILTER_TYPES$range, _defaultSettings.ALL_FIELD_TYPES.integer, 'lineChart'), (0, _defineProperty2.default)(_FILTER_TYPES$range, _defaultSettings.ALL_FIELD_TYPES.real, 'lineChart'), _FILTER_TYPES$range)), _SupportedPlotType);
var FILTER_COMPONENTS = (_FILTER_COMPONENTS = {}, (0, _defineProperty2.default)(_FILTER_COMPONENTS, FILTER_TYPES.select, 'SingleSelectFilter'), (0, _defineProperty2.default)(_FILTER_COMPONENTS, FILTER_TYPES.multiSelect, 'MultiSelectFilter'), (0, _defineProperty2.default)(_FILTER_COMPONENTS, FILTER_TYPES.timeRange, 'TimeRangeFilter'), (0, _defineProperty2.default)(_FILTER_COMPONENTS, FILTER_TYPES.range, 'RangeFilter'), _FILTER_COMPONENTS);
exports.FILTER_COMPONENTS = FILTER_COMPONENTS;
var BASE_SPEED = 600;
exports.BASE_SPEED = BASE_SPEED;
var TIME_ANIMATION_SPEED = [{
  label: '0.5x',
  value: 0.5
}, {
  label: '1x',
  value: 1
}, {
  label: '2x',
  value: 2
}, {
  label: '4x',
  value: 4
}];
exports.TIME_ANIMATION_SPEED = TIME_ANIMATION_SPEED;

function getDefaultFilter(dataId) {
  return {
    // link to dataset Id
    dataId: dataId,
    // should allow to edit dataId
    freeze: false,
    id: (0, _utils.generateHashId)(4),
    // time range filter specific
    fixedDomain: false,
    enlarged: false,
    isAnimating: false,
    speed: 1,
    // field specific
    name: null,
    type: null,
    fieldIdx: null,
    domain: null,
    value: null,
    // plot
    plotType: PLOT_TYPES.histogram,
    yAxis: null,
    interval: null
  };
}
/**
 * Get default filter prop based on field type
 *
 * @param {Object[]} data
 * @param {object} field
 * @returns {object} default filter
 */


function getFilterProps(data, field) {
  var filterProp = (0, _objectSpread2.default)({}, getFieldDomain(data, field), {
    fieldType: field.type
  });

  switch (field.type) {
    case _defaultSettings.ALL_FIELD_TYPES.real:
    case _defaultSettings.ALL_FIELD_TYPES.integer:
      return (0, _objectSpread2.default)({}, filterProp, {
        value: filterProp.domain,
        type: FILTER_TYPES.range,
        typeOptions: [FILTER_TYPES.range]
      });

    case _defaultSettings.ALL_FIELD_TYPES.boolean:
      return (0, _objectSpread2.default)({}, filterProp, {
        type: FILTER_TYPES.select,
        value: true
      });

    case _defaultSettings.ALL_FIELD_TYPES.string:
    case _defaultSettings.ALL_FIELD_TYPES.date:
      return (0, _objectSpread2.default)({}, filterProp, {
        type: FILTER_TYPES.multiSelect,
        value: []
      });

    case _defaultSettings.ALL_FIELD_TYPES.timestamp:
      return (0, _objectSpread2.default)({}, filterProp, {
        type: FILTER_TYPES.timeRange,
        enlarged: true,
        fixedDomain: true,
        value: filterProp.domain
      });

    default:
      return {};
  }
}
/**
 * Calculate field domain based on field type and data
 *
 * @param {Object[]} data
 * @param {object} field
 * @returns {object} with domain as key
 */


function getFieldDomain(data, field) {
  var fieldIdx = field.tableFieldIndex - 1;
  var isTime = field.type === _defaultSettings.ALL_FIELD_TYPES.timestamp;

  var valueAccessor = _dataUtils.maybeToDate.bind(null, isTime, fieldIdx, field.format);

  var domain;

  switch (field.type) {
    case _defaultSettings.ALL_FIELD_TYPES.real:
    case _defaultSettings.ALL_FIELD_TYPES.integer:
      // calculate domain and step
      return getNumericFieldDomain(data, valueAccessor);

    case _defaultSettings.ALL_FIELD_TYPES.boolean:
      return {
        domain: [true, false]
      };

    case _defaultSettings.ALL_FIELD_TYPES.string:
    case _defaultSettings.ALL_FIELD_TYPES.date:
      domain = ScaleUtils.getOrdinalDomain(data, valueAccessor);
      return {
        domain: domain
      };

    case _defaultSettings.ALL_FIELD_TYPES.timestamp:
      return getTimestampFieldDomain(data, valueAccessor);

    default:
      return {
        domain: ScaleUtils.getOrdinalDomain(data, valueAccessor)
      };
  }
}
/**
 * Filter data based on an array of filters
 *
 * @param {Object[]} data
 * @param {string} dataId
 * @param {Object[]} filters
 * @returns {Object[]} data
 * @returns {Number[]} filteredIndex
 */


function filterData(data, dataId, filters) {
  if (!data || !dataId) {
    // why would there not be any data? are we over doing this?
    return {
      data: [],
      filteredIndex: []
    };
  }

  if (!filters.length) {
    return {
      data: data,
      filteredIndex: data.map(function (d, i) {
        return i;
      })
    };
  }

  var appliedFilters = filters.filter(function (d) {
    return d.dataId === dataId && d.fieldIdx > -1 && d.value !== null;
  });

  var _appliedFilters$reduc = appliedFilters.reduce(function (accu, f) {
    if (f.dataId === dataId && f.fieldIdx > -1 && f.value !== null) {
      (f.fixedDomain ? accu[1] : accu[0]).push(f);
    }

    return accu;
  }, [[], []]),
      _appliedFilters$reduc2 = (0, _slicedToArray2.default)(_appliedFilters$reduc, 2),
      dynamicDomainFilters = _appliedFilters$reduc2[0],
      fixedDomainFilters = _appliedFilters$reduc2[1]; // console.log(dynamicDomainFilters)
  // console.log(fixedDomainFilters)
  // we save a reference of allData index here to access dataToFeature
  // in geojson and hexgonId layer
  // console.time('filterData');


  var _data$reduce = data.reduce(function (accu, d, i) {
    // generate 2 sets of
    // filter data used to calculate layer Domain
    var matchForDomain = dynamicDomainFilters.every(function (filter) {
      return isDataMatchFilter(d, filter, i);
    });

    if (matchForDomain) {
      accu.filteredIndexForDomain.push(i); // filter data for render

      var matchForRender = fixedDomainFilters.every(function (filter) {
        return isDataMatchFilter(d, filter, i);
      });

      if (matchForRender) {
        accu.filtered.push(d);
        accu.filteredIndex.push(i);
      }
    }

    return accu;
  }, {
    filtered: [],
    filteredIndex: [],
    filteredIndexForDomain: []
  }),
      filtered = _data$reduce.filtered,
      filteredIndex = _data$reduce.filteredIndex,
      filteredIndexForDomain = _data$reduce.filteredIndexForDomain; // console.log('data==', data.length)
  // console.log('filtered==', filtered.length)
  // console.log('filteredIndex==', filteredIndex.length)
  // console.log('filteredIndexForDomain==', filteredIndexForDomain.length)
  //
  // console.timeEnd('filterData');


  return {
    data: filtered,
    filteredIndex: filteredIndex,
    filteredIndexForDomain: filteredIndexForDomain
  };
}
/**
 * Check if value is in range of filter
 *
 * @param {Object[]} data
 * @param {Object} filter
 * @param {number} i
 * @returns {Boolean} - whether value falls in the range of the filter
 */


function isDataMatchFilter(data, filter, i) {
  var val = data[filter.fieldIdx];

  if (!filter.type) {
    return true;
  }

  switch (filter.type) {
    case FILTER_TYPES.range:
      return isInRange(val, filter.value);

    case FILTER_TYPES.timeRange:
      var timeVal = filter.mappedValue ? filter.mappedValue[i] : _moment.default.utc(val).valueOf();
      return isInRange(timeVal, filter.value);

    case FILTER_TYPES.multiSelect:
      return filter.value.includes(val);

    case FILTER_TYPES.select:
      return filter.value === val;

    default:
      return true;
  }
}
/**
 * Call by parsing filters from URL
 * Check if value of filter within filter domain, if not adjust it to match
 * filter domain
 *
 * @param {string[] | string | number | number[]} value
 * @param {Array} filter.domain
 * @param {String} filter.type
 * @returns {*} - adjusted value to match filter or null to remove filter
 */

/* eslint-disable complexity */


function adjustValueToFilterDomain(value, _ref) {
  var domain = _ref.domain,
      type = _ref.type;

  if (!domain || !type) {
    return false;
  }

  switch (type) {
    case FILTER_TYPES.range:
    case FILTER_TYPES.timeRange:
      if (!Array.isArray(value) || value.length !== 2) {
        return domain.map(function (d) {
          return d;
        });
      }

      return value.map(function (d, i) {
        return (0, _dataUtils.notNullorUndefined)(d) && isInRange(d, domain) ? d : domain[i];
      });

    case FILTER_TYPES.multiSelect:
      if (!Array.isArray(value)) {
        return [];
      }

      var filteredValue = value.filter(function (d) {
        return domain.includes(d);
      });
      return filteredValue.length ? filteredValue : [];

    case FILTER_TYPES.select:
      return domain.includes(value) ? value : true;

    default:
      return null;
  }
}
/* eslint-enable complexity */

/**
 * Calculate numeric domain and suitable step
 *
 * @param {Object[]} data
 * @param {function} valueAccessor
 * @returns {object} domain and step
 */


function getNumericFieldDomain(data, valueAccessor) {
  var domain = [0, 1];
  var step = 0.1;
  var mappedValue = Array.isArray(data) ? data.map(valueAccessor) : [];

  if (Array.isArray(data) && data.length > 1) {
    domain = ScaleUtils.getLinearDomain(mappedValue);
    var diff = domain[1] - domain[0]; // in case equal domain, [96, 96], which will break quantize scale

    if (!diff) {
      domain[1] = domain[0] + 1;
    }

    step = getNumericStepSize(diff) || step;
    domain[0] = formatNumberByStep(domain[0], step, 'floor');
    domain[1] = formatNumberByStep(domain[1], step, 'ceil');
  }

  var _getHistogram = getHistogram(domain, mappedValue),
      histogram = _getHistogram.histogram,
      enlargedHistogram = _getHistogram.enlargedHistogram;

  return {
    domain: domain,
    step: step,
    histogram: histogram,
    enlargedHistogram: enlargedHistogram
  };
}

function getNumericStepSize(diff) {
  if (diff > 100) {
    return 1;
  } else if (diff < 20 && diff > 3) {
    return 0.01;
  } else if (diff <= 3) {
    return 0.001;
  }
}
/**
 * Calculate timestamp domain and suitable step
 *
 * @param {Object[]} data
 * @param {function} valueAccessor
 * @returns {object} domain and step
 */


function getTimestampFieldDomain(data, valueAccessor) {
  // to avoid converting string format time to epoch
  // every time we compare we store a value mapped to int in filter domain
  var mappedValue = Array.isArray(data) ? data.map(valueAccessor) : [];
  var domain = ScaleUtils.getLinearDomain(mappedValue);
  var step = 0.01;
  var diff = domain[1] - domain[0];
  var entry = TimestampStepMap.find(function (f) {
    return f.max >= diff;
  });

  if (entry) {
    step = entry.step;
  }

  var _getHistogram2 = getHistogram(domain, mappedValue),
      histogram = _getHistogram2.histogram,
      enlargedHistogram = _getHistogram2.enlargedHistogram;

  return {
    domain: domain,
    step: step,
    mappedValue: mappedValue,
    histogram: histogram,
    enlargedHistogram: enlargedHistogram
  };
}

function histogramConstruct(domain, mappedValue, bins) {
  return (0, _d3Array.histogram)().thresholds((0, _d3Array.ticks)(domain[0], domain[1], bins)).domain(domain)(mappedValue).map(function (bin) {
    return {
      count: bin.length,
      x0: bin.x0,
      x1: bin.x1
    };
  });
}
/**
 * Calculate histogram from domain and array of values
 *
 * @param {number[]} domain
 * @param {Object[]} mappedValue
 * @returns {Array[]} histogram
 */


function getHistogram(domain, mappedValue) {
  var histogram = histogramConstruct(domain, mappedValue, histogramBins);
  var enlargedHistogram = histogramConstruct(domain, mappedValue, enlargedHistogramBins);
  return {
    histogram: histogram,
    enlargedHistogram: enlargedHistogram
  };
}
/**
 * round number based on step
 *
 * @param {number} val
 * @param {number} step
 * @param {string} bound
 * @returns {number} rounded number
 */


function formatNumberByStep(val, step, bound) {
  if (bound === 'floor') {
    return Math.floor(val * (1 / step)) / (1 / step);
  }

  return Math.ceil(val * (1 / step)) / (1 / step);
}

function isInRange(val, domain) {
  if (!Array.isArray(domain)) {
    return false;
  }

  return val >= domain[0] && val <= domain[1];
}

function getTimeWidgetTitleFormatter(domain) {
  if (!Array.isArray(domain)) {
    return null;
  }

  var diff = domain[1] - domain[0];
  return diff > durationYear ? 'MM/DD/YY' : diff > durationDay ? 'MM/DD hha' : 'MM/DD hh:mma';
}

function getTimeWidgetHintFormatter(domain) {
  if (!Array.isArray(domain)) {
    return null;
  }

  var diff = domain[1] - domain[0];
  return diff > durationYear ? 'MM/DD/YY' : diff > durationWeek ? 'MM/DD' : diff > durationDay ? 'MM/DD hha' : diff > durationHour ? 'hh:mma' : 'hh:mm:ssa';
}
/**
 * Sanity check on filters to prepare for save
 * @param {String} type - filter type
 * @param {*} value - filter value
 * @returns {boolean} whether filter is value
 */


function isValidFilterValue(_ref2) {
  var type = _ref2.type,
      value = _ref2.value;

  if (!type) {
    return false;
  }

  switch (type) {
    case FILTER_TYPES.select:
      return value === true || value === false;

    case FILTER_TYPES.range:
    case FILTER_TYPES.timeRange:
      return Array.isArray(value) && value.every(function (v) {
        return v !== null && !isNaN(v);
      });

    case FILTER_TYPES.multiSelect:
      return Array.isArray(value) && Boolean(value.length);

    case FILTER_TYPES.input:
      return Boolean(value.length);

    default:
      return true;
  }
}

function getFilterPlot(filter, allData) {
  if (filter.plotType === PLOT_TYPES.histogram || !filter.yAxis) {
    // histogram should be calculated when create filter
    return {};
  }

  var mappedValue = filter.mappedValue;
  var yAxis = filter.yAxis; // return lineChart

  var series = allData.map(function (d, i) {
    return {
      x: mappedValue[i],
      y: d[yAxis.tableFieldIndex - 1]
    };
  }).filter(function (_ref3) {
    var x = _ref3.x,
        y = _ref3.y;
    return Number.isFinite(x) && Number.isFinite(y);
  }).sort(function (a, b) {
    return (0, _d3Array.ascending)(a.x, b.x);
  });
  var yDomain = (0, _d3Array.extent)(series, function (d) {
    return d.y;
  });
  var xDomain = [series[0].x, series[series.length - 1].x];
  return {
    lineChart: {
      series: series,
      yDomain: yDomain,
      xDomain: xDomain
    },
    yAxis: yAxis
  };
}

function getDefaultFilterPlotType(filter) {
  var filterPlotTypes = SupportedPlotType[filter.type];

  if (!filterPlotTypes) {
    return null;
  }

  if (!filter.yAxis) {
    return filterPlotTypes.default;
  }

  return filterPlotTypes[filter.yAxis.type] || null;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9maWx0ZXItdXRpbHMuanMiXSwibmFtZXMiOlsiVGltZXN0YW1wU3RlcE1hcCIsIm1heCIsInN0ZXAiLCJOdW1iZXIiLCJQT1NJVElWRV9JTkZJTklUWSIsImhpc3RvZ3JhbUJpbnMiLCJlbmxhcmdlZEhpc3RvZ3JhbUJpbnMiLCJkdXJhdGlvblNlY29uZCIsImR1cmF0aW9uTWludXRlIiwiZHVyYXRpb25Ib3VyIiwiZHVyYXRpb25EYXkiLCJkdXJhdGlvbldlZWsiLCJkdXJhdGlvblllYXIiLCJGSUxURVJfVFlQRVMiLCJyYW5nZSIsInNlbGVjdCIsInRpbWVSYW5nZSIsIm11bHRpU2VsZWN0IiwiUExPVF9UWVBFUyIsImhpc3RvZ3JhbSIsImxpbmVDaGFydCIsIlN1cHBvcnRlZFBsb3RUeXBlIiwiZGVmYXVsdCIsIkFMTF9GSUVMRF9UWVBFUyIsImludGVnZXIiLCJyZWFsIiwiRklMVEVSX0NPTVBPTkVOVFMiLCJCQVNFX1NQRUVEIiwiVElNRV9BTklNQVRJT05fU1BFRUQiLCJsYWJlbCIsInZhbHVlIiwiZ2V0RGVmYXVsdEZpbHRlciIsImRhdGFJZCIsImZyZWV6ZSIsImlkIiwiZml4ZWREb21haW4iLCJlbmxhcmdlZCIsImlzQW5pbWF0aW5nIiwic3BlZWQiLCJuYW1lIiwidHlwZSIsImZpZWxkSWR4IiwiZG9tYWluIiwicGxvdFR5cGUiLCJ5QXhpcyIsImludGVydmFsIiwiZ2V0RmlsdGVyUHJvcHMiLCJkYXRhIiwiZmllbGQiLCJmaWx0ZXJQcm9wIiwiZ2V0RmllbGREb21haW4iLCJmaWVsZFR5cGUiLCJ0eXBlT3B0aW9ucyIsImJvb2xlYW4iLCJzdHJpbmciLCJkYXRlIiwidGltZXN0YW1wIiwidGFibGVGaWVsZEluZGV4IiwiaXNUaW1lIiwidmFsdWVBY2Nlc3NvciIsIm1heWJlVG9EYXRlIiwiYmluZCIsImZvcm1hdCIsImdldE51bWVyaWNGaWVsZERvbWFpbiIsIlNjYWxlVXRpbHMiLCJnZXRPcmRpbmFsRG9tYWluIiwiZ2V0VGltZXN0YW1wRmllbGREb21haW4iLCJmaWx0ZXJEYXRhIiwiZmlsdGVycyIsImZpbHRlcmVkSW5kZXgiLCJsZW5ndGgiLCJtYXAiLCJkIiwiaSIsImFwcGxpZWRGaWx0ZXJzIiwiZmlsdGVyIiwicmVkdWNlIiwiYWNjdSIsImYiLCJwdXNoIiwiZHluYW1pY0RvbWFpbkZpbHRlcnMiLCJmaXhlZERvbWFpbkZpbHRlcnMiLCJtYXRjaEZvckRvbWFpbiIsImV2ZXJ5IiwiaXNEYXRhTWF0Y2hGaWx0ZXIiLCJmaWx0ZXJlZEluZGV4Rm9yRG9tYWluIiwibWF0Y2hGb3JSZW5kZXIiLCJmaWx0ZXJlZCIsInZhbCIsImlzSW5SYW5nZSIsInRpbWVWYWwiLCJtYXBwZWRWYWx1ZSIsIm1vbWVudCIsInV0YyIsInZhbHVlT2YiLCJpbmNsdWRlcyIsImFkanVzdFZhbHVlVG9GaWx0ZXJEb21haW4iLCJBcnJheSIsImlzQXJyYXkiLCJmaWx0ZXJlZFZhbHVlIiwiZ2V0TGluZWFyRG9tYWluIiwiZGlmZiIsImdldE51bWVyaWNTdGVwU2l6ZSIsImZvcm1hdE51bWJlckJ5U3RlcCIsImdldEhpc3RvZ3JhbSIsImVubGFyZ2VkSGlzdG9ncmFtIiwiZW50cnkiLCJmaW5kIiwiaGlzdG9ncmFtQ29uc3RydWN0IiwiYmlucyIsInRocmVzaG9sZHMiLCJiaW4iLCJjb3VudCIsIngwIiwieDEiLCJib3VuZCIsIk1hdGgiLCJmbG9vciIsImNlaWwiLCJnZXRUaW1lV2lkZ2V0VGl0bGVGb3JtYXR0ZXIiLCJnZXRUaW1lV2lkZ2V0SGludEZvcm1hdHRlciIsImlzVmFsaWRGaWx0ZXJWYWx1ZSIsInYiLCJpc05hTiIsIkJvb2xlYW4iLCJpbnB1dCIsImdldEZpbHRlclBsb3QiLCJhbGxEYXRhIiwic2VyaWVzIiwieCIsInkiLCJpc0Zpbml0ZSIsInNvcnQiLCJhIiwiYiIsInlEb21haW4iLCJ4RG9tYWluIiwiZ2V0RGVmYXVsdEZpbHRlclBsb3RUeXBlIiwiZmlsdGVyUGxvdFR5cGVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFTyxJQUFNQSxnQkFBZ0IsR0FBRyxDQUM5QjtBQUFDQyxFQUFBQSxHQUFHLEVBQUUsQ0FBTjtBQUFTQyxFQUFBQSxJQUFJLEVBQUU7QUFBZixDQUQ4QixFQUU5QjtBQUFDRCxFQUFBQSxHQUFHLEVBQUUsRUFBTjtBQUFVQyxFQUFBQSxJQUFJLEVBQUU7QUFBaEIsQ0FGOEIsRUFHOUI7QUFBQ0QsRUFBQUEsR0FBRyxFQUFFLEdBQU47QUFBV0MsRUFBQUEsSUFBSSxFQUFFO0FBQWpCLENBSDhCLEVBSTlCO0FBQUNELEVBQUFBLEdBQUcsRUFBRSxHQUFOO0FBQVdDLEVBQUFBLElBQUksRUFBRTtBQUFqQixDQUo4QixFQUs5QjtBQUFDRCxFQUFBQSxHQUFHLEVBQUUsSUFBTjtBQUFZQyxFQUFBQSxJQUFJLEVBQUU7QUFBbEIsQ0FMOEIsRUFNOUI7QUFBQ0QsRUFBQUEsR0FBRyxFQUFFLElBQU47QUFBWUMsRUFBQUEsSUFBSSxFQUFFO0FBQWxCLENBTjhCLEVBTzlCO0FBQUNELEVBQUFBLEdBQUcsRUFBRUUsTUFBTSxDQUFDQyxpQkFBYjtBQUFnQ0YsRUFBQUEsSUFBSSxFQUFFO0FBQXRDLENBUDhCLENBQXpCOztBQVVBLElBQU1HLGFBQWEsR0FBRyxFQUF0Qjs7QUFDQSxJQUFNQyxxQkFBcUIsR0FBRyxHQUE5Qjs7QUFFUCxJQUFNQyxjQUFjLEdBQUcsSUFBdkI7QUFDQSxJQUFNQyxjQUFjLEdBQUdELGNBQWMsR0FBRyxFQUF4QztBQUNBLElBQU1FLFlBQVksR0FBR0QsY0FBYyxHQUFHLEVBQXRDO0FBQ0EsSUFBTUUsV0FBVyxHQUFHRCxZQUFZLEdBQUcsRUFBbkM7QUFDQSxJQUFNRSxZQUFZLEdBQUdELFdBQVcsR0FBRyxDQUFuQztBQUNBLElBQU1FLFlBQVksR0FBR0YsV0FBVyxHQUFHLEdBQW5DO0FBRU8sSUFBTUcsWUFBWSxHQUFHLHdCQUFVO0FBQ3BDQyxFQUFBQSxLQUFLLEVBQUUsSUFENkI7QUFFcENDLEVBQUFBLE1BQU0sRUFBRSxJQUY0QjtBQUdwQ0MsRUFBQUEsU0FBUyxFQUFFLElBSHlCO0FBSXBDQyxFQUFBQSxXQUFXLEVBQUU7QUFKdUIsQ0FBVixDQUFyQjs7QUFPQSxJQUFNQyxVQUFVLEdBQUcsd0JBQVU7QUFDbENDLEVBQUFBLFNBQVMsRUFBRSxJQUR1QjtBQUVsQ0MsRUFBQUEsU0FBUyxFQUFFO0FBRnVCLENBQVYsQ0FBbkI7O0FBS1AsSUFBTUMsaUJBQWlCLCtFQUNwQlIsWUFBWSxDQUFDRyxTQURPO0FBRW5CTSxFQUFBQSxPQUFPLEVBQUU7QUFGVSx3REFHbEJDLGlDQUFnQkMsT0FIRSxFQUdRLFdBSFIsd0RBSWxCRCxpQ0FBZ0JFLElBSkUsRUFJSyxXQUpMLDhFQU1wQlosWUFBWSxDQUFDQyxLQU5PO0FBT25CUSxFQUFBQSxPQUFPLEVBQUU7QUFQVSxzREFRbEJDLGlDQUFnQkMsT0FSRSxFQVFRLFdBUlIsc0RBU2xCRCxpQ0FBZ0JFLElBVEUsRUFTSyxXQVRMLDZDQUF2QjtBQWFPLElBQU1DLGlCQUFpQiwrRUFDM0JiLFlBQVksQ0FBQ0UsTUFEYyxFQUNMLG9CQURLLHFEQUUzQkYsWUFBWSxDQUFDSSxXQUZjLEVBRUEsbUJBRkEscURBRzNCSixZQUFZLENBQUNHLFNBSGMsRUFHRixpQkFIRSxxREFJM0JILFlBQVksQ0FBQ0MsS0FKYyxFQUlOLGFBSk0sc0JBQXZCOztBQU9BLElBQU1hLFVBQVUsR0FBRyxHQUFuQjs7QUFDQSxJQUFNQyxvQkFBb0IsR0FBRyxDQUNsQztBQUNFQyxFQUFBQSxLQUFLLEVBQUUsTUFEVDtBQUVFQyxFQUFBQSxLQUFLLEVBQUU7QUFGVCxDQURrQyxFQUtsQztBQUNFRCxFQUFBQSxLQUFLLEVBQUUsSUFEVDtBQUVFQyxFQUFBQSxLQUFLLEVBQUU7QUFGVCxDQUxrQyxFQVNsQztBQUNFRCxFQUFBQSxLQUFLLEVBQUUsSUFEVDtBQUVFQyxFQUFBQSxLQUFLLEVBQUU7QUFGVCxDQVRrQyxFQWFsQztBQUNFRCxFQUFBQSxLQUFLLEVBQUUsSUFEVDtBQUVFQyxFQUFBQSxLQUFLLEVBQUU7QUFGVCxDQWJrQyxDQUE3Qjs7O0FBbUJBLFNBQVNDLGdCQUFULENBQTBCQyxNQUExQixFQUFrQztBQUN2QyxTQUFPO0FBQ0w7QUFDQUEsSUFBQUEsTUFBTSxFQUFOQSxNQUZLO0FBR0w7QUFDQUMsSUFBQUEsTUFBTSxFQUFFLEtBSkg7QUFLTEMsSUFBQUEsRUFBRSxFQUFFLDJCQUFlLENBQWYsQ0FMQztBQU9MO0FBQ0FDLElBQUFBLFdBQVcsRUFBRSxLQVJSO0FBU0xDLElBQUFBLFFBQVEsRUFBRSxLQVRMO0FBVUxDLElBQUFBLFdBQVcsRUFBRSxLQVZSO0FBV0xDLElBQUFBLEtBQUssRUFBRSxDQVhGO0FBYUw7QUFDQUMsSUFBQUEsSUFBSSxFQUFFLElBZEQ7QUFlTEMsSUFBQUEsSUFBSSxFQUFFLElBZkQ7QUFnQkxDLElBQUFBLFFBQVEsRUFBRSxJQWhCTDtBQWlCTEMsSUFBQUEsTUFBTSxFQUFFLElBakJIO0FBa0JMWixJQUFBQSxLQUFLLEVBQUUsSUFsQkY7QUFvQkw7QUFDQWEsSUFBQUEsUUFBUSxFQUFFekIsVUFBVSxDQUFDQyxTQXJCaEI7QUFzQkx5QixJQUFBQSxLQUFLLEVBQUUsSUF0QkY7QUF1QkxDLElBQUFBLFFBQVEsRUFBRTtBQXZCTCxHQUFQO0FBeUJEO0FBRUQ7Ozs7Ozs7OztBQU9PLFNBQVNDLGNBQVQsQ0FBd0JDLElBQXhCLEVBQThCQyxLQUE5QixFQUFxQztBQUMxQyxNQUFNQyxVQUFVLG1DQUNYQyxjQUFjLENBQUNILElBQUQsRUFBT0MsS0FBUCxDQURIO0FBRWRHLElBQUFBLFNBQVMsRUFBRUgsS0FBSyxDQUFDUjtBQUZILElBQWhCOztBQUtBLFVBQVFRLEtBQUssQ0FBQ1IsSUFBZDtBQUNFLFNBQUtqQixpQ0FBZ0JFLElBQXJCO0FBQ0EsU0FBS0YsaUNBQWdCQyxPQUFyQjtBQUNFLDZDQUNLeUIsVUFETDtBQUVFbkIsUUFBQUEsS0FBSyxFQUFFbUIsVUFBVSxDQUFDUCxNQUZwQjtBQUdFRixRQUFBQSxJQUFJLEVBQUUzQixZQUFZLENBQUNDLEtBSHJCO0FBSUVzQyxRQUFBQSxXQUFXLEVBQUUsQ0FBQ3ZDLFlBQVksQ0FBQ0MsS0FBZDtBQUpmOztBQU9GLFNBQUtTLGlDQUFnQjhCLE9BQXJCO0FBQ0UsNkNBQ0tKLFVBREw7QUFFRVQsUUFBQUEsSUFBSSxFQUFFM0IsWUFBWSxDQUFDRSxNQUZyQjtBQUdFZSxRQUFBQSxLQUFLLEVBQUU7QUFIVDs7QUFNRixTQUFLUCxpQ0FBZ0IrQixNQUFyQjtBQUNBLFNBQUsvQixpQ0FBZ0JnQyxJQUFyQjtBQUNFLDZDQUNLTixVQURMO0FBRUVULFFBQUFBLElBQUksRUFBRTNCLFlBQVksQ0FBQ0ksV0FGckI7QUFHRWEsUUFBQUEsS0FBSyxFQUFFO0FBSFQ7O0FBTUYsU0FBS1AsaUNBQWdCaUMsU0FBckI7QUFDRSw2Q0FDS1AsVUFETDtBQUVFVCxRQUFBQSxJQUFJLEVBQUUzQixZQUFZLENBQUNHLFNBRnJCO0FBR0VvQixRQUFBQSxRQUFRLEVBQUUsSUFIWjtBQUlFRCxRQUFBQSxXQUFXLEVBQUUsSUFKZjtBQUtFTCxRQUFBQSxLQUFLLEVBQUVtQixVQUFVLENBQUNQO0FBTHBCOztBQVFGO0FBQ0UsYUFBTyxFQUFQO0FBbkNKO0FBcUNEO0FBRUQ7Ozs7Ozs7OztBQU9PLFNBQVNRLGNBQVQsQ0FBd0JILElBQXhCLEVBQThCQyxLQUE5QixFQUFxQztBQUMxQyxNQUFNUCxRQUFRLEdBQUdPLEtBQUssQ0FBQ1MsZUFBTixHQUF3QixDQUF6QztBQUNBLE1BQU1DLE1BQU0sR0FBR1YsS0FBSyxDQUFDUixJQUFOLEtBQWVqQixpQ0FBZ0JpQyxTQUE5Qzs7QUFDQSxNQUFNRyxhQUFhLEdBQUdDLHVCQUFZQyxJQUFaLENBQWlCLElBQWpCLEVBQXVCSCxNQUF2QixFQUErQmpCLFFBQS9CLEVBQXlDTyxLQUFLLENBQUNjLE1BQS9DLENBQXRCOztBQUNBLE1BQUlwQixNQUFKOztBQUVBLFVBQVFNLEtBQUssQ0FBQ1IsSUFBZDtBQUNFLFNBQUtqQixpQ0FBZ0JFLElBQXJCO0FBQ0EsU0FBS0YsaUNBQWdCQyxPQUFyQjtBQUNFO0FBQ0EsYUFBT3VDLHFCQUFxQixDQUFDaEIsSUFBRCxFQUFPWSxhQUFQLENBQTVCOztBQUVGLFNBQUtwQyxpQ0FBZ0I4QixPQUFyQjtBQUNFLGFBQU87QUFBQ1gsUUFBQUEsTUFBTSxFQUFFLENBQUMsSUFBRCxFQUFPLEtBQVA7QUFBVCxPQUFQOztBQUVGLFNBQUtuQixpQ0FBZ0IrQixNQUFyQjtBQUNBLFNBQUsvQixpQ0FBZ0JnQyxJQUFyQjtBQUNFYixNQUFBQSxNQUFNLEdBQUdzQixVQUFVLENBQUNDLGdCQUFYLENBQTRCbEIsSUFBNUIsRUFBa0NZLGFBQWxDLENBQVQ7QUFDQSxhQUFPO0FBQUNqQixRQUFBQSxNQUFNLEVBQU5BO0FBQUQsT0FBUDs7QUFFRixTQUFLbkIsaUNBQWdCaUMsU0FBckI7QUFDRSxhQUFPVSx1QkFBdUIsQ0FBQ25CLElBQUQsRUFBT1ksYUFBUCxDQUE5Qjs7QUFFRjtBQUNFLGFBQU87QUFBQ2pCLFFBQUFBLE1BQU0sRUFBRXNCLFVBQVUsQ0FBQ0MsZ0JBQVgsQ0FBNEJsQixJQUE1QixFQUFrQ1ksYUFBbEM7QUFBVCxPQUFQO0FBbEJKO0FBb0JEO0FBRUQ7Ozs7Ozs7Ozs7O0FBU08sU0FBU1EsVUFBVCxDQUFvQnBCLElBQXBCLEVBQTBCZixNQUExQixFQUFrQ29DLE9BQWxDLEVBQTJDO0FBQ2hELE1BQUksQ0FBQ3JCLElBQUQsSUFBUyxDQUFDZixNQUFkLEVBQXNCO0FBQ3BCO0FBQ0EsV0FBTztBQUFDZSxNQUFBQSxJQUFJLEVBQUUsRUFBUDtBQUFXc0IsTUFBQUEsYUFBYSxFQUFFO0FBQTFCLEtBQVA7QUFDRDs7QUFFRCxNQUFJLENBQUNELE9BQU8sQ0FBQ0UsTUFBYixFQUFxQjtBQUNuQixXQUFPO0FBQUN2QixNQUFBQSxJQUFJLEVBQUpBLElBQUQ7QUFBT3NCLE1BQUFBLGFBQWEsRUFBRXRCLElBQUksQ0FBQ3dCLEdBQUwsQ0FBUyxVQUFDQyxDQUFELEVBQUlDLENBQUo7QUFBQSxlQUFVQSxDQUFWO0FBQUEsT0FBVDtBQUF0QixLQUFQO0FBQ0Q7O0FBRUQsTUFBTUMsY0FBYyxHQUFHTixPQUFPLENBQUNPLE1BQVIsQ0FDckIsVUFBQUgsQ0FBQztBQUFBLFdBQUlBLENBQUMsQ0FBQ3hDLE1BQUYsS0FBYUEsTUFBYixJQUF1QndDLENBQUMsQ0FBQy9CLFFBQUYsR0FBYSxDQUFDLENBQXJDLElBQTBDK0IsQ0FBQyxDQUFDMUMsS0FBRixLQUFZLElBQTFEO0FBQUEsR0FEb0IsQ0FBdkI7O0FBVmdELDhCQWNHNEMsY0FBYyxDQUFDRSxNQUFmLENBQ2pELFVBQUNDLElBQUQsRUFBT0MsQ0FBUCxFQUFhO0FBQ1gsUUFBSUEsQ0FBQyxDQUFDOUMsTUFBRixLQUFhQSxNQUFiLElBQXVCOEMsQ0FBQyxDQUFDckMsUUFBRixHQUFhLENBQUMsQ0FBckMsSUFBMENxQyxDQUFDLENBQUNoRCxLQUFGLEtBQVksSUFBMUQsRUFBZ0U7QUFDOUQsT0FBQ2dELENBQUMsQ0FBQzNDLFdBQUYsR0FBZ0IwQyxJQUFJLENBQUMsQ0FBRCxDQUFwQixHQUEwQkEsSUFBSSxDQUFDLENBQUQsQ0FBL0IsRUFBb0NFLElBQXBDLENBQXlDRCxDQUF6QztBQUNEOztBQUNELFdBQU9ELElBQVA7QUFDRCxHQU5nRCxFQU9qRCxDQUFDLEVBQUQsRUFBSyxFQUFMLENBUGlELENBZEg7QUFBQTtBQUFBLE1BY3pDRyxvQkFkeUM7QUFBQSxNQWNuQkMsa0JBZG1CLDhCQXVCaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBM0JnRCxxQkE2QlVsQyxJQUFJLENBQUM2QixNQUFMLENBQ3hELFVBQUNDLElBQUQsRUFBT0wsQ0FBUCxFQUFVQyxDQUFWLEVBQWdCO0FBQ2Q7QUFDQTtBQUNBLFFBQU1TLGNBQWMsR0FBR0Ysb0JBQW9CLENBQUNHLEtBQXJCLENBQTJCLFVBQUFSLE1BQU07QUFBQSxhQUN0RFMsaUJBQWlCLENBQUNaLENBQUQsRUFBSUcsTUFBSixFQUFZRixDQUFaLENBRHFDO0FBQUEsS0FBakMsQ0FBdkI7O0FBSUEsUUFBSVMsY0FBSixFQUFvQjtBQUNsQkwsTUFBQUEsSUFBSSxDQUFDUSxzQkFBTCxDQUE0Qk4sSUFBNUIsQ0FBaUNOLENBQWpDLEVBRGtCLENBR2xCOztBQUNBLFVBQU1hLGNBQWMsR0FBR0wsa0JBQWtCLENBQUNFLEtBQW5CLENBQXlCLFVBQUFSLE1BQU07QUFBQSxlQUNwRFMsaUJBQWlCLENBQUNaLENBQUQsRUFBSUcsTUFBSixFQUFZRixDQUFaLENBRG1DO0FBQUEsT0FBL0IsQ0FBdkI7O0FBSUEsVUFBSWEsY0FBSixFQUFvQjtBQUNsQlQsUUFBQUEsSUFBSSxDQUFDVSxRQUFMLENBQWNSLElBQWQsQ0FBbUJQLENBQW5CO0FBQ0FLLFFBQUFBLElBQUksQ0FBQ1IsYUFBTCxDQUFtQlUsSUFBbkIsQ0FBd0JOLENBQXhCO0FBQ0Q7QUFDRjs7QUFFRCxXQUFPSSxJQUFQO0FBQ0QsR0F2QnVELEVBd0J4RDtBQUFDVSxJQUFBQSxRQUFRLEVBQUUsRUFBWDtBQUFlbEIsSUFBQUEsYUFBYSxFQUFFLEVBQTlCO0FBQWtDZ0IsSUFBQUEsc0JBQXNCLEVBQUU7QUFBMUQsR0F4QndELENBN0JWO0FBQUEsTUE2QnpDRSxRQTdCeUMsZ0JBNkJ6Q0EsUUE3QnlDO0FBQUEsTUE2Qi9CbEIsYUE3QitCLGdCQTZCL0JBLGFBN0IrQjtBQUFBLE1BNkJoQmdCLHNCQTdCZ0IsZ0JBNkJoQkEsc0JBN0JnQixFQXdEaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQSxTQUFPO0FBQUN0QyxJQUFBQSxJQUFJLEVBQUV3QyxRQUFQO0FBQWlCbEIsSUFBQUEsYUFBYSxFQUFiQSxhQUFqQjtBQUFnQ2dCLElBQUFBLHNCQUFzQixFQUF0QkE7QUFBaEMsR0FBUDtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7QUFRTyxTQUFTRCxpQkFBVCxDQUEyQnJDLElBQTNCLEVBQWlDNEIsTUFBakMsRUFBeUNGLENBQXpDLEVBQTRDO0FBQ2pELE1BQU1lLEdBQUcsR0FBR3pDLElBQUksQ0FBQzRCLE1BQU0sQ0FBQ2xDLFFBQVIsQ0FBaEI7O0FBQ0EsTUFBSSxDQUFDa0MsTUFBTSxDQUFDbkMsSUFBWixFQUFrQjtBQUNoQixXQUFPLElBQVA7QUFDRDs7QUFFRCxVQUFRbUMsTUFBTSxDQUFDbkMsSUFBZjtBQUNFLFNBQUszQixZQUFZLENBQUNDLEtBQWxCO0FBQ0UsYUFBTzJFLFNBQVMsQ0FBQ0QsR0FBRCxFQUFNYixNQUFNLENBQUM3QyxLQUFiLENBQWhCOztBQUVGLFNBQUtqQixZQUFZLENBQUNHLFNBQWxCO0FBQ0UsVUFBTTBFLE9BQU8sR0FBR2YsTUFBTSxDQUFDZ0IsV0FBUCxHQUNaaEIsTUFBTSxDQUFDZ0IsV0FBUCxDQUFtQmxCLENBQW5CLENBRFksR0FFWm1CLGdCQUFPQyxHQUFQLENBQVdMLEdBQVgsRUFBZ0JNLE9BQWhCLEVBRko7QUFHQSxhQUFPTCxTQUFTLENBQUNDLE9BQUQsRUFBVWYsTUFBTSxDQUFDN0MsS0FBakIsQ0FBaEI7O0FBRUYsU0FBS2pCLFlBQVksQ0FBQ0ksV0FBbEI7QUFDRSxhQUFPMEQsTUFBTSxDQUFDN0MsS0FBUCxDQUFhaUUsUUFBYixDQUFzQlAsR0FBdEIsQ0FBUDs7QUFFRixTQUFLM0UsWUFBWSxDQUFDRSxNQUFsQjtBQUNFLGFBQU80RCxNQUFNLENBQUM3QyxLQUFQLEtBQWlCMEQsR0FBeEI7O0FBRUY7QUFDRSxhQUFPLElBQVA7QUFqQko7QUFtQkQ7QUFFRDs7Ozs7Ozs7Ozs7QUFXQTs7O0FBQ08sU0FBU1EseUJBQVQsQ0FBbUNsRSxLQUFuQyxRQUEwRDtBQUFBLE1BQWZZLE1BQWUsUUFBZkEsTUFBZTtBQUFBLE1BQVBGLElBQU8sUUFBUEEsSUFBTzs7QUFDL0QsTUFBSSxDQUFDRSxNQUFELElBQVcsQ0FBQ0YsSUFBaEIsRUFBc0I7QUFDcEIsV0FBTyxLQUFQO0FBQ0Q7O0FBRUQsVUFBUUEsSUFBUjtBQUNFLFNBQUszQixZQUFZLENBQUNDLEtBQWxCO0FBQ0EsU0FBS0QsWUFBWSxDQUFDRyxTQUFsQjtBQUNFLFVBQUksQ0FBQ2lGLEtBQUssQ0FBQ0MsT0FBTixDQUFjcEUsS0FBZCxDQUFELElBQXlCQSxLQUFLLENBQUN3QyxNQUFOLEtBQWlCLENBQTlDLEVBQWlEO0FBQy9DLGVBQU81QixNQUFNLENBQUM2QixHQUFQLENBQVcsVUFBQUMsQ0FBQztBQUFBLGlCQUFJQSxDQUFKO0FBQUEsU0FBWixDQUFQO0FBQ0Q7O0FBRUQsYUFBTzFDLEtBQUssQ0FBQ3lDLEdBQU4sQ0FDTCxVQUFDQyxDQUFELEVBQUlDLENBQUo7QUFBQSxlQUNFLG1DQUFtQkQsQ0FBbkIsS0FBeUJpQixTQUFTLENBQUNqQixDQUFELEVBQUk5QixNQUFKLENBQWxDLEdBQWdEOEIsQ0FBaEQsR0FBb0Q5QixNQUFNLENBQUMrQixDQUFELENBRDVEO0FBQUEsT0FESyxDQUFQOztBQUtGLFNBQUs1RCxZQUFZLENBQUNJLFdBQWxCO0FBQ0UsVUFBSSxDQUFDZ0YsS0FBSyxDQUFDQyxPQUFOLENBQWNwRSxLQUFkLENBQUwsRUFBMkI7QUFDekIsZUFBTyxFQUFQO0FBQ0Q7O0FBQ0QsVUFBTXFFLGFBQWEsR0FBR3JFLEtBQUssQ0FBQzZDLE1BQU4sQ0FBYSxVQUFBSCxDQUFDO0FBQUEsZUFBSTlCLE1BQU0sQ0FBQ3FELFFBQVAsQ0FBZ0J2QixDQUFoQixDQUFKO0FBQUEsT0FBZCxDQUF0QjtBQUNBLGFBQU8yQixhQUFhLENBQUM3QixNQUFkLEdBQXVCNkIsYUFBdkIsR0FBdUMsRUFBOUM7O0FBRUYsU0FBS3RGLFlBQVksQ0FBQ0UsTUFBbEI7QUFDRSxhQUFPMkIsTUFBTSxDQUFDcUQsUUFBUCxDQUFnQmpFLEtBQWhCLElBQXlCQSxLQUF6QixHQUFpQyxJQUF4Qzs7QUFFRjtBQUNFLGFBQU8sSUFBUDtBQXZCSjtBQXlCRDtBQUNEOztBQUVBOzs7Ozs7Ozs7QUFPTyxTQUFTaUMscUJBQVQsQ0FBK0JoQixJQUEvQixFQUFxQ1ksYUFBckMsRUFBb0Q7QUFDekQsTUFBSWpCLE1BQU0sR0FBRyxDQUFDLENBQUQsRUFBSSxDQUFKLENBQWI7QUFDQSxNQUFJeEMsSUFBSSxHQUFHLEdBQVg7QUFFQSxNQUFNeUYsV0FBVyxHQUFHTSxLQUFLLENBQUNDLE9BQU4sQ0FBY25ELElBQWQsSUFBc0JBLElBQUksQ0FBQ3dCLEdBQUwsQ0FBU1osYUFBVCxDQUF0QixHQUFnRCxFQUFwRTs7QUFFQSxNQUFJc0MsS0FBSyxDQUFDQyxPQUFOLENBQWNuRCxJQUFkLEtBQXVCQSxJQUFJLENBQUN1QixNQUFMLEdBQWMsQ0FBekMsRUFBNEM7QUFDMUM1QixJQUFBQSxNQUFNLEdBQUdzQixVQUFVLENBQUNvQyxlQUFYLENBQTJCVCxXQUEzQixDQUFUO0FBQ0EsUUFBTVUsSUFBSSxHQUFHM0QsTUFBTSxDQUFDLENBQUQsQ0FBTixHQUFZQSxNQUFNLENBQUMsQ0FBRCxDQUEvQixDQUYwQyxDQUkxQzs7QUFDQSxRQUFJLENBQUMyRCxJQUFMLEVBQVc7QUFDVDNELE1BQUFBLE1BQU0sQ0FBQyxDQUFELENBQU4sR0FBWUEsTUFBTSxDQUFDLENBQUQsQ0FBTixHQUFZLENBQXhCO0FBQ0Q7O0FBRUR4QyxJQUFBQSxJQUFJLEdBQUdvRyxrQkFBa0IsQ0FBQ0QsSUFBRCxDQUFsQixJQUE0Qm5HLElBQW5DO0FBQ0F3QyxJQUFBQSxNQUFNLENBQUMsQ0FBRCxDQUFOLEdBQVk2RCxrQkFBa0IsQ0FBQzdELE1BQU0sQ0FBQyxDQUFELENBQVAsRUFBWXhDLElBQVosRUFBa0IsT0FBbEIsQ0FBOUI7QUFDQXdDLElBQUFBLE1BQU0sQ0FBQyxDQUFELENBQU4sR0FBWTZELGtCQUFrQixDQUFDN0QsTUFBTSxDQUFDLENBQUQsQ0FBUCxFQUFZeEMsSUFBWixFQUFrQixNQUFsQixDQUE5QjtBQUNEOztBQWxCd0Qsc0JBb0JsQnNHLFlBQVksQ0FBQzlELE1BQUQsRUFBU2lELFdBQVQsQ0FwQk07QUFBQSxNQW9CbER4RSxTQXBCa0QsaUJBb0JsREEsU0FwQmtEO0FBQUEsTUFvQnZDc0YsaUJBcEJ1QyxpQkFvQnZDQSxpQkFwQnVDOztBQXNCekQsU0FBTztBQUFDL0QsSUFBQUEsTUFBTSxFQUFOQSxNQUFEO0FBQVN4QyxJQUFBQSxJQUFJLEVBQUpBLElBQVQ7QUFBZWlCLElBQUFBLFNBQVMsRUFBVEEsU0FBZjtBQUEwQnNGLElBQUFBLGlCQUFpQixFQUFqQkE7QUFBMUIsR0FBUDtBQUNEOztBQUVELFNBQVNILGtCQUFULENBQTRCRCxJQUE1QixFQUFrQztBQUNoQyxNQUFJQSxJQUFJLEdBQUcsR0FBWCxFQUFnQjtBQUNkLFdBQU8sQ0FBUDtBQUNELEdBRkQsTUFFTyxJQUFJQSxJQUFJLEdBQUcsRUFBUCxJQUFhQSxJQUFJLEdBQUcsQ0FBeEIsRUFBMkI7QUFDaEMsV0FBTyxJQUFQO0FBQ0QsR0FGTSxNQUVBLElBQUlBLElBQUksSUFBSSxDQUFaLEVBQWU7QUFDcEIsV0FBTyxLQUFQO0FBQ0Q7QUFDRjtBQUVEOzs7Ozs7Ozs7QUFPTyxTQUFTbkMsdUJBQVQsQ0FBaUNuQixJQUFqQyxFQUF1Q1ksYUFBdkMsRUFBc0Q7QUFDM0Q7QUFDQTtBQUVBLE1BQU1nQyxXQUFXLEdBQUdNLEtBQUssQ0FBQ0MsT0FBTixDQUFjbkQsSUFBZCxJQUFzQkEsSUFBSSxDQUFDd0IsR0FBTCxDQUFTWixhQUFULENBQXRCLEdBQWdELEVBQXBFO0FBQ0EsTUFBTWpCLE1BQU0sR0FBR3NCLFVBQVUsQ0FBQ29DLGVBQVgsQ0FBMkJULFdBQTNCLENBQWY7QUFDQSxNQUFJekYsSUFBSSxHQUFHLElBQVg7QUFFQSxNQUFNbUcsSUFBSSxHQUFHM0QsTUFBTSxDQUFDLENBQUQsQ0FBTixHQUFZQSxNQUFNLENBQUMsQ0FBRCxDQUEvQjtBQUNBLE1BQU1nRSxLQUFLLEdBQUcxRyxnQkFBZ0IsQ0FBQzJHLElBQWpCLENBQXNCLFVBQUE3QixDQUFDO0FBQUEsV0FBSUEsQ0FBQyxDQUFDN0UsR0FBRixJQUFTb0csSUFBYjtBQUFBLEdBQXZCLENBQWQ7O0FBQ0EsTUFBSUssS0FBSixFQUFXO0FBQ1R4RyxJQUFBQSxJQUFJLEdBQUd3RyxLQUFLLENBQUN4RyxJQUFiO0FBQ0Q7O0FBWjBELHVCQWNwQnNHLFlBQVksQ0FBQzlELE1BQUQsRUFBU2lELFdBQVQsQ0FkUTtBQUFBLE1BY3BEeEUsU0Fkb0Qsa0JBY3BEQSxTQWRvRDtBQUFBLE1BY3pDc0YsaUJBZHlDLGtCQWN6Q0EsaUJBZHlDOztBQWdCM0QsU0FBTztBQUFDL0QsSUFBQUEsTUFBTSxFQUFOQSxNQUFEO0FBQVN4QyxJQUFBQSxJQUFJLEVBQUpBLElBQVQ7QUFBZXlGLElBQUFBLFdBQVcsRUFBWEEsV0FBZjtBQUE0QnhFLElBQUFBLFNBQVMsRUFBVEEsU0FBNUI7QUFBdUNzRixJQUFBQSxpQkFBaUIsRUFBakJBO0FBQXZDLEdBQVA7QUFDRDs7QUFFTSxTQUFTRyxrQkFBVCxDQUE0QmxFLE1BQTVCLEVBQW9DaUQsV0FBcEMsRUFBaURrQixJQUFqRCxFQUF1RDtBQUM1RCxTQUFPLDBCQUNKQyxVQURJLENBQ08sb0JBQU1wRSxNQUFNLENBQUMsQ0FBRCxDQUFaLEVBQWlCQSxNQUFNLENBQUMsQ0FBRCxDQUF2QixFQUE0Qm1FLElBQTVCLENBRFAsRUFFSm5FLE1BRkksQ0FFR0EsTUFGSCxFQUVXaUQsV0FGWCxFQUdKcEIsR0FISSxDQUdBLFVBQUF3QyxHQUFHO0FBQUEsV0FBSztBQUNYQyxNQUFBQSxLQUFLLEVBQUVELEdBQUcsQ0FBQ3pDLE1BREE7QUFFWDJDLE1BQUFBLEVBQUUsRUFBRUYsR0FBRyxDQUFDRSxFQUZHO0FBR1hDLE1BQUFBLEVBQUUsRUFBRUgsR0FBRyxDQUFDRztBQUhHLEtBQUw7QUFBQSxHQUhILENBQVA7QUFRRDtBQUNEOzs7Ozs7Ozs7QUFPQSxTQUFTVixZQUFULENBQXNCOUQsTUFBdEIsRUFBOEJpRCxXQUE5QixFQUEyQztBQUN6QyxNQUFNeEUsU0FBUyxHQUFHeUYsa0JBQWtCLENBQUNsRSxNQUFELEVBQVNpRCxXQUFULEVBQXNCdEYsYUFBdEIsQ0FBcEM7QUFDQSxNQUFNb0csaUJBQWlCLEdBQUdHLGtCQUFrQixDQUMxQ2xFLE1BRDBDLEVBRTFDaUQsV0FGMEMsRUFHMUNyRixxQkFIMEMsQ0FBNUM7QUFNQSxTQUFPO0FBQUNhLElBQUFBLFNBQVMsRUFBVEEsU0FBRDtBQUFZc0YsSUFBQUEsaUJBQWlCLEVBQWpCQTtBQUFaLEdBQVA7QUFDRDtBQUVEOzs7Ozs7Ozs7O0FBUU8sU0FBU0Ysa0JBQVQsQ0FBNEJmLEdBQTVCLEVBQWlDdEYsSUFBakMsRUFBdUNpSCxLQUF2QyxFQUE4QztBQUNuRCxNQUFJQSxLQUFLLEtBQUssT0FBZCxFQUF1QjtBQUNyQixXQUFPQyxJQUFJLENBQUNDLEtBQUwsQ0FBVzdCLEdBQUcsSUFBSSxJQUFJdEYsSUFBUixDQUFkLEtBQWdDLElBQUlBLElBQXBDLENBQVA7QUFDRDs7QUFFRCxTQUFPa0gsSUFBSSxDQUFDRSxJQUFMLENBQVU5QixHQUFHLElBQUksSUFBSXRGLElBQVIsQ0FBYixLQUErQixJQUFJQSxJQUFuQyxDQUFQO0FBQ0Q7O0FBRU0sU0FBU3VGLFNBQVQsQ0FBbUJELEdBQW5CLEVBQXdCOUMsTUFBeEIsRUFBZ0M7QUFDckMsTUFBSSxDQUFDdUQsS0FBSyxDQUFDQyxPQUFOLENBQWN4RCxNQUFkLENBQUwsRUFBNEI7QUFDMUIsV0FBTyxLQUFQO0FBQ0Q7O0FBRUQsU0FBTzhDLEdBQUcsSUFBSTlDLE1BQU0sQ0FBQyxDQUFELENBQWIsSUFBb0I4QyxHQUFHLElBQUk5QyxNQUFNLENBQUMsQ0FBRCxDQUF4QztBQUNEOztBQUVNLFNBQVM2RSwyQkFBVCxDQUFxQzdFLE1BQXJDLEVBQTZDO0FBQ2xELE1BQUksQ0FBQ3VELEtBQUssQ0FBQ0MsT0FBTixDQUFjeEQsTUFBZCxDQUFMLEVBQTRCO0FBQzFCLFdBQU8sSUFBUDtBQUNEOztBQUVELE1BQU0yRCxJQUFJLEdBQUczRCxNQUFNLENBQUMsQ0FBRCxDQUFOLEdBQVlBLE1BQU0sQ0FBQyxDQUFELENBQS9CO0FBQ0EsU0FBTzJELElBQUksR0FBR3pGLFlBQVAsR0FDSCxVQURHLEdBRUh5RixJQUFJLEdBQUczRixXQUFQLEdBQ0UsV0FERixHQUVFLGNBSk47QUFLRDs7QUFFTSxTQUFTOEcsMEJBQVQsQ0FBb0M5RSxNQUFwQyxFQUE0QztBQUNqRCxNQUFJLENBQUN1RCxLQUFLLENBQUNDLE9BQU4sQ0FBY3hELE1BQWQsQ0FBTCxFQUE0QjtBQUMxQixXQUFPLElBQVA7QUFDRDs7QUFFRCxNQUFNMkQsSUFBSSxHQUFHM0QsTUFBTSxDQUFDLENBQUQsQ0FBTixHQUFZQSxNQUFNLENBQUMsQ0FBRCxDQUEvQjtBQUNBLFNBQU8yRCxJQUFJLEdBQUd6RixZQUFQLEdBQ0gsVUFERyxHQUVIeUYsSUFBSSxHQUFHMUYsWUFBUCxHQUNFLE9BREYsR0FFRTBGLElBQUksR0FBRzNGLFdBQVAsR0FDRSxXQURGLEdBRUUyRixJQUFJLEdBQUc1RixZQUFQLEdBQ0UsUUFERixHQUVFLFdBUlY7QUFTRDtBQUVEOzs7Ozs7OztBQU1PLFNBQVNnSCxrQkFBVCxRQUEyQztBQUFBLE1BQWRqRixJQUFjLFNBQWRBLElBQWM7QUFBQSxNQUFSVixLQUFRLFNBQVJBLEtBQVE7O0FBQ2hELE1BQUksQ0FBQ1UsSUFBTCxFQUFXO0FBQ1QsV0FBTyxLQUFQO0FBQ0Q7O0FBQ0QsVUFBUUEsSUFBUjtBQUNFLFNBQUszQixZQUFZLENBQUNFLE1BQWxCO0FBQ0UsYUFBT2UsS0FBSyxLQUFLLElBQVYsSUFBa0JBLEtBQUssS0FBSyxLQUFuQzs7QUFFRixTQUFLakIsWUFBWSxDQUFDQyxLQUFsQjtBQUNBLFNBQUtELFlBQVksQ0FBQ0csU0FBbEI7QUFDRSxhQUFPaUYsS0FBSyxDQUFDQyxPQUFOLENBQWNwRSxLQUFkLEtBQXdCQSxLQUFLLENBQUNxRCxLQUFOLENBQVksVUFBQXVDLENBQUM7QUFBQSxlQUFJQSxDQUFDLEtBQUssSUFBTixJQUFjLENBQUNDLEtBQUssQ0FBQ0QsQ0FBRCxDQUF4QjtBQUFBLE9BQWIsQ0FBL0I7O0FBRUYsU0FBSzdHLFlBQVksQ0FBQ0ksV0FBbEI7QUFDRSxhQUFPZ0YsS0FBSyxDQUFDQyxPQUFOLENBQWNwRSxLQUFkLEtBQXdCOEYsT0FBTyxDQUFDOUYsS0FBSyxDQUFDd0MsTUFBUCxDQUF0Qzs7QUFFRixTQUFLekQsWUFBWSxDQUFDZ0gsS0FBbEI7QUFDRSxhQUFPRCxPQUFPLENBQUM5RixLQUFLLENBQUN3QyxNQUFQLENBQWQ7O0FBRUY7QUFDRSxhQUFPLElBQVA7QUFmSjtBQWlCRDs7QUFFTSxTQUFTd0QsYUFBVCxDQUF1Qm5ELE1BQXZCLEVBQStCb0QsT0FBL0IsRUFBd0M7QUFDN0MsTUFBSXBELE1BQU0sQ0FBQ2hDLFFBQVAsS0FBb0J6QixVQUFVLENBQUNDLFNBQS9CLElBQTRDLENBQUN3RCxNQUFNLENBQUMvQixLQUF4RCxFQUErRDtBQUM3RDtBQUNBLFdBQU8sRUFBUDtBQUNEOztBQUo0QyxNQU10QytDLFdBTnNDLEdBTXZCaEIsTUFOdUIsQ0FNdENnQixXQU5zQztBQUFBLE1BT3RDL0MsS0FQc0MsR0FPN0IrQixNQVA2QixDQU90Qy9CLEtBUHNDLEVBUzdDOztBQUNBLE1BQU1vRixNQUFNLEdBQUdELE9BQU8sQ0FDbkJ4RCxHQURZLENBQ1IsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKO0FBQUEsV0FBVztBQUNkd0QsTUFBQUEsQ0FBQyxFQUFFdEMsV0FBVyxDQUFDbEIsQ0FBRCxDQURBO0FBRWR5RCxNQUFBQSxDQUFDLEVBQUUxRCxDQUFDLENBQUM1QixLQUFLLENBQUNhLGVBQU4sR0FBd0IsQ0FBekI7QUFGVSxLQUFYO0FBQUEsR0FEUSxFQUtaa0IsTUFMWSxDQUtMO0FBQUEsUUFBRXNELENBQUYsU0FBRUEsQ0FBRjtBQUFBLFFBQUtDLENBQUwsU0FBS0EsQ0FBTDtBQUFBLFdBQVkvSCxNQUFNLENBQUNnSSxRQUFQLENBQWdCRixDQUFoQixLQUFzQjlILE1BQU0sQ0FBQ2dJLFFBQVAsQ0FBZ0JELENBQWhCLENBQWxDO0FBQUEsR0FMSyxFQU1aRSxJQU5ZLENBTVAsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKO0FBQUEsV0FBVSx3QkFBVUQsQ0FBQyxDQUFDSixDQUFaLEVBQWVLLENBQUMsQ0FBQ0wsQ0FBakIsQ0FBVjtBQUFBLEdBTk8sQ0FBZjtBQVFBLE1BQU1NLE9BQU8sR0FBRyxxQkFBT1AsTUFBUCxFQUFlLFVBQUF4RCxDQUFDO0FBQUEsV0FBSUEsQ0FBQyxDQUFDMEQsQ0FBTjtBQUFBLEdBQWhCLENBQWhCO0FBQ0EsTUFBTU0sT0FBTyxHQUFHLENBQUNSLE1BQU0sQ0FBQyxDQUFELENBQU4sQ0FBVUMsQ0FBWCxFQUFjRCxNQUFNLENBQUNBLE1BQU0sQ0FBQzFELE1BQVAsR0FBZ0IsQ0FBakIsQ0FBTixDQUEwQjJELENBQXhDLENBQWhCO0FBRUEsU0FBTztBQUFDN0csSUFBQUEsU0FBUyxFQUFFO0FBQUM0RyxNQUFBQSxNQUFNLEVBQU5BLE1BQUQ7QUFBU08sTUFBQUEsT0FBTyxFQUFQQSxPQUFUO0FBQWtCQyxNQUFBQSxPQUFPLEVBQVBBO0FBQWxCLEtBQVo7QUFBd0M1RixJQUFBQSxLQUFLLEVBQUxBO0FBQXhDLEdBQVA7QUFDRDs7QUFFTSxTQUFTNkYsd0JBQVQsQ0FBa0M5RCxNQUFsQyxFQUEwQztBQUMvQyxNQUFNK0QsZUFBZSxHQUFHckgsaUJBQWlCLENBQUNzRCxNQUFNLENBQUNuQyxJQUFSLENBQXpDOztBQUNBLE1BQUksQ0FBQ2tHLGVBQUwsRUFBc0I7QUFDcEIsV0FBTyxJQUFQO0FBQ0Q7O0FBRUQsTUFBSSxDQUFDL0QsTUFBTSxDQUFDL0IsS0FBWixFQUFtQjtBQUNqQixXQUFPOEYsZUFBZSxDQUFDcEgsT0FBdkI7QUFDRDs7QUFFRCxTQUFPb0gsZUFBZSxDQUFDL0QsTUFBTSxDQUFDL0IsS0FBUCxDQUFhSixJQUFkLENBQWYsSUFBc0MsSUFBN0M7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7YXNjZW5kaW5nLCBleHRlbnQsIGhpc3RvZ3JhbSBhcyBkM0hpc3RvZ3JhbSwgdGlja3N9IGZyb20gJ2QzLWFycmF5JztcbmltcG9ydCBrZXlNaXJyb3IgZnJvbSAna2V5bWlycm9yJztcblxuaW1wb3J0IHtBTExfRklFTERfVFlQRVN9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcbmltcG9ydCB7bWF5YmVUb0RhdGUsIG5vdE51bGxvclVuZGVmaW5lZH0gZnJvbSAnLi9kYXRhLXV0aWxzJztcbmltcG9ydCAqIGFzIFNjYWxlVXRpbHMgZnJvbSAnLi9kYXRhLXNjYWxlLXV0aWxzJztcbmltcG9ydCB7Z2VuZXJhdGVIYXNoSWR9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgY29uc3QgVGltZXN0YW1wU3RlcE1hcCA9IFtcbiAge21heDogMSwgc3RlcDogMC4wNX0sXG4gIHttYXg6IDEwLCBzdGVwOiAwLjF9LFxuICB7bWF4OiAxMDAsIHN0ZXA6IDF9LFxuICB7bWF4OiA1MDAsIHN0ZXA6IDV9LFxuICB7bWF4OiAxMDAwLCBzdGVwOiAxMH0sXG4gIHttYXg6IDUwMDAsIHN0ZXA6IDUwfSxcbiAge21heDogTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZLCBzdGVwOiAxMDAwfVxuXTtcblxuZXhwb3J0IGNvbnN0IGhpc3RvZ3JhbUJpbnMgPSAzMDtcbmV4cG9ydCBjb25zdCBlbmxhcmdlZEhpc3RvZ3JhbUJpbnMgPSAxMDA7XG5cbmNvbnN0IGR1cmF0aW9uU2Vjb25kID0gMTAwMDtcbmNvbnN0IGR1cmF0aW9uTWludXRlID0gZHVyYXRpb25TZWNvbmQgKiA2MDtcbmNvbnN0IGR1cmF0aW9uSG91ciA9IGR1cmF0aW9uTWludXRlICogNjA7XG5jb25zdCBkdXJhdGlvbkRheSA9IGR1cmF0aW9uSG91ciAqIDI0O1xuY29uc3QgZHVyYXRpb25XZWVrID0gZHVyYXRpb25EYXkgKiA3O1xuY29uc3QgZHVyYXRpb25ZZWFyID0gZHVyYXRpb25EYXkgKiAzNjU7XG5cbmV4cG9ydCBjb25zdCBGSUxURVJfVFlQRVMgPSBrZXlNaXJyb3Ioe1xuICByYW5nZTogbnVsbCxcbiAgc2VsZWN0OiBudWxsLFxuICB0aW1lUmFuZ2U6IG51bGwsXG4gIG11bHRpU2VsZWN0OiBudWxsXG59KTtcblxuZXhwb3J0IGNvbnN0IFBMT1RfVFlQRVMgPSBrZXlNaXJyb3Ioe1xuICBoaXN0b2dyYW06IG51bGwsXG4gIGxpbmVDaGFydDogbnVsbFxufSk7XG5cbmNvbnN0IFN1cHBvcnRlZFBsb3RUeXBlID0ge1xuICBbRklMVEVSX1RZUEVTLnRpbWVSYW5nZV06IHtcbiAgICBkZWZhdWx0OiAnaGlzdG9ncmFtJyxcbiAgICBbQUxMX0ZJRUxEX1RZUEVTLmludGVnZXJdOiAnbGluZUNoYXJ0JyxcbiAgICBbQUxMX0ZJRUxEX1RZUEVTLnJlYWxdOiAnbGluZUNoYXJ0J1xuICB9LFxuICBbRklMVEVSX1RZUEVTLnJhbmdlXToge1xuICAgIGRlZmF1bHQ6ICdoaXN0b2dyYW0nLFxuICAgIFtBTExfRklFTERfVFlQRVMuaW50ZWdlcl06ICdsaW5lQ2hhcnQnLFxuICAgIFtBTExfRklFTERfVFlQRVMucmVhbF06ICdsaW5lQ2hhcnQnXG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBGSUxURVJfQ09NUE9ORU5UUyA9IHtcbiAgW0ZJTFRFUl9UWVBFUy5zZWxlY3RdOiAnU2luZ2xlU2VsZWN0RmlsdGVyJyxcbiAgW0ZJTFRFUl9UWVBFUy5tdWx0aVNlbGVjdF06ICdNdWx0aVNlbGVjdEZpbHRlcicsXG4gIFtGSUxURVJfVFlQRVMudGltZVJhbmdlXTogJ1RpbWVSYW5nZUZpbHRlcicsXG4gIFtGSUxURVJfVFlQRVMucmFuZ2VdOiAnUmFuZ2VGaWx0ZXInXG59O1xuXG5leHBvcnQgY29uc3QgQkFTRV9TUEVFRCA9IDYwMDtcbmV4cG9ydCBjb25zdCBUSU1FX0FOSU1BVElPTl9TUEVFRCA9IFtcbiAge1xuICAgIGxhYmVsOiAnMC41eCcsXG4gICAgdmFsdWU6IDAuNVxuICB9LFxuICB7XG4gICAgbGFiZWw6ICcxeCcsXG4gICAgdmFsdWU6IDFcbiAgfSxcbiAge1xuICAgIGxhYmVsOiAnMngnLFxuICAgIHZhbHVlOiAyXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogJzR4JyxcbiAgICB2YWx1ZTogNFxuICB9XG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVmYXVsdEZpbHRlcihkYXRhSWQpIHtcbiAgcmV0dXJuIHtcbiAgICAvLyBsaW5rIHRvIGRhdGFzZXQgSWRcbiAgICBkYXRhSWQsXG4gICAgLy8gc2hvdWxkIGFsbG93IHRvIGVkaXQgZGF0YUlkXG4gICAgZnJlZXplOiBmYWxzZSxcbiAgICBpZDogZ2VuZXJhdGVIYXNoSWQoNCksXG5cbiAgICAvLyB0aW1lIHJhbmdlIGZpbHRlciBzcGVjaWZpY1xuICAgIGZpeGVkRG9tYWluOiBmYWxzZSxcbiAgICBlbmxhcmdlZDogZmFsc2UsXG4gICAgaXNBbmltYXRpbmc6IGZhbHNlLFxuICAgIHNwZWVkOiAxLFxuXG4gICAgLy8gZmllbGQgc3BlY2lmaWNcbiAgICBuYW1lOiBudWxsLFxuICAgIHR5cGU6IG51bGwsXG4gICAgZmllbGRJZHg6IG51bGwsXG4gICAgZG9tYWluOiBudWxsLFxuICAgIHZhbHVlOiBudWxsLFxuXG4gICAgLy8gcGxvdFxuICAgIHBsb3RUeXBlOiBQTE9UX1RZUEVTLmhpc3RvZ3JhbSxcbiAgICB5QXhpczogbnVsbCxcbiAgICBpbnRlcnZhbDogbnVsbFxuICB9O1xufVxuXG4vKipcbiAqIEdldCBkZWZhdWx0IGZpbHRlciBwcm9wIGJhc2VkIG9uIGZpZWxkIHR5cGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdFtdfSBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gZmllbGRcbiAqIEByZXR1cm5zIHtvYmplY3R9IGRlZmF1bHQgZmlsdGVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWx0ZXJQcm9wcyhkYXRhLCBmaWVsZCkge1xuICBjb25zdCBmaWx0ZXJQcm9wID0ge1xuICAgIC4uLmdldEZpZWxkRG9tYWluKGRhdGEsIGZpZWxkKSxcbiAgICBmaWVsZFR5cGU6IGZpZWxkLnR5cGVcbiAgfTtcblxuICBzd2l0Y2ggKGZpZWxkLnR5cGUpIHtcbiAgICBjYXNlIEFMTF9GSUVMRF9UWVBFUy5yZWFsOlxuICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLmludGVnZXI6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5maWx0ZXJQcm9wLFxuICAgICAgICB2YWx1ZTogZmlsdGVyUHJvcC5kb21haW4sXG4gICAgICAgIHR5cGU6IEZJTFRFUl9UWVBFUy5yYW5nZSxcbiAgICAgICAgdHlwZU9wdGlvbnM6IFtGSUxURVJfVFlQRVMucmFuZ2VdXG4gICAgICB9O1xuXG4gICAgY2FzZSBBTExfRklFTERfVFlQRVMuYm9vbGVhbjpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmZpbHRlclByb3AsXG4gICAgICAgIHR5cGU6IEZJTFRFUl9UWVBFUy5zZWxlY3QsXG4gICAgICAgIHZhbHVlOiB0cnVlXG4gICAgICB9O1xuXG4gICAgY2FzZSBBTExfRklFTERfVFlQRVMuc3RyaW5nOlxuICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLmRhdGU6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5maWx0ZXJQcm9wLFxuICAgICAgICB0eXBlOiBGSUxURVJfVFlQRVMubXVsdGlTZWxlY3QsXG4gICAgICAgIHZhbHVlOiBbXVxuICAgICAgfTtcblxuICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLnRpbWVzdGFtcDpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmZpbHRlclByb3AsXG4gICAgICAgIHR5cGU6IEZJTFRFUl9UWVBFUy50aW1lUmFuZ2UsXG4gICAgICAgIGVubGFyZ2VkOiB0cnVlLFxuICAgICAgICBmaXhlZERvbWFpbjogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IGZpbHRlclByb3AuZG9tYWluXG4gICAgICB9O1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB7fTtcbiAgfVxufVxuXG4vKipcbiAqIENhbGN1bGF0ZSBmaWVsZCBkb21haW4gYmFzZWQgb24gZmllbGQgdHlwZSBhbmQgZGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0W119IGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBmaWVsZFxuICogQHJldHVybnMge29iamVjdH0gd2l0aCBkb21haW4gYXMga2V5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWVsZERvbWFpbihkYXRhLCBmaWVsZCkge1xuICBjb25zdCBmaWVsZElkeCA9IGZpZWxkLnRhYmxlRmllbGRJbmRleCAtIDE7XG4gIGNvbnN0IGlzVGltZSA9IGZpZWxkLnR5cGUgPT09IEFMTF9GSUVMRF9UWVBFUy50aW1lc3RhbXA7XG4gIGNvbnN0IHZhbHVlQWNjZXNzb3IgPSBtYXliZVRvRGF0ZS5iaW5kKG51bGwsIGlzVGltZSwgZmllbGRJZHgsIGZpZWxkLmZvcm1hdCk7XG4gIGxldCBkb21haW47XG5cbiAgc3dpdGNoIChmaWVsZC50eXBlKSB7XG4gICAgY2FzZSBBTExfRklFTERfVFlQRVMucmVhbDpcbiAgICBjYXNlIEFMTF9GSUVMRF9UWVBFUy5pbnRlZ2VyOlxuICAgICAgLy8gY2FsY3VsYXRlIGRvbWFpbiBhbmQgc3RlcFxuICAgICAgcmV0dXJuIGdldE51bWVyaWNGaWVsZERvbWFpbihkYXRhLCB2YWx1ZUFjY2Vzc29yKTtcblxuICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLmJvb2xlYW46XG4gICAgICByZXR1cm4ge2RvbWFpbjogW3RydWUsIGZhbHNlXX07XG5cbiAgICBjYXNlIEFMTF9GSUVMRF9UWVBFUy5zdHJpbmc6XG4gICAgY2FzZSBBTExfRklFTERfVFlQRVMuZGF0ZTpcbiAgICAgIGRvbWFpbiA9IFNjYWxlVXRpbHMuZ2V0T3JkaW5hbERvbWFpbihkYXRhLCB2YWx1ZUFjY2Vzc29yKTtcbiAgICAgIHJldHVybiB7ZG9tYWlufTtcblxuICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLnRpbWVzdGFtcDpcbiAgICAgIHJldHVybiBnZXRUaW1lc3RhbXBGaWVsZERvbWFpbihkYXRhLCB2YWx1ZUFjY2Vzc29yKTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4ge2RvbWFpbjogU2NhbGVVdGlscy5nZXRPcmRpbmFsRG9tYWluKGRhdGEsIHZhbHVlQWNjZXNzb3IpfTtcbiAgfVxufVxuXG4vKipcbiAqIEZpbHRlciBkYXRhIGJhc2VkIG9uIGFuIGFycmF5IG9mIGZpbHRlcnNcbiAqXG4gKiBAcGFyYW0ge09iamVjdFtdfSBkYXRhXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0YUlkXG4gKiBAcGFyYW0ge09iamVjdFtdfSBmaWx0ZXJzXG4gKiBAcmV0dXJucyB7T2JqZWN0W119IGRhdGFcbiAqIEByZXR1cm5zIHtOdW1iZXJbXX0gZmlsdGVyZWRJbmRleFxuICovXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyRGF0YShkYXRhLCBkYXRhSWQsIGZpbHRlcnMpIHtcbiAgaWYgKCFkYXRhIHx8ICFkYXRhSWQpIHtcbiAgICAvLyB3aHkgd291bGQgdGhlcmUgbm90IGJlIGFueSBkYXRhPyBhcmUgd2Ugb3ZlciBkb2luZyB0aGlzP1xuICAgIHJldHVybiB7ZGF0YTogW10sIGZpbHRlcmVkSW5kZXg6IFtdfTtcbiAgfVxuXG4gIGlmICghZmlsdGVycy5sZW5ndGgpIHtcbiAgICByZXR1cm4ge2RhdGEsIGZpbHRlcmVkSW5kZXg6IGRhdGEubWFwKChkLCBpKSA9PiBpKX07XG4gIH1cblxuICBjb25zdCBhcHBsaWVkRmlsdGVycyA9IGZpbHRlcnMuZmlsdGVyKFxuICAgIGQgPT4gZC5kYXRhSWQgPT09IGRhdGFJZCAmJiBkLmZpZWxkSWR4ID4gLTEgJiYgZC52YWx1ZSAhPT0gbnVsbFxuICApO1xuXG4gIGNvbnN0IFtkeW5hbWljRG9tYWluRmlsdGVycywgZml4ZWREb21haW5GaWx0ZXJzXSA9IGFwcGxpZWRGaWx0ZXJzLnJlZHVjZShcbiAgICAoYWNjdSwgZikgPT4ge1xuICAgICAgaWYgKGYuZGF0YUlkID09PSBkYXRhSWQgJiYgZi5maWVsZElkeCA+IC0xICYmIGYudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgKGYuZml4ZWREb21haW4gPyBhY2N1WzFdIDogYWNjdVswXSkucHVzaChmKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhY2N1O1xuICAgIH0sXG4gICAgW1tdLCBbXV1cbiAgKTtcbiAgLy8gY29uc29sZS5sb2coZHluYW1pY0RvbWFpbkZpbHRlcnMpXG4gIC8vIGNvbnNvbGUubG9nKGZpeGVkRG9tYWluRmlsdGVycylcbiAgLy8gd2Ugc2F2ZSBhIHJlZmVyZW5jZSBvZiBhbGxEYXRhIGluZGV4IGhlcmUgdG8gYWNjZXNzIGRhdGFUb0ZlYXR1cmVcbiAgLy8gaW4gZ2VvanNvbiBhbmQgaGV4Z29uSWQgbGF5ZXJcbiAgLy8gY29uc29sZS50aW1lKCdmaWx0ZXJEYXRhJyk7XG5cbiAgY29uc3Qge2ZpbHRlcmVkLCBmaWx0ZXJlZEluZGV4LCBmaWx0ZXJlZEluZGV4Rm9yRG9tYWlufSA9IGRhdGEucmVkdWNlKFxuICAgIChhY2N1LCBkLCBpKSA9PiB7XG4gICAgICAvLyBnZW5lcmF0ZSAyIHNldHMgb2ZcbiAgICAgIC8vIGZpbHRlciBkYXRhIHVzZWQgdG8gY2FsY3VsYXRlIGxheWVyIERvbWFpblxuICAgICAgY29uc3QgbWF0Y2hGb3JEb21haW4gPSBkeW5hbWljRG9tYWluRmlsdGVycy5ldmVyeShmaWx0ZXIgPT5cbiAgICAgICAgaXNEYXRhTWF0Y2hGaWx0ZXIoZCwgZmlsdGVyLCBpKVxuICAgICAgKTtcblxuICAgICAgaWYgKG1hdGNoRm9yRG9tYWluKSB7XG4gICAgICAgIGFjY3UuZmlsdGVyZWRJbmRleEZvckRvbWFpbi5wdXNoKGkpO1xuXG4gICAgICAgIC8vIGZpbHRlciBkYXRhIGZvciByZW5kZXJcbiAgICAgICAgY29uc3QgbWF0Y2hGb3JSZW5kZXIgPSBmaXhlZERvbWFpbkZpbHRlcnMuZXZlcnkoZmlsdGVyID0+XG4gICAgICAgICAgaXNEYXRhTWF0Y2hGaWx0ZXIoZCwgZmlsdGVyLCBpKVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChtYXRjaEZvclJlbmRlcikge1xuICAgICAgICAgIGFjY3UuZmlsdGVyZWQucHVzaChkKTtcbiAgICAgICAgICBhY2N1LmZpbHRlcmVkSW5kZXgucHVzaChpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gYWNjdTtcbiAgICB9LFxuICAgIHtmaWx0ZXJlZDogW10sIGZpbHRlcmVkSW5kZXg6IFtdLCBmaWx0ZXJlZEluZGV4Rm9yRG9tYWluOiBbXX1cbiAgKTtcblxuICAvLyBjb25zb2xlLmxvZygnZGF0YT09JywgZGF0YS5sZW5ndGgpXG4gIC8vIGNvbnNvbGUubG9nKCdmaWx0ZXJlZD09JywgZmlsdGVyZWQubGVuZ3RoKVxuICAvLyBjb25zb2xlLmxvZygnZmlsdGVyZWRJbmRleD09JywgZmlsdGVyZWRJbmRleC5sZW5ndGgpXG4gIC8vIGNvbnNvbGUubG9nKCdmaWx0ZXJlZEluZGV4Rm9yRG9tYWluPT0nLCBmaWx0ZXJlZEluZGV4Rm9yRG9tYWluLmxlbmd0aClcbiAgLy9cbiAgLy8gY29uc29sZS50aW1lRW5kKCdmaWx0ZXJEYXRhJyk7XG5cbiAgcmV0dXJuIHtkYXRhOiBmaWx0ZXJlZCwgZmlsdGVyZWRJbmRleCwgZmlsdGVyZWRJbmRleEZvckRvbWFpbn07XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdmFsdWUgaXMgaW4gcmFuZ2Ugb2YgZmlsdGVyXG4gKlxuICogQHBhcmFtIHtPYmplY3RbXX0gZGF0YVxuICogQHBhcmFtIHtPYmplY3R9IGZpbHRlclxuICogQHBhcmFtIHtudW1iZXJ9IGlcbiAqIEByZXR1cm5zIHtCb29sZWFufSAtIHdoZXRoZXIgdmFsdWUgZmFsbHMgaW4gdGhlIHJhbmdlIG9mIHRoZSBmaWx0ZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRGF0YU1hdGNoRmlsdGVyKGRhdGEsIGZpbHRlciwgaSkge1xuICBjb25zdCB2YWwgPSBkYXRhW2ZpbHRlci5maWVsZElkeF07XG4gIGlmICghZmlsdGVyLnR5cGUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHN3aXRjaCAoZmlsdGVyLnR5cGUpIHtcbiAgICBjYXNlIEZJTFRFUl9UWVBFUy5yYW5nZTpcbiAgICAgIHJldHVybiBpc0luUmFuZ2UodmFsLCBmaWx0ZXIudmFsdWUpO1xuXG4gICAgY2FzZSBGSUxURVJfVFlQRVMudGltZVJhbmdlOlxuICAgICAgY29uc3QgdGltZVZhbCA9IGZpbHRlci5tYXBwZWRWYWx1ZVxuICAgICAgICA/IGZpbHRlci5tYXBwZWRWYWx1ZVtpXVxuICAgICAgICA6IG1vbWVudC51dGModmFsKS52YWx1ZU9mKCk7XG4gICAgICByZXR1cm4gaXNJblJhbmdlKHRpbWVWYWwsIGZpbHRlci52YWx1ZSk7XG5cbiAgICBjYXNlIEZJTFRFUl9UWVBFUy5tdWx0aVNlbGVjdDpcbiAgICAgIHJldHVybiBmaWx0ZXIudmFsdWUuaW5jbHVkZXModmFsKTtcblxuICAgIGNhc2UgRklMVEVSX1RZUEVTLnNlbGVjdDpcbiAgICAgIHJldHVybiBmaWx0ZXIudmFsdWUgPT09IHZhbDtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG4vKipcbiAqIENhbGwgYnkgcGFyc2luZyBmaWx0ZXJzIGZyb20gVVJMXG4gKiBDaGVjayBpZiB2YWx1ZSBvZiBmaWx0ZXIgd2l0aGluIGZpbHRlciBkb21haW4sIGlmIG5vdCBhZGp1c3QgaXQgdG8gbWF0Y2hcbiAqIGZpbHRlciBkb21haW5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ1tdIHwgc3RyaW5nIHwgbnVtYmVyIHwgbnVtYmVyW119IHZhbHVlXG4gKiBAcGFyYW0ge0FycmF5fSBmaWx0ZXIuZG9tYWluXG4gKiBAcGFyYW0ge1N0cmluZ30gZmlsdGVyLnR5cGVcbiAqIEByZXR1cm5zIHsqfSAtIGFkanVzdGVkIHZhbHVlIHRvIG1hdGNoIGZpbHRlciBvciBudWxsIHRvIHJlbW92ZSBmaWx0ZXJcbiAqL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBjb21wbGV4aXR5ICovXG5leHBvcnQgZnVuY3Rpb24gYWRqdXN0VmFsdWVUb0ZpbHRlckRvbWFpbih2YWx1ZSwge2RvbWFpbiwgdHlwZX0pIHtcbiAgaWYgKCFkb21haW4gfHwgIXR5cGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIEZJTFRFUl9UWVBFUy5yYW5nZTpcbiAgICBjYXNlIEZJTFRFUl9UWVBFUy50aW1lUmFuZ2U6XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpIHx8IHZhbHVlLmxlbmd0aCAhPT0gMikge1xuICAgICAgICByZXR1cm4gZG9tYWluLm1hcChkID0+IGQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmFsdWUubWFwKFxuICAgICAgICAoZCwgaSkgPT5cbiAgICAgICAgICBub3ROdWxsb3JVbmRlZmluZWQoZCkgJiYgaXNJblJhbmdlKGQsIGRvbWFpbikgPyBkIDogZG9tYWluW2ldXG4gICAgICApO1xuXG4gICAgY2FzZSBGSUxURVJfVFlQRVMubXVsdGlTZWxlY3Q6XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGZpbHRlcmVkVmFsdWUgPSB2YWx1ZS5maWx0ZXIoZCA9PiBkb21haW4uaW5jbHVkZXMoZCkpO1xuICAgICAgcmV0dXJuIGZpbHRlcmVkVmFsdWUubGVuZ3RoID8gZmlsdGVyZWRWYWx1ZSA6IFtdO1xuXG4gICAgY2FzZSBGSUxURVJfVFlQRVMuc2VsZWN0OlxuICAgICAgcmV0dXJuIGRvbWFpbi5pbmNsdWRlcyh2YWx1ZSkgPyB2YWx1ZSA6IHRydWU7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbi8qIGVzbGludC1lbmFibGUgY29tcGxleGl0eSAqL1xuXG4vKipcbiAqIENhbGN1bGF0ZSBudW1lcmljIGRvbWFpbiBhbmQgc3VpdGFibGUgc3RlcFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0W119IGRhdGFcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHZhbHVlQWNjZXNzb3JcbiAqIEByZXR1cm5zIHtvYmplY3R9IGRvbWFpbiBhbmQgc3RlcFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TnVtZXJpY0ZpZWxkRG9tYWluKGRhdGEsIHZhbHVlQWNjZXNzb3IpIHtcbiAgbGV0IGRvbWFpbiA9IFswLCAxXTtcbiAgbGV0IHN0ZXAgPSAwLjE7XG5cbiAgY29uc3QgbWFwcGVkVmFsdWUgPSBBcnJheS5pc0FycmF5KGRhdGEpID8gZGF0YS5tYXAodmFsdWVBY2Nlc3NvcikgOiBbXTtcblxuICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSAmJiBkYXRhLmxlbmd0aCA+IDEpIHtcbiAgICBkb21haW4gPSBTY2FsZVV0aWxzLmdldExpbmVhckRvbWFpbihtYXBwZWRWYWx1ZSk7XG4gICAgY29uc3QgZGlmZiA9IGRvbWFpblsxXSAtIGRvbWFpblswXTtcblxuICAgIC8vIGluIGNhc2UgZXF1YWwgZG9tYWluLCBbOTYsIDk2XSwgd2hpY2ggd2lsbCBicmVhayBxdWFudGl6ZSBzY2FsZVxuICAgIGlmICghZGlmZikge1xuICAgICAgZG9tYWluWzFdID0gZG9tYWluWzBdICsgMTtcbiAgICB9XG5cbiAgICBzdGVwID0gZ2V0TnVtZXJpY1N0ZXBTaXplKGRpZmYpIHx8IHN0ZXA7XG4gICAgZG9tYWluWzBdID0gZm9ybWF0TnVtYmVyQnlTdGVwKGRvbWFpblswXSwgc3RlcCwgJ2Zsb29yJyk7XG4gICAgZG9tYWluWzFdID0gZm9ybWF0TnVtYmVyQnlTdGVwKGRvbWFpblsxXSwgc3RlcCwgJ2NlaWwnKTtcbiAgfVxuXG4gIGNvbnN0IHtoaXN0b2dyYW0sIGVubGFyZ2VkSGlzdG9ncmFtfSA9IGdldEhpc3RvZ3JhbShkb21haW4sIG1hcHBlZFZhbHVlKTtcblxuICByZXR1cm4ge2RvbWFpbiwgc3RlcCwgaGlzdG9ncmFtLCBlbmxhcmdlZEhpc3RvZ3JhbX07XG59XG5cbmZ1bmN0aW9uIGdldE51bWVyaWNTdGVwU2l6ZShkaWZmKSB7XG4gIGlmIChkaWZmID4gMTAwKSB7XG4gICAgcmV0dXJuIDE7XG4gIH0gZWxzZSBpZiAoZGlmZiA8IDIwICYmIGRpZmYgPiAzKSB7XG4gICAgcmV0dXJuIDAuMDE7XG4gIH0gZWxzZSBpZiAoZGlmZiA8PSAzKSB7XG4gICAgcmV0dXJuIDAuMDAxO1xuICB9XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlIHRpbWVzdGFtcCBkb21haW4gYW5kIHN1aXRhYmxlIHN0ZXBcbiAqXG4gKiBAcGFyYW0ge09iamVjdFtdfSBkYXRhXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSB2YWx1ZUFjY2Vzc29yXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBkb21haW4gYW5kIHN0ZXBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFRpbWVzdGFtcEZpZWxkRG9tYWluKGRhdGEsIHZhbHVlQWNjZXNzb3IpIHtcbiAgLy8gdG8gYXZvaWQgY29udmVydGluZyBzdHJpbmcgZm9ybWF0IHRpbWUgdG8gZXBvY2hcbiAgLy8gZXZlcnkgdGltZSB3ZSBjb21wYXJlIHdlIHN0b3JlIGEgdmFsdWUgbWFwcGVkIHRvIGludCBpbiBmaWx0ZXIgZG9tYWluXG5cbiAgY29uc3QgbWFwcGVkVmFsdWUgPSBBcnJheS5pc0FycmF5KGRhdGEpID8gZGF0YS5tYXAodmFsdWVBY2Nlc3NvcikgOiBbXTtcbiAgY29uc3QgZG9tYWluID0gU2NhbGVVdGlscy5nZXRMaW5lYXJEb21haW4obWFwcGVkVmFsdWUpO1xuICBsZXQgc3RlcCA9IDAuMDE7XG5cbiAgY29uc3QgZGlmZiA9IGRvbWFpblsxXSAtIGRvbWFpblswXTtcbiAgY29uc3QgZW50cnkgPSBUaW1lc3RhbXBTdGVwTWFwLmZpbmQoZiA9PiBmLm1heCA+PSBkaWZmKTtcbiAgaWYgKGVudHJ5KSB7XG4gICAgc3RlcCA9IGVudHJ5LnN0ZXA7XG4gIH1cblxuICBjb25zdCB7aGlzdG9ncmFtLCBlbmxhcmdlZEhpc3RvZ3JhbX0gPSBnZXRIaXN0b2dyYW0oZG9tYWluLCBtYXBwZWRWYWx1ZSk7XG5cbiAgcmV0dXJuIHtkb21haW4sIHN0ZXAsIG1hcHBlZFZhbHVlLCBoaXN0b2dyYW0sIGVubGFyZ2VkSGlzdG9ncmFtfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhpc3RvZ3JhbUNvbnN0cnVjdChkb21haW4sIG1hcHBlZFZhbHVlLCBiaW5zKSB7XG4gIHJldHVybiBkM0hpc3RvZ3JhbSgpXG4gICAgLnRocmVzaG9sZHModGlja3MoZG9tYWluWzBdLCBkb21haW5bMV0sIGJpbnMpKVxuICAgIC5kb21haW4oZG9tYWluKShtYXBwZWRWYWx1ZSlcbiAgICAubWFwKGJpbiA9PiAoe1xuICAgICAgY291bnQ6IGJpbi5sZW5ndGgsXG4gICAgICB4MDogYmluLngwLFxuICAgICAgeDE6IGJpbi54MVxuICAgIH0pKTtcbn1cbi8qKlxuICogQ2FsY3VsYXRlIGhpc3RvZ3JhbSBmcm9tIGRvbWFpbiBhbmQgYXJyYXkgb2YgdmFsdWVzXG4gKlxuICogQHBhcmFtIHtudW1iZXJbXX0gZG9tYWluXG4gKiBAcGFyYW0ge09iamVjdFtdfSBtYXBwZWRWYWx1ZVxuICogQHJldHVybnMge0FycmF5W119IGhpc3RvZ3JhbVxuICovXG5mdW5jdGlvbiBnZXRIaXN0b2dyYW0oZG9tYWluLCBtYXBwZWRWYWx1ZSkge1xuICBjb25zdCBoaXN0b2dyYW0gPSBoaXN0b2dyYW1Db25zdHJ1Y3QoZG9tYWluLCBtYXBwZWRWYWx1ZSwgaGlzdG9ncmFtQmlucyk7XG4gIGNvbnN0IGVubGFyZ2VkSGlzdG9ncmFtID0gaGlzdG9ncmFtQ29uc3RydWN0KFxuICAgIGRvbWFpbixcbiAgICBtYXBwZWRWYWx1ZSxcbiAgICBlbmxhcmdlZEhpc3RvZ3JhbUJpbnNcbiAgKTtcblxuICByZXR1cm4ge2hpc3RvZ3JhbSwgZW5sYXJnZWRIaXN0b2dyYW19O1xufVxuXG4vKipcbiAqIHJvdW5kIG51bWJlciBiYXNlZCBvbiBzdGVwXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHZhbFxuICogQHBhcmFtIHtudW1iZXJ9IHN0ZXBcbiAqIEBwYXJhbSB7c3RyaW5nfSBib3VuZFxuICogQHJldHVybnMge251bWJlcn0gcm91bmRlZCBudW1iZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdE51bWJlckJ5U3RlcCh2YWwsIHN0ZXAsIGJvdW5kKSB7XG4gIGlmIChib3VuZCA9PT0gJ2Zsb29yJykge1xuICAgIHJldHVybiBNYXRoLmZsb29yKHZhbCAqICgxIC8gc3RlcCkpIC8gKDEgLyBzdGVwKTtcbiAgfVxuXG4gIHJldHVybiBNYXRoLmNlaWwodmFsICogKDEgLyBzdGVwKSkgLyAoMSAvIHN0ZXApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNJblJhbmdlKHZhbCwgZG9tYWluKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShkb21haW4pKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHZhbCA+PSBkb21haW5bMF0gJiYgdmFsIDw9IGRvbWFpblsxXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRpbWVXaWRnZXRUaXRsZUZvcm1hdHRlcihkb21haW4pIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGRvbWFpbikpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGRpZmYgPSBkb21haW5bMV0gLSBkb21haW5bMF07XG4gIHJldHVybiBkaWZmID4gZHVyYXRpb25ZZWFyXG4gICAgPyAnTU0vREQvWVknXG4gICAgOiBkaWZmID4gZHVyYXRpb25EYXlcbiAgICAgID8gJ01NL0REIGhoYSdcbiAgICAgIDogJ01NL0REIGhoOm1tYSc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUaW1lV2lkZ2V0SGludEZvcm1hdHRlcihkb21haW4pIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGRvbWFpbikpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGRpZmYgPSBkb21haW5bMV0gLSBkb21haW5bMF07XG4gIHJldHVybiBkaWZmID4gZHVyYXRpb25ZZWFyXG4gICAgPyAnTU0vREQvWVknXG4gICAgOiBkaWZmID4gZHVyYXRpb25XZWVrXG4gICAgICA/ICdNTS9ERCdcbiAgICAgIDogZGlmZiA+IGR1cmF0aW9uRGF5XG4gICAgICAgID8gJ01NL0REIGhoYSdcbiAgICAgICAgOiBkaWZmID4gZHVyYXRpb25Ib3VyXG4gICAgICAgICAgPyAnaGg6bW1hJ1xuICAgICAgICAgIDogJ2hoOm1tOnNzYSc7XG59XG5cbi8qKlxuICogU2FuaXR5IGNoZWNrIG9uIGZpbHRlcnMgdG8gcHJlcGFyZSBmb3Igc2F2ZVxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBmaWx0ZXIgdHlwZVxuICogQHBhcmFtIHsqfSB2YWx1ZSAtIGZpbHRlciB2YWx1ZVxuICogQHJldHVybnMge2Jvb2xlYW59IHdoZXRoZXIgZmlsdGVyIGlzIHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkRmlsdGVyVmFsdWUoe3R5cGUsIHZhbHVlfSkge1xuICBpZiAoIXR5cGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBGSUxURVJfVFlQRVMuc2VsZWN0OlxuICAgICAgcmV0dXJuIHZhbHVlID09PSB0cnVlIHx8IHZhbHVlID09PSBmYWxzZTtcblxuICAgIGNhc2UgRklMVEVSX1RZUEVTLnJhbmdlOlxuICAgIGNhc2UgRklMVEVSX1RZUEVTLnRpbWVSYW5nZTpcbiAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5ldmVyeSh2ID0+IHYgIT09IG51bGwgJiYgIWlzTmFOKHYpKTtcblxuICAgIGNhc2UgRklMVEVSX1RZUEVTLm11bHRpU2VsZWN0OlxuICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpICYmIEJvb2xlYW4odmFsdWUubGVuZ3RoKTtcblxuICAgIGNhc2UgRklMVEVSX1RZUEVTLmlucHV0OlxuICAgICAgcmV0dXJuIEJvb2xlYW4odmFsdWUubGVuZ3RoKTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmlsdGVyUGxvdChmaWx0ZXIsIGFsbERhdGEpIHtcbiAgaWYgKGZpbHRlci5wbG90VHlwZSA9PT0gUExPVF9UWVBFUy5oaXN0b2dyYW0gfHwgIWZpbHRlci55QXhpcykge1xuICAgIC8vIGhpc3RvZ3JhbSBzaG91bGQgYmUgY2FsY3VsYXRlZCB3aGVuIGNyZWF0ZSBmaWx0ZXJcbiAgICByZXR1cm4ge307XG4gIH1cblxuICBjb25zdCB7bWFwcGVkVmFsdWV9ID0gZmlsdGVyO1xuICBjb25zdCB7eUF4aXN9ID0gZmlsdGVyO1xuXG4gIC8vIHJldHVybiBsaW5lQ2hhcnRcbiAgY29uc3Qgc2VyaWVzID0gYWxsRGF0YVxuICAgIC5tYXAoKGQsIGkpID0+ICh7XG4gICAgICB4OiBtYXBwZWRWYWx1ZVtpXSxcbiAgICAgIHk6IGRbeUF4aXMudGFibGVGaWVsZEluZGV4IC0gMV1cbiAgICB9KSlcbiAgICAuZmlsdGVyKCh7eCwgeX0pID0+IE51bWJlci5pc0Zpbml0ZSh4KSAmJiBOdW1iZXIuaXNGaW5pdGUoeSkpXG4gICAgLnNvcnQoKGEsIGIpID0+IGFzY2VuZGluZyhhLngsIGIueCkpO1xuXG4gIGNvbnN0IHlEb21haW4gPSBleHRlbnQoc2VyaWVzLCBkID0+IGQueSk7XG4gIGNvbnN0IHhEb21haW4gPSBbc2VyaWVzWzBdLngsIHNlcmllc1tzZXJpZXMubGVuZ3RoIC0gMV0ueF07XG5cbiAgcmV0dXJuIHtsaW5lQ2hhcnQ6IHtzZXJpZXMsIHlEb21haW4sIHhEb21haW59LCB5QXhpc307XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0RmlsdGVyUGxvdFR5cGUoZmlsdGVyKSB7XG4gIGNvbnN0IGZpbHRlclBsb3RUeXBlcyA9IFN1cHBvcnRlZFBsb3RUeXBlW2ZpbHRlci50eXBlXTtcbiAgaWYgKCFmaWx0ZXJQbG90VHlwZXMpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmICghZmlsdGVyLnlBeGlzKSB7XG4gICAgcmV0dXJuIGZpbHRlclBsb3RUeXBlcy5kZWZhdWx0O1xuICB9XG5cbiAgcmV0dXJuIGZpbHRlclBsb3RUeXBlc1tmaWx0ZXIueUF4aXMudHlwZV0gfHwgbnVsbDtcbn1cbiJdfQ==