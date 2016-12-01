import React, { PropTypes } from 'react'
import { Entity } from 'draft-js'

import { Entity as E } from '../../util/constants'

export const findImageEntities = (contentBlock, callback) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity()
      console.log(entityKey)
      return (
        entityKey !== null && Entity.get(entityKey).getType() === E.IMAGE
      )
    },
    callback
  )
}

const Image = (props) => {
  const { src } = Entity.get(props.entityKey).getData()
  return (
    <div className="rte-block-image-inner-container">
      <img src={src} height='100' width='100' />
    </div>
  )
}

/*
const Image = (props) => {
  const { src } = Entity.get(props.entityKey).getData()
  return (
    <a className="rte__link" href={src}>{props.children}</a>
  )
}
*/

export default Image
