import React, { Component } from 'react'
import { EditorState } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import createUndoPlugin from 'draft-js-undo-plugin'

import 'draft-js-undo-plugin/lib/plugin.css'

/*
import styles from './Undo.css'
const undoStyles = { undo: styles.button, redo: styles.button }
*/

/* FOR CUSTOM ADD: theme: undoStyles, */
const undoPlugin = createUndoPlugin({
  undoContent: 'Undo',
  redoContent: 'Redo',
})

const { UndoButton, RedoButton } = undoPlugin
const plugins = [undoPlugin]

export default class CustomUndoEditor extends Component {

  state = {
    editorState: EditorState.createEmpty()
  }

  onChange = (editorState) => {
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
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={(element) => { this.editor = element; }}
          />
        </div>
        <div className='options'>
          <UndoButton />
          <RedoButton />
        </div>
      </div>
    )
  }
}
