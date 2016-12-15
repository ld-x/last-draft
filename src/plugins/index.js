import React, { Component } from 'react'
import { composeDecorators } from './draft-js-plugins/draft-js-plugins-editor'

/* Emoji plugin */
import createEmojiPlugin from './draft-js-plugins/draft-js-emoji-plugin'
import emojiStyles from './styles/EmojiStyles.css'
const emojiPlugin = createEmojiPlugin({
  theme: emojiStyles
})
const { EmojiSuggestions } = emojiPlugin

/* Hashtag plugin */
import createHashtagPlugin from './draft-js-plugins/draft-js-hashtag-plugin'
import hashtagStyles from './styles/HashtagStyles.css'
const hashtagPlugin = createHashtagPlugin({
  theme: hashtagStyles
})

/* Image with Alignment, dnd, focus, resize plugin */
import createImagePlugin from './draft-js-plugins/draft-js-image-plugin'
import createAlignmentPlugin from './draft-js-plugins/draft-js-alignment-plugin'
import createFocusPlugin from './draft-js-plugins/draft-js-focus-plugin'
import createResizeablePlugin from './draft-js-plugins/draft-js-resizeable-plugin'

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

/* inline toolbar */
import createInlineToolbarPlugin from './draft-js-plugins/draft-js-inline-toolbar-plugin'
import inlineToolbarStyles from './styles/inlineToolbarStyles.css'
import inlineToolbarButtonStyles from './styles/InlineToolbarButtonStyles.css'
import {
  ItalicButton, BoldButton, UnderlineButton,
  CodeButton, HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton,
  UnorderedListButton, BlockquoteButton, AddLinkButton
} from './draft-js-plugins/draft-js-buttons/src/'

/* Linkify */
import createLinkifyPlugin from './draft-js-plugins/draft-js-linkify-plugin'
import linkifyStyles from './styles/Linkify.css'
const linkifyPlugin = createLinkifyPlugin({ theme: linkifyStyles })
const { LinkAdd } = linkifyPlugin

/* Mentions */
import createMentionPlugin from './draft-js-plugins/draft-js-mention-plugin'
import mentionsStyles from './styles/Mention.css'
import mentions from './data/mentions'
import { Entry, positionSuggestions} from './components/Mention'
const mentionPlugin = createMentionPlugin({
  mentions,
  positionSuggestions,
  theme: mentionsStyles
})
const { MentionSuggestions } = mentionPlugin

/* Side Toolbar */
import createSideToolbarPlugin from './draft-js-plugins/draft-js-side-toolbar-plugin'
import buttonStyles from './styles/ToolbarButtonStyles.css'
import toolbarStyles from './styles/ToolbarStyles.css'
import blockTypeSelectStyles from './styles/ToolbarBlockTypeSelectStyles.css'

/* Stickers */
import createStickerPlugin from './draft-js-plugins/draft-js-sticker-plugin'
import stickers from './data/stickers'
import stickerStyles from './styles/StickerStyles.css'
const stickerPlugin = createStickerPlugin({
  stickers: stickers,
  theme: stickerStyles
})
const { StickerSelect } = stickerPlugin

/* Undo Redo */
import createUndoPlugin from './draft-js-plugins/draft-js-undo-plugin'
import undoStyles from './styles/UndoStyles.css'
const undoPlugin = createUndoPlugin(({
  theme: { undo: undoStyles.button, redo: undoStyles.button }
}))
const { UndoButton, RedoButton } = undoPlugin


/* toolbars need to be setup differently, they need to pass in a function which
   refers to the element, would be good to clean this up at some stage */

function setupToolbars(addLink, addImageFile) {
  /* inline */
  const inlineToolbarPlugin = createInlineToolbarPlugin({
    structure: [
      ItalicButton, BoldButton, UnderlineButton,
      CodeButton, HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton,
      UnorderedListButton, BlockquoteButton, AddLinkButton
    ],
    addLink,
    theme: { buttonStyles: inlineToolbarButtonStyles, toolbarStyles: inlineToolbarStyles }
  })

  /* side */
  const sideToolbarPlugin = createSideToolbarPlugin({
    addImageFile,
    theme: { buttonStyles, toolbarStyles, blockTypeSelectStyles }
  })

  const { InlineToolbar } = inlineToolbarPlugin
  const { SideToolbar } = sideToolbarPlugin

  return { inlineToolbarPlugin, InlineToolbar, sideToolbarPlugin, SideToolbar }
}


let components = {
  EmojiSuggestions, MentionSuggestions,
  LinkAdd, ImageAdd, StickerSelect, UndoButton, RedoButton, Entry
}
let plugins = {
  focusPlugin, alignmentPlugin, resizeablePlugin, imagePlugin,
  emojiPlugin, hashtagPlugin, linkifyPlugin,
  mentionPlugin, stickerPlugin, undoPlugin
}
let data = { mentions, stickers }

export { components, plugins, data, setupToolbars }
