# [last-draft](http://lastdraft.xyz)

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
Array of inline styles to use in the toolbar. Any of the following: `bold`, `italic`, `strikethrough`, `underline`, `code`, `dropcap`. By default all are included:

```jsx
<Editor
  editorState={this.state.value}
  inline={['bold', 'italic', 'dropcap']}
  onChange={::this.onChange} />
```

#### `blocks`
Array of block styles to use in the toolbar. Any of the following: `ul`, `ol`, `h1`, `h2`, `h3`, `h4`, `h5`, `blockquote`, `quote`. By default `ul`, `ol` and `blockquote` are included:

```jsx
<Editor
  editorState={this.state.value}
  blocks={['blockquote', 'code']}
  onChange={::this.onChange} />
```

#### `entities`
Array of entities to use. Any of the following: `link`, `hashtag`, `mentions`. By default all are included:

```jsx
<Editor
  editorState={this.state.value}
  entities={['link']}
  onChange={::this.onChange} />
```

#### `plugins`
Plugins include custom functionality which can be activated from a button in the toolbar. By default the `image` plugin is always included. However you can create your own plugins! Some examples are below:

- [ld-video](https://github.com/vacenz/ld-video) - Adds embed video functionality from youtube and vimeo
- [ld-audio](https://github.com/steveniseki/ld-audio) - Adds an audio player with soundcloud support
- [ld-color-picker](https://github.com/steveniseki/ld-color-picker) - Adds Color picker functionality
- [ld-emoji](https://github.com/vacenz/ld-emoji) - Adds emoji functionality
- [ld-gif](https://github.com/steveniseki/ld-gif) - Adds gif functionality from Giphy
- [ld-mention](https://github.com/steveniseki/ld-mention) - Adds mention functionality
- [ld-html](https://github.com/steveniseki/ld-html) - Adds Edit html functionality
- [ld-todo](https://github.com/vacenz/ld-todo) - Adds todo functionality

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

#### Creating your own plugin
To create and test your own plugin, I would advise to test it in this repo, by following these steps, using the `video plugin` as an example.

Create a new `/video` folder in `/plugins` copying the `src\video` folder from [ld-video](https://github.com/vacenz/ld-video)

Add the following line to `/plugins/index`: `export video from './video/plugin'`

Import your test plugin to the Editor in `last-draft/src/components/Editor` by:

Updating the plugin import at the top `import {image, placeholder, video} from '../plugins/'`

And then adding updating the following line in the `getValidPlugins ()` function: `let plugins = [image, placeholder, video]`.

Copy any of the above `ld-` plugins as a starting point. Once it is working then create your new plugin repo `npm run build` it, then publish it to npm.

#### `mentionUsers`
A list of users for mentions functionality. An array of objects with properties `name`, `link` and `avatar`. You must also add the [ld-mention](https://github.com/steveniseki/ld-mention) to show mentions on autocomplete.

```jsx
<Editor
  editorState={this.state.value}
  mentionUsers={mentionUsers}
  onChange={::this.onChange} />

const mentionUsers = [
  {
    name: 'Steven Iseki',
    link: 'https://github.com/steveniseki',
    avatar: 'https://avatars1.githubusercontent.com/u/6695114?v=3&s=400',
  },
  {
    name: 'Nik Graf',
    link: 'https://github.com/nikgraf',
    avatar: 'https://avatars2.githubusercontent.com/u/223045?v=3&s=400',
  }
]
```

#### `mentionUsersAsync`
A function that returns a list of filtered users for mentions functionality.

The `searchValue` is passed to the function, which will filter and return the users e.g. Searching for users in github. Returns a promise which should return an object with the mentionUsers array. You must also add the [ld-mention](https://github.com/steveniseki/ld-mention) to show mentions on autocomplete.

```jsx
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
```

#### `uploadImageAsync`

A callback to parse the url for example uploading the file to S3 or a database and returning the url. Returns a promise which should return an object with a src property e.g. `resolve({ src: 'http://imgur.com/yrwFoXT.jpg' })`. You can also return `srcSet` prop for responsive images `resolve({ src: 'x.jpg' srcSet: 'y.jpg' })`

```jsx
<Editor
  editorState={this.state.value}
  uploadImageAsync={uploadImageAsync}
  onChange={::this.onChange} />

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

#### `autofocus`
Whether to focus the Editor on component mount. Default is `false`

#### `separators`
Whether to show the Separators between inline, blocks and plugins. Default is `true`

#### `theme`
Pass in a custom theme to override the base Last Draft styles. An object with the following properties:

`let THEME = { backgroundColor: '#181818', color: '#66ff00', highlight: '#a80077' }`

## Styles

Last Draft uses styled-components 💅 for the base styling.

You need to include the base [draft.css](https://github.com/vacenz/last-draft/blob/master/lib/styles/draft.css) styles, similar to with any Draft.js Editor.

You can set a custom theme for the Last Draft Editor. As shown in the [last draft example](http://lastdraft.xyz)

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
.ld-mention {}
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
