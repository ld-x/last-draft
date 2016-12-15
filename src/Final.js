import React, { Component } from 'react'
import Editor, { createEditorStateWithText } from './plugins/draft-js-plugins/draft-js-plugins-editor'
import { EditorState, convertFromRaw, convertToRaw, convertFromHTML, ContentState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { defaultSuggestionsFilter } from './plugins/draft-js-plugins/draft-js-mention-plugin'

/* init the plugins */
import { components, plugins, data, setupToolbars } from './plugins'

const { EmojiSuggestions, MentionSuggestions,
  LinkAdd, ImageAdd, StickerSelect, Entry } = components
const { focusPlugin, alignmentPlugin, resizeablePlugin, imagePlugin,
  emojiPlugin, hashtagPlugin, linkifyPlugin,
  mentionPlugin, stickerPlugin } = plugins
const { mentions, stickers } = data

let linkAddElement = null
let inlineToolbarElement = null
const addLink = () => { linkAddElement.openPopover() }

let imageAddElement = null
const addImageFile = () => { imageAddElement.addImageFile() }

const { inlineToolbarPlugin, InlineToolbar,
  sideToolbarPlugin, SideToolbar } = setupToolbars(addLink, addImageFile)

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
    suggestions: data.mentions
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
      suggestions: defaultSuggestionsFilter(value, data.mentions),
    })
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
            defaultKeyBindings={true}
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
