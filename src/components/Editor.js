import React, {Component} from 'react'
import {Editor, RichUtils, getDefaultKeyBinding} from 'draft-js'

import DefaultToolbar from './Toolbar'
import Sidebar from './Sidebar'
import Media from './Media'
import notFoundPlugin from '../plugins/not-found/plugin'
import DEFAULT_PLUGINS from '../plugins/'
import DEFAULT_ACTIONS from '../actions/default'
import DEFAULT_ENTITIES from '../entities/'

import insertDataBlock from '../utils/insertDataBlock'
import {blockRenderMap} from '../utils/block'
import {blockStyleFn} from '../utils/block'
//import blockRendererFn from '../utils/block'
import Pullquote from './Pullquote'
import Alignment from './Alignment'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = { readOnly: this.props.readOnly || false }
    this.onChange = ::this.onChange
    this.setReadOnly = ::this.setReadOnly
    this.actions = this.props.actions || DEFAULT_ACTIONS
    this.plugins = this.getValidPlugins()
    this.entityInputs = this.props.entityInputs || DEFAULT_ENTITIES
    this.pluginsByType = this.getPluginsByType()
    this.keyBindings = this.props.keyBindings || []
  }

  getValidPlugins () {
    let plugins = []
    for (let plugin of this.props.plugins || DEFAULT_PLUGINS) {
      if (!plugin || typeof plugin.type !== 'string') {
        console.warn('Plugin: Missing `type` field. Details: ', plugin)
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

  handleBlockNotFound (block) {
    if (this.props.handleBlockNotFound) {
      return this.props.handleBlockNotFound(block)
    }
    return notFoundPlugin
  }

  blockRendererFn (block) {
    if (block.getType() === 'pullquote') {
      return { component: Pullquote }
    }
    if (block.getType() === 'alignment') {
      return { component: Alignment, props: { alignment: 'center' } }
    }

    if (block.getType() !== 'atomic') { return null }

    const type = block.getData().toObject().type
    let plugin = this.pluginsByType[type] || this.handleBlockNotFound(block)
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
    const { Toolbar = DefaultToolbar } = this.props
    return <Toolbar {...props} />
  }

  handleDroppedFiles (selection, files) {
    const { uploadImageCallBack, editorState } = this.props
    const file = files[0]
    if (file.type.indexOf('image/') !== 0) { return }

    if (uploadImageCallBack !== undefined) {
      uploadImageCallBack(file)
      .then((data) => {
        /* stop showing image placeholder */
        const imageData = {src: data.src, type: 'image'}
        this.onChange(insertDataBlock(editorState, imageData, selection))
      })
    } else {
      const src = window.URL.createObjectURL(file)
      const imageData = {src: src, type: 'image'}
      this.onChange(insertDataBlock(editorState, imageData, selection))
    }
  }

  render () {
    const {editorState, stripPastedStyles, spellCheck} = this.props
    const plugins = this.plugins

    return (
      <div>
        <div id='editor' ref='editor' className='final-editor'>
          {this.renderSidebar({
            plugins,
            editorState,
            readOnly: this.state.readOnly,
            onChange: this.onChange,
            uploadImageCallBack: this.props.uploadImageCallBack
          })}
          <Editor
            readOnly={this.state.readOnly}
            plugins={plugins}
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
              actions: this.actions,
              entityInputs: this.entityInputs
            })}
        </div>
      </div>
    )
  }
}
