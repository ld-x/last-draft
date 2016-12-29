import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import icons from '../../components/Buttons/'
import insertDataBlock from '../../utils/insertDataBlock'
const styled = require('styled-components').default

export default class extends Component {
  onClick (e) {
    e.preventDefault()
    ReactDOM.findDOMNode(this.refs.fileInput).click()
  }

  inputChange (e) {
    const { editorState, onChange, uploadImageCallBack } = this.props
    const file = e.target.files[0]
    if (file.type.indexOf('image/') !== 0) { return }

    if (uploadImageCallBack !== undefined) {
      uploadImageCallBack(file)
      .then((data) => {
        /* stop showing image placeholder */
        const imageData = {src: data.src, type: 'image'}
        onChange(insertDataBlock(editorState, imageData))
      })
    } else {
      const src = window.URL.createObjectURL(file)
      const imageData = {src: src, type: 'image'}
      onChange(insertDataBlock(editorState, imageData))
    }
  }

  render () {
    return (
      <div>
        <ImageButton type='button' onClick={::this.onClick}>
          <icons.ImageIcon />
        </ImageButton>
        <input
          type='file'
          ref='fileInput'
          onChange={::this.inputChange}
          style={{ display: 'none' }} />
      </div>
    )
  }
}

const ImageButton = styled.button`
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
