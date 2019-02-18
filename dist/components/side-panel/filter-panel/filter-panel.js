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

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reselect = require("reselect");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _panelHeaderAction = _interopRequireDefault(require("../panel-header-action"));

var _fieldSelector = _interopRequireDefault(require("../../common/field-selector"));

var _icons = require("../../common/icons");

var _sourceDataSelector = _interopRequireDefault(require("../source-data-selector"));

var _styledComponents2 = require("../../common/styled-components");

var Filters = _interopRequireWildcard(require("../../filters"));

var _filterUtils = require("../../../utils/filter-utils");

var _defaultSettings = require("../../../constants/default-settings");

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  background-color: ", ";\n  padding: 12px;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  cursor: pointer;\n  padding: 10px 12px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin-bottom: 12px;\n  border-radius: 1px;\n\n  .filter-panel__filter {\n    margin-top: 24px;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var StyledFilterPanel = _styledComponents.default.div(_templateObject());

var StyledFilterHeader = _styledComponents2.StyledPanelHeader.extend(_templateObject2());

var StyledFilterContent = _styledComponents.default.div(_templateObject3(), function (props) {
  return props.theme.panelBackground;
});

function FilterPanelFactory() {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2.default)(FilterPanel, _Component);

    function FilterPanel() {
      var _getPrototypeOf2;

      var _this;

      (0, _classCallCheck2.default)(this, FilterPanel);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(FilterPanel)).call.apply(_getPrototypeOf2, [this].concat(args)));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "fieldsSelector", function (props) {
        return props.filter.dataId && props.datasets[props.filter.dataId].fields || [];
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "filterSelector", function (props) {
        return props.filters;
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "nameSelector", function (props) {
        return props.filter.name;
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "dataIdSelector", function (props) {
        return props.filter.dataId;
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "availableFieldsSelector", (0, _reselect.createSelector)(_this.fieldsSelector, _this.filterSelector, _this.nameSelector, _this.dataIdSelector, function (fields, filters, name, dataId) {
        return fields.filter(function (f) {
          return f.type && f.type !== _defaultSettings.ALL_FIELD_TYPES.geojson && (f.name === name || !filters.find(function (d) {
            return d.name === f.name && d.dataId === dataId;
          }));
        });
      }));
      return _this;
    }

    (0, _createClass2.default)(FilterPanel, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            datasets = _this$props.datasets,
            enlargeFilter = _this$props.enlargeFilter,
            filter = _this$props.filter,
            idx = _this$props.idx,
            isAnyFilterAnimating = _this$props.isAnyFilterAnimating,
            removeFilter = _this$props.removeFilter,
            _setFilter = _this$props.setFilter,
            toggleAnimation = _this$props.toggleAnimation;
        var name = filter.name,
            enlarged = filter.enlarged,
            type = filter.type,
            dataId = filter.dataId;
        var FilterComponent = type && Filters[_filterUtils.FILTER_COMPONENTS[type]];
        var allAvailableFields = this.availableFieldsSelector(this.props);
        return _react.default.createElement(StyledFilterPanel, {
          className: "filter-panel"
        }, _react.default.createElement(StyledFilterHeader, {
          className: "filter-panel__header",
          labelRCGColorValues: datasets[dataId].color
        }, _react.default.createElement("div", {
          style: {
            flexGrow: 1
          }
        }, _react.default.createElement(_fieldSelector.default, {
          inputTheme: "secondary",
          fields: allAvailableFields,
          value: name,
          erasable: false,
          onSelect: function onSelect(value) {
            return _setFilter(idx, 'name', value.name);
          }
        })), _react.default.createElement(_panelHeaderAction.default, {
          id: filter.id,
          tooltip: "delete",
          tooltipType: "error",
          onClick: removeFilter,
          hoverColor: 'errorColor',
          IconComponent: _icons.Trash
        }), type === _filterUtils.FILTER_TYPES.timeRange && _react.default.createElement(_panelHeaderAction.default, {
          id: filter.id,
          onClick: enlargeFilter,
          tooltip: "Time Playback",
          IconComponent: _icons.Clock,
          active: enlarged
        })), _react.default.createElement(StyledFilterContent, {
          className: "filter-panel__content"
        }, Object.keys(datasets).length > 1 && _react.default.createElement(_sourceDataSelector.default, {
          inputTheme: "secondary",
          datasets: datasets,
          disabled: filter.freeze,
          dataId: filter.dataId,
          onSelect: function onSelect(value) {
            return _setFilter(idx, 'dataId', value);
          }
        }), type && !enlarged && _react.default.createElement("div", {
          className: "filter-panel__filter"
        }, _react.default.createElement(FilterComponent, {
          filter: filter,
          idx: idx,
          isAnyFilterAnimating: isAnyFilterAnimating,
          toggleAnimation: toggleAnimation,
          setFilter: function setFilter(value) {
            return _setFilter(idx, 'value', value);
          }
        }))));
      }
    }]);
    return FilterPanel;
  }(_react.Component), (0, _defineProperty2.default)(_class, "propTypes", {
    idx: _propTypes.default.number,
    filters: _propTypes.default.arrayOf(_propTypes.default.any).isRequired,
    filter: _propTypes.default.object.isRequired,
    setFilter: _propTypes.default.func.isRequired,
    removeFilter: _propTypes.default.func.isRequired,
    enlargeFilter: _propTypes.default.func.isRequired,
    toggleAnimation: _propTypes.default.func.isRequired,
    datasets: _propTypes.default.object,
    showDatasetTable: _propTypes.default.func,
    isAnyFilterAnimating: _propTypes.default.bool
  }), _temp;
}

