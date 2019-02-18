"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.propertiesV0 = exports.customMapStylePropsV1 = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _versions = require("./versions");

var _schema = _interopRequireDefault(require("./schema"));

var _mapStyleSchema;

var customMapStylePropsV1 = {
  accessToken: null,
  custom: null,
  icon: null,
  id: null,
  label: null,
  url: null
};
exports.customMapStylePropsV1 = customMapStylePropsV1;
var CustomMapStyleSchema = new _schema.default({
  version: _versions.VERSIONS.v1,
  key: 'customStyle',
  properties: customMapStylePropsV1
});

var MapStyleSchemaV1 =
/*#__PURE__*/
function (_Schema) {
  (0, _inherits2.default)(MapStyleSchemaV1, _Schema);

  function MapStyleSchemaV1() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, MapStyleSchemaV1);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(MapStyleSchemaV1)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "version", _versions.VERSIONS.v1);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "key", 'mapStyles');
    return _this;
  }

  (0, _createClass2.default)(MapStyleSchemaV1, [{
    key: "save",
    value: function save(mapStyles, mapStyle) {
      // save all custom styles
      var saveCustomStyle = Object.keys(mapStyles).reduce(function (accu, key) {
        return (0, _objectSpread2.default)({}, mapStyles[key].custom ? (0, _defineProperty2.default)({}, key, CustomMapStyleSchema.save(mapStyles[key]).customStyle) : {});
      }, {});
      return (0, _defineProperty2.default)({}, this.key, saveCustomStyle);
    }
  }, {
    key: "load",
    value: function load(mapStyles) {
      // If mapStyle is an empty object, do not load it
      return (0, _typeof2.default)(mapStyles) === 'object' && Object.keys(mapStyles).length ? (0, _defineProperty2.default)({}, this.key, mapStyles) : {};
    }
  }]);
  return MapStyleSchemaV1;
}(_schema.default); // version v0


