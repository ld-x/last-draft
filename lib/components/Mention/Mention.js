'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.positionSuggestions = exports.Entry = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Entry = function Entry(props) {
  var mention = props.mention,
      theme = props.theme,
      searchValue = props.searchValue,
      parentProps = _objectWithoutProperties(props, ['mention', 'theme', 'searchValue']);

  return _react2.default.createElement(
    'div',
    parentProps,
    _react2.default.createElement(
      'div',
      { className: theme.mentionSuggestionsEntryContainer },
      _react2.default.createElement(
        'div',
        { className: theme.mentionSuggestionsEntryContainerLeft },
        _react2.default.createElement('img', {
          src: mention.get('avatar'),
          className: theme.mentionSuggestionsEntryAvatar,
          role: 'presentation'
        })
      ),
      _react2.default.createElement(
        'div',
        { className: theme.mentionSuggestionsEntryContainerRight },
        _react2.default.createElement(
          'div',
          { className: theme.mentionSuggestionsEntryText },
          mention.get('name')
        ),
        _react2.default.createElement(
          'div',
          { className: theme.mentionSuggestionsEntryTitle },
          mention.get('title')
        )
      )
    )
  );
};

exports.Entry = Entry;
var positionSuggestions = exports.positionSuggestions = function positionSuggestions(_ref) {
  var state = _ref.state,
      props = _ref.props;

  var transform = void 0;
  var transition = void 0;

  if (state.isActive && props.suggestions.size > 0) {
    transform = 'scaleY(1)';
    transition = 'all 0.25s cubic-bezier(.3,1.2,.2,1)';
  } else if (state.isActive) {
    transform = 'scaleY(0)';
    transition = 'all 0.25s cubic-bezier(.3,1,.2,1)';
  }

  return {
    transform: transform,
    transition: transition
  };
};