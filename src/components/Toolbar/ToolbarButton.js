/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import React, {Component} from 'react'
import Separator from './Separator'
import styled from 'styled-components'

export class PluginButton extends Component {
  render () {
    const Button = this.props.item.icon
    const { theme } = this.props

    return (
      <ToolbarButtonWrapper theme={theme} active={false} className='ld-toolbar-button-wrapper'>
        <LdToolbarButton className='ld-toolbar-button' type='button'>
          <Button
            theme={theme}
            onChange={::this.props.onChange}
            uploadImageAsync={this.props.uploadImageAsync}
            uploadFile={this.props.uploadFile}
            editorState={this.props.editorState}
            />
        </LdToolbarButton>
      </ToolbarButtonWrapper>
    )
  }
}

export class ToolbarButton extends Component {
  toggleAction (action) {
    if (action.toggle) {
      action.toggle(!action.active)
    }
  }

  render () {
    const Icon = this.props.item.icon
    const { item, active, theme, separators } = this.props

    if (item.type === 'separator') {
      if (!separators) { return null }
      return <Separator />
    }

    return (
      <ToolbarButtonWrapper theme={theme} active={active} className='ld-toolbar-button-wrapper'>
        <LdToolbarButton
          className='ld-toolbar-button'
          onClick={() => this.toggleAction(this.props)}
          type='button'
        >
          <Icon />
        </LdToolbarButton>
      </ToolbarButtonWrapper>
    )
  }
}

const ToolbarButtonWrapper = styled.li`
  display: inline-block;
  margin: 0 !important;
  color: ${props => props.active ? props.theme.highlight : props.theme.color};
  &:hover {
    color: ${props => props.theme.color};
  }
  &:active {
    color: ${props => props.theme.color};
  }
`

const LdToolbarButton = styled.button`
  padding: 0;
  color: inherit;
  cursor: pointer;
  border: 0;
  height: 40px;
  width: 40px;
  line-height: 1;
  background: transparent;
`
