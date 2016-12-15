import React, { Component } from 'react';
import { render } from 'react-dom'
import Final from './src/Final'

const plugins = [
  'imagePlugin', 'emojiPlugin', 'hashtagPlugin', 'inlineToolbarPlugin', 'linkifyPlugin',
  'mentionPlugin', 'sideToolbarPlugin', 'stickerPlugin', 'undoPlugin'
]

export default class CustomMentionEditor extends Component {
  render() {
    return (
      <Final plugins={plugins} />
    )
  }
}
