import {CompositeDecorator} from 'draft-js'
import {createTypeStrategy, hashtagStrategy, linkifyStrategy} from '../utils/strategy'
import Link from '../components/Entities/Link'
import Hashtag from '../components/Entities/Hashtag'

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
