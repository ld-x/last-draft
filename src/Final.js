import React, { Component } from 'react'
import Editor, { createEditorStateWithText, composeDecorators } from './plugins/draft-js-plugins-editor/src/'
import { EditorState, convertFromRaw, convertToRaw, convertFromHTML, ContentState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'

/* Emoji plugin */
import createEmojiPlugin from './plugins/draft-js-emoji-plugin/src/'
import emojiStyles from './styles/EmojiStyles.css'
const emojiPlugin = createEmojiPlugin({
  theme: emojiStyles
})
const { EmojiSuggestions } = emojiPlugin

/* Hashtag plugin */
import createHashtagPlugin from './plugins/draft-js-hashtag-plugin/src/'
import hashtagStyles from './styles/HashtagStyles.css'
const hashtagPlugin = createHashtagPlugin({
  theme: hashtagStyles
})

/* Image with Alignment, dnd, focus, resize plugin */
import createImagePlugin from './plugins/draft-js-image-plugin/src/'
import createAlignmentPlugin from './plugins/draft-js-alignment-plugin/src/'
import createFocusPlugin from './plugins/draft-js-focus-plugin/src/'
import createResizeablePlugin from './plugins/draft-js-resizeable-plugin/src/'

import focusStyles from './styles/FocusStyles.css'
const focusPlugin = createFocusPlugin({ theme: focusStyles })
const resizeablePlugin = createResizeablePlugin()
import alignmentStyles from './styles/AlignmentStyles.css'
const alignmentPlugin = createAlignmentPlugin({ theme: alignmentStyles })
const { AlignmentTool } = alignmentPlugin

/* alignmentPlugin.decorator, TODO: Needs theming */
const decorator = composeDecorators(
  resizeablePlugin.decorator,
  focusPlugin.decorator,
)
const imagePlugin = createImagePlugin({ decorator })
const { ImageAdd } = imagePlugin
let imageAddElement = null
const addImageFile = () => { imageAddElement.addImageFile() }

/* inline toolbar */
import createInlineToolbarPlugin from './plugins/draft-js-inline-toolbar-plugin/src/'
import inlineToolbarStyles from './styles/inlineToolbarStyles.css'
import inlineToolbarButtonStyles from './styles/InlineToolbarButtonStyles.css'
import {
  ItalicButton, BoldButton, UnderlineButton,
  CodeButton, HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton,
  UnorderedListButton, BlockquoteButton, AddLinkButton
} from './plugins/draft-js-buttons/src/'
const addLink = () => { linkAddElement.openPopover() }
let linkAddElement = null
let inlineToolbarElement = null
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
import createLinkifyPlugin from './plugins/draft-js-linkify-plugin/src/'
import linkifyStyles from './styles/Linkify.css'
const linkifyPlugin = createLinkifyPlugin({ theme: linkifyStyles })
const { LinkAdd } = linkifyPlugin

/* Mentions */
import createMentionPlugin, { defaultSuggestionsFilter } from './plugins/draft-js-mention-plugin/src/'
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
import createSideToolbarPlugin from './plugins/draft-js-side-toolbar-plugin/src/'
import buttonStyles from './styles/ToolbarButtonStyles.css'
import toolbarStyles from './styles/ToolbarStyles.css'
import blockTypeSelectStyles from './styles/ToolbarBlockTypeSelectStyles.css'
const sideToolbarPlugin = createSideToolbarPlugin({
  theme: { buttonStyles, toolbarStyles, blockTypeSelectStyles },
  addImageFile
})
const { SideToolbar } = sideToolbarPlugin

/* Stickers */
import createStickerPlugin from './plugins/draft-js-sticker-plugin/src/'
import stickers from './components/Sticker/stickers'
import stickerStyles from './styles/StickerStyles.css'
const stickerPlugin = createStickerPlugin({
  stickers: stickers,
  theme: stickerStyles
})
const { StickerSelect } = stickerPlugin


/* init the plugins */
let pluginList = {
  imagePlugin: imagePlugin,
  emojiPlugin: emojiPlugin,
  hashtagPlugin: hashtagPlugin,
  inlineToolbarPlugin: inlineToolbarPlugin,
  linkifyPlugin: linkifyPlugin,
  mentionPlugin: mentionPlugin,
  sideToolbarPlugin: sideToolbarPlugin,
  stickerPlugin: stickerPlugin,
  stickerPlugin: stickerPlugin,
}


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

  getPlugins() {
    let pluginArray = []
    if(this.props.plugins === undefined) { return pluginArray }

    Object.keys(pluginList).map((key, index) => {
      if(this.props.plugins.includes(key)){
        pluginArray.push(pluginList[key])
      }
    })

    if (this.props.plugins.includes('imagePlugin')) {
      pluginArray.push(focusPlugin)
      pluginArray.push(resizeablePlugin)
    }
    return pluginArray
  }

  renderEmoji() {
    if (this.props.plugins.includes('emojiPlugin')) {
      return <EmojiSuggestions />
    }
  }

  renderMention() {
    if (this.props.plugins.includes('mentionPlugin')) {
      return (
        <MentionSuggestions
          onSearchChange={this.onSearchChange}
          suggestions={this.state.suggestions}
          entryComponent={Entry}
        />
      )
    }
  }

  renderInlineToolbar() {
    if (this.props.plugins.includes('inlineToolbarPlugin')) {
      return (
        <InlineToolbar
          ref={(element) => { inlineToolbarElement = element }} />
      )
    }
  }

  renderSideToolbar() {
    if (this.props.plugins.includes('sideToolbarPlugin')) {
      return <SideToolbar />
    }
  }

  renderLinkAdd() {
    if (this.props.plugins.includes('linkifyPlugin') &&
        this.props.plugins.includes('inlineToolbarPlugin')) {
      return (
        <LinkAdd
          ref={(element) => { linkAddElement = element }}
          editorState={this.state.editorState}
          onChange={this.onChange}
          inlineToolbarElement={inlineToolbarElement}
        />
      )
    }
  }

  renderImageAdd() {
    if (this.props.plugins.includes('imagePlugin') &&
        this.props.plugins.includes('sideToolbarPlugin')) {
      return (
        <ImageAdd
          ref={(element) => { imageAddElement = element }}
          editorState={this.state.editorState}
          onChange={this.onChange}
        />
      )
    }
  }

  renderSticker() {
    if (this.props.plugins.includes('stickerPlugin')) {
      return (
        <StickerSelect editor={this} />
      )
    }
  }

  render() {
    return (
      <div>
        <div className='editor' onClick={this.focus}>
          <Editor
            {...this.props}
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={this.getPlugins()}
            ref={(element) => { this.editor = element }}
          />
          {this.renderInlineToolbar()}
          {this.renderSideToolbar()}
          {this.renderEmoji()}
          {this.renderMention()}
        </div>
        <div>
          {this.renderLinkAdd()}
          {this.renderImageAdd()}
          {this.renderSticker()}
        </div>
      </div>
    )
  }
}
