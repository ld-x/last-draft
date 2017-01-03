import React, { Component } from 'react'
import { render } from 'react-dom'
import { Editor, editorStateFromHtml, editorStateFromRaw, editorStateToJSON } from '../src/'

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
    console.log(editorStateToJSON(value))
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
        /* the image src would be a url from an S3 or database resouse */
        const src = window.URL.createObjectURL(file)
        //const src = 'http://imgur.com/yrwFoXT.jpg'
        resolve({ src: src });
      }, 2000)
    }
  )
}
