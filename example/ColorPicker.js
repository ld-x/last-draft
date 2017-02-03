import React, { Component } from 'react'
import styled from 'styled-components'

const colors = [
  '#191919', '#3B3738', '#161616', '#000000',
  '#2B2B2B', '#404040', '#585858', '#191919',
  '#C63D0F', '#DE1B1B', '#FF4136', '#B22222',
  '#7D1935', '#B71427', '#FF0000', '#E44424',
  '#9370DB', '#B10DC9', '#FF69B4', '#FFC0CB',
  '#FFD700', '#DAA520', '#D9853B', '#FF851B',
  '#FFA500', '#FF9009', '#FF8C00', '#FF7F50',
  '#FFF056', '#FFDC00', '#FFE658', '#F3FAB6',
  '#005A31', '#A8CD1B', '#CBE32D', '#ADFF2F',
  '#3D9970', '#2ECC40', '#00FF00', '#118C4E',
  '#228B22', '#E9E581', '#C1E1A6', '#A2AB58',
  '#00008B', '#4A96AD', '#6DBDD6', '#67BCDB',
  '#191970', '#0074D9', '#7FDBFF', '#39CCCC',
  '#AAAAAA', '#DDDDDD', '#DFE2DB', '#ECECEA',
  '#FDF3E7', '#fefbec', '#F6F6F6', '#FFFFFF'
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
  height: 16rem;
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
