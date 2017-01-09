/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import React, {Component} from 'react'
import BlockInput from '../block/BlockInput'
import Block from '../block/Block'
import icons from '../../components/Buttons/'
const styled = require('styled-components').default

export default class extends Component {
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
    this.props.container.updateData({caption: event.target.value})
  }

  render () {
    return (
      <Block {...this.props} actions={this.actions}>
        <VideoBlockWrapper className='ld-video-block-wrapper'>
          <VideoBlock src={this.props.data.src}
                  className='ld-video-block'
                  frameBorder='0'
                  allowFullScreen />
        </VideoBlockWrapper>

        <BlockInput
          placeholder='Caption'
          value={this.props.data.caption}
          onChange={::this.handleCaptionChange} />
      </Block>
    )
  }
}

const VideoBlockWrapper = styled.div`
  position: relative;
  width: 90%;
  height: 0;
  padding-bottom: 56.25%;
  margin: 0 auto;
`

const VideoBlock = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
