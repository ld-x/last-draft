import {CompositeDecorator} from 'draft-js'
import {createTypeStrategy, hashtagStrategy, linkifyStrategy} from '../utils/strategy'
import Link from '../components/Entities/Link'
import Hashtag from '../components/Entities/Hashtag'
import Dropcap from '../components/Entities/Dropcap'

const decorator = new CompositeDecorator([
  {
    strategy: createTypeStrategy('DROPCAP'),
    component: Dropcap
  },
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
