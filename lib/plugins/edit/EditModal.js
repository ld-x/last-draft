'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  position: absolute;\n  width: 100%;\n  white-space: nowrap;\n  top: -60px;\n  background-color: #fff;\n  box-shadow: 0 1px 18px 0 rgba(0, 0, 0, 0.3);\n  z-index: 100;\n'], ['\n  position: absolute;\n  width: 100%;\n  white-space: nowrap;\n  top: -60px;\n  background-color: #fff;\n  box-shadow: 0 1px 18px 0 rgba(0, 0, 0, 0.3);\n  z-index: 100;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  background-color: transparent;\n  border: 1px solid #eee;\n  border-radius: 2px;\n  color: #181818 !important;\n  font-size: 15px;\n  line-height: 1.2;\n  margin: 1em;\n  padding: 8px;\n  width: 80% !important;\n  height: 150px !important;\n  resize: none;\n  vertical-align: bottom;\n\n  &:hover {\n    border: 1px solid #ccc;\n  }\n\n  &:focus {\n    border: 1px solid #ccc;\n    outline: none;\n  }\n'], ['\n  background-color: transparent;\n  border: 1px solid #eee;\n  border-radius: 2px;\n  color: #181818 !important;\n  font-size: 15px;\n  line-height: 1.2;\n  margin: 1em;\n  padding: 8px;\n  width: 80% !important;\n  height: 150px !important;\n  resize: none;\n  vertical-align: bottom;\n\n  &:hover {\n    border: 1px solid #ccc;\n  }\n\n  &:focus {\n    border: 1px solid #ccc;\n    outline: none;\n  }\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  padding: 0;\n  cursor: pointer;\n  border: 0;\n  height: 40px;\n  width: 40px;\n  background: transparent;\n  padding-right: 16px;\n  color: #ccc;\n\n  &:hover {\n    color: #9d1d20;\n  }\n'], ['\n  padding: 0;\n  cursor: pointer;\n  border: 0;\n  height: 40px;\n  width: 40px;\n  background: transparent;\n  padding-right: 16px;\n  color: #ccc;\n\n  &:hover {\n    color: #9d1d20;\n  }\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  display: inline-block;\n'], ['\n  display: inline-block;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _convert = require('../../utils/convert');

var _selection = require('../../utils/selection');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditModal = function (_Component) {
  _inherits(EditModal, _Component);

  function EditModal(props) {
    _classCallCheck(this, EditModal);

    var _this = _possibleConstructorReturn(this, (EditModal.__proto__ || Object.getPrototypeOf(EditModal)).call(this, props));

    _this.state = { code: '', width: 300 };
    return _this;
  }

  _createClass(EditModal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setCodeFromState();
      this.setModalWidth();
    }
  }, {
    key: 'setModalWidth',
    value: function setModalWidth() {
      var element = (0, _selection.getSelectedBlockElement)(this.props.editorState);
      if (!element) {
        return;
      }
      var container = element.getBoundingClientRect();
      this.setState({ width: container.width });
    }
  }, {
    key: 'setStateFromCode',
    value: function setStateFromCode() {
      this.props.submitEditModal(this.state.code);
    }
  }, {
    key: 'setCodeFromState',
    value: function setCodeFromState() {
      var _props = this.props,
          editorState = _props.editorState,
          onChange = _props.onChange;

      var html = (0, _convert.editorStateToHtml)(editorState);
      this.setState({ code: html });
      _reactDom2.default.findDOMNode(this.refs.textArea).focus();
    }
  }, {
    key: 'onEditCodeChange',
    value: function onEditCodeChange(event) {
      event.stopPropagation();
      var code = event.target.value;
      this.setState({ code: code });
    }
  }, {
    key: 'submitEdit',
    value: function submitEdit(event) {
      this.setStateFromCode();
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        this.props.closeModal();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          code = _state.code,
          width = _state.width;


      return _react2.default.createElement(
        Wrapper,
        { style: { width: width + 'px', left: '-220px' } },
        _react2.default.createElement(EditCodeTextArea, {
          className: 'ld-edit-code-textarea',
          ref: 'textArea',
          onChange: this.onEditCodeChange.bind(this),
          value: code,
          onKeyDown: this.onKeyDown.bind(this) }),
        _react2.default.createElement(
          EditCodeButtonWrapper,
          { className: 'ld-edit-code-button-wrapper' },
          _react2.default.createElement(
            EditCodeButton,
            {
              className: 'ld-edit-code-submit-button',
              onClick: this.submitEdit.bind(this),
              type: 'button'
            },
            _react2.default.createElement(
              'svg',
              { fill: 'currentColor', height: '24', viewBox: '0 0 24 24', width: '24' },
              _react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' }),
              _react2.default.createElement('path', { d: 'M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z' })
            )
          ),
          _react2.default.createElement(
            EditCodeButton,
            {
              className: 'ld-edit-code-close-button',
              onClick: this.props.closeModal,
              type: 'button'
            },
            _react2.default.createElement(
              'svg',
              { width: '24', height: '24', viewBox: '0 0 24 24', className: 'ld-button-close' },
              _react2.default.createElement(
                'g',
                { fill: 'currentColor', fillRule: 'evenodd' },
                _react2.default.createElement('path', { d: 'M16.95 5.636l1.414 1.414L7.05 18.364 5.636 16.95z' }),
                _react2.default.createElement('path', { d: 'M16.95 18.364l1.414-1.414L7.05 5.636 5.636 7.05z' })
              )
            )
          )
        )
      );
    }
  }]);

  return EditModal;
}(_react.Component);

exports.default = EditModal;

var Wrapper = _styledComponents2.default.div(_templateObject);

var EditCodeTextArea = _styledComponents2.default.textarea(_templateObject2);

var EditCodeButton = _styledComponents2.default.button(_templateObject3);

var EditCodeButtonWrapper = _styledComponents2.default.span(_templateObject4);