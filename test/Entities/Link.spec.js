import expect from 'expect'
import test from 'tape'
import React from 'react'
import { shallow, mount } from 'enzyme'
import { setupJsdom } from '../jsdom'
import Link from '../../src/components/Entities/Link'

test('Link component', (t) => {
  setupJsdom()
  const data = {url: 'http://lastdraft.xyz', title: 'last draft'}
  const wrapper = mount(<Link data={data} decoratedText='a link' />)

  t.pass(
    expect(wrapper.props().data).toEqual(data)
  )

  t.pass(
    expect(wrapper.find('.ld-link').hasClass('ld-link')).toEqual(true)
  )

  t.end()
});
