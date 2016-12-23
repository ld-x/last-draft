import insertDataBlock from './utils/insertDataBlock'
import Editor from './components/Editor'
import Icons from './icons'
import * as convert from './utils/convert'

const Final = {
  editorStateFromRaw: convert.editorStateFromRaw,
  editorStateFromHtml: convert.editorStateFromHtml,
  editorStateToJSON: convert.editorStateToJSON,
  editorStateToHtml: convert.editorStateToHtml,
  insertDataBlock: insertDataBlock,
  Editor: Editor,
  Icons: Icons
}

module.exports = Final
