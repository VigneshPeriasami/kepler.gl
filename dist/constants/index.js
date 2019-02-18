"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DIMENSIONS", {
  enumerable: true,
  get: function get() {
    return _defaultSettings.DIMENSIONS;
  }
});
Object.defineProperty(exports, "ALL_FIELD_TYPES", {
  enumerable: true,
  get: function get() {
    return _defaultSettings.ALL_FIELD_TYPES;
  }
});
Object.defineProperty(exports, "FIELD_OPTS", {
  enumerable: true,
  get: function get() {
    return _defaultSettings.FIELD_OPTS;
  }
});
Object.defineProperty(exports, "FILTER_TYPES", {
  enumerable: true,
  get: function get() {
    return _defaultSettings.FILTER_TYPES;
  }
});
Object.defineProperty(exports, "GEOJSON_FIELDS", {
  enumerable: true,
  get: function get() {
    return _defaultSettings.GEOJSON_FIELDS;
  }
});
Object.defineProperty(exports, "ICON_FIELDS", {
  enumerable: true,
  get: function get() {
    return _defaultSettings.ICON_FIELDS;
  }
});
Object.defineProperty(exports, "TRIP_POINT_FIELDS", {
  enumerable: true,
  get: function get() {
    return _defaultSettings.TRIP_POINT_FIELDS;
  }
});
Object.defineProperty(exports, "TRIP_ARC_FIELDS", {
  enumerable: true,
  get: function get() {
    return _defaultSettings.TRIP_ARC_FIELDS;
  }
});
Object.defineProperty(exports, "SCALE_TYPES", {
  enumerable: true,
  get: function get() {
    return _defaultSettings.SCALE_TYPES;
  }
});
Object.defineProperty(exports, "LAYER_TYPES", {
  enumerable: true,
  get: function get() {
    return _defaultSettings.LAYER_TYPES;
  }
});
Object.defineProperty(exports, "LAYER_BLENDINGS", {
  enumerable: true,
  get: function get() {
    return _defaultSettings.LAYER_BLENDINGS;
  }
});
Object.defineProperty(exports, "AGGREGATION_TYPES", {
  enumerable: true,
  get: function get() {
    return _defaultSettings.AGGREGATION_TYPES;
  }
});
Object.defineProperty(exports, "MAX_DEFAULT_TOOLTIPS", {
  enumerable: true,
  get: function get() {
    return _defaultSettings.MAX_DEFAULT_TOOLTIPS;
  }
});
Object.defineProperty(exports, "VizColorPalette", {
  enumerable: true,
  get: function get() {
    return _customColorRanges.VizColorPalette;
  }
});
Object.defineProperty(exports, "DataVizColors", {
  enumerable: true,
  get: function get() {
    return _customColorRanges.DataVizColors;
  }
});
Object.defineProperty(exports, "COLOR_RANGES", {
  enumerable: true,
  get: function get() {
    return _colorRanges.COLOR_RANGES;
  }
});
Object.defineProperty(exports, "DefaultColorRange", {
  enumerable: true,
  get: function get() {
    return _colorRanges.DefaultColorRange;
  }
});

var _defaultSettings = require("./default-settings");

var _customColorRanges = require("./custom-color-ranges");

var _colorRanges = require("./color-ranges");
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25zdGFudHMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBOztBQWVBOztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuLy8gQ29uc3RhbnRzXG5leHBvcnQge1xuICBESU1FTlNJT05TLFxuICBBTExfRklFTERfVFlQRVMsXG4gIEZJRUxEX09QVFMsXG4gIEZJTFRFUl9UWVBFUyxcbiAgR0VPSlNPTl9GSUVMRFMsXG4gIElDT05fRklFTERTLFxuICBUUklQX1BPSU5UX0ZJRUxEUyxcbiAgVFJJUF9BUkNfRklFTERTLFxuICBTQ0FMRV9UWVBFUyxcbiAgTEFZRVJfVFlQRVMsXG4gIExBWUVSX0JMRU5ESU5HUyxcbiAgQUdHUkVHQVRJT05fVFlQRVMsXG4gIE1BWF9ERUZBVUxUX1RPT0xUSVBTXG59IGZyb20gJy4vZGVmYXVsdC1zZXR0aW5ncyc7XG5leHBvcnQge1ZpekNvbG9yUGFsZXR0ZSwgRGF0YVZpekNvbG9yc30gZnJvbSAnLi9jdXN0b20tY29sb3ItcmFuZ2VzJztcbmV4cG9ydCB7Q09MT1JfUkFOR0VTLCBEZWZhdWx0Q29sb3JSYW5nZX0gZnJvbSAnLi9jb2xvci1yYW5nZXMnO1xuIl19