import expect from 'expect'
import test from 'tape'
import React from 'react'
import { shallow, mount } from 'enzyme'
import { setupJsdom } from '../jsdom'
import Toolbar from '../../src/components/Toolbar/Toolbar'
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


test('Toolbar component', (t) => {
  setupJsdom()

  const wrapper = mount(
    <Toolbar
      editorState={convertFromRaw(INITIAL_CONTENT)}
      openSidebar={openSidebar}
      onChange={onChange} />
  )

  t.pass(
    expect(wrapper.props().onChange).toEqual(onChange)
  )

  t.pass(
    expect(wrapper.find('.ld-toolbar').hasClass('ld-toolbar')).toEqual(true)
  )

  t.end()
});
