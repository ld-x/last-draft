/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import {getVisibleSelectionRect} from 'draft-js'
import DraftOffsetKey from 'draft-js/lib/DraftOffsetKey'

export function getSelectedBlockElement (editorState) {
  const selectionState = editorState.getSelection()
  const contentState = editorState.getCurrentContent()
  const block = contentState.getBlockForKey(selectionState.getStartKey())

  const offsetKey = DraftOffsetKey.encode(block.getKey(), 0, 0)

  let node = document.querySelectorAll(`[data-offset-key="${offsetKey}"]`)[0]

  if (node.getAttribute && node.getAttribute('data-block') === 'true') {
    return node
  } else {
    return null
  }
}

export function getSelectionCoords (editor, toolbarHeight = 34, maxOffsetLeft = 250) {
  const editorBounds = editor.getBoundingClientRect()
  const rangeBounds = getVisibleSelectionRect(window)
  if (!rangeBounds) { return null }
  const rangeWidth = rangeBounds.right - rangeBounds.left

  let offsetLeft = (rangeBounds.left - editorBounds.left) + (rangeWidth / 2)
  if (offsetLeft < maxOffsetLeft) { offsetLeft = maxOffsetLeft }
  const offsetTop = rangeBounds.top - editorBounds.top - toolbarHeight
  const offsetBottom = editorBounds.bottom - rangeBounds.top
  const rangeLeft = rangeBounds.left
  return { offsetLeft, offsetTop, offsetBottom, rangeLeft }
}

export function getSelectedNode () {
  if (document.selection) { return document.selection.createRange().parentElement() }
  let selection = window.getSelection()
  if (selection.rangeCount > 0) {
    return selection.getRangeAt(0).startContainer.parentNode
  }
}
