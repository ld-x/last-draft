/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import React, {Component} from 'react'
import Separator from './Separator'
import styled from 'styled-components'
import insertDataBlock from '../../utils/insertDataBlock'

export class PluginButton extends Component {
  render () {
    const Button = this.props.item.icon
    const { theme } = this.props

    return (
      <ToolbarButtonWrapper theme={theme} active={false} className='ld-toolbar-button-wrapper'>
        {
          this.props.tooltips &&
            <Label>{this.props.item.label}</Label>
        }
        <LdToolbarButton className='ld-toolbar-button'>
          <Button
            theme={theme}
            insertDataBlock={insertDataBlock}
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
        {
          this.props.tooltips &&
            <Label>{this.props.item.label}</Label>
        }
        <LdToolbarButton className='ld-toolbar-button' onClick={() => this.toggleAction(this.props)}>
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
    span {
      opacity: 1;
    }
  }
  &:active {
    color: ${props => props.theme.color};
  }
`

const LdToolbarButton = styled.div`
  padding: 0;
  cursor: pointer;
  height: 40px;
  width: 40px;
  background: transparent;
  margin-top: 0.4rem;
  margin-bottom: -1rem;
`

const Label = styled.span`
  display: block;
  position: fixed;
  overflow: hidden;
  font-size: 12px;
  margin-top: -2.5rem;
  text-transform: uppercase;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  z-index: 100;
  padding: 0 0.5rem;
  border: 1px solid #F1F1F1;
  border-radius: 2px;
  background: white;
  box-shadow: 3px 3px 5px #BFBDBD;
`
