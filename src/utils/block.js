import { Map } from 'immutable'
import { DefaultDraftBlockRenderMap } from 'draft-js'

export const blockRenderMap = Map({
  ['caption']: {
    element: 'cite',
  },
  ['pullquote']: {
    element: 'span',
  },
  ['alignment-left']: {
    element: 'div',
  },
  ['alignment-center']: {
    element: 'div',
  },
  ['alignment-right']: {
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
  if (type === 'header-two') {
    return 'header'
  }
  if (type === 'unordered-list-item') {
    return 'unordered-list'
  }
  if (type === 'ordered-list-item') {
    return 'ordered-list'
  }
}
