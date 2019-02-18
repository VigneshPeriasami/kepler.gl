"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = require("../../common/styled-components");

var _colorSelector = _interopRequireDefault(require("./color-selector"));

var _fieldSelector = _interopRequireDefault(require("../../common/field-selector"));

var _itemSelector = _interopRequireDefault(require("../../common/item-selector/item-selector"));

var _layerConfigGroup = _interopRequireWildcard(require("./layer-config-group"));

var _rangeSlider = _interopRequireDefault(require("../../common/range-slider"));

var _layerFactory = require("../../../layers/layer-factory");

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
var LayerConfigurator =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(LayerConfigurator, _Component);

  function LayerConfigurator() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, LayerConfigurator);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(LayerConfigurator)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onAttributeChange", function (attribute) {
      var _this$props = _this.props,
          layerConfiguratorProps = _this$props.layerConfiguratorProps,
          textLabel = _this$props.textLabel;
      return function (v) {
        return layerConfiguratorProps.onChange({
          textLabel: (0, _objectSpread3.default)({}, textLabel, (0, _defineProperty2.default)({}, attribute, v))
        });
      };
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onChangeTextAnchor", function (anchor) {
      var _this$props2 = _this.props,
          layerConfiguratorProps = _this$props2.layerConfiguratorProps,
          textLabel = _this$props2.textLabel; // TODO: we can be smarter on determining the offset of the text

      layerConfiguratorProps.onChange({
        textLabel: (0, _objectSpread3.default)({}, textLabel, {
          anchor: anchor,
          offset: [anchor === 'start' ? 10 : anchor === 'end' ? -10 : 0, anchor === 'middle' ? 10 : 0]
        })
      });
    });
    return _this;
  }

  (0, _createClass2.default)(LayerConfigurator, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          visConfiguratorProps = _this$props3.visConfiguratorProps,
          textLabel = _this$props3.textLabel;
      return _react.default.createElement(_layerConfigGroup.default, {
        label: 'label',
        collapsible: true
      }, _react.default.createElement(_styledComponents.SidePanelSection, null, _react.default.createElement(_fieldSelector.default, {
        fields: visConfiguratorProps.fields,
        value: textLabel.field && textLabel.field.name || 'select a field',
        placeholder: 'empty',
        onSelect: this.onAttributeChange('field'),
        erasable: true
      })), _react.default.createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react.default.createElement(_styledComponents.SidePanelSection, null, _react.default.createElement(_styledComponents.PanelLabel, null, "Font size"), _react.default.createElement(_rangeSlider.default, (0, _extends2.default)({}, _layerFactory.LAYER_TEXT_CONFIGS.fontSize, {
        value1: textLabel.size,
        onChange: function onChange(v) {
          return _this2.onAttributeChange('size')(v[1]);
        }
      }))), _react.default.createElement(_styledComponents.SidePanelSection, null, _react.default.createElement(_styledComponents.PanelLabel, null, "Font color"), _react.default.createElement(_colorSelector.default, {
        colorSets: [{
          selectedColor: textLabel.color,
          setColor: this.onAttributeChange('color')
        }]
      })), _react.default.createElement(_styledComponents.SidePanelSection, null, _react.default.createElement(_styledComponents.PanelLabel, null, "Text anchor"), _react.default.createElement(_itemSelector.default, (0, _extends2.default)({}, _layerFactory.LAYER_TEXT_CONFIGS.textAnchor, {
        selectedItems: textLabel.anchor,
        onChange: this.onChangeTextAnchor
      })))));
    }
  }]);
  return LayerConfigurator;
}(_react.Component);

