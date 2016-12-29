import React, { Component } from 'react';
const styled = require('styled-components').default

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
      <Hashtag {...otherProps} className='hashtag' />
    )
  }
}

const Hashtag = styled.span`
  color: #5e93c5;
`
