import React, { Component } from 'react';

export default class extends Component {
  render() {
    const {
      decoratedText,
      dir,
      entityKey,
      getEditorState,
      offsetKey,
      setEditorState,
      ...otherProps
    } = this.props
    return (
      <span {...otherProps} className='ld-dropcap' />
    )
  }
}
