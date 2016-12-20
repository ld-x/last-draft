import React, {Component} from "react"

export default class MediaWrapper extends Component {

  constructor(props){
    super(props)
  }

  handleFocus() {
    this.props.setReadOnly(true)
  }

  handleBlur() {
    this.props.setReadOnly(false)
  }

  render() {
    return (
      <div onBlur={::this.handleBlur} onFocus={::this.handleFocus}>
        {this.props.children}
      </div>
    )
  }
}
