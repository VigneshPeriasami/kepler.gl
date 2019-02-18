"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _luma = require("luma.gl");

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
// add picking_uHighlightScale to fs uniform
var fs = "uniform bool picking_uActive; // true during rendering to offscreen picking buffer\nuniform vec3 picking_uSelectedColor;\nuniform vec4 picking_uHighlightColor;\nuniform float picking_uHighlightScale;\n\nvarying vec4 picking_vRGBcolor_Aselected;\n\nconst float COLOR_SCALE = 1. / 255.;\n\n/*\n * Returns highlight color if this item is selected.\n */\nvec4 picking_filterHighlightColor(vec4 color) {\n  bool selected = bool(picking_vRGBcolor_Aselected.a);\n  // return selected ? (picking_uHighlightColor * COLOR_SCALE) : color;\n  return selected ? (\n   (bool(picking_uHighlightScale > 0.0) ? color * picking_uHighlightScale : picking_uHighlightColor * COLOR_SCALE)\n  ) : color;\n}\n\n/*\n * Returns picking color if picking enabled else unmodified argument.\n */\nvec4 picking_filterPickingColor(vec4 color) {\n  vec3 pickingColor = picking_vRGBcolor_Aselected.rgb;\n  if (picking_uActive && length(pickingColor) < 0.001) {\n    discard;\n  }\n  return picking_uActive ? vec4(pickingColor, 1.0) : color;\n}\n\n/*\n * Returns picking color if picking is enabled if not\n * highlight color if this item is selected, otherwise unmodified argument.\n */\nvec4 picking_filterColor(vec4 color) {\n  vec4 highightColor = picking_filterHighlightColor(color);\n  return picking_filterPickingColor(highightColor);\n}\n";

var _default = (0, _objectSpread2.default)({}, _luma.picking, {
  fs: fs
});

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zaGFkZXJsaWIvcGlja2luZy1tb2R1bGUuanMiXSwibmFtZXMiOlsiZnMiLCJwaWNraW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQW9CQTs7QUFwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBLElBQU1BLEVBQUUsb3lDQUFSOzsrQ0EyQ0tDLGE7QUFDSEQsRUFBQUEsRUFBRSxFQUFGQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7cGlja2luZ30gZnJvbSAnbHVtYS5nbCc7XG5cbi8vIGFkZCBwaWNraW5nX3VIaWdobGlnaHRTY2FsZSB0byBmcyB1bmlmb3JtXG5jb25zdCBmcyA9IGBcXFxudW5pZm9ybSBib29sIHBpY2tpbmdfdUFjdGl2ZTsgLy8gdHJ1ZSBkdXJpbmcgcmVuZGVyaW5nIHRvIG9mZnNjcmVlbiBwaWNraW5nIGJ1ZmZlclxudW5pZm9ybSB2ZWMzIHBpY2tpbmdfdVNlbGVjdGVkQ29sb3I7XG51bmlmb3JtIHZlYzQgcGlja2luZ191SGlnaGxpZ2h0Q29sb3I7XG51bmlmb3JtIGZsb2F0IHBpY2tpbmdfdUhpZ2hsaWdodFNjYWxlO1xuXG52YXJ5aW5nIHZlYzQgcGlja2luZ192UkdCY29sb3JfQXNlbGVjdGVkO1xuXG5jb25zdCBmbG9hdCBDT0xPUl9TQ0FMRSA9IDEuIC8gMjU1LjtcblxuLypcbiAqIFJldHVybnMgaGlnaGxpZ2h0IGNvbG9yIGlmIHRoaXMgaXRlbSBpcyBzZWxlY3RlZC5cbiAqL1xudmVjNCBwaWNraW5nX2ZpbHRlckhpZ2hsaWdodENvbG9yKHZlYzQgY29sb3IpIHtcbiAgYm9vbCBzZWxlY3RlZCA9IGJvb2wocGlja2luZ192UkdCY29sb3JfQXNlbGVjdGVkLmEpO1xuICAvLyByZXR1cm4gc2VsZWN0ZWQgPyAocGlja2luZ191SGlnaGxpZ2h0Q29sb3IgKiBDT0xPUl9TQ0FMRSkgOiBjb2xvcjtcbiAgcmV0dXJuIHNlbGVjdGVkID8gKFxuICAgKGJvb2wocGlja2luZ191SGlnaGxpZ2h0U2NhbGUgPiAwLjApID8gY29sb3IgKiBwaWNraW5nX3VIaWdobGlnaHRTY2FsZSA6IHBpY2tpbmdfdUhpZ2hsaWdodENvbG9yICogQ09MT1JfU0NBTEUpXG4gICkgOiBjb2xvcjtcbn1cblxuLypcbiAqIFJldHVybnMgcGlja2luZyBjb2xvciBpZiBwaWNraW5nIGVuYWJsZWQgZWxzZSB1bm1vZGlmaWVkIGFyZ3VtZW50LlxuICovXG52ZWM0IHBpY2tpbmdfZmlsdGVyUGlja2luZ0NvbG9yKHZlYzQgY29sb3IpIHtcbiAgdmVjMyBwaWNraW5nQ29sb3IgPSBwaWNraW5nX3ZSR0Jjb2xvcl9Bc2VsZWN0ZWQucmdiO1xuICBpZiAocGlja2luZ191QWN0aXZlICYmIGxlbmd0aChwaWNraW5nQ29sb3IpIDwgMC4wMDEpIHtcbiAgICBkaXNjYXJkO1xuICB9XG4gIHJldHVybiBwaWNraW5nX3VBY3RpdmUgPyB2ZWM0KHBpY2tpbmdDb2xvciwgMS4wKSA6IGNvbG9yO1xufVxuXG4vKlxuICogUmV0dXJucyBwaWNraW5nIGNvbG9yIGlmIHBpY2tpbmcgaXMgZW5hYmxlZCBpZiBub3RcbiAqIGhpZ2hsaWdodCBjb2xvciBpZiB0aGlzIGl0ZW0gaXMgc2VsZWN0ZWQsIG90aGVyd2lzZSB1bm1vZGlmaWVkIGFyZ3VtZW50LlxuICovXG52ZWM0IHBpY2tpbmdfZmlsdGVyQ29sb3IodmVjNCBjb2xvcikge1xuICB2ZWM0IGhpZ2hpZ2h0Q29sb3IgPSBwaWNraW5nX2ZpbHRlckhpZ2hsaWdodENvbG9yKGNvbG9yKTtcbiAgcmV0dXJuIHBpY2tpbmdfZmlsdGVyUGlja2luZ0NvbG9yKGhpZ2hpZ2h0Q29sb3IpO1xufVxuYDtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAuLi5waWNraW5nLFxuICBmc1xufTtcbiJdfQ==