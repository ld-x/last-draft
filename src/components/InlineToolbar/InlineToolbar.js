import React, { Component } from 'react'
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor'
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin'

/*
import styles from './InlineToolbar.css'
const inlineToolbarPlugin = createInlineToolbarPlugin( { themes: styles })
// themes not yet implemented
*/

import 'draft-js-inline-toolbar-plugin/lib/plugin.css'
const inlineToolbarPlugin = createInlineToolbarPlugin()

const { InlineToolbar } = inlineToolbarPlugin
const plugins = [inlineToolbarPlugin]
const text = 'In this editor a toolbar with a lot more options shows up once you select part of the text …'

export default class CustomInlineToolbarEditor extends Component {

  state = {
    editorState: createEditorStateWithText(text)
  }

  onChange = (editorState) => {
    this.setState({ editorState })
  }

  focus = () => {
    this.editor.focus()
  }

  render() {
    return (
      <div className='styles' onClick={this.focus}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
          ref={(element) => { this.editor = element; }}
        />
        <InlineToolbar />
      </div>
    )
  }
}