var propertiesV0 = {
  styleType: null,
  topLayerGroups: null,
  visibleLayerGroups: null,
  buildingLayer: null,
  mapStyles: new MapStyleSchemaV1()
};
exports.propertiesV0 = propertiesV0;
var mapStyleSchema = (_mapStyleSchema = {}, (0, _defineProperty2.default)(_mapStyleSchema, _versions.VERSIONS.v0, new _schema.default({
  version: _versions.VERSIONS.v0,
  properties: propertiesV0,
  key: 'mapStyle'
})), (0, _defineProperty2.default)(_mapStyleSchema, _versions.VERSIONS.v1, new _schema.default({
  version: _versions.VERSIONS.v1,
  properties: propertiesV0,
  key: 'mapStyle'
})), _mapStyleSchema);
var _default = mapStyleSchema;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY2hlbWFzL21hcC1zdHlsZS1zY2hlbWEuanMiXSwibmFtZXMiOlsiY3VzdG9tTWFwU3R5bGVQcm9wc1YxIiwiYWNjZXNzVG9rZW4iLCJjdXN0b20iLCJpY29uIiwiaWQiLCJsYWJlbCIsInVybCIsIkN1c3RvbU1hcFN0eWxlU2NoZW1hIiwiU2NoZW1hIiwidmVyc2lvbiIsIlZFUlNJT05TIiwidjEiLCJrZXkiLCJwcm9wZXJ0aWVzIiwiTWFwU3R5bGVTY2hlbWFWMSIsIm1hcFN0eWxlcyIsIm1hcFN0eWxlIiwic2F2ZUN1c3RvbVN0eWxlIiwiT2JqZWN0Iiwia2V5cyIsInJlZHVjZSIsImFjY3UiLCJzYXZlIiwiY3VzdG9tU3R5bGUiLCJsZW5ndGgiLCJwcm9wZXJ0aWVzVjAiLCJzdHlsZVR5cGUiLCJ0b3BMYXllckdyb3VwcyIsInZpc2libGVMYXllckdyb3VwcyIsImJ1aWxkaW5nTGF5ZXIiLCJtYXBTdHlsZVNjaGVtYSIsInYwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7Ozs7QUFFTyxJQUFNQSxxQkFBcUIsR0FBRztBQUNuQ0MsRUFBQUEsV0FBVyxFQUFFLElBRHNCO0FBRW5DQyxFQUFBQSxNQUFNLEVBQUUsSUFGMkI7QUFHbkNDLEVBQUFBLElBQUksRUFBRSxJQUg2QjtBQUluQ0MsRUFBQUEsRUFBRSxFQUFFLElBSitCO0FBS25DQyxFQUFBQSxLQUFLLEVBQUUsSUFMNEI7QUFNbkNDLEVBQUFBLEdBQUcsRUFBRTtBQU44QixDQUE5Qjs7QUFTUCxJQUFNQyxvQkFBb0IsR0FBRyxJQUFJQyxlQUFKLENBQVc7QUFDdENDLEVBQUFBLE9BQU8sRUFBRUMsbUJBQVNDLEVBRG9CO0FBRXRDQyxFQUFBQSxHQUFHLEVBQUUsYUFGaUM7QUFHdENDLEVBQUFBLFVBQVUsRUFBRWI7QUFIMEIsQ0FBWCxDQUE3Qjs7SUFNTWMsZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7O2dJQUNNSixtQkFBU0MsRTs0SEFDYixXOzs7Ozs7eUJBQ0RJLFMsRUFBV0MsUSxFQUFVO0FBRXhCO0FBQ0EsVUFBTUMsZUFBZSxHQUFHQyxNQUFNLENBQUNDLElBQVAsQ0FBWUosU0FBWixFQUF1QkssTUFBdkIsQ0FBOEIsVUFBQ0MsSUFBRCxFQUFPVCxHQUFQO0FBQUEsK0NBQ2hERyxTQUFTLENBQUNILEdBQUQsQ0FBVCxDQUFlVixNQUFmLHFDQUNFVSxHQURGLEVBQ1FMLG9CQUFvQixDQUFDZSxJQUFyQixDQUEwQlAsU0FBUyxDQUFDSCxHQUFELENBQW5DLEVBQTBDVyxXQURsRCxJQUNpRSxFQUZqQjtBQUFBLE9BQTlCLEVBSXBCLEVBSm9CLENBQXhCO0FBTUEsK0NBQVMsS0FBS1gsR0FBZCxFQUFvQkssZUFBcEI7QUFDRDs7O3lCQUVJRixTLEVBQVc7QUFDZDtBQUNBLGFBQU8sc0JBQU9BLFNBQVAsTUFBcUIsUUFBckIsSUFBaUNHLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZSixTQUFaLEVBQXVCUyxNQUF4RCxxQ0FBbUUsS0FBS1osR0FBeEUsRUFBOEVHLFNBQTlFLElBQTJGLEVBQWxHO0FBQ0Q7OztFQWxCNEJQLGUsR0FxQi9COzs7QUFDTyxJQUFNaUIsWUFBWSxHQUFHO0FBQzFCQyxFQUFBQSxTQUFTLEVBQUUsSUFEZTtBQUUxQkMsRUFBQUEsY0FBYyxFQUFFLElBRlU7QUFHMUJDLEVBQUFBLGtCQUFrQixFQUFFLElBSE07QUFJMUJDLEVBQUFBLGFBQWEsRUFBRSxJQUpXO0FBSzFCZCxFQUFBQSxTQUFTLEVBQUUsSUFBSUQsZ0JBQUo7QUFMZSxDQUFyQjs7QUFRUCxJQUFNZ0IsY0FBYyx5RUFDakJwQixtQkFBU3FCLEVBRFEsRUFDSCxJQUFJdkIsZUFBSixDQUFXO0FBQ3hCQyxFQUFBQSxPQUFPLEVBQUVDLG1CQUFTcUIsRUFETTtBQUV4QmxCLEVBQUFBLFVBQVUsRUFBRVksWUFGWTtBQUd4QmIsRUFBQUEsR0FBRyxFQUFFO0FBSG1CLENBQVgsQ0FERyxrREFNakJGLG1CQUFTQyxFQU5RLEVBTUgsSUFBSUgsZUFBSixDQUFXO0FBQ3hCQyxFQUFBQSxPQUFPLEVBQUVDLG1CQUFTQyxFQURNO0FBRXhCRSxFQUFBQSxVQUFVLEVBQUVZLFlBRlk7QUFHeEJiLEVBQUFBLEdBQUcsRUFBRTtBQUhtQixDQUFYLENBTkcsbUJBQXBCO2VBYWVrQixjIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtWRVJTSU9OU30gZnJvbSAnLi92ZXJzaW9ucyc7XG5pbXBvcnQgU2NoZW1hIGZyb20gJy4vc2NoZW1hJztcblxuZXhwb3J0IGNvbnN0IGN1c3RvbU1hcFN0eWxlUHJvcHNWMSA9IHtcbiAgYWNjZXNzVG9rZW46IG51bGwsXG4gIGN1c3RvbTogbnVsbCxcbiAgaWNvbjogbnVsbCxcbiAgaWQ6IG51bGwsXG4gIGxhYmVsOiBudWxsLFxuICB1cmw6IG51bGxcbn07XG5cbmNvbnN0IEN1c3RvbU1hcFN0eWxlU2NoZW1hID0gbmV3IFNjaGVtYSh7XG4gIHZlcnNpb246IFZFUlNJT05TLnYxLFxuICBrZXk6ICdjdXN0b21TdHlsZScsXG4gIHByb3BlcnRpZXM6IGN1c3RvbU1hcFN0eWxlUHJvcHNWMVxufSk7XG5cbmNsYXNzIE1hcFN0eWxlU2NoZW1hVjEgZXh0ZW5kcyBTY2hlbWEge1xuICB2ZXJzaW9uID0gVkVSU0lPTlMudjE7XG4gIGtleSA9ICdtYXBTdHlsZXMnO1xuICBzYXZlKG1hcFN0eWxlcywgbWFwU3R5bGUpIHtcblxuICAgIC8vIHNhdmUgYWxsIGN1c3RvbSBzdHlsZXNcbiAgICBjb25zdCBzYXZlQ3VzdG9tU3R5bGUgPSBPYmplY3Qua2V5cyhtYXBTdHlsZXMpLnJlZHVjZSgoYWNjdSwga2V5KSA9PiAoe1xuICAgICAgLi4uKG1hcFN0eWxlc1trZXldLmN1c3RvbSA/XG4gICAgICAgICAge1trZXldOiBDdXN0b21NYXBTdHlsZVNjaGVtYS5zYXZlKG1hcFN0eWxlc1trZXldKS5jdXN0b21TdHlsZX0gOiB7fVxuICAgICAgKVxuICAgIH0pLCB7fSk7XG5cbiAgICByZXR1cm4ge1t0aGlzLmtleV06IHNhdmVDdXN0b21TdHlsZX07XG4gIH1cblxuICBsb2FkKG1hcFN0eWxlcykge1xuICAgIC8vIElmIG1hcFN0eWxlIGlzIGFuIGVtcHR5IG9iamVjdCwgZG8gbm90IGxvYWQgaXRcbiAgICByZXR1cm4gdHlwZW9mIG1hcFN0eWxlcyA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LmtleXMobWFwU3R5bGVzKS5sZW5ndGggPyB7W3RoaXMua2V5XTogbWFwU3R5bGVzfSA6IHt9O1xuICB9XG59XG5cbi8vIHZlcnNpb24gdjBcbmV4cG9ydCBjb25zdCBwcm9wZXJ0aWVzVjAgPSB7XG4gIHN0eWxlVHlwZTogbnVsbCxcbiAgdG9wTGF5ZXJHcm91cHM6IG51bGwsXG4gIHZpc2libGVMYXllckdyb3VwczogbnVsbCxcbiAgYnVpbGRpbmdMYXllcjogbnVsbCxcbiAgbWFwU3R5bGVzOiBuZXcgTWFwU3R5bGVTY2hlbWFWMSgpXG59O1xuXG5jb25zdCBtYXBTdHlsZVNjaGVtYSA9IHtcbiAgW1ZFUlNJT05TLnYwXTogbmV3IFNjaGVtYSh7XG4gICAgdmVyc2lvbjogVkVSU0lPTlMudjAsXG4gICAgcHJvcGVydGllczogcHJvcGVydGllc1YwLFxuICAgIGtleTogJ21hcFN0eWxlJ1xuICB9KSxcbiAgW1ZFUlNJT05TLnYxXTogbmV3IFNjaGVtYSh7XG4gICAgdmVyc2lvbjogVkVSU0lPTlMudjEsXG4gICAgcHJvcGVydGllczogcHJvcGVydGllc1YwLFxuICAgIGtleTogJ21hcFN0eWxlJ1xuICB9KVxufTtcblxuZXhwb3J0IGRlZmF1bHQgbWFwU3R5bGVTY2hlbWE7XG4iXX0=