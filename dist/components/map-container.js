"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MapContainerFactory;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread4 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactMapGl = _interopRequireDefault(require("react-map-gl"));

var _deck = _interopRequireDefault(require("deck.gl"));

var _constants = _interopRequireDefault(require("luma.gl/constants"));

var _luma = require("luma.gl");

var _pickingModule = _interopRequireDefault(require("../shaderlib/picking-module"));

var _brushingModule = _interopRequireDefault(require("../shaderlib/brushing-module"));

var _mapPopover = _interopRequireDefault(require("./map/map-popover"));

var _mapControl = _interopRequireDefault(require("./map/map-control"));

var _styledComponents = require("./common/styled-components");

var _mapboxUtils = require("../layers/mapbox-utils");

var _mapboxUtils2 = require("../utils/map-style-utils/mapbox-utils");

var _defaultSettings = require("../constants/default-settings");

var _dBuildingLayer = _interopRequireDefault(require("../deckgl-layers/3d-building-layer/3d-building-layer"));

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
// libraries
// components
// Overlay type
// default-settings
var MAP_STYLE = {
  container: {
    display: 'inline-block',
    position: 'relative'
  },
  top: {
    position: 'absolute',
    top: '0px',
    pointerEvents: 'none'
  }
};

var getGlConst = function getGlConst(d) {
  return _constants.default[d];
};

var MAPBOXGL_STYLE_UPDATE = 'style.load';
var TRANSITION_DURATION = 0;
MapContainerFactory.deps = [_mapPopover.default, _mapControl.default];

