'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Image = undefined;

var _draftJs = require('draft-js');

var _decorateComponentWithProps = require('decorate-component-with-props');

var _decorateComponentWithProps2 = _interopRequireDefault(_decorateComponentWithProps);

var _addImage = require('./modifiers/addImage');

var _addImage2 = _interopRequireDefault(_addImage);

var _Image = require('./Image');

var _Image2 = _interopRequireDefault(_Image);

var _imageStyles = require('./imageStyles.css');

var _imageStyles2 = _interopRequireDefault(_imageStyles);

var _ImageAdd = require('./ImageAdd');

var _ImageAdd2 = _interopRequireDefault(_ImageAdd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultTheme = {
  image: _imageStyles2.default.image
};

var imagePlugin = function imagePlugin() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var theme = config.theme ? config.theme : defaultTheme;
  var Image = config.imageComponent || _Image2.default;
  if (config.decorator) {
    Image = config.decorator(Image);
  }
  var ThemedImage = (0, _decorateComponentWithProps2.default)(Image, { theme: theme });
  return {
    blockRendererFn: function blockRendererFn(block) {
      if (block.getType() === 'atomic') {
        var entity = _draftJs.Entity.get(block.getEntityAt(0));
        var type = entity.getType();
        if (type === 'image') {
          return {
            component: ThemedImage,
            editable: false
          };
        }
      }

      return null;
    },
    addImage: _addImage2.default,
    ImageAdd: _ImageAdd2.default
  };
};

exports.default = imagePlugin;
var Image = exports.Image = _Image2.default;