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

  getVideoIdYoutube(str) {
    // link : https://youtube.com/watch?v=HBHJ0XGZfLs
    // share : https://youtu.be/HBHJ0XGZfLs
    // embed : https://youtube.com/embed/HBHJ0XGZfLs
    var re = /\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9_\-]+)/i
    var matches = re.exec(str)
    return matches && matches[1]
  }

  getVideoIdVimeo(str) {
    // embed & link: https://vimeo.com/713300
    var re = /\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i
    var matches = re.exec(str)
    return matches && matches[1]
  }

  getVideoUrl(src) {
    /* youtube */
    let id = this.getVideoIdYoutube(src)
    if (id !== null) {
      return `https://youtube.com/embed/${id}`
    }

    /* vimeo */
    id = this.getVideoIdVimeo(src)
    if (id !== null) {
      return `https://player.vimeo.com/video/${id}`
    }
  }

  render () {
    let videoSrc = this.getVideoUrl(this.props.data.src)
    if(videoSrc === undefined) { return null }

    return (
      <Block {...this.props} actions={this.actions}>
        <VideoBlockWrapper className='ld-video-block-wrapper'>
          <VideoBlock src={videoSrc}
                  className='ld-video-block'
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
