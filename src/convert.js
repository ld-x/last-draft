/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

 import React from 'react'
import {convertToHTML, convertFromHTML} from 'draft-convert'
import {Entity, convertToRaw, convertFromRaw, EditorState, ContentState} from 'draft-js'
const REGEX_LF = new RegExp('\n', 'g');

export function editorStateFromHtml (rawHtml) {
  if (rawHtml === null) {
    return EditorState.createEmpty()
  }

  let html = rawHtml.replace(REGEX_LF, '')
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

      if (nodeName === 'p') {
        if (node.className === 'ld-quote' || node.className === 'quote') {
          return { type: 'quote' }
        }
      }

    }
  })(html)

  return EditorState.createWithContent(contentState)
}

export function editorStateToHtml(editorState) {
  if (!editorState) { return }

  return convertToHTML({
    styleToHTML: (style) => {
      return (
        <span
          style={
            style === 'UNDERLINE' ? {textDecoration: 'underline'} :
            style === 'BOLD' ? {fontWeight: 'bold'} :
            style === 'ITALIC' ? {fontStyle: 'italic'} :
            {}
          }
        />
      )
    },
    blockToHTML: (block) => {
      const type = block.type
      if (type === 'atomic') {
        let type = block.data['type']
        let src = block.data['src']
        let alt = block.data['alt']
        let title = block.data['title']
        let caption = block.data['caption']
        if (alt === '') { alt = caption }
        if (title === '') { title = caption }

        if (src && type === 'image') {
          return (
            <img src={src} alt={alt} title={title} />
          )
        }
        if (src && type === 'embed') {
          return (
            <iframe width="560" height="315" src={src} frameBorder="0" allowFullScreen />
          )
        }
        return {start: '<span>', end: '</span>'}
      }
      if (type === 'unstyled') {
        return <p />
      }
      return <span/>
    },
    entityToHTML: (entity, originalText) => {
      if (entity.type === 'IMAGE') {
        return `<img src='${entity.data.src}' />`;
      }
      if (entity.type === 'LINK') {
        return <a href={entity.data.url}>{originalText}</a>;
      }
      return originalText;
    }
  })(editorState.getCurrentContent())
}

export function editorStateToJSON (editorState) {
  if (editorState) {
    const content = editorState.getCurrentContent()
    return JSON.stringify(convertToRaw(content), null, 2)
  }
}

export function editorStateFromRaw (rawContent) {
  if (Object.keys(rawContent).length === 0) {
    return EditorState.createEmpty()
  }
  if (rawContent) {
    const content = convertFromRaw(rawContent)
    return EditorState.createWithContent(content)
  } else {
    return EditorState.createEmpty()
  }
}

export function editorStateFromText (text) {
  if (text) {
    return EditorState.createWithContent(ContentState.createFromText(text))
  } else {
    return EditorState.createEmpty()
  }
}
