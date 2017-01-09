import React, {Component} from 'react'
import {Editor, RichUtils, getDefaultKeyBinding} from 'draft-js'

import Toolbar from './Toolbar/Toolbar'
import Sidebar from './Sidebar/Sidebar'

import Media from './Blocks/Media'
import Pullquote from './Blocks/Pullquote'
import Alignment from './Blocks/Alignment'

import Plugins from '../plugins/'
import Actions from '../actions/'

import insertDataBlock from '../utils/insertDataBlock'
import {blockRenderMap} from '../utils/block'
import {blockStyleFn} from '../utils/block'
//import blockRendererFn from '../utils/block'
import {styleMap} from '../utils/styleMap'

export default class extends Component {
  static get defaultProps () {
    return {
      sideToolbar: ['image', 'video', 'emoji'],
      inlineToolbar: ['bold', 'italic', 'code', 'strikethrough', 'dropcap', 'link', 'ul', 'ol', 'h2', 'blockquote', 'pullquote'],
      placeholder: 'Enter text...'
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
    this.actions = this.getActions()
    this.plugins = this.getValidPlugins()
    this.pluginsByType = this.getPluginsByType()
    this.keyBindings = this.props.keyBindings || []
  }

  getActions () {
    let actions = []
    for (let action of Actions) {
      if (!action || typeof action.type !== 'string') {
        console.warn('Action: Missing `type` field. Details: ', action)
        continue
      }

      let actionType = action.label
      if (action.label.includes('alignment')) { actionType = 'alignment' }

      if (this.props.inlineToolbar.includes(actionType)) {
        actions.push(action)
      }
    }
    return actions
  }

  getValidPlugins () {
    let plugins = []
    for (let plugin of Plugins) {
      if (!plugin || typeof plugin.type !== 'string') {
        console.warn('Plugin: Missing `type` field. Details: ', plugin)
        continue
      }
      let pluginType = plugin.type
      if (plugin.type.includes('placeholder')) { pluginType = 'image' }

      if (this.props.sideToolbar.includes(pluginType)) {
        plugins.push(plugin)
      }
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

  componentWillReceiveProps (nextProps) {
    if (this.props.readOnly !== nextProps.readOnly) {
      this.setState({readOnly: nextProps.readOnly})
    }
  }

  onChange (editorState) {
    this.props.onChange(editorState)
  }

  externalKeyBindings (e) {
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
    if (block.getType() === 'pullquote') {
      return { component: Pullquote }
    }
    if (block.getType() === 'alignment-left') {
      return { component: Alignment, props: { alignment: 'alignment-left' } }
    }
    if (block.getType() === 'alignment-center') {
      return { component: Alignment, props: { alignment: 'center' } }
    }
    if (block.getType() === 'alignment-right') {
      return { component: Alignment, props: { alignment: 'alignment-right' } }
    }

    if (block.getType() !== 'atomic') { return null }

    const type = block.getData().toObject().type
    let plugin = this.pluginsByType[type] || null
    if (!plugin) { return null }

    return {
      component: Media,
      editable: false,
      props: {
        plugin: plugin,
        onChange: this.onChange,
        editorState: this.props.editorState,
        setReadOnly: this.setReadOnly
      }
    }
  }

  renderSidebar (props) {
    const { sidebarRendererFn } = this.props
    if (typeof sidebarRendererFn === 'function') {
      return sidebarRendererFn(props)
    }
    return <Sidebar {...props} />
  }

  renderToolbar (props) {
    return <Toolbar {...props} />
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

  render () {
    const {editorState, stripPastedStyles, spellCheck} = this.props
    const plugins = this.plugins

    return (
      <div>
        <div id='editor' ref='editor' className='last-draft-editor'>
          {this.renderSidebar({
            plugins,
            editorState,
            readOnly: this.state.readOnly,
            onChange: this.onChange,
            uploadFile: this.uploadFile,
            uploadImageCallBack: this.props.uploadImageCallBack
          })}
          <Editor
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
            keyBindingFn={::this.externalKeyBindings}
            editorState={editorState}
            placeholder={this.props.placeholder}
            onChange={this.onChange} />
            {this.renderToolbar({
              editor: this.refs.editor,
              editorState,
              readOnly: this.state.readOnly,
              onChange: this.onChange,
              actions: this.actions
            })}
        </div>
      </div>
    )
  }
}
