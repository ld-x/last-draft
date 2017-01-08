import React, {Component} from 'react'
import ReactDOM from 'react-dom'
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
          <ImageIcon width='24' height='24' viewBox='0 0 24 24' className='ld-button-image'>
            <path d='M18.222 6H5.778C4.8 6 4 6.6 4 7.333v9.334C4 17.4 4.8 18 5.778 18h12.444C19.2 18 20 17.4 20 16.667V7.333C20 6.6 19.2 6 18.222 6zm-4.084 4l-3 4.51L9 11.503 6 16h12l-3.862-6z' fill='currentColor' fillRule='evenodd' />
          </ImageIcon>
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
  height: 24px;
  font-size: 0;
  padding: 0;
  width: 24px;
  transition: all 0.5s ease;
  position: relative;
  background: none;

  &:before {
    transition: all 0.1s ease-in-out;
    background-color: #181818;
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

const ImageIcon = styled.svg`
  position: absolute;
  transform: scale(0.8);
  top: 0;
  left: 0;
`
