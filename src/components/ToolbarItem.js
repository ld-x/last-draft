import React, {Component} from 'react'
import Separator from './Separator'
const styled = require('styled-components').default

export default class extends Component {
  constructor(props) {
    super(props)
  }

  toggleAction(action) {
    if (action.toggle) {
      action.toggle(!action.active);
    }
  }

  render() {
    const Icon = this.props.item.icon
    const { item, active } = this.props

    if (item.type == 'separator') {
      return <Separator />
    }

    let toolbarItemStyle = {
      color: active ? '#3192e7' : '#ccc'
    }

    return (
      <ToolbarItem style={toolbarItemStyle}>
        <ToolbarButton
            onClick={() => this.toggleAction(this.props)}
            type='button'>
          <Icon />
        </ToolbarButton>
      </ToolbarItem>
    )
  }
}

const ToolbarItem = styled.li`
  display: inline-block;
  margin: 0 !important;
  &:hover {
    color: #fff !important;
  }
`;

const ToolbarButton = styled.button`
  padding: 0;
  color: inherit;
  cursor: pointer;
  border: 0;
  height: 46px;
  width: 40px;
  line-height: 1;
  background: transparent;
`;
