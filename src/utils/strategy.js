/*
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import {extractHashtagsWithIndices} from './hashtag'
import linkifyIt from 'linkify-it'
import tlds from 'tlds'

const linkify = linkifyIt()
linkify.tlds(tlds)

export function createTypeStrategy (type) {
  return (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity()
        return (
          entityKey !== null &&
          contentState.getEntity(entityKey).getType() === type
        )
      },
      callback
    )
  }
}

export function hashtagStrategy (contentBlock, callback) {
  const text = contentBlock.getText()
  const results = extractHashtagsWithIndices(text)

  results.forEach((hashtag) => {
    callback(hashtag.indices[0], hashtag.indices[1])
  })
}

export function linkifyStrategy (contentBlock, callback) {
  const links = linkify.match(contentBlock.get('text'))
  if (typeof links !== 'undefined' && links !== null) {
    for (let i = 0; i < links.length; i += 1) {
      if (links[i].schema !== '') {
        callback(links[i].index, links[i].lastIndex)
      }
    }
  }
}
