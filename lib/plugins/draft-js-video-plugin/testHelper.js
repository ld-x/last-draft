'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _dirtyChai = require('dirty-chai');

var _dirtyChai2 = _interopRequireDefault(_dirtyChai);

var _cssModulesRequireHook = require('css-modules-require-hook');

var _cssModulesRequireHook2 = _interopRequireDefault(_cssModulesRequireHook);

var _jsdom = require('jsdom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.NODE_ENV = 'test';

(0, _cssModulesRequireHook2.default)({
  generateScopedName: '[name]__[local]___[hash:base64:5]'
});

var exposedProperties = ['window', 'navigator', 'document'];

global.document = (0, _jsdom.jsdom)('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach(function (property) {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

// chaiEnzyme needs to be initialised here, so that canUseDOM is set
// to true when react-dom initialises (which chai-enzyme depends upon)
var chaiEnzyme = require('chai-enzyme');

_chai2.default.use(_dirtyChai2.default);
_chai2.default.use(chaiEnzyme());