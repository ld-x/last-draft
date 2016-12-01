import React, { PropTypes } from 'react'
import Editor from './RTE/Editor'

export default class AddButton extends React.Component {
  constructor(props) {
    super(props)
  }

  editorUpdated() {
    console.log('updated')
  }

  render() {
    let htmlValue = '<div><img src="http://imgur.com/yrwFoXT.jpg" /><p>xxx</p></div>'
    return (
      <Editor html={htmlValue} name='body' onChange={::this.editorUpdated} autofocus={true} />
    )
  }
}
