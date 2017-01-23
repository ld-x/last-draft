/*
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import React from 'react'
import styled from 'styled-components'

export default class extends React.Component {
  render() {
    return (
      <TodoWrapper>
        {this.props.children}
      </TodoWrapper>
    )
  }
}

const TodoWrapper = styled.div`
  background: #f5f5f5;
`
