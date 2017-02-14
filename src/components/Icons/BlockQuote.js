/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import React from 'react'

export default class extends React.Component {
  render () {
    return (
      <svg height='24' viewBox='0 0 24 24' width='24' fill='currentColor' className='ld-button-quote'>
        <defs><path d='M0 0h24v24H0V0z' id='a' /></defs>
        <clipPath id='b'><use overflow='visible' /></clipPath>
        <path d='M4 9h16v2H4zm0 4h10v2H4z' />
      </svg>
    )
  }
}
