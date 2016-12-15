# [final-draft](http://finaldraft.vace.nz)

[![npm version](https://badge.fury.io/js/final-draft.svg)](https://badge.fury.io/js/final-draft)

![](https://raw.githubusercontent.com/StevenIseki/final-draft/master/public/screenshot.png)

final-draft is a Draft.js editor built using [draft-js-plugins](https://draft-js-plugins.com)

## Use
```
npm install final-draft --save

import React, { Component } from 'react'
import Final from 'final-draft'

const plugins = [
  'imagePlugin', 'emojiPlugin', 'hashtagPlugin', 'inlineToolbarPlugin', 'linkifyPlugin',
  'mentionPlugin', 'sideToolbarPlugin', 'stickerPlugin', 'undoPlugin'
]

export default class FinalEditor extends Component {
  onChange = (editorState) => {
    console.log(editorState)
  }

  render() {
    return (
      <Final plugins={plugins}
             onChange={this.onChange}
      />
    )
  }
}
```

## Run Example

**Note:** Currently including the draft-js-plugins in this project as I work on them, once they are stable and version 2 is released, they will go back to being included in the `package.json`.

```
yarn install
npm run dev
open http://127.0.0.1:3000
```
