import React, { PropTypes } from 'react'
import { Entity } from 'draft-js'

import { Entity as E } from '../../util/constants'

export const findLinkEntities = (contentBlock, callback) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity()
      return (
        entityKey !== null &&
        Entity.get(entityKey).getType() === E.LINK
      )
    },
    callback
  )
}

const Link = (props) => {
  const { url } = Entity.get(props.entityKey).getData()
  console.log(url)
  return (
    <a className="rte__link"
       href={url}
       target="_blank"
       aria-label={url}>{props.children}</a>
  )
}

export default Link
