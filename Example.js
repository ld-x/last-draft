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
        uploadImageCallBack={uploadImageCallBack}
        onChange={::this.onChange} />
    )
  }
}


function uploadImageCallBack(file) {
  console.log(file)
  return new Promise(
    (resolve, reject) => {
      /* simulate a 2 second call to parse file and return an img src... */
      setTimeout( () => {
        resolve({ src: 'http://imgur.com/yrwFoXT.jpg' });
      }, 2000)
    }
  )
}
