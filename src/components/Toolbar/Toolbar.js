/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {EditorState, RichUtils, Entity} from 'draft-js'
import {ToolbarButton, PluginButton} from './ToolbarButton'
import LinkToolbar from './LinkToolbar'
import {getSelectionCoords, getSelectedBlockElement} from '../../utils/selection'
import {hasEntity,setEntity} from '../../utils/entity'
import styled from 'styled-components'
import SideMenu from './SideMenu'

export default class extends Component {
  constructor (props) {
    super(props)
    console.log(props)
    this.state = {
      editingEntity: null,
      link: '',
      error: null,
      position: {},
      sidebarBottom: 0,
    }
    this.renderButton = ::this.renderButton
  }

  componentDidUpdate () {
    this.setBarPosition()
    this.setSideBarPosition()
  }

  setError (errorMsg) {
    this.setState({error: errorMsg})
  }

  cancelError () {
    this.setState({error: null})
  }

  toggleInlineStyle (inlineStyle) {
    const newEditorState = RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle)
    this.props.onChange(newEditorState)
  }

  toggleBlockStyle (blockType) {
    this.props.onChange(
      RichUtils.toggleBlockType(this.props.editorState, blockType)
    )
  }

  toggleEntity (entity, active) {
    this.setState({editingEntity: entity})
  }

  openToolbar () {
    this.setState({ position: { bottom: this.state.position.bottom, left: 220 } })
    this.props.openToolbar()
  }

  removeEntity () {
    const {editorState, onChange} = this.props
    const selection = editorState.getSelection()
    if (!selection.isCollapsed()) {
      onChange(RichUtils.toggleLink(editorState, selection, null))
    }
    this.cancelEntity()
  }

  cancelEntity () {
    const {editorWrapper} = this.props
    editorWrapper && editorWrapper.focus()
    this.setState({ editingEntity: null, error: null })
  }

  setBarPosition () {
    const editorWrapper = this.props.editorWrapper
    const toolbar = this.refs.toolbar
    const selectionCoords = getSelectionCoords(editorWrapper, toolbar)

    if (!selectionCoords) { return null }

    if (selectionCoords &&
        !this.state.position ||
        this.state.position.bottom !== selectionCoords.offsetBottom ||
        this.state.position.left !== selectionCoords.offsetLeft) {
      this.setState({
        position: {
          bottom: selectionCoords.offsetBottom,
          left: selectionCoords.offsetLeft
        }
      })
    }
  }

  setSideBarPosition () {
    const container = ReactDOM.findDOMNode(this.refs.sidebar)
    const element = getSelectedBlockElement(this.props.editorState)
    if (!element || !container) { return }

    const containerBottom = container.getBoundingClientRect().bottom
    let bottom = Math.abs(element.getBoundingClientRect().top - 4 - containerBottom)

    if (this.state.sidebarBottom !== bottom) {
      this.setState({ sidebarBottom: bottom })
    }
  }

  renderButton (item, position) {
    const {editorState, theme} = this.props
    let current = null
    let toggle = null
    let active = null
    let key = item.label

    switch (item.type) {
      case 'inline': {
        current = editorState.getCurrentInlineStyle()
        toggle = () => this.toggleInlineStyle(item.style)
        active = current.has(item.style)
        break
      }
      case 'block': {
        const selection = editorState.getSelection()
        current = editorState
          .getCurrentContent()
          .getBlockForKey(selection.getStartKey())
          .getType()
        toggle = () => this.toggleBlockStyle(item.style)
        active = item.style === current
        break
      }
      case 'separator': {
        key = 'sep-' + position
        break
      }
      case 'entity': {
        const {entity = 'LINK'} = item
        key = 'entity-' + entity
        active = hasEntity(entity, editorState)
        toggle = () => this.toggleEntity(entity, active)
        break
      }
      case 'plugin': {
        return (
          <PluginButton
            uploadImageCallBack={this.props.uploadImageCallBack}
            uploadFile={this.props.uploadFile}
            editorState={this.props.editorState}
            onChange={::this.props.onChange}
            theme={theme}
            key={key}
            item={item} />
        )
        break
      }
    }

    return (
      <ToolbarButton theme={theme} key={key} active={active} toggle={toggle} item={item} />
    )
  }

  renderToolList () {
    return (
      <ToolbarList onMouseDown={(e) => { e.preventDefault() }}>
        {this.props.actions.map(this.renderButton)}
      </ToolbarList>
    )
  }

  render () {
    const { position, error, editingEntity } = this.state
    const { theme } = this.props

    if (this.props.readOnly) { return null }

    let show = true
    if (this.props.editorState.getSelection().isCollapsed()) {
      show = false
    }

    if (this.props.showToolbar) {
      show = true
    }

    let toolbarStyle = { display: show ? 'block' : 'none' }
    if (position !== undefined) {
      toolbarStyle = Object.assign(position, toolbarStyle)
      toolbarStyle = {...toolbarStyle }
    }

    return (
      <div>
        <ToolbarWrapper theme={theme} ref='toolbarWrapper' style={toolbarStyle} className='ld-toolbar-wrapper'>
          <div style={{position: 'absolute', bottom: '0'}}>
            <Toolbar ref='toolbar' error={error} theme={theme} className='ld-toolbar'>
              {
                editingEntity === 'LINK' ?
                  <LinkToolbar
                    {...this.props}
                    setError={::this.setError}
                    cancelError={::this.cancelError}
                    cancelEntity={::this.cancelEntity}
                    removeEntity={::this.removeEntity}
                    entityType={this.state.editingEntity} /> :
                  this.renderToolList()
              }
              {this.state.error && <ToolbarError error={error} className='ld-toolbar-error'>
                {this.state.error}
              </ToolbarError>}
            </Toolbar>
          </div>
        </ToolbarWrapper>

        <Sidebar ref='sidebar' className='ld-sidebar'>
          <SidebarMenuWrapper style={{bottom: `${this.state.sidebarBottom - 30}px`}} className='ld-sidebar-menu-wrapper'>
            <SideMenu
              openToolbar={::this.openToolbar}
              editorState={this.props.editorState} />
          </SidebarMenuWrapper>
        </Sidebar>
      </div>
    )
  }
}

const ToolbarWrapper = styled.div`
  font-family: Open Sans, sans-serif;
  color: ${props => props.theme.color};
  letter-spacing: -0.037rem;
  line-height: 1.75rem;
  height: 0;
  position: relative;
  z-index: 10;
  transform: translateY(8px);
`

const Toolbar = styled.div`
  background: ${props => props.error ? '#E83F26' : props.theme.backgroundColor };
  box-shadow: 0 1px 18px 0 rgba(0, 0, 0, 0.3);
  left: -50%;
  position: relative;
  transition: background-color 0.2s ease-in-out;
`

const ToolbarList = styled.ul`
  padding: 4px 6px;
  margin: 0;
  whiteSpace: nowrap;
`

const ToolbarError = styled.p`
  margin: ${props => props.error ? '-8px 0 0 20px' : '0'};
  height: ${props => props.error ? '28px' : '0'};
  padding-bottom: ${props => props.error ? '12px' : '0'};
  transition: height 0.2s ease-in-out;
  color: #FFF;
  font-size: 12px !important;
  font-weight: bold;
`

const Sidebar = styled.div`
  position: relative;
`

const SidebarMenuWrapper = styled.div`
  float: left;
  left: -44px;
  position: absolute;
`
