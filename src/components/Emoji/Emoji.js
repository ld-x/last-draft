import React, { Component } from 'react'
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor'
import createEmojiPlugin from 'draft-js-emoji-plugin'
import styles from './Emoji.css'

const emojiPlugin = createEmojiPlugin({ theme: styles })
const { EmojiSuggestions } = emojiPlugin
const plugins = [emojiPlugin]
const text = `Cool, we can have all sorts of Emojis here. 🙌
🌿☃️🎉🙈 aaaand maybe a few more here 🐲☀️🗻 Quite fun!`

import 'draft-js-emoji-plugin/lib/plugin.css'


export default class SimpleEmojiEditor extends Component {

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
        <EmojiSuggestions />
      </div>
    )
  }
}
