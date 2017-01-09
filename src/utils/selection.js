import {getVisibleSelectionRect} from 'draft-js'

export function getSelectedBlockElement () {
  const selection = window.getSelection()
  if (selection.rangeCount === 0) { return null }
  let node = selection.getRangeAt(0).startContainer

  do {
    if (node.getAttribute && node.getAttribute('data-block') === 'true') {
      return node
    }
    node = node.parentNode
  } while (node != null)
}

export function getSelectionCoords (editor, toolbar) {
  const editorBounds = editor.getBoundingClientRect()
  const rangeBounds = getVisibleSelectionRect(window)

  if (!rangeBounds || !toolbar) { return null }

  const rangeWidth = rangeBounds.right - rangeBounds.left
  const toolbarHeight = toolbar.offsetHeight
  let offsetLeft = (rangeBounds.left - editorBounds.left) + (rangeWidth / 2)
  if (offsetLeft < 130) { offsetLeft = 130 }
  const offsetTop = rangeBounds.top - editorBounds.top - (toolbarHeight)
  const offsetBottom = editorBounds.bottom - rangeBounds.top
  return { offsetLeft, offsetTop, offsetBottom }
}
