import { Map } from 'immutable'
import { DefaultDraftBlockRenderMap } from 'draft-js'

const RenderMap = Map({
  ['caption']: {
    element: 'cite',
  },
  ['pullquote']: {
    element: 'span',
  },
  ['image']: {
    element: 'figure',
  },
  ['break']: {
    element: 'div',
  },
}).merge(DefaultDraftBlockRenderMap)


export default RenderMap
