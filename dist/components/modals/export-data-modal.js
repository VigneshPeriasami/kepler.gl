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

var _defaultSettings = require("../../constants/default-settings");

var _icons = require("../common/icons");

var _styledComponents2 = require("../common/styled-components");

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  align-items: center;\n  border-radius: 2px;\n  border: 1px solid ", ";\n  cursor: pointer;\n  display: flex;\n  flex-direction: column;\n  height: 60px;\n  justify-content: center;\n  margin: 4px;\n  padding: 8px 12px;\n  width: 140px;\n\n  :hover {\n    border: 1px solid ", ";\n  }\n\n  .filtered-title {\n    color: ", ";\n    font-size: 12px;\n    font-weight: 500;\n  }\n  .filtered-subtitle {\n    color: ", ";\n    font-size: 11px;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  border-radius: 2px;\n  border: 1px solid ", ";\n  color: ", ";\n  cursor: pointer;\n  font-weight: 500;\n  height: 100px;\n  margin: 4px;\n  padding: 6px 10px;\n  width: 100px;\n\n  :hover {\n    color: ", ";\n    border: 1px solid ", ";\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n  margin: 35px 0;\n  width: 100%;\n\n  .description {\n    width: 185px;\n\n    .title {\n      font-weight: 500;\n      color: ", ";\n      font-size: 12px;\n    }\n    .subtitle {\n      color: ", ";\n      font-size: 11px;\n    }\n  }\n\n  .selection {\n    display: flex;\n    flex-wrap: wrap;\n    flex: 1;\n    padding-left: 50px;\n\n    select {\n      background-color: white;\n      border-radius: 1px;\n      display: inline-block;\n      font: inherit;\n      line-height: 1.5em;\n      padding: 0.5em 3.5em 0.5em 1em;\n      margin: 0;\n      box-sizing: border-box;\n      appearance: none;\n      width: 250px;\n      height: 36px;\n\n      background-image:\n        linear-gradient(45deg, transparent 50%, gray 50%),\n        linear-gradient(135deg, gray 50%, transparent 50%),\n        linear-gradient(to right, #ccc, #ccc);\n      background-position:\n        calc(100% - 20px) calc(1em + 2px),\n        calc(100% - 15px) calc(1em + 2px),\n        calc(100% - 2.5em) 4.5em;\n      background-size:\n        5px 5px,\n        5px 5px,\n        1px 1.5em;\n      background-repeat: no-repeat;\n    }\n\n    select:focus {\n      background-image:\n        linear-gradient(45deg, green 50%, transparent 50%),\n        linear-gradient(135deg, transparent 50%, green 50%),\n        linear-gradient(to right, #ccc, #ccc);\n      background-position:\n        calc(100% - 15px) 1em,\n        calc(100% - 20px) 1em,\n        calc(100% - 2.5em) 4.5em;\n      background-size:\n        5px 5px,\n        5px 5px,\n        1px 1.5em;\n      background-repeat: no-repeat;\n      border-color: green;\n      outline: 0;\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var StyledExportDataSection = _styledComponents.default.div(_templateObject(), function (props) {
  return props.theme.textColorLT;
}, function (props) {
  return props.theme.textColor;
});

var StyledDataType = _styledComponents.default.div(_templateObject2(), function (props) {
  return props.selected ? props.theme.primaryBtnBgd : props.theme.selectBorderColorLT;
}, function (props) {
  return props.selected ? props.theme.primaryBtnBgd : props.theme.selectBorderColorLT;
}, function (props) {
  return props.available && props.theme.primaryBtnBgd;
}, function (props) {
  return props.available && props.theme.primaryBtnBgd;
});

var StyledFilteredDataOption = _styledComponents.default.div(_templateObject3(), function (props) {
  return props.selected ? props.theme.primaryBtnBgd : props.theme.selectBorderColorLT;
}, function (props) {
  return props.theme.primaryBtnBgd;
}, function (props) {
  return props.theme.textColorLT;
}, function (props) {
  return props.theme.textColor;
});

var propTypes = {
  datasets: _propTypes.default.object.isRequired,
  selectedDataset: _propTypes.default.string,
  dataType: _propTypes.default.string.isRequired,
  filtered: _propTypes.default.bool.isRequired,
  // callbacks
  onClose: _propTypes.default.func.isRequired,
  onChangeExportSelectedDataset: _propTypes.default.func.isRequired,
  onChangeExportDataType: _propTypes.default.func.isRequired,
  onChangeExportFiltered: _propTypes.default.func.isRequired,
  onChangeExportConfig: _propTypes.default.func.isRequired
};

var getDataRowCount = function getDataRowCount(datasets, selectedDataset, filtered) {
  var selectedData = datasets[selectedDataset];

  if (!selectedData) {
    return "".concat(Object.keys(datasets).length, " Files ");
  }

  var allData = selectedData.allData,
      data = selectedData.data;
  var rowCount = filtered ? data.length : allData.length;
  return "".concat(rowCount.toLocaleString('en'), " Rows");
};

var ExportDataModal = function ExportDataModal(_ref) {
  var datasets = _ref.datasets,
      selectedDataset = _ref.selectedDataset,
      dataType = _ref.dataType,
      filtered = _ref.filtered,
      config = _ref.config,
      onChangeExportDataType = _ref.onChangeExportDataType,
      onChangeExportSelectedDataset = _ref.onChangeExportSelectedDataset,
      onChangeExportFiltered = _ref.onChangeExportFiltered;
  return _react.default.createElement("div", {
    className: "export-data-modal"
  }, _react.default.createElement(_styledComponents2.StyledModalContent, null, _react.default.createElement("div", null, _react.default.createElement(StyledExportDataSection, null, _react.default.createElement("div", {
    className: "description"
  }, _react.default.createElement("div", {
    className: "title"
  }, "Dataset"), _react.default.createElement("div", {
    className: "subtitle"
  }, "Choose the datasets you want to export")), _react.default.createElement("div", {
    className: "selection"
  }, _react.default.createElement("select", {
    value: selectedDataset,
    onChange: function onChange(e) {
      return onChangeExportSelectedDataset(e.target.value);
    }
  }, ['All'].concat(Object.keys(datasets)).map(function (d) {
    return _react.default.createElement("option", {
      key: d,
      value: d
    }, datasets[d] && datasets[d].label || d);
  })))), _react.default.createElement(StyledExportDataSection, null, _react.default.createElement("div", {
    className: "description"
  }, _react.default.createElement("div", {
    className: "title"
  }, "Data Type"), _react.default.createElement("div", {
    className: "subtitle"
  }, "Choose the type of data you want to export")), _react.default.createElement("div", {
    className: "selection"
  }, _defaultSettings.EXPORT_DATA_TYPE_OPTIONS.map(function (op) {
    return _react.default.createElement(StyledDataType, {
      key: op.id,
      selected: dataType === op.id,
      available: op.available,
      onClick: function onClick() {
        return op.available && onChangeExportDataType(op.id);
      }
    }, _react.default.createElement(_icons.FileType, {
      ext: op.label,
      height: "80px",
      fontSize: "11px"
    }));
  }))), _react.default.createElement(StyledExportDataSection, null, _react.default.createElement("div", {
    className: "description"
  }, _react.default.createElement("div", {
    className: "title"
  }, "Filter Data"), _react.default.createElement("div", {
    className: "subtitle"
  }, "You can choose exporting original data or filtered data")), _react.default.createElement("div", {
    className: "selection"
  }, _react.default.createElement(StyledFilteredDataOption, {
    selected: !filtered,
    onClick: function onClick() {
      return onChangeExportFiltered(false);
    }
  }, _react.default.createElement("div", {
    className: "filtered-title"
  }, "Unfiltered Data"), _react.default.createElement("div", {
    className: "filtered-subtitle"
  }, getDataRowCount(datasets, selectedDataset, false))), _react.default.createElement(StyledFilteredDataOption, {
    selected: filtered,
    onClick: function onClick() {
      return onChangeExportFiltered(true);
    }
  }, _react.default.createElement("div", {
    className: "filtered-title"
  }, "Filtered Data"), _react.default.createElement("div", {
    className: "filtered-subtitle"
  }, getDataRowCount(datasets, selectedDataset, true))))))));
};

ExportDataModal.propTypes = propTypes;

var ExportDataModalFactory = function ExportDataModalFactory() {
  return ExportDataModal;
};

var _default = ExportDataModalFactory;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZGFscy9leHBvcnQtZGF0YS1tb2RhbC5qcyJdLCJuYW1lcyI6WyJTdHlsZWRFeHBvcnREYXRhU2VjdGlvbiIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJ0ZXh0Q29sb3JMVCIsInRleHRDb2xvciIsIlN0eWxlZERhdGFUeXBlIiwic2VsZWN0ZWQiLCJwcmltYXJ5QnRuQmdkIiwic2VsZWN0Qm9yZGVyQ29sb3JMVCIsImF2YWlsYWJsZSIsIlN0eWxlZEZpbHRlcmVkRGF0YU9wdGlvbiIsInByb3BUeXBlcyIsImRhdGFzZXRzIiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiaXNSZXF1aXJlZCIsInNlbGVjdGVkRGF0YXNldCIsInN0cmluZyIsImRhdGFUeXBlIiwiZmlsdGVyZWQiLCJib29sIiwib25DbG9zZSIsImZ1bmMiLCJvbkNoYW5nZUV4cG9ydFNlbGVjdGVkRGF0YXNldCIsIm9uQ2hhbmdlRXhwb3J0RGF0YVR5cGUiLCJvbkNoYW5nZUV4cG9ydEZpbHRlcmVkIiwib25DaGFuZ2VFeHBvcnRDb25maWciLCJnZXREYXRhUm93Q291bnQiLCJzZWxlY3RlZERhdGEiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiYWxsRGF0YSIsImRhdGEiLCJyb3dDb3VudCIsInRvTG9jYWxlU3RyaW5nIiwiRXhwb3J0RGF0YU1vZGFsIiwiY29uZmlnIiwiZSIsInRhcmdldCIsInZhbHVlIiwiY29uY2F0IiwibWFwIiwiZCIsImxhYmVsIiwiRVhQT1JUX0RBVEFfVFlQRV9PUFRJT05TIiwib3AiLCJpZCIsIkV4cG9ydERhdGFNb2RhbEZhY3RvcnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLHVCQUF1QixHQUFHQywwQkFBT0MsR0FBVixvQkFXZCxVQUFBQyxLQUFLO0FBQUEs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QUQsQ0FBNUI7QUFBQTtBQUF4RCxLQUNFO0FBQUssSUFBQSxTQUFTLEVBQUM7QUFBZix1QkFERixFQUVFO0FBQUssSUFBQSxTQUFTLEVBQUM7QUFBZixLQUFvQ0UsZUFBZSxDQUFDZixRQUFELEVBQVdJLGVBQVgsRUFBNEIsS0FBNUIsQ0FBbkQsQ0FGRixDQURGLEVBS0UsNkJBQUMsd0JBQUQ7QUFBMEIsSUFBQSxRQUFRLEVBQUVHLFFBQXBDO0FBQThDLElBQUEsT0FBTyxFQUFFO0FBQUEsYUFBTU0sc0JBQXNCLENBQUMsSUFBRCxDQUE1QjtBQUFBO0FBQXZELEtBQ0U7QUFBSyxJQUFBLFNBQVMsRUFBQztBQUFmLHFCQURGLEVBRUU7QUFBSyxJQUFBLFNBQVMsRUFBQztBQUFmLEtBQW9DRSxlQUFlLENBQUNmLFFBQUQsRUFBV0ksZUFBWCxFQUE0QixJQUE1QixDQUFuRCxDQUZGLENBTEYsQ0FURixDQTFDRixDQURGLENBREYsQ0FYc0I7QUFBQSxDQUF4Qjs7QUFpRkFvQixlQUFlLENBQUN6QixTQUFoQixHQUE0QkEsU0FBNUI7O0FBRUEsSUFBTXFDLHNCQUFzQixHQUFHLFNBQXpCQSxzQkFBeUI7QUFBQSxTQUFNWixlQUFOO0FBQUEsQ0FBL0I7O2VBQ2VZLHNCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHtFWFBPUlRfREFUQV9UWVBFX09QVElPTlN9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcbmltcG9ydCB7RmlsZVR5cGV9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ljb25zJztcbmltcG9ydCB7U3R5bGVkTW9kYWxDb250ZW50fSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5cbmNvbnN0IFN0eWxlZEV4cG9ydERhdGFTZWN0aW9uID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgbWFyZ2luOiAzNXB4IDA7XG4gIHdpZHRoOiAxMDAlO1xuXG4gIC5kZXNjcmlwdGlvbiB7XG4gICAgd2lkdGg6IDE4NXB4O1xuXG4gICAgLnRpdGxlIHtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JMVH07XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgfVxuICAgIC5zdWJ0aXRsZSB7XG4gICAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3J9O1xuICAgICAgZm9udC1zaXplOiAxMXB4O1xuICAgIH1cbiAgfVxuXG4gIC5zZWxlY3Rpb24ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICAgIGZsZXg6IDE7XG4gICAgcGFkZGluZy1sZWZ0OiA1MHB4O1xuXG4gICAgc2VsZWN0IHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgICAgYm9yZGVyLXJhZGl1czogMXB4O1xuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgZm9udDogaW5oZXJpdDtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjVlbTtcbiAgICAgIHBhZGRpbmc6IDAuNWVtIDMuNWVtIDAuNWVtIDFlbTtcbiAgICAgIG1hcmdpbjogMDtcbiAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICBhcHBlYXJhbmNlOiBub25lO1xuICAgICAgd2lkdGg6IDI1MHB4O1xuICAgICAgaGVpZ2h0OiAzNnB4O1xuXG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOlxuICAgICAgICBsaW5lYXItZ3JhZGllbnQoNDVkZWcsIHRyYW5zcGFyZW50IDUwJSwgZ3JheSA1MCUpLFxuICAgICAgICBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCBncmF5IDUwJSwgdHJhbnNwYXJlbnQgNTAlKSxcbiAgICAgICAgbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAjY2NjLCAjY2NjKTtcbiAgICAgIGJhY2tncm91bmQtcG9zaXRpb246XG4gICAgICAgIGNhbGMoMTAwJSAtIDIwcHgpIGNhbGMoMWVtICsgMnB4KSxcbiAgICAgICAgY2FsYygxMDAlIC0gMTVweCkgY2FsYygxZW0gKyAycHgpLFxuICAgICAgICBjYWxjKDEwMCUgLSAyLjVlbSkgNC41ZW07XG4gICAgICBiYWNrZ3JvdW5kLXNpemU6XG4gICAgICAgIDVweCA1cHgsXG4gICAgICAgIDVweCA1cHgsXG4gICAgICAgIDFweCAxLjVlbTtcbiAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgfVxuXG4gICAgc2VsZWN0OmZvY3VzIHtcbiAgICAgIGJhY2tncm91bmQtaW1hZ2U6XG4gICAgICAgIGxpbmVhci1ncmFkaWVudCg0NWRlZywgZ3JlZW4gNTAlLCB0cmFuc3BhcmVudCA1MCUpLFxuICAgICAgICBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCB0cmFuc3BhcmVudCA1MCUsIGdyZWVuIDUwJSksXG4gICAgICAgIGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgI2NjYywgI2NjYyk7XG4gICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOlxuICAgICAgICBjYWxjKDEwMCUgLSAxNXB4KSAxZW0sXG4gICAgICAgIGNhbGMoMTAwJSAtIDIwcHgpIDFlbSxcbiAgICAgICAgY2FsYygxMDAlIC0gMi41ZW0pIDQuNWVtO1xuICAgICAgYmFja2dyb3VuZC1zaXplOlxuICAgICAgICA1cHggNXB4LFxuICAgICAgICA1cHggNXB4LFxuICAgICAgICAxcHggMS41ZW07XG4gICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgICAgYm9yZGVyLWNvbG9yOiBncmVlbjtcbiAgICAgIG91dGxpbmU6IDA7XG4gICAgfVxuICB9XG5gO1xuXG5jb25zdCBTdHlsZWREYXRhVHlwZSA9IHN0eWxlZC5kaXZgXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgYm9yZGVyOiAxcHggc29saWQgJHtwcm9wcyA9PiBwcm9wcy5zZWxlY3RlZCA/IHByb3BzLnRoZW1lLnByaW1hcnlCdG5CZ2QgOiBwcm9wcy50aGVtZS5zZWxlY3RCb3JkZXJDb2xvckxUfTtcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMuc2VsZWN0ZWQgPyBwcm9wcy50aGVtZS5wcmltYXJ5QnRuQmdkIDogcHJvcHMudGhlbWUuc2VsZWN0Qm9yZGVyQ29sb3JMVH07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgaGVpZ2h0OiAxMDBweDtcbiAgbWFyZ2luOiA0cHg7XG4gIHBhZGRpbmc6IDZweCAxMHB4O1xuICB3aWR0aDogMTAwcHg7XG5cbiAgOmhvdmVyIHtcbiAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy5hdmFpbGFibGUgJiYgcHJvcHMudGhlbWUucHJpbWFyeUJ0bkJnZH07XG4gICAgYm9yZGVyOiAxcHggc29saWQgJHtwcm9wcyA9PiBwcm9wcy5hdmFpbGFibGUgJiYgcHJvcHMudGhlbWUucHJpbWFyeUJ0bkJnZH07XG4gIH1cbmA7XG5cbmNvbnN0IFN0eWxlZEZpbHRlcmVkRGF0YU9wdGlvbiA9IHN0eWxlZC5kaXZgXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgYm9yZGVyOiAxcHggc29saWQgJHtwcm9wcyA9PiBwcm9wcy5zZWxlY3RlZCA/IHByb3BzLnRoZW1lLnByaW1hcnlCdG5CZ2QgOiBwcm9wcy50aGVtZS5zZWxlY3RCb3JkZXJDb2xvckxUfTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBoZWlnaHQ6IDYwcHg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBtYXJnaW46IDRweDtcbiAgcGFkZGluZzogOHB4IDEycHg7XG4gIHdpZHRoOiAxNDBweDtcblxuICA6aG92ZXIge1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucHJpbWFyeUJ0bkJnZH07XG4gIH1cblxuICAuZmlsdGVyZWQtdGl0bGUge1xuICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvckxUfTtcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgfVxuICAuZmlsdGVyZWQtc3VidGl0bGUge1xuICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvcn07XG4gICAgZm9udC1zaXplOiAxMXB4O1xuICB9XG5gO1xuXG5jb25zdCBwcm9wVHlwZXMgPSB7XG4gIGRhdGFzZXRzOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIHNlbGVjdGVkRGF0YXNldDogUHJvcFR5cGVzLnN0cmluZyxcbiAgZGF0YVR5cGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgZmlsdGVyZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIC8vIGNhbGxiYWNrc1xuICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbkNoYW5nZUV4cG9ydFNlbGVjdGVkRGF0YXNldDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25DaGFuZ2VFeHBvcnREYXRhVHlwZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25DaGFuZ2VFeHBvcnRGaWx0ZXJlZDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25DaGFuZ2VFeHBvcnRDb25maWc6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn07XG5cbmNvbnN0IGdldERhdGFSb3dDb3VudCA9IChkYXRhc2V0cywgc2VsZWN0ZWREYXRhc2V0LCBmaWx0ZXJlZCkgPT4ge1xuICBjb25zdCBzZWxlY3RlZERhdGEgPSBkYXRhc2V0c1tzZWxlY3RlZERhdGFzZXRdO1xuICBpZiAoIXNlbGVjdGVkRGF0YSkge1xuICAgIHJldHVybiBgJHtPYmplY3Qua2V5cyhkYXRhc2V0cykubGVuZ3RofSBGaWxlcyBgIDtcbiAgfVxuICBjb25zdCB7YWxsRGF0YSwgZGF0YX0gPSBzZWxlY3RlZERhdGE7XG4gIGNvbnN0IHJvd0NvdW50ID0gZmlsdGVyZWQgPyBkYXRhLmxlbmd0aCA6IGFsbERhdGEubGVuZ3RoO1xuICByZXR1cm4gYCR7cm93Q291bnQudG9Mb2NhbGVTdHJpbmcoJ2VuJyl9IFJvd3NgO1xufTtcblxuY29uc3QgRXhwb3J0RGF0YU1vZGFsID0gKHtcbiAgZGF0YXNldHMsXG4gIHNlbGVjdGVkRGF0YXNldCxcbiAgZGF0YVR5cGUsXG4gIGZpbHRlcmVkLFxuICBjb25maWcsXG4gIC8vIGNhbGxiYWNrczpcbiAgb25DaGFuZ2VFeHBvcnREYXRhVHlwZSxcbiAgb25DaGFuZ2VFeHBvcnRTZWxlY3RlZERhdGFzZXQsXG4gIG9uQ2hhbmdlRXhwb3J0RmlsdGVyZWRcbn0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJleHBvcnQtZGF0YS1tb2RhbFwiPlxuICAgIDxTdHlsZWRNb2RhbENvbnRlbnQ+XG4gICAgICA8ZGl2PlxuICAgICAgICA8U3R5bGVkRXhwb3J0RGF0YVNlY3Rpb24+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZXNjcmlwdGlvblwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICBEYXRhc2V0XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3VidGl0bGVcIj5cbiAgICAgICAgICAgICAgQ2hvb3NlIHRoZSBkYXRhc2V0cyB5b3Ugd2FudCB0byBleHBvcnRcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0aW9uXCI+XG4gICAgICAgICAgICA8c2VsZWN0IHZhbHVlPXtzZWxlY3RlZERhdGFzZXR9IG9uQ2hhbmdlPXtlID0+IG9uQ2hhbmdlRXhwb3J0U2VsZWN0ZWREYXRhc2V0KGUudGFyZ2V0LnZhbHVlKX0+XG4gICAgICAgICAgICB7WydBbGwnXS5jb25jYXQoT2JqZWN0LmtleXMoZGF0YXNldHMpKS5tYXAoZCA9PiAoXG4gICAgICAgICAgICAgIDxvcHRpb24ga2V5PXtkfSB2YWx1ZT17ZH0+eyhkYXRhc2V0c1tkXSAmJiBkYXRhc2V0c1tkXS5sYWJlbCkgfHwgZH08L29wdGlvbj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvU3R5bGVkRXhwb3J0RGF0YVNlY3Rpb24+XG5cbiAgICAgICAgPFN0eWxlZEV4cG9ydERhdGFTZWN0aW9uPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgRGF0YSBUeXBlXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3VidGl0bGVcIj5cbiAgICAgICAgICAgICAgQ2hvb3NlIHRoZSB0eXBlIG9mIGRhdGEgeW91IHdhbnQgdG8gZXhwb3J0XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdGlvblwiPlxuICAgICAgICAgICAge0VYUE9SVF9EQVRBX1RZUEVfT1BUSU9OUy5tYXAob3AgPT5cbiAgICAgICAgICAgICAgPFN0eWxlZERhdGFUeXBlXG4gICAgICAgICAgICAgICAga2V5PXtvcC5pZH1cbiAgICAgICAgICAgICAgICBzZWxlY3RlZD17ZGF0YVR5cGUgPT09IG9wLmlkfVxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZT17b3AuYXZhaWxhYmxlfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9wLmF2YWlsYWJsZSAmJiBvbkNoYW5nZUV4cG9ydERhdGFUeXBlKG9wLmlkKX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxGaWxlVHlwZSBleHQ9e29wLmxhYmVsfSBoZWlnaHQ9XCI4MHB4XCIgZm9udFNpemU9XCIxMXB4XCIgLz5cbiAgICAgICAgICAgICAgPC9TdHlsZWREYXRhVHlwZT5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvU3R5bGVkRXhwb3J0RGF0YVNlY3Rpb24+XG5cbiAgICAgICAgPFN0eWxlZEV4cG9ydERhdGFTZWN0aW9uPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgRmlsdGVyIERhdGFcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJ0aXRsZVwiPlxuICAgICAgICAgICAgICBZb3UgY2FuIGNob29zZSBleHBvcnRpbmcgb3JpZ2luYWwgZGF0YSBvciBmaWx0ZXJlZCBkYXRhXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdGlvblwiPlxuICAgICAgICAgICAgPFN0eWxlZEZpbHRlcmVkRGF0YU9wdGlvbiBzZWxlY3RlZD17IWZpbHRlcmVkfSBvbkNsaWNrPXsoKSA9PiBvbkNoYW5nZUV4cG9ydEZpbHRlcmVkKGZhbHNlKX0+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyZWQtdGl0bGVcIj5VbmZpbHRlcmVkIERhdGE8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXJlZC1zdWJ0aXRsZVwiPntnZXREYXRhUm93Q291bnQoZGF0YXNldHMsIHNlbGVjdGVkRGF0YXNldCwgZmFsc2UpfTwvZGl2PlxuICAgICAgICAgICAgPC9TdHlsZWRGaWx0ZXJlZERhdGFPcHRpb24+XG4gICAgICAgICAgICA8U3R5bGVkRmlsdGVyZWREYXRhT3B0aW9uIHNlbGVjdGVkPXtmaWx0ZXJlZH0gb25DbGljaz17KCkgPT4gb25DaGFuZ2VFeHBvcnRGaWx0ZXJlZCh0cnVlKX0+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyZWQtdGl0bGVcIj5GaWx0ZXJlZCBEYXRhPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyZWQtc3VidGl0bGVcIj57Z2V0RGF0YVJvd0NvdW50KGRhdGFzZXRzLCBzZWxlY3RlZERhdGFzZXQsIHRydWUpfTwvZGl2PlxuICAgICAgICAgICAgPC9TdHlsZWRGaWx0ZXJlZERhdGFPcHRpb24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvU3R5bGVkRXhwb3J0RGF0YVNlY3Rpb24+XG5cbiAgICAgIDwvZGl2PlxuICAgIDwvU3R5bGVkTW9kYWxDb250ZW50PlxuICA8L2Rpdj5cbik7XG5cbkV4cG9ydERhdGFNb2RhbC5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG5cbmNvbnN0IEV4cG9ydERhdGFNb2RhbEZhY3RvcnkgPSAoKSA9PiBFeHBvcnREYXRhTW9kYWw7XG5leHBvcnQgZGVmYXVsdCBFeHBvcnREYXRhTW9kYWxGYWN0b3J5O1xuIl19