/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import React, {Component} from 'react'
import styled from 'styled-components'

export default class extends Component {
  handleDrop (e) {
    e.preventDefault()
    e.stopPropagation()
  }

  render () {
    let {value, ...props} = this.props

    return (
      <BlockInputWrapper className='ld-block-input-wrapper'>
        <BlockInput
          className='ld-block-input'
          {...props}
          defaultValue={value}
          type='text'
          onDrop={this.handleDrop} />
      </BlockInputWrapper>
    )
  }
}

const BlockInputWrapper = styled.div`
  padding: 16px;
  position: relative;
  line-height: 1;
`

const BlockInput = styled.input`
  border: 0;
  border-bottom: 1px dashed transparent;
  color: #333;
  display: block;
  padding: 8px 0;
  width: 100%;
  font-size: 14px;
  outline: none;
  &:hover {
    border-color: #999;
  }
  &:focus {
    border-color: #0072de;
    border-style: solid;
  }
`
