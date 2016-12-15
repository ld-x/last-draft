'use strict';

var _chai = require('chai');

var _sinon = require('sinon');

var _createStore = require('../createStore');

var _createStore2 = _interopRequireDefault(_createStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('createStore', function () {
  it('allows to pass in initial state', function () {
    var store = (0, _createStore2.default)({ name: 'Ada' });
    (0, _chai.expect)(store.getItem('name')).to.equal('Ada');
  });

  it('should be possible to update and get an item', function () {
    var store = (0, _createStore2.default)();
    store.updateItem('age', 74);
    (0, _chai.expect)(store.getItem('age')).to.equal(74);
  });

  it('should be possible to subscribe to an update', function (done) {
    var store = (0, _createStore2.default)();
    store.subscribeToItem('name', function (item) {
      (0, _chai.expect)(item).to.equal('Ada');
      done();
    });
    store.updateItem('name', 'Ada');
  });

  it('should be possible to unsubscribe from an update', function () {
    var store = (0, _createStore2.default)();
    var onNameChanged = (0, _sinon.stub)();
    store.subscribeToItem('name', onNameChanged);
    store.unsubscribeFromItem('name', onNameChanged);
    store.updateItem('name', 'Ada');
    (0, _chai.expect)(onNameChanged).to.not.have.been.called();
  });
});