import insertDataBlock from './insertDataBlock'
import Editor from './components/Editor'
import Icons from './icons'
import * as utils from './utils'

const Final = {
  editorStateFromRaw: utils.editorStateFromRaw,
  editorStateFromHtml: utils.editorStateFromHtml,
  editorStateToJSON: utils.editorStateToJSON,
  editorStateToHtml: utils.editorStateToHtml,
  createTypeStrategy: utils.createTypeStrategy,
  insertDataBlock: insertDataBlock,
  Editor: Editor,
  Icons: Icons
}

module.exports = Final
