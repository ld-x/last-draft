import {convertFromHTML} from 'draft-convert'
import {stateToHTML} from 'draft-js-export-html'
import {Entity, convertToRaw, convertFromRaw, EditorState} from 'draft-js'
import defaultDecorator from '../decorators/defaultDecorator'

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
    return stateToHTML(content, {
      inlineStyles: {
        'DROPCAP': {
          element: 'span',
          attributes: {class: 'ld-dropcap'}
        }
      },
      blockRenderers: {
        atomic: (block) => {
          let data = block.getData()
          let url = data.get('src')
          if (url) {
            return `<img src='${url}' />`
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
  }
}

export function editorStateToJSON (editorState) {
  if (editorState) {
    const content = editorState.getCurrentContent()
    return JSON.stringify(convertToRaw(content), null, 2)
  }
}

export function editorStateFromRaw (rawContent, decorator = defaultDecorator) {
  if (rawContent) {
    const content = convertFromRaw(rawContent)
    return EditorState.createWithContent(content, decorator)
  } else {
    return EditorState.createEmpty(decorator)
  }
}
