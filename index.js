import React from 'react'
import { render } from 'react-dom'

import HtmlImport from './src/components/HtmlImport/HtmlImport'
import Linkify from './src/components/Linkify/Linkify'
import Image from './src/components/Image/Image'
import Mention from './src/components/Mention/Mention'
import Sticker from './src/components/Sticker/Sticker'
import Emoji from './src/components/Emoji/Emoji'
import Hashtag from './src/components/Hashtag/Hashtag'
import InlineToolbar from './src/components/InlineToolbar/InlineToolbar'
import SideToolbar from './src/components/SideToolbar/SideToolbar'
import Undo from './src/components/Undo/Undo'
import Counter from './src/components/Counter/Counter'

/* swap the components to test each plugin out */
render((
  <Counter />
), document.getElementById('root'))
