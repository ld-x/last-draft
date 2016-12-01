import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Editor, RichUtils, EditorState, convertToRaw, convertFromRaw, KeyBindingUtil,
  Modifier, AtomicBlockUtils, Entity, ContentState, convertFromHTML } from 'draft-js/lib/Draft'
import { stateFromHTML } from 'draft-js-import-html'
import { stateToHTML } from 'draft-js-export-html'
import isSoftNewlineEvent from 'draft-js/lib/isSoftNewlineEvent'

import AddButton from './components/AddButton'
import Toolbar, { BLOCK_BUTTONS, INLINE_BUTTONS } from './components/Toolbar'
import renderer from './components/TypeRenderer'
import customStyles from './util/customStyles'
import RenderMap from './util/renderMap'
import keyBindingFn from './util/keyBinding'
import { Block, Entity as E, HANDLED, NOT_HANDLED, KEY_COMMANDS } from './util/constants'
import { getCurrentBlock, resetBlockWithType, addNewBlockAt } from './model'
import createEditorState from './model/content'
import blockStyleFn from './util/blockStyleFn'

/* Rich Text Editor */
class RTEditor extends React.Component {

  static propTypes = {
    editorEnabled: PropTypes.bool,
    spellCheck: PropTypes.bool,
    placeholder: PropTypes.string,
    continuousBlocks: PropTypes.arrayOf(PropTypes.string),
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    disableToolbar: PropTypes.bool,
  };

  static defaultProps = {
    editorEnabled: true,
    spellCheck: true,
    placeholder: 'What do you think...',
    continuousBlocks: [
      Block.UNSTYLED,
      Block.BLOCKQUOTE,
      Block.OL,
      Block.UL
    ],
    disableToolbar: false,
  };

  constructor(props) {
    super(props)

    this.focus = () => this._editorNode.focus()
    this.onChange = (editorState) => {
      this.props.onChange(editorState)
    }

    this.getEditorState = () => this.props.editorState
    this.blockRendererFn = renderer(this.onChange, this.getEditorState)
  }

  onTab(e) {
    const { editorState } = this.props
    const newEditorState = RichUtils.onTab(e, editorState, 2)
    if (newEditorState !== editorState) {
      this.onChange(newEditorState)
    }
  }

  setImage(x) {
    const { editorState } = this.props
    const selection = editorState.getSelection()
    let entityKey = null
    let url = 'http://i.imgur.com/yrwFoXT.jpg'
    if (url !== '') {
      entityKey = Entity.create(E.IMAGE, 'MUTABLE', { src: url })
    }
    this.onChange(RichUtils.toggleLink(editorState, selection, entityKey), this.focus)
  }

  setLink(url) {
    const { editorState } = this.props
    const selection = editorState.getSelection()
    let entityKey = null
    let newUrl = url
    if (url !== '') {
      if (url.indexOf('http') === -1) {
        if (url.indexOf('@') >= 0) {
          newUrl = `mailto:${newUrl}`
        } else {
          newUrl = `http://${newUrl}`
        }
      }
      entityKey = Entity.create(E.LINK, 'MUTABLE', { url: newUrl })
    }
    this.onChange(RichUtils.toggleLink(editorState, selection, entityKey), this.focus)
  }

