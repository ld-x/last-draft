import insertDataBlock from './insertDataBlock'
import Media from './components/Media'
import Editor from './components/Editor'
import Icons from './icons'
import Sidebar from './components/Sidebar'
import Toolbar from './components/Toolbar'
import * as utils from './utils'

const Final = {
  editorStateFromRaw: utils.editorStateFromRaw,
  editorStateFromHtml: utils.editorStateFromHtml,
  editorStateToJSON: utils.editorStateToJSON,
  editorStateToHtml: utils.editorStateToHtml,
  createTypeStrategy: utils.createTypeStrategy,
  insertDataBlock: insertDataBlock,
  Editor: Editor,
  Icons: Icons,
}

module.exports = Final
