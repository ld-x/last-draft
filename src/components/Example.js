import React, { Component } from 'react';
import { EditorState, CompositeDecorator } from 'draft-js'
import { convertFromRaw, convertFromHTML, ContentState } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import createImagePlugin from 'draft-js-image-plugin'
import { stateToHTML } from 'draft-js-export-html'
import initialState from './initialState'

import { findLinkEntities, Link } from './Entities'
const decorators = [ { strategy: findLinkEntities, component: Link } ]
const imagePlugin = createImagePlugin()
const plugins = [imagePlugin]

export default class SimpleImageEditor extends Component {

  constructor(props) {
    super(props)

    /* from html */
    const initalHtml = '<div><a href="http://www.g.co">Example link</a></div>'
    const blocks = convertFromHTML(initalHtml)
    const content = ContentState.createFromBlockArray(blocks)
    let state = EditorState.createWithContent(content, new CompositeDecorator(decorators))
    //this.state = { editorState: state }

    /* from json */
    this.state = { editorState: EditorState.createWithContent(convertFromRaw(initialState)) }

    this.onChange = (editorState) => this.setState({editorState})

    // console.log(stateToHTML(state))
  }

  render() {
    return (
      <div>
        <div className='editor' onClick={this.focus}>
          <Editor
            decorators={decorators}
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={(element) => { this.editor = element; }} />
        </div>
      </div>
    )
  }
}
