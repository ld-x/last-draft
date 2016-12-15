'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _decorateComponentWithProps = require('decorate-component-with-props');

var _decorateComponentWithProps2 = _interopRequireDefault(_decorateComponentWithProps);

var _Hashtag = require('./Hashtag');

var _Hashtag2 = _interopRequireDefault(_Hashtag);

var _hashtagStrategy = require('./hashtagStrategy');

var _hashtagStrategy2 = _interopRequireDefault(_hashtagStrategy);

var _styles = require('./styles.css');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultTheme = {
  hashtag: _styles2.default.hashtag
};

exports.default = function () {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // Styles are overwritten instead of merged as merging causes a lot of confusion.
  //
  // Why? Because when merging a developer needs to know all of the underlying
  // styles which needs a deep dive into the code. Merging also makes it prone to
  // errors when upgrading as basically every styling change would become a major
  // breaking change. 1px of an increased padding can break a whole layout.
  var theme = config.theme ? config.theme : defaultTheme;
  return {
    decorators: [{
      strategy: _hashtagStrategy2.default,
      component: (0, _decorateComponentWithProps2.default)(_Hashtag2.default, { theme: theme })
    }]
  };
};