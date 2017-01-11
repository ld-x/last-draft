/*
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import React, { Component } from 'react';
import styled from 'styled-components'

export default class extends Component {
  render() {
    const {
      decoratedText,
      dir,
      entityKey,
      getEditorState,
      offsetKey,
      setEditorState,
      ...otherProps
    } = this.props
    return (
      <Hashtag {...otherProps} className='hashtag ld-hashtag' />
    )
  }
}

const Hashtag = styled.span`
  color: #5e93c5;
`
