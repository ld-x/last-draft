/*
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import React, {Component} from 'react'
import Mention from './Mention'
import {getSelectionCoords} from '../../utils/selection'
import styled from 'styled-components'

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
                <Mention
                  {...this.props}
                  closeMentionList={::this.props.closeMentionList} />
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
