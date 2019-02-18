"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactAnythingSortable = require("react-anything-sortable");

var _layerConfigurator = _interopRequireDefault(require("./layer-configurator"));

var _layerPanelHeader = _interopRequireDefault(require("./layer-panel-header"));

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  font-size: 12px;\n  border-radius: 1px;\n  margin-bottom: 8px;\n\n  &.dragging {\n    cursor: move;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var PanelWrapper = _styledComponents.default.div(_templateObject());

function LayerPanelFactory() {
  var _class, _class2, _temp;

  var LayerPanel = (0, _reactAnythingSortable.sortable)(_class = (_temp = _class2 =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2.default)(LayerPanel, _Component);

    function LayerPanel() {
      var _getPrototypeOf2;

      var _this;

      (0, _classCallCheck2.default)(this, LayerPanel);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(LayerPanel)).call.apply(_getPrototypeOf2, [this].concat(args)));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "updateLayerConfig", function (newProp) {
        _this.props.layerConfigChange(_this.props.layer, newProp);
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "updateLayerType", function (newType) {
        _this.props.layerTypeChange(_this.props.layer, newType);
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "updateLayerVisConfig", function (newVisConfig) {
        _this.props.layerVisConfigChange(_this.props.layer, newVisConfig);
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "updateLayerVisualChannelConfig", function (newConfig, channel, scaleKey) {
        _this.props.layerVisualChannelConfigChange(_this.props.layer, newConfig, channel, scaleKey);
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_updateLayerLabel", function (_ref) {
        var value = _ref.target.value;

        _this.updateLayerConfig({
          label: value
        });
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_toggleVisibility", function (e) {
        e.stopPropagation();
        var isVisible = !_this.props.layer.config.isVisible;

        _this.updateLayerConfig({
          isVisible: isVisible
        });
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_toggleEnableConfig", function (e) {
        e.stopPropagation();
        var isConfigActive = _this.props.layer.config.isConfigActive;

        _this.updateLayerConfig({
          isConfigActive: !isConfigActive
        });
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_removeLayer", function (e) {
        e.stopPropagation();

        _this.props.removeLayer(_this.props.idx);
      });
      return _this;
    }

    (0, _createClass2.default)(LayerPanel, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            layer = _this$props.layer,
            idx = _this$props.idx,
            datasets = _this$props.datasets,
            layerTypeOptions = _this$props.layerTypeOptions;
        var config = layer.config;
        var isConfigActive = config.isConfigActive;
        return _react.default.createElement(PanelWrapper, {
          active: isConfigActive,
          className: "layer-panel ".concat(this.props.className),
          style: this.props.style,
          onMouseDown: this.props.onMouseDown,
          onTouchStart: this.props.onTouchStart
        }, _react.default.createElement(_layerPanelHeader.default, {
          isConfigActive: isConfigActive,
          id: layer.id,
          idx: idx,
          isVisible: config.isVisible,
          label: config.label,
          labelRCGColorValues: datasets[config.dataId].color,
          layerType: layer.name,
          onToggleEnableConfig: this._toggleEnableConfig,
          onToggleVisibility: this._toggleVisibility,
          onUpdateLayerLabel: this._updateLayerLabel,
          onRemoveLayer: this._removeLayer
        }), isConfigActive && _react.default.createElement(_layerConfigurator.default, {
          layer: layer,
          datasets: datasets,
          layerTypeOptions: layerTypeOptions,
          openModal: this.props.openModal,
          updateLayerConfig: this.updateLayerConfig,
          updateLayerVisualChannelConfig: this.updateLayerVisualChannelConfig,
          updateLayerType: this.updateLayerType,
          updateLayerVisConfig: this.updateLayerVisConfig
        }));
      }
    }]);
    return LayerPanel;
  }(_react.Component), (0, _defineProperty2.default)(_class2, "propTypes", {
    layer: _propTypes.default.object.isRequired,
    datasets: _propTypes.default.object.isRequired,
    idx: _propTypes.default.number.isRequired,
    layerConfigChange: _propTypes.default.func.isRequired,
    layerTypeChange: _propTypes.default.func.isRequired,
    openModal: _propTypes.default.func.isRequired,
    removeLayer: _propTypes.default.func.isRequired,
    onCloseConfig: _propTypes.default.func,
    layerTypeOptions: _propTypes.default.arrayOf(_propTypes.default.any),
    layerVisConfigChange: _propTypes.default.func,
    layerVisualChannelConfigChange: _propTypes.default.func
  }), _temp)) || _class;

  return LayerPanel;
}

