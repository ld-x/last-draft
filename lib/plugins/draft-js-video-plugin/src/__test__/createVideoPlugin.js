'use strict';

var _chai = require('chai');

var _utils = require('../video/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('CreateVideoPlugin\'s  utils can parse correct youtube and vimeo ulr without config', function () {
  it('default video plugin handle youtube url', function () {
    var url = 'https://www.youtube.com/watch?v=YsRMoWYGLNA';
    var isYoutube = _utils2.default.isYoutube,
        getYoutubeSrc = _utils2.default.getYoutubeSrc;

    var result = isYoutube(url);
    (0, _chai.expect)(result).to.eq(true);
    var src = getYoutubeSrc(url);
    var expectSrc = {
      srcID: 'YsRMoWYGLNA',
      srcType: 'youtube',
      url: 'https://www.youtube.com/watch?v=YsRMoWYGLNA'
    };
    (0, _chai.expect)(src).to.deep.equal(expectSrc);
  });
  it('default video plugin handle vimeo url', function () {
    var url = 'https://vimeo.com/153979733';
    var isVimeo = _utils2.default.isVimeo,
        getVimeoSrc = _utils2.default.getVimeoSrc;

    var result = isVimeo(url);
    (0, _chai.expect)(result).to.eq(true);
    var src = getVimeoSrc(url);
    var expectSrc = {
      srcID: '153979733',
      srcType: 'vimeo',
      url: 'https://vimeo.com/153979733'
    };
    (0, _chai.expect)(src).to.deep.equal(expectSrc);
  });
});