  handleKeyCommand(command) {
    if (this.props.handleKeyCommand) {
      const behaviour = this.props.handleKeyCommand(command);
      if (behaviour === HANDLED || behaviour === true) {
        return HANDLED
      }
    }
    if (command === KEY_COMMANDS.showLinkInput()) {
      if (!this.props.disableToolbar && this.toolbar) {
        this.toolbar.handleLinkInput(null, true);
        return HANDLED
      }
      return NOT_HANDLED
    }
    const { editorState } = this.props
    const block = getCurrentBlock(editorState)
    const currentBlockType = block.getType()

    if (command.indexOf(`${KEY_COMMANDS.changeType()}`) === 0) {
      let newBlockType = command.split(':')[1]
      if (currentBlockType === Block.BLOCKQUOTE && newBlockType === Block.CAPTION) {
        newBlockType = Block.BLOCKQUOTE_CAPTION
      } else if (currentBlockType === Block.BLOCKQUOTE_CAPTION && newBlockType === Block.CAPTION) {
        newBlockType = Block.BLOCKQUOTE
      }
      this.onChange(RichUtils.toggleBlockType(editorState, newBlockType));
      return HANDLED
    } else if (command.indexOf(`${KEY_COMMANDS.toggleInline()}`) === 0) {
      const inline = command.split(':')[1]
      this.toggleInlineStyle(inline)
      return HANDLED
    }
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState)
      return HANDLED
    }
    return NOT_HANDLED
  }

  handleReturn(e) {
    const { editorState } = this.props
    if (isSoftNewlineEvent(e)) {
      this.onChange(RichUtils.insertSoftNewline(editorState))
      return HANDLED
    }
    if (!e.altKey && !e.metaKey && !e.ctrlKey) {
      const currentBlock = getCurrentBlock(editorState)
      const blockType = currentBlock.getType()

      if (blockType.indexOf(Block.ATOMIC) === 0) {
        this.onChange(addNewBlockAt(editorState, currentBlock.getKey()))
        return HANDLED
      }

      if (currentBlock.getLength() === 0) {
        switch (blockType) {
          case Block.UL:
          case Block.OL:
          case Block.BLOCKQUOTE:
          case Block.BLOCKQUOTE_CAPTION:
          case Block.CAPTION:
          case Block.H2:
          case Block.H3:
          case Block.H1:
            this.onChange(resetBlockWithType(editorState, Block.UNSTYLED))
            return HANDLED
          default:
            return NOT_HANDLED
        }
      }

      const selection = editorState.getSelection();

      if (selection.isCollapsed() && currentBlock.getLength() === selection.getStartOffset()) {
        if (this.props.continuousBlocks.indexOf(blockType) < 0) {
          this.onChange(addNewBlockAt(editorState, currentBlock.getKey()))
          return HANDLED
        }
        return NOT_HANDLED
      }
      return NOT_HANDLED
    }
    return NOT_HANDLED
  }

  toggleBlockType(blockType) {
    const type = RichUtils.getCurrentBlockType(this.props.editorState)
    if (type.indexOf(`${Block.ATOMIC}:`) === 0) {
      return
    }
    this.onChange(
      RichUtils.toggleBlockType(this.props.editorState, blockType)
    )
  }

  toggleInlineStyle(inlineStyle) {
    const type = RichUtils.getCurrentBlockType(this.props.editorState)
    if (type.indexOf(Block.H1.split('-')[0]) === 0) {
      return
    }
    this.onChange(
      RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle)
    )
  }

  /* Renders the Editor, Toolbar and the AddButton */
  render() {
    const { editorState, editorEnabled, disableToolbar } = this.props
    const showAddButton = editorEnabled
    const editorClass = `rte-editor${!editorEnabled ? ' rte-readonly' : ''}`
    return (
      <div className="rte-root">
        <div className={editorClass}>
          <Editor
            ref={(node) => { this._editorNode = node; }}
            {...this.props}
            editorState={editorState}
            blockRendererFn={this.blockRendererFn}
            blockStyleFn={blockStyleFn}
            onChange={this.onChange}
            onTab={::this.onTab}
            blockRenderMap={RenderMap}
            handleKeyCommand={::this.handleKeyCommand}
            handleReturn={::this.handleReturn}
            customStyleMap={customStyles}
            readOnly={!editorEnabled}
            keyBindingFn={keyBindingFn}
            placeholder={this.props.placeholder}
            spellCheck={editorEnabled && this.props.spellCheck} />
          { showAddButton && (
            <AddButton
              editorState={editorState}
              getEditorState={this.getEditorState}
              setEditorState={this.onChange}
              focus={this.focus} />
          )}
          {!disableToolbar && (
            <Toolbar
              ref={(c) => { this.toolbar = c; }}
              editorNode={this._editorNode}
              editorState={editorState}
              toggleBlockType={::this.toggleBlockType}
              toggleInlineStyle={::this.toggleInlineStyle}
              handleReturn={::this.handleReturn}
              editorEnabled={editorEnabled}
              setLink={::this.setLink}
              setImage={::this.setImage}
              focus={this.focus}
              blockButtons={BLOCK_BUTTONS}
              inlineButtons={INLINE_BUTTONS} />
          )}
        </div>
      </div>
    )
  }
}

/* Editor */
export default class extends React.Component {

  constructor(props) {
    super(props)
    const sampleMarkup =
      '<b>Bold text</b>, <i>Italic text</i><br/ ><br />' +
      '<a href="http://www.facebook.com">Example link</a><br /><br/ >' +
      '<img src="image.png" height="112" width="200" />';

    const blocksFromHTML = convertFromHTML(sampleMarkup);
    const st = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    )

    this.state = {
      editorState: EditorState.createWithContent(st),
      editorEnabled: true,
      editorHtmlValue: editorHtmlValue
    }

    this.onChange = (editorState, callback = null) => {
      if (this.state.editorEnabled) {

        const editorHtmlValue = stateToHTML(editorState.getCurrentContent())
        console.log('editorHtmlValue: '); console.log(editorHtmlValue)

        this.setState({ editorHtmlValue: editorHtmlValue }, () => {
          if(this.props.onChange) this.props.onChange(editorHtmlValue)
        })

        this.setState({ editorState }, () => {
          if (callback) { callback() }
        })
      }
    }

    this.getEditorState = () => this.state.editorState
  }

  componentDidMount() {
    this.refs.editor.focus()
  }

  keyBinding(e) {
    if (e.altKey === true) {
      if (e.which === 72 /* Key H */) {
        return 'toggleinline:HIGHLIGHT'
      }
    }
    return keyBindingFn(e)
  }

  handleKeyCommand(command) {
    if (command === 'toggle-edit-mode') {
      this.toggleEdit()
    }
    return false
  }

  toggleEdit(e) {
    this.setState({ editorEnabled: !this.state.editorEnabled })
  }

  handleDroppedFiles(selection, files) {
    const file = files[0]
    if (file.type.indexOf('image/') === 0) {
      const src = URL.createObjectURL(file)
      this.onChange(addNewBlockAt(
        this.state.editorState,
        selection.getAnchorKey(),
        Block.IMAGE,
        { src }
      ))
      return HANDLED
    }
    return NOT_HANDLED
  }

  render() {
    const { name, placeholder } = this.props
    const { editorState, editorEnabled, editorHtmlValue } = this.state
    return (
      <div>
        <RTEditor ref="editor"
                  editorState={editorState}
                  onChange={this.onChange}
                  editorEnabled={editorEnabled}
                  handleDroppedFiles={::this.handleDroppedFiles}
                  handleKeyCommand={::this.handleKeyCommand}
                  placeholder={this.state.placeholder}
                  keyBindingFn={::this.keyBinding} />
        {name ? <input type='hidden' name={name} value={editorHtmlValue} /> : null}
      </div>
    )
  }
}
