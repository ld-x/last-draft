import React, { Component } from 'react';

export default ({ children }) => (
  class imageButton extends Component {

    activate = (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.props.addImageFile();
    }

    render() {
      const { theme } = this.props;
      return (
        <button
          className={theme.button}
          onClick={this.activate}
          type="button"
          children={children}
        />
      );
    }
  }
);
