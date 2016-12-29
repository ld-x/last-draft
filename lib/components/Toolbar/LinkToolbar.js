'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _entity = require('../../utils/entity');

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styled = require('styled-components').default;

var _default = function (_Component) {
  _inherits(_default, _Component);

  function _default() {
    _classCallCheck(this, _default);

    return _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).apply(this, arguments));
  }

  _createClass(_default, [{
    key: 'removeEntity',
    value: function removeEntity() {
      var _props = this.props,
          editorState = _props.editorState,
          cancelEntity = _props.cancelEntity,
          onChange = _props.onChange;

      var selection = editorState.getSelection();
      if (!selection.isCollapsed()) {
        onChange(_draftJs.RichUtils.toggleLink(editorState, selection, null));
      }
      cancelEntity();
    }
  }, {
    key: 'render',
    value: function render() {
      var _context;

      var _props2 = this.props,
          editorState = _props2.editorState,
          onChange = _props2.onChange;


      var se = function se(data) {
        return (0, _entity.setEntity)('LINK', data, editorState, onChange);
      };
      var entityData = {};
      var entity = null;
      if ((0, _entity.hasEntity)('LINK', editorState)) {
        entity = (0, _entity.getCurrentEntity)(editorState);
        if (entity) {
          entityData = entity.getData();
        }
      }

      return _react2.default.createElement(_Link2.default, _extends({
        editorState: editorState,
        setEntity: se,
        onChange: onChange,
        cancelEntity: (_context = this.props).cancelEntity.bind(_context),
        removeEntity: this.removeEntity.bind(this),
        setError: (_context = this.props).setError.bind(_context),
        cancelError: (_context = this.props).cancelError.bind(_context),
        entity: entity
      }, entityData));
    }
  }]);

  return _default;
}(_react.Component);

exports.default = _default;