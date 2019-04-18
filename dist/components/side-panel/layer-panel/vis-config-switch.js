"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _infoHelper = _interopRequireDefault(require("../../common/info-helper"));

var _switch = _interopRequireDefault(require("../../common/switch"));

var _styledComponents2 = require("../../common/styled-components");

var _utils = require("../../../utils/utils");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  justify-content: space-between;\n  \n  .vis-config-switch__title {\n    display: flex;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var propTypes = {
  layer: _propTypes.default.object.isRequired,
  property: _propTypes.default.string.isRequired,
  onChange: _propTypes.default.func.isRequired,
  label: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.bool, _propTypes.default.func]),
  description: _propTypes.default.string,
  disabled: _propTypes.default.bool
};

var StyledVisConfigSwitch = _styledComponents.default.div(_templateObject());

var VisConfigSwitch = function VisConfigSwitch(_ref) {
  var _ref$layer = _ref.layer,
      id = _ref$layer.id,
      config = _ref$layer.config,
      property = _ref.property,
      _onChange2 = _ref.onChange,
      label = _ref.label,
      description = _ref.description,
      disabled = _ref.disabled;
  return _react.default.createElement(_styledComponents2.SidePanelSection, {
    disabled: Boolean(disabled)
  }, _react.default.createElement(StyledVisConfigSwitch, {
    className: "vis-config-switch"
  }, _react.default.createElement("div", {
    className: "vis-config-switch__title"
  }, label ? _react.default.createElement(_styledComponents2.PanelLabel, null, label || (0, _utils.capitalizeFirstLetter)(property)) : null, description ? _react.default.createElement("div", null, _react.default.createElement(_infoHelper.default, {
    description: description,
    id: "".concat(id, "-").concat(property)
  })) : null), _react.default.createElement("div", {
    className: "vis-config-switch__switch"
  }, _react.default.createElement(_switch.default, {
    checked: config.visConfig[property],
    id: "".concat(id, "-").concat(property),
    onChange: function onChange() {
      return _onChange2((0, _defineProperty2.default)({}, property, !config.visConfig[property]));
    }
  }))));
};

