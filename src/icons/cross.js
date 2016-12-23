import React from 'react'
const styled = require('styled-components').default

export default class extends React.Component {
  render () {
    return (
      <CrossIcon width='24' height='24' viewBox='0 0 24 24' >
        <g fill='currentColor' fillRule='evenodd'>
          <path d='M11 6h2v12h-2z' />
          <path d='M18 11v2H6v-2z' />
        </g>
      </CrossIcon>
    )
  }
}

const CrossIcon = styled.svg`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -12px 0 0 -12px;
`
