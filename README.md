# [last-draft](http://lastdraft.vace.nz)

[![npm version](https://badge.fury.io/js/last-draft.svg)](https://badge.fury.io/js/last-draft)

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

![](https://raw.githubusercontent.com/vacenz/last-draft/master/example/public/screenshot.png)

last-draft is a Draft.js editor inspired heavily by [MegaDraft](https://github.com/globocom/megadraft) and [draft-js-plugins](https://draft-js-plugins.com)

# Install
```jsx
npm install last-draft --save
```

# Docs

## Example

Check out this awesome 🌠🎉🏄 [Last Draft example](https://github.com/vacenz/last-draft-example)

To run the example simply `git clone`, then run `yarn install` and `npm run dev`

## Use
```jsx
import React, { Component } from 'react'
import { render } from 'react-dom'
import {Editor, editorStateFromHtml, editorStateToHtml, editorStateFromRaw, editorStateToJSON} from 'last-draft'

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
        editorState={this.state.value}
        placeholder='Enter text...'
        onChange={::this.onChange} />
    )
  }
}
```

## Props

#### `inline`
Array of inline styles to use in the toolbar. Any of the following: `bold`, `italic`, `strikethrough`, `code`, `dropcap`. By default all are included:

```jsx
<Editor
  editorState={this.state.value}
  inline={['bold', 'italic', 'dropcap']}
  onChange={::this.onChange} />
```

#### `blocks`
Array of block styles to use in the toolbar. Any of the following: `ul`, `ol`, `h2`, `blockquote`, `quote`, `alignment`. By default all are included:

```jsx
<Editor
  editorState={this.state.value}
  blocks={['blockquote', 'quote', 'code']}
  onChange={::this.onChange} />
```

#### `entities`
Array of entities to use in. Any of the following: `link`, `hashtag`. By default all are included:

```jsx
<Editor
  editorState={this.state.value}
  entities={['link']}
  onChange={::this.onChange} />
```

#### `plugins`
Plugins include custom functionality which can be activated from a button in the toolbar. By default the `image` and `video` plugins are included. However you can create your own plugins! Some examples are below:

- [ld-html](https://github.com/vacenz/ld-html) - Adds Edit html functionality
- [ld-emoji](https://github.com/vacenz/ld-emoji) - Adds emoji functionality

```jsx
import emoji from 'ld-emoji'
import html from 'ld-html'
let plugins = [emoji,html]

<Editor
  editorState={this.state.value}
  plugins={plugins}
  onChange={::this.onChange} />
```

#### `uploadImageCallBack`

A callback to parse the url for example uploading the file to S3 or a database and returning the url. Returns a promise which should return an object with a src property e.g. `resolve({ src: 'http://imgur.com/yrwFoXT.jpg' })`

```jsx
<Editor
  editorState={this.state.value}
  uploadImageCallBack={uploadImageCallBack}
  onChange={::this.onChange} />

function uploadImageCallBack(file) {
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

#### `autofocus`
Whether to focus the Editor on component mount. Default is `false`

#### `theme`
Pass in a custom theme to override the base Last Draft styles. An object with the following properties:

`let THEME = { backgroundColor: '#181818', color: '#66ff00', highlight: '#a80077' }`

## Styles

Last Draft uses styled-components 💅 for the base styling.

You need to include the base [draft.css](https://github.com/vacenz/last-draft/blob/master/lib/styles/draft.css) styles, similar to with any Draft.js Editor.

You can set a custom theme for the Last Draft Editor. As shown in the [last draft example](http://lastdraft.vace.nz)

```jsx
let THEME = {
  backgroundColor: '#181818',
  color: '#66ff00',
  highlight: '#a80077'
}

<Editor theme={THEME}
```

## Custom Styles with CSS

You can also add custom css to override the base styling with the following class names specified below:

It is simple to customize elements in the editor, as shown in the [ld-theme-example.css](https://github.com/vacenz/last-draft/blob/master/lib/styles/ld-theme-example.css).


**Block styles**

```css
.ld-header {}
.ld-unordered-list {}
.ld-ordered-list {}
.ld-quote {}
.ld-blockquote {}
.ld-align-wrapper {}
.ld-align-left {}
.ld-align-center {}
.ld-align-right {}
```

**Entity styles**

```css
.ld-link {}
.ld-hashtag {}
```

**Plugin Block styles**

```css
.ld-block-wrapper {}
.ld-block {}
.ld-block-actions-wrapper {}
.ld-block-actions {}
.ld-block-action {}
.ld-block-content {}
.ld-block-input-wrapper {}
.ld-block-input {}
.ld-image-block {}
.ld-image-placeholder-block {}
.ld-image-placeholder-block-loader {}
.ld-image-block-button {}
.ld-video-block-wrapper {}
.ld-video-block {}
.ld-video-block-button {}
.ld-emoji {}
.ld-emoji-modal {}
.ld-emoji-close-icon {}
.ld-emoji-block-button {}
```

**Button styles**

```css
.ld-button-align-left {}
.ld-button-align-center {}
.ld-button-align-right {}
.ld-button-blockquote {}
.ld-button-bold {}
.ld-button-close {}
.ld-button-cross {}
.ld-button-emoji {}
.ld-button-error {}
.ld-button-header {}
.ld-button-image {}
.ld-button-italic {}
.ld-button-link {}
.ld-button-ordered-list {}
.ld-button-quote {}
.ld-button-unordered-list {}
.ld-button-unlink {}
.ld-button-video {}
```

**Inline Toolbar**

```css
.ld-toolbar-wrapper {}
.ld-toolbar {}
.ld-toolbar-error {}
.ld-toolbar-button-wrapper {}
.ld-toolbar-button {}
.ld-link-toolbar-button {}
.ld-link-toolbar-item {}
.ld-link-toolbar-input {}
```

**Side Toolbar**

```css
.ld-sidebar {}
.ld-sidebar-menu-wrapper {}
.ld-sidemenu-wrapper {}
.ld-sidemenu {}
.ld-sidemenu-button {}
.ld-sidemenu-items {}
.ld-sidemenu-item {}
```

## Development

```
yarn install
npm run dev
open http://127.0.0.1:3000
```

## License

[MIT](http://isekivacenz.mit-license.org/)