VisConfigSwitch.propTypes = propTypes;
var _default = VisConfigSwitch;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItcGFuZWwvdmlzLWNvbmZpZy1zd2l0Y2guanMiXSwibmFtZXMiOlsicHJvcFR5cGVzIiwibGF5ZXIiLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJpc1JlcXVpcmVkIiwicHJvcGVydHkiLCJzdHJpbmciLCJvbkNoYW5nZSIsImZ1bmMiLCJsYWJlbCIsIm9uZU9mVHlwZSIsImJvb2wiLCJkZXNjcmlwdGlvbiIsImRpc2FibGVkIiwiU3R5bGVkVmlzQ29uZmlnU3dpdGNoIiwic3R5bGVkIiwiZGl2IiwiVmlzQ29uZmlnU3dpdGNoIiwiaWQiLCJjb25maWciLCJCb29sZWFuIiwidmlzQ29uZmlnIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFTLEdBQUc7QUFDaEJDLEVBQUFBLEtBQUssRUFBRUMsbUJBQVVDLE1BQVYsQ0FBaUJDLFVBRFI7QUFFaEJDLEVBQUFBLFFBQVEsRUFBRUgsbUJBQVVJLE1BQVYsQ0FBaUJGLFVBRlg7QUFHaEJHLEVBQUFBLFFBQVEsRUFBRUwsbUJBQVVNLElBQVYsQ0FBZUosVUFIVDtBQUloQkssRUFBQUEsS0FBSyxFQUFFUCxtQkFBVVEsU0FBVixDQUFvQixDQUN6QlIsbUJBQVVJLE1BRGUsRUFFekJKLG1CQUFVUyxJQUZlLEVBR3pCVCxtQkFBVU0sSUFIZSxDQUFwQixDQUpTO0FBU2hCSSxFQUFBQSxXQUFXLEVBQUVWLG1CQUFVSSxNQVRQO0FBVWhCTyxFQUFBQSxRQUFRLEVBQUVYLG1CQUFVUztBQVZKLENBQWxCOztBQWFBLElBQU1HLHFCQUFxQixHQUFHQywwQkFBT0MsR0FBVixtQkFBM0I7O0FBU0EsSUFBTUMsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQjtBQUFBLHdCQUN0QmhCLEtBRHNCO0FBQUEsTUFDZGlCLEVBRGMsY0FDZEEsRUFEYztBQUFBLE1BQ1ZDLE1BRFUsY0FDVkEsTUFEVTtBQUFBLE1BRXRCZCxRQUZzQixRQUV0QkEsUUFGc0I7QUFBQSxNQUd0QkUsVUFIc0IsUUFHdEJBLFFBSHNCO0FBQUEsTUFJdEJFLEtBSnNCLFFBSXRCQSxLQUpzQjtBQUFBLE1BS3RCRyxXQUxzQixRQUt0QkEsV0FMc0I7QUFBQSxNQU10QkMsUUFOc0IsUUFNdEJBLFFBTnNCO0FBQUEsU0FRdEIsNkJBQUMsbUNBQUQ7QUFBa0IsSUFBQSxRQUFRLEVBQUVPLE9BQU8sQ0FBQ1AsUUFBRDtBQUFuQyxLQUNFLDZCQUFDLHFCQUFEO0FBQXVCLElBQUEsU0FBUyxFQUFDO0FBQWpDLEtBQ0U7QUFBSyxJQUFBLFNBQVMsRUFBQztBQUFmLEtBQ0dKLEtBQUssR0FBRyw2QkFBQyw2QkFBRCxRQUFhQSxLQUFLLElBQUksa0NBQXNCSixRQUF0QixDQUF0QixDQUFILEdBQXlFLElBRGpGLEVBRUdPLFdBQVcsR0FDViwwQ0FDRSw2QkFBQyxtQkFBRDtBQUFZLElBQUEsV0FBVyxFQUFFQSxXQUF6QjtBQUFzQyxJQUFBLEVBQUUsWUFBS00sRUFBTCxjQUFXYixRQUFYO0FBQXhDLElBREYsQ0FEVSxHQUlSLElBTk4sQ0FERixFQVNFO0FBQUssSUFBQSxTQUFTLEVBQUM7QUFBZixLQUNFLDZCQUFDLGVBQUQ7QUFDRSxJQUFBLE9BQU8sRUFBRWMsTUFBTSxDQUFDRSxTQUFQLENBQWlCaEIsUUFBakIsQ0FEWDtBQUVFLElBQUEsRUFBRSxZQUFLYSxFQUFMLGNBQVdiLFFBQVgsQ0FGSjtBQUdFLElBQUEsUUFBUSxFQUFFO0FBQUEsYUFBTUUsVUFBUSxtQ0FBR0YsUUFBSCxFQUFjLENBQUNjLE1BQU0sQ0FBQ0UsU0FBUCxDQUFpQmhCLFFBQWpCLENBQWYsRUFBZDtBQUFBO0FBSFosSUFERixDQVRGLENBREYsQ0FSc0I7QUFBQSxDQUF4Qjs7QUE2QkFZLGVBQWUsQ0FBQ2pCLFNBQWhCLEdBQTRCQSxTQUE1QjtlQUVlaUIsZSIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgSW5mb0hlbHBlciBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9pbmZvLWhlbHBlcic7XG5pbXBvcnQgU3dpdGNoIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N3aXRjaCc7XG5pbXBvcnQge1NpZGVQYW5lbFNlY3Rpb24sIFBhbmVsTGFiZWx9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7Y2FwaXRhbGl6ZUZpcnN0TGV0dGVyfSBmcm9tICd1dGlscy91dGlscyc7XG5cbmNvbnN0IHByb3BUeXBlcyA9IHtcbiAgbGF5ZXI6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgcHJvcGVydHk6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGxhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIFByb3BUeXBlcy5ib29sLFxuICAgIFByb3BUeXBlcy5mdW5jXG4gIF0pLFxuICBkZXNjcmlwdGlvbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sXG59O1xuXG5jb25zdCBTdHlsZWRWaXNDb25maWdTd2l0Y2ggPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIFxuICAudmlzLWNvbmZpZy1zd2l0Y2hfX3RpdGxlIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICB9XG5gO1xuXG5jb25zdCBWaXNDb25maWdTd2l0Y2ggPSAoe1xuICBsYXllcjoge2lkLCBjb25maWd9LFxuICBwcm9wZXJ0eSxcbiAgb25DaGFuZ2UsXG4gIGxhYmVsLFxuICBkZXNjcmlwdGlvbixcbiAgZGlzYWJsZWRcbn0pID0+IChcbiAgPFNpZGVQYW5lbFNlY3Rpb24gZGlzYWJsZWQ9e0Jvb2xlYW4oZGlzYWJsZWQpfT5cbiAgICA8U3R5bGVkVmlzQ29uZmlnU3dpdGNoIGNsYXNzTmFtZT1cInZpcy1jb25maWctc3dpdGNoXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInZpcy1jb25maWctc3dpdGNoX190aXRsZVwiPlxuICAgICAgICB7bGFiZWwgPyA8UGFuZWxMYWJlbD57bGFiZWwgfHwgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHByb3BlcnR5KX08L1BhbmVsTGFiZWw+IDogbnVsbH1cbiAgICAgICAge2Rlc2NyaXB0aW9uID8gKFxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8SW5mb0hlbHBlciBkZXNjcmlwdGlvbj17ZGVzY3JpcHRpb259IGlkPXtgJHtpZH0tJHtwcm9wZXJ0eX1gfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogbnVsbH1cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2aXMtY29uZmlnLXN3aXRjaF9fc3dpdGNoXCI+XG4gICAgICAgIDxTd2l0Y2hcbiAgICAgICAgICBjaGVja2VkPXtjb25maWcudmlzQ29uZmlnW3Byb3BlcnR5XX1cbiAgICAgICAgICBpZD17YCR7aWR9LSR7cHJvcGVydHl9YH1cbiAgICAgICAgICBvbkNoYW5nZT17KCkgPT4gb25DaGFuZ2Uoe1twcm9wZXJ0eV06ICFjb25maWcudmlzQ29uZmlnW3Byb3BlcnR5XX0pfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9TdHlsZWRWaXNDb25maWdTd2l0Y2g+XG4gIDwvU2lkZVBhbmVsU2VjdGlvbj5cbik7XG5cblZpc0NvbmZpZ1N3aXRjaC5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG5cbmV4cG9ydCBkZWZhdWx0IFZpc0NvbmZpZ1N3aXRjaDtcbiJdfQ==