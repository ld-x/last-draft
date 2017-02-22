/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import {convertFromHTML, convertToHTML} from 'draft-convert'
import {Entity, convertToRaw, convertFromRaw, EditorState, ContentState} from 'draft-js'
import defaultDecorator from '../decorators/defaultDecorator'
import linkifyIt from 'linkify-it'
import tlds from 'tlds'
import { extractHashtagsWithIndices } from './hashtag';
import styleMap from './styleMap';
import React from 'react'

const linkify = linkifyIt()
linkify.tlds(tlds)

export function editorStateFromHtml (html, decorator = defaultDecorator) {
  if (html === null) {
    return EditorState.createEmpty(decorator)
  }

  const contentState = convertFromHTML({
    htmlToStyle: (nodeName, node, currentStyle) => {
      if (node.className !== undefined) {
        return currentStyle.add(node.className)
      } else {
        return currentStyle
      }
    },
    htmlToEntity: (nodeName, node) => {
      if (nodeName === 'a') {
        if (node.className === "ld-mention") {
          return Entity.create(
            'MENTION',
            'IMMUTABLE',
            {url: node.href, target: node.target}
          )
        }

        return Entity.create(
          'LINK',
          'MUTABLE',
          {url: node.href, target: node.target}
        )
      }
    },
    htmlToBlock: (nodeName, node) => {
      if (nodeName === 'img') {
        let caption = '', title = '', alt = '', src = '', srcSet= '', blockType = 'image'
        if (node.title) { title = node.title }
        if (node.alt) { alt = node.alt }
        if (node.srcset) { srcSet = node.srcset } else { srcSet = node.src }
        return {
          type: 'atomic',
          data: {
            src: node.src,
            srcSet: srcSet,
            type: blockType,
            title: title,
            alt: alt
          }
        }
      }

      if (nodeName === 'iframe' && node.className !== 'ld-video-block') {
        return {
          type: 'atomic',
          data: {
            src: node.getAttribute('src'),
            type: 'video',
            caption: ''
          }
        };
      }

      if (nodeName === 'figure') {
        if (!node.children.length) { return null }

        let caption = '', title = '', alt = '', src = '', srcSet = '', blockType = 'image'
        let captionNode = node.children[1]
        if (captionNode !== undefined) { caption = captionNode.innerHTML }

        let blockNode = node.children[0]
        let type = blockNode.tagName.toLowerCase()
        if (type === 'iframe') { blockType = 'video' }

        if (blockNode !== undefined) {
          src = blockType === 'video' ? node.children[0].getAttribute('src') : blockNode.src
          srcSet = blockNode.srcset || node.children[0].getAttribute('src')
          alt = blockNode.alt
          title = blockNode.title
        }

        return {
          type: 'atomic',
          data: {
            src: src,
            type: blockType,
            srcSet: srcSet,
            caption: caption,
            title: title,
            alt: alt
          }
        }
      }

      if (nodeName === 'span') {
        if(node.className === 'ld-quote'){
          return {
            type: 'quote'
          };
        }
      }

    }
  })(html)

  return EditorState.createWithContent(contentState, decorator)
}

function convertToInline(o){
  var elem = new Option
  Object.keys(o).forEach(function(a){ elem.style[a]=o[a] })
  return elem.getAttribute('style')
}

export function editorStateToHtml(editorState) {
  if (editorState) {
    const convertedHTML = convertToHTML({
      styleToHTML: (style) => {
        /* inline color styles */
        if (style.includes('color')) {
          let colorClassName = ''
          let colorInlineStyle = ''
          Object.keys(styleMap).map((name) => {
            if (style === name) {
              colorClassName = name
              colorInlineStyle = convertToInline(styleMap[name])
              console.log(colorInlineStyle.color)
              console.log(styleMap[name])
            }
          })
          console.log(colorInlineStyle)
          return <span className={colorClassName} style={{color: colorInlineStyle.replace('color: ', '')}} />
        }
      },
      blockToHTML: (block) => {
        const type = block.type
        if (type === 'atomic') {
          let src = block.data.src
          let srcSet = block.data.srcSet
          let alt = block.data.alt
          let title = block.data.title
          let caption = ''
          if (block.data.caption !== undefined) { caption = block.data.caption }
          if (alt === '' || alt === undefined) { alt = caption }
          if (title === '' || title === undefined) { title = caption }

          if (src && (block.data.type == 'image' || block.data.type == 'placeholder')) {
            let start = `<figure class="ld-image-block-wrapper"><img src="${src}" srcset="${srcSet}" alt="${alt}" title="${title}" class="ld-image-block"><figcaption class="ld-image-caption">${caption}</figcaption>`
            return { start: start, end: '</figure>' }
          }
          if (src && block.data.type == 'video') {
            let start = `<figure class="ld-video-block-wrapper"><iframe width="560" height="315" src="${src}" class="ld-video-block" frameBorder="0" allowFullScreen></iframe><figcaption class="ld-video-caption">${caption}</figcaption>`
            return { start: start, end: '</figure>' }
          }
          if (src && block.data.type == 'audio') {
            let start = `<figure class="ld-audio-block-wrapper"> <iframe width="100%" height="450" scrolling="no" frameborder="no" src="${src}"></iframe>`
            return { start: start, end: '</figure>' }
          }
          /* default atomic block */
          return { start: '<figure>', end: '</figure>' }

        }
        if (type === 'unstyled') {
          return { start: '<div>', end: '</div>' }
        }
        if (type === 'quote') {
          return { start: `<span class="ld-quote">`, end: '</span>' }
        }
      },
      entityToHTML: (entity, originalText) => {
        if (entity.type === 'LINK') {
          return { start: `<a class="ld-link" target="_self">`, end: '</a>' }
        }
        if (entity.type === 'MENTION') {
          return <a target='_self' src={entity.data.url} className="ld-mention">{entity.data.name}</a>
        }
      }
    })(editorState.getCurrentContent())

    /* logic for linkify */
    let convertedHTMLLinkify = convertedHTML
    const linkifyMatch = linkify.match(convertedHTML)
    if (linkifyMatch !== null) {
      convertedHTMLLinkify = linkifyMatch.filter(function(match) {
        if(/(src|ref|set)=('|")/.test(convertedHTML.slice(match.index - 5, match.index))){
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
