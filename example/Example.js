import React, { Component } from 'react'
import { render } from 'react-dom'
import { Editor, editorStateFromHtml, editorStateFromRaw} from '../src/Final'

/* init the state, either from raw or html */
import raw from './initialState/raw'
import html from './initialState/html'

export default class ExampleEditor extends Component {
  constructor(props) {
    super(props)
    const INITIAL_STATE = editorStateFromRaw(raw)
    //const INITIAL_STATE = editorStateFromHtml(html)
    this.state = { value: INITIAL_STATE }
  }

  onChange(value) {
    this.setState({ value })
  }

  render() {
    return (
      <Editor
        editorState={this.state.value}
        placeholder='Text'
        uploadImageCallBack={uploadImageCallBack}
        onChange={::this.onChange} />
    )
  }
}

function uploadImageCallBack(file) {
  return new Promise(
    (resolve, reject) => {
      /* simulate a 2 second call to parse file and return an img src... */
      setTimeout( () => {
        resolve({ src: 'http://imgur.com/yrwFoXT.jpg' });
      }, 2000)
    }
  )
}
