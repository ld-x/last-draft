import React, {Component} from 'react'
import icons from '../Icons/'
import styled from 'styled-components'

export default class extends Component {
  render () {
    return (
      <SideMenuWrapper className='ld-sidemenu-wrapper'>
        <SideMenu className='ld-sidemenu'>
          <SideMenuButton
            className='ld-sidemenu-button'
            onClick={::this.props.openToolbar}
            type='button'
          >
            <icons.MenuIcon />
          </SideMenuButton>
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
    width: 24px;
    height: 24px;
    border-radius: 100%;
    display: inline-block;
    background-color: ${props => props.open ? '#f00' : '#181818'};
  }

  &:focus {
    outline: none;
  }
`
