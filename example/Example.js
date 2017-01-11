import React, { Component } from 'react'
import { render } from 'react-dom'
import {Editor, editorStateFromHtml, editorStateToHtml, editorStateFromRaw, editorStateToJSON} from '../src/'

/* init the state, either from raw or html */
import RAW from './initialState/raw'
import HTML from './initialState/html'

/* init inline and side toolbars, optional if you want all items present */
let SIDE_TOOLBAR = ['image', 'video', 'emoji']
let INLINE_TOOLBAR = ['bold', 'italic', 'dropcap', 'code', 'link', 'ul', 'ol', 'h2', 'blockquote', 'quote']

export default class ExampleEditor extends Component {
  constructor(props) {
    super(props)
    const INITIAL_STATE = editorStateFromRaw(RAW)
    //const INITIAL_STATE = editorStateFromHtml(HTML)
    this.state = { value: INITIAL_STATE }
  }

  onChange(editorState) {
    this.setState({ value: editorState })
    /* You would normally save this to your database here instead of logging it */
    console.log(editorStateToHtml(editorState))
    console.log(editorStateToJSON(editorState))
  }

  render() {
    return (
      <Editor
        autofocus={true}
        editorState={this.state.value}
        sideToolbar={SIDE_TOOLBAR}
        inlineToolbar={INLINE_TOOLBAR}
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
      }, 4000)
    }
  )
}
