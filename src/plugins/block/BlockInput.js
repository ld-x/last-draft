import React, {Component} from 'react'
const styled = require('styled-components').default

export default class extends Component {
  renderError (error) {
    if (!error) { return }
    return (
      <BlockInputErrorText>{error}</BlockInputErrorText>
    )
  }

  handleDrop (e) {
    e.preventDefault()
    e.stopPropagation()
  }

  render () {
    let {value, error, ...props} = this.props

    return (
      <BlockInputRow>
        <BlockInputWrapper>
          <BlockInput
            {...props}
            defaultValue={value}
            type='text'
            onDrop={this.handleDrop} />
        </BlockInputWrapper>
        {this.renderError(error)}
      </BlockInputRow>
    )
  }
}

const BlockInputWrapper = styled.div`
  padding: 16px;
  position: relative;
`

const BlockInput = styled.input`
  border: 0;
  border-bottom: 1px dashed transparent;
  color: #333;
  display: block;
  padding: 8px 0;
  width: 100%;
  font-size: 14px;
  outline: none;
  &:hover {
    border-color: #999;
  }
  &:focus {
    border-color: #0072de;
    border-style: solid;
  }
`

const BlockInputErrorText = styled.div`
  color: #ff351e;
  margin-top: 6px;
  font-size: 12px;
`

const BlockInputRow = styled.div`
  line-height: 1;
`