var _default = LayerPanelFactory;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItcGFuZWwvbGF5ZXItcGFuZWwuanMiXSwibmFtZXMiOlsiUGFuZWxXcmFwcGVyIiwic3R5bGVkIiwiZGl2IiwiTGF5ZXJQYW5lbEZhY3RvcnkiLCJMYXllclBhbmVsIiwic29ydGFibGUiLCJuZXdQcm9wIiwicHJvcHMiLCJsYXllckNvbmZpZ0NoYW5nZSIsImxheWVyIiwibmV3VHlwZSIsImxheWVyVHlwZUNoYW5nZSIsIm5ld1Zpc0NvbmZpZyIsImxheWVyVmlzQ29uZmlnQ2hhbmdlIiwibmV3Q29uZmlnIiwiY2hhbm5lbCIsInNjYWxlS2V5IiwibGF5ZXJWaXN1YWxDaGFubmVsQ29uZmlnQ2hhbmdlIiwidmFsdWUiLCJ0YXJnZXQiLCJ1cGRhdGVMYXllckNvbmZpZyIsImxhYmVsIiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsImlzVmlzaWJsZSIsImNvbmZpZyIsImlzQ29uZmlnQWN0aXZlIiwicmVtb3ZlTGF5ZXIiLCJpZHgiLCJkYXRhc2V0cyIsImxheWVyVHlwZU9wdGlvbnMiLCJjbGFzc05hbWUiLCJzdHlsZSIsIm9uTW91c2VEb3duIiwib25Ub3VjaFN0YXJ0IiwiaWQiLCJkYXRhSWQiLCJjb2xvciIsIm5hbWUiLCJfdG9nZ2xlRW5hYmxlQ29uZmlnIiwiX3RvZ2dsZVZpc2liaWxpdHkiLCJfdXBkYXRlTGF5ZXJMYWJlbCIsIl9yZW1vdmVMYXllciIsIm9wZW5Nb2RhbCIsInVwZGF0ZUxheWVyVmlzdWFsQ2hhbm5lbENvbmZpZyIsInVwZGF0ZUxheWVyVHlwZSIsInVwZGF0ZUxheWVyVmlzQ29uZmlnIiwiQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiaXNSZXF1aXJlZCIsIm51bWJlciIsImZ1bmMiLCJvbkNsb3NlQ29uZmlnIiwiYXJyYXlPZiIsImFueSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNB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VUMsTUFBVixDQUFpQkMsVUFGVjtBQUdqQnRCLElBQUFBLEdBQUcsRUFBRW9CLG1CQUFVRyxNQUFWLENBQWlCRCxVQUhMO0FBSWpCMUMsSUFBQUEsaUJBQWlCLEVBQUV3QyxtQkFBVUksSUFBVixDQUFlRixVQUpqQjtBQUtqQnZDLElBQUFBLGVBQWUsRUFBRXFDLG1CQUFVSSxJQUFWLENBQWVGLFVBTGY7QUFNakJQLElBQUFBLFNBQVMsRUFBRUssbUJBQVVJLElBQVYsQ0FBZUYsVUFOVDtBQU9qQnZCLElBQUFBLFdBQVcsRUFBRXFCLG1CQUFVSSxJQUFWLENBQWVGLFVBUFg7QUFRakJHLElBQUFBLGFBQWEsRUFBRUwsbUJBQVVJLElBUlI7QUFVakJ0QixJQUFBQSxnQkFBZ0IsRUFBRWtCLG1CQUFVTSxPQUFWLENBQWtCTixtQkFBVU8sR0FBNUIsQ0FWRDtBQVdqQjFDLElBQUFBLG9CQUFvQixFQUFFbUMsbUJBQVVJLElBWGY7QUFZakJuQyxJQUFBQSw4QkFBOEIsRUFBRStCLG1CQUFVSTtBQVp6QixHQUhNOztBQXNHM0IsU0FBT2hELFVBQVA7QUFDRDs7ZUFFY0QsaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7c29ydGFibGV9IGZyb20gJ3JlYWN0LWFueXRoaW5nLXNvcnRhYmxlJztcblxuaW1wb3J0IExheWVyQ29uZmlndXJhdG9yIGZyb20gJy4vbGF5ZXItY29uZmlndXJhdG9yJztcbmltcG9ydCBMYXllclBhbmVsSGVhZGVyIGZyb20gJy4vbGF5ZXItcGFuZWwtaGVhZGVyJztcblxuY29uc3QgUGFuZWxXcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgZm9udC1zaXplOiAxMnB4O1xuICBib3JkZXItcmFkaXVzOiAxcHg7XG4gIG1hcmdpbi1ib3R0b206IDhweDtcblxuICAmLmRyYWdnaW5nIHtcbiAgICBjdXJzb3I6IG1vdmU7XG4gIH1cbmA7XG5cbmZ1bmN0aW9uIExheWVyUGFuZWxGYWN0b3J5KCkge1xuICBAc29ydGFibGVcbiAgY2xhc3MgTGF5ZXJQYW5lbCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgIGxheWVyOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICBkYXRhc2V0czogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgaWR4OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICBsYXllckNvbmZpZ0NoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIGxheWVyVHlwZUNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIG9wZW5Nb2RhbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIHJlbW92ZUxheWVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgb25DbG9zZUNvbmZpZzogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgICAgIGxheWVyVHlwZU9wdGlvbnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLFxuICAgICAgbGF5ZXJWaXNDb25maWdDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgbGF5ZXJWaXN1YWxDaGFubmVsQ29uZmlnQ2hhbmdlOiBQcm9wVHlwZXMuZnVuY1xuICAgIH07XG5cbiAgICB1cGRhdGVMYXllckNvbmZpZyA9IG5ld1Byb3AgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5sYXllckNvbmZpZ0NoYW5nZSh0aGlzLnByb3BzLmxheWVyLCBuZXdQcm9wKTtcbiAgICB9O1xuXG4gICAgdXBkYXRlTGF5ZXJUeXBlID0gbmV3VHlwZSA9PiB7XG4gICAgICB0aGlzLnByb3BzLmxheWVyVHlwZUNoYW5nZSh0aGlzLnByb3BzLmxheWVyLCBuZXdUeXBlKTtcbiAgICB9O1xuXG4gICAgdXBkYXRlTGF5ZXJWaXNDb25maWcgPSBuZXdWaXNDb25maWcgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5sYXllclZpc0NvbmZpZ0NoYW5nZSh0aGlzLnByb3BzLmxheWVyLCBuZXdWaXNDb25maWcpO1xuICAgIH07XG5cbiAgICB1cGRhdGVMYXllclZpc3VhbENoYW5uZWxDb25maWcgPSAobmV3Q29uZmlnLCBjaGFubmVsLCBzY2FsZUtleSkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5sYXllclZpc3VhbENoYW5uZWxDb25maWdDaGFuZ2UoXG4gICAgICAgIHRoaXMucHJvcHMubGF5ZXIsXG4gICAgICAgIG5ld0NvbmZpZyxcbiAgICAgICAgY2hhbm5lbCxcbiAgICAgICAgc2NhbGVLZXlcbiAgICAgICk7XG4gICAgfTtcblxuICAgIF91cGRhdGVMYXllckxhYmVsID0gKHt0YXJnZXQ6IHt2YWx1ZX19KSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZUxheWVyQ29uZmlnKHtsYWJlbDogdmFsdWV9KTtcbiAgICB9O1xuXG4gICAgX3RvZ2dsZVZpc2liaWxpdHkgPSBlID0+IHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBjb25zdCBpc1Zpc2libGUgPSAhdGhpcy5wcm9wcy5sYXllci5jb25maWcuaXNWaXNpYmxlO1xuICAgICAgdGhpcy51cGRhdGVMYXllckNvbmZpZyh7aXNWaXNpYmxlfSk7XG4gICAgfTtcblxuICAgIF90b2dnbGVFbmFibGVDb25maWcgPSBlID0+IHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBjb25zdCB7bGF5ZXI6IHtjb25maWc6IHtpc0NvbmZpZ0FjdGl2ZX19fSA9IHRoaXMucHJvcHM7XG4gICAgICB0aGlzLnVwZGF0ZUxheWVyQ29uZmlnKHtpc0NvbmZpZ0FjdGl2ZTogIWlzQ29uZmlnQWN0aXZlfSk7XG4gICAgfTtcblxuICAgIF9yZW1vdmVMYXllciA9IGUgPT4ge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHRoaXMucHJvcHMucmVtb3ZlTGF5ZXIodGhpcy5wcm9wcy5pZHgpO1xuICAgIH07XG4gICAgcmVuZGVyKCkge1xuICAgICAgY29uc3Qge2xheWVyLCBpZHgsIGRhdGFzZXRzLCBsYXllclR5cGVPcHRpb25zfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCB7Y29uZmlnfSA9IGxheWVyO1xuICAgICAgY29uc3Qge2lzQ29uZmlnQWN0aXZlfSA9IGNvbmZpZztcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFBhbmVsV3JhcHBlclxuICAgICAgICAgIGFjdGl2ZT17aXNDb25maWdBY3RpdmV9XG4gICAgICAgICAgY2xhc3NOYW1lPXtgbGF5ZXItcGFuZWwgJHt0aGlzLnByb3BzLmNsYXNzTmFtZX1gfVxuICAgICAgICAgIHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfVxuICAgICAgICAgIG9uTW91c2VEb3duPXt0aGlzLnByb3BzLm9uTW91c2VEb3dufVxuICAgICAgICAgIG9uVG91Y2hTdGFydD17dGhpcy5wcm9wcy5vblRvdWNoU3RhcnR9XG4gICAgICAgID5cbiAgICAgICAgICA8TGF5ZXJQYW5lbEhlYWRlclxuICAgICAgICAgICAgaXNDb25maWdBY3RpdmU9e2lzQ29uZmlnQWN0aXZlfVxuICAgICAgICAgICAgaWQ9e2xheWVyLmlkfVxuICAgICAgICAgICAgaWR4PXtpZHh9XG4gICAgICAgICAgICBpc1Zpc2libGU9e2NvbmZpZy5pc1Zpc2libGV9XG4gICAgICAgICAgICBsYWJlbD17Y29uZmlnLmxhYmVsfVxuICAgICAgICAgICAgbGFiZWxSQ0dDb2xvclZhbHVlcz17ZGF0YXNldHNbY29uZmlnLmRhdGFJZF0uY29sb3J9XG4gICAgICAgICAgICBsYXllclR5cGU9e2xheWVyLm5hbWV9XG4gICAgICAgICAgICBvblRvZ2dsZUVuYWJsZUNvbmZpZz17dGhpcy5fdG9nZ2xlRW5hYmxlQ29uZmlnfVxuICAgICAgICAgICAgb25Ub2dnbGVWaXNpYmlsaXR5PXt0aGlzLl90b2dnbGVWaXNpYmlsaXR5fVxuICAgICAgICAgICAgb25VcGRhdGVMYXllckxhYmVsPXt0aGlzLl91cGRhdGVMYXllckxhYmVsfVxuICAgICAgICAgICAgb25SZW1vdmVMYXllcj17dGhpcy5fcmVtb3ZlTGF5ZXJ9XG4gICAgICAgICAgLz5cbiAgICAgICAgICB7aXNDb25maWdBY3RpdmUgJiYgKFxuICAgICAgICAgICAgPExheWVyQ29uZmlndXJhdG9yXG4gICAgICAgICAgICAgIGxheWVyPXtsYXllcn1cbiAgICAgICAgICAgICAgZGF0YXNldHM9e2RhdGFzZXRzfVxuICAgICAgICAgICAgICBsYXllclR5cGVPcHRpb25zPXtsYXllclR5cGVPcHRpb25zfVxuICAgICAgICAgICAgICBvcGVuTW9kYWw9e3RoaXMucHJvcHMub3Blbk1vZGFsfVxuICAgICAgICAgICAgICB1cGRhdGVMYXllckNvbmZpZz17dGhpcy51cGRhdGVMYXllckNvbmZpZ31cbiAgICAgICAgICAgICAgdXBkYXRlTGF5ZXJWaXN1YWxDaGFubmVsQ29uZmlnPXt0aGlzLnVwZGF0ZUxheWVyVmlzdWFsQ2hhbm5lbENvbmZpZ31cbiAgICAgICAgICAgICAgdXBkYXRlTGF5ZXJUeXBlPXt0aGlzLnVwZGF0ZUxheWVyVHlwZX1cbiAgICAgICAgICAgICAgdXBkYXRlTGF5ZXJWaXNDb25maWc9e3RoaXMudXBkYXRlTGF5ZXJWaXNDb25maWd9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvUGFuZWxXcmFwcGVyPlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gTGF5ZXJQYW5lbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF5ZXJQYW5lbEZhY3Rvcnk7XG4iXX0=