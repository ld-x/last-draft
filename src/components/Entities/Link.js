/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import React, {Component} from 'react'
import {Entity} from 'draft-js'
import linkifyIt from 'linkify-it'
import tlds from 'tlds'
const styled = require('styled-components').default

const linkify = linkifyIt()
linkify.tlds(tlds)

export default class extends Component {
  render () {
    let href = ''
    let target = '_self'

    const {decoratedText} = this.props
    if (decoratedText !== undefined) {
      const links = linkify.match(decoratedText)
      href = links && links[0] ? links[0].url : ''
    } else {
      const data = Entity.get(this.props.entityKey).getData()
      href = data.url
      href = data.target
    }

    return (
      <Link href={href} title={href} target={target} className='ld-link'>
        {this.props.children}
      </Link>
    )
  }
}

const Link = styled.a`
  color: #3192e7;
  text-decoration: none;
  cursor: pointer;
`
