# [final-draft](http://finaldraft.vace.nz)

[![npm version](https://badge.fury.io/js/final-draft.svg)](https://badge.fury.io/js/final-draft)

![](https://raw.githubusercontent.com/StevenIseki/final-draft/master/public/screenshot.png)

final-draft is a Draft.js editor built using [draft-js-plugins](https://draft-js-plugins.com)

## Install
```jsx
npm install final-draft --save
```

## Use
```jsx
import React, { Component } from 'react'
import { render } from 'react-dom'
import {editorStateFromHtml, editorStateFromRaw} from 'final-draft'
import { Editor } from 'final-draft'

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
  console.log(file)
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