var _default = FilterPanelFactory;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvZmlsdGVyLXBhbmVsL2ZpbHRlci1wYW5lbC5qcyJdLCJuYW1lcyI6WyJTdHlsZWRGaWx0ZXJQYW5lbCIsInN0eWxlZCIsImRpdiIsIlN0eWxlZEZpbHRlckhlYWRlciIsIlN0eWxlZFBhbmVsSGVhZGVyIiwiZXh0ZW5kIiwiU3R5bGVkRmlsdGVyQ29udGVudCIsInByb3BzIiwidGhlbWUiLCJwYW5lbEJhY2tncm91bmQiLCJGaWx0ZXJQYW5lbEZhY3RvcnkiLCJmaWx0ZXIiLCJkYXRhSWQiLCJkYXRhc2V0cyIsImZpZWxkcyIsImZpbHRlcnMiLCJuYW1lIiwiZmllbGRzU2VsZWN0b3IiLCJmaWx0ZXJTZWxlY3RvciIsIm5hbWVTZWxlY3RvciIsImRhdGFJZFNlbGVjdG9yIiwiZiIsInR5cGUiLCJBTExfRklFTERfVFlQRVMiLCJnZW9qc29uIiwiZmluZCIsImQiLCJlbmxhcmdlRmlsdGVyIiwiaWR4IiwiaXNBbnlGaWx0ZXJBbmltYXRpbmciLCJyZW1vdmVGaWx0ZXIiLCJzZXRGaWx0ZXIiLCJ0b2dnbGVBbmltYXRpb24iLCJlbmxhcmdlZCIsIkZpbHRlckNvbXBvbmVudCIsIkZpbHRlcnMiLCJGSUxURVJfQ09NUE9ORU5UUyIsImFsbEF2YWlsYWJsZUZpZWxkcyIsImF2YWlsYWJsZUZpZWxkc1NlbGVjdG9yIiwiY29sb3IiLCJmbGV4R3JvdyIsInZhbHVlIiwiaWQiLCJUcmFzaCIsIkZJTFRFUl9UWVBFUyIsInRpbWVSYW5nZSIsIkNsb2NrIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsImZyZWV6ZSIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsIm51bWJlciIsImFycmF5T2YiLCJhbnkiLCJpc1JlcXVpcmVkIiwib2JqZWN0IiwiZnVuYyIsInNob3dEYXRhc2V0VGFibGUiLCJib29sIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FB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TWpCN0IsSUFBQUEsYUFBYSxFQUFFeUIsbUJBQVVNLElBQVYsQ0FBZUYsVUFOYjtBQU9qQnhCLElBQUFBLGVBQWUsRUFBRW9CLG1CQUFVTSxJQUFWLENBQWVGLFVBUGY7QUFRakIzQyxJQUFBQSxRQUFRLEVBQUV1QyxtQkFBVUssTUFSSDtBQVNqQkUsSUFBQUEsZ0JBQWdCLEVBQUVQLG1CQUFVTSxJQVRYO0FBVWpCN0IsSUFBQUEsb0JBQW9CLEVBQUV1QixtQkFBVVE7QUFWZixHQURyQjtBQThHRDs7ZUFFY2xELGtCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHtjcmVhdGVTZWxlY3Rvcn0gZnJvbSAncmVzZWxlY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgUGFuZWxIZWFkZXJBY3Rpb24gZnJvbSAnY29tcG9uZW50cy9zaWRlLXBhbmVsL3BhbmVsLWhlYWRlci1hY3Rpb24nO1xuaW1wb3J0IEZpZWxkU2VsZWN0b3IgZnJvbSAnY29tcG9uZW50cy9jb21tb24vZmllbGQtc2VsZWN0b3InO1xuaW1wb3J0IHtUcmFzaCwgQ2xvY2t9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ljb25zJztcbmltcG9ydCBTb3VyY2VEYXRhU2VsZWN0b3IgZnJvbSAnY29tcG9uZW50cy9zaWRlLXBhbmVsL3NvdXJjZS1kYXRhLXNlbGVjdG9yJztcbmltcG9ydCB7U3R5bGVkUGFuZWxIZWFkZXJ9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCAqIGFzIEZpbHRlcnMgZnJvbSAnY29tcG9uZW50cy9maWx0ZXJzJztcblxuaW1wb3J0IHtGSUxURVJfVFlQRVMsIEZJTFRFUl9DT01QT05FTlRTfSBmcm9tICd1dGlscy9maWx0ZXItdXRpbHMnO1xuaW1wb3J0IHtBTExfRklFTERfVFlQRVN9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcblxuY29uc3QgU3R5bGVkRmlsdGVyUGFuZWwgPSBzdHlsZWQuZGl2YFxuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuICBib3JkZXItcmFkaXVzOiAxcHg7XG5cbiAgLmZpbHRlci1wYW5lbF9fZmlsdGVyIHtcbiAgICBtYXJnaW4tdG9wOiAyNHB4O1xuICB9XG5gO1xuXG5jb25zdCBTdHlsZWRGaWx0ZXJIZWFkZXIgPSBTdHlsZWRQYW5lbEhlYWRlci5leHRlbmRgXG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgcGFkZGluZzogMTBweCAxMnB4O1xuYDtcblxuY29uc3QgU3R5bGVkRmlsdGVyQ29udGVudCA9IHN0eWxlZC5kaXZgXG4gIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxCYWNrZ3JvdW5kfTtcbiAgcGFkZGluZzogMTJweDtcbmA7XG5cbmZ1bmN0aW9uIEZpbHRlclBhbmVsRmFjdG9yeSgpIHtcbiAgcmV0dXJuIGNsYXNzIEZpbHRlclBhbmVsIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgaWR4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgZmlsdGVyczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSkuaXNSZXF1aXJlZCxcbiAgICAgIGZpbHRlcjogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgc2V0RmlsdGVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgcmVtb3ZlRmlsdGVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgZW5sYXJnZUZpbHRlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIHRvZ2dsZUFuaW1hdGlvbjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIGRhdGFzZXRzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgc2hvd0RhdGFzZXRUYWJsZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBpc0FueUZpbHRlckFuaW1hdGluZzogUHJvcFR5cGVzLmJvb2xcbiAgICB9O1xuXG4gICAgLyogc2VsZWN0b3JzICovXG4gICAgZmllbGRzU2VsZWN0b3IgPSBwcm9wcyA9PlxuICAgICAgKHByb3BzLmZpbHRlci5kYXRhSWQgJiYgcHJvcHMuZGF0YXNldHNbcHJvcHMuZmlsdGVyLmRhdGFJZF0uZmllbGRzKSB8fCBbXTtcbiAgICBmaWx0ZXJTZWxlY3RvciA9IHByb3BzID0+IHByb3BzLmZpbHRlcnM7XG4gICAgbmFtZVNlbGVjdG9yID0gcHJvcHMgPT4gcHJvcHMuZmlsdGVyLm5hbWU7XG4gICAgZGF0YUlkU2VsZWN0b3IgPSBwcm9wcyA9PiBwcm9wcy5maWx0ZXIuZGF0YUlkO1xuXG4gICAgLy8gb25seSBzaG93IGN1cnJlbnQgZmllbGQgYW5kIGZpZWxkIHRoYXQncyBub3QgYWxyZWFkeSBiZWVuIHVzZWQgYXMgYSBmaWx0ZXJcbiAgICBhdmFpbGFibGVGaWVsZHNTZWxlY3RvciA9IGNyZWF0ZVNlbGVjdG9yKFxuICAgICAgdGhpcy5maWVsZHNTZWxlY3RvcixcbiAgICAgIHRoaXMuZmlsdGVyU2VsZWN0b3IsXG4gICAgICB0aGlzLm5hbWVTZWxlY3RvcixcbiAgICAgIHRoaXMuZGF0YUlkU2VsZWN0b3IsXG4gICAgICAoZmllbGRzLCBmaWx0ZXJzLCBuYW1lLCBkYXRhSWQpID0+XG4gICAgICAgIGZpZWxkcy5maWx0ZXIoXG4gICAgICAgICAgZiA9PlxuICAgICAgICAgICAgZi50eXBlICYmXG4gICAgICAgICAgICBmLnR5cGUgIT09IEFMTF9GSUVMRF9UWVBFUy5nZW9qc29uICYmXG4gICAgICAgICAgICAoZi5uYW1lID09PSBuYW1lIHx8XG4gICAgICAgICAgICAgICFmaWx0ZXJzLmZpbmQoZCA9PiBkLm5hbWUgPT09IGYubmFtZSAmJiBkLmRhdGFJZCA9PT0gZGF0YUlkKSlcbiAgICAgICAgKVxuICAgICk7XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGRhdGFzZXRzLFxuICAgICAgICBlbmxhcmdlRmlsdGVyLFxuICAgICAgICBmaWx0ZXIsXG4gICAgICAgIGlkeCxcbiAgICAgICAgaXNBbnlGaWx0ZXJBbmltYXRpbmcsXG4gICAgICAgIHJlbW92ZUZpbHRlcixcbiAgICAgICAgc2V0RmlsdGVyLFxuICAgICAgICB0b2dnbGVBbmltYXRpb25cbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3Qge25hbWUsIGVubGFyZ2VkLCB0eXBlLCBkYXRhSWR9ID0gZmlsdGVyO1xuICAgICAgY29uc3QgRmlsdGVyQ29tcG9uZW50ID0gdHlwZSAmJiBGaWx0ZXJzW0ZJTFRFUl9DT01QT05FTlRTW3R5cGVdXTtcbiAgICAgIGNvbnN0IGFsbEF2YWlsYWJsZUZpZWxkcyA9IHRoaXMuYXZhaWxhYmxlRmllbGRzU2VsZWN0b3IodGhpcy5wcm9wcyk7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxTdHlsZWRGaWx0ZXJQYW5lbCBjbGFzc05hbWU9XCJmaWx0ZXItcGFuZWxcIj5cbiAgICAgICAgICA8U3R5bGVkRmlsdGVySGVhZGVyIGNsYXNzTmFtZT1cImZpbHRlci1wYW5lbF9faGVhZGVyXCJcbiAgICAgICAgICAgIGxhYmVsUkNHQ29sb3JWYWx1ZXM9e2RhdGFzZXRzW2RhdGFJZF0uY29sb3J9PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17e2ZsZXhHcm93OiAxfX0+XG4gICAgICAgICAgICAgIDxGaWVsZFNlbGVjdG9yXG4gICAgICAgICAgICAgICAgaW5wdXRUaGVtZT1cInNlY29uZGFyeVwiXG4gICAgICAgICAgICAgICAgZmllbGRzPXthbGxBdmFpbGFibGVGaWVsZHN9XG4gICAgICAgICAgICAgICAgdmFsdWU9e25hbWV9XG4gICAgICAgICAgICAgICAgZXJhc2FibGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgIG9uU2VsZWN0PXt2YWx1ZSA9PiBzZXRGaWx0ZXIoaWR4LCAnbmFtZScsIHZhbHVlLm5hbWUpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8UGFuZWxIZWFkZXJBY3Rpb25cbiAgICAgICAgICAgICAgaWQ9e2ZpbHRlci5pZH1cbiAgICAgICAgICAgICAgdG9vbHRpcD1cImRlbGV0ZVwiXG4gICAgICAgICAgICAgIHRvb2x0aXBUeXBlPVwiZXJyb3JcIlxuICAgICAgICAgICAgICBvbkNsaWNrPXtyZW1vdmVGaWx0ZXJ9XG4gICAgICAgICAgICAgIGhvdmVyQ29sb3I9eydlcnJvckNvbG9yJ31cbiAgICAgICAgICAgICAgSWNvbkNvbXBvbmVudD17VHJhc2h9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAge3R5cGUgPT09IEZJTFRFUl9UWVBFUy50aW1lUmFuZ2UgJiYgKFxuICAgICAgICAgICAgICA8UGFuZWxIZWFkZXJBY3Rpb25cbiAgICAgICAgICAgICAgICBpZD17ZmlsdGVyLmlkfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2VubGFyZ2VGaWx0ZXJ9XG4gICAgICAgICAgICAgICAgdG9vbHRpcD1cIlRpbWUgUGxheWJhY2tcIlxuICAgICAgICAgICAgICAgIEljb25Db21wb25lbnQ9e0Nsb2NrfVxuICAgICAgICAgICAgICAgIGFjdGl2ZT17ZW5sYXJnZWR9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvU3R5bGVkRmlsdGVySGVhZGVyPlxuICAgICAgICAgIDxTdHlsZWRGaWx0ZXJDb250ZW50IGNsYXNzTmFtZT1cImZpbHRlci1wYW5lbF9fY29udGVudFwiPlxuICAgICAgICAgICAge09iamVjdC5rZXlzKGRhdGFzZXRzKS5sZW5ndGggPiAxICYmIChcbiAgICAgICAgICAgICAgPFNvdXJjZURhdGFTZWxlY3RvclxuICAgICAgICAgICAgICAgIGlucHV0VGhlbWU9XCJzZWNvbmRhcnlcIlxuICAgICAgICAgICAgICAgIGRhdGFzZXRzPXtkYXRhc2V0c31cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZmlsdGVyLmZyZWV6ZX1cbiAgICAgICAgICAgICAgICBkYXRhSWQ9e2ZpbHRlci5kYXRhSWR9XG4gICAgICAgICAgICAgICAgb25TZWxlY3Q9e3ZhbHVlID0+IHNldEZpbHRlcihpZHgsICdkYXRhSWQnLCB2YWx1ZSl9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge3R5cGUgJiZcbiAgICAgICAgICAgICFlbmxhcmdlZCAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLXBhbmVsX19maWx0ZXJcIj5cbiAgICAgICAgICAgICAgICA8RmlsdGVyQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICBmaWx0ZXI9e2ZpbHRlcn1cbiAgICAgICAgICAgICAgICAgIGlkeD17aWR4fVxuICAgICAgICAgICAgICAgICAgaXNBbnlGaWx0ZXJBbmltYXRpbmc9e2lzQW55RmlsdGVyQW5pbWF0aW5nfVxuICAgICAgICAgICAgICAgICAgdG9nZ2xlQW5pbWF0aW9uPXt0b2dnbGVBbmltYXRpb259XG4gICAgICAgICAgICAgICAgICBzZXRGaWx0ZXI9e3ZhbHVlID0+IHNldEZpbHRlcihpZHgsICd2YWx1ZScsIHZhbHVlKX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9TdHlsZWRGaWx0ZXJDb250ZW50PlxuICAgICAgICA8L1N0eWxlZEZpbHRlclBhbmVsPlxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRmlsdGVyUGFuZWxGYWN0b3J5O1xuIl19