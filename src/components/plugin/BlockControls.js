import React, {Component} from "react"
const styled = require('styled-components').default

export default class extends Component {
  render() {
    return (
      <BlockControls>
        {this.props.children}
      </BlockControls>
    )
  }
}

const BlockControls = styled.div`
  overflow: auto;
  padding: 8px;
`;
