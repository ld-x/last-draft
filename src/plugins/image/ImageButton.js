import React, {Component} from "react"
import ReactDOM from "react-dom"
import icons from "../../icons"
import insertDataBlock from "../../insertDataBlock"
const styled = require('styled-components').default

export default class BlockButton extends Component {
  constructor(props) {
    super(props)
  }

  onClick(e) {
    e.preventDefault()
    ReactDOM.findDOMNode(this.refs.fileInput).click()
  }

  onChange(e) {
    const { editorState, onChange } = this.props
    const file = e.target.files[0]
    const url = URL.createObjectURL(file)

    if (!url) { return }
    const data = {src: url, type: "image"}
    this.props.onChange(insertDataBlock(this.props.editorState, data))
  }

  render() {
    return (
      <div>
        <ImageButton type="button" onClick={::this.onClick}>
          <icons.ImageIcon />
        </ImageButton>
        <input
          type="file"
          ref='fileInput'
          onChange={::this.onChange}
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

  &:hover {
    transform: scale(1.125);
    background-color: #333333;
  }
  &:before {
    transition: all 0.1s ease-in-out;
    background-color: #181818;
    transform: scale(1.125);
    content: "";
    width: 100%;
    height: 100%;
    border-radius: 100%;
    display: inline-block;
    background-color: #181818;
  }
`;
