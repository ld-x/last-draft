import { Block } from './constants'

const BASE_BLOCK_CLASS = 'rte-block'

/* Get custom classnames for each of the different block types supported. */

export default (block) => {
  switch (block.getType()) {
    case Block.BLOCKQUOTE:
      return `${BASE_BLOCK_CLASS} ${BASE_BLOCK_CLASS}-quote rte-blockquote`
    case Block.UNSTYLED:
      return `${BASE_BLOCK_CLASS} ${BASE_BLOCK_CLASS}-paragraph`
    case Block.CAPTION:
      return `${BASE_BLOCK_CLASS} ${BASE_BLOCK_CLASS}-caption`
    case Block.BLOCKQUOTE_CAPTION: {
      const cls = `${BASE_BLOCK_CLASS} ${BASE_BLOCK_CLASS}-quote`
      return `${cls} rte-blockquote ${BASE_BLOCK_CLASS}-quote-caption`
    }
    default: return BASE_BLOCK_CLASS
  }
}
