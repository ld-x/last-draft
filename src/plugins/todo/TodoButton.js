/*
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import {Editor, EditorState, RichUtils, getDefaultKeyBinding, DefaultDraftBlockRenderMap, EditorBlock} from 'draft-js'
import React, {Component} from 'react'

const resetBlockType = (editorState, newType = Block.UNSTYLED) => {
  const contentState = editorState.getCurrentContent()
  const selectionState = editorState.getSelection()
  const key = selectionState.getStartKey()
  const blockMap = contentState.getBlockMap()
  const block = blockMap.get(key)
  let newText = ''
  const text = block.getText()
  if (block.getLength() >= 2) { newText = text.substr(1) }
  const newBlock = block.merge({
    text: newText,
    type: newType,
    data: { checked: false, type: 'todo' },
  })
  const newContentState = contentState.merge({
    blockMap: blockMap.set(key, newBlock),
    selectionAfter: selectionState.merge({ anchorOffset: 0, focusOffset: 0 })
  })

  return EditorState.push(editorState, newContentState, 'change-block-type')
}

export default class extends Component {
  onClick (e) {
    const { editorState } = this.props
    e.preventDefault()
    const selection = editorState.getSelection()
    const currentBlock = editorState.getCurrentContent().getBlockForKey(selection.getStartKey())
    const blockType = currentBlock.getType()
    this.props.onChange(resetBlockType(editorState, 'atomic'))
  }

  render () {
    return (
      <svg fill='currentColor' height='24' viewBox='0 0 24 24' width='24' onClick={::this.onClick} className='ld-button-todo'>
        <path d='M14 10H2v2h12v-2zm0-4H2v2h12V6zM2 16h8v-2H2v2zm19.5-4.5L23 13l-6.99 7-4.51-4.5L13 14l3.01 3 5.49-5.5z' />
      </svg>
    )
  }
}
