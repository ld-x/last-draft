/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import React from 'react'
const styled = require('styled-components').default

export default class extends React.Component {
  render () {
    return (
      <CrossIcon width='24' height='24' viewBox='0 0 24 24' className='ld-button-cross'>
        <g fill='currentColor' fillRule='evenodd'>
          <path d='M11 6h2v12h-2z' />
          <path d='M18 11v2H6v-2z' />
        </g>
      </CrossIcon>
    )
  }
}

const CrossIcon = styled.svg`
  position: absolute;
  transform: scale(0.8);
  top: 0;
  left: 0;
`
