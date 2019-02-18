"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MapControl = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reselect = require("reselect");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _styledComponents2 = require("../common/styled-components");

var _mapLayerSelector = _interopRequireDefault(require("../common/map-layer-selector"));

var _logo = _interopRequireDefault(require("../common/logo"));

var _mapLegend = _interopRequireDefault(require("./map-legend"));

var _icons = require("../common/icons");

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  justify-content: space-between;\n  background-color: ", ";\n  height: 32px;\n  padding: 6px 12px;\n  font-size: 11px;\n  color: ", ";\n\n  button {\n    width: 18px;\n    height: 18px;\n  }\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  ", " max-height: 500px;\n  min-height: 100px;\n  overflow: auto;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  background-color: ", ";\n  flex-grow: 1;\n  z-index: 1;\n  p {\n    margin-bottom: 0;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  align-items: center;\n  background-color: ", ";\n  border-radius: 18px;\n  border: 0;\n  box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.16);\n  color: ", ";\n  cursor: pointer;\n  display: flex;\n  height: 36px;\n  justify-content: center;\n  margin: 0;\n  outline: none;\n  padding: 0;\n  transition: ", ";\n  width: 36px;\n\n  :focus {\n    outline: none;\n  }\n\n  :hover {\n    cursor: pointer;\n    background-color: ", ";\n    color: ", ";\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  padding: 4px 0;\n  display: flex;\n  justify-content: flex-end;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  right: 0;\n  width: ", "px;\n  padding: ", "px;\n  z-index: 1;\n  top: ", "px;\n  position: absolute;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var StyledMapControl = _styledComponents.default.div(_templateObject(), function (props) {
  return props.theme.mapControl.width;
}, function (props) {
  return props.theme.mapControl.padding;
}, function (props) {
  return props.top;
});

var StyledMapControlAction = _styledComponents.default.div(_templateObject2());

var StyledMapControlButton = _styledComponents.default.div(_templateObject3(), function (props) {
  return props.active ? props.theme.secondaryBtnActBgd : props.theme.secondaryBtnBgd;
}, function (props) {
  return props.active ? props.theme.secondaryBtnActColor : props.theme.secondaryBtnColor;
}, function (props) {
  return props.theme.transition;
}, function (props) {
  return props.theme.secondaryBtnActBgd;
}, function (props) {
  return props.theme.secondaryBtnActColor;
});

var StyledMapControlPanel = _styledComponents.default.div(_templateObject4(), function (props) {
  return props.theme.mapPanelBackgroundColor;
});

var StyledMapControlPanelContent = _styledComponents.default.div(_templateObject5(), function (props) {
  return props.theme.dropdownScrollBar;
});

var StyledMapControlPanelHeader = _styledComponents.default.div(_templateObject6(), function (props) {
  return props.theme.mapPanelHeaderBackgroundColor;
}, function (props) {
  return props.theme.secondaryBtnColor;
});
/**
 * Generates all layers available for the current map
 * TODO: this may be moved into map-container or map-control or even at the reducer level
 * @param layers
 * @param mapLayers
 * @returns {[id, label, isVisible]}
 */


var layerSelector = function layerSelector(layers, mapLayers) {
  var availableItems = Object.keys(layers).reduce(function (availableLayers, currentLayerId) {
    // is available ? if yes add to available list
    var currentLayer = layers[currentLayerId]; // if maplayers exists we need to make sure currentlayer
    // is contained in mapLayers in order to add onto availableLayers
    // otherwise we add all layers

    var layerConfig = mapLayers ? mapLayers[currentLayer.id] : currentLayer.config;
    var mustBeAdded = mapLayers && mapLayers[currentLayer.id] ? mapLayers[currentLayer.id].isAvailable : layerConfig.isVisible;
    return mustBeAdded ? [].concat((0, _toConsumableArray2.default)(availableLayers), [{
      id: currentLayer.id,
      name: currentLayer.config.label,
      isVisible: mapLayers && mapLayers[currentLayer.id] ? mapLayers[currentLayer.id].isVisible : layerConfig.isVisible,
      layer: currentLayer
    }]) : availableLayers;
  }, []);
  return availableItems;
};

var MapControl =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(MapControl, _Component);

  function MapControl() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, MapControl);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(MapControl)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "layerSelector", function (state) {
      return state.layers;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "mapLayersSelector", function (state) {
      return state.mapLayers;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "initialDataSelector", (0, _reselect.createSelector)(_this.layerSelector, _this.mapLayersSelector, layerSelector));
    return _this;
  }

  (0, _createClass2.default)(MapControl, [{
    key: "render",
    value: function render() {
      var items = this.initialDataSelector(this.props);

      if (!items) {
        return null;
      }

      var _this$props = this.props,
          dragRotate = _this$props.dragRotate,
          isSplit = _this$props.isSplit,
          isExport = _this$props.isExport,
          mapIndex = _this$props.mapIndex,
          mapControls = _this$props.mapControls,
          onTogglePerspective = _this$props.onTogglePerspective,
          onToggleSplitMap = _this$props.onToggleSplitMap,
          onMapToggleLayer = _this$props.onMapToggleLayer,
          onToggleMapControl = _this$props.onToggleMapControl,
          scale = _this$props.scale;
      var _mapControls$visibleL = mapControls.visibleLayers,
          visibleLayers = _mapControls$visibleL === void 0 ? {} : _mapControls$visibleL,
          _mapControls$mapLegen = mapControls.mapLegend,
          mapLegend = _mapControls$mapLegen === void 0 ? {} : _mapControls$mapLegen,
          _mapControls$toggle3d = mapControls.toggle3d,
          toggle3d = _mapControls$toggle3d === void 0 ? {} : _mapControls$toggle3d,
          _mapControls$splitMap = mapControls.splitMap,
          splitMap = _mapControls$splitMap === void 0 ? {} : _mapControls$splitMap;
      return _react.default.createElement(StyledMapControl, {
        className: "map-control"
      }, splitMap.show ? _react.default.createElement(ActionPanel, {
        key: 0
      }, _react.default.createElement(StyledMapControlButton, {
        active: isSplit,
        onClick: function onClick(e) {
          e.preventDefault();
          onToggleSplitMap(isSplit ? mapIndex : undefined);
        },
        key: "split-".concat(isSplit),
        className: "map-control-button split-map",
        "data-tip": true,
        "data-for": "action-toggle"
      }, isSplit ? _react.default.createElement(_icons.Delete, {
        height: "18px"
      }) : _react.default.createElement(_icons.Split, {
        height: "18px"
      }), _react.default.createElement(MapLegendTooltip, {
        id: "action-toggle",
        message: isSplit ? 'Close current panel' : 'Switch to dual map view'
      }))) : null, isSplit && visibleLayers.show ? _react.default.createElement(ActionPanel, {
        key: 1
      }, _react.default.createElement(LayerSelectorPanel, {
        items: items,
        onMapToggleLayer: onMapToggleLayer,
        isActive: visibleLayers.active,
        toggleMenuPanel: function toggleMenuPanel() {
          return onToggleMapControl('visibleLayers');
        }
      })) : null, toggle3d.show ? _react.default.createElement(ActionPanel, {
        key: 2
      }, _react.default.createElement(StyledMapControlButton, {
        onClick: function onClick(e) {
          e.preventDefault();
          onTogglePerspective();
        },
        active: dragRotate,
        "data-tip": true,
        "data-for": "action-3d"
      }, _react.default.createElement(_icons.Cube3d, {
        height: "22px"
      }), _react.default.createElement(MapLegendTooltip, {
        id: "action-3d",
        message: dragRotate ? 'Disable 3D Map' : '3D Map'
      }))) : null, mapLegend.show ? _react.default.createElement(ActionPanel, {
        key: 3
      }, _react.default.createElement(MapLegendPanel, {
        items: items,
        scale: scale,
        isExport: isExport,
        onMapToggleLayer: onMapToggleLayer,
        isActive: mapLegend.active,
        toggleMenuPanel: function toggleMenuPanel() {
          return onToggleMapControl('mapLegend');
        }
      })) : null);
    }
  }]);
  return MapControl;
}(_react.Component);

