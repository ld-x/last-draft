/*
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import React, {Component} from 'react'

export default class MyCustomBlock extends React.Component {
  render() {
    let block = this.props.children[0].props.children
    if (block !== undefined) {
      if (block.props.blockProps !== undefined) {
        const {plugin} = block.props.blockProps
        if (plugin.wrapper !== undefined) {
          let Wrapper = plugin.wrapper
          return (
            <Wrapper>
              {this.props.children}
            </Wrapper>
          )
        }
      }
    }

    return (
      <div className='ld-plugin-wrapper'>
        {this.props.children}
      </div>
    )
  }
}
