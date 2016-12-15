'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _chai = require('chai');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _immutable = require('immutable');

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mentions = (0, _immutable.fromJS)([{
  name: 'Matthew Russell',
  link: 'https://twitter.com/mrussell247',
  avatar: 'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg'
}, {
  name: 'Julian Krispel-Samsel',
  link: 'https://twitter.com/juliandoesstuff',
  avatar: 'https://pbs.twimg.com/profile_images/477132877763579904/m5bFc8LF_400x400.png'
}, {
  name: 'Jyoti Puri',
  link: 'https://twitter.com/jyopur',
  avatar: 'https://pbs.twimg.com/profile_images/705714058939359233/IaJoIa78_400x400.jpg'
}, {
  name: 'Max Stoiber',
  link: 'https://twitter.com/mxstbr',
  avatar: 'https://pbs.twimg.com/profile_images/763033229993574400/6frGyDyA_400x400.jpg'
}, {
  name: 'Nik Graf',
  link: 'https://twitter.com/nikgraf',
  avatar: 'https://pbs.twimg.com/profile_images/535634005769457664/Ppl32NaN_400x400.jpeg'
}, {
  name: 'Pascal Brandt',
  link: 'https://twitter.com/psbrandt',
  avatar: 'https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png'
}]);

describe('MentionSuggestions Component', function () {
  it('Closes when suggestions is empty', function () {
    var callbacks = {
      onDownArrow: _sinon2.default.spy(),
      onUpArrow: _sinon2.default.spy(),
      onTab: _sinon2.default.spy(),
      onEscape: _sinon2.default.spy(),
      handleReturn: _sinon2.default.spy()
    };
    var store = {
      getAllSearches: _sinon2.default.spy(function () {
        return { has: function has() {
            return false;
          } };
      }),
      getPortalClientRect: _sinon2.default.spy(),
      isEscaped: _sinon2.default.spy(),
      resetEscapedSearch: _sinon2.default.spy(),
      escapeSearch: _sinon2.default.spy()
    };
    var ariaProps = {};
    var onSearchChange = _sinon2.default.spy();
    var onAddMention = _sinon2.default.spy();
    var positionSuggestions = _sinon2.default.stub().returns({});
    var suggestions = (0, _enzyme.mount)(_react2.default.createElement(_index2.default, {
      ariaProps: ariaProps,
      onSearchChange: onSearchChange,
      positionSuggestions: positionSuggestions,
      suggestions: mentions,
      callbacks: callbacks,
      store: store,
      theme: {},
      onAddMention: onAddMention
    }));

    suggestions.instance().openDropdown();
    (0, _chai.expect)(suggestions.state().isActive).to.equal(true);

    suggestions.setProps({
      suggestions: (0, _immutable.fromJS)([])
    });
    (0, _chai.expect)(suggestions.state().isActive).to.equal(false);
  });
});