import React, { PropTypes } from 'react'
import { getSelectedBlockNode } from '../util/selection'
import ImageButton from './ImageButton'

export default class AddButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      style: {},
      visible: false,
      isOpen: false,
    }
    this.node = null
    this.blockKey = ''
    this.blockType = ''
    this.blockLength = -1
  }

  // To show + button only when text length == 0
  componentWillReceiveProps(newProps) {
    const { editorState } = newProps;
    const contentState = editorState.getCurrentContent()
    const selectionState = editorState.getSelection()
    if (!selectionState.isCollapsed() || selectionState.anchorKey !== selectionState.focusKey) {
      this.hideBlock()
      return
    }
    const block = contentState.getBlockForKey(selectionState.anchorKey)
    const bkey = block.getKey()
    if (block.getLength() > 0) {
      this.hideBlock()
      return
    }
    if (block.getType() !== this.blockType) {
      this.blockType = block.getType()
      if (block.getLength() === 0) {
        setTimeout(::this.findNode, 0)
      }
      return
    }
    if (this.blockKey === bkey) {
      if (block.getLength() > 0) {
        this.hideBlock()
      } else {
        this.setState({
          visible: true,
        })
      }
      return
    }
    this.blockKey = bkey;
    if (block.getLength() > 0) {
      this.hideBlock()
      return
    }
    setTimeout(::this.findNode, 0)
  }

  hideBlock() {
    if (this.state.visible) {
      this.setState({ visible: false, isOpen: false })
    }
  }

  openToolbar() {
    this.setState({
      isOpen: !this.state.isOpen,
    }, this.props.focus)
  }

  findNode() {
    const node = getSelectedBlockNode(window);
    if (node === this.node) {
      return;
    }
    if (!node) {
      this.setState({
        visible: false,
        isOpen: false,
      });
      return;
    }

    this.node = node;
    this.setState({
      visible: true,
      style: {
        top: node.offsetTop - 3,
      },
    });
  }

  render() {
    if (this.state.visible) {
      return (
        <div className="rte__side-toolbar" style={this.state.style}>
          <button onClick={::this.openToolbar}
                  className={`rte__button rte__add-button${this.state.isOpen ? '--open' : ''}`}
                  type="button" >
            <i className="fa fa-plus-circle fa-lg" />
          </button>
          {this.state.isOpen ? (
            <div>
              <ImageButton getEditorState={this.props.getEditorState}
                           setEditorState={this.props.setEditorState}
                           close={::this.openToolbar} />
            </div>
          ) : null}
        </div>
      )
    }
    return null
  }
}

AddButton.propTypes = {
  focus: PropTypes.func,
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  sideButtons: PropTypes.arrayOf(PropTypes.object),
}
