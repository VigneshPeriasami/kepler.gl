"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CollapseButtonFactory = void 0;

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

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _icons = require("../common/icons");

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    align-items: center;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n    justify-content: center;\n    background-color: ", ";\n    border-radius: 1px;\n    color: ", ";\n    display: flex;\n    height: 20px;\n    position: absolute;\n    right: -8px;\n    top: ", "px;\n    width: 20px;\n\n    :hover {\n      cursor: pointer;\n      box-shadow: none;\n      background-color: ", ";\n    }\n  "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  background-color: ", ";\n  border-radius: 1px;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n  transition: left 250ms, right 250ms;\n  left: ", "px;\n  align-items: stretch;\n  flex-grow: 1;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  z-index: 99;\n  height: 100%;\n  width: ", "px;\n  display: flex;\n  transition: width 250ms;\n  position: absolute;\n  padding-top: ", "px;\n  padding-right: ", "px;\n  padding-bottom: ", "px;\n  padding-left: ", "px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var StyledSidePanelContainer = _styledComponents.default.div(_templateObject(), function (props) {
  return props.width + 2 * props.theme.sidePanel.margin.left;
}, function (props) {
  return props.theme.sidePanel.margin.top;
}, function (props) {
  return props.theme.sidePanel.margin.right;
}, function (props) {
  return props.theme.sidePanel.margin.bottom;
}, function (props) {
  return props.theme.sidePanel.margin.left;
});

var SideBarContainer = _styledComponents.default.div(_templateObject2(), function (props) {
  return props.left;
});

var SideBarInner = _styledComponents.default.div(_templateObject3(), function (props) {
  return props.theme.sidePanelBg;
});

var CollapseButtonFactory = function CollapseButtonFactory() {
  return _styledComponents.default.div(_templateObject4(), function (props) {
    return props.theme.sideBarCloseBtnBgd;
  }, function (props) {
    return props.theme.sideBarCloseBtnColor;
  }, function (props) {
    return props.theme.sidePanel.margin.top;
  }, function (props) {
    return props.theme.sideBarCloseBtnBgdHover;
  });
};

exports.CollapseButtonFactory = CollapseButtonFactory;
SidebarFactory.deps = [CollapseButtonFactory];

function SidebarFactory(CollapseButton) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2.default)(SideBar, _Component);

    function SideBar() {
      var _getPrototypeOf2;

      var _this;

      (0, _classCallCheck2.default)(this, SideBar);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(SideBar)).call.apply(_getPrototypeOf2, [this].concat(args)));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_onOpenOrClose", function () {
        _this.props.onOpenOrClose({
          isOpen: !_this.props.isOpen
        });
      });
      return _this;
    }

    (0, _createClass2.default)(SideBar, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            isOpen = _this$props.isOpen,
            minifiedWidth = _this$props.minifiedWidth,
            width = _this$props.width;
        var horizontalOffset = isOpen ? 0 : minifiedWidth - width;
        return _react.default.createElement(StyledSidePanelContainer, {
          width: isOpen ? width : 0,
          className: "side-panel--container"
        }, _react.default.createElement(SideBarContainer, {
          className: "side-bar",
          style: {
            width: "".concat(width, "px")
          },
          left: horizontalOffset
        }, isOpen ? _react.default.createElement(SideBarInner, {
          className: "side-bar__inner"
        }, this.props.children) : null, _react.default.createElement(CollapseButton, {
          className: "side-bar__close",
          onClick: this._onOpenOrClose
        }, _react.default.createElement(_icons.ArrowRight, {
          height: "12px",
          style: {
            transform: "rotate(".concat(isOpen ? 180 : 0, "deg)")
          }
        }))));
      }
    }]);
    return SideBar;
  }(_react.Component), (0, _defineProperty2.default)(_class, "defaultProps", {
    width: 300,
    minifiedWidth: 0,
    isOpen: true,
    onOpenOrClose: function noop() {}
  }), (0, _defineProperty2.default)(_class, "propTypes", {
    width: _propTypes.default.number,
    isOpen: _propTypes.default.bool,
    minifiedWidth: _propTypes.default.number,
    onOpenOrClose: _propTypes.default.func
  }), _temp;
}

