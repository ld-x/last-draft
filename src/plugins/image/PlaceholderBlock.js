/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import React, {Component} from 'react'
import BlockContent from '../block/BlockContent'
import BlockInput from '../block/BlockInput'
import Block from '../block/Block'
import icons from '../../components/Buttons/'
import styled, { keyframes } from 'styled-components'

export default class ImageBlock extends Component {
  constructor (props) {
    super(props)

    this.actions = [
      {
        key: 'delete',
        icon: icons.CloseIcon,
        action: this.props.container.remove
      }
    ]
  }

  handleCaptionChange (event) {
    event.stopPropagation()
    this.props.container.updateData({caption: event.target.value})
  }

  render () {
    let ImageBlockStyle = {
      display: 'inline-block',
      maxWidth: '100%',
      verticalAlign: 'middle',
      opacity: 0.3
    }

    return (
      <Block {...this.props} actions={this.actions}>
        <Loader height='36' viewBox='0 0 36 36' width='36' className='ld-placeholder-loader'>
          <path d='M28.4,6.6C25.7,4.3,22.3,3,18.5,3C9.9,3,3,9.9,3,18.5S9.9,34,18.5,34c4.3,0,8.1-1.7,11-4.5l-1.8-1.8 c-2.3,2.3-5.6,3.8-9.1,3.8c-7.1,0-13-5.8-13-13s5.8-13,13-13c3.1,0,5.9,1.1,8.1,2.9l-4.5,4.5h8H33H33V2L28.4,6.6z' fill='currentColor' />
        </Loader>

        <BlockContent>
          <img style={ImageBlockStyle} src={this.props.data.src} alt='' className='ld-image-placeholder-block' />
        </BlockContent>

        <BlockInput
          placeholder='Caption'
          value={this.props.data.caption}
          onChange={::this.handleCaptionChange} />
      </Block>
    )
  }
}

const rotate360 = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const Loader = styled.svg`
  animation: ${rotate360} 0.8s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  width: 40px;
  height: 40px;
`
