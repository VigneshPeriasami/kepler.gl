"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread4 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _panelHeaderAction = _interopRequireDefault(require("../panel-header-action"));

var _icons = require("../../common/icons");

var _styledComponents2 = require("../../common/styled-components");

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin-bottom: 10px;\n  display: flex;\n  justify-content: space-between;\n\n  &:last-child {\n    margin-bottom: 0;\n  }\n\n  .layer-group__visibility-toggle {\n    margin-right: 12px;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  padding-bottom: 12px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var StyledInteractionPanel = _styledComponents.default.div(_templateObject());

var StyledLayerGroupItem = _styledComponents.default.div(_templateObject2());

var LayerLabel = _styledComponents2.PanelLabelBold.extend(_templateObject3(), function (props) {
  return props.active ? props.theme.textColor : props.theme.labelColor;
});

function LayerGroupSelectorFactory() {
  var LayerGroupSelector = function LayerGroupSelector(_ref) {
    var layers = _ref.layers,
        editableLayers = _ref.editableLayers,
        onChange = _ref.onChange,
        topLayers = _ref.topLayers;
    return _react.default.createElement(StyledInteractionPanel, {
      className: "map-style__layer-group__selector"
    }, _react.default.createElement("div", {
      className: "layer-group__header"
    }, _react.default.createElement(_styledComponents2.PanelLabel, null, "Map Layers")), _react.default.createElement(_styledComponents2.PanelContent, {
      className: "map-style__layer-group"
    }, editableLayers.map(function (slug) {
      return _react.default.createElement(StyledLayerGroupItem, {
        className: "layer-group__select",
        key: slug
      }, _react.default.createElement(_styledComponents2.PanelLabelWrapper, null, _react.default.createElement(_panelHeaderAction.default, {
        className: "layer-group__visibility-toggle",
        id: "".concat(slug, "-toggle"),
        tooltip: layers[slug] ? 'hide' : 'show',
        onClick: function onClick() {
          return onChange({
            visibleLayerGroups: (0, _objectSpread4.default)({}, layers, (0, _defineProperty2.default)({}, slug, !layers[slug]))
          });
        },
        IconComponent: layers[slug] ? _icons.EyeSeen : _icons.EyeUnseen,
        active: layers[slug],
        flush: true
      }), _react.default.createElement(LayerLabel, {
        active: layers[slug]
      }, slug)), _react.default.createElement(_styledComponents2.CenterFlexbox, {
        className: "layer-group__bring-top"
      }, _react.default.createElement(_panelHeaderAction.default, {
        id: "".concat(slug, "-top"),
        tooltip: "Move to top of data layers",
        disabled: !layers[slug],
        IconComponent: _icons.Upload,
        active: topLayers[slug],
        onClick: function onClick() {
          return onChange({
            topLayerGroups: (0, _objectSpread4.default)({}, topLayers, (0, _defineProperty2.default)({}, slug, !topLayers[slug]))
          });
        }
      })));
    })));
  };

  return LayerGroupSelector;
}

var _default = LayerGroupSelectorFactory;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbWFwLXN0eWxlLXBhbmVsL21hcC1sYXllci1zZWxlY3Rvci5qcyJdLCJuYW1lcyI6WyJTdHlsZWRJbnRlcmFjdGlvblBhbmVsIiwic3R5bGVkIiwiZGl2IiwiU3R5bGVkTGF5ZXJHcm91cEl0ZW0iLCJMYXllckxhYmVsIiwiUGFuZWxMYWJlbEJvbGQiLCJleHRlbmQiLCJwcm9wcyIsImFjdGl2ZSIsInRoZW1lIiwidGV4dENvbG9yIiwibGFiZWxDb2xvciIsIkxheWVyR3JvdXBTZWxlY3RvckZhY3RvcnkiLCJMYXllckdyb3VwU2VsZWN0b3IiLCJsYXllcnMiLCJlZGl0YWJsZUxheWVycyIsIm9uQ2hhbmdlIiwidG9wTGF5ZXJzIiwibWFwIiwic2x1ZyIsInZpc2libGVMYXllckdyb3VwcyIsIkV5ZVNlZW4iLCJFeWVVbnNlZW4iLCJVcGxvYWQiLCJ0b3BMYXllckdyb3VwcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVFBLElBQU1BLHNCQUFzQixHQUFHQywwQkFBT0MsR0FBVixtQkFBNUI7O0FBSUEsSUFBTUMsb0JBQW9CLEdBQUdGLDBCQUFPQyxHQUFWLG9CQUExQjs7QUFjQSxJQUFNRSxVQUFVLEdBQUdDLGtDQUFlQyxNQUFsQixxQkFDTCxVQUFBQyxLQUFLO0FBQUEsU0FDWkEsS0FBSyxDQUFDQyxNQUFOLEdBQWVELEtBQUssQ0FBQ0UsS0FBTixDQUFZQyxTQUEzQixHQUF1Q0gsS0FBSyxDQUFDRSxLQUFOLENBQVlFLFVBRHZDO0FBQUEsQ0FEQSxDQUFoQjs7QUFLQSxTQUFTQyx5QkFBVCxHQUFxQztBQUNuQyxNQUFNQyxrQkFBa0IsR0FBRyxTQUFyQkEsa0JBQXFCO0FBQUEsUUFBRUMsTUFBRixRQUFFQSxNQUFGO0FBQUEsUUFBVUMsY0FBVixRQUFVQSxjQUFWO0FBQUEsUUFBMEJDLFFBQTFCLFFBQTBCQSxRQUExQjtBQUFBLFFBQW9DQyxTQUFwQyxRQUFvQ0EsU0FBcEM7QUFBQSxXQUN6Qiw2QkFBQyxzQkFBRDtBQUF3QixNQUFBLFNBQVMsRUFBQztBQUFsQyxPQUNFO0FBQUssTUFBQSxTQUFTLEVBQUM7QUFBZixPQUNFLDZCQUFDLDZCQUFELHFCQURGLENBREYsRUFJRSw2QkFBQywrQkFBRDtBQUFjLE1BQUEsU0FBUyxFQUFDO0FBQXhCLE9BQ0dGLGNBQWMsQ0FBQ0csR0FBZixDQUFtQixVQUFBQyxJQUFJO0FBQUEsYUFDdEIsNkJBQUMsb0JBQUQ7QUFBc0IsUUFBQSxTQUFTLEVBQUMscUJBQWhDO0FBQXNELFFBQUEsR0FBRyxFQUFFQTtBQUEzRCxTQUNFLDZCQUFDLG9DQUFELFFBQ0UsNkJBQUMsMEJBQUQ7QUFDRSxRQUFBLFNBQVMsRUFBQyxnQ0FEWjtBQUVFLFFBQUEsRUFBRSxZQUFLQSxJQUFMLFlBRko7QUFHRSxRQUFBLE9BQU8sRUFBRUwsTUFBTSxDQUFDSyxJQUFELENBQU4sR0FBZSxNQUFmLEdBQXdCLE1BSG5DO0FBSUUsUUFBQSxPQUFPLEVBQUU7QUFBQSxpQkFDUEgsUUFBUSxDQUFDO0FBQ1BJLFlBQUFBLGtCQUFrQixrQ0FDYk4sTUFEYSxvQ0FFZkssSUFGZSxFQUVSLENBQUNMLE1BQU0sQ0FBQ0ssSUFBRCxDQUZDO0FBRFgsV0FBRCxDQUREO0FBQUEsU0FKWDtBQVlFLFFBQUEsYUFBYSxFQUFFTCxNQUFNLENBQUNLLElBQUQsQ0FBTixHQUFlRSxjQUFmLEdBQXlCQyxnQkFaMUM7QUFhRSxRQUFBLE1BQU0sRUFBRVIsTUFBTSxDQUFDSyxJQUFELENBYmhCO0FBY0UsUUFBQSxLQUFLO0FBZFAsUUFERixFQWlCRSw2QkFBQyxVQUFEO0FBQVksUUFBQSxNQUFNLEVBQUVMLE1BQU0sQ0FBQ0ssSUFBRDtBQUExQixTQUFtQ0EsSUFBbkMsQ0FqQkYsQ0FERixFQW9CRSw2QkFBQyxnQ0FBRDtBQUFlLFFBQUEsU0FBUyxFQUFDO0FBQXpCLFNBQ0UsNkJBQUMsMEJBQUQ7QUFDRSxRQUFBLEVBQUUsWUFBS0EsSUFBTCxTQURKO0FBRUUsUUFBQSxPQUFPLEVBQUMsNEJBRlY7QUFHRSxRQUFBLFFBQVEsRUFBRSxDQUFDTCxNQUFNLENBQUNLLElBQUQsQ0FIbkI7QUFJRSxRQUFBLGFBQWEsRUFBRUksYUFKakI7QUFLRSxRQUFBLE1BQU0sRUFBRU4sU0FBUyxDQUFDRSxJQUFELENBTG5CO0FBTUUsUUFBQSxPQUFPLEVBQUU7QUFBQSxpQkFDUEgsUUFBUSxDQUFDO0FBQ1BRLFlBQUFBLGNBQWMsa0NBQ1RQLFNBRFMsb0NBRVhFLElBRlcsRUFFSixDQUFDRixTQUFTLENBQUNFLElBQUQsQ0FGTjtBQURQLFdBQUQsQ0FERDtBQUFBO0FBTlgsUUFERixDQXBCRixDQURzQjtBQUFBLEtBQXZCLENBREgsQ0FKRixDQUR5QjtBQUFBLEdBQTNCOztBQWtEQSxTQUFPTixrQkFBUDtBQUNEOztlQUVjRCx5QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBQYW5lbEhlYWRlckFjdGlvbiBmcm9tICdjb21wb25lbnRzL3NpZGUtcGFuZWwvcGFuZWwtaGVhZGVyLWFjdGlvbic7XG5pbXBvcnQge0V5ZVNlZW4sIEV5ZVVuc2VlbiwgVXBsb2FkfSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9pY29ucyc7XG5cbmltcG9ydCB7XG4gIFBhbmVsTGFiZWwsXG4gIFBhbmVsQ29udGVudCxcbiAgUGFuZWxMYWJlbEJvbGQsXG4gIFBhbmVsTGFiZWxXcmFwcGVyLFxuICBDZW50ZXJGbGV4Ym94XG59IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcblxuY29uc3QgU3R5bGVkSW50ZXJhY3Rpb25QYW5lbCA9IHN0eWxlZC5kaXZgXG4gIHBhZGRpbmctYm90dG9tOiAxMnB4O1xuYDtcblxuY29uc3QgU3R5bGVkTGF5ZXJHcm91cEl0ZW0gPSBzdHlsZWQuZGl2YFxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG5cbiAgJjpsYXN0LWNoaWxkIHtcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xuICB9XG5cbiAgLmxheWVyLWdyb3VwX192aXNpYmlsaXR5LXRvZ2dsZSB7XG4gICAgbWFyZ2luLXJpZ2h0OiAxMnB4O1xuICB9XG5gO1xuXG5jb25zdCBMYXllckxhYmVsID0gUGFuZWxMYWJlbEJvbGQuZXh0ZW5kYFxuICBjb2xvcjogJHtwcm9wcyA9PlxuICAgIHByb3BzLmFjdGl2ZSA/IHByb3BzLnRoZW1lLnRleHRDb2xvciA6IHByb3BzLnRoZW1lLmxhYmVsQ29sb3J9O1xuYDtcblxuZnVuY3Rpb24gTGF5ZXJHcm91cFNlbGVjdG9yRmFjdG9yeSgpIHtcbiAgY29uc3QgTGF5ZXJHcm91cFNlbGVjdG9yID0gKHtsYXllcnMsIGVkaXRhYmxlTGF5ZXJzLCBvbkNoYW5nZSwgdG9wTGF5ZXJzfSkgPT4gKFxuICAgIDxTdHlsZWRJbnRlcmFjdGlvblBhbmVsIGNsYXNzTmFtZT1cIm1hcC1zdHlsZV9fbGF5ZXItZ3JvdXBfX3NlbGVjdG9yXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImxheWVyLWdyb3VwX19oZWFkZXJcIj5cbiAgICAgICAgPFBhbmVsTGFiZWw+TWFwIExheWVyczwvUGFuZWxMYWJlbD5cbiAgICAgIDwvZGl2PlxuICAgICAgPFBhbmVsQ29udGVudCBjbGFzc05hbWU9XCJtYXAtc3R5bGVfX2xheWVyLWdyb3VwXCI+XG4gICAgICAgIHtlZGl0YWJsZUxheWVycy5tYXAoc2x1ZyA9PiAoXG4gICAgICAgICAgPFN0eWxlZExheWVyR3JvdXBJdGVtIGNsYXNzTmFtZT1cImxheWVyLWdyb3VwX19zZWxlY3RcIiBrZXk9e3NsdWd9PlxuICAgICAgICAgICAgPFBhbmVsTGFiZWxXcmFwcGVyPlxuICAgICAgICAgICAgICA8UGFuZWxIZWFkZXJBY3Rpb25cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJsYXllci1ncm91cF9fdmlzaWJpbGl0eS10b2dnbGVcIlxuICAgICAgICAgICAgICAgIGlkPXtgJHtzbHVnfS10b2dnbGVgfVxuICAgICAgICAgICAgICAgIHRvb2x0aXA9e2xheWVyc1tzbHVnXSA/ICdoaWRlJyA6ICdzaG93J31cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2Uoe1xuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlTGF5ZXJHcm91cHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAuLi5sYXllcnMsXG4gICAgICAgICAgICAgICAgICAgICAgW3NsdWddOiAhbGF5ZXJzW3NsdWddXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIEljb25Db21wb25lbnQ9e2xheWVyc1tzbHVnXSA/IEV5ZVNlZW4gOiBFeWVVbnNlZW59XG4gICAgICAgICAgICAgICAgYWN0aXZlPXtsYXllcnNbc2x1Z119XG4gICAgICAgICAgICAgICAgZmx1c2hcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPExheWVyTGFiZWwgYWN0aXZlPXtsYXllcnNbc2x1Z119PntzbHVnfTwvTGF5ZXJMYWJlbD5cbiAgICAgICAgICAgIDwvUGFuZWxMYWJlbFdyYXBwZXI+XG4gICAgICAgICAgICA8Q2VudGVyRmxleGJveCBjbGFzc05hbWU9XCJsYXllci1ncm91cF9fYnJpbmctdG9wXCI+XG4gICAgICAgICAgICAgIDxQYW5lbEhlYWRlckFjdGlvblxuICAgICAgICAgICAgICAgIGlkPXtgJHtzbHVnfS10b3BgfVxuICAgICAgICAgICAgICAgIHRvb2x0aXA9XCJNb3ZlIHRvIHRvcCBvZiBkYXRhIGxheWVyc1wiXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFsYXllcnNbc2x1Z119XG4gICAgICAgICAgICAgICAgSWNvbkNvbXBvbmVudD17VXBsb2FkfVxuICAgICAgICAgICAgICAgIGFjdGl2ZT17dG9wTGF5ZXJzW3NsdWddfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZSh7XG4gICAgICAgICAgICAgICAgICAgIHRvcExheWVyR3JvdXBzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgLi4udG9wTGF5ZXJzLFxuICAgICAgICAgICAgICAgICAgICAgIFtzbHVnXTogIXRvcExheWVyc1tzbHVnXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvQ2VudGVyRmxleGJveD5cbiAgICAgICAgICA8L1N0eWxlZExheWVyR3JvdXBJdGVtPlxuICAgICAgICApKX1cbiAgICAgIDwvUGFuZWxDb250ZW50PlxuICAgIDwvU3R5bGVkSW50ZXJhY3Rpb25QYW5lbD5cbiAgKTtcblxuICByZXR1cm4gTGF5ZXJHcm91cFNlbGVjdG9yO1xufVxuXG5leHBvcnQgZGVmYXVsdCBMYXllckdyb3VwU2VsZWN0b3JGYWN0b3J5O1xuIl19