import React, { PropTypes } from 'react'

import { addNewBlock } from '../model'
import { Block } from '../util/constants'

export default class ImageButton extends React.Component {

  static propTypes = {
    setEditorState: PropTypes.func,
    getEditorState: PropTypes.func,
    close: PropTypes.func,
  }

  onClick() {
    this.input.value = null;
    this.input.click();
  }

  onChange(e) {
    const file = e.target.files[0]
    if (file.type.indexOf('image/') === 0) {
      const src = URL.createObjectURL(file);
      this.props.setEditorState(addNewBlock(
        this.props.getEditorState(),
        Block.IMAGE, { src }
      ))
    }
    this.props.close()
  }

  render() {
    return (
      <button className="rte__button rte__img-button"
              type="button"
              onClick={::this.onClick}
              title="Add an Image" >
        <i className="fa fa-image" />
        <input type="file"
               ref={(c) => { this.input = c; }}
               onChange={::this.onChange}
               style={{ display: 'none' }} />
      </button>
    );
  }
}
