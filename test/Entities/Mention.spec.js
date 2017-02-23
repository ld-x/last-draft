import expect from 'expect'
import test from 'tape'
import React from 'react'
import { shallow, mount } from 'enzyme'
import { setupJsdom } from '../jsdom'
import Mention from '../../src/components/Entities/Mention'

test('Mention component', (t) => {
  setupJsdom()
  const data = {url: 'http://user/steven-iseki', title: 'steven iseki'}
  const wrapper = mount(<Mention data={data} >steven iseki</Mention>)

  console.log(wrapper.props().children)

  t.pass(
    expect(wrapper.props().data).toEqual(data)
  )

  t.pass(
    expect(wrapper.props().children).toEqual('steven iseki')
  )

  t.end()
});
