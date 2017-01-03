import React from 'react'
import { EditorBlock } from 'draft-js'
const styled = require('styled-components').default

export default (props) => {
  let alignClass = ''
  let alignmentStyle = { justifyContent: 'center' }
  if(props.blockProps.alignment !== undefined) {
    if (props.blockProps.alignment === 'alignment-left') {
      alignmentStyle = { justifyContent: 'flex-start' }
    }
    if (props.blockProps.alignment === 'alignment-right') {
      alignmentStyle = { justifyContent: 'flex-end' }
    }
    alignClass = `${props.blockProps.alignment}`
  }
  console.log(props.blockProps)
  return (
    <AlignmentWrapper style={alignmentStyle} className='align-wrapper'>
      <Alignment className={alignClass}>
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
