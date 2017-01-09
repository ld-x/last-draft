import React, {Component} from 'react'
import {hasEntity, setEntity, getCurrentEntity} from '../../utils/entity'
import Link from './Link'

export default class extends Component {
  render () {
    const {editorState, onChange} = this.props

    const se = data => setEntity('LINK', data, editorState, onChange)
    let entityData = {}
    let entity = null
    if (hasEntity('LINK', editorState)) {
      entity = getCurrentEntity(editorState)
      if (entity) { entityData = entity.getData() }
    }

    return (
      <Link
        editorState={editorState}
        setEntity={se}
        onChange={onChange}
        removeEntity={::this.props.removeEntity}
        setError={::this.props.setError}
        cancelError={::this.props.cancelError}
        cancelEntity={::this.props.cancelEntity}
        entity={entity}
        {...entityData}
        />
    )
  }
}
