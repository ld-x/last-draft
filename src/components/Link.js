import React, {Component} from "react"
import {Entity} from "draft-js"
const styled = require('styled-components').default

export default class  extends Component {
  render() {
    const {url} = Entity.get(this.props.entityKey).getData()
    return (
      <Link href={url} title={url}>
        {this.props.children}
      </Link>
    )
  }
}

const Link = styled.a`
  color: #3192e7;
  text-decoration: none;
  cursor: pointer;
`;
