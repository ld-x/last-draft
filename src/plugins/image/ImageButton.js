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
    const file = e.target.files[0]
    this.props.uploadFile(file)
  }

  render () {
    return (
      <div>
        <ImageButton type='button' onClick={::this.onClick} className='ld-image-block-button'>
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
  &:focus {
    outline: none;
  }
`
