"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createStore = function createStore(initialState) {
  var state = initialState || {};
  var listeners = {};

  var subscribeToItem = function subscribeToItem(key, callback) {
    listeners[key] = listeners[key] || [];
    listeners[key].push(callback);
  };

  var unsubscribeFromItem = function unsubscribeFromItem(key, callback) {
    listeners[key] = listeners[key].filter(function (listener) {
      return listener !== callback;
    });
  };

  var updateItem = function updateItem(key, item) {
    state = _extends({}, state, _defineProperty({}, key, item));
    if (listeners[key]) {
      listeners[key].forEach(function (listener) {
        return listener(state[key]);
      });
    }
  };

  var getItem = function getItem(key) {
    return state[key];
  };

  return {
    subscribeToItem: subscribeToItem,
    unsubscribeFromItem: unsubscribeFromItem,
    updateItem: updateItem,
    getItem: getItem
  };
};

exports.default = createStore;