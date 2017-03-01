/*
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import React, {Component} from 'react'
import styled from 'styled-components'
import {EditorState, Modifier, SelectionState, getVisibleSelectionRect} from 'draft-js'
import Autocomplete from './Autocomplete'

export function getSelectionCoords (editor, toolbarHeight = 34, maxOffsetLeft = 250) {
  const editorBounds = editor.getBoundingClientRect()
  const rangeBounds = getVisibleSelectionRect(window)
  if (!rangeBounds) { return null }
  const rangeWidth = rangeBounds.right - rangeBounds.left

  let offsetLeft = (rangeBounds.left - editorBounds.left) + (rangeWidth / 2)
  if (offsetLeft < maxOffsetLeft) { offsetLeft = maxOffsetLeft }
  const offsetTop = rangeBounds.top - editorBounds.top - toolbarHeight
  const offsetBottom = editorBounds.bottom - rangeBounds.top
  const rangeLeft = rangeBounds.left
  return { offsetLeft, offsetTop, offsetBottom, rangeLeft }
}

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      position: {},
      rangeLeft: 0
    }
  }

  static get defaultProps () {
    return {
      mentionUsers: [{ name: '', link: '', avatar: '' }],
      mentionUsersAsync: undefined
    }
  }

  componentDidUpdate () {
    this.setBarPosition()
  }

  setMention (user) {
    const {editorState, onChange, mentionSearchValue} = this.props

    if (user === null || user === undefined) {
      this.props.closeMentionList()
      return
    }

    let selectionState = editorState.getSelection()
    let contentState = editorState.getCurrentContent()
    let block = contentState.getBlockForKey(selectionState.getStartKey())
    let start = selectionState.getEndOffset() - (mentionSearchValue.length + 1)
    let end = selectionState.getEndOffset()

    const contentStateWithEntity = contentState.createEntity('MENTION', 'IMMUTABLE', {
      url: user.link,
      avatar: user.avatar,
      name: user.name,
      className: 'ld-mention'
    })
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()

    const targetRange = new SelectionState({
      anchorKey: block.getKey(),
      anchorOffset: start,
      focusKey: block.getKey(),
      focusOffset: end
    })

    let updatedState = Modifier.replaceText(
      editorState.getCurrentContent(),
      targetRange,
      user.name,
      editorState.getCurrentInlineStyle(),
      entityKey
    )
    onChange(EditorState.push(editorState, updatedState, 'insert-characters'))
    this.props.closeMentionList()
  }

  setBarPosition () {
    const editorWrapper = this.props.editorWrapper
    const selectionCoords = getSelectionCoords(editorWrapper, 0, 0)
    const hasFocus = this.props.editorState.getSelection().getHasFocus()

    if (!selectionCoords) { return null }
    if (!hasFocus) { return null }

    if (selectionCoords &&
        !this.state.position ||
        this.state.position.top !== selectionCoords.offsetTop ||
        this.state.position.left !== selectionCoords.offsetLeft) {
      this.setState({
        rangeLeft: selectionCoords.rangeLeft,
        position: {
          top: selectionCoords.offsetTop,
          left: selectionCoords.offsetLeft
        }
      })
    }
  }

  render () {
    const { position } = this.state
    const { mentionSearchValue } = this.props
    let showMentions = mentionSearchValue.length > 0

    if (this.props.readOnly) { return null }

    let menuStyle = { display: showMentions ? 'block' : 'none' }
    if (position !== undefined) {
      menuStyle = Object.assign(position, menuStyle)
      menuStyle = {...menuStyle}
    }

    return (
      <MentionListWrapper style={menuStyle} className='ld-mention-list-wrapper'>
        <div style={{position: 'absolute', bottom: '0'}}>
          <MentionList className='ld-mention-list'>
            {
              showMentions &&
                <div style={{whiteSpace: 'nowrap'}}>
                  <Autocomplete
                    searchValue={this.props.mentionSearchValue}
                    mentionUsers={this.props.mentionUsers}
                    mentionUsersAsync={this.props.mentionUsersAsync}
                    searchKey='name'
                    closeMentionList={::this.props.closeMentionList}
                    onClick={::this.setMention} />
                </div>
            }
          </MentionList>
        </div>
      </MentionListWrapper>
    )
  }
}

const MentionListWrapper = styled.div`
  font-family: Open Sans, sans-serif;
  letter-spacing: -0.037rem;
  line-height: 1.75rem;
  height: 0;
  position: relative;
  z-index: 10;
  transform: translateY(8px);
`

const MentionList = styled.div`
  position: relative;
  transition: background-color 0.2s ease-in-out;
`
