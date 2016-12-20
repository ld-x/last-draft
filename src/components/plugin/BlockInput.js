import React, {Component} from "react"
import icons from "../../icons"
const styled = require('styled-components').default

export default class extends Component {
  renderError(error) {
    if (!error) { return }
    return (
      <BlockInputErrorText>{error}</BlockInputErrorText>
    )
  }

  handleDrop(e) {
    e.preventDefault()
    e.stopPropagation()
  }

  render(){
    let {value, error, ...props } = this.props

    return (
      <BlockInputRow>
        <BlockInputWrapper>
          <BlockInput
            {...props}
            defaultValue={value}
            type="text"
            onDrop={this.handleDrop} />
          <icons.EditIcon />
        </BlockInputWrapper>
        {this.renderError(error)}
      </BlockInputRow>
    );
  }
}

const BlockInputWrapper = styled.div`
  position: relative;
`;

const BlockInput = styled.input`
  border: 0;
  border-bottom: 1px dashed transparent;
  color: #333;
  display: block;
  padding: 8px 0;
  width: 100%;
  font-size: 0.75rem;
`;

const BlockInputErrorText = styled.div`
  color: #ff351e;
  margin-top: 6px;
  font-size: 0.75rem;
`;

const BlockInputRow = styled.div`
  line-height: 1rem;
`;
