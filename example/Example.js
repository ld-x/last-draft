import React, { Component } from 'react'
import { render } from 'react-dom'
import {Editor, editorStateFromHtml, editorStateToHtml, editorStateFromRaw, editorStateToJSON, editorStateFromText} from '../src/'

/* init the state, either from raw or html */
import RAW from './initialState/raw'
import HTML from './initialState/html'

import video from 'ld-video'
import color from 'ld-color-picker'
import emoji from 'ld-emoji'
import gif from 'ld-gif'
import mention from 'ld-mention'
import audio from 'ld-audio'
import sticker from 'ld-sticker'
import html from 'ld-html'
import todo from 'ld-todo'
let plugins = [video, color, emoji, gif, mention, html]

export default class ExampleEditor extends Component {
  constructor(props) {
    super(props)
    /* examples of initial state */
    //const INITIAL_STATE = editorStateFromRaw(RAW)
    const INITIAL_STATE = editorStateFromHtml(HTML)
    //const INITIAL_STATE = editorStateFromRaw({})
    //const INITIAL_STATE = editorStateFromText('this is a cooel editor... 🏄🌠🏀')
    //const INITIAL_STATE = editorStateFromText('xyz')
    //const INITIAL_STATE = editorStateFromHtml('<div />')
    this.state = { value: INITIAL_STATE }
  }

  onChange(editorState) {
    this.setState({ value: editorState })
    /* You would normally save this to your database here instead of logging it */
    console.log(editorStateToHtml(editorState))
    //console.log(editorStateToJSON(editorState))
  }

  render() {
    return (
      <Editor
        theme={this.props.theme}
        plugins={plugins}
        inline={['bold', 'italic', 'dropcap']}
        blocks={['h3', 'quote']}
        mentionUsers={mentionUsers}
        autofocus={true}
        separators={false}
        editorState={this.state.value}
        placeholder='Text'
        uploadImageAsync={uploadImageAsync}
        onChange={::this.onChange} />
    )
  }
}

function uploadImageAsync(file) {
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

const mentionUsers = [
  {
    name: 'Max Stoiber',
    link: 'https://github.com/mxstbr',
    avatar: 'https://avatars0.githubusercontent.com/u/7525670?v=3&s=400',
  },
  {
    name: 'Nik Graf',
    link: 'https://github.com/nikgraf',
    avatar: 'https://avatars2.githubusercontent.com/u/223045?v=3&s=400',
  },
  {
    name: 'Steven Iseki',
    link: 'https://github.com/steveniseki',
    avatar: 'https://avatars1.githubusercontent.com/u/6695114?v=3&s=400',
  },
]

/* mentionUsersAsync example using github search api */

/*
const mentionUsersAsync = function (searchValue, cb) {
  return new Promise(
    (resolve, reject) => {
      let url = `https://api.github.com/search/users?q=${searchValue}`
      fetch(url)
      .then( (response) => { return response.json() })
      .then((data) => {
        let users = data.items.map( (u, i) => { return { name: u.login, link: u.html_url, avatar: u.avatar_url } })
        resolve({ mentionUsers: users })
      })
    }
  )
}
*/
