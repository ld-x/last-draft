import React from 'react'
import { EditorBlock } from 'draft-js'
const styled = require('styled-components').default

export default (props) => {
  let alignmentStyle = { justifyContent: 'center' }
  if(props.blockProps.alignment !== undefined) {
    alignmentStyle = { justifyContent: props.blockProps.alignment }
  }
  return (
    <AlignmentWrapper style={alignmentStyle}>
      <Alignment>
        <EditorBlock {...props} />
      </Alignment>
    </AlignmentWrapper>
  )
}

const AlignmentWrapper = styled.div`
  padding: 10px;
  display: flex;
`
const Alignment = styled.div`
  width: 50%;
`
