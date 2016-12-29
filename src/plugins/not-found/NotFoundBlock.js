import React, {Component} from 'react'
import BlockContent from '../block/BlockContent'
import Block from '../block/Block'
import icons from '../../components/Buttons/'

export default class NotFoundBlock extends Component {
  constructor (props) {
    super(props)

    this.actions = [
      {
        key: 'delete',
        icon: icons.DeleteIcon,
        action: this.props.container.remove
      }
    ]
  }

  render () {
    const message = `Cannot show plugin, component ${this.props.data.type} not found.`
    return (
      <Block {...this.props} actions={this.actions}>
        <BlockContent>
          <p>{message}</p>
          <icons.ErrorIcon />
        </BlockContent>
      </Block>
    )
  }
}
