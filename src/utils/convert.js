/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import {convertFromHTML} from 'draft-convert'
import {stateToHTML} from 'draft-js-export-html'
import {Entity, convertToRaw, convertFromRaw, EditorState, ContentState} from 'draft-js'
import defaultDecorator from '../decorators/defaultDecorator'
import {html} from 'common-tags'
import linkifyIt from 'linkify-it'
import tlds from 'tlds'
import {extractHashtagsWithIndices} from './hashtag';

const linkify = linkifyIt()
linkify.tlds(tlds)

export function editorStateFromHtml (html, decorator = defaultDecorator) {
  if (html === null) {
    return EditorState.createEmpty(decorator)
  }

  const contentState = convertFromHTML({
    htmlToStyle: (nodeName, node, currentStyle) => {
      if (nodeName === 'span' && node.className === 'ld-dropcap') {
        return currentStyle.add('DROPCAP')
      } else {
        return currentStyle
      }
    },
    htmlToEntity: (nodeName, node) => {
      if (nodeName === 'a') {
        return Entity.create(
          'LINK',
          'MUTABLE',
          {url: node.href, target: node.target}
        )
      }
    },
    htmlToBlock: (nodeName, node) => {
      if (nodeName === 'img') {
        return {
          type: 'atomic',
          data: { src: node.src, type: 'image' }
        }
      }

      if (nodeName === 'figure') {
        if (!node.children.length) { return null }

        let caption = '', src = '', blockType = 'image'
        let captionNode = node.children[1]
        if (captionNode !== undefined) { caption = captionNode.innerHTML }
        let blockNode = node.children[0]
        if (blockNode !== undefined) { src = blockNode.src }

        let type = blockNode.tagName.toLowerCase()
        if (type === 'iframe') { blockType = 'video' }

        return {
          type: 'atomic',
          data: { src: src, type: blockType, caption: caption }
        }
      }

      if (nodeName === 'span') {
        if(node.className === 'ld-quote'){
          return {
            type: 'quote'
          };
        }
      }

      if (nodeName === 'blockquote') {
        if(node.className === 'ld-blockquote'){
          return {
            type: 'blockquote'
          };
        }
      }
    }
  })(html)

  return EditorState.createWithContent(contentState, decorator)
}

export function editorStateToHtml (editorState) {
  if (editorState) {
    const content = editorState.getCurrentContent()

    const convertedHTML = stateToHTML(content, {
      inlineStyles: {
        'DROPCAP': {
          element: 'span',
          attributes: {class: 'ld-dropcap'}
        }
      },
      blockRenderers: {
        atomic: (block) => {
          let data = block.getData()
          let type = data.get('type')
          let url = data.get('src')
          let caption = data.get('caption')
          if (url && type == 'image') {
            return html`
              <figure>
                <img src="${url}" alt="${caption}" class="ld-image-block">
                <figcaption class="ld-image-caption">${caption}</figcaption>
              </figure>
            `
          }
          if(url && type == 'video'){
            return html`
            <figure>
              <iframe
                width="560"
                height="315"
                src="${url}"
                class="ld-video-block"
                frameBorder="0"
                allowFullScreen>
              </iframe>
              <figcaption class="ld-video-caption">${caption}</figcaption>
            </figure>
            `
          }
        },
        blockquote: (block) => {
          let text = block.getText()
          return `<blockquote class='ld-blockquote' >${text}</blockquote>`
        },
        quote: (block) => {
          let text = block.getText()
          return `<span class='ld-quote' >${text}</span>`
        },
        'header-two': (block) => {
          let text = block.getText()
          return `<h2 class='ld-header' >${text}</h2>`
        }
      }
    })

    /* logic for linkify due to no Entity support in stateToHTML */
    let convertedHTMLLinkify = convertedHTML
    const linkifyMatch = linkify.match(convertedHTML)
    if (linkifyMatch !== null) {
      convertedHTMLLinkify = linkifyMatch.filter(function(match) {
        if(/(src|ref)=('|")/.test(convertedHTML.slice(match.index - 5, match.index))){
          return
        } else {
          return match
        }
      }).reduce( (current, match) => {
        return current.replace(match.url, `<a href="${match.url}">${match.url}</a>`)
      }, convertedHTML)
    }

    /* logic for hashtags due to no Entity support in stateToHTML */
    let convertedHTMLHash = convertedHTMLLinkify
    const hashMatch = extractHashtagsWithIndices(convertedHTMLHash)
    if (hashMatch !== null) {
      convertedHTMLHash = hashMatch.reduce((current, match) => {
        return current.replace('#' + match.hashtag, `<span class="hashtag">${'#'+match.hashtag}</span>`)
      }, convertedHTMLLinkify)
    }

    return convertedHTMLHash
  }
}

export function editorStateToJSON (editorState) {
  if (editorState) {
    const content = editorState.getCurrentContent()
    return JSON.stringify(convertToRaw(content), null, 2)
  }
}

export function editorStateFromRaw (rawContent, decorator = defaultDecorator) {
  if (Object.keys(rawContent).length === 0) {
    return EditorState.createEmpty(decorator)
  }
  if (rawContent) {
    const content = convertFromRaw(rawContent)
    return EditorState.createWithContent(content, decorator)
  } else {
    return EditorState.createEmpty(decorator)
  }
}


export function editorStateFromText (text, decorator = defaultDecorator) {
  if (text) {
    return EditorState.createWithContent(ContentState.createFromText(text), decorator)
  } else {
    return EditorState.createEmpty(decorator)
  }
}
