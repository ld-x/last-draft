import React, {Component} from 'react'
import Block from '../block/Block'

/*
  TODO: This is just a placeholder as emoji doesn't add a block it adds inline text
  Should be refactored so plugins doesn't have to supply a block. Or push this out of plugins?
*/
export default class ImageBlock extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Block {...this.props}>
      </Block>
    )
  }
}
