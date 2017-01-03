import ImageButton from './ImageButton'
import ImageBlock from './ImageBlock'
import PlaceholderBlock from './PlaceholderBlock'

const image = {
  type: 'image',
  button: ImageButton,
  block: ImageBlock
}

const placeholder = {
  type: 'placeholder',
  block: PlaceholderBlock
}

const plugin = {
  image: image,
  placeholder: placeholder
}

module.exports = plugin
