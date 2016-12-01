export const Block = {
  UNSTYLED: 'unstyled',
  PARAGRAPH: 'unstyled',
  OL: 'ordered-list-item',
  UL: 'unordered-list-item',
  H1: 'header-one',
  H2: 'header-two',
  H3: 'header-three',
  CODE: 'code-block',
  BLOCKQUOTE: 'blockquote',
  PULLQUOTE: 'pullquote',
  ATOMIC: 'atomic',
  BLOCKQUOTE_CAPTION: 'block-quote-caption',
  CAPTION: 'caption'
}

export const Inline = {
  BOLD: 'BOLD',
  CODE: 'CODE',
  ITALIC: 'ITALIC',
  STRIKETHROUGH: 'STRIKETHROUGH',
  UNDERLINE: 'UNDERLINE',
  HIGHLIGHT: 'HIGHLIGHT',
}

export const Entity = {
  LINK: 'LINK',
  IMAGE: 'IMAGE'
}

export const HYPERLINK = 'hyperlink'
export const HANDLED = 'handled'
export const NOT_HANDLED = 'not_handled'

export const KEY_COMMANDS = {
  addNewBlock: () => 'add-new-block',
  changeType: (type = '') => `changetype:${type}`,
  showLinkInput: () => 'showlinkinput',
  toggleInline: (type = '') => `toggleinline:${type}`,
  deleteBlock: () => 'delete-block',
}

export default {
  Block,
  Inline,
  Entity,
}
