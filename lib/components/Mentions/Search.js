'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  margin: 0;\n  font-weight: 200;\n  line-height: 1.5;\n  position: relative;\n  width: 100%;\n  min-width: 10rem;\n'], ['\n  margin: 0;\n  font-weight: 200;\n  line-height: 1.5;\n  position: relative;\n  width: 100%;\n  min-width: 10rem;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  background: white;\n  display: block;\n  text-decoration: none;\n  white-space: nowrap;\n  padding: 0;\n  max-height: 30rem;\n  overflow-x: hidden;\n  overflow-y: auto;\n  position: absolute;\n  width: 100%;\n  visibility: visible;\n  z-index: 100;\n'], ['\n  background: white;\n  display: block;\n  text-decoration: none;\n  white-space: nowrap;\n  padding: 0;\n  max-height: 30rem;\n  overflow-x: hidden;\n  overflow-y: auto;\n  position: absolute;\n  width: 100%;\n  visibility: visible;\n  z-index: 100;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  list-style-type: none;\n  padding: 0;\n  margin: 0;\n'], ['\n  list-style-type: none;\n  padding: 0;\n  margin: 0;\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  cursor: pointer;\n  padding: 0 0.5rem;\n\n  &:hover {\n    background: rgb(236, 236, 234);\n  }\n'], ['\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  cursor: pointer;\n  padding: 0 0.5rem;\n\n  &:hover {\n    background: rgb(236, 236, 234);\n  }\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n  padding: 0 1rem;\n'], ['\n  padding: 0 1rem;\n']),
    _templateObject6 = _taggedTemplateLiteral(['\n  width: 24px;\n  height: 24px;\n  border-radius: 12px;\n'], ['\n  width: 24px;\n  height: 24px;\n  border-radius: 12px;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _Icons = require('../Icons/');

var _Icons2 = _interopRequireDefault(_Icons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

var SearchItemInArrayObjects = function SearchItemInArrayObjects(items, input, searchKey) {
  if (input.trim() === '' || searchKey === undefined) {
    return [];
  }
  var reg = new RegExp(input.split('').join('\\w*').replace(/\W/, ''), 'i');

  return items.filter(function (item) {
    if (reg.test(item[searchKey])) {
      return item;
    }
  });
};

var _default = function (_Component) {
  _inherits(_default, _Component);

  function _default(props) {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this, props));

    _this.state = {
      foundUsers: []
    };
    return _this;
  }

  _createClass(_default, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.findUsers();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.searchValue !== this.props.searchValue) {
        this.findUsers();
      }
    }
  }, {
    key: 'selectAutoComplete',
    value: function selectAutoComplete(event) {
      var result = event.target.innerText;
      var user = this.props.mentionUsers.find(function (u) {
        return u.name === result;
      });
      if (typeof this.props.onClick !== 'undefined') {
        this.props.onClick(user);
      }
    }
  }, {
    key: 'findUsers',
    value: function findUsers() {
      var _this2 = this;

      var _props = this.props,
          mentionUsersAsync = _props.mentionUsersAsync,
          mentionUsers = _props.mentionUsers,
          searchValue = _props.searchValue,
          searchKey = _props.searchKey;


      if (mentionUsersAsync !== undefined) {
        /* async */
        mentionUsersAsync(searchValue).then(function (result) {
          console.log(result);
          _this2.setState({ foundUsers: result.mentionUsers });
        });
      } else {
        /* static list of users */
        var users = SearchItemInArrayObjects(mentionUsers, searchValue, searchKey);
        this.setState({ foundUsers: users });
      }
    }
  }, {
    key: 'renderUsers',
    value: function renderUsers() {
      var _this3 = this;

      var foundUsers = this.state.foundUsers;
      var searchValue = this.props.searchValue;


      return foundUsers.map(function (item, i) {
        var name = item.name;
        var avatarSrc = item.avatar;
        return _react2.default.createElement(
          'li',
          { key: i },
          _react2.default.createElement(
            MentionItem,
            null,
            _react2.default.createElement(Avatar, { src: avatarSrc }),
            _react2.default.createElement(
              MentionName,
              { key: name, onClick: _this3.selectAutoComplete.bind(_this3) },
              name
            )
          )
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var searchValue = this.props.searchValue;

      var menuStyle = { border: '1px solid #b7b7b7' };
      if (searchValue.length < 1) {
        menuStyle = { border: 'none' };
      }

      return _react2.default.createElement(
        Search,
        null,
        _react2.default.createElement(
          Menu,
          { style: menuStyle },
          _react2.default.createElement(
            List,
            null,
            this.renderUsers()
          )
        )
      );
    }
  }]);

  return _default;
}(_react.Component);

exports.default = _default;


var Search = _styledComponents2.default.div(_templateObject);

var Menu = _styledComponents2.default.div(_templateObject2);

var List = _styledComponents2.default.ul(_templateObject3);

var MentionItem = _styledComponents2.default.div(_templateObject4);

var MentionName = _styledComponents2.default.p(_templateObject5);

var Avatar = _styledComponents2.default.img(_templateObject6);