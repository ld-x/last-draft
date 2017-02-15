/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import React, {Component, PropTypes} from 'react'
import styled from 'styled-components'

export default class extends Component {
  static propTypes = {
    items: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        key: PropTypes.string.isRequired,
        icon: PropTypes.func.isRequired,
        action: PropTypes.func.isRequired
      })
    )
  }

  renderItem (item) {
    return (
      <BlockAction className='ld-block-action' onClick={item.action} key={item.key}>
        <item.icon />
      </BlockAction>
    )
  }

  render () {
    return (
      <BlockActionsWrapper className='ld-block-actions-wrapper'>
        <BlockActions className='ld-block-actions'>
          {this.props.items.map(this.renderItem)}
        </BlockActions>
      </BlockActionsWrapper>
    )
  }
}

const BlockActionsWrapper = styled.div`
  padding-top: 0.5rem;
  padding-right: 1rem;
  padding-bottom: 0.5rem;
`

const BlockActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const BlockAction = styled.div`
  flex: 1;
  cursor: pointer;
  color: #ddd;
  &:hover {
    color: #333;
  }
`
