import expect from 'expect'
import test from 'tape'
import React from 'react'
import { shallow, mount } from 'enzyme'
import { setupJsdom } from '../jsdom'
import Mention from '../../src/components/Mentions/Mention'

const onChange = () => {
  console.log('changed')
}

const closeMentionList = () => {
  console.log('closing mention list...')
}

const mentionUsers = [
  {
    name: 'Max Stoiber',
    link: 'https://github.com/mxstbr',
    avatar: 'https://avatars0.githubusercontent.com/u/7525670?v=3&s=400',
  },
  {
    name: 'Nik Graf',
    link: 'https://github.com/nikgraf',
    avatar: 'https://avatars2.githubusercontent.com/u/223045?v=3&s=400',
  },
  {
    name: 'Steven Iseki',
    link: 'https://github.com/steveniseki',
    avatar: 'https://avatars1.githubusercontent.com/u/6695114?v=3&s=400',
  },
]

test('Mention component', (t) => {
  setupJsdom()
  const wrapper = mount(
    <Mention
      onChange={onChange}
      mentionSearchValue='ste'
      closeMentionList={closeMentionList}
      mentionUsers={mentionUsers}
      />
  )

  t.pass(
    expect(wrapper.props().mentionSearchValue).toEqual('ste')
  )

  t.pass(
    expect(wrapper.props().mentionUsers).toEqual(mentionUsers)
  )

  t.pass(
    expect(wrapper.props().onChange).toEqual(onChange)
  )

  t.end()
});
