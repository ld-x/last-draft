/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import React, {Component} from 'react'
import BlockActions from './BlockActions'
import styled from 'styled-components'

export default class extends Component {
  handleDisplayChange (newValue) {
    this.props.container.updateData({display: newValue})
  }

  render () {
    return (
      <BlockWrapper className='ld-block-wrapper'>
        <Block className='ld-block'>
          {this.props.actions && <BlockActions items={this.props.actions} />}
          {this.props.children}
        </Block>
      </BlockWrapper>
    )
  }
}

const BlockWrapper = styled.div`
  padding: 2px;
  margin: -2px;
  position: relative;
  border: solid 1px #ddd;
`

const Block = styled.div`
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
`
