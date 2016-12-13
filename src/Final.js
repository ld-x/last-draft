import React, { Component } from 'react'
import Editor, { createEditorStateWithText, composeDecorators } from './plugins/draft-js-plugins-editor'
import { EditorState, convertFromRaw, convertToRaw, convertFromHTML, ContentState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'

/* Emoji plugin */
import createEmojiPlugin from './plugins/draft-js-emoji-plugin'
import emojiStyles from './styles/EmojiStyles.css';
const emojiPlugin = createEmojiPlugin({
  theme: emojiStyles
})
const { EmojiSuggestions } = emojiPlugin

/* Hashtag plugin */
import createHashtagPlugin from './plugins/draft-js-hashtag-plugin'
import hashtagStyles from './styles/HashtagStyles.css';
const hashtagPlugin = createHashtagPlugin({
  theme: hashtagStyles
})

/* Image with Alignment, dnd, focus, resize plugin */
import createImagePlugin from './plugins/draft-js-image-plugin'
import createAlignmentPlugin from './plugins/draft-js-alignment-plugin'
import createFocusPlugin from './plugins/draft-js-focus-plugin'
import createResizeablePlugin from './plugins/draft-js-resizeable-plugin'

import focusStyles from './styles/FocusStyles.css';
const focusPlugin = createFocusPlugin({ theme: focusStyles });
const resizeablePlugin = createResizeablePlugin();
import alignmentStyles from './styles/AlignmentStyles.css';
const alignmentPlugin = createAlignmentPlugin({ theme: alignmentStyles });
const { AlignmentTool } = alignmentPlugin

/* alignmentPlugin.decorator, TODO: Needs theming */
const decorator = composeDecorators(
  resizeablePlugin.decorator,
  focusPlugin.decorator,
)
const imagePlugin = createImagePlugin({ decorator })
const { ImageAdd } = imagePlugin
let imageAddElement = null;
const addImageFile = () => { imageAddElement.addImageFile() }

/* inline toolbar */
import createInlineToolbarPlugin from './plugins/draft-js-inline-toolbar-plugin'
import inlineToolbarStyles from './styles/inlineToolbarStyles.css';
import inlineToolbarButtonStyles from './styles/InlineToolbarButtonStyles.css';
import {
  ItalicButton, BoldButton, UnderlineButton,
  CodeButton, HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton,
  UnorderedListButton, BlockquoteButton, AddLinkButton
} from './plugins/draft-js-buttons/src/'
const addLink = () => { linkAddElement.openPopover() }
let linkAddElement = null;
let inlineToolbarElement = null;
const inlineToolbarPlugin = createInlineToolbarPlugin({
  structure: [
    ItalicButton, BoldButton, UnderlineButton,
    CodeButton, HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton,
    UnorderedListButton, BlockquoteButton, AddLinkButton
  ],
  addLink,
  theme: { buttonStyles: inlineToolbarButtonStyles, toolbarStyles: inlineToolbarStyles }
})

const { InlineToolbar } = inlineToolbarPlugin

/* Linkify */
import createLinkifyPlugin from './plugins/draft-js-linkify-plugin'
import linkifyStyles from './styles/Linkify.css'
const linkifyPlugin = createLinkifyPlugin({ theme: linkifyStyles })
const { LinkAdd } = linkifyPlugin;

/* Mentions */
import createMentionPlugin, { defaultSuggestionsFilter } from './plugins/draft-js-mention-plugin'
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
import createSideToolbarPlugin from './plugins/draft-js-side-toolbar-plugin'
import buttonStyles from './styles/ToolbarButtonStyles.css';
import toolbarStyles from './styles/ToolbarStyles.css';
import blockTypeSelectStyles from './styles/ToolbarBlockTypeSelectStyles.css';
const sideToolbarPlugin = createSideToolbarPlugin({
  theme: { buttonStyles, toolbarStyles, blockTypeSelectStyles },
  addImageFile
})
const { SideToolbar } = sideToolbarPlugin

/* Stickers */
import createStickerPlugin from './plugins/draft-js-sticker-plugin'
import stickers from './components/Sticker/stickers'
import stickerStyles from './styles/StickerStyles.css';
const stickerPlugin = createStickerPlugin({
  stickers: stickers,
  theme: stickerStyles
})
const { StickerSelect } = stickerPlugin

/* Undo Redo */
import createUndoPlugin from './plugins/draft-js-undo-plugin'
import undoStyles from './styles/UndoStyles.css';
const undoPlugin = createUndoPlugin(({
  theme: { undo: undoStyles.button, redo: undoStyles.button }
}))
const { UndoButton, RedoButton } = undoPlugin


/* init the plugins */
const plugins = [
  focusPlugin, alignmentPlugin, resizeablePlugin, imagePlugin,
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
          <InlineToolbar
            ref={(element) => { inlineToolbarElement = element; }}
          />
          <SideToolbar />
          <EmojiSuggestions />
          <MentionSuggestions
            onSearchChange={this.onSearchChange}
            suggestions={this.state.suggestions}
            entryComponent={Entry}
          />
        </div>

        <LinkAdd
          ref={(element) => { linkAddElement = element; }}
          editorState={this.state.editorState}
          onChange={this.onChange}
          inlineToolbarElement={inlineToolbarElement}
        />
        <ImageAdd
          ref={(element) => { imageAddElement = element; }}
          editorState={this.state.editorState}
          onChange={this.onChange}
        />
        <div className='options'>
          <StickerSelect editor={this} />
          <UndoButton />
          <RedoButton />
        </div>

      </div>
    )
  }
}
