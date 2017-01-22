/*
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import React from 'react'
import { EditorBlock } from 'draft-js'
import styled from 'styled-components'

const updateDataOfBlock = (editorState, block, newData) => {
  const contentState = editorState.getCurrentContent()
  const newBlock = block.merge({ data: newData })
  const newContentState = contentState.merge({
    blockMap: contentState.getBlockMap().set(block.getKey(), newBlock)
  })
  return EditorState.push(editorState, newContentState, 'change-block-type')
}

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.updateData = ::this.updateData
  }

  updateData() {
    const { block, blockProps } = this.props;

    const { onChange, editorState } = blockProps
    const data = block.getData()
    const checked = (data.has('checked') && data.get('checked') === true)
    const newData = data.set('checked', !checked)
    onChange(updateDataOfBlock(editorState, block, newData))
  }

  render() {
    const data = this.props.block.getData()
    const checked = data.get('checked') === true
    return (
      <TodoWrapper checked={checked}>
        <TodoInput type='checkbox' checked={checked} onChange={this.updateData} />
        <TodoBlock>
          <EditorBlock {...this.props} />
        </TodoBlock>
      </TodoWrapper>
    )
  }
}

const TodoWrapper = styled.div`
  position: relative;
  padding: 10px 20px;
  border: 1px solid #f7f7f7;
  margin-bottom: 10px;
  border-radius: 4px;
`

const TodoBlock = styled.div`
  margin-left: 10px;
`

const TodoInput = styled.input`
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
`
