import { EditorState, CompositeDecorator } from 'draft-js'
import Link, { findLinkEntities } from '../components/entities/Link'
import Image, { findImageEntities } from '../components/entities/Image'

const defaultDecorators = new CompositeDecorator([
  { strategy: findLinkEntities, component: Link },
  { strategy: findImageEntities, component: Image }
])

const createEditorState = (html = null, decorators = defaultDecorators) => {
  if (html === null) {
    return EditorState.createEmpty(decorators)
  }
  return EditorState.createWithContent(html, decorators)
}

export default createEditorState
