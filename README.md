# [last-draft](http://lastdraft.vace.nz)

[![npm version](https://badge.fury.io/js/last-draft.svg)](https://badge.fury.io/js/last-draft)

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

![](https://raw.githubusercontent.com/vacenz/last-draft/master/example/public/screenshot.png)

last-draft is a Draft.js editor built with [draft-js-plugins](https://draft-js-plugins.com)

# Install
```jsx
npm install last-draft --save
```

# Docs

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

#### `plugins`
Array of plugins to include, any of the following: `image`, `video` and `emoji` plugins.

By default all plugins are included:

```jsx
plugins: ['image', 'video', 'emoji']
```

#### `toolbar`
Customize the buttons on the inline toolbar to toggle inline styles, block styles and link entities, any of the following: `bold`, `italic`, `link`, `ul`, `ol`, `h2`, `blockquote`, `pullquote`, `alignment`.

By default all toolbar buttons are included:

```jsx
toolbar: ['bold', 'italic', 'link', 'ul', 'ol', 'h2', 'blockquote', 'pullquote', 'alignment']
```

## Styles

Last Draft uses styled-components 💅 for the base styling. It also allows for you to add some custom css to override this base styling with the following class names:

- Block styles

```css
.header {}
.unordered-list {}
.ordered-list {}
.pullquote {}
.blockquote {}
.align-wrapper {}
.align-left {}
.align-center {}
.align-right {}
```

- Entity styles

```css
.ld-link {}
.ld-hashtag {}
```

- Plugin Block styles

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
.ld-image-block-button {}
.ld-video-block-wrapper {}
.ld-video-block {}
.ld-video-block-button {}
.ld-emoji {}
.ld-emoji-modal {}
.ld-emoji-close-icon {}
.ld-emoji-block-button {}
```

- Button styles

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
.ld-button-pullquote {}
.ld-button-unordered-list {}
.ld-button-unlink {}
.ld-button-video {}
```

- Inline Toolbar

```css
.ld-toolbar-wrapper {}
.ld-toolbar {}
.ld-toolbar-error {}
.ld-toolbar-arrow {}
.ld-toolbar-button-wrapper {}
.ld-toolbar-button {}
.ld-link-toolbar-button {}
.ld-link-toolbar-item {}
.ld-link-toolbar-input {}
```

- Side Toolbar

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
