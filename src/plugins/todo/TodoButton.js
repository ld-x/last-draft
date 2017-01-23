/*
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import React, {Component} from 'react'
import insertDataBlock from './insertDataBlock'

export default class extends Component {
  onClick (e) {
    e.preventDefault()
    const { editorState } = this.props
    const data = {type: 'todo'}
    this.props.onChange(insertDataBlock(editorState, data))
  }

  render () {
    return (
      <svg fill='currentColor' height='24' viewBox='0 0 24 24' width='24' onClick={::this.onClick} className='ld-button-todo'>
        <path d='M14 10H2v2h12v-2zm0-4H2v2h12V6zM2 16h8v-2H2v2zm19.5-4.5L23 13l-6.99 7-4.51-4.5L13 14l3.01 3 5.49-5.5z' />
      </svg>
    )
  }
}
