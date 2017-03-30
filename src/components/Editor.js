/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import React, {Component} from 'react'
import {Editor, RichUtils, getDefaultKeyBinding, KeyBindingUtil} from 'draft-js'
import DraftOffsetKey from 'draft-js/lib/DraftOffsetKey'
import {editorStateFromHtml, editorStateToHtml, editorStateFromText} from '../utils/convert'

import Toolbar from './Toolbar/Toolbar'
import Sidebar from './Sidebar/Sidebar'
import Atomic from './Blocks/Atomic'
import Media from './Blocks/Media'

import {image, placeholder} from '../plugins/'

import Actions from '../actions/'

import insertDataBlock from '../utils/insertDataBlock'
import {blockStyleFn, blockRenderMap, getPluginTypeForBlock} from '../utils/block'
import styleMap from '../utils/styleMap'

let autocompleteOffset = 0

export default class extends Component {
  static get defaultProps () {
    return {
      inline: ['bold', 'italic', 'underline', 'code', 'dropcap'],
      entities: ['link'],
      blocks: ['ul', 'ol', 'blockquote'],
      placeholder: 'Enter text...',
      autofocus: false,
      separators: true,
      toolbarHeight: 34,
      maxLeftOffset: 150,
      tooltips: true,
      sidebarVisibleOn: 'newline',
      theme: {
        color: '#fff',
        backgroundColor: '#181818',
        highlight: '#9d1d20'
      }
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      readOnly: this.props.readOnly || false,
      uploading: false,
      sidebarOpen: false,
      mentionSearchValue: '',
      emojiSearchValue: '',
      sidebarVisible: false
    }
    this.onChange = ::this.onChange
    this.setReadOnly = ::this.setReadOnly
    this.uploadFile = ::this.uploadFile
    this.openSidebar = ::this.openSidebar
    this.closeSidebar = ::this.closeSidebar
    this.displaySidebar = ::this.displaySidebar
    this.resetStateFromHtml = ::this.resetStateFromHtml
    this.returnStateAsHtml = ::this.returnStateAsHtml
    this.closeMentionList = ::this.closeMentionList
    this.closeEmojiList = ::this.closeEmojiList
    this.plugins = this.getValidPlugins()
    this.actions = this.getActions()
    this.allActions = this.getActions()
    this.pluginsByType = this.getPluginsByType()
    this.keyBindings = this.props.keyBindings || []
  }

  componentDidMount () {
    const { autofocus } = this.props
    if (autofocus) {
      this.refs.editor.focus()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.readOnly !== nextProps.readOnly) {
      this.setState({readOnly: nextProps.readOnly})
    }
  }

  getActions () {
    let actions = []
    for (let inline of this.props.inline) {
      let action = this.getAction(inline)
      actions.push(action)
    }

    /* Link entity has an action button */
    let action = this.getAction('link')
    actions.push(action)

    actions.push({type: 'separator'})

    for (let block of this.props.blocks) {
      let action = this.getAction(block)
      actions.push(action)
    }

    actions.push({type: 'separator'})

    for (let plugin of this.plugins) {
      if (plugin.type === 'placeholder') {
        continue
      }

      if (plugin.modal) {
        actions.push({type: 'plugin', label: plugin.type, icon: plugin.button, modal: plugin.modal})
      } else {
        if (plugin.button) {
          actions.push({type: 'plugin', label: plugin.type, icon: plugin.button})
        }
      }
    }

    return actions
  }

  getAction (label) {
    for (let action of Actions) {
      if (!action || typeof action.type !== 'string') {
        console.warn('Action: Missing type field: ', action)
        continue
      }

      let actionType = action.label
      if (action.label.includes('alignment')) { actionType = 'alignment' }

      if (actionType === label) {
        return action
      }
    }
  }

  getValidPlugins () {
    /* default image plugin */
    let plugins = [image, placeholder]

    if (!this.props.plugins) { return plugins }

    /* props.plugins any extra plugins */
    for (let plugin of this.props.plugins) {
      if (!plugin || typeof plugin.type !== 'string') {
        console.warn('Plugin: Missing type field: ', plugin)
        continue
      }
      plugins.push(plugin)
    }

    return plugins
  }

  getPluginsByType () {
    let pluginsByType = {}
    for (let plugin of this.plugins) {
      pluginsByType[plugin.type] = plugin
    }

    return pluginsByType
  }

  onChange (editorState) {
    this.props.onChange(editorState)
    let hasFocus = editorState.getSelection().getHasFocus()
    if (hasFocus) { this.closeSidebar() }
    this.hideAutocompleteOnMove(editorState)
    this.displaySidebar(editorState)
  }

  displaySidebar (editorState) {
    const selectionState = editorState.getSelection()
    const contentState = editorState.getCurrentContent()
    const block = contentState.getBlockForKey(selectionState.getStartKey())
    if (block.text.length === 0) {
      this.setState({sidebarVisible: true})
    } else {
      this.setState({sidebarVisible: false})
    }
  }

