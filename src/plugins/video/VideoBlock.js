import React, {Component} from "react"
import { BlockContent, BlockData, BlockInput, CommonBlock } from "../../components/plugin"
import icons from "../../icons"

export default class VideoBlock extends Component {
  constructor(props) {
    super(props)

    this.actions = [
      {"key": "delete", "icon": icons.DeleteIcon, "action": this.props.container.remove}
    ]
  }

  handleCaptionChange(event) {
    this.props.container.updateData({caption: event.target.value})
  }

  render() {
    let VideoBlockStyle = {
      display: 'inline-block',
      maxWidth: '100%',
      verticalAlign: 'middle'
    }

    return (
      <CommonBlock {...this.props} actions={this.actions}>
        <BlockContent>
          <video controls style={VideoBlockStyle} src={this.props.data.src} alt=""/>
        </BlockContent>

        <BlockData>
          <BlockInput
            placeholder="Caption"
            value={this.props.data.caption}
            onChange={::this.handleCaptionChange} />
        </BlockData>
      </CommonBlock>
    )
  }
}
