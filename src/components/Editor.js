import React, { Component } from 'react'
import { render } from 'react-dom' // eslint-disable-line no-unused-vars
import Editor, { composeDecorators } from 'draft-js-plugins-editor'
import { EditorState, RichUtils, getDefaultKeyBinding, KeyBindingUtil } from 'draft-js'
import { fromJS } from 'immutable';

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
import createDndPlugin from 'draft-js-drag-n-drop-plugin'

import 'draft-js-alignment-plugin/lib/plugin.css'
import 'draft-js-focus-plugin/lib/plugin.css'

const focusPlugin = createFocusPlugin()
const resizeablePlugin = createResizeablePlugin()
const dndPlugin = createDndPlugin()
const alignmentPlugin = createAlignmentPlugin()
const { AlignmentTool } = alignmentPlugin

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  dndPlugin.decorator
)
const imagePlugin = createImagePlugin({ decorator })

/* Linkify */
import createLinkifyPlugin from 'draft-js-linkify-plugin'
import 'draft-js-linkify-plugin/lib/plugin.css'
const linkifyPlugin = createLinkifyPlugin()

/* Mentions */

import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin'
const mentionPlugin = createMentionPlugin();
const { MentionSuggestions } = mentionPlugin;
import 'draft-js-mention-plugin/lib/plugin.css'

/* ld plugins */

/* Toolbar */
import createToolbarPlugin from 'last-draft-js-toolbar-plugin'
import 'last-draft-js-toolbar-plugin/lib/plugin.css'
const toolbarPlugin = createToolbarPlugin()
const { Toolbar } = toolbarPlugin

/* Side Toolbar */
import createSidebarPlugin from 'last-draft-js-sidebar-plugin'
import 'last-draft-js-sidebar-plugin/lib/plugin.css'
const sidebarPlugin = createSidebarPlugin()
const { Sidebar } = sidebarPlugin

/* Embed plugin */
import createEmbedPlugin from 'draft-js-embed-plugin'
import 'draft-js-embed-plugin/lib/plugin.css'
const embedPlugin = createEmbedPlugin()

/* Link plugin */
import createLinkPlugin from 'draft-js-link-plugin'
import 'draft-js-link-plugin/lib/plugin.css'
const linkPlugin = createLinkPlugin()

/* Color */
import {colorStyleMap} from 'draft-js-color-picker-plugin'

/* init the plugins */
const plugins = [
  dndPlugin, focusPlugin, alignmentPlugin, resizeablePlugin, imagePlugin,
  emojiPlugin, hashtagPlugin, linkifyPlugin, mentionPlugin,
  toolbarPlugin, sidebarPlugin, embedPlugin, linkPlugin
]

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { suggestions: props.mentions || fromJS([]) }
    this.keyBindings = this.props.keyBindings || []
  }

  onChange = (editorState) => {
    this.props.onChange(editorState)
  }

  focus = () => {
    this.editor.focus()
  }

  onSearchChange = ({ value }) => {
    if (this.props.mentionSearchAsync !== undefined) {
      /* async */
      this.props.mentionSearchAsync(value)
      .then((data) => { this.setState({suggestions: fromJS(data.suggestions)}) })
    } else {
      /* static list of users */
      this.setState({
        suggestions: defaultSuggestionsFilter(value, this.props.mentions),
      })
    }
  }

  handleKeyCommand (command) {
    if (this.keyBindings.length) {
      const kb = this.keyBindings.find(k => k.name === command)
      if (kb) {
        kb.action()
        return true
      }
    }
    const newState = RichUtils.handleKeyCommand(this.props.editorState, command)
    if (newState) {
      this.props.onChange(newState)
      return true
    }
    return false
  }

  handleReturn (event) {
    if (!event.shiftKey) { return false }
    const newState = RichUtils.insertSoftNewline(this.props.editorState)
    this.props.onChange(newState)
    return true
  }

  render () {
    return (
      <div>
        <div className='editor'>
          <Editor
            editorState={this.props.editorState}
            onChange={this.onChange}
            plugins={plugins}
            customStyleMap={colorStyleMap}
            handleKeyCommand={::this.handleKeyCommand}
            handleReturn={::this.handleReturn}
            ref={(element) => { this.editor = element }}
          />
          <AlignmentTool />
          <Toolbar />
          <Sidebar />
          <EmojiSuggestions />
          <MentionSuggestions
            onSearchChange={this.onSearchChange}
            suggestions={this.state.suggestions}
            onClose={() => this.setState({suggestions: fromJS([])})}
          />
        </div>
      </div>
    )
  }
}
