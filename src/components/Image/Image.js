import React, { Component } from 'react'
import { convertFromRaw, EditorState } from 'draft-js'
import Editor, { composeDecorators } from 'draft-js-plugins-editor'
import createImagePlugin from 'draft-js-image-plugin'
import createAlignmentPlugin from 'draft-js-alignment-plugin'
import createFocusPlugin from 'draft-js-focus-plugin'
import createResizeablePlugin from 'draft-js-resizeable-plugin'
import createDndPlugin from 'draft-js-dnd-plugin'

const focusPlugin = createFocusPlugin()
const resizeablePlugin = createResizeablePlugin()
const dndPlugin = createDndPlugin()
const alignmentPlugin = createAlignmentPlugin()
const { AlignmentTool } = alignmentPlugin

import styles from './Image.css'
import 'draft-js-image-plugin/lib/plugin.css'
import 'draft-js-alignment-plugin/lib/plugin.css'
import 'draft-js-focus-plugin/lib/plugin.css'
import 'draft-js-image-plugin/lib/plugin.css'
import 'draft-js-toolbar-plugin/lib/plugin.css'

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  dndPlugin.decorator
)

const imagePlugin = createImagePlugin({ decorator })
const plugins = [dndPlugin, focusPlugin, alignmentPlugin, resizeablePlugin, imagePlugin]

import { initialState } from './initialState'

export default class CustomImageEditor extends Component {

  state = {
    editorState: EditorState.createWithContent(convertFromRaw(initialState))
  }

  onChange = (editorState) => {
    this.setState({ editorState })
  }

  focus = () => {
    this.editor.focus()
  }

  render() {
    return (
      <div>
        <div className='editor' onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={(element) => { this.editor = element; }}
          />
          <AlignmentTool />
        </div>
      </div>
    )
  }
}
