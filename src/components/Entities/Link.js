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
    const {entityKey, decoratedText} = this.props

    if (entityKey) {
      const data = Entity.get(entityKey).getData()
      /* Mentions */
      if (data.type === 'mention') {
        return (
          <Mention href={data.url} title={data.name} className='ld-mention'>
            {this.props.children}
          </Mention>
        )
      }
      /* Links */
      return (
        <Link href={data.url} title={data.url} target='_self' className='ld-link'>
          {this.props.children}
        </Link>
      )
    }

    if (!this.props.entityKey) {
      /* linkify links */
      const links = linkify.match(decoratedText)
      let href = links && links[0] ? links[0].url : ''
      return (
        <Link href={href} title={href} target='_self' className='ld-link'>
          {this.props.children}
        </Link>
      )
    }

    return null
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
