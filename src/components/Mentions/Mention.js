/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import Search from './Search'
import {EditorState, Modifier, Entity, SelectionState} from 'draft-js'

export default class Link extends Component {
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
      Entity.create('MENTION', 'IMMUTABLE', {
        url: user.link,
        avatar: user.avatar,
        name: user.name,
        className: 'ld-mention'
      })
    )
    onChange(
      EditorState.push(editorState, updatedState, 'insert-characters')
    )
    this.props.closeMentionList()
  }

  handleItemClick (item) {
    this.setMention(item)
  }

  render () {
    const {theme} = this.props

    return (
      <div style={{whiteSpace: 'nowrap'}}>
        <Search
          searchValue={this.props.mentionSearchValue}
          mentionUsers={this.props.mentionUsers}
          mentionUsersAsync={this.props.mentionUsersAsync}
          searchKey='name'
          closeMentionList={::this.props.closeMentionList}
          onClick={::this.handleItemClick} />
      </div>
    )
  }
}
