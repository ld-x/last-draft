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

export function getSelectionCoords (editor, toolbar) {
  const editorBounds = editor.getBoundingClientRect()
  const rangeBounds = getVisibleSelectionRect(window)

  if (!rangeBounds || !toolbar) { return null }

  const rangeWidth = rangeBounds.right - rangeBounds.left
  const toolbarHeight = toolbar.offsetHeight
  let offsetLeft = (rangeBounds.left - editorBounds.left) + (rangeWidth / 2)
  if (offsetLeft < 220) { offsetLeft = 220 }
  const offsetTop = rangeBounds.top - editorBounds.top - (toolbarHeight)
  const offsetBottom = editorBounds.bottom - rangeBounds.top
  const rangeLeft = rangeBounds.left
  return { offsetLeft, offsetTop, offsetBottom, rangeLeft }
}
