/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import React, {Component} from 'react'
const styled = require('styled-components').default

export default class extends Component {
  render () {
    return (
      <BlockContent className='ld-block-content'>
        {this.props.children}
      </BlockContent>
    )
  }
}

const BlockContent = styled.div`
  line-height: 100px;
  text-align: center;
  position: relative;
`
