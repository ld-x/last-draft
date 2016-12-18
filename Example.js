import React, { Component } from 'react';
import { render } from 'react-dom'
import Final from './src/Final'

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
