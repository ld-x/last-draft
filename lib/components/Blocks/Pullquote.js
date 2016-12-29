'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n  color: #3192e7;\n  padding: 10px;\n  font-size: 20px;\n  display: block;\n'], ['\n  color: #3192e7;\n  padding: 10px;\n  font-size: 20px;\n  display: block;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var styled = require('styled-components').default;

exports.default = function (props) {
  return _react2.default.createElement(
    Pullquote,
    null,
    _react2.default.createElement(_draftJs.EditorBlock, props)
  );
};

var Pullquote = styled.cite(_templateObject);