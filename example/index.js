import React, { Component } from 'react'
import { render } from 'react-dom'
import Example from './Example'
import ColorPicker from './ColorPicker'

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      theme: {
        backgroundColor: '#181818',
        color: '#fafafa',
        highlight: '#9d1d20'
      }
    }
  }

  onColorChange (color, themeName) {
    let updatedTheme = this.state.theme
    updatedTheme[themeName] = color
    this.setState({ theme: updatedTheme })
  }

  render () {
    return (
      <div>
        <div className='color-picker-wrapper'>
          <div className='color-picker' >
            <span>Style the </span>
            <span className='color-picker-green'>LD. Editor</span>
          </div>
          <span>backgroundColor </span>
          <ColorPicker onColorChange={(color) => this.onColorChange(color, 'backgroundColor')}/>
          <span>color </span>
          <ColorPicker onColorChange={(color) => this.onColorChange(color, 'color')}/>
          <span>highlight </span>
          <ColorPicker onColorChange={(color) => this.onColorChange(color, 'highlight')}/>
        </div>

        <div>
          <Example theme={this.state.theme} />
        </div>
      </div>
    )
  }
}

render((
  <App />
), document.getElementById('root'))
