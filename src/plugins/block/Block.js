import React, {Component} from 'react'
import BlockActions from './BlockActions'
const styled = require('styled-components').default

export default class extends Component {
  handleDisplayChange (newValue) {
    this.props.container.updateData({display: newValue})
  }

  render () {
    return (
      <BlockHover>
        <Block>
          <div>
            {this.props.actions && <BlockActions items={this.props.actions} />}
          </div>
          {this.props.children}
        </Block>
      </BlockHover>
    )
  }
}

const BlockHover = styled.div`
  padding: 2px;
  margin: -2px;
  &:hover {
    background-color: #eee;
    border-radius: 2px;
  }
`

const Block = styled.div`
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  background-color: #fff;
  border-radius: 3px;
  border: solid 1px #ddd;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
`
