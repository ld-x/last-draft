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
import React, { Component } from 'react';
import { render } from 'react-dom'
import Final from 'final-draft'

/* init the state, either from raw, html or text */
import { text } from './initialState/text'
import { raw } from './initialState/raw'
import { html } from './initialState/html'

const plugins = [
  'imagePlugin', 'emojiPlugin', 'hashtagPlugin', 'inlineToolbarPlugin', 'linkifyPlugin',
  'mentionPlugin', 'sideToolbarPlugin', 'stickerPlugin', 'undoPlugin', 'videoPlugin'
]

const INITIAL_STATE = { type: 'raw', content: raw }

export default class CustomMentionEditor extends Component {
  render() {
    return (
      <Final plugins={plugins}
             initialState={INITIAL_STATE} />
    )
  }
}
```

## Props

#### `plugins` (required)
Array of plugins to include, any of the following: `imagePlugin`, `emojiPlugin`, `hashtagPlugin`, `inlineToolbarPlugin`, `linkifyPlugin`, `mentionPlugin`, `sideToolbarPlugin`, `stickerPlugin`, `undoPlugin`, `videoPlugin`

#### `initialState` (optional)
An object with a `type` and `content`. The content is the actual initialState for the Editor, it can be type `raw`, `html` or `text`.

e.g. `const INITIAL_STATE = { type: 'raw', content: raw }`

## Styles

You will need to use webpack with style-loader, css-loader in css modules mode as shown in the example webpack.config.

```
use: [
  'style-loader',
  { loader: 'css-loader', options: { modules: true, importLoaders: 1, localIdentName: '[name]__[local]__[hash:base64:5]' } },
  { loader: 'postcss-loader' },
]
```

## Development

```
yarn install
npm run dev
open http://127.0.0.1:3000
```

## License

[MIT](http://isekivacenz.mit-license.org/)
