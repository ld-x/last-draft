import Immutable from 'immutable'
import {genKey, EditorState, ContentBlock, Modifier, BlockMapBuilder} from 'draft-js'

const { List, Map } = Immutable

function insertDataBlock(editorState, data, selection) {
  const contentState = editorState.getCurrentContent();
  const selectionState =  selection !== undefined ? selection : editorState.getSelection()
  const afterRemoval = Modifier.removeRange(contentState, selectionState,'backward')
  const targetSelection = afterRemoval.getSelectionAfter()
  const afterSplit = Modifier.splitBlock(afterRemoval, targetSelection)
  const insertionTarget = afterSplit.getSelectionAfter()
  const asAtomicBlock = Modifier.setBlockType(afterSplit, insertionTarget,'atomic')

  const block = new ContentBlock({
    key: genKey(),
    type: 'atomic',
    text: '',
    characterList: List(),
    data: new Map(data)
  })

  const fragmentArray = [
    block,
    new ContentBlock({
      key: genKey(),
      type: 'unstyled',
      text: '',
      characterList: List()
    })
  ]

  const fragment = BlockMapBuilder.createFromArray(fragmentArray)

  const withAtomicBlock = Modifier.replaceWithFragment(
    asAtomicBlock,
    insertionTarget,
    fragment
  )

  const newContent = withAtomicBlock.merge({
    selectionBefore: selectionState,
    selectionAfter: withAtomicBlock.getSelectionAfter().set('hasFocus', true)
  })

  return EditorState.push(editorState, newContent, 'insert-fragment')
}

export default insertDataBlock
