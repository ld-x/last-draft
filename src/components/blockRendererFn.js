/*
export default (setEditorState, getEditorState) => (block) => {
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
