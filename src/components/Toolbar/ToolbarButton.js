/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import React, {Component} from 'react'
import Separator from './Separator'
const styled = require('styled-components').default

export default class extends Component {
  toggleAction (action) {
    if (action.toggle) {
      action.toggle(!action.active)
    }
  }

  render () {
    const Icon = this.props.item.icon
    const { item, active } = this.props

    if (item.type === 'separator') {
      return <Separator />
    }

    return (
      <ToolbarButtonWrapper active={active} className='ld-toolbar-button-wrapper'>
        <ToolbarButton
          className='ld-toolbar-button'
          onClick={() => this.toggleAction(this.props)}
          type='button'
        >
          <Icon />
        </ToolbarButton>
      </ToolbarButtonWrapper>
    )
  }
}

const ToolbarButtonWrapper = styled.li`
  display: inline-block;
  margin: 0 !important;
  color: ${props => props.active ? '#9d1d20' : '#ccc'};
  &:hover {
    color: #fff;
  }
  &:aci {
    color: #fff;
  }
`

const ToolbarButton = styled.button`
  padding: 0;
  color: inherit;
  cursor: pointer;
  border: 0;
  height: 40px;
  width: 40px;
  line-height: 1;
  background: transparent;
`
