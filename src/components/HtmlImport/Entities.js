import React from 'react'
import { Entity } from 'draft-js'

export const Link = (props) => {
  const {url} = Entity.get(props.entityKey).getData()
  return (
    <a href={url}>
      {props.children}
    </a>
  )
}

export function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity()
      return (
        entityKey !== null &&
        Entity.get(entityKey).getType() === 'LINK'
      );
    },
    callback
  )
}
export function findImageEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'IMAGE'
      );
    },
    callback
  );
}

export const Image = (props) => {
  const { height, src, width } = props.contentState.getEntity(props.entityKey).getData()

  return (
    <img src={src} height={height} width={width} />
  );
};
