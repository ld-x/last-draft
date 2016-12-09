import React, { Component } from 'react'
import Editor, { createEditorStateWithText, composeDecorators } from 'draft-js-plugins-editor'
import { EditorState, convertFromRaw, convertToRaw, convertFromHTML, ContentState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'



/* Counter plugin */
import createCounterPlugin from 'draft-js-counter-plugin'
import 'draft-js-counter-plugin/lib/plugin.css'
const counterPlugin = createCounterPlugin()
const { CharCounter, WordCounter } = counterPlugin

/* Emoji plugin */
import createEmojiPlugin from 'draft-js-emoji-plugin'
import 'draft-js-emoji-plugin/lib/plugin.css'
const emojiPlugin = createEmojiPlugin()
const { EmojiSuggestions } = emojiPlugin

/* Hashtag plugin */
import createHashtagPlugin from 'draft-js-hashtag-plugin'
import 'draft-js-hashtag-plugin/lib/plugin.css'
const hashtagPlugin = createHashtagPlugin()

/* Image with Alignment, dnd, focus, resize plugin */
import createImagePlugin from 'draft-js-image-plugin'
import createAlignmentPlugin from 'draft-js-alignment-plugin'
import createFocusPlugin from 'draft-js-focus-plugin'
import createResizeablePlugin from 'draft-js-resizeable-plugin'
import createDndPlugin from 'draft-js-dnd-plugin'

import 'draft-js-alignment-plugin/lib/plugin.css'
import 'draft-js-focus-plugin/lib/plugin.css'

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const dndPlugin = createDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  dndPlugin.decorator
)
const imagePlugin = createImagePlugin({ decorator })

/* inline toolbar */
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin'
import 'draft-js-inline-toolbar-plugin/lib/plugin.css'
const inlineToolbarPlugin = createInlineToolbarPlugin()
const { InlineToolbar } = inlineToolbarPlugin

/* Linkify */
import createLinkifyPlugin from 'draft-js-linkify-plugin'
import 'draft-js-linkify-plugin/lib/plugin.css'
const linkifyPlugin = createLinkifyPlugin()

/* Mentions */
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin'
import 'draft-js-mention-plugin/lib/plugin.css'
import mentions from './components/Mention/mentions'
import { Entry, positionSuggestions} from './components/Mention/mentions'
const mentionPlugin = createMentionPlugin({ mentions, positionSuggestions })
const { MentionSuggestions } = mentionPlugin

/* Side Toolbar */
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin'
import 'draft-js-side-toolbar-plugin/lib/plugin.css'
const sideToolbarPlugin = createSideToolbarPlugin()
const { SideToolbar } = sideToolbarPlugin

/* Stickers */
import createStickerPlugin from 'draft-js-sticker-plugin'
import stickers from './components/Sticker/stickers'
import 'draft-js-sticker-plugin/lib/plugin.css'
const stickerPlugin = createStickerPlugin({ stickers: stickers })
const { StickerSelect } = stickerPlugin

/* Undo Redo */
import createUndoPlugin from 'draft-js-undo-plugin'
import 'draft-js-undo-plugin/lib/plugin.css'
const undoPlugin = createUndoPlugin()
const { UndoButton, RedoButton } = undoPlugin


/* init the plugins */
const plugins = [
  dndPlugin, focusPlugin, alignmentPlugin, resizeablePlugin, imagePlugin,
  counterPlugin, emojiPlugin, hashtagPlugin, inlineToolbarPlugin, linkifyPlugin,
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
          <AlignmentTool />
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
          <div><CharCounter limit={300} /> characters out of an allowed 300</div>
          <div><WordCounter limit={50} /> words out of an allowed 50</div>

          <StickerSelect editor={this} />
          <UndoButton />
          <RedoButton />
        </div>

      </div>
    )
  }
}
