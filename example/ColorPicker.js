import React, { Component } from 'react'
import styled from 'styled-components'

const colors = [
  '#001f3f', '#0074D9', '#7FDBFF', '#39CCCC',
  '#3D9970', '#2ECC40', '#FFDC00', '#FF851B',
  '#FF4136', '#85144b', '#F012BE', '#B10DC9',
  '#111111', '#AAAAAA', '#DDDDDD', '#FFFFFF'
]

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = { show: false }
  }

  toggleColorPick (e) {
    this.setState({ show: !this.state.show })
  }

  handleColorChange (e) {
    let color = e.target.getAttribute('color')
    this.props.onColorChange(color)
    this.setState({ show: !this.state.show })
  }

  render() {
    const {show} = this.state
    return (
      <Wrapper>
        <ColorPicker onClick={::this.toggleColorPick} />
        {
          show && (
            <ColorPickerWrapper>
              <ColorWrapper>
                {
                  colors.map((c, i) => {
                    return <ColorSpan key={i} color={c} onClick={::this.handleColorChange} />
                  })
                }
              </ColorWrapper>
            </ColorPickerWrapper>
          )
        }
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 1rem;
`

const ColorPickerWrapper = styled.div`
  display: flex;
  width: 6rem;
  height: 6rem;
  background: #fafafa;
  box-shadow: 0 1px 18px 0 rgba(0, 0, 0, 0.3);
  position: absolute;
  z-index: 100;
`

const ColorPicker = styled.div`
  height: 1rem;
  width: 1rem;
  cursor: pointer;
  border-radius: 2px;
  background: linear-gradient(to left, #66ff00, #a80077)
`

const ColorWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0.8rem;
`

const ColorSpan = styled.span`
  cursor: pointer;
  width: 1rem;
  flex: 1 0 20%;
  margin: 0.1rem;
  border-radius: 2px;
  background-color: ${props => props.color};
  border-color: ${props => props.color};
`
