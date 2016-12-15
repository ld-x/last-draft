'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _immutable = require('immutable');

var _draftJs = require('draft-js');

var _chai = require('chai');

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Mention', function () {
  it('renders an Anchor tag in case a link is provided', function () {
    var mention = (0, _immutable.fromJS)({
      link: 'https://www.example.com/john'
    });
    var entityKey = _draftJs.Entity.create('mention', 'SEGMENTED', { mention: mention });
    var result = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, { entityKey: entityKey, theme: (0, _immutable.Map)() }));
    (0, _chai.expect)(result).to.have.tagName('a');
  });

  it('renders a Span tag in case no link is provided', function () {
    var mention = (0, _immutable.fromJS)({});
    var entityKey = _draftJs.Entity.create('mention', 'SEGMENTED', { mention: mention });
    var result = (0, _enzyme.render)(_react2.default.createElement(_index2.default, { entityKey: entityKey, theme: (0, _immutable.Map)() }));
    (0, _chai.expect)(result).to.have.tagName('span');
  });

  it('can render when mention is an Object', function () {
    var mention = {};
    var entityKey = _draftJs.Entity.create('mention', 'SEGMENTED', { mention: mention });
    var result = (0, _enzyme.render)(_react2.default.createElement(_index2.default, { entityKey: entityKey, theme: (0, _immutable.Map)() }));
    (0, _chai.expect)(result).to.have.tagName('span');
  });
});