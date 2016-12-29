import React, {Component} from 'react'
import {EditorState, SelectionState, Modifier} from 'draft-js'
const styled = require('styled-components').default

export default class extends Component {
  constructor (props) {
    super(props)
    this.remove = ::this.remove
    this.updateData = ::this.updateData
    this.onChange = this.props.blockProps.onChange
  }

  remove () {
    const {editorState} = this.props.blockProps
    const selection = editorState.getSelection()
    const content = editorState.getCurrentContent()
    const keyAfter = content.getKeyAfter(this.props.block.key)
    const blockMap = content.getBlockMap().delete(this.props.block.key)
    const withoutAtomicBlock = content.merge({
      blockMap, selectionAfter: selection
    })
    const newState = EditorState.push(
      editorState, withoutAtomicBlock, 'remove-range'
    )
    const newSelection = new SelectionState({
      anchorKey: keyAfter,
      anchorOffset: 0,
      focusKey: keyAfter,
      focusOffset: this.props.block.getLength()
    })
    const newEditorState = EditorState.forceSelection(newState, newSelection)
    this.onChange(newEditorState)
  }

  updateData (data) {
    const {editorState} = this.props.blockProps
    const content = editorState.getCurrentContent()
    const selection = new SelectionState({
      anchorKey: this.props.block.key,
      anchorOffset: 0,
      focusKey: this.props.block.key,
      focusOffset: this.props.block.getLength()
    })

    const newContentState = Modifier.mergeBlockData(content, selection, data)
    const newEditorState = EditorState.push(editorState, newContentState)
    this.onChange(newEditorState)
  }

  handleFocus () {
    const {setReadOnly} = this.props.blockProps
    setReadOnly(true)
  }

  handleBlur () {
    const {setReadOnly} = this.props.blockProps
    setReadOnly(false)
  }

  render () {
    const data = this.props.block.getData().toJS()
    const {plugin} = this.props.blockProps
    const Block = plugin.block
    return (
      <Media onBlur={::this.handleBlur} onFocus={::this.handleFocus}>
        <Block data={data} container={this} blockProps={this.props.blockProps} />
      </Media>
    )
  }
}

const Media = styled.div`
`
