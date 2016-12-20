import React, {Component} from "react"
const styled = require('styled-components').default

export default class extends Component {
  render() {
    return (
      <BlockHover>
        <BlockWrapper>
          {this.props.children}
        </BlockWrapper>
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
`;

const BlockWrapper = styled.div`
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  background-color: #fff;
  border-radius: 3px;
  border: solid 1px #ddd;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
`;
