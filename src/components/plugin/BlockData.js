import React, {Component} from "react"
const styled = require('styled-components').default

export default class extends Component {
  render() {
    return (
      <BlockData>
        {this.props.children}
      </BlockData>
    );
  }
}

const BlockData = styled.div`
  overflow: auto;
  padding: 8px;
`;
