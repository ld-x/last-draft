# [last-draft](http://lastdraft.xyz)

[![npm version](https://badge.fury.io/js/last-draft.svg)](https://badge.fury.io/js/last-draft)

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

![](https://raw.githubusercontent.com/vacenz/last-draft/master/example/public/screenshot.gif)

last-draft is a Draft.js editor using [draft-js-plugins](https://draft-js-plugins.com)

# Install
```jsx
npm install last-draft --save
```

# Docs

## Use
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

Check out the [example](https://github.com/vacenz/last-draft/tree/master/example) for more.

## Props

#### `blocks and inline style buttons`
In progress is the ability to toggle entities, inline style and block style buttons, as in Last Draft 2

#### `plugins`
Last Draft 3.0 uses [draft-js-plugins](https://github.com/draft-js-plugins/draft-js-plugins)

The following draft-js-plugins are added by default in Last Draft, TODO: In progress is being able to pass an array of the plugins required.

- last-draft-js-sidebar-plugin
- last-draft-js-toolbar-plugin
- draft-js-modal-plugin
- draft-js-color-picker-plugin
- draft-js-gif-picker-plugin
- draft-js-emoji-picker-plugin
- draft-js-alignment-plugin
- draft-js-dnd-plugin
- draft-js-embed-plugin
- draft-js-emoji-plugin
- draft-js-focus-plugin
- draft-js-hashtag-plugin
- draft-js-image-plugin
- draft-js-link-plugin
- draft-js-linkify-plugin
- draft-js-mention-plugin
- draft-js-resizeable-plugin


```jsx
import video from 'ld-video'
import audio from 'ld-audio'
import color from 'ld-color-picker'
import emoji from 'ld-emoji'
import gif from 'ld-gif'
import mention from 'ld-mention'
import html from 'ld-html'
import todo from 'ld-todo'
let plugins = [video, audio, color, emoji, gif, mention, html, todo]

<Editor
  editorState={this.state.value}
  plugins={plugins}
  onChange={::this.onChange} />
```

#### `mentions`
A list of users for mentions functionality. An array of objects with properties `name`, `link` and `avatar`.

```jsx
<Editor
  editorState={this.state.value}
  mentions={mentionList}
  onChange={::this.onChange} />

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

```

#### `mentionSearchAsync`
A function that returns the list of filtered user suggestions for the draft-js-mention-plugin.

```jsx
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
```

#### `uploadImageAsync`

TODO: This is still in progress

A callback to parse the url for example uploading the file to S3 or a database and returning the url. Returns a promise which should return an object with a src property e.g. `resolve({ src: 'http://imgur.com/yrwFoXT.jpg' })`. You can also return `srcSet` prop for responsive images `resolve({ src: 'x.jpg' srcSet: 'y.jpg' })`

```jsx
function uploadImageAsync(file) {
  return new Promise(
    (resolve, reject) => {
      /* simulating a 2 second call to parse file and return an img src... */
      setTimeout( () => {
        const src = 'http://imgur.com/yrwFoXT.jpg'
        resolve({ src: src })
      }, 2000)
    }
  )
}
```

## Styles

Last Draft uses style loader and css loader for theming following the draft-js-plugin approach.

### Webpack Usage
Follow the steps below to import the css file by using Webpack's `style-loader` and `css-loader`.

1. Install Webpack loaders: `npm install style-loader css-loader --save-dev`
2. Add the below section to Webpack config.

    ```js
    module: {
      loaders: [{
        test: /\.css$/,
        loaders: [
          'style', 'css'
        ]
      }]
    }
    ```

You need to include the base [draft.css](https://github.com/vacenz/last-draft/blob/master/lib/styles/draft.css) styles, similar to with any Draft.js Editor.
