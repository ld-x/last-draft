import React, {Component} from "react"

import {
  BlockContent,
  BlockData,
  BlockInput,
  CommonBlock
} from "../../components/plugin"

import icons from "../../icons"
import ImageBlockStyle from "./ImageBlockStyle"


export default class ImageBlock extends Component {
  constructor(props) {
    super(props)

    this.actions = [
      {"key": "delete", "icon": icons.DeleteIcon, "action": this.props.container.remove}
    ]
  }

  handleCaptionChange(event) {
    event.stopPropagation()
    this.props.container.updateData({caption: event.target.value})
  }

  handleRightsHolderChange(event) {
    event.stopPropagation()
    this.props.container.updateData({rightsHolder: event.target.value})
  }

  render(){
    return (
      <CommonBlock {...this.props} actions={this.actions}>
        <BlockContent>
          <img style={ImageBlockStyle.image} src={this.props.data.src} alt=""/>
        </BlockContent>

        <BlockData>
          <BlockInput
            placeholder="Caption"
            value={this.props.data.caption}
            onChange={::this.handleCaptionChange} />

          <BlockInput
            placeholder="Rights Holder"
            value={this.props.data.rightsHolder}
            onChange={::this.handleRightsHolderChange} />
        </BlockData>
      </CommonBlock>
    )
  }
}
