/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import { Map } from 'immutable'
import { DefaultDraftBlockRenderMap, getVisibleSelectionRect} from 'draft-js'
import DraftOffsetKey from 'draft-js/lib/DraftOffsetKey'
import React, {Component} from 'react'

export const blockRenderMap = Map({
  ['em']: {
    element: 'em',
  },
  ['caption']: {
    element: 'cite',
  },
  ['quote']: {
    element: 'span',
  },
  ['image']: {
    element: 'figure',
  },
  ['break']: {
    element: 'div',
  },
  ['span']: {
    element: 'span',
  },
  ['section']: {
    element: 'section',
  },
  ['break']: {
    element: 'div',
  },
}).merge(DefaultDraftBlockRenderMap)


export function blockStyleFn (contentBlock) {
  const type = contentBlock.getType()
  if (type === 'unstyled') {
    return 'paragraph'
  }
  if (type === 'blockquote') {
    return 'ld-blockquote'
  }
  if (type === 'header-two') {
    return 'ld-header'
  }
  if (type === 'unordered-list-item') {
    return 'ld-unordered-list'
  }
  if (type === 'ordered-list-item') {
    return 'ld-ordered-list'
  }
  if (type === 'quote') {
    return 'ld-quote'
  }
}

export function getPluginTypeForBlock (editorState, block) {
  /* gets the parent blocks plugin type as the node may not yet be in the dom */
  const selectionState = editorState.getSelection()
  const contentState = editorState.getCurrentContent()

  let prevBlock = contentState.getBlockBefore(block.getKey())
  const offsetKey = DraftOffsetKey.encode(prevBlock.getKey(), 0, 0)
  let node = document.querySelector(`[data-offset-key="${offsetKey}"]`)
  if (node === undefined || node === null) { return null }
  let pluginNode = node.querySelector('div[data-plugin-type]')
  if (pluginNode === undefined || pluginNode === null) { return null }
  let pluginType = pluginNode.getAttribute('data-plugin-type')
  if (pluginType === undefined || pluginType === null) { return null }
  return pluginType
}
