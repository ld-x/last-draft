import {Entity} from 'draft-js'

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
