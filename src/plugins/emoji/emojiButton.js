import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import icons from '../../components/Buttons/'
import { Modifier, EditorState } from 'draft-js'
const styled = require('styled-components').default

const EMOJIS = ['😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌',
  '🤓', '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈', '🙉', '🙊',
  '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃',
  '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕', '👇',
  '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶',
  '🐇', '🐥', '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸',
  '🍺', '🌍', '🚑', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈', '🎉',
  '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎷',
  '💰', '🖊', '📅', '✅', '❎', '💯']

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = { showModal: false }
  }

  addEmoji (e) {
    const { editorState, onChange, uploadImageCallBack } = this.props

    const contentState = Modifier.insertText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      `${e.target.innerHTML}`,
      editorState.getCurrentInlineStyle(),
    )
    onChange(EditorState.push(editorState, contentState, 'insert-characters'))
    this.setState({ showModal: false })
  }

  renderEmojiModal() {
    return (
      <EmojiModal onClick={this.stopPropagation}>
        <CloseIconWrapper onClick={::this.onCloseButtonClick}>
          <icons.CloseIcon />
        </CloseIconWrapper>
        {
          EMOJIS.map((emoji, index) => (
            <Emoji
              key={index}
              role="presentation"
              onClick={::this.addEmoji}
            >{emoji}</Emoji>))
        }
      </EmojiModal>
    )
  }

  onEmojiButtonClick (e) {
    e.preventDefault()
    this.setState({ showModal: true })
  }

  onCloseButtonClick (e) {
    e.preventDefault()
    this.setState({ showModal: false })
  }

  render () {
    const { showModal } = this.state

    return (
      <div>
        <EmojiButton type='button' onClick={::this.onEmojiButtonClick}>
          <icons.EmojiIcon />
        </EmojiButton>

        {showModal ? this.renderEmojiModal() : undefined}
      </div>
    )
  }
}

const EmojiButton = styled.button`
  background: none;
  border: 0;
  color: #fff;
  cursor: pointer;
  height: 32px;
  font-size: 0;
  padding: 0;
  width: 32px;
  transition: all 0.5s ease;
  position: relative;
  background: none;
  transform: scale(0.9);

  &:hover {
    transform: scale(1);
  }
  &:before {
    transition: all 0.1s ease-in-out;
    background-color: #181818;
    transform: scale(1.125);
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 100%;
    display: inline-block;
    background-color: #181818;
  }
`

const EmojiModal = styled.div`
  position: absolute;
  left: 2.5rem;
  margin-top: -2.4rem;
  display: flex;
  flex-wrap: wrap;
  width: 362px;
  height: 192px;
  border: 1px solid #F1F1F1;
  padding: 15px;
  border-radius: 2px;
  z-index: 100;
  background: white;
  box-shadow: 3px 3px 5px #BFBDBD;
`

const Emoji = styled.span`
  margin: 2.5px;
  height: 24px;
  width: 24px;
  cursor: pointer;
  font-size: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
`


const CloseIconWrapper = styled.span`
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  transform: scale(0.8);
`
