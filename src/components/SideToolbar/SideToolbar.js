import React, { Component } from 'react'
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor'
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin'

/*
import styles from './SideToolbar.css'
const sideToolbarPlugin = createSideToolbarPlugin({ themes: styles })
// themes not yet implemented
*/

import 'draft-js-side-toolbar-plugin/lib/plugin.css'
const sideToolbarPlugin = createSideToolbarPlugin()

const { SideToolbar } = sideToolbarPlugin
const plugins = [sideToolbarPlugin]
const text = 'Once you click into the text field the sidebar plugin will show up …'


export default class CustomSideToolbarEditor extends Component {

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
      <div className='editor' onClick={this.focus}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
          ref={(element) => { this.editor = element; }}
        />
        <SideToolbar />
      </div>
    )
  }
}
