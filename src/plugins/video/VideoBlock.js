import React, {Component} from 'react'
import BlockInput from '../block/BlockInput'
import Block from '../block/Block'
import icons from '../../components/Buttons/'
const styled = require('styled-components').default

export default class extends Component {
  constructor (props) {
    super(props)

    this.actions = [
      {
        key: 'delete',
        icon: icons.CloseIcon,
        action: this.props.container.remove
      }
    ]
  }

  handleCaptionChange (event) {
    this.props.container.updateData({caption: event.target.value})
  }

  getVideoId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    var match = url.match(regExp)

    if (match && match[2].length == 11) {
      return match[2]
    } else {
      return null
    }
  }

  getVideoUrl(src) {
    let id = this.getVideoId(src)
    if (id !== null) {
      return `https://www.youtube.com/embed/${id}`
    }
  }

  render () {
    let videoSrc = this.getVideoUrl(this.props.data.src)

    return (
      <Block {...this.props} actions={this.actions}>
        <VideoBlockWrapper>
          <VideoBlock src={videoSrc}
                  frameBorder='0'
                  allowFullScreen />
        </VideoBlockWrapper>

        <BlockInput
          placeholder='Caption'
          value={this.props.data.caption}
          onChange={::this.handleCaptionChange} />
      </Block>
    )
  }
}

const VideoBlockWrapper = styled.div`
  position: relative;
  width: 90%;
  height: 0;
  padding-bottom: 56.25%;
  margin: 0 auto;
`

const VideoBlock = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