  hideAutocompleteOnMove (editorState) {
    let plugins = this.getPluginsByType()
    if (plugins.mention === undefined && plugins.emoji === undefined) { return }

    const selectionState = editorState.getSelection()
    const focusOffset = selectionState.getFocusOffset()
    if (focusOffset === undefined) { return }
    if (focusOffset !== autocompleteOffset) {
      this.closeMentionList()
      this.closeEmojiList()
    }
  }

  openSidebar () {
    this.setState({sidebarOpen: true})
    this.setActionsToPlugins()
  }

  closeSidebar (editorState) {
    this.setState({sidebarOpen: false})
    this.setAllActions()
  }

  setAllActions () {
    this.actions = this.allActions
  }

  setActionsToPlugins () {
    let newActions = []
    for (let action of this.allActions) {
      if (action.type === 'plugin') {
        newActions.push(action)
      }
    }
    this.actions = newActions
  }

  closeMentionList () {
    this.setState({mentionSearchValue: ''})
  }

  closeEmojiList () {
    this.setState({emojiSearchValue: ''})
  }

  keyBindingFn (event) {
    for (const kb of this.keyBindings) {
      if (kb.isKeyBound(e)) {
        return kb.name
      }
    }
    this.mentionKeyBinding(event)
    this.emojiKeyBinding(event)
    return getDefaultKeyBinding(event)
  }

  mentionKeyBinding (event) {
    let plugins = this.getPluginsByType()
    if (plugins.mention === undefined) { return }

    let searchValue = this.autocompleteKeyBinding(event, '@')
    if (searchValue === null || searchValue === undefined) {
      this.closeMentionList()
    } else {
      this.setState({mentionSearchValue: searchValue})
    }
  }

  emojiKeyBinding (event) {
    let plugins = this.getPluginsByType()
    if (plugins.emoji === undefined) { return }

    let searchValue = this.autocompleteKeyBinding(event, ':')
    if (searchValue === null || searchValue === undefined) {
      this.closeEmojiList()
    } else {
      this.setState({emojiSearchValue: searchValue})
    }
  }

  autocompleteKeyBinding (event, searchChar) {
    const {editorState} = this.props

    const selectionState = editorState.getSelection()
    const contentState = editorState.getCurrentContent()
    const block = contentState.getBlockForKey(selectionState.getStartKey())
    const text = block.text
    const focusOffset = selectionState.getFocusOffset()
    let searchValue = null
    let charOffset = null

    if (!block.text.includes(searchChar)) { return }
    for(var i = focusOffset; i >= 0; i--) {
      let char = text.substr(i, 1)
      if (char === searchChar) {
        charOffset = i
        break
      }
    }
    if (charOffset === null) { return }

    if (focusOffset > charOffset) {
      /* alphanumeric key or backspace */
      if (
        (event.keyCode >= 48 && event.keyCode <= 57) ||
        (event.keyCode >= 65 && event.keyCode <= 90) ||
        (event.keyCode === 8) || (event.keyCode === 32)
      ) {
        let textLength = focusOffset - charOffset
        let searchText = text.substr(charOffset, textLength)
        if (event.keyCode === 8) {
          searchText = searchText.slice(0, -1)
        } else {
          searchText = searchText + String.fromCharCode(event.keyCode)
        }
        searchValue = searchText.substr(1) /* remove the @ or : */
      }
    }
    if (searchValue !== null) {
      /* Used to check if onChange we moved away */
      autocompleteOffset = (event.keyCode === 8) ? focusOffset - 1 : focusOffset + 1
    }
    return searchValue
  }

  onTab (event) {
    event.preventDefault()
  }

  onEscape (event) {
    this.closeEmojiList()
    this.closeMentionList()
  }

