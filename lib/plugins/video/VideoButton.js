'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _insertDataBlock = require('../../utils/insertDataBlock');

var _insertDataBlock2 = _interopRequireDefault(_insertDataBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016, Globo.com (https://github.com/globocom)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var _default = function (_Component) {
  _inherits(_default, _Component);

  function _default() {
    _classCallCheck(this, _default);

    return _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).apply(this, arguments));
  }

  _createClass(_default, [{
    key: 'getVideoIdYoutube',
    value: function getVideoIdYoutube(str) {
      // link : https://youtube.com/watch?v=HBHJ0XGZfLs
      // share : https://youtu.be/HBHJ0XGZfLs
      // embed : https://youtube.com/embed/HBHJ0XGZfLs
      var re = /\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9_\-]+)/i;
      var matches = re.exec(str);
      return matches && matches[1];
    }
  }, {
    key: 'getVideoIdVimeo',
    value: function getVideoIdVimeo(str) {
      // embed & link: https://vimeo.com/713300
      var re = /\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i;
      var matches = re.exec(str);
      return matches && matches[1];
    }
  }, {
    key: 'getVideoUrl',
    value: function getVideoUrl(src) {
      /* youtube */
      var id = this.getVideoIdYoutube(src);
      if (id !== null) {
        return 'https://youtube.com/embed/' + id;
      }

      /* vimeo */
      id = this.getVideoIdVimeo(src);
      if (id !== null) {
        return 'https://player.vimeo.com/video/' + id;
      }
      return '';
    }
  }, {
    key: 'onClick',
    value: function onClick(e) {
      e.preventDefault();
      var src = window.prompt('Enter the video URL');
      if (!src) {
        return;
      }

      var videoSrc = this.getVideoUrl(src);
      if (videoSrc === undefined) {
        return;
      }

      var data = { src: videoSrc, type: 'video' };
      this.props.onChange((0, _insertDataBlock2.default)(this.props.editorState, data));
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'svg',
        { width: '24', height: '24', onClick: this.onClick.bind(this), className: 'ld-button-video' },
        _react2.default.createElement('path', { fill: 'currentColor', d: 'M10 9v6l5-3-5-3zm8.222-3H5.778C4.8 6 4 6.6 4 7.333v9.334C4 17.4 4.8 18 5.778 18h12.444C19.2 18 20 17.4 20 16.667V7.333C20 6.6 19.2 6 18.222 6z', fillRule: 'evenodd' })
      );
    }
  }]);

  return _default;
}(_react.Component);

exports.default = _default;