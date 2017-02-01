/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import React, {Component} from 'react'
import {Editor, RichUtils, getDefaultKeyBinding} from 'draft-js'
import {editorStateFromHtml, editorStateToHtml, editorStateFromText} from '../utils/convert'

import Toolbar from './Toolbar/Toolbar'
import Sidebar from './Sidebar/Sidebar'
import Atomic from './Blocks/Atomic'
import Media from './Blocks/Media'

import Plugins from '../plugins/'
import Actions from '../actions/'

import insertDataBlock from '../utils/insertDataBlock'
import {blockStyleFn, blockRenderMap, getPluginTypeForBlock} from '../utils/block'
import styleMap from '../utils/styleMap'
import styled from 'styled-components'

export default class extends Component {
  static get defaultProps () {
    return {
      inline: ['bold', 'italic', 'strikethrough', 'code', 'dropcap'],
      entities: ['link'],
      blocks: ['ul', 'ol', 'h2', 'blockquote'],
      placeholder: 'Enter text...',
      autofocus: false,
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
      uploading: false
    }
    this.onChange = ::this.onChange
    this.setReadOnly = ::this.setReadOnly
    this.uploadFile = ::this.uploadFile
    this.openToolbar = ::this.openToolbar
    this.resetStateFromHtml = ::this.resetStateFromHtml
    this.returnStateAsHtml = ::this.returnStateAsHtml
    this.plugins = this.getValidPlugins()
    this.actions = this.getActions()
    this.pluginsByType = this.getPluginsByType()
    this.keyBindings = this.props.keyBindings || []
  }

  componentDidMount() {
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

    for (let ent of this.props.entities) {
      let action = this.getAction(ent)
      actions.push(action)
    }

    actions.push({type: "separator"})

    for (let block of this.props.blocks) {
      let action = this.getAction(block)
      actions.push(action)
    }

    actions.push({type: "separator"})

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
    let plugins = []
    /* default plugins: image, video */
    for (let plugin of Plugins) {
      let pluginType = plugin.type
      if (plugin.type.includes('placeholder')) { pluginType = 'image' }
      plugins.push(plugin)
    }

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

  keyBindingFn (e) {
    for (const kb of this.keyBindings) {
      if (kb.isKeyBound(e)) {
        return kb.name
      }
    }
    return getDefaultKeyBinding(e)
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
      component = Media,
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

  uploadFile(file, selection) {
    const { uploadImageCallBack, editorState } = this.props
    const { uploading } = this.state

    if (file.type.indexOf('image/') !== 0) { return }
    if (uploading) { return }

    this.setState({ uploading: true })

    if (uploadImageCallBack !== undefined) {
      /* show placeholder */
      const src = window.URL.createObjectURL(file)
      const imageData = {src: src, type: 'placeholder'}
      this.onChange(insertDataBlock(editorState, imageData, selection))

      uploadImageCallBack(file)
      .then((data) => {
        /* show loaded image */
        const imageData = {src: data.src, type: 'image'}
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

  resetStateFromHtml(html) {
    this.onChange(editorStateFromHtml(html))
  }

  resetStateFromText (text) {
    this.onChange(editorStateFromText(text))
  }

  returnStateAsHtml() {
    return editorStateToHtml(this.props.editorState)
  }

  render () {
    const {editorState, stripPastedStyles, spellCheck, theme} = this.props
    const plugins = this.plugins

    return (
      <div>
        <div id='editor' ref='editorWrapper' className='last-draft-editor'>
          {this.renderSidebar({
            editorState,
            openToolbar: this.openToolbar,
            readOnly: this.state.readOnly,
            onChange: this.onChange
          })}
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
            {this.renderToolbar({
              editorWrapper: this.refs.editorWrapper,
              editorState,
              theme,
              showToolbar: this.state.showToolbar,
              readOnly: this.state.readOnly,
              openToolbar: this.openToolbar,
              uploadFile: this.uploadFile,
              uploadImageCallBack: this.props.uploadImageCallBack,
              submitHtmlModal: this.resetStateFromHtml,
              returnStateAsHtml: this.returnStateAsHtml,
              onChange: this.onChange,
              actions: this.actions
            })}
        </div>
      </div>
    )
  }
}
