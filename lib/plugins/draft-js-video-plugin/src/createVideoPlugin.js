'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _decorateComponentWithProps = require('decorate-component-with-props');

var _decorateComponentWithProps2 = _interopRequireDefault(_decorateComponentWithProps);

var _addVideo = require('./video/modifiers/addVideo');

var _addVideo2 = _interopRequireDefault(_addVideo);

var _DefaultVideoComponent = require('./video/components/DefaultVideoComponent');

var _DefaultVideoComponent2 = _interopRequireDefault(_DefaultVideoComponent);

var _constants = require('./video/constants');

var types = _interopRequireWildcard(_constants);

var _videoStyles = require('./videoStyles.css');

var _videoStyles2 = _interopRequireDefault(_videoStyles);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultTheme = _videoStyles2.default;

var videoPlugin = function videoPlugin() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var theme = config.theme ? config.theme : defaultTheme;
  var Video = config.videoComponent || _DefaultVideoComponent2.default;
  if (config.decorator) {
    Video = config.decorator(Video);
  }
  var ThemedVideo = (0, _decorateComponentWithProps2.default)(Video, { theme: theme });
  return {
    blockRendererFn: function blockRendererFn(block) {
      if (block.getType() === types.ATOMIC) {
        // TODO subject to change for draft-js next release
        var entity = _draftJs.Entity.get(block.getEntityAt(0));
        var type = entity.getType();

        var _entity$getData = entity.getData(),
            src = _entity$getData.src;

        if (type === types.VIDEOTYPE) {
          return {
            component: ThemedVideo,
            editable: false,
            props: {
              src: src
            }
          };
        }
      }

      return null;
    },
    addVideo: _addVideo2.default,
    types: types
  };
};

exports.default = videoPlugin;