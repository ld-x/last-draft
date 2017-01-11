/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import React, {Component} from 'react'
import 'setimmediate'
import icons from '../Buttons/'
import styled from 'styled-components'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = { open: false }
  }

  onChange (editorState) {
    this.props.onChange(editorState)
  }

  toggle () {
    this.setState({ open: !this.state.open })
  }

  render () {
    const { open } = this.state

    let menuButtonStyle = {
      transform: open ? 'rotate(45deg)' : 'none'
    }

    let menuItemsStyle = {
      maxHeight: open ? '116px' : 0,
      opacity: open ? 1 : 0
    }

    return (
      <SideMenuWrapper className='ld-sidemenu-wrapper'>
        <SideMenu className='ld-sidemenu'>
          <SideMenuButton
            className='ld-sidemenu-button'
            onClick={::this.toggle}
            style={menuButtonStyle}
            type='button'
          >
            <icons.CrossIcon />
          </SideMenuButton>

          <SideMenuItems style={menuItemsStyle} className='ld-sidemenu-items'>
            {this.props.plugins.map((item) => {
              const Button = item.button
              return (
                <SideMenuItem key={item.type} className='ld-sidemenu-item'>
                  <Button
                    uploadImageCallBack={this.props.uploadImageCallBack}
                    uploadFile={this.props.uploadFile}
                    editorState={this.props.editorState}
                    onChange={::this.onChange} />
                </SideMenuItem>
              )
            })}
          </SideMenuItems>
        </SideMenu>
      </SideMenuWrapper>
    )
  }
}

const SideMenuWrapper = styled.ul`
  padding: 0;
  list-style: none;
  margin: 0;
`

const SideMenu = styled.li`
  position: relative;
  width: 36px;
  text-align: center;
`

const SideMenuItems = styled.ul`
  maxHeight: ${props => props.open ? '116px' : 0};
  opacity: ${props => props.open ? 1 : 0};
  list-style: none;
  padding: 0;
  margin-top: -2px;
  transition: all 0.3s ease;
  overflow: hidden;
  width: 36px;
  text-align: center;
  border-radius:30px;
`

const SideMenuButton = styled.button`
  transform: ${props => props.open ? 'rotate(45deg)' : 'none'};
  border: 0;
  color: #fff;
  cursor: pointer;
  height: 24px;
  font-size: 0;
  padding: 0;
  width: 24px;
  transition: all 0.3s ease;
  position: relative;
  background: none;

  &:before {
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 100%;
    display: inline-block;
    background-color: ${props => props.open ? '#9d1d20' : '#181818'};
  }

  &:focus {
    outline: none;
  }
`

const SideMenuItem = styled.li`
  padding: 0;
  margin: 0;
  height: 30px;
`
