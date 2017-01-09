/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import insertDataBlock from './utils/insertDataBlock'
import Editor from './components/Editor'
import Icons from './components/Buttons/'
import * as convert from './utils/convert'

const LD = {
  editorStateFromRaw: convert.editorStateFromRaw,
  editorStateFromHtml: convert.editorStateFromHtml,
  editorStateToJSON: convert.editorStateToJSON,
  editorStateToHtml: convert.editorStateToHtml,
  insertDataBlock: insertDataBlock,
  Editor: Editor,
  Icons: Icons
}

module.exports = LD
