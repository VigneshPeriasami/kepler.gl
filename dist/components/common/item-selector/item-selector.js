"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

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

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash.uniq"));

var _reactOnclickoutside = _interopRequireDefault(require("react-onclickoutside"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _accessor = _interopRequireDefault(require("./accessor"));

var _chickletedInput = _interopRequireDefault(require("./chickleted-input"));

var _typeahead = _interopRequireDefault(require("./typeahead"));

var _icons = require("../icons");

var _dropdownList = _interopRequireWildcard(require("./dropdown-list"));

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  background: ", ";\n  border: 0;\n  width: 100%;\n  left: 0;\n  z-index: 100;\n  position: absolute;\n  bottom: ", ";\n  margin-top: ", ";\n  margin-bottom: ", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin-left: 6px;\n  display: flex;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  overflow: hidden;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  ", ";\n\n  .list__item__anchor {\n    ", ";\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

/**
 * Converts non-arrays to arrays.  Leaves arrays alone.  Converts
 * undefined values to empty arrays ([] instead of [undefined]).
 * Otherwise, just returns [item] for non-array items.
 *
 * @param {*} item
 * @returns {array} boom! much array. very indexed. so useful.
 */
function _toArray(item) {
  if (Array.isArray(item)) {
    return item;
  }

  if (typeof item === 'undefined' || item === null) {
    return [];
  }

  return [item];
}

var StyledDropdownSelect = _styledComponents.default.div(_templateObject(), function (props) {
  return props.inputTheme === 'secondary' ? props.theme.secondaryInput : props.theme.input;
}, function (props) {
  return props.theme.dropdownListAnchor;
});

var DropdownSelectValue = _styledComponents.default.span(_templateObject2(), function (props) {
  return props.placeholder ? props.theme.selectColorPlaceHolder : props.theme.selectColor;
});

var DropdownSelectErase = _styledComponents.default.div(_templateObject3());

var DropdownWrapper = _styledComponents.default.div(_templateObject4(), function (props) {
  return props.theme.dropdownBgd;
}, function (props) {
  return props.placement === 'top' ? props.theme.inputBoxHeight : 'auto';
}, function (props) {
  return props.placement === 'bottom' ? '4px' : 'auto';
}, function (props) {
  return props.placement === 'top' ? '4px' : 'auto';
});

var ItemSelector =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ItemSelector, _Component);

  function ItemSelector() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, ItemSelector);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(ItemSelector)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      showTypeahead: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleClickOutside", function () {
      _this._hideTypeahead();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_onBlur", function () {
      // note: chickleted input is not a real form element so we call onBlur()
      // when we feel the events are appropriate
      if (_this.props.onBlur) {
        _this.props.onBlur();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_removeItem", function (item, e) {
      // only used when multiSelect = true
      e.preventDefault();
      e.stopPropagation();
      var selectedItems = _this.props.selectedItems;
      var index = selectedItems.findIndex(function (t) {
        return t === item;
      });

      if (index < 0) {
        return;
      }

      var items = [].concat((0, _toConsumableArray2.default)(selectedItems.slice(0, index)), (0, _toConsumableArray2.default)(selectedItems.slice(index + 1, selectedItems.length)));

      _this.props.onChange(items);

      if (_this.props.closeOnSelect) {
        _this.setState({
          showTypeahead: false
        });

        _this._onBlur();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_selectItem", function (item) {
      var getValue = _accessor.default.generateOptionToStringFor(_this.props.getOptionValue || _this.props.displayOption);

      var previousSelected = _toArray(_this.props.selectedItems);

      if (_this.props.multiSelect) {
        var items = (0, _lodash.default)(previousSelected.concat(_toArray(item).map(getValue)));

        _this.props.onChange(items);
      } else {
        _this.props.onChange(getValue(item));
      }

      if (_this.props.closeOnSelect) {
        _this.setState({
          showTypeahead: false
        });

        _this._onBlur();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_onErase", function (e) {
      e.stopPropagation();

      _this.props.onChange(null);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_showTypeahead", function () {
      if (!_this.props.disabled) {
        _this.setState({
          showTypeahead: true
        });
      }
    });
    return _this;
  }

  (0, _createClass2.default)(ItemSelector, [{
    key: "_hideTypeahead",
    value: function _hideTypeahead() {
      this.setState({
        showTypeahead: false
      });

      this._onBlur();
    }
  }, {
    key: "_renderDropdown",
    value: function _renderDropdown() {
      return _react.default.createElement(DropdownWrapper, {
        placement: this.props.placement
      }, _react.default.createElement(_typeahead.default, {
        customClasses: {
          results: 'list-selector',
          input: 'typeahead__input',
          listItem: 'list__item',
          listAnchor: 'list__item__anchor'
        },
        options: this.props.options,
        filterOption: this.props.filterOption,
        fixedOptions: this.props.fixedOptions,
        placeholder: "Search",
        onOptionSelected: this._selectItem,
        customListComponent: this.props.DropDownRenderComponent,
        customListHeaderComponent: this.props.DropdownHeaderComponent,
        customListItemComponent: this.props.DropDownLineItemRenderComponent,
        displayOption: _accessor.default.generateOptionToStringFor(this.props.displayOption),
        searchable: this.props.searchable,
        showOptionsWhenEmpty: true,
        selectedItems: _toArray(this.props.selectedItems)
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var selected = _toArray(this.props.selectedItems);

      var hasValue = selected.length;

      var displayOption = _accessor.default.generateOptionToStringFor(this.props.displayOption);

      var dropdownSelectProps = {
        className: (0, _classnames.default)("item-selector__dropdown", {
          active: this.state.showTypeahead
        }),
        disabled: this.props.disabled,
        onClick: this._showTypeahead,
        onFocus: this._showPopover,
        error: this.props.isError,
        inputTheme: this.props.inputTheme
      };
      return _react.default.createElement("div", {
        className: "item-selector"
      }, _react.default.createElement("div", {
        style: {
          position: 'relative'
        }
      }, this.props.multiSelect ? _react.default.createElement(_chickletedInput.default, (0, _extends2.default)({}, dropdownSelectProps, {
        selectedItems: _toArray(this.props.selectedItems),
        placeholder: this.props.placeholder,
        displayOption: displayOption,
        removeItem: this._removeItem
      })) : _react.default.createElement(StyledDropdownSelect, dropdownSelectProps, _react.default.createElement(DropdownSelectValue, {
        placeholder: !hasValue
      }, hasValue ? _react.default.createElement(this.props.DropDownLineItemRenderComponent, {
        displayOption: displayOption,
        value: selected[0]
      }) : this.props.placeholder), this.props.erasable && hasValue ? _react.default.createElement(DropdownSelectErase, null, _react.default.createElement(_icons.Delete, {
        height: "12px",
        onClick: this._onErase
      })) : null), this.state.showTypeahead && this._renderDropdown()));
    }
  }]);
  return ItemSelector;
}(_react.Component);

(0, _defineProperty2.default)(ItemSelector, "propTypes", {
  // required properties
  selectedItems: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.string, _propTypes.default.number, _propTypes.default.bool, _propTypes.default.object]),
  onChange: _propTypes.default.func.isRequired,
  options: _propTypes.default.arrayOf(_propTypes.default.any).isRequired,
  // optional properties
  fixedOptions: _propTypes.default.arrayOf(_propTypes.default.any),
  erasable: _propTypes.default.bool,
  displayOption: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  getOptionValue: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  filterOption: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  placement: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  isError: _propTypes.default.bool,
  multiSelect: _propTypes.default.bool,
  inputTheme: _propTypes.default.string,
  onBlur: _propTypes.default.func,
  placeholder: _propTypes.default.string,
  closeOnSelect: _propTypes.default.bool,
  DropdownHeaderComponent: _propTypes.default.func,
  DropDownRenderComponent: _propTypes.default.func,
  DropDownLineItemRenderComponent: _propTypes.default.func
});
(0, _defineProperty2.default)(ItemSelector, "defaultProps", {
  erasable: false,
  placement: 'bottom',
  selectedItems: [],
  displayOption: null,
  getOptionValue: null,
  filterOption: null,
  fixedOptions: null,
  inputTheme: 'primary',
  multiSelect: true,
  placeholder: 'Enter a value',
  closeOnSelect: true,
  searchable: true,
  dropdownHeader: null,
  DropdownHeaderComponent: null,
  DropDownRenderComponent: _dropdownList.default,
  DropDownLineItemRenderComponent: _dropdownList.ListItem
});
;

