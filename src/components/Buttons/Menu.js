/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import React from 'react'
import styled from 'styled-components'

export default class extends React.Component {
  render () {
    return (
      <MenuIcon fill="currentColor" height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
      </MenuIcon>
    )
  }
}

const MenuIcon = styled.svg`
  position: absolute;
  transform: scale(0.6);
  top: 0;
  left: 0;
`
