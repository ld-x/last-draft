'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n'], ['\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016, Globo.com (https://github.com/globocom)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var _default = function (_Component) {
  _inherits(_default, _Component);

  function _default(props) {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this, props));

    _this.remove = _this.remove.bind(_this);
    _this.updateData = _this.updateData.bind(_this);
    _this.onChange = _this.props.blockProps.onChange;
    return _this;
  }

  _createClass(_default, [{
    key: 'remove',
    value: function remove() {
      var editorState = this.props.blockProps.editorState;

      var selection = editorState.getSelection();
      var content = editorState.getCurrentContent();
      var keyAfter = content.getKeyAfter(this.props.block.key);
      var blockMap = content.getBlockMap().delete(this.props.block.key);
      var withoutAtomicBlock = content.merge({
        blockMap: blockMap, selectionAfter: selection
      });
      var newState = _draftJs.EditorState.push(editorState, withoutAtomicBlock, 'remove-range');
      var newSelection = new _draftJs.SelectionState({
        anchorKey: keyAfter,
        anchorOffset: 0,
        focusKey: keyAfter,
        focusOffset: this.props.block.getLength()
      });
      var newEditorState = _draftJs.EditorState.forceSelection(newState, newSelection);
      this.onChange(newEditorState);
    }
  }, {
    key: 'updateData',
    value: function updateData(data) {
      var editorState = this.props.blockProps.editorState;

      var content = editorState.getCurrentContent();
      var selection = new _draftJs.SelectionState({
        anchorKey: this.props.block.key,
        anchorOffset: 0,
        focusKey: this.props.block.key,
        focusOffset: this.props.block.getLength()
      });

      var newContentState = _draftJs.Modifier.mergeBlockData(content, selection, data);
      var newEditorState = _draftJs.EditorState.push(editorState, newContentState);
      this.onChange(newEditorState);
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus() {
      var setReadOnly = this.props.blockProps.setReadOnly;

      setReadOnly(true);
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur() {
      var setReadOnly = this.props.blockProps.setReadOnly;

      setReadOnly(false);
    }
  }, {
    key: 'render',
    value: function render() {
      var data = this.props.block.getData().toJS();
      var plugin = this.props.blockProps.plugin;

      var Block = plugin.block;
      return _react2.default.createElement(
        Media,
        { onBlur: this.handleBlur.bind(this), onFocus: this.handleFocus.bind(this) },
        _react2.default.createElement(Block, { data: data, container: this, blockProps: this.props.blockProps })
      );
    }
  }]);

  return _default;
}(_react.Component);

exports.default = _default;


var Media = _styledComponents2.default.div(_templateObject);