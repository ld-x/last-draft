import React, { PropTypes } from 'react';

import { getCurrentBlock } from '../../model/'

const ImageBlock = (props) => {
  const { block, blockProps } = props
  const { getEditorState } = blockProps
  const data = block.getData()
  const src = data.get('src')
  const currentBlock = getCurrentBlock(getEditorState())
  const className = currentBlock.getKey() === block.getKey() ? 'rte-image-is-selected' : ''
  if (src !== null) {
    return (
      <div className="rte-block-image-inner-container">
        <img className={className} src={src} />
      </div>
    )
  }
}

ImageBlock.propTypes = {
  block: PropTypes.object,
  blockProps: PropTypes.object,
}

export default ImageBlock
