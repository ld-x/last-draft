'use strict';

var _chai = require('chai');

var _getWordAt = require('../getWordAt');

var _getWordAt2 = _interopRequireDefault(_getWordAt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getWordAt', function () {
  it('finds a word in between sentence', function () {
    var expected = {
      word: 'is',
      begin: 5,
      end: 7
    };
    (0, _chai.expect)((0, _getWordAt2.default)('this is a test', 5)).to.deep.equal(expected);
  });

  it('finds the first word', function () {
    var expected = {
      word: 'this',
      begin: 0,
      end: 4
    };
    (0, _chai.expect)((0, _getWordAt2.default)('this is a test', 0)).to.deep.equal(expected);
  });

  it('finds the last word', function () {
    var expected = {
      word: 'test',
      begin: 10,
      end: 14
    };
    (0, _chai.expect)((0, _getWordAt2.default)('this is a test', 15)).to.deep.equal(expected);
  });
});