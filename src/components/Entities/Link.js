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
import styled from 'styled-components'

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
    }

    const {type, url, name, avatar} = Entity.get(this.props.entityKey).getData()
    if (type === 'mention') {
      return (
        <Mention href={url} title={name} className='ld-mention'>
          {this.props.children}
        </Mention>
      )
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

const Mention = styled.a`
  background: rgb(236, 236, 234);
  color: #000;
  text-decoration: none;
  cursor: pointer;
`