var _default = SidebarFactory;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvc2lkZS1iYXIuanMiXSwibmFtZXMiOlsiU3R5bGVkU2lkZVBhbmVsQ29udGFpbmVyIiwic3R5bGVkIiwiZGl2IiwicHJvcHMiLCJ3aWR0aCIsInRoZW1lIiwic2lkZVBhbmVsIiwibWFyZ2luIiwibGVmdCIsInRvcCIsInJpZ2h0IiwiYm90dG9tIiwiU2lkZUJhckNvbnRhaW5lciIsIlNpZGVCYXJJbm5lciIsInNpZGVQYW5lbEJnIiwiQ29sbGFwc2VCdXR0b25GYWN0b3J5Iiwic2lkZUJhckNsb3NlQnRuQmdkIiwic2lkZUJhckNsb3NlQnRuQ29sb3IiLCJzaWRlQmFyQ2xvc2VCdG5CZ2RIb3ZlciIsIlNpZGViYXJGYWN0b3J5IiwiZGVwcyIsIkNvbGxhcHNlQnV0dG9uIiwib25PcGVuT3JDbG9zZSIsImlzT3BlbiIsIm1pbmlmaWVkV2lkdGgiLCJob3Jpem9udGFsT2Zmc2V0IiwiY2hpbGRyZW4iLCJfb25PcGVuT3JDbG9zZSIsInRyYW5zZm9ybSIsIkNvbXBvbmVudCIsIm5vb3AiLCJQcm9wVHlwZXMiLCJudW1iZXIiLCJib29sIiwiZnVuYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSx3QkFBd0IsR0FBR0MsMEJBQU9DLEdBQVYsb0JBR25CLFVBQUFDLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sR0FBYyxJQUFJRCxLQUFLLENBQUNFLEtBQU4sQ0FBWUMsU0FBWixDQUFzQkMsTUFBdEIsQ0FBNkJDLElBQW5EO0FBQUEsQ0FIYyxFQU9iLFVBQUFMLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNFLEtBQU4sQ0FBWUMsU0FBWixDQUFzQkMsTUFBdEIsQ0FBNkJFLEdBQWpDO0FBQUEsQ0FQUSxFQVFYLFVBQUFOLEtB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QUFTLG1CQUFZTCxNQUFNLEdBQUcsR0FBSCxHQUFTLENBQTNCO0FBQVY7QUFGVCxVQUpGLENBUEYsQ0FKRixDQURGO0FBd0JEO0FBL0NIO0FBQUE7QUFBQSxJQUE2Qk0sZ0JBQTdCLHlEQUN3QjtBQUNwQnpCLElBQUFBLEtBQUssRUFBRSxHQURhO0FBRXBCb0IsSUFBQUEsYUFBYSxFQUFFLENBRks7QUFHcEJELElBQUFBLE1BQU0sRUFBRSxJQUhZO0FBSXBCRCxJQUFBQSxhQUFhLEVBQUUsU0FBU1EsSUFBVCxHQUFnQixDQUFFO0FBSmIsR0FEeEIsc0RBUXFCO0FBQ2pCMUIsSUFBQUEsS0FBSyxFQUFFMkIsbUJBQVVDLE1BREE7QUFFakJULElBQUFBLE1BQU0sRUFBRVEsbUJBQVVFLElBRkQ7QUFHakJULElBQUFBLGFBQWEsRUFBRU8sbUJBQVVDLE1BSFI7QUFJakJWLElBQUFBLGFBQWEsRUFBRVMsbUJBQVVHO0FBSlIsR0FSckI7QUFpREQ7O2VBRWNmLGMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7QXJyb3dSaWdodH0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vaWNvbnMnO1xuXG5jb25zdCBTdHlsZWRTaWRlUGFuZWxDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICB6LWluZGV4OiA5OTtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogJHtwcm9wcyA9PiBwcm9wcy53aWR0aCArIDIgKiBwcm9wcy50aGVtZS5zaWRlUGFuZWwubWFyZ2luLmxlZnR9cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHRyYW5zaXRpb246IHdpZHRoIDI1MG1zO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHBhZGRpbmctdG9wOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNpZGVQYW5lbC5tYXJnaW4udG9wfXB4O1xuICBwYWRkaW5nLXJpZ2h0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNpZGVQYW5lbC5tYXJnaW4ucmlnaHR9cHg7XG4gIHBhZGRpbmctYm90dG9tOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNpZGVQYW5lbC5tYXJnaW4uYm90dG9tfXB4O1xuICBwYWRkaW5nLWxlZnQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2lkZVBhbmVsLm1hcmdpbi5sZWZ0fXB4O1xuYDtcblxuY29uc3QgU2lkZUJhckNvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGJveC1zaGFkb3c6IDAgMXB4IDNweCByZ2JhKDAsIDAsIDAsIDAuMik7XG4gIHRyYW5zaXRpb246IGxlZnQgMjUwbXMsIHJpZ2h0IDI1MG1zO1xuICBsZWZ0OiAke3Byb3BzID0+IHByb3BzLmxlZnR9cHg7XG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuICBmbGV4LWdyb3c6IDE7XG5gO1xuXG5jb25zdCBTaWRlQmFySW5uZXIgPSBzdHlsZWQuZGl2YFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNpZGVQYW5lbEJnfTtcbiAgYm9yZGVyLXJhZGl1czogMXB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBoZWlnaHQ6IDEwMCU7XG5gO1xuXG5leHBvcnQgY29uc3QgQ29sbGFwc2VCdXR0b25GYWN0b3J5ID0gKCkgPT4gKFxuICBzdHlsZWQuZGl2YFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgYm94LXNoYWRvdzogMCAxcHggM3B4IHJnYmEoMCwgMCwgMCwgMC4yKTtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNpZGVCYXJDbG9zZUJ0bkJnZH07XG4gICAgYm9yZGVyLXJhZGl1czogMXB4O1xuICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNpZGVCYXJDbG9zZUJ0bkNvbG9yfTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGhlaWdodDogMjBweDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgcmlnaHQ6IC04cHg7XG4gICAgdG9wOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNpZGVQYW5lbC5tYXJnaW4udG9wfXB4O1xuICAgIHdpZHRoOiAyMHB4O1xuXG4gICAgOmhvdmVyIHtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNpZGVCYXJDbG9zZUJ0bkJnZEhvdmVyfTtcbiAgICB9XG4gIGBcbik7XG5cblNpZGViYXJGYWN0b3J5LmRlcHMgPSBbQ29sbGFwc2VCdXR0b25GYWN0b3J5XTtcblxuZnVuY3Rpb24gU2lkZWJhckZhY3RvcnkoQ29sbGFwc2VCdXR0b24pIHtcbiAgcmV0dXJuIGNsYXNzIFNpZGVCYXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICB3aWR0aDogMzAwLFxuICAgICAgbWluaWZpZWRXaWR0aDogMCxcbiAgICAgIGlzT3BlbjogdHJ1ZSxcbiAgICAgIG9uT3Blbk9yQ2xvc2U6IGZ1bmN0aW9uIG5vb3AoKSB7fVxuICAgIH07XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgd2lkdGg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICBpc09wZW46IFByb3BUeXBlcy5ib29sLFxuICAgICAgbWluaWZpZWRXaWR0aDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIG9uT3Blbk9yQ2xvc2U6IFByb3BUeXBlcy5mdW5jXG4gICAgfTtcblxuICAgIF9vbk9wZW5PckNsb3NlID0gKCkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5vbk9wZW5PckNsb3NlKHtpc09wZW46ICF0aGlzLnByb3BzLmlzT3Blbn0pO1xuICAgIH07XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICBjb25zdCB7aXNPcGVuLCBtaW5pZmllZFdpZHRoLCB3aWR0aH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3QgaG9yaXpvbnRhbE9mZnNldCA9IGlzT3BlbiA/IDAgOiBtaW5pZmllZFdpZHRoIC0gd2lkdGg7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxTdHlsZWRTaWRlUGFuZWxDb250YWluZXJcbiAgICAgICAgICB3aWR0aD17aXNPcGVuID8gd2lkdGggOiAwfVxuICAgICAgICAgIGNsYXNzTmFtZT1cInNpZGUtcGFuZWwtLWNvbnRhaW5lclwiXG4gICAgICAgID5cbiAgICAgICAgICA8U2lkZUJhckNvbnRhaW5lciBjbGFzc05hbWU9XCJzaWRlLWJhclwiIHN0eWxlPXt7d2lkdGg6IGAke3dpZHRofXB4YH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdD17aG9yaXpvbnRhbE9mZnNldH0+XG4gICAgICAgICAgICB7aXNPcGVuID8gKFxuICAgICAgICAgICAgICA8U2lkZUJhcklubmVyIGNsYXNzTmFtZT1cInNpZGUtYmFyX19pbm5lclwiPlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgICA8L1NpZGVCYXJJbm5lcj5cbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgPENvbGxhcHNlQnV0dG9uXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInNpZGUtYmFyX19jbG9zZVwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuX29uT3Blbk9yQ2xvc2V9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxBcnJvd1JpZ2h0XG4gICAgICAgICAgICAgICAgaGVpZ2h0PVwiMTJweFwiXG4gICAgICAgICAgICAgICAgc3R5bGU9e3t0cmFuc2Zvcm06IGByb3RhdGUoJHtpc09wZW4gPyAxODAgOiAwfWRlZylgfX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvQ29sbGFwc2VCdXR0b24+XG4gICAgICAgICAgPC9TaWRlQmFyQ29udGFpbmVyPlxuICAgICAgICA8L1N0eWxlZFNpZGVQYW5lbENvbnRhaW5lcj5cbiAgICAgICk7XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBTaWRlYmFyRmFjdG9yeTtcbiJdfQ==