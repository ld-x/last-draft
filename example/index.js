import React, { Component } from 'react'
import { render } from 'react-dom'
import Example from './Example'

class App extends Component {

  constructor (props) {
    super(props)
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
        <Example />
      </div>
    )
  }
}

render((
  <App />
), document.getElementById('root'))
