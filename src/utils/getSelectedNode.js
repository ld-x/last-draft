/*
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

function getSelectedNode () {
  if (document.selection) { return document.selection.createRange().parentElement() }
  let selection = window.getSelection()
  if (selection.rangeCount > 0) {
    return selection.getRangeAt(0).startContainer.parentNode
  }
}

export default getSelectedNode
