'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _chai = require('chai');

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Hashtag', function () {
  it('applies the className based on the theme property `hashtag`', function () {
    var theme = { hashtag: 'custom-class-name' };
    var result = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, { theme: theme }));
    (0, _chai.expect)(result).to.have.prop('className', 'custom-class-name');
  });

  it('applies any custom passed prop', function () {
    var result = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, { 'data-custom': 'unicorn' }));
    (0, _chai.expect)(result).to.have.prop('data-custom', 'unicorn');
  });

  it('renders the passed in children', function () {
    var result = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, { children: '#longRead' }));
    (0, _chai.expect)(result).to.have.prop('children', '#longRead');
  });

  it('applies a custom className as well as the theme', function () {
    var theme = { hashtag: 'custom-class-name' };
    var result = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, { theme: theme, className: 'hashtag' }));
    (0, _chai.expect)(result).to.have.prop('className').to.contain('hashtag');
    (0, _chai.expect)(result).to.have.prop('className').to.contain('custom-class-name');
  });
});