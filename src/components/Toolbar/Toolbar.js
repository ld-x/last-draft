import React, {Component} from 'react'
import {EditorState, RichUtils, Entity} from 'draft-js'
import ToolbarButton from './ToolbarButton'
import LinkToolbar from './LinkToolbar'
import {getSelectionCoords} from '../../utils/selection'
import {hasEntity} from '../../utils/entity'

const styled = require('styled-components').default

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editingEntity: null,
      link: '',
      error: null
    }
    this.renderButton = ::this.renderButton
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

  toggleEntity (entity) {
    this.setState({editingEntity: entity})
  }

  cancelEntity () {
    const {editor} = this.props
    editor && editor.focus()
    this.setState({ editingEntity: null, error: null })
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
        toggle = () => this.toggleEntity(entity)
        active = hasEntity(entity, editorState)
        break
      }
    }

    return (
      <ToolbarButton key={key} active={active} toggle={toggle} item={item} />
    )
  }

  setBarPosition () {
    const editor = this.props.editor
    const toolbar = this.refs.toolbar
    const selectionCoords = getSelectionCoords(editor, toolbar)

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

  componentDidUpdate () {
    if (!this.props.editorState.getSelection().isCollapsed()) {
      return this.setBarPosition()
    }
  }

  renderToolList () {
    return (
      <ToolbarList onMouseDown={(e) => { e.preventDefault() }}>
        {this.props.actions.map(this.renderButton)}
      </ToolbarList>
    )
  }

  render () {
    const { position, error } = this.state

    if (this.props.readOnly) { return null }

    let showToolbar = true
    if (this.props.editorState.getSelection().isCollapsed()) {
      showToolbar = false
    }

    let toolbarStyle = { display: showToolbar ? 'block' : 'none' }
    if (position !== undefined) {
      toolbarStyle = Object.assign(position, toolbarStyle)
      toolbarStyle = {...toolbarStyle }
    }
    let toolbarWrapperStyle = {
      backgroundColor: error ? '#E83F26' : '#181818'
    }

    let toolbarErrorStyle = {
      margin: error ? '-8px 0 0 20px' : '0',
      height: error ? '28px' : '0',
      paddingBottom: error ? '12px' : '0'
    }


    return (
      <Toolbar ref='toolbarWrapper' style={toolbarStyle}>
        <div style={{position: 'absolute', bottom: 0}}>
          <ToolbarWrapper ref='toolbar' style={toolbarWrapperStyle}>
            {
              this.state.editingEntity ?
                <LinkToolbar
                  {...this.props}
                  setError={::this.setError}
                  cancelError={::this.cancelError}
                  cancelEntity={::this.cancelEntity}
                  entityType={this.state.editingEntity} /> :
                this.renderToolList()
            }
            <ToolbarErrorMsg style={toolbarErrorStyle}>
              {this.state.error}
            </ToolbarErrorMsg>
            <ToolbarArrow />
          </ToolbarWrapper>
        </div>
      </Toolbar>
    )
  }
}

const Toolbar = styled.div`
  font-family: Open Sans, sans-serif;
  color: #181818;
  font-size: 1.125rem;
  letter-spacing: -0.037rem;
  line-height: 1.75rem;
  background: yellow;
  height: 0;
  position: relative;
  z-index: 10;
`

const ToolbarWrapper = styled.div`
  background: #181818;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
  left: -50%;
  position: relative;
  transition: background-color 0.2s ease-in-out;
`

const ToolbarList = styled.ul`
  padding: 0 8px;
  margin: 0;
  whiteSpace: nowrap;
`

const ToolbarArrow = styled.span`
  display: inline-block;
  top: 100%;
  left: 50%;
  height: 0;
  width: 0;
  position: absolute;
  pointerEvents: none;
  borderWidth: 8px;
  borderStyle: solid;
  borderColor: #181818 transparent transparent;
  marginLeft: -8px;
  transition: border-color 0.2s ease-in-out;
`

const ToolbarErrorMsg = styled.p`
  margin: 0;
  height: 0;
  transition: height 0.2s ease-in-out;
  color: #FFF;
  font-size: 12px;
  font-weight: bold;
`
