"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _fuzzy = _interopRequireDefault(require("fuzzy"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _window = require("global/window");

var _accessor = _interopRequireDefault(require("./accessor"));

var _keyevent = _interopRequireDefault(require("./keyevent"));

var _dropdownList = _interopRequireWildcard(require("./dropdown-list"));

var _icons = require("../icons");

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n  right: 15px;\n  top: 14px;\n  color: ", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  ", "\n  :hover {\n    cursor: pointer;\n    background-color: ", ";\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  padding: 8px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: column;\n  background-color: ", ";\n  box-shadow: ", ";\n\n  :focus {\n    outline: 0;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var DEFAULT_CLASS = 'typeahead';
/**
 * Copied mostly from 'react-typeahead', an auto-completing text input
 *
 * Renders an text input that shows options nearby that you can use the
 * keyboard or mouse to select.
 */

var TypeaheadWrapper = _styledComponents.default.div(_templateObject(), function (props) {
  return props.theme.dropdownListBgd;
}, function (props) {
  return props.theme.dropdownListShadow;
});

var InputBox = _styledComponents.default.div(_templateObject2());

var TypeaheadInput = _styledComponents.default.input(_templateObject3(), function (props) {
  return props.theme.secondaryInput;
}, function (props) {
  return props.theme.secondaryInputBgd;
});

var InputIcon = _styledComponents.default.div(_templateObject4(), function (props) {
  return props.theme.inputPlaceholderColor;
});

var Typeahead =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Typeahead, _Component);

  function Typeahead(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Typeahead);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Typeahead).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_onOptionSelected", function (option, event) {
      if (_this.props.searchable) {
        // reset entry input
        _this.setState({
          searchResults: _this.getOptionsForValue('', _this.props.options),
          selection: '',
          entryValue: ''
        });
      }

      return _this.props.onOptionSelected(option, event);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_onTextEntryUpdated", function () {
      if (_this.props.searchable) {
        var value = _this.entry.value;

        _this.setState({
          searchResults: _this.getOptionsForValue(value, _this.props.options),
          selection: '',
          entryValue: value
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_onEnter", function (event) {
      var selection = _this.getSelection();

      if (!selection) {
        return _this.props.onKeyDown(event);
      }

      return _this._onOptionSelected(selection, event);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "navDown", function () {
      _this._nav(1);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "navUp", function () {
      _this._nav(-1);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_onChange", function (event) {
      if (_this.props.onChange) {
        _this.props.onChange(event);
      }

      _this._onTextEntryUpdated();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_onKeyDown", function (event) {
      // If there are no visible elements, don't perform selector navigation.
      // Just pass this up to the upstream onKeydown handler.
      // Also skip if the user is pressing the shift key, since none of our handlers are looking for shift
      if (!_this._hasHint() || event.shiftKey) {
        return _this.props.onKeyDown(event);
      }

      var handler = _this.eventMap()[event.keyCode];

      if (handler) {
        handler(event);
      } else {
        return _this.props.onKeyDown(event);
      } // Don't propagate the keystroke back to the DOM/browser


      event.preventDefault();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_onFocus", function (event) {
      _this.setState({
        isFocused: true
      });

      if (_this.props.onFocus) {
        return _this.props.onFocus(event);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_onBlur", function (event) {
      _this.setState({
        isFocused: false
      });

      if (_this.props.onBlur) {
        return _this.props.onBlur(event);
      }
    });
    _this.state = {
      searchResults: _this.getOptionsForValue(_this.props.initialValue, _this.props.options),
      // This should be called something else, 'entryValue'
      entryValue: _this.props.value || _this.props.initialValue,
      // A valid typeahead value
      selection: _this.props.value,
      // Index of the selection
      selectionIndex: null,
      // Keep track of the focus state of the input element, to determine
      // whether to show options when empty (if showOptionsWhenEmpty is true)
      isFocused: false
    };
    return _this;
  }

  (0, _createClass2.default)(Typeahead, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        searchResults: this.getOptionsForValue('', this.props.options)
      }); // call focus on entry or div to trigger key events listener

      if (this.entry) {
        this.entry.focus();
      } else {
        this.root.focus();
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var searchResults = this.getOptionsForValue(this.state.entryValue, nextProps.options);
      this.setState({
        searchResults: searchResults
      });
    }
  }, {
    key: "_shouldSkipSearch",
    value: function _shouldSkipSearch(input) {
      var emptyValue = !input || input.trim().length === 0; // this.state must be checked because it may not be defined yet if this function
      // is called from within getInitialState

      var isFocused = this.state && this.state.isFocused;
      return !(this.props.showOptionsWhenEmpty && isFocused) && emptyValue;
    }
  }, {
    key: "getOptionsForValue",
    value: function getOptionsForValue(value, options) {
      if (!this.props.searchable) {
        // directly pass through options if can not be searched
        return options;
      }

      if (this._shouldSkipSearch(value)) {
        return options;
      }

      var searchOptions = this._generateSearchFunction();

      return searchOptions(value, options);
    }
  }, {
    key: "focus",
    value: function focus() {
      if (this.entry) {
        this.entry.focus();
      }
    }
  }, {
    key: "_hasCustomValue",
    value: function _hasCustomValue() {
      return this.props.allowCustomValues > 0 && this.state.entryValue.length >= this.props.allowCustomValues && this.state.searchResults.indexOf(this.state.entryValue) < 0;
    }
  }, {
    key: "_getCustomValue",
    value: function _getCustomValue() {
      return this._hasCustomValue() ? this.state.entryValue : null;
    }
  }, {
    key: "_renderIncrementalSearchResults",
    value: function _renderIncrementalSearchResults() {
      return _react.default.createElement(this.props.customListComponent, {
        fixedOptions: this.props.fixedOptions,
        options: this.props.maxVisible ? this.state.searchResults.slice(0, this.props.maxVisible) : this.state.searchResults,
        areResultsTruncated: this.props.maxVisible && this.state.searchResults.length > this.props.maxVisible,
        resultsTruncatedMessage: this.props.resultsTruncatedMessage,
        onOptionSelected: this._onOptionSelected,
        allowCustomValues: this.props.allowCustomValues,
        customValue: this._getCustomValue(),
        customClasses: this.props.customClasses,
        customListItemComponent: this.props.customListItemComponent,
        customListHeaderComponent: this.props.customListHeaderComponent,
        selectionIndex: this.state.selectionIndex,
        defaultClassNames: this.props.defaultClassNames,
        displayOption: this.props.displayOption,
        selectedItems: this.props.selectedItems
      });
    }
  }, {
    key: "getSelection",
    value: function getSelection() {
      var index = this.state.selectionIndex;

      if (this._hasCustomValue()) {
        if (index === 0) {
          return this.state.entryValue;
        }

        index--;
      }

      if (this._hasFixedOptions()) {
        return index < this.props.fixedOptions.length ? this.props.fixedOptions[index] : this.state.searchResults[index - this.props.fixedOptions.length];
      }

      return this.state.searchResults[index];
    }
  }, {
    key: "_onEscape",
    value: function _onEscape() {
      this.setState({
        selectionIndex: null
      });
    }
  }, {
    key: "_onTab",
    value: function _onTab(event) {
      var selection = this.getSelection();
      var option = selection ? selection : this.state.searchResults.length > 0 ? this.state.searchResults[0] : null;

      if (option === null && this._hasCustomValue()) {
        option = this._getCustomValue();
      }

      if (option !== null) {
        return this._onOptionSelected(option, event);
      }
    }
  }, {
    key: "eventMap",
    value: function eventMap(event) {
      var events = {};
      events[_keyevent.default.DOM_VK_UP] = this.navUp;
      events[_keyevent.default.DOM_VK_DOWN] = this.navDown;
      events[_keyevent.default.DOM_VK_RETURN] = events[_keyevent.default.DOM_VK_ENTER] = this._onEnter;
      events[_keyevent.default.DOM_VK_ESCAPE] = this._onEscape;
      events[_keyevent.default.DOM_VK_TAB] = this._onTab;
      return events;
    }
  }, {
    key: "_nav",
    value: function _nav(delta) {
      if (!this._hasHint()) {
        return;
      }

      var newIndex = this.state.selectionIndex === null ? delta === 1 ? 0 : delta : this.state.selectionIndex + delta;
      var length = this.props.maxVisible ? this.state.searchResults.slice(0, this.props.maxVisible).length : this.state.searchResults.length;

      if (this._hasCustomValue()) {
        length += 1;
      }

      if (newIndex < 0) {
        newIndex += length;
      } else if (newIndex >= length) {
        newIndex -= length;
      }

      this.setState({
        selectionIndex: newIndex
      });
    }
  }, {
    key: "_renderHiddenInput",
    value: function _renderHiddenInput() {
      if (!this.props.name) {
        return null;
      }

      return _react.default.createElement("input", {
        type: "hidden",
        name: this.props.name,
        value: this.state.selection
      });
    }
  }, {
    key: "_generateSearchFunction",
    value: function _generateSearchFunction() {
      var searchOptionsProp = this.props.searchOptions;
      var filterOptionProp = this.props.filterOption;

      if (typeof searchOptionsProp === 'function') {
        if (filterOptionProp !== null) {
          _window.console.warn('searchOptions prop is being used, filterOption prop will be ignored');
        }

        return searchOptionsProp;
      } else if (typeof filterOptionProp === 'function') {
        // use custom filter option
        return function (value, options) {
          return options.filter(function (o) {
            return filterOptionProp(value, o);
          });
        };
      }

      var mapper = typeof filterOptionProp === 'string' ? _accessor.default.generateAccessor(filterOptionProp) : _accessor.default.IDENTITY_FN;
      return function (value, options) {
        return _fuzzy.default.filter(value, options, {
          extract: mapper
        }).map(function (res) {
          return options[res.index];
        });
      };
    }
  }, {
    key: "_hasHint",
    value: function _hasHint() {
      return this.state.searchResults.length > 0 || this._hasCustomValue();
    }
  }, {
    key: "_hasFixedOptions",
    value: function _hasFixedOptions() {
      return Array.isArray(this.props.fixedOptions) && this.props.fixedOptions.length;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var inputClasses = {};
      inputClasses[this.props.customClasses.input] = Boolean(this.props.customClasses.input);
      var inputClassList = (0, _classnames.default)(inputClasses);
      var classes = (0, _defineProperty2.default)({}, DEFAULT_CLASS, this.props.defaultClassNames);
      classes[this.props.className] = Boolean(this.props.className);
      var classList = (0, _classnames.default)(classes);
      return _react.default.createElement(TypeaheadWrapper, {
        className: classList,
        ref: function ref(comp) {
          _this2.root = comp;
        },
        tabIndex: "0",
        onKeyDown: this._onKeyDown,
        onKeyPress: this.props.onKeyPress,
        onKeyUp: this.props.onKeyUp,
        onFocus: this._onFocus
      }, this._renderHiddenInput(), this.props.searchable ? _react.default.createElement(InputBox, null, _react.default.createElement(TypeaheadInput, (0, _extends2.default)({
        ref: function ref(comp) {
          _this2.entry = comp;
        },
        type: "text",
        disabled: this.props.disabled
      }, this.props.inputProps, {
        placeholder: this.props.placeholder,
        className: inputClassList,
        value: this.state.entryValue,
        onChange: this._onChange,
        onBlur: this._onBlur
      })), _react.default.createElement(InputIcon, null, _react.default.createElement(_icons.Search, {
        height: "18px"
      }))) : null, this._renderIncrementalSearchResults());
    }
  }]);
  return Typeahead;
}(_react.Component);

