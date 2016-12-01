import BlockQuote from './Blocks/BlockQuote'
import CaptionBlock from './Blocks/Caption'
import ImageBlock from './Blocks/Image'
import BreakBlock from './Blocks/Break'

import { Block } from '../util/constants'

export default (setEditorState, getEditorState) => (contentBlock) => {
  const type = contentBlock.getType()
  switch (type) {
    case Block.BLOCKQUOTE_CAPTION: return {
      component: BlockQuote,
    };
    case Block.CAPTION: return {
      component: CaptionBlock,
    };
    case Block.BREAK: return {
      component: BreakBlock,
      editable: false,
    }
    default: return null;
  }
}
