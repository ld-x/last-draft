import React, {Component} from 'react'
import BlockContent from '../block/BlockContent'
import BlockInput from '../block/BlockInput'
import Block from '../block/Block'
import icons from '../../icons'

export default class VideoBlock extends Component {
  constructor(props) {
    super(props)

    this.actions = [
      {
        key: 'delete',
        icon: icons.CloseIcon,
        action: this.props.container.remove
      }
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
      <Block {...this.props} actions={this.actions}>
        <BlockContent>
          <video controls style={VideoBlockStyle} src={this.props.data.src} alt=''/>
        </BlockContent>

        <BlockInput
          placeholder='Caption'
          value={this.props.data.caption}
          onChange={::this.handleCaptionChange} />
      </Block>
    )
  }
}
