import React, { Component } from 'react';
import { EditorState, CompositeDecorator } from 'draft-js'
import { convertFromRaw, convertFromHTML, ContentState } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import { stateToHTML } from 'draft-js-export-html'

import { findLinkEntities, Link } from './Entities'
const decorators = [ { strategy: findLinkEntities, component: Link } ]

export default class SimpleImageEditor extends Component {

  constructor(props) {
    super(props)

    /* from html */
    const initalHtml = '<div><a href="http://www.g.co">Example link</a></div>'
    const blocks = convertFromHTML(initalHtml)
    const content = ContentState.createFromBlockArray(blocks)
    let state = EditorState.createWithContent(content, new CompositeDecorator(decorators))
    this.state = { editorState: state }
  }

  onChange = (editorState) => {
    console.log(stateToHTML(editorState.getCurrentContent()))
    this.setState({ editorState })
  }

  focus = () => {
    this.editor.focus()
  }

  render() {
    return (
      <div>
        <div className='editor' onClick={this.focus}>
          <Editor
            decorators={decorators}
            editorState={this.state.editorState}
            onChange={this.onChange}
            ref={(element) => { this.editor = element; }} />
        </div>
      </div>
    )
  }
}
