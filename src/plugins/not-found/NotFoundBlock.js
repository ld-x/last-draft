import React, {Component} from "react"

import { BlockContent, CommonBlock } from "../../components/plugin"
import icons from "../../icons"

export default class NotFoundBlock extends Component {
  constructor(props) {
    super(props)

    this.actions = [
      {"key": "delete", "icon": icons.DeleteIcon, "action": this.props.container.remove}
    ];
  }

  render(){
    const message = __(
      "Can't show plugin, component \"{type}\" not found.").replace(
        "{type}", this.props.data.type);
    return (
      <CommonBlock {...this.props} actions={this.actions}>
        <BlockContent>
          <p>{message}</p>
          <icons.ErrorIcon />
        </BlockContent>
      </CommonBlock>
    );
  }
}
