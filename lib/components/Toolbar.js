"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n  font-family: Open Sans, sans-serif;\n  color: #181818;\n  font-size: 1.125rem;\n  letter-spacing: -0.037rem;\n  line-height: 1.75rem;\n  background: yellow;\n  height: 0;\n  position: relative;\n  z-index: 10;\n"], ["\n  font-family: Open Sans, sans-serif;\n  color: #181818;\n  font-size: 1.125rem;\n  letter-spacing: -0.037rem;\n  line-height: 1.75rem;\n  background: yellow;\n  height: 0;\n  position: relative;\n  z-index: 10;\n"]),
    _templateObject2 = _taggedTemplateLiteral(["\n  background: #181818;\n  border-radius: 4px;\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);\n  left: -50%;\n  position: relative;\n  transition: background-color 0.2s ease-in-out;\n"], ["\n  background: #181818;\n  border-radius: 4px;\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);\n  left: -50%;\n  position: relative;\n  transition: background-color 0.2s ease-in-out;\n"]),
    _templateObject3 = _taggedTemplateLiteral(["\n  padding: 0 8px;\n  margin: 0;\n  whiteSpace: nowrap;\n"], ["\n  padding: 0 8px;\n  margin: 0;\n  whiteSpace: nowrap;\n"]),
    _templateObject4 = _taggedTemplateLiteral(["\n  display: inline-block;\n  top: 100%;\n  left: 50%;\n  height: 0;\n  width: 0;\n  position: absolute;\n  pointerEvents: none;\n  borderWidth: 8px;\n  borderStyle: solid;\n  borderColor: #181818 transparent transparent;\n  marginLeft: -8px;\n  transition: border-color 0.2s ease-in-out;\n"], ["\n  display: inline-block;\n  top: 100%;\n  left: 50%;\n  height: 0;\n  width: 0;\n  position: absolute;\n  pointerEvents: none;\n  borderWidth: 8px;\n  borderStyle: solid;\n  borderColor: #181818 transparent transparent;\n  marginLeft: -8px;\n  transition: border-color 0.2s ease-in-out;\n"]),
    _templateObject5 = _taggedTemplateLiteral(["\n  margin: 0;\n  height: 0;\n  transition: height 0.2s ease-in-out;\n  color: #FFF;\n  font-size: 0.75rem;\n  font-weight: bold;\n"], ["\n  margin: 0;\n  height: 0;\n  transition: height 0.2s ease-in-out;\n  color: #FFF;\n  font-size: 0.75rem;\n  font-weight: bold;\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _draftJs = require("draft-js");

var _ToolbarItem = require("./ToolbarItem");

var _ToolbarItem2 = _interopRequireDefault(_ToolbarItem);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styled = require('styled-components').default;

var _default = function (_Component) {
  _inherits(_default, _Component);

  function _default(props) {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this, props));

    _this.state = {
      editingEntity: null,
      link: "",
      error: null
    };
    _this.renderButton = _this.renderButton.bind(_this);
    _this.cancelEntity = _this.cancelEntity.bind(_this);
    return _this;
  }

  _createClass(_default, [{
    key: "toggleInlineStyle",
    value: function toggleInlineStyle(inlineStyle) {
      var newEditorState = _draftJs.RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle);
      this.props.onChange(newEditorState);
    }
  }, {
    key: "toggleBlockStyle",
    value: function toggleBlockStyle(blockType) {
      this.props.onChange(_draftJs.RichUtils.toggleBlockType(this.props.editorState, blockType));
    }
  }, {
    key: "toggleEntity",
    value: function toggleEntity(entity) {
      this.setState({ editingEntity: entity });
    }
  }, {
    key: "renderButton",
    value: function renderButton(item, position) {
      var _this2 = this;

      var current = null;
      var toggle = null;
      var active = null;
      var key = item.label;

      switch (item.type) {
        case "inline":
          {
            current = this.props.editorState.getCurrentInlineStyle();
            toggle = function toggle() {
              return _this2.toggleInlineStyle(item.style);
            };
            active = current.has(item.style);
            break;
          }
        case "block":
          {
            var selection = this.props.editorState.getSelection();
            current = this.props.editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
            toggle = function toggle() {
              return _this2.toggleBlockStyle(item.style);
            };
            active = item.style === current;
            break;
          }
        case "separator":
          {
            key = "sep-" + position;
            break;
          }
        case "entity":
          {
            var _ret = function () {
              var _item$entity = item.entity,
                  entity = _item$entity === undefined ? "LINK" : _item$entity;

              key = "entity-" + entity;
              toggle = function toggle() {
                return _this2.toggleEntity(entity);
              };
              active = _this2.hasEntity(entity);
              return "break";
            }();

            if (_ret === "break") break;
          }
      }

      return _react2.default.createElement(_ToolbarItem2.default, { key: key, active: active, toggle: toggle, item: item });
    }
  }, {
    key: "setError",
    value: function setError(errorMsg) {
      this.setState({ error: errorMsg });
    }
  }, {
    key: "cancelError",
    value: function cancelError() {
      this.setState({ error: null });
    }
  }, {
    key: "setBarPosition",
    value: function setBarPosition() {
      var editor = this.props.editor;
      var toolbar = this.refs.toolbar;
      var selectionCoords = (0, _utils.getSelectionCoords)(editor, toolbar);

      if (!selectionCoords) {
        return null;
      }

      if (selectionCoords && !this.state.position || this.state.position.bottom !== selectionCoords.offsetBottom || this.state.position.left !== selectionCoords.offsetLeft) {
        this.setState({
          position: {
            bottom: selectionCoords.offsetBottom,
            left: selectionCoords.offsetLeft
          }
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (!this.props.editorState.getSelection().isCollapsed()) {
        return this.setBarPosition();
      }
    }
  }, {
    key: "getCurrentEntityKey",
    value: function getCurrentEntityKey() {
      var selection = this.props.editorState.getSelection();
      var anchorKey = selection.getAnchorKey();
      var contentState = this.props.editorState.getCurrentContent();
      var anchorBlock = contentState.getBlockForKey(anchorKey);
      var offset = selection.anchorOffset;
      var index = selection.isBackward ? offset - 1 : offset;
      return anchorBlock.getEntityAt(index);
    }
  }, {
    key: "getCurrentEntity",
    value: function getCurrentEntity() {
      var entityKey = this.getCurrentEntityKey();
      if (entityKey) {
        return _draftJs.Entity.get(entityKey);
      }
      return null;
    }
  }, {
    key: "hasEntity",
    value: function hasEntity(entityType) {
      var entity = this.getCurrentEntity();
      if (entity && entity.getType() === entityType) {
        return true;
      }
      return false;
    }
  }, {
    key: "setEntity",
    value: function setEntity(entityType, data) {
      var editorState = this.props.editorState;

      var entityKey = _draftJs.Entity.create(entityType, "MUTABLE", data);
      var newState = _draftJs.RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey);
      var selectionState = _draftJs.EditorState.forceSelection(newState, editorState.getSelection());

      this.props.onChange(selectionState);
    }
  }, {
    key: "removeEntity",
    value: function removeEntity() {
      var editorState = this.props.editorState;

      var selection = editorState.getSelection();
      if (!selection.isCollapsed()) {
        this.props.onChange(_draftJs.RichUtils.toggleLink(editorState, selection, null));
      }
      this.cancelEntity();
    }
  }, {
    key: "cancelEntity",
    value: function cancelEntity() {
      this.props.editor && this.props.editor.focus();
      this.setState({ editingEntity: null, error: null });
    }
  }, {
    key: "renderEntityInput",
    value: function renderEntityInput(entityType) {
      var _this3 = this;

      if (!this.props.entityInputs) {
        console.warn("no entityInputs provided");
        return null;
      }
      var Component = this.props.entityInputs[entityType];
      var setEntity = function setEntity(data) {
        return _this3.setEntity(entityType, data);
      };
      var entityData = {};
      var entity = null;
      if (this.hasEntity(entityType)) {
        entity = this.getCurrentEntity();
        if (entity) {
          entityData = entity.getData();
        }
      }
      if (Component) {
        return _react2.default.createElement(Component, _extends({
          editorState: this.props.editorState,
          setEntity: setEntity,
          entityType: entityType,
          onChange: this.props.onChange,
          cancelEntity: this.cancelEntity,
          removeEntity: this.removeEntity.bind(this),
          setError: this.setError.bind(this),
          cancelError: this.cancelError.bind(this),
          entity: entity
        }, entityData));
      } else {
        console.warn("unknown entity type: " + entityType);
        return null;
      }
    }
  }, {
    key: "renderToolList",
    value: function renderToolList() {
      return _react2.default.createElement(
        ToolbarList,
        { onMouseDown: function onMouseDown(e) {
            e.preventDefault();
          } },
        this.props.actions.map(this.renderButton)
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _state = this.state,
          position = _state.position,
          error = _state.error;


      if (this.props.readOnly) {
        return null;
      }

      var showToolbar = true;
      if (this.props.editorState.getSelection().isCollapsed()) {
        showToolbar = false;
      }

      var toolbarStyle = { display: showToolbar ? 'block' : 'none' };
      if (position !== undefined) {
        toolbarStyle = Object.assign(position, toolbarStyle);
      }
      var toolbarWrapperStyle = {
        backgroundColor: error ? '#E83F26' : '#181818'
      };

      var toolbarErrorStyle = {
        margin: error ? '-8px 0 0 20px' : '0',
        height: error ? '28px' : '0',
        paddingBottom: error ? '12px' : '0'
      };

      return _react2.default.createElement(
        Toolbar,
        { ref: "toolbarWrapper", style: toolbarStyle },
        _react2.default.createElement(
          "div",
          { style: { position: "absolute", bottom: 0 } },
          _react2.default.createElement(
            ToolbarWrapper,
            { ref: "toolbar", style: toolbarWrapperStyle },
            this.state.editingEntity ? this.renderEntityInput(this.state.editingEntity) : this.renderToolList(),
            _react2.default.createElement(
              ToolbarErrorMsg,
              { style: toolbarErrorStyle },
              this.state.error
            ),
            _react2.default.createElement(ToolbarArrow, null)
          )
        )
      );
    }
  }]);

  return _default;
}(_react.Component);

exports.default = _default;


var Toolbar = styled.div(_templateObject);

var ToolbarWrapper = styled.div(_templateObject2);

var ToolbarList = styled.ul(_templateObject3);

var ToolbarArrow = styled.span(_templateObject4);

var ToolbarErrorMsg = styled.p(_templateObject5);