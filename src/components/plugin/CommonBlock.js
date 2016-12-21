import React, {Component} from "react"
import { BlockActions, BlockControls, BlockWrapper } from "../../components/plugin"

export default class extends Component {
  constructor(props) {
    super(props)
  }

  handleDisplayChange(newValue) {
    this.props.container.updateData({display: newValue})
  }

  render(){
    const data = this.props.data
    let options = this.props.blockProps.plugin.options || {}
    options = {...options}

    return (
      <BlockWrapper>
        <BlockControls>
          <BlockActions items={this.props.actions} />
        </BlockControls>
        {this.props.children}
      </BlockWrapper>
    )
  }
}
