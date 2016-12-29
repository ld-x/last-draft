import React, {Component} from 'react'
import {RichUtils, Entity} from 'draft-js'
import {hasEntity, setEntity, getCurrentEntity} from '../../utils/entity'
const styled = require('styled-components').default
import Link from './Link'

export default class extends Component {
  removeEntity () {
    const {editorState, cancelEntity, onChange} = this.props
    const selection = editorState.getSelection()
    if (!selection.isCollapsed()) {
      onChange(RichUtils.toggleLink(editorState, selection, null))
    }
    cancelEntity()
  }

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
        cancelEntity={::this.props.cancelEntity}
        removeEntity={::this.removeEntity}
        setError={::this.props.setError}
        cancelError={::this.props.cancelError}
        entity={entity}
        {...entityData}
        />
    )
  }
}
