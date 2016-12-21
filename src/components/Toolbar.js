import React, {Component} from "react"
import {EditorState, RichUtils, Entity} from "draft-js"
import ToolbarItem from "./ToolbarItem"
import {getSelectionCoords} from "../utils"
const styled = require('styled-components').default

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      editingEntity: null,
      link: "",
      error: null
    }
    this.renderButton = ::this.renderButton
    this.cancelEntity = ::this.cancelEntity
  }

  toggleInlineStyle(inlineStyle) {
    const newEditorState = RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle)
    this.props.onChange(newEditorState)
  }

  toggleBlockStyle(blockType) {
    this.props.onChange(
      RichUtils.toggleBlockType(this.props.editorState, blockType)
    )
  }

  toggleEntity(entity) {
    this.setState({editingEntity: entity})
  }

  renderButton(item, position) {
    let current = null
    let toggle = null
    let active = null
    let key = item.label

    switch(item.type) {
      case "inline": {
        current = this.props.editorState.getCurrentInlineStyle()
        toggle = () => this.toggleInlineStyle(item.style)
        active = current.has(item.style)
        break
      }
      case "block": {
        const selection = this.props.editorState.getSelection();
        current = this.props.editorState
          .getCurrentContent()
          .getBlockForKey(selection.getStartKey())
          .getType()
        toggle = () => this.toggleBlockStyle(item.style)
        active = item.style === current
        break
      }
      case "separator": {
        key = "sep-" + position
        break
      }
      case "entity": {
        const {entity = "LINK"} = item
        key = "entity-"+entity
        toggle = () => this.toggleEntity(entity)
        active = this.hasEntity(entity)
        break
      }
    }

    return (
      <ToolbarItem key={key} active={active} toggle={toggle} item={item} />
    )
  }

  setError(errorMsg) {
    this.setState({error: errorMsg})
  }

  cancelError() {
    this.setState({error: null})
  }

  setBarPosition() {
    const editor = this.props.editor;
    const toolbar = this.refs.toolbar;
    const selectionCoords = getSelectionCoords(editor, toolbar);

    if (!selectionCoords) { return null }

    if (selectionCoords &&
        !this.state.position ||
        this.state.position.bottom !== selectionCoords.offsetBottom ||
        this.state.position.left !== selectionCoords.offsetLeft) {
      this.setState({
        show: true,
        position: {
          bottom: selectionCoords.offsetBottom,
          left: selectionCoords.offsetLeft
        }
      })
    }
  }

  componentDidUpdate() {
    if (!this.props.editorState.getSelection().isCollapsed()) {
      return this.setBarPosition()
    } else {
      if (this.state.show) {
        this.setState({
          show: false,
          editingEntity: null,
          link: "",
          error: null
        })
      }
    }
  }

  getCurrentEntityKey() {
    const selection = this.props.editorState.getSelection()
    const anchorKey = selection.getAnchorKey()
    const contentState = this.props.editorState.getCurrentContent()
    const anchorBlock = contentState.getBlockForKey(anchorKey)
    const offset = selection.anchorOffset
    const index = selection.isBackward ? offset - 1 : offset
    return anchorBlock.getEntityAt(index)
  }

  getCurrentEntity() {
    const entityKey = this.getCurrentEntityKey()
    if(entityKey) {
      return Entity.get(entityKey)
    }
    return null
  }

  hasEntity(entityType) {
    const entity = this.getCurrentEntity()
    if (entity && entity.getType() === entityType) {
      return true
    }
    return false
  }

  setEntity(entityType, data) {
    const {editorState} = this.props;
    const entityKey = Entity.create(entityType, "MUTABLE", data);
    const newState = RichUtils.toggleLink(
      editorState,
      editorState.getSelection(),
      entityKey
    )
    const selectionState = EditorState.forceSelection(
      newState, editorState.getSelection()
    )

    this.props.onChange(selectionState);
  }

  removeEntity() {
    const {editorState} = this.props;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.props.onChange(RichUtils.toggleLink(editorState, selection, null));
    }
    this.cancelEntity()
  }

  cancelEntity() {
    this.props.editor && this.props.editor.focus()
    this.setState({ editingEntity: null, error: null })
  }
  renderEntityInput(entityType) {
    if(!this.props.entityInputs) {
      console.warn("no entityInputs provided")
      return null
    }
    const Component = this.props.entityInputs[entityType]
    const setEntity = data => this.setEntity(entityType, data)
    let entityData = {}
    let entity = null
    if(this.hasEntity(entityType)) {
      entity = this.getCurrentEntity()
      if(entity) {
        entityData = entity.getData()
      }
    }
    if(Component) {
      return (
        <Component
          editorState={this.props.editorState}
          setEntity={setEntity}
          entityType={entityType}
          onChange={this.props.onChange}
          cancelEntity={this.cancelEntity}
          removeEntity={::this.removeEntity}
          setError={::this.setError}
          cancelError={::this.cancelError}
          entity={entity}
          {...entityData}
          />
      )
    } else {
      console.warn("unknown entity type: "+entityType)
      return null
    }
  }
  renderToolList() {
    return (
      <ToolbarList onMouseDown={(e) => {e.preventDefault()}}>
        {this.props.actions.map(this.renderButton)}
      </ToolbarList>
    )
  }
  render() {
    if(this.props.readOnly) { return null }

    const { position, show, error } = this.state

    let toolbarStyle = { display: show ? 'block' : 'none' }
    if(position !== undefined) {
      toolbarStyle = Object.assign(position, toolbarStyle)
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
      <Toolbar ref="toolbarWrapper" style={toolbarStyle}>
        <div style={{position: "absolute", bottom: 0}}>
          <ToolbarWrapper ref="toolbar" style={toolbarWrapperStyle}>
            {
              this.state.editingEntity ?
              this.renderEntityInput(this.state.editingEntity) :
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
`;

const ToolbarWrapper = styled.div`
  background: #181818;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
  left: -50%;
  position: relative;
  transition: background-color 0.2s ease-in-out;
`;

const ToolbarList = styled.ul`
  padding: 0 8px;
  margin: 0;
  whiteSpace: nowrap;
`;

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
`;

const ToolbarErrorMsg = styled.p`
  margin: 0;
  height: 0;
  transition: height 0.2s ease-in-out;
  color: #FFF;
  font-size: 0.75rem;
  font-weight: bold;
`;
