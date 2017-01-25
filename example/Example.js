import React, { Component } from 'react'
import { render } from 'react-dom'
import {Editor, editorStateFromHtml, editorStateToHtml, editorStateFromRaw, editorStateToJSON, editorStateFromText} from '../src/'

/* init the state, either from raw or html */
import RAW from './initialState/raw'
import HTML from './initialState/html'

import emoji from 'ld-emoji'
import html from 'ld-html'
import todo from 'ld-todo'
let plugins = [emoji, html, todo]

export default class ExampleEditor extends Component {
  constructor(props) {
    super(props)
    /* examples of initial state */
    const INITIAL_STATE = editorStateFromRaw(RAW)
    //const INITIAL_STATE = editorStateFromRaw({})
    //const INITIAL_STATE = editorStateFromText('this is a cooel editor... 🏄🌠🏀')
    //const INITIAL_STATE = editorStateFromHtml(HTML)
    //const INITIAL_STATE = editorStateFromHtml('<div />')
    this.state = { value: INITIAL_STATE }
  }

  onChange(editorState) {
    this.setState({ value: editorState })
    /* You would normally save this to your database here instead of logging it */
    //console.log(editorStateToHtml(editorState))
    //console.log(editorStateToJSON(editorState))
  }

  render() {
    return (
      <Editor
        theme={this.props.theme}
        plugins={plugins}
        inline={['bold', 'italic', 'dropcap']}
        blocks={['ol', 'h2', 'quote']}
        autofocus={true}
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
