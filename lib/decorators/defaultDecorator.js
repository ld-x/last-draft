'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _strategy = require('../utils/strategy');

var _Link = require('../components/Entities/Link');

var _Link2 = _interopRequireDefault(_Link);

var _Hashtag = require('../components/Entities/Hashtag');

var _Hashtag2 = _interopRequireDefault(_Hashtag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

var decorator = new _draftJs.CompositeDecorator([{
  strategy: (0, _strategy.createTypeStrategy)('LINK'),
  component: _Link2.default
}, {
  strategy: _strategy.hashtagStrategy,
  component: _Hashtag2.default
}, {
  strategy: _strategy.linkifyStrategy,
  component: _Link2.default
}]);

exports.default = decorator;