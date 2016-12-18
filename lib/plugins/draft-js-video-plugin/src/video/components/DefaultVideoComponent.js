'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _DefaultVideoComponent = require('./DefaultVideoComponent.css');

var _DefaultVideoComponent2 = _interopRequireDefault(_DefaultVideoComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var YOUTUBE_PREFIX = 'https://www.youtube.com/embed/';
var VIMEO_PREFIX = 'https://player.vimeo.com/video/';
var iframeStyle = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: '0',
  left: '0'
};

var getSrc = function getSrc(_ref) {
  var src = _ref.src;
  var isYoutube = _utils2.default.isYoutube,
      getYoutubeSrc = _utils2.default.getYoutubeSrc,
      isVimeo = _utils2.default.isVimeo,
      getVimeoSrc = _utils2.default.getVimeoSrc;

  if (isYoutube(src)) {
    var _getYoutubeSrc = getYoutubeSrc(src),
        srcID = _getYoutubeSrc.srcID;

    return '' + YOUTUBE_PREFIX + srcID;
  }
  if (isVimeo(src)) {
    var _getVimeoSrc = getVimeoSrc(src),
        _srcID = _getVimeoSrc.srcID;

    return '' + VIMEO_PREFIX + _srcID;
  }
  return undefined;
};

var DefaultVideoCompoent = function DefaultVideoCompoent(props) {
  var blockProps = props.blockProps,
      style = props.style;

  var src = getSrc(blockProps);
  if (src) {
    return _react2.default.createElement(
      'div',
      { style: style },
      _react2.default.createElement(
        'div',
        { className: _DefaultVideoComponent2.default.iframeContainer },
        _react2.default.createElement('iframe', {
          style: iframeStyle,
          src: src,
          frameBorder: '0',
          allowFullScreen: true
        })
      )
    );
  }

  return _react2.default.createElement(
    'div',
    { className: _DefaultVideoComponent2.default.invalidVideoSrc },
    'invalid video source'
  );
};

DefaultVideoCompoent.propTypes = {
  blockProps: _react.PropTypes.object
};
exports.default = DefaultVideoCompoent;