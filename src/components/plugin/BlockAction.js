import React, {Component, PropTypes} from "react"
const styled = require('styled-components').default

export default class extends Component {

  static propTypes = {
    item: React.PropTypes.shape({
      key: PropTypes.string.isRequired,
      icon: PropTypes.func.isRequired,
      action: PropTypes.func.isRequired
    })
  }

  render() {
    const Icon = this.props.item.icon;
    return(
      <BlockAction onClick={this.props.item.action}>
        <Icon />
      </BlockAction>
    );
  }
}


const BlockAction = styled.li`
  display: inline-block;
  padding: 0,
  padding-left: 8px;
  padding-right: 8px;
  line-height: 40px;
  cursor: pointer;
  text-align: center;
  font-size: 0;

  &:hover {
    color: '#000',
  }
`;
