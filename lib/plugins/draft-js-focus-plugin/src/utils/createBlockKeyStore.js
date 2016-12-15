'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var createBlockKeyStore = function createBlockKeyStore() {
  var keys = (0, _immutable.List)();

  var add = function add(key) {
    keys = keys.push(key);
    return keys;
  };

  var remove = function remove(key) {
    keys = keys.filter(function (item) {
      return item !== key;
    });
    return keys;
  };

  return {
    add: add,
    remove: remove,
    includes: function includes(key) {
      return keys.includes(key);
    },
    getAll: function getAll() {
      return keys;
    }
  };
};

exports.default = createBlockKeyStore;