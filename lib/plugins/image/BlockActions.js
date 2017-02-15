'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /*
                    * Copyright (c) 2016, Globo.com (https://github.com/globocom)
                    * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
                    *
                    * License: MIT
                    */

var _templateObject = _taggedTemplateLiteral(['\n  padding-top: 0.5rem;\n  padding-right: 1rem;\n  padding-bottom: 0.5rem;\n'], ['\n  padding-top: 0.5rem;\n  padding-right: 1rem;\n  padding-bottom: 0.5rem;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n'], ['\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  flex: 1;\n  cursor: pointer;\n  color: #ddd;\n  &:hover {\n    color: #333;\n  }\n'], ['\n  flex: 1;\n  cursor: pointer;\n  color: #ddd;\n  &:hover {\n    color: #333;\n  }\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = (_temp = _class = function (_Component) {
  _inherits(_default, _Component);

  function _default() {
    _classCallCheck(this, _default);

    return _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).apply(this, arguments));
  }

  _createClass(_default, [{
    key: 'renderItem',
    value: function renderItem(item) {
      return _react2.default.createElement(
        BlockAction,
        { className: 'ld-block-action', onClick: item.action, key: item.key },
        _react2.default.createElement(item.icon, null)
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        BlockActionsWrapper,
        { className: 'ld-block-actions-wrapper' },
        _react2.default.createElement(
          BlockActions,
          { className: 'ld-block-actions' },
          this.props.items.map(this.renderItem)
        )
      );
    }
  }]);

  return _default;
}(_react.Component), _class.propTypes = {
  items: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
    key: _react.PropTypes.string.isRequired,
    icon: _react.PropTypes.func.isRequired,
    action: _react.PropTypes.func.isRequired
  }))
}, _temp);

exports.default = _default;


var BlockActionsWrapper = _styledComponents2.default.div(_templateObject);

var BlockActions = _styledComponents2.default.div(_templateObject2);

var BlockAction = _styledComponents2.default.div(_templateObject3);