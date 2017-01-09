/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import { Map } from 'immutable'
import { DefaultDraftBlockRenderMap } from 'draft-js'

export const blockRenderMap = Map({
  ['caption']: {
    element: 'cite',
  },
  ['quote']: {
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
    return 'ld-blockquote'
  }
  if (type === 'quote') {
    return 'ld-quote'
  }
  if (type === 'header-two') {
    return 'ld-header'
  }
  if (type === 'unordered-list-item') {
    return 'ld-unordered-list'
  }
  if (type === 'ordered-list-item') {
    return 'ld-ordered-list'
  }
}
