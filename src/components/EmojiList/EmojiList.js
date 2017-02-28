/*
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import React, {Component} from 'react'
import {EditorState, Modifier, Entity, SelectionState} from 'draft-js'
import styled from 'styled-components'
import {getSelectionCoords} from '../../utils/selection'
import Search from './Search'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      position: {},
      rangeLeft: 0
    }
  }

  componentDidUpdate () {
    this.setBarPosition()
  }

  setEmoji (emoji) {
    const {editorState, onChange, emojiSearchValue} = this.props

    if (emoji === null || emoji === undefined) {
      this.props.closeEmojiList()
      return
    }

    let selectionState = editorState.getSelection()
    let contentState = editorState.getCurrentContent()
    let block = contentState.getBlockForKey(selectionState.getStartKey())

    let start = selectionState.getEndOffset() - (emojiSearchValue.length + 1)
    let end = selectionState.getEndOffset()

    const targetRange = new SelectionState({
      anchorKey: block.getKey(),
      anchorOffset: start,
      focusKey: block.getKey(),
      focusOffset: end
    })

    let updatedState = Modifier.replaceText(
      editorState.getCurrentContent(),
      targetRange,
      emoji.character,
      editorState.getCurrentInlineStyle()
    )
    onChange(EditorState.push(editorState, updatedState, 'insert-characters'))
    this.props.closeEmojiList()
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
    const { emojiSearchValue } = this.props
    let showEmojis = emojiSearchValue.length > 0

    if (this.props.readOnly) { return null }

    let menuStyle = { display: showEmojis ? 'block' : 'none' }
    if (position !== undefined) {
      menuStyle = Object.assign(position, menuStyle)
      menuStyle = {...menuStyle}
    }

    return (
      <EmojiListWrapper style={menuStyle} className='ld-emoji-list-wrapper'>
        <div style={{position: 'absolute', bottom: '0'}}>
          <EmojiList className='ld-emoji-list'>
            {
              showEmojis &&
                <div style={{whiteSpace: 'nowrap'}}>
                  <Search
                    searchValue={this.props.emojiSearchValue}
                    searchKey='name'
                    closeEmojiList={::this.props.closeEmojiList}
                    onClick={::this.setEmoji} />
                </div>
            }
          </EmojiList>
        </div>
      </EmojiListWrapper>
    )
  }
}

const EmojiListWrapper = styled.div`
  font-family: Open Sans, sans-serif;
  letter-spacing: -0.037rem;
  line-height: 1.75rem;
  height: 0;
  position: relative;
  z-index: 10;
  transform: translateY(8px);
`

const EmojiList = styled.div`
  position: relative;
  transition: background-color 0.2s ease-in-out;
`
