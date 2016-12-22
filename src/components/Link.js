import React, {Component} from "react"
import {Entity} from "draft-js"
const styled = require('styled-components').default

export default class  extends Component {
  render() {
    const {url, target} = Entity.get(this.props.entityKey).getData()
    return (
      <Link href={url} title={url} target={target}>
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
