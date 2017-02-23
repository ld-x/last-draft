import expect from 'expect'
import test from 'tape'
import React from 'react'
import { shallow, mount } from 'enzyme'
import { setupJsdom } from '../jsdom'
import Search from '../../src/components/Mentions/Search'

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

const mentionFound = () => {
  console.log('found mention...')
}

const closeMentionList = () => {
  console.log('closing mention list...')
}

test('Mention Search component', (t) => {
  setupJsdom()

  const wrapper = mount(
    <Search
      searchValue='ste'
      mentionUsers={mentionUsers}
      searchKey='name'
      closeMentionList={closeMentionList}
      onClick={mentionFound} />
  )

  t.pass(
    expect(wrapper.props().searchValue).toEqual('ste')
  )

  t.pass(
    expect(wrapper.props().searchKey).toEqual('name')
  )

  t.pass(
    expect(wrapper.props().mentionUsers).toEqual(mentionUsers)
  )

  t.pass(
    expect(wrapper.props().onClick).toEqual(mentionFound)
  )

  t.end()
});
