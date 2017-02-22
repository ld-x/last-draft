/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import {CompositeDecorator} from 'draft-js'
import {createTypeStrategy, hashtagStrategy, linkifyStrategy, } from '../utils/strategy'
import Link from '../components/Entities/Link'
import Mention from '../components/Entities/Mention'
import Hashtag from '../components/Entities/Hashtag'

const decorator = new CompositeDecorator([
  {
    strategy: createTypeStrategy('LINK'),
    component: Link
  },
  {
    strategy: createTypeStrategy('MENTION'),
    component: Mention
  },
  {
    strategy: hashtagStrategy,
    component: Hashtag
  },
  {
    strategy: linkifyStrategy,
    component: Link
  }
])

export default decorator
