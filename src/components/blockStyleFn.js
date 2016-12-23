export default (contentBlock) => {
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
}
