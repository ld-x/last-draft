import React, {Component, PropTypes} from "react"
import BlockAction from "./BlockAction"
const styled = require('styled-components').default

export default class extends Component {

  static propTypes = {
    items: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        key: PropTypes.string.isRequired,
        icon: PropTypes.func.isRequired,
        action: PropTypes.func.isRequired
      })
    )
  }

  renderItem(item) {
    return(<BlockAction item={item} key={item.key} />);
  }

  render() {
    return(
      <BlockActionGroup>
        {this.props.items.map(this.renderItem)}
      </BlockActionGroup>
    )
  }
}

const BlockActionGroup = styled.ul`
  color: #999;
  float: right;
  list-style: none;
  margin: 0;
  padding: 0;
`;
