import React, { Component } from 'react'
import Editor, { createEditorStateWithText, composeDecorators } from 'draft-js-plugins-editor'
import { EditorState, convertFromRaw, convertToRaw, convertFromHTML, ContentState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'

/* Emoji plugin */
import createEmojiPlugin from 'draft-js-emoji-plugin'
import emojiStyles from './styles/EmojiStyles.css';
const emojiPlugin = createEmojiPlugin({
  theme: emojiStyles
})
const { EmojiSuggestions } = emojiPlugin

/* Hashtag plugin */
import createHashtagPlugin from 'draft-js-hashtag-plugin'
import hashtagStyles from './styles/HashtagStyles.css';
const hashtagPlugin = createHashtagPlugin({
  theme: hashtagStyles
})

/* Image with Alignment, dnd, focus, resize plugin */
import createImagePlugin from 'draft-js-image-plugin'
import createAlignmentPlugin from 'draft-js-alignment-plugin'
import createFocusPlugin from 'draft-js-focus-plugin'
import createResizeablePlugin from 'draft-js-resizeable-plugin'
import createDndPlugin from 'draft-js-dnd-plugin'

import focusStyles from './styles/FocusStyles.css';
const focusPlugin = createFocusPlugin({ theme: focusStyles });
const resizeablePlugin = createResizeablePlugin();
const dndPlugin = createDndPlugin();
import alignmentStyles from './styles/AlignmentStyles.css';
const alignmentPlugin = createAlignmentPlugin({ theme: alignmentStyles });
const { AlignmentTool } = alignmentPlugin

/* alignmentPlugin.decorator, TODO: Needs theming */
const decorator = composeDecorators(
  resizeablePlugin.decorator,
  focusPlugin.decorator,
  dndPlugin.decorator
)
const imagePlugin = createImagePlugin({ decorator })

/* inline toolbar */
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin'
import 'draft-js-inline-toolbar-plugin/lib/plugin.css'
import inlineToolbarStyles from './styles/inlineToolbarStyles.css';
import inlineToolbarButtonStyles from './styles/InlineToolbarButtonStyles.css';
const inlineToolbarPlugin = createInlineToolbarPlugin({
  theme: { buttonStyles: inlineToolbarButtonStyles, toolbarStyles: inlineToolbarStyles }
})
const { InlineToolbar } = inlineToolbarPlugin

/* Linkify */
import createLinkifyPlugin from 'draft-js-linkify-plugin'
import 'draft-js-linkify-plugin/lib/plugin.css'
import linkifyStyles from './styles/Linkify.css'
const linkifyPlugin = createLinkifyPlugin({
  theme: linkifyStyles
})

/* Mentions */
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin'
import mentionsStyles from './styles/Mention.css'
import mentions from './components/Mention/mentions'
import { Entry, positionSuggestions} from './components/Mention/mentions'
const mentionPlugin = createMentionPlugin({
  mentions,
  positionSuggestions,
  theme: mentionsStyles
})
const { MentionSuggestions } = mentionPlugin

/* Side Toolbar */
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin'
import buttonStyles from './styles/ToolbarButtonStyles.css';
import toolbarStyles from './styles/ToolbarStyles.css';
import blockTypeSelectStyles from './styles/ToolbarBlockTypeSelectStyles.css';
const sideToolbarPlugin = createSideToolbarPlugin({
  theme: { buttonStyles, toolbarStyles, blockTypeSelectStyles }
})
const { SideToolbar } = sideToolbarPlugin

/* Stickers */
import createStickerPlugin from 'draft-js-sticker-plugin'
import stickers from './components/Sticker/stickers'
import stickerStyles from './styles/StickerStyles.css';
const stickerPlugin = createStickerPlugin({
  stickers: stickers,
  theme: stickerStyles
})
const { StickerSelect } = stickerPlugin

/* Undo Redo */
import createUndoPlugin from 'draft-js-undo-plugin'
import undoStyles from './styles/UndoStyles.css';
const undoPlugin = createUndoPlugin(({
  theme: { undo: undoStyles.button, redo: undoStyles.button }
}))
const { UndoButton, RedoButton } = undoPlugin


/* init the plugins */
const plugins = [
  dndPlugin, focusPlugin, alignmentPlugin, resizeablePlugin, imagePlugin,
  emojiPlugin, hashtagPlugin, inlineToolbarPlugin, linkifyPlugin,
  mentionPlugin, sideToolbarPlugin, stickerPlugin, undoPlugin
]

/* init the state, either from raw, html or text */
import { text } from './initialState/text'
import { raw } from './initialState/raw'
import { html } from './initialState/html'

/* from html
const content = ContentState.createFromBlockArray(convertFromHTML(html))
let STATE = EditorState.createWithContent(content)
*/

/* from text
let STATE = createEditorStateWithText(text)
*/

/* from raw */
const content = convertFromRaw(raw)
let STATE = EditorState.createWithContent(content)


export default class Final extends Component {

  state = {
    editorState: STATE,
    suggestions: mentions
  }

  onChange = (editorState) => {
    this.setState({ editorState })

    let raw = convertToRaw(editorState.getCurrentContent())
    this.logState('raw state:', JSON.stringify(raw))

    let html = stateToHTML(editorState.getCurrentContent())
    this.logState('html state:', html)
  }

  logState(type, raw) {
    console.log(type)
    console.log(JSON.stringify(raw))
  }

  focus = () => {
    this.editor.focus()
  }

  onSearchChange = ({ value }) => {
    this.setState({
      suggestions: defaultSuggestionsFilter(value, mentions),
    })
  }

  customCountFunction(str) {
    const wordArray = str.match(/\S+/g)
    return wordArray ? wordArray.length : 0
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
          { /* <AlignmentTool /> */ }
          <InlineToolbar />
          <SideToolbar />
          <EmojiSuggestions />
          <MentionSuggestions
            onSearchChange={this.onSearchChange}
            suggestions={this.state.suggestions}
            entryComponent={Entry}
          />
        </div>

        <div className='options'>
          <StickerSelect editor={this} />
          <UndoButton />
          <RedoButton />
        </div>

      </div>
    )
  }
}
