/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import React, {Component} from 'react'
import Block from './Block'
import styled, { keyframes } from 'styled-components'

export default class ImageBlock extends Component {
  render () {
    return (
      <Block {...this.props} actions={this.actions}>
        <Spinner height='36' viewBox='0 0 36 36' width='36' className='ld-spinner'>
          <path d='M28.4,6.6C25.7,4.3,22.3,3,18.5,3C9.9,3,3,9.9,3,18.5S9.9,34,18.5,34c4.3,0,8.1-1.7,11-4.5l-1.8-1.8 c-2.3,2.3-5.6,3.8-9.1,3.8c-7.1,0-13-5.8-13-13s5.8-13,13-13c3.1,0,5.9,1.1,8.1,2.9l-4.5,4.5h8H33H33V2L28.4,6.6z' fill='currentColor' />
        </Spinner>
        <PlaceholderImageWrapper>
          <PlaceholderImage src={this.props.data.src} alt='' className='ld-image-placeholder-block' />
        </PlaceholderImageWrapper>
      </Block>
    )
  }
}

const rotate360 = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const Spinner = styled.svg`
  animation: ${rotate360} 0.8s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999999999;
  width: 36px;
  height: 36px;
`
const PlaceholderImage = styled.img`
  display: inline-block;
  max-width: 100%;
  vertical-align: middle;
  opacity: 0.25;
`

const PlaceholderImageWrapper = styled.div`
  line-height: 100px;
  text-align: center;
  position: relative;
`