  handleKeyCommand (command) {
    if (this.keyBindings.length) {
      const kb = this.keyBindings.find(k => k.name === command)
      if (kb) {
        kb.action()
        return true
      }
    }

    const {editorState} = this.props
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      this.props.onChange(newState)
      return true
    }
    return false
  }

  handleReturn (event) {
    if (!event.shiftKey) { return false }

    const {editorState} = this.props
    const newState = RichUtils.insertSoftNewline(editorState)
    this.props.onChange(newState)
    return true
  }

  setReadOnly (readOnly) {
    this.setState({readOnly})
  }

  blockRendererFn (block) {
    if (block.getType() !== 'atomic') { return null }

    const type = block.getData().toObject().type
    let plugin = this.pluginsByType[type] || null
    if (!plugin) {
      const pluginType = getPluginTypeForBlock(this.props.editorState, block)
      if (pluginType !== null) {
        plugin = this.pluginsByType[pluginType]
      }
    }
    if (!plugin) { return null }

    let component = Atomic
    let editable = true

    if (type === 'image' || type === 'video') {
      component = Media
      editable = false
    }
    if (plugin.editable !== undefined) { editable = plugin.editable }

    return {
      component: component,
      editable: editable,
      props: {
        plugin: plugin,
        onChange: this.onChange,
        editorState: this.props.editorState,
        setReadOnly: this.setReadOnly
      }
    }
  }

  renderToolbar (props) {
    return <Toolbar {...props} />
  }

  renderSidebar (props) {
    return <Sidebar {...props} />
  }

  renderMentionList (props) {
    let plugins = this.getPluginsByType()
    if (plugins.mention === undefined) { return null }
    let Autocomplete = plugins.mention.autocomplete
    return <Autocomplete {...props} />
  }

  renderEmojiList (props) {
    let plugins = this.getPluginsByType()
    if (plugins.emoji === undefined) { return null }
    let Autocomplete = plugins.emoji.autocomplete
    return <Autocomplete {...props} />
  }

  uploadFile (file, selection) {
    const { uploadImageAsync, editorState } = this.props
    const { uploading } = this.state

    if (file.type.indexOf('image/') !== 0) { return }
    if (uploading) { return }

    this.setState({ uploading: true })

    if (uploadImageAsync !== undefined) {
      /* show placeholder */
      const src = window.URL.createObjectURL(file)
      const imageData = {src: src, type: 'placeholder'}
      this.onChange(insertDataBlock(editorState, imageData, selection))

      uploadImageAsync(file)
      .then((data) => {
        /* show loaded image */
        let srcSet = data.srcSet
        if (srcSet === undefined) { srcSet = data.src }
        const imageData = {src: data.src, srcSet: srcSet, type: 'image', caption: data.caption || ''}
        this.onChange(insertDataBlock(editorState, imageData, selection))
        this.setState({ uploading: false })
      })
    } else {
      const src = window.URL.createObjectURL(file)
      const imageData = {src: src, type: 'image'}
      this.onChange(insertDataBlock(editorState, imageData, selection))
      this.setState({ uploading: false })
    }
  }

  handleDroppedFiles (selection, files) {
    const file = files[0]
    this.uploadFile(file, selection)
  }

  resetStateFromHtml (html) {
    this.onChange(editorStateFromHtml(html))
  }

  resetStateFromText (text) {
    this.onChange(editorStateFromText(text))
  }

  returnStateAsHtml () {
    return editorStateToHtml(this.props.editorState)
  }

  render () {
    const {editorState, stripPastedStyles, spellCheck, theme, separators, maxLeftOffset, toolbarHeight} = this.props

    return (
      <div>
        <div id='editor' ref='editorWrapper' className='last-draft-editor'>
          {this.renderSidebar({
            editorState,
            sidebarOpen: this.state.sidebarOpen,
            sidebarVisible: this.state.sidebarVisible,
            sidebarVisibleOn: this.props.sidebarVisibleOn,
            openSidebar: this.openSidebar,
            closeSidebar: this.closeSidebar,
            readOnly: this.state.readOnly,
            onChange: this.onChange
          })}
          {this.renderToolbar({
            editorWrapper: this.refs.editorWrapper,
            editorState,
            theme,
            separators,
            toolbarHeight,
            maxLeftOffset,
            tooltips: this.props.tooltips,
            sidebarOpen: this.state.sidebarOpen,
            readOnly: this.state.readOnly,
            openSidebar: this.openSidebar,
            uploadFile: this.uploadFile,
            uploadImageAsync: this.props.uploadImageAsync,
            submitHtmlModal: this.resetStateFromHtml,
            returnStateAsHtml: this.returnStateAsHtml,
            onChange: this.onChange,
            actions: this.actions
          })}
          {
            this.renderEmojiList({
              editorWrapper: this.refs.editorWrapper,
              editorState,
              emojiSearchValue: this.state.emojiSearchValue,
              closeEmojiList: this.closeEmojiList,
              onChange: this.onChange
            })
          }
          {
            this.renderMentionList({
              editorWrapper: this.refs.editorWrapper,
              editorState,
              mentionUsersAsync: this.props.mentionUsersAsync,
              mentionUsers: this.props.mentionUsers,
              mentionSearchValue: this.state.mentionSearchValue,
              closeMentionList: this.closeMentionList,
              onChange: this.onChange
            })
          }
          <Editor
            ref='editor'
            customStyleMap={styleMap}
            readOnly={this.state.readOnly}
            blockRenderMap={blockRenderMap}
            blockRendererFn={::this.blockRendererFn}
            blockStyleFn={blockStyleFn}
            onTab={::this.onTab}
            onEscape={::this.onEscape}
            handleKeyCommand={::this.handleKeyCommand}
            handleReturn={::this.handleReturn}
            handleDroppedFiles={::this.handleDroppedFiles}
            stripPastedStyles={stripPastedStyles}
            spellCheck={spellCheck}
            keyBindingFn={::this.keyBindingFn}
            editorState={editorState}
            placeholder={this.props.placeholder}
            onChange={this.onChange} />
        </div>
      </div>
    )
  }
}
