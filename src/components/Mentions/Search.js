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
      searchValue: '@'
    }
  }

  componentDidMount () {
    ReactDOM.findDOMNode(this.refs.searchInput).focus()
  }

  selectAutoComplete (event) {
    this.setState({open: false})
    let result = event.target.innerText
    this.setState({searchValue: result})

    if(typeof this.props.onClick !== 'undefined'){
      this.props.onClick(result)
    }
  }

  reset () {
    this.setState({matchingItems: []})
    this.setState({open: false})
    this.setState({searchValue: ''})
    this.props.closeMentionList()
  }

  onSearchChange (event) {
    event.stopPropagation()
    this.setState({open: true})
    const searchValue = event.target.value
    this.setState({searchValue: searchValue})

    let result = SearchItemInArrayObjects(this.props.items, searchValue, this.props.searchKey)
    this.setState({matchingItems: result})
  }

  onKeyDown (event) {
    if (event.key === 'Escape') {
      event.preventDefault()
      this.reset()
    }
    if (event.key === 'Backspace') {
      if (this.state.searchValue === '') {
        event.preventDefault()
        this.reset()
      }
    }
  }

  render() {

    let items = this.state.matchingItems.map((item, i) => {
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

    return (
      <Search>
        <Input
          ref='searchInput'
          type='text'
          onChange={::this.onSearchChange}
          value={this.state.searchValue}
          onKeyDown={::this.onKeyDown} />

        <Menu ref="autocomplete">
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
`

const Input = styled.input`
  color: #666;
  width: 100%;
  padding: 0.5rem;
  padding-bottom: 0.2rem;
  border: 1px solid #b7b7b7;
  border-bottom: none;

  &:focus {
    outline: none;
  }
`

const Menu = styled.div`
  background: white;
  display: block;
  text-decoration: none;
  white-space: nowrap;
  padding: 0.5rem;
  padding-top: 0;
  max-height: 30rem;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  width: 100%;
  visibility: visible;
  z-index: 100;
  border: 1px solid #b7b7b7;
  border-top: none;
`

const List = styled.ul`
  list-style-type: none;
  padding: 0em;
  margin: 0em;
`

const MentionItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const MentionName = styled.p`
  padding: 0 1rem;
`

const Avatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius:12px;
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
