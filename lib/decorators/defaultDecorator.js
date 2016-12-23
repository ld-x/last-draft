'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _utils = require('../utils');

var _Link = require('../components/Link');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var decorator = new _draftJs.CompositeDecorator([{
  strategy: (0, _utils.createTypeStrategy)('LINK'),
  component: _Link2.default
}]);

exports.default = decorator;