import {convertFromHTML} from 'draft-convert'
import {
  Entity,
  convertToRaw,
  convertFromRaw,
  ContentState,
  createEditorState,
  EditorState,
  getVisibleSelectionRect} from "draft-js"

import defaultDecorator from "./decorators/defaultDecorator"

export function editorStateFromHtml(html, decorator = defaultDecorator) {
  if (html === null) {
    return EditorState.createEmpty(decorator)
  }

  const contentState = convertFromHTML({
      htmlToStyle: (nodeName, node, currentStyle) => {
          if (nodeName === 'span' && node.style.color === 'blue') {
              return currentStyle.add('BLUE');
          } else {
              return currentStyle;
          }
      },
      htmlToEntity: (nodeName, node) => {
          if (nodeName === 'a') {
              return Entity.create(
                  'LINK',
                  'MUTABLE',
                  { url: node.href, target: node.target}
              )
          }
      },
      htmlToBlock: (nodeName, node) => {
          if (nodeName === 'img') {
              return {
                  type: 'atomic',
                  data: { src: node.src, type: 'image' }
              };
          }
      }
  })(html);

  return EditorState.createWithContent(contentState, decorator)
}

export function editorStateToJSON(editorState) {
  if (editorState) {
    const content = editorState.getCurrentContent();
    return JSON.stringify(convertToRaw(content), null, 2)
  }
}

export function editorStateFromRaw(rawContent, decorator = defaultDecorator) {
  if (rawContent) {
    const content = convertFromRaw(rawContent)
    return EditorState.createWithContent(content, decorator)
  } else {
    return EditorState.createEmpty(decorator)
  }
}

export function getSelectedBlockElement(range) {
  let node = range.startContainer;
  do {
    const nodeIsDataBlock = node.getAttribute
                            ? node.getAttribute("data-block")
                            : null;
    if (nodeIsDataBlock) {
      return node;
    }
    node = node.parentNode;
  } while (node !== null);
  return null
}

export function getSelectionCoords(editor, toolbar) {
  const editorBounds = editor.getBoundingClientRect()
  const rangeBounds = getVisibleSelectionRect(window)

  if (!rangeBounds || !toolbar) { return null }

  const rangeWidth = rangeBounds.right - rangeBounds.left
  const toolbarHeight = toolbar.offsetHeight
  const offsetLeft = (rangeBounds.left - editorBounds.left) + (rangeWidth / 2)
  const offsetTop = rangeBounds.top - editorBounds.top - (toolbarHeight)
  const offsetBottom = editorBounds.bottom - rangeBounds.top
  return { offsetLeft, offsetTop, offsetBottom }
}

export function createTypeStrategy(type) {
  return (contentBlock, callback) => {
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        return (
          entityKey !== null &&
          Entity.get(entityKey).getType() === type
        );
      },
      callback
    )
  }
}
