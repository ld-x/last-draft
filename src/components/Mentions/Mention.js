/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

 const mentions = [
   {
     name: 'Max Stoiber',
     link: 'https://github.com/mxstbr',
     avatar: 'https://avatars0.githubusercontent.com/u/7525670?v=3&s=400',
   },
   {
     name: 'Nik Graf',
     link: 'https://github.com/nikgraf',
     avatar: 'https://avatars2.githubusercontent.com/u/223045?v=3&s=400',
   },
   {
     name: 'Steven Iseki',
     link: 'https://github.com/steveniseki',
     avatar: 'https://avatars1.githubusercontent.com/u/6695114?v=3&s=400',
   },
 ]

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import Search from './Search'
import {EditorState, Modifier, Entity} from 'draft-js'

export default class Link extends Component {
  setMention (item) {
    const {editorState, onChange} = this.props
    if (item === null || item === undefined) {
      this.props.closeMentionList()
      return
    }

    let contentState = Modifier.insertText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      item,
      editorState.getCurrentInlineStyle(),
      Entity.create('MENTION', 'IMMUTABLE', {url: 'http://g.co'})
    )
    onChange(
      EditorState.push(editorState, contentState, 'insert-characters')
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
          items={mentions}
          searchKey='name'
          closeMentionList={::this.props.closeMentionList}
          onClick={::this.handleItemClick} />
      </div>
    )
  }
}
