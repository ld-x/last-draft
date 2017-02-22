/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import React, {Component} from 'react'
import {Entity} from 'draft-js'
import styled from 'styled-components'

export default class extends Component {
  render () {
    const {entityKey} = this.props
    if (entityKey) {
      const data = Entity.get(entityKey).getData()
      return (
        <Mention href={data.url} title={data.name} className='ld-mention'>
          {this.props.children}
        </Mention>
      )
    }
    return null
  }
}

const Mention = styled.a`
  background: rgb(236, 236, 234);
  color: #000;
  text-decoration: none;
  cursor: pointer;
`
