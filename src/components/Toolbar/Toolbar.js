/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import React, {Component} from 'react'
import {RichUtils} from 'draft-js'
import {ToolbarButton, PluginButton} from './ToolbarButton'
import LinkToolbar from './LinkToolbar'
import Header from './Header'
import {getSelectionCoords, getSelectedBlockElement} from '../../utils/selection'
import {hasEntity} from '../../utils/entity'
import styled from 'styled-components'
import insertDataBlock from '../../utils/insertDataBlock'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editingEntity: null,
      link: '',
      error: null,
      position: {}
    }
    this.renderButton = ::this.renderButton
  }

  componentDidUpdate () {
    this.setBarPosition()
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

  /* entity */
  toggleEntity (entity, active) {
    this.setState({editingEntity: entity})
  }

  removeEntity () {
    const selection = this.props.editorState.getSelection()
    if (!selection.isCollapsed()) {
      this.props.onChange(RichUtils.toggleLink(this.props.editorState, selection, null))
    }
    this.cancelEntity()
  }

  cancelEntity () {
    const {editorWrapper} = this.props
    editorWrapper && editorWrapper.focus()
    this.setState({ editingEntity: null, error: null })
  }

  /* plugin modal */

  submitHtmlModal (html) {
    this.props.submitHtmlModal(html)
    this.closeModal()
  }

  toggleModal (modal) {
    this.setState({modal: modal})
    this.setState({showModal: !this.state.showModal})
  }

  closeModal () {
    const {editorWrapper} = this.props
    editorWrapper && editorWrapper.focus()
    this.setState({ showModal: false })
  }

  setBarPosition () {
    const editorWrapper = this.props.editorWrapper
    const selectionCoords = getSelectionCoords(editorWrapper)
    const hasFocus = this.props.editorState.getSelection().getHasFocus()

    if (!hasFocus && !selectionCoords && this.props.sidebarOpen) {
      /* manually open the toolbar */
      const container = editorWrapper.querySelector('.ld-sidebar')
      const element = getSelectedBlockElement(this.props.editorState)
      if (!element || !container) { return }
      const containerTop = container.getBoundingClientRect().top - document.documentElement.clientTop
      let top = element.getBoundingClientRect().top - containerTop + 25
      top = Math.max(0, Math.floor(top))
      if (this.state.position.top !== top) {
        this.setState({ position: { top: top, left: 105 } })
      }
      return
    }
    if (!hasFocus) { return }
    if (!selectionCoords) { return }

    if (selectionCoords &&
        !this.state.position ||
        this.state.position.top !== selectionCoords.offsetTop ||
        this.state.position.left !== selectionCoords.offsetLeft) {
      this.setState({
        position: {
          top: selectionCoords.offsetTop,
          left: selectionCoords.offsetLeft
        }
      })
    }
  }

  renderButton (item, position) {
    const {editorState} = this.props
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
        if (item.modal) {
          toggle = () => this.toggleModal(item.modal)
          break
        }

        return (
          <PluginButton
            theme={this.props.theme}
            tooltips={this.props.tooltips}
            uploadImageAsync={this.props.uploadImageAsync}
            uploadFile={this.props.uploadFile}
            editorState={this.props.editorState}
            onChange={::this.props.onChange}
            key={key}
            item={item} />
        )
      }
    }

    return (
      <ToolbarButton
        key={key}
        active={active}
        tooltips={this.props.tooltips}
        separators={this.props.separators}
        theme={this.props.theme}
        toggle={toggle}
        item={item} />
    )
  }

  renderToolbar () {
    const { editingEntity, showModal } = this.state

    let toolbar = null
    if (editingEntity === 'LINK') {
      toolbar = (
        <LinkToolbar
          {...this.props}
          setError={::this.setError}
          cancelError={::this.cancelError}
          cancelEntity={::this.cancelEntity}
          removeEntity={::this.removeEntity}
          entityType={this.state.editingEntity} />
      )
    } else if (showModal) {
      let Modal = this.state.modal
      toolbar = (
        <Modal
          {...this.props}
          insertDataBlock={insertDataBlock}
          closeModal={::this.closeModal}
          submitHtmlModal={::this.submitHtmlModal}
          rangeLeft={this.state.rangeLeft} />
      )
    } else {
      toolbar = (
        <ToolbarList onMouseDown={(e) => { e.preventDefault() }}>
          {this.props.actions.map(this.renderButton)}
        </ToolbarList>
      )
    }

    this.updateHeaderIcon()
    return toolbar
  }

  updateHeaderIcon () {
    let headerCount = this.props.actions.filter((action) => {
      if (action.style) {
        if (action.style.includes('header')) { return action }
      }
    }).length

    /* If only 1 header, use the H icon */
    if (headerCount === 1) {
      this.props.actions.map((action) => {
        if (action.style) {
          if (action.style.includes('header')) { action.icon = Header }
        }
      })
    }
  }

  renderError () {
    return (
      <ToolbarError error={this.state.error} className='ld-toolbar-error'>
        {this.state.error}
      </ToolbarError>
    )
  }

  render () {
    const { position, error } = this.state
    const { theme } = this.props

    if (this.props.readOnly) { return null }

    let show = true
    if (this.props.editorState.getSelection().isCollapsed()) {
      show = false
    }

    if (this.props.sidebarOpen) {
      show = true
    }

    let toolbarStyle = { display: show ? 'block' : 'none' }
    if (position !== undefined) {
      toolbarStyle = Object.assign(position, toolbarStyle)
      toolbarStyle = {...toolbarStyle}
    }

    return (
      <ToolbarWrapper theme={theme} ref='toolbarWrapper' style={toolbarStyle} className='ld-toolbar-wrapper'>
        <div style={{position: 'absolute', bottom: '0'}}>
          <Toolbar ref='toolbar' error={error} theme={theme} className='ld-toolbar'>
            {this.renderToolbar()}
            {this.state.error && this.renderError()}
          </Toolbar>
        </div>
      </ToolbarWrapper>
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
  background: ${props => props.error ? '#E83F26' : props.theme.backgroundColor};
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
