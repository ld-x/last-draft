import React from 'react'
import { EditorBlock } from 'draft-js'
const styled = require('styled-components').default

export default (props) => (
  <Pullquote>
    <EditorBlock {...props} />
  </Pullquote>
)

const Pullquote = styled.cite`
  color: #3192e7;
  padding: 10px;
  font-size: 20px;
  display: block;
`
