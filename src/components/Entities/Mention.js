/*
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import React, {Component} from "react"
import {Entity} from "draft-js"
import styled from 'styled-components'

export default class Link extends Component {
  render() {
    const {url} = Entity.get(this.props.entityKey).getData()
    return (
      <Mention href={url} title={url}>
        {this.props.children}
      </Mention>
    )
  }
}

const Mention = styled.a`
  color: pink;
  text-decoration: none;
  cursor: pointer;
`
