import { Map } from 'immutable'
import { DefaultDraftBlockRenderMap } from 'draft-js'

export const blockRenderMap = Map({
  ['caption']: {
    element: 'cite',
  },
  ['pullquote']: {
    element: 'cite',
  },
  ['alignment']: {
    element: 'div',
  },
  ['image']: {
    element: 'figure',
  },
  ['break']: {
    element: 'div',
  },
}).merge(DefaultDraftBlockRenderMap)

export function blockStyleFn (contentBlock) {
  const type = contentBlock.getType()
  if (type === 'unstyled') {
    return 'paragraph'
  }
  if (type === 'blockquote') {
    return 'blockquote'
  }
  if (type === 'pullquote') {
    return 'pullquote'
  }
  if (type === 'alignment') {
    return 'alignment'
  }
}

/*
export function blockRendererFn (setEditorState, getEditorState) => (block) => {
  const type = contentBlock.getType()
  if (block.getType() !== 'atomic') { return null }

  const type = block.getData().toObject().type
  let plugin = this.pluginsByType[type] || this.handleBlockNotFound(block)
  if (!plugin) { return null }

  return {
    component: Media,
    editable: false,
    props: {
      plugin: plugin,
      onChange: this.onChange,
      editorState: this.props.editorState,
      setReadOnly: this.setReadOnly
    }
  }
}
*/
