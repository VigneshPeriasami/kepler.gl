"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PlotContainerFactory;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reselect = require("reselect");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactMapGl = require("react-map-gl");

var _lodash = _interopRequireDefault(require("lodash.debounce"));

var _window = _interopRequireDefault(require("global/window"));

var _mapContainer = _interopRequireDefault(require("./map-container"));

var _exportImageUtils = require("../utils/export-image-utils");

var _mapboxGlStyleEditor = require("../utils/map-style-utils/mapbox-gl-style-editor");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  .mapboxgl-ctrl-bottom-left,\n  .mapboxgl-ctrl-bottom-right {\n    display: none;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var propTypes = {
  width: _propTypes.default.number.isRequired,
  height: _propTypes.default.number.isRequired,
  exportImageSetting: _propTypes.default.object.isRequired,
  mapFields: _propTypes.default.object.isRequired
};
PlotContainerFactory.deps = [_mapContainer.default];

var StyledPlotContainer = _styledComponents.default.div(_templateObject());

function PlotContainerFactory(MapContainer) {
  var PlotContainer =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2.default)(PlotContainer, _Component);

    function PlotContainer(_props) {
      var _this;

      (0, _classCallCheck2.default)(this, PlotContainer);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PlotContainer).call(this, _props));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "mapStyleSelector", function (props) {
        return props.mapFields.mapStyle;
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "resolutionSelector", function (props) {
        return props.exportImageSetting.resolution;
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "scaledMapStyleSelector", (0, _reselect.createSelector)(_this.mapStyleSelector, _this.resolutionSelector, function (mapStyle, resolution) {
        return (0, _objectSpread2.default)({}, mapStyle, {
          bottomMapStyle: (0, _mapboxGlStyleEditor.scaleMapStyleByResolution)(mapStyle.bottomMapStyle, resolution),
          topMapStyle: (0, _mapboxGlStyleEditor.scaleMapStyleByResolution)(mapStyle.topMapStyle, resolution)
        });
      }));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_onMapRender", function (map) {
        if (map.isStyleLoaded()) {
          _this._retrieveNewScreenshot();
        }
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_retrieveNewScreenshot", function () {
        if (_this.plottingAreaRef) {
          // setting windowDevicePixelRatio to 1
          // so that large mapbox base map will load in full
          var savedDevicePixelRatio = _window.default.devicePixelRatio;
          _window.default.devicePixelRatio = 1;

          _this.props.startExportingImage();

          (0, _exportImageUtils.convertToPng)(_this.plottingAreaRef).then(function (dataUri) {
            _this.props.setExportImageDataUri(dataUri);

            _window.default.devicePixelRatio = savedDevicePixelRatio;
          });
        }
      });
      _this._onMapRender = (0, _lodash.default)(_this._onMapRender, 500);
      return _this;
    }

    (0, _createClass2.default)(PlotContainer, [{
      key: "componentWillMount",
      value: function componentWillMount() {
        this.props.startExportingImage();
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(newProps) {
        var _this2 = this;

        // re-fetch the new screenshot only when ratio legend or resolution changes
        var checks = ['ratio', 'resolution', 'legend'];
        var shouldRetrieveScreenshot = checks.some(function (item) {
          return _this2.props.exportImageSetting[item] !== newProps.exportImageSetting[item];
        });

        if (shouldRetrieveScreenshot) {
          this._retrieveNewScreenshot();
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this3 = this;

        var _this$props = this.props,
            width = _this$props.width,
            height = _this$props.height,
            exportImageSetting = _this$props.exportImageSetting,
            mapFields = _this$props.mapFields;
        var ratio = exportImageSetting.ratio,
            resolution = exportImageSetting.resolution,
            legend = exportImageSetting.legend;
        var exportImageSize = (0, _exportImageUtils.calculateExportImageSize)({
          width: width,
          height: height,
          ratio: ratio,
          resolution: resolution
        });
        var mapProps = (0, _objectSpread2.default)({}, mapFields, {
          mapStyle: this.scaledMapStyleSelector(this.props),
          // override viewport based on export settings
          mapState: (0, _objectSpread2.default)({}, mapFields.mapState, exportImageSize, {
            zoom: mapFields.mapState.zoom + exportImageSize.zoomOffset
          }),
          mapControls: {
            // override map legend visibility
            mapLegend: {
              show: legend,
              active: true
            }
          },
          MapComponent: _reactMapGl.StaticMap
        });
        return _react.default.createElement(StyledPlotContainer, {
          style: {
            position: 'absolute',
            top: -9999,
            left: -9999
          }
        }, _react.default.createElement("div", {
          ref: function ref(element) {
            _this3.plottingAreaRef = element;
          },
          style: {
            width: exportImageSize.width,
            height: exportImageSize.height
          }
        }, _react.default.createElement(MapContainer, (0, _extends2.default)({
          index: 0,
          onMapRender: this._onMapRender,
          isExport: true
        }, mapProps))));
      }
    }]);
    return PlotContainer;
  }(_react.Component);

  PlotContainer.propsTypes = propTypes;
  return PlotContainer;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Bsb3QtY29udGFpbmVyLmpzIl0sIm5hbWVzIjpbInByb3BUeXBlcyIsIndpZHRoIiwiUHJvcFR5cGVzIiwibnVtYmVyIiwiaXNSZXF1aXJlZCIsImhlaWdodCIsImV4cG9ydEltYWdlU2V0dGluZyIsIm9iamVjdCIsIm1hcEZpZWxkcyIsIlBsb3RDb250YWluZXJGYWN0b3J5IiwiZGVwcyIsIk1hcENvbnRhaW5lckZhY3RvcnkiLCJTdHlsZWRQbG90Q29udGFpbmVyIiwic3R5bGVkIiwiZGl2IiwiTWFwQ29udGFpbmVyIiwiUGxvdENvbnRhaW5lciIsInByb3BzIiwibWFwU3R5bGUiLCJyZXNvbHV0aW9uIiwibWFwU3R5bGVTZWxlY3RvciIsInJlc29sdXRpb25TZWxlY3RvciIsImJvdHRvbU1hcFN0eWxlIiwidG9wTWFwU3R5bGUiLCJtYXAiLCJpc1N0eWxlTG9hZGVkIiwiX3JldHJpZXZlTmV3U2NyZWVuc2hvdCIsInBsb3R0aW5nQXJlYVJlZiIsInNhdmVkRGV2aWNlUGl4ZWxSYXRpbyIsIndpbmRvdyIsImRldmljZVBpeGVsUmF0aW8iLCJzdGFydEV4cG9ydGluZ0ltYWdlIiwidGhlbiIsImRhdGFVcmkiLCJzZXRFeHBvcnRJbWFnZURhdGFVcmkiLCJfb25NYXBSZW5kZXIiLCJuZXdQcm9wcyIsImNoZWNrcyIsInNob3VsZFJldHJpZXZlU2NyZWVuc2hvdCIsInNvbWUiLCJpdGVtIiwicmF0aW8iLCJsZWdlbmQiLCJleHBvcnRJbWFnZVNpemUiLCJtYXBQcm9wcyIsInNjYWxlZE1hcFN0eWxlU2VsZWN0b3IiLCJtYXBTdGF0ZSIsInpvb20iLCJ6b29tT2Zmc2V0IiwibWFwQ29udHJvbHMiLCJtYXBMZWdlbmQiLCJzaG93IiwiYWN0aXZlIiwiTWFwQ29tcG9uZW50IiwiU3RhdGljTWFwIiwicG9zaXRpb24iLCJ0b3AiLCJsZWZ0IiwiZWxlbWVudCIsIkNvbXBvbmVudCIsInByb3BzVHlwZXMiXSwibWFwcGluZ3Mi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QUFFO0FBQUNDLFlBQUFBLFFBQVEsRUFBRSxVQUFYO0FBQXVCQyxZQUFBQSxHQUFHLEVBQUUsQ0FBQyxJQUE3QjtBQUFtQ0MsWUFBQUEsSUFBSSxFQUFFLENBQUM7QUFBMUM7QUFEVCxXQUdFO0FBQ0UsVUFBQSxHQUFHLEVBQUUsYUFBQUMsT0FBTyxFQUFJO0FBQ2QsWUFBQSxNQUFJLENBQUMvQixlQUFMLEdBQXVCK0IsT0FBdkI7QUFDRCxXQUhIO0FBSUUsVUFBQSxLQUFLLEVBQUU7QUFDTHpELFlBQUFBLEtBQUssRUFBRTBDLGVBQWUsQ0FBQzFDLEtBRGxCO0FBRUxJLFlBQUFBLE1BQU0sRUFBRXNDLGVBQWUsQ0FBQ3RDO0FBRm5CO0FBSlQsV0FTRSw2QkFBQyxZQUFEO0FBQ0UsVUFBQSxLQUFLLEVBQUUsQ0FEVDtBQUVFLFVBQUEsV0FBVyxFQUFFLEtBQUs4QixZQUZwQjtBQUdFLFVBQUEsUUFBUTtBQUhWLFdBSU1TLFFBSk4sRUFURixDQUhGLENBREY7QUFzQkQ7QUFoSHNEO0FBQUE7QUFBQSxJQUM3QmUsZ0JBRDZCOztBQW1IekQzQyxFQUFBQSxhQUFhLENBQUM0QyxVQUFkLEdBQTJCNUQsU0FBM0I7QUFDQSxTQUFPZ0IsYUFBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuLy8gbGlicmFyaWVzXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQge2NyZWF0ZVNlbGVjdG9yfSBmcm9tICdyZXNlbGVjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7U3RhdGljTWFwfSBmcm9tICdyZWFjdC1tYXAtZ2wnO1xuaW1wb3J0IGRlYm91bmNlIGZyb20gJ2xvZGFzaC5kZWJvdW5jZSc7XG5pbXBvcnQgd2luZG93IGZyb20gJ2dsb2JhbC93aW5kb3cnO1xuXG5pbXBvcnQgTWFwQ29udGFpbmVyRmFjdG9yeSBmcm9tICcuL21hcC1jb250YWluZXInO1xuaW1wb3J0IHtjYWxjdWxhdGVFeHBvcnRJbWFnZVNpemUsIGNvbnZlcnRUb1BuZ30gZnJvbSAndXRpbHMvZXhwb3J0LWltYWdlLXV0aWxzJztcbmltcG9ydCB7c2NhbGVNYXBTdHlsZUJ5UmVzb2x1dGlvbn0gZnJvbSAndXRpbHMvbWFwLXN0eWxlLXV0aWxzL21hcGJveC1nbC1zdHlsZS1lZGl0b3InO1xuY29uc3QgcHJvcFR5cGVzID0ge1xuICB3aWR0aDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICBoZWlnaHQ6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgZXhwb3J0SW1hZ2VTZXR0aW5nOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIG1hcEZpZWxkczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXG59O1xuXG5QbG90Q29udGFpbmVyRmFjdG9yeS5kZXBzID0gW01hcENvbnRhaW5lckZhY3RvcnldO1xuXG5jb25zdCBTdHlsZWRQbG90Q29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgLm1hcGJveGdsLWN0cmwtYm90dG9tLWxlZnQsXG4gIC5tYXBib3hnbC1jdHJsLWJvdHRvbS1yaWdodCB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxuYDtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUGxvdENvbnRhaW5lckZhY3RvcnkoTWFwQ29udGFpbmVyKSB7XG4gIGNsYXNzIFBsb3RDb250YWluZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICBzdXBlcihwcm9wcyk7XG4gICAgICB0aGlzLl9vbk1hcFJlbmRlciA9IGRlYm91bmNlKHRoaXMuX29uTWFwUmVuZGVyLCA1MDApO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgIHRoaXMucHJvcHMuc3RhcnRFeHBvcnRpbmdJbWFnZSgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpIHtcbiAgICAgIC8vIHJlLWZldGNoIHRoZSBuZXcgc2NyZWVuc2hvdCBvbmx5IHdoZW4gcmF0aW8gbGVnZW5kIG9yIHJlc29sdXRpb24gY2hhbmdlc1xuICAgICAgY29uc3QgY2hlY2tzID0gWydyYXRpbycsICdyZXNvbHV0aW9uJywgJ2xlZ2VuZCddO1xuICAgICAgY29uc3Qgc2hvdWxkUmV0cmlldmVTY3JlZW5zaG90ID0gY2hlY2tzLnNvbWUoXG4gICAgICAgIGl0ZW0gPT5cbiAgICAgICAgICB0aGlzLnByb3BzLmV4cG9ydEltYWdlU2V0dGluZ1tpdGVtXSAhPT1cbiAgICAgICAgICBuZXdQcm9wcy5leHBvcnRJbWFnZVNldHRpbmdbaXRlbV1cbiAgICAgICk7XG4gICAgICBpZiAoc2hvdWxkUmV0cmlldmVTY3JlZW5zaG90KSB7XG4gICAgICAgIHRoaXMuX3JldHJpZXZlTmV3U2NyZWVuc2hvdCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1hcFN0eWxlU2VsZWN0b3IgPSBwcm9wcyA9PiBwcm9wcy5tYXBGaWVsZHMubWFwU3R5bGU7XG4gICAgcmVzb2x1dGlvblNlbGVjdG9yID0gcHJvcHMgPT4gcHJvcHMuZXhwb3J0SW1hZ2VTZXR0aW5nLnJlc29sdXRpb247XG4gICAgc2NhbGVkTWFwU3R5bGVTZWxlY3RvciA9IGNyZWF0ZVNlbGVjdG9yKFxuICAgICAgdGhpcy5tYXBTdHlsZVNlbGVjdG9yLFxuICAgICAgdGhpcy5yZXNvbHV0aW9uU2VsZWN0b3IsXG4gICAgICAobWFwU3R5bGUsIHJlc29sdXRpb24pID0+ICh7XG4gICAgICAgIC4uLm1hcFN0eWxlLFxuICAgICAgICBib3R0b21NYXBTdHlsZTogc2NhbGVNYXBTdHlsZUJ5UmVzb2x1dGlvbihcbiAgICAgICAgICBtYXBTdHlsZS5ib3R0b21NYXBTdHlsZSxcbiAgICAgICAgICByZXNvbHV0aW9uXG4gICAgICAgICksXG4gICAgICAgIHRvcE1hcFN0eWxlOiBzY2FsZU1hcFN0eWxlQnlSZXNvbHV0aW9uKG1hcFN0eWxlLnRvcE1hcFN0eWxlLCByZXNvbHV0aW9uKVxuICAgICAgfSlcbiAgICApO1xuXG4gICAgX29uTWFwUmVuZGVyID0gbWFwID0+IHtcbiAgICAgIGlmIChtYXAuaXNTdHlsZUxvYWRlZCgpKSB7XG4gICAgICAgIHRoaXMuX3JldHJpZXZlTmV3U2NyZWVuc2hvdCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfcmV0cmlldmVOZXdTY3JlZW5zaG90ID0gKCkgPT4ge1xuICAgICAgaWYgKHRoaXMucGxvdHRpbmdBcmVhUmVmKSB7XG4gICAgICAvLyBzZXR0aW5nIHdpbmRvd0RldmljZVBpeGVsUmF0aW8gdG8gMVxuICAgICAgLy8gc28gdGhhdCBsYXJnZSBtYXBib3ggYmFzZSBtYXAgd2lsbCBsb2FkIGluIGZ1bGxcbiAgICAgICAgY29uc3Qgc2F2ZWREZXZpY2VQaXhlbFJhdGlvID0gd2luZG93LmRldmljZVBpeGVsUmF0aW87XG4gICAgICAgIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvID0gMTtcblxuICAgICAgICB0aGlzLnByb3BzLnN0YXJ0RXhwb3J0aW5nSW1hZ2UoKTtcbiAgICAgICAgY29udmVydFRvUG5nKHRoaXMucGxvdHRpbmdBcmVhUmVmKS50aGVuKGRhdGFVcmkgPT4ge1xuICAgICAgICAgIHRoaXMucHJvcHMuc2V0RXhwb3J0SW1hZ2VEYXRhVXJpKGRhdGFVcmkpO1xuICAgICAgICAgIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvID0gc2F2ZWREZXZpY2VQaXhlbFJhdGlvO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmVuZGVyKCkge1xuICAgICAgY29uc3Qge3dpZHRoLCBoZWlnaHQsIGV4cG9ydEltYWdlU2V0dGluZywgbWFwRmllbGRzfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCB7cmF0aW8sIHJlc29sdXRpb24sIGxlZ2VuZH0gPSBleHBvcnRJbWFnZVNldHRpbmc7XG4gICAgICBjb25zdCBleHBvcnRJbWFnZVNpemUgPSBjYWxjdWxhdGVFeHBvcnRJbWFnZVNpemUoe1xuICAgICAgICB3aWR0aCxcbiAgICAgICAgaGVpZ2h0LFxuICAgICAgICByYXRpbyxcbiAgICAgICAgcmVzb2x1dGlvblxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IG1hcFByb3BzID0ge1xuICAgICAgICAuLi5tYXBGaWVsZHMsXG4gICAgICAgIG1hcFN0eWxlOiB0aGlzLnNjYWxlZE1hcFN0eWxlU2VsZWN0b3IodGhpcy5wcm9wcyksXG5cbiAgICAgICAgLy8gb3ZlcnJpZGUgdmlld3BvcnQgYmFzZWQgb24gZXhwb3J0IHNldHRpbmdzXG4gICAgICAgIG1hcFN0YXRlOiB7XG4gICAgICAgICAgLi4ubWFwRmllbGRzLm1hcFN0YXRlLFxuICAgICAgICAgIC4uLmV4cG9ydEltYWdlU2l6ZSxcbiAgICAgICAgICB6b29tOiBtYXBGaWVsZHMubWFwU3RhdGUuem9vbSArIGV4cG9ydEltYWdlU2l6ZS56b29tT2Zmc2V0XG4gICAgICAgIH0sXG4gICAgICAgIG1hcENvbnRyb2xzOiB7XG4gICAgICAgICAgLy8gb3ZlcnJpZGUgbWFwIGxlZ2VuZCB2aXNpYmlsaXR5XG4gICAgICAgICAgbWFwTGVnZW5kOiB7XG4gICAgICAgICAgICBzaG93OiBsZWdlbmQsXG4gICAgICAgICAgICBhY3RpdmU6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIE1hcENvbXBvbmVudDogU3RhdGljTWFwXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8U3R5bGVkUGxvdENvbnRhaW5lclxuICAgICAgICAgIHN0eWxlPXt7cG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogLTk5OTksIGxlZnQ6IC05OTk5fX1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIHJlZj17ZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgIHRoaXMucGxvdHRpbmdBcmVhUmVmID0gZWxlbWVudDtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICB3aWR0aDogZXhwb3J0SW1hZ2VTaXplLndpZHRoLFxuICAgICAgICAgICAgICBoZWlnaHQ6IGV4cG9ydEltYWdlU2l6ZS5oZWlnaHRcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPE1hcENvbnRhaW5lclxuICAgICAgICAgICAgICBpbmRleD17MH1cbiAgICAgICAgICAgICAgb25NYXBSZW5kZXI9e3RoaXMuX29uTWFwUmVuZGVyfVxuICAgICAgICAgICAgICBpc0V4cG9ydFxuICAgICAgICAgICAgICB7Li4ubWFwUHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L1N0eWxlZFBsb3RDb250YWluZXI+XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIFBsb3RDb250YWluZXIucHJvcHNUeXBlcyA9IHByb3BUeXBlcztcbiAgcmV0dXJuIFBsb3RDb250YWluZXI7XG59XG4iXX0=