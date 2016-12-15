'use strict';

var _draftJs = require('draft-js');

var _draftJs2 = _interopRequireDefault(_draftJs);

var _chai = require('chai');

var _MultiDecorator = require('../MultiDecorator');

var _MultiDecorator2 = _interopRequireDefault(_MultiDecorator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('MultiDecorator', function () {
  var contentBlock = new _draftJs2.default.ContentBlock({
    text: 'AAA BBB CCC ABC'
  });

  var firstDecorator = new _draftJs2.default.CompositeDecorator([{
    strategy: function strategy(block, callback) {
      callback(0, 3);
      callback(12, 15);
    },

    component: function component() {
      return 'a';
    }
  }]);

  var secondDecorator = new _draftJs2.default.CompositeDecorator([{
    strategy: function strategy(block, callback) {
      callback(4, 7);
      callback(12, 15);
    },

    component: function component() {
      return 'b';
    }
  }]);

  var thirdDecorator = new _draftJs2.default.CompositeDecorator([{
    strategy: function strategy(block, callback) {
      callback(8, 11);
      callback(12, 15);
    },

    component: function component() {
      return 'c';
    }
  }]);

  var decorator = new _MultiDecorator2.default([firstDecorator, secondDecorator, thirdDecorator]);

  it('should correctly decorate text', function () {
    var out = decorator.getDecorations(contentBlock);

    (0, _chai.expect)(out.toJS()).to.deep.equal(['0-0.0', '0-0.0', '0-0.0', null, '1-0.0', '1-0.0', '1-0.0', null, '2-0.0', '2-0.0', '2-0.0', null, '2-0.1', '2-0.1', '2-0.1']);
  });

  it('should correctly resolve component', function () {
    var fn = decorator.getComponentForKey('0-0.0');
    (0, _chai.expect)(fn()).to.equal('a');

    fn = decorator.getComponentForKey('1-0.0');
    (0, _chai.expect)(fn()).to.equal('b');
  });
});