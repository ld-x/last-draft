import React, { Component } from 'react'
import { convertFromRaw, EditorState } from 'draft-js'
import Editor, { composeDecorators } from 'draft-js-plugins-editor'
import createImagePlugin from 'draft-js-image-plugin'
import createAlignmentPlugin from 'draft-js-alignment-plugin'
import createFocusPlugin from 'draft-js-focus-plugin'
import createResizeablePlugin from 'draft-js-resizeable-plugin'
import createDndPlugin from 'draft-js-dnd-plugin'

/*
import focusStyles from './Focus.css'
import alignmentStyles from './Alignment.css'
const focusPlugin = createFocusPlugin({ theme: focusStyles })
const alignmentPlugin = createAlignmentPlugin({ theme: alignmentStyles })
*/

import 'draft-js-alignment-plugin/lib/plugin.css'
import 'draft-js-focus-plugin/lib/plugin.css'
const focusPlugin = createFocusPlugin()
const alignmentPlugin = createAlignmentPlugin()

const resizeablePlugin = createResizeablePlugin()
const dndPlugin = createDndPlugin()
const { AlignmentTool } = alignmentPlugin

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  dndPlugin.decorator
)

import { initialState } from './initialState'

const imagePlugin = createImagePlugin({ decorator })
const plugins = [dndPlugin, focusPlugin, alignmentPlugin, resizeablePlugin, imagePlugin]
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
