'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _chai = require('chai');

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable jsx-a11y/anchor-has-content */

describe('Link', function () {
  it('applies the className based on the theme property `link`', function () {
    var theme = { link: 'custom-class-name' };
    var result = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, { theme: theme }));
    (0, _chai.expect)(result).to.have.prop('className', 'custom-class-name');
  });

  it('applies any custom passed prop', function () {
    var result = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, { 'data-custom': 'unicorn' }));
    (0, _chai.expect)(result).to.have.prop('data-custom', 'unicorn');
  });

  it('renders the passed in children', function () {
    var result = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, { children: 'https://www.draft-js-plugins.com/' }));
    (0, _chai.expect)(result).to.have.prop('children', 'https://www.draft-js-plugins.com/');
  });

  it('applies a custom className as well as the theme', function () {
    var theme = { link: 'custom-class-name' };
    var result = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, { theme: theme, className: 'link' }));
    (0, _chai.expect)(result).to.have.prop('className').to.contain('link');
    (0, _chai.expect)(result).to.have.prop('className').to.contain('custom-class-name');
  });

  it('uses the decoratedText prop as href', function () {
    var result = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, { decoratedText: 'https://www.draft-js-plugins.com/' }));
    (0, _chai.expect)(result).to.have.prop('href').to.contain('https://www.draft-js-plugins.com/');
  });

  it('applies http prefix when none is supplied', function () {
    var result = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, { decoratedText: 'draft-js-plugins.com/' }));
    (0, _chai.expect)(result).to.have.prop('href').to.contain('http://draft-js-plugins.com/');
  });

  it('does not apply a prefix when one is already supplied', function () {
    var result = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, { decoratedText: 'ftp://draft-js-plugins.com/' }));
    (0, _chai.expect)(result).to.have.prop('href').to.contain('ftp://draft-js-plugins.com/');
  });

  it('generates correct href to localhost with port', function () {
    var result = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, { decoratedText: 'http://localhost:8000' }));
    (0, _chai.expect)(result).to.have.prop('href').to.contain('http://localhost:8000');
  });

  it('generates mailto href when supplied with email', function () {
    var result = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, { decoratedText: 'name@example.com' }));
    (0, _chai.expect)(result).to.have.prop('href').to.contain('mailto:name@example.com');
  });

  it('uses _self as the default target value', function () {
    var result = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, null));
    (0, _chai.expect)(result).to.have.prop('target').to.contain('_self');
  });

  it('applies custom target value', function () {
    // eslint-disable-next-line react/jsx-no-target-blank
    var result = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, { target: '_blank' }));
    (0, _chai.expect)(result).to.have.prop('target').to.contain('_blank');
  });
});