import React, {Component} from 'react'
const styled = require('styled-components').default

export default class extends Component {
  render () {
    return (
      <BlockContent className='ld-block-content'>
        {this.props.children}
      </BlockContent>
    )
  }
}

const BlockContent = styled.div`
  line-height: 100px;
  text-align: center;
  position: relative;
`
