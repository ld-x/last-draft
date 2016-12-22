import React, {Component} from "react"
import "setimmediate"
import icons from "../icons"
const styled = require('styled-components').default

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  onChange(editorState) {
    this.props.onChange(editorState)
  }

  toggle() {
    this.setState({ open: !this.state.open })
  }

  render() {
    const { open } = this.state

    let menuButtonStyle = {
      transform: open ? 'rotate(45deg)' : 'none'
    }

    let menuItemsStyle = {
      maxHeight: open ? '116px' : 0
    }

    return (
      <SideMenuWrapper>
        <SideMenu>
          <SideMenuButton
              onClick={::this.toggle}
              style={menuButtonStyle}
              type="button">
            <icons.CrossIcon />
          </SideMenuButton>

          <SideMenuItems style={menuItemsStyle}>
            {this.props.plugins.map((item) => {
              const Button = item.button
              return (
                <SideMenuItem key={item.type} >
                  <Button
                    uploadImageCallBack={this.props.uploadImageCallBack}
                    editorState={this.props.editorState}
                    onChange={::this.onChange}/>
                </SideMenuItem>
              )
            })}
          </SideMenuItems>
        </SideMenu>
      </SideMenuWrapper>
    )
  }
}

const SideMenuWrapper = styled.ul`
  padding: 0;
  list-style: none;
  margin: 0;
`;

const SideMenu = styled.li`
  position: relative;
  width: 36px;
  text-align: center;
`;

const SideMenuItems = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 8px;
  transition: max-height 0.5s ease;
  overflow: hidden;
  width: 36px;
  text-align: center;
`;

const SideMenuButton = styled.button`
  border: 0;
  color: #fff;
  cursor: pointer;
  height: 32px;
  font-size: 0;
  padding: 0;
  width: 32px;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
  position: relative;
  background: none;

  &:before {
    content: "";
    width: 100%;
    height: 100%;
    border-radius: 100%;
    display: inline-block;
    background-color: #181818;
  }

  &:focus {
    outline: 0;
  }
`;

const SideMenuItem = styled.li`
  height: 40px;
  padding-top: 2px;
  margin: 0;
`;
