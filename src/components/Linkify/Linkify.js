import React, { Component } from 'react'
import { EditorState } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import createLinkifyPlugin from 'draft-js-linkify-plugin'

/*
import styles from './Linkify.css'
const linkifyPlugin = createLinkifyPlugin({ theme: styles })
*/

import 'draft-js-linkify-plugin/lib/plugin.css'
const linkifyPlugin = createLinkifyPlugin()

const plugins = [linkifyPlugin]
export default class CustomMentionEditor extends Component {

  state = {
    editorState: EditorState.createEmpty(),
  }

  onChange = (editorState) => {
    this.setState({
      editorState,
    })
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
      </div>
    )
  }
}
