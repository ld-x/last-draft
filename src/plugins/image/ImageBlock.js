/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import React, {Component} from 'react'
import styled from 'styled-components'
import BlockContent from './BlockContent'
import BlockInput from './BlockInput'
import Block from './Block'
import icons from '../../components/Icons/'

export default class ImageBlock extends Component {
  static get defaultProps () {
    return {
      showImageAttributes: false
    }
  }

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

  handleAltChange (event) {
    event.stopPropagation()
    this.props.container.updateData({alt: event.target.value})
  }

  handleTitleChange (event) {
    event.stopPropagation()
    this.props.container.updateData({title: event.target.value})
  }

  render () {
    return (
      <Block {...this.props} actions={this.actions}>
        <BlockContent>
          <Image
            src={this.props.data.src}
            srcSet={this.props.data.srcSet}
            alt={this.props.data.alt}
            title={this.props.data.title}
            className='ld-image-block' />
        </BlockContent>

        <BlockInput
          placeholder='Caption'
          value={this.props.data.caption}
          onChange={::this.handleCaptionChange} />

        {
          this.props.showImageAttributes &&
            <InputWrap>
              <BlockInput
                placeholder='Title'
                value={this.props.data.title}
                onChange={::this.handleTitleChange} />
              <BlockInput
                placeholder='Alt'
                value={this.props.data.alt}
                onChange={::this.handleAltChange} />
            </InputWrap>
        }
      </Block>
    )
  }
  }

const Image = styled.img`
  display: inline-block;
  maxWidth: 100%;
  verticalAlign: middle;
`

const InputWrap = styled.div`
  display: flex;
`