exports.default = LayerConfigurator;
(0, _defineProperty2.default)(LayerConfigurator, "propTypes", {
  layerConfiguratorProps: _propTypes.default.object.isRequired,
  textLabel: _propTypes.default.object.isRequired,
  visConfiguratorProps: _propTypes.default.object.isRequired
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItcGFuZWwvdGV4dC1sYWJlbC1wYW5lbC5qcyJdLCJuYW1lcyI6WyJMYXllckNvbmZpZ3VyYXRvciIsImF0dHJpYnV0ZSIsInByb3BzIiwibGF5ZXJDb25maWd1cmF0b3JQcm9wcyIsInRleHRMYWJlbCIsInYiLCJvbkNoYW5nZSIsImFuY2hvciIsIm9mZnNldCIsInZpc0NvbmZpZ3VyYXRvclByb3BzIiwiZmllbGRzIiwiZmllbGQiLCJuYW1lIiwib25BdHRyaWJ1dGVDaGFuZ2UiLCJMQVlFUl9URVhUX0NPTkZJR1MiLCJmb250U2l6ZSIsInNpemUiLCJzZWxlY3RlZENvbG9yIiwiY29sb3IiLCJzZXRDb2xvciIsInRleHRBbmNob3IiLCJvbkNoYW5nZVRleHRBbmNob3IiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJpc1JlcXVpcmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUE5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7SUFjcUJBLGlCOzs7Ozs7Ozs7Ozs7Ozs7OzswSUFPQyxVQUFBQyxTQUFTLEVBQUk7QUFBQSx3QkFDYSxNQUFLQyxLQURsQjtBQUFBLFVBQ3hCQyxzQkFEd0IsZUFDeEJBLHNCQUR3QjtBQUFBLFVBQ0FDLFNBREEsZUFDQUEsU0FEQTtBQUUvQixhQUFPLFVBQUFDLENBQUM7QUFBQSxlQUFJRixzQkFBc0IsQ0FBQ0csUUFBdkIsQ0FBZ0M7QUFDMUNGLFVBQUFBLFNBQVMsa0NBQ0pBLFNBREksb0NBRU5ILFNBRk0sRUFFTUksQ0FGTjtBQURpQyxTQUFoQyxDQUFKO0FBQUEsT0FBUjtBQU1ELEs7MklBRW9CLFVBQUFFLE1BQU0sRUFBSTtBQUFBLHlCQUNlLE1BQUtMLEtBRHBCO0FBQUEsVUFDdEJDLHNCQURzQixnQkFDdEJBLHNCQURzQjtBQUFBLFVBQ0VDLFNBREYsZ0JBQ0VBLFNBREYsRUFFN0I7O0FBQ0FELE1BQUFBLHNCQUFzQixDQUFDRyxRQUF2QixDQUFnQztBQUM5QkYsUUFBQUEsU0FBUyxrQ0FDSkEsU0FESTtBQUVQRyxVQUFBQSxNQUFNLEVBQU5BLE1BRk87QUFHUEMsVUFBQUEsTUFBTSxFQUFFLENBQ05ELE1BQU0sS0FBSyxPQUFYLEdBQXFCLEVBQXJCLEdBQTBCQSxNQUFNLEtBQUssS0FBWCxHQUFtQixDQUFDLEVBQXBCLEdBQXlCLENBRDdDLEVBRU5BLE1BQU0sS0FBSyxRQUFYLEdBQXNCLEVBQXRCLEdBQTJCLENBRnJCO0FBSEQ7QUFEcUIsT0FBaEM7QUFVRCxLOzs7Ozs7NkJBRVE7QUFBQTs7QUFBQSx5QkFJSCxLQUFLTCxLQUpGO0FBQUEsVUFFTE8sb0JBRkssZ0JBRUxBLG9CQUZLO0FBQUEsVUFHTEwsU0FISyxnQkFHTEEsU0FISztBQUtQLGFBQ0UsNkJBQUMseUJBQUQ7QUFBa0IsUUFBQSxLQUFLLEVBQUUsT0FBekI7QUFBa0MsUUFBQSxXQUFXO0FBQTdDLFNBQ0ksNkJBQUMsa0NBQUQsUUFDRSw2QkFBQyxzQkFBRDtBQUNFLFFBQUEsTUFBTSxFQUFFSyxvQkFBb0IsQ0FBQ0MsTUFEL0I7QUFFRSxRQUFBLEtBQUssRUFBRU4sU0FBUyxDQUFDTyxLQUFWLElBQW1CUCxTQUFTLENBQUNPLEtBQVYsQ0FBZ0JDLElBQW5DLElBQTJDLGdCQUZwRDtBQUdFLFFBQUEsV0FBVyxFQUFFLE9BSGY7QUFJRSxRQUFBLFFBQVEsRUFBRSxLQUFLQyxpQkFBTCxDQUF1QixPQUF2QixDQUpaO0FBS0UsUUFBQSxRQUFRO0FBTFYsUUFERixDQURKLEVBVUksNkJBQUMsK0NBQUQsUUFDRSw2QkFBQyxrQ0FBRCxRQUNFLDZCQUFDLDRCQUFELG9CQURGLEVBRUUsNkJBQUMsb0JBQUQsNkJBQ01DLGlDQUFtQkMsUUFEekI7QUFFRSxRQUFBLE1BQU0sRUFBRVgsU0FBUyxDQUFDWSxJQUZwQjtBQUdFLFFBQUEsUUFBUSxFQUFFLGtCQUFBWCxDQUFDO0FBQUEsaUJBQUksTUFBSSxDQUFDUSxpQkFBTCxDQUF1QixNQUF2QixFQUErQlIsQ0FBQyxDQUFDLENBQUQsQ0FBaEMsQ0FBSjtBQUFBO0FBSGIsU0FGRixDQURGLEVBU0UsNkJBQUMsa0NBQUQsUUFDQSw2QkFBQyw0QkFBRCxxQkFEQSxFQUVFLDZCQUFDLHNCQUFEO0FBQ0UsUUFBQSxTQUFTLEVBQUUsQ0FDVDtBQUNFWSxVQUFBQSxhQUFhLEVBQUViLFNBQVMsQ0FBQ2MsS0FEM0I7QUFFRUMsVUFBQUEsUUFBUSxFQUFFLEtBQUtOLGlCQUFMLENBQXVCLE9BQXZCO0FBRlosU0FEUztBQURiLFFBRkYsQ0FURixFQW9CRSw2QkFBQyxrQ0FBRCxRQUNFLDZCQUFDLDRCQUFELHNCQURGLEVBRUUsNkJBQUMscUJBQUQsNkJBQ01DLGlDQUFtQk0sVUFEekI7QUFFRSxRQUFBLGFBQWEsRUFBRWhCLFNBQVMsQ0FBQ0csTUFGM0I7QUFHRSxRQUFBLFFBQVEsRUFBRSxLQUFLYztBQUhqQixTQUZGLENBcEJGLENBVkosQ0FERjtBQTBDRDs7O0VBL0U0Q0MsZ0I7Ozs4QkFBMUJ0QixpQixlQUNBO0FBQ2pCRyxFQUFBQSxzQkFBc0IsRUFBRW9CLG1CQUFVQyxNQUFWLENBQWlCQyxVQUR4QjtBQUVqQnJCLEVBQUFBLFNBQVMsRUFBRW1CLG1CQUFVQyxNQUFWLENBQWlCQyxVQUZYO0FBR2pCaEIsRUFBQUEsb0JBQW9CLEVBQUVjLG1CQUFVQyxNQUFWLENBQWlCQztBQUh0QixDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQge1BhbmVsTGFiZWwsIFNpZGVQYW5lbFNlY3Rpb259IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBDb2xvclNlbGVjdG9yIGZyb20gJy4vY29sb3Itc2VsZWN0b3InO1xuaW1wb3J0IEZpZWxkU2VsZWN0b3IgZnJvbSAnY29tcG9uZW50cy9jb21tb24vZmllbGQtc2VsZWN0b3InO1xuaW1wb3J0IEl0ZW1TZWxlY3RvciBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9pdGVtLXNlbGVjdG9yL2l0ZW0tc2VsZWN0b3InO1xuaW1wb3J0IExheWVyQ29uZmlnR3JvdXAsIHtDb25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudH0gZnJvbSAnLi9sYXllci1jb25maWctZ3JvdXAnO1xuaW1wb3J0IFJhbmdlU2xpZGVyIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3JhbmdlLXNsaWRlcic7XG5cbmltcG9ydCB7TEFZRVJfVEVYVF9DT05GSUdTfSBmcm9tICdsYXllcnMvbGF5ZXItZmFjdG9yeSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExheWVyQ29uZmlndXJhdG9yIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBsYXllckNvbmZpZ3VyYXRvclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgdGV4dExhYmVsOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgdmlzQ29uZmlndXJhdG9yUHJvcHM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxuICB9O1xuXG4gIG9uQXR0cmlidXRlQ2hhbmdlID0gYXR0cmlidXRlID0+IHtcbiAgICBjb25zdCB7bGF5ZXJDb25maWd1cmF0b3JQcm9wcywgdGV4dExhYmVsfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIHYgPT4gbGF5ZXJDb25maWd1cmF0b3JQcm9wcy5vbkNoYW5nZSh7XG4gICAgICB0ZXh0TGFiZWw6IHtcbiAgICAgICAgLi4udGV4dExhYmVsLFxuICAgICAgICBbYXR0cmlidXRlXTogdlxuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIG9uQ2hhbmdlVGV4dEFuY2hvciA9IGFuY2hvciA9PiB7XG4gICAgY29uc3Qge2xheWVyQ29uZmlndXJhdG9yUHJvcHMsIHRleHRMYWJlbH0gPSB0aGlzLnByb3BzO1xuICAgIC8vIFRPRE86IHdlIGNhbiBiZSBzbWFydGVyIG9uIGRldGVybWluaW5nIHRoZSBvZmZzZXQgb2YgdGhlIHRleHRcbiAgICBsYXllckNvbmZpZ3VyYXRvclByb3BzLm9uQ2hhbmdlKHtcbiAgICAgIHRleHRMYWJlbDoge1xuICAgICAgICAuLi50ZXh0TGFiZWwsXG4gICAgICAgIGFuY2hvcixcbiAgICAgICAgb2Zmc2V0OiBbXG4gICAgICAgICAgYW5jaG9yID09PSAnc3RhcnQnID8gMTAgOiBhbmNob3IgPT09ICdlbmQnID8gLTEwIDogMCxcbiAgICAgICAgICBhbmNob3IgPT09ICdtaWRkbGUnID8gMTAgOiAwXG4gICAgICAgIF1cbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgdmlzQ29uZmlndXJhdG9yUHJvcHMsXG4gICAgICB0ZXh0TGFiZWxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPExheWVyQ29uZmlnR3JvdXAgbGFiZWw9eydsYWJlbCd9IGNvbGxhcHNpYmxlPlxuICAgICAgICAgIDxTaWRlUGFuZWxTZWN0aW9uPlxuICAgICAgICAgICAgPEZpZWxkU2VsZWN0b3JcbiAgICAgICAgICAgICAgZmllbGRzPXt2aXNDb25maWd1cmF0b3JQcm9wcy5maWVsZHN9XG4gICAgICAgICAgICAgIHZhbHVlPXt0ZXh0TGFiZWwuZmllbGQgJiYgdGV4dExhYmVsLmZpZWxkLm5hbWUgfHwgJ3NlbGVjdCBhIGZpZWxkJ31cbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9eydlbXB0eSd9XG4gICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLm9uQXR0cmlidXRlQ2hhbmdlKCdmaWVsZCcpfVxuICAgICAgICAgICAgICBlcmFzYWJsZVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L1NpZGVQYW5lbFNlY3Rpb24+XG4gICAgICAgICAgPENvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgPFNpZGVQYW5lbFNlY3Rpb24+XG4gICAgICAgICAgICAgIDxQYW5lbExhYmVsPntgRm9udCBzaXplYH08L1BhbmVsTGFiZWw+XG4gICAgICAgICAgICAgIDxSYW5nZVNsaWRlclxuICAgICAgICAgICAgICAgIHsuLi5MQVlFUl9URVhUX0NPTkZJR1MuZm9udFNpemV9XG4gICAgICAgICAgICAgICAgdmFsdWUxPXt0ZXh0TGFiZWwuc2l6ZX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17diA9PiB0aGlzLm9uQXR0cmlidXRlQ2hhbmdlKCdzaXplJykodlsxXSl9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L1NpZGVQYW5lbFNlY3Rpb24+XG4gICAgICAgICAgICA8U2lkZVBhbmVsU2VjdGlvbj5cbiAgICAgICAgICAgIDxQYW5lbExhYmVsPntgRm9udCBjb2xvcmB9PC9QYW5lbExhYmVsPlxuICAgICAgICAgICAgICA8Q29sb3JTZWxlY3RvclxuICAgICAgICAgICAgICAgIGNvbG9yU2V0cz17W1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZENvbG9yOiB0ZXh0TGFiZWwuY29sb3IsXG4gICAgICAgICAgICAgICAgICAgIHNldENvbG9yOiB0aGlzLm9uQXR0cmlidXRlQ2hhbmdlKCdjb2xvcicpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvU2lkZVBhbmVsU2VjdGlvbj5cbiAgICAgICAgICAgIDxTaWRlUGFuZWxTZWN0aW9uPlxuICAgICAgICAgICAgICA8UGFuZWxMYWJlbD57YFRleHQgYW5jaG9yYH08L1BhbmVsTGFiZWw+XG4gICAgICAgICAgICAgIDxJdGVtU2VsZWN0b3JcbiAgICAgICAgICAgICAgICB7Li4uTEFZRVJfVEVYVF9DT05GSUdTLnRleHRBbmNob3J9XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcz17dGV4dExhYmVsLmFuY2hvcn1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZVRleHRBbmNob3J9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L1NpZGVQYW5lbFNlY3Rpb24+XG4gICAgICAgICAgPC9Db25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cbiAgICApO1xuICB9XG59XG4iXX0=