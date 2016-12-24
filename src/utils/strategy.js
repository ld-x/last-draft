import {Entity} from 'draft-js'
import {extractHashtagsWithIndices} from './hashtag'

export function createTypeStrategy (type) {
  return (contentBlock, callback) => {
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity()
        return (
          entityKey !== null &&
          Entity.get(entityKey).getType() === type
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
