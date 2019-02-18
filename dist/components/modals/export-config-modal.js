"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _switch = _interopRequireDefault(require("../common/switch"));

var _reactJsonPretty = _interopRequireDefault(require("react-json-pretty"));

var _styledComponents2 = require("../common/styled-components");

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  width: 100%;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n  margin: 35px 0;\n  width: 100%;\n  justify-content: space-between;\n\n  .description {\n    width: 185px;\n\n    .title {\n      font-weight: 500;\n      color: ", ";\n      font-size: 12px;\n    }\n    .subtitle {\n      color: ", ";\n      font-size: 11px;\n    }\n\n    .note {\n      color: ", ";\n      font-size: 11px;\n    }\n  }\n\n  .selection {\n    padding-left: 50px;\n    flex-grow: 1;\n\n    .viewer {\n      border: 1px solid ", ";\n      background-color: white;\n      border-radius: 2px;\n      display: inline-block;\n      font: inherit;\n      line-height: 1.5em;\n      padding: 0.5em 3.5em 0.5em 1em;\n      margin: 0;\n      box-sizing: border-box;\n      appearance: none;\n      height: 300px;\n      width: 100%;\n      overflow-y: scroll;\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var propTypes = {
  config: _propTypes.default.object.required
};

var StyledExportConfigSection = _styledComponents.default.div(_templateObject(), function (props) {
  return props.theme.textColorLT;
}, function (props) {
  return props.theme.textColor;
}, function (props) {
  return props.theme.errorColor;
}, function (props) {
  return props.theme.selectBorderColorLT;
});

var StyledModalContentInner = _styledComponents.default.div(_templateObject2());

var ExportConfigModal = function ExportConfigModal(_ref) {
  var data = _ref.data,
      config = _ref.config,
      onChangeExportData = _ref.onChangeExportData;
  return _react.default.createElement("div", {
    className: "export-config-modal"
  }, _react.default.createElement(_styledComponents2.StyledModalContent, null, _react.default.createElement(StyledModalContentInner, {
    className: "export-config-modal__inner"
  }, _react.default.createElement(StyledExportConfigSection, null, _react.default.createElement("div", {
    className: "description"
  }, _react.default.createElement("div", {
    className: "title"
  }, "Current Config"), _react.default.createElement("div", {
    className: "subtitle"
  }, "You can copy or export the current Kepler.gl configuration."), _react.default.createElement("div", {
    className: "note"
  }, "* kepler.gl map config is coupled with loaded datasets. dataId key is used to bind layers and filters to a specific dataset. If you try to upload a configuration with a specific dataId you also need to make sure you existing dataset id match the dataId/s in the config.")), _react.default.createElement("div", {
    className: "selection"
  }, _react.default.createElement("div", {
    className: "viewer"
  }, _react.default.createElement(_reactJsonPretty.default, {
    id: "json-pretty",
    json: config
  })))), _react.default.createElement(StyledExportConfigSection, null, _react.default.createElement("div", {
    className: "description"
  }, _react.default.createElement("div", {
    className: "title"
  }, "Export Current Map"), _react.default.createElement("div", {
    className: "subtitle"
  }, "Export current map, including data and config. You can later load the same map by loading this file to kepler.gl.")), _react.default.createElement("div", {
    className: "selection"
  }, _react.default.createElement(_switch.default, {
    type: "checkbox",
    id: "export-map-config",
    checked: data,
    onChange: onChangeExportData
  }))))));
};

ExportConfigModal.propTypes = propTypes;

var ExportConfigModalFactory = function ExportConfigModalFactory() {
  return ExportConfigModal;
};

var _default = ExportConfigModalFactory;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZGFscy9leHBvcnQtY29uZmlnLW1vZGFsLmpzIl0sIm5hbWVzIjpbInByb3BUeXBlcyIsImNvbmZpZyIsIlByb3BUeXBlcyIsIm9iamVjdCIsInJlcXVpcmVkIiwiU3R5bGVkRXhwb3J0Q29uZmlnU2VjdGlvbiIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJ0ZXh0Q29sb3JMVCIsInRleHRDb2xvciIsImVycm9yQ29sb3IiLCJzZWxlY3RCb3JkZXJDb2xvckxUIiwiU3R5bGVkTW9kYWxDb250ZW50SW5uZXIiLCJFeHBvcnRDb25maWdNb2RhbCIsImRhdGEiLCJvbkNoYW5nZUV4cG9ydERhdGEiLCJFeHBvcnRDb25maWdNb2RhbEZhY3RvcnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsU0FBUyxHQUFHO0FBQ2hCQyxFQUFBQSxNQUFNLEVBQUVDLG1CQUFVQyxNQUFWLENBQWlCQztBQURULENBQWxCOztBQUlBLElBQU1DLHlCQUF5QixHQUFHQywwQkFBT0MsR0FBVixvQkFZaEIsVUFBQUMsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZQyxXQUFoQjtBQUFBLENBWlcsRUFnQmhCLFVBQUFGLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUUsU0FBaEI7QUFBQSxDQWhCVyxFQXFCaEIsVUFBQUgsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZRyxVQUFoQjtBQUFBLENBckJXLEVBK0JMLFVBQUFKLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUksbUJBQWhCO0FBQUEsQ0EvQkEsQ0FBL0I7O0FBZ0RBLElBQU1DLHVCQUF1QixHQUFHUiwwQkFBT0MsR0FBVixvQkFBN0I7O0FBSUEsSUFBTVEsaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFvQjtBQUFBLE1BQ3hCQyxJQUR3QixRQUN4QkEsSUFEd0I7QUFBQSxNQUV4QmYsTUFGd0IsUUFFeEJBLE1BRndCO0FBQUEsTUFJeEJnQixrQkFKd0IsUUFJeEJBLGtCQUp3QjtBQUFBLFNBTXhCO0FBQUssSUFBQSxTQUFTLEVBQUM7QUFBZixLQUNFLDZCQUFDLHFDQUFELFFBQ0UsNkJBQUMsdUJBQUQ7QUFBeUIsSUFBQSxTQUFTLEVBQUM7QUFBbkMsS0FDRSw2QkFBQyx5QkFBRCxRQUNFO0FBQUssSUFBQSxTQUFTLEVBQUM7QUFBZixLQUNFO0FBQUssSUFBQSxTQUFTLEVBQUM7QUFBZixzQkFERixFQUlFO0FBQUssSUFBQSxTQUFTLEVBQUM7QUFBZixtRUFKRixFQU9FO0FBQUssSUFBQSxTQUFTLEVBQUM7QUFBZixxUkFQRixDQURGLEVBZUU7QUFBSyxJQUFBLFNBQVMsRUFBQztBQUFmLEtBQ0U7QUFBSyxJQUFBLFNBQVMsRUFBQztBQUFmLEtBQ0ksNkJBQUMsd0JBQUQ7QUFBWSxJQUFBLEVBQUUsRUFBQyxhQUFmO0FBQTZCLElBQUEsSUFBSSxFQUFFaEI7QUFBbkMsSUFESixDQURGLENBZkYsQ0FERixFQXNCRSw2QkFBQyx5QkFBRCxRQUNFO0FBQUssSUFBQSxTQUFTLEVBQUM7QUFBZixLQUNFO0FBQUssSUFBQSxTQUFTLEVBQUM7QUFBZiwwQkFERixFQUlFO0FBQUssSUFBQSxTQUFTLEVBQUM7QUFBZix5SEFKRixDQURGLEVBU0U7QUFBSyxJQUFBLFNBQVMsRUFBQztBQUFmLEtBQ0UsNkJBQUMsZUFBRDtBQUFRLElBQUEsSUFBSSxFQUFDLFVBQWI7QUFDUSxJQUFBLEVBQUUsRUFBQyxtQkFEWDtBQUVRLElBQUEsT0FBTyxFQUFFZSxJQUZqQjtBQUdRLElBQUEsUUFBUSxFQUFFQztBQUhsQixJQURGLENBVEYsQ0F0QkYsQ0FERixDQURGLENBTndCO0FBQUEsQ0FBMUI7O0FBbURBRixpQkFBaUIsQ0FBQ2YsU0FBbEIsR0FBOEJBLFNBQTlCOztBQUVBLElBQU1rQix3QkFBd0IsR0FBRyxTQUEzQkEsd0JBQTJCO0FBQUEsU0FBTUgsaUJBQU47QUFBQSxDQUFqQzs7ZUFDZUcsd0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IFN3aXRjaCBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zd2l0Y2gnO1xuaW1wb3J0IEpTT05QcmV0dHkgZnJvbSAncmVhY3QtanNvbi1wcmV0dHknO1xuXG5pbXBvcnQge1N0eWxlZE1vZGFsQ29udGVudH0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5jb25zdCBwcm9wVHlwZXMgPSB7XG4gIGNvbmZpZzogUHJvcFR5cGVzLm9iamVjdC5yZXF1aXJlZFxufTtcblxuY29uc3QgU3R5bGVkRXhwb3J0Q29uZmlnU2VjdGlvbiA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIG1hcmdpbjogMzVweCAwO1xuICB3aWR0aDogMTAwJTtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuXG4gIC5kZXNjcmlwdGlvbiB7XG4gICAgd2lkdGg6IDE4NXB4O1xuXG4gICAgLnRpdGxlIHtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JMVH07XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgfVxuICAgIC5zdWJ0aXRsZSB7XG4gICAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3J9O1xuICAgICAgZm9udC1zaXplOiAxMXB4O1xuICAgIH1cblxuICAgIC5ub3RlIHtcbiAgICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmVycm9yQ29sb3J9O1xuICAgICAgZm9udC1zaXplOiAxMXB4O1xuICAgIH1cbiAgfVxuXG4gIC5zZWxlY3Rpb24ge1xuICAgIHBhZGRpbmctbGVmdDogNTBweDtcbiAgICBmbGV4LWdyb3c6IDE7XG5cbiAgICAudmlld2VyIHtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2VsZWN0Qm9yZGVyQ29sb3JMVH07XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgIGZvbnQ6IGluaGVyaXQ7XG4gICAgICBsaW5lLWhlaWdodDogMS41ZW07XG4gICAgICBwYWRkaW5nOiAwLjVlbSAzLjVlbSAwLjVlbSAxZW07XG4gICAgICBtYXJnaW46IDA7XG4gICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgIGhlaWdodDogMzAwcHg7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIG92ZXJmbG93LXk6IHNjcm9sbDtcbiAgICB9XG4gIH1cbmA7XG5cbmNvbnN0IFN0eWxlZE1vZGFsQ29udGVudElubmVyID0gc3R5bGVkLmRpdmBcbiAgd2lkdGg6IDEwMCU7XG5gO1xuXG5jb25zdCBFeHBvcnRDb25maWdNb2RhbCA9ICh7XG4gIGRhdGEsXG4gIGNvbmZpZyxcbiAgLy8gYWN0aW9uc1xuICBvbkNoYW5nZUV4cG9ydERhdGFcbn0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJleHBvcnQtY29uZmlnLW1vZGFsXCI+XG4gICAgPFN0eWxlZE1vZGFsQ29udGVudD5cbiAgICAgIDxTdHlsZWRNb2RhbENvbnRlbnRJbm5lciBjbGFzc05hbWU9XCJleHBvcnQtY29uZmlnLW1vZGFsX19pbm5lclwiPlxuICAgICAgICA8U3R5bGVkRXhwb3J0Q29uZmlnU2VjdGlvbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+XG4gICAgICAgICAgICAgIEN1cnJlbnQgQ29uZmlnXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3VidGl0bGVcIj5cbiAgICAgICAgICAgICAgWW91IGNhbiBjb3B5IG9yIGV4cG9ydCB0aGUgY3VycmVudCBLZXBsZXIuZ2wgY29uZmlndXJhdGlvbi5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJub3RlXCI+XG4gICAgICAgICAgICAgICoga2VwbGVyLmdsIG1hcCBjb25maWcgaXMgY291cGxlZCB3aXRoIGxvYWRlZCBkYXRhc2V0cy5cbiAgICAgICAgICAgICAgZGF0YUlkIGtleSBpcyB1c2VkIHRvIGJpbmQgbGF5ZXJzIGFuZCBmaWx0ZXJzIHRvIGEgc3BlY2lmaWMgZGF0YXNldC5cbiAgICAgICAgICAgICAgSWYgeW91IHRyeSB0byB1cGxvYWQgYSBjb25maWd1cmF0aW9uIHdpdGggYSBzcGVjaWZpYyBkYXRhSWQgeW91IGFsc28gbmVlZCB0byBtYWtlIHN1cmVcbiAgICAgICAgICAgICAgeW91IGV4aXN0aW5nIGRhdGFzZXQgaWQgbWF0Y2ggdGhlIGRhdGFJZC9zIGluIHRoZSBjb25maWcuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdGlvblwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2aWV3ZXJcIj5cbiAgICAgICAgICAgICAgICA8SlNPTlByZXR0eSBpZD1cImpzb24tcHJldHR5XCIganNvbj17Y29uZmlnfS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9TdHlsZWRFeHBvcnRDb25maWdTZWN0aW9uPlxuICAgICAgICA8U3R5bGVkRXhwb3J0Q29uZmlnU2VjdGlvbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+XG4gICAgICAgICAgICAgIEV4cG9ydCBDdXJyZW50IE1hcFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1YnRpdGxlXCI+XG4gICAgICAgICAgICAgIEV4cG9ydCBjdXJyZW50IG1hcCwgaW5jbHVkaW5nIGRhdGEgYW5kIGNvbmZpZy4gWW91IGNhbiBsYXRlciBsb2FkIHRoZSBzYW1lIG1hcCBieSBsb2FkaW5nIHRoaXMgZmlsZSB0byBrZXBsZXIuZ2wuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdGlvblwiPlxuICAgICAgICAgICAgPFN3aXRjaCB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICBpZD1cImV4cG9ydC1tYXAtY29uZmlnXCJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17ZGF0YX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlRXhwb3J0RGF0YX0vPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L1N0eWxlZEV4cG9ydENvbmZpZ1NlY3Rpb24+XG4gICAgICA8L1N0eWxlZE1vZGFsQ29udGVudElubmVyPlxuICAgIDwvU3R5bGVkTW9kYWxDb250ZW50PlxuICA8L2Rpdj5cbik7XG5cbkV4cG9ydENvbmZpZ01vZGFsLnByb3BUeXBlcyA9IHByb3BUeXBlcztcblxuY29uc3QgRXhwb3J0Q29uZmlnTW9kYWxGYWN0b3J5ID0gKCkgPT4gRXhwb3J0Q29uZmlnTW9kYWw7XG5leHBvcnQgZGVmYXVsdCBFeHBvcnRDb25maWdNb2RhbEZhY3Rvcnk7XG4iXX0=