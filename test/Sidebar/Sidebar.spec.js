import expect from 'expect'
import test from 'tape'
import React from 'react'
import { shallow, mount } from 'enzyme'
import { setupJsdom } from '../jsdom'
import Sidebar from '../../src/components/Sidebar/Sidebar'
import {EditorState, SelectionState, convertFromRaw} from "draft-js";

const INITIAL_CONTENT = {
  "entityMap": {},
  "blocks": [
    {
      "key": "ag6qs",
      "text": "Last Draft!",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": []
    }
  ]
};


const onChange = () => {
  console.log('changed')
}

const openSidebar = () => {
  console.log('opening the toolbar')
}


test('Sidebar component', (t) => {
  setupJsdom()

  const wrapper = mount(
    <Sidebar
      editorState={convertFromRaw(INITIAL_CONTENT)}
      openSidebar={openSidebar}
      onChange={onChange} />
  )

  t.pass(
    expect(wrapper.props().onChange).toEqual(onChange)
  )

  t.pass(
    expect(wrapper.find('.ld-sidebar').hasClass('ld-sidebar')).toEqual(true)
  )

  t.end()
});
