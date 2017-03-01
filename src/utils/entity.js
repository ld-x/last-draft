/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import {RichUtils, EditorState} from 'draft-js'

export function hasEntity (entityType, editorState) {
  const entity = getCurrentEntity(editorState)
  if (entity && entity.getType() === entityType) {
    return true
  }
  return false
}

export function setEntity (entityType, data, editorState, onChange) {
  const contentState = editorState.getCurrentContent()
  const contentStateWithEntity = contentState.createEntity(entityType, 'MUTABLE', data)
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey()

  const newState = RichUtils.toggleLink(
    editorState,
    editorState.getSelection(),
    entityKey
  )
  const selectionState = EditorState.forceSelection(
    newState, editorState.getSelection()
  )

  onChange(selectionState)
}

export function getCurrentEntityKey (editorState) {
  const selection = editorState.getSelection()
  const anchorKey = selection.getAnchorKey()
  const contentState = editorState.getCurrentContent()
  const anchorBlock = contentState.getBlockForKey(anchorKey)
  const offset = selection.anchorOffset
  const index = selection.isBackward ? offset - 1 : offset
  return anchorBlock.getEntityAt(index)
}

export function getCurrentEntity (editorState) {
  const contentState = editorState.getCurrentContent()
  const entityKey = getCurrentEntityKey(editorState)
  if (entityKey) {
    return contentState.getEntity(entityKey)
  }
  return null
}
