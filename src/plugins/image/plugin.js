/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

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
