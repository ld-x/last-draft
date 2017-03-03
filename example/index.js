import React, { Component } from 'react'
import { render } from 'react-dom'
import Example from './Example'

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      theme: {
        backgroundColor: '#fff',
        color: '#404040',
        highlight: '#ffc0cb'
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
      	<div className="title">
      		<h1>
      			<span className="blue">L</span>
      			<span className="red">A</span>
      			<span className="purple">S</span>
      			<span className="green">T</span>
            <span style={{marginLeft: '1rem'}}></span>

      			<span className="pink">D</span>
            <span className="blue">R</span>
      			<span className="red">A</span>
      			<span className="purple">F</span>
      			<span className="green">T</span>
      		</h1>
        </div>
        <Example theme={this.state.theme} />
      </div>
    )
  }
}

render((
  <App />
), document.getElementById('root'))