exports.default = Typeahead;
(0, _defineProperty2.default)(Typeahead, "propTypes", {
  name: _propTypes.default.string,
  customClasses: _propTypes.default.object,
  maxVisible: _propTypes.default.number,
  resultsTruncatedMessage: _propTypes.default.string,
  options: _propTypes.default.arrayOf(_propTypes.default.any),
  fixedOptions: _propTypes.default.arrayOf(_propTypes.default.any),
  allowCustomValues: _propTypes.default.number,
  initialValue: _propTypes.default.string,
  value: _propTypes.default.string,
  placeholder: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  textarea: _propTypes.default.bool,
  inputProps: _propTypes.default.object,
  onOptionSelected: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onKeyDown: _propTypes.default.func,
  onKeyPress: _propTypes.default.func,
  onKeyUp: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  filterOption: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  searchOptions: _propTypes.default.func,
  displayOption: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  inputDisplayOption: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  formInputOption: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  defaultClassNames: _propTypes.default.bool,
  customListComponent: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func]),
  customListItemComponent: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func]),
  customListHeaderComponent: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func]),
  showOptionsWhenEmpty: _propTypes.default.bool,
  searchable: _propTypes.default.bool
});
(0, _defineProperty2.default)(Typeahead, "defaultProps", {
  options: [],
  customClasses: {},
  allowCustomValues: 0,
  initialValue: '',
  value: '',
  placeholder: '',
  disabled: false,
  textarea: false,
  inputProps: {},
  onOptionSelected: function onOptionSelected(option) {},
  onChange: function onChange(event) {},
  onKeyDown: function onKeyDown(event) {},
  onKeyPress: function onKeyPress(event) {},
  onKeyUp: function onKeyUp(event) {},
  onFocus: function onFocus(event) {},
  onBlur: function onBlur(event) {},
  filterOption: null,
  searchOptions: null,
  inputDisplayOption: null,
  defaultClassNames: true,
  customListComponent: _dropdownList.default,
  customListItemComponent: _dropdownList.ListItem,
  customListHeaderComponent: null,
  showOptionsWhenEmpty: true,
  searchable: true,
  resultsTruncatedMessage: null
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9pdGVtLXNlbGVjdG9yL3R5cGVhaGVhZC5qcyJdLCJuYW1lcyI6WyJERUZBVUxUX0NMQVNTIiwiVHlwZWFoZWFkV3JhcHBlciIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJkcm9wZG93bkxpc3RCZ2QiLCJkcm9wZG93bkxpc3RTaGFkb3ciLCJJbnB1dEJveCIsIlR5cGVhaGVhZElucHV0IiwiaW5wdXQiLCJzZWNvbmRhcnlJbnB1dCIsInNlY29uZGFyeUlucHV0QmdkIiwiSW5wdXRJY29uIiwiaW5wdXRQbGFjZWhvbGRlckNvbG9yIiwiVHlwZWFoZWFkIiwib3B0aW9uIiwiZXZlbnQiLCJzZWFyY2hhYmxlIiwic2V0U3RhdGUiLCJzZWFyY2hSZXN1bHRzIiwiZ2V0T3B0aW9uc0ZvclZhbHVlIiwib3B0aW9ucyIsInNlbGVjdGlvbiIsImVudHJ5VmFsdWUiLCJvbk9wdGlvblNlbGVjdGVkIiwidmFsdWUiLCJlbnRyeSIsImdldFNlbGVjdGlvbiIsIm9uS2V5RG93biIsIl9vbk9wdGlvblNlbGVjdGVkIiwiX25hdiIsIm9uQ2hhbmdlIiwiX29uVGV4dEVudHJ5VXBkYXRlZCIsIl9oYXNIaW50Iiwic2hpZnRLZXkiLCJoYW5kbGVyIiwiZXZlbnRNYXAiLCJrZXlDb2RlIiwicHJldmVudERlZmF1bHQiLCJpc0ZvY3VzZWQiLCJvbkZvY3VzIiwib25CbHVyIiwic3RhdGUiLCJpbml0aWFsVmFsdWUiLCJzZWxlY3Rpb25JbmRleCIsImZvY3VzIiwicm9vdCIsIm5leHRQcm9wcyIsImVtcHR5VmFsdWUiLCJ0cmltIiwibGVuZ3RoIiwic2hvd09wdGlvbnNXaGVuRW1wdHkiLCJfc2hvdWxkU2tpcFNlYXJjaCIsInNlYXJjaE9wdGlvbnMiLCJfZ2VuZXJhdGVTZWFyY2hGdW5jdGlvbiIsImFsbG93Q3VzdG9tVmFsdWVzIiwiaW5kZXhPZiIsIl9oYXNDdXN0b21WYWx1ZSIsImZpeGVkT3B0aW9ucyIsIm1heFZpc2libGUiLCJzbGljZSIsInJlc3VsdHNUcnVuY2F0ZWRNZXNzYWdlIiwiX2dldEN1c3RvbVZhbHVlIiwiY3VzdG9tQ2xhc3NlcyIsImN1c3RvbUxpc3RJdGVtQ29tcG9uZW50IiwiY3VzdG9tTGlzdEhlYWRlckNvbXBvbmVudCIsImRlZmF1bHRDbGFzc05hbWVzIiwiZGlzcGxheU9wdGlvbiIsInNlbGVjdGVkSXRlbXMiLCJpbmRleCIsIl9oYXNGaXhlZE9wdGlvbnMiLCJldmVudHMiLCJLZXlFdmVudCIsIkRPTV9WS19VUCIsIm5hdlVwIiwiRE9NX1ZLX0RPV04iLCJuYXZEb3duIiwiRE9NX1ZLX1JFVFVSTiIsIkRPTV9WS19FTlRFUiIsIl9vbkVudGVyIiwiRE9NX1ZLX0VTQ0FQRSIsIl9vbkVzY2FwZSIsIkRPTV9WS19UQUIiLCJfb25UYWIiLCJkZWx0YSIsIm5ld0luZGV4IiwibmFtZSIsInNlYXJjaE9wdGlvbnNQcm9wIiwiZmlsdGVyT3B0aW9uUHJvcCIsImZpbHRlck9wdGlvbiIsIkNvbnNvbGUiLCJ3YXJuIiwiZmlsdGVyIiwibyIsIm1hcHBlciIsIkFjY2Vzc29yIiwiZ2VuZXJhdGVBY2Nlc3NvciIsIklERU5USVRZX0ZOIiwiZnV6enkiLCJleHRyYWN0IiwibWFwIiwicmVzIiwiQXJyYXkiLCJpc0FycmF5IiwiaW5wdXRDbGFzc2VzIiwiQm9vbGVhbiIsImlucHV0Q2xhc3NMaXN0IiwiY2xhc3NlcyIsImNsYXNzTmFtZSIsImNsYXNzTGlzdCIsImNvbXAiLCJfb25LZXlEb3duIiwib25LZXlQcmVzcyIsIm9uS2V5VXAiLCJfb25Gb2N1cyIsIl9yZW5kZXJIaWRkZW5JbnB1dCIsImRpc2FibGVkIiwiaW5wdXRQcm9wcyIsInBsYWNlaG9sZGVyIiwiX29uQ2hhbmdlIiwiX29uQmx1ciIsIl9yZW5kZXJJbmNyZW1lbnRhbFNlYXJjaFJlc3VsdHMiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJzdHJpbmciLCJvYmplY3QiLCJudW1iZXIiLCJhcnJheU9mIiwiYW55IiwiYm9vbCIsInRleHRhcmVhIiwiZnVuYyIsIm9uZU9mVHlwZSIsImlucHV0RGlzcGxheU9wdGlvbiIsImZvcm1JbnB1dE9wdGlvbiIsImN1c3RvbUxpc3RDb21wb25lbnQiLCJlbGVtZW50IiwiRHJvcGRvd25MaXN0IiwiTGlzdEl0ZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxhQUFhLEdBQUcsV0FBdEI7QUFDQTs7Ozs7OztBQU9BLElBQU1DLGdCQUFnQixHQUFHQywwQkFBT0MsR0FBVixvQkFHQSxVQUFBQyxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlDLGVBQWhCO0FBQUEsQ0FITCxFQUlOLFVBQUFGLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUUsa0JBQWhCO0FBQUEsQ0FKQyxDQUF0Qjs7QUFXQSxJQUFNQyxRQUFRLEdBQUdOLDBCQUFPQyxHQUFWLG9CQUFkOztBQUlBLElBQU1NLGNBQWMsR0FBR1AsMEJBQU9RLEtBQVYscUJBQ2hCLFVBQUFOLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWU0sY0FBaEI7QUFBQSxDQURXLEVBSUksVUFBQVAsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZTyxpQkFBaEI7QUFBQSxDQUpULENBQXBCOztBQVFBLElBQU1DLFNBQVMsR0FBR1gsMEJBQU9DLEdBQVYscUJBSUosVUFBQUMsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZUyxxQkFBaEI7QUFBQSxDQUpELENBQWY7O0lBT3FCQyxTOzs7OztBQXNFbkIscUJBQVlYLEtBQVosRUFBbUI7QUFBQTs7QUFBQTtBQUNqQiwrR0FBTUEsS0FBTjtBQURpQiwwSUFtSUMsVUFBQ1ksTUFBRCxFQUFTQyxLQUFULEVBQW1CO0FBQ3JDLFVBQUksTUFBS2IsS0FBTCxDQUFXYyxVQUFmLEVBQTJCO0FBQ3pCO0FBQ0EsY0FBS0MsUUFBTCxDQUFjO0FBQ1pDLFVBQUFBLGFBQWEsRUFBRSxNQUFLQyxrQkFBTCxDQUF3QixFQUF4QixFQUE0QixNQUFLakIsS0FBTCxDQUFXa0IsT0FBdkMsQ0FESDtBQUVaQyxVQUFBQSxTQUFTLEVBQUUsRUFGQztBQUdaQyxVQUFBQSxVQUFVLEVBQUU7QUFIQSxTQUFkO0FBS0Q7O0FBRUQsYUFBTyxNQUFLcEIsS0FBTCxDQUFXcUIsZ0JBQVgsQ0FBNEJULE1BQTVCLEVBQW9DQyxLQUFwQyxDQUFQO0FBQ0QsS0E5SWtCO0FBQUEsNElBaUpHLFlBQU07QUFDMUIsVUFBSSxNQUFLYixLQUFMLENBQVdjLFVBQWYsRUFBMkI7QUFDekIsWUFBTVEsS0FBSyxHQUFHLE1BQUtDLEtBQUwsQ0FBV0QsS0FBekI7O0FBRUEsY0FBS1AsUUFBTCxDQUFjO0FBQ1pDLFVBQUFBLGFBQWEsRUFBRSxNQUFLQyxrQkFBTCxDQUF3QkssS0FBeEIsRUFBK0IsTUFBS3RCLEtBQUwsQ0FBV2tCLE9BQTFDLENBREg7QUFFWkMsVUFBQUEsU0FBUyxFQUFFLEVBRkM7QUFHWkMsVUFBQUEsVUFBVSxFQUFFRTtBQUhBLFNBQWQ7QUFLRDtBQUNGLEtBM0prQjtBQUFBLGlJQTZKUixVQUFBVCxLQUFLLEVBQUk7QUFDbEIsVUFBTU0sU0FBUyxHQUFHLE1BQUtLLFlBQUwsRUFBbEI7O0FBQ0EsVUFBSSxDQUFDTCxTQUFMLEVBQWdCO0FBQ2QsZUFBTyxNQUFLbkIsS0FBTCxDQUFXeUIsU0FBWCxDQUFxQlosS0FBckIsQ0FBUDtBQUNEOztBQUNELGFBQU8sTUFBS2EsaUJBQUwsQ0FBdUJQLFNBQXZCLEVBQWtDTixLQUFsQyxDQUFQO0FBQ0QsS0FuS2tCO0FBQUEsZ0lBa09ULFlBQU07QUFDZCxZQUFLYyxJQUFMLENBQVUsQ0FBVjtBQUNELEtBcE9rQjtBQUFBLDhIQXNPWCxZQUFNO0FBQ1osWUFBS0EsSUFBTCxDQUFVLENBQUMsQ0FBWDtBQUNELEtBeE9rQjtBQUFBLGtJQTBPUCxVQUFBZCxLQUFLLEVBQUk7QUFDbkIsVUFBSSxNQUFLYixLQUFMLENBQVc0QixRQUFmLEVBQXlCO0FBQ3ZCLGNBQUs1QixLQUFMLENBQVc0QixRQUFYLENBQW9CZixLQUFwQjtBQUNEOztBQUVELFlBQUtnQixtQkFBTDtBQUNELEtBaFBrQjtBQUFBLG1JQWtQTixVQUFBaEIsS0FBSyxFQUFJO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLFVBQUksQ0FBQyxNQUFLaUIsUUFBTCxFQUFELElBQW9CakIsS0FBSyxDQUFDa0IsUUFBOUIsRUFBd0M7QUFDdEMsZUFBTyxNQUFLL0IsS0FBTCxDQUFXeUIsU0FBWCxDQUFxQlosS0FBckIsQ0FBUDtBQUNEOztBQUVELFVBQU1tQixPQUFPLEdBQUcsTUFBS0MsUUFBTCxHQUFnQnBCLEtBQUssQ0FBQ3FCLE9BQXRCLENBQWhCOztBQUVBLFVBQUlGLE9BQUosRUFBYTtBQUNYQSxRQUFBQSxPQUFPLENBQUNuQixLQUFELENBQVA7QUFDRCxPQUZELE1BRU87QUFDTCxlQUFPLE1BQUtiLEtBQUwsQ0FBV3lCLFNBQVgsQ0FBcUJaLEtBQXJCLENBQVA7QUFDRCxPQWRtQixDQWVwQjs7O0FBQ0FBLE1BQUFBLEtBQUssQ0FBQ3NCLGNBQU47QUFDRCxLQW5Ra0I7QUFBQSxpSUFxUVIsVUFBQXRCLEtBQUssRUFBSTtBQUNsQixZQUFLRSxRQUFMLENBQWM7QUFBQ3FCLFFBQUFBLFNBQVMsRUFBRTtBQUFaLE9BQWQ7O0FBQ0EsVUFBSSxNQUFLcEMsS0FBTCxDQUFXcUMsT0FBZixFQUF3QjtBQUN0QixlQUFPLE1BQUtyQyxLQUFMLENBQVdxQyxPQUFYLENBQW1CeEIsS0FBbkIsQ0FBUDtBQUNEO0FBQ0YsS0ExUWtCO0FBQUEsZ0lBNFFULFVBQUFBLEtBQUssRUFBSTtBQUNqQixZQUFLRSxRQUFMLENBQWM7QUFBQ3FCLFFBQUFBLFNBQVMsRUFBRTtBQUFaLE9BQWQ7O0FBQ0EsVUFBSSxNQUFLcEMsS0FBTCxDQUFXc0MsTUFBZixFQUF1QjtBQUNyQixlQUFPLE1BQUt0QyxLQUFMLENBQVdzQyxNQUFYLENBQWtCekIsS0FBbEIsQ0FBUDtBQUNEO0FBQ0YsS0FqUmtCO0FBR2pCLFVBQUswQixLQUFMLEdBQWE7QUFDWHZCLE1BQUFBLGFBQWEsRUFBRSxNQUFLQyxrQkFBTCxDQUNiLE1BQUtqQixLQUFMLENBQVd3QyxZQURFLEVBRWIsTUFBS3hDLEtBQUwsQ0FBV2tCLE9BRkUsQ0FESjtBQU1YO0FBQ0FFLE1BQUFBLFVBQVUsRUFBRSxNQUFLcEIsS0FBTCxDQUFXc0IsS0FBWCxJQUFvQixNQUFLdEIsS0FBTCxDQUFXd0MsWUFQaEM7QUFTWDtBQUNBckIsTUFBQUEsU0FBUyxFQUFFLE1BQUtuQixLQUFMLENBQVdzQixLQVZYO0FBWVg7QUFDQW1CLE1BQUFBLGNBQWMsRUFBRSxJQWJMO0FBZVg7QUFDQTtBQUNBTCxNQUFBQSxTQUFTLEVBQUU7QUFqQkEsS0FBYjtBQUhpQjtBQXNCbEI7Ozs7d0NBRW1CO0FBQ2xCLFdBQUtyQixRQUFMLENBQWM7QUFDWkMsUUFBQUEsYUFBYSxFQUFFLEtBQUtDLGtCQUFMLENBQXdCLEVBQXhCLEVBQTRCLEtBQUtqQixLQUFMLENBQVdrQixPQUF2QztBQURILE9BQWQsRUFEa0IsQ0FLbEI7O0FBQ0EsVUFBSSxLQUFLSyxLQUFULEVBQWdCO0FBQ2QsYUFBS0EsS0FBTCxDQUFXbUIsS0FBWDtBQUNELE9BRkQsTUFFTztBQUNMLGFBQUtDLElBQUwsQ0FBVUQsS0FBVjtBQUNEO0FBQ0Y7Ozs4Q0FFeUJFLFMsRUFBVztBQUNuQyxVQUFNNUIsYUFBYSxHQUFHLEtBQUtDLGtCQUFMLENBQ3BCLEtBQUtzQixLQUFMLENBQVduQixVQURTLEVBRXBCd0IsU0FBUyxDQUFDMUIsT0FGVSxDQUF0QjtBQUtBLFdBQUtILFFBQUwsQ0FBYztBQUFDQyxRQUFBQSxhQUFhLEVBQWJBO0FBQUQsT0FBZDtBQUNEOzs7c0NBRWlCVixLLEVBQU87QUFDdkIsVUFBTXVDLFVBQVUsR0FBRyxDQUFDdkMsS0FBRCxJQUFVQSxLQUFLLENBQUN3QyxJQUFOLEdBQWFDLE1BQWIsS0FBd0IsQ0FBckQsQ0FEdUIsQ0FHdkI7QUFDQTs7QUFDQSxVQUFNWCxTQUFTLEdBQUcsS0FBS0csS0FBTCxJQUFjLEtBQUtBLEtBQUwsQ0FBV0gsU0FBM0M7QUFDQSxhQUFPLEVBQUUsS0FBS3BDLEtBQUwsQ0FBV2dELG9CQUFYLElBQW1DWixTQUFyQyxLQUFtRFMsVUFBMUQ7QUFDRDs7O3VDQUVrQnZCLEssRUFBT0osTyxFQUFTO0FBQ2pDLFVBQUksQ0FBQyxLQUFLbEIsS0FBTCxDQUFXYyxVQUFoQixFQUE0QjtBQUMxQjtBQUNBLGVBQU9JLE9BQVA7QUFDRDs7QUFDRCxVQUFJLEtBQUsrQixpQkFBTCxDQUF1QjNCLEtBQXZCLENBQUosRUFBbUM7QUFDakMsZUFBT0osT0FBUDtBQUNEOztBQUVELFVBQU1nQyxhQUFhLEdBQUcsS0FBS0MsdUJBQUwsRUFBdEI7O0FBQ0EsYUFBT0QsYUFBYSxDQUFDNUIsS0FBRCxFQUFRSixPQUFSLENBQXBCO0FBQ0Q7Ozs0QkFFTztBQUNOLFVBQUksS0FBS0ssS0FBVCxFQUFnQjtBQUNkLGFBQUtBLEtBQUwsQ0FBV21CLEtBQVg7QUFDRDtBQUNGOzs7c0NBRWlCO0FBQ2hCLGFBQ0UsS0FBSzFDLEtBQUwsQ0FBV29ELGlCQUFYLEdBQStCLENBQS9CLElBQ0EsS0FBS2IsS0FBTCxDQUFXbkIsVUFBWCxDQUFzQjJCLE1BQXRCLElBQWdDLEtBQUsvQyxLQUFMLENBQVdvRCxpQkFEM0MsSUFFQSxLQUFLYixLQUFMLENBQVd2QixhQUFYLENBQXlCcUMsT0FBekIsQ0FBaUMsS0FBS2QsS0FBTCxDQUFXbkIsVUFBNUMsSUFBMEQsQ0FINUQ7QUFLRDs7O3NDQUVpQjtBQUNoQixhQUFPLEtBQUtrQyxlQUFMLEtBQXlCLEtBQUtmLEtBQUwsQ0FBV25CLFVBQXBDLEdBQWlELElBQXhEO0FBQ0Q7OztzREFFaUM7QUFDaEMsYUFDRSxrQ0FBTSxLQUFOLENBQVksbUJBQVo7QUFDRSxRQUFBLFlBQVksRUFBRSxLQUFLcEIsS0FBTCxDQUFXdUQsWUFEM0I7QUFFRSxRQUFBLE9BQU8sRUFDTCxLQUFLdkQsS0FBTCxDQUFXd0QsVUFBWCxHQUNJLEtBQUtqQixLQUFMLENBQVd2QixhQUFYLENBQXlCeUMsS0FBekIsQ0FBK0IsQ0FBL0IsRUFBa0MsS0FBS3pELEtBQUwsQ0FBV3dELFVBQTdDLENBREosR0FFSSxLQUFLakIsS0FBTCxDQUFXdkIsYUFMbkI7QUFPRSxRQUFBLG1CQUFtQixFQUNqQixLQUFLaEIsS0FBTCxDQUFXd0QsVUFBWCxJQUNBLEtBQUtqQixLQUFMLENBQVd2QixhQUFYLENBQXlCK0IsTUFBekIsR0FBa0MsS0FBSy9DLEtBQUwsQ0FBV3dELFVBVGpEO0FBV0UsUUFBQSx1QkFBdUIsRUFBRSxLQUFLeEQsS0FBTCxDQUFXMEQsdUJBWHRDO0FBWUUsUUFBQSxnQkFBZ0IsRUFBRSxLQUFLaEMsaUJBWnpCO0FBYUUsUUFBQSxpQkFBaUIsRUFBRSxLQUFLMUIsS0FBTCxDQUFXb0QsaUJBYmhDO0FBY0UsUUFBQSxXQUFXLEVBQUUsS0FBS08sZUFBTCxFQWRmO0FBZUUsUUFBQSxhQUFhLEVBQUUsS0FBSzNELEtBQUwsQ0FBVzRELGFBZjVCO0FBZ0JFLFFBQUEsdUJBQXVCLEVBQUUsS0FBSzVELEtBQUwsQ0FBVzZELHVCQWhCdEM7QUFpQkUsUUFBQSx5QkFBeUIsRUFBRSxLQUFLN0QsS0FBTCxDQUFXOEQseUJBakJ4QztBQWtCRSxRQUFBLGNBQWMsRUFBRSxLQUFLdkIsS0FBTCxDQUFXRSxjQWxCN0I7QUFtQkUsUUFBQSxpQkFBaUIsRUFBRSxLQUFLekMsS0FBTCxDQUFXK0QsaUJBbkJoQztBQW9CRSxRQUFBLGFBQWEsRUFBRSxLQUFLL0QsS0FBTCxDQUFXZ0UsYUFwQjVCO0FBcUJFLFFBQUEsYUFBYSxFQUFFLEtBQUtoRSxLQUFMLENBQVdpRTtBQXJCNUIsUUFERjtBQXlCRDs7O21DQUVjO0FBQ2IsVUFBSUMsS0FBSyxHQUFHLEtBQUszQixLQUFMLENBQVdFLGNBQXZCOztBQUVBLFVBQUksS0FBS2EsZUFBTCxFQUFKLEVBQTRCO0FBQzFCLFlBQUlZLEtBQUssS0FBSyxDQUFkLEVBQWlCO0FBQ2YsaUJBQU8sS0FBSzNCLEtBQUwsQ0FBV25CLFVBQWxCO0FBQ0Q7O0FBQ0Q4QyxRQUFBQSxLQUFLO0FBQ047O0FBQ0QsVUFBSSxLQUFLQyxnQkFBTCxFQUFKLEVBQTZCO0FBQzNCLGVBQU9ELEtBQUssR0FBRyxLQUFLbEUsS0FBTCxDQUFXdUQsWUFBWCxDQUF3QlIsTUFBaEMsR0FDSCxLQUFLL0MsS0FBTCxDQUFXdUQsWUFBWCxDQUF3QlcsS0FBeEIsQ0FERyxHQUVILEtBQUszQixLQUFMLENBQVd2QixhQUFYLENBQXlCa0QsS0FBSyxHQUFHLEtBQUtsRSxLQUFMLENBQVd1RCxZQUFYLENBQXdCUixNQUF6RCxDQUZKO0FBR0Q7O0FBQ0QsYUFBTyxLQUFLUixLQUFMLENBQVd2QixhQUFYLENBQXlCa0QsS0FBekIsQ0FBUDtBQUNEOzs7Z0NBb0NXO0FBQ1YsV0FBS25ELFFBQUwsQ0FBYztBQUNaMEIsUUFBQUEsY0FBYyxFQUFFO0FBREosT0FBZDtBQUdEOzs7MkJBRU01QixLLEVBQU87QUFDWixVQUFNTSxTQUFTLEdBQUcsS0FBS0ssWUFBTCxFQUFsQjtBQUNBLFVBQUlaLE1BQU0sR0FBR08sU0FBUyxHQUNsQkEsU0FEa0IsR0FFbEIsS0FBS29CLEtBQUwsQ0FBV3ZCLGFBQVgsQ0FBeUIrQixNQUF6QixHQUFrQyxDQUFsQyxHQUNFLEtBQUtSLEtBQUwsQ0FBV3ZCLGFBQVgsQ0FBeUIsQ0FBekIsQ0FERixHQUVFLElBSk47O0FBTUEsVUFBSUosTUFBTSxLQUFLLElBQVgsSUFBbUIsS0FBSzBDLGVBQUwsRUFBdkIsRUFBK0M7QUFDN0MxQyxRQUFBQSxNQUFNLEdBQUcsS0FBSytDLGVBQUwsRUFBVDtBQUNEOztBQUVELFVBQUkvQyxNQUFNLEtBQUssSUFBZixFQUFxQjtBQUNuQixlQUFPLEtBQUtjLGlCQUFMLENBQXVCZCxNQUF2QixFQUErQkMsS0FBL0IsQ0FBUDtBQUNEO0FBQ0Y7Ozs2QkFFUUEsSyxFQUFPO0FBQ2QsVUFBTXVELE1BQU0sR0FBRyxFQUFmO0FBRUFBLE1BQUFBLE1BQU0sQ0FBQ0Msa0JBQVNDLFNBQVYsQ0FBTixHQUE2QixLQUFLQyxLQUFsQztBQUNBSCxNQUFBQSxNQUFNLENBQUNDLGtCQUFTRyxXQUFWLENBQU4sR0FBK0IsS0FBS0MsT0FBcEM7QUFDQUwsTUFBQUEsTUFBTSxDQUFDQyxrQkFBU0ssYUFBVixDQUFOLEdBQWlDTixNQUFNLENBQ3JDQyxrQkFBU00sWUFENEIsQ0FBTixHQUU3QixLQUFLQyxRQUZUO0FBR0FSLE1BQUFBLE1BQU0sQ0FBQ0Msa0JBQVNRLGFBQVYsQ0FBTixHQUFpQyxLQUFLQyxTQUF0QztBQUNBVixNQUFBQSxNQUFNLENBQUNDLGtCQUFTVSxVQUFWLENBQU4sR0FBOEIsS0FBS0MsTUFBbkM7QUFFQSxhQUFPWixNQUFQO0FBQ0Q7Ozt5QkFFSWEsSyxFQUFPO0FBQ1YsVUFBSSxDQUFDLEtBQUtuRCxRQUFMLEVBQUwsRUFBc0I7QUFDcEI7QUFDRDs7QUFDRCxVQUFJb0QsUUFBUSxHQUNWLEtBQUszQyxLQUFMLENBQVdFLGNBQVgsS0FBOEIsSUFBOUIsR0FDSXdDLEtBQUssS0FBSyxDQUFWLEdBQWMsQ0FBZCxHQUFrQkEsS0FEdEIsR0FFSSxLQUFLMUMsS0FBTCxDQUFXRSxjQUFYLEdBQTRCd0MsS0FIbEM7QUFJQSxVQUFJbEMsTUFBTSxHQUFHLEtBQUsvQyxLQUFMLENBQVd3RCxVQUFYLEdBQ1QsS0FBS2pCLEtBQUwsQ0FBV3ZCLGFBQVgsQ0FBeUJ5QyxLQUF6QixDQUErQixDQUEvQixFQUFrQyxLQUFLekQsS0FBTCxDQUFXd0QsVUFBN0MsRUFBeURULE1BRGhELEdBRVQsS0FBS1IsS0FBTCxDQUFXdkIsYUFBWCxDQUF5QitCLE1BRjdCOztBQUdBLFVBQUksS0FBS08sZUFBTCxFQUFKLEVBQTRCO0FBQzFCUCxRQUFBQSxNQUFNLElBQUksQ0FBVjtBQUNEOztBQUVELFVBQUltQyxRQUFRLEdBQUcsQ0FBZixFQUFrQjtBQUNoQkEsUUFBQUEsUUFBUSxJQUFJbkMsTUFBWjtBQUNELE9BRkQsTUFFTyxJQUFJbUMsUUFBUSxJQUFJbkMsTUFBaEIsRUFBd0I7QUFDN0JtQyxRQUFBQSxRQUFRLElBQUluQyxNQUFaO0FBQ0Q7O0FBRUQsV0FBS2hDLFFBQUwsQ0FBYztBQUFDMEIsUUFBQUEsY0FBYyxFQUFFeUM7QUFBakIsT0FBZDtBQUNEOzs7eUNBbURvQjtBQUNuQixVQUFJLENBQUMsS0FBS2xGLEtBQUwsQ0FBV21GLElBQWhCLEVBQXNCO0FBQ3BCLGVBQU8sSUFBUDtBQUNEOztBQUVELGFBQ0U7QUFDRSxRQUFBLElBQUksRUFBQyxRQURQO0FBRUUsUUFBQSxJQUFJLEVBQUUsS0FBS25GLEtBQUwsQ0FBV21GLElBRm5CO0FBR0UsUUFBQSxLQUFLLEVBQUUsS0FBSzVDLEtBQUwsQ0FBV3BCO0FBSHBCLFFBREY7QUFPRDs7OzhDQUV5QjtBQUN4QixVQUFNaUUsaUJBQWlCLEdBQUcsS0FBS3BGLEtBQUwsQ0FBV2tELGFBQXJDO0FBQ0EsVUFBTW1DLGdCQUFnQixHQUFHLEtBQUtyRixLQUFMLENBQVdzRixZQUFwQzs7QUFDQSxVQUFJLE9BQU9GLGlCQUFQLEtBQTZCLFVBQWpDLEVBQTZDO0FBQzNDLFlBQUlDLGdCQUFnQixLQUFLLElBQXpCLEVBQStCO0FBQzdCRSwwQkFBUUMsSUFBUixDQUNFLHFFQURGO0FBR0Q7O0FBQ0QsZUFBT0osaUJBQVA7QUFDRCxPQVBELE1BT08sSUFBSSxPQUFPQyxnQkFBUCxLQUE0QixVQUFoQyxFQUE0QztBQUNqRDtBQUNBLGVBQU8sVUFBQy9ELEtBQUQsRUFBUUosT0FBUjtBQUFBLGlCQUNMQSxPQUFPLENBQUN1RSxNQUFSLENBQWUsVUFBQUMsQ0FBQztBQUFBLG1CQUFJTCxnQkFBZ0IsQ0FBQy9ELEtBQUQsRUFBUW9FLENBQVIsQ0FBcEI7QUFBQSxXQUFoQixDQURLO0FBQUEsU0FBUDtBQUVEOztBQUVELFVBQU1DLE1BQU0sR0FDVixPQUFPTixnQkFBUCxLQUE0QixRQUE1QixHQUNJTyxrQkFBU0MsZ0JBQVQsQ0FBMEJSLGdCQUExQixDQURKLEdBRUlPLGtCQUFTRSxXQUhmO0FBS0EsYUFBTyxVQUFDeEUsS0FBRCxFQUFRSixPQUFSO0FBQUEsZUFDTDZFLGVBQ0dOLE1BREgsQ0FDVW5FLEtBRFYsRUFDaUJKLE9BRGpCLEVBQzBCO0FBQUM4RSxVQUFBQSxPQUFPLEVBQUVMO0FBQVYsU0FEMUIsRUFFR00sR0FGSCxDQUVPLFVBQUFDLEdBQUc7QUFBQSxpQkFBSWhGLE9BQU8sQ0FBQ2dGLEdBQUcsQ0FBQ2hDLEtBQUwsQ0FBWDtBQUFBLFNBRlYsQ0FESztBQUFBLE9BQVA7QUFJRDs7OytCQUVVO0FBQ1QsYUFBTyxLQUFLM0IsS0FBTCxDQUFXdkIsYUFBWCxDQUF5QitCLE1BQXpCLEdBQWtDLENBQWxDLElBQXVDLEtBQUtPLGVBQUwsRUFBOUM7QUFDRDs7O3VDQUVrQjtBQUNqQixhQUNFNkMsS0FBSyxDQUFDQyxPQUFOLENBQWMsS0FBS3BHLEtBQUwsQ0FBV3VELFlBQXpCLEtBQTBDLEtBQUt2RCxLQUFMLENBQVd1RCxZQUFYLENBQXdCUixNQURwRTtBQUdEOzs7NkJBRVE7QUFBQTs7QUFDUCxVQUFNc0QsWUFBWSxHQUFHLEVBQXJCO0FBQ0FBLE1BQUFBLFlBQVksQ0FBQyxLQUFLckcsS0FBTCxDQUFXNEQsYUFBWCxDQUF5QnRELEtBQTFCLENBQVosR0FBK0NnRyxPQUFPLENBQ3BELEtBQUt0RyxLQUFMLENBQVc0RCxhQUFYLENBQXlCdEQsS0FEMkIsQ0FBdEQ7QUFHQSxVQUFNaUcsY0FBYyxHQUFHLHlCQUFXRixZQUFYLENBQXZCO0FBRUEsVUFBTUcsT0FBTyxxQ0FDVjVHLGFBRFUsRUFDTSxLQUFLSSxLQUFMLENBQVcrRCxpQkFEakIsQ0FBYjtBQUdBeUMsTUFBQUEsT0FBTyxDQUFDLEtBQUt4RyxLQUFMLENBQVd5RyxTQUFaLENBQVAsR0FBZ0NILE9BQU8sQ0FBQyxLQUFLdEcsS0FBTCxDQUFXeUcsU0FBWixDQUF2QztBQUNBLFVBQU1DLFNBQVMsR0FBRyx5QkFBV0YsT0FBWCxDQUFsQjtBQUVBLGFBQ0UsNkJBQUMsZ0JBQUQ7QUFDRSxRQUFBLFNBQVMsRUFBRUUsU0FEYjtBQUVFLFFBQUEsR0FBRyxFQUFFLGFBQUFDLElBQUksRUFBSTtBQUNYLFVBQUEsTUFBSSxDQUFDaEUsSUFBTCxHQUFZZ0UsSUFBWjtBQUNELFNBSkg7QUFLRSxRQUFBLFFBQVEsRUFBQyxHQUxYO0FBTUUsUUFBQSxTQUFTLEVBQUUsS0FBS0MsVUFObEI7QUFPRSxRQUFBLFVBQVUsRUFBRSxLQUFLNUcsS0FBTCxDQUFXNkcsVUFQekI7QUFRRSxRQUFBLE9BQU8sRUFBRSxLQUFLN0csS0FBTCxDQUFXOEcsT0FSdEI7QUFTRSxRQUFBLE9BQU8sRUFBRSxLQUFLQztBQVRoQixTQVdHLEtBQUtDLGtCQUFMLEVBWEgsRUFZRyxLQUFLaEgsS0FBTCxDQUFXYyxVQUFYLEdBQ0QsNkJBQUMsUUFBRCxRQUNFLDZCQUFDLGNBQUQ7QUFDRSxRQUFBLEdBQUcsRUFBRSxhQUFBNkYsSUFBSSxFQUFJO0FBQ1gsVUFBQSxNQUFJLENBQUNwRixLQUFMLEdBQWFvRixJQUFiO0FBQ0QsU0FISDtBQUlFLFFBQUEsSUFBSSxFQUFDLE1BSlA7QUFLRSxRQUFBLFFBQVEsRUFBRSxLQUFLM0csS0FBTCxDQUFXaUg7QUFMdkIsU0FNTSxLQUFLakgsS0FBTCxDQUFXa0gsVUFOakI7QUFPRSxRQUFBLFdBQVcsRUFBRSxLQUFLbEgsS0FBTCxDQUFXbUgsV0FQMUI7QUFRRSxRQUFBLFNBQVMsRUFBRVosY0FSYjtBQVNFLFFBQUEsS0FBSyxFQUFFLEtBQUtoRSxLQUFMLENBQVduQixVQVRwQjtBQVVFLFFBQUEsUUFBUSxFQUFFLEtBQUtnRyxTQVZqQjtBQVdFLFFBQUEsTUFBTSxFQUFFLEtBQUtDO0FBWGYsU0FERixFQWNFLDZCQUFDLFNBQUQsUUFDRSw2QkFBQyxhQUFEO0FBQVEsUUFBQSxNQUFNLEVBQUM7QUFBZixRQURGLENBZEYsQ0FEQyxHQW1CRyxJQS9CTixFQWdDRyxLQUFLQywrQkFBTCxFQWhDSCxDQURGO0FBb0NEOzs7RUE3Ym9DQyxnQjs7OzhCQUFsQjVHLFMsZUFDQTtBQUNqQndFLEVBQUFBLElBQUksRUFBRXFDLG1CQUFVQyxNQURDO0FBRWpCN0QsRUFBQUEsYUFBYSxFQUFFNEQsbUJBQVVFLE1BRlI7QUFHakJsRSxFQUFBQSxVQUFVLEVBQUVnRSxtQkFBVUcsTUFITDtBQUlqQmpFLEVBQUFBLHVCQUF1QixFQUFFOEQsbUJBQVVDLE1BSmxCO0FBS2pCdkcsRUFBQUEsT0FBTyxFQUFFc0csbUJBQVVJLE9BQVYsQ0FBa0JKLG1CQUFVSyxHQUE1QixDQUxRO0FBTWpCdEUsRUFBQUEsWUFBWSxFQUFFaUUsbUJBQVVJLE9BQVYsQ0FBa0JKLG1CQUFVSyxHQUE1QixDQU5HO0FBT2pCekUsRUFBQUEsaUJBQWlCLEVBQUVvRSxtQkFBVUcsTUFQWjtBQVFqQm5GLEVBQUFBLFlBQVksRUFBRWdGLG1CQUFVQyxNQVJQO0FBU2pCbkcsRUFBQUEsS0FBSyxFQUFFa0csbUJBQVVDLE1BVEE7QUFVakJOLEVBQUFBLFdBQVcsRUFBRUssbUJBQVVDLE1BVk47QUFXakJSLEVBQUFBLFFBQVEsRUFBRU8sbUJBQVVNLElBWEg7QUFZakJDLEVBQUFBLFFBQVEsRUFBRVAsbUJBQVVNLElBWkg7QUFhakJaLEVBQUFBLFVBQVUsRUFBRU0sbUJBQVVFLE1BYkw7QUFjakJyRyxFQUFBQSxnQkFBZ0IsRUFBRW1HLG1CQUFVUSxJQWRYO0FBZWpCcEcsRUFBQUEsUUFBUSxFQUFFNEYsbUJBQVVRLElBZkg7QUFnQmpCdkcsRUFBQUEsU0FBUyxFQUFFK0YsbUJBQVVRLElBaEJKO0FBaUJqQm5CLEVBQUFBLFVBQVUsRUFBRVcsbUJBQVVRLElBakJMO0FBa0JqQmxCLEVBQUFBLE9BQU8sRUFBRVUsbUJBQVVRLElBbEJGO0FBbUJqQjNGLEVBQUFBLE9BQU8sRUFBRW1GLG1CQUFVUSxJQW5CRjtBQW9CakIxRixFQUFBQSxNQUFNLEVBQUVrRixtQkFBVVEsSUFwQkQ7QUFxQmpCMUMsRUFBQUEsWUFBWSxFQUFFa0MsbUJBQVVTLFNBQVYsQ0FBb0IsQ0FBQ1QsbUJBQVVDLE1BQVgsRUFBbUJELG1CQUFVUSxJQUE3QixDQUFwQixDQXJCRztBQXNCakI5RSxFQUFBQSxhQUFhLEVBQUVzRSxtQkFBVVEsSUF0QlI7QUF1QmpCaEUsRUFBQUEsYUFBYSxFQUFFd0QsbUJBQVVTLFNBQVYsQ0FBb0IsQ0FBQ1QsbUJBQVVDLE1BQVgsRUFBbUJELG1CQUFVUSxJQUE3QixDQUFwQixDQXZCRTtBQXdCakJFLEVBQUFBLGtCQUFrQixFQUFFVixtQkFBVVMsU0FBVixDQUFvQixDQUFDVCxtQkFBVUMsTUFBWCxFQUFtQkQsbUJBQVVRLElBQTdCLENBQXBCLENBeEJIO0FBeUJqQkcsRUFBQUEsZUFBZSxFQUFFWCxtQkFBVVMsU0FBVixDQUFvQixDQUFDVCxtQkFBVUMsTUFBWCxFQUFtQkQsbUJBQVVRLElBQTdCLENBQXBCLENBekJBO0FBMEJqQmpFLEVBQUFBLGlCQUFpQixFQUFFeUQsbUJBQVVNLElBMUJaO0FBMkJqQk0sRUFBQUEsbUJBQW1CLEVBQUVaLG1CQUFVUyxTQUFWLENBQW9CLENBQUNULG1CQUFVYSxPQUFYLEVBQW9CYixtQkFBVVEsSUFBOUIsQ0FBcEIsQ0EzQko7QUE0QmpCbkUsRUFBQUEsdUJBQXVCLEVBQUUyRCxtQkFBVVMsU0FBVixDQUFvQixDQUMzQ1QsbUJBQVVhLE9BRGlDLEVBRTNDYixtQkFBVVEsSUFGaUMsQ0FBcEIsQ0E1QlI7QUFnQ2pCbEUsRUFBQUEseUJBQXlCLEVBQUUwRCxtQkFBVVMsU0FBVixDQUFvQixDQUM3Q1QsbUJBQVVhLE9BRG1DLEVBRTdDYixtQkFBVVEsSUFGbUMsQ0FBcEIsQ0FoQ1Y7QUFvQ2pCaEYsRUFBQUEsb0JBQW9CLEVBQUV3RSxtQkFBVU0sSUFwQ2Y7QUFxQ2pCaEgsRUFBQUEsVUFBVSxFQUFFMEcsbUJBQVVNO0FBckNMLEM7OEJBREFuSCxTLGtCQXlDRztBQUNwQk8sRUFBQUEsT0FBTyxFQUFFLEVBRFc7QUFFcEIwQyxFQUFBQSxhQUFhLEVBQUUsRUFGSztBQUdwQlIsRUFBQUEsaUJBQWlCLEVBQUUsQ0FIQztBQUlwQlosRUFBQUEsWUFBWSxFQUFFLEVBSk07QUFLcEJsQixFQUFBQSxLQUFLLEVBQUUsRUFMYTtBQU1wQjZGLEVBQUFBLFdBQVcsRUFBRSxFQU5PO0FBT3BCRixFQUFBQSxRQUFRLEVBQUUsS0FQVTtBQVFwQmMsRUFBQUEsUUFBUSxFQUFFLEtBUlU7QUFTcEJiLEVBQUFBLFVBQVUsRUFBRSxFQVRRO0FBVXBCN0YsRUFBQUEsZ0JBVm9CLDRCQVVIVCxNQVZHLEVBVUssQ0FBRSxDQVZQO0FBV3BCZ0IsRUFBQUEsUUFYb0Isb0JBV1hmLEtBWFcsRUFXSixDQUFFLENBWEU7QUFZcEJZLEVBQUFBLFNBWm9CLHFCQVlWWixLQVpVLEVBWUgsQ0FBRSxDQVpDO0FBYXBCZ0csRUFBQUEsVUFib0Isc0JBYVRoRyxLQWJTLEVBYUYsQ0FBRSxDQWJBO0FBY3BCaUcsRUFBQUEsT0Fkb0IsbUJBY1pqRyxLQWRZLEVBY0wsQ0FBRSxDQWRHO0FBZXBCd0IsRUFBQUEsT0Fmb0IsbUJBZVp4QixLQWZZLEVBZUwsQ0FBRSxDQWZHO0FBZ0JwQnlCLEVBQUFBLE1BaEJvQixrQkFnQmJ6QixLQWhCYSxFQWdCTixDQUFFLENBaEJJO0FBaUJwQnlFLEVBQUFBLFlBQVksRUFBRSxJQWpCTTtBQWtCcEJwQyxFQUFBQSxhQUFhLEVBQUUsSUFsQks7QUFtQnBCZ0YsRUFBQUEsa0JBQWtCLEVBQUUsSUFuQkE7QUFvQnBCbkUsRUFBQUEsaUJBQWlCLEVBQUUsSUFwQkM7QUFxQnBCcUUsRUFBQUEsbUJBQW1CLEVBQUVFLHFCQXJCRDtBQXNCcEJ6RSxFQUFBQSx1QkFBdUIsRUFBRTBFLHNCQXRCTDtBQXVCcEJ6RSxFQUFBQSx5QkFBeUIsRUFBRSxJQXZCUDtBQXdCcEJkLEVBQUFBLG9CQUFvQixFQUFFLElBeEJGO0FBeUJwQmxDLEVBQUFBLFVBQVUsRUFBRSxJQXpCUTtBQTBCcEI0QyxFQUFBQSx1QkFBdUIsRUFBRTtBQTFCTCxDO0FBcVp2QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBmdXp6eSBmcm9tICdmdXp6eSc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHtjb25zb2xlIGFzIENvbnNvbGV9IGZyb20gJ2dsb2JhbC93aW5kb3cnO1xuXG5pbXBvcnQgQWNjZXNzb3IgZnJvbSAnLi9hY2Nlc3Nvcic7XG5pbXBvcnQgS2V5RXZlbnQgZnJvbSAnLi9rZXlldmVudCc7XG5pbXBvcnQgRHJvcGRvd25MaXN0LCB7TGlzdEl0ZW19IGZyb20gJy4vZHJvcGRvd24tbGlzdCc7XG5pbXBvcnQge1NlYXJjaH0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vaWNvbnMnO1xuXG5jb25zdCBERUZBVUxUX0NMQVNTID0gJ3R5cGVhaGVhZCc7XG4vKipcbiAqIENvcGllZCBtb3N0bHkgZnJvbSAncmVhY3QtdHlwZWFoZWFkJywgYW4gYXV0by1jb21wbGV0aW5nIHRleHQgaW5wdXRcbiAqXG4gKiBSZW5kZXJzIGFuIHRleHQgaW5wdXQgdGhhdCBzaG93cyBvcHRpb25zIG5lYXJieSB0aGF0IHlvdSBjYW4gdXNlIHRoZVxuICoga2V5Ym9hcmQgb3IgbW91c2UgdG8gc2VsZWN0LlxuICovXG5cbmNvbnN0IFR5cGVhaGVhZFdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmRyb3Bkb3duTGlzdEJnZH07XG4gIGJveC1zaGFkb3c6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZHJvcGRvd25MaXN0U2hhZG93fTtcblxuICA6Zm9jdXMge1xuICAgIG91dGxpbmU6IDA7XG4gIH1cbmA7XG5cbmNvbnN0IElucHV0Qm94ID0gc3R5bGVkLmRpdmBcbiAgcGFkZGluZzogOHB4O1xuYDtcblxuY29uc3QgVHlwZWFoZWFkSW5wdXQgPSBzdHlsZWQuaW5wdXRgXG4gICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2Vjb25kYXJ5SW5wdXR9XG4gIDpob3ZlciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2Vjb25kYXJ5SW5wdXRCZ2R9O1xuICB9XG5gO1xuXG5jb25zdCBJbnB1dEljb24gPSBzdHlsZWQuZGl2YFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAxNXB4O1xuICB0b3A6IDE0cHg7XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmlucHV0UGxhY2Vob2xkZXJDb2xvcn07XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUeXBlYWhlYWQgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY3VzdG9tQ2xhc3NlczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBtYXhWaXNpYmxlOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHJlc3VsdHNUcnVuY2F0ZWRNZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9wdGlvbnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLFxuICAgIGZpeGVkT3B0aW9uczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSksXG4gICAgYWxsb3dDdXN0b21WYWx1ZXM6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgaW5pdGlhbFZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB0ZXh0YXJlYTogUHJvcFR5cGVzLmJvb2wsXG4gICAgaW5wdXRQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBvbk9wdGlvblNlbGVjdGVkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbktleVByZXNzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbktleVVwOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkZvY3VzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkJsdXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIGZpbHRlck9wdGlvbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmZ1bmNdKSxcbiAgICBzZWFyY2hPcHRpb25zOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkaXNwbGF5T3B0aW9uOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZnVuY10pLFxuICAgIGlucHV0RGlzcGxheU9wdGlvbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmZ1bmNdKSxcbiAgICBmb3JtSW5wdXRPcHRpb246IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5mdW5jXSksXG4gICAgZGVmYXVsdENsYXNzTmFtZXM6IFByb3BUeXBlcy5ib29sLFxuICAgIGN1c3RvbUxpc3RDb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5lbGVtZW50LCBQcm9wVHlwZXMuZnVuY10pLFxuICAgIGN1c3RvbUxpc3RJdGVtQ29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5lbGVtZW50LFxuICAgICAgUHJvcFR5cGVzLmZ1bmNcbiAgICBdKSxcbiAgICBjdXN0b21MaXN0SGVhZGVyQ29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5lbGVtZW50LFxuICAgICAgUHJvcFR5cGVzLmZ1bmNcbiAgICBdKSxcbiAgICBzaG93T3B0aW9uc1doZW5FbXB0eTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VhcmNoYWJsZTogUHJvcFR5cGVzLmJvb2xcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIG9wdGlvbnM6IFtdLFxuICAgIGN1c3RvbUNsYXNzZXM6IHt9LFxuICAgIGFsbG93Q3VzdG9tVmFsdWVzOiAwLFxuICAgIGluaXRpYWxWYWx1ZTogJycsXG4gICAgdmFsdWU6ICcnLFxuICAgIHBsYWNlaG9sZGVyOiAnJyxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgdGV4dGFyZWE6IGZhbHNlLFxuICAgIGlucHV0UHJvcHM6IHt9LFxuICAgIG9uT3B0aW9uU2VsZWN0ZWQob3B0aW9uKSB7fSxcbiAgICBvbkNoYW5nZShldmVudCkge30sXG4gICAgb25LZXlEb3duKGV2ZW50KSB7fSxcbiAgICBvbktleVByZXNzKGV2ZW50KSB7fSxcbiAgICBvbktleVVwKGV2ZW50KSB7fSxcbiAgICBvbkZvY3VzKGV2ZW50KSB7fSxcbiAgICBvbkJsdXIoZXZlbnQpIHt9LFxuICAgIGZpbHRlck9wdGlvbjogbnVsbCxcbiAgICBzZWFyY2hPcHRpb25zOiBudWxsLFxuICAgIGlucHV0RGlzcGxheU9wdGlvbjogbnVsbCxcbiAgICBkZWZhdWx0Q2xhc3NOYW1lczogdHJ1ZSxcbiAgICBjdXN0b21MaXN0Q29tcG9uZW50OiBEcm9wZG93bkxpc3QsXG4gICAgY3VzdG9tTGlzdEl0ZW1Db21wb25lbnQ6IExpc3RJdGVtLFxuICAgIGN1c3RvbUxpc3RIZWFkZXJDb21wb25lbnQ6IG51bGwsXG4gICAgc2hvd09wdGlvbnNXaGVuRW1wdHk6IHRydWUsXG4gICAgc2VhcmNoYWJsZTogdHJ1ZSxcbiAgICByZXN1bHRzVHJ1bmNhdGVkTWVzc2FnZTogbnVsbFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNlYXJjaFJlc3VsdHM6IHRoaXMuZ2V0T3B0aW9uc0ZvclZhbHVlKFxuICAgICAgICB0aGlzLnByb3BzLmluaXRpYWxWYWx1ZSxcbiAgICAgICAgdGhpcy5wcm9wcy5vcHRpb25zXG4gICAgICApLFxuXG4gICAgICAvLyBUaGlzIHNob3VsZCBiZSBjYWxsZWQgc29tZXRoaW5nIGVsc2UsICdlbnRyeVZhbHVlJ1xuICAgICAgZW50cnlWYWx1ZTogdGhpcy5wcm9wcy52YWx1ZSB8fCB0aGlzLnByb3BzLmluaXRpYWxWYWx1ZSxcblxuICAgICAgLy8gQSB2YWxpZCB0eXBlYWhlYWQgdmFsdWVcbiAgICAgIHNlbGVjdGlvbjogdGhpcy5wcm9wcy52YWx1ZSxcblxuICAgICAgLy8gSW5kZXggb2YgdGhlIHNlbGVjdGlvblxuICAgICAgc2VsZWN0aW9uSW5kZXg6IG51bGwsXG5cbiAgICAgIC8vIEtlZXAgdHJhY2sgb2YgdGhlIGZvY3VzIHN0YXRlIG9mIHRoZSBpbnB1dCBlbGVtZW50LCB0byBkZXRlcm1pbmVcbiAgICAgIC8vIHdoZXRoZXIgdG8gc2hvdyBvcHRpb25zIHdoZW4gZW1wdHkgKGlmIHNob3dPcHRpb25zV2hlbkVtcHR5IGlzIHRydWUpXG4gICAgICBpc0ZvY3VzZWQ6IGZhbHNlXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2VhcmNoUmVzdWx0czogdGhpcy5nZXRPcHRpb25zRm9yVmFsdWUoJycsIHRoaXMucHJvcHMub3B0aW9ucylcbiAgICB9KTtcblxuICAgIC8vIGNhbGwgZm9jdXMgb24gZW50cnkgb3IgZGl2IHRvIHRyaWdnZXIga2V5IGV2ZW50cyBsaXN0ZW5lclxuICAgIGlmICh0aGlzLmVudHJ5KSB7XG4gICAgICB0aGlzLmVudHJ5LmZvY3VzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucm9vdC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgY29uc3Qgc2VhcmNoUmVzdWx0cyA9IHRoaXMuZ2V0T3B0aW9uc0ZvclZhbHVlKFxuICAgICAgdGhpcy5zdGF0ZS5lbnRyeVZhbHVlLFxuICAgICAgbmV4dFByb3BzLm9wdGlvbnNcbiAgICApO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7c2VhcmNoUmVzdWx0c30pO1xuICB9XG5cbiAgX3Nob3VsZFNraXBTZWFyY2goaW5wdXQpIHtcbiAgICBjb25zdCBlbXB0eVZhbHVlID0gIWlucHV0IHx8IGlucHV0LnRyaW0oKS5sZW5ndGggPT09IDA7XG5cbiAgICAvLyB0aGlzLnN0YXRlIG11c3QgYmUgY2hlY2tlZCBiZWNhdXNlIGl0IG1heSBub3QgYmUgZGVmaW5lZCB5ZXQgaWYgdGhpcyBmdW5jdGlvblxuICAgIC8vIGlzIGNhbGxlZCBmcm9tIHdpdGhpbiBnZXRJbml0aWFsU3RhdGVcbiAgICBjb25zdCBpc0ZvY3VzZWQgPSB0aGlzLnN0YXRlICYmIHRoaXMuc3RhdGUuaXNGb2N1c2VkO1xuICAgIHJldHVybiAhKHRoaXMucHJvcHMuc2hvd09wdGlvbnNXaGVuRW1wdHkgJiYgaXNGb2N1c2VkKSAmJiBlbXB0eVZhbHVlO1xuICB9XG5cbiAgZ2V0T3B0aW9uc0ZvclZhbHVlKHZhbHVlLCBvcHRpb25zKSB7XG4gICAgaWYgKCF0aGlzLnByb3BzLnNlYXJjaGFibGUpIHtcbiAgICAgIC8vIGRpcmVjdGx5IHBhc3MgdGhyb3VnaCBvcHRpb25zIGlmIGNhbiBub3QgYmUgc2VhcmNoZWRcbiAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH1cbiAgICBpZiAodGhpcy5fc2hvdWxkU2tpcFNlYXJjaCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH1cblxuICAgIGNvbnN0IHNlYXJjaE9wdGlvbnMgPSB0aGlzLl9nZW5lcmF0ZVNlYXJjaEZ1bmN0aW9uKCk7XG4gICAgcmV0dXJuIHNlYXJjaE9wdGlvbnModmFsdWUsIG9wdGlvbnMpO1xuICB9XG5cbiAgZm9jdXMoKSB7XG4gICAgaWYgKHRoaXMuZW50cnkpIHtcbiAgICAgIHRoaXMuZW50cnkuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBfaGFzQ3VzdG9tVmFsdWUoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMucHJvcHMuYWxsb3dDdXN0b21WYWx1ZXMgPiAwICYmXG4gICAgICB0aGlzLnN0YXRlLmVudHJ5VmFsdWUubGVuZ3RoID49IHRoaXMucHJvcHMuYWxsb3dDdXN0b21WYWx1ZXMgJiZcbiAgICAgIHRoaXMuc3RhdGUuc2VhcmNoUmVzdWx0cy5pbmRleE9mKHRoaXMuc3RhdGUuZW50cnlWYWx1ZSkgPCAwXG4gICAgKTtcbiAgfVxuXG4gIF9nZXRDdXN0b21WYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5faGFzQ3VzdG9tVmFsdWUoKSA/IHRoaXMuc3RhdGUuZW50cnlWYWx1ZSA6IG51bGw7XG4gIH1cblxuICBfcmVuZGVySW5jcmVtZW50YWxTZWFyY2hSZXN1bHRzKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8dGhpcy5wcm9wcy5jdXN0b21MaXN0Q29tcG9uZW50XG4gICAgICAgIGZpeGVkT3B0aW9ucz17dGhpcy5wcm9wcy5maXhlZE9wdGlvbnN9XG4gICAgICAgIG9wdGlvbnM9e1xuICAgICAgICAgIHRoaXMucHJvcHMubWF4VmlzaWJsZVxuICAgICAgICAgICAgPyB0aGlzLnN0YXRlLnNlYXJjaFJlc3VsdHMuc2xpY2UoMCwgdGhpcy5wcm9wcy5tYXhWaXNpYmxlKVxuICAgICAgICAgICAgOiB0aGlzLnN0YXRlLnNlYXJjaFJlc3VsdHNcbiAgICAgICAgfVxuICAgICAgICBhcmVSZXN1bHRzVHJ1bmNhdGVkPXtcbiAgICAgICAgICB0aGlzLnByb3BzLm1heFZpc2libGUgJiZcbiAgICAgICAgICB0aGlzLnN0YXRlLnNlYXJjaFJlc3VsdHMubGVuZ3RoID4gdGhpcy5wcm9wcy5tYXhWaXNpYmxlXG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0c1RydW5jYXRlZE1lc3NhZ2U9e3RoaXMucHJvcHMucmVzdWx0c1RydW5jYXRlZE1lc3NhZ2V9XG4gICAgICAgIG9uT3B0aW9uU2VsZWN0ZWQ9e3RoaXMuX29uT3B0aW9uU2VsZWN0ZWR9XG4gICAgICAgIGFsbG93Q3VzdG9tVmFsdWVzPXt0aGlzLnByb3BzLmFsbG93Q3VzdG9tVmFsdWVzfVxuICAgICAgICBjdXN0b21WYWx1ZT17dGhpcy5fZ2V0Q3VzdG9tVmFsdWUoKX1cbiAgICAgICAgY3VzdG9tQ2xhc3Nlcz17dGhpcy5wcm9wcy5jdXN0b21DbGFzc2VzfVxuICAgICAgICBjdXN0b21MaXN0SXRlbUNvbXBvbmVudD17dGhpcy5wcm9wcy5jdXN0b21MaXN0SXRlbUNvbXBvbmVudH1cbiAgICAgICAgY3VzdG9tTGlzdEhlYWRlckNvbXBvbmVudD17dGhpcy5wcm9wcy5jdXN0b21MaXN0SGVhZGVyQ29tcG9uZW50fVxuICAgICAgICBzZWxlY3Rpb25JbmRleD17dGhpcy5zdGF0ZS5zZWxlY3Rpb25JbmRleH1cbiAgICAgICAgZGVmYXVsdENsYXNzTmFtZXM9e3RoaXMucHJvcHMuZGVmYXVsdENsYXNzTmFtZXN9XG4gICAgICAgIGRpc3BsYXlPcHRpb249e3RoaXMucHJvcHMuZGlzcGxheU9wdGlvbn1cbiAgICAgICAgc2VsZWN0ZWRJdGVtcz17dGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zfVxuICAgICAgLz5cbiAgICApO1xuICB9XG5cbiAgZ2V0U2VsZWN0aW9uKCkge1xuICAgIGxldCBpbmRleCA9IHRoaXMuc3RhdGUuc2VsZWN0aW9uSW5kZXg7XG5cbiAgICBpZiAodGhpcy5faGFzQ3VzdG9tVmFsdWUoKSkge1xuICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmVudHJ5VmFsdWU7XG4gICAgICB9XG4gICAgICBpbmRleC0tO1xuICAgIH1cbiAgICBpZiAodGhpcy5faGFzRml4ZWRPcHRpb25zKCkpIHtcbiAgICAgIHJldHVybiBpbmRleCA8IHRoaXMucHJvcHMuZml4ZWRPcHRpb25zLmxlbmd0aFxuICAgICAgICA/IHRoaXMucHJvcHMuZml4ZWRPcHRpb25zW2luZGV4XVxuICAgICAgICA6IHRoaXMuc3RhdGUuc2VhcmNoUmVzdWx0c1tpbmRleCAtIHRoaXMucHJvcHMuZml4ZWRPcHRpb25zLmxlbmd0aF07XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnN0YXRlLnNlYXJjaFJlc3VsdHNbaW5kZXhdO1xuICB9XG5cbiAgX29uT3B0aW9uU2VsZWN0ZWQgPSAob3B0aW9uLCBldmVudCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNlYXJjaGFibGUpIHtcbiAgICAgIC8vIHJlc2V0IGVudHJ5IGlucHV0XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgc2VhcmNoUmVzdWx0czogdGhpcy5nZXRPcHRpb25zRm9yVmFsdWUoJycsIHRoaXMucHJvcHMub3B0aW9ucyksXG4gICAgICAgIHNlbGVjdGlvbjogJycsXG4gICAgICAgIGVudHJ5VmFsdWU6ICcnXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5wcm9wcy5vbk9wdGlvblNlbGVjdGVkKG9wdGlvbiwgZXZlbnQpO1xuICB9O1xuXG4gIC8vIHVzZSAoKSA9PiB7fSB0byBhdm9pZCBiaW5kaW5nICd0aGlzJ1xuICBfb25UZXh0RW50cnlVcGRhdGVkID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNlYXJjaGFibGUpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5lbnRyeS52YWx1ZTtcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHNlYXJjaFJlc3VsdHM6IHRoaXMuZ2V0T3B0aW9uc0ZvclZhbHVlKHZhbHVlLCB0aGlzLnByb3BzLm9wdGlvbnMpLFxuICAgICAgICBzZWxlY3Rpb246ICcnLFxuICAgICAgICBlbnRyeVZhbHVlOiB2YWx1ZVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIF9vbkVudGVyID0gZXZlbnQgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCk7XG4gICAgaWYgKCFzZWxlY3Rpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9vbk9wdGlvblNlbGVjdGVkKHNlbGVjdGlvbiwgZXZlbnQpO1xuICB9O1xuXG4gIF9vbkVzY2FwZSgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGlvbkluZGV4OiBudWxsXG4gICAgfSk7XG4gIH1cblxuICBfb25UYWIoZXZlbnQpIHtcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpO1xuICAgIGxldCBvcHRpb24gPSBzZWxlY3Rpb25cbiAgICAgID8gc2VsZWN0aW9uXG4gICAgICA6IHRoaXMuc3RhdGUuc2VhcmNoUmVzdWx0cy5sZW5ndGggPiAwXG4gICAgICAgID8gdGhpcy5zdGF0ZS5zZWFyY2hSZXN1bHRzWzBdXG4gICAgICAgIDogbnVsbDtcblxuICAgIGlmIChvcHRpb24gPT09IG51bGwgJiYgdGhpcy5faGFzQ3VzdG9tVmFsdWUoKSkge1xuICAgICAgb3B0aW9uID0gdGhpcy5fZ2V0Q3VzdG9tVmFsdWUoKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9uICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5fb25PcHRpb25TZWxlY3RlZChvcHRpb24sIGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBldmVudE1hcChldmVudCkge1xuICAgIGNvbnN0IGV2ZW50cyA9IHt9O1xuXG4gICAgZXZlbnRzW0tleUV2ZW50LkRPTV9WS19VUF0gPSB0aGlzLm5hdlVwO1xuICAgIGV2ZW50c1tLZXlFdmVudC5ET01fVktfRE9XTl0gPSB0aGlzLm5hdkRvd247XG4gICAgZXZlbnRzW0tleUV2ZW50LkRPTV9WS19SRVRVUk5dID0gZXZlbnRzW1xuICAgICAgS2V5RXZlbnQuRE9NX1ZLX0VOVEVSXG4gICAgXSA9IHRoaXMuX29uRW50ZXI7XG4gICAgZXZlbnRzW0tleUV2ZW50LkRPTV9WS19FU0NBUEVdID0gdGhpcy5fb25Fc2NhcGU7XG4gICAgZXZlbnRzW0tleUV2ZW50LkRPTV9WS19UQUJdID0gdGhpcy5fb25UYWI7XG5cbiAgICByZXR1cm4gZXZlbnRzO1xuICB9XG5cbiAgX25hdihkZWx0YSkge1xuICAgIGlmICghdGhpcy5faGFzSGludCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBuZXdJbmRleCA9XG4gICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbkluZGV4ID09PSBudWxsXG4gICAgICAgID8gZGVsdGEgPT09IDEgPyAwIDogZGVsdGFcbiAgICAgICAgOiB0aGlzLnN0YXRlLnNlbGVjdGlvbkluZGV4ICsgZGVsdGE7XG4gICAgbGV0IGxlbmd0aCA9IHRoaXMucHJvcHMubWF4VmlzaWJsZVxuICAgICAgPyB0aGlzLnN0YXRlLnNlYXJjaFJlc3VsdHMuc2xpY2UoMCwgdGhpcy5wcm9wcy5tYXhWaXNpYmxlKS5sZW5ndGhcbiAgICAgIDogdGhpcy5zdGF0ZS5zZWFyY2hSZXN1bHRzLmxlbmd0aDtcbiAgICBpZiAodGhpcy5faGFzQ3VzdG9tVmFsdWUoKSkge1xuICAgICAgbGVuZ3RoICs9IDE7XG4gICAgfVxuXG4gICAgaWYgKG5ld0luZGV4IDwgMCkge1xuICAgICAgbmV3SW5kZXggKz0gbGVuZ3RoO1xuICAgIH0gZWxzZSBpZiAobmV3SW5kZXggPj0gbGVuZ3RoKSB7XG4gICAgICBuZXdJbmRleCAtPSBsZW5ndGg7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0aW9uSW5kZXg6IG5ld0luZGV4fSk7XG4gIH1cblxuICBuYXZEb3duID0gKCkgPT4ge1xuICAgIHRoaXMuX25hdigxKTtcbiAgfTtcblxuICBuYXZVcCA9ICgpID0+IHtcbiAgICB0aGlzLl9uYXYoLTEpO1xuICB9O1xuXG4gIF9vbkNoYW5nZSA9IGV2ZW50ID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShldmVudCk7XG4gICAgfVxuXG4gICAgdGhpcy5fb25UZXh0RW50cnlVcGRhdGVkKCk7XG4gIH07XG5cbiAgX29uS2V5RG93biA9IGV2ZW50ID0+IHtcbiAgICAvLyBJZiB0aGVyZSBhcmUgbm8gdmlzaWJsZSBlbGVtZW50cywgZG9uJ3QgcGVyZm9ybSBzZWxlY3RvciBuYXZpZ2F0aW9uLlxuICAgIC8vIEp1c3QgcGFzcyB0aGlzIHVwIHRvIHRoZSB1cHN0cmVhbSBvbktleWRvd24gaGFuZGxlci5cbiAgICAvLyBBbHNvIHNraXAgaWYgdGhlIHVzZXIgaXMgcHJlc3NpbmcgdGhlIHNoaWZ0IGtleSwgc2luY2Ugbm9uZSBvZiBvdXIgaGFuZGxlcnMgYXJlIGxvb2tpbmcgZm9yIHNoaWZ0XG4gICAgaWYgKCF0aGlzLl9oYXNIaW50KCkgfHwgZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgfVxuXG4gICAgY29uc3QgaGFuZGxlciA9IHRoaXMuZXZlbnRNYXAoKVtldmVudC5rZXlDb2RlXTtcblxuICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICBoYW5kbGVyKGV2ZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICB9XG4gICAgLy8gRG9uJ3QgcHJvcGFnYXRlIHRoZSBrZXlzdHJva2UgYmFjayB0byB0aGUgRE9NL2Jyb3dzZXJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9O1xuXG4gIF9vbkZvY3VzID0gZXZlbnQgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe2lzRm9jdXNlZDogdHJ1ZX0pO1xuICAgIGlmICh0aGlzLnByb3BzLm9uRm9jdXMpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLm9uRm9jdXMoZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBfb25CbHVyID0gZXZlbnQgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe2lzRm9jdXNlZDogZmFsc2V9KTtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkJsdXIpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLm9uQmx1cihldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIF9yZW5kZXJIaWRkZW5JbnB1dCgpIHtcbiAgICBpZiAoIXRoaXMucHJvcHMubmFtZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxpbnB1dFxuICAgICAgICB0eXBlPVwiaGlkZGVuXCJcbiAgICAgICAgbmFtZT17dGhpcy5wcm9wcy5uYW1lfVxuICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5zZWxlY3Rpb259XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICBfZ2VuZXJhdGVTZWFyY2hGdW5jdGlvbigpIHtcbiAgICBjb25zdCBzZWFyY2hPcHRpb25zUHJvcCA9IHRoaXMucHJvcHMuc2VhcmNoT3B0aW9ucztcbiAgICBjb25zdCBmaWx0ZXJPcHRpb25Qcm9wID0gdGhpcy5wcm9wcy5maWx0ZXJPcHRpb247XG4gICAgaWYgKHR5cGVvZiBzZWFyY2hPcHRpb25zUHJvcCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgaWYgKGZpbHRlck9wdGlvblByb3AgIT09IG51bGwpIHtcbiAgICAgICAgQ29uc29sZS53YXJuKFxuICAgICAgICAgICdzZWFyY2hPcHRpb25zIHByb3AgaXMgYmVpbmcgdXNlZCwgZmlsdGVyT3B0aW9uIHByb3Agd2lsbCBiZSBpZ25vcmVkJ1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlYXJjaE9wdGlvbnNQcm9wO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGZpbHRlck9wdGlvblByb3AgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIHVzZSBjdXN0b20gZmlsdGVyIG9wdGlvblxuICAgICAgcmV0dXJuICh2YWx1ZSwgb3B0aW9ucykgPT5cbiAgICAgICAgb3B0aW9ucy5maWx0ZXIobyA9PiBmaWx0ZXJPcHRpb25Qcm9wKHZhbHVlLCBvKSk7XG4gICAgfVxuXG4gICAgY29uc3QgbWFwcGVyID1cbiAgICAgIHR5cGVvZiBmaWx0ZXJPcHRpb25Qcm9wID09PSAnc3RyaW5nJ1xuICAgICAgICA/IEFjY2Vzc29yLmdlbmVyYXRlQWNjZXNzb3IoZmlsdGVyT3B0aW9uUHJvcClcbiAgICAgICAgOiBBY2Nlc3Nvci5JREVOVElUWV9GTjtcblxuICAgIHJldHVybiAodmFsdWUsIG9wdGlvbnMpID0+XG4gICAgICBmdXp6eVxuICAgICAgICAuZmlsdGVyKHZhbHVlLCBvcHRpb25zLCB7ZXh0cmFjdDogbWFwcGVyfSlcbiAgICAgICAgLm1hcChyZXMgPT4gb3B0aW9uc1tyZXMuaW5kZXhdKTtcbiAgfVxuXG4gIF9oYXNIaW50KCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLnNlYXJjaFJlc3VsdHMubGVuZ3RoID4gMCB8fCB0aGlzLl9oYXNDdXN0b21WYWx1ZSgpO1xuICB9XG5cbiAgX2hhc0ZpeGVkT3B0aW9ucygpIHtcbiAgICByZXR1cm4gKFxuICAgICAgQXJyYXkuaXNBcnJheSh0aGlzLnByb3BzLmZpeGVkT3B0aW9ucykgJiYgdGhpcy5wcm9wcy5maXhlZE9wdGlvbnMubGVuZ3RoXG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBpbnB1dENsYXNzZXMgPSB7fTtcbiAgICBpbnB1dENsYXNzZXNbdGhpcy5wcm9wcy5jdXN0b21DbGFzc2VzLmlucHV0XSA9IEJvb2xlYW4oXG4gICAgICB0aGlzLnByb3BzLmN1c3RvbUNsYXNzZXMuaW5wdXRcbiAgICApO1xuICAgIGNvbnN0IGlucHV0Q2xhc3NMaXN0ID0gY2xhc3NOYW1lcyhpbnB1dENsYXNzZXMpO1xuXG4gICAgY29uc3QgY2xhc3NlcyA9IHtcbiAgICAgIFtERUZBVUxUX0NMQVNTXTogdGhpcy5wcm9wcy5kZWZhdWx0Q2xhc3NOYW1lc1xuICAgIH07XG4gICAgY2xhc3Nlc1t0aGlzLnByb3BzLmNsYXNzTmFtZV0gPSBCb29sZWFuKHRoaXMucHJvcHMuY2xhc3NOYW1lKTtcbiAgICBjb25zdCBjbGFzc0xpc3QgPSBjbGFzc05hbWVzKGNsYXNzZXMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxUeXBlYWhlYWRXcmFwcGVyXG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NMaXN0fVxuICAgICAgICByZWY9e2NvbXAgPT4ge1xuICAgICAgICAgIHRoaXMucm9vdCA9IGNvbXA7XG4gICAgICAgIH19XG4gICAgICAgIHRhYkluZGV4PVwiMFwiXG4gICAgICAgIG9uS2V5RG93bj17dGhpcy5fb25LZXlEb3dufVxuICAgICAgICBvbktleVByZXNzPXt0aGlzLnByb3BzLm9uS2V5UHJlc3N9XG4gICAgICAgIG9uS2V5VXA9e3RoaXMucHJvcHMub25LZXlVcH1cbiAgICAgICAgb25Gb2N1cz17dGhpcy5fb25Gb2N1c31cbiAgICAgID5cbiAgICAgICAge3RoaXMuX3JlbmRlckhpZGRlbklucHV0KCl9XG4gICAgICAgIHt0aGlzLnByb3BzLnNlYXJjaGFibGUgPyAoXG4gICAgICAgIDxJbnB1dEJveD5cbiAgICAgICAgICA8VHlwZWFoZWFkSW5wdXRcbiAgICAgICAgICAgIHJlZj17Y29tcCA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuZW50cnkgPSBjb21wO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLnByb3BzLmRpc2FibGVkfVxuICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuaW5wdXRQcm9wc31cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXt0aGlzLnByb3BzLnBsYWNlaG9sZGVyfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtpbnB1dENsYXNzTGlzdH1cbiAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLmVudHJ5VmFsdWV9XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5fb25DaGFuZ2V9XG4gICAgICAgICAgICBvbkJsdXI9e3RoaXMuX29uQmx1cn1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxJbnB1dEljb24+XG4gICAgICAgICAgICA8U2VhcmNoIGhlaWdodD1cIjE4cHhcIi8+XG4gICAgICAgICAgPC9JbnB1dEljb24+XG4gICAgICAgIDwvSW5wdXRCb3g+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICB7dGhpcy5fcmVuZGVySW5jcmVtZW50YWxTZWFyY2hSZXN1bHRzKCl9XG4gICAgICA8L1R5cGVhaGVhZFdyYXBwZXI+XG4gICAgKTtcbiAgfVxufTtcbiJdfQ==