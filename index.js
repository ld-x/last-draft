import React from 'react'
import { render } from 'react-dom'

import Counter from './src/components/Counter/Counter'
import Emoji from './src/components/Emoji/Emoji'
import Hashtag from './src/components/Hashtag/Hashtag'
import HtmlImport from './src/components/HtmlImport/HtmlImport'
import Linkify from './src/components/Linkify/Linkify'
import Image from './src/components/Image/Image'
import InlineToolbar from './src/components/InlineToolbar/InlineToolbar'
import Mention from './src/components/Mention/Mention'
import SideToolbar from './src/components/SideToolbar/SideToolbar'
import Sticker from './src/components/Sticker/Sticker'
import Undo from './src/components/Undo/Undo'

/* swap the components to test each plugin out */
render((
  <Counter />
), document.getElementById('root'))
