import icons from '../components/Buttons/'

export default [
  {type: 'inline', label: 'bold', style: 'BOLD', icon: icons.BoldIcon},
  {type: 'inline', label: 'italic', style: 'ITALIC', icon: icons.ItalicIcon},
  {type: 'inline', label: 'strikethrough', style: 'STRIKETHROUGH', icon: icons.Strike},
  {type: 'inline', label: 'code', style: 'CODE', icon: icons.Code},
  {type: 'entity', label: 'link', style: 'link', entity: 'LINK', icon: icons.LinkIcon},
  {type: 'separator', label: 'separator'},
  {type: 'block', label: 'ul', style: 'unordered-list-item', icon: icons.ULIcon},
  {type: 'block', label: 'ol', style: 'ordered-list-item', icon: icons.OLIcon},
  {type: 'block', label: 'h2', style: 'header-two', icon: icons.H2Icon},
  {type: 'block', label: 'blockquote', style: 'blockquote', icon: icons.BlockQuoteIcon},
  {type: 'block', label: 'pullquote', style: 'pullquote', icon: icons.PullQuoteIcon},
  {type: 'block', label: 'alignment-left', style: 'alignment-left', icon: icons.AlignLeft},
  {type: 'block', label: 'alignment-center', style: 'alignment-center', icon: icons.AlignCenter},
  {type: 'block', label: 'alignment-right', style: 'alignment-right', icon: icons.AlignRight}
]
