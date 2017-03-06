import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import SideMenu from './SideMenu'
import styled from 'styled-components'
import {getSelectedBlockElement} from '../../utils/selection'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {top: 0}
  }

  componentDidUpdate () {
    this.setBarPosition()
  }

  setBarPosition () {
    const container = ReactDOM.findDOMNode(this.refs.container)
    const element = getSelectedBlockElement(this.props.editorState)
    if (!element || !container) { return }

    const containerTop = container.getBoundingClientRect().top - document.documentElement.clientTop
    let top = element.getBoundingClientRect().top - 4 - containerTop
    top = Math.max(0, Math.floor(top))

    if (this.state.top !== top) {
      this.setState({ top: top })
    }
  }

  render () {
    if (this.props.readOnly) { return null }
    return (
      <Sidebar ref='container' className='ld-sidebar'>
        <SidebarMenuWrapper style={{top: `${this.state.top}px`}} className='ld-sidebar-menu-wrapper'>
          <SideMenu
            sidebarOpen={this.props.sidebarOpen}
            closeSidebar={::this.props.closeSidebar}
            openSidebar={::this.props.openSidebar}
            editorState={this.props.editorState}
            onChange={::this.props.onChange} />
        </SidebarMenuWrapper>
      </Sidebar>
    )
  }
}

const Sidebar = styled.div`
  position: relative;
`

const SidebarMenuWrapper = styled.div`
  float: left;
  left: -44px;
  position: absolute;
`