exports.MapControl = MapControl;
(0, _defineProperty2.default)(MapControl, "propTypes", {
  datasets: _propTypes.default.object.isRequired,
  dragRotate: _propTypes.default.bool.isRequired,
  isSplit: _propTypes.default.bool.isRequired,
  layers: _propTypes.default.arrayOf(_propTypes.default.object),
  mapIndex: _propTypes.default.number.isRequired,
  mapControls: _propTypes.default.object.isRequired,
  onTogglePerspective: _propTypes.default.func.isRequired,
  onToggleSplitMap: _propTypes.default.func.isRequired,
  onToggleMapControl: _propTypes.default.func.isRequired,
  onMapToggleLayer: _propTypes.default.func.isRequired,
  top: _propTypes.default.number.isRequired,
  // optional
  scale: _propTypes.default.number,
  mapLayers: _propTypes.default.object
});
(0, _defineProperty2.default)(MapControl, "defaultProps", {
  isSplit: false,
  top: 0
});

var MapControlPanel = function MapControlPanel(_ref) {
  var children = _ref.children,
      header = _ref.header,
      onClick = _ref.onClick,
      _ref$scale = _ref.scale,
      scale = _ref$scale === void 0 ? 1 : _ref$scale,
      isExport = _ref.isExport;
  return _react.default.createElement(StyledMapControlPanel, {
    style: {
      transform: "scale(".concat(scale, ") translate(calc(-").concat(25 * (scale - 1), "% - ").concat(10 * scale, "px), calc(").concat(25 * (scale - 1), "% + ").concat(10 * scale, "px))")
    }
  }, _react.default.createElement(StyledMapControlPanelHeader, {
    style: {
      position: 'relative'
    }
  }, isExport ? _react.default.createElement(_logo.default, {
    version: false,
    appName: "kepler.gl"
  }) : _react.default.createElement("span", {
    style: {
      verticalAlign: 'middle'
    }
  }, header), isExport ? null : _react.default.createElement(_styledComponents2.IconRoundSmall, null, _react.default.createElement(_icons.Close, {
    height: "16px",
    onClick: onClick
  }))), _react.default.createElement(StyledMapControlPanelContent, null, children));
};

var MapLegendPanel = function MapLegendPanel(_ref2) {
  var items = _ref2.items,
      isActive = _ref2.isActive,
      scale = _ref2.scale,
      toggleMenuPanel = _ref2.toggleMenuPanel,
      isExport = _ref2.isExport;
  return !isActive ? _react.default.createElement(StyledMapControlButton, {
    key: 2,
    "data-tip": true,
    "data-for": "show-legend",
    className: "map-control-button show-legend",
    onClick: function onClick(e) {
      e.preventDefault();
      toggleMenuPanel();
    }
  }, _react.default.createElement(_icons.Legend, {
    height: "22px"
  }), _react.default.createElement(MapLegendTooltip, {
    id: "show-legend",
    message: 'show legend'
  })) : _react.default.createElement(MapControlPanel, {
    scale: scale,
    header: 'Layer Legend',
    onClick: toggleMenuPanel,
    isExport: isExport
  }, _react.default.createElement(_mapLegend.default, {
    layers: items.filter(function (item) {
      return item.isVisible;
    }).map(function (item) {
      return item.layer;
    })
  }));
};

