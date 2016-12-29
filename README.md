# [last-draft](http://lastdraft.vace.nz)

[![npm version](https://badge.fury.io/js/last-draft.svg)](https://badge.fury.io/js/last-draft)

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

![](https://raw.githubusercontent.com/StevenIseki/last-draft/master/example/public/screenshot.png)

last-draft is a Draft.js editor built with [draft-js-plugins](https://draft-js-plugins.com)

## Install
```jsx
npm install last-draft --save
```

## Use
```jsx
import React, { Component } from 'react'
import { render } from 'react-dom'
import {editorStateFromHtml, editorStateFromRaw} from 'last-draft'
import { Editor } from 'last-draft'

export default class ExampleEditor extends Component {
  constructor(props) {
    super(props)
    this.state = { value: editorStateFromRaw(raw) }
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
  return new Promise(
    (resolve, reject) => {
      /* simulate a 2 second call to parse file and return an img src... */
      setTimeout( () => {
        resolve({ src: 'http://imgur.com/yrwFoXT.jpg' });
      }, 2000)
    }
  )
}
```

## Props

#### `plugins` (required)
Array of plugins to include, any of the following: `imagePlugin`, `emojiPlugin`, `hashtagPlugin`, `inlineToolbarPlugin`, `linkifyPlugin`, `mentionPlugin`, `sideToolbarPlugin`, `stickerPlugin`, `undoPlugin`, `videoPlugin`

## Styles

Are using styled-components so they should `just work` 💅 like magic. They append to a `<style>` tag if you want to be specific.

## Development

```
yarn install
npm run dev
open http://127.0.0.1:3000
```

## License

[MIT](http://isekivacenz.mit-license.org/)
