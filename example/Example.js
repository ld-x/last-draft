import React, { Component } from 'react'
import { render } from 'react-dom'
import {Editor, editorStateFromHtml, editorStateToHtml, editorStateFromRaw, editorStateToJSON, editorStateFromText} from '../src/'

/* init the state, either from raw or html */
import RAW from './initialState/raw'
import HTML from './initialState/html'

import audio from 'ld-audio'
import color from 'ld-color-picker'
import emoji from 'ld-emoji'
import html from 'ld-html'
import todo from 'ld-todo'
let plugins = [audio, color, emoji, html, todo]

export default class ExampleEditor extends Component {
  constructor(props) {
    super(props)
    /* examples of initial state */
    // const INITIAL_STATE = editorStateFromRaw(RAW)
    //const INITIAL_STATE = editorStateFromRaw({})
    //const INITIAL_STATE = editorStateFromText('this is a cooel editor... 🏄🌠🏀')
    const INITIAL_STATE = editorStateFromHtml('<span class="color-0074D9">built</span>')
    //const INITIAL_STATE = editorStateFromHtml('<div />')
    this.state = { value: INITIAL_STATE }
  }

  onChange(editorState) {
    this.setState({ value: editorState })
    /* You would normally save this to your database here instead of logging it */
    // console.log(editorStateToJSON(editorState))
  }
  showState() {
    console.log(editorStateToHtml(this.state.value))
  }

  render() {
    return (
      <div>
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
        <button type="button" onClick={::this.showState}>Log State</button>
      </div>
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