var LayerSelectorPanel = function LayerSelectorPanel(_ref3) {
  var items = _ref3.items,
      onMapToggleLayer = _ref3.onMapToggleLayer,
      isActive = _ref3.isActive,
      toggleMenuPanel = _ref3.toggleMenuPanel;
  return !isActive ? _react.default.createElement(StyledMapControlButton, {
    key: 1,
    onClick: function onClick(e) {
      e.preventDefault();
      toggleMenuPanel();
    },
    className: "map-control-button toggle-layer",
    "data-tip": true,
    "data-for": "toggle-layer"
  }, _react.default.createElement(_icons.Layers, {
    height: "22px"
  }), _react.default.createElement(MapLegendTooltip, {
    id: "toggle-layer",
    message: isActive ? 'Hide layer panel' : 'Show layer panel'
  })) : _react.default.createElement(MapControlPanel, {
    header: "Visible layers",
    onClick: toggleMenuPanel
  }, _react.default.createElement(_mapLayerSelector.default, {
    layers: items,
    onMapToggleLayer: onMapToggleLayer
  }));
};

var ActionPanel = function ActionPanel(_ref4) {
  var children = _ref4.children;
  return _react.default.createElement(StyledMapControlAction, null, children);
};

var MapLegendTooltip = function MapLegendTooltip(_ref5) {
  var id = _ref5.id,
      message = _ref5.message;
  return _react.default.createElement(_styledComponents2.Tooltip, {
    id: id,
    place: "left",
    effect: "solid"
  }, _react.default.createElement("span", null, message));
};

var MapControlFactory = function MapControlFactory() {
  return MapControl;
};

