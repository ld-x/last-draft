# [last-draft](http://lastdraft.xyz)

[![npm version](https://badge.fury.io/js/last-draft.svg)](https://badge.fury.io/js/last-draft)

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

![](https://raw.githubusercontent.com/vacenz/last-draft/master/example/public/screenshot.gif)

last-draft is a Draft.js editor using [draft-js-plugins](https://draft-js-plugins.com)

# Install
```jsx
npm install last-draft --save
```

## Important Note:

Last Draft now has 2 maintained versions:

## Version

#### `3.0.0` in progress version using [draft-js-plugins](https://draft-js-plugins.com) and [last-draft-js-plugins](https://github.com/vacenz/last-draft-js-plugins)

https://github.com/vacenz/last-draft/tree/v3

This branch will be kept in sync with master.

#### `2.1.0` stable version using [MegaDraft](https://github.com/globocom/megadraft) plugin approach and ld-plugins

https://github.com/vacenz/last-draft/tree/v2

## v3 Use
```jsx
import React, { Component } from 'react'
import { render } from 'react-dom'
import {Editor, editorStateFromHtml, editorStateToHtml, editorStateFromRaw, editorStateFromText} from 'last-draft'
import { fromJS } from 'immutable';

export default class ExampleEditor extends Component {
  constructor(props) {
    super(props)
    const INITIAL_STATE = editorStateFromText('this is a cooel editor... 🏄🌠🏀')
    this.state = { editorState: INITIAL_STATE }
  }

  onChange = (editorState) => {
    this.setState({ editorState: editorState })
    /* You would normally save this to your database here instead of logging it */
    console.log(editorStateToHtml(editorState))
  }

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        placeholder='Text'
        onChange={::this.onChange} />
    )
  }
}
```

## v2 Use
```jsx
import React, { Component } from 'react'
import { render } from 'react-dom'
import {Editor, editorStateFromHtml, editorStateToHtml, editorStateFromRaw, editorStateToJSON} from 'last-draft'

import video from 'ld-video'
import color from 'ld-color-picker'
import emoji from 'ld-emoji'
import gif from 'ld-gif'
import mention from 'ld-mention'
import audio from 'ld-audio'
import sticker from 'ld-sticker'
import html from 'ld-html'
import todo from 'ld-todo'
let plugins = [video, color, emoji, gif, mention]

/* init the state, either from raw or html */
import raw from './initialState/raw'


export default class ExampleEditor extends Component {
  constructor(props) {
    super(props)
    const INITIAL_STATE = editorStateFromRaw(raw)
    this.state = { value: INITIAL_STATE }
  }

  onChange(editorState) {
    this.setState({ value: editorState })
    console.log(editorStateToHtml(editorState))
    console.log(editorStateToJSON(editorState))
  }

  render() {
    return (
      <Editor
        plugins={plugins}
        editorState={this.state.value}
        placeholder='Enter text...'
        onChange={::this.onChange} />
    )
  }
}
```
