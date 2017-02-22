/*
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

 var SearchItemInArrayObjects = function (items, input, searchKey) {
   if (input.trim() === '' || searchKey === undefined) {
     return []
   }
   var reg = new RegExp(input.split('').join('\\w*').replace(/\W/, ''), 'i')

   return items.filter(function (item) {
     if (reg.test(item[searchKey])) {
       return item
     }
   })
 }

import React, {Component} from "react"
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import icons from '../Icons/'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      matchingItems: [],
      open: false,
    }
  }

  selectAutoComplete (event) {
    let result = event.target.innerText
    let user = this.props.users.find(u => u.name === result)
    if(typeof this.props.onClick !== 'undefined'){
      this.props.onClick(user)
    }
  }

  render() {
    const {searchValue, users, searchKey} = this.props

    let items = null
    let menuStyle = { border: 'none'}

    if (searchValue.length > 0) {
      let matchingItems = SearchItemInArrayObjects(users, searchValue, searchKey)
      items = matchingItems.map((item, i) => {
        let name = item.name
        let avatarSrc = item.avatar
        return (
          <li key={i}>
            <MentionItem>
              <Avatar src={avatarSrc} />
              <MentionName key={name} onClick={::this.selectAutoComplete}>
                {name}
              </MentionName>
            </MentionItem>
          </li>
        )
      })
      if (matchingItems.length) {
        menuStyle = { border: '1px solid #b7b7b7' }
      }
    }

    return (
      <Search>
        <Menu style={menuStyle}>
          {/*
            <SearchButton onClick={::this.reset}>
              <icons.CloseIcon  />
            </SearchButton>
            */}
          <List>{items}</List>
        </Menu>
      </Search>
    )
  }
}

const Search = styled.div`
  margin: 0;
  font-weight: 200;
  line-height: 1.5;
  position: relative;
  width: 100%;
  min-width: 10rem;
`

const Menu = styled.div`
  background: white;
  display: block;
  text-decoration: none;
  white-space: nowrap;
  padding: 0;
  max-height: 30rem;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  width: 100%;
  visibility: visible;
  z-index: 100;
`

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`

const MentionItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  padding: 0 0.5rem;

  &:hover {
    background: rgb(236, 236, 234);
  }
`

const MentionName = styled.p`
  padding: 0 1rem;
`

const Avatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 12px;
`

const SearchButton = styled.button`
  margin: 0 0 0 auto;
  display: block;
  color: inherit;
  cursor: pointer;
  border: 0;
  height: 24px;
  width: 24px;
  background: transparent;
`
