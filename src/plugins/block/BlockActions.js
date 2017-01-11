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
  overflow: auto;
  padding: 8px;
`

const BlockActions = styled.ul`
  color: #999;
  float: right;
  list-style: none;
  margin: 0;
  padding: 0;
`

const BlockAction = styled.li`
  display: inline-block;
  padding: 0,
  padding-left: 8px;
  padding-right: 8px;
  line-height: 40px;
  cursor: pointer;
  text-align: center;
  font-size: 0;

  &:hover {
    color: '#000',
  }
`
