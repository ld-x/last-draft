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
import styled from 'styled-components'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      foundUsers: []
    }
  }

  componentDidMount() {
    this.findUsers()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchValue !== this.props.searchValue) {
      this.findUsers()
    }
  }

  selectAutoComplete (user) {
    if(typeof this.props.onClick !== 'undefined'){
      this.props.onClick(user)
    }
  }

  findUsers () {
    const {mentionUsersAsync, mentionUsers, searchValue, searchKey} = this.props

    if (mentionUsersAsync !== undefined) {
      /* async */
      mentionUsersAsync(searchValue)
      .then((result) => {
        this.setState({foundUsers: result.mentionUsers})
      })
    } else {
      /* static list of users */
      let users = SearchItemInArrayObjects(mentionUsers, searchValue, searchKey)
      this.setState({foundUsers: users})
    }

  }

  renderUsers () {
    const {foundUsers} = this.state
    const {searchValue} = this.props

    return foundUsers.map((item, i) => {
      let name = item.name
      let avatarSrc = item.avatar
      return (
        <li key={i}>
          <MentionItem>
            <Avatar src={avatarSrc} />
            <MentionName key={name} onClick={() => this.selectAutoComplete(item)}>
              {name}
            </MentionName>
          </MentionItem>
        </li>
      )
    })
  }

  render() {
    const {searchValue} = this.props
    let menuStyle = { border: '1px solid #b7b7b7' }
    if (searchValue.length < 1) { menuStyle = { border: 'none' } }

    return (
      <Search>
        <Menu style={menuStyle}>
          <List>{this.renderUsers()}</List>
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
