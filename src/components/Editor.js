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
import MentionList from './Mentions/MentionList'
import Sidebar from './Sidebar/Sidebar'
import Atomic from './Blocks/Atomic'
import Media from './Blocks/Media'

import {image, placeholder} from '../plugins/'
import Actions from '../actions/'

import insertDataBlock from '../utils/insertDataBlock'
import {blockStyleFn, blockRenderMap, getPluginTypeForBlock} from '../utils/block'
import styleMap from '../utils/styleMap'

let mentionCurrentOffset = 0

export default class extends Component {
  static get defaultProps () {
    return {
      inline: ['bold', 'italic', 'strikethrough', 'code', 'dropcap'],
      entities: ['link'],
      blocks: ['ul', 'ol', 'blockquote'],
      placeholder: 'Enter text...',
      autofocus: false,
      separators: true,
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
      openToolbar: false,
      mentionSearchValue: ''
    }
    this.onChange = ::this.onChange
    this.setReadOnly = ::this.setReadOnly
    this.uploadFile = ::this.uploadFile
    this.openToolbar = ::this.openToolbar
    this.resetStateFromHtml = ::this.resetStateFromHtml
    this.returnStateAsHtml = ::this.returnStateAsHtml
    this.closeMentionList = ::this.closeMentionList
    this.plugins = this.getValidPlugins()
    this.actions = this.getActions()
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

    /* hashtag and mention entities are not action buttons */
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
        actions.push({type: 'plugin', label: plugin.type, icon: plugin.button})
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
    this.closeToolbar(editorState)

    this.hideMentionsOnMove(editorState)
  }

  hideMentionsOnMove (editorState) {
    const {mentionUsers, mentionUsersAsync} = this.props
    if (mentionUsers === undefined && mentionUsersAsync === undefined) { return }

    const selectionState = editorState.getSelection()
    const focusOffset = selectionState.getFocusOffset()
    if (focusOffset === undefined) { return }
    if (focusOffset !== mentionCurrentOffset) { this.closeMentionList() }
  }

  openToolbar () {
    this.setState({showToolbar: true})
  }

  closeToolbar (editorState) {
    let hasFocus = editorState.getSelection().getHasFocus()
    if (hasFocus) {
      this.setState({showToolbar: false})
    }
  }

  closeMentionList () {
    this.setState({mentionSearchValue: ''})
  }

  keyBindingFn (event) {
    for (const kb of this.keyBindings) {
      if (kb.isKeyBound(e)) {
        return kb.name
      }
    }

    this.showMentionsKeyBinding(event)
    return getDefaultKeyBinding(event)
  }

  showMentionsKeyBinding (event) {
    const {editorState, mentionUsers, mentionUsersAsync} = this.props
    if (mentionUsers === undefined && mentionUsersAsync === undefined) { return }

    const selectionState = editorState.getSelection()
    const contentState = editorState.getCurrentContent()
    const block = contentState.getBlockForKey(selectionState.getStartKey())
    const text = block.text
    const focusOffset = selectionState.getFocusOffset()
    let mentionSearchValue = null
    let lastMentionOffset = null

    if (!block.text.includes('@')) { return }
    for(var i = focusOffset; i >= 0; i--) {
      let char = text.substr(i, 1)
      if (char === '@') {
        lastMentionOffset = i
        break
      }
    }
    if (lastMentionOffset === null) { return }

    if (focusOffset > lastMentionOffset) {
      /* alphanumeric key or backspace */
      if (
        (event.keyCode >= 48 && event.keyCode <= 57) ||
        (event.keyCode >= 65 && event.keyCode <= 90) ||
        (event.keyCode === 8) || (event.keyCode === 32)
      ) {
        let textLength = focusOffset - lastMentionOffset
        let mentionText = text.substr(lastMentionOffset, textLength)
        if (event.keyCode === 8) {
          mentionText = mentionText.slice(0, -1)
        } else {
          mentionText = mentionText + event.key
        }
        mentionSearchValue = mentionText.substr(1) /* remove the @ */
      }
    }

    if (mentionSearchValue === null) {
      this.closeMentionList()
    } else {
      this.setState({mentionSearchValue: mentionSearchValue})
      /* the new focus offset for mention, used to check if onChange we moved away */
      mentionCurrentOffset = (event.keyCode === 8) ? focusOffset - 1 : focusOffset + 1
    }
  }

  onTab (event) {
    event.preventDefault()
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
    const {mentionUsersAsync, mentionUsers} = this.props
    if (mentionUsers === undefined && mentionUsersAsync === undefined) {
      return null
    }
    return <MentionList {...props} />
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
        const imageData = {src: data.src, srcSet: srcSet, type: 'image'}
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
    const {editorState, stripPastedStyles, spellCheck, theme, separators} = this.props

    return (
      <div>
        <div id='editor' ref='editorWrapper' className='last-draft-editor'>
          {this.renderSidebar({
            editorState,
            openToolbar: this.openToolbar,
            readOnly: this.state.readOnly,
            onChange: this.onChange
          })}
          {this.renderToolbar({
            editorWrapper: this.refs.editorWrapper,
            editorState,
            theme,
            separators,
            showToolbar: this.state.showToolbar,
            readOnly: this.state.readOnly,
            openToolbar: this.openToolbar,
            uploadFile: this.uploadFile,
            uploadImageAsync: this.props.uploadImageAsync,
            submitHtmlModal: this.resetStateFromHtml,
            returnStateAsHtml: this.returnStateAsHtml,
            onChange: this.onChange,
            actions: this.actions
          })}
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
            onTab={this.onTab}
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
