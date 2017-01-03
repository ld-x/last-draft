'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n  padding: 10px;\n  display: flex;\n'], ['\n  padding: 10px;\n  display: flex;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  width: 50%;\n'], ['\n  width: 50%;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var styled = require('styled-components').default;

exports.default = function (props) {
  var alignClass = '';
  var alignmentStyle = { justifyContent: 'center' };
  if (props.blockProps.alignment !== undefined) {
    if (props.blockProps.alignment === 'alignment-left') {
      alignmentStyle = { justifyContent: 'flex-start' };
    }
    if (props.blockProps.alignment === 'alignment-right') {
      alignmentStyle = { justifyContent: 'flex-end' };
    }
    alignClass = '' + props.blockProps.alignment;
  }

  return _react2.default.createElement(
    AlignmentWrapper,
    { style: alignmentStyle, className: 'align-wrapper' },
    _react2.default.createElement(
      Alignment,
      { className: alignClass },
      _react2.default.createElement(_draftJs.EditorBlock, props)
    )
  );
};

var AlignmentWrapper = styled.div(_templateObject);
var Alignment = styled.div(_templateObject2);