var _default = (0, _reactOnclickoutside.default)(ItemSelector);

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9pdGVtLXNlbGVjdG9yL2l0ZW0tc2VsZWN0b3IuanMiXSwibmFtZXMiOlsiX3RvQXJyYXkiLCJpdGVtIiwiQXJyYXkiLCJpc0FycmF5IiwiU3R5bGVkRHJvcGRvd25TZWxlY3QiLCJzdHlsZWQiLCJkaXYiLCJwcm9wcyIsImlucHV0VGhlbWUiLCJ0aGVtZSIsInNlY29uZGFyeUlucHV0IiwiaW5wdXQiLCJkcm9wZG93bkxpc3RBbmNob3IiLCJEcm9wZG93blNlbGVjdFZhbHVlIiwic3BhbiIsInBsYWNlaG9sZGVyIiwic2VsZWN0Q29sb3JQbGFjZUhvbGRlciIsInNlbGVjdENvbG9yIiwiRHJvcGRvd25TZWxlY3RFcmFzZSIsIkRyb3Bkb3duV3JhcHBlciIsImRyb3Bkb3duQmdkIiwicGxhY2VtZW50IiwiaW5wdXRCb3hIZWlnaHQiLCJJdGVtU2VsZWN0b3IiLCJzaG93VHlwZWFoZWFkIiwiX2hpZGVUeXBlYWhlYWQiLCJvbkJsdXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCJzZWxlY3RlZEl0ZW1zIiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJ0IiwiaXRlbXMiLCJzbGljZSIsImxlbmd0aCIsIm9uQ2hhbmdlIiwiY2xvc2VPblNlbGVjdCIsInNldFN0YXRlIiwiX29uQmx1ciIsImdldFZhbHVlIiwiQWNjZXNzb3IiLCJnZW5lcmF0ZU9wdGlvblRvU3RyaW5nRm9yIiwiZ2V0T3B0aW9uVmFsdWUiLCJkaXNwbGF5T3B0aW9uIiwicHJldmlvdXNTZWxlY3RlZCIsIm11bHRpU2VsZWN0IiwiY29uY2F0IiwibWFwIiwiZGlzYWJsZWQiLCJyZXN1bHRzIiwibGlzdEl0ZW0iLCJsaXN0QW5jaG9yIiwib3B0aW9ucyIsImZpbHRlck9wdGlvbiIsImZpeGVkT3B0aW9ucyIsIl9zZWxlY3RJdGVtIiwiRHJvcERvd25SZW5kZXJDb21wb25lbnQiLCJEcm9wZG93bkhlYWRlckNvbXBvbmVudCIsIkRyb3BEb3duTGluZUl0ZW1SZW5kZXJDb21wb25lbnQiLCJzZWFyY2hhYmxlIiwic2VsZWN0ZWQiLCJoYXNWYWx1ZSIsImRyb3Bkb3duU2VsZWN0UHJvcHMiLCJjbGFzc05hbWUiLCJhY3RpdmUiLCJzdGF0ZSIsIm9uQ2xpY2siLCJfc2hvd1R5cGVhaGVhZCIsIm9uRm9jdXMiLCJfc2hvd1BvcG92ZXIiLCJlcnJvciIsImlzRXJyb3IiLCJwb3NpdGlvbiIsIl9yZW1vdmVJdGVtIiwiZXJhc2FibGUiLCJfb25FcmFzZSIsIl9yZW5kZXJEcm9wZG93biIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsIm9uZU9mVHlwZSIsImFycmF5Iiwic3RyaW5nIiwibnVtYmVyIiwiYm9vbCIsIm9iamVjdCIsImZ1bmMiLCJpc1JlcXVpcmVkIiwiYXJyYXlPZiIsImFueSIsImRyb3Bkb3duSGVhZGVyIiwiRHJvcGRvd25MaXN0IiwiTGlzdEl0ZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOzs7Ozs7OztBQVFBLFNBQVNBLFFBQVQsQ0FBa0JDLElBQWxCLEVBQXdCO0FBQ3RCLE1BQUlDLEtBQUssQ0FBQ0MsT0FBTixDQUFjRixJQUFkLENBQUosRUFBeUI7QUFDdkIsV0FBT0EsSUFBUDtBQUNEOztBQUVELE1BQUksT0FBT0EsSUFBUCxLQUFnQixXQUFoQixJQUErQkEsSUFBSSxLQUFLLElBQTVDLEVBQWtEO0FBQ2hELFdBQU8sRUFBUDtBQUNEOztBQUVELFNBQU8sQ0FBQ0EsSUFBRCxDQUFQO0FBQ0Q7O0FBRUQsSUFBTUcsb0JBQW9CLEdBQUdDLDBCQUFPQyxHQUFWLG9CQUN0QixVQUFBQyxLQUFLO0FBQUEsU0FDTEEsS0FBSyxDQUFDQyxVQUFOLEtBQXFCLFdBQXJCLEdB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cm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHVuaXEgZnJvbSAnbG9kYXNoLnVuaXEnO1xuaW1wb3J0IGxpc3RlbnNUb0NsaWNrT3V0c2lkZSBmcm9tICdyZWFjdC1vbmNsaWNrb3V0c2lkZSc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IEFjY2Vzc29yIGZyb20gJy4vYWNjZXNzb3InO1xuaW1wb3J0IENoaWNrbGV0ZWRJbnB1dCBmcm9tICcuL2NoaWNrbGV0ZWQtaW5wdXQnO1xuaW1wb3J0IFR5cGVhaGVhZCBmcm9tICcuL3R5cGVhaGVhZCc7XG5pbXBvcnQge0RlbGV0ZX0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vaWNvbnMnO1xuaW1wb3J0IERyb3Bkb3duTGlzdCwge0xpc3RJdGVtfSBmcm9tICcuL2Ryb3Bkb3duLWxpc3QnO1xuXG4vKipcbiAqIENvbnZlcnRzIG5vbi1hcnJheXMgdG8gYXJyYXlzLiAgTGVhdmVzIGFycmF5cyBhbG9uZS4gIENvbnZlcnRzXG4gKiB1bmRlZmluZWQgdmFsdWVzIHRvIGVtcHR5IGFycmF5cyAoW10gaW5zdGVhZCBvZiBbdW5kZWZpbmVkXSkuXG4gKiBPdGhlcndpc2UsIGp1c3QgcmV0dXJucyBbaXRlbV0gZm9yIG5vbi1hcnJheSBpdGVtcy5cbiAqXG4gKiBAcGFyYW0geyp9IGl0ZW1cbiAqIEByZXR1cm5zIHthcnJheX0gYm9vbSEgbXVjaCBhcnJheS4gdmVyeSBpbmRleGVkLiBzbyB1c2VmdWwuXG4gKi9cbmZ1bmN0aW9uIF90b0FycmF5KGl0ZW0pIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcbiAgICByZXR1cm4gaXRlbTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgaXRlbSA9PT0gJ3VuZGVmaW5lZCcgfHwgaXRlbSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHJldHVybiBbaXRlbV07XG59XG5cbmNvbnN0IFN0eWxlZERyb3Bkb3duU2VsZWN0ID0gc3R5bGVkLmRpdmBcbiAgJHtwcm9wcyA9PlxuICAgIHByb3BzLmlucHV0VGhlbWUgPT09ICdzZWNvbmRhcnknXG4gICAgICA/IHByb3BzLnRoZW1lLnNlY29uZGFyeUlucHV0XG4gICAgICA6IHByb3BzLnRoZW1lLmlucHV0fTtcblxuICAubGlzdF9faXRlbV9fYW5jaG9yIHtcbiAgICAke3Byb3BzID0+IHByb3BzLnRoZW1lLmRyb3Bkb3duTGlzdEFuY2hvcn07XG4gIH1cbmA7XG5cbmNvbnN0IERyb3Bkb3duU2VsZWN0VmFsdWUgPSBzdHlsZWQuc3BhbmBcbiAgY29sb3I6ICR7cHJvcHMgPT5cbiAgICBwcm9wcy5wbGFjZWhvbGRlclxuICAgICAgPyBwcm9wcy50aGVtZS5zZWxlY3RDb2xvclBsYWNlSG9sZGVyXG4gICAgICA6IHByb3BzLnRoZW1lLnNlbGVjdENvbG9yfTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbmA7XG5cbmNvbnN0IERyb3Bkb3duU2VsZWN0RXJhc2UgPSBzdHlsZWQuZGl2YFxuICBtYXJnaW4tbGVmdDogNnB4O1xuICBkaXNwbGF5OiBmbGV4O1xuYDtcblxuY29uc3QgRHJvcGRvd25XcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgYmFja2dyb3VuZDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5kcm9wZG93bkJnZH07XG4gIGJvcmRlcjogMDtcbiAgd2lkdGg6IDEwMCU7XG4gIGxlZnQ6IDA7XG4gIHotaW5kZXg6IDEwMDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206ICR7cHJvcHMgPT5cbiAgICBwcm9wcy5wbGFjZW1lbnQgPT09ICd0b3AnID8gcHJvcHMudGhlbWUuaW5wdXRCb3hIZWlnaHQgOiAnYXV0byd9O1xuICBtYXJnaW4tdG9wOiAke3Byb3BzID0+IChwcm9wcy5wbGFjZW1lbnQgPT09ICdib3R0b20nID8gJzRweCcgOiAnYXV0bycpfTtcbiAgbWFyZ2luLWJvdHRvbTogJHtwcm9wcyA9PiAocHJvcHMucGxhY2VtZW50ID09PSAndG9wJyA/ICc0cHgnIDogJ2F1dG8nKX07XG5gO1xuXG5jbGFzcyBJdGVtU2VsZWN0b3IgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIC8vIHJlcXVpcmVkIHByb3BlcnRpZXNcbiAgICBzZWxlY3RlZEl0ZW1zOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5hcnJheSxcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgUHJvcFR5cGVzLmJvb2wsXG4gICAgICBQcm9wVHlwZXMub2JqZWN0XG4gICAgXSksXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb3B0aW9uczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSkuaXNSZXF1aXJlZCxcblxuICAgIC8vIG9wdGlvbmFsIHByb3BlcnRpZXNcbiAgICBmaXhlZE9wdGlvbnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLFxuICAgIGVyYXNhYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkaXNwbGF5T3B0aW9uOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZnVuY10pLFxuICAgIGdldE9wdGlvblZhbHVlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZnVuY10pLFxuICAgIGZpbHRlck9wdGlvbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmZ1bmNdKSxcbiAgICBwbGFjZW1lbnQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGlzRXJyb3I6IFByb3BUeXBlcy5ib29sLFxuICAgIG11bHRpU2VsZWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBpbnB1dFRoZW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uQmx1cjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2xvc2VPblNlbGVjdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgRHJvcGRvd25IZWFkZXJDb21wb25lbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIERyb3BEb3duUmVuZGVyQ29tcG9uZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBEcm9wRG93bkxpbmVJdGVtUmVuZGVyQ29tcG9uZW50OiBQcm9wVHlwZXMuZnVuY1xuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgZXJhc2FibGU6IGZhbHNlLFxuICAgIHBsYWNlbWVudDogJ2JvdHRvbScsXG4gICAgc2VsZWN0ZWRJdGVtczogW10sXG4gICAgZGlzcGxheU9wdGlvbjogbnVsbCxcbiAgICBnZXRPcHRpb25WYWx1ZTogbnVsbCxcbiAgICBmaWx0ZXJPcHRpb246IG51bGwsXG4gICAgZml4ZWRPcHRpb25zOiBudWxsLFxuICAgIGlucHV0VGhlbWU6ICdwcmltYXJ5JyxcbiAgICBtdWx0aVNlbGVjdDogdHJ1ZSxcbiAgICBwbGFjZWhvbGRlcjogJ0VudGVyIGEgdmFsdWUnLFxuICAgIGNsb3NlT25TZWxlY3Q6IHRydWUsXG4gICAgc2VhcmNoYWJsZTogdHJ1ZSxcbiAgICBkcm9wZG93bkhlYWRlcjogbnVsbCxcbiAgICBEcm9wZG93bkhlYWRlckNvbXBvbmVudDogbnVsbCxcbiAgICBEcm9wRG93blJlbmRlckNvbXBvbmVudDogRHJvcGRvd25MaXN0LFxuICAgIERyb3BEb3duTGluZUl0ZW1SZW5kZXJDb21wb25lbnQ6IExpc3RJdGVtXG4gIH07XG5cbiAgc3RhdGUgPSB7XG4gICAgc2hvd1R5cGVhaGVhZDogZmFsc2VcbiAgfTtcblxuICBoYW5kbGVDbGlja091dHNpZGUgPSAoKSA9PiB7XG4gICAgdGhpcy5faGlkZVR5cGVhaGVhZCgpO1xuICB9O1xuXG4gIF9oaWRlVHlwZWFoZWFkKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe3Nob3dUeXBlYWhlYWQ6IGZhbHNlfSk7XG4gICAgdGhpcy5fb25CbHVyKCk7XG4gIH1cblxuICBfb25CbHVyID0gKCkgPT4ge1xuICAgIC8vIG5vdGU6IGNoaWNrbGV0ZWQgaW5wdXQgaXMgbm90IGEgcmVhbCBmb3JtIGVsZW1lbnQgc28gd2UgY2FsbCBvbkJsdXIoKVxuICAgIC8vIHdoZW4gd2UgZmVlbCB0aGUgZXZlbnRzIGFyZSBhcHByb3ByaWF0ZVxuICAgIGlmICh0aGlzLnByb3BzLm9uQmx1cikge1xuICAgICAgdGhpcy5wcm9wcy5vbkJsdXIoKTtcbiAgICB9XG4gIH07XG5cbiAgX3JlbW92ZUl0ZW0gPSAoaXRlbSwgZSkgPT4ge1xuICAgIC8vIG9ubHkgdXNlZCB3aGVuIG11bHRpU2VsZWN0ID0gdHJ1ZVxuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGNvbnN0IHtzZWxlY3RlZEl0ZW1zfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaW5kZXggPSBzZWxlY3RlZEl0ZW1zLmZpbmRJbmRleCh0ID0+IHQgPT09IGl0ZW0pO1xuXG4gICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGl0ZW1zID0gW1xuICAgICAgLi4uc2VsZWN0ZWRJdGVtcy5zbGljZSgwLCBpbmRleCksXG4gICAgICAuLi5zZWxlY3RlZEl0ZW1zLnNsaWNlKGluZGV4ICsgMSwgc2VsZWN0ZWRJdGVtcy5sZW5ndGgpXG4gICAgXTtcblxuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoaXRlbXMpO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPblNlbGVjdCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7c2hvd1R5cGVhaGVhZDogZmFsc2V9KTtcbiAgICAgIHRoaXMuX29uQmx1cigpO1xuICAgIH1cbiAgfTtcblxuICBfc2VsZWN0SXRlbSA9IGl0ZW0gPT4ge1xuICAgIGNvbnN0IGdldFZhbHVlID0gQWNjZXNzb3IuZ2VuZXJhdGVPcHRpb25Ub1N0cmluZ0ZvcihcbiAgICAgIHRoaXMucHJvcHMuZ2V0T3B0aW9uVmFsdWUgfHwgdGhpcy5wcm9wcy5kaXNwbGF5T3B0aW9uXG4gICAgKTtcblxuICAgIGNvbnN0IHByZXZpb3VzU2VsZWN0ZWQgPSBfdG9BcnJheSh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMpO1xuXG4gICAgaWYgKHRoaXMucHJvcHMubXVsdGlTZWxlY3QpIHtcbiAgICAgIGNvbnN0IGl0ZW1zID0gdW5pcShwcmV2aW91c1NlbGVjdGVkLmNvbmNhdChfdG9BcnJheShpdGVtKS5tYXAoZ2V0VmFsdWUpKSk7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGl0ZW1zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShnZXRWYWx1ZShpdGVtKSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPblNlbGVjdCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7c2hvd1R5cGVhaGVhZDogZmFsc2V9KTtcbiAgICAgIHRoaXMuX29uQmx1cigpO1xuICAgIH1cbiAgfTtcblxuICBfb25FcmFzZSA9IGUgPT4ge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZShudWxsKTtcbiAgfTtcblxuICBfc2hvd1R5cGVhaGVhZCA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBzaG93VHlwZWFoZWFkOiB0cnVlXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgX3JlbmRlckRyb3Bkb3duKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8RHJvcGRvd25XcmFwcGVyIHBsYWNlbWVudD17dGhpcy5wcm9wcy5wbGFjZW1lbnR9PlxuICAgICAgICA8VHlwZWFoZWFkXG4gICAgICAgICAgY3VzdG9tQ2xhc3Nlcz17e1xuICAgICAgICAgICAgcmVzdWx0czogJ2xpc3Qtc2VsZWN0b3InLFxuICAgICAgICAgICAgaW5wdXQ6ICd0eXBlYWhlYWRfX2lucHV0JyxcbiAgICAgICAgICAgIGxpc3RJdGVtOiAnbGlzdF9faXRlbScsXG4gICAgICAgICAgICBsaXN0QW5jaG9yOiAnbGlzdF9faXRlbV9fYW5jaG9yJ1xuICAgICAgICAgIH19XG4gICAgICAgICAgb3B0aW9ucz17dGhpcy5wcm9wcy5vcHRpb25zfVxuICAgICAgICAgIGZpbHRlck9wdGlvbj17dGhpcy5wcm9wcy5maWx0ZXJPcHRpb259XG4gICAgICAgICAgZml4ZWRPcHRpb25zPXt0aGlzLnByb3BzLmZpeGVkT3B0aW9uc31cbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiXG4gICAgICAgICAgb25PcHRpb25TZWxlY3RlZD17dGhpcy5fc2VsZWN0SXRlbX1cbiAgICAgICAgICBjdXN0b21MaXN0Q29tcG9uZW50PXt0aGlzLnByb3BzLkRyb3BEb3duUmVuZGVyQ29tcG9uZW50fVxuICAgICAgICAgIGN1c3RvbUxpc3RIZWFkZXJDb21wb25lbnQ9e3RoaXMucHJvcHMuRHJvcGRvd25IZWFkZXJDb21wb25lbnR9XG4gICAgICAgICAgY3VzdG9tTGlzdEl0ZW1Db21wb25lbnQ9e3RoaXMucHJvcHMuRHJvcERvd25MaW5lSXRlbVJlbmRlckNvbXBvbmVudH1cbiAgICAgICAgICBkaXNwbGF5T3B0aW9uPXtBY2Nlc3Nvci5nZW5lcmF0ZU9wdGlvblRvU3RyaW5nRm9yKFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5kaXNwbGF5T3B0aW9uXG4gICAgICAgICAgKX1cbiAgICAgICAgICBzZWFyY2hhYmxlPXt0aGlzLnByb3BzLnNlYXJjaGFibGV9XG4gICAgICAgICAgc2hvd09wdGlvbnNXaGVuRW1wdHlcbiAgICAgICAgICBzZWxlY3RlZEl0ZW1zPXtfdG9BcnJheSh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMpfVxuICAgICAgICAvPlxuICAgICAgPC9Ecm9wZG93bldyYXBwZXI+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBzZWxlY3RlZCA9IF90b0FycmF5KHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcyk7XG4gICAgY29uc3QgaGFzVmFsdWUgPSBzZWxlY3RlZC5sZW5ndGg7XG4gICAgY29uc3QgZGlzcGxheU9wdGlvbiA9IEFjY2Vzc29yLmdlbmVyYXRlT3B0aW9uVG9TdHJpbmdGb3IoXG4gICAgICB0aGlzLnByb3BzLmRpc3BsYXlPcHRpb25cbiAgICApO1xuXG4gICAgY29uc3QgZHJvcGRvd25TZWxlY3RQcm9wcyA9IHtcbiAgICAgIGNsYXNzTmFtZTogY2xhc3NuYW1lcyhgaXRlbS1zZWxlY3Rvcl9fZHJvcGRvd25gLCB7XG4gICAgICAgIGFjdGl2ZTogdGhpcy5zdGF0ZS5zaG93VHlwZWFoZWFkXG4gICAgICB9KSxcbiAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkLFxuICAgICAgb25DbGljazogdGhpcy5fc2hvd1R5cGVhaGVhZCxcbiAgICAgIG9uRm9jdXM6IHRoaXMuX3Nob3dQb3BvdmVyLFxuICAgICAgZXJyb3I6IHRoaXMucHJvcHMuaXNFcnJvcixcbiAgICAgIGlucHV0VGhlbWU6IHRoaXMucHJvcHMuaW5wdXRUaGVtZVxuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJpdGVtLXNlbGVjdG9yXCI+XG4gICAgICAgIDxkaXYgc3R5bGU9e3twb3NpdGlvbjogJ3JlbGF0aXZlJ319PlxuICAgICAgICAgIHsvKiB0aGlzIHBhcnQgaXMgdXNlZCB0byBkaXNwbGF5IHRoZSBsYWJlbCAqL31cbiAgICAgICAgICB7dGhpcy5wcm9wcy5tdWx0aVNlbGVjdCA/IChcbiAgICAgICAgICAgIDxDaGlja2xldGVkSW5wdXRcbiAgICAgICAgICAgICAgey4uLmRyb3Bkb3duU2VsZWN0UHJvcHN9XG4gICAgICAgICAgICAgIHNlbGVjdGVkSXRlbXM9e190b0FycmF5KHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcyl9XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXt0aGlzLnByb3BzLnBsYWNlaG9sZGVyfVxuICAgICAgICAgICAgICBkaXNwbGF5T3B0aW9uPXtkaXNwbGF5T3B0aW9ufVxuICAgICAgICAgICAgICByZW1vdmVJdGVtPXt0aGlzLl9yZW1vdmVJdGVtfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPFN0eWxlZERyb3Bkb3duU2VsZWN0IHsuLi5kcm9wZG93blNlbGVjdFByb3BzfT5cbiAgICAgICAgICAgICAgPERyb3Bkb3duU2VsZWN0VmFsdWUgcGxhY2Vob2xkZXI9eyFoYXNWYWx1ZX0+XG4gICAgICAgICAgICAgICAge2hhc1ZhbHVlID8gKFxuICAgICAgICAgICAgICAgICAgPHRoaXMucHJvcHMuRHJvcERvd25MaW5lSXRlbVJlbmRlckNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5T3B0aW9uPXtkaXNwbGF5T3B0aW9ufVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRbMF19XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnBsYWNlaG9sZGVyXG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9Ecm9wZG93blNlbGVjdFZhbHVlPlxuICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5lcmFzYWJsZSAmJiBoYXNWYWx1ZSA/IChcbiAgICAgICAgICAgICAgICA8RHJvcGRvd25TZWxlY3RFcmFzZT5cbiAgICAgICAgICAgICAgICAgIDxEZWxldGUgaGVpZ2h0PVwiMTJweFwiIG9uQ2xpY2s9e3RoaXMuX29uRXJhc2V9IC8+XG4gICAgICAgICAgICAgICAgPC9Ecm9wZG93blNlbGVjdEVyYXNlPlxuICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgIDwvU3R5bGVkRHJvcGRvd25TZWxlY3Q+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7LyogdGhpcyBwYXJ0IGlzIHVzZWQgdG8gYnVpbHQgdGhlIGxpc3QgKi99XG4gICAgICAgICAge3RoaXMuc3RhdGUuc2hvd1R5cGVhaGVhZCAmJiB0aGlzLl9yZW5kZXJEcm9wZG93bigpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGxpc3RlbnNUb0NsaWNrT3V0c2lkZShJdGVtU2VsZWN0b3IpO1xuIl19