import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import SideMenu from './SideMenu'
import 'setimmediate'
const styled = require('styled-components').default

function getSelectedBlockElement() {
  const selection = window.getSelection()
  if (selection.rangeCount === 0) { return null }
  let node = selection.getRangeAt(0).startContainer

  do {
    if (node.getAttribute && node.getAttribute('data-block') == 'true') {
      return node
    }
    node = node.parentNode
  } while (node != null)
}

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {top: 0}
  }

  getValidSidebarPlugins() {
    let plugins = [];
    for (let plugin of this.props.plugins) {
      if (!plugin.button || typeof plugin.button !== 'function') {
        continue;
      }
      plugins.push(plugin)
    }
    return plugins
  }

  onChange(editorState) {
    this.props.onChange(editorState)
  }

  componentDidUpdate() {
    if (this.updatingPosition) {
      clearImmediate(this.updatingPosition)
    }
    this.updatingPosition = null
    this.updatingPosition = setImmediate(() => {
      return this.setBarPosition()
    })
  }

  setBarPosition() {
    const container = ReactDOM.findDOMNode(this.refs.container)
    const element = getSelectedBlockElement()
    if (!element || !container) { return }

    const containerTop = container.getBoundingClientRect().top - document.documentElement.clientTop
    let top = element.getBoundingClientRect().top - 4 - containerTop
    top = Math.max(0, Math.floor(top))

    if (this.state.top !== top) {
      this.setState({ top: top })
    }
  }

  render() {
    if(this.props.readOnly) { return null }
    return (
      <Sidebar ref='container'>
        <SidebarMenu style={{top: `${this.state.top}px`}}>
          <SideMenu
            uploadImageCallBack={this.props.uploadImageCallBack}
            editorState={this.props.editorState}
            onChange={::this.onChange}
            plugins={this.getValidSidebarPlugins()}/>
        </SidebarMenu>
      </Sidebar>
    )
  }
}

const Sidebar = styled.div`
  position: relative;
`;

const SidebarMenu = styled.div`
  float: left;
  left: -45px;
  position: absolute;
`;
