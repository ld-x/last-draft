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
      <Separator className='ld-seperator' />
    )
  }
}

const Separator = styled.li`
  display: inline-block;
  color: #ccc;
  border-right: 1px solid #333;
  height: 20px;
  margin: 0 8px;
`