function MapContainerFactory(MapPopover, MapControl) {
  var MapContainer =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2.default)(MapContainer, _Component);

    function MapContainer(props) {
      var _this;

      (0, _classCallCheck2.default)(this, MapContainer);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MapContainer).call(this, props));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_onCloseMapPopover", function () {
        _this.props.visStateActions.onLayerClick(null);
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_onLayerSetDomain", function (idx, colorDomain) {
        _this.props.visStateActions.layerConfigChange(_this.props.layers[idx], {
          colorDomain: colorDomain
        });
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_onWebGLInitialized", function (gl) {
        (0, _luma.registerShaderModules)([_pickingModule.default, _brushingModule.default], {
          ignoreMultipleRegistrations: true
        }); // allow Uint32 indices in building layer
        // gl.getExtension('OES_element_index_uint');
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_onMouseMove", function (evt) {
        var brush = _this.props.interactionConfig.brush;

        if (evt.nativeEvent && brush.enabled) {
          _this.setState({
            mousePosition: [evt.nativeEvent.offsetX, evt.nativeEvent.offsetY]
          });
        }
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_handleMapToggleLayer", function (layerId) {
        var _this$props = _this.props,
            _this$props$index = _this$props.index,
            mapIndex = _this$props$index === void 0 ? 0 : _this$props$index,
            visStateActions = _this$props.visStateActions;
        visStateActions.toggleLayerForMap(mapIndex, layerId);
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_setMapboxMap", function (mapbox) {
        if (!_this._map && mapbox) {
          _this._map = mapbox.getMap(); // bind mapboxgl event listener

          _this._map.on(MAPBOXGL_STYLE_UPDATE, function () {
            // force refresh mapboxgl layers
            (0, _mapboxUtils.updateMapboxLayers)(_this._map, _this._renderMapboxLayers(), _this.previousLayers, _this.props.mapLayers, {
              force: true
            });

            if (typeof _this.props.onMapStyleLoaded === 'function') {
              _this.props.onMapStyleLoaded(_this._map);
            }
          });

          _this._map.on('render', function () {
            if (typeof _this.props.onMapRender === 'function') {
              _this.props.onMapRender(_this._map);
            }
          });
        }
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_onBeforeRender", function (_ref) {
        var gl = _ref.gl;

        _this._setlayerBlending(gl);
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_setlayerBlending", function (gl) {
        var blending = _defaultSettings.LAYER_BLENDINGS[_this.props.layerBlending];
        var blendFunc = blending.blendFunc,
            blendEquation = blending.blendEquation;
        (0, _luma.setParameters)(gl, (0, _objectSpread4.default)((0, _defineProperty2.default)({}, _constants.default.BLEND, true), blendFunc ? {
          blendFunc: blendFunc.map(getGlConst),
          blendEquation: Array.isArray(blendEquation) ? blendEquation.map(getGlConst) : getGlConst(blendEquation)
        } : {}));
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_renderLayer", function (overlays, idx) {
        var _this$props2 = _this.props,
            layers = _this$props2.layers,
            layerData = _this$props2.layerData,
            hoverInfo = _this$props2.hoverInfo,
            clicked = _this$props2.clicked,
            mapLayers = _this$props2.mapLayers,
            mapState = _this$props2.mapState,
            interactionConfig = _this$props2.interactionConfig;
        var mousePosition = _this.state.mousePosition;
        var layer = layers[idx];
        var data = layerData[idx];
        var layerInteraction = {
          mousePosition: mousePosition
        };
        var objectHovered = clicked || hoverInfo;
        var layerCallbacks = {
          onSetLayerDomain: function onSetLayerDomain(val) {
            return _this._onLayerSetDomain(idx, val);
          }
        };

        if (!_this._shouldRenderLayer(layer, data, mapLayers)) {
          return overlays;
        }

        var layerOverlay = []; // Layer is Layer class

        if (typeof layer.renderLayer === 'function') {
          layerOverlay = layer.renderLayer({
            data: data,
            idx: idx,
            layerInteraction: layerInteraction,
            objectHovered: objectHovered,
            mapState: mapState,
            interactionConfig: interactionConfig,
            layerCallbacks: layerCallbacks
          });
        }

        if (layerOverlay.length) {
          overlays = overlays.concat(layerOverlay);
        }

        return overlays;
      });
      _this.state = {
        mousePosition: [0, 0]
      };
      _this.previousLayers = {// [layers.id]: mapboxLayerConfig
      };
      return _this;
    }

    (0, _createClass2.default)(MapContainer, [{
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        // unbind mapboxgl event listener
        if (this._map) {
          this._map.off(MAPBOXGL_STYLE_UPDATE);
        }
      }
      /* component private functions */

    }, {
      key: "_renderObjectLayerPopover",

      /* component render functions */

      /* eslint-disable complexity */
      value: function _renderObjectLayerPopover() {
        // TODO: move this into reducer so it can be tested
        var _this$props3 = this.props,
            mapState = _this$props3.mapState,
            hoverInfo = _this$props3.hoverInfo,
            clicked = _this$props3.clicked,
            datasets = _this$props3.datasets,
            interactionConfig = _this$props3.interactionConfig,
            layers = _this$props3.layers,
            mapLayers = _this$props3.mapLayers; // if clicked something, ignore hover behavior

        var objectInfo = clicked || hoverInfo;

        if (!interactionConfig.tooltip.enabled || !objectInfo || !objectInfo.picked) {
          // nothing hovered
          return null;
        }

        var lngLat = objectInfo.lngLat,
            object = objectInfo.object,
            overlay = objectInfo.layer; // deckgl layer to kepler-gl layer

        var layer = layers[overlay.props.idx];

        if (!layer || !layer.config.isVisible || !object || !layer.getHoverData || mapLayers && !mapLayers[layer.id].isVisible) {
          // layer is not visible
          return null;
        }

        var dataId = layer.config.dataId;
        var _datasets$dataId = datasets[dataId],
            allData = _datasets$dataId.allData,
            fields = _datasets$dataId.fields;
        var data = layer.getHoverData(object, allData); // project lnglat to screen so that tooltip follows the object on zoom

        var viewport = overlay.context.viewport;

        var _ref2 = this._getHoverXY(viewport, lngLat) || objectInfo,
            x = _ref2.x,
            y = _ref2.y;

        var popoverProps = {
          data: data,
          fields: fields,
          fieldsToShow: interactionConfig.tooltip.config.fieldsToShow[dataId],
          layer: layer,
          isVisible: true,
          x: x,
          y: y,
          freezed: Boolean(clicked),
          onClose: this._onCloseMapPopover,
          mapState: mapState
        };
        return _react.default.createElement("div", null, _react.default.createElement(MapPopover, popoverProps));
      }
      /* eslint-enable complexity */

    }, {
      key: "_getHoverXY",
      value: function _getHoverXY(viewport, lngLat) {
        var screenCoord = !viewport || !lngLat ? null : viewport.project(lngLat);
        return screenCoord && {
          x: screenCoord[0],
          y: screenCoord[1]
        };
      }
    }, {
      key: "_shouldRenderLayer",
      value: function _shouldRenderLayer(layer, data, mapLayers) {
        var isAvailableAndVisible = !(mapLayers && mapLayers[layer.id]) || mapLayers[layer.id].isVisible;
        return layer.shouldRenderLayer(data) && isAvailableAndVisible;
      }
    }, {
      key: "_renderOverlay",
      value: function _renderOverlay() {
        var _this$props4 = this.props,
            mapState = _this$props4.mapState,
            mapStyle = _this$props4.mapStyle,
            layerData = _this$props4.layerData,
            layerOrder = _this$props4.layerOrder,
            visStateActions = _this$props4.visStateActions,
            mapboxApiAccessToken = _this$props4.mapboxApiAccessToken;
        var deckGlLayers = []; // wait until data is ready before render data layers

        if (layerData && layerData.length) {
          // last layer render first
          deckGlLayers = layerOrder.slice().reverse().reduce(this._renderLayer, []);
        }

        if (mapStyle.visibleLayerGroups['3d building']) {
          deckGlLayers.push(new _dBuildingLayer.default({
            id: '_keplergl_3d-building',
            mapboxApiAccessToken: mapboxApiAccessToken,
            threeDBuildingColor: mapStyle.threeDBuildingColor
          }));
        }

        return _react.default.createElement(_deck.default, {
          viewState: mapState,
          id: "default-deckgl-overlay",
          layers: deckGlLayers,
          onWebGLInitialized: this._onWebGLInitialized,
          onBeforeRender: this._onBeforeRender,
          onLayerHover: visStateActions.onLayerHover,
          onLayerClick: visStateActions.onLayerClick
        });
      }
    }, {
      key: "_renderMapboxLayers",
      value: function _renderMapboxLayers() {
        var _this$props5 = this.props,
            layers = _this$props5.layers,
            layerData = _this$props5.layerData,
            layerOrder = _this$props5.layerOrder;
        return (0, _mapboxUtils.generateMapboxLayers)(layers, layerData, layerOrder);
      }
    }, {
      key: "_renderMapboxOverlays",
      value: function _renderMapboxOverlays() {
        if (this._map && this._map.isStyleLoaded()) {
          var mapboxLayers = this._renderMapboxLayers();

          (0, _mapboxUtils.updateMapboxLayers)(this._map, mapboxLayers, this.previousLayers, this.props.mapLayers);
          this.previousLayers = mapboxLayers.reduce(function (final, layer) {
            return (0, _objectSpread4.default)({}, final, (0, _defineProperty2.default)({}, layer.id, layer.config));
          }, {});
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props6 = this.props,
            mapState = _this$props6.mapState,
            mapStyle = _this$props6.mapStyle,
            mapStateActions = _this$props6.mapStateActions,
            mapLayers = _this$props6.mapLayers,
            layers = _this$props6.layers,
            MapComponent = _this$props6.MapComponent,
            datasets = _this$props6.datasets,
            mapboxApiAccessToken = _this$props6.mapboxApiAccessToken,
            mapControls = _this$props6.mapControls,
            toggleMapControl = _this$props6.toggleMapControl;
        var updateMap = mapStateActions.updateMap,
            onMapClick = mapStateActions.onMapClick;

        if (!mapStyle.bottomMapStyle) {
          // style not yet loaded
          return _react.default.createElement("div", null);
        }

        var mapProps = (0, _objectSpread4.default)({}, mapState, {
          preserveDrawingBuffer: true,
          mapboxApiAccessToken: mapboxApiAccessToken,
          onViewportChange: updateMap,
          transformRequest: _mapboxUtils2.transformRequest
        });
        return _react.default.createElement(_styledComponents.StyledMapContainer, {
          style: MAP_STYLE.container,
          onMouseMove: this._onMouseMove
        }, _react.default.createElement(MapControl, {
          datasets: datasets,
          dragRotate: mapState.dragRotate,
          isSplit: mapState.isSplit,
          isExport: this.props.isExport,
          layers: layers,
          mapIndex: this.props.index,
          mapLayers: mapLayers,
          mapControls: mapControls,
          scale: mapState.scale || 1,
          top: 0,
          onTogglePerspective: mapStateActions.togglePerspective,
          onToggleSplitMap: mapStateActions.toggleSplitMap,
          onMapToggleLayer: this._handleMapToggleLayer,
          onToggleMapControl: toggleMapControl
        }), _react.default.createElement(MapComponent, (0, _extends2.default)({}, mapProps, {
          key: "bottom",
          ref: this._setMapboxMap,
          mapStyle: mapStyle.bottomMapStyle,
          onClick: onMapClick,
          getCursor: this.props.hoverInfo ? function () {
            return 'pointer';
          } : undefined,
          transitionDuration: TRANSITION_DURATION
        }), this._renderOverlay(), this._renderMapboxOverlays()), mapStyle.topMapStyle && _react.default.createElement("div", {
          style: MAP_STYLE.top
        }, _react.default.createElement(MapComponent, (0, _extends2.default)({}, mapProps, {
          key: "top",
          mapStyle: mapStyle.topMapStyle
        }))), this._renderObjectLayerPopover());
      }
    }]);
    return MapContainer;
  }(_react.Component);

  (0, _defineProperty2.default)(MapContainer, "propTypes", {
    // required
    datasets: _propTypes.default.object,
    interactionConfig: _propTypes.default.object.isRequired,
    layerBlending: _propTypes.default.string.isRequired,
    layerOrder: _propTypes.default.arrayOf(_propTypes.default.any).isRequired,
    layerData: _propTypes.default.arrayOf(_propTypes.default.any).isRequired,
    layers: _propTypes.default.arrayOf(_propTypes.default.any).isRequired,
    mapState: _propTypes.default.object.isRequired,
    mapStyle: _propTypes.default.object.isRequired,
    mapControls: _propTypes.default.object.isRequired,
    mapboxApiAccessToken: _propTypes.default.string.isRequired,
    toggleMapControl: _propTypes.default.func.isRequired,
    visStateActions: _propTypes.default.object.isRequired,
    mapStateActions: _propTypes.default.object.isRequired,
    // optional
    isExport: _propTypes.default.bool,
    clicked: _propTypes.default.object,
    hoverInfo: _propTypes.default.object,
    mapLayers: _propTypes.default.object,
    onMapToggleLayer: _propTypes.default.func,
    onMapStyleLoaded: _propTypes.default.func,
    onMapRender: _propTypes.default.func
  });
  (0, _defineProperty2.default)(MapContainer, "defaultProps", {
    MapComponent: _reactMapGl.default
  });
  return MapContainer;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL21hcC1jb250YWluZXIuanMiXSwibmFtZXMiOlsiTUFQX1NUWUxFIiwiY29udGFpbmVyIiwiZGlzcGxheSIsInBvc2l0aW9uIiwidG9wIiwicG9pbnRlckV2ZW50cyIsImdldEdsQ29uc3QiLCJkIiwiR0wiLCJNQVBCT1hHTF9TVFlMRV9VUERBVEUiLCJUUkFOU0lUSU9OX0RVUkFUSU9OIiwiTWFwQ29udGFpbmVyRmFjdG9yeSIsImRlcHMiLCJNYXBQb3BvdmVyRmFjdG9yeSIsIk1hcENvbnRyb2xGYWN0b3J5IiwiTWFwUG9wb3ZlciIsIk1hcENvbnRyb2wiLCJNYXBDb250YWluZXIiLCJwcm9wcyIsInZpc1N0YXRlQWN0aW9ucyIsIm9uTGF5ZXJDbGljayIsImlkeCIsImNvbG9yRG9tYWluIiwibGF5ZXJDb25maWdDaGFuZ2UiLCJsYXllcnMiLCJnbCIsInBpY2tpbmdNb2R1bGUiLCJicnVzaGluZ01vZHVsZSIsImlnbm9yZU11bHRpcGxlUmVnaXN0cmF0aW9ucyIsImV2dCIsImJydXNoIiwiaW50ZXJhY3Rpb25Db25maWciLCJuYXRpdmVFdmVudCIsImVuYWJsZWQiLCJzZXRTdGF0ZSIsIm1vdXNlUG9zaXRpb24iLCJvZmZzZXRYIiwib2Zmc2V0WSIsImxheWVySWQiLCJpbmRleCIsIm1hcEluZGV4IiwidG9nZ2xlTGF5ZXJGb3JNYXAiLCJtYXBib3giLCJfbWFwIiwiZ2V0TWFwIiwib24iLCJfcmVuZGVyTWFwYm94TGF5ZXJzIiwicHJldmlvdXNMYXllcnMiLCJtYXBMYXllcnMiLCJmb3JjZSIsIm9uTWFwU3R5bGVMb2FkZWQiLCJvbk1hcFJlbmRlciIsIl9zZXRsYXllckJsZW5kaW5nIiwiYmxlbmRpbmciLCJMQVlFUl9CTEVORElOR1MiLCJsYXllckJsZW5kaW5nIiwiYmxlbmRGdW5jIiwiYmxlbmRFcXVhdGlvbiIsIkJMRU5EIiwibWFwIiwiQXJyYXkiLCJpc0FycmF5Iiwib3ZlcmxheXMiLCJsYXllckRhdGEiLCJob3ZlckluZm8iLCJjbGlja2VkIiwibWFwU3RhdGUiLCJzdGF0ZSIsImxheWVyIiwiZGF0YSIsImxheWVySW50ZXJhY3Rpb24iLCJvYmplY3RIb3ZlcmVkIiwibGF5ZXJDYWxsYmFja3MiLCJvblNldExheWVyRG9tYWluIiwidmFsIiwiX29uTGF5ZXJTZXREb21haW4iLCJfc2hvdWxkUmVuZGVyTGF5ZXIiLCJsYXllck92ZXJsYXkiLCJyZW5kZXJMYXllciIsImxlbmd0aCIsImNvbmNhdCIsIm9mZiIsImRhdGFzZXRzIiwib2JqZWN0SW5mbyIsInRvb2x0aXAiLCJwaWNrZWQiLCJsbmdMYXQiLCJvYmplY3QiLCJvdmVybGF5IiwiY29uZmlnIiwiaXNWaXNpYmxlIiwiZ2V0SG92ZXJEYXRhIiwiaWQiLCJkYXRhSWQiLCJhbGxEYXRhIiwiZmllbGRzIiwidmlld3BvcnQiLCJjb250ZXh0IiwiX2dldEhvdmVyWFkiLCJ4IiwieSIsInBvcG92ZXJQcm9wcyIsImZpZWxkc1RvU2hvdyIsImZyZWV6ZWQiLCJCb29sZWFuIiwib25DbG9zZSIsIl9vbkNsb3NlTWFwUG9wb3ZlciIsInNjcmVlbkNvb3JkIiwicHJvamVjdCIsImlzQXZhaWxhYmxlQW5kVmlzaWJsZSIsInNob3VsZFJlbmRlckxheWVyIiwibWFwU3R5bGUiLCJsYXllck9yZGVyIiwibWFwYm94QXBpQWNjZXNzVG9rZW4iLCJkZWNrR2xMYXllcnMiLCJzbGljZSIsInJldmVyc2UiLCJyZWR1Y2UiLCJfcmVuZGVyTGF5ZXIiLCJ2aXNpYmxlTGF5ZXJHcm91cHMiLCJwdXNoIiwiVGhyZWVEQnVpbGRpbmdMYXllciIsInRocmVlREJ1aWxkaW5nQ29sb3IiLCJfb25XZWJHTEluaXRpYWxpemVkIiwiX29uQmVmb3JlUmVuZGVyIiwib25MYXllckhvdmVyIiwiaXNTdHlsZUxvYWRlZCIsIm1hcGJveExheWVycyIsImZpbmFsIiwibWFwU3RhdGVBY3Rpb25zIiwiTWFwQ29tcG9uZW50IiwibWFwQ29udHJvbHMiLCJ0b2dnbGVNYXBDb250cm9sIiwidXBkYXRlTWFwIiwib25NYXBDbGljayIsImJvdHRvbU1hcFN0eWxlIiwibWFwUHJvcHMiLCJwcmVzZXJ2ZURyYXdpbmdCdWZmZXIiLCJvblZpZXdwb3J0Q2hhbmdlIiwidHJhbnNmb3JtUmVxdWVzdCIsIl9vbk1vdXNlTW92ZSIsImRyYWdSb3RhdGUiLCJpc1NwbGl0IiwiaXNFeHBvcnQiLCJzY2FsZSIsInRvZ2dsZVBlcnNwZWN0aXZlIiwidG9nZ2xlU3BsaXRNYXAiLCJfaGFuZGxlTWFwVG9nZ2xlTGF5ZXIiLCJfc2V0TWFwYm94TWFwIiwidW5kZWZpbmVkIiwiX3JlbmRlck92ZXJsYXkiLCJfcmVuZGVyTWFwYm94T3ZlcmxheXMiLCJ0b3BNYXBTdHlsZSIsIl9yZW5kZXJPYmplY3RMYXllclBvcG92ZXIiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJpc1JlcXVpcmVkIiwic3RyaW5nIiwiYXJyYXlPZiIsImFueSIsImZ1bmMiLCJib29sIiwib25NYXBUb2dnbGVMYXllciIsIk1hcGJveEdMTWFwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFHQTs7QUFDQTs7QUFDQTs7QUFHQTs7QUFFQTs7QUFHQTs7QUFDQTs7QUExQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQVVBO0FBS0E7QUFLQTtBQUlBLElBQU1BLFNBQVMsR0FBRztBQUNoQkMsRUFBQUEsU0FBUyxFQUFFO0FBQ1RDLElBQUFBLE9BQU8sRUFBRSxjQURBO0FBRVRDLElBQUFBLFFBQVEsRUFBRTtBQUZELEdBREs7QUFLaEJDLEVBQUFBLEdBQUcsRUFBRTtBQUNIRCxJQUFBQSxRQUFRLEVBQUUsVUFEUDtBQUNtQkMsSUFBQUEsR0FBRyxFQUFFLEtBRHhCO0FBQytCQyxJQUFBQSxhQUFhLEVB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U0FBT2xKLFlBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbi8vIGxpYnJhcmllc1xuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IE1hcGJveEdMTWFwIGZyb20gJ3JlYWN0LW1hcC1nbCc7XG5pbXBvcnQgRGVja0dMIGZyb20gJ2RlY2suZ2wnO1xuaW1wb3J0IEdMIGZyb20gJ2x1bWEuZ2wvY29uc3RhbnRzJztcbmltcG9ydCB7cmVnaXN0ZXJTaGFkZXJNb2R1bGVzLCBzZXRQYXJhbWV0ZXJzfSBmcm9tICdsdW1hLmdsJztcbmltcG9ydCBwaWNraW5nTW9kdWxlIGZyb20gJ3NoYWRlcmxpYi9waWNraW5nLW1vZHVsZSc7XG5pbXBvcnQgYnJ1c2hpbmdNb2R1bGUgZnJvbSAnc2hhZGVybGliL2JydXNoaW5nLW1vZHVsZSc7XG5cbi8vIGNvbXBvbmVudHNcbmltcG9ydCBNYXBQb3BvdmVyRmFjdG9yeSBmcm9tICdjb21wb25lbnRzL21hcC9tYXAtcG9wb3Zlcic7XG5pbXBvcnQgTWFwQ29udHJvbEZhY3RvcnkgZnJvbSAnY29tcG9uZW50cy9tYXAvbWFwLWNvbnRyb2wnO1xuaW1wb3J0IHtTdHlsZWRNYXBDb250YWluZXJ9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcblxuLy8gT3ZlcmxheSB0eXBlXG5pbXBvcnQge2dlbmVyYXRlTWFwYm94TGF5ZXJzLCB1cGRhdGVNYXBib3hMYXllcnN9IGZyb20gJy4uL2xheWVycy9tYXBib3gtdXRpbHMnO1xuXG5pbXBvcnQge3RyYW5zZm9ybVJlcXVlc3R9IGZyb20gJ3V0aWxzL21hcC1zdHlsZS11dGlscy9tYXBib3gtdXRpbHMnO1xuXG4vLyBkZWZhdWx0LXNldHRpbmdzXG5pbXBvcnQge0xBWUVSX0JMRU5ESU5HU30gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuaW1wb3J0IFRocmVlREJ1aWxkaW5nTGF5ZXIgZnJvbSAnLi4vZGVja2dsLWxheWVycy8zZC1idWlsZGluZy1sYXllci8zZC1idWlsZGluZy1sYXllcic7XG5cbmNvbnN0IE1BUF9TVFlMRSA9IHtcbiAgY29udGFpbmVyOiB7XG4gICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgcG9zaXRpb246ICdyZWxhdGl2ZSdcbiAgfSxcbiAgdG9wOiB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogJzBweCcsIHBvaW50ZXJFdmVudHM6ICdub25lJ1xuICB9XG59O1xuXG5jb25zdCBnZXRHbENvbnN0ID0gZCA9PiBHTFtkXTtcblxuY29uc3QgTUFQQk9YR0xfU1RZTEVfVVBEQVRFID0gJ3N0eWxlLmxvYWQnO1xuY29uc3QgVFJBTlNJVElPTl9EVVJBVElPTiA9IDA7XG5cbk1hcENvbnRhaW5lckZhY3RvcnkuZGVwcyA9IFtcbiAgTWFwUG9wb3ZlckZhY3RvcnksIE1hcENvbnRyb2xGYWN0b3J5XG5dO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNYXBDb250YWluZXJGYWN0b3J5KE1hcFBvcG92ZXIsIE1hcENvbnRyb2wpIHtcbiAgY2xhc3MgTWFwQ29udGFpbmVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgLy8gcmVxdWlyZWRcbiAgICAgIGRhdGFzZXRzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgaW50ZXJhY3Rpb25Db25maWc6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgIGxheWVyQmxlbmRpbmc6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgIGxheWVyT3JkZXI6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLmlzUmVxdWlyZWQsXG4gICAgICBsYXllckRhdGE6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLmlzUmVxdWlyZWQsXG4gICAgICBsYXllcnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLmlzUmVxdWlyZWQsXG4gICAgICBtYXBTdGF0ZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgbWFwU3R5bGU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgIG1hcENvbnRyb2xzOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICBtYXBib3hBcGlBY2Nlc3NUb2tlbjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgdG9nZ2xlTWFwQ29udHJvbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIHZpc1N0YXRlQWN0aW9uczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgbWFwU3RhdGVBY3Rpb25zOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG5cbiAgICAgIC8vIG9wdGlvbmFsXG4gICAgICBpc0V4cG9ydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICBjbGlja2VkOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgaG92ZXJJbmZvOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgbWFwTGF5ZXJzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgb25NYXBUb2dnbGVMYXllcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBvbk1hcFN0eWxlTG9hZGVkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgIG9uTWFwUmVuZGVyOiBQcm9wVHlwZXMuZnVuY1xuICAgIH07XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgTWFwQ29tcG9uZW50OiBNYXBib3hHTE1hcFxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgbW91c2VQb3NpdGlvbjogWzAsIDBdXG4gICAgICB9O1xuICAgICAgdGhpcy5wcmV2aW91c0xheWVycyA9IHtcbiAgICAgICAgLy8gW2xheWVycy5pZF06IG1hcGJveExheWVyQ29uZmlnXG4gICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgLy8gdW5iaW5kIG1hcGJveGdsIGV2ZW50IGxpc3RlbmVyXG4gICAgICBpZiAodGhpcy5fbWFwKSB7XG4gICAgICAgIHRoaXMuX21hcC5vZmYoTUFQQk9YR0xfU1RZTEVfVVBEQVRFKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKiBjb21wb25lbnQgcHJpdmF0ZSBmdW5jdGlvbnMgKi9cbiAgICBfb25DbG9zZU1hcFBvcG92ZXIgPSAoKSA9PiB7XG4gICAgICB0aGlzLnByb3BzLnZpc1N0YXRlQWN0aW9ucy5vbkxheWVyQ2xpY2sobnVsbCk7XG4gICAgfTtcblxuICAgIF9vbkxheWVyU2V0RG9tYWluID0gKGlkeCwgY29sb3JEb21haW4pID0+IHtcbiAgICAgIHRoaXMucHJvcHMudmlzU3RhdGVBY3Rpb25zLmxheWVyQ29uZmlnQ2hhbmdlKHRoaXMucHJvcHMubGF5ZXJzW2lkeF0sIHtcbiAgICAgICAgY29sb3JEb21haW5cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBfb25XZWJHTEluaXRpYWxpemVkID0gZ2wgPT4ge1xuICAgICAgcmVnaXN0ZXJTaGFkZXJNb2R1bGVzKFxuICAgICAgICBbcGlja2luZ01vZHVsZSwgYnJ1c2hpbmdNb2R1bGVdLCB7XG4gICAgICAgICAgaWdub3JlTXVsdGlwbGVSZWdpc3RyYXRpb25zOiB0cnVlXG4gICAgICB9KTtcblxuICAgICAgLy8gYWxsb3cgVWludDMyIGluZGljZXMgaW4gYnVpbGRpbmcgbGF5ZXJcbiAgICAgIC8vIGdsLmdldEV4dGVuc2lvbignT0VTX2VsZW1lbnRfaW5kZXhfdWludCcpO1xuICAgIH07XG5cbiAgICBfb25Nb3VzZU1vdmUgPSBldnQgPT4ge1xuICAgICAgY29uc3Qge2ludGVyYWN0aW9uQ29uZmlnOiB7YnJ1c2h9fSA9IHRoaXMucHJvcHM7XG5cbiAgICAgIGlmIChldnQubmF0aXZlRXZlbnQgJiYgYnJ1c2guZW5hYmxlZCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBtb3VzZVBvc2l0aW9uOiBbZXZ0Lm5hdGl2ZUV2ZW50Lm9mZnNldFgsIGV2dC5uYXRpdmVFdmVudC5vZmZzZXRZXVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX2hhbmRsZU1hcFRvZ2dsZUxheWVyID0gbGF5ZXJJZCA9PiB7XG4gICAgICBjb25zdCB7aW5kZXg6IG1hcEluZGV4ID0gMCwgdmlzU3RhdGVBY3Rpb25zfSA9IHRoaXMucHJvcHM7XG4gICAgICB2aXNTdGF0ZUFjdGlvbnMudG9nZ2xlTGF5ZXJGb3JNYXAobWFwSW5kZXgsIGxheWVySWQpO1xuICAgIH07XG5cbiAgICBfc2V0TWFwYm94TWFwID0gKG1hcGJveCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLl9tYXAgJiYgbWFwYm94KSB7XG4gICAgICAgIHRoaXMuX21hcCA9IG1hcGJveC5nZXRNYXAoKTtcbiAgICAgICAgLy8gYmluZCBtYXBib3hnbCBldmVudCBsaXN0ZW5lclxuICAgICAgICB0aGlzLl9tYXAub24oTUFQQk9YR0xfU1RZTEVfVVBEQVRFLCAoKSA9PiB7XG4gICAgICAgICAgLy8gZm9yY2UgcmVmcmVzaCBtYXBib3hnbCBsYXllcnNcblxuICAgICAgICAgIHVwZGF0ZU1hcGJveExheWVycyhcbiAgICAgICAgICAgIHRoaXMuX21hcCxcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlck1hcGJveExheWVycygpLFxuICAgICAgICAgICAgdGhpcy5wcmV2aW91c0xheWVycyxcbiAgICAgICAgICAgIHRoaXMucHJvcHMubWFwTGF5ZXJzLFxuICAgICAgICAgICAge2ZvcmNlOiB0cnVlfVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25NYXBTdHlsZUxvYWRlZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbk1hcFN0eWxlTG9hZGVkKHRoaXMuX21hcCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9tYXAub24oJ3JlbmRlcicsICgpID0+IHtcbiAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25NYXBSZW5kZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25NYXBSZW5kZXIodGhpcy5fbWFwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIF9vbkJlZm9yZVJlbmRlciA9ICh7Z2x9KSA9PiB7XG4gICAgICB0aGlzLl9zZXRsYXllckJsZW5kaW5nKGdsKTtcbiAgICB9O1xuXG4gICAgX3NldGxheWVyQmxlbmRpbmcgPSBnbCA9PiB7XG4gICAgICBjb25zdCBibGVuZGluZyA9IExBWUVSX0JMRU5ESU5HU1t0aGlzLnByb3BzLmxheWVyQmxlbmRpbmddO1xuICAgICAgY29uc3Qge2JsZW5kRnVuYywgYmxlbmRFcXVhdGlvbn0gPSBibGVuZGluZztcblxuICAgICAgc2V0UGFyYW1ldGVycyhnbCwge1xuICAgICAgICBbR0wuQkxFTkRdOiB0cnVlLFxuICAgICAgICAuLi4oYmxlbmRGdW5jID8ge1xuICAgICAgICAgIGJsZW5kRnVuYzogYmxlbmRGdW5jLm1hcChnZXRHbENvbnN0KSxcbiAgICAgICAgICBibGVuZEVxdWF0aW9uOiBBcnJheS5pc0FycmF5KGJsZW5kRXF1YXRpb24pID8gYmxlbmRFcXVhdGlvbi5tYXAoZ2V0R2xDb25zdCkgOiBnZXRHbENvbnN0KGJsZW5kRXF1YXRpb24pXG4gICAgICAgIH0gOiB7fSlcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKiBjb21wb25lbnQgcmVuZGVyIGZ1bmN0aW9ucyAqL1xuICAgIC8qIGVzbGludC1kaXNhYmxlIGNvbXBsZXhpdHkgKi9cbiAgICBfcmVuZGVyT2JqZWN0TGF5ZXJQb3BvdmVyKCkge1xuICAgICAgLy8gVE9ETzogbW92ZSB0aGlzIGludG8gcmVkdWNlciBzbyBpdCBjYW4gYmUgdGVzdGVkXG4gICAgICBjb25zdCB7XG4gICAgICAgIG1hcFN0YXRlLFxuICAgICAgICBob3ZlckluZm8sXG4gICAgICAgIGNsaWNrZWQsXG4gICAgICAgIGRhdGFzZXRzLFxuICAgICAgICBpbnRlcmFjdGlvbkNvbmZpZyxcbiAgICAgICAgbGF5ZXJzLFxuICAgICAgICBtYXBMYXllcnNcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICAvLyBpZiBjbGlja2VkIHNvbWV0aGluZywgaWdub3JlIGhvdmVyIGJlaGF2aW9yXG4gICAgICBjb25zdCBvYmplY3RJbmZvID0gY2xpY2tlZCB8fCBob3ZlckluZm87XG4gICAgICBpZiAoXG4gICAgICAgICFpbnRlcmFjdGlvbkNvbmZpZy50b29sdGlwLmVuYWJsZWQgfHxcbiAgICAgICAgIW9iamVjdEluZm8gfHxcbiAgICAgICAgIW9iamVjdEluZm8ucGlja2VkXG4gICAgICApIHtcbiAgICAgICAgLy8gbm90aGluZyBob3ZlcmVkXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7bG5nTGF0LCBvYmplY3QsIGxheWVyOiBvdmVybGF5fSA9IG9iamVjdEluZm87XG5cbiAgICAgIC8vIGRlY2tnbCBsYXllciB0byBrZXBsZXItZ2wgbGF5ZXJcbiAgICAgIGNvbnN0IGxheWVyID0gbGF5ZXJzW292ZXJsYXkucHJvcHMuaWR4XTtcblxuICAgICAgaWYgKFxuICAgICAgICAhbGF5ZXIgfHxcbiAgICAgICAgIWxheWVyLmNvbmZpZy5pc1Zpc2libGUgfHxcbiAgICAgICAgIW9iamVjdCB8fFxuICAgICAgICAhbGF5ZXIuZ2V0SG92ZXJEYXRhIHx8XG4gICAgICAgIChtYXBMYXllcnMgJiYgIW1hcExheWVyc1tsYXllci5pZF0uaXNWaXNpYmxlKVxuICAgICAgKSB7XG4gICAgICAgIC8vIGxheWVyIGlzIG5vdCB2aXNpYmxlXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7Y29uZmlnOiB7ZGF0YUlkfX0gPSBsYXllcjtcbiAgICAgIGNvbnN0IHthbGxEYXRhLCBmaWVsZHN9ID0gZGF0YXNldHNbZGF0YUlkXTtcbiAgICAgIGNvbnN0IGRhdGEgPSBsYXllci5nZXRIb3ZlckRhdGEob2JqZWN0LCBhbGxEYXRhKTtcblxuICAgICAgLy8gcHJvamVjdCBsbmdsYXQgdG8gc2NyZWVuIHNvIHRoYXQgdG9vbHRpcCBmb2xsb3dzIHRoZSBvYmplY3Qgb24gem9vbVxuICAgICAgY29uc3Qge3ZpZXdwb3J0fSA9IG92ZXJsYXkuY29udGV4dDtcbiAgICAgIGNvbnN0IHt4LCB5fSA9IHRoaXMuX2dldEhvdmVyWFkodmlld3BvcnQsIGxuZ0xhdCkgfHwgb2JqZWN0SW5mbztcblxuICAgICAgY29uc3QgcG9wb3ZlclByb3BzID0ge1xuICAgICAgICBkYXRhLFxuICAgICAgICBmaWVsZHMsXG4gICAgICAgIGZpZWxkc1RvU2hvdzogaW50ZXJhY3Rpb25Db25maWcudG9vbHRpcC5jb25maWcuZmllbGRzVG9TaG93W2RhdGFJZF0sXG4gICAgICAgIGxheWVyLFxuICAgICAgICBpc1Zpc2libGU6IHRydWUsXG4gICAgICAgIHgsXG4gICAgICAgIHksXG4gICAgICAgIGZyZWV6ZWQ6IEJvb2xlYW4oY2xpY2tlZCksXG4gICAgICAgIG9uQ2xvc2U6IHRoaXMuX29uQ2xvc2VNYXBQb3BvdmVyLFxuICAgICAgICBtYXBTdGF0ZVxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8TWFwUG9wb3ZlciB7Li4ucG9wb3ZlclByb3BzfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLyogZXNsaW50LWVuYWJsZSBjb21wbGV4aXR5ICovXG5cbiAgICBfZ2V0SG92ZXJYWSh2aWV3cG9ydCwgbG5nTGF0KSB7XG4gICAgICBjb25zdCBzY3JlZW5Db29yZCA9ICF2aWV3cG9ydCB8fCAhbG5nTGF0ID8gbnVsbCA6IHZpZXdwb3J0LnByb2plY3QobG5nTGF0KTtcblxuICAgICAgcmV0dXJuIHNjcmVlbkNvb3JkICYmIHt4OiBzY3JlZW5Db29yZFswXSwgeTogc2NyZWVuQ29vcmRbMV19O1xuICAgIH1cblxuICAgIF9zaG91bGRSZW5kZXJMYXllcihsYXllciwgZGF0YSwgbWFwTGF5ZXJzKSB7XG4gICAgICBjb25zdCBpc0F2YWlsYWJsZUFuZFZpc2libGUgPVxuICAgICAgICAhKG1hcExheWVycyAmJiBtYXBMYXllcnNbbGF5ZXIuaWRdKSB8fCBtYXBMYXllcnNbbGF5ZXIuaWRdLmlzVmlzaWJsZTtcbiAgICAgIHJldHVybiBsYXllci5zaG91bGRSZW5kZXJMYXllcihkYXRhKSAmJiBpc0F2YWlsYWJsZUFuZFZpc2libGU7XG4gICAgfVxuXG4gICAgX3JlbmRlckxheWVyID0gKG92ZXJsYXlzLCBpZHgpID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgbGF5ZXJzLFxuICAgICAgICBsYXllckRhdGEsXG4gICAgICAgIGhvdmVySW5mbyxcbiAgICAgICAgY2xpY2tlZCxcbiAgICAgICAgbWFwTGF5ZXJzLFxuICAgICAgICBtYXBTdGF0ZSxcbiAgICAgICAgaW50ZXJhY3Rpb25Db25maWdcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3Qge21vdXNlUG9zaXRpb259ID0gdGhpcy5zdGF0ZTtcbiAgICAgIGNvbnN0IGxheWVyID0gbGF5ZXJzW2lkeF07XG4gICAgICBjb25zdCBkYXRhID0gbGF5ZXJEYXRhW2lkeF07XG5cbiAgICAgIGNvbnN0IGxheWVySW50ZXJhY3Rpb24gPSB7XG4gICAgICAgIG1vdXNlUG9zaXRpb25cbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IG9iamVjdEhvdmVyZWQgPSBjbGlja2VkIHx8IGhvdmVySW5mbztcbiAgICAgIGNvbnN0IGxheWVyQ2FsbGJhY2tzID0ge1xuICAgICAgICBvblNldExheWVyRG9tYWluOiB2YWwgPT4gdGhpcy5fb25MYXllclNldERvbWFpbihpZHgsIHZhbClcbiAgICAgIH07XG5cbiAgICAgIGlmICghdGhpcy5fc2hvdWxkUmVuZGVyTGF5ZXIobGF5ZXIsIGRhdGEsIG1hcExheWVycykpIHtcbiAgICAgICAgcmV0dXJuIG92ZXJsYXlzO1xuICAgICAgfVxuXG4gICAgICBsZXQgbGF5ZXJPdmVybGF5ID0gW107XG5cbiAgICAgIC8vIExheWVyIGlzIExheWVyIGNsYXNzXG4gICAgICBpZiAodHlwZW9mIGxheWVyLnJlbmRlckxheWVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGxheWVyT3ZlcmxheSA9IGxheWVyLnJlbmRlckxheWVyKHtcbiAgICAgICAgICBkYXRhLFxuICAgICAgICAgIGlkeCxcbiAgICAgICAgICBsYXllckludGVyYWN0aW9uLFxuICAgICAgICAgIG9iamVjdEhvdmVyZWQsXG4gICAgICAgICAgbWFwU3RhdGUsXG4gICAgICAgICAgaW50ZXJhY3Rpb25Db25maWcsXG4gICAgICAgICAgbGF5ZXJDYWxsYmFja3NcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChsYXllck92ZXJsYXkubGVuZ3RoKSB7XG4gICAgICAgIG92ZXJsYXlzID0gb3ZlcmxheXMuY29uY2F0KGxheWVyT3ZlcmxheSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gb3ZlcmxheXM7XG4gICAgfTtcblxuICAgIF9yZW5kZXJPdmVybGF5KCkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBtYXBTdGF0ZSxcbiAgICAgICAgbWFwU3R5bGUsXG4gICAgICAgIGxheWVyRGF0YSxcbiAgICAgICAgbGF5ZXJPcmRlcixcbiAgICAgICAgdmlzU3RhdGVBY3Rpb25zLFxuICAgICAgICBtYXBib3hBcGlBY2Nlc3NUb2tlblxuICAgICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgIGxldCBkZWNrR2xMYXllcnMgPSBbXTtcblxuICAgICAgLy8gd2FpdCB1bnRpbCBkYXRhIGlzIHJlYWR5IGJlZm9yZSByZW5kZXIgZGF0YSBsYXllcnNcbiAgICAgIGlmIChsYXllckRhdGEgJiYgbGF5ZXJEYXRhLmxlbmd0aCkge1xuICAgICAgICAvLyBsYXN0IGxheWVyIHJlbmRlciBmaXJzdFxuICAgICAgICBkZWNrR2xMYXllcnMgPSBsYXllck9yZGVyXG4gICAgICAgICAgLnNsaWNlKClcbiAgICAgICAgICAucmV2ZXJzZSgpXG4gICAgICAgICAgLnJlZHVjZSh0aGlzLl9yZW5kZXJMYXllciwgW10pO1xuICAgICAgfVxuXG4gICAgICBpZiAobWFwU3R5bGUudmlzaWJsZUxheWVyR3JvdXBzWyczZCBidWlsZGluZyddKSB7XG4gICAgICAgIGRlY2tHbExheWVycy5wdXNoKG5ldyBUaHJlZURCdWlsZGluZ0xheWVyKHtcbiAgICAgICAgICBpZDogJ19rZXBsZXJnbF8zZC1idWlsZGluZycsXG4gICAgICAgICAgbWFwYm94QXBpQWNjZXNzVG9rZW4sXG4gICAgICAgICAgdGhyZWVEQnVpbGRpbmdDb2xvcjogbWFwU3R5bGUudGhyZWVEQnVpbGRpbmdDb2xvclxuICAgICAgICB9KSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxEZWNrR0xcbiAgICAgICAgICB2aWV3U3RhdGU9e21hcFN0YXRlfVxuICAgICAgICAgIGlkPVwiZGVmYXVsdC1kZWNrZ2wtb3ZlcmxheVwiXG4gICAgICAgICAgbGF5ZXJzPXtkZWNrR2xMYXllcnN9XG4gICAgICAgICAgb25XZWJHTEluaXRpYWxpemVkPXt0aGlzLl9vbldlYkdMSW5pdGlhbGl6ZWR9XG4gICAgICAgICAgb25CZWZvcmVSZW5kZXI9e3RoaXMuX29uQmVmb3JlUmVuZGVyfVxuICAgICAgICAgIG9uTGF5ZXJIb3Zlcj17dmlzU3RhdGVBY3Rpb25zLm9uTGF5ZXJIb3Zlcn1cbiAgICAgICAgICBvbkxheWVyQ2xpY2s9e3Zpc1N0YXRlQWN0aW9ucy5vbkxheWVyQ2xpY2t9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cblxuICAgIF9yZW5kZXJNYXBib3hMYXllcnMoKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGxheWVycyxcbiAgICAgICAgbGF5ZXJEYXRhLFxuICAgICAgICBsYXllck9yZGVyXG4gICAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgcmV0dXJuIGdlbmVyYXRlTWFwYm94TGF5ZXJzKGxheWVycywgbGF5ZXJEYXRhLCBsYXllck9yZGVyKTtcbiAgICB9XG5cbiAgICBfcmVuZGVyTWFwYm94T3ZlcmxheXMoKSB7XG4gICAgICBpZiAodGhpcy5fbWFwICYmIHRoaXMuX21hcC5pc1N0eWxlTG9hZGVkKCkpIHtcblxuICAgICAgICBjb25zdCBtYXBib3hMYXllcnMgPSB0aGlzLl9yZW5kZXJNYXBib3hMYXllcnMoKTtcblxuICAgICAgICB1cGRhdGVNYXBib3hMYXllcnMoXG4gICAgICAgICAgdGhpcy5fbWFwLFxuICAgICAgICAgIG1hcGJveExheWVycyxcbiAgICAgICAgICB0aGlzLnByZXZpb3VzTGF5ZXJzLFxuICAgICAgICAgIHRoaXMucHJvcHMubWFwTGF5ZXJzXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5wcmV2aW91c0xheWVycyA9IG1hcGJveExheWVycy5yZWR1Y2UoKGZpbmFsLCBsYXllcikgPT4gKHtcbiAgICAgICAgICAuLi5maW5hbCxcbiAgICAgICAgICBbbGF5ZXIuaWRdOiBsYXllci5jb25maWdcbiAgICAgICAgfSksIHt9KVxuICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgbWFwU3RhdGUsIG1hcFN0eWxlLCBtYXBTdGF0ZUFjdGlvbnMsIG1hcExheWVycywgbGF5ZXJzLCBNYXBDb21wb25lbnQsXG4gICAgICAgIGRhdGFzZXRzLCBtYXBib3hBcGlBY2Nlc3NUb2tlbiwgbWFwQ29udHJvbHMsIHRvZ2dsZU1hcENvbnRyb2xcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3Qge3VwZGF0ZU1hcCwgb25NYXBDbGlja30gPSBtYXBTdGF0ZUFjdGlvbnM7XG5cbiAgICAgIGlmICghbWFwU3R5bGUuYm90dG9tTWFwU3R5bGUpIHtcbiAgICAgICAgLy8gc3R5bGUgbm90IHlldCBsb2FkZWRcbiAgICAgICAgcmV0dXJuIDxkaXYvPjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbWFwUHJvcHMgPSB7XG4gICAgICAgIC4uLm1hcFN0YXRlLFxuICAgICAgICBwcmVzZXJ2ZURyYXdpbmdCdWZmZXI6IHRydWUsXG4gICAgICAgIG1hcGJveEFwaUFjY2Vzc1Rva2VuLFxuICAgICAgICBvblZpZXdwb3J0Q2hhbmdlOiB1cGRhdGVNYXAsXG4gICAgICAgIHRyYW5zZm9ybVJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxTdHlsZWRNYXBDb250YWluZXIgc3R5bGU9e01BUF9TVFlMRS5jb250YWluZXJ9IG9uTW91c2VNb3ZlPXt0aGlzLl9vbk1vdXNlTW92ZX0+XG4gICAgICAgICAgPE1hcENvbnRyb2xcbiAgICAgICAgICAgIGRhdGFzZXRzPXtkYXRhc2V0c31cbiAgICAgICAgICAgIGRyYWdSb3RhdGU9e21hcFN0YXRlLmRyYWdSb3RhdGV9XG4gICAgICAgICAgICBpc1NwbGl0PXttYXBTdGF0ZS5pc1NwbGl0fVxuICAgICAgICAgICAgaXNFeHBvcnQ9e3RoaXMucHJvcHMuaXNFeHBvcnR9XG4gICAgICAgICAgICBsYXllcnM9e2xheWVyc31cbiAgICAgICAgICAgIG1hcEluZGV4PXt0aGlzLnByb3BzLmluZGV4fVxuICAgICAgICAgICAgbWFwTGF5ZXJzPXttYXBMYXllcnN9XG4gICAgICAgICAgICBtYXBDb250cm9scz17bWFwQ29udHJvbHN9XG4gICAgICAgICAgICBzY2FsZT17bWFwU3RhdGUuc2NhbGUgfHwgMX1cbiAgICAgICAgICAgIHRvcD17MH1cbiAgICAgICAgICAgIG9uVG9nZ2xlUGVyc3BlY3RpdmU9e21hcFN0YXRlQWN0aW9ucy50b2dnbGVQZXJzcGVjdGl2ZX1cbiAgICAgICAgICAgIG9uVG9nZ2xlU3BsaXRNYXA9e21hcFN0YXRlQWN0aW9ucy50b2dnbGVTcGxpdE1hcH1cbiAgICAgICAgICAgIG9uTWFwVG9nZ2xlTGF5ZXI9e3RoaXMuX2hhbmRsZU1hcFRvZ2dsZUxheWVyfVxuICAgICAgICAgICAgb25Ub2dnbGVNYXBDb250cm9sPXt0b2dnbGVNYXBDb250cm9sfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPE1hcENvbXBvbmVudFxuICAgICAgICAgICAgey4uLm1hcFByb3BzfVxuICAgICAgICAgICAga2V5PVwiYm90dG9tXCJcbiAgICAgICAgICAgIHJlZj17dGhpcy5fc2V0TWFwYm94TWFwfVxuICAgICAgICAgICAgbWFwU3R5bGU9e21hcFN0eWxlLmJvdHRvbU1hcFN0eWxlfVxuICAgICAgICAgICAgb25DbGljaz17b25NYXBDbGlja31cbiAgICAgICAgICAgIGdldEN1cnNvcj17dGhpcy5wcm9wcy5ob3ZlckluZm8gPyAoKSA9PiAncG9pbnRlcicgOiB1bmRlZmluZWR9XG4gICAgICAgICAgICB0cmFuc2l0aW9uRHVyYXRpb249e1RSQU5TSVRJT05fRFVSQVRJT059XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3RoaXMuX3JlbmRlck92ZXJsYXkoKX1cbiAgICAgICAgICAgIHt0aGlzLl9yZW5kZXJNYXBib3hPdmVybGF5cygpfVxuICAgICAgICAgIDwvTWFwQ29tcG9uZW50PlxuICAgICAgICAgIHttYXBTdHlsZS50b3BNYXBTdHlsZSAmJiAoXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXtNQVBfU1RZTEUudG9wfT5cbiAgICAgICAgICAgICAgPE1hcENvbXBvbmVudFxuICAgICAgICAgICAgICAgIHsuLi5tYXBQcm9wc31cbiAgICAgICAgICAgICAgICBrZXk9XCJ0b3BcIlxuICAgICAgICAgICAgICAgIG1hcFN0eWxlPXttYXBTdHlsZS50b3BNYXBTdHlsZX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgICAge3RoaXMuX3JlbmRlck9iamVjdExheWVyUG9wb3ZlcigpfVxuICAgICAgICA8L1N0eWxlZE1hcENvbnRhaW5lcj5cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIE1hcENvbnRhaW5lcjtcbn1cbiJdfQ==