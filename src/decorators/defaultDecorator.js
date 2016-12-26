import {CompositeDecorator} from 'draft-js'
import {createTypeStrategy, hashtagStrategy, linkifyStrategy} from '../utils/strategy'
import Link from '../components/Link'
import Hashtag from '../components/Hashtag'

const decorator = new CompositeDecorator([
  {
    strategy: createTypeStrategy('LINK'),
    component: Link
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
