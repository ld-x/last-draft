import React from 'react';

export default class BlockTypeSelect extends React.Component {

  state = {
    visible: false,
    style: { opacity: '0' }
  }

  onClick = (e) => {
    e.stopPropagation();
    return this.state.visible ? this.hide() : this.show();
  }

  show = () => {
    this.setState({
      visible: true,
      style: { opacity: '1' }
    });
  }

  hide = () => {
    this.setState({
      visible: false,
      style: { opacity: '0' }
    });
  }

  render() {
    const { theme, getEditorState, setEditorState, store } = this.props;
    let blockRotateStyle = this.state.visible ? { transform: 'rotate(45deg)' } : {}
    return (
      <div onClick={this.onClick}>
        <div className={theme.blockTypeSelectStyles.blockType}>
          <svg style={blockRotateStyle} width="24" height="24" viewBox="0 0 24 24"><g fill="currentColor" fill-rule="evenodd"><path d="M11 6h2v12h-2z"></path><path d="M18 11v2H6v-2z"></path></g></svg>
        </div>
        {/*
          The spacer is needed so the popup doesn't go away when moving from the
          blockType div to the popup.
        */}
        <div className={theme.blockTypeSelectStyles.spacer} />
        <div className={theme.blockTypeSelectStyles.popup} style={this.state.style}>
          {this.props.structure.map((Component, index) => (
            <Component
              key={index}
              getEditorState={getEditorState}
              setEditorState={setEditorState}
              theme={theme.buttonStyles}
              store={store}
              addImageFile={store.getItem('addImageFile')}
            />
          ))}
        </div>
      </div>
    );
  }
}