var _default = MapControlFactory;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21hcC9tYXAtY29udHJvbC5qcyJdLCJuYW1lcyI6WyJTdHlsZWRNYXBDb250cm9sIiwic3R5bGVkIiwiZGl2IiwicHJvcHMiLCJ0aGVtZSIsIm1hcENvbnRyb2wiLCJ3aWR0aCIsInBhZGRpbmciLCJ0b3AiLCJTdHlsZWRNYXBDb250cm9sQWN0aW9uIiwiU3R5bGVkTWFwQ29udHJvbEJ1dHRvbiIsImFjdGl2ZSIsInNlY29uZGFyeUJ0bkFjdEJnZCIsInNlY29uZGFyeUJ0bkJnZCIsInNlY29uZGFyeUJ0bkFjdENvbG9yIiwic2Vjb25kYXJ5QnRuQ29sb3IiLCJ0cmFuc2l0aW9uIiwiU3R5bGVkTWFwQ29udHJvbFBhbmVsIiwibWFwUGFuZWxCYWNrZ3JvdW5kQ29sb3IiLCJTdHlsZWRNYXBDb250cm9sUGFuZWxDb250ZW50IiwiZHJvcGRvd25TY3JvbGxCYXIiLCJTdHlsZWRNYXBDb250cm9sUGFuZWxIZWFkZXIiLCJtYXBQYW5lbEhlYWRlckJhY2tncm91bmRDb2xvciIsImxheWVyU2VsZWN0b3IiLCJsYXllcnMiLCJtYXBMYXllcnMiLCJhdmFpbGFibGVJdGVtcyIsIk9iamVjdCIsImtleXMiLCJyZWR1Y2UiLCJhdmFpbGFibGVMYXllcnMiLCJjdXJyZW50TGF5ZXJJZCIsImN1cnJlbnRMYXllciIsImxheWVyQ29uZmlnIiwiaWQiLCJjb25maWciLCJtdXN0QmVBZGRlZCIsImlzQXZhaWxhYmxlIiwiaXNWaXNpYmxlIiwibmFtZSIsImxhYmVsIiwibGF5ZXIiLCJNYXBDb250cm9sIiwic3RhdGUiLCJtYXBMYXllcnNTZWxlY3RvciIsIml0ZW1zIiwiaW5pdGlhbERhdGFTZWxlY3RvciIsImRyYWdSb3RhdGUiLCJpc1NwbGl0IiwiaXNFeHBvcnQiLCJtYXBJbmRleCIsIm1hcENvbnRyb2xzIiwib25Ub2dnbGVQZXJzcGVjdGl2ZSIsIm9uVG9nZ2xlU3BsaXRNYXAiLCJvbk1hcFRvZ2dsZUxheWVyIiwib25Ub2dnbGVNYXBDb250cm9sIiwic2NhbGUiLCJ2aXNpYmxlTGF5ZXJzIiwibWFwTGVnZW5kIiwidG9nZ2xlM2QiLCJzcGxpdE1hcCIsInNob3ciLCJlIiwicHJldmVudERlZmF1bHQiLCJ1bmRlZmluZWQiLCJDb21wb25lbnQiLCJkYXRhc2V0cyIsIlByb3BUeXBlcyIsIm9iamVjdCIsImlzUmVxdWlyZWQiLCJib29sIiwiYXJyYXlPZiIsIm51bWJlciIsImZ1bmMiLCJNYXBDb250cm9sUGFuZWwiLCJjaGlsZHJlbiIsImhlYWRlciIsIm9uQ2xpY2siLCJ0cmFuc2Zvcm0iLCJwb3NpdGlvbiIsInZlcnRpY2FsQWxpZ24iLCJNYXBMZWdlbmRQYW5lbCIsImlzQWN0aXZlIiwidG9nZ2xlTWVudVBhbmVsIiwiZmlsdGVyIiwiaXRlbSIsIm1hcCIsIkxheWVyU2VsZWN0b3JQYW5lbCIsIkFjdGlvblBhbmVsIiwiTWFwTGVnZW5kVG9vbHRpcCIsIm1lc3NhZ2UiLCJNYXBDb250cm9sRmFjdG9yeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBU0EsSUFBTUEsZ0JBQWdCLEdBQUdDLDBCQUFPQyxHQUFWLG9CQUVYLFVBQUFDLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUMsVUFBWixDQUF1QkMsS0FBM0I7QUFBQSxDQUZNLEVBR1QsVUFBQUgsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZQyxVQUFaLENBQXVCRSxPQUEzQjtBQUFBLENBSEksRUFLYixVQUFBSixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDSyxHQUFWO0FBQUEsQ0FMUSxDQUF0Qjs7QUFTQSxJQUFNQyxzQkFBc0IsR0FBR1IsMEJBQU9DLEdBQVYsb0JBQTVCOztBQU1BLElB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QUF5QyxJQUFBLE9BQU8sRUFBRUM7QUFBbEQsS0FDRSw2QkFBQyx5QkFBRDtBQUFrQixJQUFBLE1BQU0sRUFBRXRDLEtBQTFCO0FBQWlDLElBQUEsZ0JBQWdCLEVBQUVTO0FBQW5ELElBREYsQ0F4QnVCO0FBQUEsQ0FBM0I7O0FBNkJBLElBQU1rQyxXQUFXLEdBQUcsU0FBZEEsV0FBYztBQUFBLE1BQUViLFFBQUYsU0FBRUEsUUFBRjtBQUFBLFNBQ2xCLDZCQUFDLHNCQUFELFFBQXlCQSxRQUF6QixDQURrQjtBQUFBLENBQXBCOztBQUlBLElBQU1jLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUI7QUFBQSxNQUFFdkQsRUFBRixTQUFFQSxFQUFGO0FBQUEsTUFBTXdELE9BQU4sU0FBTUEsT0FBTjtBQUFBLFNBQ3ZCLDZCQUFDLDBCQUFEO0FBQVMsSUFBQSxFQUFFLEVBQUV4RCxFQUFiO0FBQWlCLElBQUEsS0FBSyxFQUFDLE1BQXZCO0FBQThCLElBQUEsTUFBTSxFQUFDO0FBQXJDLEtBQ0UsMkNBQU93RCxPQUFQLENBREYsQ0FEdUI7QUFBQSxDQUF6Qjs7QUFNQSxJQUFNQyxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CO0FBQUEsU0FBTWpELFVBQU47QUFBQSxDQUExQjs7ZUFFZWlELGlCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHtjcmVhdGVTZWxlY3Rvcn0gZnJvbSAncmVzZWxlY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7VG9vbHRpcCwgSWNvblJvdW5kU21hbGx9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBNYXBMYXllclNlbGVjdG9yIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL21hcC1sYXllci1zZWxlY3Rvcic7XG5pbXBvcnQgS2VwbGVyR2xMb2dvIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2xvZ28nO1xuaW1wb3J0IE1hcExlZ2VuZCBmcm9tICcuL21hcC1sZWdlbmQnO1xuaW1wb3J0IHtcbiAgQ2xvc2UsXG4gIFNwbGl0LFxuICBMZWdlbmQsXG4gIEN1YmUzZCxcbiAgRGVsZXRlLFxuICBMYXllcnNcbn0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vaWNvbnMnO1xuXG5jb25zdCBTdHlsZWRNYXBDb250cm9sID0gc3R5bGVkLmRpdmBcbiAgcmlnaHQ6IDA7XG4gIHdpZHRoOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLm1hcENvbnRyb2wud2lkdGh9cHg7XG4gIHBhZGRpbmc6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubWFwQ29udHJvbC5wYWRkaW5nfXB4O1xuICB6LWluZGV4OiAxO1xuICB0b3A6ICR7cHJvcHMgPT4gcHJvcHMudG9wfXB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG5gO1xuXG5jb25zdCBTdHlsZWRNYXBDb250cm9sQWN0aW9uID0gc3R5bGVkLmRpdmBcbiAgcGFkZGluZzogNHB4IDA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG5gO1xuXG5jb25zdCBTdHlsZWRNYXBDb250cm9sQnV0dG9uID0gc3R5bGVkLmRpdmBcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PlxuICAgIHByb3BzLmFjdGl2ZVxuICAgICAgPyBwcm9wcy50aGVtZS5zZWNvbmRhcnlCdG5BY3RCZ2RcbiAgICAgIDogcHJvcHMudGhlbWUuc2Vjb25kYXJ5QnRuQmdkfTtcbiAgYm9yZGVyLXJhZGl1czogMThweDtcbiAgYm9yZGVyOiAwO1xuICBib3gtc2hhZG93OiAwIDZweCAxMnB4IDAgcmdiYSgwLCAwLCAwLCAwLjE2KTtcbiAgY29sb3I6ICR7cHJvcHMgPT5cbiAgICBwcm9wcy5hY3RpdmVcbiAgICAgID8gcHJvcHMudGhlbWUuc2Vjb25kYXJ5QnRuQWN0Q29sb3JcbiAgICAgIDogcHJvcHMudGhlbWUuc2Vjb25kYXJ5QnRuQ29sb3J9O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGhlaWdodDogMzZweDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIG1hcmdpbjogMDtcbiAgb3V0bGluZTogbm9uZTtcbiAgcGFkZGluZzogMDtcbiAgdHJhbnNpdGlvbjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50cmFuc2l0aW9ufTtcbiAgd2lkdGg6IDM2cHg7XG5cbiAgOmZvY3VzIHtcbiAgICBvdXRsaW5lOiBub25lO1xuICB9XG5cbiAgOmhvdmVyIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWNvbmRhcnlCdG5BY3RCZ2R9O1xuICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNlY29uZGFyeUJ0bkFjdENvbG9yfTtcbiAgfVxuYDtcblxuY29uc3QgU3R5bGVkTWFwQ29udHJvbFBhbmVsID0gc3R5bGVkLmRpdmBcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5tYXBQYW5lbEJhY2tncm91bmRDb2xvcn07XG4gIGZsZXgtZ3JvdzogMTtcbiAgei1pbmRleDogMTtcbiAgcCB7XG4gICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgfVxuYDtcblxuY29uc3QgU3R5bGVkTWFwQ29udHJvbFBhbmVsQ29udGVudCA9IHN0eWxlZC5kaXZgXG4gICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZHJvcGRvd25TY3JvbGxCYXJ9IG1heC1oZWlnaHQ6IDUwMHB4O1xuICBtaW4taGVpZ2h0OiAxMDBweDtcbiAgb3ZlcmZsb3c6IGF1dG87XG5gO1xuXG5jb25zdCBTdHlsZWRNYXBDb250cm9sUGFuZWxIZWFkZXIgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubWFwUGFuZWxIZWFkZXJCYWNrZ3JvdW5kQ29sb3J9O1xuICBoZWlnaHQ6IDMycHg7XG4gIHBhZGRpbmc6IDZweCAxMnB4O1xuICBmb250LXNpemU6IDExcHg7XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNlY29uZGFyeUJ0bkNvbG9yfTtcblxuICBidXR0b24ge1xuICAgIHdpZHRoOiAxOHB4O1xuICAgIGhlaWdodDogMThweDtcbiAgfVxuYDtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYWxsIGxheWVycyBhdmFpbGFibGUgZm9yIHRoZSBjdXJyZW50IG1hcFxuICogVE9ETzogdGhpcyBtYXkgYmUgbW92ZWQgaW50byBtYXAtY29udGFpbmVyIG9yIG1hcC1jb250cm9sIG9yIGV2ZW4gYXQgdGhlIHJlZHVjZXIgbGV2ZWxcbiAqIEBwYXJhbSBsYXllcnNcbiAqIEBwYXJhbSBtYXBMYXllcnNcbiAqIEByZXR1cm5zIHtbaWQsIGxhYmVsLCBpc1Zpc2libGVdfVxuICovXG5jb25zdCBsYXllclNlbGVjdG9yID0gKGxheWVycywgbWFwTGF5ZXJzKSA9PiB7XG4gIGNvbnN0IGF2YWlsYWJsZUl0ZW1zID0gT2JqZWN0LmtleXMobGF5ZXJzKS5yZWR1Y2UoXG4gICAgKGF2YWlsYWJsZUxheWVycywgY3VycmVudExheWVySWQpID0+IHtcbiAgICAgIC8vIGlzIGF2YWlsYWJsZSA/IGlmIHllcyBhZGQgdG8gYXZhaWxhYmxlIGxpc3RcbiAgICAgIGNvbnN0IGN1cnJlbnRMYXllciA9IGxheWVyc1tjdXJyZW50TGF5ZXJJZF07XG4gICAgICAvLyBpZiBtYXBsYXllcnMgZXhpc3RzIHdlIG5lZWQgdG8gbWFrZSBzdXJlIGN1cnJlbnRsYXllclxuICAgICAgLy8gaXMgY29udGFpbmVkIGluIG1hcExheWVycyBpbiBvcmRlciB0byBhZGQgb250byBhdmFpbGFibGVMYXllcnNcbiAgICAgIC8vIG90aGVyd2lzZSB3ZSBhZGQgYWxsIGxheWVyc1xuXG4gICAgICBjb25zdCBsYXllckNvbmZpZyA9IG1hcExheWVyc1xuICAgICAgICA/IG1hcExheWVyc1tjdXJyZW50TGF5ZXIuaWRdXG4gICAgICAgIDogY3VycmVudExheWVyLmNvbmZpZztcblxuICAgICAgY29uc3QgbXVzdEJlQWRkZWQgPVxuICAgICAgICBtYXBMYXllcnMgJiYgbWFwTGF5ZXJzW2N1cnJlbnRMYXllci5pZF1cbiAgICAgICAgICA/IG1hcExheWVyc1tjdXJyZW50TGF5ZXIuaWRdLmlzQXZhaWxhYmxlXG4gICAgICAgICAgOiBsYXllckNvbmZpZy5pc1Zpc2libGU7XG5cbiAgICAgIHJldHVybiBtdXN0QmVBZGRlZFxuICAgICAgICA/IFtcbiAgICAgICAgICAgIC4uLmF2YWlsYWJsZUxheWVycyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6IGN1cnJlbnRMYXllci5pZCxcbiAgICAgICAgICAgICAgbmFtZTogY3VycmVudExheWVyLmNvbmZpZy5sYWJlbCxcbiAgICAgICAgICAgICAgaXNWaXNpYmxlOlxuICAgICAgICAgICAgICAgIG1hcExheWVycyAmJiBtYXBMYXllcnNbY3VycmVudExheWVyLmlkXVxuICAgICAgICAgICAgICAgICAgPyBtYXBMYXllcnNbY3VycmVudExheWVyLmlkXS5pc1Zpc2libGVcbiAgICAgICAgICAgICAgICAgIDogbGF5ZXJDb25maWcuaXNWaXNpYmxlLFxuICAgICAgICAgICAgICBsYXllcjogY3VycmVudExheWVyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICA6IGF2YWlsYWJsZUxheWVycztcbiAgICB9LFxuICAgIFtdXG4gICk7XG5cbiAgcmV0dXJuIGF2YWlsYWJsZUl0ZW1zO1xufTtcblxuZXhwb3J0IGNsYXNzIE1hcENvbnRyb2wgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGRhdGFzZXRzOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgZHJhZ1JvdGF0ZTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc1NwbGl0OiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGxheWVyczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9iamVjdCksXG4gICAgbWFwSW5kZXg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICBtYXBDb250cm9sczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIG9uVG9nZ2xlUGVyc3BlY3RpdmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25Ub2dnbGVTcGxpdE1hcDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvblRvZ2dsZU1hcENvbnRyb2w6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25NYXBUb2dnbGVMYXllcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICB0b3A6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAgIC8vIG9wdGlvbmFsXG4gICAgc2NhbGU6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbWFwTGF5ZXJzOiBQcm9wVHlwZXMub2JqZWN0XG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBpc1NwbGl0OiBmYWxzZSxcbiAgICB0b3A6IDBcbiAgfTtcblxuICBsYXllclNlbGVjdG9yID0gc3RhdGUgPT4gc3RhdGUubGF5ZXJzO1xuICBtYXBMYXllcnNTZWxlY3RvciA9IHN0YXRlID0+IHN0YXRlLm1hcExheWVycztcblxuICBpbml0aWFsRGF0YVNlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3IoXG4gICAgdGhpcy5sYXllclNlbGVjdG9yLFxuICAgIHRoaXMubWFwTGF5ZXJzU2VsZWN0b3IsXG4gICAgbGF5ZXJTZWxlY3RvclxuICApO1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBpdGVtcyA9IHRoaXMuaW5pdGlhbERhdGFTZWxlY3Rvcih0aGlzLnByb3BzKTtcblxuICAgIGlmICghaXRlbXMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHtcbiAgICAgIGRyYWdSb3RhdGUsXG4gICAgICBpc1NwbGl0LFxuICAgICAgaXNFeHBvcnQsXG4gICAgICBtYXBJbmRleCxcbiAgICAgIG1hcENvbnRyb2xzLFxuICAgICAgb25Ub2dnbGVQZXJzcGVjdGl2ZSxcbiAgICAgIG9uVG9nZ2xlU3BsaXRNYXAsXG4gICAgICBvbk1hcFRvZ2dsZUxheWVyLFxuICAgICAgb25Ub2dnbGVNYXBDb250cm9sLFxuICAgICAgc2NhbGVcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHtcbiAgICAgIHZpc2libGVMYXllcnMgPSB7fSxcbiAgICAgIG1hcExlZ2VuZCA9IHt9LFxuICAgICAgdG9nZ2xlM2QgPSB7fSxcbiAgICAgIHNwbGl0TWFwID0ge31cbiAgICB9ID0gbWFwQ29udHJvbHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFN0eWxlZE1hcENvbnRyb2wgY2xhc3NOYW1lPVwibWFwLWNvbnRyb2xcIj5cbiAgICAgICAgey8qIFNwbGl0IE1hcCAqL31cbiAgICAgICAge3NwbGl0TWFwLnNob3cgPyAoXG4gICAgICAgICAgPEFjdGlvblBhbmVsIGtleT17MH0+XG4gICAgICAgICAgICA8U3R5bGVkTWFwQ29udHJvbEJ1dHRvblxuICAgICAgICAgICAgICBhY3RpdmU9e2lzU3BsaXR9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2UgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBvblRvZ2dsZVNwbGl0TWFwKGlzU3BsaXQgPyBtYXBJbmRleCA6IHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGtleT17YHNwbGl0LSR7aXNTcGxpdH1gfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtYXAtY29udHJvbC1idXR0b24gc3BsaXQtbWFwXCJcbiAgICAgICAgICAgICAgZGF0YS10aXBcbiAgICAgICAgICAgICAgZGF0YS1mb3I9XCJhY3Rpb24tdG9nZ2xlXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2lzU3BsaXQgPyA8RGVsZXRlIGhlaWdodD1cIjE4cHhcIiAvPiA6IDxTcGxpdCBoZWlnaHQ9XCIxOHB4XCIgLz59XG4gICAgICAgICAgICAgIDxNYXBMZWdlbmRUb29sdGlwXG4gICAgICAgICAgICAgICAgaWQ9XCJhY3Rpb24tdG9nZ2xlXCJcbiAgICAgICAgICAgICAgICBtZXNzYWdlPXtcbiAgICAgICAgICAgICAgICAgIGlzU3BsaXQgPyAnQ2xvc2UgY3VycmVudCBwYW5lbCcgOiAnU3dpdGNoIHRvIGR1YWwgbWFwIHZpZXcnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9TdHlsZWRNYXBDb250cm9sQnV0dG9uPlxuICAgICAgICAgIDwvQWN0aW9uUGFuZWw+XG4gICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgIHsvKiBNYXAgTGF5ZXJzICovfVxuICAgICAgICB7aXNTcGxpdCAmJiB2aXNpYmxlTGF5ZXJzLnNob3cgPyAoXG4gICAgICAgICAgPEFjdGlvblBhbmVsIGtleT17MX0+XG4gICAgICAgICAgICA8TGF5ZXJTZWxlY3RvclBhbmVsXG4gICAgICAgICAgICAgIGl0ZW1zPXtpdGVtc31cbiAgICAgICAgICAgICAgb25NYXBUb2dnbGVMYXllcj17b25NYXBUb2dnbGVMYXllcn1cbiAgICAgICAgICAgICAgaXNBY3RpdmU9e3Zpc2libGVMYXllcnMuYWN0aXZlfVxuICAgICAgICAgICAgICB0b2dnbGVNZW51UGFuZWw9eygpID0+IG9uVG9nZ2xlTWFwQ29udHJvbCgndmlzaWJsZUxheWVycycpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0FjdGlvblBhbmVsPlxuICAgICAgICApIDogbnVsbH1cblxuICAgICAgICB7LyogM0QgTWFwICovfVxuICAgICAgICB7dG9nZ2xlM2Quc2hvdyA/IChcbiAgICAgICAgICA8QWN0aW9uUGFuZWwga2V5PXsyfT5cbiAgICAgICAgICAgIDxTdHlsZWRNYXBDb250cm9sQnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2UgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBvblRvZ2dsZVBlcnNwZWN0aXZlKCk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGFjdGl2ZT17ZHJhZ1JvdGF0ZX1cbiAgICAgICAgICAgICAgZGF0YS10aXBcbiAgICAgICAgICAgICAgZGF0YS1mb3I9XCJhY3Rpb24tM2RcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8Q3ViZTNkIGhlaWdodD1cIjIycHhcIiAvPlxuICAgICAgICAgICAgICB7LyogTm8gaWNvbiBzaW5jZSB3ZSBhcmUgaW5qZWN0aW5nIHRocm91Z2ggY3NzIC50aHJlZUQtbWFwIGNsYXNzKi99XG4gICAgICAgICAgICAgIDxNYXBMZWdlbmRUb29sdGlwXG4gICAgICAgICAgICAgICAgaWQ9XCJhY3Rpb24tM2RcIlxuICAgICAgICAgICAgICAgIG1lc3NhZ2U9e2RyYWdSb3RhdGUgPyAnRGlzYWJsZSAzRCBNYXAnIDogJzNEIE1hcCd9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L1N0eWxlZE1hcENvbnRyb2xCdXR0b24+XG4gICAgICAgICAgPC9BY3Rpb25QYW5lbD5cbiAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgey8qIE1hcCBMZWdlbmQgKi99XG4gICAgICAgIHttYXBMZWdlbmQuc2hvdyA/IChcbiAgICAgICAgICA8QWN0aW9uUGFuZWwga2V5PXszfT5cbiAgICAgICAgICAgIDxNYXBMZWdlbmRQYW5lbFxuICAgICAgICAgICAgICBpdGVtcz17aXRlbXN9XG4gICAgICAgICAgICAgIHNjYWxlPXtzY2FsZX1cbiAgICAgICAgICAgICAgaXNFeHBvcnQ9e2lzRXhwb3J0fVxuICAgICAgICAgICAgICBvbk1hcFRvZ2dsZUxheWVyPXtvbk1hcFRvZ2dsZUxheWVyfVxuICAgICAgICAgICAgICBpc0FjdGl2ZT17bWFwTGVnZW5kLmFjdGl2ZX1cbiAgICAgICAgICAgICAgdG9nZ2xlTWVudVBhbmVsPXsoKSA9PiBvblRvZ2dsZU1hcENvbnRyb2woJ21hcExlZ2VuZCcpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0FjdGlvblBhbmVsPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgIDwvU3R5bGVkTWFwQ29udHJvbD5cbiAgICApO1xuICB9XG59XG5cbmNvbnN0IE1hcENvbnRyb2xQYW5lbCA9ICh7Y2hpbGRyZW4sIGhlYWRlciwgb25DbGljaywgc2NhbGUgPSAxLCBpc0V4cG9ydH0pID0+IChcbiAgPFN0eWxlZE1hcENvbnRyb2xQYW5lbFxuICAgIHN0eWxlPXt7XG4gICAgICB0cmFuc2Zvcm06IGBzY2FsZSgke3NjYWxlfSkgdHJhbnNsYXRlKGNhbGMoLSR7MjUgKiAoc2NhbGUgLSAxKX0lIC0gJHsxMCAqXG4gICAgICAgIHNjYWxlfXB4KSwgY2FsYygkezI1ICogKHNjYWxlIC0gMSl9JSArICR7MTAgKiBzY2FsZX1weCkpYFxuICAgIH19XG4gID5cbiAgICA8U3R5bGVkTWFwQ29udHJvbFBhbmVsSGVhZGVyIHN0eWxlPXt7cG9zaXRpb246ICdyZWxhdGl2ZSd9fT5cbiAgICAgIHtpc0V4cG9ydCA/IChcbiAgICAgICAgPEtlcGxlckdsTG9nbyB2ZXJzaW9uPXtmYWxzZX0gYXBwTmFtZT1cImtlcGxlci5nbFwiLz5cbiAgICAgICkgOiAoXG4gICAgICAgIDxzcGFuIHN0eWxlPXt7dmVydGljYWxBbGlnbjogJ21pZGRsZSd9fT57aGVhZGVyfTwvc3Bhbj5cbiAgICAgICl9XG4gICAgICB7aXNFeHBvcnQgPyBudWxsIDogKFxuICAgICAgICA8SWNvblJvdW5kU21hbGw+XG4gICAgICAgICAgPENsb3NlIGhlaWdodD1cIjE2cHhcIiBvbkNsaWNrPXtvbkNsaWNrfSAvPlxuICAgICAgICA8L0ljb25Sb3VuZFNtYWxsPlxuICAgICAgKX1cbiAgICA8L1N0eWxlZE1hcENvbnRyb2xQYW5lbEhlYWRlcj5cbiAgICA8U3R5bGVkTWFwQ29udHJvbFBhbmVsQ29udGVudD57Y2hpbGRyZW59PC9TdHlsZWRNYXBDb250cm9sUGFuZWxDb250ZW50PlxuICA8L1N0eWxlZE1hcENvbnRyb2xQYW5lbD5cbik7XG5cbmNvbnN0IE1hcExlZ2VuZFBhbmVsID0gKHtpdGVtcywgaXNBY3RpdmUsIHNjYWxlLCB0b2dnbGVNZW51UGFuZWwsIGlzRXhwb3J0fSkgPT5cbiAgIWlzQWN0aXZlID8gKFxuICAgIDxTdHlsZWRNYXBDb250cm9sQnV0dG9uXG4gICAgICBrZXk9ezJ9XG4gICAgICBkYXRhLXRpcFxuICAgICAgZGF0YS1mb3I9XCJzaG93LWxlZ2VuZFwiXG4gICAgICBjbGFzc05hbWU9XCJtYXAtY29udHJvbC1idXR0b24gc2hvdy1sZWdlbmRcIlxuICAgICAgb25DbGljaz17ZSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdG9nZ2xlTWVudVBhbmVsKCk7XG4gICAgICB9fVxuICAgID5cbiAgICAgIDxMZWdlbmQgaGVpZ2h0PVwiMjJweFwiIC8+XG4gICAgICA8TWFwTGVnZW5kVG9vbHRpcCBpZD1cInNob3ctbGVnZW5kXCIgbWVzc2FnZT17J3Nob3cgbGVnZW5kJ30gLz5cbiAgICA8L1N0eWxlZE1hcENvbnRyb2xCdXR0b24+XG4gICkgOiAoXG4gICAgPE1hcENvbnRyb2xQYW5lbFxuICAgICAgc2NhbGU9e3NjYWxlfVxuICAgICAgaGVhZGVyPXsnTGF5ZXIgTGVnZW5kJ31cbiAgICAgIG9uQ2xpY2s9e3RvZ2dsZU1lbnVQYW5lbH1cbiAgICAgIGlzRXhwb3J0PXtpc0V4cG9ydH1cbiAgICA+XG4gICAgICA8TWFwTGVnZW5kXG4gICAgICAgIGxheWVycz17aXRlbXMuZmlsdGVyKGl0ZW0gPT4gaXRlbS5pc1Zpc2libGUpLm1hcChpdGVtID0+IGl0ZW0ubGF5ZXIpfVxuICAgICAgLz5cbiAgICA8L01hcENvbnRyb2xQYW5lbD5cbiAgKTtcblxuY29uc3QgTGF5ZXJTZWxlY3RvclBhbmVsID0gKHtcbiAgaXRlbXMsXG4gIG9uTWFwVG9nZ2xlTGF5ZXIsXG4gIGlzQWN0aXZlLFxuICB0b2dnbGVNZW51UGFuZWxcbn0pID0+XG4gICFpc0FjdGl2ZSA/IChcbiAgICA8U3R5bGVkTWFwQ29udHJvbEJ1dHRvblxuICAgICAga2V5PXsxfVxuICAgICAgb25DbGljaz17ZSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdG9nZ2xlTWVudVBhbmVsKCk7XG4gICAgICB9fVxuICAgICAgY2xhc3NOYW1lPVwibWFwLWNvbnRyb2wtYnV0dG9uIHRvZ2dsZS1sYXllclwiXG4gICAgICBkYXRhLXRpcFxuICAgICAgZGF0YS1mb3I9XCJ0b2dnbGUtbGF5ZXJcIlxuICAgID5cbiAgICAgIDxMYXllcnMgaGVpZ2h0PVwiMjJweFwiIC8+XG4gICAgICA8TWFwTGVnZW5kVG9vbHRpcFxuICAgICAgICBpZD1cInRvZ2dsZS1sYXllclwiXG4gICAgICAgIG1lc3NhZ2U9e2lzQWN0aXZlID8gJ0hpZGUgbGF5ZXIgcGFuZWwnIDogJ1Nob3cgbGF5ZXIgcGFuZWwnfVxuICAgICAgLz5cbiAgICA8L1N0eWxlZE1hcENvbnRyb2xCdXR0b24+XG4gICkgOiAoXG4gICAgPE1hcENvbnRyb2xQYW5lbCBoZWFkZXI9XCJWaXNpYmxlIGxheWVyc1wiIG9uQ2xpY2s9e3RvZ2dsZU1lbnVQYW5lbH0+XG4gICAgICA8TWFwTGF5ZXJTZWxlY3RvciBsYXllcnM9e2l0ZW1zfSBvbk1hcFRvZ2dsZUxheWVyPXtvbk1hcFRvZ2dsZUxheWVyfSAvPlxuICAgIDwvTWFwQ29udHJvbFBhbmVsPlxuICApO1xuXG5jb25zdCBBY3Rpb25QYW5lbCA9ICh7Y2hpbGRyZW59KSA9PiAoXG4gIDxTdHlsZWRNYXBDb250cm9sQWN0aW9uPntjaGlsZHJlbn08L1N0eWxlZE1hcENvbnRyb2xBY3Rpb24+XG4pO1xuXG5jb25zdCBNYXBMZWdlbmRUb29sdGlwID0gKHtpZCwgbWVzc2FnZX0pID0+IChcbiAgPFRvb2x0aXAgaWQ9e2lkfSBwbGFjZT1cImxlZnRcIiBlZmZlY3Q9XCJzb2xpZFwiPlxuICAgIDxzcGFuPnttZXNzYWdlfTwvc3Bhbj5cbiAgPC9Ub29sdGlwPlxuKTtcblxuY29uc3QgTWFwQ29udHJvbEZhY3RvcnkgPSAoKSA9PiBNYXBDb250cm9sO1xuXG5leHBvcnQgZGVmYXVsdCBNYXBDb250cm9sRmFjdG9yeTtcbiJdfQ==