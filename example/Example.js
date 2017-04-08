import React, { Component } from 'react'
import { render } from 'react-dom'
import {Editor, editorStateFromHtml, editorStateToHtml, editorStateFromRaw, editorStateToJSON, editorStateFromText} from '../src/'
import { fromJS } from 'immutable';

/* init the state, either from raw or html */
import RAW from './initialState/raw'
import HTML from './initialState/html'

export default class ExampleEditor extends Component {
  constructor(props) {
    super(props)
    /* examples of initial state */
    const INITIAL_STATE = editorStateFromRaw(RAW)
    //const INITIAL_STATE = editorStateFromHtml(HTML)
    //const INITIAL_STATE = editorStateFromRaw({})
    //const INITIAL_STATE = editorStateFromText('this is a cooel editor... 🏄🌠🏀')
    //const INITIAL_STATE = editorStateFromHtml('<div />')
    this.state = { editorState: INITIAL_STATE }
  }

  onChange = (editorState) => {
    this.setState({ editorState: editorState })
    /* You would normally save this to your database here instead of logging it */
    console.log(editorStateToHtml(editorState))
    //console.log(editorStateToJSON(editorState))
  }

  // mentions={mentionList} slight bug in this at the moment
  // https://github.com/draft-js-plugins/draft-js-plugins/issues/687

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        placeholder='Text'
        mentionSearchAsync={mentionUsersAsync}
        onChange={::this.onChange} />
    )
  }
}

/* mentionUsersAsync example using github search api */

const mentionUsersAsync = function (searchValue, cb) {
  return new Promise(
    (resolve, reject) => {
      let url = `https://api.github.com/search/users?q=${searchValue}`
      fetch(url)
      .then( (response) => { return response.json() })
      .then((data) => {
        let users = data.items.map( (u, i) => { return { name: u.login, link: u.html_url, avatar: u.avatar_url } })
        resolve({ suggestions: users })
      })
    }
  )
}

const mentionList = fromJS([
  {
    name: 'Nik Graf',
    link: 'https://twitter.com/nikgraf',
    avatar: 'https://avatars0.githubusercontent.com/u/223045?v=3&s=400',
  },
  {
    name: 'Steven Iseki',
    link: 'https://github.com/steveniseki',
    avatar: 'https://avatars1.githubusercontent.com/u/6695114?v=3&s=400',
  }
]);
