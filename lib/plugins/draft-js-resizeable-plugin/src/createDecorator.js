'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getDisplayName = function getDisplayName(WrappedComponent) {
  var component = WrappedComponent.WrappedComponent || WrappedComponent;
  return component.displayName || component.name || 'Component';
};

var round = function round(x, steps) {
  return Math.ceil(x / steps) * steps;
};

exports.default = function (_ref) {
  var config = _ref.config,
      store = _ref.store;
  return function (WrappedComponent) {
    var _class, _temp2;

    return _temp2 = _class = function (_Component) {
      _inherits(BlockResizeableDecorator, _Component);

      function BlockResizeableDecorator() {
        var _ref2;

        var _temp, _this, _ret;

        _classCallCheck(this, BlockResizeableDecorator);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = BlockResizeableDecorator.__proto__ || Object.getPrototypeOf(BlockResizeableDecorator)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {
          hoverPosition: {},
          clicked: false
        }, _this.setEntityData = function (data) {
          _this.props.blockProps.setResizeData(data);
        }, _this.mouseLeave = function () {
          if (!_this.state.clicked) {
            _this.setState({ hoverPosition: {} });
          }
        }, _this.mouseMove = function (evt) {
          var _this$props = _this.props,
              vertical = _this$props.vertical,
              horizontal = _this$props.horizontal;


          var hoverPosition = _this.state.hoverPosition;
          var tolerance = 6;
          // TODO figure out if and how to achieve this without fetching the DOM node
          // eslint-disable-next-line react/no-find-dom-node
          var pane = _reactDom2.default.findDOMNode(_this);
          var b = pane.getBoundingClientRect();
          var x = evt.clientX - b.left;
          var y = evt.clientY - b.top;

          var isTop = vertical && vertical !== 'auto' ? y < tolerance : false;
          var isLeft = horizontal ? x < tolerance : false;
          var isRight = horizontal ? x >= b.width - tolerance : false;
          var isBottom = vertical && vertical !== 'auto' ? y >= b.height - tolerance && y < b.height : false;

          var canResize = isTop || isLeft || isRight || isBottom;

          var newHoverPosition = {
            isTop: isTop, isLeft: isLeft, isRight: isRight, isBottom: isBottom, canResize: canResize
          };
          var hasNewHoverPositions = Object.keys(newHoverPosition).filter(function (key) {
            return hoverPosition[key] !== newHoverPosition[key];
          });
          if (hasNewHoverPositions.length) {
            _this.setState({ hoverPosition: newHoverPosition });
          }
        }, _this.mouseDown = function (event) {
          // No mouse-hover-position data? Nothing to resize!
          if (!_this.state.hoverPosition.canResize) {
            return;
          }
          var _this$props2 = _this.props,
              resizeSteps = _this$props2.resizeSteps,
              vertical = _this$props2.vertical,
              horizontal = _this$props2.horizontal;
          var hoverPosition = _this.state.hoverPosition;
          var isTop = hoverPosition.isTop,
              isLeft = hoverPosition.isLeft,
              isRight = hoverPosition.isRight,
              isBottom = hoverPosition.isBottom;

          // TODO figure out how to achieve this without fetching the DOM node
          // eslint-disable-next-line react/no-find-dom-node

          var pane = _reactDom2.default.findDOMNode(_this);
          var startX = event.clientX;
          var startY = event.clientY;
          var startWidth = parseInt(document.defaultView.getComputedStyle(pane).width, 10);
          var startHeight = parseInt(document.defaultView.getComputedStyle(pane).height, 10);

          // Do the actual drag operation
          var doDrag = function doDrag(dragEvent) {
            var width = startWidth + dragEvent.clientX - startX;
            var height = startHeight + dragEvent.clientY - startY;
            var block = store.getEditorRef().refs.editor;
            width = block.clientWidth < width ? block.clientWidth : width;
            height = block.clientHeight < height ? block.clientHeight : height;

            var widthPerc = 100 / block.clientWidth * width;
            var heightPerc = 100 / block.clientHeight * height;

            var newState = {};
            if ((isLeft || isRight) && horizontal === 'relative') {
              newState.width = resizeSteps ? round(widthPerc, resizeSteps) : widthPerc;
            } else if ((isLeft || isRight) && horizontal === 'absolute') {
              newState.width = resizeSteps ? round(width, resizeSteps) : width;
            }

            if ((isTop || isBottom) && vertical === 'relative') {
              newState.height = resizeSteps ? round(heightPerc, resizeSteps) : heightPerc;
            } else if ((isTop || isBottom) && vertical === 'absolute') {
              newState.height = resizeSteps ? round(height, resizeSteps) : height;
            }

            dragEvent.preventDefault();

            _this.setState(newState);
          };

          // Finished dragging
          var stopDrag = function stopDrag() {
            // TODO clean up event listeners
            document.removeEventListener('mousemove', doDrag, false);
            document.removeEventListener('mouseup', stopDrag, false);

            var _this$state = _this.state,
                width = _this$state.width,
                height = _this$state.height;

            _this.setState({ clicked: false });
            _this.setEntityData({ width: width, height: height });
          };

          // TODO clean up event listeners
          document.addEventListener('mousemove', doDrag, false);
          document.addEventListener('mouseup', stopDrag, false);

          _this.setState({ clicked: true });
        }, _temp), _possibleConstructorReturn(_this, _ret);
      }

      // used to save the hoverPosition so it can be leveraged to determine if a
      // drag should happen on mousedown


      // used to save the hoverPosition so it can be leveraged to determine if a
      // drag should happen on mousedown


      // Handle mousedown for resizing


      _createClass(BlockResizeableDecorator, [{
        key: 'render',
        value: function render() {
          var _this2 = this;

          var _props = this.props,
              blockProps = _props.blockProps,
              vertical = _props.vertical,
              horizontal = _props.horizontal,
              style = _props.style,
              resizeSteps = _props.resizeSteps,
              elementProps = _objectWithoutProperties(_props, ['blockProps', 'vertical', 'horizontal', 'style', 'resizeSteps']);

          var _state = this.state,
              width = _state.width,
              height = _state.height,
              hoverPosition = _state.hoverPosition;
          var isTop = hoverPosition.isTop,
              isLeft = hoverPosition.isLeft,
              isRight = hoverPosition.isRight,
              isBottom = hoverPosition.isBottom;


          var styles = _extends({ position: 'relative' }, style);

          if (horizontal === 'auto') {
            styles.width = 'auto';
          } else if (horizontal === 'relative') {
            styles.width = (width || blockProps.resizeData.width || 40) + '%';
          } else if (horizontal === 'absolute') {
            styles.width = (width || blockProps.resizeData.width || 40) + 'px';
          }

          if (vertical === 'auto') {
            styles.height = 'auto';
          } else if (vertical === 'relative') {
            styles.height = (height || blockProps.resizeData.height || 40) + '%';
          } else if (vertical === 'absolute') {
            styles.height = (height || blockProps.resizeData.height || 40) + 'px';
          }

          // Handle cursor
          if (isRight && isBottom || isLeft && isTop) {
            styles.cursor = 'nwse-resize';
          } else if (isRight && isTop || isBottom && isLeft) {
            styles.cursor = 'nesw-resize';
          } else if (isRight || isLeft) {
            styles.cursor = 'ew-resize';
          } else if (isBottom || isTop) {
            styles.cursor = 'ns-resize';
          } else {
            styles.cursor = 'default';
          }

          var interactionProps = store.getReadOnly() ? {} : {
            onMouseDown: this.mouseDown,
            onMouseMove: this.mouseMove,
            onMouseLeave: this.mouseLeave
          };

          return _react2.default.createElement(WrappedComponent, _extends({}, elementProps, interactionProps, {
            blockProps: blockProps,
            ref: function ref(element) {
              _this2.wrapper = element;
            },
            style: styles
          }));
        }
      }]);

      return BlockResizeableDecorator;
    }(_react.Component), _class.displayName = 'BlockDraggable(' + getDisplayName(WrappedComponent) + ')', _class.WrappedComponent = WrappedComponent.WrappedComponent || WrappedComponent, _class.defaultProps = _extends({
      horizontal: 'relative',
      vertical: false,
      resizeSteps: 1
    }, config), _temp2;
  };
};