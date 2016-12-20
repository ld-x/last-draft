import React, { Component } from 'react'
import { render } from 'react-dom'
import {editorStateToJSON, editorStateFromRaw} from "./src/utils"
import { Editor } from './src/Final'

/* init the state, either from raw, html or text */
import text from './initialState/text'
import raw from './initialState/raw'
import html from './initialState/html'

const plugins = [
  'imagePlugin', 'emojiPlugin', 'hashtagPlugin', 'inlineToolbarPlugin',
]

const INITIAL_STATE = { type: 'raw', content: editorStateFromRaw(raw) }

export default class CustomMentionEditor extends Component {

  constructor(props) {
    super(props)
    this.state = { value: INITIAL_STATE.content }
  }

  onChange(value) {
    this.setState({ value })
  }

  render() {
    return (
      <Editor
        editorState={this.state.value}
        placeholder="Text"
        onChange={::this.onChange} />
    )
  }
}
